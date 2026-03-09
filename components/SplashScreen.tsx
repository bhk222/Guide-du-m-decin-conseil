import React, { useEffect, useState } from 'react';
import { CnasLogo } from './ui/CnasLogo';

interface SplashScreenProps {
  onFinished: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinished }) => {
  const [phase, setPhase] = useState<'logo' | 'title' | 'fadeOut'>('logo');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('title'), 800);
    const t2 = setTimeout(() => setPhase('fadeOut'), 2800);
    const t3 = setTimeout(() => onFinished(), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onFinished]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-700 ${
        phase === 'fadeOut' ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ background: 'linear-gradient(160deg, #0a1628 0%, #0d2847 40%, #0a1628 100%)' }}
    >
      {/* Subtle animated rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full border border-white/[0.04]"
          style={{
            width: '500px', height: '500px',
            animation: 'splash-ring-pulse 3s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full border border-white/[0.03]"
          style={{
            width: '700px', height: '700px',
            animation: 'splash-ring-pulse 3s ease-in-out infinite 0.5s',
          }}
        />
        <div
          className="absolute rounded-full border border-white/[0.02]"
          style={{
            width: '900px', height: '900px',
            animation: 'splash-ring-pulse 3s ease-in-out infinite 1s',
          }}
        />
      </div>

      {/* Logo */}
      <div
        className={`relative transition-all duration-1000 ease-out ${
          phase === 'logo' ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={{ transitionDelay: phase === 'logo' ? '0ms' : '0ms' }}
      >
        <div className="relative">
          {/* Glow behind logo */}
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-30"
            style={{ background: 'radial-gradient(circle, rgba(0,111,184,0.6), transparent 70%)', transform: 'scale(1.5)' }}
          />
          <CnasLogo
            className="relative w-32 h-32 sm:w-40 sm:h-40 drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 0 30px rgba(0,111,184,0.4))' }}
          />
        </div>
      </div>

      {/* Title block */}
      <div
        className={`mt-10 text-center transition-all duration-700 ease-out ${
          phase === 'title' || phase === 'fadeOut' ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        {/* CNAS label */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-sky-400/50" />
          <span className="text-sky-400/80 text-xs sm:text-sm font-medium tracking-[0.3em] uppercase">
            Caisse Nationale des Assurances Sociales
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-sky-400/50" />
        </div>

        {/* Main title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide leading-tight">
          GUIDE DU
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide leading-tight"
            style={{ background: 'linear-gradient(135deg, #38bdf8, #0ea5e9, #0284c7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          MÉDECIN CONSEIL
        </h1>

        {/* Decorative line */}
        <div className="mt-5 mx-auto w-20 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #0ea5e9, transparent)' }} />

        {/* Subtitle */}
        <p className="mt-4 text-slate-400 text-sm sm:text-base font-light tracking-wider">
          Système Expert d'Aide à la Décision Médicale
        </p>
      </div>

      {/* Loading indicator */}
      <div
        className={`absolute bottom-16 flex flex-col items-center transition-all duration-500 ${
          phase === 'title' || phase === 'fadeOut' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-sky-400/70"
              style={{ animation: `splash-dot-bounce 1.2s ease-in-out ${i * 0.15}s infinite` }}
            />
          ))}
        </div>
      </div>

      {/* Version */}
      <div className="absolute bottom-6 text-slate-600 text-xs tracking-wider">
        v3.3 &mdash; CNAS Algérie
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes splash-ring-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.5; }
        }
        @keyframes splash-dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
