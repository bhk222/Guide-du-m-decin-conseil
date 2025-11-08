// Script de test automatique pour 10 cas cliniques
// Exécution : node test-10-cas.js

const fs = require('fs');
const path = require('path');

// Import du module d'analyse (simulé car build nécessaire)
console.log('🤖 TEST AUTOMATIQUE - 10 CAS CLINIQUES\n');
console.log('Version: V3.3.25');
console.log('Date:', new Date().toLocaleDateString('fr-FR'));
console.log('='.repeat(80));

const cas = [
    {
        id: 1,
        nom: "Fracture poignet avec raideur",
        description: "Ouvrier de 45 ans, chute d'échelle. Fracture de Pouteau-Colles du poignet droit (main dominante) opérée, consolidée mais raideur résiduelle avec limitation flexion-extension à 50% et douleurs EVA 4/10 lors des efforts de préhension.",
        ippAttendu: "20-30%",
        criteres: ["fracture", "poignet", "raideur", "main dominante"]
    },
    {
        id: 2,
        nom: "Entorse cheville sévère",
        description: "Footballeur 28 ans, entorse grave de la cheville gauche avec rupture ligamentaire externe, instabilité chronique malgré rééducation, boiterie et impossibilité de reprendre le sport. Gonflement persistant et douleur EVA 5/10 à la marche prolongée.",
        ippAttendu: "15-25%",
        criteres: ["entorse", "cheville", "instabilité", "rupture ligamentaire"]
    },
    {
        id: 3,
        nom: "Hernie discale opérée",
        description: "Manutentionnaire 52 ans, hernie discale L5-S1 opérée il y a 6 mois (discectomie), consolidation obtenue mais lombalgies résiduelles EVA 6/10, limitation flexion antérieure à 30°, impossibilité port de charges > 5 kg, claudication à la marche après 500m.",
        ippAttendu: "15-30%",
        criteres: ["hernie discale", "lombaire", "opérée", "limitation"]
    },
    {
        id: 4,
        nom: "Brûlures visage 2e-3e degré",
        description: "Accident domestique avec explosion gaz. Brûlures faciales 2e et 3e degré touchant front, joues et cou sur 8% surface corporelle. Greffes cutanées réalisées. Séquelles : cicatrices chéloïdes défigurantes, rétraction commissure labiale droite, troubles anxieux avec cauchemars récurrents.",
        ippAttendu: "35-50%",
        criteres: ["brûlures", "visage", "défigurant", "trouble anxieux"]
    },
    {
        id: 5,
        nom: "Amputation doigt index",
        description: "Menuisier 38 ans, accident scie circulaire. Amputation traumatique index droit (main dominante) au niveau P2 (phalange moyenne). Moignon bien cicatrisé, pas de douleur neuropathique, mais gêne fonctionnelle importante pour préhension fine et travail manuel.",
        ippAttendu: "12-15%",
        criteres: ["amputation", "index", "P2", "main dominante"]
    },
    {
        id: 6,
        nom: "Paralysie plexus brachial",
        description: "Accident moto avec chute sur épaule. Atteinte du tronc supérieur du plexus brachial droit (Duchenne-Erb C5-C6). Déficit moteur deltoïde et biceps, limitation abduction épaule à 60°, impossibilité porter main à la bouche sans aide, amyotrophie visible.",
        ippAttendu: "45-55%",
        criteres: ["plexus brachial", "Duchenne-Erb", "paralysie", "déficit moteur"]
    },
    {
        id: 7,
        nom: "Fracture clavicule sans raideur",
        description: "Cycliste 32 ans, chute avec fracture clavicule gauche (non dominante), consolidation anatomique parfaite, pas de cal vicieux, mobilité épaule complète, pas de douleur résiduelle, reprise activité sportive sans limitation.",
        ippAttendu: "1-2%",
        criteres: ["fracture", "clavicule", "sans raideur", "consolidation parfaite"]
    },
    {
        id: 8,
        nom: "Rupture coiffe rotateurs",
        description: "Peintre en bâtiment 48 ans, rupture transfixiante sus-épineux et sous-épineux épaule droite (dominante) après chute. Chirurgie réparatrice effectuée mais récupération partielle. Limitation abduction active à 90°, douleurs nocturnes EVA 5/10, impossibilité travaux en hauteur.",
        ippAttendu: "20-35%",
        criteres: ["rupture", "coiffe rotateurs", "sus-épineux", "limitation"]
    },
    {
        id: 9,
        nom: "Cataracte bilatérale",
        description: "Soudeur 50 ans, brûlures oculaires arc électrique. Cataracte bilatérale opérée avec implants. Résultat : acuité visuelle OD 5/10, OG 6/10 avec correction. Gêne pour travaux de précision, éblouissement, impossibilité conduite nocturne.",
        ippAttendu: "45-55%",
        criteres: ["cataracte", "acuité visuelle", "OD 5/10", "OG 6/10"]
    },
    {
        id: 10,
        nom: "Fracture bassin + nerf sciatique",
        description: "Accident voiture avec polytraumatisme. Fracture complexe bassin (cadre obturateur + disjonction sacro-iliaque) et lésion nerf sciatique gauche associée. Consolidation osseuse obtenue mais sciatalgie chronique L5-S1, déficit moteur releveurs pied (steppage), périmètre marche limité 300m.",
        ippAttendu: "50-65% (cumul Balthazard)",
        criteres: ["fracture bassin", "nerf sciatique", "cumul", "steppage"]
    }
];

