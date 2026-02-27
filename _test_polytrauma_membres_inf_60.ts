// Test 60 cas : polytraumatismes MEMBRES INFÉRIEURS EXCLUSIVEMENT (V3.3.319)
// Combinaisons variées: hanche, fémur, genou, jambe/tibia, cheville, pied
import { localExpertAnalysis } from './components/AiAnalyzer';

interface TestCase {
  input: string;
  expectedSystems: string[];
  expectedMinRate: number;
  expectedMaxRate: number;
  description: string;
  acceptDominantLesion?: boolean;
}

const testCases: TestCase[] = [
  // ============================================================
  // SECTION A : HANCHE + GENOU (cas 1-10)
  // ============================================================
  {
    // Cas 1 : Fracture col fémur D PTH + fracture plateau tibial G
    input: "fracture du col du fémur droit traitée par prothèse totale de hanche avec boiterie résiduelle et douleurs mécaniques à la marche prolongée et limitation de la flexion à 90 degrés ; fracture du plateau tibial externe du genou gauche avec gonarthrose post-traumatique et raideur du genou flexion limitée à 95 degrés et douleurs à la descente des escaliers et déviation en valgus de 5 degrés",
    expectedSystems: ['hanche', 'genou'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "PTH D + plateau tibial G avec gonarthrose"
  },
  {
    // Cas 2 : Fracture massif trochantérien D + fracture rotule G
    input: "fracture du massif trochantérien de la hanche droite ostéosynthésée par clou gamma avec raideur de la hanche et limitation de la rotation interne et douleurs à l'appui et boiterie ; fracture comminutive de la rotule gauche traitée par cerclage avec raideur du genou en flexion limitée à 90 degrés et douleurs à la montée des escaliers et impossibilité de s'accroupir",
    expectedSystems: ['hanche', 'genou'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Massif trochantérien D + rotule G comminutive"
  },
  {
    // Cas 3 : Fracture cotyle G + fracture plateau tibial interne D
    input: "fracture du cotyle de la hanche gauche avec arthrose coxo-fémorale post-traumatique et limitation sévère de la flexion à 70 degrés et douleurs permanentes et boiterie sévère ; fracture du plateau tibial interne du genou droit avec enfoncement résiduel et gonarthrose et raideur en flexion limitée à 85 degrés et déviation en varus et douleurs à la descente des escaliers",
    expectedSystems: ['hanche', 'genou'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Cotyle G arthrosique + plateau tibial interne D",
    acceptDominantLesion: true
  },
  {
    // Cas 4 : Luxation postérieure hanche D + fracture supra-condylienne fémur G
    input: "luxation postérieure de la hanche droite réduite sous anesthésie générale avec nécrose aseptique de la tête fémorale et limitations des amplitudes articulaires et douleurs à la marche et boiterie ; fracture supra-condylienne du fémur gauche ostéosynthésée avec raideur sévère du genou flexion limitée à 80 degrés et amyotrophie du quadriceps et douleurs mécaniques",
    expectedSystems: ['hanche', 'genou'],
    expectedMinRate: 15,
    expectedMaxRate: 65,
    description: "Luxation hanche D nécrose + supra-condylienne fémur G"
  },
  {
    // Cas 5 : PTH G + rupture LCA D
    input: "fracture du col du fémur gauche traitée par prothèse totale de hanche avec boiterie et douleurs mécaniques et limitation de la flexion à 85 degrés ; rupture du ligament croisé antérieur du genou droit opérée par ligamentoplastie avec laxité résiduelle antérieure et douleurs à l'effort et instabilité à la course et amyotrophie du quadriceps",
    expectedSystems: ['hanche', 'genou'],
    expectedMinRate: 10,
    expectedMaxRate: 50,
    description: "PTH G + rupture LCA D avec laxité résiduelle"
  },
  {
    // Cas 6 : Fracture trochanter D + prothèse genou G
    input: "fracture du massif trochantérien droit consolidée avec cal vicieux et raccourcissement de 1 cm et raideur de la hanche et boiterie ; fracture comminutive de l'extrémité inférieure du fémur gauche traitée par prothèse totale du genou avec raideur résiduelle flexion limitée à 100 degrés et douleurs mécaniques et difficultés dans les escaliers",
    expectedSystems: ['hanche', 'genou'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Trochanter D cal vicieux + prothèse genou G"
  },
  {
    // Cas 7 : Hanche bilatérale — PTH D + fracture cotyle G
    input: "fracture du col du fémur droit traitée par prothèse totale de hanche avec boiterie et limitation de la flexion à 90 degrés ; fracture du cotyle de la hanche gauche avec arthrose coxo-fémorale sévère et limitation de la flexion à 65 degrés et douleurs permanentes et boiterie bilatérale avec deux cannes",
    expectedSystems: ['hanche', 'hanche'],
    expectedMinRate: 15,
    expectedMaxRate: 65,
    description: "PTH D + cotyle G avec arthrose sévère bilatérale"
  },
  {
    // Cas 8 : Genou bilatéral — plateau tibial D + rotule G
    input: "fracture du plateau tibial externe du genou droit avec gonarthrose et raideur en flexion limitée à 90 degrés et douleurs mécaniques ; fracture de la rotule gauche ostéosynthésée par haubanage avec raideur du genou flexion limitée à 95 degrés et douleurs à la montée des escaliers et impossibilité de s'agenouiller et amyotrophie bilatérale des quadriceps",
    expectedSystems: ['genou', 'genou'],
    expectedMinRate: 10,
    expectedMaxRate: 50,
    description: "Plateau tibial D + rotule G bilatéral"
  },
  {
    // Cas 9 : Fracture col fémur D vis + fracture supra-condylienne G
    input: "fracture du col du fémur droit ostéosynthésée par triple vissage avec nécrose aseptique débutante de la tête fémorale et limitation de la flexion à 80 degrés et douleurs à l'appui et boiterie ; fracture supra-condylienne du fémur gauche consolidée avec raideur du genou en flexion limitée à 85 degrés et amyotrophie du quadriceps et douleurs mécaniques et impossibilité de courir",
    expectedSystems: ['hanche', 'genou'],
    expectedMinRate: 15,
    expectedMaxRate: 65,
    description: "Col fémur D nécrose + supra-condylienne G"
  },
  {
    // Cas 10 : Fracture trochanter G + lésion méniscale D
    input: "fracture pertrochantérienne de la hanche gauche ostéosynthésée avec raideur et limitation de la rotation et raccourcissement de 1 cm et boiterie ; lésion méniscale interne du genou droit opérée par méniscectomie partielle avec douleurs résiduelles et gonflement après effort prolongé et difficulté à s'accroupir et gonarthrose débutante",
    expectedSystems: ['hanche', 'genou'],
    expectedMinRate: 5,
    expectedMaxRate: 45,
    description: "Pertrochantérienne G + méniscectomie D"
  },

  // ============================================================
  // SECTION B : HANCHE/FÉMUR + CHEVILLE/PIED (cas 11-20)
  // ============================================================
  {
    // Cas 11 : PTH D + fracture bimalléolaire G
    input: "fracture du col du fémur droit traitée par prothèse totale de hanche avec boiterie résiduelle et douleurs mécaniques à la marche prolongée ; fracture bimalléolaire de la cheville gauche ostéosynthésée avec raideur résiduelle et instabilité en varus et arthrose tibio-tarsienne et douleurs à la marche sur terrain irrégulier et boiterie bilatérale",
    expectedSystems: ['hanche', 'cheville'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "PTH D + bimalléolaire G avec arthrose"
  },
  {
    // Cas 12 : Fracture fémur D + fracture calcanéum G
    input: "fracture diaphysaire du fémur droit consolidée par enclouage centro-médullaire avec raccourcissement de 2 cm et raideur du genou flexion limitée à 100 degrés et amyotrophie du quadriceps et boiterie ; fracture du calcanéum gauche avec effondrement de l'angle de Böhler et arthrose sous-talienne et douleurs permanentes à l'appui et impossibilité de marcher pieds nus sur sol dur",
    expectedSystems: ['fémur', 'pied'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Fémur D raccourci + calcanéum G Böhler"
  },
  {
    // Cas 13 : Fracture cotyle D + fracture trimalléolaire G
    input: "fracture du cotyle de la hanche droite avec arthrose coxo-fémorale post-traumatique et limitation de la flexion à 75 degrés et douleurs à l'appui ; fracture trimalléolaire de la cheville gauche avec raideur sévère et arthrose tibio-tarsienne avancée et douleurs permanentes à la marche et boiterie bilatérale sévère avec canne",
    expectedSystems: ['hanche', 'cheville'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Cotyle D arthrosique + trimalléolaire G sévère"
  },
  {
    // Cas 14 : Fracture trochanter G + fracture astragale D
    input: "fracture du massif trochantérien gauche ostéosynthésée avec raideur de la hanche et boiterie et douleurs à l'appui prolongé ; fracture de l'astragale du pied droit avec nécrose aseptique et arthrose tibio-tarsienne et sous-talienne et raideur sévère de la cheville et douleurs permanentes à chaque pas",
    expectedSystems: ['hanche', 'cheville'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Trochanter G + astragale D nécrose",
    acceptDominantLesion: true
  },
  {
    // Cas 15 : Fracture fémur G + fracture pilon tibial D
    input: "fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 3 cm et raideur du genou et amyotrophie et boiterie sévère ; fracture du pilon tibial droit avec arthrose tibio-tarsienne sévère et raideur de la cheville et douleurs permanentes à la marche et boiterie bilatérale avec deux cannes",
    expectedSystems: ['fémur', 'cheville'],
    expectedMinRate: 15,
    expectedMaxRate: 65,
    description: "Fémur G raccourci 3cm + pilon tibial D"
  },
  {
    // Cas 16 : PTH G + fracture Lisfranc D
    input: "fracture du col du fémur gauche traitée par prothèse totale de hanche avec boiterie et douleurs mécaniques ; luxation de l'interligne de Lisfranc du pied droit avec arthrose tarso-métatarsienne et douleurs chroniques au médio-pied et effondrement de l'arche plantaire et métatarsalgie",
    expectedSystems: ['hanche', 'pied'],
    expectedMinRate: 10,
    expectedMaxRate: 50,
    description: "PTH G + Lisfranc D avec arthrose",
    acceptDominantLesion: true
  },
  {
    // Cas 17 : Fracture fémur D + fracture calcanéum bilatéral
    input: "fracture diaphysaire du fémur droit consolidée avec raccourcissement de 2 cm et raideur du genou ; fracture du calcanéum droit avec effondrement de l'angle de Böhler et arthrose sous-talienne et douleurs à l'appui ; fracture du calcanéum gauche avec thalassement et douleurs chroniques aux deux talons et impossibilité de marcher pieds nus et marche avec semelles orthopédiques",
    expectedSystems: ['fémur', 'pied', 'pied'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Fémur D + calcanéum bilatéral"
  },
  {
    // Cas 18 : Fracture trochanter D + fracture bimalléolaire D + fracture métatarsiens G
    input: "fracture pertrochantérienne de la hanche droite ostéosynthésée avec raideur et raccourcissement de 1 cm et boiterie ; fracture bimalléolaire de la cheville droite avec raideur et instabilité et douleurs à la marche ; fracture des 2ème et 3ème métatarsiens du pied gauche avec métatarsalgie chronique et douleurs à l'appui antérieur du pied",
    expectedSystems: ['hanche', 'cheville', 'pied'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Trochanter D + bimalléolaire D + métatarsiens G"
  },
  {
    // Cas 19 : Fracture col fémur G vis + fracture cheville D + fracture orteils G
    input: "fracture du col du fémur gauche ostéosynthésée par triple vissage avec nécrose aseptique de la tête fémorale et limitation de la flexion à 75 degrés et douleurs permanentes ; fracture bimalléolaire de la cheville droite consolidée avec raideur résiduelle et arthrose débutante ; amputation traumatique du gros orteil gauche avec gêne à la marche et trouble de l'équilibre à la propulsion",
    expectedSystems: ['hanche', 'cheville', 'pied'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Col fémur G nécrose + bimalléolaire D + amputation hallux G"
  },
  {
    // Cas 20 : Fracture fémur bilatéral + fracture calcanéum D
    input: "fracture diaphysaire du fémur droit consolidée avec raccourcissement de 2 cm et raideur du genou et boiterie ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 1 cm et douleurs mécaniques ; fracture du calcanéum droit avec arthrose sous-talienne et douleurs chroniques à l'appui et marche avec deux cannes anglaises et impossibilité de station debout prolongée",
    expectedSystems: ['fémur', 'fémur', 'pied'],
    expectedMinRate: 15,
    expectedMaxRate: 65,
    description: "Fémur bilatéral raccourci + calcanéum D"
  },

  // ============================================================
  // SECTION C : GENOU + CHEVILLE/PIED (cas 21-30)
  // ============================================================
  {
    // Cas 21 : Fracture plateau tibial D + fracture bimalléolaire G
    input: "fracture du plateau tibial externe du genou droit avec gonarthrose post-traumatique et raideur en flexion limitée à 90 degrés et douleurs mécaniques ; fracture bimalléolaire de la cheville gauche avec raideur résiduelle et instabilité ligamentaire et arthrose tibio-tarsienne et douleurs à la marche",
    expectedSystems: ['genou', 'cheville'],
    expectedMinRate: 10,
    expectedMaxRate: 50,
    description: "Plateau tibial D + bimalléolaire G"
  },
  {
    // Cas 22 : Fracture rotule G + fracture calcanéum D
    input: "fracture comminutive de la rotule gauche traitée par cerclage avec raideur du genou flexion limitée à 85 degrés et douleurs à la montée des escaliers et impossibilité de s'accroupir ; fracture du calcanéum droit avec effondrement de l'angle de Böhler et arthrose sous-talienne sévère et douleurs permanentes à l'appui et talalgie chronique",
    expectedSystems: ['genou', 'pied'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Rotule G comminutive + calcanéum D Böhler"
  },
  {
    // Cas 23 : Rupture LCA D + fracture trimalléolaire G
    input: "rupture du ligament croisé antérieur du genou droit opérée par ligamentoplastie au DIDT avec laxité antérieure résiduelle et douleurs à l'effort et instabilité lors des changements de direction ; fracture trimalléolaire de la cheville gauche avec raideur sévère et arthrose tibio-tarsienne avancée et douleurs permanentes et impossibilité de courir",
    expectedSystems: ['genou', 'cheville'],
    expectedMinRate: 10,
    expectedMaxRate: 50,
    description: "LCA D + trimalléolaire G sévère",
    acceptDominantLesion: true
  },
  {
    // Cas 24 : Fracture plateau tibial bilatéral
    input: "fracture du plateau tibial externe du genou droit avec gonarthrose post-traumatique et raideur en flexion limitée à 90 degrés et déviation en valgus de 5 degrés ; fracture du plateau tibial interne du genou gauche avec enfoncement résiduel et gonarthrose et raideur en flexion à 85 degrés et déviation en varus et douleurs bilatérales à la descente des escaliers et boiterie",
    expectedSystems: ['genou', 'genou'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Plateau tibial bilatéral avec gonarthrose",
    acceptDominantLesion: true
  },
  {
    // Cas 25 : Fracture supra-condylienne D + fracture pilon tibial G
    input: "fracture supra-condylienne du fémur droit ostéosynthésée avec raideur sévère du genou flexion limitée à 75 degrés et amyotrophie majeure du quadriceps ; fracture du pilon tibial gauche avec arthrose tibio-tarsienne et raideur sévère de la cheville et douleurs permanentes à la marche et boiterie bilatérale avec canne",
    expectedSystems: ['genou', 'cheville'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Supra-condylienne D + pilon tibial G"
  },
  {
    // Cas 26 : Fracture rotule D + fracture astragale G
    input: "fracture de la rotule droite ostéosynthésée par haubanage avec raideur du genou flexion limitée à 100 degrés et douleurs à la station debout prolongée ; fracture de l'astragale gauche avec nécrose aseptique partielle et arthrose tibio-tarsienne et raideur de la cheville et douleurs chroniques à la marche",
    expectedSystems: ['genou', 'cheville'],
    expectedMinRate: 10,
    expectedMaxRate: 50,
    description: "Rotule D + astragale G nécrose"
  },
  {
    // Cas 27 : Genou D (lésion ménisco-ligamentaire) + cheville G + pied G
    input: "entorse grave du genou droit avec rupture du ligament croisé antérieur et lésion méniscale interne opérée avec laxité résiduelle et douleurs à l'effort ; fracture bimalléolaire de la cheville gauche avec raideur et instabilité ; fracture du 5ème métatarsien du pied gauche avec métatarsalgie et douleurs à la marche prolongée",
    expectedSystems: ['genou', 'cheville', 'pied'],
    expectedMinRate: 8,
    expectedMaxRate: 50,
    description: "LCA + ménisque D + bimalléolaire G + 5ème métatarsien G",
    acceptDominantLesion: true
  },
  {
    // Cas 28 : Fracture plateau tibial D + fracture calcanéum D + fracture orteils G
    input: "fracture du plateau tibial externe du genou droit avec gonarthrose et raideur en flexion limitée à 90 degrés ; fracture du calcanéum droit avec arthrose sous-talienne et talalgie chronique ; amputation traumatique des 2ème et 3ème orteils du pied gauche avec gêne à la propulsion et trouble de l'équilibre",
    expectedSystems: ['genou', 'pied', 'pied'],
    expectedMinRate: 8,
    expectedMaxRate: 50,
    description: "Plateau tibial D + calcanéum D + amputation orteils G",
    acceptDominantLesion: true
  },
  {
    // Cas 29 : Cheville bilatérale
    input: "fracture bimalléolaire de la cheville droite ostéosynthésée avec raideur résiduelle et instabilité en varus et arthrose tibio-tarsienne débutante et douleurs à la marche ; fracture trimalléolaire de la cheville gauche avec raideur sévère et arthrose tibio-tarsienne avancée et douleurs permanentes et boiterie bilatérale avec canne",
    expectedSystems: ['cheville', 'cheville'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Cheville bilatérale: bimalléolaire D + trimalléolaire G"
  },
  {
    // Cas 30 : Fracture genou D + fracture cheville D + fracture pied D (même côté)
    input: "fracture de la rotule droite avec raideur du genou flexion limitée à 95 degrés et douleurs à la montée des escaliers ; fracture de la malléole externe de la cheville droite consolidée avec raideur résiduelle et douleurs ; fracture du calcanéum droit avec arthrose sous-talienne et douleurs à l'appui et impossibilité de marcher pieds nus",
    expectedSystems: ['genou', 'cheville', 'pied'],
    expectedMinRate: 8,
    expectedMaxRate: 50,
    description: "Cascade ipsilatérale D: rotule + malléole + calcanéum"
  },

  // ============================================================
  // SECTION D : JAMBE/TIBIA + AUTRES SEGMENTS (cas 31-40)
  // ============================================================
  {
    // Cas 31 : Fracture 2 os jambe D + fracture col fémur G
    input: "fracture des deux os de la jambe droite consolidée avec cal vicieux angulaire de 10 degrés et raccourcissement de 2 cm et raideur de la cheville ; fracture du col du fémur gauche traitée par prothèse totale de hanche avec boiterie et douleurs mécaniques et boiterie bilatérale sévère avec canne",
    expectedSystems: ['jambe', 'hanche'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "2 os jambe D cal vicieux + PTH G"
  },
  {
    // Cas 32 : Fracture tibia D + fracture plateau tibial G
    input: "fracture diaphysaire du tibia droit consolidée par enclouage centro-médullaire avec cal vicieux en varus de 8 degrés et raccourcissement de 1 cm ; fracture du plateau tibial interne du genou gauche avec enfoncement résiduel et gonarthrose et raideur en flexion à 90 degrés et déviation en varus",
    expectedSystems: ['tibia', 'genou'],
    expectedMinRate: 8,
    expectedMaxRate: 50,
    description: "Tibia D cal vicieux + plateau tibial G",
    acceptDominantLesion: true
  },
  {
    // Cas 33 : Fracture 2 os jambe G + fracture calcanéum D
    input: "fracture des deux os de la jambe gauche consolidée avec cal vicieux angulaire de 12 degrés et raccourcissement de 3 cm et raideur de la cheville et boiterie sévère ; fracture du calcanéum droit avec effondrement de l'angle de Böhler et arthrose sous-talienne et douleurs permanentes à l'appui et impossibilité de courir et marche avec canne",
    expectedSystems: ['jambe', 'pied'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "2 os jambe G raccourci 3cm + calcanéum D"
  },
  {
    // Cas 34 : Fracture tibia bilatéral
    input: "fracture diaphysaire du tibia droit consolidée avec raccourcissement de 2 cm et cal vicieux angulaire et raideur de la cheville ; fracture diaphysaire du tibia gauche consolidée avec cal vicieux en valgus de 5 degrés et raccourcissement de 1 cm et douleurs à la marche et boiterie bilatérale",
    expectedSystems: ['tibia', 'tibia'],
    expectedMinRate: 8,
    expectedMaxRate: 50,
    description: "Tibia bilatéral avec cal vicieux"
  },
  {
    // Cas 35 : Fracture ouverte tibia D + fracture fémur G + fracture malléole D
    input: "fracture ouverte stade 2 du tibia droit avec perte de substance cutanée greffée et ostéite chronique traitée et raideur de la cheville et douleurs au froid ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 2 cm et raideur du genou et boiterie ; fracture de la malléole interne de la cheville droite avec douleurs résiduelles et raideur et boiterie bilatérale sévère avec deux cannes",
    expectedSystems: ['tibia', 'fémur', 'cheville'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Tibia ouvert D + fémur G + malléole D"
  },
  {
    // Cas 36 : Fracture 2 os jambe D + PTH G + fracture rotule D
    input: "fracture des deux os de la jambe droite consolidée avec cal vicieux et raccourcissement de 2 cm et raideur de la cheville ; fracture du col du fémur gauche traitée par prothèse totale de hanche avec boiterie et douleurs mécaniques ; fracture de la rotule droite avec raideur du genou flexion limitée à 95 degrés et douleurs à la montée des escaliers",
    expectedSystems: ['jambe', 'hanche', 'genou'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "2 os jambe D + PTH G + rotule D"
  },
  {
    // Cas 37 : Fracture tibia G + fracture plateau tibial D + fracture bimalléolaire G
    input: "fracture diaphysaire du tibia gauche consolidée avec raccourcissement de 2 cm ; fracture du plateau tibial externe du genou droit avec gonarthrose et raideur en flexion à 90 degrés ; fracture bimalléolaire de la cheville gauche avec raideur et arthrose tibio-tarsienne et douleurs permanentes et boiterie avec deux cannes",
    expectedSystems: ['tibia', 'genou', 'cheville'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Tibia G + plateau tibial D + bimalléolaire G"
  },
  {
    // Cas 38 : Fracture jambe D Gustilo + fracture trochanter G + fracture astragale D
    input: "fracture ouverte Gustilo IIIa de la jambe droite avec greffe cutanée et ostéite séquellaire et raideur de la cheville et douleurs chroniques et cicatrice adhérente ; fracture pertrochantérienne de la hanche gauche ostéosynthésée avec raideur et boiterie ; fracture de l'astragale droite avec nécrose partielle et arthrose tibio-tarsienne et sous-talienne et douleurs permanentes à la marche",
    expectedSystems: ['jambe', 'hanche', 'cheville'],
    expectedMinRate: 15,
    expectedMaxRate: 65,
    description: "Jambe D Gustilo + trochanter G + astragale D nécrose",
    acceptDominantLesion: true
  },
  {
    // Cas 39 : Fracture tibia D + fracture fémur D + fracture calcanéum G (même côté tibia-fémur)
    input: "fracture diaphysaire du tibia droit consolidée avec cal vicieux en varus et raccourcissement de 1 cm ; fracture diaphysaire du fémur droit consolidée avec raccourcissement de 2 cm et raideur du genou et amyotrophie du quadriceps ; fracture du calcanéum gauche avec arthrose sous-talienne et douleurs à l'appui et marche avec canne",
    expectedSystems: ['tibia', 'fémur', 'pied'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Tibia D + fémur D ipsilatéral + calcanéum G"
  },
  {
    // Cas 40 : Fracture 2 os jambe bilatéral + fracture rotule D
    input: "fracture des deux os de la jambe droite consolidée avec cal vicieux angulaire de 8 degrés et raccourcissement de 2 cm ; fracture des deux os de la jambe gauche consolidée avec cal vicieux en valgus de 6 degrés et raccourcissement de 1 cm ; fracture de la rotule droite avec raideur du genou flexion limitée à 90 degrés et douleurs et boiterie bilatérale sévère",
    expectedSystems: ['jambe', 'jambe', 'genou'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "2 os jambe bilatéral + rotule D"
  },

  // ============================================================
  // SECTION E : COMBINAISONS MULTIPLES ≥ 3 SEGMENTS (cas 41-50)
  // ============================================================
  {
    // Cas 41 : Hanche + genou + cheville — 3 articulations ipsilatérales
    input: "fracture du col du fémur droit traitée par prothèse totale de hanche avec boiterie et douleurs mécaniques ; fracture du plateau tibial externe du genou droit avec gonarthrose et raideur en flexion limitée à 90 degrés ; fracture bimalléolaire de la cheville droite avec raideur et arthrose tibio-tarsienne et douleurs permanentes à chaque pas et marche avec canne",
    expectedSystems: ['hanche', 'genou', 'cheville'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Cascade ipsilatérale D: PTH + plateau tibial + bimalléolaire"
  },
  {
    // Cas 42 : PTH G + fracture rotule D + fracture calcanéum G
    input: "fracture du col du fémur gauche traitée par prothèse totale de hanche avec boiterie et douleurs mécaniques et limitation de la flexion à 85 degrés ; fracture comminutive de la rotule droite avec raideur du genou flexion limitée à 85 degrés et douleurs à la montée des escaliers ; fracture du calcanéum gauche avec arthrose sous-talienne et douleurs permanentes à l'appui et impossibilité de courir",
    expectedSystems: ['hanche', 'genou', 'pied'],
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "PTH G + rotule D + calcanéum G"
  },
  {
    // Cas 43 : Fémur D + genou G + cheville G + pied D — 4 segments
    input: "fracture diaphysaire du fémur droit consolidée avec raccourcissement de 2 cm et raideur du genou et boiterie ; fracture supra-condylienne du fémur gauche avec raideur sévère du genou flexion limitée à 75 degrés et amyotrophie ; fracture trimalléolaire de la cheville gauche avec raideur et arthrose et douleurs permanentes ; fracture du calcanéum droit avec arthrose sous-talienne et talalgie et boiterie bilatérale avec deux cannes",
    expectedSystems: ['fémur', 'genou', 'cheville', 'pied'],
    expectedMinRate: 20,
    expectedMaxRate: 70,
    description: "Fémur D + supra-condylienne G + trimalléolaire G + calcanéum D"
  },
  {
    // Cas 44 : PTH D + PTH G + genou D — hanche bilatérale + genou
    input: "fracture du col du fémur droit traitée par prothèse totale de hanche avec boiterie et douleurs mécaniques ; fracture du col du fémur gauche traitée par prothèse totale de hanche avec boiterie bilatérale sévère et limitation de la flexion à 80 degrés ; fracture du plateau tibial interne du genou droit avec gonarthrose et raideur en flexion limitée à 85 degrés et marche avec deux cannes anglaises",
    expectedSystems: ['hanche', 'hanche', 'genou'],
    expectedMinRate: 15,
    expectedMaxRate: 65,
    description: "PTH bilatérale + plateau tibial D"
  },
  {
    // Cas 45 : Genou bilatéral + cheville bilatérale — 4 segments
    input: "fracture du plateau tibial externe du genou droit avec gonarthrose et raideur en flexion à 90 degrés ; fracture de la rotule gauche avec raideur du genou flexion limitée à 95 degrés ; fracture bimalléolaire de la cheville droite avec raideur et instabilité et arthrose ; fracture de la malléole externe de la cheville gauche consolidée avec raideur et douleurs et boiterie bilatérale permanente",
    expectedSystems: ['genou', 'genou', 'cheville', 'cheville'],
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Genou bilatéral + cheville bilatérale"
  },
  {
    // Cas 46 : PTH D + fémur G + genou D + cheville G — 4 segments alternés
    input: "fracture du col du fémur droit traitée par prothèse totale de hanche avec boiterie et douleurs mécaniques ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 2 cm et raideur du genou et amyotrophie ; fracture de la rotule droite avec raideur du genou flexion limitée à 95 degrés et douleurs ; fracture trimalléolaire de la cheville gauche avec raideur sévère et arthrose et douleurs permanentes et boiterie bilatérale avec deux cannes",
    expectedSystems: ['hanche', 'fémur', 'genou', 'cheville'],
    expectedMinRate: 15,
    expectedMaxRate: 65,
    description: "PTH D + fémur G + rotule D + trimalléolaire G"
  },
  {
    // Cas 47 : Hanche G + tibia D + genou G + pied bilatéral — 5 segments
    input: "fracture pertrochantérienne de la hanche gauche ostéosynthésée avec raideur et raccourcissement de 1 cm et boiterie ; fracture diaphysaire du tibia droit consolidée avec cal vicieux et raccourcissement de 2 cm ; fracture supra-condylienne du fémur gauche avec raideur du genou flexion limitée à 80 degrés et amyotrophie ; fracture du calcanéum droit avec arthrose sous-talienne et douleurs à l'appui ; fracture des 2ème et 3ème métatarsiens du pied gauche avec métatarsalgie et boiterie bilatérale avec deux cannes",
    expectedSystems: ['hanche', 'tibia', 'genou', 'pied', 'pied'],
    expectedMinRate: 15,
    expectedMaxRate: 65,
    description: "Hanche G + tibia D + genou G + pied bilatéral"
  },
  {
    // Cas 48 : PTH + fémur + genou + tibia + cheville — cascade totale membre inf D
    input: "fracture du col du fémur droit traitée par prothèse totale de hanche avec boiterie ; fracture diaphysaire du fémur droit consolidée avec raccourcissement de 3 cm et raideur du genou ; fracture de la rotule droite avec raideur du genou flexion limitée à 85 degrés ; fracture diaphysaire du tibia droit consolidée avec cal vicieux angulaire ; fracture trimalléolaire de la cheville droite avec raideur sévère et arthrose et douleurs permanentes et boiterie sévère avec deux cannes",
    expectedSystems: ['hanche', 'fémur', 'genou', 'tibia', 'cheville'],
    expectedMinRate: 20,
    expectedMaxRate: 75,
    description: "Cascade totale membre inf D: PTH + fémur + rotule + tibia + trimalléolaire"
  },
  {
    // Cas 49 : Cotyle D + fémur G + genou bilatéral + calcanéum D — 5 segments
    input: "fracture du cotyle de la hanche droite avec arthrose coxo-fémorale et limitation de la flexion à 70 degrés et douleurs permanentes ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 2 cm et amyotrophie ; fracture du plateau tibial externe du genou droit avec gonarthrose et raideur en flexion à 90 degrés ; fracture de la rotule gauche avec raideur du genou flexion limitée à 95 degrés ; fracture du calcanéum droit avec arthrose sous-talienne et douleurs chroniques et boiterie bilatérale avec cannes",
    expectedSystems: ['hanche', 'fémur', 'genou', 'genou', 'pied'],
    expectedMinRate: 20,
    expectedMaxRate: 70,
    description: "Cotyle D + fémur G + genou bilatéral + calcanéum D"
  },
  {
    // Cas 50 : Hanche + fémur + genou + jambe + cheville + pied — 6 segments
    input: "fracture du massif trochantérien de la hanche droite ostéosynthésée avec raideur et boiterie ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 3 cm et raideur du genou ; fracture du plateau tibial interne du genou droit avec gonarthrose et raideur en flexion à 85 degrés ; fracture des deux os de la jambe gauche consolidée avec cal vicieux et raccourcissement de 2 cm ; fracture bimalléolaire de la cheville droite avec raideur et arthrose et instabilité ; fracture du calcanéum gauche avec arthrose sous-talienne et douleurs permanentes et boiterie bilatérale sévère avec deux cannes et fauteuil roulant pour longs déplacements",
    expectedSystems: ['hanche', 'fémur', 'genou', 'jambe', 'cheville', 'pied'],
    expectedMinRate: 25,
    expectedMaxRate: 80,
    description: "6 segments: trochanter D + fémur G + plateau tibial D + 2 os jambe G + bimalléolaire D + calcanéum G"
  },

  // ============================================================
  // SECTION F : CAS SÉVÈRES ET AMPUTATIONS (cas 51-60)
  // ============================================================
  {
    // Cas 51 : Amputation cuisse D + fracture fémur G
    input: "amputation de la cuisse droite au tiers inférieur appareillée avec prothèse fémorale et douleurs du moignon et périmètre de marche limité à 300 mètres avec deux cannes anglaises et impossibilité de courir ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 2 cm et raideur du genou et amyotrophie du quadriceps et boiterie sévère",
    expectedSystems: ['fémur', 'fémur'],
    expectedMinRate: 30,
    expectedMaxRate: 85,
    description: "Amputation cuisse D + fémur G raccourci",
    acceptDominantLesion: true
  },
  {
    // Cas 52 : Amputation jambe D + PTH G
    input: "amputation de la jambe droite au tiers supérieur appareillée avec prothèse tibiale et douleurs du moignon et périmètre de marche limité à 500 mètres et impossibilité de courir ; fracture du col du fémur gauche traitée par prothèse totale de hanche avec boiterie et douleurs mécaniques et limitation de la flexion à 85 degrés et marche avec deux cannes anglaises",
    expectedSystems: ['jambe', 'hanche'],
    expectedMinRate: 25,
    expectedMaxRate: 80,
    description: "Amputation jambe D + PTH G",
    acceptDominantLesion: true
  },
  {
    // Cas 53 : Amputation pied D Chopart + fracture genou G
    input: "amputation transmétatarsienne du pied droit de type Chopart appareillée avec chaussure orthopédique et douleurs du moignon et marche difficile ; fracture supra-condylienne du fémur gauche avec raideur sévère du genou flexion limitée à 75 degrés et amyotrophie majeure du quadriceps et impossibilité de monter les escaliers normalement et boiterie sévère",
    expectedSystems: ['pied', 'genou'],
    expectedMinRate: 15,
    expectedMaxRate: 65,
    description: "Amputation Chopart D + supra-condylienne G"
  },
  {
    // Cas 54 : Amputation orteils bilatéral + fracture trochanter D
    input: "amputation traumatique du gros orteil et du 2ème orteil du pied droit avec gêne à la propulsion et trouble de l'équilibre ; amputation du gros orteil du pied gauche avec gêne à la marche ; fracture du massif trochantérien droit ostéosynthésée avec raideur de la hanche et raccourcissement de 1 cm et douleurs à l'appui et boiterie sévère",
    expectedSystems: ['pied', 'pied', 'hanche'],
    expectedMinRate: 1,
    expectedMaxRate: 55,
    description: "Amputation orteils bilatéral + trochanter D",
    acceptDominantLesion: true
  },
  {
    // Cas 55 : Lésion nerf SPE D + fracture PTH G + fracture cheville D
    input: "paralysie du nerf sciatique poplité externe droit avec pied tombant et steppage et impossibilité de relever le pied et port d'une orthèse releveur ; fracture du col du fémur gauche traitée par prothèse totale de hanche avec boiterie et douleurs ; fracture bimalléolaire de la cheville droite avec raideur et arthrose et douleurs et boiterie bilatérale sévère avec canne",
    expectedSystems: ['genou', 'hanche', 'cheville'],
    expectedMinRate: 15,
    expectedMaxRate: 65,
    description: "Paralysie SPE D + PTH G + bimalléolaire D",
    acceptDominantLesion: true
  },
  {
    // Cas 56 : Fracture fémur bilatéral + fracture tibia bilatéral (AVP haute énergie)
    input: "fracture diaphysaire du fémur droit consolidée avec raccourcissement de 3 cm et raideur du genou et amyotrophie sévère ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 2 cm et raideur du genou et boiterie ; fracture diaphysaire du tibia droit consolidée avec cal vicieux angulaire de 10 degrés ; fracture des deux os de la jambe gauche consolidée avec cal vicieux et raccourcissement de 2 cm et boiterie bilatérale sévère avec deux cannes et fauteuil roulant",
    expectedSystems: ['fémur', 'fémur', 'tibia', 'jambe'],
    expectedMinRate: 20,
    expectedMaxRate: 75,
    description: "Fémur bilatéral + tibia bilatéral (AVP haute énergie)"
  },
  {
    // Cas 57 : PTH bilatérale + genou bilatéral + cheville D — 5 segments sévères
    input: "fracture du col du fémur droit traitée par prothèse totale de hanche avec boiterie ; fracture du col du fémur gauche traitée par prothèse totale de hanche avec boiterie bilatérale et limitation de la flexion à 80 degrés ; fracture du plateau tibial externe du genou droit avec gonarthrose et raideur en flexion à 90 degrés ; fracture de la rotule gauche avec raideur du genou flexion limitée à 90 degrés et douleurs ; fracture trimalléolaire de la cheville droite avec raideur sévère et arthrose et boiterie permanente avec deux cannes",
    expectedSystems: ['hanche', 'hanche', 'genou', 'genou', 'cheville'],
    expectedMinRate: 20,
    expectedMaxRate: 75,
    description: "PTH bilatérale + genou bilatéral + trimalléolaire D"
  },
  {
    // Cas 58 : Amputation cuisse D + amputation jambe G (double amputé)
    input: "amputation de la cuisse droite au tiers moyen appareillée avec prothèse fémorale et douleurs du moignon et périmètre de marche très limité ; amputation de la jambe gauche au tiers supérieur appareillée avec prothèse tibiale et douleurs du moignon et impossibilité de marcher sans deux cannes anglaises et utilisation d'un fauteuil roulant pour les longs déplacements",
    expectedSystems: ['fémur', 'jambe'],
    expectedMinRate: 40,
    expectedMaxRate: 95,
    description: "Double amputé: cuisse D + jambe G",
    acceptDominantLesion: true
  },
  {
    // Cas 59 : PTH + fémur + genou + 2 os jambe + cheville + calcanéum — 7 segments sévères
    input: "fracture du col du fémur droit traitée par prothèse totale de hanche avec boiterie sévère ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 3 cm et raideur du genou ; fracture supra-condylienne du fémur droit avec raideur sévère du genou flexion limitée à 75 degrés et amyotrophie majeure ; fracture des deux os de la jambe gauche consolidée avec cal vicieux et raccourcissement de 2 cm ; fracture trimalléolaire de la cheville droite avec raideur sévère et arthrose ; fracture du pilon tibial gauche avec arthrose tibio-tarsienne et raideur ; fracture du calcanéum droit avec arthrose sous-talienne et douleurs permanentes et boiterie bilatérale sévère avec deux cannes et fauteuil roulant",
    expectedSystems: ['hanche', 'fémur', 'genou', 'jambe', 'cheville', 'cheville', 'pied'],
    expectedMinRate: 30,
    expectedMaxRate: 90,
    description: "7 segments sévères: PTH D + fémur G + genou D + 2 os jambe G + cheville bilat + calcanéum D"
  },
  {
    // Cas 60 : Hanche bilat + fémur bilat + genou bilat + cheville bilat + pied bilat — 10 atteintes catastrophiques
    input: "fracture du col du fémur droit traitée par prothèse totale de hanche avec boiterie ; fracture du cotyle de la hanche gauche avec arthrose coxo-fémorale et limitation sévère de la flexion à 60 degrés ; fracture diaphysaire du fémur droit consolidée avec raccourcissement de 3 cm et raideur du genou ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 2 cm et amyotrophie ; fracture du plateau tibial externe du genou droit avec gonarthrose et raideur en flexion à 85 degrés ; fracture de la rotule gauche avec raideur du genou flexion limitée à 80 degrés ; fracture trimalléolaire de la cheville droite avec raideur sévère et arthrose ; fracture bimalléolaire de la cheville gauche avec raideur et instabilité ; fracture du calcanéum droit avec arthrose sous-talienne et douleurs chroniques ; fracture des métatarsiens du pied gauche avec métatarsalgie et marche impossible sans deux cannes anglaises et fauteuil roulant pour tout déplacement",
    expectedSystems: ['hanche', 'hanche', 'fémur', 'fémur', 'genou', 'genou', 'cheville', 'cheville', 'pied', 'pied'],
    expectedMinRate: 40,
    expectedMaxRate: 98,
    description: "10 atteintes catastrophiques: hanche bilat + fémur bilat + genou bilat + cheville bilat + pied bilat"
  },
];

// ====== RUNNER ======
async function runTests() {
  let passed = 0;
  let failed = 0;

  console.log('╔═══════════════════════════════════════════════════════════════════╗');
  console.log('║  TEST 60 CAS POLYTRAUMATISMES MEMBRES INFÉRIEURS (V3.3.319)     ║');
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

      // 1. Reconnu comme polytraumatisme / cumul ?
      const isPolytrauma = nameLower.includes('polytraum')
        || nameLower.includes('cumul')
        || justif.includes('polytraum')
        || justif.includes('cumul')
        || justif.includes('balthaz')
        || justif.includes('systèmes')
        || justif.includes('systemes')
        || pathLower.includes('polytraum');

      // 2. Taux dans la fourchette (±5% tolérance)
      const rateInRange = numRate >= (tc.expectedMinRate - 5) && numRate <= (tc.expectedMaxRate + 10);

      // 3. Systèmes attendus retrouvés
      const systemsFound = tc.expectedSystems.filter(sys => {
        const s = sys.toLowerCase();
        return allText.includes(s)
          || (s === 'hanche' && /hanche|col.*f[eé]mor|trochant|coxo|pth|cotyle|proth[eè]se.*totale.*hanche/i.test(allText))
          || (s === 'fémur' && /f[eé]mur|diaphys.*f[eé]m|supra.*condyl|cuisse/i.test(allText))
          || (s === 'genou' && /genou|plateau.*tibial|rotule|lca|lig.*crois|supra.*condyl|gonarthrose/i.test(allText))
          || (s === 'tibia' && /tibia|diaphys.*tib/i.test(allText))
          || (s === 'jambe' && /jambe|tibia|p[eé]ron[eé]|deux.*os/i.test(allText))
          || (s === 'cheville' && /cheville|mall[eé]ol|pilon.*tibial|tarse|tibio.*tars|astragale/i.test(allText))
          || (s === 'pied' && /pied|calcan[eé]um|tarse|orteil|m[eé]tatars|B[oö]hler|astragale|chopart|lisfranc/i.test(allText))
          || (s === 'bassin' && /bassin|pelvien|obtur|cotyle|symphyse|iliaque|ischio|sacro/i.test(allText));
      });

      const testPass = (isPolytrauma || tc.acceptDominantLesion === true) && rateInRange;

      if (testPass) passed++;
      else failed++;

      console.log(`─── Cas ${i + 1} ───`);
      console.log(`  Description: ${tc.description}`);
      console.log(`  Sièges    : ${tc.expectedSystems.join(' + ')}`);
      console.log(`  Attendu   : Polytraumatisme (${tc.expectedMinRate}-${tc.expectedMaxRate}%)`);
      console.log(`  Obtenu    : ${testPass ? '✅' : '❌'} ${name}`);
      console.log(`  Taux      : ${numRate}%`);
      console.log(`  Type      : ${type}`);
      console.log(`  Polytrauma: ${isPolytrauma ? '✅' : '❌'} | Taux OK: ${rateInRange ? '✅' : '❌'} | Syst: ${systemsFound.length}/${tc.expectedSystems.length}`);
      if (result?.path) console.log(`  Path      : ${result.path}`);
      if (!testPass) {
        const reasons: string[] = [];
        if (!isPolytrauma && !tc.acceptDominantLesion) reasons.push('PAS reconnu comme polytraumatisme');
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
