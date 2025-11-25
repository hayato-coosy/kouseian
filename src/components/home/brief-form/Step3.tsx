'use client';

import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { BriefFormData, TARGET_TAGS, CHANNEL_OPTIONS, TONE_TAGS } from '@/types/brief';

interface Step3Props {
    register: UseFormRegister<BriefFormData>;
    watch: UseFormWatch<BriefFormData>;
    setValue: UseFormSetValue<BriefFormData>;
}

export function Step3({ register, watch, setValue }: Step3Props) {
    const toneTags = watch('tone_tags') || [];
    const targetTags = watch('target_user_tags') || [];
    const channels = watch('channels') || [];

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

    return (
        <div className="space-y-8">
            {/* Header removed as it is handled by AccordionTrigger in parent */}

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
    );
}
