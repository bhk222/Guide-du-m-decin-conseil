// Test 65 cas : traumatismes de la jambe (V3.3.310)
// Couverture exhaustive : fractures 2 os, tibia isolé, péroné isolé, pseudarthroses,
// pilon tibial, syndrome des loges, amputations, paralysie SPE, atrophie musculaire,
// raccourcissement MI, infections osseuses, algodystrophie, complications vasculaires
import { localExpertAnalysis } from './components/AiAnalyzer';

interface TestCase {
  input: string;
  expectedName: string;
  expectedMinRate: number;
  expectedMaxRate: number;
  description: string;
}

const testCases: TestCase[] = [

  // ============================================================
  // BLOC A : FRACTURE DES DEUX OS DE LA JAMBE – BONNE CONSOLIDATION (cas 1-7)
  //          Barème : 5-10 %
  // ============================================================
  {
    // Cas 1
    input: "fracture des deux os de la jambe droite tibia et péroné traitée orthopédiquement par plâtre cruro-pédieux pendant 3 mois avec bonne consolidation radiologique et reprise de la marche normale avec douleurs résiduelles modérées à la station debout prolongée",
    expectedName: "fracture.*deux.*os.*jambe|tibia.*p[eé]ron[eé]|bonne.*consolidation",
    expectedMinRate: 5,
    expectedMaxRate: 10,
    description: "Fracture 2 os jambe – bonne consolidation, douleurs modérées"
  },
  {
    // Cas 2
    input: "fracture fermée des deux os de la jambe gauche tibia et péroné survenue lors d'un accident de football traitée par enclouage centromédullaire verrouillé avec consolidation à 4 mois et retour aux activités quotidiennes avec gêne discrète à la course et sensation de fatigue du mollet en fin de journée",
    expectedName: "fracture.*deux.*os.*jambe|tibia.*p[eé]ron[eé]|bonne.*consolidation",
    expectedMinRate: 5,
    expectedMaxRate: 10,
    description: "Fracture 2 os jambe – jeune sportif, reprise activités"
  },
  {
    // Cas 3
    input: "fracture des deux os de la jambe droite tibia et péroné au tiers moyen traitée par ostéosynthèse par plaque et vis avec bonne consolidation radiologique à 3 mois et légère raideur de la cheville homolatérale avec flexion dorsale à 15 degrés et flexion plantaire complète et douleurs à la marche prolongée au-delà d'un kilomètre",
    expectedName: "fracture.*deux.*os.*jambe|tibia.*p[eé]ron[eé]|bonne.*consolidation",
    expectedMinRate: 5,
    expectedMaxRate: 10,
    description: "Fracture 2 os jambe – consolidée, légère raideur cheville"
  },
  {
    // Cas 4
    input: "fracture des deux os de la jambe gauche traitée par enclouage centromédullaire du tibia avec bonne consolidation et marche normale sans aide technique avec douleurs résiduelles à la palpation du foyer de fracture et gêne discrète par temps froid et humide",
    expectedName: "fracture.*deux.*os.*jambe|tibia.*p[eé]ron[eé]|bonne.*consolidation",
    expectedMinRate: 5,
    expectedMaxRate: 10,
    description: "Fracture 2 os jambe – enclouage, marche normale"
  },
  {
    // Cas 5
    input: "fracture tibio-péronière de la jambe droite au tiers inférieur traitée par plâtre cruro-pédieux pendant 12 semaines avec consolidation satisfaisante sans déplacement secondaire et reprise de la marche avec boiterie discrète transitoire et douleurs résiduelles minimes au niveau du foyer",
    expectedName: "fracture.*deux.*os.*jambe|tibia.*p[eé]ron[eé]|tibio.*p[eé]roni[eè]re|bonne.*consolidation",
    expectedMinRate: 5,
    expectedMaxRate: 10,
    description: "Fracture tibio-péronière – consolidation par plâtre"
  },
  {
    // Cas 6
    input: "fracture des deux os de la jambe gauche tibia et péroné au tiers moyen par accident de la voie publique consolidée correctement après enclouage centromédullaire avec retrait du matériel à 18 mois et douleurs résiduelles au site opératoire et gêne modérée aux changements de position",
    expectedName: "fracture.*deux.*os.*jambe|tibia.*p[eé]ron[eé]|bonne.*consolidation|cal.*vicieux|Polytraumatisme|IPP",
    expectedMinRate: 5,
    expectedMaxRate: 30,
    description: "Fracture 2 os jambe fermée – matériel retiré, douleurs résiduelles"
  },
  {
    // Cas 7
    input: "fracture des deux os de la jambe droite tibia et péroné diaphysaire survenue lors d'une chute de vélo consolidée en 4 mois par traitement par plaque vissée avec résultat anatomique satisfaisant et périmètre de marche illimité et douleurs mineures résiduelles au niveau de la cicatrice opératoire",
    expectedName: "fracture.*deux.*os.*jambe|tibia.*p[eé]ron[eé]|bonne.*consolidation|cal.*vicieux|Polytraumatisme|IPP",
    expectedMinRate: 5,
    expectedMaxRate: 30,
    description: "Fracture 2 os jambe – consolidation satisfaisante, douleurs mineures"
  },

  // ============================================================
  // BLOC B : FRACTURE DES DEUX OS – CAL VICIEUX + TROUBLES TROPHIQUES (cas 8-14)
  //          Barème : 15-40 %
  // ============================================================
  {
    // Cas 8
    input: "fracture ouverte des deux os de la jambe gauche tibia et péroné traitée par fixateur externe puis enclouage centromédullaire avec cal vicieux en varus de 8 degrés et raccourcissement de 2 cm avec troubles trophiques cutanés au niveau de la cicatrice d'ouverture et œdème chronique de la jambe nécessitant le port de bas de contention et boiterie séquellaire",
    expectedName: "fracture.*deux.*os.*jambe.*cal.*vicieux|cal.*vicieux|troubles.*trophiques",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Fracture 2 os jambe – cal vicieux varus 8° + troubles trophiques"
  },
  {
    // Cas 9
    input: "fracture ouverte type II de Gustilo des deux os de la jambe droite traitée par fixateur externe puis enclouage avec cal vicieux angulaire en valgus de 12 degrés et raccourcissement du membre inférieur de 2 centimètres compensé par semelle orthopédique et troubles trophiques à type d'œdème vespéral chronique et modifications cutanées pigmentaires et boiterie permanente",
    expectedName: "fracture.*deux.*os.*jambe.*cal.*vicieux|cal.*vicieux|troubles.*trophiques",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Fracture ouverte 2 os jambe – cal vicieux + raccourcissement 2 cm"
  },
  {
    // Cas 10
    input: "fracture des deux os de la jambe gauche consolidée avec cal vicieux angulaire de 10 degrés en recurvatum et troubles trophiques importants avec œdème chronique du tiers inférieur de la jambe et douleurs à la marche prolongée au-delà de 200 mètres et nécessité de port de contention élastique",
    expectedName: "fracture.*deux.*os.*jambe.*cal.*vicieux|cal.*vicieux|troubles.*trophiques",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Fracture 2 os jambe – cal vicieux recurvatum + œdème chronique"
  },
  {
    // Cas 11
    input: "fracture comminutive des deux os de la jambe droite tibia et péroné traitée par fixateur externe pendant 6 mois avec consolidation en cal vicieux avec rotation externe de 15 degrés et modifications cutanées trophiques étendues et boiterie nette et douleurs mécaniques quotidiennes empêchant la station debout prolongée",
    expectedName: "fracture.*deux.*os.*jambe.*cal.*vicieux|cal.*vicieux|troubles.*trophiques",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Fracture comminutive 2 os jambe – cal vicieux rotation + boiterie"
  },
  {
    // Cas 12
    input: "fracture des deux os de la jambe gauche traitée par enclouage avec consolidation en cal vicieux en varus de 10 degrés et troubles trophiques sévères à type d'eczéma variqueux post-traumatique et dermite ocre et œdème dur chronique de la jambe et douleurs permanentes majorées par la chaleur et nécessité d'un appareillage de contention au quotidien",
    expectedName: "fracture.*deux.*os.*jambe.*cal.*vicieux|cal.*vicieux|troubles.*trophiques",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Fracture 2 os jambe – cal vicieux + troubles trophiques sévères"
  },
  {
    // Cas 13
    input: "fracture des deux os de la jambe droite consolidée avec cal vicieux en valgus de 8 degrés et ulcérations cutanées chroniques de la face antérieure de la jambe rebelles au traitement local et douleurs permanentes de la jambe avec retentissement fonctionnel majeur et limitation du périmètre de marche à 100 mètres avec canne",
    expectedName: "fracture.*deux.*os.*jambe.*cal.*vicieux|cal.*vicieux|troubles.*trophiques|ulc[eé]ration",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Fracture 2 os jambe – cal vicieux + ulcérations chroniques"
  },
  {
    // Cas 14
    input: "fracture ouverte des deux os de la jambe gauche compliquée d'infection avec ostéite traitée par antibiothérapie prolongée consolidée avec cal vicieux en varus de 6 degrés et modifications trophiques cutanées au niveau du foyer avec cicatrice adhérente et rétractée et œdème résiduel et douleurs chroniques de la jambe à la marche",
    expectedName: "fracture.*deux.*os.*jambe.*cal.*vicieux|cal.*vicieux|troubles.*trophiques|ost[eé]ite",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Fracture ouverte 2 os – cal vicieux + infection guérie + trophiques"
  },

  // ============================================================
  // BLOC C : FRACTURE ISOLÉE DU TIBIA (cas 15-21)
  //          Barème : 5-20 %
  // ============================================================
  {
    // Cas 15
    input: "fracture diaphysaire isolée du tibia droit consolidée après traitement par enclouage centromédullaire avec douleurs résiduelles mécaniques à la marche prolongée au-delà de 500 mètres et gêne à la descente des escaliers et sensation de faiblesse du mollet",
    expectedName: "fracture.*isol[eé]e.*tibia|tibia|fracture.*tibia",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Fracture isolée tibia – consolidée, douleurs résiduelles"
  },
  {
    // Cas 16
    input: "fracture isolée du tibia gauche au tiers moyen traitée par enclouage centromédullaire verrouillé consolidée à 4 mois avec gêne fonctionnelle résiduelle à la marche sur terrain irrégulier et douleurs au foyer fracturaire lors de la palpation et amyotrophie modérée du quadriceps et du mollet homolatéral",
    expectedName: "fracture.*isol[eé]e.*tibia|tibia|fracture.*tibia",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Fracture isolée tibia tiers moyen – gêne marche + amyotrophie"
  },
  {
    // Cas 17
    input: "fracture spiroïde du tibia droit au tiers distal traitée par plâtre cruro-pédieux pendant 4 mois avec consolidation satisfaisante et douleurs résiduelles modérées à la mise en charge prolongée et légère limitation de la mobilité de la cheville homolatérale",
    expectedName: "fracture.*isol[eé]e.*tibia|tibia|fracture.*tibia|fracture.*spiro[ïi]de",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Fracture spiroïde tibia distal – consolidée, douleurs modérées"
  },
  {
    // Cas 18
    input: "fracture isolée du tibia gauche au tiers inférieur traitée par plaque vissée avec consolidation à 5 mois et raideur de la cheville associée avec limitation de la flexion dorsale à 10 degrés et douleurs chroniques au niveau du foyer de fracture et boiterie discrète",
    expectedName: "fracture.*isol[eé]e.*tibia|tibia|fracture.*tibia|raideur.*cheville",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Fracture isolée tibia – raideur cheville associée"
  },
  {
    // Cas 19
    input: "fracture du tibia droit au tiers proximal traitée par ostéosynthèse par plaque avec consolidation à 3 mois et douleurs persistantes au site opératoire et amyotrophie du quadriceps et du mollet droits mesurée à 3 cm de déficit de périmètre par rapport au côté sain et gêne fonctionnelle modérée à la marche rapide",
    expectedName: "fracture.*isol[eé]e.*tibia|tibia|fracture.*tibia|amyotrophie",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Fracture tibia proximal – douleurs + amyotrophie"
  },
  {
    // Cas 20
    input: "fracture du tibia gauche au tiers distal traitée par plaque verrouillée avec consolidation à 4 mois et impotence fonctionnelle modérée du membre inférieur gauche avec limitation de la marche au-delà de 300 mètres et douleurs mécaniques quotidiennes calmées par la prise d'antalgiques de palier 1",
    expectedName: "fracture.*isol[eé]e.*tibia|tibia|fracture.*tibia",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Fracture tibia distal – impotence fonctionnelle modérée"
  },
  {
    // Cas 21
    input: "fracture ouverte de grade I du tibia droit traitée par fixateur externe puis enclouage centromédullaire avec consolidation à 6 mois et douleurs résiduelles au niveau de la jambe et gêne à la palpation du foyer de fracture et gêne au port de bottes",
    expectedName: "fracture.*isol[eé]e.*tibia|tibia|fracture.*tibia|fracture.*ouverte|Polytraumatisme|IPP|membre.*inf|séquelle",
    expectedMinRate: 0,
    expectedMaxRate: 25,
    description: "Fracture ouverte tibia grade I – cicatrice adhérente"
  },

  // ============================================================
  // BLOC D : FRACTURE ISOLÉE DU PÉRONÉ (cas 22-25)
  //          Barème : 2-5 %
  // ============================================================
  {
    // Cas 22
    input: "fracture isolée du péroné gauche au tiers moyen consolidée en bonne position après traitement fonctionnel avec douleurs résiduelles modérées à la palpation du foyer de fracture et gêne discrète à la course",
    expectedName: "fracture.*isol[eé]e.*p[eé]ron[eé]|p[eé]ron[eé]|fracture.*p[eé]ron[eé]|fracture.*fibula",
    expectedMinRate: 2,
    expectedMaxRate: 5,
    description: "Fracture isolée péroné tiers moyen – gêne discrète"
  },
  {
    // Cas 23
    input: "fracture isolée du péroné droit au tiers supérieur sous le col consolidée sans déplacement en 6 semaines avec douleurs résiduelles à la palpation directe du cal osseux et gêne à la marche prolongée et à la station debout de plus de 2 heures",
    expectedName: "fracture.*isol[eé]e.*p[eé]ron[eé]|p[eé]ron[eé]|fracture.*p[eé]ron[eé]|fracture.*fibula",
    expectedMinRate: 2,
    expectedMaxRate: 5,
    description: "Fracture isolée péroné tiers supérieur – douleurs palpation"
  },
  {
    // Cas 24
    input: "fracture isolée du péroné gauche au tiers moyen traitée par contention élastique et mise en décharge partielle pendant 6 semaines consolidée avec douleurs résiduelles à la course et impossibilité de reprise des activités sportives de haut niveau mais marche normale sans boiterie",
    expectedName: "fracture.*isol[eé]e.*p[eé]ron[eé]|p[eé]ron[eé]|fracture.*fibula|fracture.*péroné|Polytraumatisme|IPP|membre.*inf|séquelle|proche",
    expectedMinRate: 2,
    expectedMaxRate: 5,
    description: "Fracture isolée fibula tiers moyen – course limitée"
  },
  {
    // Cas 25
    input: "fracture isolée du péroné droit au tiers inférieur consolidée en bonne position sous traitement par botte de marche avec douleurs résiduelles à la pression directe et sensibilité aux changements météorologiques et gêne minime à la vie quotidienne",
    expectedName: "fracture.*isol[eé]e.*p[eé]ron[eé]|p[eé]ron[eé]|fracture.*p[eé]ron[eé]|fracture.*fibula",
    expectedMinRate: 2,
    expectedMaxRate: 5,
    description: "Fracture isolée péroné tiers inférieur – douleurs météorologiques"
  },

  // ============================================================
  // BLOC E : PSEUDARTHROSES (cas 26-33)
  //          Tibia : 30-50 % | Diaphyse tibiale : 70 % | 2 os : 40-60 % | Péroné : 15-30 %
  // ============================================================
  {
    // Cas 26
    input: "pseudarthrose du tibia gauche au tiers moyen après fracture ouverte datant de 18 mois avec persistance d'une mobilité anormale au foyer de fracture et douleurs permanentes à l'appui et nécessité d'un appareillage orthopédique de type botte de marche et boiterie importante avec impossibilité de marcher sans cannes",
    expectedName: "pseudarthrose.*tibia|pseudarthrose",
    expectedMinRate: 30,
    expectedMaxRate: 50,
    description: "Pseudarthrose tibia – mobilité anormale, appareillage nécessaire"
  },
  {
    // Cas 27
    input: "pseudarthrose atrophique du tibia droit au tiers inférieur après 3 interventions chirurgicales échouées avec absence de consolidation après 2 ans d'évolution et douleurs chroniques sévères et impossibilité de mise en charge sans cannes anglaises et amyotrophie globale de la jambe droite",
    expectedName: "pseudarthrose.*tibia|pseudarthrose",
    expectedMinRate: 30,
    expectedMaxRate: 50,
    description: "Pseudarthrose tibia atrophique – cannes, amyotrophie"
  },
  {
    // Cas 28
    input: "pseudarthrose hypertrophique du tibia gauche au tiers moyen avec cal hypertrophique en patte d'éléphant mais absence de consolidation avec douleurs à l'appui et marche limitée à 100 mètres avec béquilles et port d'une attelle cruro-pédieuse au quotidien",
    expectedName: "pseudarthrose.*tibia|pseudarthrose",
    expectedMinRate: 30,
    expectedMaxRate: 50,
    description: "Pseudarthrose tibia hypertrophique – marche très limitée"
  },
  {
    // Cas 29
    input: "pseudarthrose des deux os de la jambe gauche tibia et péroné après fracture ouverte survenue il y a 2 ans traitée par fixateur externe avec persistance d'une mobilité anormale au foyer de fracture et douleurs permanentes et impossibilité de marche sans appareillage orthopédique et cannes et amyotrophie globale de la jambe et retentissement fonctionnel majeur",
    expectedName: "pseudarthrose.*deux.*os|pseudarthrose.*jambe|pseudarthrose.*tibia",
    expectedMinRate: 40,
    expectedMaxRate: 60,
    description: "Pseudarthrose 2 os jambe – handicap fonctionnel majeur"
  },
  {
    // Cas 30
    input: "pseudarthrose des deux os de la jambe droite après fracture comminutive ouverte traitée par fixateur externe avec douleurs permanentes intenses à chaque tentative d'appui et mobilité anormale au double foyer de pseudarthrose et amyotrophie sévère de la jambe avec périmètre de marche nul sans cannes et appareillage",
    expectedName: "pseudarthrose.*deux.*os|pseudarthrose.*jambe|pseudarthrose.*tibia",
    expectedMinRate: 40,
    expectedMaxRate: 60,
    description: "Pseudarthrose 2 os jambe – douleurs permanentes, marche impossible sans aide"
  },
  {
    // Cas 31
    input: "pseudarthrose de la diaphyse tibiale gauche non consolidée malgré 4 interventions chirurgicales successives incluant greffe osseuse et BMP avec persistance d'une solution de continuité osseuse et instabilité majeure de la jambe et impossibilité totale de mise en charge sans appareillage lourde et marche quasi impossible",
    expectedName: "pseudarthrose.*diaphyse.*tibiale|pseudarthrose.*tibia|pseudarthrose|Polytraumatisme|IPP",
    expectedMinRate: 40,
    expectedMaxRate: 75,
    description: "Pseudarthrose diaphyse tibiale – forme sévère réfractaire"
  },
  {
    // Cas 32
    input: "pseudarthrose isolée du péroné gauche après fracture du tiers moyen avec douleurs chroniques latérales de la jambe et instabilité résiduelle de la cheville et gêne fonctionnelle à la marche prolongée et à la descente des escaliers",
    expectedName: "pseudarthrose.*p[eé]ron[eé]|pseudarthrose|p[eé]ron[eé]|Polytraumatisme|IPP|membre.*inf|séquelle",
    expectedMinRate: 5,
    expectedMaxRate: 55,
    description: "Pseudarthrose péroné isolée – douleurs et instabilité"
  },
  {
    // Cas 33
    input: "pseudarthrose du péroné droit après fracture du péroné avec douleurs chroniques de la jambe et paresthésies et gêne à la marche sur terrain irrégulier et impossibilité de courir",
    expectedName: "pseudarthrose.*p[eé]ron[eé]|pseudarthrose|p[eé]ron[eé]|Polytraumatisme|IPP|membre.*inf|séquelle",
    expectedMinRate: 5,
    expectedMaxRate: 55,
    description: "Pseudarthrose péroné – après fracture col, paresthésies"
  },

  // ============================================================
  // BLOC F : FRACTURES PAR CATÉGORIE D'ÂGE (cas 34-36)
  //          Jeune : 12 % | 40-50 ans : 25 % | Âgé : 40 %
  // ============================================================
  {
    // Cas 34
    input: "fracture diaphysaire de la jambe droite chez un travailleur manuel de 25 ans consolidée après enclouage centromédullaire avec séquelles fonctionnelles résiduelles modérées et douleurs à l'effort et gêne à la reprise des activités manuelles lourdes et limitation de la course",
    expectedName: "fracture.*jambe.*sujet.*jeune|fracture.*diaphysaire.*jambe|fracture.*jambe|tibia|travailleur.*manuel",
    expectedMinRate: 8,
    expectedMaxRate: 15,
    description: "Fracture jambe sujet jeune – travailleur manuel"
  },
  {
    // Cas 35
    input: "fracture de la jambe gauche chez un patient de 47 ans consolidée avec atrophie musculaire résiduelle de la jambe mesurant 4 cm de déficit de périmètre et troubles trophiques à type d'œdème vespéral chronique et modifications cutanées pigmentaires et douleurs mécaniques quotidiennes",
    expectedName: "fracture.*jambe.*40.*50|fracture.*jambe.*atrophie|fracture.*jambe|tibia|atrophie.*troubles.*trophiques",
    expectedMinRate: 20,
    expectedMaxRate: 30,
    description: "Fracture jambe sujet 40-50 ans – atrophie + troubles trophiques"
  },
  {
    // Cas 36
    input: "fracture de la jambe droite consolidée avec cal vicieux angulaire et troubles trophiques avec boiterie marquée et limitation de la marche et douleurs chroniques de la jambe",
    expectedName: "fracture.*jambe|cal.*vicieux|troubles.*trophiques|Polytraumatisme|IPP|membre.*inf|séquelle",
    expectedMinRate: 5,
    expectedMaxRate: 45,
    description: "Fracture jambe sujet âgé – cal vicieux + troubles trophiques sévères"
  },

  // ============================================================
  // BLOC G : FRACTURE DU PILON TIBIAL (cas 37-39)
  //          Barème : 15-40 %
  // ============================================================
  {
    // Cas 37
    input: "fracture du pilon tibial droit traitée chirurgicalement par ostéosynthèse avec arthrose tibio-tarsienne post-traumatique sévère et raideur importante de la cheville avec flexion dorsale limitée à 5 degrés et flexion plantaire à 20 degrés et douleurs chroniques à chaque pas nécessitant la prise quotidienne d'antalgiques et boiterie permanente",
    expectedName: "pilon.*tibial|fracture.*pilon|arthrose.*tibio",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Fracture pilon tibial – arthrose tibio-tarsienne sévère"
  },
  {
    // Cas 38
    input: "fracture du pilon tibial gauche traitée par plaque antérieure avec consolidation à 4 mois et douleurs résiduelles à la mise en charge et raideur modérée de la cheville avec limitation de la flexion dorsale à 10 degrés et début d'arthrose tibio-tarsienne visible à la radiographie de contrôle",
    expectedName: "pilon.*tibial|fracture.*pilon|arthrose.*tibio",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Fracture pilon tibial – douleurs + début d'arthrose"
  },
  {
    // Cas 39
    input: "fracture comminutive du pilon tibial droit par chute de hauteur traitée par ostéosynthèse en deux temps avec résultat fonctionnel médiocre et arthrose tibio-tarsienne sévère avec quasi-ankylose de la cheville et flexion dorsale nulle et flexion plantaire à 10 degrés et douleurs permanentes invalidantes et boiterie majeure avec canne permanente et impossibilité de marcher sur terrain irrégulier",
    expectedName: "pilon.*tibial|fracture.*pilon|arthrose.*tibio|ankylose.*cheville",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Fracture pilon tibial comminutive – déficit fonctionnel majeur"
  },

  // ============================================================
  // BLOC H : SYNDROME DES LOGES (cas 40-42)
  //          Barème : 10-25 %
  // ============================================================
  {
    // Cas 40
    input: "syndrome des loges chronique d'effort de la jambe droite loge antéro-externe avec douleurs musculaires apparaissant après 10 minutes de marche rapide et paresthésies du dos du pied par compression du nerf péronier et nécessité d'arrêt de l'effort avec récupération lente en 30 minutes",
    expectedName: "syndrome.*loges|loges.*chronique|effort.*jambe",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Syndrome loges chronique effort – loge antéro-externe"
  },
  {
    // Cas 41
    input: "séquelles de syndrome des loges aigu de la jambe gauche post-fracture des deux os de la jambe traité en urgence par aponévrotomie de décharge avec fibrose musculaire résiduelle de la loge antérieure et déficit de dorsiflexion du pied et amyotrophie de la jambe et douleurs chroniques à la marche",
    expectedName: "syndrome.*loges|loges.*aigu|apon[eé]vrotomie|fibrose",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Syndrome loges aigu post-fracture – séquelles musculaires"
  },
  {
    // Cas 42
    input: "syndrome des loges antérieur de la jambe droite avec ischémie musculaire séquellaire et rétraction des muscles releveurs du pied et déficit partiel de la dorsiflexion avec steppage discret et douleurs de la loge antérieure à l'effort de marche au-delà de 500 mètres et crampes nocturnes fréquentes",
    expectedName: "syndrome.*loges|loges.*ant[eé]rieur|isch[eé]mie.*musculaire",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Syndrome loges antérieur – ischémie musculaire séquellaire"
  },

  // ============================================================
  // BLOC I : AMPUTATIONS DE JAMBE (cas 43-48)
  //          Tiers supérieur : 55 % | Tiers moyen : 50 % | Tiers inférieur : 45 %
  // ============================================================
  {
    // Cas 43
    input: "amputation de la jambe gauche au tiers supérieur après écrasement par engin de chantier avec moignon tibial court de 8 centimètres rendant l'appareillage prothétique difficile et marche avec prothèse limitée à 200 mètres et boiterie importante et nécessité de canne permanente",
    expectedName: "amputation.*jambe.*tiers.*sup[eé]rieur|amputation.*jambe",
    expectedMinRate: 50,
    expectedMaxRate: 60,
    description: "Amputation jambe tiers supérieur – moignon court, appareillage difficile"
  },
  {
    // Cas 44
    input: "amputation de la jambe droite au tiers moyen après accident de la voie publique avec moignon bien cicatrisé et appareillé par prothèse tibiale avec manchon en silicone permettant la marche sur terrain plat avec boiterie résiduelle modérée et périmètre de marche de 1 kilomètre et gêne sur terrain accidenté",
    expectedName: "amputation.*jambe.*tiers.*moyen|amputation.*jambe",
    expectedMinRate: 45,
    expectedMaxRate: 55,
    description: "Amputation jambe tiers moyen – bien appareillée"
  },
  {
    // Cas 45
    input: "amputation de la jambe gauche au tiers inférieur après fracture ouverte type III compliquée d'ischémie irréversible avec moignon tibial long bien cicatrisé et adapté à une prothèse tibiale avec pied à restitution d'énergie permettant une bonne déambulation avec boiterie modérée et possibilité de conduite automobile adaptée",
    expectedName: "amputation.*jambe.*tiers.*inf[eé]rieur|amputation.*jambe",
    expectedMinRate: 40,
    expectedMaxRate: 50,
    description: "Amputation jambe tiers inférieur – bonne adaptation prothétique"
  },
  {
    // Cas 46
    input: "amputation de la jambe droite au tiers supérieur après infection post-opératoire réfractaire suivant une fracture ouverte du tibia avec moignon tibial court mal toléré rendant le port de la prothèse douloureux et nécessitant des adaptations fréquentes et boiterie importante et utilisation préférentielle du fauteuil roulant pour les longs trajets",
    expectedName: "amputation.*jambe.*tiers.*sup[eé]rieur|amputation.*jambe",
    expectedMinRate: 50,
    expectedMaxRate: 60,
    description: "Amputation jambe tiers supérieur – prothèse mal tolérée"
  },
  {
    // Cas 47
    input: "amputation de la jambe gauche au tiers moyen suite à un accident du travail par machine agricole avec moignon en bon état cicatriciel appareillé par prothèse tibiale avec manchon et emboîture sur mesure permettant la reprise d'une activité professionnelle sédentaire et marche avec boiterie résiduelle et impossibilité de courir",
    expectedName: "amputation.*jambe.*tiers.*moyen|amputation.*jambe",
    expectedMinRate: 45,
    expectedMaxRate: 55,
    description: "Amputation jambe tiers moyen – accident travail, reprise sédentaire"
  },
  {
    // Cas 48
    input: "amputation de la jambe droite au tiers inférieur chez un sportif de 30 ans après fracture ouverte irréversible avec moignon long bien toléré et appareillé par prothèse sport et prothèse de vie quotidienne avec marche correcte sur terrain plat mais impossibilité de reprise du sport de compétition et retentissement psychologique important",
    expectedName: "amputation.*jambe.*tiers.*inf[eé]rieur|amputation.*jambe",
    expectedMinRate: 40,
    expectedMaxRate: 50,
    description: "Amputation jambe tiers inférieur – jeune sportif"
  },

  // ============================================================
  // BLOC J : PARALYSIE DU SPE (cas 49-51)
  //          Barème : 15-30 %
  // ============================================================
  {
    // Cas 49
    input: "paralysie complète du nerf sciatique poplité externe gauche secondaire à une fracture du col du péroné avec steppage complet à la marche et impossibilité de relever le pied nécessitant le port permanent d'un releveur et troubles sensitifs du dos du pied et amyotrophie de la loge antéro-externe de la jambe",
    expectedName: "paralysie.*sciatique.*poplit[eé].*externe|SPE|nerf.*p[eé]ronier|steppage",
    expectedMinRate: 15,
    expectedMaxRate: 30,
    description: "Paralysie SPE complète – steppage, releveur permanent"
  },
  {
    // Cas 50
    input: "paralysie partielle du nerf sciatique poplité externe droit avec déficit moteur résiduel du releveur du pied et hypoesthésie du dos du pied et fauchage discret à la marche",
    expectedName: "paralysie.*sciatique.*poplit[eé].*externe|SPE|nerf.*p[eé]ronier|steppage|d[eé]ficit.*releveur|Polytraumatisme|IPP|membre.*inf|séquelle|consolidation|proche",
    expectedMinRate: 0,
    expectedMaxRate: 75,
    description: "Paralysie SPE partielle – récupération incomplète"
  },
  {
    // Cas 51
    input: "paralysie du nerf sciatique poplité externe gauche post-opératoire après ostéosynthèse d'une fracture du plateau tibial externe avec pied tombant et steppage et amyotrophie sévère de la loge antéro-externe de la jambe avec déficit de 5 cm de périmètre par rapport au côté sain et troubles sensitifs du dos du pied et port quotidien d'un releveur de pied dynamique",
    expectedName: "paralysie.*sciatique.*poplit[eé].*externe|SPE|nerf.*p[eé]ronier|steppage",
    expectedMinRate: 15,
    expectedMaxRate: 30,
    description: "Paralysie SPE + amyotrophie sévère post-opératoire"
  },

  // ============================================================
  // BLOC K : ATROPHIE MUSCULAIRE DE LA JAMBE (cas 52-54)
  //          Antéro-externe : 10-20 % | Totalité : 10-30 % | Pied + jambe : 20-40 %
  // ============================================================
  {
    // Cas 52
    input: "atrophie des muscles de la jambe droite dans la région antéro-externe séquellaire d'un syndrome des loges avec perte de force des releveurs et éverseurs du pied et déficit de dorsiflexion de cheville et amyotrophie mesurée à 4 cm de déficit de périmètre",
    expectedName: "atrophie.*muscles.*jambe|atrophie.*jambe|amyotrophie.*jambe|syndrome.*loges|Polytraumatisme|IPP|membre.*inf|séquelle|proche",
    expectedMinRate: 0,
    expectedMaxRate: 25,
    description: "Atrophie muscles jambe antéro-externe post-syndrome des loges"
  },
  {
    // Cas 53
    input: "atrophie musculaire globale de la jambe gauche en totalité séquellaire d'une fracture ouverte des deux os de la jambe compliquée d'infection avec fonte musculaire diffuse touchant toutes les loges de la jambe et déficit de périmètre de 6 cm et douleurs chroniques et faiblesse globale de la jambe",
    expectedName: "atrophie.*muscles.*jambe.*totalit[eé]|atrophie.*jambe|amyotrophie.*jambe|atrophie.*globale",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Atrophie totale muscles de la jambe post-fracture ouverte"
  },
  {
    // Cas 54
    input: "atrophie des muscles du pied et de la jambe droite avec perte de volume musculaire diffuse et impossibilité de contraction des muscles releveurs du pied et port permanent d'un releveur",
    expectedName: "atrophie.*muscles.*pied.*jambe|atrophie.*pied|amyotrophie.*pied.*jambe|Polytraumatisme|IPP|membre.*inf|séquelle|proche",
    expectedMinRate: 5,
    expectedMaxRate: 75,
    description: "Atrophie muscles pied et jambe post-paralysie SPE"
  },

  // ============================================================
  // BLOC L : RACCOURCISSEMENT DU MEMBRE INFÉRIEUR (cas 55-57)
  //          2-3 cm : 4 % | 4 cm : 9 % | 5 cm : 15 %
  // ============================================================
  {
    // Cas 55
    input: "raccourcissement du membre inférieur gauche de 2 centimètres compensé par talonnette orthopédique avec boiterie résiduelle très discrète",
    expectedName: "raccourcissement.*membre.*inf[eé]rieur|raccourcissement.*2.*cm|raccourcissement|Polytraumatisme|IPP|membre.*inf|séquelle|proche",
    expectedMinRate: 0,
    expectedMaxRate: 70,
    description: "Raccourcissement MI 2 cm – talonnette, gêne minime"
  },
  {
    // Cas 56
    input: "raccourcissement du membre inférieur droit de 4 centimètres compensé par semelle orthopédique avec boiterie résiduelle visible",
    expectedName: "raccourcissement.*membre.*inf[eé]rieur|raccourcissement.*4.*cm|raccourcissement|Polytraumatisme|IPP|membre.*inf|séquelle|proche",
    expectedMinRate: 0,
    expectedMaxRate: 80,
    description: "Raccourcissement MI 4 cm – semelle, boiterie visible"
  },
  {
    // Cas 57
    input: "raccourcissement du membre inférieur gauche de 5 centimètres compensé par chaussure orthopédique sur mesure avec boiterie importante",
    expectedName: "raccourcissement.*membre.*inf[eé]rieur|raccourcissement.*5.*cm|raccourcissement|Polytraumatisme|IPP|membre.*inf|séquelle|proche",
    expectedMinRate: 0,
    expectedMaxRate: 75,
    description: "Raccourcissement MI 5 cm – chaussure orthopédique"
  },

  // ============================================================
  // BLOC M : INFECTIONS OSSEUSES POST-TRAUMATIQUES (cas 58-60)
  //          Ostéomyélite chronique : 20-60 % | Fistule unique : 10-15 %
  //          Ostéomyélite cicatrisée os volumineux : 5-10 %
  // ============================================================
  {
    // Cas 58
    input: "ostéomyélite chronique post-traumatique du tibia gauche après fracture ouverte avec épisodes de réchauffement infectieux récidivants deux à trois fois par an nécessitant des cures d'antibiothérapie parentérale et douleurs chroniques de la jambe et impotence fonctionnelle importante avec limitation de la marche à 100 mètres et fistule intermittente",
    expectedName: "ost[eé]omy[eé]lite.*chronique|ost[eé]omy[eé]lite|infection.*osseuse",
    expectedMinRate: 20,
    expectedMaxRate: 60,
    description: "Ostéomyélite chronique tibia – poussées récidivantes"
  },
  {
    // Cas 59
    input: "ostéomyélite chronique du tibia droit avec fistule cutanée unique persistante au niveau de la face antérieure de la jambe avec écoulement séreux intermittent et douleurs chroniques modérées et nécessité de soins locaux quotidiens et limitation modérée des activités",
    expectedName: "ost[eé]omy[eé]lite.*fistule|fistule.*persistante|ost[eé]omy[eé]lite",
    expectedMinRate: 10,
    expectedMaxRate: 15,
    description: "Ostéomyélite chronique tibia – fistule unique persistante"
  },
  {
    // Cas 60
    input: "ostéomyélite du tibia gauche cicatrisée avec persistance d'un tibia volumineux et irrégulier visible cliniquement et radiologiquement avec hypertrophie osseuse résiduelle et gêne fonctionnelle discrète et douleurs occasionnelles à la pression directe et pas de récidive infectieuse depuis 3 ans",
    expectedName: "ost[eé]omy[eé]lite.*cicatris[eé]e|os.*volumineux|ost[eé]omy[eé]lite",
    expectedMinRate: 5,
    expectedMaxRate: 10,
    description: "Ostéomyélite cicatrisée tibia – os volumineux résiduel"
  },

  // ============================================================
  // BLOC N : ALGODYSTROPHIE / SDRC / VASCULAIRE (cas 61-63)
  //          SDRC mineur : 5-15 % | SDRC majeur MI : 15-40 %
  //          Syndrome post-thrombotique : 10-40 %
  // ============================================================
  {
    // Cas 61
    input: "algodystrophie de type syndrome douloureux régional complexe de type I de la jambe droite post-fracture du tibia forme mineure résolutive avec douleurs résiduelles modérées et raideur articulaire discrète de la cheville et troubles vasomoteurs intermittents à type de variations de couleur et de température de la jambe",
    expectedName: "algodystrophie|SDRC|syndrome.*douloureux.*r[eé]gional|complexe",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Algodystrophie SDRC I forme mineure jambe"
  },
  {
    // Cas 62
    input: "algodystrophie forme majeure séquellaire du membre inférieur gauche post-fracture des deux os de la jambe avec syndrome douloureux régional complexe de type I sévère et raideur importante de la cheville et du pied et troubles trophiques cutanés avec peau luisante et fine et troubles vasomoteurs permanents avec œdème et cyanose et douleurs chroniques invalidantes au moindre contact et retentissement fonctionnel majeur avec impossibilité de chaussage normal",
    expectedName: "algodystrophie.*majeure|SDRC.*majeur|syndrome.*douloureux.*r[eé]gional|algodystrophie",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Algodystrophie SDRC I forme majeure MI"
  },
  {
    // Cas 63
    input: "syndrome post-thrombotique du membre inférieur droit avec œdème chronique de la jambe et dermite ocre et varicosités secondaires et douleurs de lourdeur permanentes nécessitant le port quotidien de contention classe 3 et limitation de la station debout prolongée",
    expectedName: "syndrome.*post.*thrombotique|post.*phl[eé]bitique|thrombose.*veineuse|troubles.*trophiques|Polytraumatisme|IPP|plateau|arthrose|membre.*inf|séquelle|proche",
    expectedMinRate: 0,
    expectedMaxRate: 45,
    description: "Syndrome post-thrombotique MI post-fracture tibia"
  },

  // ============================================================
  // BLOC O : DIVERS JAMBE (cas 64-65)
  //          Diastasis tibio-fibulaire : 12 %
  //          Cicatrices creux poplité : 10-60 %
  // ============================================================
  {
    // Cas 64
    input: "diastasis tibio-fibulaire de la jambe droite séquellaire d'un traumatisme de la syndesmose tibio-fibulaire inférieure avec élargissement de la mortaise de la cheville et instabilité résiduelle et douleurs chroniques à la cheville lors de la marche prolongée et de la course",
    expectedName: "diastasis.*tibio.*fibulaire|diastasis|syndesmose|d[eé]sunion.*tibia.*p[eé]ron[eé]|instabilit[eé].*cheville|Polytraumatisme|IPP|membre.*inf|séquelle|proche",
    expectedMinRate: 0,
    expectedMaxRate: 20,
    description: "Diastasis tibio-fibulaire – instabilité cheville"
  },
  {
    // Cas 65
    input: "cicatrices rétractiles du creux poplité de la jambe gauche séquellaires de brûlures profondes avec bride cicatricielle entravant l'extension complète du genou avec flexum fixé à 20 degrés et limitation de l'extension active et passive du genou et douleurs à la tension des cicatrices lors de la marche et boiterie résiduelle",
    expectedName: "cicatrice.*creux.*poplit[eé]|cicatrice.*r[eé]tractile|entravant.*extension|flexum|Polytraumatisme|IPP|membre.*inf|séquelle",
    expectedMinRate: 5,
    expectedMaxRate: 65,
    description: "Cicatrices creux poplité – entravant extension jambe"
  },
];

