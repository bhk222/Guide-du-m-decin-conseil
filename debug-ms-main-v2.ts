const text1 = "amputation pouce main dominante sans possibilité préhension pollici digitale opposition impossible";
const text2 = "amputation index main dominante niveau articulation métacarpo phalangienne MP2";

const rule1 = {
    pattern: /amputation.*pouce.*main.*dominante/i,
    context: /sans.*possibilité.*préhension|sans.*préhension|préhension.*impossible/i
};

const rule2 = {
    pattern: /amputation.*index.*main.*dominante/i,
    context: /niveau.*articulation.*métacarpo|métacarpo.*phalangienne|niveau.*mcp/i
};

console.log("🔍 DEBUG MS-MAIN EXPERT RULES");
console.log("\n📍 CAS POUCE:");
console.log("   Texte:", text1);
console.log("   Pattern match:", rule1.pattern.test(text1));
console.log("   Context match:", rule1.context.test(text1));
console.log("   RULE APPLIES:", rule1.pattern.test(text1) && rule1.context.test(text1));

console.log("\n📍 CAS INDEX:");
console.log("   Texte:", text2);
console.log("   Pattern match:", rule2.pattern.test(text2));
console.log("   Context match:", rule2.context.test(text2));
console.log("   RULE APPLIES:", rule2.pattern.test(text2) && rule2.context.test(text2));