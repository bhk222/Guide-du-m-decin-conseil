// Test CAS 9 - Cataracte post-traumatique (V3.3.32)
import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

const cas9 = `Soudeur 50 ans, brûlures oculaires arc électrique. Cataracte POST TRAUMATIQUE bilatérale opérée avec implants. Résultat : acuité visuelle OD 5/10, OG 6/10 avec correction. Gêne pour travaux de précision, éblouissement, impossibilité conduite nocturne.`;

console.log('='.repeat(80));
console.log('TEST CAS 9 - CATARACTE POST-TRAUMATIQUE');
console.log('='.repeat(80));
console.log('\n📋 DESCRIPTION:');
console.log(cas9);
console.log('\n🎯 ATTENDU: IPP 45-55%');
console.log('\n' + '='.repeat(80));

const result = localExpertAnalysis(cas9);

console.log('\n✅ RÉSULTAT:');
console.log(`Type: ${result.type}`);
console.log(`Lésion: ${result.name}`);
console.log(`Taux IPP: ${result.rate}%`);

if (Array.isArray(result.injury?.rate)) {
    console.log(`Fourchette barème: [${result.injury.rate.join(' - ')}]%`);
}

console.log('\n📊 VALIDATION:');
const isValid = result.rate >= 45 && result.rate <= 55;
console.log(isValid ? `✅ VALIDÉ: ${result.rate}% dans [45-55%]` : `❌ ÉCART: ${result.rate}%`);
console.log('\n' + '='.repeat(80));
