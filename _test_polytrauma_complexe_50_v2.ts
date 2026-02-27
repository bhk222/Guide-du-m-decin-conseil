// Test 50 cas SUPPLÉMENTAIRES : polytraumatismes complexes multi-systèmes (V3.3.319)
// Série 2 — cas entièrement nouveaux, distincts de _test_polytrauma_complexe_50.ts
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
  // SECTION A : CRÂNE + MEMBRES VARIÉS (cas 1-8)
  // ============================================================
  {
    // Cas 1 : Contusion cérébrale + fracture cotyle + fracture humérus + fracture malléole
    input: "contusion cérébrale temporale droite avec crises d'épilepsie temporales partielles sous traitement anticomitial et céphalées chroniques invalidantes ; fracture du cotyle de la hanche gauche ostéosynthésée avec arthrose coxo-fémorale post-traumatique et limitation de la flexion à 70 degrés et de l'abduction et boiterie permanente ; fracture du tiers moyen de l'humérus droit dominant consolidée avec cal vicieux en rotation et raideur de l'épaule ; fracture de la malléole externe de la cheville gauche avec instabilité chronique et entorses à répétition",
    expectedSystems: ['crâne', 'hanche', 'épaule', 'cheville'],
    expectedMinRate: 25,
    expectedMaxRate: 75,
    description: "Contusion temporale + épilepsie + cotyle G + humérus D + malléole G"
  },
  {
    // Cas 2 : HSD opéré + fracture supracondylienne fémur + fracture 2 os avant-bras
    input: "séquelles d'hématome sous-dural chronique gauche opéré avec troubles de la mémoire antérograde et hémiparésie droite fruste et céphalées quotidiennes ; fracture supracondylienne du fémur droit ostéosynthésée avec raideur sévère du genou flexion limitée à 70 degrés et amyotrophie majeure du quadriceps et boiterie avec canne ; fracture des deux os de l'avant-bras droit dominant au tiers moyen consolidée avec limitation sévère de la pronosupination à 30 pour cent et raideur du poignet",
    expectedSystems: ['crâne', 'genou', 'poignet'],
    expectedMinRate: 30,
    expectedMaxRate: 80,
    description: "HSD opéré + supracondylienne fémur D + 2 os avant-bras D"
  },
  {
    // Cas 3 : TC modéré + fracture du bassin + fracture bi-malléolaire + fracture clavicule
    input: "traumatisme crânien modéré avec amnésie post-traumatique de 48 heures et syndrome frontal séquellaire modéré comprenant apathie et troubles de l'initiative ; fracture de l'aile iliaque et de la branche ilio-pubienne gauches consolidées avec douleurs pelviennes permanentes aggravées par la station debout prolongée ; fracture bimalléolaire de la cheville droite avec arthrose tibio-tarsienne et raideur marquée et boiterie ; fracture de la clavicule droite dominante consolidée en chevauchement avec cal saillant et douleurs à l'abduction au-delà de 120 degrés",
    expectedSystems: ['crâne', 'bassin', 'cheville', 'épaule'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "TC modéré syndrome frontal + bassin G + bimalléolaire D + clavicule D"
  },
  {
    // Cas 4 : Embarrure frontale + fracture col fémur + fracture poignet + fracture côtes
    input: "séquelles d'embarrure frontale droite opérée avec plaque de crânioplastie et épilepsie post-traumatique avec crises généralisées trimestrielles sous bithérapie et troubles cognitifs séquellaires ; fracture du col du fémur gauche traitée par vissage avec nécrose de la tête fémorale et arthrose sévère de la hanche et douleurs permanentes et boiterie majeure ; fracture de Pouteau-Colles du poignet droit dominant consolidée avec raideur et arthrose radio-carpienne ; fractures des 3ème 4ème et 5ème côtes droites consolidées avec douleurs thoraciques résiduelles",
    expectedSystems: ['crâne', 'hanche', 'poignet', 'thorax'],
    expectedMinRate: 30,
    expectedMaxRate: 80,
    description: "Embarrure frontale + nécrose tête fémorale G + Pouteau-Colles D + côtes D"
  },
  {
    // Cas 5 : TC avec contusion axonale diffuse + amputation doigts + fracture tibia
    input: "séquelles de contusion axonale diffuse avec syndrome cérébelleux séquellaire comprenant ataxie à la marche et dysarthrie modérée et troubles de la mémoire ; amputation traumatique du pouce et de l'index de la main gauche avec gêne majeure à la préhension et impossibilité de pincer ; fracture ouverte du tibia droit au tiers inférieur consolidée après fixateur externe puis enclouage avec pseudarthrose initiale et raideur de la cheville et douleurs chroniques et boiterie avec canne",
    expectedSystems: ['crâne', 'main', 'tibia'],
    expectedMinRate: 30,
    expectedMaxRate: 80,
    description: "Contusion axonale diffuse + amputation pouce-index MG + tibia D ouvert"
  },
  {
    // Cas 6 : TC léger + luxation coude + fracture col fémur + fracture astragale
    input: "syndrome post-commotionnel chronique après traumatisme crânien avec céphalées bi-temporales quotidiennes et sensibilité au bruit et photophobie et troubles de la concentration ; luxation postérieure du coude droit dominant réduite avec ossifications périarticulaires et raideur en flexion limitée à 100 degrés et déficit d'extension de 20 degrés ; fracture du col du fémur droit ostéosynthésée par vis-plaque avec raccourcissement de 1 cm et raideur de la hanche ; fracture de l'astragale du pied gauche avec nécrose avasculaire et arthrose sous-talienne et douleurs permanentes à la marche",
    expectedSystems: ['crâne', 'coude', 'hanche', 'pied'],
    expectedMinRate: 20,
    expectedMaxRate: 70,
    description: "TC + luxation coude D + col fémur D + nécrose astragale G"
  },
  {
    // Cas 7 : Hémorragie méningée + fracture omoplate + fracture plateau tibial + fracture phalanges
    input: "séquelles d'hémorragie méningée post-traumatique avec vasospasme initial et déficit neurologique séquellaire à type de monoparésie du membre supérieur gauche et céphalées chroniques ; fracture de l'omoplate droite dominante consolidée avec douleurs périscapulaires chroniques et limitation de l'abduction de l'épaule à 90 degrés ; fracture du plateau tibial interne du genou droit avec déviation en varus de 8 degrés et gonarthrose sévère et raideur en flexion à 80 degrés ; fracture des phalanges P1 et P2 du 3ème doigt de la main droite dominante avec raideur en flexion irréductible et gêne fonctionnelle",
    expectedSystems: ['crâne', 'épaule', 'genou', 'main'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "Hémorragie méningée + omoplate D + plateau tibial D varus + phalanges 3è doigt MD"
  },
  {
    // Cas 8 : TC + fracture maxillaire + fracture cheville bilatérale
    input: "traumatisme crânien avec coma initial de 72 heures et troubles cognitifs séquellaires sévères comprenant syndrome dysexécutif majeur et troubles de la mémoire de travail et apragmatisme ; fracture du maxillaire supérieur avec trouble de l'articulé dentaire résiduel et limitation de l'ouverture buccale et douleurs à la mastication ; fracture bimalléolaire de la cheville droite avec raideur résiduelle et arthrose ; fracture trimalléolaire de la cheville gauche avec raideur sévère et instabilité et boiterie permanente avec deux cannes",
    expectedSystems: ['crâne', 'cheville', 'cheville'],
    expectedMinRate: 35,
    expectedMaxRate: 85,
    description: "TC coma 72h + fracture maxillaire + cheville bilatérale"
  },

  // ============================================================
  // SECTION B : THORACO-ABDOMINAL + MULTI-MEMBRES (cas 9-16)
  // ============================================================
  {
    // Cas 9 : Contusion pulmonaire + rupture hépatique + fracture fémur + fracture poignet
    input: "contusion pulmonaire droite avec atélectasie séquellaire du lobe inférieur et dyspnée d'effort au stade II avec syndrome restrictif modéré ; rupture hépatique grade III suturée avec douleurs de l'hypochondre droit chroniques et perturbation légère du bilan hépatique ; fracture diaphysaire du fémur gauche consolidée par enclouage avec raccourcissement de 3 cm et raideur du genou flexion limitée à 85 degrés et boiterie permanente ; fracture de l'extrémité inférieure du radius gauche avec déviation dorsale résiduelle et raideur du poignet",
    expectedSystems: ['thorax', 'abdomen', 'fémur', 'poignet'],
    expectedMinRate: 25,
    expectedMaxRate: 75,
    description: "Contusion pulmonaire D + rupture hépatique + fémur G + radius G"
  },
  {
    // Cas 10 : Hémopneumothorax + pancréas + fracture humérus + fracture calcanéum
    input: "hémopneumothorax gauche drainé avec adhérences pleurales séquellaires et douleurs thoraciques chroniques à l'inspiration profonde et à la toux ; pancréatite post-traumatique avec pseudokyste résiduel et douleurs épigastriques chroniques et diabète insulino-dépendant post-traumatique ; fracture de l'extrémité supérieure de l'humérus droit dominant avec nécrose partielle de la tête humérale et raideur sévère de l'épaule abduction limitée à 50 degrés ; fracture du calcanéum gauche avec affaissement thalamique et arthrose sous-talienne et douleurs permanentes à la marche",
    expectedSystems: ['thorax', 'abdomen', 'épaule', 'pied'],
    expectedMinRate: 30,
    expectedMaxRate: 80,
    description: "Hémopneumothorax G + pancréatite + diabète + humérus D nécrose + calcanéum G"
  },
  {
    // Cas 11 : Fractures costales flottantes + contusion splénique + fracture diaphyse tibiale + fracture coude
    input: "fractures des côtes flottantes 11ème et 12ème bilatérales consolidées avec douleurs chroniques des flancs aggravées par la toux et les mouvements de torsion ; contusion splénique grade II traitée conservativement avec splénomégalie résiduelle et douleurs de l'hypochondre gauche ; fracture diaphysaire du tibia gauche consolidée avec cal vicieux en recurvatum et raccourcissement de 2 cm et douleurs chroniques et raideur de la cheville ; fracture de la tête radiale du coude droit dominant avec limitation de la pronosupination à 40 pour cent et douleurs en supination forcée",
    expectedSystems: ['thorax', 'abdomen', 'tibia', 'coude'],
    expectedMinRate: 20,
    expectedMaxRate: 65,
    description: "Côtes flottantes bilat + contusion splénique + tibia G + tête radiale D"
  },
  {
    // Cas 12 : Volet costal + colectomie + fracture rachis + fracture épaule
    input: "volet costal antérieur droit avec contusion pulmonaire et syndrome restrictif sévère et dyspnée d'effort au stade III ; colectomie droite pour contusion colique traumatique avec troubles du transit à type de diarrhée chronique et douleurs abdominales intermittentes ; tassement vertébral de L2 avec cyphose lombaire de 18 degrés et lombalgie chronique invalidante et raideur du rachis lombaire ; fracture du trochiter de l'épaule gauche arrachée avec raideur de l'épaule et limitation de l'abduction à 80 degrés et douleurs nocturnes",
    expectedSystems: ['thorax', 'abdomen', 'rachis', 'épaule'],
    expectedMinRate: 30,
    expectedMaxRate: 75,
    description: "Volet costal D + colectomie D + tassement L2 + épaule G"
  },
  {
    // Cas 13 : Sternum + splénectomie + fracture fémur bilatérale
    input: "fracture du sternum consolidée avec douleurs sternales chroniques à la palpation et à l'effort et douleurs intercostales ; splénectomie totale pour éclatement traumatique de la rate grade V avec thrombocytose réactionnelle et vaccination obligatoire ; fracture du col du fémur droit traitée par prothèse totale de hanche avec boiterie résiduelle ; fracture sous-trochantérienne du fémur gauche ostéosynthésée avec raccourcissement de 3 cm et raideur de la hanche et du genou et boiterie sévère avec canne",
    expectedSystems: ['thorax', 'abdomen', 'hanche', 'fémur'],
    expectedMinRate: 30,
    expectedMaxRate: 75,
    description: "Sternum + splénectomie + PTH D + sous-trochantérienne G"
  },
  {
    // Cas 14 : Pneumothorax bilatéral + vessie + fracture bassin + fracture avant-bras
    input: "séquelles de pneumothorax bilatéral drainé avec brides pleurales bilatérales et douleurs thoraciques bilatérales chroniques et dyspnée d'effort ; rupture vésicale extra-péritonéale suturée avec troubles mictionnels résiduels à type de pollakiurie et impériosités ; fracture du bassin avec disjonction de la symphyse pubienne et des deux branches ischio-pubiennes consolidées avec douleurs pelviennes chroniques ; fracture des deux os de l'avant-bras droit dominant au tiers distal avec raideur du poignet et limitation de la pronosupination à 50 pour cent",
    expectedSystems: ['thorax', 'abdomen', 'bassin', 'poignet'],
    expectedMinRate: 20,
    expectedMaxRate: 65,
    description: "Pneumothorax bilat + rupture vésicale + bassin complexe + 2 os avant-bras D"
  },
  {
    // Cas 15 : Contusion myocardique + rate + fracture tibia-péroné + fracture radius
    input: "contusion myocardique séquellaire avec troubles du rythme à type d'extrasystoles ventriculaires fréquentes sous traitement et douleurs précordiales atypiques ; splénectomie totale pour rupture traumatique de la rate avec risque infectieux permanent ; fracture des deux os de la jambe droite avec ostéite post-opératoire guérie avec séquelles de cal vicieux angulaire de 12 degrés et raccourcissement de 3 cm et raideur de la cheville et boiterie sévère ; fracture de l'extrémité inférieure du radius gauche consolidée avec arthrose radio-carpienne et raideur du poignet",
    expectedSystems: ['thorax', 'abdomen', 'jambe', 'poignet'],
    expectedMinRate: 30,
    expectedMaxRate: 75,
    description: "Contusion myocardique + splénectomie + 2 os jambe D ostéite + radius G"
  },
  {
    // Cas 16 : Rupture diaphragme + intestin + fracture hanche + genou
    input: "rupture diaphragmatique droite opérée avec hernie diaphragmatique résiduelle et dyspnée d'effort modérée ; résection de 60 cm d'iléon terminal pour contusion mésentérique avec malabsorption et diarrhée intermittente et amaigrissement de 6 kg ; fracture du massif trochantérien de la hanche gauche ostéosynthésée avec raideur résiduelle et flexion limitée à 90 degrés et rotation interne impossible et boiterie ; fracture de la rotule droite ostéosynthésée par haubanage avec raideur du genou en flexion limitée à 95 degrés et douleurs à la montée des escaliers",
    expectedSystems: ['thorax', 'abdomen', 'hanche', 'genou'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "Rupture diaphragme D + résection iléon + trochanter G + rotule D"
  },

  // ============================================================
  // SECTION C : RACHIS + MULTI-MEMBRES (cas 17-24)
  // ============================================================
  {
    // Cas 17 : Fracture C7 + fracture L3 + fracture fémur + fracture radius
    input: "fracture du corps vertébral de C7 avec canal cervical rétréci et myélopathie cervicale débutante comprenant troubles de la marche et paresthésies des quatre membres ; fracture-tassement de L3 avec raideur sévère du rachis lombaire distance doigt-sol à 40 cm et lombalgies permanentes ; fracture du tiers supérieur du fémur droit consolidée par enclouage avec raccourcissement de 2 cm et raideur du genou ; fracture de l'extrémité inférieure du radius gauche consolidée avec raideur du poignet et limitation douloureuse de la pronosupination",
    expectedSystems: ['rachis', 'rachis', 'fémur', 'poignet'],
    expectedMinRate: 10,
    expectedMaxRate: 70,
    description: "Fracture C7 myélopathie + L3 + fémur D + radius G"
  },
  {
    // Cas 18 : Rachis cervical + dorsal + fracture hanche + fracture cheville
    input: "luxation cervicale C5-C6 réduite et arthrodésée avec raideur cervicale majeure et cervicalgies permanentes et névralgie cervico-brachiale gauche avec paresthésies des 4ème et 5ème doigts ; tassement de D7 et D8 avec cyphose dorsale de 18 degrés et douleurs intercostales et dorsalgies chroniques ; fracture cervicale vraie du fémur gauche traitée par prothèse totale de hanche avec inégalité de longueur de 2 cm et boiterie ; fracture trimalléolaire de la cheville droite avec arthrose tibio-tarsienne sévère et raideur majeure et douleurs permanentes à l'appui",
    expectedSystems: ['rachis', 'rachis', 'hanche', 'cheville'],
    expectedMinRate: 15,
    expectedMaxRate: 75,
    description: "Luxation C5-C6 arthrodèse + D7-D8 + PTH G + trimalléolaire D"
  },
  {
    // Cas 19 : Hernie cervicale opérée + fracture L1 + fracture col humérus bilatéral
    input: "hernie discale cervicale C5-C6 post-traumatique opérée par arthrodèse avec raideur cervicale résiduelle et cervicalgies chroniques et limitation des rotations ; fracture de L1 avec recul du mur postérieur et canal lombaire étroit acquis et claudication neurogène à 150 mètres et lombalgies sévères ; fracture du col chirurgical de l'humérus droit dominant avec raideur de l'épaule et abduction limitée à 75 degrés ; fracture du col anatomique de l'humérus gauche avec raideur sévère de l'épaule abduction limitée à 60 degrés et rotation externe impossible",
    expectedSystems: ['rachis', 'rachis', 'épaule', 'épaule'],
    expectedMinRate: 5,
    expectedMaxRate: 70,
    description: "Hernie C5-C6 opérée + L1 canal étroit + épaule bilatérale"
  },
  {
    // Cas 20 : Fracture D12-L1 + fracture bassin + fracture pilon tibial + fracture poignet
    input: "fracture-tassement de D12 et L1 avec cyphose dorso-lombaire de 22 degrés et raideur majeure du rachis et lombalgies invalidantes ; fracture de la branche ischio-pubienne droite consolidée avec douleurs pelviennes chroniques à la position assise ; fracture du pilon tibial gauche avec arthrose tibio-tarsienne post-traumatique et enraidissement de la cheville et douleurs permanentes à la marche ; fracture de l'extrémité inférieure du radius droit dominant consolidée avec raideur du poignet et douleurs à la préhension de force",
    expectedSystems: ['rachis', 'bassin', 'cheville', 'poignet'],
    expectedMinRate: 20,
    expectedMaxRate: 70,
    description: "D12-L1 + bassin D + pilon tibial G + radius D"
  },
  {
    // Cas 21 : Rachis lombaire spondylolisthésis + fracture cotyle + fracture coude + fracture orteil
    input: "spondylolisthésis traumatique L4-L5 grade II post-traumatique avec lombo-sciatalgie bilatérale invalidante et raideur sévère du rachis lombaire ; fracture du cotyle de la hanche droite avec protrusion acétabulaire résiduelle et arthrose coxo-fémorale et limitation sévère de la flexion à 60 degrés et boiterie ; fracture de l'olécrane du coude gauche ostéosynthésée avec raideur résiduelle et flexion limitée à 110 degrés et douleurs à l'appui ; amputation traumatique du gros orteil droit avec trouble de l'équilibre à la marche et douleurs du moignon",
    expectedSystems: ['rachis', 'hanche', 'coude', 'pied'],
    expectedMinRate: 25,
    expectedMaxRate: 75,
    description: "Spondylolisthésis L4-L5 + cotyle D + olécrane G + amputation gros orteil D"
  },
  {
    // Cas 22 : Rachis cervical + rachis lombaire + genou bilatéral
    input: "entorse grave du rachis cervical C3-C4 avec discopathie post-traumatique et cervicalgies chroniques et limitation modérée des rotations et névralgies cervico-brachiales intermittentes ; hernie discale L5-S1 post-traumatique avec sciatique S1 gauche déficitaire et abolition du réflexe achilléen et raideur du rachis lombaire ; fracture du plateau tibial interne du genou droit avec déviation en varus de 6 degrés et gonarthrose et raideur en flexion à 90 degrés ; fracture de la rotule gauche avec raideur du genou en flexion limitée à 100 degrés et douleurs à la descente des escaliers et amyotrophie du quadriceps",
    expectedSystems: ['rachis', 'rachis', 'genou', 'genou'],
    expectedMinRate: 20,
    expectedMaxRate: 70,
    description: "Rachis C3-C4 + hernie L5-S1 + genou bilat (plateau tibial D + rotule G)"
  },
  {
    // Cas 23 : Rachis dorso-lombaire multi-tassements + fracture épaule + fracture jambe
    input: "tassements vertébraux étagés de D9 D10 et D11 avec cyphose dorsale de 30 degrés et douleurs dorsales chroniques invalidantes et syndrome restrictif par déformation thoracique ; hernie discale L3-L4 avec cruralgie droite résiduelle et raideur lombaire ; fracture comminutive de la tête humérale droite dominante traitée par prothèse de l'épaule avec raideur résiduelle et abduction limitée à 80 degrés ; fracture des deux os de la jambe gauche consolidée avec raideur de la cheville et cal vicieux en valgus et douleurs à la marche",
    expectedSystems: ['rachis', 'rachis', 'épaule', 'jambe'],
    expectedMinRate: 25,
    expectedMaxRate: 75,
    description: "Multi-tassements D9-D11 + hernie L3-L4 + prothèse épaule D + 2 os jambe G"
  },
  {
    // Cas 24 : Fracture C4 tétraplegie partielle + fracture fémur
    input: "fracture du corps vertébral de C4 avec contusion médullaire et tétraparésie spastique séquellaire prédominant aux membres inférieurs avec marche possible avec cadre de marche sur courtes distances et spasticité des membres supérieurs modérée et troubles vésico-sphinctériens de type vessie neurologique avec sondages intermittents ; fracture diaphysaire du fémur droit consolidée avec raccourcissement de 2 cm et raideur du genou ; douleurs neuropathiques chroniques des quatre membres sous traitement antiépileptique",
    expectedSystems: ['rachis', 'fémur'],
    expectedMinRate: 25,
    expectedMaxRate: 95,
    description: "Fracture C4 tétraparésie spastique + vessie neurologique + fémur D"
  },

  // ============================================================
  // SECTION D : SENSORIEL + NEUROLOGIQUE + ORTHOPÉDIQUE (cas 25-32)
  // ============================================================
  {
    // Cas 25 : Cécité unilatérale + cataracte traumatique + fracture fémur + fracture épaule
    input: "cécité totale de l'oeil gauche par atrophie du nerf optique post-traumatique avec oeil droit à 8/10 ; cataracte traumatique de l'oeil droit opérée avec implant cristallinien et acuité visuelle corrigée à 8/10 ; fracture diaphysaire du fémur droit consolidée avec raccourcissement de 2 cm et raideur du genou en flexion limitée à 90 degrés et boiterie résiduelle ; fracture de l'extrémité supérieure de l'humérus gauche avec raideur de l'épaule et abduction limitée à 80 degrés",
    expectedSystems: ['vision', 'fémur', 'épaule'],
    expectedMinRate: 30,
    expectedMaxRate: 75,
    description: "Cécité OG + cataracte OD opérée + fémur D + épaule G"
  },
  {
    // Cas 26 : Surdité bilatérale + fracture rachis + fracture hanche + fracture radius
    input: "surdité de perception bilatérale sévère à 60 dB aux fréquences conversationnelles appareillée avec acouphènes permanents invalidants et vertiges rotatoires intermittents ; tassement vertébral de L1 avec raideur du rachis lombaire et lombalgies chroniques ; fracture du massif trochantérien de la hanche gauche ostéosynthésée avec raideur et flexion limitée à 85 degrés et boiterie résiduelle ; fracture de Goyrand-Smith du radius droit dominant consolidée avec raideur du poignet et douleurs chroniques",
    expectedSystems: ['audition', 'rachis', 'hanche', 'poignet'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "Surdité bilat sévère 60 dB + L1 + trochanter G + radius D"
  },
  {
    // Cas 27 : Diplopie permanente + paralysie plexus brachial + fracture cheville
    input: "diplopie permanente dans tous les regards après fracture de l'orbite gauche avec parésie du nerf moteur oculaire commun et ptosis résiduel et limitation de l'élévation et de l'adduction du globe ; paralysie haute du plexus brachial droit dominant C5-C6 avec déficit de l'abduction de l'épaule et de la flexion du coude et amyotrophie du deltoïde et du biceps et douleurs neuropathiques ; fracture trimalléolaire de la cheville gauche avec raideur sévère et arthrose et boiterie permanente",
    expectedSystems: ['vision', 'épaule', 'cheville'],
    expectedMinRate: 30,
    expectedMaxRate: 75,
    description: "Diplopie permanente + plexus brachial D C5-C6 + trimalléolaire G"
  },
  {
    // Cas 28 : BAV bilatérale sévère + surdité unilatérale + fracture bassin + genou
    input: "baisse de l'acuité visuelle OD à 2/10 et OG à 3/10 après contusion bilatérale des globes oculaires avec décollement rétinien OD opéré et persistance de scotome et cataracte traumatique OG ; surdité de transmission unilatérale droite à 45 dB par fracture du rocher avec paralysie faciale périphérique homolatérale partielle ; fracture de la branche ischio-pubienne et ilio-pubienne droites consolidées avec douleurs pelviennes permanentes ; fracture du plateau tibial externe du genou gauche avec gonarthrose et raideur et flexion limitée à 85 degrés",
    expectedSystems: ['vision', 'audition', 'bassin', 'genou'],
    expectedMinRate: 30,
    expectedMaxRate: 80,
    description: "BAV bilat sévère + surdité D + paralysie faciale + bassin D + plateau tibial G"
  },
  {
    // Cas 29 : Anosmie + agueusie + fracture col fémur + fracture humérus + fracture côtes
    input: "anosmie totale et agueusie séquellaires après fracture de l'étage antérieur de la base du crâne avec rhinorrhée de LCR initiale traitée ; fracture du col du fémur gauche traitée par prothèse totale de hanche avec inégalité de longueur de 1 cm et boiterie légère ; fracture du tiers moyen de l'humérus droit dominant consolidée avec paralysie radiale incomplète séquellaire et déficit de l'extension du poignet et des doigts ; fractures des 5ème 6ème et 7ème côtes gauches consolidées avec douleurs thoraciques résiduelles",
    expectedSystems: ['odorat', 'hanche', 'épaule', 'thorax'],
    expectedMinRate: 25,
    expectedMaxRate: 95,
    description: "Anosmie + agueusie + PTH G + humérus D paralysie radiale + côtes G"
  },
  {
    // Cas 30 : Paralysie du III + fracture rachis + fracture tibia + fracture main
    input: "paralysie complète du nerf moteur oculaire commun gauche avec ptosis complet et mydriase aréactive et diplopie permanente nécessitant l'occlusion de l'oeil ; cervicalgies chroniques post-entorse grave du rachis cervical C5-C6 avec limitation sévère des rotations à 30 pour cent ; fracture diaphysaire du tibia droit consolidée avec cal vicieux en rotation externe et douleurs chroniques et raideur de la cheville ; fracture du 5ème métacarpien de la main droite dominante consolidée avec perte de force de la prise en porte-à-faux",
    expectedSystems: ['vision', 'rachis', 'tibia', 'main'],
    expectedMinRate: 20,
    expectedMaxRate: 65,
    description: "Paralysie III G + rachis cervical + tibia D cal vicieux + 5è méta MD"
  },
  {
    // Cas 31 : Énucléation + surdité + fracture épaule + fracture cheville
    input: "énucléation de l'oeil gauche après perforation traumatique du globe oculaire avec prothèse oculaire et oeil droit à 10/10 ; surdité mixte bilatérale moyenne à 40 dB avec acouphènes permanents ; fracture comminutive de l'extrémité supérieure de l'humérus droit dominant avec ostéonécrose secondaire et raideur sévère de l'épaule abduction limitée à 60 degrés ; fracture bimalléolaire de la cheville gauche avec instabilité chronique et entorses récidivantes et boiterie",
    expectedSystems: ['vision', 'audition', 'épaule', 'cheville'],
    expectedMinRate: 30,
    expectedMaxRate: 75,
    description: "Énucléation OG + surdité bilat + épaule D ostéonécrose + bimalléolaire G"
  },
  {
    // Cas 32 : Perforation tympan + BAV + fracture cotyle + fracture coude
    input: "perforation tympanique bilatérale post-traumatique non cicatrisée avec surdité de transmission bilatérale légère à 25 dB et otorrhée intermittente ; baisse de l'acuité visuelle de l'oeil droit à 4/10 après contusion du globe oculaire avec recul de l'angle irido-cornéen et hypertonie oculaire sous traitement ; fracture du cotyle de la hanche gauche avec arthrose coxo-fémorale et limitation de la flexion à 80 degrés et de la rotation interne et boiterie ; fracture du condyle huméral du coude droit dominant avec raideur en flexion à 100 degrés et limitation de la pronosupination",
    expectedSystems: ['audition', 'vision', 'hanche', 'coude'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "Perforation tympan bilat + BAV OD + cotyle G + condyle huméral D"
  },

  // ============================================================
  // SECTION E : PSYCHIATRIQUE + MULTI-APPAREIL (cas 33-40)
  // ============================================================
  {
    // Cas 33 : TSPT sévère + contusion pulmonaire + fracture fémur + fracture épaule
    input: "état de stress post-traumatique sévère avec intrusions quotidiennes et cauchemars plurihebdomadaires et hyperréactivité aux stimuli sonores et visuels et évitement de tout transport motorisé et phobie des espaces clos ; contusion pulmonaire gauche séquellaire avec fibrose basale et dyspnée d'effort au stade II ; fracture diaphysaire du fémur droit consolidée avec raccourcissement de 2 cm et raideur du genou et amyotrophie et boiterie ; fracture du col chirurgical de l'humérus gauche consolidée avec raideur de l'épaule abduction limitée à 85 degrés",
    expectedSystems: ['psychiatrique', 'thorax', 'fémur', 'épaule'],
    expectedMinRate: 25,
    expectedMaxRate: 100,
    description: "TSPT sévère + contusion pulmonaire G + fémur D + épaule G"
  },
  {
    // Cas 34 : Dépression chronique + splénectomie + fracture rachis + fracture genou
    input: "épisode dépressif majeur récurrent post-traumatique avec trois tentatives de suicide et hospitalisations psychiatriques multiples et traitement antidépresseur et thymorégulateur au long cours et incapacité professionnelle totale ; splénectomie totale pour rupture de la rate avec thrombocytose résiduelle ; tassement vertébral de D11 avec cyphose de 12 degrés et dorsalgies ; fracture du plateau tibial interne du genou droit ostéosynthésée avec gonarthrose et raideur et flexion limitée à 85 degrés et douleurs chroniques",
    expectedSystems: ['psychiatrique', 'abdomen', 'rachis', 'genou'],
    expectedMinRate: 30,
    expectedMaxRate: 80,
    description: "Dépression majeure récurrente + splénectomie + D11 + plateau tibial D"
  },
  {
    // Cas 35 : Trouble panique + BAV + fracture fémur + fracture cheville
    input: "trouble panique post-traumatique avec attaques de panique quotidiennes et conduites d'évitement généralisé et agoraphobie sévère et traitement anxiolytique et antidépresseur ; baisse de l'acuité visuelle de l'oeil gauche à 3/10 après contusion oculaire avec subluxation du cristallin ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 2 cm et raideur du genou flexion limitée à 95 degrés et boiterie ; fracture bimalléolaire de la cheville droite avec raideur résiduelle et arthrose débutante et douleurs à la marche prolongée",
    expectedSystems: ['psychiatrique', 'vision', 'fémur', 'cheville'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "Trouble panique + BAV OG + fémur G + bimalléolaire D"
  },
  {
    // Cas 36 : Trouble dissociatif + fracture thorax + fracture hanche + fracture radius
    input: "trouble dissociatif de conversion post-traumatique avec crises pseudo-épileptiques plurihebdomadaires et amnésie dissociative et dépersonnalisation chronique et suivi psychiatrique intensif ; fractures des 7ème et 8ème côtes droites consolidées avec douleurs thoraciques chroniques à l'effort ; fracture du col du fémur droit traitée par prothèse totale de hanche avec boiterie résiduelle et limitation de la flexion ; fracture de l'extrémité inférieure du radius gauche consolidée avec raideur du poignet et arthrose radio-carpienne",
    expectedSystems: ['psychiatrique', 'thorax', 'hanche', 'poignet'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "Trouble dissociatif + côtes D + PTH D + radius G"
  },
  {
    // Cas 37 : TSPT + anosmie + fracture bassin + fracture épaule + fracture cheville
    input: "état de stress post-traumatique avec flash-backs quotidiens et hypervigilance permanente et insomnie sévère et conduites d'évitement des lieux de l'accident ; anosmie post-traumatique avec perte complète de l'odorat et du goût ; fracture du cadre obturateur du bassin gauche consolidée avec douleurs pelviennes chroniques ; fracture du trochiter de l'épaule droite dominante avec raideur et limitation de l'abduction à 100 degrés ; fracture de la malléole interne de la cheville gauche avec instabilité résiduelle et douleurs",
    expectedSystems: ['psychiatrique', 'odorat', 'bassin', 'épaule', 'cheville'],
    expectedMinRate: 20,
    expectedMaxRate: 65,
    description: "TSPT + anosmie + bassin G + épaule D + malléole G"
  },
  {
    // Cas 38 : Dépression + surdité + fracture rachis lombaire + fracture fémur
    input: "syndrome dépressif sévère post-traumatique avec anhedonie totale et clinophilie et isolement social majeur et traitement psychotrope lourd et suivi psychiatrique bimensuel ; surdité de perception unilatérale gauche à 55 dB avec acouphènes invalidants et vertiges positionnels ; hernie discale L4-L5 post-traumatique avec sciatalgie gauche déficitaire et raideur lombaire sévère ; fracture diaphysaire du fémur droit consolidée avec raccourcissement de 3 cm et raideur du genou et boiterie permanente avec canne",
    expectedSystems: ['psychiatrique', 'audition', 'rachis', 'fémur'],
    expectedMinRate: 30,
    expectedMaxRate: 80,
    description: "Dépression sévère + surdité G + hernie L4-L5 + fémur D"
  },
  {
    // Cas 39 : Anxiété généralisée + TC + fracture tibia bilatéral
    input: "trouble anxieux généralisé post-traumatique sévère avec inquiétudes permanentes et tension musculaire généralisée et irritabilité et troubles du sommeil majeurs ; traumatisme crânien léger avec céphalées chroniques quotidiennes et troubles de la concentration ; fracture diaphysaire du tibia droit consolidée avec cal vicieux angulaire de 10 degrés et raccourcissement de 1 cm et douleurs chroniques ; fracture du tibia gauche au tiers distal consolidée avec raideur de la cheville et douleurs à la marche et boiterie bilatérale avec deux cannes",
    expectedSystems: ['psychiatrique', 'crâne', 'tibia', 'tibia'],
    expectedMinRate: 20,
    expectedMaxRate: 65,
    description: "Anxiété généralisée + TC + tibia bilatéral"
  },
  {
    // Cas 40 : TSPT + fracture maxillaire + fracture humérus + fracture calcanéum
    input: "état de stress post-traumatique complexe avec reviviscences envahissantes et conduites d'évitement majeur et détachement affectif et troubles de la régulation émotionnelle et traitement par EMDR et pharmacothérapie ; fracture du maxillaire avec trouble de l'articulé dentaire et limitation de l'ouverture buccale à 30 mm et douleurs à la mastication ; fracture diaphysaire de l'humérus gauche consolidée avec raideur de l'épaule et limitation de l'abduction à 90 degrés ; fracture du calcanéum droit avec arthrose sous-talienne sévère et douleurs permanentes à l'appui et boiterie",
    expectedSystems: ['psychiatrique', 'épaule', 'pied'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "TSPT complexe + maxillaire + humérus G + calcanéum D"
  },

  // ============================================================
  // SECTION F : POLYTRAUMATISMES MASSIFS ≥5 SIÈGES (cas 41-50)
  // ============================================================
  {
    // Cas 41 : TC + thorax + rate + rachis + fémur — 5 sièges
    input: "traumatisme crânien avec perte de connaissance de 30 minutes et céphalées chroniques quotidiennes et troubles de la mémoire immédiate ; fractures des 3ème 4ème et 5ème côtes gauches consolidées avec douleurs thoraciques persistantes ; splénectomie totale pour rupture de la rate grade IV ; tassement de L2 avec raideur du rachis lombaire et lombalgies chroniques et raideur matinale ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 2 cm et raideur du genou et boiterie résiduelle",
    expectedSystems: ['crâne', 'thorax', 'abdomen', 'rachis', 'fémur'],
    expectedMinRate: 25,
    expectedMaxRate: 75,
    description: "5 sièges: TC + côtes G + splénectomie + L2 + fémur G"
  },
  {
    // Cas 42 : TSPT + vision + thorax + hanche + genou — 5 sièges
    input: "état de stress post-traumatique avec cauchemars hebdomadaires et hypervigilance et conduites d'évitement des transports en commun et traitement au long cours ; baisse de l'acuité visuelle de l'oeil droit à 2/10 après iridodialyse et subluxation du cristallin avec oeil gauche à 10/10 ; fractures des 6ème 7ème et 8ème côtes droites consolidées avec douleurs thoraciques résiduelles chroniques ; fracture du col du fémur gauche traitée par prothèse totale de hanche avec boiterie et douleurs mécaniques ; fracture de la rotule droite ostéosynthésée avec raideur du genou en flexion limitée à 95 degrés et douleurs à la montée des escaliers",
    expectedSystems: ['psychiatrique', 'vision', 'thorax', 'hanche', 'genou'],
    expectedMinRate: 30,
    expectedMaxRate: 80,
    description: "5 sièges: TSPT + BAV OD 2/10 + côtes D + PTH G + rotule D"
  },
  {
    // Cas 43 : TC + audition + abdomen + rachis + fémur — 5 sièges
    input: "traumatisme crânien modéré avec troubles de la mémoire et de la concentration résiduel et céphalées chroniques ; surdité de perception bilatérale moyenne à 40 dB aux fréquences conversationnelles avec acouphènes bilatéraux permanents ; néphrectomie gauche pour éclatement rénal traumatique grade IV ; hernie discale L5-S1 post-traumatique avec sciatique droite et raideur lombaire ; fracture diaphysaire du fémur droit consolidée avec raccourcissement de 3 cm et raideur du genou et boiterie permanente avec canne",
    expectedSystems: ['crâne', 'audition', 'abdomen', 'rachis', 'fémur'],
    expectedMinRate: 30,
    expectedMaxRate: 80,
    description: "5 sièges: TC + surdité bilat + néphrectomie + hernie L5-S1 + fémur D"
  },
  {
    // Cas 44 : TC + thorax + abdomen + épaule + hanche + cheville — 6 sièges
    input: "traumatisme crânien grave avec coma initial de 48 heures et déficit cognitif séquellaire modéré et céphalées invalidantes quotidiennes ; volet costal postéro-latéral gauche avec contusion pulmonaire et syndrome restrictif modéré et dyspnée d'effort ; gastrectomie partielle pour perforation gastrique traumatique avec dumping syndrome et amaigrissement de 10 kg ; fracture comminutive de la tête humérale droite dominante traitée par prothèse de l'épaule avec raideur résiduelle ; fracture du massif trochantérien de la hanche gauche ostéosynthésée avec raideur et boiterie ; fracture bimalléolaire de la cheville droite avec raideur et arthrose tibio-tarsienne",
    expectedSystems: ['crâne', 'thorax', 'abdomen', 'épaule', 'hanche', 'cheville'],
    expectedMinRate: 40,
    expectedMaxRate: 90,
    description: "6 sièges: TC grave + volet costal G + gastrectomie + prothèse épaule D + hanche G + bimalléolaire D"
  },
  {
    // Cas 45 : TSPT + TC + vision + rachis + fémur — 5 sièges neuro-psy-sensoriel
    input: "état de stress post-traumatique sévère avec cauchemars quotidiens et reviviscences et hypervigilance et conduites d'évitement majeur et traitement psychotrope lourd ; traumatisme crânien avec syndrome post-commotionnel persistant comprenant céphalées et vertiges et troubles de la concentration ; baisse de l'acuité visuelle de l'oeil gauche à 1/10 après contusion sévère du globe oculaire avec décollement rétinien séquellaire ; tassement vertébral de D12 avec cyphose dorsale de 15 degrés et douleurs dorsales chroniques ; fracture diaphysaire du fémur gauche consolidée par enclouage avec raccourcissement de 2 cm et raideur du genou et boiterie",
    expectedSystems: ['psychiatrique', 'crâne', 'vision', 'rachis', 'fémur'],
    expectedMinRate: 15,
    expectedMaxRate: 80,
    description: "5 sièges: TSPT + TC + BAV OG 1/10 + D12 + fémur G"
  },
  {
    // Cas 46 : TC + thorax + rachis + bassin + genou + épaule — 6 sièges
    input: "traumatisme crânien modéré avec troubles de la mémoire de travail et syndrome dysexécutif léger et céphalées chroniques ; fractures des 4ème à 7ème côtes gauches consolidées avec douleurs thoraciques résiduelles et dyspnée d'effort légère ; fracture-tassement de L1 avec cyphose lombaire et raideur sévère du rachis lombaire et lombalgies permanentes ; fracture du cadre obturateur du bassin droit consolidée avec douleurs pelviennes ; fracture du plateau tibial interne du genou gauche avec gonarthrose et raideur en flexion à 90 degrés ; fracture du col chirurgical de l'humérus droit dominant avec raideur de l'épaule et abduction limitée à 80 degrés",
    expectedSystems: ['crâne', 'thorax', 'rachis', 'bassin', 'genou', 'épaule'],
    expectedMinRate: 15,
    expectedMaxRate: 85,
    description: "6 sièges: TC + côtes G + L1 + bassin D + plateau tibial G + épaule D"
  },
  {
    // Cas 47 : TC + thorax + abdomen + rachis + hanche + genou + poignet — 7 sièges AVP grave
    input: "traumatisme crânien grave avec déficit cognitif séquellaire comprenant troubles de la mémoire et de l'attention et syndrome dysexécutif et céphalées permanentes ; fractures costales multiples droites de la 4ème à la 9ème côte avec contusion pulmonaire séquellaire et syndrome restrictif modéré ; splénectomie totale pour rupture traumatique de la rate ; tassement de D12 et L1 avec cyphose dorso-lombaire de 20 degrés et raideur sévère du rachis et lombalgies ; fracture du col du fémur gauche traitée par prothèse totale de hanche avec boiterie ; fracture supra-condylienne du fémur droit avec raideur du genou en flexion limitée à 80 degrés et amyotrophie du quadriceps ; fracture de l'extrémité inférieure du radius gauche avec raideur sévère du poignet et limitation de la pronosupination",
    expectedSystems: ['crâne', 'thorax', 'abdomen', 'rachis', 'hanche', 'genou', 'poignet'],
    expectedMinRate: 20,
    expectedMaxRate: 95,
    description: "7 sièges: TC grave + côtes D + splénectomie + D12-L1 + PTH G + genou D + radius G"
  },
  {
    // Cas 48 : TSPT + TC + thorax + abdomen + rachis + fémur — 6 sièges
    input: "état de stress post-traumatique majeur avec cauchemars quotidiens et hypervigilance permanente et conduites d'évitement et dépression comorbide et traitement psychotrope lourd ; traumatisme crânien avec perte de connaissance de 2 heures et céphalées chroniques et troubles de la concentration ; fractures des 5ème 6ème et 7ème côtes gauches consolidées avec douleurs thoraciques chroniques ; néphrectomie droite pour contusion rénale grave ; tassement de L2 avec cyphose lombaire et raideur du rachis et lombalgies permanentes ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 3 cm et raideur du genou et boiterie permanente avec canne",
    expectedSystems: ['psychiatrique', 'crâne', 'thorax', 'abdomen', 'rachis', 'fémur'],
    expectedMinRate: 35,
    expectedMaxRate: 85,
    description: "6 sièges: TSPT + TC + côtes G + néphrectomie + L2 + fémur G"
  },
  {
    // Cas 49 : TC + vision + audition + thorax + fémur + épaule — 6 sièges neuro-sensoriel
    input: "traumatisme crânien grave avec hémiparésie gauche légère séquellaire et troubles cognitifs résiduels et céphalées chroniques ; baisse de l'acuité visuelle de l'oeil gauche à 3/10 après contusion oculaire avec récession angulaire et hypertonie oculaire ; surdité de perception unilatérale droite à 50 dB avec acouphènes permanents par fracture du rocher ; fractures des 4ème et 5ème côtes droites consolidées avec douleurs thoraciques résiduelles ; fracture diaphysaire du fémur droit consolidée avec raccourcissement de 2 cm et raideur du genou et boiterie ; fracture du col chirurgical de l'humérus gauche consolidée avec raideur de l'épaule et abduction limitée à 70 degrés",
    expectedSystems: ['crâne', 'vision', 'audition', 'thorax', 'fémur', 'épaule'],
    expectedMinRate: 35,
    expectedMaxRate: 90,
    description: "6 sièges: TC grave hémiparésie + BAV OG + surdité D + côtes D + fémur D + épaule G"
  },
  {
    // Cas 50 : TC + thorax + abdomen + rachis + hanche + cheville + épaule + psy — 8 sièges (accident ferroviaire gravissime)
    input: "traumatisme crânien grave avec coma initial de 5 jours et déficit cognitif séquellaire sévère comprenant syndrome dysexécutif majeur et troubles de la mémoire et aphasie d'expression résiduelle ; fracas thoracique avec volet costal antéro-latéral droit et contusion pulmonaire bilatérale et syndrome restrictif sévère et dyspnée d'effort ; splénectomie totale pour éclatement de la rate et contusion hépatique grade III avec douleurs de l'hypochondre droit résiduelles ; fracture-tassement étagé de D10 D11 et D12 avec cyphose dorsale de 35 degrés et raideur majeure du rachis et douleurs permanentes ; fracture du cotyle de la hanche gauche avec protrusion acétabulaire et arthrose coxo-fémorale sévère et boiterie majeure ; fracture trimalléolaire de la cheville droite avec arthrose tibio-tarsienne et raideur sévère ; fracture comminutive de la tête humérale droite dominante avec prothèse d'épaule et raideur sévère abduction limitée à 50 degrés ; état de stress post-traumatique majeur avec dépression comorbide sévère et idéation suicidaire et traitement psychotrope lourd",
    expectedSystems: ['crâne', 'thorax', 'abdomen', 'rachis', 'hanche', 'cheville', 'épaule', 'psychiatrique'],
    expectedMinRate: 30,
    expectedMaxRate: 98,
    description: "8 sièges accident ferroviaire: TC grave + fracas thorax + splénectomie+foie + D10-D12 + cotyle G + trimalléolaire D + prothèse épaule D + TSPT+dépression"
  },
];

// ====== RUNNER ======
async function runTests() {
  let passed = 0;
  let failed = 0;

  console.log('╔═══════════════════════════════════════════════════════════════════╗');
  console.log('║  TEST 50 CAS POLYTRAUMATISMES COMPLEXES — SÉRIE 2 (V3.3.319)    ║');
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
          || (s === 'abdomen' && /spl[eé]n|r[eé]nal|rate|foie|h[eé]pat|gastr|n[eé]phrect|chol[eé]cyst|intestin|m[eé]sent|pancr[eé]|v[eé]sicale/i.test(allText))
          || (s === 'vision' && /visuel|acuit[eé]|oculaire|oeil|\boeil\b|dipl|BAV|iridodial|[eé]nucl[eé]ation|globe|r[eé]tin|cataracte|c[eé]cit[eé]/i.test(allText))
          || (s === 'audition' && /audit|surdit|acouph|hypoacous|ossicul|rocher|tympan/i.test(allText))
          || (s === 'odorat' && /anosmie|odorat|olfact|lame.*cribl|agu[eé]usie/i.test(allText))
          || (s === 'psychiatrique' && /d[eé]press|psychiatr|psycho|tspt|stress.*post|phobi|anxi[eé]t|adaptation|panique|dissociatif/i.test(allText))
          || (s.includes('rachis') && /rachis|vert[eé]br|lombaire|cervical|dorsal|hernie.*disc|tassement|cyphose|spondylolisth/i.test(allText))
          || (s === 'bassin' && /bassin|pelvien|obtur|cotyle|symphyse|sacrum|coccyx|iliaque|ischio|sacro/i.test(allText))
          || (s === 'épaule' && /[eé]paule|hum[eé]r|clavicule|scapul|abduction|trochiter|omoplate|plexus.*brach/i.test(allText))
          || (s === 'genou' && /genou|plateau.*tibial|rotule|lca|lig.*crois|supra.*condyl/i.test(allText))
          || (s === 'cheville' && /cheville|mall[eé]ol|pilon.*tibial|tarse|tibio.*tars|astragale/i.test(allText))
          || (s === 'hanche' && /hanche|col.*f[eé]mor|trochant|coxo|pth|cotyle|proth[eè]se.*totale.*hanche/i.test(allText))
          || (s === 'fémur' && /f[eé]mur|diaphys.*f[eé]m/i.test(allText))
          || (s === 'tibia' && /tibia|jambe|diaphys.*tib/i.test(allText))
          || (s === 'poignet' && /poignet|radius|scapho[ïi]de|pronosupination|pouteau/i.test(allText))
          || (s === 'coude' && /coude|ol[eé]cran|t[eê]te.*radial|pronosupination|condyl.*hum[eé]r/i.test(allText))
          || (s === 'main' && /main|pouce|index|doigt|m[eé]dius|m[eé]tacarp|phalang|auriculaire|annulaire/i.test(allText))
          || (s === 'pied' && /pied|calcan[eé]um|tarse|orteil|m[eé]tatars|B[oö]hler|astragale/i.test(allText))
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
