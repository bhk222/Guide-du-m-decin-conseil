const fs = require('fs');

const data = JSON.parse(fs.readFileSync('public/nomenclature-complete.json', 'utf8'));

// Fix the 8 remaining flagged entries
const finalFixes = {
  '0173/1': '1° Rétablissement de la continuité artérielle - Vaisseaux principaux des membres',
  '0174/1': '1° Traitement chirurgical des anévrysmes artériels - Vaisseaux principaux des membres',
  '0174/2': '2° Traitement chirurgical des anévrysmes artériels - Vaisseaux du cou, face et fesse',
  '0619': "Ablation de l'omoplate",
  '0711': "Traitement de l'atrésie oesophagienne chez le nouveau-né",
  '0712/1': 'Sans greffe',
  'X1-18': 'Consultation spécialisée au cabinet - CS x 1 ou CPSY',
  'AUTO-1038': 'Les mycobactéries: bactérie aérobie',
  'B100-1052': 'Virus respiratoire syncytial',
  'B40-1071': "Recherche d'ankylostomes",
  'AUTO-1073': "Examen direct et éventuellement après enrichissement (autres que trichomonas ou champignons qui font l'objet de cotation particulière)",
  'AUTO-1069': 'Examen extemporané et après coloration',
  'B50-1062': "Identification d'un champignon autre que Candida albicans",
  'AUTO-1063': 'Culture de dermatophytes, aspergillus, candida, torulopsis, etc.',
  'AUTO-1066': 'M.I.F. et/ou noir chlorazol et/ou hématoxyline',
  'B200-1055': 'Poliomyélite - isolé en culture cellulaire',
  'B100-1057': 'Isolé en culture cellulaire',
  'AUTO-19': 'Actes de traitement des traumatismes',
  'AUTO-21': "Fracture associée de l'autre styloïde, diaphyse ou extrémité supérieure",
  '0174-1': '1° Traitement chirurgical des anévrysmes - Vaisseaux principaux des membres',
  // More commonly misspelled entries discovered
  '0061': "Hyposensibilisation spécifique pratiquée à l'aide du vaccin",
  '0172/1': '1° Ligature, cathétérisme, suture vasculaire - Vaisseaux principaux des membres',
  '0172/2': '2° Ligature, cathétérisme, suture vasculaire - Vaisseaux du cou, face et fesse',
};

let fixedCount = 0;
for (const acte of data.actes) {
  if (finalFixes[acte.code]) {
    if (acte.libelle !== finalFixes[acte.code]) {
      console.log(`FIX ${acte.code}: "${acte.libelle.substring(0, 60)}" → "${finalFixes[acte.code].substring(0, 60)}"`);
      acte.libelle = finalFixes[acte.code];
      fixedCount++;
    }
  }
}

console.log(`\n${fixedCount} additional fixes applied.`);

// Now scan for any remaining garbage
let issues = 0;
for (const a of data.actes) {
  const lib = a.libelle || '';
  const hasGarbage = /[•·~ΓÇó∩┐╛]/.test(lib)
    || /\.{3,}/.test(lib)
    || /\s{2,}/.test(lib)
    || /[!]/.test(lib)
    || /["]/.test(lib)
    || /\d+\s*$/.test(lib) && lib.length > 5
    || lib.length < 3;
  if (hasGarbage) {
    issues++;
    if (issues <= 30) {
      console.log(`STILL BAD: ${a.code} | ${lib.substring(0, 80)}`);
    }
  }
}
console.log(`\nTotal potentially bad entries remaining: ${issues}`);

fs.writeFileSync('public/nomenclature-complete.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Saved.');
