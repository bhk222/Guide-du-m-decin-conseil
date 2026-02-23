// ====================================================================
// Service NGAP - Nomenclature Générale des Actes Professionnels
// Version 2.0 - Recherche sémantique avancée + Calcul réel (Art. 12)
// ====================================================================
import ngapRawData from '../data/ngap-complete.json';

// ============================================
// INTERFACES
// ============================================
export interface ActeNGAP {
    code: string;        // Code numérique (0001, 0002...)
    codeNGAP: string;    // Code NGAP affiché (K 50, B 30...)
    lettreCle: string;   // Lettre-clé (K, B, R, C, CS...)
    coefficient: number; // Coefficient
    libelle: string;     // Description
    tarif: number;       // Tarif en DA = coefficient × valeur unitaire
    categorie?: string;  // Catégorie affichée
    chapitre?: string;   // Chapitre source
    entente?: boolean;   // Entente préalable requise
}

export interface ActeCalcule {
    acte: ActeNGAP;
    quantite: number;
    tarifBrut: number;
    tarifNet: number;
    taux: number;       // 100, 75, 50, ou 0
    ordre: number;
    regle: string;      // Explication de la règle appliquée
}

export interface ResultatCalcul {
    actes: ActeCalcule[];
    totalBrut: number;
    totalNet: number;
    economie: number;
    regles: string[];
}

// Interface pour le mode "Montant" (saisie directe des montants en DA)
export interface MontantEntry {
    id: number;
    libelle: string;
    lettreCle: string;
    montant: number;      // Montant en DA saisi par l'utilisateur
}

export interface MontantCalcule {
    entry: MontantEntry;
    montantBrut: number;
    montantNet: number;
    taux: number;
    ordre: number;
    regle: string;
}

export interface ResultatMontant {
    lignes: MontantCalcule[];
    totalBrut: number;
    totalNet: number;
    economie: number;
    regles: string[];
}

// ============================================
// VALEURS UNITAIRES DES LETTRES-CLÉS (DA)
// Conformes aux tarifs conventionnels CNAS
// ============================================
export const VALEUR_LETTRE_CLE: Record<string, number> = {
    'C':    250,   // Consultation généraliste
    'CS':   300,   // Consultation spécialiste
    'CPSY': 300,   // Consultation psychiatre
    'CD':   250,   // Consultation chirurgien-dentiste
    'CSF':  200,   // Consultation sage-femme
    'V':    300,   // Visite domicile généraliste
    'VS':   350,   // Visite domicile spécialiste
    'VPSY': 350,   // Visite psychiatre
    'VD':   300,   // Visite dentiste
    'VSF':  250,   // Visite sage-femme
    'K':    800,   // Chirurgie et spécialité (×coef)
    'PC':   800,   // Pratique courante (×coef)
    'D':    600,   // Chirurgien-dentiste (×coef)
    'DS':   800,   // Dentiste spécialiste (×coef)
    'B':    300,   // Biologie médicale (×coef)
    'KB':   300,   // Prélèvement biologie (×coef)
    'R':   1000,   // Radiologie (×coef)
    'SF':   600,   // Sage-femme (×coef)
    'AMI':  300,   // Actes infirmiers (×coef)
    'AMM':  400,   // Kinésithérapie (×coef)
};

// Lettres-clés fixes (consultations/visites) vs proportionnelles
export const LETTRES_FIXES = ['C', 'CS', 'CPSY', 'CD', 'CSF', 'V', 'VS', 'VPSY', 'VD', 'VSF'];

// Types d'actes pour le mode Montant (groupés pour l'UI)
export const TYPES_ACTES = [
    { lettre: 'K', label: 'K - Chirurgie / Spécialité', groupe: 'technique' },
    { lettre: 'B', label: 'B - Biologie', groupe: 'technique' },
    { lettre: 'R', label: 'R - Radiologie / Imagerie', groupe: 'technique' },
    { lettre: 'PC', label: 'PC - Pratique courante', groupe: 'technique' },
    { lettre: 'AMI', label: 'AMI - Soins infirmiers', groupe: 'technique' },
    { lettre: 'AMM', label: 'AMM - Kinésithérapie', groupe: 'technique' },
    { lettre: 'D', label: 'D - Dentaire', groupe: 'technique' },
    { lettre: 'SF', label: 'SF - Sage-femme', groupe: 'technique' },
    { lettre: 'C', label: 'C - Consultation généraliste', groupe: 'consultation' },
    { lettre: 'CS', label: 'CS - Consultation spécialiste', groupe: 'consultation' },
    { lettre: 'V', label: 'V - Visite généraliste', groupe: 'consultation' },
    { lettre: 'VS', label: 'VS - Visite spécialiste', groupe: 'consultation' },
];

function calculerTarifUnitaire(lettreCle: string, coefficient: number): number {
    if (LETTRES_FIXES.includes(lettreCle)) {
        return VALEUR_LETTRE_CLE[lettreCle] || 250;
    }
    const valeur = VALEUR_LETTRE_CLE[lettreCle] || VALEUR_LETTRE_CLE['K'];
    return valeur * coefficient;
}

