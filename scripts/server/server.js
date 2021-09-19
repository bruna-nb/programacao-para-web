const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

app.listen(3010 || process.env.PORT, () => console.log("Servidor UP!"));

app.post("/usuario", (req, res) => {
  res.json({
    msn: "Chegou na rota usuario - POST",
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    emaiç: req.body.email,
    telefone: req.body.telefone,
    cpf: req.body.cpf,
    senha: req.body.senha,
  });
});

app.get("/usuario", (req, res) => {
  res.send("Get usuário");
});

app.delete("/usuario", () => {});

app.post("/grupo", (req, res) => {
  res.send("post grupo");
});

app.get("/grupo", (req, res) => {
  res.send("Get grupo");
});

app.delete("/grupo", (req, res) => {});
