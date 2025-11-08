// Test regex doigts
const text = "FRACTURE DE P1 DE D2 DE LA MAIN DROITE";

const regexDoigts = /\b([dD])([1-5])\b(?=\s*(?:de|du|mg|md|main|gauche|droite|fracture|amputation|ecrasement|arrachement))/g;

const transformed = text.replace(regexDoigts, (match, d, num) => {
    const doigts = ['', 'pouce', 'index', 'médius', 'annulaire', 'auriculaire'];
    console.log(`Match trouvé: "${match}" → doigt ${doigts[parseInt(num)]}`);
    return `doigt ${doigts[parseInt(num)]} `;
});

console.log('Original:', text);
console.log('Transformé:', transformed);
console.log('');
console.log('ANALYSE:');
console.log('- "D2" est bien suivi de "DE LA MAIN"');
console.log('- Le regex DEVRAIT matcher');
console.log('- Mais il ne transforme qu\'UNE fois avec le flag /g');
