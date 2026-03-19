#!/usr/bin/env npx tsx
import { localExpertAnalysis } from './components/AiAnalyzer';

const text1 = `Agent d'assainissement intervenant dans une cuve de rétention. Inhalation massive de sulfure d'hydrogène (H2S) suite à un défaut de ventilation. Bilan initial : Perte de connaissance, œdème aigu du poumon (OAP) toxique, réanimation intubée-ventilée pendant 7 jours. Séquelles à la consolidation (2 ans) : Syndrome de dysfonctionnement réactif des voies aériennes (maladie asthmatique post-inhalation). Hyperréactivité bronchique sévère nécessitant un traitement par corticoïdes inhalés à forte dose en permanence. Dyspnée d'effort pour des tâches quotidiennes simples.`;

console.log('=== TEST 1: H2S inhalation complète ===');
const r1 = localExpertAnalysis(text1);
console.log('type:', r1.type);
if ('name' in r1) console.log('name:', r1.name);
if ('rate' in r1) console.log('rate:', r1.rate);

const text2 = `asthme professionnel post-inhalation toxique avec hyperréactivité bronchique sévère et dyspnée d'effort`;
console.log('\n=== TEST 2: Asthme professionnel simple ===');
const r2 = localExpertAnalysis(text2);
console.log('type:', r2.type);
if ('name' in r2) console.log('name:', r2.name);
if ('rate' in r2) console.log('rate:', r2.rate);

const text3 = `insuffisance respiratoire chronique post-inhalation de gaz toxique avec dyspnée au moindre effort nécessitant corticothérapie permanente`;
console.log('\n=== TEST 3: IRC post-inhalation ===');
const r3 = localExpertAnalysis(text3);
console.log('type:', r3.type);
if ('name' in r3) console.log('name:', r3.name);
if ('rate' in r3) console.log('rate:', r3.rate);

const text4 = `oedème pulmonaire toxique après inhalation de chlore avec séquelles respiratoires modérées`;
console.log('\n=== TEST 4: OAP toxique chlore ===');
const r4 = localExpertAnalysis(text4);
console.log('type:', r4.type);
if ('name' in r4) console.log('name:', r4.name);
if ('rate' in r4) console.log('rate:', r4.rate);
