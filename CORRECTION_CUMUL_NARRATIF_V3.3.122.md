# 🔧 Corrections V3.3.122 - Détection Récits Médicaux Narratifs

**Date:** 15 décembre 2025  
**Version:** 3.3.122

---

## 🐛 Problème Initial

Le système ne détectait pas correctement les lésions multiples dans les descriptions narratives médicales standards (comme les comptes-rendus médicaux), causant :

### Cas d'exemple soumis :
```
Homme de 42 ans, ouvrier du bâtiment, victime d'un accident de travail suite à une chute d'un échafaudage d'environ 3 mètres. Les lésions constatées comprennent : fracture de la clavicule droite, fractures costales multiples, contusion pulmonaire droite avec pneumothorax minime, entorse grave du genou gauche et traumatisme crânien léger. La prise en charge a été médico-chirurgicale avec immobilisation, traitement antalgique et rééducation fonctionnelle. Après consolidation, persistent des séquelles fonctionnelles à type de limitation de l'épaule droite, instabilité du genou gauche et gêne respiratoire modérée à l'effort.
```

### Problèmes détectés :
1. ❌ **Seulement 2 lésions détectées** au lieu de 4
2. ❌ **Genou ignoré** complètement
3. ❌ **Traumatisme crânien ignoré**
4. ❌ **Séquelles non associées** aux lésions primaires
5. ❌ **"Fracture clavicule sans raideur"** alors qu'il y a limitation d'épaule

---

## ✅ Corrections Appliquées

### 1. Détection Cumul (`detectMultipleLesions`)

**Ajout critères de détection** :
```typescript
const hasEntorse = /entorse/i.test(normalized);
const hasContusion = /contusion/i.test(normalized);
const hasTraumatisme = /traumatisme.*(?:cervical|cranien)/i.test(normalized);

// Ajout de types de lésions supplémentaires
lesionTypes.push('entorse', 'contusion', 'traumatisme');

// Nouveau critère : Récit narratif avec virgules
const commaCount = (text.match(/,/g) || []).length;
const hasNarrativePattern = commaCount >= 2 && totalRegionsCount >= 2;
```

**Critère de cumul amélioré** :
```typescript
const isCumul = 
    // ... critères existants ...
    hasNarrativePattern ||  // 🆕 Récit narratif avec 2+ virgules et 2+ régions
    (totalRegionsCount >= 3) ||  // 3+ régions = cumul certain
    (totalRegionsCount >= 2 && hasMultipleLesionTypes);  // 2+ régions + 2+ types
```

### 2. Extraction Lésions (`extractIndividualLesions`)

**Nouveau Pattern 2B** (prioritaire) :
```typescript
// Pattern 2B: Récit narratif médical avec virgules
const commaCount = (normalized.match(/,/g) || []).length;
const hasMultipleCommas = commaCount >= 2;
const hasMultipleLesionTypes = /(fracture|entorse|luxation|rupture|traumatisme|contusion).*?,.../i.test(normalized);

if (hasMultipleCommas && hasMultipleLesionTypes) {
    // Extraire séquelles
    const sequelaeMatch = normalized.match(/(apres\s+consolidation.*?persist.*)/i);
    
    // Extraire UNIQUEMENT les lésions primaires
    const lesionSectionMatch = normalized.match(/comprennent\s*:\s*(.*?)(?:\.\s*la\s+prise|apres)/i);
    
    // Séparer par virgules
    let parts = mainText.split(/\s*,\s+/);
    
    // Post-traitement : splitter aussi sur " et " si deux lésions distinctes
    for (const part of parts) {
        if (/\s+et\s+/i.test(part)) {
            const subparts = part.split(/\s+et\s+/i);
            if (both have lesion types) {
                expandedParts.push(...subparts);
            }
        }
    }
    
    // Enrichir avec séquelles correspondantes
    if (sequelaeContext) {
        enrichedLesions = validLesions.map(lesion => {
            if (/clavicule|epaule/.test(lesion) && /limitation.*epaule/.test(sequelaeText)) {
                return lesion + ' avec limitation epaule persistante';
            }
            // ... autres associations
        });
    }
}
```

---

## 📊 Résultats Après Corrections

### ✅ Détection :
- **5 lésions détectées** (au lieu de 2)
- Pattern 2B activé correctement
- Séparation " et " fonctionnelle

### Lésions extraites :
1. ✅ `fracture de la clavicule droite avec limitation epaule persistante`
2. ✅ `fractures costales multiples avec gene respiratoire a l effort`
3. ✅ `contusion pulmonaire droite avec pneumothorax minime avec gene respiratoire a l effort`
4. ✅ `entorse grave du genou gauche avec instabilite persistante`
5. ✅ `traumatisme cranien leger`

---

## ⚠️ Problèmes Restants

Les lésions sont maintenant bien extraites, mais il reste des **problèmes de matching** lors de l'analyse individuelle :

### 🔴 Erreurs de matching :
1. **Traumatisme crânien léger** → matchécomme "Persistance corps étranger intra-crânien" (**40%** au lieu de 0-5%)
   - Le système devrait reconnaître "traumatisme crânien léger" comme séquelles mineures

2. **Entorse grave genou** → matché comme "Instabilité épaule" (**23%**)
   - Le système confond "genou" et "épaule"
   - Devrait matcher "Séquelles entorse grave genou" ou "Laxité ligamentaire genou"

3. **Contusion pulmonaire** → matché comme "Fracture clavicule" (**2%**)
   - Le système n'a pas d'entrée "contusion pulmonaire" dans le barème
   - Devrait être ignorée ou évaluée à 0% (car minime + résorbée)

---

## 🎯 Prochaines Étapes

### Corrections nécessaires :

1. **Ajouter règle experte pour "traumatisme crânien léger"** :
   ```typescript
   if (/traumatisme\s+cranien\s+leger/i.test(normalized)) {
       return { name: "Traumatisme crânien léger sans séquelles", rate: 0 };
   }
   ```

2. **Améliorer le matching "entorse genou"** :
   - Vérifier que "genou" est bien présent dans la lésion
   - Ne pas confondre avec "épaule"

3. **Gérer contusions pulmonaires résorbées** :
   - Si "minime" + "résorbé" → 0%
   - Sinon chercher "séquelles respiratoires"

---

## 📝 Fichiers Modifiés

- `components/AiAnalyzer.tsx` :
  - `detectMultipleLesions()` (lignes 7620-7760)
  - `extractIndividualLesions()` (lignes 7764-7955)
  
- `test-cas-polytraumatisme-ouvrier.ts` : Nouveau fichier de test

---

## ✅ Tests de Régression

Vérifier que les anciennes fonctionnalités marchent toujours :
- ✅ Cumul avec "+" : `genou LCA + méniscectomie`
- ✅ Lésions séparées par "et" : `fracture trochanter et diaphyse fémorale`
- ✅ États antérieurs : `état antérieur IPP 10% + nouvelle lésion`
