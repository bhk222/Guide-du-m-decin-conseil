// Parser ultra-complet pour extraire TOUS les codes NGAP
import { readFileSync, writeFileSync } from 'fs';

console.log('🔧 Parsing ultra-complet de la nomenclature NGAP...\n');

const textContent = readFileSync('acte_extracted_clean.txt', 'utf-8');
const lines = textContent.split('\n');

const actes = [];
let currentSection = '';
let currentChapter = '';
let acteEnCours = null;

// Lettres-clés valides de la nomenclature algérienne
const lettresClesValides = ['A', 'B', 'C', 'D', 'E', 'K', 'O', 'P', 'R', 'S', 'V', 'AMI', 'AIS', 'AMX', 'AMK'];

// Patterns de codes NGAP possibles
const patternsCodeNGAP = [
    /\b([A-Z]{1,3})\s+(\d{1,3})\s*$/,              // LETTRE COEF (ex: B 30)
    /\b\d+\s+([A-Z]{1,3})\s+(\d{1,3})\s*$/,        // COEF LETTRE COEF (ex: 40 E 30)
    /\b([A-Z]{1,3})\s+(\d{1,3})\s*\.\.\./,          // LETTRE COEF... (ex: B 30...)
    /\b([A-Z]{1,3})\s+(\d{1,3})\s*[;,]/,            // LETTRE COEF; (ex: B 30;)
    /\b([A-Z]{1,3})\s+(\d{1,3})\s+[+]/,             // LETTRE COEF + (ex: K 30 +)
];

function trouverCodeNGAP(texte) {
    for (const pattern of patternsCodeNGAP) {
        const match = texte.match(pattern);
        if (match) {
            const lettreCle = match[1];
            const coefficient = parseInt(match[2]);
            
            // Vérifier que la lettre-clé est valide
            if (lettresClesValides.includes(lettreCle) && coefficient > 0 && coefficient < 500) {
                return {
                    lettreCle: lettreCle,
                    coefficient: coefficient,
                    index: match.index
                };
            }
        }
    }
    return null;
}

function sauvegarderActe() {
    if (!acteEnCours) return;
    
    const texteComplet = acteEnCours.lignes.join(' ');
    const codeNGAP = trouverCodeNGAP(texteComplet);
    
    if (codeNGAP) {
        const description = texteComplet.substring(0, codeNGAP.index).trim();
        
        // Nettoyer la description
        const descriptionNettoyee = description
            .replace(/\s+/g, ' ')
            .replace(/\.\.\./g, '')
            .replace(/[~•]/g, '')
            .substring(0, 500);
        
        if (descriptionNettoyee.length > 5) {
            actes.push({
                code: acteEnCours.code,
                codeNGAP: `${codeNGAP.lettreCle} ${codeNGAP.coefficient}`,
                lettreCle: codeNGAP.lettreCle,
                coefficient: codeNGAP.coefficient,
                libelle: descriptionNettoyee,
                section: acteEnCours.section,
                chapter: acteEnCours.chapter
            });
        }
    }
}

let compteurLignes = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    compteurLignes++;
    
    // Ignorer les lignes vides et les séparateurs
    if (!line || line.match(/^-+\s*\d*\s*-*$/) || line.match(/^\d+\s*$/)) {
        continue;
    }
    
    // Détecter les sections
    if (line.startsWith('TITRE')) {
        currentSection = line;
        continue;
    }
    
    // Détecter les chapitres
    if (line.startsWith('CHAPITRE') || line.startsWith('SECTION')) {
        currentChapter = line;
        continue;
    }
    
    // Détecter un nouveau code d'acte (4 chiffres au début)
    const matchCode = line.match(/^(\d{3,4}[A-Z\-]*)\s+(.*)$/);
    
    if (matchCode) {
        // Sauvegarder l'acte précédent
        sauvegarderActe();
        
        // Démarrer un nouvel acte
        acteEnCours = {
            code: matchCode[1],
            lignes: [matchCode[2]],
            section: currentSection,
            chapter: currentChapter
        };
        
        // Si le code NGAP est déjà sur cette ligne, sauvegarder immédiatement
        if (trouverCodeNGAP(matchCode[2])) {
            sauvegarderActe();
            acteEnCours = null;
        }
    }
    // Continuer l'acte en cours
    else if (acteEnCours) {
        acteEnCours.lignes.push(line);
        
        // Si on trouve un code NGAP, sauvegarder
        if (trouverCodeNGAP(line)) {
            sauvegarderActe();
            acteEnCours = null;
        }
        
        // Limite de 10 lignes par acte pour éviter de mélanger
        if (acteEnCours && acteEnCours.lignes.length > 10) {
            sauvegarderActe();
            acteEnCours = null;
        }
    }
}

