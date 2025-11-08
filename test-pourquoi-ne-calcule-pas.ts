// Test : Versions simplifiées du cas

const versions = [
    {
        name: "VERSION 1 - Texte complet utilisateur",
        text: `Ouvrier métallurgiste de 42 ans, main droite coincée dans une presse hydraulique défectueuse lors du repositionnement d'une tôle. Transporté d'urgence à l'hôpital avec perte sanguine importante. 2. Constatations cliniques : Amputation transcarpienne, plaies contuses multiples, fracture ouverte du radius distal, délabrement tendineux et cutané. Mobilité nulle du poignet, douleurs neuropathiques majeures. 3. Examens complémentaires : Radiographie : fracture comminutive du radius distal. EMG : lésion complète du nerf médian. 4. Discussion médico-légale : Accident typique du travail, survenu dans l'exercice des fonctions. Les séquelles sont majeures : perte fonctionnelle totale de la main dominante, douleur neuropathique chronique, troubles du sommeil, gêne sociale importante. 5. Conclusion : Amputation fonctionnelle du membre supérieur dominant.`
    },
    {
        name: "VERSION 2 - Section clinique uniquement",
        text: "Amputation transcarpienne, plaies contuses multiples, fracture ouverte du radius distal, délabrement tendineux et cutané. Mobilité nulle du poignet, douleurs neuropathiques majeures."
    },
    {
        name: "VERSION 3 - Séquelle principale seule",
        text: "Amputation transcarpienne de la main droite"
    },
    {
        name: "VERSION 4 - Conclusion seule",
        text: "Amputation fonctionnelle du membre supérieur dominant"
    },
    {
        name: "VERSION 5 - Description directe",
        text: "perte fonctionnelle totale de la main dominante"
    }
];

console.log('═══════════════════════════════════════════════════════════════');
console.log('ANALYSE: POURQUOI "Je ne peux pas encore calculer" ?');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log('🔍 HYPOTHÈSES À TESTER:\n');
console.log('H1. Texte trop long → Détecte lésions multiples mais pas assez précises');
console.log('H2. Trop de "AVEC" → Active mode cumul sans séparer correctement');
console.log('H3. Analyse retourne no_result au lieu de proposal');
console.log('H4. Détection cumul bloque l\'analyse normale\n');

console.log('═══════════════════════════════════════════════════════════════\n');

for (const version of versions) {
    console.log(`📝 ${version.name}`);
    console.log(`   Longueur: ${version.text.length} caractères`);
    
    // Comptage "AVEC"
    const avecCount = (version.text.match(/\s+avec\s+/gi) || []).length;
    console.log(`   Séparateurs "AVEC": ${avecCount}`);
    
    // Test règles expertes
    const rule1 = /amputation\s+(?:trans)?carpien/i;
    const rule2 = /(?:perte|amputation).*(?:totale|fonctionnelle).*main/i;
    
    const match1 = rule1.test(version.text);
    const match2 = rule2.test(version.text);
    
    console.log(`   Règle "transcarpienne": ${match1 ? '✅' : '❌'}`);
    console.log(`   Règle "perte fonctionnelle": ${match2 ? '✅' : '❌'}`);
    
    if (match1 || match2) {
        console.log(`   → DEVRAIT retourner type='proposal' avec amputation main\n`);
    } else {
        console.log(`   → Aucune règle experte → semantic search\n`);
    }
}

console.log('═══════════════════════════════════════════════════════════════');
console.log('💡 RECOMMANDATION UTILISATEUR:');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log('Pour un cas aussi complexe, l\'utilisateur devrait :');
console.log('1. Décrire UNIQUEMENT la séquelle principale : "Amputation transcarpienne main droite"');
console.log('2. OU utiliser la conclusion : "Amputation fonctionnelle membre supérieur dominant"');
console.log('3. ÉVITER de copier-coller tout le rapport médical\n');

console.log('Les lésions associées (fracture radius, nerf médian) sont déjà');
console.log('incluses dans le taux d\'amputation → Pas besoin de les mentionner.\n');
