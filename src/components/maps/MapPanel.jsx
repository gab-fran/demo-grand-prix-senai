import { Navigation, Route } from 'lucide-react';
import Map from './Map';

export default function MapPanel({ title = 'Mapa Operacional' }) {
  return (
    <section className="relative overflow-hidden rounded-xl2 border border-line bg-surface p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-xs text-muted">Visual demonstrativo (100% fictício)</span>
      </div>

      <div className="relative h-80">
        <Map />

        <div className="absolute left-4 top-4 rounded-lg border border-line/80 bg-surface/90 px-3 py-2 text-xs text-muted backdrop-blur-sm">
          <p className="mb-1 font-medium text-text">Legenda</p>
          <div className="space-y-1">
            <p className="flex items-center gap-2"><span className="h-2 w-5 rounded bg-cyan-300" /> Via principal</p>
            <p className="flex items-center gap-2"><span className="h-2 w-5 rounded bg-slate-500" /> Via secundária</p>
            <p className="flex items-center gap-2"><span className="h-2 w-5 rounded bg-blue-900" /> Região de água</p>
            <p className="flex items-center gap-2 text-danger"><Route size={13} /> Rota sugerida</p>
            <p className="flex items-center gap-2 text-info"><Navigation size={13} /> Posição atual</p>
          </div>
        </div>
      </div>
    </section>
  );
}
