# 📚 Nomenclature Générale - Documentation

## Vue d'ensemble

La rubrique **Nomenclature Générale** permet d'effectuer des recherches sémantiques dans les documents de référence médico-légaux et d'effectuer des calculs automatiques selon les règles et lois en vigueur.

## Fonctionnalités

### 1. Recherche Sémantique Multi-Sources

L'outil permet de rechercher dans trois bases de données différentes :

- **📖 Barème Indicatif** : Barème d'évaluation des IPP
- **⚖️ Barème AT-MP** : Règles spécifiques aux accidents du travail et maladies professionnelles
- **🏥 Manuel Appareillage** : Guide des appareillages CNAS

### 2. Règles Disponibles

#### Règles de Cumul et Calcul

1. **Article 12 - Incapacité Préexistante**
   - Calcul de l'IPP imputable au nouvel accident en présence d'une incapacité antérieure
   - Formule : `IPP = ((C1 - C2) / C1) × 100`
   - Variables : taux antérieur, taux global

2. **Formule de Balthazard - Cumul des IPP**
   - Cumul de plusieurs lésions d'un même accident
   - Formule : `IPP_totale = IPP1 + ((100 - IPP1) × IPP2 / 100)`
   - Support de 2 ou 3 lésions simultanées

3. **Calcul de la Capacité Restante**
   - Détermine la capacité fonctionnelle résiduelle
   - Formule : `Capacité = 100 - IPP`

4. **IPP Sociale (Majoration)**
   - Calcul de l'IPP globale avec majoration socio-professionnelle
   - Formule : `IPP_globale = IPP_médicale + IPP_sociale`

#### Règles d'Indemnisation

5. **Calcul de la Rente AT**
   - Calcul du montant de la rente selon le taux d'IPP et le salaire
   - Deux formules selon que IPP ≤ 50% ou > 50%
   - Affiche la rente annuelle, trimestrielle et mensuelle

6. **Taux Minimum d'Indemnisation**
   - Seuil de 10% pour l'ouverture du droit à rente
   - En-dessous : indemnité en capital

#### Règles Médicales

7. **Date de Consolidation**
   - Définition et implications légales
   - Point de départ du calcul de l'IPP

8. **Révision du Taux d'IPP**
   - Conditions et procédures de révision
   - Cas d'aggravation ou d'amélioration

9. **Évaluation Traumatisme Crânien**
   - Critères d'évaluation des TC
   - Prise en compte des troubles neurologiques et cognitifs

10. **Atteintes du Membre Supérieur**
    - Évaluation des lésions du membre supérieur
    - Facteurs : main dominante, limitations articulaires, force

11. **Atteintes Rachidiennes**
    - Évaluation des atteintes du rachis
    - Critères : mobilité, douleur, retentissement fonctionnel

## Utilisation

### Effectuer une Recherche

1. **Sélectionner la base de données** : Choisissez entre Barème Indicatif, AT-MP ou Manuel
2. **Saisir votre requête** : Utilisez un langage naturel
   - Exemples : "article 12", "formule balthazard", "calcul rente", "traumatisme crânien"
3. **Lancer la recherche** : Cliquez sur le bouton 🔍 Rechercher ou appuyez sur Entrée

### Effectuer un Calcul

1. **Consulter les résultats** : Les règles correspondantes s'affichent avec leurs formules
2. **Renseigner les variables** : Pour les règles avec calcul, saisir les valeurs dans les champs
3. **Calculer** : Cliquez sur 🧮 Calculer
4. **Consulter le résultat** : Le résultat s'affiche avec le détail des calculs

## Exemples de Recherche

### Recherches par Type

| Type de recherche | Mots-clés suggérés |
|-------------------|-------------------|
| Cumul d'IPP | "balthazard", "cumul", "plusieurs lésions" |
| Incapacité antérieure | "article 12", "antérieur", "préexistant" |
| Indemnisation | "rente", "salaire", "indemnité" |
| Anatomie | "crânien", "membre supérieur", "rachis" |
| Procédures | "consolidation", "révision", "expertise" |

### Exemples Concrets

#### Exemple 1 : Cumul de deux lésions
```
Recherche : "balthazard"
Variables :
- IPP1 : 20%
- IPP2 : 10%
Résultat : 28% (20 + (80×10/100) = 28%)
```

#### Exemple 2 : Article 12
```
Recherche : "article 12"
Variables :
- Taux antérieur : 20%
- Taux global : 35%
Résultat : 18.75% imputable au nouvel accident
```

#### Exemple 3 : Calcul de rente
```
Recherche : "rente"
Variables :
- Salaire annuel : 300,000 DA
- IPP : 30%
Résultat : 
- Rente annuelle : 45,000 DA
- Rente trimestrielle : 11,250 DA
- Rente mensuelle : 3,750 DA
```

## Algorithme de Recherche

L'algorithme de recherche sémantique fonctionne selon plusieurs critères :

1. **Recherche dans les mots-clés** : Priorité aux correspondances exactes
2. **Recherche dans les titres** : Correspondances partielles dans les règles
3. **Recherche dans les descriptions** : Recherche en texte intégral
4. **Filtrage par source** : Limitation aux documents sélectionnés
5. **Tri par pertinence** : Les correspondances exactes en premier

## Validation des Calculs

Tous les calculs incluent des validations :

- ✅ Vérification que toutes les variables sont renseignées
- ✅ Validation des plages de valeurs (min/max)
- ✅ Vérification de la cohérence (ex: taux global > taux antérieur)
- ✅ Plafonnement à 100% quand nécessaire
- ✅ Messages d'erreur explicites

## Codes Couleur des Résultats

- 🟢 **Vert** : Calcul réussi avec résultat
- 🟡 **Jaune** : Avertissement ou information
- 🔴 **Rouge** : Erreur dans les données saisies

## Extension Future

### Fonctionnalités Prévues

1. **Extraction PDF en temps réel**
   - Lecture directe des PDFs
   - Mise à jour automatique des règles

2. **Recherche par OCR**
   - Reconnaissance de texte manuscrit
   - Import d'images de documents

3. **Historique des Calculs**
   - Sauvegarde des calculs effectués
   - Export en PDF ou Excel

4. **Suggestions Intelligentes**
   - Recommandations de recherches connexes
   - Auto-complétion basée sur l'historique

5. **Mode Comparaison**
   - Comparer plusieurs scénarios
   - Analyses "What-if"

## Support Technique

Pour toute question ou amélioration :
- Référez-vous à ce guide
- Consultez les exemples intégrés
- Testez avec les cas types fournis

## Conformité Légale

Toutes les formules et règles sont extraites des documents officiels :
- Code de la Sécurité Sociale
- Barème indicatif d'évaluation des taux d'incapacité
- Législation AT-MP en vigueur

⚠️ **Note** : Les résultats sont fournis à titre indicatif. Seul un médecin conseil agréé peut établir un taux d'IPP officiel.

---

**Version** : 1.0  
**Dernière mise à jour** : Décembre 2025  
**Base de données** : 12 règles principales, extensible
