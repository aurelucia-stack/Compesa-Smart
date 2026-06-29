// ===============================
// Compesa Smart - app.js
// Versão 1.0
// ===============================

const calendario = [
  {
    endereco: "Rua Teresita Bandeira, 205",
    bairro: "Peixinhos",
    cidade: "Olinda",
    abastecimentos: [
      "2026-06-28",
      "2026-07-01",
      "2026-07-04",
      "2026-07-07",
      "2026-07-10"
    ]
  }
];

const input = document.getElementById("endereco");
const botao = document.getElementById("consultar");
const resultado = document.getElementById("resultado");

botao.addEventListener("click", consultar);

function consultar() {

  const endereco = input.value.trim().toLowerCase();

  if (!endereco) {
    resultado.innerHTML = "Informe um endereço.";
    return;
  }

  const registro = calendario.find(item =>
    item.endereco.toLowerCase().includes(endereco)
  );

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

  const dias = calcularDias(

    // Registrar Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then(() => console.log("Service Worker registrado com sucesso."))
      .catch((erro) => console.error("Erro ao registrar o Service Worker:", erro));
  });
}
