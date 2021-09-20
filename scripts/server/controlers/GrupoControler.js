const mongoose = require("mongoose");
const GrupoSchema = require("../schemas/GrupoSchema");
const mongooseModel = mongoose.model("Grupo", GrupoSchema);

exports.insertGrupo = async function (grupo) {
    let novoGrupo = await inserirNovoGrupo(grupo)
    return novoGrupo;
}

function inserirNovoGrupo(grupo) {
  return new Promise((resolve, reject) => {
    const entry = new mongooseModel(grupo)
    entry.save(async function (err, group) {
        resolve(group)
      })
  })
}

function handleError(e) {
  console.log(e);
}

exports.getGrupos = async function () {
  const query = await mongooseModel.find({});
  return await query;
}

exports.selectGrupo = async function (id) {
  const query = await mongooseModel.find({ _id: id });
  return await query
}

exports.updateGrupo = function (query, data) {
  mongooseModel.updateMany(query, data, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Grupo atualizado com sucesso");
    }
  })
}

exports.deleteGrupo = function (query) {
  mongooseModel.deleteOne(query, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Grupo excluído com sucesso");
    }
  })
}