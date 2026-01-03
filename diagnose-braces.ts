/**
 * Script de diagnostic pour trouver les accolades manquantes
 */

import * as fs from 'fs';

const content = fs.readFileSync('data/disabilityRates.new.ts', 'utf-8');
const lines = content.split('\n');

let braceBalance = 0;
let bracketBalance = 0;
const issues: string[] = [];

console.log('🔍 Analyse ligne par ligne...\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const lineNum = i + 1;
  
  // Compter accolades
  const openBraces = (line.match(/\{/g) || []).length;
  const closeBraces = (line.match(/\}/g) || []).length;
  const openBrackets = (line.match(/\[/g) || []).length;
  const closeBrackets = (line.match(/\]/g) || []).length;
  
  braceBalance += openBraces - closeBraces;
  bracketBalance += openBrackets - closeBrackets;
  
  // Détecter sections importantes
  if (line.match(/^\s{2}name: "Séquelles/)) {
    console.log(`📌 Ligne ${lineNum}: Début section - Balance {}: ${braceBalance}, []: ${bracketBalance}`);
    console.log(`   ${line.trim()}`);
  }
  
  // Détecter fermetures de sections (lignes avec seulement }, ou })
  if (line.match(/^\s{2}\},?\s*$/)) {
    console.log(`   Ligne ${lineNum}: Fin possible section - Balance {}: ${braceBalance}, []: ${bracketBalance}`);
  }
  
  // Détecter virgule orpheline
  if (line.trim() === ',') {
    console.log(`⚠️  Ligne ${lineNum}: VIRGULE ORPHELINE !`);
  }
  
  // Détecter balance négative
  if (braceBalance < 0) {
    issues.push(`Ligne ${lineNum}: Balance accolades NÉGATIVE (${braceBalance})`);
  }
  if (bracketBalance < 0) {
    issues.push(`Ligne ${lineNum}: Balance crochets NÉGATIVE (${bracketBalance})`);
  }
}

console.log(`\n📊 BILAN FINAL:`);
console.log(`   Balance {}: ${braceBalance} (devrait être 0)`);
console.log(`   Balance []: ${bracketBalance} (devrait être 0)`);
console.log(`   Lignes totales: ${lines.length}`);

if (issues.length > 0) {
  console.log(`\n❌ PROBLÈMES DÉTECTÉS:`);
  issues.forEach(issue => console.log(`   ${issue}`));
} else {
  console.log(`\n✅ Aucun problème de balance négative détecté`);
}

if (braceBalance !== 0) {
  console.log(`\n🔧 DIAGNOSTIC: Il manque ${braceBalance} accolade(s) fermante(s) }`);
}
