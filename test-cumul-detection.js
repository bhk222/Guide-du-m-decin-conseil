// Test détection cumul fractures multiples même os

const normalize = (text) => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[-']/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
};

const text1 = "fracture trochanter et diaphyse femorale";
const text2 = "fracture du pilon du tibia et fracture diaphysaire du péroné";
const text3 = "fracture col femoral";
const text4 = "fracture trochanter, diaphyse et condyle femoral";

const testCases = [
    { text: text1, expected: true },
    { text: text2, expected: true },
    { text: text3, expected: false },
    { text: text4, expected: true }
];

console.log("=== TEST DÉTECTION CUMUL FRACTURES MULTIPLES ===\n");

testCases.forEach(({ text, expected }) => {
    const normalized = normalize(text);
    
    // Pattern de détection (UPDATED - accepte "et" OU ",")
    const multipleFracturesSameBone = /fracture.*(?:et|,).*fracture|(?:trochanter|col|diaphyse|pilon|plateau).*(?:et|,).*(?:diaphyse|pilon|plateau|trochanter|col)/i.test(normalized);
    
    const status = multipleFracturesSameBone === expected ? "✅" : "❌";
    console.log(`${status} "${text}"`);
    console.log(`   Détecté: ${multipleFracturesSameBone}, Attendu: ${expected}`);
    console.log(`   Normalisé: ${normalized}`);
    console.log("");
});

console.log("=== RÉSULTAT ATTENDU ===");
console.log("✅ 'fracture trochanter et diaphyse femorale' → cumul détecté");
console.log("✅ 'fracture du pilon du tibia et fracture diaphysaire du péroné' → cumul détecté");
console.log("✅ 'fracture col femoral' → PAS de cumul (une seule fracture)");
console.log("✅ 'fracture trochanter, diaphyse et condyle femoral' → cumul détecté");
