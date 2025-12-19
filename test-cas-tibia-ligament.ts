import { analyzeInjury } from './src/services/injuryAnalyzer';

const casComplexe = `Le patient est un salarié âgé de 38 ans, exerçant la fonction de manutentionnaire qualifié. L'accident est survenu sur le lieu et pendant le temps de travail, lors de la manipulation manuelle d'une charge lourde. Au cours de l'effort, une perte d'équilibre a entraîné un mouvement de torsion brutal du membre inférieur droit associé à un choc direct. L'examen clinique et les explorations radiologiques ont mis en évidence une fracture non déplacée du tiers distal du tibia droit, associée à une déchirure partielle du ligament collatéral médial du genou droit ainsi qu'une élongation musculaire du quadriceps. Ces lésions ont nécessité une immobilisation, un traitement antalgique et une prise en charge fonctionnelle spécialisée. Sur le plan évolutif, les séquelles potentielles comprennent une raideur articulaire résiduelle du genou, des algies mécaniques persistantes à l'effort, une diminution de la force musculaire du membre inférieur droit et un retentissement fonctionnel modéré, susceptibles de justifier une évaluation médico-légale en vue de la détermination d'une incapacité permanente partielle.`;

console.log("🧪 TEST CAS COMPLEXE: Fracture Tibia + Ligament + Élongation\n");

const result = analyzeInjury(casComplexe);

console.log("📊 RÉSULTAT D'ANALYSE:");
console.log("Cumul détecté:", result.hasCumul ? "OUI ✅" : "NON ❌");
console.log("Nombre de lésions:", result.cumulDetails?.detectedInjuries || 0);
console.log("\n📋 LÉSIONS IDENTIFIÉES:");

if (result.cumulDetails?.evaluatedInjuries) {
    result.cumulDetails.evaluatedInjuries.forEach((lesion, index) => {
        console.log(`\nLésion ${index + 1}:`);
        console.log(`  Nom: ${lesion.name}`);
        console.log(`  IPP: ${lesion.rate}%`);
        console.log(`  Description: ${lesion.description || 'N/A'}`);
    });
} else if (result.injury) {
    console.log(`\nLésion unique détectée:`);
    console.log(`  Nom: ${result.injury.name}`);
    console.log(`  IPP: ${result.rate}%`);
}

console.log("\n🎯 RÉSULTAT ATTENDU:");
console.log("Lésion 1: Fracture tiers distal tibia droit → 8-10%");
console.log("Lésion 2: Déchirure ligament collatéral médial → 6-8%");
console.log("Lésion 3: Élongation musculaire quadriceps → 3-4%");
console.log("IPP Total (Balthazar): ~17-18%");

console.log("\n⚠️ PROBLÈMES À CORRIGER:");
console.log("1. Confusion 'tiers distal tibia' (jambe) ≠ 'plateaux tibiaux' (genou)");
console.log("2. Déchirure ligament collatéral médial non détectée");
console.log("3. Élongation quadriceps non détectée");
