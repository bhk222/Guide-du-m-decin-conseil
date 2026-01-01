/**
 * CALCULATEUR DE VISION BINOCULAIRE - IPP
 * Basé sur le tableau à double entrée officiel du barème AT
 */

export type VisionLevel = 
  | "10/10"
  | "9/10"
  | "8/10" 
  | "7/10" 
  | "6/10" 
  | "5/10" 
  | "4/10" 
  | "3/10" 
  | "2/10" 
  | "1/10" 
  | "1/20" 
  | "<1/20" 
  | "Énucléation"
  | "Cécité";

interface VisionIPPResult {
  ipp: number;
  description: string;
  oeilDroit: VisionLevel;
  oeilGauche: VisionLevel;
  gravite: "Légère" | "Modérée" | "Importante" | "Sévère" | "Très sévère" | "Cécité";
  noteCorrection?: string;
}

/**
 * Tableau de correspondance vision binoculaire -> IPP
 * Basé sur le TABLEAU GÉNÉRAL D'ÉVALUATION officiel
 * Matrice [oeil1][oeil2] = IPP
 */
const VISION_BINOCULAIRE_TABLE: Record<string, Record<string, number>> = {
  // Ligne 8-9/10
  "9/10": {
    "9/10": 0, "8/10": 0,
    "7/10": 3, "6/10": 3,
    "5/10": 6, "4/10": 8,
    "3/10": 10, "2/10": 17,
    "1/10": 23, "1/20": 28,
    "<1/20": 30, "Énucléation": 35,
  },
  "8/10": {
    "8/10": 0,
    "7/10": 3, "6/10": 3,
    "5/10": 6, "4/10": 8,
    "3/10": 10, "2/10": 17,
    "1/10": 23, "1/20": 28,
    "<1/20": 30, "Énucléation": 35,
  },
  // Ligne 7/10
  "7/10": {
    "7/10": 3, "6/10": 5,
    "5/10": 8, "4/10": 11,
    "3/10": 13, "2/10": 18,
    "1/10": 25, "1/20": 30,
    "<1/20": 35, "Énucléation": 40,
  },
  // Ligne 6/10
  "6/10": {
    "6/10": 5,
    "5/10": 8, "4/10": 11,
    "3/10": 13, "2/10": 18,
    "1/10": 25, "1/20": 30,
    "<1/20": 35, "Énucléation": 40,
  },
  // Ligne 5/10
  "5/10": {
    "5/10": 6, "4/10": 8,
    "3/10": 10, "2/10": 25,
    "1/10": 30, "1/20": 40,
    "<1/20": 45, "Énucléation": 50,
  },
  // Ligne 4/10
  "4/10": {
    "4/10": 8,
    "3/10": 15, "2/10": 25,
    "1/10": 35, "1/20": 43,
    "<1/20": 48, "Énucléation": 53,
  },
  // Ligne 3/10
  "3/10": {
    "3/10": 10,
    "2/10": 25, "1/10": 35,
    "1/20": 55, "<1/20": 60,
    "Énucléation": 65,
  },
  // Ligne 2/10
  "2/10": {
    "2/10": 17,
    "1/10": 45, "1/20": 55,
    "<1/20": 80, "Énucléation": 85,
  },
  // Ligne 1/10
  "1/10": {
    "1/10": 23,
    "1/20": 60, "<1/20": 80,
    "Énucléation": 100,
  },
  // Ligne 1/20
  "1/20": {
    "1/20": 28,
    "<1/20": 90, "Énucléation": 100,
  },
  // Ligne Moins de 1/20
  "<1/20": {
    "<1/20": 30,
    "Énucléation": 100,
  },
  // Ligne Énucléation prothèse
  "Énucléation": {
    "Énucléation": 35, // Énucléation bilatérale avec prothèses
  },
};

/**
 * Normalise la vision en niveau standardisé
 */
function normalizeVision(vision: string): VisionLevel {
  const v = vision.toLowerCase().trim();
  
  // Énucléation / Cécité
  if (v.includes("énucl") || v.includes("enucl") || v.includes("ablation") || v.includes("perte globe")) {
    return "Énucléation";
  }
  if (v.includes("cécité") || v.includes("cecite") || v.includes("aveugle")) {
    return "Cécité";
  }
  
  // Niveaux de vision
  if (v.includes("10/10") || v === "10") return "10/10";
  if (v.includes("9/10") || v === "9") return "9/10";
  if (v.includes("8/10") || v === "8") return "8/10";
  if (v.includes("7/10") || v === "7") return "7/10";
  if (v.includes("6/10") || v === "6") return "6/10";
  if (v.includes("5/10") || v === "5") return "5/10";
  if (v.includes("4/10") || v === "4") return "4/10";
  if (v.includes("3/10") || v === "3") return "3/10";
  if (v.includes("2/10") || v === "2") return "2/10";
  if (v.includes("1/10") || v === "1/10") return "1/10";
  if (v.includes("1/20") || v === "1/20") return "1/20";
  if (v.includes("<1/20") || v.includes("moins") || v.includes("inferieur 1/20")) return "<1/20";
  
  // Par défaut
  return "10/10";
}

