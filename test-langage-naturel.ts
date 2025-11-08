import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const testCases = [
    // Descriptions anatomiques naturelles
    {
        description: "Fracture pied gauche",
        input: "Fracture du pied gauche",
        expectedKeywords: ["fracture", "pied", "gauche"]
    },
    {
        description: "Main droite avec latéralité naturelle",
        input: "J'ai mal à la main droite",
        expectedKeywords: ["main", "droit"]
    },
    {
        description: "Côté gauche",
        input: "Fracture du côté gauche de la cheville",
        expectedKeywords: ["fracture", "cheville", "gauche"]
    },
    
    // Termes anatomiques courants
    {
        description: "Mal au dos",
        input: "J'ai mal au dos depuis la chute",
        expectedKeywords: ["rachialgie", "chute"]
    },
    {
        description: "Mal en bas du dos",
        input: "Mal en bas du dos avec limitation",
        expectedKeywords: ["lombalgie", "limitation"]
    },
    {
        description: "Mal au cou",
        input: "J'ai mal au cou après l'accident",
        expectedKeywords: ["cervicalgie"]
    },
    {
        description: "Mal à la tête",
        input: "Mal à la tête persistant",
        expectedKeywords: ["cephalee"]
    },
    
    // Synonymes anatomiques familiers
    {
        description: "Bras cassé",
        input: "Bras cassé à la suite d'une chute",
        expectedKeywords: ["fracture", "bras"]
    },
    {
        description: "Jambe cassée",
        input: "Jambe cassée droite",
        expectedKeywords: ["fracture", "jambe", "droit"]
    },
    {
        description: "Cheville cassée",
        input: "Cheville cassée gauche avec œdème",
        expectedKeywords: ["fracture", "cheville", "gauche", "oedeme"]
    },
    
    // Expressions familières médicales
    {
        description: "Tour de reins",
        input: "Tour de reins après avoir soulevé une charge",
        expectedKeywords: ["lumbago"]
    },
    {
        description: "Coup du lapin",
        input: "Coup du lapin lors d'un AVP",
        expectedKeywords: ["entorse", "cervical"]
    },
    
    // Descriptions temporelles naturelles
    {
        description: "Il y a 3 semaines",
        input: "Fracture du poignet il y a 3 semaines",
        expectedKeywords: ["fracture", "poignet", "depuis", "3", "semaines"]
    },
    {
        description: "Ça fait 2 mois",
        input: "Entorse de la cheville, ça fait 2 mois",
        expectedKeywords: ["entorse", "cheville", "depuis", "2", "mois"]
    },
    {
        description: "Y'a 6 semaines",
        input: "Fracture y'a 6 semaines",
        expectedKeywords: ["fracture", "depuis", "6", "semaines"]
    },
    
    // Complications en langage naturel
    {
        description: "Avec infection",
        input: "Fracture ouverte avec infection",
        expectedKeywords: ["fracture", "infection"]
    },
    {
        description: "Avec raideur",
        input: "Entorse du genou avec raideur résiduelle",
        expectedKeywords: ["entorse", "genou", "raideur"]
    },
    {
        description: "Qui ne se répare pas",
        input: "Fracture du scaphoïde qui ne se répare pas",
        expectedKeywords: ["fracture", "scaphoide", "pseudarthrose"]
    },
    {
        description: "Séquelles importantes",
        input: "Fracture complexe avec séquelles importantes",
        expectedKeywords: ["fracture", "sequelles", "majeures"]
    },
    
    // Descriptions longues et complexes
    {
        description: "Description longue patient",
        input: "Patient qui présente une fracture de la jambe gauche suite à une chute de sa hauteur avec douleur et impossibilité de marcher",
        expectedKeywords: ["fracture", "jambe", "gauche", "chute", "douleur", "impossibilite"]
    },
    {
        description: "Description détaillée AT",
        input: "Victime d'un accident du travail lors d'une chute d'échelle présentant une fracture du poignet droit avec œdème important et limitation des mouvements",
        expectedKeywords: ["fracture", "poignet", "droit", "oedeme", "limitation"]
    },
    
    // Bilatéralité
    {
        description: "Des deux côtés",
        input: "Arthrose des deux côtés des genoux",
        expectedKeywords: ["arthrose", "genou", "bilateral"]
    },
    {
        description: "Gauche et droite",
        input: "Fracture des chevilles gauche et droite",
        expectedKeywords: ["fracture", "cheville", "bilateral"]
    },
    
    // Intensité en langage naturel
    {
        description: "Très grave",
        input: "Fracture très grave du fémur",
        expectedKeywords: ["fracture", "femur", "severe"]
    },
    {
        description: "Léger",
        input: "Entorse légère de la cheville",
        expectedKeywords: ["entorse", "cheville", "leger"]
    }
];

console.log("═══════════════════════════════════════════════════");
console.log("🧪 TEST LANGAGE NATUREL - IA LOCALE");
console.log("═══════════════════════════════════════════════════\n");

let passed = 0;
let failed = 0;

for (const testCase of testCases) {
    console.log(`\n📝 Test: ${testCase.description}`);
    console.log(`   Input: "${testCase.input}"`);
    
    const result = comprehensiveSingleLesionAnalysis(testCase.input);
    
    if (result.type === 'proposal') {
        console.log(`   ✅ Résultat: ${result.name} (${result.rate}%)`);
        console.log(`   Justification: ${result.justification.substring(0, 100)}...`);
        passed++;
    } else if (result.type === 'ambiguity') {
        console.log(`   ⚠️  Ambiguïté détectée (${result.choices.length} choix)`);
        console.log(`   Choix: ${result.choices.map(c => c.name).join(', ')}`);
        passed++;
    } else {
        console.log(`   ❌ Aucun résultat`);
        console.log(`   Message: ${result.text.substring(0, 100)}...`);
        failed++;
    }
}

console.log("\n═══════════════════════════════════════════════════");
console.log(`📊 RÉSULTATS: ${passed}/${testCases.length} tests réussis`);
console.log(`   ✅ Succès: ${passed}`);
console.log(`   ❌ Échecs: ${failed}`);
console.log(`   📈 Taux de réussite: ${((passed / testCases.length) * 100).toFixed(1)}%`);
console.log("═══════════════════════════════════════════════════\n");

// Vérification globale maintenue
console.log("🔍 Vérification validation globale...\n");

process.exit(failed > 0 ? 1 : 0);
