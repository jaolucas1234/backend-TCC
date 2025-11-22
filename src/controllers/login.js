const jsonwebtoken = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const login = async (req, res) => {
    const { email, senha, validade } = req.body;

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
                senha: senha
            }
        });

        if (!user) {
            return res.status(401).json({ message: 'E-mail ou Senha incorretos!' });
        } else {
            const token = jsonwebtoken.sign(
                {
                    id_user: user.id_user, // ← CORRETO: usa id_user
                    nome: user.nome,
                    email: user.email,
                },
                process.env.SECRET_JWT,
                { expiresIn: validade ? validade + "min" : "60min" }
            );
            
            // RETORNA TODOS OS DADOS NECESSÁRIOS
            res.status(200).json({ 
                token: token,
                id_user: user.id_user, // ← ID para o Flutter
                user: {
                    id_user: user.id_user,
                    nome: user.nome,
                    email: user.email
                }
            });
        }
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

const validaToken = (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).send({ message: "Acesso negado. Nenhum token recebido." }).end();
    }

    jsonwebtoken.verify(token, process.env.SECRET_JWT, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: "Token inválido ou expirado." }).end();
        }
        req.user = decoded;
        res.status(200).json({ 
            user: req.user // ← Retorna o usuário decodificado
        });
    });
};

module.exports = {
    login,
    validaToken
}