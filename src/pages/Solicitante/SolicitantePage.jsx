import AppLayout from '../../components/layout/AppLayout';
import MapPanel from '../../components/maps/MapPanel';
import PrimaryButton from '../../components/ui/PrimaryButton';
import SecondaryButton from '../../components/ui/SecondaryButton';
import StatusBadge from '../../components/ui/StatusBadge';
import VehicleCard from '../../components/cards/VehicleCard';
import NotificationPanel from '../../components/ui/NotificationPanel';
import { alerts, frequentDestinations, vehicles } from '../../data/mockData';

const menuItems = [
  { to: '/solicitante', label: 'Painel' },
  { to: '/login', label: 'Sair' },
];

export default function SolicitantePage() {
  return (
    <AppLayout menuItems={menuItems}>
      <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <MapPanel title="Mapa de Veículos Próximos" />
        <div className="space-y-4 rounded-xl2 border border-line bg-surface p-4">
          <h3 className="font-semibold">Solicitação atual</h3>
          <p className="text-sm text-muted">ETA estimado</p>
          <p className="text-3xl font-bold">07 min</p>
          <StatusBadge status="IN_TRANSIT" />
          <div className="grid gap-2 sm:grid-cols-2">
            <PrimaryButton>Chamar veículo</PrimaryButton>
            <SecondaryButton>Solicitar equipamento</SecondaryButton>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-xl2 border border-line bg-surface p-4 lg:col-span-2">
          <h3 className="mb-3 font-semibold">Destinos frequentes</h3>
          <div className="flex flex-wrap gap-2">
            {frequentDestinations.map((destination) => (
              <span key={destination} className="rounded-full border border-line px-3 py-1 text-xs text-zinc-300">
                {destination}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">Localização atual: Pátio Leste, setor C.</p>
        </article>
        <NotificationPanel alerts={alerts} />
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </section>
    </AppLayout>
  );
}
