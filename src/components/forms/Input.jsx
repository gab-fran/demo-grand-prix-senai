export default function Input({ label, error, ...props }) {
  return (
    <label className="block space-y-2 text-sm">
      <span className="text-zinc-300">{label}</span>
      <input
        className="focus-ring w-full rounded-xl2 border border-line bg-app px-3 py-2.5 text-appText placeholder:text-muted"
        {...props}
      />
      {error ? <span className="text-xs text-danger">{error}</span> : null}
    </label>
  );
}
