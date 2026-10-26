// Service worker: roda separado da página e intercepta os pedidos de rede.
// Mudou algum arquivo? Troque a versão do cache (v1 → v2).
const CACHE = "ola-celular-v1";

const ARQUIVOS = [
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
];

// 1. Instalação: baixa os arquivos do app e guarda no cache
self.addEventListener("install", (evento) => {
  evento.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ARQUIVOS)));
  self.skipWaiting();
});

// 2. Ativação: apaga caches de versões antigas
self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys().then((nomes) =>
      Promise.all(nomes.filter((nome) => nome !== CACHE).map((nome) => caches.delete(nome)))
    )
  );
  self.clients.claim();
});

// 3. Cada pedido: tenta a internet; se falhar (modo avião), usa o cache
self.addEventListener("fetch", (evento) => {
  evento.respondWith(fetch(evento.request).catch(() => caches.match(evento.request)));
});
