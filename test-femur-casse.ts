import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const result = comprehensiveSingleLesionAnalysis('fémur cassé avec raccourcissement de 3 cm et boiterie importante le patient marche avec une canne');

console.log('✅ Cas: fémur cassé avec raccourcissement 3cm');
console.log('Résultat:', result.type === 'proposal' ? result.name : 'NO_RESULT');
console.log('Taux:', result.type === 'proposal' ? result.rate + '%' : 'N/A');
console.log('Attendu: Fracture diaphysaire du fémur (22%)');
console.log('Success:', result.type === 'proposal' && result.name === 'Fracture diaphysaire du fémur');

