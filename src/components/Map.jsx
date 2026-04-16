const STREET_STATUS_COLORS = {
  green: '#22c55e',
  yellow: '#facc15',
  red: '#ef4444',
  blocked: '#a855f7',
};

const streets = [
  { id: 's1', from: [80, 120], to: [420, 120], status: 'green', name: 'Via Norte' },
  { id: 's2', from: [120, 90], to: [120, 360], status: 'yellow', name: 'Corredor A' },
  { id: 's3', from: [280, 120], to: [280, 390], status: 'red', name: 'Corredor B' },
  { id: 's4', from: [420, 120], to: [620, 300], status: 'green', name: 'Ligação Leste' },
  { id: 's5', from: [280, 250], to: [560, 250], status: 'yellow', name: 'Acesso Central' },
  { id: 's6', from: [120, 360], to: [560, 360], status: 'red', name: 'Via Sul' },
];

const locations = [
  { id: 'loc-warehouse', name: 'Armazém', x: 90, y: 110, icon: '📦' },
  { id: 'loc-workshop', name: 'Oficina', x: 550, y: 240, icon: '🛠️' },
  { id: 'loc-gate', name: 'Portaria', x: 560, y: 350, icon: '🚪' },
];

const mapEntities = {
  routes: [],
  vehicles: [],
  teams: [],
  buses: [],
};

function StreetLegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2 text-xs text-zinc-300">
      <span className="inline-block h-2.5 w-6 rounded-full" style={{ backgroundColor: color }} />
      <span>{label}</span>
    </div>
  );
}

function pointsToPolyline(points = []) {
  return points.map((point) => `${point[0]},${point[1]}`).join(' ');
}

