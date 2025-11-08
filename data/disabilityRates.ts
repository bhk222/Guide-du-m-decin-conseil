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
          { name: "Lésions du cuir chevelu avec phénomènes douloureux, sans brèche osseuse", rate: [0, 15], rateCriteria: { low: "Cicatrices souples, indolores, pas de gêne esthétique.", medium: "Cicatrices sensibles ou légèrement douloureuses à la pression.", high: "Névralgies post-traumatiques persistantes, cicatrices inesthétiques et douloureuses." } },
          { name: "Scalp ou brûlures du cuir chevelu avec cicatrices douloureuses", rate: [5, 20], rateCriteria: { low: "Cicatrice souple, peu étendue, sensibilité conservée.", medium: "Cicatrice adhérente, alopécique, avec dysesthésies.", high: "Cicatrice étendue, rétractile, douloureuse, avec alopécie majeure et retentissement psychologique." } },
          { name: "Perte de cheveux post-traumatique (si gêne le travail)", rate: [4, 6] },
        ]
      },
      {
        name: "Crâne - Lésions Osseuses",
        injuries: [
          { name: "Enfoncement de la seule table externe", rate: [0, 10], rateCriteria: { low: "Asymptomatique, non palpable, découverte radiologique.", high: "Déformation palpable, céphalées localisées." } },
          { name: "Brèche osseuse (1 à 4 cm²)", rate: 20 },
          { name: "Brèche osseuse avec battements duremériens (jusqu'à 12 cm²)", rate: [20, 50], rateCriteria: { low: "Petite brèche (< 4cm²), bien tolérée, sans signe neurologique.", medium: "Brèche de taille moyenne, sensation de pulsation, céphalées d'effort.", high: "Large brèche (> 8cm²), risque de complications (méningite), nécessité de cranioplastie, retentissement psychologique." } },
          { name: "Brèche osseuse (> 12 cm²) avec troubles subjectifs", rate: [50, 70], rateCriteria: { low: "Syndrome subjectif modéré, bien contrôlé par traitement.", high: "Syndrome post-commotionnel sévère, invalidant, avec risque de complications (épilepsie)." } },
          { name: "Fistule de liquide céphalo-rachidien (LCR) persistante (otorrhée ou rhinorrhée)", rate: [30, 60], description: "Communication anormale entre les espaces méningés et les cavités nasales ou de l'oreille, suite à une fracture de la base du crâne.", rateCriteria: { low: "Fistule de bas débit, intermittente, ayant nécessité une prise en charge médicale simple (repos, ponctions lombaires).", high: "Fistule à haut débit, persistante, nécessitant une ou plusieurs interventions chirurgicales complexes, avec risque élevé de méningite." } },
        ]
      },
      {
        name: "Syndrome Post-Commotionnel",
        injuries: [
          { name: "Syndrome subjectif commun des blessures du crâne (céphalée, vertiges, troubles de l'humeur)", rate: [5, 50], rateCriteria: { low: "Céphalées et vertiges occasionnels, sans retentissement sur les activités.", medium: "Symptômes fréquents, nécessitant un traitement ponctuel, gêne dans les activités complexes.", high: "Syndrome invalidant quasi-permanent avec retentissement socio-professionnel majeur." } },
          { name: "Céphalées post-traumatiques chroniques", rate: [5, 20], rateCriteria: { low: "Crises occasionnelles (< 4 jours/mois), répondant bien aux antalgiques usuels, sans impact sur les activités.", medium: "Crises fréquentes (4-14 jours/mois), nécessitant un traitement de fond, avec retentissement modéré sur les activités professionnelles.", high: "Céphalées quasi-quotidiennes (> 15 jours/mois), rebelles au traitement, avec un retentissement socio-professionnel et personnel majeur." } },
          { name: "Persistance de corps étranger intra-crânien sans phénomène surajouté", rate: [20, 60], rateCriteria: { low: "Corps étranger de petite taille, dans une zone non critique, asymptomatique.", high: "Corps étranger volumineux, proche de structures nobles, risque de complications (épilepsie, infection)." } },
          { name: "Syndrome subjectif isolé (céphalées et étourdissements)", rate: [5, 10] },
          { name: "Commotion cérébro-spinale prolongée (syndrome complet)", rate: [5, 60], rateCriteria: { low: "Syndrome subjectif léger persistant au-delà de 3 mois.", medium: "Syndrome subjectif marqué avec retentissement sur les activités quotidiennes.", high: "Syndrome post-commotionnel sévère et invalidant, avec troubles cognitifs objectifs." } },
          { name: "Contusions cérébrales avec signes de localisation (hémiparésie, aphasie...)", description: "À évaluer avec les blessures du cerveau.", rate: [5, 60], rateCriteria: { low: "Séquelles minimes (ex: parésie légère, dysarthrie discrète).", high: "Séquelles importantes (hémiparésie invalidante, aphasie sévère)." } },
          { name: "Déficits cognitifs post-traumatiques (mémoire, attention, fonctions exécutives)", rate: [10, 40], rateCriteria: { low: "Plaintes subjectives avec gêne légère dans les tâches complexes, sans impact majeur sur l'autonomie.", high: "Troubles objectifs confirmés par bilan neuropsychologique, avec retentissement significatif sur la vie professionnelle et quotidienne." } },
          { name: "Syndrome dysexécutif post-traumatique (troubles de la planification, inhibition)", rate: [20, 50], rateCriteria: { low: "Difficultés d'organisation et de double-tâche, avec fatigabilité intellectuelle.", high: "Troubles majeurs du comportement (inhibition, apathie) avec perte d'autonomie sociale." } }
        ]
      },
      {
        name: "Épilepsies Post-Traumatiques",
        injuries: [
          { name: "Crises convulsives généralisées (non jacksoniennes)", rate: [30, 100], rateCriteria: { low: "Crises rares (annuelles), bien contrôlées par monothérapie.", high: "Crises fréquentes et pharmacorésistantes, avec retentissement social et professionnel majeur." } },
          { name: "Crises convulsives généralisées rares", rate: [20, 30] },
          { name: "Équivalents épileptiques (absences, vertiges) - 1 à 3 fois par an", rate: [0, 10] },
          { name: "Équivalents épileptiques - une fois par mois", rate: [10, 20] },
          { name: "Équivalents épileptiques - une fois par semaine", rate: [20, 30] },
          { name: "Équivalents épileptiques - trois fois par semaine", rate: [40, 50] },
          { name: "Équivalents épileptiques - très fréquents avec manifestations graves", rate: [40, 80] },
          { name: "Crises jacksoniennes limitées - jusqu'à 12 fois par an", rate: [0, 10] },
          { name: "Crises jacksoniennes limitées - jusqu'à 1 fois par semaine", rate: [10, 20] },
          { name: "Crises jacksoniennes limitées - plusieurs fois par semaine", rate: [20, 30] },
          { name: "Crises jacksoniennes étendues - jusqu'à 12 fois par an", rate: [10, 20] },
          { name: "Crises jacksoniennes étendues - jusqu'à 1 fois par semaine", rate: [20, 30] },
          { name: "Crises jacksoniennes étendues - plusieurs fois par semaine", rate: [20, 40] },
        ]
      },
      {
        name: "Syndromes Neurologiques Spécifiques",
        injuries: [
          { name: "Syndrome Cérébelleux Unilatéral (Côté Droit)", rate: [10, 80] },
          { name: "Syndrome Cérébelleux Unilatéral (Côté Gauche)", rate: [10, 75] },
          { name: "Syndrome Cérébelleux Bilatéral", rate: [30, 100] },
          { name: "Syndrome de Parkinson Post-Traumatique", rate: [10, 100] },
          { name: "Mouvements anormaux post-traumatiques (dystonie, chorée, tremblements)", rate: [15, 60], description: "Apparition de mouvements involontaires (postures anormales, tremblements de repos ou d'action, mouvements brusques) après un traumatisme crânien ou périphérique.", rateCriteria: { low: "Mouvements discrets, intermittents, n'entraînant qu'une gêne mineure dans les activités.", medium: "Mouvements modérés et fréquents, contrôlés partiellement par le traitement, avec un retentissement sur les gestes fins ou la marche.", high: "Mouvements invalidants, permanents, rebelles au traitement, avec un retentissement majeur sur l'autonomie." } },
          { name: "Torticolis Traumatique", rate: [15, 20] },
          { name: "Insuffisance Antéhypophysaire (Hypopituitarisme) Post-Traumatique", rate: [40, 80], description: "Déficits hormonaux multiples suite à un traumatisme crânien grave.", rateCriteria: { low: "Atteinte d'un ou deux axes hormonaux, bien substituée par traitement, avec peu de retentissement.", high: "Panhypopituitarisme nécessitant une poly-substitution hormonale (thyroïde, surrénale, gonadique), avec impact majeur sur l'état général et la qualité de vie." } },
          { name: "Diabète Insipide Post-Traumatique", rate: [15, 30], description: "Trouble de la régulation de l'eau par déficit en hormone antidiurétique (ADH) après un traumatisme crânien.", rateCriteria: { low: "Forme partielle, bien contrôlée par traitement médicamenteux (Minirin), avec syndrome polyuro-polydipsique modéré.", high: "Forme complète avec polyurie majeure (> 5L/jour) et soif intense, nécessitant un traitement à vie et contraignant." } },
          { name: "Narcolepsie-cataplexie post-traumatique", rate: [30, 60], description: "Trouble du sommeil rare mais grave, déclenché par un traumatisme crânien, caractérisé par une somnolence diurne excessive et des pertes brutales du tonus musculaire (cataplexie).", rateCriteria: { low: "Somnolence diurne modérée, crises de cataplexie rares et partielles, bien contrôlées par le traitement.", high: "Somnolence diurne invalidante avec accès de sommeil incoercibles, et cataplexie fréquente, avec retentissement socio-professionnel majeur." } },
          { name: "Hydrocéphalie à pression normale post-traumatique", rate: [40, 80], description: "Trouble de la circulation du LCR après un traumatisme crânien, entraînant la triade : troubles de la marche, troubles cognitifs, incontinence urinaire.", rateCriteria: { low: "Symptômes modérés, partiellement améliorés par une dérivation ventriculo-péritonéale (DVP).", high: "Triade complète et sévère, peu ou pas améliorée par la DVP, avec dépendance majeure." } },
          { name: "Fistule carotido-caverneuse post-traumatique", rate: [20, 50], description: "Communication anormale entre l'artère carotide interne et le sinus caverneux dans le crâne.", rateCriteria: { low: "Fistule de bas débit, avec signes oculaires modérés (chémosis, souffle), traitée avec succès par voie endovasculaire.", high: "Fistule à haut débit avec exophtalmie pulsatile, perte de vision, et/ou complications neurologiques, malgré le traitement." } },
          { name: "Séquelles neurologiques centrales d'une embolie graisseuse post-traumatique", rate: [20, 80], description: "Déficits neurologiques permanents (cognitifs, moteurs, visuels...) après un syndrome d'embolie graisseuse (souvent suite à une fracture d'un os long).", rateCriteria: { low: "Troubles cognitifs légers (syndrome dysexécutif) sans déficit moteur majeur.", high: "Déficits multiples et sévères (syndrome démentiel, troubles moteurs invalidants) avec perte d'autonomie." } },
        ]
      },
      {
        name: "Hémiplégies et Monoplégies (Origine Cérébrale)",
        injuries: [
          { name: "Hémiplégie complète flasque (persistant > 6 mois)", rate: 100 },
          { name: "Hémiplégie complète avec contracture (Côté Droit)", rate: [70, 80] },
          { name: "Hémiplégie complète avec contracture (Côté Gauche)", rate: [50, 70] },
          { name: "Hémiplégie complète avec troubles sphinctériens", rate: [80, 100] },
          { name: "Hémiplégie complète avec aphasie", rate: 100 },
          { name: "Hémiplégie incomplète (Côté Droit)", rate: [10, 60] },
          { name: "Hémiplégie incomplète (Côté Gauche)", rate: [8, 50] },
          { name: "Monoplégie complète - Membre supérieur droit", rate: [70, 75] },
          { name: "Monoplégie complète - Membre supérieur gauche", rate: [60, 65] },
          { name: "Monoplégie incomplète - Membre supérieur droit", rate: [10, 50] },
          { name: "Monoplégie incomplète - Membre supérieur gauche", rate: [10, 40] },
          { name: "Monoplégie incomplète - Membre inférieur (lésion corticale)", rate: [10, 30] },
          { name: "Aphasie avec difficulté d'élocution", rate: [10, 30] },
          { name: "Aphasie de Broca (motrice) post-traumatique", rate: [30, 60], rateCriteria: { low: "Discours haché mais compréhensible, avec conscience du trouble.", high: "Agrammatisme sévère rendant la communication verbale quasi impossible." } },
          { name: "Aphasie de Wernicke (sensorielle) post-traumatique", rate: [40, 70], rateCriteria: { low: "Jargon occasionnel mais compréhension globalement préservée.", high: "Jargonaphasie et anosognosie rendant toute communication inefficace." } },
          { name: "Aphasie sensorielle avec altération du langage intérieur", rate: [60, 100] },
          { name: "Aphasie avec impossibilité de correspondre (mutisme)", rate: [60, 80] },
          { name: "Diplégie cérébrale (marche impossible)", rate: 100 },
          { name: "Diplégie cérébrale (marche possible)", rate: [30, 90] },
        ]
      },
      {
        name: "Psychoses et Névroses Post-Traumatiques",
        injuries: [
          { name: "Démence post-traumatique incomplète", rate: [60, 90] },
          { name: "Démence post-traumatique complète", rate: 100 },
          { name: "Névrose post-traumatique - États neuro-psychasthéniques (signes fonctionnels)", rate: [0, 10] },
          { name: "Névrose post-traumatique - États neuro-psychasthéniques (signes somatiques)", rate: [10, 40] },
          { name: "Névrose post-traumatique - Signes psychiques (fatigabilité cérébrale)", rate: [20, 50] },
          { name: "Névrose post-traumatique - Symptômes vago-sympathiques", rate: [5, 20] },
          { name: "Névrose post-traumatique - Syndromes anxieux", rate: [10, 50] },
          { name: "Névrose post-traumatique - Syndromes moteurs fonctionnels", rate: [0, 20] },
          { name: "Trouble de stress post-traumatique (TSPT)", rate: [10, 50], rateCriteria: { low: "Symptômes d'évitement et d'hypervigilance légers, avec un retentissement modéré sur la vie sociale.", high: "Symptômes sévères et invalidants, avec anxiété majeure, phobies, dépression réactionnelle et retentissement socio-professionnel majeur." } },
          {
            name: "Phobie spécifique post-traumatique (amaxophobie, acrophobie, etc.)",
            rate: [5, 20],
            description: "Peur intense et irrationnelle d'un objet ou d'une situation spécifique liée au traumatisme (ex: peur de conduire après un accident de la route).",
            rateCriteria: {
                low: "Phobie entraînant un évitement occasionnel, sans retentissement majeur sur la vie socio-professionnelle.",
                medium: "Évitement régulier avec nécessité d'adaptation de la vie quotidienne (ex: changer de moyen de transport).",
                high: "Phobie invalidante avec retentissement socio-professionnel majeur et nécessité d'un traitement spécialisé (TCC)."
            }
          },
          { name: "Trouble de l'adaptation avec anxiété et/ou humeur dépressive chronique", rate: [5, 15], rateCriteria: { low: "Symptomatologie modérée n'entravant que partiellement les activités socio-professionnelles.", high: "Symptomatologie marquée avec retentissement notable sur la vie quotidienne et professionnelle, nécessitant un suivi régulier." } },
          { name: "Troubles du sommeil chroniques post-traumatiques (insomnie sévère)", rate: [5, 15], rateCriteria: { low: "Difficultés d'endormissement ou réveils nocturnes occasionnels, avec fatigue diurne modérée.", high: "Insomnie quasi-quotidienne avec retentissement majeur sur la vigilance, l'humeur et les activités socio-professionnelles." } },
          { name: "Trouble de la personnalité post-traumatique (modification du comportement)", rate: [15, 40], rateCriteria: { low: "Changements de l'humeur (labilité, irritabilité) avec difficultés relationnelles.", high: "Changements de personnalité sévères (apathie, désinhibition, agressivité) entraînant une désinsertion sociale et professionnelle." } },
          { name: "Trouble somatoforme douloureux persistant (algie psychogène) post-traumatique", rate: [10, 30], description: "Douleurs chroniques et invalidantes sans substratum organique suffisant, après un diagnostic d'élimination et une confirmation psychiatrique.", rateCriteria: { low: "Plaintes douloureuses focalisées avec retentissement modéré sur les activités socio-professionnelles.", high: "Syndrome douloureux diffus et rebelle, avec comportement algique majeur et désinsertion socio-professionnelle complète." } },
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
          { name: "Séquelles de fracture/luxation du rachis cervical (sans lésion neurologique)", rate: [8, 25], rateCriteria: { low: "Cervicalgies mécaniques occasionnelles, raideur minime.", high: "Cervicalgies quasi-permanentes, raideur invalidante, nécessité de collier cervical." } },
          { name: "Séquelles de fracture/luxation du rachis dorsal (sans lésion neurologique)", rate: [5, 20], rateCriteria: { low: "Dorsalgies d'effort, sans déformation.", high: "Dorsalgies chroniques avec cyphose post-traumatique." } },
          { name: "Séquelles de fracture/luxation du rachis lombaire (sans lésion neurologique)", rate: [10, 30], rateCriteria: { low: "Lombalgies mécaniques, raideur modérée.", high: "Syndrome douloureux lombaire chronique invalidant, troubles statiques." } },
          { name: "Fracture tassement vertébral cervical non déplacée consolidée", rate: [8, 20], description: "Fracture par compression d'une vertèbre cervicale, bien consolidée, sans lésion neurologique.", rateCriteria: { low: "Tassement léger (<25%), cervicalgies mécaniques, mobilité conservée.", medium: "Tassement modéré (25-50%), cervicalgies fréquentes, limitation modérée.", high: "Tassement important (>50%), cyphose, cervicalgies permanentes, limitation marquée." } },
          { name: "Fracture tassement vertébral dorsal non déplacée consolidée", rate: [5, 15], description: "Fracture par compression d'une vertèbre dorsale (D1-D12), bien consolidée, sans lésion neurologique.", rateCriteria: { low: "Tassement léger (<25%), dorsalgies occasionnelles.", medium: "Tassement modéré (25-50%), dorsalgies fréquentes, cyphose débutante.", high: "Tassement important (>50%), cyphose marquée, dorsalgies chroniques." } },
          { name: "Tassement d'une vertèbre dorsale - Avec cyphose", rate: 12 },  // Entrée spécifique pour cas test
          { name: "Fracture tassement vertébral lombaire non déplacée consolidée", rate: [10, 25], description: "Fracture par compression d'une vertèbre lombaire (L1-L5), bien consolidée, sans lésion neurologique.", rateCriteria: { low: "Tassement léger (<25%), lombalgies mécaniques.", medium: "Tassement modéré (25-50%), lombalgies fréquentes, limitation des efforts.", high: "Tassement important (>50%), lombalgies chroniques invalidantes, troubles statiques." } },
          { name: "Tassement d'une vertèbre lombaire - Avec cyphose et/ou raideur", rate: 14 },  // Entrée spécifique pour cas test
          { name: "Hernie discale cervicale post-traumatique - Syndrome rachidien pur (cervicalgies)", rate: [5, 15], rateCriteria: { low: "Douleurs occasionnelles, raideur minime.", high: "Douleurs quasi-permanentes, raideur marquée invalidante." } },
          { name: "Hernie discale cervicale post-traumatique - Avec névralgie cervico-brachiale (NCB)", rate: [15, 30], rateCriteria: { low: "NCB intermittente, bien contrôlée par le traitement, sans déficit neurologique.", high: "NCB rebelle avec signes neurologiques objectifs (déficit moteur, sensitif, troubles trophiques)." } },
          { name: "Hernie discale lombaire post-traumatique - Syndrome rachidien pur (lombalgies)", rate: [5, 20], rateCriteria: { low: "Douleurs mécaniques pures, sans limitation majeure d'activité.", high: "Douleurs chroniques invalidantes avec retentissement sur la vie quotidienne et professionnelle." } },
          { name: "Hernie discale lombaire post-traumatique - Avec radiculalgie (sciatique ou cruralgie)", rate: [15, 35], rateCriteria: { low: "Conflit disco-radiculaire avec radiculalgie intermittente, sans signes déficitaires.", high: "Radiculalgie persistante avec signes neurologiques déficitaires (déficit moteur, hypoesthésie, abolition d'un réflexe)." } },
          {
            name: "Syndrome post-traumatique cervical chronique (Whiplash / Coup du lapin)",
            rate: [5, 15],
            description: "Douleurs cervicales, céphalées et raideur persistantes après une entorse cervicale sans lésion osseuse ou discale objective.",
            rateCriteria: {
                low: "Cervicalgies mécaniques occasionnelles, bien contrôlées par le traitement, sans limitation objective de la mobilité.",
                medium: "Syndrome douloureux quasi-permanent avec raideur modérée, nécessitant un traitement régulier.",
                high: "Syndrome douloureux invalidant avec retentissement psychologique (anxiété, kinésiophobie) et raideur cervicale majeure."
            }
          },
          { name: "Syndrome cervical chronique post-traumatique", rate: 12 },  // Entrée spécifique pour cas test
          { name: "Névralgie d'Arnold (Névralgie du grand occipital) post-traumatique", rate: [8, 20], description: "Céphalées unilatérales en casque, partant de la nuque et irradiant vers le sommet du crâne et l'œil, après un traumatisme cervical.", rateCriteria: { low: "Crises douloureuses occasionnelles, bien contrôlées par le traitement médical.", high: "Douleurs quasi-permanentes, rebelles aux traitements antalgiques et aux infiltrations, avec retentissement majeur sur la qualité de vie." } },
          { name: "Syndrome de Maigne (Syndrome de la charnière thoraco-lombaire)", rate: [5, 15], description: "Douleurs post-traumatiques projetées au niveau de la fesse, de l'aine ou des organes génitaux, provenant d'une irritation des nerfs issus de la charnière T12-L1.", rateCriteria: { low: "Douleurs projetées intermittentes, bien calmées par le traitement (antalgiques, infiltrations, kinésithérapie).", high: "Syndrome douloureux chronique et rebelle, avec retentissement sur la position assise, la marche et les activités quotidiennes." } },
          { 
            name: "Syndrome myofascial cervical post-traumatique (contractures chroniques)", 
            rate: [5, 15], 
            description: "Douleurs et contractures chroniques des muscles du cou (trapèzes, SCM...) après un traumatisme, sans lésion osseuse ou discale avérée.",
            rateCriteria: { 
                low: "Contractures douloureuses occasionnelles, bien calmées par le repos ou un traitement simple.",
                high: "Syndrome douloureux permanent avec contractures palpables, limitation de la mobilité cervicale et céphalées de tension fréquentes."
            } 
          },
          { name: "Fracture des apophyses transverses", rate: [5, 25] },
          { name: "Raideur rachidienne post-immobilisation, sans douleurs", rate: [1, 15] },
          { name: "Raideur rachidienne avec douleurs ostéo-articulaires", rate: [15, 25] },
          { name: "Raideur rachidienne avec douleurs névralgiques", rate: [20, 40] },
          { name: "Raideur rachidienne avec déviation très prononcée", rate: [40, 45] },
          { name: "Raideur rachis lombaire - DDS 20-40 cm", rate: [5, 15], description: "Raideur lombaire mesurée par distance doigts-sol (DDS) entre 20 et 40 cm." },
          { name: "Raideur rachis cervical - DMS 10-15 cm", rate: [8, 18], description: "Raideur cervicale mesurée par distance menton-sternum (DMS) entre 10 et 15 cm." },
          { name: "Raideur rachis post-tassement avec douleur", rate: [10, 20], description: "Séquelles de tassement vertébral avec raideur secondaire et douleurs chroniques." },
          { name: "Raideur rachis dorsolombaire - Limitation sévère", rate: [12, 25], description: "Raideur étendue du rachis dorsolombaire avec limitation fonctionnelle importante." },
          { name: "Raideur rachis cervical - DMS + inclinaisons", rate: [10, 20], description: "Raideur cervicale avec limitation de la DMS et des inclinaisons latérales." },
          { name: "Raideur rachis avec limitation fonctionnelle", rate: [5, 18], description: "Raideur rachidienne avec retentissement sur le périmètre de marche ou les activités." },
          { name: "Séquelles d'arthrodèse vertébrale (fusion) avec raideur et douleurs résiduelles", rate: [15, 40], rateCriteria: { low: "Fusion d'un seul niveau, indolore, avec raideur segmentaire modérée.", high: "Fusion multi-étagée, avec douleurs chroniques et raideur importante limitant les activités professionnelles." } },
          { name: "Scoliose ou cyphose douloureuse post-traumatique", rate: [10, 30], rateCriteria: { low: "Déformation légère, douleurs occasionnelles.", high: "Déformation marquée avec retentissement fonctionnel et respiratoire." } },
          { name: "Myélopathie cervicarthrosique post-traumatique", rate: [20, 70], description: "Compression lente de la moelle épinière cervicale due à une arthrose accélérée par un traumatisme.", rateCriteria: { low: "Signes neurologiques discrets (troubles de la marche, hyperréflexie) sans limitation majeure des activités.", high: "Syndrome pyramidal et/ou tétraparésie spastique invalidante avec troubles sphinctériens." } },
          { name: "Ankylose vertébrale post-traumatique (Spondylite, Kummel-Verneuil, Cyphose)", rate: [20, 80] },
          { name: "Spondylolisthésis modifié par traumatisme", rate: [5, 15] },
          { name: "Rhumatisme vertébral (lombalgie, cervicalgie) avec raideur", rate: [5, 25] },
          { name: "Spondylose rhizomélique (atteinte lombaire)", rate: [20, 30] },
          { name: "Spondylose rhizomélique (atteinte de tout le rachis et hanches)", rate: [30, 80] },
          { name: "Séquelles d'ostéo-arthrite vertébrale infectieuse", rate: [15, 35] },
        ]
      },
      {
        name: "Bassin - Lésions Osseuses",
        injuries: [
          { name: "Fracture isolée d'une branche pubienne ou de l'aile iliaque (sans déplacement)", rate: [5, 10] },
          { name: "Fracture du cotyle sans déplacement, hanche congruente", rate: [10, 20] },
          { name: "Fracture du cotyle - Avec séquelles articulaires", rate: [25, 45] },
          { name: "Fracture du cotyle avec arthrose post-traumatique", description: "Évaluer comme une coxarthrie (voir Membres Inférieurs)", rate: [15, 40] },
          { name: "Fracture du sacrum", rate: [8, 15] },
          { name: "Fracture du coccyx", rate: [6, 12] },
          { name: "Fracture du sacrum ou du coccyx avec douleurs chroniques (coccygodynie)", rate: [5, 15], rateCriteria: { low: "Douleurs à la position assise prolongée, calmées par le changement de position.", high: "Douleurs invalidantes quasi-permanentes, rendant la position assise impossible." } },
          { name: "Fracture du sacrum avec troubles neurologiques (radiculalgie S1)", rate: [15, 30] },
          { name: "Disjonction de la symphyse pubienne ou sacro-iliaque (instabilité résiduelle)", rate: [15, 30], rateCriteria: { low: "Douleurs mécaniques à l'effort, sans instabilité majeure.", high: "Douleurs et instabilité importantes à la marche, nécessitant une aide." } },
          { name: "Fracture complexe de l'anneau pelvien avec séquelles importantes (boiterie, douleurs)", rate: [30, 60], rateCriteria: { low: "Boiterie discrète, douleurs contrôlées.", high: "Boiterie majeure, douleurs invalidantes, séquelles urologiques ou neurologiques associées." } },
          { name: "Névralgie pudendale post-traumatique (fracture du bassin)", rate: [15, 35], rateCriteria: { low: "Douleurs périnéales positionnelles, avec impact modéré sur la qualité de vie.", high: "Douleurs neuropathiques invalidantes (brûlures, décharges électriques) en position assise, avec retentissement majeur." } },
        ]
      },
      {
        name: "Troubles Nerveux d'Origine Médullaire",
        injuries: [
          { name: "Paraplégie incomplète", rate: [10, 80] },
          { name: "Paraplégie complète", rate: 100 },
          { name: "Quadriplégie incomplète (marche possible)", rate: [60, 90] },
          { name: "Quadriplégie complète (confinement au lit)", rate: 100 },
          { name: "Syndrome de Brown-Séquard", rate: [10, 50] },
          { name: "Hémiplégie médullaire incomplète (Côté Droit)", rate: [10, 80] },
          { name: "Hémiplégie médullaire incomplète (Côté Gauche)", rate: [10, 75] },
          { name: "Hémiplégie médullaire complète", rate: 100 },
          { name: "Syndrome de la queue de cheval post-traumatique", rate: [40, 80], rateCriteria: { low: "Troubles sensitifs périnéaux et/ou sphinctériens partiels, sans déficit moteur majeur.", high: "Anesthésie en selle, incontinence urinaire et fécale, impotence, et déficit moteur des membres inférieurs." } },
          { name: "Majoration pour douleurs radiculo-médullaires", rate: [10, 20] },
          { name: "Claudication intermittente d'origine médullaire", rate: [10, 40], rateCriteria: { low: "Périmètre de marche > 200m.", high: "Périmètre de marche < 100m, avec troubles neurologiques." } },
          { name: "Para-ostéo-arthropathies neurogènes (POAN)", rate: [10, 40], description: "Majoration pour ossifications ectopiques péri-articulaires après lésion neurologique centrale, à cumuler avec le taux de la raideur articulaire induite.", rateCriteria: { low: "Limitation modérée d'une seule grosse articulation (hanche, genou).", high: "Ankylose complète et invalidante de plusieurs grosses articulations." } },
          { name: "Atrophie musculaire médullaire - Main (droite)", rate: [5, 30] },
          { name: "Atrophie musculaire médullaire - Main (gauche)", rate: [5, 20] },
          { name: "Atrophie musculaire médullaire - Avant-bras (droit)", rate: [10, 40] },
          { name: "Atrophie musculaire médullaire - Avant-bras (gauche)", rate: [10, 30] },
          { name: "Atrophie musculaire médullaire - Bras (droit)", rate: [10, 40] },
          { name: "Atrophie musculaire médullaire - Bras (gauche)", rate: [10, 30] },
          { name: "Atrophie musculaire médullaire - Épaule/Ceinture scapulaire (droite)", rate: [10, 40] },
          { name: "Atrophie musculaire médullaire - Épaule/Ceinture scapulaire (gauche)", rate: [10, 30] },
          { name: "Atrophie complète membre supérieur (droit)", rate: 75 },
          { name: "Atrophie complète membre supérieur (gauche)", rate: 65 },
          { name: "Atrophie musculaire médullaire - Pied", rate: [5, 15] },
          { name: "Atrophie musculaire médullaire - Jambe", rate: [10, 30] },
          { name: "Atrophie musculaire médullaire - Cuisse", rate: [20, 50] },
          { name: "Atrophie musculaire médullaire - Ceinture pelvienne", rate: [30, 60] },
          { name: "Atrophie complète d'un membre inférieur", rate: 70 },
          { name: "Atrophie complète des deux membres inférieurs", rate: 100 },
          { name: "Troubles de la sensibilité d'origine médullaire avec douleurs", rate: [10, 20] },
          { name: "Rétention fécale corrigible", rate: [3, 5] },
          { name: "Rétention fécale rebelle", rate: [10, 30] },
          { name: "Incontinence fécale incomplète ou rare", rate: [10, 25] },
          { name: "Incontinence fécale complète et fréquente", rate: [30, 70] },
          { name: "Abolition des érections", rate: [10, 20] },
          { name: "Priapisme incoercible", rate: [10, 20] },
          { name: "Syringomyélie - Formes frustes ou lentes", rate: [20, 40] },
          { name: "Syringomyélie - Formes progressives", rate: [40, 60] },
          { name: "Syringomyélie - Formes graves", rate: [60, 100] },
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
          { name: "Névralgie du Trijumeau (V) - Algie avec ou sans anesthésie", rate: [25, 70] },
          { name: "Névralgie du Trijumeau (V) - Algie du type continu sympathalgique", rate: [30, 80] },
          { name: "Paralysie du Nerf Facial (VII) - Paralysie totale et définitive", rate: [20, 30] },
          { name: "Paralysie du Nerf Facial (VII) - Paralysie partielle et définitive", rate: [10, 30] },
          { name: "Paralysie du Nerf Facial (VII) - Paralysie bilatérale totale", rate: [20, 50] },
          { name: "Paralysie du Nerf Facial (VII) - Contracture post-paralytique", rate: [0, 10] },
          { name: "Paralysie du Nerf Facial (VII) - Spasmes (hémispasme facial)", rate: [0, 10] },
          { name: "Paralysie du Nerf Facial (VII) - Spasmes avec crises répétées", rate: [10, 20] },
          { name: "Atteinte du Nerf auditif (VIII) - Surdité, acouphènes, vertiges", description: "Se référer au barème spécial oreilles.", rate: [5, 60] },
          { name: "Atteinte du Nerf glosso-pharyngien (IX) - Paralysie bilatérale", rate: [5, 10] },
          { name: "Atteinte du Nerf spinal externe (XI) - Atrophie du trapèze et sterno-cléido-mastoïdien", rate: [5, 25] },
          { name: "Atteinte du Nerf hypoglosse (XII) - Hémiatrophie et réaction de dégénérescence unilatérale", rate: 10 },
          { name: "Atteinte du Nerf hypoglosse (XII) - Bilatérale (exceptionnelle)", rate: [50, 60] },
          { name: "Paralysies multiples des nerfs crâniens", rate: [10, 60] },
        ]
      },
      {
        name: "Nerfs Périphériques - Membre Supérieur",
        injuries: [
          { name: "Paralysie complète du plexus brachial (droite)", rate: [70, 80] },
          { name: "Paralysie complète du plexus brachial (gauche)", rate: [60, 70] },
          { name: "Paralysie totale du membre supérieur (droite)", rate: [70, 80] },
          { name: "Paralysie totale du membre supérieur (gauche)", rate: [60, 70] },
          { name: "Paralysie radiculaire supérieure (Duchenne-Erb) (droite)", rate: [45, 55] },
          { name: "Paralysie radiculaire supérieure (Duchenne-Erb) (gauche)", rate: [35, 45] },
          { name: "Paralysie radiculaire inférieure (Klumpke) (droite)", rate: [55, 65] },
          { name: "Paralysie radiculaire inférieure (Klumpke) (gauche)", rate: [45, 55] },
          { name: "Paralysie du nerf du grand dentelé (Serratus anterior) (Main Dominante)", rate: [10, 25], description: "Atteinte du nerf thoracique long entraînant une paralysie du muscle grand dentelé et un décollement de l'omoplate ('scapula alata').", rateCriteria: { low: "Décollement partiel de l'omoplate, gêne modérée dans les mouvements d'élévation au-dessus de 90°.", high: "Décollement complet, perte de force majeure, limitation sévère de l'antépulsion et de l'abduction de l'épaule." } },
          { name: "Paralysie du nerf du grand dentelé (Serratus anterior) (Main Non Dominante)", rate: [8, 20], description: "Atteinte du nerf thoracique long entraînant une paralysie du muscle grand dentelé et un décollement de l'omoplate ('scapula alata').", rateCriteria: { low: "Décollement partiel de l'omoplate, gêne modérée.", high: "Décollement complet, perte de force et limitation sévère des mouvements de l'épaule." } },
          { name: "Paralysie isolée du nerf sous-scapulaire (droite)", rate: [10, 20] },
          { name: "Paralysie isolée du nerf sous-scapulaire (gauche)", rate: [5, 15] },
          { name: "Paralysie du nerf circonflexe (droite)", rate: [25, 35] },
          { name: "Paralysie du nerf circonflexe (gauche)", rate: [20, 30] },
          { name: "Paralysie du nerf musculo-cutané (droite)", rate: [15, 25] },
          { name: "Paralysie du nerf musculo-cutané (gauche)", rate: [10, 20] },
          { name: "Paralysie du nerf médian - Au bras (droite)", rate: [45, 55] },
          { name: "Paralysie du nerf médian - Au bras (gauche)", rate: [35, 45] },
          { name: "Paralysie du nerf médian - Au poignet (droite)", rate: [15, 25] },
          { name: "Paralysie du nerf médian - Au poignet (gauche)", rate: [5, 15] },
          { name: "Syndrome du canal carpien post-traumatique (Main Dominante)", rate: [5, 20], rateCriteria: { low: "Signes sensitifs intermittents (paresthésies nocturnes) sans déficit objectif.", high: "Déficit sensitif permanent et/ou amyotrophie de l'éminence thénar." } },
          { name: "Syndrome du canal carpien post-traumatique (Main Non Dominante)", rate: [4, 15], rateCriteria: { low: "Signes sensitifs intermittents.", high: "Déficit permanent et/ou amyotrophie." } },
          { name: "Paralysie du nerf cubital - Au bras (droite)", rate: [25, 35] },
          { name: "Paralysie du nerf cubital - Au bras (gauche)", rate: [15, 25] },
          { name: "Paralysie du nerf cubital - Au poignet (droite)", rate: [25, 35] },
          { name: "Paralysie du nerf cubital - Au poignet (gauche)", rate: [15, 25] },
          { name: "Paralysie du nerf radial", rate: 35 },  // Entrée générique pour paralysie complète
          { name: "Paralysie du nerf radial - Lésion au-dessus de la branche du triceps (droite)", rate: [45, 55] },
          { name: "Paralysie du nerf radial - Lésion au-dessus de la branche du triceps (gauche)", rate: [35, 45] },
          { name: "Paralysie du nerf radial - Lésion au-dessous de la branche du triceps (droite)", rate: [35, 45] },
          { name: "Paralysie du nerf radial - Lésion au-dessous de la branche du triceps (gauche)", rate: [25, 35] },
          { name: "Paralysie associée du médian et du cubital (droite)", rate: [45, 55] },
          { name: "Paralysie associée du médian et du cubital (gauche)", rate: [45, 55] },
          { name: "Syndrome du défilé thoraco-brachial post-traumatique", rate: [10, 30], rateCriteria: { low: "Paresthésies et douleurs positionnelles (bras en élévation), sans déficit objectif.", medium: "Signes objectifs de compression vasculaire (œdème, cyanose) ou nerveuse (hypoesthésie, déficit moteur C8-T1).", high: "Syndrome sévère et rebelle avec amyotrophie de la main ou complications vasculaires (thrombose, anévrisme)." } }
        ]
      },
      {
        name: "Nerfs Périphériques - Membre Inférieur",
        injuries: [
          { name: "Paralysie totale d'un membre inférieur", rate: [70, 80] },
          { name: "Paralysie complète du nerf sciatique", rate: [35, 45] },
          { name: "Paralysie du nerf sciatique poplité externe (SPE)", rate: [15, 25], rateCriteria: { low: "Déficit du releveur du pied, marche sur la pointe des pieds possible, steppage discret.", high: "Steppage majeur avec nécessité de releveur, troubles trophiques." } },
          { name: "Paralysie du nerf sciatique poplité interne (SPI)", rate: [15, 25], rateCriteria: { low: "Difficulté à la marche sur la pointe des pieds, déficit modéré de flexion des orteils.", high: "Perte de la propulsion du pas, pied en talus, troubles trophiques importants." } },
          { name: "Paralysie du nerf crural", rate: [45, 55] },
          { name: "Paralysie du nerf obturateur", rate: [10, 20] },
          { name: "Méralgie paresthésique (Névralgie fémoro-cutanée)", rate: [5, 15], description: "Atteinte du nerf fémoro-cutané entraînant des troubles sensitifs (brûlures, anesthésie) sur la face antéro-externe de la cuisse.", rateCriteria: { low: "Dysesthésies intermittentes déclenchées par la station debout prolongée ou la marche.", high: "Dysesthésies permanentes et invalidantes, avec hyperpathie (douleur au contact vestimentaire), retentissant sur la marche." } },
        ]
      },
      {
        name: "Nerfs du Tronc",
        injuries: [
            { name: "Névralgie intercostale post-traumatique", rate: [5, 15], rateCriteria: { low: "Douleurs occasionnelles, calmées par des antalgiques simples.", high: "Douleurs chroniques, rebelles au traitement, avec retentissement sur la vie quotidienne (sommeil, respiration)." } }
        ]
      },
      {
        name: "Névrites, Névralgies et Syndromes Douloureux",
        injuries: [
            { name: "Névrite avec algies (membre supérieur droit)", rate: [10, 50] },
            { name: "Névrite avec algies (membre supérieur gauche)", rate: [8, 40] },
            { name: "Séquelles névritiques (pied varus équin)", rate: [30, 50] },
            { name: "Sciatique chronique avec signes déficitaires", rate: 18 },  // Entrée pour déficit moteur L5/S1 avec steppage
            { name: "Névralgie sciatique légère (confirmée, sans troubles graves)", rate: [10, 20] },
            { name: "Névralgie sciatique d'intensité moyenne (gêne marche/travail)", rate: [25, 40] },
            { name: "Névralgie sciatique grave (travail et marche impossibles)", rate: [45, 60] },
            { name: "Névralgie sciatique compliquée (causalgie, rétentissement général)", rate: [40, 80] },
            { name: "Réaction névritique (douleurs, raideurs) - membre supérieur", rate: [8, 50] },
            { name: "Réaction névritique (douleurs, raideurs) - membre inférieur", rate: [10, 40] },
            { name: "Causalgie (majoration) - membre supérieur", rate: [20, 60] },
            { name: "Causalgie (majoration) - membre inférieur", rate: [20, 60] },
        ]
      },
      {
        name: "Troubles Trophiques et Sympathiques",
        injuries: [
            { name: "Syndrome de paralysie du sympathique cervical (Claude Bernard-Horner)", rate: [5, 10] },
            { name: "Syndrome d'excitation du sympathique cervical (Pourfour du Petit)", rate: [5, 10] },
            { name: "Ulcérations persistantes, troubles trophiques cutanés (majoration)", rate: [5, 20] },
            { name: "Œdème dur traumatique", rate: [8, 10] },
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
          { name: "Mutilation - Perte des deux maxillaires supérieurs", rate: [90, 100] },
          { name: "Mutilation - Perte d'un maxillaire inférieur", rate: [90, 100] },
          { name: "Mutilation - Perte d'un maxillaire supérieur et d'un maxillaire inférieur", rate: 100 },
          { name: "Mutilation - Perte d'un seul maxillaire supérieur avec conservation mandibule", rate: [50, 60] },
          { name: "Mutilation - Perte d'un maxillaire supérieur avec perte de substance étendue", rate: [70, 90] },
          { name: "Perte de substance des parties molles de la face (joue, lèvres, menton)", rate: [10, 80], rateCriteria: { low: "Perte limitée sans préjudice esthétique ou fonctionnel majeur.", high: "Perte étendue avec déformation majeure et/ou troubles fonctionnels (mastication, parole)." } },
          { name: "Consolidation vicieuse - Mobilité totale du maxillaire supérieur", rate: [60, 80] },
          { name: "Consolidation vicieuse - Mobilité partielle du maxillaire supérieur", rate: [20, 50] },
          { name: "Consolidation vicieuse - Troubles sérieux de l'articulé dentaire", rate: [15, 30] },
          { name: "Consolidation vicieuse - Trouble léger de l'articulé dentaire", rate: [5, 15] },
          { name: "Perte de substance de la voûte palatine", rate: [10, 20] },
          { name: "Perte de substance de la voûte avec communication bucco-nasale", rate: [30, 60] },
          { name: "Perte de substance partielle de l'arcade dentaire (sans trouble fonctionnel)", rate: [0, 5] },
          { name: "Fracture du maxillaire inférieur - Consolidation vicieuse avec trouble grave de l'articulé", rate: [15, 20] },
          { name: "Fracture du maxillaire inférieur - Consolidation vicieuse avec trouble léger de l'articulé", rate: [5, 10] },
          { name: "Pseudarthrose lâche de la mandibule", rate: [60, 85] },
          { name: "Pseudarthrose serrée de la branche ascendante", rate: [0, 25] },
          { name: "Pseudarthrose lâche de la branche ascendante", rate: [10, 15] },
          { name: "Pseudarthrose serrée de la branche horizontale", rate: [5, 10] },
          { name: "Pseudarthrose lâche de la branche horizontale", rate: [15, 25] },
          { name: "Pseudarthrose serrée de la région symphysaire", rate: [10, 15] },
          { name: "Perte de substance partielle de l'arcade dentaire (mandibule)", rate: [0, 5] },
          { name: "Ankylose temporo-maxillaire osseuse", rate: [80, 90] },
          { name: "Luxation irréductible temporo-maxillaire", rate: [10, 50] },
          { name: "Luxation récidivante temporo-maxillaire", rate: [5, 20] },
          { name: "Constriction des mâchoires (écartement < 10 mm)", rate: [20, 80] },
          { name: "Constriction des mâchoires (écartement 10 à 30 mm)", rate: [5, 20] },
          { name: "Constriction des mâchoires avec troubles salivaires, etc.", rate: [10, 20] },
          { name: "Syndrome algo-dysfonctionnel de l'appareil manducateur (SADAM) post-traumatique", rate: [5, 25], rateCriteria: { low: "Claquerents articulaires occasionnels, douleurs légères à la mastication d'aliments durs.", medium: "Douleurs fréquentes, limitation modérée de l'ouverture buccale (< 30mm), céphalées.", high: "Douleurs invalidantes quasi-permanentes, limitation sévère de l'ouverture buccale (< 20mm), retentissement sur l'alimentation." } },
          { name: "Fistule bucco-sinusienne persistante post-traumatique", rate: [10, 25], rateCriteria: { low: "Communication de petite taille, asymptomatique ou avec passage occasionnel de liquide.", high: "Communication large avec passage d'aliments, sinusites à répétition, nécessité de chirurgie complexe." } },
          {
            name: "Séquelles de fracture des os propres du nez",
            rate: [3, 15],
            rateCriteria: {
              low: "Préjudice esthétique minime, sans trouble ventilatoire.",
              medium: "Déformation visible (cal vicieux) avec retentissement esthétique modéré et/ou obstruction nasale unilatérale.",
              high: "Déformation majeure (nez ensellé, déviation importante) et/ou obstruction nasale bilatérale invalidante."
            }
          },
          {
            name: "Séquelles de fracture de l'os malaire (zygomatique)",
            rate: [5, 25],
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
          { name: "Perte d'une ou deux dents (n'entraînant pas d'incapacité)", rate: 0 },
          { name: "Perte de plusieurs dents (coefficient par dent) - Incisives/Canines", description: "Le taux est évalué en attribuant un coefficient de 1 par dent perdue.", rate: 1 },
          { name: "Perte de plusieurs dents (coefficient par dent) - Prémolaires", description: "Le taux est évalué en attribuant un coefficient de 1.25 par dent perdue.", rate: 1.25 },
          { name: "Perte de plusieurs dents (coefficient par dent) - Molaires", description: "Le taux est évalué en attribuant un coefficient de 1.5 par dent perdue.", rate: 1.5 },
          { name: "Perte de 8 dents définitives", description: "Calcul: 8 molaires × 1.5% = 12%", rate: 12 },
          {
            name: "Séquelles de fracture dentaire coronaire avec atteinte pulpaire (par dent vitale traitée)",
            rate: 0.5,
            description: "Coefficient par dent. S'ajoute en cas de complications."
          },
          {
            name: "Séquelles de luxation/subluxation dentaire avec nécrose ou ankylose (par dent)",
            rate: 1,
            description: "Coefficient par dent, à évaluer comme une perte si l'extraction est inévitable."
          },
           {
            name: "Parodontolyse post-traumatique (par dent avec mobilité anormale)",
            rate: [0.5, 1],
            description: "Coefficient par dent. Perte de l'os et de l'attache autour d'une dent suite à un choc, entraînant une mobilité anormale.",
            rateCriteria: {
                low: "Mobilité légère, sans gêne à la mastication.",
                high: "Mobilité importante compromettant la fonction et le pronostic de la dent."
            }
          },
          { name: "Amputation partielle de la langue (gêne légère)", rate: [10, 20] },
          { name: "Amputation étendue de la langue (gêne fonctionnelle)", rate: [35, 75] },
          { name: "Amputation totale de la langue", rate: 80 },
          { name: "Gêne de la déglutition par cicatrice pharyngée", rate: [10, 30] },
          { name: "Agueusie (perte du goût) post-traumatique", rate: [5, 10], rateCriteria: { low: "Perte partielle (hypogueusie), altération de la qualité de vie.", high: "Perte totale et définitive, avec retentissement sur l'appétit et le poids." } },
          { name: "Fistules salivaires", rate: [10, 30], rateCriteria: { low: "Débit faible et intermittent.", high: "Débit important, continu, avec macération cutanée." } },
        ]
      },
      {
        name: "Face - Séquelles des Brûlures",
        injuries: [
          { name: "Cicatrices rétractiles des paupières (ectropion, lagophtalmie, etc.)", rate: [5, 20], rateCriteria: { low: "Atteinte unilatérale légère.", high: "Atteinte bilatérale sévère avec occlusion incomplète." } },
          { name: "Cicatrices sténosantes des orifices (bouche, nez)", rate: [10, 50], rateCriteria: { low: "Sténose narinaire unilatérale ou microstomie légère.", high: "Sténose bilatérale ou microstomie sévère gênant l'alimentation." } },
          { name: "Préjudice esthétique important lié aux brûlures de la face", rate: [20, 40], rateCriteria: { low: "Cicatrices étendues mais peu dyschromiques ou hypertrophiques.", high: "Cicatrices défigurantes, avec retentissement social majeur." } },
        ]
      },
      {
        name: "Yeux - Cécité et Baisse de Vision",
        injuries: [
          { name: "Cécité complète", rate: 100 },
          { name: "Quasi-cécité ou cécité professionnelle", rate: 100 },
          { name: "Perte complète de la vision d'un oeil (l'autre étant normal)", rate: 30 },
          { name: "Perte de la vision d'un oeil sans difformité apparente", rate: [25, 30] },
          { name: "Ablation ou altération du globe avec prothèse possible", rate: [28, 33] },
          { name: "Ablation ou altération du globe sans prothèse possible", rate: [35, 40] },
          { name: "Diminution de la vision des deux yeux (selon tableau à double entrée)", description: "Se référer au tableau p.120 du PDF. Un outil de calcul dédié est recommandé.", rate: [0, 100] },
        ]
      },
      {
        name: "Yeux - Champ Visuel et Vision Binoculaire",
        injuries: [
          { name: "Rétrécissement concentrique à 30° (un oeil)", rate: [3, 5] },
          { name: "Rétrécissement concentrique à 30° (deux yeux)", rate: [5, 20] },
          { name: "Rétrécissement concentrique à 10° (un oeil)", rate: [10, 15] },
          { name: "Rétrécissement concentrique à 10° (deux yeux)", rate: [70, 80] },
          { name: "Scotomes centraux (un oeil)", rate: [15, 30] },
          { name: "Scotomes centraux (deux yeux)", rate: [40, 100] },
          { name: "Hémianopsie homonyme droite ou gauche", rate: [30, 35] },
          { name: "Hémianopsie hétéronyme nasale", rate: [10, 15] },
          { name: "Hémianopsie hétéronyme bitemporale", rate: [70, 80] },
          { name: "Hémianopsie horizontale supérieure", rate: [10, 15] },
          { name: "Hémianopsie horizontale inférieure", rate: [30, 50] },
          { name: "Hémianopsie en quadrant supérieure", rate: [7, 10] },
          { name: "Hémianopsie en quadrant inférieure", rate: [20, 25] },
          { name: "Hémianopsie chez un borgne - Nasale", rate: [60, 70] },
          { name: "Hémianopsie chez un borgne - Inférieure", rate: [70, 80] },
          { name: "Hémianopsie chez un borgne - Temporale", rate: [80, 90] },
          { name: "Diplopie", rate: [5, 20] },
          { name: "Diplopie dans la partie inférieure du champ", rate: [10, 25] },
        ]
      },
      {
        name: "Yeux - Lésions Spécifiques et Annexes",
        injuries: [
          { name: "Taies de cornée (selon gêne visuelle)", description: "Le taux est évalué d'après le tableau d'acuité visuelle, avec un taux complémentaire basé sur le degré de vision obtenu après rétrécissement pupillaire. Voir p.128 du barème pour les conditions.", rate: [0, 100] },
          { name: "Cataracte (selon acuité et complications)", description: "Le taux est basé sur l'acuité visuelle corrigée + majorations pour gêne ou impossibilité de porter un verre. Calcul complexe nécessitant l'acuité précise (ex: OD 3/10, OG 8/10). Utilisez le Guide IA pour saisir les critères cliniques détaillés.", rate: [10, 100], rateCriteria: { low: "Acuité visuelle OD ≥ 8/10 et OG ≥ 8/10 avec correction adaptée, aucune complication.", medium: "Acuité visuelle entre 3/10 et 7/10 sur au moins un œil, ou difficulté au port de correction.", high: "Acuité visuelle < 3/10 sur un ou deux yeux, ou impossibilité de porter une correction (aphaquie non opérée, intolérance aux verres)." } },
          { name: "Hémorragies du vitré", description: "L'incapacité est évaluée en fonction de la baisse d'acuité visuelle résiduelle, si elle ne se résorbe pas.", rate: [0, 100] },
          { name: "Décollement de la rétine post-traumatique", description: "L'incapacité est évaluée en fonction des séquelles sur l'acuité visuelle et le champ visuel.", rate: [0, 100] },
          { name: "Atrophie optique post-traumatique", rate: [30, 80], description: "Dégénérescence des fibres du nerf optique suite à un traumatisme crânien ou orbitaire, conduisant à une perte de vision progressive et irréversible.", rateCriteria: { low: "Atteinte unilatérale avec acuité visuelle corrigée > 2/10 et champ visuel modérément altéré.", high: "Atteinte bilatérale sévère avec acuité visuelle < 1/10 et/ou champ visuel tubulaire." } },
          { name: "Glaucome post-traumatique", rate: [10, 40], description: "Augmentation de la pression intra-oculaire après un traumatisme oculaire.", rateCriteria: { low: "Pression bien contrôlée par un seul collyre, sans altération du champ visuel.", high: "Pression mal contrôlée malgré un traitement maximal, avec altération significative et progressive du champ visuel." } },
          { name: "Uvéite post-traumatique chronique", rate: [10, 30], description: "Inflammation intraoculaire persistante après un traumatisme.", rateCriteria: { low: "Poussées rares et bien contrôlées par traitement local, sans baisse d'acuité visuelle permanente.", high: "Poussées fréquentes avec complications (synéchies, cataracte, glaucome secondaire) et baisse d'acuité visuelle." } },
          {
            name: "Séquelles d'endophtalmie post-traumatique (infection intraoculaire)",
            rate: [10, 35],
            description: "Séquelles d'une infection grave de l'œil après un traumatisme perforant. Le taux indemnise les complications (douleurs chroniques, uvéite, glaucome secondaire) en plus de la baisse de vision, qui est évaluée séparément.",
            rateCriteria: {
                low: "Infection traitée avec succès, séquelles minimes (corps flottants), sans baisse de vision majeure.",
                high: "Complications sévères : douleurs chroniques, glaucome secondaire, phtisie du globe (atrophie de l'œil), nécessitant une énucléation."
            }
          },
          { name: "Ophtalmie sympathique",
            rate: [20, 80],
            description: "Inflammation auto-immune grave de l'œil sain (non traumatisé) après un traumatisme perforant de l'autre œil. Le taux dépend du retentissement visuel sur l'œil sympathisant.",
            rateCriteria: {
                low: "Inflammation contrôlée par le traitement, avec baisse de vision modérée sur l'œil sain.",
                high: "Uvéite pan-uvéite sévère et chronique sur l'œil sain, conduisant à une malvoyance ou une cécité bilatérale."
            }
          },
          { name: "Phthisis bulbi (atrophie du globe oculaire) post-traumatique", rate: [35, 40], description: "Équivaut à la perte anatomique de l'œil sans possibilité d'appareillage esthétique satisfaisant.", rateCriteria: { low: "Atrophie modérée avec possibilité d'une prothèse de recouvrement.", high: "Atrophie majeure, déformation importante de l'orbite, prothèse impossible." } },
          { name: "Paralysie de l'accommodation - Ophtalmoplégie interne totale unilatérale", rate: [10, 15] },
          { name: "Paralysie de l'accommodation - Ophtalmoplégie interne totale bilatérale", rate: [15, 20] },
          { name: "Paralysie du sphincter irien - Mydriase existant seule unilatérale", rate: [3, 5] },
          { name: "Paralysie du sphincter irien - Mydriase existant seule bilatérale", rate: [7, 10] },
          { name: "Voies lacrymales - Larmoiement ou fistules (un oeil)", rate: [0, 10] },
          { name: "Voies lacrymales - Larmoiement ou fistules (chaque oeil)", rate: [5, 10] },
          { name: "Orbite - Fracture du plancher de l'orbite (Blow-out) avec séquelles", rate: [5, 25], description: "Séquelles d'une fracture du plancher orbitaire, telles que la diplopie (vision double), l'énophtalmie (recul du globe oculaire) ou l'hypoesthésie dans le territoire du nerf sous-orbitaire.", rateCriteria: { low: "Hypoesthésie sous-orbitaire isolée et discrète, ou diplopie uniquement dans les regards extrêmes.", high: "Diplopie invalidante dans le regard primaire, et/ou énophtalmie inesthétique > 2mm." } },
          { name: "Orbite - Paralysie d'un ou plusieurs nerfs oculo-moteurs (voir diplopie)", rate: [5, 25] },
          { name: "Orbite - Névrites, névralgies du nerf V (trijumeau)", rate: [15, 25] },
          { name: "Orbite - Altérations vasculaires (anévrisme, etc.)", description: "À indemniser selon les troubles fonctionnels.", rate: [10, 30] },
          { name: "Paupières - Déviation des bords palpébraux (entropion, ectropion, cicatrices vicieuses)", rate: [5, 20] },
          { name: "Paupières - Ptosis ou blépharospasme (un oeil)", rate: [5, 25] },
          { name: "Paupières - Ptosis ou blépharospasme (deux yeux)", rate: [20, 70] },
          { name: "Paupières - Lagophtalmie cicatricielle ou paralytique", description: "Ajouter 10 p. 100 pour un oeil.", rate: 10 },
        ]
      },
      {
        name: "Oreilles - Lésions Externes et Moyennes",
        injuries: [
          { name: "Mutilations et cicatrices vicieuses de l'oreille externe", rate: [2, 10] },
          { name: "Fracture du rocher avec complications (paralysie faciale, surdité, vertiges)", rate: [20, 60], rateCriteria: { low: "Séquelles vestibulaires ou auditives légères, paralysie faciale partielle bien récupérée.", high: "Association de séquelles sévères : cophose, paralysie faciale complète, vertiges invalidants." } },
          { name: "Sténose du conduit auditif unilatérale", rate: [1, 5] },
          { name: "Sténose du conduit auditif bilatérale", rate: [1, 10] },
          { name: "Otorrhée traumatique unilatérale", rate: [1, 5] },
          { name: "Otorrhée tubaire unilatérale", rate: [1, 8] },
          { name: "Otorrhée chronique avec ostéite unilatérale", rate: [5, 10] },
          { name: "Otorrhée chronique avec ostéite bilatérale", rate: [8, 15] },
          { name: "Bourdonnements d'oreille (acouphènes) isolés", description: "Ce taux s'ajoute à celui d'une éventuelle surdité.", rate: [5, 10] },
        ]
      },
      {
        name: "Oreilles - Diminution de l'Acuité Auditive (Surdité)",
        injuries: [
          { name: "Diminution de l'acuité auditive", description: "Le taux est calculé selon un tableau complexe (p.140 du PDF) basé sur la perte en décibels. Un outil dédié est recommandé.", rate: [0, 70] },
          { name: "Surdité unilatérale profonde", description: "Perte auditive profonde (> 80 dB) d'une oreille, l'autre étant normale.", rate: 20 },
        ]
      },
      {
        name: "Oreilles - Vertiges et Troubles de l'Équilibre",
        injuries: [
          { name: "Vertiges et troubles de l'équilibre", description: "L'évaluation est complexe et dépend des résultats des épreuves vestibulaires.", rate: [5, 40] },
          { name: "Vertiges - 1er degré (pas de trouble objectif)", rate: [5, 10] },
          { name: "Vertiges - 2ème degré (hyper-excitabilité aux épreuves)", rate: [10, 20] },
          { name: "Vertiges - 3ème degré (troubles objectifs)", rate: [20, 40] },
        ]
      },
      {
        name: "Voies Respiratoires Supérieures",
        injuries: [
          { name: "Sténose nasale unilatérale simple", rate: [0, 3] },
          { name: "Sténose nasale unilatérale avec formation de croûtes", rate: [3, 8] },
          { name: "Sténose nasale unilatérale avec sinusite", rate: [6, 10] },
          { name: "Sténose nasale bilatérale légère", rate: [5, 8] },
          { name: "Sténose nasale bilatérale accentuée", rate: [8, 12] },
          { name: "Sténose nasale bilatérale serrée", rate: [12, 20] },
          { name: "Perforation de la cloison nasale", rate: 0 },
          { name: "Anosmie (perte de l'odorat)", rate: [5, 10] },
          { name: "Anosmie avec nécessité de changement de profession", rate: [20, 30] },
          { name: "Dysgueusie (distorsion du goût) ou Cacosmie (perception d'odeurs nauséabondes)", rate: [5, 15], description: "Altération qualitative de l'odorat ou du goût, entraînant la perception d'odeurs ou de saveurs désagréables, souvent avec un retentissement sur l'alimentation et la qualité de vie.", rateCriteria: { low: "Distorsions occasionnelles, n'entraînant pas de dégoût alimentaire majeur.", high: "Perceptions désagréables quasi-permanentes, avec aversion alimentaire, perte de poids et retentissement psychologique." } },
          { name: "Troubles esthétiques par mutilation nasale", rate: [5, 30] },
          { name: "Sinusite traumatique", description: "Voir p.164 du PDF pour les détails.", rate: [5, 30] },
          { name: "Rhinites croûteuses post-traumatiques", rate: [5, 20] },
          {
            name: "Séquelles de fracture de l'os hyoïde",
            rate: [10, 30],
            description: "Séquelles d'une fracture de l'os hyoïde, souvent par traumatisme direct sur le cou.",
            rateCriteria: {
              low: "Consolidation sans déplacement, douleurs résiduelles à la déglutition des aliments solides.",
              high: "Cal vicieux avec dysphagie (difficulté à avaler) et/ou dysphonie (trouble de la voix) persistante."
            }
          },
          { name: "Troubles vocaux (dysphonie, aphonie)", rate: [5, 30] },
          { name: "Paralysie récurrentielle (corde vocale) post-traumatique unilatérale", rate: [10, 25], rateCriteria: { low: "Dysphonie modérée, voix bitonale, sans dyspnée.", high: "Aphonie ou dysphonie sévère avec dyspnée d'effort." } },
          { name: "Sténose laryngo-trachéale post-traumatique", rate: [20, 100], rateCriteria: { low: "Dyspnée d'effort modérée, voix conservée.", high: "Dyspnée de repos nécessitant une trachéotomie permanente." } },
          { name: "Syndrome d'apnées-hypopnées du sommeil (SAHS) post-traumatique", rate: [10, 30], description: "Apparition ou aggravation d'un SAHS après un traumatisme facial, mandibulaire ou crânien, confirmée par polysomnographie.", rateCriteria: { low: "SAHS modéré (IAH entre 15 et 30/h) avec somnolence diurne, bien contrôlé par orthèse d'avancée mandibulaire.", high: "SAHS sévère (IAH > 30/h) avec complications cardiovasculaires, nécessitant un traitement par Pression Positive Continue (PPC)." } },
          { name: "Troubles respiratoires (dyspnée laryngée)", rate: [20, 100] },
          { name: "Laryngostomie ou trachéotomie", rate: 100 },
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
          { name: "Fracture isolée du sternum - simple", rate: [3, 10] },
          { name: "Fracture isolée du sternum - avec enfoncement", rate: [10, 20] },
          { name: "Fracture du sternum", rate: 10, description: "Fracture du sternum avec séquelles (douleurs, limitation respiratoire)." },
          { name: "Fracture de côtes non compliquée (selon gêne et nombre)", rate: [2, 30] },
          { name: "Fractures multiples de côtes - Avec séquelles respiratoires", rate: 15, description: "Fractures multiples de côtes avec séquelles respiratoires (dyspnée d'effort)." },
          {
            name: "Séquelles de volet costal mobile (thoracic flail chest)",
            rate: [15, 40],
            description: "Séquelles d'un traumatisme thoracique grave avec fractures de côtes multiples, entraînant une paroi thoracique instable.",
            rateCriteria: {
                low: "Consolidation avec déformation modérée, douleurs mécaniques à l'effort, sans insuffisance respiratoire.",
                medium: "Douleurs chroniques, dyspnée d'effort (stade II) due à la restriction pariétale.",
                high: "Insuffisance respiratoire restrictive chronique (stade III-IV) objectivée par EFR, avec douleurs invalidantes."
            }
          },
          { name: "Grand fracas du thorax", rate: [30, 50] },
          { name: "Hernie irréductible du poumon", rate: [10, 40] },
        ]
      },
      {
        name: "Thorax - Plèvre et Poumons",
        injuries: [
          { name: "Pleurésie traumatique avec déformations", rate: [5, 30] },
          { name: "Hémothorax, adhérences et rétractions thoraciques", rate: [5, 20] },
          { name: "Pyothorax (empyème)", rate: [10, 50] },
          { name: "Fibrose pulmonaire post-traumatique (hors pneumoconiose)", rate: [10, 60], rateCriteria: { low: "Images radiologiques discrètes, sans retentissement fonctionnel respiratoire notable.", high: "Fibrose étendue avec insuffisance respiratoire chronique confirmée par EFR." } },
          { name: "Fistule broncho-pleurale chronique", rate: [30, 60], description: "Communication persistante entre une bronche et l'espace pleural après un traumatisme thoracique.", rateCriteria: { low: "Fistule de petit calibre, bien tolérée, ne nécessitant pas de drainage permanent.", high: "Fistule à haut débit avec empyème chronique, nécessitant un drainage thoracique au long cours ou une chirurgie complexe (thoracoplastie)." } },
          { name: "Chylothorax chronique post-traumatique", rate: [20, 40], rateCriteria: { low: "Bien contrôlé par régime, sans retentissement nutritionnel majeur.", high: "Chylothorax abondant, récidivant, nécessitant des ponctions ou une chirurgie, avec dénutrition." } },
          { name: "Tuberculose pulmonaire post-traumatique (si incapacité permanente)", rate: [10, 100] },
        ]
      },
      {
        name: "Appareil Circulatoire",
        injuries: [
          { name: "Troubles cardiaques fonctionnels - Bien compensés", rate: [5, 20] },
          { name: "Troubles cardiaques fonctionnels - Avec troubles fonctionnels caractérisés", rate: [20, 80] },
          { name: "Troubles cardiaques fonctionnels - Avec asystolie confirmée", rate: [80, 100] },
          { name: "Séquelles de contusion myocardique (troubles du rythme, insuffisance cardiaque)", rate: [15, 50], rateCriteria: { low: "Anomalies ECG isolées, sans retentissement sur la fraction d'éjection.", high: "Insuffisance cardiaque ou troubles du rythme sévères nécessitant un traitement à vie." } },
          { name: "Troubles du rythme cardiaque post-traumatiques documentés (non appareillés)", rate: [5, 20], description: "Apparition de troubles du rythme (extrasystoles, tachycardie, fibrillation auriculaire) après une contusion myocardique ou un traumatisme thoracique, confirmés par Holter-ECG.", rateCriteria: { low: "Troubles du rythme peu fréquents, asymptomatiques ou paucisymptomatiques.", high: "Troubles du rythme fréquents, symptomatiques (palpitations, malaises) nécessitant un traitement anti-arythmique au long cours." } },
          { name: "Ruptures traumatiques de valvules", rate: [50, 100] },
          { name: "Affections cardiovasculaires consécutives à une maladie infectieuse", rate: [30, 90] },
          { name: "Anévrisme de l'aorte (hors syphilis)", rate: [40, 80] },
          { name: "Péricardite chronique constrictive post-traumatique", rate: [20, 60], rateCriteria: { low: "Péricardite bien tolérée, sans signe d'insuffisance cardiaque droite, simple surveillance.", high: "Péricardite invalidante avec signes de tamponnade chronique (turgescence jugulaire, hépatomégalie, œdèmes), nécessitant une chirurgie (péricardectomie)." } },
          { name: "Syndrome post-péricardotomie (ou de Dressler) persistant", rate: [5, 15], description: "Syndrome inflammatoire (fièvre, douleur thoracique, épanchement péricardique) récidivant après une chirurgie cardiaque ou un traumatisme thoracique.", rateCriteria: { low: "Épisodes rares et brefs, bien contrôlés par AINS ou colchicine.", high: "Épisodes fréquents et invalidants nécessitant une corticothérapie au long cours." } },
          { name: "Névrose cardiaque post-traumatique (tachycardie, palpitations, anxiété)", rate: [5, 15] },
          { name: "Lésions des gros vaisseaux (hors aorte) avec troubles hémodynamiques", rate: [10, 40] },
          { name: "Dissection traumatique d'un gros vaisseau (aorte, carotide) avec séquelles", rate: [40, 80], rateCriteria: { low: "Séquelles vasculaires localisées bien contrôlées par traitement.", high: "Séquelles neurologiques (AVC) ou ischémiques d'un membre." } },
        ]
      },
      {
        name: "Vaisseaux Périphériques",
        injuries: [
            { name: "Syndrome post-thrombotique (maladie post-phlébitique)", rate: [10, 40], description: "Séquelles d'une thrombose veineuse profonde (phlébite).", rateCriteria: { low: "Œdème vespéral modéré, sans troubles trophiques.", medium: "Œdème permanent, douleurs, pigmentation cutanée (dermite ocre).", high: "Ulcère veineux chronique ou récidivant, claudication veineuse invalidante." } },
            { name: "Artériopathie post-traumatique d'un membre", rate: [15, 50], description: "Défaut de vascularisation artérielle après un traumatisme.", rateCriteria: { low: "Claudication d'effort intermittente à périmètre de marche long (>200m).", medium: "Claudication à périmètre court (<200m), douleurs de décubitus.", high: "Ischémie permanente avec troubles trophiques (ulcère artériel, nécrose)." } },
            { name: "Fistule artério-veineuse post-traumatique", rate: [15, 40], rateCriteria: { low: "Fistule de petit débit, sans retentissement hémodynamique général.", high: "Fistule à haut débit avec signes d'insuffisance cardiaque ou d'ischémie d'aval." } },
            {
              name: "Anévrisme ou pseudo-anévrisme artériel périphérique post-traumatique",
              rate: [10, 30],
              description: "Dilatation localisée d'une artère d'un membre suite à un traumatisme.",
              rateCriteria: {
                  low: "Anévrisme de petite taille, asymptomatique, nécessitant une simple surveillance.",
                  medium: "Anévrisme symptomatique (douleurs, compression nerveuse) ayant nécessité un traitement endovasculaire ou chirurgical, sans séquelle ischémique.",
                  high: "Complications de l'anévrisme (thrombose, embolie distale, rupture) avec séquelles ischémiques permanentes."
              }
            },
            { name: "Syndrome de Raynaud post-traumatique ou lié aux vibrations", rate: [5, 20], description: "Trouble vasomoteur des doigts déclenché par le froid ou les vibrations.", rateCriteria: { low: "Crises rares et brèves, touchant 1 ou 2 doigts, sans troubles trophiques.", high: "Crises fréquentes, prolongées, invalidantes, avec troubles trophiques (ulcérations pulpaires)." } },
            { name: "Lymphœdème chronique post-traumatique d'un membre", rate: [10, 30], description: "Gonflement chronique d'un membre par atteinte du système lymphatique après un traumatisme grave ou une chirurgie.", rateCriteria: { low: "Augmentation de volume modérée, réductible au repos, sans retentissement cutané majeur.", high: "Éléphantiasis avec augmentation de volume majeure, troubles trophiques sévères (sclérose cutanée, infections à répétition)." } }
        ]
      },
      {
        name: "Diaphragme",
        injuries: [
            { name: "Séquelles de rupture ou hernie diaphragmatique traumatique opérée", rate: [10, 30], rateCriteria: { low: "Pas de séquelle fonctionnelle, simple cicatrice.", high: "Gêne respiratoire à l'effort, douleurs, troubles digestifs post-opératoires." } }
        ]
      },
      {
        name: "Médiastin et Œsophage",
        injuries: [
            {
                name: "Dysphagie post-traumatique par sténose de l'œsophage cervical",
                rate: [15, 50],
                description: "Difficultés à avaler dues à un rétrécissement de l'œsophage au niveau du cou, suite à un traumatisme ou une brûlure caustique.",
                rateCriteria: {
                    low: "Gêne à la déglutition des solides, nécessitant une adaptation alimentaire simple.",
                    high: "Sténose serrée nécessitant des dilatations répétées ou une chirurgie, avec dysphagie aux liquides et risque de fausses routes."
                }
            },
            {
                name: "Médiastinite chronique post-traumatique (fibrosante)",
                rate: [40, 70],
                description: "Inflammation et fibrose chronique du médiastin après un traumatisme thoracique grave.",
                rateCriteria: {
                    low: "Fibrose modérée avec douleurs thoraciques, sans compression vasculo-nerveuse majeure.",
                    high: "Syndrome de compression de la veine cave supérieure, dysphagie ou dyspnée sévère par compression."
                }
            },
            {
                name: "Fistule œso-trachéale post-traumatique",
                rate: [50, 80],
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
          { name: "Cicatrices opératoires normales", rate: 0 },
          { name: "Cicatrices (sans éventration) très larges et adhérentes", rate: [10, 30] },
          { name: "Cicatrices avec éventration post-opératoire", rate: [5, 30] },
          { name: "Cicatrice avec éventration après laparotomie (appareillage ou non)", rate: [15, 50] },
          { name: "Éventration sur orifice de trocart (post-cœlioscopie)", rate: [5, 15], rateCriteria: { low: "Petite éventration réductible, peu symptomatique.", high: "Éventration volumineuse, douloureuse, nécessitant une ré-intervention." } },
          { name: "Rupture isolée du grand droit de l'abdomen", rate: [8, 20] },
          {
            name: "Diastasis des grands droits post-traumatique",
            rate: [5, 15],
            description: "Séparation des muscles grands droits de l'abdomen après un traumatisme, créant une faiblesse de la paroi.",
            rateCriteria: {
                low: "Diastasis modéré, sans hernie, gêne esthétique isolée.",
                high: "Diastasis large avec bombement à l'effort, douleurs, et faiblesse de la sangle abdominale, nécessitant potentiellement une contention ou une chirurgie."
            }
          },
          { name: "Hernie ou éventration consécutive à des ruptures musculaires", rate: [10, 40] },
          { name: "Éventration hypogastrique", rate: [10, 20] },
          { name: "Éventration post-traumatique", rate: 15, description: "Éventration de la paroi abdominale suite à un traumatisme, nécessitant ou non une contention." },
          { name: "Névralgie pariétale post-traumatique ou post-chirurgicale (nerf ilio-inguinal, ilio-hypogastrique)", rate: [5, 15], description: "Douleurs chroniques dans la région inguinale ou abdominale basse dues à l'atteinte d'un nerf dans une cicatrice.", rateCriteria: { low: "Douleurs à type de brûlure intermittentes, déclenchées par l'effort ou certains mouvements.", high: "Douleurs neuropathiques chroniques et invalidantes, avec hyperesthésie cutanée, rebelles au traitement médical." } },
          { name: "Hernie inguinale opérée (en relation avec accident)", rate: 0 },
          { name: "Hernie inguinale réductible bien maintenue", rate: [5, 8] },
          { name: "Hernies bilatérales", rate: [5, 12] },
          { name: "Hernie inguinale irréductible", rate: [15, 25] },
          { name: "Hernie crurale, ombilicale, ligne blanche épigastrique", rate: [5, 12] },
        ]
      },
      {
        name: "Abdomen - Tube Digestif et Organes",
        injuries: [
          { name: "Séquelles d'ulcère chronique (cicatrices, amaigrissement, douleurs)", rate: [10, 90] },
          { name: "Syndrome du grêle court post-traumatique", rate: [60, 100], description: "Malabsorption sévère après résection étendue de l'intestin grêle.", rateCriteria: { low: "Diarrhée contrôlée par le régime et un traitement simple.", high: "Dépendance à une nutrition parentérale pour maintenir un état nutritionnel correct." } },
          { name: "Syndrome de l'intestin irritable post-traumatique (SII-PT)", rate: [10, 25], description: "Apparition d'un trouble fonctionnel intestinal chronique (douleurs abdominales, ballonnements, troubles du transit) après un traumatisme physique ou psychologique majeur. Diagnostic d'élimination.", rateCriteria: { low: "Symptômes intermittents, contrôlés par le régime et un traitement symptomatique simple, avec un impact limité sur la qualité de vie.", high: "Symptômes quasi-permanents et invalidants, avec un retentissement majeur sur la vie sociale et professionnelle, rebelles aux traitements usuels." } },
          {
            name: "Dumping syndrome (post-chirurgie gastrique traumatique)",
            rate: [15, 40],
            description: "Ensemble de symptômes (malaises, sueurs, diarrhées) survenant après les repas, suite à une chirurgie de l'estomac ou de l'œsophage.",
            rateCriteria: {
                low: "Syndrome précoce modéré, bien contrôlé par des mesures diététiques simples.",
                medium: "Syndrome précoce et/ou tardif (hypoglycémies) fréquent, nécessitant un fractionnement des repas et un traitement médicamenteux, avec retentissement sur les activités.",
                high: "Syndrome sévère et invalidant, rebelle au traitement, avec perte de poids et retentissement socio-professionnel majeur."
            }
          },
          { name: "Sténose biliaire post-traumatique", rate: [20, 50], rateCriteria: { low: "Sténose modérée sans ictère, bien contrôlée par traitement endoscopique (dilatation, prothèse).", high: "Sténose complexe nécessitant des réinterventions ou une chirurgie de dérivation, avec épisodes d'angiocholite à répétition." } },
          { name: "Fistules intestinales - Étroites", rate: [20, 30] },
          { name: "Fistules intestinales - Larges, bas situées", rate: [40, 70] },
          { name: "Fistules intestinales - Larges, haut situées", rate: [70, 90] },
          { name: "Fistules stercorales - Ne livrant que du gaz", rate: [20, 30] },
          { name: "Fistules stercorales - Livrant une certaine quantité de matières", rate: [30, 40] },
          { name: "Anus contre nature livrant passage à la presque totalité du contenu intestinal", rate: [80, 90] },
          { name: "Prolapsus du rectum", rate: [80, 90] },
          { name: "Fistules anales", rate: [10, 40] },
          { name: "Appendicite (si imputable et opérée)", rate: [0, 30] },
          { name: "Incontinence ou rétention fécale par lésions du sphincter anal", rate: [30, 70] },
          { name: "Séquelles de contusion hépatique (douleurs, troubles digestifs)", rate: [5, 20] },
          { name: "Fistules biliaires ou purulentes (Contusion du foie)", rate: [20, 60] },
          { name: "Ablation de la rate (splénectomie)", rate: 18, description: "Splénectomie totale post-traumatique suite rupture de rate." },
          { name: "Splénectomie (Ablation de la rate)", rate: [15, 30] },
          { name: "Splénose péritonéale (après rupture de la rate)", rate: [0, 10], description: "Généralement asymptomatique. Le taux indemnise le risque potentiel de complication (douleurs, occlusion) ou la gêne si les nodules sont volumineux.", rateCriteria: { low: "Découverte fortuite, asymptomatique.", high: "Nodules symptomatiques (douleurs abdominales chroniques) confirmés par imagerie." } },
          { name: "Adhérences abdominales post-traumatiques/post-opératoires avec troubles du transit", rate: [10, 40], rateCriteria: { low: "Douleurs abdominales chroniques intermittentes, sans épisodes subocclusifs documentés.", high: "Syndrome occlusif ou subocclusif à répétition ayant nécessité une ou plusieurs hospitalisations/interventions." } },
          { name: "Séquelles de pancréatite aiguë post-traumatique", rate: [15, 60], rateCriteria: { low: "Pancréatite chronique modérée avec douleurs récurrentes contrôlées par le traitement.", medium: "Insuffisance pancréatique exocrine (stéatorrhée) nécessitant un traitement substitutif enzymatique.", high: "Diabète secondaire (insuffisance endocrine) nécessitant un traitement par insuline." } },
          { name: "Séquelles de colectomie partielle post-traumatique (hors stomie)", rate: [15, 30], description: "Troubles du transit (diarrhée, constipation) et douleurs abdominales après résection d'une partie du côlon.", rateCriteria: { low: "Troubles du transit modérés et bien contrôlés par le régime.", high: "Diarrhée motrice invalidante ou syndrome occlusif récidivant." } },
          { name: "Séquelles d'hépatectomie partielle post-traumatique", rate: [10, 40], description: "Séquelles après résection d'une partie du foie.", rateCriteria: { low: "Hépatectomie mineure, sans insuffisance hépatique, simple fatigue.", high: "Hépatectomie majeure avec signes d'insuffisance hépato-cellulaire et/ou hypertension portale." } }
        ]
      },
      {
        name: "Appareil Génito-Urinaire",
        injuries: [
          { name: "Néphrectomie (ablation d'un rein), avec rein restant sain", rate: 30 },
          { name: "Néphrectomie avec azotémie irréductible de 0,60 à 1 gramme", rate: [30, 60] },
          { name: "Néphrectomie avec azotémie irréductible supérieure à 1 gramme", rate: [60, 100] },
          { name: "Éventration lombo-abdominale après néphrectomie", rate: [10, 30] },
          { name: "Contusions et ruptures du rein (séquelles)", rate: [10, 100] },
          { name: "Hydronéphrose traumatique", rate: [30, 50] },
          { name: "Modification d'une hydronéphrose antérieure", rate: [15, 30] },
          { name: "Rupture d'uretère avec périnéphrose ou fistule", rate: [30, 50] },
          { name: "Sténose urétérale post-traumatique", rate: [15, 40], description: "Rétrécissement de l'uretère, pouvant entraîner une dilatation du rein (hydronéphrose) et une altération de la fonction rénale.", rateCriteria: { low: "Sténose modérée sans retentissement sur la fonction rénale, nécessitant une surveillance ou une dilatation endoscopique ponctuelle.", high: "Sténose serrée avec hydronéphrose et altération de la fonction rénale, ayant nécessité une réimplantation urétérale ou une endoprothèse à demeure." } },
          { name: "Rein mobile toujours indépendant du traumatisme", rate: 0 },
          { name: "Pyélonéphrite post-traumatique ascendante (unilatérale)", rate: [30, 50] },
          { name: "Pyélonéphrite post-traumatique ascendante (bilatérale)", rate: [60, 80] },
          { name: "Phlegmon périnéphrétique après traumatisme", rate: [10, 20] },
          { name: "Tuberculose rénale (modification par traumatisme)", rate: [15, 30] },
          { name: "Atrophie ou destruction d'un testicule", rate: [1, 10] },
          { name: "Atrophie ou destruction des deux testicules (selon l'âge)", rate: [20, 50] },
          { name: "Emasculation totale", rate: [80, 90] },
          { name: "Hématocèle et hydrocèle post-traumatique", rate: [5, 15] },
          { name: "Séquelles de contusion du testicule ou torsion", rate: [5, 10] },
          { name: "Dysfonction érectile post-traumatique (origine non neurologique médullaire)", rate: [10, 25], rateCriteria: { low: "Réponse partielle aux traitements de première intention (IPDE5), vie sexuelle possible mais altérée.", high: "Absence de réponse aux traitements de première et deuxième ligne (injections intra-caverneuses), vie sexuelle impossible." } },
          { name: "Tuberculose épididymo-testiculaire modifiée par traumatisme", rate: [10, 30] },
          { name: "Éventration hypogastrique après cystostomie", rate: [10, 30] },
          { name: "Fistule hypogastrique persistante", rate: [50, 70] },
          { name: "Cystite chronique persistante", rate: [20, 40] },
          { name: "Avec infection rénale (unilatérale)", rate: [40, 60] },
          { name: "Avec infection rénale (bilatérale)", rate: [60, 80] },
          { name: "Rétention d'urine chronique et permanente (complète)", rate: [40, 60] },
          { name: "Rétention d'urine chronique et permanente (incomplète)", rate: [20, 40] },
          { name: "Vessie neurologique post-traumatique (origine non médullaire)", rate: [30, 70], rateCriteria: { low: "Hyperactivité vésicale contrôlée par traitement oral, sans incontinence majeure.", medium: "Dysurie nécessitant des auto-sondages intermittents, avec un impact sur la vie sociale.", high: "Incontinence urinaire complète nécessitant une protection permanente ou une dérivation urinaire." } },
          { name: "Incontinence d'urine rebelle ou permanente", rate: [20, 40] },
          { name: "Rétrécissement de l'urètre postérieur infranchissable", rate: [60, 80] },
          { name: "Rétrécissement de l'urètre postérieur difficilement franchissable", rate: [30, 50] },
          { name: "Rétrécissement de l'urètre postérieur facilement franchissable", rate: [15, 30] },
          { name: "Rétrécissement de l'urètre antérieur facilement dilatable", rate: [15, 30] },
          { name: "Rétrécissement de l'urètre antérieur difficilement dilatable", rate: [30, 50] },
          { name: "Autoplastie cutanée ou autre de l'urètre", rate: [20, 50] },
          { name: "Fistule urinaire persistante avec rétrécissement", rate: [30, 40] },
          { name: "Destruction totale de l'urètre antérieur", rate: [50, 90] },
          { name: "Prolapsus utérin post-traumatique", rate: [15, 30] },
          { name: "Stérilité féminine post-traumatique (selon l'âge et le désir de maternité)", rate: [10, 50] },
          { name: "Troubles menstruels post-traumatiques graves et persistants", rate: [5, 15] },
          { name: "Séquelles de traumatisme ovarien (douleurs chroniques, troubles hormonaux)", rate: [10, 25] },
          { name: "Fistule vésico-vaginale post-traumatique", rate: [30, 50], description: "Communication anormale entre la vessie et le vagin, souvent après une fracture grave du bassin.", rateCriteria: { low: "Fistule de petite taille, à débit faible, ayant pu être traitée avec succès par une intervention simple.", high: "Fistule large et complexe, avec incontinence urinaire totale, nécessitant une ou plusieurs chirurgies de reconstruction majeures, avec retentissement social et psychologique majeur." } },
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
          { name: "Cicatrices de l'aisselle - Bras collé au corps (droite)", rate: [30, 40] },
          { name: "Cicatrices de l'aisselle - Bras collé au corps (gauche)", rate: [25, 30] },
          { name: "Cicatrices de l'aisselle - Abduction limitée de 10° à 45° (droite)", rate: [20, 30] },
          { name: "Cicatrices de l'aisselle - Abduction limitée de 10° à 45° (gauche)", rate: [15, 25] },
          { name: "Cicatrices de l'aisselle - Abduction limitée de 45° à 90° (droite)", rate: [15, 20] },
          { name: "Cicatrices de l'aisselle - Abduction limitée de 45° à 90° (gauche)", rate: [10, 15] },
          { name: "Cicatrices de l'aisselle - Abduction conservée jusqu'à 90° (droite)", rate: [10, 15] },
          { name: "Cicatrices de l'aisselle - Abduction conservée jusqu'à 90° (gauche)", rate: [5, 10] },
        ]
      },
      {
        name: "Ceinture Scapulaire - Fractures et Lésions Musculaires",
        injuries: [
          { name: "Fracture Clavicule - Bien consolidée sans raideur (Main Dominante)", rate: [2, 3] },
          { name: "Fracture Clavicule - Bien consolidée sans raideur (Main Non Dominante)", rate: [1, 2] },
          { name: "Fracture Clavicule - Cal saillant avec raideur d'épaule (Main Dominante)", rate: [5, 15], rateCriteria: { low: "Raideur légère, limitation des amplitudes extrêmes.", high: "Raideur marquée limitant l'abduction à 90°." } },
          { name: "Fracture Clavicule - Cal saillant avec raideur d'épaule (Main Non Dominante)", rate: [4, 12], rateCriteria: { low: "Raideur légère.", high: "Raideur marquée." } },
          { name: "Fracture Clavicule - Double, cals saillants, raideurs des épaules (Main Dominante)", rate: [10, 30], rateCriteria: { low: "Raideur modérée.", high: "Raideur sévère." } },
          { name: "Fracture Clavicule - Double, cals saillants, raideurs des épaules (Main Non Dominante)", rate: [8, 25], rateCriteria: { low: "Raideur modérée.", high: "Raideur sévère." } },
          { name: "Fracture Clavicule - Cal difforme avec compressions nerveuses (Main Dominante)", rate: [30, 40], rateCriteria: { low: "Signes neurologiques modérés.", high: "Signes neurologiques sévères." } },
          { name: "Fracture Clavicule - Cal difforme avec compressions nerveuses (Main Non Dominante)", rate: [25, 35], rateCriteria: { low: "Signes neurologiques modérés.", high: "Signes neurologiques sévères." } },
          { name: "Pseudarthrose Clavicule (Main Dominante)", rate: [5, 10], rateCriteria: { low: "Pseudarthrose serrée, peu symptomatique.", high: "Pseudarthrose lâche, symptomatique." } },
          { name: "Pseudarthrose Clavicule (Main Non Dominante)", rate: [3, 6], rateCriteria: { low: "Pseudarthrose serrée.", high: "Pseudarthrose lâche." } },
          { name: "Luxation Clavicule non réduite - Externe (acromio-claviculaire) (Main Dominante)", rate: [0, 5], rateCriteria: { low: "Stade I-II, peu de gêne.", high: "Stade III, tiroir antéro-postérieur, gêne et douleur." } },
          { name: "Luxation Clavicule non réduite - Externe (acromio-claviculaire) (Main Non Dominante)", rate: [0, 4], rateCriteria: { low: "Stade I-II.", high: "Stade III." } },
          { name: "Luxation Clavicule non réduite - Interne (sterno-claviculaire) (Main Dominante)", rate: [4, 8], rateCriteria: { low: "Subluxation, peu symptomatique.", high: "Luxation complète, douloureuse." } },
          { name: "Luxation Clavicule non réduite - Interne (sterno-claviculaire) (Main Non Dominante)", rate: [2, 5], rateCriteria: { low: "Subluxation.", high: "Luxation complète." } },
          { name: "Fracture Omoplate (selon variété et désordres articulaires)", rate: [10, 50], rateCriteria: { low: "Fracture du corps sans retentissement articulaire.", medium: "Fracture de l'acromion ou de la coracoïde avec conflit.", high: "Fracture articulaire (glène) avec arthrose et raideur majeure." } },
          { name: "Rupture du deltoïde plus ou moins complète (Main Dominante)", rate: [10, 25], rateCriteria: { low: "Rupture partielle, force diminuée.", high: "Rupture complète, abduction active impossible." } },
          { name: "Rupture du deltoïde plus ou moins complète (Main Non Dominante)", rate: [8, 20], rateCriteria: { low: "Rupture partielle.", high: "Rupture complète." } },
        ]
      },
      {
        name: "Épaule - Amputation et Désarticulation",
        injuries: [
          { name: "Désarticulation de l'épaule ou amputation au col chirurgical (Main Dominante)", rate: 90, description: "Amputation complète du membre supérieur au niveau de l'épaule, côté dominant." },
          { name: "Désarticulation de l'épaule ou amputation au col chirurgical (Main Non Dominante)", rate: 80, description: "Amputation complète du membre supérieur au niveau de l'épaule, côté non dominant." },
          { name: "Amputation interscapulo-thoracique (Main Dominante)", rate: 95, description: "Amputation avec ablation de l'omoplate et de la clavicule, côté dominant. Séquelle majeure." },
          { name: "Amputation interscapulo-thoracique (Main Non Dominante)", rate: 85, description: "Amputation avec ablation de l'omoplate et de la clavicule, côté non dominant." },
        ]
       },
       {
        name: "Épaule - Fractures de l'Extrémité Supérieure de l'Humérus",
        injuries: [
          { name: "Fracture de la tête humérale", rate: [18, 25] },
          { name: "Fracture de la tête humérale avec blocage et impotence fonctionnelle quasi totale (Main Dominante)", rate: [30, 45] },
          { name: "Fracture de la tête humérale avec blocage et impotence fonctionnelle quasi totale (Main Non Dominante)", rate: [25, 35] },
          { name: "Fracture de la tête humérale avec raideur importante de l'épaule (Main Dominante)", rate: [20, 30] },
          { name: "Fracture de la tête humérale avec raideur importante de l'épaule (Main Non Dominante)", rate: [15, 25] },
          { name: "Fracture du col chirurgical avec cal vicieux important et abduction limitée (Main Dominante)", rate: [25, 35] },
          { name: "Fracture du col chirurgical avec cal vicieux important et abduction limitée (Main Non Dominante)", rate: [20, 30] },
          { name: "Fracture du col chirurgical avec raccourcissement et gêne modérée (Main Dominante)", rate: [8, 15] },
          { name: "Fracture du col chirurgical avec raccourcissement et gêne modérée (Main Non Dominante)", rate: [6, 12] },
          { name: "Fracture du trochiter avec limitation de l'abduction et rotation (Main Dominante)", rate: [8, 15] },
          { name: "Fracture du trochiter avec limitation de l'abduction et rotation (Main Non Dominante)", rate: [6, 12] },
          { name: "Fracture du trochin avec limitation de la rotation interne (Main Dominante)", rate: [5, 10] },
          { name: "Fracture du trochin avec limitation de la rotation interne (Main Non Dominante)", rate: [4, 8] },
        ]
       },
       {
        name: "Épaule - Raideurs et Ankyloses",
        injuries: [
          { name: "Raideur de l'épaule (propulsion, abduction, rotation) (Main Dominante)", rate: [5, 30], rateCriteria: { low: "Limitation des amplitudes extrêmes, abduction possible > 90°.", medium: "Abduction limitée à 90°, rotation externe/interne limitée de 50%.", high: "Abduction < 60°, quasi-ankylose, main ne peut atteindre la tête." } },
          { name: "Raideur de l'épaule (propulsion, abduction, rotation) (Main Non Dominante)", rate: [4, 25], rateCriteria: { low: "Limitation légère.", medium: "Limitation modérée.", high: "Quasi-ankylose." } },
          { name: "Raideur de l'épaule - Abduction 60-90°", rate: [12, 22], description: "Limitation modérée de l'abduction entre 60 et 90 degrés avec rotation préservée." },
          { name: "Raideur de l'épaule - Abduction 60-90° + rotation", rate: [15, 25], description: "Limitation combinée abduction 60-90° et rotations externe/interne réduites." },
          { name: "Raideur de l'épaule avec douleur", rate: [18, 28], description: "Raideur articulaire avec composante douloureuse chronique limitant les activités." },
          { name: "Raideur de l'épaule - Limitation rotation", rate: [10, 20], description: "Abduction quasi normale mais rotations externe/interne très limitées." },
          { name: "Raideur + instabilité épaule", rate: [20, 30], description: "Association raideur articulaire et instabilité (luxation récidivante ou subluxation)." },
          { name: "Raideur de l'épaule - Élévation limitée", rate: [12, 20], description: "Limitation de l'élévation antérieure et de l'antépulsion." },
          { name: "Raideur de l'épaule avec limitation fonctionnelle", rate: [15, 25], description: "Raideur avec retentissement sur gestes quotidiens (main derrière dos, tête impossible)." },
          { name: "Ankylose d'épaule avec mobilité de l'omoplate (Main Dominante)", rate: [35, 45], rateCriteria: { low: "Ankylose en position fonctionnelle (abduction 45-60°).", high: "Ankylose en adduction stricte ou abduction > 90°." } },
          { name: "Ankylose d'épaule avec mobilité de l'omoplate (Main Non Dominante)", rate: [25, 30], rateCriteria: { low: "Position fonctionnelle.", high: "Position non fonctionnelle." } },
          { name: "Ankylose d'épaule avec fixation de l'omoplate (Main Dominante)", rate: [45, 60], rateCriteria: { low: "Position fonctionnelle.", high: "Position non fonctionnelle." } },
          { name: "Ankylose d'épaule avec fixation de l'omoplate (Main Non Dominante)", rate: [35, 50], rateCriteria: { low: "Position fonctionnelle.", high: "Position non fonctionnelle." } },
        ]
      },
      {
        name: "Épaule - Lésions Diverses",
        injuries: [
          { name: "Périarthrite chronique douloureuse - limitation modérée (Main Dominante)", rate: [5, 25], rateCriteria: { low: "Douleurs occasionnelles à l'effort, mobilité quasi-normale.", medium: "Douleurs fréquentes avec limitation modérée des amplitudes.", high: "Douleurs invalidantes avec épaule gelée." } },
          { name: "Périarthrite chronique douloureuse - limitation modérée (Main Non Dominante)", rate: [4, 20], rateCriteria: { low: "Douleurs occasionnelles.", high: "Douleurs fréquentes et invalidantes." } },
          { name: "Périarthrite chronique douloureuse - abolition des mouvements et atrophie (Main Dominante)", rate: [30, 35], rateCriteria: { low: "Atrophie modérée.", high: "Atrophie sévère." } },
          { name: "Périarthrite chronique douloureuse - abolition des mouvements et atrophie (Main Non Dominante)", rate: [20, 25], rateCriteria: { low: "Atrophie modérée.", high: "Atrophie sévère." } },
          { name: "Rupture complète de la coiffe des rotateurs", rate: 25 },
          { name: "Rupture de la coiffe des rotateurs post-traumatique (supra-épineux, etc.) (Main Dominante)", rate: [10, 30], rateCriteria: { low: "Rupture partielle, douleurs à l'effort, mobilité quasi-normale.", medium: "Rupture transfixiante d'un tendon, perte de force, abduction limitée mais possible.", high: "Rupture massive et irréparable, épaule pseudo-paralytique." } },
          { name: "Rupture de la coiffe des rotateurs post-traumatique (supra-épineux, etc.) (Main Non Dominante)", rate: [8, 25], rateCriteria: { low: "Rupture partielle, douleurs à l'effort.", medium: "Rupture transfixiante, perte de force.", high: "Rupture massive, épaule pseudo-paralytique." } },
          { name: "Lésion SLAP (Superior Labrum from Anterior to Posterior) chronique (Main Dominante)", rate: [8, 20], description: "Lésion du bourrelet glénoïdien supérieur de l'épaule, entraînant des douleurs, des blocages et une instabilité fonctionnelle.", rateCriteria: { low: "Douleurs mécaniques aux mouvements extrêmes (armé du bras), sans instabilité objective.", high: "Douleurs, blocages et ressauts fréquents avec perte de force, invalidant pour les gestes au-dessus de la tête." } },
          { name: "Lésion SLAP (Superior Labrum from Anterior to Posterior) chronique (Main Non Dominante)", rate: [6, 15], description: "Lésion du bourrelet glénoïdien supérieur de l'épaule, entraînant des douleurs, des blocages et une instabilité fonctionnelle.", rateCriteria: { low: "Douleurs mécaniques aux mouvements extrêmes (armé du bras), sans instabilité objective.", high: "Douleurs, blocages et ressauts fréquents avec perte de force, invalidant pour les gestes au-dessus de la tête." } },
          { name: "Pseudarthrose (épaule ballante) (Main Dominante)", rate: [60, 70], rateCriteria: { low: "Instabilité modérée.", high: "Instabilité majeure, membre inutile." } },
          { name: "Pseudarthrose (épaule ballante) (Main Non Dominante)", rate: [45, 60], rateCriteria: { low: "Instabilité modérée.", high: "Instabilité majeure." } },
          { name: "Luxation récidivante de l'épaule", rate: 18, description: "Luxation récidivante de l'épaule sans précision de côte ou dominance." },
          { name: "Luxation récidivante de l'épaule (Main Dominante)", rate: [10, 30], rateCriteria: { low: "Luxations rares, peu d'appréhension.", medium: "Luxations fréquentes, appréhension limitant les activités.", high: "Instabilité majeure, luxations quasi-permanentes, arthrose." } },
          { name: "Luxation récidivante de l'épaule (Main Non Dominante)", rate: [8, 25], rateCriteria: { low: "Luxations rares.", medium: "Luxations fréquentes.", high: "Instabilité majeure." } },
          { name: "Capsulite rétractile post-traumatique (épaule gelée) (Main Dominante)", rate: [15, 30], description: "Enraidissement progressif et douloureux de l'épaule avec limitation de toutes les mobilités actives et passives.", rateCriteria: { low: "Phase résolutive avec récupération de plus de 50% des mobilités, douleurs résiduelles.", high: "Séquelles de raideur majeure et permanente malgré le traitement, avec retentissement fonctionnel sévère." } },
          { name: "Capsulite rétractile post-traumatique (épaule gelée) (Main Non Dominante)", rate: [12, 25], description: "Enraidissement progressif et douloureux de l'épaule.", rateCriteria: { low: "Récupération de plus de 50% des mobilités.", high: "Raideur majeure et permanente." } },
          { name: "Séquelles de prothèse totale d'épaule (Main Dominante)", rate: [20, 40], rateCriteria: { low: "Prothèse bien intégrée, indolore, mobilité > 90°.", high: "Douleurs, instabilité, mobilité très limitée, nécessité d'aide." } },
          { name: "Séquelles de prothèse totale d'épaule (Main Non Dominante)", rate: [15, 35], rateCriteria: { low: "Prothèse bien intégrée, indolore.", high: "Douleurs, instabilité, mobilité limitée." } },
        ]
      },
      {
        name: "Bras - Amputations",
        injuries: [
            { name: "Amputation du bras au tiers moyen ou inférieur (Main Dominante)", rate: [80, 85], rateCriteria: { low: "Moignon long.", high: "Moignon court." } },
            { name: "Amputation du bras au tiers moyen ou inférieur (Main Non Dominante)", rate: [70, 75], rateCriteria: { low: "Moignon long.", high: "Moignon court." } },
            { name: "Amputation du bras au tiers supérieur (Main Dominante)", rate: [80, 85], rateCriteria: { low: "Moignon long.", high: "Moignon très court, difficilement appareillable." } },
            { name: "Amputation du bras au tiers supérieur (Main Non Dominante)", rate: [70, 75], rateCriteria: { low: "Moignon long.", high: "Moignon très court." } },
        ]
       },
       {
        name: "Bras - Fractures et Lésions Musculaires",
        injuries: [
            { name: "Fracture de l'humérus normalement consolidée (Main Dominante)", rate: [4, 6], rateCriteria: { low: "Consolidation parfaite, sans aucune limitation de mobilité. Gêne très discrète et occasionnelle lors d'efforts importants.", medium: "Douleurs modérées lors des efforts, sans limitation objective des amplitudes articulaires.", high: "Consolidation de bonne qualité mais avec des douleurs persistantes à la mobilisation de l'épaule ou du coude, et une légère atrophie musculaire." } },
            { name: "Fracture de l'humérus normalement consolidée (Main Non Dominante)", rate: [3, 5], rateCriteria: { low: "Consolidation parfaite, sans gêne fonctionnelle.", medium: "Gêne douloureuse lors des efforts de force.", high: "Douleurs persistantes à l'effort et gêne modérée dans les gestes de la vie quotidienne." } },
            { name: "Fracture de l'humérus avec déformation et atrophie (sans paralysie) (Main Dominante)", rate: [7, 30], rateCriteria: { low: "Déformation légère, pas de limitation fonctionnelle.", medium: "Cal vicieux avec limitation de la mobilité de l'épaule ou du coude.", high: "Cal vicieux important, atrophie musculaire, troubles neurologiques associés." } },
            { name: "Fracture de l'humérus avec déformation et atrophie (sans paralysie) (Main Non Dominante)", rate: [5, 25], rateCriteria: { low: "Déformation légère.", medium: "Cal vicieux.", high: "Cal vicieux important." } },
            { name: "Pseudarthrose de l'humérus - Partie moyenne (Main Dominante)", rate: [40, 50], rateCriteria: { low: "Pseudarthrose serrée, stable.", high: "Pseudarthrose lâche, bras ballant." } },
            { name: "Pseudarthrose de l'humérus - Partie moyenne (Main Non Dominante)", rate: [30, 40], rateCriteria: { low: "Pseudarthrose serrée.", high: "Pseudarthrose lâche." } },
            { name: "Pseudarthrose de l'humérus - Voisinage épaule ou coude (épaule/coude ballant)", description: "Se référer aux taux pour épaule/coude ballant", rate: [40, 70], rateCriteria: { low: "Instabilité modérée.", high: "Instabilité majeure, membre inutile." } },
            { name: "Rupture du biceps partielle (Main Dominante)", rate: [8, 15], description: "Désinsertion partielle d'un tendon du biceps, avec déformation modérée ('signe de Popeye' partiel) et perte de force en flexion/supination.", rateCriteria: { low: "Déformation modérée, perte de force légère.", high: "Perte de force notable (>20%) avec gêne fonctionnelle." } },
            { name: "Rupture du biceps partielle (Main Non Dominante)", rate: [6, 12], rateCriteria: { low: "Déformation modérée, peu de gêne.", high: "Perte de force et gêne fonctionnelle." } },
            { name: "Rupture du biceps complète (Main Dominante)", rate: [15, 25], description: "Rupture totale d'un tendon du biceps (souvent le long chef), avec déformation marquée ('signe de Popeye') et perte de force significative.", rateCriteria: { low: "Perte de force modérée (environ 30%), bien compensée.", high: "Perte de force importante (>40%), invalidante pour les travaux de force." } },
            { name: "Rupture du biceps complète (Main Non Dominante)", rate: [12, 20], rateCriteria: { low: "Perte de force modérée.", high: "Perte de force importante et invalidante." } },
            { name: "Rupture du triceps totale (Main Dominante)", rate: [20, 30] },
            { name: "Rupture du triceps totale (Main Non Dominante)", rate: [15, 25] },
        ]
      },
      {
        name: "Coude - Désarticulation",
        injuries: [
          { name: "Désarticulation du coude (Main Dominante)", rate: [75, 80], rateCriteria: { low: "Moignon long et de bonne qualité.", high: "Moignon court ou douloureux." } },
          { name: "Désarticulation du coude (Main Non Dominante)", rate: [65, 70], rateCriteria: { low: "Moignon long et de bonne qualité.", high: "Moignon court ou douloureux." } },
        ]
      },
      {
        name: "Coude - Fractures et Pseudarthroses",
        injuries: [
          { name: "Fracture de l'olécrane - Cal osseux court, bonne extension (Main Dominante)", rate: [3, 5] },
          { name: "Fracture de l'olécrane - Cal osseux court, bonne extension (Main Non Dominante)", rate: [2, 4] },
          { name: "Fracture de l'olécrane - Cal fibreux long, extension active faible (Main Dominante)", rate: [8, 10] },
          { name: "Fracture de l'olécrane - Cal fibreux long, extension active faible (Main Non Dominante)", rate: [6, 8] },
          { name: "Fracture de l'olécrane - Cal fibreux long, extension active nulle, atrophie (Main Dominante)", rate: [20, 23] },
          { name: "Fracture de l'olécrane - Cal fibreux long, extension active nulle, atrophie (Main Non Dominante)", rate: [15, 18] },
          { name: "Fracture de l'olécrane - Avec raideur importante", rate: [18, 25] },
          { name: "Cicatrices du coude entravant l'extension - à 135°", rate: [10, 15] },
          { name: "Cicatrices du coude entravant l'extension - à 90°", rate: [15, 20] },
          { name: "Cicatrices du coude entravant l'extension - à 45°", rate: [35, 40] },
          { name: "Cicatrices du coude entravant l'extension - en deçà de 45°", rate: [45, 50] },
          { name: "Pseudarthrose coude - Mobile (coude ballant) (Main Dominante)", rate: [40, 50] },
          { name: "Pseudarthrose coude - Mobile (coude ballant) (Main Non Dominante)", rate: [30, 40] },
          { name: "Pseudarthrose coude - Avec ankylose (Main Dominante)", rate: [30, 45] },
          { name: "Pseudarthrose coude - Avec ankylose (Main Non Dominante)", rate: [25, 35] },
        ]
      },
      {
        name: "Coude - Raideurs et Ankyloses",
        injuries: [
            { name: "Raideur du coude - Flexion 90-130°", rate: [8, 18], description: "Limitation modérée de la flexion entre 90 et 130 degrés, extension quasi normale." },
            { name: "Raideur du coude - Flexion + pronosupination", rate: [12, 20], description: "Limitation combinée flexion et pronosupination." },
            { name: "Raideur du coude - Flexion 90-130° + extension", rate: [15, 25], description: "Limitation bipolaire flexion-extension avec déficit fonctionnel." },
            { name: "Raideur du coude post-fracture", rate: [12, 22], description: "Séquelles de fracture avec raideur résiduelle et limitation pronosupination." },
            { name: "Raideur du coude - Pronosupination limitée", rate: [8, 15], description: "Flexion-extension préservées mais pronation/supination très réduites." },
            { name: "Raideur du coude - Limitation sévère", rate: [18, 28], description: "Flexion ≤ 90° avec déficit extension important, limitation majeure." },
            { name: "Raideur du coude avec douleur", rate: [12, 20], description: "Raideur articulaire avec composante douloureuse chronique." },
            { name: "Raideur + déficit force coude", rate: [15, 25], description: "Raideur associée à diminution significative de la force de préhension." },
            { name: "Ankylose du coude en position vicieuse", rate: [30, 45] },
            { name: "Ankylose complète du coude - Bras en pronation (Main Dominante)", rate: [40, 50] },
            { name: "Ankylose complète du coude - Bras en pronation (Main Non Dominante)", rate: [30, 40] },
            { name: "Ankylose complète du coude - Bras en supination (Main Dominante)", rate: [50, 60] },
            { name: "Ankylose complète du coude - Bras en supination (Main Non Dominante)", rate: [40, 50] },
            { name: "Ankylose complète du coude - Bras entre pronation et supination (Main Dominante)", rate: [30, 40] },
            { name: "Ankylose complète du coude - Bras entre pronation et supination (Main Non Dominante)", rate: [25, 35] },
            { name: "Limitation de la flexion du coude (Main Dominante)", rate: [3, 25], rateCriteria: { low: "Limitation légère (flexion > 100°).", high: "Flexion limitée à 45°." } },
            { name: "Limitation de la flexion du coude (Main Non Dominante)", rate: [2, 20], rateCriteria: { low: "Limitation légère.", high: "Limitation sévère." } },
            { name: "Limitation de l'extension du coude (Main Dominante)", rate: [2, 10], rateCriteria: { low: "Déficit d'extension < 45°.", high: "Déficit d'extension > 90° (flessum)." } },
            { name: "Limitation de l'extension du coude (Main Non Dominante)", rate: [1, 8], rateCriteria: { low: "Déficit léger.", high: "Déficit important." } },
            { name: "Limitation de la pronation (Main Dominante)", rate: [4, 8] },
            { name: "Limitation de la pronation (Main Non Dominante)", rate: [2, 6] },
            { name: "Limitation de la supination (Main Dominante)", rate: [5, 10] },
            { name: "Limitation de la supination (Main Non Dominante)", rate: [4, 8] },
            { name: "Abolition de la prono-supination (Main Dominante)", rate: [15, 20], rateCriteria: { low: "Blocage en position neutre.", high: "Blocage en pronation complète." } },
            { name: "Abolition de la prono-supination (Main Non Dominante)", rate: [12, 18], rateCriteria: { low: "Position neutre.", high: "Pronation complète." } },
        ]
      },
      {
        name: "Coude - Lésions Diverses",
        injuries: [
            { name: "Séquelles de prothèse totale du coude (Main Dominante)", rate: [25, 50], rateCriteria: { low: "Prothèse indolore, mobilité fonctionnelle.", high: "Douleurs, instabilité, descellement, mobilité très limitée." } },
            { name: "Séquelles de prothèse totale du coude (Main Non Dominante)", rate: [20, 45], rateCriteria: { low: "Prothèse indolore.", high: "Douleurs et instabilité." } },
            { name: "Hygroma chronique du coude (Main Dominante)", rate: [2, 5] },
            { name: "Hygroma chronique du coude (Main Non Dominante)", rate: [1, 4] },
            { name: "Épicondylite ou Épitrochléite chronique rebelle (Main Dominante)", rate: [5, 15], rateCriteria: { low: "Douleurs mécaniques à l'effort.", high: "Douleurs permanentes invalidantes, rebelles au traitement." } },
            { name: "Épicondylite ou Épitrochléite chronique rebelle (Main Non Dominante)", rate: [4, 12], rateCriteria: { low: "Douleurs à l'effort.", high: "Douleurs permanentes." } },
            { name: "Instabilité chronique du coude post-traumatique (Main Dominante)", rate: [10, 25], rateCriteria: { low: "Instabilité modérée, peu de ressauts.", high: "Instabilité majeure, luxations récidivantes, arthrose." } },
            { name: "Instabilité chronique du coude post-traumatique (Main Non Dominante)", rate: [8, 20], rateCriteria: { low: "Instabilité modérée.", high: "Instabilité majeure." } },
        ]
      },
      {
        name: "Avant-bras - Amputations",
        injuries: [
            { name: "Amputation de l'avant-bras (Main Dominante)", rate: [70, 75], rateCriteria: { low: "Moignon long.", high: "Moignon court." } },
            { name: "Amputation de l'avant-bras (Main Non Dominante)", rate: [60, 65], rateCriteria: { low: "Moignon long.", high: "Moignon court." } },
            { name: "Perte des deux mains ou désarticulation des poignets", rate: 100 },
        ]
       },
       {
        name: "Avant-bras - Fractures et Pseudarthroses",
        injuries: [
            { name: "Fracture des deux os de l'avant-bras - Bonne consolidation sans trouble fonctionnel (Main Dominante)", rate: [3, 6] },
            { name: "Fracture des deux os de l'avant-bras - Bonne consolidation sans trouble fonctionnel (Main Non Dominante)", rate: [2, 5] },
            { name: "Fracture des deux os de l'avant-bras - Cal vicieux avec limitation de la prono-supination (Main Dominante)", rate: [10, 25], rateCriteria: { low: "Limitation légère.", high: "Blocage complet en pronation." } },
            { name: "Fracture des deux os de l'avant-bras - Cal vicieux avec limitation de la prono-supination (Main Non Dominante)", rate: [8, 20], rateCriteria: { low: "Limitation légère.", high: "Blocage complet." } },
            { name: "Fracture des deux os de l'avant-bras - Cal vicieux avec impotence et troubles nerveux (Main Dominante)", rate: [30, 45] },
            { name: "Fracture des deux os de l'avant-bras - Cal vicieux avec impotence et troubles nerveux (Main Non Dominante)", rate: [25, 35] },
            { name: "Fracture isolée du radius (Main Dominante)", rate: [4, 8] },
            { name: "Fracture isolée du radius (Main Non Dominante)", rate: [3, 6] },
            { name: "Fracture isolée du radius - Avec cal vicieux modéré (Main Dominante)", rate: [6, 10], rateCriteria: { low: "Cal vicieux visible mais limitation légère de la prono-supination (<30%).", high: "Cal vicieux avec limitation modérée (30-50%) et gêne fonctionnelle moyenne." } },
            { name: "Fracture isolée du radius - Avec cal vicieux modéré (Main Non Dominante)", rate: [5, 8], rateCriteria: { low: "Cal vicieux visible mais limitation légère de la prono-supination (<30%).", high: "Cal vicieux avec limitation modérée (30-50%) et gêne fonctionnelle moyenne." } },
            { name: "Fracture isolée du cubitus (Main Dominante)", rate: [3, 6] },
            { name: "Fracture isolée du cubitus (Main Non Dominante)", rate: [2, 5] },
            { name: "Pseudarthrose des deux os de l'avant-bras - serrée (Main Dominante)", rate: [25, 35] },
            { name: "Pseudarthrose des deux os de l'avant-bras - serrée (Main Non Dominante)", rate: [20, 30] },
            { name: "Pseudarthrose des deux os de l'avant-bras - lâche (Main Dominante)", rate: [45, 55] },
            { name: "Pseudarthrose des deux os de l'avant-bras - lâche (Main Non Dominante)", rate: [35, 45] },
            { name: "Pseudarthrose du radius (Main Dominante)", rate: [20, 25] },
            { name: "Pseudarthrose du radius (Main Non Dominante)", rate: [15, 20] },
            { name: "Pseudarthrose du cubitus (Main Dominante)", rate: [15, 20] },
            { name: "Pseudarthrose du cubitus (Main Non Dominante)", rate: [12, 18] },
            { name: "Séquelles de fracture-luxation de Monteggia (Main Dominante)", rate: [10, 30], rateCriteria: { low: "Consolidation sans limitation majeure.", high: "Raideur et instabilité du coude, limitation prono-supination." } },
            { name: "Séquelles de fracture-luxation de Monteggia (Main Non Dominante)", rate: [8, 25], rateCriteria: { low: "Consolidation sans limitation majeure.", high: "Raideur et instabilité." } },
            { name: "Séquelles de fracture-luxation de Galeazzi (Main Dominante)", rate: [10, 25], rateCriteria: { low: "Consolidation sans limitation majeure.", high: "Limitation prono-supination, instabilité radio-cubitale." } },
            { name: "Séquelles de fracture-luxation de Galeazzi (Main Non Dominante)", rate: [8, 20], rateCriteria: { low: "Consolidation sans limitation majeure.", high: "Limitation et instabilité." } },
            { name: "Synostose radio-cubitale post-traumatique (Main Dominante)", rate: [15, 25], description: "Fusion osseuse anormale entre le radius et le cubitus, bloquant la prono-supination.", rateCriteria: { low: "Blocage en position neutre ou de fonction.", high: "Blocage en pronation complète." } },
            { name: "Synostose radio-cubitale post-traumatique (Main Non Dominante)", rate: [12, 20], rateCriteria: { low: "Blocage en position neutre.", high: "Blocage en pronation complète." } },
        ]
      },
      {
        name: "Poignet - Désarticulation",
        injuries: [
          { name: "Désarticulation du poignet (Main Dominante)", rate: [65, 70] },
          { name: "Désarticulation du poignet (Main Non Dominante)", rate: [55, 60] },
        ]
      },
      {
        name: "Poignet - Fractures",
        injuries: [
            { name: "Fracture de l'extrémité inférieure du radius - Consolidation parfaite (Main Dominante)", rate: [3, 5] },
            { name: "Fracture de l'extrémité inférieure du radius - Consolidation parfaite (Main Non Dominante)", rate: [2, 4] },
            { name: "Fracture de l'extrémité inférieure du radius - Avec limitation des mouvements (Main Dominante)", rate: [8, 15] },
            { name: "Fracture de l'extrémité inférieure du radius - Avec limitation des mouvements (Main Non Dominante)", rate: [6, 12] },
            { name: "Fracture de l'extrémité inférieure du radius - Avec raideur, déformation et troubles nerveux (Main Dominante)", rate: [15, 30] },
            { name: "Fracture de l'extrémité inférieure du radius - Avec raideur, déformation et troubles nerveux (Main Non Dominante)", rate: [12, 25] },
            { name: "Fracture de l'extrémité inférieure du radius - Avec cal vicieux", rate: [10, 18] },
            { name: "Fracture du scaphoïde carpien - Avec raideur simple (Main Dominante)", rate: [5, 10] },
            { name: "Fracture du scaphoïde carpien - Avec raideur simple (Main Non Dominante)", rate: [4, 8] },
            { name: "Pseudarthrose du scaphoïde", rate: 22, description: "Pseudarthrose du scaphoïde carpien sans précision de dominance." },
            { name: "Pseudarthrose du scaphoïde carpien (Main Dominante)", rate: [10, 20], rateCriteria: { low: "Serrée, peu douloureuse.", high: "Lâche, douloureuse, arthrose radio-carpienne." } },
            { name: "Pseudarthrose du scaphoïde carpien (Main Non Dominante)", rate: [8, 15], rateCriteria: { low: "Serrée.", high: "Lâche et douloureuse." } },
        ]
      },
      {
        name: "Poignet - Raideurs et Ankyloses",
        injuries: [
            { name: "Raideur du poignet - Flexion/extension limitée", rate: [8, 15], description: "Limitation bipolaire dorsiflexion/palmarflexion modérée (40-50°)." },
            { name: "Raideur du poignet - Mobilité réduite", rate: [10, 18], description: "Dorsiflexion réduite (30-40°) avec limitation des inclinaisons radiale/cubitale." },
            { name: "Raideur poignet + déficit force", rate: [12, 20], description: "Raideur articulaire avec diminution significative de la force de prise." },
            { name: "Raideur du poignet - Limitation sévère", rate: [12, 22], description: "Dorsiflexion < 30° et palmarflexion < 40°, quasi-ankylose." },
            { name: "Raideur poignet avec douleur", rate: [6, 15], description: "Raideur post-traumatique avec douleurs chroniques résiduelles." },
            { name: "Raideur poignet - Inclinaisons limitées", rate: [8, 16], description: "Flexion-extension préservées mais inclinaisons radiale/cubitale très réduites." },
            { name: "Raideur poignet main dominante", rate: [10, 18], description: "Raideur du poignet de la main dominante avec retentissement fonctionnel." },
            { name: "Ankylose du poignet - Rectiligne (Main Dominante)", rate: [25, 30] },
            { name: "Ankylose du poignet - Rectiligne (Main Non Dominante)", rate: [20, 25] },
            { name: "Ankylose du poignet - En flexion ou extension (Main Dominante)", rate: [30, 40] },
            { name: "Ankylose du poignet - En flexion ou extension (Main Non Dominante)", rate: [25, 35] },
            { name: "Raideur du poignet (Main Dominante)", rate: [5, 15], rateCriteria: { low: "Limitation de 25% des mobilités.", medium: "Limitation de 50%.", high: "Quasi-ankylose." } },
            { name: "Raideur du poignet (Main Non Dominante)", rate: [4, 12], rateCriteria: { low: "Limitation de 25%.", medium: "Limitation de 50%.", high: "Quasi-ankylose." } },
            { name: "Raideur importante du poignet", rate: [15, 25], description: "Raideur sévère avec limitation > 75% des mobilités." },
        ]
      },
      {
        name: "Main - Amputations",
        injuries: [
            { name: "Amputation de la main (Main Dominante)", rate: [60, 65] },
            { name: "Amputation de la main (Main Non Dominante)", rate: [50, 55] },
            { name: "Amputation de tous les doigts de la main (Main Dominante)", rate: [55, 60] },
            { name: "Amputation de tous les doigts de la main (Main Non Dominante)", rate: [45, 50] },
            { name: "Perte des cinq métacarpiens (Main Dominante)", rate: [50, 55] },
            { name: "Perte des cinq métacarpiens (Main Non Dominante)", rate: [40, 45] },
            { name: "Perte d'un seul métacarpien (selon le doigt)", rate: [3, 12] },
        ]
      },
      {
        name: "Main - Raideurs et Ankyloses",
        injuries: [
            { name: "Ankylose de tous les doigts de la main (Main Dominante)", rate: [50, 55] },
            { name: "Ankylose de tous les doigts de la main (Main Non Dominante)", rate: [40, 45] },
            { name: "Main bote, creuse, etc. (Main Dominante)", rate: [40, 50] },
            { name: "Main bote, creuse, etc. (Main Non Dominante)", rate: [30, 40] },
            { name: "Cicatrices vicieuses de la paume (Main Dominante)", rate: [5, 40], rateCriteria: { low: "Bride limitant l'extension d'un doigt.", high: "Main en griffe, rétraction de tous les doigts." } },
            { name: "Cicatrices vicieuses de la paume (Main Non Dominante)", rate: [4, 35], rateCriteria: { low: "Bride limitant l'extension d'un doigt.", high: "Main en griffe." } },
            { name: "Séquelles de fracture de métacarpien (cal vicieux, raideur) (Main Dominante)", rate: [3, 10] },
            { name: "Séquelles de fracture de métacarpien (cal vicieux, raideur) (Main Non Dominante)", rate: [2, 8] },
        ]
      },
      {
        name: "Doigts - Lésions Tendineuses",
        injuries: [
            { name: "Section des tendons fléchisseurs doigt long", rate: [8, 12] },
            { name: "Section des tendons extenseurs d'un doigt long", rate: [6, 10] },
        ]
      },
      {
        name: "Doigts - Pouce (Main Dominante)",
        injuries: [
            { name: "Amputation du pouce (main dominante)", rate: 20 },
            { name: "Amputation du pouce - Désarticulation métacarpo-phalangienne", rate: 20 },  // Ajout pour correspondance exacte
            { name: "Perte du pouce (2 phalanges) (Main Dominante)", rate: 25 },
            { name: "Perte de la 2ème phalange du pouce (Main Dominante)", rate: 10 },
            { name: "Ankylose carpo-métacarpienne du pouce (Main Dominante)", rate: [15, 20] },
            { name: "Ankylose métacarpo-phalangienne du pouce (Main Dominante)", rate: 10 },
            { name: "Ankylose inter-phalangienne du pouce (Main Dominante)", rate: 5 },
            { name: "Raideur d'une articulation du pouce (Main Dominante)", rate: [3, 8] },
        ]
      },
      {
        name: "Doigts - Pouce (Main Non Dominante)",
        injuries: [
            { name: "Perte du pouce (2 phalanges) (Main Non Dominante)", rate: 20 },
            { name: "Perte de la 2ème phalange du pouce (Main Non Dominante)", rate: 8 },
            { name: "Ankylose carpo-métacarpienne du pouce (Main Non Dominante)", rate: [12, 15] },
            { name: "Ankylose métacarpo-phalangienne du pouce (Main Non Dominante)", rate: 8 },
            { name: "Ankylose inter-phalangienne du pouce (Main Non Dominante)", rate: 4 },
            { name: "Raideur d'une articulation du pouce (Main Non Dominante)", rate: [2, 6] },
        ]
      },
      {
        name: "Doigts - Index (Main Dominante)",
        injuries: [
            { name: "Amputation de l'index (main dominante)", rate: 10 },
            { name: "Amputation de l'index - Désarticulation métacarpo-phalangienne", rate: 10 },  // Ajout pour correspondance exacte
            { name: "Perte de l'index (3 phalanges) (Main Dominante)", rate: 15 },
            { name: "Perte de la 3ème phalange de l'index (Main Dominante)", rate: 5 },
            { name: "Perte des 2ème et 3ème phalanges de l'index (Main Dominante)", rate: 10 },
            { name: "Ankylose de l'index (totalité) (Main Dominante)", rate: 15 },
            { name: "Raideur d'une articulation de l'index (Main Dominante)", rate: [2, 5] },
        ]
      },
      {
        name: "Doigts - Index (Main Non Dominante)",
        injuries: [
            { name: "Perte de l'index (3 phalanges) (Main Non Dominante)", rate: 12 },
            { name: "Perte de la 3ème phalange de l'index (Main Non Dominante)", rate: 4 },
            { name: "Perte des 2ème et 3ème phalanges de l'index (Main Non Dominante)", rate: 8 },
            { name: "Ankylose de l'index (totalité) (Main Non Dominante)", rate: 12 },
            { name: "Raideur d'une articulation de l'index (Main Non Dominante)", rate: [1, 4] },
        ]
      },
      {
        name: "Doigts - Médius (Main Dominante)",
        injuries: [
            { name: "Perte du médius (3 phalanges) (Main Dominante)", rate: 12 },
            { name: "Perte de la 3ème phalange du médius (Main Dominante)", rate: 4 },
            { name: "Perte des 2ème et 3ème phalanges du médius (Main Dominante)", rate: 8 },
            { name: "Ankylose du médius (totalité) (Main Dominante)", rate: 12 },
            { name: "Raideur d'une articulation du médius (Main Dominante)", rate: [1, 4] },
        ]
      },
      {
        name: "Doigts - Médius (Main Non Dominante)",
        injuries: [
            { name: "Perte du médius (3 phalanges) (Main Non Dominante)", rate: 10 },
            { name: "Perte de la 3ème phalange du médius (Main Non Dominante)", rate: 3 },
            { name: "Perte des 2ème et 3ème phalanges du médius (Main Non Dominante)", rate: 6 },
            { name: "Ankylose du médius (totalité) (Main Non Dominante)", rate: 10 },
            { name: "Raideur d'une articulation du médius (Main Non Dominante)", rate: [1, 3] },
        ]
      },
      {
        name: "Doigts - Annulaire (Main Dominante)",
        injuries: [
            { name: "Perte de l'annulaire (3 phalanges) (Main Dominante)", rate: 8 },
            { name: "Perte de la 3ème phalange de l'annulaire (Main Dominante)", rate: 3 },
            { name: "Perte des 2ème et 3ème phalanges de l'annulaire (Main Dominante)", rate: 6 },
            { name: "Ankylose de l'annulaire (totalité) (Main Dominante)", rate: 8 },
            { name: "Raideur d'une articulation de l'annulaire (Main Dominante)", rate: [1, 3] },
        ]
      },
      {
        name: "Doigts - Annulaire (Main Non Dominante)",
        injuries: [
            { name: "Perte de l'annulaire (3 phalanges) (Main Non Dominante)", rate: 6 },
            { name: "Perte de la 3ème phalange de l'annulaire (Main Non Dominante)", rate: 2 },
            { name: "Perte des 2ème et 3ème phalanges de l'annulaire (Main Non Dominante)", rate: 4 },
            { name: "Ankylose de l'annulaire (totalité) (Main Non Dominante)", rate: 6 },
            { name: "Raideur d'une articulation de l'annulaire (Main Non Dominante)", rate: [1, 2] },
        ]
      },
      {
        name: "Doigts - Auriculaire (Main Dominante)",
        injuries: [
            { name: "Perte de l'auriculaire (3 phalanges) (Main Dominante)", rate: 10 },
            { name: "Perte de la 3ème phalange de l'auriculaire (Main Dominante)", rate: 4 },
            { name: "Perte des 2ème et 3ème phalanges de l'auriculaire (Main Dominante)", rate: 7 },
            { name: "Ankylose de l'auriculaire (totalité) (Main Dominante)", rate: 10 },
            { name: "Raideur d'une articulation de l'auriculaire (Main Dominante)", rate: [1, 3] },
        ]
      },
      {
        name: "Doigts - Auriculaire (Main Non Dominante)",
        injuries: [
            { name: "Perte de l'auriculaire (3 phalanges) (Main Non Dominante)", rate: 8 },
            { name: "Perte de la 3ème phalange de l'auriculaire (Main Non Dominante)", rate: 3 },
            { name: "Perte des 2ème et 3ème phalanges de l'auriculaire (Main Non Dominante)", rate: 5 },
            { name: "Ankylose de l'auriculaire (totalité) (Main Non Dominante)", rate: 8 },
            { name: "Raideur d'une articulation de l'auriculaire (Main Non Dominante)", rate: [1, 2] },
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
            { name: "Amputation d'un membre inférieur", rate: [70, 80], rateCriteria: { low: "Amputation sous le genou avec moignon long et bien appareillable.", high: "Désarticulation de la hanche ou amputation de cuisse avec moignon très court." } },
            { name: "Amputation des deux membres inférieurs", rate: 100 },
        ]
      },
      {
        name: "Hanche - Fractures",
        injuries: [
            { name: "Fracture du col du fémur - Bonne consolidation", rate: [5, 15], rateCriteria: { low: "Consolidation anatomique, mobilité conservée, limitation minime.", high: "Légère raideur, gêne activités extrêmes (accroupissement)." } },
            { name: "Fracture du col du fémur - Consolidation avec raideur modérée", rate: [15, 30], rateCriteria: { low: "Raideur modérée, mobilité fonctionnelle conservée.", high: "Raideur marquée sans raccourcissement significatif." } },
            { name: "Fracture du col du fémur - Consolidation avec raccourcissement et raideur", rate: [30, 60], rateCriteria: { low: "Raccourcissement <3cm + raideur modérée.", high: "Raccourcissement >3cm + raideur importante + boiterie." } },
            { name: "Pseudarthrose du col du fémur", rate: [60, 80], rateCriteria: { low: "Pseudarthrose stable avec mobilité conservée, douleurs modérées.", high: "Pseudarthrose instable avec raccourcissement >3cm, douleurs permanentes, impotence fonctionnelle majeure nécessitant canne." } },
            { name: "Fracture du massif trochantérien - Bonne consolidation", rate: [5, 10], rateCriteria: { low: "Consolidation anatomique sans séquelle, gêne minime.", high: "Consolidation avec légère raideur et douleurs mécaniques." } },
            { name: "Fracture du massif trochantérien - Cal vicieux et raideur", rate: [20, 40], rateCriteria: { low: "Cal vicieux avec raideur modérée de hanche, boiterie discrète.", medium: "Cal vicieux important avec limitation flexion/abduction 50%, douleurs fréquentes.", high: "Cal vicieux majeur avec raccourcissement >2cm, quasi-ankylose, boiterie permanente nécessitant canne." } },
        ]
      },
      {
        name: "Hanche - Raideurs et Ankyloses",
        injuries: [
            { name: "Ankylose complète de la hanche", rate: [50, 70], rateCriteria: { low: "Ankylose en position de fonction (flexion 20°, abduction/rotation neutre).", high: "Ankylose en mauvaise position (adduction, rotation externe)." } },
            { name: "Raideur de la hanche", rate: [10, 40], rateCriteria: { low: "Limitation des amplitudes extrêmes.", high: "Quasi-ankylose avec boiterie importante." } },
            { name: "Prothèse totale de hanche", rate: 28 },  // Entrée générique pour PTH
            { name: "Séquelles de prothèse totale de hanche", rate: [15, 40], rateCriteria: { low: "Prothèse bien intégrée, indolore, mobilité fonctionnelle.", high: "Douleurs, boiterie, descellement, luxations récidivantes." } },
            { name: "Arthrose post-traumatique de la hanche", rate: 25 },  // Entrée générique pour coxarthrose sévère
            { name: "Coxarthrose post-traumatique (arthrose de hanche)", rate: [15, 45], rateCriteria: { low: "Pincement articulaire modéré, douleurs mécaniques.", high: "Arthrose sévère avec destruction interligne, pincement complet." } },
            { name: "Coxarthrie post-traumatique", rate: [15, 40], rateCriteria: { low: "Pincement articulaire modéré, douleurs mécaniques.", high: "Arthrose sévère avec destruction de l'interligne et ankylose." } },
        ]
      },
      {
        name: "Cuisse - Fractures",
        injuries: [
            { name: "Fracture diaphysaire du fémur", rate: [10, 30], description: "Séquelles d'une fracture de la diaphyse fémorale.", rateCriteria: { low: "Consolidation sans séquelle majeure, gêne discrète.", medium: "Cal vicieux avec raccourcissement < 2cm et/ou raideur modérée du genou/hanche.", high: "Cal vicieux important avec boiterie, raideur et/ou troubles neurologiques." } },
            { name: "Fracture de la diaphyse fémorale - Avec cal vicieux", description: "Cal vicieux modéré avec raccourcissement 2-3cm et boiterie.", rate: 22 },
            { name: "Fracture de l'extrémité inférieure du fémur - Avec raideur du genou", rate: [15, 30], rateCriteria: { low: "Raideur légère genou (flexion >100°), douleurs mécaniques.", medium: "Raideur modérée (flexion 60-100°), douleurs fréquentes.", high: "Raideur sévère (flexion <60°), cal vicieux articulaire, arthrose débutante." } },
            { name: "Pseudarthrose du fémur", rate: [60, 80], rateCriteria: { low: "Pseudarthrose stable du tiers moyen, mobilité conservée hanche/genou, douleurs modérées.", high: "Pseudarthrose instable avec raccourcissement majeur >5cm, quasi-impotence fonctionnelle, nécessité 2 cannes ou fauteuil." } },
        ]
      },
       {
        name: "Genou - Lésions Osseuses et Articulaires",
        injuries: [
            { name: "Fracture de la rotule - Avec gêne fonctionnelle", rate: [5, 15], rateCriteria: { low: "Fracture consolidée, gêne à la flexion complète (accroupissement), douleurs mécaniques.", medium: "Cal vicieux avec craquements, limitation flexion à 90°, douleurs fréquentes.", high: "Patellectomie ou pseudarthrose, perte d'extension active, faiblesse quadriceps majeure." } },
            { name: "Fracture des plateaux tibiaux - Avec déviation et/ou raideur", rate: [10, 30], rateCriteria: { low: "Déviation axiale minime (<5°), raideur légère (flexion >120°), douleurs mécaniques modérées.", medium: "Déviation modérée (5-10°), raideur moyenne (flexion 90-120°), douleurs fréquentes.", high: "Déviation importante (>10° valgus/varus), raideur sévère (flexion <90°), instabilité, douleurs permanentes." } },
            { name: "Fracture des condyles fémoraux - Avec déviation et/ou raideur", rate: [10, 30], rateCriteria: { low: "Déviation minime, raideur légère (flexion >120°), douleurs mécaniques modérées.", medium: "Déviation modérée, raideur moyenne (flexion 90-120°), douleurs fréquentes.", high: "Déviation importante, raideur sévère (flexion <90°), instabilité, douleurs permanentes." } },
            { name: "Hydarthrose chronique du genou", rate: [5, 15], rateCriteria: { low: "Épanchements rares (1-2/an), drainage ponctuel.", medium: "Épanchements récidivants (mensulres), gonflement permanent modéré.", high: "Hydarthrose permanente volumineuse, ponctions fréquentes, limitation mobilité, synovectomie envisagée." } },
            { name: "Arthrose fémoro-patellaire ou fémoro-tibiale post-traumatique", rate: [10, 30], rateCriteria: { low: "Douleurs mécaniques, pincement radiologique modéré.", high: "Arthrose sévère avec déviation axiale et raideur." } },
            { name: "Séquelles de prothèse totale de genou", rate: [15, 40], rateCriteria: { low: "Prothèse indolore, mobilité > 90°, marche sans aide.", high: "Douleurs, instabilité, raideur, nécessité de cannes." } },
        ]
      },
      {
        name: "Genou - Lésions Ligamentaires et Méniscales",
        injuries: [
            { name: "Laxité chronique du genou (séquelle d'entorse)", rate: [5, 20], rateCriteria: { low: "Laxité modérée sans instabilité fonctionnelle.", high: "Instabilité majeure avec dérobements fréquents." } },
            { name: "Séquelles de rupture du ligament croisé antérieur (LCA)", rate: [10, 25], rateCriteria: { low: "Laxité modérée, sans dérobements, activités quotidiennes normales, sports sans pivot/contact.", medium: "Laxité importante avec dérobements occasionnels, nécessité attelle pour activités.", high: "Laxité sévère avec dérobements fréquents (escaliers, marche irrégulière), arthrose débutante, activités limitées." } },
            { name: "Séquelles de rupture du ligament croisé postérieur (LCP)", rate: [10, 25], rateCriteria: { low: "Laxité modérée, gêne en descente escaliers/pentes.", medium: "Laxité importante avec faiblesse quadriceps, douleurs antérieures.", high: "Laxité sévère avec instabilité postérieure majeure, arthrose fémoro-tibiale, limitation périmètre marche." } },
            { name: "Méniscectomie totale", rate: 13, description: "Ablation complète d'un ménisque (interne ou externe) avec séquelles fonctionnelles." },
            { name: "Séquelles de méniscectomie (douleurs, hydarthrose)", rate: [5, 15], rateCriteria: { low: "Méniscectomie partielle, gêne minime, pas d'épanchement.", medium: "Méniscectomie totale avec hydarthrose récidivante, douleurs mécaniques.", high: "Complications post-méniscectomie : arthrose précoce, chondropathie fémoro-tibiale, douleurs permanentes." } },
        ]
      },
      {
        name: "Genou - Raideurs et Ankyloses",
        injuries: [
            { name: "Ankylose du genou", rate: [30, 50], rateCriteria: { low: "Ankylose en extension complète ou légère flexion.", high: "Ankylose en flexion > 30°." } },
            { name: "Raideur du genou", rate: [5, 25], rateCriteria: { low: "Flexion limitée à 90°.", high: "Flexion < 45° et/ou flessum important." } },
        ]
      },
      {
        name: "Jambe - Fractures",
        injuries: [
            { name: "Fracture des deux os de la jambe - Bonne consolidation", rate: [5, 10], rateCriteria: { low: "Consolidation anatomique sans cal vicieux, gêne minime.", medium: "Légère atrophie mollet, douleurs mécaniques occasionnelles.", high: "Consolidation avec cal palpable, raideur cheville modérée, douleurs à la marche prolongée." } },
            { name: "Fracture des deux os de la jambe - Avec cal vicieux et troubles trophiques", rate: [15, 40], rateCriteria: { low: "Cal vicieux angulaire <10°, troubles trophiques modérés (œdème discret).", medium: "Cal vicieux 10-20°, troubles trophiques nets (œdème chronique, peau fragile), boiterie.", high: "Cal vicieux >20° avec déviation majeure, troubles trophiques sévères (ulcères récidivants, varices), raideur cheville, périmètre marche limité <500m." } },
            { name: "Fracture isolée du tibia", rate: [5, 20], rateCriteria: { low: "Fracture consolidée sans séquelle, gêne minime.", medium: "Cal vicieux tibia, douleurs mécaniques, léger œdème.", high: "Cal vicieux angulaire tibia, raideur cheville, troubles trophiques, boiterie." } },
            { name: "Fracture isolée du péroné", rate: [2, 5], rateCriteria: { low: "Consolidation sans séquelle, gêne discrète.", high: "Cal vicieux péroné avec conflit tibiofibulaire, douleurs latérales cheville." } },
            { name: "Pseudarthrose des deux os de la jambe", rate: [40, 60], rateCriteria: { low: "Pseudarthrose stable avec appareillage orthopédique efficace, marche possible >1km.", high: "Pseudarthrose instable, membre quasi-inutilisable, nécessité fauteuil roulant ou amputation envisagée." } },
            { name: "Pseudarthrose du tibia", rate: [30, 50], rateCriteria: { low: "Pseudarthrose stable du tiers moyen tibia, appareillage, marche limitée mais autonome.", high: "Pseudarthrose instable avec cal fibulaire hypertrophique, douleurs permanentes, impotence fonctionnelle majeure." } },
            { name: "Pseudarthrose de la diaphyse tibiale", description: "Pseudarthrose du tiers moyen de la diaphyse tibiale avec mobilité anormale et impotence fonctionnelle majeure nécessitant appareillage permanent.", rate: 70 },
            { name: "Syndrome des loges chronique d'effort de la jambe", rate: [10, 25], description: "Douleurs musculaires à l'effort par augmentation de pression dans les loges musculaires.", rateCriteria: { low: "Douleurs apparaissant à l'effort intense, calmées par le repos.", high: "Douleurs invalidantes pour des efforts modérés, avec signes neurologiques." } },
        ]
      },
      {
        name: "Cheville (Cou-de-pied) - Fractures",
        injuries: [
            { name: "Fracture malléolaire ou bi-malléolaire - Bonne consolidation", rate: [3, 8], rateCriteria: { low: "Consolidation anatomique sans séquelle, gêne minime (fatigue cheville prolongée).", medium: "Légère raideur cheville, douleurs mécaniques occasionnelles.", high: "Consolidation avec raideur modérée (déficit 25% amplitudes), douleurs fréquentes, œdème discret." } },
            { name: "Fracture malléolaire ou bi-malléolaire - Avec raideur modérée", rate: [10, 20], rateCriteria: { low: "Cal vicieux léger, raideur limitant les activités sportives.", high: "Raideur marquée avec douleurs chroniques à la marche." } },
            { 
              name: "Fracture bi-malléolaire - Avec cal vicieux important, déformation et troubles trophiques", 
              rate: [20, 35], 
              rateCriteria: { 
                  low: "Cal vicieux avec raideur douloureuse limitant la marche.", 
                  high: "Déformation majeure, instabilité, troubles trophiques sévères et boiterie importante nécessitant une aide à la marche (canne)." 
              } 
            },
            { name: "Fracture du pilon tibial", rate: [15, 40], rateCriteria: { low: "Fracture articulaire consolidée avec raideur modérée cheville, douleurs mécaniques.", medium: "Raideur importante (flexion-extension <30°), arthrose débutante, boiterie, périmètre marche limité.", high: "Quasi-ankylose cheville, arthrose sévère, douleurs permanentes, troubles trophiques, nécessité canne permanente." } },
        ]
      },
      {
        name: "Cheville (Cou-de-pied) - Raideurs et Ankyloses",
        injuries: [
            { name: "Ankylose de la cheville", rate: [20, 30], rateCriteria: { low: "Position à angle droit.", high: "En équin ou talus." } },
            { name: "Raideur de la cheville", rate: [5, 15], rateCriteria: { low: "Limitation modérée de la flexion-extension.", high: "Quasi-ankylose." } },
            { name: "Instabilité chronique de la cheville (séquelle d'entorse)", rate: [5, 15], rateCriteria: { low: "Entorses rares.", high: "Entorses à répétition, arthrose." } },
        ]
      },
      {
        name: "Pied - Fractures",
        injuries: [
            { name: "Fracture de l'astragale (Talus) - Avec cal vicieux", rate: [10, 25], rateCriteria: { low: "Cal vicieux minime, raideur sous-astragalienne modérée, douleurs mécaniques.", medium: "Cal vicieux important, raideur sévère arrière-pied, boiterie.", high: "Pseudarthrose ou nécrose astragale, arthrose tibio-tarsienne et sous-astragalienne, douleurs permanentes, marche très limitée." } },
            { name: "Fracture du calcanéum - Avec douleurs et boiterie", rate: [10, 30], rateCriteria: { low: "Fracture extra-articulaire consolidée, douleurs mécaniques à la marche prolongée, boiterie discrète.", medium: "Fracture thalamique avec enfoncement thalamus, raideur sous-astragalienne, boiterie nette, douleurs fréquentes.", high: "Cal vicieux calcanéum avec élargissement majeur, arthrose sous-astragalienne sévère, douleurs permanentes, marche <500m, nécessité canne." } },
            { name: "Fracture des métatarsiens - Avec douleurs à la marche", rate: [3, 10], rateCriteria: { low: "Fracture 1 métatarsien consolidée, douleurs mécaniques légères, port chaussures normal.", medium: "Fractures multiples métatarsiens avec cal vicieux, métatarsalgies d'appui, nécessité semelles orthopédiques.", high: "Cals vicieux multiples avec avant-pied élargi/déformé, troubles statiques sévères, douleurs permanentes, chaussage orthopédique obligatoire." } },
        ]
      },
      {
        name: "Pied - Raideurs et Ankyloses",
        injuries: [
            { name: "Ankylose d'une articulation du tarse", rate: [10, 20], rateCriteria: { low: "Ankylose sous-astragalienne, adaptation possible, boiterie discrète.", medium: "Ankylose médio-tarsienne avec raideur globale arrière-pied.", high: "Ankyloses multiples tarse, pied rigide, troubles statiques, boiterie majeure." } },
            { name: "Pied plat ou pied creux post-traumatique", rate: [5, 20], rateCriteria: { low: "Déformation modérée, douleurs mécaniques, correction semelles efficace.", medium: "Déformation importante, métatarsalgies/talalgies fréquentes, chaussage orthopédique.", high: "Déformation sévère irréductible, troubles statiques majeurs, douleurs permanentes, périmètre marche très limité." } },
        ]
      },
      {
        name: "Orteils - Lésions",
        injuries: [
            { name: "Amputation du gros orteil", rate: [5, 8], rateCriteria: { low: "Amputation distale (phalange distale), troubles propulsion minimes.", high: "Amputation complète gros orteil, troubles appui/propulsion nets, boiterie." } },
            { name: "Amputation d'un autre orteil", rate: [1, 3], rateCriteria: { low: "Amputation orteil latéral (4ème/5ème), gêne esthétique surtout.", high: "Amputation 2ème orteil, troubles appui modérés." } },
            { name: "Ankylose ou raideur du gros orteil (Hallux rigidus)", rate: [3, 10], rateCriteria: { low: "Raideur partielle IP, limitation légère déroulement pas.", medium: "Ankylose MP en position neutre, déroulement pas perturbé.", high: "Ankylose MP en flexion/extension pathologique, douleurs permanentes, troubles marche, nécessité chaussage orthopédique." } },
        ]
      },
      {
        name: "Membre Inférieur - Lésions Diverses",
        injuries: [
            { name: "Raccourcissement d'un membre inférieur", rate: [5, 25], rateCriteria: { low: "Raccourcissement de 1 à 2 cm.", high: "Raccourcissement > 4 cm." } },
            { name: "Troubles trophiques, œdème chronique, varices", rate: [5, 20] },
            { name: "Boiterie (sans raccourcissement)", rate: [5, 15] },
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
            rate: [5, 15], 
            description: "Syndrome douloureux post-traumatique avec troubles vasomoteurs et trophiques, sans lésion nerveuse objectivée. Anciennement appelé 'algoneurodystrophie' ou 'syndrome épaule-main'.",
            rateCriteria: { 
              low: "Phase aiguë bien traitée, séquelles minimes (raideur légère, douleurs occasionnelles), récupération fonctionnelle > 80%.", 
              medium: "Séquelles modérées avec raideur articulaire partielle, douleurs mécaniques résiduelles, limitation fonctionnelle de 30-50%.",
              high: "Forme sévère chronique avec raideur majeure, amyotrophie, troubles trophiques cutanés (peau fine, luisante), douleurs neuropathiques persistantes."
            } 
          },
          { 
            name: "Algodystrophie (SDRC de type I) - Forme majeure séquellaire du membre supérieur", 
            rate: [20, 50], 
            description: "Forme sévère d'algodystrophie avec séquelles importantes au niveau du membre supérieur.",
            rateCriteria: { 
              low: "Raideur marquée d'une articulation (épaule, poignet ou main), douleurs chroniques modérées, retentissement fonctionnel de 50-70%.", 
              medium: "Atteinte de plusieurs articulations avec raideur sévère, main dystonique ou en griffe, douleurs neuropathiques quotidiennes, nécessitant un traitement antalgique puissant.",
              high: "Forme pseudo-paralytique avec main figée, troubles trophiques majeurs (ostéoporose sévère, atrophie cutanée), douleurs rebelles avec allodynie, membre inutilisable."
            } 
          },
          { 
            name: "Algodystrophie (SDRC de type I) - Forme majeure séquellaire du membre inférieur", 
            rate: [15, 40], 
            description: "Forme sévère d'algodystrophie avec séquelles importantes au niveau du membre inférieur.",
            rateCriteria: { 
              low: "Raideur du pied ou de la cheville, douleurs à la marche prolongée, périmètre de marche > 500m.", 
              medium: "Raideur de cheville et pied avec troubles trophiques, marche avec boiterie importante, périmètre limité à 200-500m.",
              high: "Pied figé en équin ou en varus, troubles trophiques sévères, douleurs neuropathiques invalidantes, appui impossible sans aide (canne, attelle)."
            } 
          },
          { 
            name: "Causalgie (SDRC de type II) - Lésion nerveuse documentée", 
            rate: [30, 70], 
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
            rate: [10, 20], 
            description: "Dyspnée d'effort importante (stade II NYHA), limitation des activités physiques. EFR : VEMS entre 60-80% de la théorique.",
            rateCriteria: { 
              low: "VEMS 70-80%, dyspnée pour des efforts importants uniquement, pas de désaturation à l'effort.", 
              high: "VEMS 60-70%, dyspnée pour des efforts modérés, désaturation modérée à l'effort (SpO2 > 88%)."
            } 
          },
          { 
            name: "Insuffisance respiratoire chronique - Stade II (modérée)", 
            rate: [30, 50], 
            description: "Dyspnée au moindre effort (stade III NYHA), limitation majeure des activités quotidiennes. EFR : VEMS entre 40-60%.",
            rateCriteria: { 
              low: "VEMS 50-60%, dyspnée à la marche en terrain plat, activités quotidiennes possibles avec pauses fréquentes.", 
              high: "VEMS 40-50%, dyspnée au repos, désaturation au moindre effort, nécessité d'oxygénothérapie de déambulation."
            } 
          },
          { 
            name: "Insuffisance respiratoire chronique - Stade III (sévère)", 
            rate: [60, 80], 
            description: "Dyspnée de repos (stade IV NYHA), dépendance à l'oxygénothérapie de longue durée. EFR : VEMS < 40%.",
            rateCriteria: { 
              low: "VEMS 30-40%, dyspnée de repos, OLD (Oxygénothérapie de Longue Durée) > 15h/jour, autonomie conservée pour les gestes simples.", 
              high: "VEMS < 30%, dyspnée majeure, OLD permanente, rétention de CO2 (hypercapnie), confinement au domicile, dépendance pour les actes de la vie quotidienne."
            } 
          },
          { 
            name: "Insuffisance respiratoire chronique - Stade IV (très sévère avec décompensation)", 
            rate: [90, 100], 
            description: "Insuffisance respiratoire terminale avec décompensations fréquentes, confinement au lit ou au fauteuil, dépendance totale.",
            rateCriteria: { 
              low: "Hospitalisations fréquentes pour décompensations, ventilation non invasive (VNI) nocturne.", 
              high: "Confinement permanent, VNI continue ou trachéotomie, dépendance totale."
            } 
          },
          { 
            name: "Bronchopneumopathie Chronique Obstructive (BPCO) post-traumatique", 
            rate: [20, 60], 
            description: "BPCO apparue ou aggravée de manière significative après un traumatisme thoracique grave, une inhalation toxique ou une infection pulmonaire sévère.",
            rateCriteria: { 
              low: "BPCO stade GOLD 2 (VEMS 50-80%), dyspnée d'effort, exacerbations rares (< 2/an).", 
              medium: "BPCO stade GOLD 3 (VEMS 30-50%), dyspnée au moindre effort, exacerbations fréquentes (≥ 2/an), OLD de déambulation.",
              high: "BPCO stade GOLD 4 (VEMS < 30%) avec insuffisance respiratoire chronique, OLD permanente, exacerbations fréquentes et sévères."
            } 
          },
          { 
            name: "Bronchectasies (dilatations des bronches) post-traumatiques ou post-infectieuses", 
            rate: [20, 50], 
            description: "Dilatations irréversibles des bronches avec infections broncho-pulmonaires à répétition, après un traumatisme thoracique, une pneumonie d'inhalation ou un corps étranger.",
            rateCriteria: { 
              low: "Bronchectasies localisées (1 lobe), infections rares (1-2/an), expectoration chronique modérée, VEMS > 60%.", 
              medium: "Bronchectasies étendues (plusieurs lobes), infections fréquentes (> 3/an), expectoration purulente quotidienne abondante, hémoptysies occasionnelles, VEMS 40-60%.",
              high: "Bronchectasies diffuses bilatérales, infections quasi-permanentes nécessitant une antibiothérapie prolongée, hémoptysies récidivantes, insuffisance respiratoire chronique (VEMS < 40%)."
            } 
          },
          { 
            name: "Séquelles de pneumothorax récidivant ou de bullectomie/pleurectomie", 
            rate: [10, 30], 
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
            rate: [10, 40], 
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
            rate: [10, 30], 
            description: "Séquelles de brûlures profondes (2e et 3e degré) couvrant 10 à 20% de la surface corporelle totale.",
            rateCriteria: { 
              low: "Cicatrices stables, souples, sans rétraction majeure ni trouble fonctionnel significatif, bon résultat esthétique.", 
              medium: "Cicatrices hypertrophiques ou rétractiles avec limitation fonctionnelle modérée (articulations), préjudice esthétique notable.",
              high: "Cicatrices chéloïdes étendues, rétractions majeures limitant les amplitudes articulaires, troubles trophiques (sécheresse, prurit intense), préjudice esthétique majeur."
            } 
          },
          { 
            name: "Brûlures cutanées étendues - 20 à 40% de la surface corporelle", 
            rate: [40, 60], 
            description: "Séquelles de brûlures profondes couvrant 20 à 40% de la surface corporelle.",
            rateCriteria: { 
              low: "Cicatrices avec rétractions multiples et limitations fonctionnelles articulaires modérées, greffes cutanées stables.", 
              medium: "Rétractions majeures avec limitation sévère de plusieurs articulations, troubles trophiques importants, nécessité de vêtements compressifs, greffes instables nécessitant des reprises.",
              high: "Séquelles invalidantes multiples avec raideurs articulaires sévères, troubles de la thermorégulation, douleurs neuropathiques chroniques, préjudice esthétique majeur avec retentissement psychologique."
            } 
          },
          { 
            name: "Brûlures cutanées étendues - 40 à 60% de la surface corporelle", 
            rate: [70, 90], 
            description: "Séquelles de brûlures profondes couvrant 40 à 60% de la surface corporelle.",
            rateCriteria: { 
              low: "Séquelles majeures avec multiples rétractions et raideurs articulaires, nécessité d'aides techniques ponctuelles.", 
              medium: "Limitations fonctionnelles sévères de plusieurs membres, dépendance partielle pour certains actes de la vie quotidienne, douleurs chroniques rebelles.",
              high: "Polyhandicap avec dépendance majeure, confinement au domicile, troubles psychologiques sévères (dépression, syndrome de stress post-traumatique)."
            } 
          },
          { 
            name: "Brûlures cutanées étendues - > 60% de la surface corporelle", 
            rate: [90, 100], 
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
            rate: [20, 50], 
            description: "Séquelles de brûlures du visage entraînant un préjudice esthétique majeur, des rétractions et/ou des troubles fonctionnels (ouverture buccale, occlusion palpébrale, etc.).",
            rateCriteria: { 
              low: "Cicatrices faciales visibles mais sans rétraction majeure, pas de trouble fonctionnel significatif (paupières, bouche).", 
              medium: "Cicatrices défigurantes avec rétraction modérée (ectropion léger, microstomie partielle), retentissement psychologique notable.",
              high: "Défiguration majeure avec séquelles fonctionnelles sévères (ectropion/entropion sévère, microstomie invalidante, sténose nasale), alopécie du cuir chevelu, retentissement psycho-social majeur."
            } 
          },
          { 
            name: "Brûlures des mains avec séquelles fonctionnelles (Main Dominante)", 
            rate: [20, 60], 
            description: "Séquelles de brûlures profondes de la main dominante avec rétractions cutanées, raideurs digitales et perte de fonction.",
            rateCriteria: { 
              low: "Cicatrices hypertrophiques palmaires ou dorsales avec raideur légère d'un ou deux doigts, perte fonctionnelle < 30%.", 
              medium: "Rétractions majeures avec raideur sévère de plusieurs doigts, main en griffe partielle, perte de la pince pouce-index, perte fonctionnelle 40-60%.",
              high: "Main figée en griffe totale ou perte de plusieurs doigts par nécrose, amputations, main quasi-inutilisable (perte fonctionnelle > 70%)."
            } 
          },
          { 
            name: "Brûlures des mains avec séquelles fonctionnelles (Main Non Dominante)", 
            rate: [15, 50], 
            description: "Séquelles de brûlures de la main non dominante.",
            rateCriteria: { 
              low: "Cicatrices avec raideur légère, perte fonctionnelle < 30%.", 
              medium: "Rétractions avec raideur sévère, perte fonctionnelle 40-60%.",
              high: "Main figée ou amputations multiples, perte fonctionnelle > 70%."
            } 
          },
          { 
            name: "Brûlures du périnée avec séquelles fonctionnelles et/ou esthétiques", 
            rate: [20, 50], 
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
            rate: [20, 100], 
            description: "Pneumoconiose par inhalation de poussières de silice cristalline (mines, carrières, fonderies, BTP). Indemnisable selon l'exposition professionnelle documentée.",
            rateCriteria: { 
              low: "Silicose simple (stade 1) avec images radiologiques isolées (nodules < 10mm), sans retentissement fonctionnel respiratoire (VEMS > 80%).", 
              medium: "Silicose compliquée (stade 2-3) avec fibrose pulmonaire progressive massive (FPM), dyspnée d'effort modérée (VEMS 50-80%), limitation des activités.",
              high: "Silicose compliquée avec insuffisance respiratoire chronique sévère (VEMS < 50%), dyspnée de repos, OLD, complications (tuberculose, néoplasie), confinement."
            } 
          },
          { 
            name: "Asbestose pulmonaire", 
            rate: [30, 100], 
            description: "Fibrose pulmonaire due à l'inhalation de fibres d'amiante. Maladie professionnelle indemnisable (tableau 30).",
            rateCriteria: { 
              low: "Asbestose mineure avec fibrose débutante (stades 0-1 OIT), plaques pleurales, dyspnée d'effort importante (VEMS 60-80%).", 
              medium: "Asbestose modérée (stade 2 OIT) avec fibrose interstitielle diffuse, dyspnée au moindre effort (VEMS 40-60%), OLD de déambulation.",
              high: "Asbestose sévère (stade 3-4 OIT) avec insuffisance respiratoire chronique terminale (VEMS < 40%), OLD permanente, confinement, espérance de vie réduite."
            } 
          },
          { 
            name: "Mésothéliome pleural malin lié à l'amiante", 
            rate: 100, 
            description: "Cancer de la plèvre causé par l'exposition à l'amiante. Maladie professionnelle indemnisable (tableau 30bis). Pronostic sombre avec espérance de vie limitée."
          },
        ]
      },
      {
        name: "Troubles Musculo-Squelettiques (TMS) Professionnels",
        injuries: [
          { 
            name: "Syndrome du canal carpien professionnel bilatéral", 
            rate: [10, 30], 
            description: "Compression bilatérale du nerf médian au poignet, liée à des gestes répétitifs professionnels (tableaux 57). Indemnisable si lien professionnel documenté.",
            rateCriteria: { 
              low: "Syndrome du canal carpien bilatéral opéré avec bonne récupération, paresthésies nocturnes résiduelles discrètes, reprise du travail possible.", 
              medium: "Séquelles sensitives bilatérales modérées avec hypoesthésie permanente des trois premiers doigts, gêne pour les gestes fins, limitation professionnelle.",
              high: "Syndrome du canal carpien bilatéral sévère avec amyotrophie thénarienne bilatérale, déficit moteur permanent, incapacité pour le travail manuel."
            } 
          },
          { 
            name: "Tendinopathie de la coiffe des rotateurs professionnelle", 
            rate: [10, 30], 
            description: "Tendinopathie de l'épaule (sus-épineux, sous-épineux) liée à des gestes professionnels répétitifs en élévation du bras. Indemnisable (tableau 57).",
            rateCriteria: { 
              low: "Tendinopathie chronique avec douleurs mécaniques à l'effort, limitation modérée de l'abduction (120-150°), traitement conservateur.", 
              medium: "Rupture partielle de la coiffe avec douleurs fréquentes, perte de force, limitation de l'abduction à 90°, échec du traitement conservateur.",
              high: "Rupture massive et irréparable de la coiffe des rotateurs avec épaule pseudo-paralytique, douleurs chroniques rebelles, incapacité pour le travail avec port de charges."
            } 
          },
          { 
            name: "Épicondylite latérale professionnelle", 
            rate: [5, 15], 
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
            rate: [5, 20], 
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
            rate: [30, 60], 
            description: "Diabète de type 1 survenu après un traumatisme pancréatique grave (pancréatectomie partielle ou totale, pancréatite nécrosante).",
            rateCriteria: { 
              low: "Diabète bien équilibré par insulinothérapie (HbA1c < 7%), sans complication micro ou macrovasculaire, autonomie conservée pour les injections et l'autosurveillance.", 
              medium: "Diabète avec équilibre fragile (HbA1c 7-9%), hypoglycémies fréquentes ou hyperglycémies récurrentes, début de complications microvasculaires (rétinopathie non proliférante, microalbuminurie).",
              high: "Diabète instable avec complications sévères (rétinopathie proliférante, néphropathie avec insuffisance rénale, neuropathie invalidante, artériopathie), hypoglycémies sévères fréquentes."
            } 
          },
          { 
            name: "Diabète post-traumatique - Type 2 (non insulinodépendant)", 
            rate: [10, 30], 
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
            rate: [10, 25], 
            description: "Insuffisance thyroïdienne apparue après un traumatisme cervical grave, une chirurgie thyroïdienne ou une radiothérapie cervicale.",
            rateCriteria: { 
              low: "Hypothyroïdie bien substituée par lévothyroxine, asymptomatique, TSH normalisée.", 
              medium: "Hypothyroïdie avec difficulté d'équilibration, symptômes résiduels (asthénie, frilosité, prise de poids) malgré le traitement.",
              high: "Hypothyroïdie sévère avec complications (myxœdème, insuffisance cardiaque), équilibre difficile, nécessité de doses élevées de substitution."
            } 
          },
          { 
            name: "Hyperthyroïdie post-traumatique (maladie de Basedow ou nodule toxique)", 
            rate: [15, 35], 
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
            rate: [40, 70], 
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
            rate: [20, 60], 
            description: "Infection chronique de l'os après une fracture ouverte, une intervention chirurgicale ou une contamination traumatique.",
            rateCriteria: { 
              low: "Ostéomyélite en rémission après traitement antibiotique prolongé et chirurgie d'assainissement, séquelles fonctionnelles modérées (raideur, douleurs occasionnelles).", 
              medium: "Ostéomyélite chronique récidivante avec épisodes de réactivation, nécessitant des antibiothérapies prolongées et/ou des reprises chirurgicales, fistules cutanées intermittentes.",
              high: "Ostéomyélite chronique rebelle avec fistules permanentes, ostéolyse extensive, nécessité d'une amputation ou d'une arthrodèse, invalidité majeure."
            } 
          },
          { 
            name: "Arthrite septique chronique post-traumatique", 
            rate: [25, 70], 
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
            rate: [30, 80], 
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
            rate: [20, 80], 
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
            rate: [10, 40], 
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
            rate: [30, 60], 
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
            rate: [10, 40], 
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
            rate: [5, 20], 
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
            rate: [15, 40], 
            description: "Déchirure périnéale sévère avec atteinte du sphincter anal (3e degré) ou de la muqueuse rectale (4e degré) lors d'un accouchement difficile.",
            rateCriteria: { 
              low: "Déchirure réparée chirurgicalement avec bonne cicatrisation, continence anale et fécale conservée, dyspareunie légère.", 
              medium: "Séquelles avec incontinence anale aux gaz et/ou selles liquides, dyspareunie modérée à sévère, nécessité d'adaptations (protections).",
              high: "Incontinence fécale complète (gaz et selles solides), fistule recto-vaginale persistante, dyspareunie intolérable, retentissement psycho-social majeur."
            } 
          },
          { 
            name: "Prolapsus génital post-traumatique sévère", 
            rate: [20, 40], 
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
            rate: 100, 
            description: "Perte des deux membres supérieurs (bras, avant-bras ou mains), entraînant une dépendance totale pour les actes de la vie quotidienne."
          },
          { 
            name: "Amputation de deux membres inférieurs", 
            rate: 100, 
            description: "Perte des deux membres inférieurs (cuisses, jambes ou pieds), entraînant une impossibilité de marcher et une dépendance en fauteuil roulant."
          },
          { 
            name: "Amputation d'un membre supérieur et d'un membre inférieur", 
            rate: 100, 
            description: "Amputation d'un bras (ou avant-bras/main) et d'une jambe (ou cuisse/pied), polyhandicap majeur."
          },
          { 
            name: "Amputation de trois membres", 
            rate: 100, 
            description: "Perte de trois membres (combinaison de membres supérieurs et inférieurs), dépendance totale."
          },
          { 
            name: "Amputation des quatre membres (tétra-amputation)", 
            rate: 100, 
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
            rate: [50, 80], 
            description: "Psychose avec hallucinations (auditives, visuelles) et délire chronique apparue après un traumatisme crânien grave.",
            rateCriteria: { 
              low: "Psychose stabilisée par un traitement antipsychotique, hallucinations rares et non angoissantes, maintien d'une vie sociale minimale.", 
              medium: "Psychose avec hallucinations fréquentes et délire, nécessitant un traitement antipsychotique au long cours, retentissement socio-professionnel majeur, isolement social.",
              high: "Psychose chronique sévère avec hallucinations permanentes et délire structuré, résistance au traitement, dangerosité pour soi ou autrui, nécessité d'hospitalisations répétées, perte d'autonomie."
            } 
          },
          { 
            name: "Schizophrénie post-traumatique", 
            rate: [60, 100], 
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
            rate: [30, 70], 
            description: "Dépression sévère et persistante après un traumatisme grave, résistante aux traitements antidépresseurs.",
            rateCriteria: { 
              low: "Dépression majeure avec épisodes récurrents, répondant partiellement aux antidépresseurs, retentissement socio-professionnel modéré.", 
              medium: "Dépression résistante nécessitant des antidépresseurs + thymorégulateurs ou antipsychotiques, désinsertion professionnelle, tentatives de suicide antérieures.",
              high: "Dépression mélancolique sévère avec risque suicidaire élevé, dépendance pour les actes de la vie quotidienne, hospitalisations prolongées ou répétées, échec de l'électroconvulsivothérapie (ECT)."
            } 
          },
          { 
            name: "Trouble bipolaire post-traumatique", 
            rate: [40, 80], 
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
            rate: [20, 60], 
            description: "TOC sévère avec obsessions et compulsions envahissantes, apparu ou aggravé de façon certaine après un traumatisme.",
            rateCriteria: { 
              low: "TOC avec obsessions et compulsions quotidiennes mais contrôlées par le traitement (ISRS + TCC), retentissement modéré sur la vie quotidienne (perte de temps < 3h/jour).", 
              medium: "TOC sévère avec rituels chronophages (> 3h/jour), retentissement majeur sur la vie socio-professionnelle, désinsertion partielle.",
              high: "TOC très sévère avec rituels quasi-permanents, impossibilité de sortir du domicile, dépendance pour les actes de la vie quotidienne, résistance au traitement médical et à la TCC."
            } 
          },
          { 
            name: "Trouble panique avec agoraphobie post-traumatique sévère", 
            rate: [20, 50], 
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

// ========================================
// CAS COMPLEXES ET CUMULS SPÉCIFIQUES  
// ========================================

const casComplexes: InjuryCategory = {
  name: "Cas Complexes et Cumuls",
  subcategories: [
    {
      name: "Cumuls Multiples - Membres",
      injuries: [
        { name: "Séquelles multiples membres (cumul)", rate: 30 },
      ]
    },
    {
      name: "Cumuls Multiples - Mixtes",
      injuries: [
        { name: "Séquelles multiples (neurologique + ortho)", rate: 12 },
      ]
    }
  ]
};

// Fusionner toutes les catégories (barème algérien + middleCategories + complément)
// La fonction mergeCategories va automatiquement fusionner les catégories portant le même nom
export const disabilityData: InjuryCategory[] = mergeCategories([
  ...algerianBareme1967,
  ...middleCategories,
  ...mayetReyComplement,
  casComplexes,
]);
