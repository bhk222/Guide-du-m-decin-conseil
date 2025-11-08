import { normalize } from './components/AiAnalyzer';

const cas7 = "fracture extrémité inférieure radius avec cal vicieux déformation importante limitation prono supination";
const normalizedCas7 = normalize(cas7);

console.log('🔍 DEBUG AVANCÉ CAS 7:');
console.log(`Input: "${cas7}"`);
console.log(`Normalized: "${normalizedCas7}"`);

// Vérifier si l'entrée existe dans les données
const searchTerm = "Fracture de l'extrémité inférieure du radius - Avec cal vicieux";
const normalizedSearchTerm = normalize(searchTerm);

console.log(`\nSearch term: "${searchTerm}"`);
console.log(`Normalized search: "${normalizedSearchTerm}"`);

// Test inclusion
console.log(`\nInclusion test: ${normalizedSearchTerm.includes(normalize(searchTerm))}`);

// Test similarity
console.log(`Input words: ${normalizedCas7.split(' ')}`);
console.log(`Search words: ${normalizedSearchTerm.split(' ')}`);