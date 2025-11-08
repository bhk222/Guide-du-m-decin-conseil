const text = 'perte totale vision oeil gauche suite traumatisme oeil droit normal';
const pattern = /perte.*(?:totale|compl[eè]te).*vision.*[oœ]il|[oœ]il.*perte.*(?:totale|compl[eè]te)/i;
const context = /traumatisme|autre.*normal|unilat[eé]rale/i;

console.log('Text:', text);
console.log('Pattern match:', pattern.test(text));
console.log('Context match:', context.test(text));