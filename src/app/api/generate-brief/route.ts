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
以下の10セクション構成で、JSON形式で出力してください。
各セクションは "title" と "content" を持ちます。
"content" はMarkdown形式で記述してください。

JSONフォーマット:
{
  "sections": [
    { "title": "1. プロジェクト概要", "content": "..." },
    { "title": "2. 背景・目的", "content": "..." },
    { "title": "3. 現状の課題", "content": "..." },
    { "title": "4. ゴール・KPI", "content": "..." },
    { "title": "5. ターゲット・チャネル", "content": "..." },
    { "title": "6. 制作戦略・コンセプト", "content": "..." },
    { "title": "7. 成果物要件・仕様", "content": "..." },
    { "title": "8. トーン＆マナー", "content": "..." },
    { "title": "9. 制約事項・スケジュール", "content": "..." },
    { "title": "10. 確認事項・ネクストアクション", "content": "..." }
  ]
}

## 執筆のポイント
- デザイナーが迷わず作業に入れるよう、具体的かつ論理的に記述すること。
- 「制作戦略」では、課題をどうデザインで解決するかを言語化すること。
- 「成果物要件」では、サイズや枚数などの仕様を漏らさず記載すること。
- 元の情報が不足している場合は、プロの視点で「確認すべき点」として補完するか、仮説を立てて提案すること。
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

