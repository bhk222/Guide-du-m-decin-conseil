import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const result = comprehensiveSingleLesionAnalysis('fracture calcanéum thalamique avec enfoncement arthrose sous astragalienne marche limitée 400m');

console.log('✅ Cas: calcanéum thalamique');
console.log('Résultat:', result.type === 'proposal' ? result.name : 'NO_RESULT');
console.log('Taux:', result.type === 'proposal' ? result.rate + '%' : 'N/A');
console.log('Attendu: Fracture du calcanéum - Avec douleurs et boiterie (26%)');