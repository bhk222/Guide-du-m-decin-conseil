/**
 * TEST 7 CAS CLINIQUES — MEMBRE SUPÉRIEUR
 * Validation du moteur expert sur les séquelles du membre supérieur
 * Barème algérien 1967 — IA Exclusive V3.3.280+
 * 
 * Cas couverts:
 *  1. Fracture Pouteau-Colles (séquelles moyennes) — Lésion unique
 *  2. Rupture coiffe des rotateurs opérée — Lésion unique
 *  3. Amputation pouce main dominante — Lésion unique
 *  4. Paralysie nerf cubital au poignet — Lésion unique
 *  5. Luxation récidivante épaule + fracture clavicule — Cumul 2 lésions
 *  6. Fracture humérus + paralysie radiale — Cumul 2 lésions (os + nerf)
 *  7. Ankylose coude + syndrome canal carpien + amputation auriculaire — Cumul 3 lésions
 */

import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

const cas = [
  // ═══════════════════════════════════════════════════════════════════
  // CAS 1 — Fracture Pouteau-Colles, séquelles moyennes
  //   Barème: Pouteau-Colles avec limitation mouvements (D) = 8-15%
  //   Avec cal vicieux et limitation → séquelles moyennes (D) = 15-20%
  //   Fourchette attendue: 10-20%
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Fracture Pouteau-Colles — Séquelles moyennes (main dominante)',
    description: `Femme 48 ans, aide-soignante, main droite dominante.
Chute de sa hauteur au travail le 15/03/2024.
Fracture de l'extrémité inférieure du radius droit (Pouteau-Colles) traitée par réduction orthopédique et immobilisation plâtrée 6 semaines.
Consolidation acquise avec cal vicieux en bascule dorsale de 15°.
Séquelles : limitation de la flexion palmaire à 30° (N=80°), perte de 40% de la force de préhension, douleurs mécaniques résiduelles au poignet droit cotées EVA 3/10, pronosupination limitée à 70%.
Gêne fonctionnelle modérée dans les gestes de nursing (toilette patients, transferts).`,
    fourchette: [10, 20],
    sieges: 'Poignet droit (Pouteau-Colles)'
  },

  // ═══════════════════════════════════════════════════════════════════
  // CAS 2 — Rupture coiffe des rotateurs post-traumatique
  //   Barème: Rupture coiffe rotateurs (D) = 10-30%
  //   Périarthrite limitation modérée (D) = 5-25%
  //   Fourchette attendue: 10-25%
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Rupture coiffe des rotateurs opérée — Épaule gauche (non dominante)',
    description: `Homme 55 ans, peintre en bâtiment, droitier.
Chute d'un escabeau le 20/06/2024 avec réception sur l'épaule gauche.
Rupture complète du tendon du sus-épineux gauche diagnostiquée à l'IRM, opérée par réinsertion arthroscopique.
Séquelles après rééducation : abduction active limitée à 90° (N=180°), élévation antérieure à 100°, rotation externe limitée à 20°.
Amyotrophie deltoïdienne gauche modérée, douleurs à l'effort coté EVA 4/10.
Impossibilité de travailler bras au-dessus de la tête.`,
    fourchette: [10, 25],
    sieges: 'Épaule gauche (coiffe des rotateurs)'
  },

  // ═══════════════════════════════════════════════════════════════════
  // CAS 3 — Amputation du pouce main dominante
  //   Barème: Ablation 2 phalanges pouce (D) = 25-30%
  //   Désarticulation MCP pouce (D) = 28%
  //   Fourchette attendue: 22-32%
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Amputation complète du pouce — Main droite dominante',
    description: `Homme 38 ans, menuisier, main droite dominante.
Accident de scie circulaire sur chantier le 10/01/2025.
Amputation complète du pouce droit au niveau métacarpo-phalangien, non réimplantable.
Moignon bien cicatrisé, non douloureux, bonne trophicité.
Perte totale de la pince pollici-digitale, impossibilité de saisir des objets fins.
Appareillé par prothèse esthétique et fonctionnelle.
Reclassement professionnel nécessaire, impossibilité de reprendre le métier de menuisier.`,
    fourchette: [22, 32],
    sieges: 'Pouce droit (amputation complète)'
  },

  // ═══════════════════════════════════════════════════════════════════
  // CAS 4 — Paralysie nerf cubital au poignet
  //   Barème: Paralysie nerf cubital - Au poignet (D) = 25-35%
  //   (ND) = 15-25%
  //   Fourchette attendue: 15-30% (gauche non dominant)
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Paralysie du nerf cubital au poignet — Main gauche (non dominante)',
    description: `Homme 42 ans, électricien, droitier.
Plaie profonde par verre au poignet gauche (face interne) le 05/09/2024 lors d'une intervention sur chantier.
Section complète du nerf cubital au poignet gauche, suturée en urgence.
Séquelles après 12 mois : griffe cubitale des 4ème et 5ème doigts, amyotrophie des interosseux, perte de la sensibilité du bord ulnaire de la main et des 2 derniers doigts.
Signe de Froment positif. Déficit de l'adduction des doigts et de l'opposition du 5ème doigt.
EMG de contrôle : absence de réinnervation des muscles intrinsèques.`,
    fourchette: [15, 30],
    sieges: 'Poignet gauche (nerf cubital)'
  },

  // ═══════════════════════════════════════════════════════════════════
  // CAS 5 — Luxation récidivante épaule + fracture clavicule (CUMUL)
  //   Barème: Luxation récidivante épaule (D) = 10-30%
  //   Fracture clavicule cal saillant + raideur (D) = 5-15%
  //   Cumul Balthazard attendu: ~20-40%
  //   Fourchette attendue: 18-38%
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Luxation récidivante épaule + fracture clavicule — Épaule droite dominante',
    description: `Homme 29 ans, déménageur, droitier, main droite dominante.
Accident du travail le 12/04/2024 : chute d'un meuble lourd sur l'épaule droite.
Luxation antéro-interne de l'épaule droite réduite en urgence, récidive à 3 reprises lors de la reprise du travail malgré rééducation.
Instabilité chronique antérieure de l'épaule droite, appréhension positive, test de recentrage positif.
Fracture du tiers moyen de la clavicule droite associée, consolidée avec cal hypertrophique saillant et douloureux au contact, limitation de l'abduction à 120° et de la rotation externe à 30°.
Impossibilité de porter des charges lourdes, reclassement professionnel envisagé.`,
    fourchette: [18, 38],
    sieges: 'Épaule droite (luxation récidivante) | Clavicule droite (fracture)'
  },

  // ═══════════════════════════════════════════════════════════════════
  // CAS 6 — Fracture humérus + paralysie radiale (CUMUL os + nerf)
  //   Barème: Fracture humérus avec déformation (D) = 7-30%
  //   Paralysie nerf radial au-dessous triceps (D) = 35-45%
  //   Cumul Balthazard: ~40-60%
  //   Fourchette attendue: 35-58%
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Fracture humérus + paralysie radiale — Bras droit dominant',
    description: `Homme 35 ans, soudeur, droitier, main droite dominante.
Écrasement du bras droit par une poutre métallique le 08/07/2024.
Fracture diaphysaire de l'humérus droit (AO 12-B2), ostéosynthèse par clou centromédullaire.
Consolidation acquise avec cal exubérant et déformation angulaire de 10°, amyotrophie du bras droit.
Paralysie du nerf radial droit par lésion au tiers moyen du bras (au-dessous de la branche du triceps), diagnostiquée à l'EMG.
Main tombante : extension active du poignet et des doigts impossible, déficit de la supination de l'avant-bras.
Pas de récupération après 14 mois malgré rééducation intensive.
Perte totale de la fonction de préhension active de la main droite dominante.`,
    fourchette: [35, 58],
    sieges: 'Humérus droit (fracture) | Nerf radial droit (paralysie)'
  },

  // ═══════════════════════════════════════════════════════════════════
  // CAS 7 — Ankylose coude + canal carpien + amputation auriculaire (CUMUL 3)
  //   Barème: Ankylose coude position entre pro/supination (D) = 30-40%
  //   Syndrome canal carpien post-traumatique (D) = 5-20%
  //   Amputation auriculaire (D) = 6-8%
  //   Cumul Balthazard: ~38-55%
  //   Fourchette attendue: 35-55%
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Ankylose coude + canal carpien + amputation auriculaire — MS droit dominant',
    description: `Homme 50 ans, opérateur de presse industrielle, droitier, main droite dominante.
Accident du travail le 22/08/2024 : membre supérieur droit happé par une presse mécanique.
Fracture comminutive de l'olécrane droit avec luxation postérieure du coude, traitée par ostéosynthèse et réduction.
Évolution vers ankylose du coude droit en position de fonction (flexion 90°, entre pronation et supination), flexion-extension bloquée, pronosupination abolie.
Syndrome du canal carpien droit post-traumatique sévère secondaire à l'œdème et à la fibrose : paresthésies permanentes des 3 premiers doigts, amyotrophie de l'éminence thénar, déficit de l'opposition du pouce, EMG confirmant une atteinte axonale sévère du nerf médian.
Amputation de la 3ème phalange du 5ème doigt (auriculaire) de la main droite dominante, moignon sensible.
Incapacité professionnelle totale dans le métier antérieur.`,
    fourchette: [35, 55],
    sieges: 'Coude droit (ankylose) | Poignet droit (canal carpien) | Auriculaire droit (amputation P3)'
  }
];

