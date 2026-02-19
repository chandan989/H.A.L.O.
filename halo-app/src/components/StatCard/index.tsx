import Card from '../Card';
import UILabel from '../UILabel';
import styles from './StatCard.module.css';

interface StatCardProps {
    label: string;
    value: string;
    subValue?: string;
    className?: string; // For text color overrides on value
}

export default function StatCard({ label, value, subValue, className }: StatCardProps) {
    return (
        <Card className={styles.container}>
            <UILabel>{label}</UILabel>
            <div className={styles.value + (className ? ` ${className}` : '')}>{value}</div>
            {subValue && <div className={styles.subValue}>{subValue}</div>}
        </Card>
    );
}
