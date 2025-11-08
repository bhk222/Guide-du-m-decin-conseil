const cas9 = 'Soudeur 50 ans, brûlures oculaires arc électrique. Cataracte bilatérale opérée avec implants. Résultat : acuité visuelle OD 5/10, OG 6/10 avec correction. Gêne pour travaux de précision, éblouissement, impossibilité conduite nocturne.';

const negativeContext = /(?:acuit[eé].*visuelle?|vision).*(?:\d+\/\d+|od.*\d+\/\d+|og.*\d+\/\d+)/i;

console.log('Texte:', cas9.substring(0, 100) + '...');
console.log('');
console.log('negativeContext regex:', negativeContext);
console.log('');
console.log('Test:', negativeContext.test(cas9));
console.log('');

if (negativeContext.test(cas9)) {
    console.log('✅ negativeContext MATCHE → Règle 999 IGNORÉE → Règle 90 "Cataracte" devrait s\'appliquer');
} else {
    console.log('❌ negativeContext NE MATCHE PAS → Règle 999 S\'APPLIQUE → "__DONNEES_INSUFFISANTES_CATARACTE__"');
}
