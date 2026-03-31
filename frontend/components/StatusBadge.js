const STATUS_STYLES = {
  Available: 'bg-emerald-100 text-emerald-700 ring-emerald-500/20',
  Rented:    'bg-blue-100   text-blue-700   ring-blue-500/20',
  Service:   'bg-amber-100  text-amber-700  ring-amber-500/20',
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || 'bg-gray-100 text-gray-700 ring-gray-500/20';
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${style}`}>
      {status}
    </span>
  );
}
