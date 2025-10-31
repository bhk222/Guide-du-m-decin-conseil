import React from 'react';
import { Button } from '../ui/Button';

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  summaryText: string;
}

export const SummaryModal: React.FC<SummaryModalProps> = ({ isOpen, onClose, summaryText }) => {
  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText).then(() => {
        alert('Résumé copié dans le presse-papiers !');
    }).catch(err => {
        console.error('Erreur lors de la copie:', err);
        alert('Erreur lors de la copie.');
    });
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Résumé Clinique IPP</title>');
      printWindow.document.write('<style>body { font-family: sans-serif; white-space: pre-wrap; word-wrap: break-word; }</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(summaryText.replace(/\n/g, '<br/>'));
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 backdrop-blur-sm" 
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl relative text-slate-800 max-h-[90vh] flex flex-col" 
        onClick={e => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl z-10">
          <h3 className="text-xl font-bold text-slate-800">Résumé Clinique de l'Évaluation</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 text-3xl font-light leading-none" aria-label="Fermer">&times;</button>
        </header>
        <main className="p-6 overflow-y-auto custom-scrollbar">
            <pre className="whitespace-pre-wrap font-sans text-sm bg-slate-50 p-4 rounded-md border border-slate-200">
                {summaryText}
            </pre>
        </main>
        <footer className="p-4 border-t border-gray-200 flex flex-wrap gap-2 justify-end">
            <Button variant="secondary" onClick={onClose}>Fermer</Button>
            <Button variant="secondary" onClick={handleCopy}>Copier le texte</Button>
            <Button onClick={handlePrint}>Imprimer</Button>
        </footer>
      </div>
    </div>
  );
};