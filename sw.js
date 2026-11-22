/* Trauma Star — offline cache.
   The whole app is index.html, so the install step caches that plus the icons
   and the manifest. Bump CACHE on every deploy: the activate step deletes the
   older caches, so a crew that opens the app after a deploy gets the new build. */
const CACHE = 'trauma-star-2026-11-21-r56';
/* The book pages and the reference pages are kept in their own cache, named for
   the book edition rather than the build, so shipping an app update does not
   throw away the 18 MB a crew already downloaded. */
const BULK = 'trauma-star-bulk-v4.2';
const ASSETS = ['./', './index.html', './manifest.webmanifest',
                './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k !== BULK).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Network first, cache as the fallback: a crew on the ground with signal gets the
   current build, and the same app opens with no signal in the aircraft. */
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  let sameOrigin = false;
  try { sameOrigin = new URL(e.request.url).origin === self.location.origin; } catch (_) {}
  if (!sameOrigin) return;
  e.respondWith(
    fetch(e.request).then((res) => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request).then((cached) => cached || caches.match('./index.html')))
  );
});
