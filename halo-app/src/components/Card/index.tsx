import { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export default function Card({ children, className, ...props }: CardProps) {
    return (
        <div className={clsx(styles.card, className)} {...props}>
            {children}
        </div>
    );
}
