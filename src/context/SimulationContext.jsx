import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { streets } from '../components/Map';

const SimulationContext = createContext(null);

const randomStatus = () => {
  const options = ['green', 'yellow', 'red'];
  return options[Math.floor(Math.random() * options.length)];
};

const pointAtPathProgress = (path, progress) => {
  if (!path?.length) return [0, 0];
  if (path.length === 1) return path[0];

  const segments = path.slice(0, -1).map((point, index) => {
    const to = path[index + 1];
    const length = Math.hypot(to[0] - point[0], to[1] - point[1]);
    return { from: point, to, length };
  });

  const totalLength = segments.reduce((sum, segment) => sum + segment.length, 0);
  const targetDistance = totalLength * Math.min(Math.max(progress, 0), 1);

  let walked = 0;
  for (const segment of segments) {
    if (walked + segment.length >= targetDistance) {
      const ratio = (targetDistance - walked) / segment.length;
      return [
        segment.from[0] + (segment.to[0] - segment.from[0]) * ratio,
        segment.from[1] + (segment.to[1] - segment.from[1]) * ratio,
      ];
    }
    walked += segment.length;
  }

  return path[path.length - 1];
};

const fleetPaths = {
  v1: [
    [90, 110],
    [280, 120],
    [420, 120],
    [560, 240],
  ],
  v2: [
    [560, 350],
    [420, 360],
    [280, 360],
    [120, 360],
  ],
  v3: [
    [120, 120],
    [120, 260],
    [280, 360],
    [560, 350],
  ],
};

const busPaths = {
  b1: [
    [90, 110],
    [260, 110],
    [420, 120],
    [560, 240],
    [560, 350],
  ],
  b2: [
    [120, 360],
    [280, 360],
    [280, 240],
    [430, 240],
    [560, 250],
  ],
};

const initialVehicles = [
  { id: 'v1', name: 'CAR-21', progress: 0.2, speed: 0.018, color: '#60a5fa' },
  { id: 'v2', name: 'CAR-19', progress: 0.65, speed: 0.014, color: '#818cf8' },
  { id: 'v3', name: 'CAR-31', progress: 0.4, speed: 0.017, color: '#38bdf8' },
];

const initialBuses = [
  { id: 'b1', name: 'BUS A', progress: 0.1, speed: 0.01, color: '#f59e0b' },
  { id: 'b2', name: 'BUS B', progress: 0.54, speed: 0.008, color: '#22c55e' },
];

const initialTeams = [
  { id: 't1', name: 'Equipe Delta', position: [220, 210] },
  { id: 't2', name: 'Equipe Echo', position: [480, 300] },
];

function SimulationProvider({ children }) {
  const [blockedStreetIds, setBlockedStreetIds] = useState([]);
  const [trafficByStreet, setTrafficByStreet] = useState(() =>
    streets.reduce((acc, street) => ({ ...acc, [street.id]: street.status }), {}),
  );
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [buses, setBuses] = useState(initialBuses);
  const [teams] = useState(initialTeams);
  const [alerts, setAlerts] = useState([
    { id: 'a1', type: 'warning', message: 'Tráfego elevado no Corredor B.' },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTrafficByStreet((current) => {
        const next = { ...current };
        streets.forEach((street) => {
          if (blockedStreetIds.includes(street.id)) {
            next[street.id] = 'blocked';
          } else if (Math.random() > 0.55) {
            next[street.id] = randomStatus();
          }
        });
        return next;
      });
    }, 4500);

    return () => clearInterval(intervalId);
  }, [blockedStreetIds]);

  useEffect(() => {
    const movementId = setInterval(() => {
      setVehicles((current) =>
        current.map((vehicle) => ({
          ...vehicle,
          progress: (vehicle.progress + vehicle.speed) % 1,
        })),
      );

      setBuses((current) =>
        current.map((bus) => ({
          ...bus,
          progress: (bus.progress + bus.speed) % 1,
        })),
      );
    }, 900);

    return () => clearInterval(movementId);
  }, []);

  useEffect(() => {
    const alertsId = setInterval(() => {
      const generatedAlerts = [
        'Acidente leve próximo à Portaria.',
        'Via Norte com retenção temporária.',
        'Equipe de manutenção deslocada para Oficina.',
        'Bloqueio preventivo em corredor secundário.',
      ];

      if (Math.random() < 0.6) {
        setAlerts((current) => {
          const nextAlert = {
            id: `a-${Date.now()}`,
            type: Math.random() > 0.5 ? 'danger' : 'info',
            message: generatedAlerts[Math.floor(Math.random() * generatedAlerts.length)],
          };
          return [nextAlert, ...current].slice(0, 6);
        });
      }
    }, 7000);

    return () => clearInterval(alertsId);
  }, []);

  const toggleStreetBlock = (streetId) => {
    setBlockedStreetIds((current) => {
      const isBlocked = current.includes(streetId);
      const nextBlocked = isBlocked ? current.filter((item) => item !== streetId) : [...current, streetId];

      setTrafficByStreet((traffic) => ({
        ...traffic,
        [streetId]: isBlocked ? randomStatus() : 'blocked',
      }));

      return nextBlocked;
    });
  };

  const addManualAlert = (message) => {
    setAlerts((current) => [{ id: `m-${Date.now()}`, type: 'danger', message }, ...current].slice(0, 6));
  };

  const movingVehicles = useMemo(
    () =>
      vehicles.map((vehicle) => ({
        id: vehicle.id,
        name: vehicle.name,
        color: vehicle.color,
        position: pointAtPathProgress(fleetPaths[vehicle.id], vehicle.progress),
      })),
    [vehicles],
  );

  const movingBuses = useMemo(
    () =>
      buses.map((bus) => ({
        id: bus.id,
        name: bus.name,
        color: bus.color,
        position: pointAtPathProgress(busPaths[bus.id], bus.progress),
      })),
    [buses],
  );

  const value = {
    blockedStreetIds,
    toggleStreetBlock,
    trafficByStreet,
    movingVehicles,
    movingBuses,
    teams,
    alerts,
    addManualAlert,
  };

  return <SimulationContext.Provider value={value}>{children}</SimulationContext.Provider>;
}

const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within SimulationProvider');
  }
  return context;
};

export { SimulationProvider, useSimulation };
