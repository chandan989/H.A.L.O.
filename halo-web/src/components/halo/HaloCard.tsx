import { ReactNode } from 'react';

interface HaloCardProps {
  title?: string;
  id?: string;
  children: ReactNode;
  className?: string;
}

export function HaloCard({ title, id, children, className = '' }: HaloCardProps) {
  return (
    <div className={`surface ${className}`}>
      {(title || id) && (
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          {title && <h3 className="label-uppercase text-foreground">{title}</h3>}
          {id && <span className="font-mono text-[10px] text-muted-foreground">{id}</span>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
