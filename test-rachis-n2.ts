// TEST RACHIS N2 SPÉCIFIQUES

import { localExpertAnalysis } from './components/AiAnalyzer';

const casesN2Rachis = [
    "raideur rachis lombaire DDS 35 cm schober 3 cm",
    "rachis cervical DMS 12 cm rotation 60°",
    "séquelle tassement L3 DDS 30 cm douleur lombaire",
    "rachis dorsolombaire DDS 40 cm schober modifié 2 cm",
    "raideur cervicale DMS 15 cm inclinaisons limitées",
    "rachis lombaire DDS 25 cm périmètre marche 1,5 km"
];

console.log('🧪 TEST RACHIS N2 SPÉCIFIQUES\n');

casesN2Rachis.forEach((cas, i) => {
    console.log(`📋 Test ${i+1}: "${cas}"`);
    const result = localExpertAnalysis(cas);
    if (result.type === 'proposal') {
        console.log(`✅ Found: ${result.name} (${result.rate}%)`);
    } else {
        console.log(`❌ Not found`);
    }
    console.log('');
});