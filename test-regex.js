const text = "Le salarié, âgé de 46 ans, exerce la fonction de maçon spécialisé. L'accident est survenu sur un chantier, pendant le temps de travail, lors de la descente d'un échafaudage. À la suite d'un faux appui, il a chuté de sa hauteur avec réception brutale sur le membre supérieur gauche. Les examens cliniques et radiologiques ont révélé une fracture déplacée du radius distal gauche, associée à une déchirure partielle des tendons extenseurs du poignet ainsi qu'une élongation musculaire de l'épaule gauche.";

// Normaliser comme dans le code
const normalized = text.toLowerCase()
  .replace(/[éèê]/g, 'e')
  .replace(/[àâ]/g, 'a')
  .replace(/[ç]/g, 'c')
  .replace(/'/g, "'");

console.log("Texte normalisé:", normalized.substring(0, 200));
console.log();

// Pattern 0B extraction avec cleanedText
const cleanedText = normalized;

// Tests patterns d'extraction individuels
const fractureMatch = cleanedText.match(/fracture\s+(?:non\s+)?(?:deplacee?)?\s*(?:du|de\s+la)?\s*(?:tiers)?\s*(?:distal|proximal|moyen)?\s*(?:du|de\s+la)?\s*(?:tibia|femur|humerus|genou|radius|cubitus)\s*(?:droit|gauche)?/i);
console.log("fractureMatch:", fractureMatch ? fractureMatch[0] : "NULL");

const ligamentMatch = cleanedText.match(/(?:dechirure|lesion|rupture)\s+(?:partielle?|complete?|totale?)?\s*(?:du|de\s+la|des)?\s*(?:ligament\s+(?:collateral|croise|lateral|lca|lcp)|tendons?\s+extenseurs?)\s*(?:medial|interne|externe|anterieur|posterieur|poignet|main)?\s*(?:du|de\s+la)?\s*(?:genou|coude|poignet)?\s*(?:droit|gauche)?/i);
console.log("ligamentMatch:", ligamentMatch ? ligamentMatch[0] : "NULL");

// 🆕 Pattern muscle SPÉCIFIQUE - UNIQUEMENT élongation
const muscleMatch = cleanedText.match(/elongation\s+(?:musculaire?)?\s*(?:du|de\s+la?|de\s+l['']?|l['']?)?\s*(?:muscle|quadriceps|epaule|triceps|biceps|deltoid|deltoide)\s*(?:gauche|droit)?/i);
console.log("muscleMatch:", muscleMatch ? muscleMatch[0] : "NULL");

console.log();
console.log("Nombre de lésions extraites:", [fractureMatch, ligamentMatch, muscleMatch].filter(m => m).length);

