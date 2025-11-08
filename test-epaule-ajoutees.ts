import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST PATHOLOGIES ÉPAULE AJOUTÉES\n');

// Test cas 3: coiffe des rotateurs
const cas3 = "rupture coiffe des rotateurs complète avec impossibilité élévation active testing 0/5 amyotrophie supra épineux";
const result3 = comprehensiveSingleLesionAnalysis(cas3);
console.log('📋 Cas 3 (Coiffe rotateurs):');
console.log(`Résultat: ${result3.type === 'proposal' ? result3.name + ' (' + result3.rate + '%)' : 'Aucune correspondance'}`);

// Test cas 4: luxation récidivante
const cas4 = "luxation récidivante épaule avec instabilité permanente appréhension dérobements fréquents";
const result4 = comprehensiveSingleLesionAnalysis(cas4);
console.log('\n📋 Cas 4 (Luxation récidivante):');
console.log(`Résultat: ${result4.type === 'proposal' ? result4.name + ' (' + result4.rate + '%)' : 'Aucune correspondance'}`);