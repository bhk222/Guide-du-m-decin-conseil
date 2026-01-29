const text = 'hemopneumthorax';
const pattern = /h[ée]mo[\s\-]?pneumothorax/i;

console.log('Text:', text);
console.log('Pattern:', pattern);
console.log('Match:', pattern.test(text));
console.log('Result:', text.match(pattern));

// Test variants
const variants = [
    'hemopneumthorax',
    'hémo-pneumothorax',
    'hémo pneumothorax',
    'hémopneumothorax'
];

console.log('\nTest all variants:');
variants.forEach(v => {
    console.log(`"${v}" → ${pattern.test(v)}`);
});
