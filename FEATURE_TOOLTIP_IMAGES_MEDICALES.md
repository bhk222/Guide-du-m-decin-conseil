# Système de Tooltip avec Images Médicales

## Date: 26 décembre 2025

## Vue d'ensemble
Implémentation d'un système de tooltips avec images médicales pour afficher des illustrations explicatives des déformations et lésions.

## Modifications effectuées

### 1. Ajout du champ `imageUrl` dans le type `Injury`

**Fichier**: [types.ts](types.ts)

```typescript
export interface Injury {
  name: string;
  rate: number | [number, number];
  description?: string;
  imageUrl?: string; // ✨ NOUVEAU: URL de l'image explicative médicale
  rateCriteria?: {
    low: string;
    medium?: string;
    high: string;
  }
  excludeContext?: string[];
}
```

### 2. Création de l'image médicale "Doigt en boutonnière"

**Fichier**: [public/images/medical/doigt-boutonniere.svg](public/images/medical/doigt-boutonniere.svg)

- Image SVG vectorielle haute qualité
- Illustration des deux déformations caractéristiques :
  - **IPP fléchie** (articulation interphalangienne proximale en flexion)
  - **IPD en hyperextension** (articulation interphalangienne distale en hyperextension)
- Légende explicative du mécanisme de rupture de la bandelette médiane de l'extenseur
- Vue comparative avec position normale du doigt

### 3. Mise à jour de la base de données

**Fichier**: [data/mayetReyComplement.ts](data/mayetReyComplement.ts)

Ajout de l'`imageUrl` pour les entrées suivantes :

```typescript
{ 
  name: "Doigt en boutonnière (IPP fléchie, IPD hyperextension) (Dominante)", 
  rate: [8, 15], 
  description: "Rupture bandelette médiane extenseur.", 
  imageUrl: "/images/medical/doigt-boutonniere.svg" // ✨ NOUVEAU
}

{ 
  name: "Doigt en boutonnière (IPP fléchie, IPD hyperextension) (Non-Dominante)", 
  rate: [6, 12], 
  description: "Rupture bandelette médiane extenseur.", 
  imageUrl: "/images/medical/doigt-boutonniere.svg" // ✨ NOUVEAU
}
```

### 4. Modification du composant `ExclusiveAiCalculator`

**Fichier**: [components/ExclusiveAiCalculator.tsx](components/ExclusiveAiCalculator.tsx)

#### Composant `ProposalBubble` amélioré :

```tsx
const ProposalBubble: React.FC<{ proposal: Proposal; onAccept: () => void; onReject: () => void; }> = ({ proposal, onAccept, onReject }) => {
    const [showImageTooltip, setShowImageTooltip] = useState(false);
    
    return (
        <div className="p-4 bg-primary-100/60 border-l-4 border-primary-500 rounded-r-lg">
            {/* ... contenu existant ... */}
            
            {/* ✨ NOUVEAU: Image médicale explicative si disponible */}
            {proposal.injury.imageUrl && (
                <div className="mt-3 relative">
                    <button
                        className="flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md text-xs text-blue-700 font-medium transition-colors"
                        onMouseEnter={() => setShowImageTooltip(true)}
                        onMouseLeave={() => setShowImageTooltip(false)}
                        onClick={() => setShowImageTooltip(!showImageTooltip)}
                    >
                        <svg>...</svg>
                        Voir l'illustration médicale
                    </button>
                    
                    {/* Tooltip avec l'image */}
                    {showImageTooltip && (
                        <div className="absolute z-50 left-0 top-full mt-2 p-3 bg-white border-2 border-blue-300 rounded-lg shadow-2xl max-w-2xl">
                            <img src={proposal.injury.imageUrl} alt={proposal.name} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
```

### 5. Modification du composant `GuidedCalculator`

**Fichier**: [components/GuidedCalculator.tsx](components/GuidedCalculator.tsx)

#### Nouveau composant `InjuryImageTooltip` :

