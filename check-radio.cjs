const data = require('./data/nomenclature-static.json');

// Recherche actes radiologie
const radios = data.actes.filter(a => 
  a.libelle.toLowerCase().includes('radio') || 
  a.libelle.toLowerCase().includes('graph') ||
  a.libelle.toLowerCase().includes('cliché')
);

console.log('═══════════════════════════════════════');
console.log(`Actes radiologie/imagerie trouvés: ${radios.length}`);
console.log('═══════════════════════════════════════\n');

radios.slice(0, 20).forEach(a => {
  console.log(`${a.code}: ${a.libelle.substring(0, 70)}`);
});

console.log('\n═══════════════════════════════════════');
console.log('RECHERCHE "scanner" dans la base:');
console.log('═══════════════════════════════════════');

const scanner = data.actes.filter(a => 
  a.libelle.toLowerCase().includes('scanner') ||
  a.libelle.toLowerCase().includes('tomodensitom') ||
  a.libelle.toLowerCase().includes('tdm')
);

console.log(`Résultats: ${scanner.length} actes`);
if (scanner.length === 0) {
  console.log('\n⚠️ Aucun acte "scanner" trouvé dans la nomenclature.');
  console.log('💡 Le PDF source date probablement d\'avant l\'ère du scanner moderne.');
  console.log('💡 Cherchez plutôt: "radiographie", "cliché", "radio"');
}
