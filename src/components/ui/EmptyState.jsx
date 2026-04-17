export default function EmptyState({ title, description }) {
  return (
    <div className="rounded-xl2 border border-dashed border-line bg-surface p-8 text-center">
      <p className="text-base font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted">{description}</p>
    </div>
  );
}
