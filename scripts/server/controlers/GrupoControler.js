const mongoose = require("mongoose");
const GrupoSchema = require("../schemas/GrupoSchema");
const mongooseModel = mongoose.model("Grupo", GrupoSchema);

function insertGrupo(grupo) {
  const entry = new mongooseModel(grupo);
  entry.save((e) =>
    e ? handleError(e) : console.log("Grupo criado com sucesso!")
  );
}

function handleError(e) {
  console.log(e);
}

async function getGrupos() {
  const query = await mongooseModel.find({});
  return await query;
}

async function selectGrupo(id) {
  const query = await mongooseModel.find({ _id: id });
  return await query
}

module.exports = insertGrupo;
module.exports = selectGrupo;
module.exports = getGrupos;
