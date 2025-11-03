import { mockProfileAPI } from "./src/js/mock-api.js";

const cacheName = "app-shell-v4";
const assetsToCache = [
  "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
  "https://fonts.gstatic.com/s/roboto/v49/KFO7CnqEu92Fr1ME7kSn66aGLdTylUAMa3yUBA.woff2",
  "https://fonts.gstatic.com/s/materialicons/v145/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
  "https://fonts.googleapis.com/css?family=Roboto:400,700",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "src/assets/images/pwa-logo.png",
  "src/assets/images/offline.svg",
  "src/assets/images/cat.jpg",
  "src/assets/js/material.min.js",
  "src/css/style.css",
  "src/js/app.js",
  "src/js/mock-api.js",
  "src/offline.html",
  "favicon.ico",
  "index.html",
  "/",
];

self.addEventListener("install", (event) => {
  console.log(`👁️ [sw.js] installing static assets...`);
  self.skipWaiting();
  event.waitUntil(cacheStaticAssets());
});

self.addEventListener("activate", (event) => {
  console.log(`👁️ [sw.js] activated`);
  event.waitUntil(cacheCleanup());
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  console.log(`👁️ [sw.js] request: ${request.url}`);
  event.respondWith(proxy(request));
});

async function cacheStaticAssets() {
  const cache = await caches.open(cacheName);
  return cache.addAll(assetsToCache);
}

async function removeOldCache(key) {
  if (key !== cacheName) {
    console.log(`👁️ [sw.js] removing old cache: ${key}`);
    return caches.delete(key);
  }
}

async function cacheCleanup() {
  const keyList = await caches.keys();
  return Promise.all(keyList.map(removeOldCache));
}

async function proxy(request) {
  console.log(`👁️ [sw.js] proxying...`);
  const url = new URL(request.url);
  return networkFirst(request);
}

async function networkFirst(request) {
  try {
    return await fetch(request);
  } catch (error) {
    const cache = await caches.open(cacheName);
    const responseCached = await cache.match(request.url);
    if (!responseCached && request.headers.get("accept").startsWith("image/")) {
      return cache.match("src/assets/images/offline.svg");
    }
    return cache.match(request.url);
  }
}
