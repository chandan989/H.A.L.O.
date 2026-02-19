import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    rightElement?: React.ReactNode;
}

export default function Input({ className, rightElement, ...props }: InputProps) {
    return (
        <div className={styles.wrapper}>
            <input
                className={clsx(styles.input, className)}
                {...props}
            />
            {rightElement && <div className={styles.rightElement}>{rightElement}</div>}
        </div>
    );
}
