export default function ProfileBadge({ name, role }) {
  return (
    <div className="rounded-xl2 border border-line bg-surface px-3 py-2 text-right">
      <p className="text-sm font-semibold">{name}</p>
      <p className="text-xs text-muted">{role}</p>
    </div>
  );
}
