'use client';

import { BriefResult } from '@/types/brief';
import { SummaryCard } from './SummaryCard';
import { DetailsSection } from './DetailsSection';
import { ChecklistSection } from './ChecklistSection';
import { AnchorNav } from './AnchorNav';

interface BriefDisplayProps {
    data: BriefResult;
}

export function BriefDisplay({ data }: BriefDisplayProps) {
    return (
        <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Sidebar Navigation (PC only) */}
            <AnchorNav />

            {/* Main Content */}
            <div className="flex-1 space-y-12 min-w-0">
                <SummaryCard summary={data.summary} />
                <DetailsSection details={data.details} />
                <ChecklistSection actions={data.actions} />
            </div>
        </div>
    );
}
