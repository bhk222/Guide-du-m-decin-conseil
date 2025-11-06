import { InjuryCategory } from '../types';

/**
 * BASE DE DONNÉES IPP - ORGANISATION ANATOMIQUE
 * Classification hiérarchique par système anatomique
 */

export const algerianBareme1967: InjuryCategory[] = [
  {
    name: "Membres Supérieurs",
    subcategories: [
      {
        name: "Amputation et Perte Totale de Fonction",
        injuries: [
          { 
            name: "Perte totale du membre supérieur (désarticulation scapulo-humérale)",
            rate: 85,
            description: "Article 1"
          },
          { 
            name: "Amputation du bras (entre épaule et coude)",
            rate: 75,
            description: "Article 2"
          },
          { 
            name: "Amputation de l'avant-bras (entre coude et poignet)",
            rate: 65,
            description: "Article 3"
          },
          { 
            name: "Amputation de la main (désarticulation du poignet)",
            rate: 60,
            description: "Article 4"
          },
        ]
      },
      {
        name: "Épaule",
        injuries: [
          { 
            name: "Ankylose complète de l'épaule en position favorable",
            rate: [35, 45],
            description: "Position favorable: abduction 45°, antépulsion 30°",
            rateCriteria: {
              low: "Position optimale, compensation satisfaisante",
              high: "Position sous-optimale, gêne fonctionnelle marquée"
            }
          },
          { 
            name: "Ankylose complète de l'épaule en position défavorable",
            rate: [50, 70],
            description: "Position défavorable: adduction serrée, rotation interne",
            rateCriteria: {
              low: "Possibilité de compensation partielle",
              high: "Position très défavorable, limitation majeure"
            }
          },
          { 
            name: "Raideur importante de l'épaule",
            rate: [20, 35],
            description: "Limitation importante des mouvements",
            rateCriteria: {
              low: "Mobilité réduite de moitié environ",
              high: "Mobilité très limitée, proche de l'ankylose"
            }
          },
          { 
            name: "Raideur modérée de l'épaule",
            rate: [10, 20],
            description: "Limitation modérée des mouvements",
            rateCriteria: {
              low: "Limitation discrète, gêne minime",
              high: "Limitation nette, gêne activités en hauteur"
            }
          },
        ]
      },
      {
        name: "Coude",
        injuries: [
          { 
            name: "Ankylose complète du coude en position favorable (90°)",
            rate: [35, 45],
            description: "Position à 90° considérée comme optimale",
            rateCriteria: {
              low: "Flexion 80-100°, compensation satisfaisante",
              high: "Position légèrement défavorable, gêne certaines activités"
            }
          },
          { 
            name: "Ankylose complète du coude en extension",
            rate: [50, 60],
            description: "Position très défavorable",
            rateCriteria: {
              low: "Extension quasi-complète (170-180°)",
              high: "Extension complète totale, limitation majeure"
            }
          },
          { 
            name: "Ankylose complète du coude en flexion complète",
            rate: [50, 60],
            description: "Position très défavorable",
            rateCriteria: {
              low: "Flexion modérée (< 45°)",
              high: "Flexion complète serrée, main au contact épaule"
            }
          },
          { 
            name: "Limitation importante de la flexion-extension du coude",
            rate: [20, 30],
            description: "",
            rateCriteria: {
              low: "Secteur utile conservé (80-120°)",
              high: "Secteur utile très réduit"
            }
          },
          { 
            name: "Limitation modérée de la flexion-extension du coude",
            rate: [10, 15],
            description: "",
            rateCriteria: {
              low: "Limitation discrète",
              high: "Limitation nette mais fonctionnelle"
            }
          },
        ]
      },
      {
        name: "Poignet",
        injuries: [
          { 
            name: "Ankylose complète du poignet en bonne position",
            rate: [25, 30],
            description: "Position neutre ou légère extension",
            rateCriteria: {
              low: "Position neutre idéale",
              high: "Position légèrement sous-optimale"
            }
          },
          { 
            name: "Ankylose complète du poignet en position défavorable",
            rate: [35, 45],
            description: "Flexion ou extension importante",
            rateCriteria: {
              low: "Flexion ou extension modérée",
              high: "Flexion ou extension très marquée"
            }
          },
          { 
            name: "Raideur importante du poignet",
            rate: [15, 20],
            description: "",
            rateCriteria: {
              low: "Mobilité réduite de moitié",
              high: "Mobilité très limitée"
            }
          },
          { 
            name: "Raideur modérée du poignet",
            rate: [8, 12],
            description: "",
            rateCriteria: {
              low: "Limitation discrète",
              high: "Limitation modérée mais fonctionnelle"
            }
          },
        ]
      },
      {
        name: "Main - Amputation des Doigts",
        injuries: [
          { 
            name: "Amputation totale des 5 doigts (main inutilisable)",
            rate: 60,
            description: "Équivalent perte de la main"
          },
          { 
            name: "Amputation du pouce - Désarticulation métacarpo-phalangienne",
            rate: 28,
            description: "Perte totale du pouce"
          },
          { 
            name: "Amputation du pouce - Désarticulation inter-phalangienne",
            rate: 20,
            description: "Conservation de la base"
          },
          { 
            name: "Amputation de l'index - Désarticulation métacarpo-phalangienne",
            rate: 15,
            description: ""
          },
          { 
            name: "Amputation de l'index - Désarticulation 1ère phalange",
            rate: 12,
            description: ""
          },
          { 
            name: "Amputation de l'index - Désarticulation 2ème phalange",
            rate: 8,
            description: ""
          },
          { 
            name: "Amputation du médius - Désarticulation métacarpo-phalangienne",
            rate: 12,
            description: ""
          },
          { 
            name: "Amputation du médius - Désarticulation 1ère phalange",
            rate: 10,
            description: ""
          },
          { 
            name: "Amputation du médius - Désarticulation 2ème phalange",
            rate: 6,
            description: ""
          },
          { 
            name: "Amputation de l'annulaire - Désarticulation métacarpo-phalangienne",
            rate: 10,
            description: ""
          },
          { 
            name: "Amputation de l'annulaire - Désarticulation 1ère phalange",
            rate: 8,
            description: ""
          },
          { 
            name: "Amputation de l'annulaire - Désarticulation 2ème phalange",
            rate: 5,
            description: ""
          },
          { 
            name: "Amputation de l'auriculaire - Désarticulation métacarpo-phalangienne",
            rate: 8,
            description: ""
          },
          { 
            name: "Amputation de l'auriculaire - Désarticulation 1ère phalange",
            rate: 6,
            description: ""
          },
          { 
            name: "Amputation de l'auriculaire - Désarticulation 2ème phalange",
            rate: 4,
            description: ""
          },
        ]
      },
    ]
  },
  {
    name: "Membres Inférieurs",
    subcategories: [
      {
        name: "Amputation et Perte Totale de Fonction",
        injuries: [
          { 
            name: "Amputation des deux membres inférieurs (appareillage impossible)",
            rate: 100,
            description: "Incapacité totale"
          },
          { 
            name: "Amputation de la cuisse (tiers supérieur)",
            rate: 75,
            description: ""
          },
          { 
            name: "Amputation de la cuisse (tiers moyen)",
            rate: 70,
            description: ""
          },
          { 
            name: "Amputation de la cuisse (tiers inférieur)",
            rate: 65,
            description: ""
          },
          { 
            name: "Désarticulation du genou",
            rate: 60,
            description: ""
          },
          { 
            name: "Amputation de jambe (tiers supérieur)",
            rate: 55,
            description: ""
          },
          { 
            name: "Amputation de jambe (tiers moyen)",
            rate: 50,
            description: ""
          },
          { 
            name: "Amputation de jambe (tiers inférieur)",
            rate: 45,
            description: ""
          },
          { 
            name: "Amputation de Syme ou sous-astragalienne",
            rate: 40,
            description: ""
          },
          { 
            name: "Amputation transmétatarsienne",
            rate: 25,
            description: ""
          },
        ]
      },
      {
        name: "Hanche",
        injuries: [
          { 
            name: "Ankylose complète de la hanche en position favorable",
            rate: [40, 50],
            description: "Position: légère flexion (10-15°), légère abduction",
            rateCriteria: {
              low: "Position optimale, marche satisfaisante",
              high: "Position sous-optimale, marche avec compensation"
            }
          },
          { 
            name: "Ankylose complète de la hanche en position défavorable",
            rate: [60, 80],
            description: "Position: flexion importante, adduction ou rotation vicieuse",
            rateCriteria: {
              low: "Position modérément défavorable",
              high: "Position très défavorable, marche très perturbée"
            }
          },
          { 
            name: "Raideur importante de la hanche avec limitation marquée",
            rate: [25, 40],
            description: "",
            rateCriteria: {
              low: "Mobilité réduite de moitié",
              high: "Mobilité très limitée, proche ankylose"
            }
          },
          { 
            name: "Raideur modérée de la hanche",
            rate: [15, 25],
            description: "",
            rateCriteria: {
              low: "Limitation discrète",
              high: "Limitation nette mais fonctionnelle"
            }
          },
        ]
      },
      {
        name: "Genou",
        injuries: [
          { 
            name: "Ankylose complète du genou en bonne position (5-10° flexion)",
            rate: [35, 45],
            description: "Position fonctionnelle optimale",
            rateCriteria: {
              low: "Position idéale, marche satisfaisante",
              high: "Position acceptable mais compensation nécessaire"
            }
          },
          { 
            name: "Ankylose complète du genou en flexion importante",
            rate: [60, 80],
            description: "Flexion > 30°",
            rateCriteria: {
              low: "Flexion modérée (30-45°)",
              high: "Flexion importante (> 60°), marche très difficile"
            }
          },
          { 
            name: "Laxité importante du genou (rupture ligamentaire)",
            rate: [20, 35],
            description: "Instabilité majeure",
            rateCriteria: {
              low: "Laxité modérée, orthèse efficace",
              high: "Laxité sévère, dérobements fréquents"
            }
          },
          { 
            name: "Raideur importante du genou",
            rate: [20, 30],
            description: "",
            rateCriteria: {
              low: "Secteur utile conservé (30-120°)",
              high: "Secteur utile très réduit"
            }
          },
          { 
            name: "Raideur modérée du genou",
            rate: [10, 20],
            description: "",
            rateCriteria: {
              low: "Limitation discrète",
              high: "Limitation modérée fonctionnelle"
            }
          },
        ]
      },
      {
        name: "Cheville et Pied",
        injuries: [
          { 
            name: "Ankylose complète tibio-tarsienne en bonne position (angle droit)",
            rate: [20, 25],
            description: "Position plantaire à 90°",
            rateCriteria: {
              low: "Position idéale, marche satisfaisante",
              high: "Position acceptable mais rigidité gênante"
            }
          },
          { 
            name: "Ankylose complète tibio-tarsienne en équin",
            rate: [30, 40],
            description: "Flexion plantaire importante",
            rateCriteria: {
              low: "Équin modéré, chaussage possible",
              high: "Équin sévère, appui impossible sans orthèse"
            }
          },
          { 
            name: "Ankylose complète tibio-tarsienne en flexion dorsale",
            rate: [25, 35],
            description: "",
            rateCriteria: {
              low: "Flexion dorsale modérée",
              high: "Flexion dorsale importante"
            }
          },
          { 
            name: "Raideur importante de la cheville",
            rate: [12, 18],
            description: "",
            rateCriteria: {
              low: "Mobilité réduite de moitié",
              high: "Mobilité très limitée"
            }
          },
          { 
            name: "Raideur modérée de la cheville",
            rate: [6, 12],
            description: "",
            rateCriteria: {
              low: "Limitation discrète",
              high: "Limitation modérée"
            }
          },
          { 
            name: "Pied bot post-traumatique non appareillable",
            rate: [40, 50],
            description: "Déformation majeure",
            rateCriteria: {
              low: "Déformation modérée, marche possible",
              high: "Déformation sévère, marche très difficile"
            }
          },
          { 
            name: "Pied bot post-traumatique appareillable",
            rate: [25, 35],
            description: "",
            rateCriteria: {
              low: "Appareillage efficace",
              high: "Appareillage contraignant"
            }
          },
        ]
      },
      {
        name: "Raccourcissement des Membres Inférieurs",
        injuries: [
          { 
            name: "Raccourcissement de 1 cm",
            rate: 1,
            description: "1% par cm de raccourcissement"
          },
          { 
            name: "Raccourcissement de 2 cm",
            rate: 3,
            description: ""
          },
          { 
            name: "Raccourcissement de 3 cm",
            rate: 5,
            description: ""
          },
          { 
            name: "Raccourcissement de 4 cm",
            rate: 8,
            description: ""
          },
          { 
            name: "Raccourcissement de 5 cm",
            rate: 12,
            description: ""
          },
          { 
            name: "Raccourcissement de 6 cm",
            rate: 16,
            description: ""
          },
          { 
            name: "Raccourcissement de 7 cm ou plus",
            rate: 20,
            description: "Maximum 20% pour raccourcissement isolé"
          },
        ]
      },
    ]
  },
  {
    name: "Rachis",
    subcategories: [
      {
        name: "Rachis Cervical",
        injuries: [
          { 
            name: "Ankylose complète du rachis cervical en bonne position",
            rate: [25, 30],
            description: "Tête droite, regard horizontal",
            rateCriteria: {
              low: "Position optimale",
              high: "Position acceptable mais rigidité gênante"
            }
          },
          { 
            name: "Ankylose complète du rachis cervical en position défavorable",
            rate: [35, 50],
            description: "Flexion ou extension importante",
            rateCriteria: {
              low: "Position modérément défavorable",
              high: "Position très défavorable"
            }
          },
          { 
            name: "Raideur importante du rachis cervical",
            rate: [15, 25],
            description: "",
            rateCriteria: {
              low: "Mobilité réduite de moitié",
              high: "Mobilité très limitée"
            }
          },
          { 
            name: "Raideur modérée du rachis cervical",
            rate: [8, 15],
            description: "",
            rateCriteria: {
              low: "Limitation discrète",
              high: "Limitation modérée"
            }
          },
        ]
      },
      {
        name: "Rachis Dorso-Lombaire",
        injuries: [
          { 
            name: "Ankylose complète du rachis dorso-lombaire en bonne position",
            rate: [30, 40],
            description: "Rachis droit",
            rateCriteria: {
              low: "Position optimale",
              high: "Rigidité importante mais axe conservé"
            }
          },
          { 
            name: "Ankylose complète du rachis dorso-lombaire en cyphose",
            rate: [45, 60],
            description: "Déformation importante",
            rateCriteria: {
              low: "Cyphose modérée",
              high: "Cyphose importante, retentissement respiratoire"
            }
          },
          { 
            name: "Raideur importante du rachis dorso-lombaire",
            rate: [20, 30],
            description: "",
            rateCriteria: {
              low: "Mobilité réduite de moitié",
              high: "Mobilité très limitée"
            }
          },
          { 
            name: "Raideur modérée du rachis dorso-lombaire",
            rate: [10, 20],
            description: "",
            rateCriteria: {
              low: "Limitation discrète",
              high: "Limitation modérée"
            }
          },
          { 
            name: "Syndrome douloureux chronique du rachis après fracture",
            rate: [5, 15],
            description: "Lombalgies ou dorsalgies persistantes",
            rateCriteria: {
              low: "Douleurs occasionnelles",
              high: "Douleurs fréquentes, limitation activités"
            }
          },
        ]
      },
    ]
  },
];

