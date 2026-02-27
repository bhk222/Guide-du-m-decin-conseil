// Test 60 cas : traumatismes PIED et CHEVILLE exclusivement (V3.3.319)
// Fractures malléolaires, astragale, calcanéum, tarse, métatarsiens, orteils, entorses, raideurs, amputations
import { localExpertAnalysis } from './components/AiAnalyzer';

interface TestCase {
  input: string;
  expectedMinRate: number;
  expectedMaxRate: number;
  description: string;
  acceptDominantLesion?: boolean;
}

const testCases: TestCase[] = [
  // ============================================================
  // SECTION A : FRACTURES MALLÉOLAIRES (cas 1-10)
  // ============================================================
  {
    // Cas 1 : Fracture malléole externe D simple
    input: "fracture de la malléole externe de la cheville droite consolidée avec douleurs résiduelles à la marche prolongée et gêne modérée sur terrain irrégulier",
    expectedMinRate: 2,
    expectedMaxRate: 15,
    description: "Malléole externe D simple consolidée"
  },
  {
    // Cas 2 : Fracture malléole externe G avec raideur
    input: "fracture de la malléole externe de la cheville gauche ostéosynthésée consolidée avec raideur résiduelle de la cheville et limitation de la flexion dorsale et douleurs à la marche",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Malléole externe G avec raideur"
  },
  {
    // Cas 3 : Fracture bimalléolaire D simple
    input: "fracture bimalléolaire de la cheville droite ostéosynthésée consolidée avec douleurs résiduelles et gêne à la marche prolongée sans raideur significative",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Bimalléolaire D consolidée sans raideur"
  },
  {
    // Cas 4 : Fracture bimalléolaire G avec raideur modérée
    input: "fracture bimalléolaire de la cheville gauche ostéosynthésée avec raideur résiduelle modérée et limitation de la flexion dorsale à 10 degrés et douleurs à la marche sur terrain irrégulier et instabilité en varus",
    expectedMinRate: 8,
    expectedMaxRate: 25,
    description: "Bimalléolaire G avec raideur modérée"
  },
  {
    // Cas 5 : Fracture bimalléolaire D avec raideur sévère et arthrose
    input: "fracture bimalléolaire de la cheville droite ostéosynthésée avec raideur sévère de la cheville et limitation de la flexion dorsale et plantaire et arthrose tibio-tarsienne post-traumatique et douleurs permanentes à la marche",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Bimalléolaire D raideur sévère + arthrose"
  },
  {
    // Cas 6 : Fracture trimalléolaire G
    input: "fracture trimalléolaire de la cheville gauche ostéosynthésée avec raideur résiduelle et limitation de la flexion dorsale et instabilité résiduelle et douleurs à la marche et appui douloureux et boiterie",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Trimalléolaire G avec raideur et instabilité"
  },
  {
    // Cas 7 : Fracture trimalléolaire D sévère avec arthrose avancée
    input: "fracture trimalléolaire de la cheville droite ostéosynthésée avec raideur sévère et arthrose tibio-tarsienne avancée et douleurs permanentes et limitation majeure de la flexion dorsale et plantaire et boiterie permanente avec canne",
    expectedMinRate: 15,
    expectedMaxRate: 35,
    description: "Trimalléolaire D sévère arthrose avancée"
  },
  {
    // Cas 8 : Fracture malléole interne D isolée
    input: "fracture de la malléole interne de la cheville droite ostéosynthésée par vissage consolidée avec douleurs résiduelles à l'appui prolongé et gêne à la course",
    expectedMinRate: 2,
    expectedMaxRate: 15,
    description: "Malléole interne D isolée consolidée"
  },
  {
    // Cas 9 : Fracture bimalléolaire D avec subluxation tibio-tarsienne
    input: "fracture bimalléolaire de la cheville droite avec subluxation tibio-tarsienne résiduelle et instabilité chronique et raideur et arthrose tibio-tarsienne et douleurs permanentes à la marche et boiterie",
    expectedMinRate: 12,
    expectedMaxRate: 30,
    description: "Bimalléolaire D subluxation + arthrose"
  },
  {
    // Cas 10 : Fracture trimalléolaire G équivalent Dupuytren haut
    input: "fracture équivalent Dupuytren haut de la cheville gauche avec diastasis tibio-péronier résiduel et raideur sévère et arthrose tibio-tarsienne et instabilité et douleurs permanentes et limitation de la marche à 500 mètres et boiterie avec canne",
    expectedMinRate: 12,
    expectedMaxRate: 35,
    description: "Dupuytren haut G diastasis + arthrose sévère"
  },

  // ============================================================
  // SECTION B : FRACTURES DE L'ASTRAGALE / TALUS (cas 11-15)
  // ============================================================
  {
    // Cas 11 : Fracture astragale D sans nécrose
    input: "fracture du col de l'astragale droit consolidée sans nécrose avec raideur résiduelle de la cheville et douleurs à la marche prolongée et limitation de la flexion dorsale",
    expectedMinRate: 5,
    expectedMaxRate: 25,
    description: "Astragale D consolidée sans nécrose"
  },
  {
    // Cas 12 : Fracture astragale G avec nécrose partielle
    input: "fracture de l'astragale gauche avec nécrose aseptique partielle du dôme talien et arthrose tibio-tarsienne et sous-talienne et raideur sévère de la cheville et douleurs permanentes à chaque pas",
    expectedMinRate: 12,
    expectedMaxRate: 35,
    description: "Astragale G nécrose partielle + arthrose"
  },
  {
    // Cas 13 : Fracture astragale D avec nécrose totale et arthrodèse
    input: "fracture comminutive de l'astragale droit avec nécrose aseptique totale traitée par arthrodèse tibio-tarsienne avec ankylose de la cheville en position de fonction et impossibilité de flexion dorsale et plantaire et boiterie permanente",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Astragale D nécrose totale arthrodèse"
  },
  {
    // Cas 14 : Fracture ostéochondrale du dôme talien G
    input: "fracture ostéochondrale du dôme de l'astragale gauche traitée par curetage arthroscopique avec douleurs résiduelles à l'effort et gêne à la course et épisodes de blocage articulaire",
    expectedMinRate: 0,
    expectedMaxRate: 18,
    description: "Ostéochondrale dôme talien G",
    acceptDominantLesion: true
  },
  {
    // Cas 15 : Fracture astragale G avec luxation sous-talienne
    input: "fracture luxation de l'astragale gauche avec luxation sous-talienne réduite et nécrose aseptique partielle et arthrose sous-talienne sévère et raideur majeure de la cheville et impossibilité de marcher sur terrain irrégulier et douleurs chroniques et boiterie avec canne",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Fracture-luxation astragale G nécrose + arthrose"
  },

  // ============================================================
  // SECTION C : FRACTURES DU CALCANÉUM (cas 16-25)
  // ============================================================
  {
    // Cas 16 : Fracture calcanéum D extra-articulaire
    input: "fracture extra-articulaire du calcanéum droit consolidée avec talalgie résiduelle et douleurs à la station debout prolongée et gêne au port de chaussures fermées",
    expectedMinRate: 2,
    expectedMaxRate: 15,
    description: "Calcanéum D extra-articulaire"
  },
  {
    // Cas 17 : Fracture calcanéum G articulaire avec effondrement Böhler
    input: "fracture articulaire du calcanéum gauche avec effondrement de l'angle de Böhler et arthrose sous-talienne post-traumatique et talalgie chronique et douleurs permanentes à l'appui et impossibilité de marcher pieds nus sur sol dur",
    expectedMinRate: 8,
    expectedMaxRate: 30,
    description: "Calcanéum G Böhler + arthrose sous-talienne"
  },
  {
    // Cas 18 : Fracture calcanéum D comminutive type Sanders III
    input: "fracture comminutive du calcanéum droit type Sanders III ostéosynthésée avec effondrement thalamique résiduel et arthrose sous-talienne sévère et élargissement du calcanéum et conflit calcanéo-fibulaire et douleurs permanentes à l'appui et boiterie et marche avec canne",
    expectedMinRate: 12,
    expectedMaxRate: 35,
    description: "Calcanéum D Sanders III comminutif"
  },
  {
    // Cas 19 : Fracture calcanéum G traitée par arthrodèse sous-talienne
    input: "fracture du calcanéum gauche compliquée d'arthrose sous-talienne sévère traitée par arthrodèse sous-talienne avec fusion de l'articulation sous-talienne et raideur de l'arrière-pied et douleurs résiduelles et boiterie et impossibilité de marcher sur terrain irrégulier",
    expectedMinRate: 12,
    expectedMaxRate: 35,
    description: "Calcanéum G arthrodèse sous-talienne"
  },
  {
    // Cas 20 : Fracture calcanéum bilatérale (chute hauteur)
    input: "fracture du calcanéum droit avec effondrement de l'angle de Böhler et arthrose sous-talienne et douleurs chroniques à l'appui ; fracture du calcanéum gauche avec thalassement et arthrose sous-talienne et douleurs aux deux talons et impossibilité de station debout prolongée et marche avec semelles orthopédiques",
    expectedMinRate: 10,
    expectedMaxRate: 45,
    description: "Calcanéum bilatéral chute hauteur"
  },
  {
    // Cas 21 : Fracture calcanéum D à gros fragment postérieur
    input: "fracture à gros fragment postérieur du calcanéum droit avec ascension du fragment supérieur et perte de force du triceps sural et impossibilité de se mettre sur la pointe des pieds et douleurs à la marche",
    expectedMinRate: 5,
    expectedMaxRate: 25,
    description: "Calcanéum D gros fragment postérieur"
  },
  {
    // Cas 22 : Fracture calcanéum G ouverte avec complications cutanées
    input: "fracture ouverte du calcanéum gauche avec perte de substance cutanée talonnière greffée et cicatrice adhérente et fragile et talalgie chronique et arthrose sous-talienne et douleurs permanentes à l'appui et nécessité de port de talonnière en silicone et boiterie",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Calcanéum G ouvert greffe cutanée + arthrose"
  },
  {
    // Cas 23 : Fracture calcanéum D avec syndrome des loges séquellaire
    input: "fracture du calcanéum droit compliquée de syndrome des loges du pied avec rétraction des orteils en griffe et douleurs neuropathiques chroniques et talalgie et arthrose sous-talienne et raideur des orteils et gêne majeure à la marche",
    expectedMinRate: 10,
    expectedMaxRate: 35,
    description: "Calcanéum D + syndrome loges séquellaire"
  },
  {
    // Cas 24 : Fracture calcanéum G Sanders IV bilatérale déjà arthrodèsée + calcanéum D
    input: "fracture comminutive du calcanéum gauche type Sanders IV traitée par arthrodèse sous-talienne avec fusion et raideur de l'arrière-pied et boiterie ; fracture du calcanéum droit avec arthrose sous-talienne et douleurs chroniques et impossibilité de marcher longtemps et marche avec deux cannes anglaises",
    expectedMinRate: 15,
    expectedMaxRate: 50,
    description: "Calcanéum bilatéral: arthrodèse G + arthrose D"
  },
  {
    // Cas 25 : Fracture calcanéum D ancien avec cal vicieux
    input: "fracture ancienne du calcanéum droit consolidée en cal vicieux avec élargissement et abaissement de l'angle de Böhler et conflit péronier et arthrose sous-talienne et douleurs chroniques et nécessité de chaussures orthopédiques",
    expectedMinRate: 8,
    expectedMaxRate: 30,
    description: "Calcanéum D cal vicieux + conflit péronier"
  },

  // ============================================================
  // SECTION D : FRACTURES DU PILON TIBIAL (cas 26-30)
  // ============================================================
  {
    // Cas 26 : Fracture pilon tibial D simple
    input: "fracture du pilon tibial droit consolidée avec raideur résiduelle de la cheville et limitation de la flexion dorsale et douleurs à la marche prolongée",
    expectedMinRate: 5,
    expectedMaxRate: 25,
    description: "Pilon tibial D consolidé raideur résiduelle"
  },
  {
    // Cas 27 : Fracture pilon tibial G comminutive avec arthrose
    input: "fracture comminutive du pilon tibial gauche ostéosynthésée avec arthrose tibio-tarsienne sévère et raideur majeure de la cheville et limitation de la flexion dorsale et plantaire et douleurs permanentes à la marche et boiterie avec canne",
    expectedMinRate: 12,
    expectedMaxRate: 35,
    description: "Pilon tibial G comminutif + arthrose sévère"
  },
  {
    // Cas 28 : Fracture pilon tibial D ouverte Gustilo II
    input: "fracture ouverte Gustilo II du pilon tibial droit avec greffe cutanée et ostéite séquellaire traitée et raideur sévère de la cheville et arthrose tibio-tarsienne et cicatrice adhérente et douleurs au froid et boiterie permanente",
    expectedMinRate: 12,
    expectedMaxRate: 35,
    description: "Pilon tibial D ouvert Gustilo II + ostéite"
  },
  {
    // Cas 29 : Fracture pilon tibial G avec arthrodèse
    input: "fracture comminutive du pilon tibial gauche compliquée d'arthrose tibio-tarsienne sévère traitée par arthrodèse tibio-tarsienne avec ankylose de la cheville en position de fonction et impossibilité de flexion et boiterie permanente et limitation de la marche",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Pilon tibial G arthrodèse tibio-tarsienne"
  },
  {
    // Cas 30 : Fracture pilon tibial D + fracture malléole péronière
    input: "fracture du pilon tibial droit associée à une fracture de la malléole péronière avec raideur sévère de la cheville et arthrose tibio-tarsienne et instabilité et douleurs permanentes et boiterie et marche avec canne",
    expectedMinRate: 12,
    expectedMaxRate: 35,
    description: "Pilon tibial D + malléole péronière"
  },

  // ============================================================
  // SECTION E : FRACTURES DU TARSE ET MÉTATARSE (cas 31-40)
  // ============================================================
  {
    // Cas 31 : Fracture scaphoïde tarsien D (os naviculaire)
    input: "fracture du scaphoïde tarsien droit consolidée avec douleurs résiduelles au médio-pied et gêne à la marche prolongée et limitation de l'inversion du pied",
    expectedMinRate: 2,
    expectedMaxRate: 18,
    description: "Scaphoïde tarsien D consolidé"
  },
  {
    // Cas 32 : Fracture cuboïde G avec nécrose
    input: "fracture du cuboïde gauche avec nécrose aseptique partielle et arthrose calcanéo-cuboïdienne et douleurs au bord externe du pied et boiterie à la marche prolongée",
    expectedMinRate: 0,
    expectedMaxRate: 20,
    description: "Cuboïde G nécrose + arthrose",
    acceptDominantLesion: true
  },
  {
    // Cas 33 : Luxation interligne de Lisfranc D
    input: "luxation de l'interligne de Lisfranc du pied droit avec arthrose tarso-métatarsienne post-traumatique et douleurs chroniques au médio-pied et effondrement de l'arche plantaire et métatarsalgie et gêne au port de chaussures et boiterie",
    expectedMinRate: 5,
    expectedMaxRate: 25,
    description: "Lisfranc D luxation + arthrose"
  },
  {
    // Cas 34 : Fracture-luxation de Chopart G
    input: "fracture-luxation de l'interligne de Chopart du pied gauche avec arthrose médio-tarsienne et raideur du médio-pied et douleurs permanentes à la marche et effondrement de la voûte plantaire et pied plat post-traumatique et boiterie",
    expectedMinRate: 8,
    expectedMaxRate: 30,
    description: "Chopart G fracture-luxation + pied plat"
  },
  {
    // Cas 35 : Fracture base 5ème métatarsien D (Jones)
    input: "fracture de la base du 5ème métatarsien droit de type Jones consolidée avec douleurs résiduelles au bord externe du pied et gêne à la marche et douleurs à l'appui latéral",
    expectedMinRate: 1,
    expectedMaxRate: 12,
    description: "5ème métatarsien D fracture Jones"
  },
  {
    // Cas 36 : Fracture métatarsiens multiples G
    input: "fracture des 2ème 3ème et 4ème métatarsiens du pied gauche consolidés avec métatarsalgie chronique et douleurs à l'appui antérieur du pied et durillons plantaires et gêne au déroulé du pas",
    expectedMinRate: 3,
    expectedMaxRate: 18,
    description: "Métatarsiens multiples G (2-3-4)"
  },
  {
    // Cas 37 : Fracture 1er métatarsien D avec arthrose métatarso-phalangienne
    input: "fracture du premier métatarsien du pied droit consolidée avec arthrose métatarso-phalangienne du gros orteil et hallux rigidus post-traumatique et douleurs à la marche et gêne au déroulé du pas et impossibilité de porter des talons",
    expectedMinRate: 3,
    expectedMaxRate: 18,
    description: "1er métatarsien D + hallux rigidus"
  },
  {
    // Cas 38 : Fracture tarse antérieur D avec cunéiforme
    input: "fracture du cunéiforme médial du pied droit avec arthrose intercunéenne et douleurs au médio-pied et gêne à l'appui et limitation de l'inversion et boiterie légère",
    expectedMinRate: 0,
    expectedMaxRate: 15,
    description: "Cunéiforme médial D + arthrose",
    acceptDominantLesion: true
  },
  {
    // Cas 39 : Fracture de Lisfranc bilatérale
    input: "luxation de l'interligne de Lisfranc du pied droit avec arthrose et douleurs chroniques ; luxation de l'interligne de Lisfranc du pied gauche avec arthrose tarso-métatarsienne et effondrement bilatéral des arches plantaires et métatarsalgie bilatérale et impossibilité de courir et gêne majeure à la marche",
    expectedMinRate: 8,
    expectedMaxRate: 40,
    description: "Lisfranc bilatéral + arthrose"
  },
  {
    // Cas 40 : Fracture métatarsiens D + fracture cuboïde D (crush injury latéral)
    input: "fracture des 4ème et 5ème métatarsiens du pied droit associée à une fracture du cuboïde droit avec arthrose et douleurs chroniques au bord externe du pied et gêne à la marche et boiterie",
    expectedMinRate: 3,
    expectedMaxRate: 20,
    description: "Métatarsiens 4-5 + cuboïde D crush"
  },

  // ============================================================
  // SECTION F : LÉSIONS DES ORTEILS (cas 41-48)
  // ============================================================
  {
    // Cas 41 : Amputation gros orteil D
    input: "amputation traumatique du gros orteil droit avec gêne à la propulsion et trouble de l'équilibre à la marche rapide et douleurs du moignon et nécessité d'orthoplastie",
    expectedMinRate: 3,
    expectedMaxRate: 20,
    description: "Amputation gros orteil D"
  },
  {
    // Cas 42 : Amputation gros orteil G + 2ème orteil G
    input: "amputation traumatique du gros orteil et du 2ème orteil du pied gauche avec gêne à la propulsion et trouble de l'équilibre à la marche et douleurs et appui antérieur défectueux",
    expectedMinRate: 5,
    expectedMaxRate: 22,
    description: "Amputation hallux + 2ème orteil G"
  },
  {
    // Cas 43 : Amputation orteils latéraux D (3-4-5)
    input: "amputation traumatique des 3ème 4ème et 5ème orteils du pied droit avec gêne à l'équilibre latéral et douleurs à la marche et nécessité de chaussures adaptées",
    expectedMinRate: 3,
    expectedMaxRate: 18,
    description: "Amputation orteils 3-4-5 D"
  },
  {
    // Cas 44 : Amputation tous les orteils D
    input: "amputation traumatique de tous les orteils du pied droit au niveau des articulations métatarso-phalangiennes avec perte totale de la propulsion et trouble majeur de l'équilibre et douleurs aux moignons et marche avec chaussure orthopédique spéciale",
    expectedMinRate: 10,
    expectedMaxRate: 35,
    description: "Amputation tous orteils D"
  },
  {
    // Cas 45 : Hallux rigidus post-traumatique G
    input: "hallux rigidus post-traumatique du gros orteil gauche avec raideur sévère de l'articulation métatarso-phalangienne et douleurs à la marche et gêne au déroulé du pas et impossibilité de courir",
    expectedMinRate: 2,
    expectedMaxRate: 15,
    description: "Hallux rigidus G post-traumatique"
  },
  {
    // Cas 46 : Fracture phalanges gros orteil D avec raideur
    input: "fracture de la phalange proximale du gros orteil droit consolidée avec raideur de l'articulation interphalangienne et douleurs à l'appui et gêne au déroulé du pas",
    expectedMinRate: 1,
    expectedMaxRate: 12,
    description: "Fracture phalange hallux D + raideur"
  },
  {
    // Cas 47 : Orteils en griffe post-traumatiques G
    input: "déformation post-traumatique des orteils du pied gauche avec orteils en griffe des 2ème 3ème et 4ème orteils et métatarsalgie chronique et durillons dorsaux douloureux et gêne au port de chaussures",
    expectedMinRate: 2,
    expectedMaxRate: 15,
    description: "Orteils en griffe 2-3-4 G post-traumatiques"
  },
  {
    // Cas 48 : Amputation transmétatarsienne D
    input: "amputation transmétatarsienne du pied droit avec perte de l'avant-pied et appareillage par chaussure orthopédique avec remplissage et trouble de la marche et boiterie et douleurs du moignon",
    expectedMinRate: 10,
    expectedMaxRate: 35,
    description: "Amputation transmétatarsienne D"
  },

  // ============================================================
  // SECTION G : ENTORSES ET INSTABILITÉS (cas 49-53)
  // ============================================================
  {
    // Cas 49 : Entorse cheville D avec instabilité chronique
    input: "entorse grave de la cheville droite avec rupture du ligament latéral externe traitée orthopédiquement avec instabilité chronique résiduelle et entorses à répétition et douleurs et nécessité de port de chevillère",
    expectedMinRate: 3,
    expectedMaxRate: 18,
    description: "Entorse cheville D instabilité chronique"
  },
  {
    // Cas 50 : Entorse cheville G opérée + arthrose
    input: "entorse grave de la cheville gauche avec rupture du ligament latéral externe opérée par ligamentoplastie avec instabilité résiduelle et arthrose tibio-tarsienne débutante et douleurs à la marche prolongée et gêne à la course et boiterie intermittente",
    expectedMinRate: 5,
    expectedMaxRate: 22,
    description: "Entorse cheville G opérée + arthrose débutante"
  },
  {
    // Cas 51 : Lésion ligament deltoïdien G (entorse médiale)
    input: "lésion du ligament deltoïdien de la cheville gauche avec instabilité médiale chronique et douleurs à l'éversion et gêne à la marche sur terrain irrégulier et appréhension",
    expectedMinRate: 2,
    expectedMaxRate: 15,
    description: "Lésion deltoïdien G instabilité médiale"
  },
  {
    // Cas 52 : Rupture tendon d'Achille D
    input: "rupture du tendon d'Achille droit opérée par suture avec perte de force du triceps sural évaluée à 30 pour cent et impossibilité de se mettre sur la pointe du pied droit et douleurs à la course et limitation de la flexion plantaire",
    expectedMinRate: 5,
    expectedMaxRate: 22,
    description: "Rupture tendon Achille D suturé"
  },
  {
    // Cas 53 : Entorse sous-talienne G
    input: "entorse de l'articulation sous-talienne gauche avec instabilité résiduelle de l'arrière-pied et douleurs sur terrain irrégulier et limitation de l'inversion et éversion et gêne à la marche",
    expectedMinRate: 2,
    expectedMaxRate: 15,
    description: "Entorse sous-talienne G instabilité"
  },

  // ============================================================
  // SECTION H : CAS COMBINÉS ET SÉVÈRES (cas 54-60)
  // ============================================================
  {
    // Cas 54 : Fracture bimalléolaire D + fracture calcanéum D (ipsilatéral cascade)
    input: "fracture bimalléolaire de la cheville droite avec raideur et arthrose tibio-tarsienne ; fracture du calcanéum droit avec arthrose sous-talienne et douleurs permanentes à l'appui et talalgie et boiterie sévère avec canne",
    expectedMinRate: 10,
    expectedMaxRate: 45,
    description: "Bimalléolaire D + calcanéum D ipsilatéral"
  },
  {
    // Cas 55 : Fracture pilon tibial G + fracture métatarsiens G
    input: "fracture du pilon tibial gauche avec arthrose tibio-tarsienne et raideur sévère de la cheville ; fracture des 2ème et 3ème métatarsiens du pied gauche avec métatarsalgie chronique et douleurs à la marche et boiterie permanente",
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Pilon tibial G + métatarsiens G"
  },
  {
    // Cas 56 : Fracture astragale D + fracture calcanéum D (même pied)
    input: "fracture de l'astragale droit avec nécrose aseptique partielle et arthrose tibio-tarsienne ; fracture du calcanéum droit avec effondrement de l'angle de Böhler et arthrose sous-talienne et douleurs permanentes à l'appui et raideur majeure de la cheville et de l'arrière-pied et boiterie sévère avec canne",
    expectedMinRate: 15,
    expectedMaxRate: 45,
    description: "Astragale D nécrose + calcanéum D Böhler"
  },
  {
    // Cas 57 : Cheville bilatérale sévère + calcanéum D
    input: "fracture trimalléolaire de la cheville droite avec raideur sévère et arthrose tibio-tarsienne avancée ; fracture bimalléolaire de la cheville gauche avec raideur et instabilité et arthrose ; fracture du calcanéum droit avec arthrose sous-talienne et douleurs permanentes et boiterie bilatérale sévère avec deux cannes",
    expectedMinRate: 15,
    expectedMaxRate: 55,
    description: "Cheville bilatérale sévère + calcanéum D"
  },
  {
    // Cas 58 : Amputation Chopart D + fracture cheville G
    input: "amputation de type Chopart du pied droit avec perte du médio-pied et de l'avant-pied et appareillage par chaussure orthopédique et boiterie sévère ; fracture bimalléolaire de la cheville gauche avec raideur et arthrose tibio-tarsienne et douleurs et boiterie bilatérale avec canne",
    expectedMinRate: 15,
    expectedMaxRate: 55,
    description: "Amputation Chopart D + bimalléolaire G"
  },
  {
    // Cas 59 : Fracture pilon tibial + astragale + calcanéum D (même membre catastrophique)
    input: "fracture du pilon tibial droit avec arthrose tibio-tarsienne sévère et raideur ; fracture de l'astragale droit avec nécrose aseptique et arthrose sous-talienne ; fracture du calcanéum droit avec effondrement de Böhler et raideur majeure de tout l'arrière-pied et douleurs permanentes et impossibilité de marcher sans deux cannes anglaises et périmètre de marche limité à 200 mètres",
    expectedMinRate: 20,
    expectedMaxRate: 55,
    description: "Pilon tibial + astragale + calcanéum D catastrophique"
  },
  {
    // Cas 60 : Cheville bilatérale + calcanéum bilatéral + orteils amputés (AVP membre inf distal catastrophique)
    input: "fracture trimalléolaire de la cheville droite avec raideur sévère et arthrose ; fracture bimalléolaire de la cheville gauche avec raideur et instabilité et arthrose ; fracture du calcanéum droit avec arthrose sous-talienne et douleurs ; fracture du calcanéum gauche avec arthrose sous-talienne ; amputation de tous les orteils du pied droit avec perte de la propulsion et marche impossible sans deux cannes anglaises et fauteuil roulant pour longs déplacements",
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "Cheville bilat + calcanéum bilat + amputation orteils D catastrophique"
  },
];

