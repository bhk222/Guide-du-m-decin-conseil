import { localExpertAnalysis } from './components/AiAnalyzer';

const input = `assuré âgé de 32 ans maçon de profession victime d'un AT survenue le 14/01/2023 à l'origine d'un traumatisme cervico-cranio-faciale avec plaie cervicale gauche profonde plaie de la base de la langue et du palais gêne fonctionnelle et socioprofessionnelle gêne à la mastication perte subtotale de la vision à droite cicatrice cervicale gauche de bonne qualité oeil droit perdu à 100% strabisme paralytique cicatrice cornéenne oeil gauche normale ouverture de la bouche normale avec une gêne à la mastication plus marquée à droite enfoncement de la pommette droite anesthésie dans le territoire du nerf sous-orbitaire droit dysphagie signalée par l'assuré`;

const result = localExpertAnalysis(input, []);

console.log('\n\n========================================');
console.log('=== RÉSULTAT ANALYSE CERVICO-CRANIO ===');
console.log('========================================');
console.log('TYPE:', result.type);

if (result.type === 'proposal') {
  console.log('NAME:', result.name);
  console.log('RATE:', result.rate);
  console.log('PATH:', (result as any).path);
  console.log('JUSTIF:', (result.justification || '').substring(0, 1500));
} else if (result.type === 'cumul_proposals') {
  const proposals = (result as any).proposals || [];
  console.log(`NOMBRE PROPOSITIONS: ${proposals.length}`);
  for (const p of proposals) {
    console.log(`  → ${p.injury?.name || p.name} = ${p.injury?.rate || p.rate}%`);
  }
} else if (result.type === 'question') {
  console.log('QUESTION:', (result as any).text || JSON.stringify(result).substring(0, 500));
} else {
  console.log(JSON.stringify(result, null, 2).substring(0, 3000));
}
