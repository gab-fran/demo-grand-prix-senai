import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/forms/Input';
import PrimaryButton from '../../components/ui/PrimaryButton';
import ErrorState from '../../components/ui/ErrorState';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/Design sem nome.png';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const target = await login(identifier, password);
      navigate(target, { replace: true });
    } catch (err) {
      setError(err.message || 'Erro de autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-app p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-xl2 border border-line bg-surface p-7 shadow-panel"
      >
        <div className="flex flex-col items-center">
          <img src={logo} alt="PortoFlow Logo" className="h-25 w-auto object-contain" />
          <p className="mt-0.1 text-sm text-muted text-center">Acesso seguro por perfil operacional.</p>
        </div>
        <Input label="Matrícula / Identificador" value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
        <Input
          label="Senha ou Token"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <PrimaryButton type="submit" className="w-full">
          {loading ? 'Autenticando...' : 'Entrar'}
        </PrimaryButton>
        {error ? <ErrorState message={error} /> : null}
        <p className="text-xs text-muted">Demo: req001, drv001 ou ctr001 / qualquer senha.</p>
      </form>
    </div>
  );
}
