const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3005;

// Rotas explícitas PRIMEIRO (antes do static) para garantir que funcionem
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/doces', (req, res) => {
  const file = path.join(__dirname, 'doces.html');
  if (fs.existsSync(file)) {
    res.sendFile(file);
  } else {
    res.status(404).send('Página não encontrada');
  }
});

app.get('/salgados', (req, res) => {
  const file = path.join(__dirname, 'salgados.html');
  if (fs.existsSync(file)) {
    res.sendFile(file);
  } else {
    res.status(404).send('Página não encontrada');
  }
});

app.get('/doces.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'doces.html'));
});

app.get('/salgados.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'salgados.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Arquivos estáticos (CSS, JS, imagens) - depois das rotas
app.use(express.static(path.join(__dirname)));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Site rodando em http://localhost:${PORT}`);
});
