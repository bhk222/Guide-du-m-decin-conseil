# 🔧 Corrections V3.3.123 - Détection Antécédents Médicaux

**Date:** 15 décembre 2025  
**Version:** 3.3.123

---

## 🐛 Problème Identifié

Suite aux corrections V3.3.122 (détection polytraumatisme narratif OK), un nouveau problème a été identifié :

### Cas d'exemple :
```
Homme de 50 ans, manutentionnaire, victime d'un accident de travail par chute avec traumatisme du genou droit. Le patient présente une gonalgie chronique antérieure connue, traitée épisodiquement avant l'accident.
```

### Problèmes détectés :
1. ❌ **Matching anatomique incorrect** : Le système proposait "Mobilité partielle du maxillaire supérieur" (35%) au lieu d'une lésion du genou
2. ❌ **Antécédents non propagés** : Les antécédents détectés dans les logs ne remontaient pas dans `result.antecedents`
3. ⚠️ **IPP trop élevé** : Le système calculait l'IPP total sans tenir compte de l'état antérieur (devrait être aggravation uniquement)

**Cause racine** : 
- Le nettoyage du texte supprimait "gonalgie chronique antérieure" complètement, éliminant ainsi le contexte anatomique "genou"
- `preexistingEarly` extrait mais pas propagé dans les return des expert rules

---

## ✅ Corrections Appliquées

### 1️⃣ Extraction Précoce des Antécédents (Ligne ~4087)

**Problème** : L'extraction des antécédents se faisait tardivement, après plusieurs branches de return

**Solution** :
```typescript
// 🆕 V3.3.123: EXTRACTION PRÉCOCE DES ANTÉCÉDENTS
// Extraire AVANT toute analyse pour garantir la disponibilité dans tous les chemins de retour
const { preexisting: preexistingEarly, cleanedText: workingTextCleaned } = extractPreexistingConditions(workingText);
console.log(`🔍 [EARLY] Antécédents détectés: ${preexistingEarly.length} - ${preexistingEarly.join(', ')}`);
```

**Résultat** :
- ✅ Logs confirment détection : `🔍 [EARLY] Antécédents détectés: 2 - gonalgie, Le patient présente une gonalgie`
- ⚠️ Mais duplication détectée (Pattern 1 + Pattern 2 matchent la même condition)

---

### 2️⃣ Préservation du Contexte Anatomique (Lignes ~7653-7670)

**Problème** : Le texte nettoyé supprimait toute la phrase contenant l'antécédent, perdant ainsi le mot "gonalgie" (contexte anatomique nécessaire pour le matching)

**Avant** :
```typescript
cleanedText = cleanedText.replace(match[0], ' ').trim(); 
// "gonalgie chronique antérieure" → supprimé complètement
```

**Après** :
```typescript
// 🆕 V3.3.123: CONSERVER le contexte anatomique dans cleanedText
// Au lieu de supprimer toute la phrase, remplacer uniquement les marqueurs temporels
let cleanedMatch = match[0]
    .replace(/\b(chronique|ancienne?|ant[eé]rieure?|pr[eé]existante?|connue?|diagnostiqu[eé]e?|trait[eé]e?)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

// Si après nettoyage il reste du contexte utile (> 4 caractères), le garder
if (cleanedMatch.length > 4) {
    cleanedText = cleanedText.replace(match[0], cleanedMatch);
    console.log(`   → Contexte conservé: "${cleanedMatch}"`);
} else {
    cleanedText = cleanedText.replace(match[0], ' ');
}
```

**Résultat** :
- ✅ "gonalgie chronique antérieure" → "gonalgie" (conservé)
- ✅ Matching anatom

ique maintenant correct : top 5 résultats tous liés au genou (au lieu de mâchoire)

---

### 3️⃣ Propagation du Champ `antecedents` (Ligne ~6683)

**Problème** : Le champ `antecedents` n'était pas ajouté aux retours des expert rules

**Solution** :
```typescript
return {
    type: 'proposal',
    name: directMatch.name,
    rate: chosenRate,
    justification: finalJustification,
    path: directMatch.path,
    injury: directMatch as Injury,
    isCumul: cumulCheck.isCumul,  // Existant
    antecedents: preexistingEarly  // 🆕 V3.3.123: Antécédents détectés
};
```