// ============================================
// ACTES INTÉGRÉS (Consultations, Biologie, Imagerie, Soins)
// ============================================
const ACTES_INTEGRES: ActeNGAP[] = [
    // --- Consultations ---
    { code: 'C', codeNGAP: 'C', lettreCle: 'C', coefficient: 1, libelle: 'Consultation au cabinet - médecin généraliste', tarif: 250, categorie: 'Consultations' },
    { code: 'CS', codeNGAP: 'CS', lettreCle: 'CS', coefficient: 1, libelle: 'Consultation au cabinet - médecin spécialiste', tarif: 300, categorie: 'Consultations' },
    { code: 'CPSY', codeNGAP: 'CPSY', lettreCle: 'CPSY', coefficient: 1, libelle: 'Consultation au cabinet - psychiatre', tarif: 300, categorie: 'Consultations' },
    { code: 'CD', codeNGAP: 'CD', lettreCle: 'CD', coefficient: 1, libelle: 'Consultation au cabinet - chirurgien-dentiste', tarif: 250, categorie: 'Consultations' },
    // --- Visites à domicile ---
    { code: 'V', codeNGAP: 'V', lettreCle: 'V', coefficient: 1, libelle: 'Visite à domicile - médecin généraliste', tarif: 300, categorie: 'Visites' },
    { code: 'VS', codeNGAP: 'VS', lettreCle: 'VS', coefficient: 1, libelle: 'Visite à domicile - médecin spécialiste', tarif: 350, categorie: 'Visites' },
    { code: 'VPSY', codeNGAP: 'VPSY', lettreCle: 'VPSY', coefficient: 1, libelle: 'Visite à domicile - psychiatre', tarif: 350, categorie: 'Visites' },
    // --- Biologie courante (B) ---
    { code: 'B1', codeNGAP: 'B 1', lettreCle: 'B', coefficient: 1, libelle: 'Prélèvement sanguin simple', tarif: 300, categorie: 'Biologie' },
    { code: 'B5', codeNGAP: 'B 5', lettreCle: 'B', coefficient: 5, libelle: 'Vitesse de sédimentation (VS) / Glycémie / Urée / Créatinine', tarif: 1500, categorie: 'Biologie' },
    { code: 'B10', codeNGAP: 'B 10', lettreCle: 'B', coefficient: 10, libelle: 'Cholestérol / Triglycérides / Transaminases ASAT ALAT / GGT / PAL / Acide urique', tarif: 3000, categorie: 'Biologie' },
    { code: 'B15', codeNGAP: 'B 15', lettreCle: 'B', coefficient: 15, libelle: 'CRP (C-Reactive Protein) / Protéines totales / Albumine', tarif: 4500, categorie: 'Biologie' },
    { code: 'B20', codeNGAP: 'B 20', lettreCle: 'B', coefficient: 20, libelle: 'Ionogramme sanguin (Na, K, Cl) / Calcémie / Phosphorémie', tarif: 6000, categorie: 'Biologie' },
    { code: 'B25', codeNGAP: 'B 25', lettreCle: 'B', coefficient: 25, libelle: 'Bilan hépatique complet / Bilan rénal complet', tarif: 7500, categorie: 'Biologie' },
    { code: 'B30', codeNGAP: 'B 30', lettreCle: 'B', coefficient: 30, libelle: 'FNS - Formule Numération Sanguine (Hémogramme complet NFS)', tarif: 9000, categorie: 'Biologie' },
    { code: 'B40', codeNGAP: 'B 40', lettreCle: 'B', coefficient: 40, libelle: 'TSH / T3 / T4 / PSA / Ferritine / Vitamine D / HbA1c', tarif: 12000, categorie: 'Biologie' },
    { code: 'B50', codeNGAP: 'B 50', lettreCle: 'B', coefficient: 50, libelle: 'Sérologies (HIV, Hépatite B/C, Syphilis) / Dosages hormonaux', tarif: 15000, categorie: 'Biologie' },
    { code: 'B60', codeNGAP: 'B 60', lettreCle: 'B', coefficient: 60, libelle: 'Bilan immunologique / Électrophorèse des protéines', tarif: 18000, categorie: 'Biologie' },
    { code: 'B80', codeNGAP: 'B 80', lettreCle: 'B', coefficient: 80, libelle: 'Caryotype / Biologie moléculaire / Génétique', tarif: 24000, categorie: 'Biologie' },
    // --- Imagerie / Radiologie (R) ---
    { code: 'R10', codeNGAP: 'R 10', lettreCle: 'R', coefficient: 10, libelle: 'Radiographie standard (membre, thorax face)', tarif: 10000, categorie: 'Imagerie' },
    { code: 'R15', codeNGAP: 'R 15', lettreCle: 'R', coefficient: 15, libelle: 'Radiographie avec préparation / Mammographie', tarif: 15000, categorie: 'Imagerie' },
    { code: 'R20', codeNGAP: 'R 20', lettreCle: 'R', coefficient: 20, libelle: 'Radiographie complexe (rachis, bassin) / Urographie IV', tarif: 20000, categorie: 'Imagerie' },
    { code: 'R25', codeNGAP: 'R 25', lettreCle: 'R', coefficient: 25, libelle: 'Échographie abdominale / pelvienne / obstétricale', tarif: 25000, categorie: 'Imagerie' },
    { code: 'R30', codeNGAP: 'R 30', lettreCle: 'R', coefficient: 30, libelle: 'Scanner (TDM) / Arthrographie / Hystérographie', tarif: 30000, categorie: 'Imagerie' },
    // --- Soins infirmiers (AMI) ---
    { code: 'AMI1', codeNGAP: 'AMI 1', lettreCle: 'AMI', coefficient: 1, libelle: 'Injection sous-cutanée / intra-musculaire', tarif: 300, categorie: 'Soins infirmiers' },
    { code: 'AMI2', codeNGAP: 'AMI 2', lettreCle: 'AMI', coefficient: 2, libelle: 'Injection intraveineuse / Pansement simple', tarif: 600, categorie: 'Soins infirmiers' },
    { code: 'AMI3', codeNGAP: 'AMI 3', lettreCle: 'AMI', coefficient: 3, libelle: 'Pansement complexe / Soins d\'escarre', tarif: 900, categorie: 'Soins infirmiers' },
    { code: 'AMI4', codeNGAP: 'AMI 4', lettreCle: 'AMI', coefficient: 4, libelle: 'Perfusion intraveineuse / Sondage urinaire', tarif: 1200, categorie: 'Soins infirmiers' },
    { code: 'AMI5', codeNGAP: 'AMI 5', lettreCle: 'AMI', coefficient: 5, libelle: 'Soins infirmiers complexes / Cathéter / Drainage', tarif: 1500, categorie: 'Soins infirmiers' },
    // --- Kinésithérapie (AMM) ---
    { code: 'AMM5', codeNGAP: 'AMM 5', lettreCle: 'AMM', coefficient: 5, libelle: 'Séance de kinésithérapie simple (rééducation membre)', tarif: 2000, categorie: 'Kinésithérapie' },
    { code: 'AMM7', codeNGAP: 'AMM 7', lettreCle: 'AMM', coefficient: 7, libelle: 'Séance de kinésithérapie respiratoire', tarif: 2800, categorie: 'Kinésithérapie' },
    { code: 'AMM10', codeNGAP: 'AMM 10', lettreCle: 'AMM', coefficient: 10, libelle: 'Séance de rééducation fonctionnelle complète / Rééducation neurologique', tarif: 4000, categorie: 'Kinésithérapie' },
    // --- Pratique courante (PC) ---
    { code: 'PC2', codeNGAP: 'PC 2', lettreCle: 'PC', coefficient: 2, libelle: 'Injection sous-cutanée par médecin', tarif: 1600, categorie: 'Pratique courante' },
    { code: 'PC4', codeNGAP: 'PC 4', lettreCle: 'PC', coefficient: 4, libelle: 'Ponction veineuse / Saignée', tarif: 3200, categorie: 'Pratique courante' },
    { code: 'PC5', codeNGAP: 'PC 5', lettreCle: 'PC', coefficient: 5, libelle: 'Petite chirurgie : ablation fils, sondage, etc.', tarif: 4000, categorie: 'Pratique courante' },
];

