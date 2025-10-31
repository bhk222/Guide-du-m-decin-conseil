# 🤖 Aide à la Transcription d'Ordonnances - IA Intelligente

## 📋 Vue d'ensemble

La fonction **Aide à la Transcription** a été considérablement améliorée avec une IA locale hyper-intelligente capable de déchiffrer les ordonnances manuscrites illisibles.

## ✨ Nouvelles Fonctionnalités

### 1. **OCR Automatique avec Vision IA**
- Utilise **Ollama avec le modèle llava** (vision multimodale)
- Analyse automatique dès qu'une photo est chargée
- Détection intelligente de l'écriture manuscrite médicale
- Extraction structurée des informations :
  - Nom des médicaments
  - Dosages
  - Formes pharmaceutiques
  - Posologie complète
  - Durée du traitement

### 2. **Suggestions Intelligentes en Temps Réel**
- Suggestions de médicaments algériens
- Recherche sémantique avec IA
- Combinaison base locale + suggestions IA
- Comprend les abréviations médicales

### 3. **Amélioration Automatique du Texte**
- Correction des fautes de frappe
- Expansion des abréviations médicales
- Standardisation du format
- Ajout des unités manquantes

### 4. **Analyse Médicale Complète**
- Identification automatique des médicaments
- Détection des erreurs courantes
- Avertissements sur les incohérences
- Suggestions de corrections

## 🛠️ Configuration Requise

### Installation d'Ollama

```bash
# 1. Télécharger Ollama
# https://ollama.ai

# 2. Installer les modèles requis

# Modèle avec vision pour OCR
ollama pull llava

# Modèle texte pour analyse
ollama pull llama2

# 3. Lancer Ollama
ollama serve
```

### Vérification

L'application détecte automatiquement si Ollama est disponible :
- ✅ **Disponible** : Toutes les fonctionnalités IA activées
- ℹ️ **Non disponible** : Mode fallback avec recherche locale

## 📊 Fonctionnalités par Mode

### Mode IA Complète (Ollama actif)

| Fonctionnalité | Description |
|----------------|-------------|
| **OCR Vision** | Analyse automatique de l'image avec llava |
| **Extraction structurée** | Médicaments, dosages, posologie en JSON |
| **Confiance par item** | Score de confiance 0-100% |
| **Suggestions IA** | Médicaments suggérés par intelligence sémantique |
| **Amélioration texte** | Correction et standardisation automatiques |
| **Analyse médicale** | Détection erreurs + avertissements |

### Mode Fallback (Sans Ollama)

| Fonctionnalité | Description |
|----------------|-------------|
| **Transcription manuelle** | Saisie assistée avec raccourcis |
| **Suggestions locales** | Base de données médicaments algériens |
| **Abréviations** | Boutons rapides pour termes courants |
| **Autocomplétion** | Suggestions au clavier |

## 🎯 Utilisation

### 1. Prendre une Photo

```
1. Cliquez sur "Prendre ou choisir une photo"
2. Photographiez l'ordonnance
3. L'IA analyse automatiquement (si Ollama actif)
4. Résultats affichés avec confiance
```

### 2. Transcription Assistée

```
1. Le texte brut apparaît automatiquement
2. Modifiez si nécessaire
3. Utilisez les suggestions en temps réel (↑ ↓ Enter)
4. Boutons rapides pour abréviations courantes
```

### 3. Amélioration IA

```
Bouton "✨ Améliorer" :
- Corrige les fautes
- Standardise le format
- Ajoute les unités manquantes
- Expand les abréviations
```

### 4. Analyse Médicale

```
Bouton "🔍 Analyser" :
- Identifie tous les médicaments
- Détecte les erreurs
- Génère des avertissements
- Suggestions de corrections
```

## 📝 Format de Sortie

### Médicaments Détectés (OCR)

```
📋 Médicaments détectés:

Paracétamol 500mg (comprimé)
1 comprimé 3 fois par jour • 7 jours • Confiance: 95%

Amoxicilline 1g (gélule)
1 gélule 2 fois par jour • 10 jours • Confiance: 88%
```

### Texte Amélioré

```
AVANT:
paracetamo 500mg cp
1 cp 3xj pdt 7j

APRÈS:
Paracétamol 500mg comprimé
Posologie: 1 comprimé 3 fois par jour
Durée: 7 jours
```

## 🔧 Paramètres IA

### Modèle Vision (llava)

```javascript
{
  temperature: 0.1,  // Très précis pour médical
  top_p: 0.95
}
```

### Modèle Texte (llama2)

```javascript
{
  temperature: 0.2,  // Corrections précises
  top_p: 0.9
}
```

## ⚡ Performance

- **OCR Vision** : 5-15 secondes selon image
- **Suggestions** : < 2 secondes
- **Amélioration** : 3-8 secondes
- **Analyse** : 3-8 secondes

## 🎨 Interface

### Indicateurs Visuels

- 🤖 **Bleu** : IA en cours d'analyse
- ✅ **Vert** : Succès
- ⚠️ **Orange** : Avertissement
- ❌ **Rouge** : Erreur

### Scores de Confiance

- **90-100%** : Excellent (très fiable)
- **70-89%** : Bon (vérification recommandée)
- **50-69%** : Moyen (vérification nécessaire)
- **< 50%** : Faible (transcription manuelle recommandée)

## 🚀 Améliorations Futures

- [ ] Support OCR cloud (Google Vision, Tesseract)
- [ ] Historique des transcriptions
- [ ] Export PDF avec médicaments structurés
- [ ] Détection automatique des interactions médicamenteuses
- [ ] Support multilingue (Français/Arabe)
- [ ] Mode batch (plusieurs ordonnances)
- [ ] Intégration avec base ONAAPH

## 🐛 Dépannage

### Ollama ne répond pas

```bash
# Vérifier le statut
curl http://localhost:11434/api/tags

# Redémarrer Ollama
ollama serve
```

### Modèles manquants

```bash
# Télécharger llava
ollama pull llava

# Télécharger llama2
ollama pull llama2

# Vérifier les modèles installés
ollama list
```

### OCR imprécis

- Assurez-vous que la photo est nette
- Bon éclairage
- Cadrage correct de l'ordonnance
- Éviter les reflets

### Suggestions vides

- Vérifiez que Ollama est actif
- Base de données locale chargée
- Tapez au moins 3 caractères

## 💡 Conseils d'utilisation

### Pour de meilleurs résultats OCR

1. **Éclairage** : Lumière naturelle ou éclairage uniforme
2. **Cadrage** : Toute l'ordonnance visible
3. **Netteté** : Pas de flou ni de mouvement
4. **Angle** : Photo perpendiculaire, pas en biais
5. **Contraste** : Fond clair, écriture foncée

### Abréviations Médicales Courantes

- **cp/cpr** = comprimé
- **gél** = gélule
- **amp** = ampoule
- **fl** = flacon
- **1x/j** = 1 fois par jour
- **2x/j** = 2 fois par jour
- **3x/j** = 3 fois par jour
- **mat/M** = matin
- **mid/M** = midi
- **soir/S** = soir
- **av** = avant
- **ap** = après
- **pdt** = pendant
- **j** = jours
- **sem** = semaines

## 📞 Support

Pour plus d'informations sur Ollama :
- Documentation : https://ollama.ai/docs
- GitHub : https://github.com/ollama/ollama

---

**Version** : 2.0.0  
**Date** : 31 Octobre 2025  
**Auteur** : Guide du Médecin Conseil  
**Technologie** : Ollama (llava + llama2)
