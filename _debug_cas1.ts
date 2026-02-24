import { localExpertAnalysis } from './components/AiAnalyzer';

// Cas 1: fracture côtes simple
const r1 = localExpertAnalysis("fracture de la 7ème et 8ème côte droite suite à une chute de sa hauteur avec douleurs résiduelles à la palpation et à l'inspiration profonde et gêne modérée à l'effort physique sans retentissement sur la fonction respiratoire", []);
console.log('=== CAS 1 ===');
console.log('Type:', r1.type);
console.log('Name:', (r1 as any).name);
console.log('Rate:', (r1 as any).rate);
console.log('Path:', (r1 as any).path);

// Cas 2: sternum simple
const r2 = localExpertAnalysis("fracture isolée du sternum survenue lors d'un accident de la voie publique par impact direct contre le volant avec consolidation radiologique obtenue et douleurs résiduelles à la pression sternale et gêne à l'effort physique intense sans déformation visible", []);
console.log('\n=== CAS 2 ===');
console.log('Type:', r2.type);
console.log('Name:', (r2 as any).name);
console.log('Rate:', (r2 as any).rate);
console.log('Path:', (r2 as any).path);

// Cas 10: contusion myocardique
const r10 = localExpertAnalysis("séquelles de contusion myocardique après traumatisme thoracique grave par accident de la voie publique avec troubles du rythme cardiaque documentés au Holter ECG à type d'extrasystoles ventriculaires fréquentes et épisodes de tachycardie ventriculaire paroxystique sous traitement anti-arythmique au long cours et fraction d'éjection à 45 pour cent", []);
console.log('\n=== CAS 10 ===');
console.log('Type:', r10.type);
console.log('Name:', (r10 as any).name);
console.log('Rate:', (r10 as any).rate);
console.log('Path:', (r10 as any).path);
