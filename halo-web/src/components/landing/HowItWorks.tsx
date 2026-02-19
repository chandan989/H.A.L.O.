import { ArrowDown, Split, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: ArrowDown,
    number: '01',
    title: 'DEPOSIT',
    description: 'Deposit BNB into the H.A.L.O. vault. Your position is automatically managed.',
    detail: 'Single-asset entry',
  },
  {
    icon: Split,
    number: '02',
    title: 'SPLIT',
    description: 'BNB is split: 50% staked as asBNB for staking yield, 50% shorts BNB perps for funding rate.',
    detail: 'Delta-neutral hedge',
  },
  {
    icon: TrendingUp,
    number: '03',
    title: 'PROFIT',
    description: 'Earn both yields simultaneously. Price goes up or down—your dollar value stays flat.',
    detail: 'Double-dip yield',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="label-uppercase text-primary mb-3">Mechanism</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight-custom">
            HOW IT WORKS
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          {steps.map((step) => (
            <div key={step.number} className="bg-background p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">{step.number}</span>
                <step.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold tracking-tight-custom">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              <div className="pt-2 border-t border-border">
                <span className="font-mono text-xs text-success">{step.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
