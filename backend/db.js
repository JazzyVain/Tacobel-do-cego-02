require('dotenv').config(); // Carrega variáveis do .env
const mysql = require('mysql2/promise'); // Importa mysql2 na versão async/await

// Cria um "pool" de conexões
const db = mysql.createPool({
  host: process.env.DB_HOST,     // Endereço do servidor MySQL
  user: process.env.DB_USER,     // Usuário do MySQL
  password: process.env.DB_PASSWORD, // Senha do usuário
  database: process.env.DB_NAME      // Nome do banco
  
});

module.exports = db; // Exporta a conexão pra usar nas rotas
