/**
 * Moteur de conjugaison française hors connexion
 * Génère dynamiquement les formes conjuguées pour ~200 verbes courants
 * Supporte : présent, imparfait, futur, conditionnel, passé simple, 
 *            subjonctif présent, participe passé/présent, impératif
 */

// ============================================================
// Types
// ============================================================
type ConjugationGroup = 'er' | 'ir' | 'oir' | 're' | 'irregular';

interface VerbEntry {
    infinitive: string;
    group: ConjugationGroup;
    stem?: string;           // radical si irrégulier
    pastParticiple?: string; // participe passé irrégulier
    presParticiple?: string; // participe présent irrégulier
    presentStems?: string[]; // radicaux présent [je/tu/il, nous, vous, ils]
    futureStem?: string;     // radical futur irrégulier
    imperfectStem?: string;  // radical imparfait irrégulier
}

// ============================================================
// Terminaisons par groupe et temps
// ============================================================
const PRESENT_ER = ['e', 'es', 'e', 'ons', 'ez', 'ent'];
const PRESENT_IR = ['is', 'is', 'it', 'issons', 'issez', 'issent'];
const PRESENT_RE = ['s', 's', '', 'ons', 'ez', 'ent'];

const IMPARFAIT = ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'];
const FUTUR = ['ai', 'as', 'a', 'ons', 'ez', 'ont'];
const CONDITIONNEL = ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'];
const PASSE_SIMPLE_ER = ['ai', 'as', 'a', 'âmes', 'âtes', 'èrent'];
const PASSE_SIMPLE_IR = ['is', 'is', 'it', 'îmes', 'îtes', 'irent'];
const SUBJONCTIF = ['e', 'es', 'e', 'ions', 'iez', 'ent'];

