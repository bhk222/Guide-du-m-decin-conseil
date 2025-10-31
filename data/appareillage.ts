import { Appareillage } from '../types';

// Base de données COMPLÈTE appareillage CNAS
// Extraite du Guide CNAS 2022 (164 pages) - TEXTES EXACTS DU PDF
// v83: 237 produits (+ 10 aides techniques : béquilles axillaires, cadres de marche, déambulateurs, rollator)

export const appareillageDatabase: Appareillage[] = [
{
    "reference": "SO 01",
    "nom": "Semelle orthopédique (pointure < 36)",
    "categorie": "Podo-orthèses - Semelles",
    "description": "Semelle orthopédique réalisée sur mesure après moulage ou tracé du pied. Constituée de 4 couches : synderme, liège naturel, mousse et basane. Correctrice, stabilisatrice ou palliative selon la pathologie.",
    "indications": [
      "Pieds plats valgus ou varus de l'enfant (≥ 3 ans)",
      "Pieds plats avec valgus ou varus du calcanéum",
      "Pieds plats avec valgus de l'avant-pied",
      "Metatarsus varus de l'avant-pied",
      "Note : 60% des pieds plats de l'enfant guérissent spontanément"
    ],
    "criteres_conformite": [
      "4 constituants obligatoires : plaque de synderme + liège naturel + mousse + basane",
      "Semelle amovible à placer dans chaussure de commerce",
      "Chaussure : prévoir demi-pointure en plus",
      "Corrections adaptées : CAE, CCI, CSPI, CPP, CSAE, CPAI"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "SO 02",
    "nom": "Semelle orthopédique (pointure ≥ 36)",
    "categorie": "Podo-orthèses - Semelles",
    "description": "Semelle orthopédique adulte. Quatre types : correction, décharge, compensation, confort.",
    "indications": [
      "Épiphysite plantaire (épine calcanéenne) - semelle de décharge avec cuvette postérieure",
      "Métatarsalgies - semelle avec BRC ou PRC",
      "Hyperkératose (durillons, cors)",
      "Tendinite achilléenne - semelle avec élévation talonnière",
      "Pied diabétique - semelle de confort et décharge",
      "Polyarthrite rhumatoïde - semelle d'amortissement",
      "Pieds plats constitutionnels ou acquis",
      "Pieds creux décompensés d'origine neurologique",
      "Inégalité de longueur des membres inférieurs ≤ 2 cm"
    ],
    "criteres_conformite": [
      "Semelle de décharge : cuvette postérieure ou BRC/PRC",
      "Semelle de compensation unilatérale pour inégalité",
      "Prescription par paire obligatoire même si unilatéral"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "701",
    "nom": "Chaussure orthopédique peausserie forte (Box)",
    "categorie": "Podo-orthèses - Chaussures",
    "description": "Chaussure orthopédique à tige montante ou basse en cuir box (peausserie forte). Contrefort rigide bilatéral obligatoire. Semelles de correction intégrées.",
    "indications": [
      "Pieds plats avec valgus/varus après échec traitement par semelles",
      "Atteinte neurologique : pieds tombants, steppage",
      "Pied Bot Varus Équin (PBVE) opéré ou non",
      "Instabilité de cheville post-traumatique",
      "Inégalité MI 3-6 cm (+ AR31 + 709)",
      "Inégalité MI >6 cm (+ AR31 + AR32 + 709)",
      "Amputation trans-métatarsienne (+ MO91/92 + 01 + 709)",
      "Équinisme irréductible (+ AD14/15/16 + 703)"
    ],
    "adjonctions": [
      "AS47",
      "AS50",
      "AS51",
      "AS52",
      "AP22",
      "AP24",
      "AR31",
      "AR32",
      "AD13-16",
      "MO91-92"
    ],
    "criteres_conformite": [
      "Réalisée sur tracé ou après moulage",
      "Contrefort rigide bilatéral obligatoire",
      "Fermeture lacets ou velcros",
      "Talon compensé uniquement pour atteintes neurologiques"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "702",
    "nom": "Chaussure orthopédique peausserie fine (Chevreau)",
    "categorie": "Podo-orthèses - Chaussures",
    "description": "Chaussure en chevreau (peausserie fine) pour pieds fragilisés nécessitant moins de contrainte.",
    "indications": [
      "Pieds diabétiques (artériopathie, neuropathie, mal perforant)",
      "Amputations d'orteils",
      "Polyarthrite rhumatoïde avec déformations",
      "Lymphœdème uni ou bilatéral",
      "Séquelles de brûlures importantes"
    ],
    "adjonctions": [
      "Mêmes que 701 sauf AS51 et AS52"
    ],
    "criteres_conformite": [
      "Peausserie souple (chevreau)",
      "Intérieur sans couture pour pieds diabétiques",
      "Volume intérieur suffisant"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "703",
    "nom": "Chaussure de compensation (peausserie forte)",
    "categorie": "Podo-orthèses - Chaussures",
    "description": "Chaussure pour compenser le pied sain controlatéral. Semelle compensatrice pour équilibrer hauteur.",
    "indications": [
      "Compensation pied sain - équinisme irréductible controlatéral"
    ],
    "criteres_conformite": [
      "Tige montante obligatoire",
      "Semelle compensatrice adaptée"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "704",
    "nom": "Chaussure de compensation (peausserie fine)",
    "categorie": "Podo-orthèses - Chaussures",
    "description": "Compensation pied sain sur pied fragilisé controlatéral.",
    "indications": [
      "Compensation pied sain - équinisme sur pied fragilisé controlatéral"
    ],
    "criteres_conformite": [
      "Peausserie fine",
      "Semelle compensatrice"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "705",
    "nom": "Chaussure pour étrier ou semelle à tourillon",
    "categorie": "Podo-orthèses - Chaussures",
    "description": "Chaussure spéciale pour fixation d'étrier métallique ou semelle à tourillon.",
    "indications": [
      "Fixation étrier latéral",
      "Semelle à tourillon"
    ],
    "criteres_conformite": [
      "Renforts pour fixation étrier"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "706",
    "nom": "Chaussure pour étrier (peausserie fine)",
    "categorie": "Podo-orthèses - Chaussures",
    "description": "Version peausserie fine pour fixation étrier sur pied fragilisé.",
    "indications": [
      "Fixation étrier sur pied fragilisé"
    ],
    "criteres_conformite": [
      "Peausserie fine",
      "Renforts étrier"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "709",
    "nom": "Chaussure de complément",
    "categorie": "Podo-orthèses - Chaussures",
    "description": "Chaussure pour pied sain équilibrant hauteur.",
    "indications": [
      "Complément pied sain - atteinte unilatérale"
    ],
    "criteres_conformite": [
      "Hauteur adaptée à chaussure controlatérale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "01",
    "nom": "Ortho-prothèse amputation méta-tarso-phalangienne",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Ortho-prothèse amputation méta-tarso-phalangienne",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "02",
    "nom": "Ortho-prothèse amputation tarsienne (Chopart)",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Ortho-prothèse amputation tarsienne (Chopart)",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AD11",
    "nom": "Orthèse déformations irréductibles orteils",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Orthèse déformations irréductibles orteils",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AD12",
    "nom": "Orthèse trouble complexe amputation orteil",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Orthèse trouble complexe amputation orteil",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AD13",
    "nom": "Orthèse déformations graves complexes",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Orthèse déformations graves complexes",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AD14",
    "nom": "Orthèse équinisme (tige 8-14 cm)",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Orthèse équinisme (tige 8-14 cm)",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AD15",
    "nom": "Orthèse équinisme (tige 14-18 cm)",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Orthèse équinisme (tige 14-18 cm)",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AD16",
    "nom": "Orthèse équinisme (tige >18 cm)",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Orthèse équinisme (tige >18 cm)",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AP21",
    "nom": "Adjonction paralysie - orthèse plantaire",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Adjonction paralysie - orthèse plantaire",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AP22",
    "nom": "Baleinage bilatéral + tracteurs élastiques",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Baleinage bilatéral + tracteurs élastiques",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AP24",
    "nom": "Ressort postérieur acier releveur",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Ressort postérieur acier releveur",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AP25",
    "nom": "Dispositif externe tuteurs métalliques",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Dispositif externe tuteurs métalliques",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AR31",
    "nom": "Orthèse intérieure 2-6 cm raccourcissement",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Orthèse intérieure 2-6 cm raccourcissement",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AR32",
    "nom": "Raccourcissement >6 cm",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Raccourcissement >6 cm",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AR33",
    "nom": "Compensation externe ≥2 cm",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Compensation externe ≥2 cm",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AS45",
    "nom": "Fermeture glissière ou velcros",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Fermeture glissière ou velcros",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AS46",
    "nom": "Gousset élastique sur tige",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Gousset élastique sur tige",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AS47",
    "nom": "Bride en T anti-varus/valgus",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Bride en T anti-varus/valgus",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AS49",
    "nom": "Baleinage unilatéral avec capitonnage",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Baleinage unilatéral avec capitonnage",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AS50",
    "nom": "Baleinage bilatéral avec capitonnage",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Baleinage bilatéral avec capitonnage",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AS51",
    "nom": "Contrefort unilatéral cuir/synthèse",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Contrefort unilatéral cuir/synthèse",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AS52",
    "nom": "Contrefort bilatéral cuir/synthèse",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Contrefort bilatéral cuir/synthèse",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AS54",
    "nom": "Contrefort + tuteur métallique",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Contrefort + tuteur métallique",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "172",
    "nom": "Talonnette RC35",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Talonnette RC35",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "MO91",
    "nom": "Moulage pied enveloppant malléoles",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Moulage pied enveloppant malléoles",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "MO92",
    "nom": "Moulage pied et jambe",
    "categorie": "Podo-orthèses - Adjonctions",
    "description": "Adjonction pour chaussures orthopédiques. Moulage pied et jambe",
    "indications": [
      "Complément chaussure orthopédique selon pathologie"
    ],
    "criteres_conformite": [
      "Selon prescription médicale"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "CASQUE.T1",
    "nom": "Casque de protection Type 1",
    "categorie": "Orthèses du crâne",
    "description": "Casque protection crânienne, coque rigide avec capitonnage.",
    "indications": [
      "Post-craniectomie",
      "Épilepsie risque chute",
      "Troubles neuro"
    ],
    "criteres_conformite": [
      "Coque rigide",
      "Capitonnage",
      "Fixation sécurisée"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "CASQUE.T2",
    "nom": "Casque de protection Type 2",
    "categorie": "Orthèses du crâne",
    "description": "Casque renforcé protection occipitale.",
    "indications": [
      "Protection crânienne renforcée",
      "Post-neurochirurgie"
    ],
    "criteres_conformite": [
      "Protection renforcée",
      "Occipital protégé"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "CASQUE.T3",
    "nom": "Casque orthopédique déformations crâne bébé",
    "categorie": "Orthèses du crâne",
    "description": "Casque moulé personnalisé correction déformations crâne nourrisson.",
    "indications": [
      "Plagiocéphalie positionnelle",
      "Brachycéphalie",
      "Déformations crâniennes"
    ],
    "criteres_conformite": [
      "Moulage personnalisé",
      "Matériaux légers",
      "Ajustement progressif"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "COL.CERV.S",
    "nom": "Collier cervical souple",
    "categorie": "Orthèses du cou",
    "description": "Collier cervical mousse souple, immobilisation légère.",
    "indications": [
      "Entorse cervicale bénigne",
      "Cervicalgie aiguë",
      "Torticolis"
    ],
    "criteres_conformite": [
      "Hauteur 8-10 cm",
      "Mousse confortable",
      "Velcro"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "COL.CERV.SR",
    "nom": "Collier cervical semi-rigide",
    "categorie": "Orthèses du cou",
    "description": "Collier semi-rigide renfort plastique.",
    "indications": [
      "Entorse cervicale moyenne",
      "Post-whiplash",
      "Arthrose cervicale"
    ],
    "criteres_conformite": [
      "Renfort plastique",
      "Semi-rigide"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "MINERVE.C",
    "nom": "Minerve cervicale courte",
    "categorie": "Orthèses du cou",
    "description": "Minerve rigide immobilisation stricte rachis cervical.",
    "indications": [
      "Fracture cervicale stable",
      "Post-op arthrodèse",
      "Entorse grave"
    ],
    "criteres_conformite": [
      "Immobilisation rigide",
      "Appui mentonnier/occipital"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "MINERVE.CD",
    "nom": "Minerve cervico-dorsale",
    "categorie": "Orthèses du cou",
    "description": "Minerve longue appui thoracique.",
    "indications": [
      "Fracture cervicale instable",
      "Luxation cervicale",
      "Post-op lourde"
    ],
    "criteres_conformite": [
      "Appui thoracique",
      "Immobilisation longue"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "MILWAUKEE",
    "nom": "Corset de Milwaukee",
    "categorie": "Orthèses du tronc - Corsets",
    "description": "Corset avec collier cervical pour scoliose thoracique haute",
    "indications": [
      "Scoliose thoracique haute (apex >T6)",
      "Cobb 20-40°"
    ],
    "criteres_conformite": [
      "Réalisé sur mesure",
      "Ajustement progressif"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "LYONNAIS",
    "nom": "Corset Lyonnais (CTLS)",
    "categorie": "Orthèses du tronc - Corsets",
    "description": "Corset thoraco-lombo-sacré polyéthylène",
    "indications": [
      "Scoliose thoracique moyenne/basse",
      "Cobb 20-45°"
    ],
    "criteres_conformite": [
      "Réalisé sur mesure",
      "Ajustement progressif"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "BOSTON",
    "nom": "Corset Boston",
    "categorie": "Orthèses du tronc - Corsets",
    "description": "Corset lombaire modulaire préfabriqué",
    "indications": [
      "Scoliose lombaire",
      "Cobb 20-40°"
    ],
    "criteres_conformite": [
      "Réalisé sur mesure",
      "Ajustement progressif"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "CHENEAU",
    "nom": "Corset Chêneau (CTM)",
    "categorie": "Orthèses du tronc - Corsets",
    "description": "Corset asymétrique correction 3D",
    "indications": [
      "Scoliose idiopathique évolutive",
      "Cobb 20-50°"
    ],
    "criteres_conformite": [
      "Réalisé sur mesure",
      "Ajustement progressif"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "ANTI.CYPH",
    "nom": "Corset anti-cyphose",
    "categorie": "Orthèses du tronc - Corsets",
    "description": "Correction cyphose dorsale (Scheuermann)",
    "indications": [
      "Maladie Scheuermann (>45°)",
      "Cyphose évolutive ado"
    ],
    "criteres_conformite": [
      "Réalisé sur mesure",
      "Ajustement progressif"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "CORSET.TLS",
    "nom": "Corset maintien thoraco-lombaire",
    "categorie": "Orthèses du tronc - Corsets",
    "description": "Maintien sans correction",
    "indications": [
      "Lombalgie chronique sévère",
      "Post-op colonne"
    ],
    "criteres_conformite": [
      "Réalisé sur mesure",
      "Ajustement progressif"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "CEINTURE.LOMB",
    "nom": "Ceinture maintien lombaire",
    "categorie": "Orthèses du tronc - Corsets",
    "description": "Ceinture souple/semi-rigide soutien",
    "indications": [
      "Lombalgie commune",
      "Lumbago",
      "Post-op"
    ],
    "criteres_conformite": [
      "Réalisé sur mesure",
      "Ajustement progressif"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "CEINTURE.ABD",
    "nom": "Ceinture abdominale",
    "categorie": "Orthèses du tronc - Corsets",
    "description": "Soutien abdominal",
    "indications": [
      "Post-chirurgie abdominale",
      "Éventration"
    ],
    "criteres_conformite": [
      "Réalisé sur mesure",
      "Ajustement progressif"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "CEINTURE.ABD.LOMB",
    "nom": "Ceinture abdomino-lombaire",
    "categorie": "Orthèses du tronc - Corsets",
    "description": "Double fonction abdominale + lombaire",
    "indications": [
      "Lombalgie + hypotonie abdominale"
    ],
    "criteres_conformite": [
      "Réalisé sur mesure",
      "Ajustement progressif"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "OS 79 G01",
    "nom": "Attelle palmaire Type 1",
    "categorie": "Orthèses membres supérieurs",
    "description": "Attelle poignet-main, immobilisation 10-15° extension.",
    "indications": [
      "Canal carpien",
      "Tendinite poignet",
      "Entorse",
      "Arthrose trapézo-métacarpienne"
    ],
    "criteres_conformite": [
      "Immobilisation poignet",
      "Doigts libres",
      "Thermoformable"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "OS 16 N02",
    "nom": "Orthèse avant-bras",
    "categorie": "Orthèses membres supérieurs",
    "description": "Orthèse immobilisation avant-bras.",
    "indications": [
      "Fracture radius/ulna",
      "Post-op avant-bras"
    ],
    "criteres_conformite": [
      "Immobilisation complète",
      "Rembourrage confortable"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "OI 36 N11",
    "nom": "Attelle cruro-pédieuse articulée",
    "categorie": "Orthèses membres inférieurs",
    "description": "Attelle jambe-pied avec articulation cheville, fibre carbone ou polypropylène.",
    "indications": [
      "Paralysie péronière",
      "Pied tombant",
      "Steppage",
      "Séquelles neuro"
    ],
    "criteres_conformite": [
      "Articulation cheville",
      "Releveur pied",
      "Matériau léger",
      "Sangles"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "OI 59 C91",
    "nom": "Petit Appareil de Marche (PAM)",
    "categorie": "Orthèses membres inférieurs",
    "description": "Orthèse courte releveur pied, discrète.",
    "indications": [
      "Pied tombant léger",
      "Steppage modéré",
      "Faiblesse tibial antérieur"
    ],
    "criteres_conformite": [
      "Léger",
      "Discret",
      "Releveur actif"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "GAM",
    "nom": "Grand Appareil de Marche",
    "categorie": "Orthèses membres inférieurs",
    "description": "Orthèse longue cuisse-jambe-pied avec articulations.",
    "indications": [
      "Paralysie membres inférieurs",
      "Paraplégie partielle",
      "Rééducation marche"
    ],
    "criteres_conformite": [
      "Articulations genou/cheville",
      "Tuteurs latéraux",
      "Ceinture pelvienne"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "ATTELLE.DB",
    "nom": "Attelle de Denis Browne",
    "categorie": "Orthèses membres inférieurs",
    "description": "Barre écartement + chaussures pour PBVE.",
    "indications": [
      "Pied Bot Varus Équin",
      "Traitement post-plâtres"
    ],
    "criteres_conformite": [
      "Barre réglable",
      "Fixation chaussures",
      "Angle abduction"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "BANDAGE.ING.S",
    "nom": "Bandage herniaire inguinal simple",
    "categorie": "Bandages herniaires",
    "description": "Bandage élastique avec pelote compression inguinale unilatérale.",
    "indications": [
      "Hernie inguinale unilatérale",
      "Attente chirurgie"
    ],
    "criteres_conformite": [
      "Pelote de compression",
      "Élastique confortable"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "BANDAGE.ING.D",
    "nom": "Bandage herniaire inguinal double",
    "categorie": "Bandages herniaires",
    "description": "Bandage avec 2 pelotes pour hernies bilatérales.",
    "indications": [
      "Hernie inguinale bilatérale"
    ],
    "criteres_conformite": [
      "2 pelotes",
      "Confort"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "BANDAGE.OMBIL",
    "nom": "Bandage herniaire ombilical",
    "categorie": "Bandages herniaires",
    "description": "Ceinture avec pelote ombilicale.",
    "indications": [
      "Hernie ombilicale"
    ],
    "criteres_conformite": [
      "Pelote ombilicale"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "CANNE.SIMPLE",
    "nom": "Canne simple",
    "categorie": "Aides techniques à la marche",
    "description": "Canne réglable embout antidérapant.",
    "indications": [
      "Aide marche déséquilibre léger",
      "Soulagement MI"
    ],
    "criteres_conformite": [
      "Hauteur réglable",
      "Embout antidérapant",
      "Max 100 kg"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "CANNE.TRIPODE",
    "nom": "Canne tripode (3 appuis)",
    "categorie": "Aides techniques à la marche",
    "description": "Canne 3 pieds stabilité accrue.",
    "indications": [
      "Troubles équilibre importants",
      "Hémiparésie"
    ],
    "criteres_conformite": [
      "3 pieds antidérapants",
      "Max 120 kg"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "CANNE.QUADRIPODE",
    "nom": "Canne quadripode (4 appuis)",
    "categorie": "Aides techniques à la marche",
    "description": "Canne 4 pieds stabilité maximale.",
    "indications": [
      "Équilibre très précaire"
    ],
    "criteres_conformite": [
      "4 pieds",
      "Max 130 kg"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "CANNE.ANGLAISE",
    "nom": "Canne anglaise (béquille)",
    "categorie": "Aides techniques à la marche",
    "description": "Béquille appui avant-bras.",
    "indications": [
      "Décharge complète MI",
      "Post-op",
      "Fracture"
    ],
    "criteres_conformite": [
      "Appui avant-bras",
      "Hauteur réglable"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "DEAMBULATEUR.FIXE",
    "nom": "Déambulateur fixe",
    "categorie": "Aides techniques à la marche",
    "description": "Cadre marche rigide 4 pieds.",
    "indications": [
      "Rééducation marche",
      "Équilibre précaire"
    ],
    "criteres_conformite": [
      "4 embouts",
      "Pliable",
      "Max 130 kg"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "DEAMBULATEUR.ROUES",
    "nom": "Déambulateur à roues",
    "categorie": "Aides techniques à la marche",
    "description": "Cadre avec roues + freins.",
    "indications": [
      "Marche continue",
      "Autonomie préservée"
    ],
    "criteres_conformite": [
      "Roues",
      "Freins",
      "Siège repos"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "ROLLATOR",
    "nom": "Rollator (3 roues)",
    "categorie": "Aides techniques à la marche",
    "description": "Déambulateur léger 3 roues maniable.",
    "indications": [
      "Intérieur",
      "Espaces restreints"
    ],
    "criteres_conformite": [
      "3 roues pivotantes",
      "Léger",
      "Pliable"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "FR.STANDARD",
    "nom": "Fauteuil roulant manuel standard",
    "categorie": "Fauteuils roulants",
    "description": "Fauteuil pliable acier/alu, propulsion manuelle.",
    "indications": [
      "Incapacité permanente marche",
      "Paraplégie",
      "Hémiplégie sévère"
    ],
    "criteres_conformite": [
      "Pliable",
      "Grandes roues 60cm",
      "Freins",
      "Max 120kg"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "FR.ACTIF",
    "nom": "Fauteuil roulant actif",
    "categorie": "Fauteuils roulants",
    "description": "Fauteuil léger maniable patient autonome actif.",
    "indications": [
      "Paraplégie sujet jeune actif",
      "Sport adapté"
    ],
    "criteres_conformite": [
      "Aluminium <15kg",
      "Roues inclinées",
      "Réglages multiples"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "FR.LARGE",
    "nom": "Fauteuil roulant renforcé/large",
    "categorie": "Fauteuils roulants",
    "description": "Fauteuil largeur/capacité augmentée.",
    "indications": [
      "Obésité",
      "Poids >120kg"
    ],
    "criteres_conformite": [
      "Châssis renforcé",
      "Largeur 55-65cm",
      "Max 200kg"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "FR.GR",
    "nom": "Fauteuil roulant garde-robe",
    "categorie": "Fauteuils roulants",
    "description": "Fauteuil avec ouverture assise + seau.",
    "indications": [
      "Incontinence",
      "Impossibilité transfert WC"
    ],
    "criteres_conformite": [
      "Assise percée",
      "Seau amovible"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "POUSSETTE.IMC",
    "nom": "Poussette IMC",
    "categorie": "Fauteuils roulants",
    "description": "Poussette spécialisée enfant polyhandicapé.",
    "indications": [
      "IMC enfant",
      "Polyhandicap sévère"
    ],
    "criteres_conformite": [
      "Soutien tête/tronc",
      "Harnais",
      "Inclinable"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "FR.IMC",
    "nom": "Fauteuil roulant IMC",
    "categorie": "Fauteuils roulants",
    "description": "Fauteuil adapté enfant/ado IMC avec soutiens.",
    "indications": [
      "IMC ado/adulte",
      "Polyhandicap"
    ],
    "criteres_conformite": [
      "Appui-tête",
      "Cale-tronc",
      "Tablette"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "FRE",
    "nom": "Fauteuil Roulant Électrique (FRE)",
    "categorie": "Fauteuils roulants",
    "description": "Fauteuil à propulsion par moteur électrique avec batterie et commande joystick. Réservé aux patients avec atteinte motrice sévère des 4 membres.",
    "indications": [
      "Le fauteuil roulant à propulsion par moteur électrique est réservé aux malades qui présentent simultanément une atteinte motrice définitive des membres inférieurs et d'au moins un membre supérieur les mettant dans l'incapacité de marcher ou d'utiliser efficacement un fauteuil roulant ordinaire",
      "Aucune contre-indication à la conduite dans la voie publique",
      "Conditions administratives : Note DG 2218/2015"
    ],
    "criteres_conformite": [
      "Moteur électrique avec batterie rechargeable",
      "Commande par joystick adapté",
      "Autonomie batterie ≥ 15-20 km",
      "Freins électromagnétiques automatiques",
      "Dossier inclinable et réglable",
      "Prescription médicale spécialisée obligatoire",
      "Conditions CNAS strictes (Note DG 2218/2015)"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "VAM",
    "nom": "Voiturette À Moteur (VAM)",
    "categorie": "Fauteuils roulants",
    "description": "Scooter électrique 3 ou 4 roues pour personnes à mobilité réduite. Usage intérieur et extérieur. Nécessite capacité de transfert autonome.",
    "indications": [
      "Les Voiturettes À Moteur (VAM) sont indiquées chez les personnes présentant un handicap lourd des 02 membres inférieurs avec aucune contre-indication à la conduite dans la voie publique",
      "Conditions administratives décrites dans la note DG 2218/2015",
      "Capacité de transfert autonome maintenue"
    ],
    "criteres_conformite": [
      "Moteur électrique avec batterie",
      "Autonomie : 20-40 km",
      "Siège pivotant avec dossier et accoudoirs réglables",
      "Freins à disque ou à tambour",
      "Panier de rangement",
      "Feux avant et arrière",
      "Conditions CNAS (Note DG 2218/2015)"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "MATELAS.ANTIESC",
    "nom": "Matelas anti-escarres à air motorisé",
    "categorie": "Prévention escarres",
    "description": "Matelas à air alternance pression automatique.",
    "indications": [
      "Alitement prolongé",
      "Risque escarres élevé",
      "Paraplégie/tétraplégie"
    ],
    "criteres_conformite": [
      "Air pression alternée",
      "Compresseur silencieux",
      "Housse lavable"
    ],
    "remboursement": "80%",
    "type": "Petit appareillage"
  },
  {
    "reference": "POCHE.COLO",
    "nom": "Poche de colostomie",
    "categorie": "Poches de stomies",
    "description": "Poche pour poche de colostomie, système 1 ou 2 pièces",
    "indications": [
      "Colostomie gauche",
      "Colostomie transverse"
    ],
    "criteres_conformite": [
      "Filtre anti-odeurs",
      "Support adhésif hypoallergénique"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "POCHE.ILEO",
    "nom": "Poche d'iléostomie",
    "categorie": "Poches de stomies",
    "description": "Poche pour poche d'iléostomie, système 1 ou 2 pièces",
    "indications": [
      "Iléostomie terminale",
      "MICI sévères"
    ],
    "criteres_conformite": [
      "Filtre anti-odeurs",
      "Support adhésif hypoallergénique"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "POCHE.URO",
    "nom": "Poche d'urostomie",
    "categorie": "Poches de stomies",
    "description": "Poche pour poche d'urostomie, système 1 ou 2 pièces",
    "indications": [
      "Bricker",
      "Cancer vessie"
    ],
    "criteres_conformite": [
      "Filtre anti-odeurs",
      "Support adhésif hypoallergénique"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "SONDE.SIP",
    "nom": "Sondes urinaires pour Sondage Intermittent Propre (SIP)",
    "categorie": "Sondes urinaires",
    "description": "Sondes à usage unique pour auto-sondage vésical intermittent.",
    "indications": [
      "Rétention urinaire chronique",
      "Vessie neurologique",
      "Paraplégie/tétraplégie",
      "SEP avec troubles vésicaux"
    ],
    "criteres_conformite": [
      "Usage unique stérile",
      "Hydrophile ou lubrifiée",
      "Calibres CH8 à CH18"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AUDIO.ITE",
    "nom": "Aide auditive intra-auriculaire (ITE)",
    "categorie": "Audio-prothèses",
    "description": "Prothèse auditive aide auditive intra-auriculaire (ite)",
    "indications": [
      "Surdité perception légère/moyenne"
    ],
    "criteres_conformite": [
      "Embout moulé personnalisé",
      "Réglages audiométriques"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AUDIO.BTE",
    "nom": "Aide auditive contour d'oreille (BTE)",
    "categorie": "Audio-prothèses",
    "description": "Prothèse auditive aide auditive contour d'oreille (bte)",
    "indications": [
      "Surdité perception moyenne/sévère"
    ],
    "criteres_conformite": [
      "Embout moulé personnalisé",
      "Réglages audiométriques"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AUDIO.RIC",
    "nom": "Aide auditive RIC (Receiver In Canal)",
    "categorie": "Audio-prothèses",
    "description": "Prothèse auditive aide auditive ric (receiver in canal)",
    "indications": [
      "Surdité légère/moyenne"
    ],
    "criteres_conformite": [
      "Embout moulé personnalisé",
      "Réglages audiométriques"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "AUDIO.CROS",
    "nom": "Système CROS/Bi-CROS",
    "categorie": "Audio-prothèses",
    "description": "Prothèse auditive système cros/bi-cros",
    "indications": [
      "Surdité unilatérale profonde/totale"
    ],
    "criteres_conformite": [
      "Embout moulé personnalisé",
      "Réglages audiométriques"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  {
    "reference": "IMPLANT.COCHL.EXT",
    "nom": "Composants externes implant cochléaire",
    "categorie": "Audio-prothèses",
    "description": "Processeur externe + antenne + accessoires pour implant cochléaire.",
    "indications": [
      "Surdité profonde bilatérale implantée",
      "Échec appareillage conventionnel"
    ],
    "criteres_conformite": [
      "Processeur vocal externe",
      "Antenne transmission",
      "Avenant N°4"
    ],
    "remboursement": "100%",
    "type": "Grand appareillage"
  },
  // ========== PROTHÈSES DES MEMBRES INFÉRIEURS ==========
  // Section 4.3.1 - Prothèses d'entraînement (provisoires)
  {
    reference: "PI 03 ZP 63D",
    nom: "Prothèse d'Entraînement Fémorale - PI 03 ZP 63D",
    categorie: "Prothèses - Membres Inférieurs",
    description: `Prothèse d'entraînement provisoire pour amputation fémorale (cuisse).
Prothèse mise en place après cicatrisation du moignon pour la rééducation et la réadaptation.

Composition :
• Emboîture de contact avec le moignon (avec ou sans appui sous ischiatique en polyéthylène)
• Genou prothétique (articulation type D)
• Segment jambier
• Pied prothétique (type 6 - pied spécial en feutre caoutchouc ou matière plastique monté sur cheville spéciale ST)
• Bretelles de maintien si nécessaire

Code nomenclature :
- PI = Prothèse Inférieure
- 03 = Niveau amputation fémorale
- ZP = Matériau d'entraînement (polyéthylène)
- 6 = Type de pied (pied spécial ST)
- 3 = Type d'emboîture
- D = Type d'articulation genou

Durée : 3 à 6 mois pour amputations traumatiques, 9 à 12 mois pour artéritiques/agénésies.
Passage obligatoire avant prothèse définitive.`,
    indications: [
      "Amputation fémorale quelle que soit son origine",
      "Agénésie congénitale fémorale",
      "Restitution du schéma corporel",
      "Récupération de la marche",
      "Évaluation des capacités à se déplacer avec prothèse",
      "Rééducation et réadaptation du malade"
    ],
    criteres_conformite: [
      "Prothèse d'entraînement provisoire uniquement",
      "Mise en place après cicatrisation complète du moignon",
      "Passage obligatoire avant prothèse définitive",
      "Ne convient PAS aux désarticulations de hanche (absence de moignon)",
      "Durée : 3-6 mois (traumatique) ou 9-12 mois (artéritique/agénésie)",
      "Rééducation et réadaptation obligatoires"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PI 03 ZP 64D",
    nom: "Prothèse d'Entraînement Fémorale - PI 03 ZP 64D",
    categorie: "Prothèses - Membres Inférieurs",
    description: `Prothèse d'entraînement provisoire pour amputation fémorale (cuisse).
Prothèse mise en place après cicatrisation du moignon pour la rééducation et la réadaptation.

Composition :
• Emboîture de contact avec le moignon (avec ou sans appui sous ischiatique en polyéthylène)
• Genou prothétique (articulation type D)
• Segment jambier
• Pied prothétique (type 7 - pied à partie talonnière de souplesse variable et embase réglable, permettant équin ou rotation)
• Bretelles de maintien si nécessaire

Code nomenclature :
- PI = Prothèse Inférieure
- 03 = Niveau amputation fémorale
- ZP = Matériau d'entraînement (polyéthylène)
- 6 = Type de pied (pied à partie talonnière variable)
- 4 = Type d'emboîture
- D = Type d'articulation genou

Durée : 3 à 6 mois pour amputations traumatiques, 9 à 12 mois pour artéritiques/agénésies.
Passage obligatoire avant prothèse définitive.`,
    indications: [
      "Amputation fémorale quelle que soit son origine",
      "Agénésie congénitale fémorale",
      "Restitution du schéma corporel",
      "Récupération de la marche",
      "Évaluation des capacités à se déplacer avec prothèse",
      "Rééducation et réadaptation du malade"
    ],
    criteres_conformite: [
      "Prothèse d'entraînement provisoire uniquement",
      "Mise en place après cicatrisation complète du moignon",
      "Passage obligatoire avant prothèse définitive",
      "Ne convient PAS aux désarticulations de hanche (absence de moignon)",
      "Durée : 3-6 mois (traumatique) ou 9-12 mois (artéritique/agénésie)",
      "Rééducation et réadaptation obligatoires"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  // Prothèses d'entraînement tibiales
  {
    reference: "PI 06 ZP 63A",
    nom: "Prothèse d'Entraînement Tibiale - PI 06 ZP 63A",
    categorie: "Prothèses - Membres Inférieurs",
    description: `Prothèse d'entraînement provisoire pour amputation tibiale (jambe).
Prothèse mise en place après cicatrisation du moignon pour la rééducation et la réadaptation.

Composition :
• Manchon (soft socket) - élément intermédiaire entre emboîture et moignon
• Emboîture réalisée en polyéthylène
• Segment jambier
• Pied prothétique (type 6 - pied spécial ST)
• Bracelet en cuir pour bon maintien (optionnel)

Code nomenclature :
- PI = Prothèse Inférieure
- 06 = Niveau amputation tibiale
- ZP = Matériau d'entraînement (polyéthylène)
- 6 = Type de pied (pied spécial ST)
- 3 = Type d'emboîture
- A = Sans articulation

Durée : 3 à 6 mois pour amputations traumatiques, 9 à 12 mois pour artéritiques/agénésies.
Passage obligatoire avant prothèse définitive.`,
    indications: [
      "Amputation tibiale quelle que soit son origine",
      "Agénésie congénitale tibiale",
      "Restitution du schéma corporel",
      "Récupération de la marche",
      "Évaluation des capacités à se déplacer avec prothèse",
      "Rééducation et réadaptation du malade"
    ],
    criteres_conformite: [
      "Prothèse d'entraînement provisoire uniquement",
      "Mise en place après cicatrisation complète du moignon",
      "Passage obligatoire avant prothèse définitive",
      "Ne convient PAS aux désarticulations du genou (absence de moignon)",
      "Durée : 3-6 mois (traumatique) ou 9-12 mois (artéritique/agénésie)",
      "Rééducation et réadaptation obligatoires"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PI 06 ZP 64A",
    nom: "Prothèse d'Entraînement Tibiale - PI 06 ZP 64A",
    categorie: "Prothèses - Membres Inférieurs",
    description: `Prothèse d'entraînement provisoire pour amputation tibiale (jambe).
Prothèse mise en place après cicatrisation du moignon pour la rééducation et la réadaptation.

Composition :
• Manchon (soft socket) - élément intermédiaire entre emboîture et moignon
• Emboîture réalisée en polyéthylène
• Segment jambier
• Pied prothétique (type 7 - pied à partie talonnière variable)
• Bracelet en cuir pour bon maintien (optionnel)

Code nomenclature :
- PI = Prothèse Inférieure
- 06 = Niveau amputation tibiale
- ZP = Matériau d'entraînement (polyéthylène)
- 6 = Type de pied (pied à partie talonnière variable)
- 4 = Type d'emboîture
- A = Sans articulation

Durée : 3 à 6 mois pour amputations traumatiques, 9 à 12 mois pour artéritiques/agénésies.
Passage obligatoire avant prothèse définitive.`,
    indications: [
      "Amputation tibiale quelle que soit son origine",
      "Agénésie congénitale tibiale",
      "Restitution du schéma corporel",
      "Récupération de la marche",
      "Évaluation des capacités à se déplacer avec prothèse",
      "Rééducation et réadaptation du malade"
    ],
    criteres_conformite: [
      "Prothèse d'entraînement provisoire uniquement",
      "Mise en place après cicatrisation complète du moignon",
      "Passage obligatoire avant prothèse définitive",
      "Ne convient PAS aux désarticulations du genou (absence de moignon)",
      "Durée : 3-6 mois (traumatique) ou 9-12 mois (artéritique/agénésie)",
      "Rééducation et réadaptation obligatoires"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  // Prothèses définitives de désarticulation de la hanche (Prothèses Canadiennes)
  {
    reference: "PI 01 ZS 63G",
    nom: "Prothèse Canadienne (Désarticulation Hanche) - PI 01 ZS 63G",
    categorie: "Prothèses - Membres Inférieurs",
    description: `Prothèse définitive de marche pour désarticulation de la hanche (Prothèse Canadienne).

Composition :
• Coque pelvienne
• Pièce de hanche
• Segment fémoral
• Genou prothétique
• Segment jambier
• Pied prothétique (type 6 - pied spécial ST)
• Mousse de finition avec bas

Code nomenclature :
- PI = Prothèse Inférieure
- 01 = Niveau désarticulation hanche
- ZS = Matériau définitif (résine)
- 6 = Type de pied
- 3 = Type d'emboîture
- G = Type d'articulation hanche

Prothèse sans articulation avec finition en mousse.`,
    indications: [
      "Hémi pelvectomie",
      "Désarticulation de la hanche",
      "Amputation de la cuisse avec moignon très court"
    ],
    criteres_conformite: [
      "Conformité statique : bénéficiaire debout, bien équilibré, sans conflit prothèse/moignon",
      "Position assise correcte et confortable",
      "Conformité dynamique : marche correcte et indolore",
      "Adaptation parfaite de la coque pelvienne",
      "Absence de douleur lors de la marche"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PI 01 ZS 64G",
    nom: "Prothèse Canadienne (Désarticulation Hanche) - PI 01 ZS 64G",
    categorie: "Prothèses - Membres Inférieurs",
    description: `Prothèse définitive de marche pour désarticulation de la hanche (Prothèse Canadienne).

Composition :
• Coque pelvienne
• Pièce de hanche
• Segment fémoral
• Genou prothétique (avec articulation)
• Segment jambier
• Pied prothétique (type 7 - pied à partie talonnière variable)
• Mousse de finition avec bas

Code nomenclature :
- PI = Prothèse Inférieure
- 01 = Niveau désarticulation hanche
- ZS = Matériau définitif (résine)
- 6 = Type de pied
- 4 = Type d'emboîture
- G = Type d'articulation hanche

Prothèse avec articulation du genou.`,
    indications: [
      "Hémi pelvectomie",
      "Désarticulation de la hanche",
      "Amputation de la cuisse avec moignon très court"
    ],
    criteres_conformite: [
      "Conformité statique : bénéficiaire debout, bien équilibré, sans conflit prothèse/moignon",
      "Position assise correcte et confortable",
      "Conformité dynamique : marche correcte et indolore",
      "Adaptation parfaite de la coque pelvienne",
      "Articulation du genou fonctionnelle"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  // Prothèses définitives pour désarticulation du genou (Genou Gritti)
  {
    reference: "PI 04 ZS 63N",
    nom: "Prothèse Genou Gritti (Désarticulation Genou) - PI 04 ZS 63N",
    categorie: "Prothèses - Membres Inférieurs",
    description: `Prothèse définitive pour désarticulation du genou (Genou Gritti).

Composition :
• Manchon (soft socket) - élément intermédiaire entre emboîture et moignon
• Emboîture réalisée en résine
• Genou prothétique (genou Gritti)
• Segment jambier
• Pied prothétique (type 6 - pied spécial ST)
• Mousse de finition avec bas

Code nomenclature :
- PI = Prothèse Inférieure
- 04 = Niveau désarticulation genou
- ZS = Matériau définitif (résine)
- 6 = Type de pied
- 3 = Type d'emboîture
- N = Type d'articulation genou Gritti`,
    indications: [
      "Amputation sus condylienne",
      "Désarticulation du genou",
      "Amputation de la jambe avec moignon très court bloqué en flexion"
    ],
    criteres_conformite: [
      "Conformité statique : bénéficiaire debout, bien équilibré, sans conflit prothèse/moignon",
      "Position assise correcte et confortable",
      "Conformité dynamique : marche correcte et indolore",
      "Adaptation parfaite du genou Gritti",
      "Absence de douleur lors de la marche"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PI 04 ZS 64N",
    nom: "Prothèse Genou Gritti (Désarticulation Genou) - PI 04 ZS 64N",
    categorie: "Prothèses - Membres Inférieurs",
    description: `Prothèse définitive pour désarticulation du genou (Genou Gritti).

Composition :
• Manchon (soft socket) - élément intermédiaire entre emboîture et moignon
• Emboîture réalisée en résine
• Genou prothétique (genou Gritti)
• Segment jambier
• Pied prothétique (type 7 - pied à partie talonnière variable)
• Mousse de finition avec bas

Code nomenclature :
- PI = Prothèse Inférieure
- 04 = Niveau désarticulation genou
- ZS = Matériau définitif (résine)
- 6 = Type de pied
- 4 = Type d'emboîture
- N = Type d'articulation genou Gritti`,
    indications: [
      "Amputation sus condylienne",
      "Désarticulation du genou",
      "Amputation de la jambe avec moignon très court bloqué en flexion"
    ],
    criteres_conformite: [
      "Conformité statique : bénéficiaire debout, bien équilibré, sans conflit prothèse/moignon",
      "Position assise correcte et confortable",
      "Conformité dynamique : marche correcte et indolore",
      "Adaptation parfaite du genou Gritti",
      "Absence de douleur lors de la marche"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PI 05 ZS 63N",
    nom: "Prothèse Genou Gritti (Désarticulation Genou) - PI 05 ZS 63N",
    categorie: "Prothèses - Membres Inférieurs",
    description: `Prothèse définitive pour désarticulation du genou (Genou Gritti) - Niveau 05.

Composition :
• Manchon (soft socket) - élément intermédiaire entre emboîture et moignon
• Emboîture réalisée en résine
• Genou prothétique (genou Gritti)
• Segment jambier
• Pied prothétique (type 6 - pied spécial ST)
• Mousse de finition avec bas

Code nomenclature :
- PI = Prothèse Inférieure
- 05 = Niveau désarticulation genou variant
- ZS = Matériau définitif (résine)
- 6 = Type de pied
- 3 = Type d'emboîture
- N = Type d'articulation genou Gritti`,
    indications: [
      "Amputation sus condylienne",
      "Désarticulation du genou",
      "Amputation de la jambe avec moignon très court bloqué en flexion"
    ],
    criteres_conformite: [
      "Conformité statique : bénéficiaire debout, bien équilibré, sans conflit prothèse/moignon",
      "Position assise correcte et confortable",
      "Conformité dynamique : marche correcte et indolore",
      "Adaptation parfaite du genou Gritti",
      "Absence de douleur lors de la marche"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PI 05 ZS 64N",
    nom: "Prothèse Genou Gritti (Désarticulation Genou) - PI 05 ZS 64N",
    categorie: "Prothèses - Membres Inférieurs",
    description: `Prothèse définitive pour désarticulation du genou (Genou Gritti) - Niveau 05.

Composition :
• Manchon (soft socket) - élément intermédiaire entre emboîture et moignon
• Emboîture réalisée en résine
• Genou prothétique (genou Gritti)
• Segment jambier
• Pied prothétique (type 7 - pied à partie talonnière variable)
• Mousse de finition avec bas

Code nomenclature :
- PI = Prothèse Inférieure
- 05 = Niveau désarticulation genou variant
- ZS = Matériau définitif (résine)
- 6 = Type de pied
- 4 = Type d'emboîture
- N = Type d'articulation genou Gritti`,
    indications: [
      "Amputation sus condylienne",
      "Désarticulation du genou",
      "Amputation de la jambe avec moignon très court bloqué en flexion"
    ],
    criteres_conformite: [
      "Conformité statique : bénéficiaire debout, bien équilibré, sans conflit prothèse/moignon",
      "Position assise correcte et confortable",
      "Conformité dynamique : marche correcte et indolore",
      "Adaptation parfaite du genou Gritti",
      "Absence de douleur lors de la marche"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  // Prothèses définitives de désarticulation de la cheville (Symes)
  {
    reference: "PI 07 SS 22A",
    nom: "Prothèse Symes (Désarticulation Cheville) - PI 07 SS 22A",
    categorie: "Prothèses - Membres Inférieurs",
    description: `Prothèse définitive pour désarticulation de la cheville (Prothèse Symes).

Composition :
• Manchon (soft socket) - élément intermédiaire entre emboîture et moignon
• Emboîture en contact avec moignon, réalisée en résine
• Bas de cheville
• Pied prothétique (type 2 - pied standard)

Code nomenclature :
- PI = Prothèse Inférieure
- 07 = Niveau désarticulation cheville
- SS = Matériau silicone/résine
- 2 = Type de pied (pied standard)
- 2 = Type d'emboîture variant
- A = Sans articulation`,
    indications: [
      "Désarticulation de la tibio-tarsienne",
      "Amputation sus malléolaire"
    ],
    criteres_conformite: [
      "Conformité statique : bénéficiaire debout, bien équilibré, sans conflit prothèse/moignon",
      "Position assise correcte et confortable",
      "Conformité dynamique : marche correcte et indolore",
      "Adaptation parfaite de l'emboîture au moignon",
      "Absence de douleur lors de la marche"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PI 07 SS 43A",
    nom: "Prothèse Symes (Désarticulation Cheville) - PI 07 SS 43A",
    categorie: "Prothèses - Membres Inférieurs",
    description: `Prothèse définitive pour désarticulation de la cheville (Prothèse Symes).

Composition :
• Manchon (soft socket) - élément intermédiaire entre emboîture et moignon
• Emboîture en contact avec moignon, réalisée en résine
• Bas de cheville
• Pied prothétique (type 4 - pied avec embase réglable)

Code nomenclature :
- PI = Prothèse Inférieure
- 07 = Niveau désarticulation cheville
- SS = Matériau silicone/résine
- 4 = Type de pied (pied avec embase réglable)
- 3 = Type d'emboîture
- A = Sans articulation`,
    indications: [
      "Désarticulation de la tibio-tarsienne",
      "Amputation sus malléolaire"
    ],
    criteres_conformite: [
      "Conformité statique : bénéficiaire debout, bien équilibré, sans conflit prothèse/moignon",
      "Position assise correcte et confortable",
      "Conformité dynamique : marche correcte et indolore",
      "Adaptation parfaite de l'emboîture au moignon",
      "Absence de douleur lors de la marche"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PI 07 SS 44A",
    nom: "Prothèse Symes (Désarticulation Cheville) - PI 07 SS 44A",
    categorie: "Prothèses - Membres Inférieurs",
    description: `Prothèse définitive pour désarticulation de la cheville (Prothèse Symes).

Composition :
• Manchon (soft socket) - élément intermédiaire entre emboîture et moignon
• Emboîture en contact avec moignon, réalisée en résine
• Bas de cheville
• Pied prothétique (type 4 - pied avec embase réglable)

Code nomenclature :
- PI = Prothèse Inférieure
- 07 = Niveau désarticulation cheville
- SS = Matériau silicone/résine
- 4 = Type de pied (pied avec embase réglable)
- 4 = Type d'emboîture variant
- A = Sans articulation`,
    indications: [
      "Désarticulation de la tibio-tarsienne",
      "Amputation sus malléolaire"
    ],
    criteres_conformite: [
      "Conformité statique : bénéficiaire debout, bien équilibré, sans conflit prothèse/moignon",
      "Position assise correcte et confortable",
      "Conformité dynamique : marche correcte et indolore",
      "Adaptation parfaite de l'emboîture au moignon",
      "Absence de douleur lors de la marche"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PI 07 SS 43C",
    nom: "Prothèse Symes (Désarticulation Cheville) - PI 07 SS 43C",
    categorie: "Prothèses - Membres Inférieurs",
    description: `Prothèse définitive pour désarticulation de la cheville (Prothèse Symes).

Composition :
• Manchon (soft socket) - élément intermédiaire entre emboîture et moignon
• Emboîture en contact avec moignon, réalisée en résine
• Bas de cheville
• Pied prothétique (type 4 - pied avec embase réglable)

Code nomenclature :
- PI = Prothèse Inférieure
- 07 = Niveau désarticulation cheville
- SS = Matériau silicone/résine
- 4 = Type de pied (pied avec embase réglable)
- 3 = Type d'emboîture
- C = Type d'articulation variant`,
    indications: [
      "Désarticulation de la tibio-tarsienne",
      "Amputation sus malléolaire"
    ],
    criteres_conformite: [
      "Conformité statique : bénéficiaire debout, bien équilibré, sans conflit prothèse/moignon",
      "Position assise correcte et confortable",
      "Conformité dynamique : marche correcte et indolore",
      "Adaptation parfaite de l'emboîture au moignon",
      "Absence de douleur lors de la marche"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  // Ortho-prothèses
  {
    reference: "PI 28 SS 14A",
    nom: "Ortho-Prothèse Enfant (Patin) - PI 28 SS 14A",
    categorie: "Prothèses - Membres Inférieurs",
    description: `Ortho-prothèse pour enfant à l'acquisition de la marche (Patin).
Combine les fonctions d'orthèse et de prothèse pour compenser le déficit de longueur du membre et guider/soutenir la portion restante.

Composition :
• Partie supérieure (orthétique) : gouttière ouverte ou fermée qui englobe le segment existant
• Partie inférieure (prothétique) : restitue le segment manquant avec patin
• Sans articulation au genou pour enfant en croissance
• Segment jambier tubulaire (pour croissance)

Code nomenclature :
- PI = Prothèse Inférieure
- 28 = Niveau ortho-prothèse enfant
- SS = Matériau silicone/résine
- 1 = Type de pied (patin)
- 4 = Type d'emboîture
- A = Sans articulation

But : Recréer capacités fonctionnelles avec symétrie morphologique et réintégration du schéma corporel.`,
    indications: [
      "Malformation congénitale du membre inférieur chez l'enfant",
      "Agénésie membre inférieur avec raccourcissement > 10 cm",
      "Déformations articulaires associées",
      "Acquisition de la marche chez l'enfant"
    ],
    criteres_conformite: [
      "Adaptation à la croissance de l'enfant",
      "Segment jambier tubulaire obligatoire (croissance)",
      "Partie orthétique englobant correctement le segment existant",
      "Partie prothétique compensant le déficit de longueur",
      "Patin adapté pour acquisition de la marche",
      "Absence de conflit et de douleur"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PI 48 SS 23A",
    nom: "Ortho-Prothèse Adulte - PI 48 SS 23A",
    categorie: "Prothèses - Membres Inférieurs",
    description: `Ortho-prothèse pour adulte.
Combine les fonctions d'orthèse et de prothèse pour compenser le déficit de longueur du membre et guider/soutenir la portion restante.

Composition :
• Partie supérieure (orthétique) : gouttière ouverte ou fermée qui englobe le segment existant
• Partie inférieure (prothétique) : restitue le segment manquant
• Sans articulation au niveau du genou
• Pied prothétique

Code nomenclature :
- PI = Prothèse Inférieure
- 48 = Niveau ortho-prothèse adulte
- SS = Matériau silicone/résine
- 2 = Type de pied
- 3 = Type d'emboîture
- A = Sans articulation

But : Recréer capacités fonctionnelles avec symétrie morphologique et réintégration du schéma corporel.`,
    indications: [
      "Malformation congénitale du membre inférieur chez l'adulte",
      "Agénésie membre inférieur avec raccourcissement > 10 cm",
      "Déformations articulaires associées",
      "Compensation importante de longueur nécessaire"
    ],
    criteres_conformite: [
      "Partie orthétique englobant correctement le segment existant",
      "Partie prothétique compensant le déficit de longueur",
      "Adaptation parfaite sans conflit ni douleur",
      "Symétrie morphologique restaurée",
      "Marche correcte et indolore"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PI 48 SS 24A",
    nom: "Ortho-Prothèse Adulte - PI 48 SS 24A",
    categorie: "Prothèses - Membres Inférieurs",
    description: `Ortho-prothèse pour adulte (variant).
Combine les fonctions d'orthèse et de prothèse pour compenser le déficit de longueur du membre et guider/soutenir la portion restante.

Composition :
• Partie supérieure (orthétique) : gouttière ouverte ou fermée qui englobe le segment existant
• Partie inférieure (prothétique) : restitue le segment manquant
• Sans articulation au niveau du genou
• Pied prothétique

Code nomenclature :
- PI = Prothèse Inférieure
- 48 = Niveau ortho-prothèse adulte
- SS = Matériau silicone/résine
- 2 = Type de pied
- 4 = Type d'emboîture variant
- A = Sans articulation

But : Recréer capacités fonctionnelles avec symétrie morphologique et réintégration du schéma corporel.`,
    indications: [
      "Malformation congénitale du membre inférieur chez l'adulte",
      "Agénésie membre inférieur avec raccourcissement > 10 cm",
      "Déformations articulaires associées",
      "Compensation importante de longueur nécessaire"
    ],
    criteres_conformite: [
      "Partie orthétique englobant correctement le segment existant",
      "Partie prothétique compensant le déficit de longueur",
      "Adaptation parfaite sans conflit ni douleur",
      "Symétrie morphologique restaurée",
      "Marche correcte et indolore"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  // ========== AIDES SANITAIRES - POCHES DE STOMIE ==========
  // Section 6.1.2 - Stomies digestives - Colostomie
  {
    reference: "PPSC001",
    nom: "Poche Colostomie Monobloc (Système 1 pièce)",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Poche de colostomie monobloc - système une pièce pour stomies digestives.

Composition :
• Protecteur cutané (support adhésif) solidaire à la poche
• L'ensemble du système est retiré à chaque changement
• Poche fermée (généralement) ou vidangeable selon besoins

Code nomenclature :
- P = Poche
- P = Pour
- S = Stomie
- C = Colon
- 001 = Monobloc (système 1 pièce)

Usage : Colostomie (stomie du côlon) - généralement sur partie gauche de l'abdomen.
Types de colostomie :
• Colostomie gauche : Selles pâteuses ou molles, évacuation normale
• Colostomie transverse : Selles pâteuses, évacuation fréquente
• Colostomie droite : Selles semi-liquides et irritantes, évacuation fréquente

Remarque : Une pâte de protection PSPPS01 peut être prescrite pour prévenir les fuites et combler les plis cutanés.`,
    indications: [
      "Colostomie terminale gauche (selles pâteuses/molles)",
      "Colostomie transverse (selles pâteuses)",
      "Colostomie droite (selles semi-liquides)",
      "Cancer du côlon ou du rectum",
      "Occlusions intestinales",
      "Lésions caustiques",
      "Accidents de la voie publique avec lésions intestinales",
      "Stomie temporaire ou permanente"
    ],
    criteres_conformite: [
      "Protecteur cutané solidaire à la poche",
      "Système une pièce (monobloc)",
      "Changement complet du dispositif à chaque fois",
      "Poche fermée pour colostomie gauche (selles normales)",
      "Poche vidangeable si selles fluides (chimiothérapie, radiothérapie, infection)",
      "Étanchéité parfaite pour éviter les fuites",
      "Protection cutanée efficace"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "PPSC01",
    nom: "Poche Colostomie Bi-Bloc Ø40mm (Système 2 pièces)",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Poche de colostomie bi-bloc - système deux pièces pour stomies digestives.

Composition :
• Protecteur cutané (support adhésif) séparé
• Poche de recueil amovible
• Fixation par couplage mécanique ou adhésif
• Diamètre stomie : 40mm

Code nomenclature :
- P = Poche
- P = Pour
- S = Stomie
- C = Colon
- 01 = Diamètre stomie 40mm

Avantages système bi-bloc :
• Support reste en place 2-3 jours
• Changement de poche seul (minimum 1x/jour)
• Économique et confortable

Remarque : Pâte de protection PSPPS01 disponible pour prévenir les fuites.`,
    indications: [
      "Colostomie terminale avec diamètre stomie 40mm",
      "Cancer du côlon ou du rectum",
      "Stomie temporaire ou permanente",
      "Préférence pour système économique (changement poche seule)"
    ],
    criteres_conformite: [
      "Système deux pièces (bi-bloc)",
      "Support adhésif séparé de la poche",
      "Support peut rester 2-3 jours en place",
      "Poche changée minimum 1 fois par jour",
      "Fixation mécanique ou adhésive sécurisée",
      "Diamètre adapté à la stomie (40mm)",
      "Étanchéité parfaite"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "PPSC02",
    nom: "Poche Colostomie Bi-Bloc Ø45mm (Système 2 pièces)",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Poche de colostomie bi-bloc - système deux pièces - Diamètre stomie 45mm.`,
    indications: [
      "Colostomie terminale avec diamètre stomie 45mm",
      "Cancer du côlon ou du rectum",
      "Stomie temporaire ou permanente"
    ],
    criteres_conformite: [
      "Système deux pièces (bi-bloc)",
      "Diamètre adapté à la stomie (45mm)",
      "Support reste 2-3 jours, poche changée 1x/jour minimum",
      "Étanchéité parfaite"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "PPSC03",
    nom: "Poche Colostomie Bi-Bloc Ø50mm (Système 2 pièces)",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Poche de colostomie bi-bloc - système deux pièces - Diamètre stomie 50mm.`,
    indications: [
      "Colostomie terminale avec diamètre stomie 50mm",
      "Cancer du côlon ou du rectum",
      "Stomie temporaire ou permanente"
    ],
    criteres_conformite: [
      "Système deux pièces (bi-bloc)",
      "Diamètre adapté à la stomie (50mm)",
      "Support reste 2-3 jours, poche changée 1x/jour minimum",
      "Étanchéité parfaite"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "PPSC04",
    nom: "Poche Colostomie Bi-Bloc Ø55mm (Système 2 pièces)",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Poche de colostomie bi-bloc - système deux pièces - Diamètre stomie 55mm.`,
    indications: [
      "Colostomie terminale avec diamètre stomie 55mm",
      "Cancer du côlon ou du rectum",
      "Stomie temporaire ou permanente"
    ],
    criteres_conformite: [
      "Système deux pièces (bi-bloc)",
      "Diamètre adapté à la stomie (55mm)",
      "Support reste 2-3 jours, poche changée 1x/jour minimum",
      "Étanchéité parfaite"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "PPSC05",
    nom: "Poche Colostomie Bi-Bloc Ø60mm (Système 2 pièces)",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Poche de colostomie bi-bloc - système deux pièces - Diamètre stomie 60mm.`,
    indications: [
      "Colostomie terminale avec diamètre stomie 60mm",
      "Cancer du côlon ou du rectum",
      "Stomie temporaire ou permanente"
    ],
    criteres_conformite: [
      "Système deux pièces (bi-bloc)",
      "Diamètre adapté à la stomie (60mm)",
      "Support reste 2-3 jours, poche changée 1x/jour minimum",
      "Étanchéité parfaite"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "PPSC06",
    nom: "Poche Colostomie Bi-Bloc Ø65mm (Système 2 pièces)",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Poche de colostomie bi-bloc - système deux pièces - Diamètre stomie 65mm.`,
    indications: [
      "Colostomie terminale avec diamètre stomie 65mm",
      "Cancer du côlon ou du rectum",
      "Stomie temporaire ou permanente"
    ],
    criteres_conformite: [
      "Système deux pièces (bi-bloc)",
      "Diamètre adapté à la stomie (65mm)",
      "Support reste 2-3 jours, poche changée 1x/jour minimum",
      "Étanchéité parfaite"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "PPSC07",
    nom: "Poche Colostomie Bi-Bloc Ø70mm (Système 2 pièces)",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Poche de colostomie bi-bloc - système deux pièces - Diamètre stomie 70mm.`,
    indications: [
      "Colostomie terminale avec diamètre stomie 70mm",
      "Cancer du côlon ou du rectum",
      "Stomie temporaire ou permanente"
    ],
    criteres_conformite: [
      "Système deux pièces (bi-bloc)",
      "Diamètre adapté à la stomie (70mm)",
      "Support reste 2-3 jours, poche changée 1x/jour minimum",
      "Étanchéité parfaite"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  // Section 6.1.2.3 - Stomies digestives - Iléostomie
  {
    reference: "PPSI001",
    nom: "Poche Iléostomie Monobloc (Système 1 pièce)",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Poche d'iléostomie monobloc - système une pièce pour stomies de l'iléon.

Composition :
• Protecteur cutané (support adhésif) solidaire à la poche
• L'ensemble du système est retiré à chaque changement
• Poche vidangeable (nécessaire car selles liquides)

Code nomenclature :
- P = Poche
- P = Pour
- S = Stomie
- I = Iléon
- 001 = Monobloc (système 1 pièce)

Usage : Iléostomie terminale - une partie de l'intestin grêle (iléon) amenée à la surface de l'abdomen.
Placement : Généralement sur partie droite de l'abdomen.
Type de selles : Liquides (nécessite poche vidangeable).

Remarque : Pâte de protection PSPPS01 disponible pour prévenir les fuites et combler les plis cutanés.`,
    indications: [
      "Iléostomie terminale (stomie de l'iléon)",
      "Cancer colorectal nécessitant ablation du côlon",
      "Maladies inflammatoires chroniques intestinales (Crohn, RCH)",
      "Stomie temporaire (mise au repos intestin) ou permanente",
      "Selles liquides nécessitant poche vidangeable"
    ],
    criteres_conformite: [
      "Système une pièce (monobloc)",
      "Protecteur cutané solidaire à la poche",
      "Poche vidangeable obligatoire (selles liquides)",
      "Changement complet du dispositif",
      "Vidange dans la journée selon besoins",
      "Changement minimum 1 fois par jour",
      "Étanchéité parfaite pour selles liquides"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "PPSI01",
    nom: "Poche Iléostomie Bi-Bloc Ø40mm (Système 2 pièces)",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Poche d'iléostomie bi-bloc - système deux pièces - Diamètre stomie 40mm.

Composition :
• Protecteur cutané (support adhésif) séparé
• Poche de recueil vidangeable amovible
• Fixation par couplage mécanique ou adhésif
• Diamètre stomie : 40mm

Code nomenclature :
- P = Poche
- P = Pour
- S = Stomie
- I = Iléon
- 01 = Diamètre stomie 40mm

Avantages système bi-bloc :
• Support reste en place 2-3 jours
• Poche vidée dans la journée
• Changement de poche minimum 1x/jour
• Économique et confortable

Remarque : Pâte de protection PSPPS01 disponible.`,
    indications: [
      "Iléostomie terminale avec diamètre stomie 40mm",
      "Cancer colorectal, maladies inflammatoires chroniques intestinales",
      "Stomie temporaire ou permanente",
      "Préférence pour système bi-bloc économique"
    ],
    criteres_conformite: [
      "Système deux pièces (bi-bloc)",
      "Support reste 2-3 jours, poche vidée selon besoins",
      "Poche vidangeable pour selles liquides",
      "Diamètre adapté à la stomie (40mm)",
      "Étanchéité parfaite"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "PPSI02",
    nom: "Poche Iléostomie Bi-Bloc Ø45mm (Système 2 pièces)",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Poche d'iléostomie bi-bloc - système deux pièces - Diamètre stomie 45mm.`,
    indications: [
      "Iléostomie terminale avec diamètre stomie 45mm",
      "Cancer colorectal, maladies inflammatoires chroniques intestinales",
      "Stomie temporaire ou permanente"
    ],
    criteres_conformite: [
      "Système deux pièces (bi-bloc)",
      "Diamètre adapté (45mm)",
      "Poche vidangeable",
      "Étanchéité parfaite"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "PPSI03",
    nom: "Poche Iléostomie Bi-Bloc Ø50mm (Système 2 pièces)",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Poche d'iléostomie bi-bloc - système deux pièces - Diamètre stomie 50mm.`,
    indications: [
      "Iléostomie terminale avec diamètre stomie 50mm",
      "Cancer colorectal, maladies inflammatoires chroniques intestinales",
      "Stomie temporaire ou permanente"
    ],
    criteres_conformite: [
      "Système deux pièces (bi-bloc)",
      "Diamètre adapté (50mm)",
      "Poche vidangeable",
      "Étanchéité parfaite"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "PPSI04",
    nom: "Poche Iléostomie Bi-Bloc Ø55mm (Système 2 pièces)",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Poche d'iléostomie bi-bloc - système deux pièces - Diamètre stomie 55mm.`,
    indications: [
      "Iléostomie terminale avec diamètre stomie 55mm",
      "Cancer colorectal, maladies inflammatoires chroniques intestinales",
      "Stomie temporaire ou permanente"
    ],
    criteres_conformite: [
      "Système deux pièces (bi-bloc)",
      "Diamètre adapté (55mm)",
      "Poche vidangeable",
      "Étanchéité parfaite"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "PPSI05",
    nom: "Poche Iléostomie Bi-Bloc Ø60mm (Système 2 pièces)",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Poche d'iléostomie bi-bloc - système deux pièces - Diamètre stomie 60mm.`,
    indications: [
      "Iléostomie terminale avec diamètre stomie 60mm",
      "Cancer colorectal, maladies inflammatoires chroniques intestinales",
      "Stomie temporaire ou permanente"
    ],
    criteres_conformite: [
      "Système deux pièces (bi-bloc)",
      "Diamètre adapté (60mm)",
      "Poche vidangeable",
      "Étanchéité parfaite"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "PPSI06",
    nom: "Poche Iléostomie Bi-Bloc Ø65-70mm (Système 2 pièces)",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Poche d'iléostomie bi-bloc - système deux pièces - Diamètre stomie 65-70mm.`,
    indications: [
      "Iléostomie terminale avec diamètre stomie 65-70mm",
      "Cancer colorectal, maladies inflammatoires chroniques intestinales",
      "Stomie temporaire ou permanente"
    ],
    criteres_conformite: [
      "Système deux pièces (bi-bloc)",
      "Diamètre adapté (65-70mm)",
      "Poche vidangeable",
      "Étanchéité parfaite"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  // Supports pour stomies (utilisés avec poches bi-bloc)
  {
    reference: "SPPS01",
    nom: "Support Pour Stomie Ø40mm (Protecteur cutané)",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Support adhésif (protecteur cutané) pour poches de stomie bi-bloc - Diamètre 40mm.

Code nomenclature :
- SP = Support
- P = Pour
- S = Stomie
- 01 = Diamètre support 40mm

Usage : Utilisé avec poches bi-bloc colostomie ou iléostomie.
Durée : Reste en place 2-3 jours, changement de la poche seule.

Remarque : Pâte de protection PSPPS01 peut être prescrite pour prévenir fuites et combler plis cutanés.`,
    indications: [
      "Support pour poche colostomie bi-bloc (PPSC01)",
      "Support pour poche iléostomie bi-bloc (PPSI01)",
      "Stomie avec diamètre 40mm",
      "Système deux pièces économique"
    ],
    criteres_conformite: [
      "Diamètre adapté à la stomie (40mm)",
      "Adhésif hypoallergénique",
      "Résiste 2-3 jours en place",
      "Compatible avec couplage mécanique ou adhésif",
      "Protection cutanée efficace"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "SPPS02",
    nom: "Support Pour Stomie Ø50mm (Protecteur cutané)",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Support adhésif pour poches bi-bloc - Diamètre 50mm.`,
    indications: [
      "Support pour poches bi-bloc colostomie/iléostomie",
      "Stomie diamètre 50mm"
    ],
    criteres_conformite: [
      "Diamètre 50mm",
      "Reste 2-3 jours en place",
      "Protection cutanée"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "SPPS03",
    nom: "Support Pour Stomie Ø60mm (Protecteur cutané)",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Support adhésif pour poches bi-bloc - Diamètre 60mm.`,
    indications: [
      "Support pour poches bi-bloc colostomie/iléostomie",
      "Stomie diamètre 60mm"
    ],
    criteres_conformite: [
      "Diamètre 60mm",
      "Reste 2-3 jours en place",
      "Protection cutanée"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "SPPS04",
    nom: "Support Pour Stomie Ø70mm (Protecteur cutané)",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Support adhésif pour poches bi-bloc - Diamètre 70mm.`,
    indications: [
      "Support pour poches bi-bloc colostomie/iléostomie",
      "Stomie diamètre 70mm"
    ],
    criteres_conformite: [
      "Diamètre 70mm",
      "Reste 2-3 jours en place",
      "Protection cutanée"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "SPPS05",
    nom: "Support Pour Stomie Ø80mm (Protecteur cutané)",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Support adhésif pour poches bi-bloc - Diamètre 80mm.`,
    indications: [
      "Support pour poches bi-bloc colostomie/iléostomie",
      "Stomie diamètre 80mm"
    ],
    criteres_conformite: [
      "Diamètre 80mm",
      "Reste 2-3 jours en place",
      "Protection cutanée"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "SPPS06",
    nom: "Support Pour Stomie Ø90mm (Protecteur cutané)",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Support adhésif pour poches bi-bloc - Diamètre 90mm.`,
    indications: [
      "Support pour poches bi-bloc colostomie/iléostomie",
      "Stomie diamètre 90mm"
    ],
    criteres_conformite: [
      "Diamètre 90mm",
      "Reste 2-3 jours en place",
      "Protection cutanée"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "SPPS07",
    nom: "Support Pour Stomie Ø100mm (Protecteur cutané)",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Support adhésif pour poches bi-bloc - Diamètre 100mm.`,
    indications: [
      "Support pour poches bi-bloc colostomie/iléostomie",
      "Stomie diamètre 100mm"
    ],
    criteres_conformite: [
      "Diamètre 100mm",
      "Reste 2-3 jours en place",
      "Protection cutanée"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "PSPPS01",
    nom: "Pâte de Protection Pour Stomie",
    categorie: "Aides Sanitaires - Stomies Digestives",
    description: `Pâte de protection cutanée pour poches de stomie (monobloc ou bi-bloc).

Code nomenclature :
- PS = Pâte de protection pour Stomie
- P = Pour
- PS = Poche Stomie
- 01 = Référence unique

Rôle :
• Prévention des fuites par création d'une surface plane favorable à la fixation du support
• Combler les plis cutanés autour de la stomie
• Protection cutanée renforcée

Utilisation : Avec poches monobloc ou bi-bloc (colostomie et iléostomie).`,
    indications: [
      "Protection cutanée renforcée pour stomies",
      "Prévention des fuites de poche de stomie",
      "Comblement des plis cutanés péri-stomie",
      "Utilisé avec PPSC001, PPSC01-07, PPSI001, PPSI01-06"
    ],
    criteres_conformite: [
      "Pâte hypoallergénique",
      "Créé surface plane pour fixation support",
      "Comble efficacement les plis cutanés",
      "Compatible avec tous types de poches",
      "Prévention des fuites"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  // Section 6.1.3 - Stomies urinaires - Urostomie
  {
    reference: "PPSU001",
    nom: "Poche Urostomie Monobloc (Système 1 pièce)",
    categorie: "Aides Sanitaires - Stomies Urinaires",
    description: `Poche d'urostomie monobloc - système une pièce pour stomies urinaires.

Composition :
• Protecteur cutané (support adhésif) solidaire à la poche
• Sac collecteur d'urines avec robinet de vidange
• Poche vidangeable (écoulement permanent des urines)
• L'ensemble du système est retiré à chaque changement

Code nomenclature :
- P = Poche
- P = Pour
- S = Stomie
- U = Urinaire
- 001 = Monobloc (système 1 pièce)

Usage : Urostomie (urétérostomie) - dérivation urinaire permanente.
Types de dérivations :
• Dérivation indirecte (Bricker) - la plus fréquente : 2 uretères implantés dans segment iléon abouché à peau, 1 poche
• Dérivation directe en canon de fusil : abouchement 2 uretères juxtaposés, 1 poche
• Dérivation directe bilatérale : chaque uretère abouché à peau, 2 poches

Remarque : Pâte de protection PSPPS01 peut être prescrite pour prévenir fuites et combler plis cutanés.`,
    indications: [
      "Urostomie (urétérostomie) permanente",
      "Dérivation urinaire indirecte (Bricker)",
      "Dérivation urinaire directe (canon fusil ou bilatérale)",
      "Cancer de la vessie ou de voisinage",
      "Cancer de la prostate",
      "Maladies inflammatoires/infectieuses (tuberculose, bilharziose)",
      "Vessie neurologique (spina bifida, blessés médullaires)",
      "Exstrophie vésicale congénitale",
      "Rupture vessie ou urètre (traumatique)",
      "Cystite post-radique, sclérose vessie (iatrogène)"
    ],
    criteres_conformite: [
      "Système une pièce (monobloc)",
      "Protecteur cutané solidaire à la poche",
      "Poche vidangeable obligatoire (écoulement permanent urines)",
      "Robinet de vidange fonctionnel",
      "Changement complet du dispositif",
      "Étanchéité parfaite pour urines",
      "Compatible avec dérivations urinaires (Bricker, directe)"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "PPSU01",
    nom: "Poche Urostomie Bi-Bloc Ø40mm (Système 2 pièces)",
    categorie: "Aides Sanitaires - Stomies Urinaires",
    description: `Poche d'urostomie bi-bloc - système deux pièces - Diamètre stomie 40mm.

Composition :
• Protecteur cutané (support adhésif) séparé
• Poche de recueil vidangeable amovible avec robinet
• Fixation par couplage mécanique ou adhésif
• Diamètre stomie : 40mm

Code nomenclature :
- P = Poche
- P = Pour
- S = Stomie
- U = Urinaire
- 01 = Diamètre stomie 40mm

Avantages système bi-bloc :
• Support reste en place 2-3 jours
• Poche vidée dans la journée via robinet
• Changement de poche minimum 1x/jour
• Économique et confortable

Remarque : Pâte de protection PSPPS01 disponible.`,
    indications: [
      "Urostomie avec diamètre stomie 40mm",
      "Cancer vessie/prostate, maladies inflammatoires",
      "Vessie neurologique, exstrophie vésicale",
      "Dérivation urinaire permanente",
      "Préférence pour système bi-bloc économique"
    ],
    criteres_conformite: [
      "Système deux pièces (bi-bloc)",
      "Support reste 2-3 jours, poche vidée selon besoins",
      "Poche vidangeable avec robinet",
      "Diamètre adapté à la stomie (40mm)",
      "Étanchéité parfaite pour urines"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "PPSU02",
    nom: "Poche Urostomie Bi-Bloc Ø50mm (Système 2 pièces)",
    categorie: "Aides Sanitaires - Stomies Urinaires",
    description: `Poche d'urostomie bi-bloc - système deux pièces - Diamètre stomie 50mm.`,
    indications: [
      "Urostomie avec diamètre stomie 50mm",
      "Cancer vessie/prostate, maladies inflammatoires",
      "Dérivation urinaire permanente"
    ],
    criteres_conformite: [
      "Système deux pièces (bi-bloc)",
      "Diamètre adapté (50mm)",
      "Poche vidangeable avec robinet",
      "Étanchéité parfaite"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "PPSU03",
    nom: "Poche Urostomie Bi-Bloc Ø60mm (Système 2 pièces)",
    categorie: "Aides Sanitaires - Stomies Urinaires",
    description: `Poche d'urostomie bi-bloc - système deux pièces - Diamètre stomie 60mm.`,
    indications: [
      "Urostomie avec diamètre stomie 60mm",
      "Cancer vessie/prostate, maladies inflammatoires",
      "Dérivation urinaire permanente"
    ],
    criteres_conformite: [
      "Système deux pièces (bi-bloc)",
      "Diamètre adapté (60mm)",
      "Poche vidangeable avec robinet",
      "Étanchéité parfaite"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "PPSU04",
    nom: "Poche Urostomie Bi-Bloc Ø65mm (Système 2 pièces)",
    categorie: "Aides Sanitaires - Stomies Urinaires",
    description: `Poche d'urostomie bi-bloc - système deux pièces - Diamètre stomie 65mm.`,
    indications: [
      "Urostomie avec diamètre stomie 65mm",
      "Cancer vessie/prostate, maladies inflammatoires",
      "Dérivation urinaire permanente"
    ],
    criteres_conformite: [
      "Système deux pièces (bi-bloc)",
      "Diamètre adapté (65mm)",
      "Poche vidangeable avec robinet",
      "Étanchéité parfaite"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  {
    reference: "PPSU05",
    nom: "Poche Urostomie Bi-Bloc Ø70mm (Système 2 pièces)",
    categorie: "Aides Sanitaires - Stomies Urinaires",
    description: `Poche d'urostomie bi-bloc - système deux pièces - Diamètre stomie 70mm.`,
    indications: [
      "Urostomie avec diamètre stomie 70mm",
      "Cancer vessie/prostate, maladies inflammatoires",
      "Dérivation urinaire permanente"
    ],
    criteres_conformite: [
      "Système deux pièces (bi-bloc)",
      "Diamètre adapté (70mm)",
      "Poche vidangeable avec robinet",
      "Étanchéité parfaite"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  // ========== MATELAS ANTI-ESCARRES ==========
  {
    reference: "MAT 100",
    nom: "Matelas Anti-Escarres à Air Dynamique (motorisé)",
    categorie: "Aides Sanitaires - Prévention Escarres",
    description: `Matelas anti-escarres à air avec flux motorisé - Matelas dynamique.

Le matelas anti-escarres permet à un patient alité de rester en position couchée tout en assurant une meilleure répartition de sa masse, en multipliant ainsi les points de pression. L'objectif est d'éviter les pressions trop importantes et prolongées afin d'empêcher tout risque d'escarres.

Composition :
• Matelas à air équipé d'une motorisation silencieuse
• Gonflage/dégonflage alterné ou continu automatique
• Chaque partie du matelas se gonfle ou se dégonfle régulièrement afin de varier les zones de pression
• Changement de position automatique toutes les 10 minutes

Fonctionnement :
Le matelas est dit dynamique car il s'adapte aux mouvements du patient. Si la personne alitée n'est pas en capacité de bouger par elle-même, ce matelas assure le changement de position automatiquement.

Le matelas anti-escarres dynamique est le plus efficace pour la guérison des escarres. Cependant, il n'exclut nullement une assistance active (toutes les 3 heures) régulière.

Note IMPORTANTE :
Les matelas anti-escarres à eau et gaufrier ne sont PAS pris en charge par la sécurité sociale car ils ne figurent pas sur la nomenclature CNAS-ONAAPH.`,
    indications: [
      "Personnes handicapées en fauteuil roulant (blessures médullaires)",
      "Personnes alitées, notamment les personnes âgées",
      "Personnes présentant une impotence fonctionnelle, quelle que soit son origine",
      "Prévention des escarres chez les patients à mobilité réduite",
      "Guérison des escarres existantes"
    ],
    criteres_conformite: [
      "Matelas à air avec flux motorisé (système dynamique)",
      "Motorisation silencieuse intégrée",
      "Gonflage/dégonflage alterné ou continu",
      "Changement automatique de zones de pression",
      "Cycle automatique toutes les 10 minutes"
    ],
    remboursement: "100%",
    type: "Aide sanitaire"
  },
  // ========== AIDES TECHNIQUES À LA MARCHE - CANNES ==========
  // CANNES SIMPLES
  {
    reference: "CAN0201",
    nom: "Canne Simple en C - En bois",
    categorie: "Aides Techniques - Marche - Cannes Simples",
    description: `Canne simple avec poignée en forme de C (crosse).

Les cannes assurent un équilibre et un soutien à la marche. Elles limitent le risque de chute.

Caractéristiques :
• Canne en bois avec poignée en C
• Support de pression maximum : 100 kilos
• Embout en caoutchouc antidérapant (remplaçable en cas d'usure)
• À tenir du côté opposé au membre inférieur malade pour soulager l'appui

Intérêt et rôle des aides techniques :
• Avoir plus d'autonomie dans la vie de tous les jours
• Augmenter sa sécurité et/ou son confort
• Jouer un rôle de prévention
• Faciliter la tâche de l'entourage
• Soutenir, maintenir et corriger une partie du corps`,
    indications: [
      "TEMPORAIRES : Après traumatisme (fracture, entorse)",
      "TEMPORAIRES : Rééducation maladie neurologique (AVC, sclérose en plaque)",
      "TEMPORAIRES : Poussée articulaire aiguë ou inflammatoire",
      "DÉFINITIVES : Déficit neurologique permanent",
      "DÉFINITIVES : Articulation douloureuse chronique"
    ],
    criteres_conformite: [
      "Canne en bois avec poignée en C",
      "Embout caoutchouc antidérapant",
      "Support jusqu'à 100 kg",
      "Hauteur adaptée à l'utilisateur"
    ],
    remboursement: "100%",
    type: "Aide technique"
  },
  {
    reference: "CAN0202",
    nom: "Canne Simple en C - En durale réglable",
    categorie: "Aides Techniques - Marche - Cannes Simples",
    description: `Canne simple avec poignée en forme de C (crosse) - En durale réglable.

Caractéristiques :
• Canne en durale (aluminium) avec poignée en C
• Réglable en hauteur
• Support de pression maximum : 100 kilos
• Embout en caoutchouc antidérapant (remplaçable en cas d'usure)
• À tenir du côté opposé au membre inférieur malade pour soulager l'appui`,
    indications: [
      "Après traumatisme (fracture, entorse)",
      "Rééducation maladie neurologique (AVC, sclérose en plaque)",
      "Poussée articulaire aiguë ou inflammatoire",
      "Déficit neurologique permanent",
      "Articulation douloureuse chronique"
    ],
    criteres_conformite: [
      "Canne en durale (aluminium) réglable",
      "Poignée en C",
      "Embout caoutchouc antidérapant",
      "Support jusqu'à 100 kg",
      "Système de réglage en hauteur fonctionnel"
    ],
    remboursement: "100%",
    type: "Aide technique"
  },
  {
    reference: "CAN0301",
    nom: "Canne Simple en T - En bois",
    categorie: "Aides Techniques - Marche - Cannes Simples",
    description: `Canne simple avec poignée en forme de T.

Caractéristiques :
• Canne en bois avec poignée en T
• Support de pression maximum : 100 kilos
• Embout en caoutchouc antidérapant (remplaçable en cas d'usure)
• À tenir du côté opposé au membre inférieur malade pour soulager l'appui`,
    indications: [
      "Après traumatisme (fracture, entorse)",
      "Rééducation maladie neurologique",
      "Poussée articulaire aiguë ou inflammatoire",
      "Déficit neurologique permanent",
      "Articulation douloureuse chronique"
    ],
    criteres_conformite: [
      "Canne en bois avec poignée en T",
      "Embout caoutchouc antidérapant",
      "Support jusqu'à 100 kg",
      "Hauteur adaptée à l'utilisateur"
    ],
    remboursement: "100%",
    type: "Aide technique"
  },
  {
    reference: "CAN0303",
    nom: "Canne Simple en T - En durale réglable",
    categorie: "Aides Techniques - Marche - Cannes Simples",
    description: `Canne simple avec poignée en forme de T - En durale réglable.

Caractéristiques :
• Canne en durale (aluminium) avec poignée en T
• Réglable en hauteur
• Support de pression maximum : 100 kilos
• Embout en caoutchouc antidérapant (remplaçable en cas d'usure)
• À tenir du côté opposé au membre inférieur malade pour soulager l'appui`,
    indications: [
      "Après traumatisme (fracture, entorse)",
      "Rééducation maladie neurologique",
      "Poussée articulaire aiguë ou inflammatoire",
      "Déficit neurologique permanent",
      "Articulation douloureuse chronique"
    ],
    criteres_conformite: [
      "Canne en durale (aluminium) réglable",
      "Poignée en T",
      "Embout caoutchouc antidérapant",
      "Support jusqu'à 100 kg",
      "Système de réglage en hauteur fonctionnel"
    ],
    remboursement: "100%",
    type: "Aide technique"
  },
  {
    reference: "CAN0501",
    nom: "Canne Blanche de Mal Voyant",
    categorie: "Aides Techniques - Marche - Cannes Simples",
    description: `Canne blanche pour personnes malvoyantes ou aveugles.

Caractéristiques :
• Canne blanche spéciale pour malvoyants
• Support de pression maximum : 100 kilos
• Embout en caoutchouc antidérapant (remplaçable en cas d'usure)
• Aide à la détection d'obstacles et au repérage spatial`,
    indications: [
      "Déficience visuelle importante",
      "Cécité partielle ou totale",
      "Besoin de repérage spatial et détection d'obstacles",
      "Autonomie dans les déplacements"
    ],
    criteres_conformite: [
      "Canne blanche réglementaire",
      "Embout caoutchouc antidérapant",
      "Support jusqu'à 100 kg",
      "Couleur blanche pour identification"
    ],
    remboursement: "100%",
    type: "Aide technique"
  },
  // CANNES TRIPODES
  {
    reference: "CAN0401 P.M",
    nom: "Canne Tripode - Petit Modèle",
    categorie: "Aides Techniques - Marche - Cannes Tripodes",
    description: `Canne tripode (3 pieds) pour une meilleure stabilité - Petit modèle.

Les cannes tripodes sont des cannes qui reposent sur une base en acier à trois pieds pour une meilleure stabilité lors du déplacement, en durale, réglable avec une poignée en T, souvent indiquée pour les hémiplégiques.

Caractéristiques :
• Base en acier à 3 pieds pour stabilité maximale
• Canne en durale (aluminium) réglable
• Poignée en T
• Particulièrement adaptée aux hémiplégiques
• Meilleure stabilité que les cannes simples`,
    indications: [
      "Hémiplégie (paralysie d'un côté du corps)",
      "Troubles de l'équilibre importants",
      "Besoin de stabilité accrue lors de la marche",
      "Rééducation post-AVC",
      "Patients nécessitant un support plus stable qu'une canne simple"
    ],
    criteres_conformite: [
      "Base en acier à 3 pieds",
      "Canne en durale réglable",
      "Poignée en T",
      "Stabilité renforcée",
      "Système de réglage en hauteur fonctionnel"
    ],
    remboursement: "100%",
    type: "Aide technique"
  },
  {
    reference: "CAN0402 G.M",
    nom: "Canne Tripode - Grand Modèle",
    categorie: "Aides Techniques - Marche - Cannes Tripodes",
    description: `Canne tripode (3 pieds) pour une meilleure stabilité - Grand modèle.

Les cannes tripodes sont des cannes qui reposent sur une base en acier à trois pieds pour une meilleure stabilité lors du déplacement, en durale, réglable avec une poignée en T, souvent indiquée pour les hémiplégiques.

Caractéristiques :
• Base en acier à 3 pieds pour stabilité maximale (grand format)
• Canne en durale (aluminium) réglable
• Poignée en T
• Particulièrement adaptée aux hémiplégiques
• Meilleure stabilité que les cannes simples`,
    indications: [
      "Hémiplégie (paralysie d'un côté du corps)",
      "Troubles de l'équilibre importants",
      "Besoin de stabilité accrue lors de la marche",
      "Rééducation post-AVC",
      "Patients de grande taille nécessitant un support plus stable"
    ],
    criteres_conformite: [
      "Base en acier à 3 pieds (grand modèle)",
      "Canne en durale réglable",
      "Poignée en T",
      "Stabilité renforcée",
      "Système de réglage en hauteur fonctionnel"
    ],
    remboursement: "100%",
    type: "Aide technique"
  },
  // CANNES CANADIENNES
  {
    reference: "CAN0104 P.M",
    nom: "Canne Canadienne (Anglaise) - Petit Modèle",
    categorie: "Aides Techniques - Marche - Cannes Canadiennes",
    description: `Canne canadienne (aussi appelée canne anglaise) avec appui antébrachial - Petit modèle.

Les cannes canadiennes sont des cannes avec un appui antébrachial et une poignée que l'utilisateur tient avec ses mains, elles sont réglables et réalisées en durale.

Caractéristiques :
• Poids de charge maximum supporté : 150 kilos
• Stabilité importante grâce au double appui (antébrachial + main)
• Coude devant être fléchi à 30°
• Utilisation par paire, pour soulager ou supprimer l'appui
• En durale (aluminium) réglable

Utilisation :
• Chez les jeunes (diplégiques) : marche pendulaire (les deux membres sont propulsés en même temps)
• Chez les monoplégiques : glisser d'abord les deux cannes et la jambe malade, puis la jambe forte

Bien utilisées, les cannes canadiennes soulagent la douleur, garantissent l'équilibre et préviennent les chutes.`,
    indications: [
      "Diplégie (paralysie des deux jambes)",
      "Monoplégie (paralysie d'une jambe)",
      "Besoin de soulager ou supprimer l'appui sur membres inférieurs",
      "Rééducation post-traumatique ou post-opératoire",
      "Pathologies nécessitant décharge importante des membres inférieurs"
    ],
    criteres_conformite: [
      "Appui antébrachial et poignée",
      "En durale (aluminium) réglable",
      "Support jusqu'à 150 kg",
      "Angle du coude à 30° réglable",
      "Utilisation par paire recommandée",
      "Embouts antidérapants"
    ],
    remboursement: "100%",
    type: "Aide technique"
  },
  {
    reference: "CAN0105 G.M",
    nom: "Canne Canadienne (Anglaise) - Grand Modèle",
    categorie: "Aides Techniques - Marche - Cannes Canadiennes",
    description: `Canne canadienne (aussi appelée canne anglaise) avec appui antébrachial - Grand modèle.

Les cannes canadiennes sont des cannes avec un appui antébrachial et une poignée que l'utilisateur tient avec ses mains, elles sont réglables et réalisées en durale.

Caractéristiques :
• Poids de charge maximum supporté : 150 kilos
• Stabilité importante grâce au double appui (antébrachial + main)
• Coude devant être fléchi à 30°
• Utilisation par paire, pour soulager ou supprimer l'appui
• En durale (aluminium) réglable
• Grand format pour personnes de grande taille

Utilisation :
• Chez les jeunes (diplégiques) : marche pendulaire (les deux membres sont propulsés en même temps)
• Chez les monoplégiques : glisser d'abord les deux cannes et la jambe malade, puis la jambe forte

Bien utilisées, les cannes canadiennes soulagent la douleur, garantissent l'équilibre et préviennent les chutes.`,
    indications: [
      "Diplégie (paralysie des deux jambes)",
      "Monoplégie (paralysie d'une jambe)",
      "Besoin de soulager ou supprimer l'appui sur membres inférieurs",
      "Rééducation post-traumatique ou post-opératoire",
      "Pathologies nécessitant décharge importante des membres inférieurs",
      "Patients de grande taille"
    ],
    criteres_conformite: [
      "Appui antébrachial et poignée",
      "En durale (aluminium) réglable",
      "Support jusqu'à 150 kg",
      "Angle du coude à 30° réglable",
      "Grand modèle adapté aux grandes tailles",
      "Utilisation par paire recommandée",
      "Embouts antidérapants"
    ],
    remboursement: "100%",
    type: "Aide technique"
  },
  // BÉQUILLES AXILLAIRES
  {
    reference: "CAN0201 P.M",
    nom: "Béquille Axillaire - Petit Modèle",
    categorie: "Aides Techniques - Marche - Béquilles Axillaires",
    description: `Béquille axillaire - Petit modèle (95-115 cm).

Les béquilles axillaires sont des aides techniques à la marche idéalement conçues pour les personnes ayant des problèmes articulaires ou musculaires au niveau des poignets.

Caractéristiques :
• Transverse rembourrée dans la partie supérieure (appui aisselle)
• Poignée ajustable au niveau médian pour meilleur confort
• Embout en caoutchouc antidérapant renouvelable en cas d'usure
• En durale, réglables en hauteur de 115 à 135 cm
• Pour personnes mesurant entre 129,5 à 150 cm (petit modèle)
• Support de poids maximum : 160 kg

Les blessés et handicapés moteur appuient l'aisselle et la main sur les béquilles pour s'aider à marcher.`,
    indications: [
      "Problèmes articulaires ou musculaires des poignets",
      "Besoin de décharge importante des membres inférieurs",
      "Rééducation post-traumatique ou post-opératoire",
      "Fractures membres inférieurs",
      "Personnes mesurant 129,5-150 cm"
    ],
    criteres_conformite: [
      "Transverse rembourrée supérieure",
      "Poignée ajustable",
      "En durale réglable (95-115 cm)",
      "Embout caoutchouc antidérapant",
      "Support jusqu'à 160 kg",
      "Hauteur adaptée à la taille"
    ],
    remboursement: "100%",
    type: "Aide technique"
  },
  {
    reference: "CAN0202 M.M",
    nom: "Béquille Axillaire - Moyen Modèle",
    categorie: "Aides Techniques - Marche - Béquilles Axillaires",
    description: `Béquille axillaire - Moyen modèle (115-135 cm).

Les béquilles axillaires sont des aides techniques à la marche idéalement conçues pour les personnes ayant des problèmes articulaires ou musculaires au niveau des poignets.

Caractéristiques :
• Transverse rembourrée dans la partie supérieure (appui aisselle)
• Poignée ajustable au niveau médian pour meilleur confort
• Embout en caoutchouc antidérapant renouvelable en cas d'usure
• En durale, réglables en hauteur de 115 à 135 cm
• Pour personnes mesurant entre 150 à 170,2 cm (moyen modèle)
• Support de poids maximum : 160 kg`,
    indications: [
      "Problèmes articulaires ou musculaires des poignets",
      "Besoin de décharge importante des membres inférieurs",
      "Rééducation post-traumatique ou post-opératoire",
      "Fractures membres inférieurs",
      "Personnes mesurant 150-170,2 cm"
    ],
    criteres_conformite: [
      "Transverse rembourrée supérieure",
      "Poignée ajustable",
      "En durale réglable (115-135 cm)",
      "Embout caoutchouc antidérapant",
      "Support jusqu'à 160 kg",
      "Hauteur adaptée à la taille"
    ],
    remboursement: "100%",
    type: "Aide technique"
  },
  {
    reference: "CAN0203 G.M",
    nom: "Béquille Axillaire - Grand Modèle",
    categorie: "Aides Techniques - Marche - Béquilles Axillaires",
    description: `Béquille axillaire - Grand modèle (135-155 cm).

Les béquilles axillaires sont des aides techniques à la marche idéalement conçues pour les personnes ayant des problèmes articulaires ou musculaires au niveau des poignets.

Caractéristiques :
• Transverse rembourrée dans la partie supérieure (appui aisselle)
• Poignée ajustable au niveau médian pour meilleur confort
• Embout en caoutchouc antidérapant renouvelable en cas d'usure
• En durale, réglables en hauteur de 135 à 155 cm
• Pour personnes mesurant entre 170,2 à 190,5 cm (grand modèle)
• Support de poids maximum : 160 kg`,
    indications: [
      "Problèmes articulaires ou musculaires des poignets",
      "Besoin de décharge importante des membres inférieurs",
      "Rééducation post-traumatique ou post-opératoire",
      "Fractures membres inférieurs",
      "Personnes mesurant 170,2-190,5 cm"
    ],
    criteres_conformite: [
      "Transverse rembourrée supérieure",
      "Poignée ajustable",
      "En durale réglable (135-155 cm)",
      "Embout caoutchouc antidérapant",
      "Support jusqu'à 160 kg",
      "Hauteur adaptée à la taille"
    ],
    remboursement: "100%",
    type: "Aide technique"
  },
  // CADRES DE MARCHE
  {
    reference: "CDM0102",
    nom: "Cadre de Marche Fixe Adulte",
    categorie: "Aides Techniques - Marche - Cadres de Marche",
    description: `Cadre de marche fixe pour adulte.

Le cadre de marche est une aide technique à la marche alternative à la canne, il permet une marche autonome sans l'aide d'un tiers.

Caractéristiques :
• Cadre métallique avec des barres de liaisons horizontales munies de poignées
• Cadre fixe, sur 4 pieds : c'est un cadre d'intérieur
• On le soulève pour avancer
• Structure stable offrant un bon support

Le cadre de marche fixe est plus stable mais nécessite de soulever tout le cadre pour avancer.`,
    indications: [
      "Troubles de l'équilibre",
      "Besoin de support stable pour marche",
      "Alternative à la canne pour personnes âgées",
      "Rééducation nécessitant support important",
      "Marche autonome en intérieur"
    ],
    criteres_conformite: [
      "Cadre métallique stable",
      "Poignées de préhension",
      "4 pieds avec embouts antidérapants",
      "Structure fixe (non articulée)",
      "Hauteur adaptée à l'utilisateur"
    ],
    remboursement: "100%",
    type: "Aide technique"
  },
  {
    reference: "CDM0201",
    nom: "Cadre de Marche Articulé Enfant",
    categorie: "Aides Techniques - Marche - Cadres de Marche",
    description: `Cadre de marche articulé pour enfant.

Le cadre de marche est une aide technique à la marche alternative à la canne, il permet une marche autonome sans l'aide d'un tiers.

Caractéristiques :
• Cadre métallique avec des barres de liaisons horizontales munies de poignées
• Cadre articulé : on fait avancer un côté, puis l'autre
• On conserve toujours un appui (plus sécurisant)
• Adapté à la taille des enfants

Le cadre articulé permet une marche plus fluide car on n'a pas besoin de soulever tout le cadre.`,
    indications: [
      "Enfants avec troubles de l'équilibre",
      "Apprentissage de la marche (IMC - Infirmité Motrice Cérébrale)",
      "Besoin de support stable pour marche chez l'enfant",
      "Rééducation pédiatrique",
      "Marche autonome en intérieur pour enfant"
    ],
    criteres_conformite: [
      "Cadre métallique stable",
      "Poignées de préhension adaptées",
      "Système articulé fonctionnel",
      "Embouts antidérapants",
      "Hauteur adaptée aux enfants"
    ],
    remboursement: "100%",
    type: "Aide technique"
  },
  {
    reference: "CDM0202",
    nom: "Cadre de Marche Articulé Adulte",
    categorie: "Aides Techniques - Marche - Cadres de Marche",
    description: `Cadre de marche articulé pour adulte.

Le cadre de marche est une aide technique à la marche alternative à la canne, il permet une marche autonome sans l'aide d'un tiers.

Caractéristiques :
• Cadre métallique avec des barres de liaisons horizontales munies de poignées
• Cadre articulé : on fait avancer un côté, puis l'autre
• On conserve toujours un appui (plus sécurisant)
• Adapté aux adultes

Le cadre articulé permet une marche plus fluide car on n'a pas besoin de soulever tout le cadre.`,
    indications: [
      "Troubles de l'équilibre",
      "Besoin de support stable pour marche",
      "Alternative à la canne pour personnes âgées",
      "Rééducation nécessitant support important",
      "Marche autonome en intérieur avec conservation d'un appui permanent"
    ],
    criteres_conformite: [
      "Cadre métallique stable",
      "Poignées de préhension",
      "Système articulé fonctionnel",
      "Embouts antidérapants",
      "Hauteur adaptée à l'utilisateur adulte"
    ],
    remboursement: "100%",
    type: "Aide technique"
  },
  // DÉAMBULATEURS
  {
    reference: "DAM0101 P.M",
    nom: "Déambulateur - Petit Modèle",
    categorie: "Aides Techniques - Marche - Déambulateurs",
    description: `Déambulateur - Petit modèle.

Le déambulateur est une aide technique à la marche qui soulage la personne qui a du mal à soulever le cadre de marche.

Caractéristiques :
• Cadre métallique pourvu de poignées
• Embouts antidérapants sur les 2 pieds à l'arrière
• 2 roulettes à l'avant
• Plutôt utilisé en intérieur (roues petites, mal adaptées aux trottoirs)
• Réglable en hauteur pour s'adapter à la taille du malade
• Petit modèle

Utilisation :
• La plupart du temps utilisé par des personnes âgées qui ont du mal à se déplacer seules : soit par trouble d'équilibre, suite à une opération, ou après une chute
• Il en existe aussi pour les enfants en situation de handicap qui apprennent à marcher (IMC)`,
    indications: [
      "Troubles de l'équilibre chez personnes âgées",
      "Suite opération ou chute",
      "Difficulté à soulever le cadre de marche",
      "Apprentissage de la marche (IMC)",
      "Besoin de support avec roulettes pour intérieur"
    ],
    criteres_conformite: [
      "Cadre métallique avec poignées",
      "2 roulettes à l'avant",
      "2 embouts antidérapants à l'arrière",
      "Réglable en hauteur",
      "Petit modèle adapté"
    ],
    remboursement: "100%",
    type: "Aide technique"
  },
  {
    reference: "DAM0102 M.M",
    nom: "Déambulateur - Moyen Modèle",
    categorie: "Aides Techniques - Marche - Déambulateurs",
    description: `Déambulateur - Moyen modèle.

Le déambulateur est une aide technique à la marche qui soulage la personne qui a du mal à soulever le cadre de marche.

Caractéristiques :
• Cadre métallique pourvu de poignées
• Embouts antidérapants sur les 2 pieds à l'arrière
• 2 roulettes à l'avant
• Plutôt utilisé en intérieur (roues petites, mal adaptées aux trottoirs)
• Réglable en hauteur pour s'adapter à la taille du malade
• Moyen modèle

Utilisation :
• La plupart du temps utilisé par des personnes âgées qui ont du mal à se déplacer seules : soit par trouble d'équilibre, suite à une opération, ou après une chute`,
    indications: [
      "Troubles de l'équilibre chez personnes âgées",
      "Suite opération ou chute",
      "Difficulté à soulever le cadre de marche",
      "Besoin de support avec roulettes pour intérieur",
      "Taille moyenne"
    ],
    criteres_conformite: [
      "Cadre métallique avec poignées",
      "2 roulettes à l'avant",
      "2 embouts antidérapants à l'arrière",
      "Réglable en hauteur",
      "Moyen modèle adapté"
    ],
    remboursement: "100%",
    type: "Aide technique"
  },
  {
    reference: "DAM0103 G.M",
    nom: "Déambulateur - Grand Modèle",
    categorie: "Aides Techniques - Marche - Déambulateurs",
    description: `Déambulateur - Grand modèle.

Le déambulateur est une aide technique à la marche qui soulage la personne qui a du mal à soulever le cadre de marche.

Caractéristiques :
• Cadre métallique pourvu de poignées
• Embouts antidérapants sur les 2 pieds à l'arrière
• 2 roulettes à l'avant
• Plutôt utilisé en intérieur (roues petites, mal adaptées aux trottoirs)
• Réglable en hauteur pour s'adapter à la taille du malade
• Grand modèle pour personnes de grande taille

Utilisation :
• La plupart du temps utilisé par des personnes âgées qui ont du mal à se déplacer seules : soit par trouble d'équilibre, suite à une opération, ou après une chute`,
    indications: [
      "Troubles de l'équilibre chez personnes âgées",
      "Suite opération ou chute",
      "Difficulté à soulever le cadre de marche",
      "Besoin de support avec roulettes pour intérieur",
      "Personnes de grande taille"
    ],
    criteres_conformite: [
      "Cadre métallique avec poignées",
      "2 roulettes à l'avant",
      "2 embouts antidérapants à l'arrière",
      "Réglable en hauteur",
      "Grand modèle adapté aux grandes tailles"
    ],
    remboursement: "100%",
    type: "Aide technique"
  },
  // ROLLATORS
  {
    reference: "CRT01",
    nom: "Rollator (3 ou 4 roues)",
    categorie: "Aides Techniques - Marche - Rollators",
    description: `Rollator - Aide technique à la marche à roues.

Les rollators sont des aides techniques à la marche qui fournissent un support stable pour assister dans leurs déplacements quotidiens ou occasionnels les personnes âgées ou handicapées.

Ils complètent ou remplacent une paire de béquilles ou une canne quand la marche devient difficile en raison d'une perte de force, d'agilité, de stabilité, ou lorsque le poids du corps est trop lourd pour les articulations des membres inférieurs.

Caractéristiques :
• Équipé de roues : 3 roues ou 4 roues selon les modèles
• Poignées d'appui réglables en hauteur
• Freins pour contrôle de la vitesse
• Accessoires utiles : siège, plateau, panier, porte-canne, système de pliage, etc.

Les modèles à 3 ou 4 roues possèdent des poignées d'appui réglables en hauteur et des freins.`,
    indications: [
      "Perte de force, d'agilité ou de stabilité",
      "Poids du corps trop lourd pour articulations membres inférieurs",
      "Remplacement béquilles ou canne",
      "Personnes âgées nécessitant support mobile",
      "Déplacements quotidiens ou occasionnels",
      "Besoin de siège pour se reposer"
    ],
    criteres_conformite: [
      "3 ou 4 roues selon modèle",
      "Poignées d'appui réglables en hauteur",
      "Système de freins fonctionnel",
      "Accessoires : siège, panier, système pliage",
      "Structure stable et robuste"
    ],
    remboursement: "100%",
    type: "Aide technique"
  },
  // ========== PROTHÈSES DES MEMBRES SUPÉRIEURS ==========
  {
    reference: "PS 1R01",
    nom: "Prothèse Scapulo-Humérale - PS 1R01",
    categorie: "Prothèses - Membres Supérieurs",
    description: `Prothèse pour désarticulation de l'épaule (scapulo-humérale).
Composition :
• Emboîture qui vient s'adapter sur le moignon de l'épaule (point d'ancrage de la prothèse)
• Prolongement du bras
• Articulation du coude
• Prolongement de l'avant-bras
• Main prothétique et gant esthétique

Prothèse non fonctionnelle dite esthétique, personnalisée et faite après un moulage du moignon.
Matériau : Chlorure de Polyvinyle (R)

Niveau d'amputation : 01 - Désarticulation de tout le membre supérieur`,
    indications: [
          "Désarticulation de l'épaule (scapulo-humérale)",
          "Amputation scapulo-humérale congénitale (agénésie)",
          "Amputation scapulo-humérale traumatique"
    ],
    criteres_conformite: [
          "Adaptation de la prothèse à l'amputation vérifiée",
          "Prothèse maintenue correctement",
          "Prothèse non douloureuse"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PS 2R01",
    nom: "Prothèse de Bras (1/3 supérieur) - PS 2R01",
    categorie: "Prothèses - Membres Supérieurs",
    description: `Prothèse pour amputation du bras au niveau du 1/3 supérieur huméral.
Composition :
• Emboîture adaptée sur le moignon du bras (point d'ancrage)
• Prolongement du bras
• Articulation du coude
• Prolongement de l'avant-bras
• Main prothétique et gant esthétique

Matériau : Chlorure de Polyvinyle (R)
Niveau d'amputation : 02 - Amputation avec petit moignon huméral`,
    indications: [
          "Amputation traumatique ou médicale du bras (1/3 supérieur)",
          "Agénésie du bras au niveau du 1/3 supérieur huméral"
    ],
    criteres_conformite: [
          "Adaptation de la prothèse à l'amputation vérifiée",
          "Prothèse maintenue correctement",
          "Prothèse non douloureuse"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PS 3R01",
    nom: "Prothèse de Bras (1/3 moyen) - PS 3R01",
    categorie: "Prothèses - Membres Supérieurs",
    description: `Prothèse pour amputation du bras au niveau du 1/3 moyen huméral.
Composition :
• Emboîture adaptée sur le moignon du bras
• Prolongement du bras
• Articulation du coude
• Prolongement de l'avant-bras
• Main prothétique et gant esthétique

Matériau : Chlorure de Polyvinyle (R)
Niveau d'amputation : 03 - Amputation 1/3 supérieur huméral`,
    indications: [
          "Amputation traumatique ou médicale du bras",
          "Agénésie du bras"
    ],
    criteres_conformite: [
          "Adaptation de la prothèse à l'amputation vérifiée",
          "Prothèse maintenue correctement",
          "Prothèse non douloureuse"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PS 3S10",
    nom: "Prothèse de Bras en Polyester - PS 3S10",
    categorie: "Prothèses - Membres Supérieurs",
    description: `Prothèse pour amputation du bras, réalisée en polyester.
Composition similaire à PS 3R01 mais en matériau polyester (S).

Matériau : Polyester (S)
Niveau d'amputation : 03 - Amputation 1/3 supérieur huméral`,
    indications: [
          "Amputation traumatique ou médicale du bras",
          "Agénésie du bras"
    ],
    criteres_conformite: [
          "Adaptation de la prothèse à l'amputation vérifiée",
          "Prothèse maintenue correctement",
          "Prothèse non douloureuse"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PS 5R01",
    nom: "Prothèse du Coude - PS 5R01",
    categorie: "Prothèses - Membres Supérieurs",
    description: `Prothèse pour désarticulation du coude congénitale ou traumatique.
Composition :
• Emboîture qui vient s'adapter sur le moignon du coude
• Prolongement de l'avant-bras
• Main prothétique et gant esthétique

Matériau : Chlorure de Polyvinyle (R)
Niveau d'amputation : 05 - Désarticulation du coude`,
    indications: [
          "Désarticulation du coude congénitale",
          "Désarticulation du coude traumatique"
    ],
    criteres_conformite: [
          "Adaptation de la prothèse à l'amputation vérifiée",
          "Prothèse maintenue correctement",
          "Prothèse non douloureuse"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PS 5S10",
    nom: "Prothèse du Coude en Polyester - PS 5S10",
    categorie: "Prothèses - Membres Supérieurs",
    description: `Prothèse du coude réalisée en polyester.
Composition similaire à PS 5R01 mais en matériau polyester (S).

Matériau : Polyester (S)
Niveau d'amputation : 05 - Désarticulation du coude`,
    indications: [
          "Désarticulation du coude congénitale",
          "Désarticulation du coude traumatique"
    ],
    criteres_conformite: [
          "Adaptation de la prothèse à l'amputation vérifiée",
          "Prothèse maintenue correctement",
          "Prothèse non douloureuse"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PS 6R01",
    nom: "Prothèse de l'Avant-Bras - PS 6R01",
    categorie: "Prothèses - Membres Supérieurs",
    description: `Prothèse de l'avant-bras (prothèse de vie sociale).
Composition :
• Emboîture qui vient s'adapter sur le moignon de l'avant-bras
• Prolongement de l'avant-bras
• Main prothétique et gant esthétique

Matériau : Chlorure de Polyvinyle (R)
Niveaux d'amputation : 06 - Amputation 1/3 supérieur de l'avant-bras ou 07 - Amputation 1/3 inférieur de l'avant-bras`,
    indications: [
          "Amputation de l'avant-bras traumatique ou médicale",
          "Agénésie de l'avant-bras"
    ],
    criteres_conformite: [
          "Adaptation de la prothèse à l'amputation vérifiée",
          "Prothèse maintenue correctement",
          "Prothèse non douloureuse"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PS 6S01",
    nom: "Prothèse de l'Avant-Bras en Polyester - PS 6S01",
    categorie: "Prothèses - Membres Supérieurs",
    description: `Prothèse de l'avant-bras (prothèse de vie sociale) en polyester.
Composition similaire à PS 6R01 mais en matériau polyester (S).

Matériau : Polyester (S)`,
    indications: [
          "Amputation de l'avant-bras traumatique ou médicale",
          "Agénésie de l'avant-bras"
    ],
    criteres_conformite: [
          "Adaptation de la prothèse à l'amputation vérifiée",
          "Prothèse maintenue correctement",
          "Prothèse non douloureuse"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PS 7R01",
    nom: "Prothèse de Main - PS 7R01",
    categorie: "Prothèses - Membres Supérieurs",
    description: `Prothèse de main pour désarticulation carpienne.
Composition :
• Main prothétique
• Gant esthétique

Matériau : Chlorure de Polyvinyle (R)
Niveau d'amputation : 08 - Désarticulation du poignet`,
    indications: [
          "Désarticulation carpienne"
    ],
    criteres_conformite: [
          "Adaptation de la prothèse à l'amputation vérifiée",
          "Prothèse maintenue correctement",
          "Prothèse non douloureuse"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PS 9S02",
    nom: "Prothèse des Doigts - PS 9S02",
    categorie: "Prothèses - Membres Supérieurs",
    description: `Prothèse d'un ou plusieurs doigts.
Composition :
• Un ou plusieurs doigts prothétiques

Matériau : Polyester (S)
Niveau d'amputation : 09 - Amputation des doigts`,
    indications: [
          "Amputation d'un ou plusieurs doigts",
          "Agénésie d'un ou plusieurs doigts"
    ],
    criteres_conformite: [
          "Adaptation de la prothèse à l'amputation vérifiée",
          "Prothèse maintenue correctement",
          "Prothèse non douloureuse"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PSM 03",
    nom: "Prothèse Myoélectrique Épaule - PSM 03",
    categorie: "Prothèses - Membres Supérieurs",
    description: `Prothèse fonctionnelle myoélectrique pour amputation au niveau de l'épaule.
Composition :
• Emboîture de contact
• Articulations
• Électrodes captant les impulsions musculaires
• Fils conduisant l'impulsion électrique
• Microprocesseur
• Main motorisée
• Gant esthétique

Prise en charge selon procédure DCM/903/2015 du 24 Juin 2015.
Dossier doit comporter : prescription spécialiste, testing musculaire (Myoboy), devis détaillé, engagement accompagnement MPR.`,
    indications: [
          "Amputation quelle que soit son origine au niveau de l'épaule",
          "Agénésie congénitale du membre au niveau de l'épaule"
    ],
    criteres_conformite: [
          "Testing musculaire positif (Myoboy)",
          "Accompagnement médicalisé MPR obligatoire",
          "Dossier validé par comité médical DCM"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PSM 05",
    nom: "Prothèse Myoélectrique Coude - PSM 05",
    categorie: "Prothèses - Membres Supérieurs",
    description: `Prothèse fonctionnelle myoélectrique pour amputation au niveau du coude.
Composition similaire à PSM 03 adaptée au niveau du coude.

Prise en charge selon procédure DCM/903/2015 du 24 Juin 2015.`,
    indications: [
          "Amputation quelle que soit son origine au niveau du coude",
          "Agénésie congénitale du membre au niveau du coude"
    ],
    criteres_conformite: [
          "Testing musculaire positif (Myoboy)",
          "Accompagnement médicalisé MPR obligatoire",
          "Dossier validé par comité médical DCM"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  {
    reference: "PSM 06",
    nom: "Prothèse Myoélectrique Avant-Bras - PSM 06",
    categorie: "Prothèses - Membres Supérieurs",
    description: `Prothèse fonctionnelle myoélectrique pour amputation au niveau de l'avant-bras.
Composition similaire à PSM 03 adaptée au niveau de l'avant-bras.

Prise en charge selon procédure DCM/903/2015 du 24 Juin 2015.`,
    indications: [
          "Amputation quelle que soit son origine au niveau de l'avant-bras",
          "Agénésie congénitale du membre au niveau de l'avant-bras"
    ],
    criteres_conformite: [
          "Testing musculaire positif (Myoboy)",
          "Accompagnement médicalisé MPR obligatoire",
          "Dossier validé par comité médical DCM"
    ],
    remboursement: "100%",
    type: "Grand appareillage"
  },
  // ========== PRODUITS ADDITIONNELS AVEC RÉFÉRENCES PDF EXACTES ==========
  {
    reference: "TR 59 N 50",
    nom: "Corset thoraco-lombo-sacré (CTLS)",
    categorie: "Orthèses du tronc - Corsets",
    description: "Coque en polyéthylène sans armature mono valve sans appui ni de contre appui, avec ouverture antérieure. Consiste à maintenir le patient dans une position correcte et soulager les douleurs.",
    indications: ["Atteinte vertébrale d'origine traumatique (tassement, fracture)", "Atteinte vertébrale d'origine infectieuse (spondylodiscite, mal de Pott)", "Atteinte vertébrale d'origine tumorale (métastase, myélome)", "Atteinte vertébrale d'origine dégénérative (arthrose sévère)", "Atteinte vertébrale d'origine malformative (scoliose, cyphose)", "Post-opératoire de chirurgie du rachis (arthrodèse)"],
    criteres_conformite: ["Coque polyéthylène mono-valve", "Ouverture antérieure", "Maintien thoraco-lombo-sacré", "Réalisé sur mesure après moulage"],
    remboursement: "100%",
    type: "Grand appareillage",
    references_composees: ["TR 59 N 50", "TR59N50", "CORSET.TLS", "CTLS", "Corset thoraco-lombo-sacré"]
  },
  {
    reference: "TR 79 N 35",
    nom: "Corselet de maintien lombaire",
    categorie: "Orthèses du tronc - Corsets",
    description: "Corset de maintien ou appelé aussi corselet, c'est une coque en polyéthylène sans armature mono valve avec ouverture antérieure. Consiste à maintenir le patient dans une position correcte avec un soutien lombaire spécifique.",
    indications: ["Traumatisme lombaire (fracture, tassement vertébral lombaire)", "Discopathie lombaire sévère (hernie discale L4-L5, L5-S1)", "Lombalgie chronique invalidante résistante au traitement médical", "Post-opératoire chirurgie lombaire (laminectomie, arthrodèse)", "Diplégie quelque soit son origine : Le corselet se porte avec un Grand Appareil de Marche (GAM) ; c'est le Phelps"],
    criteres_conformite: ["Coque polyéthylène mono-valve", "Ouverture antérieure", "Niveau lombaire spécifique", "Compatible avec GAM pour diplégie"],
    remboursement: "100%",
    type: "Grand appareillage",
    references_composees: ["TR 79 N 35", "TR79N35", "CEINTURE.LOMB", "Corselet lombaire", "Maintien lombaire"]
  },
  {
    reference: "TR 29 N 36",
    nom: "Corset de Milwaukee",
    categorie: "Orthèses du tronc - Corsets",
    description: "Corset avec collier occipito-mentonnier et appuis thoraciques pour correction scoliose cervico-dorsale. Système de traction cervicale avec appuis thoraciques latéraux.",
    indications: ["Scoliose idiopathique thoracique haute (apex > T6)", "Scoliose cervico-dorsale évolutive", "Angle de Cobb 20-50° chez l'enfant et adolescent", "Scoliose pré-pubertaire avec potentiel de croissance"],
    criteres_conformite: ["Collier occipito-mentonnier", "Appuis thoraciques latéraux", "Bassin pelvien moulé", "Réglable en hauteur"],
    remboursement: "100%",
    type: "Grand appareillage",
    references_composees: ["TR 29 N 36", "TR29N36", "MILWAUKEE", "Milwaukee"]
  },
  {
    reference: "TR 49 K 54",
    nom: "Corset Lyonnais (CTLS)",
    categorie: "Orthèses du tronc - Corsets",
    description: "Corset thoraco-lombo-sacré en Pléxidur, utilisé comme corset de maintien post-plâtre. Immobilisation stricte après correction initiale.",
    indications: ["Scoliose idiopathique thoracique moyenne 30-50°", "Post-plâtre EDF (Elongation-Dérotation-Flexion)", "Scoliose post-pubertaire avec évolution stabilisée", "Maintien après correction orthopédique"],
    criteres_conformite: ["Réalisé en Pléxidur thermoformé", "Maintien post-correction", "Immobilisation thoraco-lombo-sacrée stricte"],
    remboursement: "100%",
    type: "Grand appareillage",
    references_composees: ["TR 49 K 54", "TR49K54", "LYONNAIS", "Lyonnais", "CTLS Lyonnais"]
  },
  {
    reference: "TR 49 N 50",
    nom: "Corset Boston",
    categorie: "Orthèses du tronc - Corsets",
    description: "Corset lombaire modulaire préfabriqué en polyéthylène, mono-valve avec ouverture postérieure. Correction des scolioses lombaires basses.",
    indications: ["Scoliose lombaire idiopathique (apex L1-L4)", "Angle de Cobb 20-40°", "Hyperlordose lombaire associée", "Adolescent en croissance"],
    criteres_conformite: ["Polyéthylène thermoformé", "Ouverture postérieure", "Correction lombaire sélective", "Modulable"],
    remboursement: "100%",
    type: "Grand appareillage",
    references_composees: ["TR 49 N 50", "TR49N50", "BOSTON", "Boston"]
  },
  {
    reference: "TR 39 N 51",
    nom: "Corset Chêneau (CTM)",
    categorie: "Orthèses du tronc - Corsets",
    description: "Corset asymétrique de correction tridimensionnelle de la scoliose. Zones d'expansion et de compression spécifiques selon la déformation.",
    indications: ["Scoliose idiopathique évolutive dorsale ou dorso-lombaire", "Angle de Cobb 20-50°", "Scoliose avec rotation vertébrale", "Enfant et adolescent en phase de croissance"],
    criteres_conformite: ["Correction 3D (dérotation)", "Zones d'expansion thoracique", "Zones de compression sur gibbosité", "Réalisé sur moulage 3D"],
    remboursement: "100%",
    type: "Grand appareillage",
    references_composees: ["TR 39 N 51", "TR39N51", "CHENEAU", "Chêneau", "CTM"]
  },
  {
    reference: "TR 39 K 50",
    nom: "Corset anti-cyphose",
    categorie: "Orthèses du tronc - Corsets",
    description: "Corset de correction de la cyphose dorsale pathologique (maladie de Scheuermann). En Pléxidur avec appui sternal et lombaire.",
    indications: ["Maladie de Scheuermann (cyphose > 45°)", "Cyphose dorsale évolutive de l'adolescent", "Cyphose douloureuse structurale", "Hyper-cyphose post-traumatique"],
    criteres_conformite: ["Pléxidur thermoformé", "Appui sternal antérieur", "Contre-appui lombaire postérieur", "Force de redressement progressive"],
    remboursement: "100%",
    type: "Grand appareillage",
    references_composees: ["TR 39 K 50", "TR39K50", "ANTI.CYPH", "Anti-cyphose", "Scheuermann"]
  },
  {
    reference: "TR 43 N 10",
    nom: "Corset siège pour IMC",
    categorie: "Orthèses du tronc - Corsets",
    description: "Orthèse de maintien en position assise pour enfant IMC (Infirmité Motrice Cérébrale) sans tenue de tronc. Avec assise moulée et maintien thoracique.",
    indications: ["IMC sévère sans contrôle postural", "Hypotonie axiale majeure", "Spina-bifida avec paralysie haute", "Hydrocéphalie avec troubles posturaux", "Myopathie évolutive"],
    criteres_conformite: ["Coque thoracique moulée", "Assise adaptée avec appui ischiatique", "Maintien de la position assise", "Montable sur fauteuil roulant"],
    remboursement: "100%",
    type: "Grand appareillage",
    references_composees: ["TR 43 N 10", "TR43N10", "Corset siège", "Siège IMC"]
  },
  {
    reference: "C2P/SR",
    nom: "Corset 2 points (C2P)",
    categorie: "Orthèses du tronc - Corsets",
    description: "Orthèse de compression thoracique pour malformations type thorax en carène (pectus carinatum) ou en entonnoir (pectus excavatum). Système de compression progressive.",
    indications: ["Thorax en carène (pectus carinatum)", "Thorax en entonnoir modéré", "Malformation thoracique réductible", "Déformation costale post-traumatique"],
    criteres_conformite: ["Deux points d'appui principaux", "Système de compression réglable", "Pression progressive", "Port nocturne prolongé"],
    remboursement: "100%",
    type: "Grand appareillage",
    references_composees: ["C2P/SR", "C2P", "Corset 2 points", "Thorax carène"]
  }
,
  // ========== EXEMPLES DE COMBINAISONS DU PDF (CHAPITRE 2) ==========
  {
    reference: "701.EX.01",
    nom: "701 x 02 - Pieds plats avec valgus arrière-pied",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 en paire pour pieds plats avec valgus ou varus de l'arrière-pied après échec d'une correction avec semelle orthopédique",
    combinaison: "701 x 02",
    indications: ["Pieds plats avec valgus de l'arrière-pied après échec semelle", "Pieds plats avec varus de l'arrière-pied après échec semelle"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["701.EX.01"]
  },
  {
    reference: "701.EX.02",
    nom: "701 x 02 + AS52 x 02 - Pieds plats valgus avant-pied",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 en paire avec contrefort bilatéral (AS52) pour pieds plats avec valgus de l'avant-pied",
    combinaison: "701 x 02 + AS52 x 02",
    indications: ["Pieds plats avec valgus de l'avant-pied"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["701.EX.02"]
  },
  {
    reference: "701.EX.03",
    nom: "701 x 02 + AS51 x 02 - Metatarsus varus",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 en paire avec contrefort unilatéral (AS51) pour metatarsus varus",
    combinaison: "701 x 02 + AS51 x 02",
    indications: ["Metatarsus varus de l'avant-pied"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["701.EX.03"]
  },
  {
    reference: "701.EX.04",
    nom: "701 + AS47 + 709 - Hémiplégie unilatérale",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 avec bride en T anti-varus/valgus (AS47) côté atteint et chaussure de complément (709) côté sain pour atteinte neurologique unilatérale",
    combinaison: "701 + AS47 + 709",
    indications: ["Hémiplégie gauche ou droite", "Atteinte neurologique centrale ou périphérique unilatérale", "Pieds tombants unilatéral", "Steppage unilatéral"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["701.EX.04"]
  },
  {
    reference: "701.EX.05",
    nom: "701 x 02 + AS47 x 02 - Diplégie/Steppage bilatéral",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 en paire avec bride en T (AS47) bilatérale pour atteinte neurologique bilatérale",
    combinaison: "701 x 02 + AS47 x 02",
    indications: ["Diplégie", "Pieds tombants bilatéraux", "Steppage bilatéral", "Atteinte neurologique périphérique bilatérale"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["701.EX.05"]
  },
  {
    reference: "701.EX.06",
    nom: "701 + AP22 - Steppage avec instabilité cheville",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 avec baleinage bilatéral et tracteurs releveurs élastiques (AP22) pour steppage avec instabilité de cheville",
    combinaison: "701 + AP22",
    indications: ["Atteinte neurologique avec instabilité de cheville", "Pieds tombants avec instabilité cheville", "Steppage avec instabilité articulaire"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["701.EX.06"]
  },
  {
    reference: "701.EX.07",
    nom: "701 + AS51 + 709 - PBVE unilatéral opéré",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 avec contrefort unilatéral (AS51) pour PBVE opéré côté atteint et chaussure complément (709) côté sain",
    combinaison: "701 + AS51 + 709",
    indications: ["Pied Bot Varus Équin (PBVE) unilatéral opéré", "PBVE unilatéral non opéré avec acquisition marche"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["701.EX.07"]
  },
  {
    reference: "701.EX.08",
    nom: "701 x 02 + AS51 x 02 - PBVE bilatéral opéré",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 en paire avec contrefort unilatéral bilatéral (AS51) pour PBVE bilatéral opéré (chaussure forme retournée)",
    combinaison: "701 x 02 + AS51 x 02",
    indications: ["Pied Bot Varus Équin (PBVE) bilatéral opéré", "PBVE bilatéral avec acquisition de la marche"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["701.EX.08"]
  },
  {
    reference: "701.EX.09",
    nom: "701 + AS50 - Instabilité cheville post-traumatique",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 avec baleinage bilatéral et capitonnage (AS50) pour instabilité importante de cheville",
    combinaison: "701 + AS50",
    indications: ["Instabilité importante de cheville post-traumatique", "Séquelles neurologiques avec instabilité cheville"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["701.EX.09"]
  },
  {
    reference: "701.EX.10",
    nom: "701 + AR31 + 709 - Inégalité MI 3-6cm",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 avec orthèse intérieure 2-6cm (AR31) côté court et chaussure complément (709) côté normal pour inégalité membre inférieur de 3 à 6 cm",
    combinaison: "701 + AR31 + 709",
    indications: ["Inégalité d'un membre inférieur de 3 à 6 cm confirmée à la télémétrie"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["701.EX.10"]
  },
  {
    reference: "701.EX.11",
    nom: "701 + AR31 + AR32 + 709 - Inégalité MI >6cm",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 avec orthèse intérieure 2-6cm (AR31) + raccourcissement >6cm (AR32) côté court et chaussure complément (709) côté normal pour inégalité membre inférieur supérieure à 6 cm",
    combinaison: "701 + AR31 + AR32 + 709",
    indications: ["Inégalité d'un membre inférieur supérieure à 6 cm confirmée à la télémétrie"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["701.EX.11"]
  },
  {
    reference: "701.EX.12",
    nom: "701 + MO91 + 01 + 709 - Amputation trans-métatarsienne",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 avec moulage pied/malléoles (MO91) + ortho-prothèse métatarsienne (01) côté amputé et chaussure complément (709) côté sain",
    combinaison: "701 + MO91 + 01 + 709",
    indications: ["Amputation de l'avant-pied trans-métatarsienne (Lisfranc)"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["701.EX.12"]
  },
  {
    reference: "701.EX.13",
    nom: "701 + AD14/15/16 + 703 - Équinisme irréductible",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 avec orthèse correction tige montante 8-14cm (AD14) ou 14-18cm (AD15) ou >18cm (AD16) côté équin et chaussure compensation (703) côté sain pour équinisme irréductible unilatéral",
    combinaison: "701 + AD14 ou AD15 ou AD16 + 703",
    indications: ["Équinisme irréductible unilatéral selon hauteur (8-14cm, 14-18cm, >18cm)"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["701.EX.13"]
  },
  {
    reference: "702.EX.01",
    nom: "702 + AD14/15/16 + 704 - Équinisme pied fragilisé",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 702 (peausserie fine) avec orthèse correction tige montante (AD14/15/16) côté équin et chaussure compensation (704) côté sain pour équinisme irréductible unilatéral sur pied fragilisé",
    combinaison: "702 + AD14 ou AD15 ou AD16 + 704",
    indications: ["Équinisme irréductible unilatéral sur pied fragilisé (diabétique, polyarthrite, brûlure)"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["702.EX.01"]
  },
  {
    reference: "705.EX.01",
    nom: "705 x 02 + AS47 x 02 - Diplégie avec GAM",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure à tourillon 705 en paire avec bride en T (AS47) bilatérale pour recevoir un Grand Appareil de Marche (GAM) en cas de diplégie",
    combinaison: "705 x 02 + AS47 x 02",
    indications: ["Diplégie polio nécessitant GAM", "Spina-bifida nécessitant GAM", "Déformations axiales complexes du pied nécessitant GAM"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["705.EX.01"]
  },
  {
    reference: "705.EX.02",
    nom: "705 + AR31 + 709 - GAM avec inégalité MI",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure à tourillon 705 avec compensation 2-6cm (AR31) côté court pour GAM et chaussure complément (709) côté sain",
    combinaison: "705 + AR31 + 709",
    indications: ["GAM ou PAM avec inégalité membre inférieur 3-6cm"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["705.EX.02"]
  },
  {
    reference: "721.EX.01",
    nom: "721 + 709 + MO91 + 02 - Amputation Chopart",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussette montante 721 avec moulage (MO91) + ortho-prothèse Chopart (02) côté amputé et chaussure complément (709) côté sain pour amputation tarsienne",
    combinaison: "721 + 709 + MO91 + 02",
    indications: ["Amputation tarsométatarsienne type CHOPART", "Amputation métatarsienne type LISFRANC"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["721.EX.01"]
  },
  {
    reference: "AD.EX.01",
    nom: "AD11 - Déformations orteils",
    categorie: "Podo-orthèses - Adjonctions",
    description: "Orthèse pour déformations irréductibles des orteils : hallux valgus de 35° ou orteils en griffe",
    combinaison: "AD11",
    indications: ["Hallux valgus ≥ 35°", "Orteils en griffe irréductibles"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["AD.EX.01"]
  },
  {
    reference: "AD.EX.02",
    nom: "AD12 - Amputation orteil",
    categorie: "Podo-orthèses - Adjonctions",
    description: "Orthèse pour trouble complexe suite à amputation d'un orteil",
    combinaison: "AD12",
    indications: ["Amputation d'un ou plusieurs orteils"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["AD.EX.02"]
  },
  {
    reference: "AD.EX.03",
    nom: "AD13 - Cas complexe déformations graves",
    categorie: "Podo-orthèses - Adjonctions",
    description: "Orthèse compensant et enveloppant des déformations graves irréductibles ou partiellement réductibles",
    combinaison: "AD13",
    indications: ["Déformations graves irréductibles du pied", "Déformations partiellement réductibles complexes"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["AD.EX.03"]
  },
  {
    reference: "MO.EX.01",
    nom: "MO91 - Moulage pied/malléoles",
    categorie: "Podo-orthèses - Moulages",
    description: "Moulage du pied enveloppant les malléoles et le pilon tibial pour cas complexes nécessitant un moulage précis",
    combinaison: "MO91",
    indications: ["Déformations complexes invétérées nécessitant moulage", "Amputations nécessitant moulage", "Pieds fragilisés nécessitant moulage"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["MO.EX.01"]
  },
  {
    reference: "MO.EX.02",
    nom: "MO92 - Moulage pied/jambe",
    categorie: "Podo-orthèses - Moulages",
    description: "Moulage du pied et de la jambe jusqu'aux plateaux tibiaux pour cas très complexes",
    combinaison: "MO92",
    indications: ["Déformations très complexes nécessitant moulage étendu", "Atteintes neurologiques sévères"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["MO.EX.02"]
  },
  {
    reference: "AS.EX.01",
    nom: "AS47 - Bride en T releveur",
    categorie: "Podo-orthèses - Adjonctions",
    description: "Bride en T anti-varus ou anti-valgus ou releveurs élastiques sans baleinage pour correction déviation axiale",
    combinaison: "AS47",
    indications: ["Déviation en varus du pied", "Déviation en valgus du pied", "Pied tombant léger sans instabilité cheville"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["AS.EX.01"]
  },
  {
    reference: "AS.EX.02",
    nom: "AP22 - Baleinage + tracteurs releveurs",
    categorie: "Podo-orthèses - Adjonctions",
    description: "Adjonction pour chaussure de paralysie : baleinage bilatéral et tracteurs releveurs en sangles élastiques fixés sur la claque",
    combinaison: "AP22",
    indications: ["Pied tombant avec instabilité de cheville", "Paralysie avec steppage et instabilité"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["AS.EX.02"]
  },
  {
    reference: "AR.EX.01",
    nom: "AR31 - Compensation 2-6cm",
    categorie: "Podo-orthèses - Adjonctions",
    description: "Orthèse intérieure avec ou sans faux-bout de 2 à 6 cm de raccourcissement pour compenser inégalité membre inférieur",
    combinaison: "AR31",
    indications: ["Inégalité membre inférieur de 2 à 6 cm"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["AR.EX.01"]
  },
  {
    reference: "AR.EX.02",
    nom: "AR32 - Compensation >6cm",
    categorie: "Podo-orthèses - Adjonctions",
    description: "Raccourcissement au-dessus de 6 cm pour compenser inégalité importante membre inférieur (utilisé avec AR31)",
    combinaison: "AR32",
    indications: ["Inégalité membre inférieur supérieure à 6 cm (avec AR31)"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["AR.EX.02"]
  },
  {
    reference: "709.EX.01",
    nom: "709 - Chaussure complément côté sain",
    categorie: "Podo-orthèses - Compléments",
    description: "Chaussure de complément du côté sain à visée esthétique pour équilibrer avec le côté atteint portant chaussure orthopédique",
    combinaison: "709",
    indications: ["Complément esthétique côté sain en cas d'appareillage unilatéral", "Hémiplégie", "Inégalité membre inférieur", "Amputation unilatérale"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["709.EX.01"]
  }
,
  // ========== CHAUSSURES COMPLÈTES AVEC TOUS LES DÉTAILS DU PDF ==========
  {
    reference: "701",
    nom: "Chaussure orthopédique 701 - Peausserie forte (Box)",
    categorie: "Podo-orthèses - Chaussures",
    description: `Chaussure à peausserie forte, à tige montante ou basse.
• Réalisée soit sur tracé ou après un moulage.
• Possède systématiquement un contrefort rigide postérieur bilatéral.
• Semelles de correction intégrées systématiquement.
• Le talon ne doit être compensé que pour les atteintes neurologiques centrales ou périphériques.
• Fermeture en lacets ou en velcros selon les capacités du malade.
• La hauteur de la tige est déterminée selon la pathologie et les besoins techniques (mise en place des adjonctions : releveur AS47, compensation AR31, AR32, ou autre).`,
    indications: ["Pieds plats avec valgus ou varus de l'arrière-pied après échec d'une correction avec une orthèse plantaire (semelle) = 701 x 02", "Pieds plats avec valgus de l'avant-pied = 701 x 02 + AS52 x 02", "Metatarsus varus = 701 x 02 + AS51 x 02", "Atteinte neurologique centrale ou périphérique unilatérale = 701 x 01 + AS47 + 709 ou bilatérale = 701 x 02 + AS47 x 02 (pieds tombants, steppage)", "Atteinte neurologique centrale ou périphérique uni ou bilatérale (pieds tombants, steppage) avec instabilité de la cheville = 701 + AP22", "Pieds Bots Varus Équins (PBVE) unilatérale 701 + AR51 + 709 ou bilatérale 701 x 02 + AR51 x 02 opéré ou non avec acquisition de la marche (chaussure forme retournée)", "Instabilité importante de la cheville post traumatique ou séquelles neurologiques = 701 + AS50", "Inégalité d'un membre inférieur de 03 cm à 06 cm confirmée à la télémétrie = 701 + AR31 + 709 (chaussure complément)", "Inégalité d'un membre inférieur supérieure à 06 cm confirmée à la télémétrie = 701 x 01 + AR31 + AR32 + 709", "Amputation de l'avant-pied trans-métatarsienne (Lisfranc) = 701 + MO91 + 01 + 709", "Équinisme irréductible unilatéral = 701 + AD14 ou AD15 ou AD16 + 703, en fonction de la hauteur de l'équinisme"],
    remarque: "Les releveurs (AP22 et AS47) et le prolongement du contrefort (AS51 ou AS52) ne peuvent pas être adjoints sur une même chaussure. Chez l'enfant, il faut privilégier la correction, donc le contrefort, par contre chez l'adulte, c'est le releveur qui prédomine.",
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["701"]
  },
  {
    reference: "702",
    nom: "Chaussure orthopédique 702 - Peausserie fine (Chevreau)",
    categorie: "Podo-orthèses - Chaussures",
    description: `Chaussure à peausserie fine, à tige montante ou basse.
• Réalisée soit sur tracé ou après un moulage.
• Le talon doit être compensé uniquement pour les atteintes neurologiques centrales ou périphériques.
• Semelles de correction ou de confort intégrées systématiquement.
• Le 702 peut recevoir les mêmes adjonctions que le 701 sauf le contrefort AS51 et AS52.
• Fermeture en lacets ou en velcros selon les capacités du malade.
• La hauteur de la tige est déterminée selon la pathologie et les besoins techniques (mise en place des adjonctions : releveur AS47, compensation AR31, AR32, ou autre).`,
    indications: ["Pieds diabétiques secondaires à : Artériopathie diabétique confirmée à l'écho-Doppler", "Pieds diabétiques secondaires à : Neuropathie diabétique confirmée à l'EMG", "Mal perforant plantaire", "Amputations d'un ou de plusieurs orteils", "Polyarthrite rhumatoïde au stade de déformation", "Lymphœdème uni ou bilatéral", "Séquelles importantes de brûlure"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["702"]
  },
  {
    reference: "703",
    nom: "Chaussure orthopédique 703 - Compensation peausserie forte",
    categorie: "Podo-orthèses - Chaussures",
    description: `Chaussure de compensation du pied sain chez un patient présentant un équinisme irréductible du membre controlatéral.
• Chaussure à peausserie forte, à tige montante.
• Réalisée sur tracé.
• Une semelle de compensation.
• Fermeture en lacets ou en velcros selon les capacités du malade.`,
    indications: ["Équinisme irréductible unilatéral corrigé par 701 + AD14 ou AD15 ou AD16 et le côté sain 703"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["703"]
  },
  {
    reference: "704",
    nom: "Chaussure orthopédique 704 - Compensation peausserie fine",
    categorie: "Podo-orthèses - Chaussures",
    description: `Chaussure de compensation du pied sain chez un patient présentant un équinisme irréductible sur pied fragilisé du membre controlatéral.
• Chaussure à peausserie fine, à tige montante.
• Réalisée sur tracé.
• Une semelle de compensation.
• Fermeture en lacets ou en velcros selon les capacités du malade.`,
    indications: ["Équinisme irréductible unilatéral sur pieds fragilisé corrigé par 702 + AD14 ou AD15 ou AD16 et le côté sain 704"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["704"]
  },
  {
    reference: "705",
    nom: "Chaussure orthopédique 705 - À tourillon peausserie forte",
    categorie: "Podo-orthèses - Chaussures",
    description: `Chaussure à tourillon à peausserie forte, à tige montante destinée à recevoir un Grand ou un Petit Appareil de Marche (GAM-PAM).
• Réalisée soit sur tracé ou après un moulage.
• Possède systématiquement un contrefort rigide postérieur bilatéral.
• Semelles de correction intégrées systématiquement.
• Le talon possède un tourillon.
• Une bride en T peut être intégrée en cas de déviation axiale (valgus et varus).
• Fermeture en lacets ou en velcros selon les capacités du malade.`,
    indications: ["Mono ou diplégie polio", "Spina-bifida", "Atteinte neurologique centrale ou périphérique", "Toutes les déformations axiales et complexes du pied"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["705"]
  },
  {
    reference: "706",
    nom: "Chaussure orthopédique 706 - À tourillon peausserie fine",
    categorie: "Podo-orthèses - Chaussures",
    description: `Chaussure à tourillon à peausserie fine, à tige montante destinée à recevoir un Grand ou Petit Appareil de Marche (GAM-PAM) pour des pieds fragilisés.
• Réalisée soit sur tracé ou après un moulage.
• Semelles de correction intégrées systématiquement.
• Le talon possède un tourillon.
• Une bride en T peut être intégrée en cas de déviation axiale (valgus et varus).
• Fermeture en lacets ou en velcros selon les capacités du malade.`,
    indications: ["Les mêmes indications que 705 mais sur pieds fragilisés"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["706"]
  },
  {
    reference: "709",
    nom: "Chaussure orthopédique 709 - Chaussure de complément",
    categorie: "Podo-orthèses - Chaussures",
    description: `Chaussure de complément du côté sain à visée esthétique.
• Chaussure à tige montante ou basse.
• Chaussure à peausserie forte.
• Exemple : Hémiplégie gauche : 701 + AS47 à gauche et 709 à droite.`,
    indications: ["Complément esthétique du côté sain en cas d'appareillage unilatéral"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["709"]
  },
  {
    reference: "721",
    nom: "Chaussure orthopédique 721",
    categorie: "Podo-orthèses - Chaussures",
    description: `Chaussette à tige montante faite sur mesure en enveloppant et en capitonnant le moignon.
• Faux bout en antérieur.
• Portée dans une chaussure de commerce.`,
    indications: ["Amputation tarsométatarsienne uni ou bilatérale type CHOPART", "Amputation métatarsienne uni ou bilatérale type LISFRANC", "D'origine artériopathie diabétique ou traumatique"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["721"]
  },
  {
    reference: "722",
    nom: "Chaussure orthopédique 722",
    categorie: "Podo-orthèses - Chaussures",
    description: `Chaussette à tige montante faite sur mesure en enveloppant et en capitonnant le moignon jusqu'à 16 cm.
• Faux bout en antérieur.
• Portée dans une chaussure de commerce.`,
    indications: ["Amputation tarsométatarsienne type CHOPART", "Amputation métatarsienne type LISFRANC"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["722"]
  },
  {
    reference: "CHAU.B.OUV",
    nom: "Chaussure orthopédique à bout ouvert",
    categorie: "Podo-orthèses - Chaussures",
    description: `Chaussure non destinée à la marche.
• Chaussure à peausserie forte, à tige montante.
• Réalisée soit sur tracé ou après un moulage.
• Possède systématiquement un contrefort rigide postérieur bilatéral.
• Le bout est ouvert et la fermeture en lacets ou velcros.
• Peuvent être indiqués seules ou placés sur une attelle de correction appelée attelle de Denis-Browne.`,
    indications: ["Pieds Bot Varus Équin (PBVE) opéré ou non avant l'acquisition de la marche"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["CHAU.B.OUV"]
  }
,
  // ========== CASQUES TR 12 AVEC TOUS LES DÉTAILS DU PDF ==========
  {
    reference: "TR 12 D 01",
    nom: "Casque de Protection Type 1 - TR 12 D 01 (Duralumin)",
    categorie: "Orthèses - Crâne",
    description: `Casque en alliage léger.
• Comportant un capitonnage intérieur en matière cellulaire avec garnissage en peau.
• Doit couvrir entièrement la tête jusqu'au front en épousant bien sa forme et en libérant les deux oreilles.`,
    indications: ["Épilepsie grave avec multiples chutes chez l'enfant ou l'adulte", "Enfants ou adultes atteints d'Infirmité Motrice Cérébrale (IMC) accompagné de trouble du comportement", "Autisme avec troubles du comportement"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["TR 12 D 01"]
  },
  {
    reference: "TR 12 N 35",
    nom: "Casque de Protection Type 2 - TR 12 N 35 (Polyéthylène)",
    categorie: "Orthèses - Crâne",
    description: `Casque en polyéthylène.
• Comportant un capitonnage intérieur en matière cellulaire avec garnissage en peau.
• Doit couvrir entièrement la tête jusqu'au front en épousant bien sa forme et en libérant les deux oreilles.`,
    indications: ["Trépanation", "Ostéotomie partielle du crâne", "Protection d'un crâne après chirurgie"],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["TR 12 N 35"]
  },
  {
    reference: "TR 12 S 25",
    nom: "Casque de Protection Type 3 - TR 12 S 25 (Résine polyester stratifié)",
    categorie: "Orthèses - Crâne",
    description: `Casque en résine polyester stratifié.
• Comportant un capitonnage intérieur en matière cellulaire avec garnissage en peau avec fixation selon la nécessité.
• Il est peu fréquent et difficile à réaliser.
• Doit couvrir entièrement la tête jusqu'au front en épousant bien sa forme et en libérant les deux oreilles.`,
    indications: ["Trépanation", "Ostéotomie partielle du crâne", "Protection d'un crâne découvert après chirurgie"],
    remarque: "Le casque pour les déformations crâniennes (brachycéphalie, plagiocéphalie, scaphocéphalie) du bébé peut être prescrit mais il n'est pas pris en charge.",
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["TR 12 S 25"]
  }
,
  {
    reference: "C114",
    nom: "Collier Cervical Souple - C114",
    description: `Collier cervical souple réalisé sur mesure.
• Collier réalisé sur mesure en polypropylène d'un ou de deux millimètres avec un appui sous mentonnier en avant et occipital en arrière.
• Fermeture en postérieur en velcro.`,
    indications: [
          "Lésions rhumatismales minimes : cervicarthrose",
          "Lésions musculaires : torticolis musculaire",
          "Névralgies cervico-brachiales",
          "Soulagement et mise au repos des muscles du cou"
    ],
    remarque: "À visée antalgique ; les mouvements du cou sont restreints, sans pour autant les empêcher complètement."
  },
  {
    reference: "C160",
    nom: "Collier Cervical Rigide - C160",
    description: `Collier cervical rigide avec plaque semi-rigide interne.
• Restreint davantage les mouvements en offrant un soutien prolongé de la nuque.
• Limite les mouvements de rotation de la tête et d'étirement du cou grâce à une plaque semi-rigide située à l'intérieur du collier.
• Cette plaque a également une fonction correctrice de la posture de la nuque.`,
    indications: [
          "Lésions rhumatismales importantes : cervicarthrose étagée",
          "Lésions musculaires : torticolis musculaire douloureuse",
          "Névralgies cervico-brachiales importantes",
          "Hernies discales"
    ]
  },
  {
    reference: "TR 23 N 35",
    nom: "Minerve Courte - TR 23 N 35",
    categorie: "Orthèses - Crâne et Cou",
    description: `Minerve courte réalisée sur mesure pour immobiliser le rachis cervical.
Composition :
• Valve postérieure couvrant les épines des omoplates remontant sur l'occiput
• Valve antérieure prenant un appui sous mentonnier et thoracique en polyéthylène "N"
• Appui sous mentonnier en avant et occipital en arrière
• Fermeture latérale en velcro

Destinée aux lésions nécessitant une contention rigoureuse.
Port permanent jour et nuit. Les conditions du port varient selon la nature de la pathologie et l'avis du médecin traitant.`,
    indications: [
          "Lésion rhumatismale très importante et hyperalgique",
          "Fractures du rachis cervical",
          "Hernies discales hyperalgiques"
    ],
    criteres_conformite: [
          "Doit maintenir la tête dans une position droite",
          "Limite les mouvements de flexion et/ou de rotation",
          "Fermeture postérieure d'environ 2 à 3 cm",
          "Doit arriver au niveau du menton",
          "Se pose sur manubrium sternal en antérieur",
          "Appui sur os occipitaux et rachis dorsal haut en postérieur",
          "Immobilise le rachis cervical en totalité"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "TR 25 N 36",
    nom: "Minerve Cervico-dorsale - TR 25 N 36",
    categorie: "Orthèses - Crâne et Cou",
    description: `Minerve cervico-dorsale réalisée sur mesure pour immobiliser le rachis cervico-dorsal.
Composition :
• Valve postérieure prenant appui sur la partie supérieure de la cage thoracique, remontant sur les épaules, prenant les appuis sous occipitaux et remontant sur l'occiput
• Valve antérieure prenant un appui thoracique et sous mentonnier en polyéthylène "N"
• Fixation en mode d'attache en velcro

Destinée à immobiliser le rachis cervico-dorsal en totalité.
Port permanent jour et nuit. Les conditions du port varient selon la nature de la pathologie et l'avis du médecin traitant.`,
    indications: [
          "Lésions du rachis cervico-dorsale d'origine rhumatismale",
          "Lésions du rachis cervico-dorsale d'origine traumatique",
          "Lésions du rachis cervico-dorsale d'origine neuromusculaire : torticolis congénitale",
          "Lésions du rachis cervico-dorsale d'origine infectieuse",
          "Phase post opératoire d'une fracture du rachis cervico-dorsale",
          "Phase post opératoire d'une hernie discale cervicale hyperalgique",
          "Prévention de déformations évolutives du rachis cervico-dorsal"
    ],
    criteres_conformite: [
          "Doit arriver au niveau du menton",
          "Se pose sur manubrium sternal en antérieur",
          "Appui sur os occipitaux et rachis dorsal haut en postérieur",
          "Immobilise le rachis cervical en totalité"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "CMV",
    nom: "Verticalisateur (CMV) - Coque Mobile de Verticalisation",
    categorie: "Orthèses - Tronc",
    description: `Orthèse de maintien en position verticale pour enfants IMC.
Composition :
• Coque postérieure en matière plastique thermoformée
• Montée sur un socle réglable

Personnalisable avec adjonctions :
• Têtière fixe ou réglable
• Support roulant avec ou sans système progressif de verticalisation
• Tablette
• Plastron et sangles abdominales
• Coque pédieuse`,
    indications: [
          "Enfants atteints de déficience grave de la statique d'origine neurologique",
          "Déficience grave de la statique d'origine musculaire ou génétique",
          "IMC sévère, quadriplégie spastique",
          "Prévention de la stase pulmonaire et urinaire"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "SAMO",
    nom: "Selle d'Abduction Mobile (SAMO)",
    categorie: "Orthèses - Tronc",
    description: `Selle d'abduction mobile pour enfants IMC n'ayant pas acquis la marche.
Composition :
• Selle-corset ou orthèse thermoformé fabriqué sur mesure
• S'adapte à la morphologie de l'enfant
• Réglable en hauteur et en inclinaison
• Montée sur un support (châssis) roulant bien stabilisé
• Guidon à l'avant réglable en hauteur et inclinable

La selle autorise la déambulation. Le guidon permet à l'enfant d'y poser ses bras pour éviter qu'ils restent ballants. Aussi appelée Motilo ou Orthèse de déambulation.`,
    indications: [
          "Enfants IMC n'ayant pas acquis la marche",
          "Enfants ayant acquis la position assise avec troubles graves de la statique",
          "Troubles statiques d'origines neurologiques ou musculaires",
          "Contrôle orthopédique du bassin et du tronc",
          "Libération des membres inférieurs pour trouver des appuis stables"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "CMB",
    nom: "Ceinture de Maintien Lombaire (CMB) - Lombostat",
    categorie: "Ceintures de Maintien",
    description: `Ceinture de maintien lombaire réalisée sur mesure.
Composition :
• Tissu non extensible (toile de bâche) devant et derrière
• Tissu extensible sur les côtés (damier)
• Renforcement rigide de soutien "coutil baleiné" en postérieur
• Hauteur variable mais s'arrête généralement à D09
• Fermeture en avant`,
    indications: [
          "Lumbago, lombo-sciatalgies",
          "Conflit disco-radiculaire opéré ou non",
          "Lésions dégénératives du rachis lombaire (arthrose)",
          "Ostéoporose",
          "Soulagement des douleurs lombaires"
    ],
    criteres_conformite: [
          "Présence des différents éléments : élastique latéral et baleinage",
          "Doit bien maintenir la région lombaire",
          "Permet une position assise sans aucune gêne"
    ],
    type: "Dispositif médical"
  },
  {
    reference: "CMA",
    nom: "Ceinture de Maintien Abdominal (CMA)",
    categorie: "Ceintures de Maintien",
    description: `Ceinture de maintien abdominal réalisée sur mesure.
Composition :
• Tissu non extensible devant et derrière
• Tissu extensible sur les côtés
• Renforcement avec baleines souples de soutien abdominal en antérieur
• Hauteur variable mais s'arrête généralement à D12
• Fermeture en arrière

Important : C'est une ceinture de contention et de maintien, en aucun cas une solution ou un traitement d'hernie abdominale. Elle limite la tension et le volume de la hernie.`,
    indications: [
          "Hernie de la ligne blanche ou para ombilicale (ceinture de contention, pas de solution chirurgicale)",
          "Éventration",
          "Maintien de la cicatrice de laparotomie",
          "Ptose abdominale",
          "Presso-thérapie (favorise la disparition de l'œdème)",
          "Prévention de douleur cicatricielle"
    ],
    criteres_conformite: [
          "Présence des différents éléments : élastique latéral et baleinage",
          "Doit bien maintenir la région abdominale",
          "Permet une position assise sans aucune gêne"
    ],
    type: "Dispositif médical"
  },
  {
    reference: "CMAB",
    nom: "Ceinture de Maintien Abdomino-lombaire (CMAB)",
    categorie: "Ceintures de Maintien",
    description: `Ceinture de maintien abdomino-lombaire - combinaison entre CMB et CMA.
Composition :
• Tissu non extensible (toile de bâche) devant et derrière
• Tissu extensible sur les côtés (damier)
• Renforcement rigide de soutien "coutil baleiné" en postérieur
• Renforcement souple en antérieur
• Fermeture sur le côté gauche

Variantes selon hauteur postérieure :
• CMAB D12 (12ème vertèbre dorsale)
• CMAB D09 (9ème vertèbre dorsale)`,
    indications: [
          "Maintien ou soulagement des douleurs lombaires et/ou dorsales",
          "Pathologie abdominale associée aux indications CMA",
          "Combinaison de pathologies lombaires et abdominales"
    ],
    criteres_conformite: [
          "Présence des différents éléments : élastique latéral et baleinage",
          "Doit bien maintenir les régions lombaire et abdominale",
          "Permet une position assise sans aucune gêne"
    ],
    type: "Dispositif médical"
  },
  {
    reference: "OS 59 G01",
    nom: "Attelle Palmaire Type 1 - OS 59 G01",
    categorie: "Orthèses - Membres Supérieurs",
    description: `Attelle palmaire faite sur mesure en poly-isoprène G (Polysar) sans armature.
Composition :
• Gaine enveloppant le 1/3 inférieur de l'avant-bras niveau (5)
• Jusqu'aux extrémités distales des doigts (9)
• Matériau : Poly-isoprène G (Polysar)
• Sans armature métallique

Guêtre de protection destinée à prendre le relais après une contention plâtrée.
Essentiellement nocturne, utilisée pour le maintien d'une position corrigée afin de prévenir l'aggravation des troubles orthopédiques.

Ces indications sont des pathologies pour lesquelles l'orthèse peut apporter un soulagement par immobilisation ou prévenir l'aggravation des séquelles.

Important : Ne jamais laisser ces orthèses à côté d'une source de chaleur (même le soleil) car elles seront déformées et ne répondront plus à leur indication.`,
    indications: [
          "Hémiplégie post AVC",
          "Polyarthrite rhumatoïde",
          "Syndrome Douloureux Régional Complexe Type II (SRDC 2)",
          "Tendinite du poignet",
          "Entorse grave du poignet",
          "Syndrome du canal carpien après échec médical et chirurgical",
          "Post-opératoire",
          "Traitement à court ou moyen terme"
    ],
    criteres_conformite: [
          "Réalisée en position dite de fonction avec ouverture de la première commissure de la main et les doigts en position semi fléchis",
          "Limites proximales de 2 à 3 cm du pli du coude et bien épouser la morphologie du membre",
          "Les sangles doivent assurer le bon maintien de l'attelle sur le membre",
          "Assurer un maintien correct, confortable, indolore et faciliter la mise"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OS 79 G01",
    nom: "Attelle Palmaire Type 2 (Orthèse Palmaire) - OS 79 G01",
    categorie: "Orthèses - Membres Supérieurs",
    description: `Attelle palmaire faite sur mesure en poly-isoprène G (Polysar) sans armature.
Composition :
• Gaine enveloppant la paume de la main (7)
• Jusqu'aux extrémités distales des doigts (9)
• Matériau : Poly-isoprène G (Polysar)
• Sans armature métallique

Les orthèses des mains sont aussi utilisées en post-opératoire, ou encore pour aider un mouvement et ainsi améliorer la fonction de la main et du poignet.

Important : Ne jamais laisser ces orthèses à côté d'une source de chaleur (même le soleil) car elles seront déformées et ne répondront plus à leur indication.`,
    indications: [
          "Arthrose inter phalangienne ou metacarpo-phalangienne avec ou sans déviations distales",
          "Maladie de Dupuytren",
          "Brûlures",
          "Post-opératoire",
          "Aide au mouvement pour améliorer fonction main et poignet"
    ],
    criteres_conformite: [
          "Réalisée en position dite de fonction avec ouverture de la première commissure de la main et les doigts en position semi fléchis",
          "Limites proximales de 2 à 3 cm du pli du coude et bien épouser la morphologie du membre",
          "Les sangles doivent assurer le bon maintien de l'attelle sur le membre",
          "Assurer un maintien correct, confortable, indolore et faciliter la mise"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OS 57 N01",
    nom: "Gaine Rigide de l'Avant-Bras - OS 57 N01",
    categorie: "Orthèses - Membres Supérieurs",
    description: `Gaine rigide de l'avant-bras en polyoléfine sans armature.
Guêtre de protection destinée à prendre le relais après une contention plâtrée.`,
    indications: [
          "Fracture des deux os de l'avant-bras compliquée de pseudarthrose",
          "Après ischémie ou syndrome de Volkmann provoqués par un plâtre circulaire serré",
          "Post-contention plâtrée"
    ],
    criteres_conformite: [
          "Réalisée en position dite de fonction avec ouverture de la première commissure de la main et les doigts en position semi fléchis",
          "Limites proximales de 2 à 3 cm du pli du coude et bien épouser la morphologie du membre",
          "Les sangles doivent assurer le bon maintien de l'attelle sur le membre",
          "Assurer un maintien correct, confortable, indolore et faciliter la mise"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OS 58 C01",
    nom: "Attelle Avant-Bras Cuir Sans Armature - OS 58 C01",
    categorie: "Orthèses - Membres Supérieurs",
    description: `Attelle de l'avant-bras en cuir moulé sans armature métallique.
Gaine enveloppant la région métacarpienne et l'avant-bras.
Guêtre de protection destinée à prendre le relais après une contention plâtrée.`,
    indications: [
          "Fracture des deux os de l'avant-bras compliquée de pseudarthrose",
          "Après ischémie ou syndrome de Volkmann provoqués par un plâtre circulaire serré",
          "Post-contention plâtrée"
    ],
    criteres_conformite: [
          "Réalisée en position dite de fonction avec ouverture de la première commissure de la main et les doigts en position semi fléchis",
          "Limites proximales de 2 à 3 cm du pli du coude et bien épouser la morphologie du membre",
          "Les sangles doivent assurer le bon maintien de l'attelle sur le membre",
          "Assurer un maintien correct, confortable, indolore et faciliter la mise"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OS 58 C02",
    nom: "Attelle Avant-Bras Cuir Avec Armature - OS 58 C02",
    categorie: "Orthèses - Membres Supérieurs",
    description: `Attelle de l'avant-bras en cuir moulé avec armature métallique.
Constituée par une seule attelle palmaire.
Gaine enveloppant la région métacarpienne et l'avant-bras.`,
    indications: [
          "Fracture des deux os de l'avant-bras compliquée de pseudarthrose",
          "Après ischémie ou syndrome de Volkmann provoqués par un plâtre circulaire serré",
          "Post-contention plâtrée"
    ],
    criteres_conformite: [
          "Réalisée en position dite de fonction avec ouverture de la première commissure de la main et les doigts en position semi fléchis",
          "Limites proximales de 2 à 3 cm du pli du coude et bien épouser la morphologie du membre",
          "Les sangles doivent assurer le bon maintien de l'attelle sur le membre",
          "Assurer un maintien correct, confortable, indolore et faciliter la mise"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OS 58 N01",
    nom: "Attelle Avant-Bras Polyoléfine Sans Armature - OS 58 N01",
    categorie: "Orthèses - Membres Supérieurs",
    description: `Attelle de l'avant-bras en polyoléfine sans armature.
Gaine enveloppant la région métacarpienne et l'avant-bras.
Guêtre de protection destinée à prendre le relais après une contention plâtrée.`,
    indications: [
          "Fracture des deux os de l'avant-bras compliquée de pseudarthrose",
          "Après ischémie ou syndrome de Volkmann provoqués par un plâtre circulaire serré",
          "Post-contention plâtrée"
    ],
    criteres_conformite: [
          "Réalisée en position dite de fonction avec ouverture de la première commissure de la main et les doigts en position semi fléchis",
          "Limites proximales de 2 à 3 cm du pli du coude et bien épouser la morphologie du membre",
          "Les sangles doivent assurer le bon maintien de l'attelle sur le membre",
          "Assurer un maintien correct, confortable, indolore et faciliter la mise"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OS 58 N02",
    nom: "Attelle Avant-Bras Polyoléfine Avec Armature - OS 58 N02",
    categorie: "Orthèses - Membres Supérieurs",
    description: `Attelle de l'avant-bras en polyoléfine avec armature.
Gaine enveloppant la région métacarpienne et l'avant-bras.`,
    indications: [
          "Fracture des deux os de l'avant-bras compliquée de pseudarthrose",
          "Après ischémie ou syndrome de Volkmann provoqués par un plâtre circulaire serré",
          "Post-contention plâtrée"
    ],
    criteres_conformite: [
          "Réalisée en position dite de fonction avec ouverture de la première commissure de la main et les doigts en position semi fléchis",
          "Limites proximales de 2 à 3 cm du pli du coude et bien épouser la morphologie du membre",
          "Les sangles doivent assurer le bon maintien de l'attelle sur le membre",
          "Assurer un maintien correct, confortable, indolore et faciliter la mise"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OS 13 N01",
    nom: "Attelle de Sarmiento - OS 13 N01",
    categorie: "Orthèses - Membres Supérieurs",
    description: `Gouttière sans armature en polyéthylène réalisée après un moulage.
Orthèse pour épaule-bras destinée au maintien post-traumatique et post-opératoire.`,
    indications: [
          "Maintien post-traumatique des fractures de l'humérus",
          "Maintien post-opératoire",
          "Luxations de l'épaule",
          "Stabilisation de l'articulation de l'épaule pour prévenir les douleurs",
          "Favorise la mobilité en guidant le mouvement"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OS 13 N02",
    nom: "Attelle Épaule-Bras - OS 13 N02",
    categorie: "Orthèses - Membres Supérieurs",
    description: `Attelle pour épaule avec armature en polyéthylène.
Orthèse destinée au maintien et à la stabilisation de l'articulation de l'épaule.`,
    indications: [
          "Maintien post-traumatique des fractures de l'humérus",
          "Maintien post-opératoire",
          "Luxations de l'épaule",
          "Hémiplégies post-AVC",
          "Stabilisation de l'articulation de l'épaule pour prévenir les douleurs",
          "Favorise la mobilité en guidant le mouvement"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OS 16 N02",
    nom: "Orthèse Épaule-Bras-Avant-Bras - OS 16 N02",
    categorie: "Orthèses - Membres Supérieurs",
    description: `Orthèse pour épaule-bras et avant-bras avec ou sans armature en polyéthylène.
Réalisée après prise de mesure.`,
    indications: [
          "Maintien post-traumatique",
          "Maintien post-opératoire",
          "Pseudarthroses du bras et/ou du coude"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OS 36 N02",
    nom: "Orthèse Bras-Avant-Bras Avec Armature - OS 36 N02",
    categorie: "Orthèses - Membres Supérieurs",
    description: `Orthèse pour bras et avant-bras en polyéthylène avec armature.`,
    indications: [
          "Fractures du coude",
          "Arthrose du coude",
          "Prise en charge post-opératoire du coude"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OS 36 N11",
    nom: "Orthèse Bras-Avant-Bras Rigide au Coude (Sans Armature) - OS 36 N11",
    categorie: "Orthèses - Membres Supérieurs",
    description: `Orthèse du bras-avant-bras rigide au coude en polyéthylène sans armature (Figure B).
Orthèse standard pour immobilisation du coude.`,
    indications: [
          "Fracture du coude",
          "Lutter contre la spasticité des infirmités motrices cérébrales",
          "Atteintes neurologiques",
          "Paralysie du plexus brachial chez les nouveau-nés d'origine obstétricale ou traumatique"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OS 36 N11 SALUT IMC",
    nom: "Attelle de Salut (Position 90°) IMC Uni/Bilatérale - OS 36 N11 SALUT IMC",
    categorie: "Orthèses - Membres Supérieurs",
    description: `Orthèse d'immobilisation en polysar qui a pour but de maintenir l'articulation de l'épaule et du coude à 90° (position du salut).
Réalisée en une seule pièce avec une base thoracique maintenant tout le membre supérieur et laissant la main libre (attelle de salut).
Peut être unilatérale ou bilatérale (Figure C).

SPÉCIFICITÉ : Attelle de salut pour IMC, différente de l'orthèse standard OS 36 N11.`,
    indications: [
          "Fracture du coude",
          "Lutter contre la spasticité des infirmités motrices cérébrales (IMC)",
          "Atteintes neurologiques",
          "Paralysie du plexus brachial chez les nouveau-nés d'origine obstétricale",
          "Maintien position de salut à 90°"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OI 59 N 50",
    nom: "Attelle Jambo-Pédieuse de Posture - OI 59 N 50",
    categorie: "Orthèses - Membres Inférieurs",
    description: `Orthèse réalisée après un moulage, elle consiste à maintenir le pied à 90°.
En postérieure, allant du 1/3 supérieure de la jambe jusqu'aux orteils.
En antérieure des passants en velcro sont mis en place pour stabiliser la cheville et le pied.
Tapissée à l'intérieur par une mousse pour ne pas blesser le malade.
Parfois des ouvertures de part et d'autre du bord externe ou interne du pied sont réalisées pour une indication médicale.

Destinée à maintenir une position anatomique et à corriger les déformations des chevilles et des pieds.
Se porte la nuit le plus souvent.`,
    indications: [
          "Pieds en équins réductibles chez un enfant IMC sans atteinte des genoux",
          "Pied paralytique chez un hémiplégique",
          "Pieds bots varus équins réductibles opérés ou non",
          "Déviation axiale du pied (Metatarsus varus grave)"
    ],
    criteres_conformite: [
          "Maintenir l'articulation tibio-tarsienne en position neutre",
          "La partie proximale de l'attelle ne doit pas dépasser 02 cm du pli du genou pour permettre la position assise",
          "Les 2/3 du volume de la jambe et la totalité du pied doivent être à l'intérieur de l'attelle",
          "Les sangles doivent maintenir le pied et la jambe à l'intérieur de l'attelle sans pour autant exercer une pression sur le membre",
          "L'attelle doit être confortable sans aucune source de conflit avec le membre"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OI 39 N 53",
    nom: "Attelle Cruro-Pédieuse de Posture - OI 39 N 53",
    categorie: "Orthèses - Membres Inférieurs",
    description: `Orthèse réalisée après un moulage, elle consiste à maintenir le genou à 180° et le pied à 90°.
En postérieure, allant du 1/3 supérieur de la cuisse jusqu'aux orteils.
En antérieure des passants en velcro sont mis en place pour stabiliser et maintenir le genou, la cheville et le pied.
Tapissée à l'intérieur par une mousse pour ne pas blesser le malade.
Une barre d'abduction peut être mise en place en fonction de l'indication médicale.

Destinée pour les déformations combinées des genoux et des articulations tibio-tarsiennes qu'elles soient d'origine traumatique, neurologique ou malformative. 
Se porte la nuit. Permet la correction, la posture et/ou la verticalisation.

Observation : Une kinésithérapie conjointe est nécessaire. Des contrôles périodiques sont indispensables.`,
    indications: [
          "Enfants IMC avec flexum des genoux et équin des pieds réductibles",
          "Genu-valgum uni ou bilatéral avec angle > 10° associé à déformation des pieds en varus ou valgus",
          "Genu-varum uni ou bilatéral avec angle > 10° associé à déformation des pieds en varus ou valgus"
    ],
    criteres_conformite: [
          "Maintenir la totalité du membre inférieur au niveau de la face externe de la cuisse",
          "Arriver au-dessus du grand trochanter de 2 à 3 cm, du côté interne plus bas que le pli de l'aine de 1 à 2 cm",
          "Être à 5° (degré) de flexion au niveau du genou",
          "Englober les 2/3 de la circonférence du membre et la totalité du pied",
          "Les sangles au niveau du genou doivent être de part et d'autre de l'articulation avec utilisation d'une fronde rotulienne si nécessaire",
          "La sangle au niveau du haut de la cuisse doit être oblique",
          "Confortable sans aucune source de conflit avec le membre"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OI 36 N10",
    nom: "Attelle Cruro-Jambière de Posture - OI 36 N10",
    categorie: "Orthèses - Membres Inférieurs",
    description: `Orthèse réalisée après un moulage, elle consiste à maintenir le genou à 180°, le pied est libre.
En postérieure, allant du 1/3 supérieur de la cuisse jusqu'aux malléoles.
En antérieure des passants en velcro sont mis en place pour stabiliser le genou.
Tapissée à l'intérieur par une mousse pour ne pas blesser le malade.

Destinée à corriger les déformations orthopédiques du genou sans atteinte tibio-tarsienne.

Observation : Une kinésithérapie conjointe est nécessaire. Des contrôles périodiques sont indispensables.`,
    indications: [
          "Enfants IMC avec flexum des genoux réductibles",
          "Verticalisation suite à un traumatisme du rachis dorso-lombaire ou vertébro-médullaire",
          "Genu-valgum uni ou bilatéral clinique confirmé à la télémétrie angle 10° sans déformation des pieds",
          "Genu-varum uni ou bilatéral clinique confirmé à la télémétrie angle 10° sans déformation des pieds"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OI 36 N 11",
    nom: "Attelle Cruro-Jambière Articulée au Genou - OI 36 N 11",
    categorie: "Orthèses - Membres Inférieurs",
    description: `Orthèse réalisée après un moulage. Elle consiste à maintenir le genou lors de la marche; le pied est libre.
En postérieur, allant des 1/3 supérieurs de la cuisse jusqu'à la sus-malléole.
En antérieur des passants en velcro sont mis en place pour stabiliser le quadriceps.
En postérieur, une articulation au niveau du genou pour assurer la marche peut être bloquée et débloquée à l'aide d'un verrou.
Elle est tapissée à l'intérieur de mousse pour ne pas blesser le malade.

Destinée à corriger les déformations orthopédiques du genou sans atteinte tibio-tarsienne.

Une barre d'abduction peut être mise en place en fonction de l'indication médicale.`,
    indications: [
          "Enfants IMC avec flexum des genoux réductibles sans atteinte des pieds",
          "Stabilisation du genou lors de la marche par déficit du quadriceps suite à une atteinte neurologique centrale ou périphérique"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OI 59 C91",
    nom: "Petit Appareil de Marche (PAM) - OI 59 C91",
    categorie: "Orthèses - Membres Inférieurs",
    description: `Orthèse de jambe composée d'un ou deux montants latéraux en acier (C).
Une embrasse postérieure montée par une chaussure orthopédique à tourillon.
Ajouté à cela une bride en T (anti varus, anti valgus) et une butée excentrique pour limiter l'équin par spasticité importante du triceps sural.`,
    indications: [
          "Pied bot varus équin invétéré",
          "Pieds neurologiques distaux",
          "Pieds neurologiques avec valgus ou varus très important",
          "Maladie de Little"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OI 59 C90",
    nom: "Petit Appareil de Marche (PAM) - OI 59 C90",
    categorie: "Orthèses - Membres Inférieurs",
    description: `Orthèse de jambe composée d'un montant latéral en acier (C).
Une embrasse postérieure montée par une chaussure orthopédique à tourillon.
Ajouté à cela une bride en T (anti varus, anti valgus) et une butée excentrique pour limiter l'équin par spasticité importante du triceps sural.`,
    indications: [
          "Pied bot varus équin invétéré",
          "Pieds neurologiques distaux",
          "Pieds neurologiques avec valgus ou varus très important",
          "Maladie de Little"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OI 59 N66",
    nom: "Attelle Jambo-Pédieuse Articulée - OI 59 N66",
    categorie: "Orthèses - Membres Inférieurs",
    description: `Orthèse articulée réalisée après un moulage en thermoplastique, légère, avec articulation au niveau de la cheville qui permet la dorsiflexion lors de la marche.
Un dispositif postérieur limitant la flexion plantaire à 90°.
Elle permet de stabiliser la cheville sans limiter la marche, de corriger ou compenser les déformations du pied et de prévenir les rétractions tendineuses en particulier chez l'enfant.
Elle doit être portée dans une chaussure de commerce.`,
    indications: [
          "Maladie de Little",
          "Équinisme réductible",
          "Pieds neurologiques chez l'enfant"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OI 59 M50",
    nom: "Orthèse Heidelberg Sur Mesure - OI 59 M50",
    categorie: "Orthèses - Membres Inférieurs",
    description: `Orthèse statique en thermoplastique moulée à partir d'une empreinte plâtrée corrigée du patient.
Orthèse du pied empêchant la flexion plantaire, indiquée dans les troubles ou paralysie des muscles releveurs du pied.`,
    indications: [
          "Troubles ou paralysie des muscles releveurs du pied",
          "Varus de l'arrière pied très important",
          "Hémiplégie"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "AP 24",
    nom: "Releveur en Acier - AP 24",
    categorie: "Orthèses - Membres Inférieurs",
    description: `Se compose :
• D'un montant postérieur en acier ressort inoxydable
• D'une semelle super fine permettant de respecter les mouvements lors de la marche
• Une embrasse souple et capitonnée avec sangle intégrée pour un maintien de l'orthèse
• L'angle jambo-pédieux doit être inférieur à 90°`,
    indications: [
          "Paralysie ou insuffisance fonctionnelle du SPE (Sciatique Poplité Externe)",
          "Hémiplégie post AVC"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "D. De Petit",
    nom: "Attelle du Docteur Pierre Petit - D. De Petit",
    categorie: "Orthèses - Membres Inférieurs",
    description: `Composées de :
• 02 gouttières antérieures allant du 1/3 inférieur de la cuisse jusqu'au 1/3 supérieur de la jambe fixées sur un système de rotation qui permet de mettre les 02 hanches en abduction d'une manière fixe et continue.`,
    indications: [
          "Traitement de la Luxation Congénitale de Hanche (LCH)",
          "Permet le développement de l'articulation coxo-fémorale",
          "Contrôle parfaitement la rotation des membres inférieurs en position semi-fléchie"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "Denis Browne",
    nom: "Attelle de Denis Browne - Denis Browne",
    categorie: "Orthèses - Membres Inférieurs",
    description: `Attelle composée d'une paire de chaussure à bout ouvert fixée sur une barre avec un dispositif d'orientation dans les 03 points de l'espace.`,
    indications: [
          "En complément d'un traitement orthopédique ou chirurgical du Pied Bot Varus Équin (PBVE) uni ou bilatéral"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OI 39 N 52",
    nom: "Orthèse de Décharge Toronto (Chicago) - OI 39 N 52",
    categorie: "Orthèses - Membres Inférieurs",
    description: `Orthèse de décharge en abduction de la hanche.
Emboîture fémorale avec appui sous ischiatique en polyéthylène (N) haute capitonnée d'une mousse de confort.
Se termine par un patin.
Fermeture par sangle velcros.

Attelle de Toronto appelée aussi attelle de Chicago pour le traitement ambulatoire.`,
    indications: [
          "Ostéochondrite primitive de la hanche unilatérale",
          "Dysplasie primitive de la tête fémorale unilatérale"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OI 39 N50",
    nom: "Attelle de Marche Cruro-Pédieuse en Polyéthylène - OI 39 N50",
    categorie: "Orthèses - Membres Inférieurs",
    description: `Orthèse de marche réalisée après moulage ou sur tracé, allant du 1/3 supérieur de la cuisse (3) jusqu'au pied (9) avec armature (articulation au niveau du genou).
Les 02 segments sont moulés par du polyéthylène (N).
L'orthèse peut recevoir une chaussure à tourillon ou une chaussette à mettre dans une chaussure de commerce.`,
    indications: [
          "Séquelles de PAA",
          "Spina bifida",
          "Hémiplégie",
          "Paraplégie",
          "IMC"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OI 39 FC01",
    nom: "Orthèse Cruro-Pédieuse Fibre de Carbone - OI 39 FC01",
    categorie: "Orthèses - Membres Inférieurs",
    description: `Orthèse F.C.P (Fibre de Carbone) suffisamment souple pour respecter les articulations, assez rigide pour éviter toute rupture, avec une construction modulaire (remplacement des éléments si besoin).
Orthèse de marche en fibre de carbone destinée à recevoir une chaussure à tourillon.

Composée de :
• 04 tuteurs en carbone
• 04 embrasses en carbone
• 01 paire d'articulation de genou libre ou à verrou
• 01 paire d'articulation à tourillon

Exigences orthopédiques :
• Le poids du malade est inférieur ou égal à 90 kilos (orthèse très légère)
• Un raccourcissement inférieur à 02 cm confirmé à la télémétrie
• Absence de déviation axiale des genoux (varus ou valgus inférieur à 6°)`,
    indications: [
          "Lésions de l'appareil extenseur du genou associées ou non à un déficit de la cheville",
          "Sclérose en plaque",
          "Sclérose latérale amyotrophique (maladie de Charcot)",
          "Mono ou diplégie poliomyélitique et paraplégie",
          "Hémiplégie flasque",
          "Grave atteinte de l'intégrité de l'articulation de genou"
    ],
    type: "Grand appareillage"
  },
  {
    reference: "OI 39 FC07",
    nom: "Orthèse Cruro-Pédieuse Fibre de Carbone avec Botte - OI 39 FC07",
    categorie: "Orthèses - Membres Inférieurs",
    description: `Orthèse F.C.P (Fibre de Carbone) suffisamment souple pour respecter les articulations, assez rigide pour éviter toute rupture, avec une construction modulaire.
Orthèse de marche en fibre de carbone avec botte rigide ou chaussette.

Composée de :
• 04 tuteurs en carbone
• 04 embrasses en carbone
• 01 paire d'articulation de genou libre ou à verrou
• 01 botte thermoformée

Exigences orthopédiques :
• Le poids du malade est inférieur ou égal à 90 kilos (orthèse très légère)
• Un raccourcissement inférieur à 02 cm confirmé à la télémétrie
• Absence de déviation axiale des genoux (varus ou valgus inférieur à 6°)`,
    indications: [
          "Lésions de l'appareil extenseur du genou associées ou non à un déficit de la cheville",
          "Sclérose en plaque",
          "Sclérose latérale amyotrophique (maladie de Charcot)",
          "Mono ou diplégie poliomyélitique et paraplégie",
          "Hémiplégie flasque",
          "Grave atteinte de l'intégrité de l'articulation de genou"
    ],
    type: "Grand appareillage"
  }
];
