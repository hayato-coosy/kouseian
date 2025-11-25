'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface AccordionProps {
    children: React.ReactNode;
    className?: string;
}

interface AccordionItemProps {
    children: React.ReactNode;
    value: string;
    className?: string;
}

interface AccordionTriggerProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    isOpen?: boolean;
}

interface AccordionContentProps {
    children: React.ReactNode;
    className?: string;
    isOpen?: boolean;
}

// Simple Accordion Context to manage state if needed, but for now we can control it from parent or keep it simple
// Actually, let's make a simple controlled/uncontrolled accordion system
// For this specific use case (Step 1, 2, 3), we might want to control it from the parent page.
// But let's build a generic one that can be used.

export function Accordion({ children, className }: AccordionProps) {
    return <div className={cn('space-y-2', className)}>{children}</div>;
}

export function AccordionItem({ children, className, value }: AccordionItemProps) {
    return <div className={cn('border-b border-[var(--card-border)] last:border-0', className)}>{children}</div>;
}

export function AccordionTrigger({ children, className, onClick, isOpen }: AccordionTriggerProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 w-full text-left',
                className
            )}
            data-state={isOpen ? 'open' : 'closed'}
            type="button"
        >
            {children}
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </button>
    );
}

export function AccordionContent({ children, className, isOpen }: AccordionContentProps) {
    if (!isOpen) return null;
    return (
        <div
            className={cn(
                'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down pb-4 pt-0',
                className
            )}
            data-state={isOpen ? 'open' : 'closed'}
        >
            {children}
        </div>
    );
}
