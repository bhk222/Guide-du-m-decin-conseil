/**
 * DEBUG SPÉCIFIQUE - Méniscectomie problème
 */

import { findCandidateInjuries } from './components/AiAnalyzer';

const testInput = "méniscectomie totale interne avec chondropathie rotulienne stade 3 douleurs permanentes";

console.log('\n🔍 DEBUG SPÉCIFIQUE - Méniscectomie\n');
console.log(`Input: "${testInput}"`);
console.log('\n📊 TOP 10 CANDIDATS:\n');

const candidates = findCandidateInjuries(testInput);

candidates.slice(0, 10).forEach((candidate, index) => {
    console.log(`${index + 1}. ${candidate.injury.name} (Score: ${candidate.score.toFixed(1)})`);
    console.log(`   Path: ${candidate.path}`);
    console.log(`   Rate: ${candidate.injury.rate}%`);
    console.log('');
});

console.log('✅ Debug terminé\n');