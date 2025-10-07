"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ASSETS } from "@/utils/assets";

// 気持ち上に飛ぶスクロール関数
const scrollToForm = (path: string) => {
  const [basePath, hash] = path.split("#");

  if (window.location.pathname === basePath && hash) {
    // 同じページ内のフォームにスクロール
    const element = document.getElementById(hash);
    if (element) {
      // まず少し上に移動してから下にスクロールする「気持ち上に飛ぶ」動作
      const initialOffset = -50; // 一時的に上に移動
      const finalOffset = -120; // 最終的な位置（ヘッダー分のオフセット）

      // 現在の位置を取得
      const currentY = window.pageYOffset;
      const targetY =
        element.getBoundingClientRect().top + window.pageYOffset + finalOffset;

      // 一度上に移動
      window.scrollTo({
        top: currentY + initialOffset,
        behavior: "smooth",
      });

      // 少し遅れてから目標位置にスクロール
      setTimeout(() => {
        window.scrollTo({
          top: targetY,
          behavior: "smooth",
        });
      }, 150);
    }
  } else {
    // 別のページに遷移（ハッシュ付きでスムーズスクロールが機能するように）
    window.location.href = path;
  }
};

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b text-black shadow-lg"
      style={{
        backgroundColor: "rgba(217, 234, 246, 0.85)",
        borderColor: "rgba(68, 150, 211, 0.2)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 lg:h-20">
          {/* ロゴ */}
          <div className="flex items-center flex-shrink-0">
            <Link
              href="/"
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 cursor-pointer"
              prefetch={false}
            >
              <Image
                src={ASSETS.LOGO_SVG}
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* 中央ナビゲーション - デスクトップ版 */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8 absolute left-1/2 transform -translate-x-1/2">
            {/* サービスメニュー */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveMenu("services")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <span className="text-sm lg:text-base xl:text-lg font-medium transition-colors hover:opacity-80 flex items-center gap-1 cursor-pointer">
                サービス
                <svg
                  className={`w-3 h-3 lg:w-4 lg:h-4 transition-transform ${
                    activeMenu === "services" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>

              {/* ドロップダウンメニュー */}
              <div
                className={`absolute top-full left-0 mt-2 w-56 lg:w-60 xl:w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20 transition-all duration-200 ${
                  activeMenu === "services"
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
              >
                <Link
                  href="/services/vocal-mix"
                  className="block px-3 lg:px-4 py-2 lg:py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  prefetch={false}
                >
                  <div className="font-medium text-sm lg:text-base">
                    ボーカルミックスサービス
                  </div>
                  <div className="text-xs lg:text-sm text-gray-500">
                    あなたの歌声を最高の一曲に
                  </div>
                </Link>
                <Link
                  href="/services/web-create"
                  className="block px-3 lg:px-4 py-2 lg:py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  prefetch={false}
                >
                  <div className="font-medium text-sm lg:text-base">
                    Web制作サービス
                  </div>
                  <div className="text-xs lg:text-sm text-gray-500">
                    お客様のニーズに合わせたWebサイト制作
                  </div>
                </Link>
              </div>
            </div>

            {/* 制作実績メニュー */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveMenu("portfolio")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <span className="text-sm lg:text-base xl:text-lg font-medium transition-colors hover:opacity-80 flex items-center gap-1 cursor-pointer">
                制作実績
                <svg
                  className={`w-3 h-3 lg:w-4 lg:h-4 transition-transform ${
                    activeMenu === "portfolio" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>

              {/* ドロップダウンメニュー */}
              <div
                className={`absolute top-full left-0 mt-2 w-56 lg:w-60 xl:w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20 transition-all duration-200 ${
                  activeMenu === "portfolio"
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
              >
                <Link
                  href="/portfolio/vocal-mix"
                  className="block px-3 lg:px-4 py-2 lg:py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  prefetch={false}
                >
                  <div className="font-medium text-sm lg:text-base">
                    ボーカルミックス実績
                  </div>
                  <div className="text-xs lg:text-sm text-gray-500">
                    過去のミックス作品
                  </div>
                </Link>
                <Link
                  href="/portfolio/web-create"
                  className="block px-3 lg:px-4 py-2 lg:py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  prefetch={false}
                >
                  <div className="font-medium text-sm lg:text-base">
                    Web制作実績
                  </div>
                  <div className="text-xs lg:text-sm text-gray-500">
                    制作したWebサイト
                  </div>
                </Link>
              </div>
            </div>

            {/* ご依頼フォームメニュー */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveMenu("contact")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <span className="text-sm lg:text-base xl:text-lg font-medium transition-colors hover:opacity-80 flex items-center gap-1 cursor-pointer">
                ご依頼フォーム
                <svg
                  className={`w-3 h-3 lg:w-4 lg:h-4 transition-transform ${
                    activeMenu === "contact" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>

              {/* ドロップダウンメニュー */}
              <div
                className={`absolute top-full left-0 mt-2 w-56 lg:w-60 xl:w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20 transition-all duration-200 ${
                  activeMenu === "contact"
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
              >
                <button
                  onClick={() => scrollToForm("/services/vocal-mix#form")}
                  className="w-full text-left block px-3 lg:px-4 py-2 lg:py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-sm lg:text-base">
                    ボーカルミックス依頼
                  </div>
                  <div className="text-xs lg:text-sm text-gray-500">
                    ミックス依頼フォーム
                  </div>
                </button>
                <button
                  onClick={() => scrollToForm("/services/web-create#form")}
                  className="w-full text-left block px-3 lg:px-4 py-2 lg:py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-sm lg:text-base">
                    Web制作依頼
                  </div>
                  <div className="text-xs lg:text-sm text-gray-500">
                    Web制作依頼フォーム
                  </div>
                </button>
              </div>
            </div>
          </nav>

          {/* モバイルメニュー */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* モバイルメニューボタン */}
            <button
              className="lg:hidden p-1.5 sm:p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="メニューを開く"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-3 border-t border-gray-200">
            {/* サービス */}
            <div className="space-y-2">
              <div className="font-semibold text-gray-900 px-2 text-sm">
                サービス
              </div>
              <Link
                href="/services/vocal-mix"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors rounded-md text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
                prefetch={false}
              >
                ボーカルミックス
              </Link>
              <Link
                href="/services/web-create"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors rounded-md text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
                prefetch={false}
              >
                Web制作
              </Link>
            </div>

            {/* 制作実績 */}
            <div className="space-y-2">
              <div className="font-semibold text-gray-900 px-2 text-sm">
                制作実績
              </div>
              <Link
                href="/portfolio/vocal-mix"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors rounded-md text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
                prefetch={false}
              >
                ボーカルミックス実績
              </Link>
              <Link
                href="/portfolio/web-create"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors rounded-md text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
                prefetch={false}
              >
                Web制作実績
              </Link>
            </div>

            {/* ご依頼フォーム */}
            <div className="space-y-2">
              <div className="font-semibold text-gray-900 px-2 text-sm">
                ご依頼フォーム
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollToForm("/services/vocal-mix#form");
                }}
                className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors rounded-md text-sm"
              >
                ボーカルミックス依頼
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollToForm("/services/web-create#form");
                }}
                className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors rounded-md text-sm"
              >
                Web制作依頼
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
