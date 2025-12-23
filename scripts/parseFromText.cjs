// Parser pour fichier texte extrait manuellement
const fs = require('fs');
const path = require('path');

function parseActesFromText(text) {
    const actes = [];
    const lines = text.split('\n');
    const seenCodes = new Set();
    
    console.log(`📝 Analyse de ${lines.length} lignes...\n`);
    
    let count = 0;
    let ignored = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Ignorer lignes vides, courtes, ou en-têtes
        if (!line || line.length < 15) continue;
        if (/^(CHAPITRE|SECTION|TITRE|Page|Nomenclature|Tableau|Article|ART\.|Chapitre|MINISTERE|SOMMAIRE)/i.test(line)) {
            ignored++;
            continue;
        }
        
        // Pattern simple : CODE au début de ligne (0XXX ou 1XXX ou codes avec /)
        const codeMatch = line.match(/^([oO0-9][\dOo]{3,4}(?:\/\d)?)\s+(.+)$/);
        if (!codeMatch) continue;
        
        let [, rawCode, reste] = codeMatch;
        
        // Nettoyer le code
        const code = rawCode.toUpperCase()
            .replace(/^[OoDd]/, '0')
            .replace(/[Oo]/g, '0')
            .replace(/\s/g, '')
            .trim();
        
        if (seenCodes.has(code)) continue;
        
        // Extraire coefficient et lettre-clé à la fin
        // Format: "LIBELLE LETTRE COEF" ou "LIBELLE COEF" ou "LIBELLE COEF TARIF"
        const withLetter = reste.match(/\s+([A-Z])\s+(\d{1,4})(?:\s+(\d{1,4}))?\s*$/);
        const withoutLetter = reste.match(/\s+(\d{1,4})(?:\s+(\d{1,4}))?\s*$/);
        
        let coefficient, lettreCle = '', tarif, numbersMatch;
        
        if (withLetter) {
            // Format: LETTRE COEF [TARIF]
            const [, lettre, num1, num2] = withLetter;
            lettreCle = lettre;
            coefficient = parseInt(num1);
            tarif = num2 ? parseInt(num2) : coefficient;
            numbersMatch = withLetter;
        } else if (withoutLetter) {
            // Format: COEF ou COEF TARIF
            const [, num1, num2] = withoutLetter;
            coefficient = parseInt(num1);
            tarif = num2 ? parseInt(num2) : coefficient;
            numbersMatch = withoutLetter;
        } else {
            continue;
        }
        
        // Libellé = tout sauf le code et la fin
        const libelle = reste.substring(0, reste.length - numbersMatch[0].length)
            .trim()
            .replace(/\s+/g, ' ')
            .replace(/[\.•o]{3,}$/g, '')
            .replace(/[\.•,;:]+$/g, '')
            .trim();
        
        // Validation
        if (
            code.length >= 4 &&
            libelle.length >= 5 &&
            libelle.length <= 300 &&
            tarif > 0 &&
            tarif < 100000 &&
            coefficient > 0 &&
            coefficient < 10000 &&
            !/^[-\d\s\.•o]+$/.test(libelle) &&
            !/^[A-Z\s\.\-]{0,10}$/.test(libelle)
        ) {
            seenCodes.add(code);
            
            // Catégorisation intelligente
            let categorie = 'Autre';
            const ll = libelle.toLowerCase();
            
            if (/\b(consult|avis médical)\b/i.test(ll)) categorie = 'Consultation';
            else if (/\b(visite|déplacement)\b/i.test(ll)) categorie = 'Visite';
            else if (/\b(chirurg|opérat|intervent|exérèse|suture|incision|extirpation|ablation|traitement sanglant)\b/i.test(ll)) categorie = 'Chirurgie';
            else if (/\b(radio|écho|scanner|irm|mammograph|tomograph|angiograph|artériograph)\b/i.test(ll)) categorie = 'Imagerie';
            else if (/\b(anesthé|analgés)\b/i.test(ll)) categorie = 'Anesthésie';
            else if (/\b(pansement|soin|injection|perfusion|drain|ponction)\b/i.test(ll)) categorie = 'Soins';
            else if (/\b(analys|biolog|labora|prélèv|sang|urine|dosage|numération)\b/i.test(ll)) categorie = 'Biologie';
            else if (/\b(kiné|rééduc|rééducat|massage|physiothérap)\b/i.test(ll)) categorie = 'Kinésithérapie';
            else if (/\b(accouchement|obstétric|césarienne|matern)\b/i.test(ll)) categorie = 'Obstétrique';
            else if (/\b(dentaire|dent|stomato|bucco|extrac.*dent)\b/i.test(ll)) categorie = 'Dentaire';
            else if (/\b(cardiolog|électrocard|ecg|échocardi|holter)\b/i.test(ll)) categorie = 'Cardiologie';
            else if (/\b(ophtalmolog|vue|vision|rétine|cornée|cataract|oeil|oculaire)\b/i.test(ll)) categorie = 'Ophtalmologie';
            else if (/\b(orl|oto|rhino|laryn|oreille|nez|gorge)\b/i.test(ll)) categorie = 'ORL';
            else if (/\b(dermato|peau|cutané)\b/i.test(ll)) categorie = 'Dermatologie';
            else if (/\b(gynéco|féminin|utérus|ovaire)\b/i.test(ll)) categorie = 'Gynécologie';
            else if (/\b(pédiatr|enfant|nourrisson)\b/i.test(ll)) categorie = 'Pédiatrie';
            else if (/\b(urolog|rein|vessie|prostat)\b/i.test(ll)) categorie = 'Urologie';
            else if (/\b(neurolog|cerveau|nerv|épileps)\b/i.test(ll)) categorie = 'Neurologie';
            else if (/\b(gastro|entéro|estomac|intestin|endoscop|coloscopie)\b/i.test(ll)) categorie = 'Gastro-entérologie';
            else if (/\b(orthopéd|os|fracture|arthros|prothèse|luxation)\b/i.test(ll)) categorie = 'Orthopédie';
            else if (/\b(psychiatr|psycholog|mental)\b/i.test(ll)) categorie = 'Psychiatrie';
            else if (/\b(ambulance|transport|urgence)\b/i.test(ll)) categorie = 'Transport';
            
            actes.push({
                code,
                libelle,
                tarif,
                coefficient,
                lettreCle,
                categorie
            });
            
            count++;
            if (count % 200 === 0) {
                console.log(`   ✓ ${count} actes extraits...`);
            }
        } else {
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
