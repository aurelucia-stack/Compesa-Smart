// =====================================
// Compesa Smart - app.js
// Versão 1.0
// =====================================

let calendario = [];

const input = document.getElementById("endereco");
const botao = document.getElementById("consultar");
const resultado = document.getElementById("resultado");

// Carrega os dados do calendário
async function carregarCalendario() {
  try {
    const resposta = await fetch("./data/calendario.json");

    if (!resposta.ok) {
      throw new Error("Não foi possível carregar o calendário.");
    }

    const dados = await resposta.json();
    calendario = dados.enderecos;

    console.log("Calendário carregado com sucesso.");
  } catch (erro) {
    console.error(erro);
    resultado.innerHTML = "Erro ao carregar o calendário.";
  }
}

// Consulta o endereço
function consultar() {

  const endereco = input.value.trim().toLowerCase();

  if (!endereco) {
    resultado.innerHTML = "Informe um endereço.";
    return;
  }

  const registro = calendario.find(item => {

    const enderecoCompleto =
      `${item.logradouro}, ${item.numero}`.toLowerCase();

    return enderecoCompleto.includes(endereco);

  });

  if (!registro) {
    resultado.innerHTML = "Endereço não encontrado.";
    return;
  }

  const hoje = new Date().toISOString().split("T")[0];

  if (registro.abastecimentos.includes(hoje)) {

    resultado.innerHTML = `
      <div class="status-ok">
        💧 Hoje tem abastecimento!
      </div>
    `;

    return;
  }

  const proxima = registro.abastecimentos.find(data => data > hoje);

  if (!proxima) {
    resultado.innerHTML = "Nenhum abastecimento futuro encontrado.";
    return;
  }

  const dias = calcularDias(hoje, proxima);

  resultado.innerHTML = `
    <div class="status-info">
      📅 Próximo abastecimento
    </div>

    <br>

    <strong>${formatarData(proxima)}</strong>

    <br><br>

    Faltam <strong>${dias}</strong> dias.
  `;
}

// Calcula diferença entre datas
function calcularDias(inicio, fim) {

  const data1 = new Date(inicio);
  const data2 = new Date(fim);

  const diferenca = data2 - data1;

  return Math.ceil(diferenca / (1000 * 60 * 60 * 24));

}

// Formata a data
function formatarData(dataISO) {

  const data = new Date(dataISO + "T00:00:00");

  return data.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

}

// Eventos
botao.addEventListener("click", consultar);

// Preenche automaticamente o endereço de teste
input.value = "Rua Teresita Bandeira, 205";

// Inicializa a aplicação
carregarCalendario();

// Registrar Service Worker
if ("serviceWorker" in navigator) {

  window.addEventListener("load", () => {

    navigator.serviceWorker
      .register("./sw.js")
      .then(() => console.log("Service Worker registrado com sucesso."))
      .catch((erro) => console.error("Erro ao registrar o Service Worker:", erro));

  });

}