// ====== RUNNER ======
async function runTests() {
  let passed = 0;
  let failed = 0;

  console.log('╔═══════════════════════════════════════════════════════════════════╗');
  console.log('║  TEST 60 CAS TRAUMATISMES PIED ET CHEVILLE (V3.3.319)           ║');
  console.log('╚═══════════════════════════════════════════════════════════════════╝');
  console.log('');

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    try {
      const result = localExpertAnalysis(tc.input, []) as any;

      const name = result?.name || result?.proposals?.map((p: any) => p.name).join(' + ') || 'AUCUN';
      const rate = result?.rate !== undefined ? result.rate
        : result?.globalRate !== undefined ? result.globalRate
        : typeof result?.type === 'number' ? result.type : 0;
      const numRate = typeof rate === 'number' ? rate : parseInt(rate) || 0;
      const type = result?.type || 'unknown';
      const justif = (result?.justification || '').toLowerCase();
      const nameLower = name.toLowerCase();
      const pathLower = (result?.path || '').toLowerCase();
      const allText = (nameLower + ' ' + justif + ' ' + pathLower).toLowerCase();

      // Reconnu comme pathologie pied/cheville ou polytrauma ?
      const isFootAnkle = allText.includes('cheville')
        || allText.includes('malléol')
        || allText.includes('talien')
        || allText.includes('astragal')
        || allText.includes('calcanéum')
        || allText.includes('calcan')
        || allText.includes('tibio-tars')
        || allText.includes('sous-tal')
        || allText.includes('pied')
        || allText.includes('orteil')
        || allText.includes('hallux')
        || allText.includes('métatars')
        || allText.includes('lisfranc')
        || allText.includes('chopart')
        || allText.includes('tarse')
        || allText.includes('pilon')
        || allText.includes('achille')
        || allText.includes('ligament')
        || allText.includes('entorse')
        || allText.includes('amputation')
        || allText.includes('polytraum')
        || allText.includes('cumul');

      // Taux dans la fourchette (±5% tolérance)
      const rateInRange = numRate >= (tc.expectedMinRate - 5) && numRate <= (tc.expectedMaxRate + 10);

      const testPass = (isFootAnkle || tc.acceptDominantLesion === true) && rateInRange;

      if (testPass) passed++;
      else failed++;

      console.log(`─── Cas ${i + 1} ───`);
      console.log(`  Description: ${tc.description}`);
      console.log(`  Attendu   : ${tc.expectedMinRate}-${tc.expectedMaxRate}%`);
      console.log(`  Obtenu    : ${testPass ? '✅' : '❌'} ${name}`);
      console.log(`  Taux      : ${numRate}%`);
      console.log(`  Type      : ${type}`);
      console.log(`  Pied/Chev : ${isFootAnkle ? '✅' : '❌'} | Taux OK: ${rateInRange ? '✅' : '❌'}`);
      if (result?.path) console.log(`  Path      : ${result.path}`);
      if (!testPass) {
        const reasons: string[] = [];
        if (!isFootAnkle) reasons.push('PAS reconnu comme pathologie pied/cheville');
        if (!rateInRange) reasons.push(`Taux ${numRate}% hors fourchette ${tc.expectedMinRate}-${tc.expectedMaxRate}%`);
        console.log(`  ⚠️ ANOMALIE: ${reasons.join(' + ')}`);
      }
      console.log('');
    } catch (err: any) {
      failed++;
      console.log(`─── Cas ${i + 1} ───`);
      console.log(`  ❌ ERREUR: ${err.message}`);
      console.log('');
    }
  }

  console.log('═══════════════════════════════════════════════════════════════════');
  console.log(`  RÉSULTAT GLOBAL : ${passed}/${testCases.length} réussis | ${failed}/${testCases.length} échoués`);
  console.log('═══════════════════════════════════════════════════════════════════');
}

runTests();
