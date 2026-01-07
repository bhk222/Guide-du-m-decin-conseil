const fs = require('fs');

// Lire le fichier
const content = fs.readFileSync('acte_extracted_clean.txt', 'utf-8');
const lines = content.split('\n');

const actes = [];
const seenCodes = new Set();
let currentSection = '';
let currentChapter = '';
let lastValidLibelle = '';

// Patterns ultra-complets pour TOUT capturer
const patterns = [
    // 1. Numérique avec B: 1469 Description B 60
    { regex: /^(\d{4})\s+(.+?)\s+B\s+(\d+)/, type: 'bio' },
    
    // 2. Codes avec lettres: U200, Q214, etc. avec coefficient après
    { regex: /^([A-Z]{1,3}\d{2,4}(?:\/\d)?)\s+(.+?)\s+(\d+)(?:\s+E)?(?:\s+(\d+))?/, type: 'standard' },
    
    // 3. Codes numériques: 0067/1, 0071, etc.
    { regex: /^(\d{4}(?:\/\d)?)\s+(.+?)\s+(\d+)(?:\s+E)?(?:\s+(\d+))?/, type: 'numeric' },
    
    // 4. AMI, AMM, AMC, SF avec numéro
    { regex: /^(AMI|AMM|AMC|SF)\s*(\d+)\s+(.+)/, type: 'ami' },
    
    // 5. Format t: t 166 20 Description
    { regex: /^t\s*(\d{2,3})\s*(\d+)\s+(.+)/, type: 't' },
    
    // 6. Lettres simples: C X 1, V X 2
    { regex: /^([CVKRBZ])\s*X\s*(\d+(?:\.\d+)?)\s*(.*)/, type: 'letter' },
    
    // 7. Format DS, OS avec /: DS15/2, OS86/4
    { regex: /^([A-Z]{2}\d{2,3}\/\d)\s+(.+)/, type: 'slash' },
    
    // 8. Codes courts: D5, D10, K5
    { regex: /^([A-Z]\d{1,2})\s+(.+?)\s+(\d+)/, type: 'short' },
    
    // 9. Actes avec "par séance", "par jour"
    { regex: /^(.+?)\s+(par séance|par jour|la séance)\s*\.+\s*(\d+)(?:\s+E)?/, type: 'seance' },
    
    // 10. Codes avec point: 0.0, 1.1, etc. (moins probable)
    { regex: /^(\d{1,2}\.\d{1,2})\s+(.+)/, type: 'decimal' },
];

// Fonction d'extraction robuste
function extractActe(line, lineNum) {
    const trimmed = line.trim();
    if (trimmed.length < 10) return null;
    if (trimmed.match(/^(TITRE|CHAPITRE|SECTION|ART\.|Art\.|NOTE|NOTA)/i)) return null;
    if (trimmed.match(/^-+$/)) return null;
    if (trimmed.match(/^\d+\s*-\s*$/)) return null;
    
    for (const { regex, type } of patterns) {
        const match = trimmed.match(regex);
        if (!match) continue;
        
        let code, libelle, coef, lettre;
        
        switch(type) {
            case 'bio':
                code = `B${match[1]}`;
                libelle = match[2];
                coef = parseInt(match[3]);
                lettre = 'B';
                break;
                
            case 'standard':
            case 'numeric':
                code = match[1];
                libelle = match[2];
                coef = parseInt(match[4] || match[3]);
                const lm = code.match(/^([A-Z]+)/);
                lettre = lm ? lm[1] : (type === 'numeric' ? 'K' : 'X');
                break;
                
            case 'ami':
                code = `${match[1]}${match[2]}`;
                libelle = match[3];
                coef = parseInt(match[2]);
                lettre = match[1];
                break;
                
            case 't':
                code = `T${match[1]}`;
                coef = parseInt(match[2]);
                libelle = match[3];
                lettre = 'T';
                break;
                
            case 'letter':
                code = match[1];
                coef = parseFloat(match[2]);
                libelle = match[3] || lastValidLibelle || `Acte ${code}`;
                lettre = match[1];
                break;
                
            case 'slash':
                code = match[1];
                libelle = match[2];
                coef = 10; // Par défaut
                lettre = code.substring(0, 2);
                break;
                
            case 'short':
                code = match[1];
                libelle = match[2];
                coef = parseInt(match[3]);
                lettre = code[0];
                break;
                
            case 'seance':
                code = `S${lineNum}`;
                libelle = match[1];
                coef = parseInt(match[3]);
                lettre = 'S';
                break;
                
            case 'decimal':
                code = `D${match[1].replace('.', '_')}`;
                libelle = match[2];
                coef = 1;
                lettre = 'D';
                break;
        }
        
        // Nettoyer le libellé
        if (!libelle || libelle.length < 5) continue;
        
        libelle = libelle
            .replace(/\s+/g, ' ')
            .replace(/\.{3,}/g, '')
            .replace(/^[.\s-]+/, '')
            .replace(/[.\s]+$/, '')
            .replace(/\s*\.\s*$/, '')
            .trim();
            
        if (libelle.length < 5) continue;
        if (libelle.match(/^[\d\s.]+$/)) continue;
        
        // Sauvegarder le libellé pour les lignes suivantes
        if (libelle.length > 10) lastValidLibelle = libelle;
        
        return {
            code: code.replace(/\//g, '-'),
            lettreCle: lettre,
            coef: coef || 1,
            libelle: libelle,
            section: currentSection,
            chapter: currentChapter,
            lineNumber: lineNum
        };
    }
    
    return null;
}

// Parser toutes les lignes
console.log('🔍 Analyse en cours...');
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Capturer les sections
    if (line.trim().startsWith('TITRE')) {
        currentSection = line.trim();
        continue;
    }
    if (line.trim().startsWith('CHAPITRE')) {
        currentChapter = line.trim();
        continue;
    }
    
    const acte = extractActe(line, i + 1);
    if (acte && !seenCodes.has(acte.code)) {
        seenCodes.add(acte.code);
        actes.push(acte);
    }
}

