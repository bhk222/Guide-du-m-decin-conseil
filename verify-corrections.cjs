const data = require('./data/nomenclature-static.json');

const testCodes = ['1548', '1406', '1401', '1408', '1426', '0049/1', '0112/1', '0112/2'];

console.log('═══════════════════════════════════════');
console.log('VÉRIFICATION DES CORRECTIONS OCR');
console.log('═══════════════════════════════════════\n');

testCodes.forEach(code => {
  const a = data.actes.find(x => x.code === code);
  if (a) {
    console.log(`✓ ${a.code}`);
    console.log(`  ${a.libelle}`);
    console.log('');
  } else {
    console.log(`✗ ${code} - NON TROUVÉ\n`);
  }
});
