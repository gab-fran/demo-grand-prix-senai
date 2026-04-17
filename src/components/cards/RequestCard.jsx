import StatusBadge from '../ui/StatusBadge';

export default function RequestCard({ request }) {
  return (
    <article className="group rounded-2xl border border-line bg-surface p-5 transition-all hover:border-primary/30 hover:bg-line/20">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary/80 group-hover:text-primary transition-colors">Solicitação</p>
          <p className="text-lg font-black tracking-tight text-appText">{request.id}</p>
          <p className="text-xs text-muted">Solicitante: <span className="text-appText/80">{request.requester}</span></p>
        </div>
        <StatusBadge status={request.status} />
      </div>

      <div className="my-4 flex items-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <div className="h-2 w-2 rounded-full border border-primary bg-primary/20" />
          <div className="h-4 w-[1px] bg-line" />
          <div className="h-2 w-2 rounded-full bg-accent" />
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-xs font-medium text-appText/80">{request.origin}</p>
          <p className="text-xs font-medium text-appText/80">{request.destination}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line/50 pt-4">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-accent/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent border border-accent/20">
          Prioridade {request.priority}
        </span>
        <button className="text-xs font-bold text-primary hover:underline">Ver Detalhes</button>
      </div>
    </article>
  );
}
