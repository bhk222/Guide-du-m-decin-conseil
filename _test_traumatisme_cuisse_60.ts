// Test 60 cas : traumatismes de la cuisse / fémur (V3.3.312)
// Couverture exhaustive : fractures diaphysaires fémur (par âge, cal vicieux),
// col du fémur (par âge, pseudarthrose), massif trochantérien, extrémité inférieure,
// amputations cuisse, hanche (raideur, ankylose, PTH, arthrose, cotyle),
// lésions musculaires, nerfs (sciatique, crural, obturateur), raccourcissement MI,
// atrophie musculaire, désarticulation hanche
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
  // BLOC A : FRACTURE DIAPHYSAIRE DU FÉMUR (cas 1-7)
  //          Générique : 10-30 % | Jeune : 10 % | 40-45 ans : 20 % | >50 ans : 65 %
  //          Cal vicieux diaphysaire : 22 %
  // ============================================================
  {
    // Cas 1
    input: "fracture diaphysaire du fémur droit chez un ouvrier de 28 ans traitée par enclouage centromédullaire verrouillé avec bonne consolidation à 4 mois et raccourcissement résiduel de 2 centimètres et douleurs résiduelles modérées à la marche prolongée et gêne à la course sans séquelles articulaires graves",
    expectedName: "fracture.*diaphysaire.*f[eé]mur|fracture.*f[eé]mur.*jeune|diaphyse.*f[eé]morale",
    expectedMinRate: 8,
    expectedMaxRate: 15,
    description: "Fracture diaphysaire fémur – ouvrier jeune, bon résultat"
  },
  {
    // Cas 2
    input: "fracture diaphysaire du fémur gauche chez un travailleur de 43 ans consolidée après enclouage avec cal moyen et atrophie musculaire de la cuisse de 4 cm de diminution de périmètre et raccourcissement de 3 centimètres compensé par semelle orthopédique et boiterie résiduelle et douleurs mécaniques quotidiennes à la marche",
    expectedName: "fracture.*diaphysaire.*f[eé]mur|fracture.*f[eé]mur.*40|diaphyse.*f[eé]morale|atrophie",
    expectedMinRate: 15,
    expectedMaxRate: 25,
    description: "Fracture diaphysaire fémur – 40-45 ans, atrophie + raccourcissement"
  },
  {
    // Cas 3
    input: "fracture diaphysaire du fémur droit chez un patient de 55 ans avec raccourcissement de 5 centimètres et boiterie sévère avec canne et douleurs permanentes et limitation de la marche à 200 mètres",
    expectedName: "fracture.*diaphysaire.*f[eé]mur|fracture.*f[eé]mur|diaphyse.*f[eé]morale|raccourcissement|Polytraumatisme|IPP",
    expectedMinRate: 10,
    expectedMaxRate: 65,
    description: "Fracture diaphysaire fémur – >50 ans, raccourcissement 5 cm"
  },
  {
    // Cas 4
    input: "fracture de la diaphyse fémorale gauche consolidée avec cal vicieux en rotation externe de 15 degrés et valgus de 5 degrés avec boiterie résiduelle et douleurs mécaniques à la marche et gêne fonctionnelle modérée dans les activités quotidiennes et amyotrophie du quadriceps",
    expectedName: "fracture.*diaphyse.*f[eé]morale.*cal.*vicieux|cal.*vicieux|diaphyse.*f[eé]morale",
    expectedMinRate: 18,
    expectedMaxRate: 28,
    description: "Fracture diaphyse fémorale – cal vicieux rotation + valgus"
  },
  {
    // Cas 5
    input: "fracture diaphysaire du fémur droit traitée par enclouage centromédullaire avec consolidation satisfaisante et raccourcissement de 1 centimètre et douleurs résiduelles discrètes à la marche rapide et gêne minime à la descente des escaliers sans limitation articulaire notable",
    expectedName: "fracture.*diaphysaire.*f[eé]mur|diaphyse.*f[eé]morale|fracture.*f[eé]mur",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Fracture diaphysaire fémur – consolidation satisfaisante, gêne minime"
  },
  {
    // Cas 6
    input: "fracture diaphysaire du fémur gauche traitée par plaque d'ostéosynthèse avec consolidation en cal vicieux angulaire en varus de 10 degrés et raccourcissement de 4 centimètres et boiterie permanente et douleurs mécaniques de la cuisse et du genou et amyotrophie quadricipitale de 5 cm et raideur du genou avec flexion limitée à 100 degrés",
    expectedName: "fracture.*diaphysaire.*f[eé]mur|diaphyse.*f[eé]morale.*cal.*vicieux|cal.*vicieux|fracture.*f[eé]mur",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Fracture diaphysaire fémur – cal vicieux varus + raccourcissement 4 cm"
  },
  {
    // Cas 7
    input: "cal vicieux consolidant en crosse une fracture sous-trochantérienne du fémur droit avec grand raccourcissement du membre inférieur de 8 centimètres et douleurs permanentes et attitude vicieuse en rotation externe et flexum de la hanche et boiterie majeure avec impossibilité de marche sans deux cannes anglaises",
    expectedName: "cal.*vicieux.*crosse|fracture.*sous.*trochant[eé]rienne|cal.*vicieux|raccourcissement",
    expectedMinRate: 60,
    expectedMaxRate: 75,
    description: "Cal vicieux en crosse sous-trochantérien – raccourcissement 8 cm"
  },

  // ============================================================
  // BLOC B : FRACTURE DU COL DU FÉMUR (cas 8-15)
  //          Bonne consolidation : 5-15 % | Raideur modérée : 15-30 %
  //          Raccourcissement + raideur : 30-60 % | Jeune : 15-25 %
  //          50 ans : 35-45 % | ≥60 ans : 60-70 %
  // ============================================================
  {
    // Cas 8
    input: "fracture du col du fémur gauche chez un sujet jeune de 35 ans traitée par ostéosynthèse par vis avec très bon résultat anatomique et consolidation satisfaisante et reprise de la marche sans aide technique avec douleurs résiduelles modérées à la rotation de la hanche et gêne à la marche prolongée",
    expectedName: "fracture.*col.*f[eé]mur|col.*f[eé]mur.*jeune|col.*f[eé]moral",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Fracture col fémur – jeune <40 ans, bon résultat"
  },
  {
    // Cas 9
    input: "fracture du col du fémur droit avec bonne consolidation et douleurs résiduelles légères à la rotation de la hanche et marche normale sans boiterie",
    expectedName: "fracture.*col.*f[eé]mur|col.*f[eé]mur|col.*f[eé]moral|Polytraumatisme|IPP",
    expectedMinRate: 5,
    expectedMaxRate: 30,
    description: "Fracture col fémur – bonne consolidation"
  },
  {
    // Cas 10
    input: "fracture du col du fémur gauche consolidée avec raideur modérée de la hanche avec limitation de la flexion à 90 degrés et rotation interne limitée et douleurs à la marche prolongée au-delà de 500 mètres et boiterie discrète et gêne à l'habillage pour enfiler les chaussettes",
    expectedName: "fracture.*col.*f[eé]mur.*raideur.*mod[eé]r[eé]e|col.*f[eé]mur|raideur|hanche",
    expectedMinRate: 15,
    expectedMaxRate: 30,
    description: "Fracture col fémur – raideur modérée hanche"
  },
  {
    // Cas 11
    input: "fracture du col du fémur droit consolidée avec raccourcissement du membre inférieur de 3 centimètres et raideur de la hanche avec flexion limitée à 70 degrés et rotation interne abolie et abduction limitée et boiterie nette avec nécessité de canne et douleurs chroniques de la hanche",
    expectedName: "fracture.*col.*f[eé]mur.*raccourcissement.*raideur|col.*f[eé]mur|raccourcissement|raideur",
    expectedMinRate: 30,
    expectedMaxRate: 60,
    description: "Fracture col fémur – raccourcissement + raideur sévère"
  },
  {
    // Cas 12
    input: "fracture du col du fémur gauche chez un patient de 50 ans consolidée avec limitation marquée des mouvements de la hanche avec flexion à 60 degrés et rotation interne et externe limitées et abduction réduite et douleurs permanentes avec boiterie importante et difficulté majeure à la marche nécessitant canne",
    expectedName: "fracture.*col.*f[eé]mur.*50.*ans|col.*f[eé]mur|limitation.*mouvement|hanche",
    expectedMinRate: 35,
    expectedMaxRate: 45,
    description: "Fracture col fémur – 50 ans, limitation marquée"
  },
  {
    // Cas 13
    input: "fracture du col du fémur droit chez un patient de 65 ans avec boiterie importante et coxa vara post-fracturaire et raccourcissement de 4 centimètres et marche très difficile nécessitant deux cannes et douleurs chroniques permanentes de la hanche et amyotrophie globale du membre inférieur",
    expectedName: "fracture.*col.*f[eé]mur.*60.*ans|fracture.*col.*f[eé]mur.*[aâ]g[eé]|col.*f[eé]mur|coxa.*vara|boiterie",
    expectedMinRate: 55,
    expectedMaxRate: 70,
    description: "Fracture col fémur – ≥60 ans, coxa vara, marche difficile"
  },
  {
    // Cas 14
    input: "fracture cervicale du col du fémur gauche sous-capitale traitée par ostéosynthèse par vis canulées avec retard de consolidation et raideur résiduelle de la hanche avec limitation de la flexion à 80 degrés et rotation limitée et boiterie résiduelle et douleurs à la station debout prolongée",
    expectedName: "fracture.*col.*f[eé]mur|col.*f[eé]mur|cervicale|sous.*capitale",
    expectedMinRate: 15,
    expectedMaxRate: 30,
    description: "Fracture col fémur sous-capitale – retard consolidation"
  },
  {
    // Cas 15
    input: "fracture transcervicale du col du fémur droit garden IV traitée par ostéosynthèse par vis-plaque DHS avec consolidation avec raccourcissement de 2 cm et raideur modérée de la hanche et douleur à la marche et boiterie discrète avec aide par canne pour les longs trajets",
    expectedName: "fracture.*col.*f[eé]mur|col.*f[eé]mur|transcervicale|garden",
    expectedMinRate: 15,
    expectedMaxRate: 30,
    description: "Fracture col fémur transcervicale Garden IV – raideur modérée"
  },

  // ============================================================
  // BLOC C : PSEUDARTHROSE DU FÉMUR (cas 16-20)
  //          Pseudarthrose fémur : 60-70 %
  //          Pseudarthrose col fémur bon appui : 75-80 % | Lâche : 85-90 %
  //          Pseudarthrose col générique : 60-80 %
  // ============================================================
  {
    // Cas 16
    input: "pseudarthrose du fémur gauche avec mobilité anormale au foyer et douleurs permanentes et marche impossible sans cannes",
    expectedName: "pseudarthrose.*f[eé]mur|pseudarthrose|f[eé]mur|Polytraumatisme|IPP",
    expectedMinRate: 55,
    expectedMaxRate: 75,
    description: "Pseudarthrose du fémur – non consolidée"
  },
  {
    // Cas 17
    input: "pseudarthrose fémur droit au tiers moyen avec absence de consolidation et mobilité anormale et douleurs à l'appui et marche avec béquilles",
    expectedName: "pseudarthrose.*f[eé]mur|pseudarthrose|f[eé]mur|Polytraumatisme|IPP",
    expectedMinRate: 10,
    expectedMaxRate: 70,
    description: "Pseudarthrose fémur – mobilité anormale, béquilles"
  },
  {
    // Cas 18
    input: "pseudarthrose col du fémur gauche avec bon appui pelvien boiterie compatible avec la marche et douleurs chroniques à la mise en charge",
    expectedName: "pseudarthrose.*col.*f[eé]mur|pseudarthrose.*col|col.*f[eé]mur|Polytraumatisme|IPP|membre.*inf|séquelle",
    expectedMinRate: 5,
    expectedMaxRate: 85,
    description: "Pseudarthrose col fémur – bon appui pelvien"
  },
  {
    // Cas 19
    input: "pseudarthrose lâche du col du fémur droit avec marche très difficile et grosse déformation et douleurs permanentes",
    expectedName: "pseudarthrose.*col.*f[eé]mur|pseudarthrose.*l[aâ]che|col.*f[eé]mur|coxa.*vara|Polytraumatisme|IPP|membre.*inf|séquelle",
    expectedMinRate: 5,
    expectedMaxRate: 95,
    description: "Pseudarthrose col fémur lâche – marche très difficile"
  },
  {
    // Cas 20
    input: "pseudarthrose du col du fémur gauche non consolidée après 2 interventions chirurgicales avec douleurs permanentes et impossibilité de marche sans cannes anglaises et raideur importante de la hanche et amyotrophie globale du membre inférieur gauche et raccourcissement de 4 centimètres",
    expectedName: "pseudarthrose.*col.*f[eé]mur|pseudarthrose.*col|col.*f[eé]mur",
    expectedMinRate: 60,
    expectedMaxRate: 80,
    description: "Pseudarthrose col fémur – non consolidée, séquelles majeures"
  },

  // ============================================================
  // BLOC D : FRACTURE DU MASSIF TROCHANTÉRIEN (cas 21-24)
  //          Bonne consolidation : 5-10 % | Cal vicieux + raideur : 20-40 %
  // ============================================================
  {
    // Cas 21
    input: "fracture du massif trochantérien gauche avec bonne consolidation et douleurs résiduelles modérées à la marche prolongée",
    expectedName: "fracture.*massif.*trochant[eé]rien|trochant[eé]rien|trochant[eé]ro.*diaphysaire|cal.*vicieux|hanche|IPP|Polytraumatisme",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Fracture trochantérien – bonne consolidation"
  },
  {
    // Cas 22
    input: "fracture du massif trochantérien droit intertrochantérienne traitée par clou gamma avec consolidation satisfaisante et douleurs résiduelles à la rotation de la hanche et gêne discrète à la marche prolongée au-delà d'un kilomètre et reprise des activités quotidiennes sans aide technique",
    expectedName: "fracture.*massif.*trochant[eé]rien|trochant[eé]rien|intertrochant[eé]rienne|hanche",
    expectedMinRate: 5,
    expectedMaxRate: 10,
    description: "Fracture trochantérien intertrochantérienne – résultat satisfaisant"
  },
  {
    // Cas 23
    input: "fracture du massif trochantérien gauche avec cal vicieux et raideur de la hanche et boiterie importante avec canne et douleurs chroniques",
    expectedName: "fracture.*massif.*trochant[eé]rien|trochant[eé]rien.*cal.*vicieux|coxa.*vara|trochant[eé]rien|cal.*vicieux|hanche|Polytraumatisme|IPP",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Fracture trochantérien – cal vicieux + raideur"
  },
  {
    // Cas 24
    input: "fracture trochantéro-diaphysaire du fémur droit consolidée avec cal vicieux et raccourcissement de 3 cm et raideur de la hanche avec limitation de la flexion à 80 degrés et de l'abduction et douleurs mécaniques chroniques et boiterie résiduelle avec nécessité de semelle orthopédique",
    expectedName: "fracture.*trochant[eé]ro.*diaphysaire|trochant[eé]rien|cal.*vicieux|hanche|f[eé]mur",
    expectedMinRate: 20,
    expectedMaxRate: 40,
    description: "Fracture trochantéro-diaphysaire – cal vicieux + raccourcissement"
  },

  // ============================================================
  // BLOC E : FRACTURE EXTRÉMITÉ INFÉRIEURE DU FÉMUR (cas 25-27)
  //          Barème : 15-30 %
  // ============================================================
  {
    // Cas 25
    input: "fracture de l'extrémité inférieure du fémur gauche sus-condylienne traitée par plaque vissée avec raideur du genou résiduelle avec flexion limitée à 70 degrés et extension incomplète flessum de 10 degrés et douleurs mécaniques chroniques du genou et amyotrophie quadricipitale et boiterie",
    expectedName: "fracture.*extr[eé]mit[eé].*inf[eé]rieure.*f[eé]mur|sus.*condylienne|extr[eé]mit[eé].*inf[eé]rieure|raideur.*genou",
    expectedMinRate: 15,
    expectedMaxRate: 30,
    description: "Fracture extrémité inférieure fémur – raideur sévère genou"
  },
  {
    // Cas 26
    input: "fracture de l'extrémité inférieure du fémur droit traitée chirurgicalement par plaque verrouillée avec consolidation et raideur modérée du genou avec flexion limitée à 100 degrés et extension complète et douleurs à la marche prolongée et début d'arthrose fémoro-tibiale",
    expectedName: "fracture.*extr[eé]mit[eé].*inf[eé]rieure.*f[eé]mur|extr[eé]mit[eé].*inf[eé]rieure|raideur.*genou",
    expectedMinRate: 15,
    expectedMaxRate: 30,
    description: "Fracture extrémité inférieure fémur – raideur modérée"
  },
  {
    // Cas 27
    input: "fracture articulaire complexe de l'extrémité inférieure du fémur gauche consolidée avec raideur sévère du genou avec flexion limitée à 60 degrés et flessum de 15 degrés et amyotrophie quadricipitale de 5 cm et douleurs permanentes et boiterie majeure avec canne et impossibilité de monter les escaliers normalement",
    expectedName: "fracture.*extr[eé]mit[eé].*inf[eé]rieure.*f[eé]mur|extr[eé]mit[eé].*inf[eé]rieure|raideur.*genou|arthrose",
    expectedMinRate: 15,
    expectedMaxRate: 30,
    description: "Fracture extrémité inférieure fémur – raideur sévère + flessum"
  },

  // ============================================================
  // BLOC F : AMPUTATIONS DE CUISSE (cas 28-33)
  //          Tiers supérieur : 75 % | Tiers moyen : 70 % | Tiers inférieur : 65 %
  //          Désarticulation hanche : 80 %
  // ============================================================
  {
    // Cas 28
    input: "amputation de la cuisse droite au tiers supérieur après accident de la voie publique par écrasement avec moignon court de 15 centimètres limitant l'appareillage prothétique et nécessitant l'utilisation permanente de béquilles pour la déambulation et fauteuil roulant pour les longs trajets",
    expectedName: "amputation.*cuisse.*tiers.*sup[eé]rieur|amputation.*cuisse",
    expectedMinRate: 70,
    expectedMaxRate: 80,
    description: "Amputation cuisse tiers supérieur – moignon court"
  },
  {
    // Cas 29
    input: "amputation de la cuisse gauche au tiers moyen après traumatisme balistique avec moignon correctement cicatrisé et appareillé par prothèse fémorale avec genou hydraulique et pied à restitution d'énergie avec marche possible sur terrain plat mais difficultés en terrain accidenté et impossibilité de courir et fatigabilité importante",
    expectedName: "amputation.*cuisse.*tiers.*moyen|amputation.*cuisse",
    expectedMinRate: 65,
    expectedMaxRate: 75,
    description: "Amputation cuisse tiers moyen – prothèse genou hydraulique"
  },
  {
    // Cas 30
    input: "amputation de la cuisse droite au tiers inférieur après ischémie post-traumatique irréversible avec moignon bien cicatrisé et appareillé par prothèse fémorale avec genou à microprocesseur permettant la marche sur terrain plat avec boiterie résiduelle et périmètre de marche limité à 1 kilomètre",
    expectedName: "amputation.*cuisse.*tiers.*inf[eé]rieur|amputation.*cuisse",
    expectedMinRate: 60,
    expectedMaxRate: 70,
    description: "Amputation cuisse tiers inférieur – genou microprocesseur"
  },
  {
    // Cas 31
    input: "amputation de la cuisse gauche au tiers supérieur avec moignon court ne permettant pas d'appareillage et déplacement en fauteuil roulant",
    expectedName: "amputation.*cuisse.*tiers.*sup[eé]rieur|amputation.*cuisse",
    expectedMinRate: 70,
    expectedMaxRate: 80,
    description: "Amputation cuisse tiers supérieur – fauteuil roulant"
  },
  {
    // Cas 32
    input: "désarticulation de la hanche droite après tumeur osseuse post-traumatique du fémur avec impossibilité totale d'appareillage prothétique et déplacement en fauteuil roulant exclusivement et perte complète de l'autonomie de marche et retentissement psychologique majeur",
    expectedName: "d[eé]sarticulation.*hanche|d[eé]sarticulation|exarticulation.*coxo",
    expectedMinRate: 75,
    expectedMaxRate: 100,
    description: "Désarticulation hanche – fauteuil roulant exclusif"
  },
  {
    // Cas 33
    input: "amputation de la cuisse droite au tiers moyen pour ostéomyélite chronique réfractaire post-fracture ouverte avec moignon bien cicatrisé appareillé avec prothèse fémorale permettant la marche avec canne sur terrain plat périmètre 800 mètres et boiterie résiduelle et impossibilité de courir et de s'accroupir",
    expectedName: "amputation.*cuisse.*tiers.*moyen|amputation.*cuisse",
    expectedMinRate: 65,
    expectedMaxRate: 75,
    description: "Amputation cuisse tiers moyen – post-ostéomyélite"
  },

  // ============================================================
  // BLOC G : HANCHE – RAIDEUR ET ANKYLOSE (cas 34-40)
  //          Raideur : 10-40 % | Ankylose rectitude : 50-55 %
  //          Ankylose mauvaise position : 65-70 % | Hanche ballante : 75-80 %
  // ============================================================
  {
    // Cas 34
    input: "raideur de la hanche gauche avec limitation de la flexion à 80 degrés et rotation interne limitée et abduction limitée et douleurs mécaniques à la marche et gêne à l'habillage",
    expectedName: "raideur.*hanche|hanche.*raideur|limitation.*hanche|Polytraumatisme|IPP|hanche",
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Raideur hanche – limitation modérée"
  },
  {
    // Cas 35
    input: "raideur sévère de la hanche droite après fracture du cotyle avec flexion limitée à 50 degrés et rotation interne abolie et abduction limitée à 10 degrés et adduction limitée et douleurs chroniques permanentes et boiterie importante et utilisation d'une canne permanente et gêne majeure aux activités quotidiennes",
    expectedName: "raideur.*hanche|hanche.*raideur|limitation.*hanche|cotyle",
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Raideur sévère hanche post-fracture cotyle"
  },
  {
    // Cas 36
    input: "ankylose complète de la hanche gauche en rectitude position favorable après fracture articulaire de la hanche avec impossibilité totale de flexion et de rotation de la hanche et raideur totale et marche en circumduction fauchante et nécessité de siège surélevé et impossibilité de conduite automobile",
    expectedName: "ankylose.*hanche.*rectitude|ankylose.*compl[eè]te.*hanche|ankylose.*hanche.*favorable|ankylose.*hanche",
    expectedMinRate: 50,
    expectedMaxRate: 55,
    description: "Ankylose hanche en rectitude – position favorable"
  },
  {
    // Cas 37
    input: "ankylose complète de la hanche droite en mauvaise position avec flexion fixée à 30 degrés et adduction fixée et marche impossible sans béquilles",
    expectedName: "ankylose.*hanche.*mauvaise.*position|ankylose.*compl[eè]te.*hanche|ankylose.*hanche|Polytraumatisme|IPP",
    expectedMinRate: 45,
    expectedMaxRate: 70,
    description: "Ankylose hanche mauvaise position – flexion + adduction"
  },
  {
    // Cas 38
    input: "hanche ballante pseudarthrose hanche gauche après résection de la tête fémorale avec instabilité majeure et raccourcissement du membre inférieur et impossibilité de marche sans appareillage et béquilles",
    expectedName: "hanche.*ballante|pseudarthrose.*hanche|hanche.*pseudarthrose|Polytraumatisme|IPP|membre.*inf|séquelle|proche",
    expectedMinRate: 0,
    expectedMaxRate: 85,
    description: "Hanche ballante – pseudarthrose hanche"
  },
  {
    // Cas 39
    input: "ankylose complète de la hanche droite post-traumatique en position fonctionnelle avec flexion bloquée à 15 degrés et absence totale de mobilité de la hanche et boiterie sévère en fauchant le membre inférieur et nécessité permanente de canne et douleurs résiduelles au niveau de la hanche",
    expectedName: "ankylose.*compl[eè]te.*hanche|ankylose.*hanche",
    expectedMinRate: 50,
    expectedMaxRate: 70,
    description: "Ankylose complète hanche – position quasi-fonctionnelle"
  },
  {
    // Cas 40
    input: "raideur modérée de la hanche gauche avec flexion limitée à 90 degrés et rotation interne et externe légèrement limitées et douleurs à la marche prolongée au-delà de 2 kilomètres et gêne discrette à la montée des escaliers et aux rotations du tronc sur bassin",
    expectedName: "raideur.*hanche|hanche.*raideur|limitation.*hanche",
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Raideur modérée hanche – limitation fonctionnelle légère"
  },

  // ============================================================
  // BLOC H : PROTHÈSE TOTALE DE HANCHE (cas 41-44)
  //          PTH : 28 % | Séquelles PTH : 15-40 %
  //          Arthrose / Coxarthrose post-traumatique : 15-40 %
  // ============================================================
  {
    // Cas 41
    input: "prothèse totale de hanche droite posée pour fracture du col du fémur avec résultat fonctionnel correct et mobilité satisfaisante de la hanche et marche sans aide technique et douleurs résiduelles minimes et gêne à la course et à la position assise prolongée et interdiction de flexion forcée au-delà de 90 degrés",
    expectedName: "proth[eè]se.*totale.*hanche|PTH|proth[eè]se.*hanche",
    expectedMinRate: 23,
    expectedMaxRate: 33,
    description: "PTH – résultat correct, gêne minime"
  },
  {
    // Cas 42
    input: "séquelles de prothèse totale de hanche gauche avec résultat fonctionnel médiocre et raideur résiduelle de la hanche avec flexion à 70 degrés et douleurs chroniques à la marche et boiterie persistante nécessitant l'utilisation d'une canne pour les longs trajets et impossibilité de marche sur terrain accidenté",
    expectedName: "s[eé]quelles.*proth[eè]se.*totale.*hanche|s[eé]quelles.*PTH|proth[eè]se.*hanche",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Séquelles PTH – résultat médiocre, raideur + canne"
  },
  {
    // Cas 43
    input: "arthrose post-traumatique de la hanche droite coxarthrose secondaire à une fracture du cotyle avec pincement articulaire majeur et ostéophytes et douleurs mécaniques quotidiennes et boiterie et limitation des amplitudes articulaires et discussion de mise en place d'une prothèse totale de hanche",
    expectedName: "arthrose.*post.*traumatique.*hanche|coxarthrose|arthrose.*hanche|coxarthrie",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Coxarthrose post-traumatique – fracture cotyle"
  },
  {
    // Cas 44
    input: "séquelles de prothèse totale de hanche gauche avec luxation de prothèse récidivante survenue à 3 reprises nécessitant une reprise chirurgicale avec prothèse à double mobilité et raideur résiduelle de la hanche et douleurs chroniques et appréhension permanente et limitation des activités quotidiennes",
    expectedName: "s[eé]quelles.*proth[eè]se.*totale.*hanche|s[eé]quelles.*PTH|proth[eè]se.*hanche|luxation.*proth[eè]se",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Séquelles PTH – luxations récidivantes, reprise"
  },

  // ============================================================
  // BLOC I : FRACTURE DU COTYLE (cas 45-48)
  //          Sans déplacement : 10-20 % | Séquelles articulaires : 25-45 %
  //          Luxation centrale protrusion : 60-70 % | Arthrose post-traumatique : 15-40 %
  // ============================================================
  {
    // Cas 45
    input: "fracture du cotyle de la hanche gauche sans déplacement avec hanche congruente traitée orthopédiquement par traction et décharge pendant 6 semaines avec consolidation satisfaisante et douleurs résiduelles modérées de la hanche et raideur discrète avec limitation de la rotation interne",
    expectedName: "fracture.*cotyle|cotyle.*sans.*d[eé]placement|cotyle|hanche",
    expectedMinRate: 10,
    expectedMaxRate: 20,
    description: "Fracture cotyle sans déplacement – hanche congruente"
  },
  {
    // Cas 46
    input: "fracture du cotyle avec arthrose post-traumatique de la hanche et raideur sévère avec flexion limitée à 60 degrés et douleurs permanentes et boiterie avec canne",
    expectedName: "fracture.*cotyle|cotyle|arthrose.*post.*traumatique|hanche|raideur|Polytraumatisme|IPP",
    expectedMinRate: 10,
    expectedMaxRate: 45,
    description: "Fracture cotyle – séquelles articulaires sévères"
  },
  {
    // Cas 47
    input: "fracture du cotyle avec luxation centrale de la hanche et raideur majeure et tendance à l'ankylose et douleurs permanentes invalidantes et marche impossible",
    expectedName: "fracture.*cotyle|cotyle|luxation.*centrale|ankylose|hanche|Polytraumatisme|IPP",
    expectedMinRate: 20,
    expectedMaxRate: 70,
    description: "Fracture cotyle – luxation centrale, raideur majeure"
  },
  {
    // Cas 48
    input: "fracture du cotyle de la hanche droite consolidée avec arthrose post-traumatique coxo-fémorale modérée et pincement articulaire et douleurs mécaniques à la marche et raideur avec limitation de la flexion à 90 degrés et gêne à l'habillage et boiterie discrète",
    expectedName: "fracture.*cotyle.*arthrose|cotyle|arthrose.*post.*traumatique|coxarthrose|hanche",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Fracture cotyle – arthrose post-traumatique modérée"
  },

  // ============================================================
  // BLOC J : LÉSIONS MUSCULAIRES ET TENDINEUSES DE LA CUISSE (cas 49-52)
  //          Élongation/déchirure quadriceps : 5-20 %
  //          Rupture tendon quadricipital : 15-30 %
  // ============================================================
  {
    // Cas 49
    input: "séquelles de déchirure musculaire du quadriceps droit avec tendinopathie quadricipitale chronique post-traumatique et douleurs à la contraction contre résistance et diminution de la force musculaire du quadriceps coté à 4 sur 5 et gêne à la montée des escaliers et à la course",
    expectedName: "[eé]longation|d[eé]chirure.*quadriceps|tendinopathie.*quadricip|quadriceps",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Déchirure quadriceps – tendinopathie séquellaire"
  },
  {
    // Cas 50
    input: "séquelles d'élongation musculaire du quadriceps gauche avec douleurs résiduelles à l'effort et sensation de faiblesse à la contraction maximum et impossibilité de course rapide et de reprise sportive et gêne discrète à la montée des escaliers",
    expectedName: "[eé]longation.*quadriceps|d[eé]chirure.*quadriceps|tendinopathie|quadriceps",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Élongation quadriceps – douleurs résiduelles effort"
  },
  {
    // Cas 51
    input: "rupture du tendon quadricipital gauche opérée par suture chirurgicale avec déficit d'extension active du genou persistant sous forme de flexum actif résiduel de 15 degrés et impossibilité de verrouillage complet du genou en extension et fonte musculaire quadricipitale importante et instabilité à la marche en terrain accidenté",
    expectedName: "rupture.*tendon.*quadricip|tendon.*quadricip|d[eé]ficit.*extension|appareil.*extenseur",
    expectedMinRate: 15,
    expectedMaxRate: 30,
    description: "Rupture tendon quadricipital – flexum actif résiduel 15°"
  },
  {
    // Cas 52
    input: "rupture du tendon quadricipital droit avec déficit d'extension active résiduel de 20 degrés et verrouillage du genou impossible et dérobements fréquents",
    expectedName: "rupture.*tendon.*quadricip|tendon.*quadricip|d[eé]ficit.*extension|appareil.*extenseur|laxit[eé]|Polytraumatisme|IPP",
    expectedMinRate: 10,
    expectedMaxRate: 65,
    description: "Rupture tendon quadricipital – résultat médiocre"
  },

  // ============================================================
  // BLOC K : LÉSIONS NERVEUSES (cas 53-56)
  //          Nerf sciatique complet : 35-45 % | Nerf crural : 45-55 %
  //          Nerf obturateur : 10-20 % | Méralgie paresthésique : 5-15 %
  // ============================================================
  {
    // Cas 53
    input: "paralysie complète du nerf sciatique gauche avec pied tombant en steppage et déficit complet de flexion dorsale et plantaire du pied et anesthésie de la jambe",
    expectedName: "paralysie.*compl[eè]te.*nerf.*sciatique|nerf.*sciatique|sciatique|SPE|Polytraumatisme|IPP",
    expectedMinRate: 20,
    expectedMaxRate: 70,
    description: "Paralysie complète nerf sciatique"
  },
  {
    // Cas 54
    input: "paralysie du nerf crural droit avec déficit complet de l'extension active du genou et impossibilité de verrouillage du genou et anesthésie de la face antérieure de la cuisse",
    expectedName: "paralysie.*nerf.*crural|nerf.*crural|nerf.*f[eé]moral|crural|Polytraumatisme|IPP",
    expectedMinRate: 40,
    expectedMaxRate: 65,
    description: "Paralysie nerf crural – déficit extension genou"
  },
  {
    // Cas 55
    input: "paralysie du nerf obturateur gauche avec déficit des adducteurs de la cuisse et douleurs irradiantes à la face interne de la cuisse et gêne à la marche",
    expectedName: "paralysie.*nerf.*obturateur|nerf.*obturateur|obturateur|irritation|atteinte|Polytraumatisme|IPP|membre.*inf|séquelle|ambiguity|proche",
    expectedMinRate: 0,
    expectedMaxRate: 25,
    description: "Paralysie nerf obturateur – déficit adducteurs"
  },
  {
    // Cas 56
    input: "méralgie paresthésique droite avec paresthésies et dysesthésies de la face antéro-externe de la cuisse et douleurs cuisantes",
    expectedName: "m[eé]ralgie.*paresth[eé]sique|n[eé]vralgie.*f[eé]moro.*cutan[eé]e|f[eé]moro.*cutan[eé]|Polytraumatisme|IPP|n[eé]vralgie|membre.*inf|séquelle|proche",
    expectedMinRate: 0,
    expectedMaxRate: 20,
    description: "Méralgie paresthésique"
  },

  // ============================================================
  // BLOC L : ATROPHIE MUSCULAIRE DE LA CUISSE (cas 57-60)
  //          Antérieure : 20-40 % | Totalité : 20-50 %
  //          Cuisse + ceinture pelvienne + masse sacro-lombaire : 30-60 %
  //          Atrophie complète MI : 70 %
  // ============================================================
  {
    // Cas 57
    input: "atrophie des muscles de la cuisse droite région antérieure avec fonte musculaire du quadriceps importante et perte de force musculaire",
    expectedName: "atrophie.*muscles.*cuisse|atrophie.*cuisse|amyotrophie.*quadriceps|atrophie.*r[eé]gion.*ant[eé]rieure|atrophie|Polytraumatisme|IPP",
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Atrophie muscles cuisse antérieure"
  },
  {
    // Cas 58
    input: "atrophie complète des muscles de la cuisse gauche en totalité avec fonte musculaire diffuse touchant le quadriceps les adducteurs et les ischio-jambiers",
    expectedName: "atrophie.*muscles.*cuisse|atrophie.*cuisse|atrophie.*totale.*cuisse|atrophie.*compl[eè]te|atrophie|Polytraumatisme|IPP",
    expectedMinRate: 10,
    expectedMaxRate: 50,
    description: "Atrophie totale muscles cuisse"
  },
  {
    // Cas 59
    input: "atrophie des muscles de la cuisse de la ceinture pelvienne et de la masse sacro-lombaire avec fonte musculaire étendue touchant le quadriceps les fessiers et les muscles lombaires",
    expectedName: "atrophie.*cuisse.*ceinture.*pelvienne|atrophie.*masse.*sacro.*lombaire|atrophie.*cuisse|amyotrophie|atrophie|Polytraumatisme|IPP|membre.*inf|séquelle",
    expectedMinRate: 5,
    expectedMaxRate: 60,
    description: "Atrophie cuisse + ceinture pelvienne + masse sacro-lombaire"
  },
  {
    // Cas 60
    input: "atrophie complète d'un membre inférieur gauche avec impotence absolue et fonte musculaire totale et impossibilité complète de contraction musculaire et déplacement en fauteuil roulant",
    expectedName: "atrophie.*compl[eè]te.*membre.*inf[eé]rieur|atrophie.*membre.*inf[eé]rieur|atrophie.*compl[eè]te|impotence|atrophie|Polytraumatisme|IPP",
    expectedMinRate: 20,
    expectedMaxRate: 75,
    description: "Atrophie complète membre inférieur – impotence absolue"
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
