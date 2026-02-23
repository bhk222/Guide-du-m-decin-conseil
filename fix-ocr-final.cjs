const fs = require('fs');

const data = JSON.parse(fs.readFileSync('public/nomenclature-complete.json', 'utf8'));

// Comprehensive manual corrections for all 76 remaining issues
// Based on medical terminology knowledge and PDF context
const finalFixes = {
  // Chirurgie - orbite, ORL, maxillo-faciale
  '0294': "Traitement de gros délabrement post-traumatique récent de la région orbitaire intéressant paupière, globe, os",
  '0352': "Traitement de la fissure anale par injections sclérosantes (maximum 3 à 5 séances), par séance non compris anesthésie",
  '0353': "Prise d'un seuil tonal liminaire et éventuellement supraliminaire quelle que soit la technique utilisée, classique, automatique ou les deux simultanément",
  '0356': "Audiométrie tonale liminaire avec étude de l'impédance acoustique et supraliminaire avec étude de la sensation suivant l'axe du temps par audiométrie classique ou automatique quel que soit le nombre de tests effectués",
  '0419': "Correction de dépression traumatique ou congénitale de la face n'intéressant pas l'orbite, la greffe osseuse, cutanéo-muqueuse, dermo-graisseuse ou par matériau inerte (prélèvement de greffon osseux non compris)",
  '0425': "Retouche de bec de lièvre ou de division vélopalatine, six mois au moins après l'opération principale",
  '0434': "Amygdalectomie isolée chez l'enfant",
  '0454': "Résection linguale partielle pour tumeur maligne de la partie mobile de la langue",
  
  // Dentaire / Prothèse
  '0535/16': "Prothèse totale sur crête fortement résorbée, supplément par maxillaire",
  '0549': "Remplacement de facette ou dent à tube",
  
  // ORL / Pharynx
  '0582': "Pharyngolaryngectomie avec curage ganglionnaire",
  '0586/1': "Troubles d'articulation isolés chez les sujets ne présentant pas d'affection neurologique, par séance",
  
  // Rachis
  '0599': "Réduction d'une scoliose par manoeuvre orthopédique (appareil plâtré compris), chaque séance",
  
  // Main
  '0628': "Traitement chirurgical d'un phlegmon d'une ou plusieurs gaines digito-carpiennes",
  '0642': "Amputation ou désarticulation d'une phalange ou d'un doigt",
  
  // Thorax
  '0659': "Résection totale ou partielle de la première côte",
  '0667': "Exercice de 15 minutes ou plus, à puissance constante et croissante, avec période témoin de 5 minutes avant la période de récupération de 5 minutes, avec enregistrement de la ventilation, de la consommation d'oxygène et du rejet de CO2 pendant l'épreuve",
  '0673/2': "2° Par pléthysmographie de la ventilation pulmonaire y compris mesure des volumes, des débits, de la capacité résiduelle fonctionnelle et de la résistance des voies aériennes y compris éventuellement la spirographie complète",
  '0690': "Ablation d'un ou plusieurs lobes ou de plusieurs segments dans des lobes différents",
  '0702': "Extraction d'un corps étranger oesophagien ou bronchique chez l'enfant de moins de trois ans",
  '0704': "Résection de l'innervation pulmonaire, cardiaque ou périvasculaire",
  '0709': "Chirurgie des lésions de l'oesophage thoracique sans suppression de la continuité",
  '0710': "Résection segmentaire ou totale de l'oesophage avec rétablissement immédiat de la continuité, oesophagoplastie intra ou extra-thoracique en un ou plusieurs temps",
  
  // Cardiologie
  '0720': "Électrocardiogramme et mesure des pressions intra-cardiaques ou intra-vasculaires pratiqués au cours d'une intervention",
  '0752/5': "Supplément pour renforcement de l'équipe chirurgicale par un second chirurgien",
  
  // Urologie / Dialyse
  '0764': "Lipectomie antérieure",
  '0769/2': "Surveillance d'une séance de dialyse péritonéale périodique par un médecin présent en permanence, y compris les interventions pour incidents ou accidents éventuels",
  '0782': "Aspiration continue et rééquilibration hydro-électrolytique concomitante pour occlusion intestinale suivie ou non d'intervention, par jour",
  '0787': "Intervention itérative sur l'estomac comportant la gastro-entérostomie plus gastrectomie avec ou sans vagotomie",
  '0810': "Anastomose bilio-digestive sur la voie biliaire principale par l'intermédiaire d'une anse grêle",
  '0812': "Chirurgie transduodénale de la papille et de l'ampoule de Vater",
  '0846': "Traitement des abcès et fistules extrasphintériens à trajet multiramifié (opératoire ou par traction continue sur fil)",
  '0866': "Cystométrie sous perfusion avec enregistrement graphique, enregistrement des courbes de pression dans le haut appareil avec protocole et tracés",
  '0868': "Surveillance d'une séance d'hémodialyse, par un médecin présent en permanence, y compris les interventions pour incidents ou accidents éventuels",
  '0872': "Mise en place de deux canules pour fistule artério-veineuse, repose d'une ou deux canules",
  '0893': "Urétérorraphie termino-terminale, cure d'une fistule cutanée de l'uretère",
  
  // Gynécologie
  '0956': "Traitement des affections, anomalies ou tumeurs bénignes du vagin, de l'utérus ou du cul-de-sac de Douglas, intervention intra-utérine diagnostique ou thérapeutique, un ou plusieurs de ces actes dans la même séance",
  '0969': "Stérilisation tubaire par électrocoagulation coelioscopique",
  '0991': "Accouchement gémellaire comportant les visites normales consécutives à l'accouchement (surveillance de la mère et des enfants)",
  '0998': "Surveillance de l'accouchement avec monitorage d'au moins deux heures, comportant la surveillance cardiotocographique du travail avec tracés et prélèvements pour mesure du pH foetal quel qu'en soit le nombre",
  
  // Orthopédie
  '1026': "Réduction chirurgicale de luxation congénitale de hanche avec ou sans creusement du cotyle",
  
  // Psychiatrie / Psychologie
  '1114': "Test P.M.K. (psycho-myo-kinétique) de Myra y Lopez",
  
  // Rééducation
  '1138': "Rééducation de la paroi abdominale après accouchement ou intervention chirurgicale (10 séances maximum), durée 30 minutes, par séance",
  '1143': "Rééducation élaborée de déambulation impossible",
  '1151': "Drainage des bronches, avec ou sans massage local thérapeutique, massage et mobilisation de l'épaule, par séance (durée 45 minutes)",
  '1156': "Traitement de premier recours de cas nécessitant des actes avec la présence prolongée du médecin (en dehors du cabinet du médecin ou d'un établissement de soins)",
  '1165/1': "1° Courants galvaniques, faradiques, ou excito-moteurs, ultrasons, diathermie, ondes courtes en application de surface, par séance d'une durée de 20 minutes comportant la mise en place d'électrodes fixes de surface au niveau de la peau",
  '1191': "Séance de soins infirmiers (hygiène, surveillance, observation et prévention), à raison de quatre exercices au maximum dans la journée, par séance d'une demi-heure",
  
  // Radiologie
  '1201': "Incidences spéciales, profil chirurgical de la hanche, faux profil du col, mesure de l'antéversion, cliché de recentrage, par incidence",
  '1208': "Radiographie panoramique de la totalité du système maxillaire et du système dentaire sur un ou plusieurs films",
  '1253': "Tomographie classique: os, larynx, poumons",
  '1276': "La mise en oeuvre de la curiethérapie impose l'établissement d'un protocole de traitement comprenant le résumé clinique, le diagnostic histologique ou à défaut les bases de l'indication thérapeutique, la description des volumes à traiter, la prévision dosimétrique et le compte rendu de fin d'irradiation",
  '1277': "Contrôle de la pose des vecteurs non radio-actifs ou de la mise en place des applicateurs ou moules avec sources",
  '1286': "Transit de la même substance dans deux organes au plus, par organe supplémentaire",
  
  // Anatomo-pathologie
  '1306': "Diagnostic histopathologique par inclusion et coupe de prélèvements biopsiques (unique ou multiples), quel que soit le nombre de fragments",
  '1310': "Diagnostic histopathologique par inclusion et coupe d'une pièce opératoire complexe comportant plusieurs organes (une chaîne ganglionnaire est assimilée à un organe)",
  '1313': "Examens sur coupes histologiques à l'aide d'immunosérums, quel que soit le nombre de réactions",
  '1314': "Pratique d'examen extemporané sur un ou plusieurs organes et contrôle histopathologique ultérieur par inclusion et coupe de prélèvements examinés extemporanément",
  
  // Biochimie
  '1325': "Étude de l'aspect du sérum à 4°C après 24h",
  '1356': "Protéinogramme (électrophorèse) avec détermination des pourcentages",
  
  // Hématologie
  '1473': "Examen cytologique simple du sang (hémogramme classique): numération des globules rouges et blancs, formule leucocytaire, aspect des globules rouges, étude des plaquettes sur lame, dosage de l'hémoglobine à l'électrophotomètre ou spectrophotométrie, hématocrite, valeur globulaire ou constantes érythrocytaires",
  '1475': "Évaluation cytochimique de la phosphatase alcaline des leucocytes",
  '1479': "Taux des hématies granulo-filamenteuses (réticulocytes)",
  '1483': "Recherche des corps de Heinz",
  '1484': "Numération en cellule après hémolyse et étude morphologique des plaquettes",
  '1508': "Recherche de fibrinolyse par l'épreuve de lyse des euglobulines et recherche de l'activateur du plasminogène en utilisant comme substrat des euglobulines témoins",
  
  // Immuno-hématologie
  '1527': "Détermination des autres antigènes érythrocytaires tels que Kidd, Duffy, S, s, Lewis sur prescription médicale explicite, dans le cadre de la prévention des accidents d'allo-immunisation définis par voie réglementaire, chaque antigène",
  '1531': "Épreuve directe de compatibilité par au moins deux méthodes susceptibles de dépister les anticorps incomplets pour chaque unité de sang ou de dérivés cellulaires délivrés au malade",
  
  // Auto-generated codes with garbled text
  'AUTO-56': "Des parties molles",
  'AUTO-376': "Cavité simple",
  'AUTO-613': "Lombotomie exploratrice",
  'B100-878': "Biopsiques (unique ou multiples), quel que soit le nombre de fragments",
  'B20-889': "Liquide biologique (autre que les urines)",
  'B30-893': "Acide lactique",
  'AUTO-907': "Dosage des protéines totales avec document et compte rendu",
  'B30-1005': "Recherche qualitative",
};

