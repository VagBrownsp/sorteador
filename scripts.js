const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzshhdl4ryLqs5TwhKtKz07a4ateWX9uTPhuXTtLx0Yw7mlajmuJZkJUY_k-LE2Rwbf/exec";

const form =
document.getElementById("formFicha");

const mensagem =
document.getElementById("mensagem");

form.addEventListener(
"submit",
async (e) => {

    e.preventDefault();

    const nome =
    document.getElementById("nome").value.trim();

    const dataNascimento =
    document.getElementById("dataNascimento").value;

    const celular =
    document.getElementById("celular").value;

    mensagem.innerHTML =
    "⏳ Enviando...";

    try {

        const resposta =
        await fetch(
            SCRIPT_URL,
            {
                method: "POST",
                body: JSON.stringify({
                    nome,
                    dataNascimento,
                    celular
                })
            }
        );

        const resultado =
await resposta.json();

console.log(resultado);

if(resultado.sucesso){

    mensagem.innerHTML =
    "✅ Participação registrada com sucesso!";

    form.reset();

} else {

    mensagem.innerHTML =
    "❌ Erro ao salvar inscrição: " +
    resultado.erro;

    console.error(resultado.erro);
}

    } catch(error){

        mensagem.innerHTML =
        "❌ Erro de conexão.";

        console.error(error);
    }
}
);

document
.getElementById("celular")
.addEventListener(
"input",
(e)=>{

    let value =
    e.target.value;

    value =
    value.replace(/\D/g,"");

    value =
    value.slice(0,11);

    if(value.length > 6){

        value =
        value.replace(
            /^(\d{2})(\d{5})(\d{0,4}).*/,
            "($1) $2-$3"
        );

    }else if(value.length > 2){

        value =
        value.replace(
            /^(\d{2})(\d{0,5})/,
            "($1) $2"
        );

    }else if(value.length > 0){

        value =
        value.replace(
            /^(\d*)/,
            "($1"
        );
    }

    e.target.value =
    value;
});
