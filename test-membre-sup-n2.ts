// TEST MEMBRE SUPÉRIEUR N2

import { localExpertAnalysis } from './components/AiAnalyzer';

const casesEpaule = [
    "raideur épaule droite abduction 80° rotation externe 40°",
    "limitation abduction 70° antépulsion 90°",
    "abduction limitée 80° rotation externe 35° douleur",
    "épaule droite abduction 85° pas de rotation complète",
    "limitation antépulsion 100° élévation 85°"
];

const casesCoude = [
    "raideur coude droit flexion 110° extension -10°",
    "coude gauche flexion 100° pronation 60°",
    "limitation flexion coude 95° extension -15°",
    "coude droit flexion 115° pronation 70° supination 60°"
];

const casesPoignet = [
    "raideur poignet droit dorsiflexion 40° palmarflexion 50°",
    "poignet gauche dorsiflexion 35° inclinaisons limitées",
    "séquelle fracture radius distal dorsiflexion 45° force prise diminuée",
    "poignet droit palmarflexion 40° dorsiflexion 30°"
];

console.log('🧪 TEST MEMBRE SUPÉRIEUR N2\n');

console.log('=== ÉPAULE ===\n');
casesEpaule.forEach((cas, i) => {
    console.log(`📋 Test ${i+1}: "${cas}"`);
    const result = localExpertAnalysis(cas);
    if (result.type === 'proposal') {
        console.log(`✅ ${result.name} (${result.rate}%)`);
    } else {
        console.log(`❌ Not found`);
    }
    console.log('');
});

console.log('=== COUDE ===\n');
casesCoude.forEach((cas, i) => {
    console.log(`📋 Test ${i+1}: "${cas}"`);
    const result = localExpertAnalysis(cas);
    if (result.type === 'proposal') {
        console.log(`✅ ${result.name} (${result.rate}%)`);
    } else {
        console.log(`❌ Not found`);
    }
    console.log('');
});

console.log('=== POIGNET ===\n');
casesPoignet.forEach((cas, i) => {
    console.log(`📋 Test ${i+1}: "${cas}"`);
    const result = localExpertAnalysis(cas);
    if (result.type === 'proposal') {
        console.log(`✅ ${result.name} (${result.rate}%)`);
    } else {
        console.log(`❌ Not found`);
    }
    console.log('');
});