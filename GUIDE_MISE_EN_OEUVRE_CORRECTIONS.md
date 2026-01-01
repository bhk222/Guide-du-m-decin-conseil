# 🔧 GUIDE DE MISE EN ŒUVRE - Corrections Barème

**Date:** 1er janvier 2026  
**Objectif:** Passer de 96% à 100% de conformité  
**Durée estimée:** 2-3 semaines

---

## 📋 PLAN D'ACTION DÉTAILLÉ

### 🔴 PHASE 1: CORRECTIONS URGENTES (Semaine 1)

---

#### ✅ Tâche 1: Créer affectionsOculaires.ts

**Localisation:** `data/affectionsOculaires.ts`

**Contenu à créer:**

```typescript
import { InjuryCategory } from '../types';

export const affectionsOculaires: InjuryCategory[] = [
  {
    name: "Affections Oculaires et Visuelles",
    subcategories: [
      {
        name: "Cécité et Perte d'Acuité Visuelle",
        injuries: [
          { 
            name: "Cécité complète bilatérale",
            rate: 100,
            description: "Perte totale et définitive de la vision des deux yeux.",
            imageUrl: "/images/medical/cecite-bilaterale.jpg",
            clinicalTip: "Vérifier : absence totale de perception lumineuse (APL) aux deux yeux. Test du réflexe photomoteur aboli bilatéralement. Confirmer par examen ophtalmologique complet. Droit à tierce personne et aide à la mobilité (canne blanche, chien guide)."
          },
          { 
            name: "Cécité complète unilatérale",
            rate: [25, 30],
            description: "Perte totale et définitive de la vision d'un œil.",
            rateCriteria: {
              low: "Œil non dominant, bon état œil controlatéral",
              high: "Œil dominant ou pathologie œil controlatéral"
            },
            imageUrl: "/images/medical/cecite-unilaterale.jpg",
            clinicalTip: "Vérifier : acuité visuelle 0 (APL), examen fond d'œil, champ visuel monoculaire résiduel. Évaluer retentissement professionnel (perte vision relief, rétrécissement champ visuel binoculaire). Contre-indication : travaux en hauteur, conduite véhicules lourds."
          },
          { 
            name: "Énucléation œil avec appareillage prothétique",
            rate: [25, 35],
            description: "Ablation chirurgicale du globe oculaire avec prothèse oculaire.",
            rateCriteria: {
              low: "Prothèse bien tolérée, bon résultat esthétique",
              high: "Intolérances, complications orbite creuse, préjudice esthétique"
            },
            clinicalTip: "Vérifier : adaptation prothèse, complications (infection, expulsion), mobilité prothèse, symétrie esthétique, retentissement psychologique. Prévoir renouvellement prothèse tous les 3-5 ans."
          },
          // Table baisse acuité visuelle selon barème AT MP
          { name: "Baisse acuité visuelle 9/10ème", rate: 1 },
          { name: "Baisse acuité visuelle 8/10ème", rate: 3 },
          { name: "Baisse acuité visuelle 7/10ème", rate: 5 },
          { name: "Baisse acuité visuelle 6/10ème", rate: 7 },
          { name: "Baisse acuité visuelle 5/10ème", rate: 10 },
          { name: "Baisse acuité visuelle 4/10ème", rate: 15 },
          { name: "Baisse acuité visuelle 3/10ème", rate: 20 },
          { name: "Baisse acuité visuelle 2/10ème", rate: 25 },
          { name: "Baisse acuité visuelle 1/10ème", rate: 30 },
        ]
      },
      {
        name: "Cataracte et Aphakie",
        injuries: [
          { 
            name: "Aphakie unilatérale avec correction optique",
            rate: 15,
            description: "Absence de cristallin après chirurgie cataracte, corrigée par lunettes/lentilles.",
            clinicalTip: "IPP de base 15% + baisse acuité résiduelle. Vérifier : acuité corrigée, tolérance correction, anisométropie. Prévoir révision si implant ultérieur."
          },
          { 
            name: "Aphakie bilatérale",
            rate: 35,
            description: "Absence de cristallin aux deux yeux.",
            clinicalTip: "IPP de base 35% + baisse acuité résiduelle (max 100%). Tolérance correction bilatérale généralement meilleure."
          },
          { 
            name: "Cataracte post-traumatique opérée avec implant, bon résultat",
            rate: [0, 5],
            description: "Chirurgie avec mise en place implant intraoculaire, récupération visuelle satisfaisante.",
            rateCriteria: {
              low: "Acuité 10/10ème, absence complications",
              high: "Acuité 7-9/10ème ou complications mineures"
            }
          },
          { 
            name: "Cataracte post-traumatique opérée, résultat moyen",
            rate: [10, 20],
            description: "Récupération visuelle partielle malgré chirurgie.",
            clinicalTip: "Selon acuité finale corrigée. Complications : opacification capsulaire postérieure, œdème maculaire cystoïde."
          },
        ]
      },
      {
        name: "Ptosis (Chute Paupière)",
        injuries: [
          { 
            name: "Ptosis unilatéral léger",
            rate: [5, 10],
            description: "Chute paupière supérieure couvrant moins de 1/3 de la pupille.",
            rateCriteria: {
              low: "Ptosis 1-2mm, gêne esthétique minime",
              high: "Ptosis 2-3mm, gêne esthétique modérée"
            }
          },
          { 
            name: "Ptosis unilatéral modéré à sévère",
            rate: [15, 25],
            description: "Chute paupière couvrant plus de 1/3 de la pupille.",
            rateCriteria: {
              low: "Pupille partiellement couverte, acuité préservée",
              high: "Pupille totalement couverte, gêne visuelle majeure"
            },
            clinicalTip: "Mesurer : distance marge pupillaire-pupille (normale 4mm), levée paupière (normale 15mm). Rechercher diplopie, torticolis compensateur. Chirurgie correctrice possible."
          },
          { 
            name: "Ptosis bilatéral",
            rate: [20, 70],
            description: "Chute des deux paupières supérieures.",
            rateCriteria: {
              low: "Ptosis bilatéral léger, champ visuel conservé",
              high: "Ptosis bilatéral complet, gêne visuelle majeure, torticolis"
            },
            clinicalTip: "Retentissement fonctionnel majeur : torticolis compensateur, fatigue musculaire, limitation activités. Chirurgie souvent nécessaire."
          },
        ]
      },
      {
        name: "Diplopie (Vision Double)",
        injuries: [
          { 
            name: "Diplopie permanente et définitive",
            rate: [5, 20],
            description: "Vision double persistante après délai de récupération (6-12 mois).",
            rateCriteria: {
              low: "Diplopie en position extrême du regard uniquement",
              high: "Diplopie dans toutes positions, gêne majeure permanente"
            },
            clinicalTip: "Vérifier : test de Lancaster, test Hess, champ de diplopie. Délai consolidation 12 mois minimum. Contre-indication conduite si diplopie centrale. Prismes correcteurs possibles."
          },
          { 
            name: "Diplopie dans partie inférieure du champ visuel",
            rate: [10, 25],
            description: "Vision double en vision vers le bas (lecture, marche, escaliers).",
            rateCriteria: {
              low: "Diplopie uniquement en forte convergence (lecture)",
              high: "Diplopie dès regard vers le bas, gêne locomotion"
            },
            clinicalTip: "Particulièrement invalidante : lecture impossible, risque chutes escaliers. Souvent associée à paralysie nerf trochléaire (IV). Tortitcolis compensateur fréquent (tête penchée)."
          },
          { 
            name: "Diplopie épisodique variable",
            rate: [2, 10],
            description: "Vision double intermittente, survenant en situations spécifiques.",
            rateCriteria: {
              low: "Diplopie rare, fatigue visuelle uniquement",
              high: "Diplopie fréquente, gêne quotidienne"
            }
          },
        ]
      },
      {
        name: "Lésions Rétiniennes",
        injuries: [
          { 
            name: "Décollement de rétine opéré, bon résultat",
            rate: [10, 20],
            description: "Rétine reappliquée chirurgicalement, récupération visuelle satisfaisante.",
            rateCriteria: {
              low: "Acuité > 7/10ème, macula non touchée",
              high: "Acuité 4-7/10ème, légère atteinte maculaire"
            }
          },
          { 
            name: "Décollement de rétine opéré, résultat moyen",
            rate: [25, 35],
            description: "Rétine reappliquée mais récupération visuelle partielle.",
            rateCriteria: {
              low: "Acuité 2-4/10ème, macula cicatricielle",
              high: "Acuité < 2/10ème, macula sévèrement atteinte"
            },
            clinicalTip: "Facteurs pronostic : délai chirurgie, atteinte macula, décollement ancien. Complications : cataracte secondaire, membrane épirétinienne, prolifération vitréo-rétinienne."
          },
          { 
            name: "Dégénérescence maculaire post-traumatique",
            rate: [20, 40],
            description: "Atteinte de la macula (zone vision centrale) après traumatisme.",
            clinicalTip: "Selon acuité finale. Scotome central invalidant pour lecture, reconnaissance visages. Rééducation basse vision possible."
          },
        ]
      },
      {
        name: "Glaucome et Hypertonie Oculaire",
        injuries: [
          { 
            name: "Glaucome post-traumatique contrôlé",
            rate: [15, 25],
            description: "Hypertonie oculaire nécessitant traitement au long cours, champ visuel préservé.",
            rateCriteria: {
              low: "Contrôle collyres simples, champ visuel normal",
              high: "Contrôle difficile, début altération champ visuel"
            },
            clinicalTip: "Surveillance à vie nécessaire. Mesure tension oculaire, champ visuel, OCT nerf optique. Risque évolution vers cécité si non traité."
          },
          { 
            name: "Glaucome post-traumatique avec atteinte champ visuel",
            rate: [30, 40],
            description: "Glaucome ayant entraîné lésions du nerf optique et rétrécissement champ visuel.",
            rateCriteria: {
              low: "Atteinte champ visuel périphérique uniquement",
              high: "Atteinte sévère, vision tubulaire"
            },
            clinicalTip: "Cotation selon acuité + rétrécissement champ. Retentissement locomotion, conduite interdite si champ < 120°."
          },
        ]
      },
      {
        name: "Autres Séquelles Oculaires",
        injuries: [
          { 
            name: "Strabisme post-traumatique",
            rate: [5, 15],
            description: "Déviation oculaire permanente après paralysie oculomotrice.",
            rateCriteria: {
              low: "Strabisme léger, pas de diplopie (suppression)",
              high: "Strabisme important, diplopie, préjudice esthétique"
            }
          },
          { 
            name: "Larmoiement chronique post-traumatique",
            rate: [3, 10],
            description: "Épiphora permanent par lésion voies lacrymales.",
            clinicalTip: "Selon intensité et retentissement. Test de perméabilité voies lacrymales. Chirurgie possible (dacryocystorhinostomie)."
          },
          { 
            name: "Anophtalmie (cavité orbitaire vide)",
            rate: [30, 35],
            description: "Absence congénitale ou acquise du globe oculaire sans appareillage.",
            clinicalTip: "Majoration si impossible port prothèse (infections, rétraction orbite). Retentissement psychologique majeur."
          },
        ]
      }
    ]
  }
];
```