console.log('\n📋 RÉSUMÉ DES CAS À TESTER:\n');

cas.forEach(c => {
    console.log(`CAS ${c.id}: ${c.nom}`);
    console.log(`  Description: ${c.description.substring(0, 100)}...`);
    console.log(`  IPP Attendu: ${c.ippAttendu}`);
    console.log(`  Critères clés: ${c.criteres.join(', ')}`);
    console.log('');
});

console.log('='.repeat(80));
console.log('\n💡 INSTRUCTIONS POUR EXÉCUTER LES TESTS:\n');
console.log('1. Ouvrir l\'application web: https://guide-medecin-conseil-8yrnjr5p8-bhk222s-projects.vercel.app');
console.log('2. Aller dans "IA Exclusive" ou "Guide IA"');
console.log('3. Copier-coller chaque description ci-dessus');
console.log('4. Comparer le résultat IPP avec l\'IPP attendu');
console.log('\n📊 Les résultats seront consignés dans TEST_10_CAS_RESULTATS.md\n');

// Générer fichier de résultats
const resultatsTemplate = `# Résultats Test 10 Cas Cliniques

**Date** : ${new Date().toLocaleDateString('fr-FR')}
**Version** : V3.3.25
**URL** : https://guide-medecin-conseil-8yrnjr5p8-bhk222s-projects.vercel.app

---

${cas.map(c => `
## CAS ${c.id}: ${c.nom}

### Description
\`\`\`
${c.description}
\`\`\`

### IPP Attendu
**${c.ippAttendu}**

### Résultat IA
- **Lésion détectée** : _[À remplir]_
- **IPP calculé** : _[À remplir]_
- **Justification** : _[À remplir]_

### Validation
- [ ] Lésion correctement identifiée
- [ ] IPP dans la fourchette attendue
- [ ] Justification cohérente
- [ ] Pas d'erreur de calcul

### Commentaires
_[À remplir]_

---
`).join('\n')}

## 📊 Récapitulatif

| Cas | Lésion | IPP Attendu | IPP Calculé | Écart | Validité |
|-----|--------|-------------|-------------|-------|----------|
${cas.map(c => `| ${c.id} | ${c.nom} | ${c.ippAttendu} | _[À remplir]_ | _[À remplir]_ | ⏳ |`).join('\n')}

## 🎯 Taux de réussite

- **Total cas** : 10
- **Réussis** : _[À remplir]_
- **Écarts acceptables** : _[À remplir]_
- **Échecs** : _[À remplir]_
- **Taux de succès** : _[À remplir]_ %

---

## 📝 Notes et observations

_[À remplir après test manuel]_
`;

fs.writeFileSync(
    path.join(__dirname, 'TEST_10_CAS_RESULTATS.md'),
    resultatsTemplate,
    'utf8'
);

console.log('✅ Fichier TEST_10_CAS_RESULTATS.md généré avec succès!\n');
console.log('🔍 Les 10 cas sont prêts à être testés manuellement dans l\'application web.\n');
