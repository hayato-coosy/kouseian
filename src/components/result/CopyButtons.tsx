'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Copy, Check, FileText } from 'lucide-react';
import { BriefResult } from '@/types/brief';

interface CopyButtonsProps {
    data: BriefResult;
}

export function CopyButtons({ data }: CopyButtonsProps) {
    const [copiedAll, setCopiedAll] = useState(false);
    const [copiedNotion, setCopiedNotion] = useState(false);

    const generateMarkdown = () => {
        return `
# ${data.summary.title}

## Summary
- **Client**: ${data.summary.client}
- **Type**: ${data.summary.type}
- **Deadline**: ${data.summary.deadline}
- **Overview**: ${data.summary.overview}

## Details
### Background
${data.details.background}

### Problem
${data.details.problem}

### Goal
${data.details.goal}

### Elements
${data.details.elements}

### Target
${data.details.target}

### Channel
${data.details.channel}

### KPI
${data.details.kpi}

### Tone & Manner
${data.details.tone}

### References
${data.details.references}

### NG Examples
${data.details.ng_examples}

### Constraints
${data.details.constraints}

## Next Actions
${data.actions.map(a => `### ${a.category}\n${a.items.map(i => `- [ ] ${i}`).join('\n')}`).join('\n\n')}
        `.trim();
    };

    const copyAll = () => {
        navigator.clipboard.writeText(generateMarkdown());
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
    };

    const copyForNotion = () => {
        // Notion handles markdown well, so we use the same markdown but maybe with slightly different formatting if needed.
        // For now, standard markdown is good for Notion.
        navigator.clipboard.writeText(generateMarkdown());
        setCopiedNotion(true);
        setTimeout(() => setCopiedNotion(false), 2000);
    };

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                onClick={copyForNotion}
                className="hidden sm:flex"
            >
                {copiedNotion ? <Check className="w-4 h-4 mr-2" /> : <FileText className="w-4 h-4 mr-2" />}
                {copiedNotion ? 'Copied' : 'Notion形式'}
            </Button>
            <Button
                onClick={copyAll}
                className="bg-[var(--primary-blue)] text-white hover:opacity-90 shadow-md"
            >
                {copiedAll ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copiedAll ? 'コピーしました' : '全体をコピー'}
            </Button>
        </div>
    );
}
