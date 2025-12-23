// Script pour extraire les données du PDF et générer un fichier JSON
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pdfParse from 'pdf-parse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fonction pour parser le texte et extraire les actes médicaux
function parsePdfText(text) {
    const actes = [];
    const lines = text.split('\n');
    
    // Regex pour détecter les patterns courants
    const patterns = [
        // Pattern 1: CODE  Libellé  Tarif  Coef
        /^([A-Z0-9]+)\s+(.+?)\s+(\d+[.,]?\d*)\s*DA?\s*[xX×]?\s*(\d+[.,]?\d*)?/i,
        // Pattern 2: CODE - Libellé - Tarif DA
        /^([A-Z0-9]+)\s*[-|]\s*(.+?)\s*[-|]\s*(\d+[.,]?\d*)\s*DA?/i,
        // Pattern 3: CODE Libellé Tarif
        /^([A-Z0-9]{1,10})\s+([A-Za-zÀ-ÿ\s\-']+)\s+(\d+[.,]?\d*)/,
        // Pattern 4: Tableau avec colonnes
        /([A-Z0-9]+)\s+(.{20,}?)\s+(\d+[.,]?\d*)\s+(\d+[.,]?\d*)?/,
    ];

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine.length < 10) continue;

        for (const pattern of patterns) {
            const match = trimmedLine.match(pattern);
            if (match) {
                const [, code, libelle, tarifStr, coefStr] = match;
                const tarif = parseFloat(tarifStr.replace(',', '.'));
                const coefficient = coefStr ? parseFloat(coefStr.replace(',', '.')) : 1;

                // Déterminer la catégorie
                let categorie = 'Autre';
                const libelleLower = libelle.toLowerCase();
                if (libelleLower.includes('consult')) categorie = 'Consultation';
                else if (libelleLower.includes('visite')) categorie = 'Visite';
                else if (libelleLower.includes('chirurg') || libelleLower.includes('opér')) categorie = 'Chirurgie';
                else if (libelleLower.includes('radio') || libelleLower.includes('échograph') || libelleLower.includes('scanner')) categorie = 'Imagerie';
                else if (libelleLower.includes('anesthé')) categorie = 'Anesthésie';
                else if (libelleLower.includes('soin') || libelleLower.includes('pansement')) categorie = 'Soins';
                else if (libelleLower.includes('biologie') || libelleLower.includes('analys')) categorie = 'Biologie';
                else if (libelleLower.includes('kinesither') || libelleLower.includes('rééducation')) categorie = 'Kinésithérapie';
                else if (libelleLower.includes('accouchement') || libelleLower.includes('sage-femme')) categorie = 'Sage-femme';
                else if (libelleLower.includes('dentaire') || libelleLower.includes('dent')) categorie = 'Dentaire';

                if (tarif > 0 && code && libelle && libelle.length > 3) {
                    actes.push({
                        code: code.trim().toUpperCase(),
                        libelle: libelle.trim(),
                        tarif,
                        coefficient,
                        categorie
                    });
                }
                break;
            }
        }
    }

    // Dédupliquer par code
    const actesUniques = Array.from(
        new Map(actes.map(item => [item.code, item])).values()
    );

    return actesUniques;
}

// Fonction principale
async function extractPdfToJson() {
    try {
        console.log('🔍 Recherche du fichier PDF...');
        
        // Chercher le PDF dans le répertoire
        const pdfPath = path.join(__dirname, '..', 'acte.pdf');
        
        if (!fs.existsSync(pdfPath)) {
            console.error('❌ Fichier acte.pdf non trouvé !');
            console.log('📂 Chemin recherché:', pdfPath);
            process.exit(1);
        }

        console.log('✅ PDF trouvé:', pdfPath);
        console.log('📖 Lecture du PDF...');

        // Lire le PDF
        const dataBuffer = fs.readFileSync(pdfPath);
        const data = await pdfParse(dataBuffer);

        console.log('📄 Pages:', data.numpages);
        console.log('📝 Texte extrait:', data.text.length, 'caractères');
        console.log('\n🔬 Parsing des actes médicaux...');

        // Parser le texte
        const actes = parsePdfText(data.text);

        console.log(`\n✅ ${actes.length} actes extraits !`);
        
        // Statistiques
        const categories = {};
        actes.forEach(acte => {
            categories[acte.categorie] = (categories[acte.categorie] || 0) + 1;
        });

        console.log('\n📊 Répartition par catégorie:');
        Object.entries(categories)
            .sort((a, b) => b[1] - a[1])
            .forEach(([cat, count]) => {
                console.log(`  ${cat}: ${count} actes`);
            });

        // Créer le fichier JSON
        const outputPath = path.join(__dirname, '..', 'data', 'nomenclature.json');
        const outputDir = path.dirname(outputPath);
        
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const jsonData = {
            version: '1.0',
            date: new Date().toISOString(),
            source: 'acte.pdf',
            total: actes.length,
            categories: categories,
            actes: actes
        };

        fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2), 'utf-8');

        console.log(`\n💾 Base de données sauvegardée:`);
        console.log(`   ${outputPath}`);
        console.log(`   Taille: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);
        
        console.log('\n🎉 Extraction terminée avec succès !');
        console.log('✅ Vous pouvez maintenant utiliser la nomenclature dans l\'application');

    } catch (error) {
        console.error('❌ Erreur lors de l\'extraction:', error);
        process.exit(1);
    }
}

// Exécuter
extractPdfToJson();