// ============================================
// DICTIONNAIRE D'ABRÉVIATIONS MÉDICALES (150+)
// ============================================
const ABREVIATIONS_MEDICALES: Record<string, string[]> = {
    // === BIOLOGIE ===
    'fns': ['formule', 'numération', 'sanguine', 'hémogramme', 'nfs', 'B 30'],
    'nfs': ['formule', 'numération', 'sanguine', 'hémogramme', 'fns', 'B 30'],
    'hemogramme': ['formule', 'numération', 'sanguine', 'fns', 'nfs', 'B 30'],
    'hémogramme': ['formule', 'numération', 'sanguine', 'fns', 'nfs', 'B 30'],
    'vs': ['vitesse', 'sédimentation', 'B 5'],
    'crp': ['reactive', 'protein', 'protéine', 'B 15'],
    'glycemie': ['glucose', 'sucre', 'glycémie', 'B 5'],
    'glycémie': ['glucose', 'sucre', 'B 5'],
    'uree': ['urée', 'azote', 'B 5'],
    'urée': ['urée', 'azote', 'B 5'],
    'creatinine': ['créatinine', 'rein', 'rénal', 'B 10'],
    'créatinine': ['créatinine', 'rein', 'rénal', 'B 10'],
    'cholesterol': ['cholestérol', 'lipide', 'B 10'],
    'cholestérol': ['cholestérol', 'lipide', 'B 10'],
    'triglycerides': ['triglycérides', 'lipide', 'B 10'],
    'triglycérides': ['triglycérides', 'lipide', 'B 10'],
    'transaminases': ['ASAT', 'ALAT', 'transaminase', 'hépatique', 'B 10'],
    'asat': ['transaminase', 'hépatique', 'B 10'],
    'alat': ['transaminase', 'hépatique', 'B 10'],
    'got': ['transaminase', 'ASAT', 'B 10'],
    'gpt': ['transaminase', 'ALAT', 'B 10'],
    'ggt': ['gamma', 'glutamyl', 'GGT', 'B 10'],
    'pal': ['phosphatase', 'alcaline', 'B 10'],
    'tsh': ['thyroïde', 'TSH', 'thyréostimuline', 'B 40'],
    't3': ['thyroïde', 'triiodothyronine', 'B 40'],
    't4': ['thyroïde', 'thyroxine', 'B 40'],
    'psa': ['prostate', 'antigène', 'PSA', 'B 40'],
    'hba1c': ['hémoglobine', 'glyquée', 'HbA1c', 'diabète', 'B 40'],
    'inr': ['coagulation', 'prothrombine', 'INR', 'TP'],
    'tp': ['prothrombine', 'coagulation', 'INR', 'TP'],
    'tck': ['céphaline', 'coagulation', 'TCK', 'TCA'],
    'tca': ['céphaline', 'coagulation', 'TCA', 'TCK'],
    'ionogramme': ['sodium', 'potassium', 'chlore', 'ionogramme', 'iono', 'B 20'],
    'iono': ['sodium', 'potassium', 'chlore', 'ionogramme', 'B 20'],
    'calcemie': ['calcium', 'calcémie', 'B 20'],
    'ferritine': ['fer', 'ferritine', 'B 40'],
    'bilirubine': ['bilirubine', 'ictère', 'jaunisse', 'B 10'],
    'albumine': ['albumine', 'protéine', 'B 15'],
    'serologie': ['sérologie', 'HIV', 'hépatite', 'syphilis', 'B 50'],
    'sérologie': ['sérologie', 'HIV', 'hépatite', 'syphilis', 'B 50'],
    'hiv': ['HIV', 'SIDA', 'sérologie', 'B 50'],
    'hepatite': ['hépatite', 'sérologie', 'HBs', 'HCV', 'B 50'],
    'hépatite': ['hépatite', 'sérologie', 'HBs', 'HCV', 'B 50'],
    'ecbu': ['urine', 'cytobactériologique', 'ECBU', 'infection', 'urinaire'],
    'bilan hepatique': ['transaminase', 'hépatique', 'bilirubine', 'GGT', 'PAL', 'B 25'],
    'bilan rénal': ['urée', 'créatinine', 'ionogramme', 'B 25'],
    'bilan renal': ['urée', 'créatinine', 'ionogramme', 'B 25'],
    'bilan lipidique': ['cholestérol', 'triglycérides', 'HDL', 'LDL', 'B 10'],
    'bilan thyroidien': ['TSH', 'T3', 'T4', 'thyroïde', 'B 40'],
    'bilan thyroïdien': ['TSH', 'T3', 'T4', 'thyroïde', 'B 40'],
    'prise de sang': ['prélèvement', 'ponction', 'veineuse', 'sang', 'numération'],
    'analyse de sang': ['prélèvement', 'sang', 'numération', 'formule'],
    'analyse sang': ['prélèvement', 'sang', 'numération', 'formule'],
    // === IMAGERIE ===
    'radio': ['radiographie', 'radiologie', 'rx', 'cliché', 'R 10'],
    'radiographie': ['radiographie', 'radiologie', 'rx', 'R 10'],
    'rx': ['radiographie', 'radiologie', 'cliché', 'R 10'],
    'radio thorax': ['radiographie', 'thorax', 'poumon', 'R 10'],
    'radio poumon': ['radiographie', 'thorax', 'poumon', 'R 10'],
    'radio genou': ['radiographie', 'genou', 'R 10'],
    'radio epaule': ['radiographie', 'épaule', 'R 10'],
    'radio rachis': ['radiographie', 'rachis', 'vertèbre', 'R 20'],
    'radio bassin': ['radiographie', 'bassin', 'R 20'],
    'echo': ['échographie', 'ultrason', 'R 25'],
    'échographie': ['échographie', 'ultrason', 'R 25'],
    'echographie': ['échographie', 'ultrason', 'R 25'],
    'echo abdo': ['échographie', 'abdominale', 'R 25'],
    'echo abdominale': ['échographie', 'abdominale', 'R 25'],
    'echo pelvienne': ['échographie', 'pelvienne', 'R 25'],
    'echo obstetricale': ['échographie', 'obstétricale', 'grossesse', 'R 25'],
    'mammographie': ['mammographie', 'sein', 'R 15'],
    'mammo': ['mammographie', 'sein', 'R 15'],
    'scanner': ['scanner', 'TDM', 'tomodensitométrie', 'R 30'],
    'tdm': ['scanner', 'TDM', 'tomodensitométrie', 'R 30'],
    'irm': ['IRM', 'résonance', 'magnétique', 'R 30'],
    // === EXPLORATIONS FONCTIONNELLES ===
    'ecg': ['électrocardiogramme', 'électrocardiographie', 'cardiogramme', 'cœur'],
    'ekg': ['électrocardiogramme', 'électrocardiographie', 'cardiogramme'],
    'eeg': ['électroencéphalogramme', 'encéphalographie', 'cerveau'],
    'emg': ['électromyogramme', 'électromyographie', 'muscle', 'nerf'],
    'efr': ['respiratoire', 'spirométrie', 'pulmonaire', 'fonctionnelle'],
    'spirometrie': ['spirométrie', 'respiratoire', 'pulmonaire'],
    // === ACTES COURANTS ===
    'consultation': ['consultation', 'cabinet', 'C', 'CS'],
    'consult': ['consultation', 'cabinet'],
    'visite': ['visite', 'domicile', 'V', 'VS'],
    'injection': ['injection', 'piqûre', 'intraveineuse', 'intramusculaire'],
    'piqure': ['injection', 'piqûre', 'intraveineuse'],
    'piqûre': ['injection', 'piqûre', 'intraveineuse'],
    'perfusion': ['perfusion', 'intraveineuse', 'goutte à goutte'],
    'pansement': ['pansement', 'soins', 'plaie', 'cicatrisation'],
    'suture': ['suture', 'points', 'plaie', 'couture'],
    'points de suture': ['suture', 'points', 'plaie'],
    'platre': ['plâtre', 'immobilisation', 'contention'],
    'plâtre': ['plâtre', 'immobilisation', 'contention'],
    'ablation': ['ablation', 'exérèse', 'extraction', 'retrait'],
    'biopsie': ['biopsie', 'prélèvement', 'histologique'],
    'ponction': ['ponction', 'prélèvement', 'aspiration'],
    'kine': ['kinésithérapie', 'rééducation', 'AMM'],
    'kiné': ['kinésithérapie', 'rééducation', 'AMM'],
    'kinésithérapie': ['kinésithérapie', 'rééducation', 'AMM'],
    'rééducation': ['rééducation', 'kinésithérapie', 'réadaptation'],
    'reeducation': ['rééducation', 'kinésithérapie', 'réadaptation'],
    'soins infirmiers': ['infirmier', 'AMI', 'soins', 'injection', 'pansement'],
    'infirmier': ['infirmier', 'AMI', 'soins'],
    // === CHIRURGIE ===
    'fracture': ['fracture', 'ostéosynthèse', 'immobilisation', 'réduction'],
    'luxation': ['luxation', 'réduction', 'contention'],
    'osteosynthese': ['ostéosynthèse', 'fracture', 'plaque', 'vis', 'clou'],
    'ostéosynthèse': ['ostéosynthèse', 'fracture', 'plaque'],
    'prothese': ['prothèse', 'arthroplastie', 'implant'],
    'prothèse': ['prothèse', 'arthroplastie', 'implant'],
    'prothese hanche': ['prothèse', 'hanche', 'arthroplastie'],
    'prothese genou': ['prothèse', 'genou', 'arthroplastie'],
    'arthroscopie': ['arthroscopie', 'articulaire', 'endoscopie'],
    'appendicectomie': ['appendicectomie', 'appendice'],
    'hernie': ['hernie', 'herniorraphie', 'cure'],
    'cesarienne': ['césarienne', 'accouchement', 'utérus'],
    'césarienne': ['césarienne', 'accouchement', 'utérus'],
    'accouchement': ['accouchement', 'obstétrical', 'césarienne', 'forceps'],
    'amputation': ['amputation', 'désarticulation'],
    // === ANATOMIE ===
    'main': ['main', 'doigt', 'poignet', 'carpe', 'métacarpien', 'phalange'],
    'epaule': ['épaule', 'omoplate', 'clavicule', 'humérus'],
    'épaule': ['épaule', 'omoplate', 'clavicule', 'humérus'],
    'coude': ['coude', 'humérus', 'radius', 'cubitus', 'olécrane'],
    'poignet': ['poignet', 'radius', 'cubitus', 'carpe', 'styloïde'],
    'genou': ['genou', 'rotule', 'ménisque', 'ligament', 'croisé'],
    'hanche': ['hanche', 'fémur', 'col', 'cotyloïdien', 'coxo'],
    'cheville': ['cheville', 'malléole', 'tibio-tarsienne', 'astragale'],
    'pied': ['pied', 'orteil', 'métatarse', 'calcanéum', 'tarse'],
    'rachis': ['rachis', 'vertèbre', 'lombaire', 'cervical', 'dorsal'],
    'colonne': ['rachis', 'vertèbre', 'colonne', 'vertébrale'],
    'thorax': ['thorax', 'côte', 'sternum', 'poumon', 'plèvre'],
    'abdomen': ['abdomen', 'abdominal', 'paroi', 'péritoine'],
    'crane': ['crâne', 'encéphale', 'cérébral', 'cerveau'],
    'crâne': ['crâne', 'encéphale', 'cérébral'],
    'oeil': ['œil', 'oculaire', 'paupière', 'cataracte', 'glaucome'],
    'oreille': ['oreille', 'auriculaire', 'tympan', 'otite'],
    'dent': ['dent', 'dentaire', 'extraction', 'obturation'],
    'nez': ['nez', 'nasal', 'sinus', 'rhinoplastie'],
    'sein': ['sein', 'mammaire', 'mammectomie', 'mastectomie'],
    'thyroide': ['thyroïde', 'thyroïdectomie', 'corps thyroïde'],
    'thyroïde': ['thyroïde', 'thyroïdectomie', 'corps thyroïde'],
    'rein': ['rein', 'rénal', 'néphro', 'néphrectomie'],
    'vessie': ['vessie', 'vésical', 'urinaire', 'cystoscopie'],
    'prostate': ['prostate', 'prostatectomie', 'PSA'],
    'uterus': ['utérus', 'hystérectomie', 'curetage'],
    'utérus': ['utérus', 'hystérectomie', 'curetage'],
    // === TERMES FAMILIERS ===
    'voir docteur': ['consultation', 'cabinet'],
    'voir medecin': ['consultation', 'cabinet'],
    'rendez-vous': ['consultation', 'cabinet'],
    'opération': ['chirurgie', 'intervention', 'opératoire'],
    'operation': ['chirurgie', 'intervention', 'opératoire'],
    'chirurgie': ['chirurgie', 'intervention', 'opératoire', 'sanglant'],
    'os cassé': ['fracture', 'ostéosynthèse'],
    'os casse': ['fracture', 'ostéosynthèse'],
    'bras cassé': ['fracture', 'humérus', 'avant-bras', 'radius'],
    'jambe cassée': ['fracture', 'tibia', 'péroné', 'jambe'],
    'brulure': ['brûlure', 'surface'],
    'brûlure': ['brûlure', 'surface'],
};