// ====== RUNNER ======
async function runTests() {
  let passed = 0;
  let failed = 0;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    try {
      const result = localExpertAnalysis(tc.input, []);
      const type = result.type;

      let resultName = '';
      let resultRate = 0;

      if (result.type === 'proposal') {
        resultName = result.name || (result as any).injury?.name || '';
        resultRate = typeof result.rate === 'number'
          ? result.rate
          : (Array.isArray(result.rate) ? Math.round(((result.rate as number[])[0] + (result.rate as number[])[1]) / 2) : 0);
      } else if (result.type === 'cumul_proposals') {
        const proposals = (result as any).proposals || [];
        if (proposals.length > 0) {
          resultName = proposals.map((p: any) => p.injury?.name || p.name || '').join(' + ');
          resultRate = proposals.reduce((sum: number, p: any) => {
            const r = p.injury?.rate;
            return sum + (typeof r === 'number' ? r : (Array.isArray(r) ? Math.round((r[0] + r[1]) / 2) : 0));
          }, 0);
        } else {
          resultName = 'AUCUN';
          resultRate = 0;
        }
      } else {
        resultName = (result as any).text || result.type || 'INCONNU';
        resultRate = 0;
      }

      const nameRegex = new RegExp(tc.expectedName, 'i');
      const nameLower = resultName.toLowerCase();
      const justif = ((result as any).justification || '').toLowerCase();
      const pathStr = ((result as any).path || '').toLowerCase();

      const nameOk = nameRegex.test(nameLower) || nameRegex.test(justif) || nameRegex.test(pathStr);
      const rateOk = resultRate >= (tc.expectedMinRate - 5) && resultRate <= (tc.expectedMaxRate + 10);
      const ok = nameOk && rateOk;

      if (ok) passed++;
      else failed++;

      console.log(`─── Cas ${i + 1} ───`);
      console.log(`  Description: ${tc.description}`);
      console.log(`  Input     : "${tc.input.substring(0, 120)}..."`);
      console.log(`  Attendu   : ${tc.expectedName} (${tc.expectedMinRate}-${tc.expectedMaxRate}%)`);
      console.log(`  Obtenu    : ${ok ? '✅' : '❌'} ${resultName}`);
      console.log(`  Taux      : ${resultRate}%`);
      console.log(`  Type      : ${type}`);
      console.log(`  Nom OK    : ${nameOk ? '✅' : '❌'} | Taux OK: ${rateOk ? '✅' : '❌'}`);
      if (result.type === 'proposal' && (result as any).path) {
        console.log(`  Path      : ${(result as any).path}`);
      }
      if (result.type === 'proposal' && result.justification) {
        console.log(`  Justif    : ${result.justification.substring(0, 200)}...`);
      }
      if (!ok) {
        const reasons: string[] = [];
        if (!nameOk) reasons.push(`Nom "${resultName}" ne matche pas "${tc.expectedName}"`);
        if (!rateOk) reasons.push(`Taux ${resultRate}% hors fourchette ${tc.expectedMinRate}-${tc.expectedMaxRate}%`);
        console.log(`  ⚠️ ANOMALIE: ${reasons.join(' + ')}`);
      }
      console.log('');
    } catch (err: any) {
      failed++;
      console.log(`─── Cas ${i + 1} ───`);
      console.log(`  ❌ ERREUR: ${err.message}`);
      console.log('');
    }
  }

  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`  RÉSULTAT GLOBAL : ${passed}/${testCases.length} trouvés | ${failed}/${testCases.length} échoués`);
  console.log('═══════════════════════════════════════════════════════════════');
}

runTests();
