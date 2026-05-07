const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // ESSENCIAL para interpretar JSON

// Caminho do banco de dados
const dbPath = path.join(__dirname, "db.json");

// Inicializa o arquivo se não existir
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(
    dbPath,
    JSON.stringify({ clientes: [], chefs: [], menu: [] }, null, 2)
  );
}

// Funções auxiliares
function loadDB() {
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

function saveDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// ROTA: Cliente
app.post("/cliente", (req, res) => {
  const { nome } = req.body || {}; // Evita erro caso req.body seja undefined
  if (!nome) return res.status(400).json({ message: "Nome obrigatório" });

  const db = loadDB();
  db.clientes.push({ nome, id: Date.now() });
  saveDB(db);

  res.json({ message: `Cliente ${nome} logado com sucesso!` });
});

// ROTA: Registro de Chef
app.post("/chef/register", (req, res) => {
  const { email, senha } = req.body || {};
  if (!email || !senha)
    return res.status(400).json({ message: "Email e senha são obrigatórios" });

  const db = loadDB();
  if (db.chefs.length >= 3)
    return res.status(400).json({ message: "Limite de 3 chefs atingido" });

  const exists = db.chefs.find((c) => c.email === email);
  if (exists)
    return res.status(400).json({ message: "Esse email já está registrado" });

  db.chefs.push({ email, senha, id: Date.now() });
  saveDB(db);

  res.json({ message: "Chef registrado com sucesso!" });
});

// ROTA: Login de Chef
app.post("/chef/login", (req, res) => {
  const { email, senha } = req.body || {};
  if (!email || !senha)
    return res.status(400).json({ message: "Email e senha são obrigatórios" });

  const db = loadDB();
  const chef = db.chefs.find((c) => c.email === email && c.senha === senha);

  if (!chef) return res.status(401).json({ message: "Email ou senha inválidos" });

  res.json({ message: "Login realizado com sucesso!" });
});

// ROTA: teste simples
app.get("/", (req, res) => res.send("API rodando 🔥"));

// Inicia servidor
app.listen(PORT, () => {
  console.log(`🔥 API rodando em http://localhost:${PORT}`);
});