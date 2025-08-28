const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db");
const bcrypt = require("bcryptjs")
require("dotenv").config();

const router = express.Router();  

router.get('/', (req, res) => {
  res.send('servidor online')
})

router.post('/response', (req, res) => {
  res.json({mensagem: 'Algo'})
})

router.get("/crunchwrap", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT preco from produtos where id = 1");
    res.json(rows[0]); // retorna JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/chalupa", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT preco from produtos where id = 2");
    res.json(rows[0]); // retorna JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/nacho", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT preco from produtos where id = 3");
    res.json(rows[0]); // retorna JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/quesarito", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT preco from produtos where id = 4");
    res.json(rows[0]); // retorna JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/baja", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT preco from produtos where id = 5");
    res.json(rows[0]); // retorna JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/cinnamon", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT preco from produtos where id = 6");
    res.json(rows[0]); // retorna JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: "Campos obrigatórios" });
  }

  try {
    // 1. Verifica se já existe
    const [rows] = await db.query(
      "SELECT id FROM usuarios WHERE nome = ? OR email = ?",
      [nome, email]
    );

    if (rows.length > 0) {
      return res.status(409).json({ erro: "Nome de usuário ou email já cadastrado" });
    }

    // 2. Se não existir, insere
    const hash = await bcrypt.hash(senha, 10);
    await db.query(
      "INSERT INTO usuarios (nome, email, senha_hash) VALUES (?,?,?)",
      [nome, email, hash]
    );

    res.json({ sucesso: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao salvar usuário" });
  }
});

router.post("/login", async (req, res) => {
  const { username, senha } = req.body;
  if (!username || !senha) {
    return res.status(400).json({ erro: "Campos obrigatórios" });
  }

  try {
    // Pode ser nome OU email
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE nome = ? OR email = ? LIMIT 1",
      [username, username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ erro: "Usuário não encontrado" });
    }

    const user = rows[0];
    const ok = await bcrypt.compare(senha, user.senha_hash);

    if (!ok) {
      return res.status(401).json({ erro: "Senha incorreta" });
    }

    // Aqui poderia gerar token JWT, mas se só precisa redirecionar:
    res.json({ sucesso: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro interno" });
  }
});

module.exports = router;
