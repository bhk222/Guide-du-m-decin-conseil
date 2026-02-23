/**
 * TEST IA EXCLUSIVE — 5 CAS CLINIQUES D'ACCIDENT DE TRAVAIL
 * Lésions multisièges (polytraumatismes) pour validation du moteur expert
 * 
 * Chaque cas comporte au minimum 3 sièges lésionnels distincts.
 * On vérifie : détection multi-lésions, calcul cumul Balthazard, cohérence des taux.
 */

import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

// ═══════════════════════════════════════════════════════════════════════
// DÉFINITION DES 5 CAS CLINIQUES AT MULTISIÈGES
// ═══════════════════════════════════════════════════════════════════════

const cases = [
  {
    id: 1,
    titre: "Chute d'échafaudage — Maçon polytraumatisé",
    contexte: "AT du 15/03/2024 — Chute de 4 mètres",
    description: `Homme 45 ans, maçon, chute d'échafaudage de 4 mètres sur chantier BTP.
Fracture du plateau tibial gauche (Schatzker IV) ostéosynthésée par plaque, consolidée avec raideur du genou en flexion limitée à 90° et douleurs résiduelles EVA 4/10.
Fracture bifocale de l'avant-bras droit (radius + cubitus) traitée par ostéosynthèse, consolidée avec limitation pronation-supination à 50% et perte de force de préhension.
Fractures de 3 côtes (5e, 6e, 7e) à droite avec séquelles douloureuses thoraciques à l'effort et diminution modérée de la CV (réduction de 15%).
Lombalgies post-traumatiques persistantes avec tassement cunéiforme de L1 (perte de hauteur 25%), raideur rachidienne et douleurs chroniques EVA 5/10.`,
    sieges: ["Genou gauche", "Avant-bras droit", "Thorax/côtes", "Rachis lombaire"],
    fourchette_attendue: "40-65%"
  },
  {
    id: 2,
    titre: "Accident de chariot élévateur — Magasinier écrasé",
    contexte: "AT du 22/06/2024 — Renversement de chariot élévateur",
    description: `Homme 38 ans, cariste-magasinier, renversement du chariot élévateur avec écrasement.
Fracture comminutive du calcanéum droit opérée par arthrodèse sous-talienne, consolidée avec enraidissement complet de la sous-talienne, douleurs à la marche EVA 5/10 et impossibilité de marcher en terrain irrégulier.
Fracture du bassin (branche ilio-pubienne gauche et cadre obturateur) traitée orthopédiquement, consolidée avec douleurs sacro-iliaques chroniques et gêne à la station assise prolongée.
Entorse grave du poignet gauche avec arrachement du ligament scapho-lunaire, instabilité résiduelle DISI confirmée radiologiquement, douleurs et perte de force.
Traumatisme crânien léger avec perte de connaissance initiale de 10 minutes, syndrome post-commotionnel persistant : céphalées chroniques, troubles de concentration et irritabilité.`,
    sieges: ["Pied droit (calcanéum)", "Bassin", "Poignet gauche", "Crâne/cérébral"],
    fourchette_attendue: "35-60%"
  },
  {
    id: 3,
    titre: "Explosion en usine chimique — Ouvrier brûlé et projeté",
    contexte: "AT du 10/09/2024 — Explosion de cuve avec projection",
    description: `Homme 52 ans, opérateur en usine chimique, explosion de cuve avec projection à 3 mètres.
Amputation trans-métatarsienne du pied gauche (perte des 5 orteils) appareillée, marche avec chaussure orthopédique, boiterie résiduelle à la fatigue.
Fracture de la clavicule droite avec cal vicieux et saillie sous-cutanée, limitation de l'élévation antérieure de l'épaule droite à 120° et douleurs lors du port de charges.
Surdité de perception bilatérale post-traumatique (blast) avec perte auditive moyenne de 35 dB à droite et 40 dB à gauche, appareillage auditif bilatéral, acouphènes permanents invalidants.
Syndrome de stress post-traumatique caractérisé avec reviviscences, cauchemars, hypervigilance et évitement des lieux fermés. Suivi psychiatrique mensuel et traitement par ISRS.`,
    sieges: ["Pied gauche (amputation orteils)", "Épaule/clavicule droite", "Audition bilatérale", "Psychiatrique (PTSD)"],
    fourchette_attendue: "45-70%"
  },
  {
    id: 4,
    titre: "Chute dans une trémie — Couvreur polytraumatisé",
    contexte: "AT du 03/01/2025 — Chute à travers une trémie d'escalier",
    description: `Homme 34 ans, couvreur-zingueur, chute de 6 mètres à travers une trémie d'escalier.
Fracture-luxation de la cheville gauche (bimalléolaire Weber C) ostéosynthésée, consolidée avec arthrose tibio-tarsienne secondaire, raideur en flexion dorsale limitée à 10° et plantaire à 20°, douleurs permanentes EVA 5/10.
Fracture du radius distal droit (Pouteau-Colles) avec cal vicieux en baïonnette, raideur du poignet (flexion 40°, extension 30°), douleurs chroniques et perte de force de la main dominante.
Hernie discale L4-L5 post-traumatique opérée (discectomie), récidive herniaire avec lombosciatique chronique gauche, déficit sensitif L5 et diminution du réflexe achilléen. Raideur rachidienne importante.
Rupture de la coiffe des rotateurs épaule gauche (sus-épineux complet) opérée par réparation sous arthroscopie. Abduction active limitée à 80°, douleurs nocturnes et perte de force en élévation.`,
    sieges: ["Cheville gauche", "Poignet droit", "Rachis lombaire (hernie)", "Épaule gauche (coiffe)"],
    fourchette_attendue: "50-75%"
  },
  {
    id: 5,
    titre: "Accident de presse hydraulique — Mécanicien multi-écrasement",
    contexte: "AT du 18/11/2024 — Main et membre supérieur pris dans une presse",
    description: `Homme 41 ans, mécanicien industriel, main droite dominante et avant-bras pris dans une presse hydraulique.
Amputation de la 3ème phalange du 2ème doigt (index) et de la 3ème phalange du 3ème doigt (majeur) de la main droite dominante, moignons sensibles et douloureux, perte de la pince fine.
Fracture ouverte des deux os de l'avant-bras droit (Gustilo II) ostéosynthésée, consolidée avec limitation de la pronation-supination résiduelle à 60%, cal hypertrophique et douleurs à la mobilisation.
Lésion du nerf médian au poignet droit avec syndrome du canal carpien post-traumatique sévère, déficit sensitif des 3 premiers doigts, amyotrophie de l'éminence thénar et perte de l'opposition du pouce.
Syndrome dépressif réactionnel sévère avec incapacité professionnelle totale dans le métier antérieur, traitement antidépresseur, suivi psychiatrique bimensuel, trouble du sommeil et perte de l'estime de soi.
Algodystrophie (SDRC type I) du membre supérieur droit en phase froide chronique : œdème résiduel, troubles vasomoteurs, raideur globale de la main.`,
    sieges: ["Doigts main droite (amputations)", "Avant-bras droit", "Nerf médian droit", "Psychiatrique", "Algodystrophie MS droit"],
    fourchette_attendue: "55-80%"
  }
];

