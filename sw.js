// Trauma Star launcher — offline cache
const CACHE = 'trauma-star-v61';
const ASSETS = ['./', './index.html', './protocols.html', './manual.html', './airway-ketamine.html', './ibw.html', './pressors.html', './peds.html', './wholeblood.html', './bends.html', './stroke-ischemic.html', './stroke-hemorrhagic.html', './stroke-undetermined.html', './seizures.html', './herniation.html', './cns-infection.html', './opioid-overdose.html', './cyanide.html', './tca-overdose.html', './envenomation.html', './transport-times.html', './ob-transport.html', './ob-antepartum-hemorrhage.html', './ob-pph.html', './ob-preterm-labor.html', './ob-preeclampsia.html', './ob-thyroid-storm.html', './ob-fetal-monitoring.html', './trauma-assessment.html', './trauma-tbi.html', './trauma-chest.html', './trauma-msk.html', './trauma-crush.html', './trauma-burns.html', './trauma-hypothermia.html', './trauma-gsw.html', './trauma-stab.html', './trauma-pwc.html', './trauma-mvc.html', './trauma-sharkbite.html', './trauma-chest-decompression.html', './hd-lvad.html', './hd-iabp.html', './hd-port.html', './hd-pericardiocentesis.html', './med-agitation.html', './med-acs.html', './med-chf.html', './med-anaphylaxis.html', './med-asthma.html', './med-glycemic.html', './med-hyperkalemia.html', './med-croup.html', './med-sepsis.html', './med-vascular.html', './med-nausea.html', './as-scales.html', './as-analgesia.html', './as-procedural.html', './as-post-intubation.html', './formulary-iv-acetaminophen.html', './drug-index.html', './manifest.json', './icon.svg'];

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
