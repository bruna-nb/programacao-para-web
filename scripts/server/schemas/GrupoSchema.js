const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GrupoSchema = new Schema({
  plataforma: String,
  nVagas: Number,
  valorTotal: Number,
  integrantes: Array,
});

module.exports = GrupoSchema;
