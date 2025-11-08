// Test des abréviations V3.2
const text = "fracture de P1 du D3 de la main droite avec sequelle douleureuse";

const medicalAbbreviations: [RegExp, string | ((substring: string, ...args: any[]) => string)][] = [
    [/\b([pP])1\b/gi, 'phalange proximale P1 '],
    [/\b([dD])([1-5])\b(?=\s*(?:de|du|mg|md|main|gauche|droite|fracture|amputation|ecrasement|arrachement))/g, (match, d, num) => {
        const doigts = ['', 'pouce', 'index', 'médius', 'annulaire', 'auriculaire'];
        return `doigt ${doigts[parseInt(num)]} `;
    }],
    [/\bs[eé]quelle\s+douleureuse/gi, 'raideur avec douleur ']
];

let processed = text;
for (const [pattern, replacement] of medicalAbbreviations) {
    if (typeof replacement === 'function') {
        processed = processed.replace(pattern, replacement);
    } else {
        processed = processed.replace(pattern, replacement);
    }
}

console.log('Original :', text);
console.log('Processed:', processed);
console.log('\nATTENDU: "fracture de phalange proximale P1 du doigt médius de la main droite avec raideur avec douleur"');
