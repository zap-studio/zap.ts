// TODO: Add cache-busting for hashed JS/CSS assets if you need offline support beyond the precached files below.
(function () {
  const CACHE_VERSION = "v1";
  const CACHE_NAME = `zap-ts-${CACHE_VERSION}`;
  const PRECACHE_URLS = ["/", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png"];

  self.addEventListener("install", (event) => {
    event.waitUntil(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(PRECACHE_URLS);
      })(),
    );
    self.skipWaiting();
  });

  self.addEventListener("activate", (event) => {
    event.waitUntil(
      (async () => {
        const keys = await caches.keys();
        const deletions = [];
        for (const key of keys) {
          if (key !== CACHE_NAME) {
            deletions.push(caches.delete(key));
          }
        }
        await Promise.all(deletions);
      })(),
    );
    self.clients.claim();
  });

  self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") {
      return;
    }

    const url = new URL(event.request.url);
    if (url.origin !== self.location.origin || !PRECACHE_URLS.includes(url.pathname)) {
      return;
    }

    event.respondWith(
      (async () => {
        const cached = await caches.match(event.request);
        return cached ?? fetch(event.request);
      })(),
    );
  });
})();
