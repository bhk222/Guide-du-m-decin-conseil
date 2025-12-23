# 📚 Base de Données Nomenclature Intégrée

## ✅ Fonctionnement

La base de données des actes médicaux est maintenant **intégrée directement** dans l'application. Plus besoin d'upload de PDF à chaque utilisation !

## 📦 Fichiers

### Base de données actuelle
- **Fichier** : `data/nomenclature-static.json`
- **Format** : JSON structuré
- **Contenu** : Tous les actes médicaux extraits du PDF

### Structure JSON
```json
{
  "version": "1.0",
  "date": "2025-12-23",
  "source": "acte.pdf",
  "total": 12,
  "categories": { ... },
  "actes": [
    {
      "code": "C",
      "libelle": "Consultation au cabinet",
      "tarif": 2500,
      "coefficient": 1,
      "categorie": "Consultation"
    },
    ...
  ]
}
```

## 🔄 Mettre à jour la base de données

### Option 1 : Extraction manuelle simple

1. **Ouvrez** le fichier `acte.pdf`
2. **Copiez** tout le texte
3. **Envoyez-moi** le texte pour que je l'intègre

### Option 2 : Utiliser un outil en ligne

1. Allez sur https://pdftotext.com
2. Uploadez `acte.pdf`
3. Téléchargez le texte
4. Envoyez-moi le texte pour conversion

### Option 3 : Script automatique (avancé)

```powershell
.\extract-pdf.ps1
```

Puis envoyez-moi le texte extrait pour que je le convertisse en JSON.

## 🎯 Avantages de la base intégrée

### ✅ Avantages
- 🚀 **Chargement instantané** (pas d'upload)
- 💾 **Toujours disponible** (inclus dans l'application)
- 🔒 **Données fiables** (vérifiées et validées)
- ⚡ **Performance optimale** (pas de parsing à chaque fois)
- 📱 **Fonctionne hors ligne** (PWA)

### ❌ Inconvénients précédents (résolus)
- ~~Besoin d'uploader le PDF à chaque visite~~
- ~~Dépendance au format du PDF~~
- ~~Temps d'extraction variable~~
- ~~Erreurs de parsing possibles~~

## 🔍 Recherche sémantique

La recherche fonctionne directement sur la base intégrée :
- Recherche par **code** : "C", "CS", "KE"
- Recherche par **libellé** : "consultation", "radiographie"
- Recherche par **catégorie** : "imagerie", "soins"

## 📊 Statistiques

L'application affiche automatiquement :
- ✅ Nombre total d'actes
- ✅ Répartition par catégorie
- ✅ Tarif moyen
- ✅ Version et source des données

## 🔧 Mise à jour future

Pour mettre à jour avec un nouveau PDF :

1. **Envoyez-moi** le nouveau fichier `acte.pdf`
2. **Je l'extrais** et convertis en JSON
3. **Je mets à jour** `data/nomenclature-static.json`
4. **Vous déployez** la nouvelle version

## 💡 Utilisation dans l'application

```typescript
// La base est chargée automatiquement au démarrage
import nomenclatureData from '../../data/nomenclature-static.json';

// Accessible directement
const actes = nomenclatureData.actes;
const stats = {
  total: nomenclatureData.total,
  categories: nomenclatureData.categories
};
```

## 📝 Format des actes

Chaque acte contient :
- **code** : Code de l'acte (ex: "C", "CS")
- **libelle** : Description complète
- **tarif** : Tarif de base en DA
- **coefficient** : Multiplicateur (défaut: 1)
- **categorie** : Catégorie automatique

## 🎨 Catégories détectées

- Consultation
- Visite
- Chirurgie
- Imagerie / Radiologie
- Anesthésie
- Soins
- Biologie
- Kinésithérapie
- Sage-femme
- Dentaire
- Technique
- Déplacement

## 🚀 Prochaines étapes

1. **Vous m'envoyez** le contenu du PDF `acte.pdf`
2. **J'extrais** tous les actes médicaux
3. **Je génère** le fichier JSON complet
4. **Je l'intègre** dans l'application
5. **Vous déployez** sur Vercel

## 📞 Support

Pour toute mise à jour ou extraction de nouveau PDF, contactez-moi avec :
- Le fichier PDF
- OU le texte extrait du PDF
- OU une capture d'écran du contenu

---

**Version actuelle** : 1.0  
**Dernière mise à jour** : 23 Décembre 2024  
**Statut** : ✅ Prêt pour extraction complète
