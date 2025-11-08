import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const cas7 = "fracture extrémité inférieure radius avec cal vicieux déformation importante limitation prono supination";

console.log('🔍 DEBUG CAS 7:');
console.log(`Input: "${cas7}"`);

// Test pattern séparément
const pattern = /fracture.*(?:extrémité|extremite).*(?:inférieure|inf).*radius/i;
const context = /cal.*vicieux|déformation|prono.*supination|limitation/i;

console.log(`\nPattern match: ${pattern.test(cas7)}`);
console.log(`Context match: ${context.test(cas7)}`);

// Affichage du résultat
const result = comprehensiveSingleLesionAnalysis(cas7);
console.log(`\nRésultat: ${result.type === 'proposal' ? result.name + ' (' + result.rate + '%)' : 'Aucune correspondance'}`);

// Test avec pattern modifié
const pattern2 = /fracture.*radius.*(?:extrémité|extremite|inférieure|inf)/i;
console.log(`\nPattern alternatif: ${pattern2.test(cas7)}`);

// Test avec contexte modifié  
const context2 = /cal.*vicieux|déformation|prono|supination|limitation/i;
console.log(`Context alternatif: ${context2.test(cas7)}`);