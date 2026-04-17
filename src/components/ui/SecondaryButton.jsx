export default function SecondaryButton({ children, className = '', ...props }) {
  return (
    <button
      className={`rounded-xl border border-line bg-surface px-6 py-3 text-sm font-bold uppercase tracking-widest text-muted transition-all duration-300 hover:border-primary/50 hover:bg-line hover:text-primary ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
