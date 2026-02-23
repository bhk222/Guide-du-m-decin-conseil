import { localExpertAnalysis } from './components/AiAnalyzer';

const text = `Age de 28 ans, manœuvre ETP. L'accident : Victime d'un AT le 24.08.2024. au moment de nettoyage d'un balcon il a chuté d'une hauteur de 11 mètres environ. Lésion : Occasionnant une fracture complexe trochantéro-diaphysaire droite. Traitement : traitée chirurgicalement par Matériel d'Ostéosynthèse. Examen clinique : Marche avec canne Latéralisation normale. Accroupissement possible mais difficile et indolore. Cicatrice de l'intervention de 25 cm au niveau de la face externe de la cuisse droite. Mouvements de la hanche droite comme libre.`;

const result = localExpertAnalysis(text);

// Display sequelae
if (result.polylesionDetails) {
    console.log('\n🔎 Séquelles détectées:', result.polylesionDetails.length, result.polylesionDetails.map((s: any) => ({
        name: s.name,
        keywords: s.keywords?.slice(0, 5),
        context: s.context?.substring(0, 80)
    })));
}

// Display result
console.log('\nName:', result.name);
console.log('Rate:', result.rate);
console.log('Description:', result.description?.substring(0, 200));
console.log('BarèmeRef:', result.baremeReference);
