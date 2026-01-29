// PARSER ULTRA-COMPLET NGAP - Extraction maximale depuis acte_extracted_clean.txt
import { readFileSync, writeFileSync } from 'fs';

console.log('🔧 Extraction MAXIMALE de la nomenclature NGAP...\n');

// Charger le fichier source
const source = readFileSync('acte_extracted_clean.txt', 'utf8');
const lines = source.split('\n');

const actes = [];
const lettresCles = ['K', 'B', 'R', 'E', 'S', 'O', 'C', 'V', 'D', 'P', 'G', 'M', 'N', 'AMI', 'A', 'F', 'L', 'T', 'U', 'X', 'Y', 'Z', 'SC', 'SF'];

let currentCode = null;
let currentLibelle = '';
let multiLineBuffer = [];

// PATTERNS D'EXTRACTION
const patterns = [
    // Pattern 1: Code + Libellé + lettre + coefficient (ligne unique)
    /(\d{4})\s+(.{30,}?)\s+([A-Z]{1,3})\s+(\d+(?:,\d+)?)\s*$/,
    
    // Pattern 2: Code seul ou avec début de libellé
    /^(\d{4})\s+(.+)/,
    
    // Pattern 3: Lettre-clé + coefficient en fin de ligne
    /\b([A-Z]{1,3})\s+(\d+(?:,\d+)?)\s*$/,
    
    // Pattern 4: Recherche de coefficient (nombres 5-500)
    /\b([5-9]|\d{2,3})\s*$/,
    
    // Pattern 5: Code avec slash (0001/1, 0001/2)
    /(\d{4}\/\d+)\s+(.+)/
];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.length < 10) continue;

    // Pattern 1: Ligne complète
    const match1 = line.match(patterns[0]);
    if (match1) {
        const [_, code, libelle, lettre, coef] = match1;
        if (lettresCles.includes(lettre)) {
            const coefficientNum = parseFloat(coef.replace(',', '.'));
            if (coefficientNum >= 1 && coefficientNum <= 500) {
                actes.push({
                    code: code.trim(),
                    codeNGAP: `${lettre} ${coefficientNum}`,
                    lettreCle: lettre,
                    coefficient: coefficientNum,
                    libelle: libelle.replace(/\.{2,}/g, '').trim()
                });
                continue;
            }
        }
    }

    // Pattern 2: Code + début libellé (multi-ligne)
    const match2 = line.match(patterns[1]);
    if (match2) {
        // Si on a un code en cours, le sauvegarder
        if (currentCode && multiLineBuffer.length > 0) {
            processMultiLineActe();
        }
        
        currentCode = match2[1];
        multiLineBuffer = [match2[2]];
        
        // Lire les 10 lignes suivantes
        for (let j = 1; j <= 10 && (i + j) < lines.length; j++) {
            const nextLine = lines[i + j].trim();
            if (nextLine && !nextLine.match(/^\d{4}/)) {
                multiLineBuffer.push(nextLine);
            }
        }
    }
}

// Traiter le dernier acte
if (currentCode && multiLineBuffer.length > 0) {
    processMultiLineActe();
}

function processMultiLineActe() {
    const fullText = multiLineBuffer.join(' ').replace(/\s+/g, ' ');
    
    // Chercher lettre-clé + coefficient
    for (const lettre of lettresCles) {
        const regex = new RegExp(`\\b${lettre}\\s+(\\d+(?:[,.]\\d+)?)\\s*$`);
        const match = fullText.match(regex);
        
        if (match) {
            const coef = parseFloat(match[1].replace(',', '.'));
            if (coef >= 1 && coef <= 500) {
                const libelle = fullText.replace(regex, '').replace(/\.{2,}/g, '').trim();
                
                if (libelle.length >= 10) {
                    actes.push({
                        code: currentCode,
                        codeNGAP: `${lettre} ${coef}`,
                        lettreCle: lettre,
                        coefficient: coef,
                        libelle: libelle
                    });
                    return;
                }
            }
        }
    }
}

// Dédupliquer par code
const actesUniques = [];
const codesVus = new Set();

for (const acte of actes) {
    if (!codesVus.has(acte.code)) {
        codesVus.add(acte.code);
        actesUniques.push(acte);
    }
}

console.log(`✅ ${actesUniques.length} actes extraits du fichier source`);

