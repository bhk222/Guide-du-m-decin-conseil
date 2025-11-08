import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const result = comprehensiveSingleLesionAnalysis('perte totale vision oeil gauche suite traumatisme oeil droit normal');

console.log('✅ Cas: perte totale vision oeil');
console.log('Résultat:', result.type === 'proposal' ? result.name : 'NO_RESULT');
console.log('Taux:', result.type === 'proposal' ? result.rate + '%' : 'N/A');
console.log('Attendu: Perte complète de la vision d\'un oeil (l\'autre étant normal) (30%)');