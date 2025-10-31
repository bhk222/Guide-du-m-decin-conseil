<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Guide du Médecin Conseil - Application PWA

Application web progressive pour les médecins conseil de la CNAS, permettant le calcul d'IPP (Incapacité Permanente Partielle), l'accès aux guides législatifs, et divers outils médicaux.

## 🌟 Fonctionnalités

- ✅ **Calculateur IPP** : Calcul automatique selon le barème indicatif
- ✅ **Guide Législatif** : Accès aux textes de loi et assistant IA
- ✅ **Maladies Professionnelles** : Base de données complète avec recherche
- ✅ **Appareillage CNAS** : Recherche d'appareillages et tarifs
- ✅ **Outils Médicaux** : GFR, insuline, norditropine, recherche médicaments, etc.
- ✅ **Mode Hors Ligne** : Fonctionne entièrement sans connexion Internet après la première visite
- ✅ **PWA** : Installation sur mobile et desktop

## 🚀 Déploiement sur Vercel

### Méthode 1 : Déploiement via CLI (Recommandé)

1. **Installer Vercel CLI** :
   ```bash
   npm install -g vercel
   ```

2. **Se connecter à Vercel** :
   ```bash
   vercel login
   ```

3. **Déployer l'application** :
   ```bash
   vercel
   ```

4. **Configurer les variables d'environnement** :
   ```bash
   vercel env add GEMINI_API_KEY
   ```
   Entrez votre clé API Gemini lorsque demandé.

5. **Déployer en production** :
   ```bash
   vercel --prod
   ```

### Méthode 2 : Déploiement via GitHub

1. **Pousser votre code sur GitHub** :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/votre-username/guide-medecin-conseil.git
   git push -u origin main
   ```

2. **Connecter à Vercel** :
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "New Project"
   - Importez votre repository GitHub
   - Vercel détectera automatiquement Vite

3. **Configurer les variables d'environnement** :
   - Dans les paramètres du projet sur Vercel
   - Ajoutez `GEMINI_API_KEY` avec votre clé API

4. **Déployer** :
   - Cliquez sur "Deploy"
   - Vercel construira et déploiera automatiquement

## 💻 Exécution Locale

**Prérequis :** Node.js 18+

1. **Installer les dépendances** :
   ```bash
   npm install
   ```

2. **Configurer les variables d'environnement** :
   - Copiez `.env.example` vers `.env`
   - Ajoutez votre clé API Gemini :
   ```
   GEMINI_API_KEY=votre_clé_api_ici
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur** :
   ```
   http://localhost:3000
   ```

## 🏗️ Build de Production

```bash
npm run build
npm run preview
```

## 📱 Installation comme PWA

### Sur Android (Chrome) :
- Menu (⋮) → "Installer l'application"

### Sur iOS (Safari) :
- Bouton Partage (⬆️) → "Sur l'écran d'accueil"

### Sur Desktop (Chrome/Edge) :
- Icône d'installation dans la barre d'URL (⊕)

## 🔧 Technologies

- **React 19** : Framework UI
- **TypeScript 5.8** : Typage statique
- **Vite 6** : Build tool et dev server
- **Tailwind CSS** : Styling
- **Google Gemini AI** : Fonctionnalités IA
- **Service Worker** : Mode hors ligne et cache
- **PWA** : Installation et fonctionnement offline

## 📄 Structure du Projet

```
├── components/          # Composants React
│   ├── tools/          # Outils médicaux
│   ├── modals/         # Modales
│   └── ui/             # Composants UI réutilisables
├── data/               # Données médicales (ALD, médicaments, etc.)
├── services/           # Services (API Gemini)
├── public/             # Assets statiques
├── sw.js               # Service Worker
├── manifest.json       # Manifest PWA
└── vercel.json         # Configuration Vercel
```

## 🌐 Variables d'Environnement

| Variable | Description | Requis |
|----------|-------------|--------|
| `GEMINI_API_KEY` | Clé API Google Gemini pour les fonctionnalités IA | Oui |

## 📝 License

© 2024 CNAS - Tous droits réservés

## 🆘 Support

Pour toute question ou problème, contactez l'équipe de développement CNAS.

---

**View your app in AI Studio:** https://ai.studio/apps/drive/1pNCNSMFl0Tk-FwrE1FGzlzUX7MXD0PVj
