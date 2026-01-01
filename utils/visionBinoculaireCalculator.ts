/**
 * CALCULATEUR DE VISION BINOCULAIRE - IPP
 * Basé sur le tableau à double entrée officiel du barème AT
 */

export type VisionLevel = 
  | "10/10" 
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
  ipp: number | [number, number];
  description: string;
  oeilDroit: VisionLevel;
  oeilGauche: VisionLevel;
  gravite: "Légère" | "Modérée" | "Importante" | "Sévère" | "Très sévère" | "Cécité";
}

/**
 * Tableau de correspondance vision binoculaire -> IPP
 * Matrice [oeil1][oeil2] = IPP
 */
const VISION_BINOCULAIRE_TABLE: Record<string, Record<string, number | [number, number]>> = {
  "10/10": {
    "10/10": 0,
    "8/10": 0,
    "7/10": [2, 3],
    "6/10": [2, 3],
    "5/10": [4, 6],
    "4/10": [4, 6],
    "3/10": [7, 11],
    "2/10": [16, 18],
    "1/10": [19, 22],
    "1/20": [22, 25],
    "<1/20": [25, 30],
    "Énucléation": [28, 33],
  },
  "8/10": {
    "8/10": 0,
    "7/10": [2, 3],
    "6/10": [2, 3],
    "5/10": [4, 6],
    "4/10": [4, 6],
    "3/10": [7, 11],
    "2/10": [16, 18],
    "1/10": [19, 22],
    "1/20": [22, 25],
    "<1/20": [25, 30],
    "Énucléation": [28, 33],
  },
  "7/10": {
    "7/10": [2, 3],
    "6/10": [2, 3],
    "5/10": [5, 8],
    "4/10": [5, 8],
    "3/10": [12, 15],
    "2/10": [18, 21],
    "1/10": [22, 25],
    "1/20": [25, 30],
    "<1/20": [30, 35],
    "Énucléation": [33, 38],
  },
  "6/10": {
    "6/10": [2, 3],
    "5/10": [5, 8],
    "4/10": [5, 8],
    "3/10": [12, 15],
    "2/10": [18, 21],
    "1/10": [22, 25],
    "1/20": [25, 30],
    "<1/20": [30, 35],
    "Énucléation": [33, 38],
  },
  "5/10": {
    "5/10": [4, 6],
    "4/10": [4, 6],
    "3/10": [9, 12],
    "2/10": [18, 21],
    "1/10": [22, 25],
    "1/20": [25, 30],
    "<1/20": [35, 40],
    "Énucléation": [45, 48],
  },
  "4/10": {
    "4/10": [4, 6],
    "3/10": [9, 12],
    "2/10": [18, 21],
    "1/10": [22, 25],
    "1/20": [25, 30],
    "<1/20": [35, 40],
    "Énucléation": [45, 48],
  },
  "3/10": {
    "3/10": [7, 11],
    "2/10": [12, 15],
    "1/10": [18, 21],
    "1/20": [22, 25],
    "<1/20": [30, 35],
    "Énucléation": [40, 45],
  },
  "2/10": {
    "2/10": [16, 18],
    "1/10": [18, 21],
    "1/20": [22, 25],
    "<1/20": [30, 35],
    "Énucléation": [45, 50],
  },
  "1/10": {
    "1/10": [19, 22],
    "1/20": [22, 25],
    "<1/20": [25, 30],
    "Énucléation": [40, 45],
  },
  "1/20": {
    "1/20": [22, 25],
    "<1/20": [25, 30],
    "Énucléation": [35, 40],
  },
  "<1/20": {
    "<1/20": [25, 30],
    "Énucléation": [33, 48],
  },
  "Énucléation": {
    "Énucléation": 100, // Énucléation bilatérale = cécité absolue
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
 */
export function calculateVisionBinoculaireIPP(
  oeilDroit: string,
  oeilGauche: string
): VisionIPPResult {
  const od = normalizeVision(oeilDroit);
  const og = normalizeVision(oeilGauche);
  
  // Cécité bilatérale
  if ((od === "Cécité" || od === "Énucléation") && (og === "Cécité" || og === "Énucléation")) {
    return {
      ipp: 100,
      description: "Cécité complète bilatérale - Incapacité totale",
      oeilDroit: od,
      oeilGauche: og,
      gravite: "Cécité"
    };
  }
  
  // Vision unilatérale normale + perte controlatérale
  if ((od === "10/10" || od === "8/10") && (og === "<1/20" || og === "Énucléation" || og === "Cécité")) {
    return {
      ipp: 30,
      description: "Perte complète de la vision d'un œil (l'autre étant normal)",
      oeilDroit: od,
      oeilGauche: og,
      gravite: "Importante"
    };
  }
  if ((og === "10/10" || og === "8/10") && (od === "<1/20" || od === "Énucléation" || od === "Cécité")) {
    return {
      ipp: 30,
      description: "Perte complète de la vision d'un œil (l'autre étant normal)",
      oeilDroit: od,
      oeilGauche: og,
      gravite: "Importante"
    };
  }
  
  // Recherche dans le tableau (symétrique)
  let ippValue = VISION_BINOCULAIRE_TABLE[od]?.[og] || VISION_BINOCULAIRE_TABLE[og]?.[od];
  
  if (!ippValue && ippValue !== 0) {
    // Cas non trouvé - estimation conservatrice
    ippValue = [10, 20];
  }
  
  // Déterminer la gravité
  let gravite: VisionIPPResult["gravite"] = "Légère";
  const maxIPP = Array.isArray(ippValue) ? ippValue[1] : ippValue;
  
  if (maxIPP === 100) gravite = "Cécité";
  else if (maxIPP >= 60) gravite = "Très sévère";
  else if (maxIPP >= 40) gravite = "Sévère";
  else if (maxIPP >= 20) gravite = "Importante";
  else if (maxIPP >= 10) gravite = "Modérée";
  
  return {
    ipp: ippValue,
    description: `Vision binoculaire: ${od} + ${og}`,
    oeilDroit: od,
    oeilGauche: og,
    gravite
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
