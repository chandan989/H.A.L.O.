import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    children: ReactNode;
    fullWidth?: boolean;
}

export default function Button({
    variant = 'primary',
    children,
    fullWidth = false,
    className,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            className={clsx(
                styles.button,
                styles[variant],
                fullWidth && styles.fullWidth,
                disabled && styles.disabled,
                className
            )}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
