import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { CnasLogo } from './ui/CnasLogo';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'cnas' && password === '17') {
      setError('');
      onLoginSuccess();
    } else {
      setError('Nom d\'utilisateur ou mot de passe incorrect.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-sm z-10 animate-fade-in">
        <div className="text-center mb-6">
           <div className="mx-auto mb-4">
               <CnasLogo className="w-24 h-24 mx-auto" />
           </div>
          <h2 className="text-2xl font-bold text-slate-800">Authentification</h2>
          <p className="text-sm text-slate-500 mt-1">Veuillez vous connecter pour continuer.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-700">Nom d'utilisateur</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                         focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-slate-900"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                         focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-slate-900"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <div>
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};