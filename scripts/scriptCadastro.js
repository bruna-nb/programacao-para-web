const FORM = document.querySelector(".campos-formulario");
const ENVIAR = document.querySelector(".enviar");
const CANCELAR = document.querySelector(".cancelar");
const URL = "localhost:3000";
const inicio = () => (window.location.href = "index.html");
CANCELAR.addEventListener("click", inicio);
ENVIAR.addEventListener("click", validarCadastro);
FORM.addEventListener("keyup", (event) =>
  event.key === "Enter" ? validarCadastro() : null
);

function ehMenorQue(string, tamanho) {
  if (!string) {
    return false;
  } else {
    return string.length <= tamanho;
  }
}
function ehEmailValido(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function ehTelefoneValido(telefone) {
  const re =
    /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
  return re.test(telefone);
}

function ehCpfValido(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf == "") return false;
  // Elimina CPFs invalidos conhecidos
  if (
    cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999"
  )
    return false;
  // Valida 1o digito
  add = 0;
  for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(9))) return false;
  // Valida 2o digito
  add = 0;
  for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(10))) return false;
  return true;
}

function validarCadastro() {
  let bolArray = [];
  const nome = FORM.querySelector(".nome").value;
  const sobrenome = FORM.querySelector(".sobrenome").value;
  const email = FORM.querySelector(".email").value;
  const telefone = FORM.querySelector(".telefone").value;
  const cpf = FORM.querySelector(".cpf").value;
  const senha = FORM.querySelector(".senha").value;
  const confirmaSenha = FORM.querySelector(".confirma-senha").value;
  if (!ehMenorQue(nome, 15)) {
    const parentDiv = FORM.querySelector(".nome").parentNode;
    const aviso = parentDiv.querySelector(".aviso");
    aviso.innerHTML = `Digite um nome com menos de 15 caracteres`;
    bolArray.push(false);
  } else {
    const parentDiv = FORM.querySelector(".nome").parentNode;
    const aviso = parentDiv.querySelector(".aviso");
    aviso.innerHTML = ``;
    bolArray.push(true);
  }
  if (!ehMenorQue(sobrenome, 15)) {
    const parentDiv = FORM.querySelector(".sobrenome").parentNode;
    const aviso = parentDiv.querySelector(".aviso");
    aviso.innerHTML = `Digite um sobrenome com menos de 15 caracteres`;
    bolArray.push(false);
  } else {
    const parentDiv = FORM.querySelector(".sobrenome").parentNode;
    const aviso = parentDiv.querySelector(".aviso");
    aviso.innerHTML = ``;
    bolArray.push(true);
  }
  if (!ehEmailValido(email)) {
    const parentDiv = FORM.querySelector(".email").parentNode;
    const aviso = parentDiv.querySelector(".aviso");
    aviso.innerHTML = `Digite um email valido!`;
    bolArray.push(false);
  } else {
    const parentDiv = FORM.querySelector(".email").parentNode;
    const aviso = parentDiv.querySelector(".aviso");
    aviso.innerHTML = ``;
    bolArray.push(true);
  }
  if (!ehTelefoneValido(telefone)) {
    const parentDiv = FORM.querySelector(".telefone").parentNode;
    const aviso = parentDiv.querySelector(".aviso");
    aviso.innerHTML = `Digite um telefone valido!`;
    bolArray.push(false);
  } else {
    const parentDiv = FORM.querySelector(".telefone").parentNode;
    const aviso = parentDiv.querySelector(".aviso");
    aviso.innerHTML = ``;
    bolArray.push(true);
  }
  if (!ehCpfValido(cpf)) {
    const parentDiv = FORM.querySelector(".cpf").parentNode;
    const aviso = parentDiv.querySelector(".aviso");
    aviso.innerHTML = `Digite um CPF valido!`;
    bolArray.push(false);
  } else {
    const parentDiv = FORM.querySelector(".cpf").parentNode;
    const aviso = parentDiv.querySelector(".aviso");
    aviso.innerHTML = ``;
    bolArray.push(true);
  }
  if (!senha) {
    const parentDiv = FORM.querySelector(".senha").parentNode;
    const aviso = parentDiv.querySelector(".aviso");
    aviso.innerHTML = `Digite uma senha.`;
    bolArray.push(false);
  } else {
    const parentDiv = FORM.querySelector(".senha").parentNode;
    const aviso = parentDiv.querySelector(".aviso");
    aviso.innerHTML = ``;
    bolArray.push(true);
  }
  if (confirmaSenha !== senha) {
    const parentDiv = FORM.querySelector(".confirma-senha").parentNode;
    const aviso = parentDiv.querySelector(".aviso");
    aviso.innerHTML = `As senhas não coincidem!`;
    bolArray.push(false);
  } else {
    const parentDiv = FORM.querySelector(".confirma-senha").parentNode;
    const aviso = parentDiv.querySelector(".aviso");
    aviso.innerHTML = ``;
    bolArray.push(true);
  }
  //retorna true se todos passar em todas as validações.
  if (bolArray.every((bol) => bol === true)) {
    const dados = {
      nome: nome,
      sobrenome: sobrenome,
      email: email,
      telefone: telefone,
      cpf: cpf,
      senha: senha,
    };
    cadastrarUsario(dados);
  }
}

function cadastrarUsario(body) {
  (async function () {
    var options = {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    };

    var resposta = await fetch("http://localhost:3000/usuario", options);
    console.log(await resposta.json());
    redirect();
  })();
}

function redirect() {
  alert("Cadastrado com sucesso!!!");
  window.location.href = "index.html";
}
