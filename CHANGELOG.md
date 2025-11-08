# Changelog - Guide du Médecin Conseil

Toutes les modifications notables de ce projet sont documentées dans ce fichier.

## [V3.3.26] - 2025-11-08

### 🐛 Correction détection anatomique - Pouteau-Colles

#### Problème identifié
- **Symptôme** : "Fracture de Pouteau-Colles du poignet" → Le système proposait des fractures de **clavicule** (épaule) au lieu de **radius** (poignet)
- **Cause** : Pouteau-Colles est un terme médical spécifique non détecté, recherche sémantique générique confondait les régions anatomiques
- **Impact** : Erreur grave de diagnostic anatomique, IPP totalement inapproprié

#### Solution implémentée
- Ajout expert rule priority 1005 pour détecter "Pouteau-Colles"
- Mapping direct vers "Fracture extrémité inférieure radius"
- Prise en compte main dominante/non dominante
- Filtrage selon séquelles (limitation simple vs raideur+troubles nerveux)

#### Résultat
```
✅ "Fracture Pouteau-Colles poignet droit (main dominante) avec raideur"
   → Fracture extrémité inférieure radius - Avec limitation mouvements (Main Dominante)
   → IPP: 8-15% (au lieu de clavicule 2-3%)
```

### 📁 Nouveaux fichiers (Tests automatiques)
- `TEST_10_CAS_ENTRAINEMENT.md` - 10 cas cliniques variés pour validation
- `TEST_10_CAS_RESULTATS.md` - Template résultats de test
- `GUIDE_RAPIDE_10_CAS.md` - Guide copier-coller des 10 cas
- `test-10-cas.cjs` - Script génération automatique

### 🔧 Fichiers modifiés
- `components/AiAnalyzer.tsx` (ligne ~3695) - Ajout règle Pouteau-Colles

### 🚀 URL Production
https://guide-medecin-conseil-orquf16so-bhk222s-projects.vercel.app

---

## [V3.3.25] - 2025-11-08

### 🐛 Corrections critiques - Fractures

#### 1. Boucle infinie lors de sélection d'option spécifique
- **Symptôme** : Sélection d'une option (ex: "Double, cals saillants...") → Le système redemandait la même question
- **Solution** : Ajout détection d'entrée barème spécifique (90%+ similarité de mots)
- **Impact** : Toutes les fractures avec entrées barème spécifiques

#### 2. Filtrage intelligent des options
- **Symptôme** : "FRACTURE CLAVICULE GAUCHE PAS DE RAIDEUR" → Affichait TOUTES les options (8 choix)
- **Attendu** : Afficher seulement les 2 options pertinentes (Main Dominante/Non Dominante sans raideur)
- **Solution** : 
  - Détection "pas de raideur" / "sans raideur" → Filtre automatiquement
  - Exclusion des entrées avec "cal saillant", "raideur", "compression", "double", "difforme"
  - Retour de `filteredFractures` au lieu de `uniqueFractures`
- **Résultat** : Utilisateur voit seulement les options cohérentes avec sa description

### 📊 Cas testés

```
✅ "FRACTURE CLAVICULE SANS SEQUELLES" → IPP 0%
✅ "FRACTURE CLAVICULE GAUCHE" → 8 choix (normal, description générale)
✅ "FRACTURE CLAVICULE GAUCHE PAS DE RAIDEUR" → 2 choix (Main D/ND sans raideur)
✅ "Fracture Clavicule - Double, cals..." → Traitement direct (pas de boucle)
```

### 🔧 Fichiers modifiés
- `components/AiAnalyzer.tsx` :
  - Ligne ~4918 : Détection entrée barème spécifique
  - Ligne ~4955 : Filtrage "pas de raideur"
  - Ligne ~5010 : Retour de filteredFractures

### 📁 Nouveaux fichiers
- `CORRECTION_BOUCLE_CLAVICULE_V3.3.25.md` - Documentation technique

### � URL Production
https://guide-medecin-conseil-dbslb710q-bhk222s-projects.vercel.app

---

## [V3.3.24] - 2025-11-08

### ✨ Nouvelles fonctionnalités

#### Historique des calculs IPP
- Ajout d'un bouton "Historique" dans **IA Exclusive** et **Guide IA**
- Modal d'affichage de l'historique avec interface moderne
- Sauvegarde automatique de tous les calculs IPP
- Stockage local persistant (LocalStorage)
- Séparation des historiques par type de calculateur
- Limite de 100 entrées maximum par type
- Suppression individuelle ou en masse des entrées
- Affichage détaillé des calculs avec :
  - Date et heure
  - Informations victime (âge, profession)
  - Liste des lésions évaluées
  - IPP total

### 📁 Nouveaux fichiers
- `components/HistoryModal.tsx` - Composant modal d'historique
- `HISTORIQUE_IPP_FEATURE.md` - Documentation de la fonctionnalité

### 🔧 Fichiers modifiés
- `components/ExclusiveAiCalculator.tsx` - Intégration historique
- `components/GuidedCalculator.tsx` - Intégration historique

### 🎨 Design
- Icône horloge pour identifier le bouton historique
- Interface responsive avec grid 2 colonnes
- Animations fade-in
- Scrollbar personnalisée

---

## [V3.3.23] - 2025-11-08

