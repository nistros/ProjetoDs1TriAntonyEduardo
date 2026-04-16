// BackEnd/app.js
const express = require("express");
const cors = require("cors");

const app = express();

// Definição da porta (pode usar variável de ambiente ou padrão 3000)
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
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

// Exemplo de rota de login (opcional)
app.post("/login", (req, res) => {
  const { email, senha } = req.body;
  if (email === "teste@email.com" && senha === "1234") {
    res.json({ message: "Login realizado com sucesso!" });
  } else {
    res.status(401).json({ message: "Credenciais inválidas" });
  }
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`API mockada rodando em http://localhost:${PORT}`);
});