// ============================================
// CORRECTION ET CHARGEMENT DES DONNÉES
// ============================================

function categorieParLettreCle(lettreCle: string): string {
    if (['C', 'CS', 'CPSY', 'CD', 'CSF'].includes(lettreCle)) return 'Consultations';
    if (['V', 'VS', 'VPSY', 'VD', 'VSF'].includes(lettreCle)) return 'Visites';
    if (lettreCle === 'B' || lettreCle === 'KB') return 'Biologie';
    if (lettreCle === 'R') return 'Imagerie';
    if (lettreCle === 'AMI') return 'Soins infirmiers';
    if (lettreCle === 'AMM') return 'Kinésithérapie';
    if (lettreCle === 'SF') return 'Sage-femme';
    if (lettreCle === 'D' || lettreCle === 'DS') return 'Dentaire';
    if (lettreCle === 'PC') return 'Pratique courante';
    return 'Chirurgie';
}

function nettoyerLibelle(libelle: string): string {
    return libelle
        .replace(/[\.\s]{3,}/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .replace(/^[\s.,;:•\-]+/, '')
        .replace(/[\s.,;:•\-]+$/, '')
        .replace(/\bdangiome\b/gi, "d'angiome")
        .replace(/\bdelymp\.hanglome\b/gi, 'de lymphangiome')
        .replace(/\blfierts\b/gi, 'nerfs')
        .replace(/\bm0lles\b/gi, 'molles')
        .replace(/\b0moplate\b/gi, 'Omoplate')
        .replace(/\bëlectro/gi, 'électro')
        .replace(/\bHémat0l0gique\b/gi, 'Hématologique')
        .trim();
}

function chargerActesNGAP(): ActeNGAP[] {
    const actes: ActeNGAP[] = [...ACTES_INTEGRES];
    const codesExistants = new Set(ACTES_INTEGRES.map(a => a.code));

    if (Array.isArray((ngapRawData as any).actes)) {
        ((ngapRawData as any).actes as any[]).forEach(raw => {
            if (codesExistants.has(raw.code)) return;

            // CORRECTION CRITIQUE: lettre "E" → "K"
            // L'OCR a confondu "E" (Entente préalable) avec la lettre-clé
            let lettreCle = raw.lettreCle || 'K';
            let entente = false;
            if (lettreCle === 'E') {
                lettreCle = 'K';
                entente = true;
            }

            const coefficient = raw.coefficient || 1;
            const libelle = nettoyerLibelle(raw.libelle || '');
            const chapitre = raw.chapter || raw.section || '';
            const codeNGAP = `${lettreCle} ${coefficient}`;
            const tarif = calculerTarifUnitaire(lettreCle, coefficient);
            const categorie = categorieParLettreCle(lettreCle);

            actes.push({
                code: raw.code,
                codeNGAP,
                lettreCle,
                coefficient,
                libelle: libelle || `Acte ${codeNGAP}`,
                tarif,
                categorie,
                chapitre,
                entente,
            });
            codesExistants.add(raw.code);
        });
    }

    return actes;
}

// Base de données chargée et corrigée
export const actesNGAP: ActeNGAP[] = chargerActesNGAP();

// ============================================
// RECHERCHE SÉMANTIQUE AVANCÉE
// ============================================

function normaliserTexte(texte: string): string {
    return texte
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/['']/g, "'")
        .trim();
}

