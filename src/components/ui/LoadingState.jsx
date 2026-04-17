export default function LoadingState({ lines = 3 }) {
  return (
    <div className="space-y-3 rounded-xl2 border border-line bg-surface p-4">
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="h-4 animate-pulse rounded bg-zinc-700/60" />
      ))}
    </div>
  );
}
