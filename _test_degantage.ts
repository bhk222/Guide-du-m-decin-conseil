import { localExpertAnalysis, detectMultipleLesions } from './components/AiAnalyzer';

const text = `Circonstances : Ouvrier de carrière dont la jambe a été écrasée et étirée sous la chenille d'une pelleteuse. Bilan initial : Lésion de dégantage cutané et sous-cutané de toute la circonférence de la jambe droite. Aucune fracture, mais destruction du réseau lymphatique et veineux superficiel. Séquelles à la consolidation (2 ans) : Multiples greffes de peau en filet, cicatrices inesthétiques et fragiles. Stase veineuse et lymphatique majeure (lymphœdème/éléphantiasis) de la jambe droite nécessitant le port continu de bas de contention de classe IV. Ulcères trophiques récidivants sur la cheville.`;

const cumul = detectMultipleLesions(text);
console.log('=== CUMUL DETECTION ===');
console.log(JSON.stringify(cumul));

const result = localExpertAnalysis(text);
console.log('\n=== RESULT ===');
console.log('type:', result.type);
if ('name' in result) console.log('name:', result.name);
if ('rate' in result) console.log('rate:', result.rate);
if ('proposals' in result && result.proposals) {
    for (const p of result.proposals) {
        console.log('  proposal:', p.name, '|', p.rate);
    }
}

// Test shorter variants
const tests = [
    'dégantage cutané jambe droite avec lymphoedème',
    'lymphoedème chronique jambe post-traumatique avec ulcères trophiques',
    'lymphœdème jambe droite post-traumatique',
    'troubles trophiques oedème chronique varices jambe',
    'ulcères trophiques récidivants cheville',
    'greffes de peau en filet jambe cicatrices',
];

for (const t of tests) {
    const r = localExpertAnalysis(t);
    const name = 'name' in r ? r.name : ('proposals' in r ? r.proposals?.map((p: any) => p.name).join(' | ') : '');
    const rate = 'rate' in r ? r.rate : '';
    console.log(`\n"${t}" => ${r.type} | ${name} | rate=${rate}`);
}
