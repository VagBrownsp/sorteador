const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzshhdl4ryLqs5TwhKtKz07a4ateWX9uTPhuXTtLx0Yw7mlajmuJZkJUY_k-LE2Rwbf/exec";

const form = document.getElementById("formFicha");
const mensagem = document.getElementById("mensagem");
const campoCelular = document.getElementById("celular");

// ---------- Máscara do celular ----------
function formatarCelular(valor) {
    const digitos = valor.replace(/\D/g, "").slice(0, 11);

    if (digitos.length > 6) {
        return digitos.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    }
    if (digitos.length > 2) {
        return digitos.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    }
    if (digitos.length > 0) {
        return digitos.replace(/^(\d*)/, "($1");
    }
    return "";
}

campoCelular.addEventListener("input", (e) => {
    e.target.value = formatarCelular(e.target.value);
});

// ---------- Envio do formulário ----------
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const cargo = document.getElementById("cargo").value.trim();
    const celular = campoCelular.value;

    mensagem.textContent = "⏳ Enviando...";

    try {
        const resposta = await fetch(SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify({
                nome,
                // Mantém a chave "dataNascimento" para continuar gravando
                // na mesma coluna da planilha (o valor agora é o cargo).
                dataNascimento: cargo,
                celular
            })
        });

        const resultado = await resposta.json();

        if (resultado.sucesso) {
            mensagem.textContent = "✅ Participação registrada com sucesso!";
            form.reset();
        } else {
            mensagem.textContent = "❌ Erro ao salvar inscrição: " + resultado.erro;
            console.error(resultado.erro);
        }
    } catch (erro) {
        mensagem.textContent = "❌ Erro de conexão.";
        console.error(erro);
    }
});
