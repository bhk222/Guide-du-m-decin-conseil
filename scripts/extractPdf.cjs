// Script CommonJS pour extraire le PDF
const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

// Fonction pour parser le texte et extraire les actes médicaux
function parsePdfText(text) {
    const actes = [];
    const lines = text.split('\n');
    
    console.log(`📝 Nombre de lignes à analyser: ${lines.length}`);
    
    // Patterns regex multiples pour capturer différents formats
    const patterns = [
        // Format: CODE Libellé Tarif Coefficient
        /^([A-Z0-9]{1,15})\s+(.{10,100}?)\s+(\d{1,6}[.,]?\d{0,2})\s*(?:DA|da)?\s*[xX×]?\s*(\d+[.,]?\d*)?/i,
        // Format avec tirets: CODE - Libellé - Tarif
        /^([A-Z0-9]{1,15})\s*[-–]\s*(.{10,100}?)\s*[-–]\s*(\d{1,6}[.,]?\d{0,2})\s*(?:DA|da)?/i,
        // Format compact: CODE Libellé Prix
        /^([A-Z0-9]{1,10})\s+([A-Za-zÀ-ÿ\s\-'()]+)\s+(\d{2,6})/,
    ];

    let compteur = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || line.length < 5) continue;
        
        // Ignorer les en-têtes et titres
        if (line.match(/^(CHAPITRE|SECTION|TITRE|Page|Nomenclature|Tableau)/i)) continue;

        for (const pattern of patterns) {
            const match = line.match(pattern);
            if (match) {
                let [, code, libelle, tarifStr, coefStr] = match;
                
                // Nettoyer le code
                code = code.trim().toUpperCase().replace(/[^\w]/g, '');
                
                // Nettoyer le libellé
                libelle = libelle.trim().replace(/\s+/g, ' ');
                
                // Convertir le tarif
                const tarif = parseFloat(tarifStr.replace(',', '.').replace(/\s/g, ''));
                
                // Coefficient
                let coefficient = 1;
                if (coefStr) {
                    coefficient = parseFloat(coefStr.replace(',', '.'));
                }
                
                // Déterminer la catégorie
                let categorie = 'Autre';
                const libelleLower = libelle.toLowerCase();
                
                if (libelleLower.includes('consult')) categorie = 'Consultation';
                else if (libelleLower.includes('visite')) categorie = 'Visite';
                else if (libelleLower.includes('chirurg') || libelleLower.includes('opérat')) categorie = 'Chirurgie';
                else if (libelleLower.includes('radio') || libelleLower.includes('échograph') || libelleLower.includes('scanner') || libelleLower.includes('irm')) categorie = 'Imagerie';
                else if (libelleLower.includes('anesthé')) categorie = 'Anesthésie';
                else if (libelleLower.includes('pansement') || libelleLower.includes('soin') || libelleLower.includes('injection')) categorie = 'Soins';
                else if (libelleLower.includes('analys') || libelleLower.includes('biolog') || libelleLower.includes('labora')) categorie = 'Biologie';
                else if (libelleLower.includes('kiné') || libelleLower.includes('rééduc') || libelleLower.includes('reeduc')) categorie = 'Kinésithérapie';
                else if (libelleLower.includes('accouchement') || libelleLower.includes('sage-femme') || libelleLower.includes('obstétric')) categorie = 'Obstétrique';
                else if (libelleLower.includes('dentaire') || libelleLower.includes('dent') || libelleLower.includes('stomatol')) categorie = 'Dentaire';
                else if (libelleLower.includes('cardiolog')) categorie = 'Cardiologie';
                else if (libelleLower.includes('ophtalm')) categorie = 'Ophtalmologie';
                else if (libelleLower.includes('orl') || libelleLower.includes('oto-rhino')) categorie = 'ORL';
                else if (libelleLower.includes('dermato')) categorie = 'Dermatologie';
                else if (libelleLower.includes('gynéco')) categorie = 'Gynécologie';
                else if (libelleLower.includes('pédiatr')) categorie = 'Pédiatrie';
                else if (libelleLower.includes('urolog')) categorie = 'Urologie';
                else if (libelleLower.includes('neurolog')) categorie = 'Neurologie';
                else if (libelleLower.includes('gastr') || libelleLower.includes('endoscop')) categorie = 'Gastro-entérologie';

                // Validation
                if (tarif > 0 && code.length >= 1 && libelle.length >= 5) {
                    actes.push({
                        code,
                        libelle,
                        tarif,
                        coefficient,
                        categorie
                    });
                    compteur++;
                    
                    // Log tous les 100 actes
                    if (compteur % 100 === 0) {
                        console.log(`   ✓ ${compteur} actes extraits...`);
                    }
                }
                break;
            }
        }
    }

    console.log(`\n✅ Total extrait: ${compteur} actes`);
    
    // Dédupliquer par code
    const seen = new Map();
    const actesUniques = [];
    
    for (const acte of actes) {
        if (!seen.has(acte.code)) {
            seen.set(acte.code, true);
            actesUniques.push(acte);
        }
    }
    
    console.log(`📊 Après déduplication: ${actesUniques.length} actes uniques`);

    return actesUniques;
}