/**
 * Calcule l'IPP selon la vision binoculaire
 * Basé sur le TABLEAU GÉNÉRAL D'ÉVALUATION officiel
 */
export function calculateVisionBinoculaireIPP(
  oeilDroit: string,
  oeilGauche: string
): VisionIPPResult {
  const od = normalizeVision(oeilDroit);
  const og = normalizeVision(oeilGauche);
  
  // Note sur correction pour vision maximale d'un œil
  let noteCorrection: string | undefined;
  
  // Cécité bilatérale complète
  if ((od === "Cécité" || od === "Énucléation" && og === "Énucléation") && 
      (og === "Cécité" || (od === "Énucléation" && og === "Énucléation"))) {
    // Cas spécial énucléation bilatérale
    if (od === "Énucléation" && og === "Énucléation") {
      return {
        ipp: 35, // Selon tableau: Énucléation + Énucléation = 35%
        description: "Énucléation bilatérale avec prothèses",
        oeilDroit: od,
        oeilGauche: og,
        gravite: "Très sévère",
        noteCorrection: "Avec prothèses oculaires adaptées. Cécité absolue = 100% si pas de prothèse possible."
      };
    }
    
    return {
      ipp: 100,
      description: "Cécité complète bilatérale - Incapacité totale",
      oeilDroit: od,
      oeilGauche: og,
      gravite: "Cécité"
    };
  }
  
  // Normaliser 10/10 et 9/10 ensemble (ligne 8-9/10 du tableau)
  const od_normalized = (od === "10/10") ? "9/10" : od;
  const og_normalized = (og === "10/10") ? "9/10" : og;
  
  // Recherche dans le tableau (symétrique)
  let ippValue = VISION_BINOCULAIRE_TABLE[od_normalized]?.[og_normalized] || 
                 VISION_BINOCULAIRE_TABLE[og_normalized]?.[od_normalized];
  
  // Cas vision maximale d'un œil avec sphériques/cylindriques
  const visionMax = ["10/10", "9/10", "8/10"];
  if (visionMax.includes(od) && ["1/10", "1/20", "<1/20"].includes(og)) {
    noteCorrection = "Note: Lorsque la vision maximum de l'œil atteint — et de cet œil seul — ne sera obtenue qu'à l'aide de sphériques ou de cylindriques, il y aura lieu d'ajouter 5 p. 100 pratiquement. Le sujet ne recourra que rarement à son verre correcteur; celui-ci est pratiquement inutilisable puisqu'il ne permet pas la vision simultanée ou binoculaire.";
  }
  
  if (!ippValue && ippValue !== 0) {
    // Cas non trouvé - estimation conservatrice
    ippValue = 10;
  }
  
  // Déterminer la gravité
  let gravite: VisionIPPResult["gravite"] = "Légère";
  
  if (ippValue === 100) gravite = "Cécité";
  else if (ippValue >= 80) gravite = "Très sévère";
  else if (ippValue >= 50) gravite = "Sévère";
  else if (ippValue >= 25) gravite = "Importante";
  else if (ippValue >= 10) gravite = "Modérée";
  
  return {
    ipp: ippValue,
    description: `Vision binoculaire: ${od} + ${og}`,
    oeilDroit: od,
    oeilGauche: og,
    gravite,
    noteCorrection
  };
}

/**
 * Extrait les valeurs de vision depuis un texte libre
 */
export function extractVisionFromText(text: string): { od: string | null; og: string | null } {
  const normalizedText = text.toLowerCase();
  
  // Patterns de reconnaissance
  const patterns = [
    /od[:\s]+(\d+\/\d+|énucléation|cécité)/i,
    /oeil droit[:\s]+(\d+\/\d+|énucléation|cécité)/i,
    /og[:\s]+(\d+\/\d+|énucléation|cécité)/i,
    /oeil gauche[:\s]+(\d+\/\d+|énucléation|cécité)/i,
    /acuité.*?od[:\s]+(\d+\/\d+)/i,
    /acuité.*?og[:\s]+(\d+\/\d+)/i,
  ];
  
  let od: string | null = null;
  let og: string | null = null;
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      if (pattern.source.includes("od") || pattern.source.includes("droit")) {
        od = match[1];
      } else if (pattern.source.includes("og") || pattern.source.includes("gauche")) {
        og = match[1];
      }
    }
  }
  
  return { od, og };
}

/**
 * Fonction principale avec extraction automatique
 */
export function analyzeVisionFromText(text: string): VisionIPPResult | null {
  const { od, og } = extractVisionFromText(text);
  
  if (!od || !og) {
    return null;
  }
  
  return calculateVisionBinoculaireIPP(od, og);
}