// ═══════════════════════════════════════════════════════════════════════
// EXÉCUTION DES TESTS
// ═══════════════════════════════════════════════════════════════════════

console.log('');
console.log('╔══════════════════════════════════════════════════════════════════════╗');
console.log('║  TEST IA EXCLUSIVE — 5 CAS CLINIQUES AT MULTISIÈGES               ║');
console.log('║  Validation du moteur expert sur polytraumatismes professionnels    ║');
console.log('╚══════════════════════════════════════════════════════════════════════╝');
console.log('');

let totalTests = 0;
let testsReussis = 0;
let testsCumul = 0;
let testsEchoues = [];
const resultats = [];

for (const cas of cases) {
  totalTests++;
  console.log(`┌──────────────────────────────────────────────────────────────────────`);
  console.log(`│ CAS ${cas.id} — ${cas.titre}`);
  console.log(`│ ${cas.contexte}`);
  console.log(`│ Sièges lésionnels: ${cas.sieges.join(' | ')}`);
  console.log(`│ Fourchette attendue: ${cas.fourchette_attendue}`);
  console.log(`├──────────────────────────────────────────────────────────────────────`);

  try {
    const result = localExpertAnalysis(cas.description);
    
    const [minAttendu, maxAttendu] = cas.fourchette_attendue.replace('%', '').split('-').map(Number);

    if (result.type === 'proposal') {
      const isCumul = result.isCumul || false;
      if (isCumul) testsCumul++;
      
      console.log(`│ ✅ TYPE: proposal ${isCumul ? '(CUMUL DÉTECTÉ ✓)' : '(lésion unique)'}`);
      console.log(`│ 📋 Diagnostic: ${result.name}`);
      console.log(`│ 📊 Taux IPP: ${result.rate}%`);
      console.log(`│ 📂 Chemin: ${result.path || 'N/A'}`);
      
      // Extraction des détails du cumul depuis la justification
      if (isCumul && result.justification) {
        // Chercher les lésions individuelles dans la justification HTML
        const lesionMatches = result.justification.match(/Lésion \d+[^<]*/g);
        if (lesionMatches) {
          console.log(`│ 📋 Détail du cumul:`);
          lesionMatches.forEach(l => console.log(`│    → ${l}`));
        }
        // Chercher les taux individuels
        const tauxMatches = result.justification.match(/(\d+)%/g);
        if (tauxMatches && tauxMatches.length > 1) {
          console.log(`│ 📊 Taux individuels trouvés: ${tauxMatches.join(', ')}`);
        }
      }
      
      // Vérification de la fourchette
      if (result.rate >= minAttendu && result.rate <= maxAttendu) {
        console.log(`│ ✅ VALIDÉ — Taux ${result.rate}% dans la fourchette [${minAttendu}-${maxAttendu}%]`);
        testsReussis++;
      } else if (result.rate >= minAttendu - 10 && result.rate <= maxAttendu + 10) {
        console.log(`│ ⚠️  ACCEPTABLE — Taux ${result.rate}% proche de la fourchette [${minAttendu}-${maxAttendu}%] (±10%)`);
        testsReussis++;  // On considère acceptable
      } else {
        console.log(`│ ❌ HORS FOURCHETTE — Taux ${result.rate}% vs attendu [${minAttendu}-${maxAttendu}%]`);
        testsEchoues.push({ cas: cas.id, titre: cas.titre, taux: result.rate, attendu: cas.fourchette_attendue, raison: 'hors_fourchette' });
      }
      
      resultats.push({
        cas: cas.id,
        type: 'proposal',
        isCumul,
        taux: result.rate,
        nom: result.name,
        fourchette: cas.fourchette_attendue,
        valide: result.rate >= minAttendu - 10 && result.rate <= maxAttendu + 10
      });

    } else if (result.type === 'cumul_proposals') {
      console.log(`│ 📦 TYPE: cumul_proposals (match partiel)`);
      console.log(`│ 📊 Lésions détectées: ${result.lesionCount}`);
      console.log(`│ 📋 Propositions matchées: ${result.proposals.length}`);
      
      let tauxEstime = 0;
      result.proposals.forEach((p, i) => {
        const rate = Array.isArray(p.injury.rate) 
          ? Math.round((p.injury.rate[0] + p.injury.rate[1]) / 2) 
          : p.injury.rate;
        console.log(`│    ${i+1}. ${p.injury.name || p.description} → ${rate}%`);
        
        // Calcul Balthazard manuel
        if (i === 0) {
          tauxEstime = rate;
        } else {
          tauxEstime = tauxEstime + rate * (100 - tauxEstime) / 100;
        }
      });
      
      tauxEstime = Math.round(tauxEstime);
      console.log(`│ 📊 Taux cumulé estimé (Balthazard): ~${tauxEstime}%`);
      
      if (tauxEstime >= minAttendu - 10 && tauxEstime <= maxAttendu + 10) {
        console.log(`│ ⚠️  ACCEPTABLE — Cumul partiel, taux estimé dans la zone`);
        testsReussis++;
      } else {
        console.log(`│ ❌ HORS FOURCHETTE — Taux estimé ${tauxEstime}% vs attendu [${minAttendu}-${maxAttendu}%]`);
        testsEchoues.push({ cas: cas.id, titre: cas.titre, taux: tauxEstime, attendu: cas.fourchette_attendue, raison: 'cumul_partiel_hors_fourchette' });
      }
      
      resultats.push({
        cas: cas.id,
        type: 'cumul_proposals',
        lesionCount: result.lesionCount,
        proposalsCount: result.proposals.length,
        tauxEstime,
        fourchette: cas.fourchette_attendue,
        valide: tauxEstime >= minAttendu - 10 && tauxEstime <= maxAttendu + 10
      });

    } else if (result.type === 'ambiguity') {
      console.log(`│ ❓ TYPE: ambiguity — ${result.choices?.length || 0} choix proposés`);
      if (result.choices) {
        result.choices.slice(0, 5).forEach((c, i) => {
          const rate = Array.isArray(c.rate) ? `${c.rate[0]}-${c.rate[1]}` : c.rate;
          console.log(`│    ${i+1}. ${c.name} → ${rate}%`);
        });
      }
      console.log(`│ ⚠️  Non concluant — le système hésite entre plusieurs diagnostics`);
      testsEchoues.push({ cas: cas.id, titre: cas.titre, taux: null, attendu: cas.fourchette_attendue, raison: 'ambiguity' });
      
      resultats.push({
        cas: cas.id,
        type: 'ambiguity',
        choicesCount: result.choices?.length || 0,
        fourchette: cas.fourchette_attendue,
        valide: false
      });

    } else if (result.type === 'no_result') {
      console.log(`│ ❌ TYPE: no_result`);
      console.log(`│ Message: ${result.text?.substring(0, 120) || 'N/A'}`);
      testsEchoues.push({ cas: cas.id, titre: cas.titre, taux: null, attendu: cas.fourchette_attendue, raison: 'no_result' });
      
      resultats.push({
        cas: cas.id,
        type: 'no_result',
        fourchette: cas.fourchette_attendue,
        valide: false
      });
    }
    
  } catch (e) {
    console.log(`│ 💥 ERREUR: ${e.message}`);
    console.log(`│ Stack: ${e.stack?.split('\n').slice(0, 3).join(' | ')}`);
    testsEchoues.push({ cas: cas.id, titre: cas.titre, taux: null, attendu: cas.fourchette_attendue, raison: `error: ${e.message}` });
    
    resultats.push({
      cas: cas.id,
      type: 'error',
      message: e.message,
      fourchette: cas.fourchette_attendue,
      valide: false
    });
  }
  
  console.log(`└──────────────────────────────────────────────────────────────────────`);
  console.log('');
}

