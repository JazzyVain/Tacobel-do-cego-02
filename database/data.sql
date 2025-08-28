create table usuarios (
  id int auto_increment primary key,
  nome varchar(100) not null unique,
  email varchar(150) not null unique,
  senha_hash varchar(255) not null,
  role ENUM('admin', 'usuario') DEFAULT 'usuario'
);

CREATE TABLE produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome_produto VARCHAR(150) NOT NULL,
  descricao TEXT,
  preco varchar(9) NOT NULL,
  categoria VARCHAR(50),
  disponivel BOOLEAN DEFAULT TRUE
);

