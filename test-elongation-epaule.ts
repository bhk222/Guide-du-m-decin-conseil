/**
 * 🧪 TEST DIAGNOSTIC: Pourquoi "élongation musculaire épaule" n'est pas détectée ?
 */

const testText = "fracture déplacée du radius distal gauche, associée à une déchirure partielle des tendons extenseurs du poignet ainsi qu'une élongation musculaire de l'épaule gauche";

// Simulation normalize() - enlève accents et apostrophes
const normalize = (str: string) => {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/['']/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
};

const normalized = normalize(testText);
console.log('📝 Texte original:', testText);
console.log('📝 Texte normalisé:', normalized);
console.log('');

// Pattern actuel (V3.3.201M-bis)
const musclePattern = /(?:elongation|dechirure|rupture)\s+(?:musculaire?)?\s*(?:du|de\s+la?|de\s+l|l)?\s*(?:muscle|quadriceps|epaule|triceps|biceps|deltoid)\s*(?:gauche|droit)?/i;

const match = normalized.match(musclePattern);
console.log('🔍 Pattern V3.3.201M-bis:');
console.log('Pattern simplifié sans apostrophes complexes');
console.log('');
console.log('✅ Match trouvé:', match ? match[0] : '❌ NULL');
console.log('');

// Test patterns alternatifs
console.log('🧪 Tests patterns alternatifs:');

// Pattern 1: Plus flexible après "musculaire"
const pattern1 = /elongation\s+musculaire?\s+(?:du|de\s+la?|de\s+l|l)?\s*(?:muscle\s+)?(?:epaule|quadriceps|triceps)/i;
const match1 = normalized.match(pattern1);
console.log('Pattern 1 (plus flexible):', match1 ? match1[0] : '❌ NULL');

// Pattern 2: Chercher "de l epaule" (sans apostrophe après normalisation)
const pattern2 = /elongation\s+musculaire\s+de\s+l\s+epaule/i;
const match2 = normalized.match(pattern2);
console.log('Pattern 2 (de l epaule):', match2 ? match2[0] : '❌ NULL');

// Pattern 3: Espace au lieu d'apostrophe
const pattern3 = /elongation\s+(?:musculaire?\s+)?(?:de\s+l\s+|du\s+|de\s+la\s+)?(?:epaule|quadriceps|muscle)/i;
const match3 = normalized.match(pattern3);
console.log('Pattern 3 (espaces flexibles):', match3 ? match3[0] : '❌ NULL');

console.log('');
console.log('🔍 Analyse du problème:');
console.log('   Recherche "de l epaule" dans normalized:', normalized.includes('de l epaule') ? '✅ OUI' : '❌ NON');
console.log('   Recherche "de l\' epaule" dans normalized:', normalized.includes("de l' epaule") ? '✅ OUI' : '❌ NON');
console.log('   Recherche "elongation musculaire" dans normalized:', normalized.includes('elongation musculaire') ? '✅ OUI' : '❌ NON');
