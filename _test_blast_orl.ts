import { localExpertAnalysis } from './components/AiAnalyzer';

const text1 = `Agent de piste d'aéroport exposé à la déflagration inattendue d'un pneu d'avion à très courte distance. Bilan initial : Déchirure tympanique bilatérale, surdité de perception immédiate, et violents vertiges rotatoires. Séquelles à la consolidation (1 an) : Cophose (surdité totale) de l'oreille gauche. Hypoacousie moyenne de l'oreille droite. Acouphènes bilatéraux permanents et invalidants. Syndrome vestibulaire périphérique chronique (troubles de l'équilibre nécessitant une rééducation continue).`;

console.log('=== TEST 1: Blast auriculaire complet ===');
const r1 = localExpertAnalysis(text1);
console.log('type:', r1.type);
if ('name' in r1) console.log('name:', (r1 as any).name);
if ('rate' in r1) console.log('rate:', (r1 as any).rate);
if ('justification' in r1) console.log('justification:', (r1 as any).justification);

const text2 = `cophose oreille gauche hypoacousie moyenne oreille droite acouphènes bilatéraux permanents syndrome vestibulaire chronique`;

console.log('\n=== TEST 2: Blast simplifié ===');
const r2 = localExpertAnalysis(text2);
console.log('type:', r2.type);
if ('name' in r2) console.log('name:', (r2 as any).name);
if ('rate' in r2) console.log('rate:', (r2 as any).rate);

const text3 = `surdité totale bilatérale avec acouphènes permanents invalidants`;

console.log('\n=== TEST 3: Surdité totale bilatérale ===');
const r3 = localExpertAnalysis(text3);
console.log('type:', r3.type);
if ('name' in r3) console.log('name:', (r3 as any).name);
if ('rate' in r3) console.log('rate:', (r3 as any).rate);
