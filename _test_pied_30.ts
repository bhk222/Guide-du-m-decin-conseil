// Test 30 cas : traumatismes du pied (V3.3.310)
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
  // FRACTURES DU PIED (cas 1-8)
  // ============================================================
  {
    // Cas 1 : Fracture calcanéum unilatérale - douleurs modérées
    input: "fracture du calcanéum droit par chute d'une hauteur de 2 mètres traitée orthopédiquement avec douleurs résiduelles à l'appui talonnier et nécessité de port de semelles orthopédiques avec amortissement du talon et gêne modérée à la marche prolongée au-delà de 500 mètres",
    expectedName: "fracture.*calcan[eé]um|calcan[eé]um.*douleur",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Fracture calcanéum - douleurs modérées"
  },
  {
    // Cas 2 : Fracture calcanéum sévère avec arthrodèse
    input: "fracture comminutive du calcanéum gauche avec enfoncement thalamique traitée chirurgicalement par ostéosynthèse puis arthrodèse sous-astragalienne secondaire devant une arthrose sous-talienne invalidante avec douleurs permanentes à la marche et boiterie et périmètre de marche limité à 200 mètres",
    expectedName: "fracture.*calcan[eé]um|calcan[eé]um.*douleur|arthrod[eè]se.*sous",
    expectedMinRate: 8,
    expectedMaxRate: 30,
    description: "Fracture calcanéum sévère + arthrodèse sous-astragalienne"
  },
  {
    // Cas 3 : Fracture calcanéum bilatérale
    input: "fracture bilatérale des calcanéums par défenestration du 3ème étage traitée orthopédiquement avec séquelles douloureuses bilatérales importantes à chaque appui talonnier et boiterie bilatérale et impossibilité de station debout prolongée et nécessité de chaussures orthopédiques adaptées avec semelles amortissantes",
    expectedName: "fracture.*calcan[eé]um.*bilat[eé]ral|calcan[eé]um.*bilat[eé]ral",
    expectedMinRate: 20,
    expectedMaxRate: 45,
    description: "Fracture calcanéum bilatérale"
  },
  {
    // Cas 4 : Fracture de l'astragale avec cal vicieux
    input: "fracture de l'astragale du pied droit suite à un accident de la voie publique traitée par ostéosynthèse avec consolidation en cal vicieux et douleurs importantes à la mobilisation de la cheville et limitation de la flexion dorsale et plantaire et arthrose tibio-astragalienne débutante sur les radiographies de contrôle",
    expectedName: "fracture.*astragale|astragale.*cal.*vicieux|talus",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Fracture astragale avec cal vicieux"
  },
  {
    // Cas 5 : Fracture du 5ème métatarsien
    input: "fracture de la base du 5ème métatarsien du pied gauche traitée par immobilisation plâtrée avec consolidation radiologique obtenue à 8 semaines et douleurs résiduelles à la marche sur terrain irrégulier et au chaussage avec gêne modérée à l'appui sur le bord externe du pied",
    expectedName: "fracture.*m[eé]tatars|m[eé]tatars.*douleur",
    expectedMinRate: 3,
    expectedMaxRate: 10,
    description: "Fracture 5ème métatarsien - douleurs résiduelles"
  },
  {
    // Cas 6 : Fractures multiples des métatarsiens
    input: "fractures des 2ème 3ème et 4ème métatarsiens du pied droit par écrasement par un objet lourd traitées par ostéosynthèse par broches avec douleurs chroniques de l'avant-pied à la marche et modification des appuis plantaires avec métatarsalgies et nécessité de semelles orthopédiques et gêne au chaussage",
    expectedName: "fracture.*m[eé]tatars|m[eé]tatars.*douleur|appuis.*plantaires",
    expectedMinRate: 3,
    expectedMaxRate: 15,
    description: "Fractures multiples métatarsiens + métatarsalgies"
  },
  {
    // Cas 7 : Luxation-fracture de Lisfranc
    input: "luxation fracture de l'interligne de Lisfranc du pied gauche traitée chirurgicalement par réduction et ostéosynthèse par vis avec raideur séquellaire de l'avant-pied et douleurs chroniques à la marche et arthrose tarso-métatarsienne sur les radiographies et nécessité de chaussures orthopédiques",
    expectedName: "lisfranc|tarso.*m[eé]tatars|ankylose.*tarso|arthrod[eè]se.*tarso",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Luxation-fracture de Lisfranc"
  },
  {
    // Cas 8 : Fracture du scaphoïde tarsien (naviculaire)
    input: "fracture du scaphoïde tarsien du pied droit consolidée après immobilisation par botte plâtrée de 3 mois avec douleurs résiduelles à la marche prolongée et au passage du pas et raideur de l'articulation médio-tarsienne et nécessité de semelles orthopédiques avec soutien de voûte",
    expectedName: "ankylose.*tarse|articulation.*tarse|pied.*plat|pied.*creux|scapho[ïi]de|fracture.*calcan[eé]um|m[eé]dio.*tarsien",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Fracture scaphoïde tarsien + raideur médio-tarsienne"
  },
  // ============================================================
  // TENDONS DU PIED (cas 9-12)
  // ============================================================
  {
    // Cas 9 : Rupture tendon d'Achille - bonne récupération
    input: "rupture du tendon d'Achille gauche opérée par suture chirurgicale avec bonne cicatrisation et récupération fonctionnelle satisfaisante avec légère diminution de la force en flexion plantaire et douleurs résiduelles minimes à la palpation du tendon et reprise de la marche normale sans boiterie",
    expectedName: "rupture.*tendon.*achille|achille.*s[eé]quelle|tendon.*achille",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Rupture tendon d'Achille - bonne récupération"
  },
  {
    // Cas 10 : Rupture tendon d'Achille - séquelles importantes
    input: "rupture du tendon d'Achille droit ancienne non opérée avec allongement significatif du tendon et perte de force majeure en flexion plantaire et impossibilité de se mettre sur la pointe du pied et boiterie à la marche et douleurs chroniques du talon et du mollet avec amyotrophie du mollet",
    expectedName: "rupture.*tendon.*achille.*non.*op[eé]r|achille.*non.*op[eé]r|tendon.*achille",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Rupture tendon d'Achille non opérée"
  },
  {
    // Cas 11 : Tendinopathie d'Achille chronique
    input: "tendinopathie chronique du tendon d'Achille gauche post-traumatique persistante avec épaississement fusiforme du tendon et douleurs à la palpation et à l'effort et gêne à la course et à la montée des escaliers malgré rééducation prolongée et port de talonnettes",
    expectedName: "tendinopathie.*achille|achille.*chronique|tendon.*achille",
    expectedMinRate: 3,
    expectedMaxRate: 15,
    description: "Tendinopathie d'Achille chronique post-traumatique"
  },
  {
    // Cas 12 : Rupture tendon d'Achille opérée - séquelles modérées
    input: "rupture du tendon d'Achille droit traitée chirurgicalement par suture directe il y a 2 ans avec séquelles résiduelles à type de douleurs à la course et perte de force en flexion plantaire contre résistance et impossibilité de se mettre sur la pointe des pieds du côté atteint et gêne fonctionnelle à la montée des escaliers",
    expectedName: "rupture.*tendon.*achille|achille.*s[eé]quelle|tendon.*achille",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Rupture tendon d'Achille opérée - séquelles modérées"
  },
  // ============================================================
  // PATHOLOGIES TISSUS MOUS (cas 13-15)
  // ============================================================
  {
    // Cas 13 : Aponévrosite plantaire chronique
    input: "aponévrosite plantaire chronique post-traumatique du pied droit avec douleurs talalgiques matinales intenses et dérouillage prolongé et douleurs à la station debout prolongée et à la marche au-delà de 200 mètres avec épine calcanéenne visible sur les radiographies malgré infiltrations et rééducation",
    expectedName: "apon[eé]vrosite.*plantaire|fasciite.*plantaire|talalgie|[eé]pine.*calcan",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Aponévrosite plantaire chronique - épine calcanéenne"
  },
  {
    // Cas 14 : Syndrome du tunnel tarsien
    input: "syndrome du tunnel tarsien du pied gauche post-traumatique avec compression du nerf tibial postérieur après fracture de la malléole interne avec paresthésies plantaires permanentes et brûlures et douleurs neuropathiques à la marche et hypoesthésie de la plante du pied",
    expectedName: "tunnel.*tarsien|nerf.*tibial.*post[eé]rieur|par[eé]sth[eé]sies.*plantaire",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Syndrome tunnel tarsien post-traumatique"
  },
  {
    // Cas 15 : Hyperkératose plantaire avec troubles des appuis
    input: "modifications des appuis plantaires du pied droit séquellaires d'une fracture du calcanéum avec hyperkératose douloureuse sous les têtes métatarsiennes et durillons plantaires nécessitant des soins podologiques réguliers et port obligatoire de semelles orthopédiques thermoformées et gêne à la marche pieds nus",
    expectedName: "appuis.*plantaires.*hyperk[eé]ratose|hyperk[eé]ratose|modifications.*appuis|fracture.*calcan[eé]um",
    expectedMinRate: 3,
    expectedMaxRate: 30,
    description: "Hyperkératose plantaire post-fracture calcanéum"
  },
  // ============================================================
  // RAIDEURS ET ANKYLOSES DU PIED (cas 16-21)
  // ============================================================
  {
    // Cas 16 : Ankylose sous-talienne + médio-tarsienne bonne position
    input: "ankylose sous-talienne et médio-tarsienne du pied gauche en bonne position fonctionnelle séquellaire d'une fracture luxation du tarse postérieur avec impossibilité de marcher sur terrain irrégulier et douleurs sur sol accidenté mais marche sur terrain plat correcte et port de chaussures orthopédiques",
    expectedName: "ankylose.*sous.*talienne|ankylose.*m[eé]dio|ankylose.*tarse|ankylose.*arrière.*pied",
    expectedMinRate: 8,
    expectedMaxRate: 20,
    description: "Ankylose sous-talienne + médio-tarsienne en bonne position"
  },
  {
    // Cas 17 : Ankylose articulation du tarse
    input: "ankylose d'une articulation du tarse du pied droit séquellaire d'un traumatisme grave du médio-pied avec raideur complète de l'articulation de Chopart et douleurs chroniques à la marche et impossibilité d'adaptation du pied sur terrain irrégulier et nécessité de semelles orthopédiques",
    expectedName: "ankylose.*articulation.*tarse|ankylose.*tarse|tarse.*ankylose|Chopart",
    expectedMinRate: 10,
    expectedMaxRate: 20,
    description: "Ankylose articulation du tarse"
  },
  {
    // Cas 18 : Pied plat post-traumatique
    input: "pied plat post-traumatique du pied gauche secondaire à une fracture luxation du tarse avec affaissement de la voûte plantaire et valgus de l'arrière-pied et douleurs chroniques à la marche prolongée et fatigue du pied et nécessité de port permanent de semelles orthopédiques avec soutien de voûte",
    expectedName: "pied.*plat|plat.*pied|pied.*creux",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Pied plat post-traumatique"
  },
  {
    // Cas 19 : Pied creux post-traumatique sévère
    input: "pied creux post-traumatique sévère du pied droit suite à des séquelles neurologiques d'une fracture du calcanéum avec griffes des orteils et douleurs plantaires importantes et métatarsalgies et instabilité à la marche et entorses à répétition et port de chaussures orthopédiques avec semelles moulées",
    expectedName: "pied.*creux|pied.*plat|griffes.*orteil",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Pied creux post-traumatique sévère"
  },
  {
    // Cas 20 : Arthrodèse sous-talienne
    input: "arthrodèse sous-talienne du pied gauche réalisée pour arthrose sous-astragalienne sévère post-fracture du calcanéum avec fusion de l'articulation en bonne position et douleurs résiduelles modérées et impossibilité d'inversion et éversion du pied et gêne sur terrain irrégulier",
    expectedName: "arthrod[eè]se.*sous.*talienne|arthrod[eè]se.*sous.*astragal|fusion.*sous",
    expectedMinRate: 8,
    expectedMaxRate: 15,
    description: "Arthrodèse sous-talienne en bonne position"
  },
  {
    // Cas 21 : Hallux rigidus post-traumatique
    input: "hallux rigidus post-traumatique du pied droit après fracture de la 1ère phalange du gros orteil avec raideur de l'articulation métatarso-phalangienne et limitation de la flexion dorsale et douleurs au déroulement du pas et gêne au chaussage notamment avec des chaussures à talons",
    expectedName: "hallux.*rigidus|raideur.*m[eé]tatarso.*phalang|gros.*orteil",
    expectedMinRate: 3,
    expectedMaxRate: 10,
    description: "Hallux rigidus post-traumatique"
  },
  // ============================================================
  // AMPUTATIONS DU PIED (cas 22-27)
  // ============================================================
  {
    // Cas 22 : Amputation du gros orteil
    input: "amputation du gros orteil du pied gauche suite à un écrasement par machine industrielle avec moignon bien cicatrisé et douleurs résiduelles à l'appui antérieur du pied et modification de la marche avec perte de la propulsion du pas",
    expectedName: "amputation.*gros.*orteil|gros.*orteil.*amputation",
    expectedMinRate: 5,
    expectedMaxRate: 12,
    description: "Amputation du gros orteil"
  },
  {
    // Cas 23 : Amputation de deux orteils
    input: "amputation des 2ème et 3ème orteils du pied droit après écrasement par un objet lourd avec moignons cicatrisés et douleurs métatarsiennes résiduelles et gêne à la marche prolongée et au chaussage avec nécessité de semelles orthopédiques de comblement",
    expectedName: "amputation.*deux.*orteil|amputation.*orteil|orteil.*amputation",
    expectedMinRate: 3,
    expectedMaxRate: 10,
    description: "Amputation de deux orteils (latéraux)"
  },
  {
    // Cas 24 : Amputation de tous les orteils
    input: "amputation de tous les orteils du pied gauche suite à un accident de travail par écrasement par engin de chantier avec douleurs chroniques de l'avant-pied et perte de la propulsion du pas et nécessité de chaussures orthopédiques avec bourrage antérieur et limitation importante du périmètre de marche et boiterie",
    expectedName: "amputation.*tous.*orteil|amputation.*orteil|orteils.*amputation",
    expectedMinRate: 12,
    expectedMaxRate: 20,
    description: "Amputation de tous les orteils"
  },
  {
    // Cas 25 : Amputation transmétatarsienne
    input: "amputation transmétatarsienne du pied droit réalisée après un accident de la voie publique avec écrasement de l'avant-pied appareillée par prothèse de comblement avec douleurs du moignon et nécessité de chaussures orthopédiques adaptées et boiterie résiduelle à la marche",
    expectedName: "amputation.*transm[eé]tatars|amputation.*avant.*pied|amputation.*pied",
    expectedMinRate: 15,
    expectedMaxRate: 25,
    description: "Amputation transmétatarsienne du pied"
  },
  {
    // Cas 26 : Amputation médiotarsienne (Chopart) sans équin
    input: "amputation médiotarsienne type Chopart du pied gauche après écrasement grave par engin lourd avec moignon de bonne qualité talonnier sans déformation en équin appareillé par prothèse adaptée permettant la déambulation avec boiterie résiduelle importante et périmètre de marche limité à 300 mètres",
    expectedName: "amputation.*m[eé]diotars|amputation.*chopart|amputation.*pied",
    expectedMinRate: 20,
    expectedMaxRate: 35,
    description: "Amputation médiotarsienne (Chopart) sans équin"
  },
  {
    // Cas 27 : Amputation d'un orteil autre que gros orteil
    input: "amputation du 4ème orteil du pied droit après fracture ouverte consolidée avec séquelles infectieuses nécessitant l'amputation secondaire avec cicatrice adhérente et douleurs de l'avant-pied et gêne modérée au chaussage",
    expectedName: "amputation.*orteil|orteil.*amputation|amputation.*autre.*orteil",
    expectedMinRate: 1,
    expectedMaxRate: 5,
    description: "Amputation d'un orteil (4ème)"
  },
  // ============================================================
  // LÉSIONS DIVERSES / LAXITÉ / ENTORSE (cas 28-30)
  // ============================================================
  {
    // Cas 28 : Entorse grave du pied (Lisfranc) avec laxité
    input: "entorse grave de l'interligne de Lisfranc du pied droit avec laxité résiduelle chronique documentée sur les clichés en stress et douleurs chroniques de l'avant-pied à la marche et instabilité du médio-pied nécessitant le port de semelles orthopédiques et de chaussures montantes",
    expectedName: "laxit[eé].*pied.*post|laxit[eé].*chronique.*pied|lisfranc|tarso.*m[eé]tatars|entorse",
    expectedMinRate: 3,
    expectedMaxRate: 15,
    description: "Entorse grave Lisfranc avec laxité chronique"
  },
  {
    // Cas 29 : Arthrodèse tarso-métatarsienne (Lisfranc)
    input: "arthrodèse de l'interligne de Lisfranc du pied gauche réalisée après échec du traitement conservateur d'une luxation fracture tarso-métatarsienne avec fusion chirurgicale complète et douleurs résiduelles modérées et raideur de l'avant-pied et gêne au déroulement du pas",
    expectedName: "arthrod[eè]se.*tarso.*m[eé]tatars|arthrod[eè]se.*lisfranc|lisfranc",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Arthrodèse interligne de Lisfranc"
  },
  {
    // Cas 30 : Griffes des orteils post-traumatiques
    input: "griffes des orteils du pied droit post-traumatiques séquellaires d'un syndrome des loges de la jambe avec déformation en griffe fixée des 2ème 3ème et 4ème orteils et douleurs dorsales au contact de la chaussure et durillons plantaires sous les têtes métatarsiennes et gêne au chaussage et à la marche",
    expectedName: "griffes.*orteil|orteil.*griffe|d[eé]formation.*orteil|cal.*vicieux.*m[eé]tatars",
    expectedMinRate: 3,
    expectedMaxRate: 15,
    description: "Griffes des orteils post-traumatiques"
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
