import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

const cas7 = 'Cycliste 32 ans, chute avec fracture clavicule gauche (non dominante), consolidation anatomique parfaite, pas de cal vicieux, mobilité épaule complète, pas de douleur résiduelle, reprise activité sportive sans limitation.';

console.log('🧪 TEST CAS 7 - Fracture Clavicule');
console.log('');

try {
    const result = localExpertAnalysis(cas7);
    
    if (result.type === 'ambiguity') {
        console.log('❌ AMBIGUÏTÉ détectée');
        console.log('Choices:', result.choices?.length || 0);
    } else {
        console.log('✅ Résultat obtenu:');
        console.log('  Lésion:', result.name);
        console.log('  IPP:', result.rate + '%');
        console.log('  Attendu: 1-2%');
        
        if (result.rate >= 1 && result.rate <= 2) {
            console.log('  Statut: ✅ VALIDÉ');
        } else {
            console.log('  Statut: ❌ ÉCART:', result.rate - 1.5, 'points');
        }
    }
} catch (e) {
    console.error('❌ ERREUR:', e.message);
}
