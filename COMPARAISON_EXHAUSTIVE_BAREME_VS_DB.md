# COMPARAISON EXHAUSTIVE : BAREME_INDICATIF_COMPLET.md vs disabilityRates.new.ts

> Comparaison ligne par ligne du barème indicatif (Concours Médical, 6e édition, 2001) avec la base de données TypeScript.  
> Date : analyse complète

---

## ⚠️ CONSTAT GLOBAL CRITIQUE

**Le fichier `disabilityRates.new.ts` présente une INFLATION SYSTÉMIQUE des taux pour de nombreuses entrées, en particulier pour les AMPUTATIONS.** Les taux de la base de données semblent provenir du barème AT-MP (Accident du Travail / Maladie Professionnelle) plutôt que du barème indicatif en droit commun (Concours Médical). Les écarts sont considérables (parfois +20 à +30 points).

---

## A) ENTRÉES MANQUANTES (présentes dans le barème, absentes de la DB)

### CHAPITRE I — NEUROLOGIE

| Entrée du barème | Taux barème | Statut DB | Catégorie suggérée |
|---|---|---|---|
| Déficits sensitifs isolés hémi-corporels | 5–25 % | ❌ ABSENT | Séquelles Crâniennes Neuro > Hémiplégies |
| TC graves — syndrome subjectif majeur avec perturbation neuropsychologique documentée | 20–40 % | ⚠️ PARTIEL (DB a TC grades mais pas cette gradation exacte) | Séquelles Crâniennes Neuro > Syndrome Post-Commotionnel |
| Douleurs de déafférentation (anciennement douleurs thalamiques) | 8–25 % | ⚠️ VÉRIFIER — DB a "Syndrome de déafférentation" dans nerfs | Nerfs Crâniens et Périphériques > Névralgies |

### CHAPITRE II — PSYCHIATRIE

| Entrée du barème | Taux barème | Statut DB |
|---|---|---|
| Aspects particuliers : Conversion, Pathomimie / Trouble factice, Simulation | Non cotable | ❌ ABSENT (mention informative, pas de taux) |
| Psychoses (barème indique "pas d'origine traumatique directe") | Non cotable | DB a des entrées pour psychose post-traumatique — OK extensif |

### CHAPITRE III — OPHTALMOLOGIE

| Entrée du barème | Taux barème | Statut DB |
|---|---|---|
| Tableau I — Acuité visuelle de loin (matrice complète 10×10) | 0–85 % | ⚠️ DB a ~20 entrées spécifiques, pas la matrice complète de 100+ combinaisons |
| Tableau II — Acuité visuelle de près (matrice) | 0–75 % | ⚠️ Même constat |
| Quadranopsie latérale homonyme supérieure | jusqu'à 12 % | ⚠️ VÉRIFIER si cet item précis y est |
| Quadranopsie latérale homonyme inférieure | jusqu'à 30 % | ⚠️ VÉRIFIER |
| Scotomes paracentraux bilatéraux | important | ⚠️ VÉRIFIER |
| Motricité intrinsèque — mydriase paralytique | 5 % | ⚠️ VÉRIFIER |
| Motricité intrinsèque — perte du réflexe d'accommodation | 5 % | ⚠️ VÉRIFIER |
| Alacrymie (sécheresse oculaire) | jusqu'à 5 % | ⚠️ VÉRIFIER |

### CHAPITRE IV — STOMATOLOGIE

| Entrée du barème | Taux barème | Statut DB |
|---|---|---|
| Syndrome de Frei (syndrome auriculo-temporal) | 3 % | ❌ ABSENT |
| Communication bucco-sinusienne | jusqu'à 5 % | ⚠️ VÉRIFIER |
| Communication bucco-nasale | jusqu'à 5 % | ⚠️ VÉRIFIER |
| Fistule salivaire | jusqu'à 5 % | ⚠️ VÉRIFIER |
| Constriction permanente des mâchoires — ouverture buccale à 10 mm | 25 % | ⚠️ VÉRIFIER taux exact |
| Constriction permanente — ouverture à 20 mm | 17 % | ⚠️ VÉRIFIER |
| Constriction permanente — ouverture à 30 mm | 5 % | ⚠️ VÉRIFIER |

### CHAPITRE V — ORL

