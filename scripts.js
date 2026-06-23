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
function sortearParticipante() {

  const PLANILHA_ID = "1DkPdMoqi4Ha8vanhPumwIzlMYhXz74D9_urygOcnj3k";
  const planilha = SpreadsheetApp.openById(PLANILHA_ID);
  const aba = planilha.getSheetByName("Página1");

  const dados = aba.getDataRange().getValues();
  const participantes = dados.slice(1);

  if (participantes.length === 0) {
    return resposta({ sucesso: false, erro: "Sem participantes" });
  }

  const sorteado = participantes[Math.floor(Math.random() * participantes.length)];

  return resposta({
    sucesso: true,
    vencedor: {
      nome: sorteado[0],
      dataNascimento: sorteado[1],
      celular: sorteado[2]
    }
  });
}
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
