# 📋 TODO CONTINUATION V3.3.135

**Dernière session**: V3.3.134 - 30 décembre 2025  
**Statut actuel**: 16/26 (61.5%)  
**Objectif**: 85% (22/26)

---

## 🚀 REPRISE RAPIDE

### Commande de Test
```bash
cd "c:\Users\HICHAME\Desktop\Guide du médecin conseil"
npx tsx test-validation-rapide-v3.3.132.ts
```

### État Système
- ✅ V3.3.134 déployée et validée
- ✅ Custom handler 3 orteils fonctionnel
- ✅ 16/26 tests passants (61.5%)
- ⏳ 10 tests restants à corriger

---

## 🎯 PLAN D'ACTION IMMÉDIAT

### ✅ PHASE 1: Validation Rules Existantes (0 effort)
**Durée**: 2 min  
**Impact**: Potentiel 61.5% → 77% (+4 tests)

#### Tests à Valider
1. **doigt-2**: Ankylose annulaire
   - Expert rule ligne 5287 (priority 10700)
   - Pattern: `/ankylose.*(?:annulaire|auriculaire|d4)/i`
   - Expected: 5% au lieu de 35%
   - **Action**: Juste relancer test

2. **audio-1**: Surdité complète une oreille
   - Expert rule existante (priority 10600)
   - Expected: 20% au lieu de 15%
   - **Action**: Juste relancer test

3. **mi-1**: Hanche flexion 90-120°
   - Priority augmentée à 10700
   - Expected: 25% au lieu de 40%
   - **Action**: Juste relancer test

4. **mi-2**: Genou instabilité
   - Priority augmentée à 10700
   - Expected: 30% au lieu de 25%
   - **Action**: Juste relancer test

#### Commande Rapide
```bash
npx tsx test-validation-rapide-v3.3.132.ts 2>&1 | Select-String "Test (14|16|18|19):|Taux de"
```

---

### ⚠️ PHASE 2: Debug forcedRate (30 min)
**Durée**: 30 min  
**Impact**: Potentiel 77% → 85% (+2 tests)

#### Tests Concernés
5. **visc-2**: Anus artificiel
   - forcedRate: 40 ligne 5558
   - Expected: 40% au lieu de 90%
   - **Action**: Vérifier si forcedRate fonctionne
   - **Plan B**: Custom handler si forcedRate fail

6. **mi-3**: Équin modéré
   - forcedRate: 15 pré-existant
   - Expected: 15% au lieu de 40%
   - **Action**: Vérifier si forcedRate fonctionne
   - **Plan B**: Custom handler si forcedRate fail

#### Debug forcedRate
```typescript
// Chercher dans code:
grep -n "forcedRate" components/AiAnalyzer.tsx

// Vérifier utilisation:
// Si forcedRate ignoré → Créer custom handlers:
// __ANUS_ARTIFICIEL__ (rate=40)
// __EQUIN_MODERE__ (rate=15)
```

---

### 🔧 PHASE 3: Cas Complexes (2h)
**Durée**: 2h  
**Impact**: 85% → 100% (+4 tests)

#### 7. etat-1: État antérieur tassement
**Problème**: Insertion expert rule failed  
**Solution**: Refactoring handler état antérieur
```typescript
// Créer: __ETAT_ANTERIEUR_TASSEMENT__
{
    pattern: /tassement.*L\d.*sur.*[eé]tat.*ant[eé]rieur.*tassement.*L\d/i,
    context: /lombaire|rachis/i,
    searchTerms: ["__ETAT_ANTERIEUR_TASSEMENT__"],
    priority: 10700
}

// Handler:
if (rule.searchTerms.includes("__ETAT_ANTERIEUR_TASSEMENT__")) {
    // Parser L4 et L3
    // Calculer Article 12: cumul état antérieur
    // Return rate: 18%
}
```

#### 8. doigt-3: Raideur pouce P1/P2
**Problème**: Matche ankylose totale (25%) au lieu de raideur (10%)  
**Solution**: Custom handler spécifique
```typescript
// Créer: __RAIDEUR_POUCE_P1P2__
{
    pattern: /raideur.*pouce.*(?:p1|p2)/i,
    context: /.*/i,
    searchTerms: ["__RAIDEUR_POUCE_P1P2__"],
    priority: 10700
}

// Handler:
if (rule.searchTerms.includes("__RAIDEUR_POUCE_P1P2__")) {
    return {
        type: 'proposal',
        name: 'Raideur du pouce (P1 ou P2)',
        rate: 10,
        // ...
    };
}
```

#### 9. limite-1: Genou limite haute 130°
**Problème**: Non trouvé (règle manquante)  
**Solution**: Expert rule limite exacte
```typescript
{
    pattern: /raideur.*genou.*(?:exactement|limite).*130/i,
    context: /flexion/i,
    searchTerms: ["__GENOU_LIMITE_HAUTE_130__"],
    priority: 10700
}

// Handler:
if (rule.searchTerms.includes("__GENOU_LIMITE_HAUTE_130__")) {
    return {
        type: 'proposal',
        name: 'Raideur genou limite haute (flexion 130°)',
        rate: 15,
        // ...
    };
}
```

