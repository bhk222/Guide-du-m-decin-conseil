import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log("╔══════════════════════════════════════════════════════════════╗");
console.log("║     🎭 DÉMONSTRATION LANGAGE NATUREL ULTRA-AVANCÉ           ║");
console.log("╚══════════════════════════════════════════════════════════════╝\n");

const demos = [
    { input: "J'ai mal au dos", label: "Le plus vague possible" },
    { input: "Mal au dos depuis la chute", label: "Avec contexte" },
    { input: "Mal en bas du dos après avoir soulevé une charge lourde", label: "Détaillé" },
    { input: "Tour de reins au travail", label: "Expression familière" },
    { input: "Mal à la tête qui persiste", label: "Céphalée vague" },
    { input: "Mal au cou après l'accident", label: "Cervicalgie contextuelle" },
    { input: "Mal au genou gauche", label: "Avec latéralité" },
    { input: "Mal à l'épaule droite depuis la chute", label: "Épaule + latéralité + contexte" },
    { input: "Mal à la cheville", label: "Cheville minimaliste" },
    { input: "Mal au coude", label: "Coude simple" }
];

demos.forEach((demo, i) => {
    console.log(`${i+1}. ${demo.label}`);
    console.log(`   Input: "${demo.input}"`);
    
    const result = comprehensiveSingleLesionAnalysis(demo.input);
    
    if (result.type === 'proposal') {
        console.log(`   ✅ Détecté: ${result.name}`);
        console.log(`   Taux IPP: ${result.rate}%`);
    } else if (result.type === 'ambiguity') {
        console.log(`   ⚠️  Ambiguïté: ${result.choices.length} choix possibles`);
        console.log(`   Top 3: ${result.choices.slice(0, 3).map(c => c.name).join(', ')}`);
    } else {
        console.log(`   ❌ Non traité`);
    }
    console.log("");
});

console.log("╔══════════════════════════════════════════════════════════════╗");
console.log("║  💡 L'IA comprend le français naturel même très vague !     ║");
console.log("╚══════════════════════════════════════════════════════════════╝");