**Après création:**
- [ ] Importer dans `data/index.ts`
- [ ] Ajouter à l'export global
- [ ] Tester dans l'application

---

#### ✅ Tâche 2: Créer affectionsORL.ts

**Localisation:** `data/affectionsORL.ts`

**Contenu à créer:**

```typescript
import { InjuryCategory } from '../types';

export const affectionsORL: InjuryCategory[] = [
  {
    name: "Affections ORL et Audition",
    subcategories: [
      {
        name: "Surdité Unilatérale",
        injuries: [
          { 
            name: "Surdité unilatérale faible (perte 20-40 dB)",
            rate: [0, 3],
            description: "Hypoacousie légère sur une oreille, compréhension conservée.",
            clinicalTip: "Audiométrie tonale + vocale obligatoire. Perte < 40 dB : gêne discrète. Localisation sonore perturbée. Difficulté en milieu bruyant."
          },
          { 
            name: "Surdité unilatérale moyenne (perte 40-70 dB)",
            rate: [10, 15],
            description: "Hypoacousie modérée, nécessitant élévation de la voix.",
            rateCriteria: {
              low: "Perte 40-55 dB, compréhension vocale 50-70%",
              high: "Perte 55-70 dB, compréhension vocale 30-50%"
            },
            clinicalTip: "Audiométrie obligatoire consolidée (6-12 mois post-trauma). Appareillage rarement utile si oreille contro-latérale normale."
          },
          { 
            name: "Surdité unilatérale sévère à absolue (perte > 70 dB)",
            rate: 20,
            description: "Surdité profonde ou totale d'une oreille, oreille contro-latérale normale.",
            clinicalTip: "Cophose unilatérale. Oreille contro-latérale à protéger impérativement. Retentissement : absence localisation spatiale sons, compréhension difficile milieu bruyant. Implant cochléaire rarement indiqué."
          },
        ]
      },
      {
        name: "Surdité Bilatérale",
        injuries: [
          { 
            name: "Surdité bilatérale faible (perte 20-40 dB)",
            rate: [5, 20],
            description: "Hypoacousie légère bilatérale.",
            rateCriteria: {
              low: "Perte 20-30 dB bilatérale symétrique",
              high: "Perte 30-40 dB bilatérale, gêne conversationnelle"
            },
            clinicalTip: "Appareillage bilatéral recommandé si perte > 30 dB et gêne sociale. Améliore localisation spatiale et compréhension en bruit."
          },
          { 
            name: "Surdité bilatérale moyenne (perte 40-70 dB)",
            rate: [25, 35],
            description: "Hypoacousie modérée bilatérale nécessitant appareillage.",
            rateCriteria: {
              low: "Perte 40-55 dB, bon gain prothétique",
              high: "Perte 55-70 dB, gain prothétique modéré"
            },
            clinicalTip: "Appareillage bilatéral indispensable. Rééducation orthophonique. Retentissement social et professionnel important. Aides techniques (amplificateur téléphone, flash lumineux)."
          },
          { 
            name: "Surdité bilatérale forte (perte 70-90 dB)",
            rate: [40, 50],
            description: "Surdité sévère bilatérale, communication très difficile.",
            rateCriteria: {
              low: "Perte 70-80 dB, appareillage efficace",
              high: "Perte 80-90 dB, gain prothétique limité"
            },
            clinicalTip: "Surdité profonde. Communication nécessite lecture labiale, langue des signes. Implant cochléaire à discuter. Reconversion professionnelle souvent nécessaire."
          },
          { 
            name: "Surdité bilatérale absolue (cophose)",
            rate: 70,
            description: "Surdité totale bilatérale, absence complète perception auditive.",
            clinicalTip: "Cophose définitive. Implant cochléaire bilatéral parfois possible selon étiologie. Apprentissage langue des signes. Aides visuelles (sous-titres, flash lumineux). Retentissement psychosocial majeur."
          },
        ]
      },
      {
        name: "Acouphènes et Bourdonnements",
        injuries: [
          { 
            name: "Bourdonnements d'oreille unilatéraux intermittents",
            rate: [2, 5],
            description: "Acouphènes occasionnels d'une oreille, supportables.",
            clinicalTip: "Acouphènes subjectifs. Aucun examen ne peut les objectiver. Crédibilité repose sur cohérence clinique et contexte traumatique. Généralement amélioration spontanée dans 2-3 ans."
          },
          { 
            name: "Bourdonnements d'oreille unilatéraux permanents",
            rate: [5, 8],
            description: "Acouphènes continus d'une oreille, gêne modérée.",
            rateCriteria: {
              low: "Acouphènes perceptibles mais non invalidants",
              high: "Acouphènes gênants, troubles du sommeil"
            }
          },
          { 
            name: "Bourdonnements d'oreille bilatéraux",
            rate: [5, 15],
            description: "Acouphènes des deux oreilles.",
            rateCriteria: {
              low: "Acouphènes intermittents ou discrets",
              high: "Acouphènes continus, retentissement psychologique"
            },
            clinicalTip: "Associés souvent à hyperacousie (intolérance sons). Traitement : TRT (Tinnitus Retraining Therapy), thérapie cognitivo-comportementale, masqueurs sonores."
          },
          { 
            name: "Acouphènes invalidants avec retentissement psychologique",
            rate: [10, 25],
            description: "Acouphènes sévères, dépression, troubles du sommeil.",
            rateCriteria: {
              low: "Acouphènes sévères, insomnie, anxiété modérée",
              high: "Acouphènes très invalidants, dépression majeure, isolement social"
            },
            clinicalTip: "Questionnaire THI (Tinnitus Handicap Inventory) pour objectiver handicap. Suivi psychologique nécessaire. Arrêt travail parfois prolongé. IPP élevé justifié si retentissement majeur qualité de vie."
          },
        ]
      },
      {
        name: "Vertiges et Troubles de l'Équilibre",
        injuries: [
          { 
            name: "Vertiges labyrinthiques occasionnels",
            rate: [5, 15],
            description: "Crises vertigineuses intermittentes d'origine vestibulaire.",
            rateCriteria: {
              low: "Crises rares (< 1/mois), brèves, sans chute",
              high: "Crises fréquentes (> 4/mois), prolongées, risque chute"
            },
            clinicalTip: "Examens : VNG (vidéonystagmographie), vidéo Head Impulse Test, épreuves caloriques. Distinguer vertige périphérique (vestibulaire) vs central (neurologique). Contre-indication travaux en hauteur."
          },
          { 
            name: "Vertiges labyrinthiques fréquents invalidants",
            rate: [20, 40],
            description: "Crises vertigineuses fréquentes et sévères, retentissement majeur.",
            rateCriteria: {
              low: "Crises hebdomadaires, autonomie conservée",
              high: "Crises quotidiennes, alitement, incapacité locomotion"
            },
            clinicalTip: "Syndrome vestibulaire déficitaire permanent. Instabilité chronique. Oscillopsies (vision trouble lors mouvements tête). Rééducation vestibulaire indispensable. Reconversion professionnelle souvent nécessaire."
          },
          { 
            name: "Syndrome de Ménière post-traumatique",
            rate: [20, 40],
            description: "Triade: vertiges, acouphènes, surdité fluctuante.",
            clinicalTip: "Crises imprévisibles très invalidantes. Nausées/vomissements. Évolution par poussées. Traitement médical puis chirurgical si échec. IPP élevé justifié car handicap social majeur."
          },
        ]
      },
      {
        name: "Lésions Tympaniques et ORL",
        injuries: [
          { 
            name: "Perforation tympanique simple non infectée",
            rate: [5, 10],
            description: "Perte de substance tympanique, sans infection chronique.",
            rateCriteria: {
              low: "Perforation < 25% surface tympan, audition préservée",
              high: "Perforation > 50%, hypoacousie 20-30 dB"
            },
            clinicalTip: "Protection eau obligatoire (baignade, douche). Risque otite chronique. Myringoplastie possible. Audiométrie pour quantifier perte auditive associée."
          },
          { 
            name: "Perforation tympanique avec otorrhée chronique",
            rate: [10, 15],
            description: "Perforation avec infection chronique et écoulements.",
            clinicalTip: "Otite chronique muqueuse. Soins locaux réguliers. Chirurgie (tympanoplastie) nécessaire. Risque : cholestéatome (IPP majoré si présent)."
          },
          { 
            name: "Ablation totale du pavillon de l'oreille",
            rate: [10, 20],
            description: "Perte du pavillon auriculaire, préjudice esthétique et fonctionnel.",
            rateCriteria: {
              low: "Prothèse auriculaire bien tolérée",
              high: "Impossibilité prothèse, préjudice esthétique majeur"
            },
            clinicalTip: "Perte effet amplificateur du pavillon (-10 dB). Impossibilité port lunettes/masque. Prothèse auriculaire sur implant osseux possible. Préjudice esthétique important à quantifier."
          },
          { 
            name: "Paralysie faciale périphérique définitive",
            rate: [20, 30],
            description: "Paralysie du nerf facial post-traumatique, séquelles permanentes.",
            clinicalTip: "Voir barème Nerfs Crâniens. Complications ORL : larmoiement (œil), paralysie hémiface, asymétrie sourire, trouble élocution."
          },
        ]
      }
    ]
  }
];
```

