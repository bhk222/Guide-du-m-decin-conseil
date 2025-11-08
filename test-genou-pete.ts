import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const result = comprehensiveSingleLesionAnalysis('le genou est pete avec le lca qui lache tout le temps et une arthrose qui commence le patient boite');

console.log('✅ Cas: genou pété + lca qui lâche');
console.log('Résultat:', result.type === 'proposal' ? result.name : 'NO_RESULT');
console.log('Taux:', result.type === 'proposal' ? result.rate + '%' : 'N/A');
console.log('Attendu: Séquelles de rupture du ligament croisé antérieur (LCA) (22%)');
console.log('Success:', result.type === 'proposal' && result.name === 'Séquelles de rupture du ligament croisé antérieur (LCA)');
