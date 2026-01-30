import { InjuryCategory } from '../types';
import { algerianBareme1967 } from './algerianBareme1967';
import { mayetReyComplement } from './mayetReyComplement';

/**
 * BASE DE DONNÉES IPP - ORGANISATION ANATOMIQUE UNIFIÉE
 * 
 * ✅ UNE SEULE catégorie par partie anatomique
 * ✅ Fusion automatique des subcategories
 * ✅ Structure propre et sans doublons
 */

// Fonction pour fusionner les catégories ayant le même nom
function mergeCategories(categories: InjuryCategory[]): InjuryCategory[] {
  const categoryMap = new Map<string, InjuryCategory>();
  
  for (const category of categories) {
    const existing = categoryMap.get(category.name);
    
    if (existing) {
      // Fusionner les subcategories sans doublons
      existing.subcategories.push(...category.subcategories);
    } else {
      // Nouvelle catégorie
      categoryMap.set(category.name, {
        name: category.name,
        subcategories: [...category.subcategories]
      });
    }
  }
  
  return Array.from(categoryMap.values());
}

// Construction des catégories intermédiaires (tout sauf Membres Sup/Inf et Rachis)
const middleCategories: InjuryCategory[] = [
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
          { name: "Syndrome Cérébelleux", searchTerms: ["syndrome cérébelleux"], rate: [10, 100], description: "Séquelles cérébelleuses des traumatismes crâniens, relativement rares à l'état pur. Généralement associées à d'autres séquelles, surtout pyramidales. Voir formes spécifiques selon atteinte." },
          { name: "Syndrome Cérébelleux Global", searchTerms: ["syndrome cérébelleux global", "global cérébelleux syndrome", "syndrome cérébelleux", "cérébelleux global"], rate: 100, description: "Atteinte cérébelleuse globale comportant troubles statiques (impossibilité de la marche) et troubles kinétiques (dysmétrie et incoordination bilatérale)." },
          { name: "Syndrome Cérébelleux Bilatéral Incomplet", searchTerms: ["syndrome cérébelleux bilatéral incomplet", "incomplet bilatéral cérébelleux syndrome", "syndrome cérébelleux", "cérébelleux bilatéral", "bilatéral incomplet"], rate: [50, 75], description: "Atteinte bilatérale incomplète permettant une marche imparfaite et des mouvements maladroits, mais susceptibles de rendre service au blessé." },
          { name: "Syndrome Cérébelleux Léger", searchTerms: ["syndrome cérébelleux léger", "léger cérébelleux syndrome", "syndrome cérébelleux", "cérébelleux léger"], rate: [25, 50], description: "Atteinte légère avec maladresse des mouvements. Taux majoré s'il y a gêne professionnelle considérable, surtout pour activité professionnelle de précision antérieure.", rateCriteria: { low: "Maladresse légère, pas de gêne professionnelle majeure, activité non spécialisée.", medium: "Maladresse modérée avec gêne professionnelle notable, nécessitant adaptation.", high: "Maladresse importante avec gêne professionnelle considérable, surtout si activité de précision avant traumatisme (chirurgien, horloger, musicien, etc.)." } },
          { name: "Syndrome Cérébelleux Unilatéral (Côté Droit/Dominant)", searchTerms: ["syndrome cérébelleux unilatéral côté droit/dominant", "droit/dominant côté unilatéral cérébelleux syndrome", "syndrome cérébelleux", "cérébelleux unilatéral", "unilatéral côté"], rate: [10, 80], description: "Atteinte unilatérale du côté droit ou côté dominant. Taux selon importance de la maladresse des mouvements." },
          { name: "Syndrome Cérébelleux Unilatéral (Côté Gauche/Non Dominant)", searchTerms: ["syndrome cérébelleux unilatéral côté gauche/non dominant", "dominant gauche/non côté unilatéral cérébelleux syndrome", "syndrome cérébelleux", "cérébelleux unilatéral", "unilatéral côté"], rate: [10, 75], description: "Atteinte unilatérale du côté gauche ou côté non dominant. Taux selon importance de la maladresse des mouvements." },
          { name: "Syndrome Cérébelleux Bilatéral", searchTerms: ["syndrome cérébelleux bilatéral", "bilatéral cérébelleux syndrome", "syndrome cérébelleux", "cérébelleux bilatéral"], rate: [25, 100], description: "Terme générique. Voir formes spécifiques: global (100%), bilatéral incomplet (50-75%), ou léger (25-50%)." },
          { name: "Syndrome de Parkinson Post-Traumatique", searchTerms: ["syndrome parkinson post traumatique", "traumatique post parkinson syndrome", "syndrome parkinson", "parkinson post", "post traumatique"], rate: [10, 100] },
          { name: "Mouvements anormaux post-traumatiques (dystonie, chorée, tremblements)", searchTerms: ["mouvements anormaux post traumatiques dystonie, chorée, tremblements", "tremblements chorée, dystonie, traumatiques post anormaux mouvements", "mouvements anormaux", "anormaux post", "post traumatiques"], rate: [15, 60], description: "Apparition de mouvements involontaires (postures anormales, tremblements de repos ou d'action, mouvements brusques) après un traumatisme crânien ou périphérique.", rateCriteria: { low: "Mouvements discrets, intermittents, n'entraînant qu'une gêne mineure dans les activités.", medium: "Mouvements modérés et fréquents, contrôlés partiellement par le traitement, avec un retentissement sur les gestes fins ou la marche.", high: "Mouvements invalidants, permanents, rebelles au traitement, avec un retentissement majeur sur l'autonomie." } },
          { name: "Torticolis d'origine neurologique centrale (dystonie cervicale)", searchTerms: ["torticolis d'origine neurologique centrale dystonie cervicale", "cervicale dystonie centrale neurologique d'origine torticolis", "torticolis d'origine", "d'origine neurologique", "neurologique centrale"], rate: [8, 15], description: "Torticolis d'origine neurologique centrale (lésion des noyaux gris centraux) après traumatisme crânien, avec contracture permanente des muscles cervicaux." },
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
          { name: "Démence post-traumatique incomplète légère (troubles attention, mémoire, vitalité)", searchTerms: ["démence post traumatique incomplète légère troubles attention, mémoire, vitalité", "vitalité mémoire, attention, troubles légère incomplète traumatique post démence", "démence post", "post traumatique", "traumatique incomplète"], rate: [5, 25], description: "Syndrome post-commotionnel tardif grave. Troubles de l'attention, de la mémoire, de la vitalité générale." },
          { name: "Démence post-traumatique incomplète importante (inactivité professionnelle)", searchTerms: ["démence post traumatique incomplète importante inactivité professionnelle", "professionnelle inactivité importante incomplète traumatique post démence", "démence post", "post traumatique", "traumatique incomplète"], rate: [25, 75], description: "État démentiel plus important entraînant une inactivité professionnelle, sans inaptitude totale à la vie sociale." },
          { name: "Démence post-traumatique incomplète sévère", searchTerms: ["démence post traumatique incomplète sévère", "sévère incomplète traumatique post démence", "démence post", "post traumatique", "traumatique incomplète"], rate: [60, 90], description: "État démentiel sévère avec retentissement majeur sur l'autonomie." },
          { name: "Démence post-traumatique complète", searchTerms: ["démence post traumatique complète", "complète traumatique post démence", "démence post", "post traumatique", "traumatique complète"], rate: [75, 100], description: "Inaptitude à toute vie sociale, état démentiel complet avec gâtisme, nécessité d'internement ou surveillance familiale permanente." },
          { name: "Névrose post-traumatique - États neuro-psychasthéniques (signes fonctionnels)", searchTerms: ["névrose post traumatique états neuro psychasthéniques signes fonctionnels", "fonctionnels signes psychasthéniques neuro états traumatique post névrose", "névrose post", "post traumatique", "traumatique états"], rate: [0, 10] },
          { name: "Névrose post-traumatique - États neuro-psychasthéniques (signes somatiques)", searchTerms: ["névrose post traumatique états neuro psychasthéniques signes somatiques", "somatiques signes psychasthéniques neuro états traumatique post névrose", "névrose post", "post traumatique", "traumatique états"], rate: [10, 40] },
          { name: "Névrose post-traumatique - Signes psychiques (fatigabilité cérébrale)", searchTerms: ["névrose post traumatique signes psychiques fatigabilité cérébrale", "cérébrale fatigabilité psychiques signes traumatique post névrose", "névrose post", "post traumatique", "traumatique signes"], rate: [20, 50] },
          { name: "Névrose post-traumatique - Symptômes vago-sympathiques", searchTerms: ["névrose post traumatique symptômes vago sympathiques", "sympathiques vago symptômes traumatique post névrose", "névrose post", "post traumatique", "traumatique symptômes"], rate: [5, 20] },
          { name: "Névrose post-traumatique - Syndromes anxieux", searchTerms: ["névrose post traumatique syndromes anxieux", "anxieux syndromes traumatique post névrose", "névrose post", "post traumatique", "traumatique syndromes"], rate: [10, 50] },
          { name: "Névrose post-traumatique - Syndromes moteurs fonctionnels", searchTerms: ["névrose post traumatique syndromes moteurs fonctionnels", "fonctionnels moteurs syndromes traumatique post névrose", "névrose post", "post traumatique", "traumatique syndromes"], rate: [0, 20] },
          { name: "Trouble de stress post-traumatique (TSPT)", searchTerms: ["trouble stress post traumatique tspt", "tspt traumatique post stress trouble", "trouble stress", "stress post", "post traumatique"], rate: [10, 50], rateCriteria: { low: "Symptômes d'évitement et d'hypervigilance légers, avec un retentissement modéré sur la vie sociale.", high: "Symptômes sévères et invalidants, avec anxiété majeure, phobies, dépression réactionnelle et retentissement socio-professionnel majeur." } },
          {
            name: "Phobie spécifique post-traumatique (amaxophobie, acrophobie, etc.)",
            searchTerms: ["phobie spécifique post traumatique amaxophobie, acrophobie, etc.", "etc. acrophobie, amaxophobie, traumatique post spécifique phobie", "phobie spécifique", "spécifique post", "post traumatique"], rate: [5, 35],
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
          { name: "Réaction d'effroi (réaction émotionnelle aiguë)", searchTerms: ["réaction d'effroi réaction émotionnelle aiguë", "aiguë émotionnelle réaction d'effroi réaction", "réaction d'effroi", "d'effroi réaction", "réaction émotionnelle"], rate: [0, 5], description: "Excitation anxieuse ou prostration avec troubles de conscience après traumatisme. Évolution généralement favorable en quelques jours/semaines. Séquelles: anxiété, irritabilité, insomnie, amaigrissement.", rateCriteria: { low: "Guérison complète ou séquelles minimes.", high: "Persistance anxiété, irritabilité, insomnie ou amaigrissement." } },
          { name: "Confusion mentale grave après réaction d'effroi", searchTerms: ["confusion mentale grave après réaction d'effroi", "d'effroi réaction après grave mentale confusion", "confusion mentale", "mentale grave", "grave après"], rate: [25, 75], description: "Évolution rare et grave de réaction d'effroi. Confusion mentale grave pouvant aboutir à la mort ou évoluer vers un état psychotique." },
          { name: "Troubles psychiques associés à épilepsie traumatique", searchTerms: ["troubles psychiques associés épilepsie traumatique", "traumatique épilepsie associés psychiques troubles", "troubles psychiques", "psychiques associés", "associés épilepsie"], rate: [5, 15], description: "Irritabilité, instabilité, troubles du caractère, impulsivité, désintérêt intellectuel (pouvant être lié au traitement anticomitial important). Ce taux S'AJOUTE au taux de l'épilepsie.", rateCriteria: { low: "Troubles caractère modérés, irritabilité occasionnelle.", high: "Impulsivité marquée, désintérêt intellectuel important, instabilité comportementale." } },
          { name: "Névrose de revendication", searchTerms: ["névrose revendication"], rate: 5, description: "Désir légitime de justice et d'indemnisation (préoccupation normale et non pathologique). Ne pas minimiser: refus ou taux faible peut aggraver les troubles. Ce taux S'AJOUTE aux autres taux d'indemnisation s'il y a d'autres lésions." },
          { name: "Sinistrose (surestimation inconsciente du préjudice)", searchTerms: ["sinistrose surestimation inconsciente préjudice", "préjudice inconsciente surestimation sinistrose", "sinistrose surestimation", "surestimation inconsciente", "inconsciente préjudice"], rate: 5, description: "Définition Brissaud: idée fausse de revendication et d'injustice subie en toute BONNE FOI (surestimation inconsciente, différent de simulation = surestimation consciente). Disparaît souvent avec règlement du litige. Peut être première manifestation d'une psychose interprétative plus grave." },
          { name: "Majoration névrotique sur atteinte organique (cas mixtes)", searchTerms: ["majoration névrotique sur atteinte organique cas mixtes", "mixtes cas organique atteinte sur névrotique majoration", "majoration névrotique atteinte organique cas mixtes", "majoration névrotique", "névrotique sur"], rate: [0, 5], description: "Interférence entre atteinte organique et majoration névrotique. Ce taux supplémentaire S'AJOUTE à l'indemnisation organique et ne doit JAMAIS dépasser 5%." },
          { name: "Delirium tremens déclenché par traumatisme (alcoolique chronique)", searchTerms: ["delirium tremens déclenché par traumatisme alcoolique chronique", "chronique alcoolique traumatisme par déclenché tremens delirium", "delirium tremens", "tremens déclenché", "déclenché par"], rate: [0, 50], description: "Chez alcoolique chronique, traumatisme peut déclencher delirium tremens. Imputabilité partielle: rôle favorisant 50% si mort, ≤50% pour état démentiel ultérieur. Le traumatisme joue un rôle favorisant, l'alcoolisme reste la cause principale.", rateCriteria: { low: "Rôle traumatisme minime (≤25%).", high: "Rôle traumatisme favorisant 50% maximum (mort ou état démentiel ultérieur)." } },
          { name: "Encéphalopathie de Gayet-Wernicke (rôle traumatisme accessoire)", searchTerms: ["encéphalopathie gayet wernicke rôle traumatisme accessoire", "accessoire traumatisme rôle wernicke gayet encéphalopathie", "encéphalopathie gayet", "gayet wernicke", "wernicke rôle"], rate: [0, 25], description: "Évolution peut être favorisée par traumatisme, mais rôle accessoire uniquement. Imputabilité partielle limitée. Complication alcoolisme/carence vitamine B1." },
          { name: "Démence artériopathique (rôle traumatisme favorisant possible)", searchTerms: ["démence artériopathique rôle traumatisme favorisant possible", "possible favorisant traumatisme rôle artériopathique démence", "démence artériopathique", "artériopathique rôle", "rôle traumatisme"], rate: [0, 30], description: "Traumatisme ne peut CAUSER démence artériopathique, mais rôle favorisant/aggravant possible. Imputabilité partielle ou nulle selon cas. Évaluation cas par cas du rôle favorisant." },
          { name: "Maladie de Pick (rôle traumatisme favorisant possible)", searchTerms: ["maladie pick rôle traumatisme favorisant possible", "possible favorisant traumatisme rôle pick maladie", "maladie pick", "pick rôle", "rôle traumatisme"], rate: [0, 25], description: "Ne dépend pas d'un traumatisme, mais rôle favorisant plus ou moins important possible. Imputabilité très limitée, évaluation au cas par cas." },
          { name: "Maladie d'Alzheimer (rôle traumatisme favorisant possible)", searchTerms: ["maladie d'alzheimer rôle traumatisme favorisant possible", "possible favorisant traumatisme rôle d'alzheimer maladie", "maladie d'alzheimer", "d'alzheimer rôle", "rôle traumatisme"], rate: [0, 25], description: "Ne dépend pas d'un traumatisme, mais rôle favorisant plus ou moins important possible. Imputabilité très limitée, évaluation au cas par cas." },
          { name: "Paralysie générale (non imputable au traumatisme)", searchTerms: ["paralysie générale non imputable traumatisme", "traumatisme imputable non générale paralysie", "paralysie générale", "générale non", "non imputable"], rate: 0, description: "Ne peut dépendre d'un traumatisme. Imputabilité nulle ou rôle favorisant minime uniquement." },
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
          // 🆕 V3.3.169: FRACTURE L1 AVEC LÉSIONS NEUROLOGIQUES (steppage + amyotrophie)
          { name: "Séquelles de fracture/luxation du rachis lombaire - Avec lésion neurologique légère", searchTerms: ["fracture luxation l1 avec steppage", "fracture luxation lombaire avec amyotrophie", "fracture luxation l1 amyotrophie steppage", "séquelles fracture/luxation rachis lombaire avec lésion neurologique", "fracture/luxation lombaire steppage", "fracture l1 steppage amyotrophie", "fracture lombaire steppage", "l1 amyotrophie steppage", "fracture l1 amyotrophie", "steppage amyotrophie membre inférieur", "amyotrophie marche steppage"], rate: [20, 35], description: "Fracture-luxation vertébrale lombaire (L1-L5) avec séquelles neurologiques légères: steppage, amyotrophie du membre inférieur, radiculalgie modérée.", rateCriteria: { low: "Raideur rachidienne modérée, steppage discret, amyotrophie mineure.", high: "Raideur marquée, steppage manifeste, amyotrophie modérée, lombalgies irradiantes." } },
          { name: "Fracture tassement vertébral cervical non déplacée consolidée", searchTerms: ["fracture tassement vertébral cervical non déplacée consolidée", "fracture tassement rachis cervical non déplacée consolidée", "consolidée déplacée non cervical vertébral tassement fracture", "fracture tassement", "tassement vertébral"], rate: [8, 20], description: "Fracture par compression d'une vertèbre cervicale, bien consolidée, sans lésion neurologique.", rateCriteria: { low: "Tassement léger (<25%), cervicalgies mécaniques, mobilité conservée.", medium: "Tassement modéré (25-50%), cervicalgies fréquentes, limitation modérée.", high: "Tassement important (>50%), cyphose, cervicalgies permanentes, limitation marquée." } },
          { name: "Fracture de l'Atlas (C1) - Tassement", searchTerms: ["fracture l'atlas tassement", "tassement l'atlas fracture", "fracture l'atlas", "l'atlas tassement"], rate: 20, description: "Fracture par tassement de la première vertèbre cervicale (Atlas), consolidée, sans lésion médullaire notable." },
          { name: "Fracture de l'Atlas (C1) - Rupture des arcs", searchTerms: ["fracture l'atlas rupture des arcs", "arcs des rupture l'atlas fracture", "fracture l'atlas rupture arcs", "fracture l'atlas", "l'atlas rupture"], rate: 30, description: "Fracture avec rupture des arcs antérieur et/ou postérieur de l'Atlas, consolidée, sans lésion médullaire." },
          { name: "Fracture de l'Apophyse Odontoïde (Axis C2) - Avec déplacement ou risque de glissement", searchTerms: ["fracture l'apophyse odontoïde axis avec déplacement risque glissement", "glissement risque déplacement avec axis odontoïde l'apophyse fracture", "fracture l'apophyse odontoïde axis déplacement risque glissement", "fracture l'apophyse", "l'apophyse odontoïde"], rate: 50, description: "Fracture de l'apophyse odontoïde de la deuxième vertèbre cervicale avec instabilité potentielle, nécessitant surveillance ou traitement chirurgical.", rateCriteria: { low: "Fracture consolidée avec stabilité acceptable mais surveillance nécessaire.", high: "Risque persistant d'instabilité cervicale haute, limitation importante des mouvements, risque neurologique." } },
          { name: "Fracture de l'Apophyse Odontoïde - Consolidée ou traitée par greffe avec bonne stabilité", searchTerms: ["fracture l'apophyse odontoïde consolidée traitée par greffe avec bonne stabilité", "stabilité bonne avec greffe par traitée consolidée odontoïde l'apophyse fracture", "fracture l'apophyse odontoïde consolidée traitée par greffe bonne stabilité", "fracture l'apophyse", "l'apophyse odontoïde"], rate: [15, 20], description: "Fracture de l'odontoïde bien consolidée spontanément ou après arthrodèse C1-C2, avec bonne stabilité rachidienne et absence de signes neurologiques.", rateCriteria: { low: "Consolidation parfaite, raideur minime, pas de douleurs.", high: "Raideur cervicale haute résiduelle, cervicalgies mécaniques, limitation des rotations." } },
          { name: "Fracture d'autres vertèbres cervicales (C3-C7) - Sans lésion neurologique", searchTerms: ["fracture d'autres vertèbres cervicales sans lésion neurologique", "neurologique lésion sans cervicales vertèbres d'autres fracture", "fracture d'autres vertèbres cervicales lésion neurologique", "fracture d'autres", "d'autres vertèbres"], rate: [15, 20], description: "Fracture des vertèbres cervicales basses consolidée, sans atteinte médullaire ni radiculaire, avec raideur cervicale résiduelle et cervicalgies mécaniques." },
          { name: "Fracture tassement vertébral dorsal non déplacée consolidée", searchTerms: ["fracture tassement vertébral dorsal non déplacée consolidée", "fracture tassement rachis dorsal non déplacée consolidée", "consolidée déplacée non dorsal vertébral tassement fracture", "fracture tassement", "tassement vertébral"], rate: [5, 15], description: "Fracture par compression d'une vertèbre dorsale (D1-D12), bien consolidée, sans lésion neurologique.", rateCriteria: { low: "Tassement léger (<25%), dorsalgies occasionnelles.", medium: "Tassement modéré (25-50%), dorsalgies fréquentes, cyphose débutante.", high: "Tassement important (>50%), cyphose marquée, dorsalgies chroniques." } },
          { name: "Tassement d'une vertèbre dorsale - Avec cyphose", searchTerms: ["tassement d'une vertèbre dorsale avec cyphose", "tassement d'une rachis dorsale avec cyphose", "cyphose avec dorsale vertèbre d'une tassement", "tassement d'une vertèbre dorsale cyphose", "tassement d'une"], rate: 12 },  // Entrée spécifique pour cas test
          { name: "Fracture tassement vertébral lombaire non déplacée consolidée", searchTerms: ["fracture tassement vertébral lombaire non déplacée consolidée", "fracture tassement rachis lombaire non déplacée consolidée", "consolidée déplacée non lombaire vertébral tassement fracture", "fracture tassement", "tassement vertébral"], rate: [10, 25], description: "Fracture par compression d'une vertèbre lombaire (L1-L5), bien consolidée, sans lésion neurologique.", rateCriteria: { low: "Tassement léger (<25%), lombalgies mécaniques.", medium: "Tassement modéré (25-50%), lombalgies fréquentes, limitation des efforts.", high: "Tassement important (>50%), lombalgies chroniques invalidantes, troubles statiques." } },
          { name: "Tassement d'une vertèbre lombaire - Avec cyphose et/ou raideur", searchTerms: ["tassement d'une vertèbre lombaire avec cyphose et/ou raideur", "tassement d'une rachis lombaire avec cyphose et/ou raideur", "raideur et/ou cyphose avec lombaire vertèbre d'une tassement", "tassement d'une vertèbre lombaire cyphose et/ou raideur", "tassement d'une"], rate: 14 },  // Entrée spécifique pour cas test
          { name: "Hernie discale cervicale post-traumatique - Syndrome rachidien pur (cervicalgies)", searchTerms: ["hernie discale cervicale post traumatique syndrome rachidien pur cervicalgies", "cervicalgies pur rachidien syndrome traumatique post cervicale discale hernie", "hernie discale", "discale cervicale", "cervicale post"], rate: [5, 15], rateCriteria: { low: "Douleurs occasionnelles, raideur minime.", high: "Douleurs quasi-permanentes, raideur marquée invalidante." } },
          { name: "Hernie discale cervicale post-traumatique - Avec névralgie cervico-brachiale (NCB)", searchTerms: ["hernie discale cervicale post traumatique avec névralgie cervico brachiale ncb", "ncb brachiale cervico névralgie avec traumatique post cervicale discale hernie", "hernie discale cervicale post traumatique névralgie cervico brachiale ncb", "hernie discale", "discale cervicale"], rate: [15, 30], rateCriteria: { low: "NCB intermittente, bien contrôlée par le traitement, sans déficit neurologique.", high: "NCB rebelle avec signes neurologiques objectifs (déficit moteur, sensitif, troubles trophiques)." } },
          { name: "Syndrome de Barré-Lieou (Syndrome sympathique cervical postérieur)", searchTerms: ["syndrome barré lieou syndrome sympathique cervical postérieur", "postérieur cervical sympathique syndrome lieou barré syndrome", "syndrome barré", "barré lieou", "lieou syndrome"], rate: [15, 40], description: "Syndrome sus-lésionnel après traumatisme cervical: céphalées, vertiges, troubles visuels (phosphènes, vision floue), acouphènes, troubles vaso-moteurs (flush, sueurs), nausées. Peut accompagner une cervicarthrose ou hernie discale cervicale.", rateCriteria: { low: "Vertiges positionnels occasionnels, céphalées intermittentes, sans retentissement majeur sur les activités.", medium: "Syndrome complet avec vertiges fréquents, céphalées quasi-quotidiennes, troubles visuels gênants, retentissement sur la conduite automobile.", high: "Syndrome invalidant permanent avec vertiges rotatoires, instabilité à la marche, céphalées rebelles, retentissement professionnel et social majeur." } },
          { name: "Hernie discale cervicale avec signes pyramidaux (sous-lésionnels)", searchTerms: ["hernie discale cervicale avec signes pyramidaux sous lésionnels", "lésionnels sous pyramidaux signes avec cervicale discale hernie", "hernie discale cervicale signes pyramidaux sous lésionnels", "hernie discale", "discale cervicale"], rate: [20, 50], description: "Compression médullaire cervicale avec début de myélopathie: hyperréflexie des membres inférieurs, signe de Babinski, troubles de la marche (spasticité débutante), troubles sensitifs proprioceptifs.", rateCriteria: { low: "Signes pyramidaux frustes (ROT vifs, Babinski unilatéral) sans gêne fonctionnelle majeure.", medium: "Signes pyramidaux nets avec troubles de la marche (démarche spasmodique débutante), maladresse des mains.", high: "Myélopathie cervicarthrosique confirmée avec tétraparésie spastique, troubles sphinctériens débutants, limitation fonctionnelle importante." } },
          { name: "Hernie discale lombaire post-traumatique - Syndrome rachidien pur (lombalgies)", searchTerms: ["hernie discale lombaire post traumatique syndrome rachidien pur lombalgies", "lombalgies pur rachidien syndrome traumatique post lombaire discale hernie", "hernie discale", "discale lombaire", "lombaire post"], rate: [5, 20], rateCriteria: { low: "Douleurs mécaniques pures, sans limitation majeure d'activité.", high: "Douleurs chroniques invalidantes avec retentissement sur la vie quotidienne et professionnelle." } },
          { name: "Hernie discale lombaire post-traumatique - Avec radiculalgie unilatérale (sciatique ou cruralgie)", searchTerms: ["hernie discale lombaire post traumatique avec radiculalgie unilatérale sciatique cruralgie", "hernie discale lombaire post traumatique avec radiculalgie unilatérale nerf cruralgie", "cruralgie sciatique unilatérale radiculalgie avec traumatique post lombaire discale hernie", "hernie discale lombaire post traumatique radiculalgie unilatérale sciatique cruralgie", "hernie discale"], rate: [10, 60], rateCriteria: { low: "Radiculalgie intermittente, signe de Lasègue modéré, pas de déficit neurologique objectif.", medium: "Radiculalgie fréquente avec signes déficitaires légers (hypoesthésie, diminution ROT), signe de Lasègue positif.", high: "Radiculalgie rebelle avec déficit moteur objectif (steppage, déficit quadricipital), amyotrophie, troubles trophiques, retentissement professionnel majeur." } },
          { name: "Hernie discale lombaire post-traumatique - Avec radiculalgie bilatérale (sciatique bilatérale)", searchTerms: ["hernie discale lombaire post traumatique avec radiculalgie bilatérale sciatique bilatérale", "hernie discale lombaire post traumatique avec radiculalgie bilatérale nerf bilatérale", "bilatérale sciatique bilatérale radiculalgie avec traumatique post lombaire discale hernie", "hernie discale lombaire post traumatique radiculalgie bilatérale sciatique bilatérale", "hernie discale"], rate: [40, 85], description: "Hernie discale volumineuse ou multiniveaux entraînant des douleurs radiculaires bilatérales avec signes neurologiques objectifs.", rateCriteria: { low: "Radiculalgies bilatérales intermittentes avec signes modérés (Lasègue bilatéral positif, hypoesthésies).", medium: "Radiculalgies bilatérales fréquentes avec déficits sensitivo-moteurs objectifs, limitation importante du périmètre de marche.", high: "Radiculalgies bilatérales permanentes avec déficits moteurs importants bilatéraux, troubles sphinctériens débutants (syndrome de la queue de cheval incomplet), invalidité majeure." } },
          { name: "Lombo-sacralgie par lésion discale - Séquelle de hernie discale opérée ou non", searchTerms: ["lombo sacralgie par lésion discale séquelle hernie discale opérée non", "non opérée discale hernie séquelle discale lésion par sacralgie lombo", "lombo sacralgie", "sacralgie par", "par lésion"], rate: 30, description: "Séquelles douloureuses lombaires avec ou sans irradiations radiculaires, après traitement d'une hernie discale (chirurgie ou traitement conservateur), avec raideur rachidienne et limitation fonctionnelle.", rateCriteria: { low: "Lombalgies et raideur modérées, douleurs mécaniques bien contrôlées.", high: "Lombalgies chroniques rebelles avec raideur marquée et irradiations radiculaires persistantes." } },
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
          { name: "Syndrome cervical chronique post-traumatique", searchTerms: ["syndrome cervical chronique post traumatique", "traumatique post chronique cervical syndrome", "syndrome cervical", "cervical chronique", "chronique post"], rate: 12 },  // Entrée spécifique pour cas test
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
          { name: "Lumbago post-traumatique - Légère raideur", searchTerms: ["lumbago post traumatique légère raideur", "raideur légère traumatique post lumbago", "lumbago post", "post traumatique", "traumatique légère"], rate: [0, 10], description: "Lombalgie aiguë post-traumatique avec raideur lombaire minime, sans signes radiculaires, mobilité conservée.", rateCriteria: { low: "Épisodes rares de lombalgies, raideur minime, pas de limitation d'activité.", high: "Lombalgies mécaniques récurrentes, raideur modérée, limitation des efforts de soulèvement." } },
          { name: "Lumbago post-traumatique - Raideur marquée", searchTerms: ["lumbago post traumatique raideur marquée", "marquée raideur traumatique post lumbago", "lumbago post", "post traumatique", "traumatique raideur"], rate: [15, 20], description: "Lombalgie chronique avec raideur lombaire nette, limitation de la flexion du tronc, sans signes radiculaires.", rateCriteria: { low: "Raideur nette mais lombalgies contrôlées par le traitement.", high: "Raideur importante avec limitation fonctionnelle dans les activités quotidiennes et professionnelles." } },
          { name: "Lumbago post-traumatique - Raideur très importante", searchTerms: ["lumbago post traumatique raideur très importante", "importante très raideur traumatique post lumbago", "lumbago post", "post traumatique", "traumatique raideur"], rate: 35, description: "Lombalgie chronique sévère avec raideur lombaire majeure (DDS > 40 cm, Schober limité), sans signes radiculaires mais avec retentissement professionnel important." },
          { name: "Lumbago post-traumatique - Avec signes radiculaires", searchTerms: ["lumbago post traumatique avec signes radiculaires", "radiculaires signes avec traumatique post lumbago", "lumbago post traumatique signes radiculaires", "lumbago post", "post traumatique"], rate: [35, 50], description: "Lombalgie chronique avec irritation radiculaire (douleurs à irradiation crurale ou sciatique, troubles sensitifs radiculaires).", rateCriteria: { low: "Irradiations radiculaires intermittentes sans déficit neurologique objectif.", high: "Radiculalgies fréquentes avec signes déficitaires objectifs, retentissement professionnel majeur." } },
          { name: "Syndrome douloureux rachidien réflexe post-traumatique", searchTerms: ["syndrome douloureux rachidien réflexe post traumatique", "traumatique post réflexe rachidien douloureux syndrome", "syndrome douloureux", "douloureux rachidien", "rachidien réflexe"], rate: [15, 20], description: "Syndrome douloureux lombaire ou cervical de longue durée de type syndrome réflexe (douleurs à type de brûlure, phénomènes vaso-moteurs: sueurs, lipothymies, dermographisme, hypotension orthostatique, douleur à la pression du plexus solaire) après choc direct ou effort violent.", rateCriteria: { low: "Syndrome douloureux avec éléments vaso-moteurs objectivés, bien contrôlé par réflexothérapie.", high: "Syndrome réflexe rebelle avec perturbations vaso-motrices importantes et retentissement majeur sur les activités." } },
          { name: "Fracture des apophyses transverses", searchTerms: ["fracture des apophyses transverses", "transverses apophyses des fracture", "fracture apophyses transverses", "fracture des", "des apophyses"], rate: [5, 25] },
          { name: "Raideur rachidienne post-immobilisation, sans douleurs", searchTerms: ["raideur rachidienne post immobilisation, sans douleurs", "douleurs sans immobilisation, post rachidienne raideur", "raideur rachidienne post immobilisation, douleurs", "raideur rachidienne", "rachidienne post"], rate: [1, 15] },
          { name: "Raideur rachidienne avec douleurs ostéo-articulaires", searchTerms: ["raideur rachidienne avec douleurs ostéo articulaires", "articulaires ostéo douleurs avec rachidienne raideur", "raideur rachidienne douleurs ostéo articulaires", "raideur rachidienne", "rachidienne avec"], rate: [15, 25] },
          { name: "Raideur rachidienne avec douleurs névralgiques", searchTerms: ["raideur rachidienne avec douleurs névralgiques", "névralgiques douleurs avec rachidienne raideur", "raideur rachidienne douleurs névralgiques", "raideur rachidienne", "rachidienne avec"], rate: [20, 40] },
          { name: "Raideur rachidienne avec déviation très prononcée", searchTerms: ["raideur rachidienne avec déviation très prononcée", "prononcée très déviation avec rachidienne raideur", "raideur rachidienne déviation très prononcée", "raideur rachidienne", "rachidienne avec"], rate: [40, 45] },
          { name: "Raideur rachis lombaire - DDS 20-40 cm", searchTerms: ["raideur rachis lombaire dds", "dds lombaire rachis raideur", "raideur rachis", "rachis lombaire", "lombaire dds"], rate: [5, 15], description: "Raideur lombaire mesurée par distance doigts-sol (DDS) entre 20 et 40 cm." },
          { name: "Raideur rachis cervical - DMS 10-15 cm", searchTerms: ["raideur rachis cervical dms", "dms cervical rachis raideur", "raideur rachis", "rachis cervical", "cervical dms"], rate: [8, 18], description: "Raideur cervicale mesurée par distance menton-sternum (DMS) entre 10 et 15 cm." },
          { name: "Raideur rachis post-tassement avec douleur", searchTerms: ["raideur rachis post tassement avec douleur", "douleur avec tassement post rachis raideur", "raideur rachis post tassement douleur", "raideur rachis", "rachis post"], rate: [10, 20], description: "Séquelles de tassement vertébral avec raideur secondaire et douleurs chroniques." },
          { name: "Raideur rachis dorsolombaire - Limitation sévère", searchTerms: ["raideur rachis dorsolombaire limitation sévère", "raideur rachis dorsolombaire raideur sévère", "sévère limitation dorsolombaire rachis raideur", "raideur rachis", "rachis dorsolombaire"], rate: [12, 25], description: "Raideur étendue du rachis dorsolombaire avec limitation fonctionnelle importante." },
          { name: "Raideur rachis cervical - DMS + inclinaisons", searchTerms: ["raideur rachis cervical dms inclinaisons", "inclinaisons dms cervical rachis raideur", "raideur rachis", "rachis cervical", "cervical dms"], rate: [10, 20], description: "Raideur cervicale avec limitation de la DMS et des inclinaisons latérales." },
          { name: "Raideur rachis avec limitation fonctionnelle", searchTerms: ["raideur rachis avec limitation fonctionnelle", "raideur rachis avec raideur fonctionnelle", "fonctionnelle limitation avec rachis raideur", "raideur rachis limitation fonctionnelle", "raideur rachis"], rate: [5, 18], description: "Raideur rachidienne avec retentissement sur le périmètre de marche ou les activités." },
          { name: "Séquelles d'arthrodèse vertébrale (fusion) avec raideur et douleurs résiduelles", searchTerms: ["séquelles d'arthrodèse vertébrale fusion avec raideur douleurs résiduelles", "résiduelles douleurs raideur avec fusion vertébrale d'arthrodèse séquelles", "séquelles d'arthrodèse vertébrale fusion raideur douleurs résiduelles", "séquelles d'arthrodèse", "d'arthrodèse vertébrale"], rate: [15, 40], rateCriteria: { low: "Fusion d'un seul niveau, indolore, avec raideur segmentaire modérée.", high: "Fusion multi-étagée, avec douleurs chroniques et raideur importante limitant les activités professionnelles." } },
          { name: "Scoliose ou cyphose douloureuse post-traumatique", searchTerms: ["scoliose cyphose douloureuse post traumatique", "traumatique post douloureuse cyphose scoliose", "scoliose cyphose", "cyphose douloureuse", "douloureuse post"], rate: [10, 30], rateCriteria: { low: "Déformation légère, douleurs occasionnelles.", high: "Déformation marquée avec retentissement fonctionnel et respiratoire." } },
          { name: "Myélopathie cervicarthrosique post-traumatique", searchTerms: ["myélopathie cervicarthrosique post traumatique", "traumatique post cervicarthrosique myélopathie", "myélopathie cervicarthrosique", "cervicarthrosique post", "post traumatique"], rate: [20, 70], description: "Compression lente de la moelle épinière cervicale due à une arthrose accélérée par un traumatisme.", rateCriteria: { low: "Signes neurologiques discrets (troubles de la marche, hyperréflexie) sans limitation majeure des activités.", high: "Syndrome pyramidal et/ou tétraparésie spastique invalidante avec troubles sphinctériens." } },
          { name: "Ankylose vertébrale post-traumatique (Spondylite, Kummel-Verneuil, Cyphose)", searchTerms: ["ankylose vertébrale post traumatique spondylite, kummel verneuil, cyphose", "cyphose verneuil, kummel spondylite, traumatique post vertébrale ankylose", "ankylose vertébrale", "vertébrale post", "post traumatique"], rate: [20, 80] },
          { name: "Spondylolisthésis modifié par traumatisme - Bon résultat thérapeutique", searchTerms: ["spondylolisthésis modifié par traumatisme bon résultat thérapeutique", "thérapeutique résultat bon traumatisme par modifié spondylolisthésis", "spondylolisthésis modifié", "modifié par", "par traumatisme"], rate: [5, 10], description: "Spondylolisthésis stabilisé après greffe osseuse ou arthrodèse réussie, avec peu de douleurs et fonction satisfaisante." },
          { name: "Spondylolisthésis modifié par traumatisme - Échec thérapeutique ou inopérable", searchTerms: ["spondylolisthésis modifié par traumatisme échec thérapeutique inopérable", "inopérable thérapeutique échec traumatisme par modifié spondylolisthésis", "spondylolisthésis modifié", "modifié par", "par traumatisme"], rate: [25, 30], description: "Spondylolisthésis avec algies rebelles, lordose et scoliose compensatrice, gêne importante de la marche, greffe impossible ou ayant échoué.", rateCriteria: { low: "Douleurs chroniques contrôlées, limitation modérée de la marche.", high: "Algies importantes rebelles, troubles statiques majeurs (lordose, scoliose), limitation sévère de la marche et du port de charges." } },
          { name: "Rhumatisme vertébral (lombalgie, cervicalgie) avec raideur", searchTerms: ["rhumatisme vertébral lombalgie, cervicalgie avec raideur", "rhumatisme rachis lombalgie, syndrome cervical avec raideur", "raideur avec cervicalgie lombalgie, vertébral rhumatisme", "rhumatisme vertébral lombalgie, cervicalgie raideur", "rhumatisme vertébral"], rate: [5, 25] },
          { name: "Rhumatisme vertébral avec douleurs névralgiques irradiées (névrite brachiale ou crurale)", searchTerms: ["rhumatisme vertébral avec douleurs névralgiques irradiées névrite brachiale crurale", "rhumatisme rachis avec douleurs névralgiques irradiées névrite brachiale crurale", "crurale brachiale névrite irradiées névralgiques douleurs avec vertébral rhumatisme", "rhumatisme vertébral douleurs névralgiques irradiées névrite brachiale crurale", "rhumatisme vertébral"], rate: [20, 40], description: "Rhumatisme vertébral avec irradiations névralgiques le long des membres supérieurs ou inférieurs (forme de névrite brachiale ou crurale)." },
          { name: "Spondylose rhizomélique (atteinte lombaire)", searchTerms: ["spondylose rhizomélique atteinte lombaire", "lombaire atteinte rhizomélique spondylose", "spondylose rhizomélique", "rhizomélique atteinte", "atteinte lombaire"], rate: [20, 30] },
          { name: "Spondylose rhizomélique (atteinte de tout le rachis et hanches)", searchTerms: ["spondylose rhizomélique atteinte tout rachis hanches", "hanches rachis tout atteinte rhizomélique spondylose", "spondylose rhizomélique", "rhizomélique atteinte", "atteinte tout"], rate: [30, 80] },
          { name: "Séquelles d'ostéo-arthrite vertébrale infectieuse (Mal de Pott, ostéites)", searchTerms: ["séquelles d'ostéo arthrite vertébrale infectieuse mal pott, ostéites", "ostéites pott, mal infectieuse vertébrale arthrite d'ostéo séquelles", "séquelles d'ostéo", "d'ostéo arthrite", "arthrite vertébrale"], rate: [20, 75], description: "Aggravation post-traumatique d'une ostéite vertébrale tuberculeuse ou non tuberculeuse: aggravation de la gibbosité, raideur rachidienne importante, signes médullaires éventuels.", rateCriteria: { low: "Raideur rachidienne localisée avec douleurs modérées, sans gibbosité ni signes neurologiques.", medium: "Raideur importante avec gibbosité (cyphose post-Pott), douleurs chroniques, limitation fonctionnelle marquée.", high: "Gibbosité majeure avec signes de compression médullaire (paraparésie, troubles sphinctériens), invalidité sévère." } },
          { name: "Attitude vicieuse après affection vertébrale douloureuse prolongée (sciatique, etc.)", searchTerms: ["attitude vicieuse après affection vertébrale douloureuse prolongée sciatique, etc.", "etc. sciatique, prolongée douloureuse vertébrale affection après vicieuse attitude", "attitude vicieuse", "vicieuse après", "après affection"], rate: [5, 15], description: "Déformation posturale secondaire à une affection vertébrale chronique (ex: attitude antalgique après sciatique prolongée), selon persistance ou non des douleurs.", rateCriteria: { low: "Attitude vicieuse modérée, douleurs résiduelles minimes.", high: "Déformation posturale importante avec douleurs persistantes et raideur associée." } },
          { name: "Torticolis post-traumatique (contracture cervicale)", searchTerms: ["torticolis post traumatique contracture cervicale", "cervicale contracture traumatique post torticolis", "torticolis post", "post traumatique", "traumatique contracture"], rate: [8, 15], description: "Attitude vicieuse cervicale avec rotation et inclinaison permanente de la tête, par contracture musculaire post-traumatique (sans lésion neurologique centrale).", rateCriteria: { low: "Torticolis modéré, partiellement réductible, avec gêne esthétique et limitation modérée des rotations cervicales.", high: "Torticolis sévère, irréductible, avec limitation majeure de la mobilité cervicale et retentissement esthétique important." } },
        ]
      },
      {
        name: "Bassin - Fractures Partielles (Arc Antérieur)",
        injuries: [
          { name: "Fracture isolée aile iliaque sans déplacement", searchTerms: ["fracture isolée aile iliaque sans déplacement", "déplacement sans iliaque aile isolée fracture", "fracture isolée aile iliaque déplacement", "fracture isolée", "isolée aile"], rate: [8, 12], description: "Fracture simple de l'aile iliaque, IPP souvent insignifiante si traitée fonctionnellement." },
          { name: "Fracture branche horizontale du pubis (unilatérale)", searchTerms: ["fracture branche horizontale pubis unilatérale", "unilatérale pubis horizontale branche fracture", "fracture branche", "branche horizontale", "horizontale pubis"], rate: [10, 15], description: "Fracture isolée d'une branche horizontale, traitement fonctionnel dès le début." },
          { name: "Fracture branche ischio-pubienne (unilatérale)", searchTerms: ["fracture branche ischio pubienne unilatérale", "unilatérale pubienne ischio branche fracture", "fracture branche", "branche ischio", "ischio pubienne"], rate: [10, 15], description: "Fracture isolée d'une branche ischio-pubienne, traitement fonctionnel." },
          { name: "Fracture arc antérieur (branche horizontale + ischio-pubienne même côté)", searchTerms: ["fracture arc antérieur branche horizontale ischio pubienne même côté", "côté même pubienne ischio horizontale branche antérieur arc fracture", "fracture arc branche horizontale ischio pubienne même côté", "fracture arc", "arc antérieur"], rate: [15, 18], description: "Fracture combinée des branches du même côté." },
          { name: "Fracture branches horizontales bilatérales ± branche ischio-pubienne", searchTerms: ["fracture branches horizontales bilatérales branche ischio pubienne", "pubienne ischio branche bilatérales horizontales branches fracture", "fracture branches", "branches horizontales", "horizontales bilatérales"], rate: [20, 25], description: "Fracture des deux branches horizontales du pubis, associée ou non à une branche ischio-pubienne." },
          { name: "Fracture partielles du bassin (aile iliaque, branches pubiennes, ischio-pubiennes) - Barème global", searchTerms: ["fracture partielles bassin aile iliaque, branches pubiennes, ischio pubiennes barème global", "global barème pubiennes ischio pubiennes, branches iliaque, aile bassin partielles fracture", "fracture partielles", "partielles bassin", "bassin aile"], rate: [8, 18], description: "Fourchette globale du barème officiel pour les fractures partielles." },
        ]
      },
      {
        name: "Bassin - Fractures Doubles Verticales",
        injuries: [
          { 
            name: "Fracture double verticale (interruption ceinture antérieure et postérieure)", 
            searchTerms: ["fracture double verticale interruption ceinture antérieure postérieure", "postérieure antérieure ceinture interruption verticale double fracture", "fracture double", "double verticale", "verticale interruption"], rate: [25, 40],
            description: "Interruption de la ceinture pelvienne en AVANT (fracture du pubis) ET en ARRIÈRE (fracture du sacrum ou des jonctions sacro-iliaques) du même côté. Instabilité majeure de l'anneau pelvien.",
            rateCriteria: {
              low: "Fracture consolidée avec bonne stabilité, instabilité minime, marche autonome sans aide, douleurs contrôlées.",
              medium: "Instabilité modérée du bassin, boiterie, douleurs à l'effort et à la marche prolongée, nécessité ceinture pelvienne.",
              high: "Instabilité pelvienne sévère, marche très difficile nécessitant aide technique, douleurs chroniques importantes, limitation fonctionnelle majeure."
            }
          },
        ]
      },
      {
        name: "Bassin - Fractures Arc Postérieur (Sacrum)",
        injuries: [
          { 
            name: "Fracture aileron sacrum isolée", 
            searchTerms: ["fracture aileron sacrum isolée", "isolée sacrum aileron fracture", "fracture aileron", "aileron sacrum", "sacrum isolée"], rate: [5, 10],
            description: "Fracture simple de l'aileron sacré sans troubles nerveux ni atteinte articulaire sacro-iliaque importante. IPP très réduite." 
          },
          { 
            name: "Fracture sacrum verticale ou transversale simple (sans troubles nerveux)", 
            searchTerms: ["fracture sacrum verticale transversale simple sans troubles nerveux", "fracture sacrum verticale transversale simple sans troubles nerf", "nerveux troubles sans simple transversale verticale sacrum fracture", "fracture sacrum verticale transversale simple troubles nerveux", "fracture sacrum"], rate: [15, 40],
            description: "Fracture du corps du sacrum sans complication neurologique. Évaluation selon douleurs, limitation fonctionnelle et retentissement sur statique.",
            rateCriteria: {
              low: "Fracture consolidée sans douleurs importantes, bonne mobilité rachis et membres.",
              medium: "Douleurs sacro-iliaques chroniques, limitation position assise, gêne marche prolongée.",
              high: "Douleurs chroniques invalidantes, limitation majeure position assise et marche, retentissement important sur rachis et statique."
            }
          },
          { 
            name: "Fracture sacrum avec syndrome de la queue de cheval (complet ou partiel)", 
            searchTerms: ["fracture sacrum avec syndrome queue cheval complet partiel", "partiel complet cheval queue syndrome avec sacrum fracture", "fracture sacrum syndrome queue cheval complet partiel", "fracture sacrum", "sacrum avec"], rate: [60, 80],
            description: "Fracture du sacrum avec compression de la moelle sacrée ou de la queue de cheval : douleurs radiculaires, anesthésie en selle (territoire S3-S4-S5-Co), troubles sphinctériens (incontinence urinaire ~45%, incontinence fécale ~50%), troubles génitaux (impuissance ~15% + dépression psychique), paralysies et déficits moteurs membres inférieurs, algies chroniques. Syndrome gravissime nécessitant évaluation par calcul séparé de chaque atteinte (troubles moteurs, sensitifs, sphinctériens, génitaux) sur validité restante.",
            rateCriteria: {
              low: "Syndrome partiel avec récupération significative, incontinence occasionnelle contrôlable, autonomie préservée, vie sociale possible.",
              medium: "Syndrome modéré à sévère, incontinence fréquente nécessitant protections, impotence sexuelle, limitation déplacements, retentissement psychologique.",
              high: "Syndrome complet, incontinence urinaire et fécale permanente, impotence sexuelle totale, paralysies, douleurs chroniques sévères, dépendance majeure, isolement social."
            }
          },
          { 
            name: "Fracture sacrum avec troubles sphinctériens isolés (sans paralysie complète)", 
            searchTerms: ["fracture sacrum avec troubles sphinctériens isolés sans paralysie complète", "complète paralysie sans isolés sphinctériens troubles avec sacrum fracture", "fracture sacrum troubles sphinctériens isolés paralysie complète", "fracture sacrum", "sacrum avec"], rate: [45, 60],
            description: "Troubles de la continence urinaire (45%) ou fécale (50%) après fracture du sacrum, sans syndrome complet de la queue de cheval. Évaluer séparément incontinence urinaire et fécale si association.",
            rateCriteria: {
              low: "Incontinence partielle, contrôle possible avec rééducation et protections légères.",
              high: "Incontinence majeure permanente, retentissement social et psychologique important."
            }
          },
          { 
            name: "Fracture sacrum avec impuissance génitale post-traumatique", 
            searchTerms: ["fracture sacrum avec impuissance génitale post traumatique", "traumatique post génitale impuissance avec sacrum fracture", "fracture sacrum impuissance génitale post traumatique", "fracture sacrum", "sacrum avec"], rate: [15, 25],
            description: "Impuissance génitale suite à fracture du sacrum (atteinte plexus honteux S2-S3-S4). On indemnise également la dépression psychique réactionnelle associée.",
            rateCriteria: {
              low: "Troubles érectiles partiels, vie intime possible avec adaptations.",
              high: "Impuissance totale, retentissement psychologique majeur, dépression."
            }
          },
        ]
      },
      {
        name: "Bassin - Fractures du Cotyle (Détaillé)",
        injuries: [
          { 
            name: "Fracture sourcil cotyloïdien sans déplacement de la tête fémorale", 
            searchTerms: ["fracture sourcil cotyloïdien sans déplacement tête fémorale", "fémorale tête déplacement sans cotyloïdien sourcil fracture", "fracture sourcil cotyloïdien déplacement tête fémorale", "fracture sourcil", "sourcil cotyloïdien"], rate: [8, 15],
            description: "Fracture du rebord du cotyle (sourcil) sans déplacement de la tête fémorale, ou luxation réduite précocement et fragment cotyloïdien remis en place et vissé. Peut s'accompagner d'une raideur modérée de la hanche. Surveillance arthrose à long terme.",
            rateCriteria: {
              low: "Consolidation parfaite, mobilité hanche préservée, pas de douleur.",
              medium: "Raideur modérée hanche, douleurs à l'effort, limitation abduction.",
              high: "Raideur importante, douleurs chroniques, signes d'arthrose précoce."
            }
          },
          { name: "Fracture du cotyle sans déplacement, hanche congruente", searchTerms: ["fracture cotyle sans déplacement, hanche congruente", "congruente hanche déplacement, sans cotyle fracture", "fracture cotyle déplacement, hanche congruente", "fracture cotyle", "cotyle sans"], rate: [10, 20] },
          { 
            name: "Fissure cavité cotyloïde (sans déplacement) - Arthropathie consécutive", 
            searchTerms: ["fissure cavité cotyloïde sans déplacement arthropathie consécutive", "consécutive arthropathie déplacement sans cotyloïde cavité fissure", "fissure cavité cotyloïde déplacement arthropathie consécutive", "fissure cavité", "cavité cotyloïde"], rate: [20, 25],
            description: "Fissure de la cavité cotyloïde ayant entraîné une arthropathie secondaire." 
          },
          { name: "Fracture du cotyle - Avec séquelles articulaires", searchTerms: ["fracture cotyle avec séquelles articulaires", "articulaires séquelles avec cotyle fracture", "fracture cotyle séquelles articulaires", "fracture cotyle", "cotyle avec"], rate: [25, 45], rateCriteria: { low: "Limitation mobilité légère, pas de boiterie, autonomie complète.", medium: "Limitation mobilité modérée, boiterie légère, appui mono-podal instable, accroupissement difficile.", high: "Limitation mobilité sévère, boiterie marquée, instabilité majeure, quasi-impotence fonctionnelle." } },
          { 
            name: "Fracture cotyle avec luxation centrale, raccourcissement, tendance à l'ankylose", 
            searchTerms: ["fracture cotyle avec luxation centrale, raccourcissement, tendance l'ankylose", "l'ankylose tendance raccourcissement, centrale, luxation avec cotyle fracture", "fracture cotyle luxation centrale, raccourcissement, tendance l'ankylose", "fracture cotyle", "cotyle avec"], rate: [35, 50],
            description: "Fracture du cotyle avec déplacement de la tête fémorale, raccourcissement du membre, évolution vers l'ankylose ou raideur sévère." 
          },
          { 
            name: "Fracture cotyle par enfoncement du fond avec protrusion intra-pelvienne de la tête fémorale", 
            searchTerms: ["fracture cotyle par enfoncement fond avec protrusion intra pelvienne tête fémorale", "fémorale tête pelvienne intra protrusion avec fond enfoncement par cotyle fracture", "fracture cotyle par enfoncement fond protrusion intra pelvienne tête fémorale", "fracture cotyle", "cotyle par"], rate: [60, 70],
            description: "Fracture par enfoncement du fond du cotyle avec protrusion (migration) de la tête fémorale dans le bassin. Déplacement persistant de la tête fémorale. L'infirmité peut être plus importante que celle correspondant à une ankylose de la hanche en bonne position. Cas gravissime.",
            rateCriteria: {
              low: "Protrusion modérée, mobilité résiduelle partielle, marche avec aide.",
              high: "Protrusion majeure, quasi-ankylose en mauvaise position, impotence fonctionnelle > ankylose simple, marche très difficile."
            }
          },
          { name: "Fracture du cotyle avec arthrose post-traumatique", description: "Évaluer comme une coxarthrie (voir Membres Inférieurs)", rate: [15, 40] },
        ]
      },
      {
        name: "Bassin - Fracture du Coccyx",
        injuries: [
          { 
            name: "Fracture coccyx - Simple trouvaille radiographique sans symptômes", 
            searchTerms: ["fracture coccyx simple trouvaille radiographique sans symptômes", "symptômes sans radiographique trouvaille simple coccyx fracture", "fracture coccyx simple trouvaille radiographique symptômes", "fracture coccyx", "coccyx simple"], rate: 0,
            description: "Fracture du coccyx découverte fortuitement à la radiographie, sans aucune douleur ni gêne fonctionnelle. IPP = 0%. IMPORTANT : Extrême variabilité des images radiologiques pour les coccyx normaux. Prudence sur imputabilité si examen radio non fait immédiatement après accident." 
          },
          { 
            name: "Fracture du coccyx avec coccygodynie (douleurs fonctionnelles)", 
            searchTerms: ["fracture coccyx avec coccygodynie douleurs fonctionnelles", "fonctionnelles douleurs coccygodynie avec coccyx fracture", "fracture coccyx coccygodynie douleurs fonctionnelles", "fracture coccyx", "coccyx avec"], rate: [5, 20],
            description: "Fracture/luxation du coccyx avec tiraillements lors de la flexion du tronc, douleurs position assise, gêne usage bicyclette. Taux moyen première évaluation ~8%, car large amélioration à escompter après deux années. La coccygodynie isolée sans lésions anatomiques relève souvent d'un syndrome névrotique. SUSPICION si persiste > 1 an.",
            rateCriteria: {
              low: "Douleurs modérées en position assise prolongée uniquement, amélioration progressive.",
              medium: "Douleurs régulières en position assise, gêne vie quotidienne et professionnelle, utilisation coussin nécessaire.",
              high: "Douleurs invalidantes quasi-permanentes, position assise impossible > 15-20 minutes, retentissement professionnel majeur. RARE."
            }
          },
        ]
      },
      {
        name: "Bassin - Articulations Sacro-iliaques",
        injuries: [
          { 
            name: "Diastasis sacro-iliaque (mobilité anormale du sacrum)", 
            searchTerms: ["diastasis sacro iliaque mobilité anormale sacrum", "sacrum anormale mobilité iliaque sacro diastasis", "diastasis sacro", "sacro iliaque", "iliaque mobilité"], rate: [40, 45],
            description: "Le sacrum devient mal fixé entre les deux os iliaques : il tourne, bascule, prend une position oblique asymétrique. Retentissement important sur l'équilibre du rachis et la statique des membres inférieurs (A. Massart). Manœuvres diagnostiques : écartement et rapprochement des ailes iliaques, écartement contrarié des cuisses fléchies sur bassin, hyperextension d'une cuisse (autre fixée en flexion). Selon l'importance des déplacements sacro-iliaques, IPP peut aller de 15 à 45%.",
            rateCriteria: {
              low: "Diastasis modéré, mobilité anormale discrète détectable aux manœuvres, douleurs contrôlées, marche normale.",
              medium: "Diastasis modéré à sévère, instabilité palpable, douleurs à l'effort, gêne marche prolongée, retentissement rachis (lombalgies).",
              high: "Diastasis sévère, instabilité majeure du sacrum, douleurs chroniques importantes, impossibilité port de fardeaux, retentissement majeur sur statique rachis et membres inférieurs, marche rapidement pénible."
            }
          },
          { 
            name: "Arthropathie chronique sacro-iliaque post-traumatique", 
            searchTerms: ["arthropathie chronique sacro iliaque post traumatique", "traumatique post iliaque sacro chronique arthropathie", "arthropathie chronique", "chronique sacro", "sacro iliaque"], rate: [15, 25],
            description: "Séquelles post-traumatiques des articulations sacro-iliaques (disjonction, entorse). Atteinte portée à la statique pelvienne (les sacro-iliaques transmettent tout le poids du corps aux membres inférieurs). Douleurs, gêne de la marche, accroupissement quasi-impossible, difficultés port des fardeaux, lumbago symptomatique. Radios souvent négatives. Manœuvres diagnostiques positives.",
            rateCriteria: {
              low: "Douleurs modérées à l'effort, limitation partielle activités.",
              high: "Douleurs chroniques importantes, marche rapidement pénible, impossibilité porter fardeaux, accroupissement impossible."
            }
          },
        ]
      },
      {
        name: "Bassin - Symphyse Pubienne",
        injuries: [
          { 
            name: "Disjonction traumatique simple de la symphyse pubienne", 
            searchTerms: ["disjonction traumatique simple symphyse pubienne", "pubienne symphyse simple traumatique disjonction", "disjonction traumatique", "traumatique simple", "simple symphyse"], rate: [10, 25],
            description: "Disjonction de la symphyse pubienne avec retentissement sacro-iliaque. Manque de résistance de la ceinture pelvienne : marche rapidement pénible, impossibilité de porter des fardeaux, douleurs.",
            rateCriteria: {
              low: "Disjonction minime, douleurs légères à l'effort, autonomie préservée.",
              high: "Disjonction importante, instabilité pelvienne, marche pénible, douleurs chroniques, impossibilité porter fardeaux."
            }
          },
          { 
            name: "Luxation irréductible du pubis ou relâchement étendu de la symphyse pubienne", 
            searchTerms: ["luxation irréductible pubis relâchement étendu symphyse pubienne", "pubienne symphyse étendu relâchement pubis irréductible luxation", "luxation irréductible", "irréductible pubis", "pubis relâchement"], rate: [10, 25],
            description: "Luxation pubienne persistante ou relâchement important avec instabilité de la symphyse." 
          },
          { 
            name: "Disjonction de la symphyse pubienne avec fracture du bassin", 
            searchTerms: ["disjonction symphyse pubienne avec fracture bassin", "bassin fracture avec pubienne symphyse disjonction", "disjonction symphyse pubienne fracture bassin", "disjonction symphyse", "symphyse pubienne"], rate: 0,
            description: "Note spéciale : Lorsque disjonction symphysaire associée à fracture du bassin, la fracture et le tableau clinique laissent à l'arrière-plan la luxation symphysaire. IPP calculée sur les séquelles de la fracture principalement." 
          },
        ]
      },
      {
        name: "Bassin - Complications Neurologiques Post-Fracture",
        injuries: [
          { 
            name: "Irritation ou atteinte du nerf obturateur (cal vicieux canal sous-pubien)", 
            searchTerms: ["irritation atteinte nerf obturateur cal vicieux canal sous pubien", "pubien sous canal vicieux cal obturateur nerf atteinte irritation", "irritation atteinte", "atteinte nerf", "nerf obturateur"], rate: [10, 25],
            description: "Atteinte du nerf obturateur par un cal vicieux au niveau du canal sous-pubien. Topographie des douleurs, atrophie musculaire des adducteurs, zones d'anesthésie de la face interne de la cuisse.",
            rateCriteria: {
              low: "Douleurs modérées, paresthésies, déficit moteur léger.",
              high: "Douleurs chroniques sévères, atrophie musculaire marquée, déficit moteur important des adducteurs."
            }
          },
          { 
            name: "Atteinte des racines nerveuses au niveau de l'échancrure sciatique", 
            searchTerms: ["atteinte des racines nerveuses niveau l'échancrure sciatique", "atteinte des racines nerveuses niveau l'échancrure nerf", "sciatique l'échancrure niveau nerveuses racines des atteinte", "atteinte racines nerveuses niveau l'échancrure sciatique", "atteinte des"], rate: [20, 40],
            description: "Atteinte des racines nerveuses par des fragments osseux au niveau de l'échancrure sciatique. Topographie des douleurs, atrophie musculaire, paralysies partielles, zones d'anesthésie, atteinte du réflexe achilléen. Évaluation selon gravité atteinte nerveuse.",
            rateCriteria: {
              low: "Douleurs radiculaires modérées, paresthésies, déficit moteur léger.",
              medium: "Douleurs chroniques, déficit moteur modéré, atrophie musculaire visible.",
              high: "Douleurs neuropathiques sévères, paralysie partielle, atrophie importante, retentissement fonctionnel majeur."
            }
          },
        ]
      },
      {
        name: "Bassin - Complications Urologiques Post-Fracture",
        injuries: [
          { 
            name: "Troubles urinaires post-fracture bassin (rupture vessie ou urètre)", 
            searchTerms: ["troubles urinaires post fracture bassin rupture vessie urètre", "urètre vessie rupture bassin fracture post urinaires troubles", "troubles urinaires", "urinaires post", "post fracture"], rate: [20, 60],
            description: "Troubles urinaires pouvant résulter d'une rupture de la vessie ou de l'urètre lors d'une fracture du bassin. Évaluer selon : rétrécissement de l'urètre, cystite chronique, phénomènes d'incontinence, retentissement rénal. Voir également tableau détaillé appareil urinaire page 175 du barème officiel.",
            rateCriteria: {
              low: "Rétrécissement urétral mineur traité avec succès, gêne urinaire modérée intermittente, pas de retentissement rénal.",
              medium: "Rétrécissement urétral nécessitant dilatations répétées, cystite récidivante, incontinence d'effort, gêne vie quotidienne.",
              high: "Rétrécissement urétral sévère, incontinence urinaire permanente nécessitant protections, cystites répétées, retentissement rénal (insuffisance rénale débutante), retentissement social et psychologique majeur."
            }
          },
          { 
            name: "Incontinence urinaire post-fracture bassin", 
            searchTerms: ["incontinence urinaire post fracture bassin", "bassin fracture post urinaire incontinence", "incontinence urinaire", "urinaire post", "post fracture"], rate: [40, 50],
            description: "Incontinence urinaire permanente après rupture vésicale ou urétrale lors de fracture du bassin. Barème indicatif : incontinence urinaire ~45%." 
          },
        ]
      },
      {
        name: "Bassin - Complications Vasculaires et Digestives",
        injuries: [
          { 
            name: "Hématomes sous-péritonéaux ou pelviens avec troubles fonctionnels", 
            searchTerms: ["hématomes sous péritonéaux pelviens avec troubles fonctionnels", "fonctionnels troubles avec pelviens péritonéaux sous hématomes", "hématomes sous péritonéaux pelviens troubles fonctionnels", "hématomes sous", "sous péritonéaux"], rate: [10, 30],
            description: "Hématomes sous-péritonéaux ou pelviens pouvant provoquer : 1) troubles intestinaux persistants, 2) troubles de la circulation veineuse entraînant œdème chronique du membre inférieur.",
            rateCriteria: {
              low: "Troubles digestifs modérés intermittents ou œdème léger d'un membre.",
              medium: "Troubles digestifs fréquents (constipation, douleurs) ou œdème modéré nécessitant contention.",
              high: "Troubles digestifs chroniques invalidants ou œdème sévère bilatéral, troubles trophiques."
            }
          },
          { 
            name: "Œdème chronique d'un membre inférieur post-hématome pelvien", 
            searchTerms: ["œdème chronique d'un membre inférieur post hématome pelvien", "pelvien hématome post inférieur membre d'un chronique œdème", "œdème chronique", "chronique d'un", "d'un membre"], rate: [10, 20],
            description: "Œdème chronique d'un membre inférieur par troubles de la circulation veineuse suite à hématome pelvien." 
          },
        ]
      },
      {
        name: "Bassin - Incidence Obstétricale (Jeunes Femmes)",
        injuries: [
          { 
            name: "Fracture du bassin chez jeune femme - Incidence obstétricale", 
            searchTerms: ["fracture bassin chez jeune femme incidence obstétricale", "obstétricale incidence femme jeune chez bassin fracture", "fracture bassin", "bassin chez", "chez jeune"], rate: 0,
            description: "NOTE MÉDICO-LÉGALE IMPORTANTE : Chez une jeune fille ou jeune femme, la fracture du bassin comporte l'appréciation de l'incidence obstétricale. Nécessité de RADIOPELVIMÉTRIE pour évaluer la capacité du bassin. L'accouchement par les voies naturelles reste le plus souvent possible. Sur 19 cas étudiés (Thèse J. Rebon, Paris 1967), seulement 4 césariennes ont été faites en raison du rétrécissement lié directement à la fracture du bassin. IPP : pas de majoration systématique, mais MENTION OBLIGATOIRE dans le rapport d'expertise de l'évaluation obstétricale et de la radiopelvimétrie si patiente en âge de procréer." 
          },
        ]
      },
      {
        name: "Bassin - Notes Importantes du Barème Officiel",
        injuries: [
        ]
      },
      {
        name: "Troubles Nerveux d'Origine Médullaire",
        injuries: [
          { name: "Paraplégie", searchTerms: ["paraplégie"], rate: [5, 100], description: "Paralysie des deux membres inférieurs d'origine médullaire. Peut être flasque ou spasmodique, complète ou incomplète, avec ou sans troubles sphinctériens, sensitifs, trophiques ou génitaux. Voir les formes spécifiques ci-dessous." },
          { name: "Paraplégie flasque complète", searchTerms: ["paraplégie flasque complète", "complète flasque paraplégie", "paraplégie flasque", "flasque complète"], rate: 100, description: "Atteinte globale des membres inférieurs avec abolition des réflexes ostéo-tendineux et signe de Babinski bilatéral. Qu'elle s'accompagne ou non de troubles sphinctériens, génitaux, sensitifs ou trophiques." },
          { name: "Paraplégie flasque incomplète", searchTerms: ["paraplégie flasque incomplète", "incomplète flasque paraplégie", "paraplégie flasque", "flasque incomplète"], rate: 100, description: "Forme exceptionnelle pour la paraplégie flasque pure. Très souvent il y a paraplégie flasco-spasmodique avec impotence partielle, hypotonie, mais réflexes retrouvés et signe de Babinski bilatéral." },
          { name: "Paraplégie flasco-spasmodique légère", searchTerms: ["paraplégie flasco spasmodique légère", "légère spasmodique flasco paraplégie", "paraplégie flasco", "flasco spasmodique", "spasmodique légère"], rate: [20, 40], description: "Forme mixte légère avec impotence partielle, hypotonie, réflexes retrouvés et signe de Babinski bilatéral." },
          { name: "Paraplégie spasmodique totale", searchTerms: ["paraplégie spasmodique totale", "totale spasmodique paraplégie", "paraplégie spasmodique", "spasmodique totale"], rate: 100, description: "Immobilisant totalement le malade, même si quelques mouvements sont conservés mais la marche est impossible et s'il y a des troubles sphinctériens, génitaux ou trophiques." },
          { name: "Paraplégie spasmodique incomplète (marche possible)", searchTerms: ["paraplégie spasmodique incomplète marche possible", "possible marche incomplète spasmodique paraplégie", "paraplégie spasmodique", "spasmodique incomplète", "incomplète marche"], rate: [50, 80], description: "Permet la marche mais le rayon de déplacement est très limité. Marche difficile avec aide." },
          { name: "Paraplégie fruste (découverte d'examen)", searchTerms: ["paraplégie fruste découverte d'examen", "d'examen découverte fruste paraplégie", "paraplégie fruste", "fruste découverte", "découverte d'examen"], rate: [5, 30], description: "Paraplégie fruste surtout découverte d'examen: réflexes exagérés, signe de Babinski bilatéral. Le taux dépend des possibilités de parcours." },
          { name: "Paraplégie incomplète", searchTerms: ["paraplégie incomplète"], rate: [10, 80], description: "Terme générique. Voir les formes spécifiques: flasque incomplète (100%), spasmodique incomplète avec marche (50-80%), ou fruste (5-30%)." },
          { name: "Paraplégie complète", searchTerms: ["paraplégie complète"], rate: 100, description: "Terme générique pour les formes complètes: flasque complète ou spasmodique totale." },
          { name: "Paraparésie", searchTerms: ["paraparésie"], rate: [20, 50], description: "Déficit moteur partiel des deux membres inférieurs d'origine médullaire, moins sévère que la paraplégie. Marche possible limitée, autonomie complète pour les actes de la vie courante.", rateCriteria: { low: "Marche possible limitée mais autonome, troubles urinaires, génito-sexuels et sensitifs absents ou minimes, autonomie complète pour actes de la vie courante.", medium: "Marche limitée avec aide occasionnelle, troubles urinaires modérés (impériosités, rétention), troubles génito-sexuels et sensitifs modérés, autonomie globalement conservée.", high: "Marche très limitée (périmètre <100m), troubles urinaires importants (incontinence partielle nécessitant protections), troubles génito-sexuels sévères (impuissance), troubles sensitifs marqués, autonomie conservée mais avec adaptations." } },
          { name: "Tétraplégie totale", searchTerms: ["tétraplégie totale"], rate: 100, description: "Atteinte motrice totale des quatre membres. Aussi appelée quadriplégie totale." },
          { name: "Tétraplégie incomplète (marche possible)", searchTerms: ["tétraplégie incomplète marche possible", "possible marche incomplète tétraplégie", "tétraplégie incomplète", "incomplète marche", "marche possible"], rate: [60, 90], description: "Permet la marche et s'accompagne de la conservation de quelques mouvements des membres supérieurs. Le taux varie suivant l'importance de l'atteinte. Majoré si: troubles de la sensibilité (surtout aux membres supérieurs), troubles sphinctériens, troubles trophiques. Aussi appelée quadriplégie incomplète.", rateCriteria: { low: "Marche conservée, mouvements membres supérieurs fonctionnels, pas de troubles associés.", medium: "Marche difficile, mouvements membres supérieurs limités, troubles sensitifs ou sphinctériens modérés.", high: "Marche très limitée, mouvements membres supérieurs très restreints, troubles sensitifs importants aux membres supérieurs, troubles sphinctériens et trophiques sévères." } },
          { name: "Tétraplégie complète (confinement au lit)", searchTerms: ["tétraplégie complète confinement lit", "lit confinement complète tétraplégie", "tétraplégie complète", "complète confinement", "confinement lit"], rate: 100, description: "Atteinte médullaire complète des 4 membres avec paralysie totale nécessitant confinement au lit. Aussi appelée quadriplégie complète." },
          { name: "Tétraparésie", searchTerms: ["tétraparésie"], rate: [45, 75], description: "Déficit moteur partiel des 4 membres d'origine médullaire, moins sévère que la tétraplégie. Aussi appelée quadriparésie. Marche possible, préhension possible mais maladroite.", rateCriteria: { low: "Périmètre de marche conservé (>200m), troubles urinaires et génito-sexuels absents ou minimes, préhension fonctionnelle.", medium: "Périmètre de marche limité (100-200m), troubles urinaires modérés (impériosités, fuites occasionnelles), troubles génito-sexuels modérés, préhension maladroite avec limitation fonctionnelle.", high: "Périmètre de marche restreint (<100m), troubles urinaires sévères (incontinence fréquente nécessitant protections), troubles génito-sexuels importants (impuissance, dysfonction érectile), préhension très limitée." } },
          { name: "Quadriplégie incomplète (marche possible)", searchTerms: ["quadriplégie incomplète marche possible", "possible marche incomplète quadriplégie", "quadriplégie incomplète", "incomplète marche", "marche possible"], rate: [60, 90] },
          { name: "Quadriplégie complète (confinement au lit)", searchTerms: ["quadriplégie complète confinement lit", "lit confinement complète quadriplégie", "quadriplégie complète", "complète confinement", "confinement lit"], rate: 100 },
          { name: "Quadriparésie", searchTerms: ["quadriparésie"], rate: [45, 75], description: "Synonyme de tétraparésie. Déficit moteur partiel des 4 membres. Marche possible, préhension possible mais maladroite." },
          { name: "Syndrome de Brown-Séquard", searchTerms: ["syndrome brown séquard", "séquard brown syndrome", "syndrome brown", "brown séquard"], rate: [15, 50], description: "Hémisection médullaire avec atteinte motrice d'un hémicorps et troubles anesthésiques croisés.", rateCriteria: { low: "Troubles moteurs, sensitifs et génito-sphinctériens minimes. Atteinte fruste avec signes modérés et conservation fonctionnelle.", medium: "Troubles moteurs modérés (hémiparésie), troubles sensitifs croisés nets (hypoesthésie/anesthésie controlatérale), troubles génito-sphinctériens légers à modérés.", high: "Troubles moteurs importants (déficit moteur marqué de l'hémicorps), troubles anesthésiques croisés sévères, troubles génito-sphinctériens significatifs." } },
          { name: "Hémiplégie médullaire", searchTerms: ["hémiplégie médullaire"], rate: [10, 100], description: "Exceptionnelle. Généralement il y a des signes diffusés au côté opposé (moteurs ou sensitifs)." },
          { name: "Hémiplégie médullaire légère à modérée", searchTerms: ["hémiplégie médullaire légère modérée", "modérée légère médullaire hémiplégie", "hémiplégie médullaire", "médullaire légère", "légère modérée"], rate: [10, 50], description: "Troubles moteurs légers à modérés, avec généralement des signes diffusés controlatéraux." },
          { name: "Hémiplégie médullaire sévère", searchTerms: ["hémiplégie médullaire sévère", "sévère médullaire hémiplégie", "hémiplégie médullaire", "médullaire sévère"], rate: [50, 100], description: "Formes sévères avec troubles moteurs importants et signes bilatéraux." },
          { name: "Hémiplégie médullaire incomplète (Côté Droit)", searchTerms: ["hémiplégie médullaire incomplète côté droit", "droit côté incomplète médullaire hémiplégie", "hémiplégie médullaire", "médullaire incomplète", "incomplète côté"], rate: [10, 100], description: "Voir formes spécifiques: légère à modérée (10-50%) ou sévère (50-100%)." },
          { name: "Hémiplégie médullaire incomplète (Côté Gauche)", searchTerms: ["hémiplégie médullaire incomplète côté gauche", "gauche côté incomplète médullaire hémiplégie", "hémiplégie médullaire", "médullaire incomplète", "incomplète côté"], rate: [10, 100], description: "Voir formes spécifiques: légère à modérée (10-50%) ou sévère (50-100%)." },
          { name: "Syndrome de la queue de cheval post-traumatique", searchTerms: ["syndrome queue cheval post traumatique", "traumatique post cheval queue syndrome", "syndrome queue", "queue cheval", "cheval post"], rate: [30, 80], description: "Atteinte des racines lombaires basses et sacrées dans le canal rachidien: anesthésie en selle, troubles sphinctériens (urinaires et fécaux), troubles génitaux, abolition des réflexes achilléens, déficit moteur variable des membres inférieurs. Peut aller jusqu'à 100% si extension en hauteur avec atteinte importante de la marche.", rateCriteria: { low: "Troubles sensitifs périnéaux et/ou sphinctériens partiels (rétention ou incontinence intermittente), déficit moteur minime, marche conservée.", medium: "Anesthésie en selle nette, troubles sphinctériens permanents nécessitant des protections, déficit moteur modéré (steppage unilatéral).", high: "Syndrome complet avec anesthésie périnéale totale, incontinence urinaire et fécale complète, impotence sexuelle, déficit moteur bilatéral majeur (steppage bilatéral, impossibilité de marche sur pointes), invalidité sévère." } },
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
          { name: "Atrophie musculaire médullaire - Main + Avant-bras (droite)", searchTerms: ["atrophie musculaire médullaire main avant bras droite", "atrophie musculaire médullaire main avant supérieur droite", "droite bras avant main médullaire musculaire atrophie", "atrophie musculaire", "musculaire médullaire"], rate: [20, 60], description: "Atrophie combinée de la main et de l'avant-bras d'origine médullaire, avec impotence fonctionnelle importante." },
          { name: "Atrophie musculaire médullaire - Main + Avant-bras (gauche)", searchTerms: ["atrophie musculaire médullaire main avant bras gauche", "atrophie musculaire médullaire main avant supérieur gauche", "gauche bras avant main médullaire musculaire atrophie", "atrophie musculaire", "musculaire médullaire"], rate: [20, 50], description: "Atrophie combinée de la main et de l'avant-bras d'origine médullaire, avec impotence fonctionnelle importante." },
          { name: "Atrophie musculaire médullaire - Bras + Épaule + Ceinture scapulaire (droite)", searchTerms: ["atrophie musculaire médullaire bras épaule ceinture scapulaire droite", "atrophie musculaire médullaire supérieur épaule ceinture scapulaire droite", "droite scapulaire ceinture épaule bras médullaire musculaire atrophie", "atrophie musculaire", "musculaire médullaire"], rate: [20, 60], description: "Atrophie globale proximale du membre supérieur d'origine médullaire." },
          { name: "Atrophie musculaire médullaire - Bras + Épaule + Ceinture scapulaire (gauche)", searchTerms: ["atrophie musculaire médullaire bras épaule ceinture scapulaire gauche", "atrophie musculaire médullaire supérieur épaule ceinture scapulaire gauche", "gauche scapulaire ceinture épaule bras médullaire musculaire atrophie", "atrophie musculaire", "musculaire médullaire"], rate: [20, 50], description: "Atrophie globale proximale du membre supérieur d'origine médullaire." },
          { name: "Atrophie complète membre supérieur (droit)", searchTerms: ["atrophie complète membre supérieur droit", "droit supérieur membre complète atrophie", "atrophie complète", "complète membre", "membre supérieur"], rate: 75 },
          { name: "Atrophie complète membre supérieur (gauche)", searchTerms: ["atrophie complète membre supérieur gauche", "gauche supérieur membre complète atrophie", "atrophie complète", "complète membre", "membre supérieur"], rate: 65 },
          { name: "Atrophie des muscles du pied", searchTerms: ["atrophie muscles pied", "atrophie musculaire pied", "pied muscles atrophie", "atrophie pied"], rate: [5, 15], description: "Atrophie des muscles du pied (toutes origines). Barème officiel : 5-15%.", rateCriteria: { low: "Atrophie modérée, fonction conservée, gêne minime.", medium: "Atrophie importante, déficit fonctionnel moyen, boiterie légère.", high: "Atrophie sévère des muscles intrinsèques du pied, déformations (griffes d'orteils), marche difficile." } },
          { name: "Atrophie musculaire médullaire - Pied", searchTerms: ["atrophie musculaire médullaire pied", "pied médullaire musculaire atrophie", "atrophie musculaire", "musculaire médullaire", "médullaire pied"], rate: [5, 15], description: "Atrophie des muscles du pied d'origine médullaire. Aussi: atrophie des muscles du pied, atrophie musculaire pied." },
          { name: "Atrophie des muscles de la jambe (région antéro-externe)", searchTerms: ["atrophie muscles jambe région antéro externe", "atrophie loge antérieure jambe", "atrophie antéro externe jambe", "atrophie jambe antéro externe"], rate: [10, 20], description: "Atrophie des muscles de la loge antéro-externe de la jambe (tibial antérieur, extenseurs des orteils, péroniers). Barème officiel : 10-20%.", rateCriteria: { low: "Atrophie modérée, steppage léger, marche possible.", medium: "Atrophie importante, steppage marqué, difficultés à la marche sur terrains irréguliers.", high: "Atrophie sévère, steppage majeur, chutes fréquentes, appareillage nécessaire." } },
          { name: "Atrophie des muscles de la jambe (en totalité)", searchTerms: ["atrophie muscles jambe totalité", "atrophie complète muscles jambe", "atrophie totale jambe", "atrophie jambe entière"], rate: [10, 30], description: "Atrophie de tous les muscles de la jambe (loges antérieure, postérieure, externe). Barème officiel : 10-30%.", rateCriteria: { low: "Atrophie globale modérée, marche conservée avec aide.", medium: "Atrophie globale importante, impotence fonctionnelle sévère, attelle nécessaire.", high: "Atrophie globale totale, impotence quasi-complète, jambe flasque, marche impossible sans orthèse." } },
          { name: "Atrophie musculaire médullaire - Jambe", searchTerms: ["atrophie musculaire médullaire jambe", "atrophie musculaire médullaire inférieur", "jambe médullaire musculaire atrophie", "atrophie musculaire", "musculaire médullaire"], rate: [10, 30], description: "Atrophie des muscles de la jambe d'origine médullaire. Aussi: atrophie des muscles de la jambe, atrophie musculaire jambe." },
          { name: "Atrophie des muscles du pied et de la jambe", searchTerms: ["atrophie muscles pied jambe combinés", "atrophie pied et jambe", "atrophie pied jambe ensemble", "atrophie musculaire pied jambe"], rate: [20, 40], description: "Atrophie combinée des muscles du pied ET de la jambe (atteinte distale complète du membre inférieur). Barème officiel : 20-40%.", rateCriteria: { low: "Atrophie modérée pied + jambe, marche possible avec orthèse.", medium: "Atrophie importante pied + jambe, déficit fonctionnel majeur, marche très difficile.", high: "Atrophie sévère complète, impotence distale quasi-totale, orthèse complexe nécessaire." } },
          { name: "Atrophie des muscles de la cuisse (région antérieure)", searchTerms: ["atrophie muscles cuisse région antérieure", "atrophie quadriceps", "atrophie cuisse antérieure", "atrophie région antérieure cuisse"], rate: [20, 40], description: "Atrophie des muscles de la région antérieure de la cuisse (quadriceps principalement). Barème officiel : 20-40%.", rateCriteria: { low: "Atrophie modérée du quadriceps, extension du genou conservée, marche normale.", medium: "Atrophie importante du quadriceps, déficit d'extension du genou, montée d'escaliers difficile.", high: "Atrophie sévère du quadriceps, extension du genou impossible, instabilité majeure, risque de chutes." } },
          { name: "Atrophie des muscles de la cuisse (en totalité)", searchTerms: ["atrophie muscles cuisse totalité", "atrophie complète cuisse", "atrophie totale cuisse", "atrophie cuisse entière"], rate: [20, 50], description: "Atrophie de tous les muscles de la cuisse (quadriceps, ischio-jambiers, adducteurs). Barème officiel : 20-50%.", rateCriteria: { low: "Atrophie globale modérée, marche conservée avec boiterie.", medium: "Atrophie globale importante, déficit majeur flexion/extension genou, canne nécessaire.", high: "Atrophie globale sévère, cuisse flasque, impotence fonctionnelle quasi-complète, orthèse complexe." } },
          { name: "Atrophie musculaire médullaire - Cuisse", searchTerms: ["atrophie musculaire médullaire cuisse", "atrophie musculaire médullaire inférieur", "cuisse médullaire musculaire atrophie", "atrophie musculaire", "musculaire médullaire"], rate: [20, 50], description: "Atrophie des muscles de la cuisse d'origine médullaire. Aussi: atrophie des muscles de la cuisse, atrophie musculaire cuisse." },
          { name: "Atrophie des muscles de la ceinture pelvienne et de la masse sacro-lombaire", searchTerms: ["atrophie ceinture pelvienne masse sacro lombaire", "atrophie bassin rachis lombaire", "atrophie ceinture pelvienne sacro lombaire", "atrophie muscles bassin lombaires"], rate: [30, 50], description: "Atrophie des muscles de la ceinture pelvienne (fessiers, psoas, muscles pelviens) ET de la masse sacro-lombaire (muscles paravertébraux lombaires). Barème officiel : 30-50%.", rateCriteria: { low: "Atrophie modérée, station debout conservée, marche avec boiterie légère.", medium: "Atrophie importante, déséquilibre postural, marche difficile avec aide, instabilité rachidienne.", high: "Atrophie sévère, déficit majeur d'extension du rachis et de stabilisation du bassin, handicap fonctionnel majeur." } },
          { name: "Atrophie des muscles de la cuisse, de la ceinture pelvienne et de la masse sacro-lombaire", searchTerms: ["atrophie cuisse ceinture pelvienne masse sacro lombaire", "atrophie globale membre inférieur bassin", "atrophie cuisse bassin lombaires", "atrophie étendue membre inférieur"], rate: [30, 60], description: "Atrophie étendue combinant cuisse + ceinture pelvienne + masse sacro-lombaire (atteinte proximale majeure). Barème officiel : 30-60%.", rateCriteria: { low: "Atrophie globale modérée, marche possible avec cannes et orthèses.", medium: "Atrophie globale importante, impotence fonctionnelle sévère, fauteuil roulant partiel.", high: "Atrophie globale massive, impotence quasi-complète, fauteuil roulant permanent." } },
          { name: "Atrophie musculaire médullaire - Ceinture pelvienne", searchTerms: ["atrophie musculaire médullaire ceinture pelvienne", "pelvienne ceinture médullaire musculaire atrophie", "atrophie musculaire", "musculaire médullaire", "médullaire ceinture"], rate: [30, 60], description: "Atrophie des muscles de la ceinture pelvienne d'origine médullaire." },
          { name: "Atrophie complète, avec impotence absolue - D'un membre (inférieur)", searchTerms: ["atrophie complète impotence absolue un membre", "atrophie complète membre inférieur impotence", "impotence absolue atrophie membre", "atrophie totale impotence membre"], rate: 70, description: "Atrophie complète d'un membre inférieur avec impotence fonctionnelle absolue (équivalent amputation fonctionnelle). Barème officiel : 70%." },
          { name: "Atrophie complète d'un membre inférieur", searchTerms: ["atrophie complète d'un membre inférieur", "inférieur membre d'un complète atrophie", "atrophie complète", "complète d'un", "d'un membre"], rate: 70 },
          { name: "Atrophie complète, avec impotence absolue - Des deux membres (inférieurs)", searchTerms: ["atrophie complète impotence absolue deux membres", "atrophie complète deux membres inférieurs impotence", "impotence absolue atrophie deux membres", "atrophie totale impotence deux membres"], rate: 100, description: "Atrophie complète des deux membres inférieurs avec impotence fonctionnelle absolue (paraplégie flasque). Barème officiel : 100%." },
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
          { name: "Atteinte motrice du Trijumeau (V) - Paralysie motrice unilatérale", searchTerms: ["atteinte motrice trijumeau paralysie motrice unilatérale", "unilatérale motrice paralysie trijumeau motrice atteinte", "atteinte motrice", "motrice trijumeau", "trijumeau paralysie"], rate: 5, description: "Gêne à la mastication d'un côté, déformation de la bouche à l'ouverture. Atteinte unilatérale entraîne peu de gêne." },
          { name: "Paralysie Faciale", searchTerms: ["paralysie faciale"], rate: [5, 50], description: "Paralysie du nerf facial (VII). Voir les formes spécifiques selon le type et la latéralité." },
          { name: "Paralysie faciale complète hypotonique unilatérale", searchTerms: ["paralysie faciale complète hypotonique unilatérale", "unilatérale hypotonique complète faciale paralysie", "paralysie faciale", "faciale complète", "complète hypotonique"], rate: [5, 15], description: "Paralysie faciale périphérique complète d'un côté du visage avec hypotonie et flaccidité musculaire. Impossibilité de fermer l'œil, abaissement de la commissure labiale, effacement des rides du front." },
          { name: "Paralysie faciale complète hypotonique bilatérale", searchTerms: ["paralysie faciale complète hypotonique bilatérale", "bilatérale hypotonique complète faciale paralysie", "paralysie faciale", "faciale complète", "complète hypotonique"], rate: [15, 25], description: "Paralysie faciale périphérique complète bilatérale (exceptionnelle). Visage figé, inexpressif, impossibilité de fermer les yeux des deux côtés, troubles de l'élocution et de l'alimentation." },
          { name: "Paralysie du Nerf Facial (VII) - Paralysie totale et définitive", searchTerms: ["paralysie nerf facial vii paralysie totale définitive", "définitive totale paralysie vii facial nerf paralysie", "paralysie nerf", "nerf facial", "facial vii"], rate: [5, 30], description: "Paralysie complète unilatérale définitive. Voir aussi: paralysie faciale complète hypotonique unilatérale (5-15%)." },
          { name: "Paralysie du Nerf Facial (VII) - Paralysie partielle et définitive", searchTerms: ["paralysie nerf facial vii paralysie partielle définitive", "définitive partielle paralysie vii facial nerf paralysie", "paralysie nerf", "nerf facial", "facial vii"], rate: [10, 30] },
          { name: "Paralysie du Nerf Facial (VII) - Paralysie bilatérale totale", searchTerms: ["paralysie nerf facial vii paralysie bilatérale totale", "totale bilatérale paralysie vii facial nerf paralysie", "paralysie nerf", "nerf facial", "facial vii"], rate: [15, 50], description: "Voir aussi: paralysie faciale complète hypotonique bilatérale (15-25%)." },
          { name: "Paralysie du Nerf Facial (VII) - Contracture post-paralytique", searchTerms: ["paralysie nerf facial vii contracture post paralytique", "paralytique post contracture vii facial nerf paralysie", "paralysie nerf", "nerf facial", "facial vii"], rate: [0, 10] },
          { name: "Hémispasme facial", searchTerms: ["hémispasme facial"], rate: [0, 10], description: "Spasmes involontaires unilatéraux du visage. Voir aussi: hémispasme facial complet non améliorable (jusqu'à 10%)." },
          { name: "Hémispasme facial complet non améliorable par la thérapeutique", searchTerms: ["hémispasme facial complet non améliorable par thérapeutique", "thérapeutique par améliorable non complet facial hémispasme", "hémispasme facial", "facial complet", "complet non"], rate: [0, 10], description: "Contractions involontaires permanentes et répétées d'un hémiface, non contrôlées par les traitements (toxine botulique, médicaments). Gêne esthétique et fonctionnelle importante." },
          { name: "Paralysie du Nerf Facial (VII) - Spasmes (hémispasme facial)", searchTerms: ["paralysie nerf facial vii spasmes hémispasme facial", "facial hémispasme spasmes vii facial nerf paralysie", "paralysie nerf", "nerf facial", "facial vii"], rate: [0, 10], description: "Voir aussi: hémispasme facial complet non améliorable (jusqu'à 10%)." },
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
          { 
              name: "Paralysie complète du plexus brachial (droite)", 
              searchTerms: ["paralysie complète plexus brachial droite", "droite brachial plexus complète paralysie", "paralysie complète", "complète plexus", "plexus brachial"], rate: [60, 70],
              description: "Atteinte complète du plexus brachial, paralysie totale du membre supérieur droit avec troubles sensitifs et douleurs neuropathiques."
          },
          { 
              name: "Paralysie complète du plexus brachial (gauche)", 
              searchTerms: ["paralysie complète plexus brachial gauche", "gauche brachial plexus complète paralysie", "paralysie complète", "complète plexus", "plexus brachial"], rate: [50, 60],
              description: "Atteinte complète du plexus brachial, paralysie totale du membre supérieur gauche avec troubles sensitifs et douleurs neuropathiques."
          },
          { name: "Paralysie totale du membre supérieur (droite)", searchTerms: ["paralysie totale membre supérieur droite", "droite supérieur membre totale paralysie", "paralysie totale", "totale membre", "membre supérieur"], rate: [70, 80] },
          { name: "Paralysie totale du membre supérieur (gauche)", searchTerms: ["paralysie totale membre supérieur gauche", "gauche supérieur membre totale paralysie", "paralysie totale", "totale membre", "membre supérieur"], rate: [60, 70] },
          { 
              name: "Paralysie radiculaire supérieure (Duchenne-Erb) (droite)", 
              searchTerms: ["paralysie radiculaire supérieure duchenne erb droite", "droite erb duchenne supérieure radiculaire paralysie", "paralysie radiculaire", "radiculaire supérieure", "supérieure duchenne"], rate: [45, 55],
              description: "Atteinte du tronc supérieur du plexus brachial (racines C5-C6), paralysie partielle proximale : épaule, coude. Clinique : impossibilité d'abduction de l'épaule, flexion du coude limitée, main fonctionnelle. EMG confirmant l'atteinte radiculaire supérieure."
          },
          { 
              name: "Paralysie radiculaire supérieure (Duchenne-Erb) (gauche)", 
              searchTerms: ["paralysie radiculaire supérieure duchenne erb gauche", "gauche erb duchenne supérieure radiculaire paralysie", "paralysie radiculaire", "radiculaire supérieure", "supérieure duchenne"], rate: [35, 45],
              description: "Atteinte du tronc supérieur du plexus brachial (racines C5-C6), paralysie partielle proximale : épaule, coude. Main fonctionnelle conservée."
          },
          { 
              name: "Paralysie radiculaire inférieure (Klumpke) (droite)", 
              searchTerms: ["paralysie radiculaire inférieure klumpke droite", "droite klumpke inférieure radiculaire paralysie", "paralysie radiculaire", "radiculaire inférieure", "inférieure klumpke"], rate: [55, 65],
              description: "Atteinte du tronc inférieur du plexus brachial (racines C8-T1), paralysie distale : main, doigts. Clinique : main en griffe, troubles sensitifs cubital. EMG confirmant l'atteinte radiculaire inférieure.",
              imageUrl: "/images/medical/main-griffe-klumpke.jpg",
              clinicalTip: "Vérifier : main en griffe cubitale (flexion IPP + hyperextension IPD des 4ème et 5ème doigts), hypoesthésie bord cubital main et avant-bras médial, déficit fléchisseurs profonds D4-D5, signe de Froment positif, amyotrophie interosseux et hypothénar. EMG indispensable pour confirmer atteinte radiculaire C8-T1 vs lésion tronculaire nerf cubital."
          },
          { 
              name: "Paralysie radiculaire inférieure (Klumpke) (gauche)", 
              searchTerms: ["paralysie radiculaire inférieure klumpke gauche", "gauche klumpke inférieure radiculaire paralysie", "paralysie radiculaire", "radiculaire inférieure", "inférieure klumpke"], rate: [45, 55],
              description: "Atteinte du tronc inférieur du plexus brachial (racines C8-T1), paralysie distale : main, doigts. Main en griffe, troubles sensitifs.",
              imageUrl: "/images/medical/main-griffe-klumpke.jpg",
              clinicalTip: "Vérifier : main en griffe cubitale (flexion IPP + hyperextension IPD des 4ème et 5ème doigts), hypoesthésie bord cubital main et avant-bras médial, déficit fléchisseurs profonds D4-D5, signe de Froment positif, amyotrophie interosseux et hypothénar. EMG indispensable pour confirmer atteinte radiculaire C8-T1 vs lésion tronculaire nerf cubital."
          },
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
          { name: "Paralysie du nerf radial", searchTerms: ["paralysie nerf radial", "paralysie nerf radius", "radial nerf paralysie", "paralysie nerf", "nerf radial"], rate: 35 },  // Entrée générique pour paralysie complète
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
          { name: "Paralysie totale d'un membre inférieur (flasque)", searchTerms: ["paralysie totale d'un membre inférieur flasque", "flasque inférieur membre d'un totale paralysie", "paralysie totale", "totale d'un", "d'un membre"], rate: [70, 80], description: "Paralysie périphérique flasque avec atteinte complète du membre inférieur." },
          { name: "Paralysie totale d'un membre inférieur (spasmodique)", searchTerms: ["paralysie totale d'un membre inférieur spasmodique", "spasmodique inférieur membre d'un totale paralysie", "paralysie totale", "totale d'un", "d'un membre"], rate: [10, 50], description: "Paralysie centrale spasmodique (post-AVC, lésion médullaire) avec hypertonie et troubles de la marche variables.", rateCriteria: { low: "Spasticité modérée, marche possible avec aide technique, contrôle partiel préservé.", high: "Spasticité sévère, marche impossible, rétractions tendineuses, douleurs spastiques invalidantes." } },
          { name: "Paralysie complète du nerf sciatique", searchTerms: ["paralysie complète nerf sciatique", "paralysie complète nerf nerf", "sciatique nerf complète paralysie", "paralysie complète", "complète nerf"], rate: [35, 45] },
          { name: "Paralysie du nerf sciatique poplité externe (SPE)", searchTerms: ["paralysie nerf sciatique poplité externe spe", "paralysie nerf nerf poplité externe spe", "spe externe poplité sciatique nerf paralysie", "paralysie nerf", "nerf sciatique"], rate: [15, 30], rateCriteria: { low: "Déficit du releveur du pied, marche sur la pointe des pieds possible, steppage discret.", high: "Steppage majeur avec nécessité de releveur, troubles trophiques, forme sévère et rebelle." } },
          // 🆕 V3.3.169: STEPPAGE + AMYOTROPHIE (L4-L5 radiculopathie)
          { name: "Steppage et déficit du releveur du pied (L4-L5)", searchTerms: ["steppage releveur pied l4 l5", "steppage déficit releveur du pied l4", "déficit releveur du pied l4 l5", "steppage marche avec steppage", "amyotrophie jambe steppage"], rate: [18, 35], description: "Déficit du nerf fibulaire avec steppage manifeste, amyotrophie du tibial antérieur et muscles releveurs, déficit L4-L5 radiculaire.", rateCriteria: { low: "Steppage discret, amyotrophie mineure, marche peu affectée.", high: "Steppage majeur, amyotrophie marquée, nécessité d'appareil de soutien du pied." } },
          { name: "Amyotrophie musculaire du membre inférieur", searchTerms: ["amyotrophie musculaire du membre inférieur", "fonte musculaire du membre inférieur", "atrophie musculaire jambe", "amyotrophie jambe", "amyotrophie membre inférieur"], rate: [12, 25], description: "Amyotrophie post-traumatique du membre inférieur consécutive à une lésion neurologique, avec fonte musculaire objectivée et déficit fonctionnel associé.", rateCriteria: { low: "Amyotrophie légère, force musculaire 4/5, marche conservée.", high: "Amyotrophie marquée, force 2-3/5, limitation majeure de la mobilité." } },
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
            { name: "Sciatique chronique avec signes déficitaires", searchTerms: ["sciatique chronique avec signes déficitaires", "nerf chronique avec signes déficitaires", "déficitaires signes avec chronique sciatique", "sciatique chronique signes déficitaires", "sciatique chronique"], rate: 18 },  // Entrée pour déficit moteur L5/S1 avec steppage
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
          { name: "Mutilation - Perte des deux maxillaires supérieurs", searchTerms: ["mutilation perte des deux maxillaires supérieurs", "mutilation amputation des deux maxillaires supérieurs", "supérieurs maxillaires deux des perte mutilation", "mutilation perte deux maxillaires supérieurs", "mutilation perte"], rate: [90, 100], description: "Vastes mutilations de la face : perte des deux maxillaires supérieurs. Barème officiel : 90-100%.", rateCriteria: { low: "Perte des deux maxillaires avec appareillage prothétique fonctionnel, mastication et parole conservées partiellement.", high: "Perte complète des deux maxillaires, impossibilité de mastication, troubles graves de la parole, déformation faciale majeure." } },
          { name: "Mutilation - Perte du maxillaire inférieur dans la totalité de sa portion dentaire", searchTerms: ["mutilation perte maxillaire inférieur totalité portion dentaire", "perte maxillaire inférieur total portion dentaire", "maxillaire inférieur perte totale dentaire", "perte mandibule totale portion dentaire"], rate: [90, 100], description: "Vastes mutilations de la face : perte du maxillaire inférieur dans la totalité de sa portion dentaire (arc dentaire complet). Barème officiel : 90-100%.", rateCriteria: { low: "Perte totale de la portion dentaire avec appareillage prothétique possible, mastication et parole partiellement conservées.", high: "Perte totale de la portion dentaire sans possibilité d'appareillage, impotence fonctionnelle complète (mastication, parole), déformation majeure." } },
          { name: "Mutilation - Perte d'un maxillaire supérieur avec communication bucco-nasale", searchTerms: ["mutilation perte maxillaire supérieur communication bucco nasale", "perte maxillaire supérieur fistule bucco nasale", "maxillaire supérieur perte communication naso-orale", "perte maxillaire supérieur fistule oronasale"], rate: 100, description: "Vastes mutilations de la face : perte d'un maxillaire supérieur avec communication bucco-nasale persistante (fistule oro-nasale). Incapacité totale. Barème officiel : 100%." },
          { name: "Mutilation - Perte d'un maxillaire supérieur et d'un maxillaire inférieur", searchTerms: ["mutilation perte d'un maxillaire supérieur d'un maxillaire inférieur", "mutilation amputation d'un maxillaire supérieur d'un maxillaire inférieur", "inférieur maxillaire d'un supérieur maxillaire d'un perte mutilation", "mutilation perte", "perte d'un"], rate: 100 },
          { name: "Mutilation - Perte d'un seul maxillaire supérieur avec conservation de l'autre", searchTerms: ["mutilation perte seul maxillaire supérieur conservation autre", "perte un maxillaire supérieur conservation autre maxillaire", "maxillaire supérieur perte avec conservation", "perte maxillaire supérieur conservation mandibule"], rate: [50, 60], description: "Vastes mutilations de la face : perte d'un seul maxillaire supérieur avec conservation de l'autre maxillaire. Barème officiel : 50-60%.", rateCriteria: { low: "Perte d'un maxillaire avec appareillage prothétique fonctionnel, mastication et parole acceptables.", high: "Perte d'un maxillaire avec impossibilité d'appareillage efficace, troubles majeurs de mastication et parole, déformation importante." } },
          { name: "Mutilation - Perte d'un maxillaire supérieur avec perte de substance étendue", searchTerms: ["mutilation perte d'un maxillaire supérieur avec perte substance étendue", "mutilation amputation d'un maxillaire supérieur avec amputation substance étendue", "étendue substance perte avec supérieur maxillaire d'un perte mutilation", "mutilation perte d'un maxillaire supérieur perte substance étendue", "mutilation perte"], rate: [70, 90], description: "Perte d'un maxillaire supérieur avec perte de substance étendue des tissus adjacents. Barème officiel : 70-90%.", rateCriteria: { low: "Perte du maxillaire avec perte de substance modérée, appareillage possible, séquelles fonctionnelles moyennes.", high: "Perte du maxillaire avec perte de substance majeure, impossibilité d'appareillage, séquelles fonctionnelles et esthétiques graves." } },
          { name: "Perte de substance des parties molles de la face (joue, lèvres, menton)", searchTerms: ["perte substance des parties molles face joue, lèvres, menton", "amputation substance des parties molles face joue, lèvres, menton", "menton lèvres, joue, face molles parties des substance perte", "perte substance parties molles face joue, lèvres, menton", "perte substance"], rate: [10, 80], rateCriteria: { low: "Perte limitée sans préjudice esthétique ou fonctionnel majeur.", high: "Perte étendue avec déformation majeure et/ou troubles fonctionnels (mastication, parole)." } },
          { name: "Consolidation vicieuse - Mobilité totale du maxillaire supérieur", searchTerms: ["consolidation vicieuse mobilité totale maxillaire supérieur", "supérieur maxillaire totale mobilité vicieuse consolidation", "consolidation vicieuse", "vicieuse mobilité", "mobilité totale"], rate: [60, 80] },
          { name: "Consolidation vicieuse - Mobilité partielle du maxillaire supérieur", searchTerms: ["consolidation vicieuse mobilité partielle maxillaire supérieur", "supérieur maxillaire partielle mobilité vicieuse consolidation", "consolidation vicieuse", "vicieuse mobilité", "mobilité partielle"], rate: [20, 50] },
          { name: "Consolidation vicieuse - Troubles sérieux de l'articulé dentaire", searchTerms: ["consolidation vicieuse troubles sérieux l'articulé dentaire", "dentaire l'articulé sérieux troubles vicieuse consolidation", "consolidation vicieuse", "vicieuse troubles", "troubles sérieux"], rate: [15, 30] },
          { name: "Consolidation vicieuse - Trouble léger de l'articulé dentaire", searchTerms: ["consolidation vicieuse trouble léger l'articulé dentaire", "dentaire l'articulé léger trouble vicieuse consolidation", "consolidation vicieuse", "vicieuse trouble", "trouble léger"], rate: [5, 15] },
          { name: "Perte de substance de la voûte palatine", searchTerms: ["perte substance voûte palatine", "amputation substance voûte palatine", "palatine voûte substance perte", "perte substance", "substance voûte"], rate: [10, 20] },
          { name: "Perte de substance de la voûte avec communication bucco-nasale", searchTerms: ["perte substance voûte avec communication bucco nasale", "amputation substance voûte avec communication bucco nasale", "nasale bucco communication avec voûte substance perte", "perte substance voûte communication bucco nasale", "perte substance"], rate: [30, 60], description: "Perte de substance de la voûte palatine et du voile avec large communication bucco-nasale. Barème officiel : 30-60%.", rateCriteria: { low: "Communication de taille modérée, prothèse obturatrice efficace, alimentation et parole acceptables.", medium: "Communication importante, prothèse partiellement efficace, troubles de déglutition et nasonnement.", high: "Communication très large, prothèse inefficace, troubles majeurs (reflux nasal des aliments, voix nasonnée, risque infectieux)." } },
          { name: "Perte de substance partielle de l'arcade dentaire (maxillaire supérieur) - Prothèse fonctionnelle", searchTerms: ["perte substance partielle arcade dentaire maxillaire supérieur prothèse fonctionnelle", "perte arcade dentaire maxillaire prothèse fonctionnelle", "perte substance arcade prothèse fonctionnelle", "arcade dentaire prothèse fonctionnelle"], rate: [0, 5], description: "Perte de substance partielle de l'arcade dentaire du maxillaire supérieur avec possibilité de prothèse fonctionnelle. Barème officiel : 0-5%." },
          { name: "Perte de substance partielle de l'arcade dentaire (maxillaire supérieur) - Prothèse non fonctionnelle", searchTerms: ["perte substance partielle arcade dentaire maxillaire supérieur prothèse non fonctionnelle", "perte arcade dentaire maxillaire prothèse impossible", "perte substance arcade sans prothèse", "arcade dentaire prothèse non fonctionnelle"], rate: [15, 20], description: "Perte de substance partielle de l'arcade dentaire du maxillaire supérieur avec impossibilité de prothèse fonctionnelle (pertes osseuses importantes, contre-indications). Barème officiel : 15-20%." },
          { name: "Fracture du maxillaire inférieur - Consolidation vicieuse avec trouble grave de l'articulé", searchTerms: ["fracture maxillaire inférieur consolidation vicieuse avec trouble grave l'articulé", "l'articulé grave trouble avec vicieuse consolidation inférieur maxillaire fracture", "fracture maxillaire inférieur consolidation vicieuse trouble grave l'articulé", "fracture maxillaire", "maxillaire inférieur"], rate: [15, 20] },
          { name: "Fracture du maxillaire inférieur - Consolidation vicieuse avec trouble léger de l'articulé", searchTerms: ["fracture maxillaire inférieur consolidation vicieuse avec trouble léger l'articulé", "l'articulé léger trouble avec vicieuse consolidation inférieur maxillaire fracture", "fracture maxillaire inférieur consolidation vicieuse trouble léger l'articulé", "fracture maxillaire", "maxillaire inférieur"], rate: [5, 10] },
          { name: "Pseudarthrose lâche de la mandibule", searchTerms: ["pseudarthrose lâche mandibule", "mandibule lâche pseudarthrose", "pseudarthrose lâche", "lâche mandibule"], rate: [60, 85] },
          { name: "Pseudarthrose serrée de la branche ascendante", searchTerms: ["pseudarthrose serrée branche ascendante", "ascendante branche serrée pseudarthrose", "pseudarthrose serrée", "serrée branche", "branche ascendante"], rate: [0, 25] },
          { name: "Pseudarthrose lâche de la branche ascendante", searchTerms: ["pseudarthrose lâche branche ascendante", "ascendante branche lâche pseudarthrose", "pseudarthrose lâche", "lâche branche", "branche ascendante"], rate: [10, 15] },
          { name: "Pseudarthrose serrée de la branche horizontale", searchTerms: ["pseudarthrose serrée branche horizontale", "horizontale branche serrée pseudarthrose", "pseudarthrose serrée", "serrée branche", "branche horizontale"], rate: [5, 10] },
          { name: "Pseudarthrose lâche de la branche horizontale", searchTerms: ["pseudarthrose lâche branche horizontale", "horizontale branche lâche pseudarthrose", "pseudarthrose lâche", "lâche branche", "branche horizontale"], rate: [15, 25] },
          { name: "Pseudarthrose serrée de la région symphysaire", searchTerms: ["pseudarthrose serrée région symphysaire", "symphysaire région serrée pseudarthrose", "pseudarthrose serrée", "serrée région", "région symphysaire"], rate: [10, 15] },
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
          { name: "Perte de plusieurs dents (coefficient par dent) - Incisives/Canines", searchTerms: ["perte plusieurs dents incisives canines coefficient", "perte dents incisives canines", "coefficient dent incisive", "perte incisive canine"], description: "Le taux est évalué en attribuant un coefficient de 1% par dent perdue (incisives et canines). Note: Le taux est réduit des deux tiers si une prothèse fonctionnelle est en place. Barème officiel.", rate: 1 },
          { name: "Perte de plusieurs dents (coefficient par dent) - Prémolaires", searchTerms: ["perte plusieurs dents prémolaires coefficient", "perte dents prémolaires", "coefficient dent prémolaire", "perte prémolaire"], description: "Le taux est évalué en attribuant un coefficient de 1.25% par dent perdue (prémolaires). Note: Le taux est réduit des deux tiers si une prothèse fonctionnelle est en place. Barème officiel.", rate: 1.25 },
          { name: "Perte de plusieurs dents (coefficient par dent) - Molaires", searchTerms: ["perte plusieurs dents molaires coefficient", "perte dents molaires", "coefficient dent molaire", "perte molaire"], description: "Le taux est évalué en attribuant un coefficient de 1.5% par dent perdue (molaires). Note: Le taux est réduit des deux tiers si une prothèse fonctionnelle est en place. Barème officiel.", rate: 1.5 },
          { name: "Perte de 8 dents définitives", description: "Calcul: 8 molaires × 1.5% = 12%", rate: 12 },
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
          { name: "Paralysie linguale incomplète post-traumatique", searchTerms: ["paralysie linguale incomplète post traumatique", "traumatique post incomplète linguale paralysie", "paralysie linguale", "linguale incomplète", "incomplète post"], rate: 15, description: "Paralysie partielle de la langue (atteinte unilatérale ou partielle du nerf hypoglosse XII) entraînant une dysarthrie modérée et une gêne à la mastication. Déviation linguale lors de la protraction, atrophie d'un hémilangue." },
          { name: "Paralysie linguale complète post-traumatique", searchTerms: ["paralysie linguale complète post traumatique", "traumatique post complète linguale paralysie", "paralysie linguale", "linguale complète", "complète post"], rate: 50, description: "Paralysie bilatérale de la langue (atteinte bilatérale du nerf hypoglosse XII ou lésion centrale) entraînant une impossibilité de mouvement lingual. Troubles majeurs de l'élocution (dysarthrie sévère), de la mastication et de la déglutition. Bavage, risque de fausse route." },
          { name: "Délabrement des joues avec troubles fonctionnels", searchTerms: ["délabrement des joues avec troubles fonctionnels", "fonctionnels troubles avec joues des délabrement", "délabrement joues troubles fonctionnels", "délabrement des", "des joues"], rate: [25, 50], description: "Perte de substance importante des joues (traumatisme balistique, brûlure, avulsion) avec mutilation majeure. Troubles de la mastication (impossibilité de retenir les aliments en bouche, fuite salivaire), troubles de la parole, préjudice esthétique majeur.", rateCriteria: { low: "Délabrement unilatéral modéré, gêne fonctionnelle partielle, prothèse obturatrice efficace.", high: "Délabrement bilatéral étendu ou unilatéral massif, fistule cutanée, impossibilité de mastication normale, retentissement psycho-social majeur." } },
          { name: "Gêne de la déglutition par cicatrice pharyngée", searchTerms: ["gêne déglutition par cicatrice pharyngée", "pharyngée cicatrice par déglutition gêne", "gêne déglutition", "déglutition par", "par cicatrice"], rate: [10, 30] },
          { name: "Rétrécissement de l'oro-pharynx post-traumatique", searchTerms: ["rétrécissement l'oro pharynx post traumatique", "traumatique post pharynx l'oro rétrécissement", "rétrécissement l'oro", "l'oro pharynx", "pharynx post"], rate: [5, 35], description: "Sténose cicatricielle de l'oropharynx ou de l'hypopharynx après traumatisme (brûlure caustique, trauma pénétrant, séquelles chirurgicales). Dysphagie chronique avec gêne à l'alimentation solide, nécessitant parfois une alimentation mixée ou des dilatations répétées.", rateCriteria: { low: "Dysphagie légère, gêne occasionnelle avec solides durs uniquement.", medium: "Dysphagie modérée, alimentation mixée nécessaire, dilatations répétées.", high: "Dysphagie sévère, sténose serrée nécessitant une gastrostomie ou une alimentation liquidienne exclusive." } },
          { name: "Fistule salivaire persistante", searchTerms: ["fistule salivaire persistante", "persistante salivaire fistule", "fistule salivaire", "salivaire persistante"], rate: 20, description: "Fistule cutanée d'une glande salivaire principale (parotide, sous-maxillaire) avec écoulement salivaire externe permanent après traumatisme ou chirurgie. Nécessite des pansements fréquents, macération cutanée, préjudice esthétique et gêne sociale." },
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
          { name: "Cécité complète (Énucléation ou cécité absolue bilatérale)", searchTerms: ["cécité complète énucléation cécité absolue bilatérale", "bilatérale absolue cécité énucléation complète cécité", "cécité complète", "complète énucléation", "énucléation cécité"], rate: 100, description: "Perte totale de la vision des deux yeux" },
          { name: "Quasi-cécité ou cécité professionnelle", searchTerms: ["quasi cécité cécité professionnelle", "professionnelle cécité cécité quasi", "quasi cécité", "cécité cécité", "cécité professionnelle"], rate: 100 },
          { name: "Perte complète de la vision d'un oeil (l'autre étant normal)", searchTerms: ["perte complète vision d'un oeil l'autre étant normal", "amputation complète vision d'un vision l'autre étant normal", "normal étant l'autre oeil d'un vision complète perte", "perte complète", "complète vision"], rate: 30, description: "Vision 10/10 + Moins de 1/20 ou énucléation" },
          { name: "Perte de la vision d'un oeil sans difformité apparente", searchTerms: ["perte vision d'un oeil sans difformité apparente", "amputation vision d'un vision sans difformité apparente", "apparente difformité sans oeil d'un vision perte", "perte vision d'un oeil difformité apparente", "perte vision"], rate: [25, 30] },
          { name: "Ablation ou altération du globe avec prothèse possible", searchTerms: ["ablation altération globe avec prothèse possible", "amputation altération globe avec prothèse possible", "possible prothèse avec globe altération ablation", "ablation altération globe prothèse possible", "ablation altération"], rate: [28, 33] },
          { name: "Ablation ou altération du globe sans prothèse possible", searchTerms: ["ablation altération globe sans prothèse possible", "amputation altération globe sans prothèse possible", "possible prothèse sans globe altération ablation", "ablation altération globe prothèse possible", "ablation altération"], rate: [35, 40] },
        ]
      },
      {
        name: "Yeux - Vision Binoculaire (Tableau Général d'Évaluation)",
        description: "IPP selon l'acuité visuelle des deux yeux. Valeurs exactes du tableau officiel AT.",
        injuries: [
          // Ligne 8-9/10 + X
          { name: "Vision binoculaire: 8-9/10 + 8-9/10", searchTerms: ["vision binoculaire: 9/10 9/10", "9/10 9/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 9/10", "9/10 9/10"], rate: 0, description: "Vision normale bilatérale" },
          { name: "Vision binoculaire: 8-9/10 + 7/10", searchTerms: ["vision binoculaire: 9/10 7/10", "7/10 9/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 9/10", "9/10 7/10"], rate: 3, description: "Baisse légère d'un œil" },
          { name: "Vision binoculaire: 8-9/10 + 6/10", searchTerms: ["vision binoculaire: 9/10 6/10", "6/10 9/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 9/10", "9/10 6/10"], rate: 3, description: "Baisse légère d'un œil" },
          { name: "Vision binoculaire: 8-9/10 + 5/10", searchTerms: ["vision binoculaire: 9/10 5/10", "5/10 9/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 9/10", "9/10 5/10"], rate: 6, description: "Baisse modérée d'un œil" },
          { name: "Vision binoculaire: 8-9/10 + 4/10", searchTerms: ["vision binoculaire: 9/10 4/10", "4/10 9/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 9/10", "9/10 4/10"], rate: 8, description: "Baisse modérée d'un œil" },
          { name: "Vision binoculaire: 8-9/10 + 3/10", searchTerms: ["vision binoculaire: 9/10 3/10", "3/10 9/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 9/10", "9/10 3/10"], rate: 10, description: "Baisse importante d'un œil" },
          { name: "Vision binoculaire: 8-9/10 + 2/10", searchTerms: ["vision binoculaire: 9/10 2/10", "2/10 9/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 9/10", "9/10 2/10"], rate: 17, description: "Baisse sévère d'un œil" },
          { name: "Vision binoculaire: 8-9/10 + 1/10", searchTerms: ["vision binoculaire: 9/10 1/10", "1/10 9/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 9/10", "9/10 1/10"], rate: 23, description: "Baisse très sévère d'un œil" },
          { name: "Vision binoculaire: 8-9/10 + 1/20", searchTerms: ["vision binoculaire: 9/10 1/20", "1/20 9/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 9/10", "9/10 1/20"], rate: 28, description: "Vision résiduelle minimale d'un œil" },
          { name: "Vision binoculaire: 8-9/10 + Moins de 1/20", searchTerms: ["vision binoculaire: 9/10 moins 1/20", "1/20 moins 9/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 9/10", "9/10 moins"], rate: 30, description: "Quasi perte d'un œil" },
          { name: "Vision binoculaire: 8-9/10 + Énucléation", searchTerms: ["vision binoculaire: 9/10 énucléation", "énucléation 9/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 9/10", "9/10 énucléation"], rate: 35, description: "Énucléation unilatérale" },
          
          // Ligne 7/10 + X
          { name: "Vision binoculaire: 7/10 + 7/10", searchTerms: ["vision binoculaire: 7/10 7/10", "7/10 7/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 7/10", "7/10 7/10"], rate: 3, description: "Baisse légère bilatérale symétrique" },
          { name: "Vision binoculaire: 7/10 + 6/10", searchTerms: ["vision binoculaire: 7/10 6/10", "6/10 7/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 7/10", "7/10 6/10"], rate: 5, description: "Baisse légère bilatérale" },
          { name: "Vision binoculaire: 7/10 + 5/10", searchTerms: ["vision binoculaire: 7/10 5/10", "5/10 7/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 7/10", "7/10 5/10"], rate: 8, description: "Asymétrie modérée" },
          { name: "Vision binoculaire: 7/10 + 4/10", searchTerms: ["vision binoculaire: 7/10 4/10", "4/10 7/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 7/10", "7/10 4/10"], rate: 11, description: "Asymétrie modérée" },
          { name: "Vision binoculaire: 7/10 + 3/10", searchTerms: ["vision binoculaire: 7/10 3/10", "3/10 7/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 7/10", "7/10 3/10"], rate: 13, description: "Baisse importante asymétrique" },
          { name: "Vision binoculaire: 7/10 + 2/10", searchTerms: ["vision binoculaire: 7/10 2/10", "2/10 7/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 7/10", "7/10 2/10"], rate: 18, description: "Baisse sévère asymétrique" },
          { name: "Vision binoculaire: 7/10 + 1/10", searchTerms: ["vision binoculaire: 7/10 1/10", "1/10 7/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 7/10", "7/10 1/10"], rate: 25, description: "Vision très réduite d'un œil" },
          { name: "Vision binoculaire: 7/10 + 1/20", searchTerms: ["vision binoculaire: 7/10 1/20", "1/20 7/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 7/10", "7/10 1/20"], rate: 30, description: "Vision résiduelle minimale" },
          { name: "Vision binoculaire: 7/10 + Moins de 1/20", searchTerms: ["vision binoculaire: 7/10 moins 1/20", "1/20 moins 7/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 7/10", "7/10 moins"], rate: 35, description: "Quasi perte d'un œil" },
          { name: "Vision binoculaire: 7/10 + Énucléation", searchTerms: ["vision binoculaire: 7/10 énucléation", "énucléation 7/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 7/10", "7/10 énucléation"], rate: 40, description: "Énucléation + baisse controlatérale" },
          
          // Ligne 6/10 + X
          { name: "Vision binoculaire: 6/10 + 6/10", searchTerms: ["vision binoculaire: 6/10 6/10", "6/10 6/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 6/10", "6/10 6/10"], rate: 5, description: "Baisse légère bilatérale symétrique" },
          { name: "Vision binoculaire: 6/10 + 5/10", searchTerms: ["vision binoculaire: 6/10 5/10", "5/10 6/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 6/10", "6/10 5/10"], rate: 8, description: "Baisse modérée" },
          { name: "Vision binoculaire: 6/10 + 4/10", searchTerms: ["vision binoculaire: 6/10 4/10", "4/10 6/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 6/10", "6/10 4/10"], rate: 11, description: "Baisse modérée asymétrique" },
          { name: "Vision binoculaire: 6/10 + 3/10", searchTerms: ["vision binoculaire: 6/10 3/10", "3/10 6/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 6/10", "6/10 3/10"], rate: 13, description: "Baisse importante" },
          { name: "Vision binoculaire: 6/10 + 2/10", searchTerms: ["vision binoculaire: 6/10 2/10", "2/10 6/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 6/10", "6/10 2/10"], rate: 18, description: "Baisse sévère asymétrique" },
          { name: "Vision binoculaire: 6/10 + 1/10", searchTerms: ["vision binoculaire: 6/10 1/10", "1/10 6/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 6/10", "6/10 1/10"], rate: 25, description: "Vision très réduite d'un œil" },
          { name: "Vision binoculaire: 6/10 + 1/20", searchTerms: ["vision binoculaire: 6/10 1/20", "1/20 6/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 6/10", "6/10 1/20"], rate: 30, description: "Vision résiduelle minimale" },
          { name: "Vision binoculaire: 6/10 + Moins de 1/20", searchTerms: ["vision binoculaire: 6/10 moins 1/20", "1/20 moins 6/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 6/10", "6/10 moins"], rate: 35, description: "Quasi perte d'un œil" },
          { name: "Vision binoculaire: 6/10 + Énucléation", searchTerms: ["vision binoculaire: 6/10 énucléation", "énucléation 6/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 6/10", "6/10 énucléation"], rate: 40, description: "Énucléation + baisse" },
          
          // Ligne 5/10 + X
          { name: "Vision binoculaire: 5/10 + 5/10", searchTerms: ["vision binoculaire: 5/10 5/10", "5/10 5/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 5/10", "5/10 5/10"], rate: 6, description: "Baisse modérée bilatérale symétrique" },
          { name: "Vision binoculaire: 5/10 + 4/10", searchTerms: ["vision binoculaire: 5/10 4/10", "4/10 5/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 5/10", "5/10 4/10"], rate: 8, description: "Baisse modérée bilatérale" },
          { name: "Vision binoculaire: 5/10 + 3/10", searchTerms: ["vision binoculaire: 5/10 3/10", "3/10 5/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 5/10", "5/10 3/10"], rate: 10, description: "Baisse modérée à importante" },
          { name: "Vision binoculaire: 5/10 + 2/10", searchTerms: ["vision binoculaire: 5/10 2/10", "2/10 5/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 5/10", "5/10 2/10"], rate: 25, description: "Baisse sévère" },
          { name: "Vision binoculaire: 5/10 + 1/10", searchTerms: ["vision binoculaire: 5/10 1/10", "1/10 5/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 5/10", "5/10 1/10"], rate: 30, description: "Vision très réduite d'un œil" },
          { name: "Vision binoculaire: 5/10 + 1/20", searchTerms: ["vision binoculaire: 5/10 1/20", "1/20 5/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 5/10", "5/10 1/20"], rate: 40, description: "Vision résiduelle minimale" },
          { name: "Vision binoculaire: 5/10 + Moins de 1/20", searchTerms: ["vision binoculaire: 5/10 moins 1/20", "1/20 moins 5/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 5/10", "5/10 moins"], rate: 45, description: "Quasi perte d'un œil" },
          { name: "Vision binoculaire: 5/10 + Énucléation", searchTerms: ["vision binoculaire: 5/10 énucléation", "énucléation 5/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 5/10", "5/10 énucléation"], rate: 50, description: "Énucléation + vision modérée" },
          
          // Ligne 4/10 + X
          { name: "Vision binoculaire: 4/10 + 4/10", searchTerms: ["vision binoculaire: 4/10 4/10", "4/10 4/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 4/10", "4/10 4/10"], rate: 8, description: "Baisse modérée bilatérale symétrique" },
          { name: "Vision binoculaire: 4/10 + 3/10", searchTerms: ["vision binoculaire: 4/10 3/10", "3/10 4/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 4/10", "4/10 3/10"], rate: 15, description: "Baisse importante bilatérale" },
          { name: "Vision binoculaire: 4/10 + 2/10", searchTerms: ["vision binoculaire: 4/10 2/10", "2/10 4/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 4/10", "4/10 2/10"], rate: 25, description: "Baisse sévère asymétrique" },
          { name: "Vision binoculaire: 4/10 + 1/10", searchTerms: ["vision binoculaire: 4/10 1/10", "1/10 4/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 4/10", "4/10 1/10"], rate: 35, description: "Vision très réduite d'un œil" },
          { name: "Vision binoculaire: 4/10 + 1/20", searchTerms: ["vision binoculaire: 4/10 1/20", "1/20 4/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 4/10", "4/10 1/20"], rate: 43, description: "Vision résiduelle minimale" },
          { name: "Vision binoculaire: 4/10 + Moins de 1/20", searchTerms: ["vision binoculaire: 4/10 moins 1/20", "1/20 moins 4/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 4/10", "4/10 moins"], rate: 48, description: "Quasi perte d'un œil" },
          { name: "Vision binoculaire: 4/10 + Énucléation", searchTerms: ["vision binoculaire: 4/10 énucléation", "énucléation 4/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 4/10", "4/10 énucléation"], rate: 53, description: "Énucléation + baisse importante" },
          
          // Ligne 3/10 + X
          { name: "Vision binoculaire: 3/10 + 3/10", searchTerms: ["vision binoculaire: 3/10 3/10", "3/10 3/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 3/10", "3/10 3/10"], rate: 10, description: "Baisse importante bilatérale symétrique" },
          { name: "Vision binoculaire: 3/10 + 2/10", searchTerms: ["vision binoculaire: 3/10 2/10", "2/10 3/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 3/10", "3/10 2/10"], rate: 25, description: "Baisse importante à sévère" },
          { name: "Vision binoculaire: 3/10 + 1/10", searchTerms: ["vision binoculaire: 3/10 1/10", "1/10 3/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 3/10", "3/10 1/10"], rate: 35, description: "Baisse sévère asymétrique" },
          { name: "Vision binoculaire: 3/10 + 1/20", searchTerms: ["vision binoculaire: 3/10 1/20", "1/20 3/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 3/10", "3/10 1/20"], rate: 55, description: "Vision résiduelle" },
          { name: "Vision binoculaire: 3/10 + Moins de 1/20", searchTerms: ["vision binoculaire: 3/10 moins 1/20", "1/20 moins 3/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 3/10", "3/10 moins"], rate: 60, description: "Quasi cécité unilatérale" },
          { name: "Vision binoculaire: 3/10 + Énucléation", searchTerms: ["vision binoculaire: 3/10 énucléation", "énucléation 3/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 3/10", "3/10 énucléation"], rate: 65, description: "Énucléation + baisse sévère" },
          
          // Ligne 2/10 + X
          { name: "Vision binoculaire: 2/10 + 2/10", searchTerms: ["vision binoculaire: 2/10 2/10", "2/10 2/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 2/10", "2/10 2/10"], rate: 17, description: "Baisse sévère bilatérale symétrique" },
          { name: "Vision binoculaire: 2/10 + 1/10", searchTerms: ["vision binoculaire: 2/10 1/10", "1/10 2/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 2/10", "2/10 1/10"], rate: 45, description: "Baisse sévère bilatérale" },
          { name: "Vision binoculaire: 2/10 + 1/20", searchTerms: ["vision binoculaire: 2/10 1/20", "1/20 2/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 2/10", "2/10 1/20"], rate: 55, description: "Baisse sévère + vision résiduelle" },
          { name: "Vision binoculaire: 2/10 + Moins de 1/20", searchTerms: ["vision binoculaire: 2/10 moins 1/20", "1/20 moins 2/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 2/10", "2/10 moins"], rate: 80, description: "Quasi cécité" },
          { name: "Vision binoculaire: 2/10 + Énucléation", searchTerms: ["vision binoculaire: 2/10 énucléation", "énucléation 2/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 2/10", "2/10 énucléation"], rate: 85, description: "Énucléation + baisse très sévère" },
          
          // Ligne 1/10 + X
          { name: "Vision binoculaire: 1/10 + 1/10", searchTerms: ["vision binoculaire: 1/10 1/10", "1/10 1/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 1/10", "1/10 1/10"], rate: 23, description: "Vision très réduite bilatérale" },
          { name: "Vision binoculaire: 1/10 + 1/20", searchTerms: ["vision binoculaire: 1/10 1/20", "1/20 1/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 1/10", "1/10 1/20"], rate: 60, description: "Vision très réduite + résiduelle" },
          { name: "Vision binoculaire: 1/10 + Moins de 1/20", searchTerms: ["vision binoculaire: 1/10 moins 1/20", "1/20 moins 1/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 1/10", "1/10 moins"], rate: 80, description: "Vision très réduite + quasi cécité" },
          { name: "Vision binoculaire: 1/10 + Énucléation", searchTerms: ["vision binoculaire: 1/10 énucléation", "énucléation 1/10 binoculaire: vision", "vision binoculaire:", "binoculaire: 1/10", "1/10 énucléation"], rate: 100, description: "Énucléation + vision très réduite" },
          
          // Ligne 1/20 + X
          { name: "Vision binoculaire: 1/20 + 1/20", searchTerms: ["vision binoculaire: 1/20 1/20", "1/20 1/20 binoculaire: vision", "vision binoculaire:", "binoculaire: 1/20", "1/20 1/20"], rate: 28, description: "Vision résiduelle bilatérale" },
          { name: "Vision binoculaire: 1/20 + Moins de 1/20", searchTerms: ["vision binoculaire: 1/20 moins 1/20", "1/20 moins 1/20 binoculaire: vision", "vision binoculaire:", "binoculaire: 1/20", "1/20 moins"], rate: 90, description: "Vision résiduelle + quasi cécité" },
          { name: "Vision binoculaire: 1/20 + Énucléation", searchTerms: ["vision binoculaire: 1/20 énucléation", "énucléation 1/20 binoculaire: vision", "vision binoculaire:", "binoculaire: 1/20", "1/20 énucléation"], rate: 100, description: "Énucléation + vision résiduelle" },
          
          // Ligne Moins de 1/20 + X
          { name: "Vision binoculaire: Moins de 1/20 + Moins de 1/20", searchTerms: ["vision binoculaire: moins 1/20 moins 1/20", "1/20 moins 1/20 moins binoculaire: vision", "vision binoculaire:", "binoculaire: moins", "moins 1/20"], rate: 30, description: "Quasi cécité bilatérale" },
          { name: "Vision binoculaire: Moins de 1/20 + Énucléation", searchTerms: ["vision binoculaire: moins 1/20 énucléation", "énucléation 1/20 moins binoculaire: vision", "vision binoculaire:", "binoculaire: moins", "moins 1/20"], rate: 100, description: "Énucléation + quasi cécité" },
          
          // Ligne Énucléation + X
          { name: "Vision binoculaire: Énucléation + Énucléation", searchTerms: ["vision binoculaire: énucléation énucléation", "énucléation énucléation binoculaire: vision", "vision binoculaire:", "binoculaire: énucléation", "énucléation énucléation"], rate: 35, description: "Énucléation bilatérale avec prothèses" },
          { name: "Vision binoculaire: Énucléation bilatérale sans prothèse", searchTerms: ["vision binoculaire: énucléation bilatérale sans prothèse", "prothèse sans bilatérale énucléation binoculaire: vision", "vision binoculaire: énucléation bilatérale prothèse", "vision binoculaire:", "binoculaire: énucléation"], rate: 100, description: "Cécité absolue - Incapacité totale" },
        ]
      },
      {
        name: "Yeux - Champ Visuel et Vision Binoculaire",
        injuries: [
          { name: "Rétrécissement concentrique à 30° (un oeil)", searchTerms: ["rétrécissement concentrique 30° oeil", "rétrécissement concentrique 30° vision", "oeil 30° concentrique rétrécissement", "rétrécissement concentrique", "concentrique 30°"], rate: [3, 5] },
          { name: "Rétrécissement concentrique à 30° (deux yeux)", searchTerms: ["rétrécissement concentrique 30° deux yeux", "yeux deux 30° concentrique rétrécissement", "rétrécissement concentrique", "concentrique 30°", "30° deux"], rate: [5, 20] },
          { name: "Rétrécissement du champ visuel (selon degré)", description: "Réduction du champ visuel périphérique suite à un traumatisme oculaire ou crânien.", rate: [5, 80], rateCriteria: { low: "Rétrécissement modéré à 30°, préservant les activités quotidiennes.", high: "Rétrécissement tubulaire à 10° ou moins (vision tubulaire)." } },
          { name: "Rétrécissement concentrique à 10° (un oeil)", searchTerms: ["rétrécissement concentrique 10° oeil", "rétrécissement concentrique 10° vision", "oeil 10° concentrique rétrécissement", "rétrécissement concentrique", "concentrique 10°"], rate: [10, 15] },
          { name: "Rétrécissement concentrique à 10° (deux yeux)", searchTerms: ["rétrécissement concentrique 10° deux yeux", "yeux deux 10° concentrique rétrécissement", "rétrécissement concentrique", "concentrique 10°", "10° deux"], rate: [70, 80] },
          { name: "Scotomes centraux (un oeil)", searchTerms: ["scotomes centraux oeil", "scotomes centraux vision", "oeil centraux scotomes", "scotomes centraux", "centraux oeil"], rate: [15, 30] },
          { name: "Scotomes centraux (deux yeux)", searchTerms: ["scotomes centraux deux yeux", "yeux deux centraux scotomes", "scotomes centraux", "centraux deux", "deux yeux"], rate: [40, 100] },
          { name: "Hémianopsie homonyme droite ou gauche", searchTerms: ["hémianopsie homonyme droite gauche", "gauche droite homonyme hémianopsie", "hémianopsie homonyme", "homonyme droite", "droite gauche"], rate: [30, 35] },
          { name: "Hémianopsie latérale homonyme", description: "Perte de la moitié du champ visuel (même côté sur les deux yeux), généralement post-AVC ou traumatisme crânien.", rate: [30, 35] },
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
          { name: "Taie cornéenne (opacité de la cornée)", description: "Cicatrice cornéenne post-traumatique ou infectieuse, réduisant l'acuité visuelle.", rate: [10, 80], rateCriteria: { low: "Taie périphérique sans impact sur l'acuité visuelle.", high: "Taie centrale dense causant une baisse d'acuité < 1/10." } },
          { name: "Cataracte (selon acuité et complications)", description: "Le taux est basé sur l'acuité visuelle corrigée + majorations pour gêne ou impossibilité de porter un verre. Calcul complexe nécessitant l'acuité précise (ex: OD 3/10, OG 8/10). Utilisez le Guide IA pour saisir les critères cliniques détaillés.", rate: [10, 100], rateCriteria: { low: "Acuité visuelle OD ≥ 8/10 et OG ≥ 8/10 avec correction adaptée, aucune complication.", medium: "Acuité visuelle entre 3/10 et 7/10 sur au moins un œil, ou difficulté au port de correction.", high: "Acuité visuelle < 3/10 sur un ou deux yeux, ou impossibilité de porter une correction (aphaquie non opérée, intolérance aux verres)." } },
          { name: "Aphakie (cataracte opérée) unilatérale avec correction optique", searchTerms: ["aphakie cataracte opérée unilatérale avec correction optique", "optique correction avec unilatérale opérée cataracte aphakie", "aphakie cataracte opérée unilatérale correction optique", "aphakie cataracte", "cataracte opérée"], rate: 15, description: "Absence de cristallin après extraction chirurgicale de cataracte post-traumatique, avec correction par verre ou lentille. Ce taux S'AJOUTE à celui de la baisse d'acuité visuelle résiduelle (évaluée séparément selon tableau)." },
          { name: "Aphakie (cataracte opérée) bilatérale avec correction optique", searchTerms: ["aphakie cataracte opérée bilatérale avec correction optique", "optique correction avec bilatérale opérée cataracte aphakie", "aphakie cataracte opérée bilatérale correction optique", "aphakie cataracte", "cataracte opérée"], rate: 35, description: "Absence de cristallin bilatérale après extraction chirurgicale. Ce taux S'AJOUTE à celui de la baisse d'acuité visuelle (max total 100%). Gêne importante pour vision rapprochée et vision binoculaire." },
          { name: "Hémorragies du vitré", description: "L'incapacité est évaluée en fonction de la baisse d'acuité visuelle résiduelle, si elle ne se résorbe pas.", rate: [0, 100] },
          { name: "Hémorragie du vitré persistante", description: "Hémorragie intraoculaire persistante après trauma, réduisant la transparence des milieux.", rate: [10, 80], rateCriteria: { low: "Hémorragie minime, acuité préservée.", high: "Hémorragie dense, acuité réduite < 1/10." } },
          { name: "Décollement de la rétine post-traumatique", description: "L'incapacité est évaluée en fonction des séquelles sur l'acuité visuelle et le champ visuel.", rate: [0, 100] },
          { name: "Décollement de rétine (selon extension et succès chirurgical)", description: "Décollement rétinien post-traumatique nécessitant une chirurgie.", rate: [10, 100], rateCriteria: { low: "Décollement périphérique, rétine réappliquée après chirurgie, acuité conservée.", high: "Décollement maculaire ou échec chirurgical avec cécité." } },
          { name: "Atrophie optique post-traumatique", searchTerms: ["atrophie optique post traumatique", "traumatique post optique atrophie", "atrophie optique", "optique post", "post traumatique"], rate: [30, 80], description: "Dégénérescence des fibres du nerf optique suite à un traumatisme crânien ou orbitaire, conduisant à une perte de vision progressive et irréversible.", rateCriteria: { low: "Atteinte unilatérale avec acuité visuelle corrigée > 2/10 et champ visuel modérément altéré.", high: "Atteinte bilatérale sévère avec acuité visuelle < 1/10 et/ou champ visuel tubulaire." } },
          { name: "Atrophie optique (selon degré de perte visuelle)", description: "Dégénérescence du nerf optique post-traumatique.", rate: [30, 80], rateCriteria: { low: "Atrophie partielle unilatérale, acuité > 2/10.", high: "Atrophie bilatérale sévère, acuité < 1/10." } },
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
          { name: "Endophtalmie post-traumatique (séquelles d'infection oculaire)", description: "Infection sévère de l'œil après plaie perforante.", rate: [10, 35], rateCriteria: { low: "Infection contrôlée, séquelles minimes.", high: "Phtisie du globe, énucléation." } },
          { name: "Cécité absolue (deux yeux)", description: "Perte totale de la vision bilatérale.", rate: 100 },
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
          { name: "Voies lacrymales - Larmoiement unilatéral", searchTerms: ["voies lacrymales larmoiement unilatéral", "unilatéral larmoiement lacrymales voies", "voies lacrymales", "lacrymales larmoiement", "larmoiement unilatéral"], rate: [0, 5], description: "Épiphora (larmoiement chronique) dû à une obstruction ou lésion des voies lacrymales post-traumatique, unilatéral." },
          { name: "Voies lacrymales - Larmoiement bilatéral", searchTerms: ["voies lacrymales larmoiement bilatéral", "bilatéral larmoiement lacrymales voies", "voies lacrymales", "lacrymales larmoiement", "larmoiement bilatéral"], rate: [5, 10], description: "Épiphora bilatéral chronique. Gêne importante dans les activités quotidiennes et professionnelles (vision brouillée, essuyages fréquents)." },
          { name: "Voies lacrymales - Fistules lacrymales (un œil)", searchTerms: ["voies lacrymales fistules lacrymales œil", "voies lacrymales fistules lacrymales vision", "œil lacrymales fistules lacrymales voies", "voies lacrymales", "lacrymales fistules"], rate: [5, 10], description: "Fistule cutanée avec écoulement lacrymal externe permanent, nécessitant pansements fréquents. Gêne esthétique et fonctionnelle." },
          { name: "Voies lacrymales - Fistules lacrymales (deux yeux)", searchTerms: ["voies lacrymales fistules lacrymales deux yeux", "yeux deux lacrymales fistules lacrymales voies", "voies lacrymales", "lacrymales fistules", "fistules lacrymales"], rate: [10, 15], description: "Fistules lacrymales bilatérales. Gêne majeure avec écoulements permanents bilatéraux." },
          { name: "Orbite - Fracture du plancher de l'orbite (Blow-out) avec séquelles", searchTerms: ["orbite fracture plancher l'orbite blow out avec séquelles", "séquelles avec out blow l'orbite plancher fracture orbite", "orbite fracture plancher l'orbite blow out séquelles", "orbite fracture", "fracture plancher"], rate: [5, 25], description: "Séquelles d'une fracture du plancher orbitaire, telles que la diplopie (vision double), l'énophtalmie (recul du globe oculaire) ou l'hypoesthésie dans le territoire du nerf sous-orbitaire.", rateCriteria: { low: "Hypoesthésie sous-orbitaire isolée et discrète, ou diplopie uniquement dans les regards extrêmes.", high: "Diplopie invalidante dans le regard primaire, et/ou énophtalmie inesthétique > 2mm." } },
          { name: "Orbite - Paralysie d'un ou plusieurs nerfs oculo-moteurs (voir diplopie)", searchTerms: ["orbite paralysie d'un plusieurs nerfs oculo moteurs voir diplopie", "diplopie voir moteurs oculo nerfs plusieurs d'un paralysie orbite", "orbite paralysie", "paralysie d'un", "d'un plusieurs"], rate: [5, 25] },
          { name: "Orbite - Névrites, névralgies du nerf V (trijumeau)", searchTerms: ["orbite névrites, névralgies nerf trijumeau", "trijumeau nerf névralgies névrites, orbite", "orbite névrites,", "névrites, névralgies", "névralgies nerf"], rate: [15, 25] },
          { name: "Orbite - Altérations vasculaires (anévrisme, etc.)", description: "À indemniser selon les troubles fonctionnels.", rate: [10, 30] },
          { name: "Paupières - Entropion (enroulement du bord palpébral vers l'intérieur)", searchTerms: ["paupières entropion enroulement bord palpébral intérieur", "entropion cils frottement cornée", "entropion paupière enroulée", "bord palpébral enroulement entropion"], rate: [5, 20], description: "Enroulement pathologique du bord libre de la paupière vers l'intérieur, entraînant un frottement des cils sur la cornée (irritation, larmoiement, kératite). À ajouter à la diminution de vision et défiguration éventuelle. Barème officiel : 5-20%.", rateCriteria: { low: "Entropion partiel ou intermittent, irritation modérée, bien contrôlé par lubrification.", medium: "Entropion permanent nécessitant une chirurgie, kératite superficielle récidivante.", high: "Entropion sévère bilatéral avec complications cornéennes (ulcération, cicatrices), déficit visuel associé." } },
          { name: "Paupières - Trichiasis (déviation des cils vers l'œil)", searchTerms: ["paupières trichiasis déviation cils vers œil", "trichiasis cils mal orientés cornée", "trichiasis frottement cils", "cils déviation trichiasis"], rate: [5, 20], description: "Orientation anormale des cils (cils poussant vers l'intérieur) qui frottent sur la cornée, entraînant irritation chronique, larmoiement, kératite. Peut résulter de cicatrices palpébrales post-traumatiques. À ajouter à la diminution de vision et défiguration. Barème officiel : 5-20%.", rateCriteria: { low: "Quelques cils mal orientés, irritation légère, épilation régulière suffisante.", medium: "Trichiasis étendu nécessitant épilations fréquentes ou électrolyse, kératite ponctuelle récidivante.", high: "Trichiasis sévère avec ulcération cornéenne, cicatrices cornéennes, baisse de vision associée." } },
          { name: "Paupières - Ectropion (éversion du bord palpébral vers l'extérieur)", searchTerms: ["paupières ectropion éversion bord palpébral extérieur", "ectropion paupière retournée", "ectropion exposition cornée", "bord palpébral éversion ectropion"], rate: [5, 20], description: "Éversion pathologique du bord libre de la paupière vers l'extérieur, exposant la conjonctive et compromettant l'occlusion palpébrale. Entraîne larmoiement paradoxal, kératite d'exposition, conjonctivite chronique. À ajouter à la diminution de vision et défiguration. Barème officiel : 5-20%.", rateCriteria: { low: "Ectropion partiel avec larmoiement, sans kératite majeure.", medium: "Ectropion complet avec kératite d'exposition modérée, nécessitant une chirurgie.", high: "Ectropion sévère bilatéral avec lagophtalmie associée, kératite sévère, ulcération cornéenne." } },
          { name: "Paupières - Symblépharon (adhérence entre paupière et globe oculaire)", searchTerms: ["paupières symblépharon adhérence paupière globe oculaire", "symblépharon paupière collée œil", "symblépharon adhérence conjonctivale", "adhérence paupière globe symblépharon"], rate: [5, 20], description: "Adhérence cicatricielle anormale entre la conjonctive palpébrale et la conjonctive bulbaire (globe oculaire), limitant la mobilité oculaire et palpébrale. Séquelle de brûlure, traumatisme ou inflammation sévère. À ajouter à la diminution de vision et défiguration. Barème officiel : 5-20%.", rateCriteria: { low: "Symblépharon partiel avec limitation modérée de la mobilité oculaire, sans diplopie.", medium: "Symblépharon étendu avec limitation importante des mouvements oculaires, diplopie dans certains champs du regard.", high: "Symblépharon total avec blocage quasi-complet de la mobilité oculaire, kératopathie sévère, perte fonctionnelle de l'œil." } },
          { name: "Paupières - Ankyloblépharon (adhérence entre les deux paupières)", searchTerms: ["paupières ankyloblépharon adhérence deux paupières", "ankyloblépharon paupières collées", "ankyloblépharon fusion palpébrale", "adhérence paupières ankyloblépharon"], rate: [5, 20], description: "Adhérence cicatricielle entre les paupières supérieure et inférieure, entraînant une fermeture partielle ou totale de la fente palpébrale. Séquelle de brûlure ou traumatisme sévère. À ajouter à la diminution de vision et défiguration. Barème officiel : 5-20%.", rateCriteria: { low: "Ankyloblépharon partiel (adhérence commissurale externe ou interne) avec fente palpébrale suffisante pour la vision.", medium: "Ankyloblépharon étendu réduisant significativement la fente palpébrale, nécessitant une chirurgie.", high: "Ankyloblépharon quasi-total avec occlusion majeure, amblyopie fonctionnelle, défiguration importante." } },
          { name: "Paupières - Cicatrices vicieuses palpébrales (selon étendue)", searchTerms: ["paupières cicatrices vicieuses palpébrales étendue", "cicatrices palpébrales rétractiles", "cicatrices paupières déformation", "cicatrices vicieuses paupière"], rate: [5, 20], description: "Cicatrices rétractiles ou déformantes des paupières entraînant des séquelles fonctionnelles (lagophtalmie, ectropion, entropion) et/ou esthétiques. À ajouter à la diminution de vision et défiguration. Barème officiel : 5-20%." },
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
          { name: "Perte complète d'un pavillon de l'oreille", description: "Amputation ou destruction complète du pavillon auriculaire (oreille externe) d'un côté. Préjudice principalement esthétique, gêne minime pour l'audition si conduit auditif préservé.", rate: 2 },
          { name: "Perte complète des deux pavillons de l'oreille", description: "Amputation ou destruction bilatérale des pavillons auriculaires. Préjudice esthétique majeur, difficultés port de lunettes/masques, gêne auditive légère (directionnalité).", rate: 6 },
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
          { name: "Surdité unilatérale faible", description: "Perte auditive légère unilatérale (20-40 dB), l'autre oreille étant normale.", rate: [0, 3] },
          { name: "Surdité unilatérale moyenne", description: "Perte auditive moyenne unilatérale (40-70 dB), l'autre oreille étant normale.", rate: [10, 15] },
          { name: "Surdité unilatérale profonde", description: "Perte auditive profonde (> 80 dB) d'une oreille, l'autre étant normale.", rate: 20 },
          { name: "Surdité complète d'une oreille (cophose unilatérale)", description: "Perte auditive totale unilatérale, l'autre oreille étant normale.", rate: 20 },
          { name: "Surdité bilatérale faible", description: "Perte auditive bilatérale légère (20-40 dB bilatéral). Gêne dans environnements bruyants, difficultés conversationnelles.", rate: [5, 20] },
          { name: "Surdité bilatérale moyenne", description: "Perte auditive bilatérale moyenne (40-70 dB). Nécessité d'appareillage auditif, difficultés communication quotidienne.", rate: [25, 35] },
          { name: "Surdité bilatérale forte", description: "Perte auditive bilatérale sévère (70-90 dB). Appareillage indispensable, isolement social, difficultés professionnelles majeures.", rate: [40, 50] },
          { name: "Surdité bilatérale absolue (cophose bilatérale)", description: "Perte auditive totale bilatérale (> 90 dB ou pratiquement totale). Handicap majeur nécessitant langage des signes ou lecture labiale. Isolement social et professionnel.", rate: 70 },
          { name: "Surdité - Table de Pythagore: V.H. 5m / V.H. normale", description: "Voix Haute perçue à 5 mètres d'un côté, normale de l'autre. Gêne légère.", rate: 3 },
          { name: "Surdité - Table de Pythagore: V.H. 2-4m / V.H. normale", description: "Voix Haute perçue à 2-4 mètres d'un côté, normale de l'autre.", rate: 5 },
          { name: "Surdité - Table de Pythagore: V.H. 1-2m / V.H. normale", description: "Voix Haute perçue à 1-2 mètres d'un côté, normale de l'autre.", rate: 8 },
          { name: "Surdité - Table de Pythagore: V.H. < 1m / V.H. normale", description: "Voix Haute perçue à moins de 1 mètre d'un côté, normale de l'autre.", rate: 12 },
          { name: "Surdité - Table de Pythagore: Non perçue / V.H. normale", description: "Voix Haute non perçue d'un côté (cophose unilatérale), normale de l'autre.", rate: 15 },
          { name: "Surdité - Table de Pythagore: V.H. 2-4m / V.H. 2-4m", description: "Voix Haute perçue à 2-4 mètres bilatéral. Gêne bilatérale modérée.", rate: 15 },
          { name: "Surdité - Table de Pythagore: V.H. 1-2m / V.H. 1-2m", description: "Voix Haute perçue à 1-2 mètres bilatéral. Surdité bilatérale importante.", rate: 25 },
          { name: "Surdité - Table de Pythagore: Non perçue / Non perçue", description: "Voix Haute non perçue bilatéral (cophose bilatérale pratiquement totale).", rate: 70 },
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
          { name: "Sténose nasale unilatérale avec rhinopharyngite chronique", searchTerms: ["sténose nasale unilatérale avec rhinopharyngite chronique", "chronique rhinopharyngite avec unilatérale nasale sténose", "sténose nasale unilatérale rhinopharyngite chronique", "sténose nasale", "nasale unilatérale"], rate: [3, 6], description: "Obstruction nasale unilatérale post-traumatique compliquée d'une inflammation chronique du rhinopharynx (sécrétions postérieures, toux chronique, infections ORL répétées)." },
          { name: "Sténose nasale totale avec catarrhe tubo-tympanique", searchTerms: ["sténose nasale totale avec catarrhe tubo tympanique", "tympanique tubo catarrhe avec totale nasale sténose", "sténose nasale totale catarrhe tubo tympanique", "sténose nasale", "nasale totale"], rate: [6, 10], description: "Obstruction nasale complète unilatérale avec retentissement sur la trompe d'Eustache homolatérale, entraînant une otite séro-muqueuse chronique (épanchement de l'oreille moyenne, hypoacousie de transmission, sensation d'oreille bouchée)." },
          { name: "Sténose nasale bilatérale serrée avec respiration buccale exclusive", searchTerms: ["sténose nasale bilatérale serrée avec respiration buccale exclusive", "exclusive buccale respiration avec serrée bilatérale nasale sténose", "sténose nasale bilatérale serrée respiration buccale exclusive", "sténose nasale", "nasale bilatérale"], rate: [12, 20], description: "Obstruction nasale bilatérale quasi-totale obligeant à une respiration buccale permanente. Troubles du sommeil (apnées, ronflements), sécheresse buccale chronique, infections ORL répétées, altération de l'odorat, gêne sociale et professionnelle majeure." },
          { name: "Sténose nasale bilatérale légère", searchTerms: ["sténose nasale bilatérale légère", "légère bilatérale nasale sténose", "sténose nasale", "nasale bilatérale", "bilatérale légère"], rate: [5, 8] },
          { name: "Sténose nasale bilatérale accentuée", searchTerms: ["sténose nasale bilatérale accentuée", "accentuée bilatérale nasale sténose", "sténose nasale", "nasale bilatérale", "bilatérale accentuée"], rate: [8, 12] },
          { name: "Sténose nasale bilatérale serrée", searchTerms: ["sténose nasale bilatérale serrée", "serrée bilatérale nasale sténose", "sténose nasale", "nasale bilatérale", "bilatérale serrée"], rate: [12, 20] },
          { name: "Perforation de la cloison nasale", searchTerms: ["perforation cloison nasale", "nasale cloison perforation", "perforation cloison", "cloison nasale"], rate: 0 },
          { name: "Anosmie (perte de l'odorat)", searchTerms: ["anosmie perte l'odorat", "anosmie amputation l'odorat", "l'odorat perte anosmie", "anosmie perte", "perte l'odorat"], rate: [5, 10] },
          { name: "Anosmie avec nécessité de changement de profession", searchTerms: ["anosmie avec nécessité changement profession", "profession changement nécessité avec anosmie", "anosmie nécessité changement profession", "anosmie avec", "avec nécessité"], rate: [20, 30] },
          { name: "Dysgueusie (distorsion du goût) ou Cacosmie (perception d'odeurs nauséabondes)", searchTerms: ["dysgueusie distorsion goût cacosmie perception d'odeurs nauséabondes", "nauséabondes d'odeurs perception cacosmie goût distorsion dysgueusie", "dysgueusie distorsion", "distorsion goût", "goût cacosmie"], rate: [5, 15], description: "Altération qualitative de l'odorat ou du goût, entraînant la perception d'odeurs ou de saveurs désagréables, souvent avec un retentissement sur l'alimentation et la qualité de vie.", rateCriteria: { low: "Distorsions occasionnelles, n'entraînant pas de dégoût alimentaire majeur.", high: "Perceptions désagréables quasi-permanentes, avec aversion alimentaire, perte de poids et retentissement psychologique." } },
          { name: "Troubles esthétiques par mutilation nasale", searchTerms: ["troubles esthétiques par mutilation nasale", "nasale mutilation par esthétiques troubles", "troubles esthétiques", "esthétiques par", "par mutilation"], rate: [5, 30], description: "Déformation esthétique du nez après traumatisme (déviation, ensellure, amputation partielle). Barème officiel Art. 40 : 5-30%.", rateCriteria: { low: "Déformation mineure, discrète, sans retentissement social.", medium: "Déformation visible entraînant une gêne sociale modérée.", high: "Mutilation majeure (amputation partielle, déformation sévère) avec retentissement psycho-social important." } },
          { name: "Sinusite maxillaire post-traumatique - Unilatérale", searchTerms: ["sinusite maxillaire post traumatique unilatérale", "sinusite maxillaire un côté", "sinusite maxillaire unilatérale chronique", "infection sinus maxillaire"], rate: [5, 10], description: "Sinusite maxillaire chronique unilatérale persistante après traumatisme facial. Barème officiel Art. 41 : 5-10%.", rateCriteria: { low: "Épisodes infectieux occasionnels, bien contrôlés par traitement médical.", high: "Infections récidivantes fréquentes, nécessitant des traitements antibiotiques répétés et/ou une chirurgie." } },
          { name: "Sinusite maxillaire post-traumatique - Bilatérale", searchTerms: ["sinusite maxillaire post traumatique bilatérale", "sinusite maxillaire deux côtés", "sinusite maxillaire bilatérale chronique", "infection sinus maxillaires bilatérale"], rate: [10, 15], description: "Sinusite maxillaire chronique bilatérale persistante après traumatisme facial. Barème officiel Art. 41 : 10-15%.", rateCriteria: { low: "Épisodes infectieux bilatéraux occasionnels, traitement médical efficace.", high: "Infections bilatérales récidivantes, douleurs chroniques, nécessité de chirurgie bilatérale." } },
          { name: "Sinusite maxillaire avec fistule persistante", searchTerms: ["sinusite maxillaire avec fistule persistante", "fistule sinusienne maxillaire", "sinusite maxillaire fistule cutanée", "fistule sinus maxillaire"], rate: [10, 20], description: "Sinusite maxillaire chronique avec fistule cutanée ou bucco-sinusienne persistante. Majoration de 5-10% pour fistule selon barème officiel Art. 41.", rateCriteria: { low: "Fistule de petite taille avec écoulement minime, pansements occasionnels.", high: "Fistule large avec écoulement purulent fréquent, infections répétées, nécessité de pansements quotidiens et chirurgie complexe." } },
          { name: "Sinusite fronto-ethmoïdale post-traumatique - Unilatérale", searchTerms: ["sinusite fronto ethmoïdale post traumatique unilatérale", "sinusite frontale ethmoïdale unilatérale", "sinusite fronto ethmoïde un côté", "infection sinus frontal ethmoïde"], rate: [10, 20], description: "Sinusite fronto-ethmoïdale chronique unilatérale persistante après traumatisme crânio-facial. Barème officiel Art. 41 : 10-20%.", rateCriteria: { low: "Épisodes infectieux occasionnels, céphalées modérées, traitement médical efficace.", high: "Infections récidivantes sévères, céphalées chroniques invalidantes, ostéite frontale, nécessité de chirurgie complexe." } },
          { name: "Sinusite fronto-ethmoïdale post-traumatique - Bilatérale", searchTerms: ["sinusite fronto ethmoïdale post traumatique bilatérale", "sinusite frontale ethmoïdale bilatérale", "sinusite fronto ethmoïde deux côtés", "infection sinus frontaux ethmoïdes bilatérale"], rate: [20, 30], description: "Sinusite fronto-ethmoïdale chronique bilatérale persistante après traumatisme crânio-facial. Barème officiel Art. 41 : 20-30%.", rateCriteria: { low: "Épisodes infectieux bilatéraux modérés, céphalées intermittentes.", high: "Infections bilatérales sévères récidivantes, céphalées chroniques majeures, ostéite bilatérale, chirurgies répétées." } },
          { name: "Sinusite fronto-ethmoïdale avec fistule persistante", searchTerms: ["sinusite fronto ethmoïdale avec fistule persistante", "fistule frontale", "sinusite frontale fistule cutanée", "fistule sinus frontal"], rate: [15, 30], description: "Sinusite fronto-ethmoïdale chronique avec fistule cutanée persistante (écoulement purulent frontal). Majoration de 5-10% pour fistule selon barème officiel Art. 41.", rateCriteria: { low: "Fistule de petite taille avec écoulement minime, aspect esthétique acceptable.", high: "Fistule large avec écoulement purulent abondant, déformation frontale, infections récidivantes, retentissement esthétique et fonctionnel majeur." } },
          { name: "Sinusite sphénoïdale post-traumatique - Unilatérale", searchTerms: ["sinusite sphénoïdale post traumatique unilatérale", "sinusite sphénoïde unilatérale", "infection sinus sphénoïde un côté"], rate: [10, 20], description: "Sinusite sphénoïdale chronique unilatérale persistante après traumatisme crânien. Barème officiel Art. 41 : 10-20%.", rateCriteria: { low: "Épisodes infectieux rares, céphalées rétro-orbitaires modérées.", high: "Infections récidivantes, céphalées chroniques sévères, complications neuro-ophtalmologiques (risque d'atteinte du nerf optique, de la carotide interne)." } },
          { name: "Sinusite sphénoïdale post-traumatique - Bilatérale", searchTerms: ["sinusite sphénoïdale post traumatique bilatérale", "sinusite sphénoïde bilatérale", "infection sinus sphénoïdes bilatérale"], rate: [20, 30], description: "Sinusite sphénoïdale chronique bilatérale persistante après traumatisme crânien. Barème officiel Art. 41 : 20-30%.", rateCriteria: { low: "Épisodes infectieux bilatéraux modérés, céphalées intermittentes.", high: "Infections bilatérales sévères, céphalées chroniques invalidantes, risque de complications neuro-ophtalmologiques bilatérales." } },
          { name: "Crânio-hydrorrhée - Écoulement de liquide céphalo-rachidien (LCR) par fosse nasale", searchTerms: ["crânio hydrorrhée écoulement liquide céphalo rachidien lcr fosse nasale", "fuite lcr nez", "liquide cérébro-spinal rhinorrhée", "écoulement lcr post traumatique"], rate: 100, description: "Fuite persistante de LCR par le nez après fracture du crâne avec brèche ostéo-méningée. Risque majeur d'infection (méningite). Incapacité totale tant que non réparée. Barème officiel Art. 41 : 100%." },
          { name: "Rhinites croûteuses post-traumatiques - Unilatérale", searchTerms: ["rhinites croûteuses post traumatiques unilatérale", "rhinite croûteuse un côté", "croûtes nasales unilatérale"], rate: [5, 10], description: "Rhinite croûteuse affectant une seule fosse nasale. Barème officiel Art. 41 : 5-10%." },
          { name: "Rhinites croûteuses post-traumatiques - Bilatérale", searchTerms: ["rhinites croûteuses post traumatiques bilatérale", "rhinite croûteuse deux côtés", "croûtes nasales bilatérale"], rate: [10, 20], description: "Rhinite croûteuse affectant les deux fosses nasales. Barème officiel Art. 41 : 10-20%." },
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
          { name: "Dysphonie seule (trouble de la voix sans dyspnée)", searchTerms: ["dysphonie seule trouble voix sans dyspnée", "dysphonie isolée sans dyspnée", "trouble voix seul dysphonie", "voix rauque enrouée"], rate: [5, 15], description: "Trouble isolé de la voix (voix rauque, voilée, bitonale) sans difficulté respiratoire. Barème officiel Art. 42 : 5-15%.", rateCriteria: { low: "Dysphonie légère, voix fatigable, gêne minime dans la vie courante.", medium: "Dysphonie modérée, voix altérée en permanence, gêne dans les métiers nécessitant l'usage de la voix.", high: "Dysphonie sévère, voix très altérée, impossibilité d'exercer les professions vocales (enseignant, commercial, etc.)." } },
          { name: "Aphonie sans dyspnée (perte complète de la voix sans trouble respiratoire)", searchTerms: ["aphonie sans dyspnée perte voix", "aphonie complète sans dyspnée", "perte totale voix sans dyspnée", "mutisme aphonie"], rate: [20, 30], description: "Perte complète de la voix (aphonie totale) sans difficulté respiratoire associée. Communication par chuchotement uniquement. Barème officiel Art. 42 : 20-30%.", rateCriteria: { low: "Aphonie avec possibilité de chuchotement audible, pas de handicap respiratoire.", high: "Aphonie totale avec chuchotement à peine audible, retentissement socio-professionnel majeur." } },
          { name: "Paralysie récurrentielle (corde vocale) post-traumatique unilatérale", searchTerms: ["paralysie récurrentielle corde vocale post traumatique unilatérale", "unilatérale traumatique post vocale corde récurrentielle paralysie", "paralysie récurrentielle", "récurrentielle corde", "corde vocale"], rate: [10, 25], rateCriteria: { low: "Dysphonie modérée, voix bitonale, sans dyspnée.", high: "Aphonie ou dysphonie sévère avec dyspnée d'effort." } },
          { name: "Dyspnée laryngée n'apparaissant qu'au moment d'un effort violent", searchTerms: ["dyspnée laryngée effort violent seulement", "dyspnée laryngée uniquement effort intense", "gêne respiratoire effort violent larynx", "essoufflement laryngé effort"], rate: [20, 40], description: "Dyspnée laryngée (gêne respiratoire d'origine laryngée) survenant uniquement lors d'efforts violents (course, montée rapide d'escaliers). Pas de gêne au repos ou lors d'activités modérées. Barème officiel Art. 42 : 20-40%.", rateCriteria: { low: "Dyspnée uniquement lors d'efforts très intenses (course rapide), vie quotidienne non affectée.", medium: "Dyspnée lors d'efforts modérés à intenses (marche rapide prolongée, montée d'escaliers), limitation des activités physiques.", high: "Dyspnée dès effort léger à modéré, limitation importante des activités professionnelles et sportives." } },
          { name: "Dyspnée laryngée permanente entravant l'exercice même d'un métier sédentaire", searchTerms: ["dyspnée laryngée permanente métier sédentaire", "dyspnée laryngée repos métier sédentaire", "gêne respiratoire permanente larynx handicap professionnel", "essoufflement permanent laryngé"], rate: [60, 80], description: "Dyspnée laryngée permanente (gêne respiratoire présente même au repos ou lors d'efforts minimes) empêchant l'exercice d'un métier sédentaire. Barème officiel Art. 42 : 60-80%.", rateCriteria: { low: "Dyspnée permanente modérée, gêne au repos, capacité de travail sédentaire très limitée.", high: "Dyspnée permanente sévère, gêne respiratoire majeure même au repos, impossibilité de toute activité professionnelle, risque d'insuffisance respiratoire." } },
          { name: "Sténose laryngo-trachéale post-traumatique", searchTerms: ["sténose laryngo trachéale post traumatique", "traumatique post trachéale laryngo sténose", "sténose laryngo", "laryngo trachéale", "trachéale post"], rate: [20, 100], rateCriteria: { low: "Dyspnée d'effort modérée, voix conservée.", high: "Dyspnée de repos nécessitant une trachéotomie permanente." } },
          { name: "Syndrome d'apnées-hypopnées du sommeil (SAHS) post-traumatique", searchTerms: ["syndrome d'apnées hypopnées sommeil sahs post traumatique", "traumatique post sahs sommeil hypopnées d'apnées syndrome", "syndrome d'apnées", "d'apnées hypopnées", "hypopnées sommeil"], rate: [10, 30], description: "Apparition ou aggravation d'un SAHS après un traumatisme facial, mandibulaire ou crânien, confirmée par polysomnographie.", rateCriteria: { low: "SAHS modéré (IAH entre 15 et 30/h) avec somnolence diurne, bien contrôlé par orthèse d'avancée mandibulaire.", high: "SAHS sévère (IAH > 30/h) avec complications cardiovasculaires, nécessitant un traitement par Pression Positive Continue (PPC)." } },
          { name: "Troubles respiratoires (dyspnée laryngée)", searchTerms: ["troubles respiratoires dyspnée laryngée", "laryngée dyspnée respiratoires troubles", "troubles respiratoires", "respiratoires dyspnée", "dyspnée laryngée"], rate: [20, 100] },
          { name: "Laryngostomie ou trachéotomie permanente", searchTerms: ["laryngostomie trachéotomie permanente", "trachéotomie définitive", "laryngostomie définitive", "stomie trachéale permanente"], rate: 100, description: "Laryngostomie ou trachéotomie définitive (orifice permanent dans la trachée pour respirer). Incapacité totale. Barème officiel Art. 42 : 100%." },
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
          { name: "Fracture du sternum", searchTerms: ["fracture sternum"], rate: 10, description: "Fracture du sternum avec séquelles (douleurs, limitation respiratoire)." },
          { name: "Fracture de côtes non compliquée (selon gêne et nombre)", searchTerms: ["fracture côtes non compliquée selon gêne nombre", "nombre gêne selon compliquée non côtes fracture", "fracture côtes", "côtes non", "non compliquée"], rate: [2, 30] },
          { name: "Fractures multiples de côtes - Avec séquelles respiratoires", searchTerms: ["fractures multiples côtes avec séquelles respiratoires", "respiratoires séquelles avec côtes multiples fractures", "fractures multiples côtes séquelles respiratoires", "fractures multiples", "multiples côtes"], rate: 15, description: "Fractures multiples de côtes avec séquelles respiratoires (dyspnée d'effort)." },
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
          { name: "Pneumonie traumatique avec séquelles respiratoires", searchTerms: ["pneumonie traumatique avec séquelles respiratoires", "respiratoires séquelles avec traumatique pneumonie", "pneumonie traumatique séquelles respiratoires", "pneumonie traumatique", "traumatique avec"], rate: 5, description: "Séquelles d'une pneumonie survenue après un traumatisme thoracique (contusion pulmonaire, inhalation). Dyspnée d'effort résiduelle modérée." },
          { name: "Bronchite chronique post-traumatique aggravée", searchTerms: ["bronchite chronique post traumatique aggravée", "aggravée traumatique post chronique bronchite", "bronchite chronique", "chronique post", "post traumatique"], rate: [5, 20], description: "Aggravation d'une bronchite chronique préexistante ou apparition de bronchite chronique après traumatisme thoracique sévère avec infections bronchiques répétées.", rateCriteria: { low: "Toux matinale productive, sans limitation fonctionnelle majeure.", high: "Bronchite chronique obstructive avec dyspnée d'effort invalidante (VEMS < 50%)." } },
          { name: "Insuffisance respiratoire grave post-traumatique", searchTerms: ["insuffisance respiratoire grave post traumatique", "traumatique post grave respiratoire insuffisance", "insuffisance respiratoire", "respiratoire grave", "grave post"], rate: [50, 80], description: "Insuffisance respiratoire chronique sévère nécessitant une oxygénothérapie au long cours ou une assistance ventilatoire, conséquence d'un traumatisme thoracique majeur (fracas thoracique, contusions pulmonaires bilatérales étendues, SDRA post-traumatique).", rateCriteria: { low: "Oxygénothérapie nocturne ou à l'effort, autonomie conservée.", high: "Oxygénothérapie permanente ou ventilation non invasive, dépendance majeure, dyspnée au moindre effort." } },
          { name: "Rupture trachéo-bronchique sans obstruction", searchTerms: ["rupture trachéo bronchique sans obstruction", "obstruction sans bronchique trachéo rupture", "rupture trachéo bronchique obstruction", "rupture trachéo", "trachéo bronchique"], rate: [0, 30], description: "Séquelles d'une rupture traumatique de la trachée ou d'une bronche, réparée chirurgicalement, sans sténose résiduelle significative. Peut inclure des épisodes de toux chronique ou des infections bronchiques répétées.", rateCriteria: { low: "Asymptomatique ou toux occasionnelle.", high: "Infections bronchiques fréquentes, bronchorrhée chronique, gêne respiratoire modérée." } },
          { name: "Rupture trachéo-bronchique avec obstruction d'une bronche lobaire", searchTerms: ["rupture trachéo bronchique avec obstruction d'une bronche lobaire", "lobaire bronche d'une obstruction avec bronchique trachéo rupture", "rupture trachéo bronchique obstruction d'une bronche lobaire", "rupture trachéo", "trachéo bronchique"], rate: [20, 30], description: "Obstruction post-traumatique d'une bronche lobaire entraînant une atélectasie lobaire ou des infections récidivantes du lobe atteint. Gêne respiratoire modérée avec perte de fonction du lobe concerné." },
          { name: "Rupture trachéo-bronchique avec obstruction d'une bronche souche", searchTerms: ["rupture trachéo bronchique avec obstruction d'une bronche souche", "souche bronche d'une obstruction avec bronchique trachéo rupture", "rupture trachéo bronchique obstruction d'une bronche souche", "rupture trachéo", "trachéo bronchique"], rate: [40, 50], description: "Obstruction d'une bronche souche (principale droite ou gauche) avec atélectasie ou exclusion fonctionnelle d'un poumon entier. Insuffisance respiratoire marquée, dyspnée au moindre effort." },
          { name: "Lobectomie pulmonaire non compliquée", searchTerms: ["lobectomie pulmonaire non compliquée", "poumon poumon non compliquée", "compliquée non pulmonaire lobectomie", "lobectomie pulmonaire", "pulmonaire non"], rate: [20, 30], description: "Ablation chirurgicale d'un lobe pulmonaire après traumatisme thoracique (contusion, lacération, hémothorax massif). Récupération fonctionnelle correcte, dyspnée d'effort modérée, sans complication infectieuse ou respiratoire majeure." },
          { name: "Lobectomie pulmonaire compliquée", searchTerms: ["lobectomie pulmonaire compliquée", "poumon poumon compliquée", "compliquée pulmonaire lobectomie", "lobectomie pulmonaire", "pulmonaire compliquée"], rate: [20, 80], description: "Lobectomie avec complications post-opératoires (fistule broncho-pleurale, pyothorax chronique, insuffisance respiratoire sévère, douleurs thoraciques chroniques invalidantes, nécessité d'une thoracoplastie).", rateCriteria: { low: "Complications mineures (douleurs résiduelles, infections occasionnelles).", high: "Complications majeures (fistule persistante, insuffisance respiratoire avec oxygénothérapie, thoracoplastie mutilante)." } },
          { name: "Pneumectomie sans complications", searchTerms: ["pneumectomie sans complications", "complications sans pneumectomie", "pneumectomie complications", "pneumectomie sans", "sans complications"], rate: 60, description: "Ablation chirurgicale complète d'un poumon après traumatisme thoracique majeur. Patient bien compensé sur le poumon restant, dyspnée d'effort marquée mais autonomie conservée pour les activités de la vie quotidienne, sans complication infectieuse ou cardio-respiratoire." },
          { name: "Pneumectomie avec complications", searchTerms: ["pneumectomie avec complications", "complications avec pneumectomie", "pneumectomie complications", "pneumectomie avec", "avec complications"], rate: [60, 100], description: "Pneumectomie compliquée de pyothorax chronique, fistule broncho-pleurale persistante, insuffisance respiratoire sévère nécessitant une oxygénothérapie, insuffisance cardiaque droite (cœur pulmonaire chronique), thoracoplastie mutilante. Handicap majeur avec dépendance fonctionnelle.", rateCriteria: { low: "Complications contrôlées, dyspnée invalidante mais autonomie partielle.", high: "Complications sévères multiples, dépendance totale, insuffisance cardio-respiratoire terminale." } },
        ]
      },
      {
        name: "Appareil Circulatoire",
        injuries: [
          { name: "Troubles cardiaques fonctionnels et subjectifs (sans asystolie, palpitations, tachycardie sans lésion)", searchTerms: ["troubles cardiaques fonctionnels subjectifs", "palpitations tachycardie sans lésion", "troubles fonctionnels cardiaques subjectifs", "troubles cardiaques fonctionnels"], rate: [0, 20], description: "Troubles cardiaques fonctionnels et subjectifs (palpitations, tachycardie, dyspnée d'effort) sans lésion organique objectivée. Examen par spécialiste cardiologue recommandé. Barème officiel : examen confié à un spécialiste.", rateCriteria: { low: "Troubles fonctionnels mineurs, occasionnels, sans limitation d'activité.", medium: "Troubles fonctionnels modérés avec limitation des efforts soutenus.", high: "Troubles fonctionnels importants avec anxiété cardiaque, limitation des activités quotidiennes." } },
          { name: "Adhérences péricardiques ou lésions valvulaires ou myocardites - Bien compensées", searchTerms: ["adhérences péricardiques lésions valvulaires myocardites bien compensées", "péricardite adhérences valvulopathie bien compensée", "myocardite bien compensée", "lésions cardiaques compensées"], rate: [5, 20], description: "Adhérences péricardiques, lésions valvulaires ou myocardites post-traumatiques bien compensées cliniquement. Pas de signes d'insuffisance cardiaque au repos. Barème officiel : 5-20%.", rateCriteria: { low: "Lésion minime objectivée par échographie, asymptomatique, vie normale.", medium: "Lésion modérée avec limitation des efforts intenses, sous surveillance cardiologique.", high: "Lésion importante mais compensée par traitement, vie active limitée aux efforts modérés." } },
          { name: "Adhérences péricardiques ou lésions valvulaires ou myocardites - Avec troubles fonctionnels caractérisés", searchTerms: ["adhérences péricardiques lésions valvulaires myocardites troubles fonctionnels caractérisés", "péricardite valvulopathie troubles fonctionnels", "myocardite troubles fonctionnels", "insuffisance cardiaque modérée"], rate: [20, 80], description: "Adhérences péricardiques, lésions valvulaires ou myocardites avec troubles fonctionnels caractérisés (dyspnée d'effort, œdèmes, tachycardie). Stade NYHA II-III. Barème officiel : 20-80%.", rateCriteria: { low: "Dyspnée d'effort modéré (stade NYHA II), vie active limitée.", medium: "Dyspnée aux efforts légers (stade NYHA III), traitement diurétique nécessaire, activités quotidiennes limitées.", high: "Insuffisance cardiaque sévère, dyspnée au moindre effort, limitation importante des activités." } },
          { name: "Adhérences péricardiques ou lésions valvulaires ou myocardites - Avec asystolie confirmée", searchTerms: ["adhérences péricardiques lésions valvulaires myocardites asystolie confirmée", "asystolie cardiaque confirmée", "insuffisance cardiaque terminale asystolie", "décompensation cardiaque sévère"], rate: [80, 100], description: "Adhérences péricardiques, lésions valvulaires ou myocardites avec asystolie confirmée (décompensation cardiaque majeure). Stade NYHA IV. Insuffisance cardiaque terminale. Barème officiel : 80-100%.", rateCriteria: { low: "Asystolie contrôlée par traitement intensif, dyspnée de repos, autonomie très limitée.", high: "Asystolie réfractaire, dyspnée permanente au repos, alitement fréquent, indication de transplantation cardiaque." } },
          { name: "Troubles cardiaques fonctionnels - Bien compensés", searchTerms: ["troubles cardiaques fonctionnels bien compensés", "compensés bien fonctionnels cardiaques troubles", "troubles cardiaques", "cardiaques fonctionnels", "fonctionnels bien"], rate: [5, 20] },
          { name: "Troubles cardiaques fonctionnels - Avec troubles fonctionnels caractérisés", searchTerms: ["troubles cardiaques fonctionnels avec troubles fonctionnels caractérisés", "caractérisés fonctionnels troubles avec fonctionnels cardiaques troubles", "troubles cardiaques fonctionnels troubles fonctionnels caractérisés", "troubles cardiaques", "cardiaques fonctionnels"], rate: [20, 80] },
          { name: "Troubles cardiaques fonctionnels - Avec asystolie confirmée", searchTerms: ["troubles cardiaques fonctionnels avec asystolie confirmée", "confirmée asystolie avec fonctionnels cardiaques troubles", "troubles cardiaques fonctionnels asystolie confirmée", "troubles cardiaques", "cardiaques fonctionnels"], rate: [80, 100] },
          { name: "Séquelles de contusion myocardique (troubles du rythme, insuffisance cardiaque)", searchTerms: ["séquelles contusion myocardique troubles rythme, insuffisance cardiaque", "cardiaque insuffisance rythme, troubles myocardique contusion séquelles", "séquelles contusion", "contusion myocardique", "myocardique troubles"], rate: [15, 50], rateCriteria: { low: "Anomalies ECG isolées, sans retentissement sur la fraction d'éjection.", high: "Insuffisance cardiaque ou troubles du rythme sévères nécessitant un traitement à vie." } },
          { name: "Troubles du rythme cardiaque post-traumatiques documentés (non appareillés)", searchTerms: ["troubles rythme cardiaque post traumatiques documentés non appareillés", "appareillés non documentés traumatiques post cardiaque rythme troubles", "troubles rythme", "rythme cardiaque", "cardiaque post"], rate: [5, 20], description: "Apparition de troubles du rythme (extrasystoles, tachycardie, fibrillation auriculaire) après une contusion myocardique ou un traumatisme thoracique, confirmés par Holter-ECG.", rateCriteria: { low: "Troubles du rythme peu fréquents, asymptomatiques ou paucisymptomatiques.", high: "Troubles du rythme fréquents, symptomatiques (palpitations, malaises) nécessitant un traitement anti-arythmique au long cours." } },
          { name: "Ruptures traumatiques de valvules", searchTerms: ["ruptures traumatiques valvules", "valvules traumatiques ruptures", "rupture traumatique valve cardiaque"], rate: [50, 100], description: "Rupture d'une valve cardiaque (mitrale, aortique, tricuspide) suite à un traumatisme thoracique fermé. Lésion gravissime. Barème officiel : 50-100%.", rateCriteria: { low: "Insuffisance valvulaire modérée, bien tolérée, sans insuffisance cardiaque.", high: "Insuffisance valvulaire sévère avec défaillance cardiaque, nécessitant un remplacement valvulaire." } },
          { name: "Affections cardio-rénales consécutives à une maladie infectieuse ou intoxication", searchTerms: ["affections cardio rénales consécutives maladie infectieuse intoxication", "cardiomyopathie infectieuse", "atteinte cardiaque rénale infection"], rate: [30, 90], description: "Atteinte combinée cardiaque et rénale après infection ou intoxication professionnelle. Barème officiel : 30-90%.", rateCriteria: { low: "Atteinte modérée d'un seul organe, compensation thérapeutique.", medium: "Atteinte des deux organes avec retentissement fonctionnel moyen.", high: "Défaillance cardiaque et/ou rénale sévère, dialyse ou transplantation." } },
          { name: "Artério-sclérose", searchTerms: ["artério sclérose", "athérosclérose", "sclérose artérielle"], rate: 0, description: "L'artério-sclérose ne donne pas lieu à estimation d'invalidité permanente selon le barème officiel (sauf complications : voir AVC, infarctus, artériopathie, etc.). Barème officiel : 0%." },
          { name: "Affections cardiovasculaires consécutives à une maladie infectieuse", searchTerms: ["affections cardiovasculaires consécutives une maladie infectieuse", "infectieuse maladie une consécutives cardiovasculaires affections", "affections cardiovasculaires", "cardiovasculaires consécutives", "consécutives une"], rate: [30, 90] },
          { name: "Anévrisme de l'aorte (traumatique ou infectieux hors syphilis)", searchTerms: ["anévrisme aorte traumatique infectieux hors syphilis", "anévrisme aortique post traumatique", "anévrisme aorte infectieux", "dilatation aortique anévrismale"], rate: [40, 80], description: "Anévrisme de l'aorte (thoracique ou abdominale) d'origine traumatique ou infectieuse (hors syphilis). Barème officiel : 40-80%.", rateCriteria: { low: "Anévrisme de petite taille (<5cm), asymptomatique, sous surveillance échographique régulière.", medium: "Anévrisme de taille moyenne (5-6cm), avec symptômes intermittents (douleurs thoraciques/abdominales), nécessitant un traitement médical et surveillance rapprochée.", high: "Anévrisme de grande taille (>6cm) ou symptomatique majeur (douleurs permanentes, risque de rupture), indication chirurgicale ou endoprothèse, complications (dissection, compression organes adjacents)." } },
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
            
            // Art. 25 - OBLITÉRATIONS VASCULAIRES
            {
              name: "Oblitération artérielle - Sans invalidité apparente",
              searchTerms: ["oblitération artérielle sans invalidité", "occlusion artère sans séquelle", "thrombose artérielle asymptomatique"],
              rate: 0,
              description: "Oblitération artérielle post-traumatique sans retentissement fonctionnel (circulation collatérale efficace). Barème officiel Art. 25A : 0%.",
            },
            {
              name: "Oblitération artérielle - Avec atrophie du membre",
              searchTerms: ["oblitération artérielle avec atrophie membre", "occlusion artère atrophie musculaire", "ischémie chronique atrophie"],
              rate: [10, 40],
              description: "Oblitération artérielle avec atrophie du membre accompagnée de raideurs articulaires (voir aussi séquelles articulaires correspondantes). Barème officiel Art. 25A : 10-40%.",
              rateCriteria: {
                low: "Atrophie modérée, raideurs minimes, compensation circulatoire partielle, marche autonome.",
                medium: "Atrophie importante, raideurs multiples, claudication intermittente <500m, douleurs fréquentes.",
                high: "Atrophie sévère, raideurs majeures, claudication <200m, douleurs de repos, ischémie chronique."
              }
            },
            {
              name: "Oblitération artérielle - Avec lésions nerveuses",
              searchTerms: ["oblitération artérielle avec lésions nerveuses", "ischémie avec atteinte neurologique", "oblitération artère séquelles nerveuses"],
              rate: 0,
              description: "Oblitération artérielle accompagnée de lésions nerveuses (se reporter au chapitre Nerfs pour l'évaluation). Barème officiel Art. 25A : Voir Nerfs.",
            },
            {
              name: "Oblitération artérielle - Avec sphacèle (voir amputation)",
              searchTerms: ["oblitération artérielle avec sphacèle", "gangrène ischémique", "nécrose artérielle membre"],
              rate: 0,
              description: "Oblitération artérielle ayant entraîné sphacèle (gangrène) et amputation (se reporter au chapitre Amputations pour l'évaluation). Barème officiel Art. 25A : Voir Amputations.",
            },
            {
              name: "Oblitération veineuse - Œdème chronique vérifié",
              searchTerms: ["oblitération veineuse œdème chronique", "thrombose veineuse œdème", "phlébite séquelles œdème"],
              rate: [10, 30],
              description: "Oblitération veineuse post-thrombotique avec œdème chronique vérifié d'un membre. Barème officiel Art. 25B : 10-30%.",
              rateCriteria: {
                low: "Œdème vespéral modéré, réductible au repos, contention efficace, pas de troubles trophiques.",
                medium: "Œdème permanent modéré, pigmentation cutanée (dermite ocre), varices secondaires, nécessité contention permanente.",
                high: "Œdème permanent important, troubles trophiques (dermite ocre étendue, lipodermatosclérose), douleurs, limitation marche."
              }
            },
            {
              name: "Oblitération veineuse bilatérale membres inférieurs - Gênant marche et station debout",
              searchTerms: ["oblitération veineuse bilatérale membres inférieurs", "thrombose veineuse bilatérale", "phlébite bilatérale séquelles"],
              rate: [20, 50],
              description: "Oblitération veineuse bilatérale des membres inférieurs gênant la marche et la station debout. Barème officiel Art. 25B : 20-50%.",
              rateCriteria: {
                low: "Œdèmes bilatéraux modérés, marche possible >500m avec contention, station debout limitée.",
                medium: "Œdèmes bilatéraux importants, marche limitée <500m, station debout difficile, troubles trophiques bilatéraux.",
                high: "Œdèmes bilatéraux majeurs, marche très limitée <200m, station debout quasi-impossible, ulcères veineux bilatéraux ou récidivants, dépendance pour activités quotidiennes."
              }
            },
            
            // Art. 26 - VARICES
            {
              name: "Varices - Pas d'évaluation (sauf complications)",
              searchTerms: ["varices sans complication", "varices simples", "insuffisance veineuse simple"],
              rate: 0,
              description: "Varices post-traumatiques : par elles-mêmes ne donnent pas lieu à évaluation. Seules les complications sont évaluées. Barème officiel Art. 26 : 0%.",
            },
            {
              name: "Varices - Ulcère variqueux récidivant peu étendu",
              searchTerms: ["varices ulcère variqueux récidivant peu étendu", "ulcère veineux petit", "plaie variqueuse récidivante"],
              rate: [5, 15],
              description: "Complication variqueuse : ulcère variqueux récidivant peu étendu. Barème officiel Art. 26 : 5-15%.",
              rateCriteria: {
                low: "Ulcère unique petit (<3cm), récidives rares (1/an), cicatrisation sous traitement, activités peu limitées.",
                medium: "Ulcère récidivant (2-3/an), taille moyenne, cicatrisation lente, nécessité soins réguliers, limitation activités.",
                high: "Ulcère récidivant fréquent (>3/an) ou chronique, cicatrisation difficile, douleurs, limitation marche/station debout."
              }
            },
            {
              name: "Varices - Ulcère variqueux récidivant étendu",
              searchTerms: ["varices ulcère variqueux récidivant étendu", "ulcère veineux large", "plaie variqueuse étendue"],
              rate: [15, 30],
              description: "Complication variqueuse : ulcère variqueux récidivant étendu. Barème officiel Art. 26 : 15-30%.",
              rateCriteria: {
                low: "Ulcère étendu (>5cm) récidivant, cicatrisation possible sous traitement intensif, limitation activités nette.",
                medium: "Ulcère étendu chronique ou récidivant fréquent, cicatrisation très lente/incomplète, douleurs importantes, marche limitée.",
                high: "Ulcère variqueux étendu permanent ou récidivant immédiatement, impossibilité cicatrisation complète, douleurs permanentes, marche très limitée, invalidité majeure."
              }
            },
            {
              name: "Varices - Brides circonférentielles ou phlébite chronique",
              searchTerms: ["varices brides circonférentielles", "phlébite chronique séquelles", "sclérose veineuse post-phlébitique"],
              rate: 0,
              description: "Complications variqueuses : brides circonférentielles ou phlébite chronique à évaluer selon le cas. Barème officiel Art. 26 : Évaluation selon le cas.",
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
          { name: "Insuffisance musculo-aponévrotique au niveau cicatrice (sans orifice d'éventration)", searchTerms: ["insuffisance musculo aponévrotique niveau cicatrice sans orifice d'éventration", "d'éventration orifice sans cicatrice niveau aponévrotique musculo insuffisance", "insuffisance musculo aponévrotique niveau cicatrice orifice d'éventration", "insuffisance musculo", "musculo aponévrotique"], rate: 7, description: "Affaiblissement pariétal sans orifice d'éventration nettement constitué, simple faiblesse de la paroi à la palpation." },
          { name: "Éventration peu prononcée", searchTerms: ["éventration peu prononcée", "prononcée peu éventration", "éventration peu", "peu prononcée"], rate: 15, description: "Petite éventration, bien réductible, peu symptomatique." },
          { name: "Éventration importante", searchTerms: ["éventration importante"], rate: 20, description: "Éventration de taille moyenne, partiellement réductible, gêne à l'effort." },
          { name: "Éventration médiane de référence (10-15 cm, saillie fusiforme 6-8 cm)", searchTerms: ["éventration médiane référence cm, saillie fusiforme", "fusiforme saillie cm, référence médiane éventration", "éventration médiane", "médiane référence", "référence cm,"], rate: 25, description: "Éventration post-opératoire de laparotomie médiane de 10 à 15 cm de longueur, laissant une saillie fusiforme entre les muscles droits de 6 à 8 cm de large dans sa zone maximale. Taux de référence à moduler selon taille." },
          { name: "Grande éventration", searchTerms: ["grande éventration"], rate: 40, description: "Éventration volumineuse, irréductible, invalidante, nécessitant un appareillage permanent." },
          { name: "Insuffisance musculo-aponévrotique sans cicatrice (contusion grave, déchirure, hématome)", searchTerms: ["insuffisance musculo aponévrotique sans cicatrice contusion grave, déchirure, hématome", "hématome déchirure, grave, contusion cicatrice sans aponévrotique musculo insuffisance", "insuffisance musculo aponévrotique cicatrice contusion grave, déchirure, hématome", "insuffisance musculo", "musculo aponévrotique"], rate: 35, description: "Insuffisance pariétale post-traumatique sans cicatrice opératoire, par contusion grave, déchirure musculaire ou hématome organisé. Taux moyen pouvant être majoré selon métier (coefficient professionnel 1/4 à 1/2 pour métiers pénibles)." },
          { name: "Névralgie pariétale post-traumatique ou post-chirurgicale (nerf ilio-inguinal, ilio-hypogastrique)", searchTerms: ["névralgie pariétale post traumatique post chirurgicale nerf ilio inguinal, ilio hypogastrique", "hypogastrique ilio inguinal, ilio nerf chirurgicale post traumatique post pariétale névralgie", "névralgie pariétale", "pariétale post", "post traumatique"], rate: [5, 15], description: "Douleurs chroniques dans la région inguinale ou abdominale basse dues à l'atteinte d'un nerf dans une cicatrice.", rateCriteria: { low: "Douleurs à type de brûlure intermittentes, déclenchées par l'effort ou certains mouvements.", high: "Douleurs neuropathiques chroniques et invalidantes, avec hyperesthésie cutanée, rebelles au traitement médical." } },
          { name: "Hernie inguinale opérée (en relation avec accident)", searchTerms: ["hernie inguinale opérée relation avec accident", "accident avec relation opérée inguinale hernie", "hernie inguinale opérée relation accident", "hernie inguinale", "inguinale opérée"], rate: 0 },
          { name: "Hernie inguinale réductible bien maintenue", searchTerms: ["hernie inguinale réductible bien maintenue", "maintenue bien réductible inguinale hernie", "hernie inguinale", "inguinale réductible", "réductible bien"], rate: [5, 8] },
          { name: "Hernies bilatérales", searchTerms: ["hernies bilatérales"], rate: [5, 12] },
          { name: "Hernie inguinale irréductible", searchTerms: ["hernie inguinale irréductible", "irréductible inguinale hernie", "hernie inguinale", "inguinale irréductible"], rate: [15, 25] },
          { name: "Hernie crurale, ombilicale, ligne blanche épigastrique", searchTerms: ["hernie crurale, ombilicale, ligne blanche épigastrique", "épigastrique blanche ligne ombilicale, crurale, hernie", "hernie crurale,", "crurale, ombilicale,", "ombilicale, ligne"], rate: [5, 12] },
          { name: "Hernie diaphragmatique non opérée", searchTerms: ["hernie diaphragmatique non opérée", "opérée non diaphragmatique hernie", "hernie diaphragmatique", "diaphragmatique non", "non opérée"], rate: 40, description: "Hernie diaphragmatique post-traumatique non opérée. Note: la hernie hiatale n'est généralement pas traumatique (imputabilité exceptionnelle, seulement si rapport chronologique très précis entre traumatisme et premiers symptômes)." },
          { name: "Hernie diaphragmatique opérée", searchTerms: ["hernie diaphragmatique opérée", "opérée diaphragmatique hernie", "hernie diaphragmatique", "diaphragmatique opérée"], rate: [10, 25], description: "Séquelles après cure chirurgicale d'une hernie diaphragmatique: cicatrice opératoire, modifications du jeu de la coupole diaphragmatique, symphyse pleurale éventuelle, modifications de la ventilation pulmonaire.", rateCriteria: { low: "Cicatrice simple, fonction respiratoire normale, pas de gêne.", high: "Cicatrice douloureuse, restriction ventilatoire, symphyse pleurale, dyspnée d'effort." } },
        ]
      },
      {
        name: "Abdomen - Tube Digestif et Organes",
        injuries: [
          { name: "Ulcère chronique - Séquelles cicatrisées simples", searchTerms: ["ulcère chronique séquelles cicatrisées simples", "simples cicatrisées séquelles chronique ulcère", "ulcère chronique", "chronique séquelles", "séquelles cicatrisées"], rate: [10, 40], description: "Ulcère gastrique ou duodénal cicatrisé après traitement, avec séquelles digestives modérées (dyspepsie, intolérance alimentaire)." },
          { name: "Ulcère chronique - Rétrécissement pylore, dilatation estomac, amaigrissement", searchTerms: ["ulcère chronique rétrécissement pylore, dilatation estomac, amaigrissement", "amaigrissement estomac, dilatation pylore, rétrécissement chronique ulcère", "ulcère chronique", "chronique rétrécissement", "rétrécissement pylore,"], rate: [50, 80], description: "Sténose pylorique post-ulcéreuse entraînant une dilatation gastrique, des vomissements, un amaigrissement important." },
          { name: "Ulcère chronique - Adhérences douloureuses périgastriques", searchTerms: ["ulcère chronique adhérences douloureuses périgastriques", "périgastriques douloureuses adhérences chronique ulcère", "ulcère chronique", "chronique adhérences", "adhérences douloureuses"], rate: [10, 40], description: "Adhérences post-ulcéreuses ou post-chirurgicales entraînant des douleurs chroniques et une gêne digestive." },
          { name: "Fistule stomacale post-ulcéreuse ou post-traumatique", searchTerms: ["fistule stomacale post ulcéreuse post traumatique", "traumatique post ulcéreuse post stomacale fistule", "fistule stomacale", "stomacale post", "post ulcéreuse"], rate: [30, 90], description: "Fistule gastrique persistante. Taux selon état de dénutrition rapide, nécessité de soins constants, douleurs, complications.", rateCriteria: { low: "Fistule de faible débit, état nutritionnel préservé.", high: "Fistule à haut débit, dénutrition sévère, complications infectieuses." } },
          { name: "Ulcère aggravé par traumatisme (simple poussée évolutive)", searchTerms: ["ulcère aggravé par traumatisme simple poussée évolutive", "évolutive poussée simple traumatisme par aggravé ulcère", "ulcère aggravé", "aggravé par", "par traumatisme"], rate: 20, description: "Dans la plupart des cas d'ulcère préexistant, l'accident ne fait qu'entraîner une poussée évolutive (IT seulement, généralement pas d'IPP). Seulement si réactions douloureuses périgastriques ou adhérences démontrées. Taux moyen 20%." },
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
          { 
            name: "Splénectomie (selon examen du sang)", 
            searchTerms: ["splénectomie selon examen sang", "rate selon examen sang", "ablation rate traumatique", "splénectomie totale", "splénectomie post traumatique"], 
            rate: [15, 30], 
            description: "Ablation de la rate post-traumatique. Barème officiel Art. 56: 15-30%. Taux selon complications et formule sanguine. Note: la splénectomie n'entraîne pas de diminution de la longévité.",
            rateCriteria: {
              low: "Splénectomie avec bonne cicatrice, pas de modification de la formule sanguine, pas de complications. Pas de thrombocytose ni leucocytose significative.",
              medium: "Splénectomie avec modifications modérées de la formule sanguine (thrombocytose modérée, leucocytose), ou cicatrice adhérente avec gêne.",
              high: "Splénectomie avec complications: cicatrice de mauvaise qualité avec éventration, modifications importantes de la formule sanguine (thrombocytose majeure >600 000/mm³, leucocytose marquée), ou complications infectieuses à répétition (sepsis post-splénectomie)."
            }
          },
          { name: "Splénose péritonéale (après rupture de la rate)", searchTerms: ["splénose péritonéale après rupture rate", "rate rupture après péritonéale splénose", "splénose péritonéale", "péritonéale après", "après rupture"], rate: [0, 10], description: "Généralement asymptomatique. Le taux indemnise le risque potentiel de complication (douleurs, occlusion) ou la gêne si les nodules sont volumineux.", rateCriteria: { low: "Découverte fortuite, asymptomatique.", high: "Nodules symptomatiques (douleurs abdominales chroniques) confirmés par imagerie." } },
          { name: "Adhérences abdominales post-traumatiques/post-opératoires avec troubles du transit", searchTerms: ["adhérences abdominales post traumatiques/post opératoires avec troubles transit", "transit troubles avec opératoires traumatiques/post post abdominales adhérences", "adhérences abdominales post traumatiques/post opératoires troubles transit", "adhérences abdominales", "abdominales post"], rate: [10, 40], rateCriteria: { low: "Douleurs abdominales chroniques intermittentes, sans épisodes subocclusifs documentés.", high: "Syndrome occlusif ou subocclusif à répétition ayant nécessité une ou plusieurs hospitalisations/interventions." } },
          { name: "Séquelles de pancréatite aiguë post-traumatique", searchTerms: ["séquelles pancréatite aiguë post traumatique", "traumatique post aiguë pancréatite séquelles", "séquelles pancréatite", "pancréatite aiguë", "aiguë post"], rate: [15, 60], rateCriteria: { low: "Pancréatite chronique modérée avec douleurs récurrentes contrôlées par le traitement.", medium: "Insuffisance pancréatique exocrine (stéatorrhée) nécessitant un traitement substitutif enzymatique.", high: "Diabète secondaire (insuffisance endocrine) nécessitant un traitement par insuline." } },
          { name: "Séquelles de colectomie partielle post-traumatique (hors stomie)", searchTerms: ["séquelles colectomie partielle post traumatique hors stomie", "séquelles côlon partielle post traumatique hors stomie", "stomie hors traumatique post partielle colectomie séquelles", "séquelles colectomie", "colectomie partielle"], rate: [15, 30], description: "Troubles du transit (diarrhée, constipation) et douleurs abdominales après résection d'une partie du côlon.", rateCriteria: { low: "Troubles du transit modérés et bien contrôlés par le régime.", high: "Diarrhée motrice invalidante ou syndrome occlusif récidivant." } },
          { name: "Colectomie partielle", searchTerms: ["colectomie partielle", "côlon partielle"], rate: [15, 30], rateCriteria: { low: "Colectomie segmentaire avec bon résultat fonctionnel.", high: "Colectomie étendue avec troubles du transit persistants." }, description: "Ablation partielle du côlon." },
          { name: "Éventration abdominale", searchTerms: ["éventration abdominale"], rate: [10, 30], rateCriteria: { low: "Éventration de petite taille, réductible.", high: "Éventration volumineuse, irréductible, avec troubles digestifs." }, description: "Hernie post-opératoire ou post-traumatique de la paroi abdominale." },
          { name: "Séquelles d'hépatectomie partielle post-traumatique", searchTerms: ["séquelles d'hépatectomie partielle post traumatique", "traumatique post partielle d'hépatectomie séquelles", "séquelles d'hépatectomie", "d'hépatectomie partielle", "partielle post"], rate: [10, 40], description: "Séquelles après résection d'une partie du foie.", rateCriteria: { low: "Hépatectomie mineure, sans insuffisance hépatique, simple fatigue.", high: "Hépatectomie majeure avec signes d'insuffisance hépato-cellulaire et/ou hypertension portale." } },
          { name: "Hépatectomie partielle", searchTerms: ["hépatectomie partielle"], rate: [10, 40], rateCriteria: { low: "Hépatectomie limitée avec bonne récupération fonctionnelle.", high: "Hépatectomie majeure avec insuffisance hépatique résiduelle." }, description: "Résection partielle du foie." },
          { name: "Colostomie définitive (anus artificiel colique)", searchTerms: ["colostomie définitive anus artificiel colique", "colique artificiel anus définitive colostomie", "colostomie définitive", "définitive anus", "anus artificiel"], rate: [80, 90], description: "Dérivation définitive du côlon vers la peau (abdomen), avec suppression de la défécation naturelle. Nécessite un appareillage permanent (poche de stomie), retentissement psycho-social majeur, contraintes d'hygiène quotidienne, limitation des activités physiques et sociales.", rateCriteria: { low: "Colostomie bien tolérée, continente, sans prolapsus ni dermatose péristomiale majeure, bonne adaptation psychologique.", high: "Colostomie avec complications chroniques (prolapsus, sténose, dermatose sévère, fuites fréquentes), retentissement psychologique majeur, isolement social." } },
          { name: "Iléostomie définitive (anus artificiel iléal)", searchTerms: ["iléostomie définitive anus artificiel iléal", "iléal artificiel anus définitive iléostomie", "iléostomie définitive", "définitive anus", "anus artificiel"], rate: [80, 90], description: "Dérivation définitive de l'intestin grêle vers la peau. Écoulement liquidien permanent nécessitant un appareillage spécifique, risque de déséquilibre hydro-électrolytique, dermatoses péristomiales fréquentes, contraintes majeures.", rateCriteria: { low: "Iléostomie bien fonction nelle, débit modéré, peau péristomiale saine, adaptation correcte.", high: "Iléostomie à haut débit, déséquilibres hydro-électrolytiques répétés, dermatose sévère, retrait social majeur." } },
          { name: "Colostomie temporaire (fermée secondairement)", searchTerms: ["colostomie temporaire fermée secondairement", "secondairement fermée temporaire colostomie", "colostomie temporaire", "temporaire fermée", "fermée secondairement"], rate: [10, 30], description: "Séquelles après fermeture d'une colostomie temporaire réalisée pour protection d'une anastomose ou traitement d'une péritonite. Peut laisser des séquelles (cicatrice, hernie parastomiale, troubles du transit).", rateCriteria: { low: "Cicatrice simple, transit normal, pas de hernie.", high: "Hernie parastomiale volumineuse, troubles du transit persistants, douleurs abdominales chroniques." } },
          { name: "Iléostomie temporaire (fermée secondairement)", searchTerms: ["iléostomie temporaire fermée secondairement", "secondairement fermée temporaire iléostomie", "iléostomie temporaire", "temporaire fermée", "fermée secondairement"], rate: [10, 25], description: "Séquelles après fermeture d'une iléostomie de protection. Similaire à la colostomie temporaire mais avec risque plus élevé de troubles du transit (diarrhée) persistants.", rateCriteria: { low: "Transit rétabli sans séquelle majeure.", high: "Diarrhée chronique invalidante, dénutrition, hernie parastomiale." } },
          { name: "Anus artificiel définitif", searchTerms: ["anus artificiel définitif", "définitif artificiel anus", "anus artificiel", "artificiel définitif"], rate: [80, 90], description: "Colostomie ou iléostomie définitive." },
          { name: "Fistule digestive chronique", searchTerms: ["fistule digestive chronique", "chronique digestive fistule", "fistule digestive", "digestive chronique"], rate: [20, 50], rateCriteria: { low: "Fistule de faible débit, bien contrôlée.", high: "Fistule à haut débit avec troubles nutritionnels majeurs." }, description: "Communication anormale persistante du tube digestif." },
        ]
      },
      {
        name: "Appareil Génito-Urinaire",
        injuries: [
          { name: "Néphrectomie (ablation d'un rein), avec rein restant sain", searchTerms: ["néphrectomie ablation d'un rein avec rein restant sain", "rein amputation d'un rein avec rein restant sain", "sain restant rein avec rein d'un ablation néphrectomie", "néphrectomie ablation d'un rein rein restant sain", "néphrectomie ablation"], rate: 30 },
          { name: "Néphrectomie unilatérale (rein unique restant normal)", searchTerms: ["néphrectomie unilatérale rein unique restant normal", "rein unilatérale rein unique restant normal", "normal restant unique rein unilatérale néphrectomie", "néphrectomie unilatérale", "unilatérale rein"], rate: 30, description: "Ablation d'un rein avec fonction rénale normale du rein restant." },
          { name: "Néphrectomie avec azotémie irréductible de 0,60 à 1 gramme", searchTerms: ["néphrectomie avec azotémie irréductible 0,60 gramme", "rein avec azotémie irréductible 0,60 gramme", "gramme 0,60 irréductible azotémie avec néphrectomie", "néphrectomie azotémie irréductible 0,60 gramme", "néphrectomie avec"], rate: [30, 60] },
          { name: "Néphrectomie avec azotémie irréductible supérieure à 1 gramme", searchTerms: ["néphrectomie avec azotémie irréductible supérieure gramme", "rein avec azotémie irréductible supérieure gramme", "gramme supérieure irréductible azotémie avec néphrectomie", "néphrectomie azotémie irréductible supérieure gramme", "néphrectomie avec"], rate: [60, 100] },
          { 
            name: "Néphrectomie avec modifications rénales (complications cicatricielles, éventration)",
            searchTerms: ["néphrectomie avec modifications rénales complications cicatricielles éventration", "néphrectomie modification rénale complication cicatricielle", "néphrectomie complications cicatricielles", "néphrectomie éventration"],
            rate: [50, 70],
            description: "Néphrectomie compliquée de modifications rénales, complications cicatricielles importantes ou éventration. Barème officiel Art. 57: 50-70%. Ce taux évalue l'ensemble des complications post-néphrectomie.",
            rateCriteria: {
              low: "Complications cicatricielles modérées sans retentissement majeur sur la fonction rénale controlatérale, petite éventration réductible.",
              medium: "Complications cicatricielles importantes avec douleurs chroniques, éventration moyenne nécessitant une contention, léger retentissement sur rein controlatéral.",
              high: "Complications sévères multiples: éventration volumineuse irréductible, adhérences majeures, altération fonction rein controlatéral, douleurs chroniques invalidantes, nécessité de réinterventions."
            }
          },
          { name: "Néphrectomie partielle", searchTerms: ["néphrectomie partielle", "rein partielle"], rate: [10, 30], description: "Résection partielle du rein (pôle supérieur ou inférieur) avec conservation d'une partie fonctionnelle. Taux selon fonction résiduelle du rein opéré et qualité cicatrice.", rateCriteria: { low: "Néphrectomie polaire, fonction rénale totale normale.", high: "Néphrectomie étendue, altération fonction, cicatrice compliquée." } },
          { name: "Éventration lombo-abdominale après néphrectomie", searchTerms: ["éventration lombo abdominale après néphrectomie", "éventration lombo abdominale après rein", "néphrectomie après abdominale lombo éventration", "éventration lombo", "lombo abdominale"], rate: [10, 30] },
          { name: "Contusion rénale avec rein conservé - Fonction normale", searchTerms: ["contusion rénale avec rein conservé fonction normale", "normale fonction conservé rein avec rénale contusion", "contusion rénale rein conservé fonction normale", "contusion rénale", "rénale avec"], rate: [0, 10], description: "Rein contus conservé avec fonction rénale normale après consolidation (3-6 mois). Morphologie normale à l'UIV." },
          { name: "Contusion rénale avec rein conservé - Fonction diminuée", searchTerms: ["contusion rénale avec rein conservé fonction diminuée", "diminuée fonction conservé rein avec rénale contusion", "contusion rénale rein conservé fonction diminuée", "contusion rénale", "rénale avec"], rate: [10, 30], description: "Rein contus avec fonction rénale diminuée (scintigraphie, séparation d'urines), sans insuffisance rénale gênante.", rateCriteria: { low: "Diminution modérée de fonction, pas de retentissement clinique.", high: "Fonction nettement diminuée, rein atrophique, mais rein controlatéral normal." } },
          { name: "Contusion rénale avec rein conservé - Fonction nulle", searchTerms: ["contusion rénale avec rein conservé fonction nulle", "nulle fonction conservé rein avec rénale contusion", "contusion rénale rein conservé fonction nulle", "contusion rénale", "rénale avec"], rate: 30, description: "Rein contus non fonctionnel (équivalent néphrectomie médicale), mais conservé anatomiquement. Taux équivalent à néphrectomie." },
          { name: "Hypertension artérielle rénovasculaire post-traumatique", searchTerms: ["hypertension artérielle rénovasculaire post traumatique", "traumatique post rénovasculaire artérielle hypertension", "hypertension artérielle", "artérielle rénovasculaire", "rénovasculaire post"], rate: 30, description: "Hypertension artérielle (HTA) secondaire à une lésion rénale post-traumatique (contusion, rupture, sténose de l'artère rénale). Mécanisme: activation du système rénine-angiotensine par ischémie rénale. Nécessite un traitement antihypertenseur à vie. Peut justifier une néphrectomie du rein lésé si l'HTA est réfractaire (taux alors équivalent à néphrectomie = 30%). Rare mais grave, doit être documentée par échographie Doppler rénale, scintigraphie rénale au captopril, ou artillographie rénale." },
          { name: "Hydronéphrose traumatique", searchTerms: ["hydronéphrose traumatique"], rate: [30, 50] },
          { name: "Modification d'une hydronéphrose antérieure", searchTerms: ["modification d'une hydronéphrose antérieure", "antérieure hydronéphrose d'une modification", "modification d'une", "d'une hydronéphrose", "hydronéphrose antérieure"], rate: [15, 30] },
          { name: "Rupture d'uretère avec périnéphrose ou fistule", searchTerms: ["rupture d'uretère avec périnéphrose fistule", "fistule périnéphrose avec d'uretère rupture", "rupture d'uretère périnéphrose fistule", "rupture d'uretère", "d'uretère avec"], rate: [30, 50] },
          { name: "Sténose urétérale post-traumatique", searchTerms: ["sténose urétérale post traumatique", "traumatique post urétérale sténose", "sténose urétérale", "urétérale post", "post traumatique"], rate: [15, 40], description: "Rétrécissement de l'uretère, pouvant entraîner une dilatation du rein (hydronéphrose) et une altération de la fonction rénale.", rateCriteria: { low: "Sténose modérée sans retentissement sur la fonction rénale, nécessitant une surveillance ou une dilatation endoscopique ponctuelle.", high: "Sténose serrée avec hydronéphrose et altération de la fonction rénale, ayant nécessité une réimplantation urétérale ou une endoprothèse à demeure." } },
          { name: "Rein mobile toujours indépendant du traumatisme", searchTerms: ["rein mobile toujours indépendant traumatisme", "traumatisme indépendant toujours mobile rein", "rein mobile", "mobile toujours", "toujours indépendant"], rate: 0 },
          { name: "Pyélonéphrite post-traumatique ascendante (unilatérale)", searchTerms: ["pyélonéphrite post traumatique ascendante unilatérale", "unilatérale ascendante traumatique post pyélonéphrite", "pyélonéphrite post", "post traumatique", "traumatique ascendante"], rate: [30, 50] },
          { name: "Pyélonéphrite post-traumatique ascendante (bilatérale)", searchTerms: ["pyélonéphrite post traumatique ascendante bilatérale", "bilatérale ascendante traumatique post pyélonéphrite", "pyélonéphrite post", "post traumatique", "traumatique ascendante"], rate: [60, 80] },
          { name: "Phlegmon périnéphrétique après traumatisme", searchTerms: ["phlegmon périnéphrétique après traumatisme", "traumatisme après périnéphrétique phlegmon", "phlegmon périnéphrétique", "périnéphrétique après", "après traumatisme"], rate: [10, 20] },
          { name: "Tuberculose rénale (modification par traumatisme)", searchTerms: ["tuberculose rénale modification par traumatisme", "traumatisme par modification rénale tuberculose", "tuberculose rénale", "rénale modification", "modification par"], rate: [15, 30] },
          { name: "Atrophie ou destruction d'un testicule - Avec troubles endocriniens", searchTerms: ["atrophie destruction d'un testicule avec troubles endocriniens", "endocriniens troubles avec testicule d'un destruction atrophie", "atrophie destruction d'un testicule troubles endocriniens", "atrophie destruction", "destruction d'un"], rate: 20, description: "Perte d'un testicule avec troubles neuro-endocriniens objectivés (baisse testostérone, symptômes cliniques)." },
          { name: "Atrophie ou destruction d'un testicule - État endocrinien normal", searchTerms: ["atrophie destruction d'un testicule état endocrinien normal", "normal endocrinien état testicule d'un destruction atrophie", "atrophie destruction d'un testicule endocrinien normal", "atrophie destruction", "destruction d'un"], rate: 5, description: "Perte d'un testicule sans retentissement endocrinien (testicule controlatéral compensant). Préjudice esthétique et psychologique." },
          { name: "Atrophie ou destruction d'un testicule - Après 60 ans", searchTerms: ["atrophie destruction d'un testicule après ans", "ans après testicule d'un destruction atrophie", "atrophie destruction", "destruction d'un", "d'un testicule"], rate: 0, description: "Perte d'un testicule après 60 ans, sans impact endocrinien ni fonctionnel significatif." },
          { name: "Atrophie ou destruction des deux testicules - Adolescent", searchTerms: ["atrophie destruction des deux testicules adolescent", "adolescent testicules deux des destruction atrophie", "atrophie destruction deux testicules adolescent", "atrophie destruction", "destruction des"], rate: 80, description: "Castration traumatique chez l'adolescent: retentissement majeur sur développement pubertaire, caractères sexuels secondaires, fertilité, psychisme." },
          { name: "Atrophie ou destruction des deux testicules - Adulte", searchTerms: ["atrophie destruction des deux testicules adulte", "adulte testicules deux des destruction atrophie", "atrophie destruction deux testicules adulte", "atrophie destruction", "destruction des"], rate: [30, 40], description: "Castration traumatique chez l'adulte: troubles endocriniens (baisse libido, troubles érection, asthénie), nécessité traitement substitutif, retentissement psychologique important." },
          { name: "Atrophie ou destruction des deux testicules - Vieillard (> 60 ans)", searchTerms: ["atrophie destruction des deux testicules vieillard ans", "ans vieillard testicules deux des destruction atrophie", "atrophie destruction deux testicules vieillard ans", "atrophie destruction", "destruction des"], rate: 10, description: "Castration traumatique après 60 ans, impact endocrinien et fonctionnel modéré." },
          { name: "Perte de la verge (sans atteinte testiculaire)", searchTerms: ["perte verge sans atteinte testiculaire", "amputation verge sans atteinte testiculaire", "testiculaire atteinte sans verge perte", "perte verge atteinte testiculaire", "perte verge"], rate: [30, 60], description: "Amputation ou destruction de la verge seule (testicules conservés): gêne à la miction, éventuelle sténose du néo-méat, troubles psychiques graves, impotence sexuelle.", rateCriteria: { low: "Amputation partielle, miction possible, reconstruction partielle.", high: "Perte totale, méat périnéal, troubles mictionnels majeurs, retentissement psychologique sévère." } },
          { name: "Emasculation totale (verge + urètre antérieur + scrotum + testicules)", searchTerms: ["emasculation totale verge urètre antérieur scrotum testicules", "testicules scrotum antérieur urètre verge totale emasculation", "emasculation totale verge urètre scrotum testicules", "emasculation totale", "totale verge"], rate: [80, 90], description: "Destruction complète des organes génitaux externes masculins avec miction par méat périnéal ou hypogastrique. Préjudice maximum: physique, fonctionnel, sexuel, endocrinien, psychologique." },
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
          { name: "Incontinence urinaire d'effort légère (post-traumatique)", searchTerms: ["incontinence urinaire d'effort légère post traumatique", "traumatique post légère d'effort urinaire incontinence", "incontinence urinaire", "urinaire d'effort", "d'effort légère"], rate: [5, 15], description: "Fuites urinaires lors d'efforts importants (toux, éternuement, port de charges lourdes), sans retentissement majeur sur la vie quotidienne. Contrôlée par kinésithérapie périnéale et/ou protection légère.", rateCriteria: { low: "Fuites occasionnelles, contrôlées par rééducation périnéale.", high: "Fuites quotidiennes nécessitant une protection, limitation des activités physiques." } },
          { name: "Incontinence urinaire d'effort moyenne (post-traumatique)", searchTerms: ["incontinence urinaire d'effort moyenne post traumatique", "traumatique post moyenne d'effort urinaire incontinence", "incontinence urinaire", "urinaire d'effort", "d'effort moyenne"], rate: [15, 30], description: "Fuites urinaires lors d'efforts modérés (marche rapide, montée d'escaliers), nécessitant une protection quotidienne permanente. Retentissement sur les activités sociales et professionnelles.", rateCriteria: { low: "Incontinence contrôlée par protection, vie sociale maintenue avec adaptations.", high: "Incontinence fréquente, retrait social partiel, activités limitées." } },
          { name: "Incontinence urinaire sévère ou totale (post-traumatique non neurologique)", searchTerms: ["incontinence urinaire sévère totale post traumatique non neurologique", "neurologique non traumatique post totale sévère urinaire incontinence", "incontinence urinaire", "urinaire sévère", "sévère totale"], rate: [30, 50], description: "Incontinence permanente ou lors d'efforts minimes (changement de position), nécessitant une protection maximale permanente (changes complets). Peut nécessiter une chirurgie (bandelette sous-urétrale, sphincter artificiel) ou une dérivation urinaire. Retentissement psycho-social majeur.", rateCriteria: { low: "Incontinence sévère améliorée par chirurgie, vie sociale limitée mais maintenue.", high: "Incontinence totale rebelle à tout traitement, isolement social complet, échec chirurgical répété." } },
          { name: "Rétrécissement de l'urètre postérieur infranchissable", searchTerms: ["rétrécissement l'urètre postérieur infranchissable", "infranchissable postérieur l'urètre rétrécissement", "rétrécissement l'urètre", "l'urètre postérieur", "postérieur infranchissable"], rate: [60, 80] },
          { name: "Rétrécissement de l'urètre postérieur difficilement franchissable", searchTerms: ["rétrécissement l'urètre postérieur difficilement franchissable", "franchissable difficilement postérieur l'urètre rétrécissement", "rétrécissement l'urètre", "l'urètre postérieur", "postérieur difficilement"], rate: [30, 50] },
          { name: "Rétrécissement de l'urètre postérieur facilement franchissable", searchTerms: ["rétrécissement l'urètre postérieur facilement franchissable", "franchissable facilement postérieur l'urètre rétrécissement", "rétrécissement l'urètre", "l'urètre postérieur", "postérieur facilement"], rate: [15, 30] },
          {
            name: "Rétrécissement de l'urètre postérieur avec destruction du sphincter anal",
            searchTerms: ["rétrécissement l'urètre postérieur avec destruction sphincter anal", "rétrécissement urètre postérieur destruction sphincter", "sténose urètre destruction sphincter anal", "rétrécissement urétral sphincter anal"],
            rate: [60, 90],
            description: "Rétrécissement de l'urètre postérieur associé à une destruction du sphincter anal. Barème officiel Art. 59: 60-90%. Double préjudice: troubles mictionnels majeurs et incontinence fécale.",
            rateCriteria: {
              low: "Rétrécissement modéré avec lésion sphincter partielle, incontinence fécale aux gaz et selles liquides, nécessitant des dilatations urétrales régulières et traitement médical (ralentisseurs transit).",
              medium: "Rétrécissement sévère avec destruction sphincter importante, incontinence fécale majeure aux selles solides, nécessitant urétrotomie répétée ou endoprothèse urétrale et port de protections permanentes.",
              high: "Sténose urétrale infranchissable avec destruction sphincter complète, incontinence fécale totale, nécessitant cystostomie sus-pubienne définitive et colostomie, retentissement psycho-social majeur, isolement complet."
            }
          },
          { name: "Rétrécissement de l'urètre antérieur facilement dilatable", searchTerms: ["rétrécissement l'urètre antérieur facilement dilatable", "dilatable facilement antérieur l'urètre rétrécissement", "rétrécissement l'urètre facilement dilatable", "rétrécissement l'urètre", "l'urètre antérieur"], rate: [15, 30] },
          { name: "Rétrécissement de l'urètre antérieur difficilement dilatable", searchTerms: ["rétrécissement l'urètre antérieur difficilement dilatable", "dilatable difficilement antérieur l'urètre rétrécissement", "rétrécissement l'urètre difficilement dilatable", "rétrécissement l'urètre", "l'urètre antérieur"], rate: [30, 50] },
          { name: "Autoplastie cutanée ou autre de l'urètre", searchTerms: ["autoplastie cutanée autre l'urètre", "l'urètre autre cutanée autoplastie", "autoplastie cutanée", "cutanée autre", "autre l'urètre"], rate: [20, 50] },
          { name: "Fistule urinaire persistante avec rétrécissement", searchTerms: ["fistule urinaire persistante avec rétrécissement", "rétrécissement avec persistante urinaire fistule", "fistule urinaire persistante rétrécissement", "fistule urinaire", "urinaire persistante"], rate: [30, 40] },
          { name: "Destruction totale urètre antérieur - Miction par méat périnéal", searchTerms: ["destruction totale urètre antérieur miction par méat périnéal", "périnéal méat par miction antérieur urètre totale destruction", "destruction totale urètre miction par méat périnéal", "destruction totale", "totale urètre"], rate: [50, 70], description: "Destruction totale de l'urètre pénien avec création d'un méat périnéal pour la miction. Impact: gêne mictionnelle (jet dirigé vers le bas), difficultés d'hygiène, impossibilité miction debout, retentissement psychologique et social." },
          { name: "Destruction totale urètre antérieur - Miction par méat hypogastrique", searchTerms: ["destruction totale urètre antérieur miction par méat hypogastrique", "hypogastrique méat par miction antérieur urètre totale destruction", "destruction totale urètre miction par méat hypogastrique", "destruction totale", "totale urètre"], rate: [80, 90], description: "Destruction urètre avec cystostomie définitive, miction par méat hypogastrique (abdomen). Nécessite appareillage permanent, complications fréquentes (infections, calculs), invalidité majeure. Taux représente l'invalidité globale." },
          { name: "Prolapsus utérin post-traumatique - Cas légers ou moyens", searchTerms: ["prolapsus utérin post traumatique cas légers moyens", "moyens légers cas traumatique post utérin prolapsus", "prolapsus utérin", "utérin post", "post traumatique"], rate: [0, 10], description: "Prolapsus génital post-traumatique de stade I ou II, avec gêne modérée, bien contrôlé par rééducation périnéale ou pessaire. Note: imputabilité du prolapsus extrêmement discutable (généralement constitutionnel)." },
          { name: "Prolapsus utérin post-traumatique - Cas graves", searchTerms: ["prolapsus utérin post traumatique cas graves", "graves cas traumatique post utérin prolapsus", "prolapsus utérin", "utérin post", "post traumatique"], rate: [20, 40], description: "Prolapsus génital sévère (stade III-IV) avec extériorisation, troubles mictionnels et défécatoires associés, nécessitant une chirurgie de reconstruction majeure.", rateCriteria: { low: "Prolapsus de stade III, chirurgie réussie, fonction correcte.", high: "Prolapsus récidivant, échec chirurgical, incontinence urinaire et/ou fécale associée." } },
          { name: "Fistule uro-vaginale ou vésico-vaginale post-traumatique (empalement, fracture bassin)", searchTerms: ["fistule uro vaginale vésico vaginale post traumatique empalement, fracture bassin", "bassin fracture empalement, traumatique post vaginale vésico vaginale uro fistule", "fistule uro", "uro vaginale", "vaginale vésico"], rate: [50, 70], description: "Communication anormale entre vessie et vagin (ou urètre et vagin) après traumatisme grave (empalement, fracture complexe du bassin). Incontinence urinaire totale par voie vaginale, retentissement majeur sur vie intime, sociale et psychologique. Nécessite chirurgie reconstructrice complexe souvent en plusieurs temps.", rateCriteria: { low: "Fistule de petite taille, réparée avec succès, continence restaurée.", high: "Fistule large, complexe, échec de multiples tentatives chirurgicales, incontinence permanente, retrait social complet." } },
          { name: "Perte des deux ovaires - Adolescente ou jeune femme (< 30 ans)", searchTerms: ["perte des deux ovaires adolescente jeune femme ans", "amputation des deux ovaires adolescente jeune femme ans", "ans femme jeune adolescente ovaires deux des perte", "perte deux ovaires adolescente jeune femme ans", "perte des"], rate: 80, description: "Castration chirurgicale ou radiologique chez adolescente ou jeune femme: impact majeur sur développement pubertaire ou fertilité, ménopause précoce, troubles endocriniens sévères, nécessité traitement hormonal substitutif à vie, retentissement psychologique majeur." },
          { name: "Perte des deux ovaires - Femme adulte (30-45 ans)", searchTerms: ["perte des deux ovaires femme adulte ans", "amputation des deux ovaires femme adulte ans", "ans adulte femme ovaires deux des perte", "perte deux ovaires femme adulte ans", "perte des"], rate: [30, 40], description: "Castration chez femme adulte en période d'activité génitale: ménopause précoce, troubles du climatère (bouffées de chaleur, troubles de l'humeur, ostéoporose), stérilité définitive, traitement hormonal substitutif.", rateCriteria: { low: "Femme de 40-45 ans, proche de la ménopause naturelle, THS bien toléré.", high: "Femme jeune (30-35 ans), désir de grossesse non satisfait, troubles climatériques sévères." } },
          { name: "Perte des deux ovaires - Femme ménopausée (> 50 ans)", searchTerms: ["perte des deux ovaires femme ménopausée ans", "amputation des deux ovaires femme ménopausée ans", "ans ménopausée femme ovaires deux des perte", "perte deux ovaires femme ménopausée ans", "perte des"], rate: 10, description: "Castration après la ménopause naturelle, impact fonctionnel et endocrinien minime." },
          { name: "Cicatrices vulvo-vaginales (séquelles d'empalement ou traumatisme périnéal grave)", searchTerms: ["cicatrices vulvo vaginales séquelles d'empalement traumatisme périnéal grave", "grave périnéal traumatisme d'empalement séquelles vaginales vulvo cicatrices", "cicatrices vulvo", "vulvo vaginales", "vaginales séquelles"], rate: [0, 40], description: "Cicatrices de la vulve et/ou du vagin après traumatisme périnéal grave, selon importance du trouble apporté à la perméabilité vaginale.", rateCriteria: { low: "Cicatrices sans sténose, rapports possibles, gêne esthétique mineure.", medium: "Sténose vaginale partielle, dyspareunie, nécessité de dilatations ou chirurgie.", high: "Sténose vaginale complète ou sub-complète, impossibilité de rapports, échec de reconstruction, retentissement psychologique majeur." } },
          { name: "Stérilité féminine post-traumatique (selon l'âge et le désir de maternité)", searchTerms: ["stérilité féminine post traumatique selon l'âge désir maternité", "maternité désir l'âge selon traumatique post féminine stérilité", "stérilité féminine", "féminine post", "post traumatique"], rate: [10, 50] },
          { name: "Troubles menstruels post-traumatiques graves et persistants", searchTerms: ["troubles menstruels post traumatiques graves persistants", "persistants graves traumatiques post menstruels troubles", "troubles menstruels", "menstruels post", "post traumatiques"], rate: [5, 15] },
          { name: "Séquelles de traumatisme ovarien (douleurs chroniques, troubles hormonaux)", searchTerms: ["séquelles traumatisme ovarien douleurs chroniques, troubles hormonaux", "hormonaux troubles chroniques, douleurs ovarien traumatisme séquelles", "séquelles traumatisme", "traumatisme ovarien", "ovarien douleurs"], rate: [10, 25] },
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
          { name: "Cicatrices de l'aisselle - Abduction nulle (inférieure à 10°) (droite)", searchTerms: ["cicatrices l'aisselle abduction nulle inférieure 10° droite", "droite 10° inférieure nulle abduction l'aisselle cicatrices", "cicatrices l'aisselle", "l'aisselle abduction", "abduction nulle"], rate: [40, 50], description: "Bras pratiquement collé au corps, abduction inférieure à 10°.", rateCriteria: { low: "Abduction < 10°, mobilité résiduelle.", high: "Bras complètement collé, aucune abduction." } },
          { name: "Cicatrices de l'aisselle - Abduction nulle (inférieure à 10°) (gauche)", searchTerms: ["cicatrices l'aisselle abduction nulle inférieure 10° gauche", "gauche 10° inférieure nulle abduction l'aisselle cicatrices", "cicatrices l'aisselle", "l'aisselle abduction", "abduction nulle"], rate: [32, 35], description: "Bras pratiquement collé au corps, abduction inférieure à 10°.", rateCriteria: { low: "Abduction < 10°, mobilité résiduelle.", high: "Bras complètement collé, aucune abduction." } },
          { name: "Cicatrices de l'aisselle - Abduction s'arrêtant à 45° (droite)", searchTerms: ["cicatrices l'aisselle abduction s'arrêtant 45° droite", "droite 45° s'arrêtant abduction l'aisselle cicatrices", "cicatrices l'aisselle", "l'aisselle abduction", "abduction s'arrêtant"], rate: [25, 30], description: "Limitant l'abduction du bras qui s'arrête à 45°.", rateCriteria: { low: "Abduction limitée à 45°, rotation préservée.", high: "Abduction à 45° avec rotation limitée." } },
          { name: "Cicatrices de l'aisselle - Abduction s'arrêtant à 45° (gauche)", searchTerms: ["cicatrices l'aisselle abduction s'arrêtant 45° gauche", "gauche 45° s'arrêtant abduction l'aisselle cicatrices", "cicatrices l'aisselle", "l'aisselle abduction", "abduction s'arrêtant"], rate: [20, 25], description: "Limitant l'abduction du bras qui s'arrête à 45°.", rateCriteria: { low: "Abduction limitée à 45°.", high: "Abduction à 45° avec rotation limitée." } },
          { name: "Cicatrices de l'aisselle - Abduction atteignant 90° (droite)", searchTerms: ["cicatrices l'aisselle abduction atteignant 90° droite", "droite 90° atteignant abduction l'aisselle cicatrices", "cicatrices l'aisselle", "l'aisselle abduction", "abduction atteignant"], rate: [15, 20], description: "Limitant l'abduction du bras qui atteint l'horizontale (90°).", rateCriteria: { low: "Abduction à 90° avec gêne légère.", high: "Abduction à 90° avec gêne marquée." } },
          { name: "Cicatrices de l'aisselle - Abduction atteignant 90° (gauche)", searchTerms: ["cicatrices l'aisselle abduction atteignant 90° gauche", "gauche 90° atteignant abduction l'aisselle cicatrices", "cicatrices l'aisselle", "l'aisselle abduction", "abduction atteignant"], rate: [12, 15], description: "Limitant l'abduction du bras qui atteint l'horizontale (90°).", rateCriteria: { low: "Abduction à 90° avec gêne légère.", high: "Abduction à 90° avec gêne marquée." } },
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
          { name: "Fracture Clavicule - Double, bien consolidées sans raideur", searchTerms: ["fracture clavicule double, bien consolidées sans raideur", "raideur sans consolidées bien double, clavicule fracture", "fracture clavicule double, bien consolidées raideur", "fracture clavicule", "clavicule double,"], rate: [4, 6], description: "Fractures bilatérales des deux clavicules bien consolidées sans raideur majeure des épaules. Gêne minime et fonctionnalité préservée." },
          { name: "Fracture Clavicule - Cal difforme avec compressions nerveuses (Main Dominante)", searchTerms: ["fracture clavicule cal difforme avec compressions nerveuses main dominante", "dominante main nerveuses compressions avec difforme cal clavicule fracture", "fracture clavicule cal difforme compressions nerveuses main dominante", "fracture clavicule", "clavicule cal"], rate: [30, 40], rateCriteria: { low: "Signes neurologiques modérés.", high: "Signes neurologiques sévères." } },
          { name: "Fracture Clavicule - Cal difforme avec compressions nerveuses (Main Non Dominante)", searchTerms: ["fracture clavicule cal difforme avec compressions nerveuses main non dominante", "dominante non main nerveuses compressions avec difforme cal clavicule fracture", "fracture clavicule cal difforme compressions nerveuses main non dominante", "fracture clavicule", "clavicule cal"], rate: [25, 35], rateCriteria: { low: "Signes neurologiques modérés.", high: "Signes neurologiques sévères." } },
          { name: "Pseudarthrose Clavicule (Main Dominante)", searchTerms: ["pseudarthrose clavicule main dominante", "dominante main clavicule pseudarthrose", "pseudarthrose clavicule", "clavicule main", "main dominante"], rate: [5, 10], rateCriteria: { low: "Pseudarthrose serrée, peu symptomatique.", high: "Pseudarthrose lâche, symptomatique." } },
          { name: "Pseudarthrose Clavicule (Main Non Dominante)", searchTerms: ["pseudarthrose clavicule main non dominante", "dominante non main clavicule pseudarthrose", "pseudarthrose clavicule", "clavicule main", "main non"], rate: [3, 6], rateCriteria: { low: "Pseudarthrose serrée.", high: "Pseudarthrose lâche." } },
          { name: "Luxation Clavicule non réduite - Externe (acromio-claviculaire) (Main Dominante)", searchTerms: ["luxation clavicule non réduite externe acromio claviculaire main dominante", "dominante main claviculaire acromio externe réduite non clavicule luxation", "luxation clavicule", "clavicule non", "non réduite"], rate: [0, 5], rateCriteria: { low: "Stade I-II, peu de gêne.", high: "Stade III, tiroir antéro-postérieur, gêne et douleur." } },
          { name: "Luxation Clavicule non réduite - Externe (acromio-claviculaire) (Main Non Dominante)", searchTerms: ["luxation clavicule non réduite externe acromio claviculaire main non dominante", "dominante non main claviculaire acromio externe réduite non clavicule luxation", "luxation clavicule", "clavicule non", "non réduite"], rate: [0, 4], rateCriteria: { low: "Stade I-II.", high: "Stade III." } },
          { name: "Luxation Clavicule non réduite - Interne (sterno-claviculaire) (Main Dominante)", searchTerms: ["luxation clavicule non réduite interne sterno claviculaire main dominante", "dominante main claviculaire sterno interne réduite non clavicule luxation", "luxation clavicule", "clavicule non", "non réduite"], rate: [4, 8], rateCriteria: { low: "Subluxation, peu symptomatique.", high: "Luxation complète, douloureuse." } },
          { name: "Luxation Clavicule non réduite - Interne (sterno-claviculaire) (Main Non Dominante)", searchTerms: ["luxation clavicule non réduite interne sterno claviculaire main non dominante", "dominante non main claviculaire sterno interne réduite non clavicule luxation", "luxation clavicule", "clavicule non", "non réduite"], rate: [2, 5], rateCriteria: { low: "Subluxation.", high: "Luxation complète." } },
          { name: "Luxation acromio-claviculaire simple (Main Dominante)", searchTerms: ["luxation acromio claviculaire simple main dominante", "dominante main simple claviculaire acromio luxation", "luxation acromio", "acromio claviculaire", "claviculaire simple"], rate: 4, description: "Luxation acromio-claviculaire simple, souvent compliquée par une périarthrite à évaluer séparément." },
          { name: "Luxation acromio-claviculaire simple (Main Non Dominante)", searchTerms: ["luxation acromio claviculaire simple main non dominante", "dominante non main simple claviculaire acromio luxation", "luxation acromio", "acromio claviculaire", "claviculaire simple"], rate: 3, description: "Luxation acromio-claviculaire simple, souvent compliquée par une périarthrite à évaluer séparément." },
          { name: "Luxation sterno-claviculaire avec gène fonctionnelle (Main Dominante)", searchTerms: ["luxation sterno claviculaire avec gène fonctionnelle main dominante", "dominante main fonctionnelle gène avec claviculaire sterno luxation", "luxation sterno claviculaire gène fonctionnelle main dominante", "luxation sterno", "sterno claviculaire"], rate: [8, 10], description: "Suite de luxation interne avec gêne fonctionnelle persistante.", rateCriteria: { low: "Gêne modérée.", high: "Gêne importante." } },
          { name: "Luxation sterno-claviculaire avec gène fonctionnelle (Main Non Dominante)", searchTerms: ["luxation sterno claviculaire avec gène fonctionnelle main non dominante", "dominante non main fonctionnelle gène avec claviculaire sterno luxation", "luxation sterno claviculaire gène fonctionnelle main non dominante", "luxation sterno", "sterno claviculaire"], rate: [6, 8], description: "Suite de luxation interne avec gêne fonctionnelle.", rateCriteria: { low: "Gêne modérée.", high: "Gêne importante." } },
          { name: "Fracture Omoplate - Séquelles minimes (gêne élévation bras) (Main Dominante)", searchTerms: ["fracture omoplate séquelles minimes gêne élévation bras main dominante", "fracture omoplate séquelles minimes gêne élévation supérieur main dominante", "dominante main bras élévation gêne minimes séquelles omoplate fracture", "fracture omoplate", "omoplate séquelles"], rate: 15, description: "Gêne des mouvements d'élévation du bras, douleurs." },
          { name: "Fracture Omoplate - Séquelles minimes (Main Non Dominante)", searchTerms: ["fracture omoplate séquelles minimes main non dominante", "dominante non main minimes séquelles omoplate fracture", "fracture omoplate", "omoplate séquelles", "séquelles minimes"], rate: 10, description: "Gêne des mouvements d'élévation du bras." },
          { name: "Fracture Omoplate - Séquelles sérieuses (arthrite, raideurs) (Main Dominante)", searchTerms: ["fracture omoplate séquelles sérieuses arthrite, raideurs main dominante", "dominante main raideurs arthrite, sérieuses séquelles omoplate fracture", "fracture omoplate", "omoplate séquelles", "séquelles sérieuses"], rate: [20, 25], description: "Arthrite chronique de l'épaule, raideurs articulaires, limitation des mouvements du bras.", rateCriteria: { low: "Raideurs modérées.", high: "Raideurs importantes." } },
          { name: "Fracture Omoplate - Séquelles sérieuses (Main Non Dominante)", searchTerms: ["fracture omoplate séquelles sérieuses main non dominante", "dominante non main sérieuses séquelles omoplate fracture", "fracture omoplate", "omoplate séquelles", "séquelles sérieuses"], rate: [15, 20], description: "Arthrite chronique, raideurs articulaires.", rateCriteria: { low: "Raideurs modérées.", high: "Raideurs importantes." } },
          { name: "Fracture Omoplate - Séquelles graves (immobilisation, ankylose) (Main Dominante)", searchTerms: ["fracture omoplate séquelles graves immobilisation, ankylose main dominante", "dominante main ankylose immobilisation, graves séquelles omoplate fracture", "fracture omoplate", "omoplate séquelles", "séquelles graves"], rate: [45, 50], description: "Immobilisation de l'omoplate, ankylose de l'épaule.", rateCriteria: { low: "Immobilisation partielle.", high: "Immobilisation complète avec ankylose." } },
          { name: "Fracture Omoplate - Séquelles graves (Main Non Dominante)", searchTerms: ["fracture omoplate séquelles graves main non dominante", "dominante non main graves séquelles omoplate fracture", "fracture omoplate", "omoplate séquelles", "séquelles graves"], rate: [35, 40], description: "Immobilisation de l'omoplate, ankylose de l'épaule.", rateCriteria: { low: "Immobilisation partielle.", high: "Immobilisation complète." } },
          { name: "Fracture Omoplate - Suivant variété, désordres articulaires, etc.", searchTerms: ["fracture omoplate suivant variété désordres articulaires", "omoplate fracture variété désordres", "fracture scapula", "omoplate traumatisme"], rate: [10, 50], description: "Évaluation globale des fractures de l'omoplate selon la variété (corps, col, cavité glénoïde, acromion, apophyse coracoïde), les désordres articulaires (atteinte scapulo-humérale), les raideurs et l'étendue des lésions. Barème officiel : 10-50%.", rateCriteria: { low: "Fracture simple du corps de l'omoplate consolidée avec séquelles minimes (douleurs légères, limitation fonctionnelle modérée).", medium: "Fracture complexe avec désordres articulaires modérés, raideur partielle de l'épaule, limitation importante des mouvements.", high: "Fracture comminutive avec destruction articulaire (cavité glénoïde), ankylose ou quasi-ankylose de l'épaule, impotence fonctionnelle majeure." } },
          { name: "Fracture du col anatomique de l'omoplate (Main Dominante)", searchTerms: ["fracture col anatomique l'omoplate main dominante", "dominante main l'omoplate anatomique col fracture", "fracture col", "col anatomique", "anatomique l'omoplate"], rate: [5, 10], description: "Fracture rare entre le corps de l'omoplate et la cavité glénoïde. Consolidation avec limitation des mouvements de rotation et d'abduction de l'épaule.", rateCriteria: { low: "Consolidation satisfaisante, limitation minime.", high: "Limitation importante des mouvements de l'épaule." } },
          { name: "Fracture du col anatomique de l'omoplate (Main Non Dominante)", searchTerms: ["fracture col anatomique l'omoplate main non dominante", "dominante non main l'omoplate anatomique col fracture", "fracture col", "col anatomique", "anatomique l'omoplate"], rate: [4, 8], description: "Fracture rare entre le corps de l'omoplate et la cavité glénoïde. Consolidation avec limitation des mouvements de rotation et d'abduction de l'épaule.", rateCriteria: { low: "Consolidation satisfaisante, limitation minime.", high: "Limitation importante des mouvements de l'épaule." } },
          { name: "Limitation douloureuse mouvements omoplate - articulation scapulo-thoracique (Main Dominante)", searchTerms: ["limitation douloureuse mouvements omoplate articulation scapulo thoracique main dominante", "raideur douloureuse mouvements omoplate articulation scapulo thoracique main dominante", "dominante main thoracique scapulo articulation omoplate mouvements douloureuse limitation", "limitation douloureuse", "douloureuse mouvements"], rate: [15, 20], description: "Après contusion ayant lésé l'articulation scapulo-thoracique (suffusion sanguine, adhérences) mais laissé indemne l'articulation scapulo-humérale.", rateCriteria: { low: "Douleurs modérées, limitation partielle.", high: "Douleurs marquées, limitation importante avec adhérences." } },
          { name: "Limitation douloureuse mouvements omoplate - articulation scapulo-thoracique (Main Non Dominante)", searchTerms: ["limitation douloureuse mouvements omoplate articulation scapulo thoracique main non dominante", "raideur douloureuse mouvements omoplate articulation scapulo thoracique main non dominante", "dominante non main thoracique scapulo articulation omoplate mouvements douloureuse limitation", "limitation douloureuse", "douloureuse mouvements"], rate: [12, 16], description: "Lésion de l'articulation scapulo-thoracique avec suffusion sanguine ou adhérences.", rateCriteria: { low: "Douleurs modérées.", high: "Douleurs marquées avec adhérences." } },
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
        ]
       },
       {
        name: "Épaule - Fractures de l'Extrémité Supérieure de l'Humérus",
        injuries: [
          { name: "Fracture isolée du col chirurgical de l'humérus - Bien consolidée sans séquelle (Main Dominante)", searchTerms: ["fracture isolée col chirurgical l'humérus bien consolidée sans séquelle main dominante", "dominante main séquelle sans consolidée bien l'humérus chirurgical col isolée fracture", "fracture isolée col chirurgical l'humérus bien consolidée séquelle main dominante", "fracture isolée", "isolée col"], rate: [2, 3], description: "Fracture simple du col chirurgical bien traitée avec récupération complète et consolidation sans cal vicieux." },
          { name: "Fracture isolée du col chirurgical de l'humérus - Bien consolidée sans séquelle (Main Non Dominante)", searchTerms: ["fracture isolée col chirurgical l'humérus bien consolidée sans séquelle main non dominante", "dominante non main séquelle sans consolidée bien l'humérus chirurgical col isolée fracture", "fracture isolée col chirurgical l'humérus bien consolidée séquelle main non dominante", "fracture isolée", "isolée col"], rate: [1, 2], description: "Fracture simple du col chirurgical bien traitée avec récupération complète et consolidation sans cal vicieux." },
          { name: "Fracture de la tête humérale", searchTerms: ["fracture tête humérale", "humérale tête fracture", "fracture tête", "tête humérale"], rate: [18, 25] },
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
          { name: "Raideur de l'épaule - Abduction 60-90°", searchTerms: ["raideur l'épaule abduction 90°", "90° abduction l'épaule raideur", "raideur l'épaule", "l'épaule abduction", "abduction 90°"], rate: [12, 22], description: "Limitation modérée de l'abduction entre 60 et 90 degrés avec rotation préservée." },
          { name: "Raideur de l'épaule - Abduction 60-90° + rotation", searchTerms: ["raideur l'épaule abduction 90° rotation", "rotation 90° abduction l'épaule raideur", "raideur l'épaule", "l'épaule abduction", "abduction 90°"], rate: [15, 25], description: "Limitation combinée abduction 60-90° et rotations externe/interne réduites." },
          { name: "Raideur de l'épaule avec douleur", searchTerms: ["raideur l'épaule avec douleur", "douleur avec l'épaule raideur", "raideur l'épaule douleur", "raideur l'épaule", "l'épaule avec"], rate: [18, 28], description: "Raideur articulaire avec composante douloureuse chronique limitant les activités." },
          { name: "Raideur de l'épaule - Limitation rotation", searchTerms: ["raideur l'épaule limitation rotation", "raideur l'épaule raideur rotation", "rotation limitation l'épaule raideur", "raideur l'épaule", "l'épaule limitation"], rate: [10, 20], description: "Abduction quasi normale mais rotations externe/interne très limitées." },
          { name: "Raideur + instabilité épaule", searchTerms: ["raideur instabilité épaule", "épaule instabilité raideur", "raideur instabilité", "instabilité épaule"], rate: [20, 30], description: "Association raideur articulaire et instabilité (luxation récidivante ou subluxation)." },
          { name: "Raideur de l'épaule - Élévation limitée", searchTerms: ["raideur l'épaule élévation limitée", "limitée élévation l'épaule raideur", "raideur l'épaule", "l'épaule élévation", "élévation limitée"], rate: [12, 20], description: "Limitation de l'élévation antérieure et de l'antépulsion." },
          { name: "Raideur de l'épaule avec limitation fonctionnelle", searchTerms: ["raideur l'épaule avec limitation fonctionnelle", "raideur l'épaule avec raideur fonctionnelle", "fonctionnelle limitation avec l'épaule raideur", "raideur l'épaule limitation fonctionnelle", "raideur l'épaule"], rate: [15, 25], description: "Raideur avec retentissement sur gestes quotidiens (main derrière dos, tête impossible)." },
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
          { name: "Périarthrite scapulo-humérale rendant travail difficile (Main Dominante)", searchTerms: ["périarthrite scapulo humérale rendant travail difficile main dominante", "dominante main difficile travail rendant humérale scapulo périarthrite", "périarthrite scapulo", "scapulo humérale", "humérale rendant"], rate: [16, 20], description: "Troubles neuro-sensitifs, diminution de la force musculaire, réduction de l'amplitude des mouvements.", rateCriteria: { low: "Douleurs modérées, gêne au travail.", high: "Douleurs fréquentes, travail pénible." } },
          { name: "Périarthrite scapulo-humérale rendant travail difficile (Main Non Dominante)", searchTerms: ["périarthrite scapulo humérale rendant travail difficile main non dominante", "dominante non main difficile travail rendant humérale scapulo périarthrite", "périarthrite scapulo", "scapulo humérale", "humérale rendant"], rate: [12, 15], description: "Troubles neuro-sensitifs, diminution force musculaire, réduction amplitude.", rateCriteria: { low: "Douleurs modérées.", high: "Douleurs fréquentes." } },
          { name: "Périarthrite avec extension bursite sous-acromio-deltoïdienne (Main Dominante)", searchTerms: ["périarthrite avec extension bursite sous acromio deltoïdienne main dominante", "dominante main deltoïdienne acromio sous bursite extension avec périarthrite", "périarthrite extension bursite sous acromio deltoïdienne main dominante", "périarthrite avec", "avec extension"], rate: [22, 25], description: "Extension du processus post-traumatique à la bourse séreuse, au tendon sus-épineux. Rechercher signes de rupture coiffe (clinique + arthrographie). Limitation importante mouvements bras et omoplate.", rateCriteria: { low: "Limitation importante des mouvements du bras.", high: "Limitation importante bras + omoplate." } },
          { name: "Périarthrite avec extension bursite (Main Non Dominante)", searchTerms: ["périarthrite avec extension bursite main non dominante", "dominante non main bursite extension avec périarthrite", "périarthrite extension bursite main non dominante", "périarthrite avec", "avec extension"], rate: [16, 20], description: "Extension à la bourse séreuse et tendon sus-épineux.", rateCriteria: { low: "Limitation importante mouvements bras.", high: "Limitation bras + omoplate." } },
          { name: "Périarthrite avec calcifications et tendance ankylose (Main Dominante)", searchTerms: ["périarthrite avec calcifications tendance ankylose main dominante", "dominante main ankylose tendance calcifications avec périarthrite", "périarthrite calcifications tendance ankylose main dominante", "périarthrite avec", "avec calcifications"], rate: [28, 32], description: "Calcifications et dépôts opaques (vérifiés radiographie), tendance ankylose par raideurs de plus en plus serrées et immobilisation de l'omoplate.", rateCriteria: { low: "Calcifications avec raideur modérée.", high: "Calcifications étendues, quasi-ankylose, immobilisation omoplate." } },
          { name: "Périarthrite avec calcifications (Main Non Dominante)", searchTerms: ["périarthrite avec calcifications main non dominante", "dominante non main calcifications avec périarthrite", "périarthrite calcifications main non dominante", "périarthrite avec", "avec calcifications"], rate: [22, 25], description: "Calcifications vérifiées à la radiographie, tendance ankylose.", rateCriteria: { low: "Calcifications avec raideur modérée.", high: "Calcifications étendues, quasi-ankylose." } },
          { name: "Rupture complète de la coiffe des rotateurs", searchTerms: ["rupture complète coiffe des rotateurs", "rotateurs des coiffe complète rupture", "rupture complète coiffe rotateurs", "rupture complète", "complète coiffe"], rate: 25 },
          { name: "Rupture de la coiffe des rotateurs post-traumatique (supra-épineux, etc.) (Main Dominante)", searchTerms: ["rupture coiffe des rotateurs post traumatique supra épineux, etc. main dominante", "dominante main etc. épineux, supra traumatique post rotateurs des coiffe rupture", "rupture coiffe rotateurs post traumatique supra épineux, etc. main dominante", "rupture coiffe", "coiffe des"], rate: [10, 30], rateCriteria: { low: "Rupture partielle, douleurs à l'effort, mobilité quasi-normale.", medium: "Rupture transfixiante d'un tendon, perte de force, abduction limitée mais possible.", high: "Rupture massive et irréparable, épaule pseudo-paralytique." } },
          { name: "Rupture de la coiffe des rotateurs post-traumatique (supra-épineux, etc.) (Main Non Dominante)", searchTerms: ["rupture coiffe des rotateurs post traumatique supra épineux, etc. main non dominante", "dominante non main etc. épineux, supra traumatique post rotateurs des coiffe rupture", "rupture coiffe rotateurs post traumatique supra épineux, etc. main non dominante", "rupture coiffe", "coiffe des"], rate: [8, 25], rateCriteria: { low: "Rupture partielle, douleurs à l'effort.", medium: "Rupture transfixiante, perte de force.", high: "Rupture massive, épaule pseudo-paralytique." } },
          { name: "Lésion SLAP (Superior Labrum from Anterior to Posterior) chronique (Main Dominante)", searchTerms: ["lésion slap superior labrum from anterior posterior chronique main dominante", "dominante main chronique posterior anterior from labrum superior slap lésion", "lésion slap", "slap superior", "superior labrum"], rate: [8, 20], description: "Lésion du bourrelet glénoïdien supérieur de l'épaule, entraînant des douleurs, des blocages et une instabilité fonctionnelle.", rateCriteria: { low: "Douleurs mécaniques aux mouvements extrêmes (armé du bras), sans instabilité objective.", high: "Douleurs, blocages et ressauts fréquents avec perte de force, invalidant pour les gestes au-dessus de la tête." } },
          { name: "Lésion SLAP (Superior Labrum from Anterior to Posterior) chronique (Main Non Dominante)", searchTerms: ["lésion slap superior labrum from anterior posterior chronique main non dominante", "dominante non main chronique posterior anterior from labrum superior slap lésion", "lésion slap", "slap superior", "superior labrum"], rate: [6, 15], description: "Lésion du bourrelet glénoïdien supérieur de l'épaule, entraînant des douleurs, des blocages et une instabilité fonctionnelle.", rateCriteria: { low: "Douleurs mécaniques aux mouvements extrêmes (armé du bras), sans instabilité objective.", high: "Douleurs, blocages et ressauts fréquents avec perte de force, invalidant pour les gestes au-dessus de la tête." } },
          { name: "Pseudarthrose (épaule ballante) (Main Dominante)", searchTerms: ["pseudarthrose épaule ballante main dominante", "dominante main ballante épaule pseudarthrose", "pseudarthrose épaule", "épaule ballante", "ballante main"], rate: [60, 70], description: "Épaule ballante par résection large ou pertes de substance osseuse étendues. Barème officiel : 60-70%.", rateCriteria: { low: "Résection large avec mobilité conservée de l'omoplate, compensation fonctionnelle partielle.", high: "Perte de substance osseuse étendue, épaule complètement ballante, impotence fonctionnelle majeure." } },
          { name: "Pseudarthrose (épaule ballante) (Main Non Dominante)", searchTerms: ["pseudarthrose épaule ballante main non dominante", "dominante non main ballante épaule pseudarthrose", "pseudarthrose épaule", "épaule ballante", "ballante main"], rate: [45, 60], description: "Épaule ballante par résection large ou pertes de substance osseuse étendues. Barème officiel : 45-60%.", rateCriteria: { low: "Résection large avec compensation fonctionnelle partielle.", high: "Perte de substance osseuse étendue, épaule complètement ballante." } },
          { name: "Luxation de l'épaule unique, réduite, sans séquelles", searchTerms: ["luxation l'épaule unique, réduite, sans séquelles", "séquelles sans réduite, unique, l'épaule luxation", "luxation l'épaule unique, réduite, séquelles", "luxation l'épaule", "l'épaule unique,"], rate: 0, description: "Luxation de l'épaule unique, réduite, n'ayant pas entraîné d'arthrite, de périarthrite scapulo-humérale, ni de limitation d'amplitude des mouvements du bras. Si séquelles : voir périarthrite scapulo-humérale." },
          { name: "Luxation récidivante de l'épaule", searchTerms: ["luxation récidivante l'épaule", "l'épaule récidivante luxation", "luxation récidivante", "récidivante l'épaule"], rate: 18, description: "Luxation récidivante de l'épaule sans précision de côte ou dominance." },
          { name: "Luxation récidivante de l'épaule (Main Dominante)", searchTerms: ["luxation récidivante l'épaule main dominante", "dominante main l'épaule récidivante luxation", "luxation récidivante", "récidivante l'épaule", "l'épaule main"], rate: [10, 30], rateCriteria: { low: "Luxations rares, peu d'appréhension.", medium: "Luxations fréquentes, appréhension limitant les activités.", high: "Instabilité majeure, luxations quasi-permanentes, arthrose." } },
          { name: "Luxation récidivante de l'épaule (Main Non Dominante)", searchTerms: ["luxation récidivante l'épaule main non dominante", "dominante non main l'épaule récidivante luxation", "luxation récidivante", "récidivante l'épaule", "l'épaule main"], rate: [8, 25], rateCriteria: { low: "Luxations rares.", medium: "Luxations fréquentes.", high: "Instabilité majeure." } },
          { name: "Capsulite rétractile post-traumatique (épaule gelée) (Main Dominante)", searchTerms: ["capsulite rétractile post traumatique épaule gelée main dominante", "dominante main gelée épaule traumatique post rétractile capsulite", "capsulite rétractile", "rétractile post", "post traumatique"], rate: [15, 30], description: "Enraidissement progressif et douloureux de l'épaule avec limitation de toutes les mobilités actives et passives.", rateCriteria: { low: "Phase résolutive avec récupération de plus de 50% des mobilités, douleurs résiduelles.", high: "Séquelles de raideur majeure et permanente malgré le traitement, avec retentissement fonctionnel sévère." } },
          { name: "Capsulite rétractile post-traumatique (épaule gelée) (Main Non Dominante)", searchTerms: ["capsulite rétractile post traumatique épaule gelée main non dominante", "dominante non main gelée épaule traumatique post rétractile capsulite", "capsulite rétractile", "rétractile post", "post traumatique"], rate: [12, 25], description: "Enraidissement progressif et douloureux de l'épaule.", rateCriteria: { low: "Récupération de plus de 50% des mobilités.", high: "Raideur majeure et permanente." } },
          { name: "Séquelles de prothèse totale d'épaule (Main Dominante)", searchTerms: ["séquelles prothèse totale d'épaule main dominante", "dominante main d'épaule totale prothèse séquelles", "séquelles prothèse", "prothèse totale", "totale d'épaule"], rate: [20, 40], rateCriteria: { low: "Prothèse bien intégrée, indolore, mobilité > 90°.", high: "Douleurs, instabilité, mobilité très limitée, nécessité d'aide." } },
          { name: "Séquelles de prothèse totale d'épaule (Main Non Dominante)", searchTerms: ["séquelles prothèse totale d'épaule main non dominante", "dominante non main d'épaule totale prothèse séquelles", "séquelles prothèse", "prothèse totale", "totale d'épaule"], rate: [15, 35], rateCriteria: { low: "Prothèse bien intégrée, indolore.", high: "Douleurs, instabilité, mobilité limitée." } },
          { name: "Résection de la tête humérale sans ankylose de l'épaule (Main Dominante)", searchTerms: ["résection tête humérale sans ankylose l'épaule main dominante", "dominante main l'épaule ankylose sans humérale tête résection", "résection tête humérale ankylose l'épaule main dominante", "résection tête", "tête humérale"], rate: [25, 35], description: "Ablation chirurgicale de la tête humérale (arthrite, ostéite, nécrose) avec conservation de la mobilité articulaire mais instabilité, perte de force et douleurs résiduelles.", rateCriteria: { low: "Mobilité conservée, douleurs modérées, instabilité compensée.", high: "Instabilité importante, douleurs chroniques, perte de force majeure." } },
          { name: "Résection de la tête humérale sans ankylose de l'épaule (Main Non Dominante)", searchTerms: ["résection tête humérale sans ankylose l'épaule main non dominante", "dominante non main l'épaule ankylose sans humérale tête résection", "résection tête humérale ankylose l'épaule main non dominante", "résection tête", "tête humérale"], rate: [20, 30], description: "Ablation chirurgicale de la tête humérale avec conservation de la mobilité mais instabilité et perte de force.", rateCriteria: { low: "Mobilité conservée, douleurs modérées.", high: "Instabilité importante, douleurs chroniques." } },
          { name: "Ankylose simultanée de l'épaule et du coude (Main Dominante)", searchTerms: ["ankylose simultanée l'épaule coude main dominante", "dominante main coude l'épaule simultanée ankylose", "ankylose simultanée", "simultanée l'épaule", "l'épaule coude"], rate: [60, 70], description: "Double ankylose invalidante majeure rendant le bras complètement rigide avec perte fonctionnelle quasi-totale du membre supérieur.", rateCriteria: { low: "Ankyloses en position relativement fonctionnelle.", high: "Ankyloses en position défavorable, membre totalement rigide et inutilisable." } },
          { name: "Ankylose simultanée de l'épaule et du coude (Main Non Dominante)", searchTerms: ["ankylose simultanée l'épaule coude main non dominante", "dominante non main coude l'épaule simultanée ankylose", "ankylose simultanée", "simultanée l'épaule", "l'épaule coude"], rate: [50, 60], description: "Double ankylose invalidante majeure rendant le bras complètement rigide avec perte fonctionnelle quasi-totale du membre supérieur.", rateCriteria: { low: "Ankyloses en position relativement fonctionnelle.", high: "Ankyloses en position défavorable, membre totalement rigide." } },
        ]
      },
      {
        name: "Bras - Amputations",
        injuries: [
            { name: "Amputation du bras au tiers moyen ou inférieur (Main Dominante)", searchTerms: ["amputation bras tiers moyen inférieur main dominante", "amputation supérieur tiers moyen inférieur main dominante", "dominante main inférieur moyen tiers bras amputation", "amputation bras", "bras tiers"], rate: [80, 85], rateCriteria: { low: "Moignon long.", high: "Moignon court." } },
            { name: "Amputation du bras au tiers moyen ou inférieur (Main Non Dominante)", searchTerms: ["amputation bras tiers moyen inférieur main non dominante", "amputation supérieur tiers moyen inférieur main non dominante", "dominante non main inférieur moyen tiers bras amputation", "amputation bras", "bras tiers"], rate: [70, 75], rateCriteria: { low: "Moignon long.", high: "Moignon court." } },
            { name: "Amputation du bras au tiers supérieur (Main Dominante)", searchTerms: ["amputation bras tiers supérieur main dominante", "amputation supérieur tiers supérieur main dominante", "dominante main supérieur tiers bras amputation", "amputation bras", "bras tiers"], rate: [80, 85], rateCriteria: { low: "Moignon long.", high: "Moignon très court, difficilement appareillable." } },
            { name: "Amputation du bras au tiers supérieur (Main Non Dominante)", searchTerms: ["amputation bras tiers supérieur main non dominante", "amputation supérieur tiers supérieur main non dominante", "dominante non main supérieur tiers bras amputation", "amputation bras", "bras tiers"], rate: [70, 75], rateCriteria: { low: "Moignon long.", high: "Moignon très court." } },
            { name: "Désarticulation de l'épaule (Main Dominante)", searchTerms: ["désarticulation l'épaule main dominante", "dominante main l'épaule désarticulation", "désarticulation l'épaule", "l'épaule main", "main dominante"], rate: [85, 90], description: "Désarticulation scapulo-humérale, amputation au niveau de l'épaule." },
            { name: "Désarticulation de l'épaule (Main Non Dominante)", searchTerms: ["désarticulation l'épaule main non dominante", "dominante non main l'épaule désarticulation", "désarticulation l'épaule", "l'épaule main", "main non"], rate: [75, 80], description: "Désarticulation scapulo-humérale, amputation au niveau de l'épaule." },
            { name: "Pertes des deux membres supérieurs (quel qu'en soit le niveau)", searchTerms: ["pertes des deux membres supérieurs quel soit niveau", "perte bilatérale membres supérieurs", "amputation bilatérale membres supérieurs", "pertes deux bras", "perte membres supérieurs bilatérale"], rate: 100, description: "Perte bilatérale des deux membres supérieurs, quel que soit le niveau d'amputation (main, avant-bras, bras ou épaule). Invalidité totale." },
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
            { name: "Rupture du triceps partielle (Main Dominante)", searchTerms: ["rupture triceps partielle main dominante", "dominante main partielle triceps rupture", "rupture triceps partielle", "triceps partielle", "désinsertion partielle triceps"], rate: [10, 15], description: "Désinsertion partielle du tendon du triceps avec perte de force en extension du coude.", rateCriteria: { low: "Perte de force modérée, extension possible contre résistance.", high: "Perte de force importante, difficulté à l'extension complète du coude." } },
            { name: "Rupture du triceps partielle (Main Non Dominante)", searchTerms: ["rupture triceps partielle main non dominante", "dominante non main partielle triceps rupture", "rupture triceps partielle", "triceps partielle", "désinsertion partielle triceps"], rate: [8, 12], description: "Désinsertion partielle du tendon du triceps avec perte de force en extension du coude.", rateCriteria: { low: "Perte de force modérée, extension possible contre résistance.", high: "Perte de force importante, difficulté à l'extension complète du coude." } },
            { name: "Rupture du triceps totale (Main Dominante)", searchTerms: ["rupture triceps totale main dominante", "dominante main totale triceps rupture", "rupture triceps", "triceps totale", "totale main"], rate: [20, 30] },
            { name: "Rupture du triceps totale (Main Non Dominante)", searchTerms: ["rupture triceps totale main non dominante", "dominante non main totale triceps rupture", "rupture triceps", "triceps totale", "totale main"], rate: [15, 25] },
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
          { name: "Fracture de la tête radiale (cupule radiale) - Consolidation avec limitation minime (Main Dominante)", searchTerms: ["fracture tête radiale cupule radiale consolidation avec limitation minime main dominante", "fracture tête radiale cupule radiale consolidation avec raideur minime main dominante", "dominante main minime limitation avec consolidation radiale cupule radiale tête fracture", "fracture tête radiale cupule radiale consolidation limitation minime main dominante", "fracture tête"], rate: [5, 10], description: "Fracture parcellaire ou complète de la tête du radius au coude avec limitation modérée de la prono-supination." },
          { name: "Fracture de la tête radiale (cupule radiale) - Consolidation avec limitation minime (Main Non Dominante)", searchTerms: ["fracture tête radiale cupule radiale consolidation avec limitation minime main non dominante", "fracture tête radiale cupule radiale consolidation avec raideur minime main non dominante", "dominante non main minime limitation avec consolidation radiale cupule radiale tête fracture", "fracture tête radiale cupule radiale consolidation limitation minime main non dominante", "fracture tête"], rate: [4, 8], description: "Fracture parcellaire ou complète de la tête du radius au coude avec limitation modérée de la prono-supination." },
          { name: "Fracture de la tête radiale (cupule radiale) - Avec limitation importante prono-supination (Main Dominante)", searchTerms: ["fracture tête radiale cupule radiale avec limitation importante prono supination main dominante", "fracture tête radiale cupule radiale avec raideur importante prono supination main dominante", "dominante main supination prono importante limitation avec radiale cupule radiale tête fracture", "fracture tête radiale cupule radiale limitation importante prono supination main dominante", "fracture tête"], rate: [10, 18], description: "Fracture tête radiale avec limitation sévère de la prono-supination et gêne flexion-extension." },
          { name: "Fracture de la tête radiale (cupule radiale) - Avec limitation importante prono-supination (Main Non Dominante)", searchTerms: ["fracture tête radiale cupule radiale avec limitation importante prono supination main non dominante", "fracture tête radiale cupule radiale avec raideur importante prono supination main non dominante", "dominante non main supination prono importante limitation avec radiale cupule radiale tête fracture", "fracture tête radiale cupule radiale limitation importante prono supination main non dominante", "fracture tête"], rate: [8, 15], description: "Fracture tête radiale avec limitation sévère de la prono-supination et gêne flexion-extension." },
          { name: "Fracture de l'olécrane - Cal fibreux long, extension active faible (Main Dominante)", searchTerms: ["fracture l'olécrane cal fibreux long, extension active faible main dominante", "dominante main faible active extension long, fibreux cal l'olécrane fracture", "fracture l'olécrane", "l'olécrane cal", "cal fibreux"], rate: [8, 10] },
          { name: "Fracture de l'olécrane - Cal fibreux long, extension active faible (Main Non Dominante)", searchTerms: ["fracture l'olécrane cal fibreux long, extension active faible main non dominante", "dominante non main faible active extension long, fibreux cal l'olécrane fracture", "fracture l'olécrane", "l'olécrane cal", "cal fibreux"], rate: [6, 8] },
          { name: "Fracture de l'olécrane - Cal fibreux long, extension active nulle, atrophie (Main Dominante)", searchTerms: ["fracture l'olécrane cal fibreux long, extension active nulle, atrophie main dominante", "dominante main atrophie nulle, active extension long, fibreux cal l'olécrane fracture", "fracture l'olécrane", "l'olécrane cal", "cal fibreux"], rate: [20, 25] },
          { name: "Fracture de l'olécrane - Cal fibreux long, extension active nulle, atrophie (Main Non Dominante)", searchTerms: ["fracture l'olécrane cal fibreux long, extension active nulle, atrophie main non dominante", "dominante non main atrophie nulle, active extension long, fibreux cal l'olécrane fracture", "fracture l'olécrane", "l'olécrane cal", "cal fibreux"], rate: [15, 20] },
          { name: "Fracture de l'olécrane - Avec raideur importante", searchTerms: ["fracture l'olécrane avec raideur importante", "importante raideur avec l'olécrane fracture", "fracture l'olécrane raideur importante", "fracture l'olécrane", "l'olécrane avec"], rate: [18, 25] },
          { name: "Fracture isolée de l'épitrochlée (épicondyle médial) (Main Dominante)", searchTerms: ["fracture isolée l'épitrochlée épicondyle médial main dominante", "dominante main médial épicondyle l'épitrochlée isolée fracture", "fracture isolée", "isolée l'épitrochlée", "l'épitrochlée épicondyle"], rate: [2, 3], description: "Fracture de l'apophyse médiale du coude (épitrochlée). Légère gêne de la pronation et douleurs résiduelles minimes." },
          { name: "Fracture isolée de l'épitrochlée (épicondyle médial) (Main Non Dominante)", searchTerms: ["fracture isolée l'épitrochlée épicondyle médial main non dominante", "dominante non main médial épicondyle l'épitrochlée isolée fracture", "fracture isolée", "isolée l'épitrochlée", "l'épitrochlée épicondyle"], rate: [1, 2], description: "Fracture de l'apophyse médiale du coude (épitrochlée). Légère gêne de la pronation et douleurs résiduelles minimes." },
          { name: "Fracture isolée de l'épicondyle (épicondyle latéral) (Main Dominante)", searchTerms: ["fracture isolée l'épicondyle épicondyle latéral main dominante", "dominante main latéral épicondyle l'épicondyle isolée fracture", "fracture isolée", "isolée l'épicondyle", "l'épicondyle épicondyle"], rate: [2, 3], description: "Fracture de l'apophyse latérale du coude (épicondyle). Légère gêne de la supination et douleurs résiduelles minimes." },
          { name: "Fracture isolée de l'épicondyle (épicondyle latéral) (Main Non Dominante)", searchTerms: ["fracture isolée l'épicondyle épicondyle latéral main non dominante", "dominante non main latéral épicondyle l'épicondyle isolée fracture", "fracture isolée", "isolée l'épicondyle", "l'épicondyle épicondyle"], rate: [1, 2], description: "Fracture de l'apophyse latérale du coude (épicondyle). Légère gêne de la supination et douleurs résiduelles minimes." },
          { name: "Cicatrices du coude entravant l'extension - à 135°", searchTerms: ["cicatrices coude entravant l'extension 135°", "135° l'extension entravant coude cicatrices", "cicatrices coude", "coude entravant", "entravant l'extension"], rate: [10, 15] },
          { name: "Cicatrices du coude entravant l'extension - à 90°", searchTerms: ["cicatrices coude entravant l'extension 90°", "90° l'extension entravant coude cicatrices", "cicatrices coude", "coude entravant", "entravant l'extension"], rate: [15, 20] },
          { name: "Cicatrices du coude entravant l'extension - à 45°", searchTerms: ["cicatrices coude entravant l'extension 45°", "45° l'extension entravant coude cicatrices", "cicatrices coude", "coude entravant", "entravant l'extension"], rate: [35, 40] },
          { name: "Cicatrices du coude entravant l'extension - en deçà de 45°", searchTerms: ["cicatrices coude entravant l'extension deçà 45°", "45° deçà l'extension entravant coude cicatrices", "cicatrices coude", "coude entravant", "entravant l'extension"], rate: [45, 50] },
          { name: "Cicatrices du creux poplité entravant l'extension de la jambe", searchTerms: ["cicatrices creux poplité entravant extension jambe", "flexion genou cicatrice poplité", "bride rétractile poplité", "cicatrice arrière genou"], rate: [10, 60], description: "Brides cicatricielles du creux poplité limitant l'extension de la jambe (maintien en flexion). Barème officiel Chapitre XII : 10-60%.", rateCriteria: { low: "Flexion résiduelle légère (<30°), marche peu gênée, extension presque complète possible.", medium: "Flexion modérée (30-60°), marche avec boiterie, extension limitée, difficulté à la montée d'escaliers.", high: "Flexion sévère (>60°), extension impossible, jambe maintenue en flexion permanente, marche très difficile ou impossible." } },
          { name: "Cicatrices de la plante du pied incurvant la pointe", searchTerms: ["cicatrices plante pied incurvant pointe", "rétraction plante pied", "bride plantaire griffe orteils", "cicatrice plantaire douloureuse"], rate: [10, 30], description: "Cicatrices rétractiles de la plante du pied entraînant une incurvation de la pointe (griffe des orteils, pied creux cicatriciel). Barème officiel Chapitre XII : 10-30%.", rateCriteria: { low: "Incurvation modérée, marche possible avec chaussure adaptée, douleurs occasionnelles.", medium: "Incurvation importante, griffe des orteils gênant le chaussage, douleurs fréquentes à l'appui.", high: "Incurvation sévère, pied creux cicatriciel majeur, chaussage très difficile, douleurs permanentes, marche limitée." } },
          { name: "Cicatrices douloureuses et ulcérées (selon étendue et localisation)", searchTerms: ["cicatrices douloureuses ulcérées", "cicatrice douloureuse chronique", "ulcération cicatricielle", "cicatrice hyperalgique"], rate: [5, 25], description: "Cicatrices pathologiques avec douleurs chroniques et/ou ulcérations récidivantes. Barème officiel Chapitre XII : 5-25%.", rateCriteria: { low: "Cicatrice hypersensible, douleurs à la pression, pas d'ulcération.", medium: "Douleurs spontanées fréquentes, ulcérations occasionnelles nécessitant des soins réguliers.", high: "Douleurs permanentes invalidantes, ulcérations chroniques résistantes au traitement, retentissement majeur sur activités." } },
          { name: "Pseudarthrose coude - Mobile (coude ballant) (Main Dominante)", searchTerms: ["pseudarthrose coude mobile coude ballant main dominante", "dominante main ballant coude mobile coude pseudarthrose", "pseudarthrose coude", "coude mobile", "mobile coude"], rate: [40, 50] },
          { name: "Pseudarthrose coude - Mobile (coude ballant) (Main Non Dominante)", searchTerms: ["pseudarthrose coude mobile coude ballant main non dominante", "dominante non main ballant coude mobile coude pseudarthrose", "pseudarthrose coude", "coude mobile", "mobile coude"], rate: [30, 40] },
          { name: "Pseudarthrose coude - Avec ankylose (Main Dominante)", searchTerms: ["pseudarthrose coude avec ankylose main dominante", "dominante main ankylose avec coude pseudarthrose", "pseudarthrose coude ankylose main dominante", "pseudarthrose coude", "coude avec"], rate: [30, 45] },
          { name: "Pseudarthrose coude - Avec ankylose (Main Non Dominante)", searchTerms: ["pseudarthrose coude avec ankylose main non dominante", "dominante non main ankylose avec coude pseudarthrose", "pseudarthrose coude ankylose main non dominante", "pseudarthrose coude", "coude avec"], rate: [25, 35] },
        ]
      },
      {
        name: "Coude - Raideurs et Ankyloses",
        injuries: [
            { name: "Raideur du coude - Flexion 90-130°", searchTerms: ["raideur coude flexion 130°", "130° flexion coude raideur", "raideur coude", "coude flexion", "flexion 130°"], rate: [8, 18], description: "Limitation modérée de la flexion entre 90 et 130 degrés, extension quasi normale." },
            { name: "Raideur du coude - Flexion + pronosupination", searchTerms: ["raideur coude flexion pronosupination", "pronosupination flexion coude raideur", "raideur coude", "coude flexion", "flexion pronosupination"], rate: [12, 20], description: "Limitation combinée flexion et pronosupination." },
            { name: "Raideur du coude - Flexion 90-130° + extension", searchTerms: ["raideur coude flexion 130° extension", "extension 130° flexion coude raideur", "raideur coude", "coude flexion", "flexion 130°"], rate: [15, 25], description: "Limitation bipolaire flexion-extension avec déficit fonctionnel." },
            { name: "Raideur du coude post-fracture", searchTerms: ["raideur coude post fracture", "fracture post coude raideur", "raideur coude", "coude post", "post fracture"], rate: [12, 22], description: "Séquelles de fracture avec raideur résiduelle et limitation pronosupination." },
            { name: "Raideur du coude - Pronosupination limitée", searchTerms: ["raideur coude pronosupination limitée", "limitée pronosupination coude raideur", "raideur coude", "coude pronosupination", "pronosupination limitée"], rate: [8, 15], description: "Flexion-extension préservées mais pronation/supination très réduites." },
            { name: "Raideur du coude - Limitation sévère", searchTerms: ["raideur coude limitation sévère", "raideur coude raideur sévère", "sévère limitation coude raideur", "raideur coude", "coude limitation"], rate: [18, 28], description: "Flexion ≤ 90° avec déficit extension important, limitation majeure." },
            
            // Raideurs spécifiques selon barème officiel (avec amplitudes précises)
            { name: "Raideur du coude - Mouvements conservés vont de 110° à 35° (Main Dominante)", searchTerms: ["raideur coude mouvements conservés 110° 35° main dominante", "raideur coude amplitude 110 35 degrés dominante", "coude mouvements 110 35 dominante", "raideur coude 110 35"], rate: [8, 10], description: "Raideur articulaire du coude avec conservation d'une amplitude de mouvement de 110° à 35° (selon barème officiel).", rateCriteria: { low: "Amplitude fonctionnelle conservée 110°-35°.", high: "Gêne fonctionnelle malgré amplitude théorique." } },
            { name: "Raideur du coude - Mouvements conservés vont de 110° à 35° (Main Non Dominante)", searchTerms: ["raideur coude mouvements conservés 110° 35° main non dominante", "raideur coude amplitude 110 35 degrés non dominante", "coude mouvements 110 35 non dominante", "raideur coude 110 35"], rate: [6, 8], description: "Raideur articulaire du coude avec conservation d'une amplitude de mouvement de 110° à 35° (selon barème officiel).", rateCriteria: { low: "Amplitude fonctionnelle conservée 110°-35°.", high: "Gêne fonctionnelle malgré amplitude théorique." } },
            { name: "Raideur du coude - Mouvements conservés de 110° à 75° (Main Dominante)", searchTerms: ["raideur coude mouvements conservés 110° 75° main dominante", "raideur coude amplitude 110 75 degrés dominante", "coude mouvements 110 75 dominante", "raideur coude 110 75"], rate: [13, 15], description: "Raideur articulaire du coude avec conservation d'une amplitude de mouvement de 110° à 75° (selon barème officiel).", rateCriteria: { low: "Amplitude conservée 110°-75° avec adaptation.", high: "Limitation fonctionnelle importante." } },
            { name: "Raideur du coude - Mouvements conservés de 110° à 75° (Main Non Dominante)", searchTerms: ["raideur coude mouvements conservés 110° 75° main non dominante", "raideur coude amplitude 110 75 degrés non dominante", "coude mouvements 110 75 non dominante", "raideur coude 110 75"], rate: [10, 12], description: "Raideur articulaire du coude avec conservation d'une amplitude de mouvement de 110° à 75° (selon barème officiel).", rateCriteria: { low: "Amplitude conservée 110°-75° avec adaptation.", high: "Limitation fonctionnelle importante." } },
            { name: "Raideur du coude - Mouvements oscillent de 10° de part et d'autre de l'angle droit (Main Dominante)", searchTerms: ["raideur coude mouvements oscillent 10° part autre angle droit main dominante", "raideur coude oscillation 10 degrés angle droit dominante", "coude mouvements 10 angle droit dominante", "raideur coude oscillent angle droit"], rate: [18, 20], description: "Raideur importante du coude avec amplitude très réduite : les mouvements oscillent seulement de 10° de part et d'autre de l'angle droit (80°-100°).", rateCriteria: { low: "Position à angle droit avec oscillation 10°.", high: "Blocage quasi-complet autour de l'angle droit." } },
            { name: "Raideur du coude - Mouvements oscillent de 10° de part et d'autre de l'angle droit (Main Non Dominante)", searchTerms: ["raideur coude mouvements oscillent 10° part autre angle droit main non dominante", "raideur coude oscillation 10 degrés angle droit non dominante", "coude mouvements 10 angle droit non dominante", "raideur coude oscillent angle droit"], rate: [14, 16], description: "Raideur importante du coude avec amplitude très réduite : les mouvements oscillent seulement de 10° de part et d'autre de l'angle droit (80°-100°).", rateCriteria: { low: "Position à angle droit avec oscillation 10°.", high: "Blocage quasi-complet autour de l'angle droit." } },
            { name: "Raideur du coude - Mouvements vont de 180° à 110° (Main Dominante)", searchTerms: ["raideur coude mouvements 180° 110° main dominante", "raideur coude amplitude 180 110 degrés dominante", "coude mouvements 180 110 dominante", "raideur coude 180 110"], rate: [25, 30], description: "Raideur sévère du coude avec perte de la flexion complète : les mouvements sont limités entre 180° (extension) et 110° seulement.", rateCriteria: { low: "Extension conservée mais flexion très limitée (110°).", high: "Impossibilité de porter la main à la bouche, gêne majeure." } },
            { name: "Raideur du coude - Mouvements vont de 180° à 110° (Main Non Dominante)", searchTerms: ["raideur coude mouvements 180° 110° main non dominante", "raideur coude amplitude 180 110 degrés non dominante", "coude mouvements 180 110 non dominante", "raideur coude 180 110"], rate: [20, 25], description: "Raideur sévère du coude avec perte de la flexion complète : les mouvements sont limités entre 180° (extension) et 110° seulement.", rateCriteria: { low: "Extension conservée mais flexion très limitée (110°).", high: "Impossibilité de porter la main à la bouche, gêne majeure." } },
            
            { name: "Raideur du coude avec douleur", searchTerms: ["raideur coude avec douleur", "douleur avec coude raideur", "raideur coude douleur", "raideur coude", "coude avec"], rate: [12, 20], description: "Raideur articulaire avec composante douloureuse chronique." },
            { name: "Raideur + déficit force coude", searchTerms: ["raideur déficit force coude", "coude force déficit raideur", "raideur déficit", "déficit force", "force coude"], rate: [15, 25], description: "Raideur associée à diminution significative de la force de préhension." },
            { name: "Ankylose du coude en position vicieuse", searchTerms: ["ankylose coude position vicieuse", "vicieuse position coude ankylose", "ankylose coude", "coude position", "position vicieuse"], rate: [30, 45] },
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
            
            // Fractures selon reliquats (barème officiel)
            { name: "Fractures diaphysaires simultanées du cubitus et du radius selon reliquats (Main Dominante)", searchTerms: ["fractures diaphysaires simultanées cubitus radius selon reliquats main dominante", "fracture simultanée cubitus radius main dominante", "fractures diaphysaires cubitus radius dominante", "fractures simultanées avant bras main dominante"], rate: [5, 35], description: "Fractures diaphysaires simultanées des deux os de l'avant-bras selon l'importance des reliquats fonctionnels.", rateCriteria: { low: "Consolidation satisfaisante, reliquats minimes.", high: "Cal vicieux important avec impotence fonctionnelle majeure." } },
            { name: "Fractures diaphysaires simultanées du cubitus et du radius selon reliquats (Main Non Dominante)", searchTerms: ["fractures diaphysaires simultanées cubitus radius selon reliquats main non dominante", "fracture simultanée cubitus radius main non dominante", "fractures diaphysaires cubitus radius non dominante", "fractures simultanées avant bras main non dominante"], rate: [4, 28], description: "Fractures diaphysaires simultanées des deux os de l'avant-bras selon l'importance des reliquats fonctionnels.", rateCriteria: { low: "Consolidation satisfaisante, reliquats minimes.", high: "Cal vicieux important avec impotence fonctionnelle majeure." } },
            { name: "Fracture du corps du radius selon reliquats (Main Dominante)", searchTerms: ["fracture corps radius selon reliquats main dominante", "fracture corps radius dominante", "fracture diaphysaire radius reliquats", "fracture radius selon reliquats"], rate: [3, 20], description: "Fracture du corps du radius selon l'importance des reliquats fonctionnels (prono-supination, fonction des doigts).", rateCriteria: { low: "Consolidation satisfaisante, reliquats fonctionnels minimes.", high: "Cal vicieux avec limitation importante de la prono-supination et troubles fonctionnels." } },
            { name: "Fracture du corps du radius selon reliquats (Main Non Dominante)", searchTerms: ["fracture corps radius selon reliquats main non dominante", "fracture corps radius non dominante", "fracture diaphysaire radius reliquats", "fracture radius selon reliquats"], rate: [2, 15], description: "Fracture du corps du radius selon l'importance des reliquats fonctionnels (prono-supination, fonction des doigts).", rateCriteria: { low: "Consolidation satisfaisante, reliquats fonctionnels minimes.", high: "Cal vicieux avec limitation importante de la prono-supination et troubles fonctionnels." } },
            { name: "Fracture du corps du cubitus selon reliquats (Main Dominante)", searchTerms: ["fracture corps cubitus selon reliquats main dominante", "fracture corps cubitus dominante", "fracture diaphysaire cubitus reliquats", "fracture cubitus selon reliquats"], rate: [3, 18], description: "Fracture du corps du cubitus selon l'importance des reliquats fonctionnels.", rateCriteria: { low: "Consolidation satisfaisante, reliquats fonctionnels minimes.", high: "Cal vicieux avec limitation importante de la prono-supination." } },
            { name: "Fracture du corps du cubitus selon reliquats (Main Non Dominante)", searchTerms: ["fracture corps cubitus selon reliquats main non dominante", "fracture corps cubitus non dominante", "fracture diaphysaire cubitus reliquats", "fracture cubitus selon reliquats"], rate: [2, 14], description: "Fracture du corps du cubitus selon l'importance des reliquats fonctionnels.", rateCriteria: { low: "Consolidation satisfaisante, reliquats fonctionnels minimes.", high: "Cal vicieux avec limitation importante de la prono-supination." } },
            { name: "Fracture de l'extrémité inférieure du radius selon reliquats (Main Dominante)", searchTerms: ["fracture extrémité inférieure radius selon reliquats main dominante", "fracture extrémité inférieure radius dominante", "fracture poignet radius reliquats", "fracture distale radius selon reliquats"], rate: [3, 20], description: "Fracture de l'extrémité inférieure du radius selon l'importance des reliquats fonctionnels (raideur poignet, troubles prono-supination).", rateCriteria: { low: "Consolidation satisfaisante, mobilité conservée.", high: "Cal vicieux avec raideur importante du poignet et limitation de la prono-supination." } },
            { name: "Fracture de l'extrémité inférieure du radius selon reliquats (Main Non Dominante)", searchTerms: ["fracture extrémité inférieure radius selon reliquats main non dominante", "fracture extrémité inférieure radius non dominante", "fracture poignet radius reliquats", "fracture distale radius selon reliquats"], rate: [2, 15], description: "Fracture de l'extrémité inférieure du radius selon l'importance des reliquats fonctionnels (raideur poignet, troubles prono-supination).", rateCriteria: { low: "Consolidation satisfaisante, mobilité conservée.", high: "Cal vicieux avec raideur importante du poignet et limitation de la prono-supination." } },

            // Inflexion latérale ou antéro-postérieure
            { name: "Fracture des deux os de l'avant-bras - Inflexion latérale ou antéro-postérieure avec gêne (Main Dominante)", searchTerms: ["fracture des deux avant bras inflexion latérale gêne main dominante", "fracture avant bras inflexion antéro postérieure dominante", "inflexion latérale avant bras", "déviation avant bras fracture"], rate: [5, 15], description: "Inflexion latérale ou antéro-postérieure de l'avant-bras consécutive à une fracture, avec gêne fonctionnelle.", rateCriteria: { low: "Inflexion modérée, gêne minime.", high: "Inflexion importante avec gêne fonctionnelle significative." } },
            { name: "Fracture des deux os de l'avant-bras - Inflexion latérale ou antéro-postérieure avec gêne (Main Non Dominante)", searchTerms: ["fracture des deux avant bras inflexion latérale gêne main non dominante", "fracture avant bras inflexion antéro postérieure non dominante", "inflexion latérale avant bras", "déviation avant bras fracture"], rate: [4, 12], description: "Inflexion latérale ou antéro-postérieure de l'avant-bras consécutive à une fracture, avec gêne fonctionnelle.", rateCriteria: { low: "Inflexion modérée, gêne minime.", high: "Inflexion importante avec gêne fonctionnelle significative." } },

            // Limitation des mouvements de torsion
            { name: "Avant-bras - Pronation conservée, supination abolie (Main Dominante)", searchTerms: ["avant bras pronation conservée supination abolie main dominante", "pronation conservée supination abolie dominante", "limitation supination avant bras", "supination abolie"], rate: [5, 10], description: "Limitation des mouvements de torsion de l'avant-bras : pronation conservée mais supination abolie.", rateCriteria: { low: "Supination presque abolie avec pronation normale.", high: "Supination totalement abolie." } },
            { name: "Avant-bras - Pronation conservée, supination abolie (Main Non Dominante)", searchTerms: ["avant bras pronation conservée supination abolie main non dominante", "pronation conservée supination abolie non dominante", "limitation supination avant bras", "supination abolie"], rate: [4, 8], description: "Limitation des mouvements de torsion de l'avant-bras : pronation conservée mais supination abolie.", rateCriteria: { low: "Supination presque abolie avec pronation normale.", high: "Supination totalement abolie." } },
            { name: "Avant-bras - Pronation abolie, supination conservée (Main Dominante)", searchTerms: ["avant bras pronation abolie supination conservée main dominante", "pronation abolie supination conservée dominante", "limitation pronation avant bras", "pronation abolie"], rate: [10, 15], description: "Limitation des mouvements de torsion de l'avant-bras : supination conservée mais pronation abolie.", rateCriteria: { low: "Pronation presque abolie avec supination normale.", high: "Pronation totalement abolie." } },
            { name: "Avant-bras - Pronation abolie, supination conservée (Main Non Dominante)", searchTerms: ["avant bras pronation abolie supination conservée main non dominante", "pronation abolie supination conservée non dominante", "limitation pronation avant bras", "pronation abolie"], rate: [8, 12], description: "Limitation des mouvements de torsion de l'avant-bras : supination conservée mais pronation abolie.", rateCriteria: { low: "Pronation presque abolie avec supination normale.", high: "Pronation totalement abolie." } },

            // Suppression complète des mouvements de torsion
            { name: "Avant-bras - Suppression des mouvements de torsion avec immobilisation en demi-pronation (Main Dominante)", searchTerms: ["avant bras suppression mouvements torsion immobilisation demi pronation main dominante", "suppression prono supination demi pronation dominante", "immobilisation demi pronation avant bras", "blocage torsion demi pronation"], rate: [13, 15], description: "Suppression complète des mouvements de torsion (prono-supination) avec immobilisation de l'avant-bras en position de demi-pronation.", rateCriteria: { low: "Immobilisation en demi-pronation avec adaptation fonctionnelle.", high: "Immobilisation en demi-pronation avec gêne fonctionnelle importante." } },
            { name: "Avant-bras - Suppression des mouvements de torsion avec immobilisation en demi-pronation (Main Non Dominante)", searchTerms: ["avant bras suppression mouvements torsion immobilisation demi pronation main non dominante", "suppression prono supination demi pronation non dominante", "immobilisation demi pronation avant bras", "blocage torsion demi pronation"], rate: [10, 12], description: "Suppression complète des mouvements de torsion (prono-supination) avec immobilisation de l'avant-bras en position de demi-pronation.", rateCriteria: { low: "Immobilisation en demi-pronation avec adaptation fonctionnelle.", high: "Immobilisation en demi-pronation avec gêne fonctionnelle importante." } },
            { name: "Avant-bras - Suppression des mouvements de torsion avec immobilisation en pronation complète (Main Dominante)", searchTerms: ["avant bras suppression mouvements torsion immobilisation pronation complète main dominante", "suppression prono supination pronation complète dominante", "immobilisation pronation complète avant bras", "blocage torsion pronation"], rate: [23, 25], description: "Suppression complète des mouvements de torsion (prono-supination) avec immobilisation de l'avant-bras en position de pronation complète.", rateCriteria: { low: "Immobilisation en pronation complète avec adaptation fonctionnelle partielle.", high: "Immobilisation en pronation complète avec gêne fonctionnelle majeure." } },
            { name: "Avant-bras - Suppression des mouvements de torsion avec immobilisation en pronation complète (Main Non Dominante)", searchTerms: ["avant bras suppression mouvements torsion immobilisation pronation complète main non dominante", "suppression prono supination pronation complète non dominante", "immobilisation pronation complète avant bras", "blocage torsion pronation"], rate: [18, 20], description: "Suppression complète des mouvements de torsion (prono-supination) avec immobilisation de l'avant-bras en position de pronation complète.", rateCriteria: { low: "Immobilisation en pronation complète avec adaptation fonctionnelle partielle.", high: "Immobilisation en pronation complète avec gêne fonctionnelle majeure." } },
            { name: "Avant-bras - Suppression des mouvements de torsion avec immobilisation en supination complète (Main Dominante)", searchTerms: ["avant bras suppression mouvements torsion immobilisation supination complète main dominante", "suppression prono supination supination complète dominante", "immobilisation supination complète avant bras", "blocage torsion supination"], rate: [35, 40], description: "Suppression complète des mouvements de torsion (prono-supination) avec immobilisation de l'avant-bras en position de supination complète (position la plus invalidante).", rateCriteria: { low: "Immobilisation en supination complète avec adaptation fonctionnelle partielle.", high: "Immobilisation en supination complète avec impossibilité d'adaptation, gêne majeure dans les actes de la vie quotidienne." } },
            { name: "Avant-bras - Suppression des mouvements de torsion avec immobilisation en supination complète (Main Non Dominante)", searchTerms: ["avant bras suppression mouvements torsion immobilisation supination complète main non dominante", "suppression prono supination supination complète non dominante", "immobilisation supination complète avant bras", "blocage torsion supination"], rate: [28, 32], description: "Suppression complète des mouvements de torsion (prono-supination) avec immobilisation de l'avant-bras en position de supination complète (position la plus invalidante).", rateCriteria: { low: "Immobilisation en supination complète avec adaptation fonctionnelle partielle.", high: "Immobilisation en supination complète avec impossibilité d'adaptation, gêne majeure dans les actes de la vie quotidienne." } },

            // Rétraction ischémique de Volkmann
            { name: "Rétraction ischémique de Volkmann de l'avant-bras (Main Dominante)", searchTerms: ["rétraction ischémique volkmann avant bras main dominante", "syndrome volkmann main dominante", "rétraction volkmann dominante", "ischémie volkmann avant bras"], rate: [40, 60], description: "Rétraction ischémique de Volkmann : syndrome séquellaire grave consécutif à une ischémie musculaire aiguë de l'avant-bras, entraînant une rétraction des fléchisseurs et une impotence fonctionnelle majeure.", rateCriteria: { low: "Rétraction modérée avec conservation partielle de la fonction.", high: "Rétraction sévère avec impotence fonctionnelle majeure, main en griffe." } },
            { name: "Rétraction ischémique de Volkmann de l'avant-bras (Main Non Dominante)", searchTerms: ["rétraction ischémique volkmann avant bras main non dominante", "syndrome volkmann main non dominante", "rétraction volkmann non dominante", "ischémie volkmann avant bras"], rate: [35, 50], description: "Rétraction ischémique de Volkmann : syndrome séquellaire grave consécutif à une ischémie musculaire aiguë de l'avant-bras, entraînant une rétraction des fléchisseurs et une impotence fonctionnelle majeure.", rateCriteria: { low: "Rétraction modérée avec conservation partielle de la fonction.", high: "Rétraction sévère avec impotence fonctionnelle majeure, main en griffe." } },

            { name: "Fracture diaphysaire du radius (Main Dominante)", searchTerms: ["fracture diaphysaire radius main dominante", "dominante main radius diaphysaire fracture", "fracture diaphysaire", "diaphysaire radius", "radius main"], rate: [3, 15], description: "Fracture de la diaphyse radiale. Séquelles selon retentissement sur la prono-supination et la fonction des doigts.", rateCriteria: { low: "Consolidation satisfaisante, limitation minime prono-supination.", high: "Cal vicieux avec limitation importante prono-supination et troubles fonctionnels doigts." } },
            { name: "Fracture diaphysaire du radius (Main Non Dominante)", searchTerms: ["fracture diaphysaire radius main non dominante", "dominante non main radius diaphysaire fracture", "fracture diaphysaire", "diaphysaire radius", "radius main"], rate: [2, 12], description: "Fracture de la diaphyse radiale. Séquelles selon retentissement sur la prono-supination et la fonction des doigts.", rateCriteria: { low: "Consolidation satisfaisante, limitation minime prono-supination.", high: "Cal vicieux avec limitation importante prono-supination et troubles fonctionnels doigts." } },
            { name: "Fracture de l'extrémité supérieure du radius (cupule radiale) (Main Dominante)", searchTerms: ["fracture l'extrémité supérieure radius cupule radiale main dominante", "dominante main radiale cupule radius supérieure l'extrémité fracture", "fracture l'extrémité", "l'extrémité supérieure", "supérieure radius"], rate: [10, 20], description: "Fracture parcellaire de la cupule radiale avec limitation de la prono-supination et gêne de la flexion-extension antibrachiale (arthropathie du coude secondaire à la lésion osseuse).", rateCriteria: { low: "Limitation modérée prono-supination et flexion-extension coude.", high: "Arthropathie sévère avec raideur importante et douleurs." } },
            { name: "Fracture de l'extrémité supérieure du radius (cupule radiale) (Main Non Dominante)", searchTerms: ["fracture l'extrémité supérieure radius cupule radiale main non dominante", "dominante non main radiale cupule radius supérieure l'extrémité fracture", "fracture l'extrémité", "l'extrémité supérieure", "supérieure radius"], rate: [8, 15], description: "Fracture parcellaire de la cupule radiale avec limitation de la prono-supination et gêne de la flexion-extension antibrachiale (arthropathie du coude secondaire à la lésion osseuse).", rateCriteria: { low: "Limitation modérée prono-supination et flexion-extension coude.", high: "Arthropathie sévère avec raideur importante et douleurs." } },
            { name: "Fracture isolée du radius - Avec cal vicieux modéré (Main Dominante)", searchTerms: ["fracture isolée radius avec cal vicieux modéré main dominante", "dominante main modéré vicieux cal avec radius isolée fracture", "fracture isolée radius cal vicieux modéré main dominante", "fracture isolée", "isolée radius"], rate: [6, 10], rateCriteria: { low: "Cal vicieux visible mais limitation légère de la prono-supination (<30%).", high: "Cal vicieux avec limitation modérée (30-50%) et gêne fonctionnelle moyenne." } },
            { name: "Fracture isolée du radius - Avec cal vicieux modéré (Main Non Dominante)", searchTerms: ["fracture isolée radius avec cal vicieux modéré main non dominante", "dominante non main modéré vicieux cal avec radius isolée fracture", "fracture isolée radius cal vicieux modéré main non dominante", "fracture isolée", "isolée radius"], rate: [5, 8], rateCriteria: { low: "Cal vicieux visible mais limitation légère de la prono-supination (<30%).", high: "Cal vicieux avec limitation modérée (30-50%) et gêne fonctionnelle moyenne." } },
            { name: "Fracture diaphysaire du cubitus (2/3 inférieurs) (Main Dominante)", searchTerms: ["fracture diaphysaire cubitus 2/3 inférieurs main dominante", "dominante main inférieurs 2/3 cubitus diaphysaire fracture", "fracture diaphysaire", "diaphysaire cubitus", "cubitus 2/3"], rate: [4, 12], description: "Fracture des deux tiers inférieurs du cubitus avec cal satisfaisant. Gêne modérée de la prono-supination et des doigts, bonne résistance de l'avant-bras.", rateCriteria: { low: "Cal satisfaisant, gêne minime de la prono-supination.", high: "Limitation importante de la prono-supination et fonction des doigts." } },
            { name: "Fracture diaphysaire du cubitus (2/3 inférieurs) (Main Non Dominante)", searchTerms: ["fracture diaphysaire cubitus 2/3 inférieurs main non dominante", "dominante non main inférieurs 2/3 cubitus diaphysaire fracture", "fracture diaphysaire", "diaphysaire cubitus", "cubitus 2/3"], rate: [3, 10], description: "Fracture des deux tiers inférieurs du cubitus avec cal satisfaisant. Gêne modérée de la prono-supination et des doigts.", rateCriteria: { low: "Cal satisfaisant, gêne minime.", high: "Limitation notable de la prono-supination." } },
            { name: "Fracture isolée du cubitus (tiers supérieur) (Main Dominante)", searchTerms: ["fracture isolée cubitus tiers supérieur main dominante", "dominante main supérieur tiers cubitus isolée fracture", "fracture isolée", "isolée cubitus", "cubitus tiers"], rate: [8, 15], description: "Fracture proximale du cubitus (près de l'olécrane). Séquelles fonctionnelles plus importantes que les 2/3 inférieurs avec risque de raideur du coude et limitation marquée de la prono-supination.", rateCriteria: { low: "Cal satisfaisant, limitation modérée du coude et prono-supination.", high: "Raideur importante du coude, limitation sévère de la prono-supination et fonction." } },
            { name: "Fracture isolée du cubitus (tiers supérieur) (Main Non Dominante)", searchTerms: ["fracture isolée cubitus tiers supérieur main non dominante", "dominante non main supérieur tiers cubitus isolée fracture", "fracture isolée", "isolée cubitus", "cubitus tiers"], rate: [6, 12], description: "Fracture proximale du cubitus avec séquelles fonctionnelles plus importantes que les 2/3 inférieurs.", rateCriteria: { low: "Cal satisfaisant, limitation modérée.", high: "Raideur du coude, limitation sévère de la prono-supination." } },
            { name: "Pseudarthrose des deux os de l'avant-bras - serrée (Main Dominante)", searchTerms: ["pseudarthrose des deux l'avant bras serrée main dominante", "pseudarthrose des deux l'avant supérieur serrée main dominante", "dominante main serrée bras l'avant deux des pseudarthrose", "pseudarthrose deux l'avant bras serrée main dominante", "pseudarthrose des"], rate: [10, 20], description: "Pseudarthrose des deux os (radius et cubitus) avec mobilité conservée, consolidation fibreuse serrée." },
            { name: "Pseudarthrose des deux os de l'avant-bras - serrée (Main Non Dominante)", searchTerms: ["pseudarthrose des deux l'avant bras serrée main non dominante", "pseudarthrose des deux l'avant supérieur serrée main non dominante", "dominante non main serrée bras l'avant deux des pseudarthrose", "pseudarthrose deux l'avant bras serrée main non dominante", "pseudarthrose des"], rate: [8, 15], description: "Pseudarthrose des deux os (radius et cubitus) avec mobilité conservée, consolidation fibreuse serrée." },
            { name: "Pseudarthrose des deux os de l'avant-bras - lâche (avant-bras ballant) (Main Dominante)", searchTerms: ["pseudarthrose des deux l'avant bras lâche avant bras ballant main dominante", "pseudarthrose des deux l'avant supérieur lâche avant supérieur ballant main dominante", "dominante main ballant bras avant lâche bras l'avant deux des pseudarthrose", "pseudarthrose deux l'avant bras lâche avant bras ballant main dominante", "pseudarthrose des"], rate: [40, 50], description: "Pseudarthrose double lâche avec avant-bras ballant, perte complète de la stabilité et de la fonction de préhension." },
            { name: "Pseudarthrose des deux os de l'avant-bras - lâche (avant-bras ballant) (Main Non Dominante)", searchTerms: ["pseudarthrose des deux l'avant bras lâche avant bras ballant main non dominante", "pseudarthrose des deux l'avant supérieur lâche avant supérieur ballant main non dominante", "dominante non main ballant bras avant lâche bras l'avant deux des pseudarthrose", "pseudarthrose deux l'avant bras lâche avant bras ballant main non dominante", "pseudarthrose des"], rate: [30, 40], description: "Pseudarthrose double lâche avec avant-bras ballant, perte majeure de stabilité et fonction." },
            { name: "Pseudarthrose du radius - serrée (Main Dominante)", searchTerms: ["pseudarthrose radius serrée main dominante", "dominante main serrée radius pseudarthrose", "pseudarthrose radius", "radius serrée", "serrée main"], rate: [8, 10], description: "Pseudarthrose radiale isolée serrée avec conservation partielle de la prono-supination." },
            { name: "Pseudarthrose du radius - serrée (Main Non Dominante)", searchTerms: ["pseudarthrose radius serrée main non dominante", "dominante non main serrée radius pseudarthrose", "pseudarthrose radius", "radius serrée", "serrée main"], rate: [6, 8], description: "Pseudarthrose radiale isolée serrée avec conservation partielle de la prono-supination." },
            { name: "Pseudarthrose du radius - lâche (Main Dominante)", searchTerms: ["pseudarthrose radius lâche main dominante", "dominante main lâche radius pseudarthrose", "pseudarthrose radius", "radius lâche", "lâche main"], rate: [30, 40], description: "Pseudarthrose radiale isolée lâche avec perte majeure de la prono-supination et instabilité importante." },
            { name: "Pseudarthrose du radius - lâche (Main Non Dominante)", searchTerms: ["pseudarthrose radius lâche main non dominante", "dominante non main lâche radius pseudarthrose", "pseudarthrose radius", "radius lâche", "lâche main"], rate: [25, 30], description: "Pseudarthrose radiale isolée lâche avec perte importante de la prono-supination." },
            { name: "Pseudarthrose du cubitus - serrée (Main Dominante)", searchTerms: ["pseudarthrose cubitus serrée main dominante", "dominante main serrée cubitus pseudarthrose", "pseudarthrose cubitus", "cubitus serrée", "serrée main"], rate: [4, 5], description: "Pseudarthrose cubitale isolée serrée avec limitation modérée de la fonction." },
            { name: "Pseudarthrose du cubitus - serrée (Main Non Dominante)", searchTerms: ["pseudarthrose cubitus serrée main non dominante", "dominante non main serrée cubitus pseudarthrose", "pseudarthrose cubitus", "cubitus serrée", "serrée main"], rate: [3, 4], description: "Pseudarthrose cubitale isolée serrée avec limitation modérée de la fonction." },
            { name: "Pseudarthrose du cubitus - lâche (Main Dominante)", searchTerms: ["pseudarthrose cubitus lâche main dominante", "dominante main lâche cubitus pseudarthrose", "pseudarthrose cubitus", "cubitus lâche", "lâche main"], rate: [25, 30], description: "Pseudarthrose cubitale isolée lâche avec instabilité et limitation fonctionnelle importante." },
            { name: "Pseudarthrose du cubitus - lâche (Main Non Dominante)", searchTerms: ["pseudarthrose cubitus lâche main non dominante", "dominante non main lâche cubitus pseudarthrose", "pseudarthrose cubitus", "cubitus lâche", "lâche main"], rate: [15, 20], description: "Pseudarthrose cubitale isolée lâche avec instabilité et limitation fonctionnelle." },
            { name: "Séquelles de fracture-luxation de Monteggia (Main Dominante)", searchTerms: ["séquelles fracture luxation monteggia main dominante", "dominante main monteggia luxation fracture séquelles", "séquelles fracture", "fracture luxation", "luxation monteggia"], rate: [15, 30], rateCriteria: { low: "Consolidation sans limitation majeure.", high: "Raideur et instabilité du coude, limitation prono-supination." }, description: "Fracture du tiers proximal du cubitus avec luxation antérieure de la tête radiale.", imageUrl: "/images/medical/fracture-luxation de Monteggia.jpg", clinicalTip: "L'image montre la lésion caractéristique de Monteggia : fracture diaphysaire cubitale proximale avec luxation antérieure de la tête radiale (flèche rouge). Examiner : palpation tête radiale (saillie antérieure), mobilité coude (flexion-extension), prono-supination (souvent limitée), test instabilité radiale, recherche atteinte nerf radial (interosseux postérieur : déficit extension pouce/doigts), déformation cubitale résiduelle. Radiographies coude + avant-bras complètes obligatoires. Classification Bado (type I-IV) pour pronostic." },
            { name: "Séquelles de fracture-luxation de Monteggia (Main Non Dominante)", searchTerms: ["séquelles fracture luxation monteggia main non dominante", "dominante non main monteggia luxation fracture séquelles", "séquelles fracture", "fracture luxation", "luxation monteggia"], rate: [10, 25], rateCriteria: { low: "Consolidation sans limitation majeure.", high: "Raideur et instabilité." }, description: "Fracture du tiers proximal du cubitus avec luxation antérieure de la tête radiale.", imageUrl: "/images/medical/fracture-luxation de Monteggia.jpg", clinicalTip: "L'image montre la lésion caractéristique de Monteggia : fracture diaphysaire cubitale proximale avec luxation antérieure de la tête radiale (flèche rouge). Examiner : palpation tête radiale (saillie antérieure), mobilité coude (flexion-extension), prono-supination (souvent limitée), test instabilité radiale, recherche atteinte nerf radial (interosseux postérieur : déficit extension pouce/doigts), déformation cubitale résiduelle. Radiographies coude + avant-bras complètes obligatoires. Classification Bado (type I-IV) pour pronostic." },
            { name: "Séquelles de fracture-luxation de Galeazzi (Main Dominante)", searchTerms: ["séquelles fracture luxation galeazzi main dominante", "dominante main galeazzi luxation fracture séquelles", "séquelles fracture", "fracture luxation", "luxation galeazzi"], rate: [10, 25], rateCriteria: { low: "Consolidation sans limitation majeure.", high: "Limitation prono-supination, instabilité radio-cubitale." } },
            { name: "Séquelles de fracture-luxation de Galeazzi (Main Non Dominante)", searchTerms: ["séquelles fracture luxation galeazzi main non dominante", "dominante non main galeazzi luxation fracture séquelles", "séquelles fracture", "fracture luxation", "luxation galeazzi"], rate: [8, 20], rateCriteria: { low: "Consolidation sans limitation majeure.", high: "Limitation et instabilité." } },
            { name: "Synostose radio-cubitale post-traumatique (Main Dominante)", searchTerms: ["synostose radio cubitale post traumatique main dominante", "dominante main traumatique post cubitale radio synostose", "synostose radio", "radio cubitale", "cubitale post"], rate: [15, 25], description: "Fusion osseuse anormale entre le radius et le cubitus, bloquant la prono-supination.", rateCriteria: { low: "Blocage en position neutre ou de fonction.", high: "Blocage en pronation complète." } },
            { name: "Synostose radio-cubitale post-traumatique (Main Non Dominante)", searchTerms: ["synostose radio cubitale post traumatique main non dominante", "dominante non main traumatique post cubitale radio synostose", "synostose radio", "radio cubitale", "cubitale post"], rate: [12, 20], rateCriteria: { low: "Blocage en position neutre.", high: "Blocage en pronation complète." } },
        ]
      },
      {
        name: "Poignet - Désarticulation",
        injuries: [
          { name: "Désarticulation du poignet (Main Dominante)", searchTerms: ["désarticulation poignet main dominante", "dominante main poignet désarticulation", "désarticulation poignet", "poignet main", "main dominante"], rate: 70, description: "Désarticulation radio-carpienne = perte totale de la main au niveau du poignet." },
          { name: "Désarticulation du poignet (Main Non Dominante)", searchTerms: ["désarticulation poignet main non dominante", "dominante non main poignet désarticulation", "désarticulation poignet", "poignet main", "main non"], rate: 60, description: "Désarticulation radio-carpienne = perte totale de la main au niveau du poignet." },
        ]
      },
      {
        name: "Poignet - Fractures",
        injuries: [
            { name: "Fracture de l'extrémité inférieure du radius - Séquelles légères (Main Dominante)", searchTerms: ["fracture l'extrémité inférieure radius séquelles légères main dominante", "dominante main légères séquelles radius inférieure l'extrémité fracture", "fracture l'extrémité", "l'extrémité inférieure", "inférieure radius"], rate: [5, 10], description: "Peu de gêne de la torsion et de la flexion-extension du poignet.", rateCriteria: { low: "Gêne minime, amplitude presque normale.", high: "Légère limitation fonctionnelle." } },
            { name: "Fracture de l'extrémité inférieure du radius - Séquelles légères (Main Non Dominante)", searchTerms: ["fracture l'extrémité inférieure radius séquelles légères main non dominante", "dominante non main légères séquelles radius inférieure l'extrémité fracture", "fracture l'extrémité", "l'extrémité inférieure", "inférieure radius"], rate: [4, 8], description: "Peu de gêne de la torsion et de la flexion-extension du poignet.", rateCriteria: { low: "Gêne minime, amplitude presque normale.", high: "Légère limitation fonctionnelle." } },
            { name: "Fracture de la styloïde cubitale (Main Dominante)", searchTerms: ["fracture styloïde cubitale main dominante", "dominante main cubitale styloïde fracture", "fracture styloïde", "styloïde cubitale", "cubitale main"], rate: 3, description: "Fracture de l'apophyse styloïde du cubitus (ulna) au poignet." },
            { name: "Fracture de la styloïde cubitale (Main Non Dominante)", searchTerms: ["fracture styloïde cubitale main non dominante", "dominante non main cubitale styloïde fracture", "fracture styloïde", "styloïde cubitale", "cubitale main"], rate: 2, description: "Fracture de l'apophyse styloïde du cubitus (ulna) au poignet." },
            { name: "Fracture de la styloïde radiale (Main Dominante)", searchTerms: ["fracture styloïde radiale main dominante", "dominante main radiale styloïde fracture", "fracture styloïde", "styloïde radiale", "radiale main"], rate: [0, 5], description: "Fracture de l'apophyse styloïde du radius au poignet. Légère gêne douloureuse du poignet.", rateCriteria: { low: "Consolidation parfaite, asymptomatique.", high: "Douleurs résiduelles, légère gêne fonctionnelle." } },
            { name: "Fracture de la styloïde radiale (Main Non Dominante)", searchTerms: ["fracture styloïde radiale main non dominante", "dominante non main radiale styloïde fracture", "fracture styloïde", "styloïde radiale", "radiale main"], rate: [0, 4], description: "Fracture de l'apophyse styloïde du radius au poignet. Légère gêne douloureuse du poignet.", rateCriteria: { low: "Consolidation parfaite, asymptomatique.", high: "Douleurs résiduelles, légère gêne fonctionnelle." } },
            { name: "Fracture de l'extrémité inférieure du radius - Séquelles moyennes (Main Dominante)", searchTerms: ["fracture l'extrémité inférieure radius séquelles moyennes main dominante", "dominante main moyennes séquelles radius inférieure l'extrémité fracture", "fracture l'extrémité", "l'extrémité inférieure", "inférieure radius"], rate: [15, 20], description: "Limitation de moitié de la torsion et de la flexion. Perte de force du membre supérieur.", rateCriteria: { low: "Limitation modérée avec compensation possible.", high: "Limitation importante avec perte de force significative." } },
            { name: "Fracture de l'extrémité inférieure du radius - Séquelles moyennes (Main Non Dominante)", searchTerms: ["fracture l'extrémité inférieure radius séquelles moyennes main non dominante", "dominante non main moyennes séquelles radius inférieure l'extrémité fracture", "fracture l'extrémité", "l'extrémité inférieure", "inférieure radius"], rate: [12, 16], description: "Limitation de moitié de la torsion et de la flexion. Perte de force du membre supérieur.", rateCriteria: { low: "Limitation modérée avec compensation possible.", high: "Limitation importante avec perte de force significative." } },
            { name: "Fracture de l'extrémité inférieure du radius - Séquelles graves (Main Dominante)", searchTerms: ["fracture l'extrémité inférieure radius séquelles graves main dominante", "dominante main graves séquelles radius inférieure l'extrémité fracture", "fracture l'extrémité", "l'extrémité inférieure", "inférieure radius"], rate: [20, 30], description: "Grosse déformation. Limitation importante des mouvements du poignet. Amyotrophie. Limitation des mouvements des doigts.", rateCriteria: { low: "Déformation visible avec limitation majeure.", high: "Déformation sévère, amyotrophie, troubles nerveux et limitation doigts." } },
            { name: "Fracture de l'extrémité inférieure du radius - Séquelles graves (Main Non Dominante)", searchTerms: ["fracture l'extrémité inférieure radius séquelles graves main non dominante", "dominante non main graves séquelles radius inférieure l'extrémité fracture", "fracture l'extrémité", "l'extrémité inférieure", "inférieure radius"], rate: [18, 25], description: "Grosse déformation. Limitation importante des mouvements du poignet. Amyotrophie. Limitation des mouvements des doigts.", rateCriteria: { low: "Déformation visible avec limitation majeure.", high: "Déformation sévère, amyotrophie, troubles nerveux et limitation doigts." } },
            { name: "Fracture de l'extrémité inférieure du radius - Avec cal vicieux", searchTerms: ["fracture l'extrémité inférieure radius avec cal vicieux", "vicieux cal avec radius inférieure l'extrémité fracture", "fracture l'extrémité inférieure radius cal vicieux", "fracture l'extrémité", "l'extrémité inférieure"], rate: [10, 18] },
            { name: "Luxation-fracture du semi-lunaire (Main Dominante)", searchTerms: ["luxation fracture semi lunaire main dominante", "dominante main lunaire semi fracture luxation", "luxation fracture", "fracture semi", "semi lunaire"], rate: [8, 20], description: "Fracture-luxation combinée du semi-lunaire (lunatum) avec séquelles variables selon gravité. Évolution possible vers lunarité (nécrose aseptique).", rateCriteria: { low: "Forme légère avec raideurs modérées.", medium: "Forme moyenne avec douleurs et limitation.", high: "Forme grave avec raideurs importantes et douleurs chroniques." } },
            { name: "Luxation-fracture du semi-lunaire (Main Non Dominante)", searchTerms: ["luxation fracture semi lunaire main non dominante", "dominante non main lunaire semi fracture luxation", "luxation fracture", "fracture semi", "semi lunaire"], rate: [6, 15], description: "Fracture-luxation combinée du semi-lunaire (lunatum) avec séquelles variables selon gravité.", rateCriteria: { low: "Forme légère.", medium: "Forme moyenne.", high: "Forme grave." } },
            { name: "Fracture du scaphoïde carpien (Main Dominante)", searchTerms: ["fracture scaphoïde carpien main dominante", "dominante main carpien scaphoïde fracture", "fracture scaphoïde", "scaphoïde carpien", "carpien main"], rate: [6, 20], description: "Fracture du scaphoïde carpien avec séquelles variables. Évaluation globale selon raideurs, douleurs et retentissement fonctionnel.", rateCriteria: { low: "Forme légère : raideurs insignifiantes, douleurs légères.", medium: "Forme moyenne : douleurs modérées, faible limitation.", high: "Forme grave : raideur, douleurs accentuées, gêne fonctionnelle du pouce." } },
            { name: "Fracture du scaphoïde carpien (Main Non Dominante)", searchTerms: ["fracture scaphoïde carpien main non dominante", "dominante non main carpien scaphoïde fracture", "fracture scaphoïde", "scaphoïde carpien", "carpien main"], rate: [5, 15], description: "Fracture du scaphoïde carpien avec séquelles variables.", rateCriteria: { low: "Forme légère.", medium: "Forme moyenne.", high: "Forme grave." } },
            { name: "Fracture du scaphoïde carpien - Forme légère avec raideurs insignifiantes (Main Dominante)", searchTerms: ["fracture scaphoïde carpien forme légère avec raideurs insignifiantes main dominante", "dominante main insignifiantes raideurs avec légère forme carpien scaphoïde fracture", "fracture scaphoïde carpien forme légère raideurs insignifiantes main dominante", "fracture scaphoïde", "scaphoïde carpien"], rate: 6, description: "Raideurs insignifiantes, douleurs légères." },
            { name: "Fracture du scaphoïde carpien - Forme légère avec raideurs insignifiantes (Main Non Dominante)", searchTerms: ["fracture scaphoïde carpien forme légère avec raideurs insignifiantes main non dominante", "dominante non main insignifiantes raideurs avec légère forme carpien scaphoïde fracture", "fracture scaphoïde carpien forme légère raideurs insignifiantes main non dominante", "fracture scaphoïde", "scaphoïde carpien"], rate: 5, description: "Raideurs insignifiantes, douleurs légères." },
            { name: "Fracture du scaphoïde carpien - Forme moyenne (Main Dominante)", searchTerms: ["fracture scaphoïde carpien forme moyenne main dominante", "dominante main moyenne forme carpien scaphoïde fracture", "fracture scaphoïde", "scaphoïde carpien", "carpien forme"], rate: 15, description: "Douleurs modérées, faible limitation des mouvements du poignet." },
            { name: "Fracture du scaphoïde carpien - Forme moyenne (Main Non Dominante)", searchTerms: ["fracture scaphoïde carpien forme moyenne main non dominante", "dominante non main moyenne forme carpien scaphoïde fracture", "fracture scaphoïde", "scaphoïde carpien", "carpien forme"], rate: 10, description: "Douleurs modérées, faible limitation des mouvements du poignet." },
            { name: "Fracture du scaphoïde carpien - Forme grave (Main Dominante)", searchTerms: ["fracture scaphoïde carpien forme grave main dominante", "dominante main grave forme carpien scaphoïde fracture", "fracture scaphoïde", "scaphoïde carpien", "carpien forme"], rate: [20, 25], description: "Avec raideur, douleurs plus accentuées, gêne fonctionnelle du pouce." },
            { name: "Fracture du scaphoïde carpien - Forme grave (Main Non Dominante)", searchTerms: ["fracture scaphoïde carpien forme grave main non dominante", "dominante non main grave forme carpien scaphoïde fracture", "fracture scaphoïde", "scaphoïde carpien", "carpien forme"], rate: [15, 20], description: "Avec raideur, douleurs plus accentuées, gêne fonctionnelle du pouce." },
            { name: "Luxation du lunaire - Forme légère, réduite, séquelles légères (Main Dominante)", searchTerms: ["luxation lunaire forme légère, réduite, séquelles légères main dominante", "dominante main légères séquelles réduite, légère, forme lunaire luxation", "luxation lunaire", "lunaire forme", "forme légère,"], rate: 15, description: "Fracture et/ou luxation du semi-lunaire (lunatum) traitée par réduction. Forme peu grave avec séquelles légères. Évolution possible vers lunarité (nécrose aseptique) : raideurs et douleurs modérées." },
            { name: "Luxation du lunaire - Forme légère, réduite, séquelles légères (Main Non Dominante)", searchTerms: ["luxation lunaire forme légère, réduite, séquelles légères main non dominante", "dominante non main légères séquelles réduite, légère, forme lunaire luxation", "luxation lunaire", "lunaire forme", "forme légère,"], rate: 8, description: "Fracture et/ou luxation du semi-lunaire (lunatum) traitée par réduction. Forme peu grave avec séquelles légères. Évolution possible vers lunarité (nécrose aseptique) : raideurs et douleurs modérées." },
            { name: "Luxation du lunaire - Forme moyenne, gêne de l'enroulement des doigts (Main Dominante)", searchTerms: ["luxation lunaire forme moyenne, gêne l'enroulement des doigts main dominante", "dominante main doigts des l'enroulement gêne moyenne, forme lunaire luxation", "luxation lunaire forme moyenne, gêne l'enroulement doigts main dominante", "luxation lunaire", "lunaire forme"], rate: 20, description: "Luxation du semi-lunaire avec gêne fonctionnelle de l'enroulement des doigts. Raideur du poignet et douleurs. Traitement par réposition ou extirpation de l'os." },
            { name: "Luxation du lunaire - Forme moyenne, gêne de l'enroulement des doigts (Main Non Dominante)", searchTerms: ["luxation lunaire forme moyenne, gêne l'enroulement des doigts main non dominante", "dominante non main doigts des l'enroulement gêne moyenne, forme lunaire luxation", "luxation lunaire forme moyenne, gêne l'enroulement doigts main non dominante", "luxation lunaire", "lunaire forme"], rate: 15, description: "Luxation du semi-lunaire avec gêne fonctionnelle de l'enroulement des doigts. Raideur du poignet et douleurs. Traitement par réposition ou extirpation de l'os." },
            { name: "Luxation du lunaire - Forme grave, non réduite, troubles nerveux (Main Dominante)", searchTerms: ["luxation lunaire forme grave, non réduite, troubles nerveux main dominante", "luxation lunaire forme grave, non réduite, troubles nerf main dominante", "dominante main nerveux troubles réduite, non grave, forme lunaire luxation", "luxation lunaire", "lunaire forme"], rate: 30, description: "Luxation du semi-lunaire non réduite avec blocage du poignet et compression fréquente du nerf médian. Troubles nerveux sensitifs et/ou moteurs. Séquelles fonctionnelles majeures." },
            { name: "Luxation du lunaire - Forme grave, non réduite, troubles nerveux (Main Non Dominante)", searchTerms: ["luxation lunaire forme grave, non réduite, troubles nerveux main non dominante", "luxation lunaire forme grave, non réduite, troubles nerf main non dominante", "dominante non main nerveux troubles réduite, non grave, forme lunaire luxation", "luxation lunaire", "lunaire forme"], rate: 25, description: "Luxation du semi-lunaire non réduite avec blocage du poignet et compression fréquente du nerf médian. Troubles nerveux sensitifs et/ou moteurs. Séquelles fonctionnelles majeures." },
            { name: "Luxation du semi-lunaire et du grand os (Main Dominante)", searchTerms: ["luxation semi lunaire grand main dominante", "dominante main grand lunaire semi luxation", "luxation semi", "semi lunaire", "lunaire grand"], rate: [20, 25], description: "Luxation combinée du semi-lunaire (lunatum) et du grand os (capitatum) avec séquelles importantes. Double instabilité carpienne avec blocage fréquent du poignet, douleurs et limitation fonctionnelle majeure.", rateCriteria: { low: "Raideur modérée, douleurs intermittentes.", high: "Blocage important, douleurs chroniques, instabilité sévère." } },
            { name: "Luxation du semi-lunaire et du grand os (Main Non Dominante)", searchTerms: ["luxation semi lunaire grand main non dominante", "dominante non main grand lunaire semi luxation", "luxation semi", "semi lunaire", "lunaire grand"], rate: [15, 25], description: "Luxation combinée du semi-lunaire et du grand os avec séquelles importantes.", rateCriteria: { low: "Raideur modérée.", high: "Blocage important, douleurs chroniques." } },
            { name: "Ostéoporose post-traumatique du poignet (Main Dominante)", searchTerms: ["ostéoporose post traumatique poignet main dominante", "dominante main poignet traumatique post ostéoporose", "ostéoporose post", "post traumatique", "traumatique poignet"], rate: [10, 25], description: "Déminéralisation osseuse post-traumatique (algodystrophie) avec troubles trophiques et douleurs chroniques." },
            { name: "Ostéoporose post-traumatique du poignet (Main Non Dominante)", searchTerms: ["ostéoporose post traumatique poignet main non dominante", "dominante non main poignet traumatique post ostéoporose", "ostéoporose post", "post traumatique", "traumatique poignet"], rate: [8, 20], description: "Déminéralisation osseuse post-traumatique avec séquelles fonctionnelles." },
            { name: "Pseudarthrose du scaphoïde carpien (Main Dominante)", searchTerms: ["pseudarthrose scaphoïde carpien main dominante", "dominante main carpien scaphoïde pseudarthrose", "pseudarthrose scaphoïde", "scaphoïde carpien", "carpien main"], rate: [10, 20], rateCriteria: { low: "Serrée, peu douloureuse.", high: "Lâche, douloureuse, arthrose radio-carpienne." } },
            { name: "Pseudarthrose du scaphoïde carpien (Main Non Dominante)", searchTerms: ["pseudarthrose scaphoïde carpien main non dominante", "dominante non main carpien scaphoïde pseudarthrose", "pseudarthrose scaphoïde", "scaphoïde carpien", "carpien main"], rate: [8, 15], rateCriteria: { low: "Serrée.", high: "Lâche et douloureuse." } },
            { name: "Poignet ballant après appareillage (Main Dominante)", searchTerms: ["poignet ballant après appareillage main dominante", "dominante main appareillage après ballant poignet", "poignet ballant", "ballant après", "après appareillage"], rate: 40, description: "Poignet ballant susceptible d'amélioration par appareillage orthopédique. Taux d'IPP après mise en place et adaptation de l'appareillage. L'appareillage permet une stabilisation partielle et une amélioration fonctionnelle." },
            { name: "Poignet ballant après appareillage (Main Non Dominante)", searchTerms: ["poignet ballant après appareillage main non dominante", "dominante non main appareillage après ballant poignet", "poignet ballant", "ballant après", "après appareillage"], rate: 35, description: "Poignet ballant après mise en place d'un appareillage orthopédique. Taux d'IPP résiduel avec compensation par l'appareillage." },
            { name: "Poignet ballant suite résection ou perte de substance du carpe (Main Dominante)", searchTerms: ["poignet ballant suite résection perte substance carpe main dominante", "poignet ballant suite résection amputation substance carpe main dominante", "dominante main carpe substance perte résection suite ballant poignet", "poignet ballant", "ballant suite"], rate: [35, 45], description: "Instabilité majeure du poignet consécutive à une large résection chirurgicale ou une grande perte de substance traumatique du carpe. Pseudarthrose avec mobilité anormale, instabilité sévère compromettant la fonction de préhension. Susceptible d'amélioration par appareillage orthopédique.", rateCriteria: { low: "Instabilité modérée, compensation partielle, appareillage efficace.", medium: "Instabilité importante, gêne fonctionnelle majeure.", high: "Instabilité sévère avec douleurs chroniques, perte quasi-totale de la stabilité du poignet." } },
            { name: "Poignet ballant suite résection ou perte de substance du carpe (Main Non Dominante)", searchTerms: ["poignet ballant suite résection perte substance carpe main non dominante", "poignet ballant suite résection amputation substance carpe main non dominante", "dominante non main carpe substance perte résection suite ballant poignet", "poignet ballant", "ballant suite"], rate: [30, 40], description: "Instabilité majeure du poignet consécutive à une large résection chirurgicale ou une grande perte de substance traumatique du carpe. Pseudarthrose avec mobilité anormale, instabilité sévère compromettant la fonction de préhension. Susceptible d'amélioration par appareillage orthopédique.", rateCriteria: { low: "Instabilité modérée, compensation partielle, appareillage efficace.", medium: "Instabilité importante, gêne fonctionnelle majeure.", high: "Instabilité sévère avec douleurs chroniques, perte quasi-totale de la stabilité du poignet." } },
        ]
      },
      {
        name: "Poignet - Raideurs et Ankyloses",
        injuries: [
            // RAIDEURS ARTICULAIRES SIMPLES
            { name: "Raideur légère du poignet en position favorable (rectitude) (Main Dominante)", searchTerms: ["raideur légère poignet position favorable rectitude main dominante", "dominante main rectitude favorable position poignet légère raideur", "raideur légère", "légère poignet", "poignet position"], rate: 5, description: "Raideur légère avec mouvements conservés en position rectiligne favorable. Limitation minime de la flexion-extension." },
            { name: "Raideur légère du poignet en position favorable (rectitude) (Main Non Dominante)", searchTerms: ["raideur légère poignet position favorable rectitude main non dominante", "dominante non main rectitude favorable position poignet légère raideur", "raideur légère", "légère poignet", "poignet position"], rate: 4, description: "Raideur légère avec mouvements conservés en position rectiligne favorable. Limitation minime de la flexion-extension." },
            
            { name: "Raideur de l'extension et de la flexion du poignet (Main Dominante)", searchTerms: ["raideur l'extension flexion poignet main dominante", "dominante main poignet flexion l'extension raideur", "raideur l'extension", "l'extension flexion", "flexion poignet"], rate: [5, 8], description: "Limitation isolée des mouvements de flexion-extension du poignet. Pro-supination préservée.", rateCriteria: { low: "Limitation modérée < 50%.", high: "Limitation importante > 50%." } },
            { name: "Raideur de l'extension et de la flexion du poignet (Main Non Dominante)", searchTerms: ["raideur l'extension flexion poignet main non dominante", "dominante non main poignet flexion l'extension raideur", "raideur l'extension", "l'extension flexion", "flexion poignet"], rate: [4, 6], description: "Limitation isolée des mouvements de flexion-extension du poignet. Pro-supination préservée.", rateCriteria: { low: "Limitation modérée < 50%.", high: "Limitation importante > 50%." } },
            
            { name: "Raideur de la pronation et de la supination (Main Dominante)", searchTerms: ["raideur pronation supination main dominante", "dominante main supination pronation raideur", "raideur pronation", "pronation supination", "supination main"], rate: [5, 10], description: "Limitation isolée de la rotation de l'avant-bras (pronation-supination). Flexion-extension du poignet préservée.", rateCriteria: { low: "Limitation modérée < 50%.", high: "Limitation importante > 50%." } },
            { name: "Raideur de la pronation et de la supination (Main Non Dominante)", searchTerms: ["raideur pronation supination main non dominante", "dominante non main supination pronation raideur", "raideur pronation", "pronation supination", "supination main"], rate: [4, 8], description: "Limitation isolée de la rotation de l'avant-bras (pronation-supination). Flexion-extension du poignet préservée.", rateCriteria: { low: "Limitation modérée < 50%.", high: "Limitation importante > 50%." } },
            
            { name: "Raideurs combinées du poignet (flexion-extension + pronation-supination) (Main Dominante)", searchTerms: ["raideurs combinées poignet flexion extension pronation supination main dominante", "dominante main supination pronation extension flexion poignet combinées raideurs", "raideurs combinées", "combinées poignet", "poignet flexion"], rate: [10, 20], description: "Limitation combinée des mouvements du poignet ET de la rotation de l'avant-bras. Retentissement fonctionnel important.", rateCriteria: { low: "Limitations modérées combinées.", medium: "Limitations importantes combinées.", high: "Quasi-ankylose avec mouvements très réduits." } },
            { name: "Raideurs combinées du poignet (flexion-extension + pronation-supination) (Main Non Dominante)", searchTerms: ["raideurs combinées poignet flexion extension pronation supination main non dominante", "dominante non main supination pronation extension flexion poignet combinées raideurs", "raideurs combinées", "combinées poignet", "poignet flexion"], rate: [8, 15], description: "Limitation combinée des mouvements du poignet ET de la rotation de l'avant-bras. Retentissement fonctionnel important.", rateCriteria: { low: "Limitations modérées combinées.", medium: "Limitations importantes combinées.", high: "Quasi-ankylose avec mouvements très réduits." } },

            // RAIDEURS SERRÉES
            { name: "Raideur serrée du poignet en extension (Main Dominante)", searchTerms: ["raideur serrée poignet extension main dominante", "dominante main extension poignet serrée raideur", "raideur serrée", "serrée poignet", "poignet extension"], rate: 10, description: "Raideur serrée avec poignet bloqué en extension. Limitation majeure de la flexion palmaire." },
            { name: "Raideur serrée du poignet en extension (Main Non Dominante)", searchTerms: ["raideur serrée poignet extension main non dominante", "dominante non main extension poignet serrée raideur", "raideur serrée", "serrée poignet", "poignet extension"], rate: 8, description: "Raideur serrée avec poignet bloqué en extension. Limitation majeure de la flexion palmaire." },
            { name: "Raideur serrée du poignet en flexion forcée (Main Dominante)", searchTerms: ["raideur serrée poignet flexion forcée main dominante", "dominante main forcée flexion poignet serrée raideur", "raideur serrée", "serrée poignet", "poignet flexion"], rate: 20, description: "Raideur serrée avec poignet bloqué en flexion palmaire forcée. Position très défavorable, retentissement fonctionnel majeur sur la préhension." },
            { name: "Raideur serrée du poignet en flexion forcée (Main Non Dominante)", searchTerms: ["raideur serrée poignet flexion forcée main non dominante", "dominante non main forcée flexion poignet serrée raideur", "raideur serrée", "serrée poignet", "poignet flexion"], rate: 16, description: "Raideur serrée avec poignet bloqué en flexion palmaire forcée. Position très défavorable." },

            // ame: "Raideurs combinées du poignet (flexion-extension + pronation-supination) (Main Non Dominante)", rate: [8, 15], description: "Limitation combinée des mouvements du poignet ET de la rotation de l'avant-bras. Retentissement fonctionnel important.", rateCriteria: { low: "Limitations modérées combinées.", medium: "Limitations importantes combinées.", high: "Quasi-ankylose avec mouvements très réduits." } },

            // ANKYLOSES COMPLÈTES - Position extension
            { name: "Ankylose du poignet - En extension et demi-pronation, doigts mobiles (Main Dominante)", searchTerms: ["ankylose poignet extension demi pronation, doigts mobiles main dominante", "dominante main mobiles doigts pronation, demi extension poignet ankylose", "ankylose poignet", "poignet extension", "extension demi"], rate: [18, 20], description: "Ankylose complète en extension (30°) avec avant-bras en demi-pronation (pouce en dessus). Position de fonction optimale, doigts conservant leur mobilité. Barème officiel 1939.", rateCriteria: { low: "Position de fonction idéale, doigts parfaitement mobiles.", high: "Position légèrement sous-optimale ou mobilité digitale partiellement limitée." } },
            { name: "Ankylose du poignet - En extension et demi-pronation, doigts mobiles (Main Non Dominante)", searchTerms: ["ankylose poignet extension demi pronation, doigts mobiles main non dominante", "dominante non main mobiles doigts pronation, demi extension poignet ankylose", "ankylose poignet", "poignet extension", "extension demi"], rate: [13, 15], description: "Ankylose complète en extension (30°) avec avant-bras en demi-pronation (pouce en dessus). Position de fonction optimale, doigts conservant leur mobilité. Barème officiel 1939.", rateCriteria: { low: "Position de fonction idéale, doigts parfaitement mobiles.", high: "Position légèrement sous-optimale ou mobilité digitale partiellement limitée." } },
            
            { name: "Ankylose du poignet - En extension et pronation complète, doigts mobiles (Main Dominante)", searchTerms: ["ankylose poignet extension pronation complète, doigts mobiles main dominante", "dominante main mobiles doigts complète, pronation extension poignet ankylose", "ankylose poignet", "poignet extension", "extension pronation"], rate: [23, 25], description: "Ankylose en extension avec pronation complète de l'avant-bras. Doigts conservant leur mobilité complète. Retentissement fonctionnel plus important que demi-pronation.", rateCriteria: { low: "Doigts parfaitement mobiles, compensation partielle.", high: "Mobilité digitale légèrement limitée." } },
            { name: "Ankylose du poignet - En extension et pronation complète, doigts mobiles (Main Non Dominante)", searchTerms: ["ankylose poignet extension pronation complète, doigts mobiles main non dominante", "dominante non main mobiles doigts complète, pronation extension poignet ankylose", "ankylose poignet", "poignet extension", "extension pronation"], rate: [18, 20], description: "Ankylose en extension avec pronation complète de l'avant-bras. Doigts conservant leur mobilité complète. Retentissement fonctionnel plus important que demi-pronation.", rateCriteria: { low: "Doigts parfaitement mobiles, compensation partielle.", high: "Mobilité digitale légèrement limitée." } },
            
            { name: "Ankylose du poignet - En extension et pronation complète, doigts raidis (Main Dominante)", searchTerms: ["ankylose poignet extension pronation complète, doigts raidis main dominante", "dominante main raidis doigts complète, pronation extension poignet ankylose", "ankylose poignet", "poignet extension", "extension pronation"], rate: [35, 40], description: "Ankylose en extension avec pronation complète ET raideur importante des doigts. Association invalidante compromettant sérieusement la fonction de préhension.", rateCriteria: { low: "Raideur modérée des doigts.", high: "Raideur sévère des doigts, préhension très limitée." } },
            { name: "Ankylose du poignet - En extension et pronation complète, doigts raidis (Main Non Dominante)", searchTerms: ["ankylose poignet extension pronation complète, doigts raidis main non dominante", "dominante non main raidis doigts complète, pronation extension poignet ankylose", "ankylose poignet", "poignet extension", "extension pronation"], rate: [25, 30], description: "Ankylose en extension avec pronation complète ET raideur importante des doigts. Association invalidante compromettant sérieusement la fonction de préhension.", rateCriteria: { low: "Raideur modérée des doigts.", high: "Raideur sévère des doigts, préhension très limitée." } },
            
            { name: "Ankylose du poignet - En extension et supination, doigts mobiles (Main Dominante)", searchTerms: ["ankylose poignet extension supination, doigts mobiles main dominante", "dominante main mobiles doigts supination, extension poignet ankylose", "ankylose poignet", "poignet extension", "extension supination,"], rate: [40, 50], description: "Ankylose en extension avec supination de l'avant-bras. Position très défavorable selon degré de mobilité des doigts. Gêne majeure pour activités quotidiennes.", rateCriteria: { low: "Doigts mobiles, compensation partielle possible.", high: "Doigts légèrement raidis ou supination extrême." } },
            { name: "Ankylose du poignet - En extension et supination, doigts mobiles (Main Non Dominante)", searchTerms: ["ankylose poignet extension supination, doigts mobiles main non dominante", "dominante non main mobiles doigts supination, extension poignet ankylose", "ankylose poignet", "poignet extension", "extension supination,"], rate: [30, 40], description: "Ankylose en extension avec supination de l'avant-bras. Position très défavorable selon degré de mobilité des doigts. Gêne majeure pour activités quotidiennes.", rateCriteria: { low: "Doigts mobiles, compensation partielle possible.", high: "Doigts légèrement raidis ou supination extrême." } },

            // ANKYLOSES COMPLÈTES - Position flexion
            { name: "Ankylose du poignet - En flexion et pronation, doigts mobiles (Main Dominante)", searchTerms: ["ankylose poignet flexion pronation, doigts mobiles main dominante", "dominante main mobiles doigts pronation, flexion poignet ankylose", "ankylose poignet", "poignet flexion", "flexion pronation,"], rate: [45, 60], description: "Ankylose en flexion palmaire avec pronation. Position très défavorable selon degré de mobilité des doigts. Retentissement fonctionnel majeur.", rateCriteria: { low: "Flexion modérée (< 30°), doigts mobiles.", medium: "Flexion importante (30-60°), doigts partiellement mobiles.", high: "Flexion complète (> 60°) ou doigts raidis." } },
            { name: "Ankylose du poignet - En flexion et pronation, doigts mobiles (Main Non Dominante)", searchTerms: ["ankylose poignet flexion pronation, doigts mobiles main non dominante", "dominante non main mobiles doigts pronation, flexion poignet ankylose", "ankylose poignet", "poignet flexion", "flexion pronation,"], rate: [35, 45], description: "Ankylose en flexion palmaire avec pronation. Position très défavorable selon degré de mobilité des doigts. Retentissement fonctionnel majeur.", rateCriteria: { low: "Flexion modérée (< 30°), doigts mobiles.", medium: "Flexion importante (30-60°), doigts partiellement mobiles.", high: "Flexion complète (> 60°) ou doigts raidis." } },
            
            { name: "Ankylose du poignet - En flexion et supination, doigts mobiles (Main Dominante)", searchTerms: ["ankylose poignet flexion supination, doigts mobiles main dominante", "dominante main mobiles doigts supination, flexion poignet ankylose", "ankylose poignet", "poignet flexion", "flexion supination,"], rate: [45, 50], description: "Ankylose en flexion palmaire avec supination. Position défavorable, doigts conservant leur mobilité. Gêne fonctionnelle importante.", rateCriteria: { low: "Flexion modérée, doigts parfaitement mobiles.", high: "Flexion importante ou mobilité digitale partiellement limitée." } },
            { name: "Ankylose du poignet - En flexion et supination, doigts mobiles (Main Non Dominante)", searchTerms: ["ankylose poignet flexion supination, doigts mobiles main non dominante", "dominante non main mobiles doigts supination, flexion poignet ankylose", "ankylose poignet", "poignet flexion", "flexion supination,"], rate: [35, 45], description: "Ankylose en flexion palmaire avec supination. Position défavorable, doigts conservant leur mobilité. Gêne fonctionnelle importante.", rateCriteria: { low: "Flexion modérée, doigts parfaitement mobiles.", high: "Flexion importante ou mobilité digitale partiellement limitée." } },
            
            { name: "Ankylose du poignet - En flexion et supination, doigts ankylosés (perte de l'usage de la main) (Main Dominante)", searchTerms: ["ankylose poignet flexion supination, doigts ankylosés perte l'usage main main dominante", "ankylose poignet flexion supination, doigts ankylosés amputation l'usage main main dominante", "dominante main main l'usage perte ankylosés doigts supination, flexion poignet ankylose", "ankylose poignet", "poignet flexion"], rate: [55, 60], description: "Ankylose du poignet en flexion + supination AVEC ankylose des doigts. Équivaut à perte quasi-totale de l'usage fonctionnel de la main. Situation la plus invalidante.", rateCriteria: { low: "Quelques mouvements résiduels possibles.", high: "Ankylose complète poignet + tous doigts, main totalement figée." } },
            { name: "Ankylose du poignet - En flexion et supination, doigts ankylosés (perte de l'usage de la main) (Main Non Dominante)", searchTerms: ["ankylose poignet flexion supination, doigts ankylosés perte l'usage main main non dominante", "ankylose poignet flexion supination, doigts ankylosés amputation l'usage main main non dominante", "dominante non main main l'usage perte ankylosés doigts supination, flexion poignet ankylose", "ankylose poignet", "poignet flexion"], rate: [45, 50], description: "Ankylose du poignet en flexion + supination AVEC ankylose des doigts. Équivaut à perte quasi-totale de l'usage fonctionnel de la main. Situation la plus invalidante.", rateCriteria: { low: "Quelques mouvements résiduels possibles.", high: "Ankylose complète poignet + tous doigts, main totalement figée." } },
        ]
      },
      {
        name: "Main - Amputations",
        injuries: [
            { name: "Perte totale de la main (Main Dominante)", searchTerms: ["perte totale main main dominante", "amputation totale main main dominante", "dominante main main totale perte", "perte totale", "totale main"], rate: [68, 70], description: "Perte totale par désarticulation du poignet, des cinq métacarpiens, amputation intra-métacarpienne, ou ablation pouce et quatre doigts. Barème officiel." },
            { name: "Perte totale de la main (Main Non Dominante)", searchTerms: ["perte totale main main non dominante", "amputation totale main main non dominante", "dominante non main main totale perte", "perte totale", "totale main"], rate: [58, 60], description: "Perte totale par désarticulation du poignet, des cinq métacarpiens, amputation intra-métacarpienne, ou ablation pouce et quatre doigts. Barème officiel." },
            { name: "Perte totale de la main - Par désarticulation du poignet (Main Dominante)", searchTerms: ["perte totale main par désarticulation poignet main dominante", "amputation totale main par désarticulation poignet main dominante", "dominante main poignet désarticulation par main totale perte", "perte totale main désarticulation poignet main dominante", "perte totale"], rate: [68, 70], description: "Perte totale de la main par désarticulation radio-carpienne (au niveau du poignet). Barème officiel : 68-70% côté dominant, 58-60% côté non dominant." },
            { name: "Perte totale de la main - Par désarticulation du poignet (Main Non Dominante)", searchTerms: ["perte totale main par désarticulation poignet main non dominante", "amputation totale main par désarticulation poignet main non dominante", "dominante non main poignet désarticulation par main totale perte", "perte totale main désarticulation poignet main non dominante", "perte totale"], rate: [58, 60], description: "Perte totale de la main par désarticulation radio-carpienne (au niveau du poignet)." },
            { name: "Perte totale de la main - Par amputation très basse de l'avant-bras (Main Dominante)", searchTerms: ["perte totale main par amputation très basse l'avant bras main dominante", "perte totale main par amputation très basse l'avant supérieur main dominante", "dominante main bras l'avant basse très amputation par main totale perte", "perte totale main amputation très basse l'avant bras main dominante", "perte totale"], rate: [68, 70], description: "Perte totale de la main par amputation très basse de l'avant-bras (équivalent fonctionnel à la désarticulation du poignet). Barème officiel." },
            { name: "Perte totale de la main - Par amputation très basse de l'avant-bras (Main Non Dominante)", searchTerms: ["perte totale main par amputation très basse l'avant bras main non dominante", "perte totale main par amputation très basse l'avant supérieur main non dominante", "dominante non main bras l'avant basse très amputation par main totale perte", "perte totale main amputation très basse l'avant bras main non dominante", "perte totale"], rate: [58, 60], description: "Perte totale de la main par amputation très basse de l'avant-bras (équivalent fonctionnel à la désarticulation du poignet)." },
            { name: "Perte totale de la main - Par désarticulation des cinq métacarpiens (Main Dominante)", searchTerms: ["perte totale main par désarticulation des cinq métacarpiens main dominante", "amputation totale main par désarticulation des cinq métacarpiens main dominante", "dominante main métacarpiens cinq des désarticulation par main totale perte", "perte totale main désarticulation cinq métacarpiens main dominante", "perte totale"], rate: [68, 70], description: "Perte totale de la main par désarticulation des cinq métacarpiens au niveau carpo-métacarpien. Main réduite au carpe. Barème officiel." },
            { name: "Perte totale de la main - Par désarticulation des cinq métacarpiens (Main Non Dominante)", searchTerms: ["perte totale main par désarticulation des cinq métacarpiens main non dominante", "amputation totale main par désarticulation des cinq métacarpiens main non dominante", "dominante non main métacarpiens cinq des désarticulation par main totale perte", "perte totale main désarticulation cinq métacarpiens main non dominante", "perte totale"], rate: [58, 60], description: "Perte totale de la main par désarticulation des cinq métacarpiens. Main réduite au carpe." },
            { name: "Perte totale de la main - Par amputation intra-métacarpienne (Main Dominante)", searchTerms: ["perte totale main par amputation intra métacarpienne main dominante", "amputation totale main par amputation intra métacarpienne main dominante", "dominante main métacarpienne intra amputation par main totale perte", "perte totale main amputation intra métacarpienne main dominante", "perte totale"], rate: [68, 70], description: "Perte totale de la main par amputation au niveau des métacarpiens (entre leur base et leur tête). Segments métacarpiens résiduels sans aucun doigt. Barème officiel." },
            { name: "Perte totale de la main - Par amputation intra-métacarpienne (Main Non Dominante)", searchTerms: ["perte totale main par amputation intra métacarpienne main non dominante", "amputation totale main par amputation intra métacarpienne main non dominante", "dominante non main métacarpienne intra amputation par main totale perte", "perte totale main amputation intra métacarpienne main non dominante", "perte totale"], rate: [58, 60], description: "Perte totale de la main par amputation au niveau des métacarpiens. Segments métacarpiens résiduels sans doigts." },
            { name: "Perte totale de la main - Par ablation du pouce et des quatre doigts (Main Dominante)", searchTerms: ["perte totale main par ablation pouce des quatre doigts main dominante", "amputation totale main par ablation pouce des quatre doigts main dominante", "dominante main doigts quatre des pouce ablation par main totale perte", "perte totale main ablation pouce quatre doigts main dominante", "perte totale"], rate: [68, 70], description: "Perte totale de la main par ablation du pouce et des quatre autres doigts, quelle que soit le niveau d'amputation. Main réduite à la palette métacarpienne sans aucune fonction de préhension. Barème officiel." },
            { name: "Perte totale de la main - Par ablation du pouce et des quatre doigts (Main Non Dominante)", searchTerms: ["perte totale main par ablation pouce des quatre doigts main non dominante", "amputation totale main par ablation pouce des quatre doigts main non dominante", "dominante non main doigts quatre des pouce ablation par main totale perte", "perte totale main ablation pouce quatre doigts main non dominante", "perte totale"], rate: [58, 60], description: "Perte totale de la main par ablation du pouce et des quatre doigts. Main réduite à la palette métacarpienne." },
            { name: "Perte des deux mains (bilatérale)", searchTerms: ["perte des deux mains bilatérale", "amputation des deux mains bilatérale", "bilatérale mains deux des perte", "perte deux mains", "deux mains"], rate: 100, description: "Perte des deux mains, quel qu'en soit le niveau (désarticulation des poignets, amputation intra-métacarpienne, ablation des deux pouces et de tous les doigts aux deux mains). Perte totale de la préhension et de l'autonomie manuelle. Barème officiel : 100%." },
            { name: "Perte de l'usage de la main - Perte complète tous doigts + poignet ankylosé (Main Dominante)", searchTerms: ["perte l'usage main perte complète tous doigts poignet ankylosé main dominante", "amputation l'usage main amputation complète tous doigts poignet ankylosé main dominante", "dominante main ankylosé poignet doigts tous complète perte main l'usage perte", "perte l'usage", "l'usage main"], rate: 70, description: "Main réduite à la palette métacarpienne avec ankylose du poignet." },
            { name: "Perte de l'usage de la main - Perte complète tous doigts + poignet ankylosé (Main Non Dominante)", searchTerms: ["perte l'usage main perte complète tous doigts poignet ankylosé main non dominante", "amputation l'usage main amputation complète tous doigts poignet ankylosé main non dominante", "dominante non main ankylosé poignet doigts tous complète perte main l'usage perte", "perte l'usage", "l'usage main"], rate: 65, description: "Main réduite à la palette métacarpienne avec ankylose du poignet." },
            { name: "Perte de l'usage de la main - Immobilisation tous doigts en extension (Main Dominante)", searchTerms: ["perte l'usage main immobilisation tous doigts extension main dominante", "amputation l'usage main immobilisation tous doigts extension main dominante", "dominante main extension doigts tous immobilisation main l'usage perte", "perte l'usage", "l'usage main"], rate: 70, description: "Tous les doigts immobilisés en extension, quel que soit l'état du poignet." },
            { name: "Perte de l'usage de la main - Immobilisation tous doigts en extension (Main Non Dominante)", searchTerms: ["perte l'usage main immobilisation tous doigts extension main non dominante", "amputation l'usage main immobilisation tous doigts extension main non dominante", "dominante non main extension doigts tous immobilisation main l'usage perte", "perte l'usage", "l'usage main"], rate: 65, description: "Tous les doigts immobilisés en extension, quel que soit l'état du poignet." },
            { name: "Perte de l'usage de la main - Immobilisation tous doigts en flexion (Main Dominante)", searchTerms: ["perte l'usage main immobilisation tous doigts flexion main dominante", "amputation l'usage main immobilisation tous doigts flexion main dominante", "dominante main flexion doigts tous immobilisation main l'usage perte", "perte l'usage", "l'usage main"], rate: 70, description: "Tous les doigts immobilisés en flexion ou incurvation (ankyloses, contractures)." },
            { name: "Perte de l'usage de la main - Immobilisation tous doigts en flexion (Main Non Dominante)", searchTerms: ["perte l'usage main immobilisation tous doigts flexion main non dominante", "amputation l'usage main immobilisation tous doigts flexion main non dominante", "dominante non main flexion doigts tous immobilisation main l'usage perte", "perte l'usage", "l'usage main"], rate: 65, description: "Tous les doigts immobilisés en flexion ou incurvation (ankyloses, contractures)." },
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
        name: "Main - Pertes Multiples de Doigts",
        injuries: [
            // Pertes de 2 doigts incluant le pouce
            { name: "Perte Pouce + Index (Main Dominante)", searchTerms: ["perte pouce index main dominante", "amputation pouce index main dominante", "dominante main index pouce perte", "perte pouce", "pouce index"], rate: 48 },
            { name: "Perte Pouce + Index (Main Non Dominante)", searchTerms: ["perte pouce index main non dominante", "amputation pouce index main non dominante", "dominante non main index pouce perte", "perte pouce", "pouce index"], rate: 37 },
            { name: "Perte Pouce + Médius (Main Dominante)", searchTerms: ["perte pouce médius main dominante", "amputation pouce médius main dominante", "dominante main médius pouce perte", "perte pouce", "pouce médius"], rate: 40 },
            { name: "Perte Pouce + Médius (Main Non Dominante)", searchTerms: ["perte pouce médius main non dominante", "amputation pouce médius main non dominante", "dominante non main médius pouce perte", "perte pouce", "pouce médius"], rate: 33 },
            { name: "Perte Pouce + Annulaire (Main Dominante)", searchTerms: ["perte pouce annulaire main dominante", "amputation pouce annulaire main dominante", "dominante main annulaire pouce perte", "perte pouce", "pouce annulaire"], rate: 36 },
            { name: "Perte Pouce + Annulaire (Main Non Dominante)", searchTerms: ["perte pouce annulaire main non dominante", "amputation pouce annulaire main non dominante", "dominante non main annulaire pouce perte", "perte pouce", "pouce annulaire"], rate: 30 },
            { name: "Perte Pouce + Auriculaire (Main Dominante)", searchTerms: ["perte pouce auriculaire main dominante", "amputation pouce auriculaire main dominante", "dominante main auriculaire pouce perte", "perte pouce", "pouce auriculaire"], rate: 32 },
            { name: "Perte Pouce + Auriculaire (Main Non Dominante)", searchTerms: ["perte pouce auriculaire main non dominante", "amputation pouce auriculaire main non dominante", "dominante non main auriculaire pouce perte", "perte pouce", "pouce auriculaire"], rate: 27 },
            
            // Pertes de 2 doigts (hors pouce)
            { name: "Perte Index + Médius (Main Dominante)", searchTerms: ["perte index médius main dominante", "amputation index médius main dominante", "dominante main médius index perte", "perte index", "index médius"], rate: 22 },
            { name: "Perte Index + Médius (Main Non Dominante)", searchTerms: ["perte index médius main non dominante", "amputation index médius main non dominante", "dominante non main médius index perte", "perte index", "index médius"], rate: 18 },
            { name: "Perte Index + Annulaire (Main Dominante)", searchTerms: ["perte index annulaire main dominante", "amputation index annulaire main dominante", "dominante main annulaire index perte", "perte index", "index annulaire"], rate: 20 },
            { name: "Perte Index + Annulaire (Main Non Dominante)", searchTerms: ["perte index annulaire main non dominante", "amputation index annulaire main non dominante", "dominante non main annulaire index perte", "perte index", "index annulaire"], rate: 17 },
            { name: "Perte Index + Auriculaire (Main Dominante)", searchTerms: ["perte index auriculaire main dominante", "amputation index auriculaire main dominante", "dominante main auriculaire index perte", "perte index", "index auriculaire"], rate: 18 },
            { name: "Perte Index + Auriculaire (Main Non Dominante)", searchTerms: ["perte index auriculaire main non dominante", "amputation index auriculaire main non dominante", "dominante non main auriculaire index perte", "perte index", "index auriculaire"], rate: 15 },
            { name: "Perte Médius + Annulaire (Main Dominante)", searchTerms: ["perte médius annulaire main dominante", "amputation médius annulaire main dominante", "dominante main annulaire médius perte", "perte médius", "médius annulaire"], rate: 16 },
            { name: "Perte Médius + Annulaire (Main Non Dominante)", searchTerms: ["perte médius annulaire main non dominante", "amputation médius annulaire main non dominante", "dominante non main annulaire médius perte", "perte médius", "médius annulaire"], rate: 14 },
            { name: "Perte Médius + Auriculaire (Main Dominante)", searchTerms: ["perte médius auriculaire main dominante", "amputation médius auriculaire main dominante", "dominante main auriculaire médius perte", "perte médius", "médius auriculaire"], rate: 14 },
            { name: "Perte Médius + Auriculaire (Main Non Dominante)", searchTerms: ["perte médius auriculaire main non dominante", "amputation médius auriculaire main non dominante", "dominante non main auriculaire médius perte", "perte médius", "médius auriculaire"], rate: 12 },
            { name: "Perte Annulaire + Auriculaire (Main Dominante)", searchTerms: ["perte annulaire auriculaire main dominante", "amputation annulaire auriculaire main dominante", "dominante main auriculaire annulaire perte", "perte annulaire", "annulaire auriculaire"], rate: 12 },
            { name: "Perte Annulaire + Auriculaire (Main Non Dominante)", searchTerms: ["perte annulaire auriculaire main non dominante", "amputation annulaire auriculaire main non dominante", "dominante non main auriculaire annulaire perte", "perte annulaire", "annulaire auriculaire"], rate: 10 },
            
            // Pertes de 3 doigts incluant le pouce
            { name: "Perte Pouce + Index + Médius (Main Dominante)", searchTerms: ["perte pouce index médius main dominante", "amputation pouce index médius main dominante", "dominante main médius index pouce perte", "perte pouce", "pouce index"], rate: 52 },
            { name: "Perte Pouce + Index + Médius (Main Non Dominante)", searchTerms: ["perte pouce index médius main non dominante", "amputation pouce index médius main non dominante", "dominante non main médius index pouce perte", "perte pouce", "pouce index"], rate: 42 },
            { name: "Perte Pouce + Index + Annulaire (Main Dominante)", searchTerms: ["perte pouce index annulaire main dominante", "amputation pouce index annulaire main dominante", "dominante main annulaire index pouce perte", "perte pouce", "pouce index"], rate: 50 },
            { name: "Perte Pouce + Index + Annulaire (Main Non Dominante)", searchTerms: ["perte pouce index annulaire main non dominante", "amputation pouce index annulaire main non dominante", "dominante non main annulaire index pouce perte", "perte pouce", "pouce index"], rate: 40 },
            { name: "Perte Pouce + Index + Auriculaire (Main Dominante)", searchTerms: ["perte pouce index auriculaire main dominante", "amputation pouce index auriculaire main dominante", "dominante main auriculaire index pouce perte", "perte pouce", "pouce index"], rate: 48 },
            { name: "Perte Pouce + Index + Auriculaire (Main Non Dominante)", searchTerms: ["perte pouce index auriculaire main non dominante", "amputation pouce index auriculaire main non dominante", "dominante non main auriculaire index pouce perte", "perte pouce", "pouce index"], rate: 38 },
            { name: "Perte Pouce + Médius + Annulaire (Main Dominante)", searchTerms: ["perte pouce médius annulaire main dominante", "amputation pouce médius annulaire main dominante", "dominante main annulaire médius pouce perte", "perte pouce", "pouce médius"], rate: 46 },
            { name: "Perte Pouce + Médius + Annulaire (Main Non Dominante)", searchTerms: ["perte pouce médius annulaire main non dominante", "amputation pouce médius annulaire main non dominante", "dominante non main annulaire médius pouce perte", "perte pouce", "pouce médius"], rate: 38 },
            { name: "Perte Pouce + Médius + Auriculaire (Main Dominante)", searchTerms: ["perte pouce médius auriculaire main dominante", "amputation pouce médius auriculaire main dominante", "dominante main auriculaire médius pouce perte", "perte pouce", "pouce médius"], rate: 44 },
            { name: "Perte Pouce + Médius + Auriculaire (Main Non Dominante)", searchTerms: ["perte pouce médius auriculaire main non dominante", "amputation pouce médius auriculaire main non dominante", "dominante non main auriculaire médius pouce perte", "perte pouce", "pouce médius"], rate: 36 },
            { name: "Perte Pouce + Annulaire + Auriculaire (Main Dominante)", searchTerms: ["perte pouce annulaire auriculaire main dominante", "amputation pouce annulaire auriculaire main dominante", "dominante main auriculaire annulaire pouce perte", "perte pouce", "pouce annulaire"], rate: 40 },
            { name: "Perte Pouce + Annulaire + Auriculaire (Main Non Dominante)", searchTerms: ["perte pouce annulaire auriculaire main non dominante", "amputation pouce annulaire auriculaire main non dominante", "dominante non main auriculaire annulaire pouce perte", "perte pouce", "pouce annulaire"], rate: 33 },
            
            // Pertes de 3 doigts (hors pouce)
            { name: "Perte Index + Médius + Annulaire (Main Dominante)", searchTerms: ["perte index médius annulaire main dominante", "amputation index médius annulaire main dominante", "dominante main annulaire médius index perte", "perte index", "index médius"], rate: 30 },
            { name: "Perte Index + Médius + Annulaire (Main Non Dominante)", searchTerms: ["perte index médius annulaire main non dominante", "amputation index médius annulaire main non dominante", "dominante non main annulaire médius index perte", "perte index", "index médius"], rate: 25 },
            { name: "Perte Index + Médius + Auriculaire (Main Dominante)", searchTerms: ["perte index médius auriculaire main dominante", "amputation index médius auriculaire main dominante", "dominante main auriculaire médius index perte", "perte index", "index médius"], rate: 28 },
            { name: "Perte Index + Médius + Auriculaire (Main Non Dominante)", searchTerms: ["perte index médius auriculaire main non dominante", "amputation index médius auriculaire main non dominante", "dominante non main auriculaire médius index perte", "perte index", "index médius"], rate: 23 },
            { name: "Perte Index + Annulaire + Auriculaire (Main Dominante)", searchTerms: ["perte index annulaire auriculaire main dominante", "amputation index annulaire auriculaire main dominante", "dominante main auriculaire annulaire index perte", "perte index", "index annulaire"], rate: 26 },
            { name: "Perte Index + Annulaire + Auriculaire (Main Non Dominante)", searchTerms: ["perte index annulaire auriculaire main non dominante", "amputation index annulaire auriculaire main non dominante", "dominante non main auriculaire annulaire index perte", "perte index", "index annulaire"], rate: 22 },
            { name: "Perte Médius + Annulaire + Auriculaire (Main Dominante)", searchTerms: ["perte médius annulaire auriculaire main dominante", "amputation médius annulaire auriculaire main dominante", "dominante main auriculaire annulaire médius perte", "perte médius", "médius annulaire"], rate: 22 },
            { name: "Perte Médius + Annulaire + Auriculaire (Main Non Dominante)", searchTerms: ["perte médius annulaire auriculaire main non dominante", "amputation médius annulaire auriculaire main non dominante", "dominante non main auriculaire annulaire médius perte", "perte médius", "médius annulaire"], rate: 18 },
            
            // Pertes de 4 doigts
            { name: "Perte 4 doigts incluant Pouce + Index + Médius + Annulaire (Main Dominante)", searchTerms: ["perte doigts incluant pouce index médius annulaire main dominante", "amputation doigts incluant pouce index médius annulaire main dominante", "dominante main annulaire médius index pouce incluant doigts perte", "perte doigts", "doigts incluant"], rate: 58 },
            { name: "Perte 4 doigts incluant Pouce + Index + Médius + Annulaire (Main Non Dominante)", searchTerms: ["perte doigts incluant pouce index médius annulaire main non dominante", "amputation doigts incluant pouce index médius annulaire main non dominante", "dominante non main annulaire médius index pouce incluant doigts perte", "perte doigts", "doigts incluant"], rate: 48 },
            { name: "Perte 4 doigts incluant Pouce + Index + Médius + Auriculaire (Main Dominante)", searchTerms: ["perte doigts incluant pouce index médius auriculaire main dominante", "amputation doigts incluant pouce index médius auriculaire main dominante", "dominante main auriculaire médius index pouce incluant doigts perte", "perte doigts", "doigts incluant"], rate: 56 },
            { name: "Perte 4 doigts incluant Pouce + Index + Médius + Auriculaire (Main Non Dominante)", searchTerms: ["perte doigts incluant pouce index médius auriculaire main non dominante", "amputation doigts incluant pouce index médius auriculaire main non dominante", "dominante non main auriculaire médius index pouce incluant doigts perte", "perte doigts", "doigts incluant"], rate: 46 },
            { name: "Perte 4 doigts incluant Pouce + Index + Annulaire + Auriculaire (Main Dominante)", searchTerms: ["perte doigts incluant pouce index annulaire auriculaire main dominante", "amputation doigts incluant pouce index annulaire auriculaire main dominante", "dominante main auriculaire annulaire index pouce incluant doigts perte", "perte doigts", "doigts incluant"], rate: 54 },
            { name: "Perte 4 doigts incluant Pouce + Index + Annulaire + Auriculaire (Main Non Dominante)", searchTerms: ["perte doigts incluant pouce index annulaire auriculaire main non dominante", "amputation doigts incluant pouce index annulaire auriculaire main non dominante", "dominante non main auriculaire annulaire index pouce incluant doigts perte", "perte doigts", "doigts incluant"], rate: 44 },
            { name: "Perte 4 doigts incluant Pouce + Médius + Annulaire + Auriculaire (Main Dominante)", searchTerms: ["perte doigts incluant pouce médius annulaire auriculaire main dominante", "amputation doigts incluant pouce médius annulaire auriculaire main dominante", "dominante main auriculaire annulaire médius pouce incluant doigts perte", "perte doigts", "doigts incluant"], rate: 50 },
            { name: "Perte 4 doigts incluant Pouce + Médius + Annulaire + Auriculaire (Main Non Dominante)", searchTerms: ["perte doigts incluant pouce médius annulaire auriculaire main non dominante", "amputation doigts incluant pouce médius annulaire auriculaire main non dominante", "dominante non main auriculaire annulaire médius pouce incluant doigts perte", "perte doigts", "doigts incluant"], rate: 42 },
            { name: "Perte 4 doigts (sans pouce): Index + Médius + Annulaire + Auriculaire (Main Dominante)", searchTerms: ["perte doigts sans pouce index médius annulaire auriculaire main dominante", "amputation doigts sans pouce index médius annulaire auriculaire main dominante", "dominante main auriculaire annulaire médius index pouce sans doigts perte", "perte doigts pouce index médius annulaire auriculaire main dominante", "perte doigts"], rate: [30, 35] },
            { name: "Perte 4 doigts (sans pouce): Index + Médius + Annulaire + Auriculaire (Main Non Dominante)", searchTerms: ["perte doigts sans pouce index médius annulaire auriculaire main non dominante", "amputation doigts sans pouce index médius annulaire auriculaire main non dominante", "dominante non main auriculaire annulaire médius index pouce sans doigts perte", "perte doigts pouce index médius annulaire auriculaire main non dominante", "perte doigts"], rate: [25, 30] },
        ]
      },
      {
        name: "Main - Raideurs et Ankyloses",
        injuries: [
            { name: "Ankylose de tous les doigts de la main (Main Dominante)", searchTerms: ["ankylose tous les doigts main main dominante", "dominante main main doigts les tous ankylose", "ankylose tous", "tous les", "les doigts"], rate: [50, 55] },
            { name: "Ankylose de tous les doigts de la main (Main Non Dominante)", searchTerms: ["ankylose tous les doigts main main non dominante", "dominante non main main doigts les tous ankylose", "ankylose tous", "tous les", "les doigts"], rate: [40, 45] },
            { name: "Main bote radiale ou cubitale (Main Dominante)", searchTerms: ["main bote radiale cubitale main dominante", "dominante main cubitale radiale bote main", "main bote", "bote radiale", "radiale cubitale"], rate: [20, 40], description: "Main bote (déformation en déviation radiale ou cubitale) consécutive à une large perte de substance d'un des os de l'avant-bras (radius ou ulna). Évaluation selon le degré de déviation latérale et de la gêne apportée à la mobilité des doigts. Déformation osseuse avec retentissement fonctionnel variable.", rateCriteria: { low: "Déviation légère, mobilité des doigts peu gênée, compensation satisfaisante.", medium: "Déviation modérée, limitation partielle de la mobilité digitale.", high: "Déviation importante, gêne majeure de la mobilité des doigts, préhension très compromise." } },
            { name: "Main bote radiale ou cubitale (Main Non Dominante)", searchTerms: ["main bote radiale cubitale main non dominante", "dominante non main cubitale radiale bote main", "main bote", "bote radiale", "radiale cubitale"], rate: [15, 30], description: "Main bote (déformation en déviation radiale ou cubitale) consécutive à une large perte de substance d'un des os de l'avant-bras (radius ou ulna). Évaluation selon le degré de déviation latérale et de la gêne apportée à la mobilité des doigts. Déformation osseuse avec retentissement fonctionnel variable.", rateCriteria: { low: "Déviation légère, mobilité des doigts peu gênée, compensation satisfaisante.", medium: "Déviation modérée, limitation partielle de la mobilité digitale.", high: "Déviation importante, gêne majeure de la mobilité des doigts, préhension très compromise." } },
            { name: "Main creuse avec rétraction palmaire (Main Dominante)", searchTerms: ["main creuse avec rétraction palmaire main dominante", "dominante main palmaire rétraction avec creuse main", "main creuse rétraction palmaire main dominante", "main creuse", "creuse avec"], rate: [40, 50], description: "Main creuse avec rétraction de l'aponévrose palmaire (type Dupuytren post-traumatique), cicatrices vicieuses rétractiles. Déformation en griffe avec limitation sévère de l'extension des doigts." },
            { name: "Main creuse avec rétraction palmaire (Main Non Dominante)", searchTerms: ["main creuse avec rétraction palmaire main non dominante", "dominante non main palmaire rétraction avec creuse main", "main creuse rétraction palmaire main non dominante", "main creuse", "creuse avec"], rate: [30, 40], description: "Main creuse avec rétraction de l'aponévrose palmaire (type Dupuytren post-traumatique), cicatrices vicieuses rétractiles. Déformation en griffe avec limitation sévère de l'extension des doigts." },
            { name: "Cicatrices vicieuses de la paume (Main Dominante)", searchTerms: ["cicatrices vicieuses paume main dominante", "dominante main paume vicieuses cicatrices", "cicatrices vicieuses", "vicieuses paume", "paume main"], rate: [5, 40], rateCriteria: { low: "Bride limitant l'extension d'un doigt.", high: "Main en griffe, rétraction de tous les doigts." } },
            { name: "Cicatrices vicieuses de la paume (Main Non Dominante)", searchTerms: ["cicatrices vicieuses paume main non dominante", "dominante non main paume vicieuses cicatrices", "cicatrices vicieuses", "vicieuses paume", "paume main"], rate: [4, 35], rateCriteria: { low: "Bride limitant l'extension d'un doigt.", high: "Main en griffe." } },
            { name: "Séquelles de fracture de métacarpien (cal vicieux, raideur) (Main Dominante)", searchTerms: ["séquelles fracture métacarpien cal vicieux, raideur main dominante", "dominante main raideur vicieux, cal métacarpien fracture séquelles", "séquelles fracture", "fracture métacarpien", "métacarpien cal"], rate: [3, 10] },
            { name: "Séquelles de fracture de métacarpien (cal vicieux, raideur) (Main Non Dominante)", searchTerms: ["séquelles fracture métacarpien cal vicieux, raideur main non dominante", "dominante non main raideur vicieux, cal métacarpien fracture séquelles", "séquelles fracture", "fracture métacarpien", "métacarpien cal"], rate: [2, 8] },
        ]
      },
      {
        name: "Main - Métacarpe",
        injuries: [
            { name: "Fracture métacarpienne - Cal plus ou moins difforme, saillant, gêne motrice doigts (Main Dominante)", searchTerms: ["fracture métacarpienne cal difforme, saillant, gêne motrice doigts main dominante", "dominante main doigts motrice gêne saillant, difforme, cal métacarpienne fracture", "fracture métacarpienne cal difforme saillant gêne motrice doigts main dominante", "fracture métacarpienne", "métacarpienne cal"], rate: [5, 15], description: "Cal plus ou moins difforme et saillant avec gêne motrice des doigts correspondants. Séquelles de fracture métacarpienne selon l'importance du cal vicieux et du retentissement fonctionnel sur les doigts.", rateCriteria: { low: "Cal légèrement saillant, gêne motrice minime des doigts.", medium: "Cal saillant, gêne modérée de la mobilité digitale.", high: "Cal très difforme, gêne importante de la motricité des doigts adjacents." } },
            { name: "Fracture métacarpienne - Cal difforme, gêne motrice (Main Non Dominante)", searchTerms: ["fracture métacarpienne cal difforme, gêne motrice main non dominante", "dominante non main motrice gêne difforme, cal métacarpienne fracture", "fracture métacarpienne cal difforme gêne motrice main non dominante", "fracture métacarpienne", "métacarpienne cal"], rate: [4, 12], description: "Cal plus ou moins difforme avec gêne motrice des doigts correspondants.", rateCriteria: { low: "Cal légèrement saillant, gêne minime.", medium: "Cal saillant, gêne modérée.", high: "Cal très difforme, gêne importante." } },
            { name: "Fracture métacarpienne avec perte de substance osseuse, déviation main, gêne motrice importante (Main Dominante)", searchTerms: ["fracture métacarpienne avec perte substance osseuse, déviation main, gêne motrice importante main dominante", "fracture métacarpienne avec amputation substance osseuse, déviation main, gêne motrice importante main dominante", "dominante main importante motrice gêne main, déviation osseuse, substance perte avec métacarpienne fracture", "fracture métacarpienne perte substance osseuse déviation main gêne motrice importante main dominante", "fracture métacarpienne"], rate: [10, 20], description: "Fractures avec perte de substance osseuse sur l'un ou l'autre bord de la main, entraînant une déviation secondaire de la main, un écartement ou une gêne motrice importante des doigts. Séquelles graves compromettant la fonction de préhension.", rateCriteria: { low: "Perte de substance modérée, déviation légère, gêne motrice modérée.", medium: "Perte de substance importante, déviation notable, gêne motrice marquée.", high: "Perte de substance majeure, déviation sévère, gêne motrice très importante avec écartement des doigts." } },
            { name: "Fracture métacarpienne avec perte de substance osseuse, déviation main (Main Non Dominante)", searchTerms: ["fracture métacarpienne avec perte substance osseuse, déviation main main non dominante", "fracture métacarpienne avec amputation substance osseuse, déviation main main non dominante", "dominante non main main déviation osseuse, substance perte avec métacarpienne fracture", "fracture métacarpienne perte substance osseuse déviation main main non dominante", "fracture métacarpienne"], rate: [8, 15], description: "Fractures avec perte de substance osseuse entraînant déviation de la main et gêne motrice des doigts.", rateCriteria: { low: "Perte modérée, déviation légère.", medium: "Perte importante, déviation notable.", high: "Perte majeure, déviation sévère." } },
            { name: "Fracture de Bennett du pouce (Main Dominante)", searchTerms: ["fracture bennett pouce main dominante", "dominante main pouce bennett fracture", "fracture bennett", "bennett pouce", "pouce main"], rate: [8, 15], description: "Fracture-luxation de la base du premier métacarpien (pouce) avec subluxation trapézo-métacarpienne. Séquelles fonctionnelles variables selon qualité de la réduction et consolidation.", rateCriteria: { low: "Bonne réduction, consolidation satisfaisante, mobilité du pouce quasi-normale avec gêne minime.", medium: "Consolidation avec subluxation résiduelle, limitation modérée de la mobilité du pouce, douleurs à l'effort.", high: "Cal vicieux avec arthrose trapézo-métacarpienne secondaire, limitation importante de la mobilité et de la force du pouce, douleurs fréquentes." } },
            { name: "Fracture de Bennett du pouce (Main Non Dominante)", searchTerms: ["fracture bennett pouce main non dominante", "dominante non main pouce bennett fracture", "fracture bennett", "bennett pouce", "pouce main"], rate: [6, 12], description: "Fracture-luxation de la base du premier métacarpien (pouce) avec subluxation trapézo-métacarpienne. Séquelles fonctionnelles variables.", rateCriteria: { low: "Bonne réduction, mobilité quasi-normale.", medium: "Consolidation avec subluxation résiduelle, limitation modérée.", high: "Cal vicieux avec arthrose secondaire, limitation importante." } },
            { name: "Rétraction de l'aponévrose palmaire (exceptionnellement traumatique) (Main Dominante)", searchTerms: ["rétraction l'aponévrose palmaire exceptionnellement traumatique main dominante", "dominante main traumatique exceptionnellement palmaire l'aponévrose rétraction", "rétraction l'aponévrose palmaire traumatique main dominante", "rétraction l'aponévrose", "l'aponévrose palmaire"], rate: [8, 20], description: "Rétraction de l'aponévrose palmaire (maladie de Dupuytren post-traumatique, exceptionnelle en contexte purement traumatique). Entraîne une flexion progressive et irréductible des doigts, gênant l'extension complète.", rateCriteria: { low: "Rétraction débutante, flexion modérée d'un doigt, extension possible à 20-30° du plan.", medium: "Rétraction moyenne, flexion de 1-2 doigts, extension limitée à 45-60°, gêne fonctionnelle notable.", high: "Rétraction sévère, flexion de plusieurs doigts, extension impossible, main en griffe, préhension très compromise." } },
            { name: "Rétraction de l'aponévrose palmaire (Main Non Dominante)", searchTerms: ["rétraction l'aponévrose palmaire main non dominante", "dominante non main palmaire l'aponévrose rétraction", "rétraction l'aponévrose palmaire main non dominante", "rétraction l'aponévrose", "l'aponévrose palmaire"], rate: [6, 15], description: "Rétraction de l'aponévrose palmaire (Dupuytren post-traumatique, exceptionnel). Entraîne flexion progressive des doigts.", rateCriteria: { low: "Rétraction débutante, flexion modérée.", medium: "Rétraction moyenne, flexion de 1-2 doigts.", high: "Rétraction sévère, main en griffe." } },
            { name: "Œdème dur traumatique de la main (Main Dominante)", searchTerms: ["œdème dur traumatique main main dominante", "dominante main main traumatique dur œdème", "œdème dur", "dur traumatique", "traumatique main"], rate: [8, 10], description: "Œdème chronique induré de la main d'origine traumatique (séquelle d'algodystrophie, troubles trophiques), entraînant raideur, limitation fonctionnelle et gêne esthétique.", rateCriteria: { low: "Œdème modéré localisé, limitation fonctionnelle minime.", high: "Œdème important diffus, main empâtée, limitation majeure de la mobilité digitale et de la préhension." } },
            { name: "Œdème dur traumatique de la main (Main Non Dominante)", searchTerms: ["œdème dur traumatique main main non dominante", "dominante non main main traumatique dur œdème", "œdème dur", "dur traumatique", "traumatique main"], rate: [6, 8], description: "Œdème chronique induré de la main d'origine traumatique (algodystrophie, troubles trophiques).", rateCriteria: { low: "Œdème modéré, limitation minime.", high: "Œdème important diffus, limitation majeure." } },
        ]
      },
      {
        name: "Doigts - Lésions Tendineuses",
        injuries: [
            { name: "Section des tendons fléchisseurs doigt long", searchTerms: ["section des tendons fléchisseurs doigt long", "long doigt fléchisseurs tendons des section", "section tendons fléchisseurs doigt long", "section des", "des tendons"], rate: [8, 12] },
            { name: "Section des tendons extenseurs d'un doigt long", searchTerms: ["section des tendons extenseurs d'un doigt long", "long doigt d'un extenseurs tendons des section", "section tendons extenseurs d'un doigt long", "section des", "des tendons"], rate: [6, 10] },
        ]
      },
      {
        name: "Doigts - Pouce (Main Dominante)",
        injuries: [
            { name: "Ablation moitié phalange unguéale du pouce (Main Dominante)", searchTerms: ["ablation moitié phalange unguéale pouce main dominante", "amputation moitié phalange unguéale pouce main dominante", "dominante main pouce unguéale phalange moitié ablation", "ablation moitié", "moitié phalange"], rate: 5 },
            { name: "Ablation phalange unguéale entière du pouce (Main Dominante)", searchTerms: ["ablation phalange unguéale entière pouce main dominante", "amputation phalange unguéale entière pouce main dominante", "dominante main pouce entière unguéale phalange ablation", "ablation phalange", "phalange unguéale"], rate: 15 },
            { name: "Désarticulation inter-phalangienne du pouce (Main Dominante)", searchTerms: ["désarticulation inter phalangienne pouce main dominante", "dominante main pouce phalangienne inter désarticulation", "désarticulation inter", "inter phalangienne", "phalangienne pouce"], rate: 20, description: "Amputation du pouce au niveau de l'articulation inter-phalangienne avec conservation de la base (phalange proximale et métacarpien). Barème officiel." },
            { name: "Ablation 2 phalanges du pouce (Main Dominante)", searchTerms: ["ablation phalanges pouce main dominante", "amputation phalanges pouce main dominante", "dominante main pouce phalanges ablation", "ablation phalanges", "phalanges pouce"], rate: [25, 30] },
            { name: "Désarticulation métacarpo-phalangienne du pouce (Main Dominante)", searchTerms: ["désarticulation métacarpo phalangienne pouce main dominante", "dominante main pouce phalangienne métacarpo désarticulation", "désarticulation métacarpo", "métacarpo phalangienne", "phalangienne pouce"], rate: 28, description: "Amputation totale du pouce au niveau de l'articulation métacarpo-phalangienne. Perte totale du pouce avec conservation du métacarpien. Barème officiel." },
            { name: "Ablation 2 phalanges + tête métacarpien du pouce (Main Dominante)", searchTerms: ["ablation phalanges tête métacarpien pouce main dominante", "amputation phalanges tête métacarpien pouce main dominante", "dominante main pouce métacarpien tête phalanges ablation", "ablation phalanges", "phalanges tête"], rate: [25, 30] },
            { name: "Ablation 2 phalanges + métacarpien entier du pouce (Main Dominante)", searchTerms: ["ablation phalanges métacarpien entier pouce main dominante", "amputation phalanges métacarpien entier pouce main dominante", "dominante main pouce entier métacarpien phalanges ablation", "ablation phalanges", "phalanges métacarpien"], rate: [30, 35] },
            { name: "Ankylose carpo-métacarpienne du pouce (Main Dominante)", searchTerms: ["ankylose carpo métacarpienne pouce main dominante", "dominante main pouce métacarpienne carpo ankylose", "ankylose carpo", "carpo métacarpienne", "métacarpienne pouce"], rate: [15, 20] },
            { name: "Ankylose métacarpo-phalangienne du pouce (Main Dominante)", searchTerms: ["ankylose métacarpo phalangienne pouce main dominante", "dominante main pouce phalangienne métacarpo ankylose", "ankylose métacarpo", "métacarpo phalangienne", "phalangienne pouce"], rate: [8, 10] },
            { name: "Ankylose inter-phalangienne du pouce (Main Dominante)", searchTerms: ["ankylose inter phalangienne pouce main dominante", "dominante main pouce phalangienne inter ankylose", "ankylose inter", "inter phalangienne", "phalangienne pouce"], rate: [5, 6] },
            { name: "Ankylose métacarpo-phalangienne et inter-phalangienne du pouce (Main Dominante)", searchTerms: ["ankylose métacarpo phalangienne inter phalangienne pouce main dominante", "dominante main pouce phalangienne inter phalangienne métacarpo ankylose", "ankylose métacarpo inter phalangienne pouce", "ankylose deux articulations pouce"], rate: [15, 18], description: "Ankylose des deux articulations du pouce (MCP et IPP). Barème officiel." },
            { name: "Ankylose totale du pouce en extension (Main Dominante)", searchTerms: ["ankylose totale pouce extension main dominante", "dominante main extension pouce totale ankylose", "ankylose totale extension pouce", "pouce extension ankylose totale"], rate: [25, 30], description: "Ankylose de toutes les articulations du pouce en position d'extension. Barème officiel." },
            { name: "Ankylose totale du pouce en flexion modérée (Main Dominante)", searchTerms: ["ankylose totale pouce flexion modérée main dominante", "dominante main modérée flexion pouce totale ankylose", "ankylose totale flexion modérée pouce", "pouce flexion modérée ankylose"], rate: [20, 25], description: "Ankylose de toutes les articulations du pouce en position de flexion modérée. Barème officiel." },
            { name: "Raideur d'une articulation du pouce (Main Dominante)", searchTerms: ["raideur d'une articulation pouce main dominante", "dominante main pouce articulation d'une raideur", "raideur d'une", "d'une articulation", "articulation pouce"], rate: [3, 8] },
        ]
      },
      {
        name: "Doigts - Pouce (Main Non Dominante)",
        injuries: [
            { name: "Ablation moitié phalange unguéale du pouce (Main Non Dominante)", searchTerms: ["ablation moitié phalange unguéale pouce main non dominante", "amputation moitié phalange unguéale pouce main non dominante", "dominante non main pouce unguéale phalange moitié ablation", "ablation moitié", "moitié phalange"], rate: 4 },
            { name: "Ablation phalange unguéale entière du pouce (Main Non Dominante)", searchTerms: ["ablation phalange unguéale entière pouce main non dominante", "amputation phalange unguéale entière pouce main non dominante", "dominante non main pouce entière unguéale phalange ablation", "ablation phalange", "phalange unguéale"], rate: 12 },
            { name: "Ablation 2 phalanges du pouce (Main Non Dominante)", searchTerms: ["ablation phalanges pouce main non dominante", "amputation phalanges pouce main non dominante", "dominante non main pouce phalanges ablation", "ablation phalanges", "phalanges pouce"], rate: [20, 25] },
            { name: "Ablation 2 phalanges + tête métacarpien du pouce (Main Non Dominante)", searchTerms: ["ablation phalanges tête métacarpien pouce main non dominante", "amputation phalanges tête métacarpien pouce main non dominante", "dominante non main pouce métacarpien tête phalanges ablation", "ablation phalanges", "phalanges tête"], rate: [20, 25] },
            { name: "Ablation 2 phalanges + métacarpien entier du pouce (Main Non Dominante)", searchTerms: ["ablation phalanges métacarpien entier pouce main non dominante", "amputation phalanges métacarpien entier pouce main non dominante", "dominante non main pouce entier métacarpien phalanges ablation", "ablation phalanges", "phalanges métacarpien"], rate: [25, 30] },
            { name: "Perte du pouce (2 phalanges) (Main Non Dominante)", searchTerms: ["perte pouce phalanges main non dominante", "amputation pouce phalanges main non dominante", "dominante non main phalanges pouce perte", "perte pouce", "pouce phalanges"], rate: 20 },
            { name: "Perte de la 2ème phalange du pouce (Main Non Dominante)", searchTerms: ["perte 2ème phalange pouce main non dominante", "amputation 2ème phalange pouce main non dominante", "dominante non main pouce phalange 2ème perte", "perte 2ème", "2ème phalange"], rate: 8 },
            { name: "Ankylose carpo-métacarpienne du pouce (Main Non Dominante)", searchTerms: ["ankylose carpo métacarpienne pouce main non dominante", "dominante non main pouce métacarpienne carpo ankylose", "ankylose carpo", "carpo métacarpienne", "métacarpienne pouce"], rate: [12, 15] },
            { name: "Ankylose métacarpo-phalangienne du pouce (Main Non Dominante)", searchTerms: ["ankylose métacarpo phalangienne pouce main non dominante", "dominante non main pouce phalangienne métacarpo ankylose", "ankylose métacarpo", "métacarpo phalangienne", "phalangienne pouce"], rate: [6, 8] },
            { name: "Ankylose inter-phalangienne du pouce (Main Non Dominante)", searchTerms: ["ankylose inter phalangienne pouce main non dominante", "dominante non main pouce phalangienne inter ankylose", "ankylose inter", "inter phalangienne", "phalangienne pouce"], rate: [4, 5] },
            { name: "Ankylose métacarpo-phalangienne et inter-phalangienne du pouce (Main Non Dominante)", searchTerms: ["ankylose métacarpo phalangienne inter phalangienne pouce main non dominante", "dominante non main pouce phalangienne inter phalangienne métacarpo ankylose", "ankylose métacarpo inter phalangienne pouce", "ankylose deux articulations pouce"], rate: [12, 14], description: "Ankylose des deux articulations du pouce (MCP et IPP). Barème officiel." },
            { name: "Ankylose totale du pouce en extension (Main Non Dominante)", searchTerms: ["ankylose totale pouce extension main non dominante", "dominante non main extension pouce totale ankylose", "ankylose totale extension pouce", "pouce extension ankylose totale"], rate: [20, 25], description: "Ankylose de toutes les articulations du pouce en position d'extension. Barème officiel." },
            { name: "Ankylose totale du pouce en flexion modérée (Main Non Dominante)", searchTerms: ["ankylose totale pouce flexion modérée main non dominante", "dominante non main modérée flexion pouce totale ankylose", "ankylose totale flexion modérée pouce", "pouce flexion modérée ankylose"], rate: [15, 20], description: "Ankylose de toutes les articulations du pouce en position de flexion modérée. Barème officiel." },
            { name: "Raideur d'une articulation du pouce (Main Non Dominante)", searchTerms: ["raideur d'une articulation pouce main non dominante", "dominante non main pouce articulation d'une raideur", "raideur d'une", "d'une articulation", "articulation pouce"], rate: [2, 6] },
        ]
      },
      {
        name: "Doigts - Index (Main Dominante)",
        injuries: [
            { name: "Ablation extrémité phalange unguéale de l'index (Main Dominante)", searchTerms: ["ablation extrémité phalange unguéale l'index main dominante", "amputation extrémité phalange unguéale l'index main dominante", "dominante main l'index unguéale phalange extrémité ablation", "ablation extrémité", "extrémité phalange"], rate: [3, 4] },
            { name: "Ablation phalange unguéale de l'index (Main Dominante)", searchTerms: ["ablation phalange unguéale l'index main dominante", "amputation phalange unguéale l'index main dominante", "dominante main l'index unguéale phalange ablation", "ablation phalange", "phalange unguéale"], rate: [6, 8] },
            { name: "Désarticulation 2ème phalange de l'index (Main Dominante)", searchTerms: ["désarticulation 2ème phalange l'index main dominante", "dominante main l'index phalange 2ème désarticulation", "désarticulation 2ème", "2ème phalange", "phalange l'index"], rate: 8, description: "Amputation de l'index au niveau de l'articulation IPD (inter-phalangienne distale). Barème officiel." },
            { name: "Ablation phalange unguéale + phalange intermédiaire de l'index (Main Dominante)", searchTerms: ["ablation phalange unguéale phalange intermédiaire l'index main dominante", "amputation phalange unguéale phalange intermédiaire l'index main dominante", "dominante main l'index intermédiaire phalange unguéale phalange ablation", "ablation phalange", "phalange unguéale"], rate: [6, 8] },
            { name: "Ablation 2 phalanges de l'index (Main Dominante)", searchTerms: ["ablation phalanges l'index main dominante", "amputation phalanges l'index main dominante", "dominante main l'index phalanges ablation", "ablation phalanges", "phalanges l'index"], rate: [6, 8] },
            { name: "Désarticulation 1ère phalange de l'index (Main Dominante)", searchTerms: ["désarticulation 1ère phalange l'index main dominante", "dominante main l'index phalange 1ère désarticulation", "désarticulation 1ère", "1ère phalange", "phalange l'index"], rate: 12, description: "Amputation de l'index au niveau de l'articulation IPP (inter-phalangienne proximale). Barème officiel." },
            { name: "Ablation 3 phalanges de l'index (Main Dominante)", searchTerms: ["ablation phalanges l'index main dominante", "amputation phalanges l'index main dominante", "dominante main l'index phalanges ablation", "ablation phalanges", "phalanges l'index"], rate: [12, 15] },
            { name: "Désarticulation métacarpo-phalangienne de l'index (Main Dominante)", searchTerms: ["désarticulation métacarpo phalangienne l'index main dominante", "dominante main l'index phalangienne métacarpo désarticulation", "désarticulation métacarpo", "métacarpo phalangienne", "phalangienne l'index"], rate: 15, description: "Amputation totale de l'index au niveau de l'articulation métacarpo-phalangienne. Barème officiel." },
            { name: "Ablation 3 phalanges + tête métacarpien de l'index (Main Dominante)", searchTerms: ["ablation phalanges tête métacarpien l'index main dominante", "amputation phalanges tête métacarpien l'index main dominante", "dominante main l'index métacarpien tête phalanges ablation", "ablation phalanges", "phalanges tête"], rate: [15, 18] },
            { name: "Ankylose métacarpo-phalangienne de l'index (Main Dominante)", searchTerms: ["ankylose métacarpo phalangienne l'index main dominante", "ankylose mcp index main dominante", "ankylose articulation métacarpo phalangienne index"], rate: [4, 5], description: "Ankylose de l'articulation métacarpo-phalangienne de l'index. Barème officiel." },
            { name: "Ankylose de la 1ère et 2ème phalange de l'index (IPP) (Main Dominante)", searchTerms: ["ankylose 1ère 2ème phalange l'index main dominante", "ankylose ipp index main dominante", "ankylose inter phalangienne proximale index"], rate: [8, 10], description: "Ankylose de l'articulation inter-phalangienne proximale (IPP) de l'index. Barème officiel." },
            { name: "Ankylose de la 2ème et 3ème phalange de l'index (IPD) (Main Dominante)", searchTerms: ["ankylose 2ème 3ème phalange l'index main dominante", "ankylose ipd index main dominante", "ankylose inter phalangienne distale index"], rate: [2, 3], description: "Ankylose de l'articulation inter-phalangienne distale (IPD) de l'index. Barème officiel." },
            { name: "Ankylose des deux dernières articulations de l'index (Main Dominante)", searchTerms: ["ankylose deux dernières articulations l'index main dominante", "ankylose ipp ipd index main dominante", "ankylose inter phalangiennes index"], rate: [8, 10], description: "Ankylose des articulations IPP et IPD de l'index. Barème officiel." },
            { name: "Ankylose de l'index (totalité - 3 articulations) (Main Dominante)", searchTerms: ["ankylose l'index totalité trois articulations main dominante", "ankylose totale index main dominante", "ankylose complète index"], rate: [13, 15], description: "Ankylose des trois articulations de l'index (MCP, IPP, IPD). Barème officiel." },
            { name: "Raideur d'une articulation de l'index (Main Dominante)", searchTerms: ["raideur d'une articulation l'index main dominante", "dominante main l'index articulation d'une raideur", "raideur d'une", "d'une articulation", "articulation l'index"], rate: [2, 5] },
        ]
      },
      {
        name: "Doigts - Index (Main Non Dominante)",
        injuries: [
            { name: "Ablation extrémité phalange unguéale de l'index (Main Non Dominante)", searchTerms: ["ablation extrémité phalange unguéale l'index main non dominante", "amputation extrémité phalange unguéale l'index main non dominante", "dominante non main l'index unguéale phalange extrémité ablation", "ablation extrémité", "extrémité phalange"], rate: 3 },
            { name: "Ablation phalange unguéale de l'index (Main Non Dominante)", searchTerms: ["ablation phalange unguéale l'index main non dominante", "amputation phalange unguéale l'index main non dominante", "dominante non main l'index unguéale phalange ablation", "ablation phalange", "phalange unguéale"], rate: [5, 6] },
            { name: "Ablation phalange unguéale + phalange intermédiaire de l'index (Main Non Dominante)", searchTerms: ["ablation phalange unguéale phalange intermédiaire l'index main non dominante", "amputation phalange unguéale phalange intermédiaire l'index main non dominante", "dominante non main l'index intermédiaire phalange unguéale phalange ablation", "ablation phalange", "phalange unguéale"], rate: [5, 6] },
            { name: "Ablation 2 phalanges de l'index (Main Non Dominante)", searchTerms: ["ablation phalanges l'index main non dominante", "amputation phalanges l'index main non dominante", "dominante non main l'index phalanges ablation", "ablation phalanges", "phalanges l'index"], rate: [5, 6] },
            { name: "Ablation 3 phalanges de l'index (Main Non Dominante)", searchTerms: ["ablation phalanges l'index main non dominante", "amputation phalanges l'index main non dominante", "dominante non main l'index phalanges ablation", "ablation phalanges", "phalanges l'index"], rate: [10, 12] },
            { name: "Ablation 3 phalanges + tête métacarpien de l'index (Main Non Dominante)", searchTerms: ["ablation phalanges tête métacarpien l'index main non dominante", "amputation phalanges tête métacarpien l'index main non dominante", "dominante non main l'index métacarpien tête phalanges ablation", "ablation phalanges", "phalanges tête"], rate: [12, 15] },
            { name: "Perte de l'index (3 phalanges) (Main Non Dominante)", searchTerms: ["perte l'index phalanges main non dominante", "amputation l'index phalanges main non dominante", "dominante non main phalanges l'index perte", "perte l'index", "l'index phalanges"], rate: 12 },
            { name: "Perte de la 3ème phalange de l'index (Main Non Dominante)", searchTerms: ["perte 3ème phalange l'index main non dominante", "amputation 3ème phalange l'index main non dominante", "dominante non main l'index phalange 3ème perte", "perte 3ème", "3ème phalange"], rate: 4 },
            { name: "Perte de la 2ème phalange seule de l'index (P2 seule) (Main Non Dominante)", searchTerms: ["perte 2ème phalange seule l'index seule main non dominante", "amputation 2ème phalange seule l'index seule main non dominante", "dominante non main seule l'index seule phalange 2ème perte", "perte 2ème", "2ème phalange"], rate: 4 },
            { name: "Perte de la 2ème phalange de l'index (Main Non Dominante)", searchTerms: ["perte 2ème phalange l'index main non dominante", "amputation 2ème phalange l'index main non dominante", "dominante non main l'index phalange 2ème perte", "perte 2ème", "2ème phalange"], rate: 4 },
            { name: "Perte des 2ème et 3ème phalanges de l'index (Main Non Dominante)", searchTerms: ["perte des 2ème 3ème phalanges l'index main non dominante", "amputation des 2ème 3ème phalanges l'index main non dominante", "dominante non main l'index phalanges 3ème 2ème des perte", "perte 2ème 3ème phalanges l'index main non dominante", "perte des"], rate: 8 },
            { name: "Ankylose métacarpo-phalangienne de l'index (Main Non Dominante)", searchTerms: ["ankylose métacarpo phalangienne l'index main non dominante", "ankylose mcp index main non dominante", "ankylose articulation métacarpo phalangienne index"], rate: [3, 4], description: "Ankylose de l'articulation métacarpo-phalangienne de l'index. Barème officiel." },
            { name: "Ankylose de la 1ère et 2ème phalange de l'index (IPP) (Main Non Dominante)", searchTerms: ["ankylose 1ère 2ème phalange l'index main non dominante", "ankylose ipp index main non dominante", "ankylose inter phalangienne proximale index"], rate: [6, 8], description: "Ankylose de l'articulation inter-phalangienne proximale (IPP) de l'index. Barème officiel." },
            { name: "Ankylose de la 2ème et 3ème phalange de l'index (IPD) (Main Non Dominante)", searchTerms: ["ankylose 2ème 3ème phalange l'index main non dominante", "ankylose ipd index main non dominante", "ankylose inter phalangienne distale index"], rate: [0, 1], description: "Ankylose de l'articulation inter-phalangienne distale (IPD) de l'index. Barème officiel." },
            { name: "Ankylose des deux dernières articulations de l'index (Main Non Dominante)", searchTerms: ["ankylose deux dernières articulations l'index main non dominante", "ankylose ipp ipd index main non dominante", "ankylose inter phalangiennes index"], rate: [6, 8], description: "Ankylose des articulations IPP et IPD de l'index. Barème officiel." },
            { name: "Ankylose de l'index (totalité - 3 articulations) (Main Non Dominante)", searchTerms: ["ankylose l'index totalité trois articulations main non dominante", "ankylose totale index main non dominante", "ankylose complète index"], rate: [10, 12], description: "Ankylose des trois articulations de l'index (MCP, IPP, IPD). Barème officiel." },
            { name: "Raideur d'une articulation de l'index (Main Non Dominante)", searchTerms: ["raideur d'une articulation l'index main non dominante", "dominante non main l'index articulation d'une raideur", "raideur d'une", "d'une articulation", "articulation l'index"], rate: [1, 4] },
        ]
      },
      {
        name: "Doigts - Médius (Main Dominante)",
        injuries: [
            { name: "Ablation extrémité phalange unguéale du médius (Main Dominante)", searchTerms: ["ablation extrémité phalange unguéale médius main dominante", "amputation extrémité phalange unguéale médius main dominante", "dominante main médius unguéale phalange extrémité ablation", "ablation extrémité", "extrémité phalange"], rate: 1 },
            { name: "Ablation phalange unguéale du médius (Main Dominante)", searchTerms: ["ablation phalange unguéale médius main dominante", "amputation phalange unguéale médius main dominante", "dominante main médius unguéale phalange ablation", "ablation phalange", "phalange unguéale"], rate: [4, 6] },
            { name: "Désarticulation 2ème phalange du médius (Main Dominante)", searchTerms: ["désarticulation 2ème phalange médius main dominante", "dominante main médius phalange 2ème désarticulation", "désarticulation 2ème", "2ème phalange", "phalange médius"], rate: 6, description: "Amputation du médius au niveau de l'articulation IPD (inter-phalangienne distale). Barème officiel." },
            { name: "Ablation phalange unguéale + phalange intermédiaire du médius (Main Dominante)", searchTerms: ["ablation phalange unguéale phalange intermédiaire médius main dominante", "amputation phalange unguéale phalange intermédiaire médius main dominante", "dominante main médius intermédiaire phalange unguéale phalange ablation", "ablation phalange", "phalange unguéale"], rate: [4, 6] },
            { name: "Ablation 2 phalanges du médius (Main Dominante)", searchTerms: ["ablation phalanges médius main dominante", "amputation phalanges médius main dominante", "dominante main médius phalanges ablation", "ablation phalanges", "phalanges médius"], rate: [4, 6] },
            { name: "Désarticulation 1ère phalange du médius (Main Dominante)", searchTerms: ["désarticulation 1ère phalange médius main dominante", "dominante main médius phalange 1ère désarticulation", "désarticulation 1ère", "1ère phalange", "phalange médius"], rate: 10, description: "Amputation du médius au niveau de l'articulation IPP (inter-phalangienne proximale). Barème officiel." },
            { name: "Désarticulation métacarpo-phalangienne du médius (Main Dominante)", searchTerms: ["désarticulation métacarpo phalangienne médius main dominante", "dominante main médius phalangienne métacarpo désarticulation", "désarticulation métacarpo", "métacarpo phalangienne", "phalangienne médius"], rate: 12, description: "Amputation totale du médius au niveau de l'articulation métacarpo-phalangienne. Barème officiel." },
            { name: "Ablation 3 phalanges du médius (Main Dominante)", searchTerms: ["ablation phalanges médius main dominante", "amputation phalanges médius main dominante", "dominante main médius phalanges ablation", "ablation phalanges", "phalanges médius"], rate: 12 },
            { name: "Ankylose métacarpo-phalangienne du médius (Main Dominante)", searchTerms: ["ankylose métacarpo phalangienne médius main dominante", "ankylose mcp médius main dominante", "ankylose articulation métacarpo phalangienne médius"], rate: [3, 4], description: "Ankylose de l'articulation métacarpo-phalangienne du médius. Barème officiel." },
            { name: "Ankylose de la 1ère et 2ème phalange du médius (IPP) (Main Dominante)", searchTerms: ["ankylose 1ère 2ème phalange médius main dominante", "ankylose ipp médius main dominante", "ankylose inter phalangienne proximale médius"], rate: [6, 7], description: "Ankylose de l'articulation inter-phalangienne proximale (IPP) du médius. Barème officiel." },
            { name: "Ankylose de la 2ème et 3ème phalange du médius (IPD) (Main Dominante)", searchTerms: ["ankylose 2ème 3ème phalange médius main dominante", "ankylose ipd médius main dominante", "ankylose inter phalangienne distale médius"], rate: [1, 2], description: "Ankylose de l'articulation inter-phalangienne distale (IPD) du médius. Barème officiel." },
            { name: "Ankylose des deux dernières articulations du médius (Main Dominante)", searchTerms: ["ankylose deux dernières articulations médius main dominante", "ankylose ipp ipd médius main dominante", "ankylose inter phalangiennes médius"], rate: [8, 10], description: "Ankylose des articulations IPP et IPD du médius. Barème officiel." },
            { name: "Ankylose du médius (totalité - 3 articulations) (Main Dominante)", searchTerms: ["ankylose médius totalité trois articulations main dominante", "ankylose totale médius main dominante", "ankylose complète médius"], rate: [12, 15], description: "Ankylose des trois articulations du médius (MCP, IPP, IPD). Barème officiel." },
            { name: "Raideur d'une articulation du médius (Main Dominante)", searchTerms: ["raideur d'une articulation médius main dominante", "dominante main médius articulation d'une raideur", "raideur d'une", "d'une articulation", "articulation médius"], rate: [1, 4] },
            { name: "Raideur du médius (Main Dominante)", searchTerms: ["raideur médius main dominante", "dominante main médius raideur", "raideur médius", "médius main", "main dominante"], rate: [2, 5] },
        ]
      },
      {
        name: "Doigts - Médius (Main Non Dominante)",
        injuries: [
            { name: "Ablation extrémité phalange unguéale du médius (Main Non Dominante)", searchTerms: ["ablation extrémité phalange unguéale médius main non dominante", "amputation extrémité phalange unguéale médius main non dominante", "dominante non main médius unguéale phalange extrémité ablation", "ablation extrémité", "extrémité phalange"], rate: 1 },
            { name: "Ablation phalange unguéale du médius (Main Non Dominante)", searchTerms: ["ablation phalange unguéale médius main non dominante", "amputation phalange unguéale médius main non dominante", "dominante non main médius unguéale phalange ablation", "ablation phalange", "phalange unguéale"], rate: [3, 5] },
            { name: "Ablation phalange unguéale + phalange intermédiaire du médius (Main Non Dominante)", searchTerms: ["ablation phalange unguéale phalange intermédiaire médius main non dominante", "amputation phalange unguéale phalange intermédiaire médius main non dominante", "dominante non main médius intermédiaire phalange unguéale phalange ablation", "ablation phalange", "phalange unguéale"], rate: [3, 5] },
            { name: "Ablation 2 phalanges du médius (Main Non Dominante)", searchTerms: ["ablation phalanges médius main non dominante", "amputation phalanges médius main non dominante", "dominante non main médius phalanges ablation", "ablation phalanges", "phalanges médius"], rate: [3, 5] },
            { name: "Ablation 3 phalanges du médius (Main Non Dominante)", searchTerms: ["ablation phalanges médius main non dominante", "amputation phalanges médius main non dominante", "dominante non main médius phalanges ablation", "ablation phalanges", "phalanges médius"], rate: 10 },
            { name: "Amputation du médius (main non dominante)", searchTerms: ["amputation médius main non dominante", "dominante non main médius amputation", "amputation médius", "médius main", "main non"], rate: 8 },
            { name: "Perte du médius (3 phalanges) (Main Non Dominante)", searchTerms: ["perte médius phalanges main non dominante", "amputation médius phalanges main non dominante", "dominante non main phalanges médius perte", "perte médius", "médius phalanges"], rate: 10 },
            { name: "Perte de la 3ème phalange du médius (Main Non Dominante)", searchTerms: ["perte 3ème phalange médius main non dominante", "amputation 3ème phalange médius main non dominante", "dominante non main médius phalange 3ème perte", "perte 3ème", "3ème phalange"], rate: 3 },
            { name: "Perte de la 2ème phalange seule du médius (P2 seule) (Main Non Dominante)", searchTerms: ["perte 2ème phalange seule médius seule main non dominante", "amputation 2ème phalange seule médius seule main non dominante", "dominante non main seule médius seule phalange 2ème perte", "perte 2ème", "2ème phalange"], rate: 3 },
            { name: "Perte de la 2ème phalange du médius (Main Non Dominante)", searchTerms: ["perte 2ème phalange médius main non dominante", "amputation 2ème phalange médius main non dominante", "dominante non main médius phalange 2ème perte", "perte 2ème", "2ème phalange"], rate: 3 },
            { name: "Perte des 2ème et 3ème phalanges du médius (Main Non Dominante)", searchTerms: ["perte des 2ème 3ème phalanges médius main non dominante", "amputation des 2ème 3ème phalanges médius main non dominante", "dominante non main médius phalanges 3ème 2ème des perte", "perte 2ème 3ème phalanges médius main non dominante", "perte des"], rate: 6 },
            { name: "Ankylose métacarpo-phalangienne du médius (Main Non Dominante)", searchTerms: ["ankylose métacarpo phalangienne médius main non dominante", "ankylose mcp médius main non dominante", "ankylose articulation métacarpo phalangienne médius"], rate: [1, 2], description: "Ankylose de l'articulation métacarpo-phalangienne du médius. Barème officiel." },
            { name: "Ankylose de la 1ère et 2ème phalange du médius (IPP) (Main Non Dominante)", searchTerms: ["ankylose 1ère 2ème phalange médius main non dominante", "ankylose ipp médius main non dominante", "ankylose inter phalangienne proximale médius"], rate: [4, 5], description: "Ankylose de l'articulation inter-phalangienne proximale (IPP) du médius. Barème officiel." },
            { name: "Ankylose de la 2ème et 3ème phalange du médius (IPD) (Main Non Dominante)", searchTerms: ["ankylose 2ème 3ème phalange médius main non dominante", "ankylose ipd médius main non dominante", "ankylose inter phalangienne distale médius"], rate: [0, 1], description: "Ankylose de l'articulation inter-phalangienne distale (IPD) du médius. Barème officiel." },
            { name: "Ankylose des deux dernières articulations du médius (Main Non Dominante)", searchTerms: ["ankylose deux dernières articulations médius main non dominante", "ankylose ipp ipd médius main non dominante", "ankylose inter phalangiennes médius"], rate: [6, 8], description: "Ankylose des articulations IPP et IPD du médius. Barème officiel." },
            { name: "Ankylose du médius (totalité - 3 articulations) (Main Non Dominante)", searchTerms: ["ankylose médius totalité trois articulations main non dominante", "ankylose totale médius main non dominante", "ankylose complète médius"], rate: [10, 12], description: "Ankylose des trois articulations du médius (MCP, IPP, IPD). Barème officiel." },
            { name: "Raideur d'une articulation du médius (Main Non Dominante)", searchTerms: ["raideur d'une articulation médius main non dominante", "dominante non main médius articulation d'une raideur", "raideur d'une", "d'une articulation", "articulation médius"], rate: [1, 3] },
            { name: "Raideur du médius (Main Non Dominante)", searchTerms: ["raideur médius main non dominante", "dominante non main médius raideur", "raideur médius", "médius main", "main non"], rate: [1, 4] },
        ]
      },
      {
        name: "Doigts - Annulaire (Main Dominante)",
        injuries: [
            { name: "Ablation extrémité phalange unguéale de l'annulaire (Main Dominante)", searchTerms: ["ablation extrémité phalange unguéale l'annulaire main dominante", "amputation extrémité phalange unguéale l'annulaire main dominante", "dominante main l'annulaire unguéale phalange extrémité ablation", "ablation extrémité", "extrémité phalange"], rate: 1 },
            { name: "Ablation phalange unguéale de l'annulaire (Main Dominante)", searchTerms: ["ablation phalange unguéale l'annulaire main dominante", "amputation phalange unguéale l'annulaire main dominante", "dominante main l'annulaire unguéale phalange ablation", "ablation phalange", "phalange unguéale"], rate: [3, 5] },
            { name: "Désarticulation 2ème phalange de l'annulaire (Main Dominante)", searchTerms: ["désarticulation 2ème phalange l'annulaire main dominante", "dominante main l'annulaire phalange 2ème désarticulation", "désarticulation 2ème", "2ème phalange", "phalange l'annulaire"], rate: 5, description: "Amputation de l'annulaire au niveau de l'articulation IPD (inter-phalangienne distale). Barème officiel." },
            { name: "Ablation phalange unguéale + phalange intermédiaire de l'annulaire (Main Dominante)", searchTerms: ["ablation phalange unguéale phalange intermédiaire l'annulaire main dominante", "amputation phalange unguéale phalange intermédiaire l'annulaire main dominante", "dominante main l'annulaire intermédiaire phalange unguéale phalange ablation", "ablation phalange", "phalange unguéale"], rate: [3, 5] },
            { name: "Ablation 2 phalanges de l'annulaire (Main Dominante)", searchTerms: ["ablation phalanges l'annulaire main dominante", "amputation phalanges l'annulaire main dominante", "dominante main l'annulaire phalanges ablation", "ablation phalanges", "phalanges l'annulaire"], rate: [3, 5] },
            { name: "Désarticulation 1ère phalange de l'annulaire (Main Dominante)", searchTerms: ["désarticulation 1ère phalange l'annulaire main dominante", "dominante main l'annulaire phalange 1ère désarticulation", "désarticulation 1ère", "1ère phalange", "phalange l'annulaire"], rate: 8, description: "Amputation de l'annulaire au niveau de l'articulation IPP (inter-phalangienne proximale). Barème officiel." },
            { name: "Ablation 3 phalanges de l'annulaire (Main Dominante)", searchTerms: ["ablation phalanges l'annulaire main dominante", "amputation phalanges l'annulaire main dominante", "dominante main l'annulaire phalanges ablation", "ablation phalanges", "phalanges l'annulaire"], rate: 10 },
            { name: "Désarticulation métacarpo-phalangienne de l'annulaire (Main Dominante)", searchTerms: ["désarticulation métacarpo phalangienne l'annulaire main dominante", "dominante main l'annulaire phalangienne métacarpo désarticulation", "désarticulation métacarpo", "métacarpo phalangienne", "phalangienne l'annulaire"], rate: 10, description: "Amputation totale de l'annulaire au niveau de l'articulation métacarpo-phalangienne. Barème officiel." },
            { name: "Ankylose métacarpo-phalangienne de l'annulaire (Main Dominante)", searchTerms: ["ankylose métacarpo phalangienne l'annulaire main dominante", "ankylose mcp annulaire main dominante", "ankylose articulation métacarpo phalangienne annulaire"], rate: [2, 3], description: "Ankylose de l'articulation métacarpo-phalangienne de l'annulaire. Barème officiel." },
            { name: "Ankylose de la 1ère et 2ème phalange de l'annulaire (IPP) (Main Dominante)", searchTerms: ["ankylose 1ère 2ème phalange l'annulaire main dominante", "ankylose ipp annulaire main dominante", "ankylose inter phalangienne proximale annulaire"], rate: [5, 6], description: "Ankylose de l'articulation inter-phalangienne proximale (IPP) de l'annulaire. Barème officiel." },
            { name: "Ankylose de la 2ème et 3ème phalange de l'annulaire (IPD) (Main Dominante)", searchTerms: ["ankylose 2ème 3ème phalange l'annulaire main dominante", "ankylose ipd annulaire main dominante", "ankylose inter phalangienne distale annulaire"], rate: [1, 2], description: "Ankylose de l'articulation inter-phalangienne distale (IPD) de l'annulaire. Barème officiel." },
            { name: "Ankylose des deux dernières articulations de l'annulaire (Main Dominante)", searchTerms: ["ankylose deux dernières articulations l'annulaire main dominante", "ankylose ipp ipd annulaire main dominante", "ankylose inter phalangiennes annulaire"], rate: [8, 10], description: "Ankylose des articulations IPP et IPD de l'annulaire. Barème officiel." },
            { name: "Ankylose de l'annulaire (totalité - 3 articulations) (Main Dominante)", searchTerms: ["ankylose l'annulaire totalité trois articulations main dominante", "ankylose totale annulaire main dominante", "ankylose complète annulaire"], rate: [10, 12], description: "Ankylose des trois articulations de l'annulaire (MCP, IPP, IPD). Barème officiel." },
            { name: "Raideur d'une articulation de l'annulaire (Main Dominante)", searchTerms: ["raideur d'une articulation l'annulaire main dominante", "dominante main l'annulaire articulation d'une raideur", "raideur d'une", "d'une articulation", "articulation l'annulaire"], rate: [3, 8] },
            { name: "Raideur de l'annulaire (Main Dominante)", searchTerms: ["raideur l'annulaire main dominante", "dominante main l'annulaire raideur", "raideur l'annulaire", "l'annulaire main", "main dominante"], rate: [3, 8] },
        ]
      },
      {
        name: "Doigts - Annulaire (Main Non Dominante)",
        injuries: [
            { name: "Ablation extrémité phalange unguéale de l'annulaire (Main Non Dominante)", searchTerms: ["ablation extrémité phalange unguéale l'annulaire main non dominante", "amputation extrémité phalange unguéale l'annulaire main non dominante", "dominante non main l'annulaire unguéale phalange extrémité ablation", "ablation extrémité", "extrémité phalange"], rate: 1 },
            { name: "Ablation phalange unguéale de l'annulaire (Main Non Dominante)", searchTerms: ["ablation phalange unguéale l'annulaire main non dominante", "amputation phalange unguéale l'annulaire main non dominante", "dominante non main l'annulaire unguéale phalange ablation", "ablation phalange", "phalange unguéale"], rate: 2 },
            { name: "Ablation phalange unguéale + phalange intermédiaire de l'annulaire (Main Non Dominante)", searchTerms: ["ablation phalange unguéale phalange intermédiaire l'annulaire main non dominante", "amputation phalange unguéale phalange intermédiaire l'annulaire main non dominante", "dominante non main l'annulaire intermédiaire phalange unguéale phalange ablation", "ablation phalange", "phalange unguéale"], rate: 3 },
            { name: "Ablation 2 phalanges de l'annulaire (Main Non Dominante)", searchTerms: ["ablation phalanges l'annulaire main non dominante", "amputation phalanges l'annulaire main non dominante", "dominante non main l'annulaire phalanges ablation", "ablation phalanges", "phalanges l'annulaire"], rate: 4 },
            { name: "Désarticulation 2ème phalange de l'annulaire (Main Non Dominante)", searchTerms: ["désarticulation 2ème phalange l'annulaire main non dominante", "dominante non main l'annulaire phalange 2ème désarticulation", "désarticulation 2ème", "2ème phalange", "phalange l'annulaire"], rate: 5, description: "Amputation de l'annulaire au niveau de l'articulation IPD. Barème officiel." },
            { name: "Désarticulation 1ère phalange de l'annulaire (Main Non Dominante)", searchTerms: ["désarticulation 1ère phalange l'annulaire main non dominante", "dominante non main l'annulaire phalange 1ère désarticulation", "désarticulation 1ère", "1ère phalange", "phalange l'annulaire"], rate: 6, description: "Amputation de l'annulaire au niveau de l'articulation IPP. Barème officiel." },
            { name: "Ablation 3 phalanges de l'annulaire (Main Non Dominante)", searchTerms: ["ablation phalanges l'annulaire main non dominante", "amputation phalanges l'annulaire main non dominante", "dominante non main l'annulaire phalanges ablation", "ablation phalanges", "phalanges l'annulaire"], rate: 7 },
            { name: "Désarticulation métacarpo-phalangienne de l'annulaire (Main Non Dominante)", searchTerms: ["désarticulation métacarpo phalangienne l'annulaire main non dominante", "dominante non main l'annulaire phalangienne métacarpo désarticulation", "désarticulation métacarpo", "métacarpo phalangienne", "phalangienne l'annulaire"], rate: 10, description: "Amputation totale de l'annulaire au niveau de l'articulation MCP. Barème officiel." },
            { name: "Ankylose métacarpo-phalangienne de l'annulaire (Main Non Dominante)", searchTerms: ["ankylose métacarpo phalangienne l'annulaire main non dominante", "ankylose mcp annulaire main non dominante", "ankylose articulation métacarpo phalangienne annulaire"], rate: [0, 1], description: "Ankylose de l'articulation métacarpo-phalangienne de l'annulaire. Barème officiel." },
            { name: "Ankylose de la 1ère et 2ème phalange de l'annulaire (IPP) (Main Non Dominante)", searchTerms: ["ankylose 1ère 2ème phalange l'annulaire main non dominante", "ankylose ipp annulaire main non dominante", "ankylose inter phalangienne proximale annulaire"], rate: [3, 4], description: "Ankylose de l'articulation inter-phalangienne proximale (IPP) de l'annulaire. Barème officiel." },
            { name: "Ankylose de la 2ème et 3ème phalange de l'annulaire (IPD) (Main Non Dominante)", searchTerms: ["ankylose 2ème 3ème phalange l'annulaire main non dominante", "ankylose ipd annulaire main non dominante", "ankylose inter phalangienne distale annulaire"], rate: [0, 1], description: "Ankylose de l'articulation inter-phalangienne distale (IPD) de l'annulaire. Barème officiel." },
            { name: "Ankylose des deux dernières articulations de l'annulaire (Main Non Dominante)", searchTerms: ["ankylose deux dernières articulations l'annulaire main non dominante", "ankylose ipp ipd annulaire main non dominante", "ankylose inter phalangiennes annulaire"], rate: [6, 8], description: "Ankylose des articulations IPP et IPD de l'annulaire. Barème officiel." },
            { name: "Ankylose de l'annulaire (totalité - 3 articulations) (Main Non Dominante)", searchTerms: ["ankylose l'annulaire totalité trois articulations main non dominante", "ankylose totale annulaire main non dominante", "ankylose complète annulaire"], rate: [7, 9], description: "Ankylose des trois articulations de l'annulaire (MCP, IPP, IPD). Barème officiel." },
            { name: "Raideur d'une articulation de l'annulaire (Main Non Dominante)", searchTerms: ["raideur d'une articulation l'annulaire main non dominante", "dominante non main l'annulaire articulation d'une raideur", "raideur d'une", "d'une articulation", "articulation l'annulaire"], rate: [1, 2] },
            { name: "Raideur de l'annulaire (Main Non Dominante)", searchTerms: ["raideur l'annulaire main non dominante", "dominante non main l'annulaire raideur", "raideur l'annulaire", "l'annulaire main", "main non"], rate: [1, 3] },
        ]
      },
      {
        name: "Doigts - Auriculaire (Main Dominante)",
        injuries: [
            { name: "Ablation extrémité phalange unguéale de l'auriculaire (Main Dominante)", searchTerms: ["ablation extrémité phalange unguéale l'auriculaire main dominante", "amputation extrémité phalange unguéale l'auriculaire main dominante", "dominante main l'auriculaire unguéale phalange extrémité ablation", "ablation extrémité", "extrémité phalange"], rate: 1 },
            { name: "Ablation phalange unguéale de l'auriculaire (Main Dominante)", searchTerms: ["ablation phalange unguéale l'auriculaire main dominante", "amputation phalange unguéale l'auriculaire main dominante", "dominante main l'auriculaire unguéale phalange ablation", "ablation phalange", "phalange unguéale"], rate: [2, 4] },
            { name: "Désarticulation 2ème phalange de l'auriculaire (Main Dominante)", searchTerms: ["désarticulation 2ème phalange l'auriculaire main dominante", "dominante main l'auriculaire phalange 2ème désarticulation", "désarticulation 2ème", "2ème phalange", "phalange l'auriculaire"], rate: 4, description: "Amputation de l'auriculaire au niveau de l'articulation IPD (inter-phalangienne distale). Barème officiel." },
            { name: "Ablation 2 phalanges de l'auriculaire (Main Dominante)", searchTerms: ["ablation phalanges l'auriculaire main dominante", "amputation phalanges l'auriculaire main dominante", "dominante main l'auriculaire phalanges ablation", "ablation phalanges", "phalanges l'auriculaire"], rate: 6 },
            { name: "Désarticulation 1ère phalange de l'auriculaire (Main Dominante)", searchTerms: ["désarticulation 1ère phalange l'auriculaire main dominante", "dominante main l'auriculaire phalange 1ère désarticulation", "désarticulation 1ère", "1ère phalange", "phalange l'auriculaire"], rate: 6, description: "Amputation de l'auriculaire au niveau de l'articulation IPP (inter-phalangienne proximale). Barème officiel." },
            { name: "Désarticulation métacarpo-phalangienne de l'auriculaire (Main Dominante)", searchTerms: ["désarticulation métacarpo phalangienne l'auriculaire main dominante", "dominante main l'auriculaire phalangienne métacarpo désarticulation", "désarticulation métacarpo", "métacarpo phalangienne", "phalangienne l'auriculaire"], rate: 8, description: "Amputation totale de l'auriculaire au niveau de l'articulation métacarpo-phalangienne. Barème officiel." },
            // 🆕 V3.3.169: POLYTRAUMATISME NUMÉRIQUE - AMPUTATION D5 + LUXATIONS M4-M5 + AMYOTROPHIE + NEUROPATHIE CUBITALTE
            { name: "Polytraumatisme main - Amputation D5 + Luxations M4-M5 avec amyotrophie et déviation digitale (Main Dominante)", searchTerms: ["amputation d5 luxation m4 m5 amyotrophie déviation", "amputation auriculaire luxation métacarpienne amyotrophie main", "polytraumatisme main amputation d5 amyotrophie", "amputation d5 avec luxation métacarpienne amyotrophie déviation", "amputation d5 amyotrophie déviation", "amputation d5 m4 m5 amyotrophie", "amputation auriculaire amyotrophie main déviation", "d5 luxation m4 m5 amyotrophie", "d5 m4 m5 déviation cicatrice", "amputation d5 amyotrophie cicatrice rétractile"], rate: [20, 30], description: "Polytraumatisme numérique: amputation D5 (auriculaire) + luxations M4-M5 associées à amyotrophie intrinsèque (nerf cubital) + déviation digitale (D2-D3-D4) + cicatrice rétractile + diminution force serrage. Cumul intra-main = Évaluation par taux global de 20-30%.", rateCriteria: { low: "Amyotrophie légère, déviation mineure, serrage modérément réduit", high: "Amyotrophie marquée, déviation importante D2-D3-D4, serrage très réduit, limitation importante des activités manuelles" } },
            { name: "Ablation 3 phalanges de l'auriculaire (Main Dominante)", searchTerms: ["ablation phalanges l'auriculaire main dominante", "amputation phalanges l'auriculaire main dominante", "dominante main l'auriculaire phalanges ablation", "ablation phalanges", "phalanges l'auriculaire"], rate: [6, 8] },
            { name: "Ankylose métacarpo-phalangienne de l'auriculaire (Main Dominante)", searchTerms: ["ankylose métacarpo phalangienne l'auriculaire main dominante", "ankylose mcp auriculaire main dominante", "ankylose articulation métacarpo phalangienne auriculaire"], rate: [1, 2], description: "Ankylose de l'articulation métacarpo-phalangienne de l'auriculaire. Barème officiel." },
            { name: "Ankylose de la 1ère et 2ème phalange de l'auriculaire (IPP) (Main Dominante)", searchTerms: ["ankylose 1ère 2ème phalange l'auriculaire main dominante", "ankylose ipp auriculaire main dominante", "ankylose inter phalangienne proximale auriculaire"], rate: [3, 4], description: "Ankylose de l'articulation inter-phalangienne proximale (IPP) de l'auriculaire. Barème officiel." },
            { name: "Ankylose de la 2ème et 3ème phalange de l'auriculaire (IPD) (Main Dominante)", searchTerms: ["ankylose 2ème 3ème phalange l'auriculaire main dominante", "ankylose ipd auriculaire main dominante", "ankylose inter phalangienne distale auriculaire"], rate: [1, 2], description: "Ankylose de l'articulation inter-phalangienne distale (IPD) de l'auriculaire. Barème officiel." },
            { name: "Ankylose des deux dernières articulations de l'auriculaire (Main Dominante)", searchTerms: ["ankylose deux dernières articulations l'auriculaire main dominante", "ankylose ipp ipd auriculaire main dominante", "ankylose inter phalangiennes auriculaire"], rate: [5, 6], description: "Ankylose des articulations IPP et IPD de l'auriculaire. Barème officiel." },
            { name: "Ankylose de l'auriculaire (totalité - 3 articulations) (Main Dominante)", searchTerms: ["ankylose l'auriculaire totalité trois articulations main dominante", "ankylose totale auriculaire main dominante", "ankylose complète auriculaire"], rate: [8, 10], description: "Ankylose des trois articulations de l'auriculaire (MCP, IPP, IPD). Barème officiel." },
            { name: "Raideur d'une articulation de l'auriculaire (Main Dominante)", searchTerms: ["raideur d'une articulation l'auriculaire main dominante", "dominante main l'auriculaire articulation d'une raideur", "raideur d'une", "d'une articulation", "articulation l'auriculaire"], rate: [1, 3] },
            { name: "Raideur de l'auriculaire (Main Dominante)", searchTerms: ["raideur l'auriculaire main dominante", "dominante main l'auriculaire raideur", "raideur l'auriculaire", "l'auriculaire main", "main dominante"], rate: [1, 3] },
        ]
      },
      {
        name: "Doigts - Auriculaire (Main Non Dominante)",
        injuries: [
            { name: "Ablation extrémité phalange unguéale de l'auriculaire (Main Non Dominante)", searchTerms: ["ablation extrémité phalange unguéale l'auriculaire main non dominante", "amputation extrémité phalange unguéale l'auriculaire main non dominante", "dominante non main l'auriculaire unguéale phalange extrémité ablation", "ablation extrémité", "extrémité phalange"], rate: 1 },
            { name: "Ablation phalange unguéale de l'auriculaire (Main Non Dominante)", searchTerms: ["ablation phalange unguéale l'auriculaire main non dominante", "amputation phalange unguéale l'auriculaire main non dominante", "dominante non main l'auriculaire unguéale phalange ablation", "ablation phalange", "phalange unguéale"], rate: 2 },
            { name: "Désarticulation 2ème phalange de l'auriculaire (Main Non Dominante)", searchTerms: ["désarticulation 2ème phalange l'auriculaire main non dominante", "dominante non main l'auriculaire phalange 2ème désarticulation", "désarticulation 2ème", "2ème phalange", "phalange l'auriculaire"], rate: 4, description: "Amputation de l'auriculaire au niveau de l'articulation IPD. Barème officiel." },
            { name: "Ablation 2 phalanges de l'auriculaire (Main Non Dominante)", searchTerms: ["ablation phalanges l'auriculaire main non dominante", "amputation phalanges l'auriculaire main non dominante", "dominante non main l'auriculaire phalanges ablation", "ablation phalanges", "phalanges l'auriculaire"], rate: [2, 3] },
            { name: "Désarticulation 1ère phalange de l'auriculaire (Main Non Dominante)", searchTerms: ["désarticulation 1ère phalange l'auriculaire main non dominante", "dominante non main l'auriculaire phalange 1ère désarticulation", "désarticulation 1ère", "1ère phalange", "phalange l'auriculaire"], rate: 5, description: "Amputation de l'auriculaire au niveau de l'articulation IPP. Barème officiel." },
            { name: "Désarticulation métacarpo-phalangienne de l'auriculaire (Main Non Dominante)", searchTerms: ["désarticulation métacarpo phalangienne l'auriculaire main non dominante", "dominante non main l'auriculaire phalangienne métacarpo désarticulation", "désarticulation métacarpo", "métacarpo phalangienne", "phalangienne l'auriculaire"], rate: 8, description: "Amputation totale de l'auriculaire au niveau de l'articulation MCP. Barème officiel." },
            { name: "Ablation 3 phalanges de l'auriculaire (Main Non Dominante)", searchTerms: ["ablation phalanges l'auriculaire main non dominante", "amputation phalanges l'auriculaire main non dominante", "dominante non main l'auriculaire phalanges ablation", "ablation phalanges", "phalanges l'auriculaire"], rate: [5, 6] },
            { name: "Ankylose métacarpo-phalangienne de l'auriculaire (Main Non Dominante)", searchTerms: ["ankylose métacarpo phalangienne l'auriculaire main non dominante", "ankylose mcp auriculaire main non dominante", "ankylose articulation métacarpo phalangienne auriculaire"], rate: [0, 1], description: "Ankylose de l'articulation métacarpo-phalangienne de l'auriculaire. Barème officiel." },
            { name: "Ankylose de la 1ère et 2ème phalange de l'auriculaire (IPP) (Main Non Dominante)", searchTerms: ["ankylose 1ère 2ème phalange l'auriculaire main non dominante", "ankylose ipp auriculaire main non dominante", "ankylose inter phalangienne proximale auriculaire"], rate: [1, 2], description: "Ankylose de l'articulation inter-phalangienne proximale (IPP) de l'auriculaire. Barème officiel." },
            { name: "Ankylose de la 2ème et 3ème phalange de l'auriculaire (IPD) (Main Non Dominante)", searchTerms: ["ankylose 2ème 3ème phalange l'auriculaire main non dominante", "ankylose ipd auriculaire main non dominante", "ankylose inter phalangienne distale auriculaire"], rate: [0, 1], description: "Ankylose de l'articulation inter-phalangienne distale (IPD) de l'auriculaire. Barème officiel." },
            { name: "Ankylose des deux dernières articulations de l'auriculaire (Main Non Dominante)", searchTerms: ["ankylose deux dernières articulations l'auriculaire main non dominante", "ankylose ipp ipd auriculaire main non dominante", "ankylose inter phalangiennes auriculaire"], rate: [3, 4], description: "Ankylose des articulations IPP et IPD de l'auriculaire. Barème officiel." },
            { name: "Ankylose de l'auriculaire (totalité - 3 articulations) (Main Non Dominante)", searchTerms: ["ankylose l'auriculaire totalité trois articulations main non dominante", "ankylose totale auriculaire main non dominante", "ankylose complète auriculaire"], rate: [6, 8], description: "Ankylose des trois articulations de l'auriculaire (MCP, IPP, IPD). Barème officiel." },
            { name: "Raideur d'une articulation de l'auriculaire (Main Non Dominante)", searchTerms: ["raideur d'une articulation l'auriculaire main non dominante", "dominante non main l'auriculaire articulation d'une raideur", "raideur d'une", "d'une articulation", "articulation l'auriculaire"], rate: [1, 2] },
            { name: "Raideur de l'auriculaire (Main Non Dominante)", searchTerms: ["raideur l'auriculaire main non dominante", "dominante non main l'auriculaire raideur", "raideur l'auriculaire", "l'auriculaire main", "main non"], rate: [1, 2] },
        ]
      },
      {
        name: "Doigts - Flexions et Extensions Permanentes",
        injuries: [
            // POUCE - Flexions permanentes
            { name: "Flexion permanente du pouce - 2 articulations (Main Dominante)", searchTerms: ["flexion permanente pouce deux articulations main dominante", "pouce flexion bloqué deux articulations dominante", "flexion pouce mcp ipp dominante"], rate: [10, 25], description: "Flexion permanente du pouce au niveau des deux articulations (MCP + IPP). Barème officiel." },
            { name: "Flexion permanente articulation métacarpo-phalangienne du pouce (Main Dominante)", searchTerms: ["flexion permanente métacarpo phalangienne pouce main dominante", "flexion mcp pouce dominante", "flexion permanente mcp pouce"], rate: [8, 10], description: "Flexion permanente de l'articulation MCP du pouce. Barème officiel." },
            { name: "Flexion permanente articulation inter-phalangienne du pouce (Main Dominante)", searchTerms: ["flexion permanente inter phalangienne pouce main dominante", "flexion ipp pouce dominante", "flexion permanente ipp pouce"], rate: [3, 5], description: "Flexion permanente de l'articulation IPP du pouce. Barème officiel." },
            { name: "Flexion permanente du pouce - 2 articulations (Main Non Dominante)", searchTerms: ["flexion permanente pouce deux articulations main non dominante", "pouce flexion bloqué deux articulations non dominante", "flexion pouce mcp ipp non dominante"], rate: [8, 20], description: "Flexion permanente du pouce au niveau des deux articulations (MCP + IPP). Barème officiel." },
            { name: "Flexion permanente articulation métacarpo-phalangienne du pouce (Main Non Dominante)", searchTerms: ["flexion permanente métacarpo phalangienne pouce main non dominante", "flexion mcp pouce non dominante", "flexion permanente mcp pouce"], rate: [6, 8], description: "Flexion permanente de l'articulation MCP du pouce. Barème officiel." },
            { name: "Flexion permanente articulation inter-phalangienne du pouce (Main Non Dominante)", searchTerms: ["flexion permanente inter phalangienne pouce main non dominante", "flexion ipp pouce non dominante", "flexion permanente ipp pouce"], rate: [2, 3], description: "Flexion permanente de l'articulation IPP du pouce. Barème officiel." },
            
            // INDEX - Flexions permanentes
            { name: "Flexion permanente de l'index - 3 articulations (Main Dominante)", searchTerms: ["flexion permanente index trois articulations main dominante", "index flexion bloqué trois articulations dominante", "flexion index mcp ipp ipd dominante"], rate: [5, 15], description: "Flexion permanente de l'index au niveau des trois articulations. Barème officiel." },
            { name: "Flexion permanente articulation inter-phalangienne proximale de l'index (Main Dominante)", searchTerms: ["flexion permanente inter phalangienne proximale index main dominante", "flexion ipp index dominante"], rate: [4, 5], description: "Flexion permanente de l'articulation IPP de l'index. Barème officiel." },
            { name: "Flexion permanente articulation inter-phalangienne distale de l'index (Main Dominante)", searchTerms: ["flexion permanente inter phalangienne distale index main dominante", "flexion ipd index dominante"], rate: [1, 2], description: "Flexion permanente de l'articulation IPD de l'index. Barème officiel." },
            { name: "Flexion permanente de l'index - 3 articulations (Main Non Dominante)", searchTerms: ["flexion permanente index trois articulations main non dominante", "index flexion bloqué trois articulations non dominante"], rate: [4, 12], description: "Flexion permanente de l'index au niveau des trois articulations. Barème officiel." },
            { name: "Flexion permanente articulation inter-phalangienne proximale de l'index (Main Non Dominante)", searchTerms: ["flexion permanente inter phalangienne proximale index main non dominante", "flexion ipp index non dominante"], rate: [3, 4], description: "Flexion permanente de l'articulation IPP de l'index. Barème officiel." },
            { name: "Flexion permanente articulation inter-phalangienne distale de l'index (Main Non Dominante)", searchTerms: ["flexion permanente inter phalangienne distale index main non dominante", "flexion ipd index non dominante"], rate: [1, 2], description: "Flexion permanente de l'articulation IPD de l'index. Barème officiel." },
            
            // MÉDIUS - Flexions permanentes
            { name: "Flexion permanente du médius - 3 articulations (Main Dominante)", searchTerms: ["flexion permanente médius trois articulations main dominante", "médius flexion bloqué trois articulations dominante"], rate: [5, 15], description: "Flexion permanente du médius au niveau des trois articulations. Barème officiel." },
            { name: "Flexion permanente articulation inter-phalangienne du médius (Main Dominante)", searchTerms: ["flexion permanente inter phalangienne médius main dominante", "flexion ipp médius dominante"], rate: [4, 5], description: "Flexion permanente de l'articulation IPP du médius. Barème officiel." },
            { name: "Flexion permanente articulation phalangino-phalangettienne du médius (Main Dominante)", searchTerms: ["flexion permanente phalangino phalangettienne médius main dominante", "flexion ipd médius dominante"], rate: [2, 3], description: "Flexion permanente de l'articulation IPD du médius. Barème officiel." },
            { name: "Flexion permanente du médius - 3 articulations (Main Non Dominante)", searchTerms: ["flexion permanente médius trois articulations main non dominante", "médius flexion bloqué trois articulations non dominante"], rate: [4, 12], description: "Flexion permanente du médius au niveau des trois articulations. Barème officiel." },
            { name: "Flexion permanente articulation inter-phalangienne du médius (Main Non Dominante)", searchTerms: ["flexion permanente inter phalangienne médius main non dominante", "flexion ipp médius non dominante"], rate: [3, 4], description: "Flexion permanente de l'articulation IPP du médius. Barème officiel." },
            { name: "Flexion permanente articulation phalangino-phalangettienne du médius (Main Non Dominante)", searchTerms: ["flexion permanente phalangino phalangettienne médius main non dominante", "flexion ipd médius non dominante"], rate: [1, 2], description: "Flexion permanente de l'articulation IPD du médius. Barème officiel." },
            
            // ANNULAIRE - Flexions permanentes
            { name: "Flexion permanente de l'annulaire - 3 articulations (Main Dominante)", searchTerms: ["flexion permanente annulaire trois articulations main dominante", "annulaire flexion bloqué trois articulations dominante"], rate: [5, 12], description: "Flexion permanente de l'annulaire au niveau des trois articulations. Barème officiel." },
            { name: "Flexion permanente articulation inter-phalangienne de l'annulaire (Main Dominante)", searchTerms: ["flexion permanente inter phalangienne annulaire main dominante", "flexion ipp annulaire dominante"], rate: [4, 5], description: "Flexion permanente de l'articulation IPP de l'annulaire. Barème officiel." },
            { name: "Flexion permanente articulation phalangino-phalangettienne de l'annulaire (Main Dominante)", searchTerms: ["flexion permanente phalangino phalangettienne annulaire main dominante", "flexion ipd annulaire dominante"], rate: [2, 3], description: "Flexion permanente de l'articulation IPD de l'annulaire. Barème officiel." },
            { name: "Flexion permanente de l'annulaire - 3 articulations (Main Non Dominante)", searchTerms: ["flexion permanente annulaire trois articulations main non dominante", "annulaire flexion bloqué trois articulations non dominante"], rate: [4, 9], description: "Flexion permanente de l'annulaire au niveau des trois articulations. Barème officiel." },
            { name: "Flexion permanente articulation inter-phalangienne de l'annulaire (Main Non Dominante)", searchTerms: ["flexion permanente inter phalangienne annulaire main non dominante", "flexion ipp annulaire non dominante"], rate: [3, 4], description: "Flexion permanente de l'articulation IPP de l'annulaire. Barème officiel." },
            { name: "Flexion permanente articulation phalangino-phalangettienne de l'annulaire (Main Non Dominante)", searchTerms: ["flexion permanente phalangino phalangettienne annulaire main non dominante", "flexion ipd annulaire non dominante"], rate: [1, 2], description: "Flexion permanente de l'articulation IPD de l'annulaire. Barème officiel." },
            
            // AURICULAIRE - Flexions permanentes
            { name: "Flexion permanente de l'auriculaire - 3 articulations (Main Dominante)", searchTerms: ["flexion permanente auriculaire trois articulations main dominante", "auriculaire flexion bloqué trois articulations dominante"], rate: [5, 10], description: "Flexion permanente de l'auriculaire au niveau des trois articulations. Barème officiel." },
            { name: "Flexion permanente articulation inter-phalangienne de l'auriculaire (Main Dominante)", searchTerms: ["flexion permanente inter phalangienne auriculaire main dominante", "flexion ipp auriculaire dominante"], rate: [4, 5], description: "Flexion permanente de l'articulation IPP de l'auriculaire. Barème officiel." },
            { name: "Flexion permanente articulation phalangino-phalangettienne de l'auriculaire (Main Dominante)", searchTerms: ["flexion permanente phalangino phalangettienne auriculaire main dominante", "flexion ipd auriculaire dominante"], rate: [1, 2], description: "Flexion permanente de l'articulation IPD de l'auriculaire. Barème officiel." },
            { name: "Flexion permanente de l'auriculaire - 3 articulations (Main Non Dominante)", searchTerms: ["flexion permanente auriculaire trois articulations main non dominante", "auriculaire flexion bloqué trois articulations non dominante"], rate: [4, 8], description: "Flexion permanente de l'auriculaire au niveau des trois articulations. Barème officiel." },
            { name: "Flexion permanente articulation inter-phalangienne de l'auriculaire (Main Non Dominante)", searchTerms: ["flexion permanente inter phalangienne auriculaire main non dominante", "flexion ipp auriculaire non dominante"], rate: [3, 4], description: "Flexion permanente de l'articulation IPP de l'auriculaire. Barème officiel." },
            { name: "Flexion permanente articulation phalangino-phalangettienne de l'auriculaire (Main Non Dominante)", searchTerms: ["flexion permanente phalangino phalangettienne auriculaire main non dominante", "flexion ipd auriculaire non dominante"], rate: [0, 1], description: "Flexion permanente de l'articulation IPD de l'auriculaire. Barème officiel." },
            
            // EXTENSIONS PERMANENTES
            { name: "Extension permanente du pouce entier (Main Dominante)", searchTerms: ["extension permanente pouce entier main dominante", "pouce extension bloqué main dominante"], rate: [15, 25], description: "Extension permanente de toutes les articulations du pouce. Barème officiel." },
            { name: "Extension permanente du pouce entier (Main Non Dominante)", searchTerms: ["extension permanente pouce entier main non dominante", "pouce extension bloqué main non dominante"], rate: [12, 20], description: "Extension permanente de toutes les articulations du pouce. Barème officiel." },
            { name: "Extension permanente de l'index entier (Main Dominante)", searchTerms: ["extension permanente index entier main dominante", "index extension bloqué main dominante"], rate: [10, 15], description: "Extension permanente de toutes les articulations de l'index. Barème officiel." },
            { name: "Extension permanente de l'index entier (Main Non Dominante)", searchTerms: ["extension permanente index entier main non dominante", "index extension bloqué main non dominante"], rate: [8, 12], description: "Extension permanente de toutes les articulations de l'index. Barème officiel." },
            { name: "Extension permanente du médius entier (Main Dominante)", searchTerms: ["extension permanente médius entier main dominante", "médius extension bloqué main dominante"], rate: [5, 15], description: "Extension permanente de toutes les articulations du médius. Barème officiel." },
            { name: "Extension permanente du médius entier (Main Non Dominante)", searchTerms: ["extension permanente médius entier main non dominante", "médius extension bloqué main non dominante"], rate: [4, 12], description: "Extension permanente de toutes les articulations du médius. Barème officiel." },
            { name: "Extension permanente de l'annulaire entier (Main Dominante)", searchTerms: ["extension permanente annulaire entier main dominante", "annulaire extension bloqué main dominante"], rate: [5, 12], description: "Extension permanente de toutes les articulations de l'annulaire. Barème officiel." },
            { name: "Extension permanente de l'annulaire entier (Main Non Dominante)", searchTerms: ["extension permanente annulaire entier main non dominante", "annulaire extension bloqué main non dominante"], rate: [4, 9], description: "Extension permanente de toutes les articulations de l'annulaire. Barème officiel." },
            { name: "Extension permanente de l'auriculaire entier (Main Dominante)", searchTerms: ["extension permanente auriculaire entier main dominante", "auriculaire extension bloqué main dominante"], rate: [5, 12], description: "Extension permanente de toutes les articulations de l'auriculaire. Barème officiel." },
            { name: "Extension permanente de l'auriculaire entier (Main Non Dominante)", searchTerms: ["extension permanente auriculaire entier main non dominante", "auriculaire extension bloqué main non dominante"], rate: [4, 9], description: "Extension permanente de toutes les articulations de l'auriculaire. Barème officiel." },
            
            // PERTES TENDINEUSES
            { name: "Perte du tendon extenseur ou fléchisseur du pouce (Main Dominante)", searchTerms: ["perte tendon extenseur fléchisseur pouce main dominante", "section tendon pouce dominante", "rupture tendon pouce dominante"], rate: [6, 20], description: "Perte du tendon extenseur ou fléchisseur du pouce. Barème officiel." },
            { name: "Perte du tendon extenseur ou fléchisseur du pouce (Main Non Dominante)", searchTerms: ["perte tendon extenseur fléchisseur pouce main non dominante", "section tendon pouce non dominante"], rate: [4, 15], description: "Perte du tendon extenseur ou fléchisseur du pouce. Barème officiel." },
            { name: "Perte du tendon extenseur ou fléchisseur des doigts longs (Main Dominante)", searchTerms: ["perte tendon extenseur fléchisseur doigts longs main dominante", "section tendon doigts dominante"], rate: [3, 12], description: "Perte du tendon extenseur ou fléchisseur des doigts autres que le pouce (selon la hauteur). Barème officiel." },
            { name: "Perte du tendon extenseur ou fléchisseur des doigts longs (Main Non Dominante)", searchTerms: ["perte tendon extenseur fléchisseur doigts longs main non dominante", "section tendon doigts non dominante"], rate: [2, 10], description: "Perte du tendon extenseur ou fléchisseur des doigts autres que le pouce (selon la hauteur). Barème officiel." },
        ]
      },
      {
        name: "Doigts - Pseudarthroses et Luxations",
        injuries: [
            // PSEUDARTHROSES - Phalange unguéale
            { name: "Pseudarthrose phalange unguéale du pouce (Main Dominante)", searchTerms: ["pseudarthrose phalange unguéale pouce main dominante", "pseudarthrose p3 pouce dominante", "faux articulation phalange unguéale pouce"], rate: [5, 6], description: "Pseudarthrose ballante avec large perte de substance osseuse de la phalange unguéale du pouce. Barème officiel." },
            { name: "Pseudarthrose phalange unguéale du pouce (Main Non Dominante)", searchTerms: ["pseudarthrose phalange unguéale pouce main non dominante", "pseudarthrose p3 pouce non dominante"], rate: [4, 5], description: "Pseudarthrose ballante avec large perte de substance osseuse de la phalange unguéale du pouce. Barème officiel." },
            { name: "Pseudarthrose phalange unguéale des doigts longs (Main Dominante)", searchTerms: ["pseudarthrose phalange unguéale doigts longs main dominante", "pseudarthrose p3 doigts dominante"], rate: [1, 2], description: "Pseudarthrose ballante de la phalange unguéale des doigts autres que le pouce. Barème officiel." },
            { name: "Pseudarthrose phalange unguéale des doigts longs (Main Non Dominante)", searchTerms: ["pseudarthrose phalange unguéale doigts longs main non dominante", "pseudarthrose p3 doigts non dominante"], rate: [0, 1], description: "Pseudarthrose ballante de la phalange unguéale des doigts autres que le pouce. Barème officiel." },
            
            // PSEUDARTHROSES - Autres phalanges
            { name: "Pseudarthrose autre phalange du pouce (Main Dominante)", searchTerms: ["pseudarthrose autre phalange pouce main dominante", "pseudarthrose p1 p2 pouce dominante", "pseudarthrose phalange proximale pouce"], rate: [14, 16], description: "Pseudarthrose ballante avec large perte de substance osseuse des autres phalanges du pouce (P1 ou P2). Barème officiel." },
            { name: "Pseudarthrose autre phalange du pouce (Main Non Dominante)", searchTerms: ["pseudarthrose autre phalange pouce main non dominante", "pseudarthrose p1 p2 pouce non dominante"], rate: [11, 13], description: "Pseudarthrose ballante avec large perte de substance osseuse des autres phalanges du pouce (P1 ou P2). Barème officiel." },
            { name: "Pseudarthrose autre phalange de l'index (Main Dominante)", searchTerms: ["pseudarthrose autre phalange index main dominante", "pseudarthrose p1 p2 index dominante"], rate: [9, 11], description: "Pseudarthrose ballante des autres phalanges de l'index (P1 ou P2). Barème officiel." },
            { name: "Pseudarthrose autre phalange de l'index (Main Non Dominante)", searchTerms: ["pseudarthrose autre phalange index main non dominante", "pseudarthrose p1 p2 index non dominante"], rate: [7, 9], description: "Pseudarthrose ballante des autres phalanges de l'index (P1 ou P2). Barème officiel." },
            { name: "Pseudarthrose autre phalange des doigts longs (Main Dominante)", searchTerms: ["pseudarthrose autre phalange doigts longs main dominante", "pseudarthrose p1 p2 médius annulaire auriculaire dominante"], rate: [4, 6], description: "Pseudarthrose ballante des autres phalanges des doigts autres que pouce et index. Barème officiel." },
            { name: "Pseudarthrose autre phalange des doigts longs (Main Non Dominante)", searchTerms: ["pseudarthrose autre phalange doigts longs main non dominante", "pseudarthrose p1 p2 médius annulaire auriculaire non dominante"], rate: [3, 5], description: "Pseudarthrose ballante des autres phalanges des doigts autres que pouce et index. Barème officiel." },
            
            // LUXATIONS IRRÉDUCTIBLES
            { name: "Luxation irréductible phalangette du pouce (Main Dominante)", searchTerms: ["luxation irréductible phalangette pouce main dominante", "luxation irréductible p3 pouce dominante", "luxation irréductible ipd pouce"], rate: [4, 6], description: "Luxation irréductible et irréductible de la phalangette du pouce. Barème officiel." },
            { name: "Luxation irréductible phalangette du pouce (Main Non Dominante)", searchTerms: ["luxation irréductible phalangette pouce main non dominante", "luxation irréductible p3 pouce non dominante"], rate: [3, 5], description: "Luxation irréductible et irréductible de la phalangette du pouce. Barème officiel." },
            { name: "Luxation irréductible métacarpo-phalangienne du pouce (Main Dominante)", searchTerms: ["luxation irréductible métacarpo phalangienne pouce main dominante", "luxation irréductible mcp pouce dominante"], rate: [10, 25], description: "Luxation irréductible métacarpo-phalangienne du pouce (selon la mobilité restaurée). Barème officiel." },
            { name: "Luxation irréductible métacarpo-phalangienne du pouce (Main Non Dominante)", searchTerms: ["luxation irréductible métacarpo phalangienne pouce main non dominante", "luxation irréductible mcp pouce non dominante"], rate: [8, 20], description: "Luxation irréductible métacarpo-phalangienne du pouce (selon la mobilité restaurée). Barème officiel." },
            { name: "Luxation irréductible métacarpo-phalangienne du pouce avec cicatrices adhérentes paume (Main Dominante)", searchTerms: ["luxation irréductible mcp pouce cicatrices adhérentes paume main dominante", "luxation pouce cicatrices palmaires raideur doigts"], rate: [30, 40], description: "Luxation irréductible du pouce avec cicatrices adhérentes de la paume et raideur des autres doigts. Barème officiel." },
            { name: "Luxation irréductible métacarpo-phalangienne du pouce avec cicatrices adhérentes paume (Main Non Dominante)", searchTerms: ["luxation irréductible mcp pouce cicatrices adhérentes paume main non dominante", "luxation pouce cicatrices palmaires raideur doigts"], rate: [20, 30], description: "Luxation irréductible du pouce avec cicatrices adhérentes de la paume et raideur des autres doigts. Barème officiel." },
            { name: "Pouce à ressort (Main Dominante)", searchTerms: ["pouce ressort main dominante", "pouce trigger dominante", "ténosynovite sténosante pouce"], rate: [0, 3], description: "Pouce à ressort (ténosynovite sténosante). Barème officiel." },
            { name: "Pouce à ressort (Main Non Dominante)", searchTerms: ["pouce ressort main non dominante", "pouce trigger non dominante"], rate: [0, 2], description: "Pouce à ressort (ténosynovite sténosante). Barème officiel." },
            { name: "Pouce collé à l'index (Main Dominante)", searchTerms: ["pouce collé index main dominante", "syndactylie traumatique pouce index dominante", "adhérence pouce index"], rate: [15, 25], description: "Pouce collé à l'index par adhérences post-traumatiques. Barème officiel." },
            { name: "Pouce collé à l'index (Main Non Dominante)", searchTerms: ["pouce collé index main non dominante", "syndactylie traumatique pouce index non dominante"], rate: [15, 20], description: "Pouce collé à l'index par adhérences post-traumatiques. Barème officiel." },
            
            // LUXATIONS DES DOIGTS LONGS
            { name: "Luxation irréductible phalangette des doigts longs (Main Dominante)", searchTerms: ["luxation irréductible phalangette doigts longs main dominante", "luxation irréductible p3 doigts dominante"], rate: [2, 3], description: "Luxation irréductible de la phalangette des doigts autres que le pouce. Barème officiel." },
            { name: "Luxation irréductible phalangette des doigts longs (Main Non Dominante)", searchTerms: ["luxation irréductible phalangette doigts longs main non dominante", "luxation irréductible p3 doigts non dominante"], rate: [0, 1], description: "Luxation irréductible de la phalangette des doigts autres que le pouce. Barème officiel." },
            { name: "Luxation irréductible phalangine et phalange des doigts longs (Main Dominante)", searchTerms: ["luxation irréductible phalangine phalange doigts longs main dominante", "luxation irréductible p1 p2 doigts dominante"], rate: [5, 15], description: "Luxation irréductible de la phalangine et phalange des doigts longs (selon la mobilité restaurée). Barème officiel." },
            { name: "Luxation irréductible phalangine et phalange des doigts longs (Main Non Dominante)", searchTerms: ["luxation irréductible phalangine phalange doigts longs main non dominante", "luxation irréductible p1 p2 doigts non dominante"], rate: [4, 12], description: "Luxation irréductible de la phalangine et phalange des doigts longs (selon la mobilité restaurée). Barème officiel." },
        ]
      },
      {
        name: "Doigts - Amputations Multiples et Impotence Totale",
        injuries: [
            // IMPOTENCE TOTALE DE PRÉHENSION
            { name: "Impotence totale définitive de préhension de la main - Flexion ou extension permanente tous doigts (Main Dominante)", searchTerms: ["impotence totale préhension main flexion extension permanente tous doigts dominante", "perte totale fonction main dominante", "main inutilisable dominante"], rate: [60, 65], description: "Par flexion ou extension permanente de tous les doigts, y compris le pouce (avec ou sans ankylose proprement dite). Barème officiel." },
            { name: "Impotence totale définitive de préhension de la main - Flexion ou extension permanente tous doigts (Main Non Dominante)", searchTerms: ["impotence totale préhension main flexion extension permanente tous doigts non dominante", "perte totale fonction main non dominante"], rate: [45, 50], description: "Par flexion ou extension permanente de tous les doigts, y compris le pouce (avec ou sans ankylose proprement dite). Barème officiel." },
            { name: "Impotence totale définitive de préhension - Flexion 3 doigts avec raideur autres et atrophie (Main Dominante)", searchTerms: ["impotence totale préhension flexion trois doigts raideur autres atrophie main dominante", "flexion trois doigts raideur atrophie main dominante"], rate: [60, 65], description: "Par flexion ou extension permanente de 3 doigts, avec raideur des autres, atrophie de la main et de l'avant-bras, raideur du poignet. Barème officiel." },
            { name: "Impotence totale définitive de préhension - Flexion 3 doigts avec raideur autres et atrophie (Main Non Dominante)", searchTerms: ["impotence totale préhension flexion trois doigts raideur autres atrophie main non dominante", "flexion trois doigts raideur atrophie main non dominante"], rate: [45, 50], description: "Par flexion ou extension permanente de 3 doigts, avec raideur des autres, atrophie de la main et de l'avant-bras, raideur du poignet. Barème officiel." },
            
            // ABLATIONS DE 2 DOIGTS
            { name: "Ablation index et un autre doigt avec métacarpiens (Main Dominante)", searchTerms: ["ablation index autre doigt avec métacarpiens main dominante", "amputation index autre doigt métacarpiens dominante"], rate: [30, 40], description: "Ablation de l'index et d'un autre doigt avec les métacarpiens correspondants. Barème officiel." },
            { name: "Ablation index et un autre doigt avec métacarpiens (Main Non Dominante)", searchTerms: ["ablation index autre doigt avec métacarpiens main non dominante", "amputation index autre doigt métacarpiens non dominante"], rate: [20, 30], description: "Ablation de l'index et d'un autre doigt avec les métacarpiens correspondants. Barème officiel." },
            { name: "Ablation 2 doigts autres que l'index avec métacarpiens (Main Dominante)", searchTerms: ["ablation deux doigts autres index avec métacarpiens main dominante", "amputation deux doigts sauf index métacarpiens dominante"], rate: [20, 25], description: "Ablation de 2 doigts autres que l'index avec les métacarpiens correspondants (lors de mobilité conservée du pouce et des autres doigts). Barème officiel." },
            { name: "Ablation 2 doigts autres que l'index avec métacarpiens (Main Non Dominante)", searchTerms: ["ablation deux doigts autres index avec métacarpiens main non dominante", "amputation deux doigts sauf index métacarpiens non dominante"], rate: [15, 20], description: "Ablation de 2 doigts autres que l'index avec les métacarpiens correspondants (lors de mobilité conservée du pouce et des autres doigts). Barème officiel." },
            { name: "Ablation 2 doigts avec raideur prononcée du pouce et atrophie main (Main Dominante)", searchTerms: ["ablation deux doigts raideur prononcée pouce atrophie main dominante", "amputation deux doigts raideur pouce atrophie dominante"], rate: [50, 55], description: "Ablation de 2 doigts avec ou sans métacarpiens avec raideur très prononcée du pouce et des autres doigts et atrophie de la main. Barème officiel." },
            { name: "Ablation 2 doigts avec raideur prononcée du pouce et atrophie main (Main Non Dominante)", searchTerms: ["ablation deux doigts raideur prononcée pouce atrophie main non dominante", "amputation deux doigts raideur pouce atrophie non dominante"], rate: [40, 45], description: "Ablation de 2 doigts avec ou sans métacarpiens avec raideur très prononcée du pouce et des autres doigts et atrophie de la main. Barème officiel." },
            
            // ABLATIONS DE 3 DOIGTS
            { name: "Ablation index et 2 autres doigts avec métacarpiens (Main Dominante)", searchTerms: ["ablation index deux autres doigts avec métacarpiens main dominante", "amputation index deux autres doigts métacarpiens dominante"], rate: [40, 50], description: "Ablation de l'index et 2 autres doigts avec les métacarpiens correspondants. Barème officiel." },
            { name: "Ablation index et 2 autres doigts avec métacarpiens (Main Non Dominante)", searchTerms: ["ablation index deux autres doigts avec métacarpiens main non dominante", "amputation index deux autres doigts métacarpiens non dominante"], rate: [30, 40], description: "Ablation de l'index et 2 autres doigts avec les métacarpiens correspondants. Barème officiel." },
            { name: "Ablation médius, annulaire, auriculaire avec métacarpiens (Main Dominante)", searchTerms: ["ablation médius annulaire auriculaire avec métacarpiens main dominante", "amputation trois derniers doigts métacarpiens dominante"], rate: [40, 50], description: "Ablation du médius, annulaire et auriculaire avec métacarpiens (selon l'état de mobilité du pouce et de l'index). Barème officiel." },
            { name: "Ablation médius, annulaire, auriculaire avec métacarpiens (Main Non Dominante)", searchTerms: ["ablation médius annulaire auriculaire avec métacarpiens main non dominante", "amputation trois derniers doigts métacarpiens non dominante"], rate: [30, 35], description: "Ablation du médius, annulaire et auriculaire avec métacarpiens (selon l'état de mobilité du pouce et de l'index). Barème officiel." },
            { name: "Ablation 3 doigts avec immobilisation pouce et doigt restant (Main Dominante)", searchTerms: ["ablation trois doigts immobilisation pouce doigt restant main dominante", "amputation trois doigts raideur pouce index dominante"], rate: [55, 60], description: "Ablation de 3 doigts avec immobilisation du pouce et du doigt restant. Barème officiel." },
            { name: "Ablation 3 doigts avec immobilisation pouce et doigt restant (Main Non Dominante)", searchTerms: ["ablation trois doigts immobilisation pouce doigt restant main non dominante", "amputation trois doigts raideur pouce index non dominante"], rate: [45, 50], description: "Ablation de 3 doigts avec immobilisation du pouce et du doigt restant. Barème officiel." },
            { name: "Ablation index et 2 autres doigts sans métacarpiens (Main Dominante)", searchTerms: ["ablation index deux autres doigts sans métacarpiens main dominante", "amputation index deux autres doigts sans métacarpiens dominante"], rate: [40, 45], description: "Ablation de l'index et 2 autres doigts sans les métacarpiens correspondants (lors de mobilité conservée du pouce et du doigt restant). Barème officiel." },
            { name: "Ablation index et 2 autres doigts sans métacarpiens (Main Non Dominante)", searchTerms: ["ablation index deux autres doigts sans métacarpiens main non dominante", "amputation index deux autres doigts sans métacarpiens non dominante"], rate: [30, 35], description: "Ablation de l'index et 2 autres doigts sans les métacarpiens correspondants (lors de mobilité conservée du pouce et du doigt restant). Barème officiel." },
            { name: "Ablation médius, annulaire, auriculaire sans métacarpiens (Main Dominante)", searchTerms: ["ablation médius annulaire auriculaire sans métacarpiens main dominante", "amputation trois derniers doigts sans métacarpiens dominante"], rate: [30, 35], description: "Ablation du médius, annulaire et auriculaire sans métacarpiens (lors de mobilité conservée du pouce et de l'index). Barème officiel." },
            { name: "Ablation médius, annulaire, auriculaire sans métacarpiens (Main Non Dominante)", searchTerms: ["ablation médius annulaire auriculaire sans métacarpiens main non dominante", "amputation trois derniers doigts sans métacarpiens non dominante"], rate: [20, 25], description: "Ablation du médius, annulaire et auriculaire sans métacarpiens (lors de mobilité conservée du pouce et de l'index). Barème officiel." },
            { name: "Ablation 3 doigts sans métacarpiens avec immobilisation pouce et doigt restant (Main Dominante)", searchTerms: ["ablation trois doigts sans métacarpiens immobilisation pouce doigt restant main dominante"], rate: [55, 60], description: "Ablation de 3 doigts sans métacarpiens avec immobilisation du pouce et du doigt restant. Barème officiel." },
            { name: "Ablation 3 doigts sans métacarpiens avec immobilisation pouce et doigt restant (Main Non Dominante)", searchTerms: ["ablation trois doigts sans métacarpiens immobilisation pouce doigt restant main non dominante"], rate: [45, 50], description: "Ablation de 3 doigts sans métacarpiens avec immobilisation du pouce et du doigt restant. Barème officiel." },
            
            // ABLATIONS POUCE + INDEX
            { name: "Ablation phalangette pouce et 2 dernières phalanges index avec mobilité (Main Dominante)", searchTerms: ["ablation phalangette pouce deux dernières phalanges index mobilité main dominante", "amputation p3 pouce p2 p3 index mobilité dominante"], rate: [18, 20], description: "Ablation de la phalangette du pouce et des 2 dernières phalanges de l'index avec mobilité complète des moignons. Barème officiel." },
            { name: "Ablation phalangette pouce et 2 dernières phalanges index avec mobilité (Main Non Dominante)", searchTerms: ["ablation phalangette pouce deux dernières phalanges index mobilité main non dominante", "amputation p3 pouce p2 p3 index mobilité non dominante"], rate: [13, 15], description: "Ablation de la phalangette du pouce et des 2 dernières phalanges de l'index avec mobilité complète des moignons. Barème officiel." },
            { name: "Ablation phalangette pouce et 2 dernières phalanges index sans mobilité (Main Dominante)", searchTerms: ["ablation phalangette pouce deux dernières phalanges index sans mobilité main dominante", "amputation p3 pouce p2 p3 index raideur dominante"], rate: [28, 30], description: "Ablation de la phalangette du pouce et des 2 dernières phalanges de l'index sans mobilité des moignons. Barème officiel." },
            { name: "Ablation phalangette pouce et 2 dernières phalanges index sans mobilité (Main Non Dominante)", searchTerms: ["ablation phalangette pouce deux dernières phalanges index sans mobilité main non dominante", "amputation p3 pouce p2 p3 index raideur non dominante"], rate: [20, 25], description: "Ablation de la phalangette du pouce et des 2 dernières phalanges de l'index sans mobilité des moignons. Barème officiel." },
            { name: "Ablation totale pouce et index avec autres doigts mobiles (Main Dominante)", searchTerms: ["ablation totale pouce index autres doigts mobiles main dominante", "amputation totale pouce index préhension paume dominante"], rate: [40, 45], description: "Ablation totale du pouce et de l'index si les autres doigts sont assez mobiles pour faire préhension avec la paume. Barème officiel." },
            { name: "Ablation totale pouce et index avec autres doigts mobiles (Main Non Dominante)", searchTerms: ["ablation totale pouce index autres doigts mobiles main non dominante", "amputation totale pouce index préhension paume non dominante"], rate: [35, 40], description: "Ablation totale du pouce et de l'index si les autres doigts sont assez mobiles pour faire préhension avec la paume. Barème officiel." },
            { name: "Ablation totale pouce et index avec autres doigts déviés ou raideur (Main Dominante)", searchTerms: ["ablation totale pouce index autres doigts déviés raideur main dominante", "amputation totale pouce index doigts raideur dominante"], rate: [50, 60], description: "Ablation totale du pouce et de l'index si les autres doigts sont déviés ou de mobilité plus ou moins incomplète. Barème officiel." },
            { name: "Ablation totale pouce et index avec autres doigts déviés ou raideur (Main Non Dominante)", searchTerms: ["ablation totale pouce index autres doigts déviés raideur main non dominante", "amputation totale pouce index doigts raideur non dominante"], rate: [40, 50], description: "Ablation totale du pouce et de l'index si les autres doigts sont déviés ou de mobilité plus ou moins incomplète. Barème officiel." },
            { name: "Ablation totale pouce et 3 ou 2 doigts autres que l'index (Main Dominante)", searchTerms: ["ablation totale pouce trois deux doigts autres index main dominante", "amputation pouce médius annulaire auriculaire dominante"], rate: [50, 60], description: "Ablation totale du pouce et de 3 ou 2 doigts autres que l'index. Barème officiel." },
            { name: "Ablation totale pouce et 3 ou 2 doigts autres que l'index (Main Non Dominante)", searchTerms: ["ablation totale pouce trois deux doigts autres index main non dominante", "amputation pouce médius annulaire auriculaire non dominante"], rate: [40, 45], description: "Ablation totale du pouce et de 3 ou 2 doigts autres que l'index. Barème officiel." },
            
            // ABLATIONS DE 4 DOIGTS
            { name: "Ablation 4 doigts avec pouce restant et mobile (Main Dominante)", searchTerms: ["ablation quatre doigts pouce restant mobile main dominante", "amputation quatre doigts pouce mobile dominante"], rate: [45, 50], description: "Ablation de 4 doigts, le pouce restant et mobile. Barème officiel." },
            { name: "Ablation 4 doigts avec pouce restant et mobile (Main Non Dominante)", searchTerms: ["ablation quatre doigts pouce restant mobile main non dominante", "amputation quatre doigts pouce mobile non dominante"], rate: [35, 45], description: "Ablation de 4 doigts, le pouce restant et mobile. Barème officiel." },
            { name: "Ablation 4 doigts avec immobilisation du pouce restant (Main Dominante)", searchTerms: ["ablation quatre doigts immobilisation pouce restant main dominante", "amputation quatre doigts pouce raideur dominante"], rate: [55, 60], description: "Ablation de 4 doigts avec immobilisation du pouce restant. Barème officiel." },
            { name: "Ablation 4 doigts avec immobilisation du pouce restant (Main Non Dominante)", searchTerms: ["ablation quatre doigts immobilisation pouce restant main non dominante", "amputation quatre doigts pouce raideur non dominante"], rate: [45, 55], description: "Ablation de 4 doigts avec immobilisation du pouce restant. Barème officiel." },
            
            // ABLATIONS SIMULTANÉES AUX DEUX MAINS
            { name: "Ablation simultanée des pouces et de tous les doigts aux deux mains", searchTerms: ["ablation simultanée pouces tous doigts deux mains", "amputation totale doigts deux mains", "ablation bilatérale totale doigts"], rate: 100, description: "Ablation simultanée aux deux mains des pouces et de tous les doigts. Barème officiel - IPP maximale." },
            { name: "Ablation simultanée des pouces et de tous les doigts sauf un aux deux mains", searchTerms: ["ablation simultanée pouces tous doigts sauf un deux mains", "amputation totale doigts sauf un deux mains"], rate: [95, 100], description: "Ablation simultanée aux deux mains des pouces et de tous les doigts à l'exception d'un seul. Barème officiel." },
            { name: "Ablation simultanée des pouces et de 3 ou 4 doigts aux deux mains", searchTerms: ["ablation simultanée pouces trois quatre doigts deux mains", "amputation bilatérale pouces trois quatre doigts"], rate: [90, 95], description: "Ablation simultanée aux deux mains des pouces et de 3 ou 4 doigts. Barème officiel." },
            { name: "Ablation simultanée des deux pouces", searchTerms: ["ablation simultanée deux pouces", "amputation bilatérale pouces", "perte deux pouces"], rate: [60, 70], description: "Ablation simultanée des deux pouces. Barème officiel." },
            { name: "Ablation simultanée des deux pouces et des deux index", searchTerms: ["ablation simultanée deux pouces deux index", "amputation bilatérale pouces index", "perte pouces index deux mains"], rate: [80, 85], description: "Ablation simultanée des deux pouces et des deux index. Barème officiel." },
            { name: "Ablation simultanée des deux pouces et de 3 ou 4 doigts autres que les index", searchTerms: ["ablation simultanée deux pouces trois quatre doigts autres index", "amputation bilatérale pouces doigts sauf index"], rate: [70, 80], description: "Ablation simultanée des deux pouces et de 3 ou 4 doigts autres que les index. Barème officiel." },
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
            { 
                name: "Amputation de jambe sous le genou (tiers supérieur)", 
                searchTerms: ["amputation jambe sous genou tiers supérieur", "amputation inférieur sous genou tiers supérieur", "supérieur tiers genou sous jambe amputation", "amputation jambe", "jambe sous"], rate: 55, 
                description: "Amputation sous le genou au tiers supérieur (amputation jambe proximale, amputation tibiale haute) avec moignon long et bien appareillable, prothèse fonctionnelle. Barème officiel : 55%."
            },
            { 
                name: "Amputation de cuisse au tiers supérieur", 
                searchTerms: ["amputation cuisse tiers supérieur", "amputation inférieur tiers supérieur", "supérieur tiers cuisse amputation", "amputation cuisse", "cuisse tiers"], rate: 75, 
                description: "Amputation de la cuisse au niveau du tiers supérieur (amputation fémorale proximale). Moignon très court, difficulté d'appareillage importante. Barème officiel."
            },
            { 
                name: "Amputation de cuisse au tiers moyen", 
                searchTerms: ["amputation cuisse tiers moyen", "amputation inférieur tiers moyen", "moyen tiers cuisse amputation", "amputation cuisse", "cuisse tiers"], rate: 70, 
                description: "Amputation de la cuisse au niveau du tiers moyen (amputation fémorale). Moignon de longueur moyenne, appareillage standard. Barème officiel."
            },
            { 
                name: "Amputation de cuisse au tiers inférieur", 
                searchTerms: ["amputation cuisse tiers inférieur", "amputation inférieur tiers inférieur", "inférieur tiers cuisse amputation", "amputation cuisse", "cuisse tiers"], rate: 65, 
                description: "Amputation de la cuisse au niveau du tiers inférieur (amputation fémorale distale, proche du genou). Moignon long, meilleur pronostic fonctionnel. Barème officiel."
            },
            { 
                name: "Désarticulation de la hanche", 
                searchTerms: ["désarticulation hanche"], rate: 80, 
                description: "Désarticulation de la hanche (exarticulation hanche), amputation la plus proximale du membre inférieur."
            },
            { 
                name: "Désarticulation de la cheville (Syme)", 
                searchTerms: ["désarticulation cheville syme", "syme cheville désarticulation", "désarticulation cheville", "cheville syme"], rate: 40, 
                description: "Amputation de type Syme au niveau de la cheville (désarticulation tibio-tarsienne)."
            },
            { 
                name: "Amputation de la jambe au tiers moyen", 
                searchTerms: ["amputation jambe tiers moyen", "amputation inférieur tiers moyen", "moyen tiers jambe amputation", "amputation jambe", "jambe tiers"], rate: 50, 
                description: "Amputation de jambe au niveau du tiers moyen avec moignon de longueur moyenne."
            },
            { 
                name: "Amputation de la jambe au tiers inférieur", 
                searchTerms: ["amputation jambe tiers inférieur", "amputation inférieur tiers inférieur", "inférieur tiers jambe amputation", "amputation jambe", "jambe tiers"], rate: 45, 
                description: "Amputation de jambe au niveau du tiers inférieur, proche de la cheville."
            },
            { 
                name: "Amputation d'un membre inférieur (non spécifiée)", 
                searchTerms: ["amputation d'un membre inférieur non spécifiée", "spécifiée non inférieur membre d'un amputation", "amputation d'un", "d'un membre", "membre inférieur"], rate: [70, 80], 
                rateCriteria: { 
                    low: "Amputation avec moignon long et bien appareillable.", 
                    high: "Amputation avec moignon très court, difficilement appareillable." 
                },
                description: "Amputation de membre inférieur dont le niveau anatomique n'est pas précisé. Utiliser les entrées spécifiques (jambe, cuisse, hanche) si le niveau est connu."
            },
            { name: "Amputation des deux membres inférieurs", searchTerms: ["amputation des deux membres inférieurs", "inférieurs membres deux des amputation", "amputation deux membres inférieurs", "amputation des", "des deux"], rate: 100 },
        ]
      },
      {
        name: "Hanche - Fractures du Col du Fémur (Détails par Âge)",
        injuries: [
            { 
              name: "Fracture col du fémur - Jeune sujet (<40 ans), très bon résultat anatomique", 
              searchTerms: ["fracture col fémur jeune sujet <40 ans très bon résultat anatomique", "anatomique résultat bon très ans <40 sujet jeune fémur col fracture", "fracture col", "col fémur", "fémur jeune"], rate: [15, 25],
              description: "Fracture bien consolidée chez un sujet jeune sans gêne fonctionnelle importante, sans ostéochondrite de la tête. Barème officiel : cas de très bon résultat anatomique.",
              rateCriteria: {
                low: "Consolidation parfaite, mobilité complète hanche, reprise activités sportives.",
                high: "Consolidation avec légère limitation abduction ou rotation, gêne accroupissement."
              }
            },
            { 
              name: "Fracture col du fémur - Sujet 50 ans, limitation marquée des mouvements hanche", 
              searchTerms: ["fracture col fémur sujet ans, limitation marquée des mouvements hanche", "fracture col fémur sujet ans, raideur marquée des mouvements hanche", "hanche mouvements des marquée limitation ans, sujet fémur col fracture", "fracture col fémur sujet ans, limitation marquée mouvements hanche", "fracture col"], rate: [35, 45],
              description: "Blessé d'une cinquantaine d'années, limitation marquée des mouvements de la hanche. Barème officiel : cas moyen.",
              rateCriteria: {
                low: "Limitation modérée abduction et flexion, boiterie discrète, marche autonome.",
                high: "Limitation importante mouvements, difficultés accroupissement, boiterie marquée, douleurs fréquentes."
              }
            },
            { 
              name: "Fracture col du fémur - Sujet ≥60 ans, boiterie, coxa vara, marche difficile", 
              searchTerms: ["fracture col fémur sujet ≥60 ans, boiterie, coxa vara, marche difficile", "difficile marche vara, coxa boiterie, ans, ≥60 sujet fémur col fracture", "fracture col", "col fémur", "fémur sujet"], rate: [60, 70],
              description: "Blessé de 60 ans et plus, boiterie importante, déformation en coxa vara, gêne articulaire marquée, marche difficile. Barème officiel : cas grave.",
              rateCriteria: {
                low: "Boiterie permanente, coxa vara modérée, marche avec canne occasionnelle, autonomie préservée.",
                high: "Boiterie majeure, coxa vara sévère avec raccourcissement, marche très difficile nécessitant canne permanente, douleurs chroniques."
              }
            },
            { 
              name: "Pseudarthrose col du fémur avec bon appui pelvien, boiterie compatible avec marche", 
              searchTerms: ["pseudarthrose col fémur avec bon appui pelvien, boiterie compatible avec marche", "marche avec compatible boiterie pelvien, appui bon avec fémur col pseudarthrose", "pseudarthrose col fémur bon appui pelvien, boiterie compatible marche", "pseudarthrose col", "col fémur"], rate: [75, 80],
              description: "Cas de pseudarthrose du col comportant un bon appui pelvien avec boiterie compatible avec la marche. Barème officiel.",
              rateCriteria: {
                low: "Pseudarthrose stable, appui satisfaisant, marche possible >1km avec canne, douleurs modérées.",
                high: "Pseudarthrose avec appui pelvien correct mais boiterie importante, marche limitée <500m, douleurs fréquentes."
              }
            },
            { 
              name: "Pseudarthrose col du fémur lâche, marche très difficile, grosse déformation", 
              searchTerms: ["pseudarthrose col fémur lâche, marche très difficile, grosse déformation", "déformation grosse difficile, très marche lâche, fémur col pseudarthrose", "pseudarthrose col", "col fémur", "fémur lâche,"], rate: [85, 90],
              description: "Cas de pseudarthrose lâche, marche très difficile, grosse déformation, attitude vicieuse du membre inférieur. Barème officiel : cas gravissime.",
              rateCriteria: {
                low: "Pseudarthrose instable, marche très difficile avec 2 cannes, déformation importante, périmètre <200m.",
                high: "Pseudarthrose lâche complète, impotence fonctionnelle quasi-totale, membre inutilisable, fauteuil roulant nécessaire pour déplacements longs."
              }
            },
            { name: "Fracture du col du fémur - Bonne consolidation", searchTerms: ["fracture col fémur bonne consolidation", "consolidation bonne fémur col fracture", "fracture col", "col fémur", "fémur bonne"], rate: [5, 15], rateCriteria: { low: "Consolidation anatomique, mobilité conservée, limitation minime.", high: "Légère raideur, gêne activités extrêmes (accroupissement)." } },
            { name: "Fracture du col du fémur - Consolidation avec raideur modérée", searchTerms: ["fracture col fémur consolidation avec raideur modérée", "modérée raideur avec consolidation fémur col fracture", "fracture col fémur consolidation raideur modérée", "fracture col", "col fémur"], rate: [15, 30], rateCriteria: { low: "Raideur modérée, mobilité fonctionnelle conservée.", high: "Raideur marquée sans raccourcissement significatif." } },
            { name: "Fracture du col du fémur - Consolidation avec raccourcissement et raideur", searchTerms: ["fracture col fémur consolidation avec raccourcissement raideur", "raideur raccourcissement avec consolidation fémur col fracture", "fracture col fémur consolidation raccourcissement raideur", "fracture col", "col fémur"], rate: [30, 60], rateCriteria: { low: "Raccourcissement <3cm + raideur modérée.", high: "Raccourcissement >3cm + raideur importante + boiterie." } },
            { name: "Pseudarthrose du col du fémur", searchTerms: ["pseudarthrose col fémur", "fémur col pseudarthrose", "pseudarthrose col", "col fémur"], rate: [60, 80], rateCriteria: { low: "Pseudarthrose stable avec mobilité conservée, douleurs modérées.", high: "Pseudarthrose instable avec raccourcissement >3cm, douleurs permanentes, impotence fonctionnelle majeure nécessitant canne." } },
        ]
      },
      {
        name: "Hanche - Fractures du Massif Trochantérien",
        injuries: [
            { name: "Fracture du massif trochantérien - Bonne consolidation", searchTerms: ["fracture massif trochantérien bonne consolidation", "consolidation bonne trochantérien massif fracture", "fracture massif", "massif trochantérien", "trochantérien bonne", "fracture trochantero diaphysaire", "fracture complexe trochantero", "trochantero diaphysaire droite", "trochantero diaphysaire gauche", "fracture trochantero diaphysaire bonne consolidation"], rate: [5, 10], rateCriteria: { low: "Consolidation anatomique sans séquelle, gêne minime.", high: "Consolidation avec légère raideur et douleurs mécaniques." } },
            { name: "Fracture du massif trochantérien - Cal vicieux et raideur", searchTerms: ["fracture massif trochantérien cal vicieux raideur", "raideur vicieux cal trochantérien massif fracture", "fracture massif", "massif trochantérien", "trochantérien cal"], rate: [20, 40], rateCriteria: { low: "Cal vicieux avec raideur modérée de hanche, boiterie discrète.", medium: "Cal vicieux important avec limitation flexion/abduction 50%, douleurs fréquentes.", high: "Cal vicieux majeur avec raccourcissement >2cm, quasi-ankylose, boiterie permanente nécessitant canne." } },
        ]
      },
      {
        name: "Hanche - Raideurs et Ankyloses",
        injuries: [
            { 
              name: "Ankylose complète hanche en rectitude (position favorable)", 
              searchTerms: ["ankylose complète hanche rectitude position favorable", "favorable position rectitude hanche complète ankylose", "ankylose complète", "complète hanche", "hanche rectitude"], rate: [50, 55],
              description: "Ankylose de la hanche en bonne position (rectitude ou légère flexion). Pour la marche et station debout, immobilisation hanche en bonne position n'entraîne pas infirmité supérieure à ankylose genou. Barème officiel : 50-55%.",
              rateCriteria: {
                low: "Ankylose en position optimale (extension complète, rotation neutre), marche satisfaisante, autonomie complète.",
                high: "Ankylose en position acceptable mais sous-optimale (légère flexion ou rotation), compensation rachis/genou, marche avec aide occasionnelle."
              }
            },
            { 
              name: "Ankylose complète hanche en mauvaise position (flexion, adduction, abduction, rotation)", 
              searchTerms: ["ankylose complète hanche mauvaise position flexion, adduction, abduction, rotation", "rotation abduction, adduction, flexion, position mauvaise hanche complète ankylose", "ankylose complète", "complète hanche", "hanche mauvaise"], rate: [65, 70],
              description: "Ankylose de la hanche en attitude défavorable : flexion importante, adduction, abduction excessive, ou rotation pathologique. Retentissement majeur sur la marche. Barème officiel : 65-70%.",
              rateCriteria: {
                low: "Mauvaise position modérée (flexion 30°), compensation possible, marche avec canne.",
                high: "Mauvaise position sévère (flexion >45° ou adduction majeure), quasi-impotence fonctionnelle, marche très difficile, béquilles nécessaires."
              }
            },
            { 
              name: "Ankylose des deux hanches", 
              searchTerms: ["ankylose des deux hanches", "hanches deux des ankylose", "ankylose deux hanches", "ankylose des", "des deux"], rate: [90, 100],
              description: "Ankylose bilatérale des hanches. Incapacité quasi-totale. Barème officiel : 90-100%.",
              rateCriteria: {
                low: "Ankyloses bilatérales en position acceptable, déplacements limités avec aide technique importante.",
                high: "Ankyloses bilatérales en mauvaise position, incapacité totale, fauteuil roulant permanent."
              }
            },
            { 
              name: "Hanche ballante (pseudarthrose hanche)", 
              searchTerms: ["hanche ballante pseudarthrose hanche", "hanche pseudarthrose ballante hanche", "hanche ballante", "ballante pseudarthrose", "pseudarthrose hanche"], rate: [75, 80],
              description: "Pseudarthrose de la hanche avec mobilité anormale, instabilité majeure, hanche instable et ballante. Barème officiel : 75-80%."
            },
            { 
              name: "Désarticulation de la hanche (exarticulation coxo-fémorale)", 
              searchTerms: ["désarticulation hanche exarticulation coxo fémorale", "fémorale coxo exarticulation hanche désarticulation", "désarticulation hanche", "hanche exarticulation", "exarticulation coxo"], rate: 95,
              description: "Désarticulation complète de la hanche, ablation de la tête et du col fémoraux. Barème officiel : 95%."
            },
            { 
              name: "Amputation inter-ilio-abdominale (hémipelvectomie)", 
              searchTerms: ["amputation inter ilio abdominale hémipelvectomie", "hémipelvectomie abdominale ilio inter amputation", "amputation inter", "inter ilio", "ilio abdominale"], rate: 100,
              description: "Désarticulation inter-ilio-abdominale, amputation incluant une partie du bassin. Incapacité totale permanente. Barème officiel : 100%."
            },
            { name: "Ankylose complète de la hanche", searchTerms: ["ankylose complète hanche", "hanche complète ankylose", "ankylose complète", "complète hanche"], rate: [50, 70], rateCriteria: { low: "Ankylose en position de fonction (flexion 20°, abduction/rotation neutre).", high: "Ankylose en mauvaise position (adduction, rotation externe)." } },
            { name: "Raideur de la hanche", searchTerms: ["raideur hanche"], rate: [10, 40], rateCriteria: { low: "Limitation des amplitudes extrêmes.", high: "Quasi-ankylose avec boiterie importante." } },
            { name: "Prothèse totale de hanche", searchTerms: ["prothèse totale hanche", "hanche totale prothèse", "prothèse totale", "totale hanche"], rate: 28 },
            { name: "Séquelles de prothèse totale de hanche", searchTerms: ["séquelles prothèse totale hanche", "hanche totale prothèse séquelles", "séquelles prothèse", "prothèse totale", "totale hanche"], rate: [15, 40], rateCriteria: { low: "Prothèse bien intégrée, indolore, mobilité fonctionnelle.", high: "Douleurs, boiterie, descellement, luxations récidivantes." } },
            { name: "Arthrose post-traumatique de la hanche", searchTerms: ["arthrose post traumatique hanche", "hanche traumatique post arthrose", "arthrose post", "post traumatique", "traumatique hanche"], rate: 25 },
            { name: "Coxarthrie post-traumatique", searchTerms: ["coxarthrie post traumatique", "traumatique post coxarthrie", "coxarthrie post", "post traumatique"], rate: [15, 40], rateCriteria: { low: "Pincement articulaire modéré, douleurs mécaniques.", high: "Arthrose sévère avec destruction de l'interligne et ankylose." } },
        ]
      },
      {
        name: "Cuisse - Fractures du Fémur (Détails par Âge)",
        injuries: [
            { 
              name: "Fracture diaphysaire fémur - Ouvrier jeune, sans séquelles graves, raccourcissement ≤4cm", 
              searchTerms: ["fracture diaphysaire fémur ouvrier jeune, sans séquelles graves, raccourcissement ≤4cm", "≤4cm raccourcissement graves, séquelles sans jeune, ouvrier fémur diaphysaire fracture", "fracture diaphysaire fémur ouvrier jeune, séquelles graves, raccourcissement ≤4cm", "fracture diaphysaire", "diaphysaire fémur"], rate: 10,
              description: "Fracture diaphysaire du fémur chez ouvrier jeune, consolidation satisfaisante sans séquelles graves, raccourcissement ne dépassant pas 4 centimètres. Barème officiel : 10%."
            },
            { 
              name: "Fracture diaphysaire fémur - Ouvrier 40-45 ans, cal moyen, atrophie, raccourcissement ≤4cm", 
              searchTerms: ["fracture diaphysaire fémur ouvrier ans, cal moyen, atrophie, raccourcissement ≤4cm", "≤4cm raccourcissement atrophie, moyen, cal ans, ouvrier fémur diaphysaire fracture", "fracture diaphysaire", "diaphysaire fémur", "fémur ouvrier"], rate: 20,
              description: "Fracture diaphysaire fémur chez ouvrier âgé de 40-45 ans, avec cal laissant un peu à désirer, douleurs, atrophie musculaire, raccourcissement ne dépassant pas 4 centimètres. Barème officiel : 20%."
            },
            { 
              name: "Fracture diaphysaire fémur - Ouvrier >50 ans, raideurs, amyotrophie, raccourcissement 9-10cm", 
              searchTerms: ["fracture diaphysaire fémur ouvrier >50 ans, raideurs, amyotrophie, raccourcissement 10cm", "10cm raccourcissement amyotrophie, raideurs, ans, >50 ouvrier fémur diaphysaire fracture", "fracture diaphysaire", "diaphysaire fémur", "fémur ouvrier"], rate: 65,
              description: "Fracture diaphysaire fémur chez ouvrier ayant dépassé la cinquantaine, raideurs articulaires, amyotrophie prononcée, faiblesse membre inférieur, cal difforme avec angulation, raccourcissement entre 9 et 10 centimètres (cas graves). Barème officiel : 65%."
            },
            { 
              name: "Cal vicieux consolidant en crosse fracture sous-trochantérienne, grand raccourcissement, douleurs", 
              searchTerms: ["cal vicieux consolidant crosse fracture sous trochantérienne, grand raccourcissement, douleurs", "douleurs raccourcissement, grand trochantérienne, sous fracture crosse consolidant vicieux cal", "cal vicieux", "vicieux consolidant", "consolidant crosse"], rate: [65, 70],
              description: "Cal vicieux important consolidant en crosse une fracture sous-trochantérienne, accompagné de grand raccourcissement et de douleurs. Barème officiel : 65-70%."
            },
            { name: "Fracture diaphysaire du fémur", searchTerms: ["fracture diaphysaire fémur", "fémur diaphysaire fracture", "fracture diaphysaire", "diaphysaire fémur"], rate: [10, 30], description: "Séquelles d'une fracture de la diaphyse fémorale.", rateCriteria: { low: "Consolidation sans séquelle majeure, gêne discrète.", medium: "Cal vicieux avec raccourcissement < 2cm et/ou raideur modérée du genou/hanche.", high: "Cal vicieux important avec boiterie, raideur et/ou troubles neurologiques." } },
            { name: "Fracture de la diaphyse fémorale - Avec cal vicieux", description: "Cal vicieux modéré avec raccourcissement 2-3cm et boiterie.", rate: 22 },
            { name: "Fracture de l'extrémité inférieure du fémur - Avec raideur du genou", searchTerms: ["fracture l'extrémité inférieure fémur avec raideur genou", "genou raideur avec fémur inférieure l'extrémité fracture", "fracture l'extrémité inférieure fémur raideur genou", "fracture l'extrémité", "l'extrémité inférieure"], rate: [15, 30], rateCriteria: { low: "Raideur légère genou (flexion >100°), douleurs mécaniques.", medium: "Raideur modérée (flexion 60-100°), douleurs fréquentes.", high: "Raideur sévère (flexion <60°), cal vicieux articulaire, arthrose débutante." } },
            { 
              name: "Pseudarthrose du fémur", 
              searchTerms: ["pseudarthrose fémur"], rate: [60, 70],
              description: "Pseudarthrose de la diaphyse fémorale. Barème officiel : 60-70%.",
              rateCriteria: { 
                low: "Pseudarthrose stable du tiers moyen, mobilité conservée hanche/genou, douleurs modérées, marche avec canne.", 
                high: "Pseudarthrose instable avec raccourcissement majeur >5cm, quasi-impotence fonctionnelle, nécessité 2 cannes ou fauteuil." 
              }
            },
        ]
      },
      {
        name: "Cuisse - Lésions Musculaires et Tendineuses",
        injuries: [
            { name: "Élongation/déchirure musculaire quadriceps - Tendinopathie quadricipitale (séquelles)", searchTerms: ["élongation/déchirure musculaire quadriceps tendinopathie quadricipitale séquelles", "séquelles quadricipitale tendinopathie quadriceps musculaire élongation/déchirure", "élongation/déchirure musculaire", "musculaire quadriceps", "quadriceps tendinopathie"], rate: [5, 20], rateCriteria: { low: "Élongation musculaire cicatrisée, gêne occasionnelle à l'effort intense, force conservée.", medium: "Déchirure partielle avec déficit de force modéré (faiblesse extension genou), douleurs à l'effort, limitation activités sportives.", high: "Déchirure complète ou rupture tendineuse avec déficit majeur d'extension active du genou, amyotrophie quadriceps, limitation marche/escaliers." } },
            { name: "Rupture du tendon quadricipital", searchTerms: ["rupture tendon quadricipital", "quadricipital tendon rupture", "rupture tendon", "tendon quadricipital"], rate: [15, 30], rateCriteria: { low: "Rupture partielle réparée chirurgicalement, récupération fonctionnelle satisfaisante, déficit de force modéré.", medium: "Rupture complète réparée avec séquelles : déficit extension active, amyotrophie, douleurs résiduelles.", high: "Rupture non réparée ou échec chirurgical, impossibilité extension active du genou, marche très limitée, nécessité aide technique." } },
        ]
      },
       {
        name: "Genou - Lésions Osseuses et Articulaires",
        injuries: [
            { name: "Fracture de la rotule - Avec gêne fonctionnelle", searchTerms: ["fracture rotule avec gêne fonctionnelle", "fonctionnelle gêne avec rotule fracture", "fracture rotule gêne fonctionnelle", "fracture rotule", "rotule avec"], rate: [5, 15], rateCriteria: { low: "Fracture consolidée, gêne à la flexion complète (accroupissement), douleurs mécaniques.", medium: "Cal vicieux avec craquements, limitation flexion à 90°, douleurs fréquentes.", high: "Patellectomie ou pseudarthrose, perte d'extension active, faiblesse quadriceps majeure." } },
            { 
              name: "Ablation de la rotule (Patellectomie) - Avec genou libre", 
              searchTerms: ["ablation rotule patellectomie avec genou libre", "patellectomie genou libre", "exérèse rotule séquelles"], 
              rate: [30, 40], 
              description: "Ablation chirurgicale de la rotule (patellectomie) avec genou libre, atrophie notable du triceps et extension active insuffisante. Barème officiel : 30-40%.",
              rateCriteria: { 
                low: "Genou libre, mobilité conservée, atrophie modérée du quadriceps, extension active possible mais faible, marche autonome.", 
                medium: "Atrophie importante du quadriceps, déficit extension active net, descente escaliers difficile, boiterie.", 
                high: "Atrophie majeure quadriceps, extension active quasi-impossible, marche très difficile, nécessité canne, combinée avec raideur si présente." 
              } 
            },
            { name: "Fracture des plateaux tibiaux - Avec déviation et/ou raideur", searchTerms: ["fracture des plateaux tibiaux avec déviation et/ou raideur", "raideur et/ou déviation avec tibiaux plateaux des fracture", "fracture plateaux tibiaux déviation et/ou raideur", "fracture des", "des plateaux"], rate: [10, 30], rateCriteria: { low: "Déviation axiale minime (<5°), raideur légère (flexion >120°), douleurs mécaniques modérées.", medium: "Déviation modérée (5-10°), raideur moyenne (flexion 90-120°), douleurs fréquentes.", high: "Déviation importante (>10° valgus/varus), raideur sévère (flexion <90°), instabilité, douleurs permanentes." } },
            { name: "Fracture des condyles fémoraux - Avec déviation et/ou raideur", searchTerms: ["fracture des condyles fémoraux avec déviation et/ou raideur", "raideur et/ou déviation avec fémoraux condyles des fracture", "fracture condyles fémoraux déviation et/ou raideur", "fracture des", "des condyles"], rate: [10, 30], rateCriteria: { low: "Déviation minime, raideur légère (flexion >120°), douleurs mécaniques modérées.", medium: "Déviation modérée, raideur moyenne (flexion 90-120°), douleurs fréquentes.", high: "Déviation importante, raideur sévère (flexion <90°), instabilité, douleurs permanentes." } },
            { 
              name: "Hydarthrose légère du genou", 
              searchTerms: ["hydarthrose légère genou", "épanchement modéré genou", "hydarthrose minime"], 
              rate: [5, 10], 
              description: "Hydarthrose légère avec épanchements occasionnels. Barème officiel : 5-10%.",
              rateCriteria: { 
                low: "Épanchements rares (1-2/an), drainage ponctuel, gêne minime.", 
                high: "Épanchements plus fréquents (3-4/an), gonflement modéré, limitation activités sportives." 
              } 
            },
            { 
              name: "Hydarthrose chronique du genou à poussées récidivantes", 
              searchTerms: ["hydarthrose chronique genou poussées récidivantes", "épanchement récidivant genou", "hydarthrose avec amyotrophie"], 
              rate: [10, 20], 
              description: "Hydarthrose chronique à poussées récidivantes avec amyotrophie. Barème officiel : 10-20%.",
              rateCriteria: { 
                low: "Épanchements récidivants mensuels, gonflement modéré, amyotrophie débutante.", 
                medium: "Épanchements fréquents (hebdomadaires), gonflement important, amyotrophie notable, limitation marche.", 
                high: "Hydarthrose permanente volumineuse, ponctions fréquentes, amyotrophie majeure, limitation mobilité sévère." 
              } 
            },
            { 
              name: "Double hydarthrose volumineuse bilatérale gênant marche et station debout", 
              searchTerms: ["double hydarthrose volumineuse bilatérale gênant marche station debout", "hydarthrose bilatérale deux genoux", "épanchement bilatéral genoux"], 
              rate: [25, 35], 
              description: "Double hydarthrose volumineuse des deux genoux gênant la marche et la station debout. Barème officiel : 25-35%.",
              rateCriteria: { 
                low: "Hydarthroses bilatérales modérées, marche limitée, ponctions régulières.", 
                medium: "Hydarthroses bilatérales importantes, marche difficile <500m, station debout limitée.", 
                high: "Hydarthroses bilatérales volumineuses permanentes, marche très limitée <200m, station debout quasi-impossible, nécessité canne(s)." 
              } 
            },
            { name: "Hydarthrose chronique du genou", searchTerms: ["hydarthrose chronique genou", "genou chronique hydarthrose", "hydarthrose chronique", "chronique genou"], rate: [5, 15], rateCriteria: { low: "Épanchements rares (1-2/an), drainage ponctuel.", medium: "Épanchements récidivants (mensuels), gonflement permanent modéré.", high: "Hydarthrose permanente volumineuse, ponctions fréquentes, limitation mobilité, synovectomie envisagée." } },
            { 
              name: "Rupture ou luxation du ménisque", 
              searchTerms: ["rupture luxation ménisque", "déchirure ménisque", "lésion méniscale traumatique"], 
              rate: [10, 30], 
              description: "Rupture ou luxation du ménisque avec séquelles fonctionnelles. Barème officiel : 10-30%.",
              rateCriteria: { 
                low: "Méniscectomie partielle, récupération satisfaisante, gêne minime.", 
                medium: "Méniscectomie totale, douleurs mécaniques, hydarthrose récidivante.", 
                high: "Complications : arthrose précoce, chondropathie sévère, douleurs permanentes, limitation marche." 
              } 
            },
            { 
              name: "Rupture du tendon rotulien (ou du tendon quadricipital)", 
              searchTerms: ["rupture tendon rotulien tendon quadricipital", "désinsertion tendon rotule", "rupture appareil extenseur genou"], 
              rate: [10, 15], 
              description: "Rupture du tendon rotulien ou du tendon quadricipital. Barème officiel : 10-15%.",
              rateCriteria: { 
                low: "Rupture réparée chirurgicalement, récupération extension active satisfaisante, déficit force modéré.", 
                medium: "Rupture avec séquelles : déficit extension active partiel, amyotrophie quadriceps, difficulté escaliers.", 
                high: "Rupture avec échec réparation, déficit extension active majeur, impossibilité montée escaliers sans aide." 
              } 
            },
            { 
              name: "Rupture du ligament rotulien", 
              searchTerms: ["rupture ligament rotulien", "déchirure ligament patellaire", "rupture ligament patella"], 
              rate: [10, 15], 
              description: "Rupture du ligament rotulien (ligament patellaire). Barème officiel : 10-15%.",
              rateCriteria: { 
                low: "Rupture réparée, extension active conservée, déficit force léger.", 
                medium: "Rupture avec séquelles : extension active faible, amyotrophie, douleurs résiduelles.", 
                high: "Rupture mal réparée, déficit extension active important, marche difficile." 
              } 
            },
            { 
              name: "Corps étrangers traumatiques du genou", 
              searchTerms: ["corps étrangers traumatiques genou", "fragments ostéochondraux genou", "souris articulaire genou"], 
              rate: [5, 25], 
              description: "Corps étrangers traumatiques intra-articulaires du genou (fragments ostéochondraux, souris articulaires). Barème officiel : 5-25%.",
              rateCriteria: { 
                low: "Corps étranger unique retiré, séquelles minimes, mobilité conservée.", 
                medium: "Corps étrangers multiples ou non retirables, blocages occasionnels, douleurs mécaniques, hydarthrose.", 
                high: "Corps étrangers multiples avec complications : blocages fréquents, arthrose précoce, douleurs permanentes, limitation sévère." 
              } 
            },
            { 
              name: "Maladie de Pellegrini-Hoffa (calcification ligament latéral interne)", 
              searchTerms: ["maladie pellegrini hoffa calcification ligament latéral interne", "pellegrini hoffa syndrome", "ossification LLI genou"], 
              rate: [8, 10], 
              description: "Maladie de Pellegrini-Hoffa : calcification/ossification du ligament latéral interne du genou post-traumatique. Barème officiel : 8-10%.",
              rateCriteria: { 
                low: "Calcification modérée, douleurs mécaniques, mobilité quasi-normale.", 
                high: "Calcification importante, douleurs fréquentes, limitation mobilité, raideur." 
              } 
            },
            { name: "Arthrose fémoro-patellaire ou fémoro-tibiale post-traumatique", searchTerms: ["arthrose fémoro patellaire fémoro tibiale post traumatique", "traumatique post tibiale fémoro patellaire fémoro arthrose", "arthrose fémoro", "fémoro patellaire", "patellaire fémoro"], rate: [10, 30], rateCriteria: { low: "Douleurs mécaniques, pincement radiologique modéré.", high: "Arthrose sévère avec déviation axiale et raideur." } },
            { name: "Séquelles de prothèse totale de genou", searchTerms: ["séquelles prothèse totale genou", "genou totale prothèse séquelles", "séquelles prothèse", "prothèse totale", "totale genou"], rate: [15, 40], rateCriteria: { low: "Prothèse indolore, mobilité > 90°, marche sans aide.", high: "Douleurs, instabilité, raideur, nécessité de cannes." } },
        ]
      },
      {
        name: "Genou - Lésions Ligamentaires et Méniscales",
        injuries: [
            { name: "Laxité chronique du genou (séquelle d'entorse)", searchTerms: ["laxité chronique genou séquelle d'entorse", "instabilité chronique genou séquelle d'entorse", "d'entorse séquelle genou chronique laxité", "laxité chronique", "chronique genou"], rate: [5, 20], rateCriteria: { low: "Laxité modérée sans instabilité fonctionnelle.", high: "Instabilité majeure avec dérobements fréquents." } },
            { name: "Séquelles de rupture du ligament croisé antérieur (LCA)", searchTerms: ["séquelles rupture ligament croisé antérieur lca", "lca antérieur croisé ligament rupture séquelles", "séquelles rupture ligament croisé lca", "séquelles rupture", "rupture ligament"], rate: [10, 25], rateCriteria: { low: "Laxité modérée, sans dérobements, activités quotidiennes normales, sports sans pivot/contact.", medium: "Laxité importante avec dérobements occasionnels, nécessité attelle pour activités.", high: "Laxité sévère avec dérobements fréquents (escaliers, marche irrégulière), arthrose débutante, activités limitées." } },
            { name: "Séquelles de rupture du ligament croisé postérieur (LCP)", searchTerms: ["séquelles rupture ligament croisé postérieur lcp", "lcp postérieur croisé ligament rupture séquelles", "séquelles rupture", "rupture ligament", "ligament croisé"], rate: [10, 25], rateCriteria: { low: "Laxité modérée, gêne en descente escaliers/pentes.", medium: "Laxité importante avec faiblesse quadriceps, douleurs antérieures.", high: "Laxité sévère avec instabilité postérieure majeure, arthrose fémoro-tibiale, limitation périmètre marche." } },
            { name: "Déchirure/rupture ligament latéral interne (LLI) - ligament collatéral médial genou", searchTerms: ["déchirure/rupture ligament latéral interne lli ligament collatéral médial genou", "genou médial collatéral ligament lli interne latéral ligament déchirure/rupture", "déchirure/rupture ligament", "ligament latéral", "latéral interne"], rate: [10, 20], rateCriteria: { low: "Déchirure partielle cicatrisée, laxité minime en valgus, pas d'instabilité fonctionnelle, gêne occasionnelle.", medium: "Déchirure complète avec laxité modérée en valgus, gêne dans les changements de direction, activités sportives limitées.", high: "Laxité sévère en valgus avec instabilité fonctionnelle, douleurs mécaniques fréquentes, limitation marche terrain irrégulier." } },
            { name: "Déchirure/rupture ligament latéral externe (LLE) - ligament collatéral latéral genou", searchTerms: ["déchirure/rupture ligament latéral externe lle ligament collatéral latéral genou", "genou latéral collatéral ligament lle externe latéral ligament déchirure/rupture", "déchirure/rupture ligament", "ligament latéral", "latéral externe"], rate: [10, 20], rateCriteria: { low: "Déchirure partielle cicatrisée, laxité minime en varus, pas d'instabilité fonctionnelle.", medium: "Déchirure complète avec laxité modérée en varus, gêne dans certaines activités.", high: "Laxité sévère en varus avec instabilité fonctionnelle, douleurs fréquentes, limitation activités." } },
            { name: "Méniscectomie totale", searchTerms: ["méniscectomie totale", "ménisque totale"], rate: 13, description: "Ablation complète d'un ménisque (interne ou externe) avec séquelles fonctionnelles." },
            { name: "Séquelles de méniscectomie (douleurs, hydarthrose)", searchTerms: ["séquelles méniscectomie douleurs, hydarthrose", "séquelles ménisque douleurs, hydarthrose", "hydarthrose douleurs, méniscectomie séquelles", "séquelles méniscectomie", "méniscectomie douleurs,"], rate: [5, 15], rateCriteria: { low: "Méniscectomie partielle, gêne minime, pas d'épanchement.", medium: "Méniscectomie totale avec hydarthrose récidivante, douleurs mécaniques.", high: "Complications post-méniscectomie : arthrose précoce, chondropathie fémoro-tibiale, douleurs permanentes." } },
        ]
      },
      {
        name: "Genou - Ankyloses Complètes (Détails par Angle de Flexion)",
        injuries: [
            { 
              name: "Ankylose genou en extension complète (180°) ou quasi-complète (jusqu'à 135° = flexion 45°)", 
              searchTerms: ["ankylose genou extension complète 180° quasi complète jusqu'à 135° flexion 45°", "45° flexion 135° jusqu'à complète quasi 180° complète extension genou ankylose", "ankylose genou", "genou extension", "extension complète"], rate: [30, 35],
              description: "Ankylose du genou en position favorable : rectitude (180°) ou légère flexion (jusqu'à 135° soit 45° de flexion). Position la plus favorable pour la marche et station debout. Barème officiel : 30-35%. Note : Pour la marche et station debout, ankylose genou en bonne position n'entraîne pas infirmité supérieure à ankylose hanche en bonne position.",
              rateCriteria: {
                low: "Ankylose en extension complète (180°), marche satisfaisante, autonomie complète, compensation possible.",
                high: "Ankylose avec légère flexion (135°-170°), marche avec compensation, aide occasionnelle."
              }
            },
            { 
              name: "Ankylose genou avec flexion 30° (angle 150°)", 
              searchTerms: ["ankylose genou avec flexion 30° angle 150°", "150° angle 30° flexion avec genou ankylose", "ankylose genou flexion 30° angle 150°", "ankylose genou", "genou avec"], rate: 40,
              description: "Ankylose du genou avec 30° de flexion. Barème officiel : ajouter 5% par rapport à l'extension complète = 35% + 5% = 40%."
            },
            { 
              name: "Ankylose genou avec flexion 45° (angle 135°)", 
              searchTerms: ["ankylose genou avec flexion 45° angle 135°", "135° angle 45° flexion avec genou ankylose", "ankylose genou flexion 45° angle 135°", "ankylose genou", "genou avec"], rate: 45,
              description: "Ankylose du genou avec 45° de flexion. Barème officiel : ajouter 10% par rapport à l'extension complète = 35% + 10% = 45%."
            },
            { 
              name: "Ankylose genou avec flexion 60° (angle 120°)", 
              searchTerms: ["ankylose genou avec flexion 60° angle 120°", "120° angle 60° flexion avec genou ankylose", "ankylose genou flexion 60° angle 120°", "ankylose genou", "genou avec"], rate: 50,
              description: "Ankylose du genou avec 60° de flexion. Barème officiel : ajouter 15% par rapport à l'extension complète = 35% + 15% = 50%."
            },
            { 
              name: "Ankylose genou avec flexion 75° (angle 105°)", 
              searchTerms: ["ankylose genou avec flexion 75° angle 105°", "105° angle 75° flexion avec genou ankylose", "ankylose genou flexion 75° angle 105°", "ankylose genou", "genou avec"], rate: 55,
              description: "Ankylose du genou avec 75° de flexion. Barème officiel : ajouter 20% par rapport à l'extension complète = 35% + 20% = 55%."
            },
            { 
              name: "Ankylose genou en flexion (de 45° à 150° de flexion) - Position défavorable", 
              searchTerms: ["ankylose genou flexion 45° 150° flexion position défavorable", "défavorable position flexion 150° 45° flexion genou ankylose", "ankylose genou", "genou flexion", "flexion 45°"], rate: [45, 60],
              description: "Ankylose du genou en position défavorable : flexion importante de 45° (angle 135°) à 150° (angle 30°). Taux maximum : 60%. Barème officiel : Au-delà de 20° de flexion, ajouter 5% par quinze degrés de flexion en sus. Si déviation varus ou valgus associée : ajouter 5% en sus.",
              rateCriteria: {
                low: "Flexion 45-60°, marche avec aide technique (canne), périmètre limité >500m.",
                high: "Flexion >90°, marche très difficile, béquilles ou fauteuil nécessaire, quasi-impotence fonctionnelle."
              }
            },
            { name: "Ankylose du genou", searchTerms: ["ankylose genou"], rate: [30, 50], rateCriteria: { low: "Ankylose en extension complète ou légère flexion.", high: "Ankylose en flexion > 30°." } },
        ]
      },
      {
        name: "Genou - Cal Vicieux avec Ankylose et Déviation",
        injuries: [
            { 
              name: "Genu valgum par cal vicieux ankylosé en extension (jambe oblique dehors)", 
              searchTerms: ["genu valgum par cal vicieux ankylosé extension jambe oblique dehors", "genu valgum par cal vicieux ankylosé extension inférieur oblique dehors", "dehors oblique jambe extension ankylosé vicieux cal par valgum genu", "genu valgum", "valgum par"], rate: [50, 55],
              description: "Cal vicieux de l'extrémité inférieure du fémur déterminant un genu valgum (jambe désaxée oblique de dedans en dehors) après ankylose en extension. Barème officiel : 50-55%."
            },
            { 
              name: "Genu varum par cal vicieux ankylosé en extension (jambe oblique dedans)", 
              searchTerms: ["genu varum par cal vicieux ankylosé extension jambe oblique dedans", "genu varum par cal vicieux ankylosé extension inférieur oblique dedans", "dedans oblique jambe extension ankylosé vicieux cal par varum genu", "genu varum", "varum par"], rate: [50, 55],
              description: "Cal vicieux de l'extrémité inférieure du fémur déterminant un genu varum (jambe désaxée oblique de dehors en dedans) après ankylose en extension. Barème officiel : 50-55%."
            },
            { 
              name: "Déviation jambe en varus ou valgus (en sus d'une ankylose)", 
              searchTerms: ["déviation jambe varus valgus sus d'une ankylose", "déviation inférieur varus valgus sus d'une ankylose", "ankylose d'une sus valgus varus jambe déviation", "déviation jambe", "jambe varus"], rate: 5,
              description: "Majoration en cas de déviation de la jambe en varus ou en valgus, en sus du taux d'ankylose. Barème officiel : +5%."
            },
        ]
      },
      {
        name: "Genou - Pseudarthrose",
        injuries: [
            { 
              name: "Pseudarthrose après résection genou, raccourcissement <6cm, genou non ballant", 
              searchTerms: ["pseudarthrose après résection genou, raccourcissement <6cm, genou non ballant", "ballant non genou <6cm, raccourcissement genou, résection après pseudarthrose", "pseudarthrose après", "après résection", "résection genou,"], rate: [50, 55],
              description: "Pseudarthrose consécutive à une résection du genou. Si raccourcissement ne dépasse pas 6 centimètres et si genou n'est pas ballant. Barème officiel : 50-55%."
            },
            { 
              name: "Pseudarthrose genou ballant", 
              searchTerms: ["pseudarthrose genou ballant", "ballant genou pseudarthrose", "pseudarthrose genou", "genou ballant"], rate: [60, 65],
              description: "Pseudarthrose du genou avec instabilité majeure (genou ballant), mobilité anormale. Barème officiel : 60-65%."
            },
            { 
              name: "Désarticulation du genou", 
              searchTerms: ["désarticulation genou"], rate: [70, 75],
              description: "Désarticulation complète du genou (exarticulation fémoro-tibiale). Barème officiel : 70-75%."
            },
        ]
      },
      {
        name: "Genou - Raideurs",
        injuries: [
            { 
              name: "Raideurs genou avec mouvements dans zone favorable (180°-135° soit flexion 0-45°)", 
              searchTerms: ["raideurs genou avec mouvements dans zone favorable 180° 135° soit flexion 45°", "45° flexion soit 135° 180° favorable zone dans mouvements avec genou raideurs", "raideurs genou mouvements dans zone favorable 180° 135° soit flexion 45°", "raideurs genou", "genou avec"], rate: 15,
              description: "Raideurs du genou avec mouvements se produisant dans la zone d'attitude favorable (180°-135° soit flexion 0-45°). Barème officiel : 15%."
            },
            { 
              name: "Raideurs genou avec mouvements dans zone défavorable (135°-30° soit flexion 45°-150°)", 
              searchTerms: ["raideurs genou avec mouvements dans zone défavorable 135° 30° soit flexion 45° 150°", "150° 45° flexion soit 30° 135° défavorable zone dans mouvements avec genou raideurs", "raideurs genou mouvements dans zone défavorable 135° 30° soit flexion 45° 150°", "raideurs genou", "genou avec"], rate: 30,
              description: "Raideurs du genou avec mouvements se produisant dans la zone d'attitude défavorable (135°-30° soit flexion 45°-150°). Barème officiel : 30%."
            },
            { name: "Raideur du genou", searchTerms: ["raideur genou"], rate: [5, 25], rateCriteria: { low: "Flexion limitée à 90°.", high: "Flexion < 45° et/ou flessum important." } },
        ]
      },
      {
        name: "Jambe - Fractures (Détails par Âge)",
        injuries: [
            { 
              name: "Fracture diaphysaire jambe sujet jeune (travailleur manuel)", 
              searchTerms: ["fracture diaphysaire jambe sujet jeune travailleur manuel", "fracture diaphysaire inférieur sujet jeune travailleur manuel", "manuel travailleur jeune sujet jambe diaphysaire fracture", "fracture diaphysaire", "diaphysaire jambe"], rate: 12,
              description: "Fracture consolidée de la diaphyse tibiale chez sujet jeune, travailleur manuel, avec bonne consolidation. Barème officiel : 12%."
            },
            { 
              name: "Fracture jambe sujet 40-50 ans avec atrophie et troubles trophiques", 
              searchTerms: ["fracture jambe sujet ans avec atrophie troubles trophiques", "fracture inférieur sujet ans avec atrophie troubles trophiques", "trophiques troubles atrophie avec ans sujet jambe fracture", "fracture jambe sujet ans atrophie troubles trophiques", "fracture jambe"], rate: 25,
              description: "Fracture de la jambe chez sujet âgé de 40-50 ans avec atrophie musculaire du mollet, troubles trophiques modérés. Barème officiel : 25%."
            },
            { 
              name: "Fracture jambe sujet âgé avec cal vicieux, troubles trophiques sévères", 
              searchTerms: ["fracture jambe sujet âgé avec cal vicieux, troubles trophiques sévères", "fracture inférieur sujet âgé avec cal vicieux, troubles trophiques sévères", "sévères trophiques troubles vicieux, cal avec âgé sujet jambe fracture", "fracture jambe sujet âgé cal vicieux, troubles trophiques sévères", "fracture jambe"], rate: 40,
              description: "Fracture de la jambe chez sujet âgé avec cal vicieux important et troubles trophiques sévères (œdème chronique, varices, ulcères). Barème officiel : 40%."
            },
            { name: "Fracture des deux os de la jambe - Bonne consolidation", searchTerms: ["fracture des deux jambe bonne consolidation", "fracture des deux inférieur bonne consolidation", "consolidation bonne jambe deux des fracture", "fracture deux jambe bonne consolidation", "fracture des"], rate: [5, 10], rateCriteria: { low: "Consolidation anatomique sans cal vicieux, gêne minime.", medium: "Légère atrophie mollet, douleurs mécaniques occasionnelles.", high: "Consolidation avec cal palpable, raideur cheville modérée, douleurs à la marche prolongée." } },
            { name: "Fracture des deux os de la jambe - Avec cal vicieux et troubles trophiques", searchTerms: ["fracture des deux jambe avec cal vicieux troubles trophiques", "fracture des deux inférieur avec cal vicieux troubles trophiques", "trophiques troubles vicieux cal avec jambe deux des fracture", "fracture deux jambe cal vicieux troubles trophiques", "fracture des"], rate: [15, 40], rateCriteria: { low: "Cal vicieux angulaire <10°, troubles trophiques modérés (œdème discret).", medium: "Cal vicieux 10-20°, troubles trophiques nets (œdème chronique, peau fragile), boiterie.", high: "Cal vicieux >20° avec déviation majeure, troubles trophiques sévères (ulcères récidivants, varices), raideur cheville, périmètre marche limité <500m." } },
            { name: "Fracture isolée du tibia", searchTerms: ["fracture isolée tibia", "tibia isolée fracture", "fracture isolée", "isolée tibia"], rate: [5, 20], rateCriteria: { low: "Fracture consolidée sans séquelle, gêne minime.", medium: "Cal vicieux tibia, douleurs mécaniques, léger œdème.", high: "Cal vicieux angulaire tibia, raideur cheville, troubles trophiques, boiterie." } },
            { name: "Fracture isolée du péroné", searchTerms: ["fracture isolée péroné", "péroné isolée fracture", "fracture isolée", "isolée péroné"], rate: [2, 5], rateCriteria: { low: "Consolidation sans séquelle, gêne discrète.", high: "Cal vicieux péroné avec conflit tibiofibulaire, douleurs latérales cheville." } },
            { name: "Pseudarthrose des deux os de la jambe", searchTerms: ["pseudarthrose des deux jambe", "pseudarthrose des deux inférieur", "jambe deux des pseudarthrose", "pseudarthrose deux jambe", "pseudarthrose des"], rate: [40, 60], rateCriteria: { low: "Pseudarthrose stable avec appareillage orthopédique efficace, marche possible >1km.", high: "Pseudarthrose instable, membre quasi-inutilisable, nécessité fauteuil roulant ou amputation envisagée." } },
            { name: "Pseudarthrose du tibia", searchTerms: ["pseudarthrose tibia"], rate: [30, 50], rateCriteria: { low: "Pseudarthrose stable du tiers moyen tibia, appareillage, marche limitée mais autonome.", high: "Pseudarthrose instable avec cal fibulaire hypertrophique, douleurs permanentes, impotence fonctionnelle majeure." } },
            { name: "Pseudarthrose de la diaphyse tibiale", description: "Pseudarthrose du tiers moyen de la diaphyse tibiale avec mobilité anormale et impotence fonctionnelle majeure nécessitant appareillage permanent.", rate: 70 },
            { name: "Pseudarthrose du péroné", searchTerms: ["pseudarthrose péroné"], rate: [15, 30], rateCriteria: { low: "Pseudarthrose stable péroné, gêne modérée, marche possible.", high: "Pseudarthrose instable avec conflit tibiofibulaire, douleurs cheville, boiterie." } },
            { name: "Syndrome des loges chronique d'effort de la jambe", searchTerms: ["syndrome des loges chronique d'effort jambe", "syndrome des loges chronique d'effort inférieur", "jambe d'effort chronique loges des syndrome", "syndrome loges chronique d'effort jambe", "syndrome des"], rate: [10, 25], description: "Douleurs musculaires à l'effort par augmentation de pression dans les loges musculaires.", rateCriteria: { low: "Douleurs apparaissant à l'effort intense, calmées par le repos.", high: "Douleurs invalidantes pour des efforts modérés, avec signes neurologiques." } },
        ]
      },
      {
        name: "Cheville (Cou-de-pied) - Fractures",
        injuries: [
            { name: "Fracture malléolaire ou bi-malléolaire - Bonne consolidation", searchTerms: ["fracture malléolaire malléolaire bonne consolidation", "consolidation bonne malléolaire malléolaire fracture", "fracture malléolaire", "malléolaire malléolaire", "malléolaire bonne"], rate: [3, 8], rateCriteria: { low: "Consolidation anatomique sans séquelle, gêne minime (fatigue cheville prolongée).", medium: "Légère raideur cheville, douleurs mécaniques occasionnelles.", high: "Consolidation avec raideur modérée (déficit 25% amplitudes), douleurs fréquentes, œdème discret." } },
            { name: "Fracture malléolaire ou bi-malléolaire - Avec raideur modérée", searchTerms: ["fracture malléolaire malléolaire avec raideur modérée", "modérée raideur avec malléolaire malléolaire fracture", "fracture malléolaire malléolaire raideur modérée", "fracture malléolaire", "malléolaire malléolaire"], rate: [10, 20], rateCriteria: { low: "Cal vicieux léger, raideur limitant les activités sportives.", high: "Raideur marquée avec douleurs chroniques à la marche." } },
            { 
              name: "Fracture bi-malléolaire - Avec cal vicieux important, déformation et troubles trophiques", 
              searchTerms: ["fracture malléolaire avec cal vicieux important, déformation troubles trophiques", "trophiques troubles déformation important, vicieux cal avec malléolaire fracture", "fracture malléolaire cal vicieux important, déformation troubles trophiques", "fracture malléolaire", "malléolaire avec"], rate: [20, 35], 
              rateCriteria: { 
                  low: "Cal vicieux avec raideur douloureuse limitant la marche.", 
                  high: "Déformation majeure, instabilité, troubles trophiques sévères et boiterie importante nécessitant une aide à la marche (canne)." 
              } 
            },
            { name: "Fracture du pilon tibial", searchTerms: ["fracture pilon tibial", "fracture pilon tibial tibial", "tibial pilon fracture", "fracture pilon", "pilon tibial"], rate: [15, 40], rateCriteria: { low: "Fracture articulaire consolidée avec raideur modérée cheville, douleurs mécaniques.", medium: "Raideur importante (flexion-extension <30°), arthrose débutante, boiterie, périmètre marche limité.", high: "Quasi-ankylose cheville, arthrose sévère, douleurs permanentes, troubles trophiques, nécessité canne permanente." } },
        ]
      },
      {
        name: "Cheville (Cou-de-pied) - Raideurs et Ankyloses",
        injuries: [
            { name: "Ankylose de la cheville", searchTerms: ["ankylose cheville"], rate: [20, 30], rateCriteria: { low: "Position à angle droit.", high: "En équin ou talus." } },
            { name: "Raideur de la cheville", searchTerms: ["raideur cheville"], rate: [5, 15], rateCriteria: { low: "Limitation modérée de la flexion-extension.", high: "Quasi-ankylose." } },
            { name: "Instabilité chronique de la cheville (séquelle d'entorse)", searchTerms: ["instabilité chronique cheville séquelle d'entorse", "d'entorse séquelle cheville chronique instabilité", "instabilité chronique", "chronique cheville", "cheville séquelle"], rate: [5, 15], rateCriteria: { low: "Entorses rares.", high: "Entorses à répétition, arthrose." } },
            { name: "Rupture du jambier postérieur avec pied varus", searchTerms: ["rupture jambier postérieur avec pied varus", "varus pied avec postérieur jambier rupture", "rupture jambier postérieur pied varus", "rupture jambier", "jambier postérieur"], rate: [25, 45], rateCriteria: { low: "Pied varus modéré, limitation mobilité cheville, boiterie légère, marche possible.", medium: "Pied varus marqué, appui mono-podal impossible, boiterie importante, amyotrophie jambe.", high: "Pied varus sévère en équin, quasi-impotence fonctionnelle, nécessité orthèse permanente, périmètre marche <200m." } },
        ]
      },
      {
        name: "Pied - Fractures - Métatarse",
        injuries: [
            { 
              name: "Fracture du premier métatarsien", 
              searchTerms: ["fracture premier métatarsien", "fracture M1", "fracture métatarsien gros orteil", "fracture métatarsien hallux"], 
              rate: [7, 15], 
              description: "Fracture du premier métatarsien (M1). Barème officiel : 7-15%.",
              rateCriteria: { 
                low: "Fracture consolidée en bonne position, douleurs mécaniques légères, démarche quasi-normale.", 
                medium: "Cal vicieux modéré, métatarsalgie M1, troubles appui/propulsion modérés.",
                high: "Cal vicieux important avec déformation, métatarsalgie sévère, troubles propulsion majeurs, nécessité semelles orthopédiques." 
              } 
            },
            { 
              name: "Fracture du cinquième métatarsien", 
              searchTerms: ["fracture cinquième métatarsien", "fracture M5", "fracture métatarsien latéral", "fracture métatarsien 5e orteil"], 
              rate: [5, 8], 
              description: "Fracture du cinquième métatarsien (M5). Barème officiel : 5-8%.",
              rateCriteria: { 
                low: "Fracture consolidée en bonne position, douleurs mécaniques modérées.", 
                high: "Cal vicieux, douleurs latérales persistantes, troubles appui latéral, conflit chaussage." 
              } 
            },
            { 
              name: "Fracture d'un métatarsien moyen (2e, 3e ou 4e)", 
              searchTerms: ["fracture métatarsien moyen", "fracture M2 M3 M4", "fracture deuxième troisième quatrième métatarsien", "fracture métatarsien central"], 
              rate: [3, 5], 
              description: "Fracture d'un métatarsien moyen (2e, 3e ou 4e métatarsien). Barème officiel : 3-5%.",
              rateCriteria: { 
                low: "Fracture consolidée, douleurs mécaniques discrètes.", 
                high: "Cal vicieux, métatarsalgie d'appui, nécessité semelles." 
              } 
            },
            { name: "Fracture des métatarsiens - Avec douleurs à la marche", searchTerms: ["fracture des métatarsiens avec douleurs marche", "marche douleurs avec métatarsiens des fracture", "fracture métatarsiens douleurs marche", "fracture des", "des métatarsiens"], rate: [3, 10], rateCriteria: { low: "Fracture 1 métatarsien consolidée, douleurs mécaniques légères, port chaussures normal.", medium: "Fractures multiples métatarsiens avec cal vicieux, métatarsalgies d'appui, nécessité semelles orthopédiques.", high: "Cals vicieux multiples avec avant-pied élargi/déformé, troubles statiques sévères, douleurs permanentes, chaussage orthopédique obligatoire." } },
        ]
      },
      {
        name: "Pied - Fractures - Tarse",
        injuries: [
            // Fractures combinées métatarsiens + tarse
            { 
              name: "Fractures combinées métatarsiens et tarse - Plante affaissée et douloureuse", 
              searchTerms: ["fractures combinées métatarsiens et tarse plante affaissée douloureuse", "fracture lisfranc affaissement plantaire", "fracture médio tarse avant pied", "plante affaissée"], 
              rate: [10, 20], 
              description: "Fractures combinées des métatarsiens et des os du tarse avec affaissement de la plante du pied et douleurs. Barème officiel : 10-20%.",
              rateCriteria: { 
                low: "Affaissement modéré, douleurs mécaniques, semelles efficaces.", 
                high: "Affaissement important, douleurs permanentes, troubles statiques majeurs." 
              } 
            },
            { 
              name: "Fractures combinées métatarsiens et tarse - Avec déviation du pied", 
              searchTerms: ["fractures combinées métatarsiens et tarse avec déviation pied", "fracture lisfranc déviation varus valgus", "déformation pied post fracture"], 
              rate: [20, 30], 
              description: "Fractures combinées avec déviation du pied (varus ou valgus). Barème officiel : 20-30%.",
              rateCriteria: { 
                low: "Déviation modérée, marche possible avec chaussage adapté.", 
                high: "Déviation sévère, troubles statiques majeurs, boiterie importante." 
              } 
            },
            { 
              name: "Fractures combinées métatarsiens et tarse - Pied bot traumatique", 
              searchTerms: ["fractures combinées pied bot traumatique", "pied bot acquis post fracture", "équin varus traumatique"], 
              rate: [30, 50], 
              description: "Fractures combinées avec pied bot traumatique (déformation en équin-varus sévère). Barème officiel : 30-50%.",
              rateCriteria: { 
                low: "Pied bot partiellement réductible, chaussage orthopédique possible.", 
                high: "Pied bot irréductible, appui très limité, marche très difficile." 
              } 
            },
            { 
              name: "Fractures combinées métatarsiens et tarse - Avec atrophie de la jambe", 
              searchTerms: ["fractures combinées avec atrophie jambe", "syndrome algodystrophique pied", "atrophie musculaire jambe post fracture"], 
              rate: [30, 50], 
              description: "Fractures combinées avec atrophie importante de la jambe (syndrome algodystrophique ou complications vasculo-nerveuses). Barème officiel : 30-50%.",
              rateCriteria: { 
                low: "Atrophie modérée, récupération partielle possible.", 
                high: "Atrophie sévère, douleurs permanentes, impotence fonctionnelle majeure." 
              } 
            },
            
            // Fractures isolées astragale
            { 
              name: "Fracture isolée de l'astragale - Consolidation simple", 
              searchTerms: ["fracture isolée astragale consolidation simple", "fracture talus sans complication", "fracture astragale consolidée"], 
              rate: [5, 10], 
              description: "Fracture isolée de l'astragale avec consolidation simple sans complications majeures. Barème officiel : 5-10%.",
              rateCriteria: { 
                low: "Consolidation sans cal vicieux, raideur minime.", 
                high: "Raideur modérée sous-astragalienne, douleurs mécaniques." 
              } 
            },
            { 
              name: "Fracture isolée de l'astragale - Cal vicieux avec séquelles", 
              searchTerms: ["fracture isolée astragale cal vicieux séquelles", "fracture talus cal vicieux", "astragale mal consolidée"], 
              rate: [10, 25], 
              description: "Fracture isolée de l'astragale avec cal vicieux et séquelles fonctionnelles importantes. Barème officiel : 10-25%.",
              rateCriteria: { 
                low: "Cal vicieux minime, raideur sous-astragalienne modérée, douleurs mécaniques.", 
                medium: "Cal vicieux important, raideur sévère arrière-pied, boiterie.", 
                high: "Pseudarthrose ou nécrose astragale, arthrose tibio-tarsienne et sous-astragalienne, douleurs permanentes, marche très limitée." 
              } 
            },
            { 
              name: "Fracture isolée de l'astragale - Évolution avec nécrose aseptique", 
              searchTerms: ["fracture isolée astragale nécrose aseptique", "fracture talus ostéonécrose", "nécrose avasculaire astragale"], 
              rate: [25, 40], 
              description: "Fracture isolée de l'astragale compliquée de nécrose aseptique (ostéonécrose). Barème officiel : 25-40%.",
              rateCriteria: { 
                low: "Nécrose partielle, arthrose débutante, douleurs modérées.", 
                high: "Nécrose complète, effondrement astragale, arthrose sévère, douleurs permanentes, marche très limitée." 
              } 
            },
            
            // Fractures du calcanéum
            { 
              name: "Fracture du corps du calcanéum - Consolidation simple", 
              searchTerms: ["fracture corps calcanéum consolidation simple", "fracture calcaneus sans complication", "fracture calcanéum consolidée"], 
              rate: [12, 15], 
              description: "Fracture du corps du calcanéum avec consolidation simple. Barème officiel : 12-15%.",
              rateCriteria: { 
                low: "Consolidation sans déformation, douleurs mécaniques modérées.", 
                high: "Élargissement modéré talon, raideur sous-astragalienne, boiterie discrète." 
              } 
            },
            { 
              name: "Fracture du corps du calcanéum - Cal vicieux avec séquelles", 
              searchTerms: ["fracture corps calcanéum cal vicieux séquelles", "fracture calcaneus mal consolidée", "cal vicieux calcanéum"], 
              rate: [15, 30], 
              description: "Fracture du corps du calcanéum avec cal vicieux et séquelles importantes. Barème officiel : 15-30%.",
              rateCriteria: { 
                low: "Cal vicieux modéré, raideur sous-astragalienne, douleurs fréquentes.", 
                medium: "Cal vicieux important, élargissement talon, arthrose sous-astragalienne, boiterie nette.", 
                high: "Cal vicieux sévère avec élargissement majeur, arthrose sévère, douleurs permanentes, marche <500m." 
              } 
            },
            { 
              name: "Fracture du corps du calcanéum - Pseudarthrose ou complications graves", 
              searchTerms: ["fracture corps calcanéum pseudarthrose complications graves", "pseudarthrose calcanéum", "calcanéum non consolidé"], 
              rate: [40, 50], 
              description: "Fracture du corps du calcanéum avec pseudarthrose ou complications graves. Barème officiel : 40-50%.",
              rateCriteria: { 
                low: "Pseudarthrose peu douloureuse, marche limitée mais possible.", 
                high: "Pseudarthrose douloureuse, déformation majeure, impotence fonctionnelle sévère, nécessité canne permanente." 
              } 
            },
            { 
              name: "Fracture de la grande apophyse du calcanéum", 
              searchTerms: ["fracture grande apophyse calcanéum", "fracture tubérosité antérieure calcanéum", "arrachement grande apophyse"], 
              rate: [10, 15], 
              description: "Fracture de la grande apophyse du calcanéum (tubérosité antérieure). Barème officiel : 10-15%.",
              rateCriteria: { 
                low: "Consolidation satisfaisante, douleurs mécaniques modérées.", 
                high: "Cal vicieux, conflit chaussage, douleurs persistantes." 
              } 
            },
            { 
              name: "Fracture de la petite apophyse du calcanéum", 
              searchTerms: ["fracture petite apophyse calcanéum", "fracture apophyse postérieure calcanéum mineure", "arrachement petite apophyse"], 
              rate: [2, 5], 
              description: "Fracture de la petite apophyse du calcanéum. Barème officiel : 2-5%.",
              rateCriteria: { 
                low: "Consolidation simple, gêne minime.", 
                high: "Douleurs résiduelles modérées." 
              } 
            },
            { 
              name: "Fracture de la tubérosité postérieure du calcanéum", 
              searchTerms: ["fracture tubérosité postérieure calcanéum", "arrachement achilléen calcanéum", "fracture insertion achille"], 
              rate: [5, 15], 
              description: "Fracture de la tubérosité postérieure du calcanéum (insertion du tendon d'Achille). Barème officiel : 5-15%.",
              rateCriteria: { 
                low: "Consolidation satisfaisante, force triceps quasi-normale.", 
                medium: "Cal vicieux modéré, déficit force triceps partiel.", 
                high: "Cal vicieux important ou pseudarthrose, faiblesse triceps majeure, limitation marche." 
              } 
            },
            { 
              name: "Fracture des deux calcanéums", 
              searchTerms: ["fracture des deux calcanéums", "fracture bilatérale calcanéum", "double fracture calcaneus"], 
              rate: [40, 70], 
              description: "Fracture bilatérale des deux calcanéums. Barème officiel : 40-70%.",
              rateCriteria: { 
                low: "Consolidations satisfaisantes bilatérales, raideurs modérées, marche autonome possible.", 
                medium: "Cals vicieux bilatéraux, douleurs fréquentes, boiterie importante, périmètre marche limité.", 
                high: "Cals vicieux sévères bilatéraux, douleurs permanentes, marche très limitée <200m, nécessité aides techniques permanentes." 
              } 
            },
            
            // Autres fractures du tarse
            { 
              name: "Fracture du scaphoïde tarsien", 
              searchTerms: ["fracture scaphoïde tarsien", "fracture naviculaire pied", "fracture os naviculaire tarse"], 
              rate: [5, 20], 
              description: "Fracture du scaphoïde tarsien (os naviculaire du pied). Barème officiel : 5-20%.",
              rateCriteria: { 
                low: "Consolidation simple, raideur minime médio-tarse.", 
                medium: "Cal vicieux modéré, raideur médio-tarsienne, douleurs mécaniques.", 
                high: "Pseudarthrose ou arthrose médio-tarsienne sévère, douleurs permanentes, boiterie importante." 
              } 
            },
            { 
              name: "Fracture du cuboïde", 
              searchTerms: ["fracture cuboïde", "fracture cuboïde pied", "fracture os cuboïde tarse"], 
              rate: [8, 30], 
              description: "Fracture du cuboïde. Barème officiel : 8-30%.",
              rateCriteria: { 
                low: "Consolidation satisfaisante, raideur latérale pied modérée.", 
                medium: "Cal vicieux, enfoncement cuboïde, raideur importante.", 
                high: "Cal vicieux sévère avec déformation pied, arthrose, douleurs permanentes, troubles statiques majeurs." 
              } 
            },
            { 
              name: "Fracture des cunéiformes", 
              searchTerms: ["fracture cunéiformes", "fracture os cunéiformes pied", "fracture cunéiforme médial intermédiaire latéral"], 
              rate: [6, 20], 
              description: "Fracture d'un ou plusieurs os cunéiformes. Barème officiel : 6-20%.",
              rateCriteria: { 
                low: "Fracture d'un seul cunéiforme, consolidation simple.", 
                medium: "Fractures multiples cunéiformes ou cal vicieux, raideur médio-tarse.", 
                high: "Cals vicieux multiples, arthrose tarso-métatarsienne, troubles statiques, douleurs permanentes." 
              } 
            },
        ]
      },
      {
        name: "Pied - Raideurs et Ankyloses - Articulation Tibio-Tarsienne",
        injuries: [
            { 
              name: "Raideur de l'articulation tibio-tarsienne (cheville) - Angle favorable", 
              searchTerms: ["raideur articulation tibio tarsienne cheville angle favorable", "raideur cheville angle droit fonctionnel", "limitation mobilité cheville angle bon"], 
              rate: [5, 8], 
              description: "Raideur de la cheville avec limitation modérée de la mobilité en angle favorable (proche angle droit). Barème officiel : 5-8%.",
              rateCriteria: { 
                low: "Raideur légère, mobilité résiduelle 10-15°, marche quasi-normale.", 
                high: "Raideur importante, mobilité résiduelle <10°, boiterie discrète." 
              } 
            },
            { 
              name: "Raideur de l'articulation tibio-tarsienne (cheville) - Angle défavorable", 
              searchTerms: ["raideur articulation tibio tarsienne cheville angle défavorable", "raideur cheville équin varus", "limitation mobilité cheville position vicieuse"], 
              rate: [10, 30], 
              description: "Raideur de la cheville avec limitation importante en angle défavorable (équin, varus, valgus). Barème officiel : 10-30%.",
              rateCriteria: { 
                low: "Angle modérément défavorable, chaussage adapté possible, marche limitée.", 
                medium: "Angle défavorable, boiterie importante, périmètre marche réduit.", 
                high: "Angle très défavorable (équin sévère), marche très difficile, nécessité canne, chaussage orthopédique complexe." 
              } 
            },
            { 
              name: "Ankylose tibio-tarsienne (cheville) - À angle droit", 
              searchTerms: ["ankylose tibio tarsienne cheville angle droit", "ankylose cheville position fonctionnelle", "blocage cheville angle droit"], 
              rate: [10, 20], 
              description: "Ankylose complète de la cheville à angle droit (position fonctionnelle). Barème officiel : 10-20%.",
              rateCriteria: { 
                low: "Ankylose stable à angle droit, adaptation satisfaisante, boiterie modérée.", 
                high: "Ankylose avec douleurs résiduelles, troubles statiques, boiterie nette." 
              } 
            },
            { 
              name: "Ankylose tibio-tarsienne (cheville) - À angle droit avec déformation du pied", 
              searchTerms: ["ankylose tibio tarsienne angle droit avec déformation pied", "ankylose cheville déformation varus valgus", "blocage cheville avec déformation"], 
              rate: [20, 30], 
              description: "Ankylose de la cheville à angle droit mais avec déformation du pied (varus, valgus). Barème officiel : 20-30%.",
              rateCriteria: { 
                low: "Déformation modérée, chaussage adapté possible.", 
                high: "Déformation importante, troubles statiques majeurs, chaussage très difficile." 
              } 
            },
            { 
              name: "Ankylose tibio-tarsienne (cheville) - En attitude vicieuse", 
              searchTerms: ["ankylose tibio tarsienne attitude vicieuse", "ankylose cheville équin sévère", "blocage cheville position invalidante"], 
              rate: [30, 50], 
              description: "Ankylose de la cheville en attitude vicieuse (équin, varus, valgus sévère). Barème officiel : 30-50%.",
              rateCriteria: { 
                low: "Attitude vicieuse modérée, marche possible avec aide.", 
                medium: "Attitude vicieuse importante, appui difficile, périmètre marche très limité.", 
                high: "Attitude vicieuse sévère, appui quasi-impossible, marche très limitée même avec aide." 
              } 
            },
            { 
              name: "Désarticulation tibio-tarsienne", 
              searchTerms: ["désarticulation tibio tarsienne", "amputation syme", "désarticulation cheville"], 
              rate: [50, 55], 
              description: "Désarticulation au niveau de l'articulation tibio-tarsienne (amputation de Syme). Barème officiel : 50-55%.",
              rateCriteria: { 
                low: "Moignon satisfaisant, appareillage bien toléré, marche autonome >1km.", 
                high: "Moignon douloureux, appareillage mal toléré, marche limitée <500m." 
              } 
            },
            { 
              name: "Amputation des deux pieds", 
              searchTerms: ["amputation des deux pieds", "amputation bilatérale pieds", "double amputation pied"], 
              rate: [85, 100], 
              description: "Amputation bilatérale des deux pieds (quel que soit le niveau). Barème officiel : 85-100%.",
              rateCriteria: { 
                low: "Appareillages bilatéraux bien tolérés, déambulation autonome possible avec aides.", 
                high: "Appareillages mal tolérés, autonomie très limitée, dépendance majeure pour déplacements." 
              } 
            },
            { name: "Ankylose d'une articulation du tarse", searchTerms: ["ankylose d'une articulation tarse", "tarse articulation d'une ankylose", "ankylose d'une", "d'une articulation", "articulation tarse"], rate: [10, 20], rateCriteria: { low: "Ankylose sous-astragalienne, adaptation possible, boiterie discrète.", medium: "Ankylose médio-tarsienne avec raideur globale arrière-pied.", high: "Ankyloses multiples tarse, pied rigide, troubles statiques, boiterie majeure." } },
            { name: "Pied plat ou pied creux post-traumatique", searchTerms: ["pied plat pied creux post traumatique", "traumatique post creux pied plat pied", "pied plat", "plat pied", "pied creux"], rate: [5, 20], rateCriteria: { low: "Déformation modérée, douleurs mécaniques, correction semelles efficace.", medium: "Déformation importante, métatarsalgies/talalgies fréquentes, chaussage orthopédique.", high: "Déformation sévère irréductible, troubles statiques majeurs, douleurs permanentes, périmètre marche très limité." } },
        ]
      },
      {
        name: "Pied et Cheville - Lésions Spécifiques",
        injuries: [
            { 
              name: "Diastasis tibio-fibulaire (désunion tibia-péroné)", 
              searchTerms: ["diastasis tibio fibulaire désunion tibia péroné", "diastasis tibio nerf désunion tibia péroné", "péroné tibia désunion fibulaire tibio diastasis", "diastasis tibio", "tibio fibulaire"], rate: 12,
              description: "Diastasis tibio-fibulaire : désunion de l'articulation entre le tibia et le péroné (fibula) à la cheville, entraînant instabilité et douleurs. Barème officiel : 12%."
            },
            { 
              name: "Astragalectomie (résection de l'astragale)", 
              searchTerms: ["astragalectomie résection l'astragale", "l'astragale résection astragalectomie", "astragalectomie résection", "résection l'astragale"], rate: [25, 30],
              description: "Astragalectomie : ablation chirurgicale de l'astragale (talus), os essentiel de la cheville, entraînant perte majeure de mobilité et boiterie importante. Barème officiel : 25-30%.",
              rateCriteria: {
                low: "Astragalectomie avec arthrodèse stable, appareillage efficace, marche possible > 500m.",
                high: "Astragalectomie avec instabilité persistante, douleurs permanentes, marche < 200m, nécessité canne permanente."
              }
            },
            { 
              name: "Pied bot traumatique (varus équin acquis)", 
              searchTerms: ["pied bot traumatique varus équin acquis", "acquis équin varus traumatique bot pied", "pied bot", "bot traumatique", "traumatique varus"], rate: [15, 25],
              description: "Pied bot traumatique : déformation en varus équin du pied d'origine traumatique, limitant l'appui et la marche. Barème officiel : 15-25%.",
              rateCriteria: {
                low: "Pied bot modéré, partiellement réductible, chaussage orthopédique possible, boiterie modérée.",
                high: "Pied bot sévère irréductible, appui très limité, chaussage très difficile, marche < 200m avec aide."
              }
            },
            { 
              name: "Exostose douloureuse du pied (séquelle de fracture)", 
              searchTerms: ["exostose douloureuse pied séquelle fracture", "fracture séquelle pied douloureuse exostose", "exostose douloureuse", "douloureuse pied", "pied séquelle"], rate: [15, 25],
              description: "Exostose douloureuse du pied : saillie osseuse post-traumatique provoquant douleurs à l'appui et au chaussage. Barème officiel : 15-25%.",
              rateCriteria: {
                low: "Exostose localisée, douleurs à l'appui prolongé, chaussage adapté possible.",
                high: "Exostoses multiples, douleurs permanentes, chaussage très difficile, limitation sévère de la marche."
              }
            },
        ]
      },
      {
        name: "Pied - Amputations Partielles",
        injuries: [
            { 
                name: "Amputation de Syme (désarticulation tibio-tarsienne)", 
                searchTerms: ["amputation syme désarticulation tibio tarsienne", "tarsienne tibio désarticulation syme amputation", "amputation syme", "syme désarticulation", "désarticulation tibio"], rate: 50, 
                description: "Désarticulation tibio-tarsienne avec conservation du calcanéum. Amputation au niveau de la cheville conservant le talon pour l'appui."
            },
            { 
                name: "Opération de Pirogoff", 
                searchTerms: ["opération pirogoff amputation"], rate: [35, 40], 
                description: "Amputation du pied avec conservation partielle du calcanéum fixé sous le tibia. Technique d'amputation conservant l'appui calcanéen. Barème officiel : 35-40%.",
                rateCriteria: {
                    low: "Moignon satisfaisant, appareillage bien toléré, marche autonome.",
                    high: "Moignon douloureux, troubles statiques, marche limitée."
                }
            },
            { 
                name: "Opération de Ricard (amputation inter-tibio-calcanéenne)", 
                searchTerms: ["opération ricard amputation inter tibio calcanéenne", "calcanéenne tibio inter amputation ricard opération", "opération ricard", "ricard amputation", "amputation inter"], rate: [30, 35], 
                description: "Amputation inter-tibio-calcanéenne. Technique d'amputation partielle du pied. Barème officiel : 30-35%.",
                rateCriteria: {
                    low: "Moignon satisfaisant, appareillage bien adapté, marche autonome.",
                    high: "Moignon douloureux, appareillage difficile, marche limitée."
                }
            },
            { 
                name: "Désarticulation médio-tarsienne (Chopart) - Bonne attitude du pied", 
                searchTerms: ["désarticulation médio tarsienne chopart bonne attitude", "amputation chopart attitude favorable", "désarticulation chopart position fonctionnelle"], 
                rate: [30, 35], 
                description: "Désarticulation médio-tarsienne (Chopart) avec moignon en bonne attitude (angle droit, pas d'équin). Barème officiel : 30-35%.",
                rateCriteria: { 
                    low: "Moignon satisfaisant, appareillage bien toléré, déambulation autonome.", 
                    high: "Moignon avec douleurs modérées, appareillage nécessaire en permanence." 
                }
            },
            { 
                name: "Désarticulation médio-tarsienne (Chopart) - Mauvaise attitude du pied", 
                searchTerms: ["désarticulation médio tarsienne chopart mauvaise attitude", "amputation chopart équin varus", "désarticulation chopart attitude vicieuse"], 
                rate: [40, 45], 
                description: "Désarticulation médio-tarsienne (Chopart) avec moignon en mauvaise attitude (équin, varus). Barème officiel : 40-45%.",
                rateCriteria: { 
                    low: "Attitude vicieuse modérée, appareillage adapté possible.", 
                    high: "Attitude vicieuse sévère, appareillage très difficile, marche très limitée." 
                }
            },
            { 
                name: "Désarticulation sous-astragalienne", 
                searchTerms: ["désarticulation sous astragalienne", "amputation sous astragalienne", "exérèse calcanéum"], 
                rate: [35, 40], 
                description: "Désarticulation sous-astragalienne (ablation du calcanéum, conservation de l'astragale). Barème officiel : 35-40%.",
                rateCriteria: { 
                    low: "Moignon satisfaisant, appareillage bien adapté, marche autonome >500m.", 
                    high: "Moignon instable, douleurs, marche limitée <500m, nécessité canne." 
                }
            },
            { 
                name: "Désarticulation tarso-métatarsienne (amputation de Lisfranc)", 
                searchTerms: ["désarticulation tarso métatarsienne amputation lisfranc", "lisfranc amputation métatarsienne tarso désarticulation", "désarticulation tarso", "tarso métatarsienne", "métatarsienne amputation"], rate: [30, 35], 
                description: "Amputation de l'avant-pied au niveau de l'articulation de Lisfranc (entre tarse et métatarsiens). Perte de tous les métatarsiens et orteils. Barème officiel : 30-35%.",
                rateCriteria: { 
                    low: "Moignon d'appui satisfaisant, chaussage orthopédique bien toléré, déambulation autonome >1km, activités quotidiennes préservées.", 
                    high: "Moignon douloureux avec troubles trophiques, déséquilibre postural majeur, marche limitée <500m, nécessité canne, chaussage très difficile, retentissement professionnel majeur." 
                }
            },
            { 
                name: "Amputation trans-métatarsienne (perte des cinq orteils)", 
                searchTerms: ["amputation trans métatarsienne perte des cinq orteils", "amputation trans métatarsienne amputation des cinq orteils", "orteils cinq des perte métatarsienne trans amputation", "amputation trans métatarsienne perte cinq orteils", "amputation trans"], rate: [20, 30], 
                description: "Amputation au niveau des métatarsiens (conservation partielle des métatarsiens, perte de tous les orteils). Barème officiel : 20-30%.",
                rateCriteria: { 
                    low: "Amputation distale (niveau tête métatarsiens), bon appui antérieur, chaussage adapté bien toléré, marche autonome.", 
                    high: "Amputation métatarsienne proximale, perte appui antérieur majeure, moignon douloureux, marche très limitée <500m, nécessité aide à la marche." 
                }
            },
        ]
      },
      {
        name: "Orteils - Lésions",
        injuries: [
            // Raideurs articulaires
            { name: "Raideurs articulaires des orteils", searchTerms: ["raideurs articulaires des orteils", "raideur articulation orteils", "raideur orteil", "limitation mobilité orteils"], rate: [0, 5], description: "Raideurs articulaires des orteils suite à fractures consolidées (voir ci-après raideurs, ankyloses, amputations).", rateCriteria: { low: "Raideur minime, gêne au chaussage discrète.", high: "Raideurs multiples avec gêne fonctionnelle." } },
            
            // Ankyloses du gros orteil
            { name: "Ankylose complète du gros orteil - En bonne position", searchTerms: ["ankylose complète gros orteil en bonne position rectitude prolongement pied", "ankylose gros orteil bonne position", "ankylose hallux position favorable"], rate: [2, 5], description: "Ankylose complète du gros orteil en rectitude dans le prolongement du pied (position fonctionnelle favorable).", rateCriteria: { low: "Ankylose en position idéale, adaptation bonne.", high: "Ankylose en bonne position mais avec douleurs résiduelles ou troubles statiques." } },
            { name: "Ankylose complète du gros orteil - En mauvaise position", searchTerms: ["ankylose complète gros orteil en mauvaise position hyperextension flexion déviation latérale", "ankylose gros orteil position défavorable", "ankylose hallux position vicieuse"], rate: [10, 12], description: "Ankylose complète du gros orteil en mauvaise position : hypérextension, flexion ou déviation latérale. Note du barème : l'ablation est indiquée et bénigne.", rateCriteria: { low: "Position vicieuse modérée, gêne au chaussage.", high: "Position très défavorable, douleurs d'appui, nécessité ablation." } },
            
            // Ankyloses des autres orteils
            { name: "Ankylose des autres orteils - En position défavorable", searchTerms: ["ankylose autres orteils en position défavorable hyperextension flexion chevauchement", "ankylose orteil 2 3 4 5 position vicieuse", "ankylose orteil mauvaise position"], rate: [5, 15], description: "Ankylose des autres orteils (2e, 3e, 4e, 5e) en position défavorable : hypérextension équivalente à l'amputation, flexion, chevauchement sur les voisins. Note du barème : l'ablation est indiquée et bénigne.", rateCriteria: { low: "Ankylose d'un seul orteil en position modérément défavorable.", high: "Ankyloses multiples ou position très invalidante (chevau chement, griffe), conflit chaussage majeur." } },
            { name: "Ankylose des autres orteils - En position rectiligne favorable", searchTerms: ["ankylose autres orteils en position rectiligne favorable", "ankylose orteil 2 3 4 5 bonne position", "ankylose orteil position fonctionnelle"], rate: [0, 5], description: "Ankylose des autres orteils (2e, 3e, 4e, 5e) en position rectiligne et favorable.", rateCriteria: { low: "Ankylose en position fonctionnelle, pas de gêne.", high: "Ankylose avec légère gêne au chaussage." } },
            
            // Amputations sans les métatarsiens - Gros orteil
            { name: "Amputation gros orteil - Deuxième phalange seule", searchTerms: ["amputation gros orteil deuxième phalange seule", "amputation hallux phalange distale", "amputation P2 gros orteil"], rate: [3, 5], description: "Amputation de la deuxième phalange du gros orteil (phalange distale) sans atteinte de la première phalange.", rateCriteria: { low: "Amputation distale propre, troubles propulsion minimes.", high: "Troubles appui et propulsion modérés." } },
            { name: "Amputation gros orteil - Deuxième phalange et inertie première phalange", searchTerms: ["amputation gros orteil deuxième phalange inertie première", "amputation hallux P2 inertie P1", "amputation gros orteil avec raideur"], rate: [6, 8], description: "Amputation de la deuxième phalange du gros orteil avec inertie (raideur/ankylose) de la première phalange.", rateCriteria: { low: "Inertie partielle P1, adaptation possible.", high: "Ankylose complète P1, troubles appui/propulsion nets." } },
            { name: "Amputation gros orteil - Les deux phalanges", searchTerms: ["amputation gros orteil les deux phalanges", "amputation hallux complète phalanges", "amputation totale gros orteil métatarsien conservé"], rate: [8, 12], description: "Amputation complète des deux phalanges du gros orteil (sans atteinte du métatarsien).", rateCriteria: { low: "Amputation propre, moignon M1 conservé, troubles propulsion modérés.", high: "Troubles appui/propulsion importants, boiterie, transfert d'appui latéral." } },
            
            // Amputations sans les métatarsiens - Autres orteils individuels
            { name: "Amputation troisième ou quatrième orteil", searchTerms: ["amputation troisième quatrième orteil", "amputation orteil 3 4 central", "perte orteil 3e 4e"], rate: [1, 2], description: "Amputation d'un orteil central (3e ou 4e), peu invalidante.", rateCriteria: { low: "Gêne esthétique principalement.", high: "Troubles appui modérés, conflit chaussage." } },
            { name: "Amputation deuxième ou cinquième orteil", searchTerms: ["amputation deuxième cinquième orteil", "amputation orteil 2 5 latéral", "perte orteil 2e 5e"], rate: [2, 3], description: "Amputation du deuxième orteil ou du cinquième orteil (orteils de bordure).", rateCriteria: { low: "Gêne esthétique et troubles appui minimes.", high: "Troubles appui modérés, déséquilibre avant-pied." } },
            
            // Amputations sans les métatarsiens - Ablations simultanées
            { name: "Ablation simultanée premier et deuxième orteils", searchTerms: ["ablation simultanée premier deuxième orteils", "amputation gros orteil et deuxième orteil", "amputation orteil 1 et 2"], rate: [9, 13], description: "Ablation simultanée du gros orteil (1er) et du deuxième orteil.", rateCriteria: { low: "Amputation propre, adaptation possible.", high: "Troubles appui/propulsion importants, boiterie." } },
            { name: "Ablation simultanée premier, deuxième et troisième orteils", searchTerms: ["ablation simultanée premier deuxième troisième orteils", "amputation orteils 1 2 3", "perte trois orteils dont hallux"], rate: [9, 14], description: "Ablation simultanée des trois premiers orteils (1er, 2e, 3e).", rateCriteria: { low: "Adaptation satisfaisante, appui sur orteils restants.", high: "Troubles appui/propulsion majeurs, boiterie nette." } },
            { name: "Ablation simultanée premier, deuxième, troisième et quatrième orteils", searchTerms: ["ablation simultanée premier deuxième troisième quatrième orteils", "amputation orteils 1 2 3 4", "perte quatre orteils"], rate: [12, 16], description: "Ablation simultanée de quatre orteils (1er, 2e, 3e, 4e), seul le 5e orteil est conservé.", rateCriteria: { low: "Appui possible sur 5e orteil, adaptation partielle.", high: "Troubles statiques majeurs, avant-pied quasi non fonctionnel." } },
            { name: "Ablation simultanée deuxième, troisième, quatrième orteils", searchTerms: ["ablation simultanée deuxième troisième quatrième orteils", "amputation orteils 2 3 4 centraux", "perte orteils centraux"], rate: [4, 6], description: "Ablation simultanée des trois orteils centraux (2e, 3e, 4e), conservation du gros orteil et du 5e.", rateCriteria: { low: "Gros orteil conservé, appui/propulsion partiellement préservés.", high: "Troubles appui modérés malgré conservation hallux." } },
            { name: "Ablation simultanée deuxième, troisième, quatrième, cinquième orteils", searchTerms: ["ablation simultanée deuxième troisième quatrième cinquième orteils", "amputation orteils 2 3 4 5", "perte quatre orteils latéraux"], rate: [8, 10], description: "Ablation simultanée de quatre orteils latéraux (2e, 3e, 4e, 5e), seul le gros orteil est conservé.", rateCriteria: { low: "Gros orteil conservé assure propulsion partielle.", high: "Troubles appui latéral importants, boiterie." } },
            { name: "Ablation simultanée troisième et quatrième orteils", searchTerms: ["ablation simultanée troisième quatrième orteils", "amputation orteils 3 4 centraux", "perte deux orteils centraux"], rate: [1, 2], description: "Ablation simultanée des deux orteils centraux (3e et 4e).", rateCriteria: { low: "Gêne esthétique principalement.", high: "Troubles appui modérés." } },
            { name: "Ablation simultanée troisième, quatrième, cinquième orteils", searchTerms: ["ablation simultanée troisième quatrième cinquième orteils", "amputation orteils 3 4 5 latéraux", "perte trois orteils latéraux"], rate: [4, 6], description: "Ablation simultanée de trois orteils latéraux (3e, 4e, 5e).", rateCriteria: { low: "Gros et deuxième orteils conservés, appui/propulsion partiellement préservés.", high: "Troubles appui latéral modérés." } },
            { name: "Ablation simultanée quatrième et cinquième orteils", searchTerms: ["ablation simultanée quatrième cinquième orteils", "amputation orteils 4 5", "perte deux orteils latéraux"], rate: [2, 4], description: "Ablation simultanée des deux derniers orteils (4e et 5e).", rateCriteria: { low: "Gêne esthétique et troubles appui minimes.", high: "Troubles appui latéral modérés." } },
            { name: "Ablation simultanée tous les orteils y compris le gros orteil", searchTerms: ["ablation simultanée tous les orteils y compris gros orteil", "amputation tous orteils", "perte cinq orteils"], rate: [20, 30], description: "Amputation de tous les orteils (1er, 2e, 3e, 4e, 5e), sans atteinte des métatarsiens.", rateCriteria: { low: "Métatarsiens conservés, appui plantaire possible, adaptation avec orthèse.", high: "Troubles appui/propulsion majeurs, boiterie importante, nécessité appareillage." } },
            
            // Amputations avec les métatarsiens
            { name: "Amputation gros orteil avec son métatarsien", searchTerms: ["amputation gros orteil avec son métatarsien", "amputation hallux et M1", "désarticulation tarso métatarsienne gros orteil"], rate: [18, 20], description: "Amputation du gros orteil avec son métatarsien (M1).", rateCriteria: { low: "Adaptation satisfaisante, appui sur métatarsiens restants.", high: "Troubles appui/propulsion majeurs, valgus pied, boiterie nette." } },
            { name: "Amputation deuxième ou cinquième orteil avec son métatarsien", searchTerms: ["amputation deuxième cinquième orteil avec son métatarsien", "amputation orteil 2 5 avec métatarsien", "perte rayon métatarsien 2 ou 5"], rate: [10, 12], description: "Amputation du 2e ou du 5e orteil avec son métatarsien.", rateCriteria: { low: "Adaptation satisfaisante, troubles appui modérés.", high: "Troubles statiques et appui importants, déséquilibre avant-pied." } },
            { name: "Amputation troisième ou quatrième orteil avec son métatarsien", searchTerms: ["amputation troisième quatrième orteil avec son métatarsien", "amputation orteil 3 4 avec métatarsien", "perte rayon métatarsien central"], rate: [4, 6], description: "Amputation du 3e ou du 4e orteil avec son métatarsien.", rateCriteria: { low: "Troubles appui modérés, adaptation possible.", high: "Troubles statiques, métatarsalgies de transfert." } },
            { name: "Amputation premier et cinquième orteils avec leurs métatarsiens", searchTerms: ["amputation premier cinquième orteils avec leurs métatarsiens", "amputation orteil 1 et 5 avec M1 M5", "perte rayons bordure"], rate: [20, 25], description: "Amputation des orteils de bordure (1er et 5e) avec leurs métatarsiens (M1 et M5).", rateCriteria: { low: "Conservation orteils centraux, appui partiel possible.", high: "Troubles statiques majeurs, avant-pied très étroit, boiterie importante." } },
            { name: "Amputation quatrième et cinquième orteils avec leurs métatarsiens", searchTerms: ["amputation quatrième cinquième orteils avec leurs métatarsiens", "amputation orteils 4 5 avec M4 M5", "perte deux rayons latéraux"], rate: [15, 20], description: "Amputation des 4e et 5e orteils avec leurs métatarsiens (M4 et M5).", rateCriteria: { low: "Conservation orteils médiaux, appui partiel préservé.", high: "Troubles appui latéral importants, varus pied." } },
            { name: "Amputation troisième, quatrième, cinquième orteils avec leurs métatarsiens", searchTerms: ["amputation troisième quatrième cinquième orteils avec leurs métatarsiens", "amputation orteils 3 4 5 avec métatarsiens", "perte trois rayons latéraux"], rate: [20, 25], description: "Amputation des 3e, 4e et 5e orteils avec leurs métatarsiens (M3, M4, M5).", rateCriteria: { low: "Conservation 1er et 2e rayons, appui/propulsion partiels préservés.", high: "Troubles statiques importants, avant-pied étroit, boiterie." } },
            { name: "Amputation tous les orteils avec leurs métatarsiens (Lisfranc)", searchTerms: ["amputation tous les orteils avec leurs métatarsiens lisfranc", "désarticulation lisfranc", "amputation tarso métatarsienne complète"], rate: [30, 35], description: "Désarticulation de Lisfranc : amputation de tous les orteils avec tous les métatarsiens au niveau de l'articulation tarso-métatarsienne.", rateCriteria: { low: "Appareillage adapté, marche possible avec orthèse.", high: "Troubles statiques majeurs, marche difficile, nécessité appareillage complexe." } },
            
            // Entrées existantes conservées pour compatibilité
            { name: "Amputation du gros orteil", searchTerms: ["amputation gros orteil", "orteil gros amputation", "amputation gros", "gros orteil"], rate: [5, 8], rateCriteria: { low: "Amputation distale (phalange distale), troubles propulsion minimes.", high: "Amputation complète gros orteil, troubles appui/propulsion nets, boiterie." } },
            { name: "Amputation d'un autre orteil", searchTerms: ["amputation d'un autre orteil", "orteil autre d'un amputation", "amputation d'un", "d'un autre", "autre orteil"], rate: [1, 3], rateCriteria: { low: "Amputation orteil latéral (4ème/5ème), gêne esthétique surtout.", high: "Amputation 2ème orteil, troubles appui modérés." } },
            { name: "Amputation de deux orteils (dont le gros orteil)", searchTerms: ["amputation deux orteils dont gros orteil", "orteil gros dont orteils deux amputation", "amputation deux", "deux orteils", "orteils dont"], rate: 12, description: "Amputation du gros orteil plus un autre orteil." },
            { name: "Amputation de trois orteils ou plus (dont le gros orteil)", searchTerms: ["amputation trois orteils plus dont gros orteil", "orteil gros dont plus orteils trois amputation", "amputation trois", "trois orteils", "orteils plus"], rate: 15, description: "Amputation du gros orteil plus au moins deux autres orteils." },
            { name: "Amputation de l'avant-pied (Chopart)", searchTerms: ["amputation l'avant pied chopart", "chopart pied l'avant amputation", "amputation l'avant", "l'avant pied", "pied chopart"], rate: 35, description: "Désarticulation médio-tarsienne, amputation au niveau de Chopart." },
            { name: "Ankylose ou raideur du gros orteil (Hallux rigidus)", searchTerms: ["ankylose raideur gros orteil hallux rigidus", "rigidus hallux orteil gros raideur ankylose", "ankylose raideur", "raideur gros", "gros orteil"], rate: [3, 10], rateCriteria: { low: "Raideur partielle IP, limitation légère déroulement pas.", medium: "Ankylose MP en position neutre, déroulement pas perturbé.", high: "Ankylose MP en flexion/extension pathologique, douleurs permanentes, troubles marche, nécessité chaussage orthopédique." } },
            { name: "Ankylose du gros orteil", searchTerms: ["ankylose gros orteil", "orteil gros ankylose", "ankylose gros", "gros orteil"], rate: 5, description: "Ankylose articulaire du gros orteil en position fonctionnelle." },
            { name: "Ankylose d'un orteil (autre que gros orteil)", searchTerms: ["ankylose d'un orteil autre que gros orteil", "orteil gros que autre orteil d'un ankylose", "ankylose d'un", "d'un orteil", "orteil autre"], rate: 2, description: "Ankylose articulaire d'un orteil latéral." },
            { name: "Raideur du gros orteil", searchTerms: ["raideur gros orteil", "orteil gros raideur", "raideur gros", "gros orteil"], rate: [2, 4], rateCriteria: { low: "Raideur légère sans impact fonctionnel majeur.", high: "Raideur importante avec gêne à la marche." } },
            { name: "Hallux valgus post-traumatique symptomatique", searchTerms: ["hallux valgus post traumatique symptomatique", "symptomatique traumatique post valgus hallux", "hallux valgus", "valgus post", "post traumatique"], rate: [5, 15], rateCriteria: { low: "Déviation modérée sans conflit chaussage.", high: "Déviation sévère avec douleurs permanentes et conflit chaussage majeur." }, description: "Déviation du gros orteil en valgus secondaire à un traumatisme.", imageUrl: "/images/medical/Hallux-Valgus.jpg", clinicalTip: "Vérifier : angle M1-P1 > 15° (normal < 15°), angle inter-métatarsien M1-M2 > 9° (normal < 9°), déformation en Z de la 1ère colonne, bursite (oignon) en regard de la tête M1, griffe compensatrice du gros orteil, durillons plantaires sous M2-M3 (transfert d'appui), conflit chaussage, douleurs à la marche. Mesure radiographique indispensable pour évaluation objective." },
            { name: "Griffes des orteils post-traumatiques", searchTerms: ["griffes des orteils post traumatiques", "traumatiques post orteils des griffes", "griffes orteils post traumatiques", "griffes des", "des orteils"], rate: [5, 10], rateCriteria: { low: "Griffes partielles, gêne au chaussage minime.", high: "Griffes complètes multiples avec conflits chaussage et douleurs." }, description: "Déformation en griffe des orteils suite à un traumatisme.", imageUrl: "/images/medical/Griffes des orteils .jpg", clinicalTip: "L'image montre la déformation caractéristique en griffe : hyperextension de l'articulation métatarso-phalangienne (MTP), flexion de l'articulation interphalangienne proximale (IPP), et extension/flexion variable de l'articulation interphalangienne distale (IPD). Examiner : test de réductibilité passif (souple vs rigide), durillons dorsaux IPP (frottement chaussures), durillons plantaires sous têtes métatarsiennes (transfert d'appui), conflit chaussage, test de marche sur pointe (démasque griffe compensatrice), évaluer tous les orteils (souvent multiple). Radiographies en charge pour évaluation subluxation MTP et planification chirurgicale si nécessaire." },
            { name: "Cal vicieux d'un métatarsien", searchTerms: ["cal vicieux d'un métatarsien", "métatarsien d'un vicieux cal", "cal vicieux", "vicieux d'un", "d'un métatarsien"], rate: [5, 10], rateCriteria: { low: "Cal vicieux modéré sans impact fonctionnel majeur.", high: "Cal vicieux important avec métatarsalgie et troubles de l'appui." }, description: "Consolidation vicieuse d'une fracture métatarsienne." },
            { name: "Fracture consolidée phalange gros orteil avec raideur", searchTerms: ["fracture consolidée phalange gros orteil avec raideur", "raideur avec orteil gros phalange consolidée fracture", "fracture consolidée phalange gros orteil raideur", "fracture consolidée", "consolidée phalange"], rate: [2, 5], rateCriteria: { low: "Fracture phalange distale, cal vicieux minime, raideur IP discrète.", medium: "Fracture phalange proximale ou moyenne, raideur MP partielle.", high: "Cal vicieux avec déformation, raideur importante, douleurs résiduelles." } },
            { name: "Fracture consolidée phalange autre orteil avec raideur", searchTerms: ["fracture consolidée phalange autre orteil avec raideur", "raideur avec orteil autre phalange consolidée fracture", "fracture consolidée phalange autre orteil raideur", "fracture consolidée", "consolidée phalange"], rate: [1, 3], rateCriteria: { low: "Fracture phalange orteil latéral (3ème-5ème), raideur minime, gêne au chaussage seulement.", medium: "Fracture 2ème orteil avec raideur et douleurs mécaniques.", high: "Cal vicieux important, déformation en griffe, douleurs appui." } },
        ]
      },
      {
        name: "Membre Inférieur - Raccourcissement (Détails Précis)",
        injuries: [
            { 
              name: "Raccourcissement membre inférieur : 2 cm ou 3 cm", 
              searchTerms: ["raccourcissement membre inférieur", "inférieur membre raccourcissement", "raccourcissement membre", "membre inférieur"], rate: 4,
              description: "Raccourcissement du membre inférieur de 2 à 3 centimètres. Barème officiel : 4%."
            },
            { 
              name: "Raccourcissement membre inférieur : 4 cm", 
              searchTerms: ["raccourcissement membre inférieur", "inférieur membre raccourcissement", "raccourcissement membre", "membre inférieur"], rate: 9,
              description: "Raccourcissement du membre inférieur de 4 centimètres. Barème officiel : 9%."
            },
            { 
              name: "Raccourcissement membre inférieur : 5 cm", 
              searchTerms: ["raccourcissement membre inférieur", "inférieur membre raccourcissement", "raccourcissement membre", "membre inférieur"], rate: 15,
              description: "Raccourcissement du membre inférieur de 5 centimètres. Barème officiel : 15%."
            },
            { 
              name: "Raccourcissement membre inférieur : 6 cm", 
              searchTerms: ["raccourcissement membre inférieur", "inférieur membre raccourcissement", "raccourcissement membre", "membre inférieur"], rate: 18,
              description: "Raccourcissement du membre inférieur de 6 centimètres. Barème officiel : 18%."
            },
            { 
              name: "Raccourcissement membre inférieur : 7 cm", 
              searchTerms: ["raccourcissement membre inférieur", "inférieur membre raccourcissement", "raccourcissement membre", "membre inférieur"], rate: 21,
              description: "Raccourcissement du membre inférieur de 7 centimètres. Barème officiel : 21%."
            },
            { 
              name: "Raccourcissement membre inférieur : 8 cm", 
              searchTerms: ["raccourcissement membre inférieur", "inférieur membre raccourcissement", "raccourcissement membre", "membre inférieur"], rate: 24,
              description: "Raccourcissement du membre inférieur de 8 centimètres. Barème officiel : 24%."
            },
            { 
              name: "Raccourcissement membre inférieur : 9 cm", 
              searchTerms: ["raccourcissement membre inférieur", "inférieur membre raccourcissement", "raccourcissement membre", "membre inférieur"], rate: 28,
              description: "Raccourcissement du membre inférieur de 9 centimètres. Barème officiel : 28%."
            },
            { 
              name: "Raccourcissement membre inférieur : 10 cm", 
              searchTerms: ["raccourcissement membre inférieur", "inférieur membre raccourcissement", "raccourcissement membre", "membre inférieur"], rate: 30,
              description: "Raccourcissement du membre inférieur de 10 centimètres. Barème officiel : 30%."
            },
            { name: "Raccourcissement d'un membre inférieur", searchTerms: ["raccourcissement d'un membre inférieur", "inférieur membre d'un raccourcissement", "raccourcissement d'un", "d'un membre", "membre inférieur"], rate: [5, 25], rateCriteria: { low: "Raccourcissement de 1 à 2 cm.", high: "Raccourcissement > 4 cm." } },
        ]
      },
      {
        name: "Membre Inférieur - Lésions Tendineuses et Musculaires",
        injuries: [
            { 
              name: "Luxation tendons péroniers (tendons fibulaires) non opérée", 
              searchTerms: ["luxation tendons péroniers tendons fibulaires non opérée", "opérée non fibulaires tendons péroniers tendons luxation", "luxation tendons", "tendons péroniers", "péroniers tendons"], rate: [5, 10],
              description: "Luxation des tendons péroniers (fibulaires) latéraux non opérée avec instabilité et douleurs lors des mouvements de la cheville. Barème officiel : 5-10% si douleur continue.",
              rateCriteria: {
                low: "Luxation occasionnelle, gêne modérée à l'activité sportive, douleurs intermittentes.",
                high: "Luxation répétée à chaque mouvement, douleurs continues, limitation marche et activités."
              }
            },
            { 
              name: "Luxation tendons péroniers (tendons fibulaires) opérée", 
              searchTerms: ["luxation tendons péroniers tendons fibulaires opérée", "opérée fibulaires tendons péroniers tendons luxation", "luxation tendons", "tendons péroniers", "péroniers tendons"], rate: [0, 5],
              description: "Luxation des tendons péroniers (fibulaires) après traitement chirurgical de stabilisation. Barème officiel : 0-5%.",
              rateCriteria: {
                low: "Stabilisation réussie, pas de luxation résiduelle, gêne minime.",
                high: "Stabilisation partielle, luxation occasionnelle résiduelle, douleurs mécaniques."
              }
            },
            { 
              name: "Rupture complète tendons péroniers (péronier latéral long et/ou court)", 
              searchTerms: ["rupture complète tendons péroniers péronier latéral long et/ou court", "court et/ou long latéral péronier péroniers tendons complète rupture", "rupture complète", "complète tendons", "tendons péroniers"], rate: [10, 20],
              description: "Rupture complète d'un ou des deux tendons péroniers (fibulaires) latéraux avec déficit de l'éversion du pied et instabilité. Barème officiel : 10-20%.",
              rateCriteria: {
                low: "Rupture d'un seul tendon (long ou court), gêne modérée, compensation possible.",
                high: "Rupture des deux tendons, déficit majeur de l'éversion, instabilité cheville, marche sur terrain inégal très difficile."
              }
            },
            { 
              name: "Rupture tendon d'Achille complète", 
              searchTerms: ["rupture tendon d'achille complète", "rupture achilléenne complète", "déchirure totale achille"], 
              rate: [12, 25],
              description: "Rupture complète du tendon d'Achille (calcanéen) avec séquelles fonctionnelles malgré traitement. Barème officiel : 12-25%.",
              rateCriteria: {
                low: "Réparation chirurgicale satisfaisante, légère perte de force plantaire, course impossible mais marche normale, montée pointe pieds difficile.",
                medium: "Allongement tendineux avec boiterie modérée, marche sur pointe impossible, escaliers difficiles, amyotrophie mollet.",
                high: "Allongement majeur ou re-rupture, déficit force plantaire sévère, boiterie permanente, marche limitée, impossibilité montée escaliers sans aide."
              }
            },
            { 
              name: "Rupture tendon d'Achille avec séquelles", 
              searchTerms: ["rupture tendon d'achille avec séquelles", "séquelles avec d'achille tendon rupture", "rupture tendon d'achille séquelles", "rupture tendon", "tendon d'achille"], rate: [10, 25],
              description: "Rupture du tendon d'Achille (calcanéen) avec séquelles fonctionnelles malgré traitement (chirurgical ou orthopédique).",
              rateCriteria: {
                low: "Réparation satisfaisante, légère perte de force plantaire, course impossible mais marche normale.",
                medium: "Allongement tendineux avec boiterie, marche sur pointe impossible, escaliers difficiles.",
                high: "Allongement majeur ou re-rupture, déficit force plantaire sévère, boiterie permanente, marche limitée."
              }
            },
            { 
              name: "Rupture complète du triceps des adducteurs", 
              searchTerms: ["rupture complète triceps adducteurs", "déchirure totale adducteurs cuisse", "rupture muscles adducteurs"], 
              rate: [10, 25],
              description: "Rupture complète du triceps des adducteurs de la cuisse avec séquelles fonctionnelles. Barème officiel : 10-25%.",
              rateCriteria: {
                low: "Rupture partielle réparée, déficit force adduction modéré, gêne lors des changements de direction.",
                medium: "Rupture complète avec déficit force adduction important, boiterie modérée, limitation activités sportives.",
                high: "Rupture complète non réparée ou récidivante, déficit majeur d'adduction, instabilité hanche, boiterie importante, limitation marche."
              }
            },
        ]
      },
      {
        name: "Membre Inférieur - Lésions Diverses",
        injuries: [
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
          { 
            name: "Cicatrice vicieuse thorax antérieur", 
            description: "Cicatrice chéloïde ou rétractile de la face antérieure du thorax avec adhérences aux plans profonds et gêne esthétique.",
            rate: 8 
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
          { 
            name: "Ostéomyélite chronique - Fistule persistante unique", 
            searchTerms: ["ostéomyélite chronique fistule persistante unique", "fistule osseuse unique", "ostéite fistule"], 
            rate: [10, 15], 
            description: "Ostéomyélite chronique avec fistule cutanée persistante unique (orifice de drainage d'une infection osseuse chronique). Barème officiel Chapitre XIII : 10-15%.",
            rateCriteria: { 
              low: "Fistule unique peu productive, pansements simples, pas de douleur majeure.",
              high: "Fistule productive nécessitant des soins quotidiens, douleurs chroniques, épisodes de réactivation."
            }
          },
          { 
            name: "Ostéomyélite chronique - Fistules multiples persistantes rebelles", 
            searchTerms: ["ostéomyélite chronique fistules multiples persistantes rebelles", "fistules osseuses multiples", "ostéite fistules"], 
            rate: [20, 50], 
            description: "Ostéomyélite chronique avec fistules cutanées multiples persistantes, résistantes au traitement chirurgical et antibiotique. Barème officiel Chapitre XIII : 20-50%.",
            rateCriteria: { 
              low: "Fistules multiples (2-3), écoulements modérés, soins réguliers nécessaires.",
              medium: "Fistules nombreuses (>3), écoulements abondants, pansements quotidiens, épisodes infectieux fréquents.",
              high: "Fistules très nombreuses, ostéite extensive rebelle, échec chirurgical répété, risque d'amputation."
            }
          },
          { 
            name: "Ostéomyélite cicatrisée - Persistance d'os volumineux et irrégulier", 
            searchTerms: ["ostéomyélite cicatrisée os volumineux irrégulier", "cal osseux irrégulier", "ostéite consolidée hyperostose", "séquelle ostéomyélite"], 
            rate: [5, 10], 
            description: "Ostéomyélite guérie (absence de fistule) mais avec persistance d'un cal osseux volumineux et irrégulier entraînant une gêne fonctionnelle ou esthétique. Barème officiel Chapitre XIII : 5-10%.",
            rateCriteria: { 
              low: "Cal osseux hypertrophique avec gêne modérée (chaussage, habillement), pas de douleur.",
              high: "Cal osseux très volumineux avec gêne importante, douleurs résiduelles, limitation fonctionnelle."
            }
          },
          { 
            name: "Ostéomes post-traumatiques (exostoses)", 
            searchTerms: ["ostéomes post traumatiques exostoses", "ossifications hétérotopiques", "cal osseux hypertrophique", "exostose traumatique"], 
            rate: [5, 10], 
            description: "Ostéomes (excroissances osseuses) apparus après un traumatisme. Selon localisation, volume et gêne fonctionnelle. Barème officiel Chapitre XII : 5-10%.",
            rateCriteria: { 
              low: "Ostéome unique, petit volume, peu gênant.",
              high: "Ostéomes multiples ou volumineux, compression nerveuse ou vasculaire, limitation articulaire."
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
            },
            excludeContext: ['fracture', 'tibia', 'genou', 'femur', 'jambe', 'membre inferieur', 'ligament', 'menisque', 'rotule', 'cheville', 'pied']
          },
          { 
            name: "Prolapsus génital post-traumatique sévère", 
            searchTerms: ["prolapsus génital post traumatique sévère", "sévère traumatique post génital prolapsus", "prolapsus génital", "génital post", "post traumatique"], rate: [20, 40], 
            description: "Descente d'organes pelviens (vessie, utérus, rectum) après un accouchement difficile ou un traumatisme pelvien.",
            rateCriteria: { 
              low: "Prolapsus de stade II (descente jusqu'à l'orifice vaginal), gêne modérée, amélioré par la rééducation périnéale.", 
              medium: "Prolapsus de stade III (extériorisation partielle), nécessité d'un pessaire ou d'une chirurgie, incontinence urinaire d'effort associée.",
              high: "Prolapsus de stade IV (extériorisation complète), échec chirurgical ou récidive, incontinence urinaire et/ou fécale majeure, retentissement majeur sur la qualité de vie."
            },
            excludeContext: ['fracture', 'tibia', 'genou', 'femur', 'jambe', 'membre inferieur', 'ligament', 'menisque', 'rotule', 'cheville', 'pied']
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
            description: "Schizophrénie déclenchée par un traumatisme crânien grave ou un stress post-traumatique majeur. IMPORTANT: Imputabilité partielle possible selon importance traumatisme (1/3, 1/2, exceptionnellement totale). Conditions strictes: intégrité mentale antérieure démontrée + traumatisme grave avec syndrome post-commotionnel immédiat grave. État dissociatif modéré dépressif plus facilement admis que forme paranoïde ou hébéphrénie.",
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
];

// Fusionner toutes les catégories (barème algérien + middleCategories + complément)
// La fonction mergeCategories va automatiquement fusionner les catégories portant le même nom
export const disabilityData: InjuryCategory[] = mergeCategories([
  ...algerianBareme1967,
  ...middleCategories,
  ...mayetReyComplement,
]);
