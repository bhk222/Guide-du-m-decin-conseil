/**
 * Levenshtein distance + recherche de termes proches
 * Algorithme Wagner-Fischer optimisé (2 rangées)
 */

export function levenshteinDistance(a: string, b: string): number {
    if (a === b) return 0;
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    // Optimisation : garder seulement 2 rangées
    let prev = new Array(b.length + 1);
    let curr = new Array(b.length + 1);

    for (let j = 0; j <= b.length; j++) prev[j] = j;

    for (let i = 1; i <= a.length; i++) {
        curr[0] = i;
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            curr[j] = Math.min(
                prev[j] + 1,       // suppression
                curr[j - 1] + 1,   // insertion
                prev[j - 1] + cost  // substitution
            );
        }
        [prev, curr] = [curr, prev];
    }

    return prev[b.length];
}

export function findClosestTerms(
    word: string,
    dictionary: Set<string>,
    maxDistance: number = 2,
    maxResults: number = 5
): string[] {
    const results: { term: string; distance: number }[] = [];
    const wordLen = word.length;

    for (const term of dictionary) {
        // Elagage rapide par différence de longueur
        if (Math.abs(term.length - wordLen) > maxDistance) continue;

        const dist = levenshteinDistance(word, term);
        if (dist > 0 && dist <= maxDistance) {
            results.push({ term, distance: dist });
        }
    }

    results.sort((a, b) => a.distance - b.distance);
    return results.slice(0, maxResults).map(r => r.term);
}
