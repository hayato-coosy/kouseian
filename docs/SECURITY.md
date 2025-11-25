# セキュリティガイド

このドキュメントでは、アプリケーションのセキュリティ設定について説明します。

## 環境変数の設定

### 必須の環境変数

アプリケーションを動作させるには、以下の環境変数を `.env.local` ファイルに設定してください：

```env
GEMINI_API_KEY=your_actual_api_key
GEMINI_MODEL_NAME=gemini-2.5-pro
```

> [!IMPORTANT]
> `.env.local` ファイルは Git 管理外です。絶対にリポジトリにコミットしないでください。

### セットアップ手順

1. `.env.local.example` をコピーして `.env.local` を作成：

```bash
cp .env.local.example .env.local
```

2. `.env.local` を編集し、実際の値を設定：

```env
GEMINI_API_KEY=AIzaSy...  # 実際のAPIキーを入力
GEMINI_MODEL_NAME=gemini-2.5-pro
```

## ベーシック認証

### 認証の有効化

アプリケーション全体をベーシック認証で保護するには、`.env.local` に以下を追加します：

```env
BASIC_AUTH_USER=your_username
BASIC_AUTH_PASSWORD=your_secure_password
```

> [!WARNING]
> 本番環境では、強力なパスワードを使用してください。推奨：
> - 最低12文字以上
> - 大文字・小文字・数字・記号を含む
> - 辞書に載っている単語を避ける

### 認証の無効化

ベーシック認証を無効にするには、`.env.local` から `BASIC_AUTH_USER` と `BASIC_AUTH_PASSWORD` をコメントアウトまたは削除します。

```env
# BASIC_AUTH_USER=admin
# BASIC_AUTH_PASSWORD=password
```

開発サーバーを再起動すると、認証なしでアクセスできます。

### 認証の動作

- **保護されるパス**: `/`, `/result`, `/about` など、すべてのページ
- **保護されないパス**: `/api/*` (APIエンドポイント), `/_next/*` (Next.jsの静的ファイル), `/favicon.ico`

ブラウザで保護されたページにアクセスすると、ユーザー名とパスワードの入力を求められます。

## セキュリティのベストプラクティス

### 1. APIキーの保護

✅ **正しい使い方**:
- APIキーは `.env.local` に保存
- サーバーサイド（API Routes）でのみ使用
- `process.env.GEMINI_API_KEY` で参照

❌ **誤った使い方**:
- クライアントサイドのコンポーネントで直接使用
- ハードコーディング
- Gitにコミット

現在の実装では、APIキーは `/api/generate-brief/route.ts` でのみ使用されており、クライアントサイドには露出されていません。

### 2. 環境変数の確認

以下のファイルが `.gitignore` に含まれていることを確認してください（すでに設定済み）：

```gitignore
.env*
```

### 3. 本番環境への展開

Vercelなどのホスティングサービスを使用する場合：

1. **環境変数の設定**: プラットフォームの環境変数設定画面で、`GEMINI_API_KEY`、`GEMINI_MODEL_NAME`、`BASIC_AUTH_USER`、`BASIC_AUTH_PASSWORD` を設定

2. **`.env.local` をアップロードしない**: ローカルの `.env.local` ファイルは本番環境にアップロードしません

3. **ビルド時の確認**: 環境変数が正しく設定されているか、デプロイ後に確認

### 4. HTTPS の使用

> [!CAUTION]
> ベーシック認証は Base64 エンコードを使用しますが、暗号化されていません。本番環境では **必ず HTTPS を使用** してください。

Vercel やその他のモダンなホスティングサービスは、デフォルトで HTTPS を提供します。

## トラブルシューティング

### 認証ダイアログが表示されない

1. `.env.local` に `BASIC_AUTH_USER` と `BASIC_AUTH_PASSWORD` が設定されているか確認
2. 開発サーバーを再起動
3. ブラウザのキャッシュをクリア、またはプライベートブラウジングモードで試す

### APIエンドポイントが動作しない

- ミドルウェアの matcher 設定により、`/api/*` は認証をバイパスします
- フロントエンドから呼び出す API Routes は認証の影響を受けません

### 環境変数が読み込まれない

1. `.env.local` ファイルがプロジェクトのルートディレクトリにあるか確認
2. 環境変数名が正しいか確認（スペースやタイポがないか）
3. 開発サーバーを再起動

## まとめ

- ✅ `.env.local` に機密情報を保存
- ✅ `.env.local` を Git 管理外に維持
- ✅ APIキーはサーバーサイドでのみ使用
- ✅ ベーシック認証は環境変数で制御
- ✅ 本番環境では HTTPS を使用
