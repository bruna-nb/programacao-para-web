var listaGrupos = document.getElementById("idGruposLista")
var idUser

window.onload = async function(){
    idUser = localStorage.getItem("userId")
    try{
        let user = await fetch ("http://localhost:3000/usuario?id="+idUser)
        for(let i = 0; i < user.grupos.length; i++){
            criaNovoLi(user.grupos[i])
        }
    }catch(err){
        console.log("usuario não encontrado");
    }
}

async function criaNovoLi(grupo){
    let novoItem = document.createElement("li")
    novoItem.id = grupo._id
    let grupoAtualizado = await fetch ("http://localhost:3000/usuario?id="+grupo._id)
    let valorPorPessoa = calcularValorPorPessoa(grupoAtualizado)
    novoItem.innerText = grupoAtualizado.plataforma + " - " + grupoAtualizado.integrantes.length + " membros" + " - R$ "+valorPorPessoa+ "por membro."
    criaBotoesItem(novoItem)
    listaGrupos.appendChild(novoItem)
}

function calcularValorPorPessoa(grupo){
    return grupo.valorTotal / grupo.integrantes.length
}

function criaBotoesItem(novoItem){
    let botaoInserir = document.createElement("button")
    botaoInserir.type = "button"
    botaoInserir.class = "botao-grupo"
    botaoInserir.onclick = inserirIntegrante(novoItem.id)
    botaoInserir.innerText = "Inserir Membro"
    novoItem.appendChild(botaoInserir)

    let botaoSairDoGrupo = document.createElement("button")
    botaoSairDoGrupo.type = "button"
    botaoSairDoGrupo.class = "botao-grupo"
    botaoSairDoGrupo.onclick = sairDoGrupo(novoItem.id)
    botaoSairDoGrupo.innerText = "Sair do Grupo"
    botaoSairDoGrupo.appendChild(botaoSairDoGrupo)

    let botaoExcluirGrupo = document.createElement("button")
    botaoExcluirGrupo.type = "button"
    botaoExcluirGrupo.class = "botao-grupo"
    botaoExcluirGrupo.onclick = excluirGrupo(novoItem.id)
    botaoExcluirGrupo.innerText = "Excluir Grupo"
    botaoExcluirGrupo.appendChild(botaoExcluirGrupo)    
}

async function inserirIntegrante(idGrupo){
    let email = prompt("Informe o e-mail para inserir um novo integrante: ")
    const update = {
        email: email,
        grupoId: idGrupo
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(update)
    }

    try{
        let response = await fetch ("http://localhost:3000/novoIntegrante", options)
        alert("Membro adicionado com sucesso")
    }catch(err){
        console.log(err);
    }
}

async function sairDoGrupo(idGrupo){
    const update = {
        idUser: idUser,
        grupoId: idGrupo
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(update)
    }

    try{
        let response = await fetch ("http://localhost:3000/sairDoGrupo", options)
        location.href = "meusGrupos.html"
    }catch(err){
        console.log(err);
    }
}

async function excluirGrupo(idGrupo){
    const update = {
        idGrupo: idGrupo
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(update)
    }

    try{
        let response = await fetch ("http://localhost:3000/deleteGrupo", options)
        location.href = "meusGrupos.html"
    }catch(err){
        console.log(err);
    }
}