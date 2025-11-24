'use client';

import { Button } from '@/components/ui/Button';
import { ArrowDown, CheckCircle2, XCircle } from 'lucide-react';

export function Hero() {
    const scrollToForm = () => {
        const formElement = document.getElementById('brief-form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="py-20 md:py-28 bg-[var(--background)]">
            <div className="container mx-auto px-4 text-center max-w-5xl">
                <div className="mb-8 inline-flex items-center rounded-full border border-[var(--card-border)] bg-[var(--card-background)] px-3 py-1 text-sm text-[var(--primary-blue)] shadow-sm">
                    <span className="flex h-2 w-2 rounded-full bg-[var(--primary-blue)] mr-2"></span>
                    Design Brief Generator
                </div>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--foreground)] mb-6 leading-tight">
                    依頼の「想い」を、30秒で<br className="hidden md:block" />
                    <span className="text-[var(--primary-blue)]">“クリエイティブの設計図”</span>に
                </h1>

                <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-3xl mx-auto">
                    依頼文を貼るだけで、AIが要件を整理。<br className="hidden md:block" />
                    ディレクターとデザイナーの認識を揃え、プロジェクトの初速を最大化します。
                </p>

                <div className="flex justify-center mb-20">
                    <Button size="lg" onClick={scrollToForm} className="rounded-full px-10 text-lg h-14 shadow-lg shadow-blue-500/30 bg-[var(--primary-blue)] hover:opacity-90 text-white transition-all hover:scale-105">
                        ブリーフを作成する
                        <ArrowDown className="ml-2 h-5 w-5" />
                    </Button>
                </div>

                {/* Before / After Section */}
                <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                    {/* Before Card */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-200 dark:from-gray-800 dark:to-gray-700"></div>
                        <div className="relative bg-[var(--card-background)] p-8 rounded-2xl border border-[var(--card-border)] shadow-sm h-full">
                            <div className="flex items-center gap-2 mb-4 text-gray-500 font-bold">
                                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs dark:bg-gray-800 dark:text-gray-400">Before</span>
                                <span>チャットベースの相談</span>
                            </div>
                            <div className="bg-[var(--input-background)] p-4 rounded-xl text-sm text-gray-500 font-mono leading-relaxed">
                                「新商品のLP作りたいです。<br />
                                ターゲットは30代女性。<br />
                                おしゃれな感じでお願いします。<br />
                                納期はなる早で」
                            </div>
                            <p className="mt-4 text-xs text-gray-400 font-medium">
                                ・ ニュアンスが伝わりにくい<br />
                                ・ 目的や背景の共有が必要<br />
                                ・ 具体的な仕様が未定
                            </p>
                        </div>
                    </div>

                    {/* After Card */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-200 dark:from-blue-800/40 dark:to-indigo-800/40"></div>
                        <div className="relative bg-[var(--card-background)] p-8 rounded-2xl border border-[var(--card-border)] shadow-lg h-full">
                            <div className="flex items-center gap-2 mb-4 text-[var(--primary-blue)] font-bold">
                                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs dark:bg-blue-900/50 dark:text-blue-300">After</span>
                                <span>整理された要件定義</span>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">目的・ゴール</span>
                                    <p className="text-sm text-[var(--foreground)] font-medium">新商品の認知拡大と、無料サンプル請求の獲得</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">ターゲット</span>
                                    <p className="text-sm text-[var(--foreground)] font-medium">30代後半の働く女性（時短・効率重視）</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">トーン＆マナー</span>
                                    <p className="text-sm text-[var(--foreground)] font-medium">「洗練」「信頼感」 - 余白を活かしたシンプルなデザイン</p>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-[var(--card-border)] flex items-center gap-2 text-xs text-[var(--primary-blue)] font-medium">
                                <CheckCircle2 className="w-4 h-4" />
                                共通認識を持ってスタートできる
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
