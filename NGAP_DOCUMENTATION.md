# 🏥 Calculateur NGAP - Documentation Complète

## 📋 Vue d'ensemble

Le **Calculateur NGAP** est un outil intelligent pour la Nomenclature Générale des Actes Professionnels qui permet :

1. **Recherche sémantique** : Trouvez un acte par son nom ou sa description
2. **Calcul automatique** : Calculez le total d'une prescription avec règles de cumul
3. **Validation** : Vérification automatique de la conformité aux règles NGAP

## 🎯 Fonctionnalités principales

### 1. Recherche Sémantique

Tapez simplement le nom de l'acte et le système trouve automatiquement le code correspondant :

**Exemples de recherche :**
- `FNS` → trouve **B30** (Formule Numération Sanguine)
- `consultation` → trouve **C** (Consultation généraliste) et **CS** (Consultation spécialiste)
- `injection` → trouve **K2** (Injection intraveineuse), **AMI2** (Injection infirmière)
- `radio thorax` → trouve **R10**, **R20** (Radiographies)
- `kinésithérapie` → trouve **AMM5**, **AMM10** (Séances de kiné)

### 2. Système de Codes

La NGAP utilise un système de **lettres-clés** et **coefficients** :

#### Lettres-clés principales :

| Lettre | Signification | Exemples |
|--------|--------------|----------|
| **C** | Consultation généraliste | C = Consultation au cabinet |
| **CS** | Consultation spécialiste | CS = Consultation spécialiste |
| **V** | Visite à domicile généraliste | V = Visite domicile |
| **VS** | Visite à domicile spécialiste | VS = Visite spécialiste |
| **K** | Actes de chirurgie | K2, K5, K10, K20, K50 |
| **PC** | Pratique courante | PC2, PC5, PC10 |
| **B** | Actes de biologie | B10, B20, B30, B40, B50 |
| **R** | Actes de radiologie | R10, R20, R30 |
| **AMI** | Actes infirmiers | AMI2, AMI5 |
| **AMM** | Kinésithérapie | AMM5, AMM10 |

### 3. Calcul avec Règles de Cumul

Le système applique automatiquement les règles de cumul NGAP :

#### Règles de cumul NGAP :

1. **Premier acte** : 100% du tarif (acte le plus cher)
2. **Deuxième acte** : 50% du tarif (75% dans certains cas spéciaux)
3. **Actes suivants** : Non cumulables (sauf exceptions)

**Exemple de calcul :**

```
Expression : B30 + B40 + K20
```

**Résultat :**
```
1️⃣ K20 (coef 20) = 16 000 DA (100%) ← Acte le plus cher en premier
2️⃣ B40 (coef 40) = 6 000 DA (50%)
❌ B30 (coef 30) = 0 DA (non cumulable)

Total Brut : 28 000 DA
Total Net  : 22 000 DA
```

## 📊 Base de données des actes

La base de données contient les actes les plus courants :

### Consultations et Visites
- **C** : Consultation cabinet généraliste (2 500 DA)
- **CS** : Consultation cabinet spécialiste (3 000 DA)
- **V** : Visite domicile généraliste (3 000 DA)
- **VS** : Visite domicile spécialiste (3 500 DA)

### Actes de Chirurgie (K)
- **K2** : Coefficient 2 - Injection IV (1 600 DA)
- **K5** : Coefficient 5 (4 000 DA)
- **K10** : Coefficient 10 (8 000 DA)
- **K20** : Coefficient 20 (16 000 DA)
- **K50** : Coefficient 50 (40 000 DA)

### Actes de Biologie (B)
- **B10** : Coefficient 10 (3 000 DA)
- **B20** : Coefficient 20 (6 000 DA)
- **B30** : Coefficient 30 - FNS (9 000 DA)
- **B40** : Coefficient 40 (12 000 DA)
- **B50** : Coefficient 50 (15 000 DA)

### Actes de Radiologie (R)
- **R10** : Coefficient 10 (10 000 DA)
- **R20** : Coefficient 20 (20 000 DA)
- **R30** : Coefficient 30 (30 000 DA)

### Actes Infirmiers (AMI)
- **AMI2** : Injection, pansement simple (600 DA)
- **AMI5** : Soins infirmiers (1 500 DA)

### Kinésithérapie (AMM)
- **AMM5** : Séance de kinésithérapie (2 000 DA)
- **AMM10** : Séance complète (4 000 DA)

## 💡 Guide d'utilisation