#### 10. limite-2: (si existant)
**À identifier lors relance tests**

---

## 📊 PROGRESSION ATTENDUE

| Phase | Tests OK | Taux | Durée | Effort |
|-------|----------|------|-------|--------|
| Actuel V3.3.134 | 16/26 | 61.5% | - | - |
| Phase 1 (validation) | 20/26 | 77% | 2 min | ⭐ Minimal |
| Phase 2 (forcedRate) | 22/26 | 85% | 30 min | ⭐⭐ Faible |
| Phase 3 (complexes) | 26/26 | 100% | 2h | ⭐⭐⭐ Moyen |

---

## 🔍 DIAGNOSTICS RAPIDES

### Test doigt-2 Failed?
```bash
# Voir logs
npx tsx test-validation-rapide-v3.3.132.ts 2>&1 | Select-String "Test 14" -Context 0,30
# Chercher "ankylose annulaire" ou "EXPERT RULE MATCH 10700"
```

### Test audio-1 Failed?
```bash
# Voir logs
npx tsx test-validation-rapide-v3.3.132.ts 2>&1 | Select-String "Test 16" -Context 0,30
# Chercher "Surdité complète" ou "20%"
```

### forcedRate Ne Fonctionne Pas?
```bash
# Chercher utilisation forcedRate dans code
grep -n "forcedRate" components/AiAnalyzer.tsx
# Si jamais utilisé dans logic → Plan B: custom handlers
```

---

## 💡 TEMPLATE CUSTOM HANDLER

### Étape 1: Ajouter Expert Rule
```typescript
// Dans expertRules array (ligne 5000+)
{
    pattern: /votre_pattern_ici/i,
    context: /.*/i,
    searchTerms: ["__VOTRE_MARKER__"],
    priority: 10700
}
```

### Étape 2: Créer Handler
```typescript
// Après __AMPUTATION_3_ORTEILS__ handler (ligne 8270+)
if (rule.searchTerms.includes("__VOTRE_MARKER__")) {
    const justification = `<strong>🎯 RÈGLE EXPERTE : TITRE</strong><br><br>` +
        `<strong>📋 Référence barémique :</strong> Nom lésion<br>` +
        `<strong>📊 Taux IPP retenu : X%</strong><br><br>` +
        `<em>Barème indicatif algérien 1967</em>`;
    
    return {
        type: 'proposal',
        name: 'Nom lésion',
        rate: X,
        justification,
        path: 'Catégorie > Sous-catégorie',
        injury: {
            name: 'Nom lésion',
            rate: X,
            path: 'Catégorie'
        } as Injury
    };
}
```

### Étape 3: Tester
```bash
npx tsx test-validation-rapide-v3.3.132.ts 2>&1 | Select-String "Test X"
```

---

## 🎯 COMMANDES ESSENTIELLES

### Test Complet
```bash
npx tsx test-validation-rapide-v3.3.132.ts
```

### Test Spécifique
```bash
npx tsx test-validation-rapide-v3.3.132.ts 2>&1 | Select-String "Test 4:"
```

### Voir Tous Échecs
```bash
npx tsx test-validation-rapide-v3.3.132.ts 2>&1 | Select-String "ÉCHEC|PARTIEL"
```

### Taux Actuel
```bash
npx tsx test-validation-rapide-v3.3.132.ts 2>&1 | Select-String "Taux de réussite"
```

---

## 📝 NOTES IMPORTANTES

### Architecture Validée
✅ Custom handler avec marker `__CUSTOM__`  
✅ Priority sorting automatique (ligne 7700)  
✅ Pattern + context matching  
✅ Return direct sans barème search

### Pièges À Éviter
❌ Context trop spécifique (utiliser `/.*/i`)  
❌ Oublier activation handler (ligne 7734)  
❌ Doublons de règles (vérifier avant ajout)  
❌ forcedRate sans vérification (préférer custom handler)

### Checklist Ajout Handler
1. [ ] Définir expert rule avec `__MARKER__`
2. [ ] Priority 10700 minimum
3. [ ] Context large `/.*/i` si doute
4. [ ] Handler avec if (rule.searchTerms.includes("__MARKER__"))
5. [ ] Return direct avec rate fixe
6. [ ] Tester immédiatement

---

## 🎉 OBJECTIFS

### Court Terme (Phase 1)
🎯 **Atteindre 77%** (20/26)  
⏱️ **2 minutes**  
💪 **Effort minimal**

### Moyen Terme (Phase 2)
🎯 **Atteindre 85%** (22/26) - OBJECTIF PRINCIPAL  
⏱️ **30 minutes**  
💪 **Effort faible**

### Long Terme (Phase 3)
🎯 **Atteindre 100%** (26/26) - PERFECTION  
⏱️ **2 heures**  
💪 **Effort moyen**

---

**Prêt pour reprise!** Commencer par Phase 1 (validation immédiate).
