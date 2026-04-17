import { Bell, Menu } from 'lucide-react';
import ProfileBadge from '../ui/ProfileBadge';

export default function Topbar({ user, onToggleSidebar }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-app/80 px-6 py-4 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <button className="rounded-xl border border-line bg-surface p-2.5 text-appText transition-colors hover:bg-line md:hidden" onClick={onToggleSidebar}>
          <Menu size={20} />
        </button>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Vale Mobility</p>
          <h2 className="text-lg font-bold text-appText">Central Operacional</h2>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative rounded-xl border border-line bg-surface p-2.5 text-muted transition-colors hover:bg-line hover:text-appText">
          <Bell size={20} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent" />
        </button>
        <div className="h-8 w-[1px] bg-line mx-2" />
        <ProfileBadge name={user?.name || 'Adm Vale'} role={user?.role || 'Coordenador'} />
      </div>
    </header>
  );
}
