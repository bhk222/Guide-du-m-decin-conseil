const data = require('./data/nomenclature-static.json');

console.log('═══════════════════════════════════════');
console.log('VÉRIFICATION DES CORRECTIONS');
console.log('═══════════════════════════════════════\n');

const testCases = [
  { code: '0452', contains: 'endobuccale', shouldNotContain: 'en do-' },
  { code: '0452', contains: 'fistules', shouldNotContain: 'fi stules' },
];

let allGood = true;

testCases.forEach(test => {
  const acte = data.actes.find(a => a.code === test.code);
  if (!acte) {
    console.log(`✗ Code ${test.code} non trouvé`);
    allGood = false;
    return;
  }
  
  const libelle = acte.libelle.toLowerCase();
  
  if (test.contains && !libelle.includes(test.contains.toLowerCase())) {
    console.log(`✗ ${test.code}: Ne contient pas "${test.contains}"`);
    console.log(`  Libellé: ${acte.libelle}`);
    allGood = false;
  } else if (test.contains) {
    console.log(`✓ ${test.code}: Contient "${test.contains}"`);
  }
  
  if (test.shouldNotContain && libelle.includes(test.shouldNotContain.toLowerCase())) {
    console.log(`✗ ${test.code}: Contient encore "${test.shouldNotContain}"`);
    console.log(`  Libellé: ${acte.libelle}`);
    allGood = false;
  } else if (test.shouldNotContain) {
    console.log(`✓ ${test.code}: Ne contient plus "${test.shouldNotContain}"`);
  }
});

console.log('\n═══════════════════════════════════════');
console.log('AUTRES ERREURS POTENTIELLES:');
console.log('═══════════════════════════════════════\n');

const errorsFound = data.actes.filter(a => {
  const lib = a.libelle;
  return lib.includes(' en do-') || 
         lib.includes('fi stul') ||
         lib.includes('consult ation') ||
         lib.includes('qU\'') ||
         lib.includes('dû ') ||
         lib.includes('du\'') ||
         lib.includes('profesalonnel') ||
         lib.match(/[a-z] [a-z]{1,2}tion/) ||
         lib.match(/[a-z] [a-z]{1,2}sie/);
});

if (errorsFound.length > 0) {
  console.log(`⚠️ ${errorsFound.length} actes avec erreurs potentielles:`);
  errorsFound.slice(0, 10).forEach(a => {
    console.log(`  ${a.code}: ${a.libelle.substring(0, 70)}`);
  });
} else {
  console.log('✅ Aucune erreur détectée dans les patterns courants');
}

console.log('\n═══════════════════════════════════════');
if (allGood && errorsFound.length === 0) {
  console.log('✅ TOUTES LES CORRECTIONS VALIDÉES !');
} else {
  console.log('⚠️ Des corrections supplémentaires sont nécessaires');
}
console.log('═══════════════════════════════════════');