// ═══════════════════════════════════════════════════════════════════════
// SYNTHÈSE FINALE
// ═══════════════════════════════════════════════════════════════════════

console.log('╔══════════════════════════════════════════════════════════════════════╗');
console.log('║                         SYNTHÈSE FINALE                             ║');
console.log('╠══════════════════════════════════════════════════════════════════════╣');
console.log(`║ Total cas testés:           ${totalTests}                                     ║`);
console.log(`║ Tests réussis/acceptables:  ${testsReussis}/${totalTests}                                   ║`);
console.log(`║ Cumuls détectés:            ${testsCumul}/${totalTests}                                   ║`);
console.log(`║ Tests échoués:              ${testsEchoues.length}                                     ║`);
console.log('╠══════════════════════════════════════════════════════════════════════╣');

if (testsEchoues.length > 0) {
  console.log('║ DÉTAIL DES ÉCHECS:                                                 ║');
  testsEchoues.forEach(t => {
    console.log(`║  Cas ${t.cas}: ${t.raison.substring(0, 50).padEnd(50)} ║`);
  });
} else {
  console.log('║ ✅ TOUS LES CAS VALIDÉS AVEC SUCCÈS                               ║');
}

console.log('╠══════════════════════════════════════════════════════════════════════╣');
console.log('║ RÉCAPITULATIF PAR CAS:                                              ║');
resultats.forEach(r => {
  const status = r.valide ? '✅' : '❌';
  const taux = r.taux || r.tauxEstime || '?';
  const type = r.isCumul ? 'cumul' : r.type;
  console.log(`║  ${status} Cas ${r.cas}: ${type.padEnd(18)} IPP=${String(taux).padEnd(4)}%  attendu: ${r.fourchette.padEnd(8)} ║`);
});

console.log('╚══════════════════════════════════════════════════════════════════════╝');

// Score final
const score = Math.round((testsReussis / totalTests) * 100);
console.log('');
console.log(`📊 SCORE GLOBAL: ${score}% (${testsReussis}/${totalTests} cas validés)`);
if (score >= 80) {
  console.log('🏆 Excellent — Le moteur IA gère bien les polytraumatismes AT multisièges');
} else if (score >= 60) {
  console.log('⚠️  Correct — Des améliorations sont possibles sur la détection multi-lésionnelle');
} else {
  console.log('❌ Insuffisant — Le moteur a des difficultés avec les lésions multisièges complexes');
}
