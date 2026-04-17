import { useState } from 'react';
import { frequentDestinations } from '../../data/mockData';
import PrimaryButton from '../ui/PrimaryButton';
import SecondaryButton from '../ui/SecondaryButton';

export default function TravelCalculator() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [result, setResult] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false);

  const calculateTime = () => {
    if (!origin || !destination) return;
    if (origin === destination) {
      setResult(0);
      return;
    }

    // Deterministic simulation based on indices
    const oIdx = frequentDestinations.indexOf(origin);
    const dIdx = frequentDestinations.indexOf(destination);
    const diff = Math.abs(oIdx - dIdx);
    const simulatedTime = diff * 4 + 5; // 5 min base + 4 min per "step"

    setResult(simulatedTime);
  };

  const handleRequest = () => {
    setIsRequesting(true);
    // Simulate request initiation
    setTimeout(() => {
      alert(`Solicitação confirmada de ${origin} para ${destination}!`);
      setIsRequesting(false);
    }, 1500);
  };

  return (
    <article className="space-y-4 rounded-xl2 border border-line bg-surface p-4">
      <h3 className="font-semibold text-appText text-lg">Nova Solicitação</h3>
      
      <div className="space-y-4">
        <div className="grid gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted">A partir de (Origem)</label>
            <select
              value={origin}
              onChange={(e) => {
                setOrigin(e.target.value);
                setResult(null);
              }}
              className="w-full rounded-lg border border-line bg-app p-2.5 text-sm text-appText outline-none focus:border-accent transition-colors"
            >
              <option value="">Selecione a origem</option>
              {frequentDestinations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted">Para (Destino)</label>
            <select
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setResult(null);
              }}
              className="w-full rounded-lg border border-line bg-app p-2.5 text-sm text-appText outline-none focus:border-accent transition-colors"
            >
              <option value="">Selecione o destino</option>
              {frequentDestinations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        <PrimaryButton 
          onClick={calculateTime} 
          disabled={!origin || !destination || result !== null}
          className="w-full"
        >
          {result !== null ? 'Percurso Simulado' : 'Simular Percurso'}
        </PrimaryButton>
      </div>

      {result !== null && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-4 pt-4 border-t border-line">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted font-medium uppercase tracking-wider">Tempo estimado</p>
              <p className="text-3xl font-bold text-accent">{result} min</p>
            </div>
          </div>
          
          <div className="grid gap-3">
            <PrimaryButton onClick={handleRequest} disabled={isRequesting}>
              {isRequesting ? 'Processando...' : 'Chamar veículo'}
            </PrimaryButton>
            <SecondaryButton onClick={handleRequest} disabled={isRequesting}>
              Solicitar equipamento
            </SecondaryButton>
          </div>
        </div>
      )}
    </article>
  );
}
