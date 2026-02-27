// Test 50 cas : polytraumatismes complexes multi-systèmes (V3.3.319)
// Combinaisons variées: crâne, thorax, abdomen, rachis, sensoriel, psy, membres sup/inf
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
  // SECTION A : CRÂNE + MEMBRES MULTIPLES (cas 1-8)
  // ============================================================
  {
    // Cas 1 : TC modéré + fracture fémur bilatérale
    input: "traumatisme crânien modéré avec perte de connaissance de 45 minutes et céphalées chroniques quotidiennes et vertiges positionnels ; fracture diaphysaire du fémur droit consolidée par enclouage centro-médullaire avec raccourcissement de 2 cm et raideur du genou droit flexion limitée à 90 degrés ; fracture de l'extrémité inférieure du fémur gauche ostéosynthésée avec raideur du genou gauche flexion limitée à 100 degrés et amyotrophie des deux quadriceps et boiterie avec canne",
    expectedSystems: ['crâne', 'fémur', 'fémur'],
    expectedMinRate: 30,
    expectedMaxRate: 70,
    description: "TC modéré + fracture fémur bilatérale"
  },
  {
    // Cas 2 : TC grave + amputation avant-bras + fracture cheville
    input: "traumatisme crânien grave avec hémiparésie droite légère séquellaire et troubles cognitifs à type de ralentissement idéatoire et troubles de la mémoire à court terme et céphalées invalidantes ; amputation de l'avant-bras gauche au tiers moyen appareillée avec prothèse myoélectrique et douleurs du moignon ; fracture bimalléolaire de la cheville droite avec raideur résiduelle et instabilité en varus et douleurs à la marche prolongée sur terrain irrégulier",
    expectedSystems: ['crâne', 'épaule', 'cheville'],
    expectedMinRate: 40,
    expectedMaxRate: 85,
    description: "TC grave hémiparésie + amputation avant-bras G + bimalléolaire D"
  },
  {
    // Cas 3 : HED opéré + fracture humérus + fracture 2 os jambe + fracture poignet
    input: "séquelles d'hématome extra-dural droit opéré avec crises d'épilepsie partielles sous traitement et céphalées ; fracture diaphysaire de l'humérus droit dominant consolidée avec cal vicieux et raideur de l'épaule abduction limitée à 80 degrés ; fracture des deux os de la jambe gauche consolidée avec cal vicieux angulaire de 10 degrés et raccourcissement de 2 cm et raideur de la cheville ; fracture du scaphoïde du poignet gauche consolidée avec raideur du poignet et limitation de la flexion-extension",
    expectedSystems: ['crâne', 'épaule', 'jambe', 'poignet'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "HED + épilepsie + humérus D + 2 os jambe G + scaphoïde G"
  },
  {
    // Cas 4 : TC sévère + fracture bassin + fracture rotule + luxation épaule
    input: "traumatisme crânien sévère avec déficit cognitif séquellaire comprenant syndrome dysexécutif modéré et troubles de la mémoire et de l'attention et céphalées quotidiennes ; fracture de l'aile iliaque droite et de la branche ischio-pubienne homolatérale consolidées avec douleurs pelviennes chroniques et gêne à la station assise prolongée ; fracture de la rotule gauche ostéosynthésée avec raideur du genou et flexion limitée à 100 degrés ; luxation récidivante de l'épaule droite dominante opérée avec limitation de l'abduction à 110 degrés et de la rotation externe",
    expectedSystems: ['crâne', 'bassin', 'genou', 'épaule'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "TC sévère + bassin D + rotule G + luxation épaule D"
  },
  {
    // Cas 5 : Contusion cérébrale + fracture col fémur + fracture radius bilateral
    input: "contusion cérébrale frontale gauche avec troubles du comportement séquellaires à type de désinhibition et d'irritabilité et céphalées chroniques ; fracture du col du fémur droit traitée par vis-plaque DHS avec raccourcissement de 1 cm et raideur de la hanche et boiterie résiduelle ; fracture de l'extrémité inférieure du radius droit consolidée avec raideur du poignet et fracture de l'extrémité inférieure du radius gauche consolidée avec limitation bilatérale de la pronosupination",
    expectedSystems: ['crâne', 'hanche', 'poignet'],
    expectedMinRate: 25,
    expectedMaxRate: 65,
    description: "Contusion cérébrale + col fémur D + fracture radius bilatérale"
  },
  {
    // Cas 6 : TC + fracture olécrâne + fracture calcanéum + fracture clavicule
    input: "syndrome post-commotionnel après traumatisme crânien avec céphalées persistantes et troubles de la concentration ; fracture de l'olécrâne du coude droit dominant ostéosynthésée avec raideur en flexion limitée à 110 degrés et limitation de l'extension à moins 15 degrés ; fracture du calcanéum droit avec effondrement de l'angle de Böhler et douleurs chroniques à l'appui avec boiterie ; fracture de la clavicule gauche consolidée avec cal saillant et douleurs à l'abduction de l'épaule au-delà de 130 degrés",
    expectedSystems: ['crâne', 'coude', 'pied', 'épaule'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "TC + olécrâne D + calcanéum D + clavicule G"
  },
  {
    // Cas 7 : TC avec embarrure + fracture trochanter + fracture pilon tibial
    input: "séquelles d'embarrure pariétale gauche opérée avec céphalées localisées et crises comitiales tonico-cloniques généralisées rares sous traitement antiépileptique ; fracture du massif trochantérien de la hanche gauche ostéosynthésée avec raideur de la hanche et flexion limitée à 80 degrés et rotation interne impossible et boiterie permanente ; fracture du pilon tibial droit avec arthrose tibio-tarsienne post-traumatique sévère et raideur de la cheville et douleurs permanentes à la marche",
    expectedSystems: ['crâne', 'hanche', 'cheville'],
    expectedMinRate: 20,
    expectedMaxRate: 75,
    description: "Embarrure + épilepsie + trochanter G + pilon tibial D"
  },
  {
    // Cas 8 : TC + fracture diaphyse tibia + fracture tête radiale + fracture côtes
    input: "traumatisme crânien léger avec syndrome subjectif commun comprenant céphalées et asthénie et troubles du sommeil ; fracture diaphysaire du tibia droit consolidée avec cal vicieux angulaire de 8 degrés et douleurs à la marche prolongée ; fracture de la tête radiale du coude gauche avec limitation de la pronosupination à 50 pour cent et douleurs en supination ; fractures des 4ème et 5ème côtes gauches consolidées avec douleurs thoraciques résiduelles à l'inspiration profonde",
    expectedSystems: ['crâne', 'tibia', 'coude', 'thorax'],
    expectedMinRate: 15,
    expectedMaxRate: 55,
    description: "TC léger + tibia D + tête radiale G + côtes G"
  },

  // ============================================================
  // SECTION B : THORACO-ABDOMINAL + MULTI-MEMBRES (cas 9-16)
  // ============================================================
  {
    // Cas 9 : Pneumothorax + rupture rate + fracture cotyle + fracture humérus
    input: "séquelles de pneumothorax gauche drainé avec adhérences pleurales et douleurs thoraciques chroniques et dyspnée d'effort au stade II ; splénectomie totale pour rupture de la rate avec vaccination anti-pneumococcique et risque infectieux ; fracture du cotyle de la hanche droite avec arthrose coxo-fémorale post-traumatique et limitation des amplitudes et boiterie ; fracture de la diaphyse humérale gauche consolidée avec raideur de l'épaule abduction limitée à 70 degrés",
    expectedSystems: ['thorax', 'abdomen', 'hanche', 'épaule'],
    expectedMinRate: 30,
    expectedMaxRate: 75,
    description: "Pneumothorax + splénectomie + cotyle D + humérus G"
  },
  {
    // Cas 10 : Volet costal + néphrectomie + fracture fémur + fracture radius
    input: "volet costal postérieur droit opéré avec syndrome restrictif modéré et dyspnée d'effort persistante ; néphrectomie droite pour éclatement rénal traumatique avec fonction du rein restant satisfaisante ; fracture diaphysaire du fémur gauche consolidée par enclouage avec raccourcissement de 3 cm et raideur du genou et boiterie permanente ; fracture de l'extrémité inférieure du radius droit dominant avec déplacement résiduel et raideur du poignet et arthrose radio-carpienne",
    expectedSystems: ['thorax', 'abdomen', 'fémur', 'poignet'],
    expectedMinRate: 30,
    expectedMaxRate: 75,
    description: "Volet costal D + néphrectomie D + fémur G + radius D"
  },
  {
    // Cas 11 : Hémothorax + contusion hépatique + fracture bassin + fracture plateau tibial
    input: "hémothorax gauche drainé avec pachypleurite résiduelle et douleurs thoraciques chroniques à la respiration profonde ; contusion hépatique grade III traitée conservativement avec douleurs résiduelles de l'hypochondre droit ; fracture de la branche ischio-pubienne et ilio-pubienne droites consolidées avec douleurs pelviennes chroniques ; fracture du plateau tibial externe du genou gauche avec déviation en valgus de 5 degrés et raideur du genou flexion limitée à 90 degrés et gonarthrose",
    expectedSystems: ['thorax', 'abdomen', 'bassin', 'genou'],
    expectedMinRate: 20,
    expectedMaxRate: 65,
    description: "Hémothorax G + contusion hépatique + bassin D + plateau tibial G"
  },
  {
    // Cas 12 : Fractures costales multiples + résection intestin + fracture rachis + tibia
    input: "fractures des 6ème 7ème 8ème et 9ème côtes gauches consolidées avec douleurs thoraciques chroniques à l'effort et à la toux ; résection de 80 cm d'intestin grêle pour contusion mésentérique avec syndrome du grêle court et diarrhée chronique et amaigrissement de 8 kg ; tassement vertébral de D12 avec cyphose de 15 degrés et douleurs dorsales chroniques ; fracture du tibia droit au tiers moyen consolidée par plaque vissée avec raideur de la cheville et douleurs résiduelles",
    expectedSystems: ['thorax', 'abdomen', 'rachis', 'tibia'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "Costales multiples G + résection grêle + D12 + tibia D"
  },
  {
    // Cas 13 : Contusion pulmonaire bilat + gastrectomie + fracture 2 os jambe + poignet
    input: "contusion pulmonaire bilatérale avec fibrose séquellaire et syndrome restrictif léger et dyspnée d'effort au stade I ; gastrectomie partielle des deux tiers pour perforation gastrique avec dumping syndrome et amaigrissement ; fracture des deux os de la jambe gauche consolidée avec cal vicieux et raccourcissement de 2 cm et amyotrophie du mollet ; fracture de l'extrémité inférieure du radius droit dominant avec raideur du poignet et douleurs chroniques",
    expectedSystems: ['thorax', 'abdomen', 'jambe', 'poignet'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "Contusion pulmonaire bilat + gastrectomie + 2 os jambe G + radius D"
  },
  {
    // Cas 14 : Sternum + cholécystectomie + fracture épaule + fracture cheville
    input: "fracture du sternum consolidée avec douleurs sternales chroniques à la palpation et à l'effort thoracique ; cholécystectomie pour contusion des voies biliaires traumatique avec douleurs abdominales résiduelles modérées ; fracture comminutive de l'extrémité supérieure de l'humérus gauche avec raideur sévère de l'épaule abduction limitée à 60 degrés et rotation externe impossible ; fracture trimalléolaire de la cheville droite ostéosynthésée avec raideur résiduelle et arthrose tibio-tarsienne débutante",
    expectedSystems: ['thorax', 'abdomen', 'épaule', 'cheville'],
    expectedMinRate: 20,
    expectedMaxRate: 65,
    description: "Sternum + cholécystectomie + épaule G + trimalléolaire D"
  },
  {
    // Cas 15 : Thorax + rate + hanche prothèse + genou
    input: "fractures des 5ème 6ème et 7ème côtes droites avec douleurs thoraciques chroniques à la respiration profonde ; splénectomie totale pour rupture traumatique de la rate ; fracture du col du fémur gauche traitée par prothèse totale de hanche avec boiterie résiduelle légère et douleurs mécaniques occasionnelles ; fracture supra-condylienne du fémur droit avec raideur du genou et flexion limitée à 80 degrés et douleurs à la descente des escaliers et amyotrophie du quadriceps",
    expectedSystems: ['thorax', 'abdomen', 'hanche', 'genou'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "Côtes D + splénectomie + PTH G + raideur genou D"
  },
  {
    // Cas 16 : Rupture diaphragme + contusion rénale + fracture bassin + fracture avant-bras
    input: "rupture du diaphragme gauche réparée chirurgicalement avec éventration diaphragmatique résiduelle et dyspnée d'effort ; contusion rénale droite grade II avec hématome périnéal résorbé et douleurs lombaires résiduelles ; fracture du cadre obturateur du bassin consolidée avec douleurs pelviennes à la station assise ; fracture des deux os de l'avant-bras gauche au tiers moyen consolidée avec limitation de la pronosupination à 40 pour cent et raideur du poignet",
    expectedSystems: ['thorax', 'abdomen', 'bassin', 'poignet'],
    expectedMinRate: 20,
    expectedMaxRate: 65,
    description: "Rupture diaphragme + contusion rénale + bassin + 2 os avant-bras G"
  },

  // ============================================================
  // SECTION C : RACHIS MULTI-ÉTAGE + MULTI-MEMBRES (cas 17-24)
  // ============================================================
  {
    // Cas 17 : Rachis cervical + lombaire + fracture fémur + fracture radius
    input: "raideur du rachis cervical post-traumatique avec limitation des rotations à 50 pour cent et cervicalgies chroniques irradiant vers le bras droit ; hernie discale L4-L5 post-traumatique avec sciatalgie gauche déficitaire et raideur du rachis lombaire distance doigt-sol à 35 cm ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 2 cm et raideur du genou flexion à 100 degrés ; fracture de l'extrémité inférieure du radius droit dominant avec raideur du poignet et limitation de la pronosupination",
    expectedSystems: ['rachis', 'rachis', 'fémur', 'poignet'],
    expectedMinRate: 10,
    expectedMaxRate: 65,
    description: "Rachis cervical + hernie L4-L5 + fémur G + radius D"
  },
  {
    // Cas 18 : Rachis triple étage + fracture tibia
    input: "entorse grave du rachis cervical C4-C5 avec discopathie et cervicalgies chroniques et limitation modérée des mouvements ; tassement vertébral de D8 consolidé avec douleurs intercostales et cyphose de 10 degrés ; fracture de L2 avec canal lombaire étroit post-traumatique et claudication neurogène à 200 mètres et lombo-sciatalgie bilatérale permanente ; fracture diaphysaire du tibia droit consolidée avec cal vicieux en valgus de 8 degrés et raccourcissement de 1 cm et boiterie",
    expectedSystems: ['rachis', 'rachis', 'rachis', 'tibia'],
    expectedMinRate: 15,
    expectedMaxRate: 75,
    description: "Rachis triple étage (C+D+L) canal étroit + tibia D"
  },
  {
    // Cas 19 : Rachis lombaire fracture L1 + hanche + cheville + coude
    input: "fracture-tassement de L1 avec cyphose de 20 degrés et raideur sévère du rachis lombaire distance doigt-sol à 45 cm et lombalgies permanentes ; fracture du massif trochantérien de la hanche droite ostéosynthésée avec raideur résiduelle et limitation de la flexion à 80 degrés et rotation interne limitée et boiterie ; fracture bimalléolaire de la cheville gauche avec raideur et instabilité résiduelle ; fracture de l'olécrâne du coude gauche avec raideur en flexion limitée à 100 degrés",
    expectedSystems: ['rachis', 'hanche', 'cheville', 'coude'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "Fracture L1 + trochanter D + bimalléolaire G + olécrâne G"
  },
  {
    // Cas 20 : Rachis cervical + dorsal + fracture épaule bilatérale
    input: "entorse grave du rachis cervical C5-C6 avec cervicalgies chroniques invalidantes et névralgie cervico-brachiale bilatérale et limitation sévère des rotations ; tassement de D10 avec douleurs dorsales chroniques et cyphose de 12 degrés ; fracture du col anatomique de l'humérus droit dominant avec raideur sévère de l'épaule abduction limitée à 60 degrés ; fracture de la tête humérale gauche avec raideur de l'épaule abduction limitée à 80 degrés et rotation externe impossible",
    expectedSystems: ['rachis', 'rachis', 'épaule', 'épaule'],
    expectedMinRate: 5,
    expectedMaxRate: 70,
    description: "Rachis cervical + D10 + épaule bilatérale"
  },
  {
    // Cas 21 : Rachis lombaire + bassin + fémur + pilon tibial
    input: "hernie discale L5-S1 post-traumatique opérée avec lombalgies résiduelles et raideur lombaire modérée ; disjonction sacro-iliaque droite consolidée avec douleurs pelviennes chroniques ; fracture diaphysaire du fémur droit consolidée par enclouage avec raccourcissement de 2 cm et raideur du genou ; fracture du pilon tibial gauche avec arthrose tibio-tarsienne sévère et raideur de la cheville et douleurs permanentes à la marche avec canne",
    expectedSystems: ['rachis', 'bassin', 'fémur', 'cheville'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "Hernie L5-S1 + sacro-iliaque D + fémur D + pilon tibial G"
  },
  {
    // Cas 22 : Rachis cervical + lombaire + épaule + genou + pied
    input: "cervicalgies chroniques post-entorse grave C4-C5 avec limitation des rotations et névralgies cervico-brachiales intermittentes ; fracture de L3 tassée avec raideur du rachis lombaire et lombalgies ; fracture du trochiter de l'épaule droite dominante avec raideur et limitation de l'abduction à 100 degrés ; fracture du plateau tibial externe du genou gauche avec raideur et flexion à 90 degrés ; fracture du calcanéum droit avec douleurs chroniques de l'arrière-pied et boiterie",
    expectedSystems: ['rachis', 'rachis', 'épaule', 'genou', 'pied'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "Rachis C+L + épaule D + plateau tibial G + calcanéum D"
  },
  {
    // Cas 23 : Rachis dorso-lombaire + fracture cotyle + fracture radius
    input: "fracture-tassement de D11 et D12 avec cyphose dorsale de 20 degrés et douleurs dorsales chroniques invalidantes ; hernie discale L4-L5 avec sciatalgie droite déficitaire et raideur majeure du rachis lombaire ; fracture du cotyle de la hanche gauche avec arthrose coxo-fémorale post-traumatique et limitation sévère des amplitudes et boiterie ; fracture de l'extrémité inférieure du radius gauche avec raideur du poignet et arthrose radio-carpienne débutante",
    expectedSystems: ['rachis', 'rachis', 'hanche', 'poignet'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "Rachis D11-D12 + hernie L4-L5 + cotyle G + radius G"
  },
  {
    // Cas 24 : Rachis cervical + fracture bassin complexe + genou + main
    input: "raideur sévère du rachis cervical après fracture du corps vertébral de C6 avec canal cervical étroit et myélopathie cervicale débutante et cervicalgies ; fracture complexe du bassin avec disjonction de la symphyse pubienne et fracture de l'aile iliaque droite consolidées avec douleurs pelviennes permanentes ; fracture du plateau tibial interne du genou droit avec déviation en varus et raideur du genou ; amputation traumatique de l'auriculaire et de l'annulaire de la main droite dominante avec gêne à la préhension",
    expectedSystems: ['rachis', 'bassin', 'genou', 'main'],
    expectedMinRate: 25,
    expectedMaxRate: 75,
    description: "Fracture C6 + bassin complexe + plateau tibial D + amputation 4è-5è doigts MD"
  },

  // ============================================================
  // SECTION D : SENSORIEL + NEUROLOGIQUE + ORTHOPÉDIQUE (cas 25-32)
  // ============================================================
  {
    // Cas 25 : BAV unilatérale + surdité + fracture fémur + épaule
    input: "baisse de l'acuité visuelle de l'oeil droit à 1/10 après contusion du globe oculaire avec iridodialyse et cataracte traumatique ; surdité de perception unilatérale gauche à 35 dB avec acouphènes permanents ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 2 cm et raideur du genou et amyotrophie du quadriceps ; fracture du col chirurgical de l'humérus droit dominant avec raideur de l'épaule et abduction limitée à 70 degrés",
    expectedSystems: ['vision', 'audition', 'fémur', 'épaule'],
    expectedMinRate: 30,
    expectedMaxRate: 75,
    description: "BAV OD 1/10 + surdité G + fémur G + épaule D"
  },
  {
    // Cas 26 : BAV bilatérale + fracture bassin + fracture tibia
    input: "baisse de l'acuité visuelle OD à 3/10 et OG à 5/10 après contusion bilatérale des globes oculaires avec hyphéma résorbé de l'oeil droit ; fracture de la branche ischio-pubienne droite et de l'aile iliaque gauche consolidées avec douleurs pelviennes permanentes ; fracture diaphysaire du tibia gauche consolidée avec cal vicieux angulaire et raccourcissement de 1 cm et raideur de la cheville",
    expectedSystems: ['vision', 'bassin', 'tibia'],
    expectedMinRate: 20,
    expectedMaxRate: 65,
    description: "BAV bilatérale + bassin bilatéral + tibia G"
  },
  {
    // Cas 27 : Anosmie + BAV + rachis cervical + fracture hanche
    input: "anosmie totale post-traumatique par lésion de la lame criblée de l'ethmoïde ; baisse de l'acuité visuelle de l'oeil gauche à 2/10 après contusion oculaire avec subluxation du cristallin ; raideur du rachis cervical post-traumatique sévère avec limitation des rotations à 30 pour cent et cervicalgies chroniques ; fracture du col du fémur gauche traitée par prothèse totale de hanche avec boiterie résiduelle et douleurs mécaniques et limitation de la flexion",
    expectedSystems: ['odorat', 'vision', 'rachis', 'hanche'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "Anosmie + BAV OG 2/10 + rachis cervical + PTH G"
  },
  {
    // Cas 28 : Diplopie + surdité + fracture plateau tibial + fracture coude
    input: "diplopie dans le regard vers le haut et le bas après fracture du plancher et du toit de l'orbite droite avec limitation de l'élévation du globe ; surdité de transmission unilatérale droite à 40 dB par luxation de la chaîne ossiculaire ; fracture du plateau tibial interne du genou gauche ostéosynthésée avec raideur et gonarthrose et flexion limitée à 85 degrés ; fracture comminutive de l'olécrâne du coude droit dominant avec raideur en flexion limitée à 90 degrés et impossibilité d'extension complète",
    expectedSystems: ['vision', 'audition', 'genou', 'coude'],
    expectedMinRate: 25,
    expectedMaxRate: 65,
    description: "Diplopie + surdité D + plateau tibial G + olécrâne D"
  },
  {
    // Cas 29 : Paralysie faciale + paralysie SPE + fracture radius
    input: "paralysie faciale périphérique gauche séquellaire avec asymétrie faciale permanente et syncinésies oculo-buccales et larmoiement ; paralysie du nerf sciatique poplité externe droit après fracture du col du péroné avec steppage à la marche et impossibilité de relever le pied nécessitant le port permanent d'un releveur ; fracture de l'extrémité inférieure du radius gauche non dominant avec raideur du poignet et limitation de la pronosupination à 50 pour cent",
    expectedSystems: ['crâne', 'jambe', 'poignet'],
    expectedMinRate: 20,
    expectedMaxRate: 55,
    description: "Paralysie faciale G + paralysie SPE D + radius G"
  },
  {
    // Cas 30 : BAV sévère + fracture rachis dorsal + fracture fémur + fracture main
    input: "baisse de l'acuité visuelle de l'oeil gauche à 1/20 après éclatement du globe oculaire réparé avec séquelles cicatricielles cornéennes majeures et oeil droit à 10/10 ; tassement vertébral de D9 avec cyphose dorsale de 12 degrés et douleurs dorsales chroniques ; fracture diaphysaire du fémur droit consolidée avec raccourcissement de 3 cm et raideur sévère du genou flexion limitée à 80 degrés ; fracture des 2ème et 3ème métacarpiens de la main droite dominante consolidée avec raideur des doigts et gêne à la préhension",
    expectedSystems: ['vision', 'rachis', 'fémur', 'main'],
    expectedMinRate: 30,
    expectedMaxRate: 75,
    description: "BAV OG 1/20 + D9 + fémur D + métacarpiens main D"
  },
  {
    // Cas 31 : Surdité bilatérale + acouphènes + fracture épaule + genou + cheville
    input: "surdité de perception bilatérale moyenne à 45 dB aux fréquences conversationnelles avec acouphènes permanents invalidants ; fracture de la tête humérale gauche avec raideur de l'épaule et abduction limitée à 70 degrés et rotation impossible ; fracture supra-condylienne du fémur droit avec raideur du genou et flexion limitée à 90 degrés ; fracture bimalléolaire de la cheville gauche avec raideur résiduelle et instabilité et boiterie",
    expectedSystems: ['audition', 'épaule', 'genou', 'cheville'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "Surdité bilat 45 dB + acouphènes + épaule G + genou D + cheville G"
  },
  {
    // Cas 32 : Énucléation oeil + fracture bassin + fracture tibia
    input: "énucléation de l'oeil droit après éclatement traumatique du globe oculaire avec prothèse oculaire et oeil gauche à 10/10 ; fracture du cadre obturateur du bassin gauche consolidée avec douleurs pelviennes chroniques à la station assise prolongée ; fracture des deux os de la jambe droite consolidée avec cal vicieux angulaire de 10 degrés et raccourcissement de 2 cm et raideur de la cheville et boiterie avec canne",
    expectedSystems: ['vision', 'bassin', 'jambe'],
    expectedMinRate: 30,
    expectedMaxRate: 70,
    description: "Énucléation OD + bassin G + 2 os jambe D"
  },

  // ============================================================
  // SECTION E : PSYCHIATRIQUE + MULTI-APPAREIL (cas 33-40)
  // ============================================================
  {
    // Cas 33 : TSPT sévère + thorax + fémur + rachis
    input: "état de stress post-traumatique sévère avec cauchemars récurrents et reviviscences diurnes et hypervigilance permanente et conduites d'évitement majeur et traitement psychotrope au long cours ; fractures des 6ème et 7ème côtes droites consolidées avec douleurs thoraciques résiduelles ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 2 cm et raideur du genou et boiterie ; tassement vertébral de L1 avec raideur du rachis lombaire et lombalgies chroniques",
    expectedSystems: ['psychiatrique', 'thorax', 'fémur', 'rachis'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "TSPT sévère + côtes D + fémur G + tassement L1"
  },
  {
    // Cas 34 : Dépression majeure + splénectomie + hanche + épaule
    input: "syndrome dépressif majeur réactionnel post-traumatique avec idéation suicidaire passée et anhedonie permanente et repli sur soi et traitement antidépresseur au long cours ; splénectomie totale pour rupture traumatique de la rate grade IV avec vaccination anti-pneumococcique ; fracture du col du fémur droit traitée par prothèse totale de hanche avec boiterie et canne ; fracture de la tête humérale gauche avec raideur sévère de l'épaule abduction limitée à 50 degrés et impossibilité de porter un objet lourd",
    expectedSystems: ['psychiatrique', 'abdomen', 'hanche', 'épaule'],
    expectedMinRate: 30,
    expectedMaxRate: 75,
    description: "Dépression majeure + splénectomie + PTH D + épaule G sévère"
  },
  {
    // Cas 35 : Anxiété généralisée + fracture bassin + genou + cheville
    input: "trouble anxieux généralisé post-traumatique avec attaques de panique plurihebdomadaires et agoraphobie et claustrophobie et traitement anxiolytique quotidien ; fracture de l'aile iliaque droite consolidée avec douleurs pelviennes chroniques et gêne à la station assise ; fracture du plateau tibial externe du genou droit avec raideur et flexion limitée à 100 degrés et douleurs à la descente des escaliers ; fracture bimalléolaire de la cheville gauche avec raideur résiduelle et arthrose tibio-tarsienne et douleurs à la marche",
    expectedSystems: ['psychiatrique', 'bassin', 'genou', 'cheville'],
    expectedMinRate: 20,
    expectedMaxRate: 65,
    description: "Anxiété généralisée + bassin D + plateau tibial D + bimalléolaire G"
  },
  {
    // Cas 36 : TSPT + BAV + fracture rachis + fémur
    input: "état de stress post-traumatique avec reviviscences et troubles du sommeil majeurs et conduites d'évitement des transports et suivi psychiatrique régulier ; baisse de l'acuité visuelle de l'oeil droit à 3/10 après contusion du globe oculaire avec oeil gauche à 10/10 ; fracture de L2 avec tassement cunéiforme et raideur du rachis lombaire et lombalgies chroniques distance doigt-sol à 40 cm ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 2 cm et raideur du genou et boiterie",
    expectedSystems: ['psychiatrique', 'vision', 'rachis', 'fémur'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "TSPT + BAV OD 3/10 + fracture L2 + fémur G"
  },
  {
    // Cas 37 : Trouble adaptation + fracture humérus bilat + fracture tibia
    input: "trouble de l'adaptation avec humeur anxio-dépressive chronique et irritabilité et troubles du sommeil invalidants et retentissement professionnel majeur ; fracture diaphysaire de l'humérus droit dominant consolidée avec raideur de l'épaule et limitation de l'abduction à 90 degrés ; fracture du col chirurgical de l'humérus gauche consolidée avec raideur et abduction limitée à 80 degrés ; fracture du tibia gauche au tiers moyen consolidée avec cal vicieux et raideur de la cheville et douleurs à la marche",
    expectedSystems: ['psychiatrique', 'épaule', 'épaule', 'tibia'],
    expectedMinRate: 25,
    expectedMaxRate: 65,
    description: "Trouble adaptation + humérus bilatéral + tibia G"
  },
  {
    // Cas 38 : TSPT + néphrectomie + rachis cervical + fracture cheville
    input: "état de stress post-traumatique avec cauchemars et flash-backs et hypervigilance et conduites d'évitement et anxiété anticipatoire ; néphrectomie gauche pour rupture rénale traumatique avec fonction du rein restant normale ; raideur du rachis cervical post-entorse grave avec cervicalgies chroniques invalidantes et limitation des rotations ; fracture trimalléolaire de la cheville droite ostéosynthésée avec raideur sévère et arthrose et douleurs permanentes à la marche",
    expectedSystems: ['psychiatrique', 'abdomen', 'rachis', 'cheville'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "TSPT + néphrectomie G + rachis cervical + trimalléolaire D"
  },
  {
    // Cas 39 : Phobie + surdité + fracture cotyle + épaule
    input: "phobie spécifique de la conduite automobile et des transports post-traumatique avec conduites d'évitement majeur et retentissement socio-professionnel important ; surdité de perception unilatérale gauche à 50 dB avec acouphènes intermittents ; fracture du cotyle de la hanche droite avec arthrose coxo-fémorale post-traumatique et limitation de la flexion à 70 degrés et de la rotation interne et boiterie ; fracture du trochiter de l'épaule droite dominante arrachée avec raideur et limitation de l'abduction à 120 degrés",
    expectedSystems: ['psychiatrique', 'audition', 'hanche', 'épaule'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "Phobie + surdité G + cotyle D + épaule D"
  },
  {
    // Cas 40 : Dépression + TC + fracture calcanéum bilat
    input: "syndrome dépressif réactionnel modéré avec asthénie permanente et troubles de la concentration et repli social et traitement antidépresseur ; traumatisme crânien léger avec céphalées chroniques et vertiges positionnels résiduels ; fracture du calcanéum droit avec effondrement de l'angle de Böhler et douleurs permanentes à l'appui et arthrose sous-talienne ; fracture du calcanéum gauche avec douleurs chroniques de l'arrière-pied et raideur de la sous-talienne et impossibilité de courir et marche avec deux cannes",
    expectedSystems: ['psychiatrique', 'crâne', 'pied', 'pied'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "Dépression + TC + calcanéum bilatéral (invalidant)"
  },

  // ============================================================
  // SECTION F : POLYTRAUMATISMES MASSIFS ≥5 SIÈGES (cas 41-50)
  // ============================================================
  {
    // Cas 41 : TC + thorax + splénectomie + fémur + épaule — 5 sièges
    input: "traumatisme crânien avec perte de connaissance de 20 minutes et céphalées chroniques et troubles mnésiques légers ; fractures des 4ème 5ème et 6ème côtes gauches consolidées avec douleurs thoraciques résiduelles à l'effort ; splénectomie totale pour rupture traumatique de la rate ; fracture diaphysaire du fémur droit consolidée par enclouage avec raccourcissement de 2 cm et raideur du genou et boiterie ; fracture du col chirurgical de l'humérus gauche consolidée avec raideur de l'épaule et limitation de l'abduction à 90 degrés",
    expectedSystems: ['crâne', 'thorax', 'abdomen', 'fémur', 'épaule'],
    expectedMinRate: 30,
    expectedMaxRate: 75,
    description: "5 sièges: TC + côtes G + splénectomie + fémur D + épaule G"
  },
  {
    // Cas 42 : TC + vision + rachis + bassin + genou — 5 sièges
    input: "traumatisme crânien grave avec déficit cognitif séquellaire modéré comprenant troubles de la mémoire et syndrome dysexécutif ; baisse de l'acuité visuelle de l'oeil gauche à 2/10 après contusion oculaire avec oeil droit à 9/10 ; hernie discale L4-L5 post-traumatique avec sciatalgie droite résiduelle et raideur du rachis lombaire ; fracture de la branche ischio-pubienne droite consolidée avec douleurs pelviennes ; fracture du plateau tibial externe du genou gauche avec raideur et flexion limitée à 90 degrés et gonarthrose",
    expectedSystems: ['crâne', 'vision', 'rachis', 'bassin', 'genou'],
    expectedMinRate: 30,
    expectedMaxRate: 80,
    description: "5 sièges: TC grave + BAV OG + hernie L4-L5 + bassin D + plateau tibial G"
  },
  {
    // Cas 43 : TSPT + thorax + rachis + hanche + cheville — 5 sièges
    input: "état de stress post-traumatique sévère avec cauchemars récurrents et hypervigilance et conduites d'évitement ; volet costal antéro-latéral gauche opéré avec séquelles de contusion pulmonaire et dyspnée d'effort modérée ; tassement vertébral de D12 avec cyphose de 15 degrés et douleurs dorsales chroniques ; fracture du col du fémur gauche traitée par prothèse totale de hanche avec boiterie résiduelle ; fracture bimalléolaire de la cheville droite avec raideur résiduelle et instabilité et douleurs à la marche",
    expectedSystems: ['psychiatrique', 'thorax', 'rachis', 'hanche', 'cheville'],
    expectedMinRate: 30,
    expectedMaxRate: 80,
    description: "5 sièges: TSPT + volet costal G + D12 + PTH G + bimalléolaire D"
  },
  {
    // Cas 44 : TC + thorax + abdomen + rachis + fémur + épaule — 6 sièges accident grave
    input: "traumatisme crânien avec perte de connaissance prolongée de 6 heures et syndrome subjectif commun invalidant comprenant céphalées quotidiennes et troubles de la concentration et vertiges ; fracas thoracique avec fractures des 4ème à 8ème côtes gauches et contusion pulmonaire séquellaire avec syndrome restrictif et dyspnée ; néphrectomie gauche pour contusion rénale grade IV ; tassement de D12 et L1 avec cyphose dorso-lombaire et raideur sévère du rachis ; fracture diaphysaire du fémur droit avec raccourcissement de 3 cm et raideur du genou flexion limitée à 80 degrés ; fracture comminutive de la tête humérale gauche avec prothèse d'épaule et raideur sévère",
    expectedSystems: ['crâne', 'thorax', 'abdomen', 'rachis', 'fémur', 'épaule'],
    expectedMinRate: 40,
    expectedMaxRate: 90,
    description: "6 sièges: TC + fracas thorax + néphrectomie + D12-L1 + fémur D + prothèse épaule G"
  },
  {
    // Cas 45 : TC + vision + audition + rachis + fémur — 5 sièges neuro-sensoriel
    input: "traumatisme crânien modéré avec troubles cognitifs résiduels légers et céphalées chroniques ; baisse de l'acuité visuelle OD à 4/10 après contusion oculaire avec hyphéma résorbé ; surdité de perception unilatérale gauche à 40 dB avec acouphènes permanents après fracture du rocher ; raideur du rachis cervical post-traumatique avec cervicalgies invalidantes et limitation des rotations ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 2 cm et raideur du genou et boiterie résiduelle",
    expectedSystems: ['crâne', 'vision', 'audition', 'rachis', 'fémur'],
    expectedMinRate: 15,
    expectedMaxRate: 80,
    description: "5 sièges: TC + BAV OD + surdité G + rachis cervical + fémur G"
  },
  {
    // Cas 46 : TSPT + TC + thorax + fémur + cheville — 5 sièges
    input: "état de stress post-traumatique avec reviviscences et cauchemars fréquents et conduites d'évitement des déplacements en voiture ; traumatisme crânien avec syndrome post-commotionnel persistant comprenant céphalées et vertiges et troubles de la concentration ; fractures des 5ème et 6ème côtes droites consolidées avec douleurs thoraciques résiduelles ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 2 cm et raideur du genou ; fracture trimalléolaire de la cheville droite avec raideur sévère et arthrose tibio-tarsienne et boiterie permanente",
    expectedSystems: ['psychiatrique', 'crâne', 'thorax', 'fémur', 'cheville'],
    expectedMinRate: 30,
    expectedMaxRate: 80,
    description: "5 sièges: TSPT + TC + côtes D + fémur G + trimalléolaire D"
  },
  {
    // Cas 47 : TC grave + thorax + abdomen + rachis + hanche + genou + épaule — 7 sièges
    input: "traumatisme crânien grave avec hémiparésie droite légère séquellaire et troubles cognitifs à type de ralentissement et troubles de la mémoire ; fractures costales multiples gauches de la 3ème à la 7ème côte avec pachypleurite et syndrome restrictif modéré ; splénectomie totale pour rupture de la rate ; hernie discale L5-S1 post-traumatique avec sciatalgie bilatérale et raideur du rachis lombaire ; fracture du col du fémur gauche traitée par prothèse totale de hanche avec boiterie ; fracture du plateau tibial externe du genou droit avec raideur et flexion limitée à 90 degrés ; fracture de la tête humérale droite dominante avec raideur de l'épaule et abduction à 70 degrés",
    expectedSystems: ['crâne', 'thorax', 'abdomen', 'rachis', 'hanche', 'genou', 'épaule'],
    expectedMinRate: 50,
    expectedMaxRate: 95,
    description: "7 sièges: TC grave hémiparésie + côtes G + splénectomie + hernie L5-S1 + PTH G + plateau tibial D + épaule D"
  },
  {
    // Cas 48 : TC + anosmie + abdomen + fémur + épaule + rachis — 6 sièges
    input: "traumatisme crânien avec céphalées chroniques quotidiennes et troubles de la concentration et fatigue permanente ; anosmie totale post-traumatique par lésion de la lame criblée avec perte de l'odorat et du goût ; néphrectomie droite pour éclatement rénal traumatique grade V ; fracture diaphysaire du fémur gauche avec cal vicieux en rotation externe et raccourcissement de 3 cm et boiterie permanente ; fracture comminutive de la tête humérale droite dominante avec prothèse d'épaule et raideur sévère ; tassement vertébral de L1 avec raideur du rachis lombaire et lombalgies chroniques",
    expectedSystems: ['crâne', 'odorat', 'abdomen', 'fémur', 'épaule', 'rachis'],
    expectedMinRate: 40,
    expectedMaxRate: 85,
    description: "6 sièges: TC + anosmie + néphrectomie + fémur G + prothèse épaule D + L1"
  },
  {
    // Cas 49 : TSPT + vision + thorax + rachis + bassin + genou — 6 sièges
    input: "état de stress post-traumatique sévère avec cauchemars récurrents et conduites d'évitement majeur et traitement psychotrope lourd ; baisse de l'acuité visuelle OD à 3/10 et OG à 7/10 après contusion faciale avec fracture plancher orbite ; fractures des 7ème 8ème et 9ème côtes droites consolidées avec douleurs thoraciques chroniques ; fracture de L3 avec tassement cunéiforme et raideur du rachis lombaire et lombalgies ; disjonction sacro-iliaque gauche avec douleurs pelviennes chroniques ; fracture du plateau tibial externe du genou droit avec gonarthrose et raideur et flexion à 90 degrés",
    expectedSystems: ['psychiatrique', 'vision', 'thorax', 'rachis', 'bassin', 'genou'],
    expectedMinRate: 35,
    expectedMaxRate: 85,
    description: "6 sièges: TSPT + BAV bilat + côtes D + L3 + sacro-iliaque G + plateau tibial D"
  },
  {
    // Cas 50 : TC + thorax + abdomen + rachis + fémur + tibia + épaule + psy — 8 sièges (AVP gravissime)
    input: "traumatisme crânien grave avec perte de connaissance prolongée et déficit cognitif séquellaire comprenant syndrome dysexécutif et troubles de la mémoire et céphalées invalidantes ; fracas thoracique avec volet costal gauche et contusion pulmonaire bilatérale et syndrome restrictif sévère ; splénectomie totale pour éclatement de la rate et résection de 40 cm d'intestin grêle pour contusion mésentérique et troubles du transit ; fracture-tassement de D11 et D12 avec cyphose dorsale de 25 degrés et raideur majeure du rachis ; fracture diaphysaire du fémur droit avec raccourcissement de 4 cm et raideur sévère du genou ; fracture des deux os de la jambe gauche avec cal vicieux et raideur de la cheville et boiterie permanente avec deux cannes ; fracture comminutive de la tête humérale gauche avec prothèse d'épaule et raideur sévère ; état de stress post-traumatique majeur avec cauchemars quotidiens et hypervigilance et dépression comorbide",
    expectedSystems: ['crâne', 'thorax', 'abdomen', 'rachis', 'fémur', 'jambe', 'épaule', 'psychiatrique'],
    expectedMinRate: 55,
    expectedMaxRate: 98,
    description: "8 sièges AVP gravissime: TC grave + fracas thorax + splénectomie+résection grêle + D11-D12 + fémur D + 2 os jambe G + prothèse épaule G + TSPT+dépression"
  },
];

// ====== RUNNER ======
async function runTests() {
  let passed = 0;
  let failed = 0;

  console.log('╔═══════════════════════════════════════════════════════════════════╗');
  console.log('║  TEST 50 CAS POLYTRAUMATISMES COMPLEXES (V3.3.319)              ║');
  console.log('╚═══════════════════════════════════════════════════════════════════╝');
  console.log('');

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
          || (s === 'crâne' && /cran|crân|neurolog|commotion|contusion.*c[eé]r[eé]bral|c[eé]phal|hématome.*extra|h[eé]mipar[eé]sie/i.test(allText))
          || (s === 'thorax' && /thorac|c[oô]te|costal|pulmon|sternum|volet|fracas|pneumo|h[eé]mothorax|pleur|diaphragm/i.test(allText))
          || (s === 'abdomen' && /spl[eé]n|r[eé]nal|rate|foie|h[eé]pat|gastr|n[eé]phrect|chol[eé]cyst|intestin|m[eé]sent/i.test(allText))
          || (s === 'vision' && /visuel|acuit[eé]|oculaire|oeil|\boeil\b|dipl|BAV|iridodial|[eé]nucl[eé]ation|globe/i.test(allText))
          || (s === 'audition' && /audit|surdit|acouph|hypoacous|ossicul|rocher/i.test(allText))
          || (s === 'odorat' && /anosmie|odorat|olfact|lame.*cribl/i.test(allText))
          || (s === 'psychiatrique' && /d[eé]press|psychiatr|psycho|tspt|stress.*post|phobi|anxi[eé]t|adaptation/i.test(allText))
          || (s.includes('rachis') && /rachis|vert[eé]br|lombaire|cervical|dorsal|hernie.*disc|tassement|cyphose/i.test(allText))
          || (s === 'bassin' && /bassin|pelvien|obtur|cotyle|symphyse|sacrum|coccyx|iliaque|ischio|sacro/i.test(allText))
          || (s === 'épaule' && /[eé]paule|hum[eé]r|clavicule|scapul|abduction|trochiter/i.test(allText))
          || (s === 'genou' && /genou|plateau.*tibial|rotule|lca|lig.*crois|supra.*condyl/i.test(allText))
          || (s === 'cheville' && /cheville|mall[eé]ol|pilon.*tibial|tarse|tibio.*tars/i.test(allText))
          || (s === 'hanche' && /hanche|col.*f[eé]mor|trochant|coxo|pth|cotyle|proth[eè]se.*totale.*hanche/i.test(allText))
          || (s === 'fémur' && /f[eé]mur|diaphys.*f[eé]m/i.test(allText))
          || (s === 'tibia' && /tibia|jambe|diaphys.*tib/i.test(allText))
          || (s === 'poignet' && /poignet|radius|scapho[ïi]de|pronosupination/i.test(allText))
          || (s === 'coude' && /coude|ol[eé]cran|t[eê]te.*radial|pronosupination/i.test(allText))
          || (s === 'main' && /main|pouce|index|doigt|m[eé]dius|m[eé]tacarp|phalang|auriculaire|annulaire/i.test(allText))
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

  console.log('═══════════════════════════════════════════════════════════════════');
  console.log(`  RÉSULTAT GLOBAL : ${passed}/${testCases.length} réussis | ${failed}/${testCases.length} échoués`);
  console.log('═══════════════════════════════════════════════════════════════════');
}

runTests();
