const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/nomenclature-complete.json', 'utf8'));
const actes = data.actes;

// Detect common OCR artifacts in libellés
const issues = [];
for (const a of actes) {
  const lib = a.libelle || '';
  const problems = [];
  
  if (/[•·~¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶¸¹º»¼½¾¿×÷ƒ]/.test(lib)) problems.push('special_chars');
  if (/\.{2,}/.test(lib)) problems.push('multiple_dots');
  if (/::/.test(lib)) problems.push('double_colons');
  if (/\d+\s*[BKRCEZ]\s*$/.test(lib)) problems.push('trailing_code');
  if (/[0-9]\s*$/.test(lib) && !/\)$/.test(lib)) problems.push('trailing_number');
  if (/[.,;:!]\s*[.,;:!]/.test(lib)) problems.push('double_punct');
  if (lib.includes('  ')) problems.push('double_space');
  if (/[~]/.test(lib)) problems.push('tilde');
  if (/[ÎÏÔ]/.test(lib) && lib.length > 5) problems.push('caps_accent');
  
  if (problems.length > 0) {
    issues.push({ code: a.code, libelle: lib.substring(0, 120), problems });
  }
}

console.log('Total acts:', actes.length);
console.log('Acts with possible issues:', issues.length);

// Count by problem type
const counts = {};
for (const i of issues) {
  for (const p of i.problems) {
    counts[p] = (counts[p] || 0) + 1;
  }
}
console.log('\nIssue types:');
Object.entries(counts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log('  ' + k + ': ' + v));

// Show ALL acts with their full libellé for inspection
console.log('\n=== ALL LIBELLES (sorted by code) ===');
const sorted = [...actes].sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }));
for (const a of sorted) {
  const lib = a.libelle || '';
  // Flag issues
  const flags = [];
  if (/\.{3,}/.test(lib)) flags.push('DOTS');
  if (/[•·~]/.test(lib)) flags.push('OCR');
  if (/\d+\s*[BKRCEZ]\s*$/.test(lib)) flags.push('TRAIL');
  if (/::/.test(lib)) flags.push('COLON');
  if (/[éèêëàâäùûüîïôöç]/.test(lib) === false && lib.length > 15) flags.push('NOACCENT');
  
  if (flags.length > 0) {
    console.log(a.code + ' | ' + flags.join(',') + ' | ' + lib.substring(0, 120));
  }
}
