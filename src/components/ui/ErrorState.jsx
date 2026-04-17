import PrimaryButton from './PrimaryButton';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="space-y-3 rounded-xl2 border border-danger/30 bg-danger/10 p-4">
      <p className="font-semibold text-danger">Não foi possível carregar os dados.</p>
      <p className="text-sm text-zinc-300">{message}</p>
      {onRetry ? <PrimaryButton onClick={onRetry}>Tentar novamente</PrimaryButton> : null}
    </div>
  );
}
