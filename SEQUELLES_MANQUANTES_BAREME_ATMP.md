# 📋 SÉQUELLES MANQUANTES DU BARÈME AT MP (Accidents du Travail et Maladies Professionnelles)

## 🔍 Source analysée
**Fichier extrait** : `extracted_bareme/ipp_word_full_text.txt` (7782 lignes)
**Barème** : Guide-Barème des Accidents du Travail - Pratique algérienne (Mayet & Rey)

---

## ✅ CE QUI EST DÉJÀ DANS VOTRE BASE

D'après l'analyse de vos fichiers (`algerianBareme1967.ts`, `mayetReyComplement.ts`, `disabilityRates.ts`) :

### Présent dans la base actuelle :
- ✅ **Membres supérieurs** : Amputations, épaule, coude, poignet, main, doigts (~200 lésions)
- ✅ **Membres inférieurs** : Hanche, genou, cheville, pied (~150 lésions)
- ✅ **Rachis** : Cervical, dorso-lombaire, hernies discales, lombalgies (~50 lésions)
- ✅ **Crâne et encéphale** : Traumatismes crâniens, syndrome post-commotionnel (~30 lésions)
- ✅ **Nerfs périphériques** : Paralysies nerveuses (~40 lésions)
- ✅ **Psychiatrie** : Névroses, psychoses post-traumatiques (~20 lésions)

---

## 🔴 SÉQUELLES MANQUANTES - PRIORITÉ HAUTE

### 👁️ **YEUX - VISION** (100% absent)

**Extrait du barème ligne 1691-2000** :

#### 1. Cécité et quasi-cécité
- Cécité complète : **100%**
- Quasi-cécité (vision ≤ 1/20 des deux yeux) : **100%**

#### 2. Perte de vision d'un œil
- Perte de vision sans difformité : **25-30%**
- Ablation/altération du globe avec prothèse : **28-33%**
- Sans prothèse possible : **35-40%**

#### 3. Diminution de la vision des deux yeux
**Tableau d'évaluation complet (Décret du 5 Juillet 1930)** :
```
Vision œil 1 | Vision œil 2 | IPP (%)
10/10        | 10/10        | 0
10/10        | 5/10         | 4-7
10/10        | 1/10         | 19-22
7/10         | 7/10         | 2-3
5/10         | 5/10         | 18-21
3/10         | 3/10         | 30-35
1/10         | 1/10         | 70-80
< 1/20       | < 1/20       | 100
Énucléation  | Normal       | 35-40
```

#### 4. Vision périphérique - Champ visuel
- Rétrécissement concentrique à 30° (un œil) : **3-5%**
- Rétrécissement concentrique à 30° (deux yeux) : **5-20%**
- Rétrécissement < 10° (un œil) : **10-15%**
- Rétrécissement < 10° (deux yeux) : **70-80%**

#### 5. Scotomes centraux
- Un seul œil : **15-30%**
- Les deux yeux : **40-100%**

#### 6. Hémianopsie
- Hémianopsie homonyme (droite/gauche) : **30-35%**
- Hémianopsie hétéronyme nasale : **10-15%**
- Hémianopsie hétéronyme bitemporale : **70-80%**
- Hémianopsie horizontale supérieure : **10-15%**
- Hémianopsie horizontale inférieure : **30-50%**
- Hémianopsie en quadrant supérieur : **7-10%**
- Hémianopsie en quadrant inférieur : **20-25%**

#### 7. Diplopie
- Diplopie permanente : **5-20%**
- Diplopie dans partie inférieure du champ : **10-25%**

#### 8. Cataractes opérées (aphakie)
- Aphakie unilatérale avec correction : **15% + baisse acuité**
- Aphakie bilatérale : **35% + baisse acuité** (max 100%)

#### 9. Ptosis
- Un œil : **5-25%**
- Les deux yeux : **20-70%**

#### 10. Taies de cornée
- Selon acuité visuelle + **taux complémentaire** si :
  - Taie centrale avec rétrécissement pupillaire
  - Éblouissement gênant l'œil opposé

