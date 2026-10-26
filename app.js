const largura = document.getElementById("largura");
const botao = document.getElementById("botao");
const contador = document.getElementById("contador");

function mostrarLargura() {
  largura.textContent = window.innerWidth + "px";
}
mostrarLargura();
window.addEventListener("resize", mostrarLargura);

let toques = 0;
botao.addEventListener("click", () => {
  toques = toques + 1;
  contador.textContent = "Você tocou " + toques + " vez(es).";
  console.log("toque número", toques);
});

// Registra o service worker: é ele que faz o app abrir sem internet
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then(() => console.log("Service worker registrado"))
    .catch((erro) => console.error("Falha ao registrar o service worker:", erro));
}
