import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const result = comprehensiveSingleLesionAnalysis('surdité profonde oreille droite avec perte auditive 80 dB oreille gauche normale');

console.log('✅ Cas: surdité unilatérale profonde');
console.log('Résultat:', result.type === 'proposal' ? result.name : 'NO_RESULT');
console.log('Taux:', result.type === 'proposal' ? result.rate + '%' : 'N/A');
console.log('Attendu: Surdité unilatérale profonde (20%)');