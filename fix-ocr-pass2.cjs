const fs = require('fs');

const data = JSON.parse(fs.readFileSync('public/nomenclature-complete.json', 'utf8'));

// Comprehensive manual fixes for remaining garbled entries
const fixes = {
  '0025': "Avant-pied, tarse antérieur, une malléole",
  '0054': 'Injection sous-cutanée, intra-dermique',
  '0073': "Incision d'une collection volumineuse de toute cause sous anesthésie générale",
  '0092/2': "Si l'acte est pratiqué sur les parties découvertes de la tête, du cou ou des mains",
  '0142/4': "De l'interligne tibio-tarsienne, sous-astragalienne, médio-tarsienne ou de Lisfranc",
  '0143/2': "D'une artère carotide",
  '0145': 'Aortographie par ponction percutanée',
  '0146': "Opacification d'un territoire anatomique par injection intraveineuse simple",
  '0149/1': "1° Portant des deux côtés sur les artères cervico-encéphaliques avec au moins l'opacification des axes carotidiens et vertébraux",
  '0149/2': "2° Portant sur les artères des deux membres inférieurs ou des deux membres supérieurs",
  '0149/3': "3° Portant sur les veines des deux membres inférieurs ou des membres supérieurs",
  '0161': "Recherche de trichomonas par examen direct extemporané et coloration",
  '0172-2': "2° Ligature, cathétérisme, suture vasculaire - Vaisseaux du cou, face et fesse",
  '0172/3': "Rétablissement de la continuité artérielle ou veineuse, quelle que soit la technique, en cas de suppression définitive du tronc vasculaire principal, endartériectomie",
  '0184': "Grand évidement jugulo-maxillaire, carotidien, sous-maxillaire et sus-claviculaire",
  '0186': 'Plasmaphérèse',
  '0187': 'Cytophérèse',
  '0196': 'Suture nerveuse secondaire',
  '0198': 'Greffe nerveuse en un ou deux temps',
  '0201': 'Sympathectomie dorso-lombaire sus et sous-diaphragmatique',
  '0202': "Opération portant sur le nerf splanchnique, le ganglion aortico-rénal ou les nerfs de la moelle rénale",
  '0213': "Électroencéphalogramme, quel que soit le nombre de chaînes de l'appareil",
  '0234': "Neurinomes de l'angle ponto-cérébelleux",
  '0235': 'Tumeurs intra-ventriculaires',
  '0236': "Tumeurs et abcès cérébraux à l'exclusion des précédents",
  '0237': "Tumeurs de l'hypophyse, quel qu'en soit l'abord",
  '0238': "Tumeurs de l'orbite par voie intracrânienne",
};

let fixedCount = 0;
for (const acte of data.actes) {
  if (fixes[acte.code]) {
    if (acte.libelle !== fixes[acte.code]) {
      console.log(`FIX ${acte.code}: "${acte.libelle.substring(0, 50)}" → "${fixes[acte.code].substring(0, 50)}"`);
      acte.libelle = fixes[acte.code];
      fixedCount++;
    }
  }
}

console.log(`\nApplied: ${fixedCount} fixes`);

// Now do broad auto-clean on remaining acts (2nd pass with more patterns)
let autoFixed = 0;
for (const acte of data.actes) {
  let lib = acte.libelle;
  const orig = lib;
  
  // Remove trailing numbers like "5026", "3001", "2001", "10040" etc (leaked coefficients)
  lib = lib.replace(/\s+\d{2,5}\s*$/, '');
  
  // Remove " , " " patterns 
  lib = lib.replace(/\s*["'""'']+\s*/g, ' ').replace(/\s{2,}/g, ' ').trim();
  
  // Fix !e → le, I' → l'
  lib = lib.replace(/!e\b/g, 'le');
  lib = lib.replace(/\bI'/g, "l'");
  lib = lib.replace(/\bI /g, 'l ');
  
  // Fix common OCR: ΓÇö → -, OO → au
  lib = lib.replace(/[ΓÇó]+/g, '');
  
  // Remove trailing commas, semicolons, colons, dots
  lib = lib.replace(/[\s,;:.!'"']+$/, '');
  
  // Remove ;, , ,: patterns
  lib = lib.replace(/\s*[;,:\s]{3,}\s*/g, ', ');
  
  // Remove double quotes artifacts
  lib = lib.replace(/\s+"/g, ' ');
  lib = lib.replace(/"\s+/g, ' ');
  
  // Fix ￾ (replacement char)
  lib = lib.replace(/\ufffe/g, '');
  lib = lib.replace(/￾/g, '');
  
  // Clean double spaces
  lib = lib.replace(/\s{2,}/g, ' ');
  
  lib = lib.trim();
  
  if (lib !== orig && lib.length >= 3) {
    acte.libelle = lib;
    autoFixed++;
  }
}

console.log(`Auto-cleaned (pass 2): ${autoFixed}`);
console.log(`Total: ${fixedCount + autoFixed}`);

// Count remaining issues
let issues = 0;
const issuesList = [];
for (const a of data.actes) {
  const lib = a.libelle || '';
  // Check for various OCR artifacts
  if (/[•·~ΓÇó∩┐╛￾]/.test(lib) || /\.{3,}/.test(lib) || /\s{2,}/.test(lib) || /[!]/.test(lib)) {
    issues++;
    if (issues <= 20) issuesList.push(`${a.code} | ${lib.substring(0, 80)}`);
  }
}
console.log(`\nRemaining hard issues: ${issues}`);
issuesList.forEach(i => console.log('  ' + i));

fs.writeFileSync('public/nomenclature-complete.json', JSON.stringify(data, null, 2), 'utf8');
console.log('\nSaved.');
