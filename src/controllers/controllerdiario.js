const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function create(req, res) {
    const { id_user, exercicio_feitos, calorias_gastas, copos_bebidos, metros_andados } = req.body

    try {
        const diario = await prisma.diario.create({
            data: {
                id_user: parseInt(id_user),
                exercicio_feitos: parseInt(exercicio_feitos) || 0,
                calorias_gastas: parseFloat(calorias_gastas) || 0.0,
                copos_bebidos: parseInt(copos_bebidos) || 0,
                metros_andados: parseInt(metros_andados) || 0,
            }
        })
        res.status(201).json(diario)
    } catch (error) {
        console.error('Error creating diario:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function read(req, res) {
    try {
        const diarios = await prisma.diario.findMany()
        res.status(200).json(diarios)
    } catch (error) {
        console.error('Error reading diarios:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function update(req, res) {
    const { id } = req.params
    const { exercicio_feitos, calorias_gastas, copos_bebidos, metros_andados } = req.body

    try {

        const diario = await prisma.diario.update({
            where: { id_diario: parseInt(id) },
            data: {
                exercicio_feitos: parseInt(exercicio_feitos),
                calorias_gastas: parseFloat(calorias_gastas),
                copos_bebidos: parseInt(copos_bebidos),
                metros_andados: parseInt(metros_andados)
            }
        })

        res.status(200).json(diario)
    } catch (error) {
        console.error('Error updating diario:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function remove(req, res) {
    const { id } = req.params

    try {

        const diario = await prisma.diario.delete({
            where: { id_diario: parseInt(id) }
        })

        res.status(200).json(diario)
    } catch (error) {
        console.error('Error deleting diario:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    create,
    read,
    update,
    remove
}