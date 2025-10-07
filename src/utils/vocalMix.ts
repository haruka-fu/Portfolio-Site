import { PricingOptions, VocalMixFormValues } from "./types";

// ボーカルミックスサービス関連の定数とロジック

export const SERVICE_STEPS = [
    {
        id: 1,
        title: "ボーカルデータの録音",
        description: "まずは、ボーカル音源を録音してください。",
        icon: "/images/music/01_file.svg"
    },
    {
        id: 2,
        title: "ご依頼内容を送信",
        description: [
            "お問い合わせフォームまたはTwitterのDMにてご依頼内容をお送りください。",
            "内容を確認後、料金と納期をお見積もりいたします。"
        ],
        icon: "/images/music/02_memo.svg"
    },
    {
        id: 3,
        title: "音源データのご提出",
        description: "ボーカル音源とカラオケ音源をご提出ください。",
        icon: "/images/music/03_upload.svg"
    },
    {
        id: 4,
        title: "ミックス・マスタリング作業",
        description: "いただいた音源を元に、ミックスとマスタリング作業を開始します。",
        icon: "/images/music/04_edit.svg"
    },
    {
        id: 5,
        title: "ご確認・修正",
        description: "完成した音源をお送りしますので、ご確認ください。修正は2回まで無料で対応いたします。",
        icon: "/images/music/05_check.svg"
    },
    {
        id: 6,
        title: "納品",
        description: "最終確認後、完成した音源を納品いたします。",
        icon: "/images/music/06_delivery.svg"
    }
];

export const NOTICE_SECTIONS = [
    {
        title: "ご依頼について",
        items: [
            "ご依頼は個人の方に限ります。",
            "R-18コンテンツの制作はお受けできません。",
            "制作した音源は、実績として公開させていただく場合があります。公開を希望されない場合は、事前にお知らせください。"
        ]
    },
    {
        title: "音源データについて",
        items: [
            "ボーカル音源は、ノイズが少なく、カラオケ音源と頭出しが揃っているものをご用意ください。",
            "ファイル形式はWAVを推奨します。",
            "スマホ録音の場合は、周囲の音が入らないように注意してください。"
        ]
    },
    {
        title: "料金・お支払いについて",
        items: [
            "料金は修正確認後納品前となります。",
            "お支払い方法はPayPayでお願いします。",
            "お支払い後のキャンセル・返金は原則としてお受けできません。"
        ]
    }
];

export const DEFAULT_PRICING_OPTIONS: PricingOptions = {
    vocal: { price: 2000, selected: false, quantity: 1 },
    encode: { price: 500, selected: false },
    urgent3: { price: 2000, selected: false },
    urgent7: { price: 1000, selected: false },
};

// 料金計算
export const calculateTotal = (basePrice: number, options: PricingOptions): number => {
    let optionsTotal = 0;

    if (options.vocal.selected) {
        optionsTotal += options.vocal.price * options.vocal.quantity;
    }
    if (options.encode.selected) {
        optionsTotal += options.encode.price;
    }
    if (options.urgent3.selected) {
        optionsTotal += options.urgent3.price;
    }
    if (options.urgent7.selected) {
        optionsTotal += options.urgent7.price;
    }

    return basePrice + optionsTotal;
};

// オプション更新（相互排他的なオプションの処理）
export const updateOptions = (
    prevOptions: PricingOptions,
    key: keyof PricingOptions,
    field: string,
    value: boolean | number
): PricingOptions => {
    const updatedOptions = {
        ...prevOptions,
        [key]: {
            ...prevOptions[key],
            [field]: value,
        },
    };

    // urgent3とurgent7の相互排他
    if (key === "urgent3" && field === "selected" && value === true) {
        updatedOptions.urgent7.selected = false;
    } else if (key === "urgent7" && field === "selected" && value === true) {
        updatedOptions.urgent3.selected = false;
    }

    return updatedOptions;
};

// 注文サマリー生成
export const generateOrderSummary = (
    formValues: VocalMixFormValues,
    options: PricingOptions,
    getTotal: () => number,
    contactMethod: string
): string => {
    const optionsList = [];

    if (!formValues.name || !formValues.videoUrl) return "";

    optionsList.push(`名前 : ${formValues.name}`);

    if (contactMethod === "email" && formValues.email) {
        optionsList.push(`メール : ${formValues.email}`);
    }

    optionsList.push(`動画URL : ${formValues.videoUrl}`);
    optionsList.push("----------------------------------------------");
    optionsList.push("ボーカルミックス基本プラン");

    if (options.vocal.selected) {
        optionsList.push(`・ボーカル追加: ${options.vocal.quantity}人`);
    }
    if (options.encode.selected) {
        optionsList.push("・エンコード");
    }
    if (options.urgent3.selected) {
        optionsList.push("・お急ぎ納品 (3日以内)");
    }
    if (options.urgent7.selected) {
        optionsList.push("・お急ぎ納品 (7日以内)");
    }

    if (formValues.name && formValues.videoUrl) {
        optionsList.push("----------------------------------------------");
        if (formValues.otherRequests) {
            optionsList.push(`その他のご要望・ご質問等 : `);
            optionsList.push(`${formValues.otherRequests.trim()}`);
            optionsList.push("----------------------------------------------");
        }
        optionsList.push("合計金額 : ¥" + getTotal().toLocaleString());
    }

    return optionsList.join("\n");
};