**Après création:**
- [ ] Importer dans `data/index.ts`
- [ ] Ajouter à l'export global
- [ ] Tester dans l'application

---

#### ✅ Tâche 3-5: Corriger algerianBareme1967.ts (Épaule)

**Localisation:** `data/algerianBareme1967.ts`  
**Section:** Membres Supérieurs > Épaule

**Modifications à effectuer:**

```typescript
// MODIFICATION 1: Pseudarthrose MD
// 🔴 Ligne ~XXX (chercher "Pseudarthrose")
// AVANT:
{ 
  name: "Pseudarthrose épaule ballante (Main Dominante)",
  rate: [60, 70],
  description: "..."
}

// APRÈS:
{ 
  name: "Pseudarthrose épaule ballante (Main Dominante)",
  rate: 60,
  description: "Épaule ballante par résection large ou perte substance osseuse étendue."
}

// MODIFICATION 2: Pseudarthrose MND
// AVANT:
{ 
  name: "Pseudarthrose épaule ballante (Main Non Dominante)",
  rate: [45, 60],
  description: "..."
}

// APRÈS:
{ 
  name: "Pseudarthrose épaule ballante (Main Non Dominante)",
  rate: 50,
  description: "Épaule ballante par résection large ou perte substance osseuse étendue."
}

// MODIFICATION 3: Cicatrices aisselle - Abd <10° MD
// AVANT:
{ 
  name: "Cicatrices aisselle limitant abduction <10° (MD)",
  rate: [30, 40],
  description: "..."
}

// APRÈS:
{ 
  name: "Cicatrices aisselle limitant abduction <10° (MD)",
  rate: [40, 50],
  description: "Bras pratiquement collé au corps, abduction inférieure à 10°.",
  rateCriteria: {
    low: "Abduction 5-10°, compensation partielle possible",
    high: "Abduction < 5°, impotence majeure"
  }
}

// MODIFICATION 4: Cicatrices aisselle - Abd <10° MND
// AVANT:
{ 
  name: "Cicatrices aisselle limitant abduction <10° (MND)",
  rate: [25, 30],
  description: "..."
}

// APRÈS:
{ 
  name: "Cicatrices aisselle limitant abduction <10° (MND)",
  rate: [32, 35],
  description: "Bras pratiquement collé au corps, abduction inférieure à 10°.",
  rateCriteria: {
    low: "Abduction 5-10°",
    high: "Abduction < 5°"
  }
}

// MODIFICATION 5: Cicatrices aisselle - Abd 45° MD
// AVANT:
{ 
  name: "Cicatrices aisselle limitant abduction à 45° (MD)",
  rate: [20, 30],
  description: "..."
}

// APRÈS:
{ 
  name: "Cicatrices aisselle limitant abduction à 45° (MD)",
  rate: [25, 30],
  description: "Abduction limitée, bras s'arrêtant à 45°.",
  rateCriteria: {
    low: "Abduction 40-45°, rotation conservée",
    high: "Abduction 35-40° avec raideur rotation"
  }
}

// AJOUT: Luxation non-récidivante
// Ajouter APRÈS les luxations récidivantes:
{ 
  name: "Luxation épaule non-récidivante (guérison complète)",
  rate: 0,
  description: "Luxation traumatique de l'épaule consolidée sans séquelles. Mobilité complète récupérée, aucune instabilité résiduelle.",
  clinicalTip: "Référence médicale importante : une luxation guérie sans séquelle ne donne pas droit à IPP. Vérifier : amplitude articulaire normale, force musculaire conservée, absence appréhension test, absence récidive après 2 ans."
}
```

