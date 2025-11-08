const input = "Amputation transcarpienne, plaies contuses multiples, fracture ouverte du radius distal, délabrement tendineux et cutané. Mobilité nulle du poignet, douleurs neuropathiques majeures";

console.log('═══════════════════════════════════════════════════════════════');
console.log('DEBUG: POURQUOI AMPUTATION TRANSCARPIENNE RATE ?');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log(`📝 INPUT: "${input}"\n`);

// Test règle experte amputation transcarpienne
const pattern = /amputation\s+(?:trans)?carpien/i;
const context = /main|poignet|carpe/i;

console.log('🔍 TEST RÈGLE EXPERTE "AMPUTATION TRANSCARPIENNE":');
console.log(`   Pattern /amputation\\s+(?:trans)?carpien/i:`);
console.log(`      Test: ${pattern.test(input)}`);
console.log(`      Match: ${input.match(pattern)}`);

console.log(`\n   Context /main|poignet|carpe/i:`);
console.log(`      Test: ${context.test(input)}`);
console.log(`      Match: ${input.match(context)}`);

console.log(`\n   ❌ PROBLÈME IDENTIFIÉ:`);
console.log(`      Pattern cherche "amputation transcarpien" (sans E final)`);
console.log(`      Texte contient "amputation transcarpienne" (AVEC E)`);
console.log(`      → Le (?:trans)? rend "trans" optionnel mais pas le E de "carpienne"`);

console.log('\n\n💡 SOLUTION:');
console.log('   Pattern corrigé: /amputation\\s+(?:trans)?carpien(?:ne)?/i');
console.log('   Le (?:ne)? rend optionnel le "ne" final (féminin)');

// Test pattern corrigé
const patternFixed = /amputation\s+(?:trans)?carpien(?:ne)?/i;
console.log(`\n   ✅ TEST PATTERN CORRIGÉ:`);
console.log(`      ${patternFixed.test(input) ? '✅ MATCH!' : '❌ NO MATCH'}`);
console.log(`      Match: ${input.match(patternFixed)}`);
