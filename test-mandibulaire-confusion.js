// Test analyse "double fracture mandibulaire"

const text = "double fracture mandibulaire";

// Simulation scoring
const keywords = {
    'double': 50,      // Keyword général
    'fracture': 85,    // Keyword principal
    'mandibulaire': 95, // Os spécifique
    'mandibule': 95,
    'clavicule': 95    // Os spécifique AUSSI
};

console.log("=== ANALYSE: 'double fracture mandibulaire' ===\n");

// Pattern 1: "Fracture Clavicule - Double, cals saillants..."
const pattern1_name = "Fracture Clavicule - Double, cals saillants, raideurs des épaules";
const pattern1_keywords = ['fracture', 'clavicule', 'double'];
const pattern1_score = 85 + 95 + 50; // = 230

// Pattern 2: "Fracture mandibulaire"
const pattern2_name = "Fracture de la mandibule avec cal vicieux";
const pattern2_keywords = ['fracture', 'mandibulaire'];
const pattern2_score = 85 + 95; // = 180

console.log(`❌ Pattern 1: "${pattern1_name}"`);
console.log(`   Keywords matchés: ${pattern1_keywords.join(', ')}`);
console.log(`   Score: ${pattern1_score}\n`);

console.log(`✅ Pattern 2: "${pattern2_name}"`);
console.log(`   Keywords matchés: ${pattern2_keywords.join(', ')}`);
console.log(`   Score: ${pattern2_score}\n`);

console.log("=== DIAGNOSTIC ===");
console.log("⚠️ 'Fracture Clavicule - Double' gagne à cause du mot 'double' (+50 points)");
console.log("💡 SOLUTION: Bloquer 'Ceinture Scapulaire/clavicule' si 'mandibulaire/mandibule/mâchoire' détecté");
console.log("💡 LOGIQUE: Si utilisateur dit EXPLICITEMENT 'mandibulaire', JAMAIS proposer clavicule");
