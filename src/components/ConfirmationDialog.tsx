import React from "react";

interface ConfirmationDialogProps {
  /** ダイアログの表示状態 */
  isOpen: boolean;
  /** ダイアログのタイトル */
  title: string;
  /** ダイアログのメッセージ */
  message: string;
  /** 確認ボタンのテキスト（デフォルト: "送信する"） */
  confirmText?: string;
  /** キャンセルボタンのテキスト（デフォルト: "キャンセル"） */
  cancelText?: string;
  /** 確認ボタンクリック時のハンドラー */
  onConfirm: () => void;
  /** キャンセルボタンクリック時のハンドラー */
  onCancel: () => void;
  /** ローディング状態（確認ボタンを無効化） */
  isLoading?: boolean;
}

/**
 * 送信前の確認ダイアログ共通コンポーネント
 */
export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = "送信する",
  cancelText = "キャンセル",
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
        <div className="text-center">
          {/* アイコン */}
          <div className="text-6xl mb-4">📧</div>

          {/* タイトル */}
          <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>

          {/* メッセージ */}
          <p className="text-gray-600 mb-8 leading-relaxed">{message}</p>

          {/* ボタン */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
