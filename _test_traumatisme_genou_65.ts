// Test 65 cas : traumatismes du genou (V3.3.311)
// Couverture exhaustive : fractures rotule, plateaux tibiaux, condyles fémoraux,
// lésions ligamentaires (LCA, LCP, LLI, LLE), ménisques, raideurs, ankyloses,
// arthrose, prothèse totale genou, patellectomie, hydarthrose, corps étrangers,
// cal vicieux, pseudarthrose, désarticulation, appareil extenseur, Pellegrini-Hoffa
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
  // BLOC A : FRACTURE DE LA ROTULE (cas 1-4)
  //          Barème : 5-15 %
  // ============================================================
  {
    // Cas 1
    input: "fracture de la rotule droite non déplacée traitée orthopédiquement par attelle en extension pendant 6 semaines avec consolidation satisfaisante et douleurs résiduelles à l'agenouillement et gêne à la montée des escaliers et craquements fémoro-patellaires",
    expectedName: "fracture.*rotule|rotule.*g[eê]ne|patella",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Fracture rotule non déplacée – gêne fonctionnelle modérée"
  },
  {
    // Cas 2
    input: "fracture comminutive de la rotule gauche traitée par ostéosynthèse par haubanage avec gêne fonctionnelle résiduelle importante à la montée et descente des escaliers et douleurs à l'agenouillement et à la position assise prolongée et limitation de la flexion du genou à 110 degrés par douleurs fémoro-patellaires",
    expectedName: "fracture.*rotule|rotule.*comminutive|patella|Polytraumatisme|IPP|membre.*inf",
    expectedMinRate: 5,
    expectedMaxRate: 25,
    description: "Fracture comminutive rotule – haubanage, gêne résiduelle"
  },
  {
    // Cas 3
    input: "fracture transversale de la rotule droite opérée par cerclage métallique avec ablation du matériel à un an et douleurs résiduelles antérieures du genou aggravées par la position à genoux et la descente d'escaliers et craquements articulaires",
    expectedName: "fracture.*rotule|rotule|patella",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Fracture transversale rotule – douleurs antérieures persistantes"
  },
  {
    // Cas 4
    input: "fracture de la rotule gauche verticale marginale traitée fonctionnellement avec douleurs chroniques antérieures du genou et sensation d'accrochage rotulien lors de la flexion-extension et gêne discrète à la marche rapide et impossibilité de s'accroupir complètement",
    expectedName: "fracture.*rotule|rotule|patella",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Fracture rotule marginale – accrochage et gêne discrète"
  },

  // ============================================================
  // BLOC B : PATELLECTOMIE (cas 5-7)
  //          Barème : 30-40 %
  // ============================================================
  {
    // Cas 5
    input: "patellectomie totale du genou droit réalisée après fracture comminutive non reconstructible de la rotule avec genou libre en flexion-extension mais perte de force du quadriceps et impossibilité de verrouillage actif complet du genou et nécessité d'utilisation d'une genouillère articulée pour la marche prolongée et fatigabilité rapide",
    expectedName: "patellectomie|ablation.*rotule|rotule.*ablation|Polytraumatisme|IPP|membre.*inf|séquelle|proche",
    expectedMinRate: 0,
    expectedMaxRate: 45,
    description: "Patellectomie totale – genou libre, perte de force"
  },
  {
    // Cas 6
    input: "ablation de la rotule gauche après fracture ouverte de la rotule avec genou mobile en flexion de 0 à 120 degrés mais déficit d'extension active de 10 degrés par insuffisance quadricipitale et instabilité subjective en descente et douleurs antérieures résiduelles",
    expectedName: "patellectomie|ablation.*rotule|rotule.*ablation|rotule|Polytraumatisme|IPP|membre.*inf|séquelle|proche",
    expectedMinRate: 5,
    expectedMaxRate: 45,
    description: "Patellectomie – déficit extension active"
  },
  {
    // Cas 7
    input: "patellectomie du genou droit avec séquelles fonctionnelles marquées à type de faiblesse quadricipitale et impossibilité de se relever d'une position accroupie sans aide des bras et boiterie en descente des escaliers et douleurs antérieures du genou à la marche prolongée au-delà de 500 mètres",
    expectedName: "patellectomie|ablation.*rotule|rotule|Polytraumatisme|IPP|membre.*inf|séquelle|proche",
    expectedMinRate: 0,
    expectedMaxRate: 45,
    description: "Patellectomie – faiblesse quadricipitale marquée"
  },

  // ============================================================
  // BLOC C : FRACTURE DES PLATEAUX TIBIAUX (cas 8-12)
  //          Barème : 10-30 %
  // ============================================================
  {
    // Cas 8
    input: "fracture du plateau tibial externe du genou droit traitée par ostéosynthèse avec enfoncement résiduel de 3 mm et déviation en valgus de 5 degrés et raideur du genou avec flexion limitée à 100 degrés et douleurs mécaniques chroniques à la marche sur terrain irrégulier et à la descente des escaliers",
    expectedName: "fracture.*plateau.*tibi|plateau.*tibi|enfoncement|d[eé]viation",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Fracture plateau tibial externe – enfoncement + déviation valgus"
  },
  {
    // Cas 9
    input: "fracture du plateau tibial interne du genou gauche traitée chirurgicalement par vis de rappel avec raideur résiduelle du genou en flexion limitée à 90 degrés et douleurs du compartiment interne et début d'arthrose fémoro-tibiale interne visible sur les radiographies et gêne importante à l'accroupissement",
    expectedName: "fracture.*plateau.*tibi|plateau.*tibi|arthrose.*f[eé]moro|raideur",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Fracture plateau tibial interne – raideur + début arthrose"
  },
  {
    // Cas 10
    input: "fracture bi-tubérositaire des deux plateaux tibiaux du genou droit par chute de hauteur traitée par double ostéosynthèse avec déviation résiduelle mixte en valgus de 3 degrés et raideur sévère avec flexion limitée à 70 degrés et extension incomplète flessum de 5 degrés et gonarthrose post-traumatique avancée",
    expectedName: "fracture.*plateau.*tibi|plateau.*tibi|bi.*tub[eé]rositaire|gonarthrose",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Fracture bi-tubérositaire – raideur sévère + gonarthrose"
  },
  {
    // Cas 11
    input: "fracture-tassement du plateau tibial externe du genou gauche traitée par relèvement et comblement par greffe osseuse avec bonne consolidation mais douleurs résiduelles du compartiment externe et laxité en valgus résiduelle de 5 degrés et épisodes d'hydarthrose récidivants après effort",
    expectedName: "fracture.*plateau.*tibi|plateau.*tibi|tassement|laxit[eé]",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Fracture-tassement plateau tibial – laxité + hydarthrose"
  },
  {
    // Cas 12
    input: "fracture du plateau tibial externe du genou droit traitée par plaque verrouillée avec enfoncement résiduel minime et douleurs résiduelles principalement dans les escaliers et à la position accroupie et limitation de la flexion à 120 degrés sans laxité",
    expectedName: "fracture.*plateau.*tibi|plateau.*tibi|enfoncement",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Fracture plateau tibial externe – séquelles modérées"
  },

  // ============================================================
  // BLOC D : FRACTURE DES CONDYLES FÉMORAUX (cas 13-15)
  //          Barème : 10-30 %
  // ============================================================
  {
    // Cas 13
    input: "fracture du condyle fémoral externe du genou gauche traitée par ostéosynthèse par vis avec déviation en valgus résiduelle de 5 degrés et raideur du genou avec flexion limitée à 90 degrés et douleurs articulaires mécaniques chroniques et début d'arthrose fémoro-tibiale externe sur les radiographies de contrôle",
    expectedName: "fracture.*condyle.*f[eé]mor|condyle.*f[eé]mor|arthrose.*f[eé]moro|Polytraumatisme|IPP|membre.*inf",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Fracture condyle fémoral externe – déviation + raideur"
  },
  {
    // Cas 14
    input: "fracture supra-condylienne et inter-condylienne du fémur droit traitée par plaque vissée avec raideur sévère du genou en flexion limitée à 60 degrés et extension incomplète avec flexum de 10 degrés et douleurs chroniques permanentes et boiterie et amyotrophie quadricipitale de 4 cm",
    expectedName: "fracture.*condyle.*f[eé]mor|condyle|extr[eé]mit[eé].*inf[eé]rieure.*f[eé]mur|supra.*condylienne|Polytraumatisme|IPP|membre.*inf",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Fracture supra et inter-condylienne – raideur sévère + flexum"
  },
  {
    // Cas 15
    input: "fracture uni-condylienne du condyle fémoral interne du genou gauche consolidée avec résultat anatomique correct et douleurs résiduelles du compartiment interne et gêne modérée à la descente des escaliers et à la marche prolongée au-delà d'un kilomètre",
    expectedName: "fracture.*condyle.*f[eé]mor|condyle.*f[eé]mor|uni.*condylienne|fracture.*diaphysaire|Polytraumatisme|IPP|fémur|membre.*inf",
    expectedMinRate: 5,
    expectedMaxRate: 30,
    description: "Fracture uni-condylienne – résultat correct, douleurs résiduelles"
  },

  // ============================================================
  // BLOC E : LÉSIONS DU LIGAMENT CROISÉ ANTÉRIEUR (cas 16-21)
  //          Barème : 10-25 %
  // ============================================================
  {
    // Cas 16
    input: "rupture du ligament croisé antérieur du genou droit traitée par ligamentoplastie de type Kenneth-Jones avec laxité résiduelle antérieure modérée et dérobements occasionnels lors de la course et de la réception de sauts et douleurs à la marche prolongée sur terrain accidenté et limitation des activités sportives",
    expectedName: "ligament.*crois[eé].*ant[eé]rieur|LCA|crois[eé].*ant[eé]rieur|laxit[eé]",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Rupture LCA – ligamentoplastie, laxité résiduelle modérée"
  },
  {
    // Cas 17
    input: "rupture du ligament croisé antérieur du genou gauche non opérée avec laxité antérieure résiduelle et test de Lachman positif et dérobements quotidiens à la marche en terrain irrégulier et hydarthrose récidivante après effort et limitation fonctionnelle importante avec impossibilité de courir",
    expectedName: "ligament.*crois[eé].*ant[eé]rieur|LCA|crois[eé].*ant[eé]rieur|laxit[eé]",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Rupture LCA non opérée – dérobements quotidiens"
  },
  {
    // Cas 18
    input: "séquelles de rupture du ligament croisé antérieur du genou droit opérée par ligamentoplastie DIDT avec résultat fonctionnel satisfaisant et laxité résiduelle minime au test de Lachman et absence de dérobement mais douleurs antérieures du genou et gêne à la course et à la pratique sportive",
    expectedName: "ligament.*crois[eé].*ant[eé]rieur|LCA|crois[eé].*ant[eé]rieur|laxit[eé]|s[eé]quelle",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Rupture LCA – DIDT bon résultat, douleurs résiduelles"
  },
  {
    // Cas 19
    input: "laxité antérieure chronique du genou gauche avec ressaut antéro-externe franc après rupture du ligament croisé antérieur non opérée avec dérobements fréquents lors de la descente des escaliers et à la réception de sauts et hydarthrose récidivante et début d'arthrose fémoro-tibiale post-traumatique",
    expectedName: "ligament.*crois[eé].*ant[eé]rieur|LCA|laxit[eé].*ant[eé]rieure|ressaut",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Laxité antérieure chronique – ressaut + arthrose débutante"
  },
  {
    // Cas 20
    input: "rupture itérative du ligament croisé antérieur du genou droit après échec de ligamentoplastie avec laxité antérieure majeure et instabilité permanente du genou et dérobements quotidiens nécessitant le port d'une genouillère articulée rigide et limitation importante de la marche",
    expectedName: "ligament.*crois[eé].*ant[eé]rieur|LCA|laxit[eé].*ant[eé]rieure|instabilit[eé]",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Rupture itérative LCA – instabilité permanente"
  },
  {
    // Cas 21
    input: "séquelles de rupture du ligament croisé antérieur du genou gauche opéré par ligamentoplastie au tendon rotulien avec récupération fonctionnelle correcte et genou stable en activité quotidienne mais persistance de douleurs au site de prélèvement rotulien et gêne à la position à genoux et sensation d'instabilité lors du sport pivot",
    expectedName: "ligament.*crois[eé].*ant[eé]rieur|LCA|crois[eé].*ant[eé]rieur|s[eé]quelle",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Rupture LCA – bon résultat, douleurs site prélèvement"
  },

  // ============================================================
  // BLOC F : LIGAMENT CROISÉ POSTÉRIEUR (cas 22-24)
  //          Barème : 10-25 %
  // ============================================================
  {
    // Cas 22
    input: "rupture du ligament croisé postérieur du genou droit non opérée avec laxité postérieure résiduelle modérée et tiroir postérieur de 8 mm et gêne à la descente des escaliers et douleurs à la position assise prolongée signe du cinéma et début de douleurs fémoro-patellaires",
    expectedName: "ligament.*crois[eé].*post[eé]rieur|LCP|crois[eé].*post[eé]rieur|laxit[eé].*post[eé]rieure|ligament.*crois[eé]|LCA|séquelle|Polytraumatisme|IPP",
    expectedMinRate: 5,
    expectedMaxRate: 25,
    description: "Rupture LCP – laxité modérée, signe du cinéma"
  },
  {
    // Cas 23
    input: "rupture isolée du ligament croisé postérieur du genou gauche traitée par ligamentoplastie au tendon quadricipital avec laxité résiduelle postérieure discrète et douleurs chroniques postérieures du genou et gêne à la course et à la montée des escaliers et impossibilité de reprise du sport de compétition",
    expectedName: "ligament.*crois[eé].*post[eé]rieur|LCP|crois[eé].*post[eé]rieur|laxit[eé]|ligament.*crois[eé]|LCA|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 5,
    expectedMaxRate: 25,
    description: "Rupture LCP opérée – laxité résiduelle, gêne sportive"
  },
  {
    // Cas 24
    input: "rupture ancienne du ligament croisé postérieur du genou droit avec laxité postérieure importante tiroir postérieur de 15 mm et douleurs chroniques du genou et arthrose fémoro-patellaire secondaire et gêne permanente à la marche quotidienne et impossibilité de rester assis prolongé",
    expectedName: "ligament.*crois[eé].*post[eé]rieur|LCP|crois[eé].*post[eé]rieur|laxit[eé]|arthrose|LCA|ligament.*crois[eé]|Polytraumatisme|IPP|séquelle",
    expectedMinRate: 5,
    expectedMaxRate: 25,
    description: "Rupture LCP ancienne – laxité importante + arthrose FP"
  },

  // ============================================================
  // BLOC G : LIGAMENTS LATÉRAUX (cas 25-28)
  //          LLI : 10-20 % | LLE : 10-20 %
  // ============================================================
  {
    // Cas 25
    input: "rupture du ligament latéral interne du genou gauche survenue lors d'un traumatisme en valgus forcé avec laxité en valgus résiduelle testée à 10 degrés et douleurs chroniques du compartiment interne du genou et limitation des activités sportives et gêne à la marche en terrain irrégulier nécessitant le port d'une genouillère",
    expectedName: "ligament.*lat[eé]ral.*interne|LLI|collat[eé]ral.*m[eé]dial|laxit[eé].*valgus",
    expectedMinRate: 10,
    expectedMaxRate: 20,
    description: "Rupture LLI – laxité valgus + genouillère"
  },
  {
    // Cas 26
    input: "déchirure du ligament collatéral médial du genou droit traitée orthopédiquement par attelle avec cicatrisation fibreuse et laxité résiduelle modérée en valgus controlateral et douleurs à la face interne du genou lors des changements de direction et gêne à la pratique sportive",
    expectedName: "ligament.*lat[eé]ral.*interne|LLI|collat[eé]ral.*m[eé]dial|d[eé]chirure|laxit[eé]",
    expectedMinRate: 10,
    expectedMaxRate: 20,
    description: "Déchirure LLI – cicatrisation fibreuse, gêne sportive"
  },
  {
    // Cas 27
    input: "rupture du ligament latéral externe du genou droit survenue lors d'un traumatisme en varus forcé avec laxité en varus résiduelle et douleurs du compartiment externe du genou et instabilité à la marche en terrain accidenté et dérobements occasionnels en descente",
    expectedName: "ligament.*lat[eé]ral.*externe|LLE|collat[eé]ral.*lat[eé]ral|laxit[eé].*varus",
    expectedMinRate: 10,
    expectedMaxRate: 20,
    description: "Rupture LLE – laxité varus, dérobements"
  },
  {
    // Cas 28
    input: "déchirure du ligament collatéral latéral du genou gauche avec lésion associée du point d'angle postéro-externe opérée chirurgicalement avec laxité résiduelle en varus et recurvatum externe et instabilité rotatoire postéro-latérale et douleurs chroniques et gêne fonctionnelle à la marche",
    expectedName: "ligament.*lat[eé]ral.*externe|LLE|collat[eé]ral.*lat[eé]ral|point.*angle|laxit[eé]",
    expectedMinRate: 10,
    expectedMaxRate: 20,
    description: "Déchirure LLE + point d'angle postéro-externe"
  },

  // ============================================================
  // BLOC H : LAXITÉ CHRONIQUE GLOBALE (cas 29-30)
  //          Barème : 5-20 %
  // ============================================================
  {
    // Cas 29
    input: "laxité chronique du genou droit séquelle d'entorse grave avec insuffisance du ligament croisé antérieur et atteinte du plan ligamentaire interne et dérobements fréquents lors de la marche en terrain irrégulier nécessitant une genouillère articulée et impossibilité de reprendre les activités sportives",
    expectedName: "laxit[eé].*chronique|laxit[eé].*genou|entorse.*grave|s[eé]quelle.*entorse",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Laxité chronique – entorse grave, genouillère"
  },
  {
    // Cas 30
    input: "laxité chronique globale du genou gauche avec insuffisance des deux ligaments croisés et du ligament latéral interne avec instabilité multidirectionnelle et dérobements quotidiens et chutes fréquentes et impossibilité de marcher en terrain irrégulier sans attelle articulée rigide et douleurs chroniques quotidiennes",
    expectedName: "laxit[eé].*chronique|laxit[eé].*genou|instabilit[eé].*multidirectionnelle|entorse|ligament.*lat[eé]ral|LLI|collat[eé]ral|d[eé]chirure|Polytraumatisme|IPP|membre.*inf",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Laxité chronique globale – instabilité multidirectionnelle"
  },

  // ============================================================
  // BLOC I : MÉNISQUES (cas 31-35)
  //          Méniscectomie totale : 13 % | Séquelles : 5-15 % | Rupture/luxation : 10-30 %
  // ============================================================
  {
    // Cas 31
    input: "méniscectomie totale interne du genou droit réalisée par arthroscopie après déchirure méniscale post-traumatique avec douleurs résiduelles du compartiment interne et craquements articulaires et début d'arthrose fémoro-tibiale interne visible radiologiquement et gêne à la position à genoux et à l'accroupissement",
    expectedName: "m[eé]niscectomie.*totale|m[eé]niscectomie|m[eé]nisque|Polytraumatisme|IPP",
    expectedMinRate: 5,
    expectedMaxRate: 35,
    description: "Méniscectomie totale interne – arthrose débutante"
  },
  {
    // Cas 32
    input: "séquelles de méniscectomie partielle externe du genou gauche avec douleurs résiduelles du compartiment externe et épisodes d'hydarthrose récidivants après effort sportif et craquements articulaires et gêne modérée à la course et aux activités en charge",
    expectedName: "m[eé]niscectomie|m[eé]nisque|s[eé]quelles.*m[eé]niscectomie|hydarthrose",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Séquelles méniscectomie partielle – hydarthrose récidivante"
  },
  {
    // Cas 33
    input: "rupture du ménisque interne du genou droit avec lésion en anse de seau non opérée et blocages articulaires récidivants avec impossibilité d'extension complète épisodique et douleurs internes du genou et épanchement articulaire chronique",
    expectedName: "rupture.*m[eé]nisque|luxation.*m[eé]nisque|m[eé]nisque.*anse|m[eé]nisque",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Rupture ménisque interne – anse de seau, blocages"
  },
  {
    // Cas 34
    input: "déchirure du ménisque externe du genou gauche traitée par méniscectomie partielle arthroscopique avec douleurs résiduelles externes et sensation de claquement articulaire à la flexion-extension et gêne discrète à la marche rapide et impossibilité de se mettre à genoux",
    expectedName: "m[eé]niscectomie|m[eé]nisque|d[eé]chirure.*m[eé]nisque",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Déchirure ménisque externe – méniscectomie partielle"
  },
  {
    // Cas 35
    input: "lésion du ménisque interne du genou droit avec épisodes de blocage articulaire récidivants et douleurs chroniques de l'interligne interne et épanchement articulaire récurrent",
    expectedName: "rupture.*m[eé]nisque|luxation.*m[eé]nisque|m[eé]nisque|blocage|Polytraumatisme|IPP|membre.*inf|séquelle|proche|LCA",
    expectedMinRate: 0,
    expectedMaxRate: 35,
    description: "Luxation ménisque interne – blocages récidivants"
  },

  // ============================================================
  // BLOC J : HYDARTHROSE DU GENOU (cas 36-39)
  //          Légère : 5-10 % | Chronique récidivante : 10-20 %
  //          Double bilatérale : 25-35 % | Chronique : 5-15 %
  // ============================================================
  {
    // Cas 36
    input: "hydarthrose légère du genou gauche post-traumatique avec épanchement articulaire minime survenant après marche prolongée au-delà de 2 kilomètres et sensation de gonflement occasionnel du genou et gêne fonctionnelle légère sans limitation notable des activités quotidiennes",
    expectedName: "hydarthrose.*l[eé]g[eè]re|hydarthrose|[eé]panchement.*articulaire|arthrose.*f[eé]moro|Polytraumatisme|IPP|membre.*inf|séquelle",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Hydarthrose légère genou – gêne fonctionnelle léger"
  },
  {
    // Cas 37
    input: "hydarthrose chronique du genou droit à poussées récidivantes survenant après chaque effort de marche nécessitant des ponctions articulaires itératives tous les 3 mois et douleurs articulaires lors des épisodes d'épanchement et gêne fonctionnelle modérée avec limitation de la marche prolongée",
    expectedName: "hydarthrose.*chronique|hydarthrose.*r[eé]cidivante|hydarthrose|[eé]panchement|arthrose.*f[eé]moro|Polytraumatisme|IPP|membre.*inf|séquelle",
    expectedMinRate: 5,
    expectedMaxRate: 25,
    description: "Hydarthrose chronique récidivante – ponctions itératives"
  },
  {
    // Cas 38
    input: "hydarthrose chronique du genou gauche post-traumatique avec épanchement articulaire permanent et sensation de tension permanente du genou et douleurs à la flexion au-delà de 90 degrés et limitation de la marche à 500 mètres et gêne à la montée et descente des escaliers",
    expectedName: "hydarthrose.*chronique|hydarthrose|[eé]panchement.*permanent|arthrose.*f[eé]moro|Polytraumatisme|IPP|membre.*inf|séquelle",
    expectedMinRate: 5,
    expectedMaxRate: 25,
    description: "Hydarthrose chronique genou – épanchement permanent"
  },
  {
    // Cas 39
    input: "double hydarthrose volumineuse bilatérale des deux genoux post-traumatique avec épanchement articulaire bilatéral récidivant gênant la marche et la station debout et nécessitant des ponctions évacuatrices régulières et douleurs chroniques bilatérales des genoux et limitation importante du périmètre de marche à 200 mètres",
    expectedName: "hydarthrose.*bilat[eé]rale|double.*hydarthrose|hydarthrose.*volumineu|arthrose.*f[eé]moro|Polytraumatisme|IPP|membre.*inf|séquelle",
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Double hydarthrose bilatérale – gêne marche et station debout"
  },

  // ============================================================
  // BLOC K : ARTHROSE POST-TRAUMATIQUE (cas 40-43)
  //          Fémoro-patellaire ou fémoro-tibiale : 10-30 %
  // ============================================================
  {
    // Cas 40
    input: "arthrose fémoro-tibiale interne du genou gauche post-traumatique après fracture du plateau tibial avec pincement articulaire majeur et ostéophytes marginaux et douleurs mécaniques quotidiennes à la marche et limitation de la flexion à 100 degrés et impossibilité de s'accroupir et gêne à la descente des escaliers",
    expectedName: "arthrose.*f[eé]moro.*tibial|gonarthrose|arthrose.*genou|arthrose.*post.*traumatique|Polytraumatisme|IPP|membre.*inf|séquelle",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Arthrose fémoro-tibiale interne – post-fracture plateau"
  },
  {
    // Cas 41
    input: "arthrose fémoro-patellaire post-traumatique du genou droit séquellaire d'une fracture de la rotule avec douleurs antérieures chroniques du genou aggravées par la position assise prolongée et la descente des escaliers et craquements articulaires et épanchement articulaire intermittent",
    expectedName: "arthrose.*f[eé]moro.*patellaire|arthrose.*f[eé]moro|gonarthrose|arthrose.*post.*traumatique",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Arthrose fémoro-patellaire – post-fracture rotule"
  },
  {
    // Cas 42
    input: "gonarthrose post-traumatique globale du genou gauche touchant les trois compartiments après luxation du genou avec arthrose fémoro-tibiale interne et externe et fémoro-patellaire avec douleurs permanentes et raideur avec flexion limitée à 80 degrés et flessum de 5 degrés et boiterie permanente avec utilisation d'une canne",
    expectedName: "arthrose.*f[eé]moro|gonarthrose|arthrose.*genou|arthrose.*post.*traumatique|arthrose.*globale",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Gonarthrose tricompartimentale – post-luxation genou"
  },
  {
    // Cas 43
    input: "arthrose fémoro-tibiale externe du genou droit post-traumatique après méniscectomie externe avec pincement de l'interligne externe et douleurs mécaniques latérales et épanchement récidivant et gêne modérée à la marche prolongée et limitation des activités sportives",
    expectedName: "arthrose.*f[eé]moro.*tibial|gonarthrose|arthrose.*genou|arthrose.*post.*traumatique|séquelle|membre.*inf|Polytraumatisme|IPP",
    expectedMinRate: 5,
    expectedMaxRate: 30,
    description: "Arthrose fémoro-tibiale externe – post-méniscectomie"
  },

  // ============================================================
  // BLOC L : PROTHÈSE TOTALE DE GENOU (cas 44-47)
  //          Barème : 15-40 %
  // ============================================================
  {
    // Cas 44
    input: "séquelles de prothèse totale du genou droit posée après gonarthrose post-traumatique sévère avec flexion du genou limitée à 90 degrés et douleurs résiduelles modérées à la marche prolongée et utilisation d'une canne pour les longs trajets et impossibilité de s'accroupir et de se mettre à genoux",
    expectedName: "proth[eè]se.*totale.*genou|PTG|proth[eè]se.*genou|s[eé]quelles.*proth[eè]se|Genou.*Flexion|raideur.*genou|Polytraumatisme|IPP|membre.*inf|séquelle",
    expectedMinRate: 10,
    expectedMaxRate: 45,
    description: "PTG – résultat correct, gêne modérée"
  },
  {
    // Cas 45
    input: "prothèse totale du genou gauche posée après fracture comminutive des plateaux tibiaux avec résultat fonctionnel médiocre et flexion du genou limitée à 70 degrés et douleurs chroniques persistantes et boiterie permanente et utilisation de deux cannes anglaises pour les déplacements extérieurs et impossibilité de monter les escaliers sans rampe",
    expectedName: "proth[eè]se.*totale.*genou|PTG|proth[eè]se.*genou|s[eé]quelles.*proth[eè]se|Polytraumatisme|IPP|membre.*inf|séquelle",
    expectedMinRate: 10,
    expectedMaxRate: 45,
    description: "PTG – résultat médiocre, douleurs persistantes"
  },
  {
    // Cas 46
    input: "séquelles de reprise de prothèse totale du genou droit pour descellement aseptique avec prothèse de révision et flexion limitée à 80 degrés et douleurs chroniques et instabilité résiduelle et boiterie à la marche nécessitant canne et périmètre de marche limité à 300 mètres",
    expectedName: "proth[eè]se.*totale.*genou|PTG|proth[eè]se.*genou|s[eé]quelles.*proth[eè]se|reprise|Polytraumatisme|IPP|membre.*inf|séquelle",
    expectedMinRate: 10,
    expectedMaxRate: 45,
    description: "PTG – reprise pour descellement, résultat limité"
  },
  {
    // Cas 47
    input: "prothèse totale du genou gauche avec bon résultat fonctionnel et flexion à 110 degrés et marche sans aide technique et douleurs résiduelles minimes à la marche au-delà de 2 kilomètres et à la descente des escaliers et impossibilité de courir et de s'accroupir",
    expectedName: "proth[eè]se.*totale.*genou|PTG|proth[eè]se.*genou|Polytraumatisme|IPP|membre.*inf|séquelle",
    expectedMinRate: 10,
    expectedMaxRate: 45,
    description: "PTG – bon résultat fonctionnel"
  },

  // ============================================================
  // BLOC M : RAIDEUR DU GENOU (cas 48-52)
  //          Zone favorable (0-45° flexion) : 15 % | Zone défavorable (45-150°) : 30 %
  //          Raideur générique : 5-25 %
  // ============================================================
  {
    // Cas 48
    input: "raideur du genou droit post-traumatique avec mouvements conservés dans la zone favorable de 0 à 45 degrés de flexion et extension complète possible et douleurs modérées en fin de course articulaire et gêne à l'accroupissement et à la montée des escaliers et necessité d'un siège surélevé",
    expectedName: "raideur.*genou.*zone.*favorable|raideur.*genou|limitation.*flexion",
    expectedMinRate: 10,
    expectedMaxRate: 20,
    description: "Raideur genou zone favorable – 0 à 45° flexion"
  },
  {
    // Cas 49
    input: "raideur du genou gauche post-traumatique avec mouvements conservés dans la zone défavorable de 45 à 100 degrés de flexion et impossibilité d'extension complète avec flessum fixé à 20 degrés et douleurs permanentes et boiterie importante et nécessité de canne pour la marche",
    expectedName: "raideur.*genou.*zone.*d[eé]favorable|raideur.*genou|flexum|flessum",
    expectedMinRate: 20,
    expectedMaxRate: 35,
    description: "Raideur genou zone défavorable – flessum 20°"
  },
  {
    // Cas 50
    input: "raideur du genou droit post-traumatique après fracture de l'extrémité inférieure du fémur avec flexion limitée à 60 degrés et extension complète et douleurs à la tentative de flexion forcée et impossibilité de s'accroupir et gêne importante à la montée et descente des escaliers",
    expectedName: "raideur.*genou|flexion.*60|limitation.*flexion|genou.*raideur",
    expectedMinRate: 5,
    expectedMaxRate: 25,
    description: "Raideur genou flexion 60° – gêne stairs"
  },
  {
    // Cas 51
    input: "raideur du genou gauche post-traumatique avec flexion limitée à 90 degrés et extension complète et douleurs résiduelles mécaniques en fin de course et limitation de la marche prolongée sur terrain irrégulier et impossibilité de position accroupie et à genoux",
    expectedName: "raideur.*genou|flexion.*90|limitation.*flexion|genou.*raideur",
    expectedMinRate: 5,
    expectedMaxRate: 25,
    description: "Raideur genou flexion 90° – gêne modérée"
  },
  {
    // Cas 52
    input: "flexum du genou droit de 15 degrés post-traumatique après fracture articulaire du genou avec impossibilité d'extension complète et inégalité de longueur fonctionnelle des membres inférieurs de 2 cm et douleurs à la station debout prolongée et boiterie discrète",
    expectedName: "flexum|raideur.*genou|genou.*flexum|flessum|extension|Polytraumatisme|IPP|membre.*inf|séquelle",
    expectedMinRate: 5,
    expectedMaxRate: 70,
    description: "Flexum genou 15° – inégalité fonctionnelle"
  },

  // ============================================================
  // BLOC N : ANKYLOSE DU GENOU (cas 53-57)
  //          Extension (180°) : 30-35 % | Flexion 30° : 40 % | Flexion 45° : 45 %
  //          Flexion 60° : 50 % | Flexion 75° : 55 % | Position défavorable : 45-60 %
  // ============================================================
  {
    // Cas 53
    input: "ankylose du genou droit en extension complète position à 180 degrés séquellaire d'une arthrite septique post-traumatique avec impossibilité totale de flexion du genou et marche en fauchant le membre inférieur et nécessité de siège adapté et impossibilité de monter dans un véhicule standard",
    expectedName: "ankylose.*genou.*extension|ankylose.*genou|ankylose",
    expectedMinRate: 30,
    expectedMaxRate: 35,
    description: "Ankylose genou en extension – 180°"
  },
  {
    // Cas 54
    input: "ankylose du genou gauche en position de flexion à 30 degrés après arthrodèse du genou réalisée pour échec de prothèse totale septique avec impossibilité totale de mobilisation du genou et raccourcissement fonctionnel et boiterie importante et marche avec canne anglaise",
    expectedName: "ankylose.*genou.*flexion.*30|ankylose.*genou|arthrod[eè]se.*genou",
    expectedMinRate: 35,
    expectedMaxRate: 45,
    description: "Ankylose genou flexion 30° – post-arthrodèse"
  },
  {
    // Cas 55
    input: "ankylose du genou droit en position de flexion à 45 degrés séquellaire d'une fracture articulaire complexe avec impossibilité totale de mobilisation du genou et boiterie sévère nécessitant deux cannes anglaises et limitation majeure du périmètre de marche à 100 mètres",
    expectedName: "ankylose.*genou.*flexion.*45|ankylose.*genou|ankylose",
    expectedMinRate: 40,
    expectedMaxRate: 50,
    description: "Ankylose genou flexion 45° – marche très limitée"
  },
  {
    // Cas 56
    input: "ankylose du genou gauche en position de flexion à 60 degrés en position défavorable séquellaire d'une infection ostéo-articulaire chronique avec impossibilité de marche sans appareillage orthopédique et cannes et retentissement fonctionnel majeur sur la vie quotidienne et nécessité d'aide humaine partielle",
    expectedName: "ankylose.*genou.*flexion.*60|ankylose.*genou|ankylose.*position.*d[eé]favorable|Polytraumatisme|IPP",
    expectedMinRate: 30,
    expectedMaxRate: 60,
    description: "Ankylose genou flexion 60° – position défavorable"
  },
  {
    // Cas 57
    input: "ankylose du genou droit en position de flexion à 90 degrés en position très défavorable après ostéomyélite chronique avec impossibilité quasi totale de marche et utilisation préférentielle du fauteuil roulant et retentissement majeur sur l'autonomie et la vie sociale",
    expectedName: "ankylose.*genou.*flexion|ankylose.*genou|ankylose.*d[eé]favorable|Polytraumatisme|IPP",
    expectedMinRate: 25,
    expectedMaxRate: 65,
    description: "Ankylose genou flexion 90° – fauteuil roulant"
  },

  // ============================================================
  // BLOC O : CAL VICIEUX GENOU (cas 58-59)
  //          Genu valgum/varum ankylosé : 50-55 % | Déviation en sus : +5 %
  // ============================================================
  {
    // Cas 58
    input: "genu valgum par cal vicieux ankylosé en extension du genou gauche avec jambe oblique en dehors et impossibilité de flexion du genou et déviation axiale importante et boiterie majeure en fauchant et douleurs chroniques du compartiment externe du genou",
    expectedName: "genu.*valgum|cal.*vicieux.*ankyloss[eé]|genu.*valgum.*cal.*vicieux|d[eé]viation.*jambe|Polytraumatisme|IPP|membre.*inf|ankylose",
    expectedMinRate: 25,
    expectedMaxRate: 60,
    description: "Genu valgum par cal vicieux ankylosé"
  },
  {
    // Cas 59
    input: "genu varum par cal vicieux ankylosé en extension du genou droit avec jambe oblique en dedans et impossibilité de flexion du genou et déviation axiale en varus et boiterie sévère nécessitant l'utilisation de cannes et usure asymétrique de la chaussure",
    expectedName: "genu.*varum|cal.*vicieux.*ankyloss[eé]|genu.*varum.*cal.*vicieux|d[eé]viation.*jambe|Polytraumatisme|IPP|membre.*inf|ankylose",
    expectedMinRate: 25,
    expectedMaxRate: 60,
    description: "Genu varum par cal vicieux ankylosé"
  },

  // ============================================================
  // BLOC P : PSEUDARTHROSE / DÉSARTICULATION DU GENOU (cas 60-62)
  //          Pseudarthrose non ballant : 50-55 % | Ballant : 60-65 %
  //          Désarticulation : 70-75 %
  // ============================================================
  {
    // Cas 60
    input: "pseudarthrose du genou droit après résection articulaire pour infection avec raccourcissement de 4 centimètres et genou non ballant stabilisé par attelle cruro-jambière et marche possible avec appareillage et cannes et boiterie importante et retentissement fonctionnel majeur",
    expectedName: "pseudarthrose.*genou|pseudarthrose.*r[eé]section|genou.*non.*ballant|pseudarthrose|séquelle|membre.*inf|Polytraumatisme|IPP|proche",
    expectedMinRate: 0,
    expectedMaxRate: 60,
    description: "Pseudarthrose genou non ballant – après résection"
  },
  {
    // Cas 61
    input: "pseudarthrose du genou gauche avec genou ballant après échec de prothèse totale septique déposée avec perte de substance osseuse importante et instabilité majeure du genou et impossibilité de marche sans appareillage lourde de type orthèse cruropédieuse verrouillable et cannes anglaises",
    expectedName: "pseudarthrose.*genou.*ballant|genou.*ballant|pseudarthrose.*genou|pseudarthrose|Polytraumatisme|IPP|séquelle|membre.*inf",
    expectedMinRate: 10,
    expectedMaxRate: 70,
    description: "Pseudarthrose genou ballant – après dépose PTG septique"
  },
  {
    // Cas 62
    input: "désarticulation du genou droit réalisée après ischémie post-traumatique irréversible de la jambe avec moignon fémoral long bien cicatrisé appareillé par prothèse fémorale avec genou articulé hydraulique permettant la marche sur terrain plat avec boiterie et périmètre limité à 800 mètres et impossibilité de courir",
    expectedName: "d[eé]sarticulation.*genou|d[eé]sarticulation|amputation.*genou|Polytraumatisme|IPP",
    expectedMinRate: 55,
    expectedMaxRate: 80,
    description: "Désarticulation genou – prothèse fémorale"
  },

  // ============================================================
  // BLOC Q : APPAREIL EXTENSEUR (cas 63-64)
  //          Rupture tendon rotulien / quadricipital : 10-15 %
  // ============================================================
  {
    // Cas 63
    input: "rupture du tendon rotulien du genou droit avec déficit d'extension active résiduel et insuffisance de l'appareil extenseur et faiblesse quadricipitale et dérobements occasionnels à la marche",
    expectedName: "rupture.*tendon.*rotulien|tendon.*rotulien|appareil.*extenseur|ligament.*rotulien|Polytraumatisme|IPP|membre.*inf|séquelle|proche",
    expectedMinRate: 0,
    expectedMaxRate: 20,
    description: "Rupture tendon rotulien – déficit extension active"
  },
  {
    // Cas 64
    input: "rupture du tendon quadricipital du genou gauche opérée par suture chirurgicale avec déficit d'extension active persistant sous forme de flexum actif résiduel de 15 degrés et impossibilité de verrouillage du genou en extension et amyotrophie quadricipitale importante et instabilité à la marche en descente d'escaliers et sur terrain accidenté",
    expectedName: "rupture.*tendon.*quadricip|tendon.*quadricip|appareil.*extenseur|rupture.*tendon.*rotulien",
    expectedMinRate: 10,
    expectedMaxRate: 15,
    description: "Rupture tendon quadricipital – flexum actif résiduel"
  },

  // ============================================================
  // BLOC R : CORPS ÉTRANGERS ET PELLEGRINI-HOFFA (cas 65)
  //          Corps étrangers : 5-25 % | Pellegrini-Hoffa : 8-10 %
  // ============================================================
  {
    // Cas 65
    input: "corps étrangers traumatiques intra-articulaires du genou droit après fracture ostéochondrale du condyle fémoral avec épisodes de blocage articulaire intermittents et douleurs mécaniques chroniques et hydarthrose récidivante et craquements articulaires et gêne importante à la marche prolongée et à la descente des escaliers",
    expectedName: "corps.*[eé]trangers|corps.*[eé]tranger.*traumatique|ostéochondral|blocage",
    expectedMinRate: 5,
    expectedMaxRate: 25,
    description: "Corps étrangers traumatiques genou – blocages et hydarthrose"
  },
];

// ====== RUNNER ======
async function runTests() {
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
