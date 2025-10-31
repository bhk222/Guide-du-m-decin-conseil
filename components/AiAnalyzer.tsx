import { disabilityData } from '../data/disabilityRates';
import { Injury, InjuryCategory, InjurySubcategory } from '../types';

// --- Types for Local Expert System ---
export interface LocalProposal {
  type: 'proposal';
  name: string;
  rate: number;
  justification: string;
  path: string;
  injury: Injury;
}

export interface NoResult {
    type: 'no_result';
    text: string;
}

export interface AmbiguityClarification {
  type: 'ambiguity';
  text: string;
  choices: Injury[];
}

export type LocalAnalysisResult = LocalProposal | NoResult | AmbiguityClarification;

const allInjuriesWithPaths = disabilityData.flatMap(cat => 
    cat.subcategories.flatMap(sub => 
        sub.injuries.map(inj => ({
            ...inj,
            path: `${cat.name} > ${sub.name}`
        }))
    )
);

// Dictionnaire anatomique complet pour la logique de pénalité
const boneTerms: { [key: string]: string[] } = {
    // Membre Supérieur
    clavicule: ['clavicule'],
    omoplate: ['omoplate', 'scapula', 'glène', 'acromion', 'coracoïde'],
    humerus: ['humérus', 'humeral', 'humerale', 'tête humérale', 'col chirurgical', 'trochiter', 'trochin', 'palette humérale'],
    radius: ['radius', 'radiale', 'styloïde radiale', 'tête radiale'],
    ulna: ['cubitus', 'ulna', 'ulnaire', 'olécrane', 'coronoïde', 'styloïde cubitale', 'cubital', 'cubitale'],
    carpe: ['carpe', 'carpien', 'scaphoïde', 'semi-lunaire', 'demi-lunaire', 'pyramidal', 'pisiforme', 'trapèze', 'trapézoïde', 'grand os', 'os crochu'],
    metacarpe: ['métacarpe', 'métacarpien', 'benett', 'rolando'],
    phalange_main: ['phalange', 'doigt', 'pouce', 'index', 'médius', 'annulaire', 'auriculaire'],

    // Membre Inférieur
    femur: ['fémur', 'fémoral', 'femorale', 'col du fémur', 'condyle fémoral', 'trochanter', 'diaphyse fémorale'],
    rotule: ['rotule', 'patella', 'patellaire'],
    tibia: ['tibia', 'tibial', 'tibiale', 'plateau tibial', 'épines tibiales', 'malléole interne', 'pilon tibial'],
    fibula: ['péroné', 'perone', 'peronier', 'fibula', 'malléole externe'],
    tarse: ['tarse', 'astragale', 'talus', 'calcanéum', 'calcaneum', 'naviculaire', 'scaphoïde tarsien', 'cuboïde', 'cunéiforme'],
    metatarse: ['métatarse', 'métatarsien', 'lisfranc'],
    phalange_pied: ['orteil', 'phalange', 'hallux'],

    // Tronc & Tête
    crane: ['crâne', 'cranien', 'rocher', 'occipital', 'frontal', 'pariétal', 'temporal'],
    face: ['maxillaire', 'mandibule', 'malaire', 'zygomatique', 'os propres du nez', 'dent', 'dentaire', 'orbite'],
    hyoide: ['hyoïde', 'hyoidien'],
    vertebre: ['vertèbre', 'vertebral', 'cervical', 'dorsal', 'lombaire', 'rachis', 'atlas', 'axis', 'apophyse', 'odontoïde'],
    sacrum: ['sacrum', 'sacro-iliaque'],
    coccyx: ['coccyx'],
    bassin: ['bassin', 'iliaque', 'pubis', 'cotyle', 'ischion', 'symphyse pubienne'],
    sternum: ['sternum', 'manubrium', 'xiphoïde'],
    cote: ['côte', 'costal', 'gril costal'],
};