function Map({
  className = '',
  routePath = null,
  userPosition = null,
  vehicle = null,
  busLines = [],
  buses = [],
  vehicles = [],
  teams = [],
  alerts = [],
  hideLegend = false,
  trafficByStreet = {},
  blockedStreetIds = [],
  blockMode = false,
  onStreetClick,
}) {
  return (
    <div className={`relative h-screen w-full overflow-hidden bg-[#121212] ${className}`}>
      <svg
        viewBox="0 0 700 450"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Mapa operacional interno"
      >
        <rect x="0" y="0" width="700" height="450" fill="#171717" />

        <g opacity="0.16">
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="450" stroke="#2a2a2a" strokeWidth="1" />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 50} x2="700" y2={i * 50} stroke="#2a2a2a" strokeWidth="1" />
          ))}
        </g>

        <g>
          {streets.map((street) => {
            const status = blockedStreetIds.includes(street.id) ? 'blocked' : trafficByStreet[street.id] || street.status;
            return (
              <g key={street.id}>
                <line
                  x1={street.from[0]}
                  y1={street.from[1]}
                  x2={street.to[0]}
                  y2={street.to[1]}
                  stroke="#2c2c2c"
                  strokeWidth="20"
                  strokeLinecap="round"
                />
                <line
                  x1={street.from[0]}
                  y1={street.from[1]}
                  x2={street.to[0]}
                  y2={street.to[1]}
                  stroke={STREET_STATUS_COLORS[status]}
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <line
                  x1={street.from[0]}
                  y1={street.from[1]}
                  x2={street.to[0]}
                  y2={street.to[1]}
                  stroke="transparent"
                  strokeWidth="24"
                  strokeLinecap="round"
                  className={blockMode ? 'cursor-pointer' : 'cursor-default'}
                  onClick={() => onStreetClick?.(street.id)}
                />
              </g>
            );
          })}
        </g>

        {busLines.length > 0 ? (
          <g>
            {busLines.map((line) => (
              <g key={line.id}>
                <polyline
                  points={pointsToPolyline(line.path)}
                  fill="none"
                  stroke={line.color}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="8 6"
                  opacity="0.95"
                />
                <text x={line.path[0][0] + 6} y={line.path[0][1] - 8} fill={line.color} fontSize="12" fontWeight="700">
                  {line.name}
                </text>
              </g>
            ))}
          </g>
        ) : null}

        {routePath ? (
          <g>
            <polyline
              points={pointsToPolyline(routePath)}
              fill="none"
              stroke="#22d3ee"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.25"
            />
            <polyline
              points={pointsToPolyline(routePath)}
              fill="none"
              stroke="#67e8f9"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="12 7"
            />
          </g>
        ) : null}

        <g>
          {locations.map((location) => (
            <g key={location.id} transform={`translate(${location.x}, ${location.y})`}>
              <circle r="18" fill="#1f1f1f" stroke="#3f3f46" strokeWidth="2" />
              <text y="5" textAnchor="middle" fontSize="12">
                {location.icon}
              </text>
              <text y="34" textAnchor="middle" fontSize="12" fill="#f4f4f5" fontWeight="600">
                {location.name}
              </text>
            </g>
          ))}
        </g>

        {teams.map((team) => (
          <g key={team.id} transform={`translate(${team.position[0]}, ${team.position[1]})`}>
            <circle r="10" fill="#f59e0b" stroke="#fff7ed" strokeWidth="2" />
            <text y="4" textAnchor="middle" fontSize="8" fill="#111" fontWeight="800">
              👷
            </text>
            <text y="22" textAnchor="middle" fontSize="10" fill="#f5f5f5" fontWeight="600">
              {team.name}
            </text>
          </g>
        ))}

        {userPosition ? (
          <g transform={`translate(${userPosition[0]}, ${userPosition[1]})`}>
            <circle r="11" fill="#a855f7" stroke="#f5d0fe" strokeWidth="2" />
            <text y="4" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="700">
              VOCÊ
            </text>
          </g>
        ) : null}

        {vehicle ? (
          <g transform={`translate(${vehicle.position[0]}, ${vehicle.position[1]})`}>
            <rect x="-16" y="-10" width="32" height="20" rx="6" fill="#3b82f6" stroke="#dbeafe" strokeWidth="2" />
            <text y="3" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="700">
              🚗
            </text>
          </g>
        ) : null}

        {vehicles.map((item) => (
          <g key={item.id} transform={`translate(${item.position[0]}, ${item.position[1]})`}>
            <rect x="-15" y="-9" width="30" height="18" rx="6" fill={item.color || '#60a5fa'} stroke="#eff6ff" strokeWidth="1.5" />
            <text y="4" textAnchor="middle" fontSize="8" fill="#111" fontWeight="700">
              {item.name || 'CAR'}
            </text>
          </g>
        ))}

        {buses.length > 0 ? (
          <g>
            {buses.map((bus) => (
              <g key={bus.id} transform={`translate(${bus.position[0]}, ${bus.position[1]})`}>
                <rect x="-18" y="-10" width="36" height="20" rx="5" fill={bus.color} stroke="#fafafa" strokeWidth="1.5" />
                <text y="4" textAnchor="middle" fontSize="9" fill="#111" fontWeight="800">
                  {bus.name || 'BUS'}
                </text>
              </g>
            ))}
          </g>
        ) : null}
      </svg>

      {!hideLegend ? (
        <aside className="pointer-events-none absolute left-4 top-4 rounded-lg border border-zinc-700/70 bg-zinc-900/80 p-3 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-200">Status das ruas</p>
          <div className="mt-2 space-y-1.5">
            <StreetLegendItem color={STREET_STATUS_COLORS.green} label="Livre" />
            <StreetLegendItem color={STREET_STATUS_COLORS.yellow} label="Médio" />
            <StreetLegendItem color={STREET_STATUS_COLORS.red} label="Trânsito" />
            <StreetLegendItem color={STREET_STATUS_COLORS.blocked} label="Bloqueada" />
          </div>
        </aside>
      ) : null}

      {alerts.length > 0 ? (
        <aside className="pointer-events-none absolute right-4 top-4 max-w-sm rounded-lg border border-red-400/40 bg-zinc-900/80 p-3 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-200">Alertas operacionais</p>
          <ul className="mt-2 space-y-1 text-xs text-zinc-300">
            {alerts.slice(0, 3).map((alert) => (
              <li key={alert.id}>• {alert.message}</li>
            ))}
          </ul>
        </aside>
      ) : null}

      {blockMode ? (
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-purple-400/70 bg-purple-500/20 px-4 py-2 text-xs font-semibold text-purple-100 backdrop-blur-sm">
          Modo bloqueio ativo: clique em uma rua para bloquear/liberar
        </div>
      ) : null}

      <div className="sr-only">Estrutura futura: {Object.keys(mapEntities).join(', ')}</div>
    </div>
  );
}

export default Map;
export { mapEntities, locations, pointsToPolyline, streets, STREET_STATUS_COLORS };
