import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Map from '../components/Map';
import QuickAccessButton from '../components/QuickAccessButton';

function LoginPage() {
  const [registration, setRegistration] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    navigate('/app');
  };

  return (
    <main className="relative min-h-screen overflow-hidden text-zinc-100">
      <Map className="absolute inset-0 h-full" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl bg-card/95 p-6 shadow-lg shadow-black/40 backdrop-blur-sm">
          <h1 className="text-2xl font-semibold">Mobilidade Interna</h1>
          <p className="mt-1 text-sm text-zinc-400">Acesse o protótipo com matrícula fake.</p>

          <form onSubmit={handleLogin} className="mt-6 space-y-3">
            <label className="block text-sm font-medium text-zinc-300" htmlFor="registration">
              Matrícula
            </label>
            <input
              id="registration"
              type="text"
              value={registration}
              onChange={(event) => setRegistration(event.target.value)}
              placeholder="Ex: 123456"
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:border-zinc-500"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-300"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 space-y-2">
            <QuickAccessButton label="Entrar como Solicitante" onClick={() => navigate('/app')} />
            <QuickAccessButton label="Motorista" onClick={() => navigate('/driver')} />
            <QuickAccessButton label="Gestor" onClick={() => navigate('/control')} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
