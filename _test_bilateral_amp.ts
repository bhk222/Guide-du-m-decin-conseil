import { localExpertAnalysis } from './components/AiAnalyzer';

const text = "opérateur presse industrielle écrasement deux mains amputation 4 doigts main droite + amputation 3 doigts main gauche pouce conservé bilatéral";

console.log('=== TEST BILATERAL FINGER AMPUTATION ===');
console.log('INPUT:', text);
console.log('');

const result = localExpertAnalysis(text);

console.log('');
console.log('=== FINAL RESULT ===');
console.log('XTYPE:', result.type);
console.log('XNAME:', (result as any).name);
console.log('XRATE:', (result as any).rate);
if ((result as any).choices) {
    console.log('XCHOICES:', (result as any).choices.length);
    for (const c of (result as any).choices) {
        console.log('  XCHOICE:', c.name, '→', c.rate, '%');
    }
}
if ((result as any).injury) {
    console.log('XINJURY:', (result as any).injury.name, '→', (result as any).injury.rate);
}
