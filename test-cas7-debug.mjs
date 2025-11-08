import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

const cas7 = 'Cycliste 32 ans, chute avec fracture clavicule gauche (non dominante), consolidation anatomique parfaite, pas de cal vicieux, mobilité épaule complète, pas de douleur résiduelle, reprise activité sportive sans limitation.';

console.log('🔍 DEBUG CAS 7');
console.log('');

const result = localExpertAnalysis(cas7);

if (result.type === 'ambiguity') {
    console.log('Type: AMBIGUÏTÉ');
    console.log('Choices:');
    result.choices?.forEach((c, i) => {
        console.log(`  ${i + 1}. ${c.name}`);
        console.log(`     IPP: ${Array.isArray(c.rate) ? '[' + c.rate.join('-') + ']%' : c.rate + '%'}`);
    });
} else {
    console.log('Type: RESULT');
    console.log('Lésion:', result.name);
    console.log('IPP:', result.rate + '%');
}
