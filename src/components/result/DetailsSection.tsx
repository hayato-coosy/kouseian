'use client';

import { Card } from '@/components/ui/Card';
import { BriefResult } from '@/types/brief';
import ReactMarkdown from 'react-markdown';

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

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {sections.map((section) => (
                <Card key={section.key} className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 h-full">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl">{section.icon}</span>
                        <h3 className="font-bold text-[var(--foreground)]">{section.title}</h3>
                    </div>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                        <ReactMarkdown>
                            {details[section.key as keyof typeof details] || 'なし'}
                        </ReactMarkdown>
                    </div>
                </Card>
            ))}
        </div>
    );
}
