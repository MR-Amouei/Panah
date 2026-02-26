const CACHE_NAME = 'panah-v5';
const OFFLINE_URL = 'index.html';

const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './data/provinces.json',
  './data/hospitals.json',
  './data/shelters.json',
  './data/emergency_numbers.json',
];

const OPTIONAL_URLS = [
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap',
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    await cache.addAll(PRECACHE_URLS);

    await Promise.allSettled(
      OPTIONAL_URLS.map(url => cache.add(url).catch(() => {}))
    );

    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }
  if (!url.protocol.startsWith('http')) return;
  if (request.method !== 'GET') return;

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (url.origin === self.location.origin &&
      (url.pathname.endsWith('/') || url.pathname.endsWith('index.html'))) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  event.respondWith(networkFirst(request));
});


async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('آفلاین', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || offlineFallback();
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);

  return cached || fetchPromise || offlineFallback();
}

async function offlineFallback() {
  const cached = await caches.match(OFFLINE_URL);
  return cached || new Response('آفلاین هستید. لطفاً اتصال اینترنت را بررسی کنید.', {
    status: 503,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});