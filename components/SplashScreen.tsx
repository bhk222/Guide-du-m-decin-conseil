import React, { useEffect, useState } from 'react';
import { CnasLogo } from './ui/CnasLogo';

interface SplashScreenProps {
  onFinished: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinished }) => {
  const [phase, setPhase] = useState(0);
  // 0 = initial, 1 = logo appears, 2 = text slides in, 3 = bar fills, 4 = fade out

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1600),
      setTimeout(() => setPhase(4), 3200),
      setTimeout(() => onFinished(), 3900),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onFinished]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-700 ease-out ${
        phase >= 4 ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'linear-gradient(170deg, #ffffff 0%, #f0f7ff 30%, #e0f0ff 60%, #f0f7ff 100%)',
        transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-[0.07]"
             style={{ background: 'radial-gradient(circle, #006FB8, transparent 70%)', animation: 'splash-float 6s ease-in-out infinite' }} />
        <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full opacity-[0.05]"
             style={{ background: 'radial-gradient(circle, #006FB8, transparent 70%)', animation: 'splash-float 6s ease-in-out infinite 2s' }} />
        <div className="absolute top-1/4 right-10 w-40 h-40 rounded-full opacity-[0.04]"
             style={{ background: 'radial-gradient(circle, #0ea5e9, transparent 70%)', animation: 'splash-float 5s ease-in-out infinite 1s' }} />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]"
             style={{ backgroundImage: 'radial-gradient(#006FB8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Content container */}
      <div className="relative flex flex-col items-center px-6">

        {/* Logo with entrance animation */}
        <div
          className="transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            transform: phase >= 1 ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(30px)',
            opacity: phase >= 1 ? 1 : 0,
          }}
        >
          {/* Shadow under logo */}
          <div className="absolute -inset-4 rounded-full blur-2xl opacity-20"
               style={{ background: 'radial-gradient(circle, #006FB8, transparent 70%)' }} />
          <CnasLogo className="relative w-36 h-36 sm:w-44 sm:h-44 drop-shadow-lg" />
        </div>

        {/* Divider line */}
        <div className="mt-8 overflow-hidden" style={{ height: '2px' }}>
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: phase >= 2 ? '120px' : '0px',
              background: 'linear-gradient(90deg, transparent, #006FB8, transparent)',
            }}
          />
        </div>

        {/* Title block */}
        <div className="mt-6 text-center">
          {/* CNAS subtitle */}
          <div
            className="transition-all duration-600 ease-out"
            style={{
              transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)',
              opacity: phase >= 2 ? 1 : 0,
              transitionDelay: '0ms',
            }}
          >
            <span className="text-[#006FB8]/60 text-[11px] sm:text-xs font-semibold tracking-[0.35em] uppercase">
              Caisse Nationale des Assurances Sociales
            </span>
          </div>

          {/* Main title */}
          <div
            className="mt-4 transition-all duration-700 ease-out"
            style={{
              transform: phase >= 2 ? 'translateY(0)' : 'translateY(25px)',
              opacity: phase >= 2 ? 1 : 0,
              transitionDelay: '150ms',
            }}
          >
            <h1 className="text-[2rem] sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-none"
                style={{ color: '#1a2942' }}>
              GUIDE DU
            </h1>
          </div>
          <div
            className="transition-all duration-700 ease-out"
            style={{
              transform: phase >= 2 ? 'translateY(0)' : 'translateY(25px)',
              opacity: phase >= 2 ? 1 : 0,
              transitionDelay: '300ms',
            }}
          >
            <h1 className="text-[2rem] sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-none"
                style={{ 
                  background: 'linear-gradient(135deg, #006FB8 0%, #0ea5e9 50%, #006FB8 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: phase >= 2 ? 'splash-shimmer 3s linear infinite' : 'none',
                }}>
              MÉDECIN CONSEIL
            </h1>
          </div>

          {/* Subtitle */}
          <div
            className="transition-all duration-600 ease-out"
            style={{
              transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)',
              opacity: phase >= 2 ? 1 : 0,
              transitionDelay: '450ms',
            }}
          >
            <p className="mt-5 text-slate-400 text-xs sm:text-sm font-normal tracking-wider">
              Système Expert d'Aide à la Décision Médicale
            </p>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-20 sm:bottom-24 w-48 sm:w-56">
        <div className="h-[3px] rounded-full bg-slate-200/60 overflow-hidden">
          <div
            className="h-full rounded-full transition-all ease-out"
            style={{
              width: phase >= 3 ? '100%' : '0%',
              transitionDuration: phase >= 3 ? '1500ms' : '0ms',
              background: 'linear-gradient(90deg, #006FB8, #38bdf8, #006FB8)',
              backgroundSize: '200% 100%',
              animation: phase >= 3 ? 'splash-bar-shimmer 1.5s linear infinite' : 'none',
            }}
          />
        </div>
        <p
          className="mt-3 text-center text-[11px] text-slate-400 font-medium tracking-wider transition-opacity duration-500"
          style={{ opacity: phase >= 3 ? 1 : 0 }}
        >
          Chargement...
        </p>
      </div>

      {/* Version badge */}
      <div
        className="absolute bottom-6 flex items-center gap-2 transition-opacity duration-500"
        style={{ opacity: phase >= 2 ? 0.5 : 0 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span className="text-slate-400 text-[10px] font-medium tracking-widest uppercase">
          v3.3 &mdash; CNAS Algérie
        </span>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes splash-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes splash-shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes splash-bar-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};
