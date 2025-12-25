import { localExpertAnalysis } from './components/AiAnalyzer';

console.log('═══════════════════════════════════════════════════════════════');
console.log('TEST: FRACTURE EXTRÉMITÉ SUPÉRIEURE TIBIA + FIBULA + BOITERIE');
console.log('═══════════════════════════════════════════════════════════════\n');

const casPatient = "Agé de 55 an victime d'un at le 03/09/2025 a l'origine de fracture de l'extremité superieur du tibia et fracture communitive metahyso epiphysaire du fibula sequelles marche avec boitrie";

console.log('📋 DESCRIPTION PATIENT:');
console.log(`"${casPatient}"\n`);

console.log('🎯 ATTENDU:');
console.log('Lésion: Fracture des plateaux tibiaux - Avec déviation et/ou raideur');
console.log('Taux: [10-30%] → Partie HAUTE (≥20%) car:');
console.log('  - Extrémité supérieure tibia = Plateaux tibiaux (genou)');
console.log('  - Fracture comminutive fibula associée (traumatisme sévère)');
console.log('  - Boiterie séquellaire\n');

console.log('═══════════════════════════════════════════════════════════════');
console.log('🧪 RÉSULTAT APPLICATION:\n');

const result = localExpertAnalysis(casPatient);

if (result.type === 'proposal') {
    console.log(`✅ Type: ${result.type}`);
    console.log(`📌 Lésion détectée: ${result.name}`);
    console.log(`💯 Taux IPP: ${result.rate}%`);
    console.log(`📍 Barème: ${result.path}`);
    
    if (Array.isArray(result.injury?.rate)) {
        console.log(`📊 Fourchette barème: [${result.injury.rate[0]}-${result.injury.rate[1]}%]`);
    }
    
    console.log(`\n📝 JUSTIFICATION:\n${result.justification.replace(/<[^>]*>/g, '')}\n`);
    
    // Validation
    const isCorrectInjury = result.name.toLowerCase().includes('plateaux tibiaux') || result.name.toLowerCase().includes('plateau tibial');
    const isInHighRange = result.rate >= 20 && result.rate <= 30;
    
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('🔍 VALIDATION:');
    console.log(`${isCorrectInjury ? '✅' : '❌'} Lésion correcte: ${isCorrectInjury ? 'OUI' : 'NON'}`);
    console.log(`${isInHighRange ? '✅' : '⚠️'} Taux approprié: ${isInHighRange ? 'OUI (partie haute)' : 'À VÉRIFIER'}`);
    
    if (isCorrectInjury && isInHighRange) {
        console.log('\n🎉 TEST RÉUSSI - Détection correcte!');
    } else {
        console.log('\n⚠️ TEST PARTIELLEMENT RÉUSSI - Vérifier la calibration');
    }
    
} else if (result.type === 'ambiguity') {
    console.log('❓ Type: Ambiguïté détectée');
    console.log(`Message: ${result.text}`);
    console.log('\nChoix proposés:');
    result.choices.forEach((choice, i) => {
        console.log(`  ${i + 1}. ${choice.name} - ${Array.isArray(choice.rate) ? `[${choice.rate[0]}-${choice.rate[1]}%]` : `${choice.rate}%`}`);
    });
} else if (result.type === 'cumul_proposals') {
    console.log('⚠️ Type: Cumul de lésions détecté');
    console.log(`Nombre de lésions: ${result.lesionCount}`);
} else {
    console.log('❌ Aucun résultat trouvé');
    console.log(`Message: ${result.text}`);
}

console.log('\n═══════════════════════════════════════════════════════════════');
