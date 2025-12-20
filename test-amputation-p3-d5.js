// Test debug amputation P3 D5
console.log('🔍 TEST AMPUTATION P3 D5\n');

const input = "amputation p3 d5";
console.log('Input:', input);

// Étape 1: Transformation
let transformed = input;

// Transformation 1: d5 -> doigt auriculaire
transformed = transformed.replace(/\b([dD])([1-5])\b(?=\s*(?:de|du|mg|md|main|gauche|droite|fracture|amputation|ecrasement|arrachement|consolid|avec|raideur|ankylose|douleur|séquelle))/gi, (match, d, num) => {
    const doigts = ['', 'pouce', 'index', 'médius', 'annulaire', 'auriculaire'];
    return `${d.toLowerCase() === 'd' ? 'doigt' : 'Doigt'} ${doigts[parseInt(num)]} `;
});

console.log('Après transformation D5:', transformed);

// Transformation 2: amputation p3 d5 -> amputation troisième phalange doigt auriculaire
transformed = transformed.replace(/(?:fracture|amputation|lesion|trauma|ecrasement|arrachement|consolidation|sequelle|raideur|ankylose)\s+(?:de\s+)?(?:la\s+)?p([1-3])\s+([dD])([1-5])\b/gi, (match, phalange, d, num) => {
    const doigts = ['', 'pouce', 'index', 'médius', 'annulaire', 'auriculaire'];
    const phalanges = { '1': 'première phalange', '2': 'deuxième phalange', '3': 'troisième phalange' };
    const action = match.toLowerCase().startsWith('amputation') ? 'amputation' : 'fracture';
    return `${action} ${phalanges[phalange]} doigt ${doigts[parseInt(num)]} `;
});

console.log('Après transformation P3:', transformed);

// Étape 2: Test pattern règle experte
const pattern = /(?:amputation|perte).*(?:p3|troisi[eè]me\s+phalange|3[eè]me\s+phalange|phalange\s+(?:distale|terminale)|phalangette).*(?:auriculaire|d5)(?!\s*(?:et|avec|p2))/i;
const context = /doigt|main/i;

console.log('\n🎯 Test règle experte P3 D5:');
console.log('Pattern test:', pattern.test(transformed));
console.log('Context test:', context.test(transformed));

if (pattern.test(transformed) && context.test(transformed)) {
    console.log('✅ RÈGLE EXPERTE MATCHED!');
    console.log('→ Devrait retourner: "Perte de la 3ème phalange de l\'auriculaire (Main Dominante)"');
    console.log('→ IPP: 4%');
} else {
    console.log('❌ RÈGLE EXPERTE NE MATCHE PAS');
    console.log('Pattern match details:', transformed.match(pattern));
}