// Fonction principale
async function extractPdfToJson() {
    try {
        console.log('\n═══════════════════════════════════════════════════');
        console.log('🔍 EXTRACTION DU PDF acte.pdf');
        console.log('═══════════════════════════════════════════════════\n');
        
        const pdfPath = path.join(__dirname, '..', 'acte.pdf');
        
        if (!fs.existsSync(pdfPath)) {
            console.error('❌ Fichier acte.pdf non trouvé !');
            process.exit(1);
        }

        console.log('✅ PDF trouvé:', pdfPath);
        console.log('📂 Taille:', (fs.statSync(pdfPath).size / 1024 / 1024).toFixed(2), 'MB');
        console.log('\n📖 Lecture et extraction du PDF...');
        console.log('   (Cela peut prendre 30-60 secondes pour un PDF de cette taille)\n');

        const dataBuffer = fs.readFileSync(pdfPath);
        const data = await PDFParse(dataBuffer);

        console.log('✅ Extraction terminée !');
        console.log('📄 Pages:', data.numpages);
        console.log('📝 Caractères:', data.text.length);
        console.log('\n🔬 Parsing des actes médicaux...\n');

        const actes = parsePdfText(data.text);

        // Statistiques
        const categories = {};
        let tarifTotal = 0;
        
        actes.forEach(acte => {
            categories[acte.categorie] = (categories[acte.categorie] || 0) + 1;
            tarifTotal += acte.tarif * (acte.coefficient || 1);
        });

        console.log('\n📊 STATISTIQUES:');
        console.log('─────────────────────────────────────────────────\n');
        console.log(`   Total actes:     ${actes.length}`);
        console.log(`   Catégories:      ${Object.keys(categories).length}`);
        console.log(`   Tarif moyen:     ${(tarifTotal / actes.length).toFixed(2)} DA`);
        
        console.log('\n📋 Répartition par catégorie:\n');
        Object.entries(categories)
            .sort((a, b) => b[1] - a[1])
            .forEach(([cat, count]) => {
                const percentage = ((count / actes.length) * 100).toFixed(1);
                console.log(`   ${cat.padEnd(25)} ${count.toString().padStart(4)} actes (${percentage}%)`);
            });

        // Sauvegarder le JSON
        const outputPath = path.join(__dirname, '..', 'data', 'nomenclature.json');
        const outputDir = path.dirname(outputPath);
        
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const jsonData = {
            version: '1.0',
            date: new Date().toISOString().split('T')[0],
            source: 'acte.pdf',
            total: actes.length,
            categories: categories,
            actes: actes
        };

        fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2), 'utf-8');

        console.log('\n💾 Sauvegarde:');
        console.log('─────────────────────────────────────────────────\n');
        console.log(`   Fichier:  ${outputPath}`);
        console.log(`   Taille:   ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);
        
        // Copier aussi vers nomenclature-static.json
        const staticPath = path.join(__dirname, '..', 'data', 'nomenclature-static.json');
        fs.writeFileSync(staticPath, JSON.stringify(jsonData, null, 2), 'utf-8');
        console.log(`   Copie:    ${staticPath}`);
        
        console.log('\n═══════════════════════════════════════════════════');
        console.log('✅ EXTRACTION TERMINÉE AVEC SUCCÈS !');
        console.log('═══════════════════════════════════════════════════\n');
        console.log('🎉 La base de données est prête à être utilisée !');
        console.log('🚀 Lancez "npm run build" puis déployez sur Vercel\n');

    } catch (error) {
        console.error('\n❌ ERREUR:', error.message);
        console.error(error);
        process.exit(1);
    }
}

// Exécuter
extractPdfToJson();
