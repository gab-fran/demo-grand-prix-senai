import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Buscar...' }) {
  return (
    <div className="flex items-center gap-2 rounded-xl2 border border-line bg-surface px-3 py-2">
      <Search size={16} className="text-muted" />
      <input
        className="focus-ring w-full bg-transparent text-sm placeholder:text-muted"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
