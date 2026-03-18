import { localExpertAnalysis } from './components/AiAnalyzer';

const text = "Circonstances : Ouvrier écrasé entre un chariot élévateur et un mur de soutènement. Bilan initial : Disjonction symphysaire majeure, fracture complexe du cotyle gauche et de l'aileron sacré. Rupture de l'urètre associée. Séquelles à la consolidation (18 mois) : Ankylose serrée de la hanche gauche en mauvaise position (flexion et rotation externe). Raccourcissement du membre inférieur gauche de 4 cm. Douleurs sacro-iliaques chroniques et séquelles urologiques (sténose urétrale nécessitant des dilatations régulières).";

const r = localExpertAnalysis(text, []);
console.log('=== RÉSULTAT ===');
console.log('TYPE:', r.type);
console.log('NAME:', r.name || (r as any).description);
console.log('RATE:', r.rate);
console.log('PATH:', (r as any).path);
console.log('JUSTIF:', (r as any).justification?.substring(0, 800));

// Expected: 3-4 distinct sequelae cumulated with Balthazard:
// 1. Ankylose hanche en mauvaise position → ~40% (barème)
// 2. Raccourcissement MI 4cm → ~20%
// 3. Sténose urétrale + dilatations → 15%
// 4. Douleurs sacro-iliaques → 8%
// Cumul Balthazard → ~59-62%
const rate = r.rate || 0;
const name = r.name || (r as any).description || '';
const hasHanche = /hanche|ankylose.*hanche/i.test(name);
const hasNoVertebral = !/vert[eé]bral|spondylite|kummel/i.test(name);
const hasNoAbdomen = !/abdomen|grand.*droit/i.test(name);
console.log(`\nRate >= 50: ${rate >= 50 ? '✅' : '❌'} (got ${rate})`);
console.log(`Hanche detected: ${hasHanche ? '✅' : '❌'}`);
console.log(`No vertébral confusion: ${hasNoVertebral ? '✅' : '❌'}`);
console.log(`No abdomen confusion: ${hasNoAbdomen ? '✅' : '❌'}`);
console.log(rate >= 50 && hasNoVertebral && hasNoAbdomen ? '\n✅ TEST PASSED' : '\n❌ TEST FAILED');
