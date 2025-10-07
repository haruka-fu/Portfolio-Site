"use client";

import { useEffect, useState } from "react";

interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  description: string;
  videoId: string;
  genre: string;
  platform: "youtube" | "spoon" | "other";
  spoonUrl?: string; // Spooncastの場合のURL（オプション）
  createdDate: string; // 制作年月
}

interface PortfolioData {
  portfolioItems: PortfolioItem[];
}

export default function VocalMixPortfolioPage() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        // ベースパスを考慮した相対パスでJSONファイルを読み込み
        const response = await fetch("/data/vocal-mix-portfolio.json");
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

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">
          ポートフォリオデータの読み込みに失敗しました。
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(
    portfolioData.portfolioItems.length / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = portfolioData.portfolioItems.slice(
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
          <h1 className="unified-title">ボーカルミックス ポートフォリオ</h1>
          <p className="unified-subtitle">
            これまでに手がけたボーカルミックスの実績をご紹介します。
          </p>
        </div>
      </section>

      {/* ポートフォリオグリッド */}
      <section className="py-12">
        <div className="unified-container">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {currentItems.map((item, index) => (
              <div
                key={item.id}
                className={`group flex flex-col animate-fade-in-up animate-delay-${
                  (index % 3) + 1
                }00`}
              >
                {/* 動画埋め込み */}
                <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-200">
                  {item.platform === "youtube" ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${item.videoId}`}
                      title={`${item.title} - YouTube video player`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  ) : item.platform === "spoon" ? (
                    <div
                      className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 to-pink-500 cursor-pointer hover:from-orange-500 hover:to-pink-600 transition-all duration-300"
                      onClick={() => {
                        if (item.spoonUrl) {
                          window.open(
                            item.spoonUrl,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }
                      }}
                    >
                      <div className="text-white text-center p-4">
                        <div className="mb-3">
                          <svg
                            className="w-12 h-12 mx-auto mb-2 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                        <p className="text-xs opacity-90 mb-3">
                          Spooncastで配信中
                        </p>
                        <div className="inline-flex items-center px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-medium group-hover:bg-opacity-30 transition-colors">
                          聴く
                          <svg
                            className="w-3 h-3 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v7a2 2 0 002 2h4m-4-9V9a2 2 0 002-2h2m5 0v.01M19 15V9a2 2 0 00-2-2h-2m-5 9h6.01"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 to-pink-500 cursor-pointer hover:from-orange-500 hover:to-pink-600 transition-all duration-300"
                      onClick={() => {
                        if (item.spoonUrl) {
                          window.open(
                            item.spoonUrl,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }
                      }}
                    >
                      <div className="text-white text-center p-4">
                        <div className="mb-3">
                          <svg
                            className="w-12 h-12 mx-auto mb-2 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                        <p className="text-xs opacity-90 mb-3">
                          Spooncastで配信中
                        </p>
                        <div className="inline-flex items-center px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-medium group-hover:bg-opacity-30 transition-colors">
                          聴く
                          <svg
                            className="w-3 h-3 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v7a2 2 0 002 2h4m-4-9V9a2 2 0 002-2h2m5 0v.01M19 15V9a2 2 0 00-2-2h-2m-5 9h6.01"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* プロジェクト情報 */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 ml-2 flex-shrink-0">
                      {item.genre}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <p className="font-medium text-gray-800">
                      ボーカル: {item.client}
                    </p>
                    <p className="text-gray-500 text-xs">{item.createdDate}</p>
                  </div>
                </div>
              </div>
            ))}
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
            あなたの楽曲も同じクオリティで
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            これらの実績と同じレベルの品質で、あなたの楽曲を仕上げます。
            <br />
            まずはお気軽にご相談ください。
          </p>
          <div className="flex justify-center">
            <a href="/services/vocal-mix" className="btn-primary btn-center">
              ボーカルミックスを依頼する
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
