'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

export type BriefFormData = {
    title: string;
    client_name?: string;
    deliverable_type: string;
    deliverable_type_other?: string;
    due_date?: string;
    priority?: 'high' | 'medium' | 'low';
    background: string;
    problem: string;
    goal: string;
    elements: string;
    target_user?: string;
    business_goal?: string;
    channels?: string;
    tone_keywords?: string;
    reference_urls?: string;
    ng_examples?: string;
    constraints?: string;
};

export function BriefForm() {
    const router = useRouter();
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<BriefFormData>();
    const deliverableType = watch('deliverable_type');

    // Dynamic placeholders based on deliverable type
    const getPlaceholders = (type: string) => {
        switch (type) {
            case 'LP':
                return {
                    background: '例）新サービスの認知拡大のために、LPを作成したいです。12月リリース予定です。',
                    problem: '例）今は既存サイトの1ページで説明しており、サービスの特徴が十分に伝わっていません。',
                    goal: '例）まずは資料請求数と無料トライアル申込数を増やしたいです。',
                    elements: '例）\n・ターゲットは20〜30代の会社員\n・料金プラン表\n・導入企業ロゴ\n・よくある質問（FAQ）'
                };
            case 'バナー':
                return {
                    background: '例）年末セールの集客強化のため、バナーを作成したいです。',
                    problem: '例）クリック率が低下しているため、新しい訴求を試したいです。',
                    goal: '例）セール特設ページへの誘導数を最大化したいです。',
                    elements: '例）\n・「最大50%OFF」の文字を目立たせる\n・商品Aの写真を使用\n・サイズ：1200x630, 1080x1080\n・掲載面：Instagram広告, GDN'
                };
            case 'プレゼン資料':
                return {
                    background: '例）来週の経営会議で、新プロジェクトの承認を得るための資料が必要です。',
                    problem: '例）プロジェクトの意義と収益性が伝わりにくい点。',
                    goal: '例）予算の承認を得ること。',
                    elements: '例）\n・市場規模のデータ\n・競合他社との比較表\n・3年間の収支計画\n・想定ページ数：10ページ程度\n・発表時間：15分'
                };
            default:
                return {
                    background: '例）新サービスの認知拡大のために、LPを作成したいです。12月リリース予定です。',
                    problem: '例）今は既存サイトの1ページで説明しており、サービスの特徴が十分に伝わっていません。',
                    goal: '例）まずは資料請求数と無料トライアル申込数を増やしたいです。',
                    elements: '例）\n・ターゲットは20〜30代の会社員\n・料金プラン表\n・導入企業ロゴ\n・よくある質問（FAQ）'
                };
        }
    };

    const placeholders = getPlaceholders(deliverableType);

    const onSubmit = async (data: BriefFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/generate-brief', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('生成に失敗しました');
            }

            const result = await response.json();

            // Store result in sessionStorage to pass to result page without URL limits
            sessionStorage.setItem('briefResult', JSON.stringify(result));
            router.push('/result');

        } catch (err) {
            console.error(err);
            setError('生成に失敗しました。時間をおいて再度お試しください。');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="brief-form" className="py-16 bg-white dark:bg-gray-950">
            <div className="container mx-auto px-4 max-w-3xl">
                <Card className="border-gray-200 shadow-xl shadow-gray-200/50 dark:border-gray-800 dark:shadow-none">
                    <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-8 dark:bg-gray-900/50 dark:border-gray-800">
                        <CardTitle className="text-2xl text-center dark:text-gray-50">デザインブリーフの元になる情報を入力してください</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                            {/* Essential Fields */}
                            <div className="space-y-6">
                                <div className="grid gap-6">
                                    <Textarea
                                        label="背景（必須）"
                                        placeholder={placeholders.background}
                                        className="min-h-[100px]"
                                        {...register('background', { required: '背景は必須です' })}
                                        error={errors.background?.message}
                                    />
                                    <Textarea
                                        label="解決したい課題（必須）"
                                        placeholder={placeholders.problem}
                                        className="min-h-[100px]"
                                        {...register('problem', { required: '課題は必須です' })}
                                        error={errors.problem?.message}
                                    />
                                    <Textarea
                                        label="今回の目的・ゴール（必須）"
                                        placeholder={placeholders.goal}
                                        className="min-h-[100px]"
                                        {...register('goal', { required: '目的・ゴールは必須です' })}
                                        error={errors.goal?.message}
                                    />
                                    <Textarea
                                        label="入れてほしい要素（必須）"
                                        placeholder={placeholders.elements}
                                        className="min-h-[150px]"
                                        {...register('elements', { required: '要素は必須です' })}
                                        error={errors.elements?.message}
                                    />
                                </div>

                                <Input
                                    label="案件タイトル（必須）"
                                    placeholder="例）新サービス「〇〇」LP制作"
                                    {...register('title', { required: 'タイトルは必須です' })}
                                    error={errors.title?.message}
                                />

                                <div className="grid md:grid-cols-2 gap-6">
                                    <Input
                                        label="クライアント / プロジェクト名"
                                        placeholder="例）大手EC企業A / 〇〇プロジェクト"
                                        {...register('client_name')}
                                    />

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">成果物の種類（必須）</label>
                                        <select
                                            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-50 dark:focus-visible:ring-gray-300"
                                            {...register('deliverable_type', { required: '成果物の種類を選択してください' })}
                                        >
                                            <option value="">選択してください</option>
                                            <option value="Webサイト">Webサイト</option>
                                            <option value="LP">LP</option>
                                            <option value="バナー">バナー</option>
                                            <option value="アプリUI">アプリUI</option>
                                            <option value="プレゼン資料">プレゼン資料</option>
                                            <option value="その他">その他</option>
                                        </select>
                                        {errors.deliverable_type && <p className="text-xs text-red-500 font-medium">{errors.deliverable_type.message}</p>}
                                    </div>
                                </div>

                                {deliverableType === 'その他' && (
                                    <Input
                                        label="その他の成果物"
                                        placeholder="成果物を入力してください"
                                        {...register('deliverable_type_other', { required: '成果物を入力してください' })}
                                        error={errors.deliverable_type_other?.message}
                                    />
                                )}

                                <div className="grid md:grid-cols-2 gap-6">
                                    <Input
                                        type="date"
                                        label="希望納期"
                                        {...register('due_date')}
                                    />

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">優先度</label>
                                        <select
                                            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-50 dark:focus-visible:ring-gray-300"
                                            {...register('priority')}
                                        >
                                            <option value="">選択してください</option>
                                            <option value="high">高</option>
                                            <option value="medium">中</option>
                                            <option value="low">低</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Optional Details Toggle */}
                            <div className="border-t border-gray-100 pt-6 dark:border-gray-800">
                                <button
                                    type="button"
                                    onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                                    className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <span>詳細な情報を追加する（任意）</span>
                                    {isDetailsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>

                                {isDetailsOpen && (
                                    <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <Textarea
                                            label="ターゲットユーザー"
                                            placeholder="例）20〜30代の会社員。オンラインでの申込みに慣れている層。"
                                            {...register('target_user')}
                                        />
                                        <Textarea
                                            label="ビジネスゴール / KPI"
                                            placeholder="例）資料請求数、無料トライアル申込数 など"
                                            {...register('business_goal')}
                                        />
                                        <Textarea
                                            label="想定流入チャネル"
                                            placeholder="例）リスティング広告 / SNS広告 / 既存顧客へのメール など"
                                            {...register('channels')}
                                        />
                                        <Textarea
                                            label="トーン＆マナー / ブランドキーワード"
                                            placeholder="例）信頼感・安心感 / シンプル / かっこよすぎない など"
                                            {...register('tone_keywords')}
                                        />
                                        <Textarea
                                            label="参考サイト / 参考クリエイティブURL"
                                            placeholder="例）https://example.com"
                                            {...register('reference_urls')}
                                        />
                                        <Textarea
                                            label="NG例 / 避けたいトーン"
                                            placeholder="例）過度に派手な表現 / 安売り感が強いコピー など"
                                            {...register('ng_examples')}
                                        />
                                        <Textarea
                                            label="制約事項（法務・ブランドガイドラインなど）"
                                            placeholder="例）ロゴの余白ルールを遵守 / 価格表記のルールあり など"
                                            {...register('constraints')}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center text-sm dark:bg-red-900/20 dark:text-red-400">
                                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full text-lg h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/20"
                                    isLoading={isLoading}
                                >
                                    AIでブリーフを作成する
                                </Button>
                            </div>

                            <p className="text-xs text-center text-gray-400 mt-4 dark:text-gray-500">
                                入力された内容は、ブリーフ生成のために一時的にGemini APIへ送信されます。<br />
                                サーバー側では内容を保存せず、ログにもテキスト本⽂は記録しません。<br />
                                個人情報や機密情報は入力しないでください。
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