// Sauvegarder le dernier acte
sauvegarderActe();

console.log(`✅ Extrait ${actes.length} actes depuis le fichier source (${compteurLignes} lignes analysées)\n`);

// Statistiques par lettre-clé
const stats = {};
actes.forEach(a => {
    stats[a.lettreCle] = (stats[a.lettreCle] || 0) + 1;
});

console.log('📊 Statistiques par lettre-clé:');
Object.entries(stats)
    .sort((a, b) => b[1] - a[1])
    .forEach(([lettre, count]) => {
        console.log(`  ${lettre}: ${count} actes`);
    });

// Ajouter les actes modernes
console.log('\n📋 Ajout des actes modernes courants...\n');

const actesModernes = [
    // Imagerie moderne
    { code: '9001', codeNGAP: 'R 90', lettreCle: 'R', coefficient: 90, libelle: 'Tomodensitométrie (TDM / Scanner) - par région anatomique', section: 'IMAGERIE MODERNE', chapter: 'Scanner et IRM' },
    { code: '9002', codeNGAP: 'R 90', lettreCle: 'R', coefficient: 90, libelle: 'Imagerie par Résonance Magnétique (IRM) - par région anatomique', section: 'IMAGERIE MODERNE', chapter: 'Scanner et IRM' },
    { code: '9003', codeNGAP: 'R 90', lettreCle: 'R', coefficient: 90, libelle: 'Scanner avec injection de produit de contraste', section: 'IMAGERIE MODERNE', chapter: 'Scanner et IRM' },
    { code: '9004', codeNGAP: 'R 90', lettreCle: 'R', coefficient: 90, libelle: 'IRM avec injection de produit de contraste (Gadolinium)', section: 'IMAGERIE MODERNE', chapter: 'Scanner et IRM' },
    { code: '9010', codeNGAP: 'R 20', lettreCle: 'R', coefficient: 20, libelle: 'Radiographie standard (un cliché)', section: 'RADIOLOGIE', chapter: 'Radiographie simple' },
    { code: '9011', codeNGAP: 'R 30', lettreCle: 'R', coefficient: 30, libelle: 'Radiographie standard (deux clichés)', section: 'RADIOLOGIE', chapter: 'Radiographie simple' },
    { code: '9012', codeNGAP: 'K 50', lettreCle: 'K', coefficient: 50, libelle: 'Échographie abdominale', section: 'ECHOGRAPHIE', chapter: 'Échographie' },
    { code: '9013', codeNGAP: 'K 40', lettreCle: 'K', coefficient: 40, libelle: 'Échographie pelvienne', section: 'ECHOGRAPHIE', chapter: 'Échographie' },
    { code: '9014', codeNGAP: 'K 40', lettreCle: 'K', coefficient: 40, libelle: 'Échographie obstétricale', section: 'ECHOGRAPHIE', chapter: 'Échographie' },
    { code: '9015', codeNGAP: 'K 35', lettreCle: 'K', coefficient: 35, libelle: 'Doppler vasculaire', section: 'ECHOGRAPHIE', chapter: 'Doppler' },
    // Consultations
    { code: '9020', codeNGAP: 'C 1', lettreCle: 'C', coefficient: 1, libelle: 'Consultation au cabinet médical', section: 'CONSULTATIONS', chapter: 'Médecine générale' },
    { code: '9021', codeNGAP: 'C 2', lettreCle: 'C', coefficient: 2, libelle: 'Consultation spécialisée', section: 'CONSULTATIONS', chapter: 'Médecine spécialisée' },
    { code: '9022', codeNGAP: 'V 1', lettreCle: 'V', coefficient: 1, libelle: 'Visite à domicile', section: 'VISITES', chapter: 'Visites médicales' },
    // Biologie courante
    { code: '9030', codeNGAP: 'B 30', lettreCle: 'B', coefficient: 30, libelle: 'Formule Numérique Sanguine (FNS / NFS / Hémogramme complet)', section: 'BIOLOGIE - HEMATOLOGIE', chapter: 'Analyses sanguines' },
    { code: '9031', codeNGAP: 'B 20', lettreCle: 'B', coefficient: 20, libelle: 'Glycémie à jeun', section: 'BIOLOGIE - BIOCHIMIE', chapter: 'Métabolisme glucidique' },
    { code: '9032', codeNGAP: 'B 20', lettreCle: 'B', coefficient: 20, libelle: 'Créatinine sérique', section: 'BIOLOGIE - BIOCHIMIE', chapter: 'Fonction rénale' },
    { code: '9033', codeNGAP: 'B 20', lettreCle: 'B', coefficient: 20, libelle: 'Urée sanguine', section: 'BIOLOGIE - BIOCHIMIE', chapter: 'Fonction rénale' },
    { code: '9034', codeNGAP: 'B 30', lettreCle: 'B', coefficient: 30, libelle: 'Ionogramme sanguin complet (Na, K, Cl, Réserve alcaline)', section: 'BIOLOGIE - BIOCHIMIE', chapter: 'Ionogramme' },
    { code: '9035', codeNGAP: 'B 70', lettreCle: 'B', coefficient: 70, libelle: 'TSH (Thyréostimuline)', section: 'BIOLOGIE - HORMONOLOGIE', chapter: 'Thyroïde' },
    { code: '9036', codeNGAP: 'B 30', lettreCle: 'B', coefficient: 30, libelle: 'CRP (Protéine C-Réactive)', section: 'BIOLOGIE - IMMUNOLOGIE', chapter: 'Inflammation' },
    { code: '9037', codeNGAP: 'B 20', lettreCle: 'B', coefficient: 20, libelle: 'Vitesse de Sédimentation (VS)', section: 'BIOLOGIE - HEMATOLOGIE', chapter: 'Inflammation' },
    // ECG et explorations
    { code: '9040', codeNGAP: 'K 15', lettreCle: 'K', coefficient: 15, libelle: 'Électrocardiogramme (ECG) standard 12 dérivations', section: 'EXPLORATIONS FONCTIONNELLES', chapter: 'Cardiologie' },
    { code: '9041', codeNGAP: 'K 30', lettreCle: 'K', coefficient: 30, libelle: 'Épreuve d\'effort (ECG d\'effort)', section: 'EXPLORATIONS FONCTIONNELLES', chapter: 'Cardiologie' },
    { code: '9042', codeNGAP: 'K 50', lettreCle: 'K', coefficient: 50, libelle: 'Holter ECG 24h', section: 'EXPLORATIONS FONCTIONNELLES', chapter: 'Cardiologie' },
    // Soins
    { code: '9050', codeNGAP: 'AMI 1', lettreCle: 'AMI', coefficient: 1, libelle: 'Pansement simple', section: 'SOINS INFIRMIERS', chapter: 'Pansements' },
    { code: '9051', codeNGAP: 'AMI 2', lettreCle: 'AMI', coefficient: 2, libelle: 'Pansement lourd ou complexe', section: 'SOINS INFIRMIERS', chapter: 'Pansements' },
    { code: '9052', codeNGAP: 'AMI 1', lettreCle: 'AMI', coefficient: 1, libelle: 'Injection intramusculaire ou sous-cutanée', section: 'SOINS INFIRMIERS', chapter: 'Injections' },
    { code: '9053', codeNGAP: 'AMI 2', lettreCle: 'AMI', coefficient: 2, libelle: 'Injection intraveineuse', section: 'SOINS INFIRMIERS', chapter: 'Injections' },
];

