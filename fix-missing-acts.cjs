const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/nomenclature-complete.json', 'utf8'));
const actes = data.actes;

let added = 0, fixed = 0, removed = 0;

function addAct(code, libelle, lettre, coef, categorie) {
  if (!actes.find(a => a.code === code)) {
    actes.push({ code, libelle, lettreCle: lettre, coefficient: coef, tarif: coef * 30, categorie, codeNGAP: lettre + ' ' + coef });
    console.log('ADDED:', code, '-', libelle, '(' + lettre + ' ' + coef + ')');
    added++;
  } else {
    console.log('SKIP (exists):', code);
  }
}

function fixAct(code, fields) {
  const act = actes.find(a => a.code === code);
  if (act) {
    Object.assign(act, fields);
    console.log('FIXED:', code, '-', Object.keys(fields).join(', '));
    fixed++;
  } else {
    console.log('NOT FOUND for fix:', code);
  }
}

// ===== 1. FIX 1695: Was wrongly set as Parathormone, PDF says Prolactine =====
fixAct('1695', { libelle: 'Prolactine', lettreCle: 'B', coefficient: 70, tarif: 2100, categorie: 'Biologie', codeNGAP: 'B 70' });

// ===== 2. FIX duplicate 1107: One is real (psychiatric test B12), the other should be 1707 =====
const idx1107dup = actes.findIndex(a => a.code === '1107' && a.libelle.includes('Solvant'));
if (idx1107dup >= 0) {
  actes.splice(idx1107dup, 1);
  console.log('REMOVED: duplicate 1107 (Solvants)');
  removed++;
}
fixAct('1107', { libelle: 'Test du monde de Buhler', lettreCle: 'B', coefficient: 12, tarif: 360, categorie: 'Psychiatrie', codeNGAP: 'B 12' });
addAct('1707', 'Solvants (Benzène, Phénol, Trichloréthylène, Formaldéhyde, Chloroforme)', 'B', 65, 'Biologie');

// ===== 3. FIX 1118: In DB as Toxique domestique -> should be 1718; real 1118 = certificat internement =====
const idx1118 = actes.findIndex(a => a.code === '1118' && a.libelle.includes('Toxique'));
if (idx1118 >= 0) {
  actes.splice(idx1118, 1);
  console.log('REMOVED: wrong 1118 (Toxique domestique -> should be 1718)');
  removed++;
}
addAct('1118', "Délivrance à domicile d'un certificat d'internement", 'K', 5, 'Psychiatrie');
addAct('1718', 'Toxique domestique (Naphtalène, etc.)', 'B', 30, 'Biologie');

// ===== 4. ADD 0022/2 - Humérus fracture =====
addAct('0022/2', "Humérus - Diaphyse, extrémité supérieure ou supra-condylienne de l'extrémité inférieure", 'K', 80, 'Chirurgie');

// ===== 5. ADD 0049/2 (reference note for complex wounds) =====
addAct('0049/2', "Pour les actes chirurgicaux nécessités par le traitement des lésions des viscères, des artères ou des nerfs, voir les chapitres appropriés", 'K', 0, 'Chirurgie');

// ===== 6. ADD 0545/2 (dentistry) =====
addAct('0545/2', "Les suivants, sur le même appareil", 'E', 5, 'Dentaire');

// ===== 7. FIX 0137 (empty libelle) -> should be 0137/4 =====
const idx0137 = actes.findIndex(a => a.code === '0137' && (!a.libelle || a.libelle.trim().length < 3));
if (idx0137 >= 0) {
  actes.splice(idx0137, 1);
  console.log('REMOVED: empty 0137');
  removed++;
}
addAct('0137/4', 'Hanche, bassin', 'K', 100, 'Chirurgie');

// ===== 8-11. ADD 1709 sub-codes (medication dosages) =====
addAct('1709/2', 'Antidépresseurs Tricycliques', 'B', 70, 'Biologie');
addAct('1709/6', 'Phénitoïne', 'B', 70, 'Biologie');
addAct('1709/7', 'Phénobarbital', 'B', 70, 'Biologie');
addAct('1709/8', 'Quinidine', 'B', 70, 'Biologie');

// ===== 12. FIX 1709/9 (garbled libelle) =====
fixAct('1709/9', { libelle: 'Théophylline', lettreCle: 'B', coefficient: 70, tarif: 2100, categorie: 'Biologie', codeNGAP: 'B 70' });

// ===== 13. FIX 1713 (was merged with 1714 by OCR) =====
fixAct('1713', { libelle: 'Solvants', lettreCle: 'B', coefficient: 65, tarif: 1950, categorie: 'Biologie', codeNGAP: 'B 65' });

// ===== 14-15. ADD 1714, 1715 (split from 1713 OCR merge) =====
addAct('1714', 'Fluorurie', 'B', 40, 'Biologie');
addAct('1715', 'Stupéfiants', 'B', 10, 'Biologie');

// ===== 16-17. ADD 1711/1 and 1716/1 =====
addAct('1711/1', 'Recherche de médicaments (urines)', 'B', 20, 'Biologie');
addAct('1716/1', 'Recherche de porphyrines (urines)', 'B', 10, 'Biologie');

// ===== 18. FIX 1702 (coef was 0, should be B 50) =====
fixAct('1702', { libelle: 'Alcool (méthanol, éthanol)', lettreCle: 'B', coefficient: 50, tarif: 1500, categorie: 'Biologie', codeNGAP: 'B 50' });

// ===== 19. FIX 1721 (lettre K -> B for toxicology) =====
fixAct('1721', { libelle: 'Arsenic, cyanure (identification)', lettreCle: 'B', coefficient: 40, tarif: 1200, categorie: 'Biologie', codeNGAP: 'B 40' });

// ===== 20. ADD 0138/1 and 0138/2 (Arthrolyse, synovectomie) =====
addAct('0138/1', 'Arthrolyse, synovectomie, réintervention pour excision tissulaire - coude, épaule, genou', 'K', 80, 'Chirurgie');
addAct('0138/2', 'Arthrolyse, synovectomie, réintervention pour excision tissulaire - hanche', 'K', 100, 'Chirurgie');

// ===== ALSO: Clean up OCR artifacts in various libellés =====
// Fix 0545/1
const a0545_1 = actes.find(a => a.code === '0545/1');
if (a0545_1) {
  a0545_1.libelle = "Premier élément";
  a0545_1.coefficient = 10;
  a0545_1.tarif = 300;
  a0545_1.codeNGAP = "E 10";
  console.log('FIXED: 0545/1 libelle + coef');
  fixed++;
}

// Fix 0022/3 coefficient (10035 -> should be 100)
const a0022_3 = actes.find(a => a.code === '0022/3');
if (a0022_3 && a0022_3.coefficient > 1000) {
  a0022_3.coefficient = 100;
  a0022_3.tarif = 3000;
  a0022_3.libelle = "Fracture articulaire de la palette humérale";
  a0022_3.codeNGAP = "K 100";
  console.log('FIXED: 0022/3 coefficient 10035 -> 100');
  fixed++;
}

console.log('\n=== SUMMARY ===');
console.log('Added:', added);
console.log('Fixed:', fixed);
console.log('Removed:', removed);
console.log('Total acts now:', actes.length);

// Save
data.actes = actes;
fs.writeFileSync('public/nomenclature-complete.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Saved!');
