// mock-api.js
const express = require('express');
const app = express();
const PORT = 4000;

// Cardápio mockado
const pizzas = [
  {
    id: 1,
    nome: "Margherita",
    descricao: "molho de tomate, mussarela e manjericão",
    imagem: "/images/margherita.png",
    preco: 35.00
  },
  {
    id: 2,
    nome: "Calabresa",
    descricao: "calabresa fatiada, cebola e mussarela",
    imagem: "/images/calabresa.png",
    preco: 38.00
  },
  {
    id: 3,
    nome: "Quatro Queijos",
    descricao: "mussarela, gorgonzola, parmesão e provolone",
    imagem: "/images/quatroqueijos.png",
    preco: 42.00
  },
  {
    id: 4,
    nome: "Portuguesa",
    descricao: "presunto, ovo, cebola, pimentão e azeitona",
    imagem: "/images/portuguesa.png",
    preco: 40.00
  },
];

// Endpoint mockado
app.get('/api/pizzas', (req, res) => {
  res.json(pizzas);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`API mockada rodando em http://localhost:${PORT}/api/pizzas`);
});
