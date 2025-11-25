'use client';

import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { BriefFormData, DELIVERABLE_TYPES } from '@/types/brief';

interface Step2Props {
    register: UseFormRegister<BriefFormData>;
    errors: FieldErrors<BriefFormData>;
    watch: UseFormWatch<BriefFormData>;
}

export function Step2({ register, errors, watch }: Step2Props) {
    const deliverableType = watch('deliverable_type');

    return (
        <div className="space-y-8">
            {/* Header removed as it is handled by AccordionTrigger in parent */}

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
                        className="w-full h-12 px-3 rounded-xl border-transparent bg-[var(--input-background)] focus:ring-2 focus:ring-[var(--primary-blue)] text-[var(--foreground)] text-base"
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
    );
}
