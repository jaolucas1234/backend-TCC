# Pulsemais
API TCC Academia

## Tecnolofgias
- Node.js
- Prisma
- JWT

## Passos para testar localmente
- 1 Clonar, abrir com vscode e alterar o `prisma/schema.prisma` para o BD "mysql".
- 2 Abrir o Xampp dar start em MySQL
- 3 Criar o .env contendo:
```js
DATABASE_URL="mysql://root@localhost:3306/pulsemais?schema=public&timezone=UTC"
SECRET_JWT="meu_segredo_jwt"
GEMINI_API_KEY=AIzaSyBn_YRzSzEw5pZROo3rILU7uzZEVvcJLx8
```
- 4 Fazer a migração
```bash
npx prisma migrate dev --name init
```
- 5 Executar a API
```bash
npm run dev
```