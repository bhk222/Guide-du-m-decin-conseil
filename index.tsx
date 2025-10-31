

import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

// Register Service Worker for PWA (Offline-First)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(registration => {
        console.log('✅ ServiceWorker enregistré avec succès:', registration.scope);
        
        // Vérifier les mises à jour toutes les heures
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);
        
        // Vérifier immédiatement s'il y a une mise à jour
        registration.update();
      })
      .catch(error => {
        console.error('❌ Échec de l\'enregistrement du ServiceWorker:', error);
      });
  });
  
  // Écouter les mises à jour du Service Worker
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('🔄 Nouveau Service Worker activé - Rechargement...');
    window.location.reload();
  });
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
