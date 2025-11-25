export type BriefFormData = {
    // Basic Info
    request_text: string;
    title: string;
    client_name?: string;
    deliverable_type: string;
    deliverable_type_other?: string;

    // Dynamic fields
    banner_size?: string;
    lp_page_count?: string;
    app_os?: string;
    sns_format?: string;
    website_pages?: string;

    due_date?: string;

    background: string;
    problem: string;
    goal: string;
    elements: string;

    // Detailed Info
    target_user_tags?: string[];
    target_user_text?: string;
    business_goal_tags?: string[];
    business_goal_text?: string;
    channels?: string[];
    tone_tags?: string[];
    tone_keywords?: string;
    reference_urls?: string;
    ng_examples?: string;
    constraints?: string;
};

export type BriefResult = {
    summary: {
        title: string;
        client: string;
        type: string;
        deadline: string;
        overview: string;
    };
    details: {
        background: string;
        problem: string;
        goal: string;
        elements: string;
        target: string;
        channel: string;
        kpi: string;
        tone: string;
        references: string;
        ng_examples: string;
        constraints: string;
    };
    actions: {
        category: string;
        label: string;
        color: 'blue' | 'orange' | 'red';
        items: string[];
    }[];
};

export const DELIVERABLE_TYPES = [
    'Webサイト', 'LP', 'バナー', 'バナー大量制作', 'アプリUI',
    'プレゼン資料', 'ロゴ', 'SNS画像（Instagram/X）', '印刷物（パンフ・チラシ）', '採用資料', 'その他'
];

export const TARGET_TAGS = [
    '一般消費者', 'BtoB', '経営層', '20代〜30代', '40代以上',
    '既存顧客', '新規顧客', '学生', '採用候補者', '女性向け', '男性向け'
];

export const CHANNEL_OPTIONS = [
    '広告（Google / Meta）', 'SEO', 'SNS（Instagram/X/TikTok）',
    'メール / メルマガ', '比較サイト', 'イベント', 'オフライン（紙媒体）'
];

export const TONE_TAGS = [
    'シンプル', 'ミニマル', '上品', '親しみ',
    'テック', 'コーポレート', 'ラグジュアリー',
    '女性向け', '男性向け', 'カジュアル', 'モダン'
];
