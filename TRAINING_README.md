# 🔬 Système d'Entraînement et Validation IA Médico-Légale

## 📖 Vue d'Ensemble

Ce système permet de **transformer l'IA locale en véritable expert médico-légal** à travers :

1. **Base de cas cliniques annotés** (`data/trainingCases.ts`) : 20+ cas de référence avec lésions attendues et taux IPP
2. **Module de validation automatique** (`data/validator.ts`) : Tests automatiques avec métriques de performance
3. **Interface de monitoring** (`components/IAValidator.tsx`) : Visualisation temps réel des résultats

---

## 🎯 Objectifs

- ✅ **Reconnaissance lésions** ≥ 95%
- ✅ **Précision taux IPP** ≥ 90% (tolérance ±3%)
- ✅ **Temps de réponse** ≤ 500ms par analyse
- ✅ **Détection ambiguïtés** ≥ 85%

---

## 📁 Architecture du Système

### 1. **data/trainingCases.ts** - Base d'Entraînement

**20 cas cliniques annotés** couvrant 8 catégories médicales :

```typescript
export interface TrainingCase {
  id: string;                  // Ex: "vision-001"
  category: string;            // Ex: "Vision"
  userInput: string;           // Description médecin conseil
  expectedInjury: string;      // Lésion attendue
  expectedRate: number;        // Taux IPP attendu
  severity: 'faible' | 'moyen' | 'élevé' | 'fixe';
  clinicalSigns: string[];     // Signes cliniques clés
  justification: string;       // Justification médico-légale
  commonMistakes?: string[];   // Erreurs fréquentes à éviter
  keywords: string[];          // Mots-clés importants
}
```

#### 📊 Catégories Couvertes

| Catégorie | Nombre de cas | Exemples |
|-----------|---------------|----------|
| **Vision** | 3 | Cataracte OD 4/10 OG 8/10 (35%), Uvéite synéchies (25%) |
| **Genou** | 3 | LCA dérobements arthrose (22%), Méniscectomie totale (13%) |
| **Cheville/Pied** | 3 | Pilon tibial quasi-ankylose (38%), Calcanéum thalamique (26%) |
| **Rachis** | 2 | Tassement L3 cyphose 15° (14%), Syndrome cervical DMS 4cm (12%) |
| **Membres supérieurs** | 2 | Tête humérale abduction 60° (25%), Amputation pouce (20%) |
| **Nerfs périphériques** | 2 | Radial main tombante testing 0/5 (35%), Sciatique L5 steppage (18%) |
| **Cas complexes** | 1 | Plateaux tibiaux + LCA avec cumul Balthazar (25%) |
| **Variations linguistiques** | 2 | Fautes orthographe, langage familier ("cassé", "pété", "boite") |

#### 🧠 Patterns Experts

```typescript
export const expertPatterns = {
  // Détection descriptions floues nécessitant clarification
  ambiguityTriggers: [
    {
      pattern: /fracture (femur|tibia|humerus)(?!.*diaphyse|col|extremite)/i,
      message: "Préciser localisation anatomique exacte",
      requiredInfo: ["localisation précise", "type fracture", "consolidation"]
    }
  ],
  
  // Détection séquelles multiples → formule cumul Balthazar
  multipleInjuryTriggers: [
    {
      pattern: /(;|et aussi|avec|associe a).*(fracture|luxation|rupture)/i,
      message: "Séquelles multiples détectées → appliquer formule cumul",
      formula: "T = 100 - [(100 - T1) × (100 - T2) / 100]"
    }
  ],
  
  // Conversion langage familier → terminologie médicale
  clinicalSynonyms: {
    "cassé": "fracture",
    "pété": "rupture",
    "coincé": "blocage articulaire",
    "qui lâche": "instabilité",
    "boite": "claudication",
    "voit flou": "baisse acuité visuelle"
  }
};
```

---

### 2. **data/validator.ts** - Module de Validation

**Fonctions principales** :

#### ✅ `runFullValidation()`

Exécute tests automatiques sur tous les cas d'entraînement :

