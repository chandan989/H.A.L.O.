import { useVaultStore } from '@/stores/vaultStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';

const COLORS = [
  'hsl(217, 91%, 60%)',  // primary - staking
  'hsl(160, 84%, 39%)',  // success - short perp
  'hsl(45, 93%, 47%)',   // warning - reserve
];

export function AllocationChart() {
  const { userDeposit } = useVaultStore();

  const staking = userDeposit * 0.48;
  const shortPerp = userDeposit * 0.48;
  const reserve = userDeposit * 0.04;

  const data = [
    { name: 'asBNB Staking', value: staking, pct: 48 },
    { name: 'Short Perp', value: shortPerp, pct: 48 },
    { name: 'Reserve Buffer', value: reserve, pct: 4 },
  ];

  return (
    <div className="relative h-[420px] overflow-hidden rounded-md border border-border bg-background/40 backdrop-blur-sm p-6 flex flex-col">
      <div className="flex items-center gap-2 text-muted-foreground mb-6">
        <PieIcon className="h-4 w-4" />
        <span className="label-uppercase">Allocation</span>
      </div>

      <div className="flex flex-col items-center gap-6">
        {/* Donut */}
        <div className="h-[200px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                dataKey="value"
                strokeWidth={2}
                stroke="hsl(var(--background))"
                paddingAngle={4}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} className="outline-none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'rgba(5, 5, 5, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  fontFamily: 'JetBrains Mono',
                  fontSize: 12,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                }}
                itemStyle={{ color: '#fff' }}
                formatter={(value: number) => [`${value.toFixed(3)} BNB`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Total</div>
            <div className="font-mono text-xl font-bold text-foreground">{userDeposit.toFixed(1)}</div>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full space-y-3">
          {data.map((entry, i) => (
            <div key={entry.name} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full ring-2 ring-opacity-20" style={{ backgroundColor: COLORS[i], boxShadow: `0 0 8px ${COLORS[i]}` }} />
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{entry.name}</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs font-bold text-foreground">{entry.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
