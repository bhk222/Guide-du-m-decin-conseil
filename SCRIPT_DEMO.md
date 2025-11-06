# 🎬 SCRIPT DE DÉMO - GUIDE DU MÉDECIN CONSEIL
## Présentation devant le jury (5 minutes)

---

## 🎯 OBJECTIF DE LA DÉMO

Montrer au jury (médecins + informaticiens) que l'application :
1. S'installe comme une application native (PWA)
2. Calcule correctement un IPP complexe
3. Fournit des référentiels médicaux détaillés
4. **Fonctionne 100% hors ligne**
5. Se met à jour automatiquement

---

## ⏱️ TIMING : 5 MINUTES

| Étape | Action | Durée |
|-------|--------|-------|
| 1 | Installation PWA | 1 min |
| 2 | Calcul IPP complexe | 2 min |
| 3 | Consultation ALD | 1 min |
| 4 | Mode hors ligne | 1 min |
| 5 | Retour en ligne | 30 sec |

---

## 📝 SCRIPT DÉTAILLÉ

### 🔹 ÉTAPE 1 : Installation PWA (1 minute)

**Action** :
1. Ouvrir Chrome
2. Taper l'URL : `https://guide-medecin-conseil-6o8kdfahu-bhk222s-projects.vercel.app`
3. Attendre le chargement (2-3 secondes)
4. Pointer l'icône d'installation dans la barre d'URL (⊕)
5. Cliquer dessus
6. Confirmer "Installer"
7. L'application s'ouvre en fenêtre standalone

**Script oral** :
> "Je vais vous montrer l'application en live. J'ouvre l'URL dans Chrome. [ATTENDRE CHARGEMENT] Vous voyez cette icône d'installation dans la barre d'adresse ? [POINTER] C'est la signature d'une PWA. Je clique dessus... [CLIC] et l'application s'installe comme une application native. [ATTENDRE] Voilà, elle s'ouvre maintenant en fenêtre standalone, exactement comme une application de bureau."

**Points à souligner** :
- ✅ "Pas besoin de store, pas de validation"
- ✅ "Icône ajoutée au menu démarrer/bureau"
- ✅ "Lancement instantané ensuite"

**Si problème** :
- Icône non visible → Rafraîchir (F5)
- Popup bloquée → Aller dans Chrome Settings > Site Settings
- Plan B : Montrer screenshot de l'installation

---

### 🔹 ÉTAPE 2 : Calcul IPP Complexe (2 minutes)

**Action** :
1. Se connecter (login simple) : `medecin` / `cnas2024`
2. Aller dans l'onglet "Calculateur IPP" (en bas)
3. Remplir les infos victime :
   - Âge : 45 ans
   - Profession : Maçon
   - Entreprise : BTP Construction
   - Sexe : Homme
   - Secteur : Privé
4. Sélectionner 1ère lésion :
   - Cliquer sur "Ajouter une lésion"
   - Chercher "Raideur poignet"
   - Sélectionner : "Raideur poignet droit" → 10%
5. Sélectionner 2ème lésion :
   - Cliquer sur "Ajouter une lésion"
   - Chercher "Entorse genou"
   - Sélectionner : "Entorse genou gauche instable" → 5%
6. Définir état antérieur :
   - Champ "IPP préexistante" : 8%
   - Motif : "Lombalgie chronique"
7. Définir taux social :
   - Champ "Taux social" : 3%
8. Observer le calcul automatique
9. Cliquer "Générer résumé clinique"
10. Montrer le texte généré

**Script oral** :
> "Je me connecte maintenant. [LOGIN] Je vais simuler un cas clinique réel. Un maçon de 45 ans avec deux lésions : une raideur du poignet droit à 10% et une entorse instable du genou gauche à 5%. [SÉLECTIONNER LÉSIONS]
>
> Ce patient a un état antérieur : une lombalgie chronique indemnisée à 8%. [ENTRER 8%] L'application va calculer le taux sur la capacité restante, conformément à l'article 12.
>
> Nous appliquons aussi un taux social de 3%. [ENTRER 3%]
>
> Vous voyez, le calcul se fait automatiquement : la méthode de Balthazard combine les deux lésions, puis le taux est appliqué sur la capacité restante après l'état antérieur. Le résultat apparaît ici : [POINTER LE TAUX FINAL]
>
> Je génère maintenant le résumé clinique. [CLIC] Voilà, un texte complet, prêt à intégrer dans le rapport médical, avec le contexte du patient, les lésions détaillées, la méthode de calcul et le taux final justifié."

