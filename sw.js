const CACHE_NAME = 'guide-medecin-conseil-v4.3.115-MINIMAL';
const DATA_CACHE_NAME = 'guide-medecin-conseil-data-v4.3.115-MINIMAL';

// Ressources essentielles à mettre en cache immédiatement
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
];

// Installation du Service Worker
self.addEventListener('install', event => {
  console.log('📦 Service Worker: Installation en cours...');
  
  // Force le nouveau SW à remplacer l'ancien immédiatement
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async cache => {
        console.log('✅ Cache ouvert:', CACHE_NAME);
        // Mettre en cache les ressources une par une pour éviter l'échec complet
        for (const url of STATIC_CACHE_URLS) {
          try {
            await cache.add(url);
            console.log('✅ Mis en cache:', url);
          } catch (error) {
            console.warn('⚠️ Impossible de mettre en cache:', url, error.message);
          }
        }
      })
      .catch(error => {
        console.error('❌ Erreur lors de la mise en cache initiale:', error);
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker: Activation en cours...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Supprimer les anciens caches
          if (cacheName !== CACHE_NAME && cacheName !== DATA_CACHE_NAME) {
            console.log('🗑️ Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Prendre le contrôle immédiatement
      return self.clients.claim();
    }).then(() => {
      console.log('✅ Service Worker activé et en contrôle');
    })
  );
});

// Stratégie Cache-First pour TOUT
self.addEventListener('fetch', event => {
  // Ignorer les requêtes non-GET
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Ignorer les requêtes Chrome extension
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }
  
  const url = new URL(event.request.url);
  
  // Stratégie Cache-First pour TOUTES les ressources
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Retourner depuis le cache
          console.log('📦 Depuis cache:', event.request.url);
          return cachedResponse;
        }
        
        // Si pas en cache, récupérer du réseau et mettre en cache
        return fetch(event.request.clone())
          .then(networkResponse => {
            // Vérifier si la réponse est valide
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'error') {
              return networkResponse;
            }
            
            // Mettre en cache pour la prochaine fois
            const responseToCache = networkResponse.clone();
            
            // Utiliser le cache approprié selon le type de ressource
            const cacheName = url.pathname.startsWith('/data/') ? DATA_CACHE_NAME : CACHE_NAME;
            
            caches.open(cacheName)
              .then(cache => {
                cache.put(event.request, responseToCache);
                console.log('💾 Mis en cache:', event.request.url);
              });
            
            return networkResponse;
          })
          .catch(error => {
            console.error('❌ Erreur réseau:', event.request.url, error);
            
            // Retourner une page offline personnalisée si disponible
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            
            // Pour les autres ressources, retourner une réponse vide
            return new Response('Ressource non disponible hors ligne', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Écouter les messages du client (pour forcer le rafraîchissement du cache)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }).then(() => {
        console.log('🗑️ Tous les caches supprimés');
        return self.clients.matchAll();
      }).then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: 'CACHE_CLEARED' });
        });
      })
    );
  }
});