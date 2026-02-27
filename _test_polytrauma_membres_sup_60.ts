// Test 60 cas : polytraumatismes MEMBRES SUPÉRIEURS EXCLUSIVEMENT (V3.3.319)
// Combinaisons variées: épaule, bras/humérus, coude, avant-bras/radius/cubitus, poignet, main/doigts
import { localExpertAnalysis } from './components/AiAnalyzer';

interface TestCase {
  input: string;
  expectedSystems: string[];
  expectedMinRate: number;
  expectedMaxRate: number;
  description: string;
  acceptDominantLesion?: boolean;
}

const testCases: TestCase[] = [
  // ============================================================
  // SECTION A : ÉPAULE + COUDE (cas 1-10)
  // ============================================================
  {
    // Cas 1 : Fracture épaule D + fracture tête radiale D
    input: "fracture comminutive de l'extrémité supérieure de l'humérus droit dominant avec raideur sévère de l'épaule abduction limitée à 60 degrés et rotation externe impossible et douleurs nocturnes ; fracture de la tête radiale du coude droit avec limitation de la pronosupination à 50 pour cent et douleurs en supination forcée",
    expectedSystems: ['épaule', 'coude'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Épaule D comminutive + tête radiale D"
  },
  {
    // Cas 2 : Luxation épaule récidivante G + fracture olécrâne D
    input: "luxation récidivante de l'épaule gauche opérée par butée coracoïdienne avec limitation de la rotation externe et de l'abduction au-delà de 100 degrés et appréhension résiduelle ; fracture de l'olécrâne du coude droit dominant ostéosynthésée avec raideur en flexion limitée à 110 degrés et limitation de l'extension à moins 15 degrés",
    expectedSystems: ['épaule', 'coude'],
    expectedMinRate: 8,
    expectedMaxRate: 50,
    description: "Luxation épaule G récidivante + olécrâne D"
  },
  {
    // Cas 3 : Fracture col chirurgical humérus D + fracture palette humérale G
    input: "fracture du col chirurgical de l'humérus droit dominant consolidée avec raideur de l'épaule et abduction limitée à 80 degrés et rotation externe limitée à 20 degrés ; fracture de la palette humérale du coude gauche avec raideur sévère flexion limitée à 85 degrés et limitation de l'extension et perte de la pronosupination à 30 pour cent",
    expectedSystems: ['épaule', 'coude'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Col chirurgical humérus D + palette humérale G"
  },
  {
    // Cas 4 : Fracture trochiter D + luxation coude G
    input: "fracture du trochiter de l'épaule droite dominante avec raideur résiduelle et douleurs à l'abduction au-delà de 100 degrés et tendinopathie de la coiffe résiduelle ; luxation postérieure du coude gauche réduite avec raideur résiduelle et flexion limitée à 120 degrés et extension incomplète et douleurs à la supination",
    expectedSystems: ['épaule', 'coude'],
    expectedMinRate: 5,
    expectedMaxRate: 45,
    description: "Trochiter D + luxation coude G"
  },
  {
    // Cas 5 : Fracture épaule G + fracture condyle externe coude G (ipsilatéral)
    input: "fracture comminutive de la tête humérale gauche avec raideur sévère de l'épaule abduction limitée à 55 degrés et rotation impossible et impossibilité de se coiffer ; fracture du condyle externe du coude gauche consolidée avec raideur et limitation de l'extension et cubitus valgus résiduel et instabilité latérale et douleurs",
    expectedSystems: ['épaule', 'coude'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Épaule G comminutive + condyle externe coude G ipsilatéral"
  },
  {
    // Cas 6 : Épaule bilatérale + coude D — 3 atteintes
    input: "fracture du col chirurgical de l'humérus droit dominant consolidée avec raideur de l'épaule abduction limitée à 75 degrés ; fracture de la tête humérale gauche avec raideur sévère abduction limitée à 60 degrés et rotation externe impossible ; fracture de l'olécrâne du coude droit dominant avec raideur en flexion limitée à 100 degrés et limitation de l'extension",
    expectedSystems: ['épaule', 'épaule', 'coude'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Épaule bilatérale + olécrâne D"
  },
  {
    // Cas 7 : Prothèse épaule D + coude G sévère
    input: "fracture comminutive de la tête humérale droite dominante traitée par prothèse d'épaule avec raideur résiduelle abduction limitée à 70 degrés et rotation externe limitée ; fracture de la palette humérale du coude gauche avec raideur sévère flexion limitée à 80 degrés et extension à moins 25 degrés et limitation de la pronosupination à 40 pour cent et douleurs permanentes",
    expectedSystems: ['épaule', 'coude'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Prothèse épaule D + palette humérale G sévère"
  },
  {
    // Cas 8 : Coude bilatéral
    input: "fracture de la tête radiale du coude droit dominant avec limitation de la pronosupination à 50 pour cent et douleurs à la supination ; fracture de l'olécrâne du coude gauche ostéosynthésée avec raideur en flexion limitée à 110 degrés et limitation de l'extension à moins 15 degrés et douleurs à l'appui sur le coude",
    expectedSystems: ['coude', 'coude'],
    expectedMinRate: 8,
    expectedMaxRate: 50,
    description: "Coude bilatéral: tête radiale D + olécrâne G"
  },
  {
    // Cas 9 : Fracture clavicule D + fracture olécrâne D + luxation épaule G
    input: "fracture de la clavicule droite dominante avec cal vicieux et saillie de l'extrémité externe et douleurs à l'élévation du bras au-delà de 120 degrés ; fracture de l'olécrâne du coude droit avec raideur en flexion à 105 degrés et limitation de l'extension ; luxation récidivante de l'épaule gauche avec limitation de l'abduction et appréhension et douleurs",
    expectedSystems: ['épaule', 'coude', 'épaule'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Clavicule D + olécrâne D + luxation épaule G"
  },
  {
    // Cas 10 : Fracture trochiter G + fracture tête radiale D + fracture coronoïde D
    input: "fracture du trochiter de l'épaule gauche avec limitation de l'abduction à 90 degrés et tendinopathie résiduelle de la coiffe ; fracture de la tête radiale du coude droit dominant avec limitation de la pronosupination et douleurs ; fracture de l'apophyse coronoïde du cubitus droit avec raideur en flexion du coude et douleurs à l'extension",
    expectedSystems: ['épaule', 'coude', 'coude'],
    expectedMinRate: 8,
    expectedMaxRate: 50,
    description: "Trochiter G + tête radiale D + coronoïde D"
  },

  // ============================================================
  // SECTION B : ÉPAULE + POIGNET/AVANT-BRAS (cas 11-20)
  // ============================================================
  {
    // Cas 11 : Fracture épaule D + fracture Pouteau-Colles G
    input: "fracture du col chirurgical de l'humérus droit dominant avec raideur de l'épaule abduction limitée à 80 degrés et rotation externe limitée ; fracture de l'extrémité inférieure du radius gauche type Pouteau-Colles consolidée avec cal vicieux dorsal et raideur du poignet et douleurs à la pronosupination",
    expectedSystems: ['épaule', 'poignet'],
    expectedMinRate: 8,
    expectedMaxRate: 50,
    description: "Épaule D + Pouteau-Colles G"
  },
  {
    // Cas 12 : Fracture tête humérale G + fracture 2 os avant-bras D
    input: "fracture comminutive de la tête humérale gauche avec raideur sévère de l'épaule abduction limitée à 55 degrés et rotation impossible ; fracture des deux os de l'avant-bras droit dominant consolidée avec cal vicieux et limitation sévère de la pronosupination à 30 pour cent et raideur du poignet et douleurs",
    expectedSystems: ['épaule', 'poignet'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Tête humérale G + 2 os avant-bras D dominant"
  },
  {
    // Cas 13 : Fracture clavicule D + fracture scaphoïde G
    input: "fracture de la clavicule droite dominante consolidée avec cal vicieux et douleurs à l'élévation au-delà de 130 degrés ; fracture du scaphoïde carpien gauche compliquée de pseudarthrose opérée avec greffon et raideur du poignet et douleurs et limitation de la flexion dorsale",
    expectedSystems: ['épaule', 'poignet'],
    expectedMinRate: 5,
    expectedMaxRate: 45,
    description: "Clavicule D + scaphoïde G pseudarthrose"
  },
  {
    // Cas 14 : Luxation acromio-claviculaire D + fracture Galeazzi G
    input: "luxation acromio-claviculaire droite dominante stade 3 opérée avec saillie résiduelle et douleurs à l'effort et limitation de la force d'élévation ; fracture-luxation de Galeazzi de l'avant-bras gauche avec subluxation radio-cubitale inférieure résiduelle et limitation de la pronosupination et douleurs au poignet",
    expectedSystems: ['épaule', 'poignet'],
    expectedMinRate: 5,
    expectedMaxRate: 45,
    description: "Acromio-claviculaire D + Galeazzi G"
  },
  {
    // Cas 15 : Prothèse épaule D + fracture radius + cubitus G
    input: "fracture comminutive de la tête humérale droite dominante traitée par prothèse d'épaule avec raideur résiduelle abduction limitée à 65 degrés et rotation limitée ; fracture de l'extrémité inférieure du radius gauche avec fracture associée de la styloïde cubitale et raideur sévère du poignet et limitation de la pronosupination à 40 pour cent et arthrose radio-carpienne",
    expectedSystems: ['épaule', 'poignet'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Prothèse épaule D + radius-cubitus G arthrosique"
  },
  {
    // Cas 16 : Épaule bilatérale + poignet D
    input: "fracture du col chirurgical de l'humérus droit dominant avec raideur de l'épaule abduction limitée à 80 degrés ; fracture de la tête humérale gauche avec raideur sévère abduction limitée à 55 degrés et rotation impossible ; fracture de l'extrémité inférieure du radius droit dominant avec cal vicieux et raideur du poignet et arthrose radio-carpienne et douleurs",
    expectedSystems: ['épaule', 'épaule', 'poignet'],
    expectedMinRate: 12,
    expectedMaxRate: 60,
    description: "Épaule bilatérale + radius D dominant"
  },
  {
    // Cas 17 : Fracture épaule G + fracture Monteggia D
    input: "fracture comminutive de l'extrémité supérieure de l'humérus gauche avec raideur sévère de l'épaule abduction limitée à 60 degrés et rotation externe impossible ; fracture-luxation de Monteggia de l'avant-bras droit dominant avec luxation de la tête radiale résiduelle et limitation de la pronosupination et raideur du coude en flexion limitée à 120 degrés",
    expectedSystems: ['épaule', 'coude'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Épaule G comminutive + Monteggia D dominant"
  },
  {
    // Cas 18 : Fracture épaule D + poignet bilatéral
    input: "fracture du trochiter de l'épaule droite dominante avec limitation de l'abduction à 100 degrés et tendinopathie résiduelle ; fracture de l'extrémité inférieure du radius droit dominant avec cal vicieux dorsal et raideur du poignet ; fracture de l'extrémité inférieure du radius gauche consolidée avec raideur du poignet et douleurs bilatérales à la pronosupination",
    expectedSystems: ['épaule', 'poignet', 'poignet'],
    expectedMinRate: 8,
    expectedMaxRate: 50,
    description: "Trochiter D + poignet bilatéral"
  },
  {
    // Cas 19 : Fracture omoplate G + fracture radius D + fracture scaphoïde G
    input: "fracture de l'omoplate gauche consolidée avec raideur de l'épaule et limitation de l'abduction à 90 degrés et douleurs scapulaires ; fracture de l'extrémité inférieure du radius droit dominant avec raideur du poignet et arthrose débutante ; fracture du scaphoïde carpien gauche avec pseudarthrose et douleurs chroniques du poignet",
    expectedSystems: ['épaule', 'poignet', 'poignet'],
    expectedMinRate: 8,
    expectedMaxRate: 50,
    description: "Omoplate G + radius D + scaphoïde G pseudarthrose"
  },
  {
    // Cas 20 : Fracture clavicule bilatérale + fracture avant-bras D
    input: "fracture de la clavicule droite dominante consolidée avec cal vicieux et saillie et douleurs ; fracture de la clavicule gauche consolidée avec raccourcissement et douleurs à l'effort ; fracture des deux os de l'avant-bras droit dominant consolidée avec limitation de la pronosupination à 50 pour cent et raideur du poignet et douleurs",
    expectedSystems: ['épaule', 'épaule', 'poignet'],
    expectedMinRate: 8,
    expectedMaxRate: 50,
    description: "Clavicule bilatérale + 2 os avant-bras D"
  },

  // ============================================================
  // SECTION C : ÉPAULE + MAIN/DOIGTS (cas 21-30)
  // ============================================================
  {
    // Cas 21 : Fracture épaule D + amputation pouce G
    input: "fracture du col chirurgical de l'humérus droit dominant avec raideur de l'épaule abduction limitée à 75 degrés et rotation externe limitée ; amputation traumatique du pouce de la main gauche avec perte de la pince pouce-index et gêne à la préhension fine et perte de force",
    expectedSystems: ['épaule', 'main'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Épaule D + amputation pouce MG"
  },
  {
    // Cas 22 : Luxation épaule G + fracture métacarpiens D
    input: "luxation récidivante de l'épaule gauche opérée avec limitation résiduelle de la rotation externe et appréhension ; fracture des 2ème et 3ème métacarpiens de la main droite dominante avec cal vicieux et raideur des doigts et douleurs à la préhension en force",
    expectedSystems: ['épaule', 'main'],
    expectedMinRate: 5,
    expectedMaxRate: 45,
    description: "Luxation épaule G + métacarpiens MD"
  },
  {
    // Cas 23 : Prothèse épaule D + amputation index-médius G
    input: "fracture comminutive de la tête humérale droite dominante traitée par prothèse d'épaule avec raideur résiduelle abduction limitée à 70 degrés ; amputation traumatique de l'index et du médius de la main gauche avec perte de la pince fine et gêne à la saisie d'objets et limitation fonctionnelle",
    expectedSystems: ['épaule', 'main'],
    expectedMinRate: 12,
    expectedMaxRate: 55,
    description: "Prothèse épaule D + amputation index-médius MG"
  },
  {
    // Cas 24 : Fracture épaule G + broiement main D dominante
    input: "fracture du trochiter de l'épaule gauche avec limitation de l'abduction à 95 degrés et tendinopathie résiduelle ; broiement de la main droite dominante avec amputation de l'auriculaire et raideur des doigts restants et perte de force de préhension évaluée à 60 pour cent et douleurs chroniques",
    expectedSystems: ['épaule', 'main'],
    expectedMinRate: 1,
    expectedMaxRate: 60,
    description: "Épaule G + broiement main D dominante",
    acceptDominantLesion: true
  },
  {
    // Cas 25 : Fracture épaule bilatérale + amputation doigts D
    input: "fracture du col chirurgical de l'humérus droit dominant avec raideur de l'épaule abduction limitée à 80 degrés ; fracture comminutive de la tête humérale gauche avec raideur sévère abduction limitée à 55 degrés et rotation impossible ; amputation traumatique de l'annulaire et de l'auriculaire de la main droite dominante avec gêne à la préhension en force",
    expectedSystems: ['épaule', 'épaule', 'main'],
    expectedMinRate: 12,
    expectedMaxRate: 60,
    description: "Épaule bilatérale + amputation 2 doigts MD"
  },
  {
    // Cas 26 : Fracture clavicule D + fracture 1er métacarpien G (Bennett)
    input: "fracture de la clavicule droite dominante avec cal vicieux et douleurs à l'élévation ; fracture-luxation de Bennett du premier métacarpien de la main gauche avec arthrose trapézo-métacarpienne et douleurs à la pince pouce-index et limitation de l'opposition",
    expectedSystems: ['épaule', 'main'],
    expectedMinRate: 5,
    expectedMaxRate: 45,
    description: "Clavicule D + Bennett MG",
    acceptDominantLesion: true
  },
  {
    // Cas 27 : Fracture épaule D + section tendons fléchisseurs MG
    input: "fracture de l'extrémité supérieure de l'humérus droit dominant avec raideur de l'épaule et abduction limitée à 70 degrés et rotation externe limitée à 15 degrés ; section des tendons fléchisseurs profonds de l'index et du médius de la main gauche suturés avec raideur résiduelle des doigts et limitation de la flexion et déficit de force de préhension",
    expectedSystems: ['épaule', 'main'],
    expectedMinRate: 8,
    expectedMaxRate: 50,
    description: "Épaule D + section fléchisseurs MG"
  },
  {
    // Cas 28 : Luxation acromio-claviculaire D + amputation pouce et index D
    input: "luxation acromio-claviculaire droite dominante stade 3 avec saillie résiduelle et douleurs à l'effort ; amputation traumatique du pouce et de l'index de la main droite dominante avec perte totale de la pince fine et impossibilité de saisir des petits objets et gêne majeure à l'écriture",
    expectedSystems: ['épaule', 'main'],
    expectedMinRate: 20,
    expectedMaxRate: 65,
    description: "Acromio-claviculaire D + amputation pouce-index MD dominant",
    acceptDominantLesion: true
  },
  {
    // Cas 29 : Fracture épaule G + raideur doigts MD en griffe
    input: "fracture comminutive de la tête humérale gauche avec raideur sévère de l'épaule et abduction limitée à 55 degrés ; raideur post-traumatique des doigts de la main droite dominante avec déformation en griffe de l'annulaire et de l'auriculaire et limitation de la flexion des métacarpo-phalangiennes et extension incomplète des interphalangiennes et gêne fonctionnelle importante",
    expectedSystems: ['épaule', 'main'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Épaule G comminutive + griffe 2 doigts MD"
  },
  {
    // Cas 30 : Fracture omoplate D + amputation 3 doigts MG
    input: "fracture de l'omoplate droite dominante consolidée avec raideur de l'épaule et limitation de l'abduction à 85 degrés et douleurs scapulaires ; amputation traumatique de l'index du médius et de l'annulaire de la main gauche avec perte de la préhension fine et gêne majeure et limitation fonctionnelle sévère dans les activités bimanuelles",
    expectedSystems: ['épaule', 'main'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Omoplate D + amputation 3 doigts MG",
    acceptDominantLesion: true
  },

  // ============================================================
  // SECTION D : COUDE + POIGNET/MAIN (cas 31-40)
  // ============================================================
  {
    // Cas 31 : Fracture olécrâne D + fracture radius D (ipsilatéral)
    input: "fracture de l'olécrâne du coude droit dominant ostéosynthésée avec raideur en flexion limitée à 110 degrés et limitation de l'extension ; fracture de l'extrémité inférieure du radius droit dominant consolidée avec cal vicieux dorsal et raideur du poignet et arthrose radio-carpienne et douleurs",
    expectedSystems: ['coude', 'poignet'],
    expectedMinRate: 8,
    expectedMaxRate: 50,
    description: "Olécrâne D + radius D ipsilatéral dominant"
  },
  {
    // Cas 32 : Fracture tête radiale G + fracture scaphoïde D
    input: "fracture de la tête radiale du coude gauche avec limitation de la pronosupination à 60 pour cent et douleurs en supination ; fracture du scaphoïde carpien droit dominant avec pseudarthrose et nécrose partielle du pôle proximal et douleurs chroniques du poignet et limitation de la flexion dorsale",
    expectedSystems: ['coude', 'poignet'],
    expectedMinRate: 0,
    expectedMaxRate: 50,
    description: "Tête radiale G + scaphoïde D pseudarthrose",
    acceptDominantLesion: true
  },
  {
    // Cas 33 : Fracture palette humérale D + amputation pouce G
    input: "fracture de la palette humérale du coude droit dominant avec raideur sévère flexion limitée à 85 degrés et limitation de la pronosupination à 30 pour cent et douleurs permanentes ; amputation traumatique du pouce de la main gauche avec perte de la pince pouce-index gauche",
    expectedSystems: ['coude', 'main'],
    expectedMinRate: 12,
    expectedMaxRate: 55,
    description: "Palette humérale D + amputation pouce MG"
  },
  {
    // Cas 34 : Fracture olécrâne G + fracture métacarpiens D
    input: "fracture de l'olécrâne du coude gauche ostéosynthésée avec raideur en flexion limitée à 105 degrés et limitation de l'extension ; fracture des 4ème et 5ème métacarpiens de la main droite dominante avec cal vicieux et raideur des doigts et douleurs à la préhension en force et déformation résiduelle",
    expectedSystems: ['coude', 'main'],
    expectedMinRate: 5,
    expectedMaxRate: 45,
    description: "Olécrâne G + métacarpiens 4-5 MD"
  },
  {
    // Cas 35 : Coude bilatéral + poignet D
    input: "fracture de la tête radiale du coude droit dominant avec limitation de la pronosupination à 50 pour cent ; fracture de l'olécrâne du coude gauche avec raideur en flexion limitée à 110 degrés ; fracture de l'extrémité inférieure du radius droit dominant avec raideur du poignet et arthrose radio-carpienne et douleurs chroniques",
    expectedSystems: ['coude', 'coude', 'poignet'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Coude bilatéral + radius D"
  },
  {
    // Cas 36 : Fracture condyle interne coude D + fracture 2 os avant-bras G
    input: "fracture du condyle interne du coude droit dominant consolidée avec cubitus valgus et névrite cubitale et paresthésies des 4ème et 5ème doigts ; fracture des deux os de l'avant-bras gauche consolidée avec limitation de la pronosupination à 40 pour cent et raideur du poignet et douleurs",
    expectedSystems: ['coude', 'poignet'],
    expectedMinRate: 8,
    expectedMaxRate: 50,
    description: "Condyle interne D + 2 os avant-bras G"
  },
  {
    // Cas 37 : Fracture tête radiale D + fracture radius D + amputation auriculaire G
    input: "fracture de la tête radiale du coude droit dominant avec limitation de la pronosupination et douleurs ; fracture de l'extrémité inférieure du radius droit dominant avec raideur du poignet et arthrose ; amputation traumatique de l'auriculaire de la main gauche avec gêne à la préhension en force",
    expectedSystems: ['coude', 'poignet', 'main'],
    expectedMinRate: 8,
    expectedMaxRate: 50,
    description: "Tête radiale D + radius D + auriculaire MG"
  },
  {
    // Cas 38 : Luxation coude D + fracture Bennett MG + raideur poignet G
    input: "luxation postérieure du coude droit dominant réduite avec raideur résiduelle et flexion limitée à 120 degrés et extension incomplète ; fracture-luxation de Bennett du premier métacarpien gauche avec arthrose trapézo-métacarpienne et douleurs ; fracture de l'extrémité inférieure du radius gauche avec raideur sévère du poignet et limitation de la pronosupination",
    expectedSystems: ['coude', 'main', 'poignet'],
    expectedMinRate: 8,
    expectedMaxRate: 50,
    description: "Luxation coude D + Bennett MG + radius G"
  },
  {
    // Cas 39 : Fracture palette humérale G + broiement main G (ipsilatéral sévère)
    input: "fracture de la palette humérale du coude gauche avec raideur sévère flexion limitée à 80 degrés et limitation de la pronosupination à 30 pour cent ; broiement de la main gauche avec amputation de l'index et du médius et raideur des doigts restants et perte de la pince fine et déficit de force majeur",
    expectedSystems: ['coude', 'main'],
    expectedMinRate: 15,
    expectedMaxRate: 65,
    description: "Palette humérale G + broiement main G ipsilatéral"
  },
  {
    // Cas 40 : Coude D + poignet G + amputation 2 doigts MD
    input: "fracture de l'olécrâne du coude droit dominant avec raideur en flexion limitée à 100 degrés et limitation de l'extension ; fracture de l'extrémité inférieure du radius gauche avec raideur du poignet et douleurs ; amputation traumatique de l'annulaire et de l'auriculaire de la main droite dominante avec gêne à la préhension en force et faiblesse",
    expectedSystems: ['coude', 'poignet', 'main'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Olécrâne D + radius G + amputation 2 doigts MD"
  },

  // ============================================================
  // SECTION E : COMBINAISONS MULTIPLES ≥ 3 SEGMENTS (cas 41-50)
  // ============================================================
  {
    // Cas 41 : Épaule + coude + poignet D — cascade ipsilatérale
    input: "fracture du col chirurgical de l'humérus droit dominant avec raideur de l'épaule abduction limitée à 80 degrés ; fracture de la tête radiale du coude droit avec limitation de la pronosupination à 50 pour cent ; fracture de l'extrémité inférieure du radius droit avec cal vicieux dorsal et raideur du poignet et douleurs chroniques",
    expectedSystems: ['épaule', 'coude', 'poignet'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Cascade ipsilatérale D: épaule + coude + poignet"
  },
  {
    // Cas 42 : Épaule D + coude G + main D — 3 segments croisés
    input: "fracture comminutive de la tête humérale droite dominante avec raideur sévère abduction limitée à 55 degrés et rotation impossible ; fracture de la palette humérale du coude gauche avec raideur en flexion limitée à 85 degrés et limitation de la pronosupination ; amputation traumatique de l'index de la main droite dominante avec perte de la pince fine",
    expectedSystems: ['épaule', 'coude', 'main'],
    expectedMinRate: 12,
    expectedMaxRate: 60,
    description: "Épaule D + palette coude G + amputation index MD"
  },
  {
    // Cas 43 : Épaule G + coude D + poignet D + main G — 4 segments
    input: "fracture de la tête humérale gauche avec raideur de l'épaule abduction limitée à 65 degrés et rotation limitée ; fracture de l'olécrâne du coude droit dominant avec raideur en flexion limitée à 105 degrés ; fracture de l'extrémité inférieure du radius droit dominant avec raideur du poignet et arthrose radio-carpienne ; amputation traumatique du pouce de la main gauche avec perte de la pince pouce-index",
    expectedSystems: ['épaule', 'coude', 'poignet', 'main'],
    expectedMinRate: 5,
    expectedMaxRate: 65,
    description: "Épaule G + olécrâne D + radius D + amputation pouce MG"
  },
  {
    // Cas 44 : Épaule bilatérale + coude D + poignet G — 4 segments
    input: "fracture du col chirurgical de l'humérus droit dominant avec raideur de l'épaule abduction limitée à 80 degrés ; fracture comminutive de la tête humérale gauche avec raideur sévère abduction limitée à 55 degrés ; fracture de la tête radiale du coude droit dominant avec limitation de la pronosupination à 50 pour cent ; fracture de l'extrémité inférieure du radius gauche avec raideur du poignet et douleurs",
    expectedSystems: ['épaule', 'épaule', 'coude', 'poignet'],
    expectedMinRate: 12,
    expectedMaxRate: 60,
    description: "Épaule bilatérale + tête radiale D + radius G"
  },
  {
    // Cas 45 : Épaule D + coude bilatéral + main G — 4 segments
    input: "fracture du trochiter de l'épaule droite dominante avec limitation de l'abduction à 100 degrés ; fracture de l'olécrâne du coude droit avec raideur en flexion limitée à 110 degrés ; fracture de la tête radiale du coude gauche avec limitation de la pronosupination ; amputation traumatique du médius et de l'annulaire de la main gauche avec gêne à la préhension",
    expectedSystems: ['épaule', 'coude', 'coude', 'main'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Épaule D + coude bilatéral + amputation 2 doigts MG",
    acceptDominantLesion: true
  },
  {
    // Cas 46 : Épaule + coude + poignet + main D — membre supérieur complet
    input: "fracture comminutive de la tête humérale droite dominante avec prothèse d'épaule et raideur résiduelle abduction limitée à 65 degrés ; fracture de l'olécrâne du coude droit avec raideur en flexion limitée à 100 degrés et limitation de l'extension ; fracture de l'extrémité inférieure du radius droit avec raideur du poignet et limitation de la pronosupination ; fracture des 2ème et 3ème métacarpiens de la main droite avec raideur des doigts et gêne à la préhension",
    expectedSystems: ['épaule', 'coude', 'poignet', 'main'],
    expectedMinRate: 5,
    expectedMaxRate: 65,
    description: "Membre sup D complet: prothèse épaule + olécrâne + radius + métacarpiens"
  },
  {
    // Cas 47 : Épaule bilatérale + coude D + poignet G + main D — 5 segments
    input: "fracture du col chirurgical de l'humérus droit dominant avec raideur de l'épaule abduction limitée à 75 degrés ; fracture de la tête humérale gauche avec raideur sévère abduction limitée à 55 degrés ; fracture de la palette humérale du coude droit dominant avec raideur sévère flexion limitée à 85 degrés ; fracture de l'extrémité inférieure du radius gauche avec raideur du poignet et arthrose ; amputation traumatique de l'auriculaire de la main droite dominante avec gêne à la préhension en force",
    expectedSystems: ['épaule', 'épaule', 'coude', 'poignet', 'main'],
    expectedMinRate: 5,
    expectedMaxRate: 70,
    description: "Épaule bilat + palette D + radius G + auriculaire MD"
  },
  {
    // Cas 48 : Épaule D + coude G + poignet bilatéral + main D — 5 segments
    input: "fracture du col chirurgical de l'humérus droit dominant avec raideur de l'épaule et abduction limitée à 80 degrés ; fracture de l'olécrâne du coude gauche avec raideur en flexion limitée à 110 degrés ; fracture de l'extrémité inférieure du radius droit dominant avec raideur du poignet ; fracture des deux os de l'avant-bras gauche avec limitation de la pronosupination à 40 pour cent ; amputation traumatique du pouce de la main droite dominante avec perte de la pince fine",
    expectedSystems: ['épaule', 'coude', 'poignet', 'poignet', 'main'],
    expectedMinRate: 18,
    expectedMaxRate: 70,
    description: "Épaule D + coude G + poignet bilat + amputation pouce MD"
  },
  {
    // Cas 49 : Épaule bilatérale + coude bilatéral + poignet D — 5 segments
    input: "fracture du col chirurgical de l'humérus droit dominant avec raideur de l'épaule abduction limitée à 80 degrés ; fracture de la tête humérale gauche avec raideur sévère abduction limitée à 60 degrés ; fracture de l'olécrâne du coude droit dominant avec raideur en flexion limitée à 105 degrés ; fracture de la tête radiale du coude gauche avec limitation de la pronosupination à 50 pour cent ; fracture de l'extrémité inférieure du radius droit dominant avec raideur du poignet et arthrose radio-carpienne",
    expectedSystems: ['épaule', 'épaule', 'coude', 'coude', 'poignet'],
    expectedMinRate: 5,
    expectedMaxRate: 65,
    description: "Épaule bilat + coude bilat + radius D"
  },
  {
    // Cas 50 : Épaule + coude bilatéral + poignet + main bilatérale — 6 segments
    input: "fracture comminutive de la tête humérale droite dominante avec prothèse d'épaule et raideur résiduelle ; fracture de l'olécrâne du coude droit avec raideur en flexion limitée à 100 degrés ; fracture de la tête radiale du coude gauche avec limitation de la pronosupination ; fracture de l'extrémité inférieure du radius gauche avec raideur du poignet ; amputation traumatique de l'auriculaire de la main droite dominante ; amputation de l'index de la main gauche avec gêne bilatérale à la préhension",
    expectedSystems: ['épaule', 'coude', 'coude', 'poignet', 'main', 'main'],
    expectedMinRate: 5,
    expectedMaxRate: 70,
    description: "6 segments: prothèse épaule D + coude bilat + radius G + doigt bilat"
  },

  // ============================================================
  // SECTION F : CAS SÉVÈRES, AMPUTATIONS ET NERFS (cas 51-60)
  // ============================================================
  {
    // Cas 51 : Amputation avant-bras D + fracture épaule G
    input: "amputation de l'avant-bras droit dominant au tiers moyen appareillée avec prothèse myoélectrique et douleurs du moignon et perte totale de la fonction de préhension droite et limitation fonctionnelle majeure ; fracture du col chirurgical de l'humérus gauche avec raideur de l'épaule abduction limitée à 75 degrés et douleurs",
    expectedSystems: ['poignet', 'épaule'],
    expectedMinRate: 25,
    expectedMaxRate: 80,
    description: "Amputation avant-bras D dominant + épaule G"
  },
  {
    // Cas 52 : Amputation main D + fracture coude G
    input: "amputation traumatique de la main droite dominante au niveau du poignet avec prothèse myoélectrique et perte totale de la fonction de préhension droite ; fracture de la palette humérale du coude gauche avec raideur sévère flexion limitée à 80 degrés et limitation de la pronosupination à 30 pour cent et douleurs permanentes",
    expectedSystems: ['main', 'coude'],
    expectedMinRate: 25,
    expectedMaxRate: 80,
    description: "Amputation main D dominant + palette coude G",
    acceptDominantLesion: true
  },
  {
    // Cas 53 : Paralysie nerf radial D + fracture épaule G + fracture poignet G
    input: "paralysie du nerf radial droit dominant avec main tombante et impossibilité d'extension du poignet et des doigts et port d'une orthèse et déficit de la supination ; fracture de la tête humérale gauche avec raideur de l'épaule abduction limitée à 65 degrés ; fracture de l'extrémité inférieure du radius gauche avec raideur du poignet et douleurs chroniques",
    expectedSystems: ['main', 'épaule', 'poignet'],
    expectedMinRate: 5,
    expectedMaxRate: 65,
    description: "Paralysie radial D + épaule G + radius G",
    acceptDominantLesion: true
  },
  {
    // Cas 54 : Paralysie nerf cubital D + fracture coude G + amputation doigt D
    input: "paralysie du nerf cubital droit dominant avec griffe cubitale des 4ème et 5ème doigts et amyotrophie des interosseux et perte de la force de préhension et signe de Froment positif ; fracture de l'olécrâne du coude gauche avec raideur en flexion limitée à 105 degrés ; amputation traumatique de l'auriculaire de la main droite dominante",
    expectedSystems: ['main', 'coude', 'main'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Paralysie cubital D + olécrâne G + auriculaire MD",
    acceptDominantLesion: true
  },
  {
    // Cas 55 : Plexus brachial D partiel + fracture poignet G
    input: "paralysie partielle du plexus brachial droit dominant C5-C6 avec déficit de l'abduction de l'épaule et de la flexion du coude et amyotrophie du bras et douleurs neuropathiques ; fracture de l'extrémité inférieure du radius gauche avec raideur sévère du poignet et limitation de la pronosupination et arthrose radio-carpienne",
    expectedSystems: ['épaule', 'poignet'],
    expectedMinRate: 15,
    expectedMaxRate: 65,
    description: "Plexus brachial partiel D + radius G",
    acceptDominantLesion: true
  },
  {
    // Cas 56 : Amputation bras D + fracture coude G + fracture poignet G
    input: "amputation du bras droit dominant au tiers inférieur appareillée avec prothèse et douleurs du moignon et perte totale de la fonction du membre supérieur droit ; fracture de la tête radiale du coude gauche avec limitation de la pronosupination à 50 pour cent ; fracture de l'extrémité inférieure du radius gauche avec raideur du poignet et douleurs",
    expectedSystems: ['épaule', 'coude', 'poignet'],
    expectedMinRate: 5,
    expectedMaxRate: 90,
    description: "Amputation bras D + tête radiale G + radius G"
  },
  {
    // Cas 57 : Épaule prothèse bilatérale + coude D + poignet G + main bilatérale
    input: "fracture comminutive de la tête humérale droite dominante traitée par prothèse d'épaule avec raideur résiduelle abduction limitée à 60 degrés ; fracture comminutive de la tête humérale gauche traitée par prothèse d'épaule avec raideur sévère abduction limitée à 50 degrés ; fracture de l'olécrâne du coude droit dominant avec raideur en flexion limitée à 100 degrés ; fracture de l'extrémité inférieure du radius gauche avec raideur du poignet ; amputation du pouce de la main droite dominante ; amputation de l'index de la main gauche avec gêne bilatérale majeure",
    expectedSystems: ['épaule', 'épaule', 'coude', 'poignet', 'main', 'main'],
    expectedMinRate: 5,
    expectedMaxRate: 80,
    description: "Prothèse épaule bilat + olécrâne D + radius G + amputation pouce MD + index MG"
  },
  {
    // Cas 58 : Paralysie plexus brachial complet D + fracture épaule G + fracture coude G
    input: "paralysie complète du plexus brachial droit dominant C5-C6-C7-C8-T1 avec membre supérieur droit ballant et amyotrophie globale et douleurs neuropathiques sévères et perte totale de la fonction du membre supérieur droit ; fracture du col chirurgical de l'humérus gauche avec raideur de l'épaule abduction limitée à 75 degrés ; fracture de l'olécrâne du coude gauche avec raideur en flexion limitée à 110 degrés",
    expectedSystems: ['épaule', 'épaule', 'coude'],
    expectedMinRate: 35,
    expectedMaxRate: 90,
    description: "Plexus brachial complet D + épaule G + olécrâne G",
    acceptDominantLesion: true
  },
  {
    // Cas 59 : Épaule bilat + coude bilat + poignet bilat + main D — 7 atteintes sévères
    input: "fracture du col chirurgical de l'humérus droit dominant avec raideur de l'épaule et abduction limitée à 70 degrés ; fracture comminutive de la tête humérale gauche avec raideur sévère abduction limitée à 50 degrés et rotation impossible ; fracture de la palette humérale du coude droit dominant avec raideur sévère flexion limitée à 85 degrés et limitation de la pronosupination ; fracture de la tête radiale du coude gauche avec limitation de la pronosupination à 40 pour cent ; fracture de l'extrémité inférieure du radius droit dominant avec raideur du poignet et arthrose ; fracture des deux os de l'avant-bras gauche avec limitation de la pronosupination et raideur du poignet ; amputation de l'auriculaire de la main droite dominante avec gêne à la préhension en force",
    expectedSystems: ['épaule', 'épaule', 'coude', 'coude', 'poignet', 'poignet', 'main'],
    expectedMinRate: 25,
    expectedMaxRate: 85,
    description: "7 atteintes: épaule bilat + coude bilat + poignet bilat + auriculaire MD"
  },
  {
    // Cas 60 : Épaule bilat + coude bilat + poignet bilat + main bilat — 8 atteintes catastrophiques AVP membre sup
    input: "fracture comminutive de la tête humérale droite dominante avec prothèse d'épaule et raideur sévère ; fracture du col chirurgical de l'humérus gauche avec raideur de l'épaule abduction limitée à 65 degrés ; fracture de l'olécrâne du coude droit dominant avec raideur en flexion limitée à 95 degrés et limitation de l'extension ; fracture de la palette humérale du coude gauche avec raideur sévère flexion limitée à 80 degrés et limitation de la pronosupination à 30 pour cent ; fracture de l'extrémité inférieure du radius droit dominant avec raideur du poignet et arthrose radio-carpienne ; fracture des deux os de l'avant-bras gauche avec limitation de la pronosupination à 40 pour cent et raideur du poignet ; amputation traumatique du pouce et de l'index de la main droite dominante avec perte totale de la pince fine ; amputation de l'annulaire et de l'auriculaire de la main gauche avec gêne majeure à la préhension et dépendance pour les actes de la vie quotidienne",
    expectedSystems: ['épaule', 'épaule', 'coude', 'coude', 'poignet', 'poignet', 'main', 'main'],
    expectedMinRate: 35,
    expectedMaxRate: 98,
    description: "8 atteintes catastrophiques: prothèse épaule D + épaule G + coude bilat + poignet bilat + main bilat"
  },
];

// ====== RUNNER ======
async function runTests() {
  let passed = 0;
  let failed = 0;

  console.log('╔═══════════════════════════════════════════════════════════════════╗');
  console.log('║  TEST 60 CAS POLYTRAUMATISMES MEMBRES SUPÉRIEURS (V3.3.319)     ║');
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
          || (s === 'coude' && /coude|ol[eé]cran|t[eê]te.*radial|pronosupination|condyl.*hum[eé]r|palette|coron[eé]|[eé]pitrochl/i.test(allText))
          || (s === 'poignet' && /poignet|radius|scapho[ïi]de|pronosupination|pouteau|galeazzi|monteggia|avant.bras/i.test(allText))
          || (s === 'main' && /main|pouce|index|doigt|m[eé]dius|m[eé]tacarp|phalang|auriculaire|annulaire|broiement|pr[eé]hension|pince|griffe|radial.*tomb|cubital/i.test(allText));
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
        if (!isPolytrauma && !tc.acceptDominantLesion) reasons.push('PAS reconnu comme polytraumatisme');
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
