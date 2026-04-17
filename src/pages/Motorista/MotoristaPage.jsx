import AppLayout from '../../components/layout/AppLayout';
import MapPanel from '../../components/maps/MapPanel';
import PrimaryButton from '../../components/ui/PrimaryButton';
import SecondaryButton from '../../components/ui/SecondaryButton';
import AlertCard from '../../components/cards/AlertCard';
import { alerts } from '../../data/mockData';

const menuItems = [
  { to: '/motorista', label: 'Missão Atual' },
  { to: '/login', label: 'Sair' },
];

export default function MotoristaPage() {
  return (
    <AppLayout menuItems={menuItems}>
      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <article className="space-y-4 rounded-xl2 border border-line bg-surface p-4">
          <h3 className="font-semibold">Missão atual #REQ-8892</h3>
          <p className="text-sm text-zinc-300">Origem: Doca 3</p>
          <p className="text-sm text-zinc-300">Destino: Pátio 7</p>
          <div className="grid gap-2 sm:grid-cols-3">
            <PrimaryButton>Aceitar missão</PrimaryButton>
            <SecondaryButton>Iniciar</SecondaryButton>
            <SecondaryButton>Concluir</SecondaryButton>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <SecondaryButton>Pausa</SecondaryButton>
            <SecondaryButton>Disponível</SecondaryButton>
          </div>
        </article>
        <article className="rounded-xl2 border border-line bg-surface p-4">
          <h3 className="font-semibold">Status do veículo</h3>
          <p className="mt-2 text-sm text-zinc-300">Combustível: 72%</p>
          <p className="text-sm text-zinc-300">Checklist: OK</p>
          <p className="text-sm text-zinc-300">Próxima manutenção: 12h</p>
        </article>
      </section>
      <MapPanel title="Rota e Bloqueios" />
      <section className="grid gap-4 md:grid-cols-2">
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </section>
    </AppLayout>
  );
}
