// PARSER COMPLET - Extraction de TOUS les actes depuis nomenclature-complete.txt
import { readFileSync, writeFileSync } from 'fs';

console.log('🔧 EXTRACTION COMPLÈTE DE LA NOMENCLATURE OFFICIELLE...\n');

const source = readFileSync('nomenclature-complete.txt', 'utf8');
const lines = source.split('\n');

const actes = [];
const lettresCles = ['K', 'B', 'R', 'E', 'S', 'O', 'C', 'V', 'D', 'P', 'G', 'M', 'N', 'AMI', 'A', 'F', 'L', 'T', 'U', 'X', 'Y', 'Z', 'SC', 'SF'];

let currentSection = '';
let currentChapter = '';

// Patterns d'extraction
const patterns = {
    // Code avec coefficient simple: "0001 Main, poignet... 10"
    codeLine: /^([0o]\s?\d{3}(?:\/\d+)?)\s+(.+?)\s+(\d{1,3})(?:\s+\d{1,3})?\s*$/,
    
    // Code avec lettre-clé: "1473 ... B 30"
    codeWithLetter: /^(\d{4}(?:\/\d+)?)\s+(.+?)\s+([A-Z]{1,3})\s+(\d{1,3}(?:[,.]\d+)?)\s*$/,
    
    // Détection de sections
    section: /^(TITRE|CHAPITRE|SECTION|ART\.|Article)\s+([IVX\d]+)?[.:\-\s]+(.*)/i,
    
    // Code seul en début de ligne
    codeOnly: /^([0o]\s?\d{3}(?:\/\d+)?|^\d{4}(?:\/\d+)?)\s+/
};

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line || line.length < 8) continue;
    
    // Nettoyer les caractères OCR
    line = line.replace(/[o]/g, '0').replace(/\s+/g, ' ');
    
    // Détecter sections/chapitres
    const sectionMatch = line.match(patterns.section);
    if (sectionMatch) {
        const sectionText = sectionMatch[3].trim();
        if (sectionMatch[1].toLowerCase().includes('titre')) {
            currentSection = sectionText;
        } else if (sectionMatch[1].toLowerCase().includes('chapitre')) {
            currentChapter = sectionText;
        }
        continue;
    }
    
    // Pattern 1: Ligne complète avec lettre-clé explicite
    const match1 = line.match(patterns.codeWithLetter);
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
                    libelle: nettoyerLibelle(libelle),
                    section: currentSection,
                    chapter: currentChapter
                });
            }
        }
        continue;
    }
    
    // Pattern 2: Code avec coefficient K implicite (fractures, traumatismes)
    const match2 = line.match(patterns.codeLine);
    if (match2) {
        const [_, code, libelle, coef] = match2;
        const coefficientNum = parseInt(coef);
        
        // Les actes de traumatismes sont généralement en K
        if (coefficientNum >= 5 && coefficientNum <= 150) {
            const lettre = devinerLettreCle(libelle, currentSection, coefficientNum);
            
            actes.push({
                code: normalizeCode(code),
                codeNGAP: `${lettre} ${coefficientNum}`,
                lettreCle: lettre,
                coefficient: coefficientNum,
                libelle: nettoyerLibelle(libelle),
                section: currentSection,
                chapter: currentChapter
            });
        }
        continue;
    }
    
    // Pattern 3: Multi-lignes
    const codeMatch = line.match(patterns.codeOnly);
    if (codeMatch) {
        const code = normalizeCode(codeMatch[1]);
        let fullText = line;
        
        // Lire jusqu'à 5 lignes suivantes
        for (let j = 1; j <= 5 && (i + j) < lines.length; j++) {
            const nextLine = lines[i + j].trim();
            if (nextLine && !nextLine.match(/^[0o]\s?\d{3}/) && !nextLine.match(/^\d{4}/)) {
                fullText += ' ' + nextLine;
            } else {
                break;
            }
        }
        
        // Chercher coefficient
        const coeffMatch = fullText.match(/\b(\d{1,3})\s*(?:\d{1,3})?\s*$/);
        if (coeffMatch) {
            const coef = parseInt(coeffMatch[1]);
            if (coef >= 5 && coef <= 150) {
                const libelle = fullText.replace(code, '').replace(coeffMatch[0], '').trim();
                const lettre = devinerLettreCle(libelle, currentSection, coef);
                
                if (libelle.length >= 10) {
                    actes.push({
                        code: code,
                        codeNGAP: `${lettre} ${coef}`,
                        lettreCle: lettre,
                        coefficient: coef,
                        libelle: nettoyerLibelle(libelle),
                        section: currentSection,
                        chapter: currentChapter
                    });
                }
            }
        }
    }
}

