export default function Input({ label, error, ...props }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[10px] font-bold uppercase tracking-widest text-muted">{label}</span>
      <input
        className="w-full rounded-2xl border border-line bg-app px-4 py-3 text-sm text-appText outline-none transition-all duration-300 focus:border-primary/50 focus:ring-4 focus:ring-primary/5 placeholder:text-muted/60"
        {...props}
      />
      {error ? <span className="mt-1 block text-xs font-semibold text-danger">{error}</span> : null}
    </label>
  );
}
