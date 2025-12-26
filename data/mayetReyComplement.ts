/**
 * LÉSIONS COMPLÉMENTAIRES DÉTAILLÉES
 * 
 * Ce fichier contient des lésions spécifiques et détaillées complémentaires.
 * 
 * Organisation:
 * - Séquelles des doigts (phalanges, articulations, mouvements fins)
 * - Séquelles complexes du poignet et de la main
 * - Séquelles spécifiques de l'épaule (rupture coiffe, instabilité)
 * - Séquelles neurologiques et sensorielles
 * - Complications post-opératoires
 */

import { InjuryCategory } from '../types';

export const mayetReyComplement: InjuryCategory[] = [
  {
    name: "Membres Supérieurs Détaillés",
    subcategories: [
      {
        name: "Doigts - Lésions Articulaires et Fonctionnelles",
        injuries: [
          // POUCE - Détails supplémentaires
          { name: "Ankylose IPP Pouce en extension (Dominante)", rate: [8, 12], description: "Blocage articulation interphalangienne pouce en extension." },
          { name: "Ankylose IPP Pouce en flexion (Dominante)", rate: [10, 15], description: "Blocage articulation interphalangienne pouce en flexion (gêne plus importante)." },
          { name: "Raideur IPP Pouce (Dominante)", rate: [3, 8], rateCriteria: { low: "Limitation < 30°", high: "Limitation > 50°" } },
          { name: "Instabilité MCP Pouce (Dominante)", rate: [5, 15], description: "Laxité ligamentaire métacarpo-phalangienne du pouce." },
          { name: "Ankylose IPP Pouce (Non-Dominante)", rate: [6, 10] },
          
          // INDEX - Ankylose et raideurs détaillées
          { name: "Ankylose IPP Index en extension complète (Dominante)", rate: [6, 10], description: "Meilleure position fonctionnelle." },
          { name: "Ankylose IPP Index en flexion 45° (Dominante)", rate: [8, 12], description: "Position semi-fléchie modérément fonctionnelle." },
          { name: "Ankylose IPP Index en flexion complète (Dominante)", rate: [12, 18], description: "Gêne majeure pour saisie objets." },
          { name: "Raideur IPP Index (Dominante)", rate: [4, 10], rateCriteria: { low: "Déficit < 40°", high: "Déficit > 70°" } },
          { name: "Ankylose IPD Index (Dominante)", rate: [2, 5], description: "Moins invalidante que IPP." },
          { name: "Raideur IPD Index (Dominante)", rate: [1, 3] },
          
          // MÉDIUS - Ankylose et raideurs
          { name: "Ankylose IPP Médius en extension (Dominante)", rate: [5, 8] },
          { name: "Ankylose IPP Médius en flexion (Dominante)", rate: [8, 12] },
          { name: "Raideur IPP Médius (Dominante)", rate: [3, 8] },
          { name: "Ankylose IPD Médius (Dominante)", rate: [2, 4] },
          
          // ANNULAIRE - Ankylose et raideurs
          { name: "Ankylose IPP Annulaire en extension (Dominante)", rate: [4, 7] },
          { name: "Ankylose IPP Annulaire en flexion (Dominante)", rate: [6, 10] },
          { name: "Raideur IPP Annulaire (Dominante)", rate: [2, 6] },
          { name: "Ankylose IPD Annulaire (Dominante)", rate: [1, 3] },
          
          // AURICULAIRE - Ankylose et raideurs
          { name: "Ankylose IPP Auriculaire en extension (Dominante)", rate: [3, 5] },
          { name: "Ankylose IPP Auriculaire en flexion (Dominante)", rate: [4, 8] },
          { name: "Raideur IPP Auriculaire (Dominante)", rate: [2, 5] },
          { name: "Ankylose IPD Auriculaire (Dominante)", rate: [1, 2] },
          
          // Lésions nerveuses digitales
          { name: "Section nerf collatéral digital pouce (Dominante)", rate: [3, 8], description: "Anesthésie hémiface palmaire pouce." },
          { name: "Section nerf collatéral digital index (Dominante)", rate: [2, 6] },
          { name: "Section nerf collatéral digital médius (Dominante)", rate: [2, 5] },
          { name: "Section nerfs collatéraux digitaux multiples (Dominante)", rate: [5, 15], description: "Atteinte de 2 doigts ou plus." },
          
          // Déformations des doigts
          { name: "Doigt en maillet (mallet finger) IPD (Dominante)", rate: [3, 8], description: "Rupture tendon extenseur terminal, IPD en flexion permanente." },
          { name: "Doigt en boutonnière (IPP fléchie, IPD hyperextension) (Dominante)", rate: [8, 15], description: "Rupture bandelette médiane extenseur.", imageUrl: "/images/medical/doigt-boutonniere.svg" },
          { name: "Doigt en col de cygne (IPP hyperextension, IPD flexion) (Dominante)", rate: [8, 15], description: "Rétraction de l'intrinsèque ou laxité volaire." },
          { name: "Clinodactylie post-traumatique (Dominante)", rate: [2, 8], description: "Déviation latérale d'un doigt." },
          
          // Lésions tendineuses fléchisseurs (Classification Verdan - Zone II la plus critique)
          { name: "Rupture/Section fléchisseur pouce - Zone I (IPP) (Dominante)", rate: [8, 12], description: "Section FPL zone distale, perte flexion IPP pouce." },
          { name: "Rupture/Section fléchisseur pouce - Zone II-III (thénar/paume) (Dominante)", rate: [10, 15], description: "Section FPL zone critique, risque adhérences." },
          { name: "Rupture/Section fléchisseur index - Zone I (IPD) (Dominante)", rate: [6, 10], description: "Section FDP zone distale, perte flexion IPD uniquement." },
          { name: "Rupture/Section fléchisseur index - Zone II (gaine digitale P1-P2) (Dominante)", rate: [10, 15], description: "Section zone critique, adhérences fréquentes, raideur IPP+IPD." },
          { name: "Rupture/Section fléchisseur index - Zone III-IV-V (paume/poignet) (Dominante)", rate: [8, 12], description: "Section zone proximale, meilleur pronostic." },
          { name: "Rupture/Section fléchisseur médius - Zone I (IPD) (Dominante)", rate: [5, 8], description: "Section FDP zone distale médius." },
          { name: "Rupture/Section fléchisseur médius - Zone II (gaine digitale) (Dominante)", rate: [8, 12], description: "Section zone critique médius, raideur IPP+IPD." },
          { name: "Rupture/Section fléchisseur médius - Zone III-IV-V (Dominante)", rate: [6, 10], description: "Section zone proximale médius." },
          { name: "Rupture/Section fléchisseur annulaire - Zone I (IPD) (Dominante)", rate: [4, 7], description: "Section FDP zone distale annulaire." },
          { name: "Rupture/Section fléchisseur annulaire - Zone II (gaine digitale) (Dominante)", rate: [6, 10], description: "Section zone critique annulaire, raideur IPP+IPD." },
          { name: "Rupture/Section fléchisseur annulaire - Zone III-IV-V (Dominante)", rate: [5, 8], description: "Section zone proximale annulaire." },
          { name: "Rupture/Section fléchisseur auriculaire - Zone I (IPD) (Dominante)", rate: [3, 5], description: "Section FDP zone distale auriculaire." },
          { name: "Rupture/Section fléchisseur auriculaire - Zone II (gaine digitale) (Dominante)", rate: [4, 8], description: "Section zone critique auriculaire, raideur." },
          { name: "Rupture/Section fléchisseur auriculaire - Zone III-IV-V (Dominante)", rate: [3, 6], description: "Section zone proximale auriculaire." },
          { name: "Section fléchisseurs multiples (2 doigts ou plus) - Zone II (Dominante)", rate: [15, 30], description: "Lésion complexe multi-digitale en zone critique." },
          
          // Lésions tendineuses extenseurs
          { name: "Section extenseur pouce - Zone T1-T2 (IPP/MCP) (Dominante)", rate: [5, 10], description: "Perte extension pouce." },
          { name: "Section extenseur doigt long - Zone 1 (IPD) (Dominante)", rate: [2, 5], description: "Doigt en maillet (voir déformation ci-dessus)." },
          { name: "Section extenseur doigt long - Zone 3 (IPP) (Dominante)", rate: [5, 10], description: "Doigt en boutonnière (voir déformation ci-dessus)." },
          { name: "Section extenseur doigt long - Zone 5-7 (MCP/poignet) (Dominante)", rate: [8, 15], description: "Perte extension doigt au niveau MCP." },
          { name: "Section extenseurs multiples au poignet (Dominante)", rate: [15, 25], description: "Atteinte de plusieurs tendons extenseurs." },
          
          // Main non dominante - Déformations (facteur 0.7-0.8)
          { name: "Doigt en maillet (mallet finger) IPD (Non-Dominante)", rate: [2, 6], description: "Rupture tendon extenseur terminal, IPD en flexion permanente." },
          { name: "Doigt en boutonnière (IPP fléchie, IPD hyperextension) (Non-Dominante)", rate: [6, 12], description: "Rupture bandelette médiane extenseur.", imageUrl: "/images/medical/doigt-boutonniere.svg" },
          { name: "Doigt en col de cygne (IPP hyperextension, IPD flexion) (Non-Dominante)", rate: [6, 12], description: "Rétraction de l'intrinsèque ou laxité volaire." },
          
          // Main non dominante - Lésions tendineuses fléchisseurs (facteur 0.7-0.8)
          { name: "Rupture/Section fléchisseur pouce - Zone I (IPP) (Non-Dominante)", rate: [6, 9], description: "Section FPL zone distale, perte flexion IPP pouce." },
          { name: "Rupture/Section fléchisseur pouce - Zone II-III (thénar/paume) (Non-Dominante)", rate: [7, 12], description: "Section FPL zone critique, risque adhérences." },
          { name: "Rupture/Section fléchisseur index - Zone I (IPD) (Non-Dominante)", rate: [4, 8], description: "Section FDP zone distale, perte flexion IPD uniquement." },
          { name: "Rupture/Section fléchisseur index - Zone II (gaine digitale P1-P2) (Non-Dominante)", rate: [7, 12], description: "Section zone critique, adhérences fréquentes, raideur IPP+IPD." },
          { name: "Rupture/Section fléchisseur index - Zone III-IV-V (paume/poignet) (Non-Dominante)", rate: [6, 9], description: "Section zone proximale, meilleur pronostic." },
          { name: "Rupture/Section fléchisseur médius - Zone I (IPD) (Non-Dominante)", rate: [4, 6], description: "Section FDP zone distale médius." },
          { name: "Rupture/Section fléchisseur médius - Zone II (gaine digitale) (Non-Dominante)", rate: [6, 9], description: "Section zone critique médius, raideur IPP+IPD." },
          { name: "Rupture/Section fléchisseur médius - Zone III-IV-V (Non-Dominante)", rate: [4, 8], description: "Section zone proximale médius." },
          { name: "Rupture/Section fléchisseur annulaire - Zone I (IPD) (Non-Dominante)", rate: [3, 5], description: "Section FDP zone distale annulaire." },
          { name: "Rupture/Section fléchisseur annulaire - Zone II (gaine digitale) (Non-Dominante)", rate: [4, 8], description: "Section zone critique annulaire, raideur IPP+IPD." },
          { name: "Rupture/Section fléchisseur annulaire - Zone III-IV-V (Non-Dominante)", rate: [4, 6], description: "Section zone proximale annulaire." },
          { name: "Rupture/Section fléchisseur auriculaire - Zone I (IPD) (Non-Dominante)", rate: [2, 4], description: "Section FDP zone distale auriculaire." },
          { name: "Rupture/Section fléchisseur auriculaire - Zone II (gaine digitale) (Non-Dominante)", rate: [3, 6], description: "Section zone critique auriculaire, raideur." },
          { name: "Rupture/Section fléchisseur auriculaire - Zone III-IV-V (Non-Dominante)", rate: [2, 5], description: "Section zone proximale auriculaire." },
          { name: "Section fléchisseurs multiples (2 doigts ou plus) - Zone II (Non-Dominante)", rate: [12, 24], description: "Lésion complexe multi-digitale en zone critique." },
          
          // Main non dominante - Lésions tendineuses extenseurs (facteur 0.7-0.8)
          { name: "Section extenseur pouce - Zone T1-T2 (IPP/MCP) (Non-Dominante)", rate: [4, 8], description: "Perte extension pouce." },
          { name: "Section extenseur doigt long - Zone 1 (IPD) (Non-Dominante)", rate: [2, 4], description: "Doigt en maillet (voir déformation ci-dessus)." },
          { name: "Section extenseur doigt long - Zone 3 (IPP) (Non-Dominante)", rate: [4, 8], description: "Doigt en boutonnière (voir déformation ci-dessus)." },
          { name: "Section extenseur doigt long - Zone 5-7 (MCP/poignet) (Non-Dominante)", rate: [6, 12], description: "Perte extension doigt au niveau MCP." },
          { name: "Section extenseurs multiples au poignet (Non-Dominante)", rate: [12, 20], description: "Atteinte de plusieurs tendons extenseurs." },
          
          // Main non dominante - Ankyloses
          { name: "Ankylose IPP Index (Non-Dominante)", rate: [5, 12] },
          { name: "Ankylose IPP Médius (Non-Dominante)", rate: [4, 10] },
          { name: "Ankylose IPP Annulaire (Non-Dominante)", rate: [3, 8] },
          { name: "Ankylose IPP Auriculaire (Non-Dominante)", rate: [2, 6] },
        ]
      },
      {
        name: "Main et Poignet - Lésions Complexes",
        injuries: [
          { name: "Instabilité scapho-lunaire du poignet (Dominante)", rate: [15, 30], description: "Dissociation ligamentaire scapho-lunaire, poignet instable douloureux.", rateCriteria: { low: "Instabilité minime, douleurs d'effort.", high: "Instabilité majeure, arthrose secondaire débutante (SLAC wrist)." } },
          { name: "Pseudarthrose du scaphoïde (Dominante)", rate: [20, 35], description: "Non-consolidation du scaphoïde avec douleurs et limitation fonctionnelle.", rateCriteria: { low: "Pseudarthrose asymptomatique ou peu douloureuse.", high: "Pseudarthrose avec collapse carpien et arthrose (SNAC wrist)." } },
          { name: "Nécrose avasculaire du semi-lunaire (Maladie de Kienböck) post-traumatique (Dominante)", rate: [25, 40], description: "Nécrose du lunatum avec effondrement carpien progressif.", rateCriteria: { low: "Stade précoce (stade I-II), douleurs modérées.", high: "Stade avancé (stade III-IV) avec effondrement carpien et arthrose diffuse." } },
          { name: "Syndrome du canal de Guyon (nerf cubital au poignet) (Dominante)", rate: [10, 25], description: "Compression du nerf cubital dans le canal de Guyon (versant ulnaire du poignet).", rateCriteria: { low: "Paresthésies intermittentes sans déficit moteur.", high: "Déficit moteur avec amyotrophie des muscles intrinsèques ulnaires (hypothénar, interosseux)." } },
          { name: "Ténosynovite sténosante de De Quervain chronique post-traumatique (Dominante)", rate: [5, 15], description: "Inflammation chronique des tendons du long abducteur et du court extenseur du pouce.", rateCriteria: { low: "Douleurs occasionnelles, test de Finkelstein positif.", high: "Douleurs quasi-permanentes, limitation sévère de l'usage du pouce." } },
          { name: "Doigt à ressaut (trigger finger) post-traumatique (Dominante)", rate: [3, 10], description: "Blocage douloureux d'un doigt en flexion par nodule tendineux.", rateCriteria: { low: "Ressaut occasionnel sans blocage.", high: "Blocage fréquent nécessitant déverrouillage manuel." } },
          { name: "Rétraction aponévrose palmaire (Dupuytren post-traumatique) (Dominante)", rate: [10, 30], description: "Fibrose et rétraction de l'aponévrose palmaire entraînant une flexion irréductible des doigts.", rateCriteria: { low: "Rétraction légère d'un seul doigt (< 30°).", high: "Rétraction sévère multi-digitale avec perte de fonction de la main." } },
          { name: "Syndrome compartimental chronique de la main (Dominante)", rate: [15, 35], description: "Séquelles d'un syndrome de loge aigu avec fibrose et raideur.", rateCriteria: { low: "Raideur modérée, récupération partielle après rééducation.", high: "Main figée en griffe, atrophie musculaire sévère, fonction quasi nulle." } },
          { name: "Arthrose post-traumatique de l'articulation trapézo-métacarpienne (rhizarthrose) (Dominante)", rate: [15, 30], description: "Arthrose de la base du pouce après fracture ou entorse grave.", rateCriteria: { low: "Arthrose débutante, douleurs mécaniques, mobilité conservée.", high: "Arthrose sévère avec limitation majeure de la pince pouce-index et retentissement fonctionnel." } },
          { name: "Perte de force de serrage de la main > 50% (Dominante)", rate: [20, 35], description: "Mesuré au dynamomètre (Jamar), comparativement au côté controlatéral sain." },
          { name: "Perte de force de serrage de la main 30-50% (Dominante)", rate: [10, 20] },
          { name: "Perte de force de serrage de la main < 30% (Dominante)", rate: [5, 10] },
          
          // Main non dominante
          { name: "Instabilité scapho-lunaire (Non-Dominante)", rate: [12, 24] },
          { name: "Pseudarthrose du scaphoïde (Non-Dominante)", rate: [15, 28] },
          { name: "Maladie de Kienböck (Non-Dominante)", rate: [20, 32] },
          { name: "Arthrose trapézo-métacarpienne (Non-Dominante)", rate: [12, 24] },
        ]
      },
      {
        name: "Épaule - Lésions Spécifiques",
        injuries: [
          { name: "Rupture de la coiffe des rotateurs (partielle < 50%) (Dominante)", rate: [10, 20], description: "Rupture tendineuse partielle du supra-épineux principalement.", rateCriteria: { low: "Douleurs nocturnes, mobilité active quasi-normale.", high: "Limitation de l'abduction > 90°, perte de force notable." } },
          { name: "Rupture de la coiffe des rotateurs (complète > 50%) (Dominante)", rate: [20, 40], description: "Rupture complète d'un ou plusieurs tendons de la coiffe.", rateCriteria: { low: "Rupture isolée supra-épineux, mobilité passive conservée.", high: "Rupture massive (> 2 tendons), arthropathie rupturale, pseudo-paralysie." } },
          { name: "Instabilité chronique antérieure de l'épaule (luxations récidivantes) (Dominante)", rate: [15, 30], description: "Épaule instable avec luxations ou subluxations récidivantes.", rateCriteria: { low: "Appréhension, évitement de certains gestes, rare subluxation.", high: "Luxations fréquentes nécessitant réduction, limitation importante des activités." } },
          { name: "Instabilité multidirectionnelle de l'épaule (Dominante)", rate: [20, 35], description: "Hyperlaxité avec instabilité dans plusieurs directions." },
          { name: "Omarthrose post-traumatique (arthrose gléno-humérale) (Dominante)", rate: [25, 50], description: "Arthrose de l'articulation de l'épaule après fracture ou luxation.", rateCriteria: { low: "Arthrose débutante, douleurs mécaniques, mobilité conservée.", high: "Arthrose évoluée avec raideur sévère et douleurs quasi-permanentes." } },
          { name: "Arthropathie acromio-claviculaire post-traumatique (Dominante)", rate: [8, 20], description: "Arthrose de l'articulation acromio-claviculaire après entorse ou fracture clavicule.", rateCriteria: { low: "Douleurs localisées lors des mouvements d'adduction horizontale.", high: "Douleurs permanentes avec limitation des mouvements du bras." } },
          { name: "Capsulite rétractile post-traumatique (épaule gelée) (Dominante)", rate: [15, 35], description: "Raideur douloureuse de l'épaule après immobilisation prolongée.", rateCriteria: { low: "Phase de récupération, limitation modérée (> 90° d'élévation).", high: "Raideur sévère et persistante, élévation < 90°, retentissement majeur." } },
          { name: "Paralysie du nerf axillaire (nerf circonflexe) avec atteinte du deltoïde (Dominante)", rate: [30, 50], description: "Paralysie du deltoïde, impossibilité d'abduction active de l'épaule.", rateCriteria: { low: "Paralysie partielle, récupération partielle, abduction faible.", high: "Paralysie complète sans récupération, atrophie deltoïdienne, épaule non fonctionnelle en abduction." } },
          { name: "Paralysie du nerf supra-scapulaire (Dominante)", rate: [15, 30], description: "Atteinte supra et infra-épineux, faiblesse de la rotation externe et abduction.", rateCriteria: { low: "Atrophie modérée, faiblesse partielle.", high: "Atrophie sévère, perte majeure de force en rotation externe." } },
          
          // Épaule non dominante
          { name: "Rupture coiffe des rotateurs (Non-Dominante)", rate: [15, 32] },
          { name: "Instabilité chronique épaule (Non-Dominante)", rate: [12, 24] },
          { name: "Omarthrose post-traumatique (Non-Dominante)", rate: [20, 40] },
          { name: "Capsulite rétractile (Non-Dominante)", rate: [12, 28] },
          { name: "Paralysie nerf axillaire (Non-Dominante)", rate: [25, 40] },
        ]
      },
      {
        name: "Coude et Avant-bras - Lésions Spécifiques",
        injuries: [
          { name: "Arthrose post-traumatique du coude (Dominante)", rate: [20, 40], description: "Arthrose après fracture complexe du coude (palette humérale, olécrane, tête radiale).", rateCriteria: { low: "Arthrose débutante avec raideur modérée (flexion-extension > 100°).", high: "Arthrose évoluée, raideur sévère (< 70°), douleurs quasi-permanentes." } },
          { name: "Raideur du coude post-traumatique (sans arthrose) (Dominante)", rate: [10, 30], rateCriteria: { low: "Arc de mobilité > 100° (30-130° de flexion)", medium: "Arc de mobilité 70-100°", high: "Arc de mobilité < 70° ou ankylose en mauvaise position." } },
          { name: "Ankylose du coude en extension (Dominante)", rate: [35, 50], description: "Coude bloqué en extension, position très invalidante." },
          { name: "Ankylose du coude en flexion 90° (Dominante)", rate: [25, 35], description: "Position fonctionnelle acceptable." },
          { name: "Ankylose du coude en flexion complète (Dominante)", rate: [40, 55], description: "Position très invalidante." },
          { name: "Instabilité chronique du coude (Dominante)", rate: [20, 35], description: "Instabilité après lésion ligamentaire (LCL, LCM) ou fracture-luxation.", rateCriteria: { low: "Instabilité minime avec appréhension.", high: "Instabilité majeure avec subluxations, impossibilité de porter des charges." } },
          { name: "Syndrome du tunnel cubital (compression nerf cubital au coude) (Dominante)", rate: [10, 30], description: "Compression chronique du nerf cubital dans la gouttière épitrochléo-olécranienne.", rateCriteria: { low: "Paresthésies intermittentes sans déficit.", medium: "Hypoesthésie permanente 4ème et 5ème doigts.", high: "Déficit moteur avec amyotrophie intrinsèques, griffe cubitale." } },
          { name: "Épicondylite chronique post-traumatique (tennis elbow) (Dominante)", rate: [5, 15], description: "Tendinopathie chronique des extenseurs du poignet.", rateCriteria: { low: "Douleurs occasionnelles lors d'efforts spécifiques.", high: "Douleurs quasi-permanentes limitant l'usage de la main." } },
          { name: "Épitrochléite chronique post-traumatique (golf elbow) (Dominante)", rate: [5, 15], description: "Tendinopathie chronique des fléchisseurs du poignet." },
          { name: "Syndrome de la loge de Guyon au niveau du coude (Dominante)", rate: [8, 20] },
          { name: "Myosite ossifiante post-traumatique du coude (Dominante)", rate: [15, 40], description: "Ossification hétérotopique péri-articulaire entraînant une raideur sévère.", rateCriteria: { low: "Calcifications discrètes, raideur modérée.", high: "Ossifications majeures, ankylose ou quasi-ankylose." } },
          { name: "Pseudarthrose de l'olécrane (Dominante)", rate: [20, 35], description: "Non-consolidation de fracture olécranienne avec perte de force d'extension." },
          { name: "Pseudarthrose de la tête radiale (Dominante)", rate: [15, 25], description: "Douleurs et limitation de la pronosupination." },
          
          // Coude non-dominante
          { name: "Arthrose coude (Non-Dominante)", rate: [15, 32] },
          { name: "Raideur coude (Non-Dominante)", rate: [8, 24] },
          { name: "Ankylose coude extension (Non-Dominante)", rate: [28, 40] },
          { name: "Ankylose coude flexion 90° (Non-Dominante)", rate: [20, 28] },
          { name: "Syndrome tunnel cubital (Non-Dominante)", rate: [8, 24] },
          { name: "Myosite ossifiante (Non-Dominante)", rate: [12, 32] },
        ]
      }
    ]
  },
  {
    name: "Membres Inférieurs Détaillés",
    subcategories: [
      {
        name: "Hanche - Lésions Spécifiques",
        injuries: [
          { name: "Coxarthrose post-traumatique (arthrose de hanche)", rate: [30, 60], description: "Arthrose après fracture du cotyle, col fémoral ou luxation de hanche.", rateCriteria: { low: "Arthrose débutante, douleurs mécaniques, mobilité conservée.", medium: "Arthrose modérée, boiterie, limitation des activités.", high: "Coxarthrose sévère avec raideur majeure, douleurs permanentes, indication de prothèse." } },
          { name: "Nécrose de la tête fémorale post-traumatique (ostéonécrose aseptique)", rate: [40, 70], description: "Nécrose avasculaire de la tête fémorale après fracture du col ou luxation.", rateCriteria: { low: "Nécrose débutante, douleurs modérées, tête partiellement préservée.", high: "Nécrose évoluée avec effondrement, indication de prothèse totale." } },
          { name: "Prothèse totale de hanche (PTH) bien fonctionnelle", rate: [25, 40], description: "Après échec de traitement conservateur (arthrose, nécrose, fracture).", rateCriteria: { low: "PTH bien tolérée, mobilité fonctionnelle, marche sans aide.", high: "Mobilité limitée, douleurs résiduelles, besoin de canne." } },
          { name: "Prothèse totale de hanche (PTH) avec complications", rate: [40, 70], description: "Descellement, infection chronique, luxations récidivantes, raideur sévère.", rateCriteria: { low: "Complications mineures contrôlées.", high: "Reprises chirurgicales multiples, hanche douloureuse et raide." } },
          { name: "Ankylose de hanche en position favorable (flexion 20-30°)", rate: [50, 60], description: "Hanche figée en légère flexion et abduction." },
          { name: "Ankylose de hanche en position défavorable (extension complète ou flexion > 45°)", rate: [60, 80], description: "Position très invalidante." },
          { name: "Conflit fémoro-acétabulaire (CFA) post-traumatique", rate: [15, 30], description: "Anomalie morphologique post-fracture créant un conflit douloureux.", rateCriteria: { low: "Conflit intermittent, douleurs d'effort.", high: "Conflit majeur avec arthrose débutante, indication chirurgicale." } },
          { name: "Instabilité chronique de hanche (après luxation récidivante)", rate: [30, 50], description: "Épisodes de subluxation ou luxation récidivante." },
          { name: "Ossifications hétérotopiques péri-articulaires de hanche", rate: [20, 50], description: "Formation osseuse ectopique limitant la mobilité de hanche.", rateCriteria: { low: "Calcifications discrètes, mobilité peu limitée.", high: "Ossifications majeures créant une quasi-ankylose." } },
          { name: "Méralgie paresthésique (compression nerf fémoro-cutané) post-traumatique", rate: [5, 15], description: "Douleurs et paresthésies de la face antéro-latérale de la cuisse.", rateCriteria: { low: "Paresthésies intermittentes tolérables.", high: "Douleurs neuropathiques quasi-permanentes et invalidantes." } },
          { name: "Bursite trochantérienne chronique post-traumatique", rate: [5, 15], description: "Inflammation chronique de la bourse séreuse du grand trochanter, douleurs latérales de hanche." },
          { name: "Tendinopathie calcifiante des fessiers (glutéaux) post-traumatique", rate: [10, 20], description: "Calcifications tendineuses avec douleurs et limitation de la marche." },
        ]
      },
      {
        name: "Genou - Lésions Méniscales et Ligamentaires Détaillées",
        injuries: [
          { name: "Lésion méniscale médiale (interne) isolée opérée - Méniscectomie partielle", rate: [5, 15], description: "Résection partielle du ménisque médial.", rateCriteria: { low: "Résection < 30%, genou stable, récupération complète.", high: "Résection > 70%, douleurs résiduelles, début d'arthrose." } },
          { name: "Lésion méniscale médiale - Méniscectomie totale", rate: [15, 25], description: "Résection complète du ménisque médial avec risque arthrosique élevé." },
          { name: "Lésion méniscale latérale (externe) isolée opérée - Méniscectomie partielle", rate: [5, 12], description: "Résection partielle du ménisque latéral (moins invalidant que médial)." },
          { name: "Lésion méniscale latérale - Méniscectomie totale", rate: [10, 20] },
          { name: "Méniscectomie bilatérale (les 2 ménisques du même genou)", rate: [25, 40], description: "Perte des 2 ménisques, risque arthrosique majeur." },
          { name: "Rupture du LCA (Ligament Croisé Antérieur) non opérée - Genou instable", rate: [20, 40], description: "Instabilité antérieure chronique, dérobements fréquents.", rateCriteria: { low: "Instabilité modérée, adaptation fonctionnelle partielle.", high: "Instabilité majeure avec dérobements fréquents, limitation sévère des activités." } },
          { name: "Rupture du LCA opérée (ligamentoplastie) - Bon résultat", rate: [10, 20], description: "Genou stable après plastie, récupération fonctionnelle satisfaisante.", rateCriteria: { low: "Genou stable, reprise sport adapté.", high: "Raideur résiduelle ou laxité minime persistante." } },
          { name: "Rupture du LCA opérée - Mauvais résultat (laxité résiduelle, raideur)", rate: [20, 35], description: "Échec de plastie avec laxité ou raideur persistante." },
          { name: "Rupture du LCP (Ligament Croisé Postérieur) non opérée", rate: [15, 30], description: "Laxité postérieure chronique, douleurs fémoro-patellaires." },
          { name: "Rupture du LCP opérée", rate: [10, 25] },
          { name: "Rupture du LLI (Ligament Latéral Interne) isolée", rate: [10, 20], description: "Laxité interne du genou après entorse grave." },
          { name: "Rupture du LLE (Ligament Latéral Externe) isolée", rate: [10, 20] },
          { name: "Laxité chronique multi-ligamentaire du genou (> 2 ligaments)", rate: [30, 50], description: "Genou très instable après traumatisme complexe (triade ou pentade ligamentaire).", rateCriteria: { low: "Instabilité modérée avec adaptation.", high: "Genou très instable, impossible de marcher sans attelle." } },
          { name: "Syndrome fémoro-patellaire post-traumatique (douleurs rotule)", rate: [10, 25], description: "Douleurs antérieures du genou après fracture rotule ou contusion.", rateCriteria: { low: "Douleurs mécaniques occasionnelles (escaliers, accroupissement).", high: "Douleurs quasi-permanentes, limitation majeure activités." } },
          { name: "Instabilité fémoro-patellaire (luxation récidivante de rotule)", rate: [15, 30], description: "Luxations récidivantes de la rotule.", rateCriteria: { low: "Subluxations occasionnelles, appréhension.", high: "Luxations fréquentes nécessitant réduction, limitation sévère." } },
          { name: "Chondropathie fémoro-patellaire post-traumatique", rate: [10, 30], description: "Lésions cartilagineuses de la rotule et/ou trochlée fémorale.", rateCriteria: { low: "Chondropathie grade I-II, douleurs mécaniques.", high: "Chondropathie grade III-IV, arthrose fémoro-patellaire." } },
          { name: "Arthrose fémoro-tibiale médiale (compartiment interne) post-traumatique", rate: [20, 40], description: "Arthrose du compartiment médial du genou.", rateCriteria: { low: "Arthrose débutante, douleurs mécaniques, mobilité conservée.", high: "Arthrose évoluée avec déviation en varus, douleurs permanentes, indication d'ostéotomie ou prothèse." } },
          { name: "Arthrose fémoro-tibiale latérale (compartiment externe) post-traumatique", rate: [20, 40] },
          { name: "Arthrose fémoro-tibiale tri-compartimentale (globale)", rate: [30, 60], description: "Arthrose touchant les 3 compartiments (médial, latéral, fémoro-patellaire).", rateCriteria: { low: "Arthrose modérée, mobilité conservée.", high: "Arthrose sévère, raideur majeure, indication prothèse totale de genou." } },
          { name: "Prothèse totale de genou (PTG) bien fonctionnelle", rate: [25, 40], description: "Prothèse bien tolérée après échec de traitement conservateur." },
          { name: "Prothèse totale de genou (PTG) avec complications", rate: [40, 70], description: "Infection, descellement, raideur sévère, douleurs persistantes." },
          { name: "Prothèse uni-compartimentale de genou (PUC)", rate: [15, 30], description: "Prothèse partielle (1 compartiment seulement)." },
          { name: "Ankylose du genou en extension complète", rate: [30, 40], description: "Position la plus fonctionnelle pour la marche." },
          { name: "Ankylose du genou en flexion légère (10-20°)", rate: [40, 50] },
          { name: "Ankylose du genou en flexion > 30°", rate: [50, 70], description: "Position très invalidante, marche très difficile." },
          { name: "Raideur du genou post-traumatique (sans arthrose)", rate: [10, 35], rateCriteria: { low: "Flexion > 110°, extension complète.", medium: "Flexion 70-110° et/ou flexum < 10°.", high: "Flexion < 70° ou flexum > 15°." } },
          { name: "Kyste de Baker (poplité) chronique post-traumatique", rate: [5, 15], description: "Kyste synovial du creux poplité, gênant et douloureux." },
          { name: "Tendinopathie rotulienne chronique (tendinite rotulienne, jumper's knee)", rate: [5, 20], description: "Tendinopathie du tendon rotulien post-traumatique.", rateCriteria: { low: "Douleurs d'effort occasionnelles.", high: "Douleurs quasi-permanentes, limitation activités sportives et professionnelles." } },
          { name: "Tendinopathie quadricipitale chronique post-traumatique", rate: [5, 20] },
          { name: "Rupture du tendon quadricipital opérée", rate: [20, 40], description: "Après suture chirurgicale, perte de force d'extension variable.", rateCriteria: { low: "Récupération quasi-complète, déficit de force < 20%.", high: "Déficit de force > 50%, boiterie, difficulté escaliers." } },
          { name: "Rupture du tendon rotulien opérée", rate: [25, 45], description: "Plus invalidante que rupture quadricipitale." },
        ]
      },
      {
        name: "Cheville et Pied - Lésions Détaillées",
        injuries: [
          { name: "Entorse grave de cheville avec laxité chronique", rate: [10, 25], description: "Laxité ligamentaire persistante après entorse sévère (grade II-III).", rateCriteria: { low: "Laxité modérée, instabilité occasionnelle.", high: "Instabilité majeure, entorses à répétition, impossibilité sport." } },
          { name: "Rupture du tendon d'Achille opérée - Bon résultat", rate: [10, 20], description: "Récupération fonctionnelle satisfaisante après suture." },
          { name: "Rupture du tendon d'Achille opérée - Mauvais résultat", rate: [20, 35], description: "Allongement tendineux, perte de force du triceps, boiterie." },
          { name: "Rupture du tendon jambier (tibial antérieur ou postérieur) opérée", rate: [10, 20], description: "Rupture du tendon tibial antérieur ou postérieur avec suture chirurgicale. Taux basé sur analogie avec péronniers latéraux (barème officiel 10-20%).", rateCriteria: { low: "Bon résultat fonctionnel, récupération satisfaisante, marche quasi-normale.", high: "Perte de force importante, steppage (tibial antérieur) ou affaissement voûte plantaire (tibial postérieur), boiterie persistante." } },
          { name: "Tendinopathie d'Achille chronique calcifiante post-traumatique", rate: [10, 25], description: "Tendinopathie chronique rebelle avec calcifications." },
          { name: "Arthrose tibio-tarsienne (cheville) post-traumatique", rate: [20, 40], description: "Arthrose de cheville après fracture bi- ou tri-malléolaire ou du pilon tibial.", rateCriteria: { low: "Arthrose débutante, raideur modérée, douleurs mécaniques.", high: "Arthrose sévère, raideur majeure, douleurs quasi-permanentes, indication arthrodèse ou prothèse." } },
          { name: "Arthrodèse tibio-tarsienne (cheville bloquée)", rate: [25, 40], description: "Fusion chirurgicale de la cheville en bonne position." },
          { name: "Prothèse totale de cheville", rate: [25, 45], description: "Prothèse de cheville, résultats moins bons qu'aux autres articulations.", rateCriteria: { low: "Prothèse fonctionnelle, mobilité conservée.", high: "Complications (instabilité, douleurs, descellement)." } },
          { name: "Syndrome du tunnel tarsien (compression nerf tibial postérieur)", rate: [10, 25], description: "Compression du nerf tibial postérieur dans le tunnel tarsien (face interne cheville).", rateCriteria: { low: "Paresthésies plantaires intermittentes.", high: "Douleurs neuropathiques permanentes, hypoesthésie plantaire invalidante." } },
          { name: "Aponévrosite plantaire (fasciite plantaire) chronique post-traumatique", rate: [5, 15], description: "Inflammation chronique de l'aponévrose plantaire, douleurs talalgies.", rateCriteria: { low: "Douleurs matinales résiduelles.", high: "Douleurs quasi-permanentes à la marche, limitation majeure." } },
          { name: "Épine calcanéenne (exostose calcanéenne) symptomatique post-traumatique", rate: [5, 15], description: "Excroissance osseuse douloureuse du calcanéus." },
          { name: "Pseudarthrose du scaphoïde tarsien (naviculaire)", rate: [15, 30], description: "Non-consolidation du scaphoïde tarsien avec douleurs et arthrose secondaire." },
          { name: "Arthrose sous-talienne (sous-astragalienne) post-traumatique", rate: [15, 30], description: "Arthrose de l'articulation sous-astragalienne après fracture du calcanéus.", rateCriteria: { low: "Arthrose débutante, raideur modérée en inversion-éversion.", high: "Arthrose évoluée, pied raide et douloureux, indication arthrodèse." } },
          { name: "Arthrodèse sous-talienne (triple arthrodèse)", rate: [20, 35], description: "Fusion chirurgicale de l'arrière-pied." },
          { name: "Déformation du pied en varus ou valgus post-traumatique", rate: [15, 40], description: "Déviation axiale du pied créant troubles statiques et marche pathologique.", rateCriteria: { low: "Déformation modérée compensée par orthèse.", high: "Déformation majeure, appui douloureux, boiterie importante." } },
          { name: "Pied plat post-traumatique (effondrement de l'arche plantaire)", rate: [10, 30], description: "Pied plat acquis après rupture du tibial postérieur ou fracture tarse.", rateCriteria: { low: "Pied plat réductible, peu symptomatique.", high: "Pied plat irréductible douloureux, impossibilité de marcher sans orthèse." } },
          { name: "Pied creux post-traumatique", rate: [10, 30], description: "Accentuation de la voûte plantaire après lésion neurologique." },
          { name: "Pied équin post-traumatique", rate: [20, 40], description: "Pied en flexion plantaire permanente (marche sur la pointe), après rétraction tendineuse ou lésion neurologique." },
          { name: "Hallux valgus (oignon) post-traumatique symptomatique", rate: [5, 15], description: "Déviation du gros orteil vers l'extérieur avec bursite et douleurs." },
          { name: "Hallux rigidus (arthrose métatarso-phalangienne du gros orteil) post-traumatique", rate: [10, 20], description: "Arthrose de la base du gros orteil avec limitation douloureuse de la flexion dorsale.", rateCriteria: { low: "Arthrose débutante, raideur modérée.", high: "Arthrose sévère, quasi-ankylose, indication arthrodèse MTP." } },
          { name: "Métatarsalgie chronique post-traumatique", rate: [5, 20], description: "Douleurs plantaires sous les têtes métatarsiennes à la marche.", rateCriteria: { low: "Douleurs occasionnelles, soulagées par semelles.", high: "Douleurs quasi-permanentes, limitation majeure de la marche." } },
          { name: "Névrome de Morton post-traumatique", rate: [8, 20], description: "Névrome du nerf interdigital plantaire (entre 3ème et 4ème orteil généralement), douleurs à type de décharge électrique.", rateCriteria: { low: "Douleurs occasionnelles.", high: "Douleurs fréquentes invalidantes, échec des traitements conservateurs." } },
          { name: "Amputation trans-métatarsienne", rate: [25, 35], description: "Amputation de l'avant-pied au niveau des métatarsiens." },
          { name: "Amputation de Chopart (médio-tarsienne)", rate: [35, 45], description: "Amputation au niveau de l'articulation médio-tarsienne." },
          { name: "Amputation de Syme (désarticulation cheville)", rate: [40, 50], description: "Amputation au niveau de la cheville conservant le talon." },
          { name: "Amputation du gros orteil (hallux)", rate: [8, 15], description: "Perte du gros orteil, retentissement sur propulsion et équilibre." },
          { name: "Amputation de 2 orteils (dont le gros orteil)", rate: [12, 20] },
          { name: "Amputation de 3 orteils ou plus (dont le gros orteil)", rate: [15, 25] },
          { name: "Amputation orteil (autre que gros orteil)", rate: [2, 5], description: "Perte d'un orteil latéral, peu invalidant." },
        ]
      }
    ]
  }
];
