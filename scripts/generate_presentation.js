// scripts/generate_presentation.js
// Génère une présentation PowerPoint professionnelle pour le jury
import fs from 'fs';
import path from 'path';
import PptxGenJS from 'pptxgenjs';

const ROOT = path.resolve(process.cwd());
const ICON_PATHS = [
  path.join(ROOT, 'public', 'icons', 'icon-512x512.png'),
  path.join(ROOT, 'public', 'icons', 'icon-192x192.png'),
  path.join(ROOT, 'public', 'icons', 'cnas-logo.svg'),
];

function findFirstExisting(paths) {
  for (const p of paths) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

const LOGO = findFirstExisting(ICON_PATHS);

const THEME = {
  bg: 'FFFFFF',
  primary: '0F766E', // teal-700
  secondary: '2563EB', // blue-600
  accent: 'F59E0B', // amber-500
  text: '0F172A', // slate-900
  muted: '475569', // slate-600
};

const pptx = new PptxGenJS();
pptx.author = 'CNAS';
pptx.company = 'CNAS';
pptx.subject = "Guide du Médecin Conseil – PWA";
pptx.title = 'Présentation Produit & Technique';

// Helper: add header logo and footer
function decorateSlide(slide, title = '') {
  if (LOGO) {
    slide.addImage({ path: LOGO, x: 0.2, y: 0.2, w: 0.7, h: 0.7 });
  }
  if (title) {
    slide.addText(title, {
      x: 1.1, y: 0.2, w: 11, h: 0.6,
      fontSize: 20, bold: true, color: THEME.primary,
    });
  }
  // footer
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 6.9, w: 13.33, h: 0.5, fill: THEME.primary,
  });
  slide.addText('Guide du Médecin Conseil · PWA Offline · CNAS', {
    x: 0.3, y: 6.92, w: 12.7, h: 0.4,
    fontSize: 12, color: 'FFFFFF', align: 'left'
  });
}

// Slide 1 — Titre
{
  const slide = pptx.addSlide();
  slide.background = { color: THEME.bg };
  if (LOGO) slide.addImage({ path: LOGO, x: 10.6, y: 0.6, w: 2.2, h: 2.2 });
  slide.addText('Guide du Médecin Conseil', {
    x: 0.8, y: 1.4, w: 9.5, h: 1,
    fontSize: 42, bold: true, color: THEME.text
  });
  slide.addText('Application PWA – Calcul IPP, Guides & Outils, 100% hors ligne', {
    x: 0.8, y: 2.3, w: 9.8, h: 0.8,
    fontSize: 20, color: THEME.muted
  });
  slide.addText('Audience: Médecins Conseil · Informaticiens', {
    x: 0.8, y: 3.0, w: 9.8, h: 0.6,
    fontSize: 16, color: THEME.secondary
  });
  slide.addText('Démo live: https://guide-medecin-conseil…vercel.app', {
    x: 0.8, y: 3.6, w: 9.8, h: 0.6,
    fontSize: 14, color: THEME.accent
  });
  slide.addNotes('Intro : Problématique CNAS, besoin terrain, application installable et hors ligne.');
}

// Slide 2 — Problématique & Objectifs
{
  const slide = pptx.addSlide();
  decorateSlide(slide, 'Problématique & Objectifs');
  slide.addText([
    { text: 'Problématique terrain', options: { fontSize: 22, bold: true, color: THEME.text } },
  ], { x: 0.8, y: 1.0, w: 6.2, h: 0.6 });
  slide.addText(
    [
      '• Accès aux barèmes et référentiels parfois difficile sur le terrain',
      '• Connexion Internet intermittente ou absente',
      "• Besoin d'un calcul IPP rigoureux et traçable",
      '• Gain de temps et réduction des erreurs'
    ].join('\n'),
    { x: 0.8, y: 1.6, w: 11.5, h: 2.0, fontSize: 18, color: THEME.text }
  );
  slide.addText([
    { text: 'Objectifs', options: { fontSize: 22, bold: true, color: THEME.text } },
  ], { x: 0.8, y: 3.9, w: 6.2, h: 0.6 });
  slide.addText(
    [
      '• Application PWA installable, 100% utilisable hors ligne',
      '• Calculateur IPP fiable (méthode Balthazard, état antérieur, taux social)',
      '• Guides médico‑légaux et maladies pro intégrés',
      '• Outils cliniques intégrés (GFR, insuline, audiométrie, etc.)'
    ].join('\n'),
    { x: 0.8, y: 4.5, w: 11.5, h: 2.0, fontSize: 18, color: THEME.text }
  );
}

// Slide 3 — Fonctionnalités Clés
{
  const slide = pptx.addSlide();
  decorateSlide(slide, 'Fonctionnalités Clés');
  slide.addText(
    [
      '• Calculateur IPP (multi‑lésions, Balthazard, état antérieur, taux social)',
      '• Guides législatifs + assistant (IA) avec garde‑fous',
      '• Maladies professionnelles & ALD (tooltips médicaux structurés)',
      '• Appareillage CNAS : recherche sémantique et référentiel',
      '• Dictionnaire des médicaments & outils cliniques (GFR, insuline, etc.)',
      '• PWA Offline : fonctionnement complet sans Internet, mise à jour auto'
    ].join('\n'),
    { x: 0.8, y: 1.2, w: 11.5, h: 4.8, fontSize: 20, color: THEME.text }
  );
}

