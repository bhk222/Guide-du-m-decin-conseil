// Quick test for overlap scoring
const seqSig = ['fracture', 'metatarse', 'phalanges', 'pied'];
const injSig = ['fracture', 'cotyle', 'deplacement', 'hanche', 'congruente'];
const overlap = seqSig.filter(w => injSig.some(iw => {
    if (iw === w) return true;
    if (w.length >= 5 && iw.length >= 5) return iw.includes(w) || w.includes(iw);
    return false;
}));
console.log('overlap:', overlap, 'baseScore:', overlap.length > 0 ? Math.round(overlap.length / Math.max(seqSig.length, 1) * 20) : 0);

// Also test: "Limitation fonctionnelle (douleurs montée escaliers)" vs "Raideur cheville avec limitation fonctionnelle"
const seqSig2 = ['limitation', 'fonctionnelle', 'douleurs', 'montee', 'escaliers'];
const injSig2 = ['raideur', 'cheville', 'limitation', 'fonctionnelle'];
const overlap2 = seqSig2.filter(w => injSig2.some(iw => {
    if (iw === w) return true;
    if (w.length >= 5 && iw.length >= 5) return iw.includes(w) || w.includes(iw);
    return false;
}));
console.log('overlap2:', overlap2, 'baseScore2:', overlap2.length > 0 ? Math.round(overlap2.length / Math.max(seqSig2.length, 1) * 20) : 0);
