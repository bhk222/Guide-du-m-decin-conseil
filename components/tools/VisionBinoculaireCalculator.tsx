import React, { useState } from 'react';
import { calculateVisionBinoculaireIPP, VisionLevel } from '../../utils/visionBinoculaireCalculator';

const VISION_LEVELS: VisionLevel[] = [
  "10/10",
  "9/10",
  "8/10",
  "7/10",
  "6/10",
  "5/10",
  "4/10",
  "3/10",
  "2/10",
  "1/10",
  "1/20",
  "<1/20",
  "Énucléation",
];

export const VisionBinoculaireCalculator: React.FC = () => {
  const [oeilDroit, setOeilDroit] = useState<string>("10/10");
  const [oeilGauche, setOeilGauche] = useState<string>("10/10");
  const [result, setResult] = useState<ReturnType<typeof calculateVisionBinoculaireIPP> | null>(null);

  const handleCalculate = () => {
    const res = calculateVisionBinoculaireIPP(oeilDroit, oeilGauche);
    setResult(res);
  };

  React.useEffect(() => {
    handleCalculate();
  }, [oeilDroit, oeilGauche]);

  const getGravityColor = (gravite: string) => {
    switch (gravite) {
      case "Légère": return "bg-green-100 text-green-800 border-green-300";
      case "Modérée": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Importante": return "bg-orange-100 text-orange-800 border-orange-300";
      case "Sévère": return "bg-red-100 text-red-800 border-red-300";
      case "Très sévère": return "bg-red-200 text-red-900 border-red-400";
      case "Cécité": return "bg-gray-900 text-white border-gray-900";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const formatIPP = (ipp: number) => {
    return `${ipp}%`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        Calculateur Vision Binoculaire
      </h2>
      <p className="text-sm text-gray-600 mb-6">Basé sur le tableau officiel AT - Barème à double entrée</p>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Œil Droit */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            👁️ Œil Droit (OD)
          </label>
          <select
            value={oeilDroit}
            onChange={(e) => setOeilDroit(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            {VISION_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Œil Gauche */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            👁️ Œil Gauche (OG)
          </label>
          <select
            value={oeilGauche}
            onChange={(e) => setOeilGauche(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            {VISION_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Résultat */}
      {result && (
        <div className="border-t-4 border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Résultat IPP</h3>
            <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getGravityColor(result.gravite)}`}>
              {result.gravite}
            </span>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
            <div className="text-center">
              <div className="text-5xl font-black text-blue-600 mb-2">
                {formatIPP(result.ipp)}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Taux d'Incapacité Permanente Partielle
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 space-y-2">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Configuration:</span> {result.description}
            </p>
            <div className="flex gap-4 text-sm">
              <div className="flex-1">
                <span className="font-semibold text-gray-700">Œil Droit:</span>
                <span className="ml-2 text-gray-900">{result.oeilDroit}</span>
              </div>
              <div className="flex-1">
                <span className="font-semibold text-gray-700">Œil Gauche:</span>
                <span className="ml-2 text-gray-900">{result.oeilGauche}</span>
              </div>
            </div>
          </div>

          {/* Note explicative */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-sm text-gray-700">
            <p className="font-semibold mb-1">📋 Tableau Général d'Évaluation:</p>
            <p className="mb-2">
              Ce calcul est basé sur le tableau officiel du barème AT. Les valeurs sont exactes selon la grille de correspondance.
            </p>
            {result.noteCorrection && (
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="font-semibold text-blue-900 mb-1">⚠️ Note importante:</p>
                <p className="text-xs italic">{result.noteCorrection}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
