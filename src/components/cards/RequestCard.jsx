import StatusBadge from '../ui/StatusBadge';

export default function RequestCard({ request }) {
  return (
    <article className="rounded-xl2 border border-line bg-surface p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold">{request.id}</p>
          <p className="text-sm text-muted">{request.requester}</p>
        </div>
        <StatusBadge status={request.status} />
      </div>
      <p className="mt-2 text-sm">{request.origin} → {request.destination}</p>
      <span className="mt-3 inline-block rounded-full bg-accent/20 px-2 py-1 text-xs text-accent">
        Prioridade {request.priority}
      </span>
    </article>
  );
}
