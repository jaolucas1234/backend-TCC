const express = require('express')
const cors = require('cors')

const app = express()
const routes = require('../src/routes')
// const iaRoutesModule = require('../src/iarouter');
// const iaRoutes = iaRoutesModule.default;
const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(routes)
// app.use('/', iaRoutes);

app.listen(port, (req, res) => {
    console.log(`Servidor rodando em http://localhost:` + port);
});
