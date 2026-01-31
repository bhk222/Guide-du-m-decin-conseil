@echo off
REM Script Windows pour redémarrage rapide
REM Double-cliquez sur ce fichier pour redémarrer le serveur

echo.
echo ========================================
echo   Redemarrage du serveur Vite
echo ========================================
echo.

REM Tuer les processus Node
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

REM Nettoyer le cache
if exist "node_modules\.vite" (
    echo Nettoyage du cache...
    rmdir /S /Q "node_modules\.vite" 2>nul
)

echo.
echo Demarrage du serveur...
echo.

REM Démarrer le serveur
start "Vite Dev Server" cmd /k npm run dev

echo.
echo Le serveur demarre dans une nouvelle fenetre...
echo Attendez quelques secondes puis allez sur http://localhost:5173
echo.
pause
