import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

// Test pattern matching directement
const text = 'le genou est pete avec le lca qui lache tout le temps et une arthrose qui commence le patient boite';
const pattern = /genou.*(?:pet[eé]|p[eé]t[eé]|naz[eé])|lca.*(?:lache|l[aâ]che|qui.*lache)/i;
const context = /instabil|d[eé]robement|laxit[eé]|arthrose|boite/i;

console.log('Text:', text);
console.log('Pattern match:', pattern.test(text));
console.log('Context match:', context.test(text));

const result = comprehensiveSingleLesionAnalysis(text);
console.log('\nRésultat AI:', result.type === 'proposal' ? result.name : 'NO_RESULT');
console.log('Taux:', result.type === 'proposal' ? result.rate + '%' : 'N/A');