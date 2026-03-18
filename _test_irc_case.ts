import { localExpertAnalysis } from './components/AiAnalyzer';

const text = "Circonstances : Mécanicien écrasé sous la cabine basculante d'un camion poids lourd. Bilan initial : Volet costal bilatéral, contusion pulmonaire bilatérale grave, hémopneumothorax. Syndrome de détresse respiratoire aiguë (SDRA) ayant nécessité une intubation prolongée. Séquelles à la consolidation (18 mois) : Insuffisance respiratoire chronique restrictive sévère (VEMS < 50 %). Dyspnée d'effort invalidante (impossibilité de monter un étage).";

const r = localExpertAnalysis(text, []);
console.log('=== RÉSULTAT ===');
console.log('TYPE:', r.type);
console.log('NAME:', r.name || (r as any).description);
console.log('RATE:', r.rate);
console.log('PATH:', (r as any).path);

// Vérifications
const nameOk = /insuffisance.*respiratoire/i.test(r.name || (r as any).description || '');
const rateOk = typeof r.rate === 'number' && r.rate >= 35 && r.rate <= 48;
console.log(`\nNom IRC: ${nameOk ? '✅' : '❌'}`);
console.log(`Taux [35-48%]: ${rateOk ? '✅' : '❌'}`);
console.log(nameOk && rateOk ? '\n✅ TEST PASSED' : '\n❌ TEST FAILED');
