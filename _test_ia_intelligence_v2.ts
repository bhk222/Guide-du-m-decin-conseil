#!/usr/bin/env npx tsx
// ═══════════════════════════════════════════════════════════════
// TEST D'INTELLIGENCE DE L'IA LOCALE V2 — 43 cas cliniques
// Teste la capacité de l'IA à comprendre le langage naturel,
// les cas cliniques complexes, le langage familier, les abréviations,
// les nerfs, le thorax, les brûlures, l'OCR, le psychiatrique, etc.
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
  // ═══════════════════════════════════════════════════
  // SECTION A — 18 TESTS EXISTANTS (V1)
  // ═══════════════════════════════════════════════════

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

  // ═══════════════════════════════════════════════════
  // SECTION B — 25 NOUVEAUX TESTS (V2)
  // ═══════════════════════════════════════════════════

  // ═══ 11. ABRÉVIATIONS MÉDICALES AVANCÉES ═══
  {
    description: "Abréviation PTH (prothèse hanche)",
    input: "PTH droite sur fracture col fémoral avec boiterie résiduelle",
    expectedType: 'proposal',
    expectedRateMin: 15,
    expectedRateMax: 45,
    expectedKeywords: ['hanche']
  },
  {
    description: "Abréviation PTG (prothèse genou)",
    input: "PTG gauche pour gonarthrose post-traumatique, flexion limitée à 90°",
    expectedType: 'proposal',
    expectedRateMin: 10,
    expectedRateMax: 30,
    expectedKeywords: ['genou']
  },
  {
    description: "Abréviation SDRC (algodystrophie)",
    input: "SDRC de la main droite post-fracture du poignet",
    expectedType: 'proposal',
    expectedRateMin: 8,
    expectedRateMax: 30,
    expectedKeywords: ['algodystrophie']
  },
  {
    description: "Abréviation SPE avec steppage",
    input: "paralysie du SPE droit avec steppage à la marche",
    expectedType: 'proposal',
    expectedRateMin: 10,
    expectedRateMax: 30,
    expectedKeywords: ['sciatique']
  },

  // ═══ 12. LANGAGE PATIENT / SYMPTÔMES IMPLICITES ═══
  {
    description: "Symptômes genou sans diagnostic",
    input: "je peux plus plier le genou, il se bloque quand je descends les escaliers et il gonfle dès que je marche un peu",
    expectedType: 'proposal',
    expectedRateMin: 5,
    expectedRateMax: 25,
    expectedKeywords: ['genou']
  },
  {
    description: "Mal au dos irradiant (sciatique)",
    input: "j'ai mal au dos en permanence, je peux plus me baisser pour ramasser quelque chose par terre et ça me lance dans la jambe droite",
    expectedType: 'proposal',
    expectedRateMin: 5,
    expectedRateMax: 25,
    expectedKeywords: ['lombaire', 'rachis']
  },

  // ═══ 13. COUP DU LAPIN / WHIPLASH ═══
  {
    description: "Coup du lapin classique",
    input: "coup du lapin suite accident auto, cervicalgies persistantes avec raideur cervicale et céphalées",
    expectedType: 'proposal',
    expectedRateMin: 3,
    expectedRateMax: 15,
    expectedKeywords: ['cervical']
  },

  // ═══ 14. THORAX / CÔTES ═══
  {
    description: "Fracture côtes + hémothorax",
    input: "fracture de 5 côtes gauches avec hémothorax drainé, séquelles restrictives persistantes et douleurs thoraciques résiduelles",
    expectedType: 'proposal',
    expectedRateMin: 10,
    expectedRateMax: 35,
    expectedKeywords: ['côt']
  },

  // ═══ 15. NERFS PÉRIPHÉRIQUES ═══
  {
    description: "Paralysie nerf cubital",
    input: "griffe cubitale main gauche par section du nerf cubital au coude",
    expectedType: 'proposal',
    expectedRateMin: 10,
    expectedRateMax: 25,
    expectedKeywords: ['cubital']
  },

  // ═══ 16. MAXILLO-FACIAL ═══
  {
    description: "Fracture mandibulaire",
    input: "fracture mandibulaire traitée par ostéosynthèse avec limitation de l'ouverture buccale à 25 mm et troubles de l'articulé dentaire",
    expectedType: 'proposal',
    expectedRateMin: 5,
    expectedRateMax: 25,
    expectedKeywords: ['mandib', 'mâchoire']
  },

  // ═══ 17. OPHTALMO - CATARACTE ═══
  {
    description: "Cataracte post-traumatique",
    input: "cataracte post-traumatique oeil droit opérée avec implant, acuité visuelle corrigée 6/10",
    expectedType: 'proposal',
    expectedRateMin: 5,
    expectedRateMax: 25,
    expectedKeywords: ['cataracte']
  },

  // ═══ 18. HANCHE / COL FÉMORAL ═══
  {
    description: "Fracture col fémoral + nécrose",
    input: "fracture du col du fémur droit traitée par vissage avec nécrose avasculaire de la tête fémorale",
    expectedType: 'proposal',
    expectedRateMin: 15,
    expectedRateMax: 45,
    expectedKeywords: ['fémur']
  },

  // ═══ 19. ENTORSE CHEVILLE ═══
  {
    description: "Entorse grave cheville + instabilité",
    input: "entorse grave cheville droite avec rupture du ligament latéral externe et instabilité chronique",
    expectedType: 'proposal',
    expectedRateMin: 5,
    expectedRateMax: 15,
    expectedKeywords: ['cheville', 'entorse']
  },

  // ═══ 20. TENDON D'ACHILLE ═══
  {
    description: "Rupture tendon d'Achille",
    input: "rupture du tendon d'Achille gauche suturée avec perte de force en flexion plantaire",
    expectedType: 'proposal',
    expectedRateMin: 5,
    expectedRateMax: 15,
    expectedKeywords: ['achille', 'tendon']
  },

  // ═══ 21. BRÛLURES ═══
  {
    description: "Brûlures avec cicatrices rétractiles",
    input: "brûlures 2ème et 3ème degré de l'avant-bras droit avec cicatrices rétractiles limitant la pronation-supination",
    expectedType: 'proposal',
    expectedRateMin: 5,
    expectedRateMax: 30,
    expectedKeywords: ['brûlure']
  },

  // ═══ 22. OCR / ACCENTS MANQUANTS ═══
  {
    description: "Texte OCR sans accents",
    input: "fracture de la clavicule droite avec sequelles fonctionnelles de l'epaule, abduction limitee a 90 degres",
    expectedType: 'proposal',
    expectedRateMin: 5,
    expectedRateMax: 25,
    expectedKeywords: ['clavicule']
  },
  {
    description: "Fautes d'orthographe médical",
    input: "nefrectomie gauche apres traumatisme abdominal avec rein unique fonctionel",
    expectedType: 'proposal',
    expectedRateMin: 15,
    expectedRateMax: 35,
    expectedKeywords: ['rein']
  },

  // ═══ 23. ENTRÉE TÉLÉGRAPHIQUE ═══
  {
    description: "SMS médecin télégraphique",
    input: "fx bimalléol G + entorse LLE",
    expectedType: 'proposal',
    expectedRateMin: 5,
    expectedRateMax: 20,
    expectedKeywords: ['malléol', 'cheville']
  },

  // ═══ 24. PSYCHIATRIQUE / PTSD ═══
  {
    description: "Stress post-traumatique / PTSD",
    input: "syndrome de stress post-traumatique après accident de travail avec cauchemars récurrents, hypervigilance et évitement",
    expectedType: 'proposal',
    expectedRateMin: 5,
    expectedRateMax: 30,
    expectedKeywords: ['post-traumatique']
  },

  // ═══ 25. TÉTRAPLÉGIE ═══
  {
    description: "Tétraplégie incomplète",
    input: "fracture C5-C6 avec tétraplégie incomplète, récupération partielle des membres supérieurs",
    expectedType: 'proposal',
    expectedRateMin: 60,
    expectedRateMax: 100,
    expectedKeywords: ['tétraplégie', 'quadriplégie']
  },

  // ═══ 26. CANAL CARPIEN ═══
  {
    description: "Canal carpien bilatéral opéré",
    input: "syndrome du canal carpien bilatéral opéré, persistance de paresthésies nocturnes et diminution de la force de préhension",
    expectedType: 'proposal',
    expectedRateMin: 5,
    expectedRateMax: 15,
    expectedKeywords: ['canal carpien']
  },

  // ═══ 27. AMPUTATION ORTEIL ═══
  {
    description: "Amputation gros orteil",
    input: "amputation du gros orteil pied droit suite à un écrasement",
    expectedType: 'proposal',
    expectedRateMin: 5,
    expectedRateMax: 18,
    expectedKeywords: ['orteil']
  },

  // ═══ 28. RAPPORT D'EXPERTISE COMPLET ═══
  {
    description: "Rapport expertise plateau tibial",
    input: "Homme de 32 ans, menuisier, AT du 05/06/2023. Chute de 4m. Bilan initial aux urgences : fracture du plateau tibial droit (Schatzker V), traitée par ostéosynthèse par plaque. Suites compliquées d'une infection de site opératoire traitée par antibiothérapie IV 6 semaines. À l'examen de consolidation : raideur du genou en flexion-extension (0-5-90°), laxité résiduelle en valgus, amyotrophie quadricipitale de 3cm, marche avec une canne.",
    expectedType: 'proposal',
    expectedRateMin: 15,
    expectedRateMax: 45,
    expectedKeywords: ['genou']
  },

  // ═══ 29. LANGAGE POPULAIRE MIXTE ═══
  {
    description: "Langage populaire ostéosynthèse fémur",
    input: "il a eu un clou dans le fémur après l'accident et maintenant la hanche elle tourne pas bien, il boite",
    expectedType: 'proposal',
    expectedRateMin: 10,
    expectedRateMax: 30,
    expectedKeywords: ['hanche', 'boiterie']
  },
];

