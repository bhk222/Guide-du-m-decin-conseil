import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const result = comprehensiveSingleLesionAnalysis('pseudarthrose tibia diaphyse moyenne avec mobilité anormale douleurs importantes marche impossible sans appui');

console.log('✅ Cas: pseudarthrose tibia diaphyse');
console.log('Résultat:', result.type === 'proposal' ? result.name : 'NO_RESULT');
console.log('Taux:', result.type === 'proposal' ? result.rate + '%' : 'N/A');
console.log('Attendu: Pseudarthrose de la diaphyse tibiale (70%)');