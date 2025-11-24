import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center dark:text-gray-50">このツールについて</h1>

            <Card className="border-gray-200 shadow-sm dark:border-gray-800">
                <CardContent className="p-8 space-y-6 text-gray-700 leading-relaxed dark:text-gray-300">
                    <p>
                        このツールは、「ざっくりしたデザイン依頼文」をもとに、
                        デザイナーがすぐに制作に入れるレベルのデザインブリーフを自動生成するための社内向けアプリケーションです。
                        Google の Gemini API を利用してテキストを整理し、「ブリーフ」と「追加で確認すべきポイント」を生成します。
                    </p>

                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/50">
                        <h3 className="font-bold text-blue-900 mb-2 dark:text-blue-400">データ保護とプライバシー</h3>
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                            アプリケーション側では、入力されたテキストや生成結果の本文をデータベースに保存していません。
                            ログには、リクエストの成功／失敗や処理時間などのメタ情報のみを記録しており、
                            入力された具体的な内容は記録しない設計としています。
                        </p>
                    </div>

                    <div className="bg-amber-50 p-6 rounded-lg border border-amber-100 dark:bg-amber-900/20 dark:border-amber-900/50">
                        <h3 className="font-bold text-amber-900 mb-2 dark:text-amber-400">ご利用上の注意</h3>
                        <p className="text-sm text-amber-800 dark:text-amber-300">
                            その一方で、個人情報や高度な機密情報を入力することは想定していません。
                            氏名や住所などの個人情報、厳格な秘匿が必要な契約情報などは入力せず、
                            必要に応じてクライアント名を仮称にするなど、情報の抽象化を行ったうえでご利用ください。
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
