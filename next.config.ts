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
    // 静的エクスポート時の設定
    experimental: {
        // 静的エクスポート時のランタイム最適化
        optimizePackageImports: ['react', 'react-dom'],
    },
    // プリフェッチとキャッシュ設定
    compiler: {
        removeConsole: isProd,
    },
    // ベースパスの設定（本番環境のみ）
    ...(isProd && {
        basePath: '/Portfolio-Site',
        assetPrefix: '/Portfolio-Site/',
    }),
};

export default nextConfig;
