// Parser complet pour extraire TOUS les codes NGAP + ajout des actes modernes
import { readFileSync, writeFileSync } from 'fs';

console.log('🔧 Parsing complet de la nomenclature NGAP...\n');

const textContent = readFileSync('acte_extracted_clean.txt', 'utf-8');
const lines = textContent.split('\n');

const actes = [];
let currentSection = '';
let currentChapter = '';
let codeEnCours = null;
let lignesDescription = [];

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
    
    // Format 1: CODE Description... COEF LETTRE COEF2 (ex: 0086 Ablation... 40 E 30)
    const match1 = line.match(/^(\d{3,4}[A-Z\-]*)\s+(.+?)\s+\d+\s+([A-Z]+)\s+(\d+)\s*$/);
    if (match1) {
        const [, code, description, lettreCle, coef] = match1;
        actes.push({
            code: code.trim(),
            codeNGAP: `${lettreCle.trim()} ${coef.trim()}`,
            lettreCle: lettreCle.trim(),
            coefficient: parseInt(coef),
            libelle: description.trim().replace(/\s+/g, ' ').substring(0, 500),
            section: currentSection,
            chapter: currentChapter
        });
        continue;
    }
    
    // Format 2: CODE Description... LETTRE COEF (ex: 1473 Examen... B 30)
    const match2 = line.match(/^(\d{3,4}[A-Z\-]*)\s+(.+?)\s+([A-Z]+)\s+(\d+)\s*$/);
    if (match2) {
        const [, code, description, lettreCle, coef] = match2;
        actes.push({
            code: code.trim(),
            codeNGAP: `${lettreCle.trim()} ${coef.trim()}`,
            lettreCle: lettreCle.trim(),
            coefficient: parseInt(coef),
            libelle: description.trim().replace(/\s+/g, ' ').substring(0, 500),
            section: currentSection,
            chapter: currentChapter
        });
        continue;
    }
    
    // Format 3: CODE Description... (sur plusieurs lignes, code NGAP plus tard)
    const match3 = line.match(/^(\d{3,4}[A-Z\-]*)\s+(.+)$/);
    if (match3) {
        // Sauvegarder l'acte précédent si on a un code NGAP
        if (codeEnCours && lignesDescription.length > 0) {
            const texteComplet = lignesDescription.join(' ');
            // Chercher pattern: LETTRE COEF ou COEF LETTRE COEF
            const matchCodeMulti = texteComplet.match(/\s+(?:\d+\s+)?([A-Z]+)\s+(\d+)\s*$/);
            
            if (matchCodeMulti) {
                const description = texteComplet.substring(0, matchCodeMulti.index).trim();
                const lettreCle = matchCodeMulti[1];
                const coef = matchCodeMulti[2];
                
                actes.push({
                    code: codeEnCours,
                    codeNGAP: `${lettreCle} ${coef}`,
                    lettreCle: lettreCle,
                    coefficient: parseInt(coef),
                    libelle: description.replace(/\s+/g, ' ').substring(0, 500),
                    section: currentSection,
                    chapter: currentChapter
                });
            }
        }
        
        // Démarrer un nouvel acte
        codeEnCours = match3[1];
        lignesDescription = [match3[2]];
        continue;
    }
    
    // Continuer la description de l'acte en cours
    if (codeEnCours && line.length > 0 && !line.match(/^-+\s*\d*\s*-*$/)) {
        lignesDescription.push(line);
    }
}

// Traiter le dernier acte
if (codeEnCours && lignesDescription.length > 0) {
    const texteComplet = lignesDescription.join(' ');
    const matchCode = texteComplet.match(/\s+([A-Z]+)\s+(\d+)\s*$/);
    
    if (matchCode) {
        const description = texteComplet.substring(0, matchCode.index).trim();
        const lettreCle = matchCode[1];
        const coef = matchCode[2];
        
        actes.push({
            code: codeEnCours,
            codeNGAP: `${lettreCle} ${coef}`,
            lettreCle: lettreCle,
            coefficient: parseInt(coef),
            libelle: description.replace(/\s+/g, ' ').substring(0, 500),
            section: currentSection,
            chapter: currentChapter
        });
    }
}

console.log(`✅ Extrait ${actes.length} actes depuis le fichier source\n`);

// Ajouter les actes modernes courants manquants
console.log('📋 Ajout des actes modernes courants...\n');

