import AlertCard from '../cards/AlertCard';

export default function NotificationPanel({ alerts }) {
  return (
    <section className="space-y-3 rounded-xl2 border border-line bg-surface p-4">
      <h3 className="font-semibold">Alertas e Notificações</h3>
      {alerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
    </section>
  );
}
