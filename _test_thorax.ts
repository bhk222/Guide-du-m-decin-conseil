// Test 10 cas : traumatismes thoraciques (V3.3.292)
import { localExpertAnalysis } from './components/AiAnalyzer';

interface TestCase {
  input: string;
  expectedName: string;       // Regex partiel sur le nom barème
  expectedMinRate: number;
  expectedMaxRate: number;
  description: string;
}

const testCases: TestCase[] = [
  {
    // Cas 1 : Fracture de côtes non compliquée (2-3 côtes)
    input: "fracture de la 7ème et 8ème côte droite suite à une chute de sa hauteur avec douleurs résiduelles à la palpation et à l'inspiration profonde et gêne modérée à l'effort physique sans retentissement sur la fonction respiratoire",
    expectedName: "fracture.*c[oô]tes?.*non.*compliqu[eé]|c[oô]tes?.*g[eê]ne.*nombre",
    expectedMinRate: 2,
    expectedMaxRate: 30,
    description: "Fracture 2 côtes non compliquée"
  },
  {
    // Cas 2 : Fracture du sternum simple
    input: "fracture isolée du sternum survenue lors d'un accident de la voie publique par impact direct contre le volant avec consolidation radiologique obtenue et douleurs résiduelles à la pression sternale et gêne à l'effort physique intense sans déformation visible",
    expectedName: "fracture.*sternum.*simple|sternum.*isol[eé]",
    expectedMinRate: 3,
    expectedMaxRate: 10,
    description: "Fracture isolée du sternum simple"
  },
  {
    // Cas 3 : Fracture du sternum avec enfoncement
    input: "fracture du sternum avec enfoncement significatif suite à un écrasement thoracique par accident de travail avec déformation persistante de la paroi thoracique antérieure et douleurs chroniques à la palpation et à la respiration profonde et dyspnée d'effort modérée",
    expectedName: "fracture.*sternum.*enfoncement|sternum.*enfoncement",
    expectedMinRate: 10,
    expectedMaxRate: 20,
    description: "Fracture du sternum avec enfoncement"
  },
  {
    // Cas 4 : Volet costal mobile (séquelles)
    input: "séquelles de volet costal antérieur gauche après fracture de 4 arcs costaux antérieurs et latéraux avec respiration paradoxale résiduelle et paroi thoracique instable à la palpation et dyspnée d'effort stade II avec EFR montrant un syndrome restrictif modéré avec capacité vitale à 65 pour cent de la théorique et douleurs chroniques intercostales",
    expectedName: "volet.*costal|flail.*chest|s[eé]quelles.*volet",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Séquelles de volet costal mobile"
  },
  {
    // Cas 5 : Hémothorax avec adhérences et rétractions
    input: "hémothorax gauche drainé en urgence après traumatisme thoracique par accident de la voie publique avec séquelles à type d'adhérences pleurales et rétraction thoracique résiduelle visible à la radiographie et douleurs chroniques à l'inspiration profonde et diminution modérée de la capacité respiratoire",
    expectedName: "h[eé]mothorax.*adh[eé]rence|adh[eé]rences.*r[eé]tractions.*thorac",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Hémothorax avec adhérences et rétractions thoraciques"
  },
  {
    // Cas 6 : Fibrose pulmonaire post-traumatique (contusion pulmonaire)
    input: "séquelles de contusion pulmonaire bilatérale après accident de la voie publique avec fibrose pulmonaire post-traumatique objectivée au scanner thoracique et syndrome restrictif à l'EFR avec VEMS à 55 pour cent de la théorique et dyspnée d'effort stade III nécessitant un traitement bronchodilatateur quotidien et limitation importante des activités physiques",
    expectedName: "fibrose.*pulmonaire.*post.*traumat|contusion.*pulmonaire.*fibros|syndrome.*restrictif",
    expectedMinRate: 10,
    expectedMaxRate: 60,
    description: "Fibrose pulmonaire post-traumatique (contusion pulmonaire)"
  },
  {
    // Cas 7 : Névralgie intercostale post-traumatique
    input: "névralgie intercostale droite post-traumatique chronique séquellaire d'une fracture des 5ème et 6ème côtes droites avec douleurs intercostales permanentes irradiant vers le sternum rebelles au traitement antalgique et retentissement sur le sommeil et les activités quotidiennes",
    expectedName: "n[eé]vralgie.*intercostal|intercostale.*post.*traumat",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Névralgie intercostale post-traumatique chronique"
  },
  {
    // Cas 8 : Grand fracas du thorax
    input: "grand fracas du thorax après écrasement par véhicule lourd avec fractures multiples de côtes bilatérales et volet costal postérieur et contusion pulmonaire sévère et drainage thoracique bilatéral prolongé et séquelles respiratoires majeures avec insuffisance respiratoire chronique et dyspnée permanente au moindre effort et VEMS à 40 pour cent de la théorique et oxygénothérapie de déambulation",
    expectedName: "grand.*fracas.*thorax|fracas.*thorax",
    expectedMinRate: 30,
    expectedMaxRate: 50,
    description: "Grand fracas du thorax"
  },
  {
    // Cas 9 : Lobectomie pulmonaire post-traumatique
    input: "lobectomie inférieure droite réalisée en urgence suite à une lacération pulmonaire par fracture de côtes avec insuffisance respiratoire séquellaire modérée et dyspnée d'effort stade II et EFR montrant un VEMS à 60 pour cent de la théorique et limitation des activités physiques intenses",
    expectedName: "lobectomie.*pulmonaire|ablation.*lobe.*poumon|lobectomie",
    expectedMinRate: 25,
    expectedMaxRate: 40,
    description: "Lobectomie pulmonaire post-traumatique"
  },
  {
    // Cas 10 : Contusion myocardique avec troubles du rythme
    input: "séquelles de contusion myocardique après traumatisme thoracique grave par accident de la voie publique avec troubles du rythme cardiaque documentés au Holter ECG à type d'extrasystoles ventriculaires fréquentes et épisodes de tachycardie ventriculaire paroxystique sous traitement anti-arythmique au long cours et fraction d'éjection à 45 pour cent",
    expectedName: "contusion.*myocardique|troubles.*rythme|s[eé]quelles.*contusion.*myocardique",
    expectedMinRate: 15,
    expectedMaxRate: 50,
    description: "Contusion myocardique avec troubles du rythme"
  },
];

