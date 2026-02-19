import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useHaloStore } from '../../store/useHaloStore';
import styles from './VaultLayout.module.css';
import { LayoutDashboard, ArrowDownCircle, ArrowUpCircle, BookOpen, LogOut } from 'lucide-react';
import { clsx } from 'clsx';

export default function VaultLayout() {
    const { walletAddress, disconnectWallet } = useHaloStore();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!walletAddress) {
            navigate('/');
        }
    }, [walletAddress, navigate]);

    if (!walletAddress) return null;

    const navItems = [
        { label: 'Dashboard', path: '/vault', icon: LayoutDashboard },
        { label: 'Deposit', path: '/vault/deposit', icon: ArrowDownCircle },
        { label: 'Withdraw', path: '/vault/withdraw', icon: ArrowUpCircle },
        { label: 'Docs', path: '/docs', icon: BookOpen },
    ];

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarTop}>
                    <div className={styles.logo}>H.A.L.O.</div>
                    <nav className={styles.nav}>
                        {navItems.map((item) => (
                            <div
                                key={item.path}
                                className={clsx(styles.navItem, location.pathname === item.path && styles.active)}
                                onClick={() => navigate(item.path)}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </div>
                        ))}
                    </nav>
                </div>
                <div className={styles.sidebarBottom}>
                    <div className={styles.walletInfo}>
                        <div className={styles.walletLabel}>Connected</div>
                        <div className={styles.walletAddress}>{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</div>
                    </div>
                    <button className={styles.disconnectBtn} onClick={disconnectWallet}>
                        <LogOut size={16} />
                    </button>
                </div>
            </aside>

            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
}
