import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    TrendingUp,
    ShieldAlert,
    Layers,
    ArrowRight,
    Activity,
    Lock,
    Cpu,
    Banknote,
    Zap,
    Globe,
    Target,
    Users,
    Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const PitchDeck = () => {
    const { scrollYProgress } = useScroll();
    const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const scaleHero = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

    const [activeTab, setActiveTab] = useState<'retail' | 'halo'>('retail');

    // Section Animation Variants
    const fadeUp: any = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer: any = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
            {/* Fixed Navigation */}
            <div className="fixed top-0 left-0 right-0 p-6 z-50 flex justify-between items-center mix-blend-difference">
                <Link to="/" className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-white hover:text-white/80 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Exit Deck
                </Link>
                <div className="text-white text-sm font-mono tracking-widest hidden md:block">
                    H.A.L.O. OMNI-DECK V1
                </div>
            </div>

            {/* 1. Hero Section */}
            <motion.section
                className="relative h-screen flex flex-col items-center justify-center p-6 text-center border-b border-white/10 overflow-hidden"
                style={{ opacity: opacityHero, scale: scaleHero }}
            >
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                <div className="absolute inset-0 bg-background/80 pointer-events-none backdrop-blur-[1px]" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-10 max-w-5xl"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-widest mb-8 border border-primary/20">
                        <Activity className="h-3 w-3" /> Delta-Neutral Architecture
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tight-custom leading-none uppercase mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                        H.A.L.O.
                    </h1>

                    <p className="text-xl md:text-3xl text-muted-foreground font-light tracking-wide max-w-3xl mx-auto mb-10">
                        Yield from <span className="text-foreground font-medium">structure</span>, not speculation.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-muted-foreground font-mono">
                        <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-yellow-500" /> + asBNB Staking
                        </div>
                        <span className="hidden md:inline text-white/20">/</span>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-green-500" /> + Short Perp Funding
                        </div>
                        <span className="hidden md:inline text-white/20">/</span>
                        <div className="flex items-center gap-2 text-foreground">
                            <ShieldAlert className="h-4 w-4" /> = 0 Net directional exposure
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 text-xs font-mono uppercase tracking-widest"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    Scroll
                    <div className="w-[1px] h-8 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
                </motion.div>
            </motion.section>

            {/* 2. The Problem */}
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-b border-border/50">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="mb-20 text-center md:text-left"
                >
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight-custom mb-6">The Impossible Choice</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl font-light">
                        Retail investors face a binary dilemma. Institutional hedge funds don't.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="bg-card/50 border border-border/50 p-8 flex flex-col h-full rounded-none relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[100px] rounded-full group-hover:bg-red-500/10 transition-colors" />
                        <h3 className="text-2xl font-bold uppercase tracking-wider mb-2 flex items-center gap-3">
                            <span className="text-red-500">01.</span> Hold Assets
                        </h3>
                        <p className="text-muted-foreground mb-8">Hope the market goes up.</p>
                        <div className="mt-auto space-y-4 font-mono text-sm">
                            <div className="flex justify-between border-b border-border/50 pb-2">
                                <span>Risk:</span>
                                <span className="text-red-400">High (Directional)</span>
                            </div>
                            <div className="flex justify-between border-b border-border/50 pb-2">
                                <span>Yield:</span>
                                <span>Variable Staking (3-5%)</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Result:</span>
                                <span>Portfolio Bleed in Bear Markets</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="bg-card/50 border border-border/50 p-8 flex flex-col h-full rounded-none relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[100px] rounded-full group-hover:bg-blue-500/10 transition-colors" />
                        <h3 className="text-2xl font-bold uppercase tracking-wider mb-2 flex items-center gap-3">
                            <span className="text-blue-500">02.</span> Sit in Stables
                        </h3>
                        <p className="text-muted-foreground mb-8">Earn next to nothing.</p>
                        <div className="mt-auto space-y-4 font-mono text-sm">
                            <div className="flex justify-between border-b border-border/50 pb-2">
                                <span>Risk:</span>
                                <span>Low (Inflationary)</span>
                            </div>
                            <div className="flex justify-between border-b border-border/50 pb-2">
                                <span>Yield:</span>
                                <span className="text-blue-400">Minimal (0-2%)</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Result:</span>
                                <span>Loss of Purchasing Power</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. The Double Dip Mechanics */}
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-b border-border/50">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="mb-20 text-center"
                >
                    <div className="inline-block px-3 py-1 border border-primary/20 bg-primary/10 text-primary text-xs font-mono uppercase tracking-widest mb-6">
                        The Solution
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight-custom mb-6">The Double-Dip</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
                        HALO executes a two-sided position simultaneously. It brings institutional delta-neutral strategies on-chain, permissionlessly.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Visual Connector Line */}
                    <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden md:block" />

                    <div className="grid md:grid-cols-2 gap-16 md:gap-32 items-center relative z-10">
                        {/* Leg 1 */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-card/30 border border-border p-8 backdrop-blur-sm relative"
                        >
                            <div className="absolute top-1/2 -right-[16px] md:-right-[33px] lg:-right-[65px] h-[1px] w-[16px] md:w-[32px] lg:w-[64px] bg-primary/50 hidden md:block" />
                            <div className="flex items-start gap-4 mb-6">
                                <div className="h-12 w-12 rounded-none bg-green-500/10 border border-green-500/30 flex items-center justify-center shrink-0">
                                    <TrendingUp className="h-6 w-6 text-green-500" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">Long Leg</h3>
                                    <p className="text-muted-foreground text-sm">BNB staked as LST</p>
                                </div>
                            </div>
                            <div className="bg-background/50 p-4 font-mono text-xs text-muted-foreground space-y-2 border border-border/50">
                                <div className="flex justify-between"><span>Action:</span> <span className="text-foreground">Stake BNB → asBNB</span></div>
                                <div className="flex justify-between"><span>Yield Source:</span> <span className="text-green-400">Network Staking</span></div>
                                <div className="flex justify-between"><span>Est. APY:</span> <span className="text-foreground">~3% - 5%</span></div>
                            </div>
                        </motion.div>

                        {/* Leg 2 */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-card/30 border border-border p-8 backdrop-blur-sm relative"
                        >
                            <div className="absolute top-1/2 -left-[16px] md:-left-[33px] lg:-left-[65px] h-[1px] w-[16px] md:w-[32px] lg:w-[64px] bg-primary/50 hidden md:block" />
                            <div className="flex items-start gap-4 mb-6">
                                <div className="h-12 w-12 rounded-none bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                                    <TrendingUp className="h-6 w-6 text-red-500 rotate-180" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">Short Leg</h3>
                                    <p className="text-muted-foreground text-sm">1x Short Perp on AsterDEX</p>
                                </div>
                            </div>
                            <div className="bg-background/50 p-4 font-mono text-xs text-muted-foreground space-y-2 border border-border/50">
                                <div className="flex justify-between"><span>Action:</span> <span className="text-foreground">Post collateral, Open Short</span></div>
                                <div className="flex justify-between"><span>Yield Source:</span> <span className="text-red-400">Funding Rates</span></div>
                                <div className="flex justify-between"><span>Est. APY:</span> <span className="text-foreground">~10% - 50%</span></div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Result */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="mt-16 max-w-2xl mx-auto bg-primary/5 border border-primary/20 p-8 text-center"
                    >
                        <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Net Result: Δ = 0</h3>
                        <p className="text-muted-foreground text-sm font-light mb-6">
                            Directional exposure cancels out exactly. The vault earns from two structural sources at once while portfolio USD value remains constant regardless of price movement.
                        </p>
                        <div className="flex items-center justify-center gap-4 font-mono text-sm">
                            <span className="text-green-500">+1 Spot</span>
                            <span className="text-muted-foreground">+</span>
                            <span className="text-red-500">-1 Short</span>
                            <span className="text-muted-foreground">=</span>
                            <span className="text-primary font-bold">Absolute Yield</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 4. The Numbers (Data Visualization) */}
            <section className="py-32 bg-card/10 border-b border-border/50">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="mb-16 md:flex justify-between items-end"
                    >
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight-custom mb-4">By the Numbers</h2>
                            <p className="text-muted-foreground">Scenario based on a 100 BNB deposit in a typical bull market environment.</p>
                        </div>
                        <div className="mt-8 md:mt-0 text-right font-mono text-sm text-muted-foreground">
                            Simulation Engine: <span className="text-foreground">v1.2</span><br />
                            Market Context: <span className="text-primary">Bull / Volatile</span>
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Financial Card 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-background border border-border/50 p-8 relative overflow-hidden"
                        >
                            <Banknote className="absolute -top-6 -right-6 h-32 w-32 text-border/20 blur-[2px] rotate-12" />
                            <div className="text-xs font-mono text-muted-foreground mb-4">Projected Base Yield</div>
                            <div className="text-4xl font-black tracking-tighter mb-2 text-green-400">~4.2%</div>
                            <div className="h-[1px] w-full bg-border/50 my-4" />
                            <ul className="text-sm text-muted-foreground space-y-3">
                                <li className="flex justify-between">
                                    <span>Source:</span>
                                    <span className="text-foreground">asBNB Staking</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Volatility:</span>
                                    <span>Low / Stable</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Financial Card 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-background border border-border/50 p-8 relative overflow-hidden"
                        >
                            <TrendingUp className="absolute -top-6 -right-6 h-32 w-32 text-border/20 blur-[2px] -rotate-12" />
                            <div className="text-xs font-mono text-muted-foreground mb-4">Projected Variable Yield</div>
                            <div className="text-4xl font-black tracking-tighter mb-2 text-blue-400">~30.0%</div>
                            <div className="h-[1px] w-full bg-border/50 my-4" />
                            <ul className="text-sm text-muted-foreground space-y-3">
                                <li className="flex justify-between">
                                    <span>Source:</span>
                                    <span className="text-foreground">Perp Funding</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Volatility:</span>
                                    <span>High / Market-Dep</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Financial Card 3 - Total */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-primary/10 border border-primary/50 p-8 relative overflow-hidden"
                        >
                            <Layers className="absolute -top-6 -right-6 h-32 w-32 text-primary/10 blur-[2px]" />
                            <div className="text-xs font-mono text-primary mb-4">Total Combined APY</div>
                            <div className="text-5xl font-black tracking-tighter mb-2 text-foreground">~34.2%</div>
                            <div className="h-[1px] w-full bg-primary/20 my-4" />
                            <ul className="text-sm text-muted-foreground space-y-3 font-medium">
                                <li className="flex justify-between">
                                    <span>Directional Exp:</span>
                                    <span className="text-foreground">Zero</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Compounding:</span>
                                    <span className="text-primary">Continuous Auto</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 4.5. Market Potential */}
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-b border-border/50">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="mb-20 text-center"
                >
                    <div className="inline-block px-3 py-1 border border-primary/20 bg-primary/10 text-primary text-xs font-mono uppercase tracking-widest mb-6">
                        Scale & Scope
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight-custom mb-6">Market Potential</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
                        Targeting the massive intersection of liquid staking tokens and perpetual DEX volume.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {/* TAM */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-card/30 border border-border p-8 backdrop-blur-sm relative group"
                    >
                        <Globe className="h-10 w-10 text-muted-foreground/30 absolute top-8 right-8 group-hover:text-primary/20 transition-colors" />
                        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">TAM (Total Addressable Market)</h3>
                        <div className="text-5xl font-black tracking-tighter mb-4">$50B+</div>
                        <p className="text-sm text-muted-foreground">Global TVL in Liquid Staking Protocols & Yield Aggregators across EVM chains.</p>
                    </motion.div>

                    {/* SAM */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-primary/5 border border-primary/30 p-8 backdrop-blur-sm relative group"
                    >
                        <Target className="h-10 w-10 text-primary/20 absolute top-8 right-8 group-hover:text-primary/40 transition-colors" />
                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">SAM (Serviceable Market)</h3>
                        <div className="text-5xl font-black tracking-tighter mb-4 text-foreground">$5B+</div>
                        <p className="text-sm text-muted-foreground">BNB Chain Liquid Staking TVL & Native Perpetual DEX Open Interest.</p>
                    </motion.div>

                    {/* SOM */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-card/30 border border-border p-8 backdrop-blur-sm relative group"
                    >
                        <Users className="h-10 w-10 text-muted-foreground/30 absolute top-8 right-8 group-hover:text-primary/20 transition-colors" />
                        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">SOM (Target Share)</h3>
                        <div className="text-5xl font-black tracking-tighter mb-4">$50M+</div>
                        <p className="text-sm text-muted-foreground">Year 1 Target TVL capturing 1% of the BNB Chain liquid staking market.</p>
                    </motion.div>
                </div>
            </section>

            {/* 4.6. Go-To-Market Strategy */}
            <section className="py-32 bg-card/10 border-b border-border/50">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="mb-16 md:flex justify-between items-end"
                    >
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight-custom mb-4">Go-To-Market Strategy</h2>
                            <p className="text-muted-foreground max-w-xl">A phased approach to bootstrap liquidity, secure early adopters, and integrate deeply within the BNB ecosystem.</p>
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Phase 1 */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex gap-6"
                        >
                            <div className="flex flex-col items-center">
                                <div className="h-12 w-12 rounded-full border-2 border-primary flex items-center justify-center font-black text-primary shrink-0">1</div>
                                <div className="w-[2px] h-full bg-border mt-4" />
                            </div>
                            <div className="pb-12">
                                <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">Phase 1: Bootstrapping</h3>
                                <div className="inline-flex items-center gap-2 px-2 py-1 bg-muted text-xs font-mono uppercase tracking-widest mb-4">Months 1-3</div>
                                <ul className="space-y-4 text-muted-foreground text-sm list-none p-0">
                                    <li className="flex gap-3"><Rocket className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <strong>Hackathon Momentum:</strong> Leverage BNB Chain hackathon visibility for initial seed liquidity.</li>
                                    <li className="flex gap-3"><Rocket className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <strong>Whitelisted Vaults:</strong> Cap initial TVL at $1M to safely monitor real-world risk engine performance.</li>
                                    <li className="flex gap-3"><Rocket className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <strong>AsterDEX Partnership:</strong> Co-marketing the vault as an automated yield sink for AsterDEX LPs.</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Phase 2 */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex gap-6"
                        >
                            <div className="flex flex-col items-center">
                                <div className="h-12 w-12 rounded-full border-2 border-border flex items-center justify-center font-black text-muted-foreground shrink-0">2</div>
                                <div className="w-[2px] h-full bg-border/50 mt-4" />
                            </div>
                            <div className="pb-12">
                                <h3 className="text-2xl font-bold uppercase tracking-wider mb-2 text-muted-foreground">Phase 2: Expansion</h3>
                                <div className="inline-flex items-center gap-2 px-2 py-1 bg-muted/50 text-xs font-mono uppercase tracking-widest mb-4 text-muted-foreground">Months 4-12</div>
                                <ul className="space-y-4 text-muted-foreground/70 text-sm list-none p-0">
                                    <li className="flex gap-3"><div className="h-1.5 w-1.5 rounded-full bg-border shrink-0 mt-1.5" /> <strong>Omni-Chain Deployment:</strong> Expanding the vault architecture to Arbitrum and Base via Cross-Chain Interoperability (CCIP).</li>
                                    <li className="flex gap-3"><div className="h-1.5 w-1.5 rounded-full bg-border shrink-0 mt-1.5" /> <strong>Institutional Onboarding:</strong> Institutional-grade KYC vaults targeted at family offices seeking stable, double-digit APYs.</li>
                                    <li className="flex gap-3"><div className="h-1.5 w-1.5 rounded-full bg-border shrink-0 mt-1.5" /> <strong>Governance Token:</strong> Decentralizing the Keeper fee parameters and risk tolerances via a DAO structure.</li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* 5. Institutional Risk Management */}
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="mb-20 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight-custom mb-6">Institutional Risk Logic</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        An autonomous protocol is only as strong as its defense mechanisms. HALO features multiple layers of hardcoded protection against exploits, oracle failures, and black swan events.
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {[
                        { title: "Dual-Oracle Validation", desc: "Validates Chainlink spot vs AsterDEX mark price. Pauses rebalance if basis > 0.5% to prevent MEV/front-running.", icon: Cpu },
                        { title: "De-Peg Circuit Breaker", desc: "If LST/BNB ratio falls beneath 0.98, instantly triggers safety retreat to prevent collateral cascade.", icon: ShieldAlert },
                        { title: "Flash Loan Exit", desc: "Atomic deleveraging in extreme tail-risk situations; repays short obligations instantly via flash liquidity.", icon: Zap },
                        { title: "Smart Kill Switch", desc: "Monitors funding rates. If historically negative, the vault halts the short position automatically to preserve capital.", icon: Lock }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUp}
                            className="bg-card/50 border border-border/50 p-6 flex flex-col hover:border-border transition-colors group"
                        >
                            <feature.icon className="h-8 w-8 text-primary mb-6 group-hover:scale-110 transition-transform" />
                            <h4 className="font-bold uppercase tracking-wider text-sm mb-3">{feature.title}</h4>
                            <p className="text-sm text-muted-foreground font-light leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* 6. Call to Action */}
            <section className="py-32 relative overflow-hidden border-t border-border/50">
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="relative z-10 text-center px-6"
                >
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
                        ENTER THE<br />VAULT
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto font-light">
                        Experience the first fully autonomous, delta-neutral yield protocol on AsterDEX.
                    </p>

                    <Link to="/app">
                        <Button size="lg" className="rounded-none h-14 px-10 border border-primary/50 shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)] hover:shadow-[0_0_50px_rgba(var(--primary-rgb),0.4)] transition-all bg-primary/10 hover:bg-primary/20 text-primary uppercase tracking-widest font-bold">
                            Launch App <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-border bg-background text-center text-sm font-mono text-muted-foreground">
                <p>H.A.L.O. HACKATHON BUILD // 2026 // ELYKID PRIVATE LIMITED</p>
                <div className="mt-4 text-xs opacity-50 max-w-3xl mx-auto px-6">
                    <p>Disclaimer: Smart contract code is unaudited. Funding rates are variable. This is an experimental build.</p>
                </div>
            </footer>
        </div>
    );
};

export default PitchDeck;
