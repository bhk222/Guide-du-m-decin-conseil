# 🔧 CORRECTION V3.3.201 - POLYTRAUMATISME MEMBRE INFÉRIEUR

**Date:** 30 janvier 2026, 16:15  
**Version:** V3.3.201  
**Priorité:** CRITIQUE - Sous-évaluation IPP de 20 points

---

## 🎯 PROBLÈME IDENTIFIÉ

### Cas clinique rapporté
**Patient:** Manutentionnaire 38 ans  
**Lésions:** Fracture tibia distal + Déchirure LCM + Élongation quadriceps + Raideur genou + Algies + Déficit force

### ❌ Analyse IA incorrecte
```
IPP PROPOSÉ: 18%
JUSTIFICATION: "Polytraumatisme membre - Fracture tibia + déchirure ligamentaire + séquelles fonctionnelles multiples"
SYSTÈME: 1 seul système (MEMBRE_INFERIEUR) avec 6 séquelles regroupées en taux unique
```

### ✅ Analyse conforme barème 1967
```
SÉQUELLES DISTINCTES:
1. Fracture tibia distal (38 ans, travailleur manuel) : 15-18%
2. Déchirure partielle LCM : 10-15%
3. Élongation quadriceps avec déficit force : 8-12%
4. Raideur articulaire genou : 5-10%

CUMUL BALTHAZAR:
T = 100 - [(100-16)×(100-12)×(100-10)×(100-7)/100³]
T = 100 - [84×88×90×93/1000000]
T = 100 - 61.9 = 38.1%

IPP CORRECT: 38%
```

### 📊 Écart
- **IPP proposé:** 18%
- **IPP correct:** 38%
- **Sous-évaluation:** -20 points (-53%)

---

## 🔍 CAUSE RACINE

### Code problématique (ligne 13294)
```typescript
// Polytraumatisme du membre (fracture + ligaments + séquelles multiples)
else if (hasFracture && hasLigamentaire && (hasRaideur || hasAlgies || hasDiminution)) {
    rate = 18;
    explanation = 'Membre inférieur (CUISSE/GENOU) : Polytraumatisme membre - Fracture tibia + déchirure ligamentaire + séquelles fonctionnelles multiples (raideur, algies, déficit force)';
}
```

### Logique erronée
1. **Détection prématurée** : Dès qu'une fracture + lésion ligamentaire + séquelle fonctionnelle sont présentes, le système attribue un taux unique de 18%
2. **Regroupement excessif** : Toutes les séquelles du membre sont fusionnées en une seule évaluation
3. **Non-respect du barème** : Le barème 1967 impose d'évaluer chaque séquelle individuellement puis de les cumuler

### Principe barémique violé
> **Barème officiel 1967, principe du cumul :**  
> "Les séquelles d'un même système anatomique doivent être **évaluées séparément** selon leur nature et gravité respective, puis **cumulées** via la formule de Balthazar."

Le système confond :
- ❌ "Même système anatomique" = taux unique global
- ✅ "Même système anatomique" = évaluation individuelle + cumul

---

## 🛠️ CORRECTIONS APPLIQUÉES

### 1. Suppression règle polytraumatisme regroupé

**Fichier:** `components/AiAnalyzer.tsx`  
**Ligne:** 13294  

**AVANT:**
```typescript
// Polytraumatisme du membre (fracture + ligaments + séquelles multiples)
else if (hasFracture && hasLigamentaire && (hasRaideur || hasAlgies || hasDiminution)) {
    rate = 18;
    explanation = 'Membre inférieur (CUISSE/GENOU) : Polytraumatisme membre - Fracture tibia + déchirure ligamentaire + séquelles fonctionnelles multiples (raideur, algies, déficit force)';
}
```

**APRÈS:**
```typescript
// ❌ SUPPRIMÉ V3.3.201: Polytraumatisme regroupé (sous-évalue les séquelles multiples)
// Les lésions distinctes doivent être détectées séparément pour cumul correct via Balthazar
// Ancienne logique: rate = 18 pour "fracture + ligaments + séquelles" → IPP trop faible
// Nouvelle logique: Chaque séquelle détectée individuellement puis cumulée
```

### 2. Amélioration extraction lésions individuelles

**Fichier:** `components/AiAnalyzer.tsx`  
**Fonction:** `extractIndividualLesions`  
**Ligne:** 11848

