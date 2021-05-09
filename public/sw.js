'use strict';

const CACHE_NAME = 'offline-v1';

const staticFiles = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/js/vendors~main.chunk.js',
  '/static/js/main.chunk.js',
  '/static/js/0.chunk.js',
  '/logo192.png',
];

const fetchData = async (request, cache) => {
  const resp = await fetch(request);

  await cache.put(request, resp.clone());

  return resp;
};

const cacheFirst = async ({ request }) => {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  return cached ?? (await fetchData(request, cache));
};

self.addEventListener('install', (event) => {
  const cacheStaticFiles = async () => {
    const cache = await caches.open(CACHE_NAME);

    return Promise.all(
      staticFiles.map(function (url) {
        return cache.add(url).catch(function (reason) {
          console.log(`'${url}' failed: ${String(reason)}`);
        });
      })
    );
  };

  event.waitUntil(cacheStaticFiles());
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => e.respondWith(cacheFirst(e)));
