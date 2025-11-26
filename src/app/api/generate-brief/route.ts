import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
    const startTime = Date.now();

    try {
        // 1. Parse Request
        const body = await request.json();
        const {
            request_text,
            title,
            client_name,
            deliverable_type,
            deliverable_type_other,
            banner_size,
            lp_page_count,
            app_os,
            due_date,
            background,
            problem,
            goal,
            elements,
            target_user,
            business_goal,
            channels,
            tone_tags,
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
        const tone = tone_tags && tone_tags.length > 0 ? tone_tags.join(', ') : '指定なし';
        const target = target_user || '指定なし';
        const channelList = channels && channels.length > 0 ? channels.join(', ') : '指定なし';

        const userPrompt = `
あなたはプロフェッショナルなクリエイティブディレクターです。
以下の依頼情報を元に、デザイナーやエンジニアに渡すための「完璧なデザインブリーフ（要件定義書）」を作成してください。

## 依頼情報
- **タイトル**: ${title}
- **クライアント**: ${client_name || '未定'}
- **成果物**: ${finalDeliverable}
  ${banner_size ? `- サイズ・枚数: ${banner_size}` : ''}
  ${lp_page_count ? `- 想定ページ数: ${lp_page_count}` : ''}
  ${app_os ? `- 対応OS: ${app_os}` : ''}
- **納期**: ${due_date || '未定'}

## 現状と課題
- **背景**: ${background}
- **課題**: ${problem}
- **ゴール**: ${goal}

## 要件
- **必須要素**: ${elements}
- **ターゲット**: ${target}
- **流入チャネル**: ${channelList}
- **ビジネスゴール(KPI)**: ${business_goal || '指定なし'}

## トーン＆マナー
- **キーワード**: ${tone}
- **詳細イメージ**: ${tone_keywords || 'なし'}
- **参考URL**: ${reference_urls || 'なし'}
- **NG例**: ${ng_examples || 'なし'}
- **制約事項**: ${constraints || 'なし'}

## 元の依頼文（参考）
${request_text || 'なし'}

---

## 出力形式（JSON）
以下の構造でJSONを出力してください。
Markdown形式の記述を含みます。

\`\`\`json
        {
            "summary": {
                "title": "プロジェクト名（魅力的でわかりやすいもの）",
                    "client": "クライアント名",
                        "type": "成果物タイプ",
                            "deadline": "納期",
                                "overview": "プロジェクトの概要を一言で（30文字程度）"
            },
            "details": {
                "background": "背景・目的（Markdown）",
                    "problem": "現状の課題（Markdown）",
                        "goal": "ゴール（Markdown）",
                            "elements": "必須要素（Markdown）",
                                "target": "ターゲット（Markdown）",
                                    "channel": "流入チャネル（Markdown）",
                                        "kpi": "ビジネスゴール・KPI（Markdown）",
                                            "tone": "トーン＆マナー（Markdown）",
                                                "references": "参考URL・クリエイティブ（Markdown）",
                                                    "ng_examples": "NG例（Markdown）",
                                                        "constraints": "制約事項（Markdown）"
            },
            "actions": [
                {
                    "category": "1. 制作側 TODO",
                    "label": "制作",
                    "color": "blue",
                    "items": [],
                    "subsections": [
                        {
                            "title": "【戦略・IA/UX】",
                            "items": ["TODO項目1", "TODO項目2"]
                        },
                        {
                            "title": "【デザイン・クリエイティブ】",
                            "items": ["TODO項目1"]
                        }
                    ]
                },
                {
                    "category": "2. クライアント側 TODO",
                    "label": "確認",
                    "color": "orange",
                    "items": ["確認項目1", "確認項目2"]
                },
                {
                    "category": "3. 決定すべき事項（要合意）",
                    "label": "合意",
                    "color": "orange",
                    "items": ["合意事項1"]
                },
                {
                    "category": "4. リスク・注意点",
                    "label": "注意",
                    "color": "red",
                    "items": [],
                    "subsections": [
                        {
                            "title": "リスク項目タイトル",
                            "items": ["対応策1"]
                        }
                    ]
                }
            ]
        }
        \`\`\`

## 執筆のポイント
- **Summary**: ひと目で概要がわかるように簡潔に。
- **Details**: デザイナーが迷わず作業に入れるよう、具体的かつ論理的に記述すること。Markdownのリスト形式などを活用して読みやすくする。
- **Actions**:
    - 「1. 制作側 TODO」: 【戦略・IA/UX】【デザイン・クリエイティブ】【技術・開発】【運用・公開準備】などのサブセクションに分けて記述。
    - 「2. クライアント側 TODO」: クライアントが用意すべき素材や決定事項。
    - 「3. 決定すべき事項」: プロジェクト開始前に合意が必要な点。
    - 「4. リスク・注意点」: 懸念されるリスクとその対策。
`;

        // 3. Call Gemini API
        const model = genAI.getGenerativeModel({
            model: process.env.GEMINI_MODEL_NAME || "gemini-1.5-pro-latest",
            generationConfig: {
                responseMimeType: "application/json"
            }
        });

        const result = await model.generateContent(userPrompt);
        const responseText = result.response.text();

        // Parse JSON response safely
        let jsonResponse;
        try {
            jsonResponse = JSON.parse(responseText);
        } catch (e) {
            console.error('Failed to parse Gemini response as JSON', e);
            return NextResponse.json(
                { error: 'Failed to generate valid brief format' },
                { status: 500 }
            );
        }

        const endTime = Date.now();
        console.log(`Brief generated in ${endTime - startTime}ms`);

        return NextResponse.json(jsonResponse);

    } catch (error) {
        console.error('Error generating brief:', error);
        return NextResponse.json(
            { error: 'Failed to generate brief' },
            { status: 500 }
        );
    }
}