```typescript
export function runFullValidation(): ValidationReport {
  const results: ValidationResult[] = [];
  
  for (const trainingCase of trainingCases) {
    const startTime = performance.now();
    const result = localExpertAnalysis(trainingCase.userInput);
    const endTime = performance.now();
    
    // Vérification reconnaissance lésion (normalisation)
    const recognized = normalize(result.name) === normalize(trainingCase.expectedInjury);
    
    // Vérification précision taux (tolérance ±3%)
    const rateAccurate = Math.abs(result.rate - trainingCase.expectedRate) <= 3;
    
    results.push({
      caseId: trainingCase.id,
      success: recognized && rateAccurate,
      foundInjury: result.name,
      expectedInjury: trainingCase.expectedInjury,
      foundRate: result.rate,
      expectedRate: trainingCase.expectedRate,
      rateDeviation: Math.abs(result.rate - trainingCase.expectedRate),
      responseTime: endTime - startTime,
      errors: !recognized ? [`Lésion non reconnue`] : [],
      warnings: !rateAccurate ? [`Écart taux: ${rateDeviation}%`] : []
    });
  }
  
  // Calcul métriques globales
  const metrics = {
    recognitionAccuracy: (correctRecognitions / totalCases) * 100,
    rateAccuracy: (correctRates / totalCases) * 100,
    responseTime: totalTime / totalCases
  };
  
  return { totalCases, successfulCases, metrics, results, recommendations };
}
```

#### 📊 `generateHTMLReport(report)`

Génère rapport HTML formaté avec :

- **Métriques globales** (4 cartes colorées) :
  - 🎯 Taux de réussite (%)
  - 🔍 Reconnaissance lésions (%)
  - 📐 Précision taux IPP (%)
  - ⚡ Temps de réponse moyen (ms)

- **Recommandations automatiques** (si métriques < seuils) :
  - Améliorer keywords/synonymes si reconnaissance <95%
  - Affiner critères gravité si précision <90%
  - Optimiser algorithme si temps >500ms

- **Tableau détaillé résultats** :
  - ID cas, Catégorie, Statut ✅/❌
  - Lésion trouvée vs attendue
  - Taux IPP trouvé vs attendu (écart %)
  - Temps de réponse (ms)

- **Actions prioritaires** :
  1. Analyser cas échoués
  2. Enrichir keywords/synonymes
  3. Affiner rateCriteria
  4. Optimiser performance

#### 💾 `saveReportToFile(report, filename)`

Sauvegarde rapport HTML :
- **Node.js** : `fs.writeFileSync(filename, html)`
- **Navigateur** : Téléchargement automatique via `Blob`

---

### 3. **components/IAValidator.tsx** - Interface Monitoring

Interface React permettant :

- ▶️ **Lancer validation** en 1 clic (bouton "Lancer Validation")
- 📊 **Visualiser métriques** en temps réel (4 cartes colorées)
- ❌ **Analyser échecs** détaillés (input, attendu, trouvé, erreurs)
- 📥 **Télécharger rapport HTML** complet
- 🎯 **Actions prioritaires** automatiques

---

## 🚀 Guide d'Utilisation

### Étape 1 : Accéder à l'Interface

1. Lancer application : `npm run dev`
2. Aller dans **Outils** → **🔬 Validation IA Médico-Légale**
3. Cliquer sur **▶️ Lancer Validation**

### Étape 2 : Analyser Résultats

**Métriques affichées** :

- ✅ **Taux de réussite** : % cas correctement traités
- 🔍 **Reconnaissance lésions** : % lésions identifiées (objectif ≥95%)
- 📐 **Précision taux IPP** : % taux corrects ±3% (objectif ≥90%)
- ⚡ **Temps réponse** : Moyenne en ms (objectif ≤500ms)

**Codes couleur** :

- 🟢 **Vert** : Métrique ≥ seuil (excellent)
- 🟠 **Orange** : Métrique < seuil (amélioration nécessaire)
- 🔴 **Rouge** : Métrique << seuil (priorité haute)

### Étape 3 : Télécharger Rapport HTML

Cliquer sur **📥 Télécharger Rapport HTML** pour obtenir rapport détaillé :