const actesModernes = [
    // Imagerie moderne
    {
        code: '9001',
        codeNGAP: 'R 90',
        lettreCle: 'R',
        coefficient: 90,
        libelle: 'Tomodensitométrie (TDM / Scanner) - par région anatomique',
        section: 'IMAGERIE MODERNE',
        chapter: 'Scanner et IRM'
    },
    {
        code: '9002',
        codeNGAP: 'R 90',
        lettreCle: 'R',
        coefficient: 90,
        libelle: 'Imagerie par Résonance Magnétique (IRM) - par région anatomique',
        section: 'IMAGERIE MODERNE',
        chapter: 'Scanner et IRM'
    },
    {
        code: '9003',
        codeNGAP: 'R 120',
        lettreCle: 'R',
        coefficient: 120,
        libelle: 'Scanner avec injection de produit de contraste',
        section: 'IMAGERIE MODERNE',
        chapter: 'Scanner et IRM'
    },
    {
        code: '9004',
        codeNGAP: 'R 120',
        lettreCle: 'R',
        coefficient: 120,
        libelle: 'IRM avec injection de produit de contraste (Gadolinium)',
        section: 'IMAGERIE MODERNE',
        chapter: 'Scanner et IRM'
    },
    // Radiologie courante
    {
        code: '9010',
        codeNGAP: 'R 20',
        lettreCle: 'R',
        coefficient: 20,
        libelle: 'Radiographie standard (un cliché)',
        section: 'RADIOLOGIE',
        chapter: 'Radiographie simple'
    },
    {
        code: '9011',
        codeNGAP: 'R 30',
        lettreCle: 'R',
        coefficient: 30,
        libelle: 'Radiographie standard (deux clichés)',
        section: 'RADIOLOGIE',
        chapter: 'Radiographie simple'
    },
    {
        code: '9012',
        codeNGAP: 'R 50',
        lettreCle: 'R',
        coefficient: 50,
        libelle: 'Échographie abdominale',
        section: 'ECHOGRAPHIE',
        chapter: 'Échographie'
    },
    {
        code: '9013',
        codeNGAP: 'R 40',
        lettreCle: 'R',
        coefficient: 40,
        libelle: 'Échographie pelvienne',
        section: 'ECHOGRAPHIE',
        chapter: 'Échographie'
    },
    {
        code: '9014',
        codeNGAP: 'R 40',
        lettreCle: 'R',
        coefficient: 40,
        libelle: 'Échographie obstétricale',
        section: 'ECHOGRAPHIE',
        chapter: 'Échographie'
    },
    // Consultations
    {
        code: '9020',
        codeNGAP: 'C 1',
        lettreCle: 'C',
        coefficient: 1,
        libelle: 'Consultation au cabinet médical',
        section: 'CONSULTATIONS',
        chapter: 'Médecine générale'
    },
    {
        code: '9021',
        codeNGAP: 'C 2',
        lettreCle: 'C',
        coefficient: 2,
        libelle: 'Consultation spécialisée',
        section: 'CONSULTATIONS',
        chapter: 'Médecine spécialisée'
    },
    {
        code: '9022',
        codeNGAP: 'V 1',
        lettreCle: 'V',
        coefficient: 1,
        libelle: 'Visite à domicile',
        section: 'VISITES',
        chapter: 'Visites médicales'
    },
    // Biologie courante additionnelle
    {
        code: '9030',
        codeNGAP: 'B 30',
        lettreCle: 'B',
        coefficient: 30,
        libelle: 'Formule Numérique Sanguine (FNS / NFS / Hémogramme complet)',
        section: 'BIOLOGIE - HEMATOLOGIE',
        chapter: 'Analyses sanguines'
    },
    {
        code: '9031',
        codeNGAP: 'B 20',
        lettreCle: 'B',
        coefficient: 20,
        libelle: 'Glycémie à jeun',
        section: 'BIOLOGIE - BIOCHIMIE',
        chapter: 'Métabolisme glucidique'
    },
    {
        code: '9032',
        codeNGAP: 'B 20',
        lettreCle: 'B',
        coefficient: 20,
        libelle: 'Créatinine sérique',
        section: 'BIOLOGIE - BIOCHIMIE',
        chapter: 'Fonction rénale'
    },
    {
        code: '9033',
        codeNGAP: 'B 20',
        lettreCle: 'B',
        coefficient: 20,
        libelle: 'Urée sanguine',
        section: 'BIOLOGIE - BIOCHIMIE',
        chapter: 'Fonction rénale'
    },
    {
        code: '9034',
        codeNGAP: 'B 30',
        lettreCle: 'B',
        coefficient: 30,
        libelle: 'Ionogramme sanguin complet (Na, K, Cl, Réserve alcaline)',
        section: 'BIOLOGIE - BIOCHIMIE',
        chapter: 'Ionogramme'
    },
    {
        code: '9035',
        codeNGAP: 'B 70',
        lettreCle: 'B',
        coefficient: 70,
        libelle: 'TSH (Thyréostimuline)',
        section: 'BIOLOGIE - HORMONOLOGIE',
        chapter: 'Thyroïde'
    },
    // ECG
    {
        code: '9040',
        codeNGAP: 'K 15',
        lettreCle: 'K',
        coefficient: 15,
        libelle: 'Électrocardiogramme (ECG) standard 12 dérivations',
        section: 'EXPLORATIONS FONCTIONNELLES',
        chapter: 'Cardiologie'
    }
];

actes.push(...actesModernes);

console.log(`✅ Ajouté ${actesModernes.length} actes modernes`);
console.log(`📊 Total: ${actes.length} actes\n`);

// Afficher quelques exemples
console.log('📋 Exemples:');
console.log('\n🔍 FNS/Hémogramme:');
const fns = actes.filter(a => 
    a.libelle.toLowerCase().includes('hémogramme') ||
    a.libelle.toLowerCase().includes('fns') ||
    a.libelle.toLowerCase().includes('nfs') ||
    a.libelle.toLowerCase().includes('formule numérique')
);
fns.forEach(a => console.log(`  ${a.code} → ${a.codeNGAP} - ${a.libelle.substring(0, 60)}`));

console.log('\n🔍 Scanner/IRM:');
const imagerie = actes.filter(a => 
    a.libelle.toLowerCase().includes('scanner') ||
    a.libelle.toLowerCase().includes('irm') ||
    a.libelle.toLowerCase().includes('tomodensitométrie') ||
    a.libelle.toLowerCase().includes('résonance magnétique')
);
imagerie.forEach(a => console.log(`  ${a.code} → ${a.codeNGAP} - ${a.libelle.substring(0, 60)}`));

// Sauvegarder
const output = {
    version: '2026',
    date: new Date().toISOString().split('T')[0],
    source: 'Nomenclature Algérienne 1987 + Actes modernes',
    totalActes: actes.length,
    actes: actes
};

writeFileSync('data/ngap-complete.json', JSON.stringify(output, null, 2));
console.log('\n✅ Fichier sauvegardé: data/ngap-complete.json');
console.log(`\n🎉 ${actes.length} actes extraits avec succès !`);
