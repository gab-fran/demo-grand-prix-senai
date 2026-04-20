import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/Design sem nome.png';

export default function Sidebar({ items, open, onClose }) {
  const { pathname } = useLocation();

  return (
    <aside className={`fixed z-40 h-full w-64 bg-primary p-6 shadow-2xl transition md:static md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      <div className="mb-10 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-white/60">Operação</span>
          <div className="bg-black rounded-xl p-2 w-fit">
            <img src={logo} alt="PortoFlow Logo" className="h-13 w-auto object-contain" />
          </div>
        </div>
        <button className="rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20 md:hidden" onClick={onClose}>✕</button>
      </div>
      <nav className="space-y-1.5">
        {items.map((item) => {
          const isActive = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${isActive ? 'bg-white text-primary shadow-lg shadow-black/10' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            >
              <div className={`h-1.5 w-1.5 rounded-full transition-all ${isActive ? 'bg-accent' : 'bg-transparent group-hover:bg-white/40'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-8 left-6 right-6 rounded-2xl bg-white/5 p-4 backdrop-blur-sm border border-white/10">
        <p className="text-[10px] uppercase tracking-tighter text-white/40">Status do Terminal</p>
        <div className="mt-1 flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          <span className="text-xs font-medium text-white/90">Operação Normal</span>
        </div>
      </div>
    </aside>
  );
}