#### 11. Paupières et orbite
- Entropion, ectropion, symblépharon : **5-20%**
- Lagophtalmie : **10%** à ajouter aux troubles visuels
- Larmoiement bilatéral : **5-10%**
- Fistules lacrymales (chaque œil) : **5-10%**

---

### 👂 **OREILLES - AUDITION** (100% absent)

**Extrait du barème ligne 2328-2570** :

#### 1. Surdité unilatérale
- Surdité faible : **0-3%**
- Surdité moyenne : **10-15%**
- Surdité absolue : **20%**

#### 2. Surdité bilatérale
- Surdité faible : **5-20%**
- Surdité moyenne : **25-35%**
- Surdité forte : **40-50%**
- Surdité absolue (pratiquement totale) : **70%**

#### 3. Tableau d'évaluation selon acouphonie
**Table de Pythagore (V.H. = Voix Haute, V.C. = Voix Chuchotée)** :

```
Oreille la plus sourde | Oreille la moins sourde | IPP (%)
----------------------|-------------------------|--------
V.H. normale          | V.H. normale            | 0
V.H. 5m               | V.H. normale            | 3
V.H. 2-4m             | V.H. normale            | 5
V.H. 1-2m             | V.H. normale            | 8
V.H. < 1m             | V.H. normale            | 12
Non perçue            | V.H. normale            | 15
V.H. 2-4m             | V.H. 2-4m               | 15
V.H. 1-2m             | V.H. 1-2m               | 25
Non perçue            | Non perçue              | 70
```

