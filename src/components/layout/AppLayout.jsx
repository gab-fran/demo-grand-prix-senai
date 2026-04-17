import { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import Topbar from '../navbar/Topbar';
import { useAuth } from '../../hooks/useAuth';

export default function AppLayout({ children, menuItems }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-app text-appText md:grid md:grid-cols-[256px_1fr]">
      <Sidebar items={menuItems} open={open} onClose={() => setOpen(false)} />
      <div className="min-w-0">
        <Topbar user={user} onToggleSidebar={() => setOpen((prev) => !prev)} />
        <main className="space-y-4 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
