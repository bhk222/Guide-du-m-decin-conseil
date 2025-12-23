@echo off
REM Script batch pour déployer sur Vercel (Windows CMD)

echo.
echo ===============================================================
echo     DEPLOIEMENT VERCEL - GUIDE DU MEDECIN CONSEIL
echo ===============================================================
echo.

REM Vérifier Node.js
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Node.js n'est pas installe
    echo Installez Node.js depuis: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js detecte
echo.

REM Vérifier Vercel CLI
where vercel >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Installation de Vercel CLI...
    call npm install -g vercel
    if %ERRORLEVEL% NEQ 0 (
        echo [ERREUR] Echec de l'installation de Vercel CLI
        pause
        exit /b 1
    )
    echo [OK] Vercel CLI installe
) else (
    echo [OK] Vercel CLI deja installe
)

echo.
echo [INFO] Build de l'application...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Echec du build
    pause
    exit /b 1
)

echo [OK] Build reussi
echo.

REM Vérifier le dossier dist
if not exist "dist" (
    echo [ERREUR] Dossier 'dist' introuvable
    pause
    exit /b 1
)

if not exist "dist\index.html" (
    echo [ERREUR] Fichier 'dist\index.html' introuvable
    pause
    exit /b 1
)

echo [OK] Fichiers prets pour le deploiement
echo.
echo ===============================================================
echo   PRET A DEPLOYER SUR VERCEL
echo ===============================================================
echo.
echo Fonctionnalites incluses:
echo   - Calculateur IPP (45 cas valides)
echo   - Assistant Juridique
echo   - Maladies Professionnelles
echo   - Appareillage CNAS
echo   - NOMENCLATURE GENERALE (NOUVEAU)
echo   - 8 Outils specialises
echo   - Mode offline PWA
echo.
echo.

set /p CONFIRM="Voulez-vous continuer? (O/N): "

if /i "%CONFIRM%"=="O" goto DEPLOY
if /i "%CONFIRM%"=="Y" goto DEPLOY
goto CANCEL

:DEPLOY
echo.
echo [INFO] Deploiement en cours sur Vercel...
echo.
call vercel --prod

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===============================================================
    echo   DEPLOIEMENT REUSSI!
    echo ===============================================================
    echo.
    echo Prochaines etapes:
    echo   1. Verifiez l'URL de production ci-dessus
    echo   2. Testez l'application en ligne
    echo   3. Verifiez la rubrique NOMENCLATURE GENERALE
    echo   4. Partagez l'URL avec vos utilisateurs
    echo.
) else (
    echo.
    echo [ERREUR] Echec du deploiement
    echo.
    echo Solutions possibles:
    echo   1. Executez: vercel login
    echo   2. Verifiez votre connexion internet
    echo   3. Reessayez: vercel --prod
    echo.
)
pause
exit /b 0

:CANCEL
echo.
echo [INFO] Deploiement annule
echo.
echo Pour deployer plus tard, executez:
echo   deploy-vercel.bat
echo.
pause
exit /b 0