**Checklist après modification:**
- [ ] Rechercher toutes occurrences "Pseudarthrose épaule"
- [ ] Rechercher toutes occurrences "Cicatrices aisselle"
- [ ] Vérifier cohérence MD/MND
- [ ] Ajouter luxation non-récidivante
- [ ] Tester compilation TypeScript
- [ ] Vérifier dans interface utilisateur

---

### 🟠 PHASE 2: VÉRIFICATIONS (Semaine 2)

---

#### ✅ Tâche 6: Améliorer table LLI

**Localisation:** `data/algerianBareme1967.ts`  
**Section:** Membres Inférieurs > Raccourcissement

**Modification à effectuer:**

```typescript
// REMPLACER la section actuelle par:
{
  name: "Raccourcissement Membres Inférieurs (LLI)",
  injuries: [
    { 
      name: "Inégalité longueur membres < 2 cm",
      rate: [0, 5],
      description: "Raccourcissement inférieur à 2 cm, compensation naturelle.",
      rateCriteria: {
        low: "LLI < 1 cm, asymptomatique",
        high: "LLI 1-2 cm, boiterie discrète"
      },
      clinicalTip: "Mesure clinique + télémétrie (radiographie membres en charge). Compensation par semelle orthopédique. Asymptomatique dans la plupart des cas."
    },
    { 
      name: "Inégalité longueur membres 2-4 cm",
      rate: [5, 12],
      description: "Raccourcissement modéré nécessitant compensation orthopédique.",
      rateCriteria: {
        low: "LLI 2-3 cm, boiterie modérée, semelle efficace",
        high: "LLI 3-4 cm, boiterie nette, début bascule bassin"
      },
      clinicalTip: "Semelle orthopédique jusqu'à 3 cm. Au-delà, talonnette dans chaussure + semelle. Surveiller apparition scoliose compensatrice. Risque arthrose genou/hanche côté long."
    },
    { 
      name: "Inégalité longueur membres 4-6 cm",
      rate: [12, 20],
      description: "Raccourcissement important, retentissement rachis.",
      rateCriteria: {
        low: "LLI 4-5 cm, appareillage bien toléré",
        high: "LLI 5-6 cm, bascule bassin, scoliose débutante"
      },
      clinicalTip: "Orthèse de compensation complexe nécessaire. Bascule bassin importante. Risque scoliose secondaire. Surveillance rachis annuelle. Envisager allongement chirurgical chez enfant."
    },
    { 
      name: "Inégalité longueur membres > 6 cm",
      rate: [20, 35],
      description: "Raccourcissement majeur, boiterie sévère, scoliose.",
      rateCriteria: {
        low: "LLI 6-8 cm, appareillage possible",
        high: "LLI > 8 cm, appareillage difficile, scoliose fixée"
      },
      clinicalTip: "Boiterie de Trendelenburg. Orthoprothèse complexe. Scoliose compensatrice quasi-constante. Arthrose précoce hanche/genou. Allongement chirurgical à discuter. Reconversion professionnelle souvent nécessaire."
    },
    
    // CRITÈRES DE MAJORATION
    { 
      name: "LLI avec arthrose genou ou hanche associée",
      rate: "+5 à +15%",
      description: "Majoration IPP selon sévérité arthrose secondaire.",
      clinicalTip: "Arthrose côté long (surcharge) ou côté court (anomalie biomécanique). Radiographies comparatives. Quantifier douleur, limitation mobilité, IFM."
    },
    { 
      name: "LLI avec scoliose compensatrice",
      rate: "+5 à +10%",
      description: "Majoration IPP selon angulation scoliose.",
      rateCriteria: {
        low: "Scoliose < 20° Cobb, réductible",
        high: "Scoliose > 20° Cobb, fixée, lombalgies"
      },
      clinicalTip: "Radiographie rachis entier (EOS si disponible). Mesure angle Cobb. Scoliose réductible (disparaît en décubitus) vs fixée. Majoration si lombalgies chroniques associées."
    },
    { 
      name: "LLI avec boiterie de Trendelenburg",
      rate: "+3 à +8%",
      description: "Majoration si faiblesse moyen fessier, bascule bassin à la marche.",
      clinicalTip: "Test Trendelenburg positif : en appui monopodal, bascule bassin côté opposé. Signe d'insuffisance moyen fessier. Rééducation possible mais résultats limités."
    },
  ]
}
```

