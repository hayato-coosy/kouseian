import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning' | 'info';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
    const variants = {
        default: 'border-transparent bg-[var(--primary-blue)] text-white hover:bg-[var(--primary-blue)]/80',
        secondary: 'border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200/80 dark:bg-gray-800 dark:text-gray-50',
        outline: 'text-[var(--foreground)]',
        destructive: 'border-transparent bg-[var(--error-red)] text-white hover:bg-[var(--error-red)]/80',
        success: 'border-transparent bg-green-500 text-white hover:bg-green-600/80',
        warning: 'border-transparent bg-orange-500 text-white hover:bg-orange-600/80',
        info: 'border-transparent bg-blue-500 text-white hover:bg-blue-600/80',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:focus:ring-gray-300',
                variants[variant],
                className
            )}
            {...props}
        />
    );
}
