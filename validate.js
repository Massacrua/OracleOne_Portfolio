const camposDoFormulario = document.querySelectorAll("[required]");
const tiposDeErro = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "tooShort",
    "customError"
]

const mensagens = {
    nome: {
        valueMissing: "Preencha seu nome.",
        tooShort: "Por favor, preencha um nome válido.",
    },
    email: {
        valueMissing: "Preencha seu email.",
        typeMismatch: "Por favor, use um email válido",
        tooShort: "Por favor, use um email válido.",
        customError: "Por favor, use um email válido."
    },
    assunto: {
        valueMissing: "Preencha o assunto.",
    },
    mensagem: {
        valueMissing: "Escreva sua mensagem.",
        tooShort: "Escreva uma mensagem maior.",
    }
}

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
})

function verificaCampo(campo) {
    let mensagem = ""
    if (campo.name == "email" && !campo.value.includes(".")) {
        campo.setCustomValidity("email inválido")
    } else {
        campo.setCustomValidity("")
    }
    tiposDeErro.forEach(erro => {
        if(campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro]
        }
    })

    const mensagemErro = campo.parentNode.querySelector(".msg__erro");
    const validaInput = campo.checkValidity()

    if (!validaInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }
}