**Points à souligner** :
- ✅ "Calcul automatique, zéro erreur"
- ✅ "Méthode Balthazard + Article 12 appliqués"
- ✅ "Résumé clinique formaté et prêt"
- ✅ "Traçabilité complète"

**Chiffres à montrer** :
- Taux 1 : 10%
- Taux 2 : 5%
- État antérieur : 8%
- Capacité restante : 92%
- Calcul : (1 - (1-0.10) × (1-0.05)) × 0.92 = 13.2% → arrondi à 13%
- Taux social : +3%
- **Taux final : ~16%**

**Si problème** :
- Calcul incorrect → Vérifier les paramètres
- Résumé ne se génère pas → Rafraîchir
- Plan B : Screenshot du résumé préparé

---

### 🔹 ÉTAPE 3 : Consultation ALD (1 minute)

**Action** :
1. Cliquer sur l'onglet "Outils" (en bas)
2. Cliquer sur "Liste des ALD"
3. Chercher "Niemann-Pick" dans la barre de recherche
4. Cliquer sur "Maladie de Niemann-Pick (C17C02)"
5. Le tooltip détaillé s'ouvre
6. Scroller pour montrer les sections :
   - Définition
   - Épidémiologie
   - Types (A, B, C)
   - Physiopathologie
   - Manifestations cliniques
   - Examens complémentaires
   - Diagnostic différentiel
   - Traitement (miglustat pour Type C)
   - Surveillance
7. Fermer le tooltip

**Script oral** :
> "Maintenant, je vais vous montrer les référentiels médicaux intégrés. [CLIC OUTILS] J'ouvre la liste des ALD. [CLIC LISTE ALD]
>
> Je cherche par exemple la maladie de Niemann-Pick. [TAPER 'Niemann'] Voilà, je clique dessus. [CLIC]
>
> Vous avez ici une fiche complète : définition, épidémiologie, les trois types cliniques A, B et C... [SCROLLER] Les manifestations, notamment le vertical gaze palsy qui est pathognomonique du Type C... [POINTER] Les examens complémentaires, le diagnostic différentiel, et surtout le traitement : le miglustat pour le Type C qui ralentit la progression neurologique. [SCROLLER]
>
> Toutes nos 36 fiches médicales sont structurées ainsi, avec les critères diagnostiques, les examens, les traitements et la surveillance. C'est un vrai outil de référence pour le médecin conseil."

**Points à souligner** :
- ✅ "36 fiches médicales structurées"
- ✅ "Critères diagnostiques précis"
- ✅ "Traitements et surveillance"
- ✅ "Accessible en 2 clics"

**Si problème** :
- Tooltip ne s'ouvre pas → Re-cliquer
- Recherche ne fonctionne pas → Scroller manuellement
- Plan B : Screenshot de la fiche

---

### 🔹 ÉTAPE 4 : Mode Hors Ligne (1 minute) 🔥

**Action** :
1. Appuyer sur F12 (ouvrir DevTools)
2. Aller dans l'onglet "Network"
3. Cocher "Offline" ☑ en haut
4. Rafraîchir la page (F5)
5. **L'application continue de fonctionner !**
6. Montrer la bannière jaune "📵 Mode Hors Ligne"
7. Naviguer entre les onglets :
   - Calculator → fonctionne
   - Outils → fonctionne
   - Liste ALD → fonctionne
8. Faire un nouveau calcul IPP rapide
9. Ouvrir une autre ALD (ex: Gaucher)