// Slide 4 — Architecture Technique
{
  const slide = pptx.addSlide();
  decorateSlide(slide, 'Architecture Technique');
  slide.addText(
    [
      'Front-end: React 19, TypeScript, Vite',
      'PWA: Manifest, Service Worker (Cache‑First dynamique, séparation statique/données)',
      'Données locales: barèmes, maladies, médicaments, appareillage',
      'IA (en ligne): Google Gemini – désactivée hors ligne par conception',
      'OCR: Tesseract.js pour décodage manuscrit (outil en option)',
      'Déploiement: Vercel (CI, env, CDN)'
    ].join('\n'),
    { x: 0.8, y: 1.2, w: 11.5, h: 4.8, fontSize: 18, color: THEME.text }
  );
  slide.addNotes('Insister sur la stratégie Cache‑First, séparation des caches (statique vs data), mise à jour sans rupture.');
}

// Slide 5 — PWA & Hors Ligne
{
  const slide = pptx.addSlide();
  decorateSlide(slide, 'PWA & Hors Ligne');
  slide.addText(
    [
      '• Cache‑First: instantané après première visite',
      '• Données stratifiées: /data/* dans un cache dédié',
      '• Fallback navigation: /index.html si réseau indisponible',
      '• Mise à jour: vérification horaire + rechargement contrôlé',
      '• Indicateur UI: bannière "Mode hors ligne"',
      '• Avantage: disponibilité terrain et réduction consommation data'
    ].join('\n'),
    { x: 0.8, y: 1.2, w: 11.5, h: 4.8, fontSize: 18, color: THEME.text }
  );
}

// Slide 6 — Calculateur IPP (Clinique)
{
  const slide = pptx.addSlide();
  decorateSlide(slide, 'Calculateur IPP (Clinique)');
  slide.addText(
    [
      '• Saisie multi‑lésions et consolidation automatique',
      '• Balthazard (capacité restante) et état antérieur (art. 12)',
      '• Taux social et génération de résumé clinique',
      '• Traçabilité: justification par le barème indicatif'
    ].join('\n'),
    { x: 0.8, y: 1.2, w: 11.5, h: 3.0, fontSize: 18, color: THEME.text }
  );
}

// Slide 7 — Contenus médicaux
{
  const slide = pptx.addSlide();
  decorateSlide(slide, 'Contenus médicaux');
  slide.addText(
    [
      '• ALD & Maladies professionnelles: 36+ fiches/outils intégrés',
      '• Exemples: Niemann‑Pick, Gaucher, PAN, Poliomyélite…',
      '• Dictionnaire médicaments, barèmes, référentiels CNAS',
      '• Mise à jour via déploiements Vercel (SW update)'
    ].join('\n'),
    { x: 0.8, y: 1.2, w: 11.5, h: 3.5, fontSize: 18, color: THEME.text }
  );
}

// Slide 8 — Sécurité, Qualité, RGPD
{
  const slide = pptx.addSlide();
  decorateSlide(slide, 'Sécurité, Qualité, RGPD');
  slide.addText(
    [
      '• Pas de données patients stockées côté serveur',
      '• Hors ligne par défaut — confidentialité renforcée',
      '• Appels IA conditionnels (uniquement si en ligne et consentement)',
      '• Architecture sans backend (pour le scope actuel)',
      '• Mesures: HTTPS, CSP par défaut Vercel, en‑têtes de sécurité'
    ].join('\n'),
    { x: 0.8, y: 1.2, w: 11.5, h: 4.8, fontSize: 18, color: THEME.text }
  );
}

// Slide 9 — Démo (Plan)
{
  const slide = pptx.addSlide();
  decorateSlide(slide, 'Démo (Plan)');
  slide.addText(
    [
      '1) Ouverture et installation PWA',
      '2) Calcul IPP : 2 lésions + état antérieur + taux social',
      '3) Consultation d’une fiche ALD (ex: Niemann‑Pick)',
      '4) Passage hors ligne → usage intégral',
      '5) Ré‑activation réseau → mise à jour SW'
    ].join('\n'),
    { x: 0.8, y: 1.2, w: 11.5, h: 3.8, fontSize: 18, color: THEME.text }
  );
}

// Slide 10 — Roadmap
{
  const slide = pptx.addSlide();
  decorateSlide(slide, 'Roadmap');
  slide.addText(
    [
      '• Optimisation bundle (code‑splitting, lazy‑loading)',
      '• Outils médicaux supplémentaires et nouvelles ALD',
      '• Mesure d’usage locale (privacy‑first) et ergonomie',
      '• Nom de domaine court & branding',
      '• IA locale (ONNX/TensorFlow.js) pour suggestions hors ligne (R&D)'
    ].join('\n'),
    { x: 0.8, y: 1.2, w: 11.5, h: 4.0, fontSize: 18, color: THEME.text }
  );
}

// Slide 11 — Conclusion & Questions
{
  const slide = pptx.addSlide();
  slide.background = { color: THEME.primary };
  slide.addText('Merci', {
    x: 1.0, y: 2.0, w: 11.0, h: 1.0, fontSize: 44, bold: true, color: 'FFFFFF', align: 'left'
  });
  slide.addText('Questions du jury', {
    x: 1.0, y: 3.2, w: 11.0, h: 0.8, fontSize: 28, color: 'FFFFFF', align: 'left'
  });
}

const outFile = path.join(ROOT, 'Presentation_Guide_Medecin_Conseil.pptx');
await pptx.writeFile({ fileName: outFile });
console.log(`✅ Présentation générée: ${outFile}`);
