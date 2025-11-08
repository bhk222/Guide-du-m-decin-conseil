import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const result = comprehensiveSingleLesionAnalysis('perte 8 dents définitives suite traumatisme facial nécessitant prothèse dentaire');

console.log('✅ Cas: perte 8 dents');
console.log('Résultat:', result.type === 'proposal' ? result.name : 'NO_RESULT');
console.log('Taux:', result.type === 'proposal' ? result.rate + '%' : 'N/A');
console.log('Attendu: Perte de plusieurs dents - Molaires (12%)');