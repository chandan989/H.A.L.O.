import { HeroSection } from '@/components/landing/HeroSection';
import { StatsStrip } from '@/components/landing/StatsStrip';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { FAQSection } from '@/components/landing/FAQSection';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import logo from '@/assets/logo.svg';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-2">
            <img src={logo} alt="H.A.L.O. Logo" className="h-6 w-6" />
            <span className="font-black text-sm tracking-tight-custom">H.A.L.O.</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Link to="/pitch" className="hover:text-foreground transition-colors group flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
              Pitch Deck
            </Link>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">Mechanism</a>
            <a href="#faq" className="hover:text-foreground transition-colors">Risks</a>
          </nav>
          <Link
            to="/app"
            className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider hover:glow-primary transition-shadow"
          >
            Launch <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </header>

      <HeroSection />
      <StatsStrip />
      <HowItWorks />

      {/* CTA Section */}
      <section className="py-24 px-6 text-center border-t border-border">
        <div className="max-w-2xl mx-auto">
          <p className="label-uppercase text-primary mb-3">Ready?</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight-custom mb-6">
            START EARNING
          </h2>
          <p className="text-muted-foreground mb-8">
            Deposit BNB and let the delta-neutral engine work for you.
          </p>
          <Link
            to="/app"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-sm text-sm font-semibold uppercase tracking-wider hover:glow-primary transition-shadow"
          >
            Launch App <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <div id="faq">
        <FAQSection />
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-muted-foreground font-mono">
          <div className="flex items-center gap-2">
            <img src={logo} alt="H.A.L.O. Logo" className="h-4 w-4 grayscale opacity-50" />
            <span>H.A.L.O. PROTOCOL © 2026</span>
          </div>
          <span>Built on BSC</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
