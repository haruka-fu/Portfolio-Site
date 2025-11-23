import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
    output: 'export',
    trailingSlash: true,
    distDir: 'out',
    images: {
        unoptimized: true
    },
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: false,
    },
    experimental: {
        optimizePackageImports: ['react', 'react-dom'],
    },
    compiler: {
        removeConsole: isProd,
    },
};

export default nextConfig;
