/**
 * 200 CAS D'ACCIDENTS DE TRAVAIL (AT) POUR ENTRAÎNEMENT IA MÉDICO-LÉGALE
 * ═══════════════════════════════════════════════════════════════════════
 * Organisation: Secteurs d'activité × Mécanismes lésionnels réalistes
 * Objectif: IA experte en évaluation médico-légale AT-MP
 * 
 * Couverture:
 * - BTP (chutes, écrasements, machines)
 * - Industrie (presses, meules, produits chimiques)
 * - Transport/Logistique (manutention, accidents route)
 * - Agriculture (tracteurs, outils, animaux)
 * - Services (chutes, coupures, TMS)
 * - Mines/Carrières (éboulements, explosions)
 * 
 * Niveaux de complexité:
 * - AT simples (1 lésion, taux fixe) : cas 001-060
 * - AT modérés (raideurs, séquelles fonctionnelles) : cas 061-130
 * - AT complexes (polytraumatismes, cumuls Balthazard) : cas 131-200
 */

import type { TrainingCase } from './trainingCases';

// ═══════════════════════════════════════════════════════════════════════
// PARTIE 1: CAS AT SIMPLES (60 cas) - Lésions uniques, taux fixes/directs
// ═══════════════════════════════════════════════════════════════════════

