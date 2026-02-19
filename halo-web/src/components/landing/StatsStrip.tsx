import { useVaultStore } from '@/stores/vaultStore';

export function StatsStrip() {
  const { tvl, currentApy, riskScore } = useVaultStore();

  const stats = [
    { label: 'Total Value Locked', value: `$${(tvl / 1_000_000).toFixed(1)}M` },
    { label: 'Net APY', value: `${currentApy}%`, highlight: true },
    { label: 'Risk Score', value: riskScore },
    { label: 'Strategy', value: 'Δ-NEUTRAL' },
  ];

  return (
    <section className="border-y border-border bg-card">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`px-6 py-6 ${i < stats.length - 1 ? 'border-r border-border' : ''}`}
          >
            <p className="label-uppercase mb-1">{stat.label}</p>
            <p className={`font-mono text-2xl font-bold tracking-tight-custom ${stat.highlight ? 'text-success' : 'text-foreground'}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
