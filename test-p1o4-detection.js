// Test détection p1 o4

const testCases = [
    "FRACTURE P1 O4",
    "fracture p1 o4",
    "amputation p2 d5",
    "AMPUTATION P2 D5"
];

// Pattern actuel
const pattern1 = /(?:fracture|amputation|lesion|trauma|ecrasement|arrachement|consolidation|sequelle|raideur|ankylose)\s+(?:de\s+)?(?:la\s+)?p([1-3])\s+([oO])([1-5])\b/gi;

const orteils = ['', 'hallux', 'deuxième orteil', 'troisième orteil', 'quatrième orteil', 'cinquième orteil'];
const phalanges = { '1': 'première phalange', '2': 'deuxième phalange', '3': 'troisième phalange' };

console.log("=== TEST DÉTECTION P1 O4 ===\n");

testCases.forEach(test => {
    console.log(`Input: "${test}"`);
    
    const match = pattern1.exec(test);
    if (match) {
        const [fullMatch, phalange, o, num] = match;
        const result = `fracture ${phalanges[phalange]} orteil ${orteils[parseInt(num)]}`;
        console.log(`  ✅ Match: "${fullMatch}"`);
        console.log(`  → Phalange: ${phalange}, O: ${o}, Num: ${num}`);
        console.log(`  → Résultat: "${result}"`);
    } else {
        console.log(`  ❌ Aucun match`);
    }
    
    // Reset regex
    pattern1.lastIndex = 0;
    console.log('');
});
