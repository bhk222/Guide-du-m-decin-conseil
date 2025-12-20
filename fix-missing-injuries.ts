/**
 * Script pour ajouter les lésions manquantes détectées par la validation IA
 * Version: 1.0.0
 * Date: 20/12/2025
 */

// Liste exhaustive des lésions manquantes à ajouter au barème
const missingInjuries = {
  // ===== DOIGTS =====
  doigts_medius: [
    { name: "Amputation du médius (main dominante)", rate: 10, category: "Doigts - Médius (Main Dominante)" },
    { name: "Amputation du médius (3 phalanges) (Main Dominante)", rate: 12, category: "Doigts - Médius (Main Dominante)" },
    { name: "Amputation du médius (main non dominante)", rate: 8, category: "Doigts - Médius (Main Non Dominante)" },
    { name: "Raideur du médius (Main Dominante)", rate: [2, 5], category: "Doigts - Médius (Main Dominante)" },
    { name: "Raideur du médius (Main Non Dominante)", rate: [1, 4], category: "Doigts - Médius (Main Non Dominante)" },
    { name: "Ankylose de l'annulaire (totalité) (Main Dominante)", rate: 10, category: "Doigts - Annulaire (Main Dominante)" },
    { name: "Ankylose de l'annulaire (totalité) (Main Non Dominante)", rate: 8, category: "Doigts - Annulaire (Main Non Dominante)" },
    { name: "Ankylose de l'auriculaire (totalité) (Main Dominante)", rate: 8, category: "Doigts - Auriculaire (Main Dominante)" },
    { name: "Ankylose de l'auriculaire (totalité) (Main Non Dominante)", rate: 6, category: "Doigts - Auriculaire (Main Non Dominante)" },
  ],

  doigts_annulaire: [
    { name: "Amputation de l'annulaire (main dominante)", rate: 8, category: "Doigts - Annulaire (Main Dominante)" },
    { name: "Amputation de l'annulaire (3 phalanges) (Main Dominante)", rate: 10, category: "Doigts - Annulaire (Main Dominante)" },
    { name: "Amputation de l'annulaire (main non dominante)", rate: 6, category: "Doigts - Annulaire (Main Non Dominante)" },
    { name: "Raideur de l'annulaire (Main Dominante)", rate: [2, 4], category: "Doigts - Annulaire (Main Dominante)" },
    { name: "Raideur de l'annulaire (Main Non Dominante)", rate: [1, 3], category: "Doigts - Annulaire (Main Non Dominante)" },
  ],

  doigts_auriculaire: [
    { name: "Amputation de l'auriculaire (main dominante)", rate: 6, category: "Doigts - Auriculaire (Main Dominante)" },
    { name: "Amputation de l'auriculaire (3 phalanges) (Main Dominante)", rate: 8, category: "Doigts - Auriculaire (Main Dominante)" },
    { name: "Amputation de l'auriculaire (main non dominante)", rate: 5, category: "Doigts - Auriculaire (Main Non Dominante)" },
    { name: "Raideur de l'auriculaire (Main Dominante)", rate: [1, 3], category: "Doigts - Auriculaire (Main Dominante)" },
    { name: "Raideur de l'auriculaire (Main Non Dominante)", rate: [1, 2], category: "Doigts - Auriculaire (Main Non Dominante)" },
  ],

  doigts_cumul: [
    { name: "Amputation de deux doigts (hors pouce)", rate: 15, category: "Main - Amputation des Doigts" },
    { name: "Amputation de trois doigts dont le pouce", rate: 35, category: "Main - Amputation des Doigts" },
  ],

  // ===== ORTEILS =====
  orteils: [
    { name: "Amputation de deux orteils (dont le gros orteil)", rate: 12, category: "Orteils - Amputations" },
    { name: "Amputation de trois orteils ou plus (dont le gros orteil)", rate: 15, category: "Orteils - Amputations" },
    { name: "Ankylose du gros orteil", rate: 5, category: "Orteils - Raideurs" },
    { name: "Ankylose d'un orteil (autre que gros orteil)", rate: 2, category: "Orteils - Raideurs" },
    { name: "Raideur du gros orteil", rate: [2, 4], category: "Orteils - Raideurs" },
    { name: "Hallux valgus post-traumatique symptomatique", rate: [5, 15], category: "Orteils - Déformations" },
    { name: "Griffes des orteils post-traumatiques", rate: [5, 10], category: "Orteils - Déformations" },
    { name: "Cal vicieux d'un métatarsien", rate: [5, 10], category: "Orteils - Fractures" },
    { name: "Amputation de l'avant-pied (Chopart)", rate: 35, category: "Orteils - Amputations" },
  ],

  // ===== AMPUTATIONS MEMBRES =====
  amputations: [
    { name: "Désarticulation de la cheville (Syme)", rate: 40, category: "Amputations" },
    { name: "Amputation de la jambe au tiers moyen", rate: 50, category: "Amputations" },
    { name: "Amputation de la jambe au tiers inférieur", rate: 45, category: "Amputations" },
    { name: "Amputation du bras au tiers supérieur (Main Dominante)", rate: [80, 85], category: "Amputations" },
    { name: "Amputation du bras au tiers supérieur (Main Non Dominante)", rate: [70, 75], category: "Amputations" },
    { name: "Désarticulation de l'épaule (Main Dominante)", rate: [85, 90], category: "Amputations" },
    { name: "Désarticulation de l'épaule (Main Non Dominante)", rate: [75, 80], category: "Amputations" },
  ],

  // ===== VISCÈRES =====
  visceres: [
    { name: "Splénectomie totale (ablation de la rate)", rate: 18, category: "Abdomen et Viscères" },
    { name: "Néphrectomie unilatérale (rein unique restant normal)", rate: 30, category: "Abdomen et Viscères" },
    { name: "Colectomie partielle", rate: [15, 30], category: "Abdomen et Viscères" },
    { name: "Éventration abdominale", rate: [10, 30], category: "Abdomen et Viscères" },
    { name: "Hépatectomie partielle", rate: [10, 40], category: "Abdomen et Viscères" },
    { name: "Anus artificiel définitif", rate: [80, 90], category: "Abdomen et Viscères" },
    { name: "Fistule digestive chronique", rate: [20, 50], category: "Abdomen et Viscères" },
  ],

  // ===== AUDITION =====
  audition: [
    { name: "Surdité complète d'une oreille (l'autre étant normale)", rate: 20, category: "Audition" },
  ],

  // ===== VISION =====
  vision: [
    { name: "Champ visuel et vision binoculaire - Rétrécissement du champ visuel", rate: [10, 30], category: "Yeux - Champ Visuel" },
    { name: "Décollement de rétine (selon résultat)", rate: [0, 100], category: "Yeux - Lésions Spécifiques" },
    { name: "Taie cornéenne", rate: [0, 100], category: "Yeux - Lésions Spécifiques" },
    { name: "Hémianopsie latérale homonyme complète", rate: [30, 35], category: "Yeux - Champ Visuel" },
    { name: "Atrophie optique", rate: [30, 80], category: "Yeux - Lésions Spécifiques" },
    { name: "Endophtalmie", rate: [10, 35], category: "Yeux - Lésions Spécifiques" },
    { name: "Hémorragie du vitré", rate: [0, 100], category: "Yeux - Lésions Spécifiques" },
    { name: "Cécité absolue", rate: 100, category: "Yeux - Cécité" },
  ],
};

console.log("=== LÉSIONS MANQUANTES À AJOUTER AU BARÈME ===\n");

let totalMissing = 0;
Object.entries(missingInjuries).forEach(([category, injuries]) => {
  console.log(`📂 ${category}: ${injuries.length} lésions`);
  injuries.forEach((injury: any) => {
    const rateStr = Array.isArray(injury.rate) 
      ? `[${injury.rate[0]}-${injury.rate[1]}%]` 
      : `${injury.rate}%`;
    console.log(`   ✓ ${injury.name} - ${rateStr}`);
    totalMissing++;
  });
  console.log();
});

console.log(`\n📊 TOTAL: ${totalMissing} lésions manquantes à ajouter\n`);
console.log("⚠️ Ces lésions doivent être ajoutées manuellement à data/disabilityRates.ts\n");
console.log("📝 Instructions:");
console.log("1. Ouvrir data/disabilityRates.ts");
console.log("2. Localiser les sous-catégories appropriées");
console.log("3. Ajouter les lésions manquantes dans les tableaux injuries[]");
console.log("4. Tester avec npm run test:validation\n");
