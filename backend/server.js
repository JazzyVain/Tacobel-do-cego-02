const express = require("express")
const fetch = require("fetch")
const cors = require("cors")

const app = express()
const routes = require('./routes');
app.use('/api', routes);

const port = 3000

app.use(cors())

app.listen(port, () => {
  console.log(`Servidor de API está rodando na porta ${port}`);
});


//sempre colocar connection.end();