---

#### ✅ Tâche 7: Vérifier ankyloses cheville

**Localisation:** `data/algerianBareme1967.ts`  
**Section:** Membres Inférieurs > Cheville

**Action:**

1. **Lire la section actuelle**
2. **Comparer avec barème Word:**
   - Angle droit: Word 20-25% vs App 25-35%
   - Mauvaise pos: Word 35-50% vs App 40-60%

3. **Décision à prendre:**
   - **Option A:** Écart justifié par critères modernes → **Documenter justification** dans `clinicalTip`
   - **Option B:** Écart non justifié → **Corriger** selon barème Word

4. **Si Option B (correction):**

```typescript
// AVANT:
{ 
  name: "Ankylose cheville angle droit",
  rate: [25, 35],
  // ...
}
{ 
  name: "Ankylose cheville mauvaise position",
  rate: [40, 60],
  // ...
}

// APRÈS:
{ 
  name: "Ankylose cheville angle droit",
  rate: [20, 25],
  description: "Ankylose à 90°, position plantaire optimale.",
  rateCriteria: {
    low: "Position idéale 90°, marche satisfaisante",
    high: "Position acceptable mais rigidité gênante"
  }
}
{ 
  name: "Ankylose cheville mauvaise position",
  rate: [35, 50],
  description: "Ankylose en équin ou talus, position défavorable.",
  rateCriteria: {
    low: "Équin modéré, appareillage efficace",
    high: "Équin sévère, marche très perturbée"
  }
}
```

