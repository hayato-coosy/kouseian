'use client';

import { UseFormRegister } from 'react-hook-form';
import { Textarea } from '@/components/ui/Textarea';
import { BriefFormData } from '@/types/brief';

interface Step1Props {
    register: UseFormRegister<BriefFormData>;
}

export function Step1({ register }: Step1Props) {
    return (
        <div className="space-y-4">
            {/* Header removed as it is handled by AccordionTrigger in parent */}
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
    );
}
