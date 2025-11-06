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
    tibia: ['tibia', 'tibial', 'tibiale', 'plateau tibial', 'épines tibiales', 'malléole interne', 'pilon tibial', 'bi-malléolaire', 'bimalléolaire', 'bi malléolaire', 'trimalléolaire', 'tri-malléolaire'],
    fibula: ['péroné', 'perone', 'peronier', 'fibula', 'malléole externe', 'malléole'],
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

/**
 * Normalise le texte pour analyse (minuscules, sans accents, nettoyage ponctuation)
 * Amélioration: préserve les chiffres et patterns médicaux importants
 */
const normalize = (str: string) => {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Supprimer accents
        .replace(/[-']/g, ' ')            // Remplacer tirets et apostrophes par espaces
        .replace(/\s+/g, ' ')             // Normaliser espaces multiples
        .trim();
};

/**
 * Prétraite le texte pour transformer verbes d'action en substantifs médicaux
 * Ex: "présente une fracture" → "fracture"
 * Ex: "souffre d'une hernie" → "hernie"
 * Amélioration v2.7: enrichissement massif langage naturel et variantes
 */
const preprocessMedicalText = (text: string): string => {
    let processed = text;
    
    // 1. Normalisation expressions familières enrichies (v2.7)
    const familiarToMedical: [RegExp, string][] = [
        // Impossibilités et incapacités
        [/\bn['']arrive\s+plus\s+[aà]\s+/gi, 'impossibilite '],
        [/\bne\s+peut\s+plus\s+/gi, 'impossibilite '],
        [/\bincapable\s+de\s+/gi, 'impossibilite '],
        [/\bimpossible\s+de\s+/gi, 'impossibilite '],
        [/\bne\s+parvient\s+(?:plus|pas)\s+[aà]\s+/gi, 'impossibilite '],
        [/\bn['']y\s+arrive\s+(?:plus|pas)\b/gi, 'impossibilite'],
        
        // Difficultés et limitations
        [/\ba\s+du\s+mal\s+[aà]\s+/gi, 'difficulte '],
        [/\bpeine\s+[aà]\s+/gi, 'difficulte '],
        [/\bgalère\s+[aà]\s+/gi, 'difficulte '],
        [/\bc['']est\s+difficile\s+de\s+/gi, 'difficulte '],
        [/\bdifficult[eé]\s+pour\s+/gi, 'difficulte '],
        [/\blimit[eé]\s+pour\s+/gi, 'limitation '],
        [/\bne\s+peut\s+que\s+difficilement\s+/gi, 'difficulte '],
        
        // Douleurs intensité
        [/\bfait\s+très\s+mal\b/gi, 'douleur severe'],
        [/\bfait\s+super\s+mal\b/gi, 'douleur severe'],
        [/\bfait\s+hyper\s+mal\b/gi, 'douleur severe'],
        [/\bfait\s+un\s+mal\s+de\s+chien\b/gi, 'douleur severe'],
        [/\bsouffre\s+(?:beaucoup|énormément)\b/gi, 'douleur importante'],
        [/\bsouffre\s+le\s+martyre\b/gi, 'douleur severe'],
        [/\bmal\s+insupportable\b/gi, 'douleur severe'],
        [/\bdouleur\s+atroce\b/gi, 'douleur severe'],
        [/\bça\s+lance\b/gi, 'douleur'],
        [/\bça\s+élance\b/gi, 'douleur'],
        [/\bça\s+tire\b/gi, 'douleur'],
        [/\bça\s+picote\b/gi, 'douleur legere'],
        [/\bun\s+peu\s+mal\b/gi, 'douleur legere'],
        [/\bmini\s+douleur\b/gi, 'douleur legere'],
        
        // Inflammations et sensations
        [/\bça\s+brûle\b/gi, 'inflammation'],
        [/\bça\s+chauffe\b/gi, 'inflammation'],
        [/\bc['']est\s+chaud\b/gi, 'inflammation'],
        [/\bc['']est\s+rouge\b/gi, 'inflammation'],
        [/\btout\s+rouge\b/gi, 'inflammation'],
        
        // Blocages et raideurs
        [/\bça\s+coince\b/gi, 'blocage'],
        [/\bça\s+bloque\b/gi, 'blocage'],
        [/\breste\s+coinc[eé]\b/gi, 'blocage'],
        [/\bne\s+plie\s+plus\b/gi, 'raideur'],
        [/\bne\s+bouge\s+plus\b/gi, 'raideur'],
        [/\btout\s+raide\b/gi, 'raideur severe'],
        [/\bc['']est\s+dur\b/gi, 'raideur'],
        [/\bc['']est\s+rigide\b/gi, 'raideur'],
        
        // Instabilités
        [/\bça\s+lâche\b/gi, 'instabilite'],
        [/\bça\s+cède\b/gi, 'instabilite'],
        [/\bse\s+dérobe\b/gi, 'instabilite'],
        [/\bne\s+tient\s+plus\b/gi, 'instabilite'],
        [/\bça\s+flanche\b/gi, 'instabilite'],
        [/\bpas\s+stable\b/gi, 'instabilite'],
        
        // Bruits articulaires
        [/\bça\s+craque\b/gi, 'crepitation'],
        [/\bça\s+crépite\b/gi, 'crepitation'],
        [/\bça\s+grince\b/gi, 'crepitation'],
        [/\bfait\s+du\s+bruit\b/gi, 'crepitation'],
        
        // Paresthésies
        [/\bça\s+pique\b/gi, 'paresthesie'],
        [/\bça\s+fourmille\b/gi, 'paresthesie'],
        [/\bfourmillement\b/gi, 'paresthesie'],
        [/\bpicotement\b/gi, 'paresthesie'],
        [/\bça\s+dort\b/gi, 'hypoesthesie'],
        [/\bc['']est\s+engourdi\b/gi, 'hypoesthesie'],
        [/\bc['']est\s+insensible\b/gi, 'anesthesie'],
        [/\bne\s+sens\s+(?:plus|rien)\b/gi, 'anesthesie'],
        
        // Œdèmes et gonflements
        [/\bça\s+gonfle\b/gi, 'oedeme'],
        [/\bc['']est\s+gonfl[eé]\b/gi, 'oedeme'],
        [/\btout\s+gonfl[eé]\b/gi, 'oedeme important'],
        [/\bc['']est\s+enfl[eé]\b/gi, 'oedeme'],
        [/\bça\s+a\s+gonfl[eé]\b/gi, 'oedeme'],
        
        // Paralysies familières
        [/\bmain\s+morte\b/gi, 'paralysie main'],
        [/\bbras\s+mort\b/gi, 'paralysie bras'],
        [/\bjambe\s+morte\b/gi, 'paralysie jambe'],
        [/\bpied\s+mort\b/gi, 'paralysie pied'],
        [/\bparalysie\s+faciale?\b/gi, 'paralysie nerf facial'],
        [/\bparalysie\s+du\s+(?:nerf\s+)?facial\b/gi, 'paralysie nerf facial'],
        [/\bnerf\s+facial\s+paralys[eé]\b/gi, 'paralysie nerf facial'],
        
        // Lésions bilatérales / doubles (IMPORTANT pour détection "deux mains", "deux jambes", etc.)
        [/\bamputation\s+(?:des\s+)?deux\s+mains?\b/gi, 'perte des deux mains'],
        [/\bperte\s+(?:des\s+)?deux\s+mains?\b/gi, 'perte des deux mains'],
        [/\bdeux\s+mains?\s+amput[eé]es?\b/gi, 'perte des deux mains'],
        [/\bamputation\s+bilat[eé]rale\s+(?:des\s+)?mains?\b/gi, 'perte des deux mains'],
        [/\bamputation\s+(?:des\s+)?deux\s+jambes?\b/gi, 'perte des deux jambes'],
        [/\bamputation\s+(?:des\s+)?deux\s+pieds?\b/gi, 'perte des deux pieds'],
        
        [/\bplus\s+de\s+force\b/gi, 'deficit moteur'],
        [/\bpas\s+de\s+force\b/gi, 'deficit moteur'],
        [/\baucune\s+force\b/gi, 'deficit moteur severe'],
        [/\bc['']est\s+tout\s+mou\b/gi, 'hypotonie'],
        
        // Claudication et marche
        [/\bboite\s+beaucoup\b/gi, 'claudication severe'],
        [/\bboite\s+énormément\b/gi, 'claudication severe'],
        [/\bboite\s+un\s+peu\b/gi, 'claudication legere'],
        [/\bboite\s+léger\b/gi, 'claudication legere'],
        [/\bmarche\s+en\s+traînant\b/gi, 'claudication'],
        [/\bmarche\s+avec\s+(?:une|la)\s+canne\b/gi, 'claudication aide technique'],
        [/\bmarche\s+difficilement\b/gi, 'claudication'],
        [/\bne\s+peut\s+plus\s+marcher\b/gi, 'impossibilite marche'],
        
        // Amyotrophies
        [/\ba\s+fondu\b/gi, 'amyotrophie'],
        [/\bmuscle\s+fondu\b/gi, 'amyotrophie'],
        [/\bc['']est\s+tout\s+maigre\b/gi, 'amyotrophie'],
        [/\bpas\s+de\s+muscle\b/gi, 'amyotrophie'],
        
        // Déformations
        [/\bc['']est\s+de\s+travers\b/gi, 'deformation'],
        [/\bc['']est\s+tordu\b/gi, 'deformation'],
        [/\bc['']est\s+croche\b/gi, 'deformation'],
        [/\bc['']est\s+d[eé]vi[eé]\b/gi, 'deviation'],
        
        // Variantes orthographiques courantes
        [/\boedème\b/gi, 'oedeme'],
        [/\bœdème\b/gi, 'oedeme'],
        [/\bgene\b/gi, 'gene'],
        [/\bgêne\b/gi, 'gene'],
        [/\bepaule\b/gi, 'epaule'],
        [/\bcheville\b/gi, 'cheville']
    ];
    
    for (const [pattern, replacement] of familiarToMedical) {
        processed = processed.replace(pattern, replacement);
    }
    
    // 2. Verbes d'action médicaux à supprimer (ne gardent que la lésion)
    const actionVerbs = [
        // Présentation clinique
        /\b(?:présente|présentant|ayant|avec)\s+(?:une?|des?|le|la|les)\s+/gi,
        /\b(?:se\s+plaint\s+de?|plainte\s+de?|rapporte)\s+(?:une?|des?|le|la|les)?\s*/gi,
        /\b(?:décrit|relate|signale)\s+(?:une?|des?|le|la|les)?\s*/gi,
        
        // Souffrance et symptômes
        /\b(?:souffre|souffrant)\s+(?:de|d')\s*(?:une?|des?|le|la|les)?\s*/gi,
        /\b(?:ressent|éprouve)\s+(?:une?|des?|le|la|les)?\s*/gi,
        
        // Causalité et traumatisme
        /\b(?:victime|atteint|atteinte|touché|touchée)\s+(?:de|d'|par)\s*(?:une?|des?|le|la|les)?\s*/gi,
        /\b(?:suite\s+à|consécutif\s+à|secondaire\s+à|faisant\s+suite\s+à)\s+(?:une?|des?|le|la|les)?\s*/gi,
        /\b(?:causé\s+par|dû\s+à|lié\s+à|provoqué\s+par)\s+(?:une?|des?|le|la|les)?\s*/gi,
        /\b(?:après|post|suivant)\s+(?:une?|des?|le|la|les)?\s*/gi,
        
        // Diagnostic et examens
        /\b(?:diagnostiqué|diagnostiquée|identifié|identifiée)\s+(?:avec|pour|comme|une?|des?)?\s*/gi,
        /\b(?:retrouve|montre|met\s+en\s+évidence|objective)\s+(?:une?|des?|le|la|les)?\s*/gi,
        /\b(?:constate|observé|noté|détecté)\s+(?:une?|des?|le|la|les)?\s*/gi,
        /\b(?:révèle|révélant)\s+(?:une?|des?|le|la|les)?\s*/gi,
        
        // Traitement
        /\b(?:opéré|opérée|traité|traitée|pris\s+en\s+charge)\s+(?:pour|de|d'|sur)?\s*(?:une?|des?|le|la|les)?\s*/gi,
        /\b(?:intervenu|chirurgie|intervention)\s+(?:pour|sur)?\s*(?:une?|des?|le|la|les)?\s*/gi,
        
        // Circonstances AT/MP
        /\b(?:lors\s+de?|au\s+cours\s+de?|pendant|durant)\s+(?:une?|des?|le|la|les|son|sa|l')?(?:accident|travail|at|chute|traumatisme)?\s*/gi,
        /\b(?:dans\s+le\s+cadre\s+de?|à\s+l'occasion\s+de?)\s+(?:une?|des?|son|sa|l')?\s*/gi,
        
        // Évolution et consolidation
        /\b(?:garde|conserve|persiste|reste)\s+(?:une?|des?|le|la|les)?\s*/gi,
        /\b(?:présence\s+de?|existence\s+de?)\s+(?:une?|des?|le|la|les)?\s*/gi
    ];
    
    for (const pattern of actionVerbs) {
        processed = processed.replace(pattern, '');
    }
    
    // 3. Simplifier les articles et prépositions multiples
    processed = processed
        .replace(/\b(?:de\s+la|de\s+l'|du|des)\s+/gi, '')
        .replace(/\b(?:le|la|les|un|une|des)\s+/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
    
    return processed;
};

/**
 * Extrait les circonstances de l'accident (chute, choc, etc.)
 * Amélioration: détection contexte accident pour meilleure compréhension
 */
const extractAccidentCircumstances = (text: string): { circumstances?: string; mechanism?: string; cleanedText: string } => {
    let circumstances: string | undefined;
    let mechanism: string | undefined;
    let cleanedText = text;
    
    // Circonstances de l'accident
    const circumstancesPatterns = [
        /\b(?:chute|tombé|tombée|tombe)\s+(?:de|d'|depuis)?(?:une?|la|le)?\s*([a-zéèêàâôîû\s]+?)(?:\s*[;,.]|\s*qui\s|\s*présente|\s*$)/i,
        /\b(?:accident|traumatisme|trauma|choc)\s+(?:de|par|suite)?\s*(?:une?|la|le)?\s*([a-zéèêàâôîû\s]+?)(?:\s*[;,.]|\s*qui\s|\s*présente|\s*$)/i,
        /\b(?:coincement|écrasement|compression)\s+(?:de|du|par)?\s*(?:une?|la|le)?\s*([a-zéèêàâôîû\s]+?)(?:\s*[;,.]|\s*qui\s|\s*$)/i,
        /\b(?:torsion|entorse|luxation)\s+(?:suite|lors|pendant)?\s*(?:à|de)?\s*([a-zéèêàâôîû\s]+?)(?:\s*[;,.]|\s*qui\s|\s*$)/i
    ];
    
    for (const pattern of circumstancesPatterns) {
        const match = text.match(pattern);
        if (match) {
            circumstances = match[0].trim();
            cleanedText = cleanedText.replace(match[0], '').trim();
            break;
        }
    }
    
    // Mécanisme lésionnel
    const mechanismPatterns = [
        /\b(?:chute\s+de\s+(?:sa\s+)?hauteur|chute\s+d'hauteur|chute\s+depuis)\b/i,
        /\b(?:chute\s+de\s+plain\s+pied|chute\s+simple|glissade)\b/i,
        /\b(?:choc\s+direct|impact\s+direct|traumatisme\s+direct)\b/i,
        /\b(?:torsion|mouvement\s+brusque|faux\s+mouvement)\b/i,
        /\b(?:écrasement|coincement|compression)\b/i,
        /\b(?:accident\s+de\s+la\s+voie\s+publique|avp|accident\s+routier)\b/i,
        /\b(?:chute\s+d'objet|réception\s+d'objet|objet\s+lourd)\b/i
    ];
    
    for (const pattern of mechanismPatterns) {
        const match = text.match(pattern);
        if (match) {
            mechanism = match[0];
            break;
        }
    }
    
    return { circumstances, mechanism, cleanedText };
};

/**
 * Vérifie si le délai de consolidation est atteint
 * Amélioration v2.6: vérification médico-légale obligatoire
 */
const checkConsolidationDelay = (
    text: string,
    injuryName: string
): {
    isConsolidated: boolean;
    minimumDelay: number;
    currentDelay: number | null;
    warning: string | null;
} => {
    const normalized = normalize(text);
    const originalText = text.toLowerCase();
    
    // Extraction délai depuis traumatisme - Patterns améliorés
    const delayPatterns = [
        // Patterns avec "il y a" et variantes d'apostrophe
        /il\s*y\s*[''`']?\s*a\s+(\d+)\s+(mois|mo|semaines?|sem|jours?|j)/i,
        /y\s*[''`']?\s*a\s+(\d+)\s+(mois|mo|semaines?|sem|jours?|j)/i,
        
        // Patterns avec "survenu"
        /survenu[e]?\s+il\s*y\s*[''`']?\s*a\s+(\d+)\s+(mois|mo|semaines?|sem|jours?|j)/i,
        /survenu[e]?\s+depuis\s+(\d+)\s+(mois|mo|semaines?|sem|jours?|j)/i,
        /survenu[e]?\s+[aà]\s+(\d+)\s+(mois|mo|semaines?|sem|jours?|j)/i,
        
        // Patterns avec "depuis"
        /depuis\s+(\d+)\s+(mois|mo|semaines?|sem|jours?|j)/i,
        
        // Patterns avec "date de"
        /date\s+de\s+(\d+)\s+(mois|mo|semaines?|sem|jours?|j)/i,
        /date\s+[aà]\s+(\d+)\s+(mois|mo|semaines?|sem|jours?|j)/i,
        
        // Patterns avec "remonte"
        /remonte\s+[aà]\s+(\d+)\s+(mois|mo|semaines?|sem|jours?|j)/i,
        
        // Patterns post-traumatisme
        /(\d+)\s+(mois|mo|semaines?|sem|jours?|j)\s+post[-\s]?(?:traumatisme|trauma|accident|at|chirurgie)/i,
        /post[-\s]?(?:traumatisme|trauma|accident|at)\s+de\s+(\d+)\s+(mois|mo|semaines?|sem|jours?|j)/i,
        
        // Patterns "à + durée"
        /[aà]\s+(\d+)\s+(mois|mo|semaines?|sem|jours?|j)\s+(?:de|d'|du)/i,
        
        // Patterns consolidation
        /consolidation\s+[aà]\s+(\d+)\s+(mois|mo|semaines?|sem)/i,
        /consolid[eé]\s+[aà]\s+(\d+)\s+(mois|mo|semaines?|sem)/i,
        
        // Pattern générique numéro + unité
        /\b(\d+)\s+(mois|mo)\b/i
    ];
    
    let currentDelayMonths: number | null = null;
    
    for (const pattern of delayPatterns) {
        const match = originalText.match(pattern);
        if (match) {
            const value = parseInt(match[1], 10);
            const unit = match[2].toLowerCase();
            
            if (unit.startsWith('mois') || unit === 'mo') {
                currentDelayMonths = value;
            } else if (unit.startsWith('sem')) {
                currentDelayMonths = Math.round(value / 4.33 * 10) / 10;
            } else if (unit.startsWith('jour') || unit === 'j') {
                currentDelayMonths = Math.round(value / 30 * 10) / 10;
            }
            break;
        }
    }
    
    // Délais minimum consolidation selon type lésion (en mois)
    const consolidationDelays: Array<{ keywords: string[]; delay: number }> = [
        // Fractures membres inférieurs
        { keywords: ['fracture plateau tibial', 'fracture plateaux tibiaux'], delay: 4 },
        { keywords: ['fracture col femur', 'fracture col fémoral'], delay: 6 },
        { keywords: ['fracture diaphysaire femur', 'fracture diaphyse fémorale'], delay: 6 },
        { keywords: ['fracture diaphysaire tibia', 'fracture diaphyse tibiale'], delay: 4 },
        { keywords: ['fracture pilon tibial'], delay: 6 },
        { keywords: ['fracture malleole', 'fracture bimalléolaire', 'fracture trimalléolaire'], delay: 3 },
        { keywords: ['fracture rotule'], delay: 3 },
        { keywords: ['fracture astragale', 'fracture talus'], delay: 4 },
        { keywords: ['fracture calcaneum'], delay: 4 },
        
        // Fractures membres supérieurs
        { keywords: ['fracture humerus', 'fracture humérale'], delay: 3 },
        { keywords: ['fracture col chirurgical humerus'], delay: 4 },
        { keywords: ['fracture radius', 'fracture ulna', 'fracture avant-bras'], delay: 3 },
        { keywords: ['fracture poignet', 'fracture pouteau colles'], delay: 2 },
        { keywords: ['fracture scaphoide'], delay: 3 },
        { keywords: ['fracture clavicule'], delay: 2 },
        
        // Fractures rachis
        { keywords: ['fracture vertebre', 'fracture vertébrale'], delay: 3 },
        { keywords: ['fracture vertebre lombaire', 'fracture l1', 'fracture l2', 'fracture l3'], delay: 4 },
        { keywords: ['fracture vertebre dorsale', 'fracture d12', 'fracture d11'], delay: 3 },
        
        // Fractures bassin
        { keywords: ['fracture bassin', 'fracture cotyle', 'fracture acetabulum'], delay: 6 },
        { keywords: ['fracture sacrum'], delay: 3 },
        
        // Entorses et lésions ligamentaires
        { keywords: ['entorse grave genou', 'entorse grade 3 genou'], delay: 6 },
        { keywords: ['rupture lca', 'rupture ligament croisé'], delay: 9 },
        { keywords: ['rupture lcp'], delay: 9 },
        { keywords: ['entorse cheville grade 3'], delay: 4 },
        { keywords: ['entorse grave epaule'], delay: 3 },
        
        // Luxations
        { keywords: ['luxation epaule', 'luxation glenohumerale'], delay: 3 },
        { keywords: ['luxation coude'], delay: 4 },
        { keywords: ['luxation hanche'], delay: 6 },
        
        // Amputations
        { keywords: ['amputation doigt', 'amputation phalange'], delay: 2 },
        { keywords: ['amputation main'], delay: 4 },
        { keywords: ['amputation avant-bras'], delay: 6 },
        { keywords: ['amputation jambe'], delay: 6 },
        { keywords: ['amputation cuisse'], delay: 6 },
        
        // Autres lésions
        { keywords: ['plaie tendon', 'section tendon'], delay: 4 },
        { keywords: ['lesion nerf peripherique'], delay: 12 },
        { keywords: ['brulure profonde'], delay: 6 }
    ];
    
    // Recherche correspondance type lésion
    let minimumDelay = 3; // Défaut 3 mois si non spécifié
    const injuryNormalized = normalize(injuryName);
    
    for (const { keywords, delay } of consolidationDelays) {
        for (const keyword of keywords) {
            if (injuryNormalized.includes(normalize(keyword))) {
                minimumDelay = delay;
                break;
            }
        }
        if (minimumDelay !== 3) break;
    }
    
    // Vérification consolidation
    const isConsolidated = currentDelayMonths === null || currentDelayMonths >= minimumDelay;
    
    let warning: string | null = null;
    if (currentDelayMonths !== null && currentDelayMonths < minimumDelay) {
        const remaining = minimumDelay - currentDelayMonths;
        warning = `🚫 ÉVALUATION IPP IMPOSSIBLE - CONSOLIDATION NON ATTEINTE\n\n` +
                  `⏱️ Analyse temporelle :\n` +
                  `• Délai actuel depuis traumatisme : ${currentDelayMonths} mois\n` +
                  `• Délai minimum de consolidation requis : ${minimumDelay} mois\n` +
                  `• Temps restant avant évaluation possible : ${remaining} mois\n\n` +
                  `⚠️ DÉCISION MÉDICO-LÉGALE OBLIGATOIRE :\n` +
                  `L'évaluation de l'IPP est PRÉMATURÉE et doit être REFUSÉE.\n` +
                  `La consolidation n'est pas atteinte. L'état séquellaire n'est pas stabilisé.\n\n` +
                  `📋 Conduite à tenir :\n` +
                  `1️⃣ Poursuivre le traitement et la rééducation intensive\n` +
                  `2️⃣ Réévaluation clinique et radiologique à M+${Math.ceil(minimumDelay * 0.75)} minimum\n` +
                  `3️⃣ Nouvelle convocation pour évaluation IPP définitive\n` +
                  `   uniquement APRÈS consolidation complète\n` +
                  `4️⃣ Maintien de l'incapacité temporaire (IT) jusqu'à consolidation\n\n` +
                  `📅 Date de réévaluation recommandée : Dans ${remaining} mois minimum`;
    }
    
    return {
        isConsolidated,
        minimumDelay,
        currentDelay: currentDelayMonths,
        warning
    };
};

/**
 * Détecte le type de demande : attribution initiale vs révision
 * Amélioration v2.5: différenciation contexte médico-légal
 */
const detectRequestType = (text: string): { 
    requestType: 'attribution' | 'revision'; 
    revisionReason?: 'aggravation' | 'rechute' | 'amelioration' | 'reevaluation';
    previousRate?: number;
    cleanedText: string 
} => {
    const normalized = normalize(text);
    let requestType: 'attribution' | 'revision' = 'attribution';
    let revisionReason: 'aggravation' | 'rechute' | 'amelioration' | 'reevaluation' | undefined;
    let previousRate: number | undefined;
    let cleanedText = text;
    
    // Détection révision - mots-clés explicites
    const revisionPatterns = [
        { pattern: /\b(?:révision|revision|réexamen|réévaluation|reevaluation)\b/i, reason: 'reevaluation' as const },
        { pattern: /\b(?:aggravation|aggravé|aggravée|détérioration|dégradation|péjoration)\b/i, reason: 'aggravation' as const },
        { pattern: /\b(?:rechute|récidive|reprise évolutive|nouvel épisode)\b/i, reason: 'rechute' as const },
        { pattern: /\b(?:amélioration|amélioré|améliorée|régression|diminution)\b/i, reason: 'amelioration' as const }
    ];
    
    for (const { pattern, reason } of revisionPatterns) {
        if (pattern.test(normalized)) {
            requestType = 'revision';
            revisionReason = reason;
            break;
        }
    }
    
    // Détection IPP antérieur
    const previousRatePatterns = [
        /\bipp\s+(?:antérieure?|précédente?|initial)\s*[=:de]?\s*(\d{1,3})\s*%/i,
        /\b(?:attribué|accordé|reconnu)\s+(\d{1,3})\s*%\s+(?:ipp|d'ipp)/i,
        /\btaux\s+(?:antérieur|initial|précédent)\s*[=:de]?\s*(\d{1,3})\s*%/i,
        /\b(\d{1,3})\s*%\s+(?:ipp\s+)?(?:initialement?|au\s+départ|en\s+\d{4})/i
    ];
    
    for (const pattern of previousRatePatterns) {
        const match = text.match(pattern);
        if (match && match[1]) {
            const rate = parseInt(match[1], 10);
            if (rate >= 0 && rate <= 100) {
                previousRate = rate;
                requestType = 'revision'; // Si IPP antérieur mentionné = révision
                cleanedText = cleanedText.replace(match[0], '').trim();
                break;
            }
        }
    }
    
    // Détection implicite de révision par temporalité
    const implicitRevisionPatterns = [
        /\b(?:après|suite\s+à|depuis)\s+(?:consolidation|attribution|reconnaissance)\b/i,
        /\b(?:nouvelle|nouvel)\s+(?:certificat|examen|consultation)\b/i,
        /\b(?:état|séquelles)\s+(?:actuel|actuelles)\b/i
    ];
    
    if (requestType === 'attribution') {
        for (const pattern of implicitRevisionPatterns) {
            if (pattern.test(normalized)) {
                requestType = 'revision';
                revisionReason = revisionReason || 'reevaluation';
                break;
            }
        }
    }
    
    return { requestType, revisionReason, previousRate, cleanedText };
};

/**
 * Extrait la durée d'évolution et l'intensité des symptômes
 * Amélioration v2.3: détection temporalité et quantification clinique
 */
const extractTemporalityAndIntensity = (text: string): { 
    duration?: string; 
    painIntensity?: number; 
    functionalLimitation?: string;
    scores?: string[];
    shortening?: { value: number; unit: 'cm' };
    cleanedText: string 
} => {
    let duration: string | undefined;
    let painIntensity: number | undefined;
    let functionalLimitation: string | undefined;
    let shortening: { value: number; unit: 'cm' } | undefined;
    const scores: string[] = [];
    let cleanedText = text;
    
    // 1. Durée d'évolution / consolidation
    const durationPatterns = [
        { pattern: /\b(?:depuis|il\s+y\s+a|date\s+de|remonte\s+à)\s+(\d+)\s+(?:mois|mo)\b/i, unit: 'mois' },
        { pattern: /\b(?:depuis|il\s+y\s+a|date\s+de)\s+(\d+)\s+(?:ans?|années?)\b/i, unit: 'ans' },
        { pattern: /\b(?:consolidation|évolution|suivi)\s+(?:à|de|en)\s+(\d+)\s+(?:mois|mo)\b/i, unit: 'mois' },
        { pattern: /\b(\d+)\s+(?:mois|mo)\s+(?:post|après|suivant)\s+(?:accident|trauma|chirurgie)\b/i, unit: 'mois' },
        { pattern: /\b(?:récente|récent|aiguë?|aigu)\b/i, value: 'récente' },
        { pattern: /\b(?:ancienne?|ancien|chronique|séquellaire)\b/i, value: 'chronique' }
    ];
    
    for (const { pattern, unit, value } of durationPatterns) {
        const match = text.match(pattern);
        if (match) {
            if (value) {
                duration = value;
            } else if (match[1]) {
                duration = `${match[1]} ${unit}`;
            }
            cleanedText = cleanedText.replace(match[0], '').trim();
            break;
        }
    }
    
    // 2. Intensité douleur (EVA / EN / échelle)
    const painPatterns = [
        /\b(?:eva|en|échelle)\s*[=:]\s*(\d{1,2})\s*(?:\/\s*10)?\b/i,
        /\b(?:eva|en)\s*(\d{1,2})\b/i,
        /\b(?:douleur|algie)\s+(?:cotée|évaluée)\s+(?:à\s+)?(\d{1,2})\s*(?:\/\s*10)?\b/i,
        /\b(\d{1,2})\s*\/\s*10\s+(?:sur\s+)?(?:échelle|eva|en)\b/i
    ];
    
    for (const pattern of painPatterns) {
        const match = text.match(pattern);
        if (match && match[1]) {
            const intensity = parseInt(match[1]);
            if (intensity >= 0 && intensity <= 10) {
                painIntensity = intensity;
                cleanedText = cleanedText.replace(match[0], '').trim();
                break;
            }
        }
    }
    
    // 3. Limitation fonctionnelle (pourcentages)
    const limitationPatterns = [
        /\b(?:limitation|perte|déficit)\s+(?:de\s+)?(\d+)\s*%/i,
        /\b(?:limitation|perte|déficit)\s+(?:de\s+)?(\d+)\s+(?:pourcent|pour\s+cent)\b/i,
        /\b(\d+)\s*%\s+(?:de\s+)?(?:limitation|perte|déficit)\b/i
    ];
    
    for (const pattern of limitationPatterns) {
        const match = text.match(pattern);
        if (match && match[1]) {
            const percent = parseInt(match[1]);
            if (percent >= 0 && percent <= 100) {
                if (percent <= 30) {
                    functionalLimitation = `limitation légère (${percent}%)`;
                } else if (percent <= 60) {
                    functionalLimitation = `limitation modérée (${percent}%)`;
                } else {
                    functionalLimitation = `limitation sévère (${percent}%)`;
                }
                cleanedText = cleanedText.replace(match[0], '').trim();
                break;
            }
        }
    }
    
    // 4. Scores fonctionnels standardisés
    const scorePatterns = [
        { pattern: /\b(?:score\s+)?constant[:\s=]+(\d+)\s*(?:\/\s*100)?\b/i, name: 'Constant' },
        { pattern: /\b(?:score\s+)?dash[:\s=]+(\d+)\b/i, name: 'DASH' },
        { pattern: /\b(?:score\s+)?womac[:\s=]+(\d+)\b/i, name: 'WOMAC' },
        { pattern: /\b(?:score\s+)?lequesne[:\s=]+(\d+)\b/i, name: 'Lequesne' },
        { pattern: /\b(?:odi|oswestry)[:\s=]+(\d+)\s*%?\b/i, name: 'ODI' },
        { pattern: /\bquickdash[:\s=]+(\d+)\b/i, name: 'QuickDASH' }
    ];
    
    for (const { pattern, name } of scorePatterns) {
        const match = text.match(pattern);
        if (match && match[1]) {
            scores.push(`${name}: ${match[1]}`);
            cleanedText = cleanedText.replace(match[0], '').trim();
        }
    }
    
    // 5. 🆕 RACCOURCISSEMENT DE MEMBRE (en centimètres) - v2.7
    const shorteningPatterns = [
        /\braccourcissement\s+(?:de\s+)?(?:membre\s+(?:inférieur|supérieur|inf|sup)\s+)?(?:de\s+)?(\d+(?:[.,]\d+)?)\s*cm\b/i,
        /\binégalité\s+(?:de\s+longueur\s+)?(?:des\s+)?membres?\s+(?:de\s+)?(\d+(?:[.,]\d+)?)\s*cm\b/i,
        /\bmembre\s+(?:plus\s+)?court\s+(?:de\s+)?(\d+(?:[.,]\d+)?)\s*cm\b/i,
        /\b(\d+(?:[.,]\d+)?)\s*cm\s+(?:de\s+)?raccourcissement\b/i,
        /\bjambe\s+(?:plus\s+)?courte\s+(?:de\s+)?(\d+(?:[.,]\d+)?)\s*cm\b/i
    ];
    
    for (const pattern of shorteningPatterns) {
        const match = text.match(pattern);
        if (match && match[1]) {
            const value = parseFloat(match[1].replace(',', '.'));
            if (value > 0 && value <= 20) { // Raccourcissement réaliste entre 0 et 20 cm
                shortening = { value, unit: 'cm' };
                cleanedText = cleanedText.replace(match[0], '').trim();
                break;
            }
        }
    }
    
    return { duration, painIntensity, functionalLimitation, scores: scores.length > 0 ? scores : undefined, shortening, cleanedText };
};

/**
 * Extrait les amplitudes articulaires et contraintes professionnelles
 * Amélioration v2.4: détection ROM (Range of Motion) et gestes métier
 */
const extractArticularAndOccupational = (text: string): { 
    rom?: { joint: string; movement: string; value: number }[];
    occupationalConstraints?: string[];
    familiarExpressions?: string[];
    cleanedText: string 
} => {
    const rom: { joint: string; movement: string; value: number }[] = [];
    const occupationalConstraints: string[] = [];
    const familiarExpressions: string[] = [];
    let cleanedText = text;
    
    // 1. Extraction amplitudes articulaires (ROM)
    const romPatterns = [
        // Flexion/Extension avec angles
        /\b(flexion|extension|abduction|adduction|rotation\s+(?:externe|interne))\s+(?:limitée?\s+[aà]\s+)?(\d+)\s*(?:degrés?|°)\b/gi,
        /\b(\d+)\s*(?:degrés?|°)\s+(?:de\s+)?(flexion|extension|abduction|adduction)\b/gi,
        // Amplitudes spécifiques
        /\b(genou|epaule|coude|poignet|hanche|cheville)\s*[:-]?\s*(flexion|extension)\s+(\d+)\s*°?\b/gi,
        /\b(rachis|cervical|lombaire)\s*[:-]?\s*(?:flexion|inclinaison)\s+(\d+)\s*°?\b/gi
    ];
    
    for (const pattern of romPatterns) {
        let match;
        while ((match = pattern.exec(text)) !== null) {
            if (match[2] && match[1]) {
                const movement = match[1].toLowerCase();
                const value = parseInt(match[2]);
                const joint = text.substring(Math.max(0, match.index - 30), match.index).match(/\b(genou|epaule|coude|poignet|hanche|cheville|rachis|cervical|lombaire)\b/i)?.[0] || 'articulation';
                
                if (value >= 0 && value <= 180) {
                    rom.push({ joint, movement, value });
                    cleanedText = cleanedText.replace(match[0], '').trim();
                }
            }
        }
    }
    
    // 2. Contraintes professionnelles
    const occupationalPatterns = [
        /\b(?:port\s+de\s+charges?|soulever\s+des\s+charges?|manutention|manipulation\s+répétitive)\b/gi,
        /\b(?:position\s+prolongée|station\s+(?:debout|assise)\s+prolongée|orthostatisme)\b/gi,
        /\b(?:mouvements?\s+répétitifs?|gestes?\s+répétés?|tâches?\s+répétitives?)\b/gi,
        /\b(?:travail\s+en\s+hauteur|bras\s+levés?|bras\s+au[\s-]dessus\s+de\s+la\s+tête)\b/gi,
        /\b(?:vibrations?|exposition\s+vibrations?|marteau[\s-]piqueur)\b/gi,
        /\b(?:accroupi|à\s+genoux|agenouillement|position\s+accroupie)\b/gi,
        /\b(?:conduite\s+prolongée|chauffeur|conducteur)\b/gi
    ];
    
    for (const pattern of occupationalPatterns) {
        const match = text.match(pattern);
        if (match && !occupationalConstraints.includes(match[0].toLowerCase())) {
            occupationalConstraints.push(match[0].toLowerCase());
            cleanedText = cleanedText.replace(match[0], '').trim();
        }
    }
    
    // 3. Expressions familières significatives
    const familiarPatterns = [
        /\b(?:ne\s+peut\s+plus|n'arrive\s+plus\s+à|incapable\s+de)\b/gi,
        /\b(?:a\s+du\s+mal\s+à|peine\s+à|galère\s+à)\b/gi,
        /\b(?:ça\s+(?:tire|coince|craque|lâche|gonfle|chauffe|brûle|lance|pique|fourmille|dort))\b/gi,
        /\b(?:plus\s+de\s+force|main\s+morte|bras\s+mort|jambe\s+morte)\b/gi,
        /\b(?:boite\s+(?:beaucoup|un\s+peu)|marche\s+en\s+traînant)\b/gi,
        /\b(?:reste\s+coincé|bloqué\s+dans)\b/gi
    ];
    
    for (const pattern of familiarPatterns) {
        const match = text.match(pattern);
        if (match && !familiarExpressions.includes(match[0].toLowerCase())) {
            familiarExpressions.push(match[0].toLowerCase());
        }
    }
    
    return { 
        rom: rom.length > 0 ? rom : undefined, 
        occupationalConstraints: occupationalConstraints.length > 0 ? occupationalConstraints : undefined,
        familiarExpressions: familiarExpressions.length > 0 ? familiarExpressions : undefined,
        cleanedText 
    };
};

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
    'perte des deux mains': 200,  // Poids TRÈS élevé pour lésion bilatérale gravissime
    'deux mains': 180,
    'amputation bilaterale': 150,
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
    // Synonymes anatomiques de base
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
    
    // Variations régionales (lombaire, cervical, dorsal)
    'lombaires': 'lombaire', 'lombaire': 'lombaire',
    'cervicaux': 'cervical', 'cervicales': 'cervical',
    'dorsaux': 'dorsal', 'dorsales': 'dorsal',
    
    // Fractures et tassements vertébraux
    'tassement vertebral': 'fracture vertebre',
    'tassement': 'fracture',
    'compression vertebrale': 'fracture vertebre',
    'compression': 'fracture',
    'ecrasement vertebral': 'fracture vertebre',
    'affaissement vertebral': 'fracture vertebre',
    
    // Hernies et pathologies discales
    'hernie discale': 'hernie disc',
    'discopathie': 'hernie disc',
    'protrusion discale': 'hernie disc',
    'saillie discale': 'hernie disc',
    'bombement discal': 'hernie disc',
    'debord discal': 'hernie disc',
    
    // Nomenclature vertébrale (niveaux lombaires)
    'l1': 'lombaire', 'l2': 'lombaire', 'l3': 'lombaire', 'l4': 'lombaire', 'l5': 'lombaire',
    '1ere lombaire': 'lombaire', '2eme lombaire': 'lombaire', '3eme lombaire': 'lombaire',
    '4eme lombaire': 'lombaire', '5eme lombaire': 'lombaire',
    '1 ere lombaire': 'lombaire', '2 eme lombaire': 'lombaire', '3 eme lombaire': 'lombaire',
    '4 eme lombaire': 'lombaire', '5 eme lombaire': 'lombaire',
    'premiere lombaire': 'lombaire', 'deuxieme lombaire': 'lombaire', 'troisieme lombaire': 'lombaire',
    'quatrieme lombaire': 'lombaire', 'cinquieme lombaire': 'lombaire',
    '3eme vertebre lombaire': 'vertebre lombaire l3',
    '3 eme vertebre lombaire': 'vertebre lombaire l3',
    '4eme vertebre lombaire': 'vertebre lombaire l4',
    '5eme vertebre lombaire': 'vertebre lombaire l5',
    
    // Nomenclature vertébrale (niveaux cervicaux)
    'c1': 'cervical', 'c2': 'cervical', 'c3': 'cervical', 'c4': 'cervical', 
    'c5': 'cervical', 'c6': 'cervical', 'c7': 'cervical',
    '1ere cervicale': 'cervical', '2eme cervicale': 'cervical', '3eme cervicale': 'cervical',
    '4eme cervicale': 'cervical', '5eme cervicale': 'cervical', '6eme cervicale': 'cervical', '7eme cervicale': 'cervical',
    'atlas': 'cervical c1', 'axis': 'cervical c2',
    
    // Nomenclature vertébrale (niveaux dorsaux/thoraciques)
    'd1': 'dorsal', 'd2': 'dorsal', 'd3': 'dorsal', 'd4': 'dorsal', 'd5': 'dorsal',
    'd6': 'dorsal', 'd7': 'dorsal', 'd8': 'dorsal', 'd9': 'dorsal', 'd10': 'dorsal', 'd11': 'dorsal', 'd12': 'dorsal',
    't1': 'dorsal', 't2': 'dorsal', 't3': 'dorsal', 't4': 'dorsal', 't5': 'dorsal',
    't6': 'dorsal', 't7': 'dorsal', 't8': 'dorsal', 't9': 'dorsal', 't10': 'dorsal', 't11': 'dorsal', 't12': 'dorsal',
    'thoracique': 'dorsal',
    'vertebre thoracique': 'dorsal',
    'vertebre dorsale': 'dorsal',
    
    // Consolidation et cicatrisation
    'non deplacee': 'consolide',
    'non deplace': 'consolide',
    'bien consolide': 'normalement consolide',
    'consolidee': 'consolide',
    'cicatrisee': 'consolide',
    'guerrie': 'consolide',
    'stabilisee': 'consolide',
    'sans sequelle': 'consolide',
    'sans complication': 'consolide',
    
    // Termes médicaux courants
    'traumatisme': 'trauma',
    'contusion': 'traumatisme',
    'choc': 'traumatisme',
    'sequelle': 'lesion',
    'sequelles': 'lesion',
    'lesionnelle': 'lesion',
    'atteinte': 'lesion',
    'deficit': 'perte',
    'limitation': 'raideur',
    'gene': 'raideur',
    'diminution': 'perte',
    'reduction': 'perte',
    'abolition': 'perte',
    'absence': 'perte',
    
    // Cicatrices et séquelles esthétiques
    'sequelle esthetique': 'cicatrice esthetique',
    'prejudice esthetique': 'cicatrice esthetique',
    'cicatrice esthetique': 'cicatrice mineure',
    'cicatrice superficielle': 'cicatrice mineure',
    'plaie superficielle': 'cicatrice mineure',
    'sans retentissement fonctionnel': 'cicatrice mineure',
    'sequelle mineure': 'cicatrice mineure',
    'mineure': 'legere',
    'mineur': 'leger',
    
    // Membres et articulations
    'membre superieur': 'bras',
    'membre inferieur': 'jambe',
    'articulation': 'joint',
    'articulaire': 'joint',
    
    // Latéralité et localisation
    'cote droit': 'droit',
    'cote gauche': 'gauche',
    'bilateral': 'bilaterale',
    'bilaterale': 'deux cotes',
    'des deux cotes': 'bilaterale',
    'deux mains': 'perte des deux mains',
    'amputation des deux mains': 'perte des deux mains',
    'amputation bilaterale': 'bilaterale',
    'double amputation': 'bilaterale',
    'droitier': 'dominante',
    'gaucher': 'non dominante',
    
    // Abréviations médicales courantes
    'at': 'accident travail',
    'accident travail': 'accident',
    'accident de travail': 'accident',
    'acc travail': 'accident',
    'dms': 'distance mains sol',
    'distance mains sol': 'flexion rachis',
    'distance doigts sol': 'flexion rachis',
    'dds': 'flexion rachis',
    'rom': 'amplitude mouvement',
    'amp': 'amplitude',
    'rof': 'raideur',
    'ipd': 'incapacite permanente partielle',
    'ipp': 'taux incapacite',
    'it': 'incapacite temporaire',
    
    // Expressions familières et langage courant (v2.4)
    'ne peut plus': 'impossibilite',
    'n arrive plus a': 'impossibilite',
    'incapable de': 'impossibilite',
    'ne parvient pas a': 'difficulte',
    'a du mal a': 'difficulte',
    'peine a': 'difficulte',
    'galere a': 'difficulte',
    'souffre beaucoup': 'douleur severe',
    'fait tres mal': 'douleur importante',
    'fait un peu mal': 'douleur legere',
    'ca tire': 'tension',
    'ca coince': 'blocage',
    'ca craque': 'crepitation',
    'ca lache': 'instabilite',
    'ca gonfle': 'oedeme',
    'ca chauffe': 'inflammation',
    'ca brule': 'inflammation',
    'ca lance': 'douleur',
    'ca elance': 'douleur pulsatile',
    'ca pique': 'paresthesie',
    'ca fourmille': 'paresthesie',
    'ca dort': 'hypoesthesie',
    'ca sert a rien': 'inutile',
    'plus de force': 'deficit moteur',
    'main morte': 'paralysie',
    'bras mort': 'paralysie',
    'jambe morte': 'paralysie',
    'pied qui tombe': 'steppage',
    'main qui tombe': 'main tombante',
    'doigts crochus': 'griffes',
    'doigts en griffe': 'griffes',
    'marche comme un canard': 'demarche dandinante',
    'marche en traînant': 'claudication',
    'boite beaucoup': 'claudication severe',
    'boite un peu': 'claudication legere',
    'se deplace difficilement': 'mobilite reduite',
    'reste coince': 'blocage',
    'bloque dans certaines positions': 'limitation posturale',
    
    // Négations complexes et nuances (v2.4)
    'pratiquement aucune': 'minime',
    'quasiment pas de': 'minime',
    'presque pas de': 'minime',
    'tres peu de': 'minime',
    'a peine': 'minime',
    'pas vraiment': 'limite',
    'pas tellement': 'limite',
    'plus ou moins': 'moyen',
    'assez bien': 'satisfaisant',
    'plutot bien': 'satisfaisant',
    'relativement bien': 'satisfaisant',
    'pas trop mal': 'acceptable',
    'supportable': 'tolerable',
    'difficilement supportable': 'penible',
    'insupportable': 'intolerable',
    'invivable': 'intolerable',
    
    // Contexte professionnel et gestes répétitifs (v2.4)
    'port de charges': 'manutention',
    'soulever des charges': 'manutention',
    'porter des charges lourdes': 'manutention repetitive',
    'manipulation repetitive': 'geste repetitif',
    'mouvements repetitifs': 'geste repetitif',
    'gestes repetes': 'geste repetitif',
    'travail repete': 'tache repetitive',
    'position prolongee': 'contrainte posturale',
    'station debout prolongee': 'orthostatisme prolonge',
    'station assise prolongee': 'position assise',
    'penche en avant': 'flexion anterieure',
    'dos courbe': 'cyphose posturale',
    'bras en l air': 'elevation bras',
    'travail en hauteur': 'bras leves',
    'bras au dessus de la tete': 'hyperextension epaule',
    'genoux plies': 'flexion genoux',
    'accroupi': 'position accroupie',
    'a genoux': 'agenouillement',
    'sur une echelle': 'travail hauteur',
    'conduite prolongee': 'position assise prolongee',
    'vibrations': 'exposition vibrations',
    'marteau piqueur': 'vibrations importantes',
    'perceuse': 'vibrations',
    
    // Bilans articulaires et amplitudes (v2.4)
    'flexion 90 degres': 'flexion 90',
    'extension 0 degre': 'extension 0',
    'flexion limitee a': 'limitation flexion',
    'extension limitee a': 'limitation extension',
    'abduction 60 degres': 'abduction 60',
    'adduction 20 degres': 'adduction 20',
    'rotation externe': 're',
    'rotation interne': 'ri',
    'pronation': 'prono',
    'supination': 'supino',
    'flexion dorsale': 'dorsiflexion',
    'flexion plantaire': 'flexion plante',
    'inversion': 'varus pied',
    'eversion': 'valgus pied',
    'inclinaison laterale': 'inflexion laterale',
    'flexion anterieure': 'flexion avant',
    'extension posterieure': 'extension arriere',
    'angle limite a': 'limitation angulaire',
    'mobilite conservee': 'amplitude normale',
    'mobilite preservee': 'amplitude normale',
    'amplitude complete': 'mobilite totale',
    'amplitude reduite': 'limitation amplitude',
    'amplitude diminuee': 'perte amplitude',
    
    // Descriptions radiologiques avancées (v2.4)
    'trait de fracture': 'ligne fracture',
    'trait complet': 'fracture complete',
    'trait incomplet': 'fissure',
    'fracture comminutive': 'fracture plurifragmentaire',
    'fracture complexe': 'fracture grave',
    'esquille': 'fragment osseux',
    'esquilles': 'fragments',
    'deplacement': 'decalage',
    'deplace': 'avec deplacement',
    'sans deplacement': 'non deplacee',
    'angule': 'avec angulation',
    'angulation': 'deviation angulaire',
    'chevauchement': 'telescopage',
    'impaction': 'enfoncement',
    'enfoncement': 'depression',
    'comblé': 'consolide',
    'cal osseux': 'consolidation',
    'cal hypertrophique': 'cal important',
    'ossification': 'formation osseuse',
    'remaniement': 'modification osseuse',
    'geode': 'lacune osseuse',
    'osteolyse': 'destruction osseuse',
    'osteophyte': 'bec osseux',
    'osteophytose': 'arthrose',
    'pincement': 'reduction espace',
    'pincement articulaire': 'arthrose',
    'arthrose secondaire': 'arthrose post-traumatique',
    'arthrose post traumatique': 'arthrose post-traumatique',
    'arthrose sequellaire': 'arthrose post-traumatique',
    'espace reduit': 'pincement',
    'interligne': 'espace articulaire',
    'corps etranger': 'fragment libre',
    'souris articulaire': 'corps etranger',
    'calcification': 'depot calcique',
    'ossification heterotopique': 'calcification ectopique',
    'synostose': 'fusion osseuse',
    'atn': 'arret travail',
    'mp': 'maladie professionnelle',
    'irm': 'imagerie',
    'tdm': 'scanner',
    'rx': 'radiographie',
    'echo': 'echographie',
    
    // Examens et mesures cliniques
    'examen clinique': 'examen',
    'examen physique': 'examen',
    'testing': 'examen',
    'bilan fonctionnel': 'examen',
    'amplitude articulaire': 'mobilite',
    'range of motion': 'mobilite',
    'force musculaire': 'force',
    'testing musculaire': 'force',
    
    // Complications et évolutions
    'cal vicieux': 'consolidation vicieuse',
    'pseudarthrose': 'non consolidation',
    'retard consolidation': 'consolidation lente',
    'neuropathie': 'atteinte nerveuse',
    'algodystrophie': 'syndrome douloureux',
    'syndrome regional douloureux': 'algodystrophie',
    'srdc': 'algodystrophie',
    'capsulite retractile': 'raideur capsulaire',
    'epaule gelee': 'capsulite',
    
    // Degrés de gravité et intensité
    'severe': 'grave',
    'important': 'grave',
    'majeur': 'grave',
    'considerable': 'grave',
    'leger': 'faible',
    'minime': 'faible',
    'discret': 'faible',
    'modere': 'moyen',
    'intermediaire': 'moyen',
    
    // Signes fonctionnels
    'boiterie': 'claudication',
    'boitant': 'claudication',
    'marche difficile': 'claudication',
    'demarche anormale': 'claudication',
    'impotence fonctionnelle': 'perte fonction',
    'impossibilite': 'perte fonction',
    'incapacite': 'perte fonction',
    
    // Douleur et symptômes
    'douloureux': 'douleur',
    'algique': 'douleur',
    'algie': 'douleur',
    'souffrance': 'douleur',
    'nevralgie': 'douleur nerveuse',
    'paresthesie': 'trouble sensibilite',
    'fourmillement': 'paresthesie',
    'engourdissement': 'hypoesthesie',
    'perte sensibilite': 'anesthesie',
    'picotement': 'paresthesie',
    'dysesthesie': 'trouble sensibilite',
    
    // Mobilité et instabilité
    'blocage': 'limitation',
    'verrouillage': 'blocage',
    'ressaut': 'instabilite',
    'derobement': 'instabilite',
    'lachage': 'instabilite',
    'hyperlaxite': 'laxite',
    'hyper mobilite': 'laxite',
    'instable': 'instabilite',
    'luxation recidivante': 'instabilite',
    
    // Déformations orthopédiques
    'deformation': 'deviation',
    'valgus': 'deviation externe',
    'varus': 'deviation interne',
    'recurvatum': 'hyperextension',
    'flessum': 'flexion fixee',
    'equin': 'flexion plantaire',
    'malformation': 'deformation',
    
    // Troubles trophiques
    'amyotrophie': 'atrophie musculaire',
    'fonte musculaire': 'atrophie',
    'hypotrophie': 'atrophie',
    'oedeme': 'gonflement',
    'tumefaction': 'gonflement',
    'epanchement': 'gonflement',
    'hematome': 'collection',
    
    // Durées et temporalité médicale
    '3 mois': 'consolidation normale',
    'trois mois': 'consolidation normale',
    '6 mois': 'consolidation retardee',
    'six mois': 'consolidation retardee',
    '1 an': 'consolidation prolongee',
    
    // 🆕 Contexte médico-légal : attribution vs révision (v2.5)
    'revision': 'reevaluation',
    'reexamen': 'reevaluation',
    'reevaluation': 'nouvelle evaluation',
    'aggravation': 'deterioration',
    'aggravé': 'deterioration',
    'aggravée': 'deterioration',
    'péjoration': 'deterioration',
    'dégradation': 'deterioration',
    'rechute': 'recidive',
    'récidive': 'recidive',
    'reprise evolutive': 'recidive',
    'nouvel episode': 'recidive',
    'amelioration': 'regression',
    'amélioré': 'regression',
    'amélioration': 'regression',
    'regression': 'diminution',
    'ipp anterieur': 'taux precedent',
    'ipp initial': 'taux precedent',
    'taux precedent': 'ancien ipp',
    'ancienne attribution': 'attribution initiale',
    'premiere attribution': 'attribution initiale',
    'consolidation': 'guerison',
    'post consolidation': 'apres guerison',
    'etat actuel': 'sequelles actuelles',
    'sequelles residuelles': 'sequelles',
    'un an': 'consolidation prolongee',
    '12 mois': 'consolidation prolongee',
    'douze mois': 'consolidation prolongee',
    '2 ans': 'evolution prolongee',
    'deux ans': 'evolution prolongee',
    'recente': 'aigue',
    'recent': 'aigu',
    
    // 🆕 Enrichissement massif v2.7 - Langage naturel avancé
    // Douleurs qualitatives
    'douleur lancinante': 'douleur severe',
    'douleur fulgurante': 'douleur aigue',
    'douleur sourde': 'douleur chronique',
    'douleur pulsatile': 'douleur intense',
    'douleur irradiante': 'douleur projetee',
    
    // Mobilité et fonctionnalité
    'mobilite reduite': 'limitation',
    'mobilite limitee': 'limitation',
    'geste limite': 'limitation gestuelle',
    'mouvement limite': 'limitation mouvement',
    'ne peut pas faire': 'impossibilite',
    'impossible de faire': 'impossibilite',
    'tres difficile de': 'difficulte majeure',
    'difficulte pour': 'gene',
    'gene pour': 'limitation',
    'gene dans': 'limitation',
    'gene a': 'difficulte',
    'handicap': 'limitation fonctionnelle',
    'handicape pour': 'impossibilite',
    
    // Force et tonus
    'faiblesse': 'deficit moteur',
    'faiblesse musculaire': 'deficit moteur',
    'manque de force': 'deficit moteur',
    'perte de force': 'deficit moteur',
    'force diminuee': 'deficit moteur',
    'force reduite': 'deficit moteur',
    'asthenie': 'faiblesse',
    'fatigue musculaire': 'deficit endurance',
    'sans force': 'deficit moteur severe',
    'tout mou': 'hypotonie',
    'mou': 'hypotonie',
    'flasque': 'hypotonie',
    'tonique': 'contracture',
    'contracte': 'contracture',
    'tendu': 'contracture',
    'raide': 'raideur',
    'rigide': 'raideur',
    'bloque': 'blocage',
    
    // Stabilité et équilibre (doublons supprimés)
    'cedage': 'instabilite',
    'pas stable': 'instabilite',
    'se derobe': 'instabilite',
    'flanche': 'instabilite',
    'jeu': 'laxite',
    'jeu articulaire': 'laxite',
    'ballant': 'laxite',
    'ballottement': 'laxite',
    'tiroir': 'laxite',
    'equilibre perturbe': 'trouble equilibre',
    'desequilibre': 'trouble equilibre',
    
    // Sensibilité et innervation
    'pas de sensation': 'anesthesie',
    'sans sensation': 'anesthesie',
    'insensible': 'anesthesie',
    'sensation diminuee': 'hypoesthesie',
    'sensation reduite': 'hypoesthesie',
    'moins sensible': 'hypoesthesie',
    'hypersensible': 'hyperesthesie',
    'trop sensible': 'hyperesthesie',
    'sensation exageree': 'hyperesthesie',
    'allodynie': 'douleur tactile',
    
    // Marche et locomotion
    'marche perturbee': 'trouble marche',
    'marche anormale': 'trouble marche',
    'ne peut pas marcher': 'impossibilite marche',
    'impossible de marcher': 'impossibilite marche',
    'marche penible': 'claudication',
    'marche douloureuse': 'claudication',
    'perimetre de marche': 'distance marche',
    'distance limitee': 'limitation perimetre',
    'canne': 'aide technique',
    'bequille': 'aide technique',
    'deambulateur': 'aide technique',
    'fauteuil roulant': 'aide mobilite',
    
    // Termes anatomiques familiers
    'bas du dos': 'lombaires',
    'haut du dos': 'dorsales',
    'cou': 'cervicales',
    'nuque': 'cervicales',
    'omoplate': 'scapula',
    'mollet': 'triceps sural',
    'talon d achille': 'tendon achille',
    'rotule': 'patella',
    'hanche': 'coxofemorale',
    'ancienne': 'chronique',
    'ancien': 'chronique',
    'sequellaire': 'chronique',
    'residuel': 'sequelle',
    'residuelle': 'sequelle',
    'persistant': 'chronique',
    'persistante': 'chronique',
    
    // Intensité douleur (échelle EVA)
    'eva 1': 'douleur faible',
    'eva 2': 'douleur faible',
    'eva 3': 'douleur faible',
    'eva 4': 'douleur moderee',
    'eva 5': 'douleur moderee',
    'eva 6': 'douleur moderee',
    'eva 7': 'douleur forte',
    'eva 8': 'douleur forte',
    'eva 9': 'douleur severe',
    'eva 10': 'douleur maximale',
    'echelle 1/10': 'douleur faible',
    'echelle 3/10': 'douleur faible',
    'echelle 5/10': 'douleur moderee',
    'echelle 7/10': 'douleur forte',
    'echelle 10/10': 'douleur maximale',
    'douleur cotee': 'evaluation douleur',
    'en': 'echelle numerique',
    
    // Limitation fonctionnelle (pourcentages)
    'limitation 25%': 'limitation legere',
    'limitation 25 pourcent': 'limitation legere',
    'limitation 50%': 'limitation moderee',
    'limitation 50 pourcent': 'limitation moderee',
    'limitation 75%': 'limitation severe',
    'limitation 75 pourcent': 'limitation severe',
    'perte 30%': 'deficit moyen',
    'perte 50%': 'deficit important',
    'perte 80%': 'deficit majeur',
    'deficit 100%': 'perte totale',
    
    // Scores fonctionnels standardisés
    'constant': 'score epaule',
    'score constant': 'evaluation epaule',
    'dash': 'score membre superieur',
    'score dash': 'evaluation main',
    'quickdash': 'score fonction main',
    'womac': 'score genou hanche',
    'score womac': 'evaluation arthrose',
    'lequesne': 'score arthrose',
    'odi': 'score rachis',
    'oswestry': 'score lombaire',
    'score oswestry': 'incapacite lombaire',
    'vas': 'echelle visuelle',
    'evs': 'echelle visuelle',
    
    // Traitements et interventions
    'reeducation': 'kinesitherapie',
    'kine': 'kinesitherapie',
    'physiotherapie': 'kinesitherapie',
    'revalidation': 'kinesitherapie',
    'infiltration': 'injection',
    'injection cortisone': 'infiltration corticoide',
    'viscosupplementation': 'injection acide hyaluronique',
    'piqure': 'injection',
    'seance': 'traitement',
    'cure': 'traitement',
    'protocole': 'traitement',
    'immobilisation': 'contention',
    'platre': 'immobilisation',
    'attelle': 'immobilisation',
    'orthopedie': 'traitement orthopedique',
    'chirurgie': 'traitement chirurgical',
    'operation': 'chirurgie',
    'intervention': 'chirurgie',
    'bloc operatoire': 'chirurgie',
    'osteosynthese': 'fixation chirurgicale',
    'materiel': 'osteosynthese',
    'vis plaque': 'osteosynthese',
    'broche': 'osteosynthese',
    'clou': 'osteosynthese',
    'fixateur externe': 'fixation externe',
    'prothese': 'remplacement articulaire',
    'arthroplastie': 'prothese',
    'pth': 'prothese totale hanche',
    'ptg': 'prothese totale genou',
    'pte': 'prothese totale epaule',
    'arthrodese': 'fusion articulaire',
    'synovectomie': 'ablation synoviale',
    'arthrolyse': 'liberation articulaire',
    'meniscectomie': 'ablation menisque',
    'ligamentoplastie': 'reconstruction ligamentaire',
    'greffe': 'transplant',
    'autogreffe': 'greffe osseuse',
    
    // Examens complémentaires avancés
    'arthroscanner': 'scanner articulation',
    'arthro irm': 'irm articulaire',
    'emg': 'electromyogramme',
    'electroneuromyogramme': 'emg',
    'enmg': 'emg',
    'potentiels evoques': 'examen neurophysiologique',
    'scintigraphie': 'imagerie nucleaire',
    'petscan': 'tomographie emission',
    'doppler': 'echographie vasculaire',
    'angiographie': 'imagerie vaisseaux',
    'echodoppler': 'doppler',
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

/**
 * Analyse avancée du contexte clinique pour détecter critères de sévérité
 * Amélioration v2.7: Détection troubles statiques, déformations, complications
 */
const analyzeAdvancedClinicalContext = (text: string): {
    hasTroublesStatiques: boolean;
    hasDeformation: boolean;
    hasCalVicieux: boolean;
    hasArthrose: boolean;
    hasNeurologicalSigns: boolean;
    hasVascularSigns: boolean;
    severityModifiers: string[];
} => {
    const normalized = normalize(text);
    
    // Troubles statiques sévères
    const troublesStatiquesPatterns = [
        'marche sur le bord externe',
        'marche sur le bord interne',
        'marche sur bord',
        'appui anormal',
        'appui externe',
        'appui interne',
        'deviation axiale',
        'varus',
        'valgus',
        'recurvatum',
        'flessum',
        'equin',
        'troubles statiques',
        'perturbation appui'
    ];
    
    const hasTroublesStatiques = troublesStatiquesPatterns.some(p => normalized.includes(p));
    
    // Déformations
    const deformationPatterns = [
        'deformation',
        'difforme',
        'disgracieux',
        'aspect anormal',
        'saillie',
        'gibbosité',
        'cyphose',
        'scoliose',
        'deviation'
    ];
    
    const hasDeformation = deformationPatterns.some(p => normalized.includes(p));
    
    // Cal vicieux
    const calVicieuxPatterns = [
        'cal vicieux',
        'consolidation vicieuse',
        'mal consolide',
        'consolidation defectueuse'
    ];
    
    const hasCalVicieux = calVicieuxPatterns.some(p => normalized.includes(p));
    
    // Arthrose post-traumatique
    const arthrosePatterns = [
        'arthrose',
        'arthrosique',
        'pincement articulaire',
        'osteophyte',
        'geode',
        'usure cartilage'
    ];
    
    const hasArthrose = arthrosePatterns.some(p => normalized.includes(p));
    
    // Signes neurologiques (incluant signes radiculaires)
    const neuroPatterns = [
        'paresthesie',
        'hypoesthesie',
        'anesthesie',
        'nevralgie',
        'syndrome canal',
        'compression nerveuse',
        'deficit sensitif',
        'deficit moteur',
        'paralysie',
        'areflex',
        'sciatalgie',
        'sciatique',
        'cruralgie',
        'nevralgie crurale',
        'radiculalgie',
        'syndrome radiculaire',
        'compression radiculaire',
        'hernie discale',
        'discopathie',
        'lasegue',
        'signe de lasegue'
    ];
    
    const hasNeurologicalSigns = neuroPatterns.some(p => normalized.includes(p));
    
    // Signes vasculaires
    const vascularPatterns = [
        'oedeme',
        'troubles trophiques',
        'cyanose',
        'algodystrophie',
        'syndrome douloureux regional',
        'srdc'
    ];
    
    const hasVascularSigns = vascularPatterns.some(p => normalized.includes(p));
    
    // Modificateurs de sévérité
    const severityModifiers: string[] = [];
    if (hasTroublesStatiques) severityModifiers.push('Troubles statiques majeurs');
    if (hasDeformation) severityModifiers.push('Déformation visible');
    if (hasCalVicieux) severityModifiers.push('Cal vicieux');
    if (hasArthrose) severityModifiers.push('Arthrose post-traumatique');
    if (hasNeurologicalSigns) severityModifiers.push('Atteinte neurologique');
    if (hasVascularSigns) severityModifiers.push('Troubles vasculo-trophiques');
    
    return {
        hasTroublesStatiques,
        hasDeformation,
        hasCalVicieux,
        hasArthrose,
        hasNeurologicalSigns,
        hasVascularSigns,
        severityModifiers
    };
};

const determineSeverity = (
    normalizedText: string, 
    painIntensity?: number, 
    functionalLimitation?: string,
    shortening?: { value: number; unit: 'cm' }
): { level: 'faible' | 'moyen' | 'élevé', signs: string[], isDefault: boolean } => {
    // 🔥 NOUVEAU : Analyse contexte clinique avancé PRIORITAIRE
    const clinicalContext = analyzeAdvancedClinicalContext(normalizedText);
    
    // 🆕 CRITÈRE MAJEUR : Raccourcissement membre ≥ 4 cm → SÉVÉRITÉ ÉLEVÉE
    if (shortening && shortening.value >= 4) {
        return { 
            level: 'élevé', 
            signs: [`⚠️ Raccourcissement majeur: ${shortening.value} cm`, 'Trouble statique majeur', 'Nécessité d\'appareillage'], 
            isDefault: false 
        };
    }
    
    // 🆕 CRITÈRE MODÉRÉ : Raccourcissement 2-3.9 cm → SÉVÉRITÉ MOYENNE minimum
    if (shortening && shortening.value >= 2 && shortening.value < 4) {
        return { 
            level: 'moyen', 
            signs: [`Raccourcissement modéré: ${shortening.value} cm`, 'Inégalité longueur membres'], 
            isDefault: false 
        };
    }
    
    // 🚨 CRITÈRE BLOQUANT : Troubles statiques détectés → SÉVÉRITÉ ÉLEVÉE OBLIGATOIRE
    if (clinicalContext.hasTroublesStatiques) {
        const troublesSigns = clinicalContext.severityModifiers.filter(m => m.includes('Troubles statiques'));
        return { 
            level: 'élevé', 
            signs: ['⚠️ Troubles statiques confirmés', ...troublesSigns], 
            isDefault: false 
        };
    }
    
    // 🔺 CRITÈRE MAJORATION : Cal vicieux + Déformation → Partie haute fourchette
    if (clinicalContext.hasCalVicieux && clinicalContext.hasDeformation) {
        const combinedSigns = clinicalContext.severityModifiers.filter(m => 
            m.includes('Cal vicieux') || m.includes('Déformation')
        );
        return { 
            level: 'élevé', 
            signs: ['Cal vicieux + déformation majeure', ...combinedSigns], 
            isDefault: false 
        };
    }
    
    // 🩺 CRITÈRE MAJORATION : Arthrose post-traumatique confirmée → Moyen minimum
    if (clinicalContext.hasArthrose) {
        const arthroseSigns = clinicalContext.severityModifiers.filter(m => m.includes('Arthrose'));
        return { 
            level: 'moyen', 
            signs: ['Arthrose post-traumatique', ...arthroseSigns], 
            isDefault: false 
        };
    }
    
    // 🧠 CRITÈRE MAJORATION : Signes neurologiques + vasculaires → Élevé
    if (clinicalContext.hasNeurologicalSigns && clinicalContext.hasVascularSigns) {
        return { 
            level: 'élevé', 
            signs: ['Atteinte neuro-vasculaire', 'paresthésies', 'troubles trophiques'], 
            isDefault: false 
        };
    }
    
    const severityKeywords = {
        élevé: [
            // Impossibilité et perte fonction totale
            'impossible', 'impossibilite', 'impotence', 'incapacite totale',
            // Intensité forte
            'severe', 'sevère', 'majeur', 'majeure', 'grave', 'important', 'importante', 'considerable',
            'intense', 'tres douloureux', 'tres important',
            // Persistance et chronicité
            'persistante', 'permanent', 'chronique severe', 'invalidant',
            // Signes objectifs graves
            'instabilite', 'instabilité', 'laxite importante', 'derobement',
            'raideur severe', 'raideur importante', 'ankylose',
            'boiterie', 'claudication', 'marche impossible',
            'paralysie', 'parésie', 'deficit moteur',
            // Interventions lourdes
            'chirurgie', 'opere', 'opéré', 'operee', 'opérée', 'intervention',
            'ostéosynthèse', 'prothèse', 'arthrodèse',
            'appareillage', 'orthèse', 'attelle permanente',
            // Complications
            'algodystrophie', 'syndrome douloureux', 'pseudarthrose',
            'cal vicieux important', 'infection', 'nécrose',
            // Perte anatomique
            'amputation', 'desarticulation', 'perte substance',
            'raccourcissement', 'deformation importante',
            'totale', 'complete', 'definitive'
        ],
        moyen: [
            // Intensité modérée
            'modérée', 'modere', 'moderee', 'moyen', 'moyenne',
            'intermediaire', 'mesure',
            // Chronicité modérée
            'chronique', 'persistant', 'recidivant',
            // Fonctionnel modéré
            'difficile', 'limite', 'limitation', 'gene', 'gêne', 'reduit',
            'diminution', 'diminué', 'diminuee',
            // Douleur modérée
            'douleur', 'douloureuse', 'douloureux', 'algie', 'algique',
            'gonalgie', 'lombalgie', 'cervicalgie', 'coxalgie',
            // Signes objectifs modérés
            'raideur', 'raideur moderee', 'limitation mobilite',
            'deviation', 'cal vicieux', 'consolidation vicieuse',
            'laxite', 'laxite moderee',
            // Troubles trophiques
            'amyotrophie', 'atrophie', 'fonte musculaire',
            'oedeme', 'gonflement persistant',
            // Paresthésies
            'paresthesie', 'fourmillement', 'engourdissement',
            'hypoesthesie', 'dysesthesie'
        ],
        faible: [
            // Intensité faible
            'legere', 'légère', 'minime', 'discret', 'discrète',
            'petit', 'petite', 'peu', 'leger',
            // Bon pronostic
            'simple', 'bonne consolidation', 'bien consolide',
            'recuperation', 'bonne recuperation', 'recuperation complete',
            // Peu de retentissement
            'peu important', 'peu gene', 'peu gênant',
            'occasionnel', 'intermittent', 'variable',
            // Sans complication
            'sans sequelle', 'sans complication', 'sans suite',
            'favorable', 'satisfaisant'
        ]
    };
    const negationWords = ['sans', 'pas de', 'aucune', 'aucun', 'non', 'peu de', 'absence de'];

    // 🆕 Détection critères spécifiques fracture col fémoral
    const hasRaccourcissement = /raccourcissement|inegalite.*membres?|boiterie.*raccourcissement|jambe.*courte|membre.*court/i.test(normalizedText);
    const hasRaideurSevere = /raideur\s+(?:importante|severe|marquee)|flexion\s+(?:<|inferieur|moins)?\s*(?:60|50|40)|ankylose|blocage/i.test(normalizedText);
    const hasLimitationLegere = /limitation\s+(?:legere|minime|discrete)|legere?\s+(?:raideur|limitation|gene)|gene\s+(?:legere|minime)|flexion\s+(?:90|100|110)/i.test(normalizedText);
    const hasBonneConsolidation = /bonne\s+consolidation|consolidation\s+(?:anatomique|favorable)|sans\s+(?:raccourcissement|complication)|mobilite\s+conservee/i.test(normalizedText);

    // 1️⃣ Critères quantitatifs prioritaires (EVA, limitations)
    // EVA ≥ 7 → élevé, EVA 4-6 → moyen, EVA ≤ 3 → faible
    if (painIntensity !== undefined) {
        if (painIntensity >= 7) {
            return { level: 'élevé', signs: [`EVA ${painIntensity}/10 (douleur forte)`], isDefault: false };
        } else if (painIntensity >= 4) {
            return { level: 'moyen', signs: [`EVA ${painIntensity}/10 (douleur modérée)`], isDefault: false };
        } else if (painIntensity <= 3) {
            return { level: 'faible', signs: [`EVA ${painIntensity}/10 (douleur faible)`], isDefault: false };
        }
    }
    
    // Limitation fonctionnelle > 60% → élevé, 30-60% → moyen, < 30% → faible
    if (functionalLimitation) {
        if (functionalLimitation.includes('sévère')) {
            return { level: 'élevé', signs: [functionalLimitation], isDefault: false };
        } else if (functionalLimitation.includes('modérée')) {
            return { level: 'moyen', signs: [functionalLimitation], isDefault: false };
        } else if (functionalLimitation.includes('légère')) {
            return { level: 'faible', signs: [functionalLimitation], isDefault: false };
        }
    }
    
    // 🆕 Critères spécifiques fracture col fémoral/hanche
    if (/col.*femur|col.*femoral|hanche.*fracture|fracture.*hanche/i.test(normalizedText)) {
        if (hasRaccourcissement && hasRaideurSevere) {
            return { level: 'élevé', signs: ['raccourcissement membre', 'raideur importante'], isDefault: false };
        } else if (hasRaccourcissement || hasRaideurSevere) {
            return { level: 'moyen', signs: hasRaccourcissement ? ['raccourcissement'] : ['raideur importante'], isDefault: false };
        } else if (hasLimitationLegere || hasBonneConsolidation) {
            return { level: 'faible', signs: ['limitation légère', 'bonne consolidation'], isDefault: false };
        }
    }
    
    // 🆕 Critères spécifiques fracture radius avec cal vicieux
    if (/fracture.*radius|radius.*fracture/i.test(normalizedText)) {
        const hasCalVicieux = /cal\s+vicieux/i.test(normalizedText);
        const calModere = /cal\s+(?:vicieux\s+)?(?:modere|moyen|leger)/i.test(normalizedText) || 
                          /sans\s+perte\s+majeure|gene\s+(?:moyenne|moderee)|limitation\s+(?:moyenne|moderee)/i.test(normalizedText);
        const calSevere = /cal\s+(?:vicieux\s+)?(?:important|severe)|perte\s+(?:importante|majeure|severe)|raideur\s+(?:importante|severe)/i.test(normalizedText);
        
        if (hasCalVicieux && calModere) {
            return { level: 'moyen', signs: ['cal vicieux modéré', 'gêne moyenne'], isDefault: false };
        } else if (hasCalVicieux && calSevere) {
            return { level: 'élevé', signs: ['cal vicieux important', 'limitation sévère'], isDefault: false };
        } else if (hasCalVicieux) {
            return { level: 'moyen', signs: ['cal vicieux'], isDefault: false };
        }
    }

    // 2️⃣ First, check for explicit "faible" keywords
    let signs = severityKeywords.faible.filter(kw => normalizedText.includes(kw));
    if (signs.length > 0) return { level: 'faible', signs: [...new Set(signs)], isDefault: false };

    // 3️⃣ Check for "high" keywords, but only if they are not negated
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
    
    // 4️⃣ Then, check for "moyen" keywords
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
    const normalized = normalize(userInput);

    // 🆕 Détection incompatibilité: signes neurologiques + rubrique "sans lésion neurologique"
    const clinicalContext = analyzeAdvancedClinicalContext(userInput);
    const injuryNameLower = injury.name.toLowerCase();
    const hasNeurologicalExclusion = 
        injuryNameLower.includes('sans lésion neurologique') ||
        injuryNameLower.includes('sans atteinte neurologique') ||
        injuryNameLower.includes('sans déficit neurologique');
    
    const hasIncompatibility = clinicalContext.hasNeurologicalSigns && hasNeurologicalExclusion;

    let justification = "<strong>🔍 ANALYSE EXPERTIALE DÉTAILLÉE</strong><br><br>";
    
    // ⚠️ AVERTISSEMENT CRITIQUE si incompatibilité détectée
    if (hasIncompatibility) {
        justification += `<div style="background:#ff5722; color:white; padding:15px; margin:10px 0; border-radius:5px; border-left:5px solid #c41c00;">`;
        justification += `<strong>⚠️ ALERTE CLASSIFICATION INADAPTÉE</strong><br><br>`;
        justification += `<strong>INCOMPATIBILITÉ DÉTECTÉE :</strong><br>`;
        justification += `• Description clinique : Présence de <strong>signes neurologiques</strong> (${clinicalContext.severityModifiers.filter(m => m.includes('neurologique')).join(', ')})<br>`;
        justification += `• Rubrique proposée : "<em>${injury.name}</em>" (${hasNeurologicalExclusion ? 'EXCLUT' : 'ignore'} les atteintes neurologiques)<br><br>`;
        justification += `<strong>⚠️ CETTE RUBRIQUE NE CONVIENT PAS POUR CE CAS</strong><br><br>`;
        justification += `<strong>🔍 ACTIONS REQUISES :</strong><br>`;
        justification += `1️⃣ Rechercher rubriques <strong>AVEC atteinte radiculaire/neurologique</strong><br>`;
        justification += `2️⃣ Exemples : "Sciatique chronique post-traumatique", "Syndrome radiculaire L5/S1", "Compression nerveuse"<br>`;
        justification += `3️⃣ OU cumuler : Taux fracture + Taux atteinte radiculaire (formule de cumul)<br>`;
        justification += `</div><br>`;
    }
    
    // Section 1 : Résumé clinique
    justification += "<strong>1️⃣ Résumé clinique</strong><br>";
    justification += `Description fournie : "<em>${clinicalDescription}</em>".<br><br>`;

    // Section 2 : Analyse anatomo-fonctionnelle ENRICHIE
    justification += "<strong>2️⃣ Analyse anatomo-fonctionnelle</strong><br>";
    
    // Extraction données cliniques du texte
    const hasFlexion = /flexion\s+(?:limitée?|à|de|:)?\s*(\d+)(?:°|deg|degres)?/i.exec(userInput);
    const hasExtension = /extension\s+(?:limitée?|à|de|:)?\s*(\d+)(?:°|deg|degres)?/i.exec(userInput);
    const hasEVA = /eva\s*[=:]?\s*(\d{1,2})/i.exec(userInput);
    const hasRaccourcissementMesure = /raccourcissement.*?(\d+(?:[.,]\d+)?)\s*cm|inégalité.*?(\d+(?:[.,]\d+)?)\s*cm/i.exec(userInput);
    const hasRaccourcissement = /raccourcissement|inégalité|jambe\s+plus\s+courte/i.test(normalized);
    const hasBoiterie = /boiterie|claudication|marche\s+difficile/i.test(normalized);
    const hasCalVicieux = /cal\s+vicieux/i.test(normalized);
    const hasRaideur = /raideur/i.test(normalized);
    const hasLimitation = /limitation/i.test(normalized);
    const hasInstabilite = /instabilité|instabilite|laxité|laxite/i.test(normalized);
    const hasDouleur = /douleur|douloureuse|gonalgie|coxalgie|brachialgie/i.test(normalized);
    
    // Analyse détaillée selon critères objectifs
    if (hasFlexion || hasExtension || hasEVA || clinicalSigns.length > 0) {
        justification += "Éléments cliniques objectifs identifiés :<br>";
        justification += "<ul>";
        
        if (hasFlexion) {
            const flexionValue = parseInt(hasFlexion[1]);
            const articulation = /genou|hanche|coude|poignet|epaule/i.exec(userInput)?.[0] || "articulation";
            const normalValues: { [key: string]: number } = {
                'genou': 140, 'hanche': 120, 'coude': 145, 
                'poignet': 80, 'epaule': 180
            };
            const normal = normalValues[articulation.toLowerCase()] || 120;
            const deficit = normal - flexionValue;
            const pourcentageDeficit = Math.round((deficit / normal) * 100);
            
            justification += `<li><strong>Flexion ${articulation} : ${flexionValue}°</strong> (N = ${normal}°)<br>`;
            justification += `→ Déficit de ${deficit}° (${pourcentageDeficit}% de perte)<br>`;
            
            if (pourcentageDeficit < 20) {
                justification += `→ Impact : <span style="color:green">LÉGER</span> - Activités courantes possibles</li>`;
            } else if (pourcentageDeficit < 50) {
                justification += `→ Impact : <span style="color:orange">MODÉRÉ</span> - Gêne significative activités</li>`;
            } else {
                justification += `→ Impact : <span style="color:red">SÉVÈRE</span> - Limitation majeure fonctionnelle</li>`;
            }
        }
        
        if (hasExtension) {
            justification += `<li><strong>Extension limitée à ${hasExtension[1]}°</strong> (flexum résiduel)<br>`;
            justification += `→ Rétraction capsulo-ligamentaire confirmée</li>`;
        }
        
        if (hasEVA) {
            const evaValue = parseInt(hasEVA[1]);
            justification += `<li><strong>Douleur : EVA ${evaValue}/10</strong><br>`;
            if (evaValue >= 7) {
                justification += `→ Douleur <span style="color:red">INTENSE</span> - Retentissement majeur qualité de vie</li>`;
            } else if (evaValue >= 4) {
                justification += `→ Douleur <span style="color:orange">MODÉRÉE</span> - Gêne quotidienne</li>`;
            } else {
                justification += `→ Douleur <span style="color:green">FAIBLE</span> - Impact limité</li>`;
            }
        }
        
        if (hasRaccourcissementMesure) {
            const raccourcissementCm = parseFloat((hasRaccourcissementMesure[1] || hasRaccourcissementMesure[2]).replace(',', '.'));
            justification += `<li><strong>Raccourcissement membre inférieur : ${raccourcissementCm} cm</strong> (mesure objective)<br>`;
            
            if (raccourcissementCm >= 4) {
                justification += `→ <span style="color:red">SÉVÈRE</span> (≥ 4 cm) - Barème : [5-25%] partie HAUTE<br>`;
                justification += `→ Nécessité OBLIGATOIRE : Talonnette compensatrice ${raccourcissementCm} cm<br>`;
                justification += `→ Conséquences : Boiterie majeure, surcharge lombaire chronique, asymétrie bassin<br>`;
                justification += `→ Impact : Marche prolongée difficile, station debout pénible, troubles statiques</li>`;
            } else if (raccourcissementCm >= 2) {
                justification += `→ <span style="color:orange">MODÉRÉ</span> (2-3.9 cm) - Barème : [5-25%] partie MOYENNE<br>`;
                justification += `→ Recommandation : Talonnette compensatrice ${raccourcissementCm} cm<br>`;
                justification += `→ Conséquences : Boiterie compensée, surcharge lombaire, asymétrie bassin</li>`;
            } else if (raccourcissementCm >= 1) {
                justification += `→ <span style="color:green">LÉGER</span> (1-1.9 cm) - Barème : [5-25%] partie BASSE<br>`;
                justification += `→ Compensation possible sans appareillage majeur</li>`;
            }
        } else if (hasRaccourcissement) {
            justification += `<li><strong>Raccourcissement membre inférieur</strong> (mesure non précisée)<br>`;
            justification += `→ Inégalité de longueur évoquée<br>`;
            justification += `→ ⚠️ MESURE CLINIQUE OBJECTIVE NÉCESSAIRE pour évaluation précise<br>`;
            justification += `→ Conséquence : Boiterie, surcharge lombaire, asymétrie bassin</li>`;
        }
        
        if (hasBoiterie && !hasRaccourcissement) {
            justification += `<li><strong>Boiterie/Claudication présente</strong><br>`;
            justification += `→ Trouble de la marche objectivé<br>`;
            justification += `→ Origine : Douleur, raideur ou instabilité</li>`;
        }
        
        if (hasCalVicieux) {
            justification += `<li><strong>Cal vicieux radiologique</strong><br>`;
            justification += `→ Consolidation en position vicieuse<br>`;
            justification += `→ Conséquence : Déformation, limitation mobilité, arthrose potentielle</li>`;
        }
        
        if (hasInstabilite) {
            justification += `<li><strong>Instabilité articulaire</strong><br>`;
            justification += `→ Lésion ligamentaire séquellaire<br>`;
            justification += `→ Risque : Dérobements, chutes, arthrose précoce</li>`;
        }
        
        justification += "</ul>";
        
        // Synthèse du retentissement
        justification += `<strong>Retentissement fonctionnel global : ${severityText.toUpperCase()}</strong><br><br>`;
        
    } else if (isDefaultSeverity && severityLevel !== 'fixe') {
        justification += `⚠️ <em>Données cliniques incomplètes. En l'absence de précisions quantifiées (ex: "flexion 90°", "EVA 6/10", "limitation 40%"), je fais l'hypothèse d'un retentissement fonctionnel <strong>modéré</strong>.</em><br><br>`;
    } else {
        const sequelaMain = clinicalSigns.length > 0 && clinicalSigns[0] !== "gêne fonctionnelle modérée" 
            ? `<strong>${clinicalSigns.join(' et ')}</strong>`
            : "une gêne fonctionnelle";
        justification += `La lésion a consolidé avec comme séquelle principale ${sequelaMain}. Le retentissement fonctionnel est jugé <strong>${severityText}</strong>.<br><br>`;
    }
    
    // Section 3 : Correspondance barémique DÉTAILLÉE
    justification += "<strong>3️⃣ Correspondance barémique et raisonnement juridique</strong><br>";
    justification += `📖 <strong>Référence barémique</strong><br>`;
    justification += `Rubrique : "<em>${path}</em>"<br>`;
    justification += `Séquelle : "<em>${injury.name}</em>"<br>`;
    justification += `Fourchette légale : <strong>${rateText}</strong><br><br>`;

    // Explication positionnement dans la fourchette
    if (Array.isArray(injury.rate)) {
        const [min, max] = injury.rate;
        const position = ((chosenRate - min) / (max - min) * 100).toFixed(0);
        
        justification += `<strong>Positionnement dans la fourchette :</strong><br>`;
        justification += `<div style="background:#f0f0f0; padding:10px; margin:10px 0; border-left:4px solid #2196F3;">`;
        justification += `Taux minimal ${min}% ————— Taux proposé <strong>${chosenRate}%</strong> (${position}%) ————— Taux maximal ${max}%<br>`;
        justification += `</div>`;
        
        if (isDefaultSeverity) {
            justification += `En l'absence de données cliniques quantifiées, le taux <strong>médian (${Math.round((min+max)/2)}%)</strong> de la fourchette est retenu par principe de précaution.<br><br>`;
        } else {
            const justifPositionnement = severityLevel === 'élevé' 
                ? `Les critères de sévérité identifiés (${clinicalSigns.join(', ')}) justifient un positionnement dans la <strong>partie HAUTE</strong> de la fourchette.`
                : severityLevel === 'moyen'
                ? `Les éléments cliniques objectivés orientent vers la <strong>partie MÉDIANE</strong> de la fourchette.`
                : `Les séquelles objectivées sont d'intensité limitée, justifiant la <strong>partie BASSE</strong> de la fourchette.`;
            
            justification += justifPositionnement + '<br><br>';
        }
    } else {
        justification += `<strong>⚖️ Taux fixe barémique</strong><br>`;
        justification += `Le barème prévoit un taux <strong>fixe de ${injury.rate}%</strong> pour cette séquelle spécifique, sans modulation possible.<br><br>`;
    }

    // Section 4 : IPP retenue
    justification += `<strong>4️⃣ Taux IPP retenu</strong><br>`;
    justification += `<div style="background:#4CAF50; color:white; padding:15px; margin:10px 0; border-radius:5px; text-align:center;">`;
    justification += `<strong style="font-size:20px;">IPP = ${chosenRate}%</strong>`;
    justification += `</div><br>`;

    // Section 5 : Conclusion médico-légale ENRICHIE
    justification += "<strong>5️⃣ Conclusion médico-légale</strong><br>";
    justification += `Il persiste des séquelles consolidées post-traumatiques entraînant un retentissement fonctionnel <strong>${severityText}</strong> et permanent, justifiant l'attribution d'un taux d'IPP de <strong>${chosenRate}%</strong>.<br><br>`;
    
    // Section 6 : Données cliniques manquantes (si incomplètes)
    if (isDefaultSeverity || (!hasFlexion && !hasExtension && !hasEVA)) {
        justification += "<strong>📋 Données cliniques recommandées pour affiner l'évaluation</strong><br>";
        justification += "<em>Pour une évaluation plus précise, il serait souhaitable de disposer de :</em><br>";
        justification += "<ul>";
        justification += "<li>Amplitudes articulaires mesurées (goniomètre)</li>";
        justification += "<li>Cotation douleur (échelle EVA 0-10)</li>";
        justification += "<li>Testing musculaire (force 0-5)</li>";
        justification += "<li>Périmètres membres (amyotrophie)</li>";
        justification += "<li>Imagerie récente (RX, TDM, IRM si nécessaire)</li>";
        justification += "<li>Retentissement professionnel précis</li>";
        justification += "</ul>";
    }

    return justification;
};

/**
 * Performs a keyword-based search with anatomical filtering.
 * Amélioration: intègre le prétraitement du langage naturel
 */
export const findCandidateInjuries = (text: string, externalKeywords?: string[]): Array<{ injury: Injury; score: number; path: string }> => {
    // Prétraitement: transformer verbes d'action en substantifs médicaux
    const preprocessed = preprocessMedicalText(text);
    
    const processedText = preprocessed.replace(/([A-ZCSLT])\s*(\d)/gi, '$1$2');
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

                // --- Arthrose post-traumatique Logic ---
                // Si le contexte mentionne "arthrose" ET que la lésion contient "arthrose" dans son nom,
                // donner un TRÈS gros bonus pour prioriser les lésions d'arthrose sur les fractures simples
                const queryMentionsArthrose = normalizedText.includes('arthrose') || 
                                              normalizedText.includes('arthrosique') ||
                                              normalizedText.includes('arthrosis');
                const injuryIsArthrose = normalizedInjuryName.includes('arthrose');
                
                if (queryMentionsArthrose && injuryIsArthrose) {
                    currentScore += 500; // GROS bonus pour lésions d'arthrose quand arthrose est mentionnée
                } else if (queryMentionsArthrose && !injuryIsArthrose) {
                    // Pénaliser légèrement les lésions sans arthrose si arthrose est mentionnée
                    currentScore *= 0.7;
                }

                // --- Cicatrices esthétiques mineures / superficielles Logic ---
                // Si le contexte mentionne "esthétique", "superficielle", "mineure", "indolore", "sans retentissement"
                // ET que la lésion contient "sans brèche osseuse" ou "indolores" (lésions légères [0-15%]),
                // donner un gros bonus pour prioriser sur "Scalp avec cicatrices douloureuses" [5-20%]
                const queryMentionsSuperficial = normalizedText.includes('esthetique') ||
                                                 normalizedText.includes('superficiel') ||
                                                 normalizedText.includes('mineure') ||
                                                 normalizedText.includes('mineur') ||
                                                 normalizedText.includes('indolore') ||
                                                 normalizedText.includes('sans retentissement') ||
                                                 normalizedText.includes('sans gene') ||
                                                 normalizedText.includes('sans douleur');
                const injuryIsMinorScar = normalizedInjuryName.includes('sans breche osseuse') ||
                                         normalizedInjuryName.includes('indolores') ||
                                         (normalizedInjuryName.includes('lesions du cuir chevelu') && normalizedInjuryName.includes('phenomenes douloureux'));
                const injuryIsPainfulScar = normalizedInjuryName.includes('cicatrices douloureuses') ||
                                           normalizedInjuryName.includes('scalp');
                
                if (queryMentionsSuperficial && injuryIsMinorScar) {
                    currentScore += 600; // TRÈS gros bonus pour lésions mineures/esthétiques quand contexte superficiel
                } else if (queryMentionsSuperficial && injuryIsPainfulScar) {
                    // Pénaliser fortement les lésions douloureuses/scalp si contexte mentionne superficiel/esthétique
                    currentScore *= 0.1;
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
    
    // 🆕 FILTRAGE INTELLIGENT : Exclure rubriques "sans lésion neurologique" si signes neurologiques détectés
    const clinicalContext = analyzeAdvancedClinicalContext(text);
    
    let filteredMatches = allMatches.filter(match => match.score >= MIN_SCORE_THRESHOLD);
    
    // Si signes neurologiques présents (sciatalgie, paresthésie, etc.)
    if (clinicalContext.hasNeurologicalSigns) {
        // Exclure les rubriques mentionnant explicitement "sans lésion neurologique"
        filteredMatches = filteredMatches.filter(match => {
            const injuryNameLower = match.injury.name.toLowerCase();
            const hasExclusionPhrase = 
                injuryNameLower.includes('sans lésion neurologique') ||
                injuryNameLower.includes('sans atteinte neurologique') ||
                injuryNameLower.includes('sans déficit neurologique');
            
            return !hasExclusionPhrase;
        });
        
        // Si après filtrage il reste des résultats, les utiliser
        // Sinon, garder les résultats originaux avec un warning
        if (filteredMatches.length === 0) {
            filteredMatches = allMatches.filter(match => match.score >= MIN_SCORE_THRESHOLD);
        }
    }
    
    // 🆕 FILTRAGE ARTICULATION : Si articulation spécifique mentionnée, pénaliser rubriques avec mauvaise articulation
    const affectedJoint: string | null = 
        text.toLowerCase().includes('hanche') || text.toLowerCase().includes('coxo') ? 'hanche' :
        text.toLowerCase().includes('genou') ? 'genou' :
        text.toLowerCase().includes('cheville') ? 'cheville' :
        text.toLowerCase().includes('epaule') || text.toLowerCase().includes('scapulo') ? 'epaule' :
        text.toLowerCase().includes('coude') ? 'coude' :
        text.toLowerCase().includes('poignet') ? 'poignet' : null;
    
    if (affectedJoint) {
        filteredMatches = filteredMatches.map(match => {
            const injuryNameLower = match.injury.name.toLowerCase();
            let penaltyFactor = 1;
            
            // Si la rubrique mentionne une AUTRE articulation que celle affectée → forte pénalité
            const otherJoints = ['hanche', 'genou', 'cheville', 'epaule', 'coude', 'poignet']
                .filter(j => j !== affectedJoint);
            
            const mentionsWrongJoint = otherJoints.some(joint => injuryNameLower.includes(joint));
            if (mentionsWrongJoint && !injuryNameLower.includes(affectedJoint)) {
                penaltyFactor = 0.1; // Pénalité très forte
            }
            
            return {
                ...match,
                score: match.score * penaltyFactor
            };
        }).filter(match => match.score >= MIN_SCORE_THRESHOLD * 0.5); // Recalculer seuil
    }
    
    return filteredMatches
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
    
    // 🆕 DÉTECTION CONSOLIDATION : Si fracture consolidée/opérée + séquelles → Prioriser rubriques séquelles
    const consolidationKeywords = ['operee', 'opere', 'consolidee', 'consolide', 'sequelles', 'ancien', 'ancienne', 'antecedent'];
    const hasConsolidationContext = consolidationKeywords.some(kw => normalizedInputText.includes(kw));
    const sequelaKeywordsForCheck = ['raideur', 'ankylose', 'limitation', 'arthrose', 'cal vicieux', 'pseudarthrose', 'douleur', 'instabilite', 'laxite'];
    const hasSequelaKeywords = sequelaKeywordsForCheck.some(kw => normalizedInputText.includes(kw));
    
    // 🆕 DÉTECTION ARTICULATION AFFECTÉE (pour filtrage précis)
    const affectedJoint: string | null = 
        normalizedInputText.includes('hanche') || normalizedInputText.includes('coxofemorale') ? 'hanche' :
        normalizedInputText.includes('genou') ? 'genou' :
        normalizedInputText.includes('cheville') ? 'cheville' :
        normalizedInputText.includes('epaule') ? 'epaule' :
        normalizedInputText.includes('coude') ? 'coude' :
        normalizedInputText.includes('poignet') ? 'poignet' : null;
    
    // Si fracture consolidée + séquelles fonctionnelles → IGNORER le module d'ambiguïté fracture
    const shouldSkipFractureAmbiguity = hasConsolidationContext && hasSequelaKeywords;
    
    if (isFractureQuery && queryBones.size === 1 && !shouldSkipFractureAmbiguity) {
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
                // 🆕 Filtrer les propositions contradictoires selon description
                let filteredFractures = uniqueFractures;
                
                // Si "cal vicieux" mentionné → exclure "consolidation parfaite"
                if (/cal\s+vicieux/i.test(normalizedInputText)) {
                    filteredFractures = uniqueFractures.filter(f => 
                        !/(consolidation\s+parfaite|bonne\s+consolidation|sans\s+trouble)/i.test(normalize(f.name))
                    );
                }
                
                // Si "consolidation parfaite" mentionnée → exclure "cal vicieux"
                if (/(?:consolidation|bonne)\s+(?:parfaite|anatomique)|sans\s+trouble/i.test(normalizedInputText)) {
                    filteredFractures = uniqueFractures.filter(f => 
                        !/cal\s+vicieux|limitation|raideur|deformation/i.test(normalize(f.name))
                    );
                }
                
                // Si "limitation légère/modérée" → exclure sévères et parfaites
                if (/(?:limitation|gene)\s+(?:legere|moderee|moyenne)|sans\s+perte\s+majeure/i.test(normalizedInputText)) {
                    filteredFractures = uniqueFractures.filter(f => {
                        const fname = normalize(f.name);
                        return !/(consolidation\s+parfaite|severe|importante|troubles\s+nerveux)/i.test(fname);
                    });
                }

                if (filteredFractures.length > 1) {
                    return {
                        type: 'ambiguity',
                        text: `Votre description "${text.trim()}" est générale. Une fracture de l'os "${bone}" peut correspondre à plusieurs localisations (ex: diaphyse, extrémité articulaire). Laquelle correspond le mieux à l'état du patient ?`,
                        choices: filteredFractures
                    };
                } else if (filteredFractures.length === 1) {
                    // Une seule option après filtrage → proposition directe
                    const injury = filteredFractures[0];
                    const path = allInjuriesWithPaths.find(inj => inj.name === injury.name)?.path || "Membres Supérieurs > Avant-bras";
                    
                    const { duration, painIntensity, functionalLimitation, scores, shortening, cleanedText: textWithoutTemporal } = 
                        extractTemporalityAndIntensity(text);
                    const severityInfo = determineSeverity(text, painIntensity, functionalLimitation, shortening);
                    
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
                    }
                }
                
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
    
    // 🆕 Vérification consolidation (v2.6) - PRIORITAIRE
    const consolidationCheck = checkConsolidationDelay(text, injury.name);
    if (!consolidationCheck.isConsolidated && consolidationCheck.warning) {
        return {
            type: 'no_result',
            text: consolidationCheck.warning
        };
    }
    
    // 🆕 Extraction type de demande : attribution vs révision (v2.5)
    const { requestType, revisionReason, previousRate, cleanedText: textWithoutRequest } = 
        detectRequestType(text);
    
    // 🆕 Extraction temporalité et intensité (v2.3) + Raccourcissement (v2.7)
    const { duration, painIntensity, functionalLimitation, scores, shortening, cleanedText: textWithoutTemporal } = 
        extractTemporalityAndIntensity(textWithoutRequest);
    
    // 🆕 Extraction amplitudes articulaires et contraintes (v2.4)
    const { rom, occupationalConstraints, familiarExpressions, cleanedText: textWithoutArticular } = 
        extractArticularAndOccupational(textWithoutTemporal);
    
    // Détermination sévérité avec critères quantitatifs prioritaires (v2.7: ajout shortening)
    const severityInfo = determineSeverity(textWithoutArticular, painIntensity, functionalLimitation, shortening);
    
    if (Array.isArray(injury.rate)) {
        const [min, max] = injury.rate;
        let chosenRate: number;
        switch (severityInfo.level) {
            case 'faible': chosenRate = min; break;
            case 'élevé': chosenRate = max; break;
            case 'moyen': default: chosenRate = Math.round((min + max) / 2); break;
        }
        
        // Enrichissement justification avec données temporelles et contexte demande
        let justification = buildExpertJustification(text, injury, chosenRate, path, severityInfo.level, severityInfo.signs, severityInfo.isDefault);
        
        // 🆕 Section contexte médico-légal (v2.5)
        if (requestType === 'revision') {
            justification += "<br><strong>📋 Contexte médico-légal</strong><br>";
            justification += `• Type de demande : <strong>Révision</strong><br>`;
            if (revisionReason) {
                const reasonLabels = {
                    'aggravation': 'Aggravation de l\'état séquellaire',
                    'rechute': 'Rechute / Reprise évolutive',
                    'amelioration': 'Amélioration clinique',
                    'reevaluation': 'Réévaluation'
                };
                justification += `• Motif : ${reasonLabels[revisionReason]}<br>`;
            }
            if (previousRate !== undefined) {
                justification += `• IPP antérieur : ${previousRate}%<br>`;
                const difference = chosenRate - previousRate;
                if (difference > 0) {
                    justification += `• Variation proposée : <strong>+${difference}%</strong> (passage de ${previousRate}% à ${chosenRate}%)<br>`;
                } else if (difference < 0) {
                    justification += `• Variation proposée : <strong>${difference}%</strong> (passage de ${previousRate}% à ${chosenRate}%)<br>`;
                } else {
                    justification += `• Taux stable : <strong>${chosenRate}%</strong> maintenu<br>`;
                }
            }
        } else {
            justification += "<br><strong>📋 Contexte médico-légal</strong><br>";
            justification += `• Type de demande : <strong>Attribution initiale</strong><br>`;
            justification += `• Première évaluation IPP post-consolidation<br>`;
        }
        
        // Section données cliniques complémentaires (v2.3)
        if (duration || painIntensity !== undefined || functionalLimitation || scores) {
            justification += "<br><strong>⏱️ Données cliniques complémentaires</strong><br>";
            if (duration) justification += `• Durée d'évolution : ${duration}<br>`;
            if (painIntensity !== undefined) justification += `• Intensité douloureuse : EVA ${painIntensity}/10<br>`;
            if (functionalLimitation) justification += `• Limitation fonctionnelle : ${functionalLimitation}<br>`;
            if (scores && scores.length > 0) justification += `• Scores fonctionnels : ${scores.join(', ')}<br>`;
        }
        
        // Section amplitudes et contexte professionnel (v2.4)
        if (rom || occupationalConstraints || familiarExpressions) {
            justification += "<br><strong>📐 Bilan fonctionnel détaillé</strong><br>";
            if (rom && rom.length > 0) {
                justification += "• Amplitudes articulaires (ROM) :<br>";
                rom.forEach(r => {
                    justification += `  - ${r.joint}: ${r.movement} ${r.value}°<br>`;
                });
            }
            if (occupationalConstraints && occupationalConstraints.length > 0) {
                justification += `• Contraintes professionnelles : ${occupationalConstraints.join(', ')}<br>`;
            }
            if (familiarExpressions && familiarExpressions.length > 0) {
                justification += `• Plaintes exprimées : ${familiarExpressions.slice(0, 3).join(', ')}<br>`;
            }
        }
        
        return { type: 'proposal', name: injury.name, rate: chosenRate, justification, path, injury };
    } else {
        let justification = buildExpertJustification(text, injury, injury.rate as number, path, 'fixe', severityInfo.signs.length > 0 ? severityInfo.signs : [], false);
        
        // 🆕 Section contexte médico-légal pour taux fixe (v2.5)
        if (requestType === 'revision') {
            justification += "<br><strong>📋 Contexte médico-légal</strong><br>";
            justification += `• Type de demande : <strong>Révision</strong><br>`;
            if (revisionReason) {
                const reasonLabels = {
                    'aggravation': 'Aggravation de l\'état séquellaire',
                    'rechute': 'Rechute / Reprise évolutive',
                    'amelioration': 'Amélioration clinique',
                    'reevaluation': 'Réévaluation'
                };
                justification += `• Motif : ${reasonLabels[revisionReason]}<br>`;
            }
            if (previousRate !== undefined) {
                justification += `• IPP antérieur : ${previousRate}%<br>`;
                const difference = (injury.rate as number) - previousRate;
                if (difference > 0) {
                    justification += `• Variation proposée : <strong>+${difference}%</strong> (passage de ${previousRate}% à ${injury.rate}%)<br>`;
                } else if (difference < 0) {
                    justification += `• Variation proposée : <strong>${difference}%</strong> (passage de ${previousRate}% à ${injury.rate}%)<br>`;
                } else {
                    justification += `• Taux stable : <strong>${injury.rate}%</strong> maintenu<br>`;
                }
            }
            justification += `• <em>Note : Ce taux est fixe selon le barème de référence</em><br>`;
        } else {
            justification += "<br><strong>📋 Contexte médico-légal</strong><br>";
            justification += `• Type de demande : <strong>Attribution initiale</strong><br>`;
            justification += `• Première évaluation IPP post-consolidation<br>`;
            justification += `• <em>Note : Ce taux est fixe selon le barème de référence</em><br>`;
        }
        
        // Ajout données temporelles même pour taux fixe (v2.3)
        if (duration || painIntensity !== undefined || functionalLimitation || scores) {
            justification += "<br><strong>⏱️ Données cliniques complémentaires</strong><br>";
            if (duration) justification += `• Durée d'évolution : ${duration}<br>`;
            if (painIntensity !== undefined) justification += `• Intensité douloureuse : EVA ${painIntensity}/10<br>`;
            if (functionalLimitation) justification += `• Limitation fonctionnelle : ${functionalLimitation}<br>`;
            if (scores && scores.length > 0) justification += `• Scores fonctionnels : ${scores.join(', ')}<br>`;
        }
        
        // Ajout données articulaires et professionnelles (v2.4)
        if (rom || occupationalConstraints || familiarExpressions) {
            justification += "<br><strong>📐 Bilan fonctionnel détaillé</strong><br>";
            if (rom && rom.length > 0) {
                justification += "• Amplitudes articulaires (ROM) :<br>";
                rom.forEach(r => {
                    justification += `  - ${r.joint}: ${r.movement} ${r.value}°<br>`;
                });
            }
            if (occupationalConstraints && occupationalConstraints.length > 0) {
                justification += `• Contraintes professionnelles : ${occupationalConstraints.join(', ')}<br>`;
            }
            if (familiarExpressions && familiarExpressions.length > 0) {
                justification += `• Plaintes exprimées : ${familiarExpressions.slice(0, 3).join(', ')}<br>`;
            }
        }
        
        return { type: 'proposal', name: injury.name, rate: injury.rate as number, justification, path, injury };
    }
};

/**
 * Détecte et extrait les informations de contexte patient (profession, âge, genre)
 * Amélioration: détection plus robuste avec contexte médico-légal
 */
const extractPatientContext = (text: string): { profession?: string; age?: string; gender?: string; cleanedText: string } => {
    const normalized = normalize(text);
    let profession: string | undefined;
    let age: string | undefined;
    let gender: string | undefined;
    let cleanedText = text;

    // Détection profession - patterns enrichis pour langage naturel
    const professionPatterns = [
        // Formulations explicites
        /\b(?:profession\s*:?\s*|de profession\s+|métier\s*:?\s*|emploi\s*:?\s*)([a-zéèêàâôîû\s]+?)(?:\s*[;,.]|\s*qui\s|\s*présente|\s*avec|\s*suite|\s*$)/i,
        /\b(?:travaille?\s+comme\s+|exerce\s+(?:le\s+métier\s+de|en\s+tant\s+que)\s+|occupe\s+un\s+poste\s+de\s+)([a-zéèêàâôîû\s]+?)(?:\s*[;,.]|\s*qui\s|\s*présente|\s*avec|\s*$)/i,
        /\b(?:est\s+|était\s+)([a-zéèêàâôîû\s]+?)(?:\s+de profession|\s*[;,.]|\s*qui\s|\s*présente|\s*avec|\s*$)/i,
        
        // Formulations contexte AT
        /\b(?:lors\s+de\s+son\s+travail\s+comme\s+|pendant\s+son\s+activité\s+de\s+|au\s+cours\s+de\s+son\s+métier\s+de\s+)([a-zéèêàâôîû\s]+?)(?:\s*[;,.]|\s*qui\s|\s*$)/i,
        /\b(?:dans\s+le\s+cadre\s+de\s+son\s+activité\s+professionnelle\s+de\s+|en\s+sa\s+qualité\s+de\s+)([a-zéèêàâôîû\s]+?)(?:\s*[;,.]|\s*qui\s|\s*$)/i,
        
        // Professions courantes (liste complète)
        /\b(femme de (?:ménage|chambre|service)|homme de ménage|agent(?:e)?\s+d'entretien|personnel\s+d'entretien|ouvrier(?:e)?(?:\s+agricole|\s+du\s+bâtiment|\s+spécialisé)?|agriculteur(?:rice)?|exploitant(?:e)?\s+agricole|maçon|charpentier|menuisier|ébéniste|carreleur|couvreur|plâtrier|peintre(?:\s+en\s+bâtiment)?|mécanicien(?:ne)?|garagiste|électricien(?:ne)?|électrotechnicien|plombier|chauffagiste|soudeur(?:euse)?|serrurier|ferrailleur|chauffeur(?:\s+routier|\s+de\s+taxi|\s+poids\s+lourd|\s+livreur)?|conducteur(?:rice)?(?:\s+routier|\s+de\s+bus)?|livreur(?:euse)?|facteur(?:rice)?|infirmier(?:e)?|aide[- ]soignant(?:e)?|auxiliaire\s+de\s+vie|aide\s+à\s+domicile|ambulancier(?:e)?|brancardier|kinésithérapeute|kiné|ergothérapeute|enseignant(?:e)?|professeur|instituteur(?:rice)?|éducateur(?:rice)?|médecin|chirurgien(?:ne)?|dentiste|pharmacien(?:ne)?|ingénieur|technicien(?:ne)?(?:\s+supérieur)?|opérateur(?:rice)?(?:\s+machine|\s+production)?|comptable|expert[- ]comptable|secrétaire|assistant(?:e)?(?:\s+administratif(?:ive)?|\s+de\s+direction)?|agent(?:e)?\s+administratif|réceptionniste|standardiste|archiviste|bibliothécaire|documentaliste|contremaître|chef(?:fe)?\s+d'équipe|chef(?:fe)?\s+de\s+chantier|responsable|directeur(?:rice)?|cadre|manager|employé(?:e)?\s+de\s+(?:bureau|commerce|banque)|vendeur(?:euse)?|commercial(?:e)?|représentant(?:e)?|VRP|caissier(?:e)?|hôte(?:sse)?\s+de\s+caisse|magasinier(?:e)?|préparateur(?:rice)?\s+de\s+commandes|manutentionnaire|cariste|logisticien(?:ne)?|gardien(?:ne)?|concierge|agent(?:e)?\s+de\s+sécurité|vigile|policier(?:e)?|gendarme|pompier|militaire|marin|cuisinier(?:e)?|chef(?:fe)?\s+cuisinier|commis\s+de\s+cuisine|pâtissier(?:e)?|boulanger(?:e)?|boucher(?:e)?|charcutier(?:e)?|poissonnier(?:e)?|traiteur|restaurateur(?:rice)?|serveur(?:euse)?|barman|barmaid|coiffeur(?:euse)?|esthéticien(?:ne)?|manucure|masseur(?:euse)?|kinésithérapeute|ostéopathe|pédicure[- ]podologue|prothésiste|opticien(?:ne)?|laborantin(?:e)?|technicien(?:ne)?\s+de\s+laboratoire|radiologue|radiomanipulateur(?:rice)?|sage[- ]femme|puériculteur(?:rice)?|auxiliaire\s+puériculture|nourrice|assistante?\s+maternel(?:le)?|baby[- ]sitter|garde\s+d'enfants|animateur(?:rice)?|moniteur(?:rice)?|coach\s+sportif|éducateur(?:rice)?\s+sportif|jardinier(?:e)?|paysagiste|horticulteur(?:rice)?|fleuriste|agent(?:e)?\s+d'entretien\s+espaces\s+verts|garde\s+forestier|bucheron|sylviculteur|marin[- ]pêcheur|pêcheur|aquaculteur|éleveur(?:euse)?|berger(?:e)?|vétérinaire|assistant(?:e)?\s+vétérinaire|toiletteur(?:euse)?|palefrenier(?:e)?|maréchal[- ]ferrant|artisan|commerçant(?:e)?|chef(?:fe)?\s+d'entreprise|entrepreneur(?:euse)?|auto[- ]entrepreneur|travailleur(?:euse)?\s+indépendant(?:e)?|freelance|consultant(?:e)?|formateur(?:rice)?|coach|conseiller(?:e)?|juriste|avocat(?:e)?|notaire|huissier|greffier(?:e)?|clerc|assistant(?:e)?\s+juridique|journaliste|rédacteur(?:rice)?|photographe|graphiste|designer|architecte|dessinateur(?:rice)?|géomètre|topographe|informaticien(?:ne)?|développeur(?:euse)?|programmeur(?:euse)?|analyste|webmaster|administrateur(?:rice)?\s+(?:réseau|système)|technicien(?:ne)?\s+(?:informatique|réseau|support)|hotliner|dépanneur|réparateur(?:rice)?|SAV|service\s+après[- ]vente|installateur(?:rice)?|monteur(?:euse)?|assembleur(?:euse)?|agent(?:e)?\s+de\s+fabrication|ouvrier(?:e)?\s+de\s+production|conducteur(?:rice)?\s+de\s+ligne|opérateur(?:rice)?\s+sur\s+machine|usineur(?:euse)?|tourneur(?:euse)?|fraiseur(?:euse)?|ajusteur(?:euse)?|mécanicien(?:ne)?\s+(?:outilleur|monteur|régleur)|chaudronnier(?:e)?|tuyauteur|calorifugeur|frigoriste|climaticien|ascensoriste|technicien(?:ne)?\s+(?:ascenseur|maintenance)|agent(?:e)?\s+de\s+maintenance|dépanneur(?:euse)?|réparateur(?:rice)?)\b/i
    ];
    
    for (const pattern of professionPatterns) {
        const match = text.match(pattern);
        if (match) {
            profession = (match[1] || match[0]).trim();
            cleanedText = cleanedText.replace(match[0], '').trim();
            break;
        }
    }

    // Détection âge - patterns enrichis
    const agePatterns = [
        /\b(?:âge|age|agé|agée)\s*(?:de\s*)?(\d{1,3})\s*ans?\b/i,
        /\b(\d{1,3})\s*ans?\b/i,
        /\bpatient(?:e)?\s+de\s+(\d{1,3})\s*ans?\b/i
    ];
    
    for (const pattern of agePatterns) {
        const ageMatch = text.match(pattern);
        if (ageMatch) {
            const ageValue = parseInt(ageMatch[1]);
            if (ageValue >= 15 && ageValue <= 120) { // Validation âge réaliste
                age = ageMatch[1];
                cleanedText = cleanedText.replace(ageMatch[0], '').trim();
                break;
            }
        }
    }

    // Détection genre - patterns enrichis
    const genderPatterns = [
        { pattern: /\b(?:femme|patiente|madame|mme|elle|sa profession)\b/i, gender: 'femme' },
        { pattern: /\b(?:homme|patient|monsieur|mr|m\.|il|son métier)\b/i, gender: 'homme' }
    ];
    
    for (const { pattern, gender: g } of genderPatterns) {
        if (pattern.test(text)) {
            gender = g;
            break;
        }
    }

    // Nettoyage final - amélioration pour préserver le sens médical
    cleanedText = cleanedText
        .replace(/\s*[;,]\s+qui\s+/gi, ' avec ')  // "...; qui présente" → "... avec"
        .replace(/\s*[;,]\s*/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    return { profession, age, gender, cleanedText };
};

/**
 * Détecte et extrait les états antérieurs du texte
 */
const extractPreexistingConditions = (text: string): { preexisting: string[]; cleanedText: string } => {
    const preexisting: string[] = [];
    let cleanedText = text;
    const normalized = normalize(text);

    // 🆕 Détection mots-clés SÉQUELLES (post-traumatiques) - À EXCLURE des antécédents
    const sequelaKeywords = [
        'persistante', 'persistant', 'residuelle', 'residuel', 'sequellaire',
        'post-traumatique', 'post traumatique', 'consecutive', 'secondaire',
        'suite', 'apres', 'depuis', 'residue', 'demeure'
    ];

    // 🆕 Détection lésions primaires (fracture, luxation, etc.) dans le texte
    const primaryLesionPresent = /\b(fracture|luxation|rupture|entorse|lesion|traumatisme|trauma|plaie|section|amputation|ecrasement|contusion|brulure)/i.test(normalized);

    // Patterns enrichis pour détecter antécédents médicaux
    const preexistingPatterns = [
        // Formulations explicites
        /\b(?:état\s+antérieur|antécédent(?:s)?|état\s+ancien|ancien(?:ne)?\s+(?:lésion|pathologie|affection)|préexistant(?:e)?|pré-existant(?:e)?|existant\s+avant|en\s+dehors\s+de)\s*:?\s*([^;.]+?)(?:[;.]|qui\s+présente|avec|$)/gi,
        
        // Indemnisation antérieure
        /\b(?:déjà\s+indemnisé(?:e)?|indemnisation\s+antérieure|taux\s+antérieur|IPP\s+antérieur(?:e)?)\s*(?:à|de|:)?\s*(\d+\s*%?)/gi,
        
        // Pathologies chroniques SEULEMENT si contexte "ancien" ou "depuis X ans"
        /\b(hernie\s+discale|discopathie|arthrose|lombalgie|lombosciatalgie|cervicalgie|cervicarthrose|coxalgie|coxarthrose|tendinite|épicondylite|canal\s+carpien)(?:\s+(?:ancienne?|chronique\s+depuis|préexistante?|connue?\s+depuis|suivie?\s+depuis|traitée?\s+depuis))(?:\s+\d+\s+(?:ans?|années?))?/gi,
        
        // Formulations "avant l'accident"
        /\bavant\s+(?:l'|l')?(?:accident|le\s+trauma|les?\s+faits?)\s*:?\s*([^;.]+?)(?:[;.]|$)/gi,
        
        // Formulations "en dehors de"
        /\ben\s+dehors\s+(?:de\s+l'|de\s+l'|du)\s*(?:accident|travail|trauma)\s*[,:.]?\s*([^;.]+?)(?:[;.]|qui|avec|$)/gi
    ];

    for (const pattern of preexistingPatterns) {
        let match;
        while ((match = pattern.exec(text)) !== null) {
            const condition = (match[1] || match[0]).trim();
            const conditionNormalized = normalize(condition);
            
            // 🆕 Vérifier si c'est une SÉQUELLE et non un antécédent
            const isSequela = sequelaKeywords.some(kw => conditionNormalized.includes(kw));
            
            // 🆕 Si lésion primaire présente ET symptôme proche, c'est probablement une séquelle
            const isLikelySequela = primaryLesionPresent && (
                conditionNormalized.includes('douleur') ||
                conditionNormalized.includes('raideur') ||
                conditionNormalized.includes('limitation') ||
                conditionNormalized.includes('gene') ||
                conditionNormalized.includes('gonalgie') ||
                conditionNormalized.includes('coxalgie') ||
                conditionNormalized.includes('lombalgie') ||
                conditionNormalized.includes('cervicalgie') ||
                conditionNormalized.includes('instabilite') ||
                conditionNormalized.includes('laxite') ||
                conditionNormalized.includes('boiterie')
            );
            
            // Ajouter UNIQUEMENT si ce n'est PAS une séquelle
            if (condition.length > 5 && !isSequela && !isLikelySequela) {
                preexisting.push(condition);
                cleanedText = cleanedText.replace(match[0], '').trim();
            }
        }
    }

    // Nettoyage final
    cleanedText = cleanedText
        .replace(/\s*[;,]\s*/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    return { preexisting, cleanedText };
};

/**
 * Détecte si la description contient une lésion primaire ET ses séquelles fonctionnelles
 * Pour éviter la double comptabilisation (ex: "fracture + raideur" = 1 seule lésion)
 * Amélioration v2.6: évite les doubles évaluations
 */
const detectPrimaryLesionWithSequelae = (text: string): {
    hasPrimaryLesion: boolean;
    hasSequelae: boolean;
    shouldTreatAsOne: boolean;
    cleanedDescription: string;
} => {
    const normalized = normalize(text);
    
    // Lésions primaires (anatomiques/traumatiques)
    const primaryLesionKeywords = [
        'fracture', 'luxation', 'rupture', 'lesion', 'brulure', 'mutilation', 
        'contusion', 'plaie', 'section', 'amputation', 'ecrasement', 'entorse'
    ];
    
    // Séquelles fonctionnelles (conséquences)
    const sequelaeFunctionalKeywords = [
        'raideur', 'ankylose', 'limitation', 'gene', 'douleur', 'douloureuse', 
        'instabilite', 'laxite', 'boiterie', 'claudication', 'amyotrophie',
        'gonflement', 'tumefaction', 'deformation', 'cal vicieux', 'pseudarthrose',
        'flexum', 'deficit', 'perte', 'diminution', 'faiblesse'
    ];
    
    const hasPrimaryLesion = primaryLesionKeywords.some(kw => normalized.includes(kw));
    const hasSequelae = sequelaeFunctionalKeywords.some(kw => normalized.includes(kw));
    
    // Si lésion primaire ET séquelle fonctionnelle dans même phrase/description
    // → Traiter comme UNE SEULE lésion (ex: "fracture avec raideur")
    const shouldTreatAsOne = hasPrimaryLesion && hasSequelae;
    
    // Nettoyer la description pour l'analyse (garder uniquement lésion primaire si double)
    let cleanedDescription = text;
    if (shouldTreatAsOne) {
        // Patterns de séquelles à supprimer quand précédées d'une lésion primaire
        const sequelaeToRemove = [
            /[,;]\s*avec\s+(?:raideur|ankylose|limitation|gêne|douleurs?|instabilité)/gi,
            /[,;]\s*et\s+(?:des\s+)?(?:raideur|ankylose|limitation|gêne|douleurs?|instabilité)/gi,
            /[,;]\s*(?:raideur|ankylose|limitation|gêne|douleurs?|instabilité)\s+du\s+\w+/gi,
            /[,;]\s*(?:des\s+)?(?:séquelles\s+)?(?:douloureuses?|fonctionnelles?)/gi
        ];
        
        for (const pattern of sequelaeToRemove) {
            cleanedDescription = cleanedDescription.replace(pattern, '');
        }
    }
    
    return {
        hasPrimaryLesion,
        hasSequelae,
        shouldTreatAsOne,
        cleanedDescription: cleanedDescription.trim()
    };
};

/**
 * Analyse intelligente du langage naturel avec gestion du contexte médico-légal
 */
export const localExpertAnalysis = (text: string, externalKeywords?: string[]): LocalAnalysisResult => {
    // Étape 0: Détection lésion primaire + séquelles fonctionnelles
    const lesionAnalysis = detectPrimaryLesionWithSequelae(text);
    
    // Si double comptabilisation détectée, utiliser description nettoyée
    const textToAnalyze = lesionAnalysis.shouldTreatAsOne 
        ? lesionAnalysis.cleanedDescription 
        : text;
    
    // Étape 1: Extraction du contexte patient
    const { profession, age, gender, cleanedText: textWithoutContext } = extractPatientContext(textToAnalyze);
    
    // Étape 2: Extraction des états antérieurs
    const { preexisting, cleanedText: finalCleanedText } = extractPreexistingConditions(textWithoutContext);

    // Si on a détecté une profession mais pas de lésion claire, informer l'utilisateur
    if (profession && finalCleanedText.length < 10) {
        return {
            type: 'no_result',
            text: `J'ai bien noté le contexte patient : ${profession ? `profession ${profession}` : ''}${age ? `, ${age} ans` : ''}${gender ? ` (${gender})` : ''}${preexisting.length > 0 ? `.<br><br>⚠️ <strong>Antécédents médicaux détectés</strong> (états AVANT l'accident du travail) : ${preexisting.join(', ')}. Ces antécédents ne seront PAS évalués comme lésions post-traumatiques` : ''}.<br><br>Veuillez maintenant décrire les <strong>séquelles post-traumatiques consolidées liées à l'accident du travail</strong> à évaluer (ex: "fracture consolidée du fémur avec boiterie", "tassement vertébral L3 avec lombalgie chronique").`
        };
    }

    // Étape 3: Informer sur les états antérieurs détectés si présents
    let contextInfo = '';
    if (preexisting.length > 0) {
        contextInfo = `<br><br><em>⚠️ <strong>État antérieur identifié</strong> (antécédents médicaux AVANT l'accident du travail) : ${preexisting.join(', ')}.<br>Ces antécédents ne sont PAS à évaluer comme nouvelles lésions. Ils seront pris en compte dans le calcul final selon l'Article 12 (méthode de la capacité restante) si un taux antérieur existe.</em>`;
    }

    // Étape 4: Analyse de la lésion principale
    const processedText = finalCleanedText.replace(/([A-ZCSLT])\s*(\d)/gi, '$1$2');
    const result = comprehensiveSingleLesionAnalysis(processedText, externalKeywords);

    // Étape 5: Enrichir la justification avec le contexte
    if (result.type === 'proposal' && (profession || preexisting.length > 0 || age)) {
        let enrichedJustification = result.justification;
        
        // Ajouter contexte socio-professionnel
        if (profession || age || gender) {
            const contextHeader = '<strong>📋 Contexte patient</strong><br>';
            let contextDetails = '';
            if (gender) contextDetails += `Patient${gender === 'femme' ? 'e' : ''}, `;
            if (age) contextDetails += `âgé${gender === 'femme' ? 'e' : ''} de ${age} ans, `;
            if (profession) contextDetails += `profession : ${profession}`;
            enrichedJustification = contextHeader + contextDetails.trim() + '.<br><br>' + enrichedJustification;
        }

        // Ajouter note sur état antérieur
        if (contextInfo) {
            enrichedJustification += contextInfo;
        }

        return { ...result, justification: enrichedJustification };
    }

    // Si état antérieur détecté mais pas de lésion actuelle
    if (result.type === 'no_result' && preexisting.length > 0) {
        return {
            type: 'no_result',
            text: `J'ai identifié un <strong>antécédent médical</strong> (état AVANT l'accident du travail) : <strong>${preexisting.join(', ')}</strong>.<br><br>⚠️ Les antécédents ne sont PAS des lésions à évaluer dans ce calcul. Veuillez maintenant décrire la <strong>nouvelle séquelle post-traumatique liée à l'accident du travail</strong> à évaluer (ex: "fracture du poignet droit", "entorse grave du genou avec instabilité").`
        };
    }

    return result;
};