/**
 * SCRIPT D'ENTRAÎNEMENT IA - EXECUTION ET CORRECTIONS AUTOMATIQUES
 * Teste l'IA, détecte faiblesses, applique corrections
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('\n🔬 ENTRAÎNEMENT IA MÉDICO-LÉGALE - ANALYSE ET CORRECTIONS\n');
console.log('═══════════════════════════════════════════════════════════\n');

// Charger les cas d'entraînement
const trainingCasesPath = join(projectRoot, 'data', 'trainingCases.ts');
const trainingCasesContent = readFileSync(trainingCasesPath, 'utf-8');

// Parser les cas (extraction simple)
const casesMatch = trainingCasesContent.match(/export const trainingCases[^[]*(\[[\s\S]*?\n\];)/);
if (!casesMatch) {
  console.error('❌ Impossible de parser trainingCases.ts');
  process.exit(1);
}

// Simuler analyse IA pour chaque cas (extraction userInput et expectedInjury)
const userInputs = [...trainingCasesContent.matchAll(/userInput:\s*"([^"]+)"/g)].map(m => m[1]);
const expectedInjuries = [...trainingCasesContent.matchAll(/expectedInjury:\s*"([^"]+)"/g)].map(m => m[1]);
const expectedRates = [...trainingCasesContent.matchAll(/expectedRate:\s*(\d+)/g)].map(m => parseInt(m[1]));
const categories = [...trainingCasesContent.matchAll(/category:\s*"([^"]+)"/g)].map(m => m[1]);
const ids = [...trainingCasesContent.matchAll(/id:\s*"([^"]+)"/g)].map(m => m[1]);

console.log(`📊 ${userInputs.length} cas cliniques chargés\n`);

// Analyse des keywords manquants à ajouter
const missingKeywords = new Map();
const categoryFailures = new Map();

// Simuler tests et collecter améliorations nécessaires
console.log('🔍 ANALYSE DES CAS ET DÉTECTION FAIBLESSES:\n');

userInputs.forEach((input, idx) => {
  const category = categories[idx];
  const expectedInjury = expectedInjuries[idx];
  const id = ids[idx];
  
  console.log(`${idx + 1}. [${id}] ${category}`);
  console.log(`   Input: "${input.substring(0, 70)}..."`);
  console.log(`   Attendu: ${expectedInjury} (${expectedRates[idx]}%)`);
  
  // Extraire keywords importants du cas
  const keywords = extractImportantKeywords(input, expectedInjury);
  keywords.forEach(kw => {
    if (!missingKeywords.has(kw)) {
      missingKeywords.set(kw, []);
    }
    missingKeywords.get(kw).push({ category, id, input: input.substring(0, 50) });
  });
  
  console.log(`   Keywords détectés: ${keywords.join(', ')}\n`);
});

// Fonction extraction keywords
function extractImportantKeywords(input, expectedInjury) {
  const keywords = new Set();
  
  // Patterns vision
  if (/cataract|cataracte/i.test(input)) keywords.add('cataracte');
  if (/acuit[eé]|av\s|od\s|og\s/i.test(input)) keywords.add('acuite_visuelle');
  if (/uv[eé]ite/i.test(input)) keywords.add('uveite');
  if (/r[eé]tine|d[eé]collement/i.test(input)) keywords.add('retine');
  if (/vitr[eé]/i.test(input)) keywords.add('vitre');
  
  // Patterns genou
  if (/lca|ligament crois[eé] ant[eé]rieur/i.test(input)) keywords.add('lca');
  if (/lcp|ligament crois[eé] post[eé]rieur/i.test(input)) keywords.add('lcp');
  if (/m[eé]niscectomie|m[eé]nisque/i.test(input)) keywords.add('meniscectomie');
  if (/d[eé]robement|instabilit[eé]|laxit[eé]/i.test(input)) keywords.add('instabilite_genou');
  if (/arthrose/i.test(input)) keywords.add('arthrose');
  
  // Patterns cheville/pied
  if (/pilon tibial/i.test(input)) keywords.add('pilon_tibial');
  if (/mall[eé]ole|bimall[eé]olaire/i.test(input)) keywords.add('malleole');
  if (/calcan[eé]um|talamique/i.test(input)) keywords.add('calcaneum');
  if (/astragale|talus/i.test(input)) keywords.add('astragale');
  if (/m[eé]tatarsien/i.test(input)) keywords.add('metatarsien');
  if (/ankylose cheville|quasi.?ankylose/i.test(input)) keywords.add('ankylose_cheville');
  
  // Patterns rachis
  if (/tassement|fracture.*vert[eè]bre|l\d|d\d/i.test(input)) keywords.add('tassement_vertebral');
  if (/cyphose|lordose|scoliose/i.test(input)) keywords.add('deformation_rachis');
  if (/cervical|rachis cervical/i.test(input)) keywords.add('rachis_cervical');
  if (/dms|distance menton.?sternum/i.test(input)) keywords.add('dms');
  if (/dds|distance doigts.?sol/i.test(input)) keywords.add('dds');
  
  // Patterns membres supérieurs
  if (/t[eê]te hum[eé]rale|col hum[eé]ral/i.test(input)) keywords.add('tete_humerale');
  if (/amputation.*pouce/i.test(input)) keywords.add('amputation_pouce');
  if (/abduction|[eé]l[eé]vation.*[eé]paule/i.test(input)) keywords.add('abduction_epaule');
  
  // Patterns nerfs
  if (/radial|main tombante/i.test(input)) keywords.add('nerf_radial');
  if (/sciatique|l5|s1/i.test(input)) keywords.add('sciatique');
  if (/steppage/i.test(input)) keywords.add('steppage');
  if (/testing|force musculaire|\d\/5/i.test(input)) keywords.add('testing_musculaire');
  
  // Patterns cumul
  if (/et aussi|avec.*fracture|associ[eé]/i.test(input)) keywords.add('sequelles_multiples');
  
  // Patterns variations linguistiques
  if (/cass[eé]|p[eé]t[eé]|coinc[eé]|boite|voit flou/i.test(input)) keywords.add('langage_familier');
  
  return Array.from(keywords);
}

console.log('\n═══════════════════════════════════════════════════════════');
console.log('📋 KEYWORDS À AJOUTER DANS AiAnalyzer.tsx:');
console.log('═══════════════════════════════════════════════════════════\n');

const keywordPriorities = new Map([
  ['cataracte', 70],
  ['acuite_visuelle', 70],
  ['uveite', 60],
  ['retine', 55],
  ['vitre', 50],
  ['lca', 75],
  ['lcp', 70],
  ['meniscectomie', 65],
  ['instabilite_genou', 60],
  ['arthrose', 55],
  ['pilon_tibial', 75],
  ['malleole', 70],
  ['calcaneum', 70],
  ['astragale', 65],
  ['metatarsien', 60],
  ['ankylose_cheville', 75],
  ['tassement_vertebral', 70],
  ['deformation_rachis', 65],
  ['rachis_cervical', 70],
  ['dms', 60],
  ['dds', 60],
  ['tete_humerale', 70],
  ['amputation_pouce', 75],
  ['abduction_epaule', 65],
  ['nerf_radial', 75],
  ['sciatique', 70],
  ['steppage', 65],
  ['testing_musculaire', 60],
  ['sequelles_multiples', 70],
  ['langage_familier', 50]
]);

// Afficher keywords avec priorités
console.log('const keywordWeights: Record<string, number> = {');
for (const [keyword, priority] of keywordPriorities) {
  const occurrences = missingKeywords.get(keyword)?.length || 0;
  if (occurrences > 0) {
    console.log(`  "${keyword.replace(/_/g, ' ')}": ${priority},  // ${occurrences} cas`);
  }
}
console.log('};\n');

console.log('\n═══════════════════════════════════════════════════════════');
console.log('🎯 SYNONYMES À AJOUTER:');
console.log('═══════════════════════════════════════════════════════════\n');

const synonymsToAdd = {
  // Vision
  'cataract': 'cataracte',
  'av': 'acuite visuelle',
  'avo': 'acuite visuelle oeil',
  'od': 'oeil droit',
  'og': 'oeil gauche',
  'voit flou': 'baisse acuite visuelle',
  'voit mal': 'baisse acuite visuelle',
  
  // Genou
  'lca': 'ligament croise anterieur',
  'lcp': 'ligament croise posterieur',
  'qui lache': 'instabilite',
  'genou instable': 'laxite residuelle',
  'derobement': 'instabilite articulaire',
  
  // Cheville
  'pilon': 'pilon tibial',
  'bimall': 'bimalleolaire',
  'thalamique': 'calcaneum thalamique',
  
  // Rachis
  'vertebre': 'vertebral',
  'dos bloque': 'raideur rachis',
  'dms': 'distance menton sternum',
  'dds': 'distance doigts sol',
  
  // Général
  'casse': 'fracture',
  'pete': 'rupture',
  'coince': 'blocage articulaire',
  'boite': 'claudication',
  'marche mal': 'troubles marche'
};

console.log('const clinicalSynonyms: Record<string, string> = {');
for (const [key, value] of Object.entries(synonymsToAdd)) {
  console.log(`  "${key}": "${value}",`);
}
console.log('};\n');

console.log('\n═══════════════════════════════════════════════════════════');
console.log('✅ ANALYSE TERMINÉE - PRÊT POUR CORRECTIONS');
console.log('═══════════════════════════════════════════════════════════\n');

console.log('📝 Prochaines étapes:');
console.log('1. Ajouter keywords ci-dessus dans AiAnalyzer.tsx (ligne ~819)');
console.log('2. Ajouter synonymes ci-dessus dans AiAnalyzer.tsx (ligne ~897)');
console.log('3. Re-tester avec validation automatique');
console.log('4. Déployer si métriques ≥95% reconnaissance\n');

// Générer fichier de corrections
const correctionsPath = join(projectRoot, 'CORRECTIONS_IA.md');
const correctionsContent = `# 🔧 CORRECTIONS IA MÉDICO-LÉGALE

## Date: ${new Date().toLocaleDateString('fr-FR')}

### 📊 Analyse: ${userInputs.length} cas cliniques

### 🎯 Keywords à ajouter (AiAnalyzer.tsx ligne ~819):

\`\`\`typescript
const keywordWeights: Record<string, number> = {
  // Keywords existants...
  
  // ➕ NOUVEAUX KEYWORDS:
${Array.from(keywordPriorities.entries())
  .filter(([kw]) => missingKeywords.get(kw)?.length > 0)
  .map(([kw, priority]) => `  "${kw.replace(/_/g, ' ')}": ${priority},  // ${missingKeywords.get(kw).length} cas`)
  .join('\n')}
};
\`\`\`

### 🔄 Synonymes à ajouter (AiAnalyzer.tsx ligne ~897):

\`\`\`typescript
const clinicalSynonyms: Record<string, string> = {
  // Synonymes existants...
  
  // ➕ NOUVEAUX SYNONYMES:
${Object.entries(synonymsToAdd).map(([k, v]) => `  "${k}": "${v}",`).join('\n')}
};
\`\`\`

### 📋 Cas nécessitant attention particulière:

${userInputs.slice(0, 5).map((input, idx) => `
#### ${ids[idx]} - ${categories[idx]}
- **Input**: "${input}"
- **Attendu**: ${expectedInjuries[idx]} (${expectedRates[idx]}%)
- **Keywords**: ${extractImportantKeywords(input, expectedInjuries[idx]).join(', ')}
`).join('\n')}

### ✅ Actions réalisées:
- [x] Analyse ${userInputs.length} cas cliniques
- [x] Extraction keywords manquants
- [x] Génération synonymes médicaux
- [ ] Application corrections AiAnalyzer.tsx
- [ ] Validation automatique post-corrections
- [ ] Déploiement production

### 🎯 Objectifs:
- Reconnaissance lésions: **≥95%** (actuel: à mesurer)
- Précision taux IPP: **≥90%** (actuel: à mesurer)
- Temps réponse: **≤500ms** (actuel: à mesurer)
`;

writeFileSync(correctionsPath, correctionsContent, 'utf-8');
console.log(`✅ Fichier CORRECTIONS_IA.md généré\n`);

process.exit(0);
