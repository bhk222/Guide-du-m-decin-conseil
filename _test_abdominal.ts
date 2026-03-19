import { localExpertAnalysis, detectMultipleLesions } from './components/AiAnalyzer';

const text = `Cariste percuté au niveau de l'abdomen par les fourches d'un autre chariot élévateur. Bilan initial : Hémopéritoine massif. Éclatement de la rate et perforation de l'intestin grêle. Séquelles à la consolidation (1 an) : Splénectomie totale (ablation de la rate), entraînant un déficit immunitaire définitif et l'obligation de vaccinations spécifiques à vie. Résection d'un segment de l'intestin grêle causant des troubles du transit chroniques (diarrhées motrices résiduelles). Éventration sur la cicatrice de laparotomie médiane.`;

console.log('=== CUMUL ===');
const cumul = detectMultipleLesions(text);
console.log(JSON.stringify(cumul));

console.log('\n=== ANALYSIS ===');
const r = localExpertAnalysis(text);
console.log('type:', r.type);
if ('name' in r) console.log('name:', r.name);
if ('rate' in r) console.log('rate:', r.rate);
if ('message' in r) console.log('message:', r.message);
if ('justification' in r) console.log('justification:', (r as any).justification?.substring(0, 200));
if ('proposals' in r && r.proposals) {
    for (const p of r.proposals) {
        console.log('  proposal:', p.name, '|', p.rate);
    }
}

// Also test individual lesions
const tests = [
    'splénectomie totale',
    'résection intestin grêle avec troubles du transit',
    'éventration sur cicatrice de laparotomie',
    'splénectomie avec déficit immunitaire',
    'diarrhées motrices résiduelles après résection intestin grêle',
];

console.log('\n=== INDIVIDUAL TESTS ===');
for (const t of tests) {
    const r2 = localExpertAnalysis(t);
    const name = 'name' in r2 ? r2.name : ('proposals' in r2 ? r2.proposals?.map((p: any) => p.name).join(' | ') : '');
    const rate = 'rate' in r2 ? r2.rate : '';
    const msg = 'message' in r2 ? r2.message : '';
    console.log(`"${t}" => ${r2.type} | ${name} ${msg} | rate=${rate}`);
}
