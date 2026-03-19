import { localExpertAnalysis } from './components/AiAnalyzer';

const fullText = `Peintre tombé d'une échelle. Bilan initial : Fracture transversale spiroïde du tiers moyen de l'humérus droit. Séquelles à la consolidation (2 ans) : Échec de la consolidation osseuse (pseudarthrose lâche) malgré deux interventions chirurgicales (ostéosynthèse puis greffe osseuse). Mobilité anormale et douloureuse du bras. Port d'une orthèse de maintien permanent. Force du bras quasi nulle.`;

console.log('=== TEST 1: FULL CLINICAL TEXT (pseudarthrose lâche humérus droit) ===');
const r1 = localExpertAnalysis(fullText);
console.log('type:', r1.type);
console.log('name:', (r1 as any).name || 'n/a');
console.log('rate:', (r1 as any).rate || 'n/a');
const pass1 = r1.type === 'proposal' && (r1 as any).rate >= 40 && /pseudarthrose/i.test((r1 as any).name || '');
console.log(pass1 ? '✅ PASS' : '❌ FAIL');

console.log('\n=== TEST 2: SIMPLE (pseudarthrose lâche humérus) ===');
const r2 = localExpertAnalysis('pseudarthrose lâche de l humérus droit');
console.log('type:', r2.type);
console.log('name:', (r2 as any).name || 'n/a');
console.log('rate:', (r2 as any).rate || 'n/a');
const pass2 = r2.type === 'proposal' && (r2 as any).rate >= 40 && /pseudarthrose.*hum/i.test((r2 as any).name || '');
console.log(pass2 ? '✅ PASS' : '❌ FAIL');

console.log('\n=== TEST 3: PSEUDARTHROSE SERRÉE HUMÉRUS GAUCHE ===');
const r3 = localExpertAnalysis('pseudarthrose serrée de l humérus gauche');
console.log('type:', r3.type);
console.log('name:', (r3 as any).name || 'n/a');
console.log('rate:', (r3 as any).rate || 'n/a');
const pass3 = r3.type === 'proposal' && (r3 as any).rate >= 30 && (r3 as any).rate <= 40 && /Non Dominante/i.test((r3 as any).name || '');
console.log(pass3 ? '✅ PASS' : '❌ FAIL');

console.log('\n=== TEST 4: PSEUDARTHROSE FÉMUR ===');
const r4 = localExpertAnalysis('fracture diaphysaire du fémur droit compliquée de pseudarthrose lâche');
console.log('type:', r4.type);
console.log('name:', (r4 as any).name || 'n/a');
console.log('rate:', (r4 as any).rate || 'n/a');
const pass4 = r4.type === 'proposal' && (r4 as any).rate >= 60 && /pseudarthrose.*f[eé]mur/i.test((r4 as any).name || '');
console.log(pass4 ? '✅ PASS' : '❌ FAIL');

console.log('\n=== TEST 5: PSEUDARTHROSE TIBIA ===');
const r5 = localExpertAnalysis('pseudarthrose du tibia gauche après fracture');
console.log('type:', r5.type);
console.log('name:', (r5 as any).name || 'n/a');
console.log('rate:', (r5 as any).rate || 'n/a');
const pass5 = r5.type === 'proposal' && (r5 as any).rate >= 30 && /pseudarthrose.*tibia/i.test((r5 as any).name || '');
console.log(pass5 ? '✅ PASS' : '❌ FAIL');

console.log('\n=== TEST 6: PSEUDARTHROSE CLAVICULE ===');
const r6 = localExpertAnalysis('pseudarthrose lâche de la clavicule droite');
console.log('type:', r6.type);
console.log('name:', (r6 as any).name || 'n/a');
console.log('rate:', (r6 as any).rate || 'n/a');
const pass6 = r6.type === 'proposal' && (r6 as any).rate >= 5 && /pseudarthrose.*clavicule/i.test((r6 as any).name || '');
console.log(pass6 ? '✅ PASS' : '❌ FAIL');

console.log('\n=== TEST 7: NON-CONSOLIDATION HUMÉRUS (synonyme pseudarthrose) ===');
const r7 = localExpertAnalysis('échec de la consolidation osseuse de l humérus droit avec mobilité anormale');
console.log('type:', r7.type);
console.log('name:', (r7 as any).name || 'n/a');
console.log('rate:', (r7 as any).rate || 'n/a');
const pass7 = r7.type === 'proposal' && (r7 as any).rate >= 40 && /pseudarthrose.*hum/i.test((r7 as any).name || '');
console.log(pass7 ? '✅ PASS' : '❌ FAIL');

const total = [pass1, pass2, pass3, pass4, pass5, pass6, pass7].filter(Boolean).length;
console.log(`\n=== TOTAL: ${total}/7 ===`);
