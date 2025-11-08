import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST AMPUTATIONS AJOUTÉES\n');

// Test cas 2: amputation pouce
const cas2 = "amputation pouce main dominante sans possibilité préhension pollici digitale opposition impossible";
const result2 = comprehensiveSingleLesionAnalysis(cas2);
console.log('📋 Cas 2 (Amputation pouce):');
console.log(`Résultat: ${result2.type === 'proposal' ? result2.name + ' (' + result2.rate + '%)' : 'Aucune correspondance'}`);

// Test cas 9: amputation index
const cas9 = "amputation index main dominante niveau articulation métacarpo phalangienne";
const result9 = comprehensiveSingleLesionAnalysis(cas9);
console.log('\n📋 Cas 9 (Amputation index):');
console.log(`Résultat: ${result9.type === 'proposal' ? result9.name + ' (' + result9.rate + '%)' : 'Aucune correspondance'}`);