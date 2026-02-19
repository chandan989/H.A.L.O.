interface StatusBadgeProps {
  status: 'safe' | 'warning' | 'danger';
  label: string;
}

const styles = {
  safe: 'border-success/50 text-success bg-success/10',
  warning: 'border-warning/50 text-warning bg-warning/10',
  danger: 'border-destructive/50 text-destructive bg-destructive/10',
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${styles[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${status === 'safe' ? 'bg-success' : status === 'warning' ? 'bg-warning' : 'bg-destructive'} animate-pulse-glow`} />
      {label}
    </span>
  );
}
