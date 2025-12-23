// Parser pour fichier texte extrait manuellement
const fs = require('fs');
const path = require('path');

function parseActesFromText(text) {
    const actes = [];
    const lines = text.split('\n');
    const seenCodes = new Set();
    
    console.log(`📝 Analyse de ${lines.length} lignes...\n`);
    
    // Patterns multiples pour capturer différents formats
    const patterns = [
        // Format nomenclature algérienne: 0001 Description ... ... 25
        /^(\d{4}(?:\/\d)?)\s+(.{10,250}?)\s+\.{2,}\s*(\d{1,6})\s*$/,
        // Format avec points séparateurs: CODE Description . . . 25
        /^(\d{4})\s+(.{10,250}?)\s+[\.•\s]{3,}\s*(\d{1,6}(?:[.,]\d{1,2})?)\s*$/,
        // Format: CODE Libellé Tarif DA
        /^(\d{4})\s+(.{15,200}?)\s+(\d{2,6}(?:[.,]\d{2})?)\s*(?:DA|da|€|euros?)?/i,
        // Format avec lettre: C001 ou K001
        /^([A-Z]\d{3,4})\s+(.{15,200}?)\s+(\d{2,6}(?:[.,]\d{2})?)\s*(?:DA|da)?/i,
        // Format avec tirets ou :
        /^([A-Z\d]{2,10})\s*[-:]\s*(.{15,200}?)\s*[-:]\s*(\d{2,6}(?:[.,]\d{2})?)\s*(?:DA|da)?/i,
    ];

    let count = 0;
    let ignored = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Ignorer lignes vides, courtes, ou en-têtes
        if (!line || line.length < 20) continue;
        if (/^(CHAPITRE|SECTION|TITRE|Page|Nomenclature|Tableau|Article)/i.test(line)) {
            ignored++;
            continue;
        }
        
        let matched = false;
        for (const pattern of patterns) {
            const match = line.match(pattern);
            if (match) {
                const [, rawCode, rawLibelle, rawTarif] = match;
                
                // Nettoyer et valider
                const code = rawCode.trim().toUpperCase().replace(/[^\w]/g, '');
                const libelle = rawLibelle.trim().replace(/\s+/g, ' ');
                const tarif = parseFloat(rawTarif.replace(',', '.').replace(/\s/g, ''));
                
                // Validation stricte
                if (
                    code.length >= 2 && code.length <= 15 &&
                    libelle.length >= 10 && libelle.length <= 250 &&
                    tarif > 0 && tarif < 1000000 &&
                    !seenCodes.has(code)
                ) {
                    seenCodes.add(code);
                    
                    // Catégorisation intelligente
                    let categorie = 'Autre';
                    const ll = libelle.toLowerCase();
                    
                    if (/\b(consult|avis médical)\b/i.test(ll)) categorie = 'Consultation';
                    else if (/\b(visite|déplacement)\b/i.test(ll)) categorie = 'Visite';
                    else if (/\b(chirurg|opérat|intervent|exérèse|suture|incision)\b/i.test(ll)) categorie = 'Chirurgie';
                    else if (/\b(radio|écho|scanner|irm|mammograph|tomograph)\b/i.test(ll)) categorie = 'Imagerie';
                    else if (/\b(anesthé|analgés)\b/i.test(ll)) categorie = 'Anesthésie';
                    else if (/\b(pansement|soin|injection|perfusion|drain)\b/i.test(ll)) categorie = 'Soins';
                    else if (/\b(analys|biolog|labora|prélèv|sang|urine)\b/i.test(ll)) categorie = 'Biologie';
                    else if (/\b(kiné|rééduc|rééducat|massage|physiothérap)\b/i.test(ll)) categorie = 'Kinésithérapie';
                    else if (/\b(accouchement|obstétric|césarienne|matern)\b/i.test(ll)) categorie = 'Obstétrique';
                    else if (/\b(dentaire|dent|stomato|bucco|extrac.*dent)\b/i.test(ll)) categorie = 'Dentaire';
                    else if (/\b(cardiolog|électrocard|ecg|échocardi|holter)\b/i.test(ll)) categorie = 'Cardiologie';
                    else if (/\b(ophtalmolog|vue|vision|rétine|cornée|cataract)\b/i.test(ll)) categorie = 'Ophtalmologie';
                    else if (/\b(orl|oto|rhino|laryn|oreille|nez|gorge)\b/i.test(ll)) categorie = 'ORL';
                    else if (/\b(dermato|peau|cutané)\b/i.test(ll)) categorie = 'Dermatologie';
                    else if (/\b(gynéco|féminin|utérus|ovaire)\b/i.test(ll)) categorie = 'Gynécologie';
                    else if (/\b(pédiatr|enfant|nourrisson)\b/i.test(ll)) categorie = 'Pédiatrie';
                    else if (/\b(urolog|rein|vessie|prostat)\b/i.test(ll)) categorie = 'Urologie';
                    else if (/\b(neurolog|cerveau|nerv|épileps)\b/i.test(ll)) categorie = 'Neurologie';
                    else if (/\b(gastro|entéro|estomac|intestin|endoscop|coloscopie)\b/i.test(ll)) categorie = 'Gastro-entérologie';
                    else if (/\b(orthopéd|os|fracture|arthros|prothèse)\b/i.test(ll)) categorie = 'Orthopédie';
                    else if (/\b(psychiatr|psycholog|mental)\b/i.test(ll)) categorie = 'Psychiatrie';
                    else if (/\b(ambulance|transport|urgence)\b/i.test(ll)) categorie = 'Transport';
                    
                    actes.push({
                        code,
                        libelle,
                        tarif,
                        coefficient: 1,
                        categorie
                    });
                    
                    count++;
                    if (count % 100 === 0) {
                        console.log(`   ✓ ${count} actes extraits...`);
                    }
                    
                    matched = true;
                    break;
                }
            }
        }
        
        if (!matched && line.length > 30 && /\d{2,}/.test(line)) {
            // Ligne potentiellement intéressante mais non matchée
            if (ignored % 50 === 0 && ignored > 0) {
                console.log(`   ⚠️  Exemple de ligne ignorée: ${line.substring(0, 80)}...`);
            }
            ignored++;
        }
    }
    
    console.log(`\n✅ Extraction terminée :`);
    console.log(`   - ${count} actes extraits`);
    console.log(`   - ${ignored} lignes ignorées`);
    
    return actes;
}

