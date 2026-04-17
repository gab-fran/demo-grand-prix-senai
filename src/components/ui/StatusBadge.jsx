import { STATUS_COLOR } from '../../utils/constants';

export default function StatusBadge({ status }) {
  return (
    <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS_COLOR[status] || STATUS_COLOR.PAUSED}`}>
      {status}
    </span>
  );
}