// ============================================================
// Liste des verbes courants avec leurs particularités
// ============================================================
const VERBS: VerbEntry[] = [
    // --- ÊTRE / AVOIR ---
    {
        infinitive: 'être', group: 'irregular',
        pastParticiple: 'été', presParticiple: 'étant',
        presentStems: ['sui', 'e', 'e', 'somm', 'êt', 'son'],
        futureStem: 'ser', imperfectStem: 'ét',
    },
    {
        infinitive: 'avoir', group: 'irregular',
        pastParticiple: 'eu', presParticiple: 'ayant',
        presentStems: ['ai', 'a', 'a', 'av', 'av', 'on'],
        futureStem: 'aur', imperfectStem: 'av',
    },

    // --- Verbes du 1er groupe fréquents ---
    { infinitive: 'abandonner', group: 'er' },
    { infinitive: 'accepter', group: 'er' },
    { infinitive: 'accompagner', group: 'er' },
    { infinitive: 'accorder', group: 'er' },
    { infinitive: 'accuser', group: 'er' },
    { infinitive: 'acheter', group: 'er' },
    { infinitive: 'admettre', group: 're', stem: 'admet', pastParticiple: 'admis' },
    { infinitive: 'adresser', group: 'er' },
    { infinitive: 'affirmer', group: 'er' },
    { infinitive: 'agir', group: 'ir' },
    { infinitive: 'aider', group: 'er' },
    { infinitive: 'aimer', group: 'er' },
    { infinitive: 'ajouter', group: 'er' },
    { infinitive: 'aller', group: 'irregular', pastParticiple: 'allé', presParticiple: 'allant', futureStem: 'ir' },
    { infinitive: 'amener', group: 'er' },
    { infinitive: 'analyser', group: 'er' },
    { infinitive: 'annoncer', group: 'er' },
    { infinitive: 'apercevoir', group: 'oir', stem: 'aperçoi', pastParticiple: 'aperçu', futureStem: 'apercevr' },
    { infinitive: 'apparaître', group: 're', stem: 'apparai', pastParticiple: 'apparu' },
    { infinitive: 'appeler', group: 'er' },
    { infinitive: 'apporter', group: 'er' },
    { infinitive: 'apprendre', group: 're', stem: 'appren', pastParticiple: 'appris' },
    { infinitive: 'approcher', group: 'er' },
    { infinitive: 'appuyer', group: 'er' },
    { infinitive: 'arracher', group: 'er' },
    { infinitive: 'arranger', group: 'er' },
    { infinitive: 'arrêter', group: 'er' },
    { infinitive: 'arriver', group: 'er' },
    { infinitive: 'assurer', group: 'er' },
    { infinitive: 'attaquer', group: 'er' },
    { infinitive: 'atteindre', group: 're', stem: 'attein', pastParticiple: 'atteint' },
    { infinitive: 'attendre', group: 're', stem: 'attend', pastParticiple: 'attendu' },
    { infinitive: 'avancer', group: 'er' },

    { infinitive: 'battre', group: 're', stem: 'bat', pastParticiple: 'battu' },
    { infinitive: 'blesser', group: 'er' },
    { infinitive: 'boire', group: 're', stem: 'boi', pastParticiple: 'bu' },
    { infinitive: 'bouger', group: 'er' },
    { infinitive: 'briser', group: 'er' },
    { infinitive: 'brûler', group: 'er' },

    { infinitive: 'cacher', group: 'er' },
    { infinitive: 'calculer', group: 'er' },
    { infinitive: 'causer', group: 'er' },
    { infinitive: 'cesser', group: 'er' },
    { infinitive: 'changer', group: 'er' },
    { infinitive: 'charger', group: 'er' },
    { infinitive: 'chasser', group: 'er' },
    { infinitive: 'chercher', group: 'er' },
    { infinitive: 'choisir', group: 'ir' },
    { infinitive: 'citer', group: 'er' },
    { infinitive: 'commander', group: 'er' },
    { infinitive: 'commencer', group: 'er' },
    { infinitive: 'communiquer', group: 'er' },
    { infinitive: 'comparer', group: 'er' },
    { infinitive: 'compléter', group: 'er' },
    { infinitive: 'comprendre', group: 're', stem: 'compren', pastParticiple: 'compris' },
    { infinitive: 'compter', group: 'er' },
    { infinitive: 'conclure', group: 're', stem: 'conclu', pastParticiple: 'conclu' },
    { infinitive: 'conduire', group: 're', stem: 'condui', pastParticiple: 'conduit' },
    { infinitive: 'confirmer', group: 'er' },
    { infinitive: 'connaître', group: 're', stem: 'connai', pastParticiple: 'connu' },
    { infinitive: 'considérer', group: 'er' },
    { infinitive: 'consolider', group: 'er' },
    { infinitive: 'constater', group: 'er' },
    { infinitive: 'construire', group: 're', stem: 'construi', pastParticiple: 'construit' },
    { infinitive: 'consulter', group: 'er' },
    { infinitive: 'contenir', group: 'ir', stem: 'contien', pastParticiple: 'contenu', futureStem: 'contiendr' },
    { infinitive: 'continuer', group: 'er' },
    { infinitive: 'contribuer', group: 'er' },
    { infinitive: 'contrôler', group: 'er' },
    { infinitive: 'convenir', group: 'ir', stem: 'convien', pastParticiple: 'convenu', futureStem: 'conviendr' },
    { infinitive: 'corriger', group: 'er' },
    { infinitive: 'coucher', group: 'er' },
    { infinitive: 'couper', group: 'er' },
    { infinitive: 'courir', group: 'ir', stem: 'cour', pastParticiple: 'couru', futureStem: 'courr' },
    { infinitive: 'couvrir', group: 'ir', stem: 'couvr', pastParticiple: 'couvert' },
    { infinitive: 'craindre', group: 're', stem: 'crain', pastParticiple: 'craint' },
    { infinitive: 'créer', group: 'er' },
    { infinitive: 'crier', group: 'er' },
    { infinitive: 'croire', group: 're', stem: 'croi', pastParticiple: 'cru' },

    { infinitive: 'décider', group: 'er' },
    { infinitive: 'déclarer', group: 'er' },
    { infinitive: 'découvrir', group: 'ir', stem: 'découvr', pastParticiple: 'découvert' },
    { infinitive: 'décrire', group: 're', stem: 'décri', pastParticiple: 'décrit' },
    { infinitive: 'défendre', group: 're', stem: 'défend', pastParticiple: 'défendu' },
    { infinitive: 'demander', group: 'er' },
    { infinitive: 'demeurer', group: 'er' },
    { infinitive: 'dépasser', group: 'er' },
    { infinitive: 'déplacer', group: 'er' },
    { infinitive: 'déposer', group: 'er' },
    { infinitive: 'descendre', group: 're', stem: 'descend', pastParticiple: 'descendu' },
    { infinitive: 'désigner', group: 'er' },
    { infinitive: 'désirer', group: 'er' },
    { infinitive: 'dessiner', group: 'er' },
    { infinitive: 'déterminer', group: 'er' },
    { infinitive: 'détruire', group: 're', stem: 'détrui', pastParticiple: 'détruit' },
    { infinitive: 'développer', group: 'er' },
    { infinitive: 'devenir', group: 'ir', stem: 'devien', pastParticiple: 'devenu', futureStem: 'deviendr' },
    { infinitive: 'devoir', group: 'oir', stem: 'doi', pastParticiple: 'dû', futureStem: 'devr' },
    { infinitive: 'dire', group: 're', stem: 'di', pastParticiple: 'dit' },
    { infinitive: 'diriger', group: 'er' },
    { infinitive: 'disparaître', group: 're', stem: 'disparai', pastParticiple: 'disparu' },
    { infinitive: 'disposer', group: 'er' },
    { infinitive: 'distinguer', group: 'er' },
    { infinitive: 'donner', group: 'er' },
    { infinitive: 'dormir', group: 'ir', stem: 'dor', pastParticiple: 'dormi' },
    { infinitive: 'doubler', group: 'er' },
    { infinitive: 'douter', group: 'er' },
    { infinitive: 'dresser', group: 'er' },
    { infinitive: 'durer', group: 'er' },

    { infinitive: 'écouter', group: 'er' },
    { infinitive: 'écrire', group: 're', stem: 'écri', pastParticiple: 'écrit' },
    { infinitive: 'effectuer', group: 'er' },
    { infinitive: 'élever', group: 'er' },
    { infinitive: 'éliminer', group: 'er' },
    { infinitive: 'embrasser', group: 'er' },
    { infinitive: 'emmener', group: 'er' },
    { infinitive: 'empêcher', group: 'er' },
    { infinitive: 'employer', group: 'er' },
    { infinitive: 'emporter', group: 'er' },
    { infinitive: 'encourager', group: 'er' },
    { infinitive: 'engager', group: 'er' },
    { infinitive: 'enlever', group: 'er' },
    { infinitive: 'enseigner', group: 'er' },
    { infinitive: 'entendre', group: 're', stem: 'entend', pastParticiple: 'entendu' },
    { infinitive: 'entourer', group: 'er' },
    { infinitive: 'entraîner', group: 'er' },
    { infinitive: 'entreprendre', group: 're', stem: 'entrepren', pastParticiple: 'entrepris' },
    { infinitive: 'entrer', group: 'er' },
    { infinitive: 'envoyer', group: 'er', futureStem: 'enverr' },
    { infinitive: 'éprouver', group: 'er' },
    { infinitive: 'espérer', group: 'er' },
    { infinitive: 'essayer', group: 'er' },
    { infinitive: 'établir', group: 'ir' },
    { infinitive: 'étendre', group: 're', stem: 'étend', pastParticiple: 'étendu' },
    { infinitive: 'étonner', group: 'er' },
    { infinitive: 'étudier', group: 'er' },
    { infinitive: 'évaluer', group: 'er' },
    { infinitive: 'éveiller', group: 'er' },
    { infinitive: 'éviter', group: 'er' },
    { infinitive: 'exécuter', group: 'er' },
    { infinitive: 'exercer', group: 'er' },
    { infinitive: 'exiger', group: 'er' },
    { infinitive: 'exister', group: 'er' },
    { infinitive: 'expliquer', group: 'er' },
    { infinitive: 'exprimer', group: 'er' },

    { infinitive: 'fabriquer', group: 'er' },
    { infinitive: 'faire', group: 'irregular', pastParticiple: 'fait', presParticiple: 'faisant', futureStem: 'fer' },
    { infinitive: 'falloir', group: 'irregular', pastParticiple: 'fallu', futureStem: 'faudr' },
    { infinitive: 'fermer', group: 'er' },
    { infinitive: 'figurer', group: 'er' },
    { infinitive: 'finir', group: 'ir' },
    { infinitive: 'fixer', group: 'er' },
    { infinitive: 'fonctionner', group: 'er' },
    { infinitive: 'fonder', group: 'er' },
    { infinitive: 'forcer', group: 'er' },
    { infinitive: 'former', group: 'er' },
    { infinitive: 'fournir', group: 'ir' },
    { infinitive: 'frapper', group: 'er' },

    { infinitive: 'gagner', group: 'er' },
    { infinitive: 'garder', group: 'er' },
    { infinitive: 'glisser', group: 'er' },
    { infinitive: 'grandir', group: 'ir' },
    { infinitive: 'guérir', group: 'ir' },

    { infinitive: 'habiter', group: 'er' },
    { infinitive: 'hésiter', group: 'er' },

    { infinitive: 'ignorer', group: 'er' },
    { infinitive: 'imaginer', group: 'er' },
    { infinitive: 'imposer', group: 'er' },
    { infinitive: 'indiquer', group: 'er' },
    { infinitive: 'inspirer', group: 'er' },
    { infinitive: 'installer', group: 'er' },
    { infinitive: 'instruire', group: 're', stem: 'instrui', pastParticiple: 'instruit' },
    { infinitive: 'interdire', group: 're', stem: 'interdi', pastParticiple: 'interdit' },
    { infinitive: 'intéresser', group: 'er' },
    { infinitive: 'interpréter', group: 'er' },
    { infinitive: 'interroger', group: 'er' },
    { infinitive: 'intervenir', group: 'ir', stem: 'intervien', pastParticiple: 'intervenu', futureStem: 'interviendr' },
    { infinitive: 'introduire', group: 're', stem: 'introdui', pastParticiple: 'introduit' },
    { infinitive: 'inviter', group: 'er' },

    { infinitive: 'jeter', group: 'er' },
    { infinitive: 'joindre', group: 're', stem: 'join', pastParticiple: 'joint' },
    { infinitive: 'jouer', group: 'er' },
    { infinitive: 'juger', group: 'er' },

    { infinitive: 'laisser', group: 'er' },
    { infinitive: 'lancer', group: 'er' },
    { infinitive: 'lever', group: 'er' },
    { infinitive: 'lier', group: 'er' },
    { infinitive: 'lire', group: 're', stem: 'li', pastParticiple: 'lu' },

    { infinitive: 'maintenir', group: 'ir', stem: 'maintien', pastParticiple: 'maintenu', futureStem: 'maintiendr' },
    { infinitive: 'manger', group: 'er' },
    { infinitive: 'manquer', group: 'er' },
    { infinitive: 'marcher', group: 'er' },
    { infinitive: 'marquer', group: 'er' },
    { infinitive: 'mener', group: 'er' },
    { infinitive: 'mentir', group: 'ir', stem: 'men', pastParticiple: 'menti' },
    { infinitive: 'mériter', group: 'er' },
    { infinitive: 'mesurer', group: 'er' },
    { infinitive: 'mettre', group: 're', stem: 'met', pastParticiple: 'mis' },
    { infinitive: 'modifier', group: 'er' },
    { infinitive: 'monter', group: 'er' },
    { infinitive: 'montrer', group: 'er' },
    { infinitive: 'mourir', group: 'ir', stem: 'meur', pastParticiple: 'mort', futureStem: 'mourr' },
    { infinitive: 'mouvoir', group: 'oir', stem: 'meu', pastParticiple: 'mû', futureStem: 'mouvr' },

    { infinitive: 'naître', group: 're', stem: 'nai', pastParticiple: 'né' },
    { infinitive: 'nommer', group: 'er' },
    { infinitive: 'noter', group: 'er' },
    { infinitive: 'nourrir', group: 'ir' },

    { infinitive: 'obéir', group: 'ir' },
    { infinitive: 'obliger', group: 'er' },
    { infinitive: 'observer', group: 'er' },
    { infinitive: 'obtenir', group: 'ir', stem: 'obtien', pastParticiple: 'obtenu', futureStem: 'obtiendr' },
    { infinitive: 'occuper', group: 'er' },
    { infinitive: 'offrir', group: 'ir', stem: 'offr', pastParticiple: 'offert' },
    { infinitive: 'opérer', group: 'er' },
    { infinitive: 'opposer', group: 'er' },
    { infinitive: 'ordonner', group: 'er' },
    { infinitive: 'organiser', group: 'er' },
    { infinitive: 'oser', group: 'er' },
    { infinitive: 'oublier', group: 'er' },
    { infinitive: 'ouvrir', group: 'ir', stem: 'ouvr', pastParticiple: 'ouvert' },

    { infinitive: 'paraître', group: 're', stem: 'parai', pastParticiple: 'paru' },
    { infinitive: 'parler', group: 'er' },
    { infinitive: 'partager', group: 'er' },
    { infinitive: 'partir', group: 'ir', stem: 'par', pastParticiple: 'parti' },
    { infinitive: 'parvenir', group: 'ir', stem: 'parvien', pastParticiple: 'parvenu', futureStem: 'parviendr' },
    { infinitive: 'passer', group: 'er' },
    { infinitive: 'payer', group: 'er' },
    { infinitive: 'pénétrer', group: 'er' },
    { infinitive: 'penser', group: 'er' },
    { infinitive: 'perdre', group: 're', stem: 'perd', pastParticiple: 'perdu' },
    { infinitive: 'permettre', group: 're', stem: 'permet', pastParticiple: 'permis' },
    { infinitive: 'peser', group: 'er' },
    { infinitive: 'placer', group: 'er' },
    { infinitive: 'plaindre', group: 're', stem: 'plain', pastParticiple: 'plaint' },
    { infinitive: 'plaire', group: 're', stem: 'plai', pastParticiple: 'plu' },
    { infinitive: 'planter', group: 'er' },
    { infinitive: 'pleurer', group: 'er' },
    { infinitive: 'plonger', group: 'er' },
    { infinitive: 'porter', group: 'er' },
    { infinitive: 'poser', group: 'er' },
    { infinitive: 'posséder', group: 'er' },
    { infinitive: 'poursuivre', group: 're', stem: 'poursui', pastParticiple: 'poursuivi' },
    { infinitive: 'pousser', group: 'er' },
    { infinitive: 'pouvoir', group: 'oir', stem: 'peu', pastParticiple: 'pu', futureStem: 'pourr' },
    { infinitive: 'pratiquer', group: 'er' },
    { infinitive: 'précéder', group: 'er' },
    { infinitive: 'préciser', group: 'er' },
    { infinitive: 'préférer', group: 'er' },
    { infinitive: 'prendre', group: 're', stem: 'pren', pastParticiple: 'pris' },
    { infinitive: 'préparer', group: 'er' },
    { infinitive: 'présenter', group: 'er' },
    { infinitive: 'préserver', group: 'er' },
    { infinitive: 'prétendre', group: 're', stem: 'prétend', pastParticiple: 'prétendu' },
    { infinitive: 'prêter', group: 'er' },
    { infinitive: 'prévoir', group: 'oir', stem: 'prévoi', pastParticiple: 'prévu', futureStem: 'prévoir' },
    { infinitive: 'prier', group: 'er' },
    { infinitive: 'produire', group: 're', stem: 'produi', pastParticiple: 'produit' },
    { infinitive: 'profiter', group: 'er' },
    { infinitive: 'promettre', group: 're', stem: 'promet', pastParticiple: 'promis' },
    { infinitive: 'prononcer', group: 'er' },
    { infinitive: 'proposer', group: 'er' },
    { infinitive: 'protéger', group: 'er' },
    { infinitive: 'prouver', group: 'er' },
    { infinitive: 'publier', group: 'er' },
    { infinitive: 'punir', group: 'ir' },

    { infinitive: 'quitter', group: 'er' },

    { infinitive: 'raconter', group: 'er' },
    { infinitive: 'ramener', group: 'er' },
    { infinitive: 'ranger', group: 'er' },
    { infinitive: 'rappeler', group: 'er' },
    { infinitive: 'rapporter', group: 'er' },
    { infinitive: 'rassembler', group: 'er' },
    { infinitive: 'recevoir', group: 'oir', stem: 'reçoi', pastParticiple: 'reçu', futureStem: 'recevr' },
    { infinitive: 'rechercher', group: 'er' },
    { infinitive: 'recommander', group: 'er' },
    { infinitive: 'reconnaître', group: 're', stem: 'reconnai', pastParticiple: 'reconnu' },
    { infinitive: 'réduire', group: 're', stem: 'rédui', pastParticiple: 'réduit' },
    { infinitive: 'réfléchir', group: 'ir' },
    { infinitive: 'refuser', group: 'er' },
    { infinitive: 'regarder', group: 'er' },
    { infinitive: 'régler', group: 'er' },
    { infinitive: 'regretter', group: 'er' },
    { infinitive: 'rejeter', group: 'er' },
    { infinitive: 'rejoindre', group: 're', stem: 'rejoin', pastParticiple: 'rejoint' },
    { infinitive: 'remarquer', group: 'er' },
    { infinitive: 'remettre', group: 're', stem: 'remet', pastParticiple: 'remis' },
    { infinitive: 'remonter', group: 'er' },
    { infinitive: 'remplacer', group: 'er' },
    { infinitive: 'remplir', group: 'ir' },
    { infinitive: 'rencontrer', group: 'er' },
    { infinitive: 'rendre', group: 're', stem: 'rend', pastParticiple: 'rendu' },
    { infinitive: 'renoncer', group: 'er' },
    { infinitive: 'rentrer', group: 'er' },
    { infinitive: 'renvoyer', group: 'er' },
    { infinitive: 'répéter', group: 'er' },
    { infinitive: 'répondre', group: 're', stem: 'répond', pastParticiple: 'répondu' },
    { infinitive: 'reposer', group: 'er' },
    { infinitive: 'reprendre', group: 're', stem: 'repren', pastParticiple: 'repris' },
    { infinitive: 'représenter', group: 'er' },
    { infinitive: 'reprocher', group: 'er' },
    { infinitive: 'réserver', group: 'er' },
    { infinitive: 'résister', group: 'er' },
    { infinitive: 'résoudre', group: 're', stem: 'résou', pastParticiple: 'résolu' },
    { infinitive: 'respecter', group: 'er' },
    { infinitive: 'respirer', group: 'er' },
    { infinitive: 'ressembler', group: 'er' },
    { infinitive: 'rester', group: 'er' },
    { infinitive: 'résulter', group: 'er' },
    { infinitive: 'retenir', group: 'ir', stem: 'retien', pastParticiple: 'retenu', futureStem: 'retiendr' },
    { infinitive: 'retirer', group: 'er' },
    { infinitive: 'retourner', group: 'er' },
    { infinitive: 'retrouver', group: 'er' },
    { infinitive: 'réunir', group: 'ir' },
    { infinitive: 'réussir', group: 'ir' },
    { infinitive: 'réveiller', group: 'er' },
    { infinitive: 'révéler', group: 'er' },
    { infinitive: 'revenir', group: 'ir', stem: 'revien', pastParticiple: 'revenu', futureStem: 'reviendr' },
    { infinitive: 'rire', group: 're', stem: 'ri', pastParticiple: 'ri' },
    { infinitive: 'risquer', group: 'er' },
    { infinitive: 'rompre', group: 're', stem: 'romp', pastParticiple: 'rompu' },
    { infinitive: 'rouler', group: 'er' },

    { infinitive: 'sacrifier', group: 'er' },
    { infinitive: 'saisir', group: 'ir' },
    { infinitive: 'satisfaire', group: 'irregular', pastParticiple: 'satisfait', futureStem: 'satisfer' },
    { infinitive: 'sauver', group: 'er' },
    { infinitive: 'savoir', group: 'oir', stem: 'sai', pastParticiple: 'su', futureStem: 'saur' },
    { infinitive: 'sembler', group: 'er' },
    { infinitive: 'sentir', group: 'ir', stem: 'sen', pastParticiple: 'senti' },
    { infinitive: 'séparer', group: 'er' },
    { infinitive: 'serrer', group: 'er' },
    { infinitive: 'servir', group: 'ir', stem: 'ser', pastParticiple: 'servi' },
    { infinitive: 'signer', group: 'er' },
    { infinitive: 'signifier', group: 'er' },
    { infinitive: 'soigner', group: 'er' },
    { infinitive: 'songer', group: 'er' },
    { infinitive: 'sortir', group: 'ir', stem: 'sor', pastParticiple: 'sorti' },
    { infinitive: 'souffrir', group: 'ir', stem: 'souffr', pastParticiple: 'souffert' },
    { infinitive: 'souhaiter', group: 'er' },
    { infinitive: 'soulever', group: 'er' },
    { infinitive: 'soumettre', group: 're', stem: 'soumet', pastParticiple: 'soumis' },
    { infinitive: 'soutenir', group: 'ir', stem: 'soutien', pastParticiple: 'soutenu', futureStem: 'soutiendr' },
    { infinitive: 'souvenir', group: 'ir', stem: 'souvien', pastParticiple: 'souvenu', futureStem: 'souviendr' },
    { infinitive: 'subir', group: 'ir' },
    { infinitive: 'succéder', group: 'er' },
    { infinitive: 'suffire', group: 're', stem: 'suffi', pastParticiple: 'suffi' },
    { infinitive: 'suggérer', group: 'er' },
    { infinitive: 'suivre', group: 're', stem: 'sui', pastParticiple: 'suivi' },
    { infinitive: 'supprimer', group: 'er' },
    { infinitive: 'supposer', group: 'er' },
    { infinitive: 'survivre', group: 're', stem: 'survi', pastParticiple: 'survécu' },

    { infinitive: 'taire', group: 're', stem: 'tai', pastParticiple: 'tu' },
    { infinitive: 'tarder', group: 'er' },
    { infinitive: 'tendre', group: 're', stem: 'tend', pastParticiple: 'tendu' },
    { infinitive: 'tenir', group: 'ir', stem: 'tien', pastParticiple: 'tenu', futureStem: 'tiendr' },
    { infinitive: 'tenter', group: 'er' },
    { infinitive: 'terminer', group: 'er' },
    { infinitive: 'tirer', group: 'er' },
    { infinitive: 'tomber', group: 'er' },
    { infinitive: 'toucher', group: 'er' },
    { infinitive: 'tourner', group: 'er' },
    { infinitive: 'traîner', group: 'er' },
    { infinitive: 'traiter', group: 'er' },
    { infinitive: 'transformer', group: 'er' },
    { infinitive: 'transmettre', group: 're', stem: 'transmet', pastParticiple: 'transmis' },
    { infinitive: 'transporter', group: 'er' },
    { infinitive: 'travailler', group: 'er' },
    { infinitive: 'traverser', group: 'er' },
    { infinitive: 'trembler', group: 'er' },
    { infinitive: 'tromper', group: 'er' },
    { infinitive: 'trouver', group: 'er' },
    { infinitive: 'tuer', group: 'er' },

    { infinitive: 'unir', group: 'ir' },
    { infinitive: 'utiliser', group: 'er' },

    { infinitive: 'vaincre', group: 're', stem: 'vainc', pastParticiple: 'vaincu' },
    { infinitive: 'valoir', group: 'oir', stem: 'vau', pastParticiple: 'valu', futureStem: 'vaudr' },
    { infinitive: 'vendre', group: 're', stem: 'vend', pastParticiple: 'vendu' },
    { infinitive: 'venir', group: 'ir', stem: 'vien', pastParticiple: 'venu', futureStem: 'viendr' },
    { infinitive: 'vérifier', group: 'er' },
    { infinitive: 'verser', group: 'er' },
    { infinitive: 'vivre', group: 're', stem: 'vi', pastParticiple: 'vécu' },
    { infinitive: 'voir', group: 'oir', stem: 'voi', pastParticiple: 'vu', futureStem: 'verr' },
    { infinitive: 'voler', group: 'er' },
    { infinitive: 'vouloir', group: 'oir', stem: 'veu', pastParticiple: 'voulu', futureStem: 'voudr' },
    { infinitive: 'voyager', group: 'er' },
];

