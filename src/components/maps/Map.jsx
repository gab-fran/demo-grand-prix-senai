const PORT_POINTS = [
  { id: 'terminal', label: 'Terminal Orion', x: 285, y: 118, color: '#22c55e' },
  { id: 'carga', label: 'Área de Carga Sul', x: 228, y: 176, color: '#f59e0b' },
  { id: 'armazens', label: 'Armazéns A1–A4', x: 152, y: 238, color: '#60a5fa' },
  { id: 'entrada', label: 'Portão de Entrada', x: 84, y: 292, color: '#34d399' },
  { id: 'saida', label: 'Portão de Saída', x: 378, y: 274, color: '#f97316' },
  { id: 'admin', label: 'Área Administrativa', x: 174, y: 136, color: '#a78bfa' },
  { id: 'estacionamento', label: 'Estac. Caminhões', x: 106, y: 198, color: '#38bdf8' },
  { id: 'inspecao', label: 'Área de Inspeção', x: 198, y: 280, color: '#f43f5e' },
  { id: 'torre', label: 'Torre de Controle', x: 252, y: 84, color: '#fb7185' },
];

/**
 * Mapa visual fictício de porto para protótipo.
 * Não usa nenhuma API externa: todo desenho é renderizado em SVG.
 */
export default function Map({ className = '' }) {
  return (
    <div className={`relative h-full w-full overflow-hidden rounded-xl2 border border-line bg-[#05080e] ${className}`.trim()}>
      <svg viewBox="0 0 460 320" className="h-full w-full" role="img" aria-label="Mapa visual fictício de porto">
        <defs>
          <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f2f51" />
            <stop offset="100%" stopColor="#0b1f36" />
          </linearGradient>
          <linearGradient id="mainRoad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Fundo do terreno */}
        <rect width="460" height="320" fill="#070b14" />

        {/* Região de água / docas */}
        <path d="M286 0 H460 V320 H250 C280 270 290 220 286 0 Z" fill="url(#waterGradient)" opacity="0.95" />
        <path d="M292 22 C320 110 322 180 292 300" stroke="#155e75" strokeWidth="1.5" strokeDasharray="4 7" opacity="0.6" fill="none" />

        {/* Vias principais */}
        <g fill="none" stroke="url(#mainRoad)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)">
          <path d="M50 292 C118 252 144 220 188 160 C220 116 258 88 302 72" />
          <path d="M58 84 C120 114 158 132 198 168 C232 196 280 228 342 262" />
        </g>

        {/* Vias secundárias */}
        <g fill="none" stroke="#64748b" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
          <path d="M94 250 C134 228 166 210 208 170" />
          <path d="M152 96 C170 116 190 136 220 158" />
          <path d="M116 180 C156 182 180 182 236 172" />
          <path d="M196 278 C228 256 260 238 300 234" />
          <path d="M330 134 C294 150 270 168 240 196" />
        </g>

        {/* Acessos menores */}
        <g fill="none" stroke="#334155" strokeWidth="2.8" strokeLinecap="round" opacity="0.95">
          <path d="M70 300 L70 266" />
          <path d="M122 140 L108 162" />
          <path d="M184 248 L170 268" />
          <path d="M232 142 L252 124" />
          <path d="M312 252 L334 240" />
          <path d="M278 112 L300 102" />
        </g>

        {/* Rota simulada estilo Waze */}
        <path
          d="M78 292 C120 266 152 230 188 160 C212 120 246 96 286 84"
          stroke="#f43f5e"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="10 8"
          fill="none"
        />

        {/* Setas de direção */}
        <g fill="#e2e8f0" opacity="0.7">
          <path d="M141 211 l12 2 -8 9 z" />
          <path d="M214 164 l11 -4 -1 12 z" />
          <path d="M267 102 l12 -1 -5 11 z" />
        </g>

        {/* Docas / navios fictícios */}
        <g>
          <rect x="306" y="58" width="88" height="18" rx="4" fill="#0b1220" stroke="#334155" />
          <rect x="318" y="112" width="96" height="18" rx="4" fill="#0b1220" stroke="#334155" />
          <rect x="302" y="166" width="102" height="18" rx="4" fill="#0b1220" stroke="#334155" />
        </g>

        {/* Pontos de interesse do porto */}
        <g>
          {PORT_POINTS.map((point) => (
            <g key={point.id}>
              <circle cx={point.x} cy={point.y} r="7" fill={point.color} />
              <circle cx={point.x} cy={point.y} r="12" stroke={point.color} strokeWidth="1.5" fill="none" opacity="0.35" />
              <text x={point.x + 12} y={point.y - 10} fill="#cbd5e1" fontSize="10.5" fontWeight="600" letterSpacing="0.2">
                {point.label}
              </text>
            </g>
          ))}
        </g>

        {/* Marcador de localização atual */}
        <g transform="translate(220 178)">
          <path d="M0 -13 L8 11 L0 7 L-8 11 Z" fill="#f8fafc" />
          <circle cx="0" cy="0" r="4" fill="#22d3ee" />
        </g>
      </svg>
    </div>
  );
}
