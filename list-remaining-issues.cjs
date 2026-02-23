const fs = require('fs');

const data = JSON.parse(fs.readFileSync('public/nomenclature-complete.json', 'utf8'));

// Find and display ALL remaining problematic entries
let issues = [];
for (const a of data.actes) {
  const lib = a.libelle || '';
  if (/[•·~ΓÇó∩┐╛￾]/.test(lib) || /\.{3,}/.test(lib) || /\s{2,}/.test(lib) || /[!]/.test(lib)) {
    issues.push({ code: a.code, libelle: lib, lettreCle: a.lettreCle, coeff: a.coefficient });
  }
}

// Print them all
for (const iss of issues) {
  console.log(`${iss.code}|${iss.lettreCle}|${iss.coeff}|${iss.libelle}`);
}
console.log(`\nTotal: ${issues.length}`);