#### 4. Bourdonnements (acouphènes)
- Bourdonnements violents gênant le sommeil : **5-10%**
  *(s'ajoute par simple addition à la surdité)*

#### 5. Vertiges et troubles de l'équilibre
- Vertiges légers sans signes objectifs : **5-10%**
- Hyperexcitabilité vestibulaire : **10-20%**
- Troubles vestibulaires objectifs + réflexes déficitaires : **20-40%**

#### 6. Otorrhée chronique
- Otorrhée tubaire unilatérale : **1-5%**
- Otorrhée tubaire bilatérale : **1-8%**
- Otite suppurée chronique avec ostéite (unilatérale) : **5-10%**
- Otite suppurée chronique avec ostéite (bilatérale) : **8-15%**

#### 7. Sténose du conduit auditif externe
- Sténose unilatérale : **1-5%**
- Sténose bilatérale : **1-10%**

#### 8. Mutilations du pavillon
- Perte d'un pavillon : **2%**
- Perte des deux pavillons : **6%**

---

### 🫁 **THORAX ET APPAREIL RESPIRATOIRE** (Partiellement absent)

**Extrait du barème ligne 2328-2570** :

#### 1. Sternum
- Fracture simple du sternum : **3-10%**
- Fracture avec enfoncement + douleurs : **10-20%**

#### 2. Côtes
- Fractures de côtes sans séquelles : **0%**
- Fractures uni/pluricostales avec séquelles douloureuses : **2-6%**
- Fractures avec névralgies intercostales : **2-10%**
- Fracas thoracique avec déformations : **30-70%**
- Pseudarthrose costale : **2-10%**
- Hernie pulmonaire isolée : **20-40%**

#### 3. Plèvres
- Pleurésie traumatique avec déformations : **5-30%**
- Hémothorax avec adhérences : **5-30%**
- Pyothorax guéri : **10-50%**
- Pyothorax avec fistule persistante : **10-80%**

#### 4. Poumons
- Pneumonie traumatique (séquelles) : **5%** (moyenne)
- Tuberculose post-traumatique : **10-100%**
- Aggravation TB préexistante : **10-90%**
- Bronchite chronique aggravée : **5-20%**
- Insuffisance respiratoire grave : **50-80%**
- Rupture trachéo-bronchique sans obstruction : **0-30%**
- Rupture avec obstruction bronche lobaire : **20-30%**
- Rupture avec obstruction bronche souche : **40-50%**
- Lobectomie non compliquée : **20-30%**
- Lobectomie compliquée : **20-80%**
- Pneumectomie sans complications : **60%**
- Pneumectomie avec complications : **60-100%**

---

### 👃 **NEZ ET APPAREIL RESPIRATOIRE SUPÉRIEUR** (Partiellement absent)

**Extrait du barème ligne 2625-2670** :

#### 1. Sténoses nasales
- Sténose unilatérale simple : **0-3%**
- Sténose unilatérale avec rhinopharyngite : **3-6%**
- Sténose totale avec catarrhe tubo-tympanique : **6-10%**
- Sténose bilatérale légère : **5-8%**
- Sténose bilatérale accentuée : **8-12%**
- Sténose serrée (respiration buccale exclusive) : **12-20%**

#### 2. Troubles olfactifs
- Anosmie : **5-10%**
  *(Plus élevé pour professions spécialisées : parfumeurs, cuisiniers, fleuristes)*

---

### 😬 **MAXILLAIRES ET DENTS** (Partiellement présent)

**Extrait du barème ligne 1467-1590** :

#### 1. Maxillaire supérieur
- Perte des deux maxillaires supérieurs : **90-100%**
- Perte d'un maxillaire avec communication bucco-nasale : **50-60%**
- Consolidation vicieuse avec grande mobilité : **60-80%**
- Consolidation vicieuse avec mobilité fragment : **20-50%**
- Perte de substance voûte palatine : **10-20%**
- Perte substance avec communication bucco-nasale large : **30-60%**

#### 2. Maxillaire inférieur
- Vaste perte de substance avec pseudarthrose lâche : **60-85%**
- Pseudarthrose serrée branche ascendante : **0-5%**
- Pseudarthrose lâche branche ascendante : **10-15%**
- Pseudarthrose serrée région symphysaire : **10-15%**
- Pseudarthrose lâche région symphysaire : **15-25%**

#### 3. Articulation temporo-maxillaire
- Ankylose osseuse (passage liquides seulement) : **80-90%**
- Luxation irréductible : **10-50%**
- Luxation récidivante : **5-20%**

#### 4. Constriction des mâchoires
- Écartement < 10mm : **20-80%**
- Écartement 10-30mm : **5-20%**
- Troubles surajoutés (brides cicatricielles) : **+10-20%**

#### 5. Dents
- Perte de 1-2 dents : **0%**
- Perte de plus de 2 dents (coefficient par dent) :
  - Incisive/canine : **1**
  - Prémolaire : **1,25**
  - Molaire : **1,50**
  - **Taux réduit des 2/3 si prothèse correcte**

#### 6. Joues, langue, pharynx
- Délabrement joues avec troubles fonctionnels : **25-50%**
- Amputation partielle langue : **10-20%**
- Amputation étendue langue : **35-75%**
- Amputation totale langue : **80%**
- Paralysie langue incomplète : **15%**
- Paralysie langue complète : **50%**
- Fistule salivaire : **20%**
- Rétrécissement oro-pharynx : **5-35%** (moyenne 20%)

---

## 🟠 SÉQUELLES MANQUANTES - PRIORITÉ MOYENNE

### 🫃 **ABDOMEN ET APPAREIL DIGESTIF** (Absent du barème extrait visible)

#### Lésions probables du barème (non extraites dans le fichier) :
- Hernies abdominales post-traumatiques
- Éventrations
- Stomies (colostomie, iléostomie)
- Splénectomie
- Séquelles hépatiques
- Syndrome du grêle court
- Fistules digestives

---

### 🩺 **APPAREIL URO-GÉNITAL** (Mentionné mais non détaillé)

**Référencé ligne 1228** : *"Rétention et incontinence d'urine (se reporter au chapitre — Appareil génito-urinaire, p. 171)"*

#### Lésions probables du barème (non extraites) :
- Incontinence urinaire (échelle)
- Néphrectomie unilatérale
- Insuffisance rénale post-traumatique
- Troubles génitaux masculins/féminins
- Lésions testiculaires/ovariennes

---

### 🫀 **APPAREIL CIRCULATOIRE** (Mentionné mais non détaillé)

**Référencé ligne 2336-2342** : *"Avec lésions profondes du cœur, des vaisseaux"*

#### Lésions probables du barème (non extraites) :
- Péricardite post-traumatique
- Troubles du rythme cardiaque
- Thrombose veineuse profonde séquellaire
- Syndrome post-phlébitique
- Varices post-traumatiques
- Lymphœdème post-traumatique
- Anévrisme artériel
- Artériopathie post-traumatique

---

### 🩹 **PEAU ET CICATRICES** (Non trouvé)

#### Lésions probables du barème :
- Brûlures étendues (% surface corporelle)
- Cicatrices hypertrophiques chéloïdes
- Greffes cutanées étendues
- Cicatrices disgracieuses du visage
- Troubles de la pigmentation étendus

---

## 📊 RÉSUMÉ STATISTIQUE

### Séquelles identifiées dans le barème extrait :
- **Total lignes analysées** : 7 782 lignes
- **Sections identifiées** : 15 grandes catégories

### Séquelles manquantes prioritaires :

| Catégorie | Nombre estimé | Présence actuelle | Priorité |
|-----------|---------------|-------------------|----------|
| **Vision (Yeux)** | ~80 séquelles | ❌ 0% | 🔴 HAUTE |
| **Audition (Oreilles)** | ~30 séquelles | ❌ 0% | 🔴 HAUTE |
| **Thorax/Respiratoire** | ~40 séquelles | 🟡 20% | 🟠 MOYENNE |
| **Maxillaires/Dents** | ~35 séquelles | 🟡 40% | 🟠 MOYENNE |
| **Nez/ORL** | ~15 séquelles | 🟡 30% | 🟠 MOYENNE |
| **Appareil digestif** | ~20 séquelles | ❌ 0% | 🟠 MOYENNE |
| **Appareil uro-génital** | ~15 séquelles | ❌ 0% | 🟠 MOYENNE |
| **Appareil circulatoire** | ~15 séquelles | ❌ 0% | 🟠 MOYENNE |
| **Peau/Cicatrices** | ~10 séquelles | ❌ 0% | 🟢 BASSE |

---

## 🎯 RECOMMANDATIONS

### Actions immédiates :
1. **Intégrer VISION (Yeux)** → ~80 nouvelles séquelles + tableau d'évaluation croisé acuité visuelle
2. **Intégrer AUDITION (Oreilles)** → ~30 nouvelles séquelles + table de Pythagore
3. **Compléter THORAX/RESPIRATOIRE** → ~30 séquelles supplémentaires

### Actions à moyen terme :
4. Extraire les sections manquantes du barème AT MP (pages non présentes dans le fichier txt)
5. Intégrer Appareil digestif, uro-génital, circulatoire (~50 séquelles)
6. Ajouter Peau/Cicatrices (~10 séquelles)

### Note technique :
Le fichier `ipp_word_full_text.txt` contient **7 782 lignes** mais certaines sections sont **incomplètes ou non extraites**. Il faudrait :
- Vérifier le PDF source complet
- Extraire les pages manquantes (Abdomen p.172+, Appareil uro-génital p.180+, Circulatoire p.170+)
- Compléter avec ces données

---

## 📁 FICHIERS À CONSULTER

Pour extraction complète :
- ✅ `extracted_bareme/ipp_word_full_text.txt` (déjà analysé)
- ✅ `extracted_bareme/ipp_word_tables.txt` (tableaux d'évaluation)
- ⚠️ `bareme_extracted.txt` (extraction incomplète - beaucoup de pages vides)
- ❓ PDF source original du barème AT MP (à localiser)

---

**Date du rapport** : 25 décembre 2025  
**Analyse basée sur** : Barème Mayet & Rey + Pratique algérienne (Guide des Accidents du Travail)
