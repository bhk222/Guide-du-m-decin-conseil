import { findCandidateInjuries, localExpertAnalysis } from './components/AiAnalyzer';

const inputText = `Victime d'AT survenu Le 22/09/25. A l'origine d'un traumatisme du pied droit. Suite à une chute, ayant occasionné : Fracture de 5ème métatarse. Traitement : Traitée par immobilisation plâtrée. Plaintes actuelles : Douleurs en période de froids. Douleurs à la montée des escaliers. L'examen : Femme obèse. Marche avec légère boiterie. Léger œdème.`;

// Get flat list from AiAnalyzer's internal reference
const disabilityRatesFlat = (globalThis as any).__disabilityRatesFlat__;

// Test findCandidateInjuries  
console.log('=== TOP 15 CANDIDATS ===\n');
const candidates = findCandidateInjuries(inputText, []);
console.log('🏆 TOP 15:', candidates.slice(0, 15).map(c => ({
    name: c.name,
    score: c.score,
    path: c.path
})));

// Test full analysis
console.log('\n=== ANALYSE COMPLÈTE ===\n');
const result = localExpertAnalysis(inputText);
console.log('Type:', result.type);
console.log('Name:', result.name);
console.log('Rate:', result.rate);
