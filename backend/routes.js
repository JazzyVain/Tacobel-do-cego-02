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

  if (!nome || !email || !senha) return res.status(400).json({ erro: "Campos obrigatórios" });

  try {
    const hash = await bcrypt.hash(senha, 10);
    await db.query("INSERT INTO usuarios (nome, email, senha_hash) VALUES (?,?,?)", [
      nome,
      email,
      hash
    ]);
    res.json({ sucesso: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao salvar usuário" });
  }
});

module.exports = router;
