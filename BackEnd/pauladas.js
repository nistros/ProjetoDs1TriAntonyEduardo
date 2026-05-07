const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let cardapio = require('./empauladas.json');


// =========================
// GET -> LISTAR CARDÁPIO
// =========================

app.get('/cardapio', (req, res) => {
  res.json(cardapio);
});


// =========================
// POST -> ADICIONAR PIZZA
// =========================

app.post('/cardapio', (req, res) => {

  const novaPizza = {
    id: cardapio.length + 1,
    nome: req.body.nome,
    descricao: req.body.descricao
  };

  cardapio.push(novaPizza);

  res.status(201).json({
    mensagem: 'Pizza adicionada com sucesso',
    pizza: novaPizza
  });

});


// =========================
// PUT -> EDITAR PIZZA
// =========================

app.put('/cardapio/:id', (req, res) => {

  const id = parseInt(req.params.id);

  const pizza = cardapio.find(item => item.id === id);

  if (!pizza) {
    return res.status(404).json({
      mensagem: 'Pizza não encontrada'
    });
  }

  pizza.nome = req.body.nome || pizza.nome;
  pizza.descricao = req.body.descricao || pizza.descricao;

  res.json({
    mensagem: 'Pizza atualizada com sucesso',
    pizza
  });

});


// =========================
// DELETE -> REMOVER PIZZA
// =========================

app.delete('/cardapio/:id', (req, res) => {

  const id = parseInt(req.params.id);

  cardapio = cardapio.filter(item => item.id !== id);

  res.json({
    mensagem: 'Pizza removida com sucesso'
  });

});


// =========================
// SERVIDOR
// =========================

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});