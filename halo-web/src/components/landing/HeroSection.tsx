import { ArrowRight, Shield, TrendingUp, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Protocol badge */}
        <div className="inline-flex items-center gap-2 border border-border rounded-sm px-3 py-1.5 mb-8">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse-glow" />
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Protocol Live on BSC</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight-custom leading-[0.9] mb-6">
          <span className="text-foreground">YIELD FROM</span>
          <br />
          <span className="text-gradient-primary">STRUCTURE</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
          Delta-neutral vault on BNB. Earn staking + funding rate yields simultaneously with zero directional exposure. The double-dip strategy.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/app"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-sm text-sm font-semibold uppercase tracking-wider hover:glow-primary transition-shadow"
          >
            Launch App <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3 rounded-sm text-sm font-semibold uppercase tracking-wider hover:bg-accent transition-colors"
          >
            How It Works
          </a>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-success" />
            <span className="font-mono">Delta-Neutral</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="font-mono">Double Yield</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-warning" />
            <span className="font-mono">Automated</span>
          </div>
        </div>
      </div>
    </section>
  );
}
