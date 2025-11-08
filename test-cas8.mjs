import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

const cas8 = 'Peintre en bâtiment 48 ans, rupture transfixiante sus-épineux et sous-épineux épaule droite (dominante) après chute. Chirurgie réparatrice effectuée mais récupération partielle. Limitation abduction active à 90°, douleurs nocturnes EVA 5/10, impossibilité travaux en hauteur.';

console.log('🧪 TEST CAS 8 - Coiffe Rotateurs\n');

const result = localExpertAnalysis(cas8);

console.log('Type:', result.type);
if (result.type === 'proposal') {
    console.log('Lésion:', result.name);
    console.log('IPP:', result.rate + '%');
    console.log('Attendu: 20-35%');
} else if (result.type === 'ambiguity') {
    console.log('Ambiguïté:', result.choices?.length, 'choix');
    result.choices?.slice(0, 3).forEach((c, i) => {
        console.log(`  ${i+1}. ${c.name} - ${Array.isArray(c.rate) ? '[' + c.rate.join('-') + ']%' : c.rate + '%'}`);
    });
} else {
    console.log('Résultat:', JSON.stringify(result, null, 2).substring(0, 500));
}
