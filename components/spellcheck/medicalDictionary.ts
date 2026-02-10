/**
 * Dictionnaire médical français pour le correcteur d'orthographe
 * Construit à partir des données existantes : barème + synonymes médicaux
 */

import { medicalSynonyms, normalize } from '../AiAnalyzer';
import { disabilityData } from '../../data/disabilityRates';
import { disabilityData as disabilityDataNew } from '../../data/disabilityRates.new';
import { InjuryCategory } from '../../types';

// Stop-words français à ignorer
const FRENCH_STOP_WORDS = new Set([
    'le', 'la', 'les', 'de', 'du', 'des', 'un', 'une', 'et', 'ou', 'en',
    'dans', 'avec', 'pour', 'par', 'sur', 'est', 'sont', 'a', 'au', 'aux',
    'ce', 'cette', 'ces', 'son', 'sa', 'ses', 'mon', 'ma', 'mes', 'ton',
    'ta', 'tes', 'il', 'elle', 'ils', 'elles', 'nous', 'vous', 'on',
    'qui', 'que', 'dont', 'ou', 'ne', 'pas', 'plus', 'sans', 'se', 'si',
    'non', 'oui', 'mais', 'car', 'donc', 'ni', 'entre', 'vers', 'chez',
    'apres', 'avant', 'depuis', 'sous', 'pendant', 'selon', 'lors',
]);

export { FRENCH_STOP_WORDS };

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
        // Extraire les mots du nom de catégorie
        for (const word of extractWordsFromText(category.name)) {
            addToDictionary(word, word, singleWords, originalForms);
        }

        for (const sub of category.subcategories) {
            // Mots du nom de sous-catégorie
            for (const word of extractWordsFromText(sub.name)) {
                addToDictionary(word, word, singleWords, originalForms);
            }

            for (const injury of sub.injuries) {
                // Mots du nom de la lésion
                for (const word of extractWordsFromText(injury.name)) {
                    addToDictionary(word, word, singleWords, originalForms);
                }

                // Mots des searchTerms
                if (injury.searchTerms) {
                    for (const term of injury.searchTerms) {
                        for (const word of extractWordsFromText(term)) {
                            addToDictionary(word, word, singleWords, originalForms);
                        }
                    }
                }

                // Mots de la description
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
            // Ajouter la phrase entière ET les mots individuels
            for (const word of extractWordsFromText(phrase)) {
                addToDictionary(word, word, singleWords, originalForms);
            }
        }
    }

    // Source 2: disabilityData (barème principal)
    extractFromCategories(disabilityData, singleWords, originalForms);

    // Source 3: disabilityDataNew (barème étendu)
    extractFromCategories(disabilityDataNew, singleWords, originalForms);

    // Source 4: Termes médicaux courants supplémentaires (non couverts par le barème)
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
        'medecin', 'conseil', 'medico', 'legal', 'expertise',
        'accident', 'travail', 'professionnel', 'maladie', 'professionnelle',
        'aggravation', 'rechute', 'recidive', 'complication',
        'pronostic', 'diagnostic', 'etiologie', 'pathologie',
        'douleur', 'douleurs', 'algique', 'algie', 'nevralgie',
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
        'anterieur', 'posterieur', 'superieur', 'inferieur',
        'proximal', 'distal', 'medial', 'lateral',
        'thoracique', 'abdominale', 'cervicale', 'lombaire', 'sacree',
        'cephalee', 'vertige', 'acouphene', 'surdite',
    ];

    for (const term of additionalTerms) {
        addToDictionary(term, term, singleWords, originalForms);
    }

    cachedDictionary = { singleWords, originalForms };
    return cachedDictionary;
}
