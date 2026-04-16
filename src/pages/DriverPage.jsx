import { useEffect, useMemo, useState } from 'react';
import AppLayout from '../layouts/AppLayout';
import { useSimulation } from '../context/SimulationContext';

const rideRequest = {
  id: 'ride-1',
  origin: 'Armazém',
  destination: 'Portaria',
  originPoint: [90, 110],
  destinationPoint: [560, 350],
};

const distanceBetween = (from, to) => Math.hypot(to[0] - from[0], to[1] - from[1]);

const buildDriverRoute = (blockedStreetIds) => {
  const detourRequired = blockedStreetIds.includes('s4') || blockedStreetIds.includes('s5');
  if (detourRequired) {
    return [
      rideRequest.originPoint,
      [120, 260],
      [280, 390],
      rideRequest.destinationPoint,
    ];
  }

  return [
    rideRequest.originPoint,
    [280, 190],
    [420, 240],
    rideRequest.destinationPoint,
  ];
};

function DriverPage() {
  const {
    blockedStreetIds,
    toggleStreetBlock,
    trafficByStreet,
    movingBuses,
    alerts,
    addManualAlert,
  } = useSimulation();

  const [driverStatus, setDriverStatus] = useState('Disponível');
  const [acceptedRide, setAcceptedRide] = useState(false);
  const [blockMode, setBlockMode] = useState(false);
  const [routePath, setRoutePath] = useState(null);

  const routeMetrics = useMemo(() => {
    if (!routePath || routePath.length < 2) return null;
    let totalDistance = 0;
    for (let index = 0; index < routePath.length - 1; index += 1) {
      totalDistance += distanceBetween(routePath[index], routePath[index + 1]);
    }

    return {
      distanceKm: (totalDistance / 95).toFixed(1),
      etaMin: Math.round(totalDistance / 20),
    };
  }, [routePath]);

  const handleAcceptRide = () => {
    setAcceptedRide(true);
    setRoutePath(buildDriverRoute(blockedStreetIds));
  };

  const handleRejectRide = () => {
    setAcceptedRide(false);
    setRoutePath(null);
  };

  useEffect(() => {
    if (!acceptedRide) return;
    setRoutePath(buildDriverRoute(blockedStreetIds));
  }, [blockedStreetIds, acceptedRide]);

  return (
    <AppLayout
      title="Painel do Motorista"
      subtitle="Aceite corridas, reporte incidentes e acompanhe sua rota automaticamente recalculada."
      mapProps={{
        routePath,
        buses: movingBuses,
        trafficByStreet,
        blockedStreetIds,
        blockMode,
        onStreetClick: blockMode ? toggleStreetBlock : undefined,
        alerts,
      }}
    >
      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <article className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-medium">Corrida disponível</h3>
              <p className="mt-1 text-sm text-zinc-400">Origem: {rideRequest.origin}</p>
              <p className="text-sm text-zinc-400">Destino: {rideRequest.destination}</p>
            </div>
            <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">{driverStatus}</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleAcceptRide}
              className="rounded-md bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-900"
            >
              Aceitar
            </button>
            <button
              type="button"
              onClick={handleRejectRide}
              className="rounded-md bg-rose-400 px-4 py-2 text-sm font-semibold text-zinc-900"
            >
              Recusar
            </button>
            <button
              type="button"
              onClick={() => setDriverStatus((current) => (current === 'Disponível' ? 'Pausa' : 'Disponível'))}
              className="rounded-md border border-zinc-700 px-4 py-2 text-sm"
            >
              Alternar status
            </button>
          </div>

          {routeMetrics ? (
            <div className="mt-4 rounded-md border border-zinc-800 bg-zinc-950 p-3 text-sm">
              <p>
                Tempo estimado: <span className="font-semibold text-cyan-200">{routeMetrics.etaMin} min</span>
              </p>
              <p>
                Distância: <span className="font-semibold text-cyan-200">{routeMetrics.distanceKm} km</span>
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-zinc-400">Aceite uma corrida para visualizar rota, tempo e distância.</p>
          )}
        </article>

        <aside className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <button
            type="button"
            onClick={() => {
              addManualAlert('Incidente reportado pelo motorista em rota ativa.');
            }}
            className="w-full rounded-md bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-900"
          >
            Reportar incidente
          </button>

          <button
            type="button"
            onClick={() => setBlockMode((current) => !current)}
            className="w-full rounded-md border border-purple-500 px-4 py-2 text-sm font-semibold text-purple-200"
          >
            {blockMode ? 'Sair do modo bloqueio' : 'Modo bloqueio'}
          </button>

          <div className="rounded-md border border-zinc-800 bg-zinc-950 p-3 text-sm">
            <p className="font-medium">Bloqueios ativos</p>
            <p className="mt-1 text-zinc-400">
              {blockedStreetIds.length > 0 ? `${blockedStreetIds.length} via(s) bloqueada(s)` : 'Nenhuma via bloqueada'}
            </p>
            {blockedStreetIds.length > 0 ? <p className="mt-1 text-xs text-purple-200">Rotas estão sendo recalculadas automaticamente.</p> : null}
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}

export default DriverPage;
