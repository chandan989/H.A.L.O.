import { useState } from 'react';
import { useVaultStore } from '@/stores/vaultStore';
import { ArrowRight, Wallet } from 'lucide-react';

export function ActionModule() {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');
  const { currentApy, deposit, withdraw, userDeposit } = useVaultStore();

  const numAmount = parseFloat(amount) || 0;
  const dailyYield = (numAmount * (currentApy / 100)) / 365;
  const yearlyYield = numAmount * (currentApy / 100);

  const handleAction = () => {
    if (numAmount <= 0) return;
    if (activeTab === 'deposit') deposit(numAmount);
    else withdraw(numAmount);
    setAmount('');
  };

  return (
    <div className="relative overflow-hidden rounded-md border border-border bg-background/40 backdrop-blur-sm p-6 flex flex-col">
      {/* Background gradient hint */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

      {/* Header & Tabs */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Wallet className="h-4 w-4" />
          <span className="label-uppercase">Manage Position</span>
        </div>

        <div className="flex bg-secondary/50 p-1 rounded-sm border border-border/50">
          {(['deposit', 'withdraw'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all ${activeTab === tab
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground/80'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Input */}
      <div className="flex-1 flex flex-col justify-center space-y-8 relative z-10">
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Amount (BNB)</label>
            <div className="text-xs text-muted-foreground font-mono">
              Available: <span className="text-foreground font-bold">142.50</span>
            </div>
          </div>

          <div className="relative group">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-transparent border-b-2 border-border py-4 font-mono text-5xl font-medium text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:border-primary transition-all"
            />
            <button
              onClick={() => setAmount('12.5')} // Mock MAX
              className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-bold font-mono text-primary uppercase tracking-wider hover:text-primary/80 bg-primary/10 px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              MAX
            </button>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleAction}
          disabled={numAmount <= 0}
          className={`group w-full py-4 rounded-sm text-sm font-bold uppercase tracking-widest transition-all overflow-hidden relative ${activeTab === 'deposit'
            ? 'bg-primary text-primary-foreground hover:glow-primary'
            : 'bg-destructive text-destructive-foreground hover:glow-destructive'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {activeTab === 'deposit' ? 'Confirm Deposit' : 'Confirm Withdraw'}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
          {/* Scanline effect */}
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-[-100%] transition-transform duration-700 ease-in-out" />
        </button>

        {/* Yield Preview */}
        {numAmount > 0 && activeTab === 'deposit' && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50 animate-in fade-in slide-in-from-top-2">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Daily Yield</p>
              <p className="font-mono text-sm font-bold text-success">+{dailyYield.toFixed(4)} BNB</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Yearly Yield</p>
              <p className="font-mono text-sm font-bold text-success">+{yearlyYield.toFixed(3)} BNB</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
