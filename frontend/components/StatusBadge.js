const STATUS_STYLES = {
  Available: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
  Rented:    'bg-blue-500/10   text-blue-400   border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]',
  Service:   'bg-amber-500/10  text-amber-400  border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || 'bg-slate-800 text-slate-300 border border-slate-700';
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase ${style}`}>
      {status}
    </span>
  );
}
