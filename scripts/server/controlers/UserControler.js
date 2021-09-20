const mongoose = require("mongoose");
const UserSchema = require("../schemas/UserSchema");
const mongooseModel = mongoose.model("User", UserSchema);

exports.insertUser = function (user) {
  const entry = new mongooseModel(user);
  entry.save((e) =>
    e ? handleError(e) : console.log("Usuário cadastrado com sucesso!")
  );
};

function handleError(e) {
  console.log(e);
}

exports.insertUser = async function () {
  const query = await mongooseModel.find({});
  const resp = await query;
  return resp;
};

exports.selectUser = async function (id) {
  const query = await mongooseModel.find({ _id: id });
  const resp = await query;
  return resp;
};

exports.userPorEmail = async function(email){
  const query = await mongooseModel.find({ email: email });
  return query;
}

exports.updateUser = async function(query, data){
  mongooseModel.updateMany(query, data, (err) => {
    if(err){
      console.log(err);
    }else{
      console.log("Usuário atualizado com sucesso");
    }
  })
}