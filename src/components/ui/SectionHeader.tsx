'use client';

import { cn } from '@/lib/utils';

interface SectionHeaderProps {
    title: string;
    className?: string;
    id?: string;
}

export function SectionHeader({ title, className, id }: SectionHeaderProps) {
    return (
        <h2
            id={id}
            className={cn(
                "text-2xl font-bold text-[var(--foreground)] flex items-center gap-2 scroll-mt-24",
                className
            )}
        >
            <span className="w-1 h-8 bg-[var(--primary-blue)] rounded-full"></span>
            {title}
        </h2>
    );
}
