import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

// Test pattern matching directement
const text = 'surdité profonde oreille droite avec perte auditive 80 dB oreille gauche normale';
const pattern = /surdit[eé].*profonde.*oreille|oreille.*surdit[eé].*profonde/i;
const context = /unilat[eé]rale|80.*dB|oreille.*normale|une.*oreille/i;

console.log('Text:', text);
console.log('Pattern match:', pattern.test(text));
console.log('Context match:', context.test(text));

const result = comprehensiveSingleLesionAnalysis(text);
console.log('\nRésultat AI:', result.type === 'proposal' ? result.name : 'NO_RESULT');
console.log('Taux:', result.type === 'proposal' ? result.rate + '%' : 'N/A');