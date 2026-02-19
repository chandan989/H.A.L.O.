import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { WalletButton } from '@/components/dashboard/WalletButton';
import { DashboardHero } from '@/components/dashboard/DashboardHero';
import { PnlChart } from '@/components/dashboard/PnlChart';
import { ActionModule } from '@/components/dashboard/ActionModule';
import { FundingRateChart } from '@/components/dashboard/FundingRateChart';
import { AllocationChart } from '@/components/dashboard/AllocationChart';
import { YieldBreakdownTable } from '@/components/dashboard/YieldBreakdownTable';
import { RiskEngine } from '@/components/dashboard/RiskEngine';
import { SimulationToggle } from '@/components/dashboard/SimulationToggle';
import { useVaultStore } from '@/stores/vaultStore';
import { Activity } from 'lucide-react';

import logo from '@/assets/logo.svg';

const Dashboard = () => {
  const { tvl, currentApy } = useVaultStore();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2">
              <img src={logo} alt="H.A.L.O. Logo" className="h-6 w-6" />
              <span className="font-black text-sm tracking-tight-custom">H.A.L.O.</span>
            </div>
            <div className="hidden md:flex items-center gap-3 ml-6">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/50 border border-border/50">
                <Activity className="h-3 w-3 text-success" />
                <span className="font-mono text-[10px] uppercase text-muted-foreground tracking-wider">
                  TVL <span className="text-foreground font-semibold">${(tvl / 1_000_000).toFixed(1)}M</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/50 border border-border/50">
                <span className="font-mono text-[10px] uppercase text-muted-foreground tracking-wider">
                  APY <span className="text-success font-semibold">{currentApy}%</span>
                </span>
              </div>
            </div>
          </div>
          <WalletButton />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-12 space-y-8">
        {/* Overview */}
        <section>
          <DashboardHero />
        </section>

        {/* Charts + Actions + Allocation */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PnlChart />
            <div className="grid md:grid-cols-2 gap-8">
              <FundingRateChart />
              <YieldBreakdownTable />
            </div>
          </div>
          <div className="space-y-8">
            <ActionModule />
            <AllocationChart />
          </div>
        </div>

        {/* Risk Engine + Simulation */}
        <section className="grid lg:grid-cols-2 gap-8 pt-4 border-t border-border/50">
          <RiskEngine />
          <SimulationToggle />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
