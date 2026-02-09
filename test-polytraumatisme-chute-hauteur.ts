/**
 * 🧪 TEST POLYTRAUMATISME CHUTE DE HAUTEUR
 * 
 * Cas clinique : M. K.M., 41 ans, maçon
 * Accident : Chute échafaudage 5m - 15/03/2024
 * 
 * 4 LÉSIONS DISTINCTES À DÉTECTER :
 * 1. Contusion cérébrale frontale (perte connaissance brève)
 * 2. Fracture mandibule non déplacée
 * 3. Fracture tassement L1 stable
 * 4. Lésion ligamentaire partielle genou droit
 * 
 * IPP ATTENDUE : 28-32% (cumul Balthazard)
 */

const casPolytraumatisme = `
Monsieur K.M., âgé de 41 ans, maçon, a été victime le 15 mars 2024 d'un accident de travail suite à une chute d'un échafaudage d'environ 5 mètres. 
Il a présenté une perte de connaissance brève. 
Le bilan initial a mis en évidence une contusion cérébrale frontale, une fracture non déplacée de la mandibule, une fracture tassement stable de L1 ainsi qu'une lésion ligamentaire partielle du genou droit. 
La prise en charge a été multidisciplinaire, comprenant une surveillance neurologique, un traitement conservateur des lésions maxillo-faciales et rachidiennes, une immobilisation du genou suivie de rééducation fonctionnelle. 
L'évolution a été favorable sur le plan vital, avec persistance de séquelles fonctionnelles modérées justifiant un arrêt de travail prolongé.
`;

console.log('🧪 TEST POLYTRAUMATISME CHUTE HAUTEUR\n');
console.log('📋 Cas clinique:', casPolytraumatisme);
console.log('\n✅ ATTENDU:');
console.log('  - Détection: 4 lésions anatomiques distinctes');
console.log('  - Cumul Balthazard automatique');
console.log('  - IPP totale: 28-32%');
console.log('\n  Lésions individuelles:');
console.log('  1. Contusion cérébrale frontale → 6%');
console.log('  2. Fracture mandibule non déplacée → 6%');
console.log('  3. Fracture tassement L1 stable → 12%');
console.log('  4. Lésion ligamentaire genou droit → 9%');
console.log('\n  Cumul:');
console.log('  L1 (12%) + Genou (9%) = 19.92% → 20%');
console.log('  20% + Mandibule (6%) = 24.80% → 25%');
console.log('  25% + Contusion (6%) = 29.50% → 30%');

export { casPolytraumatisme };
