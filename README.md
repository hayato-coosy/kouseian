# Kouseian - AIデザインブリーフ生成ツール

デザイン依頼を入力するだけで、AI（Gemini）が完璧なデザインブリーフ（要件定義書）を自動生成するWebアプリケーションです。

## 🎯 概要

このツールは、Slackやメールで受け取った曖昧なデザイン依頼を、デザイナーやエンジニアが実際に使える具体的なブリーフに変換します。

**主な機能**:
- 📝 フォーム形式での依頼内容の構造化
- 🤖 Google Gemini APIによる高品質なブリーフ生成
- 📄 10セクション構成の包括的なドキュメント出力
- 💾 下書き保存機能（LocalStorage）
- 🔒 ベーシック認証による保護（オプション）

## 🚀 セットアップ

### 前提条件

- Node.js 20.9.0以上
- Google Gemini APIキー

### インストール

1. **リポジトリのクローン**

```bash
git clone [your-repository-url]
cd kouseian
```

2. **依存関係のインストール**

```bash
npm install
```

3. **環境変数の設定**

`.env.local.example` をコピーして `.env.local` を作成：

```bash
cp .env.local.example .env.local
```

`.env.local` を編集して、必要な値を設定：

```env
# Gemini API Configuration (必須)
GEMINI_API_KEY=your_actual_api_key_here
GEMINI_MODEL_NAME=gemini-2.5-pro

# Basic Authentication (オプション)
BASIC_AUTH_USER=admin
BASIC_AUTH_PASSWORD=your_secure_password
```

4. **開発サーバーの起動**

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## 📖 使い方

### ブリーフの生成

1. **依頼内容を入力** - Slackやメールの依頼文をそのまま貼り付け
2. **基本情報を整理** - タイトル、成果物タイプ、背景、課題、ゴールなどを記入
3. **詳細情報を追加**（任意） - ターゲット、トーン＆マナー、参考URLなど
4. **AIでブリーフを作成** - ボタンをクリックして生成

### 生成されるブリーフの構成

1. プロジェクト概要
2. 背景・目的
3. 現状の課題
4. ゴール・KPI
5. ターゲット・チャネル
6. 制作戦略・コンセプト
7. 成果物要件・仕様
8. トーン＆マナー
9. 制約事項・スケジュール
10. 確認事項・ネクストアクション

## 🔐 セキュリティ

詳細なセキュリティ情報は [docs/SECURITY.md](./docs/SECURITY.md) を参照してください。

### ベーシック認証

認証を有効にするには、`.env.local` に以下を設定：

```env
BASIC_AUTH_USER=your_username
BASIC_AUTH_PASSWORD=your_password
```

認証を無効にするには、これらの行をコメントアウトまたは削除します。

### 環境変数の保護

- APIキーは **必ずサーバーサイド**（`/api/*`）でのみ使用
- `NEXT_PUBLIC_` プレフィックスを使用しないため、クライアントサイドに露出されません
- `.env.local` は Git 管理外（`.gitignore`に含まれています）

## 🏗️ プロジェクト構造

```
kouseian/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── generate-brief/    # Gemini API呼び出し
│   │   ├── result/                # 生成結果ページ
│   │   ├── about/                 # アバウトページ
│   │   ├── layout.tsx             # ルートレイアウト
│   │   ├── page.tsx               # ホームページ
│   │   └── globals.css            # グローバルスタイル
│   ├── components/
│   │   ├── home/                  # ホームページ用コンポーネント
│   │   ├── layout/                # レイアウトコンポーネント
│   │   ├── result/                # 結果ページ用コンポーネント
│   │   └── ui/                    # 共通UIコンポーネント
│   └── middleware.ts              # ベーシック認証
├── public/                        # 静的ファイル
├── .env.local.example             # 環境変数テンプレート
├── SECURITY.md                    # セキュリティガイド
└── package.json                   # 依存関係

```

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 16.0.3 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS 4
- **AI**: Google Gemini API
- **フォーム管理**: React Hook Form
- **マークダウン表示**: React Markdown

## 📝 開発

### ビルド

```bash
npm run build
```

### 本番環境での起動

```bash
npm start
```

### Lint

```bash
npm run lint
```

## 🚢 デプロイ

### Vercelへのデプロイ

1. Vercelにログイン
2. プロジェクトをインポート
3. 環境変数を設定：
   - `GEMINI_API_KEY`
   - `GEMINI_MODEL_NAME`
   - `BASIC_AUTH_USER`（オプション）
   - `BASIC_AUTH_PASSWORD`（オプション）
4. デプロイ

詳細は [Vercelデプロイメントドキュメント](https://nextjs.org/docs/app/building-your-application/deploying) を参照。

## ⚠️ トラブルシューティング

### Node.jsバージョンエラー

```
You are using Node.js X. For Next.js, Node.js version ">=20.9.0" is required.
```

**解決方法**: Node.js 20以上にアップグレード

```bash
nvm install 20
nvm use 20
```

### ブリーフ生成が遅い

Gemini APIでの生成には60〜90秒程度かかる場合があります。これは正常な動作です。

### 認証ダイアログが表示されない

1. `.env.local` に認証情報が設定されているか確認
2. 開発サーバーを再起動
3. ブラウザのキャッシュをクリア

## 📄 ライセンス

このプロジェクトは内部ツールとして開発されました。

## 🙏 謝辞

- [Next.js](https://nextjs.org/)
- [Google Gemini API](https://ai.google.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
