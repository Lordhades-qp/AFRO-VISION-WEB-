// service-worker.js

const CACHE_NAME = "afro-chronique-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/script.js",
    "/styles.css",
    "/episode1.html",
    "/episode2.html"
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);  // Mise en cache des fichiers nécessaires
            })
    );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);  // Supprimer les caches obsolètes
                    }
                })
            );
        })
    );
});

// Gestion des requêtes réseau
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Si on trouve une réponse en cache, on la retourne
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Sinon, on fait la requête réseau
                return fetch(event.request).then((response) => {
                    // On peut mettre la réponse en cache pour les futures requêtes
                    return caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, response.clone());
                            return response;
                        });
                });
            })
    );
});