console.log(`✅ ${actes.length} actes trouvés!`);

// Catégoriser intelligemment
const categories = {
    consultations: [],
    visites: [],
    biologie: [],
    radiologie: [],
    chirurgie: [],
    soins_infirmiers: [],
    kinesitherapie: [],
    dentaire: [],
    sages_femmes: [],
    anesthesie: [],
    reeducation: [],
    autres: []
};

actes.forEach(acte => {
    const { lettreCle, libelle, section, chapter } = acte;
    const lib = libelle.toLowerCase();
    const sec = (section || '').toLowerCase();
    const chap = (chapter || '').toLowerCase();
    
    // Générer synonymes
    const synonymes = new Set();
    libelle.split(/[\s,;]+/).forEach(word => {
        if (word.length > 3 && !word.match(/^\d+$/)) {
            synonymes.add(word.toLowerCase());
        }
    });
    acte.synonymes = Array.from(synonymes).slice(0, 15);
    
    // Catégoriser
    if (lettreCle === 'C' || lib.includes('consultation')) {
        categories.consultations.push(acte);
    } else if (lettreCle === 'V' || lib.includes('visite') || lib.includes('domicile')) {
        categories.visites.push(acte);
    } else if (lettreCle === 'B' || lib.includes('dosage') || lib.includes('analyse') || lib.includes('hemoglo') || lib.includes('glyc') || sec.includes('biolog') || chap.includes('biolog')) {
        categories.biologie.push(acte);
    } else if (lettreCle === 'R' || lettreCle === 'Z' || lib.includes('radio') || lib.includes('scanner') || lib.includes('irm') || lib.includes('echo') || lib.includes('tomographie')) {
        categories.radiologie.push(acte);
    } else if (lettreCle.match(/^(AMI|INF)/) || lib.includes('infirm') || lib.includes('injection') || lib.includes('pansement') || lib.includes('soin')) {
        categories.soins_infirmiers.push(acte);
    } else if (lettreCle.match(/^(AMM|KIN)/) || lib.includes('kiné') || lib.includes('kinési') || lib.includes('massage') || lib.includes('rééducation') || lib.includes('reeducation')) {
        categories.kinesitherapie.push(acte);
    } else if (lettreCle.match(/^(D|DS|OD)/) || lib.includes('dentaire') || lib.includes('dent') || lib.includes('molaire') || chap.includes('dentaire')) {
        categories.dentaire.push(acte);
    } else if (lettreCle === 'SF' || lib.includes('accouchement') || lib.includes('sage') || lib.includes('obstétric')) {
        categories.sages_femmes.push(acte);
    } else if (lib.includes('anesthésie') || lib.includes('anesthesie') || sec.includes('anesthesie')) {
        categories.anesthesie.push(acte);
    } else if (lettreCle === 'T' || lib.includes('rééducation') || lib.includes('readaptation') || sec.includes('reeducation')) {
        categories.reeducation.push(acte);
    } else if (lettreCle.match(/^(K|U|Q|G|O)/) || lib.includes('chirurg') || lib.includes('opération') || lib.includes('ablation') || lib.includes('excision') || lib.includes('incision')) {
        categories.chirurgie.push(acte);
    } else {
        categories.autres.push(acte);
    }
});

// Sauvegarder
const output = {
    version: "2026",
    date: "2026-01-05",
    source: "Nomenclature Algérienne 1987 - Extraction complète",
    totalActes: actes.length,
    categories: categories
};

fs.writeFileSync('data/ngap-complete.json', JSON.stringify(output, null, 2), 'utf-8');

console.log('\n📊 Répartition:');
Object.entries(categories).forEach(([cat, acts]) => {
    if (acts.length > 0) {
        console.log(`  ${cat}: ${acts.length} actes`);
    }
});

console.log('\n✅ Fichier data/ngap-complete.json généré!');