// ═══════════════════════════════════════════════
//  EXÉCUTION DES TESTS
// ═══════════════════════════════════════════════
async function runTests() {
  console.log('╔══════════════════════════════════════════════════════════════════════════╗');
  console.log('║  TEST 7 CAS CLINIQUES — MEMBRE SUPÉRIEUR (Barème 1967)                 ║');
  console.log('║  Validation du moteur expert IA Exclusive                               ║');
  console.log('╚══════════════════════════════════════════════════════════════════════════╝');
  console.log('');

  const results = [];

  for (let i = 0; i < cas.length; i++) {
    const c = cas[i];
    const [min, max] = c.fourchette;
    
    console.log('┌──────────────────────────────────────────────────────────────────────────');
    console.log(`│ CAS ${i + 1} — ${c.name}`);
    console.log(`│ Sièges: ${c.sieges}`);
    console.log(`│ Fourchette attendue: ${min}-${max}%`);
    console.log('├──────────────────────────────────────────────────────────────────────────');
    
    try {
      const result = await localExpertAnalysis(c.description, []);
      
      let taux = 0;
      let type = result?.type || 'no_result';
      let diagnostic = '';
      let detail = '';
      let isCumul = false;
      
      if (result?.type === 'proposal') {
        taux = result.rate || 0;
        diagnostic = result.injury?.name || 'N/A';
        detail = result.injury?.path || '';
        
        // Détecter si c'est un cumul
        if (/cumul|polytraumatisme/i.test(diagnostic) || /cumul/i.test(detail)) {
          isCumul = true;
        }
        
        // Chercher les taux individuels dans le détail
        const allRates = [];
        const ratePattern = /(\d+)%/g;
        let match;
        const fullText = JSON.stringify(result);
        while ((match = ratePattern.exec(fullText)) !== null) {
          allRates.push(parseInt(match[1]));
        }
        if (allRates.length > 0) {
          console.log(`│ 📊 Taux individuels trouvés: ${allRates.join('%, ')}%`);
        }
      } else if (result?.type === 'cumul_proposals') {
        isCumul = true;
        type = 'cumul';
        if (result.proposals && result.proposals.length > 0) {
          const rates = result.proposals.map(p => p.rate || 0);
          // Balthazard
          taux = rates.reduce((acc, r) => {
            if (acc === 0) return r;
            return acc + r * (100 - acc) / 100;
          }, 0);
          taux = Math.round(taux);
          diagnostic = `Cumul ${rates.length} lésions`;
        }
      }
      
      const isValid = taux >= min && taux <= max;
      const status = isValid ? '✅ VALIDÉ' : '❌ HORS FOURCHETTE';
      
      console.log(`│ ${status}`);
      console.log(`│ 📋 Type: ${type}${isCumul ? ' (CUMUL ✔)' : ''}`);
      console.log(`│ 📋 Diagnostic: ${diagnostic}`);
      console.log(`│ 📊 Taux IPP: ${taux}%`);
      console.log(`│ 📁 Chemin: ${detail}`);
      console.log(`│ ${isValid ? '✅' : '❌'} Taux ${taux}% vs attendu [${min}-${max}%]`);
      console.log('└──────────────────────────────────────────────────────────────────────────');
      console.log('');
      
      results.push({
        cas: i + 1,
        name: c.name,
        taux,
        min,
        max,
        isValid,
        type,
        isCumul,
        diagnostic,
        detail
      });
    } catch (error) {
      console.log(`│ ❌ ERREUR: ${error.message}`);
      console.log('└──────────────────────────────────────────────────────────────────────────');
      results.push({
        cas: i + 1,
        name: c.name,
        taux: 0,
        min,
        max,
        isValid: false,
        type: 'error',
        isCumul: false,
        diagnostic: error.message,
        detail: ''
      });
    }
  }

  // ═══════════════════════════════════════════════
  //  SYNTHÈSE FINALE
  // ═══════════════════════════════════════════════
  const passed = results.filter(r => r.isValid).length;
  const failed = results.filter(r => !r.isValid);
  const cumulCount = results.filter(r => r.isCumul).length;
  
  console.log('');
  console.log('╔══════════════════════════════════════════════════════════════════════════╗');
  console.log('║                         SYNTHÈSE FINALE                                 ║');
  console.log('╠══════════════════════════════════════════════════════════════════════════╣');
  console.log(`║  Total cas testés:           ${cas.length}                                        ║`);
  console.log(`║  Tests réussis/acceptables:  ${passed}/${cas.length}                                      ║`);
  console.log(`║  Cumuls détectés:            ${cumulCount}/3 (cas 5, 6, 7 attendus)               ║`);
  console.log(`║  Tests échoués:              ${failed.length}                                        ║`);
  
  if (failed.length === 0) {
    console.log('╠══════════════════════════════════════════════════════════════════════════╣');
    console.log('║  ✅ TOUS LES CAS VALIDÉS AVEC SUCCÈS                                   ║');
  } else {
    console.log('╠══════════════════════════════════════════════════════════════════════════╣');
    console.log('║  DÉTAIL DES ÉCHECS:                                                     ║');
    for (const f of failed) {
      const reason = f.taux < f.min ? `trop_bas (${f.taux}% < ${f.min}%)` : 
                     f.taux > f.max ? `trop_haut (${f.taux}% > ${f.max}%)` : 'erreur';
      console.log(`║  Cas ${f.cas}: ${reason.padEnd(55)}║`);
    }
  }
  
  console.log('╠══════════════════════════════════════════════════════════════════════════╣');
  console.log('║  RÉCAPITULATIF PAR CAS:                                                 ║');
  for (const r of results) {
    const icon = r.isValid ? '✅' : '❌';
    const typeStr = (r.isCumul ? 'cumul' : r.type).padEnd(18);
    console.log(`║  ${icon} Cas ${r.cas}: ${typeStr} IPP=${String(r.taux).padEnd(4)}%  attendu: ${r.min}-${r.max}%${' '.repeat(Math.max(0, 10 - String(r.max).length))}║`);
  }
  console.log('╚══════════════════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`📊 SCORE GLOBAL: ${Math.round(passed / cas.length * 100)}% (${passed}/${cas.length} cas validés)`);
  
  if (passed === cas.length) {
    console.log('🏆 PARFAIT — Moteur expert validé à 100% sur les lésions du membre supérieur');
  } else if (passed >= 5) {
    console.log('👍 BON — Des améliorations mineures possibles');
  } else {
    console.log('⚠️ Des corrections sont nécessaires');
  }
}

runTests().catch(console.error);
