import { fuzzySearchBareme, fuzzyAutoThreshold } from './utils/fuzzyMatch';

const tests = [
  'trochin epaule fracture',
  'lesion SLAP epaule',
  'fracture Galeazzi avant-bras',
  'rupture du deltoide',
  'pseudarthrose de la clavicule',
  'synostose radio-cubitale',
  'hygroma chronique du coude',
  'instabilite chronique du coude',
  'fracture de la rotule',
  'amputation du pouce main dominante',
  'tassement vertebral L3',
  'rupture coiffe rotateurs epaule',
];

console.log('FUZZY MATCHING TEST - 12 cas problématiques');
console.log('═'.repeat(70));

for (const q of tests) {
  const m = fuzzySearchBareme(q, 3, 10);
  const t = fuzzyAutoThreshold(m);
  const best = m[0];
  const r = best ? (Array.isArray(best.injury.rate) ? best.injury.rate.join('-') : String(best.injury.rate)) : '-';
  const icon = t === 'auto' ? '✅' : t === 'suggest' ? '💡' : '❌';
  console.log(`${icon} ${t.padEnd(8)}| ${String(best?.score||0).padStart(5)} | ${q.padEnd(42)} → ${(best?.injury.name||'RIEN').substring(0,60)} (${r}%)`);
}