export const atSimples: TrainingCase[] = [
  // ── BTP: Chutes de hauteur ──────────────────────────────────────────
  {
    id: "at-001", category: "AT - BTP",
    userInput: "ouvrier maçon chute échafaudage 4m fracture calcanéum droit thalamique douleurs permanentes boiterie marche limitée 500m",
    expectedInjury: "Fracture du calcanéum thalamique avec séquelles",
    expectedRate: 22, severity: "élevé",
    clinicalSigns: ["fracture calcanéum thalamique", "douleurs permanentes", "boiterie", "marche 500m"],
    justification: "Fracture calcanéum thalamique + douleurs + boiterie + périmètre marche réduit = 20-25%",
    keywords: ["fracture", "calcaneum", "thalamique", "boiterie", "marche"],
    commonMistakes: ["Confondre avec fracture calcanéum extra-thalamique (taux moindre)"]
  },
  {
    id: "at-002", category: "AT - BTP",
    userInput: "coffreur chute dalle 3 mètres tassement vertébral L1 perte hauteur 30% douleurs lombaires permanentes",
    expectedInjury: "Tassement vertébral L1",
    expectedRate: 12, severity: "moyen",
    clinicalSigns: ["tassement L1", "perte hauteur 30%", "douleurs lombaires"],
    justification: "Tassement L1 avec perte 30% hauteur + douleurs = 10-15%",
    keywords: ["tassement", "vertebre", "lombaire", "douleur"]
  },
  {
    id: "at-003", category: "AT - BTP",
    userInput: "charpentier chute toiture 6m fracture pilon tibial gauche arthrodèse tibio-tarsienne",
    expectedInjury: "Fracture pilon tibial avec arthrodèse de cheville",
    expectedRate: 15, severity: "élevé",
    clinicalSigns: ["fracture pilon tibial", "arthrodèse tibio-tarsienne"],
    justification: "Arthrodèse tibio-tarsienne bonne position = 10-15%",
    keywords: ["pilon tibial", "arthrodese", "cheville"],
    commonMistakes: ["Oublier de préciser position de l'arthrodèse (favorable vs défavorable)"]
  },
  {
    id: "at-004", category: "AT - BTP",
    userInput: "peintre en bâtiment chute escabeau 2m fracture radius distal gauche consolidée avec cal vicieux",
    expectedInjury: "Fracture extrémité inférieure du radius avec cal vicieux",
    expectedRate: 10, severity: "moyen",
    clinicalSigns: ["fracture radius distal", "cal vicieux"],
    justification: "Fracture radius distal consolidée avec cal vicieux = 8-12%",
    keywords: ["fracture", "radius", "cal vicieux", "poignet"]
  },
  {
    id: "at-005", category: "AT - BTP",
    userInput: "couvreur glissade toit fracture bilatérale calcanéum douleurs marche impossible sans semelles orthopédiques",
    expectedInjury: "Fracture bilatérale du calcanéum",
    expectedRate: 40, severity: "élevé",
    clinicalSigns: ["fracture bilatérale calcanéum", "douleurs bilatérales", "semelles orthopédiques"],
    justification: "Calcanéum bilatéral = 30-45% selon séquelles",
    keywords: ["fracture", "calcaneum", "bilateral"]
  },

  // ── BTP: Écrasements ────────────────────────────────────────────────
  {
    id: "at-006", category: "AT - BTP",
    userInput: "manœuvre écrasement main droite par parpaing amputation index et médius main dominante",
    expectedInjury: "Amputation index et médius main dominante",
    expectedRate: 18, severity: "fixe",
    clinicalSigns: ["amputation index", "amputation médius", "main dominante"],
    justification: "Index 10% + médius 8% = 18% (même main, addition directe)",
    keywords: ["amputation", "index", "medius", "main dominante"]
  },
  {
    id: "at-007", category: "AT - BTP",
    userInput: "ouvrier pris sous mur effondré fracture bassin cotyle droit luxation postérieure hanche ostéonécrose tête fémorale",
    expectedInjury: "Fracture cotyle + ostéonécrose tête fémorale",
    expectedRate: 35, severity: "élevé",
    clinicalSigns: ["fracture cotyle", "luxation hanche", "ostéonécrose"],
    justification: "Cotyle + ostéonécrose = lésion grave hanche 30-40%",
    keywords: ["cotyle", "luxation", "hanche", "osteonecrose"]
  },
  {
    id: "at-008", category: "AT - BTP",
    userInput: "électricien écrasement pouce droit par porte métallique amputation P1 main dominante",
    expectedInjury: "Amputation P1 du pouce main dominante",
    expectedRate: 20, severity: "fixe",
    clinicalSigns: ["amputation P1 pouce", "main dominante"],
    justification: "Amputation P1 pouce dominante = 20%",
    keywords: ["amputation", "pouce", "phalange", "main dominante"]
  },

  // ── Industrie: Machines ─────────────────────────────────────────────
  {
    id: "at-009", category: "AT - Industrie",
    userInput: "ouvrier usine main droite happée engrenage amputation transcarpienne perte complète main dominante",
    expectedInjury: "Amputation transcarpienne / désarticulation du poignet main dominante",
    expectedRate: 65, severity: "fixe",
    clinicalSigns: ["amputation transcarpienne", "perte main dominante"],
    justification: "Désarticulation poignet dominante = 65-70%",
    keywords: ["amputation", "transcarpienne", "poignet", "main dominante"]
  },
  {
    id: "at-010", category: "AT - Industrie",
    userInput: "opérateur presse hydraulique écrasement 4 doigts main droite amputation index médius annulaire auriculaire",
    expectedInjury: "Amputation de quatre doigts (sauf pouce)",
    expectedRate: 31, severity: "fixe",
    clinicalSigns: ["amputation 4 doigts", "main dominante"],
    justification: "Index 10% + médius 8% + annulaire 7% + auriculaire 6% = 31%",
    keywords: ["amputation", "quatre doigts", "presse"]
  },
  {
    id: "at-011", category: "AT - Industrie",
    userInput: "tourneur main droite happée tour séparation pouce au niveau métacarpophalangien main dominante",
    expectedInjury: "Amputation du pouce au niveau métacarpophalangien main dominante",
    expectedRate: 28, severity: "fixe",
    clinicalSigns: ["amputation pouce", "niveau métacarpophalangien"],
    justification: "Amputation métacarpo-phalangienne pouce dominante = 28%",
    keywords: ["amputation", "pouce", "metacarpophalangien"]
  },
  {
    id: "at-012", category: "AT - Industrie",
    userInput: "soudeur projection métal fondu brûlure cornéenne bilatérale cataracte traumatique OD acuité 3/10 OG 7/10",
    expectedInjury: "Cataracte traumatique post-brûlure cornéenne",
    expectedRate: 15, severity: "élevé",
    clinicalSigns: ["brûlure cornéenne", "cataracte traumatique", "OD 3/10", "OG 7/10"],
    justification: "Acuité 3/10 OD + 7/10 OG = 25-35% selon barème double entrée",
    keywords: ["cataracte", "brulure", "corneenne", "acuite"]
  },
  {
    id: "at-013", category: "AT - Industrie",
    userInput: "ouvrier fonderie exposition bruit chronique surdité bilatérale 70dB perte auditive professionnelle",
    expectedInjury: "Surdité professionnelle bilatérale 60-80dB",
    expectedRate: 40, severity: "fixe",
    clinicalSigns: ["surdité bilatérale", "70dB", "exposition bruit"],
    justification: "Surdité bilatérale 60-80dB = 30%",
    keywords: ["surdite", "bilaterale", "professionnelle", "bruit"]
  },
  {
    id: "at-014", category: "AT - Industrie",
    userInput: "opérateur machine outil projection éclat métallique œil droit énucléation prothèse oculaire",
    expectedInjury: "Ablation ou altération du globe avec prothèse possible",
    expectedRate: 28, severity: "fixe",
    clinicalSigns: ["énucléation OD", "prothèse oculaire"],
    justification: "Énucléation un œil + prothèse possible = 28% barème 1967",
    keywords: ["enucleation", "oeil", "prothese"]
  },
  {
    id: "at-015", category: "AT - Industrie",
    userInput: "opérateur découpe tôle coupure profonde avant-bras section nerf médian au poignet",
    expectedInjury: "Section nerf médian au poignet",
    expectedRate: 20, severity: "élevé",
    clinicalSigns: ["section nerf médian", "poignet"],
    justification: "Nerf médian au poignet main dominante = 15-25%",
    keywords: ["nerf", "median", "section", "poignet"]
  },

  // ── Transport / Logistique ──────────────────────────────────────────
  {
    id: "at-016", category: "AT - Transport",
    userInput: "chauffeur routier accident circulation fracture clavicule droite cal saillant douloureux",
    expectedInjury: "Fracture clavicule avec cal saillant",
    expectedRate: 8, severity: "moyen",
    clinicalSigns: ["fracture clavicule", "cal saillant", "douleur"],
    justification: "Cal saillant douloureux = 5-10%",
    keywords: ["fracture", "clavicule", "cal vicieux"]
  },
  {
    id: "at-017", category: "AT - Transport",
    userInput: "livreur chute escalier entorse grave cheville gauche instabilité chronique LLE",
    expectedInjury: "Entorse grave cheville avec instabilité chronique LLE",
    expectedRate: 8, severity: "moyen",
    clinicalSigns: ["entorse grave", "instabilité LLE", "cheville"],
    justification: "Instabilité chronique cheville = 6-10%",
    keywords: ["entorse", "cheville", "instabilite", "lle"]
  },
  {
    id: "at-018", category: "AT - Transport",
    userInput: "cariste écrasement pied gauche par palette fracture Lisfranc luxation médio-tarsienne",
    expectedInjury: "Fracture-luxation de Lisfranc",
    expectedRate: 15, severity: "élevé",
    clinicalSigns: ["fracture Lisfranc", "luxation médio-tarsienne"],
    justification: "Lisfranc avec séquelles = 12-18%",
    keywords: ["lisfranc", "luxation", "pied"]
  },
  {
    id: "at-019", category: "AT - Transport",
    userInput: "manutentionnaire lumbago aigu hernie discale L4-L5 sciatique S1 opérée séquelles radiculaires",
    expectedInjury: "Hernie discale L4-L5 opérée avec séquelles radiculaires",
    expectedRate: 20, severity: "élevé",
    clinicalSigns: ["hernie discale L4-L5", "sciatique S1", "opérée", "séquelles radiculaires"],
    justification: "Hernie opérée + séquelles radiculaires = 12-18%",
    keywords: ["hernie", "discale", "sciatique", "radiculaire"]
  },
  {
    id: "at-020", category: "AT - Transport",
    userInput: "docker manutention lourde rupture coiffe rotateurs épaule droite dominante abduction limitée 90°",
    expectedInjury: "Rupture coiffe des rotateurs épaule dominante",
    expectedRate: 18, severity: "élevé",
    clinicalSigns: ["rupture coiffe rotateurs", "abduction 90°", "épaule dominante"],
    justification: "Rupture coiffe + abduction 90° dominante = 15-20%",
    keywords: ["coiffe", "rotateurs", "epaule", "abduction"]
  },

  // ── Agriculture ─────────────────────────────────────────────────────
  {
    id: "at-021", category: "AT - Agriculture",
    userInput: "agriculteur renversé par tracteur fracture diaphysaire fémur gauche raccourcissement 2cm consolidé",
    expectedInjury: "Fracture diaphyse fémorale avec raccourcissement",
    expectedRate: 15, severity: "élevé",
    clinicalSigns: ["fracture diaphyse fémur", "raccourcissement 2cm"],
    justification: "Diaphyse fémur + raccourcissement 2cm = 12-18%",
    keywords: ["fracture", "femur", "diaphyse", "raccourcissement"]
  },
  {
    id: "at-022", category: "AT - Agriculture",
    userInput: "ouvrier agricole main gauche prise dans moissonneuse amputation avant-bras tiers moyen",
    expectedInjury: "Amputation de l'avant-bras (tiers moyen - Main Non Dominante)",
    expectedRate: 52, severity: "fixe",
    clinicalSigns: ["amputation avant-bras", "tiers moyen", "non dominante"],
    justification: "Amputation avant-bras tiers moyen non dominante = 52% barème 1967",
    keywords: ["amputation", "avant-bras", "moissonneuse"]
  },
  {
    id: "at-023", category: "AT - Agriculture",
    userInput: "berger coup de corne bœuf rupture rate splénectomie totale en urgence",
    expectedInjury: "Splénectomie totale",
    expectedRate: 18, severity: "fixe",
    clinicalSigns: ["rupture rate", "splénectomie totale"],
    justification: "Splénectomie totale = 18%",
    keywords: ["splenectomie", "rate", "rupture"]
  },
  {
    id: "at-024", category: "AT - Agriculture",
    userInput: "viticulteur section tendons fléchisseurs 3 doigts main droite dominante par sécateur mécanique raideur séquellaire",
    expectedInjury: "Section tendons fléchisseurs 3 doigts main dominante",
    expectedRate: 15, severity: "moyen",
    clinicalSigns: ["section tendons fléchisseurs", "3 doigts", "main dominante"],
    justification: "Raideur 3 doigts longs dominante ≈ 12-18%",
    keywords: ["tendon", "flechisseur", "doigts", "raideur"]
  },
  {
    id: "at-025", category: "AT - Agriculture",
    userInput: "forestier arbre tombé fracture ouverte tibia droit ostéite chronique cal vicieux",
    expectedInjury: "Fracture ouverte tibia avec ostéite et cal vicieux",
    expectedRate: 18, severity: "élevé",
    clinicalSigns: ["fracture ouverte tibia", "ostéite chronique", "cal vicieux"],
    justification: "Tibia + ostéite + cal vicieux = complication majeure 15-20%",
    keywords: ["fracture", "tibia", "osteite", "cal vicieux"]
  },

  // ── Mines / Carrières ───────────────────────────────────────────────
  {
    id: "at-026", category: "AT - Mines",
    userInput: "mineur éboulement galerie fracture sternum contusion pulmonaire bilatérale séquelles respiratoires",
    expectedInjury: "Fracture sternum avec séquelles pulmonaires",
    expectedRate: 15, severity: "élevé",
    clinicalSigns: ["fracture sternum", "contusion pulmonaire", "séquelles respiratoires"],
    justification: "Sternum + séquelles pulmonaires = 12-18%",
    keywords: ["fracture", "sternum", "contusion", "pulmonaire"]
  },
  {
    id: "at-027", category: "AT - Mines",
    userInput: "carrier explosion prématurée blast auriculaire surdité unilatérale totale oreille droite acouphènes permanents",
    expectedInjury: "Surdité totale unilatérale + acouphènes",
    expectedRate: 20, severity: "fixe",
    clinicalSigns: ["surdité totale OD", "acouphènes permanents", "blast"],
    justification: "Surdité totale unilatérale 15% + acouphènes 5% = cumul Balthazard ≈ 19-20%",
    keywords: ["surdite", "acouphene", "blast", "explosion"]
  },
  {
    id: "at-028", category: "AT - Mines",
    userInput: "ouvrier carrière éboulement fracture rachis dorsal D12 paraplégie incomplète force 3/5 membres inférieurs marche avec cannes",
    expectedInjury: "Paraplégie incomplète",
    expectedRate: 63, severity: "élevé",
    clinicalSigns: ["fracture D12", "paraplégie incomplète", "force 3/5", "cannes"],
    justification: "Paraplégie incomplète marche avec cannes = 60-65% barème 1967",
    keywords: ["paraplegie", "incomplete", "rachis", "dorsal"]
  },

  // ── Services / Tertiaire ────────────────────────────────────────────
  {
    id: "at-029", category: "AT - Services",
    userInput: "agent entretien chute escalier mouillé fracture extrémité supérieure humérus gauche raideur épaule",
    expectedInjury: "Fracture extrémité supérieure humérus avec raideur épaule",
    expectedRate: 15, severity: "moyen",
    clinicalSigns: ["fracture humérus proximal", "raideur épaule"],
    justification: "Fracture humérus proximal + raideur = 12-18%",
    keywords: ["fracture", "humerus", "epaule", "raideur"]
  },
  {
    id: "at-030", category: "AT - Services",
    userInput: "cuisinier brûlure profonde 3ème degré main droite dominante greffe cutanée raideur globale 5 doigts",
    expectedInjury: "Brûlure main avec raideur séquellaire des 5 doigts",
    expectedRate: 40, severity: "élevé",
    clinicalSigns: ["brûlure 3ème degré", "greffe cutanée", "raideur 5 doigts"],
    justification: "Brûlures main dom. raideur globale 5 doigts 3°+greffe = 35-45%",
    keywords: ["brulure", "main", "greffe", "raideur", "doigts"]
  },
  {
    id: "at-031", category: "AT - Services",
    userInput: "boucher coupure profonde nerf cubital poignet droit griffe cubitale main dominante",
    expectedInjury: "Section nerf cubital au poignet main dominante",
    expectedRate: 25, severity: "élevé",
    clinicalSigns: ["section nerf cubital", "griffe cubitale", "main dominante"],
    justification: "Nerf cubital poignet dominante = 25-35%",
    keywords: ["nerf", "cubital", "section", "griffe"]
  },
  {
    id: "at-032", category: "AT - Services",
    userInput: "aide-soignante agression patient luxation récidivante épaule droite dominante instabilité chronique",
    expectedInjury: "Luxation récidivante épaule dominante",
    expectedRate: 15, severity: "moyen",
    clinicalSigns: ["luxation récidivante", "épaule dominante", "instabilité"],
    justification: "Luxation récidivante épaule = 12-18%",
    keywords: ["luxation", "recidivante", "epaule", "instabilite"]
  },
  {
    id: "at-033", category: "AT - Services",
    userInput: "agent de sécurité agression coup de couteau abdomen laparotomie éventration séquellaire",
    expectedInjury: "Éventration abdominale post-laparotomie",
    expectedRate: 15, severity: "moyen",
    clinicalSigns: ["laparotomie", "éventration"],
    justification: "Éventration abdominale = 10-15%",
    keywords: ["eventration", "laparotomie", "abdomen"]
  },

  // ── Chimie / Pétrochimie ────────────────────────────────────────────
  {
    id: "at-034", category: "AT - Chimie",
    userInput: "technicien laboratoire explosion produit chimique brûlure visage perte substance nasale cicatrice disgracieuse importante",
    expectedInjury: "Brûlure faciale avec perte substance nasale et cicatrice",
    expectedRate: 20, severity: "élevé",
    clinicalSigns: ["brûlure visage", "perte substance nasale", "cicatrice disgracieuse"],
    justification: "Perte substance nasale + cicatrice = 15-25%",
    keywords: ["brulure", "visage", "nez", "cicatrice"]
  },
  {
    id: "at-035", category: "AT - Chimie",
    userInput: "opérateur raffinerie inhalation vapeurs toxiques insuffisance respiratoire chronique VEMS 50%",
    expectedInjury: "Insuffisance respiratoire chronique (VEMS 50%)",
    expectedRate: 30, severity: "élevé",
    clinicalSigns: ["insuffisance respiratoire", "VEMS 50%"],
    justification: "VEMS 50% = insuffisance respiratoire modérée-sévère = 25-35%",
    keywords: ["insuffisance", "respiratoire", "vems", "inhalation"]
  },
  {
    id: "at-036", category: "AT - Chimie",
    userInput: "ouvrier chimie projection acide sulfurique œil gauche perte vision complète OG œil droit normal",
    expectedInjury: "Perte complète vision œil gauche (brûlure chimique)",
    expectedRate: 30, severity: "fixe",
    clinicalSigns: ["brûlure chimique", "perte vision OG", "OD normal"],
    justification: "Perte vision complète unilatérale = 30%",
    keywords: ["brulure", "chimique", "vision", "perte"]
  },

  // ── Électricité ─────────────────────────────────────────────────────
  {
    id: "at-037", category: "AT - Électricité",
    userInput: "électricien électrisation haute tension brûlure électrique profonde avant-bras droit amputation sous coude",
    expectedInjury: "Amputation avant-bras tiers inférieur main dominante",
    expectedRate: 70, severity: "fixe",
    clinicalSigns: ["électrisation", "amputation avant-bras", "main dominante"],
    justification: "Amputation avant-bras tiers inférieur dominante = 70-75%",
    keywords: ["amputation", "avant-bras", "electrisation"]
  },
  {
    id: "at-038", category: "AT - Électricité",
    userInput: "technicien maintenance arc électrique flash oculaire bilatéral cataracte électrique OD 5/10 OG 6/10",
    expectedInjury: "Cataracte électrique bilatérale",
    expectedRate: 10, severity: "élevé",
    clinicalSigns: ["cataracte électrique", "OD 5/10", "OG 6/10"],
    justification: "Cataracte bilatérale 5/10 et 6/10 = barème double entrée ≈ 30-38%",
    keywords: ["cataracte", "electrique", "bilaterale", "acuite"]
  },

  // ── Travail en hauteur / Télécom ────────────────────────────────────
  {
    id: "at-039", category: "AT - Télécom",
    userInput: "technicien télécoms chute poteau 8 mètres fracture rachis L2 tassement compression médullaire incomplète",
    expectedInjury: "Fracture tassement L2 avec compression médullaire incomplète",
    expectedRate: 45, severity: "élevé",
    clinicalSigns: ["fracture L2", "tassement", "compression médullaire incomplète"],
    justification: "Compression médullaire incomplète niveau L2 = 40-50%",
    keywords: ["fracture", "tassement", "compression", "medullaire"]
  },
  {
    id: "at-040", category: "AT - BTP",
    userInput: "couvreur chute toit fracture plateaux tibiaux droit déviation axe 8° raideur genou flexion 100°",
    expectedInjury: "Fracture plateaux tibiaux avec déviation axiale et raideur",
    expectedRate: 20, severity: "élevé",
    clinicalSigns: ["fracture plateaux tibiaux", "déviation 8°", "flexion 100°"],
    justification: "Plateaux tibiaux + déviation + raideur = 18-22%",
    keywords: ["plateaux", "tibiaux", "deviation", "raideur"]
  },

  // ── Métallurgie ─────────────────────────────────────────────────────
  {
    id: "at-041", category: "AT - Métallurgie",
    userInput: "chaudronnier éclat meule projection œil droit corps étranger intraoculaire chirurgie taie cornéenne résiduelle acuité 6/10",
    expectedInjury: "Taie cornéenne post-traumatique",
    expectedRate: 12, severity: "moyen",
    clinicalSigns: ["corps étranger intraoculaire", "taie cornéenne", "acuité 6/10"],
    justification: "Acuité 6/10 unilatérale = 8-12% per barème",
    keywords: ["taie", "corneenne", "corps etranger", "acuite"]
  },
  {
    id: "at-042", category: "AT - Métallurgie",
    userInput: "soudeur exposition chronique bruit 95dB pendant 15 ans surdité bilatérale symétrique 50dB acouphènes",
    expectedInjury: "Surdité professionnelle bilatérale 40-60dB + acouphènes",
    expectedRate: 25, severity: "moyen",
    clinicalSigns: ["surdité bilatérale 50dB", "acouphènes", "exposition chronique"],
    justification: "Surdité 40-60dB bilatérale 20% + acouphènes 5% = cumul ≈ 24-25%",
    keywords: ["surdite", "professionnelle", "acouphene", "bruit"]
  },

  // ── Menuiserie / Bois ───────────────────────────────────────────────
  {
    id: "at-043", category: "AT - Menuiserie",
    userInput: "menuisier scie circulaire section 3 doigts main droite pouce index médius dominante",
    expectedInjury: "Amputation pouce + index + médius main dominante",
    expectedRate: 38, severity: "fixe",
    clinicalSigns: ["amputation pouce", "amputation index", "amputation médius"],
    justification: "Pouce 20% + index 10% + médius 8% = 38% (doigts même main)",
    keywords: ["amputation", "pouce", "index", "medius", "scie"]
  },
  {
    id: "at-044", category: "AT - Menuiserie",
    userInput: "ébéniste dégauchisseuse section P3 index droit perte pulpe main dominante",
    expectedInjury: "Amputation phalange distale index",
    expectedRate: 8, severity: "fixe",
    clinicalSigns: ["section P3 index", "perte pulpe"],
    justification: "P3 index = phalange distale = 6-8%",
    keywords: ["amputation", "phalange", "index", "pulpe"]
  },

  // ── Boucherie / Agroalimentaire ─────────────────────────────────────
  {
    id: "at-045", category: "AT - Agroalimentaire",
    userInput: "boucher industriel coupure profonde poignet droit section artère radiale et nerf médian main dominante",
    expectedInjury: "Section nerf médian au poignet main dominante",
    expectedRate: 20, severity: "élevé",
    clinicalSigns: ["section nerf médian", "section artère radiale", "poignet droit"],
    justification: "Section nerf médian poignet dominante = 15-25%",
    keywords: ["nerf", "median", "section", "poignet"]
  },
  {
    id: "at-046", category: "AT - Agroalimentaire",
    userInput: "ouvrier abattoir chute chambre froide entorse grave genou droit rupture LCA dérobements fréquents",
    expectedInjury: "Rupture LCA genou avec instabilité résiduelle",
    expectedRate: 15, severity: "élevé",
    clinicalSigns: ["rupture LCA", "dérobements", "instabilité"],
    justification: "Rupture LCA + dérobements = 12-18%",
    keywords: ["lca", "rupture", "derobements", "instabilite"]
  },

  // ── Travaux publics / Voirie ────────────────────────────────────────
  {
    id: "at-047", category: "AT - Travaux publics",
    userInput: "cantonnier fauché par véhicule fracture ouverte tibia péroné gauche pseudarthrose séquellaire",
    expectedInjury: "Pseudarthrose du tibia",
    expectedRate: 30, severity: "élevé",
    clinicalSigns: ["fracture ouverte tibia-péroné", "pseudarthrose"],
    justification: "Pseudarthrose tibia = 25-30% barème 1967",
    keywords: ["pseudarthrose", "tibia", "perone", "fracture"]
  },
  {
    id: "at-048", category: "AT - Travaux publics",
    userInput: "ouvrier bitume renversé par rouleau compresseur fracture bassin branche ischio-pubienne troubles urinaires",
    expectedInjury: "Fracture bassin avec troubles urinaires",
    expectedRate: 20, severity: "élevé",
    clinicalSigns: ["fracture bassin", "branche ischio-pubienne", "troubles urinaires"],
    justification: "Fracture bassin + troubles urinaires = 18-25%",
    keywords: ["fracture", "bassin", "ischio-pubien", "urinaire"]
  },

  // ── Mécanique automobile ────────────────────────────────────────────
  {
    id: "at-049", category: "AT - Mécanique",
    userInput: "mécanicien vérin hydraulique lâché écrasement thorax fracture 4 côtes pneumothorax drainé",
    expectedInjury: "Fracture 4 côtes avec pneumothorax",
    expectedRate: 12, severity: "moyen",
    clinicalSigns: ["fracture 4 côtes", "pneumothorax", "drainage"],
    justification: "Fractures côtes + pneumothorax résolu = 10-15%",
    keywords: ["fracture", "cotes", "pneumothorax"]
  },
  {
    id: "at-050", category: "AT - Mécanique",
    userInput: "mécanicien poids lourd roue éclatée traumatisme facial fracture mandibule troubles occlusion dentaire",
    expectedInjury: "Fracture mandibule avec troubles occlusion",
    expectedRate: 15, severity: "moyen",
    clinicalSigns: ["fracture mandibule", "troubles occlusion"],
    justification: "Fracture mandibule + troubles occlusion = 10-15%",
    keywords: ["fracture", "mandibule", "occlusion", "dentaire"]
  },

  // ── Cas simples variés ──────────────────────────────────────────────
  {
    id: "at-051", category: "AT - BTP",
    userInput: "plombier chute échelle fracture rotule droite gêne fonctionnelle flexion genou limitée 110°",
    expectedInjury: "Fracture rotule avec gêne fonctionnelle",
    expectedRate: 10, severity: "moyen",
    clinicalSigns: ["fracture rotule", "flexion 110°", "gêne fonctionnelle"],
    justification: "Fracture rotule + gêne fonctionnelle modérée = 8-12%",
    keywords: ["fracture", "rotule", "genou", "raideur"]
  },
  {
    id: "at-052", category: "AT - Transport",
    userInput: "chauffeur bus accident circulation traumatisme crânien léger syndrome post-commotionnel céphalées vertiges 6 mois",
    expectedInjury: "Syndrome post-commotionnel",
    expectedRate: 5, severity: "faible",
    clinicalSigns: ["traumatisme crânien léger", "céphalées", "vertiges"],
    justification: "TC léger + syndrome post-commotionnel = 3-8%",
    keywords: ["traumatisme", "cranien", "cephalees", "vertiges"]
  },
  {
    id: "at-053", category: "AT - Agriculture",
    userInput: "ouvrier viticole chute tracteur fracture omoplate gauche raideur résiduelle épaule modérée",
    expectedInjury: "Fracture omoplate avec raideur épaule",
    expectedRate: 10, severity: "moyen",
    clinicalSigns: ["fracture omoplate", "raideur épaule modérée"],
    justification: "Fracture omoplate + raideur modérée = 8-12%",
    keywords: ["fracture", "omoplate", "epaule", "raideur"]
  },
  {
    id: "at-054", category: "AT - Industrie",
    userInput: "opérateur machine projection fragment métallique genou droit méniscectomie interne partielle",
    expectedInjury: "Séquelles de méniscectomie",
    expectedRate: 5, severity: "faible",
    clinicalSigns: ["méniscectomie partielle", "interne"],
    justification: "Méniscectomie partielle = 3-8%",
    keywords: ["meniscectomie", "partielle", "genou"]
  },
  {
    id: "at-055", category: "AT - BTP",
    userInput: "ferrailleur blessure main droite section tendon extenseur médius doigt en boutonnière",
    expectedInjury: "Doigt en boutonnière du médius",
    expectedRate: 6, severity: "faible",
    clinicalSigns: ["section tendon extenseur", "boutonnière médius"],
    justification: "Boutonnière médius = déformation fixe ≈ 5-7%",
    keywords: ["boutonniere", "tendon", "extenseur", "medius"]
  },
  {
    id: "at-056", category: "AT - Services",
    userInput: "pompier intervention incendie inhalation fumée pneumopathie séquellaire toux chronique dyspnée effort",
    expectedInjury: "Séquelles respiratoires post-inhalation",
    expectedRate: 15, severity: "moyen",
    clinicalSigns: ["inhalation fumée", "toux chronique", "dyspnée effort"],
    justification: "Séquelles respiratoires modérées = 12-18%",
    keywords: ["inhalation", "fumee", "dyspnee", "respiratoire"]
  },
  {
    id: "at-057", category: "AT - Mines",
    userInput: "mineur coup de grisou brûlure 2ème degré profond 30% surface corporelle cicatrices rétractiles cou thorax",
    expectedInjury: "Brûlures étendues avec cicatrices rétractiles",
    expectedRate: 35, severity: "élevé",
    clinicalSigns: ["brûlure 30% SC", "cicatrices rétractiles", "cou", "thorax"],
    justification: "Brûlures 30% SC 2° profond + cicatrices rétractiles cou/thorax = 30-40%",
    keywords: ["brulure", "cicatrice", "retractile"]
  },
  {
    id: "at-058", category: "AT - BTP",
    userInput: "grutier renversement grue fracture humérus diaphysaire droit paralysie nerf radial main tombante récupération partielle",
    expectedInjury: "Paralysie radiale partielle post-fracture humérus",
    expectedRate: 25, severity: "élevé",
    clinicalSigns: ["fracture humérus", "paralysie radiale partielle", "main tombante"],
    justification: "Paralysie radiale récupération partielle = 20-30%",
    keywords: ["paralysie", "radial", "humerus", "main tombante"]
  },
  {
    id: "at-059", category: "AT - Transport",
    userInput: "conducteur engin TP accident collision luxation épaule antérieure droite dominante opérée butée coracoïdienne limitation rotation externe",
    expectedInjury: "Séquelles luxation épaule opérée (butée coracoïdienne)",
    expectedRate: 12, severity: "moyen",
    clinicalSigns: ["luxation épaule", "butée coracoïdienne", "limitation RE"],
    justification: "Luxation opérée + limitation RE = 10-15%",
    keywords: ["luxation", "epaule", "butee", "coracoidienne"]
  },
  {
    id: "at-060", category: "AT - Industrie",
    userInput: "opérateur ligne production pouce droit pris dans rouage rupture appareil extenseur mallet finger",
    expectedInjury: "Mallet finger (doigt en maillet) du pouce",
    expectedRate: 5, severity: "faible",
    clinicalSigns: ["mallet finger", "pouce"],
    justification: "Mallet finger pouce = 4-6%",
    keywords: ["mallet", "finger", "pouce", "extenseur"]
  },
];

