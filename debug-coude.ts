// DEBUG COUDE

import { localExpertAnalysis } from './components/AiAnalyzer';

const cas = "coude gauche flexion 100° pronation 60°";

console.log('🔍 DEBUG COUDE\n');
console.log(`Input: "${cas}"`);

// Debug avec plus de détails
const result = localExpertAnalysis(cas);

console.log('\nResult:', result);
console.log('\nType:', result.type);

if (result.type === 'proposal') {
    console.log('Name:', result.name);
    console.log('Rate:', result.rate);
}

// Tester le pattern direct
const patternCoude = /(?:raideur|limitation).*coude|coude.*(?:raideur|limitation)/i;
const contextCoude = /flexion.*(?:90|100|110)°.*(?:pronation|supination)|(?:pronation|supination).*(?:50|60|70)°/i;

console.log('\nPattern match:', patternCoude.test(cas));
console.log('Context match:', contextCoude.test(cas));

// Test pattern plus simple
const simplePattern = /coude/i;
console.log('Simple coude match:', simplePattern.test(cas));