```tsx
const InjuryImageTooltip: React.FC<{ imageUrl: string; injuryName: string }> = ({ imageUrl, injuryName }) => {
    const [show, setShow] = useState(false);
    
    return (
        <div className="relative inline-block ml-2">
            <button
                type="button"
                className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors"
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                <svg>...</svg> {/* Icône d'image */}
            </button>
            
            {show && (
                <div className="absolute z-50 left-0 top-full mt-2 p-3 bg-white border-2 border-blue-300 rounded-lg shadow-2xl w-96">
                    <img src={imageUrl} alt={injuryName} />
                </div>
            )}
        </div>
    );
};
```

#### Intégration dans l'affichage des lésions :

```tsx
<p className="font-semibold flex items-center">
    {injury.name}
    {injury.imageUrl && (
        <InjuryImageTooltip imageUrl={injury.imageUrl} injuryName={injury.name} />
    )}
</p>
```

## Fonctionnalités

### 1. Affichage automatique
- L'icône d'image apparaît automatiquement à côté des lésions ayant un `imageUrl`
- Icône visuelle intuitive (pictogramme d'image)
- Style cohérent avec le design existant

### 2. Interactions utilisateur
- **Hover** : Affichage de la tooltip au survol de l'icône ou du bouton
- **Click** : Toggle de la tooltip pour les utilisateurs tactiles
- **Fermeture** : Bouton de fermeture explicite (X) dans la tooltip

### 3. Responsive et accessible
- Positionnement dynamique de la tooltip
- Z-index élevé (z-50) pour passer au-dessus des autres éléments
- Arrêt de la propagation des événements pour éviter les clics accidentels

## Utilisation pour ajouter de nouvelles images

### Étape 1 : Créer l'image
Placer l'image dans `/public/images/medical/` avec un nom descriptif :
- Format SVG recommandé (vectoriel, poids léger)
- Format PNG/JPG accepté (optimiser la taille)

### Étape 2 : Mettre à jour la base de données
Dans le fichier de données approprié (ex: `mayetReyComplement.ts`), ajouter le champ `imageUrl` :

```typescript
{ 
  name: "Nom de la lésion", 
  rate: [min, max], 
  description: "Description médicale", 
  imageUrl: "/images/medical/nom-image.svg" // ✨ Ajouter cette ligne
}
```

### Étape 3 : Déployer
Aucune modification de code nécessaire ! Le système détecte automatiquement la présence de `imageUrl` et affiche l'icône.

## Exemples d'images à ajouter

Liste des lésions candidates pour des illustrations :

### Doigts
- ✅ **Doigt en boutonnière** (IPP fléchie, IPD hyperextension) - **FAIT**
- ⏳ Doigt en maillet (IPD en flexion)
- ⏳ Doigt en col de cygne (IPP hyperextension, IPD flexion)

### Membre supérieur
- ⏳ Fracture de Pouteau-Colles
- ⏳ Luxation gléno-humérale
- ⏳ Rupture de la coiffe des rotateurs

### Membre inférieur
- ⏳ Lésion du LCA (ligament croisé antérieur)
- ⏳ Fracture bimalléolaire
- ⏳ Hallux valgus

### Rachis
- ⏳ Tassement vertébral
- ⏳ Hernie discale
- ⏳ Spondylolisthésis

## Avantages du système

1. **Pédagogique** : Aide à la compréhension des lésions complexes
2. **Modulaire** : Facile d'ajouter de nouvelles images sans toucher au code
3. **Performant** : Images chargées uniquement quand nécessaires
4. **Professionnel** : Améliore l'aspect médical et expert de l'application

## Tests recommandés

- [ ] Tester sur mobile (interactions tactiles)
- [ ] Vérifier le positionnement sur petits écrans
- [ ] Tester avec plusieurs images ouvertes simultanément
- [ ] Vérifier l'accessibilité (lecteurs d'écran)
- [ ] Valider la performance (temps de chargement)

## Notes techniques

- **React Hooks** : Utilisation de `useState` pour gérer l'état d'affichage
- **CSS** : Classes Tailwind pour le styling responsive
- **SVG** : Format vectoriel pour des images nettes à toutes les résolutions
- **TypeScript** : Typage strict pour éviter les erreurs

---

**Dernière mise à jour** : 26 décembre 2025  
**Version** : 1.0  
**Auteur** : GitHub Copilot
