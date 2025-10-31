import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdfParseModule = require('pdf-parse');
const pdfParse = pdfParseModule.default || pdfParseModule;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function extractBaremeData() {
    try {
        const pdfPath = path.join(__dirname, '..', 'BAREME AT-MP.pdf');
        const dataBuffer = fs.readFileSync(pdfPath);
        
        console.log('📄 Extraction du contenu du barème PDF...\n');
        
        const data = await pdfParse(dataBuffer);
        
        // Sauvegarde du texte complet
        const outputPath = path.join(__dirname, '..', 'bareme_extracted.txt');
        fs.writeFileSync(outputPath, data.text, 'utf8');
        
        console.log(`✅ Extraction terminée !`);
        console.log(`📊 Pages: ${data.numpages}`);
        console.log(`📝 Caractères extraits: ${data.text.length}`);
        console.log(`💾 Fichier sauvegardé: bareme_extracted.txt\n`);
        
        // Afficher un aperçu
        console.log('--- APERÇU DU CONTENU ---');
        console.log(data.text.substring(0, 2000));
        console.log('\n... (voir bareme_extracted.txt pour le contenu complet)');
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'extraction:', error.message);
    }
}

extractBaremeData();
