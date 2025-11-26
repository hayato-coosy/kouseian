'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Share2, Check, Loader2, Link as LinkIcon } from 'lucide-react';
import { BriefResult } from '@/types/brief';

interface ShareButtonProps {
    data: BriefResult;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    className?: string;
}

export function ShareButton({ data, variant = 'primary', className }: ShareButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleShare = async () => {
        setIsLoading(true);
        try {
            // Save to KV
            const response = await fetch('/api/briefs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Failed to save');

            const { id } = await response.json();
            const url = `${window.location.origin}/s/${id}`;

            // Copy to clipboard
            await navigator.clipboard.writeText(url);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 3000);

        } catch (error) {
            console.error('Share failed:', error);
            alert('共有リンクの作成に失敗しました。');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant={variant}
            onClick={handleShare}
            disabled={isLoading}
            className={className}
        >
            {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : isCopied ? (
                <Check className="w-4 h-4 mr-2" />
            ) : (
                <Share2 className="w-4 h-4 mr-2" />
            )}
            {isLoading ? '保存中...' : isCopied ? 'リンクをコピーしました' : '保存して共有'}
        </Button>
    );
}
