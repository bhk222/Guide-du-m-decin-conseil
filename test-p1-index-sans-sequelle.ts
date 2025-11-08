// Test debug expert rule P1 index
const text = "FRACTURE DE P1 DE D2 DE LA MAIN DROITE";

// Simulation transformations (comme dans le code)
const medicalAbbreviations: [RegExp, string | ((substring: string, ...args: any[]) => string)][] = [
    [/\b([pP])1\b/gi, 'phalange proximale P1 '],
    [/\b([dD])([1-5])\b(?=\s*(?:de|du|mg|md|main|gauche|droite|fracture|amputation|ecrasement|arrachement))/gi, (match, d, num) => {
        const doigts = ['', 'pouce', 'index', 'médius', 'annulaire', 'auriculaire'];
        return `doigt ${doigts[parseInt(num)]} `;
    }]
];

let transformed = text;
for (const [pattern, replacement] of medicalAbbreviations) {
    if (typeof replacement === 'function') {
        transformed = transformed.replace(pattern, replacement);
    } else {
        transformed = transformed.replace(pattern, replacement);
    }
}

console.log('Original:', text);
console.log('Transformé:', transformed);
console.log('');

// Expert rule P1 index
const rule = {
    pattern: /fracture.*(?:p1|phalange\s+(?:proximale|prox)).*(?:index|d2)/i,
    context: /main|doigt/i,
    searchTerms: ["Raideur d'une articulation de l'index"],
    priority: 999
};

console.log('=== EXPERT RULE P1 INDEX ===');
console.log('Pattern test:', rule.pattern.test(transformed));
console.log('Pattern match:', transformed.match(rule.pattern)?.[0]);
console.log('');
console.log('Context test:', rule.context.test(transformed));
console.log('Context match:', transformed.match(rule.context)?.[0]);
console.log('');

if (rule.pattern.test(transformed) && rule.context.test(transformed)) {
    console.log('✅ RÈGLE DEVRAIT S\'APPLIQUER');
    console.log('SearchTerm:', rule.searchTerms[0]);
} else {
    console.log('❌ Règle ne s\'applique PAS');
    if (!rule.pattern.test(transformed)) console.log('   → Pattern ne matche pas');
    if (!rule.context.test(transformed)) console.log('   → Context ne matche pas');
}

console.log('\n=== PROBLÈME MÉDICO-LÉGAL ===');
console.log('Une simple "fracture P1 index" SANS mention de séquelle ne devrait donner AUCUN IPP.');
console.log('Le barème distingue:');
console.log('  1. Fracture consolidée sans séquelle → 0% (guérison)');
console.log('  2. Fracture AVEC raideur résiduelle → 2-5% IPP');
console.log('  3. Fracture AVEC ankylose → 15% IPP');
console.log('  4. Amputation totale → 15% IPP');
console.log('');
console.log('❓ L\'utilisateur n\'a PAS mentionné de séquelle.');
console.log('💡 Le système devrait demander: "Quelles sont les séquelles ?"');
