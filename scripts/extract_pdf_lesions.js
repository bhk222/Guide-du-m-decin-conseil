/**
 * Extraction et comparaison des lésions du barème AT-MP PDF
 * avec la base de données actuelle
 */

import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse/lib/pdf-parse.js';

const pdfPath = path.join(process.cwd(), 'BAREME AT-MP.pdf');
const disabilityRatesPath = path.join(process.cwd(), 'data', 'disabilityRates.ts');

console.log('🔍 EXTRACTION DES LÉSIONS DU BARÈME AT-MP\n');
console.log('═══════════════════════════════════════════════════\n');

// Lire le PDF
const dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function(data) {
    console.log(`📄 PDF chargé : ${data.numpages} pages\n`);
    
    const text = data.text;
    
    // Lire la base actuelle
    const currentDb = fs.readFileSync(disabilityRatesPath, 'utf-8');
    
    // Patterns pour extraire les lésions du PDF
    // Format typique : "Nom de la lésion ... X% ou [X-Y%]"
    
    // Extraire les sections principales
    const sections = {
        'Tête et cou': [],
        'Membres supérieurs': [],
        'Membres inférieurs': [],
        'Rachis': [],
        'Thorax': [],
        'Abdomen': [],
        'Bassin': []
    };
    
    // Normaliser pour comparaison
    const normalize = (str) => str.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    
    // Extraire les lignes qui ressemblent à des lésions
    const lines = text.split('\n');
    const lesionPattern = /^([A-ZÀÂÄÉÈÊËÏÎÔÙÛÜÇ][a-zàâäéèêëïîôùûüç\s\-'()]+(?:[a-zàâäéèêëïîôùûüç\s\-'()]+)?)\s*\.{2,}\s*(\d+)\s*%|^([A-ZÀÂÄÉÈÊËÏÎÔÙÛÜÇ][a-zàâäéèêëïîôùûüç\s\-'()]+)\s+:\s+(\d+)\s*à\s*(\d+)\s*%/;
    
    const extractedLesions = [];
    let currentSection = '';
    
    lines.forEach(line => {
        const trimmed = line.trim();
        
        // Détecter les sections
        if (trimmed.match(/^[A-Z\s]+$/)) {
            const section = trimmed.toLowerCase();
            if (section.includes('tete') || section.includes('crane') || section.includes('face')) {
                currentSection = 'Tête et cou';
            } else if (section.includes('membre') && section.includes('superieur')) {
                currentSection = 'Membres supérieurs';
            } else if (section.includes('membre') && section.includes('inferieur')) {
                currentSection = 'Membres inférieurs';
            } else if (section.includes('rachis') || section.includes('colonne')) {
                currentSection = 'Rachis';
            } else if (section.includes('thorax') || section.includes('poitrine')) {
                currentSection = 'Thorax';
            } else if (section.includes('abdomen') || section.includes('ventre')) {
                currentSection = 'Abdomen';
            } else if (section.includes('bassin') || section.includes('pelvi')) {
                currentSection = 'Bassin';
            }
        }
        
        // Extraire lésions avec pattern
        const match = trimmed.match(lesionPattern);
        if (match) {
            const lesion = {
                name: match[1] || match[3],
                rate: match[2] ? parseInt(match[2]) : [parseInt(match[4]), parseInt(match[5])],
                section: currentSection,
                found: false
            };
            
            // Vérifier si existe dans la base
            const normalized = normalize(lesion.name);
            if (currentDb.toLowerCase().includes(normalized.substring(0, 20))) {
                lesion.found = true;
            }
            
            extractedLesions.push(lesion);
        }
    });
    
    console.log(`📊 Total lésions extraites du PDF : ${extractedLesions.length}`);
    console.log(`✅ Lésions déjà dans la base : ${extractedLesions.filter(l => l.found).length}`);
    console.log(`❌ Lésions MANQUANTES : ${extractedLesions.filter(l => !l.found).length}\n`);
    
    // Grouper les manquantes par section
    const missing = extractedLesions.filter(l => !l.found);
    const missingBySection = {};
    
    missing.forEach(lesion => {
        if (!missingBySection[lesion.section]) {
            missingBySection[lesion.section] = [];
        }
        missingBySection[lesion.section].push(lesion);
    });
    
    // Afficher les manquantes
    console.log('📋 LÉSIONS MANQUANTES PAR SECTION :\n');
    
    Object.entries(missingBySection).forEach(([section, lesions]) => {
        if (lesions.length > 0) {
            console.log(`\n🔸 ${section} (${lesions.length} manquantes) :`);
            lesions.slice(0, 10).forEach(l => {
                const rate = Array.isArray(l.rate) ? `[${l.rate[0]}-${l.rate[1]}%]` : `${l.rate}%`;
                console.log(`   • ${l.name} : ${rate}`);
            });
            if (lesions.length > 10) {
                console.log(`   ... et ${lesions.length - 10} autres`);
            }
        }
    });
    
    // Sauvegarder le rapport
    const outputDir = path.join(process.cwd(), 'audit_reports');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const report = {
        timestamp: new Date().toISOString(),
        source: 'BAREME AT-MP.pdf',
        statistics: {
            totalExtracted: extractedLesions.length,
            alreadyInDb: extractedLesions.filter(l => l.found).length,
            missing: missing.length
        },
        missingLesions: missing,
        missingBySection: Object.fromEntries(
            Object.entries(missingBySection).map(([k, v]) => [k, v.length])
        )
    };
    
    const reportPath = path.join(outputDir, `missing_lesions_${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('\n═══════════════════════════════════════════════════');
    console.log(`\n📄 Rapport sauvegardé : ${reportPath}`);
    console.log('\n✅ Extraction terminée !\n');
    
}).catch(function(error) {
    console.error('❌ Erreur lors de la lecture du PDF :', error.message);
    console.log('\n💡 Assurez-vous que le fichier "BAREME AT-MP.pdf" existe à la racine du projet.');
});
