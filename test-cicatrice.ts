import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const result = comprehensiveSingleLesionAnalysis('cicatrice chéloïde face antérieure thorax 15 cm rétractile adhérente plans profonds gêne esthétique importante');

console.log('✅ Cas: cicatrice chéloïde thorax');
console.log('Résultat:', result.type === 'proposal' ? result.name : 'NO_RESULT');
console.log('Taux:', result.type === 'proposal' ? result.rate + '%' : 'N/A');
console.log('Attendu: Cicatrice vicieuse thorax antérieur (8%)');