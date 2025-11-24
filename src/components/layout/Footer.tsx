export function Footer() {
    return (
        <footer className="border-t border-gray-100 bg-gray-50 py-8 mt-auto dark:border-gray-800 dark:bg-gray-950">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm text-gray-600 mb-2 dark:text-gray-400">
                    Design Brief Generator for Internal Use
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                    入力内容と生成結果はサーバーに保存されません。
                </p>
            </div>
        </footer>
    );
}
