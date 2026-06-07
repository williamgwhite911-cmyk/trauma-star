// Trauma Star launcher — offline cache
const CACHE = 'trauma-star-v32';
const ASSETS = ['./', './index.html', './protocols.html', './manual.html', './airway-ketamine.html', './ibw.html', './pressors.html', './peds.html', './wholeblood.html', './bends.html', './stroke-ischemic.html', './stroke-hemorrhagic.html', './stroke-undetermined.html', './seizures.html', './herniation.html', './cns-infection.html', './opioid-overdose.html', './cyanide.html', './tca-overdose.html', './envenomation.html', './transport-times.html', './manifest.json', './icon.svg'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  // Cache-first for same-origin; network for everything else (e.g., the H&P builder link).
  let sameOrigin = false;
  try { sameOrigin = new URL(e.request.url).origin === self.location.origin; } catch (_) {}
  if (!sameOrigin) return;
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy));
      return res;
    }).catch(() => cached))
  );
});
