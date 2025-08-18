// server.js
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const port = 3000;

// 1) CORS primeiro
const allowed = ["http://127.0.0.1:5501", "http://localhost:5501"];
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);          // curl/Postman
    return cb(null, allowed.includes(origin));   // libera front local
  },
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));
// responde preflight
app.options("/{*any}", cors());

// Middleware para servir arquivos estáticos da pasta "public"
app.use(
  express.static("pagina", {
    // Opções para melhor conformidade com RFC HTTP:
    dotfiles: "ignore", // Ignora arquivos ocultos (.htaccess, .env)
    etag: true, // Usa ETags para caching (RFC 7232)
    extensions: ["html"], // Tenta adicionar .html se o arquivo não tiver extensão
    index: "/index.html", // Retorna index.html para diretórios
    lastModified: true, // Envia Last-Modified header (RFC 7232)
    maxAge: "1h", // Cache-Control: max-age=3600 (RFC 9111)
    redirect: true, // Redireciona /dir para /dir/
  })
);

// 2) Body parser antes das rotas
app.use(express.json());

// 3) Só depois monte as rotas
app.use("/api", routes);

app.listen(port, () => {
  console.log(`API em http://localhost:${port}`);
});

//sempre colocar connection.end();