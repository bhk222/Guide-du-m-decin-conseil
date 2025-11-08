import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const result = comprehensiveSingleLesionAnalysis('acouphènes invalidants permanents bilatéraux suite traumatisme sonore troubles sommeil');

console.log('✅ Cas: acouphènes invalidants');
console.log('Résultat:', result.type === 'proposal' ? result.name : 'NO_RESULT');
console.log('Taux:', result.type === 'proposal' ? result.rate + '%' : 'N/A');
console.log('Attendu: Bourdonnements d\'oreille (acouphènes) isolés (8%)');