import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ items, open, onClose }) {
  const { pathname } = useLocation();

  return (
    <aside className={`fixed z-40 h-full w-64 border-r border-line bg-surface p-4 transition md:static md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-lg font-bold">PortoFlow</h1>
        <button className="md:hidden" onClick={onClose}>✕</button>
      </div>
      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`block rounded-lg px-3 py-2 text-sm transition ${pathname === item.to ? 'bg-primary/20 text-primary' : 'text-zinc-300 hover:bg-zinc-800'}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
