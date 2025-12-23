// Script d'extraction avec pdf2json
const fs = require('fs');
const path = require('path');
const PDFParser = require('pdf2json');

function parsePdfText(text) {
    const actes = [];
    const lines = text.split('\n').filter(l => l.trim());
    
    console.log(`📝 Analyse de ${lines.length} lignes...`);
    
    // Patterns optimisés pour nomenclature médicale
    const patterns = [
        // Format standard: CODE Libellé Tarif
        /^([A-Z]{1,5}\d{0,5})\s+(.{15,150}?)\s+(\d{2,6}(?:[.,]\d{2})?)\s*(?:DA|da)?/i,
        // Format avec séparateurs
        /^([A-Z\d]{2,10})\s*[-:]\s*(.{15,150}?)\s*[-:]\s*(\d{2,6}(?:[.,]\d{2})?)/i,
        // Format compact
        /([A-Z]{2,5}\d{1,5})\s+([^\d]{20,}?)\s+(\d{3,6})\s*DA/i,
    ];

    let count = 0;
    const seenCodes = new Set();
    
    for (const line of lines) {
        if (line.length < 20 || /^(CHAPITRE|SECTION|Page|Nomenclature)/i.test(line)) continue;
        
        for (const pattern of patterns) {
            const match = line.match(pattern);
            if (match) {
                const [, code, libelle, tarifStr] = match;
                const codeClean = code.trim().toUpperCase().replace(/[^\w]/g, '');
                const libelleClean = libelle.trim().replace(/\s+/g, ' ');
                const tarif = parseFloat(tarifStr.replace(',', '.'));
                
                if (tarif > 0 && codeClean.length >= 2 && libelleClean.length >= 10 && !seenCodes.has(codeClean)) {
                    seenCodes.add(codeClean);
                    
                    // Catégorisation intelligente
                    let categorie = 'Autre';
                    const ll = libelleClean.toLowerCase();
                    
                    if (/consult/i.test(ll)) categorie = 'Consultation';
                    else if (/visite/i.test(ll)) categorie = 'Visite';
                    else if (/chirurg|opérat/i.test(ll)) categorie = 'Chirurgie';
                    else if (/radio|écho|scanner|irm/i.test(ll)) categorie = 'Imagerie';
                    else if (/anesthé/i.test(ll)) categorie = 'Anesthésie';
                    else if (/pansement|soin|injection/i.test(ll)) categorie = 'Soins';
                    else if (/analys|biolog|labora/i.test(ll)) categorie = 'Biologie';
                    else if (/kiné|rééduc/i.test(ll)) categorie = 'Kinésithérapie';
                    else if (/accouchement|obstétric/i.test(ll)) categorie = 'Obstétrique';
                    else if (/dentaire|dent|stomato/i.test(ll)) categorie = 'Dentaire';
                    
                    actes.push({ code: codeClean, libelle: libelleClean, tarif, coefficient: 1, categorie });
                    count++;
                    
                    if (count % 100 === 0) console.log(`   ✓ ${count} actes...`);
                }
                break;
            }
        }
    }
    
    console.log(`✅ Extrait: ${count} actes uniques`);
    return actes;
}

async function extractPdfToJson() {
    return new Promise((resolve, reject) => {
        console.log('\n═════════════════════════════════════════════════');
        console.log('🔍 EXTRACTION PDF - pdf2json');
        console.log('═════════════════════════════════════════════════\n');
        
        const pdfPath = path.join(__dirname, '..', 'acte.pdf');
        
        if (!fs.existsSync(pdfPath)) {
            return reject(new Error('acte.pdf non trouvé'));
        }
        
        console.log('✅ PDF:', pdfPath);
        console.log('📂 Taille:', (fs.statSync(pdfPath).size/1024/1024).toFixed(2), 'MB');
        console.log('\n📖 Parsing du PDF (peut prendre 1-2 minutes)...\n');
        
        const pdfParser = new PDFParser();
        
        pdfParser.on('pdfParser_dataError', reject);
        
        pdfParser.on('pdfParser_dataReady', (pdfData) => {
            try {
                console.log('✅ PDF parsé !');
                console.log('📄 Pages:', pdfData.Pages.length);
                
                // Extraire le texte
                let text = '';
                for (const page of pdfData.Pages) {
                    for (const textItem of page.Texts) {
                        const decoded = decodeURIComponent(textItem.R[0].T);
                        text += decoded + ' ';
                    }
                    text += '\n';
                }
                
                console.log('📝 Texte extrait:', text.length, 'caractères');
                console.log('\n🔬 Parsing des actes...\n');
                
                const actes = parsePdfText(text);
                
                // Stats
                const categories = {};
                actes.forEach(a => categories[a.categorie] = (categories[a.categorie] || 0) + 1);
                
                console.log('\n📊 STATISTIQUES:');
                console.log('─────────────────────────────────────────────\n');
                console.log(`   Total:           ${actes.length} actes`);
                console.log(`   Catégories:      ${Object.keys(categories).length}`);
                console.log(`   Tarif moyen:     ${(actes.reduce((s,a)=>s+a.tarif,0)/actes.length).toFixed(2)} DA`);
                
                console.log('\n📋 Par catégorie:\n');
                Object.entries(categories)
                    .sort((a,b) => b[1] - a[1])
                    .forEach(([cat, count]) => {
                        console.log(`   ${cat.padEnd(25)} ${count.toString().padStart(4)} (${((count/actes.length)*100).toFixed(1)}%)`);
                    });
                
                // Sauvegarder
                const jsonData = {
                    version: '1.0',
                    date: new Date().toISOString().split('T')[0],
                    source: 'acte.pdf',
                    total: actes.length,
                    categories,
                    actes
                };
                
                const outputPath = path.join(__dirname, '..', 'data', 'nomenclature-static.json');
                fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));
                
                console.log('\n💾 Sauvegardé:', outputPath);
                console.log('   Taille:', (fs.statSync(outputPath).size/1024).toFixed(2), 'KB');
                
                console.log('\n═════════════════════════════════════════════════');
                console.log('✅ EXTRACTION TERMINÉE !');
                console.log('═════════════════════════════════════════════════\n');
                
                resolve(actes);
            } catch (err) {
                reject(err);
            }
        });
        
        pdfParser.loadPDF(pdfPath);
    });
}

extractPdfToJson()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('\n❌ ERREUR:', err.message);
        process.exit(1);
    });
