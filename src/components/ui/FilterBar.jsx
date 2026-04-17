import Select from '../forms/Select';

export default function FilterBar({ filters, onChange }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {filters.map((filter) => (
        <Select
          key={filter.key}
          label={filter.label}
          value={filter.value}
          options={filter.options}
          onChange={(event) => onChange(filter.key, event.target.value)}
        />
      ))}
    </div>
  );
}
