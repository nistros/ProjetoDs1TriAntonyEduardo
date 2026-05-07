// BackEnd/app.js
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/usuarios", (req, res) => {
  res.json([
    { id: 1, nome: "Antony", email: "antony@email.com" },
    { id: 2, nome: "Maria", email: "maria@email.com" },
  ]);
});

app.post("/formulario", (req, res) => {
  const { name, email } = req.body;
  res.json({
    message: "Formulário recebido com sucesso!",
    dados: { name, email },
  });
});

module.exports = app;
