const express = require("express");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
require("dotenv").config();

const router = express.Router();  

router.get('/', (req, res) => {
  res.send('servidor online')
})



module.exports = router;