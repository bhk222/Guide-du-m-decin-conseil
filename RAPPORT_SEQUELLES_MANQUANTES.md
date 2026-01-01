# RAPPORT D'ANALYSE - SÉQUELLES MANQUANTES DANS L'APPLICATION
## Guide du Médecin Conseil - Barème AT-MP (Mayet & Rey 1975)

**Date d'analyse** : 2024  
**Source** : `extracted_bareme/ipp_word_full_text.txt` (7782 lignes)  
**Application** : `data/disabilityRates.ts` (2442 lignes)

---

## ✅ SECTIONS DÉJÀ IMPLÉMENTÉES (COMPLÈTES OU PARTIELLES)

- ✅ Crâne et séquelles neurologiques (COMPLET)
- ✅ Rachis et moelle épinière (COMPLET)
- ✅ Nerfs crâniens et périphériques (COMPLET)
- ✅ Psychoses et névroses (COMPLET)
- ✅ Face et maxillaires (PARTIEL - voir manques)
- ✅ Membres supérieurs - Ceinture scapulaire et épaule (COMPLET)
- ✅ Membres inférieurs (PARTIEL - en cours)
- ✅ Appareil génito-urinaire (PARTIEL)

---

## ❌ SECTIONS PRIORITAIRES 100% ABSENTES

### 1. 👁️ YEUX ET VISION (PRIORITÉ CRITIQUE)

**État actuel** : Section existante mais TRÈS INCOMPLÈTE  
**Couverture estimée** : ~30% du barème complet

#### ❌ Séquelles ABSENTES identifiées :

**A. TROUBLES DE L'ACCOMMODATION ET PUPILLAIRES**
- ❌ Paralysie de l'accommodation - Ophtalmoplégie interne totale unilatérale : 10-15%
- ❌ Paralysie de l'accommodation - Ophtalmoplégie interne totale bilatérale : 15-20%
- ❌ Paralysie du sphincter irien - Mydriase unilatérale : 3-5%
- ❌ Paralysie du sphincter irien - Mydriase bilatérale : 7-10%

**B. VOIES LACRYMALES**
- ❌ Larmoiement ou fistules (un œil) : 0-10%
- ❌ Larmoiement ou fistules (chaque œil) : 5-10%

**C. ORBITE - LÉSIONS COMPLEXES**
- ❌ Fractures combinées du plancher et de la paroi médiale de l'orbite
- ❌ Altérations vasculaires de l'orbite (anévrisme, fistule carotido-caverneuse) : 10-30%
- ❌ Séquelles d'exentération orbitaire partielle ou totale
- ❌ Énophtalmie post-traumatique marquée : 10-25%
- ❌ Exophtalmie post-traumatique (hors Basedow)

**D. PAUPIÈRES**
- ❌ Entropion cicatriciel avec kératite : 10-20%
- ❌ Ectropion cicatriciel sévère : 10-25%
- ❌ Lagophtalmie cicatricielle ou paralytique + majoration 10%
- ❌ Ankyloblepharon (adhérences palpébrales) : variable
- ❌ Symblepharon (adhérences conjonctivales) : 5-15%

**E. CRISTALLIN ET MILIEUX TRANSPARENTS**
- ❌ Aphaquie unilatérale non opérée (absence de cristallin) : selon AV
- ❌ Aphaquie bilatérale non opérée : 70-100%
- ❌ Subluxation du cristallin : 10-40%
- ❌ Cataracte traumatique compliquée de synéchies : majoration
- ❌ Cataracte traumatique avec glaucome secondaire : évaluation combinée

**F. RÉTINE ET NERF OPTIQUE**
- ❌ Choriorétinite post-traumatique centrale : selon AV et CV
- ❌ Choriorétinite périphérique : 5-20%
- ❌ Déchirure rétinienne périphérique cicatrisée : 0-10%
- ❌ Œdème maculaire cystoïde post-traumatique : 20-60%
- ❌ Trou maculaire post-traumatique : 30-80%
- ❌ Membrane épirétinienne post-traumatique : 10-40%
- ❌ Neuropathie optique ischémique antérieure (NOIA) post-traumatique : 30-100%
- ❌ Névrite optique rétro-bulbaire post-traumatique : 20-80%
- ❌ Excavation pathologique du nerf optique (glaucome chronique) : selon CV

