const express = require("express");
const grupoSchema = require("./grupoSchema.js")

const app = express();

app.post("/usuario", (req, res) => {
  console.log(req.params);
  res.send("post grupo");
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

app.listen(3000 || process.env.PORT, () => console.log("Servidor UP!"));
