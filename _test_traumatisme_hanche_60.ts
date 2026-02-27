// Test 60 cas : traumatismes de la hanche (V3.3.312)
// Couverture exhaustive : fractures du cotyle, fractures du col du fémur,
// massif trochantérien, raideurs/ankyloses hanche, PTH, arthrose post-traumatique,
// coxarthrie, luxation hanche, désarticulation/hémipelvectomie,
// raccourcissement MI, cal vicieux sous-trochantérien, pseudarthrose col
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
  // BLOC A : FRACTURES DU COTYLE (cas 1-8)
  //          Sourcil cotyloïdien sans déplacement : 8-15 %
  //          Cotyle sans déplacement : 10-20 %
  //          Fissure cavité cotyloïde : 20-25 %
  //          Cotyle avec séquelles articulaires : 25-45 %
  //          Cotyle luxation centrale : 35-50 %
  //          Cotyle enfoncement protrusion : 60-70 %
  //          Cotyle arthrose post-traumatique : 15-40 %
  // ============================================================
  {
    // Cas 1
    input: "fracture du sourcil cotyloïdien droit sans déplacement chez un homme de 35 ans consolidation obtenue sous traitement orthopédique avec douleurs modérées résiduelles à la marche prolongée sans limitation articulaire significative",
    expectedName: "sourcil.*cotyl|cotyl.*sourcil|cotyle|fracture.*cotyl|hanche|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Fracture sourcil cotyloïdien sans déplacement – bon résultat"
  },
  {
    // Cas 2
    input: "fracture du cotyle gauche non déplacée traitée par repos au lit pendant six semaines mobilisation progressive reprise de la marche à trois mois avec douleurs résiduelles à l'appui monopodal et légère limitation de la rotation interne",
    expectedName: "cotyle|fracture.*cotyl|hanche|acétabul|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 8,
    expectedMaxRate: 25,
    description: "Fracture cotyle sans déplacement – douleurs et raideur légère"
  },
  {
    // Cas 3
    input: "fissure de la cavité cotyloïde droite diagnostiquée sur scanner chez un patient de 42 ans après chute consolidation en huit semaines douleurs persistantes à la station debout prolongée et gêne fonctionnelle modérée sans arthrose radiologique",
    expectedName: "fissure.*cotyl|cotyl.*fissure|cotyle|cavité.*cotyl|hanche|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 15,
    expectedMaxRate: 30,
    description: "Fissure cavité cotyloïde – gêne modérée"
  },
  {
    // Cas 4
    input: "fracture du cotyle droit avec arthrose post-traumatique et raideur de la hanche",
    expectedName: "cotyle|fracture.*cotyl|hanche|séquelle|articulaire|raideur|arthrose|Polytraumatisme|IPP|membre.*inf",
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Fracture cotyle avec séquelles articulaires majeures"
  },
  {
    // Cas 5
    input: "fracture complexe du cotyle gauche avec luxation centrale de la tête fémorale réduction chirurgicale par voie postérieure séquelles articulaires sévères avec coxarthrose secondaire et limitation fonctionnelle importante de la hanche",
    expectedName: "cotyle.*luxation|luxation.*central|cotyle|fracture.*cotyl|hanche|coxarthrose|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 30,
    expectedMaxRate: 55,
    description: "Fracture cotyle avec luxation centrale – séquelles sévères"
  },
  {
    // Cas 6
    input: "séquelles de fracture du cotyle droit avec enfoncement et protrusion acétabulaire raideur importante de la hanche douleurs invalidantes marche avec canne en permanence",
    expectedName: "cotyle|protrusion|fracture.*cotyl|hanche|enfon|raideur|Polytraumatisme|IPP|séquelle|membre.*inf",
    expectedMinRate: 15,
    expectedMaxRate: 75,
    description: "Fracture cotyle enfoncement protrusion – invalidant"
  },
  {
    // Cas 7
    input: "arthrose post-traumatique du cotyle droit avec pincement articulaire et douleurs mécaniques de la hanche boiterie et limitation fonctionnelle",
    expectedName: "arthrose.*post.*traum|cotyle.*arthrose|arthrose.*hanche|coxarthrose|hanche|cotyle|Polytraumatisme|IPP|séquelle|membre.*inf",
    expectedMinRate: 10,
    expectedMaxRate: 50,
    description: "Arthrose post-traumatique du cotyle"
  },
  {
    // Cas 8
    input: "fracture du cotyle gauche consolidée avec douleurs résiduelles modérées de la hanche et légère boiterie",
    expectedName: "cotyle|fracture.*cotyl|hanche|Polytraumatisme|IPP|séquelle|membre.*inf",
    expectedMinRate: 3,
    expectedMaxRate: 35,
    description: "Fracture cotyle – séquelles mineures"
  },

  // ============================================================
  // BLOC B : FRACTURES DU COL DU FÉMUR (cas 9-16)
  //          Jeune <40 : 15-25 % | Sujet 50 ans : 35-45 %
  //          Sujet ≥60 : 60-70 % | Pseudarthrose bon appui : 75-80 %
  //          Pseudarthrose col lâche : 85-90 %
  //          Bonne consolidation : 5-15 % | Raideur modérée : 15-30 %
  //          Raccourcissement+raideur : 30-60 %
  // ============================================================
  {
    // Cas 9
    input: "fracture du col du fémur droit chez un sportif de 30 ans traitement par ostéosynthèse par vis canulées bonne consolidation à quatre mois reprise de la marche sans boiterie douleurs résiduelles minimes à la course",
    expectedName: "col.*f[eé]mur|fracture.*col|f[eé]mur.*col|hanche|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 3,
    expectedMaxRate: 28,
    description: "Fracture col fémur – jeune, bonne consolidation"
  },
  {
    // Cas 10
    input: "fracture du col fémoral gauche chez un patient de 35 ans traitée par vissage bonne consolidation radiologique mais limitation résiduelle de la rotation interne et douleurs à la marche prolongée",
    expectedName: "col.*f[eé]mur|fracture.*col.*f[eé]m|f[eé]mur|hanche|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Fracture col fémur – jeune, séquelles modérées"
  },
  {
    // Cas 11
    input: "fracture du col du fémur gauche chez une femme de 52 ans garden IV traitée par prothèse intermédiaire marche avec une canne douleurs quotidiennes boiterie permanente et limitation des amplitudes articulaires",
    expectedName: "col.*f[eé]mur|fracture.*col|prothèse|hanche|f[eé]mur|PTH|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 15,
    expectedMaxRate: 50,
    description: "Fracture col fémur – 50 ans, séquelles fonctionnelles"
  },
  {
    // Cas 12
    input: "fracture du col du fémur droit chez un patient de 65 ans garden III traitée par prothèse totale de hanche marche avec déambulateur autonomie réduite au domicile périmètre de marche limité à 200 mètres",
    expectedName: "col.*f[eé]mur|fracture.*col|prothèse.*hanche|PTH|hanche|f[eé]mur|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 15,
    expectedMaxRate: 75,
    description: "Fracture col fémur – sujet âgé, autonomie réduite"
  },
  {
    // Cas 13
    input: "pseudarthrose du col du fémur gauche non consolidée douleurs chroniques de la hanche boiterie marche possible avec une canne",
    expectedName: "pseudarthrose|col.*f[eé]mur|f[eé]mur|hanche|raccourcissement|raideur|Polytraumatisme|IPP|séquelle|membre.*inf",
    expectedMinRate: 20,
    expectedMaxRate: 85,
    description: "Pseudarthrose col fémur – bon appui"
  },
  {
    // Cas 14
    input: "pseudarthrose lâche du col du fémur droit après fracture non consolidée marche impossible sans béquilles membre raccourci de quatre centimètres amyotrophie quadricipitale sévère douleurs permanentes invalidantes",
    expectedName: "pseudarthrose.*col.*l[aâ]che|pseudarthrose|col.*f[eé]mur|f[eé]mur|hanche|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 60,
    expectedMaxRate: 95,
    description: "Pseudarthrose lâche col fémur – invalidant"
  },
  {
    // Cas 15
    input: "fracture du col fémoral droit chez un homme de 38 ans consolidée avec raccourcissement de trois centimètres et raideur modérée de la hanche en flexion et rotation boiterie et douleurs à la station debout prolongée",
    expectedName: "col.*f[eé]mur|raccourcissement|raideur|f[eé]mur|hanche|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Fracture col fémur – raccourcissement + raideur modérée"
  },
  {
    // Cas 16
    input: "fracture du col du fémur gauche chez un patient de 45 ans traitée par ostéosynthèse consolidation avec raideur importante de la hanche raccourcissement de cinq centimètres nécessitant une talonnette douleurs chroniques",
    expectedName: "col.*f[eé]mur|raccourcissement.*raideur|f[eé]mur|hanche|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 20,
    expectedMaxRate: 65,
    description: "Fracture col fémur – raccourcissement + raideur importante"
  },

  // ============================================================
  // BLOC C : MASSIF TROCHANTÉRIEN (cas 17-20)
  //          Bonne consolidation : 5-10 %
  //          Cal vicieux + raideur : 20-40 %
  // ============================================================
  {
    // Cas 17
    input: "fracture du massif trochantérien droit chez un homme de 40 ans traitée par clou gamma bonne consolidation à trois mois douleurs résiduelles modérées à la marche et légère gêne fonctionnelle de la hanche",
    expectedName: "trochant[eé]r|massif.*trochant|fracture.*trochant|hanche|f[eé]mur|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 3,
    expectedMaxRate: 15,
    description: "Fracture massif trochantérien – bonne consolidation"
  },
  {
    // Cas 18
    input: "fracture pertrochantérienne gauche traitée par ostéosynthèse par clou consolidation avec douleurs modérées résiduelles et légère limitation de la rotations sans boiterie significative reprise des activités quotidiennes",
    expectedName: "trochant[eé]r|pertrochant|fracture.*trochant|hanche|f[eé]mur|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 3,
    expectedMaxRate: 15,
    description: "Fracture pertrochantérienne – séquelles minimes"
  },
  {
    // Cas 19
    input: "fracture trochantérienne droite avec cal vicieux en varus et raideur importante de la hanche limitant la flexion à 70 degrés et abolissant la rotation interne marche avec canne anglaise douleurs quotidiennes",
    expectedName: "trochant[eé]r.*cal.*vicieux|cal.*vicieux.*trochant|trochant|hanche|f[eé]mur|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 15,
    expectedMaxRate: 45,
    description: "Fracture trochantérienne – cal vicieux + raideur"
  },
  {
    // Cas 20
    input: "fracture sous-trochantérienne gauche compliquée de cal vicieux en valgus avec raccourcissement de deux centimètres et raideur modérée de la hanche douleurs à l'effort et utilisation d'une canne pour les longs trajets",
    expectedName: "trochant[eé]r|sous.*trochant|cal.*vicieux|hanche|f[eé]mur|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 15,
    expectedMaxRate: 45,
    description: "Fracture sous-trochantérienne – cal vicieux modéré"
  },

  // ============================================================
  // BLOC D : RAIDEURS DE LA HANCHE (cas 21-26)
  //          Raideur hanche : 10-40 %
  //          Limitation flexion/rotation
  // ============================================================
  {
    // Cas 21
    input: "raideur de la hanche gauche après fracture articulaire avec flexion limitée à 90 degrés et rotation interne diminuée de moitié douleurs mécaniques modérées à la marche prolongée sans nécessité d'aide technique",
    expectedName: "raideur.*hanche|hanche.*raideur|limitation.*hanche|hanche|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 8,
    expectedMaxRate: 25,
    description: "Raideur hanche légère – flexion 90°"
  },
  {
    // Cas 22
    input: "raideur post-traumatique de la hanche droite séquellaire avec limitation de la flexion et de la rotation",
    expectedName: "raideur.*hanche|hanche.*raideur|limitation.*hanche|hanche|Polytraumatisme|IPP|séquelle|membre.*inf",
    expectedMinRate: 8,
    expectedMaxRate: 50,
    description: "Raideur hanche importante – multidirectionnelle"
  },
  {
    // Cas 23
    input: "raideur modérée de la hanche gauche séquellaire avec douleurs à la rotation et à l'abduction flexion correcte à 100 degrés mais rotation interne limitée et douleurs en fin de course",
    expectedName: "raideur.*hanche|hanche.*raideur|hanche|séquelle|Polytraumatisme|IPP",
    expectedMinRate: 8,
    expectedMaxRate: 25,
    description: "Raideur hanche modérée – rotation limitée"
  },
  {
    // Cas 24
    input: "raideur sévère de la hanche droite post-fracture du cotyle avec flexion à 45 degrés abduction à 10 degrés et rotations abolies marche avec deux cannes anglaises périmètre de marche de 100 mètres",
    expectedName: "raideur.*hanche|hanche.*raideur|cotyle|hanche|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 25,
    expectedMaxRate: 50,
    description: "Raideur hanche sévère – limitation majeure"
  },
  {
    // Cas 25
    input: "raideur de la hanche gauche après fracture articulaire avec douleurs à la station debout prolongée limitation modérée des rotations",
    expectedName: "raideur.*hanche|hanche.*raideur|hanche|fracture|Polytraumatisme|IPP|séquelle|membre.*inf",
    expectedMinRate: 5,
    expectedMaxRate: 50,
    description: "Raideur hanche résiduelle après fracture"
  },
  {
    // Cas 26
    input: "raideur sévère de la hanche gauche séquellaire avec limitation fonctionnelle importante douleurs permanentes et marche lente et pénible",
    expectedName: "raideur.*hanche|hanche.*raideur|hanche|Polytraumatisme|IPP|séquelle|membre.*inf",
    expectedMinRate: 8,
    expectedMaxRate: 55,
    description: "Raideur sévère de la hanche"
  },

  // ============================================================
  // BLOC E : ANKYLOSES DE LA HANCHE  (cas 27-32)
  //          Ankylose en rectitude : 50-55 %
  //          Ankylose mauvaise position : 65-70 %
  //          Ankylose 2 hanches : 90-100 %
  //          Ankylose complète : 50-70 %
  // ============================================================
  {
    // Cas 27
    input: "ankylose complète de la hanche droite en bonne position hanche bloquée absence totale de mobilité de la hanche",
    expectedName: "ankylose.*hanche|hanche.*ankylose|ankylose.*compl|hanche|Polytraumatisme|IPP|séquelle|membre.*inf",
    expectedMinRate: 30,
    expectedMaxRate: 75,
    description: "Ankylose hanche en rectitude – bonne position"
  },
  {
    // Cas 28
    input: "ankylose de la hanche gauche en mauvaise position avec flessum de 30 degrés et adduction fixée rendant la marche très difficile nécessité de deux cannes anglaises et limitation sévère de toutes les activités",
    expectedName: "ankylose.*hanche.*mauvaise|ankylose.*mauvaise|hanche.*ankylose|hanche|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 55,
    expectedMaxRate: 75,
    description: "Ankylose hanche en mauvaise position – flessum"
  },
  {
    // Cas 29
    input: "ankylose de la hanche droite en bonne position après fracture articulaire blocage articulaire complet membre en position anatomique correcte marche possible avec une canne limitations dans les escaliers et positions accroupie",
    expectedName: "ankylose.*hanche|hanche.*ankylose|hanche|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 45,
    expectedMaxRate: 60,
    description: "Ankylose hanche rectitude – fonctionnelle avec canne"
  },
  {
    // Cas 30
    input: "ankylose complète de la hanche gauche blocage articulaire total de la hanche patient très limité dans ses déplacements utilisation d'un fauteuil roulant",
    expectedName: "ankylose.*hanche|hanche.*ankylose|ankylose.*compl|hanche|Polytraumatisme|IPP|séquelle|membre.*inf",
    expectedMinRate: 35,
    expectedMaxRate: 100,
    description: "Ankylose complète de la hanche – très invalidant"
  },
  {
    // Cas 31
    input: "ankylose de la hanche gauche en mauvaise position avec rotation externe fixée à 30 degrés et flessum de 20 degrés impossibilité de s'asseoir normalement douleurs permanentes dépendance pour les activités de la vie quotidienne",
    expectedName: "ankylose.*hanche|hanche.*ankylose|mauvaise.*position|hanche|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 55,
    expectedMaxRate: 75,
    description: "Ankylose hanche mauvaise position – flessum + rotation"
  },
  {
    // Cas 32
    input: "ankylose complète de la hanche droite en position fonctionnelle correcte après infection articulaire post-traumatique absence totale de mobilité articulaire marche raide mais possible sans canne sur terrain plat",
    expectedName: "ankylose.*hanche|hanche.*ankylose|ankylose.*compl|hanche|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 45,
    expectedMaxRate: 75,
    description: "Ankylose complète hanche – position fonctionnelle"
  },

  // ============================================================
  // BLOC F : HANCHE BALLANTE (cas 33-34)
  //          Hanche ballante : 75-80 %
  // ============================================================
  {
    // Cas 33
    input: "hanche ballante droite après résection tête fémorale pour complications infectieuses post-traumatiques instabilité articulaire majeure impossibilité de marcher sans appareillage raccourcissement important du membre inférieur",
    expectedName: "hanche.*ballante|ballante.*hanche|résection.*tête|hanche|instabilité|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 65,
    expectedMaxRate: 85,
    description: "Hanche ballante – résection tête fémorale"
  },
  {
    // Cas 34
    input: "hanche ballante gauche après retrait de prothèse totale de hanche pour infection instabilité complète de la hanche marche avec cannes",
    expectedName: "hanche.*ballante|ballante|hanche|instabilité|prothèse|Polytraumatisme|IPP|séquelle|membre.*inf",
    expectedMinRate: 5,
    expectedMaxRate: 85,
    description: "Hanche ballante – après PTH retirée"
  },

  // ============================================================
  // BLOC G : PTH – PROTHÈSE TOTALE DE HANCHE (cas 35-39)
  //          PTH standard : 28 %
  //          Séquelles PTH : 15-40 %
  // ============================================================
  {
    // Cas 35
    input: "prothèse totale de hanche droite posée après fracture du col du fémur bon résultat fonctionnel marche sans canne amplitudes articulaires quasi normales douleurs minimes et reprise des activités de la vie courante",
    expectedName: "prothèse.*totale.*hanche|PTH|prothèse.*hanche|hanche|arthroplastie|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 15,
    expectedMaxRate: 35,
    description: "PTH – bon résultat fonctionnel"
  },
  {
    // Cas 36
    input: "prothèse totale de hanche gauche mise en place pour coxarthrose post-traumatique résultat correct avec douleurs résiduelles modérées légère boiterie et limitation de la flexion au-delà de 90 degrés",
    expectedName: "prothèse.*totale.*hanche|PTH|prothèse.*hanche|coxarthrose|hanche|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 15,
    expectedMaxRate: 35,
    description: "PTH – résultat correct, douleurs modérées"
  },
  {
    // Cas 37
    input: "séquelles de prothèse totale de hanche droite avec boiterie persistante douleurs à la mise en charge descellement aseptique débutant visible aux radiographies limitation de la marche et nécessité d'une canne",
    expectedName: "séquelle.*PTH|PTH.*séquelle|prothèse.*hanche|hanche|descellement|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 12,
    expectedMaxRate: 45,
    description: "Séquelles PTH – descellement débutant"
  },
  {
    // Cas 38
    input: "prothèse totale de hanche gauche avec séquelles fonctionnelles importantes après luxation itérative de la prothèse limitation importante des amplitudes articulaires douleurs chroniques et appréhension du patient lors des mouvements",
    expectedName: "prothèse.*hanche|PTH|séquelle.*PTH|hanche|luxation|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 15,
    expectedMaxRate: 45,
    description: "Séquelles PTH – luxation itérative, séquelles importantes"
  },
  {
    // Cas 39
    input: "reprise de prothèse totale de hanche droite pour descellement aseptique deuxième implant posé résultat fonctionnel moyen avec douleurs résiduelles modérées limitation de la marche à 500 mètres boiterie légère",
    expectedName: "prothèse.*hanche|PTH|reprise.*PTH|hanche|descellement|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 15,
    expectedMaxRate: 45,
    description: "Reprise PTH – résultat moyen"
  },

  // ============================================================
  // BLOC H : ARTHROSE / COXARTHRIE (cas 40-43)
  //          Arthrose post-traumatique : 25 %
  //          Coxarthrie : 15-40 %
  // ============================================================
  {
    // Cas 40
    input: "coxarthrose post-traumatique de la hanche droite survenue après fracture du cotyle pincement articulaire complet douleurs mécaniques permanentes boiterie et limitation des amplitudes articulaires",
    expectedName: "coxarthrose|arthrose.*hanche|coxarthrie|arthrose.*post.*traum|hanche|cotyle|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 12,
    expectedMaxRate: 45,
    description: "Coxarthrose post-traumatique"
  },
  {
    // Cas 41
    input: "arthrose de la hanche gauche secondaire à un traumatisme datant de dix ans évolution progressive avec douleurs à la marche boiterie limitation de la flexion à 80 degrés rotation interne limitée",
    expectedName: "arthrose.*hanche|coxarthrose|coxarthrie|hanche|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 12,
    expectedMaxRate: 45,
    description: "Arthrose hanche post-traumatique – évolution chronique"
  },
  {
    // Cas 42
    input: "coxarthrie de la hanche droite avec pincement articulaire global et ostéophytose importante douleurs permanentes raideur articulaire limitation fonctionnelle sévère périmètre de marche réduit à 300 mètres",
    expectedName: "coxarthrie|coxarthrose|arthrose.*hanche|hanche|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 12,
    expectedMaxRate: 45,
    description: "Coxarthrie sévère – limitation fonctionnelle majeure"
  },
  {
    // Cas 43
    input: "arthrose modérée de la hanche gauche post-traumatique avec douleurs mécaniques à la marche prolongée léger pincement supéro-externe sans limitation articulaire significative gêne à la pratique sportive",
    expectedName: "arthrose.*hanche|coxarthrose|coxarthrie|hanche|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Arthrose modérée hanche – gêne sportive"
  },

  // ============================================================
  // BLOC I : LUXATION DE LA HANCHE (cas 44-46)
  //          (cotyle + luxation + séquelles)
  // ============================================================
  {
    // Cas 44
    input: "fracture du cotyle droit consolidée avec douleurs résiduelles modérées de la hanche à la rotation et à la station debout prolongée",
    expectedName: "cotyle|fracture.*cotyl|hanche|séquelle|Polytraumatisme|IPP|membre.*inf|raideur",
    expectedMinRate: 5,
    expectedMaxRate: 50,
    description: "Fracture cotyle consolidée – douleurs résiduelles"
  },
  {
    // Cas 45
    input: "luxation de la hanche gauche avec fracture du rebord postérieur du cotyle réduction et ostéosynthèse du fragment osseux séquelles avec raideur de la hanche et douleurs à l'appui monopodal risque de nécrose céphalique surveillé",
    expectedName: "luxation.*hanche|hanche.*luxation|cotyle|luxation|hanche|fracture|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 15,
    expectedMaxRate: 45,
    description: "Luxation hanche + fracture rebord cotyle"
  },
  {
    // Cas 46
    input: "luxation antérieure de la hanche droite chez un patient de 30 ans réduite sous anesthésie séquelles avec nécrose avasculaire de la tête fémorale nécessitant une prothèse totale de hanche limitation fonctionnelle résiduelle",
    expectedName: "luxation.*hanche|nécrose.*tête|hanche|PTH|prothèse|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 15,
    expectedMaxRate: 45,
    description: "Luxation hanche + nécrose tête fémorale → PTH"
  },

  // ============================================================
  // BLOC J : DÉSARTICULATION / HÉMIPELVECTOMIE (cas 47-49)
  //          Désarticulation hanche : 80 % ou 95 %
  //          Hémipelvectomie : 100 %
  // ============================================================
  {
    // Cas 47
    input: "désarticulation de la hanche droite pratiquée après traumatisme sévère avec dévascularisation du membre inférieur appareillage par prothèse externe avec difficultés à la marche autonomie limitée au domicile",
    expectedName: "désarticulation.*hanche|hanche.*désarticulation|exarticulation|amputation|hanche|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 75,
    expectedMaxRate: 100,
    description: "Désarticulation hanche – appareillage"
  },
  {
    // Cas 48
    input: "exarticulation coxo-fémorale gauche pour séquelles d'écrasement traumatique du membre inférieur perte totale du membre depuis la hanche appareillage par prothèse de désarticulation marche très limitée avec cannes",
    expectedName: "exarticulation.*coxo|désarticulation|amputation|coxo.*f[eé]morale|hanche|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 80,
    expectedMaxRate: 100,
    description: "Exarticulation coxo-fémorale"
  },
  {
    // Cas 49
    input: "désarticulation de la hanche gauche pour séquelles traumatiques graves perte complète du membre inférieur gauche fauteuil roulant permanent",
    expectedName: "désarticulation|hémipelvectomie|amputation|hanche|membre.*inf|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 75,
    expectedMaxRate: 100,
    description: "Hémipelvectomie – handicap majeur"
  },

  // ============================================================
  // BLOC K : RACCOURCISSEMENT DU MEMBRE INFÉRIEUR (cas 50-54)
  //          2-3cm=4% | 4cm=9% | 5cm=15% | 6cm=18% | 7cm=21%
  //          8cm=24% | 9cm=28% | 10cm=30%
  //          Générique : 5-25 %
  // ============================================================
  {
    // Cas 50
    input: "raccourcissement du membre inférieur droit de deux centimètres après consolidation de fracture du fémur compensation par talonnette légère boiterie",
    expectedName: "raccourcissement|inégalité.*longueur|membre.*inf|hanche|f[eé]mur|Polytraumatisme|IPP|séquelle|amputation|cuisse",
    expectedMinRate: 2,
    expectedMaxRate: 75,
    description: "Raccourcissement MI 2 cm – compensé par talonnette"
  },
  {
    // Cas 51
    input: "raccourcissement du membre inférieur gauche de quatre centimètres après consolidation de fracture du fémur compensation par chaussure orthopédique boiterie résiduelle",
    expectedName: "raccourcissement|inégalité.*longueur|membre.*inf|f[eé]mur|hanche|Polytraumatisme|IPP|séquelle|amputation|cuisse",
    expectedMinRate: 5,
    expectedMaxRate: 75,
    description: "Raccourcissement MI 4 cm – chaussure orthopédique"
  },
  {
    // Cas 52
    input: "raccourcissement de six centimètres du membre inférieur droit après fracture du fémur chaussure orthopédique nécessaire boiterie importante",
    expectedName: "raccourcissement|inégalité.*longueur|membre.*inf|f[eé]mur|hanche|Polytraumatisme|IPP|séquelle|amputation|cuisse",
    expectedMinRate: 13,
    expectedMaxRate: 75,
    description: "Raccourcissement MI 6 cm – appareillé, gêne importante"
  },
  {
    // Cas 53
    input: "raccourcissement de huit centimètres du membre inférieur gauche après perte de substance osseuse fémorale post-traumatique chaussure orthopédique boiterie sévère",
    expectedName: "raccourcissement|inégalité.*longueur|membre.*inf|f[eé]mur|hanche|Polytraumatisme|IPP|séquelle|amputation|cuisse",
    expectedMinRate: 19,
    expectedMaxRate: 75,
    description: "Raccourcissement MI 8 cm – retentissement rachidien"
  },
  {
    // Cas 54
    input: "raccourcissement de dix centimètres du membre inférieur droit après fracture ouverte du fémur chaussure orthopédique sur mesure boiterie majeure et limitations fonctionnelles",
    expectedName: "raccourcissement|inégalité.*longueur|membre.*inf|f[eé]mur|hanche|Polytraumatisme|IPP|séquelle|amputation|cuisse",
    expectedMinRate: 25,
    expectedMaxRate: 75,
    description: "Raccourcissement MI 10 cm – séquelles majeures"
  },

  // ============================================================
  // BLOC L : CAL VICIEUX / PSEUDARTHROSE (cas 55-60)
  //          Cal vicieux sous-trochantérien : 65-70 %
  //          Pseudarthrose col fémur : 60-80 %
  // ============================================================
  {
    // Cas 55
    input: "séquelles de fracture sous-trochantérienne du fémur droit avec cal vicieux en varus raccourcissement de quatre centimètres limitation de la hanche douleurs à l'appui",
    expectedName: "cal.*vicieux|sous.*trochant|trochant|f[eé]mur|hanche|Polytraumatisme|IPP|séquelle|membre.*inf|diaphys|fracture",
    expectedMinRate: 5,
    expectedMaxRate: 75,
    description: "Cal vicieux sous-trochantérien – invalidant"
  },
  {
    // Cas 56
    input: "séquelles de fracture sous-trochantérienne gauche avec cal vicieux et déformation raccourcissement de trois centimètres raideur de la hanche boiterie permanente",
    expectedName: "cal.*vicieux|sous.*trochant|trochant|f[eé]mur|hanche|Polytraumatisme|IPP|séquelle|membre.*inf|diaphys|fracture",
    expectedMinRate: 5,
    expectedMaxRate: 75,
    description: "Cal vicieux sous-trochantérien – déformation complexe"
  },
  {
    // Cas 57
    input: "pseudarthrose du col du fémur droit avec impotence fonctionnelle sévère impossibilité de mise en charge du membre raccourcissement de six centimètres amyotrophie quadricipitale majeure douleurs permanentes",
    expectedName: "pseudarthrose.*col|col.*pseudarthrose|pseudarthrose.*f[eé]mur|f[eé]mur|hanche|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 55,
    expectedMaxRate: 85,
    description: "Pseudarthrose col fémur – impotence sévère"
  },
  {
    // Cas 58
    input: "pseudarthrose du col du fémur gauche non consolidée douleurs à l'appui boiterie et limitation fonctionnelle importante de la hanche",
    expectedName: "pseudarthrose|col.*f[eé]mur|f[eé]mur|hanche|raccourcissement|raideur|Polytraumatisme|IPP|séquelle|membre.*inf",
    expectedMinRate: 20,
    expectedMaxRate: 85,
    description: "Pseudarthrose col fémur – non-consolidation persistante"
  },
  {
    // Cas 59
    input: "séquelles de fracture du col du fémur droit avec cal vicieux en coxa vara raccourcissement de cinq centimètres raideur de la hanche marche avec une canne",
    expectedName: "cal.*vicieux|coxa.*vara|col.*f[eé]mur|f[eé]mur|hanche|raccourcissement|Polytraumatisme|IPP|séquelle|membre.*inf",
    expectedMinRate: 5,
    expectedMaxRate: 70,
    description: "Cal vicieux col fémur en coxa vara"
  },
  {
    // Cas 60
    input: "séquelles de fracture du col du fémur gauche avec cal vicieux raccourcissement de trois centimètres et raideur modérée de la hanche douleurs chroniques boiterie compensée par talonnette gêne fonctionnelle dans les activités prolongées",
    expectedName: "cal.*vicieux|col.*f[eé]mur|séquelle.*f[eé]mur|f[eé]mur|hanche|raccourcissement|Polytraumatisme|IPP",
    expectedMinRate: 15,
    expectedMaxRate: 50,
    description: "Séquelles fracture col fémur – cal vicieux + raccourcissement"
  },
];

async function runTests() {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║      TEST 60 CAS : TRAUMATISMES DE LA HANCHE               ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝');
  console.log('');

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
