'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BriefDisplay } from '@/components/result/BriefDisplay';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

interface Section {
    title: string;
    content: string;
}

interface BriefResult {
    sections: Section[];
}

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
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Loading result...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="mb-8 print:hidden">
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

            <div className="min-h-[600px] print:h-auto print:min-h-0">
                <BriefDisplay sections={data.sections} />
            </div>

            <div className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500 print:hidden">
                この画面に表示されている内容はブラウザ内でのみ保持され、サーバー側には保存されません。<br />
                必要な内容は、Notionなどの正式なドキュメントにコピーして保管してください。
            </div>
        </div>
    );
}
