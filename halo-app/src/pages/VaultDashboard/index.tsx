import { useEffect } from 'react';
import { useHaloStore } from '../../store/useHaloStore';
import { useQuery } from '@tanstack/react-query';
import { fetchVaultMetrics } from '../../lib/mockVault';
import styles from './VaultDashboard.module.css';

import VaultCard from '../../components/VaultCard';
import StatCard from '../../components/StatCard';
import DepositWithdrawPanel from '../../components/DepositWithdrawPanel';
import YieldChart from '../../components/YieldChart';
import RiskMatrix from '../../components/RiskMatrix';
import EmergencyPanel from '../../components/EmergencyPanel';
import KillSwitchBadge from '../../components/KillSwitchBadge';

export default function VaultDashboard() {
    const { updateMetrics, userDeposit, yieldEarned, collateralRatio, tvl } = useHaloStore();

    const { data } = useQuery({
        queryKey: ['vaultMetrics'],
        queryFn: fetchVaultMetrics,
        refetchInterval: 5000,
    });

    useEffect(() => {
        if (data) {
            updateMetrics(data);
        }
    }, [data, updateMetrics]);

    return (
        <>
            {collateralRatio < 150 && (
                <div className={styles.rebalanceWarning}>
                    ⚠ REBALANCE TRIGGERED — Collateral ratio below 150%. Adding margin automatically.
                </div>
            )}

            <div className={styles.content}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Dashboard</h1>
                    <p className={styles.subtitle}>Manage your hedged position and monitor performance.</p>
                </div>

                <VaultCard />

                <div className={styles.statsRow}>
                    <StatCard label="TOTAL VALUE LOCKED" value={`$${tvl.toLocaleString()}`} />
                    <StatCard label="YOUR DEPOSIT" value={`${userDeposit.toFixed(3)} BNB`} />
                    <StatCard label="YIELD EARNED" value={`$${yieldEarned.toFixed(2)}`} className={styles.positive} />
                    <StatCard
                        label="COLLATERAL RATIO"
                        value={`${collateralRatio}%`}
                        className={collateralRatio < 150 ? styles.danger : (collateralRatio > 250 ? styles.positive : '')}
                    />
                </div>

                <div className={styles.grid2}>
                    <div className={styles.panels}>
                        <DepositWithdrawPanel />
                        {/* Quick action panel is redundant if we have full pages, but keeping for dashboard quick access */}
                    </div>
                    <YieldChart />
                </div>

                <div className={styles.grid2}>
                    <RiskMatrix />
                    <div className={styles.systemStatus}>
                        <KillSwitchBadge />
                        <div className={styles.killSwitchSub}>
                            Funding rate positive for 7 consecutive days. All systems nominal.
                        </div>

                        <div className={styles.keeperStatus}>
                            <div className={styles.pulse} /> Chainlink Keeper: Active
                        </div>

                        <div className={styles.oracleStatus}>
                            Chainlink Price: $312.40  |  AsterDEX Mark: $312.67  |  Spread: 0.08%
                        </div>
                    </div>
                </div>

                <EmergencyPanel />
            </div>
        </>
    );
}
