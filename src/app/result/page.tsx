'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BriefDisplay } from '@/components/result/BriefDisplay';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { FixedToolbar } from '@/components/result/FixedToolbar';
import { CopyButtons } from '@/components/result/CopyButtons';
import { ShareButton } from '@/components/result/ShareButton';
import { BriefResult } from '@/types/brief';

export default function ResultPage() {
    const router = useRouter();
    const [data, setData] = useState<BriefResult | null>(null);

    useEffect(() => {
        const storedData = sessionStorage.getItem('briefResult');
        if (storedData) {
            try {
                setData(JSON.parse(storedData));
            } catch (e) {
                console.error('Failed to parse result data', e);
            }
        } else {
            // Redirect back to home if no data found
            router.push('/');
        }
    }, [router]);

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-[var(--primary-blue)] border-t-transparent rounded-full animate-spin" />
                    <div className="text-gray-400 animate-pulse">Loading result...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-32 lg:pb-20">
            {/* Header / Nav */}
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
                    <Button variant="ghost" onClick={() => router.push('/')} className="pl-0 hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-400">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        トップに戻る
                    </Button>

                    {/* PC only copy buttons */}
                    <div className="hidden lg:flex items-center gap-2">
                        <ShareButton data={data} variant="outline" />
                        <CopyButtons data={data} />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="mb-8 print:hidden text-center">
                    <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">デザインブリーフ生成完了</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        AIが要件を整理しました。内容を確認し、ネクストアクションを実行してください。
                    </p>
                </div>

                <BriefDisplay data={data} storageKey="brief_local" />

                <div className="mt-12 text-center text-xs text-gray-400 dark:text-gray-500 print:hidden">
                    この画面に表示されている内容はブラウザ内でのみ保持され、サーバー側には保存されません。<br />
                    「保存して共有」ボタンを押すと、サーバーに保存され共有リンクが発行されます。
                </div>
            </div>

            <FixedToolbar data={data} />
        </div>
    );
}
