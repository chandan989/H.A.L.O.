import { ArrowDownRight } from 'lucide-react';

interface YieldRow {
  source: string;
  type: string;
  current: number;
  avg7d: number;
  avg30d: number;
  status: 'active' | 'paused';
}

const yieldData: YieldRow[] = [
  { source: 'asBNB Staking', type: 'Staking', current: 4.2, avg7d: 4.1, avg30d: 3.9, status: 'active' },
  { source: 'BNB Perp Funding', type: 'Funding', current: 14.2, avg7d: 12.8, avg30d: 11.5, status: 'active' },
  { source: 'Rebalance Arb', type: 'MEV', current: 0.3, avg7d: 0.25, avg30d: 0.2, status: 'active' },
  { source: 'Liquidation Bonus', type: 'Protocol', current: 0.0, avg7d: 0.1, avg30d: 0.05, status: 'paused' },
];

const totalCurrent = yieldData.reduce((s, r) => s + r.current, 0);
const totalAvg7d = yieldData.reduce((s, r) => s + r.avg7d, 0);
const totalAvg30d = yieldData.reduce((s, r) => s + r.avg30d, 0);

export function YieldBreakdownTable() {
  return (
    <div className="relative overflow-hidden rounded-md border border-border bg-background/40 backdrop-blur-sm p-6 flex flex-col min-h-[300px]">
      <div className="flex items-center gap-2 text-muted-foreground mb-6">
        <ArrowDownRight className="h-4 w-4" />
        <span className="label-uppercase">Yield Sources</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/50">
              <th className="py-3 pr-4 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Source</th>
              <th className="py-3 pr-4 text-[10px] uppercase tracking-wider text-muted-foreground font-medium text-right">Current</th>
              <th className="py-3 pr-4 text-[10px] uppercase tracking-wider text-muted-foreground font-medium text-right hidden sm:table-cell">7D Avg</th>
              <th className="py-3 pr-4 text-[10px] uppercase tracking-wider text-muted-foreground font-medium text-right hidden sm:table-cell">30D Avg</th>
              <th className="py-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {yieldData.map((row) => (
              <tr key={row.source} className="group hover:bg-muted/30 transition-colors border-b border-border/10 last:border-0">
                <td className="py-4 pr-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{row.source}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{row.type}</span>
                  </div>
                </td>
                <td className="py-4 pr-4 text-right">
                  <span className={`font-mono text-sm font-bold ${row.current > 0 ? 'text-success' : 'text-muted-foreground'}`}>
                    {row.current > 0 ? `${row.current.toFixed(1)}%` : '—'}
                  </span>
                </td>
                <td className="py-4 pr-4 text-right hidden sm:table-cell">
                  <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {row.avg7d.toFixed(2)}%
                  </span>
                </td>
                <td className="py-4 pr-4 text-right hidden sm:table-cell">
                  <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {row.avg30d.toFixed(2)}%
                  </span>
                </td>
                <td className="py-4 text-right">
                  <div className="inline-flex items-center justify-end gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${row.status === 'active' ? 'bg-success shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-muted-foreground'}`} />
                    <span className={`text-[10px] uppercase tracking-wider ${row.status === 'active' ? 'text-success' : 'text-muted-foreground'}`}>
                      {row.status}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t border-border/50">
            <tr>
              <td className="py-4 pr-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Total</td>
              <td className="py-4 pr-4 text-right font-mono text-sm font-bold text-success">{totalCurrent.toFixed(1)}%</td>
              <td className="py-4 pr-4 text-right font-mono text-sm text-muted-foreground hidden sm:table-cell">{totalAvg7d.toFixed(2)}%</td>
              <td className="py-4 pr-4 text-right font-mono text-sm text-muted-foreground hidden sm:table-cell">{totalAvg30d.toFixed(2)}%</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
