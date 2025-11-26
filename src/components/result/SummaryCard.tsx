'use client';

import { Card } from '@/components/ui/Card';
import { Calendar, User } from 'lucide-react';
import { BriefResult } from '@/types/brief';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface SummaryCardProps {
    summary: BriefResult['summary'];
}

export function SummaryCard({ summary }: SummaryCardProps) {
    return (
        <div id="project-summary" className="scroll-mt-24">
            <SectionHeader title="Summary" className="mb-6" />
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm p-6 md:p-8">
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-sm font-medium text-[var(--primary-blue)]">
                        <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded text-blue-700 dark:text-blue-300">
                            {summary.type}
                        </span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-600 dark:text-gray-400">{summary.client}</span>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] leading-tight">
                        {summary.title}
                    </h1>

                    <div className="flex flex-wrap gap-4 py-4 border-y border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-500">
                                <Calendar size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">納期</p>
                                <p className="text-sm font-semibold text-[var(--foreground)]">{summary.deadline}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-500">
                                <User size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">クライアント</p>
                                <p className="text-sm font-semibold text-[var(--foreground)]">{summary.client}</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {summary.overview}
                    </p>
                </div>
            </Card>
        </div>
    );
}
