// Test de la correction V3.3.148 - Cataracte avec description naturaliste
import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

const cas = 'Soudeur 50 ans, brûlures oculaires arc électrique. Cataracte bilatérale opérée avec implants. Résultat : acuité visuelle OD 5/10, OG 6/10 avec correction. Gêne pour travaux de précision, éblouissement, impossibilité conduite nocturne.';

console.log('🧪 TEST CATARACTE BILATÉRALE - V3.3.148');
console.log('=' .repeat(80));
console.log('\n📋 CAS:');
console.log(cas);
console.log('\n' + '='.repeat(80));

try {
    const result = localExpertAnalysis(cas);
    
    console.log('\n✅ RÉSULTAT:');
    console.log('Type:', result.type);
    
    if (result.type === 'proposal') {
        console.log('Lésion:', result.name);
        console.log('IPP:', result.rate + '%');
        console.log('Justification:', result.justification.substring(0, 200) + '...');
        
        if (result.rate >= 40 && result.rate <= 55) {
            console.log('\n✅ TEST VALIDÉ - IPP dans la fourchette attendue (40-55%)');
        } else {
            console.log(`\n⚠️ IPP hors fourchette attendue: ${result.rate}% (attendu: 40-55%)`);
        }
    } else if (result.type === 'no_result') {
        console.log('❌ ÉCHEC - Séquelle non reconnue');
        console.log('Message:', result.text);
    } else if (result.type === 'ambiguity') {
        console.log('⚠️ Ambiguïté détectée');
        console.log('Choix:', result.choices?.length || 0);
    }
    
} catch (error) {
    console.error('❌ ERREUR:', error.message);
}
