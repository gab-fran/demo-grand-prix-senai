import { Navigation, TriangleAlert, Truck } from 'lucide-react';

export default function MapPanel({ title = 'Mapa Operacional' }) {
  return (
    <section className="relative overflow-hidden rounded-xl2 border border-line bg-surface p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-xs text-muted">Atualização em tempo real</span>
      </div>
      <div className="relative h-72 rounded-xl2 border border-line bg-gradient-to-b from-zinc-900 to-zinc-800">
        <div className="absolute left-8 top-12 text-info"><Truck size={18} /></div>
        <div className="absolute left-1/2 top-1/3 text-warning"><Navigation size={18} /></div>
        <div className="absolute bottom-16 right-10 text-danger"><TriangleAlert size={18} /></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,126,122,0.18),transparent_40%)]" />
      </div>
    </section>
  );
}
