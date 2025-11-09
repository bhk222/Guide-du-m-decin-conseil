# Test 2 Cas Cliniques Supplémentaires

**Date** : 09/11/2025
**Version** : V3.3.35
**Objectif** : Valider l'IA sur 2 nouveaux cas complexes

---

## 🧪 CAS 14 : Amputation main + séquelles psychologiques

### Description clinique
```
Ouvrier métallurgie 35 ans, accident presse hydraulique. Amputation traumatique main droite (dominante) au niveau du poignet (désarticulation carpo-métacarpienne). Appareillage prothèse myoélectrique. Séquelles à 2 ans : phantom pain (douleurs membre fantôme) EVA 7/10 quotidiennes résistantes aux antalgiques, syndrome dépressif majeur traité (arrêt travail prolongé), cauchemars récurrents, reconversion professionnelle impossible (refus psychologique).
```

### Résultat attendu
- **Lésion principale** : Amputation main dominante au poignet
- **Lésions associées** : 
  - Douleurs neuropathiques membre fantôme (résistantes)
  - Syndrome dépressif majeur post-traumatique
  - Retentissement socio-professionnel sévère
- **Approche** : Cumul Balthazard (amputation + douleur neuropathique + trouble psychiatrique)
- **Formule attendue** :
  - Amputation main dominante : ~60%
  - Douleur neuropathique résistante : ~10-15%
  - Syndrome dépressif majeur : ~10-15%
  - Cumul : 60% + 15%×0.4 + 10%×0.3 ≈ **69-73%**
- **IPP attendu** : ~**65-75%**

### Points de vigilance
- Détection "amputation main" vs "amputation doigt(s)"
- Reconnaissance douleurs membre fantôme comme neuropathie
- Détection syndrome dépressif majeur (vs anxiété légère)
- Application formule Balthazard pour cumul 3 lésions indépendantes
- Prise en compte reconversion impossible → Majoration retentissement

---

## 🧪 CAS 15 : Surdité professionnelle bilatérale progressive

### Description clinique
```
Mécanicien aéronautique 58 ans, exposition bruit professionnel 35 ans (moteurs réacteurs). Surdité de perception bilatérale progressive. Audiométrie : perte auditive OD 70 dB, OG 65 dB. Acouphènes invalidants permanents bilatéraux résistants au traitement (sifflement continu jour/nuit). Appareillage auditif bilatéral mais efficacité partielle (compréhension conversations groupées impossible). Isolement social, troubles sommeil (réveils nocturnes par acouphènes), syndrome anxio-dépressif réactionnel.
```

### Résultat attendu
- **Lésion principale** : Surdité bilatérale sévère (65-70 dB)
- **Lésions associées** :
  - Acouphènes invalidants bilatéraux résistants
  - Troubles psychologiques (isolement social + anxiété + dépression)
- **Approche** : Cumul surdité + acouphènes + retentissement psychologique
- **Détails barème** :
  - Surdité bilatérale 65-70 dB : ~**40-50%** (selon barème audition)
  - Acouphènes invalidants bilatéraux : ~**+5-10%** (majoration)
  - Retentissement psychologique isolement social : ~**+5-10%**
- **IPP attendu** : ~**50-60%**

### Points de vigilance
- Détection surdité BILATÉRALE (pas unilatérale)
- Parser dB précis (70 dB OD, 65 dB OG) → Moyenne ~67-68 dB
- Reconnaissance acouphènes INVALIDANTS (vs acouphènes simples)
- Détection "résistant au traitement" → Sévérité élevée
- Cumul surdité + acouphènes (même territoire mais lésions distinctes)
- Retentissement social (isolement) → Majoration

---

## 📊 Grille de validation

| Cas | Lésion principale | Complexité | IPP Calculé | IPP Attendu | Statut |
|-----|-------------------|------------|-------------|-------------|--------|
| 14 | Amputation main + phantom pain + dépression | Cumul 3 lésions Balthazard | ⏳ | 65-75% | ⏳ |
| 15 | Surdité bilatérale 65-70 dB + acouphènes | Cumul audition + psycho | ⏳ | 50-60% | ⏳ |

---

## 🎯 Objectifs pédagogiques

### CAS 14 - Amputation main + psychiatrique
**Teste** :
- Détection amputation main complète (vs doigts isolés)
- Reconnaissance douleurs membre fantôme (neuropathie spécifique)
- Évaluation syndrome dépressif MAJEUR (vs troubles anxieux légers)
- Application formule Balthazard cumul 3 lésions indépendantes
- Prise en compte retentissement socio-professionnel majeur

**Difficulté** : ⭐⭐⭐⭐⭐ (5/5)
- Cumul 3 systèmes (orthopédique + neurologique + psychiatrique)
- Douleur neuropathique spécifique (membre fantôme)
- Évaluation retentissement psychologique sévère

### CAS 15 - Surdité bilatérale + acouphènes
**Teste** :
- Détection surdité BILATÉRALE (vs unilatérale)
- Parser dB précis chaque oreille (asymétrie OD 70 / OG 65)
- Reconnaissance acouphènes invalidants résistants (vs acouphènes simples)
- Cumul surdité + acouphènes même territoire
- Majoration retentissement social (isolement)

**Difficulté** : ⭐⭐⭐⭐ (4/5)
- Parser 2 valeurs dB distinctes (OD ≠ OG)
- Différencier acouphènes simples vs invalidants
- Évaluation retentissement psycho-social

---

## 🔬 Améliorations attendues V3.3.36

Si échec détection, développer :

### Pour CAS 14
1. **Expert rule amputation main complète** (priorité 1025)
   - Pattern : `/amputation.*main.*(?:poignet|carpo)/i`
   - Context : `/dominante|désarticulation|prothèse/i`
   - SearchTerms : `["__CUMUL_AMPUTATION_MAIN__"]`

2. **Détection douleurs membre fantôme**
   - Pattern : `/phantom.*pain|douleur.*membre.*fantôme/i`
   - Sévérité : EVA 7/10 résistant → ÉLEVÉE

3. **Handler marker cumul amputation + neuropathie + psychiatrique**
   - Amputation main dominante : 60%
   - Phantom pain résistant : 15%
   - Dépression majeure : 10%
   - Formule Balthazard : 60 + 15×0.4 + 10×0.34 ≈ **69%**

### Pour CAS 15
1. **Expert rule surdité bilatérale sévère** (priorité 1015)
   - Pattern : `/surdité.*bilatérale.*(?:60|65|70).*dB/i`
   - Context : `/acouphènes.*invalidants|OD.*OG/i`
   - Parser dB : Moyenne (70+65)/2 = 67.5 dB

2. **Majoration acouphènes invalidants résistants**
   - Détection "invalidants" + "résistants" → Bonus +10%

3. **Majoration retentissement social**
   - Détection "isolement social" + "troubles sommeil" → Bonus +5%

---

## 🤖 Exécution tests automatiques

Commande :
```bash
npx tsx test-cas14-amputation.mjs
npx tsx test-cas15-surdite.mjs
npx tsx test-batch-cas14-15.mjs
```

**Prochaine étape** : Créer scripts tests automatiques si demandé.
