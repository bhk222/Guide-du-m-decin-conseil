// =============================================================================
//  TEST 40 CAS CLINIQUES POLYTRAUMATISMES — DU SIMPLE AU COMPLEXE (V3.3.314)
// =============================================================================
// Progression : Cas 1-12 (2 systèmes) → Cas 13-24 (3 systèmes)
//             → Cas 25-34 (4 systèmes) → Cas 35-40 (5-6 systèmes)
// Couvre des combinaisons sous-représentées dans les tests existants :
//   - Avant-bras + autre, ORL facial, nerf périphérique, main + MI,
//     odorat/anosmie, cicatrices, urogénital, pied + MS, audition + rachis,
//     clavicule/omoplate, rotule, dermatologique, vasculaire
// =============================================================================

import { localExpertAnalysis } from './components/AiAnalyzer';

interface TestCase {
  input: string;
  expectedSystems: string[];
  expectedMinRate: number;
  expectedMaxRate: number;
  description: string;
}

const testCases: TestCase[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  //  PARTIE 1 : CAS SIMPLES — 2 SYSTÈMES (Cas 1-12)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    // Cas 1 : Rachis cervical + Épaule
    input: "entorse cervicale grave avec raideur du rachis cervical et limitation des rotations à 50 pour cent des amplitudes normales et cervicalgies chroniques avec irradiation scapulaire ; fracture de la clavicule droite main dominante consolidée avec cal saillant et raideur résiduelle de l'épaule en abduction limitée à 120 degrés",
    expectedSystems: ['rachis', 'épaule'],
    expectedMinRate: 8,
    expectedMaxRate: 30,
    description: "Simple : rachis cervical + clavicule/épaule"
  },
  {
    // Cas 2 : Genou + Pied
    input: "entorse grave du genou droit avec rupture du ligament croisé antérieur traitée par ligamentoplastie avec laxité résiduelle antérieure et douleurs à la descente des escaliers ; fracture du calcanéum gauche avec enfoncement thalamique traité orthopédiquement et douleurs chroniques à l'appui et marche sur terrain irrégulier difficile",
    expectedSystems: ['genou', 'pied'],
    expectedMinRate: 10,
    expectedMaxRate: 35,
    description: "Simple : genou LCA + calcanéum"
  },
  {
    // Cas 3 : Main + Hanche
    input: "amputation traumatique de l'index droit main dominante au niveau de la première phalange avec moignon sensible et gêne à la pince pouce-index ; fracture du col du fémur gauche traitée par ostéosynthèse par vis-plaque avec raideur de hanche et limitation de la flexion à 90 degrés et rotation interne à 10 degrés",
    expectedSystems: ['main', 'hanche'],
    expectedMinRate: 12,
    expectedMaxRate: 40,
    description: "Simple : amputation index + col fémoral"
  },
  {
    // Cas 4 : Crâne + Psychiatrique
    input: "traumatisme crânien avec perte de connaissance de 30 minutes et syndrome post-commotionnel avec céphalées chroniques quotidiennes et vertiges positionnels et troubles de la concentration ; état de stress post-traumatique chronique avec cauchemars récurrents et reviviscences et hypervigilance et évitement des lieux de l'accident et retentissement social important",
    expectedSystems: ['crâne', 'psychiatrique'],
    expectedMinRate: 10,
    expectedMaxRate: 65,
    description: "Simple : TC + TSPT"
  },
  {
    // Cas 5 : Thorax + Abdomen
    input: "fracture des 5ème et 6ème côtes gauches avec douleurs thoraciques chroniques à l'effort et gêne respiratoire modérée à la toux et à l'inspiration profonde ; splénectomie totale post-traumatique pour rupture de la rate avec thrombocytose réactionnelle et vaccination antipneumococcique et risque infectieux permanent",
    expectedSystems: ['thorax', 'abdomen'],
    expectedMinRate: 15,
    expectedMaxRate: 45,
    description: "Simple : côtes + splénectomie"
  },
  {
    // Cas 6 : Audition + Rachis lombaire
    input: "surdité de perception bilatérale post-traumatique avec perte moyenne de 40 dB à droite et 25 dB à gauche et acouphènes permanents invalidants ; fracture-tassement du corps vertébral de L1 avec cyphose angulaire résiduelle de 15 degrés et lombalgies chroniques et raideur du rachis lombaire avec distance doigt-sol à 30 cm",
    expectedSystems: ['audition', 'rachis'],
    expectedMinRate: 12,
    expectedMaxRate: 40,
    description: "Simple : surdité bilatérale + tassement L1"
  },
  {
    // Cas 7 : Bassin + Fémur
    input: "fracture de la branche ilio-pubienne gauche consolidée avec douleurs résiduelles de la région pubienne et gêne à la station assise prolongée ; fracture de la diaphyse fémorale gauche traitée par enclouage centromédullaire avec consolidation obtenue mais raccourcissement de 2 cm et douleurs au site du clou et boiterie",
    expectedSystems: ['bassin', 'fémur'],
    expectedMinRate: 10,
    expectedMaxRate: 65,
    description: "Simple : branche ilio-pubienne + diaphyse fémorale"
  },
  {
    // Cas 8 : Vision + Coude
    input: "baisse de l'acuité visuelle de l'oeil gauche à 4/10 après contusion oculaire avec iridodialyse et mydriase post-traumatique et photophobie gênante ; fracture de la tête radiale gauche main non dominante traitée par résection avec limitation de la pronosupination et douleurs au coude à la flexion-extension",
    expectedSystems: ['vision', 'coude'],
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Simple : BAV + fracture tête radiale"
  },
  {
    // Cas 9 : Cheville + Avant-bras
    input: "fracture bimalléolaire de la cheville droite traitée chirurgicalement avec ostéosynthèse et raideur résiduelle en flexion dorsale limitée à 10 degrés et douleurs à la marche prolongée ; fracture des deux os de l'avant-bras gauche main non dominante avec cal vicieux angulaire et limitation de la pronosupination et gêne dans les gestes de rotation",
    expectedSystems: ['cheville', 'avant-bras'],
    expectedMinRate: 10,
    expectedMaxRate: 35,
    description: "Simple : bimalléolaire + deux os avant-bras"
  },
  {
    // Cas 10 : Épaule + Tibia
    input: "luxation récidivante de l'épaule droite main dominante avec appréhension positive et limitation de l'abduction et de la rotation externe et instabilité fonctionnelle gênante ; fracture ouverte de la diaphyse tibiale gauche avec consolidation retardée et douleurs chroniques et amyotrophie du mollet et gêne à la marche",
    expectedSystems: ['épaule', 'tibia'],
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Simple : luxation récidivante épaule + fracture tibiale ouverte"
  },
  {
    // Cas 11 : Poignet + Genou
    input: "fracture de l'extrémité inférieure du radius droit main dominante type Pouteau-Colles consolidée avec limitation de la flexion et de l'extension du poignet et douleurs à la préhension de force ; fracture du plateau tibial externe gauche traitée par ostéosynthèse avec raideur du genou en flexion limitée à 100 degrés et douleurs à l'accroupissement",
    expectedSystems: ['poignet', 'genou'],
    expectedMinRate: 10,
    expectedMaxRate: 35,
    description: "Simple : Pouteau-Colles + plateau tibial"
  },
  {
    // Cas 12 : Genou + Hanche (controlatéral)
    input: "fracture comminutive de la rotule droite traitée par cerclage avec raideur du genou droit en flexion limitée à 90 degrés et douleurs à la montée des escaliers et impossibilité de courir ; luxation postérieure de la hanche gauche réduite sous anesthésie générale avec limitation de la flexion de hanche à 80 degrés et rotation interne à 10 degrés et douleurs chroniques et boiterie et marche avec canne",
    expectedSystems: ['genou', 'hanche'],
    expectedMinRate: 12,
    expectedMaxRate: 50,
    description: "Simple : fracture rotule + luxation hanche controlatérale"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  PARTIE 2 : CAS MODÉRÉS — 3 SYSTÈMES (Cas 13-24)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    // Cas 13 : Crâne + Vision + Rachis
    input: "traumatisme crânien grave avec perte de connaissance de 2 heures et fracture de la base du crâne et contusion cérébrale frontale et syndrome post-commotionnel sévère avec céphalées chroniques et troubles de la mémoire ; baisse de l'acuité visuelle de l'oeil gauche à 3/10 par contusion rétinienne avec photophobie et gêne à la lecture ; fracture-tassement de L1 avec cyphose angulaire résiduelle de 20 degrés et lombalgies chroniques et raideur du rachis lombaire et distance doigt-sol à 35 cm",
    expectedSystems: ['crâne', 'vision', 'rachis'],
    expectedMinRate: 18,
    expectedMaxRate: 60,
    description: "Modéré : TC grave + BAV unilatérale + tassement L1"
  },
  {
    // Cas 14 : Thorax + Rachis dorsal + Épaule
    input: "volet costal antérieur gauche avec fractures des 3ème 4ème et 5ème côtes et contusion pulmonaire et séquelles respiratoires avec dyspnée d'effort et diminution de la capacité vitale à 70 pour cent de la théorique ; fracture-tassement de D12 avec cyphose angulaire résiduelle et dorsalgies chroniques et raideur segmentaire ; fracture de l'omoplate gauche main non dominante avec limitation de l'abduction de l'épaule à 130 degrés et douleurs à l'élévation latérale",
    expectedSystems: ['thorax', 'rachis', 'épaule'],
    expectedMinRate: 18,
    expectedMaxRate: 50,
    description: "Modéré : volet costal + tassement D12 + omoplate"
  },
  {
    // Cas 15 : Fémur + Genou + Cheville
    input: "fracture du tiers moyen de la diaphyse fémorale droite traitée par enclouage centromédullaire avec raccourcissement de 1.5 cm et douleurs au site de fracture ; entorse grave du genou droit avec lésion du ligament croisé antérieur et laxité antérieure résiduelle et douleurs à la mise en charge et instabilité en terrain accidenté ; fracture de la malléole externe droite consolidée avec douleurs résiduelles et raideur en flexion dorsale et œdème vespéral intermittent",
    expectedSystems: ['fémur', 'genou', 'cheville'],
    expectedMinRate: 15,
    expectedMaxRate: 45,
    description: "Modéré : diaphyse fémorale + LCA genou + malléole (ipsilatéral)"
  },
  {
    // Cas 16 : Abdomen + Rachis + Psychiatrique
    input: "néphrectomie gauche pour fracture rénale grave avec rein controlatéral fonctionnel et surveillance biologique régulière ; fracture du corps vertébral de L2 traitée par corset pendant 3 mois avec lombalgies chroniques mécaniques et raideur du rachis lombaire et distance doigt-sol à 25 cm ; trouble anxieux généralisé post-traumatique avec anxiété permanente et troubles du sommeil et irritabilité et hypervigilance nécessitant un traitement médicamenteux au long cours",
    expectedSystems: ['abdomen', 'rachis', 'psychiatrique'],
    expectedMinRate: 18,
    expectedMaxRate: 50,
    description: "Modéré : néphrectomie + fracture L2 + trouble anxieux"
  },
  {
    // Cas 17 : Hanche + Bassin + Tibia
    input: "fracture acétabulaire gauche traitée par ostéosynthèse avec prothèse totale de hanche secondaire et limitation de la flexion à 80 degrés et marche limitée et utilisation d'une canne ; fracture de la branche ischio-pubienne gauche consolidée avec douleurs pelviennes chroniques ; fracture du pilon tibial gauche consolidée avec raideur de la tibio-tarsienne et douleurs à la mise en charge et arthrose post-traumatique débutante",
    expectedSystems: ['hanche', 'bassin', 'cheville'],
    expectedMinRate: 20,
    expectedMaxRate: 55,
    description: "Modéré : acétabulum + bassin + pilon tibial"
  },
  {
    // Cas 18 : Main + Poignet + Coude (MS ipsilatéral)
    input: "amputation traumatique du pouce droit main dominante au niveau de la phalange distale avec moignon douloureux et gêne de la pince pouce-index ; fracture du scaphoïde carpien droit avec pseudarthrose du scaphoïde et raideur du poignet en flexion limitée à 40 degrés et douleurs à la préhension de force ; fracture de l'olécrane droit traitée par ostéosynthèse avec limitation de l'extension du coude et flexion limitée à 120 degrés et douleurs à l'effort",
    expectedSystems: ['main', 'poignet', 'coude'],
    expectedMinRate: 15,
    expectedMaxRate: 50,
    description: "Modéré : amputation pouce + pseudarthrose scaphoïde + olécrane (MS D)"
  },
  {
    // Cas 19 : Crâne + Audition + Rachis cervical
    input: "traumatisme crânien modéré avec perte de connaissance de 15 minutes et syndrome post-commotionnel avec céphalées chroniques et vertiges positionnels et troubles de la mémoire à court terme ; surdité de perception unilatérale droite post-traumatique avec perte de 45 dB et acouphènes permanents et gêne à la communication en milieu bruyant ; entorse cervicale C4-C5 avec cervicalgies chroniques et raideur cervicale avec limitation des rotations de la tête à 60 pour cent des amplitudes normales",
    expectedSystems: ['crâne', 'audition', 'rachis'],
    expectedMinRate: 15,
    expectedMaxRate: 45,
    description: "Modéré : TC modéré + surdité unilatérale + rachis cervical"
  },
  {
    // Cas 20 : Épaule + Humérus + Coude (MS cascade)
    input: "luxation antérieure de l'épaule gauche main non dominante avec rupture du bourrelet glénoïdien et instabilité résiduelle et appréhension en abduction-rotation externe ; fracture spiroïde de la diaphyse humérale gauche consolidée avec cal hypertrophique et paralysie radiale récupérée partiellement avec déficit de l'extension du poignet ; fracture supra-condylienne de l'humérus gauche avec raideur du coude en flexion limitée à 110 degrés et extension déficitaire de 20 degrés",
    expectedSystems: ['épaule', 'humérus', 'coude'],
    expectedMinRate: 15,
    expectedMaxRate: 50,
    description: "Modéré : luxation épaule + diaphyse humérale + raideur coude (MS ND)"
  },
  {
    // Cas 21 : Thorax + Abdomen + Bassin
    input: "fractures des 7ème 8ème et 9ème côtes droites avec hémothorax drainé et séquelles pleurales avec adhérences et gêne respiratoire modérée à l'effort ; contusion hépatique avec fissure du lobe droit traitée conservativement avec douleurs chroniques de l'hypochondre droit et hépatalgie à l'effort ; fracture du cadre obturateur droit consolidée avec douleurs pelviennes résiduelles et gêne à la station assise prolongée et à l'accroupissement",
    expectedSystems: ['thorax', 'abdomen', 'bassin'],
    expectedMinRate: 15,
    expectedMaxRate: 45,
    description: "Modéré : côtes + hémothorax + contusion hépatique + cadre obturateur"
  },
  {
    // Cas 22 : Pied + Cheville + Jambe (MI distal ipsilatéral)
    input: "fracture du calcanéum droit avec effondrement thalamique et arthrose sous-talienne post-traumatique et douleurs chroniques à l'appui et impossibilité de marcher sur terrain irrégulier ; fracture de la malléole interne droite consolidée avec raideur de la cheville en flexion dorsale limitée à 5 degrés ; fracture du tiers inférieur du tibia et du péroné droits consolidée avec douleurs résiduelles et amyotrophie du mollet",
    expectedSystems: ['pied', 'cheville', 'jambe'],
    expectedMinRate: 15,
    expectedMaxRate: 45,
    description: "Modéré : calcanéum + malléole interne + tibia-péroné (MI D)"
  },
  {
    // Cas 23 : Genou + Psychiatrique + Rachis
    input: "fracture du plateau tibial interne gauche avec enfoncement de 8 mm traitée par ostéosynthèse avec raideur du genou en flexion limitée à 100 degrés et gonarthrose post-traumatique débutante et douleurs à la marche et à la descente des escaliers ; syndrome dépressif réactionnel chronique post-traumatique avec tristesse permanente et anhédonie et perte de motivation et isolement social nécessitant un suivi psychiatrique et un traitement antidépresseur ; raideur du rachis lombaire post-traumatique avec lombalgies chroniques et hernie discale L4-L5 avec sciatique S1 gauche intermittente",
    expectedSystems: ['genou', 'psychiatrique', 'rachis'],
    expectedMinRate: 18,
    expectedMaxRate: 55,
    description: "Modéré : plateau tibial + dépression + hernie discale lombaire"
  },
  {
    // Cas 24 : Vision + Crâne + Épaule
    input: "diplopie binoculaire séquellaire par paralysie du nerf abducens droit post-traumatique avec limitation de l'abduction de l'oeil droit et vision double dans le regard latéral droit gênant la conduite automobile ; traumatisme crânien léger avec syndrome post-commotionnel persistant et céphalées chroniques et fatigue et troubles de la concentration ; fracture de la grosse tubérosité de l'humérus droit main dominante consolidée avec limitation de l'abduction active de l'épaule à 90 degrés et douleurs à l'élévation du bras au-dessus de la tête",
    expectedSystems: ['vision', 'crâne', 'épaule'],
    expectedMinRate: 15,
    expectedMaxRate: 50,
    description: "Modéré : diplopie + TC + fracture grosse tubérosité humérus"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  PARTIE 3 : CAS COMPLEXES — 4 SYSTÈMES (Cas 25-34)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    // Cas 25 : Crâne + Rachis cervical + Thorax + Genou
    input: "traumatisme crânien avec perte de connaissance initiale de 45 minutes et hémorragie méningée et syndrome post-commotionnel persistant avec céphalées chroniques et vertiges et troubles de la concentration ; entorse cervicale C5-C6 avec cervicalgies chroniques et raideur du rachis cervical avec névralgies cervico-brachiales à droite ; fracture de la 4ème et 5ème côtes droites consolidées avec douleurs thoraciques résiduelles à l'effort et gêne à la toux ; fracture du condyle fémoral interne gauche avec raideur du genou en flexion limitée à 110 degrés et douleurs à l'appui et gonarthrose post-traumatique",
    expectedSystems: ['crâne', 'rachis', 'thorax', 'genou'],
    expectedMinRate: 20,
    expectedMaxRate: 55,
    description: "Complexe : TC + rachis cervical + côtes + condyle fémoral"
  },
  {
    // Cas 26 : Abdomen + Hanche + Épaule + Psychiatrique
    input: "splénectomie totale post-traumatique avec thrombocytose et risque infectieux permanent et vaccination obligatoire ; fracture du massif trochantérien gauche traitée par clou gamma avec raideur de hanche et marche avec canne et limitation de la flexion à 80 degrés et douleurs chroniques ; fracture de la clavicule droite main dominante consolidée en cal vicieux avec saillie sous-cutanée et raideur de l'épaule en abduction limitée à 110 degrés ; état de stress post-traumatique chronique avec reviviscences et cauchemars et évitement phobique et hypervigilance et retentissement professionnel majeur",
    expectedSystems: ['abdomen', 'hanche', 'épaule', 'psychiatrique'],
    expectedMinRate: 25,
    expectedMaxRate: 65,
    description: "Complexe : splénectomie + trochanter + clavicule + TSPT"
  },
  {
    // Cas 27 : Fémur + Genou + Cheville + Épaule (MI + MS croisé)
    input: "fracture comminutive de la diaphyse fémorale droite traitée par enclouage avec raccourcissement de 3 cm et boiterie permanente et douleurs chroniques ; fracture du plateau tibial interne gauche avec enfoncement articulaire et gonarthrose post-traumatique et raideur du genou gauche et flexion limitée à 100 degrés ; fracture trimalléolaire de la cheville droite consolidée avec raideur importante et arthrose tibio-tarsienne et douleurs à la marche ; rupture de la coiffe des rotateurs de l'épaule droite main dominante avec limitation de l'abduction à 80 degrés et douleurs nocturnes",
    expectedSystems: ['fémur', 'genou', 'cheville', 'épaule'],
    expectedMinRate: 25,
    expectedMaxRate: 65,
    description: "Complexe : fémur D + plateau tibial G + trimalléolaire D + coiffe rotateurs D"
  },
  {
    // Cas 28 : Épaule + Hanche + Rachis + Abdomen (multi-sièges)
    input: "rupture de la coiffe des rotateurs de l'épaule droite main dominante avec limitation de l'abduction active à 80 degrés et douleurs nocturnes persistantes ; fracture du cotyle gauche traitée par ostéosynthèse avec raideur de hanche et limitation de la flexion à 80 degrés et marche avec canne ; fracture-tassement de D12 avec dorsalgies chroniques et raideur du rachis dorso-lombaire ; cholécystectomie post-traumatique pour contusion de la vésicule biliaire avec troubles digestifs chroniques résiduels",
    expectedSystems: ['épaule', 'hanche', 'rachis', 'abdomen'],
    expectedMinRate: 22,
    expectedMaxRate: 65,
    description: "Complexe : coiffe rotateurs + cotyle + tassement D12 + cholécystectomie"
  },
  {
    // Cas 29 : Crâne + Thorax + Bassin + Abdomen
    input: "traumatisme crânien grave avec coma initial de 3 jours et contusion hémorragique frontale gauche et séquelles cognitives avec troubles mnésiques et ralentissement et syndrome dysexécutif modéré ; contusion pulmonaire bilatérale avec pneumothorax gauche drainé et séquelles restrictives avec diminution de la capacité pulmonaire ; fracture du sacrum avec douleurs sacrées chroniques invalidantes et gêne à la station assise prolongée ; perforation intestinale traitée par laparotomie exploratrice avec résection segmentaire et troubles digestifs chroniques avec douleurs abdominales et ballonnements",
    expectedSystems: ['crâne', 'thorax', 'bassin', 'abdomen'],
    expectedMinRate: 30,
    expectedMaxRate: 70,
    description: "Complexe : TC grave + pneumothorax + sacrum + perforation intestinale"
  },
  {
    // Cas 30 : Audition + Vision + Crâne + Rachis
    input: "surdité de perception bilatérale modérée post-traumatique avec perte moyenne de 35 dB bilatérale et acouphènes permanents bilatéraux très gênants ; baisse de l'acuité visuelle de l'oeil gauche à 3/10 par contusion rétinienne avec œdème maculaire cicatriciel ; traumatisme crânien avec fracture de l'os temporal gauche et syndrome post-commotionnel chronique avec céphalées et troubles de l'équilibre ; fracture-luxation de la vertèbre C6 traitée par arthrodèse cervicale antérieure avec raideur cervicale importante et névralgies cervico-brachiales chroniques résiduelles",
    expectedSystems: ['audition', 'vision', 'crâne', 'rachis'],
    expectedMinRate: 25,
    expectedMaxRate: 65,
    description: "Complexe : surdité + BAV + TC temporal + arthrodèse cervicale"
  },
  {
    // Cas 31 : Thorax + Rachis dorsal + Épaule + Coude
    input: "fracture du sternum consolidée avec douleurs sternales chroniques à la palpation et à l'effort de poussée ; fracture-tassement de D11 et D12 avec cyphose dorsale de 20 degrés et dorsalgies chroniques et raideur du rachis dorso-lombaire ; fracture de la tête humérale gauche main non dominante avec raideur de l'épaule en abduction limitée à 90 degrés et rotation externe limitée à 20 degrés ; fracture de l'olécrane gauche consolidée avec raideur du coude et flexion limitée à 100 degrés et extension déficitaire de 25 degrés",
    expectedSystems: ['thorax', 'rachis', 'épaule', 'coude'],
    expectedMinRate: 20,
    expectedMaxRate: 55,
    description: "Complexe : sternum + tassements D11-D12 + épaule + olécrane"
  },
  {
    // Cas 32 : Hanche + Genou + Tibia + Psychiatrique
    input: "prothèse totale de hanche droite posée à la suite d'une fracture acétabulaire avec raideur résiduelle et limitation de la flexion à 90 degrés et marche avec canne et périmètre de marche limité à 500 mètres ; raideur du genou droit post-traumatique avec flexion limitée à 90 degrés et extension complète et gonarthrose débutante ; fracture ouverte du tiers moyen du tibia droit Gustilo II consolidée avec cal vicieux en valgus de 8 degrés et douleurs chroniques à la marche ; trouble dépressif majeur post-traumatique avec anhédonie sévère et insomnie et idéation suicidaire résolutive sous traitement et retentissement professionnel et social important",
    expectedSystems: ['hanche', 'genou', 'tibia', 'psychiatrique'],
    expectedMinRate: 30,
    expectedMaxRate: 70,
    description: "Complexe : PTH + raideur genou + tibia cal vicieux + dépression majeure"
  },
  {
    // Cas 33 : Abdomen + Bassin + Fémur + Cheville
    input: "hépatectomie gauche pour fracture hépatique grave avec douleurs abdominales chroniques résiduelles et bilan hépatique perturbé ; fracture du cadre obturateur gauche avec douleurs pelviennes et gêne à l'accroupissement ; fracture sous-trochantérienne du fémur gauche traitée par clou centromédullaire avec raccourcissement de 3 cm et boiterie permanente et douleurs au matériel ; fracture trimalléolaire de la cheville gauche avec raideur importante et arthrose tibio-tarsienne et douleurs à la marche sur terrain irrégulier",
    expectedSystems: ['abdomen', 'bassin', 'fémur', 'cheville'],
    expectedMinRate: 25,
    expectedMaxRate: 65,
    description: "Complexe : hépatectomie + cadre obturateur + fémur sous-troch + trimalléolaire"
  },
  {
    // Cas 34 : Genou + Pied + Avant-bras + Crâne
    input: "fracture du plateau tibial externe droit avec enfoncement articulaire de 5 mm et gonarthrose post-traumatique et raideur en flexion limitée à 100 degrés ; fracture comminutive du calcanéum droit avec effondrement thalamique et angle de Böhler effondré et douleurs chroniques à l'appui talonnier et marche sur terrain plat uniquement ; fracture des deux os de l'avant-bras gauche main non dominante consolidée avec limitation de la pronosupination et gêne aux gestes de rotation ; traumatisme crânien léger avec syndrome post-commotionnel et céphalées chroniques positionnelles et acouphènes intermittents",
    expectedSystems: ['genou', 'pied', 'avant-bras', 'crâne'],
    expectedMinRate: 20,
    expectedMaxRate: 55,
    description: "Complexe : plateau tibial + calcanéum + deux os avant-bras + TC"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  PARTIE 4 : CAS TRÈS COMPLEXES — 5 À 6 SYSTÈMES (Cas 35-40)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    // Cas 35 : Crâne + Vision + Thorax + Fémur + Psychiatrique (5 systèmes)
    input: "traumatisme crânien grave avec coma initial de 48 heures et contusions hémorragiques frontales bilatérales et séquelles cognitives avec troubles mnésiques sévères et syndrome dysexécutif et ralentissement psychomoteur ; baisse de l'acuité visuelle bilatérale à 4/10 à droite et 6/10 à gauche par neuropathie optique post-traumatique ; fractures étagées des côtes de la 4ème à la 8ème droites avec volet costal et séquelles respiratoires restrictives avec VEMS à 65 pour cent de la théorique ; fracture comminutive de la diaphyse fémorale droite traitée par enclouage avec raccourcissement de 3 cm et rotoation externe résiduelle et boiterie permanente et marche avec canne ; état de stress post-traumatique sévère avec flashbacks quotidiens et cauchemars et évitement massif et retrait social complet et incapacité professionnelle",
    expectedSystems: ['crâne', 'vision', 'thorax', 'fémur', 'psychiatrique'],
    expectedMinRate: 40,
    expectedMaxRate: 85,
    description: "Très complexe : TC grave + BAV + volet costal + fémur comminutif + TSPT sévère"
  },
  {
    // Cas 36 : Rachis + Hanche + Genou + Épaule + Abdomen (5 systèmes)
    input: "fracture-luxation de L1 traitée par arthrodèse L1-L2 avec raideur du rachis lombaire et lombalgies chroniques invalidantes et distance doigt-sol à 40 cm et sciatalgie L5 gauche résiduelle ; fracture du cotyle gauche avec prothèse totale de hanche et raideur résiduelle et marche avec canne et périmètre de marche de 300 mètres ; fracture du plateau tibial interne gauche avec gonarthrose post-traumatique et raideur du genou et flexion limitée à 90 degrés ; rupture de la coiffe des rotateurs droite main dominante opérée avec limitation persistante de l'abduction à 100 degrés et amyotrophie deltoïdienne ; splénectomie totale post-traumatique avec vaccination et risque infectieux permanent",
    expectedSystems: ['rachis', 'hanche', 'genou', 'épaule', 'abdomen'],
    expectedMinRate: 40,
    expectedMaxRate: 85,
    description: "Très complexe : arthrodèse L1-L2 + PTH + plateau tibial + coiffe rotateurs + splénectomie"
  },
  {
    // Cas 37 : Crâne + Thorax + Abdomen + Bassin + Fémur (5 systèmes)
    input: "traumatisme crânien avec perte de connaissance de 1 heure et hématome extradural temporal gauche évacué chirurgicalement et séquelles avec épilepsie post-traumatique contrôlée sous traitement et céphalées chroniques ; contusion pulmonaire gauche avec pneumothorax drainé et séquelles pleurales avec adhérences et gêne respiratoire résiduelle à l'effort ; gastrectomie partielle pour perforation gastrique post-traumatique avec troubles digestifs résiduels et dumping syndrome et amaigrissement de 6 kg ; fracture du bassin type Malgaigne avec disjonction de la symphyse pubienne et fracture de l'aile iliaque gauche consolidée avec douleurs pelviennes chroniques ; fracture de la diaphyse fémorale gauche traitée par enclouage avec consolidation en cal vicieux en rotation externe de 15 degrés et raccourcissement de 2 cm",
    expectedSystems: ['crâne', 'thorax', 'abdomen', 'bassin', 'fémur'],
    expectedMinRate: 20,
    expectedMaxRate: 85,
    description: "Très complexe : HED + pneumothorax + gastrectomie + Malgaigne + fémur cal vicieux"
  },
  {
    // Cas 38 : Hanche + Genou + Cheville + Pied + Rachis + Psychiatrique (6 systèmes)
    input: "fracture du col du fémur droit Garden III traitée par prothèse intermédiaire de hanche avec limitation de la flexion à 80 degrés et marche avec canne et douleurs chroniques ; fracture comminutive du plateau tibial droit avec enfoncement articulaire de 10 mm et gonarthrose sévère et flexion limitée à 80 degrés et extension déficitaire de 10 degrés ; fracture du pilon tibial droit avec arthrose tibio-tarsienne sévère et raideur de la cheville et douleurs constantes à la marche ; fracture comminutive du calcanéum droit avec effondrement thalamique et angle de Böhler à 5 degrés et douleurs chroniques à l'appui et impossibilité de courir ; tassement vertébral de L3 avec cyphose lombaire et lombalgies chroniques et raideur du rachis lombaire ; syndrome dépressif majeur post-traumatique avec tentative de suicide et hospitalisation psychiatrique et traitement antidépresseur au long cours et retentissement social et professionnel majeur",
    expectedSystems: ['hanche', 'genou', 'cheville', 'pied', 'rachis', 'psychiatrique'],
    expectedMinRate: 45,
    expectedMaxRate: 90,
    description: "Catastrophique : PIH + plateau tibial + pilon + calcanéum + L3 + dépression majeure (6 systèmes)"
  },
  {
    // Cas 39 : Crâne + Audition + Rachis + Thorax + Épaule (5 systèmes)
    input: "traumatisme crânien modéré avec perte de connaissance de 20 minutes et fracture du rocher gauche et syndrome post-commotionnel persistant avec céphalées et troubles cognitifs légers ; surdité de transmission gauche par fracture de l'oreille moyenne avec perte auditive de 50 dB et acouphènes permanents invalidants et gêne importante dans la vie quotidienne ; fracture-tassement de D10 avec angulation cyphotique résiduelle et dorsalgies chroniques et raideur thoraco-lombaire ; fracture de la 6ème et 7ème côtes gauches avec névralgie intercostale chronique rebelle au traitement et douleurs à la respiration profonde ; luxation acromio-claviculaire gauche main non dominante stade III non réduite avec touche de piano permanente et limitation de l'élévation du bras et douleurs à l'effort",
    expectedSystems: ['crâne', 'audition', 'rachis', 'thorax', 'épaule'],
    expectedMinRate: 18,
    expectedMaxRate: 70,
    description: "Très complexe : TC + fracture rocher + surdité + tassement D10 + côtes + luxation acromio-claviculaire"
  },
  {
    // Cas 40 : Crâne + Vision + Abdomen + Hanche + Genou + Rachis (6 systèmes)
    input: "traumatisme crânien grave avec coma de 5 jours et contusions hémorragiques diffuses et séquelles cognitives majeures avec troubles mnésiques sévères et syndrome frontal et désinhibition et anosognosie partielle et troubles attentionnels ; perte de l'oeil gauche par énucléation post-traumatique avec prothèse oculaire et perte de la vision stéréoscopique ; néphrectomie droite pour éclatement rénal traumatique avec rein controlatéral unique et surveillance néphrologique régulière et risque d'insuffisance rénale ; fracture du cotyle droit avec prothèse totale de hanche et limitation de la flexion à 70 degrés et marche avec deux cannes et périmètre de marche de 200 mètres ; fracture du plateau tibial interne droit avec gonarthrose post-traumatique sévère et genou en flessum de 10 degrés et flexion limitée à 90 degrés ; fracture-luxation de L2 traitée par arthrodèse postérieure L1-L3 avec raideur majeure du rachis lombaire et lombalgies chroniques invalidantes et sciatalgie L5 bilatérale résiduelle",
    expectedSystems: ['crâne', 'vision', 'abdomen', 'hanche', 'genou', 'rachis'],
    expectedMinRate: 55,
    expectedMaxRate: 95,
    description: "Catastrophique : TC grave + énucléation + néphrectomie + PTH + plateau tibial + arthrodèse L1-L3 (6 systèmes)"
  },
];

