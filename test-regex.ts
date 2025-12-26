const testString = "suite a un traumatisme sportif survenu le15 janvier2024 le3 eme doigt presente une attitude vicieuse caracteristique en boutonniere associant une flexion de l interphalangienne proximale (ipp) et une hyperextension de l interphalangienne distale (ipd)";

const pattern1 = /(?:doigt|(?:le\s*)?[1-5]\s*[eè]me\s*doigt|troisi[eè]me\s*doigt|index|m[eé]dius|annulaire|auriculaire).*(?:boutonnière|boutonniere)/i;
const pattern2 = /(?:boutonnière|boutonniere).*(?:doigt|(?:le\s*)?[1-5]\s*[eè]me|index|m[eé]dius|annulaire|auriculaire)/i;

const context1_old = /(?:ipp|interphalangienne\s+proximale).*(?:fl[eé]ch|fl[eé]x)/i;
const context1_new = /(?:ipp|interphalangienne.*proximale).*(?:fl[eé])/i;  // Plus permissif
const context1_new2 = /(?:fl[eé]).*(?:ipp|interphalangienne.*proximale)/i;  // Inversé

console.log('Test String:', testString);
console.log('\nPattern 1 match:', pattern1.test(testString));
console.log('Pattern 2 match:', pattern2.test(testString));
console.log('Context OLD match:', context1_old.test(testString));
console.log('Context NEW match:', context1_new.test(testString));
console.log('Context NEW2 (inversé) match:', context1_new2.test(testString));

// Test avec match pour voir ce qui est capturé
const match1 = testString.match(pattern1);
const match2 = testString.match(pattern2);
const contextMatch = testString.match(context1_new2);

console.log('\nPattern 1 capture:', match1 ? match1[0] : 'NO MATCH');
console.log('Pattern 2 capture:', match2 ? match2[0] : 'NO MATCH');
console.log('Context capture:', contextMatch ? contextMatch[0] : 'NO MATCH');

// Test simplifié
const simplePattern = /le3\s*eme\s*doigt.*boutonniere/i;
console.log('\nSimple pattern match:', simplePattern.test(testString));
