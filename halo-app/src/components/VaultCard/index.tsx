import Card from '../Card';
import UILabel from '../UILabel';
import styles from './VaultCard.module.css';
import { useHaloStore } from '../../store/useHaloStore';
import { clsx } from 'clsx';

export default function VaultCard() {
    const { stakingApy, fundingRate, netApy } = useHaloStore();

    return (
        <Card className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.titleGroup}>
                    <div className={styles.bnbIcon}></div>
                    <h2 className={styles.title}>BNB / asBNB Vault</h2>
                </div>
                <div className={styles.status}>
                    <div className={styles.statusDot} />
                    <UILabel className={styles.statusText}>ACTIVE</UILabel>
                </div>
            </div>

            <div className={styles.divider} />

            {/* Data Row */}
            <div className={styles.dataRow}>
                <div className={styles.dataCol}>
                    <UILabel>ASTERDEX STAKING</UILabel>
                    <div className={clsx(styles.metric, styles.positive)}>{stakingApy.toFixed(2)}%</div>
                </div>
                <div className={styles.dataCol}>
                    <UILabel>SHORT FUNDING</UILabel>
                    <div className={clsx(styles.metric, styles.positive)}>{fundingRate.toFixed(2)}%</div>
                </div>
            </div>

            {/* Net APY Footer */}
            <div className={styles.footer}>
                <span className={styles.netApyLabel}>NET APY:</span>
                <span className={styles.netApyValue}>{netApy.toFixed(2)}%</span>
            </div>
        </Card>
    );
}