export function rechercherActe(query: string): ActeNGAP[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const qNorm = normaliserTexte(q);
    const resultats: Array<{ acte: ActeNGAP; score: number }> = [];

    // 1. Code NGAP (K50, B30, R10, AMI2, etc.)
    const codeMatch = q.toUpperCase().replace(/\s/g, '');

    // 2. Expansion par abréviations
    const abrevTermes: string[] = [];
    for (const [abrev, termes] of Object.entries(ABREVIATIONS_MEDICALES)) {
        if (normaliserTexte(abrev) === qNorm || abrev.toLowerCase() === q) {
            abrevTermes.push(...termes);
            break;
        }
    }
    if (abrevTermes.length === 0 && q.length >= 3) {
        for (const [abrev, termes] of Object.entries(ABREVIATIONS_MEDICALES)) {
            if (normaliserTexte(abrev).includes(qNorm) || qNorm.includes(normaliserTexte(abrev))) {
                abrevTermes.push(...termes);
            }
        }
    }

    const termesRecherche = [q, qNorm, ...abrevTermes.map(t => t.toLowerCase())];
    const termesUniques = [...new Set(termesRecherche)];
    const mots = q.split(/\s+/).filter(m => m.length >= 2);

    actesNGAP.forEach(acte => {
        let score = 0;
        const codeSansEspace = acte.codeNGAP.replace(/\s/g, '').toUpperCase();
        const codeActe = acte.code.toLowerCase();
        const libelleLower = acte.libelle.toLowerCase();
        const libelleNorm = normaliserTexte(acte.libelle);
        const categorieLower = (acte.categorie || '').toLowerCase();

        // A. Code NGAP exact
        if (codeSansEspace === codeMatch) score += 2000;
        // B. Code numérique exact
        if (codeActe === q || codeActe === codeMatch.toLowerCase()) score += 1800;
        // C. Code NGAP partiel
        if (codeSansEspace.startsWith(codeMatch) || codeMatch.startsWith(codeSansEspace)) score += 800;

        // D. Termes (requête + abréviations)
        termesUniques.forEach(terme => {
            if (terme.length < 2) return;
            const termeNorm = normaliserTexte(terme);
            if (libelleNorm.includes(termeNorm)) {
                score += libelleNorm.startsWith(termeNorm) ? 600 : 400;
            }
            if (libelleLower.includes(terme)) score += 300;
            if (acte.codeNGAP.toLowerCase().includes(terme)) score += 500;
            if (categorieLower.includes(termeNorm)) score += 150;
        });

        // E. Multi-mots: bonus si TOUS les mots trouvés
        if (mots.length > 1) {
            const tousPresents = mots.every(mot =>
                libelleNorm.includes(normaliserTexte(mot)) ||
                acte.codeNGAP.toLowerCase().includes(mot)
            );
            if (tousPresents) score += 700;
        }

        // F. Boost pour actes intégrés
        if (score > 0 && ACTES_INTEGRES.some(ai => ai.code === acte.code)) score += 200;

        if (score > 0) resultats.push({ acte, score });
    });

    resultats.sort((a, b) => b.score - a.score);

    const vus = new Set<string>();
    const filtered: ActeNGAP[] = [];
    for (const r of resultats) {
        const cle = `${r.acte.codeNGAP}|${r.acte.libelle.substring(0, 40)}`;
        if (!vus.has(cle)) {
            vus.add(cle);
            filtered.push(r.acte);
            if (filtered.length >= 25) break;
        }
    }
    return filtered;
}

