// Debug test: Fractures/luxations métatarso-phalangiennes + valgus du pied
import { localExpertAnalysis } from './components/AiAnalyzer';

const input = `victime d'un at survenue le 01.04.2022 occasionnat un TSLO du bassin avec luxation metatarso phalangienne du O2 O3 O4 et une fracture luxation du M4 du pied gauche ; a l'examen : marche avec une legere boitrie sans tuteur externe ; sequelles douleureuse ; amp stable douleureux ; valgus du pied gauche`;

console.log('=== INPUT ===');
console.log(input);
console.log('');

const result = localExpertAnalysis(input, []);
console.log('');
console.log('========================================');
console.log('=== RÉSULTAT ANALYSE PIED/LISFRANC ===');
console.log('========================================');
console.log('TYPE:', result.type);
if (result.type === 'proposal') {
    console.log('NAME:', result.name);
    console.log('RATE:', result.rate);
    console.log('PATH:', result.path);
} else if (result.type === 'cumul_proposals') {
    console.log('CUMUL:', result.text);
    if (result.proposals) {
        for (const p of result.proposals) {
            console.log(`  - ${p.description}: ${p.injury?.name} (${p.injury?.rate}%)`);
        }
    }
} else if (result.type === 'ambiguity') {
    console.log('AMBIGUITY:', result.text);
    if (result.choices) {
        for (const c of result.choices) {
            console.log(`  - ${c.name} (${c.rate}%)`);
        }
    }
} else {
    console.log('TEXT:', result.text);
}
