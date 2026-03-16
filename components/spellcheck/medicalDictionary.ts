/**
 * Dictionnaire français complet pour le correcteur d'orthographe
 * Sources : barème + synonymes médicaux + vocabulaire courant + littéraire
 *         + conjugaisons + carte de fautes courantes
 * V2: Dictionnaire complet hors connexion (~15 000+ mots)
 */

import { medicalSynonyms, normalize } from '../AiAnalyzer';
import { disabilityData } from '../../data/disabilityRates';
import { disabilityData as disabilityDataNew } from '../../data/disabilityRates.new';
import { InjuryCategory } from '../../types';
import { FRENCH_COMMON_WORDS, FRENCH_MEDICAL_WORDS, FRENCH_LITERARY_WORDS, EXTENDED_TYPOS } from '../../data/frenchDictionary';
import { getAllConjugatedForms } from './conjugation';

// Stop-words français étendus (ne pas signaler comme fautes)
const FRENCH_STOP_WORDS = new Set([
    // Articles et déterminants
    'le', 'la', 'les', 'de', 'du', 'des', 'un', 'une', 'au', 'aux',
    // Pronoms
    'ce', 'cette', 'ces', 'son', 'sa', 'ses', 'mon', 'ma', 'mes', 'ton',
    'ta', 'tes', 'il', 'elle', 'ils', 'elles', 'nous', 'vous', 'on',
    'qui', 'que', 'dont', 'se', 'lui', 'leur', 'leurs', 'moi', 'toi',
    'soi', 'eux', 'cela', 'ceci', 'celui', 'celle', 'ceux', 'celles',
    // Conjonctions et prépositions
    'et', 'ou', 'en', 'dans', 'avec', 'pour', 'par', 'sur', 'est', 'sont',
    'ne', 'pas', 'plus', 'sans', 'si', 'non', 'oui', 'mais', 'car',
    'donc', 'ni', 'entre', 'vers', 'chez', 'apres', 'avant', 'depuis',
    'sous', 'pendant', 'selon', 'lors', 'comme', 'aussi', 'bien', 'tres',
    'tout', 'tous', 'toute', 'toutes', 'autre', 'autres', 'meme', 'peu',
    'trop', 'assez', 'moins', 'aucun', 'aucune', 'chaque', 'quel', 'quelle',
    // Verbes courants (conjugaisons fréquentes)
    'avoir', 'etre', 'fait', 'faire', 'dit', 'dire', 'peut', 'ete',
    'voir', 'aller', 'venir', 'prendre', 'mettre', 'donner', 'falloir',
    'devoir', 'savoir', 'vouloir', 'croire', 'trouver', 'passer', 'rester',
    'parler', 'porter', 'suivre', 'montrer', 'tomber', 'recevoir', 'tenir',
    'comprendre', 'connaitre', 'partir', 'vivre', 'perdre',
    'fut', 'faut', 'doit', 'peut', 'veut',
    // Mots courants non médicaux
    'ans', 'age', 'homme', 'femme', 'jour', 'jours', 'mois', 'annee',
    'temps', 'fois', 'cas', 'vie', 'lieu', 'place', 'fin', 'debut',
    'suite', 'cause', 'effet', 'etat', 'forme', 'maniere', 'facon',
    'part', 'cote', 'sens', 'type', 'genre', 'sorte', 'espece',
    'point', 'chose', 'rien', 'quelque', 'quelques', 'plusieurs',
    'encore', 'deja', 'jamais', 'toujours', 'souvent', 'parfois',
    'alors', 'donc', 'ensuite', 'enfin', 'puis', 'ainsi', 'surtout',
    'cependant', 'toutefois', 'neanmoins', 'pourtant',
    // Mots du contexte médico-légal courant
    'monsieur', 'madame', 'salarie', 'employe', 'ouvrier', 'travailleur',
    'victime', 'patient', 'malade', 'blesse', 'assure', 'beneficiaire',
    'exerce', 'fonction', 'poste', 'entreprise', 'chantier', 'atelier',
    'bureau', 'usine', 'societe', 'employeur',
    'accident', 'survenu', 'lors', 'pendant', 'travail',
    'descente', 'montee', 'chute', 'reception', 'appui', 'faux',
    'membre', 'gauche', 'droite', 'droit', 'superieur', 'inferieur',
    'examens', 'cliniques', 'radiologiques', 'revele', 'revelent',
    'mise', 'evidence', 'bilan', 'initial', 'resultats',
    'prise', 'charge', 'consiste', 'traitement',
    'evolution', 'favorable', 'marquee', 'marque',
    'douleurs', 'residuelles', 'limitation', 'mobilite',
    'articulaire', 'fonctionnelle', 'persistante', 'gene',
    'reduction', 'orthopedique', 'immobilisation', 'platree',
    'reeducatif', 'reeducation', 'instaurees', 'instaure',
    'duree', 'arret', 'prolonge', 'prolongee',
    'force', 'prehension', 'diminution', 'hauteur',
    'brutale', 'violente', 'importante', 'moderee', 'legere', 'severe',
    'associee', 'associe', 'partielle', 'partiel', 'totale', 'total',
    'deplacee', 'deplace', 'fermee', 'ferme', 'ouverte', 'ouvert',
    'specialise', 'specialisee', 'macon', 'manoeuvre', 'echafaudage',
]);