// ============================================
// TROUVER UN ACTE PAR CODE
// ============================================
export function trouverActeParCode(code: string): ActeNGAP | null {
    const c = code.toUpperCase().replace(/\s/g, '');

    let found = actesNGAP.find(a => a.codeNGAP.replace(/\s/g, '').toUpperCase() === c);
    if (found) return found;

    found = actesNGAP.find(a => a.code.replace(/\s/g, '').toUpperCase() === c);
    if (found) return found;

    found = actesNGAP.find(a => a.code === code);
    if (found) return found;

    if (LETTRES_FIXES.includes(c)) {
        return actesNGAP.find(a => a.code === c) || null;
    }

    return null;
}

// ============================================
// CALCUL AVEC RÈGLES DE CUMUL NGAP (Art. 12)
// ============================================
/**
 * Article 12 - Actes multiples:
 * A. Consultation + acte technique = seul le plus cher est retenu
 * B. K, PC, DS, D, SF, AMM, AMI: 1er=100%, 2ème=50% (75% trauma), 3ème+=0%
 * C. Radiologie (R): cumulable à 100% entre eux
 * D. Biologie (B): cumul entre eux selon règle 100/50/0
 */
export function calculerActes(actes: Array<{ acte: ActeNGAP; quantite: number }>, isTrauma: boolean = false): ResultatCalcul {
    if (actes.length === 0) {
        return { actes: [], totalBrut: 0, totalNet: 0, economie: 0, regles: [] };
    }

    const regles: string[] = [];
    const actesCalcules: ActeCalcule[] = [];

    // Séparer par type
    const consultations = actes.filter(a => LETTRES_FIXES.includes(a.acte.lettreCle));
    const actesK = actes.filter(a => ['K', 'PC', 'D', 'DS', 'SF'].includes(a.acte.lettreCle));
    const actesB = actes.filter(a => ['B', 'KB'].includes(a.acte.lettreCle));
    const actesR = actes.filter(a => a.acte.lettreCle === 'R');
    const actesAMI = actes.filter(a => a.acte.lettreCle === 'AMI');
    const actesAMM = actes.filter(a => a.acte.lettreCle === 'AMM');
    const autresActes = actes.filter(a =>
        !LETTRES_FIXES.includes(a.acte.lettreCle) &&
        !['K', 'PC', 'D', 'DS', 'SF', 'B', 'KB', 'R', 'AMI', 'AMM'].includes(a.acte.lettreCle)
    );

    let ordre = 0;

    // --- RÈGLE A: Consultations vs actes techniques ---
    if (consultations.length > 0 && (actesK.length > 0 || actesAMI.length > 0 || actesAMM.length > 0)) {
        regles.push('📌 Art. 12-A: La consultation ne se cumule pas avec les actes techniques');
    }

    // Consultations
    if (consultations.length > 0) {
        consultations.sort((a, b) => b.acte.tarif - a.acte.tarif);
        consultations.forEach((item, idx) => {
            const hasTechniques = actesK.length > 0 || actesAMI.length > 0 || actesAMM.length > 0;
            let taux = 100;
            let regle = 'Consultation à 100%';

            if (idx === 0 && hasTechniques) {
                const maxTechTarif = Math.max(
                    ...actesK.map(a => a.acte.tarif),
                    ...actesAMI.map(a => a.acte.tarif),
                    ...actesAMM.map(a => a.acte.tarif),
                    0
                );
                if (maxTechTarif > item.acte.tarif) {
                    taux = 0;
                    regle = 'Art. 12-A: Non cumulable (acte technique plus cher)';
                }
            } else if (idx > 0) {
                taux = 0;
                regle = 'Une seule consultation facturable par séance';
            }

            const tarifBrut = item.acte.tarif * item.quantite;
            actesCalcules.push({
                acte: item.acte, quantite: item.quantite,
                tarifBrut, tarifNet: tarifBrut * taux / 100,
                taux, ordre: ++ordre, regle
            });
        });
    }

    // Actes K (chirurgie) - cumul Art. 12-B
    if (actesK.length > 0) {
        actesK.sort((a, b) => b.acte.tarif - a.acte.tarif);
        if (actesK.length > 1) {
            regles.push('📌 Art. 12-B: Actes chirurgicaux multiples');
        }

        actesK.forEach((item, idx) => {
            let taux: number;
            let regle: string;

            if (idx === 0) {
                taux = 100;
                regle = '1er acte (le plus cher) → 100%';
            } else if (idx === 1) {
                taux = isTrauma ? 75 : 50;
                regle = isTrauma ? '2ème acte (trauma) → 75%' : '2ème acte → 50%';
            } else if (idx === 2 && isTrauma) {
                taux = 50;
                regle = '3ème acte (trauma) → 50%';
            } else {
                taux = 0;
                regle = `Acte n°${idx + 1} → non cumulable (0%)`;
            }

            const tarifBrut = item.acte.tarif * item.quantite;
            actesCalcules.push({
                acte: item.acte, quantite: item.quantite,
                tarifBrut, tarifNet: tarifBrut * taux / 100,
                taux, ordre: ++ordre, regle
            });
        });
    }

    // Biologie (B) - même règle de cumul
    if (actesB.length > 0) {
        actesB.sort((a, b) => b.acte.tarif - a.acte.tarif);
        if (actesB.length > 1) {
            regles.push('📌 Biologie: cumul selon art. 12-B');
        }

        actesB.forEach((item, idx) => {
            let taux: number;
            let regle: string;

            if (idx === 0) {
                taux = 100; regle = '1ère analyse → 100%';
            } else if (idx === 1) {
                taux = 50; regle = '2ème analyse → 50%';
            } else {
                taux = 0; regle = `Analyse n°${idx + 1} → non cumulable (0%)`;
            }

            const tarifBrut = item.acte.tarif * item.quantite;
            actesCalcules.push({
                acte: item.acte, quantite: item.quantite,
                tarifBrut, tarifNet: tarifBrut * taux / 100,
                taux, ordre: ++ordre, regle
            });
        });
    }

    // Radiologie (R) - cumulable à 100%
    if (actesR.length > 0) {
        if (actesR.length > 1) {
            regles.push('📌 Radiologie: actes cumulables à 100% entre eux');
        }
        actesR.forEach(item => {
            const tarifBrut = item.acte.tarif * item.quantite;
            actesCalcules.push({
                acte: item.acte, quantite: item.quantite,
                tarifBrut, tarifNet: tarifBrut,
                taux: 100, ordre: ++ordre, regle: 'Radiologie → 100% (cumulable)'
            });
        });
    }

    // AMI / AMM
    [...actesAMI, ...actesAMM].forEach(item => {
        const tarifBrut = item.acte.tarif * item.quantite;
        const hasConsult = consultations.length > 0 && consultations[0].acte.tarif >= tarifBrut;
        const taux = hasConsult ? 0 : 100;
        actesCalcules.push({
            acte: item.acte, quantite: item.quantite,
            tarifBrut, tarifNet: tarifBrut * taux / 100,
            taux, ordre: ++ordre,
            regle: hasConsult ? 'Non cumulable avec consultation' : '100%'
        });
    });

    // Autres
    autresActes.forEach(item => {
        const tarifBrut = item.acte.tarif * item.quantite;
        actesCalcules.push({
            acte: item.acte, quantite: item.quantite,
            tarifBrut, tarifNet: tarifBrut,
            taux: 100, ordre: ++ordre, regle: '100%'
        });
    });

    const totalBrut = actesCalcules.reduce((sum, a) => sum + a.tarifBrut, 0);
    const totalNet = actesCalcules.reduce((sum, a) => sum + a.tarifNet, 0);

    return {
        actes: actesCalcules,
        totalBrut, totalNet,
        economie: totalBrut - totalNet,
        regles
    };
}

