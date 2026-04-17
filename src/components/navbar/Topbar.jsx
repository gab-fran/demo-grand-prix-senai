import { Bell, Menu } from 'lucide-react';
import ProfileBadge from '../ui/ProfileBadge';

export default function Topbar({ user, onToggleSidebar }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-app/95 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <button className="rounded-lg border border-line p-2 md:hidden" onClick={onToggleSidebar}>
          <Menu size={16} />
        </button>
        <div>
          <p className="text-sm text-muted">Plataforma de Mobilidade Interna</p>
          <h2 className="font-semibold">Central Operacional</h2>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="rounded-lg border border-line p-2 text-muted">
          <Bell size={16} />
        </button>
        <ProfileBadge name={user?.name || 'Usuário'} role={user?.role || 'N/A'} />
      </div>
    </header>
  );
}
