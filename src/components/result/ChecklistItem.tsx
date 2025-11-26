'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChecklistItemProps {
    label: string;
    checked: boolean;
    onToggle: () => void;
    className?: string;
}

export function ChecklistItem({ label, checked, onToggle, className }: ChecklistItemProps) {
    return (
        <div
            onClick={onToggle}
            className={cn(
                "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors group",
                checked
                    ? "bg-blue-50 dark:bg-blue-900/20"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800",
                className
            )}
        >
            <div className={cn(
                "mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors flex-shrink-0",
                checked
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 group-hover:border-blue-400"
            )}>
                {checked && <Check className="w-3.5 h-3.5" />}
            </div>
            <span className={cn(
                "text-sm leading-relaxed select-none",
                checked
                    ? "text-gray-500 dark:text-gray-400 line-through"
                    : "text-gray-700 dark:text-gray-300"
            )}>
                {label}
            </span>
        </div>
    );
}
