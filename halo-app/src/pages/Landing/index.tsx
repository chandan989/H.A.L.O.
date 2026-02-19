import { useRef } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import styles from './Landing.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchVaultMetrics } from '../../lib/mockVault';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, ShieldCheck, Zap, Lock } from 'lucide-react';

export default function Landing() {
    const { data } = useQuery({
        queryKey: ['vaultMetrics'],
        queryFn: fetchVaultMetrics,
        refetchInterval: 5000,
    });

    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollToFeatures = () => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={styles.container}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.badge}>
                    <span className={styles.badgeDot}></span>
                    Protocol V2 Live
                </div>
                <h1 className={styles.heroTitle}>
                    Yield, <span className={styles.gradientText}>Redefined.</span>
                    <br />
                    Delta Neutral.
                </h1>
                <p className={styles.heroSub}>
                    Capture 10–50% APY from funding rates while staking BNB.
                    Zero directional risk. Fully autonomous.
                </p>

                <div className={styles.ctaGroup}>
                    <Link to="/vault">
                        <Button className={styles.heroBtnPrimitive} style={{ height: '56px', fontSize: '16px' }}>
                            Launch App <ArrowRight size={18} style={{ marginLeft: 8 }} />
                        </Button>
                    </Link>
                    <Button variant="secondary" onClick={scrollToFeatures} style={{ height: '56px', fontSize: '16px' }}>
                        Learn More <ChevronDown size={18} style={{ marginLeft: 8 }} />
                    </Button>
                </div>

                <div className={styles.heroStats}>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Current Net APY</span>
                        <span className={styles.statValue}>~{data?.netApy ?? "17.22"}%</span>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Total Value Locked</span>
                        <span className={styles.statValue}>${(data?.tvl ?? 4820000).toLocaleString()}</span>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Strategy</span>
                        <span className={styles.statValue}>Delta-Neutral</span>
                    </div>
                </div>
            </section>

            {/* Benefits / Features */}
            <section className={styles.section} ref={scrollRef}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Why H.A.L.O.?</h2>
                    <p className={styles.sectionSub}>The smartest way to earn on BNB.</p>
                </div>

                <div className={styles.grid3}>
                    <Card className={styles.featureCard}>
                        <div className={styles.iconBox}><Zap size={24} color="var(--accent)" /></div>
                        <h3 className={styles.cardTitle}>Double Yield</h3>
                        <p className={styles.cardBody}>
                            Earn staking rewards from asBNB plus short funding rates from AsterDEX. Two streams, one deposit.
                        </p>
                    </Card>
                    <Card className={styles.featureCard}>
                        <div className={styles.iconBox}><ShieldCheck size={24} color="#10B981" /></div>
                        <h3 className={styles.cardTitle}>Market Neutral</h3>
                        <p className={styles.cardBody}>
                            Your long spot position is perfectly hedged by a short perpetual. Market volatility doesn't affect your principal.
                        </p>
                    </Card>
                    <Card className={styles.featureCard}>
                        <div className={styles.iconBox}><Lock size={24} color="#6366F1" /></div>
                        <h3 className={styles.cardTitle}>Auto-Compounding</h3>
                        <p className={styles.cardBody}>
                            The protocol automatically claims rewards, swaps to base assets, and recompounds your position for maximum APY.
                        </p>
                    </Card>
                </div>
            </section>

            {/* How It Works */}
            <section className={styles.altSection}>
                <div className={styles.innerSection}>
                    <h2 className={styles.sectionTitle}>How It Works</h2>
                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <div className={styles.stepNum}>01</div>
                            <h3>Deposit</h3>
                            <p>User deposits BNB into the H.A.L.O. Vault smart contract.</p>
                        </div>
                        <div className={styles.stepConnector}></div>
                        <div className={styles.step}>
                            <div className={styles.stepNum}>02</div>
                            <h3>Split & Stake</h3>
                            <p>Protocol stakes BNB as asBNB to earn validator rewards (~3-5%).</p>
                        </div>
                        <div className={styles.stepConnector}></div>
                        <div className={styles.step}>
                            <div className={styles.stepNum}>03</div>
                            <h3>Hedge</h3>
                            <p>asBNB is used as collateral to open a 1x Short BNB perp, capturing funding rates.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Math Proof */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>The Math</h2>

                <div className={styles.mathGrid}>
                    <div className={styles.codeBlock}>
                        {`Δ_net = Δ_spot + Δ_short
      = (+1)   + (−1)
      = 0`}
                    </div>

                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>Spot Leg</th>
                                    <th>Short Leg</th>
                                    <th>Net Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>BNB Price +50%</td>
                                    <td className={styles.green}>+50% Gain</td>
                                    <td className={styles.red}>−50% Loss</td>
                                    <td>**0% Impact**</td>
                                </tr>
                                <tr>
                                    <td>BNB Price −50%</td>
                                    <td className={styles.red}>−50% Loss</td>
                                    <td className={styles.green}>+50% Gain</td>
                                    <td>**0% Impact**</td>
                                </tr>
                                <tr>
                                    <td>**Price Flat**</td>
                                    <td className={styles.green}>**+Staking APY**</td>
                                    <td className={styles.green}>**+Funding Rate**</td>
                                    <td>**Double Yield**</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>FAQ</h2>
                <div className={styles.faqGrid}>
                    <Card className={styles.faqCard}>
                        <h4>Is my principal guaranteed?</h4>
                        <p>While the strategy is delta-neutral, smart contract risks and de-peg risks exist. See Docs for details.</p>
                    </Card>
                    <Card className={styles.faqCard}>
                        <h4>What are the fees?</h4>
                        <p>Standard gas fees apply. The protocol takes a 10% performance fee on yield only.</p>
                    </Card>
                    <Card className={styles.faqCard}>
                        <h4>When can I withdraw?</h4>
                        <p>Withdrawals are processed instantly via the liquidity pool, or specifically during rebalance periods.</p>
                    </Card>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerCol}>
                        <div className={styles.footerLogo}>H.A.L.O.</div>
                        <p>Hedged Asset Liquidity Optimizer</p>
                    </div>
                    <div className={styles.footerCol}>
                        <Link to="/vault">App</Link>
                        <Link to="/docs">Documentation</Link>
                        <a href="#">Github</a>
                        <a href="#">Twitter</a>
                    </div>
                </div>
                <div className={styles.copyright}>
                    © 2026 Elykid Private Limited. Built for the future.
                </div>
            </footer>
        </div>
    );
}
