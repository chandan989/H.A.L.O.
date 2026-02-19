import { useVaultStore } from '@/stores/vaultStore';
import { Shield, TrendingUp, Zap, Activity } from 'lucide-react';

export function DashboardHero() {
    const { userNetWorth, userPnl, userDeposit, currentApy, stakingApy, fundingApy } = useVaultStore();

    const pnlIsPositive = userPnl >= 0;

    return (
        <section className="relative overflow-hidden rounded-md border border-border bg-background/50 backdrop-blur-sm">
            {/* Grid background */}
            <div className="absolute inset-0 grid-pattern opacity-30" />

            {/* Radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />

            <div className="relative z-10 px-8 py-10 md:py-12">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

                    {/* Main Stat: Net Worth */}
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 border border-border rounded-full px-3 py-1 bg-background/80">
                            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-slow" />
                            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">System Active</span>
                        </div>

                        <div>
                            <p className="label-uppercase mb-2 text-muted-foreground/80">Net Worth</p>
                            <h1 className="text-5xl md:text-6xl font-black tracking-tight-custom leading-tight">
                                <span className="text-foreground">{userNetWorth.toFixed(3)}</span>
                                <span className="text-muted-foreground text-3xl ml-2">BNB</span>
                            </h1>
                            <p className="text-lg text-muted-foreground mt-1 font-mono">
                                ≈ ${(userNetWorth * 620).toFixed(2)} USD
                            </p>
                        </div>
                    </div>

                    {/* Secondary Stats Group */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">

                        {/* PNL Card */}
                        <div className="surface p-4 rounded-sm min-w-[200px] group hover:border-border/80 transition-colors bg-background/60">
                            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                                <TrendingUp className={`h-4 w-4 ${pnlIsPositive ? 'text-success' : 'text-destructive'}`} />
                                <span className="text-xs font-medium uppercase tracking-wider">Total PnL</span>
                            </div>
                            <div className={`text-2xl font-bold font-mono tracking-tight ${pnlIsPositive ? 'text-success' : 'text-destructive'}`}>
                                {pnlIsPositive ? '+' : ''}{userPnl.toFixed(3)} BNB
                            </div>
                            <div className="text-xs text-muted-foreground mt-1 font-mono">
                                {pnlIsPositive ? '+' : ''}{((userPnl / userDeposit) * 100).toFixed(2)}%
                            </div>
                        </div>

                        {/* APY Card */}
                        <div className="surface p-4 rounded-sm min-w-[200px] group hover:border-glow-primary transition-all bg-background/60">
                            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                                <Activity className="h-4 w-4 text-primary" />
                                <span className="text-xs font-medium uppercase tracking-wider">Combined APY</span>
                            </div>
                            <div className="text-2xl font-bold font-mono tracking-tight text-gradient-primary">
                                {currentApy}%
                            </div>
                            <div className="text-xs text-muted-foreground mt-1 font-mono">
                                {stakingApy}% stk + {fundingApy}% fnd
                            </div>
                        </div>

                        {/* Deposited Card (Optional/Smaller) */}
                        <div className="surface p-4 rounded-sm min-w-[200px] sm:col-span-2 md:col-span-1 border-dashed opacity-80 hover:opacity-100 transition-opacity bg-background/40">
                            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                                <Shield className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xs font-medium uppercase tracking-wider">Principal</span>
                            </div>
                            <div className="text-2xl font-bold font-mono tracking-tight text-foreground">
                                {userDeposit.toFixed(3)} BNB
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
