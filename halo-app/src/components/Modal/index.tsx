import { ReactNode } from 'react';
import Card from '../Card';
import styles from './Modal.module.css';
import { clsx } from 'clsx';

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
    return (
        <div className={styles.overlay}>
            <Card className={styles.modal}>
                {children}
            </Card>
        </div>
    );
}