// Fonctions utilitaires
function normalizeCode(code) {
    return code.replace(/[o]/gi, '0').replace(/\s/g, '').trim();
}

function nettoyerLibelle(text) {
    return text
        .replace(/\.{2,}/g, '')
        .replace(/\s+/g, ' ')
        .replace(/['"«»]/g, '')
        .trim();
}

function devinerLettreCle(libelle, section, coefficient) {
    const lower = libelle.toLowerCase() + ' ' + section.toLowerCase();
    
    // Biologie
    if (lower.match(/sang|sérum|plasma|hémato|glycémie|créatinine|urée|iono|formule|numération|fns|nfs/)) {
        return 'B';
    }
    
    // Radiologie
    if (lower.match(/radio|rayon|cliché|scanner|irm|tdm|image/)) {
        return 'R';
    }
    
    // Chirurgie
    if (lower.match(/exérèse|ablation|amputation|greffe|suture|section|résection/) && coefficient >= 30) {
        return 'E';
    }
    
    // Actes techniques (fractures, traumatismes, etc.)
    if (lower.match(/fracture|luxation|traitement|réduction|immobilisation|plâtre|pansement/)) {
        return 'K';
    }
    
    // Par défaut selon coefficient
    if (coefficient >= 50) return 'E';
    if (coefficient >= 20) return 'K';
    return 'K';
}

// Dédupliquer
const actesUniques = [];
const codesVus = new Set();

for (const acte of actes) {
    if (!codesVus.has(acte.code)) {
        codesVus.add(acte.code);
        actesUniques.push(acte);
    }
}

console.log(`✅ ${actesUniques.length} actes extraits de la nomenclature officielle`);

// Ajouter les actes modernes
const actesModernes = [
    { code: '9001', codeNGAP: 'R 90', lettreCle: 'R', coefficient: 90, libelle: 'Tomodensitométrie (TDM / Scanner) - par région anatomique', section: 'IMAGERIE MODERNE', chapter: 'Scanner et IRM' },
    { code: '9002', codeNGAP: 'R 90', lettreCle: 'R', coefficient: 90, libelle: 'Imagerie par Résonance Magnétique (IRM) - par région anatomique', section: 'IMAGERIE MODERNE', chapter: 'Scanner et IRM' },
    { code: '9003', codeNGAP: 'R 120', lettreCle: 'R', coefficient: 120, libelle: 'Scanner avec injection de produit de contraste', section: 'IMAGERIE MODERNE', chapter: 'Scanner et IRM' },
    { code: '9004', codeNGAP: 'R 120', lettreCle: 'R', coefficient: 120, libelle: 'IRM avec injection de produit de contraste (Gadolinium)', section: 'IMAGERIE MODERNE', chapter: 'Scanner et IRM' },
    { code: '9010', codeNGAP: 'R 20', lettreCle: 'R', coefficient: 20, libelle: 'Radiographie standard (un cliché)', section: 'RADIOLOGIE', chapter: 'Radiographie simple' },
    { code: '9011', codeNGAP: 'R 30', lettreCle: 'R', coefficient: 30, libelle: 'Radiographie standard (deux clichés)', section: 'RADIOLOGIE', chapter: 'Radiographie simple' },
    { code: '9012', codeNGAP: 'K 50', lettreCle: 'K', coefficient: 50, libelle: 'Échographie abdominale', section: 'ECHOGRAPHIE', chapter: 'Échographie' },
    { code: '9013', codeNGAP: 'K 40', lettreCle: 'K', coefficient: 40, libelle: 'Échographie pelvienne', section: 'ECHOGRAPHIE', chapter: 'Échographie' },
    { code: '9014', codeNGAP: 'K 40', lettreCle: 'K', coefficient: 40, libelle: 'Échographie obstétricale', section: 'ECHOGRAPHIE', chapter: 'Échographie' },
    { code: '9015', codeNGAP: 'K 35', lettreCle: 'K', coefficient: 35, libelle: 'Doppler vasculaire', section: 'ECHOGRAPHIE', chapter: 'Doppler' },
    { code: '9020', codeNGAP: 'C 1', lettreCle: 'C', coefficient: 1, libelle: 'Consultation au cabinet médical', section: 'CONSULTATIONS', chapter: 'Médecine générale' },
    { code: '9021', codeNGAP: 'C 2', lettreCle: 'C', coefficient: 2, libelle: 'Consultation spécialisée', section: 'CONSULTATIONS', chapter: 'Médecine spécialisée' },
    { code: '9022', codeNGAP: 'V 1', lettreCle: 'V', coefficient: 1, libelle: 'Visite à domicile', section: 'VISITES', chapter: 'Visites médicales' },
    { code: '9030', codeNGAP: 'B 30', lettreCle: 'B', coefficient: 30, libelle: 'Formule Numérique Sanguine (FNS / NFS / Hémogramme complet)', section: 'BIOLOGIE - HEMATOLOGIE', chapter: 'Analyses sanguines' },
    { code: '9031', codeNGAP: 'B 10', lettreCle: 'B', coefficient: 10, libelle: 'Glycémie à jeun', section: 'BIOLOGIE - BIOCHIMIE', chapter: 'Métabolisme glucidique' },
    { code: '9032', codeNGAP: 'B 10', lettreCle: 'B', coefficient: 10, libelle: 'Créatinine sérique', section: 'BIOLOGIE - BIOCHIMIE', chapter: 'Fonction rénale' },
    { code: '9033', codeNGAP: 'B 10', lettreCle: 'B', coefficient: 10, libelle: 'Urée sanguine', section: 'BIOLOGIE - BIOCHIMIE', chapter: 'Fonction rénale' },
    { code: '9034', codeNGAP: 'B 30', lettreCle: 'B', coefficient: 30, libelle: 'Ionogramme sanguin complet (Na, K, Cl)', section: 'BIOLOGIE - BIOCHIMIE', chapter: 'Ionogramme' },
    { code: '9035', codeNGAP: 'B 70', lettreCle: 'B', coefficient: 70, libelle: 'TSH (Thyréostimuline)', section: 'BIOLOGIE - HORMONOLOGIE', chapter: 'Thyroïde' },
    { code: '9036', codeNGAP: 'B 40', lettreCle: 'B', coefficient: 40, libelle: 'CRP (Protéine C-Réactive)', section: 'BIOLOGIE - IMMUNOLOGIE', chapter: 'Inflammation' },
    { code: '9037', codeNGAP: 'B 8', lettreCle: 'B', coefficient: 8, libelle: 'Vitesse de Sédimentation (VS)', section: 'BIOLOGIE - HEMATOLOGIE', chapter: 'Inflammation' },
    { code: '9040', codeNGAP: 'K 10', lettreCle: 'K', coefficient: 10, libelle: 'Électrocardiogramme (ECG) standard 12 dérivations', section: 'EXPLORATIONS FONCTIONNELLES', chapter: 'Cardiologie' },
    { code: '9041', codeNGAP: 'K 40', lettreCle: 'K', coefficient: 40, libelle: 'Épreuve d\'effort (ECG d\'effort)', section: 'EXPLORATIONS FONCTIONNELLES', chapter: 'Cardiologie' },
    { code: '9042', codeNGAP: 'K 40', lettreCle: 'K', coefficient: 40, libelle: 'Holter ECG 24h', section: 'EXPLORATIONS FONCTIONNELLES', chapter: 'Cardiologie' },
    { code: '9050', codeNGAP: 'AMI 1', lettreCle: 'AMI', coefficient: 1, libelle: 'Pansement simple', section: 'SOINS INFIRMIERS', chapter: 'Pansements' },
    { code: '9051', codeNGAP: 'AMI 2', lettreCle: 'AMI', coefficient: 2, libelle: 'Pansement lourd ou complexe', section: 'SOINS INFIRMIERS', chapter: 'Pansements' },
    { code: '9052', codeNGAP: 'AMI 1', lettreCle: 'AMI', coefficient: 1, libelle: 'Injection intramusculaire ou sous-cutanée', section: 'SOINS INFIRMIERS', chapter: 'Injections' },
    { code: '9053', codeNGAP: 'AMI 2', lettreCle: 'AMI', coefficient: 2, libelle: 'Injection intraveineuse', section: 'SOINS INFIRMIERS', chapter: 'Injections' }
];

const actesFinaux = [...actesUniques, ...actesModernes];

console.log(`✅ + ${actesModernes.length} actes modernes ajoutés`);
console.log(`\n🎉 TOTAL FINAL: ${actesFinaux.length} actes`);

// Sauvegarder
const output = {
    version: '2026-COMPLETE-OFFICIEL',
    date: new Date().toISOString().split('T')[0],
    source: 'Nomenclature Officielle Algérienne 1987 (206 pages) + Actes modernes 2026',
    totalActes: actesFinaux.length,
    documentSource: 'nomenclature-complete.txt (5920 lignes)',
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

// Exemples
console.log('\n📋 Exemples d\'actes extraits:');
const exemples = actesFinaux.slice(0, 10);
exemples.forEach(a => {
    console.log(`  ${a.code} → ${a.codeNGAP} - ${a.libelle.substring(0, 60)}...`);
});
