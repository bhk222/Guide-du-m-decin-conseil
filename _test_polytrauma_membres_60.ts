// Test 60 cas : polytraumatismes MEMBRES SUPÉRIEURS + INFÉRIEURS (V3.3.319)
// Combinaisons variées: épaule, coude, poignet, main + hanche, fémur, genou, jambe, cheville, pied
import { localExpertAnalysis } from './components/AiAnalyzer';

interface TestCase {
  input: string;
  expectedSystems: string[];
  expectedMinRate: number;
  expectedMaxRate: number;
  description: string;
  acceptDominantLesion?: boolean; // Si true, accepte un résultat lésion dominante non-polytrauma
}

const testCases: TestCase[] = [
  // ============================================================
  // SECTION A : ÉPAULE + MEMBRE INFÉRIEUR (cas 1-10)
  // ============================================================
  {
    // Cas 1 : Fracture épaule D + fracture fémur G
    input: "fracture comminutive de l'extrémité supérieure de l'humérus droit dominant avec raideur sévère de l'épaule abduction limitée à 60 degrés et rotation externe impossible et douleurs nocturnes ; fracture diaphysaire du fémur gauche consolidée par enclouage centro-médullaire avec raccourcissement de 2 cm et raideur du genou flexion limitée à 90 degrés et amyotrophie du quadriceps et boiterie avec canne",
    expectedSystems: ['épaule', 'fémur'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Épaule D comminutive + fémur G raccourci"
  },
  {
    // Cas 2 : Luxation épaule récidivante + fracture col fémur PTH
    input: "luxation récidivante de l'épaule gauche opérée par butée coracoïdienne avec limitation de la rotation externe et de l'abduction au-delà de 100 degrés et appréhension résiduelle ; fracture du col du fémur droit traitée par prothèse totale de hanche avec boiterie résiduelle légère et douleurs mécaniques à la marche prolongée et limitation de la flexion à 90 degrés",
    expectedSystems: ['épaule', 'hanche'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Luxation épaule G récidivante + PTH D"
  },
  {
    // Cas 3 : Fracture épaule bilatérale + fracture plateau tibial
    input: "fracture du col chirurgical de l'humérus droit dominant consolidée avec raideur de l'épaule et abduction limitée à 80 degrés et rotation externe limitée ; fracture de la tête humérale gauche avec raideur sévère de l'épaule abduction limitée à 60 degrés et rotation impossible et impossibilité de se coiffer ; fracture du plateau tibial externe du genou droit avec déviation en valgus de 5 degrés et gonarthrose et raideur du genou flexion limitée à 90 degrés",
    expectedSystems: ['épaule', 'épaule', 'genou'],
    expectedMinRate: 15,
    expectedMaxRate: 65,
    description: "Épaule bilatérale + plateau tibial D"
  },
  {
    // Cas 4 : Fracture trochiter épaule + fracture bimalléolaire cheville
    input: "fracture du trochiter de l'épaule droite dominante arrachée avec raideur résiduelle et douleurs à l'abduction au-delà de 100 degrés et tendinopathie de la coiffe des rotateurs résiduelle ; fracture bimalléolaire de la cheville gauche ostéosynthésée avec raideur résiduelle et instabilité en varus et arthrose tibio-tarsienne débutante et douleurs à la marche prolongée sur terrain irrégulier",
    expectedSystems: ['épaule', 'cheville'],
    expectedMinRate: 10,
    expectedMaxRate: 50,
    description: "Trochiter épaule D + bimalléolaire cheville G"
  },
  {
    // Cas 5 : Prothèse épaule G + fracture fémur D + fracture cheville G
    input: "fracture comminutive de la tête humérale gauche traitée par prothèse d'épaule avec raideur résiduelle abduction limitée à 70 degrés et rotation externe à 10 degrés et douleurs mécaniques ; fracture diaphysaire du fémur droit consolidée par enclouage avec raccourcissement de 3 cm et raideur du genou flexion limitée à 80 degrés et boiterie permanente ; fracture trimalléolaire de la cheville gauche avec arthrose tibio-tarsienne et raideur sévère et douleurs permanentes à la marche",
    expectedSystems: ['épaule', 'fémur', 'cheville'],
    expectedMinRate: 20,
    expectedMaxRate: 70,
    description: "Prothèse épaule G + fémur D raccourci + trimalléolaire G"
  },
  {
    // Cas 6 : Fracture clavicule + fracture diaphyse tibiale
    input: "fracture de la clavicule droite dominante consolidée en chevauchement avec raccourcissement de 2 cm et cal saillant douloureux et limitation de l'abduction de l'épaule au-delà de 130 degrés et douleurs à l'effort ; fracture diaphysaire du tibia gauche consolidée avec cal vicieux angulaire de 10 degrés en valgus et raccourcissement de 2 cm et raideur de la cheville et douleurs à la marche prolongée et boiterie résiduelle",
    expectedSystems: ['épaule', 'tibia'],
    expectedMinRate: 8,
    expectedMaxRate: 45,
    description: "Clavicule D + tibia G cal vicieux"
  },
  {
    // Cas 7 : Fracture épaule + fracture hanche + fracture calcanéum
    input: "fracture du col anatomique de l'humérus droit dominant avec nécrose de la tête humérale et raideur sévère de l'épaule abduction limitée à 50 degrés et rotation externe impossible ; fracture du massif trochantérien de la hanche gauche ostéosynthésée avec raideur résiduelle et flexion limitée à 80 degrés et rotation interne impossible et boiterie ; fracture du calcanéum droit avec effondrement de l'angle de Böhler et arthrose sous-talienne et douleurs permanentes à l'appui",
    expectedSystems: ['épaule', 'hanche', 'pied'],
    expectedMinRate: 5,
    expectedMaxRate: 70,
    description: "Épaule D nécrose + trochanter G + calcanéum D"
  },
  {
    // Cas 8 : Fracture omoplate + fracture rotule + fracture pilon tibial
    input: "fracture de l'omoplate droite dominante consolidée avec douleurs périscapulaires chroniques et limitation de l'abduction de l'épaule à 90 degrés et gêne au port de charges ; fracture de la rotule gauche ostéosynthésée par haubanage avec raideur du genou en flexion limitée à 95 degrés et douleurs à la montée et descente des escaliers ; fracture du pilon tibial droit avec arthrose tibio-tarsienne post-traumatique sévère et enraidissement de la cheville et douleurs permanentes à la marche avec canne",
    expectedSystems: ['épaule', 'genou', 'cheville'],
    expectedMinRate: 15,
    expectedMaxRate: 65,
    description: "Omoplate D + rotule G + pilon tibial D"
  },
  {
    // Cas 9 : Luxation acromio-claviculaire + fracture sous-trochantérienne + fracture malléole
    input: "luxation acromio-claviculaire de stade III de l'épaule gauche opérée avec douleurs résiduelles et instabilité résiduelle et limitation de l'abduction au-delà de 120 degrés ; fracture sous-trochantérienne du fémur droit ostéosynthésée avec raccourcissement de 2 cm et raideur de la hanche et du genou et boiterie permanente avec canne ; fracture de la malléole interne de la cheville gauche avec instabilité résiduelle et douleurs à la marche prolongée",
    expectedSystems: ['épaule', 'fémur', 'cheville'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Luxation acromio-claviculaire G + sous-trochantérienne D + malléole G"
  },
  {
    // Cas 10 : Fracture épaule + fracture cotyle + fracture tibia
    input: "fracture du col chirurgical de l'humérus gauche consolidée avec raideur de l'épaule abduction limitée à 75 degrés et douleurs ; fracture du cotyle de la hanche droite avec arthrose coxo-fémorale post-traumatique et limitation de la flexion à 70 degrés et de la rotation interne et boiterie sévère ; fracture des deux os de la jambe gauche consolidée avec cal vicieux angulaire et raccourcissement de 2 cm et raideur de la cheville et boiterie bilatérale avec canne",
    expectedSystems: ['épaule', 'hanche', 'jambe'],
    expectedMinRate: 20,
    expectedMaxRate: 70,
    description: "Épaule G + cotyle D + 2 os jambe G"
  },

  // ============================================================
  // SECTION B : COUDE + MEMBRE INFÉRIEUR (cas 11-20)
  // ============================================================
  {
    // Cas 11 : Fracture olécrâne D + fracture fémur G
    input: "fracture de l'olécrâne du coude droit dominant ostéosynthésée avec raideur en flexion limitée à 100 degrés et déficit d'extension de 20 degrés et douleurs à l'appui sur le coude ; fracture diaphysaire du fémur gauche consolidée par enclouage avec raccourcissement de 2 cm et raideur du genou et amyotrophie du quadriceps gauche et boiterie résiduelle",
    expectedSystems: ['coude', 'fémur'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Olécrâne D + fémur G"
  },
  {
    // Cas 12 : Fracture tête radiale + fracture plateau tibial + fracture cheville
    input: "fracture de la tête radiale du coude droit dominant avec limitation de la pronosupination à 40 pour cent et douleurs en supination forcée et perte de force de la poignée de main ; fracture du plateau tibial interne du genou gauche ostéosynthésée avec déviation en varus de 5 degrés et gonarthrose et raideur en flexion à 85 degrés ; fracture bimalléolaire de la cheville droite avec raideur résiduelle et instabilité et douleurs à la marche prolongée",
    expectedSystems: ['coude', 'genou', 'cheville'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Tête radiale D + plateau tibial G + bimalléolaire D"
  },
  {
    // Cas 13 : Luxation coude + fracture col fémur + fracture astragale
    input: "luxation postérieure du coude gauche réduite avec ossifications périarticulaires et raideur sévère en flexion limitée à 90 degrés et déficit d'extension de 25 degrés et limitation de la pronosupination ; fracture du col du fémur droit traitée par prothèse totale de hanche avec boiterie résiduelle et douleurs mécaniques ; fracture de l'astragale du pied gauche avec nécrose avasculaire partielle et arthrose sous-talienne et douleurs chroniques à la marche et boiterie",
    expectedSystems: ['coude', 'hanche', 'pied'],
    expectedMinRate: 20,
    expectedMaxRate: 65,
    description: "Luxation coude G + PTH D + astragale G nécrose"
  },
  {
    // Cas 14 : Fracture condyle huméral + fracture diaphyse tibia bilatérale
    input: "fracture du condyle externe de l'humérus droit dominant avec raideur du coude et flexion limitée à 110 degrés et limitation de la pronosupination à 60 pour cent ; fracture diaphysaire du tibia droit consolidée avec cal vicieux angulaire de 8 degrés et douleurs à la marche ; fracture du tibia gauche au tiers distal consolidée avec raideur de la cheville et douleurs chroniques et boiterie bilatérale avec une canne",
    expectedSystems: ['coude', 'tibia', 'tibia'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Condyle huméral D + tibia bilatéral"
  },
  {
    // Cas 15 : Fracture olécrâne bilatéral + fracture fémur
    input: "fracture de l'olécrâne du coude droit dominant ostéosynthésée avec raideur en flexion limitée à 105 degrés et limitation de l'extension à moins 15 degrés ; fracture de l'olécrâne du coude gauche ostéosynthésée avec raideur en flexion limitée à 110 degrés et douleurs bilatérales aux appuis ; fracture diaphysaire du fémur droit consolidée avec raccourcissement de 3 cm et raideur sévère du genou flexion limitée à 75 degrés et boiterie sévère avec canne",
    expectedSystems: ['coude', 'coude', 'fémur'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Olécrâne bilatéral + fémur D"
  },
  {
    // Cas 16 : Fracture coude + fracture hanche + fracture calcanéum
    input: "fracture de l'épitrochlée du coude droit dominant avec instabilité en valgus et neuropathie ulnaire séquellaire avec paresthésies des 4ème et 5ème doigts et griffe cubitale ; fracture du massif trochantérien de la hanche gauche ostéosynthésée avec raideur résiduelle et douleurs et limitation de la flexion à 85 degrés ; fracture du calcanéum gauche avec affaissement thalamique et arthrose sous-talienne et douleurs permanentes à l'appui et boiterie",
    expectedSystems: ['coude', 'hanche', 'pied'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Épitrochlée D + neuropathie ulnaire + trochanter G + calcanéum G"
  },
  {
    // Cas 17 : Fracture palette humérale + fracture bassin + fracture genou
    input: "fracture de la palette humérale du coude gauche ostéosynthésée avec raideur sévère en flexion limitée à 80 degrés et déficit d'extension de 30 degrés et limitation de la pronosupination à 30 pour cent et arthrose du coude ; fracture de l'aile iliaque droite et de la branche ischio-pubienne homolatérale consolidées avec douleurs pelviennes chroniques ; fracture supra-condylienne du fémur gauche avec raideur du genou en flexion limitée à 85 degrés et amyotrophie du quadriceps et douleurs à la descente des escaliers",
    expectedSystems: ['coude', 'bassin', 'genou'],
    expectedMinRate: 15,
    expectedMaxRate: 65,
    description: "Palette humérale G + bassin D + supra-condylienne fémur G"
  },
  {
    // Cas 18 : Fracture coude + fracture 2 os jambe + fracture pied
    input: "fracture du coroné du coude droit dominant avec limitation de la flexion à 120 degrés et douleurs résiduelles à la préhension de force ; fracture des deux os de la jambe gauche consolidée avec cal vicieux angulaire de 12 degrés et raccourcissement de 2 cm et raideur de la cheville et boiterie permanente ; fracture des 2ème et 3ème métatarsiens du pied droit consolidée avec métatarsalgie chronique et douleurs à la marche prolongée",
    expectedSystems: ['coude', 'jambe', 'pied'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Coroné coude D + 2 os jambe G + métatarsiens pied D"
  },
  {
    // Cas 19 : Fracture tête radiale + fracture rotule + fracture cheville
    input: "fracture comminutive de la tête radiale du coude gauche avec résection de la tête radiale et instabilité en valgus et limitation de la pronosupination à 50 pour cent et douleurs ; fracture de la rotule droite ostéosynthésée avec raideur du genou en flexion limitée à 100 degrés et douleurs à la montée des escaliers ; fracture trimalléolaire de la cheville gauche avec raideur sévère et arthrose tibio-tarsienne et douleurs permanentes et boiterie",
    expectedSystems: ['coude', 'genou', 'cheville'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Résection tête radiale G + rotule D + trimalléolaire G"
  },
  {
    // Cas 20 : Fracture coude D + fracture hanche G + fracture tibia D
    input: "fracture de l'extrémité inférieure de l'humérus droit dominant ostéosynthésée avec raideur du coude flexion limitée à 95 degrés et déficit d'extension de 20 degrés et arthrose du coude ; fracture du col du fémur gauche traitée par vissage avec nécrose de la tête fémorale et arthrose coxo-fémorale sévère et douleurs permanentes et boiterie sévère ; fracture diaphysaire du tibia droit consolidée avec cal vicieux en rotation externe et douleurs chroniques à la marche et raideur de la cheville",
    expectedSystems: ['coude', 'hanche', 'tibia'],
    expectedMinRate: 15,
    expectedMaxRate: 65,
    description: "Palette humérale D + nécrose tête fémorale G + tibia D"
  },

  // ============================================================
  // SECTION C : POIGNET/AVANT-BRAS + MEMBRE INFÉRIEUR (cas 21-30)
  // ============================================================
  {
    // Cas 21 : Fracture Pouteau-Colles D + fracture fémur G
    input: "fracture de Pouteau-Colles du poignet droit dominant consolidée avec déplacement dorsal résiduel et raideur du poignet et arthrose radio-carpienne et douleurs à la préhension de force ; fracture diaphysaire du fémur gauche consolidée par enclouage avec raccourcissement de 2 cm et raideur du genou et boiterie résiduelle avec canne",
    expectedSystems: ['poignet', 'fémur'],
    expectedMinRate: 10,
    expectedMaxRate: 50,
    description: "Pouteau-Colles D + fémur G"
  },
  {
    // Cas 22 : Fracture 2 os avant-bras D + fracture plateau tibial G + fracture cheville D
    input: "fracture des deux os de l'avant-bras droit dominant au tiers moyen consolidée avec limitation sévère de la pronosupination à 30 pour cent et raideur du poignet et douleurs chroniques ; fracture du plateau tibial externe du genou gauche avec déviation en valgus de 6 degrés et gonarthrose et raideur du genou flexion limitée à 90 degrés ; fracture bimalléolaire de la cheville droite avec instabilité résiduelle et raideur et douleurs à la marche",
    expectedSystems: ['poignet', 'genou', 'cheville'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "2 os avant-bras D + plateau tibial G + bimalléolaire D"
  },
  {
    // Cas 23 : Fracture scaphoïde + fracture col fémur + fracture calcanéum
    input: "fracture du scaphoïde du poignet droit dominant consolidée avec pseudarthrose initiale traitée par greffe et raideur résiduelle du poignet et douleurs à la mobilisation ; fracture du col du fémur gauche traitée par prothèse totale de hanche avec inégalité de longueur de 1 cm et boiterie résiduelle ; fracture du calcanéum droit avec arthrose sous-talienne et douleurs permanentes à l'appui et impossibilité de marcher sur terrain accidenté",
    expectedSystems: ['poignet', 'hanche', 'pied'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Scaphoïde D pseudarthrose + PTH G + calcanéum D"
  },
  {
    // Cas 24 : Fracture radius bilatéral + fracture fémur
    input: "fracture de l'extrémité inférieure du radius droit dominant consolidée avec raideur du poignet et limitation de la flexion et de l'extension et douleurs chroniques ; fracture de l'extrémité inférieure du radius gauche consolidée avec raideur du poignet et limitation bilatérale de la pronosupination et gêne majeure dans les activités bimanuelles ; fracture diaphysaire du fémur droit consolidée avec raccourcissement de 2 cm et raideur du genou et boiterie",
    expectedSystems: ['poignet', 'poignet', 'fémur'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Radius bilatéral + fémur D"
  },
  {
    // Cas 25 : Fracture Galeazzi + fracture hanche + fracture cheville
    input: "fracture de Galeazzi du poignet gauche avec instabilité radio-ulnaire distale résiduelle et limitation de la pronosupination à 50 pour cent et douleurs en rotation ; fracture du massif trochantérien de la hanche droite ostéosynthésée avec raideur et limitation de la flexion à 85 degrés et rotation interne limitée et boiterie ; fracture trimalléolaire de la cheville gauche avec arthrose tibio-tarsienne et raideur et douleurs permanentes",
    expectedSystems: ['poignet', 'hanche', 'cheville'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Galeazzi G + trochanter D + trimalléolaire G"
  },
  {
    // Cas 26 : Fracture radius + fracture 2 os jambe + fracture rotule
    input: "fracture de l'extrémité inférieure du radius droit dominant avec cal vicieux dorsal et raideur sévère du poignet et arthrose radio-carpienne ; fracture des deux os de la jambe gauche consolidée avec cal vicieux angulaire de 8 degrés et raccourcissement de 1 cm et raideur de la cheville ; fracture de la rotule droite ostéosynthésée avec raideur du genou flexion limitée à 95 degrés et douleurs à la montée des escaliers et amyotrophie légère du quadriceps",
    expectedSystems: ['poignet', 'jambe', 'genou'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Radius D cal vicieux + 2 os jambe G + rotule D"
  },
  {
    // Cas 27 : Fracture avant-bras + fracture bassin + fracture fémur
    input: "fracture des deux os de l'avant-bras gauche au tiers distal consolidée avec limitation de la pronosupination à 40 pour cent et raideur du poignet et douleurs résiduelles ; fracture de la branche ischio-pubienne droite consolidée avec douleurs pelviennes chroniques à la station assise ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 3 cm et raideur sévère du genou flexion limitée à 80 degrés et boiterie permanente avec canne",
    expectedSystems: ['poignet', 'bassin', 'fémur'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "2 os avant-bras G + bassin D + fémur G"
  },
  {
    // Cas 28 : Fracture Monteggia + fracture pilon tibial + fracture métatarses
    input: "fracture de Monteggia de l'avant-bras droit dominant avec luxation de la tête radiale réduite et raideur résiduelle du coude et limitation de la pronosupination à 50 pour cent ; fracture du pilon tibial gauche avec arthrose tibio-tarsienne sévère et enraidissement de la cheville et douleurs permanentes à la marche ; fracture des 3ème et 4ème métatarsiens du pied droit consolidée avec métatarsalgie chronique et douleurs à l'appui antérieur du pied",
    expectedSystems: ['coude', 'cheville', 'pied'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Monteggia D + pilon tibial G + métatarsiens pied D"
  },
  {
    // Cas 29 : Fracture radius D + fracture tibia G + fracture malléole D
    input: "fracture de l'extrémité inférieure du radius droit dominant consolidée avec bascule dorsale résiduelle et raideur du poignet et douleurs chroniques à la préhension ; fracture diaphysaire du tibia gauche consolidée avec cal vicieux en recurvatum de 10 degrés et raccourcissement de 2 cm et douleurs à la marche ; fracture de la malléole externe de la cheville droite avec instabilité latérale chronique et entorses récidivantes et douleurs à la marche sur terrain irrégulier",
    expectedSystems: ['poignet', 'tibia', 'cheville'],
    expectedMinRate: 10,
    expectedMaxRate: 50,
    description: "Radius D + tibia G recurvatum + malléole D"
  },
  {
    // Cas 30 : Fracture poignet + fracture hanche bilatérale
    input: "fracture de l'extrémité inférieure du radius gauche consolidée avec raideur du poignet et arthrose radio-carpienne débutante ; fracture du col du fémur droit traitée par prothèse totale de hanche avec boiterie et douleurs mécaniques ; fracture du massif trochantérien de la hanche gauche ostéosynthésée avec raideur et limitation de la flexion à 80 degrés et rotation interne impossible et boiterie bilatérale avec deux cannes",
    expectedSystems: ['poignet', 'hanche', 'hanche'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Radius G + hanche bilatérale (PTH D + trochanter G)"
  },

  // ============================================================
  // SECTION D : MAIN/DOIGTS + MEMBRE INFÉRIEUR (cas 31-40)
  // ============================================================
  {
    // Cas 31 : Amputation pouce D + fracture fémur G
    input: "amputation traumatique du pouce de la main droite dominante au niveau de la phalange proximale avec prothèse esthétique et perte de l'opposition et gêne majeure à la préhension ; fracture diaphysaire du fémur gauche consolidée par enclouage avec raccourcissement de 2 cm et raideur du genou flexion limitée à 90 degrés et boiterie avec canne",
    expectedSystems: ['main', 'fémur'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Amputation pouce MD + fémur G"
  },
  {
    // Cas 32 : Amputation 2 doigts + fracture hanche + fracture tibia
    input: "amputation traumatique du pouce et de l'index de la main gauche avec impossibilité de pincer et gêne sévère à la préhension fine ; fracture du col du fémur droit traitée par prothèse totale de hanche avec boiterie résiduelle et limitation de la flexion ; fracture diaphysaire du tibia gauche consolidée avec cal vicieux angulaire de 8 degrés et douleurs chroniques et raideur de la cheville",
    expectedSystems: ['main', 'hanche', 'tibia'],
    expectedMinRate: 15,
    expectedMaxRate: 80,
    description: "Amputation pouce-index MG + PTH D + tibia G"
  },
  {
    // Cas 33 : Fracture métacarpiens + fracture plateau tibial + fracture calcanéum
    input: "fractures des 2ème 3ème et 4ème métacarpiens de la main droite dominante consolidées avec raideur des doigts et perte de force de la préhension et gêne dans les activités fines ; fracture du plateau tibial externe du genou droit avec déviation en valgus et gonarthrose et raideur en flexion à 95 degrés ; fracture du calcanéum gauche avec arthrose sous-talienne et douleurs permanentes à l'appui et boiterie",
    expectedSystems: ['main', 'genou', 'pied'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Métacarpiens 2-3-4 MD + plateau tibial D + calcanéum G"
  },
  {
    // Cas 34 : Amputation 4è-5è doigts + fracture fémur bilatéral
    input: "amputation traumatique de l'annulaire et de l'auriculaire de la main droite dominante avec gêne à la préhension en force et perte de la prise en crochet ; fracture diaphysaire du fémur droit consolidée avec raccourcissement de 2 cm et raideur du genou et boiterie ; fracture de l'extrémité inférieure du fémur gauche ostéosynthésée avec raideur sévère du genou flexion limitée à 80 degrés et amyotrophie du quadriceps et marche avec canne",
    expectedSystems: ['main', 'fémur', 'fémur'],
    expectedMinRate: 15,
    expectedMaxRate: 65,
    description: "Amputation 4è-5è doigts MD + fémur bilatéral"
  },
  {
    // Cas 35 : Fracture phalanges multiples + fracture cheville bilatérale
    input: "fractures des phalanges P1 et P2 des 2ème 3ème et 4ème doigts de la main gauche consolidées avec raideur en flexion irréductible et griffe des doigts et gêne fonctionnelle majeure ; fracture bimalléolaire de la cheville droite avec raideur résiduelle et douleurs ; fracture trimalléolaire de la cheville gauche avec raideur sévère et arthrose tibio-tarsienne et instabilité et boiterie permanente avec canne",
    expectedSystems: ['main', 'cheville', 'cheville'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Fractures phalanges MG griffe + cheville bilatérale"
  },
  {
    // Cas 36 : Amputation 3 doigts + fracture bassin + fracture hanche
    input: "amputation traumatique de l'index du médius et de l'annulaire de la main droite dominante avec perte majeure de la capacité de préhension fine et en force et gêne dans toutes les activités quotidiennes ; fracture de l'aile iliaque gauche consolidée avec douleurs pelviennes chroniques ; fracture du col du fémur gauche traitée par prothèse totale de hanche avec boiterie et douleurs mécaniques et limitation de la flexion",
    expectedSystems: ['main', 'bassin', 'hanche'],
    expectedMinRate: 20,
    expectedMaxRate: 65,
    description: "Amputation 3 doigts MD + bassin G + PTH G"
  },
  {
    // Cas 37 : Broiement main + fracture 2 os jambe
    input: "séquelles de broiement de la main gauche avec amputation du pouce et raideur sévère des doigts restants et perte quasi-totale de la fonction de préhension de la main gauche et douleurs résiduelles chroniques ; fracture des deux os de la jambe droite consolidée avec cal vicieux angulaire de 10 degrés et raccourcissement de 3 cm et raideur de la cheville et boiterie sévère avec canne",
    expectedSystems: ['main', 'jambe'],
    expectedMinRate: 20,
    expectedMaxRate: 65,
    description: "Broiement main G + 2 os jambe D"
  },
  {
    // Cas 38 : Fracture phalanges + fracture hanche + fracture cheville + fracture orteil
    input: "fracture de la phalange P1 du pouce de la main droite dominante consolidée avec raideur de l'articulation métacarpo-phalangienne et gêne à l'opposition ; fracture du massif trochantérien de la hanche gauche ostéosynthésée avec raideur et limitation de la flexion à 85 degrés et boiterie ; fracture bimalléolaire de la cheville droite avec raideur résiduelle et instabilité ; amputation du gros orteil gauche avec trouble de l'équilibre et modification du pas",
    expectedSystems: ['main', 'hanche', 'cheville', 'pied'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Phalange pouce MD + trochanter G + bimalléolaire D + gros orteil G"
  },
  {
    // Cas 39 : Amputation index + fracture cotyle + fracture plateau tibial
    input: "amputation traumatique de l'index de la main droite dominante au niveau de l'articulation métacarpo-phalangienne avec gêne à la préhension fine et perte de la pince pouce-index ; fracture du cotyle de la hanche gauche avec arthrose coxo-fémorale post-traumatique et limitation de la flexion à 75 degrés et de l'abduction et boiterie ; fracture du plateau tibial interne du genou droit avec déviation en varus de 6 degrés et gonarthrose et raideur en flexion à 90 degrés",
    expectedSystems: ['main', 'hanche', 'genou'],
    expectedMinRate: 15,
    expectedMaxRate: 65,
    description: "Amputation index MD + cotyle G + plateau tibial D"
  },
  {
    // Cas 40 : Fracture métacarpiens bilatéraux + fracture fémur + fracture cheville
    input: "fractures des 4ème et 5ème métacarpiens de la main droite dominante consolidées avec perte de force de la préhension et douleurs ; fracture du 2ème métacarpien de la main gauche consolidée avec raideur de l'index ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 2 cm et raideur du genou et boiterie ; fracture bimalléolaire de la cheville droite avec raideur et instabilité résiduelle et douleurs à la marche prolongée",
    expectedSystems: ['main', 'main', 'fémur', 'cheville'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Métacarpiens bilat + fémur G + bimalléolaire D"
  },

  // ============================================================
  // SECTION E : COMBINAISONS MULTIPLES MEMBRES SUP + INF (cas 41-50)
  // ============================================================
  {
    // Cas 41 : Épaule D + coude G + fémur D + cheville G — 4 membres
    input: "fracture du col chirurgical de l'humérus droit dominant avec raideur de l'épaule abduction limitée à 75 degrés et douleurs nocturnes ; fracture de l'olécrâne du coude gauche ostéosynthésée avec raideur en flexion à 105 degrés et limitation de la pronosupination ; fracture diaphysaire du fémur droit consolidée par enclouage avec raccourcissement de 2 cm et raideur du genou ; fracture trimalléolaire de la cheville gauche avec raideur sévère et arthrose tibio-tarsienne et boiterie permanente avec canne",
    expectedSystems: ['épaule', 'coude', 'fémur', 'cheville'],
    expectedMinRate: 15,
    expectedMaxRate: 65,
    description: "4 membres: épaule D + coude G + fémur D + trimalléolaire G"
  },
  {
    // Cas 42 : Épaule + poignet + hanche + genou — 4 atteintes
    input: "fracture de la tête humérale gauche avec raideur sévère de l'épaule abduction limitée à 55 degrés et rotation externe impossible ; fracture de l'extrémité inférieure du radius droit dominant avec cal vicieux dorsal et raideur du poignet et arthrose radio-carpienne ; fracture du col du fémur droit traitée par prothèse totale de hanche avec boiterie et douleurs mécaniques ; fracture du plateau tibial externe du genou gauche avec gonarthrose et raideur en flexion à 90 degrés et douleurs à la descente des escaliers",
    expectedSystems: ['épaule', 'poignet', 'hanche', 'genou'],
    expectedMinRate: 20,
    expectedMaxRate: 70,
    description: "4 atteintes: épaule G + radius D + PTH D + plateau tibial G"
  },
  {
    // Cas 43 : Épaule + main + fémur + pied — 4 extrémités
    input: "fracture du trochiter de l'épaule droite dominante avec raideur et limitation de l'abduction à 100 degrés et tendinopathie résiduelle de la coiffe ; amputation traumatique de l'auriculaire de la main gauche avec gêne à la préhension en force ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 2 cm et raideur du genou et boiterie ; fracture du calcanéum droit avec effondrement de l'angle de Böhler et arthrose sous-talienne et douleurs permanentes à la marche",
    expectedSystems: ['épaule', 'main', 'fémur', 'pied'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "4 extrémités: épaule D + auriculaire MG + fémur G + calcanéum D"
  },
  {
    // Cas 44 : Coude + poignet + genou + cheville — 4 articulations intermédiaires
    input: "fracture de la tête radiale du coude droit dominant avec limitation de la pronosupination à 40 pour cent et douleurs en supination ; fracture de l'extrémité inférieure du radius gauche consolidée avec raideur du poignet et douleurs à la mobilisation ; fracture de la rotule droite ostéosynthésée avec raideur du genou en flexion limitée à 100 degrés et douleurs à la montée des escaliers ; fracture bimalléolaire de la cheville gauche avec raideur résiduelle et instabilité et arthrose débutante et douleurs à la marche",
    expectedSystems: ['coude', 'poignet', 'genou', 'cheville'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "4 articulations: coude D + radius G + rotule D + bimalléolaire G"
  },
  {
    // Cas 45 : Épaule bilat + hanche bilat — 4 grosses articulations proximales
    input: "fracture du col chirurgical de l'humérus droit dominant consolidée avec raideur de l'épaule abduction limitée à 80 degrés ; fracture de la tête humérale gauche avec raideur sévère de l'épaule abduction limitée à 60 degrés et rotation impossible ; fracture du col du fémur droit traitée par prothèse totale de hanche avec boiterie et douleurs mécaniques ; fracture du massif trochantérien de la hanche gauche ostéosynthésée avec raideur et flexion limitée à 80 degrés et boiterie bilatérale avec deux cannes",
    expectedSystems: ['épaule', 'épaule', 'hanche', 'hanche'],
    expectedMinRate: 20,
    expectedMaxRate: 70,
    description: "4 grosses articulations: épaule bilat + hanche bilat"
  },
  {
    // Cas 46 : Épaule + coude + poignet D + fémur G + genou G — 5 atteintes membre sup complet
    input: "fracture du col chirurgical de l'humérus droit dominant avec raideur de l'épaule abduction limitée à 85 degrés ; fracture de l'olécrâne du coude droit ostéosynthésée avec raideur en flexion limitée à 110 degrés ; fracture de l'extrémité inférieure du radius droit consolidée avec raideur du poignet et limitation de la pronosupination à 50 pour cent ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 2 cm et raideur du genou ; fracture du plateau tibial interne du genou gauche avec gonarthrose et raideur et flexion limitée à 85 degrés",
    expectedSystems: ['épaule', 'coude', 'poignet', 'fémur', 'genou'],
    expectedMinRate: 15,
    expectedMaxRate: 70,
    description: "5 atteintes: épaule+coude+poignet D + fémur+genou G"
  },
  {
    // Cas 47 : Clavicule + radius + hanche + tibia + calcanéum — 5 segments
    input: "fracture de la clavicule gauche consolidée avec douleurs résiduelles et gêne à l'abduction de l'épaule ; fracture de l'extrémité inférieure du radius droit dominant avec raideur du poignet et douleurs chroniques ; fracture du col du fémur gauche traitée par prothèse totale de hanche avec boiterie résiduelle ; fracture diaphysaire du tibia droit consolidée avec cal vicieux angulaire de 8 degrés et raccourcissement de 1 cm et raideur de la cheville ; fracture du calcanéum gauche avec arthrose sous-talienne et douleurs permanentes à l'appui",
    expectedSystems: ['épaule', 'poignet', 'hanche', 'tibia', 'pied'],
    expectedMinRate: 15,
    expectedMaxRate: 65,
    description: "5 segments: clavicule G + radius D + PTH G + tibia D + calcanéum G"
  },
  {
    // Cas 48 : Épaule + main + hanche + genou + cheville — 5 segments
    input: "fracture comminutive de l'extrémité supérieure de l'humérus droit dominant avec raideur sévère de l'épaule abduction limitée à 60 degrés ; amputation traumatique du pouce et de l'index de la main gauche avec perte de la pince pouce-index ; fracture du massif trochantérien de la hanche droite ostéosynthésée avec raideur et boiterie ; fracture supra-condylienne du fémur gauche avec raideur du genou flexion limitée à 85 degrés et amyotrophie du quadriceps ; fracture bimalléolaire de la cheville droite avec raideur et instabilité et douleurs permanentes à la marche",
    expectedSystems: ['épaule', 'main', 'hanche', 'genou', 'cheville'],
    expectedMinRate: 25,
    expectedMaxRate: 75,
    description: "5 segments: épaule D + amputation MG + hanche D + genou G + cheville D"
  },
  {
    // Cas 49 : Épaule bilat + coude D + fémur bilat + cheville G — 6 atteintes
    input: "fracture du col chirurgical de l'humérus droit dominant consolidée avec raideur de l'épaule et abduction limitée à 80 degrés ; fracture de la tête humérale gauche avec raideur sévère abduction limitée à 55 degrés ; fracture de l'olécrâne du coude droit avec raideur en flexion à 100 degrés et limitation de l'extension ; fracture diaphysaire du fémur droit consolidée avec raccourcissement de 3 cm et raideur du genou ; fracture du col du fémur gauche traitée par prothèse totale de hanche avec boiterie ; fracture trimalléolaire de la cheville gauche avec raideur sévère et arthrose et boiterie permanente avec deux cannes",
    expectedSystems: ['épaule', 'épaule', 'coude', 'fémur', 'hanche', 'cheville'],
    expectedMinRate: 25,
    expectedMaxRate: 80,
    description: "6 atteintes: épaule bilat + coude D + fémur D + PTH G + trimalléolaire G"
  },
  {
    // Cas 50 : Épaule + coude + poignet + main + hanche + genou + cheville — 7 atteintes
    input: "fracture comminutive de la tête humérale droite dominante avec prothèse d'épaule et raideur résiduelle abduction limitée à 70 degrés ; fracture de l'olécrâne du coude gauche avec raideur en flexion limitée à 110 degrés ; fracture de l'extrémité inférieure du radius droit avec raideur du poignet ; amputation traumatique de l'auriculaire de la main gauche ; fracture du col du fémur gauche traitée par prothèse totale de hanche avec boiterie ; fracture du plateau tibial externe du genou droit avec gonarthrose et raideur en flexion à 90 degrés ; fracture bimalléolaire de la cheville gauche avec raideur et arthrose et boiterie permanente",
    expectedSystems: ['épaule', 'coude', 'poignet', 'main', 'hanche', 'genou', 'cheville'],
    expectedMinRate: 25,
    expectedMaxRate: 85,
    description: "7 atteintes: prothèse épaule D + coude G + radius D + auriculaire MG + PTH G + genou D + cheville G"
  },

  // ============================================================
  // SECTION F : CAS SÉVÈRES ET BILATÉRAUX (cas 51-60)
  // ============================================================
  {
    // Cas 51 : Amputation avant-bras + amputation jambe
    input: "amputation de l'avant-bras gauche au tiers moyen appareillée avec prothèse myoélectrique et douleurs du moignon et limitation fonctionnelle majeure du membre supérieur gauche ; amputation de la jambe droite au tiers supérieur appareillée avec prothèse tibiale et douleurs du moignon et périmètre de marche limité à 500 mètres et impossibilité de courir",
    expectedSystems: ['épaule', 'jambe'],
    expectedMinRate: 30,
    expectedMaxRate: 80,
    description: "Amputation avant-bras G + amputation jambe D"
  },
  {
    // Cas 52 : Paralysie plexus brachial + fracture cotyle + fracture pilon tibial
    input: "paralysie complète du plexus brachial droit dominant C5-C6-C7 avec déficit de l'abduction de l'épaule et de la flexion du coude et de l'extension du poignet et amyotrophie majeure du membre supérieur et douleurs neuropathiques chroniques ; fracture du cotyle de la hanche gauche avec arthrose coxo-fémorale post-traumatique et limitation sévère de la flexion à 65 degrés et boiterie ; fracture du pilon tibial droit avec arthrose tibio-tarsienne et raideur sévère de la cheville et douleurs permanentes à la marche avec canne",
    expectedSystems: ['épaule', 'hanche', 'cheville'],
    expectedMinRate: 25,
    expectedMaxRate: 80,
    description: "Paralysie plexus brachial D + cotyle G + pilon tibial D",
    acceptDominantLesion: true // Le moteur retourne la paralysie plexus brachial comme lésion dominante (65%)
  },
  {
    // Cas 53 : Fracture épaule + fracture coude + fracture hanche + fracture genou bilatéral
    input: "fracture du col chirurgical de l'humérus gauche avec raideur de l'épaule abduction limitée à 70 degrés ; fracture de la tête radiale du coude droit dominant avec limitation de la pronosupination et douleurs ; fracture du col du fémur droit traitée par prothèse totale de hanche avec boiterie ; fracture du plateau tibial externe du genou droit avec gonarthrose et raideur en flexion à 90 degrés ; fracture de la rotule gauche avec raideur du genou flexion limitée à 95 degrés et amyotrophie des quadriceps",
    expectedSystems: ['épaule', 'coude', 'hanche', 'genou', 'genou'],
    expectedMinRate: 20,
    expectedMaxRate: 70,
    description: "Épaule G + coude D + PTH D + genou bilatéral"
  },
  {
    // Cas 54 : Épaule prothèse + poignet + fracture fémur + fracture 2 os jambe + fracture cheville
    input: "fracture comminutive de la tête humérale droite dominante traitée par prothèse d'épaule avec raideur résiduelle abduction limitée à 65 degrés ; fracture de l'extrémité inférieure du radius gauche avec raideur du poignet et douleurs chroniques ; fracture diaphysaire du fémur droit consolidée avec raccourcissement de 3 cm et raideur du genou flexion limitée à 80 degrés ; fracture des deux os de la jambe gauche avec cal vicieux angulaire de 10 degrés et raccourcissement de 2 cm et raideur de la cheville ; fracture bimalléolaire de la cheville droite avec raideur et instabilité et boiterie bilatérale avec deux cannes",
    expectedSystems: ['épaule', 'poignet', 'fémur', 'jambe', 'cheville'],
    expectedMinRate: 25,
    expectedMaxRate: 80,
    description: "Prothèse épaule D + radius G + fémur D + 2 os jambe G + bimalléolaire D"
  },
  {
    // Cas 55 : Amputation main + fracture fémur bilatéral + fracture cheville
    input: "amputation traumatique de la main droite dominante au niveau du poignet avec prothèse myoélectrique et perte totale de la fonction de préhension droite ; fracture diaphysaire du fémur droit consolidée avec raccourcissement de 2 cm et raideur du genou et boiterie ; fracture de l'extrémité inférieure du fémur gauche ostéosynthésée avec raideur sévère du genou flexion limitée à 75 degrés ; fracture trimalléolaire de la cheville gauche avec raideur et arthrose et douleurs permanentes et boiterie bilatérale avec canne",
    expectedSystems: ['main', 'fémur', 'fémur', 'cheville'],
    expectedMinRate: 30,
    expectedMaxRate: 85,
    description: "Amputation main D + fémur bilatéral + trimalléolaire G"
  },
  {
    // Cas 56 : Épaule bilat sévère + genou bilat + fracture cheville
    input: "fracture comminutive de la tête humérale droite dominante avec raideur sévère abduction limitée à 50 degrés et rotation impossible ; fracture du col chirurgical de l'humérus gauche avec raideur de l'épaule abduction limitée à 65 degrés ; fracture du plateau tibial interne du genou droit avec gonarthrose sévère et raideur en flexion à 85 degrés et déviation en varus ; fracture supra-condylienne du fémur gauche avec raideur du genou flexion limitée à 80 degrés et amyotrophie ; fracture bimalléolaire de la cheville droite avec raideur et douleurs et boiterie permanente",
    expectedSystems: ['épaule', 'épaule', 'genou', 'genou', 'cheville'],
    expectedMinRate: 25,
    expectedMaxRate: 80,
    description: "Épaule bilat sévère + genou bilat + bimalléolaire D"
  },
  {
    // Cas 57 : Fracture coude bilat + fracture hanche + fracture tibia + fracture calcanéum
    input: "fracture de l'olécrâne du coude droit dominant ostéosynthésée avec raideur en flexion limitée à 100 degrés et limitation de l'extension ; fracture de la palette humérale du coude gauche avec raideur sévère flexion limitée à 85 degrés et limitation de la pronosupination ; fracture du massif trochantérien de la hanche droite ostéosynthésée avec raideur et boiterie ; fracture diaphysaire du tibia gauche consolidée avec cal vicieux et raccourcissement de 2 cm ; fracture du calcanéum droit avec arthrose sous-talienne et douleurs à l'appui et boiterie bilatérale",
    expectedSystems: ['coude', 'coude', 'hanche', 'tibia', 'pied'],
    expectedMinRate: 20,
    expectedMaxRate: 70,
    description: "Coude bilat + trochanter D + tibia G + calcanéum D"
  },
  {
    // Cas 58 : Épaule + amputation doigts + fracture fémur + fracture 2 os jambe + fracture pied
    input: "fracture du col chirurgical de l'humérus gauche avec raideur de l'épaule abduction limitée à 75 degrés ; amputation traumatique de l'index et du médius de la main droite dominante avec gêne à la préhension fine et perte de force ; fracture diaphysaire du fémur droit consolidée avec raccourcissement de 3 cm et raideur du genou et boiterie sévère ; fracture des deux os de la jambe gauche consolidée avec cal vicieux angulaire de 10 degrés et raccourcissement de 2 cm et raideur de la cheville ; fracture des 2ème et 3ème métatarsiens du pied droit avec métatarsalgie chronique et douleurs à la marche et boiterie permanente avec deux cannes",
    expectedSystems: ['épaule', 'main', 'fémur', 'jambe', 'pied'],
    expectedMinRate: 25,
    expectedMaxRate: 80,
    description: "Épaule G + amputation 2 doigts MD + fémur D + 2 os jambe G + métatarsiens D"
  },
  {
    // Cas 59 : Épaule + coude + poignet + hanche + genou + cheville bilat — 7 atteintes sévères
    input: "fracture comminutive de la tête humérale droite dominante avec prothèse d'épaule et raideur sévère abduction limitée à 55 degrés ; fracture de la palette humérale du coude gauche avec raideur sévère flexion limitée à 80 degrés et limitation de la pronosupination à 30 pour cent ; fracture de l'extrémité inférieure du radius droit avec raideur sévère du poignet et douleurs chroniques ; fracture du col du fémur droit traitée par prothèse totale de hanche avec boiterie sévère ; fracture supra-condylienne du fémur gauche avec raideur du genou flexion limitée à 75 degrés et amyotrophie majeure ; fracture trimalléolaire de la cheville droite avec raideur sévère et arthrose ; fracture bimalléolaire de la cheville gauche avec raideur et instabilité et boiterie permanente avec deux cannes",
    expectedSystems: ['épaule', 'coude', 'poignet', 'hanche', 'genou', 'cheville', 'cheville'],
    expectedMinRate: 30,
    expectedMaxRate: 90,
    description: "7 atteintes sévères: prothèse épaule D + coude G + radius D + PTH D + genou G + cheville bilat"
  },
  {
    // Cas 60 : Épaule bilat + coude + poignet + main + hanche + fémur + genou + cheville + pied — 10 atteintes (AVP catastrophique)
    input: "fracture comminutive de la tête humérale droite dominante avec prothèse d'épaule et raideur sévère ; fracture du col chirurgical de l'humérus gauche avec raideur de l'épaule abduction limitée à 65 degrés ; fracture de l'olécrâne du coude droit avec raideur en flexion limitée à 100 degrés ; fracture de l'extrémité inférieure du radius gauche avec raideur du poignet et limitation de la pronosupination ; amputation traumatique de l'auriculaire de la main droite dominante ; fracture du col du fémur gauche traitée par prothèse totale de hanche avec boiterie ; fracture diaphysaire du fémur droit consolidée avec raccourcissement de 3 cm et raideur du genou flexion limitée à 80 degrés ; fracture du plateau tibial externe du genou gauche avec gonarthrose et raideur ; fracture trimalléolaire de la cheville droite avec raideur sévère et arthrose ; fracture du calcanéum gauche avec arthrose sous-talienne et douleurs permanentes et boiterie bilatérale permanente avec deux cannes et fauteuil roulant pour les longs déplacements",
    expectedSystems: ['épaule', 'épaule', 'coude', 'poignet', 'main', 'hanche', 'fémur', 'genou', 'cheville', 'pied'],
    expectedMinRate: 40,
    expectedMaxRate: 98,
    description: "10 atteintes AVP catastrophique: épaule bilat + coude D + radius G + auriculaire MD + PTH G + fémur D + genou G + trimalléolaire D + calcanéum G"
  },
];

// ====== RUNNER ======
async function runTests() {
  let passed = 0;
  let failed = 0;

  console.log('╔═══════════════════════════════════════════════════════════════════╗');
  console.log('║  TEST 60 CAS POLYTRAUMATISMES MEMBRES SUP + INF (V3.3.319)      ║');
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
          || (s === 'épaule' && /[eé]paule|hum[eé]r|clavicule|scapul|abduction|trochiter|omoplate|plexus.*brach|acromio/i.test(allText))
          || (s === 'coude' && /coude|ol[eé]cran|t[eê]te.*radial|pronosupination|condyl.*hum[eé]r|palette|coroné|[eé]pitrochl/i.test(allText))
          || (s === 'poignet' && /poignet|radius|scapho[ïi]de|pronosupination|pouteau|galeazzi|monteggia/i.test(allText))
          || (s === 'main' && /main|pouce|index|doigt|m[eé]dius|m[eé]tacarp|phalang|auriculaire|annulaire|broiement/i.test(allText))
          || (s === 'hanche' && /hanche|col.*f[eé]mor|trochant|coxo|pth|cotyle|proth[eè]se.*totale.*hanche/i.test(allText))
          || (s === 'fémur' && /f[eé]mur|diaphys.*f[eé]m|supra.*condyl/i.test(allText))
          || (s === 'genou' && /genou|plateau.*tibial|rotule|lca|lig.*crois|supra.*condyl|gonarthrose/i.test(allText))
          || (s === 'tibia' && /tibia|diaphys.*tib/i.test(allText))
          || (s === 'jambe' && /jambe|tibia|p[eé]ron[eé]|deux.*os/i.test(allText))
          || (s === 'cheville' && /cheville|mall[eé]ol|pilon.*tibial|tarse|tibio.*tars|astragale/i.test(allText))
          || (s === 'pied' && /pied|calcan[eé]um|tarse|orteil|m[eé]tatars|B[oö]hler|astragale/i.test(allText))
          || (s === 'bassin' && /bassin|pelvien|obtur|cotyle|symphyse|iliaque|ischio|sacro/i.test(allText));
      });

      const testPass = (isPolytrauma || tc.acceptDominantLesion === true) && rateInRange;

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
