'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Copy, Check, Printer, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface Section {
    title: string;
    content: string;
}

interface BriefDisplayProps {
    sections: Section[];
}

export function BriefDisplay({ sections }: BriefDisplayProps) {
    const [copied, setCopied] = useState(false);
    const [slackCopied, setSlackCopied] = useState(false);

    const generateFullText = () => {
        return sections.map(s => `## ${s.title}\n\n${s.content}`).join('\n\n');
    };

    const handleCopy = async () => {
        const text = generateFullText();
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSlackCopy = async () => {
        const fullText = generateFullText();
        // Simple conversion for Slack
        const slackText = fullText
            .replace(/^##\s+(.*)$/gm, '*$1*') // Headers to Bold
            .replace(/\*\*(.*)\*\*/g, '*$1*') // Bold to Bold
            .replace(/^- /gm, '• '); // List items

        await navigator.clipboard.writeText(slackText);
        setSlackCopied(true);
        setTimeout(() => setSlackCopied(false), 2000);
    };

    const handlePrint = () => {
        window.print();
    };

    if (!sections || sections.length === 0) {
        return <div className="text-center py-10">表示するデータがありません</div>;
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Actions Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 print:hidden">
                <div>
                    <h2 className="text-2xl font-semibold text-[var(--foreground)]">生成されたデザインブリーフ</h2>
                    <p className="text-sm text-gray-500">
                        全{sections.length}セクション
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        className="rounded-full border-[var(--card-border)] bg-[var(--card-background)] text-[var(--foreground)] hover:bg-[var(--background)]"
                    >
                        {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        {copied ? 'コピー完了' : '全文コピー'}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSlackCopy}
                        className="rounded-full border-[var(--card-border)] bg-[var(--card-background)] text-[var(--foreground)] hover:bg-[var(--background)]"
                    >
                        {slackCopied ? <Check className="w-4 h-4 mr-2" /> : <MessageSquare className="w-4 h-4 mr-2" />}
                        {slackCopied ? 'Slack用コピー完了' : 'Slack用'}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePrint}
                        className="rounded-full border-[var(--card-border)] bg-[var(--card-background)] text-[var(--foreground)] hover:bg-[var(--background)]"
                    >
                        <Printer className="w-4 h-4 mr-2" />
                        PDF / 印刷
                    </Button>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid gap-6 print:block print:space-y-8">
                {sections.map((section, index) => (
                    <Card key={index} className="border-[var(--card-border)] shadow-sm rounded-2xl bg-[var(--card-background)] print:shadow-none print:border-none print:break-inside-avoid">
                        <CardHeader className="border-b border-[var(--card-border)] bg-[var(--background)]/50 py-4 px-6 rounded-t-2xl">
                            <CardTitle className="text-lg font-semibold text-[var(--foreground)]">
                                {section.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 prose prose-sm md:prose-base max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-[var(--primary-blue)]">
                            <ReactMarkdown>{section.content}</ReactMarkdown>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