// ============================================================
// Moteur de conjugaison
// ============================================================

function normalize(word: string): string {
    return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function getStem(verb: VerbEntry): string {
    if (verb.stem) return verb.stem;
    const inf = verb.infinitive;
    if (verb.group === 'er') return inf.slice(0, -2);
    if (verb.group === 'ir') return inf.slice(0, -2);
    if (verb.group === 're') return inf.slice(0, -2);
    if (verb.group === 'oir') return inf.slice(0, -3);
    return inf;
}

function conjugatePresent(verb: VerbEntry): string[] {
    const stem = getStem(verb);
    if (verb.group === 'er') return PRESENT_ER.map(e => stem + e);
    if (verb.group === 'ir' && !verb.stem) return PRESENT_IR.map(e => stem + e);
    if (verb.group === 're' || verb.group === 'oir' || verb.stem) {
        return PRESENT_RE.map(e => stem + e);
    }
    return [];
}

function conjugateImperfect(verb: VerbEntry): string[] {
    const stem = verb.imperfectStem || getStem(verb);
    const base = verb.group === 'ir' && !verb.stem ? stem + 'iss' : stem;
    return IMPARFAIT.map(e => base + e);
}

function conjugateFuture(verb: VerbEntry): string[] {
    let stem = verb.futureStem;
    if (!stem) {
        if (verb.group === 'er') stem = verb.infinitive;
        else if (verb.group === 'ir') stem = verb.infinitive;
        else if (verb.group === 're') stem = verb.infinitive.slice(0, -1);
        else stem = verb.infinitive;
    }
    return FUTUR.map(e => stem + e);
}

function conjugateConditional(verb: VerbEntry): string[] {
    let stem = verb.futureStem;
    if (!stem) {
        if (verb.group === 'er') stem = verb.infinitive;
        else if (verb.group === 'ir') stem = verb.infinitive;
        else if (verb.group === 're') stem = verb.infinitive.slice(0, -1);
        else stem = verb.infinitive;
    }
    return CONDITIONNEL.map(e => stem + e);
}

function conjugatePasseSimple(verb: VerbEntry): string[] {
    const stem = getStem(verb);
    if (verb.group === 'er') return PASSE_SIMPLE_ER.map(e => stem + e);
    return PASSE_SIMPLE_IR.map(e => stem + e);
}

function conjugateSubjunctive(verb: VerbEntry): string[] {
    const stem = getStem(verb);
    const base = verb.group === 'ir' && !verb.stem ? stem + 'iss' : stem;
    return SUBJONCTIF.map(e => base + e);
}

function getPastParticiple(verb: VerbEntry): string[] {
    if (verb.pastParticiple) {
        const pp = verb.pastParticiple;
        const forms = [pp];
        // Formes féminin/pluriel
        if (pp.endsWith('é')) {
            forms.push(pp + 'e', pp + 's', pp + 'es');
        } else if (pp.endsWith('i')) {
            forms.push(pp + 'e', pp + 's', pp + 'es');
        } else if (pp.endsWith('u')) {
            forms.push(pp + 'e', pp + 's', pp + 'es');
        } else if (pp.endsWith('t')) {
            forms.push(pp + 'e', pp + 's', pp + 'es');
        } else if (pp.endsWith('s')) {
            forms.push(pp.slice(0, -1) + 'se', pp, pp.slice(0, -1) + 'ses');
        }
        return forms;
    }
    // Participe passé régulier
    const stem = getStem(verb);
    if (verb.group === 'er') return [stem + 'é', stem + 'ée', stem + 'és', stem + 'ées'];
    if (verb.group === 'ir') return [stem + 'i', stem + 'ie', stem + 'is', stem + 'ies'];
    return [stem + 'u', stem + 'ue', stem + 'us', stem + 'ues'];
}

function getPresentParticiple(verb: VerbEntry): string {
    if (verb.presParticiple) return verb.presParticiple;
    const stem = getStem(verb);
    if (verb.group === 'ir' && !verb.stem) return stem + 'issant';
    return stem + 'ant';
}

// ============================================================
// Génération complète et export
// ============================================================

let _cachedForms: Set<string> | null = null;

/**
 * Génère toutes les formes conjuguées de tous les verbes.
 * Retourne un Set de mots normalisés (sans accents, minuscules).
 * ~200 verbes × ~40 formes = ~8000 formes uniques
 */
export function getAllConjugatedForms(): Set<string> {
    if (_cachedForms) return _cachedForms;

    const forms = new Set<string>();

    for (const verb of VERBS) {
        // Infinitif
        forms.add(normalize(verb.infinitive));

        // Présent (6 personnes)
        for (const form of conjugatePresent(verb)) {
            forms.add(normalize(form));
        }

        // Imparfait
        for (const form of conjugateImperfect(verb)) {
            forms.add(normalize(form));
        }

        // Futur
        for (const form of conjugateFuture(verb)) {
            forms.add(normalize(form));
        }

        // Conditionnel
        for (const form of conjugateConditional(verb)) {
            forms.add(normalize(form));
        }

        // Passé simple
        for (const form of conjugatePasseSimple(verb)) {
            forms.add(normalize(form));
        }

        // Subjonctif présent
        for (const form of conjugateSubjunctive(verb)) {
            forms.add(normalize(form));
        }

        // Participe passé (+ féminin/pluriel)
        for (const form of getPastParticiple(verb)) {
            forms.add(normalize(form));
        }

        // Participe présent
        forms.add(normalize(getPresentParticiple(verb)));
    }

    _cachedForms = forms;
    return forms;
}

/**
 * Retourne la liste des infinitifs pour recherche
 */
export function getVerbInfinitives(): string[] {
    return VERBS.map(v => v.infinitive);
}
