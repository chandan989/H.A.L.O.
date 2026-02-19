import { Link } from 'react-router-dom';
import { useHaloStore } from '../../store/useHaloStore';
import Button from '../Button';
import styles from './Navbar.module.css';

export default function Navbar() {
    const { walletAddress, connectWallet, disconnectWallet } = useHaloStore();

    const handleWalletClick = () => {
        if (walletAddress) {
            disconnectWallet();
        } else {
            connectWallet();
        }
    };

    const shortAddress = walletAddress
        ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
        : null;

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    H.A.L.O.
                </Link>

                <div className={styles.links}>
                    <Link to="/" className={styles.link}>How It Works</Link>
                    <Link to="/docs" className={styles.link}>Docs</Link>
                    <Link to="/vault" className={styles.link}>Launch App</Link>

                    <Button
                        variant="primary"
                        onClick={handleWalletClick}
                    >
                        {walletAddress ? shortAddress : "Connect Wallet"}
                    </Button>
                </div>
            </div>
        </nav>
    );
}
