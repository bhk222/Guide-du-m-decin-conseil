// Debug: vérifier si expert rules matchent

const casLombaire = `tassement vertébral L3 avec cyphose 15 degrés raideur lombaire distance doigts-sol 30 cm flexion antérieure 30°`;

const casDorsal = `tassement vertébral D10 avec cyphose 20 degrés raideur rachis dorsal distance tragus-acromion 20 cm`;

// Règles expert
const ruleLombaire = {
    pattern: /tassement.*vertébral.*L\d+/i,
    context: /cyphose.*\d+.*degrés.*raideur.*lombaire|raideur.*lombaire.*cyphose/i
};

const ruleDorsal = {
    pattern: /tassement.*vertébral.*D\d+/i,
    context: /cyphose.*\d+.*degrés|raideur.*rachis.*dorsal/i
};

console.log("🔍 DEBUG EXPERT RULES RACHIS\n");

console.log("📍 CAS LOMBAIRE:");
console.log("   Texte:", casLombaire);
console.log("   Pattern match:", ruleLombaire.pattern.test(casLombaire));
console.log("   Context match:", ruleLombaire.context.test(casLombaire));
console.log("   RULE APPLIES:", ruleLombaire.pattern.test(casLombaire) && ruleLombaire.context.test(casLombaire));

console.log("\n📍 CAS DORSAL:");
console.log("   Texte:", casDorsal);
console.log("   Pattern match:", ruleDorsal.pattern.test(casDorsal));
console.log("   Context match:", ruleDorsal.context.test(casDorsal));
console.log("   RULE APPLIES:", ruleDorsal.pattern.test(casDorsal) && ruleDorsal.context.test(casDorsal));
