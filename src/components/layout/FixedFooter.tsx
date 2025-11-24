'use client';

import { useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { SecurityModal } from '@/components/ui/SecurityModal';

export function FixedFooter() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 bg-[var(--background)]/80 backdrop-blur-md border-t border-[var(--card-border)] py-3 px-4 z-50 shadow-sm print:hidden">
                <div className="container mx-auto flex items-center justify-center gap-2 text-xs md:text-sm text-gray-500">
                    <ShieldAlert className="w-4 h-4" />
                    <span>
                        入力データはサーバーに保存されません。
                    </span>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-[var(--primary-blue)] hover:opacity-80 underline underline-offset-2 font-medium"
                    >
                        詳細を確認
                    </button>
                </div>
            </div>

            <SecurityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
