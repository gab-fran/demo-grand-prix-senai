function QuickAccessButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium transition hover:border-zinc-500 hover:bg-zinc-800"
    >
      {label}
    </button>
  );
}

export default QuickAccessButton;
