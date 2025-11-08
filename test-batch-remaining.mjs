import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

const cases = [
    {
        id: 1,
        name: "Fracture poignet raideur",
        desc: "Ouvrier de 45 ans, chute d'échelle. Fracture de Pouteau-Colles du poignet droit (main dominante) opérée, consolidée mais raideur résiduelle avec limitation flexion-extension à 50% et douleurs EVA 4/10 lors des efforts de préhension.",
        expected: "20-30%"
    },
    {
        id: 2,
        name: "Entorse cheville sportif",
        desc: "Footballeur 28 ans, entorse grave de la cheville gauche avec rupture ligamentaire externe, instabilité chronique malgré rééducation, boiterie et impossibilité de reprendre le sport. Gonflement persistant et douleur EVA 5/10 à la marche prolongée.",
        expected: "15-25%"
    },
    {
        id: 4,
        name: "Brûlures visage",
        desc: "Accident domestique avec explosion gaz. Brûlures faciales 2e et 3e degré touchant front, joues et cou sur 8% surface corporelle. Greffes cutanées réalisées. Séquelles : cicatrices chéloïdes défigurantes, rétraction commissure labiale droite, troubles anxieux avec cauchemars récurrents.",
        expected: "35-50%"
    },
    {
        id: 8,
        name: "Coiffe rotateurs",
        desc: "Peintre en bâtiment 48 ans, rupture transfixiante sus-épineux et sous-épineux épaule droite (dominante) après chute. Chirurgie réparatrice effectuée mais récupération partielle. Limitation abduction active à 90°, douleurs nocturnes EVA 5/10, impossibilité travaux en hauteur.",
        expected: "20-35%"
    },
    {
        id: 10,
        name: "Bassin + nerf sciatique",
        desc: "Accident voiture avec polytraumatisme. Fracture complexe bassin (cadre obturateur + disjonction sacro-iliaque) et lésion nerf sciatique gauche associée. Consolidation osseuse obtenue mais sciatalgie chronique L5-S1, déficit moteur releveurs pied (steppage), périmètre marche limité 300m.",
        expected: "50-65%"
    }
];

console.log('🧪 BATCH TEST - 5 CAS RESTANTS\n');

cases.forEach(c => {
    try {
        const result = localExpertAnalysis(c.desc);
        const ipp = result.rate || 0;
        const [min, max] = c.expected.split('-').map(s => parseInt(s.replace('%', '')));
        const valid = ipp >= min && ipp <= max;
        
        console.log(`CAS ${c.id}: ${c.name}`);
        console.log(`  IPP: ${ipp}% (attendu ${c.expected})`);
        console.log(`  Statut: ${valid ? '✅ VALIDÉ' : '❌ ÉCART'}`);
        if (!valid) {
            console.log(`  Lésion: ${result.name || 'N/A'}`);
        }
        console.log('');
    } catch (e) {
        console.log(`CAS ${c.id}: ❌ ERREUR - ${e.message}\n`);
    }
});
