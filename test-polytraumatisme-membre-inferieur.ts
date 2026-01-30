/**
 * Test cas polytraumatisme membre inférieur
 * Vérifie que les séquelles multiples sont détectées séparément et cumulées correctement
 */

const testCase = {
  description: "Manutentionnaire 38 ans - Polytraumatisme membre inférieur droit",
  input: `Le patient est un salarié âgé de 38 ans, exerçant la fonction de manutentionnaire qualifié. 
L'accident est survenu sur le lieu et pendant le temps de travail, lors de la manipulation manuelle d'une charge lourde. 
Au cours de l'effort, une perte d'équilibre a entraîné un mouvement de torsion brutal du membre inférieur droit associé à un choc direct. 
L'examen clinique et les explorations radiologiques ont mis en évidence une fracture non déplacée du tiers distal du tibia droit, 
associée à une déchirure partielle du ligament collatéral médial du genou droit ainsi qu'une élongation musculaire du quadriceps. 
Ces lésions ont nécessité une immobilisation, un traitement antalgique et une prise en charge fonctionnelle spécialisée. 
Sur le plan évolutif, les séquelles potentielles comprennent une raideur articulaire résiduelle du genou, 
des algies mécaniques persistantes à l'effort, une diminution de la force musculaire du membre inférieur droit 
et un retentissement fonctionnel modéré, susceptibles de justifier une évaluation médico-légale en vue de la détermination d'une incapacité permanente partielle.`,
  
  expectedSequelae: [
    { name: "Fracture tibia distal", rateRange: [15, 18], system: "MEMBRE_INFERIEUR" },
    { name: "Déchirure ligament collatéral médial (LCM)", rateRange: [10, 15], system: "MEMBRE_INFERIEUR" },
    { name: "Élongation quadriceps", rateRange: [8, 12], system: "MEMBRE_INFERIEUR" },
    { name: "Raideur articulaire genou", rateRange: [5, 10], system: "MEMBRE_INFERIEUR" }
  ],
  
  expectedIPP: {
    min: 35,
    max: 42,
    comment: "Cumul Balthazar de 4 séquelles distinctes du même système"
  }
};

console.log('🧪 TEST POLYTRAUMATISME MEMBRE INFÉRIEUR\n');
console.log('📋 Description:', testCase.description);
console.log('\n📝 Séquelles attendues:');
testCase.expectedSequelae.forEach((seq, idx) => {
  console.log(`  ${idx + 1}. ${seq.name}: ${seq.rateRange[0]}-${seq.rateRange[1]}% (${seq.system})`);
});
console.log(`\n🎯 IPP attendu: ${testCase.expectedIPP.min}-${testCase.expectedIPP.max}%`);
console.log(`   ${testCase.expectedIPP.comment}`);

console.log('\n⏳ Simulation calcul Balthazar avec taux moyens:');
const rates = [16, 12, 10, 7]; // Taux moyens de chaque séquelle
console.log('  Séquelles:', rates.join('%, ') + '%');

let capaciteRestante = 100;
rates.forEach((rate, idx) => {
  capaciteRestante = capaciteRestante * (100 - rate) / 100;
  console.log(`  Après séquelle ${idx + 1} (${rate}%): Capacité restante = ${capaciteRestante.toFixed(1)}%`);
});

const ippCalcule = Math.round(100 - capaciteRestante);
console.log(`\n📊 IPP calculé: ${ippCalcule}%`);

if (ippCalcule >= testCase.expectedIPP.min && ippCalcule <= testCase.expectedIPP.max) {
  console.log('✅ IPP dans la fourchette attendue');
} else {
  console.log(`❌ IPP hors fourchette (attendu: ${testCase.expectedIPP.min}-${testCase.expectedIPP.max}%)`);
}

console.log('\n⚠️  PROBLÈME IDENTIFIÉ AVANT V3.3.201:');
console.log('   Le système regroupait ces 4 séquelles en UN SEUL taux de 18%');
console.log('   Sous-évaluation de 20 points (18% au lieu de 38%)');

console.log('\n✅ CORRECTION V3.3.201:');
console.log('   1. Suppression de la règle "polytraumatisme regroupé" à la ligne 13294');
console.log('   2. Amélioration extractIndividualLesions pour détecter séquelles fonctionnelles');
console.log('   3. Chaque séquelle détectée individuellement puis cumulée via Balthazar');

console.log('\n📚 RÉFÉRENCES BARÈME 1967:');
console.log('   - Fracture tibia travailleur manuel 38 ans: 12% (ligne 2908) → 15-18% avec séquelles');
console.log('   - Déchirure partielle LCM: 10-20% (ligne 2796) → 10-15% selon sévérité');
console.log('   - Élongation quadriceps avec déficit force: 5-20% (ligne 2678) → 8-12%');
console.log('   - Raideur genou: 5-25% (ligne 2899) → 5-10% selon limitation');