async function convertTextToJson() {
    console.log('\n═══════════════════════════════════════════════════');
    console.log('🔍 CONVERSION TEXTE → JSON');
    console.log('═══════════════════════════════════════════════════\n');
    
    const txtPath = path.join(__dirname, '..', 'acte_extracted.txt');
    
    if (!fs.existsSync(txtPath)) {
        console.error('❌ Fichier acte_extracted.txt non trouvé !');
        console.error('\n📘 Instructions :');
        console.error('   1. Ouvrez acte.pdf');
        console.error('   2. Sélectionnez tout (Ctrl+A)');
        console.error('   3. Copiez (Ctrl+C)');
        console.error('   4. Collez dans un nouveau fichier acte_extracted.txt');
        console.error('   5. Sauvegardez le fichier à la racine du projet');
        console.error('\n   Ou utilisez un convertisseur en ligne :');
        console.error('   https://www.pdf2txt.de/');
        console.error('\n');
        process.exit(1);
    }
    
    console.log('✅ Fichier trouvé:', txtPath);
    const text = fs.readFileSync(txtPath, 'utf-8');
    console.log('📂 Taille:', (text.length / 1024).toFixed(2), 'KB');
    console.log('📝 Caractères:', text.length);
    
    console.log('\n🔬 Parsing des actes médicaux...\n');
    const actes = parseActesFromText(text);
    
    if (actes.length === 0) {
        console.error('\n❌ AUCUN ACTE EXTRAIT !');
        console.error('\n🔍 Vérifiez que le fichier contient des lignes comme :');
        console.error('   C001    Consultation médecin généraliste    500 DA');
        console.error('   K012    Radiographie thorax                1200 DA');
        console.error('\n');
        process.exit(1);
    }
    
    // Statistiques
    const categories = {};
    let tarifTotal = 0;
    
    actes.forEach(acte => {
        categories[acte.categorie] = (categories[acte.categorie] || 0) + 1;
        tarifTotal += acte.tarif;
    });
    
    console.log('\n📊 STATISTIQUES:');
    console.log('═══════════════════════════════════════════════════\n');
    console.log(`   Total actes:      ${actes.length}`);
    console.log(`   Catégories:       ${Object.keys(categories).length}`);
    console.log(`   Tarif moyen:      ${(tarifTotal / actes.length).toFixed(2)} DA`);
    console.log(`   Tarif minimum:    ${Math.min(...actes.map(a => a.tarif)).toFixed(2)} DA`);
    console.log(`   Tarif maximum:    ${Math.max(...actes.map(a => a.tarif)).toFixed(2)} DA`);
    
    console.log('\n📋 Répartition par catégorie:\n');
    Object.entries(categories)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15) // Top 15 catégories
        .forEach(([cat, count]) => {
            const pct = ((count / actes.length) * 100).toFixed(1);
            const bar = '█'.repeat(Math.ceil(count / actes.length * 30));
            console.log(`   ${cat.padEnd(25)} ${count.toString().padStart(5)} (${pct.padStart(5)}%) ${bar}`);
        });
    
    // Exemples par catégorie
    console.log('\n📖 Exemples par catégorie:\n');
    Object.keys(categories).slice(0, 5).forEach(cat => {
        const exemple = actes.find(a => a.categorie === cat);
        if (exemple) {
            console.log(`   ${cat}:`);
            console.log(`      ${exemple.code} - ${exemple.libelle.substring(0, 60)}... (${exemple.tarif} DA)`);
        }
    });
    
    // Sauvegarder le JSON
    const outputPath = path.join(__dirname, '..', 'data', 'nomenclature-static.json');
    const outputDir = path.dirname(outputPath);
    
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const jsonData = {
        version: '1.0',
        date: new Date().toISOString().split('T')[0],
        source: 'acte_extracted.txt',
        total: actes.length,
        categories: categories,
        actes: actes
    };
    
    fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2), 'utf-8');
    
    console.log('\n💾 SAUVEGARDE:');
    console.log('═══════════════════════════════════════════════════\n');
    console.log(`   Fichier:  ${outputPath}`);
    console.log(`   Taille:   ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);
    
    console.log('\n═══════════════════════════════════════════════════');
    console.log('✅ CONVERSION TERMINÉE AVEC SUCCÈS !');
    console.log('═══════════════════════════════════════════════════\n');
    console.log('🚀 Prochaines étapes :');
    console.log('   1. npm run build');
    console.log('   2. git add .');
    console.log('   3. git commit -m "feat: Base de données complète"');
    console.log('   4. git push origin main');
    console.log('\n💡 Vercel déploiera automatiquement !\n');
}

convertTextToJson().catch(err => {
    console.error('\n❌ ERREUR:', err.message);
    console.error(err);
    process.exit(1);
});
