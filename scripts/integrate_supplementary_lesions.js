import fs from 'fs';
import path from 'path';

console.log("🔍 Intégration des lésions supplémentaires dans disabilityRates.ts\n");

// Lire le fichier des lésions supplémentaires
const supplementaryPath = path.join(process.cwd(), 'data', 'lesions_supplementaires.txt');
const supplementaryContent = fs.readFileSync(supplementaryPath, 'utf-8');

// Lire le fichier disabilityRates.ts actuel
const disabilityRatesPath = path.join(process.cwd(), 'data', 'disabilityRates.ts');
const currentContent = fs.readFileSync(disabilityRatesPath, 'utf-8');

// Compter les lésions actuelles
const currentInjuryMatches = currentContent.match(/{\s*name:\s*"[^"]+",\s*rate:/g);
const currentCount = currentInjuryMatches ? currentInjuryMatches.length : 0;

console.log(`📊 Base de données actuelle : ${currentCount} lésions`);

// Extraire les sections du fichier supplémentaire
const sections = [];
const sectionRegex = /\/\/ SECTION: ([^\n]+)\n{[\s\S]*?name: "([^"]+)",[\s\S]*?subcategories: \[[\s\S]*?\]\s*},/g;

let match;
let sectionCount = 0;
let totalNewInjuries = 0;

while ((match = sectionRegex.exec(supplementaryContent)) !== null) {
  sectionCount++;
  const sectionName = match[2];
  const fullSectionText = match[0];
  
  // Compter les injuries dans cette section
  const injuryMatches = fullSectionText.match(/{\s*name:\s*"[^"]+",\s*rate:/g);
  const injuryCount = injuryMatches ? injuryMatches.length : 0;
  
  sections.push({
    name: sectionName,
    count: injuryCount,
    content: fullSectionText
  });
  
  totalNewInjuries += injuryCount;
  
  console.log(`  ✅ Section: "${sectionName}" - ${injuryCount} lésions`);
}

console.log(`\n📈 Total nouvelles lésions à ajouter : ${totalNewInjuries}`);
console.log(`📈 Total après intégration : ${currentCount + totalNewInjuries} lésions\n`);

// Vérifier les doublons potentiels
console.log("🔍 Vérification des doublons...");
const supplementaryInjuryNames = [];
const injuryNameRegex = /name:\s*"([^"]+)",\s*rate:/g;

let nameMatch;
while ((nameMatch = injuryNameRegex.exec(supplementaryContent)) !== null) {
  supplementaryInjuryNames.push(nameMatch[1].toLowerCase().trim());
}

const duplicates = [];
for (const newName of supplementaryInjuryNames) {
  // Normaliser pour la comparaison
  const normalized = newName.replace(/[éèêë]/g, 'e').replace(/[àâä]/g, 'a');
  
  if (currentContent.toLowerCase().includes(normalized.substring(0, 30))) {
    duplicates.push(newName);
  }
}

if (duplicates.length > 0) {
  console.log(`⚠️  ${duplicates.length} doublons potentiels détectés :`);
  duplicates.forEach(d => console.log(`     - ${d}`));
} else {
  console.log("✅ Aucun doublon détecté");
}

// Créer le code TypeScript à insérer
console.log("\n📝 Génération du code TypeScript...");

let insertionCode = "\n  // ========================================\n";
insertionCode += "  // LÉSIONS SUPPLÉMENTAIRES - BARÈME COMPLET AT-MP\n";
insertionCode += "  // Ajouté automatiquement le " + new Date().toLocaleDateString('fr-FR') + "\n";
insertionCode += "  // ========================================\n\n";

sections.forEach(section => {
  insertionCode += section.content.replace(/^/gm, '  ') + "\n\n";
});

// Trouver la position d'insertion (avant le dernier crochet fermant)
const lastBracketIndex = currentContent.lastIndexOf('];');

if (lastBracketIndex === -1) {
  console.error("❌ Erreur : impossible de trouver la fin du tableau dans disabilityRates.ts");
  process.exit(1);
}

// Créer le nouveau contenu
const beforeArray = currentContent.substring(0, lastBracketIndex);
const afterArray = currentContent.substring(lastBracketIndex);

const newContent = beforeArray + ',' + insertionCode + afterArray;

// Sauvegarder dans un nouveau fichier pour révision
const backupPath = path.join(process.cwd(), 'data', 'disabilityRates.backup.ts');
const newPath = path.join(process.cwd(), 'data', 'disabilityRates.new.ts');

fs.writeFileSync(backupPath, currentContent);
fs.writeFileSync(newPath, newContent);

console.log(`\n✅ Fichiers générés :`);
console.log(`   📄 Backup : data/disabilityRates.backup.ts`);
console.log(`   📄 Nouveau fichier : data/disabilityRates.new.ts`);

console.log(`\n📋 PROCHAINES ÉTAPES :`);
console.log(`   1. Examiner data/disabilityRates.new.ts`);
console.log(`   2. Vérifier la syntaxe TypeScript : npm run build`);
console.log(`   3. Si OK, remplacer :`);
console.log(`      mv data/disabilityRates.new.ts data/disabilityRates.ts`);
console.log(`   4. Re-tester l'application\n`);

// Générer un rapport JSON
const report = {
  date: new Date().toISOString(),
  currentInjuryCount: currentCount,
  newInjuryCount: totalNewInjuries,
  totalAfter: currentCount + totalNewInjuries,
  sectionsAdded: sections.map(s => ({ name: s.name, count: s.count })),
  duplicatesFound: duplicates
};

const reportPath = path.join(process.cwd(), 'audit_reports', 'integration_report.json');
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

console.log(`📊 Rapport détaillé sauvegardé : audit_reports/integration_report.json`);
