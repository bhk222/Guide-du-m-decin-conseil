import { localExpertAnalysis } from './components/AiAnalyzer';

console.log('═══════════════════════════════════════════════════════════════');
console.log('TEST: DÉSINSERTION TENDON EXTENSEUR P2 D4 AVEC RAIDEUR');
console.log('═══════════════════════════════════════════════════════════════\n');

const casPatient = "agé de 57 ans victime d'un at survenue le 12/08/2025 a l'origine de plaie de la face dorsale de la main droite au niveau du P2 D4 avec désinsertion du tendon extenseur ; sequelle raidair du D4 ; flexion limité et extension normale";

console.log('📋 DESCRIPTION PATIENT:');
console.log(`"${casPatient}"\n`);

console.log('🎯 ATTENDU:');
console.log('Lésion: Raideur d\'une articulation de l\'annulaire (Main Dominante)');
console.log('Anatomie: P2 D4 = Phalange P2 du Doigt 4 (Annulaire)');
console.log('Mécanisme: Désinsertion tendon extenseur → raideur séquellaire');
console.log('Main droite (dominante à 57 ans)');
console.log('Taux: [3-8%] → Partie moyenne (5-6%) car:');
console.log('  - Flexion limitée (impact fonctionnel modéré)');
console.log('  - Extension normale (récupération partielle)');
console.log('  - Pas de critères de sévérité majeurs\n');

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
    
    console.log(`\n📝 JUSTIFICATION:\n${result.justification.replace(/<[^>]*>/g, '').substring(0, 500)}...\n`);
    
    // Validation
    const isCorrectInjury = result.name.toLowerCase().includes('annulaire') && result.name.toLowerCase().includes('raideur');
    const isCorrectLaterality = result.name.toLowerCase().includes('dominante');
    const isInRange = result.rate >= 3 && result.rate <= 8;
    
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('🔍 VALIDATION:');
    console.log(`${isCorrectInjury ? '✅' : '❌'} Lésion correcte: ${isCorrectInjury ? 'OUI (raideur annulaire)' : 'NON'}`);
    console.log(`${isCorrectLaterality ? '✅' : '❌'} Latéralité: ${isCorrectLaterality ? 'OUI (main dominante)' : 'NON'}`);
    console.log(`${isInRange ? '✅' : '⚠️'} Taux approprié: ${isInRange ? 'OUI (fourchette 3-8%)' : 'À VÉRIFIER'}`);
    
    if (isCorrectInjury && isCorrectLaterality && isInRange) {
        console.log('\n🎉 TEST RÉUSSI - Détection correcte!');
    } else {
        console.log('\n⚠️ TEST PARTIELLEMENT RÉUSSI - Vérifier les critères');
    }
    
} else if (result.type === 'ambiguity') {
    console.log('❓ Type: Ambiguïté détectée');
    console.log(`Message: ${result.text}`);
    console.log('\nChoix proposés:');
    result.choices.forEach((choice, i) => {
        console.log(`  ${i + 1}. ${choice.name} - ${Array.isArray(choice.rate) ? `[${choice.rate[0]}-${choice.rate[1]}%]` : `${choice.rate}%`}`);
    });
    
    // Validation
    const hasCorrectChoice = result.choices.some(c => 
        c.name.toLowerCase().includes('annulaire') && c.name.toLowerCase().includes('raideur')
    );
    console.log(`\n${hasCorrectChoice ? '✅' : '❌'} Choix correct proposé: ${hasCorrectChoice ? 'OUI' : 'NON'}`);
    
} else if (result.type === 'cumul_proposals') {
    console.log('⚠️ Type: Cumul de lésions détecté');
    console.log(`Nombre de lésions: ${result.lesionCount}`);
} else {
    console.log('❌ Aucun résultat trouvé');
    console.log(`Message: ${result.text}`);
}

console.log('\n═══════════════════════════════════════════════════════════════');
