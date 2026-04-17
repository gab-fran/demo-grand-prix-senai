import { STATUS_COLOR } from '../../utils/constants';

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${STATUS_COLOR[status] || STATUS_COLOR.PAUSED} shadow-sm`}>
      <span className="h-1 w-1 rounded-full bg-current animate-pulse" />
      {status}
    </span>
  );
}
