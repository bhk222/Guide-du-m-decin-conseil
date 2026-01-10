import { InjuryCategory } from '../types';

export const disabilityData: InjuryCategory[] = [
  // NOUVELLE STRUCTURE BASÉE SUR LE BARÈME OFFICIEL PDF
  {
    name: "Séquelles Crâniennes, Neurologiques et Psychiatriques",
    subcategories: [
      {
        name: "Cuir Chevelu",
        injuries: [
          { name: "Lésions du cuir chevelu avec phénomènes douloureux, sans brèche osseuse", searchTerms: ["lésions cuir chevelu avec phénomènes douloureux, sans brèche osseuse", "osseuse brèche sans douloureux, phénomènes avec chevelu cuir lésions", "lésions cuir chevelu phénomènes douloureux, brèche osseuse", "lésions cuir", "cuir chevelu"], rate: [0, 15], rateCriteria: { low: "Cicatrices souples, indolores, pas de gêne esthétique.", medium: "Cicatrices sensibles ou légèrement douloureuses à la pression.", high: "Névralgies post-traumatiques persistantes, cicatrices inesthétiques et douloureuses." } },
          { name: "Scalp ou brûlures du cuir chevelu avec cicatrices douloureuses", searchTerms: ["scalp brûlures cuir chevelu avec cicatrices douloureuses", "douloureuses cicatrices avec chevelu cuir brûlures scalp", "scalp brûlures cuir chevelu cicatrices douloureuses", "scalp brûlures", "brûlures cuir"], rate: [5, 20], rateCriteria: { low: "Cicatrice souple, peu étendue, sensibilité conservée.", medium: "Cicatrice adhérente, alopécique, avec dysesthésies.", high: "Cicatrice étendue, rétractile, douloureuse, avec alopécie majeure et retentissement psychologique." } },
          { name: "Perte de cheveux post-traumatique (si gêne le travail)", searchTerms: ["perte cheveux post traumatique gêne travail", "amputation cheveux post traumatique gêne travail", "travail gêne traumatique post cheveux perte", "perte cheveux", "cheveux post"], rate: [4, 6] },
        ]
      },
      {
        name: "Crâne - Lésions Osseuses",
        injuries: [
          { name: "Enfoncement de la seule table externe", searchTerms: ["enfoncement seule table externe", "externe table seule enfoncement", "enfoncement seule", "seule table", "table externe"], rate: [0, 10], rateCriteria: { low: "Asymptomatique, non palpable, découverte radiologique.", high: "Déformation palpable, céphalées localisées." } },
          { name: "Brèche osseuse (1 à 4 cm²)", searchTerms: ["brèche osseuse cm²", "cm² osseuse brèche", "brèche osseuse", "osseuse cm²"], rate: 20 },
          { name: "Brèche osseuse avec battements duremériens (jusqu'à 12 cm²)", searchTerms: ["brèche osseuse avec battements duremériens jusqu'à cm²", "cm² jusqu'à duremériens battements avec osseuse brèche", "brèche osseuse battements duremériens jusqu'à cm²", "brèche osseuse", "osseuse avec"], rate: [20, 50], rateCriteria: { low: "Petite brèche (< 4cm²), bien tolérée, sans signe neurologique.", medium: "Brèche de taille moyenne, sensation de pulsation, céphalées d'effort.", high: "Large brèche (> 8cm²), risque de complications (méningite), nécessité de cranioplastie, retentissement psychologique." } },
          { name: "Brèche osseuse (> 12 cm²) avec troubles subjectifs", searchTerms: ["brèche osseuse cm² avec troubles subjectifs", "subjectifs troubles avec cm² osseuse brèche", "brèche osseuse cm² troubles subjectifs", "brèche osseuse", "osseuse cm²"], rate: [50, 70], rateCriteria: { low: "Syndrome subjectif modéré, bien contrôlé par traitement.", high: "Syndrome post-commotionnel sévère, invalidant, avec risque de complications (épilepsie)." } },
          { name: "Fistule de liquide céphalo-rachidien (LCR) persistante (otorrhée ou rhinorrhée)", searchTerms: ["fistule liquide céphalo rachidien lcr persistante otorrhée rhinorrhée", "rhinorrhée otorrhée persistante lcr rachidien céphalo liquide fistule", "fistule liquide", "liquide céphalo", "céphalo rachidien"], rate: [30, 60], description: "Communication anormale entre les espaces méningés et les cavités nasales ou de l'oreille, suite à une fracture de la base du crâne.", rateCriteria: { low: "Fistule de bas débit, intermittente, ayant nécessité une prise en charge médicale simple (repos, ponctions lombaires).", high: "Fistule à haut débit, persistante, nécessitant une ou plusieurs interventions chirurgicales complexes, avec risque élevé de méningite." } },
        ]
      },
      {
        name: "Syndrome Post-Commotionnel",
        injuries: [
          { name: "Syndrome subjectif commun des blessures du crâne (céphalée, vertiges, troubles de l'humeur)", searchTerms: ["syndrome subjectif commun des blessures crâne céphalée, vertiges, troubles l'humeur", "l'humeur troubles vertiges, céphalée, crâne blessures des commun subjectif syndrome", "syndrome subjectif commun blessures crâne céphalée, vertiges, troubles l'humeur", "syndrome subjectif", "subjectif commun"], rate: [5, 50], rateCriteria: { low: "Céphalées et vertiges occasionnels, sans retentissement sur les activités.", medium: "Symptômes fréquents, nécessitant un traitement ponctuel, gêne dans les activités complexes.", high: "Syndrome invalidant quasi-permanent avec retentissement socio-professionnel majeur." } },
          { name: "Céphalées post-traumatiques chroniques", searchTerms: ["céphalées post traumatiques chroniques", "chroniques traumatiques post céphalées", "céphalées post", "post traumatiques", "traumatiques chroniques"], rate: [5, 20], rateCriteria: { low: "Crises occasionnelles (< 4 jours/mois), répondant bien aux antalgiques usuels, sans impact sur les activités.", medium: "Crises fréquentes (4-14 jours/mois), nécessitant un traitement de fond, avec retentissement modéré sur les activités professionnelles.", high: "Céphalées quasi-quotidiennes (> 15 jours/mois), rebelles au traitement, avec un retentissement socio-professionnel et personnel majeur." } },
          { name: "Persistance de corps étranger intra-crânien sans phénomène surajouté", searchTerms: ["persistance corps étranger intra crânien sans phénomène surajouté", "surajouté phénomène sans crânien intra étranger corps persistance", "persistance corps étranger intra crânien phénomène surajouté", "persistance corps", "corps étranger"], rate: [20, 60], rateCriteria: { low: "Corps étranger de petite taille, dans une zone non critique, asymptomatique.", high: "Corps étranger volumineux, proche de structures nobles, risque de complications (épilepsie, infection)." } },
          { name: "Syndrome subjectif isolé (céphalées et étourdissements)", searchTerms: ["syndrome subjectif isolé céphalées étourdissements", "étourdissements céphalées isolé subjectif syndrome", "syndrome subjectif", "subjectif isolé", "isolé céphalées"], rate: [5, 10] },
          { name: "Commotion cérébro-spinale prolongée (syndrome complet)", searchTerms: ["commotion cérébro spinale prolongée syndrome complet", "complet syndrome prolongée spinale cérébro commotion", "commotion cérébro", "cérébro spinale", "spinale prolongée"], rate: [5, 60], rateCriteria: { low: "Syndrome subjectif léger persistant au-delà de 3 mois.", medium: "Syndrome subjectif marqué avec retentissement sur les activités quotidiennes.", high: "Syndrome post-commotionnel sévère et invalidant, avec troubles cognitifs objectifs." } },
          { name: "Contusions cérébrales avec signes de localisation (hémiparésie, aphasie...)", description: "À évaluer avec les blessures du cerveau.", rate: [5, 60], rateCriteria: { low: "Séquelles minimes (ex: parésie légère, dysarthrie discrète).", high: "Séquelles importantes (hémiparésie invalidante, aphasie sévère)." } },
          { name: "Déficits cognitifs post-traumatiques (mémoire, attention, fonctions exécutives)", searchTerms: ["déficits cognitifs post traumatiques mémoire, attention, fonctions exécutives", "exécutives fonctions attention, mémoire, traumatiques post cognitifs déficits", "déficits cognitifs", "cognitifs post", "post traumatiques"], rate: [10, 40], rateCriteria: { low: "Plaintes subjectives avec gêne légère dans les tâches complexes, sans impact majeur sur l'autonomie.", high: "Troubles objectifs confirmés par bilan neuropsychologique, avec retentissement significatif sur la vie professionnelle et quotidienne." } },
          { name: "Syndrome dysexécutif post-traumatique (troubles de la planification, inhibition)", searchTerms: ["syndrome dysexécutif post traumatique troubles planification, inhibition", "inhibition planification, troubles traumatique post dysexécutif syndrome", "syndrome dysexécutif", "dysexécutif post", "post traumatique"], rate: [20, 50], rateCriteria: { low: "Difficultés d'organisation et de double-tâche, avec fatigabilité intellectuelle.", high: "Troubles majeurs du comportement (inhibition, apathie) avec perte d'autonomie sociale." } }
        ]
      },
      {
        name: "Épilepsies Post-Traumatiques",
        injuries: [
          { name: "Crises convulsives généralisées (non jacksoniennes)", searchTerms: ["crises convulsives généralisées non jacksoniennes", "jacksoniennes non généralisées convulsives crises", "crises convulsives", "convulsives généralisées", "généralisées non"], rate: [30, 100], rateCriteria: { low: "Crises rares (annuelles), bien contrôlées par monothérapie.", high: "Crises fréquentes et pharmacorésistantes, avec retentissement social et professionnel majeur." } },
          { name: "Crises convulsives généralisées rares", searchTerms: ["crises convulsives généralisées rares", "rares généralisées convulsives crises", "crises convulsives", "convulsives généralisées", "généralisées rares"], rate: [20, 30] },
          { name: "Équivalents épileptiques (absences, vertiges) - 1 à 3 fois par an", searchTerms: ["équivalents épileptiques absences, vertiges fois par", "par fois vertiges absences, épileptiques équivalents", "équivalents épileptiques", "épileptiques absences,", "absences, vertiges"], rate: [0, 10] },
          { name: "Équivalents épileptiques - une fois par mois", searchTerms: ["équivalents épileptiques une fois par mois", "mois par fois une épileptiques équivalents", "équivalents épileptiques", "épileptiques une", "une fois"], rate: [10, 20] },
          { name: "Équivalents épileptiques - une fois par semaine", searchTerms: ["équivalents épileptiques une fois par semaine", "semaine par fois une épileptiques équivalents", "équivalents épileptiques", "épileptiques une", "une fois"], rate: [20, 30] },
          { name: "Équivalents épileptiques - trois fois par semaine", searchTerms: ["équivalents épileptiques trois fois par semaine", "semaine par fois trois épileptiques équivalents", "équivalents épileptiques", "épileptiques trois", "trois fois"], rate: [40, 50] },
          { name: "Équivalents épileptiques - très fréquents avec manifestations graves", searchTerms: ["équivalents épileptiques très fréquents avec manifestations graves", "graves manifestations avec fréquents très épileptiques équivalents", "équivalents épileptiques très fréquents manifestations graves", "équivalents épileptiques", "épileptiques très"], rate: [40, 80] },
          { name: "Crises jacksoniennes limitées - jusqu'à 12 fois par an", searchTerms: ["crises jacksoniennes limitées jusqu'à fois par", "par fois jusqu'à limitées jacksoniennes crises", "crises jacksoniennes", "jacksoniennes limitées", "limitées jusqu'à"], rate: [0, 10] },
          { name: "Crises jacksoniennes limitées - jusqu'à 1 fois par semaine", searchTerms: ["crises jacksoniennes limitées jusqu'à fois par semaine", "semaine par fois jusqu'à limitées jacksoniennes crises", "crises jacksoniennes", "jacksoniennes limitées", "limitées jusqu'à"], rate: [10, 20] },
          { name: "Crises jacksoniennes limitées - plusieurs fois par semaine", searchTerms: ["crises jacksoniennes limitées plusieurs fois par semaine", "semaine par fois plusieurs limitées jacksoniennes crises", "crises jacksoniennes", "jacksoniennes limitées", "limitées plusieurs"], rate: [20, 30] },
          { name: "Crises jacksoniennes étendues - jusqu'à 12 fois par an", searchTerms: ["crises jacksoniennes étendues jusqu'à fois par", "par fois jusqu'à étendues jacksoniennes crises", "crises jacksoniennes", "jacksoniennes étendues", "étendues jusqu'à"], rate: [10, 20] },
          { name: "Crises jacksoniennes étendues - jusqu'à 1 fois par semaine", searchTerms: ["crises jacksoniennes étendues jusqu'à fois par semaine", "semaine par fois jusqu'à étendues jacksoniennes crises", "crises jacksoniennes", "jacksoniennes étendues", "étendues jusqu'à"], rate: [20, 30] },
          { name: "Crises jacksoniennes étendues - plusieurs fois par semaine", searchTerms: ["crises jacksoniennes étendues plusieurs fois par semaine", "semaine par fois plusieurs étendues jacksoniennes crises", "crises jacksoniennes", "jacksoniennes étendues", "étendues plusieurs"], rate: [20, 40] },
        ]
      },
      {
        name: "Syndromes Neurologiques Spécifiques",
        injuries: [
          { name: "Syndrome Cérébelleux Unilatéral (Côté Droit)", searchTerms: ["syndrome cérébelleux unilatéral côté droit", "droit côté unilatéral cérébelleux syndrome", "syndrome cérébelleux", "cérébelleux unilatéral", "unilatéral côté"], rate: [10, 80] },
          { name: "Syndrome Cérébelleux Unilatéral (Côté Gauche)", searchTerms: ["syndrome cérébelleux unilatéral côté gauche", "gauche côté unilatéral cérébelleux syndrome", "syndrome cérébelleux", "cérébelleux unilatéral", "unilatéral côté"], rate: [10, 75] },
          { name: "Syndrome Cérébelleux Bilatéral", searchTerms: ["syndrome cérébelleux bilatéral", "bilatéral cérébelleux syndrome", "syndrome cérébelleux", "cérébelleux bilatéral"], rate: [30, 100] },
          { name: "Syndrome de Parkinson Post-Traumatique", searchTerms: ["syndrome parkinson post traumatique", "traumatique post parkinson syndrome", "syndrome parkinson", "parkinson post", "post traumatique"], rate: [10, 100] },
          { name: "Mouvements anormaux post-traumatiques (dystonie, chorée, tremblements)", searchTerms: ["mouvements anormaux post traumatiques dystonie, chorée, tremblements", "tremblements chorée, dystonie, traumatiques post anormaux mouvements", "mouvements anormaux", "anormaux post", "post traumatiques"], rate: [15, 60], description: "Apparition de mouvements involontaires (postures anormales, tremblements de repos ou d'action, mouvements brusques) après un traumatisme crânien ou périphérique.", rateCriteria: { low: "Mouvements discrets, intermittents, n'entraînant qu'une gêne mineure dans les activités.", medium: "Mouvements modérés et fréquents, contrôlés partiellement par le traitement, avec un retentissement sur les gestes fins ou la marche.", high: "Mouvements invalidants, permanents, rebelles au traitement, avec un retentissement majeur sur l'autonomie." } },
          { name: "Torticolis Traumatique", searchTerms: ["torticolis traumatique"], rate: [15, 20] },
          { name: "Insuffisance Antéhypophysaire (Hypopituitarisme) Post-Traumatique", searchTerms: ["insuffisance antéhypophysaire hypopituitarisme post traumatique", "traumatique post hypopituitarisme antéhypophysaire insuffisance", "insuffisance antéhypophysaire", "antéhypophysaire hypopituitarisme", "hypopituitarisme post"], rate: [40, 80], description: "Déficits hormonaux multiples suite à un traumatisme crânien grave.", rateCriteria: { low: "Atteinte d'un ou deux axes hormonaux, bien substituée par traitement, avec peu de retentissement.", high: "Panhypopituitarisme nécessitant une poly-substitution hormonale (thyroïde, surrénale, gonadique), avec impact majeur sur l'état général et la qualité de vie." } },
          { name: "Diabète Insipide Post-Traumatique", searchTerms: ["diabète insipide post traumatique", "traumatique post insipide diabète", "diabète insipide", "insipide post", "post traumatique"], rate: [15, 30], description: "Trouble de la régulation de l'eau par déficit en hormone antidiurétique (ADH) après un traumatisme crânien.", rateCriteria: { low: "Forme partielle, bien contrôlée par traitement médicamenteux (Minirin), avec syndrome polyuro-polydipsique modéré.", high: "Forme complète avec polyurie majeure (> 5L/jour) et soif intense, nécessitant un traitement à vie et contraignant." } },
          { name: "Narcolepsie-cataplexie post-traumatique", searchTerms: ["narcolepsie cataplexie post traumatique", "traumatique post cataplexie narcolepsie", "narcolepsie cataplexie", "cataplexie post", "post traumatique"], rate: [30, 60], description: "Trouble du sommeil rare mais grave, déclenché par un traumatisme crânien, caractérisé par une somnolence diurne excessive et des pertes brutales du tonus musculaire (cataplexie).", rateCriteria: { low: "Somnolence diurne modérée, crises de cataplexie rares et partielles, bien contrôlées par le traitement.", high: "Somnolence diurne invalidante avec accès de sommeil incoercibles, et cataplexie fréquente, avec retentissement socio-professionnel majeur." } },
          { name: "Hydrocéphalie à pression normale post-traumatique", searchTerms: ["hydrocéphalie pression normale post traumatique", "traumatique post normale pression hydrocéphalie", "hydrocéphalie pression", "pression normale", "normale post"], rate: [40, 80], description: "Trouble de la circulation du LCR après un traumatisme crânien, entraînant la triade : troubles de la marche, troubles cognitifs, incontinence urinaire.", rateCriteria: { low: "Symptômes modérés, partiellement améliorés par une dérivation ventriculo-péritonéale (DVP).", high: "Triade complète et sévère, peu ou pas améliorée par la DVP, avec dépendance majeure." } },
          { name: "Fistule carotido-caverneuse post-traumatique", searchTerms: ["fistule carotido caverneuse post traumatique", "traumatique post caverneuse carotido fistule", "fistule carotido", "carotido caverneuse", "caverneuse post"], rate: [20, 50], description: "Communication anormale entre l'artère carotide interne et le sinus caverneux dans le crâne.", rateCriteria: { low: "Fistule de bas débit, avec signes oculaires modérés (chémosis, souffle), traitée avec succès par voie endovasculaire.", high: "Fistule à haut débit avec exophtalmie pulsatile, perte de vision, et/ou complications neurologiques, malgré le traitement." } },
          { name: "Séquelles neurologiques centrales d'une embolie graisseuse post-traumatique", searchTerms: ["séquelles neurologiques centrales d'une embolie graisseuse post traumatique", "traumatique post graisseuse embolie d'une centrales neurologiques séquelles", "séquelles neurologiques", "neurologiques centrales", "centrales d'une"], rate: [20, 80], description: "Déficits neurologiques permanents (cognitifs, moteurs, visuels...) après un syndrome d'embolie graisseuse (souvent suite à une fracture d'un os long).", rateCriteria: { low: "Troubles cognitifs légers (syndrome dysexécutif) sans déficit moteur majeur.", high: "Déficits multiples et sévères (syndrome démentiel, troubles moteurs invalidants) avec perte d'autonomie." } },
        ]
      },
      {
        name: "Hémiplégies et Monoplégies (Origine Cérébrale)",
        injuries: [
          { name: "Hémiplégie complète flasque (persistant > 6 mois)", searchTerms: ["hémiplégie complète flasque persistant mois", "mois persistant flasque complète hémiplégie", "hémiplégie complète", "complète flasque", "flasque persistant"], rate: 100 },
          { name: "Hémiplégie complète avec contracture (Côté Droit)", searchTerms: ["hémiplégie complète avec contracture côté droit", "droit côté contracture avec complète hémiplégie", "hémiplégie complète contracture côté droit", "hémiplégie complète", "complète avec"], rate: [70, 80] },
          { name: "Hémiplégie complète avec contracture (Côté Gauche)", searchTerms: ["hémiplégie complète avec contracture côté gauche", "gauche côté contracture avec complète hémiplégie", "hémiplégie complète contracture côté gauche", "hémiplégie complète", "complète avec"], rate: [50, 70] },
          { name: "Hémiplégie complète avec troubles sphinctériens", searchTerms: ["hémiplégie complète avec troubles sphinctériens", "sphinctériens troubles avec complète hémiplégie", "hémiplégie complète troubles sphinctériens", "hémiplégie complète", "complète avec"], rate: [80, 100] },
          { name: "Hémiplégie complète avec aphasie", searchTerms: ["hémiplégie complète avec aphasie", "aphasie avec complète hémiplégie", "hémiplégie complète aphasie", "hémiplégie complète", "complète avec"], rate: 100 },
          { name: "Hémiplégie incomplète (Côté Droit)", searchTerms: ["hémiplégie incomplète côté droit", "droit côté incomplète hémiplégie", "hémiplégie incomplète", "incomplète côté", "côté droit"], rate: [10, 60] },
          { name: "Hémiplégie incomplète (Côté Gauche)", searchTerms: ["hémiplégie incomplète côté gauche", "gauche côté incomplète hémiplégie", "hémiplégie incomplète", "incomplète côté", "côté gauche"], rate: [8, 50] },
          { name: "Monoplégie complète - Membre supérieur droit", searchTerms: ["monoplégie complète membre supérieur droit", "droit supérieur membre complète monoplégie", "monoplégie complète", "complète membre", "membre supérieur"], rate: [70, 75] },
          { name: "Monoplégie complète - Membre supérieur gauche", searchTerms: ["monoplégie complète membre supérieur gauche", "gauche supérieur membre complète monoplégie", "monoplégie complète", "complète membre", "membre supérieur"], rate: [60, 65] },
          { name: "Monoplégie incomplète - Membre supérieur droit", searchTerms: ["monoplégie incomplète membre supérieur droit", "droit supérieur membre incomplète monoplégie", "monoplégie incomplète", "incomplète membre", "membre supérieur"], rate: [10, 50] },
          { name: "Monoplégie incomplète - Membre supérieur gauche", searchTerms: ["monoplégie incomplète membre supérieur gauche", "gauche supérieur membre incomplète monoplégie", "monoplégie incomplète", "incomplète membre", "membre supérieur"], rate: [10, 40] },
          { name: "Monoplégie incomplète - Membre inférieur (lésion corticale)", searchTerms: ["monoplégie incomplète membre inférieur lésion corticale", "corticale lésion inférieur membre incomplète monoplégie", "monoplégie incomplète", "incomplète membre", "membre inférieur"], rate: [10, 30] },
          { name: "Aphasie avec difficulté d'élocution", searchTerms: ["aphasie avec difficulté d'élocution", "d'élocution difficulté avec aphasie", "aphasie difficulté d'élocution", "aphasie avec", "avec difficulté"], rate: [10, 30] },
          { name: "Aphasie de Broca (motrice) post-traumatique", searchTerms: ["aphasie broca motrice post traumatique", "traumatique post motrice broca aphasie", "aphasie broca", "broca motrice", "motrice post"], rate: [30, 60], rateCriteria: { low: "Discours haché mais compréhensible, avec conscience du trouble.", high: "Agrammatisme sévère rendant la communication verbale quasi impossible." } },
          { name: "Aphasie de Wernicke (sensorielle) post-traumatique", searchTerms: ["aphasie wernicke sensorielle post traumatique", "traumatique post sensorielle wernicke aphasie", "aphasie wernicke", "wernicke sensorielle", "sensorielle post"], rate: [40, 70], rateCriteria: { low: "Jargon occasionnel mais compréhension globalement préservée.", high: "Jargonaphasie et anosognosie rendant toute communication inefficace." } },
          { name: "Aphasie sensorielle avec altération du langage intérieur", searchTerms: ["aphasie sensorielle avec altération langage intérieur", "intérieur langage altération avec sensorielle aphasie", "aphasie sensorielle altération langage intérieur", "aphasie sensorielle", "sensorielle avec"], rate: [60, 100] },
          { name: "Aphasie avec impossibilité de correspondre (mutisme)", searchTerms: ["aphasie avec impossibilité correspondre mutisme", "mutisme correspondre impossibilité avec aphasie", "aphasie impossibilité correspondre mutisme", "aphasie avec", "avec impossibilité"], rate: [60, 80] },
          { name: "Diplégie cérébrale (marche impossible)", searchTerms: ["diplégie cérébrale marche impossible", "impossible marche cérébrale diplégie", "diplégie cérébrale", "cérébrale marche", "marche impossible"], rate: 100 },
          { name: "Diplégie cérébrale (marche possible)", searchTerms: ["diplégie cérébrale marche possible", "possible marche cérébrale diplégie", "diplégie cérébrale", "cérébrale marche", "marche possible"], rate: [30, 90] },
        ]
      },
      {
        name: "Psychoses et Névroses Post-Traumatiques",
        injuries: [
          { name: "Démence post-traumatique incomplète", searchTerms: ["démence post traumatique incomplète", "incomplète traumatique post démence", "démence post", "post traumatique", "traumatique incomplète"], rate: [60, 90] },
          { name: "Démence post-traumatique complète", searchTerms: ["démence post traumatique complète", "complète traumatique post démence", "démence post", "post traumatique", "traumatique complète"], rate: 100 },
          { name: "Névrose post-traumatique - États neuro-psychasthéniques (signes fonctionnels)", searchTerms: ["névrose post traumatique états neuro psychasthéniques signes fonctionnels", "fonctionnels signes psychasthéniques neuro états traumatique post névrose", "névrose post", "post traumatique", "traumatique états"], rate: [0, 10] },
          { name: "Névrose post-traumatique - États neuro-psychasthéniques (signes somatiques)", searchTerms: ["névrose post traumatique états neuro psychasthéniques signes somatiques", "somatiques signes psychasthéniques neuro états traumatique post névrose", "névrose post", "post traumatique", "traumatique états"], rate: [10, 40] },
          { name: "Névrose post-traumatique - Signes psychiques (fatigabilité cérébrale)", searchTerms: ["névrose post traumatique signes psychiques fatigabilité cérébrale", "cérébrale fatigabilité psychiques signes traumatique post névrose", "névrose post", "post traumatique", "traumatique signes"], rate: [20, 50] },
          { name: "Névrose post-traumatique - Symptômes vago-sympathiques", searchTerms: ["névrose post traumatique symptômes vago sympathiques", "sympathiques vago symptômes traumatique post névrose", "névrose post", "post traumatique", "traumatique symptômes"], rate: [5, 20] },
          { name: "Névrose post-traumatique - Syndromes anxieux", searchTerms: ["névrose post traumatique syndromes anxieux", "anxieux syndromes traumatique post névrose", "névrose post", "post traumatique", "traumatique syndromes"], rate: [10, 50] },
          { name: "Névrose post-traumatique - Syndromes moteurs fonctionnels", searchTerms: ["névrose post traumatique syndromes moteurs fonctionnels", "fonctionnels moteurs syndromes traumatique post névrose", "névrose post", "post traumatique", "traumatique syndromes"], rate: [0, 20] },
          { name: "Trouble de stress post-traumatique (TSPT)", searchTerms: ["trouble stress post traumatique tspt", "tspt traumatique post stress trouble", "trouble stress", "stress post", "post traumatique"], rate: [10, 50], rateCriteria: { low: "Symptômes d'évitement et d'hypervigilance légers, avec un retentissement modéré sur la vie sociale.", high: "Symptômes sévères et invalidants, avec anxiété majeure, phobies, dépression réactionnelle et retentissement socio-professionnel majeur." } },
          {
            name: "Phobie spécifique post-traumatique (amaxophobie, acrophobie, etc.)",
            searchTerms: ["phobie spécifique post traumatique amaxophobie, acrophobie, etc.", "etc. acrophobie, amaxophobie, traumatique post spécifique phobie", "phobie spécifique", "spécifique post", "post traumatique"], rate: [5, 20],
            description: "Peur intense et irrationnelle d'un objet ou d'une situation spécifique liée au traumatisme (ex: peur de conduire après un accident de la route).",
            rateCriteria: {
                low: "Phobie entraînant un évitement occasionnel, sans retentissement majeur sur la vie socio-professionnelle.",
                medium: "Évitement régulier avec nécessité d'adaptation de la vie quotidienne (ex: changer de moyen de transport).",
                high: "Phobie invalidante avec retentissement socio-professionnel majeur et nécessité d'un traitement spécialisé (TCC)."
            }
          },
          { name: "Trouble de l'adaptation avec anxiété et/ou humeur dépressive chronique", searchTerms: ["trouble l'adaptation avec anxiété et/ou humeur dépressive chronique", "chronique dépressive humeur et/ou anxiété avec l'adaptation trouble", "trouble l'adaptation anxiété et/ou humeur dépressive chronique", "trouble l'adaptation", "l'adaptation avec"], rate: [5, 15], rateCriteria: { low: "Symptomatologie modérée n'entravant que partiellement les activités socio-professionnelles.", high: "Symptomatologie marquée avec retentissement notable sur la vie quotidienne et professionnelle, nécessitant un suivi régulier." } },
          { name: "Troubles du sommeil chroniques post-traumatiques (insomnie sévère)", searchTerms: ["troubles sommeil chroniques post traumatiques insomnie sévère", "sévère insomnie traumatiques post chroniques sommeil troubles", "troubles sommeil", "sommeil chroniques", "chroniques post"], rate: [5, 15], rateCriteria: { low: "Difficultés d'endormissement ou réveils nocturnes occasionnels, avec fatigue diurne modérée.", high: "Insomnie quasi-quotidienne avec retentissement majeur sur la vigilance, l'humeur et les activités socio-professionnelles." } },
          { name: "Trouble de la personnalité post-traumatique (modification du comportement)", searchTerms: ["trouble personnalité post traumatique modification comportement", "comportement modification traumatique post personnalité trouble", "trouble personnalité", "personnalité post", "post traumatique"], rate: [15, 40], rateCriteria: { low: "Changements de l'humeur (labilité, irritabilité) avec difficultés relationnelles.", high: "Changements de personnalité sévères (apathie, désinhibition, agressivité) entraînant une désinsertion sociale et professionnelle." } },
          { name: "Trouble somatoforme douloureux persistant (algie psychogène) post-traumatique", searchTerms: ["trouble somatoforme douloureux persistant algie psychogène post traumatique", "traumatique post psychogène algie persistant douloureux somatoforme trouble", "trouble somatoforme", "somatoforme douloureux", "douloureux persistant"], rate: [10, 30], description: "Douleurs chroniques et invalidantes sans substratum organique suffisant, après un diagnostic d'élimination et une confirmation psychiatrique.", rateCriteria: { low: "Plaintes douloureuses focalisées avec retentissement modéré sur les activités socio-professionnelles.", high: "Syndrome douloureux diffus et rebelle, avec comportement algique majeur et désinsertion socio-professionnelle complète." } },
        ]
      }
    ]
  },
  {
    name: "Séquelles du Rachis, du Bassin et de la Moelle Épinière",
    subcategories: [
      {
        name: "Rachis",
        injuries: [
          { name: "Séquelles de fracture/luxation du rachis cervical (sans lésion neurologique)", searchTerms: ["séquelles fracture/luxation rachis cervical sans lésion neurologique", "neurologique lésion sans cervical rachis fracture/luxation séquelles", "séquelles fracture/luxation rachis cervical lésion neurologique", "séquelles fracture/luxation", "fracture/luxation rachis"], rate: [8, 25], rateCriteria: { low: "Cervicalgies mécaniques occasionnelles, raideur minime.", high: "Cervicalgies quasi-permanentes, raideur invalidante, nécessité de collier cervical." } },
          { name: "Séquelles de fracture/luxation du rachis dorsal (sans lésion neurologique)", searchTerms: ["séquelles fracture/luxation rachis dorsal sans lésion neurologique", "neurologique lésion sans dorsal rachis fracture/luxation séquelles", "séquelles fracture/luxation rachis dorsal lésion neurologique", "séquelles fracture/luxation", "fracture/luxation rachis"], rate: [5, 20], rateCriteria: { low: "Dorsalgies d'effort, sans déformation.", high: "Dorsalgies chroniques avec cyphose post-traumatique." } },
          { name: "Séquelles de fracture/luxation du rachis lombaire (sans lésion neurologique)", searchTerms: ["séquelles fracture/luxation rachis lombaire sans lésion neurologique", "neurologique lésion sans lombaire rachis fracture/luxation séquelles", "séquelles fracture/luxation rachis lombaire lésion neurologique", "séquelles fracture/luxation", "fracture/luxation rachis"], rate: [10, 30], rateCriteria: { low: "Lombalgies mécaniques, raideur modérée.", high: "Syndrome douloureux lombaire chronique invalidant, troubles statiques." } },
          { name: "Fracture tassement vertébral cervical non déplacée consolidée", searchTerms: ["fracture tassement vertébral cervical non déplacée consolidée", "fracture tassement rachis cervical non déplacée consolidée", "consolidée déplacée non cervical vertébral tassement fracture", "fracture tassement", "tassement vertébral"], rate: [8, 20], description: "Fracture par compression d'une vertèbre cervicale, bien consolidée, sans lésion neurologique.", rateCriteria: { low: "Tassement léger (<25%), cervicalgies mécaniques, mobilité conservée.", medium: "Tassement modéré (25-50%), cervicalgies fréquentes, limitation modérée.", high: "Tassement important (>50%), cyphose, cervicalgies permanentes, limitation marquée." } },
          { name: "Fracture tassement vertébral dorsal non déplacée consolidée", searchTerms: ["fracture tassement vertébral dorsal non déplacée consolidée", "fracture tassement rachis dorsal non déplacée consolidée", "consolidée déplacée non dorsal vertébral tassement fracture", "fracture tassement", "tassement vertébral"], rate: [5, 15], description: "Fracture par compression d'une vertèbre dorsale (D1-D12), bien consolidée, sans lésion neurologique.", rateCriteria: { low: "Tassement léger (<25%), dorsalgies occasionnelles.", medium: "Tassement modéré (25-50%), dorsalgies fréquentes, cyphose débutante.", high: "Tassement important (>50%), cyphose marquée, dorsalgies chroniques." } },
          { name: "Fracture tassement vertébral lombaire non déplacée consolidée", searchTerms: ["fracture tassement vertébral lombaire non déplacée consolidée", "fracture tassement rachis lombaire non déplacée consolidée", "consolidée déplacée non lombaire vertébral tassement fracture", "fracture tassement", "tassement vertébral"], rate: [10, 25], description: "Fracture par compression d'une vertèbre lombaire (L1-L5), bien consolidée, sans lésion neurologique.", rateCriteria: { low: "Tassement léger (<25%), lombalgies mécaniques.", medium: "Tassement modéré (25-50%), lombalgies fréquentes, limitation des efforts.", high: "Tassement important (>50%), lombalgies chroniques invalidantes, troubles statiques." } },
          { name: "Hernie discale cervicale post-traumatique - Syndrome rachidien pur (cervicalgies)", searchTerms: ["hernie discale cervicale post traumatique syndrome rachidien pur cervicalgies", "cervicalgies pur rachidien syndrome traumatique post cervicale discale hernie", "hernie discale", "discale cervicale", "cervicale post"], rate: [5, 15], rateCriteria: { low: "Douleurs occasionnelles, raideur minime.", high: "Douleurs quasi-permanentes, raideur marquée invalidante." } },
          { name: "Hernie discale cervicale post-traumatique - Avec névralgie cervico-brachiale (NCB)", searchTerms: ["hernie discale cervicale post traumatique avec névralgie cervico brachiale ncb", "ncb brachiale cervico névralgie avec traumatique post cervicale discale hernie", "hernie discale cervicale post traumatique névralgie cervico brachiale ncb", "hernie discale", "discale cervicale"], rate: [15, 30], rateCriteria: { low: "NCB intermittente, bien contrôlée par le traitement, sans déficit neurologique.", high: "NCB rebelle avec signes neurologiques objectifs (déficit moteur, sensitif, troubles trophiques)." } },
          { name: "Hernie discale lombaire post-traumatique - Syndrome rachidien pur (lombalgies)", searchTerms: ["hernie discale lombaire post traumatique syndrome rachidien pur lombalgies", "lombalgies pur rachidien syndrome traumatique post lombaire discale hernie", "hernie discale", "discale lombaire", "lombaire post"], rate: [5, 20], rateCriteria: { low: "Douleurs mécaniques pures, sans limitation majeure d'activité.", high: "Douleurs chroniques invalidantes avec retentissement sur la vie quotidienne et professionnelle." } },
          { name: "Hernie discale lombaire post-traumatique - Avec radiculalgie (sciatique ou cruralgie)", searchTerms: ["hernie discale lombaire post traumatique avec radiculalgie sciatique cruralgie", "hernie discale lombaire post traumatique avec radiculalgie nerf cruralgie", "cruralgie sciatique radiculalgie avec traumatique post lombaire discale hernie", "hernie discale lombaire post traumatique radiculalgie sciatique cruralgie", "hernie discale"], rate: [15, 35], rateCriteria: { low: "Conflit disco-radiculaire avec radiculalgie intermittente, sans signes déficitaires.", high: "Radiculalgie persistante avec signes neurologiques déficitaires (déficit moteur, hypoesthésie, abolition d'un réflexe)." } },
          // 🆕 V3.3.147: Entorse lombaire avec lombalgies mécaniques (pour cumuls)
          { name: "Entorse lombaire avec lombalgies mécaniques", searchTerms: ["entorse lombaire avec lombalgies mécaniques", "entorse lombaire lombalgies effort", "entorse rachis lombaire lombalgies", "lombalgie post traumatique entorse", "lombalgie mécanique post traumatique", "entorse lombaire consolidée", "séquelles entorse lombaire", "lombalgies mécaniques post traumatiques"], rate: [5, 10], description: "Lésion ligamentaire du rachis lombaire sans fracture ni hernie discale, avec persistance de lombalgies mécaniques.", rateCriteria: { low: "Lombalgies mécaniques occasionnelles à l'effort, sans limitation majeure.", medium: "Lombalgies mécaniques fréquentes nécessitant adaptation des efforts et du port de charges.", high: "Lombalgies mécaniques chroniques invalidantes avec limitation importante des activités." } },
          {
            name: "Syndrome post-traumatique cervical chronique (Whiplash / Coup du lapin)",
            searchTerms: ["syndrome post traumatique cervical chronique whiplash coup lapin", "lapin coup whiplash chronique cervical traumatique post syndrome", "syndrome post", "post traumatique", "traumatique cervical"], rate: [5, 15],
            description: "Douleurs cervicales, céphalées et raideur persistantes après une entorse cervicale sans lésion osseuse ou discale objective.",
            rateCriteria: {
                low: "Cervicalgies mécaniques occasionnelles, bien contrôlées par le traitement, sans limitation objective de la mobilité.",
                medium: "Syndrome douloureux quasi-permanent avec raideur modérée, nécessitant un traitement régulier.",
                high: "Syndrome douloureux invalidant avec retentissement psychologique (anxiété, kinésiophobie) et raideur cervicale majeure."
            }
          },
          { name: "Névralgie d'Arnold (Névralgie du grand occipital) post-traumatique", searchTerms: ["névralgie d'arnold névralgie grand occipital post traumatique", "traumatique post occipital grand névralgie d'arnold névralgie", "névralgie d'arnold", "d'arnold névralgie", "névralgie grand"], rate: [8, 20], description: "Céphalées unilatérales en casque, partant de la nuque et irradiant vers le sommet du crâne et l'œil, après un traumatisme cervical.", rateCriteria: { low: "Crises douloureuses occasionnelles, bien contrôlées par le traitement médical.", high: "Douleurs quasi-permanentes, rebelles aux traitements antalgiques et aux infiltrations, avec retentissement majeur sur la qualité de vie." } },
          { name: "Syndrome de Maigne (Syndrome de la charnière thoraco-lombaire)", searchTerms: ["syndrome maigne syndrome charnière thoraco lombaire", "lombaire thoraco charnière syndrome maigne syndrome", "syndrome maigne", "maigne syndrome", "syndrome charnière"], rate: [5, 15], description: "Douleurs post-traumatiques projetées au niveau de la fesse, de l'aine ou des organes génitaux, provenant d'une irritation des nerfs issus de la charnière T12-L1.", rateCriteria: { low: "Douleurs projetées intermittentes, bien calmées par le traitement (antalgiques, infiltrations, kinésithérapie).", high: "Syndrome douloureux chronique et rebelle, avec retentissement sur la position assise, la marche et les activités quotidiennes." } },
          { 
            name: "Syndrome myofascial cervical post-traumatique (contractures chroniques)", 
            searchTerms: ["syndrome myofascial cervical post traumatique contractures chroniques", "chroniques contractures traumatique post cervical myofascial syndrome", "syndrome myofascial", "myofascial cervical", "cervical post"], rate: [5, 15], 
            description: "Douleurs et contractures chroniques des muscles du cou (trapèzes, SCM...) après un traumatisme, sans lésion osseuse ou discale avérée.",
            rateCriteria: { 
                low: "Contractures douloureuses occasionnelles, bien calmées par le repos ou un traitement simple.",
                high: "Syndrome douloureux permanent avec contractures palpables, limitation de la mobilité cervicale et céphalées de tension fréquentes."
            } 
          },
          { name: "Fracture des apophyses transverses", searchTerms: ["fracture des apophyses transverses", "transverses apophyses des fracture", "fracture apophyses transverses", "fracture des", "des apophyses"], rate: [5, 25] },
          { name: "Raideur rachidienne post-immobilisation, sans douleurs", searchTerms: ["raideur rachidienne post immobilisation, sans douleurs", "douleurs sans immobilisation, post rachidienne raideur", "raideur rachidienne post immobilisation, douleurs", "raideur rachidienne", "rachidienne post"], rate: [1, 15] },
          { name: "Raideur rachidienne avec douleurs ostéo-articulaires", searchTerms: ["raideur rachidienne avec douleurs ostéo articulaires", "articulaires ostéo douleurs avec rachidienne raideur", "raideur rachidienne douleurs ostéo articulaires", "raideur rachidienne", "rachidienne avec"], rate: [15, 25] },
          { name: "Raideur rachidienne avec douleurs névralgiques", searchTerms: ["raideur rachidienne avec douleurs névralgiques", "névralgiques douleurs avec rachidienne raideur", "raideur rachidienne douleurs névralgiques", "raideur rachidienne", "rachidienne avec"], rate: [20, 40] },
          { name: "Raideur rachidienne avec déviation très prononcée", searchTerms: ["raideur rachidienne avec déviation très prononcée", "prononcée très déviation avec rachidienne raideur", "raideur rachidienne déviation très prononcée", "raideur rachidienne", "rachidienne avec"], rate: [40, 45] },
          { name: "Séquelles d'arthrodèse vertébrale (fusion) avec raideur et douleurs résiduelles", searchTerms: ["séquelles d'arthrodèse vertébrale fusion avec raideur douleurs résiduelles", "résiduelles douleurs raideur avec fusion vertébrale d'arthrodèse séquelles", "séquelles d'arthrodèse vertébrale fusion raideur douleurs résiduelles", "séquelles d'arthrodèse", "d'arthrodèse vertébrale"], rate: [15, 40], rateCriteria: { low: "Fusion d'un seul niveau, indolore, avec raideur segmentaire modérée.", high: "Fusion multi-étagée, avec douleurs chroniques et raideur importante limitant les activités professionnelles." } },
          { name: "Scoliose ou cyphose douloureuse post-traumatique", searchTerms: ["scoliose cyphose douloureuse post traumatique", "traumatique post douloureuse cyphose scoliose", "scoliose cyphose", "cyphose douloureuse", "douloureuse post"], rate: [10, 30], rateCriteria: { low: "Déformation légère, douleurs occasionnelles.", high: "Déformation marquée avec retentissement fonctionnel et respiratoire." } },
          { name: "Myélopathie cervicarthrosique post-traumatique", searchTerms: ["myélopathie cervicarthrosique post traumatique", "traumatique post cervicarthrosique myélopathie", "myélopathie cervicarthrosique", "cervicarthrosique post", "post traumatique"], rate: [20, 70], description: "Compression lente de la moelle épinière cervicale due à une arthrose accélérée par un traumatisme.", rateCriteria: { low: "Signes neurologiques discrets (troubles de la marche, hyperréflexie) sans limitation majeure des activités.", high: "Syndrome pyramidal et/ou tétraparésie spastique invalidante avec troubles sphinctériens." } },
          { name: "Ankylose vertébrale post-traumatique (Spondylite, Kummel-Verneuil, Cyphose)", searchTerms: ["ankylose vertébrale post traumatique spondylite, kummel verneuil, cyphose", "cyphose verneuil, kummel spondylite, traumatique post vertébrale ankylose", "ankylose vertébrale", "vertébrale post", "post traumatique"], rate: [20, 80] },
          { name: "Spondylolisthésis modifié par traumatisme", searchTerms: ["spondylolisthésis modifié par traumatisme", "traumatisme par modifié spondylolisthésis", "spondylolisthésis modifié", "modifié par", "par traumatisme"], rate: [5, 15] },
          { name: "Rhumatisme vertébral (lombalgie, cervicalgie) avec raideur", searchTerms: ["rhumatisme vertébral lombalgie, cervicalgie avec raideur", "rhumatisme rachis lombalgie, syndrome cervical avec raideur", "raideur avec cervicalgie lombalgie, vertébral rhumatisme", "rhumatisme vertébral lombalgie, cervicalgie raideur", "rhumatisme vertébral"], rate: [5, 25] },
          { name: "Spondylose rhizomélique (atteinte lombaire)", searchTerms: ["spondylose rhizomélique atteinte lombaire", "lombaire atteinte rhizomélique spondylose", "spondylose rhizomélique", "rhizomélique atteinte", "atteinte lombaire"], rate: [20, 30] },
          { name: "Spondylose rhizomélique (atteinte de tout le rachis et hanches)", searchTerms: ["spondylose rhizomélique atteinte tout rachis hanches", "hanches rachis tout atteinte rhizomélique spondylose", "spondylose rhizomélique", "rhizomélique atteinte", "atteinte tout"], rate: [30, 80] },
          { name: "Séquelles d'ostéo-arthrite vertébrale infectieuse", searchTerms: ["séquelles d'ostéo arthrite vertébrale infectieuse", "infectieuse vertébrale arthrite d'ostéo séquelles", "séquelles d'ostéo", "d'ostéo arthrite", "arthrite vertébrale"], rate: [15, 35] },
        ]
      },
      {
        name: "Bassin - Lésions Osseuses",
        injuries: [
          { name: "Fracture isolée d'une branche pubienne ou de l'aile iliaque (sans déplacement)", searchTerms: ["fracture isolée d'une branche pubienne l'aile iliaque sans déplacement", "déplacement sans iliaque l'aile pubienne branche d'une isolée fracture", "fracture isolée d'une branche pubienne l'aile iliaque déplacement", "fracture isolée", "isolée d'une"], rate: [5, 10] },
          { name: "Fracture du cotyle sans déplacement, hanche congruente", searchTerms: ["fracture cotyle sans déplacement, hanche congruente", "congruente hanche déplacement, sans cotyle fracture", "fracture cotyle déplacement, hanche congruente", "fracture cotyle", "cotyle sans"], rate: [10, 20] },
          { name: "Fracture du cotyle avec arthrose post-traumatique", description: "Évaluer comme une coxarthrie (voir Membres Inférieurs)", rate: [15, 40] },
          { name: "Fracture du sacrum ou du coccyx avec douleurs chroniques (coccygodynie)", searchTerms: ["fracture sacrum coccyx avec douleurs chroniques coccygodynie", "coccygodynie chroniques douleurs avec coccyx sacrum fracture", "fracture sacrum coccyx douleurs chroniques coccygodynie", "fracture sacrum", "sacrum coccyx"], rate: [5, 15], rateCriteria: { low: "Douleurs à la position assise prolongée, calmées par le changement de position.", high: "Douleurs invalidantes quasi-permanentes, rendant la position assise impossible." } },
          { name: "Fracture du sacrum avec troubles neurologiques (radiculalgie S1)", searchTerms: ["fracture sacrum avec troubles neurologiques radiculalgie", "radiculalgie neurologiques troubles avec sacrum fracture", "fracture sacrum troubles neurologiques radiculalgie", "fracture sacrum", "sacrum avec"], rate: [15, 30] },
          { name: "Disjonction de la symphyse pubienne ou sacro-iliaque (instabilité résiduelle)", searchTerms: ["disjonction symphyse pubienne sacro iliaque instabilité résiduelle", "résiduelle instabilité iliaque sacro pubienne symphyse disjonction", "disjonction symphyse", "symphyse pubienne", "pubienne sacro"], rate: [15, 30], rateCriteria: { low: "Douleurs mécaniques à l'effort, sans instabilité majeure.", high: "Douleurs et instabilité importantes à la marche, nécessitant une aide." } },
          { name: "Fracture complexe de l'anneau pelvien avec séquelles importantes (boiterie, douleurs)", searchTerms: ["fracture complexe l'anneau pelvien avec séquelles importantes boiterie, douleurs", "douleurs boiterie, importantes séquelles avec pelvien l'anneau complexe fracture", "fracture complexe l'anneau pelvien séquelles importantes boiterie, douleurs", "fracture complexe", "complexe l'anneau"], rate: [30, 60], rateCriteria: { low: "Boiterie discrète, douleurs contrôlées.", high: "Boiterie majeure, douleurs invalidantes, séquelles urologiques ou neurologiques associées." } },
          { name: "Névralgie pudendale post-traumatique (fracture du bassin)", searchTerms: ["névralgie pudendale post traumatique fracture bassin", "bassin fracture traumatique post pudendale névralgie", "névralgie pudendale", "pudendale post", "post traumatique"], rate: [15, 35], rateCriteria: { low: "Douleurs périnéales positionnelles, avec impact modéré sur la qualité de vie.", high: "Douleurs neuropathiques invalidantes (brûlures, décharges électriques) en position assise, avec retentissement majeur." } },
        ]
      },
      {
        name: "Troubles Nerveux d'Origine Médullaire",
        injuries: [
          { name: "Paraplégie incomplète", searchTerms: ["paraplégie incomplète"], rate: [10, 80] },
          { name: "Paraplégie complète", searchTerms: ["paraplégie complète"], rate: 100 },
          { name: "Quadriplégie incomplète (marche possible)", searchTerms: ["quadriplégie incomplète marche possible", "possible marche incomplète quadriplégie", "quadriplégie incomplète", "incomplète marche", "marche possible"], rate: [60, 90] },
          { name: "Quadriplégie complète (confinement au lit)", searchTerms: ["quadriplégie complète confinement lit", "lit confinement complète quadriplégie", "quadriplégie complète", "complète confinement", "confinement lit"], rate: 100 },
          { name: "Syndrome de Brown-Séquard", searchTerms: ["syndrome brown séquard", "séquard brown syndrome", "syndrome brown", "brown séquard"], rate: [10, 50] },
          { name: "Hémiplégie médullaire incomplète (Côté Droit)", searchTerms: ["hémiplégie médullaire incomplète côté droit", "droit côté incomplète médullaire hémiplégie", "hémiplégie médullaire", "médullaire incomplète", "incomplète côté"], rate: [10, 80] },
          { name: "Hémiplégie médullaire incomplète (Côté Gauche)", searchTerms: ["hémiplégie médullaire incomplète côté gauche", "gauche côté incomplète médullaire hémiplégie", "hémiplégie médullaire", "médullaire incomplète", "incomplète côté"], rate: [10, 75] },
          { name: "Hémiplégie médullaire complète", searchTerms: ["hémiplégie médullaire complète", "complète médullaire hémiplégie", "hémiplégie médullaire", "médullaire complète"], rate: 100 },
          { name: "Syndrome de la queue de cheval post-traumatique", searchTerms: ["syndrome queue cheval post traumatique", "traumatique post cheval queue syndrome", "syndrome queue", "queue cheval", "cheval post"], rate: [40, 80], rateCriteria: { low: "Troubles sensitifs périnéaux et/ou sphinctériens partiels, sans déficit moteur majeur.", high: "Anesthésie en selle, incontinence urinaire et fécale, impotence, et déficit moteur des membres inférieurs." } },
          { name: "Majoration pour douleurs radiculo-médullaires", searchTerms: ["majoration pour douleurs radiculo médullaires", "médullaires radiculo douleurs pour majoration", "majoration douleurs radiculo médullaires", "majoration pour", "pour douleurs"], rate: [10, 20] },
          { name: "Claudication intermittente d'origine médullaire", searchTerms: ["claudication intermittente d'origine médullaire", "médullaire d'origine intermittente claudication", "claudication intermittente", "intermittente d'origine", "d'origine médullaire"], rate: [10, 40], rateCriteria: { low: "Périmètre de marche > 200m.", high: "Périmètre de marche < 100m, avec troubles neurologiques." } },
          { name: "Para-ostéo-arthropathies neurogènes (POAN)", searchTerms: ["para ostéo arthropathies neurogènes poan", "poan neurogènes arthropathies ostéo para", "para ostéo", "ostéo arthropathies", "arthropathies neurogènes"], rate: [10, 40], description: "Majoration pour ossifications ectopiques péri-articulaires après lésion neurologique centrale, à cumuler avec le taux de la raideur articulaire induite.", rateCriteria: { low: "Limitation modérée d'une seule grosse articulation (hanche, genou).", high: "Ankylose complète et invalidante de plusieurs grosses articulations." } },
          { name: "Atrophie musculaire médullaire - Main (droite)", searchTerms: ["atrophie musculaire médullaire main droite", "droite main médullaire musculaire atrophie", "atrophie musculaire", "musculaire médullaire", "médullaire main"], rate: [5, 30] },
          { name: "Atrophie musculaire médullaire - Main (gauche)", searchTerms: ["atrophie musculaire médullaire main gauche", "gauche main médullaire musculaire atrophie", "atrophie musculaire", "musculaire médullaire", "médullaire main"], rate: [5, 20] },
          { name: "Atrophie musculaire médullaire - Avant-bras (droit)", searchTerms: ["atrophie musculaire médullaire avant bras droit", "atrophie musculaire médullaire avant supérieur droit", "droit bras avant médullaire musculaire atrophie", "atrophie musculaire", "musculaire médullaire"], rate: [10, 40] },
          { name: "Atrophie musculaire médullaire - Avant-bras (gauche)", searchTerms: ["atrophie musculaire médullaire avant bras gauche", "atrophie musculaire médullaire avant supérieur gauche", "gauche bras avant médullaire musculaire atrophie", "atrophie musculaire", "musculaire médullaire"], rate: [10, 30] },
          { name: "Atrophie musculaire médullaire - Bras (droit)", searchTerms: ["atrophie musculaire médullaire bras droit", "atrophie musculaire médullaire supérieur droit", "droit bras médullaire musculaire atrophie", "atrophie musculaire", "musculaire médullaire"], rate: [10, 40] },
          { name: "Atrophie musculaire médullaire - Bras (gauche)", searchTerms: ["atrophie musculaire médullaire bras gauche", "atrophie musculaire médullaire supérieur gauche", "gauche bras médullaire musculaire atrophie", "atrophie musculaire", "musculaire médullaire"], rate: [10, 30] },
          { name: "Atrophie musculaire médullaire - Épaule/Ceinture scapulaire (droite)", searchTerms: ["atrophie musculaire médullaire épaule/ceinture scapulaire droite", "droite scapulaire épaule/ceinture médullaire musculaire atrophie", "atrophie musculaire", "musculaire médullaire", "médullaire épaule/ceinture"], rate: [10, 40] },
          { name: "Atrophie musculaire médullaire - Épaule/Ceinture scapulaire (gauche)", searchTerms: ["atrophie musculaire médullaire épaule/ceinture scapulaire gauche", "gauche scapulaire épaule/ceinture médullaire musculaire atrophie", "atrophie musculaire", "musculaire médullaire", "médullaire épaule/ceinture"], rate: [10, 30] },
          { name: "Atrophie complète membre supérieur (droit)", searchTerms: ["atrophie complète membre supérieur droit", "droit supérieur membre complète atrophie", "atrophie complète", "complète membre", "membre supérieur"], rate: 75 },
          { name: "Atrophie complète membre supérieur (gauche)", searchTerms: ["atrophie complète membre supérieur gauche", "gauche supérieur membre complète atrophie", "atrophie complète", "complète membre", "membre supérieur"], rate: 65 },
          { name: "Atrophie musculaire médullaire - Pied", searchTerms: ["atrophie musculaire médullaire pied", "pied médullaire musculaire atrophie", "atrophie musculaire", "musculaire médullaire", "médullaire pied"], rate: [5, 15] },
          { name: "Atrophie musculaire médullaire - Jambe", searchTerms: ["atrophie musculaire médullaire jambe", "atrophie musculaire médullaire inférieur", "jambe médullaire musculaire atrophie", "atrophie musculaire", "musculaire médullaire"], rate: [10, 30] },
          { name: "Atrophie musculaire médullaire - Cuisse", searchTerms: ["atrophie musculaire médullaire cuisse", "atrophie musculaire médullaire inférieur", "cuisse médullaire musculaire atrophie", "atrophie musculaire", "musculaire médullaire"], rate: [20, 50] },
          { name: "Atrophie musculaire médullaire - Ceinture pelvienne", searchTerms: ["atrophie musculaire médullaire ceinture pelvienne", "pelvienne ceinture médullaire musculaire atrophie", "atrophie musculaire", "musculaire médullaire", "médullaire ceinture"], rate: [30, 60] },
          { name: "Atrophie complète d'un membre inférieur", searchTerms: ["atrophie complète d'un membre inférieur", "inférieur membre d'un complète atrophie", "atrophie complète", "complète d'un", "d'un membre"], rate: 70 },
          { name: "Atrophie complète des deux membres inférieurs", searchTerms: ["atrophie complète des deux membres inférieurs", "inférieurs membres deux des complète atrophie", "atrophie complète deux membres inférieurs", "atrophie complète", "complète des"], rate: 100 },
          { name: "Troubles de la sensibilité d'origine médullaire avec douleurs", searchTerms: ["troubles sensibilité d'origine médullaire avec douleurs", "douleurs avec médullaire d'origine sensibilité troubles", "troubles sensibilité d'origine médullaire douleurs", "troubles sensibilité", "sensibilité d'origine"], rate: [10, 20] },
          { name: "Rétention fécale corrigible", searchTerms: ["rétention fécale corrigible", "corrigible fécale rétention", "rétention fécale", "fécale corrigible"], rate: [3, 5] },
          { name: "Rétention fécale rebelle", searchTerms: ["rétention fécale rebelle", "rebelle fécale rétention", "rétention fécale", "fécale rebelle"], rate: [10, 30] },
          { name: "Incontinence fécale incomplète ou rare", searchTerms: ["incontinence fécale incomplète rare", "rare incomplète fécale incontinence", "incontinence fécale", "fécale incomplète", "incomplète rare"], rate: [10, 25] },
          { name: "Incontinence fécale complète et fréquente", searchTerms: ["incontinence fécale complète fréquente", "fréquente complète fécale incontinence", "incontinence fécale", "fécale complète", "complète fréquente"], rate: [30, 70] },
          { name: "Abolition des érections", searchTerms: ["abolition des érections", "érections des abolition", "abolition érections", "abolition des", "des érections"], rate: [10, 20] },
          { name: "Priapisme incoercible", searchTerms: ["priapisme incoercible"], rate: [10, 20] },
          { name: "Syringomyélie - Formes frustes ou lentes", searchTerms: ["syringomyélie formes frustes lentes", "lentes frustes formes syringomyélie", "syringomyélie formes", "formes frustes", "frustes lentes"], rate: [20, 40] },
          { name: "Syringomyélie - Formes progressives", searchTerms: ["syringomyélie formes progressives", "progressives formes syringomyélie", "syringomyélie formes", "formes progressives"], rate: [40, 60] },
          { name: "Syringomyélie - Formes graves", searchTerms: ["syringomyélie formes graves", "graves formes syringomyélie", "syringomyélie formes", "formes graves"], rate: [60, 100] },
        ]
      }
    ]
  },
  {
    name: "Séquelles des Nerfs Crâniens et Périphériques",
    subcategories: [
      {
        name: "Nerfs Crâniens",
        injuries: [
          { name: "Anosmie unilatérale ou bilatérale", description: "Se référer au barème oto-rhino-laryngologie.", rate: [5, 30] },
          { name: "Névralgie du Trijumeau (V) - Algie avec ou sans anesthésie", searchTerms: ["névralgie trijumeau algie avec sans anesthésie", "anesthésie sans avec algie trijumeau névralgie", "névralgie trijumeau algie anesthésie", "névralgie trijumeau", "trijumeau algie"], rate: [25, 70] },
          { name: "Névralgie du Trijumeau (V) - Algie du type continu sympathalgique", searchTerms: ["névralgie trijumeau algie type continu sympathalgique", "sympathalgique continu type algie trijumeau névralgie", "névralgie trijumeau", "trijumeau algie", "algie type"], rate: [30, 80] },
          { name: "Paralysie du Nerf Facial (VII) - Paralysie totale et définitive", searchTerms: ["paralysie nerf facial vii paralysie totale définitive", "définitive totale paralysie vii facial nerf paralysie", "paralysie nerf", "nerf facial", "facial vii"], rate: [20, 30] },
          { name: "Paralysie du Nerf Facial (VII) - Paralysie partielle et définitive", searchTerms: ["paralysie nerf facial vii paralysie partielle définitive", "définitive partielle paralysie vii facial nerf paralysie", "paralysie nerf", "nerf facial", "facial vii"], rate: [10, 30] },
          { name: "Paralysie du Nerf Facial (VII) - Paralysie bilatérale totale", searchTerms: ["paralysie nerf facial vii paralysie bilatérale totale", "totale bilatérale paralysie vii facial nerf paralysie", "paralysie nerf", "nerf facial", "facial vii"], rate: [20, 50] },
          { name: "Paralysie du Nerf Facial (VII) - Contracture post-paralytique", searchTerms: ["paralysie nerf facial vii contracture post paralytique", "paralytique post contracture vii facial nerf paralysie", "paralysie nerf", "nerf facial", "facial vii"], rate: [0, 10] },
          { name: "Paralysie du Nerf Facial (VII) - Spasmes (hémispasme facial)", searchTerms: ["paralysie nerf facial vii spasmes hémispasme facial", "facial hémispasme spasmes vii facial nerf paralysie", "paralysie nerf", "nerf facial", "facial vii"], rate: [0, 10] },
          { name: "Paralysie du Nerf Facial (VII) - Spasmes avec crises répétées", searchTerms: ["paralysie nerf facial vii spasmes avec crises répétées", "répétées crises avec spasmes vii facial nerf paralysie", "paralysie nerf facial vii spasmes crises répétées", "paralysie nerf", "nerf facial"], rate: [10, 20] },
          { name: "Atteinte du Nerf auditif (VIII) - Surdité, acouphènes, vertiges", description: "Se référer au barème spécial oreilles.", rate: [5, 60] },
          { name: "Atteinte du Nerf glosso-pharyngien (IX) - Paralysie bilatérale", searchTerms: ["atteinte nerf glosso pharyngien paralysie bilatérale", "bilatérale paralysie pharyngien glosso nerf atteinte", "atteinte nerf", "nerf glosso", "glosso pharyngien"], rate: [5, 10] },
          { name: "Atteinte du Nerf spinal externe (XI) - Atrophie du trapèze et sterno-cléido-mastoïdien", searchTerms: ["atteinte nerf spinal externe atrophie trapèze sterno cléido mastoïdien", "mastoïdien cléido sterno trapèze atrophie externe spinal nerf atteinte", "atteinte nerf", "nerf spinal", "spinal externe"], rate: [5, 25] },
          { name: "Atteinte du Nerf hypoglosse (XII) - Hémiatrophie et réaction de dégénérescence unilatérale", searchTerms: ["atteinte nerf hypoglosse xii hémiatrophie réaction dégénérescence unilatérale", "unilatérale dégénérescence réaction hémiatrophie xii hypoglosse nerf atteinte", "atteinte nerf", "nerf hypoglosse", "hypoglosse xii"], rate: 10 },
          { name: "Atteinte du Nerf hypoglosse (XII) - Bilatérale (exceptionnelle)", searchTerms: ["atteinte nerf hypoglosse xii bilatérale exceptionnelle", "exceptionnelle bilatérale xii hypoglosse nerf atteinte", "atteinte nerf", "nerf hypoglosse", "hypoglosse xii"], rate: [50, 60] },
          { name: "Paralysies multiples des nerfs crâniens", searchTerms: ["paralysies multiples des nerfs crâniens", "crâniens nerfs des multiples paralysies", "paralysies multiples nerfs crâniens", "paralysies multiples", "multiples des"], rate: [10, 60] },
        ]
      },
      {
        name: "Nerfs Périphériques - Membre Supérieur",
        injuries: [
          { name: "Paralysie complète du plexus brachial (droite)", searchTerms: ["paralysie complète plexus brachial droite", "droite brachial plexus complète paralysie", "paralysie complète", "complète plexus", "plexus brachial"], rate: [70, 80] },
          { name: "Paralysie complète du plexus brachial (gauche)", searchTerms: ["paralysie complète plexus brachial gauche", "gauche brachial plexus complète paralysie", "paralysie complète", "complète plexus", "plexus brachial"], rate: [60, 70] },
          { name: "Paralysie totale du membre supérieur (droite)", searchTerms: ["paralysie totale membre supérieur droite", "droite supérieur membre totale paralysie", "paralysie totale", "totale membre", "membre supérieur"], rate: [70, 80] },
          { name: "Paralysie totale du membre supérieur (gauche)", searchTerms: ["paralysie totale membre supérieur gauche", "gauche supérieur membre totale paralysie", "paralysie totale", "totale membre", "membre supérieur"], rate: [60, 70] },
          { name: "Paralysie radiculaire supérieure (Duchenne-Erb) (droite)", searchTerms: ["paralysie radiculaire supérieure duchenne erb droite", "droite erb duchenne supérieure radiculaire paralysie", "paralysie radiculaire", "radiculaire supérieure", "supérieure duchenne"], rate: [45, 55] },
          { name: "Paralysie radiculaire supérieure (Duchenne-Erb) (gauche)", searchTerms: ["paralysie radiculaire supérieure duchenne erb gauche", "gauche erb duchenne supérieure radiculaire paralysie", "paralysie radiculaire", "radiculaire supérieure", "supérieure duchenne"], rate: [35, 45] },
          { name: "Paralysie radiculaire inférieure (Klumpke) (droite)", searchTerms: ["paralysie radiculaire inférieure klumpke droite", "droite klumpke inférieure radiculaire paralysie", "paralysie radiculaire", "radiculaire inférieure", "inférieure klumpke"], rate: [55, 65] },
          { name: "Paralysie radiculaire inférieure (Klumpke) (gauche)", searchTerms: ["paralysie radiculaire inférieure klumpke gauche", "gauche klumpke inférieure radiculaire paralysie", "paralysie radiculaire", "radiculaire inférieure", "inférieure klumpke"], rate: [45, 55] },
          { name: "Paralysie du nerf du grand dentelé (Serratus anterior) (Main Dominante)", searchTerms: ["paralysie nerf grand dentelé serratus anterior main dominante", "dominante main anterior serratus dentelé grand nerf paralysie", "paralysie nerf", "nerf grand", "grand dentelé"], rate: [10, 25], description: "Atteinte du nerf thoracique long entraînant une paralysie du muscle grand dentelé et un décollement de l'omoplate ('scapula alata').", rateCriteria: { low: "Décollement partiel de l'omoplate, gêne modérée dans les mouvements d'élévation au-dessus de 90°.", high: "Décollement complet, perte de force majeure, limitation sévère de l'antépulsion et de l'abduction de l'épaule." } },
          { name: "Paralysie du nerf du grand dentelé (Serratus anterior) (Main Non Dominante)", searchTerms: ["paralysie nerf grand dentelé serratus anterior main non dominante", "dominante non main anterior serratus dentelé grand nerf paralysie", "paralysie nerf", "nerf grand", "grand dentelé"], rate: [8, 20], description: "Atteinte du nerf thoracique long entraînant une paralysie du muscle grand dentelé et un décollement de l'omoplate ('scapula alata').", rateCriteria: { low: "Décollement partiel de l'omoplate, gêne modérée.", high: "Décollement complet, perte de force et limitation sévère des mouvements de l'épaule." } },
          { name: "Paralysie isolée du nerf sous-scapulaire (droite)", searchTerms: ["paralysie isolée nerf sous scapulaire droite", "droite scapulaire sous nerf isolée paralysie", "paralysie isolée", "isolée nerf", "nerf sous"], rate: [10, 20] },
          { name: "Paralysie isolée du nerf sous-scapulaire (gauche)", searchTerms: ["paralysie isolée nerf sous scapulaire gauche", "gauche scapulaire sous nerf isolée paralysie", "paralysie isolée", "isolée nerf", "nerf sous"], rate: [5, 15] },
          { name: "Paralysie du nerf circonflexe (droite)", searchTerms: ["paralysie nerf circonflexe droite", "droite circonflexe nerf paralysie", "paralysie nerf", "nerf circonflexe", "circonflexe droite"], rate: [25, 35] },
          { name: "Paralysie du nerf circonflexe (gauche)", searchTerms: ["paralysie nerf circonflexe gauche", "gauche circonflexe nerf paralysie", "paralysie nerf", "nerf circonflexe", "circonflexe gauche"], rate: [20, 30] },
          { name: "Paralysie du nerf musculo-cutané (droite)", searchTerms: ["paralysie nerf musculo cutané droite", "droite cutané musculo nerf paralysie", "paralysie nerf", "nerf musculo", "musculo cutané"], rate: [15, 25] },
          { name: "Paralysie du nerf musculo-cutané (gauche)", searchTerms: ["paralysie nerf musculo cutané gauche", "gauche cutané musculo nerf paralysie", "paralysie nerf", "nerf musculo", "musculo cutané"], rate: [10, 20] },
          { name: "Paralysie du nerf médian - Au bras (droite)", searchTerms: ["paralysie nerf médian bras droite", "paralysie nerf médian supérieur droite", "droite bras médian nerf paralysie", "paralysie nerf", "nerf médian"], rate: [45, 55] },
          { name: "Paralysie du nerf médian - Au bras (gauche)", searchTerms: ["paralysie nerf médian bras gauche", "paralysie nerf médian supérieur gauche", "gauche bras médian nerf paralysie", "paralysie nerf", "nerf médian"], rate: [35, 45] },
          { name: "Paralysie du nerf médian - Au poignet (droite)", searchTerms: ["paralysie nerf médian poignet droite", "droite poignet médian nerf paralysie", "paralysie nerf", "nerf médian", "médian poignet"], rate: [15, 25] },
          { name: "Paralysie du nerf médian - Au poignet (gauche)", searchTerms: ["paralysie nerf médian poignet gauche", "gauche poignet médian nerf paralysie", "paralysie nerf", "nerf médian", "médian poignet"], rate: [5, 15] },
          { name: "Syndrome du canal carpien post-traumatique (Main Dominante)", searchTerms: ["syndrome canal carpien post traumatique main dominante", "dominante main traumatique post carpien canal syndrome", "syndrome canal", "canal carpien", "carpien post"], rate: [5, 20], rateCriteria: { low: "Signes sensitifs intermittents (paresthésies nocturnes) sans déficit objectif.", high: "Déficit sensitif permanent et/ou amyotrophie de l'éminence thénar." } },
          { name: "Syndrome du canal carpien post-traumatique (Main Non Dominante)", searchTerms: ["syndrome canal carpien post traumatique main non dominante", "dominante non main traumatique post carpien canal syndrome", "syndrome canal", "canal carpien", "carpien post"], rate: [4, 15], rateCriteria: { low: "Signes sensitifs intermittents.", high: "Déficit permanent et/ou amyotrophie." } },
          { name: "Paralysie du nerf cubital - Au bras (droite)", searchTerms: ["paralysie nerf cubital bras droite", "paralysie nerf nerf supérieur droite", "droite bras cubital nerf paralysie", "paralysie nerf", "nerf cubital"], rate: [25, 35] },
          { name: "Paralysie du nerf cubital - Au bras (gauche)", searchTerms: ["paralysie nerf cubital bras gauche", "paralysie nerf nerf supérieur gauche", "gauche bras cubital nerf paralysie", "paralysie nerf", "nerf cubital"], rate: [15, 25] },
          { name: "Paralysie du nerf cubital - Au poignet (droite)", searchTerms: ["paralysie nerf cubital poignet droite", "paralysie nerf nerf poignet droite", "droite poignet cubital nerf paralysie", "paralysie nerf", "nerf cubital"], rate: [25, 35] },
          { name: "Paralysie du nerf cubital - Au poignet (gauche)", searchTerms: ["paralysie nerf cubital poignet gauche", "paralysie nerf nerf poignet gauche", "gauche poignet cubital nerf paralysie", "paralysie nerf", "nerf cubital"], rate: [15, 25] },
          { name: "Paralysie du nerf radial - Lésion au-dessus de la branche du triceps (droite)", searchTerms: ["paralysie nerf radial lésion dessus branche triceps droite", "paralysie nerf radius lésion dessus branche triceps droite", "droite triceps branche dessus lésion radial nerf paralysie", "paralysie nerf", "nerf radial"], rate: [45, 55] },
          { name: "Paralysie du nerf radial - Lésion au-dessus de la branche du triceps (gauche)", searchTerms: ["paralysie nerf radial lésion dessus branche triceps gauche", "paralysie nerf radius lésion dessus branche triceps gauche", "gauche triceps branche dessus lésion radial nerf paralysie", "paralysie nerf", "nerf radial"], rate: [35, 45] },
          { name: "Paralysie du nerf radial - Lésion au-dessous de la branche du triceps (droite)", searchTerms: ["paralysie nerf radial lésion dessous branche triceps droite", "paralysie nerf radius lésion dessous branche triceps droite", "droite triceps branche dessous lésion radial nerf paralysie", "paralysie nerf", "nerf radial"], rate: [35, 45] },
          { name: "Paralysie du nerf radial - Lésion au-dessous de la branche du triceps (gauche)", searchTerms: ["paralysie nerf radial lésion dessous branche triceps gauche", "paralysie nerf radius lésion dessous branche triceps gauche", "gauche triceps branche dessous lésion radial nerf paralysie", "paralysie nerf", "nerf radial"], rate: [25, 35] },
          { name: "Paralysie associée du médian et du cubital (droite)", searchTerms: ["paralysie associée médian cubital droite", "paralysie associée médian nerf droite", "droite cubital médian associée paralysie", "paralysie associée", "associée médian"], rate: [45, 55] },
          { name: "Paralysie associée du médian et du cubital (gauche)", searchTerms: ["paralysie associée médian cubital gauche", "paralysie associée médian nerf gauche", "gauche cubital médian associée paralysie", "paralysie associée", "associée médian"], rate: [45, 55] },
          { name: "Syndrome du défilé thoraco-brachial post-traumatique", searchTerms: ["syndrome défilé thoraco brachial post traumatique", "traumatique post brachial thoraco défilé syndrome", "syndrome défilé", "défilé thoraco", "thoraco brachial"], rate: [10, 30], rateCriteria: { low: "Paresthésies et douleurs positionnelles (bras en élévation), sans déficit objectif.", medium: "Signes objectifs de compression vasculaire (œdème, cyanose) ou nerveuse (hypoesthésie, déficit moteur C8-T1).", high: "Syndrome sévère et rebelle avec amyotrophie de la main ou complications vasculaires (thrombose, anévrisme)." } }
        ]
      },
      {
        name: "Nerfs Périphériques - Membre Inférieur",
        injuries: [
          { name: "Paralysie totale d'un membre inférieur", searchTerms: ["paralysie totale d'un membre inférieur", "inférieur membre d'un totale paralysie", "paralysie totale", "totale d'un", "d'un membre"], rate: [70, 80] },
          { name: "Paralysie complète du nerf sciatique", searchTerms: ["paralysie complète nerf sciatique", "paralysie complète nerf nerf", "sciatique nerf complète paralysie", "paralysie complète", "complète nerf"], rate: [35, 45] },
          { name: "Paralysie du nerf sciatique poplité externe (SPE)", searchTerms: ["paralysie nerf sciatique poplité externe spe", "paralysie nerf nerf poplité externe spe", "spe externe poplité sciatique nerf paralysie", "paralysie nerf", "nerf sciatique"], rate: [15, 25], rateCriteria: { low: "Déficit du releveur du pied, marche sur la pointe des pieds possible, steppage discret.", high: "Steppage majeur avec nécessité de releveur, troubles trophiques." } },
          { name: "Paralysie du nerf sciatique poplité interne (SPI)", searchTerms: ["paralysie nerf sciatique poplité interne spi", "paralysie nerf nerf poplité interne spi", "spi interne poplité sciatique nerf paralysie", "paralysie nerf", "nerf sciatique"], rate: [15, 25], rateCriteria: { low: "Difficulté à la marche sur la pointe des pieds, déficit modéré de flexion des orteils.", high: "Perte de la propulsion du pas, pied en talus, troubles trophiques importants." } },
          { name: "Paralysie du nerf crural", searchTerms: ["paralysie nerf crural", "crural nerf paralysie", "paralysie nerf", "nerf crural"], rate: [45, 55] },
          { name: "Paralysie du nerf obturateur", searchTerms: ["paralysie nerf obturateur", "obturateur nerf paralysie", "paralysie nerf", "nerf obturateur"], rate: [10, 20] },
          { name: "Méralgie paresthésique (Névralgie fémoro-cutanée)", searchTerms: ["méralgie paresthésique névralgie fémoro cutanée", "cutanée fémoro névralgie paresthésique méralgie", "méralgie paresthésique", "paresthésique névralgie", "névralgie fémoro"], rate: [5, 15], description: "Atteinte du nerf fémoro-cutané entraînant des troubles sensitifs (brûlures, anesthésie) sur la face antéro-externe de la cuisse.", rateCriteria: { low: "Dysesthésies intermittentes déclenchées par la station debout prolongée ou la marche.", high: "Dysesthésies permanentes et invalidantes, avec hyperpathie (douleur au contact vestimentaire), retentissant sur la marche." } },
        ]
      },
      {
        name: "Nerfs du Tronc",
        injuries: [
            { name: "Névralgie intercostale post-traumatique", searchTerms: ["névralgie intercostale post traumatique", "traumatique post intercostale névralgie", "névralgie intercostale", "intercostale post", "post traumatique"], rate: [5, 15], rateCriteria: { low: "Douleurs occasionnelles, calmées par des antalgiques simples.", high: "Douleurs chroniques, rebelles au traitement, avec retentissement sur la vie quotidienne (sommeil, respiration)." } }
        ]
      },
      {
        name: "Névrites, Névralgies et Syndromes Douloureux",
        injuries: [
            { name: "Névrite avec algies (membre supérieur droit)", searchTerms: ["névrite avec algies membre supérieur droit", "droit supérieur membre algies avec névrite", "névrite algies membre supérieur droit", "névrite avec", "avec algies"], rate: [10, 50] },
            { name: "Névrite avec algies (membre supérieur gauche)", searchTerms: ["névrite avec algies membre supérieur gauche", "gauche supérieur membre algies avec névrite", "névrite algies membre supérieur gauche", "névrite avec", "avec algies"], rate: [8, 40] },
            { name: "Séquelles névritiques (pied varus équin)", searchTerms: ["séquelles névritiques pied varus équin", "équin varus pied névritiques séquelles", "séquelles névritiques", "névritiques pied", "pied varus"], rate: [30, 50] },
            { name: "Névralgie sciatique légère (confirmée, sans troubles graves)", searchTerms: ["névralgie sciatique légère confirmée, sans troubles graves", "névralgie nerf légère confirmée, sans troubles graves", "graves troubles sans confirmée, légère sciatique névralgie", "névralgie sciatique légère confirmée, troubles graves", "névralgie sciatique"], rate: [10, 20] },
            { name: "Névralgie sciatique d'intensité moyenne (gêne marche/travail)", searchTerms: ["névralgie sciatique d'intensité moyenne gêne marche/travail", "névralgie nerf d'intensité moyenne gêne marche/travail", "marche/travail gêne moyenne d'intensité sciatique névralgie", "névralgie sciatique", "sciatique d'intensité"], rate: [25, 40] },
            { name: "Névralgie sciatique grave (travail et marche impossibles)", searchTerms: ["névralgie sciatique grave travail marche impossibles", "névralgie nerf grave travail marche impossibles", "impossibles marche travail grave sciatique névralgie", "névralgie sciatique", "sciatique grave"], rate: [45, 60] },
            { name: "Névralgie sciatique compliquée (causalgie, rétentissement général)", searchTerms: ["névralgie sciatique compliquée causalgie, rétentissement général", "névralgie nerf compliquée causalgie, rétentissement général", "général rétentissement causalgie, compliquée sciatique névralgie", "névralgie sciatique", "sciatique compliquée"], rate: [40, 80] },
            { name: "Réaction névritique (douleurs, raideurs) - membre supérieur", searchTerms: ["réaction névritique douleurs, raideurs membre supérieur", "supérieur membre raideurs douleurs, névritique réaction", "réaction névritique", "névritique douleurs,", "douleurs, raideurs"], rate: [8, 50] },
            { name: "Réaction névritique (douleurs, raideurs) - membre inférieur", searchTerms: ["réaction névritique douleurs, raideurs membre inférieur", "inférieur membre raideurs douleurs, névritique réaction", "réaction névritique", "névritique douleurs,", "douleurs, raideurs"], rate: [10, 40] },
            { name: "Causalgie (majoration) - membre supérieur", searchTerms: ["causalgie majoration membre supérieur", "supérieur membre majoration causalgie", "causalgie majoration", "majoration membre", "membre supérieur"], rate: [20, 60] },
            { name: "Causalgie (majoration) - membre inférieur", searchTerms: ["causalgie majoration membre inférieur", "inférieur membre majoration causalgie", "causalgie majoration", "majoration membre", "membre inférieur"], rate: [20, 60] },
        ]
      },
      {
        name: "Troubles Trophiques et Sympathiques",
        injuries: [
            { name: "Syndrome de paralysie du sympathique cervical (Claude Bernard-Horner)", searchTerms: ["syndrome paralysie sympathique cervical claude bernard horner", "horner bernard claude cervical sympathique paralysie syndrome", "syndrome paralysie", "paralysie sympathique", "sympathique cervical"], rate: [5, 10] },
            { name: "Syndrome d'excitation du sympathique cervical (Pourfour du Petit)", searchTerms: ["syndrome d'excitation sympathique cervical pourfour petit", "petit pourfour cervical sympathique d'excitation syndrome", "syndrome d'excitation", "d'excitation sympathique", "sympathique cervical"], rate: [5, 10] },
            { name: "Ulcérations persistantes, troubles trophiques cutanés (majoration)", searchTerms: ["ulcérations persistantes, troubles trophiques cutanés majoration", "majoration cutanés trophiques troubles persistantes, ulcérations", "ulcérations persistantes,", "persistantes, troubles", "troubles trophiques"], rate: [5, 20] },
            { name: "Œdème dur traumatique", searchTerms: ["œdème dur traumatique", "traumatique dur œdème", "œdème dur", "dur traumatique"], rate: [8, 10] },
        ]
      }
    ]
  },
   {
    name: "Séquelles Maxillo-Faciales, ORL et Ophtalmologiques",
    subcategories: [
      {
        name: "Face - Mâchoires",
        injuries: [
          { name: "Mutilation - Perte des deux maxillaires supérieurs", searchTerms: ["mutilation perte des deux maxillaires supérieurs", "mutilation amputation des deux maxillaires supérieurs", "supérieurs maxillaires deux des perte mutilation", "mutilation perte deux maxillaires supérieurs", "mutilation perte"], rate: [90, 100] },
          { name: "Mutilation - Perte d'un maxillaire inférieur", searchTerms: ["mutilation perte d'un maxillaire inférieur", "mutilation amputation d'un maxillaire inférieur", "inférieur maxillaire d'un perte mutilation", "mutilation perte", "perte d'un"], rate: [90, 100] },
          { name: "Mutilation - Perte d'un maxillaire supérieur et d'un maxillaire inférieur", searchTerms: ["mutilation perte d'un maxillaire supérieur d'un maxillaire inférieur", "mutilation amputation d'un maxillaire supérieur d'un maxillaire inférieur", "inférieur maxillaire d'un supérieur maxillaire d'un perte mutilation", "mutilation perte", "perte d'un"], rate: 100 },
          { name: "Mutilation - Perte d'un seul maxillaire supérieur avec conservation mandibule", searchTerms: ["mutilation perte d'un seul maxillaire supérieur avec conservation mandibule", "mutilation amputation d'un seul maxillaire supérieur avec conservation mandibule", "mandibule conservation avec supérieur maxillaire seul d'un perte mutilation", "mutilation perte d'un seul maxillaire supérieur conservation mandibule", "mutilation perte"], rate: [50, 60] },
          { name: "Mutilation - Perte d'un maxillaire supérieur avec perte de substance étendue", searchTerms: ["mutilation perte d'un maxillaire supérieur avec perte substance étendue", "mutilation amputation d'un maxillaire supérieur avec amputation substance étendue", "étendue substance perte avec supérieur maxillaire d'un perte mutilation", "mutilation perte d'un maxillaire supérieur perte substance étendue", "mutilation perte"], rate: [70, 90] },
          { name: "Perte de substance des parties molles de la face (joue, lèvres, menton)", searchTerms: ["perte substance des parties molles face joue, lèvres, menton", "amputation substance des parties molles face joue, lèvres, menton", "menton lèvres, joue, face molles parties des substance perte", "perte substance parties molles face joue, lèvres, menton", "perte substance"], rate: [10, 80], rateCriteria: { low: "Perte limitée sans préjudice esthétique ou fonctionnel majeur.", high: "Perte étendue avec déformation majeure et/ou troubles fonctionnels (mastication, parole)." } },
          { name: "Consolidation vicieuse - Mobilité totale du maxillaire supérieur", searchTerms: ["consolidation vicieuse mobilité totale maxillaire supérieur", "supérieur maxillaire totale mobilité vicieuse consolidation", "consolidation vicieuse", "vicieuse mobilité", "mobilité totale"], rate: [60, 80] },
          { name: "Consolidation vicieuse - Mobilité partielle du maxillaire supérieur", searchTerms: ["consolidation vicieuse mobilité partielle maxillaire supérieur", "supérieur maxillaire partielle mobilité vicieuse consolidation", "consolidation vicieuse", "vicieuse mobilité", "mobilité partielle"], rate: [20, 50] },
          { name: "Consolidation vicieuse - Troubles sérieux de l'articulé dentaire", searchTerms: ["consolidation vicieuse troubles sérieux l'articulé dentaire", "dentaire l'articulé sérieux troubles vicieuse consolidation", "consolidation vicieuse", "vicieuse troubles", "troubles sérieux"], rate: [15, 30] },
          { name: "Consolidation vicieuse - Trouble léger de l'articulé dentaire", searchTerms: ["consolidation vicieuse trouble léger l'articulé dentaire", "dentaire l'articulé léger trouble vicieuse consolidation", "consolidation vicieuse", "vicieuse trouble", "trouble léger"], rate: [5, 15] },
          { name: "Perte de substance de la voûte palatine", searchTerms: ["perte substance voûte palatine", "amputation substance voûte palatine", "palatine voûte substance perte", "perte substance", "substance voûte"], rate: [10, 20] },
          { name: "Perte de substance de la voûte avec communication bucco-nasale", searchTerms: ["perte substance voûte avec communication bucco nasale", "amputation substance voûte avec communication bucco nasale", "nasale bucco communication avec voûte substance perte", "perte substance voûte communication bucco nasale", "perte substance"], rate: [30, 60] },
          { name: "Perte de substance partielle de l'arcade dentaire (sans trouble fonctionnel)", searchTerms: ["perte substance partielle l'arcade dentaire sans trouble fonctionnel", "amputation substance partielle l'arcade dentaire sans trouble fonctionnel", "fonctionnel trouble sans dentaire l'arcade partielle substance perte", "perte substance partielle l'arcade dentaire trouble fonctionnel", "perte substance"], rate: [0, 5] },
          { name: "Fracture du maxillaire inférieur - Consolidation vicieuse avec trouble grave de l'articulé", searchTerms: ["fracture maxillaire inférieur consolidation vicieuse avec trouble grave l'articulé", "l'articulé grave trouble avec vicieuse consolidation inférieur maxillaire fracture", "fracture maxillaire inférieur consolidation vicieuse trouble grave l'articulé", "fracture maxillaire", "maxillaire inférieur"], rate: [15, 20] },
          { name: "Fracture du maxillaire inférieur - Consolidation vicieuse avec trouble léger de l'articulé", searchTerms: ["fracture maxillaire inférieur consolidation vicieuse avec trouble léger l'articulé", "l'articulé léger trouble avec vicieuse consolidation inférieur maxillaire fracture", "fracture maxillaire inférieur consolidation vicieuse trouble léger l'articulé", "fracture maxillaire", "maxillaire inférieur"], rate: [5, 10] },
          { name: "Pseudarthrose lâche de la mandibule", searchTerms: ["pseudarthrose lâche mandibule", "mandibule lâche pseudarthrose", "pseudarthrose lâche", "lâche mandibule"], rate: [60, 85] },
          { name: "Pseudarthrose serrée de la branche ascendante", searchTerms: ["pseudarthrose serrée branche ascendante", "ascendante branche serrée pseudarthrose", "branche ascendante pseudarthrose"], rate: [0, 25] },
          { name: "Pseudarthrose lâche de la branche ascendante", searchTerms: ["pseudarthrose lâche branche ascendante", "ascendante branche lâche pseudarthrose", "branche ascendante pseudarthrose"], rate: [10, 15] },
          { name: "Pseudarthrose serrée de la branche horizontale", searchTerms: ["pseudarthrose serrée branche horizontale", "horizontale branche serrée pseudarthrose", "branche horizontale pseudarthrose"], rate: [5, 10] },
          { name: "Pseudarthrose lâche de la branche horizontale", searchTerms: ["pseudarthrose lâche branche horizontale", "horizontale branche lâche pseudarthrose", "branche horizontale pseudarthrose"], rate: [15, 25] },
          { name: "Pseudarthrose serrée de la région symphysaire", searchTerms: ["pseudarthrose serrée région symphysaire", "symphysaire région serrée pseudarthrose", "région symphysaire pseudarthrose"], rate: [10, 15] },
          { name: "Perte de substance partielle de l'arcade dentaire (mandibule)", searchTerms: ["perte substance partielle l'arcade dentaire mandibule", "amputation substance partielle l'arcade dentaire mandibule", "mandibule dentaire l'arcade partielle substance perte", "perte substance", "substance partielle"], rate: [0, 5] },
          { name: "Ankylose temporo-maxillaire osseuse", searchTerms: ["ankylose temporo maxillaire osseuse", "osseuse maxillaire temporo ankylose", "ankylose temporo", "temporo maxillaire", "maxillaire osseuse"], rate: [80, 90] },
          { name: "Luxation irréductible temporo-maxillaire", searchTerms: ["luxation irréductible temporo maxillaire", "maxillaire temporo irréductible luxation", "luxation irréductible", "irréductible temporo", "temporo maxillaire"], rate: [10, 50] },
          { name: "Luxation récidivante temporo-maxillaire", searchTerms: ["luxation récidivante temporo maxillaire", "maxillaire temporo récidivante luxation", "luxation récidivante", "récidivante temporo", "temporo maxillaire"], rate: [5, 20] },
          { name: "Constriction des mâchoires (écartement < 10 mm)", searchTerms: ["constriction des mâchoires écartement", "écartement mâchoires des constriction", "constriction mâchoires écartement", "constriction des", "des mâchoires"], rate: [20, 80] },
          { name: "Constriction des mâchoires (écartement 10 à 30 mm)", searchTerms: ["constriction des mâchoires écartement", "écartement mâchoires des constriction", "constriction mâchoires écartement", "constriction des", "des mâchoires"], rate: [5, 20] },
          { name: "Constriction des mâchoires avec troubles salivaires, etc.", searchTerms: ["constriction des mâchoires avec troubles salivaires, etc.", "etc. salivaires, troubles avec mâchoires des constriction", "constriction mâchoires troubles salivaires, etc.", "constriction des", "des mâchoires"], rate: [10, 20] },
          { name: "Syndrome algo-dysfonctionnel de l'appareil manducateur (SADAM) post-traumatique", searchTerms: ["syndrome algo dysfonctionnel l'appareil manducateur sadam post traumatique", "traumatique post sadam manducateur l'appareil dysfonctionnel algo syndrome", "syndrome algo", "algo dysfonctionnel", "dysfonctionnel l'appareil"], rate: [5, 25], rateCriteria: { low: "Claquerents articulaires occasionnels, douleurs légères à la mastication d'aliments durs.", medium: "Douleurs fréquentes, limitation modérée de l'ouverture buccale (< 30mm), céphalées.", high: "Douleurs invalidantes quasi-permanentes, limitation sévère de l'ouverture buccale (< 20mm), retentissement sur l'alimentation." } },
          { name: "Fistule bucco-sinusienne persistante post-traumatique", searchTerms: ["fistule bucco sinusienne persistante post traumatique", "traumatique post persistante sinusienne bucco fistule", "fistule bucco", "bucco sinusienne", "sinusienne persistante"], rate: [10, 25], rateCriteria: { low: "Communication de petite taille, asymptomatique ou avec passage occasionnel de liquide.", high: "Communication large avec passage d'aliments, sinusites à répétition, nécessité de chirurgie complexe." } },
          {
            name: "Séquelles de fracture des os propres du nez",
            searchTerms: ["séquelles fracture des propres nez", "nez propres des fracture séquelles", "séquelles fracture propres nez", "séquelles fracture", "fracture des"], rate: [3, 15],
            rateCriteria: {
              low: "Préjudice esthétique minime, sans trouble ventilatoire.",
              medium: "Déformation visible (cal vicieux) avec retentissement esthétique modéré et/ou obstruction nasale unilatérale.",
              high: "Déformation majeure (nez ensellé, déviation importante) et/ou obstruction nasale bilatérale invalidante."
            }
          },
          {
            name: "Séquelles de fracture de l'os malaire (zygomatique)",
            searchTerms: ["séquelles fracture l'os malaire zygomatique", "zygomatique malaire l'os fracture séquelles", "séquelles fracture", "fracture l'os", "l'os malaire"], rate: [5, 25],
            rateCriteria: {
              low: "Hypoesthésie isolée dans le territoire du nerf sous-orbitaire, sans déformation.",
              medium: "Enfoncement modéré avec asymétrie faciale et/ou diplopie dans les regards extrêmes.",
              high: "Enfoncement majeur avec préjudice esthétique important, et/ou diplopie invalidante, et/ou limitation de l'ouverture buccale par conflit avec le processus coronoïde."
            }
          },
        ]
      },
      {
        name: "Face - Dents, Langue, Pharynx",
        injuries: [
          { name: "Perte d'une ou deux dents (n'entraînant pas d'incapacité)", searchTerms: ["perte d'une deux dents n'entraînant pas d'incapacité", "amputation d'une deux dents n'entraînant pas d'incapacité", "d'incapacité pas n'entraînant dents deux d'une perte", "perte d'une", "d'une deux"], rate: 0 },
          { name: "Perte de plusieurs dents (coefficient par dent) - Incisives/Canines", description: "Le taux est évalué en attribuant un coefficient de 1 par dent perdue.", rate: 1 },
          { name: "Perte de plusieurs dents (coefficient par dent) - Prémolaires", description: "Le taux est évalué en attribuant un coefficient de 1.25 par dent perdue.", rate: 1.25 },
          { name: "Perte de plusieurs dents (coefficient par dent) - Molaires", description: "Le taux est évalué en attribuant un coefficient de 1.5 par dent perdue.", rate: 1.5 },
          {
            name: "Séquelles de fracture dentaire coronaire avec atteinte pulpaire (par dent vitale traitée)",
            searchTerms: ["séquelles fracture dentaire coronaire avec atteinte pulpaire par dent vitale traitée", "traitée vitale dent par pulpaire atteinte avec coronaire dentaire fracture séquelles", "séquelles fracture dentaire coronaire atteinte pulpaire par dent vitale traitée", "séquelles fracture", "fracture dentaire"], rate: 0.5,
            description: "Coefficient par dent. S'ajoute en cas de complications."
          },
          {
            name: "Séquelles de luxation/subluxation dentaire avec nécrose ou ankylose (par dent)",
            searchTerms: ["séquelles luxation/subluxation dentaire avec nécrose ankylose par dent", "dent par ankylose nécrose avec dentaire luxation/subluxation séquelles", "séquelles luxation/subluxation dentaire nécrose ankylose par dent", "séquelles luxation/subluxation", "luxation/subluxation dentaire"], rate: 1,
            description: "Coefficient par dent, à évaluer comme une perte si l'extraction est inévitable."
          },
           {
            name: "Parodontolyse post-traumatique (par dent avec mobilité anormale)",
            searchTerms: ["parodontolyse post traumatique par dent avec mobilité anormale", "anormale mobilité avec dent par traumatique post parodontolyse", "parodontolyse post traumatique par dent mobilité anormale", "parodontolyse post", "post traumatique"], rate: [0.5, 1],
            description: "Coefficient par dent. Perte de l'os et de l'attache autour d'une dent suite à un choc, entraînant une mobilité anormale.",
            rateCriteria: {
                low: "Mobilité légère, sans gêne à la mastication.",
                high: "Mobilité importante compromettant la fonction et le pronostic de la dent."
            }
          },
          { name: "Amputation partielle de la langue (gêne légère)", searchTerms: ["amputation partielle langue gêne légère", "légère gêne langue partielle amputation", "amputation partielle", "partielle langue", "langue gêne"], rate: [10, 20] },
          { name: "Amputation étendue de la langue (gêne fonctionnelle)", searchTerms: ["amputation étendue langue gêne fonctionnelle", "fonctionnelle gêne langue étendue amputation", "amputation étendue", "étendue langue", "langue gêne"], rate: [35, 75] },
          { name: "Amputation totale de la langue", searchTerms: ["amputation totale langue", "langue totale amputation", "amputation totale", "totale langue"], rate: 80 },
          { name: "Gêne de la déglutition par cicatrice pharyngée", searchTerms: ["gêne déglutition par cicatrice pharyngée", "pharyngée cicatrice par déglutition gêne", "gêne déglutition", "déglutition par", "par cicatrice"], rate: [10, 30] },
          { name: "Agueusie (perte du goût) post-traumatique", searchTerms: ["agueusie perte goût post traumatique", "agueusie amputation goût post traumatique", "traumatique post goût perte agueusie", "agueusie perte", "perte goût"], rate: [5, 10], rateCriteria: { low: "Perte partielle (hypogueusie), altération de la qualité de vie.", high: "Perte totale et définitive, avec retentissement sur l'appétit et le poids." } },
          { name: "Fistules salivaires", searchTerms: ["fistules salivaires"], rate: [10, 30], rateCriteria: { low: "Débit faible et intermittent.", high: "Débit important, continu, avec macération cutanée." } },
        ]
      },
      {
        name: "Face - Séquelles des Brûlures",
        injuries: [
          { name: "Cicatrices rétractiles des paupières (ectropion, lagophtalmie, etc.)", searchTerms: ["cicatrices rétractiles des paupières ectropion, lagophtalmie, etc.", "etc. lagophtalmie, ectropion, paupières des rétractiles cicatrices", "cicatrices rétractiles paupières ectropion, lagophtalmie, etc.", "cicatrices rétractiles", "rétractiles des"], rate: [5, 20], rateCriteria: { low: "Atteinte unilatérale légère.", high: "Atteinte bilatérale sévère avec occlusion incomplète." } },
          { name: "Cicatrices sténosantes des orifices (bouche, nez)", searchTerms: ["cicatrices sténosantes des orifices bouche, nez", "nez bouche, orifices des sténosantes cicatrices", "cicatrices sténosantes orifices bouche, nez", "cicatrices sténosantes", "sténosantes des"], rate: [10, 50], rateCriteria: { low: "Sténose narinaire unilatérale ou microstomie légère.", high: "Sténose bilatérale ou microstomie sévère gênant l'alimentation." } },
          { name: "Préjudice esthétique important lié aux brûlures de la face", searchTerms: ["préjudice esthétique important lié aux brûlures face", "face brûlures aux lié important esthétique préjudice", "préjudice esthétique", "esthétique important", "important lié"], rate: [20, 40], rateCriteria: { low: "Cicatrices étendues mais peu dyschromiques ou hypertrophiques.", high: "Cicatrices défigurantes, avec retentissement social majeur." } },
        ]
      },
      {
        name: "Yeux - Cécité et Baisse de Vision",
        injuries: [
          { name: "Cécité complète", searchTerms: ["cécité complète"], rate: 100 },
          { name: "Quasi-cécité ou cécité professionnelle", searchTerms: ["quasi cécité cécité professionnelle", "professionnelle cécité cécité quasi", "quasi cécité", "cécité cécité", "cécité professionnelle"], rate: 100 },
          { name: "Perte complète de la vision d'un oeil (l'autre étant normal)", searchTerms: ["perte complète vision d'un oeil l'autre étant normal", "perte complète vision oeil normal", "perte totale vision oeil unique", "cécité complète un oeil", "aveugle d'un oeil", "perte vision complète oeil"], rate: 30 },
          { name: "Perte de la vision d'un oeil sans difformité apparente", searchTerms: ["perte vision d'un oeil sans difformité apparente", "perte vision oeil sans difformité", "cécité un oeil sans difformité", "aveugle oeil sans difformité", "perte totale vision oeil sans difformité", "non voyant un oeil sans difformité"], rate: [25, 30] },
          { name: "Ablation ou altération du globe avec prothèse possible", searchTerms: ["ablation altération globe avec prothèse possible", "ablation globe oculaire prothèse", "énucléation oeil prothèse", "altération globe prothèse possible", "extraction globe oeil prothèse"], rate: [28, 33] },
          { name: "Ablation ou altération du globe sans prothèse possible", searchTerms: ["ablation altération globe sans prothèse possible", "ablation globe sans prothèse", "énucléation oeil sans prothèse", "altération globe sans prothèse", "extraction globe sans prothèse possible"], rate: [35, 40] },
          { name: "Diminution de la vision des deux yeux (selon tableau à double entrée)", description: "Se référer au tableau p.120 du PDF. Un outil de calcul dédié est recommandé.", rate: [0, 100] },
          
          // 🆕 V3.3.136 - Acuité visuelle unilatérale spécifique
          { name: "Acuité visuelle 9/10 ou 10/10 un œil", description: "Vision normale ou quasi-normale d'un seul œil.", rate: [0, 2] },
          { name: "Acuité visuelle 8/10 un œil", description: "Légère baisse d'acuité sur un œil.", rate: [2, 5] },
          { name: "Acuité visuelle 7/10 un œil", description: "Baisse modérée d'acuité sur un œil.", rate: [5, 8] },
          { name: "Acuité visuelle 6/10 un œil", description: "Baisse moyenne d'acuité sur un œil.", rate: [8, 12] },
          { name: "Acuité visuelle 5/10 un œil", description: "Baisse importante d'acuité sur un œil.", rate: [12, 18] },
          { name: "Acuité visuelle 4/10 un œil", description: "Baisse sévère d'acuité sur un œil.", rate: [18, 22] },
          { name: "Acuité visuelle 3/10 un œil", description: "Baisse profonde d'acuité sur un œil.", rate: [22, 27] },
          { name: "Acuité visuelle 2/10 un œil", description: "Acuité très basse sur un œil.", rate: [27, 30] },
          { name: "Acuité visuelle 1/10 un œil", description: "Acuité quasiment nulle sur un œil.", rate: [30, 33] },
          { name: "Acuité visuelle <1/20 un œil", description: "Quasi-cécité d'un œil (compte doigts, perception lumière).", rate: [33, 35] },
          
          // 🆕 V3.3.136 - Acuité visuelle bilatérale spécifique (exemples communs)
          { name: "Acuité visuelle bilatérale 5/10 - 6/10", description: "Vision bilatérale moyenne (OD 5/10, OG 6/10 ou similaire).", rate: [40, 50] },
          { name: "Acuité visuelle bilatérale 4/10 - 5/10", description: "Vision bilatérale basse (OD 4/10, OG 5/10 ou similaire).", rate: [50, 60] },
          { name: "Acuité visuelle bilatérale 3/10 - 4/10", description: "Vision bilatérale très basse (OD 3/10, OG 4/10 ou similaire).", rate: [60, 70] },
          { name: "Acuité visuelle bilatérale 2/10 - 3/10", description: "Malvoyance sévère bilatérale (OD 2/10, OG 3/10 ou similaire).", rate: [70, 80] },
          { name: "Acuité visuelle bilatérale 1/10 - 2/10", description: "Malvoyance profonde bilatérale (OD 1/10, OG 2/10 ou similaire).", rate: [80, 90] },
          { name: "Acuité visuelle bilatérale <1/20 ou cécité", description: "Cécité bilatérale ou quasi-cécité des deux yeux.", rate: [90, 100] },
          
          // 🆕 V3.3.136 - Cataracte bilatérale post-traumatique
          { name: "Cataracte bilatérale opérée avec implants (acuité résiduelle 5-6/10)", description: "Cataracte bilatérale post-traumatique opérée, résultat visuel moyen.", rate: [40, 55] },
          { name: "Cataracte bilatérale opérée avec implants (acuité résiduelle 7-8/10)", description: "Cataracte bilatérale post-traumatique opérée, bon résultat visuel.", rate: [25, 40] },
          { name: "Cataracte bilatérale opérée avec implants (acuité résiduelle 3-4/10)", description: "Cataracte bilatérale post-traumatique opérée, résultat visuel médiocre.", rate: [55, 70] },
        ]
      },
      {
        name: "Yeux - Champ Visuel et Vision Binoculaire",
        injuries: [
          { name: "Rétrécissement concentrique à 30° (un oeil)", searchTerms: ["rétrécissement concentrique 30° oeil", "rétrécissement concentrique 30° vision", "oeil 30° concentrique rétrécissement", "rétrécissement concentrique", "concentrique 30°"], rate: [3, 5] },
          { name: "Rétrécissement concentrique à 30° (deux yeux)", searchTerms: ["rétrécissement concentrique 30° deux yeux", "yeux deux 30° concentrique rétrécissement", "rétrécissement concentrique", "concentrique 30°", "30° deux"], rate: [5, 20] },
          { name: "Rétrécissement concentrique à 10° (un oeil)", searchTerms: ["rétrécissement concentrique 10° oeil", "rétrécissement concentrique 10° vision", "oeil 10° concentrique rétrécissement", "rétrécissement concentrique", "concentrique 10°"], rate: [10, 15] },
          { name: "Rétrécissement concentrique à 10° (deux yeux)", searchTerms: ["rétrécissement concentrique 10° deux yeux", "yeux deux 10° concentrique rétrécissement", "rétrécissement concentrique", "concentrique 10°", "10° deux"], rate: [70, 80] },
          { name: "Scotomes centraux (un oeil)", searchTerms: ["scotomes centraux oeil", "scotomes centraux vision", "oeil centraux scotomes", "scotomes centraux", "centraux oeil"], rate: [15, 30] },
          { name: "Scotomes centraux (deux yeux)", searchTerms: ["scotomes centraux deux yeux", "yeux deux centraux scotomes", "scotomes centraux", "centraux deux", "deux yeux"], rate: [40, 100] },
          { name: "Hémianopsie homonyme droite ou gauche", searchTerms: ["hémianopsie homonyme droite gauche", "gauche droite homonyme hémianopsie", "hémianopsie homonyme", "homonyme droite", "droite gauche"], rate: [30, 35] },
          { name: "Hémianopsie hétéronyme nasale", searchTerms: ["hémianopsie hétéronyme nasale", "nasale hétéronyme hémianopsie", "hémianopsie hétéronyme", "hétéronyme nasale"], rate: [10, 15] },
          { name: "Hémianopsie hétéronyme bitemporale", searchTerms: ["hémianopsie hétéronyme bitemporale", "bitemporale hétéronyme hémianopsie", "hémianopsie hétéronyme", "hétéronyme bitemporale"], rate: [70, 80] },
          { name: "Hémianopsie horizontale supérieure", searchTerms: ["hémianopsie horizontale supérieure", "supérieure horizontale hémianopsie", "hémianopsie horizontale", "horizontale supérieure"], rate: [10, 15] },
          { name: "Hémianopsie horizontale inférieure", searchTerms: ["hémianopsie horizontale inférieure", "inférieure horizontale hémianopsie", "hémianopsie horizontale", "horizontale inférieure"], rate: [30, 50] },
          { name: "Hémianopsie en quadrant supérieure", searchTerms: ["hémianopsie quadrant supérieure", "supérieure quadrant hémianopsie", "hémianopsie quadrant", "quadrant supérieure"], rate: [7, 10] },
          { name: "Hémianopsie en quadrant inférieure", searchTerms: ["hémianopsie quadrant inférieure", "inférieure quadrant hémianopsie", "hémianopsie quadrant", "quadrant inférieure"], rate: [20, 25] },
          { name: "Hémianopsie chez un borgne - Nasale", searchTerms: ["hémianopsie chez borgne nasale", "nasale borgne chez hémianopsie", "hémianopsie chez", "chez borgne", "borgne nasale"], rate: [60, 70] },
          { name: "Hémianopsie chez un borgne - Inférieure", searchTerms: ["hémianopsie chez borgne inférieure", "inférieure borgne chez hémianopsie", "hémianopsie chez", "chez borgne", "borgne inférieure"], rate: [70, 80] },
          { name: "Hémianopsie chez un borgne - Temporale", searchTerms: ["hémianopsie chez borgne temporale", "temporale borgne chez hémianopsie", "hémianopsie chez", "chez borgne", "borgne temporale"], rate: [80, 90] },
          { name: "Diplopie", searchTerms: ["diplopie"], rate: [5, 20] },
          { name: "Diplopie dans la partie inférieure du champ", searchTerms: ["diplopie dans partie inférieure champ", "champ inférieure partie dans diplopie", "diplopie dans", "dans partie", "partie inférieure"], rate: [10, 25] },
        ]
      },
      {
        name: "Yeux - Lésions Spécifiques et Annexes",
        injuries: [
          { name: "Taies de cornée (selon gêne visuelle)", description: "Le taux est évalué d'après le tableau d'acuité visuelle, avec un taux complémentaire basé sur le degré de vision obtenu après rétrécissement pupillaire. Voir p.128 du barème pour les conditions.", rate: [0, 100] },
          { name: "Cataracte (selon acuité et complications)", description: "Le taux est basé sur l'acuité visuelle corrigée + majorations pour gêne ou impossibilité de porter un verre. Voir p.130-131 du barème pour les calculs complexes.", rate: [10, 100] },
          { name: "Hémorragies du vitré", description: "L'incapacité est évaluée en fonction de la baisse d'acuité visuelle résiduelle, si elle ne se résorbe pas.", rate: [0, 100] },
          { name: "Décollement de la rétine post-traumatique", description: "L'incapacité est évaluée en fonction des séquelles sur l'acuité visuelle et le champ visuel.", rate: [0, 100] },
          { name: "Atrophie optique post-traumatique", searchTerms: ["atrophie optique post traumatique", "traumatique post optique atrophie", "atrophie optique", "optique post", "post traumatique"], rate: [30, 80], description: "Dégénérescence des fibres du nerf optique suite à un traumatisme crânien ou orbitaire, conduisant à une perte de vision progressive et irréversible.", rateCriteria: { low: "Atteinte unilatérale avec acuité visuelle corrigée > 2/10 et champ visuel modérément altéré.", high: "Atteinte bilatérale sévère avec acuité visuelle < 1/10 et/ou champ visuel tubulaire." } },
          { name: "Glaucome post-traumatique", searchTerms: ["glaucome post traumatique", "traumatique post glaucome", "glaucome post", "post traumatique"], rate: [10, 40], description: "Augmentation de la pression intra-oculaire après un traumatisme oculaire.", rateCriteria: { low: "Pression bien contrôlée par un seul collyre, sans altération du champ visuel.", high: "Pression mal contrôlée malgré un traitement maximal, avec altération significative et progressive du champ visuel." } },
          { name: "Uvéite post-traumatique chronique", searchTerms: ["uvéite post traumatique chronique", "chronique traumatique post uvéite", "uvéite post", "post traumatique", "traumatique chronique"], rate: [10, 30], description: "Inflammation intraoculaire persistante après un traumatisme.", rateCriteria: { low: "Poussées rares et bien contrôlées par traitement local, sans baisse d'acuité visuelle permanente.", high: "Poussées fréquentes avec complications (synéchies, cataracte, glaucome secondaire) et baisse d'acuité visuelle." } },
          {
            name: "Séquelles d'endophtalmie post-traumatique (infection intraoculaire)",
            searchTerms: ["séquelles d'endophtalmie post traumatique infection intraoculaire", "intraoculaire infection traumatique post d'endophtalmie séquelles", "séquelles d'endophtalmie", "d'endophtalmie post", "post traumatique"], rate: [10, 35],
            description: "Séquelles d'une infection grave de l'œil après un traumatisme perforant. Le taux indemnise les complications (douleurs chroniques, uvéite, glaucome secondaire) en plus de la baisse de vision, qui est évaluée séparément.",
            rateCriteria: {
                low: "Infection traitée avec succès, séquelles minimes (corps flottants), sans baisse de vision majeure.",
                high: "Complications sévères : douleurs chroniques, glaucome secondaire, phtisie du globe (atrophie de l'œil), nécessitant une énucléation."
            }
          },
          { name: "Ophtalmie sympathique",
            searchTerms: ["ophtalmie sympathique"], rate: [20, 80],
            description: "Inflammation auto-immune grave de l'œil sain (non traumatisé) après un traumatisme perforant de l'autre œil. Le taux dépend du retentissement visuel sur l'œil sympathisant.",
            rateCriteria: {
                low: "Inflammation contrôlée par le traitement, avec baisse de vision modérée sur l'œil sain.",
                high: "Uvéite pan-uvéite sévère et chronique sur l'œil sain, conduisant à une malvoyance ou une cécité bilatérale."
            }
          },
          { name: "Phthisis bulbi (atrophie du globe oculaire) post-traumatique", searchTerms: ["phthisis bulbi atrophie globe oculaire post traumatique", "traumatique post oculaire globe atrophie bulbi phthisis", "phthisis bulbi", "bulbi atrophie", "atrophie globe"], rate: [35, 40], description: "Équivaut à la perte anatomique de l'œil sans possibilité d'appareillage esthétique satisfaisant.", rateCriteria: { low: "Atrophie modérée avec possibilité d'une prothèse de recouvrement.", high: "Atrophie majeure, déformation importante de l'orbite, prothèse impossible." } },
          { name: "Paralysie de l'accommodation - Ophtalmoplégie interne totale unilatérale", searchTerms: ["paralysie l'accommodation ophtalmoplégie interne totale unilatérale", "unilatérale totale interne ophtalmoplégie l'accommodation paralysie", "paralysie l'accommodation", "l'accommodation ophtalmoplégie", "ophtalmoplégie interne"], rate: [10, 15] },
          { name: "Paralysie de l'accommodation - Ophtalmoplégie interne totale bilatérale", searchTerms: ["paralysie l'accommodation ophtalmoplégie interne totale bilatérale", "bilatérale totale interne ophtalmoplégie l'accommodation paralysie", "paralysie l'accommodation", "l'accommodation ophtalmoplégie", "ophtalmoplégie interne"], rate: [15, 20] },
          { name: "Paralysie du sphincter irien - Mydriase existant seule unilatérale", searchTerms: ["paralysie sphincter irien mydriase existant seule unilatérale", "unilatérale seule existant mydriase irien sphincter paralysie", "paralysie sphincter", "sphincter irien", "irien mydriase"], rate: [3, 5] },
          { name: "Paralysie du sphincter irien - Mydriase existant seule bilatérale", searchTerms: ["paralysie sphincter irien mydriase existant seule bilatérale", "bilatérale seule existant mydriase irien sphincter paralysie", "paralysie sphincter", "sphincter irien", "irien mydriase"], rate: [7, 10] },
          { name: "Voies lacrymales - Larmoiement ou fistules (un oeil)", searchTerms: ["voies lacrymales larmoiement fistules oeil", "voies lacrymales larmoiement fistules vision", "oeil fistules larmoiement lacrymales voies", "voies lacrymales", "lacrymales larmoiement"], rate: [0, 10] },
          { name: "Voies lacrymales - Larmoiement ou fistules (chaque oeil)", searchTerms: ["voies lacrymales larmoiement fistules chaque oeil", "voies lacrymales larmoiement fistules chaque vision", "oeil chaque fistules larmoiement lacrymales voies", "voies lacrymales", "lacrymales larmoiement"], rate: [5, 10] },
          { name: "Orbite - Fracture du plancher de l'orbite (Blow-out) avec séquelles", searchTerms: ["orbite fracture plancher l'orbite blow out avec séquelles", "séquelles avec out blow l'orbite plancher fracture orbite", "orbite fracture plancher l'orbite blow out séquelles", "orbite fracture", "fracture plancher"], rate: [5, 25], description: "Séquelles d'une fracture du plancher orbitaire, telles que la diplopie (vision double), l'énophtalmie (recul du globe oculaire) ou l'hypoesthésie dans le territoire du nerf sous-orbitaire.", rateCriteria: { low: "Hypoesthésie sous-orbitaire isolée et discrète, ou diplopie uniquement dans les regards extrêmes.", high: "Diplopie invalidante dans le regard primaire, et/ou énophtalmie inesthétique > 2mm." } },
          { name: "Orbite - Paralysie d'un ou plusieurs nerfs oculo-moteurs (voir diplopie)", searchTerms: ["orbite paralysie d'un plusieurs nerfs oculo moteurs voir diplopie", "diplopie voir moteurs oculo nerfs plusieurs d'un paralysie orbite", "orbite paralysie", "paralysie d'un", "d'un plusieurs"], rate: [5, 25] },
          { name: "Orbite - Névrites, névralgies du nerf V (trijumeau)", searchTerms: ["orbite névrites, névralgies nerf trijumeau", "trijumeau nerf névralgies névrites, orbite", "orbite névrites,", "névrites, névralgies", "névralgies nerf"], rate: [15, 25] },
          { name: "Orbite - Altérations vasculaires (anévrisme, etc.)", description: "À indemniser selon les troubles fonctionnels.", rate: [10, 30] },
          { name: "Paupières - Déviation des bords palpébraux (entropion, ectropion, cicatrices vicieuses)", searchTerms: ["paupières déviation des bords palpébraux entropion, ectropion, cicatrices vicieuses", "vicieuses cicatrices ectropion, entropion, palpébraux bords des déviation paupières", "paupières déviation bords palpébraux entropion, ectropion, cicatrices vicieuses", "paupières déviation", "déviation des"], rate: [5, 20] },
          { name: "Paupières - Ptosis ou blépharospasme (un oeil)", searchTerms: ["paupières ptosis blépharospasme oeil", "paupières ptosis blépharospasme vision", "oeil blépharospasme ptosis paupières", "paupières ptosis", "ptosis blépharospasme"], rate: [5, 25] },
          { name: "Paupières - Ptosis ou blépharospasme (deux yeux)", searchTerms: ["paupières ptosis blépharospasme deux yeux", "yeux deux blépharospasme ptosis paupières", "paupières ptosis", "ptosis blépharospasme", "blépharospasme deux"], rate: [20, 70] },
          { name: "Paupières - Lagophtalmie cicatricielle ou paralytique", description: "Ajouter 10 p. 100 pour un oeil.", rate: 10 },
        ]
      },
      {
        name: "Oreilles - Lésions Externes et Moyennes",
        injuries: [
          { name: "Mutilations et cicatrices vicieuses de l'oreille externe", searchTerms: ["mutilations cicatrices vicieuses l'oreille externe", "externe l'oreille vicieuses cicatrices mutilations", "mutilations cicatrices", "cicatrices vicieuses", "vicieuses l'oreille"], rate: [2, 10] },
          { name: "Fracture du rocher avec complications (paralysie faciale, surdité, vertiges)", searchTerms: ["fracture rocher avec complications paralysie faciale, surdité, vertiges", "vertiges surdité, faciale, paralysie complications avec rocher fracture", "fracture rocher complications paralysie faciale, surdité, vertiges", "fracture rocher", "rocher avec"], rate: [20, 60], rateCriteria: { low: "Séquelles vestibulaires ou auditives légères, paralysie faciale partielle bien récupérée.", high: "Association de séquelles sévères : cophose, paralysie faciale complète, vertiges invalidants." } },
          { name: "Sténose du conduit auditif unilatérale", searchTerms: ["sténose conduit auditif unilatérale", "sténose conduit audition unilatérale", "unilatérale auditif conduit sténose", "sténose conduit", "conduit auditif"], rate: [1, 5] },
          { name: "Sténose du conduit auditif bilatérale", searchTerms: ["sténose conduit auditif bilatérale", "sténose conduit audition bilatérale", "bilatérale auditif conduit sténose", "sténose conduit", "conduit auditif"], rate: [1, 10] },
          { name: "Otorrhée traumatique unilatérale", searchTerms: ["otorrhée traumatique unilatérale", "unilatérale traumatique otorrhée", "otorrhée traumatique", "traumatique unilatérale"], rate: [1, 5] },
          { name: "Otorrhée tubaire unilatérale", searchTerms: ["otorrhée tubaire unilatérale", "unilatérale tubaire otorrhée", "otorrhée tubaire", "tubaire unilatérale"], rate: [1, 8] },
          { name: "Otorrhée chronique avec ostéite unilatérale", searchTerms: ["otorrhée chronique avec ostéite unilatérale", "unilatérale ostéite avec chronique otorrhée", "otorrhée chronique ostéite unilatérale", "otorrhée chronique", "chronique avec"], rate: [5, 10] },
          { name: "Otorrhée chronique avec ostéite bilatérale", searchTerms: ["otorrhée chronique avec ostéite bilatérale", "bilatérale ostéite avec chronique otorrhée", "otorrhée chronique ostéite bilatérale", "otorrhée chronique", "chronique avec"], rate: [8, 15] },
          { name: "Bourdonnements d'oreille (acouphènes) isolés", description: "Ce taux s'ajoute à celui d'une éventuelle surdité.", rate: [5, 10] },
        ]
      },
      {
        name: "Oreilles - Diminution de l'Acuité Auditive (Surdité)",
        injuries: [
          { name: "Diminution de l'acuité auditive", description: "Le taux est calculé selon un tableau complexe (p.140 du PDF) basé sur la perte en décibels. Un outil dédié est recommandé.", rate: [0, 70] },
          
          // 🆕 V3.3.136 - Surdité unilatérale spécifique
          { name: "Surdité unilatérale légère (perte 20-30 dB)", description: "Hypoacousie légère d'une oreille, oreille controlatérale normale.", rate: [2, 5] },
          { name: "Surdité unilatérale modérée (perte 40-50 dB)", description: "Hypoacousie modérée d'une oreille, oreille controlatérale normale.", rate: [5, 10] },
          { name: "Surdité unilatérale moyenne (perte 55-70 dB)", description: "Hypoacousie moyenne d'une oreille, oreille controlatérale normale.", rate: [10, 15] },
          { name: "Surdité unilatérale profonde", description: "Surdité profonde ou complète (cophose/anacousie) d'une oreille, oreille controlatérale normale.", rate: [15, 20] },
          
          // 🆕 V3.3.136 - Surdité bilatérale spécifique
          { name: "Surdité bilatérale légère (perte 20-30 dB)", description: "Hypoacousie légère bilatérale symétrique ou moyenne bilatérale 20-30 dB.", rate: [8, 15] },
          { name: "Surdité bilatérale modérée (perte 40-50 dB)", description: "Hypoacousie modérée bilatérale nécessitant appareillage.", rate: [20, 30] },
          { name: "Surdité bilatérale moyenne (perte 55-70 dB)", description: "Hypoacousie moyenne-sévère bilatérale, appareillage indispensable.", rate: [35, 50] },
          { name: "Surdité bilatérale sévère (perte 70-85 dB)", description: "Surdité sévère bilatérale avec gêne majeure, même appareillé.", rate: [50, 60] },
          { name: "Surdité bilatérale profonde (perte > 85 dB)", description: "Anacousie ou cophose bilatérale, communication très altérée.", rate: [60, 70] },
          
          // 🆕 V3.3.136 - Surdité asymétrique
          { name: "Surdité asymétrique (OD/OG > 25 dB différence)", description: "Asymétrie auditive importante entre les deux oreilles (différence > 25 dB).", rate: [15, 35] },
        ]
      },
      {
        name: "Oreilles - Vertiges et Troubles de l'Équilibre",
        injuries: [
          { name: "Vertiges et troubles de l'équilibre", description: "L'évaluation est complexe et dépend des résultats des épreuves vestibulaires.", rate: [5, 40] },
          { name: "Vertiges - 1er degré (pas de trouble objectif)", searchTerms: ["vertiges 1er degré pas trouble objectif", "objectif trouble pas degré 1er vertiges", "vertiges 1er", "1er degré", "degré pas"], rate: [5, 10] },
          { name: "Vertiges - 2ème degré (hyper-excitabilité aux épreuves)", searchTerms: ["vertiges 2ème degré hyper excitabilité aux épreuves", "épreuves aux excitabilité hyper degré 2ème vertiges", "vertiges 2ème", "2ème degré", "degré hyper"], rate: [10, 20] },
          { name: "Vertiges - 3ème degré (troubles objectifs)", searchTerms: ["vertiges 3ème degré troubles objectifs", "objectifs troubles degré 3ème vertiges", "vertiges 3ème", "3ème degré", "degré troubles"], rate: [20, 40] },
        ]
      },
      {
        name: "Voies Respiratoires Supérieures",
        injuries: [
          { name: "Sténose nasale unilatérale simple", searchTerms: ["sténose nasale unilatérale simple", "simple unilatérale nasale sténose", "sténose nasale", "nasale unilatérale", "unilatérale simple"], rate: [0, 3] },
          { name: "Sténose nasale unilatérale avec formation de croûtes", searchTerms: ["sténose nasale unilatérale avec formation croûtes", "croûtes formation avec unilatérale nasale sténose", "sténose nasale unilatérale formation croûtes", "sténose nasale", "nasale unilatérale"], rate: [3, 8] },
          { name: "Sténose nasale unilatérale avec sinusite", searchTerms: ["sténose nasale unilatérale avec sinusite", "sinusite avec unilatérale nasale sténose", "sténose nasale unilatérale sinusite", "sténose nasale", "nasale unilatérale"], rate: [6, 10] },
          { name: "Sténose nasale bilatérale légère", searchTerms: ["sténose nasale bilatérale légère", "légère bilatérale nasale sténose", "sténose nasale", "nasale bilatérale", "bilatérale légère"], rate: [5, 8] },
          { name: "Sténose nasale bilatérale accentuée", searchTerms: ["sténose nasale bilatérale accentuée", "accentuée bilatérale nasale sténose", "sténose nasale", "nasale bilatérale", "bilatérale accentuée"], rate: [8, 12] },
          { name: "Sténose nasale bilatérale serrée", searchTerms: ["sténose nasale bilatérale serrée", "serrée bilatérale nasale sténose", "sténose nasale", "nasale bilatérale", "bilatérale serrée"], rate: [12, 20] },
          { name: "Perforation de la cloison nasale", searchTerms: ["perforation cloison nasale", "nasale cloison perforation", "perforation cloison", "cloison nasale"], rate: 0 },
          { name: "Anosmie (perte de l'odorat)", searchTerms: ["anosmie perte l'odorat", "anosmie amputation l'odorat", "l'odorat perte anosmie", "anosmie perte", "perte l'odorat"], rate: [5, 10] },
          { name: "Anosmie avec nécessité de changement de profession", searchTerms: ["anosmie avec nécessité changement profession", "profession changement nécessité avec anosmie", "anosmie nécessité changement profession", "anosmie avec", "avec nécessité"], rate: [20, 30] },
          { name: "Dysgueusie (distorsion du goût) ou Cacosmie (perception d'odeurs nauséabondes)", searchTerms: ["dysgueusie distorsion goût cacosmie perception d'odeurs nauséabondes", "nauséabondes d'odeurs perception cacosmie goût distorsion dysgueusie", "dysgueusie distorsion", "distorsion goût", "goût cacosmie"], rate: [5, 15], description: "Altération qualitative de l'odorat ou du goût, entraînant la perception d'odeurs ou de saveurs désagréables, souvent avec un retentissement sur l'alimentation et la qualité de vie.", rateCriteria: { low: "Distorsions occasionnelles, n'entraînant pas de dégoût alimentaire majeur.", high: "Perceptions désagréables quasi-permanentes, avec aversion alimentaire, perte de poids et retentissement psychologique." } },
          { name: "Troubles esthétiques par mutilation nasale", searchTerms: ["troubles esthétiques par mutilation nasale", "nasale mutilation par esthétiques troubles", "troubles esthétiques", "esthétiques par", "par mutilation"], rate: [5, 30] },
          { name: "Sinusite traumatique", description: "Voir p.164 du PDF pour les détails.", rate: [5, 30] },
          { name: "Rhinites croûteuses post-traumatiques", searchTerms: ["rhinites croûteuses post traumatiques", "traumatiques post croûteuses rhinites", "rhinites croûteuses", "croûteuses post", "post traumatiques"], rate: [5, 20] },
          {
            name: "Séquelles de fracture de l'os hyoïde",
            searchTerms: ["séquelles fracture l'os hyoïde", "hyoïde l'os fracture séquelles", "séquelles fracture", "fracture l'os", "l'os hyoïde"], rate: [10, 30],
            description: "Séquelles d'une fracture de l'os hyoïde, souvent par traumatisme direct sur le cou.",
            rateCriteria: {
              low: "Consolidation sans déplacement, douleurs résiduelles à la déglutition des aliments solides.",
              high: "Cal vicieux avec dysphagie (difficulté à avaler) et/ou dysphonie (trouble de la voix) persistante."
            }
          },
          { name: "Troubles vocaux (dysphonie, aphonie)", searchTerms: ["troubles vocaux dysphonie, aphonie", "aphonie dysphonie, vocaux troubles", "troubles vocaux", "vocaux dysphonie,", "dysphonie, aphonie"], rate: [5, 30] },
          { name: "Paralysie récurrentielle (corde vocale) post-traumatique unilatérale", searchTerms: ["paralysie récurrentielle corde vocale post traumatique unilatérale", "unilatérale traumatique post vocale corde récurrentielle paralysie", "paralysie récurrentielle", "récurrentielle corde", "corde vocale"], rate: [10, 25], rateCriteria: { low: "Dysphonie modérée, voix bitonale, sans dyspnée.", high: "Aphonie ou dysphonie sévère avec dyspnée d'effort." } },
          { name: "Sténose laryngo-trachéale post-traumatique", searchTerms: ["sténose laryngo trachéale post traumatique", "traumatique post trachéale laryngo sténose", "sténose laryngo", "laryngo trachéale", "trachéale post"], rate: [20, 100], rateCriteria: { low: "Dyspnée d'effort modérée, voix conservée.", high: "Dyspnée de repos nécessitant une trachéotomie permanente." } },
          { name: "Syndrome d'apnées-hypopnées du sommeil (SAHS) post-traumatique", searchTerms: ["syndrome d'apnées hypopnées sommeil sahs post traumatique", "traumatique post sahs sommeil hypopnées d'apnées syndrome", "syndrome d'apnées", "d'apnées hypopnées", "hypopnées sommeil"], rate: [10, 30], description: "Apparition ou aggravation d'un SAHS après un traumatisme facial, mandibulaire ou crânien, confirmée par polysomnographie.", rateCriteria: { low: "SAHS modéré (IAH entre 15 et 30/h) avec somnolence diurne, bien contrôlé par orthèse d'avancée mandibulaire.", high: "SAHS sévère (IAH > 30/h) avec complications cardiovasculaires, nécessitant un traitement par Pression Positive Continue (PPC)." } },
          { name: "Troubles respiratoires (dyspnée laryngée)", searchTerms: ["troubles respiratoires dyspnée laryngée", "laryngée dyspnée respiratoires troubles", "troubles respiratoires", "respiratoires dyspnée", "dyspnée laryngée"], rate: [20, 100] },
          { name: "Laryngostomie ou trachéotomie", searchTerms: ["laryngostomie trachéotomie"], rate: 100 },
        ]
      },
    ]
  },
  {
    name: "Séquelles Thoraciques, Abdominales, Pelviennes et Cardio-vasculaires",
    subcategories: [
      {
        name: "Thorax - Paroi Osseuse",
        injuries: [
          { name: "Fracture isolée du sternum - simple", searchTerms: ["fracture isolée sternum simple", "simple sternum isolée fracture", "fracture isolée", "isolée sternum", "sternum simple"], rate: [3, 10] },
          { name: "Fracture isolée du sternum - avec enfoncement", searchTerms: ["fracture isolée sternum avec enfoncement", "enfoncement avec sternum isolée fracture", "fracture isolée sternum enfoncement", "fracture isolée", "isolée sternum"], rate: [10, 20] },
          { name: "Fracture de côtes non compliquée (selon gêne et nombre)", searchTerms: ["fracture côtes non compliquée selon gêne nombre", "nombre gêne selon compliquée non côtes fracture", "fracture côtes", "côtes non", "non compliquée"], rate: [2, 30] },
          {
            name: "Séquelles de volet costal mobile (thoracic flail chest)",
            searchTerms: ["séquelles volet costal mobile thoracic flail chest", "chest flail thoracic mobile costal volet séquelles", "séquelles volet", "volet costal", "costal mobile"], rate: [15, 40],
            description: "Séquelles d'un traumatisme thoracique grave avec fractures de côtes multiples, entraînant une paroi thoracique instable.",
            rateCriteria: {
                low: "Consolidation avec déformation modérée, douleurs mécaniques à l'effort, sans insuffisance respiratoire.",
                medium: "Douleurs chroniques, dyspnée d'effort (stade II) due à la restriction pariétale.",
                high: "Insuffisance respiratoire restrictive chronique (stade III-IV) objectivée par EFR, avec douleurs invalidantes."
            }
          },
          { name: "Grand fracas du thorax", searchTerms: ["grand fracas thorax", "thorax fracas grand", "grand fracas", "fracas thorax"], rate: [30, 50] },
          { name: "Hernie irréductible du poumon", searchTerms: ["hernie irréductible poumon", "poumon irréductible hernie", "hernie irréductible", "irréductible poumon"], rate: [10, 40] },
        ]
      },
      {
        name: "Thorax - Plèvre et Poumons",
        injuries: [
          { name: "Pleurésie traumatique avec déformations", searchTerms: ["pleurésie traumatique avec déformations", "déformations avec traumatique pleurésie", "pleurésie traumatique déformations", "pleurésie traumatique", "traumatique avec"], rate: [5, 30] },
          { name: "Hémothorax, adhérences et rétractions thoraciques", searchTerms: ["hémothorax, adhérences rétractions thoraciques", "thoraciques rétractions adhérences hémothorax,", "hémothorax, adhérences", "adhérences rétractions", "rétractions thoraciques"], rate: [5, 20] },
          { name: "Pyothorax (empyème)", searchTerms: ["pyothorax empyème"], rate: [10, 50] },
          { name: "Fibrose pulmonaire post-traumatique (hors pneumoconiose)", searchTerms: ["fibrose pulmonaire post traumatique hors pneumoconiose", "fibrose poumon post traumatique hors pneumoconiose", "pneumoconiose hors traumatique post pulmonaire fibrose", "fibrose pulmonaire", "pulmonaire post"], rate: [10, 60], rateCriteria: { low: "Images radiologiques discrètes, sans retentissement fonctionnel respiratoire notable.", high: "Fibrose étendue avec insuffisance respiratoire chronique confirmée par EFR." } },
          { name: "Fistule broncho-pleurale chronique", searchTerms: ["fistule broncho pleurale chronique", "chronique pleurale broncho fistule", "fistule broncho", "broncho pleurale", "pleurale chronique"], rate: [30, 60], description: "Communication persistante entre une bronche et l'espace pleural après un traumatisme thoracique.", rateCriteria: { low: "Fistule de petit calibre, bien tolérée, ne nécessitant pas de drainage permanent.", high: "Fistule à haut débit avec empyème chronique, nécessitant un drainage thoracique au long cours ou une chirurgie complexe (thoracoplastie)." } },
          { name: "Chylothorax chronique post-traumatique", searchTerms: ["chylothorax chronique post traumatique", "traumatique post chronique chylothorax", "chylothorax chronique", "chronique post", "post traumatique"], rate: [20, 40], rateCriteria: { low: "Bien contrôlé par régime, sans retentissement nutritionnel majeur.", high: "Chylothorax abondant, récidivant, nécessitant des ponctions ou une chirurgie, avec dénutrition." } },
          { name: "Tuberculose pulmonaire post-traumatique (si incapacité permanente)", searchTerms: ["tuberculose pulmonaire post traumatique incapacité permanente", "tuberculose poumon post traumatique incapacité permanente", "permanente incapacité traumatique post pulmonaire tuberculose", "tuberculose pulmonaire", "pulmonaire post"], rate: [10, 100] },
        ]
      },
      {
        name: "Appareil Circulatoire",
        injuries: [
          { name: "Troubles cardiaques fonctionnels - Bien compensés", searchTerms: ["troubles cardiaques fonctionnels bien compensés", "compensés bien fonctionnels cardiaques troubles", "troubles cardiaques", "cardiaques fonctionnels", "fonctionnels bien"], rate: [5, 20] },
          { name: "Troubles cardiaques fonctionnels - Avec troubles fonctionnels caractérisés", searchTerms: ["troubles cardiaques fonctionnels avec troubles fonctionnels caractérisés", "caractérisés fonctionnels troubles avec fonctionnels cardiaques troubles", "troubles cardiaques fonctionnels troubles fonctionnels caractérisés", "troubles cardiaques", "cardiaques fonctionnels"], rate: [20, 80] },
          { name: "Troubles cardiaques fonctionnels - Avec asystolie confirmée", searchTerms: ["troubles cardiaques fonctionnels avec asystolie confirmée", "confirmée asystolie avec fonctionnels cardiaques troubles", "troubles cardiaques fonctionnels asystolie confirmée", "troubles cardiaques", "cardiaques fonctionnels"], rate: [80, 100] },
          { name: "Séquelles de contusion myocardique (troubles du rythme, insuffisance cardiaque)", searchTerms: ["séquelles contusion myocardique troubles rythme, insuffisance cardiaque", "cardiaque insuffisance rythme, troubles myocardique contusion séquelles", "séquelles contusion", "contusion myocardique", "myocardique troubles"], rate: [15, 50], rateCriteria: { low: "Anomalies ECG isolées, sans retentissement sur la fraction d'éjection.", high: "Insuffisance cardiaque ou troubles du rythme sévères nécessitant un traitement à vie." } },
          { name: "Troubles du rythme cardiaque post-traumatiques documentés (non appareillés)", searchTerms: ["troubles rythme cardiaque post traumatiques documentés non appareillés", "appareillés non documentés traumatiques post cardiaque rythme troubles", "troubles rythme", "rythme cardiaque", "cardiaque post"], rate: [5, 20], description: "Apparition de troubles du rythme (extrasystoles, tachycardie, fibrillation auriculaire) après une contusion myocardique ou un traumatisme thoracique, confirmés par Holter-ECG.", rateCriteria: { low: "Troubles du rythme peu fréquents, asymptomatiques ou paucisymptomatiques.", high: "Troubles du rythme fréquents, symptomatiques (palpitations, malaises) nécessitant un traitement anti-arythmique au long cours." } },
          { name: "Ruptures traumatiques de valvules", searchTerms: ["ruptures traumatiques valvules", "valvules traumatiques ruptures", "ruptures traumatiques", "traumatiques valvules"], rate: [50, 100] },
          { name: "Affections cardiovasculaires consécutives à une maladie infectieuse", searchTerms: ["affections cardiovasculaires consécutives une maladie infectieuse", "infectieuse maladie une consécutives cardiovasculaires affections", "affections cardiovasculaires", "cardiovasculaires consécutives", "consécutives une"], rate: [30, 90] },
          { name: "Anévrisme de l'aorte (hors syphilis)", searchTerms: ["anévrisme l'aorte hors syphilis", "syphilis hors l'aorte anévrisme", "anévrisme l'aorte", "l'aorte hors", "hors syphilis"], rate: [40, 80] },
          { name: "Péricardite chronique constrictive post-traumatique", searchTerms: ["péricardite chronique constrictive post traumatique", "traumatique post constrictive chronique péricardite", "péricardite chronique", "chronique constrictive", "constrictive post"], rate: [20, 60], rateCriteria: { low: "Péricardite bien tolérée, sans signe d'insuffisance cardiaque droite, simple surveillance.", high: "Péricardite invalidante avec signes de tamponnade chronique (turgescence jugulaire, hépatomégalie, œdèmes), nécessitant une chirurgie (péricardectomie)." } },
          { name: "Syndrome post-péricardotomie (ou de Dressler) persistant", searchTerms: ["syndrome post péricardotomie dressler persistant", "persistant dressler péricardotomie post syndrome", "syndrome post", "post péricardotomie", "péricardotomie dressler"], rate: [5, 15], description: "Syndrome inflammatoire (fièvre, douleur thoracique, épanchement péricardique) récidivant après une chirurgie cardiaque ou un traumatisme thoracique.", rateCriteria: { low: "Épisodes rares et brefs, bien contrôlés par AINS ou colchicine.", high: "Épisodes fréquents et invalidants nécessitant une corticothérapie au long cours." } },
          { name: "Névrose cardiaque post-traumatique (tachycardie, palpitations, anxiété)", searchTerms: ["névrose cardiaque post traumatique tachycardie, palpitations, anxiété", "anxiété palpitations, tachycardie, traumatique post cardiaque névrose", "névrose cardiaque", "cardiaque post", "post traumatique"], rate: [5, 15] },
          { name: "Lésions des gros vaisseaux (hors aorte) avec troubles hémodynamiques", searchTerms: ["lésions des gros vaisseaux hors aorte avec troubles hémodynamiques", "hémodynamiques troubles avec aorte hors vaisseaux gros des lésions", "lésions gros vaisseaux hors aorte troubles hémodynamiques", "lésions des", "des gros"], rate: [10, 40] },
          { name: "Dissection traumatique d'un gros vaisseau (aorte, carotide) avec séquelles", searchTerms: ["dissection traumatique d'un gros vaisseau aorte, carotide avec séquelles", "séquelles avec carotide aorte, vaisseau gros d'un traumatique dissection", "dissection traumatique d'un gros vaisseau aorte, carotide séquelles", "dissection traumatique", "traumatique d'un"], rate: [40, 80], rateCriteria: { low: "Séquelles vasculaires localisées bien contrôlées par traitement.", high: "Séquelles neurologiques (AVC) ou ischémiques d'un membre." } },
        ]
      },
      {
        name: "Vaisseaux Périphériques",
        injuries: [
            { name: "Syndrome post-thrombotique (maladie post-phlébitique)", searchTerms: ["syndrome post thrombotique maladie post phlébitique", "phlébitique post maladie thrombotique post syndrome", "syndrome post", "post thrombotique", "thrombotique maladie"], rate: [10, 40], description: "Séquelles d'une thrombose veineuse profonde (phlébite).", rateCriteria: { low: "Œdème vespéral modéré, sans troubles trophiques.", medium: "Œdème permanent, douleurs, pigmentation cutanée (dermite ocre).", high: "Ulcère veineux chronique ou récidivant, claudication veineuse invalidante." } },
            { name: "Artériopathie post-traumatique d'un membre", searchTerms: ["artériopathie post traumatique d'un membre", "membre d'un traumatique post artériopathie", "artériopathie post", "post traumatique", "traumatique d'un"], rate: [15, 50], description: "Défaut de vascularisation artérielle après un traumatisme.", rateCriteria: { low: "Claudication d'effort intermittente à périmètre de marche long (>200m).", medium: "Claudication à périmètre court (<200m), douleurs de décubitus.", high: "Ischémie permanente avec troubles trophiques (ulcère artériel, nécrose)." } },
            { name: "Fistule artério-veineuse post-traumatique", searchTerms: ["fistule artério veineuse post traumatique", "traumatique post veineuse artério fistule", "fistule artério", "artério veineuse", "veineuse post"], rate: [15, 40], rateCriteria: { low: "Fistule de petit débit, sans retentissement hémodynamique général.", high: "Fistule à haut débit avec signes d'insuffisance cardiaque ou d'ischémie d'aval." } },
            {
              name: "Anévrisme ou pseudo-anévrisme artériel périphérique post-traumatique",
              searchTerms: ["anévrisme pseudo anévrisme artériel périphérique post traumatique", "traumatique post périphérique artériel anévrisme pseudo anévrisme", "anévrisme pseudo", "pseudo anévrisme", "anévrisme artériel"], rate: [10, 30],
              description: "Dilatation localisée d'une artère d'un membre suite à un traumatisme.",
              rateCriteria: {
                  low: "Anévrisme de petite taille, asymptomatique, nécessitant une simple surveillance.",
                  medium: "Anévrisme symptomatique (douleurs, compression nerveuse) ayant nécessité un traitement endovasculaire ou chirurgical, sans séquelle ischémique.",
                  high: "Complications de l'anévrisme (thrombose, embolie distale, rupture) avec séquelles ischémiques permanentes."
              }
            },
            { name: "Syndrome de Raynaud post-traumatique ou lié aux vibrations", searchTerms: ["syndrome raynaud post traumatique lié aux vibrations", "vibrations aux lié traumatique post raynaud syndrome", "syndrome raynaud", "raynaud post", "post traumatique"], rate: [5, 20], description: "Trouble vasomoteur des doigts déclenché par le froid ou les vibrations.", rateCriteria: { low: "Crises rares et brèves, touchant 1 ou 2 doigts, sans troubles trophiques.", high: "Crises fréquentes, prolongées, invalidantes, avec troubles trophiques (ulcérations pulpaires)." } },
            { name: "Lymphœdème chronique post-traumatique d'un membre", searchTerms: ["lymphœdème chronique post traumatique d'un membre", "membre d'un traumatique post chronique lymphœdème", "lymphœdème chronique", "chronique post", "post traumatique"], rate: [10, 30], description: "Gonflement chronique d'un membre par atteinte du système lymphatique après un traumatisme grave ou une chirurgie.", rateCriteria: { low: "Augmentation de volume modérée, réductible au repos, sans retentissement cutané majeur.", high: "Éléphantiasis avec augmentation de volume majeure, troubles trophiques sévères (sclérose cutanée, infections à répétition)." } }
        ]
      },
      {
        name: "Diaphragme",
        injuries: [
            { name: "Séquelles de rupture ou hernie diaphragmatique traumatique opérée", searchTerms: ["séquelles rupture hernie diaphragmatique traumatique opérée", "opérée traumatique diaphragmatique hernie rupture séquelles", "séquelles rupture", "rupture hernie", "hernie diaphragmatique"], rate: [10, 30], rateCriteria: { low: "Pas de séquelle fonctionnelle, simple cicatrice.", high: "Gêne respiratoire à l'effort, douleurs, troubles digestifs post-opératoires." } }
        ]
      },
      {
        name: "Médiastin et Œsophage",
        injuries: [
            {
                name: "Dysphagie post-traumatique par sténose de l'œsophage cervical",
                searchTerms: ["dysphagie post traumatique par sténose l'œsophage cervical", "cervical l'œsophage sténose par traumatique post dysphagie", "dysphagie post", "post traumatique", "traumatique par"], rate: [15, 50],
                description: "Difficultés à avaler dues à un rétrécissement de l'œsophage au niveau du cou, suite à un traumatisme ou une brûlure caustique.",
                rateCriteria: {
                    low: "Gêne à la déglutition des solides, nécessitant une adaptation alimentaire simple.",
                    high: "Sténose serrée nécessitant des dilatations répétées ou une chirurgie, avec dysphagie aux liquides et risque de fausses routes."
                }
            },
            {
                name: "Médiastinite chronique post-traumatique (fibrosante)",
                searchTerms: ["médiastinite chronique post traumatique fibrosante", "fibrosante traumatique post chronique médiastinite", "médiastinite chronique", "chronique post", "post traumatique"], rate: [40, 70],
                description: "Inflammation et fibrose chronique du médiastin après un traumatisme thoracique grave.",
                rateCriteria: {
                    low: "Fibrose modérée avec douleurs thoraciques, sans compression vasculo-nerveuse majeure.",
                    high: "Syndrome de compression de la veine cave supérieure, dysphagie ou dyspnée sévère par compression."
                }
            },
            {
                name: "Fistule œso-trachéale post-traumatique",
                searchTerms: ["fistule œso trachéale post traumatique", "traumatique post trachéale œso fistule", "fistule œso", "œso trachéale", "trachéale post"], rate: [50, 80],
                description: "Communication anormale persistante entre l'œsophage et la trachée.",
                rateCriteria: {
                    low: "Fistule de petit calibre, traitée avec succès par endoscopie, séquelles de toux à la déglutition.",
                    high: "Fistule large nécessitant une chirurgie majeure, avec pneumopathies d'inhalation à répétition."
                }
            }
        ]
      },
      {
        name: "Abdomen - Paroi et Hernies",
        injuries: [
          { name: "Cicatrices opératoires normales", searchTerms: ["cicatrices opératoires normales", "normales opératoires cicatrices", "cicatrices opératoires", "opératoires normales"], rate: 0 },
          { name: "Cicatrices (sans éventration) très larges et adhérentes", searchTerms: ["cicatrices sans éventration très larges adhérentes", "adhérentes larges très éventration sans cicatrices", "cicatrices éventration très larges adhérentes", "cicatrices sans", "sans éventration"], rate: [10, 30] },
          { name: "Cicatrices avec éventration post-opératoire", searchTerms: ["cicatrices avec éventration post opératoire", "opératoire post éventration avec cicatrices", "cicatrices éventration post opératoire", "cicatrices avec", "avec éventration"], rate: [5, 30] },
          { name: "Cicatrice avec éventration après laparotomie (appareillage ou non)", searchTerms: ["cicatrice avec éventration après laparotomie appareillage non", "non appareillage laparotomie après éventration avec cicatrice", "cicatrice éventration après laparotomie appareillage non", "cicatrice avec", "avec éventration"], rate: [15, 50] },
          { name: "Éventration sur orifice de trocart (post-cœlioscopie)", searchTerms: ["éventration sur orifice trocart post cœlioscopie", "cœlioscopie post trocart orifice sur éventration", "éventration orifice trocart post cœlioscopie", "éventration sur", "sur orifice"], rate: [5, 15], rateCriteria: { low: "Petite éventration réductible, peu symptomatique.", high: "Éventration volumineuse, douloureuse, nécessitant une ré-intervention." } },
          { name: "Rupture isolée du grand droit de l'abdomen", searchTerms: ["rupture isolée grand droit l'abdomen", "l'abdomen droit grand isolée rupture", "rupture isolée", "isolée grand", "grand droit"], rate: [8, 20] },
          {
            name: "Diastasis des grands droits post-traumatique",
            searchTerms: ["diastasis des grands droits post traumatique", "traumatique post droits grands des diastasis", "diastasis grands droits post traumatique", "diastasis des", "des grands"], rate: [5, 15],
            description: "Séparation des muscles grands droits de l'abdomen après un traumatisme, créant une faiblesse de la paroi.",
            rateCriteria: {
                low: "Diastasis modéré, sans hernie, gêne esthétique isolée.",
                high: "Diastasis large avec bombement à l'effort, douleurs, et faiblesse de la sangle abdominale, nécessitant potentiellement une contention ou une chirurgie."
            }
          },
          { name: "Hernie ou éventration consécutive à des ruptures musculaires", searchTerms: ["hernie éventration consécutive des ruptures musculaires", "musculaires ruptures des consécutive éventration hernie", "hernie éventration consécutive ruptures musculaires", "hernie éventration", "éventration consécutive"], rate: [10, 40] },
          { name: "Éventration hypogastrique", searchTerms: ["éventration hypogastrique"], rate: [10, 20] },
          { name: "Névralgie pariétale post-traumatique ou post-chirurgicale (nerf ilio-inguinal, ilio-hypogastrique)", searchTerms: ["névralgie pariétale post traumatique post chirurgicale nerf ilio inguinal, ilio hypogastrique", "hypogastrique ilio inguinal, ilio nerf chirurgicale post traumatique post pariétale névralgie", "névralgie pariétale", "pariétale post", "post traumatique"], rate: [5, 15], description: "Douleurs chroniques dans la région inguinale ou abdominale basse dues à l'atteinte d'un nerf dans une cicatrice.", rateCriteria: { low: "Douleurs à type de brûlure intermittentes, déclenchées par l'effort ou certains mouvements.", high: "Douleurs neuropathiques chroniques et invalidantes, avec hyperesthésie cutanée, rebelles au traitement médical." } },
          { name: "Hernie inguinale opérée (en relation avec accident)", searchTerms: ["hernie inguinale opérée relation avec accident", "accident avec relation opérée inguinale hernie", "hernie inguinale opérée relation accident", "hernie inguinale", "inguinale opérée"], rate: 0 },
          { name: "Hernie inguinale réductible bien maintenue", searchTerms: ["hernie inguinale réductible bien maintenue", "maintenue bien réductible inguinale hernie", "hernie inguinale", "inguinale réductible", "réductible bien"], rate: [5, 8] },
          { name: "Hernies bilatérales", searchTerms: ["hernies bilatérales"], rate: [5, 12] },
          { name: "Hernie inguinale irréductible", searchTerms: ["hernie inguinale irréductible", "irréductible inguinale hernie", "hernie inguinale", "inguinale irréductible"], rate: [15, 25] },
          { name: "Hernie crurale, ombilicale, ligne blanche épigastrique", searchTerms: ["hernie crurale, ombilicale, ligne blanche épigastrique", "épigastrique blanche ligne ombilicale, crurale, hernie", "hernie crurale,", "crurale, ombilicale,", "ombilicale, ligne"], rate: [5, 12] },
        ]
      },
      {
        name: "Abdomen - Tube Digestif et Organes",
        injuries: [
          { name: "Séquelles d'ulcère chronique (cicatrices, amaigrissement, douleurs)", searchTerms: ["séquelles d'ulcère chronique cicatrices, amaigrissement, douleurs", "douleurs amaigrissement, cicatrices, chronique d'ulcère séquelles", "séquelles d'ulcère", "d'ulcère chronique", "chronique cicatrices,"], rate: [10, 90] },
          { name: "Syndrome du grêle court post-traumatique", searchTerms: ["syndrome grêle court post traumatique", "traumatique post court grêle syndrome", "syndrome grêle", "grêle court", "court post"], rate: [60, 100], description: "Malabsorption sévère après résection étendue de l'intestin grêle.", rateCriteria: { low: "Diarrhée contrôlée par le régime et un traitement simple.", high: "Dépendance à une nutrition parentérale pour maintenir un état nutritionnel correct." } },
          { name: "Syndrome de l'intestin irritable post-traumatique (SII-PT)", searchTerms: ["syndrome l'intestin irritable post traumatique sii", "sii traumatique post irritable l'intestin syndrome", "syndrome l'intestin", "l'intestin irritable", "irritable post"], rate: [10, 25], description: "Apparition d'un trouble fonctionnel intestinal chronique (douleurs abdominales, ballonnements, troubles du transit) après un traumatisme physique ou psychologique majeur. Diagnostic d'élimination.", rateCriteria: { low: "Symptômes intermittents, contrôlés par le régime et un traitement symptomatique simple, avec un impact limité sur la qualité de vie.", high: "Symptômes quasi-permanents et invalidants, avec un retentissement majeur sur la vie sociale et professionnelle, rebelles aux traitements usuels." } },
          {
            name: "Dumping syndrome (post-chirurgie gastrique traumatique)",
            searchTerms: ["dumping syndrome post chirurgie gastrique traumatique", "dumping syndrome post chirurgie estomac traumatique", "traumatique gastrique chirurgie post syndrome dumping", "dumping syndrome", "syndrome post"], rate: [15, 40],
            description: "Ensemble de symptômes (malaises, sueurs, diarrhées) survenant après les repas, suite à une chirurgie de l'estomac ou de l'œsophage.",
            rateCriteria: {
                low: "Syndrome précoce modéré, bien contrôlé par des mesures diététiques simples.",
                medium: "Syndrome précoce et/ou tardif (hypoglycémies) fréquent, nécessitant un fractionnement des repas et un traitement médicamenteux, avec retentissement sur les activités.",
                high: "Syndrome sévère et invalidant, rebelle au traitement, avec perte de poids et retentissement socio-professionnel majeur."
            }
          },
          { name: "Sténose biliaire post-traumatique", searchTerms: ["sténose biliaire post traumatique", "traumatique post biliaire sténose", "sténose biliaire", "biliaire post", "post traumatique"], rate: [20, 50], rateCriteria: { low: "Sténose modérée sans ictère, bien contrôlée par traitement endoscopique (dilatation, prothèse).", high: "Sténose complexe nécessitant des réinterventions ou une chirurgie de dérivation, avec épisodes d'angiocholite à répétition." } },
          { name: "Fistules intestinales - Étroites", searchTerms: ["fistules intestinales étroites", "étroites intestinales fistules", "fistules intestinales", "intestinales étroites"], rate: [20, 30] },
          { name: "Fistules intestinales - Larges, bas situées", searchTerms: ["fistules intestinales larges, bas situées", "situées bas larges, intestinales fistules", "fistules intestinales", "intestinales larges,", "larges, bas"], rate: [40, 70] },
          { name: "Fistules intestinales - Larges, haut situées", searchTerms: ["fistules intestinales larges, haut situées", "situées haut larges, intestinales fistules", "fistules intestinales", "intestinales larges,", "larges, haut"], rate: [70, 90] },
          { name: "Fistules stercorales - Ne livrant que du gaz", searchTerms: ["fistules stercorales livrant que gaz", "gaz que livrant stercorales fistules", "fistules stercorales", "stercorales livrant", "livrant que"], rate: [20, 30] },
          { name: "Fistules stercorales - Livrant une certaine quantité de matières", searchTerms: ["fistules stercorales livrant une certaine quantité matières", "matières quantité certaine une livrant stercorales fistules", "fistules stercorales", "stercorales livrant", "livrant une"], rate: [30, 40] },
          { name: "Anus contre nature livrant passage à la presque totalité du contenu intestinal", searchTerms: ["anus contre nature livrant passage presque totalité contenu intestinal", "intestinal contenu totalité presque passage livrant nature contre anus", "anus contre", "contre nature", "nature livrant"], rate: [80, 90] },
          { name: "Prolapsus du rectum", searchTerms: ["prolapsus rectum"], rate: [80, 90] },
          { name: "Fistules anales", searchTerms: ["fistules anales"], rate: [10, 40] },
          { name: "Appendicite (si imputable et opérée)", searchTerms: ["appendicite imputable opérée", "opérée imputable appendicite", "appendicite imputable", "imputable opérée"], rate: [0, 30] },
          { name: "Incontinence ou rétention fécale par lésions du sphincter anal", searchTerms: ["incontinence rétention fécale par lésions sphincter anal", "anal sphincter lésions par fécale rétention incontinence", "incontinence rétention", "rétention fécale", "fécale par"], rate: [30, 70] },
          { name: "Séquelles de contusion hépatique (douleurs, troubles digestifs)", searchTerms: ["séquelles contusion hépatique douleurs, troubles digestifs", "digestifs troubles douleurs, hépatique contusion séquelles", "séquelles contusion", "contusion hépatique", "hépatique douleurs,"], rate: [5, 20] },
          { name: "Fistules biliaires ou purulentes (Contusion du foie)", searchTerms: ["fistules biliaires purulentes contusion foie", "foie contusion purulentes biliaires fistules", "fistules biliaires", "biliaires purulentes", "purulentes contusion"], rate: [20, 60] },
          { name: "Splénectomie (Ablation de la rate)", searchTerms: ["splénectomie ablation rate", "rate amputation rate", "rate ablation splénectomie", "splénectomie ablation", "ablation rate"], rate: [15, 30] },
          { name: "Splénose péritonéale (après rupture de la rate)", searchTerms: ["splénose péritonéale après rupture rate", "rate rupture après péritonéale splénose", "splénose péritonéale", "péritonéale après", "après rupture"], rate: [0, 10], description: "Généralement asymptomatique. Le taux indemnise le risque potentiel de complication (douleurs, occlusion) ou la gêne si les nodules sont volumineux.", rateCriteria: { low: "Découverte fortuite, asymptomatique.", high: "Nodules symptomatiques (douleurs abdominales chroniques) confirmés par imagerie." } },
          
          // 🆕 V3.3.136 - Viscères spécifiques (ablations/résections)
          { name: "Gastrectomie totale (ablation complète estomac)", description: "Ablation totale de l'estomac avec reconstitution du circuit digestif.", rate: [50, 70] },
          { name: "Gastrectomie partielle (ablation partielle estomac)", description: "Résection partielle de l'estomac (hémi-gastrectomie, gastrectomie 2/3).", rate: [30, 50] },
          { name: "Colectomie totale (ablation complète côlon)", description: "Ablation totale du côlon avec iléostomie ou anastomose iléo-rectale.", rate: [60, 80] },
          { name: "Hémicolectomie droite (ablation côlon droit)", description: "Résection du côlon droit (caecum + côlon ascendant + angle colique droit).", rate: [20, 35] },
          { name: "Hémicolectomie gauche (ablation côlon gauche)", description: "Résection du côlon gauche (angle colique gauche + côlon descendant + sigmoïde).", rate: [20, 35] },
          { name: "Résection intestinale grêle courte (<50 cm)", description: "Résection de moins de 50 cm d'intestin grêle, sans syndrome de grêle court.", rate: [10, 20] },
          { name: "Résection intestinale grêle étendue (>100 cm)", description: "Résection étendue d'intestin grêle avec syndrome de grêle court (malabsorption).", rate: [40, 70] },
          { name: "Lobectomie pulmonaire (ablation lobe poumon)", description: "Ablation d'un lobe pulmonaire (lobectomie supérieure, moyenne ou inférieure).", rate: [25, 40] },
          { name: "Pneumonectomie (ablation poumon entier)", description: "Ablation complète d'un poumon (pneumonectomie totale).", rate: [50, 70] },
          { name: "Cholécystectomie (ablation vésicule biliaire)", description: "Ablation de la vésicule biliaire, généralement bien tolérée.", rate: [5, 15] },
          { name: "Splénectomie unilatérale (ablation rate)", description: "Ablation de la rate avec conservation du rein, foie et autres organes.", rate: [15, 30] },
          { name: "Néphrectomie unilatérale (ablation rein)", description: "Ablation d'un rein avec rein restant sain et fonctionnel.", rate: [25, 35] },
          
          { name: "Adhérences abdominales post-traumatiques/post-opératoires avec troubles du transit", searchTerms: ["adhérences abdominales post traumatiques/post opératoires avec troubles transit", "transit troubles avec opératoires traumatiques/post post abdominales adhérences", "adhérences abdominales post traumatiques/post opératoires troubles transit", "adhérences abdominales", "abdominales post"], rate: [10, 40], rateCriteria: { low: "Douleurs abdominales chroniques intermittentes, sans épisodes subocclusifs documentés.", high: "Syndrome occlusif ou subocclusif à répétition ayant nécessité une ou plusieurs hospitalisations/interventions." } },
          { name: "Séquelles de pancréatite aiguë post-traumatique", searchTerms: ["séquelles pancréatite aiguë post traumatique", "traumatique post aiguë pancréatite séquelles", "séquelles pancréatite", "pancréatite aiguë", "aiguë post"], rate: [15, 60], rateCriteria: { low: "Pancréatite chronique modérée avec douleurs récurrentes contrôlées par le traitement.", medium: "Insuffisance pancréatique exocrine (stéatorrhée) nécessitant un traitement substitutif enzymatique.", high: "Diabète secondaire (insuffisance endocrine) nécessitant un traitement par insuline." } },
          { name: "Séquelles de colectomie partielle post-traumatique (hors stomie)", searchTerms: ["séquelles colectomie partielle post traumatique hors stomie", "séquelles côlon partielle post traumatique hors stomie", "stomie hors traumatique post partielle colectomie séquelles", "séquelles colectomie", "colectomie partielle"], rate: [15, 30], description: "Troubles du transit (diarrhée, constipation) et douleurs abdominales après résection d'une partie du côlon.", rateCriteria: { low: "Troubles du transit modérés et bien contrôlés par le régime.", high: "Diarrhée motrice invalidante ou syndrome occlusif récidivant." } },
          { name: "Séquelles d'hépatectomie partielle post-traumatique", searchTerms: ["séquelles d'hépatectomie partielle post traumatique", "traumatique post partielle d'hépatectomie séquelles", "séquelles d'hépatectomie", "d'hépatectomie partielle", "partielle post"], rate: [10, 40], description: "Séquelles après résection d'une partie du foie.", rateCriteria: { low: "Hépatectomie mineure, sans insuffisance hépatique, simple fatigue.", high: "Hépatectomie majeure avec signes d'insuffisance hépato-cellulaire et/ou hypertension portale." } }
        ]
      },
      {
        name: "Appareil Génito-Urinaire",
        injuries: [
          { name: "Néphrectomie (ablation d'un rein), avec rein restant sain", searchTerms: ["néphrectomie ablation d'un rein avec rein restant sain", "rein amputation d'un rein avec rein restant sain", "sain restant rein avec rein d'un ablation néphrectomie", "néphrectomie ablation d'un rein rein restant sain", "néphrectomie ablation"], rate: 30 },
          { name: "Néphrectomie avec azotémie irréductible de 0,60 à 1 gramme", searchTerms: ["néphrectomie avec azotémie irréductible 0,60 gramme", "rein avec azotémie irréductible 0,60 gramme", "gramme 0,60 irréductible azotémie avec néphrectomie", "néphrectomie azotémie irréductible 0,60 gramme", "néphrectomie avec"], rate: [30, 60] },
          { name: "Néphrectomie avec azotémie irréductible supérieure à 1 gramme", searchTerms: ["néphrectomie avec azotémie irréductible supérieure gramme", "rein avec azotémie irréductible supérieure gramme", "gramme supérieure irréductible azotémie avec néphrectomie", "néphrectomie azotémie irréductible supérieure gramme", "néphrectomie avec"], rate: [60, 100] },
          { name: "Éventration lombo-abdominale après néphrectomie", searchTerms: ["éventration lombo abdominale après néphrectomie", "éventration lombo abdominale après rein", "néphrectomie après abdominale lombo éventration", "éventration lombo", "lombo abdominale"], rate: [10, 30] },
          { name: "Contusions et ruptures du rein (séquelles)", searchTerms: ["contusions ruptures rein séquelles", "séquelles rein ruptures contusions", "contusions ruptures", "ruptures rein", "rein séquelles"], rate: [10, 100] },
          { name: "Hydronéphrose traumatique", searchTerms: ["hydronéphrose traumatique"], rate: [30, 50] },
          { name: "Modification d'une hydronéphrose antérieure", searchTerms: ["modification d'une hydronéphrose antérieure", "antérieure hydronéphrose d'une modification", "modification d'une", "d'une hydronéphrose", "hydronéphrose antérieure"], rate: [15, 30] },
          { name: "Rupture d'uretère avec périnéphrose ou fistule", searchTerms: ["rupture d'uretère avec périnéphrose fistule", "fistule périnéphrose avec d'uretère rupture", "rupture d'uretère périnéphrose fistule", "rupture d'uretère", "d'uretère avec"], rate: [30, 50] },
          { name: "Sténose urétérale post-traumatique", searchTerms: ["sténose urétérale post traumatique", "traumatique post urétérale sténose", "sténose urétérale", "urétérale post", "post traumatique"], rate: [15, 40], description: "Rétrécissement de l'uretère, pouvant entraîner une dilatation du rein (hydronéphrose) et une altération de la fonction rénale.", rateCriteria: { low: "Sténose modérée sans retentissement sur la fonction rénale, nécessitant une surveillance ou une dilatation endoscopique ponctuelle.", high: "Sténose serrée avec hydronéphrose et altération de la fonction rénale, ayant nécessité une réimplantation urétérale ou une endoprothèse à demeure." } },
          { name: "Rein mobile toujours indépendant du traumatisme", searchTerms: ["rein mobile toujours indépendant traumatisme", "traumatisme indépendant toujours mobile rein", "rein mobile", "mobile toujours", "toujours indépendant"], rate: 0 },
          { name: "Pyélonéphrite post-traumatique ascendante (unilatérale)", searchTerms: ["pyélonéphrite post traumatique ascendante unilatérale", "unilatérale ascendante traumatique post pyélonéphrite", "pyélonéphrite post", "post traumatique", "traumatique ascendante"], rate: [30, 50] },
          { name: "Pyélonéphrite post-traumatique ascendante (bilatérale)", searchTerms: ["pyélonéphrite post traumatique ascendante bilatérale", "bilatérale ascendante traumatique post pyélonéphrite", "pyélonéphrite post", "post traumatique", "traumatique ascendante"], rate: [60, 80] },
          { name: "Phlegmon périnéphrétique après traumatisme", searchTerms: ["phlegmon périnéphrétique après traumatisme", "traumatisme après périnéphrétique phlegmon", "phlegmon périnéphrétique", "périnéphrétique après", "après traumatisme"], rate: [10, 20] },
          { name: "Tuberculose rénale (modification par traumatisme)", searchTerms: ["tuberculose rénale modification par traumatisme", "traumatisme par modification rénale tuberculose", "tuberculose rénale", "rénale modification", "modification par"], rate: [15, 30] },
          { name: "Atrophie ou destruction d'un testicule", searchTerms: ["atrophie destruction d'un testicule", "testicule d'un destruction atrophie", "atrophie destruction", "destruction d'un", "d'un testicule"], rate: [1, 10] },
          { name: "Atrophie ou destruction des deux testicules (selon l'âge)", searchTerms: ["atrophie destruction des deux testicules selon l'âge", "l'âge selon testicules deux des destruction atrophie", "atrophie destruction deux testicules selon l'âge", "atrophie destruction", "destruction des"], rate: [20, 50] },
          { name: "Emasculation totale", searchTerms: ["emasculation totale"], rate: [80, 90] },
          { name: "Hématocèle et hydrocèle post-traumatique", searchTerms: ["hématocèle hydrocèle post traumatique", "traumatique post hydrocèle hématocèle", "hématocèle hydrocèle", "hydrocèle post", "post traumatique"], rate: [5, 15] },
          { name: "Séquelles de contusion du testicule ou torsion", searchTerms: ["séquelles contusion testicule torsion", "torsion testicule contusion séquelles", "séquelles contusion", "contusion testicule", "testicule torsion"], rate: [5, 10] },
          { name: "Dysfonction érectile post-traumatique (origine non neurologique médullaire)", searchTerms: ["dysfonction érectile post traumatique origine non neurologique médullaire", "médullaire neurologique non origine traumatique post érectile dysfonction", "dysfonction érectile", "érectile post", "post traumatique"], rate: [10, 25], rateCriteria: { low: "Réponse partielle aux traitements de première intention (IPDE5), vie sexuelle possible mais altérée.", high: "Absence de réponse aux traitements de première et deuxième ligne (injections intra-caverneuses), vie sexuelle impossible." } },
          { name: "Tuberculose épididymo-testiculaire modifiée par traumatisme", searchTerms: ["tuberculose épididymo testiculaire modifiée par traumatisme", "traumatisme par modifiée testiculaire épididymo tuberculose", "tuberculose épididymo", "épididymo testiculaire", "testiculaire modifiée"], rate: [10, 30] },
          { name: "Éventration hypogastrique après cystostomie", searchTerms: ["éventration hypogastrique après cystostomie", "cystostomie après hypogastrique éventration", "éventration hypogastrique", "hypogastrique après", "après cystostomie"], rate: [10, 30] },
          { name: "Fistule hypogastrique persistante", searchTerms: ["fistule hypogastrique persistante", "persistante hypogastrique fistule", "fistule hypogastrique", "hypogastrique persistante"], rate: [50, 70] },
          { name: "Cystite chronique persistante", searchTerms: ["cystite chronique persistante", "persistante chronique cystite", "cystite chronique", "chronique persistante"], rate: [20, 40] },
          { name: "Avec infection rénale (unilatérale)", searchTerms: ["avec infection rénale unilatérale", "unilatérale rénale infection avec", "infection rénale unilatérale", "avec infection", "infection rénale"], rate: [40, 60] },
          { name: "Avec infection rénale (bilatérale)", searchTerms: ["avec infection rénale bilatérale", "bilatérale rénale infection avec", "infection rénale bilatérale", "avec infection", "infection rénale"], rate: [60, 80] },
          { name: "Rétention d'urine chronique et permanente (complète)", searchTerms: ["rétention d'urine chronique permanente complète", "complète permanente chronique d'urine rétention", "rétention d'urine", "d'urine chronique", "chronique permanente"], rate: [40, 60] },
          { name: "Rétention d'urine chronique et permanente (incomplète)", searchTerms: ["rétention d'urine chronique permanente incomplète", "incomplète permanente chronique d'urine rétention", "rétention d'urine", "d'urine chronique", "chronique permanente"], rate: [20, 40] },
          { name: "Vessie neurologique post-traumatique (origine non médullaire)", searchTerms: ["vessie neurologique post traumatique origine non médullaire", "médullaire non origine traumatique post neurologique vessie", "vessie neurologique", "neurologique post", "post traumatique"], rate: [30, 70], rateCriteria: { low: "Hyperactivité vésicale contrôlée par traitement oral, sans incontinence majeure.", medium: "Dysurie nécessitant des auto-sondages intermittents, avec un impact sur la vie sociale.", high: "Incontinence urinaire complète nécessitant une protection permanente ou une dérivation urinaire." } },
          { name: "Incontinence d'urine rebelle ou permanente", searchTerms: ["incontinence d'urine rebelle permanente", "permanente rebelle d'urine incontinence", "incontinence d'urine", "d'urine rebelle", "rebelle permanente"], rate: [20, 40] },
          { name: "Rétrécissement de l'urètre postérieur infranchissable", searchTerms: ["rétrécissement l'urètre postérieur infranchissable", "infranchissable postérieur l'urètre rétrécissement", "rétrécissement l'urètre", "l'urètre postérieur", "postérieur infranchissable"], rate: [60, 80] },
          { name: "Rétrécissement de l'urètre postérieur difficilement franchissable", searchTerms: ["rétrécissement l'urètre postérieur difficilement franchissable", "franchissable difficilement postérieur l'urètre rétrécissement", "rétrécissement l'urètre", "l'urètre postérieur", "postérieur difficilement"], rate: [30, 50] },
          { name: "Rétrécissement de l'urètre postérieur facilement franchissable", searchTerms: ["rétrécissement l'urètre postérieur facilement franchissable", "franchissable facilement postérieur l'urètre rétrécissement", "rétrécissement l'urètre", "l'urètre postérieur", "postérieur facilement"], rate: [15, 30] },
          { name: "Rétrécissement de l'urètre antérieur facilement dilatable", searchTerms: ["rétrécissement l'urètre antérieur facilement dilatable", "dilatable facilement antérieur l'urètre rétrécissement", "rétrécissement l'urètre facilement dilatable", "rétrécissement l'urètre", "l'urètre antérieur"], rate: [15, 30] },
          { name: "Rétrécissement de l'urètre antérieur difficilement dilatable", searchTerms: ["rétrécissement l'urètre antérieur difficilement dilatable", "dilatable difficilement antérieur l'urètre rétrécissement", "rétrécissement l'urètre difficilement dilatable", "rétrécissement l'urètre", "l'urètre antérieur"], rate: [30, 50] },
          { name: "Autoplastie cutanée ou autre de l'urètre", searchTerms: ["autoplastie cutanée autre l'urètre", "l'urètre autre cutanée autoplastie", "autoplastie cutanée", "cutanée autre", "autre l'urètre"], rate: [20, 50] },
          { name: "Fistule urinaire persistante avec rétrécissement", searchTerms: ["fistule urinaire persistante avec rétrécissement", "rétrécissement avec persistante urinaire fistule", "fistule urinaire persistante rétrécissement", "fistule urinaire", "urinaire persistante"], rate: [30, 40] },
          { name: "Destruction totale de l'urètre antérieur", searchTerms: ["destruction totale l'urètre antérieur", "antérieur l'urètre totale destruction", "destruction totale l'urètre", "destruction totale", "totale l'urètre"], rate: [50, 90] },
          { name: "Prolapsus utérin post-traumatique", searchTerms: ["prolapsus utérin post traumatique", "traumatique post utérin prolapsus", "prolapsus utérin", "utérin post", "post traumatique"], rate: [15, 30] },
          { name: "Stérilité féminine post-traumatique (selon l'âge et le désir de maternité)", searchTerms: ["stérilité féminine post traumatique selon l'âge désir maternité", "maternité désir l'âge selon traumatique post féminine stérilité", "stérilité féminine", "féminine post", "post traumatique"], rate: [10, 50] },
          { name: "Troubles menstruels post-traumatiques graves et persistants", searchTerms: ["troubles menstruels post traumatiques graves persistants", "persistants graves traumatiques post menstruels troubles", "troubles menstruels", "menstruels post", "post traumatiques"], rate: [5, 15] },
          { name: "Séquelles de traumatisme ovarien (douleurs chroniques, troubles hormonaux)", searchTerms: ["séquelles traumatisme ovarien douleurs chroniques, troubles hormonaux", "hormonaux troubles chroniques, douleurs ovarien traumatisme séquelles", "séquelles traumatisme", "traumatisme ovarien", "ovarien douleurs"], rate: [10, 25] },
          { name: "Fistule vésico-vaginale post-traumatique", searchTerms: ["fistule vésico vaginale post traumatique", "traumatique post vaginale vésico fistule", "fistule vésico", "vésico vaginale", "vaginale post"], rate: [30, 50], description: "Communication anormale entre la vessie et le vagin, souvent après une fracture grave du bassin.", rateCriteria: { low: "Fistule de petite taille, à débit faible, ayant pu être traitée avec succès par une intervention simple.", high: "Fistule large et complexe, avec incontinence urinaire totale, nécessitant une ou plusieurs chirurgies de reconstruction majeures, avec retentissement social et psychologique majeur." } },
        ]
      }
    ]
  },
  {
    name: "Membres Supérieurs",
    subcategories: [
      {
        name: "Ceinture Scapulaire - Lésions Cutanées",
        injuries: [
          { name: "Cicatrices de l'aisselle - Bras collé au corps (droite)", searchTerms: ["cicatrices l'aisselle bras collé corps droite", "cicatrices l'aisselle supérieur collé corps droite", "droite corps collé bras l'aisselle cicatrices", "cicatrices l'aisselle", "l'aisselle bras"], rate: [30, 40] },
          { name: "Cicatrices de l'aisselle - Bras collé au corps (gauche)", searchTerms: ["cicatrices l'aisselle bras collé corps gauche", "cicatrices l'aisselle supérieur collé corps gauche", "gauche corps collé bras l'aisselle cicatrices", "cicatrices l'aisselle", "l'aisselle bras"], rate: [25, 30] },
          { name: "Cicatrices de l'aisselle - Abduction limitée de 10° à 45° (droite)", searchTerms: ["cicatrices l'aisselle abduction limitée 10° 45° droite", "droite 45° 10° limitée abduction l'aisselle cicatrices", "cicatrices l'aisselle", "l'aisselle abduction", "abduction limitée"], rate: [20, 30] },
          { name: "Cicatrices de l'aisselle - Abduction limitée de 10° à 45° (gauche)", searchTerms: ["cicatrices l'aisselle abduction limitée 10° 45° gauche", "gauche 45° 10° limitée abduction l'aisselle cicatrices", "cicatrices l'aisselle", "l'aisselle abduction", "abduction limitée"], rate: [15, 25] },
          { name: "Cicatrices de l'aisselle - Abduction limitée de 45° à 90° (droite)", searchTerms: ["cicatrices l'aisselle abduction limitée 45° 90° droite", "droite 90° 45° limitée abduction l'aisselle cicatrices", "cicatrices l'aisselle", "l'aisselle abduction", "abduction limitée"], rate: [15, 20] },
          { name: "Cicatrices de l'aisselle - Abduction limitée de 45° à 90° (gauche)", searchTerms: ["cicatrices l'aisselle abduction limitée 45° 90° gauche", "gauche 90° 45° limitée abduction l'aisselle cicatrices", "cicatrices l'aisselle", "l'aisselle abduction", "abduction limitée"], rate: [10, 15] },
          { name: "Cicatrices de l'aisselle - Abduction conservée jusqu'à 90° (droite)", searchTerms: ["cicatrices l'aisselle abduction conservée jusqu'à 90° droite", "droite 90° jusqu'à conservée abduction l'aisselle cicatrices", "cicatrices l'aisselle", "l'aisselle abduction", "abduction conservée"], rate: [10, 15] },
          { name: "Cicatrices de l'aisselle - Abduction conservée jusqu'à 90° (gauche)", searchTerms: ["cicatrices l'aisselle abduction conservée jusqu'à 90° gauche", "gauche 90° jusqu'à conservée abduction l'aisselle cicatrices", "cicatrices l'aisselle", "l'aisselle abduction", "abduction conservée"], rate: [5, 10] },
        ]
      },
      {
        name: "Ceinture Scapulaire - Fractures et Lésions Musculaires",
        injuries: [
          { name: "Fracture Clavicule - Bien consolidée sans raideur (Main Dominante)", searchTerms: ["fracture clavicule bien consolidée sans raideur main dominante", "dominante main raideur sans consolidée bien clavicule fracture", "fracture clavicule bien consolidée raideur main dominante", "fracture clavicule", "clavicule bien"], rate: [2, 3] },
          { name: "Fracture Clavicule - Bien consolidée sans raideur (Main Non Dominante)", searchTerms: ["fracture clavicule bien consolidée sans raideur main non dominante", "dominante non main raideur sans consolidée bien clavicule fracture", "fracture clavicule bien consolidée raideur main non dominante", "fracture clavicule", "clavicule bien"], rate: [1, 2] },
          { name: "Fracture Clavicule - Cal saillant avec raideur d'épaule (Main Dominante)", searchTerms: ["fracture clavicule cal saillant avec raideur d'épaule main dominante", "dominante main d'épaule raideur avec saillant cal clavicule fracture", "fracture clavicule cal saillant raideur d'épaule main dominante", "fracture clavicule", "clavicule cal"], rate: [5, 15], rateCriteria: { low: "Raideur légère, limitation des amplitudes extrêmes.", high: "Raideur marquée limitant l'abduction à 90°." } },
          { name: "Fracture Clavicule - Cal saillant avec raideur d'épaule (Main Non Dominante)", searchTerms: ["fracture clavicule cal saillant avec raideur d'épaule main non dominante", "dominante non main d'épaule raideur avec saillant cal clavicule fracture", "fracture clavicule cal saillant raideur d'épaule main non dominante", "fracture clavicule", "clavicule cal"], rate: [4, 12], rateCriteria: { low: "Raideur légère.", high: "Raideur marquée." } },
          { name: "Fracture Clavicule - Double, cals saillants, raideurs des épaules (Main Dominante)", searchTerms: ["fracture clavicule double, cals saillants, raideurs des épaules main dominante", "dominante main épaules des raideurs saillants, cals double, clavicule fracture", "fracture clavicule double, cals saillants, raideurs épaules main dominante", "fracture clavicule", "clavicule double,"], rate: [10, 30], rateCriteria: { low: "Raideur modérée.", high: "Raideur sévère." } },
          { name: "Fracture Clavicule - Double, cals saillants, raideurs des épaules (Main Non Dominante)", searchTerms: ["fracture clavicule double, cals saillants, raideurs des épaules main non dominante", "dominante non main épaules des raideurs saillants, cals double, clavicule fracture", "fracture clavicule double, cals saillants, raideurs épaules main non dominante", "fracture clavicule", "clavicule double,"], rate: [8, 25], rateCriteria: { low: "Raideur modérée.", high: "Raideur sévère." } },
          { name: "Fracture Clavicule - Cal difforme avec compressions nerveuses (Main Dominante)", searchTerms: ["fracture clavicule cal difforme avec compressions nerveuses main dominante", "dominante main nerveuses compressions avec difforme cal clavicule fracture", "fracture clavicule cal difforme compressions nerveuses main dominante", "fracture clavicule", "clavicule cal"], rate: [30, 40], rateCriteria: { low: "Signes neurologiques modérés.", high: "Signes neurologiques sévères." } },
          { name: "Fracture Clavicule - Cal difforme avec compressions nerveuses (Main Non Dominante)", searchTerms: ["fracture clavicule cal difforme avec compressions nerveuses main non dominante", "dominante non main nerveuses compressions avec difforme cal clavicule fracture", "fracture clavicule cal difforme compressions nerveuses main non dominante", "fracture clavicule", "clavicule cal"], rate: [25, 35], rateCriteria: { low: "Signes neurologiques modérés.", high: "Signes neurologiques sévères." } },
          { name: "Pseudarthrose Clavicule (Main Dominante)", searchTerms: ["pseudarthrose clavicule main dominante", "dominante main clavicule pseudarthrose", "pseudarthrose clavicule", "clavicule main", "main dominante"], rate: [5, 10], rateCriteria: { low: "Pseudarthrose serrée, peu symptomatique.", high: "Pseudarthrose lâche, symptomatique." } },
          { name: "Pseudarthrose Clavicule (Main Non Dominante)", searchTerms: ["pseudarthrose clavicule main non dominante", "dominante non main clavicule pseudarthrose", "pseudarthrose clavicule", "clavicule main", "main non"], rate: [3, 6], rateCriteria: { low: "Pseudarthrose serrée.", high: "Pseudarthrose lâche." } },
          { name: "Luxation Clavicule non réduite - Externe (acromio-claviculaire) (Main Dominante)", searchTerms: ["luxation clavicule non réduite externe acromio claviculaire main dominante", "dominante main claviculaire acromio externe réduite non clavicule luxation", "luxation clavicule", "clavicule non", "non réduite"], rate: [0, 5], rateCriteria: { low: "Stade I-II, peu de gêne.", high: "Stade III, tiroir antéro-postérieur, gêne et douleur." } },
          { name: "Luxation Clavicule non réduite - Externe (acromio-claviculaire) (Main Non Dominante)", searchTerms: ["luxation clavicule non réduite externe acromio claviculaire main non dominante", "dominante non main claviculaire acromio externe réduite non clavicule luxation", "luxation clavicule", "clavicule non", "non réduite"], rate: [0, 4], rateCriteria: { low: "Stade I-II.", high: "Stade III." } },
          { name: "Luxation Clavicule non réduite - Interne (sterno-claviculaire) (Main Dominante)", searchTerms: ["luxation clavicule non réduite interne sterno claviculaire main dominante", "dominante main claviculaire sterno interne réduite non clavicule luxation", "luxation clavicule", "clavicule non", "non réduite"], rate: [4, 8], rateCriteria: { low: "Subluxation, peu symptomatique.", high: "Luxation complète, douloureuse." } },
          { name: "Luxation Clavicule non réduite - Interne (sterno-claviculaire) (Main Non Dominante)", searchTerms: ["luxation clavicule non réduite interne sterno claviculaire main non dominante", "dominante non main claviculaire sterno interne réduite non clavicule luxation", "luxation clavicule", "clavicule non", "non réduite"], rate: [2, 5], rateCriteria: { low: "Subluxation.", high: "Luxation complète." } },
          { name: "Fracture Omoplate (selon variété et désordres articulaires)", searchTerms: ["fracture omoplate selon variété désordres articulaires", "articulaires désordres variété selon omoplate fracture", "fracture omoplate", "omoplate selon", "selon variété"], rate: [10, 50], rateCriteria: { low: "Fracture du corps sans retentissement articulaire.", medium: "Fracture de l'acromion ou de la coracoïde avec conflit.", high: "Fracture articulaire (glène) avec arthrose et raideur majeure." } },
          { name: "Rupture du deltoïde plus ou moins complète (Main Dominante)", searchTerms: ["rupture deltoïde plus moins complète main dominante", "dominante main complète moins plus deltoïde rupture", "rupture deltoïde", "deltoïde plus", "plus moins"], rate: [10, 25], rateCriteria: { low: "Rupture partielle, force diminuée.", high: "Rupture complète, abduction active impossible." } },
          { name: "Rupture du deltoïde plus ou moins complète (Main Non Dominante)", searchTerms: ["rupture deltoïde plus moins complète main non dominante", "dominante non main complète moins plus deltoïde rupture", "rupture deltoïde", "deltoïde plus", "plus moins"], rate: [8, 20], rateCriteria: { low: "Rupture partielle.", high: "Rupture complète." } },
        ]
      },
      {
        name: "Épaule - Amputation et Désarticulation",
        injuries: [
          { name: "Désarticulation de l'épaule ou amputation au col chirurgical (Main Dominante)", searchTerms: ["désarticulation l'épaule amputation col chirurgical main dominante", "dominante main chirurgical col amputation l'épaule désarticulation", "désarticulation l'épaule", "l'épaule amputation", "amputation col"], rate: 90, description: "Amputation complète du membre supérieur au niveau de l'épaule, côté dominant." },
          { name: "Désarticulation de l'épaule ou amputation au col chirurgical (Main Non Dominante)", searchTerms: ["désarticulation l'épaule amputation col chirurgical main non dominante", "dominante non main chirurgical col amputation l'épaule désarticulation", "désarticulation l'épaule", "l'épaule amputation", "amputation col"], rate: 80, description: "Amputation complète du membre supérieur au niveau de l'épaule, côté non dominant." },
          { name: "Amputation interscapulo-thoracique (Main Dominante)", searchTerms: ["amputation interscapulo thoracique main dominante", "dominante main thoracique interscapulo amputation", "amputation interscapulo", "interscapulo thoracique", "thoracique main"], rate: 95, description: "Amputation avec ablation de l'omoplate et de la clavicule, côté dominant. Séquelle majeure." },
          { name: "Amputation interscapulo-thoracique (Main Non Dominante)", searchTerms: ["amputation interscapulo thoracique main non dominante", "dominante non main thoracique interscapulo amputation", "amputation interscapulo", "interscapulo thoracique", "thoracique main"], rate: 85, description: "Amputation avec ablation de l'omoplate et de la clavicule, côté non dominant." },
          
          // 🆕 V3.3.136 - Amputations membre supérieur niveaux intermédiaires
          { name: "Amputation du bras (tiers supérieur - Main Dominante)", description: "Amputation du tiers supérieur du bras (proche épaule), main dominante.", rate: [85, 90] },
          { name: "Amputation du bras (tiers supérieur - Main Non Dominante)", description: "Amputation du tiers supérieur du bras (proche épaule), main non dominante.", rate: [75, 80] },
          { name: "Amputation du bras (tiers moyen - Main Dominante)", description: "Amputation du tiers moyen du bras, main dominante.", rate: [75, 80] },
          { name: "Amputation du bras (tiers moyen - Main Non Dominante)", description: "Amputation du tiers moyen du bras, main non dominante.", rate: [65, 70] },
          { name: "Amputation du bras (tiers inférieur - Main Dominante)", description: "Amputation du tiers inférieur du bras (proche coude), main dominante.", rate: [70, 75] },
          { name: "Amputation du bras (tiers inférieur - Main Non Dominante)", description: "Amputation du tiers inférieur du bras (proche coude), main non dominante.", rate: [60, 65] },
          { name: "Désarticulation du coude (Main Dominante)", description: "Désarticulation au niveau de l'articulation du coude, main dominante.", rate: [70, 75] },
          { name: "Désarticulation du coude (Main Non Dominante)", description: "Désarticulation au niveau de l'articulation du coude, main non dominante.", rate: [60, 65] },
          { name: "Amputation de l'avant-bras (tiers supérieur - Main Dominante)", description: "Amputation du tiers supérieur de l'avant-bras (sous coude), main dominante.", rate: [65, 70] },
          { name: "Amputation de l'avant-bras (tiers supérieur - Main Non Dominante)", description: "Amputation du tiers supérieur de l'avant-bras (sous coude), main non dominante.", rate: [55, 60] },
          { name: "Amputation de l'avant-bras (tiers moyen - Main Dominante)", description: "Amputation du tiers moyen de l'avant-bras, main dominante.", rate: [60, 65] },
          { name: "Amputation de l'avant-bras (tiers moyen - Main Non Dominante)", description: "Amputation du tiers moyen de l'avant-bras, main non dominante.", rate: [50, 55] },
          { name: "Amputation de l'avant-bras (tiers inférieur - Main Dominante)", description: "Amputation du tiers inférieur de l'avant-bras (proche poignet), main dominante.", rate: [55, 60] },
          { name: "Amputation de l'avant-bras (tiers inférieur - Main Non Dominante)", description: "Amputation du tiers inférieur de l'avant-bras (proche poignet), main non dominante.", rate: [45, 50] },
          { name: "Désarticulation du poignet (Main Dominante)", description: "Désarticulation au niveau de l'articulation du poignet, main dominante.", rate: [55, 60] },
          { name: "Désarticulation du poignet (Main Non Dominante)", description: "Désarticulation au niveau de l'articulation du poignet, main non dominante.", rate: [45, 50] },
        ]
       },
       {
        name: "Épaule - Fractures de l'Extrémité Supérieure de l'Humérus",
        injuries: [
          { name: "Fracture de la tête humérale avec blocage et impotence fonctionnelle quasi totale (Main Dominante)", searchTerms: ["fracture tête humérale avec blocage impotence fonctionnelle quasi totale main dominante", "dominante main totale quasi fonctionnelle impotence blocage avec humérale tête fracture", "fracture tête humérale blocage impotence fonctionnelle quasi totale main dominante", "fracture tête", "tête humérale"], rate: [30, 45] },
          { name: "Fracture de la tête humérale avec blocage et impotence fonctionnelle quasi totale (Main Non Dominante)", searchTerms: ["fracture tête humérale avec blocage impotence fonctionnelle quasi totale main non dominante", "dominante non main totale quasi fonctionnelle impotence blocage avec humérale tête fracture", "fracture tête humérale blocage impotence fonctionnelle quasi totale main non dominante", "fracture tête", "tête humérale"], rate: [25, 35] },
          { name: "Fracture de la tête humérale avec raideur importante de l'épaule (Main Dominante)", searchTerms: ["fracture tête humérale avec raideur importante l'épaule main dominante", "dominante main l'épaule importante raideur avec humérale tête fracture", "fracture tête humérale raideur importante l'épaule main dominante", "fracture tête", "tête humérale"], rate: [20, 30] },
          { name: "Fracture de la tête humérale avec raideur importante de l'épaule (Main Non Dominante)", searchTerms: ["fracture tête humérale avec raideur importante l'épaule main non dominante", "dominante non main l'épaule importante raideur avec humérale tête fracture", "fracture tête humérale raideur importante l'épaule main non dominante", "fracture tête", "tête humérale"], rate: [15, 25] },
          { name: "Fracture du col chirurgical avec cal vicieux important et abduction limitée (Main Dominante)", searchTerms: ["fracture col chirurgical avec cal vicieux important abduction limitée main dominante", "dominante main limitée abduction important vicieux cal avec chirurgical col fracture", "fracture col chirurgical cal vicieux important abduction limitée main dominante", "fracture col", "col chirurgical"], rate: [25, 35] },
          { name: "Fracture du col chirurgical avec cal vicieux important et abduction limitée (Main Non Dominante)", searchTerms: ["fracture col chirurgical avec cal vicieux important abduction limitée main non dominante", "dominante non main limitée abduction important vicieux cal avec chirurgical col fracture", "fracture col chirurgical cal vicieux important abduction limitée main non dominante", "fracture col", "col chirurgical"], rate: [20, 30] },
          { name: "Fracture du col chirurgical avec raccourcissement et gêne modérée (Main Dominante)", searchTerms: ["fracture col chirurgical avec raccourcissement gêne modérée main dominante", "dominante main modérée gêne raccourcissement avec chirurgical col fracture", "fracture col chirurgical raccourcissement gêne modérée main dominante", "fracture col", "col chirurgical"], rate: [8, 15] },
          { name: "Fracture du col chirurgical avec raccourcissement et gêne modérée (Main Non Dominante)", searchTerms: ["fracture col chirurgical avec raccourcissement gêne modérée main non dominante", "dominante non main modérée gêne raccourcissement avec chirurgical col fracture", "fracture col chirurgical raccourcissement gêne modérée main non dominante", "fracture col", "col chirurgical"], rate: [6, 12] },
          { name: "Fracture du trochiter avec limitation de l'abduction et rotation (Main Dominante)", searchTerms: ["fracture trochiter avec limitation l'abduction rotation main dominante", "fracture trochiter avec raideur l'abduction rotation main dominante", "dominante main rotation l'abduction limitation avec trochiter fracture", "fracture trochiter limitation l'abduction rotation main dominante", "fracture trochiter"], rate: [8, 15] },
          { name: "Fracture du trochiter avec limitation de l'abduction et rotation (Main Non Dominante)", searchTerms: ["fracture trochiter avec limitation l'abduction rotation main non dominante", "fracture trochiter avec raideur l'abduction rotation main non dominante", "dominante non main rotation l'abduction limitation avec trochiter fracture", "fracture trochiter limitation l'abduction rotation main non dominante", "fracture trochiter"], rate: [6, 12] },
          { name: "Fracture du trochin avec limitation de la rotation interne (Main Dominante)", searchTerms: ["fracture trochin avec limitation rotation interne main dominante", "fracture trochin avec raideur rotation interne main dominante", "dominante main interne rotation limitation avec trochin fracture", "fracture trochin limitation rotation interne main dominante", "fracture trochin"], rate: [5, 10] },
          { name: "Fracture du trochin avec limitation de la rotation interne (Main Non Dominante)", searchTerms: ["fracture trochin avec limitation rotation interne main non dominante", "fracture trochin avec raideur rotation interne main non dominante", "dominante non main interne rotation limitation avec trochin fracture", "fracture trochin limitation rotation interne main non dominante", "fracture trochin"], rate: [4, 8] },
        ]
       },
       {
        name: "Épaule - Raideurs et Ankyloses",
        injuries: [
          { name: "Raideur de l'épaule (propulsion, abduction, rotation) (Main Dominante)", searchTerms: ["raideur l'épaule propulsion, abduction, rotation main dominante", "dominante main rotation abduction, propulsion, l'épaule raideur", "raideur l'épaule", "l'épaule propulsion,", "propulsion, abduction,"], rate: [5, 30], rateCriteria: { low: "Limitation des amplitudes extrêmes, abduction possible > 90°.", medium: "Abduction limitée à 90°, rotation externe/interne limitée de 50%.", high: "Abduction < 60°, quasi-ankylose, main ne peut atteindre la tête." } },
          { name: "Raideur de l'épaule (propulsion, abduction, rotation) (Main Non Dominante)", searchTerms: ["raideur l'épaule propulsion, abduction, rotation main non dominante", "dominante non main rotation abduction, propulsion, l'épaule raideur", "raideur l'épaule", "l'épaule propulsion,", "propulsion, abduction,"], rate: [4, 25], rateCriteria: { low: "Limitation légère.", medium: "Limitation modérée.", high: "Quasi-ankylose." } },
          { name: "Raideur de l'épaule - Abduction 60-90°", searchTerms: ["raideur l'épaule abduction 90°", "90° abduction l'épaule raideur", "raideur l'épaule", "l'épaule abduction", "abduction 90°"], rate: [10, 18], description: "Limitation modérée de l'abduction entre 60 et 90 degrés, sans atteinte majeure de rotation." },
          { name: "Raideur de l'épaule - Abduction 60-90° + rotation", searchTerms: ["raideur l'épaule abduction 90° rotation", "rotation 90° abduction l'épaule raideur", "raideur l'épaule", "l'épaule abduction", "abduction 90°"], rate: [15, 25], description: "Limitation modérée de l'abduction (60-90°) associée à une limitation des rotations." },
          { name: "Raideur de l'épaule - Limitation rotation", searchTerms: ["raideur l'épaule limitation rotation", "raideur l'épaule raideur rotation", "rotation limitation l'épaule raideur", "raideur l'épaule", "l'épaule limitation"], rate: [8, 15], description: "Limitation principalement de la rotation externe et/ou interne, abduction relativement préservée." },
          { name: "Raideur de l'épaule - Élévation limitée", searchTerms: ["raideur l'épaule élévation limitée", "limitée élévation l'épaule raideur", "raideur l'épaule", "l'épaule élévation", "élévation limitée"], rate: [10, 20], description: "Limitation de l'élévation antérieure (antépulsion/propulsion), difficulté à lever le bras devant." },
          { name: "Raideur de l'épaule avec douleur", searchTerms: ["raideur l'épaule avec douleur", "douleur avec l'épaule raideur", "raideur l'épaule douleur", "raideur l'épaule", "l'épaule avec"], rate: [12, 22], description: "Raideur modérée associée à des douleurs mécaniques ou nocturnes persistantes." },
          { name: "Raideur de l'épaule avec limitation fonctionnelle", searchTerms: ["raideur l'épaule avec limitation fonctionnelle", "raideur l'épaule avec raideur fonctionnelle", "fonctionnelle limitation avec l'épaule raideur", "raideur l'épaule limitation fonctionnelle", "raideur l'épaule"], rate: [15, 25], description: "Raideur entraînant une gêne importante dans les gestes de la vie quotidienne." },
          { name: "Raideur + instabilité épaule", searchTerms: ["raideur instabilité épaule", "épaule instabilité raideur", "raideur instabilité", "instabilité épaule"], rate: [20, 35], description: "Association d'une raideur et d'une instabilité chronique (séquelle complexe)." },
          { name: "Raideur épaule abduction <90° + rotation", searchTerms: ["raideur épaule abduction <90° rotation", "rotation <90° abduction épaule raideur", "raideur épaule", "épaule abduction", "abduction <90°"], rate: [18, 28], description: "Limitation sévère : abduction inférieure à 90° avec atteinte rotations." },
          { name: "Ankylose d'épaule avec mobilité de l'omoplate (Main Dominante)", searchTerms: ["ankylose d'épaule avec mobilité l'omoplate main dominante", "dominante main l'omoplate mobilité avec d'épaule ankylose", "ankylose d'épaule mobilité l'omoplate main dominante", "ankylose d'épaule", "d'épaule avec"], rate: [35, 45], rateCriteria: { low: "Ankylose en position fonctionnelle (abduction 45-60°).", high: "Ankylose en adduction stricte ou abduction > 90°." } },
          { name: "Ankylose d'épaule avec mobilité de l'omoplate (Main Non Dominante)", searchTerms: ["ankylose d'épaule avec mobilité l'omoplate main non dominante", "dominante non main l'omoplate mobilité avec d'épaule ankylose", "ankylose d'épaule mobilité l'omoplate main non dominante", "ankylose d'épaule", "d'épaule avec"], rate: [25, 30], rateCriteria: { low: "Position fonctionnelle.", high: "Position non fonctionnelle." } },
          { name: "Ankylose d'épaule avec fixation de l'omoplate (Main Dominante)", searchTerms: ["ankylose d'épaule avec fixation l'omoplate main dominante", "dominante main l'omoplate fixation avec d'épaule ankylose", "ankylose d'épaule fixation l'omoplate main dominante", "ankylose d'épaule", "d'épaule avec"], rate: [45, 60], rateCriteria: { low: "Position fonctionnelle.", high: "Position non fonctionnelle." } },
          { name: "Ankylose d'épaule avec fixation de l'omoplate (Main Non Dominante)", searchTerms: ["ankylose d'épaule avec fixation l'omoplate main non dominante", "dominante non main l'omoplate fixation avec d'épaule ankylose", "ankylose d'épaule fixation l'omoplate main non dominante", "ankylose d'épaule", "d'épaule avec"], rate: [35, 50], rateCriteria: { low: "Position fonctionnelle.", high: "Position non fonctionnelle." } },
        ]
      },
      {
        name: "Épaule - Lésions Diverses",
        injuries: [
          { name: "Périarthrite chronique douloureuse - limitation modérée (Main Dominante)", searchTerms: ["périarthrite chronique douloureuse limitation modérée main dominante", "périarthrite chronique douloureuse raideur modérée main dominante", "dominante main modérée limitation douloureuse chronique périarthrite", "périarthrite chronique", "chronique douloureuse"], rate: [5, 25], rateCriteria: { low: "Douleurs occasionnelles à l'effort, mobilité quasi-normale.", medium: "Douleurs fréquentes avec limitation modérée des amplitudes.", high: "Douleurs invalidantes avec épaule gelée." } },
          { name: "Périarthrite chronique douloureuse - limitation modérée (Main Non Dominante)", searchTerms: ["périarthrite chronique douloureuse limitation modérée main non dominante", "périarthrite chronique douloureuse raideur modérée main non dominante", "dominante non main modérée limitation douloureuse chronique périarthrite", "périarthrite chronique", "chronique douloureuse"], rate: [4, 20], rateCriteria: { low: "Douleurs occasionnelles.", high: "Douleurs fréquentes et invalidantes." } },
          { name: "Périarthrite chronique douloureuse - abolition des mouvements et atrophie (Main Dominante)", searchTerms: ["périarthrite chronique douloureuse abolition des mouvements atrophie main dominante", "dominante main atrophie mouvements des abolition douloureuse chronique périarthrite", "périarthrite chronique douloureuse abolition mouvements atrophie main dominante", "périarthrite chronique", "chronique douloureuse"], rate: [30, 35], rateCriteria: { low: "Atrophie modérée.", high: "Atrophie sévère." } },
          { name: "Périarthrite chronique douloureuse - abolition des mouvements et atrophie (Main Non Dominante)", searchTerms: ["périarthrite chronique douloureuse abolition des mouvements atrophie main non dominante", "dominante non main atrophie mouvements des abolition douloureuse chronique périarthrite", "périarthrite chronique douloureuse abolition mouvements atrophie main non dominante", "périarthrite chronique", "chronique douloureuse"], rate: [20, 25], rateCriteria: { low: "Atrophie modérée.", high: "Atrophie sévère." } },
          { name: "Rupture de la coiffe des rotateurs post-traumatique (supra-épineux, etc.) (Main Dominante)", searchTerms: ["rupture coiffe des rotateurs post traumatique supra épineux, etc. main dominante", "dominante main etc. épineux, supra traumatique post rotateurs des coiffe rupture", "rupture coiffe rotateurs post traumatique supra épineux, etc. main dominante", "rupture coiffe", "coiffe des"], rate: [10, 30], rateCriteria: { low: "Rupture partielle, douleurs à l'effort, mobilité quasi-normale.", medium: "Rupture transfixiante d'un tendon, perte de force, abduction limitée mais possible.", high: "Rupture massive et irréparable, épaule pseudo-paralytique." } },
          { name: "Rupture de la coiffe des rotateurs post-traumatique (supra-épineux, etc.) (Main Non Dominante)", searchTerms: ["rupture coiffe des rotateurs post traumatique supra épineux, etc. main non dominante", "dominante non main etc. épineux, supra traumatique post rotateurs des coiffe rupture", "rupture coiffe rotateurs post traumatique supra épineux, etc. main non dominante", "rupture coiffe", "coiffe des"], rate: [8, 25], rateCriteria: { low: "Rupture partielle, douleurs à l'effort.", medium: "Rupture transfixiante, perte de force.", high: "Rupture massive, épaule pseudo-paralytique." } },
          { name: "Lésion SLAP (Superior Labrum from Anterior to Posterior) chronique (Main Dominante)", searchTerms: ["lésion slap superior labrum from anterior posterior chronique main dominante", "dominante main chronique posterior anterior from labrum superior slap lésion", "lésion slap", "slap superior", "superior labrum"], rate: [8, 20], description: "Lésion du bourrelet glénoïdien supérieur de l'épaule, entraînant des douleurs, des blocages et une instabilité fonctionnelle.", rateCriteria: { low: "Douleurs mécaniques aux mouvements extrêmes (armé du bras), sans instabilité objective.", high: "Douleurs, blocages et ressauts fréquents avec perte de force, invalidant pour les gestes au-dessus de la tête." } },
          { name: "Lésion SLAP (Superior Labrum from Anterior to Posterior) chronique (Main Non Dominante)", searchTerms: ["lésion slap superior labrum from anterior posterior chronique main non dominante", "dominante non main chronique posterior anterior from labrum superior slap lésion", "lésion slap", "slap superior", "superior labrum"], rate: [6, 15], description: "Lésion du bourrelet glénoïdien supérieur de l'épaule, entraînant des douleurs, des blocages et une instabilité fonctionnelle.", rateCriteria: { low: "Douleurs mécaniques aux mouvements extrêmes (armé du bras), sans instabilité objective.", high: "Douleurs, blocages et ressauts fréquents avec perte de force, invalidant pour les gestes au-dessus de la tête." } },
          { name: "Pseudarthrose (épaule ballante) (Main Dominante)", searchTerms: ["pseudarthrose épaule ballante main dominante", "dominante main ballante épaule pseudarthrose", "pseudarthrose épaule", "épaule ballante", "ballante main"], rate: [60, 70], rateCriteria: { low: "Instabilité modérée.", high: "Instabilité majeure, membre inutile." } },
          { name: "Pseudarthrose (épaule ballante) (Main Non Dominante)", searchTerms: ["pseudarthrose épaule ballante main non dominante", "dominante non main ballante épaule pseudarthrose", "pseudarthrose épaule", "épaule ballante", "ballante main"], rate: [45, 60], rateCriteria: { low: "Instabilité modérée.", high: "Instabilité majeure." } },
          { name: "Luxation récidivante de l'épaule (Main Dominante)", searchTerms: ["luxation récidivante l'épaule main dominante", "dominante main l'épaule récidivante luxation", "luxation récidivante", "récidivante l'épaule", "l'épaule main"], rate: [10, 30], rateCriteria: { low: "Luxations rares, peu d'appréhension.", medium: "Luxations fréquentes, appréhension limitant les activités.", high: "Instabilité majeure, luxations quasi-permanentes, arthrose." } },
          { name: "Luxation récidivante de l'épaule (Main Non Dominante)", searchTerms: ["luxation récidivante l'épaule main non dominante", "dominante non main l'épaule récidivante luxation", "luxation récidivante", "récidivante l'épaule", "l'épaule main"], rate: [8, 25], rateCriteria: { low: "Luxations rares.", medium: "Luxations fréquentes.", high: "Instabilité majeure." } },
          { name: "Capsulite rétractile post-traumatique (épaule gelée) (Main Dominante)", searchTerms: ["capsulite rétractile post traumatique épaule gelée main dominante", "dominante main gelée épaule traumatique post rétractile capsulite", "capsulite rétractile", "rétractile post", "post traumatique"], rate: [15, 30], description: "Enraidissement progressif et douloureux de l'épaule avec limitation de toutes les mobilités actives et passives.", rateCriteria: { low: "Phase résolutive avec récupération de plus de 50% des mobilités, douleurs résiduelles.", high: "Séquelles de raideur majeure et permanente malgré le traitement, avec retentissement fonctionnel sévère." } },
          { name: "Capsulite rétractile post-traumatique (épaule gelée) (Main Non Dominante)", searchTerms: ["capsulite rétractile post traumatique épaule gelée main non dominante", "dominante non main gelée épaule traumatique post rétractile capsulite", "capsulite rétractile", "rétractile post", "post traumatique"], rate: [12, 25], description: "Enraidissement progressif et douloureux de l'épaule.", rateCriteria: { low: "Récupération de plus de 50% des mobilités.", high: "Raideur majeure et permanente." } },
          { name: "Séquelles de prothèse totale d'épaule (Main Dominante)", searchTerms: ["séquelles prothèse totale d'épaule main dominante", "dominante main d'épaule totale prothèse séquelles", "séquelles prothèse", "prothèse totale", "totale d'épaule"], rate: [20, 40], rateCriteria: { low: "Prothèse bien intégrée, indolore, mobilité > 90°.", high: "Douleurs, instabilité, mobilité très limitée, nécessité d'aide." } },
          { name: "Séquelles de prothèse totale d'épaule (Main Non Dominante)", searchTerms: ["séquelles prothèse totale d'épaule main non dominante", "dominante non main d'épaule totale prothèse séquelles", "séquelles prothèse", "prothèse totale", "totale d'épaule"], rate: [15, 35], rateCriteria: { low: "Prothèse bien intégrée, indolore.", high: "Douleurs, instabilité, mobilité limitée." } },
        ]
      },
      {
        name: "Bras - Amputations",
        injuries: [
            { name: "Amputation du bras au tiers moyen ou inférieur (Main Dominante)", searchTerms: ["amputation bras tiers moyen inférieur main dominante", "amputation supérieur tiers moyen inférieur main dominante", "dominante main inférieur moyen tiers bras amputation", "amputation bras", "bras tiers"], rate: [80, 85], rateCriteria: { low: "Moignon long.", high: "Moignon court." } },
            { name: "Amputation du bras au tiers moyen ou inférieur (Main Non Dominante)", searchTerms: ["amputation bras tiers moyen inférieur main non dominante", "amputation supérieur tiers moyen inférieur main non dominante", "dominante non main inférieur moyen tiers bras amputation", "amputation bras", "bras tiers"], rate: [70, 75], rateCriteria: { low: "Moignon long.", high: "Moignon court." } },
            { name: "Amputation du bras au tiers supérieur (Main Dominante)", searchTerms: ["amputation bras tiers supérieur main dominante", "amputation supérieur tiers supérieur main dominante", "dominante main supérieur tiers bras amputation", "amputation bras", "bras tiers"], rate: [80, 85], rateCriteria: { low: "Moignon long.", high: "Moignon très court, difficilement appareillable." } },
            { name: "Amputation du bras au tiers supérieur (Main Non Dominante)", searchTerms: ["amputation bras tiers supérieur main non dominante", "amputation supérieur tiers supérieur main non dominante", "dominante non main supérieur tiers bras amputation", "amputation bras", "bras tiers"], rate: [70, 75], rateCriteria: { low: "Moignon long.", high: "Moignon très court." } },
            { name: "Amputation du bras au tiers moyen", searchTerms: ["amputation bras tiers moyen", "amputation supérieur tiers moyen", "moyen tiers bras amputation", "amputation bras", "bras tiers"], rate: [80, 85], description: "Amputation de l'humérus dans sa partie moyenne, côté dominant supposé." },
            { name: "Amputation du bras au tiers inférieur", searchTerms: ["amputation bras tiers inférieur", "amputation supérieur tiers inférieur", "inférieur tiers bras amputation", "amputation bras", "bras tiers"], rate: [80, 85], description: "Amputation de l'humérus dans sa partie distale, proche du coude." },
        ]
       },
       {
        name: "Bras - Fractures et Lésions Musculaires",
        injuries: [
            { name: "Fracture de l'humérus normalement consolidée (Main Dominante)", searchTerms: ["fracture l'humérus normalement consolidée main dominante", "dominante main consolidée normalement l'humérus fracture", "fracture l'humérus", "l'humérus normalement", "normalement consolidée"], rate: [4, 6], rateCriteria: { low: "Consolidation parfaite, sans aucune limitation de mobilité. Gêne très discrète et occasionnelle lors d'efforts importants.", medium: "Douleurs modérées lors des efforts, sans limitation objective des amplitudes articulaires.", high: "Consolidation de bonne qualité mais avec des douleurs persistantes à la mobilisation de l'épaule ou du coude, et une légère atrophie musculaire." } },
            { name: "Fracture de l'humérus normalement consolidée (Main Non Dominante)", searchTerms: ["fracture l'humérus normalement consolidée main non dominante", "dominante non main consolidée normalement l'humérus fracture", "fracture l'humérus", "l'humérus normalement", "normalement consolidée"], rate: [3, 5], rateCriteria: { low: "Consolidation parfaite, sans gêne fonctionnelle.", medium: "Gêne douloureuse lors des efforts de force.", high: "Douleurs persistantes à l'effort et gêne modérée dans les gestes de la vie quotidienne." } },
            { name: "Fracture de l'humérus avec déformation et atrophie (sans paralysie) (Main Dominante)", searchTerms: ["fracture l'humérus avec déformation atrophie sans paralysie main dominante", "dominante main paralysie sans atrophie déformation avec l'humérus fracture", "fracture l'humérus déformation atrophie paralysie main dominante", "fracture l'humérus", "l'humérus avec"], rate: [7, 30], rateCriteria: { low: "Déformation légère, pas de limitation fonctionnelle.", medium: "Cal vicieux avec limitation de la mobilité de l'épaule ou du coude.", high: "Cal vicieux important, atrophie musculaire, troubles neurologiques associés." } },
            { name: "Fracture de l'humérus avec déformation et atrophie (sans paralysie) (Main Non Dominante)", searchTerms: ["fracture l'humérus avec déformation atrophie sans paralysie main non dominante", "dominante non main paralysie sans atrophie déformation avec l'humérus fracture", "fracture l'humérus déformation atrophie paralysie main non dominante", "fracture l'humérus", "l'humérus avec"], rate: [5, 25], rateCriteria: { low: "Déformation légère.", medium: "Cal vicieux.", high: "Cal vicieux important." } },
            { name: "Pseudarthrose de l'humérus - Partie moyenne (Main Dominante)", searchTerms: ["pseudarthrose l'humérus partie moyenne main dominante", "dominante main moyenne partie l'humérus pseudarthrose", "pseudarthrose l'humérus", "l'humérus partie", "partie moyenne"], rate: [40, 50], rateCriteria: { low: "Pseudarthrose serrée, stable.", high: "Pseudarthrose lâche, bras ballant." } },
            { name: "Pseudarthrose de l'humérus - Partie moyenne (Main Non Dominante)", searchTerms: ["pseudarthrose l'humérus partie moyenne main non dominante", "dominante non main moyenne partie l'humérus pseudarthrose", "pseudarthrose l'humérus", "l'humérus partie", "partie moyenne"], rate: [30, 40], rateCriteria: { low: "Pseudarthrose serrée.", high: "Pseudarthrose lâche." } },
            { name: "Pseudarthrose de l'humérus - Voisinage épaule ou coude (épaule/coude ballant)", description: "Se référer aux taux pour épaule/coude ballant", rate: [40, 70], rateCriteria: { low: "Instabilité modérée.", high: "Instabilité majeure, membre inutile." } },
            { name: "Rupture du biceps partielle (Main Dominante)", searchTerms: ["rupture biceps partielle main dominante", "dominante main partielle biceps rupture", "rupture biceps", "biceps partielle", "partielle main"], rate: [8, 15], description: "Désinsertion partielle d'un tendon du biceps, avec déformation modérée ('signe de Popeye' partiel) et perte de force en flexion/supination.", rateCriteria: { low: "Déformation modérée, perte de force légère.", high: "Perte de force notable (>20%) avec gêne fonctionnelle." } },
            { name: "Rupture du biceps partielle (Main Non Dominante)", searchTerms: ["rupture biceps partielle main non dominante", "dominante non main partielle biceps rupture", "rupture biceps", "biceps partielle", "partielle main"], rate: [6, 12], rateCriteria: { low: "Déformation modérée, peu de gêne.", high: "Perte de force et gêne fonctionnelle." } },
            { name: "Rupture du biceps complète (Main Dominante)", searchTerms: ["rupture biceps complète main dominante", "dominante main complète biceps rupture", "rupture biceps", "biceps complète", "complète main"], rate: [15, 25], description: "Rupture totale d'un tendon du biceps (souvent le long chef), avec déformation marquée ('signe de Popeye') et perte de force significative.", rateCriteria: { low: "Perte de force modérée (environ 30%), bien compensée.", high: "Perte de force importante (>40%), invalidante pour les travaux de force." } },
            { name: "Rupture du biceps complète (Main Non Dominante)", searchTerms: ["rupture biceps complète main non dominante", "dominante non main complète biceps rupture", "rupture biceps", "biceps complète", "complète main"], rate: [12, 20], rateCriteria: { low: "Perte de force modérée.", high: "Perte de force importante et invalidante." } },
            { name: "Rupture du triceps totale (Main Dominante)", searchTerms: ["rupture triceps totale main dominante", "dominante main totale triceps rupture", "rupture triceps", "triceps totale", "totale main"], rate: [20, 30] },
            { name: "Rupture du triceps totale (Main Non Dominante)", searchTerms: ["rupture triceps totale main non dominante", "dominante non main totale triceps rupture", "rupture triceps", "triceps totale", "totale main"], rate: [15, 25] },
            { name: "Déchirure partielle des tendons extenseurs du poignet (Main Dominante)", searchTerms: ["déchirure partielle tendons extenseurs poignet main dominante", "déchirure tendons extenseurs poignet", "tendons extenseurs poignet", "extenseurs poignet"], rate: [8, 15], description: "Déchirure partielle des tendons extenseurs au niveau du poignet, entraînant une perte de force en extension de la main et des doigts, avec douleurs aux mouvements.", rateCriteria: { low: "Perte de force légère (<20%), douleurs occasionnelles.", medium: "Perte de force modérée (20-40%), douleurs fréquentes.", high: "Perte de force importante (>40%), gêne fonctionnelle significative." } },
            { name: "Déchirure partielle des tendons extenseurs du poignet (Main Non Dominante)", searchTerms: ["déchirure partielle tendons extenseurs poignet main non dominante", "déchirure tendons extenseurs poignet", "tendons extenseurs poignet", "extenseurs poignet"], rate: [6, 12], description: "Déchirure partielle des tendons extenseurs au niveau du poignet.", rateCriteria: { low: "Perte de force légère.", medium: "Perte de force modérée.", high: "Perte de force importante avec gêne fonctionnelle." } },
            { name: "Élongation musculaire de l'épaule (Main Dominante)", searchTerms: ["élongation musculaire épaule main dominante", "élongation épaule", "élongation musculaire épaule", "muscle épaule"], rate: [5, 12], description: "Élongation ou déchirure partielle des muscles de l'épaule (deltoïde, supra-épineux, etc.), entraînant des douleurs et une limitation de force.", rateCriteria: { low: "Douleurs légères, force quasi-normale.", medium: "Douleurs modérées, perte de force 20-30%.", high: "Douleurs persistantes, perte de force >30%, limitation mobilité." } },
            { name: "Élongation musculaire de l'épaule (Main Non Dominante)", searchTerms: ["élongation musculaire épaule main non dominante", "élongation épaule", "élongation musculaire épaule", "muscle épaule"], rate: [4, 10], description: "Élongation ou déchirure partielle des muscles de l'épaule.", rateCriteria: { low: "Douleurs légères.", medium: "Douleurs modérées avec perte de force.", high: "Douleurs persistantes avec limitation fonctionnelle." } },
        ]
      },
      {
        name: "Coude - Désarticulation",
        injuries: [
          { name: "Désarticulation du coude (Main Dominante)", searchTerms: ["désarticulation coude main dominante", "dominante main coude désarticulation", "désarticulation coude", "coude main", "main dominante"], rate: [75, 80], rateCriteria: { low: "Moignon long et de bonne qualité.", high: "Moignon court ou douloureux." } },
          { name: "Désarticulation du coude (Main Non Dominante)", searchTerms: ["désarticulation coude main non dominante", "dominante non main coude désarticulation", "désarticulation coude", "coude main", "main non"], rate: [65, 70], rateCriteria: { low: "Moignon long et de bonne qualité.", high: "Moignon court ou douloureux." } },
        ]
      },
      {
        name: "Coude - Fractures et Pseudarthroses",
        injuries: [
          { name: "Fracture de l'olécrane - Cal osseux court, bonne extension (Main Dominante)", searchTerms: ["fracture l'olécrane cal osseux court, bonne extension main dominante", "dominante main extension bonne court, osseux cal l'olécrane fracture", "fracture l'olécrane", "l'olécrane cal", "cal osseux"], rate: [3, 5] },
          { name: "Fracture de l'olécrane - Cal osseux court, bonne extension (Main Non Dominante)", searchTerms: ["fracture l'olécrane cal osseux court, bonne extension main non dominante", "dominante non main extension bonne court, osseux cal l'olécrane fracture", "fracture l'olécrane", "l'olécrane cal", "cal osseux"], rate: [2, 4] },
          { name: "Fracture de l'olécrane - Cal fibreux long, extension active faible (Main Dominante)", searchTerms: ["fracture l'olécrane cal fibreux long, extension active faible main dominante", "dominante main faible active extension long, fibreux cal l'olécrane fracture", "fracture l'olécrane", "l'olécrane cal", "cal fibreux"], rate: [8, 10] },
          { name: "Fracture de l'olécrane - Cal fibreux long, extension active faible (Main Non Dominante)", searchTerms: ["fracture l'olécrane cal fibreux long, extension active faible main non dominante", "dominante non main faible active extension long, fibreux cal l'olécrane fracture", "fracture l'olécrane", "l'olécrane cal", "cal fibreux"], rate: [6, 8] },
          { name: "Fracture de l'olécrane - Cal fibreux long, extension active nulle, atrophie (Main Dominante)", searchTerms: ["fracture l'olécrane cal fibreux long, extension active nulle, atrophie main dominante", "dominante main atrophie nulle, active extension long, fibreux cal l'olécrane fracture", "fracture l'olécrane", "l'olécrane cal", "cal fibreux"], rate: [20, 23] },
          { name: "Fracture de l'olécrane - Cal fibreux long, extension active nulle, atrophie (Main Non Dominante)", searchTerms: ["fracture l'olécrane cal fibreux long, extension active nulle, atrophie main non dominante", "dominante non main atrophie nulle, active extension long, fibreux cal l'olécrane fracture", "fracture l'olécrane", "l'olécrane cal", "cal fibreux"], rate: [15, 18] },
          { name: "Cicatrices du coude entravant l'extension - à 135°", searchTerms: ["cicatrices coude entravant l'extension 135°", "135° l'extension entravant coude cicatrices", "cicatrices coude", "coude entravant", "entravant l'extension"], rate: [10, 15] },
          { name: "Cicatrices du coude entravant l'extension - à 90°", searchTerms: ["cicatrices coude entravant l'extension 90°", "90° l'extension entravant coude cicatrices", "cicatrices coude", "coude entravant", "entravant l'extension"], rate: [15, 20] },
          { name: "Cicatrices du coude entravant l'extension - à 45°", searchTerms: ["cicatrices coude entravant l'extension 45°", "45° l'extension entravant coude cicatrices", "cicatrices coude", "coude entravant", "entravant l'extension"], rate: [35, 40] },
          { name: "Cicatrices du coude entravant l'extension - en deçà de 45°", searchTerms: ["cicatrices coude entravant l'extension deçà 45°", "45° deçà l'extension entravant coude cicatrices", "cicatrices coude", "coude entravant", "entravant l'extension"], rate: [45, 50] },
          { name: "Pseudarthrose coude - Mobile (coude ballant) (Main Dominante)", searchTerms: ["pseudarthrose coude mobile coude ballant main dominante", "dominante main ballant coude mobile coude pseudarthrose", "pseudarthrose coude", "coude mobile", "mobile coude"], rate: [40, 50] },
          { name: "Pseudarthrose coude - Mobile (coude ballant) (Main Non Dominante)", searchTerms: ["pseudarthrose coude mobile coude ballant main non dominante", "dominante non main ballant coude mobile coude pseudarthrose", "pseudarthrose coude", "coude mobile", "mobile coude"], rate: [30, 40] },
          { name: "Pseudarthrose coude - Avec ankylose (Main Dominante)", searchTerms: ["pseudarthrose coude avec ankylose main dominante", "dominante main ankylose avec coude pseudarthrose", "pseudarthrose coude ankylose main dominante", "pseudarthrose coude", "coude avec"], rate: [30, 45] },
          { name: "Pseudarthrose coude - Avec ankylose (Main Non Dominante)", searchTerms: ["pseudarthrose coude avec ankylose main non dominante", "dominante non main ankylose avec coude pseudarthrose", "pseudarthrose coude ankylose main non dominante", "pseudarthrose coude", "coude avec"], rate: [25, 35] },
        ]
      },
      {
        name: "Coude - Raideurs et Ankyloses",
        injuries: [
            { name: "Ankylose complète du coude - Bras en pronation (Main Dominante)", searchTerms: ["ankylose complète coude bras pronation main dominante", "ankylose complète coude supérieur pronation main dominante", "dominante main pronation bras coude complète ankylose", "ankylose complète", "complète coude"], rate: [40, 50] },
            { name: "Ankylose complète du coude - Bras en pronation (Main Non Dominante)", searchTerms: ["ankylose complète coude bras pronation main non dominante", "ankylose complète coude supérieur pronation main non dominante", "dominante non main pronation bras coude complète ankylose", "ankylose complète", "complète coude"], rate: [30, 40] },
            { name: "Ankylose complète du coude - Bras en supination (Main Dominante)", searchTerms: ["ankylose complète coude bras supination main dominante", "ankylose complète coude supérieur supination main dominante", "dominante main supination bras coude complète ankylose", "ankylose complète", "complète coude"], rate: [50, 60] },
            { name: "Ankylose complète du coude - Bras en supination (Main Non Dominante)", searchTerms: ["ankylose complète coude bras supination main non dominante", "ankylose complète coude supérieur supination main non dominante", "dominante non main supination bras coude complète ankylose", "ankylose complète", "complète coude"], rate: [40, 50] },
            { name: "Ankylose complète du coude - Bras entre pronation et supination (Main Dominante)", searchTerms: ["ankylose complète coude bras entre pronation supination main dominante", "ankylose complète coude supérieur entre pronation supination main dominante", "dominante main supination pronation entre bras coude complète ankylose", "ankylose complète", "complète coude"], rate: [30, 40] },
            { name: "Ankylose complète du coude - Bras entre pronation et supination (Main Non Dominante)", searchTerms: ["ankylose complète coude bras entre pronation supination main non dominante", "ankylose complète coude supérieur entre pronation supination main non dominante", "dominante non main supination pronation entre bras coude complète ankylose", "ankylose complète", "complète coude"], rate: [25, 35] },
            { name: "Limitation de la flexion du coude (Main Dominante)", searchTerms: ["limitation flexion coude main dominante", "raideur flexion coude main dominante", "dominante main coude flexion limitation", "limitation flexion", "flexion coude"], rate: [3, 25], rateCriteria: { low: "Limitation légère (flexion > 100°).", high: "Flexion limitée à 45°." } },
            { name: "Limitation de la flexion du coude (Main Non Dominante)", searchTerms: ["limitation flexion coude main non dominante", "raideur flexion coude main non dominante", "dominante non main coude flexion limitation", "limitation flexion", "flexion coude"], rate: [2, 20], rateCriteria: { low: "Limitation légère.", high: "Limitation sévère." } },
            { name: "Limitation de l'extension du coude (Main Dominante)", searchTerms: ["limitation l'extension coude main dominante", "raideur l'extension coude main dominante", "dominante main coude l'extension limitation", "limitation l'extension", "l'extension coude"], rate: [2, 10], rateCriteria: { low: "Déficit d'extension < 45°.", high: "Déficit d'extension > 90° (flessum)." } },
            { name: "Limitation de l'extension du coude (Main Non Dominante)", searchTerms: ["limitation l'extension coude main non dominante", "raideur l'extension coude main non dominante", "dominante non main coude l'extension limitation", "limitation l'extension", "l'extension coude"], rate: [1, 8], rateCriteria: { low: "Déficit léger.", high: "Déficit important." } },
            { name: "Limitation de la pronation (Main Dominante)", searchTerms: ["limitation pronation main dominante", "raideur pronation main dominante", "dominante main pronation limitation", "limitation pronation", "pronation main"], rate: [4, 8] },
            { name: "Limitation de la pronation (Main Non Dominante)", searchTerms: ["limitation pronation main non dominante", "raideur pronation main non dominante", "dominante non main pronation limitation", "limitation pronation", "pronation main"], rate: [2, 6] },
            { name: "Limitation de la supination (Main Dominante)", searchTerms: ["limitation supination main dominante", "raideur supination main dominante", "dominante main supination limitation", "limitation supination", "supination main"], rate: [5, 10] },
            { name: "Limitation de la supination (Main Non Dominante)", searchTerms: ["limitation supination main non dominante", "raideur supination main non dominante", "dominante non main supination limitation", "limitation supination", "supination main"], rate: [4, 8] },
            { name: "Abolition de la prono-supination (Main Dominante)", searchTerms: ["abolition prono supination main dominante", "dominante main supination prono abolition", "abolition prono", "prono supination", "supination main"], rate: [15, 20], rateCriteria: { low: "Blocage en position neutre.", high: "Blocage en pronation complète." } },
            { name: "Abolition de la prono-supination (Main Non Dominante)", searchTerms: ["abolition prono supination main non dominante", "dominante non main supination prono abolition", "abolition prono", "prono supination", "supination main"], rate: [12, 18], rateCriteria: { low: "Position neutre.", high: "Pronation complète." } },
        ]
      },
      {
        name: "Coude - Lésions Diverses",
        injuries: [
            { name: "Séquelles de prothèse totale du coude (Main Dominante)", searchTerms: ["séquelles prothèse totale coude main dominante", "dominante main coude totale prothèse séquelles", "séquelles prothèse", "prothèse totale", "totale coude"], rate: [25, 50], rateCriteria: { low: "Prothèse indolore, mobilité fonctionnelle.", high: "Douleurs, instabilité, descellement, mobilité très limitée." } },
            { name: "Séquelles de prothèse totale du coude (Main Non Dominante)", searchTerms: ["séquelles prothèse totale coude main non dominante", "dominante non main coude totale prothèse séquelles", "séquelles prothèse", "prothèse totale", "totale coude"], rate: [20, 45], rateCriteria: { low: "Prothèse indolore.", high: "Douleurs et instabilité." } },
            { name: "Hygroma chronique du coude (Main Dominante)", searchTerms: ["hygroma chronique coude main dominante", "dominante main coude chronique hygroma", "hygroma chronique", "chronique coude", "coude main"], rate: [2, 5] },
            { name: "Hygroma chronique du coude (Main Non Dominante)", searchTerms: ["hygroma chronique coude main non dominante", "dominante non main coude chronique hygroma", "hygroma chronique", "chronique coude", "coude main"], rate: [1, 4] },
            { name: "Épicondylite ou Épitrochléite chronique rebelle (Main Dominante)", searchTerms: ["épicondylite épitrochléite chronique rebelle main dominante", "dominante main rebelle chronique épitrochléite épicondylite", "épicondylite épitrochléite", "épitrochléite chronique", "chronique rebelle"], rate: [5, 15], rateCriteria: { low: "Douleurs mécaniques à l'effort.", high: "Douleurs permanentes invalidantes, rebelles au traitement." } },
            { name: "Épicondylite ou Épitrochléite chronique rebelle (Main Non Dominante)", searchTerms: ["épicondylite épitrochléite chronique rebelle main non dominante", "dominante non main rebelle chronique épitrochléite épicondylite", "épicondylite épitrochléite", "épitrochléite chronique", "chronique rebelle"], rate: [4, 12], rateCriteria: { low: "Douleurs à l'effort.", high: "Douleurs permanentes." } },
            { name: "Instabilité chronique du coude post-traumatique (Main Dominante)", searchTerms: ["instabilité chronique coude post traumatique main dominante", "dominante main traumatique post coude chronique instabilité", "instabilité chronique", "chronique coude", "coude post"], rate: [10, 25], rateCriteria: { low: "Instabilité modérée, peu de ressauts.", high: "Instabilité majeure, luxations récidivantes, arthrose." } },
            { name: "Instabilité chronique du coude post-traumatique (Main Non Dominante)", searchTerms: ["instabilité chronique coude post traumatique main non dominante", "dominante non main traumatique post coude chronique instabilité", "instabilité chronique", "chronique coude", "coude post"], rate: [8, 20], rateCriteria: { low: "Instabilité modérée.", high: "Instabilité majeure." } },
        ]
      },
      {
        name: "Avant-bras - Amputations",
        injuries: [
            { name: "Amputation de l'avant-bras (Main Dominante)", searchTerms: ["amputation l'avant bras main dominante", "amputation l'avant supérieur main dominante", "dominante main bras l'avant amputation", "amputation l'avant", "l'avant bras"], rate: [70, 75], rateCriteria: { low: "Moignon long.", high: "Moignon court." } },
            { name: "Amputation de l'avant-bras (Main Non Dominante)", searchTerms: ["amputation l'avant bras main non dominante", "amputation l'avant supérieur main non dominante", "dominante non main bras l'avant amputation", "amputation l'avant", "l'avant bras"], rate: [60, 65], rateCriteria: { low: "Moignon long.", high: "Moignon court." } },
            { name: "Amputation de l'avant-bras au tiers moyen", searchTerms: ["amputation l'avant bras tiers moyen", "amputation l'avant supérieur tiers moyen", "moyen tiers bras l'avant amputation", "amputation l'avant", "l'avant bras"], rate: [70, 75], description: "Amputation du radius et cubitus dans leur partie moyenne." },
            { name: "Amputation de l'avant-bras au tiers supérieur", searchTerms: ["amputation l'avant bras tiers supérieur", "amputation l'avant supérieur tiers supérieur", "supérieur tiers bras l'avant amputation", "amputation l'avant", "l'avant bras"], rate: [72, 77], description: "Amputation du radius et cubitus dans leur partie proximale, proche du coude." },
            { name: "Amputation de l'avant-bras au tiers inférieur", searchTerms: ["amputation l'avant bras tiers inférieur", "amputation l'avant supérieur tiers inférieur", "inférieur tiers bras l'avant amputation", "amputation l'avant", "l'avant bras"], rate: [68, 73], description: "Amputation du radius et cubitus dans leur partie distale, proche du poignet." },
            { name: "Perte des deux mains ou désarticulation des poignets", searchTerms: ["perte des deux mains désarticulation des poignets", "amputation des deux mains désarticulation des poignets", "poignets des désarticulation mains deux des perte", "perte deux mains désarticulation poignets", "perte des"], rate: 100 },
        ]
       },
       {
        name: "Avant-bras - Fractures et Pseudarthroses",
        injuries: [
            { name: "Fracture des deux os de l'avant-bras - Bonne consolidation sans trouble fonctionnel (Main Dominante)", searchTerms: ["fracture des deux l'avant bras bonne consolidation sans trouble fonctionnel main dominante", "fracture des deux l'avant supérieur bonne consolidation sans trouble fonctionnel main dominante", "dominante main fonctionnel trouble sans consolidation bonne bras l'avant deux des fracture", "fracture deux l'avant bras bonne consolidation trouble fonctionnel main dominante", "fracture des"], rate: [3, 6] },
            { name: "Fracture des deux os de l'avant-bras - Bonne consolidation sans trouble fonctionnel (Main Non Dominante)", searchTerms: ["fracture des deux l'avant bras bonne consolidation sans trouble fonctionnel main non dominante", "fracture des deux l'avant supérieur bonne consolidation sans trouble fonctionnel main non dominante", "dominante non main fonctionnel trouble sans consolidation bonne bras l'avant deux des fracture", "fracture deux l'avant bras bonne consolidation trouble fonctionnel main non dominante", "fracture des"], rate: [2, 5] },
            { name: "Fracture des deux os de l'avant-bras - Cal vicieux avec limitation de la prono-supination (Main Dominante)", searchTerms: ["fracture des deux l'avant bras cal vicieux avec limitation prono supination main dominante", "fracture des deux l'avant supérieur cal vicieux avec raideur prono supination main dominante", "dominante main supination prono limitation avec vicieux cal bras l'avant deux des fracture", "fracture deux l'avant bras cal vicieux limitation prono supination main dominante", "fracture des"], rate: [10, 25], rateCriteria: { low: "Limitation légère.", high: "Blocage complet en pronation." } },
            { name: "Fracture des deux os de l'avant-bras - Cal vicieux avec limitation de la prono-supination (Main Non Dominante)", searchTerms: ["fracture des deux l'avant bras cal vicieux avec limitation prono supination main non dominante", "fracture des deux l'avant supérieur cal vicieux avec raideur prono supination main non dominante", "dominante non main supination prono limitation avec vicieux cal bras l'avant deux des fracture", "fracture deux l'avant bras cal vicieux limitation prono supination main non dominante", "fracture des"], rate: [8, 20], rateCriteria: { low: "Limitation légère.", high: "Blocage complet." } },
            { name: "Fracture des deux os de l'avant-bras - Cal vicieux avec impotence et troubles nerveux (Main Dominante)", searchTerms: ["fracture des deux l'avant bras cal vicieux avec impotence troubles nerveux main dominante", "fracture des deux l'avant supérieur cal vicieux avec impotence troubles nerf main dominante", "dominante main nerveux troubles impotence avec vicieux cal bras l'avant deux des fracture", "fracture deux l'avant bras cal vicieux impotence troubles nerveux main dominante", "fracture des"], rate: [30, 45] },
            { name: "Fracture des deux os de l'avant-bras - Cal vicieux avec impotence et troubles nerveux (Main Non Dominante)", searchTerms: ["fracture des deux l'avant bras cal vicieux avec impotence troubles nerveux main non dominante", "fracture des deux l'avant supérieur cal vicieux avec impotence troubles nerf main non dominante", "dominante non main nerveux troubles impotence avec vicieux cal bras l'avant deux des fracture", "fracture deux l'avant bras cal vicieux impotence troubles nerveux main non dominante", "fracture des"], rate: [25, 35] },
            { name: "Fracture isolée du radius (Main Dominante)", searchTerms: ["fracture isolée radius main dominante", "dominante main radius isolée fracture", "fracture isolée", "isolée radius", "radius main"], rate: [4, 8] },
            { name: "Fracture isolée du radius (Main Non Dominante)", searchTerms: ["fracture isolée radius main non dominante", "dominante non main radius isolée fracture", "fracture isolée", "isolée radius", "radius main"], rate: [3, 6] },
            { name: "Fracture isolée du cubitus (Main Dominante)", searchTerms: ["fracture isolée cubitus main dominante", "dominante main cubitus isolée fracture", "fracture isolée", "isolée cubitus", "cubitus main"], rate: [3, 6] },
            { name: "Fracture isolée du cubitus (Main Non Dominante)", searchTerms: ["fracture isolée cubitus main non dominante", "dominante non main cubitus isolée fracture", "fracture isolée", "isolée cubitus", "cubitus main"], rate: [2, 5] },
            { name: "Pseudarthrose des deux os de l'avant-bras - serrée (Main Dominante)", searchTerms: ["pseudarthrose des deux l'avant bras serrée main dominante", "pseudarthrose des deux l'avant supérieur serrée main dominante", "dominante main serrée bras l'avant deux des pseudarthrose", "pseudarthrose deux l'avant bras serrée main dominante", "pseudarthrose des"], rate: [25, 35] },
            { name: "Pseudarthrose des deux os de l'avant-bras - serrée (Main Non Dominante)", searchTerms: ["pseudarthrose des deux l'avant bras serrée main non dominante", "pseudarthrose des deux l'avant supérieur serrée main non dominante", "dominante non main serrée bras l'avant deux des pseudarthrose", "pseudarthrose deux l'avant bras serrée main non dominante", "pseudarthrose des"], rate: [20, 30] },
            { name: "Pseudarthrose des deux os de l'avant-bras - lâche (Main Dominante)", searchTerms: ["pseudarthrose des deux l'avant bras lâche main dominante", "pseudarthrose des deux l'avant supérieur lâche main dominante", "dominante main lâche bras l'avant deux des pseudarthrose", "pseudarthrose deux l'avant bras lâche main dominante", "pseudarthrose des"], rate: [45, 55] },
            { name: "Pseudarthrose des deux os de l'avant-bras - lâche (Main Non Dominante)", searchTerms: ["pseudarthrose des deux l'avant bras lâche main non dominante", "pseudarthrose des deux l'avant supérieur lâche main non dominante", "dominante non main lâche bras l'avant deux des pseudarthrose", "pseudarthrose deux l'avant bras lâche main non dominante", "pseudarthrose des"], rate: [35, 45] },
            { name: "Pseudarthrose du radius (Main Dominante)", searchTerms: ["pseudarthrose radius main dominante", "dominante main radius pseudarthrose", "pseudarthrose radius", "radius main", "main dominante"], rate: [20, 25] },
            { name: "Pseudarthrose du radius (Main Non Dominante)", searchTerms: ["pseudarthrose radius main non dominante", "dominante non main radius pseudarthrose", "pseudarthrose radius", "radius main", "main non"], rate: [15, 20] },
            { name: "Pseudarthrose du cubitus (Main Dominante)", searchTerms: ["pseudarthrose cubitus main dominante", "dominante main cubitus pseudarthrose", "pseudarthrose cubitus", "cubitus main", "main dominante"], rate: [15, 20] },
            { name: "Pseudarthrose du cubitus (Main Non Dominante)", searchTerms: ["pseudarthrose cubitus main non dominante", "dominante non main cubitus pseudarthrose", "pseudarthrose cubitus", "cubitus main", "main non"], rate: [12, 18] },
            { name: "Séquelles de fracture-luxation de Monteggia (Main Dominante)", searchTerms: ["séquelles fracture luxation monteggia main dominante", "dominante main monteggia luxation fracture séquelles", "séquelles fracture", "fracture luxation", "luxation monteggia"], rate: [10, 30], rateCriteria: { low: "Consolidation sans limitation majeure.", high: "Raideur et instabilité du coude, limitation prono-supination." } },
            { name: "Séquelles de fracture-luxation de Monteggia (Main Non Dominante)", searchTerms: ["séquelles fracture luxation monteggia main non dominante", "dominante non main monteggia luxation fracture séquelles", "séquelles fracture", "fracture luxation", "luxation monteggia"], rate: [8, 25], rateCriteria: { low: "Consolidation sans limitation majeure.", high: "Raideur et instabilité." } },
            { name: "Séquelles de fracture-luxation de Galeazzi (Main Dominante)", searchTerms: ["séquelles fracture luxation galeazzi main dominante", "dominante main galeazzi luxation fracture séquelles", "séquelles fracture", "fracture luxation", "luxation galeazzi"], rate: [10, 25], rateCriteria: { low: "Consolidation sans limitation majeure.", high: "Limitation prono-supination, instabilité radio-cubitale." } },
            { name: "Séquelles de fracture-luxation de Galeazzi (Main Non Dominante)", searchTerms: ["séquelles fracture luxation galeazzi main non dominante", "dominante non main galeazzi luxation fracture séquelles", "séquelles fracture", "fracture luxation", "luxation galeazzi"], rate: [8, 20], rateCriteria: { low: "Consolidation sans limitation majeure.", high: "Limitation et instabilité." } },
            { name: "Synostose radio-cubitale post-traumatique (Main Dominante)", searchTerms: ["synostose radio cubitale post traumatique main dominante", "dominante main traumatique post cubitale radio synostose", "synostose radio", "radio cubitale", "cubitale post"], rate: [15, 25], description: "Fusion osseuse anormale entre le radius et le cubitus, bloquant la prono-supination.", rateCriteria: { low: "Blocage en position neutre ou de fonction.", high: "Blocage en pronation complète." } },
            { name: "Synostose radio-cubitale post-traumatique (Main Non Dominante)", searchTerms: ["synostose radio cubitale post traumatique main non dominante", "dominante non main traumatique post cubitale radio synostose", "synostose radio", "radio cubitale", "cubitale post"], rate: [12, 20], rateCriteria: { low: "Blocage en position neutre.", high: "Blocage en pronation complète." } },
        ]
      },
      {
        name: "Poignet - Désarticulation",
        injuries: [
          { name: "Désarticulation du poignet (Main Dominante)", searchTerms: ["désarticulation poignet main dominante", "dominante main poignet désarticulation", "désarticulation poignet", "poignet main", "main dominante"], rate: [65, 70] },
          { name: "Désarticulation du poignet (Main Non Dominante)", searchTerms: ["désarticulation poignet main non dominante", "dominante non main poignet désarticulation", "désarticulation poignet", "poignet main", "main non"], rate: [55, 60] },
        ]
      },
      {
        name: "Poignet - Fractures",
        injuries: [
            { name: "Fracture de l'extrémité inférieure du radius - Consolidation parfaite (Main Dominante)", searchTerms: ["fracture l'extrémité inférieure radius consolidation parfaite main dominante", "dominante main parfaite consolidation radius inférieure l'extrémité fracture", "fracture l'extrémité", "l'extrémité inférieure", "inférieure radius"], rate: [3, 5] },
            { name: "Fracture de l'extrémité inférieure du radius - Consolidation parfaite (Main Non Dominante)", searchTerms: ["fracture l'extrémité inférieure radius consolidation parfaite main non dominante", "dominante non main parfaite consolidation radius inférieure l'extrémité fracture", "fracture l'extrémité", "l'extrémité inférieure", "inférieure radius"], rate: [2, 4] },
            { name: "Fracture de l'extrémité inférieure du radius - Avec limitation des mouvements (Main Dominante)", searchTerms: ["fracture l'extrémité inférieure radius avec limitation des mouvements main dominante", "fracture l'extrémité inférieure radius avec raideur des mouvements main dominante", "dominante main mouvements des limitation avec radius inférieure l'extrémité fracture", "fracture l'extrémité inférieure radius limitation mouvements main dominante", "fracture l'extrémité"], rate: [8, 15] },
            { name: "Fracture de l'extrémité inférieure du radius - Avec limitation des mouvements (Main Non Dominante)", searchTerms: ["fracture l'extrémité inférieure radius avec limitation des mouvements main non dominante", "fracture l'extrémité inférieure radius avec raideur des mouvements main non dominante", "dominante non main mouvements des limitation avec radius inférieure l'extrémité fracture", "fracture l'extrémité inférieure radius limitation mouvements main non dominante", "fracture l'extrémité"], rate: [6, 12] },
            { name: "Fracture de l'extrémité inférieure du radius - Avec raideur, déformation et troubles nerveux (Main Dominante)", searchTerms: ["fracture l'extrémité inférieure radius avec raideur, déformation troubles nerveux main dominante", "fracture l'extrémité inférieure radius avec raideur, déformation troubles nerf main dominante", "dominante main nerveux troubles déformation raideur, avec radius inférieure l'extrémité fracture", "fracture l'extrémité inférieure radius raideur, déformation troubles nerveux main dominante", "fracture l'extrémité"], rate: [15, 30] },
            { name: "Fracture de l'extrémité inférieure du radius - Avec raideur, déformation et troubles nerveux (Main Non Dominante)", searchTerms: ["fracture l'extrémité inférieure radius avec raideur, déformation troubles nerveux main non dominante", "fracture l'extrémité inférieure radius avec raideur, déformation troubles nerf main non dominante", "dominante non main nerveux troubles déformation raideur, avec radius inférieure l'extrémité fracture", "fracture l'extrémité inférieure radius raideur, déformation troubles nerveux main non dominante", "fracture l'extrémité"], rate: [12, 25] },
            { name: "Fracture du scaphoïde carpien - Avec raideur simple (Main Dominante)", searchTerms: ["fracture scaphoïde carpien avec raideur simple main dominante", "dominante main simple raideur avec carpien scaphoïde fracture", "fracture scaphoïde carpien raideur simple main dominante", "fracture scaphoïde", "scaphoïde carpien"], rate: [5, 10] },
            { name: "Fracture du scaphoïde carpien - Avec raideur simple (Main Non Dominante)", searchTerms: ["fracture scaphoïde carpien avec raideur simple main non dominante", "dominante non main simple raideur avec carpien scaphoïde fracture", "fracture scaphoïde carpien raideur simple main non dominante", "fracture scaphoïde", "scaphoïde carpien"], rate: [4, 8] },
            { name: "Pseudarthrose du scaphoïde carpien (Main Dominante)", searchTerms: ["pseudarthrose scaphoïde carpien main dominante", "dominante main carpien scaphoïde pseudarthrose", "pseudarthrose scaphoïde", "scaphoïde carpien", "carpien main"], rate: [10, 20], rateCriteria: { low: "Serrée, peu douloureuse.", high: "Lâche, douloureuse, arthrose radio-carpienne." } },
            { name: "Pseudarthrose du scaphoïde carpien (Main Non Dominante)", searchTerms: ["pseudarthrose scaphoïde carpien main non dominante", "dominante non main carpien scaphoïde pseudarthrose", "pseudarthrose scaphoïde", "scaphoïde carpien", "carpien main"], rate: [8, 15], rateCriteria: { low: "Serrée.", high: "Lâche et douloureuse." } },
        ]
      },
      {
        name: "Poignet - Raideurs et Ankyloses",
        injuries: [
            { name: "Ankylose du poignet - Rectiligne (Main Dominante)", searchTerms: ["ankylose poignet rectiligne main dominante", "dominante main rectiligne poignet ankylose", "ankylose poignet", "poignet rectiligne", "rectiligne main"], rate: [25, 30] },
            { name: "Ankylose du poignet - Rectiligne (Main Non Dominante)", searchTerms: ["ankylose poignet rectiligne main non dominante", "dominante non main rectiligne poignet ankylose", "ankylose poignet", "poignet rectiligne", "rectiligne main"], rate: [20, 25] },
            { name: "Ankylose du poignet - En flexion ou extension (Main Dominante)", searchTerms: ["ankylose poignet flexion extension main dominante", "dominante main extension flexion poignet ankylose", "ankylose poignet", "poignet flexion", "flexion extension"], rate: [30, 40] },
            { name: "Ankylose du poignet - En flexion ou extension (Main Non Dominante)", searchTerms: ["ankylose poignet flexion extension main non dominante", "dominante non main extension flexion poignet ankylose", "ankylose poignet", "poignet flexion", "flexion extension"], rate: [25, 35] },
            { name: "Raideur du poignet (Main Dominante)", searchTerms: ["raideur poignet main dominante", "dominante main poignet raideur", "raideur poignet", "poignet main", "main dominante"], rate: [5, 15], rateCriteria: { low: "Limitation de 25% des mobilités.", medium: "Limitation de 50%.", high: "Quasi-ankylose." } },
            { name: "Raideur du poignet (Main Non Dominante)", searchTerms: ["raideur poignet main non dominante", "dominante non main poignet raideur", "raideur poignet", "poignet main", "main non"], rate: [4, 12], rateCriteria: { low: "Limitation de 25%.", medium: "Limitation de 50%.", high: "Quasi-ankylose." } },
            { name: "Raideur du poignet - Flexion/extension limitée", searchTerms: ["raideur poignet flexion/extension limitée", "limitée flexion/extension poignet raideur", "raideur poignet", "poignet flexion/extension", "flexion/extension limitée"], rate: [8, 14], description: "Limitation de la flexion palmaire et/ou de l'extension dorsale du poignet." },
            { name: "Raideur du poignet - Mobilité réduite", searchTerms: ["raideur poignet mobilité réduite", "réduite mobilité poignet raideur", "raideur poignet", "poignet mobilité", "mobilité réduite"], rate: [10, 16], description: "Réduction globale des amplitudes articulaires du poignet (flexion, extension, inclinaisons)." },
            { name: "Raideur du poignet - Limitation sévère", searchTerms: ["raideur poignet limitation sévère", "raideur poignet raideur sévère", "sévère limitation poignet raideur", "raideur poignet", "poignet limitation"], rate: [15, 22], description: "Limitation majeure des mobilités, proche de l'ankylose fonctionnelle." },
            { name: "Raideur poignet avec douleur", searchTerms: ["raideur poignet avec douleur", "douleur avec poignet raideur", "raideur poignet douleur", "raideur poignet", "poignet avec"], rate: [12, 18], description: "Raideur modérée associée à des douleurs chroniques ou mécaniques." },
            { name: "Raideur importante du poignet", searchTerms: ["raideur importante poignet", "poignet importante raideur", "raideur importante", "importante poignet"], rate: [15, 20], description: "Raideur sévère avec limitation fonctionnelle importante dans les gestes quotidiens." },
        ]
      },
      {
        name: "Main - Amputations",
        injuries: [
            { name: "Amputation de la main (Main Dominante)", searchTerms: ["amputation main main dominante", "dominante main main amputation", "amputation main", "main main", "main dominante"], rate: [60, 65] },
            { name: "Amputation de la main (Main Non Dominante)", searchTerms: ["amputation main main non dominante", "dominante non main main amputation", "amputation main", "main main", "main non"], rate: [50, 55] },
            { name: "Amputation de tous les doigts de la main (Main Dominante)", searchTerms: ["amputation tous les doigts main main dominante", "dominante main main doigts les tous amputation", "amputation tous", "tous les", "les doigts"], rate: [55, 60] },
            { name: "Amputation de tous les doigts de la main (Main Non Dominante)", searchTerms: ["amputation tous les doigts main main non dominante", "dominante non main main doigts les tous amputation", "amputation tous", "tous les", "les doigts"], rate: [45, 50] },
            { name: "Perte des cinq métacarpiens (Main Dominante)", searchTerms: ["perte des cinq métacarpiens main dominante", "amputation des cinq métacarpiens main dominante", "dominante main métacarpiens cinq des perte", "perte cinq métacarpiens main dominante", "perte des"], rate: [50, 55] },
            { name: "Perte des cinq métacarpiens (Main Non Dominante)", searchTerms: ["perte des cinq métacarpiens main non dominante", "amputation des cinq métacarpiens main non dominante", "dominante non main métacarpiens cinq des perte", "perte cinq métacarpiens main non dominante", "perte des"], rate: [40, 45] },
            { name: "Perte du 1er métacarpien (Pouce)", searchTerms: ["perte 1er métacarpien pouce", "amputation 1er métacarpien pouce", "pouce métacarpien 1er perte", "perte 1er", "1er métacarpien"], rate: [10, 12] },
            { name: "Perte du 2e métacarpien (Index)", searchTerms: ["perte métacarpien index", "amputation métacarpien index", "index métacarpien perte", "perte métacarpien", "métacarpien index"], rate: [8, 10] },
            { name: "Perte du 3e métacarpien (Majeur)", searchTerms: ["perte métacarpien majeur", "amputation métacarpien majeur", "majeur métacarpien perte", "perte métacarpien", "métacarpien majeur"], rate: [8, 10] },
            { name: "Perte du 4e métacarpien (Annulaire)", searchTerms: ["perte métacarpien annulaire", "amputation métacarpien annulaire", "annulaire métacarpien perte", "perte métacarpien", "métacarpien annulaire"], rate: [5, 7] },
            { name: "Perte du 5e métacarpien (Auriculaire)", searchTerms: ["perte métacarpien auriculaire", "amputation métacarpien auriculaire", "auriculaire métacarpien perte", "perte métacarpien", "métacarpien auriculaire"], rate: [3, 5] },
        ]
      },
      {
        name: "Main - Raideurs et Ankyloses",
        injuries: [
            { name: "Ankylose de tous les doigts de la main (Main Dominante)", searchTerms: ["ankylose tous les doigts main main dominante", "dominante main main doigts les tous ankylose", "ankylose tous", "tous les", "les doigts"], rate: [50, 55] },
            { name: "Ankylose de tous les doigts de la main (Main Non Dominante)", searchTerms: ["ankylose tous les doigts main main non dominante", "dominante non main main doigts les tous ankylose", "ankylose tous", "tous les", "les doigts"], rate: [40, 45] },
            { name: "Main bote, creuse, etc. (Main Dominante)", searchTerms: ["main bote, creuse, etc. main dominante", "dominante main etc. creuse, bote, main", "main bote,", "bote, creuse,", "creuse, etc."], rate: [40, 50] },
            { name: "Main bote, creuse, etc. (Main Non Dominante)", searchTerms: ["main bote, creuse, etc. main non dominante", "dominante non main etc. creuse, bote, main", "main bote,", "bote, creuse,", "creuse, etc."], rate: [30, 40] },
            { name: "Cicatrices vicieuses de la paume (Main Dominante)", searchTerms: ["cicatrices vicieuses paume main dominante", "dominante main paume vicieuses cicatrices", "cicatrices vicieuses", "vicieuses paume", "paume main"], rate: [5, 40], rateCriteria: { low: "Bride limitant l'extension d'un doigt.", high: "Main en griffe, rétraction de tous les doigts." } },
            { name: "Cicatrices vicieuses de la paume (Main Non Dominante)", searchTerms: ["cicatrices vicieuses paume main non dominante", "dominante non main paume vicieuses cicatrices", "cicatrices vicieuses", "vicieuses paume", "paume main"], rate: [4, 35], rateCriteria: { low: "Bride limitant l'extension d'un doigt.", high: "Main en griffe." } },
            { name: "Séquelles de fracture de métacarpien (cal vicieux, raideur) (Main Dominante)", searchTerms: ["séquelles fracture métacarpien cal vicieux, raideur main dominante", "dominante main raideur vicieux, cal métacarpien fracture séquelles", "séquelles fracture", "fracture métacarpien", "métacarpien cal"], rate: [3, 10] },
            { name: "Séquelles de fracture de métacarpien (cal vicieux, raideur) (Main Non Dominante)", searchTerms: ["séquelles fracture métacarpien cal vicieux, raideur main non dominante", "dominante non main raideur vicieux, cal métacarpien fracture séquelles", "séquelles fracture", "fracture métacarpien", "métacarpien cal"], rate: [2, 8] },
        ]
      },
      {
        name: "Doigts - Pouce (Main Dominante)",
        injuries: [
            { name: "Amputation du pouce - Désarticulation métacarpo-phalangienne", searchTerms: ["amputation pouce désarticulation métacarpo phalangienne", "phalangienne métacarpo désarticulation pouce amputation", "amputation pouce", "pouce désarticulation", "désarticulation métacarpo"], rate: 28 },
            { name: "Perte du pouce (2 phalanges) (Main Dominante)", searchTerms: ["perte pouce phalanges main dominante", "amputation pouce phalanges main dominante", "dominante main phalanges pouce perte", "perte pouce", "pouce phalanges"], rate: 25 },
            { name: "Amputation du pouce (main dominante)", searchTerms: ["amputation pouce main dominante", "dominante main pouce amputation", "amputation pouce", "pouce main", "main dominante"], rate: 28 },
            { name: "Perte de la 2ème phalange du pouce (Main Dominante)", searchTerms: ["perte 2ème phalange pouce main dominante", "amputation 2ème phalange pouce main dominante", "dominante main pouce phalange 2ème perte", "perte 2ème", "2ème phalange"], rate: 10 },
            { name: "Ablation 2 phalanges du pouce (Main Dominante)", searchTerms: ["ablation phalanges pouce main dominante", "amputation phalanges pouce main dominante", "dominante main pouce phalanges ablation", "ablation phalanges", "phalanges pouce"], rate: 25 },
            { name: "Amputation phalange P1 du pouce", searchTerms: ["amputation phalange pouce", "pouce phalange amputation", "amputation phalange", "phalange pouce"], rate: 18 },
            { name: "Ankylose carpo-métacarpienne du pouce (Main Dominante)", searchTerms: ["ankylose carpo métacarpienne pouce main dominante", "dominante main pouce métacarpienne carpo ankylose", "ankylose carpo", "carpo métacarpienne", "métacarpienne pouce"], rate: [15, 20] },
            { name: "Ankylose métacarpo-phalangienne du pouce (Main Dominante)", searchTerms: ["ankylose métacarpo phalangienne pouce main dominante", "dominante main pouce phalangienne métacarpo ankylose", "ankylose métacarpo", "métacarpo phalangienne", "phalangienne pouce"], rate: 10 },
            { name: "Ankylose inter-phalangienne du pouce (Main Dominante)", searchTerms: ["ankylose inter phalangienne pouce main dominante", "dominante main pouce phalangienne inter ankylose", "ankylose inter", "inter phalangienne", "phalangienne pouce"], rate: 5 },
            { name: "Ankylose du pouce", searchTerms: ["ankylose pouce"], rate: 20 },
            { name: "Raideur d'une articulation du pouce (Main Dominante)", searchTerms: ["raideur d'une articulation pouce main dominante", "dominante main pouce articulation d'une raideur", "raideur d'une", "d'une articulation", "articulation pouce"], rate: [3, 8] },
            { name: "Raideur du pouce", searchTerms: ["raideur pouce"], rate: [3, 8] },
        ]
      },
      {
        name: "Doigts - Pouce (Main Non Dominante)",
        injuries: [
            { name: "Amputation du pouce - Désarticulation métacarpo-phalangienne", searchTerms: ["amputation pouce désarticulation métacarpo phalangienne", "phalangienne métacarpo désarticulation pouce amputation", "amputation pouce", "pouce désarticulation", "désarticulation métacarpo"], rate: 23 },
            { name: "Perte du pouce (2 phalanges) (Main Non Dominante)", searchTerms: ["perte pouce phalanges main non dominante", "amputation pouce phalanges main non dominante", "dominante non main phalanges pouce perte", "perte pouce", "pouce phalanges"], rate: 20 },
            { name: "Amputation du pouce (main non dominante)", searchTerms: ["amputation pouce main non dominante", "dominante non main pouce amputation", "amputation pouce", "pouce main", "main non"], rate: 23 },
            { name: "Perte de la 2ème phalange du pouce (Main Non Dominante)", searchTerms: ["perte 2ème phalange pouce main non dominante", "amputation 2ème phalange pouce main non dominante", "dominante non main pouce phalange 2ème perte", "perte 2ème", "2ème phalange"], rate: 8 },
            { name: "Ablation 2 phalanges du pouce (Main Non Dominante)", searchTerms: ["ablation phalanges pouce main non dominante", "amputation phalanges pouce main non dominante", "dominante non main pouce phalanges ablation", "ablation phalanges", "phalanges pouce"], rate: 20 },
            { name: "Ankylose carpo-métacarpienne du pouce (Main Non Dominante)", searchTerms: ["ankylose carpo métacarpienne pouce main non dominante", "dominante non main pouce métacarpienne carpo ankylose", "ankylose carpo", "carpo métacarpienne", "métacarpienne pouce"], rate: [12, 15] },
            { name: "Ankylose métacarpo-phalangienne du pouce (Main Non Dominante)", searchTerms: ["ankylose métacarpo phalangienne pouce main non dominante", "dominante non main pouce phalangienne métacarpo ankylose", "ankylose métacarpo", "métacarpo phalangienne", "phalangienne pouce"], rate: 8 },
            { name: "Ankylose inter-phalangienne du pouce (Main Non Dominante)", searchTerms: ["ankylose inter phalangienne pouce main non dominante", "dominante non main pouce phalangienne inter ankylose", "ankylose inter", "inter phalangienne", "phalangienne pouce"], rate: 4 },
            { name: "Raideur d'une articulation du pouce (Main Non Dominante)", searchTerms: ["raideur d'une articulation pouce main non dominante", "dominante non main pouce articulation d'une raideur", "raideur d'une", "d'une articulation", "articulation pouce"], rate: [2, 6] },
        ]
      },
      {
        name: "Doigts - Index (Main Dominante)",
        injuries: [
            { name: "Amputation de l'index - Désarticulation métacarpo-phalangienne", searchTerms: ["amputation l'index désarticulation métacarpo phalangienne", "phalangienne métacarpo désarticulation l'index amputation", "amputation l'index", "l'index désarticulation", "désarticulation métacarpo"], rate: 15 },
            { name: "Perte de l'index (3 phalanges) (Main Dominante)", searchTerms: ["perte l'index phalanges main dominante", "amputation l'index phalanges main dominante", "dominante main phalanges l'index perte", "perte l'index", "l'index phalanges"], rate: 15 },
            { name: "Amputation de l'index", searchTerms: ["amputation l'index"], rate: 15 },
            { name: "Perte de la 3ème phalange de l'index (Main Dominante)", searchTerms: ["perte 3ème phalange l'index main dominante", "amputation 3ème phalange l'index main dominante", "dominante main l'index phalange 3ème perte", "perte 3ème", "3ème phalange"], rate: 5 },
            { name: "Perte des 2ème et 3ème phalanges de l'index (Main Dominante)", searchTerms: ["perte des 2ème 3ème phalanges l'index main dominante", "amputation des 2ème 3ème phalanges l'index main dominante", "dominante main l'index phalanges 3ème 2ème des perte", "perte 2ème 3ème phalanges l'index main dominante", "perte des"], rate: 10 },
            { name: "Amputation phalange P2 index", searchTerms: ["amputation phalange index", "index phalange amputation", "amputation phalange", "phalange index"], rate: 8 },
            { name: "Ablation 2 phalanges de l'index (Main Dominante)", searchTerms: ["ablation phalanges l'index main dominante", "amputation phalanges l'index main dominante", "dominante main l'index phalanges ablation", "ablation phalanges", "phalanges l'index"], rate: 10 },
            { name: "Ankylose de l'index (totalité) (Main Dominante)", searchTerms: ["ankylose l'index totalité main dominante", "dominante main totalité l'index ankylose", "ankylose l'index", "l'index totalité", "totalité main"], rate: 15 },
            { name: "Ankylose de l'index", searchTerms: ["ankylose l'index"], rate: 15 },
            { name: "Raideur d'une articulation de l'index (Main Dominante)", searchTerms: ["raideur d'une articulation l'index main dominante", "dominante main l'index articulation d'une raideur", "raideur d'une", "d'une articulation", "articulation l'index"], rate: [2, 5] },
            { name: "Raideur de l'index", searchTerms: ["raideur l'index"], rate: [2, 5] },
        ]
      },
      {
        name: "Doigts - Index (Main Non Dominante)",
        injuries: [
            { name: "Amputation de l'index - Désarticulation métacarpo-phalangienne", searchTerms: ["amputation l'index désarticulation métacarpo phalangienne", "phalangienne métacarpo désarticulation l'index amputation", "amputation l'index", "l'index désarticulation", "désarticulation métacarpo"], rate: 12 },
            { name: "Perte de l'index (3 phalanges) (Main Non Dominante)", searchTerms: ["perte l'index phalanges main non dominante", "amputation l'index phalanges main non dominante", "dominante non main phalanges l'index perte", "perte l'index", "l'index phalanges"], rate: 12 },
            { name: "Perte de la 3ème phalange de l'index (Main Non Dominante)", searchTerms: ["perte 3ème phalange l'index main non dominante", "amputation 3ème phalange l'index main non dominante", "dominante non main l'index phalange 3ème perte", "perte 3ème", "3ème phalange"], rate: 4 },
            { name: "Perte des 2ème et 3ème phalanges de l'index (Main Non Dominante)", searchTerms: ["perte des 2ème 3ème phalanges l'index main non dominante", "amputation des 2ème 3ème phalanges l'index main non dominante", "dominante non main l'index phalanges 3ème 2ème des perte", "perte 2ème 3ème phalanges l'index main non dominante", "perte des"], rate: 8 },
            { name: "Ankylose de l'index (totalité) (Main Non Dominante)", searchTerms: ["ankylose l'index totalité main non dominante", "dominante non main totalité l'index ankylose", "ankylose l'index", "l'index totalité", "totalité main"], rate: 12 },
            { name: "Raideur d'une articulation de l'index (Main Non Dominante)", searchTerms: ["raideur d'une articulation l'index main non dominante", "dominante non main l'index articulation d'une raideur", "raideur d'une", "d'une articulation", "articulation l'index"], rate: [1, 4] },
        ]
      },
      {
        name: "Doigts - Médius (Main Dominante)",
        injuries: [
            { name: "Amputation du médius - Désarticulation métacarpo-phalangienne", searchTerms: ["amputation médius désarticulation métacarpo phalangienne", "phalangienne métacarpo désarticulation médius amputation", "amputation médius", "médius désarticulation", "désarticulation métacarpo"], rate: 12 },
            { name: "Perte du médius (3 phalanges) (Main Dominante)", searchTerms: ["perte médius phalanges main dominante", "amputation médius phalanges main dominante", "dominante main phalanges médius perte", "perte médius", "médius phalanges"], rate: 12 },
            { name: "Amputation du médius", searchTerms: ["amputation médius"], rate: 12 },
            { name: "Perte de la 3ème phalange du médius (Main Dominante)", searchTerms: ["perte 3ème phalange médius main dominante", "amputation 3ème phalange médius main dominante", "dominante main médius phalange 3ème perte", "perte 3ème", "3ème phalange"], rate: 4 },
            { name: "Perte des 2ème et 3ème phalanges du médius (Main Dominante)", searchTerms: ["perte des 2ème 3ème phalanges médius main dominante", "amputation des 2ème 3ème phalanges médius main dominante", "dominante main médius phalanges 3ème 2ème des perte", "perte 2ème 3ème phalanges médius main dominante", "perte des"], rate: 8 },
            { name: "Ablation 2 phalanges du médius (Main Dominante)", searchTerms: ["ablation phalanges médius main dominante", "amputation phalanges médius main dominante", "dominante main médius phalanges ablation", "ablation phalanges", "phalanges médius"], rate: 8 },
            { name: "Ankylose du médius (totalité) (Main Dominante)", searchTerms: ["ankylose médius totalité main dominante", "dominante main totalité médius ankylose", "ankylose médius", "médius totalité", "totalité main"], rate: 12 },
            { name: "Ankylose du médius", searchTerms: ["ankylose médius"], rate: 12 },
            { name: "Raideur d'une articulation du médius (Main Dominante)", searchTerms: ["raideur d'une articulation médius main dominante", "dominante main médius articulation d'une raideur", "raideur d'une", "d'une articulation", "articulation médius"], rate: [1, 4] },
            { name: "Raideur du médius", searchTerms: ["raideur médius"], rate: [1, 4] },
            // 🆕 V3.3.149: Déformations en attitude vicieuse (boutonnière, col de cygne)
            { 
              name: "Doigt en boutonnière du médius (IPP fléchie, IPD hyperextension) (Main Dominante)", 
              searchTerms: [
                "doigt en boutonnière médius",
                "boutonnière médius ipp fléchie ipd hyperextension",
                "attitude vicieuse médius boutonnière",
                "flexion ipp hyperextension ipd médius",
                "3ème doigt boutonnière",
                "d3 boutonnière",
                "médius attitude vicieuse caractéristique boutonnière",
                "rupture bandelette médiane extenseur médius",
                "déformation boutonnière médius",
                "flexion interphalangienne proximale hyperextension distale médius",
                "perte relief dorsal ipp médius"
              ], 
              rate: [8, 15], 
              description: "Rupture de la bandelette médiane de l'extenseur du médius. Attitude caractéristique : flexion irréductible IPP + hyperextension IPD.", 
              rateCriteria: { 
                low: "Déformation discrète, préhension conservée, douleurs occasionnelles", 
                medium: "Déformation évidente, gêne fonctionnelle modérée, limitation de la force de préhension", 
                high: "Déformation majeure, impotence fonctionnelle importante, perte significative de la préhension fine" 
              } 
            },
        ]
      },
      {
        name: "Doigts - Médius (Main Non Dominante)",
        injuries: [
            { name: "Amputation du médius - Désarticulation métacarpo-phalangienne", searchTerms: ["amputation médius désarticulation métacarpo phalangienne", "phalangienne métacarpo désarticulation médius amputation", "amputation médius", "médius désarticulation", "désarticulation métacarpo"], rate: 10 },
            { name: "Perte du médius (3 phalanges) (Main Non Dominante)", searchTerms: ["perte médius phalanges main non dominante", "amputation médius phalanges main non dominante", "dominante non main phalanges médius perte", "perte médius", "médius phalanges"], rate: 10 },
            { name: "Perte de la 3ème phalange du médius (Main Non Dominante)", searchTerms: ["perte 3ème phalange médius main non dominante", "amputation 3ème phalange médius main non dominante", "dominante non main médius phalange 3ème perte", "perte 3ème", "3ème phalange"], rate: 3 },
            { name: "Perte des 2ème et 3ème phalanges du médius (Main Non Dominante)", searchTerms: ["perte des 2ème 3ème phalanges médius main non dominante", "amputation des 2ème 3ème phalanges médius main non dominante", "dominante non main médius phalanges 3ème 2ème des perte", "perte 2ème 3ème phalanges médius main non dominante", "perte des"], rate: 6 },
            { name: "Ankylose du médius (totalité) (Main Non Dominante)", searchTerms: ["ankylose médius totalité main non dominante", "dominante non main totalité médius ankylose", "ankylose médius", "médius totalité", "totalité main"], rate: 10 },
            { name: "Raideur d'une articulation du médius (Main Non Dominante)", searchTerms: ["raideur d'une articulation médius main non dominante", "dominante non main médius articulation d'une raideur", "raideur d'une", "d'une articulation", "articulation médius"], rate: [1, 3] },
        ]
      },
      {
        name: "Doigts - Annulaire (Main Dominante)",
        injuries: [
            { name: "Amputation de l'annulaire - Désarticulation métacarpo-phalangienne", searchTerms: ["amputation l'annulaire désarticulation métacarpo phalangienne", "phalangienne métacarpo désarticulation l'annulaire amputation", "amputation l'annulaire", "l'annulaire désarticulation", "désarticulation métacarpo"], rate: 10 },
            { name: "Perte de l'annulaire (3 phalanges) (Main Dominante)", searchTerms: ["perte l'annulaire phalanges main dominante", "amputation l'annulaire phalanges main dominante", "dominante main phalanges l'annulaire perte", "perte l'annulaire", "l'annulaire phalanges"], rate: 8 },
            { name: "Amputation de l'annulaire", searchTerms: ["amputation l'annulaire"], rate: 10 },
            { name: "Perte de la 3ème phalange de l'annulaire (Main Dominante)", searchTerms: ["perte 3ème phalange l'annulaire main dominante", "amputation 3ème phalange l'annulaire main dominante", "dominante main l'annulaire phalange 3ème perte", "perte 3ème", "3ème phalange"], rate: 3 },
            { name: "Perte des 2ème et 3ème phalanges de l'annulaire (Main Dominante)", searchTerms: ["perte des 2ème 3ème phalanges l'annulaire main dominante", "amputation des 2ème 3ème phalanges l'annulaire main dominante", "dominante main l'annulaire phalanges 3ème 2ème des perte", "perte 2ème 3ème phalanges l'annulaire main dominante", "perte des"], rate: 6 },
            { name: "Ankylose de l'annulaire (totalité) (Main Dominante)", searchTerms: ["ankylose l'annulaire totalité main dominante", "dominante main totalité l'annulaire ankylose", "ankylose l'annulaire", "l'annulaire totalité", "totalité main"], rate: 8 },
            { name: "Ankylose de l'annulaire", searchTerms: ["ankylose l'annulaire"], rate: 8 },
            { name: "Raideur d'une articulation de l'annulaire (Main Dominante)", searchTerms: ["raideur d'une articulation l'annulaire main dominante", "dominante main l'annulaire articulation d'une raideur", "raideur d'une", "d'une articulation", "articulation l'annulaire"], rate: [1, 3] },
            { name: "Raideur de l'annulaire", searchTerms: ["raideur l'annulaire"], rate: [1, 3] },
        ]
      },
      {
        name: "Doigts - Annulaire (Main Non Dominante)",
        injuries: [
            { name: "Amputation de l'annulaire - Désarticulation métacarpo-phalangienne", searchTerms: ["amputation l'annulaire désarticulation métacarpo phalangienne", "phalangienne métacarpo désarticulation l'annulaire amputation", "amputation l'annulaire", "l'annulaire désarticulation", "désarticulation métacarpo"], rate: 7 },
            { name: "Perte de l'annulaire (3 phalanges) (Main Non Dominante)", searchTerms: ["perte l'annulaire phalanges main non dominante", "amputation l'annulaire phalanges main non dominante", "dominante non main phalanges l'annulaire perte", "perte l'annulaire", "l'annulaire phalanges"], rate: 6 },
            { name: "Perte de la 3ème phalange de l'annulaire (Main Non Dominante)", searchTerms: ["perte 3ème phalange l'annulaire main non dominante", "amputation 3ème phalange l'annulaire main non dominante", "dominante non main l'annulaire phalange 3ème perte", "perte 3ème", "3ème phalange"], rate: 2 },
            { name: "Perte des 2ème et 3ème phalanges de l'annulaire (Main Non Dominante)", searchTerms: ["perte des 2ème 3ème phalanges l'annulaire main non dominante", "amputation des 2ème 3ème phalanges l'annulaire main non dominante", "dominante non main l'annulaire phalanges 3ème 2ème des perte", "perte 2ème 3ème phalanges l'annulaire main non dominante", "perte des"], rate: 4 },
            { name: "Ankylose de l'annulaire (totalité) (Main Non Dominante)", searchTerms: ["ankylose l'annulaire totalité main non dominante", "dominante non main totalité l'annulaire ankylose", "ankylose l'annulaire", "l'annulaire totalité", "totalité main"], rate: 6 },
            { name: "Raideur d'une articulation de l'annulaire (Main Non Dominante)", searchTerms: ["raideur d'une articulation l'annulaire main non dominante", "dominante non main l'annulaire articulation d'une raideur", "raideur d'une", "d'une articulation", "articulation l'annulaire"], rate: [1, 2] },
        ]
      },
      {
        name: "Doigts - Auriculaire (Main Dominante)",
        injuries: [
            { name: "Amputation de l'auriculaire - Désarticulation métacarpo-phalangienne", searchTerms: ["amputation l'auriculaire désarticulation métacarpo phalangienne", "phalangienne métacarpo désarticulation l'auriculaire amputation", "amputation l'auriculaire", "l'auriculaire désarticulation", "désarticulation métacarpo"], rate: 10 },
            { name: "Perte de l'auriculaire (3 phalanges) (Main Dominante)", searchTerms: ["perte l'auriculaire phalanges main dominante", "amputation l'auriculaire phalanges main dominante", "dominante main phalanges l'auriculaire perte", "perte l'auriculaire", "l'auriculaire phalanges"], rate: 10 },
            { name: "Amputation de l'auriculaire", searchTerms: ["amputation l'auriculaire"], rate: 10 },
            { name: "Perte de la 3ème phalange de l'auriculaire (Main Dominante)", searchTerms: ["perte 3ème phalange l'auriculaire main dominante", "amputation 3ème phalange l'auriculaire main dominante", "dominante main l'auriculaire phalange 3ème perte", "perte 3ème", "3ème phalange"], rate: 4 },
            { name: "Ablation phalange unguéale de l'auriculaire (Main Dominante)", searchTerms: ["ablation phalange unguéale l'auriculaire main dominante", "amputation phalange unguéale l'auriculaire main dominante", "dominante main l'auriculaire unguéale phalange ablation", "ablation phalange", "phalange unguéale"], rate: 3 },
            { name: "Perte des 2ème et 3ème phalanges de l'auriculaire (Main Dominante)", searchTerms: ["perte des 2ème 3ème phalanges l'auriculaire main dominante", "amputation des 2ème 3ème phalanges l'auriculaire main dominante", "dominante main l'auriculaire phalanges 3ème 2ème des perte", "perte 2ème 3ème phalanges l'auriculaire main dominante", "perte des"], rate: 7 },
            { name: "Ankylose de l'auriculaire (totalité) (Main Dominante)", searchTerms: ["ankylose l'auriculaire totalité main dominante", "dominante main totalité l'auriculaire ankylose", "ankylose l'auriculaire", "l'auriculaire totalité", "totalité main"], rate: 10 },
            { name: "Ankylose de l'auriculaire", searchTerms: ["ankylose l'auriculaire"], rate: 10 },
            { name: "Raideur d'une articulation de l'auriculaire (Main Dominante)", searchTerms: ["raideur d'une articulation l'auriculaire main dominante", "dominante main l'auriculaire articulation d'une raideur", "raideur d'une", "d'une articulation", "articulation l'auriculaire"], rate: [1, 3] },
            { name: "Raideur de l'auriculaire", searchTerms: ["raideur l'auriculaire"], rate: [1, 3] },
        ]
      },
      {
        name: "Doigts - Auriculaire (Main Non Dominante)",
        injuries: [
            { name: "Amputation de l'auriculaire - Désarticulation métacarpo-phalangienne", searchTerms: ["amputation l'auriculaire désarticulation métacarpo phalangienne", "phalangienne métacarpo désarticulation l'auriculaire amputation", "amputation l'auriculaire", "l'auriculaire désarticulation", "désarticulation métacarpo"], rate: 8 },
            { name: "Perte de l'auriculaire (3 phalanges) (Main Non Dominante)", searchTerms: ["perte l'auriculaire phalanges main non dominante", "amputation l'auriculaire phalanges main non dominante", "dominante non main phalanges l'auriculaire perte", "perte l'auriculaire", "l'auriculaire phalanges"], rate: 8 },
            { name: "Perte de la 3ème phalange de l'auriculaire (Main Non Dominante)", searchTerms: ["perte 3ème phalange l'auriculaire main non dominante", "amputation 3ème phalange l'auriculaire main non dominante", "dominante non main l'auriculaire phalange 3ème perte", "perte 3ème", "3ème phalange"], rate: 3 },
            { name: "Perte des 2ème et 3ème phalanges de l'auriculaire (Main Non Dominante)", searchTerms: ["perte des 2ème 3ème phalanges l'auriculaire main non dominante", "amputation des 2ème 3ème phalanges l'auriculaire main non dominante", "dominante non main l'auriculaire phalanges 3ème 2ème des perte", "perte 2ème 3ème phalanges l'auriculaire main non dominante", "perte des"], rate: 5 },
            { name: "Ankylose de l'auriculaire (totalité) (Main Non Dominante)", searchTerms: ["ankylose l'auriculaire totalité main non dominante", "dominante non main totalité l'auriculaire ankylose", "ankylose l'auriculaire", "l'auriculaire totalité", "totalité main"], rate: 8 },
            { name: "Raideur d'une articulation de l'auriculaire (Main Non Dominante)", searchTerms: ["raideur d'une articulation l'auriculaire main non dominante", "dominante non main l'auriculaire articulation d'une raideur", "raideur d'une", "d'une articulation", "articulation l'auriculaire"], rate: [1, 2] },
        ]
      },
      {
        name: "Doigts - Amputations Multiples",
        injuries: [
            { name: "Amputation de deux doigts", searchTerms: ["amputation deux doigts", "doigts deux amputation", "amputation deux", "deux doigts"], rate: 18 },
            { name: "Amputation de deux doigts (hors pouce)", searchTerms: ["amputation deux doigts hors pouce", "pouce hors doigts deux amputation", "amputation deux", "deux doigts", "doigts hors"], rate: 18 },
            { name: "Amputation de trois doigts", searchTerms: ["amputation trois doigts", "doigts trois amputation", "amputation trois", "trois doigts"], rate: 28 },
            { name: "Amputation de trois doigts dont le pouce", searchTerms: ["amputation trois doigts dont pouce", "pouce dont doigts trois amputation", "amputation trois", "trois doigts", "doigts dont"], rate: 35 },
            { name: "Amputation de quatre doigts", searchTerms: ["amputation quatre doigts", "doigts quatre amputation", "amputation quatre", "quatre doigts"], rate: 45 },
            { name: "Perte 4 doigts incluant Pouce + Index + Médius + Annulaire (Main Dominante)", searchTerms: ["perte doigts incluant pouce index médius annulaire main dominante", "amputation doigts incluant pouce index médius annulaire main dominante", "dominante main annulaire médius index pouce incluant doigts perte", "perte doigts", "doigts incluant"], rate: 58 },
            { name: "Amputation totale des 5 doigts", searchTerms: ["amputation totale des doigts", "doigts des totale amputation", "amputation totale doigts", "amputation totale", "totale des"], rate: 65 },
        ]
      },
    ]
  },
  {
    name: "Membres Inférieurs",
    subcategories: [
      {
        name: "Amputations",
        injuries: [
            { name: "Amputation d'un membre inférieur", searchTerms: ["amputation d'un membre inférieur", "inférieur membre d'un amputation", "amputation d'un", "d'un membre", "membre inférieur"], rate: [70, 80], rateCriteria: { low: "Amputation sous le genou avec moignon long et bien appareillable.", high: "Désarticulation de la hanche ou amputation de cuisse avec moignon très court." } },
            { name: "Amputation des deux membres inférieurs", searchTerms: ["amputation des deux membres inférieurs", "inférieurs membres deux des amputation", "amputation deux membres inférieurs", "amputation des", "des deux"], rate: 100 },
            
            // 🆕 V3.3.136 - Amputations membre inférieur spécifiques
            { name: "Amputation de cuisse (tiers supérieur)", description: "Amputation du tiers supérieur de la cuisse (proche hanche).", rate: [75, 80] },
            { name: "Amputation de cuisse (tiers moyen)", description: "Amputation du tiers moyen de la cuisse.", rate: [70, 75] },
            { name: "Amputation de cuisse (tiers inférieur)", description: "Amputation du tiers inférieur de la cuisse (proche genou).", rate: [65, 70] },
            { name: "Désarticulation du genou", description: "Désarticulation au niveau du genou.", rate: [60, 65] },
            { name: "Amputation de jambe (tiers supérieur)", description: "Amputation du tiers supérieur de la jambe (sous genou).", rate: [55, 60] },
            { name: "Amputation de jambe (tiers moyen)", description: "Amputation du tiers moyen de la jambe.", rate: [50, 55] },
            { name: "Amputation de jambe (tiers inférieur)", description: "Amputation du tiers inférieur de la jambe (proche cheville).", rate: [45, 50] },
            { name: "Désarticulation de la cheville", description: "Désarticulation tibio-tarsienne.", rate: [40, 45] },
            { name: "Désarticulation de la hanche", description: "Désarticulation complète au niveau de la hanche.", rate: [78, 80] },
        ]
      },
      {
        name: "Hanche - Fractures",
        injuries: [
            { name: "Fracture du col du fémur - Consolidation avec raccourcissement et raideur", searchTerms: ["fracture col fémur consolidation avec raccourcissement raideur", "raideur raccourcissement avec consolidation fémur col fracture", "fracture col fémur consolidation raccourcissement raideur", "fracture col", "col fémur"], rate: [30, 60] },
            { name: "Pseudarthrose du col du fémur", searchTerms: ["pseudarthrose col fémur", "fémur col pseudarthrose", "pseudarthrose col", "col fémur"], rate: [60, 80] },
            { name: "Fracture du massif trochantérien - Bonne consolidation", searchTerms: ["fracture massif trochantérien bonne consolidation", "consolidation bonne trochantérien massif fracture", "fracture massif", "massif trochantérien", "trochantérien bonne", "fracture trochantero diaphysaire", "fracture complexe trochantero", "trochantero diaphysaire droite", "trochantero diaphysaire gauche", "fracture trochantero diaphysaire bonne consolidation"], rate: [5, 10], rateCriteria: { low: "Consolidation anatomique sans séquelle, gêne minime.", high: "Consolidation avec légère raideur et douleurs mécaniques." } },
            { name: "Fracture du massif trochantérien - Cal vicieux et raideur", searchTerms: ["fracture massif trochantérien cal vicieux raideur", "raideur vicieux cal trochantérien massif fracture", "fracture massif", "massif trochantérien", "trochantérien cal"], rate: [20, 40] },
        ]
      },
      {
        name: "Hanche - Raideurs et Ankyloses",
        injuries: [
            { name: "Ankylose complète de la hanche", searchTerms: ["ankylose complète hanche", "hanche complète ankylose", "ankylose complète", "complète hanche"], rate: [50, 70], rateCriteria: { low: "Ankylose en position de fonction (flexion 20°, abduction/rotation neutre).", high: "Ankylose en mauvaise position (adduction, rotation externe)." } },
            { name: "Raideur de la hanche", searchTerms: ["raideur hanche"], rate: [10, 40], rateCriteria: { low: "Limitation des amplitudes extrêmes.", high: "Quasi-ankylose avec boiterie importante." } },
            { name: "Séquelles de prothèse totale de hanche", searchTerms: ["séquelles prothèse totale hanche", "hanche totale prothèse séquelles", "séquelles prothèse", "prothèse totale", "totale hanche"], rate: [15, 40], rateCriteria: { low: "Prothèse bien intégrée, indolore, mobilité fonctionnelle.", high: "Douleurs, boiterie, descellement, luxations récidivantes." } },
            { name: "Coxarthrie post-traumatique", searchTerms: ["coxarthrie post traumatique", "traumatique post coxarthrie", "coxarthrie post", "post traumatique"], rate: [15, 40], rateCriteria: { low: "Pincement articulaire modéré, douleurs mécaniques.", high: "Arthrose sévère avec destruction de l'interligne et ankylose." } },
        ]
      },
      {
        name: "Cuisse - Fractures",
        injuries: [
            { name: "Fracture diaphysaire du fémur", searchTerms: ["fracture diaphysaire fémur", "fémur diaphysaire fracture", "fracture diaphysaire", "diaphysaire fémur"], rate: [10, 30], description: "Séquelles d'une fracture de la diaphyse fémorale.", rateCriteria: { low: "Consolidation sans séquelle majeure, gêne discrète.", medium: "Cal vicieux avec raccourcissement < 2cm et/ou raideur modérée du genou/hanche.", high: "Cal vicieux important avec boiterie, raideur et/ou troubles neurologiques." } },
            { name: "Fracture de l'extrémité inférieure du fémur - Avec raideur du genou", searchTerms: ["fracture l'extrémité inférieure fémur avec raideur genou", "genou raideur avec fémur inférieure l'extrémité fracture", "fracture l'extrémité inférieure fémur raideur genou", "fracture l'extrémité", "l'extrémité inférieure"], rate: [15, 30] },
            { name: "Pseudarthrose du fémur", searchTerms: ["pseudarthrose fémur"], rate: [60, 80] },
        ]
      },
      {
        name: "Cuisse - Lésions Musculaires et Tendineuses",
        injuries: [
            { name: "Élongation/déchirure musculaire quadriceps - Tendinopathie quadricipitale (séquelles)", searchTerms: ["élongation/déchirure musculaire quadriceps tendinopathie quadricipitale séquelles", "séquelles quadricipitale tendinopathie quadriceps musculaire élongation/déchirure", "élongation musculaire quadriceps", "déchirure quadriceps", "tendinopathie quadricipitale"], rate: [5, 20], rateCriteria: { low: "Élongation musculaire cicatrisée, gêne occasionnelle à l'effort intense, force conservée.", medium: "Déchirure partielle avec déficit de force modéré (faiblesse extension genou), douleurs à l'effort, limitation activités sportives.", high: "Déchirure complète ou rupture tendineuse avec déficit majeur d'extension active du genou, amyotrophie quadriceps, limitation marche/escaliers." } },
            { name: "Rupture du tendon quadricipital", searchTerms: ["rupture tendon quadricipital", "quadricipital tendon rupture", "rupture tendon quadriceps", "tendon quadricipital"], rate: [15, 30], rateCriteria: { low: "Rupture partielle réparée chirurgicalement, récupération fonctionnelle satisfaisante, déficit de force modéré.", medium: "Rupture complète réparée avec séquelles : déficit extension active, amyotrophie, douleurs résiduelles.", high: "Rupture non réparée ou échec chirurgical, impossibilité extension active du genou, marche très limitée, nécessité aide technique." } },
            { name: "Séquelles de lésions musculaires majeures de la cuisse", searchTerms: ["séquelles lésions musculaires majeures cuisse", "cuisse majeures musculaires lésions séquelles", "lésions musculaires cuisse", "séquelles musculaires", "majeures cuisse"], rate: [10, 25], description: "Séquelles d'écrasement, déchirure massive ou atrophie musculaire importante de la cuisse.", rateCriteria: { low: "Amyotrophie modérée, déficit de force < 30%, gêne fonctionnelle discrète.", medium: "Amyotrophie importante, déficit de force 30-50%, limitation périmètre marche et escaliers.", high: "Amyotrophie sévère, déficit de force > 50%, impossibilité course/sports, aide technique nécessaire." } },
        ]
      },
       {
        name: "Genou - Lésions Osseuses et Articulaires",
        injuries: [
            { name: "Fracture de la rotule - Avec gêne fonctionnelle", searchTerms: ["fracture rotule avec gêne fonctionnelle", "fonctionnelle gêne avec rotule fracture", "fracture rotule gêne fonctionnelle", "fracture rotule", "rotule avec"], rate: [5, 15] },
            { name: "Fracture des plateaux tibiaux - Avec déviation et/ou raideur", searchTerms: ["fracture des plateaux tibiaux avec déviation et/ou raideur", "raideur et/ou déviation avec tibiaux plateaux des fracture", "fracture plateaux tibiaux déviation et/ou raideur", "fracture des", "des plateaux"], rate: [10, 30] },
            { name: "Fracture des condyles fémoraux - Avec déviation et/ou raideur", searchTerms: ["fracture des condyles fémoraux avec déviation et/ou raideur", "raideur et/ou déviation avec fémoraux condyles des fracture", "fracture condyles fémoraux déviation et/ou raideur", "fracture des", "des condyles"], rate: [10, 30] },
            { name: "Hydarthrose chronique du genou", searchTerms: ["hydarthrose chronique genou", "genou chronique hydarthrose", "hydarthrose chronique", "chronique genou"], rate: [5, 15] },
            { name: "Arthrose fémoro-patellaire ou fémoro-tibiale post-traumatique", searchTerms: ["arthrose fémoro patellaire fémoro tibiale post traumatique", "traumatique post tibiale fémoro patellaire fémoro arthrose", "arthrose fémoro", "fémoro patellaire", "patellaire fémoro"], rate: [10, 30], rateCriteria: { low: "Douleurs mécaniques, pincement radiologique modéré.", high: "Arthrose sévère avec déviation axiale et raideur." } },
            { name: "Séquelles de prothèse totale de genou", searchTerms: ["séquelles prothèse totale genou", "genou totale prothèse séquelles", "séquelles prothèse", "prothèse totale", "totale genou"], rate: [15, 40], rateCriteria: { low: "Prothèse indolore, mobilité > 90°, marche sans aide.", high: "Douleurs, instabilité, raideur, nécessité de cannes." } },
        ]
      },
      {
        name: "Genou - Lésions Ligamentaires et Méniscales",
        injuries: [
            { name: "Laxité chronique du genou (séquelle d'entorse)", searchTerms: ["laxité chronique genou séquelle d'entorse", "instabilité chronique genou séquelle d'entorse", "d'entorse séquelle genou chronique laxité", "laxité chronique", "chronique genou"], rate: [5, 20], rateCriteria: { low: "Laxité modérée sans instabilité fonctionnelle.", high: "Instabilité majeure avec dérobements fréquents." } },
            { name: "Séquelles de rupture du ligament croisé antérieur (LCA)", searchTerms: ["séquelles rupture ligament croisé antérieur lca", "lca antérieur croisé ligament rupture séquelles", "séquelles rupture ligament croisé lca", "séquelles rupture", "rupture ligament"], rate: [10, 25] },
            { name: "Séquelles de rupture du ligament croisé postérieur (LCP)", searchTerms: ["séquelles rupture ligament croisé postérieur lcp", "lcp postérieur croisé ligament rupture séquelles", "séquelles rupture", "rupture ligament", "ligament croisé"], rate: [10, 25] },
            { name: "Déchirure/rupture ligament latéral interne (LLI) - ligament collatéral médial genou", searchTerms: ["déchirure/rupture ligament latéral interne lli ligament collatéral médial genou", "genou médial collatéral ligament lli interne latéral ligament déchirure/rupture", "déchirure ligament collatéral médial", "ligament latéral interne", "lli genou", "déchirure partielle ligament médial"], rate: [10, 20], rateCriteria: { low: "Déchirure partielle cicatrisée, laxité minime en valgus, pas d'instabilité fonctionnelle, gêne occasionnelle.", medium: "Déchirure complète avec laxité modérée en valgus, gêne dans les changements de direction, activités sportives limitées.", high: "Laxité sévère en valgus avec instabilité fonctionnelle, douleurs mécaniques fréquentes, limitation marche terrain irrégulier." } },
            { name: "Déchirure/rupture ligament latéral externe (LLE) - ligament collatéral latéral genou", searchTerms: ["déchirure/rupture ligament latéral externe lle ligament collatéral latéral genou", "genou latéral collatéral ligament lle externe latéral ligament déchirure/rupture", "déchirure ligament collatéral latéral", "ligament latéral externe", "lle genou"], rate: [10, 20], rateCriteria: { low: "Déchirure partielle cicatrisée, laxité minime en varus, pas d'instabilité fonctionnelle.", medium: "Déchirure complète avec laxité modérée en varus, gêne dans certaines activités.", high: "Laxité sévère en varus avec instabilité fonctionnelle, douleurs fréquentes, limitation activités." } },
            { name: "Séquelles de méniscectomie (douleurs, hydarthrose)", searchTerms: ["séquelles méniscectomie douleurs, hydarthrose", "séquelles ménisque douleurs, hydarthrose", "hydarthrose douleurs, méniscectomie séquelles", "séquelles méniscectomie", "méniscectomie douleurs,"], rate: [5, 15] },
        ]
      },
      {
        name: "Genou - Raideurs et Ankyloses",
        injuries: [
            { name: "Ankylose du genou", searchTerms: ["ankylose genou"], rate: [30, 50], rateCriteria: { low: "Ankylose en extension complète ou légère flexion.", high: "Ankylose en flexion > 30°." } },
            { name: "Raideur du genou", searchTerms: ["raideur genou"], rate: [5, 25], rateCriteria: { low: "Flexion limitée à 90°.", high: "Flexion < 45° et/ou flessum important." } },
        ]
      },
      {
        name: "Jambe - Fractures",
        injuries: [
            { name: "Fracture des deux os de la jambe - Bonne consolidation", searchTerms: ["fracture des deux jambe bonne consolidation", "fracture des deux inférieur bonne consolidation", "consolidation bonne jambe deux des fracture", "fracture deux jambe bonne consolidation", "fracture des"], rate: [5, 10] },
            { name: "Fracture des deux os de la jambe - Avec cal vicieux et troubles trophiques", searchTerms: ["fracture des deux jambe avec cal vicieux troubles trophiques", "fracture des deux inférieur avec cal vicieux troubles trophiques", "trophiques troubles vicieux cal avec jambe deux des fracture", "fracture deux jambe cal vicieux troubles trophiques", "fracture des"], rate: [15, 40] },
            { name: "Fracture isolée du tibia", searchTerms: ["fracture isolée tibia", "tibia isolée fracture", "fracture isolée", "isolée tibia"], rate: [5, 20] },
            { name: "Fracture isolée du péroné", searchTerms: ["fracture isolée péroné", "péroné isolée fracture", "fracture isolée", "isolée péroné"], rate: [2, 5] },
            { name: "Pseudarthrose des deux os de la jambe", searchTerms: ["pseudarthrose des deux jambe", "pseudarthrose des deux inférieur", "jambe deux des pseudarthrose", "pseudarthrose deux jambe", "pseudarthrose des"], rate: [40, 60] },
            { name: "Pseudarthrose du tibia", searchTerms: ["pseudarthrose tibia"], rate: [30, 50] },
            { name: "Syndrome des loges chronique d'effort de la jambe", searchTerms: ["syndrome des loges chronique d'effort jambe", "syndrome des loges chronique d'effort inférieur", "jambe d'effort chronique loges des syndrome", "syndrome loges chronique d'effort jambe", "syndrome des"], rate: [10, 25], description: "Douleurs musculaires à l'effort par augmentation de pression dans les loges musculaires.", rateCriteria: { low: "Douleurs apparaissant à l'effort intense, calmées par le repos.", high: "Douleurs invalidantes pour des efforts modérés, avec signes neurologiques." } },
        ]
      },
      {
        name: "Cheville (Cou-de-pied) - Fractures",
        injuries: [
            { name: "Fracture malléolaire ou bi-malléolaire - Bonne consolidation", searchTerms: ["fracture malléolaire malléolaire bonne consolidation", "consolidation bonne malléolaire malléolaire fracture", "fracture malléolaire", "malléolaire malléolaire", "malléolaire bonne"], rate: [3, 8] },
            { name: "Fracture malléolaire ou bi-malléolaire - Avec raideur modérée", searchTerms: ["fracture malléolaire malléolaire avec raideur modérée", "modérée raideur avec malléolaire malléolaire fracture", "fracture malléolaire malléolaire raideur modérée", "fracture malléolaire", "malléolaire malléolaire"], rate: [10, 20], rateCriteria: { low: "Cal vicieux léger, raideur limitant les activités sportives.", high: "Raideur marquée avec douleurs chroniques à la marche." } },
            { 
              name: "Fracture bi-malléolaire - Avec cal vicieux important, déformation et troubles trophiques", 
              searchTerms: ["fracture malléolaire avec cal vicieux important, déformation troubles trophiques", "trophiques troubles déformation important, vicieux cal avec malléolaire fracture", "fracture malléolaire cal vicieux important, déformation troubles trophiques", "fracture malléolaire", "malléolaire avec"], rate: [20, 35], 
              rateCriteria: { 
                  low: "Cal vicieux avec raideur douloureuse limitant la marche.", 
                  high: "Déformation majeure, instabilité, troubles trophiques sévères et boiterie importante nécessitant une aide à la marche (canne)." 
              } 
            },
            { name: "Fracture du pilon tibial", searchTerms: ["fracture pilon tibial", "fracture pilon tibial tibial", "tibial pilon fracture", "fracture pilon", "pilon tibial"], rate: [15, 40] },
        ]
      },
      {
        name: "Cheville (Cou-de-pied) - Raideurs et Ankyloses",
        injuries: [
            { name: "Ankylose de la cheville", searchTerms: ["ankylose cheville"], rate: [20, 30], rateCriteria: { low: "Position à angle droit.", high: "En équin ou talus." } },
            { name: "Raideur de la cheville", searchTerms: ["raideur cheville"], rate: [5, 15], rateCriteria: { low: "Limitation modérée de la flexion-extension.", high: "Quasi-ankylose." } },
            { name: "Raideur importante de la cheville", searchTerms: ["raideur importante cheville", "cheville importante raideur", "raideur importante", "importante cheville"], rate: [12, 20], description: "Raideur sévère de la cheville avec limitation fonctionnelle majeure." },
            { name: "Raideur modérée de la cheville", searchTerms: ["raideur modérée cheville", "cheville modérée raideur", "raideur modérée", "modérée cheville"], rate: [8, 15], description: "Raideur modérée avec limitation partielle des mobilités." },
            { name: "Raideur de la cheville - Dorsiflexion 0-10°", searchTerms: ["raideur cheville dorsiflexion 10°", "10° dorsiflexion cheville raideur", "raideur cheville", "cheville dorsiflexion", "dorsiflexion 10°"], rate: [10, 18], description: "Limitation sévère de la dorsiflexion (flexion dorsale) entre 0 et 10 degrés." },
            { name: "Équin modéré de la cheville", searchTerms: ["équin modéré cheville", "cheville modéré équin", "équin modéré", "modéré cheville"], rate: [10, 18], description: "Déformation en équin (pied en extension) modérée avec limitation de la dorsiflexion." },
            { name: "Raideur cheville avec limitation fonctionnelle", searchTerms: ["raideur cheville avec limitation fonctionnelle", "raideur cheville avec raideur fonctionnelle", "fonctionnelle limitation avec cheville raideur", "raideur cheville limitation fonctionnelle", "raideur cheville"], rate: [12, 20], description: "Raideur de cheville entraînant une gêne importante dans la marche quotidienne." },
            { name: "Raideur cheville + sous-astragalienne", searchTerms: ["raideur cheville sous astragalienne", "astragalienne sous cheville raideur", "raideur cheville", "cheville sous", "sous astragalienne"], rate: [15, 25], description: "Raideur combinée de la tibio-tarsienne et de la sous-astragalienne." },
            { name: "Raideur cheville post-bimalléolaire avec claudication", searchTerms: ["raideur cheville post bimalléolaire avec claudication", "raideur cheville post malléolaire avec claudication", "claudication avec bimalléolaire post cheville raideur", "raideur cheville post bimalléolaire claudication", "raideur cheville"], rate: [15, 25], description: "Raideur séquellaire de fracture bimalléolaire avec boiterie persistante." },
            { name: "Instabilité chronique de la cheville (séquelle d'entorse)", searchTerms: ["instabilité chronique cheville séquelle d'entorse", "d'entorse séquelle cheville chronique instabilité", "instabilité chronique", "chronique cheville", "cheville séquelle"], rate: [5, 15], rateCriteria: { low: "Entorses rares.", high: "Entorses à répétition, arthrose." } },
        ]
      },
      {
        name: "Pied - Fractures",
        injuries: [
            { name: "Fracture de l'astragale (Talus) - Avec cal vicieux", searchTerms: ["fracture l'astragale talus avec cal vicieux", "vicieux cal avec talus l'astragale fracture", "fracture l'astragale talus cal vicieux", "fracture l'astragale", "l'astragale talus"], rate: [10, 25] },
            { name: "Fracture du calcanéum - Avec douleurs et boiterie", searchTerms: ["fracture calcanéum avec douleurs boiterie", "boiterie douleurs avec calcanéum fracture", "fracture calcanéum douleurs boiterie", "fracture calcanéum", "calcanéum avec"], rate: [10, 30] },
            { name: "Fracture des métatarsiens - Avec douleurs à la marche", searchTerms: ["fracture des métatarsiens avec douleurs marche", "marche douleurs avec métatarsiens des fracture", "fracture métatarsiens douleurs marche", "fracture des", "des métatarsiens"], rate: [3, 10] },
        ]
      },
      {
        name: "Pied - Raideurs et Ankyloses",
        injuries: [
            { name: "Ankylose d'une articulation du tarse", searchTerms: ["ankylose d'une articulation tarse", "tarse articulation d'une ankylose", "ankylose d'une", "d'une articulation", "articulation tarse"], rate: [10, 20] },
            { name: "Pied plat ou pied creux post-traumatique", searchTerms: ["pied plat pied creux post traumatique", "traumatique post creux pied plat pied", "pied plat", "plat pied", "pied creux"], rate: [5, 20] },
        ]
      },
      {
        name: "Orteils - Lésions",
        injuries: [
            { name: "Amputation du gros orteil", searchTerms: ["amputation gros orteil", "orteil gros amputation", "amputation gros", "gros orteil"], rate: [5, 8] },
            { name: "Amputation d'un autre orteil", searchTerms: ["amputation d'un autre orteil", "orteil autre d'un amputation", "amputation d'un", "d'un autre", "autre orteil"], rate: [1, 3] },
            { name: "Amputation d'un orteil (sauf gros orteil)", searchTerms: ["amputation d'un orteil sauf gros orteil", "orteil gros sauf orteil d'un amputation", "amputation d'un", "d'un orteil", "orteil sauf"], rate: [1, 3], description: "Amputation d'un orteil autre que le gros orteil." },
            { name: "Amputation de deux orteils", searchTerms: ["amputation deux orteils", "orteils deux amputation", "amputation deux", "deux orteils"], rate: [4, 6], description: "Amputation de deux orteils (dont ou non le gros orteil selon contexte)." },
            { name: "Amputation de trois orteils", searchTerms: ["amputation trois orteils", "orteils trois amputation", "amputation trois", "trois orteils"], rate: [6, 10], description: "Amputation de trois orteils." },
            { name: "Amputation de trois orteils ou plus (dont le gros orteil)", searchTerms: ["amputation trois orteils plus dont gros orteil", "orteil gros dont plus orteils trois amputation", "amputation trois", "trois orteils", "orteils plus"], rate: [10, 15], description: "Amputation d'au moins trois orteils incluant le gros orteil." },
            { name: "Amputation de quatre orteils", searchTerms: ["amputation quatre orteils", "orteils quatre amputation", "amputation quatre", "quatre orteils"], rate: [8, 12], description: "Amputation de quatre orteils." },
            { name: "Amputation de tous les orteils", searchTerms: ["amputation tous les orteils", "orteils les tous amputation", "amputation tous", "tous les", "les orteils"], rate: [12, 18], description: "Amputation des cinq orteils." },
            { name: "Ankylose ou raideur du gros orteil (Hallux rigidus)", searchTerms: ["ankylose raideur gros orteil hallux rigidus", "rigidus hallux orteil gros raideur ankylose", "ankylose raideur", "raideur gros", "gros orteil"], rate: [3, 10] },
            { name: "Ankylose du gros orteil", searchTerms: ["ankylose gros orteil", "orteil gros ankylose", "ankylose gros", "gros orteil"], rate: [5, 10], description: "Ankylose complète du gros orteil sans mobilité résiduelle." },
            { name: "Raideur du gros orteil", searchTerms: ["raideur gros orteil", "orteil gros raideur", "raideur gros", "gros orteil"], rate: [3, 7], description: "Raideur du gros orteil avec mobilité résiduelle mais limitée." },
            { name: "Ankylose d'un orteil (autre que gros orteil)", searchTerms: ["ankylose d'un orteil autre que gros orteil", "orteil gros que autre orteil d'un ankylose", "ankylose d'un", "d'un orteil", "orteil autre"], rate: [2, 5], description: "Ankylose d'un orteil autre que le gros orteil." },
            { name: "Ankylose d'un orteil", searchTerms: ["ankylose d'un orteil", "orteil d'un ankylose", "ankylose d'un", "d'un orteil"], rate: [2, 5], description: "Ankylose d'un orteil (non précisé)." },
            { name: "Hallux valgus post-traumatique symptomatique", searchTerms: ["hallux valgus post traumatique symptomatique", "symptomatique traumatique post valgus hallux", "hallux valgus", "valgus post", "post traumatique"], rate: [3, 8], description: "Déviation du gros orteil vers l'extérieur avec douleurs et difficultés de chaussage." },
            { name: "Griffes des orteils post-traumatiques", searchTerms: ["griffes des orteils post traumatiques", "traumatiques post orteils des griffes", "griffes orteils post traumatiques", "griffes des", "des orteils"], rate: [3, 10], description: "Déformation en griffe d'un ou plusieurs orteils avec douleurs et difficultés de chaussage." },
            { name: "Cal vicieux d'un métatarsien", searchTerms: ["cal vicieux d'un métatarsien", "métatarsien d'un vicieux cal", "cal vicieux", "vicieux d'un", "d'un métatarsien"], rate: [3, 8], description: "Consolidation vicieuse d'une fracture métatarsienne avec douleurs à la marche." },
        ]
      },
      {
        name: "Membre Inférieur - Lésions Diverses",
        injuries: [
            { name: "Raccourcissement d'un membre inférieur", searchTerms: ["raccourcissement d'un membre inférieur", "inférieur membre d'un raccourcissement", "raccourcissement d'un", "d'un membre", "membre inférieur"], rate: [5, 25], rateCriteria: { low: "Raccourcissement de 1 à 2 cm.", high: "Raccourcissement > 4 cm." } },
            { name: "Troubles trophiques, œdème chronique, varices", searchTerms: ["troubles trophiques, œdème chronique, varices", "varices chronique, œdème trophiques, troubles", "troubles trophiques,", "trophiques, œdème", "œdème chronique,"], rate: [5, 20] },
            { name: "Boiterie (sans raccourcissement)", searchTerms: ["boiterie sans raccourcissement", "raccourcissement sans boiterie", "boiterie raccourcissement", "boiterie sans", "sans raccourcissement"], rate: [5, 15] },
        ]
      },
    ]
  },
  {
    name: "Algodystrophie et Syndromes Douloureux Régionaux Complexes",
    subcategories: [
      {
        name: "Syndrome Douloureux Régional Complexe (SDRC)",
        injuries: [
          { 
            name: "Algodystrophie (SDRC de type I) - Forme mineure résolutive", 
            searchTerms: ["algodystrophie sdrc type forme mineure résolutive", "résolutive mineure forme type sdrc algodystrophie", "algodystrophie sdrc", "sdrc type", "type forme"], rate: [5, 15], 
            description: "Syndrome douloureux post-traumatique avec troubles vasomoteurs et trophiques, sans lésion nerveuse objectivée. Anciennement appelé 'algoneurodystrophie' ou 'syndrome épaule-main'.",
            rateCriteria: { 
              low: "Phase aiguë bien traitée, séquelles minimes (raideur légère, douleurs occasionnelles), récupération fonctionnelle > 80%.", 
              medium: "Séquelles modérées avec raideur articulaire partielle, douleurs mécaniques résiduelles, limitation fonctionnelle de 30-50%.",
              high: "Forme sévère chronique avec raideur majeure, amyotrophie, troubles trophiques cutanés (peau fine, luisante), douleurs neuropathiques persistantes."
            } 
          },
          { 
            name: "Algodystrophie (SDRC de type I) - Forme majeure séquellaire du membre supérieur", 
            searchTerms: ["algodystrophie sdrc type forme majeure séquellaire membre supérieur", "supérieur membre séquellaire majeure forme type sdrc algodystrophie", "algodystrophie sdrc", "sdrc type", "type forme"], rate: [20, 50], 
            description: "Forme sévère d'algodystrophie avec séquelles importantes au niveau du membre supérieur.",
            rateCriteria: { 
              low: "Raideur marquée d'une articulation (épaule, poignet ou main), douleurs chroniques modérées, retentissement fonctionnel de 50-70%.", 
              medium: "Atteinte de plusieurs articulations avec raideur sévère, main dystonique ou en griffe, douleurs neuropathiques quotidiennes, nécessitant un traitement antalgique puissant.",
              high: "Forme pseudo-paralytique avec main figée, troubles trophiques majeurs (ostéoporose sévère, atrophie cutanée), douleurs rebelles avec allodynie, membre inutilisable."
            } 
          },
          { 
            name: "Algodystrophie (SDRC de type I) - Forme majeure séquellaire du membre inférieur", 
            searchTerms: ["algodystrophie sdrc type forme majeure séquellaire membre inférieur", "inférieur membre séquellaire majeure forme type sdrc algodystrophie", "algodystrophie sdrc", "sdrc type", "type forme"], rate: [15, 40], 
            description: "Forme sévère d'algodystrophie avec séquelles importantes au niveau du membre inférieur.",
            rateCriteria: { 
              low: "Raideur du pied ou de la cheville, douleurs à la marche prolongée, périmètre de marche > 500m.", 
              medium: "Raideur de cheville et pied avec troubles trophiques, marche avec boiterie importante, périmètre limité à 200-500m.",
              high: "Pied figé en équin ou en varus, troubles trophiques sévères, douleurs neuropathiques invalidantes, appui impossible sans aide (canne, attelle)."
            } 
          },
          { 
            name: "Causalgie (SDRC de type II) - Lésion nerveuse documentée", 
            searchTerms: ["causalgie sdrc type lésion nerveuse documentée", "documentée nerveuse lésion type sdrc causalgie", "causalgie sdrc", "sdrc type", "type lésion"], rate: [30, 70], 
            description: "Syndrome douloureux neuropathique majeur suite à une lésion nerveuse périphérique avérée (médian, cubital, sciatique, etc.), avec douleurs à type de brûlure intense, allodynie et troubles vasomoteurs.",
            rateCriteria: { 
              low: "Douleurs neuropathiques bien contrôlées par le traitement (gabapentinoïdes, antidépresseurs), avec limitation fonctionnelle modérée (30-50%).", 
              medium: "Douleurs sévères partiellement contrôlées, allodynie mécanique et thermique, membre peu utilisable, retentissement socio-professionnel majeur.",
              high: "Douleurs neuropathiques rebelles à tous les traitements (y compris neurostimulation), allodynie généralisée, membre complètement inutilisable, retentissement psychologique majeur (dépression, kinésiophobie)."
            } 
          },
        ]
      }
    ]
  },
  {
    name: "Séquelles Respiratoires",
    subcategories: [
      {
        name: "Insuffisance Respiratoire Chronique",
        injuries: [
          { 
            name: "Insuffisance respiratoire chronique - Stade I (légère)", 
            searchTerms: ["insuffisance respiratoire chronique stade légère", "légère stade chronique respiratoire insuffisance", "insuffisance respiratoire", "respiratoire chronique", "chronique stade"], rate: [10, 20], 
            description: "Dyspnée d'effort importante (stade II NYHA), limitation des activités physiques. EFR : VEMS entre 60-80% de la théorique.",
            rateCriteria: { 
              low: "VEMS 70-80%, dyspnée pour des efforts importants uniquement, pas de désaturation à l'effort.", 
              high: "VEMS 60-70%, dyspnée pour des efforts modérés, désaturation modérée à l'effort (SpO2 > 88%)."
            } 
          },
          { 
            name: "Insuffisance respiratoire chronique - Stade II (modérée)", 
            searchTerms: ["insuffisance respiratoire chronique stade modérée", "modérée stade chronique respiratoire insuffisance", "insuffisance respiratoire", "respiratoire chronique", "chronique stade"], rate: [30, 50], 
            description: "Dyspnée au moindre effort (stade III NYHA), limitation majeure des activités quotidiennes. EFR : VEMS entre 40-60%.",
            rateCriteria: { 
              low: "VEMS 50-60%, dyspnée à la marche en terrain plat, activités quotidiennes possibles avec pauses fréquentes.", 
              high: "VEMS 40-50%, dyspnée au repos, désaturation au moindre effort, nécessité d'oxygénothérapie de déambulation."
            } 
          },
          { 
            name: "Insuffisance respiratoire chronique - Stade III (sévère)", 
            searchTerms: ["insuffisance respiratoire chronique stade iii sévère", "sévère iii stade chronique respiratoire insuffisance", "insuffisance respiratoire", "respiratoire chronique", "chronique stade"], rate: [60, 80], 
            description: "Dyspnée de repos (stade IV NYHA), dépendance à l'oxygénothérapie de longue durée. EFR : VEMS < 40%.",
            rateCriteria: { 
              low: "VEMS 30-40%, dyspnée de repos, OLD (Oxygénothérapie de Longue Durée) > 15h/jour, autonomie conservée pour les gestes simples.", 
              high: "VEMS < 30%, dyspnée majeure, OLD permanente, rétention de CO2 (hypercapnie), confinement au domicile, dépendance pour les actes de la vie quotidienne."
            } 
          },
          { 
            name: "Insuffisance respiratoire chronique - Stade IV (très sévère avec décompensation)", 
            searchTerms: ["insuffisance respiratoire chronique stade très sévère avec décompensation", "décompensation avec sévère très stade chronique respiratoire insuffisance", "insuffisance respiratoire chronique stade très sévère décompensation", "insuffisance respiratoire", "respiratoire chronique"], rate: [90, 100], 
            description: "Insuffisance respiratoire terminale avec décompensations fréquentes, confinement au lit ou au fauteuil, dépendance totale.",
            rateCriteria: { 
              low: "Hospitalisations fréquentes pour décompensations, ventilation non invasive (VNI) nocturne.", 
              high: "Confinement permanent, VNI continue ou trachéotomie, dépendance totale."
            } 
          },
          { 
            name: "Bronchopneumopathie Chronique Obstructive (BPCO) post-traumatique", 
            searchTerms: ["bronchopneumopathie chronique obstructive bpco post traumatique", "traumatique post bpco obstructive chronique bronchopneumopathie", "bronchopneumopathie chronique", "chronique obstructive", "obstructive bpco"], rate: [20, 60], 
            description: "BPCO apparue ou aggravée de manière significative après un traumatisme thoracique grave, une inhalation toxique ou une infection pulmonaire sévère.",
            rateCriteria: { 
              low: "BPCO stade GOLD 2 (VEMS 50-80%), dyspnée d'effort, exacerbations rares (< 2/an).", 
              medium: "BPCO stade GOLD 3 (VEMS 30-50%), dyspnée au moindre effort, exacerbations fréquentes (≥ 2/an), OLD de déambulation.",
              high: "BPCO stade GOLD 4 (VEMS < 30%) avec insuffisance respiratoire chronique, OLD permanente, exacerbations fréquentes et sévères."
            } 
          },
          { 
            name: "Bronchectasies (dilatations des bronches) post-traumatiques ou post-infectieuses", 
            searchTerms: ["bronchectasies dilatations des bronches post traumatiques post infectieuses", "infectieuses post traumatiques post bronches des dilatations bronchectasies", "bronchectasies dilatations bronches post traumatiques post infectieuses", "bronchectasies dilatations", "dilatations des"], rate: [20, 50], 
            description: "Dilatations irréversibles des bronches avec infections broncho-pulmonaires à répétition, après un traumatisme thoracique, une pneumonie d'inhalation ou un corps étranger.",
            rateCriteria: { 
              low: "Bronchectasies localisées (1 lobe), infections rares (1-2/an), expectoration chronique modérée, VEMS > 60%.", 
              medium: "Bronchectasies étendues (plusieurs lobes), infections fréquentes (> 3/an), expectoration purulente quotidienne abondante, hémoptysies occasionnelles, VEMS 40-60%.",
              high: "Bronchectasies diffuses bilatérales, infections quasi-permanentes nécessitant une antibiothérapie prolongée, hémoptysies récidivantes, insuffisance respiratoire chronique (VEMS < 40%)."
            } 
          },
          { 
            name: "Séquelles de pneumothorax récidivant ou de bullectomie/pleurectomie", 
            searchTerms: ["séquelles pneumothorax récidivant bullectomie/pleurectomie", "bullectomie/pleurectomie récidivant pneumothorax séquelles", "séquelles pneumothorax", "pneumothorax récidivant", "récidivant bullectomie/pleurectomie"], rate: [10, 30], 
            description: "Séquelles respiratoires après pneumothorax à répétition ou chirurgie thoracique (résection de bulles, symphyse pleurale).",
            rateCriteria: { 
              low: "Gêne respiratoire à l'effort important uniquement, VEMS > 70%, douleurs thoraciques résiduelles.", 
              medium: "Dyspnée d'effort modérée (VEMS 50-70%), limitation des activités physiques, douleurs chroniques de la paroi.",
              high: "Insuffisance respiratoire restrictive (VEMS < 50%), dyspnée au moindre effort, séquelles pleurales avec pachypleurite calcifiée."
            } 
          },
        ]
      },
      {
        name: "Asthme et Pathologies Obstructives",
        injuries: [
          { 
            name: "Asthme post-traumatique ou asthme professionnel indemnisable", 
            searchTerms: ["asthme post traumatique asthme professionnel indemnisable", "indemnisable professionnel asthme traumatique post asthme", "asthme post", "post traumatique", "traumatique asthme"], rate: [10, 40], 
            description: "Asthme déclenché ou aggravé de manière démontrée par un traumatisme (inhalation de fumées, produits toxiques) ou une exposition professionnelle.",
            rateCriteria: { 
              low: "Asthme intermittent ou persistant léger, bien contrôlé par traitement inhalé (corticoïde + bêta-2 agoniste), exacerbations rares (< 1/an).", 
              medium: "Asthme persistant modéré, nécessitant un traitement de fond par corticoïdes inhalés à dose moyenne/forte, exacerbations fréquentes (2-3/an), limitation des activités.",
              high: "Asthme sévère non contrôlé malgré un traitement maximal (corticoïdes inhalés forte dose + bêta-2 agoniste longue durée d'action ± biothérapie), exacerbations fréquentes et graves nécessitant une corticothérapie orale ou des hospitalisations, VEMS < 60%."
            } 
          },
        ]
      }
    ]
  },
  {
    name: "Séquelles de Brûlures",
    subcategories: [
      {
        name: "Brûlures Étendues",
        injuries: [
          { 
            name: "Brûlures cutanées étendues - 10 à 20% de la surface corporelle", 
            searchTerms: ["brûlures cutanées étendues 20% surface corporelle", "corporelle surface 20% étendues cutanées brûlures", "brûlures cutanées", "cutanées étendues", "étendues 20%"], rate: [10, 30], 
            description: "Séquelles de brûlures profondes (2e et 3e degré) couvrant 10 à 20% de la surface corporelle totale.",
            rateCriteria: { 
              low: "Cicatrices stables, souples, sans rétraction majeure ni trouble fonctionnel significatif, bon résultat esthétique.", 
              medium: "Cicatrices hypertrophiques ou rétractiles avec limitation fonctionnelle modérée (articulations), préjudice esthétique notable.",
              high: "Cicatrices chéloïdes étendues, rétractions majeures limitant les amplitudes articulaires, troubles trophiques (sécheresse, prurit intense), préjudice esthétique majeur."
            } 
          },
          { 
            name: "Brûlures cutanées étendues - 20 à 40% de la surface corporelle", 
            searchTerms: ["brûlures cutanées étendues 40% surface corporelle", "corporelle surface 40% étendues cutanées brûlures", "brûlures cutanées", "cutanées étendues", "étendues 40%"], rate: [40, 60], 
            description: "Séquelles de brûlures profondes couvrant 20 à 40% de la surface corporelle.",
            rateCriteria: { 
              low: "Cicatrices avec rétractions multiples et limitations fonctionnelles articulaires modérées, greffes cutanées stables.", 
              medium: "Rétractions majeures avec limitation sévère de plusieurs articulations, troubles trophiques importants, nécessité de vêtements compressifs, greffes instables nécessitant des reprises.",
              high: "Séquelles invalidantes multiples avec raideurs articulaires sévères, troubles de la thermorégulation, douleurs neuropathiques chroniques, préjudice esthétique majeur avec retentissement psychologique."
            } 
          },
          { 
            name: "Brûlures cutanées étendues - 40 à 60% de la surface corporelle", 
            searchTerms: ["brûlures cutanées étendues 60% surface corporelle", "corporelle surface 60% étendues cutanées brûlures", "brûlures cutanées", "cutanées étendues", "étendues 60%"], rate: [70, 90], 
            description: "Séquelles de brûlures profondes couvrant 40 à 60% de la surface corporelle.",
            rateCriteria: { 
              low: "Séquelles majeures avec multiples rétractions et raideurs articulaires, nécessité d'aides techniques ponctuelles.", 
              medium: "Limitations fonctionnelles sévères de plusieurs membres, dépendance partielle pour certains actes de la vie quotidienne, douleurs chroniques rebelles.",
              high: "Polyhandicap avec dépendance majeure, confinement au domicile, troubles psychologiques sévères (dépression, syndrome de stress post-traumatique)."
            } 
          },
          { 
            name: "Brûlures cutanées étendues - > 60% de la surface corporelle", 
            searchTerms: ["brûlures cutanées étendues 60% surface corporelle", "corporelle surface 60% étendues cutanées brûlures", "brûlures cutanées", "cutanées étendues", "étendues 60%"], rate: [90, 100], 
            description: "Séquelles de brûlures très étendues avec polyhandicap et dépendance totale ou quasi-totale.",
            rateCriteria: { 
              low: "Dépendance majeure avec nécessité d'une tierce personne pour la plupart des actes de la vie quotidienne.", 
              high: "Dépendance totale, confinement au lit ou au fauteuil, complications chroniques (infections récurrentes, ulcères), espérance de vie réduite."
            } 
          },
        ]
      },
      {
        name: "Brûlures de Localisations Spécifiques",
        injuries: [
          { 
            name: "Brûlures du visage et du cou avec cicatrices défigurantes", 
            searchTerms: ["brûlures visage cou avec cicatrices défigurantes", "défigurantes cicatrices avec cou visage brûlures", "brûlures visage cou cicatrices défigurantes", "brûlures visage", "visage cou"], rate: [20, 50], 
            description: "Séquelles de brûlures du visage entraînant un préjudice esthétique majeur, des rétractions et/ou des troubles fonctionnels (ouverture buccale, occlusion palpébrale, etc.).",
            rateCriteria: { 
              low: "Cicatrices faciales visibles mais sans rétraction majeure, pas de trouble fonctionnel significatif (paupières, bouche).", 
              medium: "Cicatrices défigurantes avec rétraction modérée (ectropion léger, microstomie partielle), retentissement psychologique notable.",
              high: "Défiguration majeure avec séquelles fonctionnelles sévères (ectropion/entropion sévère, microstomie invalidante, sténose nasale), alopécie du cuir chevelu, retentissement psycho-social majeur."
            } 
          },
          { 
            name: "Brûlures des mains avec séquelles fonctionnelles (Main Dominante)", 
            searchTerms: ["brûlures des mains avec séquelles fonctionnelles main dominante", "dominante main fonctionnelles séquelles avec mains des brûlures", "brûlures mains séquelles fonctionnelles main dominante", "brûlures des", "des mains"], rate: [20, 60], 
            description: "Séquelles de brûlures profondes de la main dominante avec rétractions cutanées, raideurs digitales et perte de fonction.",
            rateCriteria: { 
              low: "Cicatrices hypertrophiques palmaires ou dorsales avec raideur légère d'un ou deux doigts, perte fonctionnelle < 30%.", 
              medium: "Rétractions majeures avec raideur sévère de plusieurs doigts, main en griffe partielle, perte de la pince pouce-index, perte fonctionnelle 40-60%.",
              high: "Main figée en griffe totale ou perte de plusieurs doigts par nécrose, amputations, main quasi-inutilisable (perte fonctionnelle > 70%)."
            } 
          },
          { 
            name: "Brûlures des mains avec séquelles fonctionnelles (Main Non Dominante)", 
            searchTerms: ["brûlures des mains avec séquelles fonctionnelles main non dominante", "dominante non main fonctionnelles séquelles avec mains des brûlures", "brûlures mains séquelles fonctionnelles main non dominante", "brûlures des", "des mains"], rate: [15, 50], 
            description: "Séquelles de brûlures de la main non dominante.",
            rateCriteria: { 
              low: "Cicatrices avec raideur légère, perte fonctionnelle < 30%.", 
              medium: "Rétractions avec raideur sévère, perte fonctionnelle 40-60%.",
              high: "Main figée ou amputations multiples, perte fonctionnelle > 70%."
            } 
          },
          { 
            name: "Brûlures du périnée avec séquelles fonctionnelles et/ou esthétiques", 
            searchTerms: ["brûlures périnée avec séquelles fonctionnelles et/ou esthétiques", "esthétiques et/ou fonctionnelles séquelles avec périnée brûlures", "brûlures périnée séquelles fonctionnelles et/ou esthétiques", "brûlures périnée", "périnée avec"], rate: [20, 50], 
            description: "Séquelles de brûlures périnéales avec retentissement sur la miction, la défécation et/ou la fonction sexuelle.",
            rateCriteria: { 
              low: "Cicatrices périnéales avec dyspareunie modérée ou gêne urinaire légère, sans trouble sphinctérien.", 
              medium: "Sténose urétrale ou anale post-brûlure nécessitant des dilatations régulières, dyspareunie sévère ou impotence.",
              high: "Séquelles majeures avec sténose urétrale ou anale serrée nécessitant une stomie (colostomie, uréthrostomie), troubles sphinctériens invalidants, impotence totale."
            } 
          },
        ]
      }
    ]
  },
  {
    name: "Maladies Professionnelles Indemnisables",
    subcategories: [
      {
        name: "Maladies Pulmonaires Professionnelles",
        injuries: [
          { 
            name: "Silicose pulmonaire", 
            searchTerms: ["silicose pulmonaire", "silicose poumon"], rate: [20, 100], 
            description: "Pneumoconiose par inhalation de poussières de silice cristalline (mines, carrières, fonderies, BTP). Indemnisable selon l'exposition professionnelle documentée.",
            rateCriteria: { 
              low: "Silicose simple (stade 1) avec images radiologiques isolées (nodules < 10mm), sans retentissement fonctionnel respiratoire (VEMS > 80%).", 
              medium: "Silicose compliquée (stade 2-3) avec fibrose pulmonaire progressive massive (FPM), dyspnée d'effort modérée (VEMS 50-80%), limitation des activités.",
              high: "Silicose compliquée avec insuffisance respiratoire chronique sévère (VEMS < 50%), dyspnée de repos, OLD, complications (tuberculose, néoplasie), confinement."
            } 
          },
          { 
            name: "Asbestose pulmonaire", 
            searchTerms: ["asbestose pulmonaire", "asbestose poumon"], rate: [30, 100], 
            description: "Fibrose pulmonaire due à l'inhalation de fibres d'amiante. Maladie professionnelle indemnisable (tableau 30).",
            rateCriteria: { 
              low: "Asbestose mineure avec fibrose débutante (stades 0-1 OIT), plaques pleurales, dyspnée d'effort importante (VEMS 60-80%).", 
              medium: "Asbestose modérée (stade 2 OIT) avec fibrose interstitielle diffuse, dyspnée au moindre effort (VEMS 40-60%), OLD de déambulation.",
              high: "Asbestose sévère (stade 3-4 OIT) avec insuffisance respiratoire chronique terminale (VEMS < 40%), OLD permanente, confinement, espérance de vie réduite."
            } 
          },
          { 
            name: "Mésothéliome pleural malin lié à l'amiante", 
            searchTerms: ["mésothéliome pleural malin lié l'amiante", "l'amiante lié malin pleural mésothéliome", "mésothéliome pleural", "pleural malin", "malin lié"], rate: 100, 
            description: "Cancer de la plèvre causé par l'exposition à l'amiante. Maladie professionnelle indemnisable (tableau 30bis). Pronostic sombre avec espérance de vie limitée."
          },
        ]
      },
      {
        name: "Troubles Musculo-Squelettiques (TMS) Professionnels",
        injuries: [
          { 
            name: "Syndrome du canal carpien professionnel bilatéral", 
            searchTerms: ["syndrome canal carpien professionnel bilatéral", "bilatéral professionnel carpien canal syndrome", "syndrome canal", "canal carpien", "carpien professionnel"], rate: [10, 30], 
            description: "Compression bilatérale du nerf médian au poignet, liée à des gestes répétitifs professionnels (tableaux 57). Indemnisable si lien professionnel documenté.",
            rateCriteria: { 
              low: "Syndrome du canal carpien bilatéral opéré avec bonne récupération, paresthésies nocturnes résiduelles discrètes, reprise du travail possible.", 
              medium: "Séquelles sensitives bilatérales modérées avec hypoesthésie permanente des trois premiers doigts, gêne pour les gestes fins, limitation professionnelle.",
              high: "Syndrome du canal carpien bilatéral sévère avec amyotrophie thénarienne bilatérale, déficit moteur permanent, incapacité pour le travail manuel."
            } 
          },
          { 
            name: "Tendinopathie de la coiffe des rotateurs professionnelle", 
            searchTerms: ["tendinopathie coiffe des rotateurs professionnelle", "professionnelle rotateurs des coiffe tendinopathie", "tendinopathie coiffe rotateurs professionnelle", "tendinopathie coiffe", "coiffe des"], rate: [10, 30], 
            description: "Tendinopathie de l'épaule (sus-épineux, sous-épineux) liée à des gestes professionnels répétitifs en élévation du bras. Indemnisable (tableau 57).",
            rateCriteria: { 
              low: "Tendinopathie chronique avec douleurs mécaniques à l'effort, limitation modérée de l'abduction (120-150°), traitement conservateur.", 
              medium: "Rupture partielle de la coiffe avec douleurs fréquentes, perte de force, limitation de l'abduction à 90°, échec du traitement conservateur.",
              high: "Rupture massive et irréparable de la coiffe des rotateurs avec épaule pseudo-paralytique, douleurs chroniques rebelles, incapacité pour le travail avec port de charges."
            } 
          },
          { 
            name: "Épicondylite latérale professionnelle", 
            searchTerms: ["épicondylite latérale professionnelle", "professionnelle latérale épicondylite", "épicondylite latérale", "latérale professionnelle"], rate: [5, 15], 
            description: "Tendinopathie des épicondyliens latéraux du coude (tennis elbow) liée à des gestes professionnels répétitifs de préhension et supination. Indemnisable (tableau 57).",
            rateCriteria: { 
              low: "Épicondylite chronique avec douleurs occasionnelles à l'effort de préhension, bien contrôlées par le repos et le traitement.", 
              medium: "Douleurs fréquentes et invalidantes malgré le traitement médical et la kinésithérapie, gêne pour les gestes de préhension et de serrage, limitation professionnelle.",
              high: "Épicondylite rebelle avec douleurs permanentes malgré les infiltrations et/ou échec chirurgical, incapacité pour tout travail manuel nécessitant de la force de préhension."
            } 
          },
        ]
      },
      {
        name: "Maladies Cutanées Professionnelles",
        injuries: [
          { 
            name: "Eczéma de contact professionnel chronique", 
            searchTerms: ["eczéma contact professionnel chronique", "chronique professionnel contact eczéma", "eczéma contact", "contact professionnel", "professionnel chronique"], rate: [5, 20], 
            description: "Dermatite allergique de contact liée à une exposition professionnelle à des allergènes (métaux, résines, latex, etc.). Indemnisable selon tableau.",
            rateCriteria: { 
              low: "Eczéma localisé aux mains, bien contrôlé par éviction de l'allergène et traitement local, pas de limitation professionnelle majeure.", 
              medium: "Eczéma chronique récidivant malgré l'éviction partielle, nécessitant un traitement au long cours, limitation de certaines activités professionnelles.",
              high: "Eczéma généralisé et invalidant, rebelle au traitement, nécessitant un changement de poste ou une reconversion professionnelle."
            } 
          },
        ]
      }
    ]
  },
  {
    name: "Séquelles Endocriniennes et Métaboliques",
    subcategories: [
      {
        name: "Diabète Post-Traumatique",
        injuries: [
          { 
            name: "Diabète post-traumatique ou post-pancréatique - Type 1 (insulinodépendant)", 
            searchTerms: ["diabète post traumatique post pancréatique type insulinodépendant", "insulinodépendant type pancréatique post traumatique post diabète", "diabète post", "post traumatique", "traumatique post"], rate: [30, 60], 
            description: "Diabète de type 1 survenu après un traumatisme pancréatique grave (pancréatectomie partielle ou totale, pancréatite nécrosante).",
            rateCriteria: { 
              low: "Diabète bien équilibré par insulinothérapie (HbA1c < 7%), sans complication micro ou macrovasculaire, autonomie conservée pour les injections et l'autosurveillance.", 
              medium: "Diabète avec équilibre fragile (HbA1c 7-9%), hypoglycémies fréquentes ou hyperglycémies récurrentes, début de complications microvasculaires (rétinopathie non proliférante, microalbuminurie).",
              high: "Diabète instable avec complications sévères (rétinopathie proliférante, néphropathie avec insuffisance rénale, neuropathie invalidante, artériopathie), hypoglycémies sévères fréquentes."
            } 
          },
          { 
            name: "Diabète post-traumatique - Type 2 (non insulinodépendant)", 
            searchTerms: ["diabète post traumatique type non insulinodépendant", "insulinodépendant non type traumatique post diabète", "diabète post", "post traumatique", "traumatique type"], rate: [10, 30], 
            description: "Diabète de type 2 apparu ou décompensé de façon certaine après un traumatisme grave ou une corticothérapie au long cours.",
            rateCriteria: { 
              low: "Diabète bien contrôlé par régime et antidiabétiques oraux (HbA1c < 7%), sans complication.", 
              medium: "Diabète nécessitant une insulinothérapie, équilibre modéré (HbA1c 7-8%), début de complications.",
              high: "Diabète compliqué (rétinopathie, néphropathie, neuropathie, artériopathie), équilibre difficile."
            } 
          },
        ]
      },
      {
        name: "Troubles Thyroïdiens",
        injuries: [
          { 
            name: "Hypothyroïdie post-traumatique ou post-radiothérapie", 
            searchTerms: ["hypothyroïdie post traumatique post radiothérapie", "radiothérapie post traumatique post hypothyroïdie", "hypothyroïdie post", "post traumatique", "traumatique post"], rate: [10, 25], 
            description: "Insuffisance thyroïdienne apparue après un traumatisme cervical grave, une chirurgie thyroïdienne ou une radiothérapie cervicale.",
            rateCriteria: { 
              low: "Hypothyroïdie bien substituée par lévothyroxine, asymptomatique, TSH normalisée.", 
              medium: "Hypothyroïdie avec difficulté d'équilibration, symptômes résiduels (asthénie, frilosité, prise de poids) malgré le traitement.",
              high: "Hypothyroïdie sévère avec complications (myxœdème, insuffisance cardiaque), équilibre difficile, nécessité de doses élevées de substitution."
            } 
          },
          { 
            name: "Hyperthyroïdie post-traumatique (maladie de Basedow ou nodule toxique)", 
            searchTerms: ["hyperthyroïdie post traumatique maladie basedow nodule toxique", "toxique nodule basedow maladie traumatique post hyperthyroïdie", "hyperthyroïdie post", "post traumatique", "traumatique maladie"], rate: [15, 35], 
            description: "Hyperthyroïdie apparue après un traumatisme cervical ou un stress important.",
            rateCriteria: { 
              low: "Hyperthyroïdie contrôlée par antithyroïdiens de synthèse, rémission stable.", 
              medium: "Hyperthyroïdie nécessitant un traitement chirurgical (thyroïdectomie) ou une iode radioactif, avec hypothyroïdie secondaire bien substituée.",
              high: "Hyperthyroïdie compliquée (ophtalmopathie basedowienne sévère, cardiothyréose avec fibrillation auriculaire, amaigrissement majeur), rebelle au traitement médical."
            } 
          },
        ]
      },
      {
        name: "Troubles des Glandes Surrénales",
        injuries: [
          { 
            name: "Insuffisance surrénalienne post-traumatique (maladie d'Addison secondaire)", 
            searchTerms: ["insuffisance surrénalienne post traumatique maladie d'addison secondaire", "secondaire d'addison maladie traumatique post surrénalienne insuffisance", "insuffisance surrénalienne", "surrénalienne post", "post traumatique"], rate: [40, 70], 
            description: "Insuffisance surrénalienne après un traumatisme crânien avec atteinte hypophysaire, une hémorragie surrénalienne bilatérale ou une corticothérapie prolongée.",
            rateCriteria: { 
              low: "Insuffisance surrénalienne bien substituée (hydrocortisone + fludrocortisone), vie normale sous traitement, pas de crise aiguë.", 
              medium: "Insuffisance surrénalienne avec crises d'insuffisance surrénalienne aiguë occasionnelles malgré le traitement, nécessité d'augmentation des doses en cas de stress.",
              high: "Insuffisance surrénalienne sévère avec crises fréquentes, décompensations à répétition nécessitant des hospitalisations, retentissement majeur sur la qualité de vie."
            } 
          },
        ]
      }
    ]
  },
  {
    name: "Séquelles de Maladies Infectieuses Post-Traumatiques",
    subcategories: [
      {
        name: "Infections Osseuses et Articulaires",
        injuries: [
          { 
            name: "Ostéomyélite chronique post-traumatique", 
            searchTerms: ["ostéomyélite chronique post traumatique", "traumatique post chronique ostéomyélite", "ostéomyélite chronique", "chronique post", "post traumatique"], rate: [20, 60], 
            description: "Infection chronique de l'os après une fracture ouverte, une intervention chirurgicale ou une contamination traumatique.",
            rateCriteria: { 
              low: "Ostéomyélite en rémission après traitement antibiotique prolongé et chirurgie d'assainissement, séquelles fonctionnelles modérées (raideur, douleurs occasionnelles).", 
              medium: "Ostéomyélite chronique récidivante avec épisodes de réactivation, nécessitant des antibiothérapies prolongées et/ou des reprises chirurgicales, fistules cutanées intermittentes.",
              high: "Ostéomyélite chronique rebelle avec fistules permanentes, ostéolyse extensive, nécessité d'une amputation ou d'une arthrodèse, invalidité majeure."
            } 
          },
          { 
            name: "Arthrite septique chronique post-traumatique", 
            searchTerms: ["arthrite septique chronique post traumatique", "traumatique post chronique septique arthrite", "arthrite septique", "septique chronique", "chronique post"], rate: [25, 70], 
            description: "Infection articulaire chronique après un traumatisme articulaire ouvert, une fracture articulaire ou une chirurgie.",
            rateCriteria: { 
              low: "Arthrite guérie après traitement, arthrose post-infectieuse modérée, mobilité articulaire conservée > 50%.", 
              medium: "Arthrose post-infectieuse sévère avec douleurs chroniques, raideur articulaire majeure, mobilité < 50%.",
              high: "Destruction articulaire complète nécessitant une arthrodèse ou une arthroplastie (prothèse), ou ankylose en mauvaise position, invalidité majeure."
            } 
          },
        ]
      },
      {
        name: "Infections des Parties Molles",
        injuries: [
          { 
            name: "Fasciite nécrosante séquellaire", 
            searchTerms: ["fasciite nécrosante séquellaire", "séquellaire nécrosante fasciite", "fasciite nécrosante", "nécrosante séquellaire"], rate: [30, 80], 
            description: "Séquelles d'une infection nécrosante sévère des tissus mous (fascia, muscles) ayant nécessité une chirurgie extensive (débridements larges, amputations).",
            rateCriteria: { 
              low: "Séquelles cicatricielles étendues avec raideurs articulaires modérées et troubles trophiques, nécessité de greffes cutanées.", 
              medium: "Pertes de substance majeures avec séquelles fonctionnelles sévères (amputation partielle, raideurs articulaires majeures), douleurs chroniques neuropathiques.",
              high: "Amputation de membre, polyhandicap avec dépendance partielle ou totale, complications chroniques (insuffisance rénale post-syndrome de choc toxique)."
            } 
          },
        ]
      },
      {
        name: "Tétanos",
        injuries: [
          { 
            name: "Séquelles de tétanos post-traumatique", 
            searchTerms: ["séquelles tétanos post traumatique", "traumatique post tétanos séquelles", "séquelles tétanos", "tétanos post", "post traumatique"], rate: [20, 80], 
            description: "Séquelles neurologiques, musculaires ou respiratoires après un tétanos survenu sur une plaie traumatique.",
            rateCriteria: { 
              low: "Séquelles mineures : raideurs musculaires résiduelles, douleurs chroniques, sans limitation fonctionnelle majeure.", 
              medium: "Séquelles modérées : faiblesse musculaire persistante, troubles de la déglutition, dyspnée d'effort par séquelles respiratoires.",
              high: "Séquelles sévères : tétraparésie spastique, dépendance respiratoire (trachéotomie, ventilation), troubles de la déglutition sévères (gastrostomie), état végétatif ou pauci-relationnel."
            } 
          },
        ]
      }
    ]
  },
  {
    name: "Séquelles Hématologiques",
    subcategories: [
      {
        name: "Anémie Post-Traumatique",
        injuries: [
          { 
            name: "Anémie chronique post-hémorragique sévère", 
            searchTerms: ["anémie chronique post hémorragique sévère", "sévère hémorragique post chronique anémie", "anémie chronique", "chronique post", "post hémorragique"], rate: [10, 40], 
            description: "Anémie chronique persistante après un traumatisme avec hémorragie massive, ou après splénectomie.",
            rateCriteria: { 
              low: "Anémie modérée (Hb 10-12 g/dL) bien compensée, asymptomatique ou asthénie légère, pas de nécessité de transfusions.", 
              medium: "Anémie modérée à sévère (Hb 8-10 g/dL) avec asthénie marquée, dyspnée d'effort, nécessité de supplémentation martiale au long cours.",
              high: "Anémie sévère (Hb < 8 g/dL) réfractaire au traitement, nécessité de transfusions régulières, dyspnée au moindre effort, retentissement cardiaque."
            } 
          },
        ]
      },
      {
        name: "Troubles de la Coagulation",
        injuries: [
          { 
            name: "Syndrome hémorragique post-traumatique (coagulopathie de consommation séquellaire)", 
            searchTerms: ["syndrome hémorragique post traumatique coagulopathie consommation séquellaire", "séquellaire consommation coagulopathie traumatique post hémorragique syndrome", "syndrome hémorragique", "hémorragique post", "post traumatique"], rate: [30, 60], 
            description: "Troubles de la coagulation persistants après un traumatisme grave avec coagulopathie de consommation (CIVD), ou après transfusions massives.",
            rateCriteria: { 
              low: "Troubles mineurs de la coagulation avec risque hémorragique modéré, nécessité d'éviter certains traitements (anti-agrégants, anticoagulants).", 
              medium: "Syndrome hémorragique modéré avec hémorragies spontanées occasionnelles (épistaxis, ecchymoses), nécessité de traitement substitutif ponctuel.",
              high: "Syndrome hémorragique sévère avec hémorragies spontanées fréquentes et graves (digestives, cérébrales), nécessité de transfusions régulières de plasma ou de facteurs de coagulation."
            } 
          },
        ]
      }
    ]
  },
  {
    name: "Séquelles Dermatologiques Étendues",
    subcategories: [
      {
        name: "Cicatrices Chéloïdes et Hypertrophiques",
        injuries: [
          { 
            name: "Cicatrice vicieuse thorax antérieur", 
            searchTerms: ["cicatrice vicieuse thorax antérieur", "thorax antérieur cicatrice vicieuse", "cicatrice thorax", "thorax antérieur", "vicieuse thorax"], 
            rate: [3, 15], 
            description: "Cicatrice chéloïde ou rétractile de la face antérieure du thorax avec adhérences aux plans profonds et gêne esthétique.",
            rateCriteria: { 
              low: "Cicatrice localisée (< 5 cm), souple, peu adhérente, gêne esthétique minime.", 
              medium: "Cicatrice étendue (5-10 cm), adhérente aux plans profonds, prurit modéré, gêne esthétique notable.",
              high: "Cicatrice large (> 10 cm), fortement adhérente, rétractile, douloureuse, retentissement esthétique et psychologique majeur."
            } 
          },
          { 
            name: "Cicatrices chéloïdes multiples étendues", 
            searchTerms: ["cicatrices chéloïdes multiples étendues", "étendues multiples chéloïdes cicatrices", "cicatrices chéloïdes", "chéloïdes multiples", "multiples étendues"], rate: [10, 40], 
            description: "Cicatrices chéloïdes (prolifération excessive de tissu cicatriciel) étendues et invalidantes, sur plusieurs zones du corps.",
            rateCriteria: { 
              low: "Cicatrices chéloïdes localisées, gêne esthétique et prurit modérés, réponse partielle au traitement (corticoïdes locaux, compression).", 
              medium: "Cicatrices chéloïdes étendues avec prurit intense, douleurs, rétraction limitant les mouvements articulaires.",
              high: "Cicatrices chéloïdes majeures et défigurantes, rebelles à tous les traitements (chirurgie, laser, radiothérapie), retentissement psychologique majeur."
            } 
          },
        ]
      },
      {
        name: "Troubles Pigmentaires Post-Traumatiques",
        injuries: [
          { 
            name: "Vitiligo post-traumatique étendu", 
            searchTerms: ["vitiligo post traumatique étendu", "étendu traumatique post vitiligo", "vitiligo post", "post traumatique", "traumatique étendu"], rate: [5, 20], 
            description: "Dépigmentation cutanée (vitiligo) apparue après un traumatisme cutané sévère (brûlure, dermabrasion extensive).",
            rateCriteria: { 
              low: "Vitiligo localisé (< 10% de la surface corporelle), zones couvertes, pas de retentissement psychologique majeur.", 
              medium: "Vitiligo étendu (10-30%) touchant des zones visibles (visage, mains), retentissement esthétique et psychologique.",
              high: "Vitiligo généralisé (> 30%) avec atteinte du visage et des mains, retentissement psycho-social majeur, échec des traitements de repigmentation."
            } 
          },
        ]
      }
    ]
  },
  {
    name: "Séquelles Obstétricales et Gynécologiques Post-Traumatiques",
    subcategories: [
      {
        name: "Traumatismes Obstétricaux",
        injuries: [
          { 
            name: "Déchirure périnéale complète (3e ou 4e degré) post-accouchement traumatique", 
            searchTerms: ["déchirure périnéale complète degré post accouchement traumatique", "traumatique accouchement post degré complète périnéale déchirure", "déchirure périnéale", "périnéale complète", "complète degré"], rate: [15, 40], 
            description: "Déchirure périnéale sévère avec atteinte du sphincter anal (3e degré) ou de la muqueuse rectale (4e degré) lors d'un accouchement difficile.",
            rateCriteria: { 
              low: "Déchirure réparée chirurgicalement avec bonne cicatrisation, continence anale et fécale conservée, dyspareunie légère.", 
              medium: "Séquelles avec incontinence anale aux gaz et/ou selles liquides, dyspareunie modérée à sévère, nécessité d'adaptations (protections).",
              high: "Incontinence fécale complète (gaz et selles solides), fistule recto-vaginale persistante, dyspareunie intolérable, retentissement psycho-social majeur."
            } 
          },
          { 
            name: "Prolapsus génital post-traumatique sévère", 
            searchTerms: ["prolapsus génital post traumatique sévère", "sévère traumatique post génital prolapsus", "prolapsus génital", "génital post", "post traumatique"], rate: [20, 40], 
            description: "Descente d'organes pelviens (vessie, utérus, rectum) après un accouchement difficile ou un traumatisme pelvien.",
            rateCriteria: { 
              low: "Prolapsus de stade II (descente jusqu'à l'orifice vaginal), gêne modérée, amélioré par la rééducation périnéale.", 
              medium: "Prolapsus de stade III (extériorisation partielle), nécessité d'un pessaire ou d'une chirurgie, incontinence urinaire d'effort associée.",
              high: "Prolapsus de stade IV (extériorisation complète), échec chirurgical ou récidive, incontinence urinaire et/ou fécale majeure, retentissement majeur sur la qualité de vie."
            } 
          },
        ]
      }
    ]
  },
  {
    name: "Amputations Multiples et Polyhandicap",
    subcategories: [
      {
        name: "Amputations Multiples",
        injuries: [
          { 
            name: "Amputation de deux membres supérieurs", 
            searchTerms: ["amputation deux membres supérieurs", "supérieurs membres deux amputation", "amputation deux", "deux membres", "membres supérieurs"], rate: 100, 
            description: "Perte des deux membres supérieurs (bras, avant-bras ou mains), entraînant une dépendance totale pour les actes de la vie quotidienne."
          },
          { 
            name: "Amputation de deux membres inférieurs", 
            searchTerms: ["amputation deux membres inférieurs", "inférieurs membres deux amputation", "amputation deux", "deux membres", "membres inférieurs"], rate: 100, 
            description: "Perte des deux membres inférieurs (cuisses, jambes ou pieds), entraînant une impossibilité de marcher et une dépendance en fauteuil roulant."
          },
          { 
            name: "Amputation d'un membre supérieur et d'un membre inférieur", 
            searchTerms: ["amputation d'un membre supérieur d'un membre inférieur", "inférieur membre d'un supérieur membre d'un amputation", "amputation d'un", "d'un membre", "membre supérieur"], rate: 100, 
            description: "Amputation d'un bras (ou avant-bras/main) et d'une jambe (ou cuisse/pied), polyhandicap majeur."
          },
          { 
            name: "Amputation de trois membres", 
            searchTerms: ["amputation trois membres", "membres trois amputation", "amputation trois", "trois membres"], rate: 100, 
            description: "Perte de trois membres (combinaison de membres supérieurs et inférieurs), dépendance totale."
          },
          { 
            name: "Amputation des quatre membres (tétra-amputation)", 
            searchTerms: ["amputation des quatre membres tétra amputation", "amputation tétra membres quatre des amputation", "amputation quatre membres tétra amputation", "amputation des", "des quatre"], rate: 100, 
            description: "Perte des quatre membres, dépendance absolue pour tous les actes de la vie quotidienne."
          },
        ]
      }
    ]
  },
  {
    name: "Séquelles Psychiatriques Sévères et Spécifiques",
    subcategories: [
      {
        name: "Psychose Post-Traumatique",
        injuries: [
          { 
            name: "Psychose hallucinatoire chronique post-traumatique", 
            searchTerms: ["psychose hallucinatoire chronique post traumatique", "traumatique post chronique hallucinatoire psychose", "psychose hallucinatoire", "hallucinatoire chronique", "chronique post"], rate: [50, 80], 
            description: "Psychose avec hallucinations (auditives, visuelles) et délire chronique apparue après un traumatisme crânien grave.",
            rateCriteria: { 
              low: "Psychose stabilisée par un traitement antipsychotique, hallucinations rares et non angoissantes, maintien d'une vie sociale minimale.", 
              medium: "Psychose avec hallucinations fréquentes et délire, nécessitant un traitement antipsychotique au long cours, retentissement socio-professionnel majeur, isolement social.",
              high: "Psychose chronique sévère avec hallucinations permanentes et délire structuré, résistance au traitement, dangerosité pour soi ou autrui, nécessité d'hospitalisations répétées, perte d'autonomie."
            } 
          },
          { 
            name: "Schizophrénie post-traumatique", 
            searchTerms: ["schizophrénie post traumatique", "traumatique post schizophrénie", "schizophrénie post", "post traumatique"], rate: [60, 100], 
            description: "Schizophrénie déclenchée par un traumatisme crânien grave ou un stress post-traumatique majeur.",
            rateCriteria: { 
              low: "Schizophrénie paranoïde avec symptômes positifs (délire) contrôlés par le traitement, autonomie partielle conservée.", 
              medium: "Schizophrénie avec symptômes négatifs majeurs (apathie, retrait social, aboulie), dépendance partielle pour les actes de la vie quotidienne.",
              high: "Schizophrénie désorganisée ou catatonique, syndrome déficitaire sévère, dépendance totale, institutionnalisation."
            } 
          },
        ]
      },
      {
        name: "Dépression et Troubles de l'Humeur",
        injuries: [
          { 
            name: "Dépression majeure post-traumatique chronique résistante", 
            searchTerms: ["dépression majeure post traumatique chronique résistante", "résistante chronique traumatique post majeure dépression", "dépression majeure", "majeure post", "post traumatique"], rate: [30, 70], 
            description: "Dépression sévère et persistante après un traumatisme grave, résistante aux traitements antidépresseurs.",
            rateCriteria: { 
              low: "Dépression majeure avec épisodes récurrents, répondant partiellement aux antidépresseurs, retentissement socio-professionnel modéré.", 
              medium: "Dépression résistante nécessitant des antidépresseurs + thymorégulateurs ou antipsychotiques, désinsertion professionnelle, tentatives de suicide antérieures.",
              high: "Dépression mélancolique sévère avec risque suicidaire élevé, dépendance pour les actes de la vie quotidienne, hospitalisations prolongées ou répétées, échec de l'électroconvulsivothérapie (ECT)."
            } 
          },
          { 
            name: "Trouble bipolaire post-traumatique", 
            searchTerms: ["trouble bipolaire post traumatique", "traumatique post bipolaire trouble", "trouble bipolaire", "bipolaire post", "post traumatique"], rate: [40, 80], 
            description: "Trouble de l'humeur avec alternance d'épisodes maniaques et dépressifs, déclenché par un traumatisme crânien ou un stress post-traumatique.",
            rateCriteria: { 
              low: "Trouble bipolaire de type II (hypomanie) bien contrôlé par un thymorégulateur, épisodes rares et peu sévères.", 
              medium: "Trouble bipolaire de type I avec épisodes maniaques et dépressifs fréquents, nécessitant une poly-médication, hospitalisations occasionnelles.",
              high: "Trouble bipolaire sévère avec cycles rapides, résistance au traitement, hospitalisations fréquentes, mise en danger de soi ou d'autrui lors des épisodes maniaques, désinsertion socio-professionnelle totale."
            } 
          },
        ]
      },
      {
        name: "Troubles Anxieux Sévères",
        injuries: [
          { 
            name: "Trouble obsessionnel-compulsif (TOC) post-traumatique invalidant", 
            searchTerms: ["trouble obsessionnel compulsif toc post traumatique invalidant", "invalidant traumatique post toc compulsif obsessionnel trouble", "trouble obsessionnel", "obsessionnel compulsif", "compulsif toc"], rate: [20, 60], 
            description: "TOC sévère avec obsessions et compulsions envahissantes, apparu ou aggravé de façon certaine après un traumatisme.",
            rateCriteria: { 
              low: "TOC avec obsessions et compulsions quotidiennes mais contrôlées par le traitement (ISRS + TCC), retentissement modéré sur la vie quotidienne (perte de temps < 3h/jour).", 
              medium: "TOC sévère avec rituels chronophages (> 3h/jour), retentissement majeur sur la vie socio-professionnelle, désinsertion partielle.",
              high: "TOC très sévère avec rituels quasi-permanents, impossibilité de sortir du domicile, dépendance pour les actes de la vie quotidienne, résistance au traitement médical et à la TCC."
            } 
          },
          { 
            name: "Trouble panique avec agoraphobie post-traumatique sévère", 
            searchTerms: ["trouble panique avec agoraphobie post traumatique sévère", "sévère traumatique post agoraphobie avec panique trouble", "trouble panique agoraphobie post traumatique sévère", "trouble panique", "panique avec"], rate: [20, 50], 
            description: "Attaques de panique répétées avec évitement phobique sévère des lieux publics, apparues après un traumatisme.",
            rateCriteria: { 
              low: "Attaques de panique occasionnelles, agoraphobie modérée (évitement de certaines situations), réponse partielle au traitement (ISRS + TCC).", 
              medium: "Attaques de panique fréquentes, agoraphobie sévère avec impossibilité de sortir seul(e), retentissement socio-professionnel majeur.",
              high: "Attaques de panique quasi-quotidiennes, agoraphobie totale avec confinement au domicile, dépendance pour les sorties, résistance au traitement, dépression associée."
            } 
          },
        ]
      }
    ]
  },
  // ========================================
  // LÉSIONS SUPPLÉMENTAIRES - BARÈME COMPLET AT-MP
  // Ajouté automatiquement le 04/11/2025
  // ========================================

  // SECTION: Troubles Endocriniens et Métaboliques
  
  {
  
    name: "Séquelles Endocriniennes et Métaboliques",
  
    subcategories: [
  
      {
  
        name: "Diabète Post-Traumatique",
  
        injuries: [
  
          { 
  
            name: "Diabète post-traumatique ou post-pancréatique - Type 1 (insulinodépendant)", 
  
            searchTerms: ["diabète post traumatique post pancréatique type insulinodépendant", "insulinodépendant type pancréatique post traumatique post diabète", "diabète post", "post traumatique", "traumatique post"], rate: [30, 60], 
  
            description: "Diabète de type 1 survenu après un traumatisme pancréatique grave (pancréatectomie partielle ou totale, pancréatite nécrosante).",
  
            rateCriteria: { 
  
              low: "Diabète bien équilibré par insulinothérapie (HbA1c < 7%), sans complication micro ou macrovasculaire, autonomie conservée pour les injections et l'autosurveillance.", 
  
              medium: "Diabète avec équilibre fragile (HbA1c 7-9%), hypoglycémies fréquentes ou hyperglycémies récurrentes, début de complications microvasculaires (rétinopathie non proliférante, microalbuminurie).",
  
              high: "Diabète instable avec complications sévères (rétinopathie proliférante, néphropathie avec insuffisance rénale, neuropathie invalidante, artériopathie), hypoglycémies sévères fréquentes."
  
            } 
  
          },
  
          { 
  
            name: "Diabète post-traumatique - Type 2 (non insulinodépendant)", 
  
            searchTerms: ["diabète post traumatique type non insulinodépendant", "insulinodépendant non type traumatique post diabète", "diabète post", "post traumatique", "traumatique type"], rate: [10, 30], 
  
            description: "Diabète de type 2 apparu ou décompensé de façon certaine après un traumatisme grave ou une corticothérapie au long cours.",
  
            rateCriteria: { 
  
              low: "Diabète bien contrôlé par régime et antidiabétiques oraux (HbA1c < 7%), sans complication.", 
  
              medium: "Diabète nécessitant une insulinothérapie, équilibre modéré (HbA1c 7-8%), début de complications.",
  
              high: "Diabète compliqué (rétinopathie, néphropathie, neuropathie, artériopathie), équilibre difficile."
  
            } 
  
          },
  
        ]
  
      }
  
    ]
  
  },

  // SECTION: Maladies Infectieuses Post-Traumatiques
  
  {
  
    name: "Séquelles de Maladies Infectieuses Post-Traumatiques",
  
    subcategories: [
  
      {
  
        name: "Infections Osseuses et Articulaires",
  
        injuries: [
  
          { 
  
            name: "Ostéomyélite chronique post-traumatique", 
  
            searchTerms: ["ostéomyélite chronique post traumatique", "traumatique post chronique ostéomyélite", "ostéomyélite chronique", "chronique post", "post traumatique"], rate: [20, 60], 
  
            description: "Infection chronique de l'os après une fracture ouverte, une intervention chirurgicale ou une contamination traumatique.",
  
            rateCriteria: { 
  
              low: "Ostéomyélite en rémission après traitement antibiotique prolongé et chirurgie d'assainissement, séquelles fonctionnelles modérées (raideur, douleurs occasionnelles).", 
  
              medium: "Ostéomyélite chronique récidivante avec épisodes de réactivation, nécessitant des antibiothérapies prolongées et/ou des reprises chirurgicales, fistules cutanées intermittentes.",
  
              high: "Ostéomyélite chronique rebelle avec fistules permanentes, ostéolyse extensive, nécessité d'une amputation ou d'une arthrodèse, invalidité majeure."
  
            } 
  
          },
  
          { 
  
            name: "Arthrite septique chronique post-traumatique", 
  
            searchTerms: ["arthrite septique chronique post traumatique", "traumatique post chronique septique arthrite", "arthrite septique", "septique chronique", "chronique post"], rate: [25, 70], 
  
            description: "Infection articulaire chronique après un traumatisme articulaire ouvert, une fracture articulaire ou une chirurgie.",
  
            rateCriteria: { 
  
              low: "Arthrite guérie après traitement, arthrose post-infectieuse modérée, mobilité articulaire conservée > 50%.", 
  
              medium: "Arthrose post-infectieuse sévère avec douleurs chroniques, raideur articulaire majeure, mobilité < 50%.",
  
              high: "Destruction articulaire complète nécessitant une arthrodèse ou une arthroplastie (prothèse), ou ankylose en mauvaise position, invalidité majeure."
  
            } 
  
          },
  
        ]
  
      }
  
    ]
  
  },

  // SECTION: Séquelles Hématologiques
  
  {
  
    name: "Séquelles Hématologiques",
  
    subcategories: [
  
      {
  
        name: "Anémie Post-Traumatique",
  
        injuries: [
  
          { 
  
            name: "Anémie chronique post-hémorragique sévère", 
  
            searchTerms: ["anémie chronique post hémorragique sévère", "sévère hémorragique post chronique anémie", "anémie chronique", "chronique post", "post hémorragique"], rate: [10, 40], 
  
            description: "Anémie chronique persistante après un traumatisme avec hémorragie massive, ou après splénectomie.",
  
            rateCriteria: { 
  
              low: "Anémie modérée (Hb 10-12 g/dL) bien compensée, asympomatique ou asthénie légère, pas de nécessité de transfusions.", 
  
              medium: "Anémie modérée à sévère (Hb 8-10 g/dL) avec asthénie marquée, dyspnée d'effort, nécessité de supplémentation martiale au long cours.",
  
              high: "Anémie sévère (Hb < 8 g/dL) réfractaire au traitement, nécessité de transfusions régulières, dyspnée au moindre effort, retentissement cardiaque."
  
            } 
  
          },
  
        ]
  
      }
  
    ]
  
  },

  // SECTION: Séquelles Dermatologiques Étendues
  
  {
  
    name: "Séquelles Dermatologiques Étendues",
  
    subcategories: [
  
      {
  
        name: "Cicatrices Chéloïdes et Hypertrophiques",
  
        injuries: [
  
          { 
  
            name: "Cicatrices chéloïdes multiples étendues", 
  
            searchTerms: ["cicatrices chéloïdes multiples étendues", "étendues multiples chéloïdes cicatrices", "cicatrices chéloïdes", "chéloïdes multiples", "multiples étendues"], rate: [10, 40], 
  
            description: "Cicatrices chéloïdes (prolifération excessive de tissu cicatriciel) étendues et invalidantes, sur plusieurs zones du corps.",
  
            rateCriteria: { 
  
              low: "Cicatrices chéloïdes localisées, gêne esthétique et prurit modérés, réponse partielle au traitement (corticoïdes locaux, compression).", 
  
              medium: "Cicatrices chéloïdes étendues avec prurit intense, douleurs, rétraction limitant les mouvements articulaires.",
  
              high: "Cicatrices chéloïdes majeures et défigurantes, rebelles à tous les traitements (chirurgie, laser, radiothérapie), retentissement psychologique majeur."
  
            } 
  
          }
  
        ]
  
      }
  
    ]
  
  },

  // SECTION: Complications de la Grossesse et Séquelles Obstétricales
  
  {
  
    name: "Séquelles Obstétricales et Gynécologiques Post-Traumatiques",
  
    subcategories: [
  
      {
  
        name: "Traumatismes Obstétricaux",
  
        injuries: [
  
          { 
  
            name: "Déchirure périnéale complète (3e ou 4e degré) post-accouchement traumatique", 
  
            searchTerms: ["déchirure périnéale complète degré post accouchement traumatique", "traumatique accouchement post degré complète périnéale déchirure", "déchirure périnéale", "périnéale complète", "complète degré"], rate: [15, 40], 
  
            description: "Déchirure périnéale sévère avec atteinte du sphincter anal (3e degré) ou de la muqueuse rectale (4e degré) lors d'un accouchement difficile.",
  
            rateCriteria: { 
  
              low: "Déchirure réparée chirurgicalement avec bonne cicatrisation, continence anale et fécale conservée, dyspareunie légère.", 
  
              medium: "Séquelles avec incontinence anale aux gaz et/ou selles liquides, dyspareunie modérée à sévère, nécessité d'adaptations (protections).",
  
              high: "Incontinence fécale complète (gaz et selles solides), fistule recto-vaginale persistante, dyspareunie intolérable, retentissement psycho-social majeur."
  
            } 
  
          },
  
          { 
  
            name: "Prolapsus génital post-traumatique sévère", 
  
            searchTerms: ["prolapsus génital post traumatique sévère", "sévère traumatique post génital prolapsus", "prolapsus génital", "génital post", "post traumatique"], rate: [20, 40], 
  
            description: "Descente d'organes pelviens (vessie, utérus, rectum) après un accouchement difficile ou un traumatisme pelvien.",
  
            rateCriteria: { 
  
              low: "Prolapsus de stade II (descente jusqu'à l'orifice vaginal), gêne modérée, amélioré par la rééducation périnéale.", 
  
              medium: "Prolapsus de stade III (extériorisation partielle), nécessité d'un pessaire ou d'une chirurgie, incontinence urinaire d'effort associée.",
  
              high: "Prolapsus de stade IV (extériorisation complète), échec chirurgical ou récidive, incontinence urinaire et/ou fécale majeure, retentissement majeur sur la qualité de vie."
  
            } 
  
          },
  
        ]
  
      }
  
    ]
  
  },

  // SECTION: Amputations et Appareillages
  
  {
  
    name: "Amputations Multiples et Polyhandicap",
  
    subcategories: [
  
      {
  
        name: "Amputations Multiples",
  
        injuries: [
  
          { 
  
            name: "Amputation de deux membres supérieurs", 
  
            searchTerms: ["amputation deux membres supérieurs", "supérieurs membres deux amputation", "amputation deux", "deux membres", "membres supérieurs"], rate: 100, 
  
            description: "Perte des deux membres supérieurs (bras, avant-bras ou mains), entraînant une dépendance totale pour les actes de la vie quotidienne."
  
          },
  
          { 
  
            name: "Amputation de deux membres inférieurs", 
  
            searchTerms: ["amputation deux membres inférieurs", "inférieurs membres deux amputation", "amputation deux", "deux membres", "membres inférieurs"], rate: 100, 
  
            description: "Perte des deux membres inférieurs (cuisses, jambes ou pieds), entraînant une impossibilité de marcher et une dépendance en fauteuil roulant."
  
          },
  
          { 
  
            name: "Amputation d'un membre supérieur et d'un membre inférieur", 
  
            searchTerms: ["amputation d'un membre supérieur d'un membre inférieur", "inférieur membre d'un supérieur membre d'un amputation", "amputation d'un", "d'un membre", "membre supérieur"], rate: 100, 
  
            description: "Amputation d'un bras (ou avant-bras/main) et d'une jambe (ou cuisse/pied), polyhandicap majeur."
  
          },
  
          { 
  
            name: "Amputation de trois membres", 
  
            searchTerms: ["amputation trois membres", "membres trois amputation", "amputation trois", "trois membres"], rate: 100, 
  
            description: "Perte de trois membres (combinaison de membres supérieurs et inférieurs), dépendance totale."
  
          },
  
          { 
  
            name: "Amputation des quatre membres (tétra-amputation)", 
  
            searchTerms: ["amputation des quatre membres tétra amputation", "amputation tétra membres quatre des amputation", "amputation quatre membres tétra amputation", "amputation des", "des quatre"], rate: 100, 
  
            description: "Perte des quatre membres, dépendance absolue pour tous les actes de la vie quotidienne."
  
          },
  
        ]
  
      }
  
    ]
  
  },

  // SECTION: Cumuls et Polytraumatismes (🆕 V3.3.135)
  {
    name: "Cumuls de Lésions et Polytraumatismes",
    subcategories: [
      {
        name: "Cumuls Simples - Même Membre",
        injuries: [
          { name: "Raideur genou + instabilité LCA (cumul)", searchTerms: ["raideur genou instabilité lca", "genou raideur lca instabilité", "lca genou raideur", "instabilité lca genou"], rate: [25, 35], description: "Cumul d'une raideur du genou avec séquelles de rupture du LCA." },
          { name: "Raideur cheville + séquelles fracture (cumul)", searchTerms: ["raideur cheville séquelles fracture", "fracture séquelles cheville raideur", "raideur cheville", "cheville séquelles", "séquelles fracture"], rate: [20, 30], description: "Cumul d'une raideur de cheville avec séquelles de fracture malléolaire ou bimalléolaire." },
          { name: "Raideur épaule + rupture coiffe (cumul)", searchTerms: ["raideur épaule rupture coiffe", "coiffe rupture épaule raideur", "raideur épaule", "épaule rupture", "rupture coiffe"], rate: [28, 40], description: "Cumul d'une raideur d'épaule avec rupture de la coiffe des rotateurs." },
          { name: "Raideur poignet + fracture scaphoïde (cumul)", searchTerms: ["raideur poignet fracture scaphoïde", "scaphoïde fracture poignet raideur", "raideur poignet", "poignet fracture", "fracture scaphoïde"], rate: [15, 25], description: "Cumul d'une raideur du poignet avec séquelles de fracture du scaphoïde." },
          { name: "Raideur coude + déficit nerf cubital (cumul)", searchTerms: ["raideur coude déficit nerf cubital", "raideur coude déficit nerf nerf", "cubital nerf déficit coude raideur", "raideur coude", "coude déficit"], rate: [22, 32], description: "Cumul d'une raideur de coude avec atteinte du nerf cubital." },
          { name: "Amputation index + raideur main (cumul)", searchTerms: ["amputation index raideur main", "main raideur index amputation", "amputation index", "index raideur", "raideur main"], rate: [18, 28], description: "Cumul d'une amputation d'un doigt avec raideur des autres doigts." },
          { name: "Méniscectomie + chondropathie sévère (cumul)", searchTerms: ["méniscectomie chondropathie sévère", "ménisque chondropathie sévère", "sévère chondropathie méniscectomie", "méniscectomie chondropathie", "chondropathie sévère"], rate: [25, 35], description: "Cumul méniscectomie et arthrose fémoro-patellaire ou fémoro-tibiale." },
          { name: "Raideur hanche + boiterie sévère (cumul)", searchTerms: ["raideur hanche boiterie sévère", "sévère boiterie hanche raideur", "raideur hanche", "hanche boiterie", "boiterie sévère"], rate: [24, 34], description: "Cumul raideur de hanche avec claudication nécessitant une aide à la marche." },
          { name: "Pilon tibial + raideur cheville + hallux (cumul)", searchTerms: ["pilon tibial raideur cheville hallux", "pilon tibial tibial raideur cheville hallux", "hallux cheville raideur tibial pilon", "pilon tibial", "tibial raideur"], rate: [30, 42], description: "Cumul de 3 lésions du pied: séquelles de pilon tibial, raideur de cheville, et atteinte du gros orteil." },
          { name: "Tassement + raideur rachis + sciatique (cumul)", searchTerms: ["tassement raideur rachis sciatique", "tassement raideur rachis nerf", "sciatique rachis raideur tassement", "tassement raideur", "raideur rachis"], rate: [20, 30], description: "Cumul tassement vertébral, raideur rachidienne, et névralgie sciatique." },
          { name: "Fracture radius + raideur + déficit force (cumul)", searchTerms: ["fracture radius raideur déficit force", "force déficit raideur radius fracture", "fracture radius", "radius raideur", "raideur déficit"], rate: [22, 32], description: "Cumul fracture avant-bras, raideur poignet, et déficit de force de préhension." },
          { name: "Luxation + instabilité + raideur épaule (cumul)", searchTerms: ["luxation instabilité raideur épaule", "épaule raideur instabilité luxation", "luxation instabilité", "instabilité raideur", "raideur épaule"], rate: [30, 42], description: "Cumul luxation récidivante, instabilité chronique, et raideur d'épaule." },
          { name: "Plateaux tibiaux + raideur + arthrose (cumul)", searchTerms: ["plateaux tibiaux raideur arthrose", "arthrose raideur tibiaux plateaux", "plateaux tibiaux", "tibiaux raideur", "raideur arthrose"], rate: [28, 38], description: "Cumul fracture des plateaux tibiaux, raideur du genou, et gonarthrose." },
          { name: "Malléole + entorse + instabilité (cumul)", searchTerms: ["malléole entorse instabilité", "instabilité entorse malléole", "malléole entorse", "entorse instabilité"], rate: [22, 32], description: "Cumul fracture malléolaire, entorse grave, et instabilité chronique de cheville." },
          { name: "Amputation pouce + ankylose index (cumul)", searchTerms: ["amputation pouce ankylose index", "index ankylose pouce amputation", "amputation pouce", "pouce ankylose", "ankylose index"], rate: [25, 35], description: "Cumul amputation du pouce avec ankylose d'un autre doigt long." },
          { name: "Olécrane + raideur coude (cumul)", searchTerms: ["olécrane raideur coude", "coude raideur coude", "coude raideur olécrane", "olécrane raideur", "raideur coude"], rate: [20, 30], description: "Cumul séquelles de fracture de l'olécrane avec raideur du coude." },
          { name: "Calcanéum + raideur + troubles marche (cumul)", searchTerms: ["calcanéum raideur troubles marche", "marche troubles raideur calcanéum", "calcanéum raideur", "raideur troubles", "troubles marche"], rate: [26, 36], description: "Cumul fracture du calcanéum, raideur sous-astragalienne, et troubles de la marche." },
          { name: "Syndrome cervical + raideur + névralgie (cumul)", searchTerms: ["syndrome cervical raideur névralgie", "névralgie raideur cervical syndrome", "syndrome cervical", "cervical raideur", "raideur névralgie"], rate: [22, 32], description: "Cumul syndrome cervical, raideur du rachis cervical, et névralgie cervico-brachiale." },
          { name: "Col fémur + raideur + raccourcissement (cumul)", searchTerms: ["col fémur raideur raccourcissement", "raccourcissement raideur fémur col", "col fémur", "fémur raideur", "raideur raccourcissement"], rate: [28, 40], description: "Cumul fracture du col fémoral, raideur de hanche, et raccourcissement de membre." },
          { name: "LCA + méniscectomie + instabilité (cumul)", searchTerms: ["lca méniscectomie instabilité", "lca ménisque instabilité", "instabilité méniscectomie lca", "lca méniscectomie", "méniscectomie instabilité"], rate: [30, 40], description: "Cumul rupture LCA, méniscectomie, et instabilité résiduelle du genou." },
          { name: "Raideur genou + dérobements", searchTerms: ["raideur genou dérobements", "dérobements genou raideur", "raideur genou", "genou dérobements"], rate: [18, 28], description: "Cumul raideur du genou avec instabilité fonctionnelle et dérobements fréquents." },
          { name: "Raideur + instabilité épaule", searchTerms: ["raideur instabilité épaule", "épaule instabilité raideur", "raideur instabilité", "instabilité épaule"], rate: [18, 30], description: "Association raideur et instabilité chronique de l'épaule." },
          { name: "Fracture bimalléolaire + troubles marche", searchTerms: ["fracture bimalléolaire troubles marche", "fracture malléolaire troubles marche", "marche troubles bimalléolaire fracture", "fracture bimalléolaire", "bimalléolaire troubles"], rate: [20, 30], description: "Séquelles de fracture bimalléolaire avec troubles persistants de la marche." },
        ]
      },
      {
        name: "Polytraumatismes - Membres Multiples",
        injuries: [
          // 🆕 V3.3.148: Cumul fracture membre supérieur + membre inférieur (chute polytraumatique)
          { 
            name: "Fracture radius + fracture malléole (cumul)", 
            searchTerms: [
              "fracture radius fracture malléole",
              "fracture malléole fracture radius",
              "fracture poignet fracture cheville",
              "fracture cheville fracture radius",
              "fracture extrémité inférieure radius fracture malléole externe",
              "fracture malléole externe fracture radius droit",
              "chute membre supérieur droit membre inférieur gauche",
              "traumatisme poignet cheville",
              "chute polytraumatique radius malléole",
              "consolidation radius malléole douleurs résiduelles",
              "raideur poignet douleurs cheville",
              "immobilisation radius immobilisation malléole",
              "fracture fermée radius fracture malléole",
              "séquelles fonctionnelles poignet cheville"
            ], 
            rate: [18, 28], 
            description: "Cumul d'une fracture du radius et d'une fracture de la malléole dans un même accident (polytraumatisme membres).", 
            rateCriteria: { 
              low: "Fracture radius consolidée (3-5% IPP) + fracture malléole bonne consolidation (3-5% IPP) = ~8-10% cumul", 
              medium: "Fracture radius avec raideur modérée (10-15% IPP) + fracture malléole avec douleurs (8-12% IPP) = ~17-25% cumul", 
              high: "Fracture radius avec limitation importante (15-20% IPP) + fracture malléole avec raideur (12-20% IPP) = ~25-36% cumul" 
            } 
          },
          
          // 🆕 V3.3.147: Cumul fracture membre + lésion rachis (pattern fréquent en traumatologie)
          { name: "Fracture radius + lombalgie post-traumatique (cumul)", searchTerms: ["fracture radius lombalgie post traumatique", "lombalgie post traumatique fracture radius", "fracture radius entorse lombaire", "entorse lombaire fracture radius", "fracture poignet lombalgie", "lombalgie mécanique fracture radius", "radius lombalgie", "poignet entorse lombaire", "fracture fermée extrémité inférieure radius lombalgie", "fracture radius droit lombalgie", "consolidation radius lombalgies mécaniques", "fracture radius limitation fonctionnelle lombalgies", "fracture radius mouvement brutal rachis lombaire", "chute membre supérieur mouvement brutal rachis", "fracture extrémité inférieure radius entorse lombaire", "immobilisation radius lombalgie post traumatique"], rate: [20, 25], description: "Cumul d'une fracture du radius avec lombalgie post-traumatique ou entorse lombaire.", rateCriteria: { low: "Fracture radius consolidée avec limitation minime + lombalgies mécaniques occasionnelles.", medium: "Fracture radius avec raideur modérée + lombalgies mécaniques fréquentes.", high: "Fracture radius avec limitation importante + lombalgies chroniques invalidantes." } },
          { name: "Polytraumatisme membre inférieur + supérieur", searchTerms: ["polytraumatisme membre inférieur supérieur", "supérieur inférieur membre polytraumatisme", "polytraumatisme membre", "membre inférieur", "inférieur supérieur"], rate: [40, 55], description: "Atteinte simultanée d'un membre inférieur et d'un membre supérieur." },
          { name: "Polytraumatisme épaule + genou + rachis", searchTerms: ["polytraumatisme épaule genou rachis", "rachis genou épaule polytraumatisme", "polytraumatisme épaule", "épaule genou", "genou rachis"], rate: [35, 48], description: "Atteinte de l'épaule, du genou, et du rachis dans un même accident." },
          { name: "Polytraumatisme crâne + thorax + hanche", searchTerms: ["polytraumatisme crâne thorax hanche", "hanche thorax crâne polytraumatisme", "polytraumatisme crâne", "crâne thorax", "thorax hanche"], rate: [38, 50], description: "Traumatisme crânien, thoracique, et de la hanche." },
          { name: "Polytraumatisme main + 2 membres inférieurs", searchTerms: ["polytraumatisme main membres inférieurs", "inférieurs membres main polytraumatisme", "polytraumatisme main", "main membres", "membres inférieurs"], rate: [42, 55], description: "Atteinte de la main et des deux membres inférieurs." },
          { name: "Polytraumatisme vision + audition + genou", searchTerms: ["polytraumatisme vision audition genou", "genou audition vision polytraumatisme", "polytraumatisme vision", "vision audition", "audition genou"], rate: [48, 62], description: "Atteintes sensorielles (vision et audition) associées à une lésion du genou." },
          { name: "Polytraumatisme bassin + 2 membres + rachis", searchTerms: ["polytraumatisme bassin membres rachis", "rachis membres bassin polytraumatisme", "polytraumatisme bassin", "bassin membres", "membres rachis"], rate: [52, 65], description: "Fracture du bassin avec atteintes des membres et du rachis." },
          { name: "Polytraumatisme 2 membres supérieurs + rachis", searchTerms: ["polytraumatisme membres supérieurs rachis", "rachis supérieurs membres polytraumatisme", "polytraumatisme membres", "membres supérieurs", "supérieurs rachis"], rate: [38, 50], description: "Atteinte des deux membres supérieurs et du rachis." },
          { name: "Polytraumatisme thorax + abdomen sévère", searchTerms: ["polytraumatisme thorax abdomen sévère", "sévère abdomen thorax polytraumatisme", "polytraumatisme thorax", "thorax abdomen", "abdomen sévère"], rate: [35, 48], description: "Traumatisme thoraco-abdominal avec atteintes viscérales multiples." },
          { name: "Polytraumatisme membre inférieur + supérieur droit complet", searchTerms: ["polytraumatisme membre inférieur supérieur droit complet", "complet droit supérieur inférieur membre polytraumatisme", "polytraumatisme membre", "membre inférieur", "inférieur supérieur"], rate: [48, 60], description: "Atteinte complète du membre inférieur et supérieur du même côté." },
          { name: "Polytraumatisme rachis triple étage", searchTerms: ["polytraumatisme rachis triple étage", "étage triple rachis polytraumatisme", "polytraumatisme rachis", "rachis triple", "triple étage"], rate: [32, 42], description: "Atteinte du rachis sur trois étages (cervical, dorsal, lombaire)." },
          { name: "Polytraumatisme membre inférieur droit complet", searchTerms: ["polytraumatisme membre inférieur droit complet", "complet droit inférieur membre polytraumatisme", "polytraumatisme membre", "membre inférieur", "inférieur droit"], rate: [50, 62], description: "Atteinte de toutes les articulations du membre inférieur (hanche, genou, cheville, pied)." },
          { name: "Polytraumatisme membre supérieur gauche complet", searchTerms: ["polytraumatisme membre supérieur gauche complet", "complet gauche supérieur membre polytraumatisme", "polytraumatisme membre", "membre supérieur", "supérieur gauche"], rate: [45, 58], description: "Atteinte complète du membre supérieur (épaule, coude, poignet, main)." },
          { name: "Polytraumatisme sensoriel + rachis", searchTerms: ["polytraumatisme sensoriel rachis", "rachis sensoriel polytraumatisme", "polytraumatisme sensoriel", "sensoriel rachis"], rate: [48, 60], description: "Atteintes sensorielles (vision et/ou audition) associées à une atteinte rachidienne." },
          { name: "Polytraumatisme bassin-rachis complexe", searchTerms: ["polytraumatisme bassin rachis complexe", "complexe rachis bassin polytraumatisme", "polytraumatisme bassin", "bassin rachis", "rachis complexe"], rate: [45, 58], description: "Fractures complexes du bassin et du rachis lombo-sacré." },
          { name: "Polytraumatisme neurologique membre inférieur", searchTerms: ["polytraumatisme neurologique membre inférieur", "inférieur membre neurologique polytraumatisme", "polytraumatisme neurologique", "neurologique membre", "membre inférieur"], rate: [38, 50], description: "Atteintes neurologiques multiples du membre inférieur (sciatique, fibulaire, steppage)." },
          { name: "Polytraumatisme viscères multiples", searchTerms: ["polytraumatisme viscères multiples", "multiples viscères polytraumatisme", "polytraumatisme viscères", "viscères multiples"], rate: [40, 55], description: "Atteintes de plusieurs organes abdominaux (rate, rein, pancréas, etc.)." },
          { name: "Polytraumatisme main dominante complète", searchTerms: ["polytraumatisme main dominante complète", "complète dominante main polytraumatisme", "polytraumatisme main", "main dominante", "dominante complète"], rate: [50, 62], description: "Atteinte complète de la main dominante (doigts, poignet, avant-bras)." },
          { name: "Destruction genou (polytraumatisme intra-articulaire)", searchTerms: ["destruction genou", "polytraumatisme destruction genou"], rate: [40, 52], description: "Destruction du genou avec atteintes ligamentaires et méniscales multiples." },
          { name: "Destruction cheville-pied (polytraumatisme)", searchTerms: ["destruction cheville pied", "pied cheville destruction", "destruction cheville", "cheville pied", "polytraumatisme destruction cheville pied"], rate: [42, 55], description: "Destruction cheville et pied avec atteintes de multiples articulations." },
          { name: "Raideur rachis global (polytraumatisme axial)", searchTerms: ["raideur rachis global", "global rachis raideur", "raideur rachis", "rachis global", "polytraumatisme raideur rachis global"], rate: [35, 48], description: "Raideur globale du rachis sur plusieurs étages." },
          { name: "Polytraumatisme 2 membres inférieurs", searchTerms: ["polytraumatisme membres inférieurs", "inférieurs membres polytraumatisme", "polytraumatisme membres", "membres inférieurs"], rate: [55, 68], description: "Atteinte des deux membres inférieurs dans le même accident." },
        ]
      },
      {
        name: "Formules de Cumul (Référence)",
        injuries: [
          { name: "Cumul de 2 lésions (Formule de Balthazar)", searchTerms: ["cumul lésions formule balthazar", "balthazar formule lésions cumul", "cumul lésions", "lésions formule", "formule balthazar"], rate: [0, 0], description: "Référence pour calcul: appliquer la formule de Balthazar pour deux lésions distinctes." },
          { name: "Cumul de 3 lésions (Formule de Balthazar)", searchTerms: ["cumul lésions formule balthazar", "balthazar formule lésions cumul", "cumul lésions", "lésions formule", "formule balthazar"], rate: [0, 0], description: "Référence pour calcul: appliquer la formule de Balthazar pour trois lésions distinctes." },
          { name: "Cumul de 4 lésions (Formule de Balthazar)", searchTerms: ["cumul lésions formule balthazar", "balthazar formule lésions cumul", "cumul lésions", "lésions formule", "formule balthazar"], rate: [0, 0], description: "Référence pour calcul: appliquer la formule de Balthazar pour quatre lésions distinctes." },
          { name: "Cumul de 5 lésions (Formule de Balthazar)", searchTerms: ["cumul lésions formule balthazar", "balthazar formule lésions cumul", "cumul lésions", "lésions formule", "formule balthazar"], rate: [0, 0], description: "Référence pour calcul: appliquer la formule de Balthazar pour cinq lésions ou plus." },
          { name: "Cumul de 7 lésions (Formule de Balthazar)", searchTerms: ["cumul lésions formule balthazar", "balthazar formule lésions cumul", "cumul lésions", "lésions formule", "formule balthazar"], rate: [0, 0], description: "Référence pour calcul: polytraumatisme majeur nécessitant formule de Balthazar complexe." },
        ]
      }
    ]
  },
  
  // 🆕 V3.3.136 - SECTION: États Antérieurs et Aggravation de Pathologies Préexistantes
  {
    name: "États Antérieurs et Aggravation de Pathologies Préexistantes",
    subcategories: [
      {
        name: "Aggravation Rachis sur État Antérieur",
        injuries: [
          { name: "Aggravation arthrose rachis sur état antérieur", description: "Aggravation d'une arthrose vertébrale préexistante suite à traumatisme.", rate: [10, 25] },
          { name: "Tassement vertébral sur discopathie préexistante", description: "Tassement sur discopathie ou arthrose préexistante.", rate: [12, 28] },
          { name: "Hernie discale sur canal étroit préexistant", description: "Hernie discale aggravant un canal lombaire étroit congénital ou dégénératif.", rate: [15, 30] },
          { name: "Fracture rachis sur scoliose préexistante", description: "Fracture vertébrale compliquant une scoliose ancienne.", rate: [18, 35] },
          { name: "Sciatique sur arthrose lombaire préexistante", description: "Sciatique post-traumatique sur contexte d'arthrose lombaire.", rate: [10, 22] },
        ]
      },
      {
        name: "Aggravation Genou sur État Antérieur",
        injuries: [
          { name: "Fracture genou sur gonarthrose préexistante", description: "Fracture du genou aggravant une arthrose préexistante.", rate: [18, 35] },
          { name: "Entorse LCA sur méniscectomie ancienne", description: "Rupture LCA compliquant une méniscectomie réalisée antérieurement.", rate: [15, 30] },
          { name: "Raideur genou sur prothèse préexistante", description: "Raideur post-traumatique sur prothèse totale de genou préexistante.", rate: [20, 38] },
          { name: "Chondropathie aggravée sur arthrose genou", description: "Aggravation traumatique d'une chondropathie ou gonarthrose connue.", rate: [12, 25] },
        ]
      },
      {
        name: "Aggravation Épaule sur État Antérieur",
        injuries: [
          { name: "Luxation épaule sur omarthrose préexistante", description: "Luxation compliquant une arthrose gléno-humérale préexistante.", rate: [18, 32] },
          { name: "Fracture épaule sur rupture coiffe ancienne", description: "Fracture sur contexte de rupture de coiffe des rotateurs ancienne.", rate: [20, 38] },
          { name: "Raideur épaule sur prothèse préexistante", description: "Raideur post-traumatique sur prothèse d'épaule préexistante.", rate: [22, 40] },
          { name: "Capsulite rétractile sur tendinopathie ancienne", description: "Capsulite aggravée par contexte de tendinopathie chronique.", rate: [15, 28] },
        ]
      },
      {
        name: "Aggravation Main et Poignet sur État Antérieur",
        injuries: [
          { name: "Fracture poignet sur rhizarthrose préexistante", description: "Fracture du poignet aggravant une rhizarthrose (arthrose base pouce).", rate: [12, 22] },
          { name: "Fracture scaphoïde sur arthrose carpe", description: "Fracture du scaphoïde compliquant une arthrose carpienne préexistante.", rate: [15, 28] },
          { name: "Raideur main sur amputation ancienne", description: "Raideur compliquant une amputation digitale ancienne.", rate: [18, 32] },
          { name: "Syndrome canal carpien sur ténosynovite ancienne", description: "Canal carpien aggravé sur ténosynovite chronique préexistante.", rate: [10, 20] },
        ]
      },
      {
        name: "Aggravation Hanche et Membre Inférieur sur État Antérieur",
        injuries: [
          { name: "Fracture hanche sur coxarthrose préexistante", description: "Fracture du col fémoral ou trochantérienne sur arthrose de hanche connue.", rate: [25, 45] },
          { name: "Luxation hanche sur prothèse préexistante", description: "Luxation post-traumatique d'une prothèse totale de hanche.", rate: [22, 40] },
          { name: "Fracture cheville sur arthrose tibio-tarsienne", description: "Fracture de cheville compliquant une arthrose préexistante.", rate: [18, 32] },
          { name: "Amputation sur neuropathie diabétique", description: "Amputation d'orteil ou pied sur contexte de neuropathie diabétique.", rate: [30, 50] },
        ]
      },
      {
        name: "Aggravation Affections Sensorielles sur État Antérieur",
        injuries: [
          { name: "Traumatisme crânien sur surdité préexistante", description: "Aggravation d'une surdité partielle préexistante par traumatisme crânien.", rate: [15, 30] },
          { name: "Atteinte visuelle sur amblyopie préexistante", description: "Traumatisme oculaire aggravant une amblyopie (œil paresseux) ancienne.", rate: [12, 25] },
          { name: "Cataracte traumatique sur glaucome préexistant", description: "Cataracte post-traumatique compliquant un glaucome connu.", rate: [18, 35] },
        ]
      }
    ]
  },

  // SECTION: Complications Psychiatriques Spécifiques
  
  {
  
    name: "Séquelles Psychiatriques Sévères et Spécifiques",
  
    subcategories: [
  
      {
  
        name: "Psychose Post-Traumatique",
  
        injuries: [
  
          { 
  
            name: "Psychose hallucinatoire chronique post-traumatique", 
  
            searchTerms: ["psychose hallucinatoire chronique post traumatique", "traumatique post chronique hallucinatoire psychose", "psychose hallucinatoire", "hallucinatoire chronique", "chronique post"], rate: [50, 80], 
  
            description: "Psychose avec hallucinations (auditives, visuelles) et délire chronique apparue après un traumatisme crânien grave.",
  
            rateCriteria: { 
  
              low: "Psychose stabilisée par un traitement antipsychotique, hallucinations rares et non angoissantes, maintien d'une vie sociale minimale.", 
  
              medium: "Psychose avec hallucinations fréquentes et délire, nécessitant un traitement antipsychotique au long cours, retentissement socio-professionnel majeur, isolement social.",
  
              high: "Psychose chronique sévère avec hallucinations permanentes et délire structuré, résistance au traitement, dangerosité pour soi ou autrui, nécessité d'hospitalisations répétées, perte d'autonomie."
  
            } 
  
          },
  
          { 
  
            name: "Schizophrénie post-traumatique", 
  
            searchTerms: ["schizophrénie post traumatique", "traumatique post schizophrénie", "schizophrénie post", "post traumatique"], rate: [60, 100], 
  
            description: "Schizophrénie déclenchée par un traumatisme crânien grave ou un stress post-traumatique majeur.",
  
            rateCriteria: { 
  
              low: "Schizophrénie paranoïde avec symptômes positifs (délire) contrôlés par le traitement, autonomie partielle conservée.", 
  
              medium: "Schizophrénie avec symptômes négatifs majeurs (apathie, retrait social, aboulie), dépendance partielle pour les actes de la vie quotidienne.",
  
              high: "Schizophrénie désorganisée ou catatonique, syndrome déficitaire sévère, dépendance totale, institutionnalisation."
  
            } 
  
          }
  
        ]
  
      }
  
    ]
  
  }

];
