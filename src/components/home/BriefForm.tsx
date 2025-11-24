'use client';

import { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Save, Sparkles, HelpCircle, AlertCircle } from 'lucide-react';

export type BriefFormData = {
    // Basic Info
    request_text: string;
    title: string;
    client_name?: string;
    deliverable_type: string;
    deliverable_type_other?: string;

    // Dynamic fields
    banner_size?: string;
    lp_page_count?: string;
    app_os?: string;
    sns_format?: string;
    website_pages?: string;

    due_date?: string;

    background: string;
    problem: string;
    goal: string;
    elements: string;

    // Detailed Info
    target_user_tags?: string[];
    target_user_text?: string;
    business_goal_tags?: string[];
    business_goal_text?: string;
    channels?: string[];
    tone_tags?: string[];
    tone_keywords?: string;
    reference_urls?: string;
    ng_examples?: string;
    constraints?: string;
};

const DELIVERABLE_TYPES = [
    'Webサイト', 'LP', 'バナー', 'バナー大量制作', 'アプリUI',
    'プレゼン資料', 'ロゴ', 'SNS画像（Instagram/X）', '印刷物（パンフ・チラシ）', '採用資料', 'その他'
];

const TARGET_TAGS = [
    '一般消費者', 'BtoB', '経営層', '20代〜30代', '40代以上',
    '既存顧客', '新規顧客', '学生', '採用候補者', '女性向け', '男性向け'
];

const CHANNEL_OPTIONS = [
    '広告（Google / Meta）', 'SEO', 'SNS（Instagram/X/TikTok）',
    'メール / メルマガ', '比較サイト', 'イベント', 'オフライン（紙媒体）'
];

const TONE_TAGS = [
    'シンプル', 'ミニマル', '上品', '親しみ',
    'テック', 'コーポレート', 'ラグジュアリー',
    '女性向け', '男性向け', 'カジュアル', 'モダン'
];

const STORAGE_KEY = 'brief_form_draft';

