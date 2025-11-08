// Test debug pattern TC grave

const texteCas13 = `Accident travail BTP, chute échafaudage 6 mètres. Traumatisme crânien sévère (Glasgow initial 8), hématome sous-dural évacué chirurgicalement. Consolidation neurologique obtenue mais séquelles à 18 mois : céphalées chroniques quotidiennes EVA 6/10, troubles mémoire antérograde (MMS 24/30), ralentissement psychomoteur, troubles attention, impossibilité reprise poste antérieur, syndrome anxio-dépressif réactionnel traité, épilepsie post-traumatique (2 crises/mois sous traitement).`;

const pattern = /traumatisme.*cr[aâ]nien.*s[eé]v[eè]re|Glasgow.*[3-8]|h[eé]matome.*sous.*dural/i;
const context = /c[eé]phal[eé]|m[eé]moire|cognitif|[eé]pilepsie|MMS/i;

console.log('📝 TEXTE CAS 13:');
console.log(texteCas13);
console.log('\n🔍 TEST PATTERN:');
console.log('Pattern:', pattern);
console.log('Test pattern.test(texte):', pattern.test(texteCas13));

console.log('\n🔍 TEST CONTEXT:');
console.log('Context:', context);
console.log('Test context.test(texte):', context.test(texteCas13));

console.log('\n✅ RÉSULTAT:');
console.log('Les deux conditions matchent:', pattern.test(texteCas13) && context.test(texteCas13));
