import * as fs from 'fs';

const raw = fs.readFileSync('_test_at200_result12.txt', 'utf-8');
const jsonStart = raw.indexOf('{"total"');
if (jsonStart < 0) { console.log('JSON NOT FOUND'); process.exit(1); }
const data = JSON.parse(raw.slice(jsonStart));

const nameF = data.failures.filter((f: any) => f.error.includes('SION:'));
const rateF = data.failures.filter((f: any) => f.error.includes('TAUX:'));

console.log(`TOTAL=${data.total} PASSED=${data.passed} FAILED=${data.failed} PCT=${data.pct}%`);
console.log(`NAME_FAILURES=${nameF.length} RATE_FAILURES=${rateF.length}`);

console.log('\n---NAME FAILURES---');
nameF.forEach((f: any) => {
  console.log(`${f.id} | expRate=${f.expectedRate} gotRate=${f.foundRate} | type=${f.type}`);
  console.log(`  EXP: ${f.expected}`);
  console.log(`  GOT: ${f.found.substring(0, 80)}`);
});

console.log('\n---RATE FAILURES---');
rateF.forEach((f: any) => {
  const diff = f.foundRate !== null ? Math.abs(f.foundRate - f.expectedRate) : 'NULL';
  console.log(`${f.id} | exp=${f.expectedRate} got=${f.foundRate} diff=${diff}`);
});

// Summary - classify rate failures by closeness
const close = rateF.filter((f: any) => f.foundRate !== null && Math.abs(f.foundRate - f.expectedRate) <= 15);
const medium = rateF.filter((f: any) => f.foundRate !== null && Math.abs(f.foundRate - f.expectedRate) > 15 && Math.abs(f.foundRate - f.expectedRate) <= 25);
const far = rateF.filter((f: any) => f.foundRate !== null && Math.abs(f.foundRate - f.expectedRate) > 25);
const nullRate = rateF.filter((f: any) => f.foundRate === null);

console.log(`\n---RATE DISTANCE SUMMARY---`);
console.log(`Close (<=15): ${close.length} cases → ${close.map((f:any) => f.id).join(', ')}`);
console.log(`Medium (16-25): ${medium.length} cases → ${medium.map((f:any) => f.id).join(', ')}`);
console.log(`Far (>25): ${far.length} cases → ${far.map((f:any) => f.id).join(', ')}`);
console.log(`Null rate: ${nullRate.length} cases → ${nullRate.map((f:any) => f.id).join(', ')}`);
