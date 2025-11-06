# 📋 STRUCTURE DES BARÈMES IPP - Version 2.8

## 🏛️ HIÉRARCHIE DES RÉFÉRENCES

### 1️⃣ **BARÈME PRINCIPAL : ALGÉRIEN 1967**
**Base légale** : Arrêté du 5 janvier 1967 fixant le barème d'évaluation des incapacités permanentes partielles en matière d'accidents du travail

**Statut** : Référence **OBLIGATOIRE** pour l'évaluation IPP en Algérie

**Couverture** :
- ✅ Membres supérieurs (amputations, ankyloses, raideurs)
- ✅ Membres inférieurs (amputations, ankyloses, raideurs)
- ✅ Rachis cervical et dorso-lombaire
- ✅ Raccourcissements mesurés (1% par cm jusqu'à 20%)

**Fichier** : `data/algerianBareme1967.ts`

**Ordre de recherche** : **PRIORITAIRE** (placé en première position)

---

### 2️⃣ **BARÈME COMPLÉMENTAIRE : MAYET & REY**
**Base légale** : Barème médico-légal français reconnu internationalement

**Statut** : Référence **COMPLÉMENTAIRE** pour les lésions non prévues dans le barème 1967

**Couverture** :
- ✅ Séquelles crâniennes complexes
- ✅ Séquelles neurologiques centrales (hémiplégies, épilepsies)
- ✅ Séquelles psychiatriques post-traumatiques
- ✅ Séquelles sensorielles (vision, audition)
- ✅ Fractures complexes avec complications (cal vicieux, pseudarthrose)

**Fichier** : `data/disabilityRates.ts` (section complémentaire)

**Ordre de recherche** : **SECONDAIRE** (si aucune correspondance dans barème 1967)

---

## 🔍 LOGIQUE DE RECHERCHE DE L'IA

```typescript
Étape 1 : Recherche dans BARÈME ALGÉRIEN 1967
  ↓
  Correspondance trouvée ?
  ├─ OUI → Utiliser taux 1967 ✅
  └─ NON → Passer à étape 2
       ↓
Étape 2 : Recherche dans BARÈME MAYET & REY
  ↓
  Correspondance trouvée ?
  ├─ OUI → Utiliser taux MAYET & REY (mention "complément") ⚠️
  └─ NON → Demander précision utilisateur ❌
```

---

## 📊 EXEMPLES D'APPLICATION

### Exemple 1 : Fracture fémur avec raccourcissement 4 cm

**Description** : "Fracture du fémur consolidée avec raccourcissement de 4 cm"

**Recherche IA** :
1. ✅ Trouvé dans **Barème Algérien 1967**
   - Rubrique : "Raccourcissement de 4 cm"
   - Taux : **8%** (taux fixe)
   - Source : Barème algérien 1967

2. ✅ Peut être cumulé avec :
   - Rubrique : "Raideur modérée de la hanche" [15-25%]
   - Si séquelles fonctionnelles associées

**IPP Final** : 8% (raccourcissement isolé) OU 20-25% si raideur associée

---

### Exemple 2 : Amputation pouce main dominante

**Description** : "Amputation totale du pouce main dominante"

**Recherche IA** :
1. ✅ Trouvé dans **Barème Algérien 1967**
   - Rubrique : "Amputation du pouce - Désarticulation métacarpo-phalangienne"
   - Taux : **28%** (taux fixe)
   - Source : Barème algérien 1967

**IPP Final** : 28%

---

### Exemple 3 : Syndrome post-commotionnel avec épilepsie

**Description** : "Traumatisme crânien avec céphalées chroniques et crises épileptiques mensuelles"

**Recherche IA** :
1. ❌ Non trouvé dans Barème Algérien 1967 (séquelles neurologiques complexes)
2. ✅ Trouvé dans **Barème MAYET & REY (Complément)**
   - Rubrique 1 : "Céphalées post-traumatiques chroniques" [5-20%]
   - Rubrique 2 : "Crises convulsives - une fois par mois" [10-20%]
   - Source : Barème MAYET & REY (complément législation algérienne)

**IPP Final** : 15-35% (selon Article 12 - cumul des séquelles)

---

## 🎯 CAS PARTICULIER : FRACTURE FÉMUR

### ⚠️ Différence entre les deux barèmes

#### Barème Algérien 1967 :
```
Raccourcissement de 4 cm = 8% (taux fixe)
+ Possibilité d'ajouter séquelles fonctionnelles séparément
```

#### Barème MAYET & REY (ancien système) :
```
Fracture diaphysaire fémur = [10-30%] (fourchette large)
Inclut raccourcissement + séquelles fonctionnelles
```

### ✅ Application correcte (Version 2.8) :

**CAS** : Fracture fémur + raccourcissement 4 cm + atrophie musculaire + marche compensée

**Évaluation selon Barème Algérien 1967** :
1. Raccourcissement 4 cm : **8%**
2. Atrophie musculaire + trouble statique : Consulter **Article 12** pour cumul

**Méthode de cumul (Article 12 - Code sécurité sociale)** :
```
IPP globale = IPP1 + IPP2 × (100 - IPP1) / 100
```

**Exemple calcul** :
- IPP1 (raccourcissement) = 8%
- IPP2 (raideur hanche modérée) = 20%
- IPP globale = 8 + 20 × (100 - 8) / 100
- IPP globale = 8 + 20 × 0.92
- **IPP globale = 26.4% ≈ 26-27%**

---

## 📝 MENTIONS DANS LES JUSTIFICATIONS

### Si référence Barème Algérien 1967 :
```
"Selon le barème officiel algérien 1967 (législation nationale), 
le raccourcissement de 4 cm correspond à un taux de 8%."
```

### Si référence Barème MAYET & REY :
```
"En complément du barème algérien 1967, et selon le barème 
médico-légal MAYET & REY (reconnu internationalement), 
les séquelles neurologiques complexes sont évaluées à [X%]."
```

---

## 🔄 MIGRATION DES ANCIENNES ÉVALUATIONS

Les évaluations faites AVANT la version 2.8 utilisaient uniquement le barème MAYET & REY.

**Impact** :
- ✅ Pas de changement pour séquelles neurologiques/crâniennes
- ⚠️ **Changement possible** pour membres et rachis (barème 1967 peut donner taux différents)
- ✅ Nouvelle évaluation **plus conforme** à la législation algérienne

**Recommandation** :
- Réévaluer les cas de **membres et rachis** avec le nouveau système
- Conserver les évaluations **neurologiques** (déjà conformes)

---

## ✅ AVANTAGES DE LA NOUVELLE STRUCTURE

1. **Conformité légale** : Application du barème officiel algérien en priorité
2. **Complétude** : Couverture de toutes les séquelles (1967 + MAYET & REY)
3. **Transparence** : Mention explicite de la source barémique utilisée
4. **Justesse** : Taux plus précis et conformes à la législation nationale

---

## 📚 RÉFÉRENCES JURIDIQUES

- **Arrêté du 5 janvier 1967** : Barème IPP Algérie (référence principale)
- **Loi 83-13** : Accidents du travail et maladies professionnelles
- **Article 12** : Méthode de cumul des incapacités (capacité restante)
- **Barème MAYET & REY** : Référence internationale complémentaire

---

**Version** : 2.8  
**Date** : 6 novembre 2025  
**Statut** : ✅ En production