let fixedCount = 0;
for (const acte of data.actes) {
  if (finalFixes[acte.code]) {
    if (acte.libelle !== finalFixes[acte.code]) {
      console.log(`FIX ${acte.code}`);
      acte.libelle = finalFixes[acte.code];
      fixedCount++;
    }
  }
}

console.log(`\nApplied: ${fixedCount} manual fixes`);

// Final auto-clean pass
let autoFixed = 0;
for (const acte of data.actes) {
  let lib = acte.libelle;
  const orig = lib;
  
  // ! that's clearly OCR for 'l' or other chars
  lib = lib.replace(/!e\b/g, 'le');
  lib = lib.replace(/!a\b/g, 'la');
  lib = lib.replace(/!i/g, 'li');
  lib = lib.replace(/!u/g, 'lu');
  lib = lib.replace(/!o/g, 'lo');
  lib = lib.replace(/!\b/g, '');
  
  // Remove ￾
  lib = lib.replace(/￾/g, '');
  
  // Clean up
  lib = lib.replace(/\s{2,}/g, ' ').trim();
  lib = lib.replace(/[,;:.!\s]+$/, '').trim();
  
  if (lib !== orig && lib.length >= 3) {
    acte.libelle = lib;
    autoFixed++;
  }
}

console.log(`Auto-cleaned (final): ${autoFixed}`);

// Verify remaining
let remaining = 0;
const issues = [];
for (const a of data.actes) {
  const lib = a.libelle || '';
  if (/[•·~ΓÇó∩┐╛￾]/.test(lib) || /\.{3,}/.test(lib) || /\s{2,}/.test(lib) || /[!]/.test(lib)) {
    remaining++;
    if (remaining <= 15) issues.push(`${a.code}: ${lib.substring(0, 80)}`);
  }
}
console.log(`\nRemaining issues: ${remaining}`);
issues.forEach(i => console.log('  ' + i));

fs.writeFileSync('public/nomenclature-complete.json', JSON.stringify(data, null, 2), 'utf8');
console.log('\nSaved.');