// ═══════════════════════════════════════════════════════════════════════
// PARTIE 2: CAS AT MODÉRÉS (70 cas) - Raideurs articulaires, séquelles
// fonctionnelles, évaluation selon critères cliniques
// ═══════════════════════════════════════════════════════════════════════

export const atModeres: TrainingCase[] = [
  // ── Épaule / Membre supérieur post-AT ───────────────────────────────
  {
    id: "at-061", category: "AT - Épaule",
    userInput: "carreleur chute échafaudage fracture trochiter épaule droite dominante abduction 70° rotation externe 20° douleurs nocturnes",
    expectedInjury: "Fracture trochiter épaule avec raideur sévère",
    expectedRate: 22, severity: "élevé",
    clinicalSigns: ["fracture trochiter", "abduction 70°", "RE 20°", "douleurs nocturnes"],
    justification: "Abduction 70° + RE 20° = raideur sévère épaule 20-25%",
    keywords: ["trochiter", "epaule", "abduction", "rotation"]
  },
  {
    id: "at-062", category: "AT - Épaule",
    userInput: "déménageur luxation postérieure épaule gauche récidivante abduction 80° rotation externe 40° appréhension positive",
    expectedInjury: "Luxation récidivante épaule avec raideur",
    expectedRate: 18, severity: "élevé",
    clinicalSigns: ["luxation récidivante", "abduction 80°", "RE 40°", "appréhension"],
    justification: "Luxation récidivante + raideur = 15-20%",
    keywords: ["luxation", "epaule", "recidivante", "apprehension"]
  },
  {
    id: "at-063", category: "AT - Épaule",
    userInput: "peintre industriel tendinopathie calcifiante épaule droite rupture partielle sus-épineux abduction limité 100° douleur chronique",
    expectedInjury: "Rupture partielle sus-épineux avec raideur modérée",
    expectedRate: 14, severity: "moyen",
    clinicalSigns: ["tendinopathie calcifiante", "rupture partielle", "abduction 100°"],
    justification: "Rupture partielle coiffe + abduction 100° = 12-16%",
    keywords: ["coiffe", "sus-epineux", "epaule", "tendinopathie"]
  },
  {
    id: "at-064", category: "AT - Coude",
    userInput: "plâtrier chute échelle luxation coude droit dominant flexion 100° extension -15° pronosupination 60°",
    expectedInjury: "Séquelles luxation coude avec raideur",
    expectedRate: 15, severity: "moyen",
    clinicalSigns: ["luxation coude", "flexion 100°", "extension -15°", "pronosupination 60°"],
    justification: "Raideur coude modérée flexion 100° + extension -15° = 14-18%",
    keywords: ["coude", "luxation", "flexion", "extension", "pronosupination"]
  },
  {
    id: "at-065", category: "AT - Coude",
    userInput: "ouvrier BTP fracture olécrane droit ostéosynthèse flexion 110° force diminuée 30%",
    expectedInjury: "Fracture olécrane avec raideur résiduelle",
    expectedRate: 12, severity: "moyen",
    clinicalSigns: ["fracture olécrane", "ostéosynthèse", "flexion 110°", "force -30%"],
    justification: "Olécrane + flexion 110° + force diminuée = 10-14%",
    keywords: ["fracture", "olecrane", "coude", "raideur"]
  },
  {
    id: "at-066", category: "AT - Poignet",
    userInput: "agent technique chute bureau fracture scaphoïde droit pseudarthrose raideur poignet dorsiflexion 35° palmarflexion 45°",
    expectedInjury: "Pseudarthrose scaphoïde avec raideur poignet",
    expectedRate: 14, severity: "moyen",
    clinicalSigns: ["pseudarthrose scaphoïde", "dorsiflexion 35°", "palmarflexion 45°"],
    justification: "Pseudarthrose scaphoïde + raideur poignet = 12-16%",
    keywords: ["scaphoide", "pseudarthrose", "poignet", "raideur"]
  },
  {
    id: "at-067", category: "AT - Poignet",
    userInput: "magasinier fracture radius distal droit Pouteau-Colles consolidée dorsiflexion 40° prise diminuée main dominante",
    expectedInjury: "Fracture Pouteau-Colles avec séquelles fonctionnelles",
    expectedRate: 10, severity: "moyen",
    clinicalSigns: ["fracture Pouteau-Colles", "dorsiflexion 40°", "prise diminuée"],
    justification: "Pouteau-Colles + raideur modérée = 8-12%",
    keywords: ["fracture", "pouteau-colles", "radius", "poignet"]
  },

  // ── Hanche / Membre inférieur post-AT ───────────────────────────────
  {
    id: "at-068", category: "AT - Hanche",
    userInput: "conducteur camion accident route fracture cotyle gauche PTH cimentée flexion 90° marche 1km boiterie",
    expectedInjury: "Fracture cotyle avec prothèse totale hanche",
    expectedRate: 25, severity: "élevé",
    clinicalSigns: ["fracture cotyle", "PTH", "flexion 90°", "marche 1km", "boiterie"],
    justification: "PTH + boiterie + marche limitée = 22-28%",
    keywords: ["cotyle", "prothese", "hanche", "boiterie"]
  },
  {
    id: "at-069", category: "AT - Hanche",
    userInput: "maçon chute 5m fracture col fémur droit vissage douleur résiduelle flexion 100° raccourcissement 1.5cm",
    expectedInjury: "Fracture col fémoral avec séquelles",
    expectedRate: 30, severity: "élevé",
    clinicalSigns: ["fracture col fémur", "flexion 100°", "raccourcissement 1.5cm", "douleur"],
    justification: "Col fémur + raccourcissement + limitation = 15-20%",
    keywords: ["fracture", "col", "femur", "raccourcissement"]
  },
  {
    id: "at-070", category: "AT - Genou",
    userInput: "carreleur position accroupie prolongée méniscectomie totale interne genou droit chondropathie stade 2 douleurs descente escalier",
    expectedInjury: "Méniscectomie totale interne + chondropathie",
    expectedRate: 15, severity: "moyen",
    clinicalSigns: ["méniscectomie totale interne", "chondropathie stade 2", "douleurs descente"],
    justification: "Méniscectomie totale + chondropathie stade 2 = 12-18%",
    keywords: ["meniscectomie", "chondropathie", "genou"]
  },
  {
    id: "at-071", category: "AT - Genou",
    userInput: "ouvrier BTP torsion genou droit rupture LCA laxité antérieure ++ instabilité en terrain accidenté flexion 120° extension 0°",
    expectedInjury: "Rupture LCA avec laxité résiduelle",
    expectedRate: 14, severity: "moyen",
    clinicalSigns: ["rupture LCA", "laxité ++", "instabilité terrain", "flexion 120°"],
    justification: "LCA + laxité résiduelle + instabilité = 12-16%",
    keywords: ["lca", "laxite", "instabilite", "genou"]
  },
  {
    id: "at-072", category: "AT - Genou",
    userInput: "coffreur entorse grave genou gauche rupture LCA + LLI laxité multidirectionnelle flexion 110° extension -5° dérobements quotidiens",
    expectedInjury: "Rupture LCA + LLI avec instabilité complexe",
    expectedRate: 22, severity: "élevé",
    clinicalSigns: ["rupture LCA", "rupture LLI", "laxité multidirectionnelle", "flexion 110°", "extension -5°"],
    justification: "LCA + LLI + laxité multidirectionnelle + raideur = 20-25%",
    keywords: ["lca", "lli", "laxite", "genou", "instabilite"]
  },
  {
    id: "at-073", category: "AT - Cheville",
    userInput: "agent voirie chute trottoir fracture bimalléolaire cheville droite dorsiflexion 5° boiterie claudication intermittente",
    expectedInjury: "Fracture bimalléolaire avec raideur sévère cheville",
    expectedRate: 16, severity: "élevé",
    clinicalSigns: ["fracture bimalléolaire", "dorsiflexion 5°", "boiterie", "claudication"],
    justification: "Bimalléolaire + dorsiflexion 5° + boiterie = 14-18%",
    keywords: ["bimalleolaire", "cheville", "dorsiflexion", "boiterie"]
  },
  {
    id: "at-074", category: "AT - Cheville",
    userInput: "facteur entorse grave cheville gauche fracture malléole externe instabilité résiduelle dorsiflexion 10° marche 1.5km",
    expectedInjury: "Fracture malléole externe avec instabilité résiduelle",
    expectedRate: 10, severity: "moyen",
    clinicalSigns: ["fracture malléole externe", "instabilité", "dorsiflexion 10°", "marche 1.5km"],
    justification: "Malléole + instabilité + raideur modérée = 8-12%",
    keywords: ["malleole", "cheville", "instabilite", "dorsiflexion"]
  },
  {
    id: "at-075", category: "AT - Rachis",
    userInput: "manutentionnaire port charge lourde hernie discale L5-S1 sciatique gauche opérée déficit sensitif résiduel Lasègue 40°",
    expectedInjury: "Hernie discale L5-S1 opérée avec déficit sensitif résiduel",
    expectedRate: 22, severity: "élevé",
    clinicalSigns: ["hernie L5-S1", "sciatique opérée", "déficit sensitif", "Lasègue 40°"],
    justification: "Hernie opérée + déficit sensitif + Lasègue 40° = signes neurologiques → 20-25%",
    keywords: ["hernie", "discale", "sciatique", "lasegue"]
  },
  {
    id: "at-076", category: "AT - Rachis",
    userInput: "ouvrier entrepôt lombosciatique chronique DDS 35cm Schober 2.5cm raideur lombaire permanente arrêts fréquents",
    expectedInjury: "Raideur rachis lombaire chronique",
    expectedRate: 10, severity: "moyen",
    clinicalSigns: ["DDS 35cm", "Schober 2.5cm", "raideur lombaire"],
    justification: "DDS 35cm + Schober 2.5cm = raideur modérée 8-12%",
    keywords: ["rachis", "lombaire", "dds", "schober", "raideur"]
  },
  {
    id: "at-077", category: "AT - Rachis",
    userInput: "chauffeur PL whiplash cervical syndrome cervical post-traumatique DMS 12cm rotation limitée 50° céphalées",
    expectedInjury: "Syndrome cervical post-traumatique (whiplash)",
    expectedRate: 10, severity: "moyen",
    clinicalSigns: ["whiplash", "DMS 12cm", "rotation 50°", "céphalées"],
    justification: "Syndrome cervical + DMS 12cm = 8-12%",
    keywords: ["cervical", "whiplash", "dms", "rotation"]
  },

  // ── Traumatismes crâniens post-AT ───────────────────────────────────
  {
    id: "at-078", category: "AT - TC",
    userInput: "ouvrier chute échafaudage traumatisme crânien grave coma 10 jours épilepsie post-traumatique crises mensuelles sous traitement",
    expectedInjury: "Épilepsie post-traumatique sous traitement (crises mensuelles)",
    expectedRate: 30, severity: "élevé",
    clinicalSigns: ["TC grave", "coma 10j", "épilepsie", "crises mensuelles"],
    justification: "Épilepsie crises mensuelles sous traitement = 25-35%",
    keywords: ["epilepsie", "traumatisme", "cranien", "crises"]
  },
  {
    id: "at-079", category: "AT - TC",
    userInput: "maçon chute mur traumatisme crânien modéré troubles cognitifs mémoire concentration ralentissement idéatoire",
    expectedInjury: "Troubles cognitifs post-traumatiques",
    expectedRate: 20, severity: "élevé",
    clinicalSigns: ["TC modéré", "troubles mémoire", "concentration", "ralentissement"],
    justification: "Troubles cognitifs modérés post-TC = 15-25%",
    keywords: ["traumatisme", "cranien", "cognitif", "memoire"]
  },
  {
    id: "at-080", category: "AT - TC",
    userInput: "ouvrier objet tombé sur tête traumatisme crânien anosmie totale post-traumatique définitive",
    expectedInjury: "Anosmie totale post-traumatique",
    expectedRate: 8, severity: "fixe",
    clinicalSigns: ["TC", "anosmie totale", "définitive"],
    justification: "Anosmie totale = 5-10%",
    keywords: ["anosmie", "odorat", "traumatisme", "cranien"]
  },

  // ── Membres supérieurs divers ───────────────────────────────────────
  {
    id: "at-081", category: "AT - Main",
    userInput: "charcutier section tendons fléchisseurs index et médius main droite dominante raideur séquellaire IPP en crochet",
    expectedInjury: "Raideur index + médius post-section tendons",
    expectedRate: 10, severity: "moyen",
    clinicalSigns: ["section tendons fléchisseurs", "raideur IPP", "index", "médius"],
    justification: "Raideur index 5% + raideur médius 4% ≈ 9-10%",
    keywords: ["tendon", "flechisseur", "raideur", "doigts"]
  },
  {
    id: "at-082", category: "AT - Main",
    userInput: "menuisier Dupuytren post-traumatique annulaire auriculaire main droite flexion irréductible MCP et IPP",
    expectedInjury: "Maladie de Dupuytren post-traumatique annulaire + auriculaire",
    expectedRate: 8, severity: "moyen",
    clinicalSigns: ["Dupuytren", "annulaire", "auriculaire", "flexion irréductible"],
    justification: "Dupuytren 2 doigts longs = 6-10%",
    keywords: ["dupuytren", "annulaire", "auriculaire", "flexion"]
  },
  {
    id: "at-083", category: "AT - Main",
    userInput: "ouvrier ligne assemblage syndrome canal carpien bilatéral post-traumatique opéré séquelles sensitives",
    expectedInjury: "Syndrome canal carpien bilatéral séquellaire",
    expectedRate: 10, severity: "moyen",
    clinicalSigns: ["canal carpien bilatéral", "opéré", "séquelles sensitives"],
    justification: "Canal carpien bilatéral opéré + séquelles = 8-12%",
    keywords: ["canal", "carpien", "bilateral", "sensitif"]
  },
  {
    id: "at-084", category: "AT - Bras",
    userInput: "manutentionnaire fracture tête radiale droite dominante pronosupination limitée 50° extension -10°",
    expectedInjury: "Fracture tête radiale avec limitation pronosupination",
    expectedRate: 12, severity: "moyen",
    clinicalSigns: ["fracture tête radiale", "pronosupination 50°", "extension -10°"],
    justification: "Tête radiale + pronosupination 50° = 10-14%",
    keywords: ["fracture", "tete radiale", "pronosupination"]
  },
  {
    id: "at-085", category: "AT - Avant-bras",
    userInput: "ferronnier fracture deux os avant-bras gauche pronosupination abolie cal vicieux radius cubitus",
    expectedInjury: "Fracture deux os avant-bras avec perte pronosupination",
    expectedRate: 20, severity: "élevé",
    clinicalSigns: ["fracture deux os", "pronosupination abolie", "cal vicieux"],
    justification: "Pronosupination abolie = 18-22%",
    keywords: ["fracture", "avant-bras", "pronosupination", "cal vicieux"]
  },

  // ── Membres inférieurs divers ───────────────────────────────────────
  {
    id: "at-086", category: "AT - Fémur",
    userInput: "conducteur accident route fracture sous-trochantérienne fémur droit enclouage raccourcissement 3cm boiterie canne occasionnelle",
    expectedInjury: "Fracture sous-trochantérienne fémur avec raccourcissement",
    expectedRate: 22, severity: "élevé",
    clinicalSigns: ["fracture sous-trochantérienne", "raccourcissement 3cm", "boiterie", "canne"],
    justification: "Sous-trochantérienne + raccourcissement 3cm + boiterie = 20-25%",
    keywords: ["fracture", "femur", "sous-trochantérien", "raccourcissement"]
  },
  {
    id: "at-087", category: "AT - Genou",
    userInput: "plombier traumatisme direct genou fracture rotule comminutive patellectomie partielle extension active déficitaire",
    expectedInjury: "Patellectomie partielle avec déficit extension",
    expectedRate: 15, severity: "élevé",
    clinicalSigns: ["fracture rotule comminutive", "patellectomie partielle", "déficit extension"],
    justification: "Patellectomie partielle + déficit extension = 12-18%",
    keywords: ["rotule", "patellectomie", "extension", "deficit"]
  },
  {
    id: "at-088", category: "AT - Jambe",
    userInput: "monteur acier chute poutre fracture tibia péroné droite enclouage centromédullaire consolidation 4° valgus",
    expectedInjury: "Fracture tibia-péroné avec cal vicieux en valgus",
    expectedRate: 12, severity: "moyen",
    clinicalSigns: ["fracture tibia-péroné", "cal vicieux", "valgus 4°"],
    justification: "Cal vicieux valgus modéré = 10-15%",
    keywords: ["fracture", "tibia", "perone", "cal vicieux", "valgus"]
  },
  {
    id: "at-089", category: "AT - Pied",
    userInput: "ouvrier port chute container écrasement avant-pied droit amputation transmétatarsienne",
    expectedInjury: "Amputation transmétatarsienne du pied",
    expectedRate: 19, severity: "fixe",
    clinicalSigns: ["écrasement avant-pied", "amputation transmétatarsienne"],
    justification: "Amputation transmétatarsienne = 19% barème 1967",
    keywords: ["amputation", "transmetatarsienne", "pied"]
  },
  {
    id: "at-090", category: "AT - Pied",
    userInput: "maçon écrasement pied gauche fracture métatarsiens douleurs chroniques métatarsalgies appui impossible",
    expectedInjury: "Fracture métatarsiens avec métatarsalgies chroniques",
    expectedRate: 10, severity: "moyen",
    clinicalSigns: ["fracture métatarsiens", "métatarsalgies", "appui douloureux"],
    justification: "Fracture métatarsiens + douleurs chroniques = 8-12%",
    keywords: ["fracture", "metatarsien", "metatarsalgie", "pied"]
  },

  // ── Nerfs périphériques post-AT ─────────────────────────────────────
  {
    id: "at-091", category: "AT - Nerfs",
    userInput: "ouvrier chantier section nerf sciatique poplité externe genou gauche pied tombant steppage marche avec releveur",
    expectedInjury: "Paralysie nerf sciatique poplité externe (pied tombant)",
    expectedRate: 20, severity: "élevé",
    clinicalSigns: ["paralysie SPE", "pied tombant", "steppage", "releveur"],
    justification: "Paralysie SPE = pied tombant = 15-25%",
    keywords: ["nerf", "sciatique", "poplite externe", "pied tombant", "steppage"]
  },
  {
    id: "at-092", category: "AT - Nerfs",
    userInput: "électricien section nerf cubital coude droit dominant griffe cubitale amyotrophie interosseux hypoesthésie bord cubital",
    expectedInjury: "Paralysie nerf cubital au coude main dominante",
    expectedRate: 30, severity: "élevé",
    clinicalSigns: ["section nerf cubital", "griffe cubitale", "amyotrophie", "hypoesthésie"],
    justification: "Nerf cubital coude dominante = 25-35%",
    keywords: ["nerf", "cubital", "griffe", "amyotrophie"]
  },
  {
    id: "at-093", category: "AT - Nerfs",
    userInput: "ouvrier forêt section nerf médian bras droit main de prédicateur perte opposition pouce force pince nulle",
    expectedInjury: "Paralysie nerf médian au bras main dominante",
    expectedRate: 45, severity: "élevé",
    clinicalSigns: ["section nerf médian bras", "main de prédicateur", "perte opposition pouce"],
    justification: "Nerf médian bras dominante = 45-55%",
    keywords: ["nerf", "median", "bras", "predicateur", "opposition"]
  },

  // ── Viscères / Thorax post-AT ───────────────────────────────────────
  {
    id: "at-094", category: "AT - Viscères",
    userInput: "ouvrier écrasé entre camion et mur contusion rein droit néphrectomie rein gauche fonctionnel normal",
    expectedInjury: "Néphrectomie traumatique (rein unique restant normal)",
    expectedRate: 25, severity: "fixe",
    clinicalSigns: ["contusion rénale", "néphrectomie", "rein unique"],
    justification: "Néphrectomie rein unique normal = 25%",
    keywords: ["nephrectomie", "rein", "contusion"]
  },
  {
    id: "at-095", category: "AT - Thorax",
    userInput: "ouvrier écrasement thoracique volet costal antérieur 3 côtes insuffisance respiratoire séquellaire VEMS 65%",
    expectedInjury: "Volet costal avec insuffisance respiratoire séquellaire",
    expectedRate: 25, severity: "élevé",
    clinicalSigns: ["volet costal", "VEMS 65%", "insuffisance respiratoire"],
    justification: "Volet costal + VEMS 65% = insuffisance respiratoire prouvée → 22-28%",
    keywords: ["volet", "costal", "vems", "respiratoire"]
  },
  {
    id: "at-096", category: "AT - Viscères",
    userInput: "ouvrier chantier empalé abdomen perforation intestinale colectomie partielle sigmoïde troubles transit définitifs",
    expectedInjury: "Colectomie partielle avec troubles transit",
    expectedRate: 20, severity: "élevé",
    clinicalSigns: ["perforation intestinale", "colectomie partielle", "troubles transit"],
    justification: "Colectomie partielle + troubles transit = 18-22%",
    keywords: ["colectomie", "intestin", "transit"]
  },

  // ── Vision post-AT ──────────────────────────────────────────────────
  {
    id: "at-097", category: "AT - Vision",
    userInput: "soudeur arc sans lunettes ophtalmie électrique bilatérale cataracte secondaire OD 6/10 OG 5/10",
    expectedInjury: "Cataracte post-ophtalmie électrique bilatérale",
    expectedRate: 10, severity: "élevé",
    clinicalSigns: ["ophtalmie électrique", "cataracte", "OD 6/10", "OG 5/10"],
    justification: "Cataracte bilatérale 6/10 et 5/10 = 28-35%",
    keywords: ["cataracte", "ophtalmie", "electrique", "bilaterale"]
  },
  {
    id: "at-098", category: "AT - Vision",
    userInput: "tourneur projection éclat métallique globe oculaire droit décollement rétine opéré acuité résiduelle 2/10 OG normal",
    expectedInjury: "Décollement rétine traumatique avec baisse acuité",
    expectedRate: 25, severity: "élevé",
    clinicalSigns: ["décollement rétine", "acuité 2/10 OD", "OG normal"],
    justification: "Décollement rétine acuité 2/10 unilatéral = 22-27% (barème vision table)",
    keywords: ["decollement", "retine", "acuite", "traumatique"]
  },
  {
    id: "at-099", category: "AT - Vision",
    userInput: "chimiste projection produit caustique glaucome traumatique OD tension oculaire instable acuité 4/10",
    expectedInjury: "Glaucome traumatique",
    expectedRate: 20, severity: "élevé",
    clinicalSigns: ["glaucome traumatique", "tension instable", "acuité 4/10"],
    justification: "Glaucome traumatique acuité 4/10 = 18-22%",
    keywords: ["glaucome", "traumatique", "tension", "acuite"]
  },
  {
    id: "at-100", category: "AT - Vision",
    userInput: "ouvrier explosion diplopie post-traumatique dans regard vers le haut fracture plancher orbital",
    expectedInjury: "Diplopie post-fracture plancher orbital",
    expectedRate: 12, severity: "moyen",
    clinicalSigns: ["diplopie", "fracture plancher orbital"],
    justification: "Diplopie dans un seul champ du regard = 10-15%",
    keywords: ["diplopie", "fracture", "orbital", "plancher"]
  },

  // ── Audition post-AT ────────────────────────────────────────────────
  {
    id: "at-101", category: "AT - Audition",
    userInput: "artificier blast auriculaire explosion surdité totale bilatérale acouphènes permanents vertige positionnel",
    expectedInjury: "Surdité totale bilatérale + acouphènes + vertiges",
    expectedRate: 72, severity: "élevé",
    clinicalSigns: ["surdité totale bilatérale", "acouphènes", "vertiges"],
    justification: "Surdité totale 60% + acouphènes 5% + vertiges 10% = cumul Balthazard ≈ 68-72%",
    keywords: ["surdite", "bilaterale", "acouphene", "vertige", "blast"]
  },
  {
    id: "at-102", category: "AT - Audition",
    userInput: "chaudronnier exposition bruit 20 ans surdité professionnelle bilatérale 60dB symétrique avec recrutement",
    expectedInjury: "Surdité professionnelle bilatérale 60dB",
    expectedRate: 25, severity: "moyen",
    clinicalSigns: ["surdité bilatérale 60dB", "exposition chronique", "recrutement"],
    justification: "Surdité 60dB bilatérale = tranche 60-80dB ≈ 25%",
    keywords: ["surdite", "professionnelle", "bilaterale", "bruit"]
  },

  // ── Rachis post-AT ──────────────────────────────────────────────────
  {
    id: "at-103", category: "AT - Rachis",
    userInput: "ouvrier chute 3m fracture tassement D12-L1 cyphose 20° DDS 30cm raideur dorso-lombaire",
    expectedInjury: "Fracture tassement D12-L1 avec cyphose et raideur",
    expectedRate: 15, severity: "élevé",
    clinicalSigns: ["tassement D12-L1", "cyphose 20°", "DDS 30cm"],
    justification: "Tassement D12-L1 + cyphose + raideur = 12-18%",
    keywords: ["tassement", "cyphose", "rachis", "dorso-lombaire"]
  },
  {
    id: "at-104", category: "AT - Rachis",
    userInput: "déménageur cervicalgie chronique post-entorse cervicale C5-C6 discopathie DMS 14cm rotations limitées 40°",
    expectedInjury: "Discopathie cervicale post-traumatique avec raideur",
    expectedRate: 12, severity: "moyen",
    clinicalSigns: ["discopathie C5-C6", "DMS 14cm", "rotations 40°"],
    justification: "Discopathie cervicale + DMS 14cm = 10-14%",
    keywords: ["discopathie", "cervical", "dms", "rotation"]
  },

  // ── Bassin post-AT ──────────────────────────────────────────────────
  {
    id: "at-105", category: "AT - Bassin",
    userInput: "ouvrier écrasé engin fracture disjonction pubienne douleurs symphysaires marche gênée troubles sexuels",
    expectedInjury: "Fracture disjonction pubienne avec séquelles",
    expectedRate: 20, severity: "élevé",
    clinicalSigns: ["disjonction pubienne", "douleurs symphysaires", "troubles sexuels"],
    justification: "Disjonction pubienne + douleurs + troubles sexuels = 18-22%",
    keywords: ["fracture", "bassin", "pubienne", "disjonction"]
  },
  {
    id: "at-106", category: "AT - Bassin",
    userInput: "conducteur TP renversement engin fracture aile iliaque droite douleur si longue douleur persistante",
    expectedInjury: "Fracture aile iliaque avec douleurs résiduelles",
    expectedRate: 8, severity: "moyen",
    clinicalSigns: ["fracture aile iliaque", "douleur persistante"],
    justification: "Fracture aile iliaque + douleurs = 6-10%",
    keywords: ["fracture", "aile iliaque", "bassin", "douleur"]
  },

  // ── Brûlures professionnelles ───────────────────────────────────────
  {
    id: "at-107", category: "AT - Brûlures",
    userInput: "pompier brûlure 2ème et 3ème degré membres supérieurs brides rétractiles coudes flexion limitée bilatérale",
    expectedInjury: "Brûlures membres supérieurs avec brides rétractiles coudes",
    expectedRate: 25, severity: "élevé",
    clinicalSigns: ["brûlure 2ème-3ème degré", "brides rétractiles", "coudes"],
    justification: "Brides rétractiles coudes bilatérales = 22-28%",
    keywords: ["brulure", "bride", "retractile", "coude"]
  },
  {
    id: "at-108", category: "AT - Brûlures",
    userInput: "soudeur brûlure thermique profonde face dorsale main droite cicatrices hypertrophiques limitation extension doigts",
    expectedInjury: "Brûlure main avec cicatrices et limitation extension doigts",
    expectedRate: 15, severity: "moyen",
    clinicalSigns: ["brûlure main", "cicatrices hypertrophiques", "limitation extension"],
    justification: "Cicatrices + limitation extension doigts = 12-18%",
    keywords: ["brulure", "cicatrice", "main", "extension"]
  },

  // ── SDRC (algodystrophie) post-AT ───────────────────────────────────
  {
    id: "at-109", category: "AT - SDRC",
    userInput: "ouvrière usine fracture poignet droit SDRC type 1 algodystrophie raideur globale poignet doigts œdème chronique douleur",
    expectedInjury: "SDRC type 1 (algodystrophie) poignet et main",
    expectedRate: 30, severity: "élevé",
    clinicalSigns: ["SDRC", "algodystrophie", "raideur poignet+doigts", "œdème"],
    justification: "SDRC majeure poignet+main raideur globale+œdème+douleur = 25-35%",
    keywords: ["sdrc", "algodystrophie", "poignet", "raideur"]
  },
  {
    id: "at-110", category: "AT - SDRC",
    userInput: "maçon fracture cheville droite algodystrophie pied ostéoporose post-traumatique raideur cheville pied marche limitée",
    expectedInjury: "Algodystrophie cheville-pied séquellaire",
    expectedRate: 18, severity: "élevé",
    clinicalSigns: ["algodystrophie", "ostéoporose", "raideur cheville-pied", "marche limitée"],
    justification: "Algodystrophie cheville-pied fixée = 15-20%",
    keywords: ["algodystrophie", "cheville", "pied", "osteoporose"]
  },

  // ── Cas modérés supplémentaires variés ──────────────────────────────
  {
    id: "at-111", category: "AT - BTP",
    userInput: "plaquiste luxation acromio-claviculaire droite stade 3 Rockwood touche piano résiduelle épaule dominante",
    expectedInjury: "Luxation acromio-claviculaire stade 3",
    expectedRate: 5, severity: "faible",
    clinicalSigns: ["LAC stade 3", "touche piano", "épaule dominante"],
    justification: "LAC barème max stade III = 5%",
    keywords: ["acromio-claviculaire", "luxation", "epaule"]
  },
  {
    id: "at-112", category: "AT - Transport",
    userInput: "routier accident violent traumatisme thoracique fracture 6 côtes hémothorax drainé séquelles pleurales",
    expectedInjury: "Fracture 6 côtes avec hémothorax et séquelles pleurales",
    expectedRate: 18, severity: "élevé",
    clinicalSigns: ["fracture 6 côtes", "hémothorax", "séquelles pleurales"],
    justification: "6 côtes + hémothorax + séquelles = 15-20%",
    keywords: ["fracture", "cotes", "hemothorax", "pleural"]
  },
  {
    id: "at-113", category: "AT - Industrie",
    userInput: "opérateur poinçonnage amputation P2 annulaire et P2 auriculaire main droite dominante",
    expectedInjury: "Amputation P2 annulaire + P2 auriculaire",
    expectedRate: 9, severity: "fixe",
    clinicalSigns: ["amputation P2 annulaire", "amputation P2 auriculaire"],
    justification: "P2 annulaire 5% + P2 auriculaire 4% = 9%",
    keywords: ["amputation", "phalange", "annulaire", "auriculaire"]
  },
  {
    id: "at-114", category: "AT - Agriculture",
    userInput: "ouvrier viticole tendinite sus-épineux épaule droite chronique rupture partielle abduction 110° arc douloureux 60-120°",
    expectedInjury: "Rupture partielle coiffe des rotateurs épaule",
    expectedRate: 15, severity: "moyen",
    clinicalSigns: ["tendinopathie sus-épineux", "abduction 110°", "arc douloureux"],
    justification: "Tendinopathie chronique + arc douloureux = 8-12%",
    keywords: ["tendinopathie", "sus-epineux", "epaule", "arc douloureux"]
  },
  {
    id: "at-115", category: "AT - BTP",
    userInput: "coffreur entorse genou médiale grave rupture LLI isolée laxité résiduelle modérée",
    expectedInjury: "Laxité résiduelle post-rupture LLI genou",
    expectedRate: 8, severity: "moyen",
    clinicalSigns: ["rupture LLI", "laxité modérée", "entorse médiale"],
    justification: "LLI isolée + laxité modérée = 6-10%",
    keywords: ["lli", "laxite", "genou", "entorse"]
  },
  {
    id: "at-116", category: "AT - Services",
    userInput: "infirmière manipulation patient épicondylite chronique coude droit tendinopathie des épicondyliens latéraux rebelle",
    expectedInjury: "Épicondylite chronique coude",
    expectedRate: 5, severity: "faible",
    clinicalSigns: ["épicondylite chronique", "tendinopathie latérale"],
    justification: "Épicondylite chronique séquellaire = 4-6%",
    keywords: ["epicondylite", "coude", "tendinopathie"]
  },
  {
    id: "at-117", category: "AT - Mines",
    userInput: "mineur traumatisme épaule gauche rupture totale coiffe rotateurs suture opérée force résiduelle 3/5 abduction 80°",
    expectedInjury: "Rupture totale coiffe opérée avec séquelles",
    expectedRate: 20, severity: "élevé",
    clinicalSigns: ["rupture totale coiffe", "opérée", "force 3/5", "abduction 80°"],
    justification: "Coiffe opérée + force 3/5 + abduction 80° = 18-22%",
    keywords: ["coiffe", "rotateurs", "rupture", "epaule"]
  },
  {
    id: "at-118", category: "AT - BTP",
    userInput: "étancheur brûlure bitume chaud pied gauche nécrose cutanée greffe cicatrice rétractile plante pied marche douloureuse",
    expectedInjury: "Brûlure pied avec cicatrice rétractile plantaire",
    expectedRate: 12, severity: "moyen",
    clinicalSigns: ["brûlure pied", "greffe", "cicatrice rétractile plantaire"],
    justification: "Cicatrice rétractile plantaire + marche douloureuse = 10-15%",
    keywords: ["brulure", "pied", "cicatrice", "plantaire"]
  },
  {
    id: "at-119", category: "AT - Chimie",
    userInput: "technicien produits chimiques dermatose professionnelle eczéma chronique mains bilatéral invalidant fissures permanentes",
    expectedInjury: "Dermatose professionnelle chronique mains",
    expectedRate: 8, severity: "moyen",
    clinicalSigns: ["dermatose professionnelle", "eczéma chronique", "mains bilatéral"],
    justification: "Dermatose chronique invalidante mains = 6-10%",
    keywords: ["dermatose", "eczema", "professionnelle", "mains"]
  },
  {
    id: "at-120", category: "AT - Transport",
    userInput: "conducteur accident frontal fracture sternale isolée douleurs thoraciques résiduelles gêne respiration profonde",
    expectedInjury: "Fracture sternum isolée avec douleurs résiduelles",
    expectedRate: 5, severity: "faible",
    clinicalSigns: ["fracture sternum", "douleurs résiduelles", "gêne respiratoire"],
    justification: "Fracture sternum isolée guérie + douleurs = 3-6%",
    keywords: ["fracture", "sternum", "douleur", "thorax"]
  },

  // ── Cas modérés supplémentaires ─────────────────────────────────────
  {
    id: "at-121", category: "AT - BTP",
    userInput: "grutier fracture os propres nez déviation septale obstruction nasale unilatérale anosmie partielle",
    expectedInjury: "Fracture os propres du nez avec déviation et anosmie partielle",
    expectedRate: 6, severity: "faible",
    clinicalSigns: ["fracture nez", "déviation septale", "anosmie partielle"],
    justification: "Fracture nez + déviation + anosmie partielle = 5-8%",
    keywords: ["fracture", "nez", "deviation", "anosmie"]
  },
  {
    id: "at-122", category: "AT - Agroalimentaire",
    userInput: "ouvrier conserverie section tendon achille droit lors accident rupture partielle ré-opérée marche sur pointe impossible",
    expectedInjury: "Section tendon d'Achille avec séquelles",
    expectedRate: 10, severity: "moyen",
    clinicalSigns: ["section tendon Achille", "marche sur pointe impossible"],
    justification: "Séquelles section tendon Achille = 8-12%",
    keywords: ["tendon", "achille", "rupture", "marche"]
  },
  {
    id: "at-123", category: "AT - Services",
    userInput: "agent d'entretien glissade sol mouillé fracture trochanter fémur gauche ostéosynthèse boiterie résiduelle",
    expectedInjury: "Fracture trochantérienne avec boiterie",
    expectedRate: 15, severity: "moyen",
    clinicalSigns: ["fracture trochanter", "ostéosynthèse", "boiterie"],
    justification: "Fracture trochantérienne + boiterie = 12-18%",
    keywords: ["fracture", "trochanter", "femur", "boiterie"]
  },
  {
    id: "at-124", category: "AT - Industrie",
    userInput: "monteur écrasement orteil gros orteil droit amputation métatarso-phalangienne marche modifiée",
    expectedInjury: "Amputation gros orteil au niveau métatarso-phalangien",
    expectedRate: 10, severity: "fixe",
    clinicalSigns: ["amputation gros orteil", "niveau métatarso-phalangien"],
    justification: "Gros orteil complet = 10%",
    keywords: ["amputation", "gros orteil", "metatarso-phalangien"]
  },
  {
    id: "at-125", category: "AT - BTP",
    userInput: "maçon effort soulèvement parpaings cruralgie L3-L4 paralysie crurale partielle testing quadriceps 3/5",
    expectedInjury: "Cruralgie L3-L4 avec paralysie crurale partielle",
    expectedRate: 20, severity: "élevé",
    clinicalSigns: ["cruralgie L3-L4", "paralysie crurale", "testing 3/5"],
    justification: "Paralysie crurale partielle testing 3/5 = 18-22%",
    keywords: ["cruralgie", "paralysie", "crurale", "quadriceps"]
  },
  {
    id: "at-126", category: "AT - Transport",
    userInput: "chauffeur accident collision frontale fracture corps vertébral C5 raideur cervicale sévère DMS 10cm",
    expectedInjury: "Fracture corps vertébral C5 avec raideur cervicale sévère",
    expectedRate: 18, severity: "élevé",
    clinicalSigns: ["fracture C5", "DMS 10cm", "raideur cervicale"],
    justification: "Fracture cervicale C5 + DMS 10cm = 15-20%",
    keywords: ["fracture", "cervical", "c5", "dms"]
  },
  {
    id: "at-127", category: "AT - Industrie",
    userInput: "ouvrier usine traumatisme facial perte 4 dents incisives prothèse dentaire troubles mastication",
    expectedInjury: "Perte dentaire traumatique avec prothèse",
    expectedRate: 5, severity: "faible",
    clinicalSigns: ["perte 4 incisives", "prothèse dentaire", "troubles mastication"],
    justification: "Perte 4 dents + prothèse = 4-6%",
    keywords: ["perte", "dents", "prothese", "mastication"]
  },
  {
    id: "at-128", category: "AT - BTP",
    userInput: "plâtrier projection plâtre œil gauche corps étranger kératite cicatricielle acuité 8/10 OG OD normal",
    expectedInjury: "Kératite cicatricielle post-traumatique",
    expectedRate: 5, severity: "faible",
    clinicalSigns: ["kératite cicatricielle", "acuité 8/10 OG", "OD normal"],
    justification: "Acuité 8/10 unilatérale = 2-5% per barème",
    keywords: ["keratite", "cicatricielle", "acuite", "oeil"]
  },
  {
    id: "at-129", category: "AT - Agriculture",
    userInput: "éleveur morsure chien de garde cicatrice chéloïde jambe droite prurit chronique gêne esthétique",
    expectedInjury: "Cicatrice chéloïde post-morsure jambe",
    expectedRate: 3, severity: "faible",
    clinicalSigns: ["cicatrice chéloïde", "prurit chronique", "morsure"],
    justification: "Cicatrice chéloïde + prurit = 2-5%",
    keywords: ["cicatrice", "cheloide", "morsure"]
  },
  {
    id: "at-130", category: "AT - Métallurgie",
    userInput: "ajusteur bruit marteau pneumatique surdité unilatérale gauche 80dB oreille droite 30dB acouphènes",
    expectedInjury: "Surdité asymétrique professionnelle + acouphènes",
    expectedRate: 18, severity: "moyen",
    clinicalSigns: ["surdité OG 80dB", "OD 30dB", "acouphènes"],
    justification: "Surdité asymétrique OG + acouphènes = 15-20%",
    keywords: ["surdite", "asymetrique", "acouphene", "professionnelle"]
  },
];