---

### 🟢 PHASE 3: TESTS ET VALIDATION (Semaine 2-3)

---

#### ✅ Tâche 8: Tests de compilation

```bash
# Vérifier compilation TypeScript
npm run build

# Vérifier erreurs ESLint
npm run lint

# Tests unitaires
npm test
```

---

#### ✅ Tâche 9: Tests fonctionnels

**Scénarios de test:**

1. **Test Vision:**
   - Rechercher "cécité" → Devrait trouver les nouvelles séquelles
   - Sélectionner "Cécité complète bilatérale" → IPP = 100%
   - Vérifier affichage description et conseils cliniques

2. **Test Audition:**
   - Rechercher "surdité" → Devrait trouver les nouvelles séquelles
   - Sélectionner "Surdité bilatérale absolue" → IPP = 70%
   - Vérifier table audiométrique complète

3. **Test Épaule:**
   - Rechercher "pseudarthrose épaule"
   - MD → IPP = 60% (fixe, plus de fourchette)
   - MND → IPP = 50% (fixe)
   - Rechercher "cicatrices aisselle <10°"
   - MD → IPP = 40-50% (corrigé de 30-40%)
   - Rechercher "luxation non-récidivante"
   - IPP = 0% avec explication

4. **Test LLI:**
   - Rechercher "raccourcissement 3 cm"
   - IPP = 6% → Vérifier présence critères majoration
   - Arthrose associée → Majoration possible

