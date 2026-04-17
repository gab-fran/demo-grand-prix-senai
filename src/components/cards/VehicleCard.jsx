import StatusBadge from '../ui/StatusBadge';

export default function VehicleCard({ vehicle }) {
  return (
    <article className="group rounded-2xl border border-line bg-surface p-5 transition-all hover:border-primary/30 hover:bg-line/20">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary/80 transition-colors group-hover:text-primary">Veículo</p>
          <p className="text-lg font-black tracking-tight text-appText">{vehicle.id}</p>
          <p className="text-xs text-muted">{vehicle.type}</p>
        </div>
        <StatusBadge status={vehicle.status} />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-line/50 pt-4">
        <div>
          <p className="text-[10px] uppercase text-muted">Motorista</p>
          <p className="text-xs font-medium text-appText">{vehicle.driver}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase text-muted">Localização</p>
          <p className="text-xs font-medium text-appText">{vehicle.location}</p>
        </div>
      </div>
    </article>
  );
}