### Étape 1 : Recherche d'actes

1. Dans la zone "Recherche Sémantique", tapez le nom de l'acte
2. Appuyez sur **Rechercher** ou Entrée
3. Les résultats s'affichent avec code, libellé et tarif
4. Cliquez sur **+** pour ajouter l'acte au calcul

**OU**

Utilisez les filtres par catégorie pour explorer les actes disponibles.

### Étape 2 : Construire l'expression

Dans la zone "Expression de calcul", vous pouvez :

1. **Saisir manuellement** : `B30 + B40 + K20`
2. **Cliquer sur les actes** trouvés pour les ajouter automatiquement
3. **Utiliser les exemples** pré-remplis

### Étape 3 : Calculer

1. Cliquez sur **Calculer**
2. Le système applique automatiquement les règles de cumul
3. Consultez le tableau détaillé avec :
   - Tarif brut de chaque acte
   - Taux appliqué (100%, 50%, 0%)
   - Tarif net après cumul
   - Total final

## 📖 Exemples d'utilisation

### Exemple 1 : Consultation simple avec analyse

**Patient** : Consultation + FNS

**Expression** : `C + B30`

**Résultat** :
```
1️⃣ B30 (9 000 DA) = 9 000 DA (100%)
2️⃣ C (2 500 DA) = 1 250 DA (50%)

Total Net : 10 250 DA
```

### Exemple 2 : Visite avec soins

**Patient** : Visite spécialiste + Injection + Radio

**Expression** : `VS + K2 + R10`

**Résultat** :
```
1️⃣ R10 (10 000 DA) = 10 000 DA (100%)
2️⃣ VS (3 500 DA) = 1 750 DA (50%)
❌ K2 (1 600 DA) = 0 DA (non cumulable)

Total Net : 11 750 DA
```

### Exemple 3 : Bilan biologique complet

**Patient** : FNS + Glycémie + Créatinine

**Expression** : `B30 + B10 + B10`

**Résultat** :
```
1️⃣ B30 (9 000 DA) = 9 000 DA (100%)
2️⃣ B10 (3 000 DA) = 1 500 DA (50%)
❌ B10 (3 000 DA) = 0 DA (non cumulable)

Total Net : 10 500 DA
```

## 🔧 Fonctionnalités avancées

### Filtrage par catégorie

Cliquez sur une catégorie pour afficher uniquement les actes de ce type :
- Consultation
- Visite
- Chirurgie
- Biologie
- Radiologie
- Soins Infirmiers
- Kinésithérapie

### Recherche intelligente

Le système comprend :
- Les **codes exacts** : B30, K20
- Les **noms complets** : Formule numération sanguine
- Les **abréviations** : FNS, NFS
- Les **synonymes** : Hémogramme pour FNS

### Gestion des quantités

Si vous ajoutez plusieurs fois le même acte, les quantités s'additionnent automatiquement.

## ⚠️ Notes importantes

### Règles de cumul détaillées

Les règles de cumul varient selon les situations :

1. **Acte unique** : Remboursement à 100%
2. **Actes multiples** : 
   - Le plus cher à 100%
   - Le 2ème à 50% (ou 75% pour lésions traumatiques multiples)
   - Les suivants non cumulables

3. **Exceptions** :
   - Consultations et actes techniques ne se cumulent pas (sauf exceptions)
   - Actes de biologie : cumul plafonné
   - Actes d'anesthésie : règles spéciales

### Tarifs indicatifs

⚠️ **Important** : Les tarifs affichés sont indicatifs et basés sur la NGAP en vigueur. 
Les tarifs réels peuvent varier selon :
- Les conventions avec la CNAS
- Les mises à jour réglementaires
- Les spécificités régionales

### Validation médicale

Cet outil est une aide au calcul. Seul un médecin conseil agréé peut :
- Valider la pertinence des actes prescrits
- Appliquer les règles spécifiques à chaque cas
- Établir une tarification officielle

## 🚀 Évolutions futures

- [ ] Ajout de tous les actes de la NGAP complète
- [ ] Import depuis fichier PDF officiel
- [ ] Règles de cumul avancées (lésions multiples, etc.)
- [ ] Export des calculs en PDF
- [ ] Historique des prescriptions
- [ ] Intégration avec le dossier médical

## 📞 Support

Pour toute question ou suggestion d'amélioration, contactez l'équipe de développement.

---

**Version** : 1.0  
**Dernière mise à jour** : Décembre 2025  
**Base de données** : 25+ actes courants
