'use client';

import { Button } from '@/components/ui/Button';
import { ArrowDown } from 'lucide-react';

export function Hero() {
    const scrollToForm = () => {
        const formElement = document.getElementById('brief-form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
            <div className="container mx-auto px-4 text-center max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 dark:text-gray-50">
                    デザイン依頼文を、<br className="hidden md:block" />
                    1分で「ブリーフ」に整えるツール
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed dark:text-gray-300">
                    ざっくりした依頼テキストを貼るだけで、<br />
                    デザイナーがすぐ動けるブリーフと、確認すべきポイントを自動生成します。
                </p>
                <p className="text-sm text-gray-500 mb-10 max-w-2xl mx-auto dark:text-gray-400">
                    営業・企画・ディレクターなど、誰でも使える社内ツールです。
                    入力内容と生成結果のテキストはサーバー側に保存されません。
                    個人情報や機密情報を含まない範囲でご利用ください。
                </p>

                <div className="flex justify-center mb-16">
                    <Button size="lg" onClick={scrollToForm} className="rounded-full px-8 text-lg h-14 shadow-lg shadow-blue-900/20">
                        ブリーフを作成する
                        <ArrowDown className="ml-2 h-5 w-5" />
                    </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-6 text-left">
                    <StepCard
                        number="1"
                        title="依頼文を貼り付ける"
                        description="Slackやメールの依頼文をそのままコピペします。"
                    />
                    <StepCard
                        number="2"
                        title="基本情報を入力する"
                        description="案件タイトル・成果物の種類・希望納期など、最低限の情報を入力します。"
                    />
                    <StepCard
                        number="3"
                        title="自動生成されたブリーフを確認する"
                        description="整理されたブリーフと確認ポイントをチェックし、必要に応じて修正します。"
                    />
                </div>
            </div>
        </section>
    );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-900 dark:border-gray-800">
            <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold mb-4 dark:bg-blue-900/30 dark:text-blue-400">
                {number}
            </div>
            <h3 className="font-bold text-gray-900 mb-2 dark:text-gray-50">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed dark:text-gray-400">{description}</p>
        </div>
    );
}
