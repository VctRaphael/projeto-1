// Service Worker do GridZone PWA
const CACHE_NAME = 'gridzone-v1';
const ASSETS = [
  './',
  './index.html',
  './logo.jpg',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Network first com fallback para cache
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
