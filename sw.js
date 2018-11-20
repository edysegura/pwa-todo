self.addEventListener('install', event => {
  console.info('[Service Worker] Installing Service Worker ...', event)
  event.waitUntil(
    caches.open('todo-list').then(cache => {
      cache.addAll([
        '/',
        '/index.html',
        '/css/style.css',
        '/src/js/TodoService.js',
        '/src/js/HTMLService.js',
        '/src/js/index.js'
      ])
    })
  )
  return self.clients.claim()
})

self.addEventListener('activate', event => {
  console.info('[Service Worker] Activating Service Worker ...', event)
  return self.clients.claim()
})

self.addEventListener('fetch', event => {
  console.info('[Service Worker] Fetching something ...', event)
  event.respondWith(
    caches.match(event.request)
      .then(request => request)
  )
})