actes.push(...actesModernes);

console.log(`✅ Ajouté ${actesModernes.length} actes modernes`);
console.log(`📊 TOTAL FINAL: ${actes.length} actes\n`);

// Exemples clés
console.log('📋 Exemples clés:\n');

console.log('🔍 FNS/Hémogramme:');
actes.filter(a => a.libelle.toLowerCase().includes('hémogramme') || a.libelle.toLowerCase().includes('fns') || a.libelle.toLowerCase().includes('formule numérique'))
    .forEach(a => console.log(`  ${a.code} → ${a.codeNGAP} - ${a.libelle.substring(0, 60)}`));

console.log('\n🔍 Scanner/IRM/TDM:');
actes.filter(a => a.libelle.toLowerCase().includes('scanner') || a.libelle.toLowerCase().includes('irm') || a.libelle.toLowerCase().includes('tomodensitométrie'))
    .forEach(a => console.log(`  ${a.code} → ${a.codeNGAP} - ${a.libelle.substring(0, 60)}`));

console.log('\n🔍 Radio/Échographie:');
actes.filter(a => (a.libelle.toLowerCase().includes('radiographie') || a.libelle.toLowerCase().includes('échographie')) && a.code.startsWith('90'))
    .forEach(a => console.log(`  ${a.code} → ${a.codeNGAP} - ${a.libelle.substring(0, 60)}`));

// Sauvegarder
const output = {
    version: '2026-v2',
    date: new Date().toISOString().split('T')[0],
    source: 'Nomenclature Algérienne 1987 + Actes modernes 2026',
    totalActes: actes.length,
    actes: actes
};

writeFileSync('data/ngap-complete.json', JSON.stringify(output, null, 2));
console.log('\n✅ Fichier sauvegardé: data/ngap-complete.json');
console.log(`\n🎉 ${actes.length} actes extraits et sauvegardés avec succès !`);
