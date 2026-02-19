import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { Zap } from 'lucide-react';

const generateFundingData = () => {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const rate = 0.005 + Math.random() * 0.04 - 0.008;
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      rate: parseFloat((rate * 100).toFixed(4)),
    });
  }
  return data;
};

const fundingData = generateFundingData();

export function FundingRateChart() {
  const currentRate = fundingData[fundingData.length - 1].rate;

  return (
    <div className="relative h-[300px] rounded-md border border-border bg-background/40 backdrop-blur-sm p-6 flex flex-col">
      <div className="flex items-start justify-between mb-4 z-10 relative">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Zap className="h-4 w-4 text-warning" />
            <span className="label-uppercase">Funding Rate (1h)</span>
          </div>
          <div className="font-mono text-2xl font-bold text-foreground">
            {currentRate.toFixed(4)}%
          </div>
        </div>
      </div>

      <div className="flex-1 w-full relative z-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={fundingData} margin={{ top: 10, right: 0, bottom: 0, left: -20 }}>
            <XAxis
              dataKey="date"
              tick={{ fill: 'hsl(0, 0%, 40%)', fontSize: 10, fontFamily: 'JetBrains Mono' }}
              axisLine={false}
              tickLine={false}
              dy={10}
              interval={6}
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
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              labelStyle={{ color: 'hsl(0, 0%, 60%)', marginBottom: '4px' }}
            />
            <ReferenceLine y={0} stroke="hsl(0, 0%, 30%)" strokeWidth={1} />
            <Bar dataKey="rate" radius={[2, 2, 0, 0]}>
              {fundingData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.rate >= 0 ? 'hsl(160, 84%, 39%)' : 'hsl(0, 84%, 60%)'}
                  className="hover:opacity-80 transition-opacity"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
