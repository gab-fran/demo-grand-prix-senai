export default function SecondaryButton({ children, className = '', ...props }) {
  return (
    <button
      className={`focus-ring rounded-xl2 border border-line bg-surface px-4 py-2.5 text-sm font-medium text-appText transition hover:border-primary hover:text-primary ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
