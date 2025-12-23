# 📄 EXTRACTION DU PDF - Guide Étape par Étape

## 🎯 Objectif
Extraire tout le contenu du PDF `acte.pdf` (70 MB) pour créer la base de données complète de nomenclature médicale.

## 🚀 Méthode Recommandée : Copier-Coller

### Étape 1 : Ouvrir le PDF
1. Ouvrez `acte.pdf` avec **Adobe Acrobat Reader** ou un lecteur PDF
2. Activez le mode "Sélection de texte" (icône curseur)

### Étape 2 : Sélectionner tout le contenu
- **Windows** : `Ctrl + A`
- **Mac** : `Cmd + A`

### Étape 3 : Copier le texte
- **Windows** : `Ctrl + C`
- **Mac** : `Cmd + C`

### Étape 4 : Coller dans un fichier texte
1. Créez un fichier : `acte_extracted.txt` dans ce dossier
2. Collez le contenu : `Ctrl + V` / `Cmd + V`
3. Sauvegardez le fichier

### Étape 5 : Lancer la conversion
Ensuite, exécutez :
```powershell
node scripts/parseFromText.cjs
```

---

## 🌐 Alternative : Outil en ligne

Si le copier-coller ne fonctionne pas bien :

### Option A : PDF2TXT.com
1. Allez sur : https://www.pdf2txt.de/
2. Uploadez `acte.pdf`
3. Téléchargez le fichier `.txt`
4. Renommez-le en `acte_extracted.txt`
5. Placez-le dans le dossier du projet

### Option B : Convertio
1. Allez sur : https://convertio.co/fr/pdf-txt/
2. Uploadez `acte.pdf`
3. Convertissez en TXT
4. Téléchargez et renommez en `acte_extracted.txt`

---

## 📊 Format Attendu

Le PDF devrait contenir des lignes comme :
```
C001    Consultation de médecin généraliste                    500 DA
C002    Consultation de spécialiste                           800 DA
K001    Radiographie du thorax                               1200 DA
...
```

Le script va :
- Extraire les **codes d'acte** (ex: C001, K001)
- Extraire les **libellés** (descriptions)
- Extraire les **tarifs** (montants en DA)
- Catégoriser automatiquement par type d'acte
- Générer `nomenclature-static.json`

---

## 🔧 Dépannage

### Le texte copié est illisible ?
Le PDF peut être scanné (image). Solutions :
1. Utilisez un OCR : https://www.onlineocr.net/
2. Ou partagez quelques pages du PDF pour analyse

### Le fichier est trop volumineux ?
Si l'outil en ligne refuse le fichier de 70 MB :
1. Divisez le PDF en plusieurs parties
2. Extrayez chaque partie séparément
3. Combinez les fichiers `.txt` résultants

---

## ⏭️ Prochaines Étapes

Une fois `acte_extracted.txt` créé :

```powershell
# Conversion TXT → JSON
node scripts/parseFromText.cjs

# Vérification
npm run build

# Déploiement
git add .
git commit -m "feat: Base de données nomenclature complète"
git push origin main
```

Vercel déploiera automatiquement ! 🚀
