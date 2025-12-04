// Test de l'ordre des transformations pour p1 o4 vs p1 générique
// V3.3.63: Vérifier que "fracture p1 o4" est transformé AVANT "p1 → phalange proximale"

const testCases = [
  { input: "FRACTURE P1 O4", expected: "fracture première phalange orteil quatrième orteil" },
  { input: "fracture p1 o4", expected: "fracture première phalange orteil quatrième orteil" },
  { input: "AMPUTATION P2 D5", expected: "fracture deuxième phalange doigt auriculaire" },
  { input: "amputation p2 d5", expected: "fracture deuxième phalange doigt auriculaire" },
  { input: "fracture p1 o2", expected: "fracture première phalange orteil deuxième orteil" },
  { input: "lesion p3 d1", expected: "fracture troisième phalange doigt pouce" },
];

// Patterns dans l'ordre CORRECT (V3.3.63)
const transformations = [
  // 1. Patterns spécifiques doigts/orteils AVANT phalanges génériques
  [/\b([dD])([1-5])\b(?=\s*(?:de|du|mg|md|main|gauche|droite|fracture|amputation|ecrasement|arrachement|consolid|avec|raideur|ankylose|douleur|séquelle))/gi, (match, d, num) => {
    const doigts = ['', 'pouce', 'index', 'médius', 'annulaire', 'auriculaire'];
    return `${d.toLowerCase() === 'd' ? 'doigt' : 'Doigt'} ${doigts[parseInt(num)]} `;
  }],
  [/(?:fracture|amputation|lesion|trauma|ecrasement|arrachement|consolidation|sequelle|raideur|ankylose)\s+(?:de\s+)?(?:la\s+)?p([1-3])\s+([dD])([1-5])\b/gi, (match, phalange, d, num) => {
    const doigts = ['', 'pouce', 'index', 'médius', 'annulaire', 'auriculaire'];
    const phalanges = { '1': 'première phalange', '2': 'deuxième phalange', '3': 'troisième phalange' };
    return `fracture ${phalanges[phalange]} doigt ${doigts[parseInt(num)]} `;
  }],
  [/\b([oO])([1-5])\b(?=\s*(?:de|du|pg|pd|pied|gauche|droite|fracture|amputation))/gi, (match, o, num) => {
    const orteils = ['', 'hallux', 'deuxième orteil', 'troisième orteil', 'quatrième orteil', 'cinquième orteil'];
    return `${o.toLowerCase() === 'o' ? 'orteil' : 'Orteil'} ${orteils[parseInt(num)]} `;
  }],
  [/(?:fracture|amputation|lesion|trauma|ecrasement|arrachement|consolidation|sequelle|raideur|ankylose)\s+(?:de\s+)?(?:la\s+)?p([1-3])\s+([oO])([1-5])\b/gi, (match, phalange, o, num) => {
    const orteils = ['', 'hallux', 'deuxième orteil', 'troisième orteil', 'quatrième orteil', 'cinquième orteil'];
    const phalanges = { '1': 'première phalange', '2': 'deuxième phalange', '3': 'troisième phalange' };
    return `fracture ${phalanges[phalange]} orteil ${orteils[parseInt(num)]} `;
  }],
  
  // 2. Phalanges génériques APRÈS patterns spécifiques
  [/\b([pP])1\b/gi, 'phalange proximale P1 '],
  [/\b([pP])2\b/gi, 'phalange moyenne P2 '],
  [/\b([pP])3\b/gi, 'phalange distale P3 '],
];

function normalize(text) {
  let result = text.toLowerCase();
  for (const [pattern, replacement] of transformations) {
    result = result.replace(pattern, replacement);
  }
  return result.trim();
}

console.log("=== TEST ORDRE DES TRANSFORMATIONS V3.3.63 ===\n");

testCases.forEach(({ input, expected }) => {
  const result = normalize(input);
  const match = result.includes(expected.toLowerCase());
  
  console.log(`Input:    "${input}"`);
  console.log(`Expected: "${expected.toLowerCase()}"`);
  console.log(`Result:   "${result}"`);
  console.log(`Status:   ${match ? "✅ PASS" : "❌ FAIL"}`);
  console.log("");
});
