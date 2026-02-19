import { useVaultStore } from '@/stores/vaultStore';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

export function PnlChart() {
  const { pnlHistory, userPnl, userDeposit } = useVaultStore();
  const pnlPercent = ((userPnl / userDeposit) * 100).toFixed(2);

  return (
    <div className="relative h-[350px] rounded-md border border-border bg-background/40 backdrop-blur-sm p-6 flex flex-col">
      {/* Card/Chart Header containing the title and main stat */}
      <div className="flex items-start justify-between mb-4 z-10 relative">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <TrendingUp className="h-4 w-4" />
            <span className="label-uppercase">Cumulative PnL</span>
          </div>
          <div className="font-mono text-3xl font-bold text-success">
            +{pnlPercent}%
          </div>
        </div>
        {/* Time range selector (mock) */}
        <div className="flex bg-secondary/50 p-1 rounded-sm border border-border/50">
          {['1D', '1W', '1M', 'ALL'].map((range) => (
            <button key={range} className={`px-2 py-0.5 text-[10px] font-mono rounded-sm transition-colors ${range === '1M' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full relative z-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={pnlHistory} margin={{ top: 10, right: 0, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={{ fill: 'hsl(0, 0%, 40%)', fontSize: 10, fontFamily: 'JetBrains Mono' }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis
              tick={{ fill: 'hsl(0, 0%, 40%)', fontSize: 10, fontFamily: 'JetBrains Mono' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(5, 5, 5, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                fontFamily: 'JetBrains Mono',
                fontSize: 12,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
              }}
              cursor={{ stroke: 'hsl(160, 84%, 39%)', strokeWidth: 1, strokeDasharray: '4 4' }}
              labelStyle={{ color: 'hsl(0, 0%, 60%)', marginBottom: '4px' }}
              itemStyle={{ color: 'hsl(160, 84%, 39%)' }}
            />
            <Area
              type="monotone"
              dataKey="pnl"
              stroke="hsl(160, 84%, 39%)"
              strokeWidth={3}
              fill="url(#pnlGradient)"
              activeDot={{ r: 6, strokeWidth: 0, fill: 'hsl(160, 84%, 39%)' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
