import { localExpertAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST CAS POLYTRAUMATISME OUVRIER BÂTIMENT\n');
console.log('═'.repeat(80));

const casDescription = `Homme de 42 ans, ouvrier du bâtiment, victime d'un accident de travail suite à une chute d'un échafaudage d'environ 3 mètres. Les lésions constatées comprennent : fracture de la clavicule droite, fractures costales multiples, contusion pulmonaire droite avec pneumothorax minime, entorse grave du genou gauche et traumatisme crânien léger. La prise en charge a été médico-chirurgicale avec immobilisation, traitement antalgique et rééducation fonctionnelle. Après consolidation, persistent des séquelles fonctionnelles à type de limitation de l'épaule droite, instabilité du genou gauche et gêne respiratoire modérée à l'effort.`;

console.log('📋 DESCRIPTION:\n');
console.log(casDescription);
console.log('\n' + '═'.repeat(80));

console.log('\n🎯 IPP ATTENDU: 30-40%');
console.log('\n📊 LÉSIONS ATTENDUES:');
console.log('  1. Fracture clavicule + limitation épaule droite → 8-12%');
console.log('  2. Fractures costales + gêne respiratoire → 8-15%');
console.log('  3. Entorse grave genou gauche + instabilité → 12-20%');
console.log('  4. Traumatisme crânien léger → 0-5%');
console.log('\n💡 Formule Balthazar: 10% + 12% + 15% + 3% ≈ 35%');

console.log('\n' + '═'.repeat(80));
console.log('\n⏳ ANALYSE EN COURS...\n');

try {
    const result = localExpertAnalysis(casDescription);
    
    console.log('✅ RÉSULTAT ANALYSE IA:');
    console.log('─'.repeat(70));
    
    if (result.type === 'cumul_proposals') {
        const lesions = (result as any).proposals || [];
        console.log(`🔗 TYPE: CUMUL DE LÉSIONS (${lesions.length} lésions détectées)`);
        console.log('\n📋 DÉTAIL DES LÉSIONS:\n');
        
        let totalIPP = 0;
        lesions.forEach((lesion: any, index: number) => {
            const rate = Array.isArray(lesion.injury?.rate) 
                ? Math.round((lesion.injury.rate[0] + lesion.injury.rate[1]) / 2)
                : lesion.injury?.rate || 0;
            
            console.log(`  ${index + 1}. ${lesion.injury?.name || 'Lésion inconnue'}`);
            console.log(`     📊 IPP: ${rate}%`);
            console.log(`     📝 Description: ${lesion.description}`);
            console.log('');
            
            if (index === 0) {
                totalIPP = rate;
            } else {
                totalIPP = totalIPP + rate * (100 - totalIPP) / 100;
            }
        });
        
        const finalIPP = Math.ceil(totalIPP);
        console.log('─'.repeat(70));
        console.log(`💯 IPP TOTAL (Balthazar): ${finalIPP}%`);
        
        // Validation
        const isValid = finalIPP >= 30 && finalIPP <= 40;
        console.log(`\n${isValid ? '✅' : '⚠️'} VALIDATION: ${isValid ? 'CORRECT' : 'HORS FOURCHETTE'} (attendu: 30-40%)`);
        
        // Vérifier si toutes les lésions importantes sont détectées
        const lesionNames = lesions.map((l: any) => normalize(l.injury?.name || ''));
        const hasClavicule = lesionNames.some((n: string) => n.includes('clavicule') || n.includes('epaule'));
        const hasCostales = lesionNames.some((n: string) => n.includes('costal') || n.includes('thorax') || n.includes('respiratoire') || n.includes('cote'));
        const hasGenou = lesionNames.some((n: string) => n.includes('genou') || n.includes('entorse') || n.includes('lca') || n.includes('ligament croise'));
        const hasCranien = lesionNames.some((n: string) => n.includes('cranien') || n.includes('crane') || n.includes('tete') || n.includes('traumatisme'));
        
        console.log('\n📊 LÉSIONS DÉTECTÉES:');
        console.log(`  ${hasClavicule ? '✅' : '❌'} Clavicule/Épaule`);
        console.log(`  ${hasCostales ? '✅' : '❌'} Fractures costales/Thorax`);
        console.log(`  ${hasGenou ? '✅' : '❌'} Genou (entorse + instabilité)`);
        console.log(`  ${hasCranien ? '✅' : '❌'} Traumatisme crânien`);
        
        const allDetected = hasClavicule && hasCostales && hasGenou && hasCranien;
        console.log(`\n${allDetected ? '✅✅✅' : '⚠️'} ${allDetected ? 'TOUTES LES LÉSIONS DÉTECTÉES' : 'LÉSIONS MANQUANTES'}`);
        
    } else if (result.type === 'proposal') {
        console.log(`❌ TYPE: LÉSION UNIQUE (devrait être CUMUL)`);
        console.log(`📌 Lésion: ${result.name}`);
        console.log(`📊 IPP: ${result.rate}%`);
    } else if (result.type === 'ambiguity') {
        console.log(`⚠️ TYPE: AMBIGUÏTÉ`);
        console.log(`📝 Message: ${result.text}`);
        console.log(`📊 Choix: ${result.choices?.length || 0}`);
    } else {
        console.log(`❌ TYPE: ${result.type}`);
        console.log(`📝 Message: ${result.text || 'Aucun résultat'}`);
    }
    
} catch (error) {
    console.error('❌ ERREUR:', error);
}

console.log('\n' + '═'.repeat(80));

function normalize(text: string): string {
    return text.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/['']/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
}
