const text = "rupture LCA opérée avec laxité résiduelle dérobements fréquents";
const pattern = /rupture\s+(?:du\s+)?(?:ligament\s+crois[eé]\s+ant[eé]rieur|lca)/i;
const context = /genou/i;

console.log(`Text: "${text}"`);
console.log(`Pattern match: ${pattern.test(text)}`);
console.log(`Context match: ${context.test(text)}`);
console.log(`\nContext needed: "genou" word NOT found in text!`);
