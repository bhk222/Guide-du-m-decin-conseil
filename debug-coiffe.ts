const cas3 = "rupture coiffe des rotateurs complète avec impossibilité élévation active testing 0/5 amyotrophie supra épineux";

console.log('🔍 DEBUG CAS 3:');
console.log(`Input: "${cas3}"`);

// Test pattern séparément
const pattern = /rupture.*coiffe.*rotateurs.*complète|coiffe.*rotateurs.*rupture.*complète/i;
const context = /impossibilité|élévation|testing|amyotrophie|supra.*épineux/i;

console.log(`\nPattern match: ${pattern.test(cas3)}`);
console.log(`Context match: ${context.test(cas3)}`);

// Test pattern alternatif
const pattern2 = /rupture.*coiffe.*rotateurs.*complète/i;
console.log(`\nPattern spécifique: ${pattern2.test(cas3)}`);

// Test mots-clés individuels
console.log(`Contient "rupture": ${cas3.includes('rupture')}`);
console.log(`Contient "coiffe": ${cas3.includes('coiffe')}`);  
console.log(`Contient "rotateurs": ${cas3.includes('rotateurs')}`);
console.log(`Contient "complète": ${cas3.includes('complète')}`);
console.log(`Contient "impossibilité": ${cas3.includes('impossibilité')}`);
console.log(`Contient "amyotrophie": ${cas3.includes('amyotrophie')}`);
