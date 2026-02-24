// Test 30 cas : polytraumatismes complexes multi-systèmes (V3.3.302)
// Combinaisons variées: crâne, thorax, abdomen, rachis, sensoriel, psy + orthopédie
import { localExpertAnalysis } from './components/AiAnalyzer';

interface TestCase {
  input: string;
  expectedSystems: string[];
  expectedMinRate: number;
  expectedMaxRate: number;
  description: string;
}

const testCases: TestCase[] = [
  // ============================================================
  // SECTION A : CRÂNE + MEMBRES (cas 1-5)
  // ============================================================
  {
    // Cas 1 : TC modéré + fracture humérus + fracture fémur
    input: "traumatisme crânien modéré avec perte de connaissance initiale de 30 minutes et céphalées chroniques résiduelles et troubles mnésiques légers ; fracture de la diaphyse humérale droite dominante consolidée avec cal satisfaisant mais limitation de l'abduction de l'épaule à 90 degrés ; fracture diaphysaire du fémur gauche ostéosynthésée avec raccourcissement de 2 cm et raideur du genou homolatéral flexion limitée à 100 degrés et boiterie résiduelle",
    expectedSystems: ['crâne', 'épaule', 'fémur'],
    expectedMinRate: 20,
    expectedMaxRate: 60,
    description: "TC modéré + fracture humérus D + fracture fémur G"
  },
  {
    // Cas 2 : TC léger + amputation 2 doigts + fracture plateau tibial
    input: "syndrome post-commotionnel persistant avec céphalées et vertiges positionnels et troubles de concentration après traumatisme crânien léger ; amputation traumatique de l'index et du médius de la main droite dominante par machine à bois avec gêne fonctionnelle à la prise ; fracture du plateau tibial externe du genou gauche avec enfoncement articulaire de 5 mm et raideur du genou flexion limitée à 90 degrés et douleurs mécaniques à la marche",
    expectedSystems: ['crâne', 'main', 'genou'],
    expectedMinRate: 20,
    expectedMaxRate: 55,
    description: "TC léger + amputation index+médius MD + plateau tibial G"
  },
  {
    // Cas 3 : TC avec embarrure + fracture radius + fracture 2 os jambe
    input: "traumatisme crânien avec embarrure pariétale droite opérée et crises comitiales partielles sous traitement antiépileptique bien équilibré et céphalées ; fracture de l'extrémité inférieure du radius gauche non dominant consolidée avec raideur du poignet et limitation de la pronosupination à 50 pour cent ; fracture des deux os de la jambe droite consolidée avec cal vicieux angulaire de 8 degrés et raideur de la cheville en flexion dorsale limitée à 5 degrés",
    expectedSystems: ['crâne', 'poignet', 'jambe'],
    expectedMinRate: 20,
    expectedMaxRate: 60,
    description: "TC embarrure + épilepsie + fracture radius G + fracture 2 os jambe D"
  },
  {
    // Cas 4 : Déficit cognitif post-TC + luxation épaule récidivante + fracture calcanéum
    input: "traumatisme crânien grave avec déficit cognitif séquellaire comprenant troubles de la mémoire à court terme et syndrome dysexécutif modéré et ralentissement idéatoire ; luxation récidivante de l'épaule droite dominante opérée par butée coracoïdienne avec limitation persistante de l'abduction à 100 degrés et de la rotation externe à 30 degrés ; fracture du calcanéum gauche avec affaissement de l'angle de Böhler et douleurs permanentes à l'appui et arthrose sous-talienne",
    expectedSystems: ['crâne', 'épaule', 'pied'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "TC grave déficit cognitif + luxation épaule D + calcanéum G"
  },
  {
    // Cas 5 : Hématome extra-dural + fracture clavicule + fracture bimalléolaire
    input: "séquelles d'hématome extra-dural gauche opéré en urgence avec syndrome subjectif commun persistant et céphalées quotidiennes et troubles du sommeil ; fracture de la clavicule droite consolidée avec cal saillant et limitation de l'élévation de l'épaule à 140 degrés et douleurs à l'effort du bras au dessus de la tête ; fracture bimalléolaire de la cheville gauche ostéosynthésée avec raideur résiduelle de la cheville et instabilité en varus et douleurs à la marche prolongée",
    expectedSystems: ['crâne', 'épaule', 'cheville'],
    expectedMinRate: 15,
    expectedMaxRate: 70,
    description: "HED opéré + fracture clavicule D + bimalléolaire G"
  },

  // ============================================================
  // SECTION B : THORACO-ABDOMINAL + MEMBRES (cas 6-10)
  // ============================================================
  {
    // Cas 6 : Pneumothorax + splénectomie + fracture fémur + raideur épaule
    input: "séquelles de pneumothorax gauche drainé avec adhérences pleurales et douleurs thoraciques chroniques et dyspnée d'effort modérée stade II ; splénectomie totale pour rupture traumatique de la rate avec vaccination anti-pneumococcique et risque infectieux permanent ; fracture diaphysaire du fémur droit consolidée avec raccourcissement de 2 cm et raideur du genou et boiterie ; raideur de l'épaule gauche après fracture de la tête humérale avec abduction limitée à 70 degrés",
    expectedSystems: ['thorax', 'abdomen', 'fémur', 'épaule'],
    expectedMinRate: 30,
    expectedMaxRate: 75,
    description: "Pneumothorax + splénectomie + fémur D + épaule G"
  },
  {
    // Cas 7 : Volet costal + néphrectomie + fracture humérus
    input: "volet costal antéro-latéral gauche avec fractures des 4ème 5ème 6ème et 7ème côtes et séquelles de contusion pulmonaire avec syndrome restrictif modéré et dyspnée d'effort permanent ; néphrectomie gauche pour contusion rénale grave avec fonction rénale du rein restant satisfaisante ; fracture diaphysaire de l'humérus droit dominant consolidée avec cal satisfaisant mais raideur résiduelle de l'épaule et limitation de l'abduction à 80 degrés et perte de force",
    expectedSystems: ['thorax', 'abdomen', 'épaule'],
    expectedMinRate: 30,
    expectedMaxRate: 70,
    description: "Volet costal G + néphrectomie G + fracture humérus D"
  },
  {
    // Cas 8 : Fractures costales + contusion hépatique + fracture bassin + poignet
    input: "fractures des 8ème 9ème et 10ème côtes droites consolidées avec douleurs thoraciques à l'inspiration profonde et à la toux ; contusion hépatique grade II résorbée avec douleurs résiduelles de l'hypochondre droit et transaminases normalisées ; fracture du cadre obturateur du bassin gauche consolidée avec douleurs pelviennes à la station assise prolongée ; fracture de l'extrémité inférieure du radius droit dominant avec raideur du poignet et limitation de la flexion-extension et de la pronosupination de 40 pour cent",
    expectedSystems: ['thorax', 'abdomen', 'bassin', 'poignet'],
    expectedMinRate: 15,
    expectedMaxRate: 70,
    description: "Côtes D + contusion hépatique + bassin G + radius D"
  },
  {
    // Cas 9 : Hémothorax + résection intestinale + fracture tibia + rachis lombaire
    input: "hémothorax droit drainé avec pacchypleurite résiduelle et douleurs thoraciques chroniques à la respiration profonde ; résection de 50 cm d'intestin grêle pour contusion mésentérique avec troubles du transit persistants et diarrhée intermittente ; fracture diaphysaire du tibia gauche consolidée avec cal vicieux angulaire et raccourcissement de 1 cm et raideur de la cheville ; hernie discale lombaire L4-L5 post-traumatique avec sciatalgie gauche résiduelle et raideur du rachis lombaire distance doigt-sol à 35 cm",
    expectedSystems: ['thorax', 'abdomen', 'tibia', 'rachis'],
    expectedMinRate: 25,
    expectedMaxRate: 65,
    description: "Hémothorax D + résection intestinale + tibia G + hernie L4-L5"
  },
  {
    // Cas 10 : Contusion pulmonaire + gastrectomie partielle + fracture épaule + genou
    input: "contusion pulmonaire bilatérale avec fibrose pulmonaire séquellaire et syndrome restrictif léger et dyspnée d'effort au stade I ; gastrectomie partielle des deux tiers pour perforation gastrique traumatique avec dumping syndrome modéré et amaigrissement de 6 kg ; fracture de la tête humérale gauche avec raideur sévère de l'épaule abduction limitée à 60 degrés et rotation externe impossible ; fracture du plateau tibial interne du genou droit avec déviation en varus et raideur du genou flexion à 90 degrés",
    expectedSystems: ['thorax', 'abdomen', 'épaule', 'genou'],
    expectedMinRate: 30,
    expectedMaxRate: 75,
    description: "Contusion pulmonaire + gastrectomie + épaule G + plateau tibial D"
  },

  // ============================================================
  // SECTION C : RACHIS MULTI-ÉTAGE + PÉRIPHÉRIQUE (cas 11-15)
  // ============================================================
  {
    // Cas 11 : Rachis cervical + lombaire + fracture bassin + raideur genou
    input: "raideur du rachis cervical post-traumatique avec limitation des rotations à 50 pour cent et cervicalgies chroniques avec irradiation vers le bras gauche ; hernie discale lombaire L5-S1 post-traumatique opérée avec lombo-sciatique résiduelle et raideur du rachis lombaire distance doigt-sol à 30 cm ; fracture de l'aile iliaque gauche consolidée avec douleurs pelviennes ; fracture supra-condylienne du fémur droit avec raideur du genou et flexion limitée à 80 degrés",
    expectedSystems: ['rachis', 'rachis', 'bassin', 'genou'],
    expectedMinRate: 20,
    expectedMaxRate: 60,
    description: "Rachis cervical + lombaire + aile iliaque G + genou D"
  },
  {
    // Cas 12 : Tassement dorsal + hernie lombaire + fracture cotyle + coude
    input: "tassement vertébral de D11 avec cyphose dorsale de 15 degrés et douleurs dorsales chroniques ; hernie discale lombaire L4-L5 post-traumatique avec cruralgie droite résiduelle et raideur du rachis lombaire ; fracture du cotyle de la hanche gauche avec arthrose coxo-fémorale post-traumatique débutante et limitation des mouvements et boiterie ; fracture de l'olécrane du coude droit dominant avec raideur en flexion limitée à 100 degrés et douleurs à l'appui",
    expectedSystems: ['rachis', 'rachis', 'hanche', 'coude'],
    expectedMinRate: 25,
    expectedMaxRate: 65,
    description: "Tassement D11 + hernie L4-L5 + cotyle G + olécrane D"
  },
  {
    // Cas 13 : Rachis cervical + dorsal + lombaire + fracture fémur
    input: "entorse grave du rachis cervical avec raideur marquée en rotation et flexion-extension et névralgie cervico-brachiale C6 droite résiduelle ; tassement vertébral de D8 avec douleurs intercostales persistantes ; raideur sévère du rachis lombaire après fracture de L2 avec canal lombaire étroit post-traumatique et sciatalgie bilatérale et distance doigt-sol à 45 cm ; fracture diaphysaire du fémur gauche consolidée avec cal vicieux en rotation externe et raccourcissement de 3 cm",
    expectedSystems: ['rachis', 'rachis', 'rachis', 'fémur'],
    expectedMinRate: 30,
    expectedMaxRate: 75,
    description: "Rachis triple étage (C+D+L) + fémur G"
  },
  {
    // Cas 14 : Rachis lombaire + bassin + hanche + cheville
    input: "fracture de L3 avec tassement cunéiforme et raideur du rachis lombaire et lombalgies chroniques mécaniques ; fracture de la branche ischio-pubienne droite consolidée avec douleurs à la station assise ; raideur de la hanche droite après fracture du massif trochantérien avec limitation de la flexion à 80 degrés et rotation interne limitée et boiterie ; fracture bimalléolaire de la cheville droite avec raideur résiduelle et instabilité et douleurs à la marche sur terrain irrégulier",
    expectedSystems: ['rachis', 'bassin', 'hanche', 'cheville'],
    expectedMinRate: 20,
    expectedMaxRate: 65,
    description: "Rachis L3 + ischio-pubienne D + hanche D + bimalléolaire D"
  },
  {
    // Cas 15 : Rachis cervical + bassin + fracture radius + plateau tibial
    input: "raideur du rachis cervical post-entorse grave avec limitation sévère des rotations et cervicalgies chroniques invalidantes et vertiges cervicogéniques ; disjonction de la symphyse pubienne consolidée avec diastasis résiduel de 10 mm et douleurs pelviennes chroniques ; fracture de l'extrémité inférieure du radius gauche avec raideur du poignet et limitation de la pronosupination ; fracture du plateau tibial externe droit avec enfoncement résiduel et déviation en valgus et raideur du genou flexion limitée à 100 degrés",
    expectedSystems: ['rachis', 'bassin', 'poignet', 'genou'],
    expectedMinRate: 10,
    expectedMaxRate: 60,
    description: "Rachis cervical + symphyse pubienne + radius G + plateau tibial D"
  },

  // ============================================================
  // SECTION D : SENSORIEL + NEUROLOGIQUE + ORTHOPÉDIQUE (cas 16-20)
  // ============================================================
  {
    // Cas 16 : BAV unilatérale + fracture fémur + raideur épaule
    input: "baisse de l'acuité visuelle de l'oeil droit à 2/10 après contusion du globe oculaire avec iridodialyse et oeil gauche conservé à 10/10 ; fracture diaphysaire du fémur gauche consolidée avec cal satisfaisant et raccourcissement de 2 cm et raideur du genou flexion à 100 degrés ; fracture du col chirurgical de l'humérus droit dominant avec raideur de l'épaule et abduction limitée à 80 degrés et rotation externe limitée",
    expectedSystems: ['vision', 'fémur', 'épaule'],
    expectedMinRate: 20,
    expectedMaxRate: 65,
    description: "BAV OD 2/10 + fémur G + épaule D"
  },
  {
    // Cas 17 : Surdité bilatérale + TC + fracture tibia + poignet
    input: "surdité de perception bilatérale moyenne à 40 dB aux fréquences conversationnelles avec acouphènes permanents invalidants après traumatisme crânien ; syndrome subjectif post-commotionnel avec céphalées chroniques et vertiges positionnels ; fracture du tiers inférieur du tibia droit consolidée avec raideur de la cheville et douleurs à la marche ; fracture de l'extrémité inférieure du radius gauche avec raideur du poignet et arthrose radio-carpienne débutante",
    expectedSystems: ['audition', 'crâne', 'tibia', 'poignet'],
    expectedMinRate: 20,
    expectedMaxRate: 60,
    description: "Surdité bilatérale + TC + tibia D + radius G"
  },
  {
    // Cas 18 : Diplopie + paralysie faciale + fracture bassin + genou
    input: "diplopie séquellaire dans le regard vers le haut après fracture du plancher orbitaire droit avec limitation de l'élévation du globe ; paralysie faciale périphérique gauche séquellaire avec asymétrie faciale permanente et syncinésies et larmoiement ; fracture du cadre obturateur du bassin consolidée avec douleurs pelviennes résiduelles ; fracture du plateau tibial interne du genou gauche avec raideur et flexion limitée à 90 degrés et gonarthrose débutante",
    expectedSystems: ['vision', 'crâne', 'bassin', 'genou'],
    expectedMinRate: 20,
    expectedMaxRate: 60,
    description: "Diplopie + paralysie faciale + bassin + plateau tibial G"
  },
  {
    // Cas 19 : BAV bilatérale + surdité + rachis cervical + hanche
    input: "baisse de l'acuité visuelle OD à 4/10 et OG à 6/10 après contusion bilatérale des globes oculaires avec hyphéma résorbé ; surdité de transmission unilatérale droite à 30 dB par luxation de la chaîne ossiculaire ; raideur du rachis cervical post-traumatique avec cervicalgies chroniques et limitation modérée des rotations ; fracture du col du fémur gauche traitée par ostéosynthèse avec raideur résiduelle de la hanche et boiterie",
    expectedSystems: ['vision', 'audition', 'rachis', 'hanche'],
    expectedMinRate: 20,
    expectedMaxRate: 65,
    description: "BAV bilatérale + surdité D + rachis cervical + col fémur G"
  },
  {
    // Cas 20 : Anosmie + BAV unilatérale + fracture humérus + fracture tibia
    input: "anosmie totale post-traumatique par lésion de la lame criblée de l'ethmoïde avec perte complète de l'odorat ; baisse de l'acuité visuelle de l'oeil gauche à 3/10 après contusion oculaire directe avec oeil droit à 10/10 ; fracture diaphysaire de l'humérus gauche consolidée avec cal satisfaisant mais raideur résiduelle de l'épaule abduction à 90 degrés ; fracture du tibia droit au tiers moyen consolidée avec cal vicieux angulaire de 5 degrés et douleurs résiduelles à la marche",
    expectedSystems: ['odorat', 'vision', 'épaule', 'tibia'],
    expectedMinRate: 20,
    expectedMaxRate: 60,
    description: "Anosmie + BAV OG 3/10 + humérus G + tibia D"
  },

  // ============================================================
  // SECTION E : PSYCHIATRIQUE + MULTI-APPAREIL (cas 21-25)
  // ============================================================
  {
    // Cas 21 : TSPT sévère + fracture fémur + raideur épaule + rachis lombaire
    input: "état de stress post-traumatique sévère avec cauchemars récurrents et hypervigilance permanente et conduite d'évitement majeur et traitement psychotrope au long cours ; fracture diaphysaire du fémur droit consolidée avec raccourcissement de 2 cm et raideur du genou homolatéral ; raideur de l'épaule gauche après fracture de la tête humérale avec abduction limitée à 80 degrés ; raideur du rachis lombaire post-tassement de L1 avec distance doigt-sol à 30 cm et lombalgies mécaniques",
    expectedSystems: ['psychiatrique', 'fémur', 'épaule', 'rachis'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "TSPT sévère + fémur D + épaule G + rachis L1"
  },
  {
    // Cas 22 : Dépression majeure + TC + fracture bassin + cheville
    input: "syndrome dépressif majeur réactionnel post-traumatique avec idéation suicidaire passée et traitement par antidépresseur et anxiolytique au long cours et retentissement social et professionnel majeur ; traumatisme crânien avec syndrome subjectif commun persistant comprenant céphalées chroniques et troubles de la concentration ; fracture de l'aile iliaque droite consolidée avec douleurs pelviennes chroniques ; fracture bimalléolaire de la cheville gauche avec raideur résiduelle et instabilité et douleurs à la marche",
    expectedSystems: ['psychiatrique', 'crâne', 'bassin', 'cheville'],
    expectedMinRate: 20,
    expectedMaxRate: 65,
    description: "Dépression majeure + TC + aile iliaque D + bimalléolaire G"
  },
  {
    // Cas 23 : Anxiété généralisée + thorax + fracture humérus + genou
    input: "trouble anxieux généralisé post-traumatique avec attaques de panique fréquentes et agoraphobie et traitement anxiolytique quotidien ; fractures des 5ème et 6ème côtes gauches consolidées avec douleurs thoraciques résiduelles à l'effort et à la toux ; fracture du col chirurgical de l'humérus gauche non dominant consolidée avec raideur de l'épaule et limitation de l'abduction à 90 degrés ; fracture du plateau tibial externe du genou droit avec raideur et flexion limitée à 100 degrés et douleurs à la descente des escaliers",
    expectedSystems: ['psychiatrique', 'thorax', 'épaule', 'genou'],
    expectedMinRate: 20,
    expectedMaxRate: 60,
    description: "Anxiété généralisée + côtes G + humérus G + plateau tibial D"
  },
  {
    // Cas 24 : TSPT + splénectomie + rachis dorsal + fracture tibia
    input: "état de stress post-traumatique avec reviviscences diurnes et troubles du sommeil majeurs et conduites d'évitement des déplacements en voiture et suivi psychiatrique régulier ; splénectomie totale pour rupture traumatique de la rate avec risque infectieux permanent et vaccination préventive ; tassement vertébral de D10 avec cyphose dorsale de 10 degrés et douleurs dorsales chroniques ; fracture diaphysaire du tibia gauche consolidée avec cal satisfaisant mais raideur de la cheville et douleurs à la marche prolongée",
    expectedSystems: ['psychiatrique', 'abdomen', 'rachis', 'tibia'],
    expectedMinRate: 25,
    expectedMaxRate: 65,
    description: "TSPT + splénectomie + tassement D10 + tibia G"
  },
  {
    // Cas 25 : Trouble adaptation + amputation doigts + fémur + rachis lombaire
    input: "trouble de l'adaptation avec humeur anxio-dépressive post-traumatique avec irritabilité et troubles du sommeil et retentissement professionnel ; amputation traumatique du pouce et de l'index de la main droite dominante avec gêne fonctionnelle majeure à la prise fine ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 2 cm et boiterie résiduelle ; raideur du rachis lombaire après hernie discale L5-S1 post-traumatique opérée avec lombalgies résiduelles et distance doigt-sol à 25 cm",
    expectedSystems: ['psychiatrique', 'main', 'fémur', 'rachis'],
    expectedMinRate: 25,
    expectedMaxRate: 75,
    description: "Trouble adaptation + amputation pouce+index MD + fémur G + hernie L5-S1"
  },

  // ============================================================
  // SECTION F : POLYTRAUMATISME MASSIF ≥5 SIÈGES (cas 26-30)
  // ============================================================
  {
    // Cas 26 : TC + thorax + fémur + rachis + épaule — 5 sièges
    input: "traumatisme crânien avec céphalées chroniques et troubles de la concentration séquellaires ; fractures des 5ème 6ème et 7ème côtes droites consolidées avec douleurs thoraciques résiduelles et dyspnée d'effort légère ; fracture diaphysaire du fémur gauche ostéosynthésée avec raccourcissement de 2 cm et raideur du genou flexion limitée à 100 degrés ; tassement vertébral de L1 avec raideur du rachis lombaire et lombalgies mécaniques ; luxation de l'épaule droite dominante réduite avec instabilité résiduelle et limitation de l'abduction à 120 degrés et de la rotation externe",
    expectedSystems: ['crâne', 'thorax', 'fémur', 'rachis', 'épaule'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "5 sièges: TC + côtes D + fémur G + tassement L1 + épaule D"
  },
  {
    // Cas 27 : TC + abdomen + bassin + genou + poignet — 5 sièges
    input: "traumatisme crânien léger avec syndrome post-commotionnel persistant et céphalées et vertiges ; splénectomie totale pour rupture traumatique de la rate ; fracture de la branche ischio-pubienne gauche consolidée avec douleurs pelviennes résiduelles ; fracture du plateau tibial externe du genou droit avec raideur du genou et flexion limitée à 90 degrés et gonarthrose débutante ; fracture de l'extrémité inférieure du radius gauche avec raideur du poignet et limitation de la pronosupination à 60 pour cent",
    expectedSystems: ['crâne', 'abdomen', 'bassin', 'genou', 'poignet'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "5 sièges: TC + splénectomie + bassin G + plateau tibial D + radius G"
  },
  {
    // Cas 28 : Rachis + thorax + hanche + tibia + épaule + psy — 6 sièges
    input: "raideur du rachis cervical post-traumatique sévère avec névralgie cervico-brachiale C5-C6 gauche et limitation marquée des rotations ; volet costal gauche opéré avec séquelles de contusion pulmonaire et syndrome restrictif modéré ; fracture du col du fémur droit traitée par prothèse totale de hanche avec boiterie résiduelle et aide technique par canne ; fracture du tibia gauche consolidée avec cal vicieux angulaire et raccourcissement de 1 cm ; fracture de la tête humérale gauche avec raideur de l'épaule et abduction limitée à 70 degrés ; état de stress post-traumatique modéré avec troubles du sommeil et évitement des situations rappelant l'accident",
    expectedSystems: ['rachis', 'thorax', 'hanche', 'tibia', 'épaule', 'psychiatrique'],
    expectedMinRate: 40,
    expectedMaxRate: 85,
    description: "6 sièges: rachis cervical + volet costal + PTH + tibia G + épaule G + TSPT"
  },
  {
    // Cas 29 : TC + vision + fémur + rachis + bassin — 5 sièges
    input: "traumatisme crânien grave avec déficit cognitif résiduel modéré comprenant troubles de la mémoire et du comportement et céphalées invalidantes ; baisse de l'acuité visuelle de l'oeil gauche à 3/10 après contusion du globe oculaire avec oeil droit à 8/10 ; fracture diaphysaire du fémur droit avec cal vicieux en rotation externe et raccourcissement de 3 cm et boiterie permanente ; hernie discale lombaire L4-L5 post-traumatique avec sciatalgie droite déficitaire et raideur du rachis lombaire distance doigt-sol à 40 cm ; fracture du cotyle gauche avec arthrose de la hanche débutante et limitation de la flexion à 80 degrés",
    expectedSystems: ['crâne', 'vision', 'fémur', 'rachis', 'hanche'],
    expectedMinRate: 35,
    expectedMaxRate: 85,
    description: "5 sièges: TC grave + BAV OG + fémur D + hernie L4-L5 + cotyle G"
  },
  {
    // Cas 30 : TC + thorax + abdomen + rachis + fémur + épaule — 6 sièges (accident massif)
    input: "traumatisme crânien avec perte de connaissance prolongée et syndrome subjectif commun invalidant avec céphalées chroniques quotidiennes et troubles de la concentration et vertiges positionnels ; fracas thoracique avec fractures costales multiples de la 4ème à la 8ème côte gauche et contusion pulmonaire séquellaire avec syndrome restrictif modéré ; néphrectomie gauche pour contusion rénale grade IV ; tassement vertébral de D12 et L1 avec cyphose dorso-lombaire de 20 degrés et raideur majeure du rachis lombaire distance doigt-sol à 45 cm ; fracture diaphysaire du fémur droit consolidée avec raccourcissement de 3 cm et raideur du genou homolatéral flexion limitée à 80 degrés ; fracture comminutive de la tête humérale gauche avec prothèse d'épaule et raideur sévère abduction limitée à 45 degrés",
    expectedSystems: ['crâne', 'thorax', 'abdomen', 'rachis', 'fémur', 'épaule'],
    expectedMinRate: 45,
    expectedMaxRate: 90,
    description: "6 sièges massif: TC + fracas thorax + néphrectomie + rachis D12-L1 + fémur D + prothèse épaule G"
  },
];

// ====== RUNNER ======
async function runTests() {
  let passed = 0;
  let failed = 0;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    try {
      const result = localExpertAnalysis(tc.input, []) as any;

      const name = result?.name || result?.proposals?.map((p: any) => p.name).join(' + ') || 'AUCUN';
      const rate = result?.rate !== undefined ? result.rate
        : result?.globalRate !== undefined ? result.globalRate
        : typeof result?.type === 'number' ? result.type : 0;
      const numRate = typeof rate === 'number' ? rate : parseInt(rate) || 0;
      const type = result?.type || 'unknown';
      const justif = (result?.justification || '').toLowerCase();
      const nameLower = name.toLowerCase();
      const pathLower = (result?.path || '').toLowerCase();
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

      // 2. Taux dans la fourchette (±5% tolérance)
      const rateInRange = numRate >= (tc.expectedMinRate - 5) && numRate <= (tc.expectedMaxRate + 10);

      // 3. Systèmes attendus retrouvés
      const systemsFound = tc.expectedSystems.filter(sys => {
        const s = sys.toLowerCase();
        return allText.includes(s)
          || (s === 'crâne' && /cran|crân|neurolog|commotion|contusion.*c[eé]r[eé]bral|c[eé]phal|hématome.*extra/i.test(allText))
          || (s === 'thorax' && /thorac|c[oô]te|costal|pulmon|sternum|volet|fracas|pneumo|h[eé]mothorax|pleur/i.test(allText))
          || (s === 'abdomen' && /spl[eé]n|r[eé]nal|rate|foie|h[eé]pat|gastr|n[eé]phrect|chol[eé]cyst|intestin|m[eé]sent/i.test(allText))
          || (s === 'vision' && /visuel|acuit[eé]|oculaire|oeil|\boeil\b|dipl|BAV|iridodial/i.test(allText))
          || (s === 'audition' && /audit|surdit|acouph|hypoacous|ossicul/i.test(allText))
          || (s === 'odorat' && /anosmie|odorat|olfact|lame.*cribl/i.test(allText))
          || (s === 'psychiatrique' && /d[eé]press|psychiatr|psycho|tspt|stress.*post|phobi|anxi[eé]t|adaptation/i.test(allText))
          || (s.includes('rachis') && /rachis|vert[eé]br|lombaire|cervical|dorsal|hernie.*disc|tassement|cyphose/i.test(allText))
          || (s === 'bassin' && /bassin|pelvien|obtur|cotyle|symphyse|sacrum|coccyx|iliaque|ischio/i.test(allText))
          || (s === 'épaule' && /[eé]paule|hum[eé]r|clavicule|scapul|abduction/i.test(allText))
          || (s === 'genou' && /genou|plateau.*tibial|rotule|lca|lig.*crois/i.test(allText))
          || (s === 'cheville' && /cheville|mall[eé]ol|calcan|pilon.*tibial|tarse/i.test(allText))
          || (s === 'hanche' && /hanche|col.*f[eé]mor|trochant|coxo|pth|cotyle/i.test(allText))
          || (s === 'fémur' && /f[eé]mur|diaphys.*f[eé]m/i.test(allText))
          || (s === 'tibia' && /tibia|jambe|diaphys.*tib/i.test(allText))
          || (s === 'poignet' && /poignet|radius|scapho[ïi]de|pronosupination/i.test(allText))
          || (s === 'coude' && /coude|ol[eé]cran|t[eê]te.*radial|pronosupination/i.test(allText))
          || (s === 'main' && /main|pouce|index|doigt|m[eé]dius|m[eé]tacarp|phalang/i.test(allText))
          || (s === 'pied' && /pied|calcan[eé]um|tarse|orteil|m[eé]tatars|B[oö]hler/i.test(allText))
          || (s === 'jambe' && /jambe|tibia|p[eé]ron[eé]|deux.*os/i.test(allText));
      });

      const testPass = isPolytrauma && rateInRange;

      if (testPass) passed++;
      else failed++;

      console.log(`─── Cas ${i + 1} ───`);
      console.log(`  Description: ${tc.description}`);
      console.log(`  Sièges    : ${tc.expectedSystems.join(' + ')}`);
      console.log(`  Attendu   : Polytraumatisme (${tc.expectedMinRate}-${tc.expectedMaxRate}%)`);
      console.log(`  Obtenu    : ${testPass ? '✅' : '❌'} ${name}`);
      console.log(`  Taux      : ${numRate}%`);
      console.log(`  Type      : ${type}`);
      console.log(`  Polytrauma: ${isPolytrauma ? '✅' : '❌'} | Taux OK: ${rateInRange ? '✅' : '❌'} | Syst: ${systemsFound.length}/${tc.expectedSystems.length}`);
      if (result?.path) console.log(`  Path      : ${result.path}`);
      if (!testPass) {
        const reasons: string[] = [];
        if (!isPolytrauma) reasons.push('PAS reconnu comme polytraumatisme');
        if (!rateInRange) reasons.push(`Taux ${numRate}% hors fourchette ${tc.expectedMinRate}-${tc.expectedMaxRate}%`);
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
