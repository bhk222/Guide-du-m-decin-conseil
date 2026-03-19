import { localExpertAnalysis } from './components/AiAnalyzer';

const fullText = `Chauffeur-livreur victime d'un accident de la circulation (choc arrière à haute vélocité). Coup de lapin (whiplash). Bilan initial : Entorse cervicale grave. IRM montrant une volumineuse hernie discale post-traumatique en C6-C7 venant comprimer la racine nerveuse C7 gauche. Séquelles à la consolidation (18 mois) : Raideur cervicale importante. Névralgie cervico-brachiale (NCB) gauche chronique avec douleurs fulgurantes irradiant jusqu'aux doigts. Déficit de force modéré à l'extension du coude et du poignet gauche.`;

console.log('=== TEST 1: FULL CLINICAL TEXT ===');
const r1 = localExpertAnalysis(fullText);
console.log('type:', r1.type);
console.log('name:', (r1 as any).name || 'n/a');
console.log('rate:', (r1 as any).rate || 'n/a');
console.log('justification:', ((r1 as any).justification || '').substring(0, 500));

console.log('\n=== TEST 2: NCB simple ===');
const r2 = localExpertAnalysis('hernie discale cervicale C6-C7 avec névralgie cervico-brachiale chronique');
console.log('type:', r2.type);
console.log('name:', (r2 as any).name || 'n/a');
console.log('rate:', (r2 as any).rate || 'n/a');

console.log('\n=== TEST 3: NCB + déficit moteur ===');
const r3 = localExpertAnalysis('hernie discale cervicale C5-C6 avec névralgie cervico-brachiale et déficit moteur');
console.log('type:', r3.type);
console.log('name:', (r3 as any).name || 'n/a');
console.log('rate:', (r3 as any).rate || 'n/a');

console.log('\n=== TEST 4: Hernie discale cervicale sans NCB ===');
const r4 = localExpertAnalysis('hernie discale cervicale post-traumatique avec raideur cervicale');
console.log('type:', r4.type);
console.log('name:', (r4 as any).name || 'n/a');
console.log('rate:', (r4 as any).rate || 'n/a');
