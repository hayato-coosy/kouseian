'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion';
import { Save, Sparkles, AlertCircle } from 'lucide-react';
import { BriefFormData } from '@/types/brief';
import { Step1 } from './brief-form/Step1';
import { Step2 } from './brief-form/Step2';
import { Step3 } from './brief-form/Step3';

const STORAGE_KEY = 'brief_form_draft';

export function BriefForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [savedMessage, setSavedMessage] = useState<string | null>(null);

    // Accordion state - Step 1 and 2 open by default
    const [openItems, setOpenItems] = useState<string[]>(['step1', 'step2']);

    const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<BriefFormData>({
        defaultValues: {
            tone_tags: [],
            target_user_tags: [],
            channels: []
        }
    });

    const formData = watch();

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

    const toggleAccordion = (value: string) => {
        setOpenItems(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
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

                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-10">

                        <Accordion className="space-y-8">
                            {/* Step 1 */}
                            <AccordionItem value="step1" className="border-none">
                                <AccordionTrigger
                                    onClick={() => toggleAccordion('step1')}
                                    isOpen={openItems.includes('step1')}
                                    className="hover:no-underline py-0 mb-4"
                                >
                                    <div className="flex items-center gap-2 w-full">
                                        <span className="bg-[var(--primary-blue)] text-white text-xs font-bold px-2 py-1 rounded-full">STEP 1</span>
                                        <h2 className="text-xl font-semibold text-[var(--foreground)]">依頼内容を入力</h2>
                                        <span className="ml-auto text-xs text-gray-400 font-normal">
                                            {openItems.includes('step1') ? '閉じる' : '開く'}
                                        </span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent isOpen={openItems.includes('step1')} className="pt-6">
                                    <Step1 register={register} />
                                </AccordionContent>
                            </AccordionItem>

                            <hr className="border-[var(--card-border)]" />

                            {/* Step 2 */}
                            <AccordionItem value="step2" className="border-none">
                                <AccordionTrigger
                                    onClick={() => toggleAccordion('step2')}
                                    isOpen={openItems.includes('step2')}
                                    className="hover:no-underline py-0 mb-4"
                                >
                                    <div className="flex items-center gap-2 w-full">
                                        <span className="bg-[var(--primary-blue)] text-white text-xs font-bold px-2 py-1 rounded-full">STEP 2</span>
                                        <h2 className="text-xl font-semibold text-[var(--foreground)]">基本情報を整理</h2>
                                        <span className="ml-auto text-xs text-gray-400 font-normal">
                                            {openItems.includes('step2') ? '閉じる' : '開く'}
                                        </span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent isOpen={openItems.includes('step2')} className="pt-6">
                                    <Step2 register={register} errors={errors} watch={watch} />
                                </AccordionContent>
                            </AccordionItem>

                            <hr className="border-[var(--card-border)]" />

                            {/* Step 3 */}
                            <AccordionItem value="step3" className="border-none">
                                <AccordionTrigger
                                    onClick={() => toggleAccordion('step3')}
                                    isOpen={openItems.includes('step3')}
                                    className="hover:no-underline py-0 mb-4"
                                >
                                    <div className="flex items-center gap-2 w-full">
                                        <span className="bg-[var(--primary-blue)] text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">STEP 3</span>
                                        <h2 className="text-lg md:text-xl font-semibold text-[var(--foreground)]">詳細情報</h2>
                                        <span className="ml-2 text-xs font-normal text-gray-500 border border-gray-300 px-2 py-0.5 rounded-full flex-shrink-0">任意</span>
                                        <span className="ml-auto text-xs text-gray-400 font-normal flex-shrink-0">
                                            {openItems.includes('step3') ? '閉じる' : '開く'}
                                        </span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent isOpen={openItems.includes('step3')} className="pt-6">
                                    <Step3 register={register} watch={watch} setValue={setValue} />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        {/* Submit Button */}
                        <div className="pt-8 mt-8 border-t border-[var(--card-border)]">
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
                            <p className="text-center text-xs text-gray-400 mt-4">
                                入力内容と生成結果はサーバーに保存されません
                            </p>
                        </div>
                    </form>
                </Card>
            </div>
        </section>
    );
}
