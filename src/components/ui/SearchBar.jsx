import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Buscar...' }) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 transition-all duration-300 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/5">
      <Search size={18} className="text-muted transition-colors group-focus-within:text-primary" />
      <input
        className="w-full bg-transparent text-sm text-appText outline-none placeholder:text-muted/60"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
