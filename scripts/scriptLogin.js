const btnLogin = document.getElementById("btnLogin")

btnLogin.addEventListener("click", async function(){
    let email = document.getElementById("idEmail").value
    let senha = document.getElementById("idSenha").value

    const update = {
        email: email,
        pass: senha
    }
    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(update)
    }

    let response = await fetch ("http://localhost:3000/login", options)
    let autenticacao = await response.json()
    if(autenticacao.auth){
        localStorage.removeItem("userId")
        localStorage.setItem("userId", autenticacao.idUser)
        location.href = "meusGrupos.html"
    }else if(autenticacao.status == 401){
        document.getElementById("idOut").innerText = autenticacao.mensagem
    }
})