import { useEffect, useMemo, useState } from 'react';
import AppLayout from '../layouts/AppLayout';
import { locations } from '../components/Map';
import { useSimulation } from '../context/SimulationContext';

const locationOptions = locations.map((item) => item.name);

const findLocationPoint = (name) => {
  const found = locations.find((item) => item.name === name);
  return found ? [found.x, found.y] : null;
};

const buildRoutePath = (originPoint, destinationPoint, blockedStreetIds) => {
  if (!originPoint || !destinationPoint) return null;

  const hasCentralBlock = blockedStreetIds.includes('s5') || blockedStreetIds.includes('s4');
  const middlePoint = hasCentralBlock
    ? [
        Math.min(originPoint[0], destinationPoint[0]) + 60,
        Math.max(originPoint[1], destinationPoint[1]) + 20,
      ]
    : [(originPoint[0] + destinationPoint[0]) / 2, (originPoint[1] + destinationPoint[1]) / 2 - 45];

  return [originPoint, middlePoint, destinationPoint];
};

function RequesterPage() {
  const { blockedStreetIds, trafficByStreet } = useSimulation();
  const [origin, setOrigin] = useState('Armazém');
  const [destination, setDestination] = useState('Portaria');
  const [routePath, setRoutePath] = useState(null);
  const [routeEta, setRouteEta] = useState(null);
  const [vehicleRequestStatus, setVehicleRequestStatus] = useState('Aguardando solicitação');
  const [vehicleEta, setVehicleEta] = useState(null);
  const [vehicle, setVehicle] = useState(null);

  const originPoint = useMemo(() => findLocationPoint(origin), [origin]);
  const destinationPoint = useMemo(() => findLocationPoint(destination), [destination]);

  const handleTraceRoute = () => {
    const newRoute = buildRoutePath(originPoint, destinationPoint, blockedStreetIds);
    setRoutePath(newRoute);
    setRouteEta(Math.floor(Math.random() * 7) + 8 + (blockedStreetIds.length > 0 ? 2 : 0));
    setVehicleRequestStatus('Rota traçada');
    setVehicle(null);
    setVehicleEta(null);
  };

  useEffect(() => {
    if (!routePath) return;
    setRoutePath(buildRoutePath(originPoint, destinationPoint, blockedStreetIds));
  }, [blockedStreetIds, destinationPoint, originPoint]);

  const handleRequestVehicle = () => {
    if (!originPoint) return;

    setVehicle({ position: [550, 240], progress: 0 });
    setVehicleEta(8 + (blockedStreetIds.length > 0 ? 2 : 0));
    setVehicleRequestStatus('Motorista a caminho');
  };

  useEffect(() => {
    if (!vehicle || !originPoint) return undefined;

    const intervalId = setInterval(() => {
      setVehicle((previousVehicle) => {
        if (!previousVehicle) return previousVehicle;

        const nextProgress = Math.min(previousVehicle.progress + 0.08, 1);
        const nextPosition = [
          550 + (originPoint[0] - 550) * nextProgress,
          240 + (originPoint[1] - 240) * nextProgress,
        ];

        if (nextProgress >= 1) {
          setVehicleRequestStatus('Motorista chegou ao ponto de embarque');
          setVehicleEta(0);
          return { ...previousVehicle, progress: 1, position: nextPosition };
        }

        setVehicleEta((currentEta) => (currentEta === null ? null : Math.max(currentEta - 1, 1)));

        return { ...previousVehicle, progress: nextProgress, position: nextPosition };
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [vehicle, originPoint]);

  return (
    <AppLayout
      title="Painel do Solicitante"
      subtitle="Trace rotas, solicite veículos e acompanhe chegada em tempo real."
      mapProps={{ routePath, userPosition: originPoint, vehicle, trafficByStreet, blockedStreetIds }}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <h3 className="text-lg font-medium">Parte 1 — Traçar rota</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block text-zinc-400">Origem</span>
              <select
                value={origin}
                onChange={(event) => setOrigin(event.target.value)}
                className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2"
              >
                {locationOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm">
              <span className="mb-1 block text-zinc-400">Destino</span>
              <select
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2"
              >
                {locationOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            type="button"
            onClick={handleTraceRoute}
            className="mt-4 rounded-md bg-cyan-300 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-cyan-200"
          >
            Traçar rota
          </button>

          <p className="mt-3 text-sm text-zinc-300">
            ETA simulado: <span className="font-semibold text-cyan-200">{routeEta ? `${routeEta} min` : '--'}</span>
          </p>
        </article>

        <article className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <h3 className="text-lg font-medium">Parte 2 — Solicitar veículo</h3>
          <p className="mt-2 text-sm text-zinc-400">Dispara criação de veículo no mapa e animação até sua posição.</p>
          <button
            type="button"
            onClick={handleRequestVehicle}
            disabled={!routePath}
            className="mt-4 rounded-md bg-blue-400 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Solicitar veículo
          </button>

          <div className="mt-4 space-y-2 rounded-md border border-zinc-800 bg-zinc-950 p-3 text-sm">
            <p>
              Status: <span className="font-semibold text-zinc-100">{vehicleRequestStatus}</span>
            </p>
            <p>
              ETA motorista: <span className="font-semibold text-blue-200">{vehicleEta !== null ? `${vehicleEta} min` : '--'}</span>
            </p>
          </div>
        </article>
      </div>
    </AppLayout>
  );
}

export default RequesterPage;
