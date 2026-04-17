export default function StatCard({ title, value, trend }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5">
      <div className="absolute top-0 right-0 p-3 opacity-10 transition-opacity group-hover:opacity-20">
        <div className="h-16 w-16 rounded-full border-4 border-primary" />
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted group-hover:text-primary transition-colors">{title}</p>
      <div className="mt-3 flex items-baseline gap-2">
        <p className="text-3xl font-black text-appText tracking-tighter">{value}</p>
        <span className="text-xs font-semibold text-accent">{trend}</span>
      </div>
      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-line">
        <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover:w-full" />
      </div>
    </article>
  );
}
