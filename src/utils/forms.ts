import { BaseFormValues, WebCreateFormValues, ApiPayload } from "./types";

// GitHub Pages用のダミー実装のためApiPayloadタイプを維持

// フォーム関連のユーティリティ関数

// バリデーション
export const validateUrl = (url: string): boolean => {
    return /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(url);
};

export const handleUrlValidation = (url: string, warningElementId: string): void => {
    const isValidUrl = validateUrl(url);
    const warning = document.getElementById(warningElementId);

    if (!isValidUrl && url.length > 0) {
        if (warning) warning.style.display = "block";
    } else {
        if (warning) warning.style.display = "none";
    }
};

// クリップボード操作
export const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error("Could not copy text: ", error);
        return false;
    }
};

// ポートフォリオ用ダミー送信処理（GitHub Pages対応）
export const submitForm = async <T extends BaseFormValues>(
    formValues: T,
    selectedOptions: string
): Promise<boolean> => {
    const payload: ApiPayload = {
        name: formValues.name,
        email: formValues.email,
        message: selectedOptions,
    };

    // コンソールにログ出力（デモ用）
    console.log("=== ポートフォリオサイト - お問い合わせフォーム（ダミー） ===");
    console.log("送信者:", payload.name);
    console.log("メールアドレス:", payload.email);
    console.log("メッセージ:", payload.message);
    console.log("=== 実際のメール送信は無効化されています ===");

    // 短い遅延でローディング体験をシミュレート
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 常に成功を返す（デモ用）
    return true;
};

// Web制作サマリー生成
export const generateWebCreateOrderSummary = (
    formValues: WebCreateFormValues,
    contactMethod: string,
    estimatedPrice?: number
): string => {
    const summary = [];

    if (!formValues.name || !formValues.siteOverview) return "";

    summary.push(`名前: ${formValues.name}`);

    if (contactMethod === "email" && formValues.email) {
        summary.push(`メール: ${formValues.email}`);
    }

    summary.push(`サイトの概要: ${formValues.siteOverview}`);
    summary.push("----------------------------------------------");
    summary.push("ページ構成:");

    formValues.pages.forEach((page, index) => {
        if (page.name || page.content) {
            summary.push(`${index + 1}. ${page.name || "(未入力)"}`);
            if (page.content) summary.push(`   内容: ${page.content}`);
        }
    });

    summary.push("----------------------------------------------");

    if (estimatedPrice !== undefined) {
        summary.push(`概算見積もり: ¥${estimatedPrice.toLocaleString()} (${formValues.pages.length}ページ × ¥2,000)`);
        summary.push("※内容により料金は変動いたします");
        summary.push("----------------------------------------------");
    }

    if (formValues.deadline) summary.push(`納期: ${formValues.deadline}`);
    if (formValues.budget) summary.push(`予算: ${formValues.budget}`);

    return summary.join("\n");
};
