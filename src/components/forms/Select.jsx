export default function Select({ label, options = [], ...props }) {
  return (
    <label className="block space-y-2 text-sm">
      <span className="text-zinc-300">{label}</span>
      <select
        className="focus-ring w-full rounded-xl2 border border-line bg-app px-3 py-2.5 text-appText"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