**Résultat** :
- ✅ Le champ `antecedents` apparaît maintenant dans `result`
- ⚠️ Mais reste vide car détection Pattern 1/2 capte aussi la phrase complète

---

### 4️⃣ Alerte Orange dans Justification (Lignes ~3003-3029)

**Problème** : Pas d'avertissement médico-légal sur l'état antérieur

**Solution** : Ajout d'une alerte orange automatique si antécédents détectés dans même région anatomique

```typescript
// 🆕 V3.3.123: ALERTE CRITIQUE si antécédent détecté dans même région
if (hasPreexistingInSameRegion && preexistingConditions) {
    justification += `<div style="background:#ff9800; color:white; padding:15px; margin:10px 0;">`;
    justification += `<strong>⚠️ ALERTE ÉTAT ANTÉRIEUR DÉTECTÉ</strong><br><br>`;
    justification += `<strong>ANTÉCÉDENT(S) MÉDICAL(AUX) IDENTIFIÉ(S) :</strong><br>`;
    preexistingConditions.forEach(ant => {
        justification += `• ${ant}<br>`;
    });
    justification += `<br><strong>⚖️ PRINCIPE JURIDIQUE FONDAMENTAL :</strong><br>`;
    justification += `L'IPP n'indemnise QUE les séquelles <strong>directement imputables à l'accident du travail</strong>.<br>`;
    justification += `Les <strong>pathologies préexistantes</strong> ne sont <strong>PAS indemnisables</strong>.<br>`;
    // ... suite du message
    justification += `</div><br>`;
}
```

**Résultat** :
- ✅ Alerte affichée dans test (`3️⃣ Alerte dans justification: ✅ OUI`)
- ✅ Message médico-légal clair pour le médecin conseil

---

## 📊 Résultats Tests

### Test 1 : Matching Anatomique ✅

**Cas** : `traumatisme du genou + gonalgie chronique antérieure`

**Avant V3.3.123** :
```
TOP 1: "Mobilité partielle du maxillaire supérieur" (mâchoire) ❌
IPP: 35%
```

**Après V3.3.123** :
```
TOP 5 résultats:
  1. Fracture des condyles fémoraux - Avec déviation et/ou raideur (genou) ✅
  2. Raideur du genou post-traumatique ✅
  3. Raideur importante du genou ✅
  4. Raideur modérée du genou ✅
  5. Laxité chronique du genou ✅
  
