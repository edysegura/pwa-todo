self.addEventListener('install', event => {
  console.info('[Service Worker] Installing Service Worker ...', event)
  return self.clients.claim();
})

self.addEventListener('activate', event => {
  console.info('[Service Worker] Activating Service Worker ...', event)
  return self.clients.claim()
})

self.addEventListener('fetch', event => {
  console.info('[Service Worker] Fetching something ...', event)
  event.respondWith(fetch(event.request))
})
