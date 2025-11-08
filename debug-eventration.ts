const text = "éventration post traumatique pariétale avec hernie importante nécessitant ceinture contention";

const rule = {
    pattern: /[eé]ventration.*post.*traumatique|[eé]ventration.*pari[eé]tale/i,
    context: /hernie|contention|ceinture|paro[ií]|abdomen/i
};

console.log("🔍 DEBUG ÉVENTRATION EXPERT RULE");
console.log("   Texte:", text);
console.log("   Pattern match:", rule.pattern.test(text));
console.log("   Context match:", rule.context.test(text));
console.log("   RULE APPLIES:", rule.pattern.test(text) && rule.context.test(text));