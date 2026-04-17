import AppLayout from '../../components/layout/AppLayout';
import MapPanel from '../../components/maps/MapPanel';
import PrimaryButton from '../../components/ui/PrimaryButton';
import SecondaryButton from '../../components/ui/SecondaryButton';
import StatusBadge from '../../components/ui/StatusBadge';
import VehicleCard from '../../components/cards/VehicleCard';
import NotificationPanel from '../../components/ui/NotificationPanel';
import TravelCalculator from '../../components/forms/TravelCalculator';
import { Routes, Route } from 'react-router-dom';
import { alerts, frequentDestinations, vehicles, busLines } from '../../data/mockData';

const menuItems = [
  { to: '/solicitante', label: 'Painel' },
  { to: '/solicitante/onibus', label: 'Ônibus' },
  { to: '/login', label: 'Sair' },
];

export default function SolicitantePage() {
  return (
    <AppLayout menuItems={menuItems}>
      <Routes>
        <Route index element={<DashboardView />} />
        <Route path="onibus" element={<BusView />} />
      </Routes>
    </AppLayout>
  );
}

function DashboardView() {
  return (
    <>
      <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <MapPanel title="Mapa de Veículos Próximos" />
        <div className="space-y-4">
          <TravelCalculator />
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
    </>
  );
}

function BusView() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <MapPanel title="Mapa de Rotas de Ônibus" />
        <article className="rounded-xl2 border border-line bg-surface p-6">
          <h3 className="mb-4 text-lg font-semibold">Próximas Partidas</h3>
          <div className="space-y-4">
            {busLines.map((line) => (
              <div key={line.id} className="flex items-center justify-between border-b border-line pb-3 last:border-0 last:pb-0">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: line.color }}></div>
                    <p className="font-medium text-zinc-100">{line.name}</p>
                  </div>
                  <p className="text-xs text-muted">Próximo: {line.nextAt}</p>
                </div>
                <StatusBadge status={line.status} />
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {busLines.map((line) => (
          <article key={line.id} className="rounded-xl2 border border-line bg-surface p-5 transition hover:border-primary/50 shadow-sm shadow-black/20">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-bold text-zinc-100">{line.name}</h4>
              <div className="rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-400">
                Ativo
              </div>
            </div>
            
            <div className="mb-4 space-y-2">
              <p className="text-xs font-semibold uppercase text-zinc-500">Horários</p>
              <div className="flex flex-wrap gap-2">
                {line.schedules.map((time) => (
                  <span key={time} className="rounded bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300 border border-zinc-700">
                    {time}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <SecondaryButton className="text-xs py-2 px-4 w-full sm:w-auto">Ver Rota Inteira</SecondaryButton>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
