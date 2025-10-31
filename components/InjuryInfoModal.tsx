
import React from 'react';
import { Button } from './ui/Button';

interface InjuryInfoModalProps {
  injuryName: string;
  onClose: () => void;
}

export const InjuryInfoModal: React.FC<InjuryInfoModalProps> = ({ injuryName, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-slate-500 hover:text-slate-800 text-2xl">&times;</button>
        <h3 className="text-xl font-bold mb-4 text-slate-800">{injuryName}</h3>
        
        <div className="text-slate-600 p-4 bg-gray-100 rounded-md">
            <p>La fonctionnalité de description par IA n'est pas disponible en mode local.</p>
            <p className="mt-2 text-sm">Veuillez vous référer au barème indicatif fourni et consulter un professionnel de santé pour toute question médicale.</p>
        </div>
        
        <div className="mt-6 text-right">
          <Button onClick={onClose}>Fermer</Button>
        </div>
      </div>
    </div>
  );
};