// ═══════════════════════════════════════════════════════════════════════
// PARTIE 3: CAS AT COMPLEXES (70 cas) - Polytraumatismes, cumuls
// Balthazard, états antérieurs, narrations complexes
// ═══════════════════════════════════════════════════════════════════════

export const atComplexes: TrainingCase[] = [
  // ── Polytraumatismes BTP (chutes graves) ────────────────────────────
  {
    id: "at-131", category: "AT - Poly BTP",
    userInput: "ouvrier chute 8m échafaudage fracture calcanéum gauche + tassement L1 + fracture poignet droit marche avec canne raideur lombaire DDS 30cm",
    expectedInjury: "Polytraumatisme: calcanéum + tassement L1 + fracture poignet",
    expectedRate: 38, severity: "élevé",
    clinicalSigns: ["fracture calcanéum", "tassement L1", "fracture poignet", "canne", "DDS 30cm"],
    justification: "Calcanéum 20% + tassement L1 12% + poignet 10% = Balthazard ≈ 37-38%",
    keywords: ["calcaneum", "tassement", "poignet", "polytraumatisme"],
    commonMistakes: ["Additionner les taux directement (42%) au lieu d'appliquer Balthazard"]
  },
  {
    id: "at-132", category: "AT - Poly BTP",
    userInput: "charpentier chute toiture 10m fracture bassin cotyle droit + fracture pilon tibial gauche + fracture 5 côtes PTH + arthrodèse cheville",
    expectedInjury: "Polytraumatisme: cotyle/PTH + pilon tibial/arthrodèse + côtes",
    expectedRate: 48, severity: "élevé",
    clinicalSigns: ["PTH", "arthrodèse cheville", "fracture 5 côtes", "fracture cotyle"],
    justification: "PTH 25% + arthrodèse cheville 25% + côtes 10% = Balthazard ≈ 48%",
    keywords: ["cotyle", "pilon tibial", "prothese", "arthrodese", "polytraumatisme"],
    commonMistakes: ["Oublier séquelles côtes dans le cumul"]
  },
  {
    id: "at-133", category: "AT - Poly BTP",
    userInput: "couvreur glissade toit fracture rachis D12 paraplégie complète T12 fauteuil roulant troubles vésico-sphinctériens",
    expectedInjury: "Paraplégie complète",
    expectedRate: 100, severity: "élevé",
    clinicalSigns: ["paraplégie complète", "fauteuil roulant", "troubles vésico-sphinctériens"],
    justification: "Paraplégie complète = 100% barème 1967",
    keywords: ["paraplegie", "complete", "fauteuil", "vesico-sphincterien"],
    commonMistakes: ["Sous-évaluer en oubliant troubles sphinctériens"]
  },
  {
    id: "at-134", category: "AT - Poly BTP",
    userInput: "électricien chute poteau fracture humérus droit + luxation épaule droite + paralysie plexus brachial partielle bras dominant abduction 30° force 2/5",
    expectedInjury: "Paralysie plexus brachial partielle post-fracture + luxation",
    expectedRate: 55, severity: "élevé",
    clinicalSigns: ["fracture humérus", "luxation épaule", "paralysie plexus brachial", "abduction 30°", "force 2/5"],
    justification: "Paralysie plexus brachial partielle dominante = 50-60%",
    keywords: ["plexus", "brachial", "paralysie", "humerus", "luxation"]
  },

  // ── Polytraumatismes accident route (mission) ───────────────────────
  {
    id: "at-135", category: "AT - Poly Route",
    userInput: "chauffeur livreur accident véhicule de service fracture fémur gauche + fracture radius droit + TC modéré épilepsie post-traumatique rare raccourcissement 2cm",
    expectedInjury: "Polytraumatisme: fémur + radius + épilepsie post-TC",
    expectedRate: 42, severity: "élevé",
    clinicalSigns: ["fracture fémur", "raccourcissement 2cm", "fracture radius", "épilepsie rare"],
    justification: "Fémur 15% + radius 10% + épilepsie rare 20% = Balthazard ≈ 40-42%",
    keywords: ["femur", "radius", "epilepsie", "polytraumatisme", "accident route"],
    commonMistakes: ["Oublier d'inclure les séquelles neurologiques du TC"]
  },
  {
    id: "at-136", category: "AT - Poly Route",
    userInput: "commercial en mission collision frontale fracture sternum + contusion myocardique + whiplash cervical DMS 12cm douleurs thoraciques permanentes",
    expectedInjury: "Polytraumatisme: sternum + contusion myocardique + cervical",
    expectedRate: 25, severity: "élevé",
    clinicalSigns: ["fracture sternum", "contusion myocardique", "whiplash cervical", "DMS 12cm"],
    justification: "Sternum+contusion cardiaque 15% + cervical 10% = Balthazard ≈ 24%",
    keywords: ["sternum", "myocardique", "cervical", "whiplash"]
  },
  {
    id: "at-137", category: "AT - Poly Route",
    userInput: "conducteur poids lourd renversement cabine fracture tibia péroné gauche + fracture poignet gauche + rupture rate splénectomie pseudarthrose tibia",
    expectedInjury: "Polytraumatisme: tibia/pseudarthrose + poignet + splénectomie",
    expectedRate: 42, severity: "élevé",
    clinicalSigns: ["pseudarthrose tibia", "fracture poignet", "splénectomie"],
    justification: "Pseudarthrose tibia 22% + poignet 10% + splénectomie 18% = Balthazard ≈ 42%",
    keywords: ["pseudarthrose", "tibia", "splenectomie", "poignet", "polytraumatisme"]
  },

  // ── Polytraumatismes industrie ──────────────────────────────────────
  {
    id: "at-138", category: "AT - Poly Industrie",
    userInput: "explosion usine chimique brûlures 3ème degré face et mains + perte vision OD + surdité bilatérale 50dB blast auriculaire",
    expectedInjury: "Polytraumatisme: brûlures + perte vision OD + surdité",
    expectedRate: 62, severity: "élevé",
    clinicalSigns: ["brûlures 3° face/mains", "perte vision OD", "surdité 50dB bilatérale"],
    justification: "Vision OD 30% + surdité bilatérale 20% + brûlures 25% = Balthazard ≈ 58-62%",
    keywords: ["brulure", "vision", "surdite", "explosion", "polytraumatisme"]
  },
  {
    id: "at-139", category: "AT - Poly Industrie",
    userInput: "ouvrier fonderie accident coulée métal en fusion brûlure pied droit amputation Chopart + brûlure main gauche raideur 5 doigts",
    expectedInjury: "Polytraumatisme: amputation Chopart + brûlure main",
    expectedRate: 42, severity: "élevé",
    clinicalSigns: ["amputation Chopart", "brûlure main", "raideur 5 doigts"],
    justification: "Chopart 35% + raideur main 20% = Balthazard ≈ 48%",
    keywords: ["amputation", "chopart", "brulure", "main", "raideur"]
  },
  {
    id: "at-140", category: "AT - Poly Industrie",
    userInput: "opérateur presse industrielle écrasement deux mains amputation 4 doigts main droite + amputation 3 doigts main gauche pouce conservé bilatéral",
    expectedInjury: "Amputation multiples doigts bilatérale",
    expectedRate: 48, severity: "élevé",
    clinicalSigns: ["amputation 4 doigts main droite", "amputation 3 doigts main gauche"],
    justification: "Main D 31% + main G 25% = Balthazard ≈ 48-52%",
    keywords: ["amputation", "doigts", "bilateral", "presse"]
  },

  // ── Polytraumatismes mines/carrières ────────────────────────────────
  {
    id: "at-141", category: "AT - Poly Mines",
    userInput: "mineur effondrement galerie ensevelissement fracture bassin + fracture rachis L3 + fracture côtes volet costal + contusion pulmonaire",
    expectedInjury: "Polytraumatisme: bassin + rachis + volet costal",
    expectedRate: 50, severity: "élevé",
    clinicalSigns: ["fracture bassin", "fracture L3", "volet costal", "contusion pulmonaire"],
    justification: "Bassin 20% + L3 12% + volet costal 20% = Balthazard ≈ 44-50%",
    keywords: ["bassin", "rachis", "volet costal", "ensevelissement"]
  },
  {
    id: "at-142", category: "AT - Poly Mines",
    userInput: "carrier explosion prématurée blast auriculaire + projection éclats visage perte vision OG + surdité bilatérale 70dB + fracture mandibule",
    expectedInjury: "Polytraumatisme: vision OG + surdité + mandibule",
    expectedRate: 58, severity: "élevé",
    clinicalSigns: ["perte vision OG", "surdité 70dB bilatérale", "fracture mandibule"],
    justification: "Vision OG 30% + surdité 30% + mandibule 12% = Balthazard ≈ 55-58%",
    keywords: ["vision", "surdite", "mandibule", "explosion", "blast"]
  },

  // ── Cas avec états antérieurs ───────────────────────────────────────
  {
    id: "at-143", category: "AT - État antérieur",
    userInput: "ouvrier diabétique état antérieur 10% accident fracture cheville droite amputation transtibiale complication vasculaire",
    expectedInjury: "Amputation transtibiale sur terrain diabétique (EA 10%)",
    expectedRate: 45, severity: "élevé",
    clinicalSigns: ["diabète préexistant", "fracture cheville", "amputation transtibiale"],
    justification: "Amputation transtibiale 50% brut - EA 10% → nouvelle IPP imputable: T_global = 10 + (90 × 50/100) = 55%. IPP imputable = 55 - 10 = 45%",
    keywords: ["amputation", "transtibiale", "diabete", "etat anterieur"],
    commonMistakes: ["Ignorer l'état antérieur", "Soustraire directement 10% du taux brut"]
  },
  {
    id: "at-144", category: "AT - État antérieur",
    userInput: "maçon état antérieur genou droit méniscectomie ancienne 5% IPP nouvel accident rupture LCA même genou laxité sévère",
    expectedInjury: "Rupture LCA sur genou avec EA méniscectomie (5%)",
    expectedRate: 14, severity: "élevé",
    clinicalSigns: ["EA méniscectomie 5%", "rupture LCA", "laxité sévère"],
    justification: "LCA laxité sévère 15% brut. EA 5% → nouvelle IPP = capacité restante 95% × 15/100 = 14.25% → 14%",
    keywords: ["lca", "meniscectomie", "etat anterieur", "genou"],
    commonMistakes: ["Additionner 5% + 15% = 20%", "Ne pas appliquer la règle de la capacité restante"]
  },
  {
    id: "at-145", category: "AT - État antérieur",
    userInput: "conducteur surdité professionnelle préexistante 15% IPP reconnu nouvel accident explosion surdité aggravée maintenant 50dB bilatérale",
    expectedInjury: "Aggravation surdité professionnelle (EA 15%)",
    expectedRate: 10, severity: "moyen",
    clinicalSigns: ["EA surdité 15%", "explosion", "aggravation 50dB bilatérale"],
    justification: "Surdité 50dB bilatérale = 20% global. EA 15% → nouvelle IPP imputable: (80-85)×20/100 = 5% environ, mais ajusté à 10% pour aggravation significative",
    keywords: ["surdite", "aggravation", "etat anterieur", "explosion"],
    commonMistakes: ["Retenir le taux global sans déduction EA"]
  },
  {
    id: "at-146", category: "AT - État antérieur",
    userInput: "ouvrier arthrose hanche gauche EA 8% chute travail fracture col fémur même hanche PTH cimentée boiterie",
    expectedInjury: "Fracture col fémur/PTH sur arthrose préexistante (EA 8%)",
    expectedRate: 20, severity: "élevé",
    clinicalSigns: ["EA arthrose hanche 8%", "fracture col fémur", "PTH", "boiterie"],
    justification: "PTH 25% brut. EA 8% → IPP imputable = 92% × 25/100 = 23% ajusté à 20% car arthrose contributive",
    keywords: ["prothese", "hanche", "arthrose", "etat anterieur", "col femur"],
    commonMistakes: ["Ne pas déduire l'état antérieur arthrosique"]
  },

  // ── Narrations réalistes AT (style rapport médical) ─────────────────
  {
    id: "at-147", category: "AT - Narration",
    userInput: "Sujet masculin 45 ans maçon qualifié. AT du 15/03/2024 par chute d'un échafaudage (hauteur 5m). Fracture comminutive plateau tibial externe droit. Ostéosynthèse par plaque. À la consolidation: genou droit flexion 100° extension -5° laxité latérale ++ arthrose débutante radio. Périmètre marche 1km avec douleurs.",
    expectedInjury: "Fracture plateau tibial avec raideur et arthrose débutante",
    expectedRate: 20, severity: "élevé",
    clinicalSigns: ["fracture plateau tibial", "flexion 100°", "extension -5°", "laxité", "arthrose"],
    justification: "Plateau tibial + raideur + laxité + arthrose = 18-22%",
    keywords: ["plateau", "tibial", "raideur", "arthrose", "genou"]
  },
  {
    id: "at-148", category: "AT - Narration",
    userInput: "Patiente 38 ans aide-soignante. AT par effort de manutention d'un patient. Hernie discale L4-L5 gauche confirmée IRM. Discectomie chirurgicale. Post-opératoire: raideur lombaire DDS 35cm, Schober 2cm, sciatique résiduelle Lasègue 50° déficit sensitif L5 persistant.",
    expectedInjury: "Hernie discale L4-L5 opérée avec séquelles",
    expectedRate: 14, severity: "moyen",
    clinicalSigns: ["hernie L4-L5 opérée", "DDS 35cm", "Schober 2cm", "Lasègue 50°", "déficit sensitif L5"],
    justification: "Hernie opérée + raideur modérée + déficit sensitif résiduel = 12-16%",
    keywords: ["hernie", "discale", "discectomie", "sciatique", "raideur"]
  },
  {
    id: "at-149", category: "AT - Narration",
    userInput: "Homme 52 ans soudeur industriel. AT: explosion arc électrique. Brûlures 2ème degré profond face et cou. Cataracte bilatérale secondaire. Acuité corrigée: OD 4/10 OG 5/10. Cicatrices visage importantes. Troubles psychologiques réactionnels.",
    expectedInjury: "Brûlures faciales + cataracte bilatérale + préjudice esthétique",
    expectedRate: 20, severity: "élevé",
    clinicalSigns: ["brûlures face", "cataracte bilatérale", "OD 4/10", "OG 5/10", "cicatrices"],
    justification: "Cataracte 4/10-5/10 = 35% + cicatrices face 10% = Balthazard ≈ 42%",
    keywords: ["brulure", "cataracte", "bilaterale", "cicatrice", "visage"]
  },
  {
    id: "at-150", category: "AT - Narration",
    userInput: "Sujet 29 ans manœuvre BTP. Effondrement tranchée. Ensevelissement partiel 30 minutes. Fracture bassin (branche ischio-pubienne bilatérale) + fracture 3 côtes droites + contusion rénale droite. Consolidation: douleurs pelviennes marche gênée 1km, dysurie intermittente.",
    expectedInjury: "Polytraumatisme: bassin bilatéral + côtes + contusion rénale",
    expectedRate: 28, severity: "élevé",
    clinicalSigns: ["fracture bassin bilatérale", "côtes", "contusion rénale", "marche 1km", "dysurie"],
    justification: "Bassin bilatéral 18% + côtes 5% + séquelles rénales 8% = Balthazard ≈ 28%",
    keywords: ["bassin", "cotes", "renal", "ensevelissement", "polytraumatisme"]
  },

  // ── AT avec narration familière / langage SMS ───────────────────────
  {
    id: "at-151", category: "AT - Langage familier",
    userInput: "jé tombé du toi 4metr le pié droit il é pété le talon sa fé tré mal je boite je peu pu marché plus de 200m",
    expectedInjury: "Fracture calcanéum avec séquelles sévères",
    expectedRate: 25, severity: "élevé",
    clinicalSigns: ["fracture calcanéum", "boiterie", "marche <200m"],
    justification: "Fracture calcanéum + marche < 200m + boiterie sévère = 22-28%",
    keywords: ["calcaneum", "boiterie", "marche"]
  },
  {
    id: "at-152", category: "AT - Langage familier",
    userInput: "la machine ma happé la main G tou lé doi son parti sof le pouce jé perdu 4 dois",
    expectedInjury: "Amputation 4 doigts sauf pouce main gauche",
    expectedRate: 28, severity: "fixe",
    clinicalSigns: ["amputation 4 doigts", "pouce conservé", "main gauche"],
    justification: "Index 10 + médius 8 + annulaire 7 + auriculaire 6 = 31%",
    keywords: ["amputation", "doigts", "main", "machine"]
  },
  {
    id: "at-153", category: "AT - Langage familier",
    userInput: "accident chantié le mur il é tombé sur moi jé le do casé la colone vertébral kontuzioné le médecin il di parapléji inkomplèt",
    expectedInjury: "Fracture rachis avec paraplégie incomplète",
    expectedRate: 55, severity: "élevé",
    clinicalSigns: ["fracture rachis", "paraplégie incomplète"],
    justification: "Paraplégie incomplète = 50-60%",
    keywords: ["paraplegie", "incomplete", "rachis", "fracture"]
  },
  {
    id: "at-154", category: "AT - Langage familier",
    userInput: "suis tombé de lechafo 6m jé le jnou pété + la chville + le poigné G touka jé tré mal partu",
    expectedInjury: "Polytraumatisme: genou + cheville + poignet",
    expectedRate: 32, severity: "élevé",
    clinicalSigns: ["fracture genou", "fracture cheville", "fracture poignet"],
    justification: "Genou 15% + cheville 14% + poignet 10% = Balthazard ≈ 34% ajusté selon séquelles réelles",
    keywords: ["genou", "cheville", "poignet", "polytraumatisme"]
  },

  // ── AT avec cumuls membre supérieur ─────────────────────────────────
  {
    id: "at-155", category: "AT - Cumul MS",
    userInput: "menuisier accident scie radiale fracture humérus droit dominant + section nerf radial récupération 3/5 + raideur épaule abduction 60°",
    expectedInjury: "Fracture humérus + paralysie radiale partielle + raideur épaule",
    expectedRate: 40, severity: "élevé",
    clinicalSigns: ["fracture humérus", "nerf radial 3/5", "abduction 60°"],
    justification: "Paralysie radiale partielle 25% + raideur épaule 22% = Balthazard ≈ 42% ajusté car même membre",
    keywords: ["humerus", "nerf radial", "epaule", "raideur", "cumul"]
  },
  {
    id: "at-156", category: "AT - Cumul MS",
    userInput: "ouvrier accident machine fracture radius cubitus droit cal vicieux pronosupination 30° + syndrome canal carpien séquellaire sensitif + raideur poignet dorsiflexion 25°",
    expectedInjury: "Fracture avant-bras + canal carpien + raideur poignet",
    expectedRate: 28, severity: "élevé",
    clinicalSigns: ["cal vicieux avant-bras", "pronosupination 30°", "canal carpien", "dorsiflexion 25°"],
    justification: "Pronosupination 30° = 18% + canal carpien 8% + raideur 6% = Balthazard ≈ 28%",
    keywords: ["avant-bras", "pronosupination", "canal carpien", "poignet", "cumul"]
  },

  // ── AT avec cumuls membre inférieur ─────────────────────────────────
  {
    id: "at-157", category: "AT - Cumul MI",
    userInput: "maçon chute échafaudage polytraumatisme MI droit fracture col fémur + fracture rotule + fracture calcanéum même côté raccourcissement 3cm genou raide 90° cheville raide",
    expectedInjury: "Polytraumatisme MI droit: col fémur + rotule + calcanéum",
    expectedRate: 52, severity: "élevé",
    clinicalSigns: ["fracture col fémur", "raccourcissement 3cm", "genou 90°", "cheville raide", "calcanéum"],
    justification: "Col fémur 25% + rotule/genou 15% + calcanéum 20% = Balthazard ≈ 49-52%",
    keywords: ["col femur", "rotule", "calcaneum", "polytraumatisme", "cumul"]
  },
  {
    id: "at-158", category: "AT - Cumul MI",
    userInput: "ouvrier renversé par engin fracture pilon tibial gauche + rupture LCA genou gauche arthrodèse cheville + laxité genou douleurs permanentes marche avec canne",
    expectedInjury: "Polytraumatisme MI gauche: pilon tibial/arthrodèse + LCA",
    expectedRate: 35, severity: "élevé",
    clinicalSigns: ["arthrodèse cheville", "rupture LCA", "laxité", "canne"],
    justification: "Arthrodèse cheville 25% + LCA laxité 14% = Balthazard ≈ 35%",
    keywords: ["arthrodese", "cheville", "lca", "genou", "cumul"]
  },

  // ── AT avec cumuls multisièges ──────────────────────────────────────
  {
    id: "at-159", category: "AT - Poly Multi",
    userInput: "ouvrier chute grue 12m polytraumatisme sévère TC grave coma 15j épilepsie + fracture rachis C6 tétraplégie incomplète + fractures multiples membres rééducation 18 mois",
    expectedInjury: "Polytraumatisme gravissime: TC/épilepsie + tétraplégie incomplète",
    expectedRate: 85, severity: "élevé",
    clinicalSigns: ["TC grave", "coma 15j", "épilepsie", "tétraplégie incomplète", "C6"],
    justification: "Tétraplégie incomplète C6 = 75-85% + épilepsie = quasi 85%",
    keywords: ["tetraplegie", "incomplete", "epilepsie", "traumatisme cranien"],
    commonMistakes: ["Sous-évaluer car incomplète"]
  },
  {
    id: "at-160", category: "AT - Poly Multi",
    userInput: "routier accident PL renversé en mission polytraumatisme fracture fémur D + fracture tibia G + fracture humérus G + rupture rate splénectomie raccourcissements bilatéraux",
    expectedInjury: "Polytraumatisme 4 segments: fémur + tibia + humérus + splénectomie",
    expectedRate: 46, severity: "élevé",
    clinicalSigns: ["fracture fémur D", "fracture tibia G", "fracture humérus G", "splénectomie"],
    justification: "Fémur 15% + tibia 12% + humérus 10% + splénectomie 18% = Balthazard ≈ 45-52%",
    keywords: ["femur", "tibia", "humerus", "splenectomie", "polytraumatisme"]
  },
  {
    id: "at-161", category: "AT - Poly Multi",
    userInput: "ouvrier explosion bouteille gaz polytraumatisme brûlures étendues 40% SC + blast auriculaire surdité 60dB bilatérale + décollement rétine OD vision 1/10",
    expectedInjury: "Polytraumatisme: brûlures 40% SC + surdité + vision",
    expectedRate: 62, severity: "élevé",
    clinicalSigns: ["brûlures 40% SC", "surdité 60dB bilatérale", "décollement rétine", "vision OD 1/10"],
    justification: "Brûlures étendues 30% + vision OD 28% + surdité 25% = Balthazard ≈ 62-68%",
    keywords: ["brulure", "surdite", "vision", "explosion", "polytraumatisme"]
  },

  // ── AT avec imputabilité complexe ───────────────────────────────────
  {
    id: "at-162", category: "AT - Imputabilité",
    userInput: "ouvrier 55 ans chute travail fracture poignet gauche découverte fortuite arthrose préexistante raideur poignet. Imputabilité: arthrose préexistante asymptomatique révélée par traumatisme. Taux global brut 15% dont 5% imputable EA.",
    expectedInjury: "Fracture poignet sur arthrose préexistante révélée",
    expectedRate: 10, severity: "moyen",
    clinicalSigns: ["fracture poignet", "arthrose préexistante", "raideur"],
    justification: "Taux global 15% - EA 5% = 10% imputable à l'AT",
    keywords: ["poignet", "arthrose", "etat anterieur", "imputabilite"]
  },
  {
    id: "at-163", category: "AT - Imputabilité",
    userInput: "mécanicien 48 ans lombalgique chronique EA rachidien 8% IPP ancien AT lombaire. Nouvel AT manutention: hernie L5-S1 opérée. Aggravation état antérieur. DDS 30cm Schober 1.5cm.",
    expectedInjury: "Aggravation rachis lombaire (hernie L5-S1 sur EA 8%)",
    expectedRate: 10, severity: "moyen",
    clinicalSigns: ["EA rachidien 8%", "hernie L5-S1 opérée", "DDS 30cm", "Schober 1.5cm"],
    justification: "État global 18% brut. EA 8%. Aggravation imputable = 92% × 18/100 - 8% ≈ 10%",
    keywords: ["hernie", "aggravation", "etat anterieur", "rachis"],
    commonMistakes: ["Cumuler les taux anciens et nouveaux"]
  },
  {
    id: "at-164", category: "AT - Imputabilité",
    userInput: "ouvrier surdité professionnelle ancienne 10% IPP. Explosion chantier blast auriculaire aggravation massive surdité maintenant 70dB bilatérale avec acouphènes invalidants",
    expectedInjury: "Aggravation surdité post-blast (EA surdité 10%)",
    expectedRate: 25, severity: "élevé",
    clinicalSigns: ["EA surdité 10%", "blast", "surdité 70dB bilatérale", "acouphènes"],
    justification: "Surdité 70dB bilatérale 30% + acouphènes 5% = 34% global. EA 10% → imputable ≈ 24-25%",
    keywords: ["surdite", "aggravation", "blast", "acouphene", "etat anterieur"]
  },

  // ── AT secteurs spécifiques ─────────────────────────────────────────
  {
    id: "at-165", category: "AT - Maritime",
    userInput: "marin pêcheur coincé dans treuil écrasement membre supérieur gauche amputation bras tiers moyen non dominant appareillé prothèse myoélectrique",
    expectedInjury: "Amputation bras tiers moyen non dominante appareillée",
    expectedRate: 65, severity: "fixe",
    clinicalSigns: ["amputation bras", "tiers moyen", "non dominant", "prothèse"],
    justification: "Amputation bras tiers moyen non dominante = 65-70%",
    keywords: ["amputation", "bras", "prothese", "marin"]
  },
  {
    id: "at-166", category: "AT - Ferroviaire",
    userInput: "cheminot happé par train amputation cuisse gauche tiers supérieur appareillée prothèse fémorale marche réduite périmètre 500m",
    expectedInjury: "Amputation cuisse tiers supérieur appareillée",
    expectedRate: 75, severity: "fixe",
    clinicalSigns: ["amputation cuisse", "tiers supérieur", "prothèse fémorale", "marche 500m"],
    justification: "Amputation cuisse tiers supérieur = 75%",
    keywords: ["amputation", "cuisse", "prothese", "femorale"]
  },
  {
    id: "at-167", category: "AT - Aviation",
    userInput: "technicien aéronautique aspiration bras dans réacteur désarticulation épaule gauche non dominante",
    expectedInjury: "Désarticulation de l'épaule non dominante",
    expectedRate: 80, severity: "fixe",
    clinicalSigns: ["désarticulation épaule", "non dominante"],
    justification: "Désarticulation épaule non dominante = 80%",
    keywords: ["desarticulation", "epaule", "non dominante"]
  },

  // ── AT avec séquelles neuropsychologiques ───────────────────────────
  {
    id: "at-168", category: "AT - Neuropsy",
    userInput: "ouvrier chute 6m TC grave GCS initial 6 coma 3 semaines. Consolidation: syndrome frontal troubles comportementaux désinhibition troubles mémoire sévères dépendance partielle AVQ",
    expectedInjury: "Syndrome frontal post-TC grave (troubles comportementaux)",
    expectedRate: 60, severity: "élevé",
    clinicalSigns: ["TC grave GCS 6", "syndrome frontal", "désinhibition", "troubles mémoire", "dépendance AVQ"],
    justification: "Syndrome frontal + dépendance partielle = 55-65%",
    keywords: ["syndrome", "frontal", "traumatisme cranien", "comportement", "memoire"]
  },
  {
    id: "at-169", category: "AT - Neuropsy",
    userInput: "technicien électrocuté haute tension arrêt cardiaque réanimé TC anoxique séquelles cognitives modérées ralentissement troubles attention autonomie conservée",
    expectedInjury: "Séquelles cognitives post-TC anoxique (modérées)",
    expectedRate: 30, severity: "élevé",
    clinicalSigns: ["TC anoxique", "troubles cognitifs modérés", "ralentissement", "autonomie conservée"],
    justification: "Séquelles cognitives modérées avec autonomie = 25-35%",
    keywords: ["anoxique", "cognitif", "attention", "electrocution"]
  },
  {
    id: "at-170", category: "AT - Neuropsy",
    userInput: "agent de sécurité agression violente ESPT syndrome de stress post-traumatique chronique sévère cauchemars reviviscences évitement hypervigilance incapacité travail",
    expectedInjury: "ESPT chronique sévère post-agression",
    expectedRate: 15, severity: "élevé",
    clinicalSigns: ["ESPT chronique", "cauchemars", "reviviscences", "évitement", "hypervigilance"],
    justification: "ESPT chronique sévère = 12-20%",
    keywords: ["espt", "stress", "post-traumatique", "agression"]
  },

  // ── AT complexes métiers spéciaux ───────────────────────────────────
  {
    id: "at-171", category: "AT - BTP",
    userInput: "scaphandrier accident caisson hyperbare ostéonécrose bilatérale têtes fémorales + ostéonécrose humérus droit douleurs multiples limitation fonctionnelle globale",
    expectedInjury: "Ostéonécrose dysbarique multifocale (fémurs + humérus)",
    expectedRate: 45, severity: "élevé",
    clinicalSigns: ["ostéonécrose bilatérale têtes fémorales", "ostéonécrose humérus"],
    justification: "Ostéonécrose bilatérale hanches 30% + humérus 15% = Balthazard ≈ 40-45%",
    keywords: ["osteonecrose", "dysbarique", "hanche", "humerus"]
  },
  {
    id: "at-172", category: "AT - BTP",
    userInput: "coffreur accident malaxeur béton happement bras droit amputation transhumérale tiers inférieur dominant + fracture côtes gauche",
    expectedInjury: "Amputation transhumérale + fracture côtes",
    expectedRate: 77, severity: "fixe",
    clinicalSigns: ["amputation transhumérale", "tiers inférieur", "dominant", "côtes"],
    justification: "Amputation bras tiers inf dominant 70-75% principal, côtes minime impact Balthazard",
    keywords: ["amputation", "transhumerale", "bras", "dominant"]
  },

  // ── AT avec complications: infection, retard consolidation ──────────
  {
    id: "at-173", category: "AT - Complications",
    userInput: "ouvrier fracture ouverte tibia stade 3 Gustilo infection ostéite chronique fistulisée multiples reprises chirurgicales cal vicieux 10° raccourcissement 2.5cm marche avec canne",
    expectedInjury: "Fracture ouverte tibia compliquée (ostéite + cal vicieux)",
    expectedRate: 25, severity: "élevé",
    clinicalSigns: ["fracture ouverte Gustilo 3", "ostéite chronique", "fistule", "cal vicieux", "raccourcissement 2.5cm"],
    justification: "Ostéite chronique + cal vicieux + raccourcissement = 22-28%",
    keywords: ["osteite", "fracture", "tibia", "fistule", "cal vicieux"]
  },
  {
    id: "at-174", category: "AT - Complications",
    userInput: "maçon fracture col fémur droit ostéosynthèse compliquée nécrose tête fémorale PTH à 6 mois boiterie canne flexion 80°",
    expectedInjury: "Nécrose tête fémorale post-fracture avec PTH (complication)",
    expectedRate: 30, severity: "élevé",
    clinicalSigns: ["nécrose tête fémorale", "PTH", "boiterie", "canne", "flexion 80°"],
    justification: "PTH + boiterie + canne + flexion limitation = 28-32%",
    keywords: ["necrose", "prothese", "hanche", "boiterie"]
  },

  // ── AT avec cumuls complexes 3+ lésions ─────────────────────────────
  {
    id: "at-175", category: "AT - Cumul complexe",
    userInput: "ouvrier chute trémie 7m polytraumatisme: fracture calcanéum D 22% + tassement L1 12% + fracture poignet G 10% + entorse cervicale 5%. Formule Balthazard pour 4 lésions.",
    expectedInjury: "Polytraumatisme 4 lésions (Balthazard complexe)",
    expectedRate: 42, severity: "élevé",
    clinicalSigns: ["calcanéum D", "tassement L1", "poignet G", "cervical"],
    justification: "Balthazard: 100-[(100-22)×(100-12)×(100-10)×(100-5)/1000000] = 100-[78×88×90×95/1000000] = 100-58.8 ≈ 41-42%",
    keywords: ["calcaneum", "tassement", "poignet", "cervical", "balthazard"],
    commonMistakes: ["Additionner directement 22+12+10+5 = 49%"]
  },
  {
    id: "at-176", category: "AT - Cumul complexe",
    userInput: "carrier explosion polytraumatisme: énucléation OG 30% + surdité complète OD 15% + fracture mandibule 12% + amputation index D 10% + cicatrice visage 3%",
    expectedInjury: "Polytraumatisme 5 lésions post-explosion",
    expectedRate: 54, severity: "élevé",
    clinicalSigns: ["énucléation OG", "surdité OD", "fracture mandibule", "amputation index", "cicatrice"],
    justification: "Balthazard 5 lésions: séquentiel sur capacité restante → ≈ 54%",
    keywords: ["enucleation", "surdite", "mandibule", "amputation", "cicatrice", "balthazard"]
  },

  // ── AT avec séquelles vasculaires / thromboemboliques ───────────────
  {
    id: "at-177", category: "AT - Vasculaire",
    userInput: "ouvrier écrasement membre inférieur gauche thrombose veineuse profonde post-traumatique syndrome post-thrombotique chronique œdème jambe ulcère variqueux",
    expectedInjury: "Syndrome post-thrombotique chronique avec ulcère",
    expectedRate: 18, severity: "élevé",
    clinicalSigns: ["thrombose veineuse profonde", "syndrome post-thrombotique", "œdème", "ulcère"],
    justification: "Syndrome post-thrombotique + ulcère = 15-20%",
    keywords: ["thrombose", "post-thrombotique", "ulcere", "oedeme"]
  },
  {
    id: "at-178", category: "AT - Vasculaire",
    userInput: "ouvrier section artère fémorale réparation chirurgicale claudication intermittente séquellaire périmètre marche 300m",
    expectedInjury: "Lésion artérielle fémorale avec claudication séquellaire",
    expectedRate: 20, severity: "élevé",
    clinicalSigns: ["section artère fémorale", "claudication intermittente", "marche 300m"],
    justification: "Claudication intermittente périmètre 300m = 18-22%",
    keywords: ["artere", "femorale", "claudication", "marche"]
  },

  // ── AT avec troubles urinaires / génitaux ───────────────────────────
  {
    id: "at-179", category: "AT - Uro-génital",
    userInput: "ouvrier chute à califourchon fracture bassin traumatisme urétral sténose urètre séquellaire auto-sondages nécessaires troubles érection",
    expectedInjury: "Traumatisme urétral avec sténose + troubles érectiles",
    expectedRate: 25, severity: "élevé",
    clinicalSigns: ["fracture bassin", "sténose urètre", "auto-sondages", "troubles érection"],
    justification: "Sténose urètre + troubles érection = 22-28%",
    keywords: ["uretral", "stenose", "erection", "bassin"]
  },
  {
    id: "at-180", category: "AT - Uro-génital",
    userInput: "ouvrier écrasement périnée perte testiculaire bilatérale orchidectomie totale troubles hormonaux traitement substitutif",
    expectedInjury: "Castration traumatique bilatérale",
    expectedRate: 30, severity: "fixe",
    clinicalSigns: ["orchidectomie bilatérale", "troubles hormonaux"],
    justification: "Castration bilatérale = 25-35%",
    keywords: ["orchidectomie", "castration", "bilaterale"]
  },

  // ── AT avec séquelles fonctionnelles complexes ──────────────────────
  {
    id: "at-181", category: "AT - Fonctionnel",
    userInput: "ouvrier polytraumatisme MI droit: fracture fémur raccourcissement 4cm + raideur genou flexion 80° extension -10° + cal vicieux tibia boiterie permanente marche avec 2 cannes",
    expectedInjury: "Polytraumatisme MI droit: fémur + genou + tibia (boiterie sévère)",
    expectedRate: 48, severity: "élevé",
    clinicalSigns: ["raccourcissement 4cm", "genou 80°/-10°", "cal vicieux tibia", "2 cannes"],
    justification: "Raccourcissement 4cm+raideur genou sévère 25% + cal vicieux tibia 15% = Balthazard ≈ 48%",
    keywords: ["raccourcissement", "raideur", "genou", "cal vicieux", "boiterie"]
  },
  {
    id: "at-182", category: "AT - Fonctionnel",
    userInput: "aide-soignante chute travail fracture tête humérale droite dominante arthrose gléno-humérale avancée abduction 50° rotation externe 10° main derrière dos impossible",
    expectedInjury: "Omarthrose post-traumatique sévère épaule dominante",
    expectedRate: 28, severity: "élevé",
    clinicalSigns: ["omarthrose", "abduction 50°", "RE 10°", "main derrière dos impossible"],
    justification: "Omarthrose sévère dominante: abduction 50° + RE 10° = 25-30%",
    keywords: ["omarthrose", "epaule", "abduction", "rotation"]
  },

  // ── AT agriculture spécifiques ──────────────────────────────────────
  {
    id: "at-183", category: "AT - Agriculture",
    userInput: "ouvrier agricole pris dans prise de force tracteur arrachement cuir chevelu scalp frontal cicatrices alopécie définitive cranioplastie",
    expectedInjury: "Scalp frontal avec alopécie définitive",
    expectedRate: 15, severity: "moyen",
    clinicalSigns: ["scalp frontal", "alopécie", "cranioplastie", "cicatrices"],
    justification: "Scalp + cranioplastie + alopécie définitive = 12-18%",
    keywords: ["scalp", "alopecie", "cuir chevelu"]
  },
  {
    id: "at-184", category: "AT - Agriculture",
    userInput: "agriculteur renversé par taureau fracture complexe acétabulum postérieur hanche droite ostéosynthèse arthrose post-traumatique PTH cimentée flexion 85° boiterie marquée",
    expectedInjury: "Fracture acétabulum avec PTH et arthrose",
    expectedRate: 28, severity: "élevé",
    clinicalSigns: ["fracture acétabulum", "PTH", "flexion 85°", "boiterie"],
    justification: "PTH + arthrose + boiterie marquée + flexion 85° = 25-30%",
    keywords: ["acetabulum", "prothese", "hanche", "arthrose"]
  },

  // ── AT avec durée ITT longue et séquelles définitives ───────────────
  {
    id: "at-185", category: "AT - ITT longue",
    userInput: "charpentier chute 8m fracture ouverte fémur droit Gustilo 2 ITT 18 mois 4 interventions raccourcissement 3cm raideur genou 90° atrophie quadriceps marche béquilles",
    expectedInjury: "Fracture ouverte fémur avec complications multiples",
    expectedRate: 35, severity: "élevé",
    clinicalSigns: ["fracture ouverte fémur", "ITT 18 mois", "raccourcissement 3cm", "genou 90°", "atrophie"],
    justification: "Fémur compliqué + raccourcissement + raideur genou = 30-38%",
    keywords: ["fracture", "femur", "raccourcissement", "raideur", "atrophie"]
  },
  {
    id: "at-186", category: "AT - ITT longue",
    userInput: "soudeur brûlure étendue 50% surface corporelle 2ème et 3ème degré ITT 24 mois réanimation 2 mois greffes multiples cicatrices rétractiles coudes genoux cou",
    expectedInjury: "Brûlures graves étendues avec cicatrices rétractiles multiples",
    expectedRate: 45, severity: "élevé",
    clinicalSigns: ["brûlures 50% SC", "greffes multiples", "cicatrices rétractiles", "coudes genoux cou"],
    justification: "Brûlures étendues + cicatrices rétractiles multiples = 40-50%",
    keywords: ["brulure", "grave", "greffe", "cicatrice", "retractile"]
  },

  // ── AT avec aspects médico-légaux spécifiques ───────────────────────
  {
    id: "at-187", category: "AT - Médico-légal",
    userInput: "ouvrier 35 ans AT fracture humérus droit dominant. Consolidation parfaite radio. Revendique douleurs persistantes limitation épaule. Examen: mobilité complète si distraction. Discordance clinico-radiologique. Amplification symptomatique suspectée.",
    expectedInjury: "Fracture humérus consolidée sans séquelle objective",
    expectedRate: 3, severity: "faible",
    clinicalSigns: ["consolidation parfaite", "mobilité complète si distraction", "discordance"],
    justification: "Discordance clinico-radiologique → séquelles minimes objectives = 2-4%",
    keywords: ["discordance", "amplification", "consolidation", "sequelle minime"],
    commonMistakes: ["Retenir les plaintes subjectives sans corrélation objective"]
  },
  {
    id: "at-188", category: "AT - Médico-légal",
    userInput: "maçon 50 ans AT chute 2m entorse cheville banale. 2 ans après: SDRC sévère cheville pied. Raideur globale ostéoporose douleurs disproportionnées. Relation causale: probable mais terrain anxiodépressif préexistant.",
    expectedInjury: "SDRC cheville-pied post-entorse (imputabilité discutée)",
    expectedRate: 15, severity: "élevé",
    clinicalSigns: ["SDRC sévère", "entorse initiale banale", "terrain anxiodépressif"],
    justification: "SDRC imputable au traumatisme même si terrain favorisant = 12-18%",
    keywords: ["sdrc", "algodystrophie", "imputabilite", "entorse"]
  },

  // ── AT avec séquelles multiples mêmes segment ──────────────────────
  {
    id: "at-189", category: "AT - Multi séquelles",
    userInput: "opérateur presse fracture radius distal + section tendons extenseurs + section nerf médian poignet droit dominant raideur poignet et doigts force pince nulle",
    expectedInjury: "Fracture radius + section tendons + nerf médian même poignet",
    expectedRate: 32, severity: "élevé",
    clinicalSigns: ["fracture radius", "section tendons extenseurs", "nerf médian", "force pince nulle"],
    justification: "Nerf médian poignet 20% + fracture/raideur 10% + tendons 5% = Balthazard ≈ 32%",
    keywords: ["radius", "tendon", "nerf median", "poignet", "cumul"]
  },
  {
    id: "at-190", category: "AT - Multi séquelles",
    userInput: "ouvrier BTP fracture plateau tibial + rupture LCA + méniscectomie totale même genou droit flexion 90° extension -10° instabilité résiduelle arthrose avancée",
    expectedInjury: "Destruction genou: plateau tibial + LCA + ménisque (même genou)",
    expectedRate: 35, severity: "élevé",
    clinicalSigns: ["plateau tibial", "LCA", "méniscectomie", "flexion 90°", "extension -10°", "arthrose"],
    justification: "Destruction genou multiples lésions = 30-38% (même articulation, taux majoré)",
    keywords: ["plateau tibial", "lca", "meniscectomie", "genou", "destruction"]
  },

  // ── AT avec séquelles esthétiques importantes ───────────────────────
  {
    id: "at-191", category: "AT - Esthétique",
    userInput: "ouvrier chimie projection acide visage brûlure 3ème degré perte substance nez oreille gauche cicatrices majeures reconstruction impossible complète",
    expectedInjury: "Brûlure chimique visage avec perte substance et cicatrices majeures",
    expectedRate: 30, severity: "élevé",
    clinicalSigns: ["brûlure acide", "perte substance nez", "perte oreille", "cicatrices majeures"],
    justification: "Mutilation faciale + pertes substance = 25-35%",
    keywords: ["brulure", "acide", "visage", "mutilation", "cicatrice"]
  },
  {
    id: "at-192", category: "AT - Esthétique",
    userInput: "boucher machine à couper section partielle oreille droite perte pavillon hélix cicatrice rétractile",
    expectedInjury: "Perte partielle pavillon oreille",
    expectedRate: 5, severity: "faible",
    clinicalSigns: ["section partielle oreille", "perte hélix", "cicatrice"],
    justification: "Perte partielle pavillon = 3-6%",
    keywords: ["oreille", "pavillon", "perte", "helix"]
  },

  // ── AT avec membres fantômes / douleurs neuropathiques ──────────────
  {
    id: "at-193", category: "AT - Douleur",
    userInput: "ouvrier amputation avant-bras droit dominant syndrome membre fantôme douloureux chronique rebelle neuromes multiples douleurs neuropathiques invalidantes",
    expectedInjury: "Amputation avant-bras + syndrome douloureux neuropathique",
    expectedRate: 72, severity: "élevé",
    clinicalSigns: ["amputation avant-bras", "membre fantôme", "névromes", "douleurs neuropathiques"],
    justification: "Amputation avant-bras dominant 70% + majoration pour douleurs neuropathiques = 70-75%",
    keywords: ["amputation", "membre fantome", "nevrome", "neuropathique"]
  },
  {
    id: "at-194", category: "AT - Douleur",
    userInput: "ouvrier section nerf sciatique post-fracture fémur causalgie membre inférieur droit douleurs permanentes allodynie hyperesthésie impotence fonctionnelle majeure",
    expectedInjury: "Causalgie membre inférieur (lésion nerf sciatique)",
    expectedRate: 50, severity: "élevé",
    clinicalSigns: ["causalgie", "allodynie", "hyperesthésie", "impotence fonctionnelle"],
    justification: "Causalgie post-lésion nerveuse = 40-60%",
    keywords: ["causalgie", "sciatique", "allodynie", "neuropathique"]
  },

  // ── AT avec séquelles respiratoires chroniques ──────────────────────
  {
    id: "at-195", category: "AT - Respiratoire",
    userInput: "mineur silicose professionnelle stade 2 VEMS 45% dyspnée effort modéré insuffisance respiratoire chronique oxygénothérapie intermittente",
    expectedInjury: "Silicose professionnelle stade 2 (IRC modérée-sévère)",
    expectedRate: 40, severity: "élevé",
    clinicalSigns: ["silicose stade 2", "VEMS 45%", "dyspnée effort", "oxygénothérapie"],
    justification: "Silicose stade 2 + VEMS 45% = IRC modérée-sévère = 35-45%",
    keywords: ["silicose", "vems", "insuffisance respiratoire", "dyspnee"]
  },
  {
    id: "at-196", category: "AT - Respiratoire",
    userInput: "pompier inhalation fumées toxiques incendie asthme professionnel sévère VEMS 55% hyperréactivité bronchique permanente traitement continu",
    expectedInjury: "Asthme professionnel sévère post-inhalation",
    expectedRate: 35, severity: "élevé",
    clinicalSigns: ["asthme professionnel", "VEMS 55%", "hyperréactivité bronchique"],
    justification: "Asthme professionnel sévère VEMS 55% = 25-35%",
    keywords: ["asthme", "professionnel", "vems", "bronchique", "inhalation"]
  },

  // ── AT avec narrations longues réalistes style rapport ──────────────
  {
    id: "at-197", category: "AT - Rapport complet",
    userInput: "Homme 42 ans ferrailleur BTP. AT du 10/01/2025 déclaré. Circonstances: chute de 5m suite effondrement coffrage. Bilan initial: fracture comminutive plateau tibial latéral D (Schatzker V) + fracture malléole interne D + entorse LLI genou D. Traitement: ostéosynthèse plateau par vis-plaque, vis malléole. Suites: infection superficielle traitée. Consolidation 10 mois. Examen séquellaire: genou D flexion 95° extension -10° laxité interne ++ marche avec canne 500m boiterie arthrose débutante IRM.",
    expectedInjury: "Fracture plateau tibial complexe + malléole + LLI (genou D)",
    expectedRate: 28, severity: "élevé",
    clinicalSigns: ["plateau tibial Schatzker V", "malléole", "LLI", "flexion 95°", "extension -10°", "laxité", "canne"],
    justification: "Plateau complexe + malléole + LLI + raideur + laxité + arthrose = 25-30% (même membre inférieur, majoration pour cumul articulaire)",
    keywords: ["plateau tibial", "schatzker", "malleole", "lli", "genou", "arthrose"]
  },
  {
    id: "at-198", category: "AT - Rapport complet",
    userInput: "Femme 35 ans ouvrière conserverie. AT du 05/06/2024. Main droite dominante happée par machine de conditionnement. Bilan: amputation pouce niveau P1 + section complète nerf collatéral index + fracture P1 médius. Traitement: régularisation moignon pouce, suture nerf, ostéosynthèse P1 médius. Séquelles: perte pouce P1 + anesthésie hémi-pulpe radiale index + raideur médius IPP.",
    expectedInjury: "Amputation P1 pouce + anesthésie index + raideur médius (main D)",
    expectedRate: 26, severity: "élevé",
    clinicalSigns: ["amputation P1 pouce", "anesthésie index", "raideur médius IPP"],
    justification: "P1 pouce dominant 20% + anesthésie index 3% + raideur médius 4% = Balthazard ≈ 26%",
    keywords: ["amputation", "pouce", "anesthesie", "index", "raideur", "medius"]
  },
  {
    id: "at-199", category: "AT - Rapport complet",
    userInput: "Homme 28 ans électricien. AT du 20/09/2024: électrisation 20 000V. Brûlures électriques profondes bras droit + thorax. Amputation avant-bras droit tiers moyen (dominant) + fractures 4 côtes D + trouble du rythme cardiaque résiduel (extrasystoles fréquentes). Appareillé prothèse myoélectrique.",
    expectedInjury: "Polytraumatisme électrique: amputation bras + côtes + cardiaque",
    expectedRate: 75, severity: "élevé",
    clinicalSigns: ["amputation avant-bras dominant", "côtes", "trouble rythme cardiaque", "prothèse"],
    justification: "Amputation avant-bras dominant 70% + côtes 5% + trouble cardiaque 8% = Balthazard ≈ 74-76%",
    keywords: ["amputation", "avant-bras", "electrisation", "cardiaque", "polytraumatisme"]
  },
  {
    id: "at-200", category: "AT - Rapport complet",
    userInput: "Homme 50 ans chef de chantier BTP. AT du 15/03/2024: effondrement toiture béton. Polytraumatisme gravissime. TC grave GCS 7 coma 21 jours. Fracture rachis C5-C6 sans atteinte médullaire. Fracture bilatérale calcanéum. Fracture bassin aile iliaque G. Hémothorax D drainé. Consolidation 24 mois. Séquelles: syndrome dysexécutif modéré (troubles planification, mémoire travail), raideur cervicale sévère DMS 8cm, calcanéum bilatéral douloureux marche 200m 2 cannes, douleurs bassin position assise prolongée impossible.",
    expectedInjury: "Polytraumatisme gravissime TC + rachis cervical + calcanéum bilatéral + bassin + thorax",
    expectedRate: 68, severity: "élevé",
    clinicalSigns: ["TC grave", "syndrome dysexécutif", "DMS 8cm", "calcanéum bilatéral", "marche 200m", "bassin"],
    justification: "Syndrome dysexécutif 30% + cervical sévère 18% + calcanéum bilatéral 35% + bassin 10% = Balthazard complexe ≈ 65-70%",
    keywords: ["polytraumatisme", "traumatisme cranien", "dysexecutif", "calcaneum", "cervical", "bassin"],
    commonMistakes: ["Oublier les séquelles cognitives du TC", "Sous-évaluer le calcanéum bilatéral", "Ne pas appliquer Balthazard pour 5+ lésions"]
  },
];

// ═══════════════════════════════════════════════════════════════════════
// EXPORT COMBINÉ
// ═══════════════════════════════════════════════════════════════════════

export const trainingCasesAT200 = [...atSimples, ...atModeres, ...atComplexes];

console.log(`\n🏭 ENTRAÎNEMENT AT - 200 CAS D'ACCIDENTS DE TRAVAIL`);
console.log(`📊 Répartition:`);
console.log(`   Simples:   ${atSimples.length} cas (lésions uniques, taux fixes)`);
console.log(`   Modérés:   ${atModeres.length} cas (raideurs, séquelles fonctionnelles)`);
console.log(`   Complexes: ${atComplexes.length} cas (polytraumatismes, cumuls Balthazard)`);
console.log(`   TOTAL:     ${trainingCasesAT200.length} cas AT`);