// ============================================
// PARSING D'EXPRESSIONS ET CALCUL
// ============================================
export function parserExpression(expression: string): string[] {
    return expression
        .split(/[\+,;]+/)
        .map(c => c.trim())
        .filter(c => c.length > 0);
}

export function calculerDepuisExpression(expression: string, isTrauma: boolean = false): ResultatCalcul {
    const codes = parserExpression(expression);
    const actesResolus: Array<{ acte: ActeNGAP; quantite: number }> = [];

    codes.forEach(code => {
        const acte = trouverActeParCode(code);
        if (acte) {
            const existing = actesResolus.find(a => a.acte.code === acte.code);
            if (existing) {
                existing.quantite++;
            } else {
                actesResolus.push({ acte, quantite: 1 });
            }
        }
    });

    return calculerActes(actesResolus, isTrauma);
}

// ============================================
// UTILITAIRES
// ============================================
export function obtenirCategories(): string[] {
    const categories = new Set<string>();
    actesNGAP.forEach(a => { if (a.categorie) categories.add(a.categorie); });
    return Array.from(categories).sort();
}

export function obtenirActesParCategorie(categorie: string): ActeNGAP[] {
    return actesNGAP.filter(a => a.categorie?.toLowerCase() === categorie.toLowerCase());
}

