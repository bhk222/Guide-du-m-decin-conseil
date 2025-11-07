# 🎓 Système d'Entraînement IA Médico-Légale

## Vue d'ensemble

Ce module implémente un **système d'amélioration continue** pour l'IA locale d'expertise médico-légale. Il permet de :

1. **Tester l'IA** sur une base de cas cliniques réels annotés
2. **Détecter les faiblesses** dans la reconnaissance des lésions
3. **Mesurer la performance** (taux de réussite, précision des évaluations)
4. **Générer des recommandations** d'amélioration automatiques

---

## 📁 Architecture

```
data/
  └── trainingData.ts          # Base de cas cliniques annotés (actuellement 10+ cas)
  
services/
  └── iaTrainingService.ts     # Module d'entraînement et tests automatiques
  
components/
  └── IATrainingMonitor.tsx    # Interface de monitoring (optionnelle)
```

---

## 🎯 Cas d'Entraînement

### Structure d'un cas

Chaque cas contient :
- **ID unique** (ex: `VIS001`, `MBI001`)
- **Catégorie** (vision, membres_inf, rachis, etc.)
- **Descriptions variées** du patient (5+ formulations différentes)
- **Lésion attendue** (référence barème)
- **Mots-clés cliniques** à détecter
- **Niveau de gravité** (faible/moyen/élevé)
- **Justification médico-légale** type
- **Pièges fréquents** à éviter

### Exemple : Cataracte

```typescript
{
    id: 'VIS001',
    category: 'vision',
    userDescriptions: [
        "cataracte post traumatique avec baisse de l'acuité visuelle",
        "cataracte traumatique oeil droit acuité 3/10",
        "opacité du cristallin suite accident avec baisse vision",
        // ... 2 autres variantes
    ],
    expectedInjury: {
        name: "Cataracte (selon acuité et complications)",
        path: "Séquelles Maxillo-Faciales, ORL et Ophtalmologiques > Yeux - Lésions Spécifiques et Annexes",
        rate: [10, 100]
    },
    clinicalKeywords: ['cataracte', 'cristallin', 'opacité', 'acuité visuelle'],
    severityLevel: 'moyen',
    expertReasoning: "La cataracte post-traumatique est évaluée selon l'acuité visuelle CORRIGÉE...",
    commonMistakes: [
        "❌ Confondre avec décollement rétine",
        "❌ Oublier de demander acuité visuelle OD ET OG séparément"
    ]
}
```

---

## 🧪 Utilisation

### 1. Mode Console (Développement)

```typescript
import { runComprehensiveTraining, testSpecificCategory } from './services/iaTrainingService';

// Tester toutes les catégories
const metrics = runComprehensiveTraining();

// Tester une catégorie spécifique
const visionMetrics = testSpecificCategory('vision');
```

### 2. Interface Graphique (Production)

Accéder à l'interface d'entraînement via le menu de l'application (à implémenter dans la navigation).

---

## 📊 Métriques Mesurées

| Métrique | Description | Seuil Acceptable |
|----------|-------------|------------------|
| **Score Moyen** | Moyenne des scores de tous les tests | ≥ 80% |
| **Lésions Correctes** | % de lésions identifiées correctement | ≥ 85% |
| **Taux Corrects** | % de taux d'IPP dans la fourchette attendue | ≥ 70% |
| **Mots-clés Détectés** | % de mots-clés cliniques reconnus | ≥ 60% |

---

## 🎓 Règles Métier Codifiées

Le système intègre **5 règles métier essentielles** :

### 1. Distinction Cataracte vs Champ Visuel
```
✅ SI description contient "cataracte" 
   → NE JAMAIS proposer section "Champ Visuel"
   → TOUJOURS section "Cécité et Baisse de Vision" OU "Lésions Spécifiques"
```

### 2. Plateau Tibial vs Pilon Tibial
```
✅ Plateau tibial = extrémité PROXIMALE tibia (genou)
   Pilon tibial = extrémité DISTALE tibia (cheville)
   → Ne JAMAIS confondre
```

### 3. Recommandations Cliniques Adaptées
```
✅ Lésion OCULAIRE → acuité visuelle OD/OG, champ visuel
   Lésion ARTICULAIRE → amplitudes, EVA, testing musculaire
   Lésion NERVEUSE → EMG, déficit sensitif/moteur
```

