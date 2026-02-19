import { useEffect, useState } from 'react';
import styles from './Toast.module.css';

export default function Toast() {
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const handleToast = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            setMessage(detail.message);
            setTimeout(() => setMessage(null), 4000);
        };

        window.addEventListener('halo-toast', handleToast);
        return () => window.removeEventListener('halo-toast', handleToast);
    }, []);

    if (!message) return null;

    return (
        <div className={styles.toast}>
            {message}
        </div>
    );
}
