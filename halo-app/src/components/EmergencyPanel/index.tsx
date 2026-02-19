import { useState } from 'react';
import Card from '../Card';
import Button from '../Button';
import styles from './EmergencyPanel.module.css';
import Modal from '../Modal';
import { useHaloStore } from '../../store/useHaloStore';

export default function EmergencyPanel() {
    const [showModal, setShowModal] = useState(false);
    const { disconnectWallet } = useHaloStore();

    const handleDeLeverage = () => {
        // In a real app this would trigger the flash loan tx
        window.dispatchEvent(new CustomEvent('halo-toast', {
            detail: { message: "⚠ Emergency De-Leverage Triggered" }
        }));
        setShowModal(false);
    };

    return (
        <>
            <Card className={styles.container}>
                <h2 className={styles.title}>⚡ Emergency De-Leverage</h2>
                <p className={styles.body}>
                    In extreme tail-risk events, the standard rebalance loop cannot react fast enough.
                    The vault executes an atomic flash loan exit — borrow, close short, unlock collateral, repay — in a single transaction.
                    Fully succeeds or fully reverts.
                </p>
                <Button variant="danger" fullWidth onClick={() => setShowModal(true)}>
                    Trigger Emergency De-Leverage
                </Button>
            </Card>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <h2 className={styles.modalTitle}>⚠ Confirm Emergency Action</h2>
                    <p className={styles.modalBody}>
                        This will atomically close the short position and return all assets proportionally. Cannot be undone.
                    </p>
                    <div className={styles.modalButtons}>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button variant="danger" onClick={handleDeLeverage}>Confirm De-Leverage</Button>
                    </div>
                </Modal>
            )}
        </>
    );
}