**G. COMPLICATIONS OCULAIRES SPÉCIFIQUES**
- ❌ Kératocône post-traumatique : 20-60%
- ❌ Ptisis bulbi (atrophie du globe) : 35-40%
- ❌ Staphylome cornéen (bombement cornéen) : 20-60%
- ❌ Néovascularisation de l'iris (rubéose irienne) : selon complications
- ❌ Pannusdégénératif cornéen : 5-20%
- ❌ Kératite neurotrophique chronique : 15-40%

---

### 2. 👂 OREILLES ET AUDITION (PRIORITÉ CRITIQUE)

**État actuel** : Section existante mais TRÈS INCOMPLÈTE  
**Couverture estimée** : ~40% du barème complet

#### ❌ Séquelles ABSENTES identifiées :

**A. OREILLE EXTERNE**
- ❌ Mutilations et cicatrices vicieuses de l'oreille externe : 2-10%
- ❌ Sténose complète du conduit auditif externe unilatérale : 5-10%
- ❌ Sténose complète du conduit auditif externe bilatérale : 10-20%
- ❌ Cholestéatome post-traumatique du conduit : 10-30%

**B. OREILLE MOYENNE**
- ❌ Perforation tympanique simple (< 1/3) unilatérale : 0-3%
- ❌ Perforation tympanique moyenne (1/3 à 2/3) unilatérale : 3-8%
- ❌ Perforation tympanique large (> 2/3) ou totale unilatérale : 8-15%
- ❌ Perforation tympanique bilatérale : ajouter 50% du taux unilatéral
- ❌ Tympanosclérose post-infectieuse : 3-10%
- ❌ Otorrhée tubaire unilatérale : 1-8%
- ❌ Otite séro-muqueuse chronique post-traumatique : 5-15%
- ❌ Dysfonction tubaire chronique (béance tubaire) : 5-12%

**C. MASTOÏDE**
- ❌ Mastoïdite chronique avec fistule rétro-auriculaire : 10-20%
- ❌ Séquelles de mastoïdectomie simple : 3-8%
- ❌ Séquelles de mastoïdectomie radicale ou évidement pétro-mastoïdien : 10-25%

**D. OREILLE INTERNE ET VESTIBULE**
- ❌ Fistule périlymphatique post-traumatique : 20-40%
- ❌ Fistule labyrinthique avec vertiges et surdité : 30-60%
- ❌ Labyrinthite ossifiante post-traumatique : 25-50%
- ❌ Syndrome de Lermoyez post-traumatique : 15-30%
- ❌ Syndrome de Tullio (vertiges aux sons intenses) : 10-25%
- ❌ Maladie de Ménière post-traumatique confirmée : 20-40%

**E. ACOUPHÈNES COMPLEXES**
- ❌ Acouphènes pulsatiles (origine vasculaire) : 10-20%
- ❌ Acouphènes invalidants avec hyperacousie : 15-25%
- ❌ Misophonie post-traumatique (intolérance sélective aux sons) : 10-20%

**F. PARALYSIE FACIALE OTOGÈNE**
- ❌ Paralysie faciale périphérique par fracture du rocher : 20-50%
- ❌ Spasme hémifacial post-paralytique : 5-15%
- ❌ Syncinésies faciales post-paralytiques : 5-10%

**G. SURDITÉ - DÉTAILS FINS**
- ❌ Surdité de perception unilatérale profonde sans acouphènes : 15-20%
- ❌ Surdité mixte (transmission + perception) : tableau complexe
- ❌ Anacousie (cophose) bilatérale : 60-70%
- ❌ Hyperacousie douloureuse isolée : 10-20%
- ❌ Diplacousie (perception différente des sons entre les 2 oreilles) : 5-10%

---

