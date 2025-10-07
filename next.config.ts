import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
    // GitHub Pages用の設定
    output: 'export',
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
    images: {
        unoptimized: true
    },
    // GitHub PagesでReactのStrict Modeを無効化（必要に応じて）
    reactStrictMode: true,
    // ベースパスの設定（本番環境のみ）
    ...(isProd && {
        basePath: '/Profile-Site',
        assetPrefix: '/Profile-Site/',
    }),
};

export default nextConfig;
