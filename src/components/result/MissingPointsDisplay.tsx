'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface MissingPointsDisplayProps {
    points: string[];
}

export function MissingPointsDisplay({ points }: MissingPointsDisplayProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const text = points.map(p => `- ${p}`).join('\n');
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="h-full flex flex-col border-amber-200 bg-amber-50/30 shadow-md dark:border-amber-900/50 dark:bg-amber-950/10">
            <CardHeader className="border-b border-amber-100 bg-amber-50/50 flex flex-row items-center justify-between py-4 dark:border-amber-900/50 dark:bg-amber-950/20">
                <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-50">追加で確認すべきポイント</CardTitle>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="bg-white border-amber-200 text-amber-800 hover:bg-amber-50 hover:text-amber-900 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-400 dark:hover:bg-amber-900/50 dark:hover:text-amber-300"
                >
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? 'コピーしました' : 'まとめてコピー'}
                </Button>
            </CardHeader>
            <CardContent className="flex-1 p-6">
                <p className="text-sm text-gray-600 mb-6 dark:text-gray-400">
                    依頼内容から見て、事前に確認しておくとよい点をリストアップしています。
                    そのままSlack等に貼り付けて、依頼者への確認に使ってください。
                </p>
                <ul className="space-y-3">
                    {points.map((point, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-800 bg-white p-3 rounded-lg border border-amber-100 shadow-sm dark:bg-gray-900 dark:border-amber-900/30 dark:text-gray-300">
                            <span className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 dark:bg-amber-900/50 dark:text-amber-400">
                                {index + 1}
                            </span>
                            <span className="text-sm leading-relaxed">{point}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
