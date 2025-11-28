'use client';

import { ShieldCheck, ServerOff, Lock, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SecurityModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SecurityModal({ isOpen, onClose }: SecurityModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className={`relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md overflow-hidden transition-all duration-300 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-gray-50">
                        <ShieldCheck className="w-5 h-5 text-green-600" />
                        セキュリティとデータ保護
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    <div className="flex gap-4">
                        <div className="bg-blue-50 p-3 rounded-full h-fit dark:bg-blue-900/30 flex-shrink-0">
                            <ServerOff className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-1 text-sm">原則、サーバーに保存しません</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                原則として、入力されたテキストや生成されたブリーフはサーバー（データベース）に保存されません。
                                ただし、「共有機能」を使用した場合は、共有用URL発行のためにデータがデータベース（Supabase）に保存されます。
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-purple-50 p-3 rounded-full h-fit dark:bg-purple-900/30 flex-shrink-0">
                            <Lock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-1 text-sm">AI学習には利用されません</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                Gemini APIを利用していますが、API経由で送信されたデータはGoogleのAIモデルの学習には使用されません（Google Cloudの規定に準拠）。
                            </p>
                        </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 dark:bg-yellow-900/20 dark:border-yellow-900/30">
                        <p className="text-xs text-yellow-800 dark:text-yellow-200 font-medium leading-relaxed">
                            ⚠️ ご注意：念のため、個人名・電話番号・パスワードなどの極めて機密性の高い情報は入力しないことを推奨します。
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    );
}
