const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000; 

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "db.json");

// Inicializa o arquivo se não existir
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ clientes: [], chefs: [], menu: [] }, null, 2));
}

function loadDB() {
    return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

function saveDB(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// ROTA: Cliente
app.post("/cliente", (req, res) => {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ message: "Nome obrigatório" });

    const db = loadDB();
    db.clientes.push({ nome, id: Date.now() });
    saveDB(db);
    res.json({ message: "Cliente logado!" });
});

// ROTA: Registro de Chef
app.post("/chef/register", (req, res) => {
    const { email, senha } = req.body;
    const db = loadDB();
    if (db.chefs.length >= 3) return res.status(400).json({ message: "Limite de 3 chefs atingido" });
    
    db.chefs.push({ email, senha, id: Date.now() });
    saveDB(db);
    res.json({ message: "Chef registrado com sucesso!" });
});

// ROTA: Login de Chef
app.post("/chef/login", (req, res) => {
    const { email, senha } = req.body;
    const db = loadDB();
    const chef = db.chefs.find(c => c.email === email && c.senha === senha);
    
    if (!chef) return res.status(401).json({ message: "Email ou senha inválidos" });
    res.json({ message: "Login realizado!" });
});

app.listen(PORT, () => {
    console.log(`🔥 API rodando em http://localhost:${PORT}`);
});