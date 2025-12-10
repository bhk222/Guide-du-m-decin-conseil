const normalize = (str) => {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/œ/g, 'oe')
        .replace(/[-']/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
};

const searchTerm = "Perte complète de la vision d'un oeil (l'autre étant normal)";
const baremeEntry = "Perte complète de la vision d'un oeil (l'autre étant normal)";

console.log("SearchTerm normalized:", JSON.stringify(normalize(searchTerm)));
console.log("Bareme normalized:    ", JSON.stringify(normalize(baremeEntry)));
console.log("Match:", normalize(searchTerm) === normalize(baremeEntry));
