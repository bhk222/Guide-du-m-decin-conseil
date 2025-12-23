const jsonData = require('./data/nomenclature-static.json');
const data = jsonData.actes;

// Recherche actes B 30
const b30 = data.filter(a => a.lettreCle === 'B' && a.coefficient === 30);
console.log('═══════════════════════════════════════');
console.log(`Actes avec Lettre-clé B et Coefficient 30: ${b30.length}`);
console.log('═══════════════════════════════════════\n');

b30.slice(0, 10).forEach(a => {
  console.log(`${a.code} - ${a.libelle.substring(0, 50)}`);
  console.log(`  → Coef: ${a.coefficient} | Lettre: ${a.lettreCle} | Tarif: ${a.tarif} DA`);
  console.log('');
});

// Statistiques générales
console.log('\n═══════════════════════════════════════');
console.log('STATISTIQUES LETTRES-CLÉS:');
console.log('═══════════════════════════════════════');

const avecLettreCle = data.filter(a => a.lettreCle);
console.log(`Total actes avec lettre-clé: ${avecLettreCle.length}/${data.length}`);

const lettres = {};
avecLettreCle.forEach(a => {
  const key = `${a.lettreCle} ${a.coefficient}`;
  lettres[key] = (lettres[key] || 0) + 1;
});

const sortedLettres = Object.entries(lettres)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20);

console.log('\nTop 20 combinaisons lettre + coefficient:');
sortedLettres.forEach(([key, count]) => {
  console.log(`  ${key}: ${count} actes`);
});