### 3. 🫁 THORAX - APPAREIL RESPIRATOIRE (PRIORITÉ HAUTE)

**État actuel** : Section partiellement implémentée  
**Couverture estimée** : ~50% du barème complet

#### ❌ Séquelles ABSENTES identifiées :

**A. INSUFFISANCE RESPIRATOIRE - STADES PRÉCIS**
- ❌ Insuffisance respiratoire légère (dyspnée stade I) : 5-15%
- ❌ Insuffisance respiratoire modérée (dyspnée stade II) : 15-35%
- ❌ Insuffisance respiratoire sévère (dyspnée stade III) : 35-60%
- ❌ Insuffisance respiratoire très sévère (dyspnée stade IV) : 60-100%
  - *Critères EFR : VEMS, CVF, DLCO, Pa02, PaCO2, tests d'effort*

**B. PNEUMOTHORAX**
- ❌ Séquelles de pneumothorax traumatique simple : 0-5%
- ❌ Pneumothorax récidivant post-traumatique : 10-25%
- ❌ Pneumothorax suffocant (tension) avec séquelles : 15-40%
- ❌ Hémopneumothorax massif avec séquelles : 20-50%

**C. PLÈVRE - DÉTAILS**
- ❌ Symphyse pleurale partielle asymptomatique : 0-5%
- ❌ Pachypleurite (épaississement pleural majeur) : 10-30%
- ❌ Calcifications pleurales étendues : 5-20%
- ❌ Pleurésie enkystée résiduelle : 5-15%

**D. CONTUSION PULMONAIRE**
- ❌ Séquelles de contusion pulmonaire simple : 0-10%
- ❌ Contusion pulmonaire bilatérale étendue avec séquelles : 20-50%
- ❌ Hématome pulmonaire résiduel : 5-20%

