// Test filtrage anatomique strict mandibulaire vs clavicule

const normalize = (text) => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[-']/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
};

const testCases = [
    {
        text: "double fracture mandibulaire",
        shouldBlock: {
            "Ceinture Scapulaire": true,  // DOIT bloquer clavicule
            "Séquelles Maxillo-Faciales": false // NE DOIT PAS bloquer mandibulaire
        }
    },
    {
        text: "fracture de la clavicule",
        shouldBlock: {
            "Ceinture Scapulaire": false,  // NE DOIT PAS bloquer clavicule
            "Séquelles Maxillo-Faciales": false // NE DOIT PAS bloquer mandibulaire
        }
    },
    {
        text: "fracture mâchoire inférieure",
        shouldBlock: {
            "Ceinture Scapulaire": true,  // DOIT bloquer clavicule
            "Séquelles Maxillo-Faciales": false
        }
    }
];

console.log("=== TEST FILTRAGE ANATOMIQUE STRICT ===\n");

testCases.forEach(({ text, shouldBlock }) => {
    const normalized = normalize(text);
    const hasMandibularContext = /mandibul(aire|e)|m[âa]choire/i.test(normalized);
    
    console.log(`📝 Texte: "${text}"`);
    console.log(`   hasMandibularContext: ${hasMandibularContext}\n`);
    
    Object.entries(shouldBlock).forEach(([category, expectedBlock]) => {
        const subName = normalize(category);
        const isScapulaireCat = subName.includes('ceinture scapulaire') || subName.includes('clavicule') || subName.includes('omoplate');
        const wouldBlock = hasMandibularContext && isScapulaireCat;
        
        const status = wouldBlock === expectedBlock ? "✅" : "❌";
        console.log(`   ${status} "${category}"`);
        console.log(`      Devrait bloquer: ${expectedBlock}, Bloque réellement: ${wouldBlock}`);
    });
    console.log("");
});

console.log("=== RÉSULTAT ATTENDU ===");
console.log("✅ 'double fracture mandibulaire' → BLOQUE Ceinture Scapulaire");
console.log("✅ 'fracture de la clavicule' → NE BLOQUE PAS Ceinture Scapulaire");
console.log("✅ 'fracture mâchoire inférieure' → BLOQUE Ceinture Scapulaire");
