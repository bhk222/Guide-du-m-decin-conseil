import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

const cases = [
    {
        id: 1,
        name: "Fracture poignet raideur",
        text: "Ouvrier de 45 ans, chute d'échelle. Fracture de Pouteau-Colles du poignet droit (main dominante) opérée, consolidée mais raideur résiduelle avec limitation flexion-extension à 50% et douleurs EVA 4/10 lors des efforts de préhension.",
        expected: "20-30%"
    },
    {
        id: 2,
        name: "Entorse cheville sportif",
        text: "Footballeur 28 ans, entorse grave de la cheville gauche avec rupture ligamentaire externe, instabilité chronique malgré rééducation, boiterie et impossibilité de reprendre le sport. Gonflement persistant et douleur EVA 5/10 à la marche prolongée.",
        expected: "15-25%"
    },
    {
        id: 4,
        name: "Brûlures visage",
        text: "Accident domestique avec explosion gaz. Brûlures faciales 2e et 3e degré touchant front, joues et cou sur 8% surface corporelle. Greffes cutanées réalisées. Séquelles : cicatrices chéloïdes défigurantes, rétraction commissure labiale droite, troubles anxieux avec cauchemars récurrents.",
        expected: "35-50%"
    },
    {
        id: 8,
        name: "Coiffe rotateurs",
        text: "Peintre en bâtiment 48 ans, rupture transfixiante sus-épineux et sous-épineux épaule droite (dominante) après chute. Chirurgie réparatrice effectuée mais récupération partielle. Limitation abduction active à 90°, douleurs nocturnes EVA 5/10, impossibilité travaux en hauteur.",
        expected: "20-35%"
    },
    {
        id: 10,
        name: "Bassin + nerf sciatique",
        text: "Accident voiture avec polytraumatisme. Fracture complexe bassin (cadre obturateur + disjonction sacro-iliaque) et lésion nerf sciatique gauche associée. Consolidation osseuse obtenue mais sciatalgie chronique L5-S1, déficit moteur releveurs pied (steppage), périmètre marche limité 300m.",
        expected: "50-65%"
    }
];

console.log('🧪 TEST BATCH - 5 CAS RESTANTS');
console.log('═══════════════════════════════════════════════════════════');
console.log('');

cases.forEach(c => {
    console.log(`📋 CAS ${c.id} - ${c.name}`);
    
    try {
        const result = localExpertAnalysis(c.text);
        
        if (result.type === 'ambiguity') {
            console.log(`  ❌ AMBIGUÏTÉ (${result.choices?.length || 0} choix)`);
        } else if (result.type === 'no_result') {
            console.log(`  ⚠️  NO RESULT`);
        } else {
            const lesion = result.name?.substring(0, 50) || 'N/A';
            console.log(`  Lésion: ${lesion}${result.name?.length > 50 ? '...' : ''}`);
            console.log(`  IPP: ${result.rate}% (attendu: ${c.expected})`);
            
            // Parse expected range
            const [min, max] = c.expected.replace('%', '').split('-').map(Number);
            if (result.rate >= min && result.rate <= max) {
                console.log(`  ✅ VALIDÉ`);
            } else {
                const mid = (min + max) / 2;
                console.log(`  ❌ ÉCART: ${result.rate - mid} points`);
            }
        }
    } catch (e) {
        console.log(`  💥 ERREUR: ${e.message}`);
    }
    
    console.log('');
});

console.log('═══════════════════════════════════════════════════════════');
