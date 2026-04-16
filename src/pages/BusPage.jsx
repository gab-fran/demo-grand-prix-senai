import AppLayout from '../layouts/AppLayout';
import { useSimulation } from '../context/SimulationContext';

const busLines = [
  {
    id: 'line-alpha',
    name: 'Linha Alpha',
    color: '#38bdf8',
    path: [
      [90, 110],
      [260, 110],
      [420, 120],
      [560, 240],
      [560, 350],
    ],
    schedules: ['06:30', '07:10', '07:50', '08:30', '09:15'],
  },
  {
    id: 'line-bravo',
    name: 'Linha Bravo',
    color: '#f97316',
    path: [
      [120, 360],
      [280, 360],
      [280, 240],
      [430, 240],
      [560, 250],
    ],
    schedules: ['06:40', '07:20', '08:00', '08:40', '09:25'],
  },
  {
    id: 'line-charlie',
    name: 'Linha Charlie',
    color: '#22c55e',
    path: [
      [120, 120],
      [120, 300],
      [280, 390],
      [460, 360],
      [560, 350],
    ],
    schedules: ['06:50', '07:30', '08:10', '08:55', '09:40'],
  },
];

function BusPage() {
  const { movingBuses, trafficByStreet, blockedStreetIds, alerts } = useSimulation();

  return (
    <AppLayout
      title="Módulo de Ônibus"
      subtitle="Linhas ativas, horários e simulação de deslocamento em mapa operacional."
      mapProps={{ busLines, buses: movingBuses, trafficByStreet, blockedStreetIds, alerts }}
      containerClassName="max-w-7xl"
    >
      <div className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
        <article className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <h3 className="text-lg font-medium">Linhas de ônibus no mapa</h3>
          <p className="mt-2 text-sm text-zinc-400">
            As linhas são desenhadas em SVG e os ônibus se movimentam continuamente para simulação visual da operação.
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {busLines.map((line) => (
              <div key={line.id} className="rounded-md border border-zinc-700 bg-zinc-950 p-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-3 w-6 rounded-full" style={{ backgroundColor: line.color }} />
                  <p className="font-semibold">{line.name}</p>
                </div>
                <p className="mt-2 text-xs text-zinc-400">{line.path.length} pontos no trajeto</p>
              </div>
            ))}
          </div>
        </article>

        <aside className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <h3 className="text-lg font-medium">Painel de horários</h3>
          <div className="mt-3 space-y-3">
            {busLines.map((line) => (
              <div key={line.id} className="rounded-md border border-zinc-700 bg-zinc-950 p-3">
                <p className="text-sm font-semibold" style={{ color: line.color }}>
                  {line.name}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {line.schedules.map((time) => (
                    <span key={`${line.id}-${time}`} className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-200">
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}

export default BusPage;
