/**
 * BASE D'ENTRAÎNEMENT MÉDICO-LÉGALE
 * Cas cliniques réels annotés pour améliorer la reconnaissance de l'IA
 * Chaque cas contient : description patient, séquelle attendue, taux IPP, justification
 */

export interface TrainingCase {
  id: string;
  category: string;
  userInput: string; // Description comme saisie par le médecin
  expectedInjury: string; // Nom exact de la lésion dans le barème
  expectedRate: number; // Taux IPP attendu
  severity: 'faible' | 'moyen' | 'élevé' | 'fixe';
  clinicalSigns: string[]; // Signes cliniques clés
  justification: string; // Raisonnement médico-légal
  commonMistakes?: string[]; // Erreurs fréquentes à éviter
  keywords: string[]; // Mots-clés essentiels
}

export const trainingCases: TrainingCase[] = [
  // ========================================
  // CATÉGORIE 1: VISION (Yeux)
  // ========================================
  {
    id: "vision-001",
    category: "Yeux - Lésions Spécifiques",
    userInput: "cataracte post traumatique avec baisse acuité visuelle OD 4/10 OG 8/10",
    expectedInjury: "Cataracte (selon acuité et complications)",
    expectedRate: 35,
    severity: "moyen",
    clinicalSigns: ["acuité visuelle OD 4/10", "acuité visuelle OG 8/10", "correction difficile"],
    justification: "Baisse acuité visuelle significative œil dominant (4/10), selon tableau barème page 133",
    keywords: ["cataracte", "acuite visuelle", "baisse vision", "od", "og"],
    commonMistakes: ["Confondre avec champ visuel", "Oublier correction optimale", "Ne pas vérifier tableau double entrée"]
  },
  {
    id: "vision-002",
    category: "Yeux - Lésions Spécifiques",
    userInput: "perte totale vision oeil gauche suite traumatisme oeil droit normal",
    expectedInjury: "Perte complète de la vision d'un oeil (l'autre étant normal)",
    expectedRate: 30,
    severity: "fixe",
    clinicalSigns: ["cécité unilatérale", "œil controlatéral normal"],
    justification: "Taux fixe 30% pour perte vision complète unilatérale avec œil sain",
    keywords: ["perte vision", "oeil", "cecite unilaterale", "traumatisme"],
    commonMistakes: ["Confondre avec perte vision deux yeux", "Oublier vérifier œil controlatéral"]
  },
  {
    id: "vision-003",
    category: "Yeux - Lésions Spécifiques",
    userInput: "uvéite chronique post traumatique avec poussées fréquentes synéchies cataracte secondaire",
    expectedInjury: "Uvéite post-traumatique chronique",
    expectedRate: 25,
    severity: "élevé",
    clinicalSigns: ["poussées fréquentes", "synéchies", "cataracte secondaire", "complications"],
    justification: "Complications multiples (synéchies + cataracte) justifient partie haute fourchette [10-30%]",
    keywords: ["uveite", "chronique", "poussees", "synechies", "complications"],
    commonMistakes: ["Ne pas évaluer fréquence poussées", "Ignorer complications associées"]
  },

  // ========================================
  // CATÉGORIE 2: GENOU (Membres Inférieurs)
  // ========================================
  {
    id: "genou-001",
    category: "Membres Inférieurs - Genou",
    userInput: "rupture LCA opérée avec laxité résiduelle dérobements fréquents escaliers arthrose débutante",
    expectedInjury: "Séquelles de rupture du ligament croisé antérieur (LCA)",
    expectedRate: 22,
    severity: "élevé",
    clinicalSigns: ["laxité résiduelle", "dérobements escaliers", "arthrose débutante", "instabilité fonctionnelle"],
    justification: "Dérobements fréquents + arthrose débutante = critères sévérité haute fourchette [10-25%]",
    keywords: ["lca", "ligament croise anterieur", "laxite", "derobements", "instabilite", "arthrose"],
    commonMistakes: ["Confondre avec LCP", "Négliger fréquence dérobements", "Ne pas rechercher arthrose"]
  },
  {
    id: "genou-002",
    category: "Membres Inférieurs - Genou",
    userInput: "méniscectomie totale interne avec chondropathie rotulienne stade 3 douleurs permanentes",
    expectedInjury: "Méniscectomie totale",
    expectedRate: 13,
    severity: "élevé",
    clinicalSigns: ["méniscectomie totale", "chondropathie stade 3", "douleurs permanentes", "arthrose précoce"],
    justification: "Méniscectomie totale + chondropathie sévère + douleurs permanentes = partie haute [5-15%]",
    keywords: ["meniscectomie", "totale", "chondropathie", "rotule", "arthrose", "douleurs"],
    commonMistakes: ["Confondre partielle/totale", "Ignorer chondropathie associée", "Ne pas coter douleurs"]
  },
  {
    id: "genou-003",
    category: "Membres Inférieurs - Genou",
    userInput: "fracture plateaux tibiaux avec déviation axiale 8 degrés raideur flexion 100 degrés",
    expectedInjury: "Fracture des plateaux tibiaux - Avec déviation et/ou raideur",
    expectedRate: 18,
    severity: "moyen",
    clinicalSigns: ["déviation axiale 8°", "raideur flexion 100°", "limitation fonctionnelle modérée"],
    justification: "Déviation 5-10° + raideur modérée (flexion 100°) = partie médiane [10-30%]",
    keywords: ["plateaux tibiaux", "deviation", "raideur", "flexion", "varus", "valgus"],
    commonMistakes: ["Ne pas mesurer déviation axiale", "Confondre flexion/extension", "Oublier goniomètre"]
  },

  // ========================================
  // CATÉGORIE 3: CHEVILLE/PIED
  // ========================================
  {
    id: "cheville-001",
    category: "Membres Inférieurs - Cheville",
    userInput: "fracture pilon tibial avec quasi ankylose cheville arthrose sévère troubles trophiques nécessité canne",
    expectedInjury: "Fracture du pilon tibial",
    expectedRate: 38,
    severity: "élevé",
    clinicalSigns: ["quasi-ankylose", "arthrose sévère", "troubles trophiques", "nécessité canne permanente"],
    justification: "Quasi-ankylose + arthrose sévère + troubles trophiques + canne = critères maximaux [15-40%]",
    keywords: ["pilon tibial", "ankylose", "arthrose", "troubles trophiques", "canne"],
    commonMistakes: ["Sous-estimer gravité ankylose", "Oublier troubles trophiques", "Ne pas noter aide technique"]
  },
  {
    id: "cheville-002",
    category: "Membres Inférieurs - Cheville",
    userInput: "fracture malléole externe bonne consolidation raideur modérée flexion dorsale 10 degrés",
    expectedInjury: "Fracture malléolaire ou bi-malléolaire - Avec raideur modérée",
    expectedRate: 12,
    severity: "faible",
    clinicalSigns: ["bonne consolidation", "raideur modérée", "flexion dorsale 10°"],
    justification: "Consolidation satisfaisante + raideur légère = partie basse [10-20%]",
    keywords: ["malleole", "malleolaire", "raideur", "consolidation", "flexion dorsale"],
    commonMistakes: ["Confondre interne/externe/bi-malléolaire", "Ne pas mesurer amplitudes"]
  },
  {
    id: "pied-001",
    category: "Membres Inférieurs - Pied",
    userInput: "fracture calcanéum thalamique avec enfoncement arthrose sous astragalienne marche limitée 400m",
    expectedInjury: "Fracture du calcanéum - Avec douleurs et boiterie",
    expectedRate: 26,
    severity: "élevé",
    clinicalSigns: ["fracture thalamique", "enfoncement thalamus", "arthrose sous-astragalienne", "périmètre marche <500m"],
    justification: "Atteinte articulaire + arthrose + périmètre marche très limité = partie haute [10-30%]",
    keywords: ["calcaneum", "thalamique", "enfoncement", "arthrose", "sous astragalienne", "marche"],
    commonMistakes: ["Confondre extra-articulaire/thalamique", "Ne pas mesurer périmètre marche"]
  },

  // ========================================
  // CATÉGORIE 4: RACHIS (Lombaire/Cervical)
  // ========================================
  {
    id: "rachis-001",
    category: "Rachis et Bassin - Lombaire",
    userInput: "tassement vertébral L3 avec cyphose 15 degrés raideur lombaire distance doigts sol 40cm lombalgie chronique",
    expectedInjury: "Tassement d'une vertèbre lombaire - Avec cyphose et/ou raideur",
    expectedRate: 14,
    severity: "moyen",
    clinicalSigns: ["cyphose 15°", "raideur", "distance doigts-sol 40cm", "lombalgie chronique"],
    justification: "Cyphose modérée + raideur significative (DDS 40cm) = partie médiane [8-20%]",
    keywords: ["tassement", "vertebre", "lombaire", "cyphose", "raideur", "distance doigts sol", "lombalgie"],
    commonMistakes: ["Ne pas mesurer cyphose", "Oublier distance doigts-sol", "Confondre avec fracture non tassée"]
  },
  {
    id: "rachis-002",
    category: "Rachis et Bassin - Cervical",
    userInput: "entorse cervicale avec syndrome cervical chronique distance menton sternum 4cm limitation rotation 40 degrés",
    expectedInjury: "Syndrome cervical chronique post-traumatique",
    expectedRate: 12,
    severity: "moyen",
    clinicalSigns: ["distance menton-sternum 4cm", "limitation rotation 40°", "cervicalgie chronique"],
    justification: "Raideur cervicale significative (DMS 4cm, rotation limitée) = partie médiane [8-20%]",
    keywords: ["cervical", "entorse", "syndrome", "menton sternum", "rotation", "cervicalgie"],
    commonMistakes: ["Ne pas mesurer distance menton-sternum", "Oublier rotations", "Confondre avec coup du lapin"]
  },

  // ========================================
  // CATÉGORIE 5: MEMBRES SUPÉRIEURS
  // ========================================
  {
    id: "epaule-001",
    category: "Membres Supérieurs - Épaule",
    userInput: "fracture tête humérale avec raideur abduction 60 degrés rotation externe impossible douleurs nocturnes",
    expectedInjury: "Fracture de la tête humérale",
    expectedRate: 25,
    severity: "élevé",
    clinicalSigns: ["raideur abduction 60°", "rotation externe impossible", "douleurs nocturnes", "limitation majeure"],
    justification: "Raideur sévère (abduction <90°) + impossibilité rotation externe = partie haute [20-30%]",
    keywords: ["tete humerale", "epaule", "raideur", "abduction", "rotation externe", "douleurs nocturnes"],
    commonMistakes: ["Ne pas tester rotations", "Sous-estimer impact douleurs nocturnes", "Oublier mesure abduction"]
  },
  {
    id: "main-001",
    category: "Membres Supérieurs - Main",
    userInput: "amputation pouce main dominante sans possibilité préhension pollici digitale opposition impossible",
    expectedInjury: "Amputation du pouce - Désarticulation métacarpo-phalangienne",
    expectedRate: 28,
    severity: "fixe",
    clinicalSigns: ["amputation pouce", "main dominante", "perte préhension pollici-digitale", "opposition impossible"],
    justification: "Amputation pouce main dominante = taux fixe 20% (fonction préhension essentielle)",
    keywords: ["amputation", "pouce", "main dominante", "prehension", "opposition", "pollici digitale"],
    commonMistakes: ["Confondre main dominante/non dominante", "Ne pas évaluer préhension résiduelle"]
  },

  // ========================================
  // CATÉGORIE 6: NERFS PÉRIPHÉRIQUES
  // ========================================
  {
    id: "nerf-001",
    category: "Nerfs Périphériques",
    userInput: "paralysie nerf radial avec main tombante extension poignet impossible testing 0/5 amyotrophie sévère",
    expectedInjury: "Paralysie du nerf radial",
    expectedRate: 35,
    severity: "élevé",
    clinicalSigns: ["main tombante", "extension poignet impossible", "testing 0/5", "amyotrophie sévère", "paralysie complète"],
    justification: "Paralysie complète (testing 0/5) + amyotrophie sévère + impotence fonctionnelle majeure = taux élevé [30-40%]",
    keywords: ["paralysie", "nerf radial", "main tombante", "extension", "testing", "amyotrophie"],
    commonMistakes: ["Ne pas faire testing analytique", "Confondre avec médian/cubital", "Oublier mesure amyotrophie"]
  },
  {
    id: "nerf-002",
    category: "Nerfs Périphériques",
    userInput: "sciatique chronique L5 avec déficit releveur pied steppage testing 3/5 paresthésies territoire L5",
    expectedInjury: "Sciatique chronique avec signes déficitaires",
    expectedRate: 18,
    severity: "moyen",
    clinicalSigns: ["déficit releveur pied", "steppage", "testing 3/5", "paresthésies L5", "radiculalgie persistante"],
    justification: "Déficit moteur modéré (3/5) + steppage + paresthésies = partie médiane [10-25%]",
    keywords: ["sciatique", "l5", "deficit", "steppage", "pied", "paresthesies", "radiculaire"],
    commonMistakes: ["Ne pas préciser racine atteinte", "Oublier testing releveur", "Confondre L5/S1"]
  },

  // ========================================
  // CATÉGORIE 7: CAS COMPLEXES (Multiples)
  // ========================================
  {
    id: "complexe-001",
    category: "Cas Complexe",
    userInput: "fracture plateaux tibiaux avec rupture LCA opérée raideur flexion 90 degrés instabilité résiduelle",
    expectedInjury: "Séquelles de rupture du ligament croisé antérieur (LCA)",
    expectedRate: 25,
    severity: "élevé",
    clinicalSigns: ["fracture consolidée", "rupture LCA associée", "raideur sévère flexion 90°", "instabilité résiduelle"],
    justification: "Lésions multiples (fracture + LCA) → Évaluer séparément puis cumuler selon formule de Balthazar",
    keywords: ["plateaux tibiaux", "lca", "raideur", "instabilite", "lesions multiples", "cumul"],
    commonMistakes: ["Évaluer en un seul taux", "Oublier formule cumul", "Ne pas individualiser chaque lésion"]
  },

  // ========================================
  // CATÉGORIE 8: VARIATIONS LINGUISTIQUES
  // ========================================
  {
    id: "lang-001",
    category: "Variations Langage",
    userInput: "le patient presente une cataract poste traumatique avec une baise de l acuite visuel a moin 5",
    expectedInjury: "Cataracte (selon acuité et complications)",
    expectedRate: 45,
    severity: "élevé",
    clinicalSigns: ["acuité visuelle <5/10", "baisse vision sévère"],
    justification: "Tolérance fautes orthographe/grammaire (cataract, baise, moin) → Reconnaissance robuste",
    keywords: ["cataracte", "cataract", "acuite", "baisse", "vision", "traumatique"],
    commonMistakes: ["Rejeter description avec fautes", "Ne pas normaliser orthographe"]
  },
  {
    id: "lang-002",
    category: "Variations Langage",
    userInput: "fémur cassé avec raccourcissement de 3 cm et boiterie importante le patient marche avec une canne",
    expectedInjury: "Fracture de la diaphyse fémorale - Avec cal vicieux",
    expectedRate: 22,
    severity: "élevé",
    clinicalSigns: ["raccourcissement 3cm", "boiterie importante", "nécessité canne"],
    justification: "Langage familier 'cassé' → 'fracture', 'boiterie' + canne = critères sévérité haute",
    keywords: ["femur", "casse", "fracture", "raccourcissement", "boiterie", "canne", "cal vicieux"],
    commonMistakes: ["Rejeter langage familier", "Ne pas convertir en termes médicaux"]
  },

  // ========================================
  // CATÉGORIE 9: ÉPAULE (Suite membres supérieurs)
  // ========================================
  {
    id: "epaule-002",
    category: "Membres Supérieurs - Épaule",
    userInput: "rupture coiffe des rotateurs complète avec impossibilité élévation active testing 0/5 amyotrophie supra épineux",
    expectedInjury: "Rupture complète de la coiffe des rotateurs",
    expectedRate: 30,
    severity: "élevé",
    clinicalSigns: ["élévation active impossible", "testing 0/5", "amyotrophie supra-épineux", "testing supra-épineux et infra-épineux négatif"],
    justification: "Rupture complète coiffe rotateurs avec perte fonction complète élévation et rotation (30% selon barème page 97)",
    keywords: ["coiffe rotateurs", "rupture", "elevation", "testing", "amyotrophie", "supra epineux"],
    commonMistakes: ["Confondre avec rupture partielle (15-20%)", "Oublier testing musculaire", "Ne pas évaluer amyotrophie"]
  },
  {
    id: "epaule-003",
    category: "Membres Supérieurs - Épaule",
    userInput: "luxation récidivante épaule avec instabilité permanente appréhension dérobements fréquents",
    expectedInjury: "Luxation récidivante de l'épaule",
    expectedRate: 18,
    severity: "moyen",
    clinicalSigns: ["instabilité permanente", "appréhension", "dérobements fréquents", "limitation activités"],
    justification: "Instabilité chronique épaule avec dérobements fréquents (15-20% selon gravité)",
    keywords: ["luxation recidivante", "epaule", "instabilite", "apprehension", "derobement"],
    commonMistakes: ["Confondre avec luxation unique consolidée", "Sous-estimer impact fonctionnel"]
  },

  // ========================================
  // CATÉGORIE 10: COUDE
  // ========================================
  {
    id: "coude-001",
    category: "Membres Supérieurs - Coude",
    userInput: "fracture olécrane avec raideur importante flexion 30-100 degrés extension impossible",
    expectedInjury: "Fracture de l'olécrane - Avec raideur importante",
    expectedRate: 20,
    severity: "élevé",
    clinicalSigns: ["flexion limitée 30-100°", "extension impossible", "amplitude réduite 70°"],
    justification: "Raideur importante coude avec amplitude fonctionnelle réduite (20% selon barème page 99)",
    keywords: ["olecrane", "fracture", "raideur", "flexion", "extension", "coude"],
    commonMistakes: ["Confondre avec raideur modérée (10-12%)", "Ne pas mesurer amplitude exacte"]
  },
  {
    id: "coude-002",
    category: "Membres Supérieurs - Coude",
    userInput: "ankylose complète coude position vicieuse 60 degrés flexion impossibilité extension",
    expectedInjury: "Ankylose du coude en position vicieuse",
    expectedRate: 35,
    severity: "élevé",
    clinicalSigns: ["ankylose complète", "position 60° flexion", "aucun mouvement possible", "position vicieuse"],
    justification: "Ankylose coude position vicieuse non fonctionnelle (30-40% selon position)",
    keywords: ["ankylose", "coude", "position vicieuse", "flexion", "impossibilite"],
    commonMistakes: ["Confondre avec raideur sévère", "Ne pas préciser position ankylose", "Oublier impact fonctionnel main dominante"]
  },

  // ========================================
  // CATÉGORIE 11: POIGNET
  // ========================================
  {
    id: "poignet-001",
    category: "Membres Supérieurs - Poignet",
    userInput: "fracture extrémité inférieure radius avec cal vicieux déformation importante limitation prono supination",
    expectedInjury: "Fracture de l'extrémité inférieure du radius - Avec cal vicieux",
    expectedRate: 18,
    severity: "moyen",
    clinicalSigns: ["cal vicieux", "déformation", "limitation prono-supination", "douleurs poignet"],
    justification: "Cal vicieux radius distal avec limitation fonctionnelle (15-20% selon gravité)",
    keywords: ["radius", "extremite inferieure", "cal vicieux", "prono supination", "deformation"],
    commonMistakes: ["Confondre avec consolidation sans cal vicieux (8-10%)", "Ne pas évaluer prono-supination"]
  },
  {
    id: "poignet-002",
    category: "Membres Supérieurs - Poignet",
    userInput: "pseudarthrose scaphoïde carpien avec instabilité poignet douleurs chroniques",
    expectedInjury: "Pseudarthrose du scaphoïde",
    expectedRate: 22,
    severity: "élevé",
    clinicalSigns: ["pseudarthrose scaphoïde", "instabilité carpe", "douleurs chroniques", "perte force préhension"],
    justification: "Pseudarthrose scaphoïde avec instabilité carpe chronique (20-25%)",
    keywords: ["pseudarthrose", "scaphoide", "carpien", "instabilite", "poignet"],
    commonMistakes: ["Confondre avec fracture consolidée", "Sous-estimer impact instabilité carpe"]
  },

  // ========================================
  // CATÉGORIE 12: MAIN & DOIGTS
  // ========================================
  {
    id: "main-002",
    category: "Membres Supérieurs - Main",
    userInput: "amputation index main dominante niveau articulation métacarpo phalangienne",
    expectedInjury: "Amputation de l'index - Désarticulation métacarpo-phalangienne", 
    expectedRate: 15,
    severity: "fixe",
    clinicalSigns: ["amputation index complet", "main dominante", "niveau MCP"],
    justification: "Amputation index main dominante (10% taux fixe)",
    keywords: ["amputation", "index", "main dominante", "mcp"],
    commonMistakes: ["Confondre avec amputation partielle", "Oublier préciser main dominante/non dominante"]
  },
  {
    id: "main-003",
    category: "Membres Supérieurs - Main",
    userInput: "section tendons fléchisseurs médius avec impossibilité flexion active doigts raideur",
    expectedInjury: "Raideur d'une articulation du médius (Main Dominante)",
    expectedRate: 4,
    severity: "moyen",
    clinicalSigns: ["section tendons fléchisseurs", "impossibilité flexion active", "raideur médius"],
    justification: "Section tendons fléchisseurs doigt long avec perte fonction (8-10%)",
    keywords: ["section tendons", "flechisseurs", "medius", "flexion", "doigt"],
    commonMistakes: ["Confondre avec rupture partielle", "Ne pas tester flexion active vs passive"]
  },

  // ========================================
  // CATÉGORIE 13: HANCHE
  // ========================================
  {
    id: "hanche-001",
    category: "Membres Inférieurs - Hanche",
    userInput: "fracture col fémoral opérée prothèse totale hanche avec limitation abduction 20 degrés flexion 80 degrés marche avec canne",
    expectedInjury: "Prothèse totale de hanche",
    expectedRate: 28,
    severity: "élevé",
    clinicalSigns: ["prothèse totale hanche", "abduction 20°", "flexion 80°", "marche avec canne", "claudication"],
    justification: "Prothèse totale hanche avec raideur modérée et troubles marche (25-30%)",
    keywords: ["col femoral", "prothese totale hanche", "pth", "abduction", "flexion", "canne"],
    commonMistakes: ["Confondre avec raideur simple sans prothèse", "Oublier impact troubles marche", "Ne pas considérer aide technique"]
  },
  {
    id: "hanche-002",
    category: "Membres Inférieurs - Hanche",
    userInput: "arthrose post traumatique hanche sévère avec pincement articulaire complet douleurs permanentes périmètre marche moins 500 mètres",
    expectedInjury: "Arthrose post-traumatique de la hanche",
    expectedRate: 25,
    severity: "élevé",
    clinicalSigns: ["arthrose sévère", "pincement complet", "douleurs permanentes", "périmètre marche <500m"],
    justification: "Arthrose hanche sévère avec limitation périmètre marche importante (25-30%)",
    keywords: ["arthrose", "hanche", "post traumatique", "pincement", "perimetre marche"],
    commonMistakes: ["Sous-estimer impact périmètre marche", "Confondre avec arthrose débutante"]
  },

  // ========================================
  // CATÉGORIE 14: JAMBE (Tibia/Fibula diaphyses)
  // ========================================
  {
    id: "jambe-002",
    category: "Membres Inférieurs - Jambe",
    userInput: "pseudarthrose tibia diaphyse moyenne avec mobilité anormale douleurs importantes marche impossible sans appui",
    expectedInjury: "Pseudarthrose de la diaphyse tibiale",
    expectedRate: 70,
    severity: "élevé",
    clinicalSigns: ["pseudarthrose tibia", "mobilité anormale", "douleurs importantes", "marche impossible sans appui"],
    justification: "Pseudarthrose tibia diaphyse avec non consolidation et impotence fonctionnelle majeure (60-80%)",
    keywords: ["pseudarthrose", "tibia", "diaphyse", "mobilite anormale", "marche impossible"],
    commonMistakes: ["Confondre avec retard consolidation", "Sous-estimer gravité non consolidation"]
  },

  // ========================================
  // CATÉGORIE 15: RACHIS DORSAL
  // ========================================
  {
    id: "rachis-003",
    category: "Rachis et Bassin - Dorsal",
    userInput: "tassement vertébral D10 avec cyphose 20 degrés raideur rachis dorsal douleurs chroniques",
    expectedInjury: "Tassement d'une vertèbre dorsale - Avec cyphose",
    expectedRate: 12,
    severity: "moyen",
    clinicalSigns: ["tassement D10", "cyphose 20°", "raideur dorsale", "douleurs chroniques"],
    justification: "Tassement vertèbre dorsale avec cyphose modérée (10-15%)",
    keywords: ["tassement", "vertebral", "dorsal", "d10", "cyphose", "raideur"],
    commonMistakes: ["Confondre avec tassement lombaire", "Ne pas mesurer angle cyphose"]
  },

  // ========================================
  // CATÉGORIE 16: BASSIN (Cotyle, Sacrum, Coccyx)
  // ========================================
  {
    id: "bassin-001",
    category: "Rachis et Bassin - Bassin",
    userInput: "fracture cotyle avec incongruence articulaire arthrose précoce hanche douleurs position assise",
    expectedInjury: "Fracture du cotyle - Avec séquelles articulaires",
    expectedRate: 30,
    severity: "élevé",
    clinicalSigns: ["fracture cotyle", "incongruence articulaire", "arthrose précoce", "douleurs position assise"],
    justification: "Fracture cotyle avec incongruence et arthrose secondaire (25-35%)",
    keywords: ["cotyle", "fracture", "incongruence", "arthrose", "hanche"],
    commonMistakes: ["Confondre avec fracture bassin simple", "Oublier évaluer arthrose secondaire"]
  },
  {
    id: "bassin-002",
    category: "Rachis et Bassin - Bassin",
    userInput: "fracture sacrum avec douleurs sacro iliaques chroniques position assise impossible plus 30 minutes",
    expectedInjury: "Fracture du sacrum",
    expectedRate: 15,
    severity: "moyen",
    clinicalSigns: ["fracture sacrum", "douleurs sacro-iliaques", "position assise limitée", "douleurs chroniques"],
    justification: "Fracture sacrum avec douleurs chroniques et limitation fonctionnelle (12-18%)",
    keywords: ["sacrum", "fracture", "douleurs", "position assise", "sacro iliaque"],
    commonMistakes: ["Sous-estimer impact position assise", "Confondre avec lombalgies communes"]
  },
  {
    id: "bassin-003",
    category: "Rachis et Bassin - Bassin",
    userInput: "fracture coccyx avec coccygodynie persistante douleurs position assise invalidantes",
    expectedInjury: "Fracture du coccyx",
    expectedRate: 8,
    severity: "faible",
    clinicalSigns: ["fracture coccyx", "coccygodynie", "douleurs position assise", "douleurs invalidantes"],
    justification: "Fracture coccyx avec coccygodynie chronique (5-10%)",
    keywords: ["coccyx", "fracture", "coccygodynie", "position assise"],
    commonMistakes: ["Négliger impact fonctionnel", "Sous-estimer douleurs chroniques"]
  },

  // ========================================
  // CATÉGORIE 17: THORAX (Côtes, Sternum)
  // ========================================
  {
    id: "thorax-001",
    category: "Thorax - Côtes",
    userInput: "fractures multiples côtes avec volet costal séquelles respiratoires dyspnée effort",
    expectedInjury: "Fractures multiples de côtes - Avec séquelles respiratoires",
    expectedRate: 15,
    severity: "moyen",
    clinicalSigns: ["fractures multiples côtes", "volet costal", "dyspnée d'effort", "séquelles respiratoires"],
    justification: "Fractures multiples côtes avec impact respiratoire (12-18%)",
    keywords: ["fractures", "cotes", "volet costal", "dyspnee", "respiratoire"],
    commonMistakes: ["Confondre avec fracture unique côte (3-5%)", "Oublier évaluation respiratoire"]
  },
  {
    id: "thorax-002",
    category: "Thorax - Sternum",
    userInput: "fracture sternum avec douleurs persistantes limitation capacité respiratoire",
    expectedInjury: "Fracture du sternum",
    expectedRate: 10,
    severity: "moyen",
    clinicalSigns: ["fracture sternum", "douleurs persistantes", "limitation respiratoire"],
    justification: "Fracture sternum avec douleurs chroniques (8-12%)",
    keywords: ["sternum", "fracture", "douleurs", "respiratoire"],
    commonMistakes: ["Négliger impact respiratoire", "Confondre avec contusion simple"]
  },

  // ========================================
  // CATÉGORIE 18: ABDOMEN & VISCÈRES
  // ========================================
  {
    id: "visceres-001",
    category: "Abdomen et Viscères",
    userInput: "splénectomie totale suite rupture rate traumatique",
    expectedInjury: "Ablation de la rate (splénectomie)",
    expectedRate: 18,
    severity: "fixe",
    clinicalSigns: ["splénectomie totale", "absence rate", "risque infectieux accru"],
    justification: "Splénectomie totale post-traumatique (18% taux fixe)",
    keywords: ["splenectomie", "rate", "ablation", "traumatique"],
    commonMistakes: ["Confondre avec rate pathologique", "Oublier impact immunologique"]
  },
  {
    id: "visceres-002",
    category: "Abdomen et Viscères",
    userInput: "éventration post traumatique pariétale avec hernie importante nécessitant ceinture contention",
    expectedInjury: "Éventration post-traumatique",
    expectedRate: 15,
    severity: "moyen",
    clinicalSigns: ["éventration pariétale", "hernie importante", "ceinture contention nécessaire"],
    justification: "Éventration pariétale post-traumatique nécessitant contention (12-18%)",
    keywords: ["eventration", "post traumatique", "hernie", "ceinture", "contention"],
    commonMistakes: ["Confondre avec hernie simple", "Ne pas préciser nécessité contention"]
  },

  // ========================================
  // CATÉGORIE 19: AUDITION
  // ========================================
  {
    id: "audition-001",
    category: "Audition",
    userInput: "surdité profonde oreille droite avec perte auditive 80 dB oreille gauche normale",
    expectedInjury: "Surdité unilatérale profonde",
    expectedRate: 20,
    severity: "élevé",
    clinicalSigns: ["surdité profonde OD", "perte 80 dB", "OG normale", "oreille controlatérale saine"],
    justification: "Surdité profonde unilatérale avec oreille controlatérale normale (18-22%)",
    keywords: ["surdite", "profonde", "unilaterale", "perte auditive", "db"],
    commonMistakes: ["Confondre avec surdité bilatérale", "Ne pas calculer déficit auditif moyen"]
  },
  {
    id: "audition-002",
    category: "Audition",
    userInput: "acouphènes invalidants permanents bilatéraux suite traumatisme sonore troubles sommeil",
    expectedInjury: "Bourdonnements d'oreille (acouphènes) isolés",
    expectedRate: 8,
    severity: "moyen",
    clinicalSigns: ["acouphènes permanents", "bilatéraux", "troubles sommeil", "invalidants"],
    justification: "Acouphènes invalidants permanents avec retentissement (5-10%)",
    keywords: ["acouphenes", "invalidants", "permanents", "traumatisme sonore", "troubles sommeil"],
    commonMistakes: ["Sous-estimer impact qualité vie", "Négliger troubles sommeil"]
  },

  // ========================================
  // CATÉGORIE 20: DENTAIRE
  // ========================================
  {
    id: "dent-001",
    category: "Dents",
    userInput: "perte 8 dents définitives suite traumatisme facial nécessitant prothèse dentaire",
    expectedInjury: "Perte de 8 dents définitives",
    expectedRate: 12,
    severity: "moyen",
    clinicalSigns: ["8 dents perdues", "dents définitives", "prothèse nécessaire"],
    justification: "Perte 8 dents définitives (1,5% par dent = 12%)",
    keywords: ["perte", "dents", "definitives", "prothese", "traumatisme"],
    commonMistakes: ["Confondre avec dents lactéales", "Oublier calcul 1,5% par dent"]
  },

  // ========================================
  // CATÉGORIE 21: CICATRICES ESTHÉTIQUES
  // ========================================
  {
    id: "cicatrice-001",
    category: "Cicatrices",
    userInput: "cicatrice chéloïde face antérieure thorax 15 cm rétractile adhérente plans profonds gêne esthétique importante",
    expectedInjury: "Cicatrice vicieuse thorax antérieur",
    expectedRate: 8,
    severity: "moyen",
    clinicalSigns: ["chéloïde", "15 cm", "rétractile", "adhérente", "gêne esthétique"],
    justification: "Cicatrice chéloïde rétractile zone découverte (5-10%)",
    keywords: ["cicatrice", "cheloide", "retractile", "thorax", "esthetique"],
    commonMistakes: ["Sous-estimer impact esthétique", "Oublier localisation zone découverte"]
  },

  // ========================================
  // CATÉGORIE 22: CAS COMPLEXES - SÉQUELLES MULTIPLES
  // ========================================
  {
    id: "complexe-002",
    category: "Cas Complexe",
    userInput: "polytraumatisme avec fracture fémur droit consolidée raccourcissement 3 cm et fracture poignet gauche raideur séquellaire",
    expectedInjury: "Séquelles multiples membres (cumul)",
    expectedRate: 30,
    severity: "élevé",
    clinicalSigns: ["fracture fémur consolidée", "raccourcissement 3 cm", "fracture poignet", "raideur séquellaire"],
    justification: "Cumul formule Balthazar: Fémur cal vicieux (22%) + Poignet raideur (10%) = 29,8% ≈ 30%",
    keywords: ["polytraumatisme", "sequelles multiples", "femur", "poignet", "cumul"],
    commonMistakes: ["Additionner taux (erreur!)", "Ne pas appliquer formule cumul Balthazar", "Oublier séquelles mineures"]
  },
  {
    id: "complexe-003",
    category: "Cas Complexe",
    userInput: "traumatisme crânien avec céphalées chroniques quotidiennes associé amputation 2 derniers orteils pied gauche",
    expectedInjury: "Séquelles multiples (neurologique + ortho)",
    expectedRate: 12,
    severity: "moyen",
    clinicalSigns: ["céphalées chroniques quotidiennes", "amputation 4e et 5e orteils", "pied gauche"],
    justification: "Cumul: Céphalées chroniques (8%) + Amputation 2 orteils (5%) = 12,6% ≈ 12%",
    keywords: ["traumatisme cranien", "cephalees", "amputation", "orteils", "sequelles multiples"],
    commonMistakes: ["Oublier séquelles neurologiques fonctionnelles", "Ne pas cumuler lésions mineures"]
  },

  // ========================================
  // CATÉGORIE 23: VARIATIONS LINGUISTIQUES (Suite)
  // ========================================
  {
    id: "lang-003",
    category: "Variations Langage",
    userInput: "le genou est pete avec le lca qui lache tout le temps et une arthrose qui commence le patient boite",
    expectedInjury: "Séquelles de rupture du ligament croisé antérieur (LCA)",
    expectedRate: 22,
    severity: "élevé",
    clinicalSigns: ["rupture LCA", "instabilité permanente", "dérobements", "arthrose débutante", "claudication"],
    justification: "Rupture LCA avec instabilité et arthrose débutante (langage familier converti)",
    keywords: ["pete", "lca", "qui lache", "arthrose", "boite", "langage familier"],
    commonMistakes: ["Ne pas reconnaître langage familier", "Confusion termes médicaux"]
  },
  {
    id: "lang-004",
    category: "Variations Langage",
    userInput: "av od 3/10 og 7/10 cataract bilat post traumatik",
    expectedInjury: "Cataracte (selon acuité et complications)",
    expectedRate: 42,
    severity: "élevé",
    clinicalSigns: ["AV OD 3/10", "AV OG 7/10", "cataracte bilatérale", "post-traumatique"],
    justification: "Cataracte bilatérale avec baisse acuité importante (abréviations médicales + fautes)",
    keywords: ["av", "od", "og", "cataract", "bilat", "post traumatik", "abreviations"],
    commonMistakes: ["Ne pas reconnaître abréviations", "Ignorer fautes orthographe"]
  }
];

