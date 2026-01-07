const fs = require('fs');
const path = require('path');

// Lire le fichier de nomenclature
const content = fs.readFileSync('acte_extracted_clean.txt', 'utf-8');
const lines = content.split('\n');

const actes = [];
const seenCodes = new Set();
let currentSection = '';
let currentChapter = '';
let currentArticle = '';

// Patterns multiples pour capturer tous les formats
const patterns = [
    // Format numérique avec B: 1469 Description... B 60
    /^(\d{4})\s+(.+?)\s+B\s+(\d+)/,
    // Format: 0067/1 Description... 15 30
    /^([A-Z]{0,2}\d{2,4}(?:\/\d)?)\s+(.+?)\s+(\d+)(?:\s+E)?(?:\s+(\d+))?$/,
    // Format: U200 Description... 120 60
    /^([A-Z]{1,3}\d{2,4})\s+(.+?)\s+(\d+)(?:\s+E)?(?:\s+(\d+))?$/,
    // Format: Q214 Description... 3
    /^([A-Z]{1,3}\d{2,4})\s+(.+?)\s+(\d+)(?:\s+E)?$/,
    // Format: 0071 Description simple... 3
    /^(\d{4}(?:\/\d)?)\s+(.+?)\s+(\d+)$/,
    // Format avec Art: ART 1 - Description
    /^ART[\s.]+(\d+)[\s.-]+(.+)/i,
    // Format: C X 1, V X 2, etc.
    /^([CVKRB])\s*X\s*(\d+)\s*(.+)/,
    // Format: DS15/2 Description 20 25
    /^([A-Z]{2}\d{2,3}\/\d)\s+(.+?)\s+(\d+)(?:\s+(\d+))?$/,
    // Format: AMI 2, AMM 5
    /^(AMI|AMM|AMC|SF)\s*(\d+)\s+(.+?)\s+(\d+)$/,
    // Format: t 166 20 Description
    /^t\s*(\d{3})\s*(\d+)\s+(.+)$/,
];

function extractCode(line, lineNumber) {
    for (const pattern of patterns) {
        const match = line.match(pattern);
        if (match) {
            let code, libelle, coef, coef2, lettre;
            
            if (pattern.source.includes('B\\s\\*(\\d+)')) {
                // Format biologie: 1469 Description B 60
                code = `B${match[1]}`;
                libelle = match[2];
                coef = parseInt(match[3]);
                lettre = 'B';
            } else if (pattern.source.includes('t\\s')) {
                // Format t 166: t 166 20 Description
                code = `T${match[1]}`;
                coef = parseInt(match[2]);
                libelle = match[3];
                lettre = 'T';
            } else if (pattern.source.includes('ART')) {
                // Format Article
                code = `ART${match[1]}`;
                libelle = match[2];
                coef = 1;
                lettre = 'ART';
            } else if (pattern.source.includes('AMI|AMM')) {
                // Format AMI/AMM
                code = `${match[1]}${match[2]}`;
                libelle = match[3];
                coef = parseInt(match[4]) || parseInt(match[2]);
                lettre = match[1];
            } else if (match[1] && match[1].match(/^[CVKRB]$/)) {
                // Format lettre simple C X 1
                code = match[1];
                coef = parseInt(match[2]);
                libelle = match[3] || `Acte ${code}`;
                lettre = match[1];
            } else {
                // Format standard
                code = match[1];
                libelle = match[2];
                coef = parseInt(match[4] || match[3]);
                coef2 = match[4] ? parseInt(match[3]) : null;
                
                // Extraire la lettre clé du code
                const lettreMatch = code.match(/^([A-Z]+)/);
                lettre = lettreMatch ? lettreMatch[1] : 'K';
            }
            
            // Nettoyer le libellé
            libelle = libelle
                .replace(/\s+/g, ' ')
                .replace(/\.{2,}/g, '')
                .replace(/^[.\s-]+/, '')
                .replace(/[.\s]+$/, '')
                .trim();
            
            if (libelle.length < 5) continue; // Ignorer les libellés trop courts
            if (libelle.includes('..........')) continue; // Ligne de remplissage
            
            return {
                code: code.replace(/\//g, '-'),
                lettreCle: lettre || 'K',
                coef: coef || 1,
                coef2: coef2,
                libelle: libelle,
                section: currentSection,
                chapter: currentChapter,
                article: currentArticle,
                lineNumber: lineNumber
            };
        }
    }
    return null;
}

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.length < 5) continue;
    
    // Détecter les sections
    if (line.startsWith('TITRE')) {
        currentSection = line;
        continue;
    }
    if (line.startsWith('CHAPITRE')) {
        currentChapter = line;
        continue;
    }
    if (line.match(/^ART[\s.]+\d+/i) && line.includes('-')) {
        currentArticle = line;
        continue;
    }
    
    // Extraire l'acte
    const acte = extractCode(line, i + 1);
    if (acte) {
        // Éviter les doublons
        if (!seenCodes.has(acte.code)) {
            seenCodes.add(acte.code);
            actes.push(acte);
        }
    }
}

