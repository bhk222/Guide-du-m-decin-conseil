import { localExpertAnalysis } from './components/AiAnalyzer';

const text = "Circonstances : Explosion d'un pneu de camion lors du gonflage au visage du garagiste. Bilan initial : Fractures type Le Fort III, éclatement du globe oculaire droit. Séquelles à la consolidation (18 mois) : Cécité totale de l'œil droit (énucléation avec pose de prothèse oculaire). Troubles de l'articulé dentaire et difficulté de mastication. Anesthésie dans le territoire du nerf sous-orbitaire (V2) et préjudice esthétique majeur.";

const r = localExpertAnalysis(text, []);
console.log('=== RÉSULTAT ===');
console.log('TYPE:', r.type);
console.log('NAME:', r.name || (r as any).description);
console.log('RATE:', r.rate);
console.log('PATH:', (r as any).path);

// Expected: cumul with at least 4 sequelae (vision ~30% + Le Fort ~15% + mastication ~10% + V2 ~5%)
const nameOk = /polytraumatisme.*cervico|cranio.*facial|cumul/i.test(r.name || (r as any).description || '');
const rateOk = typeof r.rate === 'number' && r.rate >= 40;
console.log(`\nPolytrauma CCF: ${nameOk ? '✅' : '❌'}`);
console.log(`Taux >= 40%: ${rateOk ? '✅' : '❌'}`);
console.log(nameOk && rateOk ? '\n✅ TEST PASSED' : '\n❌ TEST FAILED');
