/**
 * DÉMONSTRATION DES ABRÉVIATIONS MÉDICALES
 * ========================================
 * 
 * Cas réels d'utilisation par des médecins conseil CNAS
 */

import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

interface DemoCase {
    input: string;
    context: string;
}

const demoCases: DemoCase[] = [
    {
        input: "Fx d2 main droite suite AT",
        context: "Fracture du doigt 2 (index) - Accident de Travail"
    },
    {
        input: "Trauma crânien AVP avec céphalées",
        context: "Traumatisme crânien - Accident de la Voie Publique"
    },
    {
        input: "Amputation o1 pied droit",
        context: "Amputation orteil 1 (hallux/gros orteil)"
    },
    {
        input: "Entorse C6 whiplash",
        context: "Vertèbre cervicale C6 - Coup du lapin"
    },
    {
        input: "Hernie discale L4-L5",
        context: "Hernie entre vertèbres lombaires L4 et L5"
    },
    {
        input: "DMS à 20cm, limitation importante",
        context: "Distance Mains-Sol (test de flexibilité rachidienne)"
    },
    {
        input: "Rupture LCA genou droit post-traumatique",
        context: "Rupture Ligament Croisé Antérieur"
    },
    {
        input: "Entorse LLI cheville gauche grade 2",
        context: "Ligament Latéral Interne de la cheville"
    },
    {
        input: "Laxité LCP et LLE genou",
        context: "Ligaments Croisé Postérieur et Latéral Externe"
    },
    {
        input: "Compression nerf med canal carpien",
        context: "Nerf médian au canal carpien"
    },
    {
        input: "Paralysie nerf cub coude gauche",
        context: "Nerf cubital (ulnaire) au niveau du coude"
    },
    {
        input: "SPI L5 avec déficit moteur",
        context: "Sciatique Paralysante Interne L5"
    },
    {
        input: "PTH après fracture col fémoral",
        context: "Prothèse Totale de Hanche"
    },
    {
        input: "PTG arthrose sévère",
        context: "Prothèse Totale de Genou"
    },
    {
        input: "Limitation flex et ext genou",
        context: "Flexion et extension limitées"
    },
    {
        input: "Abd limitée épaule à 90°",
        context: "Abduction de l'épaule"
    },
    {
        input: "Rot int douloureuse hanche",
        context: "Rotation interne de la hanche"
    },
    {
        input: "Fx L3 avec cons vicieuse, DMS 25cm, flex limitée",
        context: "Fracture L3 avec consolidation vicieuse"
    },
    {
        input: "AVP j15 : trauma crânien + fx C5 + rupture LCA genou d",
        context: "Polytraumatisme à J15 (jour 15)"
    },
    {
        input: "AT m3 : pseudart d4 md malgré osteosynthese",
        context: "Pseudarthrose doigt 4 main droite à M3 (mois 3)"
    }
];

console.log("═══════════════════════════════════════════════════════════════");
console.log("       DÉMONSTRATION ABRÉVIATIONS MÉDICALES - MÉDECINS CNAS");
console.log("═══════════════════════════════════════════════════════════════\n");

demoCases.forEach((demoCase, index) => {
    console.log(`\n[${index + 1}/${demoCases.length}] ${demoCase.context}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📋 Saisie médecin: "${demoCase.input}"`);
    
    const result = comprehensiveSingleLesionAnalysis(demoCase.input);
    
    if (result.type === 'proposal') {
        console.log(`✅ DÉTECTÉ: ${result.name}`);
        console.log(`   📊 IPP: ${result.rate}%`);
        console.log(`   🔍 Catégorie: ${result.path}`);
    } else if (result.type === 'ambiguity') {
        console.log(`⚠️  AMBIGUÏTÉ: ${result.choices.length} choix possibles`);
        result.choices.slice(0, 3).forEach((choice, idx) => {
            console.log(`   ${idx + 1}. ${choice.name} (${choice.rate}%)`);
        });
        if (result.choices.length > 3) {
            console.log(`   ... et ${result.choices.length - 3} autres`);
        }
    } else {
        console.log(`❌ Non détecté automatiquement`);
    }
});

console.log("\n\n═══════════════════════════════════════════════════════════════");
console.log("  ✅ ABRÉVIATIONS MÉDICALES IMPLÉMENTÉES");
console.log("═══════════════════════════════════════════════════════════════");
console.log(`
CONTEXTE ACCIDENT:
  • AT  = Accident de Travail
  • AVP = Accident de la Voie Publique
  • MP  = Maladie Professionnelle

ANATOMIE - DOIGTS ET ORTEILS:
  • d1, d2, d3, d4, d5 = Doigts (1=pouce, 2=index, 3=médius, 4=annulaire, 5=auriculaire)
  • o1, o2, o3, o4, o5 = Orteils (1=hallux/gros orteil, 2-5=autres orteils)

LATÉRALITÉ:
  • MG/MD = Main Gauche/Droite
  • PG/PD = Pied Gauche/Droit
  • JG/JD = Jambe Gauche/Droite
  • BG/BD = Bras Gauche/Droit

RACHIS:
  • C1-C7   = Vertèbres Cervicales
  • D1-D12  = Vertèbres Dorsales (thoraciques)
  • L1-L5   = Vertèbres Lombaires
  • S1-S5   = Vertèbres Sacrées

MESURES CLINIQUES:
  • DMS     = Distance Mains-Sol
  • Schober = Indice de Schober
  • Flessum = Limitation d'extension
  • FBE     = Flexion Buste En avant

LIGAMENTS:
  • LCA = Ligament Croisé Antérieur
  • LCP = Ligament Croisé Postérieur
  • LLI = Ligament Latéral Interne
  • LLE = Ligament Latéral Externe

NERFS:
  • nerf med = nerf médian
  • nerf cub = nerf cubital (ulnaire)
  • nerf rad = nerf radial
  • nerf sci = nerf sciatique
  • SPE/SPI  = Sciatique Paralysante Externe/Interne

EXAMENS:
  • IRM = Imagerie par Résonance Magnétique
  • TDM = Tomodensitométrie (scanner)
  • EMG = Électromyogramme
  • EEG = Électroencéphalogramme

INTERVENTIONS:
  • PTH = Prothèse Totale de Hanche
  • PTG = Prothèse Totale de Genou
  • PTE = Prothèse Totale d'Épaule

MOBILITÉ:
  • Flex    = Flexion
  • Ext     = Extension
  • Abd     = Abduction
  • Add     = Adduction
  • Rot int = Rotation interne
  • Rot ext = Rotation externe

CONSOLIDATION:
  • Cons      = Consolidation
  • Cal vic   = Cal vicieux
  • Pseudart  = Pseudarthrose

TEMPORALITÉ:
  • J1, J15, J30... = Jour 1, Jour 15, etc.
  • M1, M3, M6...   = Mois 1, Mois 3, etc.
  • S1, S2, S4...   = Semaine 1, 2, 4, etc.
`);

console.log("═══════════════════════════════════════════════════════════════\n");
