"use client";

import { useState } from "react";
import { WebCreateFormValues } from "@/utils/types";
import { submitForm, generateWebCreateOrderSummary } from "@/utils/forms";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";

export default function WebCreatePage() {
  // 基本料金（1ページあたり）
  const pricePerPage = 1500;

  // 送信ボタンのテキスト
  const [buttonText, setButtonText] = useState("依頼を送信");

  // ローディング状態（送信中かどうか）
  const [isLoading, setIsLoading] = useState(false);

  // 送信完了状態（成功モーダル表示用）
  const [isSubmissionComplete, setIsSubmissionComplete] = useState(false);

  // 確認ダイアログの表示状態
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // フォームの入力値
  const [formValues, setFormValues] = useState<WebCreateFormValues>({
    name: "",
    email: "",
    contactInfo: "",
    siteOverview: "",
    pages: [{ name: "", content: "" }],
    deadline: "",
    budget: "",
  });

  // フォーム値の部分更新処理
  const handleFormChange = (values: Partial<WebCreateFormValues>) => {
    setFormValues((prev) => ({ ...prev, ...values }));
  };

  // ページを追加する処理
  const addPage = () => {
    setFormValues((prev) => ({
      ...prev,
      pages: [...prev.pages, { name: "", content: "" }],
    }));
  };

  // ページを削除する処理
  const removePage = (index: number) => {
    if (formValues.pages.length > 1) {
      setFormValues((prev) => ({
        ...prev,
        pages: prev.pages.filter((_, i) => i !== index),
      }));
    }
  };

  // 特定のページ情報を更新する処理
  const updatePage = (
    index: number,
    field: "name" | "content",
    value: string
  ) => {
    setFormValues((prev) => ({
      ...prev,
      pages: prev.pages.map((page, i) =>
        i === index ? { ...page, [field]: value } : page
      ),
    }));
  };

  // 見積もり金額を計算
  const estimatedPrice = formValues.pages.length * pricePerPage;

  // 依頼内容のサマリーを生成（共通utilsを使用）
  const selectedOptions = generateWebCreateOrderSummary(
    formValues,
    "email",
    estimatedPrice
  );

  // フォームリセット処理（送信成功後に呼び出される）
  const resetForm = () => {
    setFormValues({
      name: "",
      email: "",
      contactInfo: "",
      siteOverview: "",
      pages: [{ name: "", content: "" }],
      deadline: "",
      budget: "",
    });
  };

  // フォーム送信処理
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    // 確認ダイアログを表示
    setShowConfirmDialog(true);
  };

  // 送信確認後の実際の送信処理
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

      <section className="unified-section animate-fade-in-up">
        <div className="unified-container">
          <h1 className="unified-title">Web制作サービス</h1>
          <p className="unified-subtitle">
            お客様のニーズに合わせたWebサイトを制作いたします。
          </p>
        </div>
      </section>

      <section className="unified-section">
        <div className="unified-container">
          <h2 className="unified-section-title animate-fade-in-up">
            制作の流れ
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="modern-card animate-fade-in-up">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 font-bold text-base sm:text-lg shadow-sm border border-gray-200 shrink-0">
                  1
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  お問い合わせ・ヒアリング
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                まずはフォームからお気軽にご相談ください。ご要望を詳しくお伺いします。
              </p>
            </div>
            <div className="modern-card animate-fade-in-up animate-delay-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 font-bold text-base sm:text-lg shadow-sm border border-gray-200 shrink-0">
                  2
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  お見積もり・ご契約
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                ヒアリング内容を基にお見積もりを作成します。内容にご納得いただけましたらご契約となります。
              </p>
            </div>
            <div className="modern-card animate-fade-in-up animate-delay-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 font-bold text-base sm:text-lg shadow-sm border border-gray-200 shrink-0">
                  3
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  デザイン・制作
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                デザイン案を作成し、ご確認いただきながらWebサイトを制作していきます。
              </p>
            </div>
            <div className="modern-card animate-fade-in-up animate-delay-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 font-bold text-base sm:text-lg shadow-sm border border-gray-200 shrink-0">
                  4
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  納品・公開
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                最終確認後、Webサイトを公開します。操作方法のレクチャーも行います。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="unified-section">
        <div className="unified-container">
          <h2 className="unified-section-title animate-fade-in-up">
            料金について
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="modern-card animate-fade-in-up text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                基本料金
              </h3>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
                ¥{pricePerPage.toLocaleString()}
              </div>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
                1ページあたり
              </p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-3">
                  <div className="text-yellow-600 text-xl">💡</div>
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      料金について
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>
                        • 基本料金は1ページ{pricePerPage.toLocaleString()}
                        円となります
                      </li>
                      <li>
                        •
                        サイトの内容・機能・デザインの複雑さに応じて料金は上下いたします
                      </li>
                      <li>• 詳細なお見積もりはヒアリング後に作成いたします</li>
                    </ul>
                  </div>
                </div>
              </div>

              {formValues.pages.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    現在の概算見積もり
                  </h4>
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-gray-600">
                      {formValues.pages.length}ページ × ¥
                      {pricePerPage.toLocaleString()}
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      = ¥{estimatedPrice.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    ※概算金額です。最終的な料金は内容により変動いたします
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="unified-section" id="form">
        <div className="unified-container">
          <h2 className="unified-section-title animate-fade-in-up">
            ご依頼フォーム
          </h2>
          <div className="max-w-2xl mx-auto">
            {/* フォーム本体 */}
            <form
              className="unified-surface-elevated p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8"
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
                  htmlFor="siteOverview"
                >
                  サイトの概要<span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  className="modern-input w-full resize-none"
                  id="siteOverview"
                  placeholder="どのようなWebサイトにしたいか、目的などを詳しくご記入ください。"
                  rows={4}
                  value={formValues.siteOverview}
                  onChange={(e) =>
                    handleFormChange({ siteOverview: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="form-label">ページ構成</label>
                {formValues.pages.map((page, index) => (
                  <div
                    key={index}
                    className="mb-4 space-y-2 border-l-2 border-gray-200 pl-4 relative"
                  >
                    <div className="flex items-center justify-between">
                      <label
                        className="form-label"
                        htmlFor={`page-name-${index}`}
                      >
                        ページ名 {index + 1}
                      </label>
                      {formValues.pages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePage(index)}
                          className="flex items-center justify-center w-6 h-6 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                          title="このページを削除"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <div>
                      <input
                        className="modern-input w-full"
                        id={`page-name-${index}`}
                        placeholder="例：トップページ"
                        type="text"
                        value={page.name}
                        onChange={(e) =>
                          updatePage(index, "name", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label
                        className="form-label"
                        htmlFor={`page-content-${index}`}
                      >
                        各ページに載せたい内容
                      </label>
                      <textarea
                        className="modern-input w-full resize-none"
                        id={`page-content-${index}`}
                        placeholder="このページにどのようなテキスト、画像、機能を入れたいか具体的にご記入ください。"
                        rows={3}
                        value={page.content}
                        onChange={(e) =>
                          updatePage(index, "content", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
                <button
                  className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                  type="button"
                  onClick={addPage}
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      fillRule="evenodd"
                    />
                  </svg>
                  ページを追加する
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    htmlFor="deadline"
                  >
                    納期
                  </label>
                  <input
                    className="modern-input w-full"
                    id="deadline"
                    placeholder="例：2024年12月末"
                    type="text"
                    value={formValues.deadline}
                    onChange={(e) =>
                      handleFormChange({ deadline: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    htmlFor="budget"
                  >
                    ご予算
                  </label>
                  <input
                    className="modern-input w-full"
                    id="budget"
                    placeholder="例：〇〇円"
                    type="text"
                    value={formValues.budget}
                    onChange={(e) =>
                      handleFormChange({ budget: e.target.value })
                    }
                  />
                </div>
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
              {formValues.pages.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 text-center">
                    現在の概算見積もり
                  </h4>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-2">
                    <span className="text-sm sm:text-base text-gray-600 text-center">
                      {formValues.pages.length}ページ × ¥
                      {pricePerPage.toLocaleString()}
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-blue-600">
                      = ¥{estimatedPrice.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 text-center leading-relaxed">
                    ※概算金額です。最終的な料金は内容により変動いたします
                  </p>
                </div>
              )}

              {/* 送信ボタン */}
              <div>
                <button
                  type="submit"
                  className="btn-primary btn-full text-sm sm:text-base py-3 sm:py-4"
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