export function BriefForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [savedMessage, setSavedMessage] = useState<string | null>(null);

    const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<BriefFormData>({
        defaultValues: {
            tone_tags: [],
            target_user_tags: [],
            channels: []
        }
    });

    const formData = watch();
    const deliverableType = watch('deliverable_type');
    const toneTags = watch('tone_tags') || [];
    const targetTags = watch('target_user_tags') || [];
    const channels = watch('channels') || [];

    // Load from LocalStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                reset(parsed);
            } catch (e) {
                console.error('Failed to load draft', e);
            }
        }
    }, [reset]);

    // Save to LocalStorage
    const saveDraft = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        setSavedMessage('下書きを保存しました');
        setTimeout(() => setSavedMessage(null), 3000);
    };

    const toggleTag = (field: 'tone_tags' | 'target_user_tags', tag: string) => {
        const currentTags = field === 'tone_tags' ? toneTags : targetTags;
        if (currentTags.includes(tag)) {
            setValue(field, currentTags.filter(t => t !== tag));
        } else {
            setValue(field, [...currentTags, tag]);
        }
    };

    const toggleChannel = (channel: string) => {
        if (channels.includes(channel)) {
            setValue('channels', channels.filter(c => c !== channel));
        } else {
            setValue('channels', [...channels, channel]);
        }
    };

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

            // Clear draft after successful generation
            localStorage.removeItem(STORAGE_KEY);

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
        <section id="brief-form" className="py-12 bg-white dark:bg-gray-950">
            <div className="container mx-auto px-4 max-w-4xl">
                <Card className="border-gray-200 shadow-xl shadow-gray-200/50 dark:border-gray-800 dark:shadow-none relative overflow-visible">
                    {/* Save Draft Button */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                        {savedMessage && <span className="text-xs text-green-600 font-medium animate-fade-in">{savedMessage}</span>}
                        <button
                            onClick={saveDraft}
                            type="button"
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors bg-white/50 dark:bg-gray-900/50 rounded-full"
                            title="下書きを保存"
                        >
                            <Save size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 p-6 md:p-10">

                        {/* 1. Request Text (Hero / Intro) */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-[var(--primary-blue)] text-white text-xs font-bold px-2 py-1 rounded-full">STEP 1</span>
                                <h2 className="text-xl font-semibold text-[var(--foreground)]">依頼内容を入力</h2>
                            </div>
                            <p className="text-sm text-gray-500">
                                Slackやメールの依頼文、または口頭で共有された内容をそのまま貼り付けてください。<br />
                                箇条書きやメモ書きでも構いません。
                            </p>
                            <Textarea
                                placeholder="例）新商品のプロテインのLPを作りたい。ターゲットは30代女性で、美容目的。トンマナはピンク系で可愛らしく。納期は来月末まで。"
                                className="min-h-[150px] text-base leading-relaxed resize-none border-transparent bg-[var(--input-background)] focus:ring-2 focus:ring-[var(--primary-blue)] rounded-xl p-4"
                                {...register('request_text')}
                            />
                        </div>

                        <hr className="border-[var(--card-border)]" />

                        {/* 2. Basic Info */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-[var(--primary-blue)] text-white text-xs font-bold px-2 py-1 rounded-full">STEP 2</span>
                                <h2 className="text-xl font-semibold text-[var(--foreground)]">基本情報を整理</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <Input
                                    label="案件タイトル（必須）"
                                    placeholder="例）2025年春キャンペーンLP制作"
                                    className="bg-[var(--input-background)] border-transparent focus:ring-[var(--primary-blue)] rounded-xl h-12"
                                    {...register('title', { required: 'タイトルは必須です' })}
                                    error={errors.title?.message}
                                />
                                <Input
                                    label="クライアント名"
                                    placeholder="例）株式会社〇〇"
                                    className="bg-[var(--input-background)] border-transparent focus:ring-[var(--primary-blue)] rounded-xl h-12"
                                    {...register('client_name')}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[var(--foreground)]">成果物タイプ（必須）</label>
                                    <select
                                        className="w-full h-12 px-3 rounded-xl border-transparent bg-[var(--input-background)] focus:ring-2 focus:ring-[var(--primary-blue)] text-[var(--foreground)]"
                                        {...register('deliverable_type', { required: '成果物は必須です' })}
                                    >
                                        <option value="">選択してください</option>
                                        {DELIVERABLE_TYPES.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    {errors.deliverable_type && <p className="text-sm text-[var(--error-red)]">{errors.deliverable_type.message}</p>}
                                </div>

                                {/* Dynamic Fields based on Deliverable Type */}
                                {deliverableType === 'その他' && (
                                    <Input
                                        label="その他の成果物"
                                        placeholder="具体的に入力してください"
                                        className="bg-[var(--input-background)] border-transparent focus:ring-[var(--primary-blue)] rounded-xl h-12"
                                        {...register('deliverable_type_other')}
                                    />
                                )}
                                {(deliverableType === 'バナー' || deliverableType === 'バナー大量制作' || deliverableType === 'SNS画像（Instagram/X）') && (
                                    <Input
                                        label="サイズ / 枚数"
                                        placeholder="例）1080x1080, 1200x630 / 計5枚"
                                        className="bg-[var(--input-background)] border-transparent focus:ring-[var(--primary-blue)] rounded-xl h-12"
                                        {...register('banner_size')}
                                    />
                                )}
                                {deliverableType === 'LP' && (
                                    <Input
                                        label="想定ページ長 / 構成案"
                                        placeholder="例）PCで10スクロール程度 / 構成案あり"
                                        className="bg-[var(--input-background)] border-transparent focus:ring-[var(--primary-blue)] rounded-xl h-12"
                                        {...register('lp_page_count')}
                                    />
                                )}
                                {deliverableType === 'アプリUI' && (
                                    <Input
                                        label="対応OS / 画面数"
                                        placeholder="例）iOS, Android / 主要5画面"
                                        className="bg-[var(--input-background)] border-transparent focus:ring-[var(--primary-blue)] rounded-xl h-12"
                                        {...register('app_os')}
                                    />
                                )}
                                {deliverableType === 'Webサイト' && (
                                    <Input
                                        label="ページ数 / サイトマップ"
                                        placeholder="例）TOP + 下層5ページ"
                                        className="bg-[var(--input-background)] border-transparent focus:ring-[var(--primary-blue)] rounded-xl h-12"
                                        {...register('website_pages')}
                                    />
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <Input
                                    label="納期"
                                    type="date"
                                    className="bg-[var(--input-background)] border-transparent focus:ring-[var(--primary-blue)] rounded-xl h-12"
                                    {...register('due_date')}
                                />
                            </div>

                            <div className="space-y-4">
                                <Textarea
                                    label="背景・目的（Why）"
                                    placeholder="なぜこのプロジェクトを行うのか？現状の課題は？"
                                    className="min-h-[100px] bg-[var(--input-background)] border-transparent focus:ring-[var(--primary-blue)] rounded-xl p-4"
                                    {...register('background', { required: '背景は必須です' })}
                                    error={errors.background?.message}
                                />
                                <Textarea
                                    label="解決したい課題（Problem）"
                                    placeholder="ユーザーやクライアントが抱えている悩み"
                                    className="min-h-[100px] bg-[var(--input-background)] border-transparent focus:ring-[var(--primary-blue)] rounded-xl p-4"
                                    {...register('problem', { required: '課題は必須です' })}
                                    error={errors.problem?.message}
                                />
                                <Textarea
                                    label="ゴール（Goal）"
                                    placeholder="この制作物でどうなれば成功か？"
                                    className="min-h-[100px] bg-[var(--input-background)] border-transparent focus:ring-[var(--primary-blue)] rounded-xl p-4"
                                    {...register('goal', { required: 'ゴールは必須です' })}
                                    error={errors.goal?.message}
                                />
                                <Textarea
                                    label="必須要素（Elements）"
                                    placeholder="ロゴ、キャッチコピー、商品写真など、必ず入れるもの"
                                    className="min-h-[100px] bg-[var(--input-background)] border-transparent focus:ring-[var(--primary-blue)] rounded-xl p-4"
                                    {...register('elements', { required: '必須要素は必須です' })}
                                    error={errors.elements?.message}
                                />
                            </div>
                        </div>

                        <hr className="border-[var(--card-border)]" />

                        {/* 3. Detailed Info */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-[var(--primary-blue)] text-white text-xs font-bold px-2 py-1 rounded-full">STEP 3</span>
                                <h2 className="text-xl font-semibold text-[var(--foreground)]">詳細情報（任意）</h2>
                            </div>

                            {/* Target User */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-[var(--foreground)]">ターゲットユーザー</label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {TARGET_TAGS.map(tag => (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => toggleTag('target_user_tags', tag)}
                                            className={`px-3 py-1.5 rounded-full text-sm border transition-all ${targetTags.includes(tag)
                                                ? 'bg-[var(--primary-blue)] border-[var(--primary-blue)] text-white shadow-sm'
                                                : 'bg-[var(--background)] border-[var(--card-border)] text-gray-600 hover:border-[var(--primary-blue)]'
                                                }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                                <Input
                                    placeholder="その他、具体的なターゲット像（例：都内在住の30代OL）"
                                    className="bg-[var(--input-background)] border-transparent focus:ring-[var(--primary-blue)] rounded-xl h-12"
                                    {...register('target_user_text')}
                                />
                            </div>

                            {/* Channels */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-[var(--foreground)]">想定流入チャネル</label>
                                <div className="flex flex-wrap gap-3">
                                    {CHANNEL_OPTIONS.map(channel => (
                                        <label key={channel} className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-[var(--background)] transition-colors">
                                            <input
                                                type="checkbox"
                                                value={channel}
                                                checked={channels.includes(channel)}
                                                onChange={() => toggleChannel(channel)}
                                                className="w-4 h-4 text-[var(--primary-blue)] rounded border-gray-300 focus:ring-[var(--primary-blue)]"
                                            />
                                            <span className="text-sm text-[var(--foreground)]">{channel}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Business Goal */}
                            <div className="space-y-3">
                                <Input
                                    label="ビジネスゴール / KPI"
                                    placeholder="例）資料請求数 120%アップ、CPA 5,000円以下"
                                    className="bg-[var(--input-background)] border-transparent focus:ring-[var(--primary-blue)] rounded-xl h-12"
                                    {...register('business_goal_text')}
                                />
                            </div>

                            {/* Tone & Manner */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-[var(--foreground)]">トーン＆マナー</label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {TONE_TAGS.map(tag => (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => toggleTag('tone_tags', tag)}
                                            className={`px-3 py-1.5 rounded-full text-sm border transition-all ${toneTags.includes(tag)
                                                ? 'bg-[var(--primary-blue)] border-[var(--primary-blue)] text-white shadow-sm'
                                                : 'bg-[var(--background)] border-[var(--card-border)] text-gray-600 hover:border-[var(--primary-blue)]'
                                                }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                                <Input
                                    placeholder="その他、具体的なキーワードやブランドイメージ"
                                    className="bg-[var(--input-background)] border-transparent focus:ring-[var(--primary-blue)] rounded-xl h-12"
                                    {...register('tone_keywords')}
                                />
                            </div>

                            <div className="grid gap-6">
                                <Textarea
                                    label="参考サイト / 参考クリエイティブURL"
                                    placeholder="URLを改行区切りで入力"
                                    className="min-h-[80px] bg-[var(--input-background)] border-transparent focus:ring-[var(--primary-blue)] rounded-xl p-4"
                                    {...register('reference_urls')}
                                />
                                <Textarea
                                    label="NG例 / 避けたいトーン"
                                    placeholder="避けてほしい色味や表現など"
                                    className="min-h-[80px] bg-[var(--input-background)] border-transparent focus:ring-[var(--primary-blue)] rounded-xl p-4"
                                    {...register('ng_examples')}
                                />
                                <Textarea
                                    label="制約事項（法務・ブランドガイドラインなど）"
                                    placeholder="必ず守るべきルールがあれば入力"
                                    className="min-h-[80px] bg-[var(--input-background)] border-transparent focus:ring-[var(--primary-blue)] rounded-xl p-4"
                                    {...register('constraints')}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <Button
                                type="submit"
                                className="w-full h-14 text-lg font-bold bg-[var(--primary-blue)] hover:opacity-90 shadow-lg shadow-blue-200/50 dark:shadow-none transition-all hover:scale-[1.01] rounded-full"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>AIがブリーフを生成中...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-5 h-5" />
                                        <span>AIでブリーフを作成する</span>
                                    </div>
                                )}
                            </Button>
                            {error && (
                                <div className="mt-4 p-4 bg-red-50 text-[var(--error-red)] rounded-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                                    <AlertCircle className="w-5 h-5" />
                                    {error}
                                </div>
                            )}
                        </div>
                    </form>
                </Card>
            </div>
        </section>
    );
}