- Métriques globales avec graphiques
- Tableau complet 20 cas (statut, lésions, taux, écarts, temps)
- Recommandations personnalisées
- Actions correctives prioritaires

### Étape 4 : Améliorer IA

Si **reconnaissance < 95%** :

1. **Analyser cas échoués** dans rapport HTML
2. **Identifier patterns manquants** (ex: "cataract" au lieu de "cataracte")
3. **Enrichir keywords** dans `components/AiAnalyzer.tsx` :
   ```typescript
   const keywordWeights: Record<string, number> = {
     // Ajouter synonymes détectés
     "cataract": 70,  // Anglais
     "av": 65,        // Abréviation "acuité visuelle"
     // ...
   };
   ```
4. **Re-exécuter validation** pour vérifier amélioration

Si **précision taux < 90%** :

1. **Comparer taux trouvés vs attendus** dans rapport
2. **Affiner rateCriteria** dans `data/disabilityRates.ts` :
   ```typescript
   rateCriteria: [
     {
       severity: "élevé",
       criteria: "Quasi-ankylose cheville (flexion <10°)",
       rate: 38,  // Ajuster si écart significatif
       note: "Examen clinique: flexion dorsale 5°, plantaire 3°"
     }
   ]
   ```
3. **Re-valider** après modifications

---

## 📈 Workflow d'Amélioration Continue

```
┌─────────────────────────────────────────────┐
│  1. Exécuter Validation Initiale            │
│     → Générer rapport baseline              │
└─────────────────┬───────────────────────────┘
                  │
                  v
┌─────────────────────────────────────────────┐
│  2. Analyser Résultats                      │
│     → Identifier faiblesses (reconnaissance,│
│       précision, temps)                     │
└─────────────────┬───────────────────────────┘
                  │
                  v
┌─────────────────────────────────────────────┐
│  3. Appliquer Corrections                   │
│     → Enrichir keywords/synonymes           │
│     → Affiner rateCriteria                  │
│     → Optimiser algorithme scoring          │
└─────────────────┬───────────────────────────┘
                  │
                  v
┌─────────────────────────────────────────────┐
│  4. Re-Valider                              │
│     → Comparer métriques avant/après        │
│     → Vérifier régression autres catégories │
└─────────────────┬───────────────────────────┘
                  │
                  v
┌─────────────────────────────────────────────┐
│  5. Objectif Atteint ?                      │
│     ├─ OUI → Enrichir base (nouveaux cas)   │
│     └─ NON → Retour étape 2                 │
└─────────────────────────────────────────────┘
```

---

## 🎓 Ajouter Nouveaux Cas d'Entraînement

### Template Cas Clinique

```typescript
{
  id: "categorie-XXX",  // Ex: "vision-004", "rachis-003"
  category: "Catégorie",  // Vision, Genou, Rachis, etc.
  userInput: "Description médecin conseil naturelle",  // Ex: "cataracte bilatérale avec acuité visuelle OD 3/10 OG 5/10"
  expectedInjury: "Lésion attendue selon barème",  // Ex: "Cataracte (selon acuité et complications)"
  expectedRate: 42,  // Taux IPP attendu (nombre entier)
  severity: "moyen",  // faible, moyen, élevé, fixe
  clinicalSigns: [
    "Signe clinique 1",  // Ex: "acuité visuelle OD 3/10"
    "Signe clinique 2",  // Ex: "acuité visuelle OG 5/10"
    "Signe clinique 3"   // Ex: "correction optimale impossible"
  ],
  justification: "Justification médico-légale selon article du barème",
  commonMistakes: [
    "Erreur fréquente 1",  // Ex: "Confondre avec champ visuel"
    "Erreur fréquente 2"   // Ex: "Oublier correction optimale"
  ],
  keywords: [
    "mot-cle-1",  // Ex: "cataracte"
    "mot-cle-2",  // Ex: "acuite visuelle"
    "mot-cle-3"   // Ex: "bilaterale"
  ]
}
```

### Exemple Complet : Fracture Col Fémoral

