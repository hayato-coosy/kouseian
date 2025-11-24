import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const modelName = process.env.GEMINI_MODEL_NAME || 'gemini-2.5-pro';

export async function POST(request: Request) {
    const startTime = Date.now();

    try {
        // 1. Parse Request
        const body = await request.json();
        const {
            title,
            client_name,
            deliverable_type,
            deliverable_type_other,
            due_date,
            priority,
            background,
            problem,
            goal,
            elements,
            target_user,
            business_goal,
            channels,
            tone_keywords,
            reference_urls,
            ng_examples,
            constraints
        } = body;

        // Basic Validation
        if (!title || !deliverable_type || !background || !problem || !goal || !elements) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 2. Construct Prompt
        const finalDeliverable = deliverable_type === 'その他' ? deliverable_type_other : deliverable_type;

        const systemPrompt = `
あなたは、Web・アプリ・グラフィックなどのデザイン案件に特化したプロジェクトマネージャー兼クリエイティブディレクターです。

入力として以下の情報が与えられます：
特に「背景」「解決したい課題」「今回の目的」「入れてほしい要素」は、依頼者が入力した一次情報です。
このフィールドを最優先で参照しつつ、他の入力項目（成果物の種類、希望納期、ターゲットなど）を補助情報として統合してください。

前提条件：
- 出力はすべて日本語で記述してください。
- 依頼者や営業担当も読むことを想定し、専門用語は必要に応じて用いて構いませんが、説明は簡潔で分かりやすくしてください。
- 事実を勝手に創作せず、入力に含まれない情報については推測ではなく「不明」と扱ってください。
- 出力フォーマットは、後述する JSON 形式を厳守してください。
`;

        const userPrompt = `
以下が、デザイン案件に関する入力情報です。

[基本情報]
- 案件タイトル: ${title}
- クライアント/プロジェクト名: ${client_name || '未定'}
- 成果物の種類: ${finalDeliverable}
- 希望納期: ${due_date || '未定'}
- 優先度: ${priority || '未定'}

[依頼内容]
- 背景:
${background}

- 解決したい課題:
${problem}

- 今回の目的（ゴール）:
${goal}

- 入れてほしい要素:
${elements}

[その他の任意入力項目]
- ターゲットユーザー: ${target_user || 'なし'}
- ビジネスゴール / KPI: ${business_goal || 'なし'}
- 想定流入チャネル: ${channels || 'なし'}
- トーン＆マナー / ブランドキーワード: ${tone_keywords || 'なし'}
- 参考サイト / 参考クリエイティブURL: ${reference_urls || 'なし'}
- NG例 / 避けたいトーン: ${ng_examples || 'なし'}
- 制約事項（法務・ブランドガイドラインなど）: ${constraints || 'なし'}

---

上記の情報をもとに、次の2つを作成してください。

指定されたフォーマットに従って「デザインブリーフ」と「追加で確認すべきポイント」を作成してください。

1. 「デザインブリーフ」
   以下の構成で、箇条書きを適宜使いながら日本語で整理してください。

# 1. プロジェクト概要
- 案件の背景・依頼の目的を、2〜4文程度で要約してください。

# 2. 目的・KPI
- ビジネスゴール
- 主要KPI（分かる範囲で）

# 3. ターゲット
- 想定ユーザー像（属性・ニーズ・利用シーン）を簡潔に整理してください。

# 4. 成果物の条件
- 成果物の種類（LP / バナー / アプリUI など）
- 想定デバイス（PC / SP / 両方 など）
- サイズや点数が分かる場合は明記してください。

# 5. コンテンツ要素
- ページやクリエイティブに必要な主なセクション・要素を箇条書きで列挙してください。
${finalDeliverable === 'LP' ? '  （例: Hero, サービス概要, ベネフィット, 実績・導入企業, FAQ, CTA など）\n  今回の成果物は「LP（ランディングページ）」です。LPに適した構成になるように提案してください。' : ''}
${finalDeliverable === 'バナー' ? '  今回の成果物は「バナー」です。バナーに適したブリーフになるように、\n  - メインコピー案\n  - サブコピー案\n  - サイズ・フォーマット\n  - 想定掲載面\n  などの観点を意識して整理してください。' : ''}
${finalDeliverable === 'プレゼン資料' ? '  今回の成果物は「プレゼン資料」です。\n  - 全体の構成案（目次）\n  - 各スライドのキーメッセージ\n  などを意識して整理してください。' : ''}

# 6. デザイン / トーン＆マナー
- トーン＆マナーのキーワード
- 参考にすべきサイト・事例の特徴
- 避けるべき表現やNG例があれば明記してください。

# 7. 制約・その他
- 納期やスケジュール上の前提
- 法務・ブランドガイドラインなどの制約（分かる範囲で）

2. 「追加で確認すべきポイント」
- 依頼内容から見て、デザイナーやディレクターが依頼者に確認しておいた方がよい点を、最大10項目の箇条書きで出してください。
- 1つ1つを、依頼者にそのまま送れる丁寧な質問文にしてください。
- 「〇〇が不明です」ではなく、「〇〇について教えてください」という形にしてください。
- すでに入力から明らかに読み取れる内容は質問に含めないでください。

---

出力フォーマットは、次の JSON 形式にしてください。
日本語の文章はすべて文字列としてエスケープしてください。
Markdownの記法（# や - など）はそのまま文字列の中に含めてください。

{
  "brief": "ここにデザインブリーフ全文（Markdown形式可）",
  "missing_points": [
    "ここに追加で確認すべき質問1",
    "ここに追加で確認すべき質問2",
    "ここに追加で確認すべき質問3"
  ]
}
`;

        // 3. Call Gemini API
        const model = genAI.getGenerativeModel({
            model: modelName,
            generationConfig: {
                responseMimeType: "application/json",
            }
        });

        const result = await model.generateContent([systemPrompt, userPrompt]);
        const responseText = result.response.text();

        // 4. Parse Response
        const jsonResponse = JSON.parse(responseText);

        // Logging (Metadata only)
        const duration = Date.now() - startTime;
        console.log(JSON.stringify({
            timestamp: new Date().toISOString(),
            endpoint: '/api/generate-brief',
            status: 200,
            duration_ms: duration,
            model: modelName
        }));

        return NextResponse.json(jsonResponse);

    } catch (error) {
        // Error Logging
        const duration = Date.now() - startTime;
        console.error(JSON.stringify({
            timestamp: new Date().toISOString(),
            endpoint: '/api/generate-brief',
            status: 500,
            duration_ms: duration,
            error: error instanceof Error ? error.message : 'Unknown error'
        }));

        return NextResponse.json(
            { error: 'Failed to generate brief' },
            { status: 500 }
        );
    }
}
