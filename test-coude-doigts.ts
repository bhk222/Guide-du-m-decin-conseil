import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST PATHOLOGIES COUDE/DOIGTS AJOUTÉES\n');

// Test cas 6: ankylose coude position vicieuse
const cas6 = "ankylose complète coude position vicieuse 60 degrés flexion impossibilité extension";
const result6 = comprehensiveSingleLesionAnalysis(cas6);
console.log('📋 Cas 6 (Ankylose coude vicieuse):');
console.log(`Résultat: ${result6.type === 'proposal' ? result6.name + ' (' + result6.rate + '%)' : 'Aucune correspondance'}`);

// Test cas 10: section tendons fléchisseurs
const cas10 = "section tendons fléchisseurs médius avec impossibilité flexion active doigts raideur";
const result10 = comprehensiveSingleLesionAnalysis(cas10);
console.log('\n📋 Cas 10 (Section tendons):');
console.log(`Résultat: ${result10.type === 'proposal' ? result10.name + ' (' + result10.rate + '%)' : 'Aucune correspondance'}`);