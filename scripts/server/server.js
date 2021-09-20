const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const selectUser = require("../server/controlers/UserControler");
const insertUser = require("../server/controlers/UserControler");
const getUsers = require("../server/controlers/UserControler");
const DB_URI =
  "mongodb+srv://leonardo_guzi:web123@flexflix.hf0tt.mongodb.net/flexFlix?retryWrites=true&w=majority";

const app = express();
app.use(express.json());
app.use(cors());
app.listen(3000 || process.env.PORT, () => console.log("Servidor UP!"));

async function conectDb() {
  await mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

conectDb().catch((e) => console.log(e));

app.post("/usuario", (req, res) => {
  res.json({
    msn: "Chegou na rota usuario - POST",
  });
  if (
    req.body.nome &&
    req.body.sobrenome &&
    req.body.email &&
    req.body.telefone &&
    req.body.cpf &&
    req.body.senha
  ) {
    insertUser(req.body);
  }
});

app.get("/usuario/:id", (req, res) => {
  selectUser(req.params.id).then((r) => res.json(r));
});

app.get("/usuarios/", async function (req, res) {
  const users = await getUsers();
  res.json(users);
});