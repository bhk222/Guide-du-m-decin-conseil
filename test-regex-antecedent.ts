const text = `Homme de 50 ans, manutentionnaire, victime d'un accident de travail par chute avec traumatisme du genou droit. Le patient présente une gonalgie chronique antérieure connue, traitée épisodiquement avant l'accident.`;

const pattern1 = /(?:pr[eé]sente|pr[eé]sentait|souffre|souffrait)\s+(?:une?|des?|d'une?)\s+([a-zàéèêëïôù\s]+?)\s+(?:chronique|ancienne?)\s+(?:ant[eé]rieure?|pr[eé]existante?)\s+connue?/gi;

const pattern2 = /([a-zàéèêëïôù\s]+?)\s+(?:chronique|ancienne?)\s+(?:ant[eé]rieure?|pr[eé]existante?)\s+connue?,?\s+trait[eé]e?\s+(?:[eé]pisodiquement\s+)?avant\s+l'?accident/gi;

console.log('\n🧪 TEST PATTERNS ANTÉCÉDENTS\n');
console.log('Texte:', text);
console.log('\n---\n');

const match1 = pattern1.exec(text);
console.log('Pattern 1:', pattern1);
console.log('Match 1:', match1);
if (match1) {
    console.log('  ✅ Groupe capturé:', match1[1]);
}

console.log('\n---\n');

const match2 = pattern2.exec(text);
console.log('Pattern 2:', pattern2);
console.log('Match 2:', match2);
if (match2) {
    console.log('  ✅ Groupe capturé:', match2[1]);
}
