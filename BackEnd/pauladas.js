const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const cardapio = require('./empauladas.json');

app.get('/cardapio', (req, res) => {
  res.json(cardapio);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});