'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const SECTIONS = [
    { id: 'project-summary', label: 'Summary' },
    { id: 'project-details', label: 'Project Details' },
    { id: 'next-actions', label: 'Next Actions' },
];

export function AnchorNav() {
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -50% 0px' }
        );

        SECTIONS.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="hidden lg:block sticky top-24 w-64 shrink-0 h-fit">
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 px-2">目次</h3>
                <ul className="space-y-1">
                    {SECTIONS.map(({ id, label }) => (
                        <li key={id}>
                            <button
                                onClick={() => scrollToSection(id)}
                                className={cn(
                                    "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                                    activeSection === id
                                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                                )}
                            >
                                {label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