5. **Test Cheville:**
   - Rechercher "ankylose cheville angle droit"
   - Vérifier taux (selon décision Option A ou B)

---

## 📊 SUIVI D'AVANCEMENT

### Checklist Complète

#### Phase 1 (Urgent)
- [ ] Créer `affectionsOculaires.ts` (20 lésions)
- [ ] Créer `affectionsORL.ts` (15 lésions)
- [ ] Importer dans `data/index.ts`
- [ ] Corriger pseudarthrose MD (60%)
- [ ] Corriger pseudarthrose MND (50%)
- [ ] Corriger cicatrices aisselle <10° MD (40-50%)
- [ ] Corriger cicatrices aisselle <10° MND (32-35%)
- [ ] Corriger cicatrices aisselle 45° MD (25-30%)
- [ ] Ajouter luxation non-récidivante (0%)

#### Phase 2 (Important)
- [ ] Améliorer table LLI complète
- [ ] Ajouter critères majoration LLI
- [ ] Décider Option A ou B pour cheville
- [ ] Appliquer correction cheville si nécessaire
- [ ] Documenter justifications

#### Phase 3 (Validation)
- [ ] Tests compilation
- [ ] Tests ESLint
- [ ] Tests unitaires
- [ ] Tests fonctionnels vision
- [ ] Tests fonctionnels audition
- [ ] Tests fonctionnels épaule
- [ ] Tests fonctionnels LLI
- [ ] Tests fonctionnels cheville
- [ ] Validation utilisateur final

