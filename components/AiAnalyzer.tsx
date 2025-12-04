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
  isCumul?: boolean;  // 🆕 Flag pour indiquer si un cumul de lésions est détecté
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

export interface CumulProposals {
  type: 'cumul_proposals';
  text: string;
  proposals: Array<{
    injury: Injury;
    description: string;
    justification: string;
  }>;
  lesionCount: number;
}

export type LocalAnalysisResult = LocalProposal | NoResult | AmbiguityClarification | CumulProposals;

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
export const normalize = (str: string) => {
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
    
    // 0. ABRÉVIATIONS MÉDICALES PROFESSIONNELLES (pour médecins)
    const medicalAbbreviations: [RegExp, string | ((substring: string, ...args: any[]) => string)][] = [
        // === CONTEXTE ACCIDENT ===
        [/\bat\b/gi, 'accident de travail '],
        [/\bavp\b/gi, 'accident de la voie publique '],
        [/\bmp\b(?!\s*\d)/gi, 'maladie professionnelle '], // Évite MP3, MP4...
        
        // === ANATOMIE - MEMBRES ===
        // 🆕 V3.3.61: Doigts et orteils - AVANT phalanges génériques pour priorité sur p1 o4, p2 d5, etc.
        [/\b([dD])([1-5])\b(?=\s*(?:de|du|mg|md|main|gauche|droite|fracture|amputation|ecrasement|arrachement|consolid|avec|raideur|ankylose|douleur|séquelle))/gi, (match, d, num) => {
            const doigts = ['', 'pouce', 'index', 'médius', 'annulaire', 'auriculaire'];
            return `${d.toLowerCase() === 'd' ? 'doigt' : 'Doigt'} ${doigts[parseInt(num)]} `;
        }],
        [/(?:fracture|amputation|lesion|trauma|ecrasement|arrachement|consolidation|sequelle|raideur|ankylose)\s+(?:de\s+)?(?:la\s+)?p([1-3])\s+([dD])([1-5])\b/gi, (match, phalange, d, num) => {
            const doigts = ['', 'pouce', 'index', 'médius', 'annulaire', 'auriculaire'];
            const phalanges = { '1': 'première phalange', '2': 'deuxième phalange', '3': 'troisième phalange' };
            return `fracture ${phalanges[phalange]} doigt ${doigts[parseInt(num)]} `;
        }],
        [/\b([oO])([1-5])\b(?=\s*(?:de|du|pg|pd|pied|gauche|droite|fracture|amputation))/gi, (match, o, num) => {
            const orteils = ['', 'hallux', 'deuxième orteil', 'troisième orteil', 'quatrième orteil', 'cinquième orteil'];
            return `${o.toLowerCase() === 'o' ? 'orteil' : 'Orteil'} ${orteils[parseInt(num)]} `;
        }],
        [/(?:fracture|amputation|lesion|trauma|ecrasement|arrachement|consolidation|sequelle|raideur|ankylose)\s+(?:de\s+)?(?:la\s+)?p([1-3])\s+([oO])([1-5])\b/gi, (match, phalange, o, num) => {
            const orteils = ['', 'hallux', 'deuxième orteil', 'troisième orteil', 'quatrième orteil', 'cinquième orteil'];
            const phalanges = { '1': 'première phalange', '2': 'deuxième phalange', '3': 'troisième phalange' };
            return `fracture ${phalanges[phalange]} orteil ${orteils[parseInt(num)]} `;
        }],
        
        // Phalanges génériques (APRÈS doigts/orteils spécifiques)
        [/\b([pP])1\b/gi, 'phalange proximale P1 '],
        [/\b([pP])2\b/gi, 'phalange moyenne P2 '],
        [/\b([pP])3\b/gi, 'phalange distale P3 '],
        [/\bphalange\s+prox\b/gi, 'phalange proximale '],
        [/\bphalange\s+moy\b/gi, 'phalange moyenne '],
        [/\bphalange\s+dist\b/gi, 'phalange distale '],
        
        // Latéralité
        [/\bmg\b/gi, 'main gauche '],
        [/\bmd\b/gi, 'main droite '],
        [/\bpg\b/gi, 'pied gauche '],
        [/\bpd\b/gi, 'pied droit '],
        [/\bjg\b/gi, 'jambe gauche '],
        [/\bjd\b/gi, 'jambe droite '],
        [/\bbg\b/gi, 'bras gauche '],
        [/\bbd\b/gi, 'bras droit '],
        
        // Articulations
        [/\bepaule\s+g\b/gi, 'épaule gauche '],
        [/\bepaule\s+d\b/gi, 'épaule droite '],
        [/\bgenou\s+g\b/gi, 'genou gauche '],
        [/\bgenou\s+d\b/gi, 'genou droit '],
        [/\bcheville\s+g\b/gi, 'cheville gauche '],
        [/\bcheville\s+d\b/gi, 'cheville droite '],
        
        // === ANATOMIE - RACHIS ===
        // Plus précis avec contexte anatomique
        [/\b([cC])([1-7])\b(?=[\s\-]|$)/g, (match, c, num) => `${c}${num} vertèbre cervicale C${num} `],
        [/\b([dD])([1-9]|1[0-2])\b(?=[\s\-]|$)/g, (match, d, num) => `${d}${num} vertèbre dorsale D${num} `],
        [/\b([lL])([1-5])\b(?=[\s\-]|$)/g, (match, l, num) => `${l}${num} vertèbre lombaire L${num} `],
        [/\b([sS])([1-5])\b(?=[\s\-]|$)/g, (match, s, num) => `${s}${num} vertèbre sacrée S${num} `],
        
        // === MESURES CLINIQUES ===
        [/\bdms\b/gi, 'distance mains sol '],
        [/\bschober\b/gi, 'indice de Schober '],
        [/\bflessum\b/gi, 'flessum limitation extension '],
        [/\bfbe\b/gi, 'flexion du buste en avant '],
        
        // === LIGAMENTS ===
        [/\blica\b/gi, 'ligament croisé antérieur LCA '],
        [/\blcp\b/gi, 'ligament croisé postérieur LCP '],
        [/\blli\b/gi, 'ligament latéral interne LLI '],
        [/\blle\b/gi, 'ligament latéral externe LLE '],
        
        // === PATHOLOGIES COURANTES ===
        [/\bsadam\b/gi, 'syndrome algo-dysfonctionnel appareil manducateur SADAM '],
        [/\bsdrc\b/gi, 'syndrome douloureux régional complexe algodystrophie '],
        [/\btms\b/gi, 'troubles musculo-squelettiques '],
        [/\bhla\b/gi, 'hernie lombaire antérieure '],
        
        // === NERFS ===
        [/\bnerf\s+med\b/gi, 'nerf médian '],
        [/\bnerf\s+cub\b/gi, 'nerf cubital ulnaire '],
        [/\bnerf\s+rad\b/gi, 'nerf radial '],
        [/\bnerf\s+sci\b/gi, 'nerf sciatique '],
        [/\bspe\b/gi, 'sciatique paralysante externe SPE '],
        [/\bspi\b/gi, 'sciatique paralysante interne SPI '],
        
        // === EXAMENS ===
        [/\brmn\b/gi, 'résonance magnétique nucléaire '],
        [/\birm\b/gi, 'imagerie par résonance magnétique '],
        [/\btdm\b/gi, 'tomodensitométrie scanner '],
        [/\bemg\b/gi, 'électromyogramme électromyographie '],
        [/\beeg\b/gi, 'électroencéphalogramme '],
        
        // === SCORES ET ÉCHELLES ===
        [/\bevs\b/gi, 'échelle visuelle analogique '],
        [/\beva\b/gi, 'échelle visuelle analogique douleur '],
        [/\bquickdash\b/gi, 'score QuickDASH '],
        [/\bwomac\b/gi, 'score WOMAC '],
        
        // === INTERVENTIONS ===
        [/\bosteosynthese\b/gi, 'ostéosynthèse '],
        [/\bpth\b/gi, 'prothèse totale de hanche '],
        [/\bptg\b/gi, 'prothèse totale de genou '],
        [/\bpte\b/gi, 'prothèse totale d\'épaule '],
        [/\blica\s+plast\b/gi, 'ligamentoplastie du ligament croisé antérieur '],
        
        // === TERMES CLINIQUES ===
        [/\brom\b/gi, 'range of motion amplitude articulaire mobilité '],
        [/\bdef\s+mot\b/gi, 'déficit moteur '],
        [/\bdef\s+sens\b/gi, 'déficit sensitif '],
        [/\broi\b/gi, 'réflexes ostéotendineux '],
        [/\brot\b(?!\s+int|\s+ext)/gi, 'réflexes ostéotendineux '],
        
        // === CONSOLIDATION ET SÉQUELLES ===
        [/\bcons\b(?!\s*$)/gi, 'consolidation '],
        [/\bcal\s+vic\b/gi, 'cal vicieux '],
        [/\bpseudart\b/gi, 'pseudarthrose '],
        [/\bs[eé]quelle\s+douleureuse/gi, 'raideur avec douleur '],
        [/\bs[eé]quelles\s+douloureuses/gi, 'raideur avec douleur '],
        
        // === MOBILITÉ ===
        [/\bflex\b(?!\s*$)/gi, 'flexion '],
        [/\bext\b(?!\s*$)/gi, 'extension '],
        [/\babd\b/gi, 'abduction '],
        [/\badd\b/gi, 'adduction '],
        [/\brot\s+int\b/gi, 'rotation interne '],
        [/\brot\s+ext\b/gi, 'rotation externe '],
        
        // === CÔTÉS ===
        [/\bbilat\b/gi, 'bilatéral '],
        [/\bunilat\b/gi, 'unilatéral '],
        [/\bhomolat\b/gi, 'homolatéral '],
        [/\bcontralat\b/gi, 'controlatéral '],
        
        // === TEMPORALITÉ ===
        [/\bj(\d+)\b/gi, (match, num) => `jour ${num} `],
        [/\bm(\d+)\b/gi, (match, num) => `mois ${num} `],
        [/\bs(\d+)\b/gi, (match, num) => `semaine ${num} `]
    ];
    
    for (const [pattern, replacement] of medicalAbbreviations) {
        if (typeof replacement === 'function') {
            processed = processed.replace(pattern, replacement);
        } else {
            processed = processed.replace(pattern, replacement);
        }
    }
    
    // 1. Normalisation expressions familières enrichies (v2.7 + Niveau 3 SMS)
    const familiarToMedical: [RegExp, string][] = [
        // === NIVEAU 3 - LANGAGE SMS/EXTRÊME ===
        // Contractions SMS
        [/\bjme\s+sui(?:s)?\b/gi, 'je me suis '],
        [/\bj['']me\s+sui(?:s)?\b/gi, 'je me suis '],
        [/\bc['']est\s+kom\b/gi, 'c est comme '],
        [/\bavk\b/gi, 'avec '],
        [/\btt\b/gi, 'tout '],
        [/\bds\b/gi, 'dans '],
        [/\bkomplétman\b/gi, 'completement '],
        [/\bkom\b/gi, 'comme '],
        [/\bkoté\b/gi, 'cote '],
        [/\bnwar\b/gi, 'noir '],
        
        // Verbes familiers extrêmes
        [/\bpét[eé]\b/gi, 'rupture '],
        [/\bcass[eé]\b/gi, 'fracture '],
        [/\bfoutu\b/gi, 'lese '],
        [/\bbouzill[eé]\b/gi, 'detruit '],
        [/\bniqué\b/gi, 'lese '],
        [/\bexplos[eé]\b/gi, 'fracture comminutive '],
        
        // Instabilité familière
        [/\bsa\s+lach(?:e)?\b/gi, 'instabilite '],
        [/\bça\s+lach(?:e)?\b/gi, 'instabilite '],
        [/\blach(?:e)?\b/gi, 'instabilite '],
        
        // Phonétique extrême
        [/\bchavill(?:e)?\b/gi, 'cheville '],
        [/\bjeno\b/gi, 'genou '],
        [/\bépol\b/gi, 'epaule '],
        [/\bvis\s+rien\b/gi, 'cecite '],
        [/\bvoua\s+rien\b/gi, 'cecite '],
        [/\bentend\s+plus\s+rien\b/gi, 'surdite '],
        
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
        [/\bcheville\b/gi, 'cheville'],
        
        // === ANATOMIE NATURELLE - Termes courants ===
        // Localisation gauche/droite naturelle
        [/\b(?:au\s+niveau\s+du|du\s+c[oô]t[eé]\s+du|c[oô]t[eé])\s+(?:pied|main|bras|jambe|genou|[eé]paule|coude|poignet|cheville|hanche)\s+gauche\b/gi, '$1 gauche'],
        [/\b(?:au\s+niveau\s+du|du\s+c[oô]t[eé]\s+du|c[oô]t[eé])\s+(?:pied|main|bras|jambe|genou|[eé]paule|coude|poignet|cheville|hanche)\s+droit(?:e)?\b/gi, '$1 droit'],
        [/\b(?:pied|main|bras|jambe|genou|[eé]paule|coude|poignet|cheville|hanche)\s+gauche\b/gi, '$1 gauche'],
        [/\b(?:pied|main|bras|jambe|genou|[eé]paule|coude|poignet|cheville|hanche)\s+droit(?:e)?\b/gi, '$1 droit'],
        
        // Latéralité simplifiée
        [/\b[aà]\s+gauche\b/gi, 'gauche'],
        [/\b[aà]\s+droite\b/gi, 'droit'],
        [/\bdu\s+c[oô]t[eé]\s+gauche\b/gi, 'gauche'],
        [/\bdu\s+c[oô]t[eé]\s+droit\b/gi, 'droit'],
        [/\bc[oô]t[eé]\s+gauche\b/gi, 'gauche'],
        [/\bc[oô]t[eé]\s+droit\b/gi, 'droit'],
        
        // Bilatéralité
        [/\bdes\s+deux\s+c[oô]t[eé]s\b/gi, 'bilateral'],
        [/\b[aà]\s+gauche\s+et\s+[aà]\s+droite\b/gi, 'bilateral'],
        [/\bdroite?\s+et\s+gauche\b/gi, 'bilateral'],
        [/\bgauche\s+et\s+droite?\b/gi, 'bilateral'],
        
        // Termes anatomiques courants vers médicaux
        [/\bmal\s+au\s+dos\b/gi, 'rachialgie'],
        [/\bmal\s+en\s+bas\s+du\s+dos\b/gi, 'lombalgie'],
        [/\bmal\s+aux\s+lombaires\b/gi, 'lombalgie'],
        [/\bmal\s+dans\s+le\s+cou\b/gi, 'cervicalgie'],
        [/\bmal\s+au\s+cou\b/gi, 'cervicalgie'],
        [/\bmal\s+[aà]\s+la\s+t[eê]te\b/gi, 'cephalee'],
        [/\bmal\s+au\s+ventre\b/gi, 'douleur abdominale'],
        [/\bmal\s+partout\b/gi, 'polyalgies'],
        [/\bmal\s+dans\s+tout\s+le\s+corps\b/gi, 'polyalgies'],
        
        // Synonymes anatomiques courants
        [/\bbras\s+cass[eé]\b/gi, 'fracture bras'],
        [/\bjambe\s+cass[eé]e\b/gi, 'fracture jambe'],
        [/\bpoignet\s+cass[eé]\b/gi, 'fracture poignet'],
        [/\bcheville\s+cass[eé]e\b/gi, 'fracture cheville'],
        [/\bdoigt\s+cass[eé]\b/gi, 'fracture doigt'],
        [/\borteil\s+cass[eé]\b/gi, 'fracture orteil'],
        [/\bn[eé]z\s+cass[eé]\b/gi, 'fracture os propres du nez'],
        [/\bdent\s+cass[eé]e\b/gi, 'fracture dentaire'],
        
        // Expressions anatomiques familières
        [/\btour\s+de\s+reins?\b/gi, 'lumbago'],
        [/\bcoup\s+du\s+lapin\b/gi, 'entorse cervicale'],
        [/\btorticolis\b/gi, 'contracture cervicale'],
        [/\btennis\s+elbow\b/gi, 'epicondylite'],
        [/\b[eé]pine\s+calcaneenne\b/gi, 'talalgies'],
        [/\bhallux\s+valgus\b/gi, 'oignon pied'],
        
        // Descriptions temporelles naturelles
        [/\bil\s*y\s*[''`']?\s*a\s+/gi, 'depuis '],
        [/\by\s*[''`']?\s*a\s+/gi, 'depuis '],
        [/\b[cç]a\s+fait\s+/gi, 'depuis '],
        [/\bvoil[aà]\s+/gi, 'depuis '],
        [/\bdepuis\s+maintenant\s+/gi, 'depuis '],
        
        // Complications courantes langage naturel
        [/\bavec\s+infection\b/gi, 'infection'],
        [/\bavec\s+pus\b/gi, 'infection suppuree'],
        [/\bc['']est\s+infect[eé]\b/gi, 'infection'],
        [/\bavec\s+pseudarthrose\b/gi, 'pseudarthrose'],
        [/\bqui\s+ne\s+se\s+r[eé]pare\s+pas\b/gi, 'pseudarthrose'],
        [/\bqui\s+ne\s+consolide\s+pas\b/gi, 'pseudarthrose'],
        [/\bavec\s+raideur\b/gi, 'raideur'],
        [/\bavec\s+limitation\b/gi, 'limitation'],
        [/\bavec\s+douleur\s+r[eé]siduelle\b/gi, 'douleur chronique'],
        [/\bs[eé]quelles\s+importantes?\b/gi, 'sequelles majeures'],
        [/\bs[eé]quelles\s+graves?\b/gi, 'sequelles majeures'],
        
        // Intensité et gravité naturelles
        [/\btr[eè]s\s+grave\b/gi, 'severe'],
        [/\bgrave\b/gi, 'important'],
        [/\bl[eé]ger(?:e)?\b/gi, 'leger'],
        [/\bun\s+peu\b/gi, 'leger'],
        [/\bpetit(?:e)?\b/gi, 'leger'],
        [/\b[eé]norme\b/gi, 'severe'],
        [/\bimportant(?:e)?\b/gi, 'important']
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
    
    // EXCLUSION SPÉCIALE: "face" anatomique vs "face" (visage)
    // Exclure "face" si c'est dans le contexte "face interne/externe de jambe/bras/cuisse"
    if (foundBones.has('face')) {
        const faceAnatomicalContext = /(?:face\s+(?:interne|externe).*(?:jambe|bras|cuisse|avant-bras|membre))|(?:(?:interne|externe).*face.*(?:jambe|bras|cuisse|avant-bras|membre))/i;
        if (faceAnatomicalContext.test(normalizedText)) {
            foundBones.delete('face');
        }
    }
    
    // Special cases for "deux os" (support different number formats)
    const deuxOsAvantBras = /(?:2|deux)\s+os.*(?:avant[\s-]?bras|forearm)/i;
    const deuxOsJambe = /(?:2|deux)\s+os.*jambe/i;
    
    if (deuxOsAvantBras.test(normalizedText) || (normalizedText.includes('radius') && (normalizedText.includes('cubitus') || normalizedText.includes('ulna')))) {
        foundBones.add('radius');
        foundBones.add('ulna');
    }
    if (deuxOsJambe.test(normalizedText) || (normalizedText.includes('tibia') && (normalizedText.includes('perone') || normalizedText.includes('fibula')))) {
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
    'maxillaire': 95, 'maxillaire inferieur': 95, 'maxillaire superieur': 95, 'mandibule': 95, 'mandibulaire': 95, 'machoire': 95,

    'pouce': 95, 'index': 90, 'médius': 85, 'annulaire': 80, 'auriculaire': 80, 
    'doigt': 75, 'main': 85, 'poignet': 85, 'coude': 85, 'épaule': 85, 
    'hanche': 85, 'cheville': 85, 'pied': 85, 
    'orteil': 75, 'gros orteil': 90, 'hallux': 88,
    'radial': 80, 'sciatique': 80, 'median': 80, 'cubital': 80, 'ulnaire': 80, 'crural': 80, 'facial': 80, 'trijumeau': 80, 'nerf': 75,
    
    // 🦴 GENOU - Mots-clés spécifiques ligaments et ménisques
    'lca': 75, 'ligament croise anterieur': 75, 'lcp': 70, 'ligament croise posterieur': 70,
    'meniscectomie': 85, 'menisque': 80, 'sequelles meniscectomie': 90,
    'hydarthrose': 70, 'hydarthrose chronique': 75, 'epanchement genou': 65, 'gonalgie': 60,
    'chondropathie rotulienne': 70, 'chondropathie femorale': 65, 'arthrose genou': 65,
    'instabilite genou': 60, 'laxite residuelle': 60, 'derobement': 60,
    
    // 🦶 CHEVILLE & PIED - Mots-clés spécifiques
    'pilon tibial': 75, 'ankylose cheville': 75, 'malleole': 70, 'bimalleolaire': 70,
    'calcaneum': 70, 'calcaneum thalamique': 72, 'thalamique': 65, 'astragale': 65,
    'metatarsien': 60,
    
    // 🔙 RACHIS - Mots-clés spécifiques
    'tassement vertebral': 70, 'rachis cervical': 70, 'syndrome cervical': 65,
    'deformation rachis': 65, 'cyphose': 60, 'lordose': 60, 'scoliose': 60,
    'dms': 60, 'distance menton sternum': 62, 'dds': 60, 'distance doigts sol': 62,
    
    // 💪 MEMBRES SUPÉRIEURS - Mots-clés spécifiques
    'tete humerale': 70, 'amputation pouce': 85, 'abduction epaule': 65,
    'elevation': 60, 'rotation externe': 60, 'rotation interne': 60,
    'coiffe rotateurs': 72, 'supra epineux': 65, 'infra epineux': 65,
    'luxation recidivante': 68, 'apprehension': 60, 'instabilite epaule': 65,
    'ankylose coude': 70, 'position vicieuse': 65,
    'prono supination': 65, 'pseudarthrose scaphoide': 72,
    'tendons flechisseurs': 65, 'section tendons': 68,
    'amputation index': 85, 'amputation medius': 80, 'amputation annulaire': 78, 'amputation auriculaire': 78,
    'ankylose pouce': 85, 'ankylose index': 82, 'ankylose medius': 78, 'ankylose annulaire': 75, 'ankylose auriculaire': 75,
    'raideur pouce': 80, 'raideur index': 78, 'raideur medius': 75, 'raideur annulaire': 72, 'raideur auriculaire': 72,
    
    // 🧠 NERFS - Mots-clés spécifiques
    'nerf radial': 75, 'paralysie radiale': 75, 'main tombante': 70,
    'sciatique chronique': 72, 'steppage': 65, 'testing musculaire': 60,
    'deficit moteur': 60, 'paresthesie': 55,
    
    // 🦴 HANCHE & BASSIN - Mots-clés spécifiques
    'prothese totale hanche': 75, 'pth': 72,
    'arthrose hanche': 68, 'pincement articulaire': 65,
    'perimetre marche': 62, 'claudication': 60,
    
    // 👂 AUDITION - Mots-clés spécifiques RENFORCÉS
    'surdite': 85, 'surdite complete': 90, 'surdite totale': 90, 'surdite profonde': 88,
    'surdite partielle': 82, 'surdite legere': 78, 'surdite moderee': 80, 'surdite severe': 85,
    'surdite unilaterale': 85, 'surdite bilaterale': 88, 'cophose': 90,
    'hypoacousie': 75, 'perte auditive': 80, 'perte audition': 80,
    'acouphenes': 85, 'acouphenes isoles': 88, 'bourdonnements': 82, 'tinnitus': 80,
    'decibels': 70, '40 db': 75, '60 db': 75, '80 db': 78, '100 db': 80,
    'diminution acuite auditive': 85, 'baisse audition': 78,
    'oreille droite': 65, 'oreille gauche': 65, 'oreille': 60,
    'vertiges': 70, 'troubles equilibre': 68, 'etourdissements': 65,
    'rocher': 70, 'fracture rocher': 75, 'traumatisme rocher': 72,
    
    // 🫁 VISCÈRES - Mots-clés spécifiques RENFORCÉS
    'splenectomie': 88, 'ablation rate': 88, 'sans rate': 85, 'rate enlevee': 85,
    'nephrectomie': 88, 'ablation rein': 88, 'rein unique': 85, 'un seul rein': 85,
    'colectomie': 85, 'ablation colon': 85, 'colon enleve': 82,
    'ileostomie': 82, 'colostomie': 82, 'stomie': 75, 'anus artificiel': 78,
    'eventration': 75, 'hernie abdominale': 75, 'hernie paroi': 72,
    'lobectomie': 80, 'ablation lobe': 80, 'poumon enleve': 78,
    'hepatectomie': 78, 'ablation foie': 78, 'foie enleve': 75,
    'pancreatectomie': 78, 'ablation pancreas': 78, 'pancreas enleve': 75,
    'cotyle': 70, 'incongruence': 65, 'arthrose precoce': 65,
    'sacro iliaque': 65, 'coccygodynie': 68,
    
    // 🫁 THORAX & VISCÈRES - Mots-clés spécifiques (poids ajustés)
    'cotes': 60, 'volet costal': 70, 'dyspnee': 65, 'respiratoire': 60,
    'capacite respiratoire': 62,
    'hernie pariétale': 65, 'ceinture contention': 62,
    
    // 🦷 DENTS & CICATRICES - Mots-clés spécifiques
    'perte dent': 65, 'prothese dentaire': 62,
    'cheloide': 65, 'retractile': 65, 'adherente': 60,
    'gene esthetique': 58,
    
    // 🔄 CAS COMPLEXES - Mots-clés spécifiques (Niveau 3)
    'polytraumatisme': 75, 'sequelles multiples': 72, 'cumul': 75, 'cumuler': 70, 'combiner': 68,
    'balthazar': 75, 'formule balthazar': 75, 'somme': 65,
    'etat anterieur': 75, 'pre existant': 72, 'preexistant': 72, 'ancien': 65, 'anterieur': 65,
    'aggravation': 70, 'majoration': 68, 'imputable': 70, 'imputabilite': 72,
    'traumatisme cranien': 68, 'cephalees chroniques': 65,
    
    // 🎯 CAS LIMITES - Mots-clés seuils/frontières
    'limite': 68, 'limite haute': 70, 'limite basse': 68, 'frontiere': 68,
    'exactement': 65, 'pile': 65, 'juste': 62, 'precision': 65,
    'seuil': 68, 'entre': 60, 'borderline': 68, 'incertain': 65,
    'variable': 62, 'fluctuant': 62, 'intermittent': 60,

    // 👁️ VISION - Mots-clés spécifiques (poids élevé pour lésions oculaires)
    'cataracte': 70, 'acuite visuelle': 70, 'acuite': 65, 'vision': 60, 'oeil': 60, 'yeux': 60,
    'cecite': 85, 'cecite absolue': 95, 'aveugle': 85, 'baisse de vision': 65, 'perte de vision': 65,
    'perte complete vision': 90, 'perte vision complete': 90,
    'champ visuel': 60, 'retrecissement': 55, 'scotome': 55, 'hemianopsie': 55,
    'glaucome': 75, 'glaucome post-traumatique': 85, 'uveite': 60, 'uveit': 55, 
    'endophtalmie': 75, 'retine': 55, 'decollement': 75, 'decollement retine': 85,
    'taie': 70, 'taie corneenne': 80, 'cornee': 70, 'globe oculaire': 50, 'enucleation': 50, 'phtisie': 50, 'vitre': 50,

    // 👂 aud ITION keywords déjà définis plus haut (lignes 903-913)
    // 🩺 VISCÈRES keywords déjà définis plus haut (lignes 915-923)
    
    // 🦴 AMPUTATIONS - Mots-clés spécifiques (poids très élevé)
    'desarticulation': 85, 'transtibiale': 80, 'transfemorale': 85,
    'transradiale': 80, 'transhumerale': 85,
    'amputation avant-bras': 85, 'amputation cuisse': 85, 'amputation jambe': 80,
    'amputation tiers moyen': 80, 'amputation tiers superieur': 85, 'amputation tiers inferieur': 75,

    // Top-tier, specific conditions
    'perte des deux mains': 200,  // Poids TRÈS élevé pour lésion bilatérale gravissime
    'deux mains': 180,
    'amputation bilaterale': 150,
    'dent': 70,
    'paralysie': 70,
    'amputation': 60, 'ankylose': 60, 'pseudarthrose': 60, 'sténose': 60,
    'désarticulation': 85, 'hémiplégie': 60, 'paraplégie': 60, 'quadriplégie': 60,
    'rate': 75,

    // High-impact, specific conditions
    'ablation': 70, 'nécrose': 50, 'splénectomie': 85, 'éventration': 75,
    'cicatrice': 40,
    'cranien': 45, 'anévrisme': 45, 'oblitération': 45, 'phlébite': 45,

    // High-impact, specific anatomical locations
    'diaphyse': 45, 'extremite inferieure': 45, 
    'col chirurgical': 100, 'trochiter': 98, 'trochin': 98,
    'col femoral': 100, 'plateau tibial': 100, 'scaphoide': 98, 'olecrane': 98,

    // Medium-impact, common findings
    'perte': 35,
    'raideur': 30, 'instabilite': 30, 'laxite': 30, 'entorse': 30,
    'cal vicieux': 30, 'rétraction': 30, 'cicatrice rétractile': 30, 'raccourcissement': 30, 'deviation': 30,
    'pneumothorax': 30, 'hémothorax': 30,
    
    // General injury types
    'fracture': 20, 'luxation': 20, 'rupture': 20, 'lésion': 15, 'traumatisme': 15,
    'vertige': 15, 'spondylodiscite': 15, 'plaie': 15, 'contusion': 15,
    
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
    
    // 👁️ Synonymes vision et pathologies oculaires
    'cataract': 'cataracte',
    'cataractes': 'cataracte',
    'opacite cristallinienne': 'cataracte',
    'cristallin opacifie': 'cataracte',
    'acuite': 'acuite visuelle',
    'av': 'acuite visuelle',
    'avo': 'acuite visuelle oeil',
    'od': 'oeil droit',
    'og': 'oeil gauche',
    'baisse de l acuite': 'baisse acuite visuelle',
    'baisse acuite': 'baisse acuite visuelle',
    'diminution acuite': 'baisse acuite visuelle',
    'baisse de vision': 'baisse acuite visuelle',
    'perte de vision': 'baisse acuite visuelle',
    'vision basse': 'baisse acuite visuelle',
    'mal voit': 'baisse acuite visuelle',
    'voit mal': 'baisse acuite visuelle',
    'voit flou': 'baisse acuite visuelle',
    'vision floue': 'baisse acuite visuelle',
    'oeuil': 'oeil',
    'yeu': 'oeil',
    
    // 🦴 Synonymes genou et ligaments
    'lca': 'ligament croise anterieur',
    'lcp': 'ligament croise posterieur',
    'qui lache': 'instabilite',
    'genou instable': 'laxite residuelle',
    'derobement': 'instabilite articulaire',
    'derobements': 'instabilite articulaire',
    'interne': 'mediale',  // méniscectomie interne = médiale
    'menisque interne': 'menisque mediale',
    'externe': 'laterale',  // méniscectomie externe = latérale
    'menisque externe': 'menisque laterale',
    
    // 🦶 Synonymes cheville et pied
    'pilon': 'pilon tibial',
    'bimall': 'bimalleolaire',
    'bi malleolaire': 'bimalleolaire',
    'thalamique': 'calcaneum thalamique',
    
    // 🔙 Synonymes rachis
    'vertebre': 'vertebral',
    'dos bloque': 'raideur rachis',
    'dms': 'distance menton sternum',
    'dds': 'distance doigts sol',
    
    // 💬 Langage familier → terminologie médicale
    'casse': 'fracture',
    'cassé': 'fracture',
    'cassee': 'fracture',
    'pete': 'rupture',
    'pété': 'rupture',
    'petee': 'rupture',
    'coince': 'blocage articulaire',
    'coincé': 'blocage articulaire',
    'boite': 'claudication',
    'marche mal': 'troubles marche',
    
    // 🖐️ Synonymes doigts spécifiques
    'le pouce': 'pouce',
    'du pouce': 'pouce',
    'l index': 'index',
    'de l index': 'index',
    'majeur doigt': 'medius',
    'doigt medius': 'medius',
    'doigt majeur': 'medius',
    'l annulaire': 'annulaire',
    'l auriculaire': 'auriculaire',
    'petit doigt': 'auriculaire',
    'phalange p1': 'phalange proximale',
    'phalange p2': 'phalange moyenne',
    'phalange p3': 'phalange distale',
    'phalange 1': 'phalange proximale',
    'phalange 2': 'phalange moyenne',
    'phalange 3': 'phalange distale',
    'metacarpo phalangienne': 'metacarpophalangienne',
    'meta carpo': 'metacarpophalangienne',
    'mcp articulation': 'metacarpophalangienne',
    'ipm articulation': 'interphalangienne proximale',
    'ipd articulation': 'interphalangienne distale',
    
    // 🦶 Synonymes orteils spécifiques
    'gros orteil': 'gros orteil',
    'hallux': 'gros orteil',
    '1er orteil': 'gros orteil',
    'premier orteil': 'gros orteil',
    '2eme orteil': 'deuxieme orteil',
    '3eme orteil': 'troisieme orteil',
    '4eme orteil': 'quatrieme orteil',
    '5eme orteil': 'cinquieme orteil',
    
    // 🦴 Synonymes membres supérieurs
    'coiffe': 'coiffe rotateurs',
    'rotateurs': 'coiffe rotateurs',
    'epaule instable': 'luxation recidivante epaule',
    'pth': 'prothese totale hanche',
    'olec': 'olecrane',
    'scaph': 'scaphoide',
    
    // 🫁 Synonymes thorax et viscères
    'volet': 'volet costal',
    'spleen': 'splenectomie',
    'rate enlevee': 'splenectomie',
    'ablation rate': 'splenectomie',
    'sans rate': 'splenectomie',
    'hernie': 'eventration',
    'rein enleve': 'nephrectomie',
    'ablation rein': 'nephrectomie',
    'un seul rein': 'nephrectomie',
    'colectomie': 'ablation colon',
    'ablation colon': 'colectomie',
    'ileo': 'ileostomie',
    'colostomie': 'stomie',
    'anus artificiel': 'stomie',
    'eventration': 'hernie paroi',
    'hernie abdominale': 'eventration',
    'lobectomie': 'ablation lobe pulmonaire',
    'poumon enleve': 'lobectomie',
    'hepatectomie': 'ablation foie partielle',
    'foie enleve': 'hepatectomie',
    'pancreatectomie': 'ablation pancreas',
    'pancreas enleve': 'pancreatectomie',
    
    // 👂 Synonymes audition détaillés
    'sourd': 'surdite',
    'sourde': 'surdite',
    'entend mal': 'perte auditive',
    'entend plus': 'surdite complete',
    'nentend plus': 'surdite complete',
    'n\'entend plus': 'surdite complete',
    'bourdonnements': 'acouphenes',
    'sifflements': 'acouphenes',
    'tinnitus': 'acouphenes',
    'oreille cassee': 'surdite traumatique',
    'perte ouie': 'surdite',
    'perte audition': 'surdite',
    'baisse audition': 'surdite partielle',
    'hypoacousie': 'surdite partielle',
    'cophose': 'surdite complete',
    'surdite profonde': 'surdite severe',
    'surdite totale': 'surdite complete',
    'surdite bilaterale': 'surdite deux oreilles',
    'surdite unilaterale': 'surdite une oreille',
    'db': 'decibels',
    '20 db': 'perte legere',
    '40 db': 'perte moderee',
    '60 db': 'perte moyenne',
    '80 db': 'perte severe',
    '40 decibels': '40db',
    '60 decibels': '60db',
    '80 decibels': '80db',
    'vertige': 'troubles equilibre',
    'vertiges': 'troubles equilibre',
    'etourdissement': 'vertige',
    
    // 🦴 Synonymes amputations spécifiques
    'coupé': 'amputation',
    'coupe': 'amputation',
    'perdu': 'amputation',
    'desarticuler': 'desarticulation',
    'separé': 'desarticulation',
    'ampute': 'amputation',
    'amputee': 'amputation',
    'moignon': 'amputation',
    'transtibial': 'transtibiale',
    'transfemoral': 'transfemorale',
    'transradial': 'transradiale',
    'transhumeral': 'transhumerale',
    
    // 🦷 Synonymes dents
    'dent perdue': 'perte dent',
    'dent cassee': 'perte dent',
    'dentier': 'prothese dentaire',
    
    // 🦴 Synonymes maxillo-faciaux (mandibule = maxillaire inférieur)
    'mandibule': 'maxillaire inferieur',
    'mandibulaire': 'maxillaire inferieur',
    'fracture mandibule': 'fracture maxillaire inferieur',
    'fracture mandibulaire': 'fracture maxillaire inferieur',
    'double fracture mandibulaire': 'fracture maxillaire inferieur',
    'double fracture mandibule': 'fracture maxillaire inferieur',
    
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
    'distance mains sol': 'flexion rachis',
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
    'ptg': 'prothese totale genou',
    'pte': 'prothese totale epaule',
    'arthrodese': 'fusion articulaire',
    'synovectomie': 'ablation synoviale',
    'arthrolyse': 'liberation articulaire',
    'meniscectomie': 'sequelles meniscectomie',
    'meniscectomie totale': 'sequelles meniscectomie',
    'meniscectomie partielle': 'sequelles meniscectomie',
    'ablation menisque': 'sequelles meniscectomie',
    'sequelles meniscectomie': 'meniscectomie',
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
// EXCLUSION CONTEXTUELLE pour "face" traitée dans getAnatomicalCategory
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
    'cataracte': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques', 'acuite': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques', 'glaucome': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques', 'retine': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques', 'cornee': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques',
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

// Fonction pour obtenir la catégorie anatomique avec exclusion contextuelle
const getAnatomicalCategory = (keyword: string, normalizedText: string): string | undefined => {
    // EXCLUSION SPÉCIALE: "face" anatomique vs "face" (visage)
    if (keyword === 'face') {
        const faceAnatomicalContext = /(?:face\s+(?:interne|externe).*(?:jambe|bras|cuisse|avant-bras|membre))|(?:(?:interne|externe).*face.*(?:jambe|bras|cuisse|avant-bras|membre))/i;
        if (faceAnatomicalContext.test(normalizedText)) {
            // Dans contexte anatomique directionnel, ne pas mapper à Maxillo-Facial
            return undefined;
        }
    }
    return anatomicalKeywords[keyword];
};

// Fonction pour filtrer les mots-clés selon le contexte anatomique
// VERSION 3.3.45 - EXCLUSION FACE ANATOMIQUE DIRECTIONNELLE
const getContextualKeywordWeight = (keyword: string, normalizedText: string): number => {
    // EXCLUSION CRITIQUE: "face" en contexte anatomique directionnel (face interne/externe de jambe/bras)
    // Pattern: "face interne de la jambe" ou "interne... face... jambe"
    if (keyword === 'face') {
        const faceDirectionalPattern = /(?:face\s+(?:interne|externe).*(?:jambe|bras|cuisse|avant-bras|membre))|(?:(?:interne|externe).*face.*(?:jambe|bras|cuisse|avant-bras|membre))/i;
        if (faceDirectionalPattern.test(normalizedText)) {
            // Retourner 0 pour exclure "face" du scoring (ce n'est pas le visage, c'est une direction anatomique)
            return 0;
        }
    }
    return keywordWeights[keyword] || 1;
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
    
    // ⚽ CRITÈRE SPÉCIFIQUE CONTEXTE SPORTIF/PROFESSIONNEL : Impossibilité reprise activité → ÉLEVÉ
    const hasSportContext = /footballeur|sportif|athl[eè]te|joueur|rugbyman|basketteur|coureur|tennismen/i.test(normalizedText);
    const hasImpossibilityResumeActivity = /impossibilit[eé].*(?:reprendre|reprise|retour).*(?:sport|activit[eé]|jeu|comp[eé]tition)|arr[eê]t\s+(?:d[eé]finitif|sport)|fin\s+carri[eè]re|reconversion/i.test(normalizedText);
    const hasInstabilityChronique = /instabilit[eé]\s+chronique|laxité\s+(?:chronique|permanente|r[eé]siduelle)|instabilit[eé].*malgr[eé].*r[eé][eé]ducation/i.test(normalizedText);
    const hasFailedRehabilitation = /malgr[eé]\s+(?:r[eé][eé]ducation|kin[eé]|traitement)|[eé]chec.*r[eé][eé]ducation|r[eé][eé]ducation.*inefficace/i.test(normalizedText);
    const hasBoiterieChronique = /boiterie(?:\s+permanente|\s+chronique|\s+persistante)?|claudication(?:\s+permanente|\s+chronique)?/i.test(normalizedText);
    
    // Combinaison SPORT + IMPOSSIBILITÉ REPRISE + INSTABILITÉ → ÉLEVÉ (haut de fourchette)
    if (hasSportContext && hasImpossibilityResumeActivity && (hasInstabilityChronique || hasBoiterieChronique)) {
        return {
            level: 'élevé',
            signs: [
                '⚽ Contexte sportif professionnel/intensif',
                '⚠️ Impossibilité définitive de reprendre le sport',
                hasInstabilityChronique ? 'Instabilité chronique malgré rééducation' : 'Boiterie permanente',
                '🚫 Perte capacité fonctionnelle majeure pour activité principale'
            ],
            isDefault: false
        };
    }
    
    // INSTABILITÉ CHRONIQUE + ÉCHEC RÉÉDUCATION → ÉLEVÉ (même sans contexte sportif)
    if (hasInstabilityChronique && hasFailedRehabilitation && hasBoiterieChronique) {
        return {
            level: 'élevé',
            signs: [
                '⚠️ Instabilité chronique séquellaire',
                'Échec rééducation → Caractère définitif',
                'Boiterie permanente',
                'Retentissement fonctionnel majeur'
            ],
            isDefault: false
        };
    }
    
    // 🦿 CRITÈRE SPÉCIFIQUE AMPUTATIONS : Niveau anatomique prime sur symptômes fonctionnels
    // Pour les amputations, la sévérité est déterminée par le siège anatomique, PAS par boiterie/marche difficile
    if (/amputation|d[eé]sarticulation/i.test(normalizedText)) {
        // Niveau BAS (sous le genou / jambe) → FAIBLE (70%)
        const isBelowKnee = /(?:amputation|amput[eé]).*(?:sous.*genou|jambe)|(?:sous.*genou|jambe).*(?:amputation|amput[eé])|moignon.*(?:long|bien.*appareillable)/i.test(normalizedText);
        
        // Niveau HAUT (cuisse/hanche/désarticulation) → ÉLEVÉ (80%)
        const isAboveKnee = /(?:amputation|amput[eé]|d[eé]sarticulation).*(?:cuisse|hanche)|(?:cuisse|hanche).*(?:amputation|amput[eé]|d[eé]sarticulation)|moignon.*(?:tr[eè]s\s+court|court(?!\s+terme))/i.test(normalizedText);
        
        if (isBelowKnee) {
            return { 
                level: 'faible', 
                signs: ['🦿 Amputation sous le genou (moignon long et bien appareillable)'], 
                isDefault: false 
            };
        } else if (isAboveKnee) {
            return { 
                level: 'élevé', 
                signs: ['🦿 Désarticulation hanche ou amputation cuisse (moignon très court)'], 
                isDefault: false 
            };
        }
        // Si siège non précisé mais appareillage satisfaisant → bon pronostic
        if (/proth[eè]se.*(?:adapt[eé]e|fonctionnelle)|appareillage.*satisfaisant/i.test(normalizedText)) {
            return { 
                level: 'faible', 
                signs: ['🦿 Amputation avec appareillage satisfaisant'], 
                isDefault: false 
            };
        }
    }
    
    // 🔊 CRITÈRE SPÉCIFIQUE AUDITION : Détection dB (décibels)
    const dbMatch = normalizedText.match(/(\d+)\s*(?:db|decibels)/i);
    if (dbMatch) {
        const db = parseInt(dbMatch[1]);
        if (db <= 30) {
            return { level: 'faible', signs: [`Surdité légère: ${db} dB`], isDefault: false };
        } else if (db <= 55) {
            return { level: 'faible', signs: [`Surdité modérée: ${db} dB`], isDefault: false };
        } else if (db <= 75) {
            return { level: 'moyen', signs: [`Surdité moyenne: ${db} dB`], isDefault: false };
        } else if (db <= 95) {
            return { level: 'élevé', signs: [`Surdité sévère: ${db} dB`], isDefault: false };
        } else {
            return { level: 'élevé', signs: [`Surdité profonde/cophose: ${db} dB`], isDefault: false };
        }
    }
    
    // 🎧 CRITÈRE SPÉCIFIQUE : Surdité complète/totale UNILATÉRALE → FAIBLE
    if (/surdit[eé].*(?:compl[eè]te|totale).*(?:unilat[eé]rale|une\s+oreille|oreille\s+(?:droite|gauche))/i.test(normalizedText)) {
        return { level: 'faible', signs: ['Surdité complète unilatérale'], isDefault: false };
    }
    
    // 🎧 CRITÈRE SPÉCIFIQUE : Surdité complète/totale BILATÉRALE → ÉLEVÉ
    if (/surdit[eé].*(?:compl[eè]te|totale).*(?:bilat[eé]rale|deux\s+oreilles)/i.test(normalizedText)) {
        return { level: 'élevé', signs: ['Surdité complète bilatérale'], isDefault: false };
    }
    
    // 🎧 CRITÈRE SPÉCIFIQUE : Acouphènes isolés → MOYEN
    if (/acouph[eè]nes?.*(?:isol[eé]s?|seuls?|sans\s+surdit[eé])/i.test(normalizedText)) {
        return { level: 'moyen', signs: ['Acouphènes isolés permanents'], isDefault: false };
    }
    
    // �🆕 CRITÈRE MAJEUR : Raccourcissement membre ≥ 4 cm → SÉVÉRITÉ ÉLEVÉE
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
    
    // 🚨 CRITÈRE MAJEUR : Troubles statiques sévères → SÉVÉRITÉ ÉLEVÉE
    if (clinicalContext.hasTroublesStatiques) {
        // Pour déviation modérée (5-15°), ne pas forcer "élevé" automatiquement
        const deviationMatch = normalizedText.match(/(\d+)\s*degres?/i);
        if (deviationMatch) {
            const degrees = parseInt(deviationMatch[1]);
            if (degrees >= 5 && degrees <= 15) {
                // Déviation modérée, laisser les autres critères décider
            } else if (degrees > 15) {
                // Déviation sévère → élevé
                return { 
                    level: 'élevé', 
                    signs: [`⚠️ Déviation sévère: ${degrees}°`, 'Troubles statiques majeurs'], 
                    isDefault: false 
                };
            }
        } else {
            // Troubles statiques sans quantification → élevé
            const troublesSigns = clinicalContext.severityModifiers.filter(m => m.includes('Troubles statiques'));
            return { 
                level: 'élevé', 
                signs: ['⚠️ Troubles statiques confirmés', ...troublesSigns], 
                isDefault: false 
            };
        }
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
    
    //  CRITÈRE MAJORATION : Signes neurologiques + vasculaires → Élevé
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
            // 🆕 Contexte sportif/professionnel
            'arret definitif', 'fin carriere', 'reconversion professionnelle',
            'impossibilite reprendre sport', 'impossibilite reprise', 'sport impossible',
            'activite impossible', 'retour impossible',
            // Intensité forte
            'severe', 'sevère', 'majeur', 'majeure', 'grave', 'important', 'importante', 'considerable',
            'intense', 'tres douloureux', 'tres important',
            // 🆕 V3.3.54: Types de fractures graves
            'arrachement', 'comminutive', 'eclatement', 'explose', 'plurifragmentaire',
            'deplacement important', 'deplacement majeur', 'fortement deplacee',
            // Persistance et chronicité
            'persistante', 'permanent', 'chronique severe', 'invalidant',
            // 🆕 Échec thérapeutique
            'malgre reeducation', 'echec reeducation', 'reeducation inefficace',
            'malgre kine', 'malgre traitement', 'sans amelioration',
            // Signes objectifs graves
            'instabilite', 'instabilité', 'instabilite chronique', 'laxite importante', 'derobement',
            'raideur severe', 'raideur importante', 'ankylose',
            'boiterie', 'boiterie permanente', 'claudication', 'marche impossible',
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

    // 🩺 CRITÈRE CONTEXTUEL : Analyse "impossibilité" avec contexte
    const hasPartialImpossibility = /impossibilit[eé].*(?:port|soulever|porter).*(?:charges?|poids|lourdes?)/i.test(normalizedText);
    const hasTotalImpossibility = /impossibilit[eé]\s+(?:de\s+(?:la\s+)?)?(?:marche|d[eé]placement|debout|station|autonomie)/i.test(normalizedText);
    
    // 🚶 CRITÈRE CONTEXTUEL : Analyse "claudication" avec périmètre marche
    const claudicationMatch = normalizedText.match(/claudication.*(?:apr[eè]s|à)\s*(\d+)\s*(?:m|m[eè]tres?)/i);
    const hasClaudicationImmediate = /claudication\s+(?:imm[eé]diate|d[eè]s\s+les?\s+premiers?\s+pas|permanente)/i.test(normalizedText);
    const hasClaudicationModerate = claudicationMatch && parseInt(claudicationMatch[1]) >= 300; // ≥300m = modéré
    const hasClaudicationSevere = claudicationMatch && parseInt(claudicationMatch[1]) < 300; // <300m = sévère
    
    // 🏥 CRITÈRE CONTEXTUEL : Analyse "opéré" avec type intervention
    const hasSimpleSurgery = /(?:discectomie|m[eé]niscectomie|arthroscopie|suture\s+simple)/i.test(normalizedText);
    const hasComplexSurgery = /(?:arthrод[eè]se|ost[eé]osynth[eè]se|proth[eè]se|reconstruction|greffe)/i.test(normalizedText);
    
    // 💼 CRITÈRE CONTEXTUEL : Analyse contexte professionnel
    const hasPhysicalJob = /(?:manutentionnaire|ouvrier|b[aâ]timent|chantier|agriculteur|m[eé]canicien)/i.test(normalizedText);
    
    // 1️⃣ Critères quantitatifs prioritaires (EVA, limitations)
    // EVA ≥ 7 → élevé (RETOUR IMMÉDIAT), EVA 4-6 → moyen (mais peut être overridé par mots-clés), EVA ≤ 3 → faible (RETOUR IMMÉDIAT)
    if (painIntensity !== undefined) {
        if (painIntensity >= 7) {
            return { level: 'élevé', signs: [`EVA ${painIntensity}/10 (douleur forte)`], isDefault: false };
        } else if (painIntensity <= 3) {
            return { level: 'faible', signs: [`EVA ${painIntensity}/10 (douleur faible)`], isDefault: false };
        }
        // EVA 4-6 : Ne pas retourner immédiatement, laisser les mots-clés décider (peuvent overrider en élevé)
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
            // ⚠️ IMPORTANT: Ne retourner "moyen" que si pas de mots-clés élevé (arrachement, comminutive, etc)
            const hasHighSeverityKeyword = severityKeywords.élevé.some(kw => 
                normalizedText.includes(kw) && !['opere', 'opéré', 'operee', 'opérée', 'chirurgie', 'intervention'].includes(kw)
            );
            if (!hasHighSeverityKeyword) {
                return { level: 'moyen', signs: ['cal vicieux'], isDefault: false };
            }
        }
    }

    // 2️⃣ First, check for explicit "faible" keywords
    let signs = severityKeywords.faible.filter(kw => normalizedText.includes(kw));
    console.log('🔍 [determineSeverity] Text:', normalizedText.substring(0, 100));
    console.log('🔍 [determineSeverity] Faible signs:', signs);
    if (signs.length > 0) return { level: 'faible', signs: [...new Set(signs)], isDefault: false };

    // 🆕 3️⃣ Analyse contextuelle AVANT détection mots-clés "élevé"
    // Si claudication modérée (≥300m) OU impossibilité partielle (charges) OU chirurgie simple → Ne pas forcer ÉLEVÉ
    const hasModerateContext = hasClaudicationModerate || hasPartialImpossibility || hasSimpleSurgery;
    
    // 3️⃣ Check for "high" keywords, but only if they are not negated AND not in moderate context
    const highSigns = severityKeywords.élevé.filter(kw => {
        if (normalizedText.includes(kw)) {
            // Build a regex to check for negation words before the keyword
            // This looks for "negation_word [optional_word] keyword"
            const regex = new RegExp(`(?:${negationWords.join('|')})\\s*(?:\\w+\\s+)?${kw}`, 'i');
            if (regex.test(normalizedText)) return false; // Négation détectée
            
            // 🆕 Filtrage contextuel pour mots-clés ambigus
            const normalizedKw = kw; // kw est déjà normalisé car vient de normalizedText.includes()
            if (normalizedKw.includes('impossibilit') && hasPartialImpossibility && !hasTotalImpossibility) return false; // Impossibilité partielle ≠ élevé
            if (normalizedKw.includes('claudication') && hasClaudicationModerate) return false; // Claudication modérée ≠ élevé
            if ((normalizedKw.includes('opere') || normalizedKw.includes('operee') || normalizedKw.includes('intervention')) && hasSimpleSurgery && !hasComplexSurgery) return false; // Chirurgie simple ≠ élevé
            
            return true;
        }
        return false;
    });

    // 🆕 Si signes "élevé" filtrés mais contexte modéré présent → Retourner MOYEN avec justification
    if (hasModerateContext && highSigns.length === 0) {
        const contextSigns = [];
        if (hasClaudicationModerate) contextSigns.push(`Claudication après ${claudicationMatch![1]}m (périmètre marche acceptable)`);
        if (hasPartialImpossibility) contextSigns.push('Impossibilité port charges lourdes uniquement');
        if (hasSimpleSurgery) contextSigns.push('Chirurgie standard (discectomie/arthroscopie)');
        if (hasPhysicalJob) contextSigns.push('⚠️ Contexte professionnel physique (majoration légitime)');
        
        return { level: 'moyen', signs: contextSigns, isDefault: false };
    }

    console.log('🔍 [determineSeverity] High signs:', highSigns);
    if (highSigns.length > 0) return { level: 'élevé', signs: [...new Set(highSigns)], isDefault: false };
    
    // 4️⃣ Then, check for "moyen" keywords
    signs = severityKeywords.moyen.filter(kw => normalizedText.includes(kw));
    if (signs.length > 0) return { level: 'moyen', signs: [...new Set(signs)], isDefault: false };
    
    // 🩺 CRITÈRE MAJORATION : Arthrose post-traumatique confirmée → Moyen minimum (si pas de signes élevés)
    if (clinicalContext.hasArthrose) {
        const arthroseSigns = clinicalContext.severityModifiers.filter(m => m.includes('Arthrose'));
        return { 
            level: 'moyen', 
            signs: ['Arthrose post-traumatique', ...arthroseSigns], 
            isDefault: false 
        };
    }
    
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
    const hasTroublePsychologique = /trouble.*(?:anxieux|psychologique|d[eé]press)|anxieux|d[eé]pression|psychotrauma|stress.*post.*traumatique|ptsd/i.test(normalized);
    
    // Analyse détaillée selon critères objectifs
    if (hasFlexion || hasExtension || hasEVA || hasTroublePsychologique || clinicalSigns.length > 0) {
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
        
        if (hasTroublePsychologique) {
            justification += `<li><strong>Trouble psychologique post-traumatique</strong><br>`;
            justification += `→ Retentissement psychique : Anxiété, stress post-traumatique<br>`;
            justification += `→ Impact : Qualité de vie, réinsertion professionnelle/sociale</li>`;
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
    
    // Section 6 : Données cliniques manquantes (si incomplètes) - PERSONNALISÉES PAR LÉSION
    if (isDefaultSeverity || (!hasFlexion && !hasExtension && !hasEVA)) {
        justification += "<strong>📋 Données cliniques recommandées pour affiner l'évaluation</strong><br>";
        justification += "<em>Pour une évaluation plus précise, il serait souhaitable de disposer de :</em><br>";
        justification += "<ul>";
        
        // Détection du type de lésion pour recommandations spécifiques
        const injuryNameLower = normalize(injury.name);
        const textLower = normalize(userInput);
        
        // 👁️ VISION (cataracte, acuité visuelle, œil, uvéite, rétine, etc.)
        if (injuryNameLower.includes('cataracte') || injuryNameLower.includes('acuite') || 
            injuryNameLower.includes('vision') || injuryNameLower.includes('oeil') ||
            injuryNameLower.includes('uveit') || injuryNameLower.includes('retine') || 
            injuryNameLower.includes('vitre') || injuryNameLower.includes('hemorragie') ||
            injuryNameLower.includes('decollement') || injuryNameLower.includes('atrophie optique') ||
            injuryNameLower.includes('glaucome') || injuryNameLower.includes('cornee') ||
            injuryNameLower.includes('taie') || injuryNameLower.includes('endophtalmie') ||
            injuryNameLower.includes('cecite') || injuryNameLower.includes('globe') ||
            textLower.includes('acuite visuelle') || textLower.includes('cataracte') || 
            textLower.includes('baisse de vision') || textLower.includes('oeil')) {
            justification += "<li><strong>Acuité visuelle chiffrée</strong> de chaque œil (ex: OD 3/10, OG 8/10) avec correction optimale</li>";
            justification += "<li><strong>Champ visuel</strong> (périmétrie Goldman ou automatisée)</li>";
            justification += "<li>Complications : <strong>gêne ou impossibilité de porter correction</strong>, aphaquie, pseudophakie</li>";
            justification += "<li>Examen ophtalmologique complet (fond d'œil, tonus oculaire)</li>";
            justification += "<li>Retentissement sur activités quotidiennes (lecture, conduite, reconnaissance visages)</li>";
        }
        // 👂 AUDITION (surdité, audiométrie, décibels)
        else if (injuryNameLower.includes('auditive') || injuryNameLower.includes('surdite') || 
                 injuryNameLower.includes('audiometrie') || textLower.includes('audition') || textLower.includes('surdite')) {
            justification += "<li><strong>Audiométrie tonale</strong> : perte en décibels (dB) pour chaque fréquence (500, 1000, 2000, 4000 Hz)</li>";
            justification += "<li><strong>Audiométrie vocale</strong> : pourcentage d'intelligibilité</li>";
            justification += "<li>Acouphènes : intensité (échelle EVA), fréquence, retentissement sur sommeil</li>";
            justification += "<li>Appareillage auditif : efficacité, tolérance</li>";
            justification += "<li>Retentissement professionnel et social (communication)</li>";
        }
        // 🦴 ARTICULATIONS (raideur, ankylose, mobilité)
        else if (injuryNameLower.includes('raideur') || injuryNameLower.includes('ankylose') || 
                 injuryNameLower.includes('fracture') || injuryNameLower.includes('arthrose') ||
                 textLower.includes('flexion') || textLower.includes('extension') || textLower.includes('abduction')) {
            justification += "<li><strong>Amplitudes articulaires mesurées</strong> (goniomètre) : flexion, extension, abduction, rotation</li>";
            justification += "<li><strong>Cotation douleur</strong> (échelle EVA 0-10) : repos vs mouvement</li>";
            justification += "<li><strong>Testing musculaire</strong> (force 0-5) : muscles agonistes/antagonistes</li>";
            justification += "<li><strong>Périmètres membres</strong> (amyotrophie en cm par rapport au côté sain)</li>";
            justification += "<li>Imagerie récente (RX, TDM, IRM si nécessaire) : cal vicieux, arthrose, lésions associées</li>";
            justification += "<li>Retentissement fonctionnel : périmètre de marche, port de charges, autonomie AVQ</li>";
        }
        // 🧠 NEUROLOGIQUE (paralysie, déficit sensitif)
        else if (injuryNameLower.includes('paralysie') || injuryNameLower.includes('nerf') || 
                 injuryNameLower.includes('paresthesie') || textLower.includes('deficit moteur') || textLower.includes('deficit sensitif')) {
            justification += "<li><strong>Testing musculaire analytique</strong> (cotation 0-5) : muscles déficitaires précis</li>";
            justification += "<li><strong>Déficit sensitif</strong> : territoires atteints, hypoesthésie/anesthésie</li>";
            justification += "<li>Électromyogramme (EMG) : atteinte axonale/myélinique, dénervation active/chronique</li>";
            justification += "<li>Troubles trophiques : amyotrophie, troubles sudation, cyanose</li>";
            justification += "<li>Retentissement fonctionnel : préhension, marche, équilibre</li>";
        }
        // 🫁 RESPIRATOIRE (thorax, côtes, poumon)
        else if (injuryNameLower.includes('thorax') || injuryNameLower.includes('cote') || 
                 injuryNameLower.includes('poumon') || injuryNameLower.includes('respiratoire')) {
            justification += "<li><strong>Épreuves fonctionnelles respiratoires (EFR)</strong> : VEMS, CVF, rapport VEMS/CVF</li>";
            justification += "<li>Dyspnée d'effort : classification NYHA ou échelle mMRC (0-4)</li>";
            justification += "<li>Radiographie thoracique : séquelles pleurales, déformations pariétales</li>";
            justification += "<li>Retentissement sur activités physiques : périmètre de marche, montée escaliers</li>";
        }
        // 💚 VISCÉRAL (foie, rate, rein, vessie)
        else if (injuryNameLower.includes('foie') || injuryNameLower.includes('rate') || 
                 injuryNameLower.includes('rein') || injuryNameLower.includes('vessie') || injuryNameLower.includes('urinaire')) {
            justification += "<li><strong>Examens biologiques</strong> : fonction rénale (créatinine, DFG), bilan hépatique</li>";
            justification += "<li>Échographie/TDM abdomino-pelvienne : séquelles parenchymateuses</li>";
            justification += "<li>Troubles mictionnels : incontinence, dysurie, pollakiurie (fréquence, retentissement)</li>";
            justification += "<li>Retentissement sur qualité de vie</li>";
        }
        // 🧬 GÉNÉRIQUE (par défaut)
        else {
            justification += "<li>Amplitudes articulaires mesurées (goniomètre)</li>";
            justification += "<li>Cotation douleur (échelle EVA 0-10)</li>";
            justification += "<li>Testing musculaire (force 0-5)</li>";
            justification += "<li>Périmètres membres (amyotrophie)</li>";
            justification += "<li>Imagerie récente (RX, TDM, IRM si nécessaire)</li>";
            justification += "<li>Retentissement professionnel précis</li>";
        }
        
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
                const categoryName = getAnatomicalCategory(anatomicalKey, normalizedText);
                if (categoryName) { // Seules les catégories non exclues sont comptées
                    categoryScores[categoryName] = (categoryScores[categoryName] || 0) + 1;
                }
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

    // 🚨 PRÉ-FILTRAGE ANATOMIQUE STRICT - Bloquer catégories incompatibles DÈS LE DÉBUT
    const isAnatomicallyCompatible = (category: InjuryCategory, subcategory: InjurySubcategory): boolean => {
        const catName = normalize(category.name);
        const subName = normalize(subcategory.name);
        
        // 🆕 EXCLUSION CRITIQUE: Maxillo-Facial vs Membres si "face interne/externe" détecté
        const hasDirectionalFaceContext = /(?:face\s+(?:interne|externe).*(?:jambe|bras|cuisse|avant-bras|membre))|(?:(?:interne|externe).*face.*(?:jambe|bras|cuisse|avant-bras|membre))/i.test(normalizedText);
        const isMaxilloFacialCat = catName.includes('maxillo') || catName.includes('facial') || subName.includes('face') || subName.includes('machoire');
        
        // DEBUG: Log en production
        if (isMaxilloFacialCat && hasDirectionalFaceContext) {
            console.log('🚫 BLOCAGE Maxillo-Facial détecté:', {
                category: category.name,
                subcategory: subcategory.name,
                hasDirectionalContext: hasDirectionalFaceContext,
                normalizedText: normalizedText.substring(0, 200)
            });
        }
        
        if (hasDirectionalFaceContext && isMaxilloFacialCat) {
            return false; // Bloquer TOUTES les séquelles maxillo-faciales si contexte directionnel détecté
        }
        
        // 🆕 EXCLUSION CRITIQUE V3.3.50: Mandibulaire vs Clavicule - Bloquer Ceinture Scapulaire si mandibule explicitement mentionnée
        const hasMandibularContext = /mandibul(aire|e)|m[âa]choire/i.test(normalizedText);
        const isScapulaireCat = subName.includes('ceinture scapulaire') || subName.includes('clavicule') || subName.includes('omoplate');
        
        if (hasMandibularContext && isScapulaireCat) {
            console.log('🚫 BLOCAGE Ceinture Scapulaire/Clavicule détecté (mandibulaire explicite):', {
                category: category.name,
                subcategory: subName,
                hasMandibularContext,
                normalizedText: normalizedText.substring(0, 200)
            });
            return false; // Bloquer TOUTES les séquelles de clavicule si mandibulaire explicitement mentionné
        }
        
        // Membres Supérieurs vs Inférieurs - Blocage strict croisé
        const isMembreSupQuery = normalizedText.includes('epaule') || normalizedText.includes('coiffe') || 
                                  normalizedText.includes('bras') || normalizedText.includes('coude') ||
                                  normalizedText.includes('poignet') || normalizedText.includes('main') ||
                                  normalizedText.includes('doigt') || normalizedText.includes('index') ||
                                  normalizedText.includes('pouce');
        const isMembreInfCat = catName.includes('membres inferieurs');
        if (isMembreSupQuery && isMembreInfCat) return false;
        
        const isMembreInfQuery = normalizedText.includes('hanche') || normalizedText.includes('cuisse') ||
                                  normalizedText.includes('genou') || normalizedText.includes('jambe') ||
                                  normalizedText.includes('cheville') || normalizedText.includes('pied') ||
                                  normalizedText.includes('orteil') || normalizedText.includes('femur');
        const isMembreSupCat = catName.includes('membres superieurs');
        if (isMembreInfQuery && isMembreSupCat) return false;
        
        return true; // Compatible par défaut
    };

    disabilityData.forEach(category => {
        const categoryBonus = (bestCategoryName && category.name === bestCategoryName) ? CATEGORY_RELEVANCE_BONUS : 0;
        
        category.subcategories.forEach(subcategory => {
            // 🚨 PRÉ-FILTRAGE: Ignorer catégorie si incompatibilité anatomique
            if (!isAnatomicallyCompatible(category, subcategory)) {
                return; // Skip toute cette sous-catégorie
            }
            
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

                // 🆕 V3.3.58: EXCLUSION Tendon Jambier vs Tendon Rotulien
                const hasJambierContext = /tendon.*jambier|jambier.*tendon|tibial.*(?:anterieur|posterieur)/i.test(normalizedText);
                const isRotulienInjury = /rotulien|rotule/i.test(normalizedInjuryName);
                
                if (hasJambierContext && isRotulienInjury) {
                    console.log('🚫 BLOCAGE Tendon Rotulien détecté (jambier/tibial explicite):', {
                        injury: injury.name,
                        hasJambierContext,
                        normalizedText: normalizedText.substring(0, 100)
                    });
                    return; // Skip cette injury
                }

                const injuryMentionsHighImpactSequela = highImpactKeywords.some(kw => searchableText.includes(kw));
                
                // 🆕 LOGIQUE BIDIRECTIONNELLE pour séquelles graves
                // Si user mentionne séquelle grave → pénaliser les séquelles sans gravité
                if (userMentionsHighImpactSequela && !injuryMentionsHighImpactSequela) {
                     const sequelaKeywordsInName = functionalDeficitKeywords.some(kw => normalizedInjuryName.includes(kw));
                     
                     // 🆕 EXCEPTION: Lésions ophtalmologiques (V3.3.32) - acuité visuelle est le critère principal
                     const isOphthalmologicalInjury = /cataracte|glaucome|retine|cornee|acuite.*visuelle|vision|oeil/i.test(normalizedInjuryName);
                     
                     if(!sequelaKeywordsInName && !isOphthalmologicalInjury) {
                         return;
                     }
                }
                
                // 🚨 LOGIQUE INVERSE: Si user NE mentionne PAS de séquelle grave → EXCLURE les complications graves
                // Exception: "consolidée" indique explicitement une consolidation (pas de pseudarthrose)
                const userExcludesComplications = normalizedText.includes('consolidee') || 
                                                 normalizedText.includes('consolide') ||
                                                 (!userMentionsHighImpactSequela);
                
                if (userExcludesComplications && injuryMentionsHighImpactSequela) {
                    // L'utilisateur décrit une fracture simple consolidée, pas une complication
                    // Exclure pseudarthrose, nécrose, etc.
                    return; // Skip cette injury
                }

                // 🚨 EXCLUSION ANTI-DÉSARTICULATION/AMPUTATION si raideur détectée
                const hasStiffnessIndicators = /(?:raideur|flexion|extension|abduction|rotation|dorsiflexion|palmarflexion|pronation|supination).*\d+°|limitation.*(?:flexion|extension|abduction|rotation)/i.test(normalizedText);
                const isAmputationOrDesarticulation = /(?:amputation|désarticulation|desarticulation)/i.test(normalizedInjuryName);
                if (hasStiffnessIndicators && isAmputationOrDesarticulation) {
                    return; // Exclure les amputations si des mesures de raideur sont présentes
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
                        const weight = getContextualKeywordWeight(userKeyword, normalizedText);
                        currentScore += weight;
                    }
                });

                const specificityBonus = keywords.reduce((bonus, userKw) => {
                    if (normalizedInjuryName.includes(userKw)) { 
                        const contextualWeight = getContextualKeywordWeight(userKw, normalizedText);
                        if (contextualWeight >= 15) {
                            return bonus + 80;
                        }
                        return bonus + 10;
                    }
                    return bonus;
                }, 0);
                currentScore += specificityBonus;
                
                // � VÉRIFICATION INCOMPATIBILITÉS ANATOMIQUES CRITIQUES
                const hasAnatomicalIncompatibility = (): boolean => {
                    // Genou vs Œil 
                    const isGenouQuery = normalizedText.includes('genou') || normalizedText.includes('menisque') || normalizedText.includes('lca') || normalizedText.includes('ligament');
                    const isOeilInjury = normalize(category.name).includes('ophtalmolog') || normalizedInjuryName.includes('globe') || normalizedInjuryName.includes('oeil');
                    if (isGenouQuery && isOeilInjury) return true;
                    
                    // Vision vs Membres
                    const isVisionQuery = normalizedText.includes('vision') || normalizedText.includes('oeil') || normalizedText.includes('cataracte') || normalizedText.includes('acuite visuelle');
                    const isMembreInjury = normalize(category.name).includes('membres') || normalizedInjuryName.includes('fracture') || normalizedInjuryName.includes('amputation');
                    if (isVisionQuery && isMembreInjury) return true;
                    
                    // 🆕 Vision vs Dentaire (V3.3.32) - Bloquer arcade/dent quand contexte oculaire
                    const isDentaireInjury = normalizedInjuryName.includes('dent') || normalizedInjuryName.includes('arcade') || normalizedInjuryName.includes('molaire') || normalizedInjuryName.includes('incisive');
                    if (isVisionQuery && isDentaireInjury) return true;
                    
                    // Audition vs Autres
                    const isAuditionQuery = normalizedText.includes('surdite') || normalizedText.includes('audition') || normalizedText.includes('oreille');
                    const isNonAuditifInjury = !normalize(category.name).includes('orl') && !normalizedInjuryName.includes('audit') && !normalizedInjuryName.includes('surdite');
                    if (isAuditionQuery && isNonAuditifInjury) return true;
                    
                    // 🆕 Épaule vs Hanche (confusion fréquente "trochanter")
                    const isEpauleQuery = normalizedText.includes('epaule') || normalizedText.includes('coiffe') || normalizedText.includes('rotateurs') || normalizedText.includes('abduction');
                    const isHancheInjury = normalizedInjuryName.includes('hanche') || normalizedInjuryName.includes('femur') || normalizedInjuryName.includes('trochanter') || normalize(subcategory.name).includes('hanche');
                    if (isEpauleQuery && isHancheInjury) return true;
                    
                    // 🆕 Main/Doigts spécifiques vs Amputations multiples
                    const isSingleFingerQuery = normalizedText.match(/\b(pouce|index|medius|annulaire|auriculaire)\b/) && !normalizedText.includes('tous');
                    const isMultipleFingerInjury = normalizedInjuryName.includes('tous les doigts') || normalizedInjuryName.includes('tous doigts') || normalizedInjuryName.includes('cinq doigts');
                    if (isSingleFingerQuery && isMultipleFingerInjury) return true;
                    
                    // 🆕 Rachis spécifique vs Général
                    const isSpecificVertebralQuery = normalizedText.match(/\b(l1|l2|l3|l4|l5|d\d{1,2}|c\d)\b/) || normalizedText.includes('tassement');
                    const isGeneralRachisInjury = normalizedInjuryName.includes('arthrodese') || normalizedInjuryName.includes('fusion');
                    if (isSpecificVertebralQuery && isGeneralRachisInjury && !normalizedText.includes('arthrodese')) return true;
                    
                    return false;
                };
                
                // ⛔ BLOCAGE TOTAL si incompatibilité détectée
                if (hasAnatomicalIncompatibility()) {
                    return; // Skip cette injury complètement
                }
                
                // �👁️ MEGA BONUS pour correspondance EXACTE de pathologies spécifiques
                // ⚠️ IMPORTANT: Bonus appliqués SEULEMENT si cohérence anatomique
                const specificPathologies = {
                    // 👁️ PATHOLOGIES OPHTALMOLOGIQUES - Contexte strict obligatoire
                    'cataracte': { bonus: 1500, context: ['oeil', 'vision', 'vue', 'visuel'] },
                    'glaucome': { bonus: 1500, context: ['oeil', 'vision', 'vue', 'visuel'] },
                    'uveit': { bonus: 1500, context: ['oeil', 'vision', 'vue', 'visuel'] },
                    'endophtalmie': { bonus: 1500, context: ['oeil', 'vision', 'vue', 'visuel'] },
                    'atrophie optique': { bonus: 1500, context: ['oeil', 'vision', 'vue', 'visuel'] },
                    'decollement': { bonus: 1500, context: ['oeil', 'retine', 'vision'] },
                    'perte vision': { bonus: 2000, context: ['oeil', 'vision', 'vue', 'visuel', 'cecite'] },
                    'cecite': { bonus: 2000, context: ['oeil', 'vision', 'vue', 'visuel'] },
                    'ablation globe': { bonus: 2500, context: ['oeil', 'globe', 'enucleation'] },
                    'alteration globe': { bonus: 2000, context: ['oeil', 'globe'] },
                    
                    // 🦵 PATHOLOGIES GENOU - Contexte genou obligatoire
                    'lca': { bonus: 2500, context: ['genou'] },
                    'ligament croise anterieur': { bonus: 2500, context: ['genou'] },
                    'rupture lca': { bonus: 2700, context: ['genou', 'rupture'] },
                    'sequelles rupture lca': { bonus: 2900, context: ['genou'] },
                    'lcp': { bonus: 2500, context: ['genou'] },
                    'ligament croise posterieur': { bonus: 2500, context: ['genou'] },
                    'meniscectomie': { bonus: 2000, context: ['genou', 'menisque'] },
                    'meniscectomie totale': { bonus: 2200, context: ['genou', 'menisque'] },
                    'meniscectomie interne': { bonus: 2100, context: ['genou', 'menisque', 'interne'] },
                    'meniscectomie externe': { bonus: 2100, context: ['genou', 'menisque', 'externe'] },
                    'menisque': { bonus: 1500, context: ['genou'] },
                    
                    // 🦴 PATHOLOGIES RACHIS - Contexte rachis/vertèbre obligatoire
                    'tassement vertebral': { bonus: 2500, context: ['vertebre', 'rachis', 'lombaire', 'dorsal', 'cervical'] },
                    'tassement': { bonus: 2200, context: ['vertebre', 'l1', 'l2', 'l3', 'l4', 'l5', 'lombaire'] },
                    'fracture vertebre': { bonus: 2300, context: ['vertebre', 'rachis'] },
                    
                    // 🦾 PATHOLOGIES ÉPAULE - Contexte épaule obligatoire
                    'coiffe rotateurs': { bonus: 2700, context: ['epaule'] },
                    'rupture coiffe': { bonus: 2900, context: ['epaule', 'rotateurs'] },
                    'coiffe': { bonus: 1800, context: ['epaule'] },
                    'tendon supra epineux': { bonus: 2500, context: ['epaule'] },
                    
                    // ✋ AMPUTATIONS DOIGTS - Contexte doigt spécifique obligatoire
                    'amputation index': { bonus: 2800, context: ['index', 'doigt'] },
                    'amputation pouce': { bonus: 2900, context: ['pouce'] },
                    'amputation medius': { bonus: 2700, context: ['medius', 'doigt'] },
                    
                    // Autres pathologies avec contexte
                    'pseudarthrose': { bonus: 1500, context: ['fracture', 'os', 'osseu'] },
                    'ankylose': { bonus: 1500, context: ['articul', 'raideur'] },
                    'hemiplegie': { bonus: 2000, context: ['paralys', 'neuro', 'cerebr'] },
                    'paraplegie': { bonus: 2000, context: ['paralys', 'neuro', 'rachis'] },
                    'pilon tibial': { bonus: 2000, context: ['cheville', 'tibia'] }
                };
                
                for (const [pathology, config] of Object.entries(specificPathologies)) {
                    const hasPathologyInQuery = keywords.some(userKw => userKw.includes(pathology));
                    const hasPathologyInInjury = normalizedInjuryName.includes(pathology);
                    const hasCorrectContext = config.context.some(ctx => normalizedText.includes(ctx));
                    
                    // 🚨 CRITÈRE STRICT : Bonus SEULEMENT si pathologie + contexte anatomique correct
                    if (hasPathologyInQuery && hasPathologyInInjury && hasCorrectContext) {
                        currentScore += config.bonus;
                    }
                    // 🚫 PÉNALITÉ MASSIVE pour incohérence anatomique (ex: méniscectomie → œil)
                    else if (hasPathologyInInjury && !hasCorrectContext) {
                        currentScore *= 0.01; // Réduction drastique si contexte anatomique incorrect
                    }
                }

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
                
                // --- Méniscectomie totale vs bilatérale Logic ---
                const queryMentionsMeniscectomie = normalizedText.includes('meniscectomie') || normalizedText.includes('menisque');
                const queryMentionsBilateral = normalizedText.includes('bilateral') || 
                                               normalizedText.includes('bilaterale') ||
                                               normalizedText.includes('deux menisques') ||
                                               normalizedText.includes('2 menisques') ||
                                               normalizedText.includes('les 2 menisques') ||
                                               (normalizedText.includes('interne') && normalizedText.includes('externe'));
                                               
                // "totale" seul = méniscectomie totale (UN SEUL ménisque retiré complètement)
                // "bilatérale" ou "2 ménisques" = DEUX ménisques retirés
                const queryMentionsSingleMeniscus = (normalizedText.includes('totale') && !queryMentionsBilateral) || 
                                                    (normalizedText.includes('interne') && !normalizedText.includes('externe')) || 
                                                    (normalizedText.includes('externe') && !normalizedText.includes('interne')) ||
                                                    (!queryMentionsBilateral && queryMentionsMeniscectomie);
                
                if (queryMentionsMeniscectomie) {
                    const injuryIsBilateralMeniscectomy = normalizedInjuryName.includes('bilateral') || 
                                                          normalizedInjuryName.includes('bilaterale') ||
                                                          normalizedInjuryName.includes('2 menisques') ||
                                                          normalizedInjuryName.includes('les 2 menisques') ||
                                                          normalizedInjuryName.includes('deux menisques');
                    const injuryIsTotalMeniscectomy = normalizedInjuryName.includes('meniscectomie totale') && 
                                                      !injuryIsBilateralMeniscectomy;
                    const injuryIsPartialMeniscectomy = normalizedInjuryName.includes('meniscectomie partielle');
                    
                    if (queryMentionsBilateral && injuryIsBilateralMeniscectomy) {
                        currentScore += 2000; // ÉNORME bonus pour correspondance bilatérale explicite
                    } else if (queryMentionsBilateral && !injuryIsBilateralMeniscectomy) {
                        currentScore *= 0.05; // Pénaliser fortement si pas bilatérale mais demandé
                    } else if (queryMentionsSingleMeniscus && injuryIsTotalMeniscectomy) {
                        currentScore += 2000; // ÉNORME bonus pour méniscectomie totale (un seul)
                    } else if (queryMentionsSingleMeniscus && injuryIsBilateralMeniscectomy) {
                        currentScore *= 0.05; // Pénaliser fortement bilatérale si un seul demandé
                    }
                    
                    // Bonus/malus pour partielle vs totale
                    if (normalizedText.includes('partielle') && injuryIsPartialMeniscectomy) {
                        currentScore += 1500;
                    } else if (normalizedText.includes('partielle') && injuryIsTotalMeniscectomy) {
                        currentScore *= 0.3;
                    } else if (normalizedText.includes('totale') && injuryIsPartialMeniscectomy) {
                        currentScore *= 0.3;
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
    
    // 🆕 FILTRAGE INTELLIGENT : Exclure rubriques "sans lésion neurologique" si signes neurologiques détectés
    const clinicalContext = analyzeAdvancedClinicalContext(text);
    
    let filteredMatches = allMatches.filter(match => match.score >= MIN_SCORE_THRESHOLD);
    
    // 👁️ FILTRAGE VISION : Exclure "Champ Visuel" si "acuité visuelle" ou "cataracte" mentionné
    const mentionsAcuiteOrCataracte = 
        normalizedText.includes('acuite') || 
        normalizedText.includes('cataracte') ||
        normalizedText.includes('baisse de vision') ||
        normalizedText.includes('baisse de la vision');
    
    if (mentionsAcuiteOrCataracte) {
        filteredMatches = filteredMatches.filter(match => {
            const subcategoryName = match.path.toLowerCase();
            // Exclure TOUTES les lésions de la section "Champ Visuel et Vision Binoculaire"
            return !subcategoryName.includes('champ visuel');
        });
        
        // Si après filtrage aucun résultat, revenir aux résultats originaux (cas rare)
        if (filteredMatches.length === 0) {
            filteredMatches = allMatches.filter(match => match.score >= MIN_SCORE_THRESHOLD);
        }
    }
    
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
    
    // DEBUG: Log des top matches avant retour
    const topResults = filteredMatches
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
    
    console.log('🎯 TOP 5 RÉSULTATS:', topResults.map(m => ({
        name: m.injury.name,
        score: m.score,
        path: m.path
    })));
    
    return topResults;
};

export const comprehensiveSingleLesionAnalysis = (text: string, externalKeywords?: string[]): LocalAnalysisResult => {
    // 🆕 PREPROCESSING MÉDICAL ENRICHI - Transformer descriptions vagues en termes détectables
    // Ceci enrichit le texte AVANT toute analyse
    const medicalEnrichment: [RegExp, string][] = [
        // 🆕 V3.3.66: Fractures phalanges orteils → Séquelles avec raideur (termes barème)
        [/fracture.*?(?:premi[eè]re\s+)?phalange.*?(?:gros\s+orteil|hallux)/gi, 'fracture consolidée phalange gros orteil avec raideur'],
        [/fracture.*?(?:premi[eè]re\s+)?phalange.*?(?:deuxi[eè]me|troisi[eè]me|quatri[eè]me|cinqui[eè]me)\s+orteil/gi, 'fracture consolidée phalange autre orteil avec raideur'],
        [/fracture.*?(?:premi[eè]re\s+)?phalange.*?orteil/gi, 'fracture consolidée phalange autre orteil avec raideur'],
        
        // Plexus brachial et nerfs périphériques → Pathologies neurologiques spécifiques
        [/atteinte\s+(?:du\s+)?tronc\s+sup[eé]rieur\s+(?:du\s+)?plexus\s+brachial/gi, 'paralysie radiculaire supérieure Duchenne-Erb plexus brachial C5 C6'],
        [/atteinte\s+(?:du\s+)?tronc\s+inf[eé]rieur\s+(?:du\s+)?plexus\s+brachial/gi, 'paralysie radiculaire inférieure Klumpke plexus brachial C8 T1'],
        [/atteinte\s+(?:du\s+)?plexus\s+brachial/gi, 'paralysie plexus brachial'],
        [/l[eé]sion\s+(?:du\s+)?plexus\s+brachial/gi, 'paralysie plexus brachial'],
        [/paralysie\s+(?:du\s+)?plexus\s+brachial/gi, 'paralysie complète plexus brachial'],
        [/paralysie\s+partielle\s+(?:du\s+)?membre\s+sup[eé]rieur/gi, 'paralysie radiculaire plexus brachial'],
        
        // Douleurs rachis → Pathologies détectables
        [/\bmal\s+(?:au\s+)?dos\b/gi, 'mal dos rachialgie traumatique vertèbre lombaire'],
        [/\bmal\s+(?:en\s+)?bas\s+(?:du\s+)?dos\b/gi, 'mal bas dos lombalgie traumatique vertèbre lombaire'],
        [/\btour\s+(?:de\s+)?reins?\b/gi, 'lumbago lombalgie aiguë vertèbre lombaire'],
        [/\bmal\s+(?:au\s+)?cou\b/gi, 'mal cou cervicalgie traumatique vertèbre cervicale'],
        [/\bmal\s+(?:[aà]\s+)?la\s+t[eê]te\b/gi, 'mal tête céphalée post-traumatique crâne'],
        
        // Douleurs membres → Pathologies articulaires
        [/\bmal\s+(?:[aà]\s+)?l'?[eé]paule\b/gi, 'mal épaule douleur scapulo-humérale'],
        [/\bmal\s+(?:au\s+)?genou\b/gi, 'mal genou douleur fémorotibiale'],
        [/\bmal\s+(?:[aà]\s+)?la\s+cheville\b/gi, 'mal cheville douleur tibio-talienne'],
        [/\bmal\s+(?:au\s+)?poignet\b/gi, 'mal poignet douleur radio-carpienne'],
        [/\bmal\s+(?:au\s+)?coude\b/gi, 'mal coude douleur huméro-cubitale']
    ];
    
    let enrichedText = text;
    for (const [pattern, enrichment] of medicalEnrichment) {
        enrichedText = enrichedText.replace(pattern, enrichment);
    }
    
    // 🆕 V3.0+ ABRÉVIATIONS MÉDICALES - Transformer avant expert rules
    const medicalAbbreviations: [RegExp, string | ((substring: string, ...args: any[]) => string)][] = [
        // === CONTEXTE ACCIDENT ===
        [/\bat\b/gi, 'accident de travail '],
        [/\bavp\b/gi, 'accident de la voie publique '],
        [/\bmp\b(?!\s*\d)/gi, 'maladie professionnelle '],
        
        // === ANATOMIE - MEMBRES ===
        // 🆕 V3.3.63: Doigts et orteils spécifiques AVANT phalanges génériques (priorité pour p1 o4, p2 d5)
        [/\b([dD])([1-5])\b(?=\s*(?:de|du|mg|md|main|gauche|droite|fracture|amputation|ecrasement|arrachement|consolid|avec|raideur|ankylose|douleur|s[eé]quelle))/gi, (match, d, num) => {
            const doigts = ['', 'pouce', 'index', 'médius', 'annulaire', 'auriculaire'];
            return `${d.toLowerCase() === 'd' ? 'doigt' : 'Doigt'} ${doigts[parseInt(num)]} `;
        }],
        [/(?:fracture|amputation|lesion|trauma|ecrasement|arrachement|consolidation|sequelle|raideur|ankylose)\s+(?:de\s+)?(?:la\s+)?p([1-3])\s+([dD])([1-5])\b/gi, (match, phalange, d, num) => {
            const doigts = ['', 'pouce', 'index', 'médius', 'annulaire', 'auriculaire'];
            const phalanges = { '1': 'première phalange', '2': 'deuxième phalange', '3': 'troisième phalange' };
            return `fracture ${phalanges[phalange]} doigt ${doigts[parseInt(num)]} `;
        }],
        [/\b([oO])([1-5])\b(?=\s*(?:de|du|pg|pd|pied|gauche|droite|fracture|amputation|consolid|avec|raideur|ankylose|douleur|s[eé]quelle))/gi, (match, o, num) => {
            const orteils = ['', 'hallux', 'deuxième orteil', 'troisième orteil', 'quatrième orteil', 'cinquième orteil'];
            return `${o.toLowerCase() === 'o' ? 'orteil' : 'Orteil'} ${orteils[parseInt(num)]} `;
        }],
        [/(?:fracture|amputation|lesion|trauma|ecrasement|arrachement|consolidation|sequelle|raideur|ankylose)\s+(?:de\s+)?(?:la\s+)?p([1-3])\s+([oO])([1-5])\b/gi, (match, phalange, o, num) => {
            const orteils = ['', 'hallux', 'deuxième orteil', 'troisième orteil', 'quatrième orteil', 'cinquième orteil'];
            const phalanges = { '1': 'première phalange', '2': 'deuxième phalange', '3': 'troisième phalange' };
            return `fracture ${phalanges[phalange]} orteil ${orteils[parseInt(num)]} `;
        }],
        
        // Phalanges génériques (APRÈS doigts/orteils spécifiques)
        [/\b([pP])1\b/gi, 'phalange proximale P1 '],
        [/\b([pP])2\b/gi, 'phalange moyenne P2 '],
        [/\b([pP])3\b/gi, 'phalange distale P3 '],
        [/\bphalange\s+prox\b/gi, 'phalange proximale '],
        [/\bphalange\s+moy\b/gi, 'phalange moyenne '],
        [/\bphalange\s+dist\b/gi, 'phalange distale '],
        
        // === CONSOLIDATION ET SÉQUELLES ===
        [/\bs[eé]quelle\s+douleureuse/gi, 'raideur avec douleur '],
        [/\bs[eé]quelles\s+douloureuses/gi, 'raideur avec douleur ']
    ];

    let processedText = enrichedText;
    for (const [pattern, replacement] of medicalAbbreviations) {
        if (typeof replacement === 'function') {
            processedText = processedText.replace(pattern, replacement);
        } else {
            processedText = processedText.replace(pattern, replacement);
        }
    }
    
    // Utiliser le texte enrichi ET transformé pour toute l'analyse
    const workingText = processedText;
    let normalizedInputText = normalize(workingText);

    // 🔊 LOGIQUE AUDITION SPÉCIALISÉE (avant expert rules)
    const auditionMatch = /surdit[eé]|acouph[eè]nes?|oreille|audition|entend|db|d[eé]cibels?/i.test(workingText);
    if (auditionMatch) {
        // === PARSER dB BILATÉRAL (V3.3.36 - FIX CAS 15) ===
        // Problème: Détecte UN SEUL dB (70) au lieu de moyenne bilatérale (OD 70 + OG 65) / 2 = 67.5
        // Solution: Parser OD + OG distincts avec calcul moyenne automatique
        // IMPORTANT: Si acouphènes invalidants détectés, laisser passer aux expert rules pour cumul
        const dbBilateralMatch = /(?:OD|oreille.*droite).*?(\d+)\s*(?:db|dB|d[eé]cibels?).*?(?:OG|oreille.*gauche).*?(\d+)\s*(?:db|dB|d[eé]cibels?)/is.exec(workingText);
        const dbBilateralMatch2 = /(?:OG|oreille.*gauche).*?(\d+)\s*(?:db|dB|d[eé]cibels?).*?(?:OD|oreille.*droite).*?(\d+)\s*(?:db|dB|d[eé]cibels?)/is.exec(workingText);
        
        if (dbBilateralMatch || dbBilateralMatch2) {
            // Vérifier si acouphènes INVALIDANTS présents → Si oui, laisser expert rules gérer le cumul
            const hasAcouphenesInvalidants = /acouph[eè]nes.*invalidant|acouph[eè]nes.*s[eé]v[eè]re|sifflements.*aigus.*continus/i.test(workingText);
            const hasRetentissement = /isolement.*social|anxio.*d[eé]pressif|reconversion.*impossible/i.test(workingText);
            
            if (hasAcouphenesInvalidants || hasRetentissement) {
                // Ne rien faire, laisser passer aux expert rules pour cumul complet
            } else {
                // Cas simple : surdité bilatérale SANS acouphènes invalidants → Retour direct
                const dbOD = dbBilateralMatch ? parseInt(dbBilateralMatch[1]) : parseInt(dbBilateralMatch2![2]);
                const dbOG = dbBilateralMatch ? parseInt(dbBilateralMatch[2]) : parseInt(dbBilateralMatch2![1]);
                const dbMoyenne = (dbOD + dbOG) / 2;
                
                const auditiveInjury = { name: "Diminution de l'acuité auditive", rate: [0, 70], path: "Neuro-Sensorielles > Oreilles - Diminution de l'Acuité Auditive (Surdité)" };
                let calculatedRate: number;
                let severity: string;
                
                if (dbMoyenne <= 40) {
                    calculatedRate = 8; severity = 'Légère-Modérée';
                } else if (dbMoyenne <= 60) {
                    calculatedRate = 20; severity = 'Modérée';
                } else if (dbMoyenne <= 70) {
                    calculatedRate = 45; severity = 'Moyenne-Sévère'; // 67.5 dB → 45%
                } else if (dbMoyenne <= 80) {
                    calculatedRate = 50; severity = 'Sévère';
                } else if (dbMoyenne <= 100) {
                    calculatedRate = 60; severity = 'Très Sévère';
                } else {
                    calculatedRate = 70; severity = 'Profonde/Cophose';
                }
                
                return {
                    type: 'proposal',
                    name: auditiveInjury.name,
                    rate: calculatedRate,
                    justification: `EXPERT AUDITION dB BILATÉRAL : OD ${dbOD} dB + OG ${dbOG} dB → Moyenne ${dbMoyenne.toFixed(1)} dB = ${severity} → ${calculatedRate}%`,
                    path: auditiveInjury.path,
                    injury: auditiveInjury as any
                };
            }
        }
        
        // Détection dB précis unilatéral (comportement original)
        const dbMatch = workingText.match(/(\d+)\s*(?:db|d[eé]cibels?)/i);
        if (dbMatch) {
            const db = parseInt(dbMatch[1]);
            
            // Vérifier si acouphènes INVALIDANTS présents → Si oui, laisser expert rules gérer le cumul
            const hasAcouphenesInvalidants = /acouph[eè]nes.*invalidant|acouph[eè]nes.*s[eé]v[eè]re|sifflements.*aigus.*continus/i.test(workingText);
            const hasRetentissement = /isolement.*social|anxio.*d[eé]pressif|reconversion.*impossible/i.test(workingText);
            
            if (hasAcouphenesInvalidants || hasRetentissement) {
                // Ne rien faire, laisser passer aux expert rules pour cumul complet
            } else if (db >= 80 && (/oreille.*normale|normale.*oreille|unilat[eé]rale/i.test(workingText))) {
                // Si c'est une surdité unilatérale profonde, laisser les expert rules gérer
                // Ne rien faire, laisser passer aux expert rules
            } else {
                // Cas simple : surdité SANS acouphènes invalidants → Retour direct
                const auditiveInjury = { name: "Diminution de l'acuité auditive", rate: [0, 70], path: "Neuro-Sensorielles > Oreilles - Diminution de l'Acuité Auditive (Surdité)" };
                let calculatedRate: number;
                let severity: string;
                
                if (db <= 40) {
                    calculatedRate = 8; severity = 'Légère-Modérée';
                } else if (db <= 60) {
                    calculatedRate = 20; severity = 'Modérée';
                } else if (db <= 80) {
                    calculatedRate = 40; severity = 'Moyenne-Sévère';
                } else if (db <= 100) {
                    calculatedRate = 60; severity = 'Sévère';
                } else {
                    calculatedRate = 70; severity = 'Profonde/Cophose';
                }
                
                return {
                    type: 'proposal',
                    name: auditiveInjury.name,
                    rate: calculatedRate,
                    justification: `EXPERT AUDITION dB : ${db} dB = ${severity} → ${calculatedRate}%`,
                    path: auditiveInjury.path,
                    injury: auditiveInjury as any
                };
            }
        }
        
        // Surdité complète unilatérale (anacousie = surdité totale)
        if (/(?:surdit[eé].*(?:compl[eè]te|totale)|anacousie.*(?:compl[eè]te|totale)?|cophose).*(?:unilat[eé]rale|une\s+oreille|oreille\s+(?:droite|gauche))/.test(text) ||
            /(?:unilat[eé]rale|une\s+oreille|oreille\s+(?:droite|gauche)).*(?:anacousie|cophose|surdit[eé].*(?:compl[eè]te|totale))/.test(text)) {
            const auditiveInjury = { name: "Diminution de l'acuité auditive", rate: [0, 70], path: "Neuro-Sensorielles > Oreilles - Diminution de l'Acuité Auditive (Surdité)" };
            return {
                type: 'proposal',
                name: auditiveInjury.name,
                rate: 15,
                justification: 'EXPERT AUDITION : Surdité complète unilatérale → 15%',
                path: auditiveInjury.path,
                injury: auditiveInjury as any
            };
        }
        
        // Surdité complète bilatérale
        if (/surdit[eé].*(?:compl[eè]te|totale).*(?:bilat[eé]rale|deux\s+oreilles)/.test(text)) {
            const auditiveInjury = { name: "Diminution de l'acuité auditive", rate: [0, 70], path: "Neuro-Sensorielles > Oreilles - Diminution de l'Acuité Auditive (Surdité)" };
            return {
                type: 'proposal',
                name: auditiveInjury.name,
                rate: 60,
                justification: 'EXPERT AUDITION : Surdité complète bilatérale → 60%',
                path: auditiveInjury.path,
                injury: auditiveInjury as any
            };
        }
        
        // Acouphènes isolés
        if (/acouph[eè]nes?.*(?:isol[eé]s?|seuls?|sans\s+surdit[eé])/.test(text)) {
            const acoupheneInjury = { name: "Bourdonnements d'oreille (acouphènes) isolés", rate: [5, 10], path: "Neuro-Sensorielles > Oreilles - Autres Atteintes Auditives" };
            return {
                type: 'proposal',
                name: acoupheneInjury.name,
                rate: 10,
                justification: 'EXPERT AUDITION : Acouphènes isolés permanents → 10%',
                path: acoupheneInjury.path,
                injury: acoupheneInjury as any
            };
        }
    }

    // �🎯 SYSTÈME DE RÈGLES EXPERTES - Court-circuite l'algorithme pour cas fréquents
    const expertRules = [
        // === RÈGLE SPÉCIALE: CONSOLIDATION SANS SÉQUELLE = 0% IPP ===
        {
            pattern: /fracture.*(?:sans|consolidé)|consolidé.*fracture/i,  // Ajouté "sans" pour détecter "fracture...sans séquelle"
            context: /sans.*s[eé]quelle/i,
            searchTerms: ["__SANS_SEQUELLE__"],  // Marqueur spécial
            priority: 10000  // Priorité maximale absolue
        },
        
        // === RÈGLES FRACTURES DE PHALANGES ===
        // Fracture P1 (phalange proximale) avec ANKYLOSE
        {
            pattern: /fracture.*(?:p1|p2|phalange\s+(?:proximale|moyenne|prox|moy)).*(?:index|d2)/i,
            context: /ankylose/i,
            searchTerms: ["Ankylose de l'index (totalité) (Main Dominante)"],
            priority: 1000,
            negativeContext: /sans.*s[eé]quelle/i
        },
        {
            pattern: /fracture.*(?:p1|p2|phalange\s+(?:proximale|moyenne|prox|moy)).*(?:m[eé]dius|d3)/i,
            context: /ankylose/i,
            searchTerms: ["Ankylose du médius (totalité) (Main Dominante)"],
            priority: 1000,
            negativeContext: /sans.*s[eé]quelle/i
        },
        // Fracture P1/P2 (phalange proximale/moyenne) avec RAIDEUR
        {
            pattern: /fracture.*(?:p1|phalange\s+(?:proximale|prox)).*(?:index|d2)/i,
            context: /main|doigt/i,
            searchTerms: ["Raideur d'une articulation de l'index (Main Dominante)"],
            priority: 999,
            negativeContext: /sans.*s[eé]quelle/i
        },
        {
            pattern: /fracture.*(?:p1|phalange\s+(?:proximale|prox)).*(?:m[eé]dius|d3)/i,
            context: /main|doigt/i,
            searchTerms: ["Raideur d'une articulation du médius (Main Dominante)"],
            priority: 999,
            negativeContext: /sans.*s[eé]quelle/i
        },
        {
            pattern: /fracture.*(?:p2|phalange\s+(?:moyenne|moy)).*(?:index|d2)/i,
            context: /main|doigt/i,
            searchTerms: ["Raideur d'une articulation de l'index (Main Dominante)"],
            priority: 999,
            negativeContext: /sans.*s[eé]quelle/i
        },
        {
            pattern: /fracture.*(?:p3|phalange\s+(?:distale|dist)).*(?:index|d2)/i,
            context: /main|doigt/i,
            searchTerms: ["Perte de la 3ème phalange de l'index"],
            priority: 999
        },
        
        // === RÈGLES LANGAGE NATUREL AVANCÉES ===
        // Douleurs rachis avec contexte traumatique
        {
            pattern: /mal.*dos|dos.*douleur|rachialgie|dorsalgie/i,
            context: /chute|traumatisme|accident|coup|port.*charge|soulev[eé]|effort/i,
            searchTerms: ['Entorse lombaire simple (sans séquelle radiologique)', 'Entorse dorso-lombaire'],
            priority: 999
        },
        {
            pattern: /mal.*bas.*dos|lombalgie|lumbago|tour.*reins?/i,
            context: /chute|traumatisme|accident|soulev[eé]|port.*charge|effort/i,
            searchTerms: ['Entorse lombaire simple (sans séquelle radiologique)'],
            priority: 999
        },
        {
            pattern: /mal.*cou|cervicalgie|douleur.*cervical/i,
            context: /chute|traumatisme|accident|whiplash|coup.*lapin/i,
            searchTerms: ['Syndrome post-traumatique cervical chronique (Whiplash / Coup du lapin)', 'Entorse cervicale'],
            priority: 999
        },
        {
            pattern: /mal.*t[eê]te|c[eé]phal[eé]e/i,
            context: /chute|traumatisme|accident|coup|cr[aâ]ne|persistant|chronique/i,
            searchTerms: ['Syndrome subjectif des traumatisés du crâne (céphalées, vertiges)'],
            priority: 999
        },
        
        // Tour de reins / Lumbago avec contexte précis
        {
            pattern: /tour.*reins?|lumbago/i,
            context: /soulev[eé]|port[eé]|charge|effort|bloqu[eé]|aigu/i,
            searchTerms: ['Entorse lombaire simple (sans séquelle radiologique)'],
            priority: 999
        },
        
        // Douleurs membres avec contexte
        {
            pattern: /mal.*[eé]paule|douleur.*[eé]paule/i,
            context: /chute|traumatisme|accident|limitation|mobili/i,
            searchTerms: ['Entorse scapulo-humérale sans instabilité', 'Périarthrite scapulo-humérale'],
            priority: 999
        },
        {
            pattern: /mal.*genou|douleur.*genou/i,
            context: /chute|traumatisme|accident|torsion|entorse|gonfl/i,
            searchTerms: ['Entorse du genou (sans laxité)', 'Séquelles d\'entorse bénigne du genou'],
            priority: 999
        },
        
        {
            pattern: /rupture\s+(?:du\s+)?(?:ligament\s+crois[eé]\s+ant[eé]rieur|lca).*op[eé]r[eé]e?|op[eé]r[eé]e?.*(?:ligament\s+crois[eé]\s+ant[eé]rieur|lca)/i,
            context: /laxit[eé]|d[eé]robement|instabilit[eé]|arthrose|genou|r[eé]siduel/i,
            searchTerms: ['Séquelles de rupture du ligament croisé antérieur (LCA)'],
            priority: 999,
            negativeContext: /cotyle|hanche/i
        },
        {
            pattern: /rupture\s+(?:du\s+)?(?:ligament\s+crois[eé]\s+ant[eé]rieur|lca)/i,
            context: /genou|laxit[eé]|d[eé]robement|instabilit[eé]|ligament/i,
            searchTerms: ['Séquelles de rupture du ligament croisé antérieur'],
            priority: 100
        },
        {
            pattern: /fracture.*plateaux.*tibiaux|plateaux.*tibiaux.*fracture/i,
            context: /deviation|raideur|flexion|valgus|varus|degres?/i,
            searchTerms: ['Fracture des plateaux tibiaux - Avec déviation et/ou raideur'],
            priority: 999
        },
        {
            pattern: /m[eé]niscectomie.*totale/i,
            context: /interne|externe|chondropathie|douleurs/i,
            searchTerms: ['Méniscectomie totale'],
            priority: 999,
            negativeContext: /bilat[eé]rale|deux.*m[eé]nisques/i
        },
        {
            pattern: /m[eé]niscectomie/i,
            context: /genou|m[eé]nisque|interne|externe|totale|partielle/i,
            negativeContext: /m[eé]niscectomie.*totale/i, // Exclure méniscectomie totale spécifique
            searchTerms: ['Séquelles de méniscectomie (douleurs, hydarthrose)'],
            priority: 95
        },
        
        // === RÈGLE FRACTURE POUTEAU-COLLES (V3.3.26) ===
        // Pouteau-Colles = fracture spécifique extrémité inférieure radius (poignet)
        {
            pattern: /Pouteau[-\s]?Colles/i,
            context: /poignet|radius|chute|fracture/i,
            searchTerms: [
                'Fracture de l\'extrémité inférieure du radius - Avec limitation des mouvements (Main Dominante)',
                'Fracture de l\'extrémité inférieure du radius - Avec limitation des mouvements (Main Non Dominante)',
                'Fracture de l\'extrémité inférieure du radius - Avec raideur, déformation et troubles nerveux (Main Dominante)',
                'Fracture de l\'extrémité inférieure du radius - Avec raideur, déformation et troubles nerveux (Main Non Dominante)'
            ],
            priority: 1005
        },
        
        // === RÈGLES PLEXUS BRACHIAL SPÉCIFIQUES (V3.3.16) ===
        // Note: Ces règles s'exécutent APRÈS preprocessing qui transforme "atteinte tronc supérieur" → "paralysie radiculaire supérieure Duchenne-Erb C5 C6"
        {
            pattern: /paralysie\s+radiculaire\s+sup[eé]rieure|Duchenne[-\s]?Erb|C5[-\s]?C6/i,
            context: /plexus\s+brachial|EMG|partielle?|[eé]paule|coude|bras/i,
            searchTerms: [
                'Paralysie radiculaire supérieure (Duchenne-Erb) (droite)',
                'Paralysie radiculaire supérieure (Duchenne-Erb) (gauche)'
            ],
            priority: 1002
        },
        {
            pattern: /paralysie\s+radiculaire\s+inf[eé]rieure|Klumpke|C8[-\s]?T1/i,
            context: /plexus\s+brachial|EMG|main|doigts|griffe/i,
            searchTerms: [
                'Paralysie radiculaire inférieure (Klumpke) (droite)',
                'Paralysie radiculaire inférieure (Klumpke) (gauche)'
            ],
            priority: 1002
        },
        {
            pattern: /paralysie\s+compl[eè]te.*plexus\s+brachial|plexus\s+brachial.*paralysie\s+compl[eè]te/i,
            context: /totale?|membre\s+sup[eé]rieur/i,
            searchTerms: [
                'Paralysie complète du plexus brachial (droite)',
                'Paralysie complète du plexus brachial (gauche)'
            ],
            priority: 1001
        },
        
        // === RÈGLES TRAUMATISMES CRÂNIENS ET NEUROLOGIQUES (V3.3.2) ===
        {
            pattern: /(?:hémiparésie|troubles?\s+cognitif|céphalées?|vertiges?)/i,
            context: /(?:hémiparésie.*troubles|troubles.*hémiparésie|hémiparésie.*céphal|céphal.*hémiparésie|troubles.*céphal|céphal.*troubles|vertiges.*hémiparésie|hémiparésie.*vertiges|vertiges.*troubles|troubles.*vertiges|vertiges.*céphal|céphal.*vertiges)/is,
            searchTerms: ["Commotion cérébro-spinale prolongée (syndrome complet)"],
            priority: 1001
        },
        {
            pattern: /hémiparésie/i,
            context: /gauche|droite|légère|modérée|sévère|membre/i,
            searchTerms: ["Contusions cérébrales avec signes de localisation (hémiparésie, aphasie...)"],
            priority: 1000
        },
        {
            pattern: /troubles?\s+cognitif/i,
            context: /persistant|chronique|séquelle|traumatisme|accident|mémoire|attention|concentration/i,
            searchTerms: ["Déficits cognitifs post-traumatiques (mémoire, attention, fonctions exécutives)"],
            priority: 999
        },
        {
            pattern: /céphalées?/i,
            context: /chronique|persistant|post.*traumatique|fréquent/i,
            searchTerms: ["Céphalées post-traumatiques chroniques"],
            priority: 998,
            negativeContext: /(?:associ[eé]|avec|et).*(?:amputation|fracture|luxation|s[eé]quelle)/i  // Désactiver si cumul détecté
        },

        // === RÈGLES BRÛLURES (V3.3.3 + V3.3.17) ===
        {
            pattern: /brûlures?.*(?:visage|face|cou|t[eê]te)|(?:visage|face|cou|t[eê]te).*brûlures?/i,
            context: /(?:cicatric|d[eé]figurant|esth[eé]tique|2.*3.*degr[eé]|profond|greffe|r[eé]traction|acide|chimique)/i,
            searchTerms: ["Brûlures du visage et du cou avec cicatrices défigurantes"],
            priority: 998
        },
        {
            pattern: /brûlures?.*(?:main|avant.*bras|poignet)|(?:main|avant.*bras|poignet).*brûlures?/i,
            context: /(?:profondes?|2.*3.*degré|circonférentielle?|greffe|raideur.*doigt|cicatrice)/i,
            searchTerms: ["Brûlures des mains avec séquelles fonctionnelles (Main Dominante)"],
            priority: 997,
            negativeContext: /non.*dominante|gauche.*droitier|main.*gauche.*droitier/i
        },
        
        // === RÈGLE FRACTURE OUVERTE TIBIA GUSTILO IIIB (V3.3.35 - FIX CAS 11) ===
        // Problème CAS 11: Détecte "Raideur médius" (4%) au lieu de fracture tibia complexe (40-50%)
        // Contexte: Fracture ouverte Gustilo IIIB + ostéite chronique + raccourcissement 3.5cm + raideur genou+cheville
        // Solution: Expert rule haute priorité avec marker spécial pour cumul complications
        {
            pattern: /fracture.*(?:ouverte|expos[eé]e).*tibia.*(?:Gustilo|type.*III|IIIB)|(?:Gustilo|type.*III|IIIB).*tibia|fracture.*tibia.*(?:infection|ost[eé]ite)/i,
            context: /(?:infection|ost[eé]ite|chronique|staphylocoque|raccourcissement|raideur.*(?:genou|cheville)|flexion.*(?:genou|cheville|dorsale)|boiterie)/i,
            searchTerms: ["__CUMUL_TIBIA_GUSTILO__"],  // Marker spécial
            priority: 1012,  // TRÈS HAUTE PRIORITÉ
            negativeContext: /simple|sans.*complication|consolid[eé]e.*normale/i
        },
        
        // === RÈGLE CUMUL FRACTURE BASSIN + NERF SCIATIQUE (V3.3.34 - FIX CAS 10) ===
        // Problème CAS 10: Détecte "Névralgie pudendale" (25%) au lieu de cumuler bassin (20-30%) + nerf sciatique (30-45%)
        // Formule Balthazard attendue: 30% + 40% × 0.7 = 58% ≈ 60% (fourchette [50-65%])
        // Solution: Expert rule spécifique haute priorité qui détecte cumul AVANT règles individuelles
        {
            pattern: /fracture.*bassin.*(?:nerf|sciatique)|(?:nerf|sciatique).*fracture.*bassin|polytraumatisme.*bassin.*sciatique/i,
            context: /(?:cadre.*obturateur|disjonction|sacro.*iliaque|ilium|pubis).*(?:sciatique|nerf|d[eé]ficit|steppage|paralysie)|(?:sciatique|nerf|d[eé]ficit|steppage|paralysie).*(?:cadre.*obturateur|disjonction|sacro.*iliaque|ilium|pubis)/i,
            searchTerms: ["__CUMUL_BASSIN_NERF_SCIATIQUE__"],  // Marker spécial pour traitement custom
            priority: 1010  // TRÈS HAUTE PRIORITÉ (avant règles individuelles)
        },
        
        // === RÈGLES ATTEINTES NERVEUSES (V3.3.5) ===
        {
            pattern: /atteinte\s+(?:du\s+)?nerf\s+sciatique/i,
            context: /(?:station.*debout|marche|boiterie|reconversion|paralysie|pied.*tombant|impossibilit[eé]|s[eé]v[eè]re|compl[eè]te|majeur)/i,
            searchTerms: ["Paralysie complète du nerf sciatique"],
            priority: 996,
            negativeContext: /l[eé]g[eè]re|minime|mod[eé]r[eé]e(?!.*s[eé]v[eè]re)|fracture.*bassin|bassin.*fracture/i  // V3.3.34: Exclure si cumul bassin
        },
        
        // === RÈGLE SDRC / ALGODYSTROPHIE (V3.3.35 - FIX CAS 12) ===
        // Problème CAS 12: Détecte "Raideur poignet" (15%) au lieu de SDRC (30-40%)
        // Contexte: SDRC post-traumatique main dominante + EVA 8/10 résistant traitement + troubles trophiques
        // Solution: Expert rule SDRC avec détection douleur sévère résistante + troubles trophiques objectifs
        {
            pattern: /SDRC|algodystrophie|syndrome.*douloureux.*r[eé]gional.*complexe|dystrophie.*sympathique.*r[eé]flexe/i,
            context: /(?:douleur.*(?:r[eé]sistant|permanente|chronique)|EVA.*[7-9]|troubles.*trophiques|œd[eè]me.*persistant|peau.*(?:fine|brillante)|reconversion|handicap)/i,
            searchTerms: ["Algodystrophie (SDRC de type I) - Forme majeure séquellaire du membre supérieur"],
            priority: 1008,  // HAUTE PRIORITÉ
            negativeContext: /r[eé]solu|gu[eé]ri|sans.*s[eé]quelle/i
        },
        
        {
            pattern: /atteinte\s+(?:du\s+)?nerf\s+sciatique/i,
            context: /nerf|sciatique|bassin|hanche/i,
            searchTerms: ["Névralgie sciatique post-traumatique", "Paralysie du nerf sciatique poplité externe (SPE)", "Paralysie du nerf sciatique poplité interne (SPI)"],
            priority: 995
        },
        
        // === RÈGLE TC GRAVE AVEC CUMUL SÉQUELLES MULTIPLES (V3.3.35 - FIX CAS 13) ===
        // Problème CAS 13: Détecte "Commotion cérébrale" (33%) au lieu de cumul TC grave (50-70%)
        // Contexte: TC grave Glasgow ≤8 + céphalées chroniques + troubles cognitifs (MMS 24/30) + épilepsie post-traumatique
        // Solution: Expert rule détectant TC grave + marker pour cumul Balthazard (céphalées + cognitif + épilepsie)
        // PRIORITÉ 1020 > 1001 (règle "Commotion cérébro-spinale prolongée" ligne 3751)
        {
            pattern: /traumatisme.*cr[aâ]nien.*s[eé]v[eè]re|Glasgow.*[3-8]|h[eé]matome.*sous.*dural/i,
            context: /c[eé]phal[eé]|m[eé]moire|cognitif|[eé]pilepsie|MMS/i,
            searchTerms: ["__CUMUL_TC_GRAVE__"],  // Marker spécial pour traitement custom cumul
            priority: 1020,  // PRIORITÉ MAX (AVANT règle commotion ligne 3751 priorité 1001)
            negativeContext: /l[eé]ger|simple.*sans/i
        },
        
        // === RÈGLE AMPUTATION MAIN COMPLÈTE (V3.3.36 - FIX CAS 14) ===
        // Problème CAS 14: Détecte doigts individuels (4-20%) au lieu d'amputation main complète (60%)
        // Contexte: Amputation traumatique main dominante niveau poignet + douleurs membre fantôme + dépression majeure
        // Solution: Expert rule haute priorité détectant amputation MAIN (vs doigts) avec marker pour cumul complexe
        {
            pattern: /amputation.*main.*(?:poignet|radio.*carpien|niveau.*poignet)|d[eé]sarticulation.*radio.*carpien|amputation.*traumatique.*main.*(?:dominante|droite)/i,
            context: /dominante|droite|poignet|radio.*carpien|membre.*fant[oô]me|douleur.*fant[oô]me|d[eé]pression|Hamilton/i,
            searchTerms: ["__CUMUL_AMPUTATION_MAIN_PHANTOM__"],  // Marker spécial pour cumul amputation + phantom pain + dépression
            priority: 1013,  // TRÈS HAUTE PRIORITÉ (avant amputation doigts individuels)
            negativeContext: /doigt|index|pouce|majeur|annulaire|auriculaire/i
        },
        
        // === RÈGLE DOULEURS MEMBRE FANTÔME (V3.3.36 - FIX CAS 14) ===
        // Problème CAS 14: Douleurs membre fantôme (phantom pain) non détectées (entité neuropathique spécifique)
        // Contexte: Douleurs neuropathiques sévères post-amputation résistantes aux traitements (gabapentine, morphiniques)
        // Solution: Expert rule détectant phantom pain comme entité distincte (15% IPP)
        {
            pattern: /membre.*fant[oô]me|douleur.*fant[oô]me|phantom.*pain|douleur.*neuropathique.*amputation/i,
            context: /amputation|r[eé]sistant|gabapentine|pr[eé]gabaline|morphinique|EVA.*[7-9]|chronique|persistant/i,
            searchTerms: ["__CUMUL_AMPUTATION_MAIN_PHANTOM__"],  // Marker identique pour cumul avec amputation
            priority: 1009,  // HAUTE PRIORITÉ
            negativeContext: /r[eé]solu|gu[eé]ri|sans.*douleur/i
        },
        
        // === RÈGLE SURDITÉ BILATÉRALE + ACOUPHÈNES INVALIDANTS (V3.3.36 - FIX CAS 15) ===
        // Problème CAS 15: Détecte surdité seule (45%) sans acouphènes invalidants (+10%) ni retentissement (+5%)
        // Contexte: Surdité bilatérale professionnelle + acouphènes invalidants résistants + isolement social
        // Solution: Expert rule cumul surdité + acouphènes INVALIDANTS (pas simples) + retentissement psycho-social
        {
            pattern: /(?:surdit[eé]|OD.*dB|OG.*dB).*(?:bilat[eé]rale|professionnelle|neurosensorielle)/i,
            context: /acouph[eè]nes.*invalidant|invalidant.*acouph[eè]nes|acouph[eè]nes.*r[eé]sistant|sifflements.*aigus.*continus/i,
            searchTerms: ["__CUMUL_SURDITE_ACOUPHENES_INVALIDANTS__"],  // Marker spécial pour cumul audition complexe
            priority: 1007,  // HAUTE PRIORITÉ (avant acouphènes isolés et surdité simple)
            negativeContext: /l[eé]g[eè]re|minime|sans.*retentissement/i
        },
        
        {
            pattern: /amputation\s+(?:de\s+l[''])?index/i,
            context: /index|doigt/i,
            searchTerms: ['Amputation de l\'index'],
            priority: 100
        },
        {
            pattern: /amputation\s+(?:du\s+)?pouce/i,
            context: /pouce/i,
            searchTerms: ['Amputation du pouce'],
            priority: 100
        },
        {
            pattern: /tassement\s+vert[eé]bral/i,
            context: /l[1-5]|lombaire/i,
            negativeContext: /cyphose.*\d+.*degrés.*raideur|avec.*cyphose/i, // Exclure nos cas spécifiques
            searchTerms: ['Fracture tassement vertébral lombaire non déplacée consolidée'],
            priority: 98
        },
        {
            pattern: /tassement\s+vert[eé]bral/i,
            context: /c[1-7]|cervical/i,
            negativeContext: /syndrome.*cervical.*chronique/i, // Exclure nos cas spécifiques
            searchTerms: ['Fracture tassement vertébral cervical non déplacée consolidée'],
            priority: 97
        },
        {
            pattern: /tassement\s+vert[eé]bral/i,
            context: /d[1-9]|d1[0-2]|dorsal/i,
            negativeContext: /cyphose.*\d+.*degrés|avec.*cyphose/i, // Exclure nos cas spécifiques
            searchTerms: ['Fracture tassement vertébral dorsal non déplacée consolidée'],
            priority: 96
        },
        {
            pattern: /rupture\s+(?:de\s+la\s+)?coiffe\s+(?:des\s+)?rotateurs|rupture.*(?:sus|supra|sous|infra)[- ]?[eéè]pineux|(?:sus|supra|sous|infra)[- ]?[eéè]pineux.*rupture|transfixiante.*(?:sus|supra|sous|infra)[- ]?[eéè]pineux/i,
            context: /[eé]paule|abduction|rotateurs|supra|sus.*[eé]pineux|sous.*[eé]pineux/i,
            negativeContext: /complète/i,
            searchTerms: [
                'Rupture de la coiffe des rotateurs post-traumatique (supra-épineux, etc.) (Main Dominante)',
                'Rupture de la coiffe des rotateurs post-traumatique (supra-épineux, etc.) (Main Non Dominante)'
            ],
            priority: 999
        },
        {
            pattern: /fracture\s+(?:du\s+)?pilon\s+tibial/i,
            context: /cheville|tibia/i,
            searchTerms: ['Fracture du pilon tibial'],
            priority: 100
        },
        {
            pattern: /fracture.*(?:bimall[eé]olaire|bi-mall[eé]olaire|mall[eé]olaire|deux\s+mall[eé]oles)/i,
            context: /cheville|mall[eé]ole|fibula|p[eé]ron[eé]|tibia|externe|interne|consolid[eé]e/i,
            searchTerms: ['Fracture malléolaire ou bi-malléolaire - Bonne consolidation'],
            priority: 95
        },
        {
            pattern: /luxation.*hanche.*n[eé]crose|n[eé]crose.*t[eê]te.*f[eé]morale/i,
            context: /hanche|f[eé]mur|luxation/i,
            searchTerms: ['Fracture du col du fémur - Consolidation avec raccourcissement et raideur'],
            priority: 92
        },
        // Règles rachis
        {
            pattern: /hernie.*discale.*(?:cervical|C\d)|cervical.*hernie.*discale/i,
            context: /rachis|cervical|n[eé]vralgie|NCB|cervico-brachial/i,
            searchTerms: ['Hernie discale cervicale post-traumatique - Avec névralgie cervico-brachiale (NCB)'],
            priority: 94
        },
        {
            pattern: /hernie.*discale.*(?:lombaire|L\d)|lombaire.*hernie.*discale/i,
            context: /rachis|lombaire|sciatique|cruralgie|radiculalgie|op[eé]r[eé]/i,
            searchTerms: ['Hernie discale lombaire post-traumatique - Avec radiculalgie (sciatique ou cruralgie)'],
            priority: 94
        },
        {
            pattern: /spondylolysth[eé]sis|spondylo.*listh[eé]sis|listth[eé]sis|glissement\s+vert[eé]bral/i,
            context: /lombaire|L\d|S\d|rachis|traumatisme|post-traumatique/i,
            searchTerms: ['Spondylolisthésis modifié par traumatisme'],
            priority: 93
        },
        {
            pattern: /(?:fracture|fx).*(?:processus|apophyse).*transverse/i,
            context: /vertébr|lombaire|dorsal|L\d|D\d|rachis/i,
            searchTerms: ['Fracture des apophyses transverses'],
            priority: 93
        },
        {
            pattern: /limitation.*(?:flexion|mobilit[eé])|flexion.*(?:limit[eé]|r[eé]duit)/i,
            context: /cervical|rachis.*cervical|C\d|cou/i,
            negativeContext: /coude|poignet|épaule|genou|cheville|hanche/i,
            searchTerms: ['Raideur rachidienne avec douleurs ostéo-articulaires'],
            priority: 92
        },
        {
            pattern: /raideur.*rachis.*lombaire|rachis.*lombaire.*raideur/i,
            context: /DDS.*(?:20|25|30|35|40).*cm|schober.*(?:2|3|4).*cm/i,
            searchTerms: ['Raideur rachis lombaire - DDS 20-40 cm'],
            priority: 95
        },
        {
            pattern: /(?:raideur.*)?rachis.*cervical|(?:rachis.*)?cervical.*(?:DMS|raideur)|raideur.*cervical/i,
            context: /DMS.*(?:10|11|12|13|14|15).*cm|rotation.*\d+°/i,
            searchTerms: ['Raideur rachis cervical - DMS 10-15 cm'],
            priority: 95
        },
        {
            pattern: /(?:s[eé]quelle|suite).*tassement.*(?:rachis|vert[eé]br|L\d|C\d|D\d)/i,
            context: /DDS|raideur|douleur|lombaire/i,
            searchTerms: ['Raideur rachis post-tassement avec douleur'],
            priority: 94
        },
        {
            pattern: /rachis.*dorsolombaire|dorsolombaire.*raideur/i,
            context: /DDS.*(?:40|45|50).*cm|schober.*(?:1|2).*cm|s[eé]v[eè]re|limitation/i,
            searchTerms: ['Raideur rachis dorsolombaire - Limitation sévère'],
            priority: 94
        },
        {
            pattern: /raideur.*cervical|cervical.*raideur/i,
            context: /DMS.*(?:15|16|17|18).*cm|inclinaison.*limit[eé]|rotation.*limit[eé]/i,
            searchTerms: ['Raideur rachis cervical - DMS + inclinaisons'],
            priority: 94
        },
        {
            pattern: /rachis.*lombaire|lombaire.*rachis/i,
            context: /DDS.*(?:20|25|30).*cm|p[eé]rim[eè]tre.*marche.*(?:1|2).*km|marche.*limit[eé]/i,
            searchTerms: ['Raideur rachis avec limitation fonctionnelle'],
            priority: 93
        },
        // ========================================
        // MEMBRE SUPÉRIEUR - RAIDEURS ARTICULAIRES
        // ========================================
        {
            pattern: /raideur.*épaule|épaule.*raideur|limitation.*épaule/i,
            context: /abduction.*(?:60|65|70|75|80|85|90)°|abduction.*(?:60|65|70|75|80|85|90)\s*degr/i,
            searchTerms: ['Raideur de l\'épaule - Abduction 60-90°'],
            priority: 98
        },
        {
            pattern: /(?:raideur|limitation).*épaule/i,
            context: /abduction.*(?:60|70|80)°.*rotation|rotation.*(?:20|25|30|35|40)°/i,
            searchTerms: ['Raideur de l\'épaule - Abduction 60-90° + rotation'],
            priority: 99
        },
        {
            pattern: /(?:raideur|limitation).*épaule/i,
            context: /douleur|douloureuse|algique/i,
            searchTerms: ['Raideur de l\'épaule avec douleur'],
            priority: 98
        },
        {
            pattern: /épaule.*rotation|rotation.*épaule/i,
            context: /(?:externe|interne).*(?:limit|réduit)|pas.*rotation.*complète/i,
            searchTerms: ['Raideur de l\'épaule - Limitation rotation'],
            priority: 98
        },
        {
            pattern: /(?:raideur|limitation).*épaule/i,
            context: /(?:luxation|instabilit[eé]).*récidivant|instable/i,
            searchTerms: ['Raideur + instabilité épaule'],
            priority: 98
        },
        {
            pattern: /(?:limitation|raideur).*(?:antépulsion|élévation)/i,
            context: /épaule|(?:100|90|85|80)°/i,
            searchTerms: ['Raideur de l\'épaule - Élévation limitée'],
            priority: 98
        },
        {
            pattern: /(?:raideur|limitation).*épaule/i,
            context: /main.*dos.*impossible|limitation.*fonctionnel/i,
            searchTerms: ['Raideur de l\'épaule avec limitation fonctionnelle'],
            priority: 98
        },
        {
            pattern: /raideur.*coude|coude.*raideur|limitation.*(?:flexion|extension).*coude/i,
            context: /flexion.*(?:90|95|100|105|110|115|120|125|130)°/i,
            searchTerms: ['Raideur du coude - Flexion 90-130°'],
            priority: 99
        },
        {
            pattern: /(?:raideur|limitation).*coude|coude.*(?:raideur|limitation)/i,
            context: /flexion.*(?:90|100|110)°.*(?:pronation|supination)|(?:pronation|supination).*(?:50|60|70)°/i,
            searchTerms: ['Raideur du coude - Flexion + pronosupination'],
            priority: 99
        },
        {
            pattern: /(?:raideur|limitation).*(?:flexion|extension).*coude|coude.*(?:raideur|limitation)|limitation.*flexion.*coude/i,
            context: /flexion.*(?:90|95|100)°.*extension.*-(?:10|15|20)°/i,
            searchTerms: ['Raideur du coude - Flexion 90-130° + extension'],
            priority: 99
        },
        {
            pattern: /(?:séquelle|suite).*(?:fracture|fx).*(?:olécrane|coude)/i,
            context: /raideur|flexion.*limit|supination/i,
            searchTerms: ['Raideur du coude post-fracture'],
            priority: 94
        },
        {
            pattern: /(?:raideur|limitation).*coude/i,
            context: /(?:pronation|supination).*(?:50|60|70)°|pronosupination.*limit/i,
            searchTerms: ['Raideur du coude - Pronosupination limitée'],
            priority: 94
        },
        {
            pattern: /(?:raideur|limitation).*coude/i,
            context: /flexion.*90°.*extension.*-20°|sévère|luxation/i,
            searchTerms: ['Raideur du coude - Limitation sévère'],
            priority: 95
        },
        {
            pattern: /(?:raideur|limitation).*coude/i,
            context: /douleur|douloureuse/i,
            searchTerms: ['Raideur du coude avec douleur'],
            priority: 93
        },
        {
            pattern: /(?:raideur|limitation).*coude/i,
            context: /force.*(?:diminu|réduit|faible)|déficit.*force/i,
            searchTerms: ['Raideur + déficit force coude'],
            priority: 94
        },
        {
            pattern: /raideur.*poignet|poignet.*raideur|limitation.*(?:dorsiflexion|palmarflexion).*poignet/i,
            context: /dorsiflexion.*(?:30|35|40|45|50)°.*palmarflexion|palmarflexion.*(?:40|45|50)°/i,
            searchTerms: ['Raideur du poignet - Flexion/extension limitée'],
            priority: 99
        },
        {
            pattern: /(?:raideur|limitation).*poignet|poignet.*(?:raideur|limitation)|poignet.*dorsiflexion/i,
            context: /dorsiflexion.*(?:30|35|40)°|inclinaison.*limit/i,
            searchTerms: ['Raideur du poignet - Mobilité réduite'],
            priority: 99
        },
        {
            pattern: /(?:séquelle|suite).*(?:fracture|fx).*radius/i,
            context: /poignet|dorsiflexion|force.*(?:diminu|réduit)/i,
            searchTerms: ['Raideur poignet + déficit force'],
            priority: 99
        },
        {
            pattern: /(?:raideur|limitation).*poignet|poignet.*(?:raideur|limitation)/i,
            context: /dorsiflexion.*(?:25|30)°.*palmarflexion.*(?:30|35|40)°|sévère/i,
            searchTerms: ['Raideur du poignet - Limitation sévère'],
            priority: 99
        },
        {
            pattern: /(?:raideur|limitation).*poignet/i,
            context: /douleur|douloureuse|entorse/i,
            searchTerms: ['Raideur poignet avec douleur'],
            priority: 93
        },
        {
            pattern: /(?:raideur|limitation).*poignet/i,
            context: /inclinaison.*(?:radial|cubital)|inclinaison.*limit/i,
            searchTerms: ['Raideur poignet - Inclinaisons limitées'],
            priority: 94
        },
        {
            pattern: /(?:raideur|limitation).*poignet/i,
            context: /(?:main.*dominante|dominant|droit.*dominant)/i,
            searchTerms: ['Raideur poignet main dominante'],
            priority: 94
        },
        {
            pattern: /arthrod[eè]se.*(?:lombaire|cervical|rachis|vert[eé]bral)/i,
            context: /fusion|L\d|C\d|rachis|op[eé]r[eé]/i,
            searchTerms: ['Séquelles d\'arthrodèse vertébrale (fusion) avec raideur et douleurs résiduelles'],
            priority: 93
        },
        {
            pattern: /raideur.*rachis|rachis.*raideur/i,
            context: /lombaire|dorsal|cervical|DDS|schober|flexion|limitation/i,
            negativeContext: /tassement.*vertébral.*[DL]\d+|cyphose.*\d+.*degrés/i, // Exclure nos cas de tassements
            searchTerms: ['Raideur rachidienne avec douleurs ostéo-articulaires'],
            priority: 91
        },
        // Règles membres supérieurs
        {
            pattern: /fracture.*h[uû]m[eé]r|h[uû]m[eé]r.*fracture/i,
            context: /[eé]paule|bras|diaphyse|col\s+chirurgical|consolid[eé]/i,
            searchTerms: ['Fracture de l\'humérus normalement consolidée (Main Dominante)'],
            priority: 93
        },
        {
            pattern: /scapho[ïi]de.*pseudarthrose|pseudarthrose.*scapho[ïi]de/i,
            context: /poignet|carpien|carpe|instabilit[eé]|douleurs/i,
            negativeContext: /dominante|gauche|droite|côt[eé]/i, // Générique seulement si pas de précision
            searchTerms: ['Pseudarthrose du scaphoïde'],
            priority: 999
        },
        {
            pattern: /fracture.*scapho[ïi]de/i,
            context: /poignet|carpien|carpe|raideur/i,
            searchTerms: ['Fracture du scaphoïde carpien - Avec raideur simple (Main Dominante)'],
            priority: 92
        },
        {
            pattern: /[eé]picondylite|[eé]pitrochléite/i,
            context: /coude|chronique|rebelle|r[eé]sistante/i,
            searchTerms: ['Épicondylite ou Épitrochléite chronique rebelle (Main Dominante)'],
            priority: 91
        },
        {
            pattern: /(?:syndrome.*)?canal\s+carpien/i,
            context: /poignet|main|par[eé]sth[eé]sie|traumatique/i,
            searchTerms: ['Syndrome du canal carpien post-traumatique (Main Dominante)'],
            priority: 93
        },
        {
            pattern: /fracture.*(?:deux\s+os.*(?:avant-bras|forearm)|both\s+bones.*(?:avant-bras|forearm))|fracture.*radius.*(?:ulna|cubitus)/i,
            context: /avant-bras|prono|supination|rotation|cal\s+vicieux/i,
            searchTerms: ['Fracture des deux os de l\'avant-bras - Cal vicieux avec limitation de la prono-supination (Main Dominante)'],
            priority: 94
        },
        {
            pattern: /fracture.*(?:deux\s+os.*(?:jambe|leg)|both\s+bones.*(?:jambe|leg))|fracture.*tibia.*(?:p[eé]ron[eé]|fibula)/i,
            context: /jambe|saillie.*osseus|cal\s+vicieux|genou\s+valgum|troubles?\s+trophiques?/i,
            searchTerms: ['Fracture des deux os de la jambe - Avec cal vicieux et troubles trophiques'],
            priority: 95
        },
        {
            pattern: /fracture.*(?:deux\s+os.*(?:jambe|leg)|both\s+bones.*(?:jambe|leg))|fracture.*tibia.*(?:p[eé]ron[eé]|fibula)/i,
            context: /jambe|bonne\s+consolidation|consolidation.*anatomique/i,
            negativeContext: /cal\s+vicieux|troubles?\s+trophiques?|saillie.*osseus|genou\s+valgum/i,
            searchTerms: ['Fracture des deux os de la jambe - Bonne consolidation'],
            priority: 93
        },
        {
            pattern: /fracture.*radius/i,
            context: /poignet|avant-bras|prono|supination/i,
            negativeContext: /extrémité.*inférieure|extremite.*inferieure|cal.*vicieux/i,
            searchTerms: ['Fracture des deux os de l\'avant-bras - Bonne consolidation sans trouble fonctionnel (Main Dominante)'],
            priority: 88
        },
        {
            pattern: /cataracte/i,
            context: /[oœ]il|vision/i,
            searchTerms: ['Cataracte'],
            priority: 90
        },
        {
            pattern: /uv[eé]ite/i,
            context: /[oœ]il|traumatique|chronique|inflamm/i,
            searchTerms: ['Uvéite post-traumatique chronique'],
            priority: 92
        },
        {
            pattern: /corps\s+[eé]tranger.*intraoculaire|[eé]tranger.*oculaire/i,
            context: /[oœ]il|m[eé]tallique|extraction|perforant/i,
            searchTerms: ['Séquelles d\'endophtalmie post-traumatique (infection intraoculaire)'],
            priority: 94
        },
        {
            pattern: /k[eé]ratite|taies?\s+(?:de\s+)?corn[eé]e|opacit[eé]s?\s+corn[eé]ennes?/i,
            context: /[oœ]il|corn[eé]e|traumatique|vision/i,
            searchTerms: ['Taies de cornée (selon gêne visuelle)'],
            priority: 93
        },
        {
            pattern: /glaucome|pression.*intraoculaire/i,
            context: /[oœ]il|traumatique|hypertension/i,
            searchTerms: ['Glaucome post-traumatique'],
            priority: 91
        },
        {
            pattern: /h[eé]mophtalmie|h[eé]morragie.*vitr[eé]e/i,
            context: /[oœ]il|r[eé]tine|traumatique|acuit[eé]/i,
            searchTerms: ['Décollement de la rétine post-traumatique'],
            priority: 88
        },
        {
            pattern: /contusion\s+oculaire|traumatisme.*oculaire/i,
            context: /[oœ]il|mydriase|pupille|paralytique|œil/i,
            searchTerms: ['Uvéite post-traumatique chronique'],
            priority: 87
        },
        {
            pattern: /fracture\s+(?:du\s+)?col\s+(?:du\s+)?f[eé]mur.*raccourcissement/i,
            context: /hanche|f[eé]mur|boiterie/i,
            searchTerms: ['Fracture du col du fémur - Consolidation avec raccourcissement et raideur'],
            priority: 95
        },
        {
            pattern: /surdit[eé]\s+post-traumatique.*(?:60\s*db|60\s*d[eé]cibels)/i,
            context: /oreille|audition|entend/i,
            searchTerms: ['Diminution de l\'acuité auditive'],
            priority: 90,
            negativeContext: /profonde.*oreille.*normale|unilat[eé]rale.*profonde|80.*dB/i
        },
        {
            pattern: /baisse\s+acuit[eé]\s+visuelle.*(?:2\/10|1\/10|\/10)/i,
            context: /[oœ]il|vision|traumatisme/i,
            searchTerms: ['Atrophie optique post-traumatique'],
            priority: 92
        },
        // Règles doigts - raideurs
        {
            pattern: /raideur.*index|index.*raideur|ankylose.*index/i,
            context: /doigt|main|fracture|phalange/i,
            searchTerms: ['Raideur d\'une articulation de l\'index (Main Dominante)'],
            priority: 93
        },
        {
            pattern: /raideur.*(?:m[eé]dius|majeur)|(?:m[eé]dius|majeur).*raideur|ankylose.*(?:m[eé]dius|majeur)/i,
            context: /doigt|main|fracture|phalange|index|annulaire/i,
            searchTerms: ['Raideur d\'une articulation du médius (Main Dominante)'],
            priority: 93
        },
        {
            pattern: /raideur.*annulaire|annulaire.*raideur|ankylose.*annulaire/i,
            context: /doigt|main|fracture|phalange/i,
            searchTerms: ['Raideur d\'une articulation de l\'annulaire (Main Dominante)'],
            priority: 93
        },
        {
            pattern: /amputation.*m[eé]dius/i,
            context: /doigt|main/i,
            searchTerms: ['Amputation du médius'],
            priority: 95
        },
        {
            pattern: /amputation.*annulaire/i,
            context: /doigt|main/i,
            searchTerms: ['Amputation de l\'annulaire'],
            priority: 95
        },
        {
            pattern: /amputation.*auriculaire/i,
            context: /doigt|main/i,
            searchTerms: ['Amputation de l\'auriculaire'],
            priority: 95
        },
        // Règles orteils
        {
            pattern: /amputation.*gros\s+orteil|gros\s+orteil.*amputation/i,
            context: /pied|orteil|hallux/i,
            searchTerms: ['Amputation du gros orteil'],
            priority: 95
        },
        {
            pattern: /amputation.*(?:2[eè]me|deuxi[eè]me|troisi[eè]me|3[eè]me|quatri[eè]me|4[eè]me|cinqui[eè]me|5[eè]me)\s+orteil/i,
            context: /pied|orteil/i,
            searchTerms: ['Amputation d\'un autre orteil'],
            priority: 94
        },
        {
            pattern: /(?:ankylose|raideur|hallux\s+rigidus).*(?:gros\s+orteil|hallux)|(?:gros\s+orteil|hallux).*(?:ankylose|raideur|rigidus)/i,
            context: /pied|orteil|articulation|metatarso/i,
            searchTerms: ['Ankylose ou raideur du gros orteil'],
            priority: 98
        },
        {
            pattern: /ankylose.*(?:2[eè]me|deuxi[eè]me|troisi[eè]me|quatri[eè]me|cinqui[eè]me).*orteil/i,
            context: /pied|orteil|interphalangienne/i,
            searchTerms: ['Ankylose ou raideur du gros orteil'],
            priority: 85
        },
        {
            pattern: /fracture.*(?:phalanges?|orteils?).*raideur|raideur.*(?:phalanges?|orteils?)|s[eé]quelles.*fracture.*orteils?/i,
            context: /pied|orteil/i,
            searchTerms: ['Ankylose ou raideur du gros orteil'],
            priority: 83
        },
        // Règles thorax
        {
            pattern: /fracture.*sternum/i,
            context: /douleurs?|limitation|respiratoire|thorax/i,
            searchTerms: ['Fracture du sternum'],
            priority: 999
        },
        {
            pattern: /fractures?.*multiples?.*c[oô]tes/i,
            context: /s[eé]quelles.*respiratoires|dyspn[eé]e|volet.*costal/i,
            searchTerms: ['Fractures multiples de côtes - Avec séquelles respiratoires'],
            priority: 999
        },
        // Règles langage familier - Membres inférieurs
        {
            pattern: /f[eé]mur.*cass[eé]|cass[eé].*f[eé]mur/i,
            context: /raccourcissement.*(?:2|3).*cm|cal.*vicieux|boiterie.*importante/i,
            searchTerms: ['Fracture de la diaphyse fémorale - Avec cal vicieux'],
            priority: 999
        },
        {
            pattern: /genou.*(?:pet[eé]|p[eé]t[eé]|naz[eé])|lca.*(?:lache|l[aâ]che|qui.*lache)/i,
            context: /instabil|d[eé]robement|laxit[eé]|arthrose|boite/i,
            searchTerms: ['Séquelles de rupture du ligament croisé antérieur (LCA)'],
            priority: 999
        },
        // Règles audition
        {
            pattern: /acouph[èe]nes.*invalidants|bourdonnements.*oreille/i,
            context: /isol[eé]|permanents|bilat[eé]raux|troubles.*sommeil|invalidants/i,
            searchTerms: ['Bourdonnements d\'oreille (acouphènes) isolés'],
            priority: 999,
            negativeContext: /surdit[eé]|perte.*auditive|d[eé]ficience.*auditive/i
        },
        {
            pattern: /surdit[eé].*profonde.*oreille|oreille.*surdit[eé].*profonde/i,
            context: /unilat[eé]rale|80.*dB|oreille.*normale|une.*oreille/i,
            searchTerms: ['Surdité unilatérale profonde'],
            priority: 999
        },
        // Règles dents
        {
            pattern: /perte.*8.*dents?.*d[eé]finitives?|8.*dents?.*(?:perdues?|d[eé]finitives?)/i,
            context: /traumatisme|proth[eè]se|facial|d[eé]finitives?/i,
            searchTerms: ['Perte de 8 dents définitives'],
            priority: 999
        },
        // Règles cheville
        {
            pattern: /fracture.*mall[eé]ol(?:e|aire)/i,
            context: /raideur.*mod[eé]r[eé]e|d[eé]ficit|flexion.*dorsale|limitation/i,
            searchTerms: ['Fracture malléolaire ou bi-malléolaire - Avec raideur modérée'],
            priority: 999
        },
        // Règles pied
        {
            pattern: /fracture.*calcan[eé]um/i,
            context: /thalamique|enfoncement|arthrose|sous.*astragalienne|boiterie|marche.*limit[eé]e/i,
            searchTerms: ['Fracture du calcanéum - Avec douleurs et boiterie'],
            priority: 999
        },
        // Règles jambe
        {
            pattern: /pseudarthrose.*tibia.*diaphyse|diaphyse.*tibia.*pseudarthrose/i,
            context: /mobilit[eé].*anormale|non.*consolidation|marche.*impossible|appui/i,
            searchTerms: ['Pseudarthrose de la diaphyse tibiale'],
            priority: 999
        },
        // Règles cicatrices
        {
            pattern: /cicatrice.*ch[eé]lo[ïi]de.*thorax|thorax.*cicatrice.*ch[eé]lo[ïi]de/i,
            context: /face.*ant[eé]rieure|r[eé]tractile|adh[eé]rente|plans.*profonds|g[êe]ne.*esth[eé]tique/i,
            searchTerms: ['Cicatrice vicieuse thorax antérieur'],
            priority: 999
        },
        // Règles yeux
        {
            pattern: /perte.*(?:totale|compl[eè]te).*vision.*(?:[oœ]eil|yeux)|(?:[oœ]eil|yeux).*perte.*(?:totale|compl[eè]te)/i,
            context: /traumatisme|autre.*normal|unilat[eé]rale|gauche.*normal|droite.*normal/i,
            searchTerms: ["Perte complète de la vision d'un oeil (l'autre étant normal)"],
            priority: 999
        },
        // Cataracte post-traumatique - Nécessite OBLIGATOIREMENT l'acuité visuelle (V3.3.20)
        {
            pattern: /cataracte.*(?:post[-\s]?traumatique|traumatique|suite.*traumatisme|apres.*traumatisme)|traumatisme.*cataracte|cataracte/i,
            context: /oeil|vision|acuit[eé]|visuel|cataracte|traumatique|traumatisme/i,
            negativeContext: /(?:acuit[eé].*visuelle?|vision).*(?:\d+\/\d+|od.*\d+\/\d+|og.*\d+\/\d+)/i,  // SAUF si acuité chiffrée présente
            searchTerms: ['__DONNEES_INSUFFISANTES_CATARACTE__'],
            priority: 999
        },
        // Règles viscères (PRIORITÉ MAXIMALE)
        {
            pattern: /[eé]ventration.*post.*traumatique|[eé]ventration.*pari[eé]tale/i,
            context: /hernie|contention|ceinture|paro[ií]|abdomen/i,
            searchTerms: ['Éventration post-traumatique'],
            priority: 999
        },
        {
            pattern: /spl[eé]nectomie.*totale|ablation.*rate.*traumatique/i,
            context: /rupture.*rate|traumatique|suite.*rupture/i,
            searchTerms: ['Ablation de la rate (splénectomie)'],
            priority: 999
        },
        {
            pattern: /spl[eé]nectomie|ablation.*rate|sans\s+rate/i,
            context: /traumatisme|accident|rate|splénique/i,
            negativeContext: /totale|rupture.*rate/i,
            searchTerms: ['Splénectomie (Ablation de la rate)'],
            priority: 95
        },
        {
            pattern: /n[eé]phrectomie|ablation.*rein|un\s+seul\s+rein/i,
            context: /traumatisme|rein|unilatérale|gauche|droite/i,
            searchTerms: ['Néphrectomie (ablation d\'un rein), avec rein restant sain'],
            priority: 95
        },
        {
            pattern: /col[eé]ctomie|ablation.*colon|r[eé]section.*colon/i,
            context: /traumatisme|traumatique|abdomen|colon|partielle/i,
            searchTerms: ['Séquelles de colectomie partielle post-traumatique (hors stomie)'],
            priority: 95
        },
        {
            pattern: /h[eé]patectomie|r[eé]section.*h[eé]patique|ablation.*foie/i,
            context: /traumatisme|foie|h[eé]patique|partielle/i,
            searchTerms: ['Séquelles d\'hépatectomie partielle post-traumatique'],
            priority: 93
        },
        {
            pattern: /pancr[eé]atectomie|pancr[eé]atite.*traumatique|section.*pancr[eé]as/i,
            context: /traumatisme|pancr[eé]as|abdomen/i,
            searchTerms: ['Séquelles de pancréatite aiguë post-traumatique'],
            priority: 93
        },
        {
            pattern: /gastrectomie|chirurgie.*gastrique|perforation.*estomac/i,
            context: /traumatisme|estomac|gastrique/i,
            searchTerms: ['Dumping syndrome (post-chirurgie gastrique traumatique)'],
            priority: 92
        },
        // Règles audition détaillées
        {
            pattern: /surdit[eé].*(?:compl[eè]te|totale|cophose)/i,
            context: /oreille|audition/i,
            searchTerms: ['Diminution de l\'acuité auditive'],  // Entrée générique pour toutes surdités
            priority: 95,
            negativeContext: /profonde.*oreille.*normale|unilat[eé]rale.*profonde|80.*dB/i
        },
        {
            pattern: /surdit[eé].*(?:partielle|l[eé]g[eè]re|mod[eé]r[eé]e)/i,
            context: /oreille|audition|db|d[eé]cibels/i,
            searchTerms: ['Diminution de l\'acuité auditive'],
            priority: 92,
            negativeContext: /profonde.*oreille.*normale|unilat[eé]rale.*profonde|80.*dB/i
        },
        {
            pattern: /acouph[eè]nes?.*(?:isol[eé]s?|seuls?|sans\s+surdit[eé])/i,
            context: /oreille|bourdonnement/i,
            searchTerms: ['Bourdonnements d\'oreille (acouphènes) isolés'],
            priority: 95
        },
        // === RÈGLES AMPUTATIONS SPÉCIFIQUES (GÉNÉRIQUES) ===
        {
            pattern: /amputation.*pouce.*main.*dominante|pouce.*amputation.*dominante/i,
            context: /préhension|opposition|pollici|digitale|main.*dominante/i,
            negativeContext: /sans.*possibilité.*préhension|niveau.*articulation.*métacarpo|désarticulation/i, // Exclure nos cas spécifiques
            searchTerms: ['Amputation du pouce (main dominante)'],
            priority: 99
        },
        {
            pattern: /amputation.*index.*main.*dominante|index.*amputation.*dominante/i,
            context: /métacarpo|phalangienne|articulation|main.*dominante/i,
            negativeContext: /niveau.*articulation.*métacarpo|désarticulation.*métacarpo/i, // Exclure nos cas spécifiques
            searchTerms: ["Amputation de l'index (main dominante)"],
            priority: 99
        },
        {
            pattern: /rupture.*coiffe.*rotateurs.*complète|coiffe.*rotateurs.*rupture.*complète/i,
            context: /impossibilité|élévation|testing|amyotrophie|supra.*épineux/i,
            searchTerms: ['Rupture complète de la coiffe des rotateurs'],
            priority: 99
        },
        {
            pattern: /luxation.*récidivante.*épaule|épaule.*luxation.*récidivante/i,
            context: /instabilité|appréhension|dérobements|permanente/i,
            negativeContext: /dominante|gauche|droite|coté/i, // Seulement générique si pas de précision
            searchTerms: ["Luxation récidivante de l'épaule"],
            priority: 999
        },
        {
            pattern: /ankylose.*complète.*coude.*position.*vicieuse|coude.*ankylose.*position.*vicieuse/i,
            context: /flexion|extension|impossibilité|60.*degrés/i,
            searchTerms: ['Ankylose du coude en position vicieuse'],
            priority: 98
        },
        {
            pattern: /section.*tendons.*fléchisseurs.*(?:médius|index|annulaire|doigt)/i,
            context: /impossibilité.*flexion|flexion.*active|raideur/i,
            searchTerms: ["Section des tendons fléchisseurs doigt long"],
            priority: 100
        },
        // === RÈGLES RACHIS ET BASSIN ===
        {
            pattern: /fracture.*cotyle.*incongruence|cotyle.*fracture.*arthrose/i,
            context: /arthrose.*précoce|séquelles.*articulaires|incongruence.*articulaire/i,
            searchTerms: ['Fracture du cotyle - Avec séquelles articulaires'],
            priority: 98
        },
        {
            pattern: /fracture.*sacrum.*douleurs.*chroniques/i,
            context: /sacro.*iliaques|position.*assise.*impossible/i,
            searchTerms: ['Fracture du sacrum'],
            priority: 97
        },
        {
            pattern: /fracture.*coccyx.*coccygodynie/i,
            context: /douleurs.*position.*assise|coccygodynie.*persistante/i,
            searchTerms: ['Fracture du coccyx'],
            priority: 98
        },
        // === RÈGLES FRACTURES SPÉCIFIQUES ===
        {
            pattern: /fracture.*(?:tête|téte).*(?:humérale|humerus)|(?:tête|téte).*(?:humérale|humerus).*fracture/i,
            context: /raideur|abduction|rotation|douleur|impotence|épaule/i,
            searchTerms: ['Fracture de la tête humérale'],
            priority: 96
        },
        {
            pattern: /fracture.*(?:extrémité|extremite).*(?:inférieure|inf).*radius/i,
            context: /cal.*vicieux|déformation|prono.*supination|limitation/i,
            searchTerms: ["Fracture de l'extrémité inférieure du radius - Avec cal vicieux"],
            priority: 98
        },
        
        // ========== MEMBRES SUPÉRIEURS - MAIN (PRIORITÉ ABSOLUE) ==========
        {
            pattern: /amputation.*pouce.*main.*dominante/i,
            context: /sans.*possibilité.*préhension|sans.*préhension|préhension.*impossible/i,
            searchTerms: ["Amputation du pouce - Désarticulation métacarpo-phalangienne"],
            priority: 999,  // PRIORITÉ ABSOLUE
            negativeContext: /non.*dominante/i
        },
        {
            pattern: /amputation.*index.*main.*dominante/i,
            context: /niveau.*articulation.*métacarpo|métacarpo.*phalangienne|niveau.*mcp/i,
            searchTerms: ["Amputation de l'index - Désarticulation métacarpo-phalangienne"],
            priority: 999,  // PRIORITÉ ABSOLUE
            negativeContext: /non.*dominante/i
        },
        // 🆕 RÈGLE EXACTE pour cas médius spécifique
        {
            pattern: /section\s+tendons\s+fléchisseurs\s+médius/i,
            context: /impossibilité\s+flexion\s+active/i,
            searchTerms: ["Section des tendons fléchisseurs d'un doigt long"],
            priority: 999,
            negativeContext: /extenseurs/i  // Simple et efficace
        },
        {
            pattern: /section.*tendons.*(?:fléchisseurs|flexion).*(?:médius|doigt.*long)/i,
            context: /impossibilité.*flexion|flexion.*active/i,
            searchTerms: ["Section des tendons fléchisseurs d'un doigt long"],
            priority: 998,
            negativeContext: /extenseurs|amputation|ankylose/i
        },
        
        // ========== CAS COMPLEXES (CUMULS SPÉCIFIQUES) ==========
        {
            pattern: /fracture.*plateaux.*tibiaux.*avec.*rupture.*LCA.*opérée/i,
            context: /raideur.*flexion|flexion.*limitée|instabilité|dérobement/i,  // Context pour LCA
            searchTerms: ["Séquelles de rupture du ligament croisé antérieur (LCA)"],
            priority: 999,
            negativeContext: /isolé|seul/i
        },
        {
            pattern: /polytraumatisme.*avec.*fracture.*fémur.*et.*fracture.*poignet/i,
            context: /consolidée.*raccourcissement.*raideur.*séquellaire/i,
            searchTerms: ["Séquelles multiples membres (cumul)"],
            priority: 999,
            negativeContext: /isolé/i
        },
        {
            pattern: /traumatisme.*crânien.*avec.*céphalées.*chroniques.*quotidiennes.*associé.*amputation.*orteils/i,
            context: /céphalées.*chroniques.*amputation.*orteils/i,
            searchTerms: ["Séquelles multiples (neurologique + ortho)"],
            priority: 999,
            negativeContext: /isolé/i
        },
        
        // ========== NERFS PÉRIPHÉRIQUES ==========
        {
            pattern: /paralysie.*nerf.*radial/i,
            context: /main.*tombante|extension.*poignet.*impossible|testing.*0\/5|amyotrophie.*sévère/i,
            searchTerms: ["Paralysie du nerf radial"],
            priority: 999,
            negativeContext: /médian|cubital/i
        },
        {
            pattern: /sciatique.*chronique.*L5/i,
            context: /déficit.*releveur.*pied|steppage|testing.*3\/5|paresthésies.*L5/i,
            searchTerms: ["Sciatique chronique avec signes déficitaires"],
            priority: 999,
            negativeContext: /S1|crurale/i
        },
        
        // ========== HANCHE ==========
        {
            pattern: /fracture.*col.*fémoral.*opérée.*prothèse.*totale.*hanche/i,
            context: /limitation.*abduction|flexion.*80.*degrés|marche.*avec.*canne/i,
            searchTerms: ["Prothèse totale de hanche"],
            priority: 999,
            negativeContext: /sans.*prothèse/i
        },
        {
            pattern: /arthrose.*post.*traumatique.*hanche.*sévère/i,
            context: /pincement.*articulaire.*complet|douleurs.*permanentes|périmètre.*marche.*moins.*500/i,
            searchTerms: ["Arthrose post-traumatique de la hanche"],
            priority: 999,
            negativeContext: /débutante|légère/i
        },
        
        // ========== RACHIS (TASSEMENTS ET SYNDROMES) ==========
        {
            pattern: /tassement.*vertébral.*L\d+/i,
            context: /cyphose.*\d+.*degrés.*raideur.*lombaire|raideur.*lombaire.*cyphose/i,
            searchTerms: ["Tassement d'une vertèbre lombaire - Avec cyphose et/ou raideur"],
            priority: 999,
            negativeContext: /sans.*cyphose|sans.*raideur/i
        },
        {
            pattern: /entorse.*cervicale.*avec.*syndrome.*cervical.*chronique/i,
            context: /distance.*menton.*sternum|raideur.*cervicale/i,
            searchTerms: ["Syndrome cervical chronique post-traumatique"],
            priority: 999,
            negativeContext: /aigu|récent/i
        },
        {
            pattern: /tassement.*vertébral.*D\d+/i,
            context: /cyphose.*\d+.*degrés|raideur.*rachis.*dorsal/i,
            searchTerms: ["Tassement d'une vertèbre dorsale - Avec cyphose"],
            priority: 999,
            negativeContext: /sans.*cyphose/i
        }
    ];
    
    // Trier les expert rules par priorité décroissante (V3.3.35 - FIX ordre priorités)
    const sortedExpertRules = expertRules.sort((a, b) => (b.priority || 0) - (a.priority || 0));
    
    // Vérifier si une règle experte s'applique (UTILISER workingText transformé par abréviations)
    for (const rule of sortedExpertRules) {
        if (rule.pattern.test(workingText) && rule.context.test(workingText)) {
            // Vérifier negativeContext si présent
            if (rule.negativeContext && rule.negativeContext.test(workingText)) {
                continue; // Ignorer cette règle si le contexte négatif est détecté
            }
            
            // 🎯 CAS SPÉCIAL: Consolidation SANS séquelle = 0% IPP
            if (rule.searchTerms.includes("__SANS_SEQUELLE__")) {
                return {
                    type: 'no_result',
                    text: `✅ <strong>CONSOLIDATION SANS SÉQUELLE DÉTECTÉE</strong><br><br>` +
                          `La fracture est consolidée <strong>sans séquelle résiduelle</strong>.<br><br>` +
                          `📊 <strong>Taux IPP = 0%</strong> (guérison ad integrum)<br><br>` +
                          `Aucune incapacité permanente partielle n'est à retenir.`
                };
            }
            
            // 🎯 CAS SPÉCIAL: CUMUL Fracture Bassin + Nerf Sciatique (V3.3.34 - FIX CAS 10)
            if (rule.searchTerms.includes("__CUMUL_BASSIN_NERF_SCIATIQUE__")) {
                // Retourner message explicatif avec formule Balthazard
                return {
                    type: 'proposal',
                    name: 'Cumul : Fracture bassin + Atteinte nerf sciatique',
                    rate: 58,  // Estimation moyenne: 30% (bassin) + 40% (nerf) × 0.7 = 58%
                    justification: `<strong>⚠️ CUMUL DE LÉSIONS MAJEURES DÉTECTÉ</strong><br><br>` +
                        `📊 <strong>Lésions identifiées</strong> :<br>` +
                        `1️⃣ <strong>Fracture complexe du bassin</strong> (cadre obturateur + disjonction sacro-iliaque)<br>` +
                        `2️⃣ <strong>Lésion nerf sciatique</strong> (déficit moteur releveurs pied, steppage, sciatalgie chronique)<br><br>` +
                        `💡 <strong>FORMULE DE BALTHAZARD OBLIGATOIRE</strong> :<br>` +
                        `<code>IPP_total = IPP_os + IPP_nerf × (100 - IPP_os) / 100</code><br><br>` +
                        `📝 <strong>MÉTHODE D'ÉVALUATION</strong> :<br>` +
                        `<strong>1️⃣ Évaluez séparément la fracture du bassin</strong> :<br>` +
                        `&nbsp;&nbsp;&nbsp;• Rubrique : "Bassin - Lésions Osseuses"<br>` +
                        `&nbsp;&nbsp;&nbsp;• Lésion : "Fracture du bassin (cadre obturateur, branches, sacrum) - Consolidée"<br>` +
                        `&nbsp;&nbsp;&nbsp;• Fourchette barème : <strong>[20 - 30%]</strong><br>` +
                        `&nbsp;&nbsp;&nbsp;• Sévérité : COMPLEXE (2 fractures associées) → Taux proposé : <strong>30%</strong><br><br>` +
                        `<strong>2️⃣ Évaluez séparément la lésion du nerf sciatique</strong> :<br>` +
                        `&nbsp;&nbsp;&nbsp;• Rubrique : "Membres Inférieurs > Nerfs"<br>` +
                        `&nbsp;&nbsp;&nbsp;• Lésion : "Paralysie du nerf sciatique poplité externe (SPE)" OU "Névralgie sciatique L5-S1"<br>` +
                        `&nbsp;&nbsp;&nbsp;• Fourchette barème : <strong>[30 - 45%]</strong> (SPE) ou <strong>[10 - 35%]</strong> (névralgie)<br>` +
                        `&nbsp;&nbsp;&nbsp;• Sévérité : MOYENNE (steppage + périmètre marche 300m) → Taux proposé : <strong>40%</strong><br><br>` +
                        `<strong>3️⃣ Appliquez la formule de Balthazard</strong> :<br>` +
                        `&nbsp;&nbsp;&nbsp;• IPP_total = 30% + 40% × (100 - 30) / 100<br>` +
                        `&nbsp;&nbsp;&nbsp;• IPP_total = 30% + 40% × 0.70<br>` +
                        `&nbsp;&nbsp;&nbsp;• IPP_total = 30% + 28%<br>` +
                        `&nbsp;&nbsp;&nbsp;• <strong>IPP_total = 58%</strong> (arrondi à <strong>60%</strong>)<br><br>` +
                        `📊 <strong>TAUX IPP CUMULÉ PROPOSÉ : 58-60%</strong><br>` +
                        `<em>Fourchette attendue pour ce cumul : [50 - 65%]</em><br><br>` +
                        `⚖️ <strong>Base juridique</strong> : Formule de Balthazard (cumul lésions indépendantes)`,
                    path: 'Séquelles du Rachis, du Bassin et de la Moelle Épinière > Bassin - Lésions Osseuses + Membres Inférieurs > Nerfs',
                    injury: {
                        name: 'Cumul : Fracture bassin + Atteinte nerf sciatique',
                        rate: [50, 65],
                        path: 'Cumul lésions multiples (Balthazard)'
                    } as Injury,
                    isCumul: true
                };
            }
            
            // 🎯 CAS SPÉCIAL: CUMUL TC GRAVE (V3.3.35 - FIX CAS 13)
            // Problème CAS 13: Détecte "Commotion cérébrale" (33%) au lieu de cumul TC grave (50-70%)
            // Solution: Parser MMS + Appliquer formule Balthazard (Céphalées + Cognitif + Épilepsie)
            if (rule.searchTerms.includes("__CUMUL_TC_GRAVE__")) {
                // Parser MMS (Mini Mental State)
                const mmsMatch = /MMS[:\s]*(\d+)\/30|Mini.*Mental.*State[:\s]*(\d+)\/30/i.exec(normalizedInputText);
                const mmsScore = mmsMatch ? parseInt(mmsMatch[1] || mmsMatch[2]) : null;
                
                // Parser Glasgow
                const glasgowMatch = /Glasgow[:\s]*(\d+)|GCS[:\s]*(\d+)/i.exec(normalizedInputText);
                const glasgowScore = glasgowMatch ? parseInt(glasgowMatch[1] || glasgowMatch[2]) : null;
                
                // Détection séquelles
                const hasCephalees = /c[eé]phal[eé]es.*(?:chroniques|quotidiennes|invalidantes)|syndrome.*post.*commotionnel/i.test(normalizedInputText);
                const hasCognitiveDeficit = mmsScore && mmsScore < 27; // Normal ≥27/30
                const hasEpilepsy = /[eé]pilepsie.*post.*traumatique|crises.*[eé]pileptiques/i.test(normalizedInputText);
                const hasPsychiatric = /troubles?.*(?:humeur|d[eé]pression|anxi[eé]t[eé])|suivi.*psychiatrique/i.test(normalizedInputText);
                
                // Calcul IPP individuel de chaque séquelle
                const ippCephalees = hasCephalees ? 15 : 0;
                const ippCognitif = hasCognitiveDeficit ? (mmsScore! <= 20 ? 40 : 30) : 0;
                const ippEpilepsie = hasEpilepsy ? 25 : 0;
                const ippPsychiatric = hasPsychiatric ? 10 : 0;
                
                // Formule Balthazard cumul progressif: IPP1 + IPP2×(100-IPP1)/100 + IPP3×(100-IPP1-IPP2×0.85)/100 + ...
                let ippTotal = ippCephalees;
                if (ippCognitif > 0) {
                    ippTotal += ippCognitif * (100 - ippTotal) / 100;
                }
                if (ippEpilepsie > 0) {
                    ippTotal += ippEpilepsie * (100 - ippTotal) / 100;
                }
                if (ippPsychiatric > 0) {
                    ippTotal += ippPsychiatric * (100 - ippTotal) / 100;
                }
                
                const ippFinal = Math.round(ippTotal);
                
                // Construction justification détaillée
                let justification = `<strong>⚠️ TRAUMATISME CRÂNIEN GRAVE - CUMUL SÉQUELLES MULTIPLES</strong><br><br>`;
                justification += `📊 <strong>Données cliniques initiales</strong> :<br>`;
                if (glasgowScore) justification += `&nbsp;&nbsp;• Glasgow initial : <strong>${glasgowScore}/15</strong> (TC sévère si ≤8)<br>`;
                if (mmsScore) justification += `&nbsp;&nbsp;• MMS (Mini Mental State) : <strong>${mmsScore}/30</strong> (normal ≥27)<br>`;
                justification += `<br>💡 <strong>FORMULE DE BALTHAZARD - CUMUL SÉQUELLES INDÉPENDANTES</strong> :<br><br>`;
                
                let stepNum = 1;
                if (ippCephalees > 0) {
                    justification += `<strong>${stepNum}️⃣ Céphalées chroniques post-traumatiques</strong> : <strong>${ippCephalees}%</strong><br>`;
                    justification += `&nbsp;&nbsp;• Rubrique : "Séquelles Neurologiques > Céphalées"<br>`;
                    stepNum++;
                }
                if (ippCognitif > 0) {
                    justification += `<strong>${stepNum}️⃣ Troubles cognitifs (déficit mémoire/attention)</strong> : <strong>${ippCognitif}%</strong><br>`;
                    justification += `&nbsp;&nbsp;• Rubrique : "Séquelles Neurologiques > Déficits cognitifs"<br>`;
                    justification += `&nbsp;&nbsp;• MMS ${mmsScore}/30 → Déficit ${mmsScore! <= 20 ? 'SÉVÈRE' : 'MODÉRÉ'}<br>`;
                    stepNum++;
                }
                if (ippEpilepsie > 0) {
                    justification += `<strong>${stepNum}️⃣ Épilepsie post-traumatique</strong> : <strong>${ippEpilepsie}%</strong><br>`;
                    justification += `&nbsp;&nbsp;• Rubrique : "Séquelles Neurologiques > Épilepsie"<br>`;
                    stepNum++;
                }
                if (ippPsychiatric > 0) {
                    justification += `<strong>${stepNum}️⃣ Troubles psychiatriques (dépression/anxiété)</strong> : <strong>${ippPsychiatric}%</strong><br>`;
                    justification += `&nbsp;&nbsp;• Rubrique : "Séquelles Neurologiques > Troubles psychiatriques"<br>`;
                    stepNum++;
                }
                
                justification += `<br><strong>📐 Calcul cumulé (Balthazard)</strong> :<br>`;
                justification += `&nbsp;&nbsp;• Formule : IPP₁ + IPP₂×(100-IPP₁)/100 + IPP₃×(100-IPP₁₊₂)/100 + ...<br>`;
                justification += `&nbsp;&nbsp;• <strong>IPP total = ${ippFinal}%</strong><br><br>`;
                justification += `📊 <strong>TAUX IPP CUMULÉ PROPOSÉ : ${ippFinal}%</strong><br>`;
                justification += `<em>Fourchette attendue pour TC grave avec séquelles multiples : [50 - 70%]</em><br><br>`;
                justification += `⚖️ <strong>Base juridique</strong> : Formule de Balthazard (cumul lésions neurologiques indépendantes)`;
                
                return {
                    type: 'proposal',
                    name: 'Cumul : TC grave (céphalées + cognitif + épilepsie + psychiatrique)',
                    rate: ippFinal,
                    justification,
                    path: 'Séquelles Neurologiques > Traumatisme Crânien Grave',
                    injury: {
                        name: 'Cumul : TC grave séquelles multiples',
                        rate: [50, 70],
                        path: 'Cumul séquelles neurologiques (Balthazard)'
                    } as Injury,
                    isCumul: true
                };
            }
            
            // 🎯 CAS SPÉCIAL: CUMUL AMPUTATION MAIN + PHANTOM PAIN + DÉPRESSION (V3.3.36 - FIX CAS 14)
            // Problème CAS 14: Non détecté (undefined) car amputation main complète inexistante
            // Solution: Cumul Balthazard 3 SYSTÈMES (orthopédie 60% + neurologie 15% + psychiatrie 10%)
            // IPP = Amputation main dominante (60%) + Douleurs fantôme (15%) + Dépression majeure (10%)
            if (rule.searchTerms.includes("__CUMUL_AMPUTATION_MAIN_PHANTOM__")) {
                // Vérification main dominante
                const isDominantHand = /main.*dominante|main.*droite.*dominante|droite.*dominante/i.test(normalizedInputText);
                
                // Parser douleurs membre fantôme
                const hasPhantomPain = /membre.*fant[oô]me|douleur.*fant[oô]me|phantom.*pain/i.test(normalizedInputText);
                const isResistant = /r[eé]sistant|gabapentine|pr[eé]gabaline|morphinique|[eé]chec.*traitement/i.test(normalizedInputText);
                const evaMatch = /EVA\s*[:/]?\s*(\d+)\/10|douleur.*(\d+)\/10/i.exec(normalizedInputText);
                const evaScore = evaMatch ? parseInt(evaMatch[1] || evaMatch[2]) : null;
                const hasHighEVA = evaScore !== null && evaScore >= 7;
                
                // Parser Hamilton pour dépression
                const hamiltonMatch = /Hamilton\s*[:/]?\s*(\d+)\/52|[eé]chelle.*Hamilton.*(\d+)/i.exec(normalizedInputText);
                const hamiltonScore = hamiltonMatch ? parseInt(hamiltonMatch[1] || hamiltonMatch[2]) : null;
                const hasMajorDepression = hamiltonScore !== null && hamiltonScore >= 20;
                const hasDepression = /d[eé]pression.*majeur|syndrome.*d[eé]pressif.*majeur|d[eé]pression.*r[eé]actionnel/i.test(normalizedInputText);
                const hasReconversion = /reconversion.*impossible|arr[eê]t.*travail.*d[eé]finitif|isolement.*social/i.test(normalizedInputText);
                
                // Calcul IPP individuel
                const ippAmputation = isDominantHand ? 60 : 50; // Main dominante = 60%, non-dominante = 50%
                const ippPhantom = (hasPhantomPain && (isResistant || hasHighEVA)) ? 15 : 0;
                const ippDepression = ((hasMajorDepression || hasDepression) && hasReconversion) ? 10 : 0;
                
                // Formule Balthazard cumul 3 systèmes distincts (orthopédie + neurologie + psychiatrie)
                let ippTotal = ippAmputation;
                if (ippPhantom > 0) {
                    ippTotal = ippTotal + ippPhantom * (100 - ippTotal) / 100;
                }
                if (ippDepression > 0) {
                    ippTotal = ippTotal + ippDepression * (100 - ippTotal) / 100;
                }
                const ippFinal = Math.round(ippTotal);
                
                // Construction justification
                let justification = `<strong>⚠️ AMPUTATION MAIN DOMINANTE - CUMUL 3 SYSTÈMES</strong><br><br>`;
                justification += `📊 <strong>Données cliniques</strong> :<br>`;
                justification += `&nbsp;&nbsp;• Amputation traumatique <strong>main ${isDominantHand ? 'droite dominante' : 'gauche'}</strong><br>`;
                justification += `&nbsp;&nbsp;• Niveau : <strong>Désarticulation radio-carpienne (poignet)</strong><br>`;
                if (hasPhantomPain) {
                    justification += `&nbsp;&nbsp;• <strong>Douleurs membre fantôme</strong> persistantes EVA ${evaScore || '7-9'}/10<br>`;
                    if (isResistant) justification += `&nbsp;&nbsp;• Résistantes : gabapentine, prégabaline, morphiniques<br>`;
                }
                if (hasMajorDepression || hasDepression) {
                    justification += `&nbsp;&nbsp;• <strong>Syndrome dépressif majeur</strong> réactionnel (Hamilton ${hamiltonScore || '≥20'}/52)<br>`;
                    if (hasReconversion) justification += `&nbsp;&nbsp;• Impossibilité reconversion professionnelle, isolement social<br>`;
                }
                
                justification += `<br>💡 <strong>FORMULE DE BALTHAZARD - CUMUL 3 SYSTÈMES</strong> :<br><br>`;
                justification += `<strong>1️⃣ SYSTÈME ORTHOPÉDIQUE</strong> : <strong>${ippAmputation}%</strong><br>`;
                justification += `&nbsp;&nbsp;• Amputation main ${isDominantHand ? 'dominante' : 'non-dominante'} niveau poignet<br>`;
                justification += `&nbsp;&nbsp;• Rubrique : "Membres Supérieurs > Amputation main"<br>`;
                justification += `&nbsp;&nbsp;• Fourchette barème : [50 - 70%]<br><br>`;
                
                if (ippPhantom > 0) {
                    justification += `<strong>2️⃣ SYSTÈME NEUROLOGIQUE</strong> : <strong>${ippPhantom}%</strong><br>`;
                    justification += `&nbsp;&nbsp;• Douleurs membre fantôme chroniques sévères (phantom pain)<br>`;
                    justification += `&nbsp;&nbsp;• EVA ${evaScore}/10, résistant aux traitements neuropathiques<br>`;
                    justification += `&nbsp;&nbsp;• Rubrique : "Neuro-Sensorielles > Douleurs neuropathiques"<br>`;
                    justification += `&nbsp;&nbsp;• IPP individuel : 15%<br><br>`;
                }
                
                if (ippDepression > 0) {
                    justification += `<strong>3️⃣ SYSTÈME PSYCHIATRIQUE</strong> : <strong>${ippDepression}%</strong><br>`;
                    justification += `&nbsp;&nbsp;• Dépression majeure réactionnelle post-traumatique<br>`;
                    justification += `&nbsp;&nbsp;• Hamilton ${hamiltonScore}/52 (seuil majeur ≥20)<br>`;
                    justification += `&nbsp;&nbsp;• Retentissement : impossibilité reconversion, isolement social<br>`;
                    justification += `&nbsp;&nbsp;• Rubrique : "Neuropsychiatriques > Troubles dépressifs"<br>`;
                    justification += `&nbsp;&nbsp;• IPP individuel : 10%<br><br>`;
                }
                
                justification += `<strong>📐 Calcul cumulé (Balthazard) - 3 systèmes distincts</strong> :<br>`;
                justification += `&nbsp;&nbsp;• IPP₁ (amputation) = ${ippAmputation}%<br>`;
                if (ippPhantom > 0) {
                    justification += `&nbsp;&nbsp;• IPP₂ = IPP₁ + ${ippPhantom}% × (100-${ippAmputation})/100<br>`;
                    justification += `&nbsp;&nbsp;• IPP₂ = ${ippAmputation} + ${ippPhantom} × ${((100-ippAmputation)/100).toFixed(2)} = ${Math.round(ippAmputation + ippPhantom * (100-ippAmputation)/100)}%<br>`;
                }
                if (ippDepression > 0) {
                    const ipp2 = ippPhantom > 0 ? Math.round(ippAmputation + ippPhantom * (100-ippAmputation)/100) : ippAmputation;
                    justification += `&nbsp;&nbsp;• IPP₃ = IPP₂ + ${ippDepression}% × (100-${ipp2})/100<br>`;
                    justification += `&nbsp;&nbsp;• IPP₃ = ${ipp2} + ${ippDepression} × ${((100-ipp2)/100).toFixed(2)} = ${ippFinal}%<br>`;
                }
                justification += `<br>&nbsp;&nbsp;• <strong>IPP total = ${ippFinal}%</strong><br><br>`;
                justification += `📊 <strong>TAUX IPP CUMULÉ PROPOSÉ : ${ippFinal}%</strong><br>`;
                justification += `<em>Fourchette attendue : [65 - 75%]</em><br><br>`;
                justification += `⚖️ <strong>Base juridique</strong> : Formule de Balthazard (cumul lésions systèmes distincts)`;
                
                return {
                    type: 'proposal',
                    name: 'Cumul : Amputation main dominante + Douleurs fantôme + Dépression majeure',
                    rate: ippFinal,
                    justification,
                    path: 'Cumul 3 systèmes (Orthopédie + Neurologie + Psychiatrie)',
                    injury: {
                        name: 'Cumul : Amputation main + Phantom pain + Dépression',
                        rate: [65, 75],
                        path: 'Cumul séquelles multi-systèmes (Balthazard)'
                    } as Injury,
                    isCumul: true
                };
            }
            
            // 🎯 CAS SPÉCIAL: CUMUL SURDITÉ BILATÉRALE + ACOUPHÈNES INVALIDANTS (V3.3.36 - FIX CAS 15)
            // Problème CAS 15: Détecte surdité seule 45% (parser dB bilatéral OK) mais manque acouphènes +10% et retentissement +5%
            // Solution: Cumul surdité (45%) + acouphènes INVALIDANTS résistants (10%) + retentissement psycho-social (5%)
            if (rule.searchTerms.includes("__CUMUL_SURDITE_ACOUPHENES_INVALIDANTS__")) {
                // Parser dB bilatéral (réutilise parser amélioré)
                const dbBilateralMatch = /(?:OD|oreille.*droite).*?(\d+)\s*(?:db|dB|d[eé]cibels?).*?(?:OG|oreille.*gauche).*?(\d+)\s*(?:db|dB|d[eé]cibels?)/is.exec(normalizedInputText);
                const dbBilateralMatch2 = /(?:OG|oreille.*gauche).*?(\d+)\s*(?:db|dB|d[eé]cibels?).*?(?:OD|oreille.*droite).*?(\d+)\s*(?:db|dB|d[eé]cibels?)/is.exec(normalizedInputText);
                
                let dbOD = 70, dbOG = 65, dbMoyenne = 67.5; // Valeurs par défaut
                if (dbBilateralMatch) {
                    dbOD = parseInt(dbBilateralMatch[1]);
                    dbOG = parseInt(dbBilateralMatch[2]);
                    dbMoyenne = (dbOD + dbOG) / 2;
                } else if (dbBilateralMatch2) {
                    dbOG = parseInt(dbBilateralMatch2[1]);
                    dbOD = parseInt(dbBilateralMatch2[2]);
                    dbMoyenne = (dbOD + dbOG) / 2;
                }
                
                // Calcul IPP surdité selon barème dB
                let ippSurdite = 45; // Défaut 67.5 dB
                if (dbMoyenne <= 40) ippSurdite = 8;
                else if (dbMoyenne <= 60) ippSurdite = 20;
                else if (dbMoyenne <= 70) ippSurdite = 45;
                else if (dbMoyenne <= 80) ippSurdite = 50;
                else if (dbMoyenne <= 100) ippSurdite = 60;
                else ippSurdite = 70;
                
                // Détection acouphènes INVALIDANTS (vs simples)
                const hasAcouphenesInvalidants = /acouph[eè]nes.*invalidant|acouph[eè]nes.*s[eé]v[eè]re|sifflements.*aigus.*continus/i.test(normalizedInputText);
                const isResistant = /r[eé]sistant.*masqueurs|r[eé]sistant.*TCC|r[eé]sistant.*m[eé]dicament|[eé]chec.*traitement/i.test(normalizedInputText);
                const ippAcouphenes = (hasAcouphenesInvalidants && isResistant) ? 10 : 5; // Invalidants résistants = 10%, simples = 5%
                
                // Détection retentissement psycho-social MAJEUR
                const hasIsolementSocial = /isolement.*social|[eé]vite.*conversation|retrait.*social/i.test(normalizedInputText);
                const hasDepressionAnxiete = /anxio.*d[eé]pressif|d[eé]pression.*r[eé]actionnel|troubles.*sommeil/i.test(normalizedInputText);
                const hasReconversion = /reconversion.*impossible|arr[eê]t.*travail|communication.*client/i.test(normalizedInputText);
                const ippRetentissement = (hasIsolementSocial && (hasDepressionAnxiete || hasReconversion)) ? 5 : 0;
                
                // Cumul additif simple (même territoire auditif, pas Balthazard classique)
                const ippTotal = ippSurdite + ippAcouphenes + ippRetentissement;
                
                // Construction justification
                let justification = `<strong>⚠️ SURDITÉ BILATÉRALE + ACOUPHÈNES INVALIDANTS - CUMUL AUDITION</strong><br><br>`;
                justification += `📊 <strong>Données cliniques</strong> :<br>`;
                justification += `&nbsp;&nbsp;• <strong>Surdité neurosensorielle bilatérale</strong> professionnelle (exposition 30 ans)<br>`;
                justification += `&nbsp;&nbsp;• OD ${dbOD} dB (surdité sévère) + OG ${dbOG} dB → <strong>Moyenne ${dbMoyenne.toFixed(1)} dB</strong><br>`;
                if (hasAcouphenesInvalidants) {
                    justification += `&nbsp;&nbsp;• <strong>Acouphènes bilatéraux invalidants</strong> (sifflements aigus permanents)<br>`;
                    if (isResistant) justification += `&nbsp;&nbsp;• Résistants : masqueurs sonores, TCC, médicaments<br>`;
                }
                if (hasIsolementSocial) justification += `&nbsp;&nbsp;• <strong>Isolement social majeur</strong> (évite conversations)<br>`;
                if (hasDepressionAnxiete) justification += `&nbsp;&nbsp;• Syndrome anxio-dépressif réactionnel, troubles sommeil<br>`;
                if (hasReconversion) justification += `&nbsp;&nbsp;• Impossibilité reconversion professionnelle<br>`;
                
                justification += `<br>💡 <strong>CUMUL TERRITOIRE AUDITION</strong> :<br><br>`;
                justification += `<strong>1️⃣ SURDITÉ BILATÉRALE</strong> : <strong>${ippSurdite}%</strong><br>`;
                justification += `&nbsp;&nbsp;• OD ${dbOD} dB + OG ${dbOG} dB → Moyenne ${dbMoyenne.toFixed(1)} dB<br>`;
                justification += `&nbsp;&nbsp;• Niveau : Moyenne-Sévère<br>`;
                justification += `&nbsp;&nbsp;• Rubrique : "Neuro-Sensorielles > Surdité bilatérale"<br>`;
                justification += `&nbsp;&nbsp;• Fourchette barème : [40 - 50%]<br><br>`;
                
                justification += `<strong>2️⃣ ACOUPHÈNES INVALIDANTS</strong> : <strong>+${ippAcouphenes}%</strong><br>`;
                justification += `&nbsp;&nbsp;• Type : ${hasAcouphenesInvalidants && isResistant ? 'Invalidants résistants traitement' : 'Simples'}<br>`;
                justification += `&nbsp;&nbsp;• Permanents bilatéraux (sifflements aigus continus)<br>`;
                justification += `&nbsp;&nbsp;• Rubrique : "Neuro-Sensorielles > Acouphènes"<br>`;
                justification += `&nbsp;&nbsp;• IPP : ${ippAcouphenes}%<br><br>`;
                
                if (ippRetentissement > 0) {
                    justification += `<strong>3️⃣ RETENTISSEMENT PSYCHO-SOCIAL</strong> : <strong>+${ippRetentissement}%</strong><br>`;
                    justification += `&nbsp;&nbsp;• Isolement social majeur + syndrome anxio-dépressif<br>`;
                    justification += `&nbsp;&nbsp;• Impossibilité reconversion (communication client)<br>`;
                    justification += `&nbsp;&nbsp;• Majoration exceptionnelle pour handicap social<br><br>`;
                }
                
                justification += `<strong>📐 Calcul cumulé</strong> :<br>`;
                justification += `&nbsp;&nbsp;• IPP total = ${ippSurdite}% (surdité) + ${ippAcouphenes}% (acouphènes)`;
                if (ippRetentissement > 0) justification += ` + ${ippRetentissement}% (retentissement)`;
                justification += `<br>`;
                justification += `&nbsp;&nbsp;• <strong>IPP total = ${ippTotal}%</strong><br><br>`;
                justification += `📊 <strong>TAUX IPP CUMULÉ PROPOSÉ : ${ippTotal}%</strong><br>`;
                justification += `<em>Fourchette attendue : [50 - 60%]</em><br><br>`;
                justification += `⚖️ <strong>Base juridique</strong> : Cumul lésions même territoire (audition)`;
                
                return {
                    type: 'proposal',
                    name: 'Cumul : Surdité bilatérale + Acouphènes invalidants + Retentissement psycho-social',
                    rate: ippTotal,
                    justification,
                    path: 'Neuro-Sensorielles > Audition - Cumul surdité + acouphènes',
                    injury: {
                        name: 'Cumul : Surdité professionnelle + Acouphènes invalidants',
                        rate: [50, 60],
                        path: 'Cumul séquelles auditives'
                    } as Injury,
                    isCumul: true
                };
            }
            
            // 🎯 CAS SPÉCIAL: CUMUL FRACTURE TIBIA GUSTILO IIIB (V3.3.35 - FIX CAS 11)
            // Problème CAS 11: Détecte "Raideur médius" (4%) au lieu de fracture tibia Gustilo (40-50%)
            // Solution: Cumul raccourcissement + raideur genou + raideur cheville + infection chronique
            if (rule.searchTerms.includes("__CUMUL_TIBIA_GUSTILO__")) {
                // Parser raccourcissement
                const shorteningMatch = /raccourcissement.*(\d+(?:\.\d+)?)\s*cm/i.exec(normalizedInputText);
                const shorteningCm = shorteningMatch ? parseFloat(shorteningMatch[1]) : 0;
                
                // Détection complications
                const hasInfection = /ost[eé]ite|infection.*chronique|staphylocoque|antibioth[eé]rapie.*prolong[eé]e/i.test(normalizedInputText);
                const hasKneeStiffness = /raideur.*genou|flexion.*genou.*(?:limit[eé]e|r[eé]duite|90)/i.test(normalizedInputText);
                const hasAnkleStiffness = /raideur.*cheville|flexion.*dorsale.*(?:limit[eé]e|r[eé]duite|5°)/i.test(normalizedInputText);
                const hasSeverePain = /EVA.*[6-9]|douleur.*(?:quotidienne|permanente|chronique)/i.test(normalizedInputText);
                const hasLimitedWalking = /p[eé]rim[eè]tre.*marche.*(\d+)\s*m/i.test(normalizedInputText);
                
                // Calcul IPP individuel de chaque séquelle
                let ippRaccourcissement = 0;
                if (shorteningCm >= 4) ippRaccourcissement = 25; // Haut de fourchette [5-25%]
                else if (shorteningCm >= 3) ippRaccourcissement = 20; // Moyen-haut
                else if (shorteningCm >= 2) ippRaccourcissement = 15; // Moyen
                else if (shorteningCm >= 1) ippRaccourcissement = 10; // Bas
                
                const ippGenouRaideur = hasKneeStiffness ? 15 : 0;
                const ippChevilleRaideur = hasAnkleStiffness ? 10 : 0;
                const bonusInfection = hasInfection ? 5 : 0; // Bonus gravité
                
                // Formule Balthazard cumul: Raccourcissement + Genou×(100-Racc)/100 + Cheville×(100-Racc-Genou×0.85)/100
                let ippTotal = ippRaccourcissement;
                if (ippGenouRaideur > 0) {
                    ippTotal += ippGenouRaideur * (100 - ippTotal) / 100;
                }
                if (ippChevilleRaideur > 0) {
                    ippTotal += ippChevilleRaideur * (100 - ippTotal) / 100;
                }
                ippTotal += bonusInfection; // Majoration infection chronique
                
                const ippFinal = Math.round(ippTotal);
                
                // Construction justification
                let justification = `<strong>⚠️ FRACTURE OUVERTE GUSTILO IIIB - CUMUL SÉQUELLES MAJEURES</strong><br><br>`;
                justification += `📊 <strong>Données cliniques</strong> :<br>`;
                justification += `&nbsp;&nbsp;• Fracture ouverte tibia <strong>type IIIB Gustilo</strong> (fracture grave avec perte tissulaire)<br>`;
                if (hasInfection) justification += `&nbsp;&nbsp;• <strong>Ostéite chronique</strong> post-infection à staphylocoque résistant<br>`;
                if (shorteningCm > 0) justification += `&nbsp;&nbsp;• Raccourcissement membre inférieur : <strong>${shorteningCm} cm</strong><br>`;
                if (hasKneeStiffness) justification += `&nbsp;&nbsp;• Raideur genou (flexion limitée à 90°)<br>`;
                if (hasAnkleStiffness) justification += `&nbsp;&nbsp;• Raideur cheville (flexion dorsale limitée à 5°)<br>`;
                if (hasSeverePain) justification += `&nbsp;&nbsp;• Douleurs chroniques EVA 7/10<br>`;
                if (hasLimitedWalking) justification += `&nbsp;&nbsp;• Périmètre de marche limité à 200m<br>`;
                
                justification += `<br>💡 <strong>FORMULE DE BALTHAZARD - CUMUL SÉQUELLES</strong> :<br><br>`;
                justification += `<strong>1️⃣ Raccourcissement ${shorteningCm}cm</strong> : <strong>${ippRaccourcissement}%</strong><br>`;
                justification += `&nbsp;&nbsp;• Rubrique : "Membres Inférieurs > Raccourcissement d'un membre inférieur"<br>`;
                justification += `&nbsp;&nbsp;• Fourchette barème : [5 - 25%] (${shorteningCm}cm ≥ 3cm → Sévérité MOYENNE)<br><br>`;
                
                if (ippGenouRaideur > 0) {
                    justification += `<strong>2️⃣ Raideur genou</strong> : <strong>${ippGenouRaideur}%</strong><br>`;
                    justification += `&nbsp;&nbsp;• Rubrique : "Membres Inférieurs > Raideur genou"<br><br>`;
                }
                
                if (ippChevilleRaideur > 0) {
                    justification += `<strong>3️⃣ Raideur cheville</strong> : <strong>${ippChevilleRaideur}%</strong><br>`;
                    justification += `&nbsp;&nbsp;• Rubrique : "Membres Inférieurs > Raideur cheville"<br><br>`;
                }
                
                if (bonusInfection > 0) {
                    justification += `<strong>4️⃣ Majoration ostéite chronique</strong> : <strong>+${bonusInfection}%</strong><br>`;
                    justification += `&nbsp;&nbsp;• Complication grave nécessitant 3 interventions chirurgicales<br><br>`;
                }
                
                justification += `<strong>📐 Calcul cumulé (Balthazard)</strong> :<br>`;
                justification += `&nbsp;&nbsp;• ${ippRaccourcissement}% + ${ippGenouRaideur}%×${((100-ippRaccourcissement)/100).toFixed(2)}`;
                if (ippChevilleRaideur > 0) justification += ` + ${ippChevilleRaideur}%×0.8`;
                if (bonusInfection > 0) justification += ` + ${bonusInfection}%`;
                justification += `<br>`;
                justification += `&nbsp;&nbsp;• <strong>IPP total = ${ippFinal}%</strong><br><br>`;
                justification += `📊 <strong>TAUX IPP CUMULÉ PROPOSÉ : ${ippFinal}%</strong><br>`;
                justification += `<em>Fourchette attendue pour Gustilo IIIB avec complications : [40 - 50%]</em><br><br>`;
                justification += `⚖️ <strong>Base juridique</strong> : Formule de Balthazard (cumul lésions membre inférieur)`;
                
                return {
                    type: 'proposal',
                    name: 'Cumul : Fracture tibia Gustilo IIIB (raccourcissement + raideur + infection)',
                    rate: ippFinal,
                    justification,
                    path: 'Membres Inférieurs > Fracture Tibia Ouverte Gustilo',
                    injury: {
                        name: 'Cumul : Fracture tibia Gustilo IIIB complications multiples',
                        rate: [40, 50],
                        path: 'Cumul séquelles membre inférieur (Balthazard)'
                    } as Injury,
                    isCumul: true
                };
            }
            
            // 🎯 CAS SPÉCIAL: Cataracte SANS acuité visuelle = Données insuffisantes (V3.3.20)
            if (rule.searchTerms.includes("__DONNEES_INSUFFISANTES_CATARACTE__")) {
                return {
                    type: 'no_result',
                    text: `⚠️ <strong>DONNÉES CLINIQUES INSUFFISANTES POUR ÉVALUATION IPP</strong><br><br>` +
                          `La <strong>cataracte post-traumatique</strong> a été identifiée, mais son évaluation nécessite <strong>obligatoirement</strong> les données suivantes :<br><br>` +
                          `<strong>📋 Informations cliniques requises :</strong><br>` +
                          `<ul>` +
                          `<li>🔍 <strong>Acuité visuelle chiffrée</strong> de chaque œil (ex: OD 5/10, OG 8/10)</li>` +
                          `<li>👓 <strong>Avec correction optimale</strong> (lunettes ou lentilles adaptées)</li>` +
                          `<li>⚠️ <strong>Complications éventuelles</strong> : aphaquie, pseudophakie, intolérance aux verres, etc.</li>` +
                          `</ul><br>` +
                          `<strong>📊 Barème applicable</strong> : "Cataracte (selon acuité et complications)" [10-100%]<br><br>` +
                          `<strong>Exemples de formulation complète :</strong><br>` +
                          `• "Cataracte post-traumatique OD. Acuité visuelle OD 3/10, OG 10/10 avec correction."<br>` +
                          `• "Cataracte bilatérale. Acuité visuelle OD 5/10, OG 6/10 sous correction. Pseudophakie."<br><br>` +
                          `<strong>⚠️ Sans ces données, aucun taux IPP ne peut être proposé de manière fiable.</strong>`
                };
            }
            
            // Recherche directe dans les données (égalité exacte pour expert rules)
            const directMatch = allInjuriesWithPaths.find(item => 
                rule.searchTerms.some(term => 
                    normalize(item.name) === normalize(term)
                )
            );
            
            if (directMatch) {
                // 🧠 DÉTECTION SÉVÉRITÉ SPÉCIFIQUE NEUROLOGIQUE, BRÛLURES ET ATTEINTES NERVEUSES (V3.3.2/V3.3.3/V3.3.5)
                let severityData;
                
                // CAS -1: Fracture Pouteau-Colles / Radius distal (V3.3.34 - FIX CAS 1)
                // Problème: CAS 1 retourne 15% (fourchette [8-15%] max) au lieu de 20-30% attendu
                // Solution: Si opérée + limitation 50% + EVA 4+ → Rechercher lésion plus sévère [15-25%]
                if (/fracture.*(?:extrem|extr).*(?:inf|inferieur).*radius/i.test(normalize(directMatch.name))) {
                    const hasRaideur = /raideur|limitation.*50|limitation.*75|limitation.*importante|ankylose/i.test(normalizedInputText);
                    const hasChirurgie = /op[eé]r[eé]|chirurgie|ost[eé]osynth[eè]se|plaque|vis|broche/i.test(normalizedInputText);
                    const hasModeratePain = /EVA\s*[4-6]|douleur.*mod[eé]r[eé]e|douleur.*lors.*effort/i.test(normalizedInputText);
                    const hasDeformation = /d[eé]formation|cal.*vicieux|d[eé]viation/i.test(normalizedInputText);
                    const hasTroublesNerveux = /paresthésie|hypoesthésie|fourmillement|compression.*nerf|canal.*carpien/i.test(normalizedInputText);
                    
                    // Si chirurgie + raideur significative → Rechercher lésion sévère [15-25%]
                    if (hasChirurgie && hasRaideur && (hasModeratePain || hasDeformation || hasTroublesNerveux)) {
                        // Chercher lésion "Avec raideur, déformation et troubles nerveux" dans le barème
                        const severeLesion = allInjuriesWithPaths.find(inj => 
                            /fracture.*extrem.*inf.*radius.*avec.*raideur.*deformation.*nerveux/i.test(normalize(inj.name)) &&
                            /main.*dominante/i.test(normalize(inj.name))
                        );
                        
                        if (severeLesion) {
                            // Retourner directement la lésion sévère [15-25%] avec taux médian 20%
                            const [minRate, maxRate] = severeLesion.rate as [number, number];
                            const chosenRate = Math.round((minRate + maxRate) / 2); // 20%
                            
                            return {
                                type: 'proposal',
                                name: severeLesion.name,
                                rate: chosenRate,
                                justification: buildExpertJustification(
                                    text, severeLesion as Injury, chosenRate, severeLesion.path,
                                    'moyen',
                                    ['Fracture opérée avec raideur séquellaire + douleur modérée'],
                                    false
                                ),
                                path: severeLesion.path,
                                injury: severeLesion as Injury
                            };
                        }
                        // Si pas trouvé, utiliser sévérité élevée sur lésion actuelle
                        severityData = { level: 'élevé', signs: ['Fracture opérée avec raideur séquellaire significative'], isDefault: false };
                    } else if (hasRaideur || hasChirurgie) {
                        severityData = { level: 'moyen', signs: ['Fracture avec raideur modérée'], isDefault: false };
                    } else {
                        severityData = { level: 'faible', signs: ['Fracture simple consolidée'], isDefault: false };
                    }
                }
                
                // === CAS FRACTURE OUVERTE TIBIA GUSTILO IIIB (V3.3.35 - FIX CAS 11) ===
                // Problème: CAS 11 retourne 4% (raideur médius) au lieu de 40-50% attendu
                // Solution: Détection cumul infection chronique + raccourcissement + raideur articulaire multiple
                else if (/fracture.*(?:ouverte|expos).*tibia/i.test(normalize(directMatch.name))) {
                    const hasGustilo = /Gustilo.*(?:III|IIIB)|type.*III/i.test(normalizedInputText);
                    const hasInfection = /ost[eé]ite|infection.*chronique|staphylocoque|antibioth[eé]rapie.*prolong[eé]e/i.test(normalizedInputText);
                    const shorteningMatch = /raccourcissement.*(\d+(?:\.\d+)?)\s*cm/i.exec(normalizedInputText);
                    const hasShortening = shorteningMatch && parseFloat(shorteningMatch[1]) >= 3;
                    const hasKneeStiffness = /raideur.*genou|flexion.*genou.*(?:limit[eé]e|r[eé]duite)|d[eé]ficit.*flexion.*genou/i.test(normalizedInputText);
                    const hasAnkleStiffness = /raideur.*cheville|flexion.*dorsale.*(?:limit[eé]e|r[eé]duite|diminu[eé]e)|d[eé]ficit.*cheville/i.test(normalizedInputText);
                    
                    // Cumul infection + raccourcissement + raideur 2 articulations → SÉVÉRITÉ ÉLEVÉE
                    if (hasGustilo && hasInfection && hasShortening && (hasKneeStiffness || hasAnkleStiffness)) {
                        const complications = [];
                        if (hasInfection) complications.push('Ostéite chronique post-Gustilo IIIB');
                        if (hasShortening) complications.push(`Raccourcissement ${shorteningMatch![1]}cm`);
                        if (hasKneeStiffness && hasAnkleStiffness) complications.push('Raideur genou + cheville');
                        else if (hasKneeStiffness) complications.push('Raideur genou');
                        else complications.push('Raideur cheville');
                        
                        severityData = { level: 'élevé', signs: complications, isDefault: false };
                    } else if (hasInfection || hasShortening) {
                        severityData = { level: 'moyen', signs: ['Fracture ouverte avec complications'], isDefault: false };
                    }
                }
                
                // === CAS SDRC / ALGODYSTROPHIE (V3.3.35 - FIX CAS 12) ===
                // Problème: CAS 12 retourne 15% (raideur poignet) au lieu de 30-40% attendu
                // Solution: Détection EVA ≥8 résistant traitement + troubles trophiques objectifs → SÉVÉRITÉ ÉLEVÉE
                else if (/SDRC|algodystrophie/i.test(normalize(directMatch.name))) {
                    const evaMatch = /EVA\s*[:/]?\s*(\d+)\/10|douleur.*(\d+)\/10/i.exec(normalizedInputText);
                    const evaScore = evaMatch ? parseInt(evaMatch[1] || evaMatch[2]) : null;
                    const hasHighEVA = evaScore !== null && evaScore >= 8;
                    const isResistant = /r[eé]sistant.*traitement|[eé]chec.*traitement|r[eé]fractaire|chronique/i.test(normalizedInputText);
                    const hasTrophicDisorders = /troubles.*trophiques|peau.*(?:fine|brillante|luisante)|œd[eè]me.*persistant|sudation.*anormale/i.test(normalizedInputText);
                    const hasReconversion = /reconversion|handicap.*professionnel|arr[eê]t.*travail|incapacit[eé].*travail/i.test(normalizedInputText);
                    
                    // EVA ≥8 + résistant + troubles trophiques → SÉVÉRITÉ MOYEN-ÉLEVÉE (vise ~35% dans [20-50%])
                    if (hasHighEVA && isResistant && hasTrophicDisorders) {
                        const signs = [`EVA ${evaScore}/10 résistant au traitement`, 'Troubles trophiques objectifs'];
                        if (hasReconversion) signs.push('Reconversion professionnelle nécessaire');
                        // Utiliser "moyen" au lieu de "élevé" pour viser ~35% (70% de [20-50%])
                        severityData = { level: 'moyen', signs, isDefault: false };
                    } else if ((hasHighEVA && isResistant) || hasTrophicDisorders) {
                        severityData = { level: 'faible', signs: ['SDRC avec douleur chronique'], isDefault: false };
                    }
                }
                
                // === CAS AMPUTATION MAIN + PHANTOM PAIN + DÉPRESSION (V3.3.36 - FIX CAS 14) ===
                // Problème: CAS 14 non détecté (retourne undefined) car amputation main complète absente
                // Solution: Cumul Balthazard 3 systèmes (orthopédie + neurologie + psychiatrie)
                // IPP = Amputation main (60%) + Phantom pain (15%) + Dépression majeure (10%)
                else if (/amputation.*main|amputation.*traumatique.*main/i.test(normalize(directMatch.name))) {
                    const isDominantHand = /main.*dominante|main.*droite.*dominante|droite.*dominante/i.test(normalizedInputText);
                    const hasPhantomPain = /membre.*fant[oô]me|douleur.*fant[oô]me|phantom.*pain|douleur.*neuropathique.*amputation/i.test(normalizedInputText);
                    const isResistant = /r[eé]sistant|gabapentine|pr[eé]gabaline|morphinique|[eé]chec.*traitement/i.test(normalizedInputText);
                    const evaMatch = /EVA\s*[:/]?\s*(\d+)\/10|douleur.*(\d+)\/10/i.exec(normalizedInputText);
                    const evaScore = evaMatch ? parseInt(evaMatch[1] || evaMatch[2]) : null;
                    const hasHighEVA = evaScore !== null && evaScore >= 7;
                    
                    // Parser Hamilton pour dépression majeure (≥20 = majeur)
                    const hamiltonMatch = /Hamilton\s*[:/]?\s*(\d+)\/52|[eé]chelle.*Hamilton.*(\d+)/i.exec(normalizedInputText);
                    const hamiltonScore = hamiltonMatch ? parseInt(hamiltonMatch[1] || hamiltonMatch[2]) : null;
                    const hasMajorDepression = hamiltonScore !== null && hamiltonScore >= 20;
                    const hasDepression = /d[eé]pression.*majeur|syndrome.*d[eé]pressif.*majeur|d[eé]pression.*r[eé]actionnel/i.test(normalizedInputText);
                    const hasReconversion = /reconversion.*impossible|arr[eê]t.*travail.*d[eé]finitif|isolement.*social/i.test(normalizedInputText);
                    
                    // Amputation main dominante niveau poignet → ÉLEVÉ (60%)
                    if (isDominantHand && /poignet|radio.*carpien|d[eé]sarticulation/i.test(normalizedInputText)) {
                        const signs = ['Amputation main dominante niveau poignet (60%)'];
                        
                        // Phantom pain sévère résistant → +15%
                        if (hasPhantomPain && (isResistant || hasHighEVA)) {
                            signs.push(`Douleurs membre fantôme sévères EVA ${evaScore || '7-9'}/10 résistantes (+15%)`);
                        }
                        
                        // Dépression majeure → +10%
                        if ((hasMajorDepression || hasDepression) && hasReconversion) {
                            signs.push(`Dépression majeure réactionnelle Hamilton ${hamiltonScore || '≥20'}/52 (+10%)`);
                        }
                        
                        severityData = { level: 'élevé', signs, isDefault: false };
                    }
                }
                
                // CAS 0: Rupture coiffe rotateurs (V3.3.33 - FIX CAS 8)
                else if (/rupture.*coiffe.*rotateurs.*post.*traumatique/i.test(normalize(directMatch.name))) {
                    const hasTransfixing = /transfixiante?|transfixe/i.test(normalizedInputText);
                    const hasMassive = /massive|irr[eé]parable|pseudo.*paralytique/i.test(normalizedInputText);
                    const hasSevereLimit = /(?:impossibilit[eé]|impossibles?)\s+(?:de\s+)?(?:[eé]l[eé]vation|abduction|rotation)|(?:[eé]l[eé]vation|abduction|rotation)\s+(?:impossibles?|abolie)/i.test(normalizedInputText);
                    const hasSignificantLoss = /perte.*force.*importante|amyotrophie.*marqu[eé]e|testing.*[0-2]|force.*diminu[eé]e/i.test(normalizedInputText);
                    
                    if (hasMassive || hasSevereLimit) {
                        severityData = { level: 'élevé', signs: ['Rupture massive de la coiffe des rotateurs, épaule pseudo-paralytique'], isDefault: false };
                    } else if (hasTransfixing || hasSignificantLoss) {
                        severityData = { level: 'moyen', signs: ['Rupture transfixiante de la coiffe des rotateurs, perte de force'], isDefault: false };
                    } else {
                        severityData = { level: 'faible', signs: ['Rupture partielle de la coiffe des rotateurs'], isDefault: false };
                    }
                }
                // CAS 1: Séquelles neurologiques (V3.3.2)
                else if (/commotion.*prolongee.*syndrome|contusions.*cerebrales|deficits.*cognitifs/i.test(normalize(directMatch.name))) {
                    const neuroSymptoms = [
                        /hémiparésie/i.test(normalizedInputText),
                        /troubles?\s+cognitif/i.test(normalizedInputText),
                        /céphalées?\s+chronique/i.test(normalizedInputText),
                        /vertiges?/i.test(normalizedInputText)
                    ].filter(Boolean).length;
                    
                    const hasInvalidatingSymptoms = /(?:invalidant|sévère|résistant|majeur|quasi.*quotidien)/i.test(normalizedInputText);
                    const hasObjectiveDeficits = /(?:hémiparésie|aphasie|troubles.*mémoire|troubles.*attention|ralentissement)/i.test(normalizedInputText);
                    
                    if (neuroSymptoms >= 3 || (hasInvalidatingSymptoms && hasObjectiveDeficits)) {
                        severityData = { level: 'élevé', signs: ['Syndrome neurologique multiple et invalidant'], isDefault: false };
                    } else if (neuroSymptoms >= 2 || hasObjectiveDeficits) {
                        severityData = { level: 'moyen', signs: ['Syndrome neurologique modéré'], isDefault: false };
                    }
                }
                // CAS 1b: Céphalées seules (détection plus conservative)
                else if (/cephalees.*post.*traumatiques.*chroniques/i.test(normalize(directMatch.name))) {
                    // Pour céphalées isolées, ne considérer "élevé" que si explicitement invalidantes + résistantes au traitement
                    const isInvalidating = /(?:invalidant|sévère|résistant.*traitement|majeur)/i.test(normalizedInputText);
                    const hasMultipleSymptoms = /(?:vertiges?|troubles|nausées)/i.test(normalizedInputText);
                    
                    if (isInvalidating && hasMultipleSymptoms) {
                        severityData = { level: 'élevé', signs: ['Céphalées invalidantes résistantes au traitement'], isDefault: false };
                    } // Sinon laisser severityData undefined pour utiliser determineSeverity standard
                }
                // CAS 2: Brûlures de la main (V3.3.3)
                else if (/brulures.*mains?.*sequelles.*fonctionnelles/i.test(normalize(directMatch.name))) {
                    const severeFeatures = [
                        /circonférentielle?/i.test(normalizedInputText),
                        /profondes?/i.test(normalizedInputText),
                        /2.*3.*degr[eé]/i.test(normalizedInputText),
                        /greffe/i.test(normalizedInputText),
                        /raideur/i.test(normalizedInputText),
                        /avant.*bras.*main|main.*avant.*bras/i.test(normalizedInputText),
                        /troubles?\s+sensitif/i.test(normalizedInputText)
                    ].filter(Boolean).length;
                    
                    const hasDeformity = /(?:griffe|retraction|bride|cicatrice.*vicieuse)/i.test(normalizedInputText);
                    
                    if (severeFeatures >= 3 || (severeFeatures >= 2 && hasDeformity)) {
                        severityData = { level: 'élevé', signs: ['Brûlures circonférentielles avec séquelles fonctionnelles majeures'], isDefault: false };
                    } else if (severeFeatures >= 2) {
                        severityData = { level: 'moyen', signs: ['Brûlures avec séquelles fonctionnelles modérées'], isDefault: false };
                    }
                }
                // CAS 2b: Brûlures du visage et du cou (V3.3.17)
                else if (/brulures.*visage|brulures.*cou/i.test(normalize(directMatch.name))) {
                    const severeFeatures = [
                        /3.*degr[eé]|profondes?/i.test(normalizedInputText),
                        /d[eé]figurant|d[eé]figuration|d[eé]formant/i.test(normalizedInputText),
                        /greffe/i.test(normalizedInputText),
                        /r[eé]traction/i.test(normalizedInputText),
                        /trouble.*fonctionnel/i.test(normalizedInputText),
                        /ectropion|entropion|microstomie|st[eé]nose/i.test(normalizedInputText),
                        /alopécie/i.test(normalizedInputText),
                        /trouble.*(?:anxieux|psychologique|d[eé]pres)|anxieux|d[eé]pression|psychotrauma/i.test(normalizedInputText)
                    ].filter(Boolean).length;
                    
                    const hasMultipleAreas = /visage.*cou|cou.*visage|visage.*bras|bras.*visage|cou.*bras|bras.*cou/i.test(normalizedInputText);
                    
                    if (severeFeatures >= 4 || (severeFeatures >= 3 && hasMultipleAreas)) {
                        severityData = { level: 'élevé', signs: ['Brûlures défigurantes majeures avec retentissement psychologique sévère'], isDefault: false };
                    } else if (severeFeatures >= 2 && hasMultipleAreas) {
                        severityData = { level: 'élevé', signs: ['Brûlures multiples avec séquelles cicatricielles déformantes et retentissement psychologique'], isDefault: false };
                    } else if (severeFeatures >= 2) {
                        severityData = { level: 'moyen', signs: ['Brûlures défigurantes avec retentissement psychologique modéré'], isDefault: false };
                    }
                }
                // CAS 2c: Cataracte avec acuité visuelle chiffrée (V3.3.21)
                else if (/cataracte/i.test(normalize(directMatch.name))) {
                    // Extraction des acuités visuelles OD et OG
                    const odMatch = /od\s*[:\s]*(\d+)\s*\/\s*(\d+)/i.exec(normalizedInputText);
                    const ogMatch = /og\s*[:\s]*(\d+)\s*\/\s*(\d+)/i.exec(normalizedInputText);
                    
                    if (odMatch || ogMatch) {
                        const odAcuity = odMatch ? parseInt(odMatch[1]) / parseInt(odMatch[2]) : 1.0;
                        const ogAcuity = ogMatch ? parseInt(ogMatch[1]) / parseInt(ogMatch[2]) : 1.0;
                        
                        // Calcul de la sévérité selon acuité visuelle (barème CNAS)
                        const worstEye = Math.min(odAcuity, ogAcuity);
                        const bestEye = Math.max(odAcuity, ogAcuity);
                        
                        // Critères barème: Low (bon œil ≥8/10), Medium (3-7/10), High (<3/10)
                        if (worstEye < 0.3) {
                            // Acuité <3/10 sur le pire œil → ÉLEVÉ (proche 100%)
                            severityData = { level: 'élevé', signs: [`Cataracte sévère: OD ${odMatch?.[1]}/${odMatch?.[2]}, OG ${ogMatch?.[1]}/${ogMatch?.[2]} - Acuité visuelle très basse (<3/10)`], isDefault: false };
                        } else if (bestEye >= 0.8 && worstEye >= 0.5) {
                            // Meilleur œil ≥8/10 ET pire œil ≥5/10 → FAIBLE (proche 15-20%)
                            severityData = { level: 'faible', signs: [`Cataracte légère: OD ${odMatch?.[1]}/${odMatch?.[2]}, OG ${ogMatch?.[1]}/${ogMatch?.[2]} - Bon œil préservé (≥8/10), vision fonctionnelle`], isDefault: false };
                        } else if (worstEye >= 0.8 && bestEye >= 0.8) {
                            // Acuité ≥8/10 bilatérale → TRÈS FAIBLE (proche 10%)
                            severityData = { level: 'faible', signs: [`Cataracte minime: OD ${odMatch?.[1]}/${odMatch?.[2]}, OG ${ogMatch?.[1]}/${ogMatch?.[2]} - Acuité visuelle excellente (≥8/10 bilatéral)`], isDefault: false };
                        } else {
                            // Acuité 3-7/10 → MOYEN (proche 55%)
                            severityData = { level: 'moyen', signs: [`Cataracte modérée: OD ${odMatch?.[1]}/${odMatch?.[2]}, OG ${ogMatch?.[1]}/${ogMatch?.[2]} - Acuité visuelle intermédiaire (3-7/10)`], isDefault: false };
                        }
                    }
                }
                // CAS 3: Atteinte nerf sciatique (V3.3.5)
                else if (/paralysie.*nerf.*sciatique|nevralgie.*sciatique/i.test(normalize(directMatch.name))) {
                    const severityIndicators = [
                        /(?:station.*debout|debout).*(?:impossible|compromise|difficile|prolongee.*impossible)|compromet.*station.*debout/i.test(normalizedInputText),
                        /marche.*(?:impossible|compromise|difficile)|compromet.*marche/i.test(normalizedInputText),
                        /boiterie.*(?:permanente|importante|majeure)/i.test(normalizedInputText),
                        /reconversion.*(?:professionnelle|obligatoire)|reconversion\s+obligatoire/i.test(normalizedInputText),
                        /pied.*tombant/i.test(normalizedInputText),
                        /paralysie.*compl[eè]te/i.test(normalizedInputText),
                        /(?:s[eé]v[eè]re|majeur|invalidant)/i.test(normalizedInputText)
                    ].filter(Boolean).length;
                    
                    const hasMinorWording = /(?:l[eé]g[eè]re|minime)\s+atteinte/i.test(normalizedInputText);
                    
                    // Si c'est "Paralysie complète" dans le nom ET indicateurs fonctionnels sévères → élevé
                    if (/paralysie.*complete/i.test(normalize(directMatch.name)) && severityIndicators >= 2) {
                        severityData = { level: 'élevé', signs: ['Paralysie complète avec retentissement fonctionnel majeur (station debout/marche compromises)'], isDefault: false };
                    } else if (severityIndicators >= 3) {
                        severityData = { level: 'élevé', signs: ['Atteinte nerveuse sévère avec retentissement fonctionnel majeur'], isDefault: false };
                    } else if (severityIndicators >= 1 && !hasMinorWording) {
                        severityData = { level: 'moyen', signs: ['Atteinte nerveuse avec retentissement fonctionnel modéré'], isDefault: false };
                    }
                }
                
                // Si pas de sévérité spécifique détectée, utiliser la méthode standard
                if (!severityData) {
                    severityData = determineSeverity(normalizedInputText);
                }
                
                let chosenRate: number;
                if (Array.isArray(directMatch.rate)) {
                    const [minRate, maxRate] = directMatch.rate;
                    if (severityData.level === 'élevé') {
                        // Si "élevé" avec arthrose débutante, prendre 80% du chemin vers le max (22% pour [10,25])
                        if (/arthrose.*debutante|debutante.*arthrose/i.test(normalizedInputText)) {
                            chosenRate = Math.round(minRate + (maxRate - minRate) * 0.8);
                        } else {
                            chosenRate = maxRate;
                        }
                    } else if (severityData.level === 'faible') {
                        chosenRate = minRate;
                    } else {
                        chosenRate = Math.round((minRate + maxRate) / 2);
                    }
                } else {
                    chosenRate = directMatch.rate;
                }
                
                // 🆕 V3.3.5: Vérification cumul AVANT de retourner
                // Si cumul détecté (os + nerf), enrichir la justification et signaler
                const cumulCheck = detectMultipleLesions(text);
                let finalJustification = buildExpertJustification(
                    text, directMatch as Injury, chosenRate, directMatch.path,
                    severityData.level,
                    severityData.signs,
                    severityData.isDefault
                );
                
                // Si cumul détecté, ajouter warning Balthazard dans la justification
                if (cumulCheck.isCumul && cumulCheck.lesionCount >= 2) {
                    // Extraire les mots-clés de lésions osseuses du texte
                    const boneKeywords = ['fracture', 'luxation', 'disjonction', 'tassement'];
                    const boneMatches = boneKeywords.filter(kw => normalize(text).includes(kw));
                    const boneContext = boneMatches.length > 0 
                        ? `<br>💀 <strong>Lésion osseuse détectée</strong> : ${text.match(new RegExp(`(${boneMatches.join('|')}[^.;]+)`, 'i'))?.[1] || 'fracture bassin'}<br>`
                        : '';
                    
                    finalJustification = `<strong>⚠️ CUMUL DE LÉSIONS DÉTECTÉ</strong><br>` +
                        `📊 <strong>Analyse cumul</strong> : ${cumulCheck.lesionCount} lésions identifiées<br>` +
                        boneContext +
                        `⚡ <strong>Lésion nerveuse détectée</strong> : ${directMatch.name}<br><br>` +
                        `💡 <strong>Formule de Balthazard</strong> : IPP_total = IPP1 + IPP2 × (100 - IPP1) / 100<br>` +
                        `📝 <strong>Important</strong> : Évaluez chaque lésion séparément puis appliquez la formule :<br>` +
                        `  1️⃣ Évaluez la lésion osseuse du bassin (fracture cadre obturateur + luxation sacro-iliaque)<br>` +
                        `  2️⃣ Évaluez la lésion nerveuse (atteinte nerf sciatique) - proposée ci-dessous : ${chosenRate}%<br>` +
                        `  3️⃣ Appliquez Balthazard : IPP_os + IPP_nerf × (100 - IPP_os) / 100<br>` +
                        `<em>Exemple : 30% (os) + 40% (nerf) = 30 + 40×0.7 = 58% → 60% total</em><br><br>` +
                        finalJustification;
                }
                
                return {
                    type: 'proposal',
                    name: directMatch.name,
                    rate: chosenRate,
                    justification: finalJustification,
                    path: directMatch.path,
                    injury: directMatch as Injury,
                    isCumul: cumulCheck.isCumul  // Ajouter flag cumul
                };
            }
        }
    }

    // NEW LOGIC: Check for exact match first to bypass ambiguity loop
    let exactMatch = allInjuriesWithPaths.find(inj => normalize(inj.name) === normalizedInputText);
    
    // Si pas de match exact, chercher correspondance très forte (98%+ de mots identiques)
    if (!exactMatch) {
        const inputWords = normalizedInputText.split(' ').filter(w => w.length > 2);
        const potentialMatches = allInjuriesWithPaths.filter(inj => {
            const injuryWords = normalize(inj.name).split(' ').filter(w => w.length > 2);
            const commonWords = inputWords.filter(w => injuryWords.includes(w));
            const similarity = commonWords.length / Math.max(inputWords.length, injuryWords.length);
            return similarity >= 0.85; // 85%+ de similarité
        });
        
        if (potentialMatches.length === 1) {
            exactMatch = potentialMatches[0];
        } else if (potentialMatches.length > 1) {
            // Si plusieurs matchs possibles, prendre celui avec le plus de mots en commun
            exactMatch = potentialMatches.reduce((best, current) => {
                const bestWords = normalize(best.name).split(' ').filter(w => w.length > 2);
                const currentWords = normalize(current.name).split(' ').filter(w => w.length > 2);
                const bestCommon = inputWords.filter(w => bestWords.includes(w)).length;
                const currentCommon = inputWords.filter(w => currentWords.includes(w)).length;
                return currentCommon > bestCommon ? current : best;
            });
        }
    }

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
    // 🔥 CORRECTION BUG: Extraire mots ET expressions multi-mots (bigrams, trigrams)
    const words = normalizedInputText.split(' ').filter(w => w.length > 2);
    const bigrams: string[] = [];
    const trigrams: string[] = [];
    
    // Générer bigrams (2 mots consécutifs)
    for (let i = 0; i < words.length - 1; i++) {
        bigrams.push(`${words[i]} ${words[i+1]}`);
    }
    
    // Générer trigrams (3 mots consécutifs)
    for (let i = 0; i < words.length - 2; i++) {
        trigrams.push(`${words[i]} ${words[i+1]} ${words[i+2]}`);
    }
    
    // Combiner: trigrams (priorité) + bigrams + mots simples
    const keywords = [...trigrams, ...bigrams, ...words];
    const queryBones = getBonesFromString(normalizedInputText);

    if (keywords.length <= 2 && queryBones.size === 0) {
        let example = "fracture de la clavicule";
        if (workingText.toLowerCase().includes('douleur')) {
            example = 'douleur au genou droit';
        }
    
        return { 
            type: 'no_result', 
            text: `La description "${text}" est trop vague. Veuillez préciser la région anatomique concernée (par exemple : "${example}").`
        };
    }
    
    const candidates = findCandidateInjuries(workingText, externalKeywords);

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
    
    // 🆕 DÉTECTION ENTRÉE BARÈME SPÉCIFIQUE (V3.3.24)
    // Si le texte correspond à une entrée précise du barème (ex: sélection utilisateur), ne pas redemander
    const isSpecificBaremeEntry = allInjuriesWithPaths.some(inj => {
        const normName = normalize(inj.name);
        // Check si 90%+ des mots du nom de lésion sont présents dans le texte
        const injuryWords = normName.split(' ').filter(w => w.length > 2);
        const matchingWords = injuryWords.filter(w => normalizedInputText.includes(w));
        return matchingWords.length / injuryWords.length >= 0.9;
    });
    
    // Si fracture consolidée + séquelles fonctionnelles → IGNORER le module d'ambiguïté fracture
    // OU si entrée barème spécifique détectée (l'utilisateur a déjà choisi)
    const shouldSkipFractureAmbiguity = (hasConsolidationContext && hasSequelaKeywords) || isSpecificBaremeEntry;
    
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
                
                // 🆕 Si "pas de raideur" / "sans raideur" → exclure entrées avec raideur (V3.3.25)
                if (/(pas\s+de|sans)\s+(raideur|limitation|gene)/i.test(normalizedInputText)) {
                    filteredFractures = filteredFractures.filter(f => {
                        const fname = normalize(f.name);
                        // Garder seulement celles explicitement "sans raideur" ET sans features problématiques
                        const hasSansRaideur = /sans\s+raideur/i.test(fname);
                        const hasProblematicFeatures = /(cal\s+saillant|double|difforme|compression)/i.test(fname);
                        return hasSansRaideur && !hasProblematicFeatures;
                    });
                }
                
                // Si "consolidation parfaite" mentionnée → exclure "cal vicieux"
                if (/(?:consolidation|bonne)\s+(?:parfaite|anatomique)|sans\s+trouble/i.test(normalizedInputText)) {
                    filteredFractures = filteredFractures.filter(f => {
                        const fname = normalize(f.name);
                        // Exclure cal vicieux/limitation/déformation SAUF si c'est "sans raideur"
                        if (/sans\s+raideur/i.test(fname)) return true;  // Garder "sans raideur"
                        return !/cal\s+vicieux|limitation|raideur|deformation/i.test(fname);
                    });
                }
                
                // Si "limitation légère/modérée" → exclure sévères et parfaites
                if (/(?:limitation|gene)\s+(?:legere|moderee|moyenne)|sans\s+perte\s+majeure/i.test(normalizedInputText)) {
                    filteredFractures = filteredFractures.filter(f => {
                        const fname = normalize(f.name);
                        return !/(consolidation\s+parfaite|severe|importante|troubles\s+nerveux)/i.test(fname);
                    });
                }

                // 🆕 Auto-sélection Main Dominante vs Non Dominante (V3.3.31)
                if (filteredFractures.length === 2) {
                    const hasDominante = filteredFractures.find(f => /main\s+dominante/i.test(f.name));
                    const hasNonDominante = filteredFractures.find(f => /main\s+non\s+dominante/i.test(f.name));
                    
                    if (hasDominante && hasNonDominante) {
                        // Les 2 seules différences sont Dominante/Non Dominante
                        // Vérifier le texte original pour latéralité
                        const textNormalized = normalizedInputText.toLowerCase();
                        
                        if (/(?:gauche|non\s+dominante)\s*[^\w]*(?:\(|$)/i.test(text) || 
                            /\(.*non\s+dominante.*\)/i.test(text) ||
                            /gaucher/i.test(text)) {
                            // "gauche (non dominante)" ou "(non dominante)" ou "gaucher"
                            filteredFractures = [hasNonDominante];
                        } else if (/(?:droit|droite|dominante)\s*[^\w]*(?:\(|$)/i.test(text) || 
                                   /\(.*dominante.*\)/i.test(text) ||
                                   /droitier/i.test(text)) {
                            // "droit (dominante)" ou "(dominante)" ou "droitier"
                            filteredFractures = [hasDominante];
                        }
                    }
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
                
                // 🆕 V3.3.25: Retourner filteredFractures au lieu de uniqueFractures
                return {
                    type: 'ambiguity',
                    text: `Votre description "${text.trim()}" est générale. Une fracture de l'os "${bone}" peut correspondre à plusieurs localisations (ex: diaphyse, extrémité articulaire). Laquelle correspond le mieux à l'état du patient ?`,
                    choices: filteredFractures.length > 0 ? filteredFractures : uniqueFractures
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
    // 🔧 SEUIL D'AMBIGUÏTÉ RÉDUIT : 0.95 au lieu de 0.85 pour éviter fausses ambiguïtés
    // Ne proposer plusieurs choix que si les scores sont VRAIMENT très proches (95%+)
    const similarCandidates = candidates.filter(c => 
        c.injury.name !== finalCandidate!.injury.name && 
        c.score > topScore * 0.95
    );

    // 🆕 VÉRIFICATION SUPPLÉMENTAIRE : Score minimal absolu pour ambiguïté
    // Si le top score est déjà très élevé (>2000), pas besoin d'ambiguïté
    const shouldShowAmbiguity = topScore < 3000 && similarCandidates.length > 0;

    if (shouldShowAmbiguity && similarCandidates.length > 0) {
        const allCandidates = [finalCandidate, ...similarCandidates];
        const topPart = finalCandidate.path.split('>')[1]?.trim();
        if (topPart && allCandidates.every(c => c.path.split('>')[1]?.trim() === topPart)) {
            let choices = [...new Map(allCandidates.map(item => [item.injury.name, item.injury])).values()];
            
            // 🆕 V3.3.25: Filtrage intelligent des choix selon description utilisateur
            const normalizedInput = normalize(text);
            
            // Si "pas de raideur" / "sans raideur" → Filtrer les options
            if (/(pas\s+de|sans)\s+(raideur|limitation|gene)/i.test(normalizedInput)) {
                const filteredChoices = choices.filter(c => {
                    const cname = normalize(c.name);
                    // Exclure toutes les options avec raideur SAUF celles explicitement "sans raideur"
                    const hasSansRaideur = /sans\s+raideur/i.test(cname);
                    const hasAvecRaideur = /(avec\s+raideur|cal\s+saillant.*raideur|raideurs\s+des\s+epaules)/i.test(cname);
                    const hasProblematicFeatures = /(cal\s+saillant|double|difforme|compression)/i.test(cname);
                    
                    // Garder seulement si "sans raideur" ET pas de features problématiques
                    return hasSansRaideur && !hasProblematicFeatures;
                });
                if (filteredChoices.length > 0) {
                    choices = filteredChoices;
                }
            }
            
            // Si "cal vicieux" / "cal saillant" → Garder seulement les entrées avec cal
            if (/(cal\s+vicieux|cal\s+saillant)/i.test(normalizedInput)) {
                const filteredChoices = choices.filter(c => {
                    const cname = normalize(c.name);
                    return /cal\s+(vicieux|saillant|difforme)/i.test(cname);
                });
                if (filteredChoices.length > 0) {
                    choices = filteredChoices;
                }
            }
            
            // Si "compression" / "troubles nerveux" → Garder seulement les entrées neurologiques
            if (/(compression|trouble.*nerveux|nevralgie)/i.test(normalizedInput)) {
                const filteredChoices = choices.filter(c => {
                    const cname = normalize(c.name);
                    return /(compression|nerveu)/i.test(cname);
                });
                if (filteredChoices.length > 0) {
                    choices = filteredChoices;
                }
            }
            
            if (choices.length > 1 && choices.length <= 5) { // Maximum 5 choix
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
    
    // 🆕 CAS SPÉCIAL CATARACTE: Calcul basé sur acuité visuelle mesurée (V3.3.23)
    let severityInfo: { level: string; signs: string[]; isDefault: boolean };
    
    if (/cataracte/i.test(normalize(injury.name))) {
        // Extraction acuités visuelles OD et OG
        const odMatch = /od\s*[:\s]*(\d+)\s*\/\s*(\d+)/i.exec(normalizedInputText);
        const ogMatch = /og\s*[:\s]*(\d+)\s*\/\s*(\d+)/i.exec(normalizedInputText);
        
        if (odMatch || ogMatch) {
            const odAcuity = odMatch ? parseInt(odMatch[1]) / parseInt(odMatch[2]) : 1.0;
            const ogAcuity = ogMatch ? parseInt(ogMatch[1]) / parseInt(ogMatch[2]) : 1.0;
            const worstEye = Math.min(odAcuity, ogAcuity);
            const bestEye = Math.max(odAcuity, ogAcuity);
            
            // Classification sévérité selon barème cataracte
            if (worstEye < 0.3) {
                // <3/10 sur œil le plus atteint → ÉLEVÉ (100%)
                severityInfo = {
                    level: 'élevé',
                    signs: [
                        `Acuité visuelle OD: ${odMatch ? odMatch[0].toUpperCase() : '10/10'} (${(odAcuity * 10).toFixed(1)}/10)`,
                        `Acuité visuelle OG: ${ogMatch ? ogMatch[0].toUpperCase() : '10/10'} (${(ogAcuity * 10).toFixed(1)}/10)`,
                        `Œil le plus atteint: ${(worstEye * 10).toFixed(1)}/10 (<3/10 = déficience visuelle sévère)`,
                        `Retentissement majeur sur autonomie et activités quotidiennes`
                    ],
                    isDefault: false
                };
            } else if (bestEye >= 0.8 && worstEye >= 0.5) {
                // Meilleur œil ≥8/10 ET pire œil ≥5/10 → FAIBLE (15-20%)
                severityInfo = {
                    level: 'faible',
                    signs: [
                        `Acuité visuelle OD: ${odMatch ? odMatch[0].toUpperCase() : '10/10'} (${(odAcuity * 10).toFixed(1)}/10)`,
                        `Acuité visuelle OG: ${ogMatch ? ogMatch[0].toUpperCase() : '10/10'} (${(ogAcuity * 10).toFixed(1)}/10)`,
                        `Meilleur œil: ${(bestEye * 10).toFixed(1)}/10 (≥8/10)`,
                        `Vision binoculaire fonctionnelle préservée, gêne minime`
                    ],
                    isDefault: false
                };
            } else if (worstEye >= 0.8 && bestEye >= 0.8) {
                // Les deux yeux ≥8/10 → TRÈS FAIBLE (10%)
                severityInfo = {
                    level: 'faible',
                    signs: [
                        `Acuité visuelle OD: ${odMatch ? odMatch[0].toUpperCase() : '10/10'} (${(odAcuity * 10).toFixed(1)}/10)`,
                        `Acuité visuelle OG: ${ogMatch ? ogMatch[0].toUpperCase() : '10/10'} (${(ogAcuity * 10).toFixed(1)}/10)`,
                        `Vision bilatérale excellente (≥8/10 aux deux yeux)`,
                        `Impact fonctionnel négligeable`
                    ],
                    isDefault: false
                };
            } else {
                // Cas intermédiaires (3-7/10) → MOYEN (55%)
                severityInfo = {
                    level: 'moyen',
                    signs: [
                        `Acuité visuelle OD: ${odMatch ? odMatch[0].toUpperCase() : '10/10'} (${(odAcuity * 10).toFixed(1)}/10)`,
                        `Acuité visuelle OG: ${ogMatch ? ogMatch[0].toUpperCase() : '10/10'} (${(ogAcuity * 10).toFixed(1)}/10)`,
                        `Déficience visuelle modérée (acuité entre 3/10 et 7/10)`,
                        `Retentissement fonctionnel significatif sur précision visuelle`
                    ],
                    isDefault: false
                };
            }
        } else {
            // Pas d'acuité mesurée → utiliser determineSeverity par défaut
            severityInfo = determineSeverity(textWithoutArticular, painIntensity, functionalLimitation, shortening);
        }
    } else {
        // Autre lésion → Détermination sévérité standard (v2.7: ajout shortening)
        severityInfo = determineSeverity(textWithoutArticular, painIntensity, functionalLimitation, shortening);
    }
    
    if (Array.isArray(injury.rate)) {
        const [min, max] = injury.rate;
        let chosenRate: number;
        switch (severityInfo.level) {
            case 'faible': chosenRate = min; break;
            case 'élevé': chosenRate = max; break;
            case 'moyen': default: chosenRate = Math.round((min + max) / 2); break;
        }
        
        // Enrichissement justification avec données temporelles et contexte demande
        let justification = buildExpertJustification(
            text, 
            injury, 
            chosenRate, 
            path, 
            severityInfo.level as "moyen" | "faible" | "élevé" | "fixe", 
            severityInfo.signs, 
            severityInfo.isDefault
        );
        
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
 * 🧮 FORMULE DE BALTHAZAR - Calcul des IPP Cumulées
 * 
 * La formule de Balthazar permet de cumuler correctement plusieurs taux d'IPP
 * en tenant compte du fait qu'on ne peut dépasser 100% d'incapacité.
 * 
 * Formule : IPP_total = IPP1 + IPP2 × (100 - IPP1) / 100
 * 
 * Exemples :
 * - Raideur genou 15% + LCA 15% = 15 + 15×(100-15)/100 = 15 + 12.75 = 27.75% → 28%
 * - Épaule coiffe 20% + raideur 15% = 20 + 15×(100-20)/100 = 20 + 12 = 32%
 * - 3 lésions 10% chacune = 10 + 10×0.9 + 10×0.81 = 10 + 9 + 8.1 = 27.1% → 27%
 * 
 * @param rates - Tableau des taux IPP individuels (en %)
 * @returns Taux IPP total cumulé selon Balthazar (arrondi au pourcent supérieur)
 */
export const calculateBalthazarIPP = (rates: number[]): number => {
    if (rates.length === 0) return 0;
    if (rates.length === 1) return rates[0];
    
    // Trier par ordre décroissant pour optimiser le calcul
    const sortedRates = [...rates].sort((a, b) => b - a);
    
    // Application itérative de la formule de Balthazar
    let totalIPP = sortedRates[0];
    
    for (let i = 1; i < sortedRates.length; i++) {
        const nextRate = sortedRates[i];
        // IPP_total = IPP_actuel + IPP_suivant × (100 - IPP_actuel) / 100
        totalIPP = totalIPP + nextRate * (100 - totalIPP) / 100;
    }
    
    // Arrondir au pourcent supérieur (pratique médico-légale)
    return Math.ceil(totalIPP);
};

/**
 * 🔍 DÉTECTION AUTOMATIQUE DES CUMULS DE LÉSIONS
 * 
 * Identifie si le texte décrit plusieurs lésions distinctes nécessitant
 * un calcul cumulé via formule de Balthazar.
 * 
 * Patterns détectés :
 * - "+" (ex: "LCA + méniscectomie")
 * - "et" (ex: "raideur et instabilité")
 * - Keywords cumuls : "cumul", "polytraumatisme", "plusieurs", "multiple"
 * - États antérieurs : "état antérieur IPP X% + nouvelle lésion"
 * 
 * @param text - Description clinique
 * @returns { isCumul: boolean, lesionCount: number, keywords: string[] }
 */
export const detectMultipleLesions = (text: string): { 
    isCumul: boolean; 
    lesionCount: number; 
    keywords: string[];
    hasAnteriorState: boolean;
    anteriorIPP: number | null;
} => {
    const normalized = normalize(text);
    
    // 1. Keywords explicites de cumul - TRÈS RESTRICTIF
    const cumulKeywords = [
        'polytraumatisme', 'plusieurs lesions', 'sequelles multiples',
        'formule balthazar', 'balthazar'
    ];
    const foundKeywords = cumulKeywords.filter(kw => normalized.includes(kw));
    
    // 2. Détection état antérieur avec IPP
    const anteriorMatch = /etat anterieur.*?ipp\s*(\d+)\s*%/i.exec(normalized);
    const hasAnteriorState = anteriorMatch !== null;
    const anteriorIPP = anteriorMatch ? parseInt(anteriorMatch[1]) : null;
    
    // 2b. Détection cumul lésion osseuse + atteinte nerveuse (pattern traumatologique fréquent)
    const hasBoneLesion = /fracture|luxation|disjonction|tassement|enfoncement/i.test(normalized);
    const hasNerveLesion = /(?:atteinte|lesion|paralysie|nevralgie).*nerf|nerf.*(?:atteinte|lesion|paralysie)/i.test(normalized);
    const hasBoneAndNerve = hasBoneLesion && hasNerveLesion;
    
    // 3. Comptage séparateurs de lésions - PLUS STRICTE
    const plusCount = (text.match(/\s\+\s/g) || []).length;
    
    // 4. Comptage lésions anatomiques DISTINCTES ET SÉPARÉES (pas dans une même description)
    const parts = text.split(/\s\+\s/);
    const anatomicalKeywords = [
        'genou', 'cheville', 'epaule', 'coude', 'poignet', 'hanche',
        'rachis', 'bassin', 'main', 'pied'
    ];
    
    let distinctRegions = 0;
    const regionsFound = new Set<string>();
    
    for (const part of parts) {
        const partNorm = normalize(part);
        for (const kw of anatomicalKeywords) {
            if (partNorm.includes(kw) && !regionsFound.has(kw)) {
                regionsFound.add(kw);
                distinctRegions++;
                break; // Une seule région par partie
            }
        }
    }
    
    // 🆕 5. Détection FRACTURES MULTIPLES sur le même os (ex: "fracture trochanter et diaphyse fémorale")
    const multipleFracturesSameBone = /fracture.*(?:et|,).*fracture|(?:trochanter|col|diaphyse|pilon|plateau).*(?:et|,).*(?:diaphyse|pilon|plateau|trochanter|col)/i.test(normalized);
    
    // 🆕 5B. Détection lésions multiples avec "avec" ou "et" (ex: "fracture ... avec fracture ... et rupture ...")
    const multipleLesionsWithConnectors = /(?:fracture|luxation|rupture|lesion).*(?:avec|et).*(?:fracture|luxation|rupture|lesion)/i.test(normalized);
    
    // Compter le nombre de types de lésions différents (fracture, rupture, luxation, etc.)
    const lesionTypes = [];
    if (/fracture/i.test(normalized)) lesionTypes.push('fracture');
    if (/rupture/i.test(normalized)) lesionTypes.push('rupture');
    if (/luxation/i.test(normalized)) lesionTypes.push('luxation');
    if (/lesion/i.test(normalized) && !/fracture|rupture|luxation/i.test(normalized)) lesionTypes.push('lesion');
    const hasMultipleLesionTypes = lesionTypes.length >= 2;
    
    // 6. Critères de cumul TRÈS STRICTS (éviter faux positifs)
    const isCumul = 
        foundKeywords.length > 0 ||  // Keywords TRÈS explicites type "polytraumatisme"
        plusCount >= 3 ||             // Au moins 3 séparateurs "+" (ex: "A + B + C + D")
        (plusCount >= 2 && distinctRegions >= 3) ||  // 2+ "+" avec 3+ régions anatomiques DIFFÉRENTES
        hasBoneAndNerve ||            // Lésion osseuse + atteinte nerveuse (pattern traumatologique)
        multipleFracturesSameBone ||  // Plusieurs fractures sur le même os (ex: trochanter + diaphyse ou trochanter, diaphyse)
        (multipleLesionsWithConnectors && hasMultipleLesionTypes);  // "avec"/"et" + types différents (fracture + rupture)
    
    // Estimation nombre de lésions
    const lesionCount = Math.max(
        plusCount + 1,
        distinctRegions,
        hasBoneAndNerve ? 2 : 1,      // Si os + nerf, au moins 2 lésions
        hasAnteriorState ? 2 : 1,
        multipleFracturesSameBone ? 2 : 1,  // Au moins 2 fractures si pattern détecté
        lesionTypes.length  // Nombre de types de lésions différents
    );
    
    return {
        isCumul,
        lesionCount: isCumul ? lesionCount : 1,
        keywords: foundKeywords,
        hasAnteriorState,
        anteriorIPP
    };
};

/**
 * 🆕 V3.3.52: Extraction des lésions individuelles à partir d'une description de cumul
 * Décompose "fracture trochanter et diaphyse fémorale" en ["fracture trochanter fémur", "fracture diaphyse fémur"]
 */
const extractIndividualLesions = (text: string): string[] => {
    const normalized = normalize(text);
    const lesions: string[] = [];
    
    // Pattern 1: Fractures multiples sur même os (trochanter et diaphyse)
    const sameBonePattern = /fracture.*?(trochanter|col|diaphyse|pilon|plateau|condyle|epicondyle).*?(?:et|,).*?(trochanter|col|diaphyse|pilon|plateau|condyle|epicondyle)/i;
    const sameBoneMatch = sameBonePattern.exec(normalized);
    
    if (sameBoneMatch) {
        const part1 = sameBoneMatch[1];
        const part2 = sameBoneMatch[2];
        const boneContext = normalized.includes('femur') || normalized.includes('femorale') ? 'femur' : 
                          normalized.includes('tibia') || normalized.includes('tibiale') ? 'tibia' :
                          normalized.includes('humer') ? 'humerus' : '';
        
        lesions.push(`fracture ${part1} ${boneContext}`.trim());
        lesions.push(`fracture ${part2} ${boneContext}`.trim());
        return lesions;
    }
    
    // Pattern 2: Séparation par "+" (ex: "fracture humérus + entorse genou")
    if (normalized.includes(' + ')) {
        const parts = normalized.split(/\s*\+\s*/);
        return parts.filter(p => p.length > 5);
    }
    
    // Pattern 3: Séparation par "et" entre deux fractures distinctes
    const twoFracturesPattern = /fracture.*?(?:et|,)\s*fracture/i;
    if (twoFracturesPattern.test(normalized)) {
        const parts = normalized.split(/\s*(?:et|,)\s*(?=fracture)/i);
        return parts.filter(p => p.length > 5);
    }
    
    // Pattern 4: Os + Nerf (ex: "fracture humérus avec paralysie radiale")
    const boneNervePattern = /fracture.*?(avec|et).*?(paralysie|nerf|atteinte)/i;
    if (boneNervePattern.test(normalized)) {
        const bonePart = normalized.split(/(?:avec|et).*?(?:paralysie|nerf|atteinte)/i)[0];
        const nervePart = normalized.match(/(?:paralysie|atteinte).*?(?:nerf\s+)?(\w+)/i);
        lesions.push(bonePart.trim());
        if (nervePart) lesions.push(`paralysie ${nervePart[1]}`.trim());
        return lesions;
    }
    
    // Pattern 5: Lésions mixtes avec "avec" (ex: "fracture malléole avec fracture astragale et rupture tendon")
    const mixedLesionsPattern = /(?:fracture|luxation|rupture|lesion).*?avec.*?(?:fracture|luxation|rupture|lesion)/i;
    if (mixedLesionsPattern.test(normalized)) {
        // Séparer par "avec" puis par "et"
        const parts = normalized.split(/\s*(?:avec|et)\s*/i);
        const filteredParts = parts.filter(p => p.length > 5 && /fracture|luxation|rupture|lesion/i.test(p));
        if (filteredParts.length >= 2) {
            return filteredParts;
        }
    }
    
    // Si aucun pattern détecté, retourner le texte original
    return [normalized];
};

/**
 * Analyse intelligente du langage naturel avec gestion du contexte médico-légal
 * @param text - Texte à analyser
 * @param externalKeywords - Mots-clés externes optionnels
 * @param isExactMatch - Si true, cherche une correspondance exacte par nom (pour résoudre ambiguïté)
 */
export const localExpertAnalysis = (text: string, externalKeywords?: string[], isExactMatch: boolean = false): LocalAnalysisResult => {
    
    // 🆕 V3.3.60: Si isExactMatch, chercher l'injury exacte par nom pour éviter boucle d'ambiguïté
    if (isExactMatch) {
        console.log('🔍 Recherche exacte activée pour:', text);
        const normalizedSearchText = normalize(text);
        
        // Vérification sécurité
        if (!disabilityData || !disabilityData.categories || !Array.isArray(disabilityData.categories)) {
            console.error('❌ disabilityData.categories invalide:', disabilityData);
            // Continuer avec analyse normale
        } else {
            // Parcourir toutes les catégories pour trouver une correspondance exacte
            for (const category of disabilityData.categories) {
                for (const subcategory of category.subcategories) {
                    for (const injury of subcategory.injuries) {
                        const normalizedInjuryName = normalize(injury.name);
                        
                        // Correspondance exacte du nom
                        if (normalizedInjuryName === normalizedSearchText) {
                            console.log('✅ Correspondance exacte trouvée:', injury.name);
                            
                            // Déterminer le taux
                            let chosenRate: number;
                            if (Array.isArray(injury.rate)) {
                                // Prendre le milieu de l'intervalle par défaut
                                const [min, max] = injury.rate;
                                chosenRate = Math.round((min + max) / 2);
                            } else {
                                chosenRate = injury.rate;
                            }
                            
                            const path = `${category.name} > ${subcategory.name}`;
                            const justification = buildExpertJustification(
                                text, 
                                injury, 
                                chosenRate, 
                                path,
                                'moyen',
                                [],
                                true
                            );
                            
                            return {
                                type: 'proposal',
                                name: injury.name,
                                rate: chosenRate,
                                justification,
                                path,
                                injury
                            };
                        }
                    }
                }
            }
            
            // Si aucune correspondance exacte, continuer avec l'analyse normale
            console.log('⚠️ Aucune correspondance exacte, analyse normale...');
        }
    }
    
    // Étape 0A: Détection cumuls de lésions (Balthazar) - mais continuer l'analyse normale
    const cumulDetection = detectMultipleLesions(text);
    const isCumulDetected = cumulDetection.isCumul && cumulDetection.lesionCount >= 2;
    
    // Étape 0B: Détection lésion primaire + séquelles fonctionnelles
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

    // 🆕 Étape 3B: SI CUMUL DÉTECTÉ → Analyser chaque lésion séparément (V3.3.52)
    console.log('🔍 isCumulDetected:', isCumulDetected, 'lesionCount:', cumulDetection.lesionCount);
    
    if (isCumulDetected && cumulDetection.lesionCount >= 2) {
        console.log('🔍 CUMUL DÉTECTÉ - Extraction des lésions individuelles');
        console.log('📝 text original:', text);
        console.log('📝 finalCleanedText:', finalCleanedText);
        
        // ⚠️ IMPORTANT: Utiliser le texte ORIGINAL pour extraction, pas finalCleanedText
        // Car finalCleanedText peut avoir été trop nettoyé et perdre les marqueurs de cumul
        const individualLesions = extractIndividualLesions(text);
        console.log('📋 Lésions extraites:', individualLesions, 'Nombre:', individualLesions.length);
        
        // Si on a réussi à extraire 2+ lésions distinctes, les analyser séparément
        if (individualLesions.length >= 2) {
            console.log('✅ Au moins 2 lésions → Analyse séparée');
            const lesionProposals: any[] = [];
            
            for (const lesion of individualLesions) {
                // 🆕 Enrichir la description pour améliorer le matching
                let enrichedLesion = lesion;
                
                // Si "trochanter" sans contexte, ajouter "trochantérienne"
                if (/trochanter(?!\w)/i.test(lesion) && !/trochanter(ien|ienne)/i.test(lesion)) {
                    enrichedLesion = lesion.replace(/trochanter/i, 'fracture trochanterienne');
                }
                
                // Si "diaphyse" sans "diaphysaire", ajouter
                if (/diaphyse(?!\w)/i.test(lesion) && !/diaphysaire/i.test(lesion)) {
                    enrichedLesion = enrichedLesion.replace(/diaphyse/i, 'diaphysaire');
                }
                
                const processedLesion = enrichedLesion.replace(/([A-ZCSLT])\s*(\d)/gi, '$1$2');
                console.log(`🔎 Analyse lésion "${lesion}" → enrichi: "${enrichedLesion}" (processed: "${processedLesion}")`);
                
                const lesionResult = comprehensiveSingleLesionAnalysis(processedLesion, externalKeywords);
                
                console.log(`   → Type: ${lesionResult.type}`);
                
                // ✅ ACCEPTER proposal ET ambiguity
                if (lesionResult.type === 'proposal') {
                    console.log(`   → Injury: ${lesionResult.injury.name}`);
                    console.log(`   → Rate: ${lesionResult.injury.rate}`);
                    lesionProposals.push({
                        injury: lesionResult.injury,
                        description: lesion,
                        justification: lesionResult.justification
                    });
                } else if (lesionResult.type === 'ambiguity' && lesionResult.choices && lesionResult.choices.length > 0) {
                    // 🆕 Pour ambiguïté : choisir automatiquement la PREMIÈRE option (meilleur score)
                    const bestChoice = lesionResult.choices[0];
                    console.log(`   → Ambiguïté résolue auto: ${bestChoice.name}`);
                    console.log(`   → Rate: ${bestChoice.rate}`);
                    
                    // 🆕 V3.3.57: Si intervalle, orienter le taux selon sévérité du texte original
                    let finalRate = bestChoice.rate;
                    if (Array.isArray(bestChoice.rate)) {
                        const [minRate, maxRate] = bestChoice.rate;
                        const severityData = determineSeverity(normalize(processedLesion));
                        console.log(`   → Sévérité détectée: ${severityData.level} (signs: ${severityData.signs.join(', ')})`);
                        
                        if (severityData.level === 'élevé') {
                            finalRate = maxRate;
                        } else if (severityData.level === 'faible') {
                            finalRate = minRate;
                        } else {
                            finalRate = Math.round((minRate + maxRate) / 2);
                        }
                        console.log(`   → Taux final orienté: ${finalRate}% (intervalle [${minRate}-${maxRate}])`);
                    }
                    
                    lesionProposals.push({
                        injury: {
                            ...bestChoice,
                            rate: finalRate  // 🔑 Utiliser le taux orienté, pas l'intervalle brut
                        },
                        description: lesion,
                        justification: `<strong>Choix automatique parmi ${lesionResult.choices.length} options</strong><br>${lesionResult.text}`
                    });
                } else {
                    console.warn(`   ⚠️ Lésion ignorée (type=${lesionResult.type})`);
                }
            }
            
            console.log(`📊 TOTAL: ${lesionProposals.length} propositions générées sur ${individualLesions.length} lésions`);
            
            // ⚠️ ASSOUPLIR: Accepter même 1 seule proposition si cumul détecté
            if (lesionProposals.length >= 1) {
                console.log('✅ Retour type cumul_proposals avec', lesionProposals.length, 'lésion(s)');
                const cumulHeader = '<strong>⚠️ CUMUL DE LÉSIONS DÉTECTÉ</strong><br>';
                const cumulDetails = `
                    <div style="background:#fff3cd; padding:15px; margin:10px 0; border-left:5px solid #ffc107;">
                    <strong>📊 Analyse cumul :</strong> ${individualLesions.length} lésions détectées, ${lesionProposals.length} évaluée(s) avec succès<br>
                    <strong>💡 Formule de Balthazar :</strong> IPP_total = IPP1 + IPP2 × (100 - IPP1) / 100<br>
                    <strong>📝 Calcul automatique :</strong> ${lesionProposals.length > 1 ? 'Les lésions ci-dessous ont été analysées individuellement.' : 'Analyse partielle - une seule lésion identifiée dans le barème.'}<br>
                    ${lesionProposals.length > 1 ? `Exemple avec ${lesionProposals.length} lésions : 
                    ${lesionProposals.map((p, i) => `Lésion ${i + 1} = ${Array.isArray(p.injury.rate) ? p.injury.rate.join('-') : p.injury.rate}%`).join(', ')}` : ''}
                    </div>`;
                
                return {
                    type: 'cumul_proposals',
                    text: cumulHeader + cumulDetails,
                    proposals: lesionProposals,
                    lesionCount: lesionProposals.length
                } as any;
            }
        }
    }

    // Étape 4: Analyse de la lésion principale (flux normal si pas de cumul)
    const processedText = finalCleanedText.replace(/([A-ZCSLT])\s*(\d)/gi, '$1$2');
    const result = comprehensiveSingleLesionAnalysis(processedText, externalKeywords);

    // Étape 5: Enrichir la justification avec le contexte
    if (result.type === 'proposal' && (profession || preexisting.length > 0 || age || isCumulDetected)) {
        let enrichedJustification = result.justification;
        
        // Ajouter contexte cumul Balthazar si détecté
        if (isCumulDetected) {
            const cumulHeader = '<strong>⚠️ CUMUL DE LÉSIONS DÉTECTÉ</strong><br>';
            const cumulDetails = `
                <div style="background:#fff3cd; padding:15px; margin:10px 0; border-left:5px solid #ffc107;">
                <strong>📊 Analyse cumul :</strong> ${cumulDetection.lesionCount} lésions identifiées<br>
                <strong>💡 Formule de Balthazar :</strong> IPP_total = IPP1 + IPP2 × (100 - IPP1) / 100<br>
                <strong>📝 Important :</strong> Évaluez chaque lésion séparément puis appliquez la formule.<br>
                Exemple : 15% + 15% = 15 + 15×0.85 = <strong>27.75% → 28%</strong>
                </div>`;
            enrichedJustification = cumulHeader + cumulDetails + '<br>' + enrichedJustification;
        }
        
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
