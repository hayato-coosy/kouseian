'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BriefDisplay } from '@/components/result/BriefDisplay';
import { MissingPointsDisplay } from '@/components/result/MissingPointsDisplay';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function ResultPage() {
    const router = useRouter();
    const [data, setData] = useState<{ brief: string; missing_points: string[] } | null>(null);

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
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Loading result...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <Button variant="ghost" onClick={() => router.push('/')} className="mb-4 pl-0 hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-400">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    トップに戻る
                </Button>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-gray-50">デザインブリーフが生成されました</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    このままデザイナーや関係者に共有できるレベルまで整形されています。<br />
                    必要に応じて追記・修正してから、Notionなどに転記してください。
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-300px)] min-h-[600px]">
                <div className="lg:col-span-2 h-full">
                    <BriefDisplay brief={data.brief} />
                </div>
                <div className="lg:col-span-1 h-full">
                    <MissingPointsDisplay points={data.missing_points} />
                </div>
            </div>

            <div className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
                この画面に表示されている内容はブラウザ内でのみ保持され、サーバー側には保存されません。<br />
                必要な内容は、Notionなどの正式なドキュメントにコピーして保管してください。
            </div>
        </div>
    );
}
