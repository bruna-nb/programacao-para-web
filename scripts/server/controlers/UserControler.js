const mongoose = require("mongoose");
const UserSchema = require("../schemas/UserSchema");
const mongooseModel = mongoose.model("User", UserSchema);

function insertUser(user) {
  const entry = new mongooseModel(user);
  entry.save((e) =>
    e ? handleError(e) : console.log("Usuário cadastrado com sucesso!")
  );
}

function handleError(e) {
  console.log(e);
}

async function getUsers() {
  const query = await mongooseModel.find({});
  const resp = await query;
  return resp;
}

function selectUser(id) {
  const query = mongooseModel.find({ _id: id });
  return query.then((r) => r);
}

module.exports = insertUser;
module.exports = selectUser;
module.exports = getUsers;