```typescript
{
  id: "hanche-001",
  category: "Membres inférieurs",
  userInput: "fracture col fémoral droit opérée prothèse totale hanche limitation abduction 20° flexion 80° marche avec canne distance <1km",
  expectedInjury: "Prothèse totale de hanche avec limitation modérée",
  expectedRate: 28,
  severity: "élevé",
  clinicalSigns: [
    "prothèse totale hanche droite",
    "abduction limitée 20°",
    "flexion limitée 80°",
    "claudication",
    "marche avec canne",
    "périmètre marche <1km"
  ],
  justification: "Prothèse totale hanche avec raideur modérée (flexion 80°, abduction 20°) et troubles de la marche nécessitant aide technique. Selon barème: limitation modérée avec canne = 25-30%.",
  commonMistakes: [
    "Confondre avec raideur simple (sans prothèse)",
    "Négliger impact troubles marche",
    "Oublier aide technique (canne) dans évaluation"
  ],
  keywords: [
    "col femoral",
    "prothese totale hanche",
    "pth",
    "abduction",
    "flexion",
    "canne",
    "marche",
    "claudication"
  ]
}
```

**Étapes** :

1. Ouvrir `data/trainingCases.ts`
2. Ajouter nouveau cas dans array `trainingCases`
3. Vérifier ID unique (ex: "hanche-001", "hanche-002"...)
4. Renseigner tous les champs obligatoires
5. Sauvegarder fichier
6. Re-exécuter validation pour tester nouveau cas

---

## 🎯 Métriques de Qualité

### Seuils de Performance

```typescript
export const qualityThresholds: QualityMetrics = {
  recognitionAccuracy: 95,     // ≥95% reconnaissance lésions
  rateAccuracy: 90,            // ≥90% précision taux ±3%
  ambiguityDetection: 85,      // ≥85% détection ambiguïtés
  justificationCompleteness: 90, // ≥90% justifications complètes
  responseTime: 500            // ≤500ms temps réponse
};
```

### Interprétation Résultats

| Métrique | Signification | Action si < seuil |
|----------|---------------|-------------------|
| **Reconnaissance** | % lésions correctement identifiées | Enrichir keywords, synonymes, patterns |
| **Précision Taux** | % taux IPP corrects ±3% | Affiner rateCriteria, critères gravité |
| **Temps Réponse** | Moyenne ms par analyse | Optimiser algorithme, réduire boucles |
| **Ambiguïté** | % descriptions floues détectées | Ajouter ambiguityTriggers |

---

## 📚 Ressources Complémentaires

### Fichiers du Système

- `data/trainingCases.ts` : 20 cas cliniques annotés + patterns experts
- `data/validator.ts` : Module validation automatique + rapport HTML
- `components/IAValidator.tsx` : Interface monitoring React
- `components/AiAnalyzer.tsx` : Logique IA locale (keywords, scoring, recommandations)
- `data/disabilityRates.ts` : Barème IPP complet avec rateCriteria

### Commandes Utiles

```bash
# Lancer serveur développement
npm run dev

# Build production
npm run build

# Déployer Vercel
vercel --prod

# Tests (si configurés)
npm test
```

---

## 🏆 Objectif Final

**Transformer l'IA locale en VÉRITABLE EXPERT MÉDICO-LÉGAL** capable de :

✅ Reconnaître **100% des lésions** du barème avec variations linguistiques  
✅ Proposer **taux IPP précis** (écart <3%) selon critères gravité  
✅ Détecter **ambiguïtés** et demander clarifications pertinentes  
✅ Gérer **séquelles multiples** avec formule cumul Balthazar  
✅ Répondre en **<500ms** avec justifications médico-légales complètes  

**Base actuelle** : 20 cas cliniques  
**Objectif court terme** : 50 cas (toutes régions anatomiques)  
**Objectif long terme** : 100+ cas (variations dialectales, abréviations, langage familier)

---

## 📞 Support

Pour toute question sur le système d'entraînement :

1. Consulter ce README
2. Analyser rapport HTML généré
3. Examiner cas similaires dans `trainingCases.ts`
4. Vérifier keywords dans `AiAnalyzer.tsx`

**Bonne validation ! 🚀**