console.log(`Trouvé ${actes.length} actes`);

// Grouper par catégorie
const categories = {
    consultations: [],
    visites: [],
    biologie: [],
    radiologie: [],
    chirurgie: [],
    soins_infirmiers: [],
    kinesitherapie: [],
    autres: []
};

actes.forEach(acte => {
    const lettre = acte.lettreCle;
    const libelle = acte.libelle.toLowerCase();
    const section = (acte.section || '').toLowerCase();
    
    // Ajouter des synonymes basés sur le libellé
    const synonymes = [];
    const words = libelle.split(/\s+/);
    words.forEach(word => {
        if (word.length > 4) {
            synonymes.push(word);
        }
    });
    
    acte.synonymes = synonymes.slice(0, 10); // Limiter à 10 synonymes
    
    if (lettre === 'C' || libelle.includes('consultation') || libelle.includes('consult')) {
        categories.consultations.push(acte);
    } else if (lettre === 'V' || libelle.includes('visite') || libelle.includes('domicile')) {
        categories.visites.push(acte);
    } else if (lettre === 'B' || lettre.includes('B') || libelle.includes('biologie') || libelle.includes('analyse') || libelle.includes('sang') || libelle.includes('dosage')) {
        categories.biologie.push(acte);
    } else if (lettre === 'R' || lettre === 'Z' || libelle.includes('radio') || libelle.includes('scanner') || libelle.includes('irm') || libelle.includes('echo') || section.includes('radiologie')) {
        categories.radiologie.push(acte);
    } else if (lettre === 'K' || lettre === 'U' || lettre === 'Q' || lettre === 'G' || libelle.includes('chirurg') || libelle.includes('operation') || libelle.includes('ablation') || libelle.includes('excision')) {
        categories.chirurgie.push(acte);
    } else if (lettre.includes('AMI') || libelle.includes('infirm') || libelle.includes('injection') || libelle.includes('pansement')) {
        categories.soins_infirmiers.push(acte);
    } else if (lettre.includes('AMM') || libelle.includes('kiné') || libelle.includes('kinési') || libelle.includes('reeducation') || libelle.includes('rééducation')) {
        categories.kinesitherapie.push(acte);
    } else if (lettre === 'D' || lettre === 'DS' || libelle.includes('dentaire') || libelle.includes('dent')) {
        if (!categories.dentaire) categories.dentaire = [];
        categories.dentaire.push(acte);
    } else if (lettre === 'SF' || libelle.includes('sage') || libelle.includes('accouchement')) {
        if (!categories.sages_femmes) categories.sages_femmes = [];
        categories.sages_femmes.push(acte);
    } else if (libelle.includes('anesthesie') || libelle.includes('anésthésie') || section.includes('anesthesie')) {
        if (!categories.anesthesie) categories.anesthesie = [];
        categories.anesthesie.push(acte);
    } else {
        categories.autres.push(acte);
    }
});

// Sauvegarder
const output = {
    version: "2026",
    date: "2026-01-05",
    source: "Nomenclature Algérienne 1987",
    totalActes: actes.length,
    categories: categories
};

fs.writeFileSync(
    'data/ngap-complete.json',
    JSON.stringify(output, null, 2),
    'utf-8'
);

console.log('✅ Fichier ngap-complete.json généré avec succès');
console.log('Répartition:');
Object.entries(categories).forEach(([cat, acts]) => {
    console.log(`  ${cat}: ${acts.length} actes`);
});