---

## 🎯 CRITÈRES DE RÉUSSITE

### Objectifs mesurables

1. ✅ **Taux conformité 100%** (actuellement 96%)
2. ✅ **0 écart critique** avec barème Word
3. ✅ **35 séquelles critiques ajoutées** (vision + audition)
4. ✅ **7 corrections IPP effectuées**
5. ✅ **0 régression** sur séquelles existantes
6. ✅ **Tests 100% passants**

---

## 📝 NOTES IMPORTANTES

### Points d'attention

1. **Cohérence MD/MND:** Toujours vérifier les deux mains
2. **Ratios habituels:** MND ≈ 0.8 × MD (80%)
3. **Images médicales:** Ajouter si disponibles (`imageUrl`)
4. **Conseils cliniques:** Essentiels pour aide décision (`clinicalTip`)
5. **Fourchettes vs fixes:** Barème Word utilise les deux selon contexte

### Ressources

- **Barème officiel:** `BAREME AT.docx`, `IPP.docx`
- **Rapport complet:** `RAPPORT_COMPARAISON_BAREME_WORD_VS_APPLICATION.md`
- **Données brutes:** `DONNEES_BRUTES_COMPARAISON.json`
- **Résumé:** `RESUME_EXECUTIF_COMPARAISON.md`

---

**Document de travail** - Mise à jour au fur et à mesure de l'avancement  
**Dernière modification:** 1er janvier 2026