### 🐛 Corrections critiques

#### Bug cataracte - Architecture réparée
- **Problème** : Cataracte IPP toujours 55% quelle que soit l'acuité visuelle
- **Cause** : Code CAS 2c inaccessible (uniquement dans expert rules, court-circuité par negativeContext)
- **Solution** : Logique déplacée dans flux sémantique principal après `finalCandidate`
- **Résultats** :
  - OD 7/10 OG 10/10 : 55% → **10%** ✅
  - OD 9/10 OG 10/10 : 55% → **10%** ✅
  - OD 2/10 OG 2/10 : 55% → **100%** ✅

### 📝 Justifications enrichies
- Affichage des acuités mesurées (OD + OG)
- Œil le plus/moins atteint
- Critères barème appliqués
- Impact fonctionnel détaillé

---

## [V3.3.20-V3.3.22] - 2025-11-07

### 🚧 Tentatives de correction (partiellement défaillantes)

#### V3.3.20
- Ajout vérification obligatoire acuité visuelle pour cataracte
- Rejet avec message d'erreur si données manquantes ✅

#### V3.3.21
- Ajout code CAS 2c extraction acuités OD/OG
- Calcul severity basé sur worstEye/bestEye
- **Problème** : Code non exécuté (architecture)

#### V3.3.22
- Amélioration condition bestEye ≥0.8 ET worstEye ≥0.5 → FAIBLE
- **Problème persistant** : Code toujours inaccessible

---

## [V3.3.17-V3.3.19] - 2025-11-06

### ✅ Brûlures visage - Détection correcte

#### V3.3.17
- Détection brûlures faciales (éviter confusion avec whiplash cervical)
- Expert rule priority 998 pour "brûlure" + "visage/cou/face"

#### V3.3.18
- Calcul severity basé sur 8 critères :
  - 3e degré, défigurant, greffe, nécrose
  - Surface corporelle, trouble anxieux, PTSD, dépression

#### V3.3.19
- Affichage trauma psychologique dans section éléments cliniques
- Variable `hasTroublePsychologique` dans justification

---

## [V3.3.11-V3.3.16] - 2025-11-05

### ✅ Plexus brachial - Détection Duchenne-Erb

#### V3.3.11
- Enrichissement descriptions barème avec termes médicaux
- "Paralysie radiculaire supérieure (Duchenne-Erb C5-C6)"

#### V3.3.12
- Preprocessing transformation "tronc supérieur" → "Duchenne-Erb C5-C6"
- Éviter détection erronée de paralysie complète (70-80%)

#### V3.3.13-V3.3.14
- Correction expert rules recherche mots-clés
- Bug : recherchait texte original au lieu de preprocessed

#### V3.3.15
- Fix : recherche sur texte preprocessed ("Duchenne-Erb" au lieu de "tronc supérieur")

#### V3.3.16
- Ajout variants (droite)/(gauche) dans searchTerms
- Matching exact avec latéralité

---

## [V3.3.7-V3.3.10] - 2025-11-04

### ✅ Amputations - IPP anatomique correct

#### V3.3.7
- Détection amputation ne doit pas augmenter IPP avec "marche difficile"
- Pour amputation, marche difficile = conséquence normale

#### V3.3.8-V3.3.9
- Ajout logique niveau anatomique :
  - Tiers supérieur jambe : 55%
  - Tiers moyen jambe : 60%
  - Cuisse : 70-80%

#### V3.3.10
- Entrées barème granulaires amputation membres inférieurs
- Nettoyage entrée générique pour éviter conflits

---

## [V3.3.0-V3.3.6] - 2025-11-01 à 2025-11-03

### 🎯 Fonctionnalités majeures antérieures

- Système expert rules (priority 10000 → 95)
- Preprocessing médical (termes colloquiaux → médicaux)
- Recherche sémantique fallback
- Détermination severity (CAS 1, 2, 3)
- Formule Balthazard pour cumul lésions
- Extraction temporalité et intensité
- Amplitudes articulaires (ROM)
- Attribution vs révision IPP
- 45/45 validation (100.0%)

---

## [V2.0-V3.0] - 2025-10-15 à 2025-10-31

### 🏗️ Refonte architecture

- Migration React/TypeScript PWA
- Barème CNAS Algérie intégré
- Calculateur IA Exclusive (Dr. Hakim)
- Calculateur Guide IA (formulaire)
- Système justifications détaillées
- Validation automatique
- Export PDF

---

## [V1.0] - 2025-10-01

### 🚀 Version initiale

- Calculateur basique IPP
- Barème statique
- Interface simple
- Calcul manuel

---

## Statistiques globales

- **Versions totales** : 24+ versions majeures
- **Validation actuelle** : 45/45 (100.0%)
- **Lignes de code** : ~6000 lignes (AiAnalyzer.tsx)
- **Entrées barème** : 2189+ lésions
- **URL Production** : https://guide-medecin-conseil-1xq7d0wo5-bhk222s-projects.vercel.app

---

## Légende

- ✨ Nouvelle fonctionnalité
- 🐛 Correction de bug
- 🔧 Modification technique
- 📝 Documentation
- 🎨 Design/UI
- ⚡ Performance
- 🚧 En développement
- ✅ Fonctionnel
- ❌ Défaillant