// ═══ Exécution des tests ═══
let passed = 0;
let failed = 0;
const failures: string[] = [];
const total = testCases.length;

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log(`║  TEST D'INTELLIGENCE DE L'IA LOCALE V2 — ${total} cas cliniques    ║`);
console.log('╚═══════════════════════════════════════════════════════════════╝\n');

for (let i = 0; i < testCases.length; i++) {
  const tc = testCases[i];
  const result = localExpertAnalysis(tc.input);
  let ok = true;
  const issues: string[] = [];

  // Vérifier le type de résultat
  if (result.type === 'no_result') {
    ok = false;
    issues.push(`Type: no_result (attendu: ${tc.expectedType})`);
  } else if (result.type === 'fuzzy_search') {
    ok = false;
    issues.push(`Type: fuzzy_search (attendu: ${tc.expectedType}) — suggestions: ${(result as any).matches?.map((m: any) => m.name).join(', ').slice(0, 100)}`);
  } else if (result.type !== tc.expectedType && !(result.type === 'proposal' && tc.expectedType === 'cumul_proposals') && !(result.type === 'cumul_proposals' && tc.expectedType === 'proposal')) {
    if (result.type === 'ambiguity') {
      // Ambiguity = l'IA propose plusieurs choix pertinents — acceptable
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
    const rates = cumul.proposals.map(p => {
      const r = p.injury.rate;
      return typeof r === 'string' ? parseInt(r) : r;
    }).filter(r => !isNaN(r));
    rate = rates.reduce((acc, r) => acc + r * (100 - acc) / 100, 0);
    rate = Math.round(rate);
  } else if (result.type === 'ambiguity') {
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
    const anyKwFound = tc.expectedKeywords.some(kw => resultText.includes(kw.toLowerCase()));
    if (!anyKwFound) {
      issues.push(`Aucun mot-clé trouvé parmi [${tc.expectedKeywords.join(', ')}]`);
    }
  }

  const caseNum = (i + 1).toString().padStart(2, ' ');
  if (ok && issues.length === 0) {
    passed++;
    const rateTxt = rate > 0 ? ` → ${rate}%` : '';
    const nameStr = result.type === 'proposal' ? (result as LocalProposal).name?.slice(0, 50) : 
                    result.type === 'cumul_proposals' ? `[cumul ${(result as CumulProposals).proposals.length} lésions]` : '';
    console.log(`  ✅ #${caseNum} ${tc.description.padEnd(42)} ${rateTxt}  ${nameStr}`);
  } else {
    failed++;
    const icon = issues.some(i => i.includes('no_result') || i.includes('fuzzy_search')) ? '❌' : '⚠️';
    console.log(`  ${icon} #${caseNum} ${tc.description.padEnd(42)} [${rate > 0 ? rate + '%' : 'N/A'}] ${issues.join(' | ')}`);
    failures.push(`#${caseNum} ${tc.description}: ${issues.join(', ')}`);
  }
}

console.log('\n╔═══════════════════════════════════════════════════════════════╗');
console.log(`║  RÉSULTAT: ${passed}/${total} tests passés (${Math.round(passed * 100 / total)}%)${' '.repeat(24)}║`);
console.log('╚═══════════════════════════════════════════════════════════════╝');

if (failures.length > 0) {
  console.log('\n--- Échecs ---');
  for (const f of failures) {
    console.log(`  • ${f}`);
  }
}

console.log(`\n🧠 Score d'intelligence IA V2: ${passed}/${total} — ${
  passed === total ? '🏆 PARFAIT' :
  passed / total >= 0.9 ? '🟢 EXCELLENT' :
  passed / total >= 0.75 ? '🟡 BON' :
  passed / total >= 0.5 ? '🟠 MOYEN' : '🔴 À AMÉLIORER'
}`);
