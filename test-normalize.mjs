import { normalize } from './components/AiAnalyzer.tsx';

const cas9 = 'Soudeur 50 ans, brûlures oculaires arc électrique. Cataracte bilatérale opérée avec implants. Résultat : acuité visuelle OD 5/10, OG 6/10 avec correction. Gêne pour travaux de précision, éblouissement, impossibilité conduite nocturne.';

console.log('Texte original:');
console.log(cas9);
console.log('');
console.log('Texte normalisé:');
console.log(normalize(cas9));
console.log('');

const normalized = normalize(cas9);
console.log('Contient "cataracte":', normalized.includes('cataracte'));
console.log('Contient "arc":', normalized.includes('arc'));
console.log('Contient "dent":', normalized.includes('dent'));
console.log('Contient "acuite":', normalized.includes('acuite'));