export { FRENCH_STOP_WORDS };

// Carte de fautes médicales courantes → correction automatique (sans Levenshtein)
export const COMMON_MEDICAL_TYPOS: Map<string, string> = new Map([
    // Fractures
    ['fracutre', 'fracture'], ['fracure', 'fracture'], ['fractrue', 'fracture'],
    ['fractue', 'fracture'], ['farcture', 'fracture'], ['fractures', 'fractures'],
    // Traumatisme
    ['traumatise', 'traumatisme'], ['traumatsime', 'traumatisme'], ['taraumatisme', 'traumatisme'],
    ['truamatisme', 'traumatisme'], ['trauamtisme', 'traumatisme'],
    // Ménisque / méniscectomie
    ['menisue', 'menisque'], ['menisqe', 'menisque'], ['menisce', 'menisque'],
    ['meniscetomie', 'meniscectomie'], ['menisectomie', 'meniscectomie'],
    // Spondylolisthésis
    ['spondylolystesis', 'spondylolisthesis'], ['spondylolysthesis', 'spondylolisthesis'],
    ['spondylolithesis', 'spondylolisthesis'], ['spondylolistesis', 'spondylolisthesis'],
    // Rachis
    ['rachiss', 'rachis'], ['racchis', 'rachis'], ['rachi', 'rachis'],
    // Entorse
    ['entrose', 'entorse'], ['entorce', 'entorse'], ['entosre', 'entorse'],
    // Ligament
    ['ligamnet', 'ligament'], ['ligamant', 'ligament'], ['ligement', 'ligament'],
    // Tendon
    ['tendont', 'tendon'], ['tendonn', 'tendon'], ['tenddon', 'tendon'],
    // Cervical
    ['cervcial', 'cervical'], ['cervicla', 'cervical'], ['cerviacl', 'cervical'],
    // Lombaire
    ['lombair', 'lombaire'], ['lomabire', 'lombaire'], ['lombarie', 'lombaire'],
    // Épaule
    ['epaul', 'epaule'], ['epaulr', 'epaule'], ['epauel', 'epaule'],
    // Genou
    ['genoux', 'genou'], ['genoo', 'genou'], ['genuo', 'genou'],
    // Cheville
    ['chevile', 'cheville'], ['chveille', 'cheville'], ['chevill', 'cheville'],
    // Radius
    ['raduis', 'radius'], ['raidus', 'radius'], ['raduus', 'radius'],
    // Humérus
    ['humerus', 'humerus'], ['humersu', 'humerus'], ['humeurs', 'humerus'],
    // Clavicule
    ['clavicul', 'clavicule'], ['clavciule', 'clavicule'], ['clavucile', 'clavicule'],
    // Rotule / patella
    ['rotul', 'rotule'], ['rotulle', 'rotule'], ['rotle', 'rotule'],
    // Scaphoïde
    ['scaphoide', 'scaphoide'], ['scapoide', 'scaphoide'], ['scaphoide', 'scaphoide'],
    // Arthrose
    ['artrhose', 'arthrose'], ['artrose', 'arthrose'], ['arthorse', 'arthrose'],
    // Consolidation
    ['consoliadtion', 'consolidation'], ['consolidaiton', 'consolidation'],
    ['consoldiation', 'consolidation'],
    // Séquelles
    ['sequeles', 'sequelles'], ['sequelle', 'sequelle'], ['sequeles', 'sequelles'],
    // Incapacité
    ['incapacite', 'incapacite'], ['incapcite', 'incapacite'], ['incapacte', 'incapacite'],
    // Luxation
    ['luxaiton', 'luxation'], ['luxaton', 'luxation'], ['lxuation', 'luxation'],
    // Contusion
    ['contusion', 'contusion'], ['contsuion', 'contusion'], ['contuison', 'contusion'],
    // Déchirure
    ['dechirrue', 'dechirure'], ['dechirue', 'dechirure'], ['dechirur', 'dechirure'],
    // Élongation
    ['elongaiton', 'elongation'], ['elongaton', 'elongation'], ['elognation', 'elongation'],
    // Paralysie
    ['paralysye', 'paralysie'], ['parlaysie', 'paralysie'], ['paralysie', 'paralysie'],
    // Prothèse
    ['prothese', 'prothese'], ['protheze', 'prothese'], ['protese', 'prothese'],
    // Ostéosynthèse
    ['osteosynthse', 'osteosynthese'], ['osteosyntese', 'osteosynthese'],
    // Capsulite
    ['capsulte', 'capsulite'], ['capsuliet', 'capsulite'],
    // Tendinite
    ['tendinite', 'tendinite'], ['tendinitte', 'tendinite'], ['tendinnite', 'tendinite'],
    // Névralgie
    ['nevralge', 'nevralgie'], ['nevrlagie', 'nevralgie'],
    // Amyotrophie
    ['amyotrophie', 'amyotrophie'], ['amyotropie', 'amyotrophie'],
    // Ankylose
    ['ankilose', 'ankylose'], ['anklyose', 'ankylose'], ['ankylsoe', 'ankylose'],
    // Raideur
    ['raiduer', 'raideur'], ['raider', 'raideur'], ['riadeur', 'raideur'],
]);

