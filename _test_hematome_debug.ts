import { localExpertAnalysis } from './components/AiAnalyzer';
const cases = [
  'hématome sous-dural chronique',
  'hematome sous dural chronique',
  'hématome sous-dural',
];
for (const c of cases) {
  const r = localExpertAnalysis(c);
  console.log(`\n=== "${c}" ===`);
  console.log(`type: ${r.type}`);
  console.log(`name: ${(r as any).name || 'N/A'}`);
  console.log(`rate: ${(r as any).rate || 'N/A'}`);
  if (r.type === 'fuzzy_suggestions' || (r as any).suggestions) {
    console.log(`suggestions:`, (r as any).suggestions?.map((s: any) => `${s.injury?.name} (${s.score})`));
  }
  if ((r as any).choices) {
    console.log(`choices:`, (r as any).choices?.map((c: any) => c.name));
  }
}
