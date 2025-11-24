'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface BriefDisplayProps {
    brief: string;
}

export function BriefDisplay({ brief }: BriefDisplayProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(brief);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="h-full flex flex-col border-gray-200 shadow-md dark:border-gray-800 dark:bg-gray-900">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50 flex flex-row items-center justify-between py-4 dark:border-gray-800 dark:bg-gray-900/50">
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-50">デザインブリーフ</CardTitle>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? 'コピーしました' : '全文コピー'}
                </Button>
            </CardHeader>
            <CardContent className="flex-1 p-6 overflow-y-auto max-h-[80vh]">
                <p className="text-sm text-gray-500 mb-6 dark:text-gray-400">
                    必要に応じて内容をコピーしてご利用ください。
                </p>
                <div className="prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 dark:prose-invert dark:prose-headings:text-gray-50 dark:prose-p:text-gray-300 dark:prose-li:text-gray-300">
                    <ReactMarkdown>{brief}</ReactMarkdown>
                </div>
            </CardContent>
        </Card>
    );
}
