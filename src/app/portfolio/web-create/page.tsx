"use client";

import { useEffect, useState } from "react";

interface PortfolioItem {
  id: number;
  title: string;
  client: string;
  description: string;
  imageUrl: string;
  siteUrl?: string;
  category: string;
  technologies: string[];
  features: string[];
  completionDate: string;
}

export default function WebCreatePortfolioPage() {
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 4;

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        // ベースパスを考慮した相対パスでJSONファイルを読み込み
        const response = await fetch("/data/web-create-portfolio.json");
        const data = await response.json();
        setPortfolioData(data);
      } catch (error) {
        console.error("Failed to load portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!portfolioData || portfolioData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">
          ポートフォリオデータの読み込みに失敗しました。
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(portfolioData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = portfolioData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // ページ遷移時にスクロール位置を維持
  };

  return (
    <div className="min-h-screen">
      {/* ヘッダーセクション */}
      <section className="unified-section pt-12 animate-fade-in-up">
        <div className="unified-container">
          <h1 className="unified-title">制作実績</h1>
          <p className="unified-subtitle">
            創造性、機能性、そしてユーザーエクスペリエンスへのこだわりを示す、最近のウェブデザインプロジェクトをご覧ください。
          </p>
        </div>
      </section>

      {/* ポートフォリオグリッド */}
      <section className="py-12">
        <div className="unified-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {currentItems.map((item, index) => {
              const CardContent = (
                <>
                  {/* プロジェクト画像 */}
                  <div className="overflow-hidden">
                    <div
                      className="w-full bg-center bg-cover aspect-video transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundImage: `url("${item.imageUrl}")`,
                      }}
                    />
                  </div>

                  {/* プロジェクト情報 */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-800 leading-tight">
                        {item.client}
                      </h3>
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 ml-3 flex-shrink-0">
                        {item.category}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm flex-grow leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* 技術スタック */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        使用技術
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {item.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 主要機能 */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        主要機能
                      </h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {item.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <svg
                              className="w-3 h-3 text-green-500 mr-2 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 完成日とCTAボタン */}
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <span className="text-xs text-gray-500">
                        完成:{" "}
                        {new Date(item.completionDate).toLocaleDateString(
                          "ja-JP"
                        )}
                      </span>
                      <span className="text-sm font-semibold text-blue-600">
                        プロジェクトを見る
                        <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1 inline-block">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </>
              );

              return item.siteUrl ? (
                <a
                  key={item.id}
                  href={item.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col modern-card overflow-hidden animate-fade-in-up animate-delay-${
                    (index % 2) + 1
                  }00 cursor-pointer transition-transform duration-200 hover:scale-[1.02]`}
                  style={{ padding: 0 }}
                >
                  {CardContent}
                </a>
              ) : (
                <div
                  key={item.id}
                  className={`group flex flex-col modern-card overflow-hidden animate-fade-in-up animate-delay-${
                    (index % 2) + 1
                  }00`}
                  style={{ padding: 0 }}
                >
                  {CardContent}
                </div>
              );
            })}
          </div>

          {/* ページネーション */}
          {totalPages > 1 && (
            <nav
              aria-label="ページネーション"
              className="mt-12 flex items-center justify-center space-x-2"
            >
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex size-10 items-center justify-center rounded-full hover:bg-blue-50 text-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  fill="currentColor"
                  height="20"
                  viewBox="0 0 256 256"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
                </svg>
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`text-sm font-bold flex size-10 items-center justify-center rounded-full transition-colors ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "hover:bg-blue-50 text-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="flex size-10 items-center justify-center rounded-full hover:bg-blue-50 text-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  fill="currentColor"
                  height="20"
                  viewBox="0 0 256 256"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                </svg>
              </button>
            </nav>
          )}
        </div>
      </section>

      {/* CTA セクション */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="unified-container text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            あなたのプロジェクトも同じクオリティで
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            これらの実績と同じレベルの品質で、あなたのWebサイトを制作いたします。
            <br />
            まずはお気軽にご相談ください。
          </p>
          <div className="flex justify-center">
            <a
              href="/services/web-create#form"
              className="btn-primary btn-center"
            >
              Web制作を依頼する
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
