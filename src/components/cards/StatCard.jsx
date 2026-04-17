export default function StatCard({ title, value, trend }) {
  return (
    <article className="rounded-xl2 border border-line bg-surface p-4 shadow-panel transition hover:-translate-y-0.5">
      <p className="text-xs uppercase tracking-wide text-muted">{title}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-primary">{trend}</p>
    </article>
  );
}