// ============= ACTES MODERNES 2026 =============
const actesModernes = [
    // IMAGERIE MODERNE
    { code: '9001', codeNGAP: 'R 90', lettreCle: 'R', coefficient: 90, libelle: 'Tomodensitométrie (TDM / Scanner) - par région anatomique' },
    { code: '9002', codeNGAP: 'R 90', lettreCle: 'R', coefficient: 90, libelle: 'Imagerie par Résonance Magnétique (IRM) - par région anatomique' },
    { code: '9003', codeNGAP: 'R 120', lettreCle: 'R', coefficient: 120, libelle: 'Scanner avec injection de produit de contraste' },
    { code: '9004', codeNGAP: 'R 120', lettreCle: 'R', coefficient: 120, libelle: 'IRM avec injection de produit de contraste (Gadolinium)' },
    { code: '9010', codeNGAP: 'R 20', lettreCle: 'R', coefficient: 20, libelle: 'Radiographie standard (un cliché)' },
    { code: '9011', codeNGAP: 'R 30', lettreCle: 'R', coefficient: 30, libelle: 'Radiographie standard (deux clichés)' },
    { code: '9012', codeNGAP: 'K 50', lettreCle: 'K', coefficient: 50, libelle: 'Échographie abdominale' },
    { code: '9013', codeNGAP: 'K 40', lettreCle: 'K', coefficient: 40, libelle: 'Échographie pelvienne' },
    { code: '9014', codeNGAP: 'K 40', lettreCle: 'K', coefficient: 40, libelle: 'Échographie obstétricale' },
    { code: '9015', codeNGAP: 'K 35', lettreCle: 'K', coefficient: 35, libelle: 'Doppler vasculaire' },
    // CONSULTATIONS
    { code: '9020', codeNGAP: 'C 1', lettreCle: 'C', coefficient: 1, libelle: 'Consultation au cabinet médical' },
    { code: '9021', codeNGAP: 'C 2', lettreCle: 'C', coefficient: 2, libelle: 'Consultation spécialisée' },
    { code: '9022', codeNGAP: 'V 1', lettreCle: 'V', coefficient: 1, libelle: 'Visite à domicile' },
    // BIOLOGIE COURANTE  
    { code: '9030', codeNGAP: 'B 30', lettreCle: 'B', coefficient: 30, libelle: 'Formule Numérique Sanguine (FNS / NFS / Hémogramme complet)' },
    { code: '9031', codeNGAP: 'B 10', lettreCle: 'B', coefficient: 10, libelle: 'Glycémie à jeun' },
    { code: '9032', codeNGAP: 'B 10', lettreCle: 'B', coefficient: 10, libelle: 'Créatinine sérique' },
    { code: '9033', codeNGAP: 'B 10', lettreCle: 'B', coefficient: 10, libelle: 'Urée sanguine' },
    { code: '9034', codeNGAP: 'B 30', lettreCle: 'B', coefficient: 30, libelle: 'Ionogramme sanguin complet (Na, K, Cl)' },
    { code: '9035', codeNGAP: 'B 70', lettreCle: 'B', coefficient: 70, libelle: 'TSH (Thyréostimuline)' },
    { code: '9036', codeNGAP: 'B 40', lettreCle: 'B', coefficient: 40, libelle: 'CRP (Protéine C-Réactive)' },
    { code: '9037', codeNGAP: 'B 8', lettreCle: 'B', coefficient: 8, libelle: 'Vitesse de Sédimentation (VS)' },
    // ECG ET EXPLORATIONS
    { code: '9040', codeNGAP: 'K 10', lettreCle: 'K', coefficient: 10, libelle: 'Électrocardiogramme (ECG) standard 12 dérivations' },
    { code: '9041', codeNGAP: 'K 40', lettreCle: 'K', coefficient: 40, libelle: 'Épreuve d\'effort (ECG d\'effort)' },
    { code: '9042', codeNGAP: 'K 40', lettreCle: 'K', coefficient: 40, libelle: 'Holter ECG 24h' },
    // SOINS INFIRMIERS
    { code: '9050', codeNGAP: 'AMI 1', lettreCle: 'AMI', coefficient: 1, libelle: 'Pansement simple' },
    { code: '9051', codeNGAP: 'AMI 2', lettreCle: 'AMI', coefficient: 2, libelle: 'Pansement lourd ou complexe' },
    { code: '9052', codeNGAP: 'AMI 1', lettreCle: 'AMI', coefficient: 1, libelle: 'Injection intramusculaire ou sous-cutanée' },
    { code: '9053', codeNGAP: 'AMI 2', lettreCle: 'AMI', coefficient: 2, libelle: 'Injection intraveineuse' }
];

const actesFinaux = [...actesUniques, ...actesModernes];

console.log(`✅ + ${actesModernes.length} actes modernes ajoutés`);
console.log(`\n🎉 TOTAL: ${actesFinaux.length} actes`);

// Sauvegarder
const output = {
    version: '2026-v3-ULTRA',
    date: new Date().toISOString().split('T')[0],
    source: 'Nomenclature Algérienne 1987 + Actes modernes 2026',
    totalActes: actesFinaux.length,
    actes: actesFinaux
};

writeFileSync('data/ngap-complete.json', JSON.stringify(output, null, 2));

console.log('\n✅ Fichier sauvegardé: data/ngap-complete.json');

// Statistiques
const stats = {};
actesFinaux.forEach(a => {
    stats[a.lettreCle] = (stats[a.lettreCle] || 0) + 1;
});

console.log('\n📊 Répartition par lettre-clé:');
Object.entries(stats)
    .sort((a, b) => b[1] - a[1])
    .forEach(([lettre, count]) => {
        console.log(`  ${lettre}: ${count} actes`);
    });
