// 共通型定義

// 基本的なフォーム値インターフェース
export interface BaseFormValues {
    name: string;
    email: string;
    [key: string]: string | Array<Record<string, string>> | unknown;
}

// ボーカルミックス専用のフォーム値
export interface VocalMixFormValues extends BaseFormValues {
    videoUrl: string;
    otherRequests: string;
}

// Web制作専用のフォーム値
export interface WebCreateFormValues extends BaseFormValues {
    contactInfo: string;
    siteOverview: string;
    pages: Array<{
        name: string;
        content: string;
    }>;
    deadline: string;
    budget: string;
}

// 料金オプション
export interface PricingOptions {
    vocal: { price: number; selected: boolean; quantity: number };
    encode: { price: number; selected: boolean };
    urgent3: { price: number; selected: boolean };
    urgent7: { price: number; selected: boolean };
}

// API関連
export interface ApiPayload {
    name: string;
    email: string;
    message: string;
}

// 後方互換性のためのエイリアス
export type { VocalMixFormValues as FormValues };
