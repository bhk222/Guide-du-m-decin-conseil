# 🎯 COMMANDES RAPIDES DÉPLOIEMENT

## ⚡ Déploiement Express (1 commande)

```bash
vercel --prod
```

## 📋 Checklist Pré-Déploiement

```bash
# 1. Validation système (doit afficher 100%)
npx tsx test-global-quick.ts

# 2. Build local (doit réussir)
npm run build

# 3. Script automatique complet
.\deploy.ps1
```

## 🌐 URLs Post-Déploiement

### Production
```
https://guide-medecin-conseil.vercel.app
```

### Tests Critiques
```
✅ https://votre-app.vercel.app/
✅ https://votre-app.vercel.app/manifest.json
✅ https://votre-app.vercel.app/sw.js
```

## 🔧 Commandes Utiles

### Installation Vercel CLI
```bash
npm install -g vercel
```

### Login Vercel
```bash
vercel login
```

### Déploiement Preview (Test)
```bash
vercel
```

### Déploiement Production
```bash
vercel --prod
```

### Logs en Temps Réel
```bash
vercel logs
```

### Liste Déploiements
```bash
vercel list
```

### Rollback Version Précédente
```bash
vercel rollback
```

## 🚨 En Cas de Problème

### Build Failed
```bash
# Nettoyer et rebuild
rm -rf dist node_modules
npm install
npm run build
```

### Page Blanche
```javascript
// Vérifier console browser (F12)
// Regarder pour erreurs import/export
```

### Service Worker Non Actif
```javascript
// HTTPS requis (localhost ou production)
// Vérifier dans DevTools: Application → Service Workers
```

### IA Ne Répond Pas
```bash
# Vérifier build inclut tous les fichiers
ls dist/assets/*.js

# Taille bundle doit être ~1.6 MB
```

## 📊 Métriques Attendues

### Performance
- **Lighthouse Performance**: >90
- **First Contentful Paint**: <2s
- **Time to Interactive**: <3s
- **Bundle Size**: ~1.6 MB (normal pour barème complet)

### Validation
- **Score Global**: 100% (45/45)
- **Catégories**: 23/23 parfaites
- **Expert Rules**: 40+ actives

## 🎯 Post-Déploiement

### Test Rapide
```
1. Ouvrir l'URL production
2. Onglet "🤖 IA Exclusive"
3. Test: "rupture LCA opérée arthrose débutante"
4. Vérifier: "Séquelles LCA 22%"
```

### Monitoring
```
1. Dashboard Vercel → Analytics
2. Vérifier métriques temps réel
3. Speed Insights activé
4. Logs accessible
```

## 📚 Documentation Complète

- **Guide Technique**: `AMELIORATIONS_V26_PERFECTION_100.md`
- **Guide Déploiement**: `GUIDE_DEPLOIEMENT.md`
- **Point d'Entrée**: `START_HERE.md`
- **README**: `README.md`

## 🏆 Résultat Final

```
✅ Application déployée mondialement
✅ HTTPS automatique
✅ CDN global Vercel
✅ Performance optimale
✅ Mode offline fonctionnel
✅ PWA installable
✅ 100% validation IA
```

---

**Temps total déploiement:** 2-3 minutes  
**Commande principale:** `vercel --prod`  
**Documentation:** `GUIDE_DEPLOIEMENT.md`

🚀 **Prêt pour production mondiale !**
