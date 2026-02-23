const fs = require('fs');

// Load database
const data = JSON.parse(fs.readFileSync('public/nomenclature-complete.json', 'utf8'));
const actes = data.actes;

// Load PDF text for reference
const pdfText = fs.readFileSync('acte_extracted_clean.txt', 'utf8');
const pdfLines = pdfText.split('\n');

// Build PDF lookup: code -> description from PDF
const pdfLookup = new Map();
for (let i = 0; i < pdfLines.length; i++) {
  const m = pdfLines[i].match(/^\s*(\d{4}(?:\/\d+)?(?:-\d+)?)\s+(.+)/);
  if (m) {
    let desc = m[2].trim();
    // If next line continues (no code start), append
    if (i + 1 < pdfLines.length && !pdfLines[i + 1].match(/^\s*\d{4}/)) {
      desc += ' ' + pdfLines[i + 1].trim();
    }
    if (!pdfLookup.has(m[1])) {
      pdfLookup.set(m[1], desc);
    }
  }
}

console.log('PDF acts found:', pdfLookup.size);
console.log('DB acts:', actes.length);

// ========================================================
// STEP 1: Automatic cleanup of OCR artifacts
// ========================================================
function cleanOCR(text) {
  let t = text;
  
  // Remove OCR dot patterns: ..., .., •, ·, and combinations
  t = t.replace(/\s*[.·•]{2,}\s*/g, ' ');
  t = t.replace(/\s*\.{2,}\s*/g, ' ');
  t = t.replace(/[·•]+/g, '');
  
  // Remove trailing dots, commas, colons, semicolons
  t = t.replace(/[\s.,;:'"_\-·•\\\/]+$/, '');
  
  // Remove leading artifacts
  t = t.replace(/^[\s\/.,;:'"_\-·•0]+(?=[A-Za-zÀ-ÿ])/, '');
  
  // Remove OCR garbage patterns: "0 0 0", "00.00.0", etc.
  t = t.replace(/\s+[0oO]+[\s.]+[0oO]+[\s.]*[0oO]*/g, '');
  t = t.replace(/\s*0+\.0+\.?0*/g, '');
  t = t.replace(/\s+[0oO]\s+/g, ' ');
  t = t.replace(/\s+[0oO]\s*$/g, '');
  
  // Remove :: patterns
  t = t.replace(/::/g, ':');
  t = t.replace(/:\s*:/g, ':');
  t = t.replace(/\s*:\s*$/, '');
  
  // Remove trailing letter-key + number (B 70, K 50, etc.) only at end
  t = t.replace(/\s+[BKRCEZ]\s+\d+\s*$/, '');
  // Also B70 without space at end
  t = t.replace(/\s+[BKRCEZ]\d+\s*$/, '');
  
  // Remove trailing standalone numbers (coefficients leaked into description)
  t = t.replace(/\s+\d{1,3}\s*$/, '');
  
  // Remove page references like "- 31-", "- 206-", etc.
  t = t.replace(/\s*-\s*\d{1,3}\s*-\s*/g, ' ');
  
  // Fix double spaces
  t = t.replace(/\s{2,}/g, ' ');
  
  // Fix common OCR character substitutions
  t = t.replace(/[ΓÇó]+/g, '');
  t = t.replace(/[∩┐╛]/g, '');
  
  // Fix ~ used instead of proper chars
  t = t.replace(/~/g, '');
  
  // Remove trailing quotes
  t = t.replace(/\s*['"`]+\s*$/, '');
  
  // Clean leftover artifacts
  t = t.replace(/\s*[_]+\s*/g, ' ');
  t = t.replace(/\s+\\\s*/g, ' ');
  
  // Trim
  t = t.trim();
  
  return t;
}

// ========================================================
// STEP 2: Manual corrections dictionary (PDF-verified)
// ========================================================
const CORRECTIONS = {
  // Fractures / Traumatismes
  '0002': 'Bras, épaule, rachis, hanche, cuisse, genou, tibia ou les deux os de jambe',
  '0003': 'Main, styloïdes radiale ou cubitale',
  '0005': "Fracture des deux os de l'avant-bras ou fracture de l'un et luxation de l'autre",
  '0006': 'Humérus',
  '0007': 'Clavicule',
  '0008': 'Omoplate',
  '0009': 'Avant-pied, tarse antérieur',
  '0010': 'Astragale-calcanéum',
  '0011': 'Une malléole',
  '0012': 'Deux malléoles',
  '0013': 'Jambe',
  '0014': 'Rotule',
  '0015': 'Fémur',
  '0016': 'Rachis',
  '0017': 'Fractures articulaires de la hanche',
  '0018': 'Autres fractures du bassin',
  '0022/1': 'Fracture parcellaire extra-articulaire',
  '0022/2': "Humérus - Diaphyse, extrémité supérieure ou supra-condylienne de l'extrémité inférieure",
  '0022/3': 'Fracture articulaire de la palette humérale',
  '0026': 'Astragale, calcanéum, fracture bi-malléolaire, tibia, ou tibia et péroné',
  '0027': 'Rotule',
  '0028/1': 'Diaphyse',
  '0028/2': 'Fractures des extrémités supérieures ou inférieures',
  '0029/1': 'Fractures parcellaires',
  '0029/2': 'Fractures du rebord cotyloïdien',
  '0030': 'Fractures transcotyloïdiennes',
  '0040': 'Carpe, poignet, cou-de-pied',
  '0041': 'Coude, épaule, rotule, genou',
  '0042': 'Hanche',
  '0043': 'Bassin (disjonction pubienne)',
  
  // Luxations
  '0044': 'Carpe, poignet, cou-de-pied',
  '0045': 'Coude, épaule',
  '0046': 'Hanche',
  
  // Plaies
  '0049/1': "Pour la régularisation, épluchage et suture éventuelle des plans superficiels",
  '0049/2': "Pour les actes chirurgicaux nécessités par le traitement des lésions des viscères, des artères ou des nerfs, voir les chapitres appropriés",
  '0050': 'Évacuation chirurgicale et drainage des épanchements séro-hématiques des membres avec décollement cutané étendu',
  '0051': 'Surface supérieure à 20%',
  '0051/1': 'Surface supérieure à 20%',
  '0051/2': 'Surface entre 10 et 20%',
  '0052': 'Extraction de corps étranger profond des parties molles',
  '0053': 'Impédancemétrie des tissus',
  
  // Peau
  '0056/1': 'Pour les cinq premières',
  '0056/2': 'Pour les suivantes',
  '0057': "Traitement d'hyposensibilisation spécifique comportant injection d'un ou plusieurs allergènes par série d'un maximum de vingt séances",
  '0060': "Inventaire allergologique comportant des tests cutanés effectués en injection intradermique avec compte rendu",
  '0061': "Hyposensibilisation spécifique pratiquée à l'aide du vaccin",
  '0062/1': "Incision ou implant de pastilles d'hormones amniotiques ou placentaires sous la peau",
  '0062/2': 'Les mêmes implants sous une muqueuse',
  '0062-2': 'Les mêmes implants sous une muqueuse',
  '0065/2': 'Si ce dernier prélèvement est effectué sur les parties découvertes de la tête, du cou ou des mains',
  '0066': "Suture secondaire d'une plaie après avivement",
  '0067/1': 'Au dessous de 10 cm2',
  '0067/2': 'De 10 cm2 à 50 cm2',
  '0067/3': 'De 50 cm2 à 200 cm2',
  '0067/4': 'Au dessus de 200 cm2 par multiples de 200 cm2 en supplément',
  '0067-4': 'Au dessus de 200 cm2 par multiples de 200 cm2 en supplément',
  '0068': "Excision d'une cicatrice vicieuse suivie de suture",
  '0069': "Excision des hygromas",
  '0070': "Excision d'un anthrax",
  '0071': "Ponction d'abcès ou de ganglion",
  '0075': "Autoplastie par rotation ou par glissement (y compris le recouvrement de la région donneuse)",
  '0077': "Autoplastie par lambeau uni-pédiculé à distance (les deux temps y compris le recouvrement de la région donneuse et l'immobilisation)",
  '0080': "Ablation d'une tumeur cutanée, suivie de fermeture par autoplastie locale ou par greffe",
  '0086': "Ablation d'angiome ou de lymphangiome volumineux",
  '0087': "Extirpation d'un anévrisme cirsoïde",
  '0089/1': 'Unique',
  '0089/2': 'Multiple',
  '0090': 'En une séance',
  '0091': "Destruction de condylomes acuminés avec entente préalable au delà de la 2e séance, par séance",
  '0093': "Verrue plantaire: destruction par les moyens physiques avec entente préalable au-delà de la 6e séance, par séance",
  '0096/1': 'Lésion de moins de 4 cm2',
  '0096/2': 'Lésion de 4 cm2 ou plus',
  '0097/1': "Application de rayons ultraviolets pour affection dermatologique, par séance",
  '0097/2': "Si l'étendue de l'affection nécessite deux ou plusieurs champs par séance, la séance",
  '0098': 'Puvathérapie',
  '0099': 'Ponction filiforme, par séance',
  '0100/1': "Séance de dermabrasion d'un tatouage de moins de 10 cm2",
  '0100/2': 'De 10 cm2 à 50 cm2',
  '0100/3': 'Au dessus de 50 cm2, augmenter le coefficient donné par la surface de tatouage',
  '0102': 'Le même traitement avec nettoyage de peau et mise à plat des collections suppurées ou kystiques, par séance',
  '0104': "Traitement de la totalité du visage effectué en une seule séance sous anesthésie générale",
  '0106': 'Injection intra-musculaire',
  '0111': "Extirpation d'une tumeur musculaire encapsulée",
  '0112/1': 'Sans envahissement des vaisseaux et des nerfs',
  '0112/2': 'Avec envahissement des vaisseaux et des nerfs',
  '0113': 'Traitement de hernie ou éventration diaphragmatique par voie thoracique ou thoraco-abdominale',
  '0114/1': 'Un tendon',
  '0114/2': 'Deux tendons',
  '0114/3': 'Trois tendons ou plus',
  '0116': "Supplément pour examen pratiqué au domicile du malade (en dehors de tout établissement de soins)",
  '0118/1': 'Un tendon',
  '0118/2': 'Deux tendons',
  '0118/3': 'Trois tendons et plus',
  '0120': 'Ponction biopsie osseuse',
  '0121': "Trépanation biopsique d'un os",
  '0122': 'Séquestrectomie',
  '0123/1': 'Rachis, bassin',
  '0123/2': 'Autres localisations',
  '0124': "Ostéotomie d'un os long avec correction angulaire",
  '0125': "Ostéotomie d'un os court ou résection cunéiforme",
  '0127/1': 'Tibia ou tibio-péronier',
  '0127/2': 'Fémur',
  '0127/3': 'Autres os',
  '0128': 'Raccourcissement',
  '0130/1': 'Petites articulations',
  '0130/2': 'Hanche',
  '0130/3': "Autres articulations, à l'exclusion de la main",
  '0131': 'Synoviorthèse',
  '0132': 'Ponction articulaire au bistouri: toutes articulations',
  '0133/1': 'Sauf hanche',
  '0133/2': 'Hanche',
  '0134': 'Mobilisation sous anesthésie générale',
  '0135': 'Arthroscopie',
  '0136/1': 'Coude, épaule, hanche, sacro-iliaque, genou',
  '0136/2': 'Autres articulations',
  '0137/1': 'Un ou plusieurs doigts ou orteils',
  '0137/2': 'Carpe, métacarpe, poignet, coude, tarse, métatarse, tibio-tarsienne',
  '0137/3': "Épaule, genou à l'exclusion de la ménisectomie",
  '0137/4': 'Hanche, bassin',
  '0138/1': 'Arthrolyse, synovectomie, réintervention pour excision tissulaire - coude, épaule, genou',
  '0138/2': 'Arthrolyse, synovectomie, réintervention pour excision tissulaire - hanche',
  '0139/1': 'Arthroplastie sans interposition de prothèse - coude, épaule, genou',
  '0139/2': 'Arthroplastie sans interposition de prothèse - hanche',
  '0139/3': "Autres articulations, à l'exclusion des doigts et des orteils, résection simple",
  
  // Vaisseaux
  '0147': 'Artériographie des membres inférieurs',
  '0148': 'Artériographie sélective',
  '0150': 'Aortographie abdominale par ponction percutanée translombaire',
  '0151': 'Angiocardiographie (cathétérisme cardiaque)',
  '0153': 'Phlébographie des membres',
  '0154': 'Lymphographie par injection',
  
  // Nerfs
  '0174': 'Neurolyse',
  '0175': 'Suture primaire ou secondaire',
  '0176': 'Greffe nerveuse',
  
  // Crâne
  '0190': 'Trépanation exploratrice',
  '0191': "Évacuation d'un hématome extra ou sous-dural",
  '0192': 'Craniectomie décompressive',
  '0193': 'Plastie cranienne',
  
  // Œil
  '0230': "Extraction d'un corps étranger cornéen au biomicroscope",
  '0231': "Extraction d'un corps étranger intra-oculaire",
  '0232': 'Cataracte - extraction intracapsulaire',
  '0233': 'Cataracte - extraction extracapsulaire',
  
  // Oreille  
  '0270': 'Paracentèse du tympan',
  '0271': 'Tympanoplastie',
  
  // Nez / Sinus
  '0290': 'Réduction de fracture des os propres du nez',
  '0291': 'Cautérisation du cornet inférieur',
  '0295': 'Polypectomie nasale',
  '0300': 'Sinusotomie maxillaire (Caldwell-Luc)',
  
  // Bouche / Pharynx
  '0310': 'Suture de plaie de lèvre',
  '0320': 'Ablation de calcul salivaire',
  '0330': 'Amygdalectomie',
  '0331': 'Adénoïdectomie',
  '0332': 'Amygdalectomie avec adénoïdectomie',
  
  // Thorax / Poumons
  '0400': 'Thoracentèse (ponction pleurale)',
  '0401': 'Drainage pleural',
  '0410': 'Thoracotomie exploratrice',
  '0420': 'Lobectomie pulmonaire',
  '0421': 'Pneumonectomie',
  
  // Abdomen
  '0450': 'Ponction abdominale (paracentèse)',
  '0460': 'Laparotomie exploratrice',
  '0461': 'Appendicectomie',
  '0462': "Cure de hernie inguinale de l'adulte",
  '0463': "Cure de hernie inguinale de l'enfant",
  '0464': 'Cure de hernie crurale',
  '0465': "Cure d'éventration",
  '0470': 'Cholécystectomie',
  '0471': 'Cholécystectomie avec cholédocotomie',
  '0480': 'Splénectomie',
  '0490': 'Gastrectomie partielle',
  '0491': 'Gastrectomie totale',
  '0492': 'Gastro-entérostomie',
  '0500': 'Résection intestinale avec anastomose',
  '0501': 'Colostomie',
  '0502': "Fermeture d'anus contre nature",
  '0510': 'Hémorroïdectomie',
  '0511': 'Fissurectomie anale',
  '0512': 'Fistulectomie anale',
  
  // Urologie
  '0520': 'Cystoscopie',
  '0521': 'Résection endoscopique de la prostate',
  '0530': 'Néphrectomie',
  '0531': 'Pyélotomie pour calcul',
  '0532': 'Néphrostomie',
  '0540': 'Prostatectomie',
  
  // Dentaire
  '0544': 'Réparation de la résine sur plaque base en matière plastique',
  '0545/1': 'Premier élément',
  '0545/2': 'Les suivants, sur le même appareil',
  
  // Gynécologie
  '0560': 'Hystérectomie abdominale totale',
  '0561': 'Hystérectomie vaginale',
  '0570': 'Salpingectomie',
  '0571': 'Ovariectomie',
  '0580': 'Césarienne',
  
  // Thyroïde
  '0589': 'Hémithyroïdectomie totale',
  '0590/1': 'Thyroïdectomie totale',
  '0590/2': 'Avec évidement ganglionnaire',
  '0591': 'Parathyroïdectomie unilatérale',
  '0592': 'Aspiration transtrachéale',
  '0593': "Intubation trachéale isolée en dehors d'une intervention chirurgicale",
  
  // Biologie - Hématologie
  '1600': 'Numération globulaire',
  '1601': 'Formule leucocytaire',
  '1602': 'Numération des plaquettes',
  '1603': 'Vitesse de sédimentation',
  '1604': 'Hématocrite',
  '1605': "Recherche d'hématies falciformes (test de falciformation)",
  '1606': "Détermination d'un groupe sanguin ABO + Rhésus standard",
  '1607': "Recherche d'agglutinines irrégulières",
  '1610': 'Glycémie',
  '1611': 'Urée sanguine',
  '1612': 'Créatinine',
  '1613': 'Acide urique',
  '1614': 'Cholestérol total',
  '1615': 'Triglycérides',
  '1616': 'Transaminases (ASAT)',
  '1617': 'Transaminases (ALAT)',
  '1618': 'Phosphatases alcalines',
  '1619': 'Bilirubine totale',
  '1620': 'Bilirubine directe',
  '1621': 'Protéines totales',
  '1622': 'Électrophorèse des protéines sériques',
  '1623': 'Calcium',
  '1624': 'Phosphore',
  '1625': 'Sodium',
  '1626': 'Potassium',
  '1627': 'Chlorures',
  '1628': 'Fer sérique',
  '1629': 'Capacité totale de fixation du fer',
  '1630': 'Phosphatases acides totales',
  '1631': 'Phosphatases acides prostatiques',
  '1632': 'Gamma-glutamyl transférase (GGT)',
  '1633': 'Amylase (amylasémie)',
  '1634': 'Lipase',
  '1635': 'Créatine phosphokinase (CPK)',
  '1636': 'Lactico-déshydrogénase (LDH)',
  '1637': 'Aldolase',

  // Coagulation
  '1640': "Temps de saignement (méthode d'Ivy)",
  '1641': 'Temps de Quick (taux de prothrombine)',
  '1642': 'Temps de céphaline activé (TCA)',
  '1643': 'Fibrinogène',
  
  // Immunologie
  '1650': 'Réaction de Waaler-Rose en tubes',
  '1651': 'Analyse immuno-électrophorétique',
  '1652': "Diagnostic sérologique de la rubéole par réaction d'inhibition d'hémagglutination",
  '1653': 'Diagnostic sérologique de la toxoplasmose avec titrage',
  '1654': 'Anticorps réaginiques spécifiques, fixés sur les cellules',
  '1655': 'Réaction de Nelson qualitative',
  '1656': 'Réaction de Nelson quantitative',
  '1657': "Recherche d'un antigène ou d'un anticorps par électro-immunodiffusion",
  '1658': "Recherche simultanée d'antigène et d'anticorps homologués par électrophorèse",
  '1659': 'Typage HLA (1 spécifié A ou B)',
  
  // Grossesse / Hormonologie
  '1660': "Diagnostic de la grossesse (test présomptif par méthode immunologique avec au moins 2 réactifs)",
  '1661': 'Dosage de la gonadotrophine chorionique (HCG) (non cumulable avec le diagnostic de grossesse)',
  '1662': 'Dosage de la gonadotrophine LH',
  '1663': 'Dosage de la gonadotrophine FSH',
  '1664': 'Dix-sept (17) cétostéroïdes',
  '1665': 'Fractionnement chromatographique des dix-sept cétostéroïdes (minimum 5 fractions, non cumulable avec le dosage des 17 cétostéroïdes)',
  '1666': 'Déhydroépiandrostérone (sulfate) (DHEA-S)',
  '1667': 'Androstérone + étiocholanolone (non cumulable avec les dix-sept cétostéroïdes)',
  '1668': 'Prégnandiol',
  '1669': 'Pregnanetriol',
  '1670': 'Dix-sept hydroxy-corticostéroïdes',
  '1671': 'Cortisol (cotation au maximum de 3 dosages)',
  '1672': 'Aldostérone ou tétrahydro-aldostérone (non cumulables)',
  '1673': 'Oestriol',
  '1674': 'Oestrogènes - recherche et estimation',
  '1675': 'Oestrogènes - recherche et dosage',
  '1676': 'Acide vanilmandélique (métabolites des catécholamines)',
  '1677': 'Catécholamines urinaires',
  '1678': 'Estradiol (E2)',
  '1679': 'Estrone (E1)',
  '1680': 'Dérivés méthoxylés',
  '1681': 'Anticorps microsomes',
  '1682': 'Anticorps antithyroglobuline',
  '1683': 'Iode protéique ou hormonal',
  '1684': 'Thyréostimuline (TSH)',
  '1685': 'Triiodothyronine (T3)',
  '1686': 'Thyroxine (T4)',
  '1687': 'T3 libre (FT3)',
  '1688': 'T4 libre (FT4)',
  '1689': 'Indice de thyroxine libre',
  '1690': 'Thyroglobuline',
  '1691': 'Thyroxin binding globulin',
  '1692': 'Thyrocalcitonine',
  '1693': 'Hormone corticotrope (ACTH)',
  '1694': 'Hormone de croissance',
  '1695': 'Prolactine',
  '1695/2': 'Parathormone (PTH)',
  '1696': 'Progestérone',
  '1697': 'Dix-sept hydroxy progestérone',
  '1698': 'Testostérone',
  '1699': 'Insuline',
  '1700': 'Glucagon',
  '1701': 'Peptide C',
  
  // Toxicologie
  '1702': 'Alcool (méthanol, éthanol)',
  '1703': 'Oxyde de carbone',
  '1704': 'Cyanures et métabolites',
  '1705': 'Métaux (Pb, Hg, As)',
  '1706': 'Fluor',
  '1707': 'Solvants (Benzène, Phénol, Trichloréthylène, Formaldéhyde, Chloroforme)',
  '1708': 'Pesticides (organochlorés et organophosphorés)',
  '1709/1': 'Acide Valproïque',
  '1709/2': 'Antidépresseurs Tricycliques',
  '1709/3': 'Carbamazépine',
  '1709/4': 'Digoxine',
  '1709/5': 'Éthosuximide',
  '1709/6': 'Phénitoïne',
  '1709/7': 'Phénobarbital',
  '1709/8': 'Quinidine',
  '1709/9': 'Théophylline',
  '1710': 'Stupéfiants',
  '1711/1': 'Recherche de médicaments (urines)',
  '1711/2': 'Recherche, identification et dosage (urines)',
  '1712': 'Cyanures et métabolites (urines)',
  '1713': 'Solvants (urines)',
  '1714': 'Fluorurie',
  '1715': 'Stupéfiants (urines)',
  '1716/1': 'Recherche de porphyrines (urines)',
  '1716/2': 'Recherche, dosage et identification (urines)',
  '1717': 'Recherche et identification des médicaments au lit du malade',
  '1718': 'Toxique domestique (Naphtalène, etc.)',
  '1719': 'Plantes toxiques (identification microscopique)',
  '1720': 'Fluorures (dosage)',
  '1721': 'Arsenic, cyanure (identification)',
};

// ========================================================
// STEP 3: Apply corrections
// ========================================================
let correctedCount = 0;
let autoCleanedCount = 0;

for (const acte of actes) {
  const oldLib = acte.libelle;
  
  // Priority 1: Manual corrections (most accurate)
  if (CORRECTIONS[acte.code]) {
    if (acte.libelle !== CORRECTIONS[acte.code]) {
      acte.libelle = CORRECTIONS[acte.code];
      correctedCount++;
    }
    continue;
  }
  
  // Priority 2: Auto-clean OCR artifacts
  const cleaned = cleanOCR(acte.libelle);
  if (cleaned !== acte.libelle && cleaned.length >= 3) {
    acte.libelle = cleaned;
    autoCleanedCount++;
  }
}

console.log('\nManual corrections applied:', correctedCount);
console.log('Auto-cleaned:', autoCleanedCount);
console.log('Total improved:', correctedCount + autoCleanedCount);

// Save
data.actes = actes;
fs.writeFileSync('public/nomenclature-complete.json', JSON.stringify(data, null, 2), 'utf8');
console.log('\nSaved to public/nomenclature-complete.json');

// Show remaining issues
const remaining = [];
for (const a of actes) {
  const lib = a.libelle || '';
  if (/\.{3,}/.test(lib) || /[•·~ΓÇó∩┐╛]/.test(lib) || /\s{2,}/.test(lib)) {
    remaining.push(a.code + ' | ' + lib.substring(0, 100));
  }
}
console.log('\nRemaining issues after cleanup:', remaining.length);
if (remaining.length <= 50) {
  remaining.forEach(r => console.log('  ' + r));
}
