import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log("═══════════════════════════════════════════════════");
console.log("🎭 DÉMONSTRATION LANGAGE NATUREL - IA LOCALE");
console.log("═══════════════════════════════════════════════════\n");

const examples = [
    {
        title: "🔹 Latéralité naturelle",
        inputs: [
            "Fracture du pied gauche",
            "Main droite cassée",
            "Du côté gauche de la cheville"
        ]
    },
    {
        title: "🔹 Expressions familières",
        inputs: [
            "Bras cassé",
            "Jambe cassée droite",
            "Coup du lapin lors d'un AVP"
        ]
    },
    {
        title: "🔹 Douleurs courantes",
        inputs: [
            "Mal au cou après l'accident",
            "Tour de reins",
            "Mal en bas du dos"
        ]
    },
    {
        title: "🔹 Temporalité SMS",
        inputs: [
            "Fracture il y a 3 semaines",
            "Entorse, ça fait 6 semaines",
            "Y'a 2 mois fracture poignet"
        ]
    },
    {
        title: "🔹 Complications naturelles",
        inputs: [
            "Fracture ouverte avec infection",
            "Entorse du genou avec raideur",
            "Fracture du scaphoïde qui ne se répare pas"
        ]
    },
    {
        title: "🔹 Descriptions longues",
        inputs: [
            "Patient présente fracture jambe gauche suite chute avec douleur",
            "Victime AT chute d'échelle fracture poignet droit avec œdème"
        ]
    }
];

for (const category of examples) {
    console.log(`\n${category.title}`);
    console.log("─".repeat(50));
    
    for (const input of category.inputs) {
        const result = comprehensiveSingleLesionAnalysis(input);
        
        if (result.type === 'proposal') {
            console.log(`\n📝 "${input}"`);
            console.log(`✅ ${result.name}`);
            console.log(`   Taux: ${result.rate}%`);
        } else if (result.type === 'ambiguity') {
            console.log(`\n📝 "${input}"`);
            console.log(`⚠️  Ambiguïté: ${result.choices.length} choix`);
            console.log(`   Top 3: ${result.choices.slice(0, 3).map(c => c.name).join(', ')}`);
        } else {
            console.log(`\n📝 "${input}"`);
            console.log(`❌ Non reconnu`);
        }
    }
}

console.log("\n═══════════════════════════════════════════════════");
console.log("✨ L'IA comprend maintenant le langage naturel !");
console.log("═══════════════════════════════════════════════════\n");
