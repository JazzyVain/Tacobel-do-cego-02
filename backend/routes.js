const express = require("express");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const router = express.Router();  

router.get('/', (req, res) => {
  res.send('servidor online')
})

router.post('/response', (req, res) => {
  res.json({mensagem: 'Algo'})
})

router.post('/crunchwrap', (req, res) => {
  res.json({mensagem: 'R$11,99'})
})

router.post('/chalupa', (req, res) => {
  res.json({mensagem: 'R$16,45'})
})

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
