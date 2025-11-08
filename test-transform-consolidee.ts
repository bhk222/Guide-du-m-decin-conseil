// Test transformation complète "consolidée avec raideur"
const text = "fracture P1 D2 consolidée avec raideur";

// Abréviations dans l'ordre du code
const abbrevs: [RegExp, string | ((s: string, ...a: any[]) => string)][] = [
    // Phalanges
    [/\b([pP])1\b/gi, 'phalange proximale P1 '],
    // Doigts
    [/\b([dD])([1-5])\b(?=\s*(?:de|du|mg|md|main|gauche|droite|fracture|amputation))/gi, (match, d, num) => {
        const doigts = ['', 'pouce', 'index', 'médius', 'annulaire', 'auriculaire'];
        return `doigt ${doigts[parseInt(num)]} `;
    }],
    // Consolidation
    [/\bcons\b(?!\s*$)/gi, 'consolidation '],
    // Séquelles
    [/\bs[eé]quelle\s+douleureuse/gi, 'raideur avec douleur ']
];

let processed = text;
console.log('0. Original:', processed);

for (const [pattern, replacement] of abbrevs) {
    const before = processed;
    if (typeof replacement === 'function') {
        processed = processed.replace(pattern, replacement);
    } else {
        processed = processed.replace(pattern, replacement);
    }
    if (before !== processed) {
        console.log(`Transformation par ${pattern}:`, processed);
    }
}

console.log('\nFinal:', processed);
console.log('\n=== ANALYSE ===');
console.log('Attendu: "fracture phalange proximale P1 doigt index consolidée avec raideur"');
console.log('Si P1 et D2 transformés → Expert rule devrait matcher');
console.log('Mais "consolidée" reste intact → Peut interférer avec pattern matching');
