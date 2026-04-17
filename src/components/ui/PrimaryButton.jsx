export default function PrimaryButton({ children, className = '', ...props }) {
  return (
    <button
      className={`relative overflow-hidden rounded-xl bg-primary px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,126,122,0.4)] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 hover:opacity-100" />
    </button>
  );
}
