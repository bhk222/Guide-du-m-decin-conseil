const text = "fracture plateaux tibiaux avec rupture LCA opérée raideur flexion 90 degrés instabilité résiduelle";

console.log('🔍 ANALYSE PATTERN MATCHING EXACT');
console.log(`Texte: "${text}"`);
console.log();

// Test pattern étape par étape
const pattern = /fracture.*plateaux.*tibiaux.*avec.*rupture.*LCA.*opérée/i;
console.log(`Pattern: ${pattern}`);
console.log(`Match: ${pattern.test(text)}`);

const context = /raideur.*flexion.*90.*degrés.*instabilité/i;
console.log(`Context: ${context}`);
console.log(`Context match: ${context.test(text)}`);

// Test avec des patterns plus simples
console.log('\n🔍 PATTERNS SIMPLIFIÉS:');
console.log(`"fracture plateaux tibiaux": ${/fracture.*plateaux.*tibiaux/i.test(text)}`);
console.log(`"avec rupture LCA": ${/avec.*rupture.*LCA/i.test(text)}`);
console.log(`"raideur flexion": ${/raideur.*flexion/i.test(text)}`);
console.log(`"instabilité": ${/instabilité/i.test(text)}`);

// Test version normalisée
const normalized = text.toLowerCase().replace(/[éèê]/g, 'e').replace(/[àâ]/g, 'a');
console.log(`\nTexte normalisé: "${normalized}"`);

const simplePattern = /fracture.*plateaux.*tibiaux.*avec.*rupture.*lca/i;
console.log(`Pattern simple match: ${simplePattern.test(normalized)}`);