export const mockUserById = {
  req001: { id: 'u-01', name: 'Carlos Nunes', role: 'SOLICITANTE', status: 'Operacional' },
  drv001: { id: 'u-02', name: 'Marta Silva', role: 'MOTORISTA', status: 'Disponível' },
  ctr001: { id: 'u-03', name: 'André Costa', role: 'CENTRAL', status: 'Monitorando' },
};

export const kpis = [
  { title: 'Solicitações Ativas', value: '28', trend: '+8%' },
  { title: 'Veículos Disponíveis', value: '16', trend: '-3%' },
  { title: 'Vias Bloqueadas', value: '4', trend: '+1' },
  { title: 'Tempo Médio de Espera', value: '6m', trend: '-12%' },
];

export const vehicles = [
  { id: 'BUS-100', type: 'Ônibus Interno', driver: 'Marta Silva', status: 'AVAILABLE', location: 'Gate A2' },
  { id: 'VAN-054', type: 'Van Técnica', driver: 'Paulo Dias', status: 'IN_TRANSIT', location: 'Pátio 7' },
  { id: 'TRK-302', type: 'Caminhão Leve', driver: 'José Lima', status: 'BUSY', location: 'Doca 3' },
];

export const requests = [
  { id: 'REQ-8892', requester: 'Equipe Docagem', origin: 'Doca 3', destination: 'Pátio 7', status: 'BUSY', priority: 'Alta' },
  { id: 'REQ-8897', requester: 'Segurança', origin: 'Portão Sul', destination: 'Administração', status: 'AVAILABLE', priority: 'Média' },
];

export const alerts = [
  { id: 1, title: 'Bloqueio parcial via Norte', detail: 'Manutenção prevista até 18:30', level: 'warning' },
  { id: 2, title: 'Ocorrência mecânica', detail: 'VAN-054 com parada assistida no Pátio 4', level: 'danger' },
];

export const frequentDestinations = ['Doca 3', 'Pátio 7', 'Terminal Interno', 'Administração', 'Portão Sul'];

export const roads = [
  { name: 'Via Norte', status: 'BLOCKED' },
  { name: 'Corredor Leste', status: 'IN_TRANSIT' },
  { name: 'Acesso Doca Central', status: 'AVAILABLE' },
];

export const busLines = [
  {
    id: 'L-01',
    name: 'Linha Norte (Circular)',
    color: '#3B82F6',
    schedules: ['06:00', '08:30', '11:45', '14:00', '17:30', '20:00'],
    nextAt: '08:30',
    status: 'ON_TIME',
  },
  {
    id: 'L-02',
    name: 'Linha Sul (Terminal)',
    color: '#10B981',
    schedules: ['07:15', '09:45', '13:00', '16:15', '19:30', '22:00'],
    nextAt: '09:45',
    status: 'DELAYED',
  },
  {
    id: 'L-03',
    name: 'Expresso Doca',
    color: '#F59E0B',
    schedules: ['06:30', '07:30', '08:30', '16:00', '17:00', '18:00'],
    nextAt: '16:00',
    status: 'ON_TIME',
  },
];
