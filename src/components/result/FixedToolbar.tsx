'use client';

import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CopyButtons } from './CopyButtons';
import { ShareButton } from './ShareButton';
import { BriefResult } from '@/types/brief';

interface FixedToolbarProps {
    data: BriefResult;
}

export function FixedToolbar({ data }: FixedToolbarProps) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 z-50 lg:hidden">
            <div className="container mx-auto flex items-center justify-between gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={scrollToTop}
                    className="shrink-0"
                >
                    <ArrowUp className="w-5 h-5" />
                </Button>
                <div className="flex-1 flex justify-end gap-2">
                    <ShareButton data={data} variant="outline" className="h-10" />
                    <CopyButtons data={data} />
                </div>
            </div>
        </div>
    );
}
