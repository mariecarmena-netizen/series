const CACHE_NAME = "tus-series-v11",
  APP_SHELL = ["./index.html", "./manifest.webmanifest", "./assets/app-icon-192.png", "./assets/app-icon-512.png", "./assets/app-icon-maskable-512.png", "./assets/apple-touch-icon.png", "./assets/favicon-32.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(e => e.addAll(APP_SHELL)).then(() => self.skipWaiting()))
}), self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(e => Promise.all(e.filter(e => e !== CACHE_NAME).map(e => caches.delete(e)))).then(() => self.clients.claim()))
}), self.addEventListener("fetch", e => {
  "GET" === e.request.method && ("navigate" !== e.request.mode ? e.respondWith(caches.match(e.request).then(t => t || fetch(e.request))) : e.respondWith(fetch(e.request).then(t => {
    const s = t.clone();
    return caches.open(CACHE_NAME).then(t => t.put(e.request, s)), t
  }).catch(() => caches.match(e.request).then(e => e || caches.match("./index.html")))))
});
