'use client';

import { BriefResult } from '@/types/brief';
import { SummaryCard } from './SummaryCard';
import { DetailsSection } from './DetailsSection';
import { ActionList } from './ActionList';

interface BriefDisplayProps {
    data: BriefResult;
}

export function BriefDisplay({ data }: BriefDisplayProps) {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <SummaryCard summary={data.summary} />

            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[var(--foreground)] flex items-center gap-2">
                    <span className="w-1 h-8 bg-[var(--primary-blue)] rounded-full"></span>
                    Project Details
                </h2>
                <DetailsSection details={data.details} />
            </div>

            <ActionList actions={data.actions} />
        </div>
    );
}