### 4. Paralysies Nerveuses et EMG
```
✅ SI paralysie nerveuse 
   → TOUJOURS demander EMG (pronostic récupération)
   → Distinguer dénervation active vs chronique
```

### 5. Fractures Articulaires et Arthrose
```
✅ SI fracture ARTICULAIRE (plateau tibial, pilon tibial, poignet)
   → TOUJOURS évaluer arthrose post-traumatique
   → Risque élevé → majore le taux
```

---

## 🔍 Ambiguïtés Codifiées

### Fracture Tibia (Ambiguë)
```
Déclencheurs : "fracture tibia", "fracture jambe"
❓ Clarification : Localisation exacte ?
📋 Choix possibles :
   - Plateau tibial (genou)
   - Diaphyse
   - Pilon tibial (cheville)
   - Malléole
```

### Baisse Vision (Ambiguë)
```
Déclencheurs : "baisse vision", "voit mal", "vision floue"
❓ Clarification : Cause ?
📋 Choix possibles :
   - Cataracte (opacité cristallin)
   - Décollement rétine
   - Atrophie optique
   - Taie cornée
```

---

## 📈 Rapport de Performance Type

```
🎓 ENTRAÎNEMENT IA MÉDICO-LÉGALE

📊 RAPPORT DE PERFORMANCE GLOBAL:
   Tests effectués: 50
   Lésions correctes: 44/50 (88.0%)
   Taux corrects: 37/50 (74.0%)
   Score moyen: 82.5%

   ⚠️ Catégories faibles:
      - neurologique (68.3%)
      - vision (71.2%)

   ❌ Erreurs fréquentes:
      - ❌ Lésion incorrecte. Attendu: "Cataracte...", Proposé: "Uvéite..." (3x)
      - ⚠️ Taux hors fourchette. Attendu: [10-30%], Proposé: 35% (2x)

   💡 Suggestions d'amélioration:
      - VISION: Renforcer distinction cataracte/décollement rétine/atrophie optique
      - NEUROLOGIQUE: Améliorer reconnaissance territoires nerveux (radial vs médian vs cubital)
```

---

## 🚀 Roadmap

### Phase 1 (Actuelle) - Base Fondamentale
- [x] 10+ cas d'entraînement (vision, membres inf/sup, rachis, neuro)
- [x] Validation automatique avec feedback détaillé
- [x] Métriques de performance
- [x] Interface de monitoring

### Phase 2 - Enrichissement
- [ ] 50+ cas couvrant toutes les catégories du barème
- [ ] Cas complexes (lésions multiples, états antérieurs)
- [ ] Détection automatique des patterns d'erreurs récurrents

### Phase 3 - Intelligence Adaptative
- [ ] Ajustement automatique des poids de mots-clés
- [ ] Apprentissage des nouveaux patterns utilisateurs
- [ ] Génération automatique de nouveaux cas à partir des erreurs

### Phase 4 - Validation Médicale
- [ ] Revue par experts médico-légaux
- [ ] Certification des cas d'entraînement
- [ ] Benchmarking vs expertise humaine

---

## 💡 Comment Ajouter un Nouveau Cas

1. **Ouvrir** `data/trainingData.ts`
2. **Ajouter** un nouvel objet dans le tableau `trainingCases` :

```typescript
{
    id: 'NEW001',
    category: 'membres_inf', // ou autre
    userDescriptions: [
        "description variante 1",
        "description variante 2",
        // ... min 3 variantes
    ],
    expectedInjury: {
        name: "Nom exact de la lésion dans le barème",
        path: "Catégorie > Sous-catégorie",
        rate: [min, max] // ou taux fixe
    },
    clinicalKeywords: ['mot-clé1', 'mot-clé2'],
    severityLevel: 'moyen',
    expertReasoning: "Justification médico-légale...",
    commonMistakes: [
        "❌ Erreur fréquente 1",
        "❌ Erreur fréquente 2"
    ]
}
```

3. **Tester** : `runComprehensiveTraining()` dans la console

---

## 📚 Ressources

- **Barème Algérien 1967** (Décret 67-137)
- **Jurisprudence** médico-légale algérienne
- **Guides techniques** CNAS/CNAM

---

## ⚖️ Note Légale

Ce système d'entraînement est un **outil d'aide à la décision** uniquement. Les évaluations finales doivent être validées par un **expert médico-légal assermenté**.

L'IA locale fournit des **propositions orientatives** basées sur le barème officiel, mais ne remplace pas l'expertise médicale humaine.