**AJOUT:**
```typescript
// 🆕 V3.3.201: Détecter séquelles fonctionnelles séparées (raideur, algies, déficit force)
const raideurMatch = normalized.match(/raideur\s+(?:articulaire|r[ée]siduelle)?\s*(?:du|de\s+la)?\s*(?:genou|hanche|coude|poignet|cheville)/i);
const algiesMatch = normalized.match(/(?:algies?|douleurs?)\s+(?:m[ée]caniques?)?\s*(?:persistantes?|chroniques?|r[ée]siduelles?)?/i);
const deficitForceMatch = normalized.match(/(?:diminution|d[ée]ficit|perte)\s+(?:de\s+la?)?\s*force\s+(?:musculaire?)?/i);

if (raideurMatch) {
    lesions.push(raideurMatch[0].trim());
    console.log('  + Raideur détectée:', raideurMatch[0].trim());
}
if (algiesMatch) {
    lesions.push(algiesMatch[0].trim());
    console.log('  + Algies détectées:', algiesMatch[0].trim());
}
if (deficitForceMatch) {
    lesions.push(deficitForceMatch[0].trim());
    console.log('  + Déficit force détecté:', deficitForceMatch[0].trim());
}
```

**Impact:**
- Détecte maintenant "raideur articulaire du genou" comme séquelle séparée
- Détecte "algies mécaniques persistantes" comme séquelle séparée
- Détecte "diminution force musculaire" comme séquelle séparée

### 3. Test validation créé

**Fichier:** `test-polytraumatisme-membre-inferieur.ts`

Teste le cas clinique avec :
- 4 séquelles distinctes
- Calcul Balthazar attendu : 38%
- Validation conformité barème 1967

---

## ✅ RÉSULTAT ATTENDU APRÈS CORRECTION

### Nouvelle détection
```
🔍 SÉQUELLES DÉTECTÉES:
1. Fracture non déplacée tiers distal tibia droit
2. Déchirure partielle ligament collatéral médial genou droit
3. Élongation musculaire quadriceps
4. Raideur articulaire résiduelle genou
5. Algies mécaniques persistantes à l'effort (optionnel)
6. Diminution force musculaire membre inférieur droit (optionnel)

🔄 REGROUPEMENT PAR SYSTÈME:
MEMBRE_INFERIEUR: 4-6 séquelles

🧮 CALCUL CUMUL (Balthazar):
- Fracture tibia : 16% → Capacité 84%
- Déchirure LCM : 12% → Capacité 73.9%
- Élongation quadriceps : 10% → Capacité 66.5%
- Raideur genou : 7% → Capacité 61.9%

📊 IPP FINAL: 38%
```

---

## 📚 RÉFÉRENCES BARÈME 1967

### Fracture tibia
- **Ligne 2908:** Fracture diaphysaire jambe sujet jeune (travailleur manuel) : **12%**
- Avec séquelles fonctionnelles : **15-18%**

### Déchirure ligament collatéral médial
- **Ligne 2796:** Déchirure/rupture LLI (ligament latéral interne) : **10-20%**
  - Low: Déchirure partielle cicatrisée, laxité minime : **10%**
  - Medium: Déchirure complète, laxité modérée : **15%**
  - High: Laxité sévère avec instabilité : **20%**

### Élongation quadriceps
- **Ligne 2678:** Élongation/déchirure musculaire quadriceps : **5-20%**
  - Low: Élongation cicatrisée, force conservée : **5%**
  - Medium: Déchirure partielle, déficit force modéré : **10-12%**
  - High: Déchirure complète, déficit majeur : **15-20%**

### Raideur genou
- **Ligne 2899:** Raideur du genou : **5-25%**
  - Low: Flexion limitée à 90° : **5%**
  - Medium: Flexion 60-90° : **10-15%**
  - High: Flexion <45° : **20-25%**

---

## 🔄 IMPACT

### Sur les évaluations futures
- ✅ Polytraumatismes correctement évalués
- ✅ Séquelles fonctionnelles détectées séparément
- ✅ Cumul Balthazar appliqué correctement
- ✅ Conformité barème 1967 respectée

### Sur les cas antérieurs
⚠️ **ATTENTION:** Les évaluations antérieures avec "polytraumatisme membre" à 18% doivent être **révisées** car potentiellement sous-évaluées de 15-20 points.

---

## 📝 NEXT STEPS

1. ✅ Code corrigé
2. ✅ Test validation créé
3. ⏳ Commit et déploiement
4. ⏳ Test sur cas réel avec interface IA
5. ⏳ Audit des évaluations antérieures "polytraumatisme membre"

---

**Correction effectuée par:** IA Expert Médico-Légal  
**Validation:** Barème officiel 1967, lignes 2678, 2796, 2899, 2908
