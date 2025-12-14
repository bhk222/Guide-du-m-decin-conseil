// Test cas cataracte
import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer.tsx';

const cas = `Soudeur 50 ans, brûlures oculaires arc électrique. Cataracte bilatérale opérée avec implants. Résultat : acuité visuelle OD 5/10, OG 6/10 avec correction. Gêne pour travaux de précision, éblouissement, impossibilité conduite nocturne`;

console.log('TEST CATARACTE BILATÉRALE');
console.log('=========================\n');
console.log('Texte :', cas);
console.log('\n');

try {
    const result = comprehensiveSingleLesionAnalysis(cas);
    console.log('Résultat:', JSON.stringify(result, null, 2));
} catch (error) {
    console.error('ERREUR:', error);
}
