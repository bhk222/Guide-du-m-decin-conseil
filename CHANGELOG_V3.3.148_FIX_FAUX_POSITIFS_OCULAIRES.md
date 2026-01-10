# 🐛 V3.3.148 - CORRECTION FAUX POSITIFS LÉSIONS OCULAIRES

## 📋 PROBLÈME IDENTIFIÉ

**CAS PATIENT**: Homme 45 ans, maçon
- **Lésions réelles**: Fracture radius droit + Fracture malléole externe gauche
- **Bug système**: Détection erronée "Perte de la vision d'un oeil" (28% IPP) → **lésion inexistante**
- **Impact**: IPP final complètement faussé (30% au lieu de ~15-20%)

### Cause Racine
1. **SearchTerms trop génériques** dans [disabilityRates.new.ts](data/disabilityRates.new.ts#L451):
   ```typescript
   searchTerms: [
     "perte vision d'un oeil sans difformité apparente",
     "amputation vision d'un vision sans difformité apparente",  // ❌ Incohérent
     "apparente difformité sans oeil d'un vision perte",          // ❌ Aléatoire
     "perte vision"  // ❌ BEAUCOUP TROP GÉNÉRIQUE !
   ]
   ```
   - Le terme **"perte vision"** peut matcher n'importe quel texte contenant "perte" ou "vision"
   - Le texte patient contient "persistance", "consolidation" → faux positif par similarité floue

2. **Règles expertes insuffisantes** dans AiAnalyzer.tsx:
   - Pas de negativeContext pour éviter détection oculaire dans cas orthopédiques
   - Priority trop faible (999) → peut être écrasée par autres règles

---

## ✨ CORRECTIONS APPLIQUÉES

### 1️⃣ Nettoyage SearchTerms Oculaires ([disabilityRates.new.ts](data/disabilityRates.new.ts#L450-453))

**Avant V3.3.148**:
```typescript
{ 
  name: "Perte de la vision d'un oeil sans difformité apparente", 
  searchTerms: ["perte vision"], // ❌ Trop générique
  rate: [25, 30] 
}
```

**Après V3.3.148**:
```typescript
{ 
  name: "Perte de la vision d'un oeil sans difformité apparente", 
  searchTerms: [
    "perte vision d'un oeil sans difformité apparente",
    "perte vision oeil sans difformité",
    "cécité un oeil sans difformité",
    "aveugle oeil sans difformité",
    "perte totale vision oeil sans difformité",
    "non voyant un oeil sans difformité"
  ], 
  rate: [25, 30] 
}
```
✅ **SearchTerms spécifiques** (minimum 4-5 mots) pour éviter faux positifs

**Nettoyage similaire pour**:
- "Perte complète de la vision d'un oeil (l'autre étant normal)" [ligne 450]
- "Ablation ou altération du globe avec prothèse possible" [ligne 452]
- "Ablation ou altération du globe sans prothèse possible" [ligne 453]

---

### 2️⃣ Règle Experte Malléole Renforcée ([AiAnalyzer.tsx](components/AiAnalyzer.tsx#L8197-8206))

**Avant V3.3.148**:
```typescript
{
  pattern: /fracture.*malléol(?:e|aire)/i,
  context: /raideur.*modérée|déficit|flexion.*dorsale|limitation/i,
  searchTerms: ['Fracture malléolaire ou bi-malléolaire - Avec raideur modérée'],
  priority: 999  // ❌ Trop faible
}
```

**Après V3.3.148**:
```typescript
{
  pattern: /fracture.*malléol(?:e|aire)(?:.*externe|.*interne|.*bi[-\s]?malléol)?/i,
  context: /raideur.*modérée|déficit|flexion.*dorsale|limitation|cheville|consolidation|douleur.*cheville/i,
  searchTerms: ['Fracture malléolaire ou bi-malléolaire - Avec raideur modérée'],
  priority: 10800,  // ✅ Très haute priorité
  negativeContext: /vision|oeil|[oœ]culaire|cécité|acuité.*visuelle/i  // ✅ PROTECTION
}
```

---

### 3️⃣ Règle Experte Oculaire Sécurisée ([AiAnalyzer.tsx](components/AiAnalyzer.tsx#L8229-8237))

**Avant V3.3.148**:
```typescript
{
  pattern: /perte.*(?:totale|complète).*vision.*(?:[oœ]eil|yeux)|(?:[oœ]eil|yeux).*perte.*(?:totale|complète)/i,
  context: /traumatisme|autre.*normal|unilatérale|gauche.*normal|droite.*normal/i,
  searchTerms: ["Perte complète de la vision d'un oeil (l'autre étant normal)"],
  priority: 999
}
```

**Après V3.3.148**:
```typescript
{
  pattern: /perte.*(?:totale|complète).*vision.*(?:[oœ]eil|yeux)|(?:[oœ]eil|yeux).*perte.*(?:totale|complète).*vision|cécité.*unilatérale|aveugle.*(?:d|un)['\\s]?[oœ]eil/i,
  context: /traumatisme.*(?:[oœ]eil|orbitaire|facial)|acuité.*visuelle|fond.*[oœ]il|examen.*ophtalmologique|autre.*normal|unilatérale|gauche.*normal|droite.*normal/i,
  searchTerms: ["Perte complète de la vision d'un oeil (l'autre étant normal)"],
  priority: 10850,  // ✅ Très haute priorité
  negativeContext: /fracture.*(?:radius|malléol|humérus|fémur|tibia)|membre.*(?:supérieur|inférieur)|cheville|poignet|genou|hanche|entorse/i  // ✅ ÉVITE CAS ORTHOPÉDIQUES
}
```

---

### 4️⃣ Cumul Prédéfini: Radius + Malléole ([disabilityRates.new.ts](data/disabilityRates.new.ts#L2547-2564))

**Nouvelle entrée V3.3.148**:
```typescript
{ 
  name: "Fracture radius + fracture malléole (cumul)", 
  searchTerms: [
    "fracture radius fracture malléole",
    "fracture malléole fracture radius",
    "fracture poignet fracture cheville",
    "fracture cheville fracture radius",
    "fracture extrémité inférieure radius fracture malléole externe",
    "fracture malléole externe fracture radius droit",
    "chute membre supérieur droit membre inférieur gauche",
    "traumatisme poignet cheville",
    "chute polytraumatique radius malléole",
    "consolidation radius malléole douleurs résiduelles",
    "raideur poignet douleurs cheville",
    "immobilisation radius immobilisation malléole",
    "fracture fermée radius fracture malléole",
    "séquelles fonctionnelles poignet cheville"
  ], 
  rate: [18, 28], 
  description: "Cumul fracture radius + fracture malléole (polytraumatisme membres).", 
  rateCriteria: { 
    low: "Fracture radius consolidée (3-5%) + fracture malléole bonne consolidation (3-5%) = ~8-10% cumul", 
    medium: "Fracture radius avec raideur modérée (10-15%) + fracture malléole avec douleurs (8-12%) = ~17-25% cumul", 
    high: "Fracture radius avec limitation importante (15-20%) + fracture malléole avec raideur (12-20%) = ~25-36% cumul" 
  } 
}
```

---

### 5️⃣ Détection Automatique Cumul Membre Sup + Inf ([AiAnalyzer.tsx](components/AiAnalyzer.tsx#L11393-11397))

**Nouvelle logique V3.3.148**:
```typescript
// 🆕 Détection cumul MEMBRE SUPÉRIEUR + MEMBRE INFÉRIEUR (polytraumatisme fréquent)
const hasMembreSupLesion = /(?:fracture|luxation|rupture|lesion).*(?:épaule|coude|poignet|main|doigt|bras|avant.*bras|humérus|radius|ulna|cubitus|clavicule)/i.test(normalized);
const hasMembreInfLesion = /(?:fracture|luxation|rupture|lesion).*(?:hanche|genou|cheville|pied|orteil|jambe|cuisse|fémur|tibia|péroné|fibula)/i.test(normalized);
const hasMembreSupEtInf = hasMembreSupLesion && hasMembreInfLesion;
```

**Ajout dans isCumul**:
```typescript
const isCumul = 
    foundKeywords.length > 0 ||
    plusCount >= 3 ||
    // ... autres critères ...
    hasMembreSupEtInf ||  // ✅ NOUVEAU: Membre supérieur + membre inférieur
    hasMembreEtRachis;
```

**Ajout dans lesionCount**:
```typescript
const lesionCount = Math.max(
    plusCount + 1,
    distinctRegions,
    // ... autres critères ...
    hasMembreSupEtInf ? 2 : 1,  // ✅ NOUVEAU: 2 lésions minimum si cumul membre sup + inf
    hasMembreEtRachis ? 2 : 1
);
```

---

## 📊 RÉSULTATS ATTENDUS

### CAS TEST: Maçon 45 ans
**Description**:
> Fracture fermée extrémité inférieure radius droit, traitée par immobilisation plâtrée, 
> ainsi qu'une fracture de la malléole externe gauche, également prise en charge par immobilisation. 
> Consolidation favorable mais raideur modérée poignet droit et douleurs résiduelles cheville gauche à l'effort.

**AVANT V3.3.148** ❌:
- Lésion 1: Fracture radius = 3%
- Lésion 2: **Perte vision d'un oeil** = 28% ← **BUG !**
- **IPP total: 30%** (complètement faux)

**APRÈS V3.3.148** ✅:
- Lésion 1: Fracture radius avec raideur modérée = 10-15%
- Lésion 2: Fracture malléole avec douleurs = 8-12%
- **IPP total cumulé: 17-25%** (formule Balthazard)
- Ou entrée prédéfinie: "Fracture radius + fracture malléole (cumul)" = 18-28%

---

## 🔍 MÉCANISME DE PROTECTION

### Architecture de Défense Multi-Niveaux

```
┌─────────────────────────────────────────────────────────────┐
│  NIVEAU 1: RÈGLES EXPERTES (Priority 10800-10850)          │
├─────────────────────────────────────────────────────────────┤
│  ✅ Règle malléole: negativeContext = /vision|oeil|.../     │
│  ✅ Règle oculaire: negativeContext = /fracture|membre|.../ │
│  → Empêche détection oculaire dans cas orthopédiques        │
└─────────────────────────────────────────────────────────────┘
              ↓ Si pas de match expert, continue...
┌─────────────────────────────────────────────────────────────┐
│  NIVEAU 2: SEARCHTERMS SPÉCIFIQUES (Similarité ~70%)       │
├─────────────────────────────────────────────────────────────┤
│  ✅ SearchTerms oculaires: minimum 4-5 mots obligatoires    │
│  ❌ Plus de termes génériques type "perte vision"           │
│  → Limite faux positifs par similarité floue                │
└─────────────────────────────────────────────────────────────┘
              ↓ Si match cumul, analyse individuelle...
┌─────────────────────────────────────────────────────────────┐
│  NIVEAU 3: DÉTECTION CUMUL AUTOMATIQUE                      │
├─────────────────────────────────────────────────────────────┤
│  ✅ hasMembreSupEtInf: Détecte polytraumatisme              │
│  ✅ Entrée prédéfinie "Radius + Malléole" avec 14 variants  │
│  → Bypass extraction si cumul prédéfini matchés             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📝 FICHIERS MODIFIÉS

### 1. [data/disabilityRates.new.ts](data/disabilityRates.new.ts)
- **Lignes 450-453**: Nettoyage searchTerms oculaires (4 entrées)
- **Lignes 2547-2564**: Nouvelle entrée cumul "Fracture radius + fracture malléole"

### 2. [components/AiAnalyzer.tsx](components/AiAnalyzer.tsx)
- **Lignes 8199-8206**: Règle experte malléole renforcée (priority 10800, negativeContext)
- **Lignes 8229-8237**: Règle experte oculaire sécurisée (priority 10850, negativeContext)
- **Lignes 11393-11397**: Détection automatique cumul membre sup + inf (hasMembreSupEtInf)
- **Ligne 11417**: Ajout hasMembreSupEtInf dans isCumul
- **Ligne 11439**: Ajout hasMembreSupEtInf dans lesionCount

### 3. [test-cumul-radius-malleole.mjs](test-cumul-radius-malleole.mjs) *(NOUVEAU)*
- Test de validation pour cas réel maçon 45 ans
- Vérification absence lésion oculaire erronée
- Validation IPP cumulé ~18-28%

---

## 🎯 IMPACT

### ✅ Corrections Immédiates
1. **Faux positifs oculaires éliminés** dans cas orthopédiques
2. **Détection correcte** cumul fracture radius + malléole
3. **IPP réalistes** pour polytraumatismes membres

### 🛡️ Protection Système
- **NegativeContext** empêche confusion entre catégories (oculaire ↔ orthopédique)
- **Priority élevée** (10800-10850) garantit priorité règles expertes
- **SearchTerms spécifiques** réduit faux positifs par similarité

### 📈 Couverture Améliorée
- **Nouveau pattern cumul**: Membre supérieur + membre inférieur (fréquent en traumatologie)
- **Entrée prédéfinie**: Radius + malléole avec 14 variants linguistiques
- **Calcul automatique**: Détection 2 lésions minimum pour polytraumatisme

---

## 🔧 PROCHAINES ÉTAPES RECOMMANDÉES

1. **Audit complet searchTerms**: Vérifier tous les barèmes pour termes trop génériques
2. **Généralisation negativeContext**: Systématiser dans toutes les règles expertes
3. **Tests automatisés**: Suite de tests pour détecter faux positifs cross-catégories
4. **Documentation patterns**: Documenter tous les cumuls polytraumatiques fréquents

---

## 📅 HISTORIQUE

- **V3.3.148** (2026-01-10): Correction faux positifs oculaires + cumul radius/malléole
- **V3.3.147** (2026-01-10): Cumul fracture membre + lombalgie
- **V3.3.146** et antérieurs: Voir [CHANGELOG.md](CHANGELOG.md)

---

*Correction critique pour fiabilité système dans cas polytraumatiques réels*