**Script oral** :
> "Maintenant, la démonstration la plus importante : le mode hors ligne. [APPUYER F12] J'ouvre les outils développeur. [CLIC NETWORK] Je vais dans l'onglet Network et je coche 'Offline'. [COCHER ☑]
>
> Je rafraîchis la page. [F5] ... [ATTENDRE 1 SEC]
>
> Et voilà ! [POINTER L'ÉCRAN] L'application continue de fonctionner parfaitement. Vous voyez cette bannière jaune en haut ? [POINTER] Elle m'indique que je suis en mode hors ligne.
>
> Je navigue maintenant entre les différents modules... [CLIC CALCULATOR] Le calculateur fonctionne... [CLIC OUTILS] Les outils fonctionnent... [CLIC LISTE ALD] Les fiches médicales s'affichent normalement.
>
> Je peux même faire un nouveau calcul IPP. [AJOUTER UNE LÉSION RAPIDE] Vous voyez, tout est local, rien ne nécessite Internet.
>
> C'est exactement ce que les médecins conseil attendent : pouvoir travailler sur le terrain, dans des zones sans réseau, sans aucune interruption de service."

**Points à souligner** :
- ✅ "100% fonctionnel sans Internet"
- ✅ "Bannière visuelle claire"
- ✅ "Toutes les fonctionnalités disponibles"
- ✅ "Cache-First : instant loading"

**TRÈS IMPORTANT** :
- C'est LA démo clé pour convaincre les médecins
- Prendre le temps de bien montrer
- Si ça marche pas → CATASTROPHE → Bien tester avant !

**Si problème** :
- App ne charge pas offline → Vérifier Service Worker (F5 plusieurs fois)
- Erreur réseau → Désactiver DevTools et réessayer
- **Plan B ABSOLU** : Vidéo enregistrée du mode offline

---

### 🔹 ÉTAPE 5 : Retour en Ligne (30 secondes)

**Action** :
1. Décocher "Offline" ☐ dans DevTools Network
2. La bannière jaune disparaît
3. Expliquer la mise à jour automatique

**Script oral** :
> "Je réactive maintenant la connexion. [DÉCOCHER OFFLINE] Vous voyez, la bannière disparaît instantanément. [POINTER]
>
> Le Service Worker vérifie automatiquement les mises à jour toutes les heures. Si une nouvelle version est disponible, une notification apparaît : 'Nouvelle version disponible'. L'utilisateur clique, et l'application se recharge avec les nouveaux contenus. Pas de réinstallation, pas de manipulation complexe. Tout est transparent."

**Points à souligner** :
- ✅ "Transition fluide online ↔ offline"
- ✅ "Mise à jour automatique en arrière-plan"
- ✅ "Pas de rupture de service"

---

## 🎤 PHRASES CLÉS À MÉMORISER

**Pour les médecins** :
- "Accessible sur le terrain, même sans réseau"
- "Calcul IPP rigoureux selon Balthazard et Article 12"
- "36 fiches médicales détaillées, toujours à jour"
- "Résumé clinique généré automatiquement"

**Pour les informaticiens** :
- "Architecture PWA moderne avec Service Worker cache-first"
- "React 19 + TypeScript pour la maintenabilité"
- "Bundle de 302 KB gzippé, chargement instantané"
- "Sécurité by design : pas de backend, pas de données serveur"

**Pour tous** :
- "Installation en un clic, sans store"
- "Fonctionne à 100% hors ligne après première visite"
- "Mises à jour automatiques et transparentes"
- "Coût infrastructure quasi-nul (CDN statique)"

---

## ⚠️ GESTION DES PROBLÈMES

### Problème : URL ne charge pas
**Solution** :
- Vérifier connexion Internet
- Essayer en navigation privée (Ctrl+Shift+N)
- Utiliser screenshots backup

### Problème : Installation PWA ne s'affiche pas
**Solution** :
- Rafraîchir (F5)
- Vérifier HTTPS (obligatoire pour PWA)
- Montrer screenshot de l'icône installée

### Problème : Calcul IPP incorrect
**Solution** :
- Vérifier les valeurs entrées
- Expliquer la formule de Balthazard à haute voix
- Utiliser calculatrice pour démontrer

### Problème : Mode offline ne fonctionne pas
**Solution** :
- **CRITIQUE** : Tester avant la présentation !
- F5 plusieurs fois avec Internet (pour forcer cache)
- Fermer/rouvrir DevTools
- **Plan B** : Vidéo enregistrée

### Problème : ALD tooltip ne s'ouvre pas
**Solution** :
- Re-cliquer
- Rafraîchir la page
- Utiliser screenshot backup

### Problème général : Application bug
**Solution** :
- Rester calme ☺
- Expliquer : "C'est une démo live, parfois..."
- Passer aux screenshots backup
- Continuer avec explications verbales

---

## 📸 SCREENSHOTS BACKUP

**Préparer ces screenshots avant la présentation** :

1. **Installation PWA** :
   - Chrome avec icône ⊕ dans barre URL
   - Popup "Installer Guide du Médecin Conseil"
   - Application installée en fenêtre standalone

2. **Calcul IPP** :
   - Interface avec 2 lésions + état antérieur
   - Taux final affiché
   - Résumé clinique complet

3. **Fiche ALD** :
   - Liste des ALD avec recherche
   - Tooltip Niemann-Pick ouvert avec sections visibles

4. **Mode offline** :
   - DevTools Network avec "Offline" coché
   - Bannière jaune "Mode Hors Ligne" visible
   - Application fonctionnelle

5. **Service Worker** :
   - DevTools Application > Service Workers
   - Status "activated and is running"
   - Cache Storage avec 2 caches

---

## 🎯 CHECKLIST PRE-DÉMO

**30 minutes avant** :
- [ ] Charger l'URL application avec Internet (pour cache)
- [ ] Installer la PWA sur votre machine
- [ ] Tester le mode offline (F12 > Network > Offline)
- [ ] Vérifier que le calcul IPP fonctionne
- [ ] Vérifier qu'une ALD s'ouvre correctement
- [ ] Préparer screenshots backup sur clé USB
- [ ] Fermer tous les onglets non nécessaires
- [ ] Désactiver notifications Windows (mode concentration)
- [ ] Vérifier que le projecteur fonctionne
- [ ] Zoom navigateur à 100% ou 110% (lisibilité)

**Juste avant de commencer** :
- [ ] Ouvrir Chrome en mode normal (pas incognito)
- [ ] Aller sur l'URL application
- [ ] Vérifier connexion Internet active
- [ ] Préparer DevTools (F12) en arrière-plan
- [ ] Respirer profondément 🧘

---

## 🏆 CONSEILS FINAUX

**Pendant la démo** :
- ✅ **Parler en même temps que vous agissez**
- ✅ **Aller LENTEMENT** (le jury doit suivre)
- ✅ **Pointer avec le curseur** ce que vous montrez
- ✅ **Expliquer AVANT de cliquer** ("Je vais maintenant...")
- ✅ **Commenter ce qui se passe** ("Vous voyez...")
- ✅ **Sourire et regarder le jury** (pas seulement l'écran)

**Si ça marche bien** :
- ✨ Montrer votre enthousiasme
- ✨ Souligner les points forts
- ✨ Inviter des questions pendant la démo

**Si ça marche mal** :
- ☮ Rester calme et professionnel
- ☮ Ne pas paniquer
- ☮ Basculer sur screenshots
- ☮ Expliquer verbalement avec confiance

---

## 📊 MÉTRIQUES À CITER PENDANT LA DÉMO

**Quand vous montrez** :
- **Installation** : "En un clic, sans store, 841 KB téléchargés"
- **Calcul IPP** : "Calcul automatique en <100ms"
- **ALD** : "36 fiches médicales, 98 tableaux maladies pro"
- **Offline** : "Chargement <500ms depuis cache, 100% fonctionnel"
- **Bundle** : "302 KB gzippé, chargement initial <3 secondes"

---

## 🎬 BON À SAVOIR

**Durée réelle** : La démo prend généralement 5-6 minutes, pas 5 minutes pile. Gardez 1 minute de marge.

**Adaptabilité** : Si le jury pose des questions pendant, c'est bon signe ! Répondez et adaptez.

**Priorités** :
1. **MODE OFFLINE** = démo la plus importante
2. Calcul IPP = fonctionnalité core
3. ALD = richesse contenus
4. Installation PWA = aspect innovant

**Si manque de temps** : Skipper l'installation PWA, aller direct au calcul IPP + mode offline.

---

*Bonne chance pour votre présentation ! 🚀*

---

*Document créé le 1er novembre 2025*
*Projet : Guide du Médecin Conseil - CNAS*
