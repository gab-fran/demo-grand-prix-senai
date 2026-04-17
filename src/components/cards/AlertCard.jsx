const levelStyle = {
  warning: 'border-warning/40 bg-warning/10',
  danger: 'border-danger/40 bg-danger/10',
  info: 'border-info/40 bg-info/10',
};

export default function AlertCard({ alert }) {
  return (
    <article className={`rounded-xl2 border p-4 ${levelStyle[alert.level] || levelStyle.info}`}>
      <p className="font-semibold">{alert.title}</p>
      <p className="mt-1 text-sm text-zinc-300">{alert.detail}</p>
    </article>
  );
}
