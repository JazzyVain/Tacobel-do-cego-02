const express = require("express")
const fetch = require("node-fetch")
const cors = require("cors")

const app = express()
const routes = require('./routes');
app.use('/api', routes);

const port = process.env.PORT

app.use(
  cors({
    origin: `http://localhost:${process.env.PORT || 3001 || null}`,
    credentials: true,
  })
);

app.listen(port, () => {
  console.log(`Servidor de API está rodando na porta ${port}`);
});


//sempre colocar connection.end();