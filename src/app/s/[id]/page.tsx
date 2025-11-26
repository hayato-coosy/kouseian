import { BriefDisplay } from '@/components/result/BriefDisplay';
import { BriefResult } from '@/types/brief';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default async function SharedBriefPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { data: brief, error } = await supabase
        .from('design-brief')
        .select('data')
        .eq('id', id)
        .single();

    if (error || !brief) {
        notFound();
    }

    const data = brief.data as BriefResult;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
            {/* Header / Nav */}
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
                    <Link href="/" passHref>
                        <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-400">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            新しく作成する
                        </Button>
                    </Link>
                    <div className="text-sm font-medium text-gray-500">
                        Shared View
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="mb-8 text-center">
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-medium text-blue-700 bg-blue-100 rounded-full dark:text-blue-300 dark:bg-blue-900/30">
                        共有されたデザインブリーフ
                    </div>
                    <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">デザインブリーフ</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        このページは共有用リンクからアクセスされています。
                    </p>
                </div>

                <BriefDisplay data={data} storageKey={`brief_${id}`} />

                <div className="mt-12 text-center text-xs text-gray-400 dark:text-gray-500">
                    このページは共有リンクを知っている人のみがアクセスできます。
                </div>
            </div>
        </div>
    );
}
