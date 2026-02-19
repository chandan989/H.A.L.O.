interface StatBoxProps {
  label: string;
  value: string;
  subValue?: string;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
}

const variantStyles = {
  default: 'text-foreground',
  success: 'text-success',
  warning: 'text-warning',
  destructive: 'text-destructive',
};

export function StatBox({ label, value, subValue, variant = 'default' }: StatBoxProps) {
  return (
    <div className="surface p-4 space-y-1">
      <p className="label-uppercase">{label}</p>
      <p className={`data-value ${variantStyles[variant]}`}>{value}</p>
      {subValue && (
        <p className="text-xs text-muted-foreground font-mono">{subValue}</p>
      )}
    </div>
  );
}
