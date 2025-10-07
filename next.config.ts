import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
    // GitHub Pages用の設定
    output: 'export',
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
    distDir: 'out',
    images: {
        unoptimized: true
    },
    // GitHub PagesでReactのStrict Modeを無効化（必要に応じて）
    reactStrictMode: true,
    // 静的エクスポート用設定
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: false,
    },
    // ベースパスの設定（本番環境のみ）
    ...(isProd && {
        basePath: '/Portfolio-Site',
        assetPrefix: '/Profile-Site/',
    }),
};

export default nextConfig;
