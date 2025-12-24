# 🧪 Tests NGAP - Cas d'utilisation

## Test 1 : Recherche Sémantique

### Tests de recherche par nom
```
Recherche : "FNS"
Résultat attendu : B30 (Formule Numération Sanguine)

Recherche : "consultation"
Résultats attendus : C, CS

Recherche : "injection"
Résultats attendus : K2, AMI2

Recherche : "kiné"
Résultats attendus : AMM5, AMM10
```

### Tests de recherche par code
```
Recherche : "B30"
Résultat attendu : B30 (FNS)

Recherche : "B 30"
Résultat attendu : B30 (FNS)

Recherche : "K20"
Résultat attendu : K20 (Acte chirurgical)
```

## Test 2 : Calcul Simple (1 acte)

### Cas 1 : Un seul acte
```
Expression : B30
Résultat attendu :
  - B30 : 9 000 DA (100%)
  - Total : 9 000 DA
```

### Cas 2 : Consultation simple
```
Expression : C
Résultat attendu :
  - C : 2 500 DA (100%)
  - Total : 2 500 DA
```

## Test 3 : Calcul avec Cumul (2 actes)

### Cas 1 : Consultation + Biologie
```
Expression : C + B30
Résultat attendu :
  - B30 : 9 000 DA (100%) ← plus cher en premier
  - C : 1 250 DA (50%)
  - Total brut : 11 500 DA
  - Total net : 10 250 DA
  - Réduction : 1 250 DA
```

### Cas 2 : Visite + Injection
```
Expression : VS + K2
Résultat attendu :
  - VS : 3 500 DA (100%)
  - K2 : 800 DA (50%)
  - Total brut : 5 100 DA
  - Total net : 4 300 DA
```

### Cas 3 : Deux actes de biologie
```
Expression : B30 + B40
Résultat attendu :
  - B40 : 12 000 DA (100%) ← plus cher
  - B30 : 4 500 DA (50%)
  - Total brut : 21 000 DA
  - Total net : 16 500 DA
```

## Test 4 : Calcul Multiple (3+ actes)

### Cas 1 : Consultation + Biologie multiple
```
Expression : C + B30 + B40
Résultat attendu :
  - B40 : 12 000 DA (100%)
  - B30 : 4 500 DA (50%)
  - C : 0 DA (non cumulable)
  - Total brut : 21 500 DA
  - Total net : 16 500 DA
```

### Cas 2 : Visite + Soins + Radio
```
Expression : VS + K2 + R10
Résultat attendu :
  - R10 : 10 000 DA (100%)
  - VS : 1 750 DA (50%)
  - K2 : 0 DA (non cumulable)
  - Total brut : 15 100 DA
  - Total net : 11 750 DA
```

### Cas 3 : Bilan biologique complet
```
Expression : B30 + B40 + B50
Résultat attendu :
  - B50 : 15 000 DA (100%)
  - B40 : 6 000 DA (50%)
  - B30 : 0 DA (non cumulable)
  - Total brut : 36 000 DA
  - Total net : 21 000 DA
```

## Test 5 : Actes Chirurgicaux

### Cas 1 : Chirurgie simple
```
Expression : K20
Résultat attendu :
  - K20 : 16 000 DA (100%)
  - Total : 16 000 DA
```

### Cas 2 : Chirurgie avec consultation
```
Expression : K50 + CS
Résultat attendu :
  - K50 : 40 000 DA (100%)
  - CS : 1 500 DA (50%)
  - Total brut : 43 000 DA
  - Total net : 41 500 DA
```

## Test 6 : Cas Réels Complexes

### Cas 1 : Patient diabétique (consultation + analyses)
```
Expression : C + B30 + B10
Résultat attendu :
  - B30 : 9 000 DA (100%)
  - C : 1 250 DA (50%)
  - B10 : 0 DA (non cumulable)
  - Total net : 10 250 DA

Explication : FNS + consultation + glycémie
```

### Cas 2 : Post-opératoire (visite + soins + radio)
```
Expression : VS + K2 + R10 + AMI2
Résultat attendu :
  - R10 : 10 000 DA (100%)
  - VS : 1 750 DA (50%)
  - K2 : 0 DA (non cumulable)
  - AMI2 : 0 DA (non cumulable)
  - Total net : 11 750 DA
```

### Cas 3 : Rééducation (kiné multiple)
```
Expression : AMM5 + AMM5 + AMM5
Résultat attendu :
  - AMM5 × 3 : 2 000 DA (100%) [quantité = 3]
  - Total : 6 000 DA

Note : Même acte répété = quantité
```

## Test 7 : Validation des règles

### Règle 1 : L'acte le plus cher est toujours à 100%
```
Expression : K2 + K50
Attendu : K50 en premier (100%), puis K2 (50%)

Expression : B10 + B50
Attendu : B50 en premier (100%), puis B10 (50%)
```

### Règle 2 : Maximum 2 actes cumulables
```
Expression : C + K10 + R10 + B30
Attendu : Seuls les 2 premiers (les plus chers) sont payés
```

### Règle 3 : Quantités additionnées pour le même acte
```
Expression : B30 + B30 + B30
Attendu : B30 × 3 quantités (pas 3 actes séparés)
```

## Test 8 : Cas d'Erreur

### Cas 1 : Code invalide
```
Expression : XYZ123
Résultat attendu : ⚠️ Aucun acte valide trouvé
```

### Cas 2 : Expression vide
```
Expression : [vide]
Résultat attendu : ⚠️ Veuillez entrer une expression
```

### Cas 3 : Syntaxe incorrecte
```
Expression : B30 ++ K20
Résultat attendu : Parser les codes valides (B30, K20)
```

## Résumé des Résultats Attendus

| Test | Expression | Total Net | Statut |
|------|-----------|-----------|--------|
| Simple | B30 | 9 000 DA | ✅ |
| Cumul 2 | C + B30 | 10 250 DA | ✅ |
| Cumul 3 | C + B30 + B40 | 16 500 DA | ✅ |
| Chirurgie | K50 + CS | 41 500 DA | ✅ |
| Complexe | VS + K2 + R10 | 11 750 DA | ✅ |

---

**Tests à exécuter** : Vérifier que tous les cas donnent les résultats attendus
**Version** : 1.0
**Date** : Décembre 2025
