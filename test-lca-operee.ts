import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const result = comprehensiveSingleLesionAnalysis('rupture LCA opérée avec laxité résiduelle dérobements fréquents escaliers arthrose débutante');

console.log('✅ Cas: LCA opérée');
console.log('Résultat:', result.type === 'proposal' ? result.name : 'NO_RESULT');
console.log('Taux:', result.type === 'proposal' ? result.rate + '%' : 'N/A');
console.log('Attendu: Séquelles de rupture du ligament croisé antérieur (LCA) (22%)');