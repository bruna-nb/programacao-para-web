const FORM = document.querySelector(".campos-formulario");
const ENVIAR = document.querySelector(".enviar");
const CANCELAR = document.querySelector(".cancelar");
CANCELAR.addEventListener("click", home);
ENVIAR.addEventListener("click", validarCadastroGrupo);
FORM.addEventListener("keyup", (event) =>
  event.key === "Enter" ? validarCadastro() : null
);

function ehVazio(element) {
  if (element == "") {
    return true
  } else {
    return false
  }
}

function validarCadastro() {
  const plataforma = FORM.querySelector(".clPlataforma").value;
  const numeroVagas = FORM.querySelector(".clNumeroVagas").value;
  const valorAssinatura = FORM.querySelector(".valorAssinatura").value;
  let bolArray = [];

  if (ehVazio(plataforma)) {
    const parentDiv = form.querySelector(".clPlataforma").parentNode;
    const aviso = parentDiv.querySelector(".aviso");
    aviso.innerHTML = `Selecione uma plataforma.`
    bolArray.push(false)
  } else {
    const parentDiv = form.querySelector(".clPlataforma").parentNode;
    const aviso = parentDiv.querySelector(".aviso");
    aviso.innerHTML = ``
    bolArray.push(true)
  }

  if (ehVazio(numeroVagas)) {
    const parentDiv = FORM.querySelector(".clNumeroVagas").parentNode;
    const aviso = parentDiv.querySelector(".aviso");
    aviso.innerHTML = `Informe o número de vagas disponíveis`
    bolArray.push(false)
  } else {
    const parentDiv = FORM.querySelector(".clNumeroVagas").parentNode;
    const aviso = parentDiv.querySelector(".aviso");
    aviso.innerHTML = ``
    bolArray.push(true)
  }

  if (ehVazio(valorAssinatura)) {
    const parentDiv = FORM.querySelector(".valorAssinatura").parentNode;
    const aviso = parentDiv.querySelector(".aviso");
    aviso.innerHTML = `Informe o valor total da assinatura`
    bolArray.push(false)
  } else {
    const parentDiv = FORM.querySelector(".valorAssinatura").parentNode;
    const aviso = parentDiv.querySelector(".aviso");
    aviso.innerHTML = ``
    bolArray.push(true)
  }

  //retorna true se todos passar em todas as validações.
  if (bolArray.every((bol) => bol === true)) {
    const dados = {
      plataforma: plataforma,
      numeroVagas: numeroVagas,
      valorAssinatura: valorAssinatura,
    };
    cadastrarGrupo(dados)
  }
}

async function cadastrarGrupo(dados) {
  var options = {
    method: "POST",
    body: JSON.stringify(dados),
    headers: { "Content-Type": "application/json" },
  };

  var resposta = await fetch("http://localhost:3000/usuario", options);
  console.log(await resposta.json());
  redirect()
}

function redirect() {
  alert("Grupo criado com sucesso!!!");
  window.location.href = "meusGrupos.html";
}