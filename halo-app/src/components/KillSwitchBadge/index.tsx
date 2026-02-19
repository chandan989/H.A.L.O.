import { useHaloStore } from '../../store/useHaloStore';
import styles from './KillSwitchBadge.module.css';
import { clsx } from 'clsx';

export default function KillSwitchBadge() {
    const { killSwitchActive } = useHaloStore();

    return (
        <div className={clsx(styles.badge, killSwitchActive ? styles.active : styles.dormant)}>
            <div className={styles.status}>
                KILL SWITCH: {killSwitchActive ? "ACTIVE" : "DORMANT"}
            </div>
        </div>
    );
}
