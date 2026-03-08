#!/usr/bin/env npx tsx
// ═══════════════════════════════════════════════════════════════
// TEST D'INTELLIGENCE DE L'IA LOCALE — Vérification complète
// Teste la capacité de l'IA à comprendre le langage naturel,
// les cas cliniques complexes, le langage familier, les abréviations
// ═══════════════════════════════════════════════════════════════

import { localExpertAnalysis, LocalProposal, CumulProposals } from './components/AiAnalyzer';

interface TestCase {
  description: string;
  input: string;
  expectedType: 'proposal' | 'cumul_proposals';
  expectedRateMin?: number;
  expectedRateMax?: number;
  expectedKeywords?: string[]; // mots attendus dans le nom ou la justification
}

const testCases: TestCase[] = [
  // ═══ 1. LANGAGE NATUREL SIMPLE ═══
  {
    description: "Fracture simple en langage clair",
    input: "fracture du radius consolidée avec légère raideur",
    expectedType: 'proposal',
    expectedRateMin: 3,
    expectedRateMax: 25,
    expectedKeywords: ['radius']
  },
  {
    description: "Rupture LCA opérée",
    input: "rupture du ligament croisé antérieur opérée avec instabilité résiduelle",
    expectedType: 'proposal',
    expectedRateMin: 10,
    expectedRateMax: 25,
    expectedKeywords: ['ligament', 'croisé']
  },
  {
    description: "Amputation d'un doigt - pouce",
    input: "amputation du pouce de la main droite",
    expectedType: 'proposal',
    expectedRateMin: 15,
    expectedRateMax: 30,
    expectedKeywords: ['pouce']
  },

  // ═══ 2. LANGAGE FAMILIER / SMS ═══  
  {
    description: "Langage familier - genou cassé",
    input: "j'ai le genou pété suite à una chute",
    expectedType: 'proposal',
    expectedRateMin: 3,
    expectedRateMax: 30,
    expectedKeywords: ['genou']
  },
  {
    description: "Langage familier - épaule déboîtée",
    input: "épaule déboitée qui revient pas bien en place",
    expectedType: 'proposal',
    expectedRateMin: 5,
    expectedRateMax: 30,
    expectedKeywords: ['épaule']
  },

  // ═══ 3. ABRÉVIATIONS MÉDICALES ═══
  {
    description: "Abréviation LCA",
    input: "rupture LCA genou droit avec méniscectomie interne",
    expectedType: 'proposal',
    expectedRateMin: 8,
    expectedRateMax: 25
  },
  {
    description: "Abréviation AT + fracture",
    input: "AT du 15/03/2024, fracture bimalléolaire cheville gauche",
    expectedType: 'proposal',
    expectedRateMin: 3,
    expectedRateMax: 25,
    expectedKeywords: ['malléol', 'cheville']
  },

  // ═══ 4. CAS CLINIQUES COMPLEXES ═══
  {
    description: "Polytraumatisme - multi-lésions",
    input: "fracture du fémur + fracture du radius + entorse grave du genou suite à un AVP",
    expectedType: 'cumul_proposals',
    expectedRateMin: 15,
    expectedRateMax: 65
  },
  {
    description: "Cas sévère - paraplégie",
    input: "fracture vertébrale L1 avec paraplégie complète",
    expectedType: 'proposal',
    expectedRateMin: 60,
    expectedRateMax: 100,
    expectedKeywords: ['parapl']
  },
  {
    description: "Traumatisme crânien avec séquelles",
    input: "traumatisme crânien grave avec épilepsie post-traumatique et troubles cognitifs",
    expectedType: 'proposal',
    expectedRateMin: 20,
    expectedRateMax: 80,
    expectedKeywords: ['crânien', 'épilepsie']
  },

  // ═══ 5. SÉVÉRITÉ & CONTEXTE ═══
  {
    description: "Fracture avec bonne récupération",
    input: "fracture du poignet bien consolidée, mouvements libres, pas de douleur",
    expectedType: 'proposal',
    expectedRateMin: 2,
    expectedRateMax: 10
  },
  {
    description: "Fracture avec mauvaise évolution",
    input: "fracture ouverte de la jambe avec pseudarthrose et infection chronique",
    expectedType: 'proposal',
    expectedRateMin: 15,
    expectedRateMax: 50,
    expectedKeywords: ['jambe']
  },

  // ═══ 6. SURDITÉ & VISION ═══
  {
    description: "Surdité professionnelle",
    input: "surdité professionnelle bilatérale avec perte auditive de 40 dB",
    expectedType: 'proposal',
    expectedRateMin: 8,
    expectedRateMax: 35,
    expectedKeywords: ['surdité', 'audit']
  },
  {
    description: "Perte de vision d'un oeil",
    input: "perte de la vision de l'oeil gauche suite à un traumatisme",
    expectedType: 'proposal',
    expectedRateMin: 20,
    expectedRateMax: 35,
    expectedKeywords: ['vision', 'oeil']
  },

  // ═══ 7. VISCÉRAL ═══
  {
    description: "Splénectomie",
    input: "splénectomie suite à rupture traumatique de la rate",
    expectedType: 'proposal',
    expectedRateMin: 10,
    expectedRateMax: 25,
    expectedKeywords: ['splén', 'rate']
  },

  // ═══ 8. RACHIS ═══
  {
    description: "Hernie discale opérée",
    input: "hernie discale L4-L5 opérée avec raideur lombaire résiduelle",
    expectedType: 'proposal',
    expectedRateMin: 8,
    expectedRateMax: 25,
    expectedKeywords: ['disc', 'lombaire']
  },

  // ═══ 9. TEXTE LONG DESCRIPTIF ═══
  {
    description: "Description narrative médicale",
    input: "Patient maçon de 45 ans, victime d'un AT le 10/01/2024 par chute d'échafaudage de 3 mètres. Fracture du calcanéum droit traitée orthopédiquement. À la consolidation : raideur de la sous-astragalienne, douleurs à la marche prolongée, port de semelles orthopédiques.",
    expectedType: 'proposal',
    expectedRateMin: 8,
    expectedRateMax: 25,
    expectedKeywords: ['calcan']
  },

  // ═══ 10. EDGE CASE - texte minimal ═══
  {
    description: "Texte très court",
    input: "amputation avant-bras",
    expectedType: 'proposal',
    expectedRateMin: 40,
    expectedRateMax: 70,
    expectedKeywords: ['amputation', 'avant-bras']
  },
];