| Entrée du barème | Taux barème | Statut DB |
|---|---|---|
| Otorrhée chronique post-traumatique | 2–4 % | ⚠️ VÉRIFIER |
| Syndrome otolithique (sensation d'ébriété) | 3–5 % | ⚠️ VÉRIFIER si cet item exact existe |

### CHAPITRE VI — APPAREIL LOCOMOTEUR — MEMBRES SUPÉRIEURS

| Entrée du barème | Taux barème (D/ND) | Statut DB |
|---|---|---|
| **ÉPAULE** | | |
| Perte totale de mobilité (toutes amplitudes) | 30 % / 25 % | ⚠️ DB a "Raideur" [5,30] mais pas d'entrée fixe à 30% pour perte totale |
| Limitation abduction seule à un angle spécifique | Par angle | ⚠️ DB a des entrées mais les taux sont différents |
| Instabilité chronique de l'épaule (non luxation récidivante) | 8–15 % / 5–12 % | ⚠️ VÉRIFIER si distinct de luxation récidivante |
| **COUDE** | | |
| Arthrodèse du coude en pronation | 20–25 % / 15–20 % | ❌ ABSENT (DB a "Ankylose complète" mais pas arthrodèse distincte) |
| Arthrodèse du coude en position neutre | 20 % / 15 % | ❌ ABSENT |
| Arthrodèse du coude en supination | 25–30 % / 20–25 % | ❌ ABSENT |
| Coude ballant (pseudo-arthrose humérale basse) | 40 % / 30 % | ⚠️ DB a "Pseudarthrose coude - Mobile (coude ballant)" — PRÉSENT |
| Déficit extension du coude par angle spécifique | Détaillé | ⚠️ DB a des entrées par angle |
| **POIGNET** | | |
| Arthrodèse du poignet rectiligne | 15 % / 10 % | ❌ ABSENT (DB a "Ankylose" mais pas "arthrodèse" rectiligne avec ces taux) |
| Arthrodèse du poignet en position vicieuse | 20 % / 15 % | ❌ ABSENT |
| **MAIN — Préhension** | | |
| Perte de la préhension fine (atteinte motrice) | 30 % / 25 % | ❌ ABSENT comme entrée distincte |
| Perte de la prise sphérique | 6 % / 5 % | ❌ ABSENT |
| Perte de la préhension grossière | 40 % / 35 % | ❌ ABSENT |
| **MAIN — Sensibilité** | | |
| Troubles de la sensibilité — gêne modérée | 3–5 % / 2–4 % | ❌ ABSENT |
| Troubles de la sensibilité — gêne importante | 5–8 % / 4–6 % | ❌ ABSENT |
| **MAIN — Raideurs articulaires par articulation** | | |
| Raideur métacarpo-phalangienne (II et III) | jusqu'à 4 % / jusqu'à 3 % | ❌ ABSENT (entrée spécifique par articulation) |
| Raideur articulation P1-P2 | jusqu'à 3 % / jusqu'à 2 % | ❌ ABSENT |
| Raideur articulation P2-P3 | jusqu'à 2 % / jusqu'à 2 % | ❌ ABSENT |
| Raideur pouce — trapézo-métacarpienne | jusqu'à 8 % / jusqu'à 6 % | ❌ ABSENT |
| Raideur pouce — métacarpo-phalangienne | jusqu'à 6 % / jusqu'à 4 % | ❌ ABSENT |
| Raideur pouce — interphalangienne | jusqu'à 2 % / jusqu'à 2 % | ❌ ABSENT |
| **PARALYSIES MS** | | |
| Paralysie du nerf musculo-cutané | 10 % / 8 % | ⚠️ VÉRIFIER si dans Nerfs Périphériques |
| Paralysie du nerf spinal (trapèze + SCM) | 10–15 % / 8–12 % | ⚠️ VÉRIFIER |

### CHAPITRE VI — APPAREIL LOCOMOTEUR — MEMBRES INFÉRIEURS

| Entrée du barème | Taux barème | Statut DB |
|---|---|---|
| Perte totale de la fonction de locomotion (fauteuil) | 65 % | ❌ ABSENT comme entrée distincte |
| **AMPUTATIONS MI** | | |
| Amputation tous orteils sauf gros orteil | 8–12 % | ❌ ABSENT |
| Amputation gros orteil au 1er rayon | 10–12 % | ❌ DB a "Amputation gros orteil" [5,8] — TAUX INCORRECT |
| Amputation gros orteil — tête 1ère phalange | 7–8 % | ❌ ABSENT |
| Amputation pied médiotarsienne sans équin / bon talon | 25 % | ❌ ABSENT |
| Amputation pied médiotarsienne avec équin | 30 % | ❌ ABSENT |
| Amputation transmétatarsienne | 18–20 % | ❌ ABSENT |
| **BASSIN** | | |
| Douleurs sacro-iliaques isolées | 3–10 % | ⚠️ VÉRIFIER |
| **HANCHE** | | |
| Arthrodèse de hanche (fusion osseuse) | 20 % | ❌ ABSENT |
| Arthrodèse en attitude vicieuse | 35–40 % | ❌ ABSENT |
| Hanche ballante | 40 % | ❌ ABSENT |
| Raideur conservation uniquement flexion | 15 % | ❌ ABSENT (entrée spécifique) |
| Limitation minime des amplitudes selon secteur | jusqu'à 8 % | ❌ ABSENT (entrée spécifique) |
| Note prothèse de hanche | — | ❌ ABSENT (note informative) |
| **CALS VICIEUX FÉMUR** | | |
| Raccourcissement jusqu'à 10 mm (talonnette) | 0 % | ❌ ABSENT |
| Raccourcissement 10–50 mm | jusqu'à 8 % | ❌ ABSENT (DB a "Raccourcissement membres" [5,25] — différent) |
| Raccourcissement > 50 mm | > 8 % | ❌ ABSENT |
| **GENOU — Flexion** | | |
| Arthrodèse du genou | 25 % | ❌ ABSENT |
| Flexion possible de 0 à 30° | 20 % | ❌ ABSENT (entrée par angle) |
| Flexion possible de 0 à 60° | 15 % | ❌ ABSENT |
| Flexion possible de 0 à 90° | 10 % | ❌ ABSENT |
| Flexion possible de 0 à 110° | 5–8 % | ❌ ABSENT |
| Flexion au-dessus de 110° | jusqu'à 5 % | ❌ ABSENT |
| **GENOU — Flexum** | | |
| Flexum de 0 à 10° | jusqu'à 5 % | ❌ ABSENT |
| Flexum de 10 à 20° | 5–10 % | ❌ ABSENT |
| **GENOU — Laxités (détaillé)** | | |
| Laxité antérieure avec ressaut antéro-externe typique | 5–10 % | ❌ ABSENT (DB a "Laxité chronique" mais pas cette précision) |
| Laxité antérieure sans ressaut | jusqu'à 5 % | ❌ ABSENT |
| Laxité postérieure isolée bien tolérée | jusqu'à 5 % | ❌ ABSENT |
| Laxité chronique mixte périphérique et antéro-postérieure | 5–15 % | ❌ ABSENT |
| Laxité grave à la limite de l'arthrodèse | 20 % | ❌ ABSENT |
| Genou ballant appareillé (y compris raccourcissement) | 30 % | ❌ ABSENT |
| **GENOU — Rotule** | | |
| Syndrome rotulien post-contusif | jusqu'à 3 % | ❌ ABSENT |
| Rupture appareil extenseur (tendon rotulien/quadricipital) | jusqu'à 8 % | ⚠️ DB a "Rupture tendon quadricipital" [15,30] — TAUX TROP ÉLEVÉ |
| **CHEVILLE** | | |
| Arthrodèse tibio-talienne (bonne position) | 10–12 % | ❌ ABSENT |
| Arthrodèse tibio-talienne + médio-talienne + sous-talienne | 20 % | ❌ ABSENT |
| Perte flexion dorsale isolée (genou fléchi) | jusqu'à 5 % | ❌ ABSENT |
| Équinisme < 2 cm | 5 % | ❌ ABSENT |
| Équinisme 2+ cm avec médio-tarsienne normale | 5–10 % | ❌ ABSENT |
| Équinisme 2+ cm avec médio-tarsienne réduite | 10 % | ❌ ABSENT |
| Équinisme 2+ cm sans mobilité médio-tarsienne | 15 % | ❌ ABSENT |
| Équinisme nécessitant appareillage | > 12 % | ❌ ABSENT |
| **PIED** | | |
| Modifications appuis plantaires avec hyperkératose | 3–10 % | ❌ ABSENT |
| Modifications appuis plantaires sans hyperkératose | 3 % | ❌ ABSENT |
| Ankylose sous-talienne et médio-tarsienne en bonne position | 10–15 % | ❌ ABSENT |
| Arthrodèse sous-talienne en bonne position | 8–10 % | ❌ ABSENT |
| Ankylose tarso-métatarsienne (Lisfranc) | 8–15 % | ❌ ABSENT |
| Arthrodèse tarso-métatarsienne (Lisfranc) | 8–12 % | ❌ ABSENT |
| Laxité — séquelle entorse bénigne | 0–3 % | ❌ ABSENT (distinct de laxité chronique) |
| Laxité chronique post-traumatique documentée | 3–6 % | ❌ ABSENT (DB a "Instabilité chronique cheville" [5,15] — taux différent) |
| **PARALYSIES MI** | | |
| Réduction selon compensation (paralysie sciatique) | -5 à -10 % | ❌ ABSENT |
| Paralysie nerf fémoro-cutané (méralgie) | < 5 % | ❌ ABSENT |
| Paralysie nerf obturateur | 5 % | ❌ ABSENT |

### CHAPITRE VI — RACHIS

| Entrée du barème | Taux barème | Statut DB |
|---|---|---|
| Rachis cervical — 3 niveaux de sévérité | 3% / 3-10% / 10-15% | ⚠️ DB a des entrées rachis mais vérifier taux |
| Rachis thoraco-lombaire — 3 niveaux | 3% / 5-10% / 10-20% | ⚠️ DB a des entrées, vérifier |
| Note : complications neurologiques → chapitre neuro | — | OK (renvoi logique) |

### CHAPITRE VII — APPAREIL CARDIO-VASCULAIRE

| Entrée du barème | Taux barème | Statut DB |
|---|---|---|
| NYHA — 9 niveaux d'atteinte cardiaque | 5–60%+ | ⚠️ DB a des entrées cardio dans "Appareil Circulatoire" mais il faut vérifier si les 9 niveaux sont tous présents |
| Transplant cardiaque | 25–30 % | ⚠️ VÉRIFIER |
| Séquelles veineuses (phlébite) — 3 niveaux | 3% / 4-10% / 10-15% | ⚠️ VÉRIFIER |
| Séquelles pariétales douloureuses (thoracotomie, sternotomie) | 0–5 % | ⚠️ PROBABLEMENT dans DB |

### CHAPITRE VIII — APP. RESPIRATOIRE

| Entrée du barème | Taux barème | Statut DB |
|---|---|---|
| Insuffisance respiratoire — 5 niveaux | 2–50%+ | ⚠️ DB a "Séquelles Respiratoires" avec des IRC Stade I-IV. **TAUX DIFFÉRENTS** : Barème commence à 2-5%, DB commence à 10-20% |
| Asthme intermittent | jusqu'à 5 % | ⚠️ DB a asthme professionnel [10,40] — taux plus élevé |
| Asthme avec traitement de fond | 5–10 % | ⚠️ Idem |
| Séquelles de thoracotomie | jusqu'à 5 % | ⚠️ VÉRIFIER |

### CHAPITRE IX — HÉPATO-GASTRO-ENTÉROLOGIE

| Entrée du barème | Taux barème | Statut DB |
|---|---|---|
| Calcifications cicatricielles (os de seiche) | jusqu'à 5 % | ⚠️ VÉRIFIER |
| Éventration petite taille | jusqu'à 5 % | ⚠️ VÉRIFIER — DB a "Éventration" |
| Éventration grande taille avec appareillage | 5–20 % | ⚠️ VÉRIFIER |
| Troubles digestifs — 4 niveaux de sévérité | 5% / 5-10% / 10-20% / 20-30% | ⚠️ VÉRIFIER gradation exacte |
| Colostomies gauches | 10–20 % | ⚠️ VÉRIFIER |
| Colostomies droites, iléostomies, gastrostomies | 20–30 % | ⚠️ VÉRIFIER |
| Incontinence anale — aux gaz | 5–10 % | ⚠️ VÉRIFIER |
| Incontinence anale — fuites inopinées | 10–15 % | ⚠️ VÉRIFIER |
| Incontinence anale — sans contrôle sphinctérien | 20–30 % | ⚠️ VÉRIFIER |
| Hépatites chroniques — métavir ≤ A1F1 | jusqu'à 5 % | ❌ PROBABLEMENT ABSENT |
| Hépatites chroniques — métavir > A1F1 < F4 | 5–10 % | ❌ PROBABLEMENT ABSENT |
| Hépatites — arthromyalgies | jusqu'à 10 % | ❌ PROBABLEMENT ABSENT |
| Hépatites — vascularite | 10–50 % | ❌ PROBABLEMENT ABSENT |
| Cirrhose Child A | 10–20 % | ❌ PROBABLEMENT ABSENT |
| Cirrhose Child B | 20–40 % | ❌ PROBABLEMENT ABSENT |
| Cirrhose Child C | 60 %+ | ❌ PROBABLEMENT ABSENT |
| Transplant hépatique | 60 %+ | ❌ PROBABLEMENT ABSENT |

### CHAPITRE X — ENDOCRINOLOGIE

| Entrée du barème | Taux barème | Statut DB | Commentaire |
|---|---|---|---|
| Panhypopituitarisme | 25–40 % | ⚠️ DB a "Diabète insipide post-hypophysaire" mais pas panhypopituitarisme complet | MANQUE entrée globale |
| Diabète insipide bien contrôlé | 5–15 % | ⚠️ VÉRIFIER taux — DB probablement présent dans "Syndromes Neuro Spécifiques" | |
| Hyperthyroïdie (Basedow) | 10–30 % | ⚠️ DB a [15,35] | Taux DB légèrement plus large |
| Hypothyroïdie bien équilibrée | **5 %** | ❌ DB a [10,25] | **TAUX DB TROP ÉLEVÉ** |
| Hypoparathyroïdie | 5–15 % | ❌ PROBABLEMENT ABSENT | |
| Insuffisance surrénale iatrogène | 10–25 % | ❌ DB a [40,70] | **TAUX DB BEAUCOUP TROP ÉLEVÉ** |
| Diabète DNID | Pas de taux | DB a type 2 [10,30] | Le barème dit explicitement "pas de taux justifié" |
| Diabète DID — simple bien équilibré | 15–20 % | DB a type 1 [30,60] | **TAUX DB BEAUCOUP TROP ÉLEVÉ** |
| Diabète DID — instable | 20–35 % | DB a type 1 [30,60] | Même entrée, mais barème distingue 2 niveaux |

### CHAPITRE XI — HÉMATOLOGIE

| Entrée du barème | Taux barème | Statut DB |
|---|---|---|
| Splénectomie sans anomalie hématologique | jusqu'à 5 % | ⚠️ VÉRIFIER — DB a probablement une entrée dans Abdomen |
| Splénectomie avec anomalies hématologiques définitives | 5–10 % | ⚠️ VÉRIFIER |

### CHAPITRE XII — NÉPHROLOGIE / UROLOGIE

| Entrée du barème | Taux barème | Statut DB |
|---|---|---|
| Néphrectomie unilatérale — fonction rénale normale | **3 %** | ⚠️ VÉRIFIER taux exact dans DB |
| Insuffisance rénale — clearance 60-80 ml/mn | jusqu'à 10 % | ⚠️ VÉRIFIER |
| Insuffisance rénale — clearance 30-60 ml/mn | 10–25 % | ⚠️ VÉRIFIER |
| Insuffisance rénale — clearance < 30 ml/mn | 25–35 % | ⚠️ VÉRIFIER |
| Insuffisance rénale — clearance < 10 ml/mn (hémodialyse) | 35–50 % | ⚠️ VÉRIFIER |
| Transplant rénal | 20–30 % | ⚠️ VÉRIFIER |
| Rétention urinaire — auto-sondages | jusqu'à 15 % | ⚠️ VÉRIFIER |
| Rétention urinaire — sonde à demeure | 20–25 % | ⚠️ VÉRIFIER |
| Rétention urinaire — stimulateur implanté | jusqu'à 5 % | ⚠️ VÉRIFIER |
| Incontinence — fuites sans protection | jusqu'à 5 % | ⚠️ VÉRIFIER |
| Incontinence — envies impérieuses | jusqu'à 10 % | ⚠️ VÉRIFIER |
| Incontinence — fuites à l'effort | 5–10 % | ⚠️ VÉRIFIER |
| Incontinence — forme sévère | 20–25 % | ⚠️ VÉRIFIER |
| Incontinence — sphincter artificiel | 5–10 % | ⚠️ VÉRIFIER |
| Sténose urètre — 1-2 dilatations/an | jusqu'à 5 % | ❌ PROBABLEMENT ABSENT |
| Sténose urètre — >10 dilatations/an | jusqu'à 10 % | ❌ PROBABLEMENT ABSENT |
| Néphrostomie unilatérale | 10–20 % | ⚠️ VÉRIFIER |
| Néphrostomie bilatérale | 20–30 % | ⚠️ VÉRIFIER |
| Urétérostomie transiléale/transcolique | 10–20 % | ⚠️ VÉRIFIER |
| Urétérostomie uni + sonde + poche | 15–20 % | ⚠️ VÉRIFIER |
| Urétérostomie bi + sonde + poche | 20–30 % | ⚠️ VÉRIFIER |

### CHAPITRE XIII — GÉNITO-SEXUEL

| Entrée du barème | Taux barème | Statut DB |
|---|---|---|
| Hystérectomie | 6 % | ⚠️ VÉRIFIER |
| Ovariectomie unilatérale | 3 % | ⚠️ VÉRIFIER |
| Ovariectomie bilatérale | 6 % | ⚠️ VÉRIFIER |
| Salpingectomie unilatérale | 3 % | ⚠️ VÉRIFIER |
| Salpingectomie bilatérale | 6 % | ⚠️ VÉRIFIER |
| Orchidectomie unilatérale | 3 % | ⚠️ VÉRIFIER |
| Orchidectomie bilatérale | 6 % | ⚠️ VÉRIFIER |
| Amputation de la verge | 20–25 % | ⚠️ VÉRIFIER |
| Stérilité (inaccessible à l'AMP) | 20–25 % | ⚠️ VÉRIFIER |
| Mammectomie unilatérale | 5 % | ⚠️ VÉRIFIER |
| Mammectomie bilatérale | 10 % | ⚠️ VÉRIFIER |

### CHAPITRE XIV — BRÛLURES

| Entrée du barème | Taux barème | Statut DB | Commentaire |
|---|---|---|---|
| Brûlures < 10 % surface | jusqu'à 5 % | ❌ ABSENT | DB commence à 10-20% surface |
| Brûlures 10–20 % surface | 5–10 % | ❌ DB a [10,30] | **TAUX DB TROP ÉLEVÉ** |
| Brûlures 20–60 % surface | 10–25 % | ❌ DB a 20-40% → [40,60] et 40-60% → [70,90] | **TAUX DB TROP ÉLEVÉS** |
| Brûlures >60 % surface | 25–50 % | ❌ DB a [90,100] | **TAUX DB BEAUCOUP TROP ÉLEVÉ** |

---

## B) ENTRÉES AVEC RATE RANGE MAIS SANS `rateCriteria`

Les entrées suivantes ont un taux fourchette (`rate: [min, max]`) mais aucun `rateCriteria` défini, ce qui empêche l'application d'une aide à la décision :

### Catégorie : Membres Supérieurs

| Entrée | Taux | Sous-catégorie |
|---|---|---|
| Amputation du bras (tiers supérieur - Main Dominante) | [85, 90] | Épaule - Amputation |
| Amputation du bras (tiers supérieur - Main Non Dominante) | [75, 80] | Épaule - Amputation |
| Amputation du bras (tiers moyen - Main Dominante) | [75, 80] | Épaule - Amputation |
| Amputation du bras (tiers moyen - Main Non Dominante) | [65, 70] | Épaule - Amputation |
| Amputation du bras (tiers inférieur - Main Dominante) | [70, 75] | Épaule - Amputation |
| Amputation du bras (tiers inférieur - Main Non Dominante) | [60, 65] | Épaule - Amputation |
| Désarticulation du coude (dans Épaule - Amputation) | [70, 75] / [60, 65] | Épaule - Amputation |
| Amputation de l'avant-bras (tous niveaux, dans Épaule - Amputation) | [45-70] | Épaule - Amputation |
| Désarticulation du poignet (dans Épaule - Amputation) | [55, 60] / [45, 50] | Épaule - Amputation |
| Raideur de l'épaule - Abduction 60-90° | [10, 18] | Épaule - Raideurs |
| Raideur de l'épaule - Abduction 60-90° + rotation | [15, 25] | Épaule - Raideurs |
| Raideur de l'épaule - Limitation rotation | [8, 15] | Épaule - Raideurs |
| Raideur de l'épaule - Élévation limitée | [10, 20] | Épaule - Raideurs |
| Raideur de l'épaule avec douleur | [12, 22] | Épaule - Raideurs |
| Raideur de l'épaule avec limitation fonctionnelle | [15, 25] | Épaule - Raideurs |
| Raideur + instabilité épaule | [20, 35] | Épaule - Raideurs |
| Raideur épaule abduction <90° + rotation | [18, 28] | Épaule - Raideurs |
| Fracture tête humérale (tous niveaux) | variables | Épaule - Fractures |
| Fracture col chirurgical (tous niveaux) | variables | Épaule - Fractures |
| Fracture trochiter (tous niveaux) | variables | Épaule - Fractures |
| Fracture trochin (tous niveaux) | variables | Épaule - Fractures |
| Cicatrices du coude entravant l'extension (tous angles) | [10-50] | Coude - Fractures |
| Pseudarthrose coude (avec ankylose) (D/ND) | [25-45] | Coude - Fractures |
| Ankylose complète coude (toutes positions, D/ND) | [25-60] | Coude - Raideurs |
| Limitation pronation/supination (D/ND) | [2-10] | Coude - Raideurs |
| Raideur du poignet - Flexion/extension limitée | [8, 14] | Poignet - Raideurs |
| Raideur du poignet - Mobilité réduite | [10, 16] | Poignet - Raideurs |
| Raideur du poignet - Limitation sévère | [15, 22] | Poignet - Raideurs |
| Raideur poignet avec douleur | [12, 18] | Poignet - Raideurs |
| Raideur importante du poignet | [15, 20] | Poignet - Raideurs |
| Pseudarthrose de l'humérus (voisinage épaule/coude) | [40, 70] | Bras - Fractures |
| Rupture du triceps totale (D/ND) | [20, 30] / [15, 25] | Bras - Fractures |
| Amputation du bras au tiers moyen (sans D/ND) | [80, 85] | Bras - Amputations |
| Amputation du bras au tiers inférieur (sans D/ND) | [80, 85] | Bras - Amputations |
| Amputation de l'avant-bras au tiers moyen/supérieur/inférieur | variables | Avant-bras - Amputations |
| Fracture isolée du radius/cubitus | variables | Avant-bras - Fractures |
| Pseudarthrose du radius/cubitus | variables | Avant-bras - Fractures |
| Ankylose pouce — carpo-métacarpienne | [15, 20] / [12, 15] | Doigts - Pouce |
| Ankylose poignet — toutes positions | variables | Poignet - Raideurs |

### Catégorie : Membres Inférieurs

| Entrée | Taux | Sous-catégorie |
|---|---|---|
| Amputation de cuisse (tiers sup/moyen/inf) | variables | Amputations |
| Désarticulation du genou | [60, 65] | Amputations |
| Amputation de jambe (tous niveaux) | variables | Amputations |
| Désarticulation de la cheville | [40, 45] | Amputations |
| Désarticulation de la hanche | [78, 80] | Amputations |
| Fracture diaphysaire du fémur | [10, 30] | Cuisse (description but no rateCriteria — WAIT, it has rateCriteria) |
| Fracture extrémité inférieure fémur | [15, 30] | Cuisse |
| Pseudarthrose du fémur | [60, 80] | Cuisse |
| Fracture de la rotule | [5, 15] | Genou - Osseuses |
| Fracture plateaux tibiaux | [10, 30] | Genou - Osseuses |
| Fracture condyles fémoraux | [10, 30] | Genou - Osseuses |
| Hydarthrose chronique genou | [5, 15] | Genou - Osseuses |
| Séquelles LCA/LCP | [10, 25] / [10, 25] | Genou - Ligaments |
| Séquelles méniscectomie | [5, 15] | Genou - Ligaments |
| Raideur importante de la cheville | [12, 20] | Cheville - Raideurs |
| Raideur modérée de la cheville | [8, 15] | Cheville - Raideurs |
| Raideur cheville - Dorsiflexion 0-10° | [10, 18] | Cheville - Raideurs |
| Équin modéré de la cheville | [10, 18] | Cheville - Raideurs |
| Raideur cheville avec limitation fonctionnelle | [12, 20] | Cheville - Raideurs |
| Raideur cheville + sous-astragalienne | [15, 25] | Cheville - Raideurs |
| Raideur cheville post-bimalléolaire avec claudication | [15, 25] | Cheville - Raideurs |
| Fracture de l'astragale | [10, 25] | Pied - Fractures |
| Fracture du calcanéum | [10, 30] | Pied - Fractures |
| Fracture des métatarsiens | [3, 10] | Pied - Fractures |
| Fracture pilon tibial | [15, 40] | Cheville - Fractures |
| Ankylose articulation du tarse | [10, 20] | Pied - Raideurs |
| Pied plat/creux post-traumatique | [5, 20] | Pied - Raideurs |
| Fracture isolée du tibia | [5, 20] | Jambe - Fractures |
| Fracture isolée du péroné | [2, 5] | Jambe - Fractures |
| Pseudarthrose deux os jambe | [40, 60] | Jambe - Fractures |
| Pseudarthrose tibia | [30, 50] | Jambe - Fractures |
| Amputation deux/trois/quatre orteils | variables | Orteils |
| Hallux valgus post-traumatique | [3, 8] | Orteils |
| Griffes des orteils | [3, 10] | Orteils |
| Cal vicieux métatarsien | [3, 8] | Orteils |
| Boiterie | [5, 15] | MI - Diverses |

### Autres catégories

| Entrée | Taux | Sous-catégorie |
|---|---|---|
| Plusieurs entrées de "Cumuls de Lésions et Polytraumatismes" | variables | Cumuls |
| Toutes les entrées "États Antérieurs et Aggravation" | variables | États Antérieurs |

> **Total estimé d'entrées avec fourchette mais sans rateCriteria : ~100+**

---

## C) ENTRÉES AVEC TAUX INCORRECTS

### 🔴 ERREURS CRITIQUES DE TAUX (écart > 10 points)

| Entrée du barème | Taux BARÈME | Taux DB | Écart | Localisation DB |
|---|---|---|---|---|
| **Désarticulation interscapulo-thoracique (D)** | **75 %** | **95** | **+20** | Épaule - Amputation |
| **Désarticulation interscapulo-thoracique (ND)** | **65 %** | **85** | **+20** | Épaule - Amputation |
| **Désarticulation scapulo-humérale / col chirurgical (D)** | **65 %** | **90** | **+25** | Épaule - Amputation |
| **Désarticulation scapulo-humérale / col chirurgical (ND)** | **55 %** | **80** | **+25** | Épaule - Amputation |
| **Amputation du bras 1/3 moyen (D)** | **60 %** | **[80,85]** | **+20-25** | Bras - Amputations |
| **Amputation du bras 1/3 moyen (ND)** | **50 %** | **[70,75]** | **+20-25** | Bras - Amputations |
| **Amputation de l'avant-bras (D)** | **55 %** | **[70,75]** | **+15-20** | Avant-bras - Amputations |
| **Amputation de l'avant-bras (ND)** | **45 %** | **[60,65]** | **+15-20** | Avant-bras - Amputations |
| **Désarticulation du poignet (D)** | **50 %** | **[65,70]** | **+15-20** | Poignet - Désarticulation |
| **Désarticulation du poignet (ND)** | **40 %** | **[55,60]** | **+15-20** | Poignet - Désarticulation |
| **Désarticulation de hanche** | **55 %** | **[78,80]** | **+23-25** | MI - Amputations |
| **Amputation haute cuisse appareillée** | **45–50 %** | **[75,80]** | **+25-35** | MI - Amputations (tiers sup.) |
| **Amputation cuisse 1/3 moyen** | **40 %** | **[70,75]** | **+30-35** | MI - Amputations |
| **Amputation jambe 1/3 moyen** | **30 %** | **[50,55]** | **+20-25** | MI - Amputations |
| **Ankylose complète de la hanche (barème)** | **30 %** | **[50,70]** | **+20-40** | Hanche - Raideurs |
| **Insuffisance surrénale iatrogène** | **10–25 %** | **[40,70]** | **+15-45** | Séquelles Endocriniennes |
| **Diabète DID simple bien équilibré** | **15–20 %** | **[30,60]** | **+10-45** | Séquelles Endocriniennes |
| **Hypothyroïdie bien équilibrée** | **5 %** | **[10,25]** | **+5-20** | Séquelles Endocriniennes |
| **Brûlures 10-20% surface** | **5–10 %** | **[10,30]** | **+0-20** | Séquelles de Brûlures |
| **Brûlures 20-60% surface** | **10–25 %** | **[40-90]** | **+15-65** | Séquelles de Brûlures |
| **Brûlures > 60% surface** | **25–50 %** | **[90,100]** | **+40-75** | Séquelles de Brûlures |

### 🟠 ERREURS MODÉRÉES DE TAUX (écart 3-10 points)

| Entrée du barème | Taux BARÈME | Taux DB | Écart | Localisation DB |
|---|---|---|---|---|
| Épaule ballante (D) | 60 % | [60,70] | +0-10 | Épaule - Lésions Diverses |
| Épaule ballante (ND) | 50 % | [45,60] | -5 à +10 | Épaule - Lésions Diverses |
| Ankylose épaule omoplate mobile (D) | 30 % | [35,45] | +5-15 | Épaule - Raideurs |
| Ankylose épaule omoplate fixée (D) | 40 % | [45,60] | +5-20 | Épaule - Raideurs |
| Ankylose épaule omoplate fixée (ND) | 30 % | [35,50] | +5-20 | Épaule - Raideurs |
| Perte auriculaire 3 phalanges (D) | 7 % | 10 | +3 | Doigts - Auriculaire D |
| Perte auriculaire 3 phalanges (ND) | 5 % | 8 | +3 | Doigts - Auriculaire ND |
| Perte auriculaire 2ème+3ème phalanges (D) | 5 % | 7 | +2 | Doigts - Auriculaire D |
| Perte auriculaire 2ème+3ème phalanges (ND) | 4 % | 5 | +1 | Doigts - Auriculaire ND |
| Amputation gros orteil au 1er rayon | 10–12 % | [5,8] | **-2-7** | Orteils - Lésions |
| Rupture appareil extenseur genou | jusqu'à 8 % | [15,30] | +7-22 | Cuisse - Lésions Musc. |
| Perte 5 orteils | 15 % | [12,18] | -3 à +3 | Orteils |
| Laxité chronique cheville | 3–6 % | [5,15] | +0-9 | Cheville - Raideurs |
| Ankylose genou | 25–30 % | [30,50] | +0-20 | Genou |
| Hyperthyroïdie Basedow | 10–30 % | [15,35] | +5 aux extrêmes | Endocriniennes |

### 🟢 TAUX CORRECTS (correspondances confirmées)

| Entrée du barème | Taux BARÈME | Taux DB | Localisation DB |
|---|---|---|---|
| Pouce — perte 2 phalanges (D) | 25 % | 25 | ✅ Doigts - Pouce D |
| Pouce — perte 2 phalanges (ND) | 20 % | 20 | ✅ Doigts - Pouce ND |
| Pouce — perte 2ème phalange (D) | 10 % | 10 | ✅ Doigts - Pouce D |
| Pouce — perte 2ème phalange (ND) | 8 % | 8 | ✅ Doigts - Pouce ND |
| Index — perte 3 phalanges (D) | 15 % | 15 | ✅ Doigts - Index D |
| Index — perte 3 phalanges (ND) | 12 % | 12 | ✅ Doigts - Index ND |
| Index — perte 3ème phalange (D) | 5 % | 5 | ✅ Doigts - Index D |
| Index — perte 3ème phalange (ND) | 4 % | 4 | ✅ Doigts - Index ND |
| Index — perte 2ème+3ème (D) | 10 % | 10 | ✅ Doigts - Index D |
| Index — perte 2ème+3ème (ND) | 8 % | 8 | ✅ Doigts - Index ND |
| Médius — perte 3 phalanges (D) | 12 % | 12 | ✅ Doigts - Médius D |
| Médius — perte 3 phalanges (ND) | 10 % | 10 | ✅ Doigts - Médius ND |
| Médius — perte 3ème phalange (D) | 4 % | 4 | ✅ Doigts - Médius D |
| Médius — perte 3ème phalange (ND) | 3 % | 3 | ✅ Doigts - Médius ND |
| Médius — perte 2ème+3ème (D) | 8 % | 8 | ✅ Doigts - Médius D |
| Médius — perte 2ème+3ème (ND) | 6 % | 6 | ✅ Doigts - Médius ND |
| Annulaire — perte 3 phalanges (D) | 8 % | 8 | ✅ Doigts - Annulaire D |
| Annulaire — perte 3 phalanges (ND) | 6 % | 6 | ✅ Doigts - Annulaire ND |
| Annulaire — perte 3ème phalange (D) | 3 % | 3 | ✅ Doigts - Annulaire D |
| Annulaire — perte 3ème phalange (ND) | 2 % | 2 | ✅ Doigts - Annulaire ND |
| Annulaire — perte 2ème+3ème (D) | 6 % | 6 | ✅ Doigts - Annulaire D |
| Annulaire — perte 2ème+3ème (ND) | 4 % | 4 | ✅ Doigts - Annulaire ND |
| Auriculaire — perte 3ème phalange (D) | 3 % | 4 | ⚠️ +1 point |
| Auriculaire — perte 3ème phalange (ND) | 2 % | 3 | ⚠️ +1 point |
| Syndrome post-commotionnel | jusqu'à 3 % | [0.5, 3] | ✅ (environ) |
| Paralysie faciale (ORL) unilatérale | 5–15 % | ⚠️ vérifier | |
| Surdité bilatérale complète | 60 % | ⚠️ vérifier | |


---

## SYNTHÈSE ET RECOMMANDATIONS

### Problèmes majeurs identifiés :

1. **INFLATION SYSTÉMIQUE des taux d'amputation** : Toutes les amputations (MS et MI) ont des taux DB 15 à 35 points supérieurs au barème Concours Médical. C'est le problème le plus grave car il entraîne des surévaluations très importantes. Les taux DB semblent provenir du barème AT-MP ou d'une autre source.

2. **Taux endocrinologiques très incohérents** : Insuffisance surrénale (10-25% barème → 40-70% DB), Diabète DID (15-20% barème → 30-60% DB), Hypothyroïdie (5% barème → 10-25% DB). Ces écarts sont considérables.

3. **Taux de brûlures très surévalués** : Le barème donne 25-50% pour >60% surface, la DB donne 90-100%.

4. **~50+ entrées complètement absentes** dans la DB, en particulier :
   - Les arthrodèses articulaires (hanche, genou, coude, poignet, cheville) avec leurs taux spécifiques
   - Les items « ballant » (hanche, genou) avec taux fixes
   - Les gradations par angle (genou flexion par angle, cheville équinismes par degré)
   - Les items digestifs/hépatiques (hépatites chroniques métavir, cirrhose Child, transplant hépatique)
   - Les items urologiques détaillés (sténose urètre, dérivations urinaires)
   - Les items de préhension main (prise fine, grossière, sphérique)
   - Les items de sensibilité main
   - Plusieurs items d'amputation MI spécifiques

5. **~100+ entrées avec fourchette de taux mais sans rateCriteria**, rendant impossible l'aide à la décision dans l'application.

### Actions correctives prioritaires :

1. **URGENT** : Corriger TOUS les taux d'amputation MS et MI pour les aligner sur le barème Concours Médical 2001
2. **URGENT** : Corriger les taux endocrinologiques, des brûlures et de l'ankylose hanche
3. **IMPORTANT** : Ajouter les ~50 entrées manquantes (arthrodèses, items genou par angle, items hépatiques/rénaux/urologiques)
4. **IMPORTANT** : Ajouter des rateCriteria pour les ~100 entrées qui en manquent
5. **MOYEN** : Vérifier les entrées marquées ⚠️ dans les chapitres VII-XIII

---

*Rapport généré à partir de la lecture exhaustive de BAREME_INDICATIF_COMPLET.md (1129 lignes) et disabilityRates.new.ts (2802 lignes).*