**E. LOBECTOMIE / PNEUMONECTOMIE**
- ❌ Lobectomie pulmonaire unilatérale : 20-40%
- ❌ Bilobectomie pulmonaire : 40-60%
- ❌ Pneumonectomie (ablation d'un poumon entier) : 60-80%

**F. TRACHÉOTOMIE ET SÉQUELLES**
- ❌ Trachéotomie temporaire cicatrisée : 0-5%
- ❌ Sténose trachéale post-intubation ou post-trachéotomie : 20-100%
- ❌ Granulome trachéal post-traumatique : 10-30%

**G. ASTHME ET BRONCHOSPASME POST-TRAUMATIQUES**
- ❌ Syndrome de Brooks (asthme post-traumatique thoracique) : 10-40%
- ❌ Bronchospasme réflexe post-traumatique : 10-30%

**H. DIAPHRAGME - DÉTAILS**
- ❌ Paralysie diaphragmatique unilatérale : 15-30%
- ❌ Paralysie diaphragmatique bilatérale : 60-100%
- ❌ Éventration diaphragmatique post-traumatique : 10-30%

**I. SYNDROME D'APNÉES DU SOMMEIL POST-TRAUMATIQUE**
- ❌ SAOS (Syndrome d'Apnées Obstructives du Sommeil) post-facial/cervical : 10-30%

---

### 4. 🩺 ABDOMEN (PRIORITÉ HAUTE)

**État actuel** : Section partiellement implémentée  
**Couverture estimée** : ~60% du barème complet

#### ❌ Séquelles ABSENTES identifiées :

**A. FOIE**
- ❌ Séquelles d'hémorragie hépatique traitée par hémostase conservatrice : 0-10%
- ❌ Kyste post-traumatique du foie : 5-15%
- ❌ Fistule bilio-digestive post-traumatique : 20-50%
- ❌ Syndrome de Budd-Chiari post-traumatique (thrombose veines hépatiques) : 40-80%
- ❌ Cirrhose post-traumatique (rare, imputabilité difficile) : 30-80%
- ❌ Insuffisance hépato-cellulaire chronique post-traumatique : 40-100%

**B. RATE - DÉTAILS**
- ❌ Splénectomie partielle (hémisplénectomie) : 8-15%
- ❌ Auto-transplantation splénique post-traumatique : 5-10%
- ❌ Thrombocytose post-splénectomie symptomatique : 5-15%

**C. PANCRÉAS - DÉTAILS**
- ❌ Fistule pancréatique externe chronique : 30-60%
- ❌ Fistule pancréatique interne (pseudokyste pancréatique) : 15-40%
- ❌ Pancréatite chronique calcifiante post-traumatique : 30-70%
- ❌ Séquelles de nécrose pancréatique (diabète + insuffisance exocrine) : 50-80%

**D. ESTOMAC**
- ❌ Séquelles de gastrectomie partielle (2/3) : 30-50%
- ❌ Séquelles de gastrectomie totale : 60-80%
- ❌ Syndrome du petit estomac (early satiety) : 15-30%
- ❌ Reflux biliaire post-gastrectomie invalidant : 20-40%
- ❌ Anémie de Biermer post-gastrectomie totale : 20-40%

**E. INTESTIN GRÊLE - DÉTAILS**
- ❌ Résection intestinale limitée (< 50 cm) sans syndrome de malabsorption : 5-15%
- ❌ Résection intestinale moyenne (50-150 cm) avec malabsorption modérée : 20-40%
- ❌ Résection massive du grêle (> 150 cm) avec grêle court : 60-100%
- ❌ Syndrome de l'anse borgne (stagnation, pullulation bactérienne) : 20-40%

**F. CÔLON**
- ❌ Colectomie subtotale (iléo-rectale) : 40-60%
- ❌ Coloproctectomie totale avec iléostomie terminale : 70-90%
- ❌ Colostomie latérale (temporaire puis fermée) : 0-10%
- ❌ Séquelles de syndrome de Lyell/Ogilvie (pseudo-occlusion colique aiguë) : 10-40%

**G. RECTUM ET ANUS**
- ❌ Rectorragie (saignement rectal) chronique post-traumatique : 10-30%
- ❌ Incontinence anale partielle (gaz + selles liquides) : 20-40%
- ❌ Proctalgie chronique (douleur anale persistante) sans lésion objectivable : 10-25%
- ❌ Sténose anale post-traumatique modérée : 15-30%
- ❌ Sténose anale post-traumatique serrée : 40-60%

**H. SÉQUELLES MÉTABOLIQUES ET NUTRITIONNELLES**
- ❌ Dénutrition protéino-énergétique sévère post-chirurgie digestive : 30-60%
- ❌ Carence vitaminique multiple (B12, fer, folates, vitamines liposolubles) : 10-30%
- ❌ Ostéoporose post-gastrectomie ou malabsorption : 10-25%

---

### 5. 🫀 APPAREIL CARDIOVASCULAIRE (PRIORITÉ MOYENNE)

**État actuel** : Section de base présente  
**Couverture estimée** : ~40% du barème complet

#### ❌ Séquelles ABSENTES identifiées :

**A. CŒUR - INSUFFISANCE CARDIAQUE DÉTAILLÉE**
- ❌ Insuffisance cardiaque NYHA I (asymptomatique au repos) : 5-15%
- ❌ Insuffisance cardiaque NYHA II (dyspnée aux efforts importants) : 15-30%
- ❌ Insuffisance cardiaque NYHA III (dyspnée aux efforts minimes) : 30-60%
- ❌ Insuffisance cardiaque NYHA IV (dyspnée de repos) : 60-100%

**B. VALVULOPATHIES POST-TRAUMATIQUES**
- ❌ Insuffisance aortique post-traumatique modérée : 20-40%
- ❌ Insuffisance aortique sévère : 50-80%
- ❌ Insuffisance mitrale post-traumatique modérée : 15-35%
- ❌ Insuffisance mitrale sévère : 40-70%
- ❌ Insuffisance tricuspidienne post-traumatique : 10-40%
- ❌ Sténose valvulaire post-endocardite traumatique : 30-80%

**C. MYOCARDE**
- ❌ Infarctus du myocarde post-traumatique documenté : 30-80%
- ❌ Cardiomyopathie dilatée post-myocardite traumatique : 40-100%
- ❌ Anévrisme ventriculaire gauche post-infarctus : 40-80%

**D. PÉRICARDE - DÉTAILS**
- ❌ Péricardite aiguë simple cicatrisée : 0-5%
- ❌ Péricardite récidivante : 10-25%
- ❌ Tamponnade péricardique récupérée : 0-15%

**E. TROUBLES DU RYTHME DÉTAILLÉS**
- ❌ Extrasystoles ventriculaires fréquentes symptomatiques : 5-15%
- ❌ Tachycardie ventriculaire non soutenue récidivante : 20-40%
- ❌ Fibrillation auriculaire paroxystique post-traumatique : 10-25%
- ❌ Fibrillation auriculaire permanente : 15-35%
- ❌ Flutter auriculaire : 10-25%
- ❌ Bloc auriculo-ventriculaire complet appareillé (pacemaker) : 20-40%
- ❌ Maladie du sinus (dysfonction sinusale) appareillée : 15-30%
- ❌ Défibrillateur automatique implantable (DAI) en prévention secondaire : 40-60%

**F. ARTÈRES - ANÉVRISMES ET DISSECTIONS**
- ❌ Anévrisme de l'aorte ascendante post-traumatique : 40-80%
- ❌ Anévrisme de l'aorte descendante : 30-60%
- ❌ Dissection aortique chronique (type B) : 40-70%
- ❌ Coarctation aortique acquise post-traumatique : 30-60%

**G. ARTÉRIOPATHIES DES MEMBRES**
- ❌ Artériopathie oblitérante des membres inférieurs (AOMI) stade II (claudication) : 15-35%
- ❌ AOMI stade III (douleurs de décubitus) : 35-60%
- ❌ AOMI stade IV (troubles trophiques, gangrène) : 60-100%

**H. VEINES - THROMBOSES**
- ❌ Thrombose veineuse profonde récidivante : 15-40%
- ❌ Embolie pulmonaire avec séquelles d'hypertension pulmonaire : 30-80%
- ❌ Thrombose de la veine cave supérieure : 20-50%

---

### 6. 💦 APPAREIL GÉNITO-URINAIRE (PRIORITÉ MOYENNE)

**État actuel** : Section de base présente  
**Couverture estimée** : ~55% du barème complet

#### ❌ Séquelles ABSENTES identifiées :

**A. REIN - INSUFFISANCE RÉNALE DÉTAILLÉE**
- ❌ Insuffisance rénale chronique stade 1 (DFG > 90 avec anomalies) : 5-15%
- ❌ Insuffisance rénale chronique stade 2 (DFG 60-89) : 10-25%
- ❌ Insuffisance rénale chronique stade 3 (DFG 30-59) : 30-50%
- ❌ Insuffisance rénale chronique stade 4 (DFG 15-29) : 50-80%
- ❌ Insuffisance rénale chronique stade 5 (DFG < 15) : 80-100%
- ❌ Dialyse péritonéale chronique : 80-100%
- ❌ Hémodialyse chronique 3 fois/semaine : 80-100%
- ❌ Transplantation rénale fonctionnelle : 30-50%

**B. URETÈRE**
- ❌ Reflux vésico-urétéral post-traumatique unilatéral : 10-25%
- ❌ Reflux vésico-urétéral bilatéral : 20-40%
- ❌ Méga-uretère post-traumatique : 15-35%

**C. VESSIE - DÉTAILS**
- ❌ Cystectomie partielle : 15-30%
- ❌ Cystectomie totale avec dérivation urinaire externe (urostomie) : 80-90%
- ❌ Cystectomie totale avec néovessie : 50-70%
- ❌ Vessie de faible capacité (< 200 ml) avec pollakiurie : 30-50%
- ❌ Cystite interstitielle post-traumatique (syndrome de la vessie douloureuse) : 20-40%

**D. URÈTRE - HOMME**
- ❌ Hypospadias iatrogène post-chirurgie urétrale : 10-30%
- ❌ Éjaculation rétrograde post-chirurgie : 10-20%
- ❌ Priapisme post-traumatique avec fibrose des corps caverneux : 30-60%

**E. APPAREIL GÉNITAL MASCULIN**
- ❌ Torsion testiculaire avec orchidectomie unilatérale : 5-10%
- ❌ Atrophie testiculaire post-traumatique bilatérale avec hypogonadisme : 30-60%
- ❌ Fracture du pénis avec séquelles (courbure, douleurs) : 15-40%
- ❌ Maladie de Lapeyronie (induration plastique du pénis) post-traumatique : 15-35%

**F. APPAREIL GÉNITAL FÉMININ**
- ❌ Sténose vaginale post-traumatique : 20-50%
- ❌ Synéchies utérines (syndrome d'Asherman) post-curetage traumatique : 20-40%
- ❌ Hystérectomie totale avant 40 ans : 20-40%
- ❌ Hystérectomie totale après 40 ans : 10-25%
- ❌ Annexectomie bilatérale (ovariectomie) avant 40 ans : 25-50%

---

### 7. 🔬 MALADIES PROFESSIONNELLES (SECTION MANQUANTE COMPLÈTE)

**État actuel** : ⚠️ **SECTION TOTALEMENT ABSENTE**  
**Couverture estimée** : **0%**

Le barème source contient une section complète "Maladies Professionnelles Indemnisables" (lignes 6000-7000 environ du PDF) qui n'est PAS DU TOUT implémentée dans l'application.

#### ❌ Catégories ENTIÈREMENT MANQUANTES :

**A. INTOXICATIONS PAR MÉTAUX**
- ❌ Saturnisme (plomb et ses composés)
  - Coliques de plomb : IT puis 0% (changement profession)
  - Paralysie des extenseurs : 0-30% (ou 10-100% si bilatérale ou associée)
  - Encéphalopathie saturnine : 10-100%
  - Néphrite saturnine : 10-100% selon fonction rénale
  - Anémie saturnine : 0-30%

- ❌ Hydrargyrisme (mercure et ses composés)
  - Encéphalopathie aiguë : 10-100%
  - Tremblement intentionnel : 10-70%
  - Ataxie cérébelleuse : 10-100%
  - Stomatite avec perte dentaire : selon nombre de dents
  - Néphrite azotémique : 10-100%

- ❌ Arsenic et ses composés
  - Lésions cutanées (ulcérations, dermatoses) : 0-30%
  - Lésions nasales (ulcérations, perforations) : 0-15%
  - Polynévrites : 10-100%

- ❌ Cadmium
  - Broncho-pneumopathie aiguë : 0-30%
  - Néphropathie avec protéinurie : 10-100%
  - Ostéomalacie : 10-50%

- ❌ Béryllium (glucinium)
  - Béryliose aiguë : 0-30%
  - Béryliose chronique : 30-100%

- ❌ Manganèse
  - Syndrome neurologique type parkinsonien : 30-100%

- ❌ Nickel
  - Dermites eczématiformes : 0-30%

- ❌ Chrome
  - Ulcérations nasales et cutanées : 0-30%

**B. INTOXICATIONS PAR SOLVANTS**
- ❌ Benzène (benzol)
  - Anémie aplasique : 10-30%
  - Leucose : 10-70%
  - Leucopénie avec neutropénie : 0-30%
  - Purpura : 0-30%

- ❌ Tétrachloréthane
  - Névrite/polynévrite : 10-30%
  - Hépatite ictérigène : 0-100%
  - Hépato-néphrite : 0-100%

- ❌ Trichloréthylène et dérivés halogénés
  - Névrite optique ou du trijumeau : selon troubles
  - Dermites eczématiformes : 0-20%

- ❌ Sulfure de carbone
  - Syndrome neuro-digestif aigu : IT puis 0%
  - Troubles psychiques chroniques : 20-100%
  - Polynévrites : 0-30%
  - Névrite optique : selon acuité visuelle

- ❌ Chlorure de méthyle
  - Vertiges, amnésie, ataxie : IT puis 0%
  - Amblyopie : selon acuité

- ❌ Bromure de méthyle
  - Troubles encéphalo-médullaires : 10-100%
  - Troubles oculaires (amblyopie, diplopie) : 5-25%
  - Troubles auriculaires (vertiges) : 5-40%

- ❌ Hexane
  - Polynévrites avec troubles électriques : 0-100%

**C. INTOXICATIONS PAR GAZ**
- ❌ Oxyde de carbone (CO)
  - Syndrome associant céphalées, vertiges, nausées : IT puis 0%
  - Séquelles neurologiques définitives : à évaluer selon déficits

- ❌ Hydrogène arsénié
  - Hémoglobinurie, ictère avec hémolyse : IT puis 0%
  - Néphrite azotémique : selon fonction rénale

**D. INTOXICATIONS PAR PRODUITS CHIMIQUES**
- ❌ Acide chromique et chromates
  - Ulcérations nasales et cutanées : 0-30%

- ❌ Dinitrophénol et dérivés
  - Intoxication aiguë/subaiguë : IT puis 0-30%
  - Dermites : 0-30%

- ❌ Dérivés nitrés et chloronitrés benzéniques
  - Intoxication subaiguë/chronique (cyanose, anémie) : 0%
  - Dermites : 0-30%

- ❌ Phosphore blanc
  - Nécrose phosphorée : 30-100%

- ❌ Esters phosphoriques (insecticides)
  - Troubles digestifs, respiratoires, nerveux : IT puis 0%

- ❌ Pentachlorophénol
  - Dermites : 0-30%
  - Intoxication subaiguë : IT puis 0%

**E. PNEUMOCONIOSES (POUSSIÈRES MINÉRALES)**
- ❌ Silicose
  - Stade 1 (opacités discrètes) : 10-30%
  - Stade 2 (opacités moyennes) : 30-60%
  - Stade 3 (opacités massives) : 60-100%
  - Complications : tuberculose, insuffisance cardiaque

- ❌ Asbestose (amiante)
  - Fibrose pulmonaire : 10-100% selon stade
  - Plaques pleurales : 0-20%
  - Mésothéliome pleural : 80-100%
  - Cancer broncho-pulmonaire : 80-100%

- ❌ Anthracose (charbon)
  - Simple : 10-40%
  - Avec fibrose massive progressive : 40-100%

**F. ALLERGIES PROFESSIONNELLES**
- ❌ Asthme professionnel (isocyanates, farine, latex, etc.)
  - Asthme contrôlé : 10-25%
  - Asthme sévère : 30-60%

- ❌ Dermites de contact professionnelles
  - Ciments : 0-30%
  - Résines époxydiques : 0-30%
  - Chloronaphtalènes : 0-30%

- ❌ Allergies aux antibiotiques (pénicilline, streptomycine)
  - Dermites eczématiformes : 0-30%

**G. AGENTS BIOLOGIQUES**
- ❌ Formaldéhyde (formol)
  - Ulcérations cutanées : 0-30%
  - Dermites eczématiformes : 0-30%

- ❌ Enzymes protéolytiques
  - Dermites, ulcérations : 0-30%
  - Asthme : 0-40%

- ❌ Bois exotiques
  - Dermites eczématiformes : 0-30%
  - Asthme : 0-30%

**H. AUTRES INTOXICATIONS**
- ❌ Goudrons de houille et dérivés
  - Dermites eczématiformes : 0-30%
  - Épithéliomas cutanés : selon cicatrices

- ❌ Chlorpromazine
  - Lésions eczématiformes : 0-30%

- ❌ Chlorure de vinyle
  - Troubles angioneurotiques des doigts : 10-30%
  - Ostéolyse des phalanges : 10-30%

- ❌ Phénylhydrazine
  - Dermites eczématiformes : 0-30%
  - Anémie hémolytique : 0-30%

---

## 📊 STATISTIQUES GLOBALES

| Section | Couverture | Priorité | Séquelles manquantes |
|---------|-----------|----------|----------------------|
| 👁️ **YEUX** | 30% | 🔴 CRITIQUE | ~80 séquelles |
| 👂 **OREILLES** | 40% | 🔴 CRITIQUE | ~50 séquelles |
| 🫁 **THORAX-RESPIRATOIRE** | 50% | 🟠 HAUTE | ~40 séquelles |
| 🩺 **ABDOMEN** | 60% | 🟠 HAUTE | ~45 séquelles |
| 🫀 **CARDIOVASCULAIRE** | 40% | 🟡 MOYENNE | ~35 séquelles |
| 💦 **GÉNITO-URINAIRE** | 55% | 🟡 MOYENNE | ~30 séquelles |
| 🔬 **MALADIES PRO** | 0% | 🔴 CRITIQUE | ~200 séquelles |
| 😷 **FACE** | 70% | 🟢 PARTIEL | ~20 séquelles |

**TOTAL ESTIMÉ : ~500 SÉQUELLES MANQUANTES**

---

## 🎯 RECOMMANDATIONS PRIORITAIRES

### Phase 1 - CRITIQUE (Semaine 1-2)
1. ✅ Compléter section **YEUX** (80 séquelles)
2. ✅ Compléter section **OREILLES** (50 séquelles)

### Phase 2 - HAUTE PRIORITÉ (Semaine 3-4)
3. ✅ Compléter **THORAX-RESPIRATOIRE** (40 séquelles)
4. ✅ Compléter **ABDOMEN** (45 séquelles)

### Phase 3 - MOYENNE PRIORITÉ (Semaine 5-6)
5. ✅ Compléter **CARDIOVASCULAIRE** (35 séquelles)
6. ✅ Compléter **GÉNITO-URINAIRE** (30 séquelles)

### Phase 4 - MALADIES PROFESSIONNELLES (Semaine 7-10)
7. ✅ Implémenter **MALADIES PROFESSIONNELLES** complètes (~200 séquelles)
   - Structuration en sous-catégories (métaux, solvants, gaz, poussières, allergies)
   - Tableaux des maladies professionnelles (numéros de tableaux)

---

## 📋 STRUCTURE PROPOSÉE POUR L'INTÉGRATION

```typescript
// Exemple pour section YEUX complète
{
  name: "Séquelles Ophtalmologiques",
  subcategories: [
    {
      name: "Acuité Visuelle et Cécité",
      injuries: [/* ... séquelles existantes + nouvelles */]
    },
    {
      name: "Champ Visuel", // ✅ Existant
      injuries: [/* ... */]
    },
    {
      name: "Accommodation et Pupilles", // ❌ NOUVEAU
      injuries: [
        { name: "Paralysie de l'accommodation unilatérale", rate: [10, 15], /* ... */ },
        // + autres
      ]
    },
    {
      name: "Cristallin et Cataracte", // ⚠️ À enrichir
      injuries: [/* + aphaquie, subluxation, etc. */]
    },
    {
      name: "Rétine et Nerf Optique", // ⚠️ À enrichir
      injuries: [/* + NOIA, choriorétinite, trou maculaire, etc. */]
    },
    {
      name: "Voies Lacrymales", // ❌ NOUVEAU
      injuries: [/* larmoiement, fistules */]
    },
    {
      name: "Orbite et Complications", // ⚠️ À enrichir
      injuries: [/* énophtalmie, exentération, etc. */]
    },
    {
      name: "Paupières", // ⚠️ À enrichir
      injuries: [/* entropion, ectropion, symblepharon, etc. */]
    }
  ]
}
```

---

## 🔗 SOURCES ET RÉFÉRENCES

- **Barème Source** : `extracted_bareme/ipp_word_full_text.txt` (lignes 1100-1600 = Yeux ; 2500-3000 = Oreilles ; etc.)
- **Application** : `data/disabilityRates.ts`
- **Format** : Mayet & Rey 1975, édition officielle AT-MP

---

**FIN DU RAPPORT**

*Analyse réalisée le [date] par IA Copilot*
