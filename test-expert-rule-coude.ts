/**
 * 🧪 TEST: Pourquoi la règle "coude" s'active pour un texte parlant de "poignet" et "épaule" ?
 */

const testText = "fracture déplacée du radius distal gauche, associée à une déchirure partielle des tendons extenseurs du poignet ainsi qu'une élongation musculaire de l'épaule gauche. L'évolution a été marquée par des douleurs résiduelles du poignet, une limitation de la mobilité articulaire, une diminution de la force de préhension";

const normalize = (str: string) => {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/['']/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
};

const normalized = normalize(testText);

console.log('📝 Texte normalisé:');
console.log(normalized);
console.log('');

// Règle "Raideur + déficit force coude" (ligne 7521-7527)
const pattern = /(?:raideur|limitation).*coude/i;
const context = /force.*(?:diminu|réduit|faible)|déficit.*force/i;

console.log('🔍 Règle "Raideur + déficit force coude":');
console.log('   Pattern /(?:raideur|limitation).*coude/i:', pattern.test(normalized) ? '✅ MATCH' : '❌ NO MATCH');
console.log('   Context /force.*(?:diminu|réduit|faible)|déficit.*force/i:', context.test(normalized) ? '✅ MATCH' : '❌ NO MATCH');
console.log('');

// Vérifications individuelles
console.log('📊 Analyse détaillée:');
console.log('   Contient "limitation":', /limitation/i.test(normalized) ? '✅ OUI' : '❌ NON');
console.log('   Contient "coude":', /coude/i.test(normalized) ? '✅ OUI' : '❌ NON');
console.log('   Contient "poignet":', /poignet/i.test(normalized) ? '✅ OUI' : '❌ NON');
console.log('   Contient "epaule":', /epaule/i.test(normalized) ? '✅ OUI' : '❌ NON');
console.log('   Contient "diminution":', /diminution/i.test(normalized) ? '✅ OUI' : '❌ NON');
console.log('   Contient "force":', /force/i.test(normalized) ? '✅ OUI' : '❌ NON');
console.log('');

// Test pattern complet
const fullMatch = normalized.match(pattern);
console.log('🎯 Match pattern complet:', fullMatch ? fullMatch[0] : '❌ NULL');
