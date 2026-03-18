import { localExpertAnalysis } from './components/AiAnalyzer';

const text = "Circonstances : Chute d'une charge lourde de grue sur la jambe d'un docker. Bilan initial : Fracture ouverte stade III-C de Cauchois et Duparc du tibia droit avec pertes de substance osseuse et cutanée. Séquelles à la consolidation (3 ans) : Cal vicieux tibial avec désaxation. Ostéite chronique à staphylocoque doré avec fistulisation périodique nécessitant des cures d'antibiotiques itératives. Raideur majeure de la cheville droite.";

const r = localExpertAnalysis(text, []);
console.log('=== RÉSULTAT ===');
console.log('TYPE:', r.type);
console.log('NAME:', r.name || (r as any).description);
console.log('RATE:', r.rate);
console.log('PATH:', (r as any).path);
console.log('JUSTIF:', (r as any).justification?.substring(0, 500));

// Expected: 3 distinct sequelae cumulated with Balthazard:
// 1. Ostéite chronique suppurée avec fistulisation → 15-30% (barème)
// 2. Cal vicieux tibial avec désaxation → ~10-15%
// 3. Raideur majeure cheville droite → ~15%
// Cumul Balthazard → ~35-45%
const rate = r.rate || 0;
const hasMultipleSeq = /3\s*séquelles|ostéite|osteite|cal vicieux|raideur/i.test(r.name || (r as any).description || '');
console.log(`\nRate >= 35: ${rate >= 35 ? '✅' : '❌'} (got ${rate})`);
console.log(`Multiple séquelles: ${hasMultipleSeq ? '✅' : '❌'}`);
console.log(rate >= 35 ? '\n✅ TEST PASSED' : '\n❌ TEST FAILED');
