"use client";

import Link from "next/link";

export default function Home() {
  const onClickBtnViewMyServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80")',
          }}
        ></div>
        <div className="absolute inset-0 bg-black/40 sm:bg-black/50"></div>
        <div className="relative container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl py-16 sm:py-24 md:py-32 lg:py-40 xl:py-48 text-center text-white">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl mx-4 sm:mx-8 md:mx-6 lg:mx-4 xl:mx-8 py-4 sm:py-6 md:py-8 font-bold tracking-tighter leading-tight bg-gray-400/20 sm:bg-gray-400/30 rounded-lg lg:whitespace-nowrap"
            style={{ letterSpacing: "0.05em" }}
          >
            あなたの活動を様々な形で支援します
          </h1>
          <p className="mt-4 sm:mt-6 md:mt-8 max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed px-4">
            Webサイト制作とボーカルミキシングサービスで、デジタル世界で際立つお手伝いをします。
          </p>
          <button
            className="mt-6 sm:mt-8 md:mt-10 bg-blue-500 text-[#D9EAF6] text-sm sm:text-base md:text-lg font-bold h-10 sm:h-12 md:h-14 px-6 sm:px-8 md:px-10 rounded-lg hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            onClick={onClickBtnViewMyServices}
          >
            <span className="truncate">サービスを見る</span>
          </button>
        </div>
      </section>
      <section
        className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32"
        id="services"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-gray-900">
            私たちのサービス
          </h2>
          <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
              <div className="lg:order-2 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                  style={{
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
                  }}
                ></div>
              </div>
              <div className="lg:order-1 px-2 sm:px-4 lg:px-0">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-900">
                  ボーカルミキシング
                </h3>
                <p className="mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base md:text-lg lg:text-base xl:text-lg text-gray-600 leading-relaxed">
                  専門のミキシングサービスで、プロ品質のボーカルを実現します。あなたのレコーディングを強化し、リスナーを魅了する洗練されたラジオ対応のトラックを提供します。
                </p>
                <Link
                  className="inline-block bg-blue-500 text-[#D9EAF6] font-medium px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg text-xs sm:text-sm md:text-base hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  href="/services/vocal-mix"
                  prefetch={false}
                >
                  詳しく見る
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
              <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                  style={{
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80")',
                  }}
                ></div>
              </div>
              <div className="px-2 sm:px-4 lg:px-0">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-900">
                  ウェブサイト制作
                </h3>
                <p className="mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base md:text-lg lg:text-base xl:text-lg text-gray-600 leading-relaxed">
                  カスタムウェブサイト制作サービスで、魅力的なオンラインプレゼンスを構築します。ブランドのアイデンティティを反映し、オーディエンスを惹きつける、レスポンシブで使いやすいウェブサイトを制作します。
                </p>
                <Link
                  className="inline-block bg-blue-500 text-[#D9EAF6] font-medium px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg text-xs sm:text-sm md:text-base hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  href="/services/web-create"
                  prefetch={false}
                >
                  詳しく見る
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