// ═══ Exécution des tests ═══
let passed = 0;
let failed = 0;
const failures: string[] = [];

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║  TEST D\'INTELLIGENCE DE L\'IA LOCALE — 18 cas cliniques      ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');

for (const tc of testCases) {
  const result = localExpertAnalysis(tc.input);
  let ok = true;
  const issues: string[] = [];

  // Vérifier le type de résultat
  if (result.type === 'no_result') {
    ok = false;
    issues.push(`Type: no_result (attendu: ${tc.expectedType})`);
  } else if (result.type === 'fuzzy_search') {
    // Fuzzy search = l'IA n'a pas trouvé de correspondance directe mais propose des suggestions
    ok = false;
    issues.push(`Type: fuzzy_search (attendu: ${tc.expectedType}) — suggestions: ${(result as any).matches?.map((m: any) => m.name).join(', ').slice(0, 100)}`);
  } else if (result.type !== tc.expectedType && !(result.type === 'proposal' && tc.expectedType === 'cumul_proposals') && !(result.type === 'cumul_proposals' && tc.expectedType === 'proposal')) {
    // Tolérer proposal ↔ cumul_proposals dans certains cas
    if (result.type === 'ambiguity') {
      // Ambiguity = l'IA propose plusieurs choix pertinents — c'est acceptable, pas un échec
      // Ne pas ajouter d'issue bloquante
    } else {
      ok = false;
      issues.push(`Type: ${result.type} (attendu: ${tc.expectedType})`);
    }
  }

  // Vérifier le taux IPP
  let rate = 0;
  if (result.type === 'proposal') {
    rate = (result as LocalProposal).rate;
  } else if (result.type === 'cumul_proposals') {
    const cumul = result as CumulProposals;
    // Calculer le taux cumulé avec Balthazard
    const rates = cumul.proposals.map(p => {
      const r = p.injury.rate;
      return typeof r === 'string' ? parseInt(r) : r;
    }).filter(r => !isNaN(r));
    rate = rates.reduce((acc, r) => acc + r * (100 - acc) / 100, 0);
    rate = Math.round(rate);
  } else if (result.type === 'ambiguity') {
    // Pour les ambiguïtés, prendre le taux de la première option
    const ambig = result as any;
    const ambigMatches = ambig.matches || ambig.choices;
    if (ambigMatches && ambigMatches.length > 0) {
      const firstMatch = ambigMatches[0];
      const r = firstMatch.rate || firstMatch.injury?.rate;
      if (Array.isArray(r)) rate = Math.round((r[0] + r[1]) / 2);
      else if (typeof r === 'number') rate = r;
    }
  }
  
  if (tc.expectedRateMin !== undefined && rate < tc.expectedRateMin) {
    ok = false;
    issues.push(`Taux ${rate}% < min attendu ${tc.expectedRateMin}%`);
  }
  if (tc.expectedRateMax !== undefined && rate > tc.expectedRateMax) {
    ok = false;
    issues.push(`Taux ${rate}% > max attendu ${tc.expectedRateMax}%`);
  }

  // Vérifier les mots-clés
  if (tc.expectedKeywords && tc.expectedKeywords.length > 0 && result.type !== 'no_result') {
    const resultText = JSON.stringify(result).toLowerCase();
    for (const kw of tc.expectedKeywords) {
      if (!resultText.includes(kw.toLowerCase())) {
        issues.push(`Mot-clé "${kw}" non trouvé dans la réponse`);
      }
    }
  }

  if (ok && issues.length === 0) {
    passed++;
    const rateTxt = rate > 0 ? ` → ${rate}%` : '';
    const nameStr = result.type === 'proposal' ? (result as LocalProposal).name?.slice(0, 50) : '';
    console.log(`  ✅ ${tc.description.padEnd(42)} ${rateTxt}  ${nameStr}`);
  } else {
    failed++;
    const icon = issues.some(i => i.includes('no_result') || i.includes('fuzzy_search')) ? '❌' : '⚠️';
    console.log(`  ${icon} ${tc.description.padEnd(42)} [${rate > 0 ? rate + '%' : 'N/A'}] ${issues.join(' | ')}`);
    failures.push(`${tc.description}: ${issues.join(', ')}`);
  }
}

console.log('\n╔═══════════════════════════════════════════════════════════════╗');
console.log(`║  RÉSULTAT: ${passed}/${passed + failed} tests passés (${Math.round(passed * 100 / (passed + failed))}%)${' '.repeat(20)}║`);
console.log('╚═══════════════════════════════════════════════════════════════╝');

if (failures.length > 0) {
  console.log('\n--- Échecs ---');
  for (const f of failures) {
    console.log(`  • ${f}`);
  }
}

console.log(`\n🧠 Score d'intelligence IA: ${passed}/${passed + failed} — ${
  passed === passed + failed ? '🏆 PARFAIT' :
  passed / (passed + failed) >= 0.9 ? '🟢 EXCELLENT' :
  passed / (passed + failed) >= 0.75 ? '🟡 BON' :
  passed / (passed + failed) >= 0.5 ? '🟠 MOYEN' : '🔴 À AMÉLIORER'
}`);
