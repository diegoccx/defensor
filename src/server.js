const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Importando o CORS

// Criar ou abrir o banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Banco de dados conectado!");
  }
});

// Criar tabelas 'defensor' e 'processo'
db.serialize(() => {
  // Tabela defensor
  db.run(`CREATE TABLE IF NOT EXISTS defensor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    numero_oab TEXT NOT NULL,
    telefone TEXT,
    email TEXT,
    endereco TEXT,
    data_nascimento DATE
  )`);

  // Tabela processo
  db.run(`CREATE TABLE IF NOT EXISTS processo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero_processo TEXT NOT NULL,
    data_abertura DATE NOT NULL,
    status TEXT DEFAULT 'Em andamento',
    descricao TEXT,
    defensor_id INTEGER,
    FOREIGN KEY (defensor_id) REFERENCES defensor(id) ON DELETE CASCADE
  )`);
  
  // Inserir dados iniciais (exemplo de processos e defensores)
  const defensorInsert = db.prepare("INSERT INTO defensor (nome, numero_oab, telefone, email, endereco, data_nascimento) VALUES (?, ?, ?, ?, ?, ?)");
  defensorInsert.run('João Silva', 'OAB123456', '999999999', 'joao@exemplo.com', 'Rua A, 123', '1980-05-15');
  defensorInsert.run('Maria Oliveira', 'OAB654321', '888888888', 'maria@exemplo.com', 'Rua B, 456', '1985-07-20');
  
  const processoInsert = db.prepare("INSERT INTO processo (numero_processo, data_abertura, status, descricao, defensor_id) VALUES (?, ?, ?, ?, ?)");
  processoInsert.run('0001-2025', '2025-02-01', 'Em andamento', 'Descrição do processo 1', 1);
  processoInsert.run('0002-2025', '2025-02-02', 'Em andamento', 'Descrição do processo 2', 2);

  defensorInsert.finalize();
  processoInsert.finalize();
});

// Inicializando o Express
const app = express();
const port = 3000;

// Habilitar CORS
app.use(cors()); // Aplicando o CORS a todas as rotas

app.use(bodyParser.json());

// Rotas para processos
app.get('/processos', (req, res) => {
  db.all('SELECT * FROM processo', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/processos/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM processo WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (row) {
      res.json(row);
    } else {
      res.status(404).json({ message: "Processo não encontrado." });
    }
  });
});

app.post('/processo', (req, res) => {
  const { numero_processo, data_abertura, status, descricao, defensor_id } = req.body;
  const stmt = db.prepare('INSERT INTO processo (numero_processo, data_abertura, status, descricao, defensor_id) VALUES (?, ?, ?, ?, ?)');
  stmt.run(numero_processo, data_abertura, status, descricao, defensor_id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID });
  });
});

app.delete('/processo/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM processo WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: `Processo ${id} deletado com sucesso.` });
  });
});

// Rotas para defensores
app.get('/defensores', (req, res) => {
  db.all('SELECT * FROM defensor', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/defensores/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM defensor WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (row) {
      res.json(row);
    } else {
      res.status(404).json({ message: "Defensor não encontrado." });
    }
  });
});

app.post('/defensores', (req, res) => {
  const { nome, numero_oab, telefone, email, endereco, data_nascimento } = req.body;
  const stmt = db.prepare('INSERT INTO defensor (nome, numero_oab, telefone, email, endereco, data_nascimento) VALUES (?, ?, ?, ?, ?, ?)');
  stmt.run(nome, numero_oab, telefone, email, endereco, data_nascimento, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
