import { Link } from 'react-router-dom';
import Map from '../components/Map';

const navItems = [
  { to: '/app', label: 'Solicitante' },
  { to: '/bus', label: 'Ônibus' },
  { to: '/driver', label: 'Motorista' },
  { to: '/control', label: 'Central de Controle' },
  { to: '/', label: 'Login' },
];

function AppLayout({ title, subtitle, children, mapProps = {}, containerClassName = 'max-w-6xl' }) {
  return (
    <main className="relative min-h-screen overflow-hidden text-zinc-100">
      <Map className="absolute inset-0 h-full" {...mapProps} />

      <div className={`relative z-10 mx-auto flex min-h-screen w-full flex-col gap-6 p-6 md:p-8 ${containerClassName}`}>
        <header className="rounded-xl bg-card/95 p-4 shadow-lg shadow-black/40 backdrop-blur-sm md:p-6">
          <h1 className="text-2xl font-semibold">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm text-zinc-400">{subtitle}</p> : null}
          <nav className="mt-5 flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-md border border-zinc-700 px-3 py-2 text-sm transition hover:border-zinc-500 hover:bg-zinc-800"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <section className="rounded-xl bg-card/95 p-4 shadow-lg shadow-black/40 backdrop-blur-sm md:p-6">{children}</section>
      </div>
    </main>
  );
}

export default AppLayout;
