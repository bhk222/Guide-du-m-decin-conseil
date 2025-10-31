# Guide d'utilisation de la rubrique Appareillage

## 📋 Vue d'ensemble

La nouvelle rubrique **Appareillage CNAS** permet de rechercher rapidement les produits d'appareillage orthopédique référencés par la CNAS (Caisse Nationale des Assurances Sociales - Algérie).

## ✨ Fonctionnalités

### 1. **Recherche intelligente multi-critères**
- **Par référence** : SO 01, 701, OI 36 N11, FR.STANDARD
- **Par nom** : Semelle, Chaussure, Fauteuil, Corset
- **Par catégorie** : Podo-orthèses, Orthèses, Fauteuils
- **Par indication médicale** : Pied plat, Hémiplégie, Paralysie

### 2. **Recherche avec IA locale (Ollama)**
- Intégration optionnelle avec Ollama pour recherche sémantique avancée
- Comprend les références partielles et les termes médicaux
- Fournit des suggestions intelligentes

### 3. **Recherche dans le PDF brut**
- Si aucun résultat n'est trouvé dans la base de données
- Recherche automatique dans le texte complet du guide CNAS
- Affiche le contexte pertinent

### 4. **Informations détaillées**
Pour chaque produit :
- ✅ **Description complète**
- ✅ **Indications médicales**
- ✅ **Critères de conformité**
- ✅ **Adjonctions possibles** (pour chaussures)
- ✅ **Type et remboursement**

## 🗂️ Structure des fichiers

```
data/
  └── appareillage.ts              # Base de données des produits

services/
  └── appareillageAI.ts            # Service IA locale (Ollama)

components/
  └── AppareillageSearch.tsx       # Interface de recherche

public/
  └── data/
      └── appareillage_raw.txt     # Texte brut du PDF CNAS

types.ts                           # Interfaces TypeScript
```

## 🔧 Configuration

### Installation des dépendances
```bash
npm install lucide-react
```

### Configuration Ollama (optionnel)
Pour activer la recherche IA locale :

1. Installer Ollama : https://ollama.ai
2. Télécharger le modèle : `ollama pull llama2`
3. Lancer Ollama : `ollama serve`

L'application détectera automatiquement si Ollama est disponible.

## 📊 Base de données

La base de données contient actuellement **20+ produits** incluant :

### Podo-orthèses
- Semelles orthopédiques (SO 01, SO 02)
- Chaussures orthopédiques (701-709, 721-722)
- Chaussures spéciales

### Orthèses
- Orthèses du tronc (Corsets)
- Orthèses des membres inférieurs (OI 36 N11, OI 59 C91)
- Orthèses des membres supérieurs (OS 79 G01, OS 13 N01)

### Aides à la mobilité
- Fauteuils roulants (FR.STANDARD, FRE)
- Voiturettes (VAM)

## 🎯 Utilisation

### Recherche simple
1. Accédez à l'onglet **Appareillage** dans la navigation
2. Tapez une référence ou un terme médical
3. Les résultats apparaissent en temps réel (debounce 300ms)
4. Appuyez sur **Entrée** pour recherche immédiate

### Consultation des détails
1. Cliquez sur un résultat de recherche
2. Consultez toutes les informations du produit
3. Utilisez le bouton **Retour** pour continuer la recherche

### Suggestions intelligentes
- Si aucun résultat : suggestions de l'IA locale
- Recherche dans le PDF : extrait du guide CNAS
- Guide de recherche : exemples de requêtes

## 🚀 Améliorations futures

- [ ] Ajouter plus de produits à la base de données
- [ ] Intégration avec une API backend
- [ ] Exportation des résultats en PDF
- [ ] Historique des recherches
- [ ] Filtres avancés par catégorie
- [ ] Mode hors ligne complet
- [ ] Support multilingue (Français/Arabe)

## 📝 Notes importantes

1. **Fichier PDF brut** : Le fichier `public/data/appareillage_raw.txt` doit contenir le texte complet du guide CNAS pour la recherche de fallback.

2. **Performance** : La recherche est optimisée avec debounce et cache PDF en mémoire.

3. **Compatibilité** : L'IA locale est optionnelle et ne bloque pas le fonctionnement si Ollama n'est pas disponible.

## 🐛 Dépannage

### L'IA locale ne fonctionne pas
- Vérifiez qu'Ollama est installé et en cours d'exécution
- Vérifiez que le modèle llama2 est téléchargé
- L'application continuera de fonctionner sans IA

### Aucun résultat PDF
- Vérifiez que le fichier `public/data/appareillage_raw.txt` existe
- Assurez-vous qu'il contient le texte du guide CNAS

### Erreurs de compilation
- Vérifiez que lucide-react est installé
- Exécutez `npm install` pour réinstaller les dépendances

## 📞 Support

Pour toute question ou suggestion d'amélioration, consultez la documentation CNAS officielle ou contactez l'équipe de développement.

---

**Version** : 1.0.0  
**Date** : 31 Octobre 2025  
**Auteur** : Guide du Médecin Conseil
