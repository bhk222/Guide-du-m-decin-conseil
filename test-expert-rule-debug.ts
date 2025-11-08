// Debug expert rules pour fracture P1 D3 médius
const text = "fracture de P1 du D3 de la main droite avec sequelle douleureuse";

// Simulation de la transformation (abréviations)
let workingText = text;
workingText = workingText.replace(/\b([pP])1\b/gi, 'phalange proximale P1 ');
workingText = workingText.replace(/\b([dD])([1-5])\b(?=\s*(?:de|du|mg|md|main|gauche|droite|fracture|amputation|ecrasement|arrachement))/g, (match, d, num) => {
    const doigts = ['', 'pouce', 'index', 'médius', 'annulaire', 'auriculaire'];
    return `doigt ${doigts[parseInt(num)]} `;
});
workingText = workingText.replace(/\bs[eé]quelle\s+douleureuse/gi, 'raideur avec douleur ');

console.log('Text original:', text);
console.log('Text transformé:', workingText);
console.log('');

// Règle experte pour fracture P1 médius
const rule = {
    pattern: /fracture.*(?:p1|phalange\s+(?:proximale|prox)).*(?:m[eé]dius|d3)/i,
    context: /main|doigt/i,
    searchTerms: ["Raideur d'une articulation du médius"],
    priority: 999
};

console.log('=== TEST DE LA RÈGLE EXPERTE ===');
console.log('Pattern:', rule.pattern);
console.log('Context:', rule.context);
console.log('');

console.log('Pattern test:', rule.pattern.test(workingText));
console.log('Pattern match:', workingText.match(rule.pattern));
console.log('');

console.log('Context test:', rule.context.test(workingText));
console.log('Context match:', workingText.match(rule.context));
console.log('');

if (rule.pattern.test(workingText) && rule.context.test(workingText)) {
    console.log('✅ RÈGLE DEVRAIT S\'APPLIQUER!');
    console.log('SearchTerms:', rule.searchTerms);
} else {
    console.log('❌ La règle ne s\'applique PAS');
    if (!rule.pattern.test(workingText)) {
        console.log('   Raison: Pattern ne matche pas');
    }
    if (!rule.context.test(workingText)) {
        console.log('   Raison: Context ne matche pas');
    }
}
