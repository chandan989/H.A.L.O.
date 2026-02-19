import { useState } from 'react';
import Card from '../Card';
import Button from '../Button';
import Input from '../Input';
import styles from './DepositWithdrawPanel.module.css';
import { useHaloStore } from '../../store/useHaloStore';
import { clsx } from 'clsx';
import UILabel from '../UILabel';

export default function DepositWithdrawPanel() {
    const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const { deposit, withdraw, netApy } = useHaloStore();

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
        <Card className={styles.container}>
            <div className={styles.tabs}>
                <button
                    className={clsx(styles.tab, activeTab === 'deposit' && styles.activeTab)}
                    onClick={() => setActiveTab('deposit')}
                >
                    DEPOSIT
                </button>
                <button
                    className={clsx(styles.tab, activeTab === 'withdraw' && styles.activeTab)}
                    onClick={() => setActiveTab('withdraw')}
                >
                    WITHDRAW
                </button>
            </div>

            <div className={styles.content}>
                {activeTab === 'deposit' ? (
                    <>
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
                        <div className={styles.estimate}>
                            <UILabel>Estimated Net APY:</UILabel>
                            <span className={clsx(styles.estimateValue, styles.positive)}>{netApy.toFixed(2)}%</span>
                        </div>
                        <Button
                            fullWidth
                            onClick={handleDeposit}
                            disabled={loading || !amount}
                        >
                            {loading ? "Depositing..." : "Deposit BNB"}
                        </Button>
                    </>
                ) : (
                    <>
                        <Input
                            placeholder="0.00 Shares"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <div className={styles.estimate}>
                            <UILabel>Estimated Return:</UILabel>
                            <span className={styles.estimateValue}>0.000 BNB</span>
                        </div>
                        <Button
                            fullWidth
                            onClick={handleWithdraw}
                            disabled={loading || !amount}
                        >
                            {loading ? "Withdrawing..." : "Withdraw"}
                        </Button>
                    </>
                )}
            </div>
        </Card>
    );
}
