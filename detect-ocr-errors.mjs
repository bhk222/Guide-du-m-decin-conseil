import fs from 'fs';

const data = JSON.parse(fs.readFileSync('data/ngap-complete.json', 'utf-8'));

const errorPatterns = {
    // Chiffres dans les mots
    '0 dans mot': /[a-zéèêàâôû]0|0[a-zéèêàâôû]/gi,
    '1 dans mot': /[a-zéèêàâôû]1|1[a-zéèêàâôû]/gi,
    '2 dans mot': /[a-zéèêàâôû]2|2[a-zéèêàâôû]/gi,
    '8 dans mot': /[a-zéèêàâôû]8|8[a-zéèêàâôû]/gi,
    // Majuscules en milieu de mot
    'Majuscule milieu': /[a-z][A-Z][a-z]/g,
    // Caractères spéciaux étranges
    'Underscore': /_/g,
    'Point répété': /\.\s*\./g,
    // Patterns OCR spécifiques
    '!e': /!e\b/gi,
    'àT': /àT/g,
    'Fracture minuscule': /Fracture[sz]?\s+[a-z]/g,
};

const errorsFound = new Map();

data.actes.forEach(acte => {
    const errors = [];
    
    for (const [name, pattern] of Object.entries(errorPatterns)) {
        const matches = acte.libelle.match(pattern);
        if (matches) {
            errors.push({ type: name, matches: matches.slice(0, 3), count: matches.length });
        }
    }
    
    if (errors.length > 0) {
        errorsFound.set(acte.code, {
            libelle: acte.libelle,
            errors
        });
    }
});

console.log(`\n🔍 ANALYSE DES ERREURS OCR\n`);
console.log(`Total d'actes analysés: ${data.actes.length}`);
console.log(`Actes avec erreurs détectées: ${errorsFound.size}\n`);

console.log(`═══════════════════════════════════════════════════════════════\n`);

let count = 0;
for (const [code, info] of errorsFound) {
    if (count++ >= 50) {
        console.log(`\n... et ${errorsFound.size - 50} autres actes avec erreurs\n`);
        break;
    }
    
    console.log(`📄 CODE: ${code}`);
    console.log(`   Libellé: ${info.libelle.substring(0, 100)}...`);
    info.errors.forEach(err => {
        console.log(`   ❌ ${err.type}: ${err.matches.join(', ')} (${err.count} occurrence${err.count > 1 ? 's' : ''})`);
    });
    console.log('');
}

// Statistiques par type d'erreur
console.log(`\n📊 STATISTIQUES PAR TYPE D'ERREUR:\n`);
const statsByType = new Map();
for (const [code, info] of errorsFound) {
    info.errors.forEach(err => {
        if (!statsByType.has(err.type)) {
            statsByType.set(err.type, 0);
        }
        statsByType.set(err.type, statsByType.get(err.type) + err.count);
    });
}

[...statsByType.entries()]
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
        console.log(`   ${type}: ${count} occurrences`);
    });
