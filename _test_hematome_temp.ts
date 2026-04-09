import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';
const cases = [
  'hématome sous-dural chronique',
  'hématome extradural opéré',
  'hématome sous-dural opéré avec hémiparésie gauche',
  'hématome intracérébral traitement conservateur'
];
for (const c of cases) {
  const r = comprehensiveSingleLesionAnalysis(c);
  console.log(`${c} => ${r?.name} / ${r?.rate}%`);
}