// ====== RUNNER ======
async function runTests() {
  let passed = 0;
  let failed = 0;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const result = localExpertAnalysis(tc.input, []);

    const nameRegex = new RegExp(tc.expectedName, 'i');
    let resultName = '';
    let resultRate = 0;
    let resultType = result.type;

    if (result.type === 'proposal') {
      resultName = result.name || (result as any).injury?.name || '';
      resultRate = typeof result.rate === 'number' ? result.rate : (Array.isArray(result.rate) ? Math.round(((result.rate as number[])[0] + (result.rate as number[])[1]) / 2) : 0);
    } else if (result.type === 'cumul_proposals') {
      const proposals = (result as any).proposals || [];
      if (proposals.length > 0) {
        resultName = proposals.map((p: any) => p.injury?.name || p.name || '').join(' + ');
        resultRate = proposals.reduce((sum: number, p: any) => {
          const r = p.injury?.rate;
          return sum + (typeof r === 'number' ? r : (Array.isArray(r) ? Math.round((r[0] + r[1]) / 2) : 0));
        }, 0);
      } else {
        resultName = 'AUCUN';
        resultRate = 0;
      }
    } else {
      resultName = (result as any).text || result.type || 'INCONNU';
      resultRate = 0;
    }

    const nameOk = nameRegex.test(resultName);
    const rateOk = resultRate >= tc.expectedMinRate && resultRate <= tc.expectedMaxRate;
    const ok = nameOk && rateOk;

    if (ok) passed++;
    else failed++;

    console.log(`─── Cas ${i + 1} ───`);
    console.log(`  Description: ${tc.description}`);
    console.log(`  Input     : "${tc.input.substring(0, 120)}..."`);
    console.log(`  Attendu   : ${tc.expectedName} (${tc.expectedMinRate}-${tc.expectedMaxRate}%)`);
    console.log(`  Obtenu    : ${ok ? '✅' : '❌'} ${resultName}`);
    console.log(`  Taux      : ${resultRate}%`);
    console.log(`  Type      : ${resultType}`);
    console.log(`  Nom OK    : ${nameOk ? '✅' : '❌'} | Taux OK: ${rateOk ? '✅' : '❌'}`);
    if (result.type === 'proposal' && (result as any).path) {
      console.log(`  Path      : ${(result as any).path}`);
    }
    if (result.type === 'proposal' && result.justification) {
      console.log(`  Justif    : ${result.justification.substring(0, 200)}...`);
    }
    if (!ok) {
      console.log(`  ⚠️ ANOMALIE: ${!nameOk ? `Nom "${resultName}" ne matche pas "${tc.expectedName}"` : ''}${!nameOk && !rateOk ? ' + ' : ''}${!rateOk ? `Taux ${resultRate}% hors fourchette ${tc.expectedMinRate}-${tc.expectedMaxRate}%` : ''}`);
    }
    console.log('');
  }

  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`  RÉSULTAT GLOBAL : ${passed}/${testCases.length} trouvés | ${failed}/${testCases.length} échoués`);
  console.log('═══════════════════════════════════════════════════════════════');
}

runTests();
