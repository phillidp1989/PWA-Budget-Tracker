const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/styles.css",
  "/dist/bundle.js",
  "/dist/assets/icons/icon_96x96.png",
  "/dist/assets/icons/icon_128x128.png",
  "/dist/assets/icons/icon_192x192.png",
  "/dist/assets/icons/icon_256x256.png",
  "/dist/assets/icons/icon_384x384.png",
  "/dist/assets/icons/icon_512x512.png",
];

const PRECACHE = "precache-v8";
const RUNTIME = "runtime";

// Function to open cache and add assets
const cacheResources = async (cacheName, assets) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(assets);
  self.skipWaiting();
  return;
};

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(cacheResources(PRECACHE, FILES_TO_CACHE));
});

// Activate event which deletes old caches if replaced with new version
self.addEventListener("activate", event => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
      }).then(cachesToDelete => {
        return Promise.all(cachesToDelete.map(cacheToDelete => {
          return caches.delete(cacheToDelete);
        }));
      }).then(() => self.clients.claim())
    );
  });

//   Fetch event to intercept client requests to the server
self.addEventListener("fetch", event => {
    // non GET requests are not cached and requests to other origins are not cached
    if (
      event.request.method !== "GET" ||
      !event.request.url.startsWith(self.location.origin)
    ) {
      event.respondWith(fetch(event.request));
      return;
    }
  
    // handle runtime GET requests for data from /api routes
    if (event.request.url.includes("/api/transaction")) {
      // make network request and fallback to cache if network request fails (offline)
      event.respondWith(
        caches.open(RUNTIME).then(cache => {
          return fetch(event.request)
            .then(response => {
              cache.put(event.request, response.clone());
              return response;
            })
            .catch(() => caches.match(event.request));
        })
      );
      return;
    }
  
    // use cache first for all other requests for performance
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
  
        // request is not in cache. make network request and cache the response
        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  });