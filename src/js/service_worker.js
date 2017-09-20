(function() {
  const CACHE_NAME = 'lego-sketch-pad-cache-v1';
  const urlsToCache = [
    '/dist/',
    'lib/default.css',
    'lib/index.min.js',
    'lib/hammer.min.js',
    'style.css',
    'main.js',
    'manifest.json'
  ];

  // Runs when the worker is first installed
  self.addEventListener('install', function(event) {
    console.log('installing service worker');
    event.waitUntil(
      caches.open(CACHE_NAME)
        // SW uses promises
        .then(function(cache) {
          console.log('Saving to cache');
          return cache.addAll(urlsToCache);
        })
    );
  });

  self.addEventListener('activate', function(event) {
    console.log('Service Worker activating.');

    // Remove old cached files
    event.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_NAME) {  // CACHE_NAME should include the version no. of the service worker
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
    return self.clients.claim();
  });

  // Intercept browser network requests, serve from cache
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            // Cache hit - return the cached response
            console.log('cache hit on', event.request.url);
            return response;
          } else {
            // Nothing in the cache - fetch the asset
            console.log('cache miss on', event.request.url);
            return fetch(event.request);
          }
        }
      )
    );
  });

  self.addEventListener('push', function(event) {
    var title = 'Yay a message.';
    var body = 'We have received a push message.';
    // var icon = '/images/smiley.svg';
    var tag = 'simple-push-example-tag';
    event.waitUntil(
      self.registration.showNotification(title, {
        body: body,
        // icon: icon,
        tag: tag
      })
    );
  });

})();