export const expertPatterns = {
  // Détection ambiguïtés nécessitant clarification
  ambiguityTriggers: [
    {
      pattern: /fracture (femur|tibia|humerus|radius|ulna)(?!.*diaphyse|col|extremite|plateau|pilon)/i,
      message: "Préciser localisation anatomique (diaphyse, extrémité, col...)",
      requiredInfo: ["localisation précise", "type fracture (simple/comminutive)", "consolidation"]
    },
    {
      pattern: /raideur (genou|epaule|hanche|cheville)(?!.*flexion.*\d|extension.*\d|abduction.*\d)/i,
      message: "Mesurer amplitudes articulaires avec goniomètre",
      requiredInfo: ["flexion en degrés", "extension en degrés", "rotations si pertinent"]
    },
    {
      pattern: /douleur|algique|algie(?!.*eva|echelle)/i,
      message: "Quantifier douleur avec échelle EVA (0-10)",
      requiredInfo: ["EVA repos", "EVA mouvement", "retentissement fonctionnel"]
    }
  ],

  // Détection séquelles multiples nécessitant cumul
  multipleInjuryTriggers: [
    {
      pattern: /(;|et aussi|avec|associe a|en plus).*(fracture|luxation|rupture|lesion)/i,
      message: "Séquelles multiples détectées → Évaluer séparément puis appliquer formule cumul",
      formula: "T = 100 - [(100 - T1) × (100 - T2) / 100]"
    }
  ],

  // Correspondances synonymes métier spécifiques
  clinicalSynonyms: {
    "cassé": "fracture",
    "pété": "rupture",
    "coincé": "blocage articulaire",
    "qui lâche": "instabilité",
    "qui gonfle": "œdème chronique",
    "boite": "claudication",
    "traine la jambe": "steppage",
    "main morte": "paralysie complète",
    "voit flou": "baisse acuité visuelle",
    "entend mal": "hypoacousie",
    "insensible": "hypoesthésie/anesthésie"
  }
};

/**
 * MÉTRIQUES DE QUALITÉ
 * Critères validation expertise IA
 */
export interface QualityMetrics {
  recognitionAccuracy: number; // % cas reconnus correctement
  rateAccuracy: number; // % taux dans fourchette ±3%
  ambiguityDetection: number; // % ambiguïtés détectées
  justificationCompleteness: number; // % justifications complètes
  responseTime: number; // Temps réponse moyen (ms)
}

export const qualityThresholds: QualityMetrics = {
  recognitionAccuracy: 95, // Minimum 95% reconnaissance
  rateAccuracy: 90, // Minimum 90% précision taux
  ambiguityDetection: 85, // Minimum 85% détection ambiguïtés
  justificationCompleteness: 90, // Minimum 90% justifications complètes
  responseTime: 500 // Maximum 500ms
};
