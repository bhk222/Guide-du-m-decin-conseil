import { localExpertAnalysis } from './components/AiAnalyzer';

const text1 = `Mécanicien industriel. Écrasement prolongé de la main dominante sous une presse, sans fracture osseuse mais avec lésions tissulaires massives. Bilan initial : Hématome géant, œdème massif, intégrité nerveuse conservée aux premiers examens. Séquelles à la consolidation (18 mois) : Installation d'un SDRC (Algodystrophie) de type I. Main figée (enraidissement des doigts en semi-flexion), peau froide, luisante et dépilée. Douleurs neuropathiques intenses et diffuses au moindre effleurement (allodynie). Utilisation de la main totalement impossible.`;

console.log('=== TEST SDRC SÉVÈRE ===');
const r1 = localExpertAnalysis(text1);
console.log('type:', r1.type);
if ('name' in r1) console.log('name:', (r1 as any).name);
if ('rate' in r1) console.log('rate:', (r1 as any).rate);
if ('justification' in r1) console.log('justification:', (r1 as any).justification);
