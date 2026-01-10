// Test V3.3.140 - Explications détaillées du taux IPP donné
import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

const casPatient = `Age de 28 ans, manœuvre ETP. L'accident : Victime d'un AT le 24.08.2024. au moment de nettoyage d'un balcon il a chuté d'une hauteur de 11 mètres environ. Lésion : Occasionnant une fracture complexe trochantéro-diaphysaire droite. Traitement : traitée chirurgicalement par Matériel d'Ostéosynthèse. Examen clinique : Marche avec canne Latéralisation normale . Accroupissement possible mais difficile et indolore . Cicatrice de l'intervention de 25 cm au niveau de la face externe de la cuisse droite. Mouvements de la hanche droite comme libre.`;

console.log('═'.repeat(90));
console.log('🧪 TEST V3.3.140 - EXPLICATIONS DÉTAILLÉES IPP');
console.log('═'.repeat(90));
console.log('\n📋 CAS PATIENT:');
console.log(casPatient);
console.log('\n' + '─'.repeat(90));
console.log('⏳ ANALYSE EN COURS...\n');

try {
    const result = localExpertAnalysis(casPatient);
    
    console.log('✅ RÉSULTAT ANALYSE IA:');
    console.log('═'.repeat(90));
    console.log(`\n📌 Type: ${result.type}`);
    console.log(`📌 Lésion détectée: ${result.name}`);
    console.log(`💯 Taux IPP calculé: ${result.rate}%`);
    console.log(`📍 Chemin barémique: ${result.path}`);
    
    if (Array.isArray(result.injury?.rate)) {
        console.log(`📊 Fourchette barème: [${result.injury.rate[0]}-${result.injury.rate[1]}%]`);
    } else {
        console.log(`📊 Taux barème: ${result.injury?.rate}%`);
    }
    
    console.log('\n' + '═'.repeat(90));
    console.log('📝 JUSTIFICATION DÉTAILLÉE:');
    console.log('═'.repeat(90));
    
    // Extraire le texte HTML et l'afficher proprement
    const justificationText = result.justification
        .replace(/<br>/g, '\n')
        .replace(/<br\/>/g, '\n')
        .replace(/<strong>/g, '')
        .replace(/<\/strong>/g, '')
        .replace(/<em>/g, '"')
        .replace(/<\/em>/g, '"')
        .replace(/<div[^>]*>/g, '\n┌─────────────────────────────────────────────────────────────────────────────┐\n')
        .replace(/<\/div>/g, '\n└─────────────────────────────────────────────────────────────────────────────┘\n')
        .replace(/<ul>/g, '')
        .replace(/<\/ul>/g, '')
        .replace(/<li>/g, '  • ')
        .replace(/<\/li>/g, '')
        .replace(/<span[^>]*>/g, '')
        .replace(/<\/span>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/<[^>]*>/g, ''); // Supprimer tous les autres tags HTML
    
    console.log(justificationText);
    
    console.log('\n' + '═'.repeat(90));
    console.log('🎯 VALIDATION:');
    console.log('═'.repeat(90));
    
    // Critères de validation
    const attenduMin = 8;
    const attenduMax = 10;
    const isValid = result.rate >= attenduMin && result.rate <= attenduMax;
    
    console.log(`\n✓ Taux attendu : [${attenduMin}-${attenduMax}%] (Bonne consolidation avec séquelles fonctionnelles)`);
    console.log(`✓ Taux obtenu : ${result.rate}%`);
    console.log(`✓ Lésion attendue : "Fracture du massif trochantérien - Bonne consolidation"`);
    console.log(`✓ Lésion obtenue : "${result.name}"`);
    
    const lesionCorrecte = result.name.toLowerCase().includes('trochant') && 
                           result.name.toLowerCase().includes('bonne consolidation');
    
    console.log(`\n📊 RÉSULTAT:`);
    if (isValid && lesionCorrecte) {
        console.log('✅ VALIDÉ À 100% - Lésion et taux IPP corrects');
        console.log('\n💡 EXPLICATIONS FOURNIES:');
        console.log('  ✓ Section "Pourquoi ce barème ?"');
        console.log('  ✓ Comparaison avec autres barèmes (cal vicieux, raideur)');
        console.log('  ✓ Analyse des critères cliniques');
        console.log('  ✓ Justification du positionnement dans la fourchette');
    } else if (lesionCorrecte && !isValid) {
        console.log('⚠️ PARTIELLEMENT VALIDÉ - Lésion correcte mais taux à ajuster');
        console.log(`   Écart: ${result.rate - (attenduMin + attenduMax) / 2} points`);
    } else if (!lesionCorrecte && isValid) {
        console.log('⚠️ PARTIELLEMENT VALIDÉ - Taux correct mais mauvaise lésion');
    } else {
        console.log('❌ NON VALIDÉ - Lésion et/ou taux incorrects');
    }
    
    // Vérifier présence des nouvelles sections
    console.log('\n🔍 CONTRÔLE QUALITÉ DES EXPLICATIONS:');
    const hasComparativeSection = result.justification.includes('POURQUOI CE BARÈME') || 
                                   result.justification.includes('Analyse comparative');
    const hasBaremeDistinction = result.justification.includes('Bonne consolidation') && 
                                  result.justification.includes('Cal vicieux');
    const hasClinicalDetails = result.justification.includes('Résumé clinique') || 
                               result.justification.includes('Analyse anatomo');
    
    console.log(`  ✓ Section comparative "Pourquoi ce barème ?": ${hasComparativeSection ? '✅ Présente' : '❌ Absente'}`);
    console.log(`  ✓ Distinction des barèmes fracture: ${hasBaremeDistinction ? '✅ Présente' : '❌ Absente'}`);
    console.log(`  ✓ Détails cliniques: ${hasClinicalDetails ? '✅ Présents' : '❌ Absents'}`);
    
    console.log('\n' + '═'.repeat(90));
    
} catch (error) {
    console.error('\n❌ ERREUR:', error.message);
    console.error(error.stack);
}