export interface MedicalDictionary {
    singleWords: Set<string>;
    originalForms: Map<string, string>;
}

let cachedDictionary: MedicalDictionary | null = null;

function extractWordsFromText(text: string): string[] {
    return text
        .toLowerCase()
        .replace(/[^a-zàâäéèêëïîôùûüœæç\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length >= 3 && !FRENCH_STOP_WORDS.has(w));
}

function addToDictionary(
    word: string,
    originalForm: string,
    singleWords: Set<string>,
    originalForms: Map<string, string>
) {
    const normalized = normalize(word);
    if (normalized.length >= 3) {
        singleWords.add(normalized);
        if (!originalForms.has(normalized)) {
            originalForms.set(normalized, originalForm);
        }
    }
}

function extractFromCategories(
    data: InjuryCategory[],
    singleWords: Set<string>,
    originalForms: Map<string, string>
) {
    for (const category of data) {
        for (const word of extractWordsFromText(category.name)) {
            addToDictionary(word, word, singleWords, originalForms);
        }
        for (const sub of category.subcategories) {
            for (const word of extractWordsFromText(sub.name)) {
                addToDictionary(word, word, singleWords, originalForms);
            }
            for (const injury of sub.injuries) {
                for (const word of extractWordsFromText(injury.name)) {
                    addToDictionary(word, word, singleWords, originalForms);
                }
                if (injury.searchTerms) {
                    for (const term of injury.searchTerms) {
                        for (const word of extractWordsFromText(term)) {
                            addToDictionary(word, word, singleWords, originalForms);
                        }
                    }
                }
                if (injury.description) {
                    for (const word of extractWordsFromText(injury.description)) {
                        addToDictionary(word, word, singleWords, originalForms);
                    }
                }
            }
        }
    }
}

export function getMedicalDictionary(): MedicalDictionary {
    if (cachedDictionary) return cachedDictionary;

    const singleWords = new Set<string>();
    const originalForms = new Map<string, string>();

    // Source 1: medicalSynonyms
    for (const values of Object.values(medicalSynonyms)) {
        for (const phrase of values) {
            for (const word of extractWordsFromText(phrase)) {
                addToDictionary(word, word, singleWords, originalForms);
            }
        }
    }

    // Source 2+3: barème
    extractFromCategories(disabilityData, singleWords, originalForms);
    extractFromCategories(disabilityDataNew, singleWords, originalForms);

    // Source 4: Termes médicaux courants supplémentaires
    const additionalTerms = [
        'consolidation', 'sequelle', 'sequelles', 'incapacite', 'invalidite',
        'permanente', 'partielle', 'totale', 'temporaire', 'definitif',
        'traumatisme', 'traumatismes', 'polytraumatisme', 'polytraumatismes',
        'lateralite', 'bilateral', 'unilateral', 'controlateral', 'ipsilateral',
        'antalgique', 'analgesique', 'antiinflammatoire', 'corticoide',
        'radiologique', 'radiographie', 'scanner', 'irm', 'echographie',
        'chirurgical', 'chirurgie', 'osteosynthese', 'arthroscopie',
        'reeducation', 'kinesitherapie', 'physiotherapie', 'readaptation',
        'hospitalisation', 'ambulatoire', 'consultation', 'expertise',
        'medecin', 'conseil', 'medico', 'legal',
        'aggravation', 'rechute', 'recidive', 'complication',
        'pronostic', 'diagnostic', 'etiologie', 'pathologie',
        'douleur', 'algique', 'algie', 'nevralgie',
        'deficit', 'deficitaire', 'moteur', 'sensitif', 'sensoriel',
        'cicatrice', 'cicatriciel', 'cicatrisation', 'adherence',
        'atrophie', 'hypertrophie', 'dystrophie', 'fibrose',
        'oedeme', 'inflammation', 'inflammatoire', 'infectieux',
        'arthrose', 'arthrite', 'periarthrite', 'capsulite',
        'tendinite', 'tendinopathie', 'tenosynovite', 'bursite',
        'contusion', 'contusions', 'ecchymose', 'hematome',
        'luxation', 'subluxation', 'entorse', 'distorsion',
        'dechirure', 'elongation', 'claquage', 'rupture',
        'paralysie', 'paresie', 'paresthesie', 'hypoesthesie',
        'spondylolisthesis', 'spondylarthrose', 'spondylodiscite',
        'meniscectomie', 'menisque', 'ligamentoplastie',
        'prothese', 'orthese', 'appareillage', 'immobilisation',
        'consolidee', 'guerie', 'stabilisee', 'chronique',
        'anterieur', 'posterieur', 'proximal', 'distal', 'medial', 'lateral',
        'thoracique', 'abdominale', 'cervicale', 'lombaire', 'sacree',
        'cephalee', 'vertige', 'acouphene', 'surdite',
        // Anatomie étendue
        'humerus', 'cubitus', 'ulna', 'femur', 'tibia', 'perone', 'fibula',
        'clavicule', 'omoplate', 'scapula', 'sternum', 'coccyx', 'sacrum',
        'calcaneum', 'astragale', 'talus', 'scaphoide', 'pisiforme',
        'trapeze', 'trapezoide', 'capitatum', 'hamatum', 'lunatum', 'triquetrum',
        'metacarpe', 'metatarse', 'phalange', 'phalanges', 'phalangette',
        'vertebre', 'vertebres', 'vertebral', 'discal', 'hernie', 'discale',
        'ligament', 'ligamentaire', 'tendon', 'tendineux', 'aponévrose',
        'cartilage', 'synoviale', 'synovial', 'menisque', 'labrum',
        'rotule', 'patella', 'olecrane', 'acromion', 'coracoide',
        'trochlée', 'condyle', 'epicondyle', 'epitrochlée', 'malleole',
        'diaphyse', 'epiphyse', 'metaphyse', 'periostite', 'osteoporose',
        // Procédures chirurgicales
        'suture', 'greffe', 'transplant', 'fixation', 'enclouage',
        'vissage', 'embrochage', 'ostectomie', 'osteotomie', 'artrodese',
        'arthrodese', 'laminectomie', 'discectomie', 'nucleotomie',
        'neuroplastie', 'tenorraphie', 'capsuloplastie', 'synovectomie',
        // Imagerie et examens
        'tomodensitometrie', 'scintigraphie', 'electromyogramme',
        'electromyographie', 'potentiels', 'evoques', 'velocite',
        'doppler', 'arthrographie', 'myelographie', 'discographie',
        // Termes fonctionnels courants
        'abduction', 'adduction', 'flexion', 'extension', 'rotation',
        'pronation', 'supination', 'eversion', 'inversion',
        'dorsiflexion', 'plantarflexion', 'circumduction',
        'apprehension', 'amyotrophie', 'spasticite', 'flaccidite',
        'ankylose', 'raideur', 'pseudarthrose', 'cal', 'vicieux',
        'deformation', 'subluxation', 'instabilite', 'laxite',
    ];

    for (const term of additionalTerms) {
        addToDictionary(term, term, singleWords, originalForms);
    }

    // Source 5: Corrections des fautes courantes → ajouter les formes correctes
    for (const correctForm of COMMON_MEDICAL_TYPOS.values()) {
        addToDictionary(correctForm, correctForm, singleWords, originalForms);
    }

    // Source 6: Vocabulaire français courant (~2500 mots)
    for (const word of FRENCH_COMMON_WORDS) {
        addToDictionary(word, word, singleWords, originalForms);
    }

    // Source 7: Vocabulaire médical étendu (~1000+ termes)
    for (const word of FRENCH_MEDICAL_WORDS) {
        addToDictionary(word, word, singleWords, originalForms);
    }

    // Source 8: Vocabulaire littéraire et soutenu (~500 mots)
    for (const word of FRENCH_LITERARY_WORDS) {
        addToDictionary(word, word, singleWords, originalForms);
    }

    // Source 9: Formes conjuguées (~8000 formes de 200 verbes)
    const conjugatedForms = getAllConjugatedForms();
    for (const form of conjugatedForms) {
        if (form.length >= 3) {
            singleWords.add(form);
            if (!originalForms.has(form)) {
                originalForms.set(form, form);
            }
        }
    }

    // Source 10: Fautes étendues → ajouter les formes correctes
    for (const correctForm of EXTENDED_TYPOS.values()) {
        const normalized = normalize(correctForm);
        if (normalized.length >= 3) {
            singleWords.add(normalized);
            if (!originalForms.has(normalized)) {
                originalForms.set(normalized, correctForm);
            }
        }
    }

    cachedDictionary = { singleWords, originalForms };
    return cachedDictionary;
}
