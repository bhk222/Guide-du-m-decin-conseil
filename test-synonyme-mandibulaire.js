// Test mapping synonymes mandibulaire → maxillaire inférieur

const normalize = (text) => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[-']/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
};

const synonymMap = {
    'mandibule': 'maxillaire inferieur',
    'mandibulaire': 'maxillaire inferieur',
    'fracture mandibule': 'fracture maxillaire inferieur',
    'fracture mandibulaire': 'fracture maxillaire inferieur',
    'double fracture mandibulaire': 'fracture maxillaire inferieur',
    'double fracture mandibule': 'fracture maxillaire inferieur',
};

const testCases = [
    { input: "double fracture mandibulaire", expected: "fracture maxillaire inferieur" },
    { input: "fracture de la mandibule", expected: "fracture de la maxillaire inferieur" },
    { input: "fracture mandibulaire gauche", expected: "fracture maxillaire inferieur gauche" },
];

console.log("=== TEST MAPPING SYNONYMES MANDIBULAIRE ===\n");

testCases.forEach(({ input, expected }) => {
    let normalized = normalize(input);
    
    // Appliquer les synonymes par ordre de longueur décroissante
    const sortedKeys = Object.keys(synonymMap).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
        const regex = new RegExp(`\\b${key}\\b`, 'gi');
        normalized = normalized.replace(regex, synonymMap[key]);
    }
    
    const status = normalized.includes('maxillaire inferieur') ? "✅" : "❌";
    console.log(`${status} Input: "${input}"`);
    console.log(`   Résultat: "${normalized}"`);
    console.log(`   Attendu: "${expected}"`);
    console.log("");
});

console.log("=== DIAGNOSTIC ===");
console.log("✅ 'double fracture mandibulaire' → doit contenir 'maxillaire inferieur'");
console.log("💡 Le mapping le plus long ('double fracture mandibulaire') sera appliqué en PREMIER");
