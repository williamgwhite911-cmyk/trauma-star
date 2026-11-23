/* Trauma Star protocols - offline cache. Built 2026-11-22.
   Change CACHE when index.html changes; phones pick it up next time they
   open the app with signal. */
var CACHE = "ts-protocols-v2-07c78059fd";
var FILES = ["./", "./index.html", "./manifest.webmanifest",
  "./icons/icon-180.png", "./icons/icon-192.png",
  "./icons/icon-512.png", "./icons/icon-maskable-512.png"];

self.addEventListener("install", function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(FILES); }).catch(function(){}));
});
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.map(function(k){ return k === CACHE ? null : caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
/* Network first so an update is picked up with signal; cache second so it
   still opens without any. */
self.addEventListener("fetch", function(e){
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(function(res){
    var copy = res.clone();
    caches.open(CACHE).then(function(c){ c.put(e.request, copy); }).catch(function(){});
    return res;
  }).catch(function(){
    return caches.match(e.request).then(function(hit){ return hit || caches.match("./index.html"); });
  }));
});
