const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "cardapio.json");

if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
}

function loadDB() {
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

function saveDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}


// =========================
// GET CARDÁPIO
// =========================

app.get("/cardapio", (req, res) => {

  const cardapio = loadDB();

  res.json(cardapio);

});


// =========================
// POST PIZZA
// =========================

app.post("/cardapio", (req, res) => {

  const cardapio = loadDB();

  const novaPizza = {
    id: Date.now(),
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    preco: req.body.preco,
    imagem: req.body.imagem,
  };

  cardapio.push(novaPizza);

  saveDB(cardapio);

  res.status(201).json({
    message: "Pizza adicionada",
    pizza: novaPizza,
  });

});


// =========================
// DELETE PIZZA
// =========================

app.delete("/cardapio/:id", (req, res) => {

  const id = Number(req.params.id);

  let cardapio = loadDB();

  cardapio = cardapio.filter(
    (pizza) => pizza.id !== id
  );

  saveDB(cardapio);

  res.json({
    message: "Pizza removida",
  });

});

app.listen(PORT, () => {
  console.log(`🍕 Cardápio rodando em http://localhost:${PORT}`);
});