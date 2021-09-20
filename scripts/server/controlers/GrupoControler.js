const mongoose = require("mongoose");
const GrupoSchema = require("../schemas/GrupoSchema");
const mongooseModel = mongoose.model("Grupo", GrupoSchema);

exports.insertGrupo = function(grupo) {
  const entry = new mongooseModel(grupo);
  entry.save((e) =>
    e ? handleError(e) : console.log("Grupo criado com sucesso!")
  );
}

function handleError(e) {
  console.log(e);
}

exports.getGrupos = async function(){
  const query = await mongooseModel.find({});
  return await query;
}

exports.selectGrupo = async function(id){
  const query = await mongooseModel.find({ _id: id });
  return await query
}
