const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nome: String,
  sobrenome: String,
  email: String,
  telefone: String,
  cpf: String,
  senha: String,
});

module.exports = UserSchema;
