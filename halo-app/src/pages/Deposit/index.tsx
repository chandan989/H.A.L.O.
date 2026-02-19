import { useState } from 'react';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import styles from './Deposit.module.css';
import { useHaloStore } from '../../store/useHaloStore';
import { ArrowDownCircle } from 'lucide-react';

export default function Deposit() {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const { deposit, netApy } = useHaloStore();

    const handleDeposit = () => {
        if (!amount || parseFloat(amount) <= 0) return;
        setLoading(true);
        setTimeout(() => {
            deposit(parseFloat(amount));
            setLoading(false);
            setAmount('');
            window.dispatchEvent(new CustomEvent('halo-toast', {
                detail: { message: `✓ Deposited ${amount} BNB — Position active` }
            }));
        }, 1500);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Deposit Assets</h1>
            <p className={styles.subtitle}>Add BNB to the vault to start earning yield.</p>

            <div className={styles.grid}>
                <Card className={styles.formCard}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Amount to Deposit</label>
                        <Input
                            placeholder="0.00 BNB"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            rightElement={
                                <Button variant="secondary" onClick={() => setAmount('10.0')} style={{ height: '32px', fontSize: '12px' }}>
                                    MAX
                                </Button>
                            }
                        />
                    </div>

                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Estimated Net APY</span>
                        <span className={styles.positive}>{netApy.toFixed(2)}%</span>
                    </div>

                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Structure</span>
                        <span>50% Staked / 50% Short</span>
                    </div>

                    <Button
                        fullWidth
                        onClick={handleDeposit}
                        disabled={loading || !amount}
                        style={{ marginTop: 24, height: 56 }}
                    >
                        {loading ? "Processing Deposit..." : "Confirm Deposit"}
                    </Button>
                </Card>

                <Card className={styles.infoCard}>
                    <div className={styles.iconBox}>
                        <ArrowDownCircle size={32} color="var(--accent)" />
                    </div>
                    <h3>How it works</h3>
                    <p>
                        Your deposit is split. Half is staked to earn validator rewards.
                        Half is used as collateral to short BNB, capturing funding rates.
                        This creates a delta-neutral position.
                    </p>
                    <div className={styles.divider}></div>
                    <p className={styles.note}>
                        <strong>Note:</strong> Deposits are processed in a single transaction.
                        Gas fees will be higher than a standard transfer.
                    </p>
                </Card>
            </div>
        </div>
    );
}
