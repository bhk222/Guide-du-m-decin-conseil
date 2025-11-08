import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST FRACTURES AJOUTÉES\n');

// Test cas 1: tête humérale
const cas1 = "fracture tête humérale avec raideur abduction 60 degrés rotation externe impossible douleurs nocturnes";
const result1 = comprehensiveSingleLesionAnalysis(cas1);
console.log('📋 Cas 1 (Tête humérale):');
console.log(`Résultat: ${result1.type === 'proposal' ? result1.name + ' (' + result1.rate + '%)' : 'Aucune correspondance'}`);

// Test cas 5: olécrane
const cas5 = "fracture olécrane avec raideur importante flexion 30-100 degrés extension impossible";
const result5 = comprehensiveSingleLesionAnalysis(cas5);
console.log('\n📋 Cas 5 (Olécrane):');
console.log(`Résultat: ${result5.type === 'proposal' ? result5.name + ' (' + result5.rate + '%)' : 'Aucune correspondance'}`);

// Test cas 7: radius distal
const cas7 = "fracture extrémité inférieure radius avec cal vicieux déformation importante limitation prono supination";
const result7 = comprehensiveSingleLesionAnalysis(cas7);
console.log('\n📋 Cas 7 (Radius distal):');
console.log(`Résultat: ${result7.type === 'proposal' ? result7.name + ' (' + result7.rate + '%)' : 'Aucune correspondance'}`);