// Test regex colectomie
const text = "colectomie partielle ablation côlon traumatique";
const pattern = /col[eé]ctomie|ablation.*colon|r[eé]section.*colon/i;
const context = /traumatisme|abdomen|colon|transit/i;

console.log(`Text: ${text}`);
console.log(`Pattern matches: ${pattern.test(text)}`);
console.log(`Context matches: ${context.test(text)}`);

// Check barème entry
console.log('\nBarème entry recherchée:');
console.log('Séquelles de colectomie partielle');