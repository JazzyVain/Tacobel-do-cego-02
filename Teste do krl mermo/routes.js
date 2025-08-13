const express = require("express");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const router = express.Router();  

router.get('/', (req, res) => {
  res.send('servidor online')
})

router.post('/response', (req, res) => {
  res.json({mensagem: 'Olá'})
})



module.exports = router;
