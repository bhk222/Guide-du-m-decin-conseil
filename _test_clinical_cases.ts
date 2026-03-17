import { localExpertAnalysis } from './components/AiAnalyzer';

const cases = [
    {
        id: 1,
        desc: 'Entorse stade 1 - sans detail sequelle (cas 1)',
        text: 'employe banque 40 ans glissade escalier entorse ligament lateral externe stade 1 cheville droite attelle glaçage antalgiques',
        expectMax: 8,
    },
    {
        id: 2,
        desc: 'Entorse stade 1 - AUCUNE SÉQUELLE (cas 2)',
        text: 'employe banque 40 ans entorse ligament lateral externe stade 1 cheville droite attelle arret travail 7 jours reprise sans douleur kinesitherapie aucune sequelle',
        expectMax: 0,
    },
    {
        id: 3,
        desc: 'Plaie index - AUCUNE SÉQUELLE (cas 3)',
        text: 'commis cuisine 22 ans plaie 2cm index gauche peu profonde sans atteinte tendineuse ni nerveuse cicatrisation 7 jours aucune sequelle',
        expectMax: 0,
    },
    {
        id: 4,
        desc: 'Corps étranger cornéen - cicatrice cornéenne (cas 4)',
        text: 'soudeur 35 ans eclat metal oeil droit ulcere corneen cicatrise 10 jours pas de perte acuite visuelle legere cicatrice corneenne',
        expectMax: 5,
    },
    {
        id: 5,
        desc: 'Lumbago - fragilité persistante, PAS hernie (cas 5)',
        text: 'manutentionnaire 48 ans soulevement charge 30kg lumbago contracture musculaire lombaire pas de signes de sciatique arret travail 4 semaines kinesitherapie pas de sequelles invalidantes fragilite lombaire persistante',
        expectMax: 8,
    },
    {
        id: 6,
        desc: 'Brûlure avant-bras - cicatrice (cas 6)',
        text: 'ouvrier metallurgie 29 ans brulure 2eme degre profond 10 pourcent avant-bras gauche cicatrice dyschromique legerement retractile',
        expectMax: 10,
    },
    {
        id: 7,
        desc: 'Fracture Pouteau-Colles - séquelles légères (cas 7)',
        text: 'charpentier 52 ans fracture comminutive extremite inferieure radius droit osteosynthese plaque legere perte amplitude flexion extension poignet douleurs main dominante',
        expectMin: 5,
        expectMax: 12,
    },
    {
        id: 8,
        desc: 'Amputation P3 pouce SEUL (cas 8)',
        text: 'operateur machine-outil 41 ans ecrasement pouce droit amputation phalange distale pouce droit perte pince fine inapte poste initial main dominante',
        expectMin: 8,
        expectMax: 20,
        mustNotContain: 'index',
    },
    {
        id: 9,
        desc: 'Fracture ouverte tibia/péroné + syndrome loges (cas 9)',
        text: 'magasinier cariste 33 ans fracture ouverte tibia perone jambe gauche syndrome des loges aponevrotomie fixateur externe greffes peau boiterie definitive fonte musculaire douleurs chroniques inaptitude travail debout',
        expectMin: 25,
        expectMax: 40,
    },
    {
        id: 10,
        desc: 'TC grave + fracture bassin (cas 10)',
        text: 'ouvrier travaux publics 27 ans traumatisme cranien grave coma glasgow 6 fracture bassin contusions pulmonaires hemorragie meningee hematome sous-dural syndrome frontal troubles graves memoire apathie irritabilite boiterie impossible reprendre activite professionnelle',
        expectMin: 35,
        expectMax: 70,
        mustNotContain: 'côte',
    },
    {
        id: 11,
        desc: 'Tétraplégie C5-C6 COMPLÈTE (cas 11)',
        text: 'cordiste 38 ans chute 12 metres fracture comminutive vertebres cervicales C5 C6 section complete moelle epiniere tetraplegie complete paralysie 4 membres dependance totale fauteuil electrique tierce personne 24h',
        expectMin: 80,
        expectMax: 100,
        mustNotContain: 'incomplète',
    },
];

let passed = 0;
let failed = 0;

for (const c of cases) {
    const r = localExpertAnalysis(c.text) as any;
    const rate = r.rate ?? 0;
    const name = r.name || r.injury?.name || r.text?.substring(0, 100) || '';
    
    let ok = true;
    const errors: string[] = [];
    
    if (c.expectMax !== undefined && rate > c.expectMax) {
        errors.push(`rate ${rate}% > max ${c.expectMax}%`);
        ok = false;
    }
    if ((c as any).expectMin !== undefined && rate < (c as any).expectMin) {
        errors.push(`rate ${rate}% < min ${(c as any).expectMin}%`);
        ok = false;
    }
    if ((c as any).mustNotContain) {
        const fullText = JSON.stringify(r);
        if (fullText.toLowerCase().includes((c as any).mustNotContain.toLowerCase())) {
            errors.push(`contains forbidden "${(c as any).mustNotContain}"`);
            ok = false;
        }
    }
    
    const status = ok ? '✅' : '❌';
    console.log(`${status} Case ${c.id}: ${c.desc}`);
    console.log(`   Rate=${rate}% | Name="${name.substring(0, 80)}"`);
    if (!ok) {
        console.log(`   ERRORS: ${errors.join(', ')}`);
        failed++;
    } else {
        passed++;
    }
}

console.log(`\n═══ RÉSULTAT: ${passed}/${cases.length} OK, ${failed} FAILED ═══`);
