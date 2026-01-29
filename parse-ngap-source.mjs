// Parser pour extraire les codes NGAP depuis acte_extracted_clean.txt
import { readFileSync, writeFileSync } from 'fs';

console.log('🔧 Parsing de la nomenclature NGAP depuis le fichier source...\n');

const textContent = readFileSync('acte_extracted_clean.txt', 'utf-8');
const lines = textContent.split('\n');

const actes = [];
let currentSection = '';
let currentChapter = '';

let pendingActe = null;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Détecter les sections
    if (line.startsWith('TITRE')) {
        currentSection = line;
        continue;
    }
    
    // Détecter les chapitres
    if (line.startsWith('CHAPITRE')) {
        currentChapter = line;
        continue;
    }
    
    // Format 1: CODE Description... LETTRE COEF (tout sur une ligne)
    const match1 = line.match(/^(\d{3,4}[A-Z\-]*)\s+(.+?)\s+([A-Z]+)\s+(\d+)\s*$/);
    
    if (match1) {
        const [, code, description, lettreCle, coef] = match1;
        
        const acte = {
            code: code.trim(),
            codeNGAP: `${lettreCle.trim()} ${coef.trim()}`,
            lettreCle: lettreCle.trim(),
            coefficient: parseInt(coef),
            libelle: description.trim().replace(/\s+/g, ' '),
            section: currentSection,
            chapter: currentChapter
        };
        
        actes.push(acte);
        pendingActe = null;
        continue;
    }
    
    // Format 2: CODE Description... (début, peut continuer sur plusieurs lignes)
    const match2 = line.match(/^(\d{3,4}[A-Z\-]*)\s+(.+)$/);
    
    if (match2) {
        const [, code, description] = match2;
        pendingActe = {
            code: code.trim(),
            libelle: description.trim(),
            section: currentSection,
            chapter: currentChapter
        };
        continue;
    }
    
    // Si on a un acte en attente, chercher le code NGAP
    if (pendingActe) {
        // Suite de la description
        if (line && !line.match(/^[A-Z]\s+\d+/) && line.length > 10) {
            pendingActe.libelle += ' ' + line;
            continue;
        }
        
        // Code NGAP trouvé: LETTRE COEF
        const matchCode = line.match(/^([A-Z]+)\s+(\d+)/);
        if (matchCode) {
            const [, lettreCle, coef] = matchCode;
            
            const acte = {
                code: pendingActe.code,
                codeNGAP: `${lettreCle.trim()} ${coef.trim()}`,
                lettreCle: lettreCle.trim(),
                coefficient: parseInt(coef),
                libelle: pendingActe.libelle.replace(/\s+/g, ' ').substring(0, 500),
                section: pendingActe.section,
                chapter: pendingActe.chapter
            };
            
            actes.push(acte);
            pendingActe = null;
        }
    }
}

console.log(`✅ Extrait ${actes.length} actes avec codes NGAP valides\n`);

// Afficher quelques exemples
console.log('📋 Exemples extraits:');
actes.slice(0, 10).forEach(a => {
    console.log(`  ${a.code} → ${a.codeNGAP} - ${a.libelle.substring(0, 50)}...`);
});

// Chercher spécifiquement la FNS/hémogramme
console.log('\n🔍 Recherche FNS/Hémogramme:');
const fns = actes.filter(a => 
    a.libelle.toLowerCase().includes('hémogramme') ||
    a.libelle.toLowerCase().includes('formule leucocytaire') ||
    a.libelle.toLowerCase().includes('numération')
);

fns.forEach(a => {
    console.log(`  ${a.code} → ${a.codeNGAP}`);
    console.log(`     ${a.libelle}`);
    console.log('');
});

// Sauvegarder
const output = {
    version: '2026',
    date: new Date().toISOString().split('T')[0],
    source: 'Nomenclature Algérienne 1987 - Fichier source',
    totalActes: actes.length,
    actes: actes
};

writeFileSync('data/ngap-source-parsed.json', JSON.stringify(output, null, 2));
console.log('\n✅ Fichier sauvegardé: data/ngap-source-parsed.json');
console.log(`\n🎉 ${actes.length} actes extraits avec succès !`);
