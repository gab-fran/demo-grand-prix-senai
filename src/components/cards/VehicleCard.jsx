import StatusBadge from '../ui/StatusBadge';

export default function VehicleCard({ vehicle }) {
  return (
    <article className="rounded-xl2 border border-line bg-surface p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold">{vehicle.id}</p>
          <p className="text-sm text-muted">{vehicle.type}</p>
        </div>
        <StatusBadge status={vehicle.status} />
      </div>
      <p className="mt-3 text-sm text-zinc-300">Motorista: {vehicle.driver}</p>
      <p className="text-sm text-zinc-300">Localização: {vehicle.location}</p>
    </article>
  );
}
