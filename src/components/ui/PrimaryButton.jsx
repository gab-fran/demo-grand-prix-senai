export default function PrimaryButton({ children, className = '', ...props }) {
  return (
    <button
      className={`focus-ring rounded-xl2 bg-accent px-4 py-2.5 text-sm font-semibold text-zinc-900 transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
