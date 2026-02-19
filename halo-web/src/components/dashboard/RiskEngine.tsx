import { useVaultStore } from '@/stores/vaultStore';
import { ArrowUpRight } from 'lucide-react';

export function RiskEngine() {
  const { collateralRatio, oracleSpread, pegHealth, simulationMode, simulatedPriceDrop } = useVaultStore();

  const simRatio = simulationMode
    ? Math.max(100, collateralRatio - simulatedPriceDrop * 1.2)
    : collateralRatio;

  const simPeg = simulationMode
    ? Math.max(95, pegHealth - simulatedPriceDrop * 0.08)
    : pegHealth;

  const simSpread = simulationMode
    ? oracleSpread + simulatedPriceDrop * 0.03
    : oracleSpread;

  const ratioStatus = simRatio >= 200 ? 'safe' : simRatio >= 160 ? 'warning' : 'danger';

  return (
    <div className="relative overflow-hidden rounded-md border border-border bg-background/40 backdrop-blur-sm p-6 space-y-8">
      <div className="flex items-center gap-2 text-muted-foreground">
        <ArrowUpRight className="h-4 w-4" />
        <span className="label-uppercase">Risk Engine</span>
      </div>

      {/* Main Metric: Collateral Ratio */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Collateral Ratio</span>
          <span className={`font-mono text-4xl font-bold ${ratioStatus === 'safe' ? 'text-success' : ratioStatus === 'warning' ? 'text-warning' : 'text-destructive'}`}>
            {simRatio.toFixed(0)}%
          </span>
        </div>

        {/* Health Bar with segments */}
        <div className="h-2 bg-secondary/50 rounded-sm overflow-hidden flex gap-0.5">
          <div className="h-full bg-destructive flex-1 opacity-20" />
          <div className="h-full bg-warning flex-1 opacity-20" />
          <div className="h-full bg-success flex-[2] opacity-20" />

          {/* Dynamic Indicator (This is a simplified visual representation) */}
          <div
            className={`absolute h-2 transition-all duration-500 ease-out ${ratioStatus === 'safe' ? 'bg-success shadow-[0_0_10px_rgba(16,185,129,0.5)]' : ratioStatus === 'warning' ? 'bg-warning' : 'bg-destructive'}`}
            style={{ width: `${Math.min(100, (simRatio / 300) * 100)}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 border-t border-border/50 pt-8">
        {/* Oracle Spread */}
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Oracle Spread</p>
          <div className="flex items-baseline gap-2">
            <p className="font-mono text-2xl font-bold text-foreground">{simSpread.toFixed(2)}%</p>
            <span className={`text-[10px] uppercase font-bold tracking-wider ${simSpread < 0.5 ? 'text-success' : 'text-warning'}`}>
              {simSpread < 0.5 ? 'Safe' : 'Deviating'}
            </span>
          </div>
        </div>

        {/* Peg Health */}
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Peg Health</p>
          <div className="flex items-baseline gap-2">
            <p className="font-mono text-2xl font-bold text-foreground">{simPeg.toFixed(2)}%</p>
            <span className={`text-[10px] uppercase font-bold tracking-wider ${simPeg >= 99.5 ? 'text-success' : 'text-warning'}`}>
              {simPeg >= 99.5 ? 'Stable' : 'De-pegged'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
