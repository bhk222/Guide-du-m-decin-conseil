import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

const cas9 = 'Soudeur 50 ans, brûlures oculaires arc électrique. Cataracte bilatérale opérée avec implants. Résultat : acuité visuelle OD 5/10, OG 6/10 avec correction. Gêne pour travaux de précision, éblouissement, impossibilité conduite nocturne.';

console.log('🧪 TEST CAS 9 - Cataracte Bilatérale');
console.log('');

const result = localExpertAnalysis(cas9);

if (result.type === 'ambiguity') {
    console.log('❌ AMBIGUÏTÉ:', result.choices?.length || 0, 'choix');
} else {
    console.log('Lésion:', result.name);
    console.log('IPP:', result.rate + '%');
    console.log('Attendu: 45-55%');
    
    if (result.rate >= 45 && result.rate <= 55) {
        console.log('✅ VALIDÉ');
    } else {
        console.log('❌ ÉCART:', result.rate - 50, 'points');
        console.log('');
        console.log('Détails:', JSON.stringify(result, null, 2).substring(0, 500));
    }
}
