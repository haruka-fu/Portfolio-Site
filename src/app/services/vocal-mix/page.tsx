"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import {
  PricingOptions,
  VocalMixFormValues as FormValues,
} from "@/utils/types";
import {
  calculateTotal,
  updateOptions,
  generateOrderSummary,
  SERVICE_STEPS,
  NOTICE_SECTIONS,
  DEFAULT_PRICING_OPTIONS,
} from "@/utils/vocalMix";
import { submitForm, handleUrlValidation } from "@/utils/forms";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { ASSETS } from "@/utils/assets";

/**
 * ボーカルミックスサービスのメインコンポーネント
 */
export default function VocalMixForm() {
  // === 状態管理 ===

  // 基本料金
  const [basePrice] = useState(3000);

  // 選択されたオプション（ボーカル追加、エンコードなど）
  const [options, setOptions] = useState<PricingOptions>(
    DEFAULT_PRICING_OPTIONS
  );

  // フォームの入力値（名前、メール、URLなど）
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    email: "",
    videoUrl: "",
    otherRequests: "",
  });

  // ローディング状態（送信中かどうか）
  const [isLoading, setIsLoading] = useState(false);

  // 送信完了状態（成功モーダル表示用）
  const [isSubmissionComplete, setIsSubmissionComplete] = useState(false);

  // 送信ボタンのテキスト（成功/失敗メッセージ用）
  const [buttonText, setButtonText] = useState("依頼を送信");

  // 確認ダイアログの表示状態
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // === イベントハンドラー ===

  /**
   * オプション更新処理
   * @param key - 更新するオプションのキー（vocal, encode, etc.）
   * @param field - 更新するフィールド（selected, quantity）
   * @param value - 新しい値
   */
  const updateOption = (
    key: keyof PricingOptions,
    field: string,
    value: boolean | number
  ) => {
    // setOptionsは非同期なので、前の状態を受け取る関数を渡す
    setOptions((prev) => updateOptions(prev, key, field, value));
  };

  /**
   * 合計金額を計算する関数（パフォーマンス最適化のためuseCallbackを使用）
   */
  const getTotal = useCallback(() => {
    return calculateTotal(basePrice, options);
  }, [options, basePrice]); // 依存配列：これらが変更された時のみ再計算

  /**
   * 注文サマリーを生成する関数（パフォーマンス最適化のためuseMemoを使用）
   */
  const selectedOptions = useMemo(() => {
    return generateOrderSummary(formValues, options, getTotal, "email");
  }, [options, formValues, getTotal]); // 依存配列：これらが変更された時のみ再計算

  /**
   * フォーム値の部分更新処理
   * @param values - 更新する値（部分的なオブジェクト）
   */
  const handleFormChange = (values: Partial<FormValues>) => {
    // スプレッド演算子で既存の値と新しい値をマージ
    setFormValues((prev) => ({ ...prev, ...values }));
  };

  /**
   * フォームリセット処理（送信成功後に呼び出される）
   */
  const resetForm = () => {
    setFormValues({
      name: "",
      email: "",
      videoUrl: "",
      otherRequests: "",
    });
    setOptions(DEFAULT_PRICING_OPTIONS);
  };

  /**
   * フォーム送信処理
   * @param event - フォーム送信イベント
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // フォームのデフォルト送信を防ぐ（ページリロード防止）
    event.preventDefault();

    // フォームバリデーションチェック
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    // 確認ダイアログを表示
    setShowConfirmDialog(true);
  };

  /**
   * 送信確認後の実際の送信処理
   */
  const handleConfirmSubmit = async () => {
    // 確認ダイアログを閉じる
    setShowConfirmDialog(false);

    // ローディング開始
    setIsLoading(true);

    try {
      // API呼び出し
      const success = await submitForm(formValues, selectedOptions);

      if (success) {
        // 送信成功時の処理
        setIsSubmissionComplete(true);
        resetForm();
      } else {
        // 送信失敗時のユーザーフィードバック
        setButtonText("送信失敗。再試行してください。");
      }
    } catch (error) {
      // 例外処理
      console.error("Error sending email:", error);
      setButtonText("エラーが発生しました。");
    } finally {
      // 必ず実行される処理
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* ローディングモーダル */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full">
            <div className="flex items-center justify-center mb-4">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
            </div>
            <p className="text-center text-gray-700 text-sm sm:text-base">
              送信中...
            </p>
          </div>
        </div>
      )}

      {/* 成功モーダル */}
      {isSubmissionComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full">
            <div className="text-center">
              <div className="text-4xl sm:text-6xl mb-4">✅</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                送信完了！
              </h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
                フォームの送信が完了しました。
                <br className="hidden sm:block" />
                <span className="sm:hidden">　</span>
                ※これはポートフォリオサイトのデモです。
              </p>
              <button
                onClick={() => setIsSubmissionComplete(false)}
                className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ヘッダーセクション */}
      <section className="unified-section animate-fade-in-up">
        <div className="unified-container">
          <h1 className="unified-title">ボーカルミックスサービス</h1>
          <p className="unified-subtitle">
            あなたの歌声を最高の一曲に仕上げます。
          </p>
        </div>
      </section>

      {/* サービスの流れ */}
      <section className="unified-section">
        <div className="unified-container">
          <h2 className="unified-section-title animate-fade-in-up">
            サービスの流れ
          </h2>
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-6 sm:left-7 top-0 h-full w-0.5 bg-gradient-to-b from-blue-400 to-blue-600 opacity-30"></div>
            <div className="space-y-12 sm:space-y-16">
              {SERVICE_STEPS.map((step, index) => (
                <div
                  key={step.id}
                  className={`modern-card flex flex-col sm:flex-row items-start gap-4 sm:gap-8 animate-fade-in-up animate-delay-${
                    index + 1
                  }00`}
                >
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-12 h-12 sm:w-16 sm:h-16 p-2 sm:p-3 shadow-sm border border-gray-200 flex-shrink-0">
                    <Image
                      src={step.icon}
                      alt={`Step ${step.id}`}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain opacity-70"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-3">
                      {step.id}. {step.title}
                    </h3>
                    {Array.isArray(step.description) ? (
                      <div className="space-y-2">
                        {step.description.map((desc, index) => (
                          <p
                            key={index}
                            className="text-gray-600 leading-relaxed"
                          >
                            {desc}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 料金プラン */}
      <section className="unified-section">
        <div className="unified-container">
          <h2 className="unified-section-title animate-fade-in-up">
            料金プラン
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="modern-card animate-fade-in-up">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                基本プラン
              </h3>
              <p className="text-5xl font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
                ¥{basePrice.toLocaleString()}
              </p>
              <p className="mb-8 text-gray-600">1曲 / ボーカル1人</p>
              <ul className="mb-8 space-y-3 text-left text-sm text-gray-600">
                {[
                  "ピッチ・タイミング補正",
                  "ノイズ除去",
                  "ハモリ生成",
                  "マスタリング",
                  "何回でも修正無料",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Image
                      src={ASSETS.MUSIC.CHECKMARK}
                      alt="selected"
                      width={20}
                      height={20}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-primary/20 bg-white/50 p-4 sm:p-6 md:p-8 lg:p-6 xl:p-8 shadow-lg lg:col-span-2">
              <h3 className="mb-6 text-2xl font-bold text-gray-900">
                オプションを選択
              </h3>
              <div className="space-y-4">
                {/* ボーカル追加オプション */}
                <label
                  className={`flex flex-col sm:flex-row cursor-pointer sm:items-center sm:justify-between rounded-lg p-4 transition-colors hover:bg-primary/5 ${
                    options.vocal.selected ? "bg-primary/10" : ""
                  }`}
                >
                  <div className="flex items-center mb-3 sm:mb-0">
                    <input
                      className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                      type="checkbox"
                      checked={options.vocal.selected}
                      onChange={(e) =>
                        updateOption("vocal", "selected", e.target.checked)
                      }
                    />
                    <span className="ml-4 text-gray-700">
                      ボーカル追加 (1人につき)
                    </span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-2 pl-9 sm:pl-0">
                    <select
                      disabled={!options.vocal.selected}
                      className="rounded border-primary/20 bg-white/50 px-2 py-1 text-sm text-gray-800 focus:border-primary focus:ring-0"
                      value={options.vocal.quantity}
                      onChange={(e) =>
                        updateOption(
                          "vocal",
                          "quantity",
                          parseInt(e.target.value)
                        )
                      }
                    >
                      {[1, 2, 3, 4, 5].map((i) => (
                        <option key={i} value={i}>
                          {i}人
                        </option>
                      ))}
                    </select>
                    <span className="font-bold text-gray-900 text-right">
                      + ¥{options.vocal.price.toLocaleString()}
                    </span>
                  </div>
                </label>

                {/* その他のオプション */}
                {[
                  { key: "encode", label: "エンコード" },
                  { key: "urgent3", label: "お急ぎ納品 (3日以内)" },
                  { key: "urgent7", label: "お急ぎ納品 (7日以内)" },
                ].map((option) => (
                  <label
                    key={option.key}
                    className={`flex flex-col sm:flex-row cursor-pointer sm:items-center sm:justify-between rounded-lg p-4 transition-colors hover:bg-primary/5 ${
                      options[option.key as keyof PricingOptions].selected
                        ? "bg-primary/10"
                        : ""
                    }`}
                  >
                    <div className="flex items-center mb-2 sm:mb-0">
                      <input
                        className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                        type="checkbox"
                        checked={
                          options[option.key as keyof PricingOptions].selected
                        }
                        onChange={(e) =>
                          updateOption(
                            option.key as keyof PricingOptions,
                            "selected",
                            e.target.checked
                          )
                        }
                      />
                      <span className="ml-4 text-gray-700 text-sm sm:text-base">
                        {option.label}
                      </span>
                    </div>
                    <span className="font-bold text-gray-900 pl-9 sm:pl-0 text-right">
                      + ¥
                      {options[
                        option.key as keyof PricingOptions
                      ].price.toLocaleString()}
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-8 border-t border-primary/20 pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-lg sm:text-xl font-bold text-gray-900">
                    合計金額
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-primary">
                    ¥{getTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 注意事項 */}
      <section className="unified-section">
        <div className="unified-container">
          <h2 className="unified-section-title animate-fade-in-up">注意事項</h2>
          <div className="mx-auto max-w-4xl space-y-6">
            {NOTICE_SECTIONS.map((section, index) => (
              <div
                key={index}
                className={`unified-surface p-8 border-l-4 border-yellow-400 animate-fade-in-up animate-delay-${
                  index + 1
                }00`}
              >
                <h3 className="mb-4 text-xl font-bold text-gray-800">
                  {section.title}
                </h3>
                <ul className="list-inside list-disc space-y-3 text-gray-600">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 注文フォーム */}
      <section className="unified-section" id="form">
        <div className="unified-container">
          <h2 className="unified-section-title animate-fade-in-up">
            ご依頼フォーム
          </h2>
          <div className="max-w-2xl mx-auto">
            {/* フォーム本体 */}
            <form
              className="unified-surface-elevated p-8 space-y-8"
              onSubmit={handleSubmit}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  (event.target as HTMLElement).tagName !== "TEXTAREA"
                ) {
                  event.preventDefault();
                }
              }}
            >
              {/* 入力フィールド */}
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="name"
                >
                  お名前（活動名でも可）
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  className="modern-input w-full"
                  id="name"
                  placeholder="お名前を入力してください"
                  type="text"
                  value={formValues.name}
                  onChange={(e) => handleFormChange({ name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="email"
                >
                  メールアドレス<span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  className="modern-input w-full"
                  id="email"
                  placeholder="メールアドレスを入力してください"
                  type="email"
                  value={formValues.email}
                  onChange={(e) => handleFormChange({ email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="videoUrl"
                >
                  本家動画URL（Youtube、ニコニコ等）
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  className="modern-input w-full"
                  id="videoUrl"
                  placeholder="本家動画のURLを入力してください"
                  type="url"
                  value={formValues.videoUrl}
                  onChange={(e) =>
                    handleFormChange({ videoUrl: e.target.value })
                  }
                  onBlur={(e) =>
                    handleUrlValidation(e.target.value, "videoUrl-warning")
                  }
                  required
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="otherRequests"
                >
                  その他ご要望・ご質問等
                </label>
                <textarea
                  className="modern-input w-full resize-none"
                  id="otherRequests"
                  placeholder="その他ご要望・ご質問等を入力してください"
                  rows={3}
                  value={formValues.otherRequests}
                  onChange={(e) =>
                    handleFormChange({ otherRequests: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="notes"
                >
                  ご依頼内容
                </label>
                <textarea
                  className="modern-input w-full resize-none bg-gray-50"
                  id="notes"
                  placeholder="ご依頼内容がここに表示されます"
                  rows={Math.max(5, selectedOptions.split("\n").length + 1)}
                  value={selectedOptions}
                  readOnly
                />
              </div>

              {/* 見積金額表示 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                  現在の見積もり金額
                </h4>
                <div className="mx-auto mb-3">
                  <div className="text-sm text-gray-600 mb-2 text-center">
                    基本プラン: ¥{basePrice.toLocaleString()}
                  </div>
                  {options.vocal.selected && (
                    <div className="text-sm text-gray-600 text-center">
                      + ボーカル追加: ¥
                      {(
                        options.vocal.price * options.vocal.quantity
                      ).toLocaleString()}{" "}
                      ({options.vocal.quantity}人)
                    </div>
                  )}
                  {options.encode.selected && (
                    <div className="text-sm text-gray-600 text-center">
                      + エンコード: ¥{options.encode.price.toLocaleString()}
                    </div>
                  )}
                  {options.urgent3.selected && (
                    <div className="text-sm text-gray-600 text-center">
                      + お急ぎ納品(3日): ¥
                      {options.urgent3.price.toLocaleString()}
                    </div>
                  )}
                  {options.urgent7.selected && (
                    <div className="text-sm text-gray-600 text-center">
                      + お急ぎ納品(7日): ¥
                      {options.urgent7.price.toLocaleString()}
                    </div>
                  )}
                </div>
                <div className="border-t border-blue-200 pt-3">
                  <div className="text-center">
                    <span className="text-lg font-semibold text-gray-700">
                      合計金額:{" "}
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ¥{getTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* 送信ボタン */}
              <div>
                <button
                  type="submit"
                  className="btn-primary btn-full"
                  disabled={isLoading}
                >
                  {buttonText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 送信確認ダイアログ */}
      <ConfirmationDialog
        isOpen={showConfirmDialog}
        title="依頼内容を送信しますか？"
        message="入力された依頼内容でメールを送信します。送信後は内容の変更ができませんので、内容をご確認の上で送信してください。"
        confirmText="送信する"
        cancelText="キャンセル"
        onConfirm={handleConfirmSubmit}
        onCancel={() => setShowConfirmDialog(false)}
        isLoading={isLoading}
      />
    </div>
  );
}
