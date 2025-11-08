import { findCandidateInjuries } from './components/AiAnalyzer.tsx';

const cas9 = 'Soudeur 50 ans, brûlures oculaires arc électrique. Cataracte bilatérale opérée avec implants. Résultat : acuité visuelle OD 5/10, OG 6/10 avec correction. Gêne pour travaux de précision, éblouissement, impossibilité conduite nocturne.';

console.log('🔍 DEBUG findCandidateInjuries CAS 9');
console.log('');

const candidates = findCandidateInjuries(cas9);

console.log(`Trouvé ${candidates.length} candidats`);
console.log('');
console.log('Top 10:');
candidates.slice(0, 10).forEach((c, i) => {
    console.log(`${i + 1}. [${c.score.toFixed(1)}] ${c.injury.name.substring(0, 60)}`);
});
