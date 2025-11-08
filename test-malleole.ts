import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const result = comprehensiveSingleLesionAnalysis('fracture malléole externe bonne consolidation raideur modérée flexion dorsale 10 degrés');

console.log('✅ Cas: malléole externe + raideur modérée');
console.log('Résultat:', result.type === 'proposal' ? result.name : 'NO_RESULT');
console.log('Taux:', result.type === 'proposal' ? result.rate + '%' : 'N/A');
console.log('Attendu: Fracture malléolaire ou bi-malléolaire - Avec raideur modérée (12%)');