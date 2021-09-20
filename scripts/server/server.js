const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const userControler = require("../server/controlers/UserControler");
const groupControler = require("../server/controlers/GrupoControler");

const DB_URI =
  "mongodb+srv://leonardo_guzi:web123@flexflix.hf0tt.mongodb.net/flexFlix?retryWrites=true&w=majority";
const { response } = require("express");

const app = express();
app.use(express.json());
app.use(cors());
app.listen(3000 || process.env.PORT, () => console.log("Servidor UP!"));

var idUserLogado = ""

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
    userControler.insertUser(req.body);
  }
});

app.get("/usuario/:id", async function (req, res) {
  const user = await userControler.selectUser(req.params.id);
  res.json(user[0]);
});

app.get("/usuarios/", async function (req, res) {
  const users = await userControler.getUsers();
  res.json(users);
});

app.post("/grupo", async function(req, res){
  try {
    let criador = await(userControler.selectUser(req.body.idUser))
    let grupo = {
      "plataforma": req.body.plataforma,
      "nVagas": req.body.nVagas,
      "valorTotal": req.body.valorTotal,
      "integrantes": criador
    }
    let novoGrupo = await groupControler.insertGrupo(grupo);
    console.log(novoGrupo);
    inserirNovoGrupoNoUser(novoGrupo, criador)
    res.send({"status": 200, "idGrupo": novoGrupo._id})
  }catch(err){
    console.log(err);
    res.send({"status": 500, "err": "Não foi possível criar o grupo"})
  }
});

function inserirNovoGrupoNoUser(novoGrupo, user){
  let groupListAtual = user[0].grupos
  groupListAtual.push(novoGrupo)
  userControler.updateUser({_id: user._id}, {grupos: groupListAtual})
}

app.get("/grupo/:id", async function (req, res) {
  const grupo = await groupControler.selectGrupo(req.params.id);
  res.json(grupo[0]);
});

app.get("/grupo", async function (req, res) {
  const grupos = await groupControler.getGrupos();
  res.json(grupos);
});

app.post("/login", async function (req, res) {
  const login = await autenticacao(req.body.email, req.body.pass)
  return res.send(login)
})

async function autenticacao(email, pass) {
  try {
    const user = await userControler.userPorEmail(email)
    try {
      if (user.length == 0) {
        throw userErr
      } else {
        const senha = user[0].senha
        try {
          if(senha != pass){
            throw passErr
          }else{
            return {"auth": true, "idUser": user[0]._id}
          }
        } catch (passErr) {
          return { "status": 401, "mensagem": "Senha incorreta", "auth": false }
        }
      }
    } catch (userErr) {
      return { "status": 401, "mensagem": "Usuário não encontrado", "auth": false }
    }
  } catch (err) {
    console.log(err);
    return { "status": 500, "mensagem": "erro ao conectar com o banco de dados", "auth": false }
  }
}

app.post("/novoIntegrante", async function(req, res){
  res.json({
    msn: "Chegou na rota novoIntegrante - POST",
  })
  let novoIntegrante = await userControler.userPorEmail(req.body.email)
  let grupo = await groupControler.selectGrupo(req.body.grupoId)
  inserirNovoGrupoNoUser(grupo, novoIntegrante[0])
  inserirNovoUserNoGrupo(grupo, novoIntegrante[0])
})

function inserirNovoUserNoGrupo(grupo, user){
  let userListAtual = grupo.integrantes
  userListAtual.push(user)
  groupControler.updateGrupo({_id: grupo._id}, {integrantes: userListAtual})
}

app.post("/deleteGrupo", async function(req, res){
  res.json({
    msn: "Chegou na rota delete - POST",
  })
  let grupo = await groupControler.selectGrupo(req.body.idGrupo)
  for(let i =0; i<grupo[0].integrantes.length; i++){
    let usuario = await userControler.selectUser(grupo[0].integrantes[i]._id)
    removerGrupoDoUsuario(usuario, grupo)
  }
  groupControler.deleteGrupo({_id: grupo[0]._id})
})


function removerGrupoDoUsuario(usuario, grupo){
  let groupListAtual = usuario[0].grupos
  var index = groupListAtual.indexOf(grupo[0])
  groupListAtual.splice(index, 1)
  userControler.updateUser({_id:usuario[0]._id}, {grupos: groupListAtual})
}

app.post("/sairDoGrupo", async function(req, res){
  res.json({
    msn: "Chegou na rota sair do grupo - POST",
  })
  let grupo = await groupControler.selectGrupo(req.body.idGrupo)
  let user = await userControler.selectUser(req.body.idUser)
  removerGrupoDoUsuario(user, grupo)
})
