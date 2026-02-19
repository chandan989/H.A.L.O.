import Card from '../Card';
import UILabel from '../UILabel';
import styles from './RiskMatrix.module.css';
import { useHaloStore } from '../../store/useHaloStore';

export default function RiskMatrix() {
    const { collateralRatio, fundingRate, oracleBasis, pegRatio } = useHaloStore();

    const risks = [
        {
            label: 'Liquidation',
            safe: collateralRatio > 150,
            text: `CR: ${collateralRatio}%`
        },
        {
            label: 'Negative Funding',
            safe: fundingRate >= 0,
            text: `Rate: ${fundingRate > 0 ? '+' : ''}${fundingRate.toFixed(2)}%`
        },
        {
            label: 'Oracle Divergence',
            safe: oracleBasis < 0.5,
            text: `Spread: ${oracleBasis.toFixed(2)}% (max 0.5%)`
        },
        {
            label: 'asBNB Peg',
            safe: pegRatio >= 0.98,
            text: `Ratio: ${pegRatio.toFixed(4)} (min 0.98)`
        },
        {
            label: 'Flash Loan Attack',
            safe: true,
            text: 'MAX_SLIPPAGE: 1% enforced'
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <UILabel style={{ color: '#fff' }}>RISK MATRIX</UILabel>
            </div>
            <div className={styles.table}>
                {risks.map((risk, i) => (
                    <div key={i} className={styles.row}>
                        <span className={styles.label}>{risk.label}</span>
                        <div className={styles.status}>
                            <div className={`${styles.dot} ${risk.safe ? styles.safe : styles.danger}`} />
                            <span className={styles.statusText}>{risk.safe ? 'Safe' : 'Risk'} — {risk.text}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
