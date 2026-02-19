import { useState } from 'react';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import styles from './Withdraw.module.css';
import { useHaloStore } from '../../store/useHaloStore';
import { ArrowUpCircle } from 'lucide-react';

export default function Withdraw() {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const { withdraw, userDeposit } = useHaloStore();

    const handleWithdraw = () => {
        if (!amount || parseFloat(amount) <= 0) return;
        setLoading(true);
        setTimeout(() => {
            withdraw(parseFloat(amount));
            setLoading(false);
            setAmount('');
            window.dispatchEvent(new CustomEvent('halo-toast', {
                detail: { message: `✓ Withdrew ${amount} shares` }
            }));
        }, 1500);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Withdraw Assets</h1>
            <p className={styles.subtitle}>Redeem your shares and exit the vault.</p>

            <div className={styles.grid}>
                <Card className={styles.formCard}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Shares to Withdraw</label>
                        <Input
                            placeholder="0.00 Shares"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            rightElement={
                                <Button variant="secondary" onClick={() => setAmount(userDeposit.toString())} style={{ height: '32px', fontSize: '12px' }}>
                                    MAX
                                </Button>
                            }
                        />
                    </div>

                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Available Shares</span>
                        <span>{userDeposit.toFixed(3)}</span>
                    </div>

                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Estimated Return</span>
                        <span>{(parseFloat(amount || '0') * 1.0).toFixed(3)} BNB</span>
                    </div>

                    <Button
                        fullWidth
                        onClick={handleWithdraw}
                        disabled={loading || !amount}
                        style={{ marginTop: 24, height: 56 }}
                    >
                        {loading ? "Processing Withdrawal..." : "Confirm Withdrawal"}
                    </Button>
                </Card>

                <Card className={styles.infoCard}>
                    <div className={styles.iconBox}>
                        <ArrowUpCircle size={32} color="var(--accent)" />
                    </div>
                    <h3>Withdrawal Process</h3>
                    <p>
                        When you withdraw, the protocol unwinds your position. It closes the short, unlocks collateral, and unstakes asBNB back to BNB.
                    </p>
                    <div className={styles.divider}></div>
                    <p className={styles.note}>
                        <strong>Note:</strong> large withdrawals may require multiple transactions or a waiting period if liquidity is constrained.
                    </p>
                </Card>
            </div>
        </div>
    );
}
