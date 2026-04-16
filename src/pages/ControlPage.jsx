import { useMemo, useState } from 'react';
import AppLayout from '../layouts/AppLayout';
import { useSimulation } from '../context/SimulationContext';

const controlRequests = [
  { id: 'req-901', from: 'Armazém', to: 'Portaria', priority: 'Alta', status: 'Em despacho' },
  { id: 'req-902', from: 'Oficina', to: 'Portaria', priority: 'Média', status: 'Aguardando' },
  { id: 'req-903', from: 'Portaria', to: 'Armazém', priority: 'Baixa', status: 'Concluída' },
  { id: 'req-904', from: 'Armazém', to: 'Oficina', priority: 'Média', status: 'Em rota' },
];

function ControlPage() {
  const {
    blockedStreetIds,
    toggleStreetBlock,
    trafficByStreet,
    movingVehicles,
    movingBuses,
    teams,
    alerts,
  } = useSimulation();

  const [blockMode, setBlockMode] = useState(false);

  const kpis = useMemo(() => {
    const averageTime = 12 + blockedStreetIds.length * 2;
    const freeVehicles = Math.max(movingVehicles.length - blockedStreetIds.length, 0);

    return {
      averageTime,
      freeVehicles,
      activeIncidents: blockedStreetIds.length + alerts.filter((alert) => alert.type === 'danger').length,
    };
  }, [blockedStreetIds.length, movingVehicles.length, alerts]);

  return (
    <AppLayout
      title="Central de Controle"
      subtitle="Visão operacional em tempo real, bloqueios de vias e monitoramento inteligente da frota."
      mapProps={{
        vehicles: movingVehicles,
        buses: movingBuses,
        teams,
        trafficByStreet,
        blockedStreetIds,
        blockMode,
        onStreetClick: blockMode ? toggleStreetBlock : undefined,
        alerts,
      }}
      containerClassName="max-w-7xl"
    >
      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <section className="space-y-4">
          <article className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-medium">Solicitações em tempo real</h3>
              <button
                type="button"
                onClick={() => setBlockMode((current) => !current)}
                className="rounded-md border border-purple-500 px-3 py-2 text-xs font-semibold text-purple-200"
              >
                {blockMode ? 'Sair do modo bloqueio' : 'Modo bloqueio'}
              </button>
            </div>

            <div className="mt-3 space-y-2">
              {controlRequests.map((request) => (
                <div key={request.id} className="rounded-md border border-zinc-700 bg-zinc-950 p-3 text-sm">
                  <p className="font-semibold text-zinc-100">{request.id}</p>
                  <p className="text-zinc-400">
                    {request.from} → {request.to}
                  </p>
                  <div className="mt-1 flex gap-2 text-xs">
                    <span className="rounded bg-zinc-800 px-2 py-0.5">Prioridade: {request.priority}</span>
                    <span className="rounded bg-zinc-800 px-2 py-0.5">{request.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <h3 className="text-lg font-medium">Alertas inteligentes</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              {alerts.slice(0, 5).map((alert) => (
                <li key={alert.id} className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2">
                  {alert.message}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <aside className="space-y-4">
          <article className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <h3 className="text-lg font-medium">KPIs operacionais</h3>
            <div className="mt-3 grid gap-2 text-sm">
              <div className="rounded-md border border-zinc-700 bg-zinc-950 p-3">
                Tempo médio de atendimento: <span className="font-semibold text-cyan-200">{kpis.averageTime} min</span>
              </div>
              <div className="rounded-md border border-zinc-700 bg-zinc-950 p-3">
                Veículos livres: <span className="font-semibold text-emerald-200">{kpis.freeVehicles}</span>
              </div>
              <div className="rounded-md border border-zinc-700 bg-zinc-950 p-3">
                Incidentes ativos: <span className="font-semibold text-rose-200">{kpis.activeIncidents}</span>
              </div>
            </div>
          </article>

          <article className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-300">
            <h3 className="text-lg font-medium">Controle de vias</h3>
            <p className="mt-2 text-zinc-400">
              Com o modo bloqueio ativo, clique em qualquer rua no mapa para bloquear/desbloquear.
            </p>
            <p className="mt-2">
              Bloqueios ativos: <span className="font-semibold text-purple-200">{blockedStreetIds.length}</span>
            </p>
            <p className="mt-2 text-xs text-zinc-500">Rotas são recalculadas automaticamente de forma simulada para evitar trechos bloqueados.</p>
          </article>
        </aside>
      </div>
    </AppLayout>
  );
}

export default ControlPage;
