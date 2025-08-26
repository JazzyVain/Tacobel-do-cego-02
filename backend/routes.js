const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db")
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

router.post('/nacho', (req, res) => {
  res.json({mensagem: 'R$10,95'})
})

router.post('/quesarito', (req, res) => {
  res.json({mensagem: 'R$19,20'})
})

router.post('/baja', (req, res) => {
  res.json({mensagem: 'R$13,70'})
})

router.post('/cinnamon', (req, res) => {
  res.json({mensagem: 'R$8,20'})
})

module.exports = router;