// ====== RUNNER ======
async function runTests() {
  let passed = 0;
  let failed = 0;

  console.log(`\n  TEST 40 CAS CLINIQUES POLYTRAUMATISMES — DU SIMPLE AU COMPLEXE (V3.3.314)\n`);

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const result: any = localExpertAnalysis(tc.input, []);
    
    const name = result?.name || result?.proposals?.[0]?.name || '';
    const rate = result?.rate !== undefined ? result.rate
      : result?.globalRate !== undefined ? result.globalRate
      : typeof result?.type === 'number' ? result.type : 0;
    const numRate = typeof rate === 'number' ? rate : parseInt(rate) || 0;
    const justif = (result?.justification || '').toLowerCase();
    const pathLower = (result?.path || '').toLowerCase();
    const nameLower = name.toLowerCase();
    const allText = (nameLower + ' ' + justif + ' ' + pathLower).toLowerCase();

    // 1. Reconnu comme polytraumatisme / cumul ?
    const isPolytrauma = nameLower.includes('polytraum')
      || nameLower.includes('cumul')
      || justif.includes('polytraum')
      || justif.includes('cumul')
      || justif.includes('balthaz')
      || justif.includes('systèmes')
      || justif.includes('systemes')
      || pathLower.includes('polytraum');

    // 2. Taux dans la fourchette (tolérance ±5 min, +10 max)
    const rateInRange = numRate >= (tc.expectedMinRate - 5) && numRate <= (tc.expectedMaxRate + 10);

    // 3. Systèmes trouvés (informatif, non bloquant)
    const systemsFound = tc.expectedSystems.filter(sys => {
      const s = sys.toLowerCase();
      return allText.includes(s)
        || (s === 'crâne' && /cran|crân|neurolog|commotion|contusion.*c[eé]r[eé]bral|c[eé]phal|hématome.*extra|[eé]pilepsie/i.test(allText))
        || (s === 'thorax' && /thorac|c[oô]te|costal|pulmon|sternum|volet|fracas|pneumo|h[eé]mothorax|pleur|n[eé]vralgie.*intercost/i.test(allText))
        || (s === 'abdomen' && /spl[eé]n|r[eé]nal|rate|foie|h[eé]pat|gastr|n[eé]phrect|chol[eé]cyst|intestin|m[eé]sent|digestif/i.test(allText))
        || (s === 'vision' && /visuel|acuit[eé]|oculaire|oeil|\boeil\b|dipl|BAV|iridodial|[eé]nucl[eé]|r[eé]tin|n[eé]uropathie.*opt/i.test(allText))
        || (s === 'audition' && /audit|surdit|acouph|hypoacous|ossicul|transmission/i.test(allText))
        || (s === 'odorat' && /anosmie|odorat|olfact|lame.*cribl|dysgu[eé]usie/i.test(allText))
        || (s === 'psychiatrique' && /d[eé]press|psychiatr|psycho|tspt|stress.*post|phobi|anxi[eé]t|adaptation/i.test(allText))
        || (s.includes('rachis') && /rachis|vert[eé]br|lombaire|cervical|dorsal|hernie.*disc|tassement|cyphose|sciatique|arthrod[eè]se.*l\d/i.test(allText))
        || (s === 'bassin' && /bassin|pelvien|obtur|cotyle|symphyse|sacrum|coccyx|iliaque|ischio|malgaigne|pubi/i.test(allText))
        || (s === 'épaule' && /[eé]paule|hum[eé]r|clavicule|scapul|abduction|coiffe.*rot|acromio/i.test(allText))
        || (s === 'genou' && /genou|plateau.*tibial|rotule|lca|lig.*crois|gonarthrose/i.test(allText))
        || (s === 'cheville' && /cheville|mall[eé]ol|calcan|pilon.*tibial|tarse|tibio.*tarsi/i.test(allText))
        || (s === 'hanche' && /hanche|col.*f[eé]mor|trochant|coxo|pth|cotyle|ac[eé]tabul/i.test(allText))
        || (s === 'fémur' && /f[eé]mur|diaphys.*f[eé]m|sous[\s-]?trochant/i.test(allText))
        || (s === 'tibia' && /tibia|jambe|diaphys.*tib/i.test(allText))
        || (s === 'poignet' && /poignet|radius.*inf[eé]rieur|scapho[ïi]de|pouteau|pronosupination/i.test(allText))
        || (s === 'coude' && /coude|ol[eé]cran|t[eê]te.*radial|pronosupination/i.test(allText))
        || (s === 'main' && /main|pouce|index|doigt|m[eé]dius|m[eé]tacarp|phalang/i.test(allText))
        || (s === 'pied' && /pied|calcan[eé]um|tarse|orteil|m[eé]tatars|B[oö]hler/i.test(allText))
        || (s === 'jambe' && /jambe|tibia|p[eé]ron[eé]|deux.*os/i.test(allText))
        || (s === 'humérus' && /hum[eé]rus|bras|diaphys.*hum/i.test(allText))
        || (s === 'rotule' && /rotule|patell/i.test(allText))
        || (s === 'avant-bras' && /avant[\s-]?bras|pronosupination|radius.*cubitus|deux.*os.*avant/i.test(allText));
    });

    const testPass = isPolytrauma && rateInRange;

    const part = i < 12 ? '2 SYS' : i < 24 ? '3 SYS' : i < 34 ? '4 SYS' : '5-6 SYS';
    console.log(`─── Cas ${i + 1} (${part}) ───`);
    console.log(`  Description: ${tc.description}`);
    console.log(`  Input     : "${tc.input.substring(0, 100)}..."`);
    console.log(`  Obtenu    : ${testPass ? '✅' : '❌'} ${name}`);
    console.log(`  Taux      : ${numRate}%`);
    console.log(`  Polytrauma: ${isPolytrauma ? '✅' : '❌'} | Taux OK: ${rateInRange ? '✅' : '❌'} | Syst. trouvés: ${systemsFound.length}/${tc.expectedSystems.length}`);
    if (!testPass) {
      console.log(`  ⚠️ ATTENDU: polytrauma=true, taux ${tc.expectedMinRate}-${tc.expectedMaxRate}%`);
      console.log(`  ⚠️ OBTENU : polytrauma=${isPolytrauma}, taux=${numRate}%, name="${name}"`);
    }

    if (testPass) passed++; else failed++;
  }

  console.log(`\n${'═'.repeat(65)}`);
  console.log(`  RÉSULTAT GLOBAL : ${passed}/40 trouvés | ${failed}/40 échoués`);
  console.log(`${'═'.repeat(65)}\n`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
