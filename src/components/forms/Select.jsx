export default function Select({ label, options = [], ...props }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[10px] font-bold uppercase tracking-widest text-muted">{label}</span>
      <select
        className="w-full rounded-2xl border border-line bg-app px-4 py-3 text-sm text-appText outline-none transition-all duration-300 focus:border-primary/50 focus:ring-4 focus:ring-primary/5 appearance-none cursor-pointer hover:bg-line/20"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-surface">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
