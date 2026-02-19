import { HTMLAttributes } from 'react';
import styles from './UILabel.module.css';
import { clsx } from 'clsx';

export default function UILabel({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
    return (
        <span className={clsx(styles.label, className)} {...props}>
            {children}
        </span>
    );
}
