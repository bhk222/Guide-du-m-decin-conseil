import { localExpertAnalysis } from './components/AiAnalyzer';

const text1 = `Technicien de laboratoire manipulant des réactifs sous pression. Explosion d'une fiole contenant un acide concentré, avec projection directe sur le visage. Bilan initial : Brûlures chimiques du 3ème degré sur la face et le cou. Atteinte cornéenne bilatérale sévère (stade IV). Séquelles à la consolidation (18 mois) : Cécité totale de l'œil gauche (taie cornéenne opaque vascularisée). Acuité visuelle de l'œil droit réduite à 4/10 après greffe de cornée. Préjudice esthétique important (cicatrices chéloïdes rétractiles sur les joues et le menton).`;

console.log('=== TEST BRÛLURE + CÉCITÉ ===');
const r1 = localExpertAnalysis(text1);
console.log('TYPE:', r1.type);
console.log('NAME:', (r1 as any).name);
console.log('RATE:', (r1 as any).rate);
console.log('JUSTIF:', (r1 as any).justification?.substring(0, 600));
