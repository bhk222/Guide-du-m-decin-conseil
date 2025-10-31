const CACHE_NAME = 'at-mp-guide-cache-v42';
const urlsToCache = [
  // App Shell
  '/',
  '/index.html',
  '/manifest.json',
  '/metadata.json',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/css/index.css',
  
  // Icons
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/apple-touch-icon.png',
  
  // Data
  '/data/disabilityRates.ts',
  '/data/professionalDiseases.ts',
  '/data/civilCode.ts',
  '/data/aldList.ts',
  '/data/drugList.ts',
  
  // Services & Local AI
  '/components/AiAnalyzer.tsx',
  
  // Main Components
  '/components/GuidedCalculator.tsx',
  '/components/ExclusiveAiCalculator.tsx',
  '/components/AnalogCalculator.tsx',
  '/components/LegislativeGuide.tsx',
  '/components/ProfessionalDiseasesGuide.tsx',
  '/components/ToolsPage.tsx',
  '/components/BottomNav.tsx',
  '/components/TopAppBar.tsx',
  '/components/Login.tsx',
  '/components/CalculationResult.tsx',
  '/components/InjuryInfoModal.tsx',
  '/components/CalculatorPage.tsx',

  // UI Components
  '/components/ui/Card.tsx',
  '/components/ui/Button.tsx',
  '/components/ui/Tabs.tsx',
  '/components/ui/CnasLogo.tsx',
  
  // Tool Components
  '/components/tools/ToolModal.tsx',
  '/components/tools/InsulinCalculator.tsx',
  '/components/tools/HearingDeficitCalculator.tsx',
  '/components/tools/NorditropineCalculator.tsx',
  '/components/tools/GfrCalculator.tsx',
  '/components/tools/AldList.tsx',
  '/components/tools/DrugDictionary.tsx',
  '/components/tools/HandwritingDecipher.tsx',
  '/components/tools/ReverseIppSearch.tsx',

  // Modal Components
  '/components/modals/SummaryModal.tsx',
  
  // External dependencies for offline-first experience
  'https://cdn.tailwindcss.com',
  'https://esm.sh/@google/genai@^1.11.0',
  'https://esm.sh/react@^19.1.0',
  'https://esm.sh/react@^19.1.0/jsx-runtime',
  'https://esm.sh/react-dom@^19.1.0/client'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Use addAll for atomic caching, but handle individual failures gracefully for debugging
        const promises = urlsToCache.map(url => {
            return cache.add(url).catch(err => {
                console.warn(`Failed to cache ${url}:`, err);
            });
        });
        return Promise.all(promises);
      })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request to use it for both cache and network
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Check if we received a valid response to cache.
            if (!response || response.status !== 200) {
              return response;
            }
            
            // Do not cache Chrome extension requests
            if(event.request.url.startsWith('chrome-extension://')) {
                return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        ).catch(error => {
            console.error('Fetch failed; returning offline page instead.', error);
            // You can return a fallback offline page here if needed
            // For example: return caches.match('/offline.html');
        });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});