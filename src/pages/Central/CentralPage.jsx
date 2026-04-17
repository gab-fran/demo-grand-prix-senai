import { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import MapPanel from '../../components/maps/MapPanel';
import StatCard from '../../components/cards/StatCard';
import VehicleCard from '../../components/cards/VehicleCard';
import RequestCard from '../../components/cards/RequestCard';
import NotificationPanel from '../../components/ui/NotificationPanel';
import DataTable from '../../components/tables/DataTable';
import FilterBar from '../../components/ui/FilterBar';
import SearchBar from '../../components/ui/SearchBar';
import { alerts, kpis, requests, roads as initialRoads, vehicles } from '../../data/mockData';
import BlockRoadModal from '../../components/modals/BlockRoadModal';
import PrimaryButton from '../../components/ui/PrimaryButton';

const menuItems = [
  { to: '/central', label: 'Torre de Controle' },
  { to: '/login', label: 'Sair' },
];

const tableColumns = [
  { key: 'road', label: 'Via' },
  { key: 'status', label: 'Status' },
  { key: 'responsible', label: 'Responsável' },
];

const tableRows = [
  { road: 'Via Norte', status: 'Bloqueada', responsible: 'Manutenção Civil' },
  { road: 'Corredor Leste', status: 'Fluxo parcial', responsible: 'Operações' },
];

export default function CentralPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ status: 'ALL', type: 'ALL', shift: 'ALL' });
  const [roads, setRoads] = useState(initialRoads);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBlockRoad = (blockData) => {
    setRoads((prev) =>
      prev.map((road) =>
        road.name === blockData.roadName
          ? {
              ...road,
              status: blockData.isScheduled ? 'SCHEDULED' : 'BLOCKED',
              reason: blockData.reason,
              until: blockData.endTime ? new Date(blockData.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Indefinido',
            }
          : road
      )
    );
  };

  const filterOptions = [
    {
      key: 'status',
      label: 'Status',
      value: filters.status,
      options: [
        { value: 'ALL', label: 'Todos' },
        { value: 'AVAILABLE', label: 'Disponível' },
        { value: 'BUSY', label: 'Em missão' },
      ],
    },
    {
      key: 'type',
      label: 'Tipo',
      value: filters.type,
      options: [
        { value: 'ALL', label: 'Todos' },
        { value: 'BUS', label: 'Ônibus' },
        { value: 'VAN', label: 'Van' },
      ],
    },
    {
      key: 'shift',
      label: 'Turno',
      value: filters.shift,
      options: [
        { value: 'ALL', label: 'Todos' },
        { value: 'DAY', label: 'Dia' },
        { value: 'NIGHT', label: 'Noite' },
      ],
    },
  ];

  return (
    <AppLayout menuItems={menuItems}>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <StatCard key={kpi.title} {...kpi} />
        ))}
      </section>

      <section className="space-y-4 rounded-xl2 border border-line bg-surface p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <SearchBar value={search} onChange={setSearch} placeholder="Buscar veículo, solicitação ou área" />
        </div>
        <FilterBar
          filters={filterOptions}
          onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <MapPanel title="Visão Macro da Operação" />
        <NotificationPanel alerts={alerts} />
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <div className="space-y-3">
          <h3 className="font-semibold">Veículos</h3>
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold">Solicitações</h3>
          {requests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Vias e bloqueios</h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20"
            >
              + Bloquear Via
            </button>
          </div>
          {roads.map((road) => (
            <article key={road.name} className="relative overflow-hidden rounded-xl2 border border-line bg-surface p-4">
              <div className="flex justify-between">
                <p className="font-medium">{road.name}</p>
                <div className={`h-2 w-2 rounded-full ${road.status === 'BLOCKED' ? 'bg-danger shadow-[0_0_8px_rgba(239,68,68,0.5)]' : road.status === 'SCHEDULED' ? 'bg-warning' : 'bg-success'}`} />
              </div>
              <p className="text-sm text-muted">Status: {road.status === 'BLOCKED' ? 'Bloqueada' : road.status === 'SCHEDULED' ? 'Agendada' : 'Livre'}</p>
              {road.reason && (
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-muted">Motivo: <span className="text-appText">{road.reason}</span></p>
                  <p className="text-xs text-muted">Previsão: <span className="text-appText">{road.until}</span></p>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <BlockRoadModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        roads={roads.filter(r => r.status !== 'BLOCKED')}
        onBlock={handleBlockRoad}
      />

      <DataTable columns={tableColumns} rows={tableRows} />
    </AppLayout>
  );
}
