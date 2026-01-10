import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

console.log('════════════════════════════════════════════════════════════════════════════════════');
console.log('🧪 TEST CUMUL - FRACTURE RADIUS + LOMBALGIE POST-TRAUMATIQUE');
console.log('════════════════════════════════════════════════════════════════════════════════════\n');

const casPatient = `Un homme de 42 ans, ouvrier manutentionnaire, a été victime d'un accident de travail lors de la manipulation d'une charge lourde. Il a glissé et chuté sur le membre supérieur droit, avec un mouvement brutal du rachis lombaire. L'accident a été immédiatement déclaré et reconnu comme accident de travail. L'examen clinique et radiologique a mis en évidence une fracture fermée de l'extrémité inférieure du radius droit, traitée par immobilisation plâtrée, ainsi qu'une lombalgie post-traumatique secondaire à une entorse lombaire. L'évolution a été marquée par une consolidation osseuse avec persistance de douleurs et d'une limitation fonctionnelle modérée du poignet droit, associée à des lombalgies mécaniques à l'effort. Après un arrêt de travail de trois mois, l'état est considéré comme consolidé avec des séquelles fonctionnelles légères. Les lésions présentent un lien direct et certain avec l'accident de travail.`;

console.log('📋 CAS PATIENT:');
console.log(casPatient);
console.log('\n────────────────────────────────────────────────────────────────────────────────────\n');

console.log('⏳ ANALYSE EN COURS...\n');

const result = localExpertAnalysis(casPatient);

console.log('✅ RÉSULTAT ANALYSE IA:');
console.log('════════════════════════════════════════════════════════════════════════════════════\n');
console.log('📌 Type:', result.type);
console.log('📌 Lésion(s) détectée(s):', result.name);
console.log('💯 Taux IPP calculé:', result.rate + '%');
console.log('📍 Chemin barémique:', result.path || 'N/A');

if (result.injuries && result.injuries.length > 0) {
    console.log('\n🔍 DÉTAIL DES LÉSIONS (' + result.injuries.length + '):');
    result.injuries.forEach((inj, idx) => {
        console.log(`\n  ${idx + 1}. ${inj.name}`);
        console.log(`     Taux: ${inj.rate}%`);
        console.log(`     Chemin: ${inj.path}`);
    });
}

console.log('\n════════════════════════════════════════════════════════════════════════════════════');
console.log('🎯 VALIDATION:');
console.log('════════════════════════════════════════════════════════════════════════════════════\n');

console.log('✓ Lésions attendues:');
console.log('  1. Fracture extrémité inférieure radius droit avec limitation (Main Dominante): 10-15% IPP');
console.log('  2. Entorse lombaire avec lombalgies mécaniques: 5-10% IPP');
console.log('  → CUMUL attendu: environ 15-24% IPP (formule Balthazard)\n');

const hasRadiusFracture = result.name.toLowerCase().includes('radius') || 
                          result.name.toLowerCase().includes('poignet');
const hasLombalgie = result.name.toLowerCase().includes('lombaire') || 
                     result.name.toLowerCase().includes('rachis') ||
                     result.name.toLowerCase().includes('entorse');

console.log('✓ Détection Fracture radius:', hasRadiusFracture ? '✅ OUI' : '❌ NON');
console.log('✓ Détection Lombalgie/Entorse lombaire:', hasLombalgie ? '✅ OUI' : '❌ NON');
console.log('✓ Cumul détecté:', (result.type === 'cumul' || (result.injuries && result.injuries.length > 1)) ? '✅ OUI' : '❌ NON');
console.log('✓ Taux obtenu:', result.rate + '%');

console.log('\n📊 RÉSULTAT:');
if (result.type === 'cumul' && result.injuries && result.injuries.length >= 2) {
    console.log('✅ VALIDÉ - Cumul correctement détecté avec ' + result.injuries.length + ' lésions');
} else if (hasRadiusFracture && hasLombalgie && result.injuries && result.injuries.length >= 2) {
    console.log('✅ VALIDÉ - Les 2 lésions sont détectées');
} else if (hasRadiusFracture && !hasLombalgie) {
    console.log('❌ ÉCHEC - Seule la fracture radius est détectée, lombalgie manquante');
    console.log('⚠️  Le système ne détecte PAS le cumul de lésions');
} else {
    console.log('❌ ÉCHEC - Détection incomplète des lésions');
}

console.log('\n════════════════════════════════════════════════════════════════════════════════════');
