// =====================================
// Compesa Smart - Service Worker
// Versão 1.0
// =====================================

const CACHE_NAME = "compesa-smart-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./data/calendario.json"
];

// Instala o Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache criado.");
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

// Ativa o Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

// Busca arquivos
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
