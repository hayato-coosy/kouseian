'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { BriefResult } from '@/types/brief';
import ReactMarkdown from 'react-markdown';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion';

interface DetailsSectionProps {
    details: BriefResult['details'];
}

export function DetailsSection({ details }: DetailsSectionProps) {
    const sections = [
        { key: 'background', title: '背景・目的 (Why)', icon: '🎯' },
        { key: 'problem', title: '現状の課題 (Problem)', icon: '🤔' },
        { key: 'goal', title: 'ゴール (Goal)', icon: '🏁' },
        { key: 'elements', title: '必須要素 (Elements)', icon: '📦' },
        { key: 'target', title: 'ターゲット', icon: '👥' },
        { key: 'channel', title: '流入チャネル', icon: '📢' },
        { key: 'kpi', title: 'ビジネスゴール / KPI', icon: '📈' },
        { key: 'tone', title: 'トーン＆マナー', icon: '🎨' },
        { key: 'references', title: '参考情報', icon: '🔗' },
        { key: 'ng_examples', title: 'NG項目', icon: '🚫' },
        { key: 'constraints', title: '制約事項', icon: '⚠️' },
    ] as const;

    // Default open sections: background, problem, goal
    const [openSections, setOpenSections] = useState<string[]>(['background', 'problem', 'goal']);

    const toggleSection = (key: string) => {
        setOpenSections(prev =>
            prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
        );
    };

    return (
        <div id="project-details" className="scroll-mt-24 space-y-6">
            <SectionHeader title="Project Details" />

            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                <Accordion className="divide-y divide-gray-100 dark:divide-gray-800">
                    {sections.map((section) => (
                        <AccordionItem key={section.key} value={section.key} className="border-none">
                            <AccordionTrigger
                                isOpen={openSections.includes(section.key)}
                                onClick={() => toggleSection(section.key)}
                                className="px-6 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{section.icon}</span>
                                    <span className="font-bold text-[var(--foreground)]">{section.title}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent
                                isOpen={openSections.includes(section.key)}
                                className="px-6 pb-6"
                            >
                                <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 pt-2">
                                    <ReactMarkdown>
                                        {details[section.key as keyof typeof details] || 'なし'}
                                    </ReactMarkdown>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Card>
        </div>
    );
}
