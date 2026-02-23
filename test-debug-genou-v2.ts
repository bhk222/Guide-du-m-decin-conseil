import { findCandidateInjuries, localExpertAnalysis } from './components/AiAnalyzer';

const cas = "Trauma genou gauche Fracture metaphysio-epiphysaire extremite superieure tibia et fibula Fracture extremite superieure tibia Traitement orthopedique marche avec bequille gauche boiterie a la marche Flexion extension genou gauche tres reduite et douloureuse Force musculaire tres faible Amyotrophie Cuisse gauche";

console.log('=== TOP 15 CANDIDATS ===\n');
const candidates = findCandidateInjuries(cas);
candidates.slice(0, 15).forEach((c, i) => {
  console.log(`${i+1}. [${c.score.toFixed(0)}] ${c.injury.name} => rate=${JSON.stringify(c.injury.rate)}`);
});

console.log('\n=== RESULTAT FINAL ===\n');
const result = localExpertAnalysis(cas);
console.log('Type:', result.type);
if (result.type === 'proposal') {
  console.log('Name:', result.name);
  console.log('Rate:', result.rate);
}