export function formaterMontant(montant: number): string {
    return montant.toLocaleString('fr-DZ', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' DA';
}

export function obtenirAbreviations(): string[] {
    return Object.keys(ABREVIATIONS_MEDICALES).sort();
}

// ============================================
// CALCUL MODE MONTANT (saisie directe en DA)
// Mêmes règles Art. 12 appliquées sur les montants
// ============================================
export function calculerMontants(entries: MontantEntry[], isTrauma: boolean = false): ResultatMontant {
    if (entries.length === 0) {
        return { lignes: [], totalBrut: 0, totalNet: 0, economie: 0, regles: [] };
    }

    const regles: string[] = [];
    const lignes: MontantCalcule[] = [];

    // Séparer par type
    const consultations = entries.filter(e => LETTRES_FIXES.includes(e.lettreCle));
    const actesK = entries.filter(e => ['K', 'PC', 'D', 'DS', 'SF'].includes(e.lettreCle));
    const actesB = entries.filter(e => ['B', 'KB'].includes(e.lettreCle));
    const actesR = entries.filter(e => e.lettreCle === 'R');
    const actesAMI = entries.filter(e => e.lettreCle === 'AMI');
    const actesAMM = entries.filter(e => e.lettreCle === 'AMM');
    const autres = entries.filter(e =>
        !LETTRES_FIXES.includes(e.lettreCle) &&
        !['K', 'PC', 'D', 'DS', 'SF', 'B', 'KB', 'R', 'AMI', 'AMM'].includes(e.lettreCle)
    );

    let ordre = 0;

    // Consultation + acte technique
    if (consultations.length > 0 && (actesK.length > 0 || actesAMI.length > 0 || actesAMM.length > 0)) {
        regles.push('📌 Art. 12-A: La consultation ne se cumule pas avec les actes techniques');
    }

    // Consultations
    if (consultations.length > 0) {
        consultations.sort((a, b) => b.montant - a.montant);
        const hasTech = actesK.length > 0 || actesAMI.length > 0 || actesAMM.length > 0;
        consultations.forEach((entry, idx) => {
            let taux = 100;
            let regle = 'Consultation à 100%';
            if (idx === 0 && hasTech) {
                const maxTech = Math.max(...actesK.map(a => a.montant), ...actesAMI.map(a => a.montant), ...actesAMM.map(a => a.montant), 0);
                if (maxTech > entry.montant) {
                    taux = 0;
                    regle = 'Art. 12-A: Non cumulable (acte technique plus cher)';
                }
            } else if (idx > 0) {
                taux = 0;
                regle = 'Une seule consultation par séance';
            }
            lignes.push({ entry, montantBrut: entry.montant, montantNet: entry.montant * taux / 100, taux, ordre: ++ordre, regle });
        });
    }

    // Actes K - cumul Art. 12-B
    if (actesK.length > 0) {
        actesK.sort((a, b) => b.montant - a.montant);
        if (actesK.length > 1) regles.push('📌 Art. 12-B: Actes chirurgicaux multiples');
        actesK.forEach((entry, idx) => {
            let taux: number;
            let regle: string;
            if (idx === 0) { taux = 100; regle = '1er acte (le plus cher) → 100%'; }
            else if (idx === 1) { taux = isTrauma ? 75 : 50; regle = isTrauma ? '2ème acte (trauma) → 75%' : '2ème acte → 50%'; }
            else if (idx === 2 && isTrauma) { taux = 50; regle = '3ème acte (trauma) → 50%'; }
            else { taux = 0; regle = `Acte n°${idx + 1} → non cumulable (0%)`; }
            lignes.push({ entry, montantBrut: entry.montant, montantNet: entry.montant * taux / 100, taux, ordre: ++ordre, regle });
        });
    }

    // Biologie
    if (actesB.length > 0) {
        actesB.sort((a, b) => b.montant - a.montant);
        if (actesB.length > 1) regles.push('📌 Biologie: cumul selon art. 12-B');
        actesB.forEach((entry, idx) => {
            let taux: number;
            let regle: string;
            if (idx === 0) { taux = 100; regle = '1ère analyse → 100%'; }
            else if (idx === 1) { taux = 50; regle = '2ème analyse → 50%'; }
            else { taux = 0; regle = `Analyse n°${idx + 1} → non cumulable (0%)`; }
            lignes.push({ entry, montantBrut: entry.montant, montantNet: entry.montant * taux / 100, taux, ordre: ++ordre, regle });
        });
    }

    // Radiologie - cumulable à 100%
    if (actesR.length > 0) {
        if (actesR.length > 1) regles.push('📌 Radiologie: cumulable à 100%');
        actesR.forEach(entry => {
            lignes.push({ entry, montantBrut: entry.montant, montantNet: entry.montant, taux: 100, ordre: ++ordre, regle: 'Radiologie → 100% (cumulable)' });
        });
    }

    // AMI / AMM
    [...actesAMI, ...actesAMM].forEach(entry => {
        const hasConsult = consultations.length > 0 && consultations[0].montant >= entry.montant;
        const taux = hasConsult ? 0 : 100;
        lignes.push({ entry, montantBrut: entry.montant, montantNet: entry.montant * taux / 100, taux, ordre: ++ordre, regle: hasConsult ? 'Non cumulable avec consultation' : '100%' });
    });

    // Autres
    autres.forEach(entry => {
        lignes.push({ entry, montantBrut: entry.montant, montantNet: entry.montant, taux: 100, ordre: ++ordre, regle: '100%' });
    });

    const totalBrut = lignes.reduce((s, l) => s + l.montantBrut, 0);
    const totalNet = lignes.reduce((s, l) => s + l.montantNet, 0);
    return { lignes, totalBrut, totalNet, economie: totalBrut - totalNet, regles };
}
