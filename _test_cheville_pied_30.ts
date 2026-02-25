// Test 30 cas : traumatismes de la cheville et du pied (V3.3.312)
import { localExpertAnalysis } from './components/AiAnalyzer';

interface TestCase {
  input: string;
  expectedName: string;       // Regex partiel sur le nom barème
  expectedMinRate: number;
  expectedMaxRate: number;
  description: string;
}

const testCases: TestCase[] = [
  // ============================================================
  // CHEVILLE - FRACTURES (cas 1-8)
  // ============================================================
  {
    // Cas 1 : Fracture malléole externe - bonne consolidation
    input: "fracture de la malléole externe de la cheville droite par mécanisme d'inversion traitée par immobilisation plâtrée avec consolidation radiologique obtenue à 6 semaines et douleurs résiduelles modérées à la marche prolongée et au terrain irrégulier avec gêne minime au chaussage",
    expectedName: "fracture.*mall[eé]ol",
    expectedMinRate: 3,
    expectedMaxRate: 20,
    description: "Fracture malléole externe - bonne consolidation"
  },
  {
    // Cas 2 : Fracture bi-malléolaire avec raideur modérée
    input: "fracture bi-malléolaire de la cheville gauche traitée chirurgicalement par ostéosynthèse par plaque et vis avec raideur séquellaire modérée de la cheville et limitation de la flexion dorsale à 5 degrés et douleurs chroniques à la marche avec nécessité de port de chaussures montantes et semelles orthopédiques",
    expectedName: "fracture.*mall[eé]ol.*raideur|mall[eé]ol.*raideur.*mod[eé]r[eé]|raideur.*cheville.*post.*mall[eé]ol",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Fracture bi-malléolaire - raideur modérée"
  },
  {
    // Cas 3 : Fracture bi-malléolaire avec cal vicieux et troubles trophiques
    input: "fracture bi-malléolaire de la cheville droite avec cal vicieux important et déformation en valgus de l'arrière-pied et troubles trophiques avec œdème chronique et raideur sévère de la cheville et boiterie importante et nécessité de canne pour la marche au-delà de 100 mètres et impossibilité de chaussage normal",
    expectedName: "fracture.*mall[eé]ol.*cal.*vicieux|mall[eé]ol.*d[eé]formation|mall[eé]ol.*troubles.*trophiques",
    expectedMinRate: 20,
    expectedMaxRate: 35,
    description: "Fracture bi-malléolaire - cal vicieux + troubles trophiques"
  },
  {
    // Cas 4 : Fracture du pilon tibial
    input: "fracture du pilon tibial de la cheville gauche suite à une chute de grande hauteur traitée chirurgicalement par ostéosynthèse par plaque avec raideur importante séquellaire de l'articulation tibio-tarsienne et arthrose post-traumatique et douleurs chroniques invalidantes à la marche et boiterie résiduelle avec périmètre de marche limité à 200 mètres",
    expectedName: "fracture.*pilon.*tibial|pilon.*tibial",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Fracture du pilon tibial"
  },
  {
    // Cas 5 : Fracture malléole interne isolée - bonne consolidation
    input: "fracture de la malléole interne de la cheville gauche par torsion traitée par vis de fixation avec consolidation radiologique à 8 semaines et douleurs résiduelles légères à la palpation et gêne minime à la marche sur terrain accidenté sans limitation fonctionnelle significative",
    expectedName: "fracture.*mall[eé]ol",
    expectedMinRate: 3,
    expectedMaxRate: 20,
    description: "Fracture malléole interne - bonne consolidation"
  },
  {
    // Cas 6 : Fracture tri-malléolaire (équivalent bi-mall sévère)
    input: "fracture tri-malléolaire de la cheville droite avec luxation tibio-tarsienne réduite en urgence puis traitée par ostéosynthèse avec séquelles importantes raideur majeure de la cheville et douleurs chroniques à la marche et œdème résiduel et boiterie marquée avec canne nécessaire pour les longs trajets",
    expectedName: "fracture.*mall[eé]ol.*raideur|mall[eé]ol.*cal.*vicieux|raideur.*cheville.*post.*mall[eé]ol|raideur.*important.*cheville",
    expectedMinRate: 12,
    expectedMaxRate: 35,
    description: "Fracture tri-malléolaire avec séquelles sévères"
  },
  {
    // Cas 7 : Fracture malléole externe + entorse LLE (bimalléolaire équivalent)
    input: "fracture de la malléole péronière de la cheville droite avec lésion du ligament latéral externe traitée par ostéosynthèse avec consolidation obtenue mais persistance d'une instabilité résiduelle de la cheville et douleurs à la marche prolongée et entorses récidivantes nécessitant le port d'une chevillère",
    expectedName: "fracture.*mall[eé]ol|instabilit[eé].*chronique.*cheville|mall[eé]ol.*consolid",
    expectedMinRate: 3,
    expectedMaxRate: 20,
    description: "Fracture malléole péronière + instabilité résiduelle"
  },
  {
    // Cas 8 : Fracture bimalléolaire opérée - cal vicieux péronier
    input: "fracture bimalléolaire de la cheville gauche opérée par double ostéosynthèse avec consolidation en cal vicieux péronier et diastasis tibio-péronier inférieur résiduel et raideur modérée de la cheville et douleurs à la descente des escaliers et gêne au chaussage avec nécessité de semelles orthopédiques",
    expectedName: "fracture.*mall[eé]ol.*raideur|mall[eé]ol.*cal.*vicieux",
    expectedMinRate: 10,
    expectedMaxRate: 35,
    description: "Fracture bimalléolaire - cal vicieux péronier"
  },
  // ============================================================
  // CHEVILLE - RAIDEURS ET ANKYLOSES (cas 9-16)
  // ============================================================
  {
    // Cas 9 : Ankylose de la cheville en bonne position (angle droit)
    input: "ankylose de la cheville droite en position à angle droit séquellaire d'une fracture du pilon tibial avec absence totale de mobilité de l'articulation tibio-tarsienne et adaptation de la marche par compensation du genou et de la hanche et port de chaussures orthopédiques adaptées",
    expectedName: "ankylose.*cheville|cheville.*ankylos[eé]",
    expectedMinRate: 20,
    expectedMaxRate: 30,
    description: "Ankylose cheville en bonne position (angle droit)"
  },
  {
    // Cas 10 : Ankylose de la cheville en équin
    input: "ankylose de la cheville gauche en position vicieuse en équin séquellaire d'une fracture ouverte du pilon tibial avec impossibilité de poser le talon au sol et marche sur la pointe du pied et boiterie importante avec nécessité de compensation par chaussure orthopédique à semelle basculante",
    expectedName: "ankylose.*cheville|cheville.*ankylos[eé]|[eé]quin",
    expectedMinRate: 20,
    expectedMaxRate: 35,
    description: "Ankylose cheville en équin (position vicieuse)"
  },
  {
    // Cas 11 : Raideur modérée de la cheville
    input: "raideur modérée de la cheville droite séquellaire d'une fracture malléolaire avec limitation de la flexion dorsale à 10 degrés et flexion plantaire conservée à 30 degrés et douleurs modérées à la marche prolongée sur terrain irrégulier et gêne à la course",
    expectedName: "raideur.*mod[eé]r[eé].*cheville|raideur.*cheville|fracture.*mall[eé]ol.*raideur",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Raideur modérée de la cheville post-fracture"
  },
  {
    // Cas 12 : Raideur importante de la cheville
    input: "raideur importante de la cheville gauche séquellaire d'une fracture du pilon tibial avec limitation sévère de la flexion dorsale et plantaire et claudication à la marche avec nécessité d'utilisation d'une canne pour les longs trajets et impossibilité de descendre les escaliers normalement",
    expectedName: "raideur.*important.*cheville|raideur.*s[eé]v[eè]r.*cheville|pilon.*tibial",
    expectedMinRate: 12,
    expectedMaxRate: 40,
    description: "Raideur importante de la cheville post-pilon tibial"
  },
  {
    // Cas 13 : Instabilité chronique de la cheville (séquelle d'entorse)
    input: "instabilité chronique de la cheville droite séquellaire d'une entorse grave du ligament latéral externe avec entorses à répétition documentées et testing en varus positif et dérobement de la cheville sur terrain irrégulier et nécessité de port d'une chevillère en permanence et début d'arthrose tibio-tarsienne sur les radiographies",
    expectedName: "instabilit[eé].*chronique.*cheville|cheville.*séquelle.*entorse|entorse.*cheville",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Instabilité chronique cheville - séquelle entorse grave"
  },
  {
    // Cas 14 : Entorse cheville bénigne avec laxité résiduelle
    input: "entorse bénigne de la cheville gauche par inversion avec laxité résiduelle légère documentée à l'examen clinique et douleurs occasionnelles à la marche sur terrain accidenté et gêne minime au sport sans entorses récidivantes depuis le traumatisme initial",
    expectedName: "instabilit[eé].*chronique.*cheville|entorse.*cheville|raideur.*cheville",
    expectedMinRate: 3,
    expectedMaxRate: 15,
    description: "Entorse cheville bénigne - laxité résiduelle légère"
  },
  {
    // Cas 15 : Arthrodèse tibio-talienne en bonne position
    input: "arthrodèse tibio-talienne de la cheville droite réalisée pour arthrose tibio-tarsienne sévère post-fracture du pilon tibial avec fusion obtenue en bonne position fonctionnelle à angle droit et douleurs résiduelles modérées et impossibilité de courir et gêne à la descente des escaliers mais marche quotidienne possible",
    expectedName: "arthrod[eè]se.*tibio.*talienne|arthrod[eè]se.*cheville|ankylose.*cheville",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Arthrodèse tibio-talienne en bonne position"
  },
  {
    // Cas 16 : Raideur cheville + sous-astragalienne
    input: "raideur combinée de la cheville et de l'articulation sous-astragalienne du pied gauche séquellaire d'une fracture du calcanéum avec enfoncement thalamique et limitation sévère de l'inversion et éversion du pied et limitation de la flexion dorsale et claudication à la marche sur terrain irrégulier",
    expectedName: "raideur.*cheville.*sous.*astragal|raideur.*cheville|fracture.*calcan[eé]um",
    expectedMinRate: 8,
    expectedMaxRate: 30,
    description: "Raideur cheville + sous-astragalienne post-calcanéum"
  },
  // ============================================================
  // CHEVILLE - ÉQUINISMES ET PATHOLOGIES SPÉCIFIQUES (cas 17-20)
  // ============================================================
  {
    // Cas 17 : Équinisme modéré de la cheville
    input: "équinisme modéré de la cheville droite séquellaire d'une fracture du pilon tibial avec raccourcissement du tendon d'Achille et limitation de la dorsiflexion à 5 degrés et marche en équin léger avec nécessité de talonnette compensatrice et douleurs à la montée des escaliers",
    expectedName: "[eé]quin.*cheville|[eé]quinisme|raideur.*cheville|pilon.*tibial",
    expectedMinRate: 5,
    expectedMaxRate: 40,
    description: "Équinisme modéré de la cheville"
  },
  {
    // Cas 18 : Triple arthrodèse (tibio-talienne + médio-talienne + sous-talienne)
    input: "triple arthrodèse cheville et arrière-pied gauche associant arthrodèse tibio-talienne et médio-talienne et sous-talienne réalisée pour séquelles complexes de fracture luxation du tarse avec fusion complète des trois articulations et raideur majeure et douleurs résiduelles et boiterie importante et périmètre de marche limité à 500 mètres",
    expectedName: "triple.*arthrod[eè]se|arthrod[eè]se.*tibio.*talienne.*m[eé]dio|ankylose.*cheville",
    expectedMinRate: 15,
    expectedMaxRate: 30,
    description: "Triple arthrodèse cheville et arrière-pied"
  },
  {
    // Cas 19 : Équinisme sévère nécessitant appareillage
    input: "équinisme sévère de la cheville gauche séquellaire d'une paralysie du nerf sciatique poplité externe avec pied tombant et impossibilité de dorsiflexion active et nécessité de port permanent d'un releveur dynamique de pied et marche avec steppage résiduel malgré l'appareillage",
    expectedName: "[eé]quinisme|raideur.*cheville|paralysie.*nerf.*sciatique|pied.*tombant|relev.*pied|steppage",
    expectedMinRate: 5,
    expectedMaxRate: 30,
    description: "Équinisme sévère - appareillage (releveur de pied)"
  },
  {
    // Cas 20 : Raideur cheville post-bimalléolaire avec claudication
    input: "raideur de la cheville droite post-fracture bimalléolaire avec claudication persistante à la marche et limitation de la flexion dorsale à 0 degré et douleurs chroniques au déroulement du pas et boiterie visible et gêne à toutes les activités de la vie quotidienne et port de chaussures orthopédiques obligatoire",
    expectedName: "raideur.*cheville.*post.*bimall[eé]ol.*claudication|raideur.*cheville|fracture.*mall[eé]ol.*raideur",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Raideur cheville post-bimalléolaire + claudication"
  },
  // ============================================================
  // PIED - CAS COMPLÉMENTAIRES (cas 21-26)
  // ============================================================
  {
    // Cas 21 : Fracture calcanéum avec ostéoarthrite sous-talienne
    input: "fracture du calcanéum droit avec tassement de l'angle de Böhler traitée orthopédiquement avec ostéoarthrite sous-talienne séquellaire et douleurs importantes à l'appui talonnier et élargissement du talon avec conflit calcanéo-péronier et boiterie à la marche et port de chaussures orthopédiques avec semelles amortissantes",
    expectedName: "fracture.*calcan[eé]um|calcan[eé]um.*douleur",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Fracture calcanéum avec ostéoarthrite sous-talienne"
  },
  {
    // Cas 22 : Fracture astragale avec nécrose avasculaire
    input: "fracture de l'astragale du pied gauche compliquée de nécrose avasculaire partielle du corps de l'astragale avec douleurs chroniques de la cheville et du pied et raideur tibio-tarsienne et limitation de la marche et arthrose tibio-astragalienne évolutive sur les radiographies de contrôle",
    expectedName: "fracture.*astragale|astragale.*talus|astragale.*n[eé]crose",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Fracture astragale avec nécrose avasculaire"
  },
  {
    // Cas 23 : Rupture tendon d'Achille opérée avec séquelles importantes
    input: "rupture du tendon d'Achille droit traitée chirurgicalement par suture mais avec allongement résiduel du tendon et perte de force significative en flexion plantaire et impossibilité de se mettre sur la pointe du pied et boiterie résiduelle et douleurs chroniques du talon et du mollet avec amyotrophie du triceps sural",
    expectedName: "rupture.*tendon.*achille|achille.*s[eé]quelle|tendon.*achille",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Rupture tendon Achille opérée - séquelles importantes"
  },
  {
    // Cas 24 : Entorse grave cheville + instabilité + arthrose débutante
    input: "entorse grave de la cheville droite avec rupture du faisceau antérieur du ligament latéral externe traitée fonctionnellement avec instabilité chronique résiduelle et entorses à répétition et douleurs chroniques et arthrose tibio-tarsienne débutante au stade 2 sur les radiographies en charge et nécessité de chevillère permanente",
    expectedName: "instabilit[eé].*chronique.*cheville|entorse.*cheville|arthrose.*cheville",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Entorse grave cheville - instabilité + arthrose débutante"
  },
  {
    // Cas 25 : Luxation sous-talienne avec séquelles
    input: "luxation sous-talienne du pied droit réduite en urgence sous anesthésie générale avec séquelles à type de raideur de l'articulation sous-astragalienne et douleurs chroniques à l'inversion et éversion du pied et gêne à la marche sur terrain irrégulier et port de chaussures orthopédiques avec semelles moulées",
    expectedName: "raideur.*cheville|ankylose.*tarse|raideur.*sous.*astragal|fracture.*calcan[eé]um|luxation",
    expectedMinRate: 5,
    expectedMaxRate: 25,
    description: "Luxation sous-talienne avec raideur séquellaire"
  },
  {
    // Cas 26 : Fracture du scaphoïde tarsien (naviculaire) avec pied plat
    input: "fracture du scaphoïde tarsien du pied gauche consolidée avec affaissement de la voûte plantaire et pied plat post-traumatique et douleurs à la marche prolongée et métatarsalgies et nécessité de semelles orthopédiques avec soutien de voûte et gêne au chaussage et au sport",
    expectedName: "pied.*plat|pied.*creux|scapho[ïi]de|ankylose.*tarse|fracture.*calcan[eé]um",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Fracture scaphoïde tarsien + pied plat séquellaire"
  },
  // ============================================================
  // PATHOLOGIES COMBINÉES CHEVILLE-PIED (cas 27-30)
  // ============================================================
  {
    // Cas 27 : Fracture pilon tibial + ankylose sous-talienne
    input: "fracture du pilon tibial de la cheville droite avec enfoncement articulaire traitée par ostéosynthèse avec arthrose tibio-tarsienne sévère et ankylose sous-talienne secondaire et raideur majeure de l'arrière-pied et douleurs chroniques invalidantes et marche avec canne obligatoire et périmètre de marche limité à 100 mètres",
    expectedName: "fracture.*pilon.*tibial|ankylose.*cheville|raideur.*important.*cheville",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Fracture pilon tibial + ankylose sous-talienne"
  },
  {
    // Cas 28 : Algodystrophie du pied post-fracture
    input: "algodystrophie du pied et de la cheville gauche séquellaire d'une fracture malléolaire avec syndrome douloureux régional complexe de type 1 et œdème chronique du pied et troubles vasomoteurs et raideur globale de la cheville et du pied et allodynie au contact et douleurs au repos et à la mise en charge",
    expectedName: "algodystrophie|syndrome.*douloureux.*r[eé]gional|SDRC|fracture.*mall[eé]ol|raideur.*cheville",
    expectedMinRate: 5,
    expectedMaxRate: 35,
    description: "Algodystrophie pied et cheville post-fracture"
  },
  {
    // Cas 29 : Fracture malléolaire + rupture ligamentaire opérée
    input: "fracture de la malléole péronière de la cheville gauche associée à une rupture du ligament deltoïdien traitée par ostéosynthèse de la malléole et suture ligamentaire avec raideur modérée résiduelle de la cheville et douleurs chroniques à la marche prolongée et au sport et léger œdème résiduel vespéral",
    expectedName: "fracture.*mall[eé]ol.*raideur|mall[eé]ol.*raideur.*mod[eé]r[eé]|raideur.*cheville",
    expectedMinRate: 8,
    expectedMaxRate: 25,
    description: "Fracture malléolaire + rupture ligament deltoïdien"
  },
  {
    // Cas 30 : Amputation type Syme (désarticulation cheville)
    input: "désarticulation tibio-tarsienne de type Syme de la cheville droite suite à un écrasement grave du pied par engin de chantier avec moignon bien cicatrisé et adapté à un appareillage prothétique permettant la déambulation avec aide d'une canne et douleurs résiduelles du moignon",
    expectedName: "d[eé]sarticulation.*cheville|d[eé]sarticulation.*tibio|amputation.*cheville",
    expectedMinRate: 35,
    expectedMaxRate: 50,
    description: "Désarticulation cheville (Syme)"
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
