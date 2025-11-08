const cas10 = "section tendons fléchisseurs médius avec impossibilité flexion active doigts raideur";

console.log('🔍 DEBUG CAS 10:');
console.log(`Input: "${cas10}"`);

// Test pattern séparément
const pattern = /section.*tendons.*fléchisseurs.*(?:médius|index|annulaire|doigt)/i;
const context = /impossibilité.*flexion|flexion.*active|raideur/i;

console.log(`\nPattern match: ${pattern.test(cas10)}`);
console.log(`Context match: ${context.test(cas10)}`);

// Test mots individuels
console.log(`Contient "section": ${cas10.includes('section')}`);
console.log(`Contient "tendons": ${cas10.includes('tendons')}`);
console.log(`Contient "fléchisseurs": ${cas10.includes('fléchisseurs')}`);
console.log(`Contient "médius": ${cas10.includes('médius')}`);
console.log(`Contient "impossibilité": ${cas10.includes('impossibilité')}`);
console.log(`Contient "flexion": ${cas10.includes('flexion')}`);
console.log(`Contient "active": ${cas10.includes('active')}`);
console.log(`Contient "raideur": ${cas10.includes('raideur')}`);