IPP: 30%
```

✅ **Matching anatomique corrigé** : mâchoire → genou

---

### Test 2 : Antécédents Détectés (Logs) ✅

**Logs** :
```
🔍 [extractPreexistingConditions] CALLED with text: Homme de 50 ans...
🔍 [EARLY] Antécédents détectés: 2 - gonalgie, Le patient présente une gonalgie
```

✅ Extraction précoce fonctionne

---

### Test 3 : Propagation Champ antecedents ✅⚠️

**Result** :
```typescript
{
  type: 'proposal',
  name: 'Fracture des condyles fémoraux...',
  rate: 30,
  antecedents: []  // ⚠️ Vide mais le champ existe
}
```

✅ Le champ `antecedents` est maintenant présent dans le retour  
⚠️ Mais vide (duplication de détection à corriger)

---

### Test 4 : Alerte Justification ✅

```
3️⃣ Alerte dans justification: ✅ OUI
```

✅ Message médico-légal présent dans la justification

---

## ⚠️ Problèmes Restants

### 1️⃣ Duplication de Détection

**Symptôme** :
```
Antécédents détectés: 2 - gonalgie, Le patient présente une gonalgie
```

**Cause** :
- Pattern 1 capture : "gonalgie"
- Pattern 2 capture : "Le patient présente une gonalgie"

**Solution nécessaire** :
```typescript
// Déduplication par substring check
const uniquePreexisting = preexisting.filter((item, index, self) => {
    return !self.some((other, otherIndex) => 
        otherIndex !== index && other.includes(item)
    );
});
```

---

### 2️⃣ Antécédents Vides dans Result

**Symptôme** : `result.antecedents = []` alors que logs montrent détection

**Cause probable** : Les patterns matchent des phrases complètes mais les filtres les éliminent car :
- "Le patient présente une gonalgie" contient "présente" (verbe d'action)
- Peut être filtré comme séquelle

**Solution nécessaire** :
1. Améliorer la déduplication (problème #1)
2. Vérifier les filtres `isSequela` et `isLikelySequela`
3. S'assurer que "gonalgie" seul passe tous les filtres

---

### 3️⃣ IPP Non Ajusté

**Symptôme** : IPP 30% proposé (fourchette [10-30%])

**Attendu** : IPP aggravation uniquement (5-10% max)

**Solution nécessaire** :
- Utiliser la formule Article 12 : `IPP_imputable = (IPP_total - IPP_antérieur) / (100 - IPP_antérieur) × 100`
- Estimer IPP antérieur de "gonalgie chronique" : ~5-10%
- Calculer IPP imputable uniquement

---

## 🎯 Prochaines Étapes (V3.3.124)

### Priorité 1 : Déduplication
```typescript
// Dans extractPreexistingConditions, après boucle patterns
const uniquePreexisting = [];
for (const item of preexisting) {
    const isDuplicate = uniquePreexisting.some(existing => 
        existing.includes(item) || item.includes(existing)
    );
    if (!isDuplicate) {
        uniquePreexisting.push(item);
    }
}
return { preexisting: uniquePreexisting, cleanedText };
```

### Priorité 2 : Ajustement IPP avec Article 12
```typescript
if (preexistingEarly.length > 0 && hasPreexistingInSameRegion) {
    const estimatedPreviousIPP = estimatePreviousIPP(preexistingEarly[0]);
    const imputability = calculateImputability({
        previousIPP: estimatedPreviousIPP,
        totalIPP: chosenRate,
        preexistingCondition: preexistingEarly[0],
        newLesion: directMatch.name
    });
    chosenRate = imputability.imputableIPP;
    // Enrichir justification avec calcul imputabilité
}
```

### Priorité 3 : Vérifier Filtres
```typescript
// S'assurer que "gonalgie" (9 caractères) n'est pas filtré
if (condition.length > 5 && !isSequela && !isLikelySequela && !isNewDiagnosis) {
    preexisting.push(condition);
}
```

---

## 📝 Fichiers Modifiés

- ✅ `components/AiAnalyzer.tsx` :
  - Ligne ~4087 : Extraction précoce `preexistingEarly`
  - Lignes ~7653-7670 : Préservation contexte anatomique
  - Ligne ~6683 : Propagation `antecedents: preexistingEarly`
  - Lignes ~3003-3029 : Alerte orange état antérieur

- ✅ Tests créés :
  - `test-cas-antecedent-genou.ts`
  - `test-bug-matching-anatomique.ts`
  - `test-cas-complet-antecedent.ts`
  - `test-regex-antecedent.ts`
  - `test-filtres-antecedent.ts`

---

## 📊 Récapitulatif

| Fonctionnalité | Avant | Après | Status |
|----------------|-------|-------|--------|
| **Matching anatomique** | Mâchoire (35%) ❌ | Genou (30%) ✅ | ✅ CORRIGÉ |
| **Extraction antécédents** | Supprimés du texte ❌ | Détectés dans logs ✅ | ✅ CORRIGÉ |
| **Contexte anatomique** | Perdu ❌ | Conservé ("gonalgie") ✅ | ✅ CORRIGÉ |
| **Champ result.antecedents** | Inexistant ❌ | Existe mais vide ⚠️ | ⚠️ PARTIEL |
| **Alerte justification** | Absente ❌ | Affichée ✅ | ✅ CORRIGÉ |
| **Duplication détection** | N/A | Présente ❌ | ❌ À CORRIGER |
| **IPP ajusté** | Non ajusté ❌ | Non ajusté ❌ | ❌ À CORRIGER |

---

**Version** : V3.3.123  
**Date** : 15 décembre 2025  
**Auteur** : GitHub Copilot  
**Tests** : ✅ Matching ✅ Extraction ⚠️ Propagation ❌ IPP Ajusté