// --- Helper Functions ---
const normalize = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[-']/g, ' ');

const createSearchableString = (cat: InjuryCategory, sub: InjurySubcategory, inj: Injury): string => {
    const criteriaText = inj.rateCriteria ? `${inj.rateCriteria.low} ${inj.rateCriteria.medium || ''} ${inj.rateCriteria.high}` : '';
    return normalize(`${cat.name} ${sub.name} ${inj.name} ${inj.description || ''} ${criteriaText}`);
};

const getBonesFromString = (normalizedText: string): Set<string> => {
    const foundBones = new Set<string>();
    for (const bone in boneTerms) {
        if (boneTerms[bone as keyof typeof boneTerms].some(term => normalizedText.includes(normalize(term)))) {
            foundBones.add(bone);
        }
    }
    // Special cases for "deux os"
    if (normalizedText.includes("deux os de l'avant-bras") || (normalizedText.includes('radius') && (normalizedText.includes('cubitus') || normalizedText.includes('ulna')))) {
        foundBones.add('radius');
        foundBones.add('ulna');
    }
    if (normalizedText.includes("deux os de la jambe") || (normalizedText.includes('tibia') && (normalizedText.includes('perone') || normalizedText.includes('fibula')))) {
        foundBones.add('tibia');
        foundBones.add('fibula');
    }
    return foundBones;
};

const keywordWeights: { [key: string]: number } = {
    // Anatomical specifiers (high priority)
    'lombaire': 100, 'cervical': 100, 'dorsal': 100, 'thoracique': 100, 'genou': 100,

    // All bones from boneTerms with high weight
    'clavicule': 95, 'omoplate': 95, 'humerus': 95, 'radius': 95, 'ulna': 95, 'carpe': 95, 'metacarpe': 95, 'phalange_main': 95,
    'femur': 95, 'rotule': 95, 'tibia': 95, 'fibula': 95, 'tarse': 95, 'metatarse': 95, 'phalange_pied': 95,
    'crane': 95, 'face': 95, 'hyoide': 95, 'vertebre': 95, 'sacrum': 95, 'coccyx': 95, 'bassin': 95, 'sternum': 95, 'cote': 95,

    'pouce': 90, 'index': 90, 'médius': 90, 'annulaire': 90, 'auriculaire': 90, 'doigt': 85, 'main': 85, 'poignet': 85, 'coude': 85, 'épaule': 85, 'hanche': 85, 'cheville': 85, 'pied': 85, 'orteil': 85,
    'radial': 80, 'sciatique': 80, 'median': 80, 'cubital': 80, 'ulnaire': 80, 'crural': 80, 'facial': 80, 'trijumeau': 80, 'nerf': 75,

    // Top-tier, specific conditions
    'dent': 70,
    'paralysie': 70, 'cécité': 65, 'surdité': 65,
    'amputation': 60, 'ankylose': 60, 'pseudarthrose': 60, 'sténose': 60,
    'désarticulation': 60, 'hémiplégie': 60, 'paraplégie': 60, 'quadriplégie': 60,
    'rate': 55,

    // High-impact, specific conditions
    'ablation': 50, 'nécrose': 50, 'splénectomie': 50, 'éventration': 50,
    'cicatrice': 40,
    'cranien': 45, 'anévrisme': 45, 'oblitération': 45, 'phlébite': 45,

    // High-impact, specific anatomical locations
    'diaphyse': 45, 'extremite inferieure': 45, 
    'col chirurgical': 100, 'tete humerale': 100, 'trochiter': 98, 'trochin': 98,
    'col femoral': 100, 'plateau tibial': 100, 'malleole': 98, 'scaphoide': 98, 'olecrane': 98,

    // Medium-impact, common findings
    'perte': 35,
    'raideur': 30, 'instabilite': 30, 'laxite': 30, 'entorse': 30,
    'cal vicieux': 30, 'rétraction': 30, 'cicatrice rétractile': 30, 'raccourcissement': 30, 'deviation': 30,
    'pneumothorax': 30, 'hémothorax': 30,
    
    // General injury types
    'fracture': 20, 'luxation': 20, 'rupture': 20, 'lésion': 15, 'traumatisme': 15,
    'vertige': 15, 'spondylodiscite': 15, 'cyphose': 15, 'plaie': 15, 'contusion': 15,
    
    // Symptoms & Modifiers
    'grave': 10, 'vicieuse': 10, 'tassement': 10,
    'douleur': 5, 'gêne': 5, 'limitation': 5, 'douloureuse': 5, 'amyotrophie': 10,
};

const bonePartKeywords: { [key: string]: string[] } = {
    humerus: ['col chirurgical', 'tete humerale', 'trochiter', 'trochin', 'palette humerale', 'diaphyse'],
    femur: ['col femoral', 'diaphyse femorale', 'condyle femoral', 'massif trochanterien', 'extremite inferieure'],
    tibia: ['plateau tibial', 'pilon tibial', 'epines tibiales', 'malleole interne', 'diaphyse'],
    radius: ['tete radiale', 'styloide radiale', 'extremite inferieure', 'diaphyse', 'isolee'],
    ulna: ['olecrane', 'coronoide', 'styloide cubitale', 'diaphyse', 'isolee'],
    omoplate: ['glene', 'acromion', 'coracoide'],
    bassin: ['cotyle', 'branche pubienne', 'aile iliaque'],
};

// Synonym mapping for anatomical and clinical terms
const synonymMap: { [key: string]: string } = {
    'col humeral': 'col chirurgical',
    'tete de l\'humerus': 'tete humerale',
    'diaphysaire': 'diaphyse',
    'rotulien': 'rotule',
    'patellaire': 'rotule',
    'femorale': 'fémur',
    'tibiale': 'tibia',
    'carpien': 'carpe',
    'phalangienne': 'phalange',
    'facture': 'fracture',
    'laie': 'plaie',
    'plaie': 'cicatrice',
    'audition': 'surdite',
    'auditif': 'surdite',
    'gonalgie': 'douleur genou',
    'lombaires': 'lombaire', 'lombaire': 'lombaire',
    'cervicaux': 'cervical', 'cervicales': 'cervical',
    'dorsaux': 'dorsal', 'dorsales': 'dorsal',
};


// Map anatomical keywords to their main category name (must match disabilityData.ts names EXACTLY)
const anatomicalKeywords: { [key: string]: string } = {
    // Membres Supérieurs
    'doigt': 'Membres Supérieurs', 'pouce': 'Membres Supérieurs', 'index': 'Membres Supérieurs', 'médius': 'Membres Supérieurs', 'annulaire': 'Membres Supérieurs', 'auriculaire': 'Membres Supérieurs',
    'main': 'Membres Supérieurs', 'métacarpe': 'Membres Supérieurs', 'poignet': 'Membres Supérieurs', 'scaphoïde': 'Membres Supérieurs', 'semi-lunaire': 'Membres Supérieurs',
    'avant-bras': 'Membres Supérieurs', 'radius': 'Membres Supérieurs', 'cubitus': 'Membres Supérieurs',
    'coude': 'Membres Supérieurs', 'olécrane': 'Membres Supérieurs',
    'bras': 'Membres Supérieurs', 'humérus': 'Membres Supérieurs',
    'épaule': 'Membres Supérieurs', 'deltoïde': 'Membres Supérieurs', 'biceps': 'Membres Supérieurs',
    'scapulaire': 'Membres Supérieurs', 'clavicule': 'Membres Supérieurs', 'omoplate': 'Membres Supérieurs',

    // Membres Inférieurs
    'orteil': 'Membres Inférieurs', 'pied': 'Membres Inférieurs', 'métatarsien': 'Membres Inférieurs', 'astragale': 'Membres Inférieurs', 'calcanéum': 'Membres Inférieurs',
    'cheville': 'Membres Inférieurs', 'malléole': 'Membres Inférieurs',
    'jambe': 'Membres Inférieurs', 'tibia': 'Membres Inférieurs', 'péroné': 'Membres Inférieurs',
    'genou': 'Membres Inférieurs', 'rotule': 'Membres Inférieurs', 'ménisque': 'Membres Inférieurs',
    'cuisse': 'Membres Inférieurs', 'fémur': 'Membres Inférieurs',
    'hanche': 'Membres Inférieurs', 'cotyle': 'Membres Inférieurs', 'trochanter': 'Membres Inférieurs',

    // Séquelles du Rachis, du Bassin et de la Moelle Épinière
    'rachis': 'Séquelles du Rachis, du Bassin et de la Moelle Épinière', 'vertèbre': 'Séquelles du Rachis, du Bassin et de la Moelle Épinière', 'cervical': 'Séquelles du Rachis, du Bassin et de la Moelle Épinière', 'dorsal': 'Séquelles du Rachis, du Bassin et de la Moelle Épinière', 'lombaire': 'Séquelles du Rachis, du Bassin et de la Moelle Épinière',
    'bassin': 'Séquelles du Rachis, du Bassin et de la Moelle Épinière', 'pubis': 'Séquelles du Rachis, du Bassin et de la Moelle Épinière', 'sacrum': 'Séquelles du Rachis, du Bassin et de la Moelle Épinière', 'coccyx': 'Séquelles du Rachis, du Bassin et de la Moelle Épinière',
    'moelle': 'Séquelles du Rachis, du Bassin et de la Moelle Épinière', 'médullaire': 'Séquelles du Rachis, du Bassin et de la Moelle Épinière', 'paraplégie': 'Séquelles du Rachis, du Bassin et de la Moelle Épinière',

    // Séquelles Crâniennes, Neurologiques et Psychiatriques
    'crâne': 'Séquelles Crâniennes, Neurologiques et Psychiatriques', 'cranien': 'Séquelles Crâniennes, Neurologiques et Psychiatriques', 'encéphale': 'Séquelles Crâniennes, Neurologiques et Psychiatriques',
    'neurologique': 'Séquelles Crâniennes, Neurologiques et Psychiatriques', 'hémiplégie': 'Séquelles Crâniennes, Neurologiques et Psychiatriques', 'quadriplégie': 'Séquelles Crâniennes, Neurologiques et Psychiatriques',
    'psychose': 'Séquelles Crâniennes, Neurologiques et Psychiatriques', 'névrose': 'Séquelles Crâniennes, Neurologiques et Psychiatriques', 'épilepsie': 'Séquelles Crâniennes, Neurologiques et Psychiatriques', 'commotionnel': 'Séquelles Crâniennes, Neurologiques et Psychiatriques',

    // Séquelles des Nerfs Crâniens et Périphériques
    'nerf': 'Séquelles des Nerfs Crâniens et Périphériques', 'paralysie': 'Séquelles des Nerfs Crâniens et Périphériques',
    'radial': 'Séquelles des Nerfs Crâniens et Périphériques', 'médian': 'Séquelles des Nerfs Crâniens et Périphériques', 'cubital': 'Séquelles des Nerfs Crâniens et Périphériques',
    'sciatique': 'Séquelles des Nerfs Crâniens et Périphériques', 'crural': 'Séquelles des Nerfs Crâniens et Périphériques',
    'facial': 'Séquelles des Nerfs Crâniens et Périphériques', 'trijumeau': 'Séquelles des Nerfs Crâniens et Périphériques',
    
    // Séquelles Maxillo-Faciales, ORL et Ophtalmologiques
    'oeil': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques', 'yeux': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques', 'vision': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques', 'cécité': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques', 'oculaire': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques', 'orbite': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques',
    'oreille': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques', 'auditif': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques', 'surdité': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques',
    'vertige': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques',
    'nez': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques', 'odorat': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques', 'anosmie': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques',
    'face': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques', 'visage': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques', 'mâchoire': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques', 'dent': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques', 'hyoïde': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques', 'larynx': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques', 'pharynx': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques',

    // Séquelles Thoraciques, Abdominales, Pelviennes et Cardio-vasculaires
    'thorax': 'Séquelles Thoraciques, Abdominales, Pelviennes et Cardio-vasculaires', 'côte': 'Séquelles Thoraciques, Abdominales, Pelviennes et Cardio-vasculaires', 'sternum': 'Séquelles Thoraciques, Abdominales, Pelviennes et Cardio-vasculaires',
    'abdomen': 'Séquelles Thoraciques, Abdominales, Pelviennes et Cardio-vasculaires', 'hernie': 'Séquelles Thoraciques, Abdominales, Pelviennes et Cardio-vasculaires', 'splénectomie': 'Séquelles Thoraciques, Abdominales, Pelviennes et Cardio-vasculaires',
    'rate': 'Séquelles Thoraciques, Abdominales, Pelviennes et Cardio-vasculaires',
    'urètre': 'Séquelles Thoraciques, Abdominales, Pelviennes et Cardio-vasculaires', 'vessie': 'Séquelles Thoraciques, Abdominales, Pelviennes et Cardio-vasculaires',
    'pneumothorax': 'Séquelles Thoraciques, Abdominales, Pelviennes et Cardio-vasculaires',
    'plèvre': 'Séquelles Thoraciques, Abdominales, Pelviennes et Cardio-vasculaires',
    'poumon': 'Séquelles Thoraciques, Abdominales, Pelviennes et Cardio-vasculaires',
    'coeur': 'Séquelles Thoraciques, Abdominales, Pelviennes et Cardio-vasculaires', 'cardiaque': 'Séquelles Thoraciques, Abdominales, Pelviennes et Cardio-vasculaires',

    'cicatrice': 'Membres Supérieurs', // Cicatrices are spread out, default to a common category
};

const subPartKeywords: { [key: string]: string[] } = {
    // MS
    'Doigts': ['doigt', 'pouce', 'index', 'médius', 'annulaire', 'auriculaire', 'phalange'],
    'Main': ['main', 'métacarpe', 'metacarpien', 'benett'],
    'Poignet': ['poignet', 'scaphoïde', 'semi-lunaire', 'carpe'],
    'Avant-bras': ['avant-bras', 'radius', 'cubitus', 'ulna'],
    'Coude': ['coude', 'olécrane', 'olecrane'],
    'Bras': ['bras', 'humérus', 'humeral', 'humerale'],
    'Épaule': ['épaule', 'epaule', 'deltoïde', 'deltoide'],
    'Ceinture Scapulaire': ['clavicule', 'omoplate', 'biceps'],
    // MI
    'Orteils': ['orteil'],
    'Pied': ['pied', 'métatarsien', 'metatarsien', 'astragale', 'calcanéum', 'calcaneum', 'tarse', 'chopart', 'lisfranc'],
    'Cheville': ['cheville', 'malléole', 'malleole', 'bimalléolaire', 'bimalleolaire', 'bimaleollaire', 'tibio-tarsienne'],
    'Jambe': ['jambe', 'tibia', 'tibial', 'tibiale', 'péroné', 'perone', 'fibula'],
    'Genou': ['genou', 'rotule', 'patella', 'ménisque', 'menisque', 'plateau tibial'],
    'Cuisse': ['cuisse', 'fémur', 'femur', 'femoral', 'femorale', 'diaphyse'],
    'Hanche': ['hanche', 'cotyle', 'trochanter', 'soustrochantérien', 'soustrochanterien'],
    // Rachis
    'Rachis': ['rachis', 'vertèbre', 'vertebre', 'cervical', 'lombaire', 'dorsal', 'spondylodiscite', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'd11', 'd12', 'l1', 'l2', 'l3', 'l4', 'l5', 's1'],
    'Bassin': ['bassin', 'pubis', 'sacrum', 'coccyx', 'iliaque', 'cotyle'],
    'Moelle Épinière': ['moelle', 'médullaire', 'medullaire', 'paraplégie', 'quadriplégie'],
     // Neuro
    'Crâne': ['crâne', 'cranien', 'encéphale'],
    'Paralysies': ['paralysie', 'nerf', 'radial', 'médian', 'cubital', 'sciatique', 'facial'],
    // Thorax, Abdomen, Pelvis
    'Thorax': ['thorax', 'thoracique', 'côte', 'cote', 'costal', 'costale', 'sternum'],
    'Plèvre et Poumons': ['pneumothorax', 'hémothorax', 'plèvre', 'pleural', 'pleurale', 'poumon', 'pulmonaire'],
    'Abdomen': ['abdomen', 'abdominal', 'estomac', 'hernie', 'splénectomie', 'laparotomie', 'rate', 'splenique'],
    'Séquelles Uro-génitales': ['urètre', 'urétral', 'uretère', 'vessie', 'incontinence'],
    // Sensoriel
    'Vision': ['oeil', 'yeux', 'vision', 'visuel', 'cécité', 'hémianopsie', 'oculaire', 'occulaire'],
    'Audition': ['oreille', 'auditif', 'audition', 'surdité', 'cophose'],
    'Autres Lésions ORL et Stomatologiques': ['vertige', 'anosmie', 'agueusie', 'mâchoire', 'dent', 'maxillaire', 'mandibule', 'nez'],
    // Cutané
    'Cicatrices': ['peau', 'cutanée', 'cicatrice', 'visage'],
};

type Candidate = { injury: Injury; score: number; path: string };

const determineSeverity = (normalizedText: string): { level: 'faible' | 'moyen' | 'élevé', signs: string[], isDefault: boolean } => {
    const severityKeywords = {
        élevé: ['impossible', 'sévère', 'severe', 'majeur', 'persistante', 'importante', 'instabilite', 'raideur', 'chirurgie', 'opéré', 'operee', 'boiterie', 'appareillage', 'totale', 'importantes', 'raccourcissement'],
        moyen: ['modérée', 'modere', 'chronique', 'difficile', 'limitation', 'douleur', 'douloureuse', 'gêne', 'gene', 'gonalgie', 'deviation', 'cal vicieux'],
        faible: ['légère', 'legere', 'minime', 'discrète', 'simple', 'peu', 'recuperation', 'bonne recuperation']
    };
    const negationWords = ['sans', 'pas de', 'aucune', 'non', 'peu de'];

    // First, check for explicit "faible" keywords
    let signs = severityKeywords.faible.filter(kw => normalizedText.includes(kw));
    if (signs.length > 0) return { level: 'faible', signs: [...new Set(signs)], isDefault: false };

    // Check for "high" keywords, but only if they are not negated
    const highSigns = severityKeywords.élevé.filter(kw => {
        if (normalizedText.includes(kw)) {
            // Build a regex to check for negation words before the keyword
            // This looks for "negation_word [optional_word] keyword"
            const regex = new RegExp(`(?:${negationWords.join('|')})\\s*(?:\\w+\\s+)?${kw}`, 'i');
            return !regex.test(normalizedText);
        }
        return false;
    });

    if (highSigns.length > 0) return { level: 'élevé', signs: [...new Set(highSigns)], isDefault: false };
    
    // Then, check for "moyen" keywords
    signs = severityKeywords.moyen.filter(kw => normalizedText.includes(kw));
    if (signs.length > 0) return { level: 'moyen', signs: [...new Set(signs)], isDefault: false };
    
    return { level: 'moyen', signs: ["gêne fonctionnelle modérée"], isDefault: true }; // Default
};

export const buildExpertJustification = (
    userInput: string,
    injury: Injury,
    chosenRate: number,
    path: string,
    severityLevel: 'faible' | 'moyen' | 'élevé' | 'fixe',
    clinicalSigns: string[],
    isDefaultSeverity: boolean
): string => {
    const clinicalDescription = userInput.charAt(0).toUpperCase() + userInput.slice(1);
    const rateText = Array.isArray(injury.rate) ? `[${injury.rate[0]} - ${injury.rate[1]}%]` : `${injury.rate}%`;
    const severityText = { 'faible': 'léger', 'moyen': 'modéré', 'élevé': 'sévère', 'fixe': 'standard' }[severityLevel];

    let justification = "<strong>1️⃣ Résumé clinique</strong><br>";
    justification += `La description est : "<em>${clinicalDescription}</em>".<br><br>`;

    justification += "<strong>2️⃣ Analyse anatomo-fonctionnelle</strong><br>";
    if (isDefaultSeverity && severityLevel !== 'fixe') {
        justification += `En l'absence de précisions sur la gravité (ex: "gêne légère", "douleurs importantes", "raideur sévère"), je fais l'hypothèse d'un retentissement fonctionnel <strong>modéré</strong>.<br><br>`;
    } else {
        const sequelaMain = clinicalSigns.length > 0 && clinicalSigns[0] !== "gêne fonctionnelle modérée" 
            ? `<strong>${clinicalSigns.join(' et ')}</strong>`
            : "une gêne fonctionnelle";
        justification += `La lésion a consolidé avec comme séquelle principale ${sequelaMain}. Le retentissement fonctionnel est jugé <strong>${severityText}</strong>.<br><br>`;
    }
    
    justification += "<strong>3️⃣ Correspondance barémique et raisonnement</strong><br>";
    justification += `La séquelle est rattachée à la rubrique "${path}" du barème, correspondant à "<em>${injury.name}</em>". La fourchette indicative est de <strong>${rateText}</strong>.<br>`;

    if (Array.isArray(injury.rate)) {
        if (isDefaultSeverity) {
            justification += `Sur la base de cette hypothèse, il est justifié de retenir la partie <strong>médiane</strong> de la fourchette.<br><br>`;
        } else {
            justification += `Compte tenu du retentissement fonctionnel ${severityText}, il est justifié de retenir la partie <strong>${severityLevel === 'élevé' ? 'haute' : (severityLevel === 'moyen' ? 'médiane' : 'basse')}</strong> de la fourchette.<br><br>`;
        }
    } else {
        justification += `Le barème prévoit un taux fixe pour cette séquelle.<br><br>`;
    }

    justification += `<strong>4️⃣ IPP retenue (finale)</strong><br>Le taux d'incapacité permanente partielle (IPP) proposé est de <strong>${chosenRate}%</strong>.<br><br>`;

    justification += "<strong>5️⃣ Conclusion médico-légale</strong><br>";
    justification += `Il persiste des séquelles consolidées entraînant un retentissement fonctionnel <strong>${severityText}</strong> et permanent. Le taux d'IPP retenu est de <strong>${chosenRate}%</strong>.`;

    return justification;
};

/**
 * Performs a keyword-based search with anatomical filtering.
 */
export const findCandidateInjuries = (text: string, externalKeywords?: string[]): Array<{ injury: Injury; score: number; path: string }> => {
    const processedText = text.replace(/([A-ZCSLT])\s*(\d)/gi, '$1$2');
    let normalizedText = normalize(processedText);

    normalizedText = normalizedText.replace(/plateau tibiale/g, 'plateau tibial');
    
    normalizedText = normalizedText.replace(/\b(droit|droite)\b/g, 'dominante').replace(/\bgauche\b/g, 'non dominante');
    normalizedText = normalizedText.replace(/\bamputaion\b/g, 'amputation'); 

    normalizedText = normalizedText.replace(/\bd\s*2\b/g, 'index');
    normalizedText = normalizedText.replace(/\bd\s*3\b/g, 'medius');
    normalizedText = normalizedText.replace(/\bd\s*4\b/g, 'annulaire');
    normalizedText = normalizedText.replace(/\bd\s*5\b/g, 'auriculaire');

    // Apply all synonyms (single and multi-word) to the full normalized string.
    // Sort keys by length descending to replace longer phrases first (e.g., "tete de l'humerus" before "tete").
    const sortedSynonymKeys = Object.keys(synonymMap).sort((a, b) => b.length - a.length);
    for (const key of sortedSynonymKeys) {
        const regex = new RegExp(`\\b${normalize(key)}\\b`, 'g');
        normalizedText = normalizedText.replace(regex, normalize(synonymMap[key]));
    }

    const stopWords = ['de', 'du', 'la', 'le', 'les', 'un', 'une', 'et', 'avec', 'au', 'des', 'ou', 'a'];

    const baseKeywords = externalKeywords 
        ? [...new Set(externalKeywords.map(normalize))]
        : [...new Set(normalizedText.split(' ').filter(w => w && !stopWords.includes(w)))];
        
    let keywords = [...new Set(baseKeywords)];

    const multiWordKeywords = Object.keys(keywordWeights).filter(k => k.includes(' '));
    multiWordKeywords.forEach(mwk => {
        if (normalizedText.includes(mwk)) {
            const singleWords = mwk.split(' ');
            keywords = keywords.filter(kw => !singleWords.includes(kw));
            keywords.push(mwk);
        }
    });
    keywords = [...new Set(keywords)]; 


    if (keywords.length === 0) {
        return [];
    }
    
    const highImpactKeywords = [
        'paralysie', 'cécité', 'surdité', 'amputation', 'ankylose', 'pseudarthrose', 
        'ablation', 'perte', 'nécrose', 'désarticulation'
    ];
    const userMentionsHighImpactSequela = highImpactKeywords.some(kw => keywords.some(userKw => userKw.includes(kw)));


    const categoryScores: { [key: string]: number } = {};
    keywords.forEach(keyword => {
        for (const anatomicalKey in anatomicalKeywords) {
            if (keyword.includes(anatomicalKey)) {
                const categoryName = anatomicalKeywords[anatomicalKey];
                categoryScores[categoryName] = (categoryScores[categoryName] || 0) + 1;
            }
        }
    });

    let bestCategoryName: string | null = null;
    if (Object.keys(categoryScores).length > 0) {
        bestCategoryName = Object.keys(categoryScores).reduce((a, b) => categoryScores[a] > categoryScores[b] ? a : b);
    }
    
    let allMatches: Array<{ injury: Injury; score: number; path: string }> = [];
    const CATEGORY_RELEVANCE_BONUS = 50;
    const FUNCTIONAL_DEFICIT_BONUS = 100;
    const functionalDeficitKeywords = ['raideur', 'ankylose', 'limitation', 'instabilite', 'laxite', 'déficit'];

    disabilityData.forEach(category => {
        const categoryBonus = (bestCategoryName && category.name === bestCategoryName) ? CATEGORY_RELEVANCE_BONUS : 0;
        
        category.subcategories.forEach(subcategory => {
            let subPartBonus = 0;
            const SUB_PART_BONUS_WEIGHT = 40;
            for (const subPartName in subPartKeywords) {
                if (normalize(subcategory.name).includes(normalize(subPartName))) {
                    const associatedKeywords = subPartKeywords[subPartName];
                    if (keywords.some(userKw => associatedKeywords.includes(userKw))) {
                        subPartBonus = SUB_PART_BONUS_WEIGHT;
                        break;
                    }
                }
            }
            
            subcategory.injuries.forEach(injury => {
                const normalizedInjuryName = normalize(injury.name);
                const searchableText = createSearchableString(category, subcategory, injury);

                const injuryMentionsHighImpactSequela = highImpactKeywords.some(kw => searchableText.includes(kw));
                if (userMentionsHighImpactSequela && !injuryMentionsHighImpactSequela) {
                     // If user mentions a severe sequela, penalize entries that don't have it.
                     const sequelaKeywordsInName = functionalDeficitKeywords.some(kw => normalizedInjuryName.includes(kw));
                     if(!sequelaKeywordsInName) return; 
                }
            
                let currentScore = 1; 
                
                currentScore += categoryBonus;
                currentScore += subPartBonus;

                functionalDeficitKeywords.forEach(deficitKw => {
                    if (keywords.some(userKw => userKw.includes(deficitKw)) && normalizedInjuryName.includes(deficitKw)) {
                        currentScore += FUNCTIONAL_DEFICIT_BONUS;
                    }
                });

                keywords.forEach(userKeyword => {
                    if (searchableText.includes(userKeyword)) {
                        const weight = keywordWeights[userKeyword] || 1;
                        currentScore += weight;
                    }
                });

                const specificityBonus = keywords.reduce((bonus, userKw) => {
                    if (normalizedInjuryName.includes(userKw)) { 
                        if (keywordWeights[userKw] && keywordWeights[userKw] >= 15) {
                            return bonus + 80;
                        }
                        return bonus + 10;
                    }
                    return bonus;
                }, 0);
                currentScore += specificityBonus;

                const queryBones = getBonesFromString(normalizedText);
                const injuryBones = getBonesFromString(searchableText);

                // General bone mismatch penalty
                if (queryBones.size > 0 && injuryBones.size > 0) {
                    const commonBones = new Set([...queryBones].filter(bone => injuryBones.has(bone)));
                    
                    // If user specified bone(s) and the injury description contains bone(s), but none match, penalize heavily.
                    if (commonBones.size === 0) {
                        currentScore *= 0.01; // Heavy penalty for clear anatomical mismatch.
                    } else {
                        // Bonus for matching the correct bone(s)
                        currentScore += 200 * commonBones.size; 
                    }
                }
                 // --- More Granular Anatomical Part Matching ---
                const SPECIFIC_PART_BONUS = 300;
                const SPECIFIC_PART_MISMATCH_PENALTY = 0.05;

                const getSpecificParts = (text: string): Set<string> => {
                    const foundParts = new Set<string>();
                    for (const bone in bonePartKeywords) {
                        for (const part of bonePartKeywords[bone as keyof typeof bonePartKeywords]) {
                            if (text.includes(part)) {
                                foundParts.add(part);
                            }
                        }
                    }
                    return foundParts;
                };

                const querySpecificParts = getSpecificParts(normalizedText);
                const injurySpecificParts = getSpecificParts(searchableText);

                if (querySpecificParts.size > 0) {
                    const commonParts = new Set([...querySpecificParts].filter(part => injurySpecificParts.has(part)));
                    if (injurySpecificParts.size > 0) { // Only apply penalty if the injury also has specific parts listed
                        if (commonParts.size === 0) {
                            currentScore *= SPECIFIC_PART_MISMATCH_PENALTY;
                        } else {
                            currentScore += SPECIFIC_PART_BONUS * commonParts.size;
                        }
                    }
                }

                if (normalizedInjuryName.includes('fracture') || normalizedInjuryName.includes('luxation')) {
                    functionalDeficitKeywords.forEach(deficitKw => {
                        if (keywords.some(userKw => userKw.includes(deficitKw))) {
                            currentScore += 50; 
                        }
                    });
                }
                 // --- Anatomical Guardrails & Bonuses ---
                if (keywords.some(k => k.includes('tibia')) && !keywords.some(k => k.includes('cheville') || k.includes('malleole'))) {
                    if (normalizedInjuryName.includes('malleolaire')) {
                        currentScore *= 0.1; // Penalize malleolar fracture if only tibia is mentioned
                    }
                }

                
                // --- Forearm Bones Logic ---
                const queryArmBones = [...queryBones].filter(b => ['radius', 'ulna'].includes(b));
                const injuryArmBones = [...injuryBones].filter(b => ['radius', 'ulna'].includes(b));

                if (queryArmBones.length === 2) {
                    if (injuryArmBones.length === 2) {
                        currentScore += 350; // Strong bonus for matching a "two bones" injury
                    } else if (injuryArmBones.length === 1) {
                        currentScore *= 0.01; // Heavy penalty for single bone result when two were mentioned
                    }
                } else if (queryArmBones.length === 1) {
                    if (injuryArmBones.length === 2) {
                        currentScore *= 0.05; // Penalize two-bone result if only one is mentioned
                    } else if (injuryArmBones.length === 1 && queryArmBones[0] !== injuryArmBones[0]) {
                        currentScore *= 0.01; // Heavy penalty if it's the wrong single bone
                    }
                }

                // --- Leg Bones Logic ---
                const queryLegBones = [...queryBones].filter(b => ['tibia', 'fibula'].includes(b));
                const injuryLegBones = [...injuryBones].filter(b => ['tibia', 'fibula'].includes(b));

                if (queryLegBones.length === 2) {
                    if (injuryLegBones.length === 2) {
                        currentScore += 350; // Strong bonus
                    } else if (injuryLegBones.length === 1) {
                        currentScore *= 0.01; // Heavy penalty
                    }
                } else if (queryLegBones.length === 1) {
                    if (injuryLegBones.length === 2) {
                        currentScore *= 0.05; // Penalty
                    } else if (injuryLegBones.length === 1 && queryLegBones[0] !== injuryLegBones[0]) {
                        currentScore *= 0.01; // Heavy penalty for wrong bone
                    }
                }


                if (currentScore > 0) {
                    allMatches.push({
                        injury,
                        score: currentScore,
                        path: `${category.name} > ${subcategory.name}`,
                    });
                }
            });
        });
    });

    const MIN_SCORE_THRESHOLD = 30;
    return allMatches
        .filter(match => match.score >= MIN_SCORE_THRESHOLD)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
};

const comprehensiveSingleLesionAnalysis = (text: string, externalKeywords?: string[]): LocalAnalysisResult => {
    let normalizedInputText = normalize(text);

    // NEW LOGIC: Check for exact match first to bypass ambiguity loop
    const exactMatch = allInjuriesWithPaths.find(inj => normalize(inj.name) === normalizedInputText);

    if (exactMatch) {
        const injury = exactMatch;
        const path = exactMatch.path;
        
        if (Array.isArray(injury.rate)) {
            const [min, max] = injury.rate;
            // Default to medium severity for an exact match without severity context
            const chosenRate = Math.round((min + max) / 2);
            const justification = buildExpertJustification(text, injury, chosenRate, path, 'moyen', ["gêne fonctionnelle modérée"], true);
            return { type: 'proposal', name: injury.name, rate: chosenRate, justification, path, injury };
        } else {
            const justification = buildExpertJustification(text, injury, injury.rate as number, path, 'fixe', [], false);
            return { type: 'proposal', name: injury.name, rate: injury.rate as number, justification, path, injury };
        }
    }


    // Check for vague query
    const keywords = normalizedInputText.split(' ').filter(w => w.length > 2);
    const queryBones = getBonesFromString(normalizedInputText);

    if (keywords.length <= 2 && queryBones.size === 0) {
        let example = "fracture de la clavicule";
        if (text.toLowerCase().includes('douleur')) {
            example = 'douleur au genou droit';
        }
    
        return { 
            type: 'no_result', 
            text: `La description "${text}" est trop vague. Veuillez préciser la région anatomique concernée (par exemple : "${example}").`
        };
    }
    
    const candidates = findCandidateInjuries(text, externalKeywords);

    if (candidates.length === 0) {
        return { type: 'no_result', text: "Région anatomique non identifiée ou description insuffisante, analyse interrompue." };
    }

    // --- NEW ANATOMICAL FRACTURE AMBIGUITY MODULE ---
    const isFractureQuery = normalizedInputText.includes('fracture');
    if (isFractureQuery && queryBones.size === 1) {
        const bone = Array.from(queryBones)[0];
        
        const locationKeywordsForBone = bonePartKeywords[bone as keyof typeof bonePartKeywords] || [];
        const userHasLocationKeyword = locationKeywordsForBone.some(kw => normalizedInputText.includes(kw));

        if (!userHasLocationKeyword) {
            const allFracturesOfBone = allInjuriesWithPaths.filter(inj => {
                const normName = normalize(inj.name);
                const injuryBones = getBonesFromString(normName);
                return normName.includes('fracture') && injuryBones.has(bone);
            });
            // FIX: The 'item' in allFracturesOfBone is the injury object itself.
            const uniqueFractures = [...new Map(allFracturesOfBone.map(item => [item.name, item])).values()];

            if (uniqueFractures.length > 1) {
                return {
                    type: 'ambiguity',
                    text: `Votre description "${text.trim()}" est générale. Une fracture de l'os "${bone}" peut correspondre à plusieurs localisations (ex: diaphyse, extrémité articulaire). Laquelle correspond le mieux à l'état du patient ?`,
                    choices: uniqueFractures
                };
            }
        }
    }
    // --- END NEW ANATOMICAL FRACTURE AMBIGUITY MODULE ---


    // --- MODULE D’EXCLUSION DES DOUBLONS (LÉSION / SÉQUELLE) ---
    const primaryLesionKeywords = ['fracture', 'luxation', 'rupture', 'lésion', 'brûlures', 'mutilation', 'contusion'];
    const functionalSequelaKeywords = ['raideur', 'ankylose', 'douleur', 'instabilite', 'laxite', 'gêne', 'gene', 'limitation', 'gonalgie', 'cal vicieux', 'pseudarthrose'];
    const userHasSequelaKeywords = functionalSequelaKeywords.some(kw => normalizedInputText.includes(kw));

    let finalCandidate: Candidate | null = null;

    if (candidates.length > 1) {
        const top = candidates[0];
        const topNameNormalized = normalize(top.injury.name);
        const topIsPrimaryLesion = primaryLesionKeywords.some(kw => topNameNormalized.includes(kw) && !functionalSequelaKeywords.some(seqKw => topNameNormalized.includes(seqKw)));

        if (topIsPrimaryLesion && userHasSequelaKeywords) {
            const topAnatomicalRegion = top.path.split(' > ')[1]?.split(' - ')[0].trim();
            
            const sequelaCandidate = candidates.slice(1).find(c => {
                const cNameNormalized = normalize(c.injury.name);
                const cIsSequela = functionalSequelaKeywords.some(kw => cNameNormalized.includes(kw));
                const cAnatomicalRegion = c.path.split(' > ')[1]?.split(' - ')[0].trim();
                return cIsSequela && cAnatomicalRegion === topAnatomicalRegion;
            });
            
            if (sequelaCandidate) {
                finalCandidate = sequelaCandidate;
            }
        }
    }
    
    if (!finalCandidate) {
        finalCandidate = candidates[0];
    }
    
    // --- AMBIGUITY CHECK ---
    const topScore = finalCandidate.score;
    const similarCandidates = candidates.filter(c => c.injury.name !== finalCandidate!.injury.name && c.score > topScore * 0.85);

    if (similarCandidates.length > 0) {
        const allCandidates = [finalCandidate, ...similarCandidates];
        const topPart = finalCandidate.path.split('>')[1]?.trim();
        if (topPart && allCandidates.every(c => c.path.split('>')[1]?.trim() === topPart)) {
            const choices = [...new Map(allCandidates.map(item => [item.injury.name, item.injury])).values()];
            if (choices.length > 1) {
                return {
                    type: 'ambiguity',
                    text: `Votre description "${text.trim()}" peut correspondre à plusieurs séquelles. Pour la région "${topPart}", laquelle correspond le mieux à l'état du patient ?`,
                    choices: choices
                };
            }
        }
    }

    // --- FINAL PROPOSAL GENERATION ---
    const { injury, path } = finalCandidate;
    const severityInfo = determineSeverity(normalizedInputText);
    
    if (Array.isArray(injury.rate)) {
        const [min, max] = injury.rate;
        let chosenRate: number;
        switch (severityInfo.level) {
            case 'faible': chosenRate = min; break;
            case 'élevé': chosenRate = max; break;
            case 'moyen': default: chosenRate = Math.round((min + max) / 2); break;
        }
        const justification = buildExpertJustification(text, injury, chosenRate, path, severityInfo.level, severityInfo.signs, severityInfo.isDefault);
        return { type: 'proposal', name: injury.name, rate: chosenRate, justification, path, injury };
    } else {
        const justification = buildExpertJustification(text, injury, injury.rate as number, path, 'fixe', severityInfo.signs.length > 0 ? severityInfo.signs : [], false);
        return { type: 'proposal', name: injury.name, rate: injury.rate as number, justification, path, injury };
    }
};

export const localExpertAnalysis = (text: string, externalKeywords?: string[]): LocalAnalysisResult => {
    // This function now only handles a single description. The splitting is done in the UI.
    const processedText = text.replace(/([A-ZCSLT])\s*(\d)/gi, '$1$2');
    return comprehensiveSingleLesionAnalysis(processedText, externalKeywords);
};