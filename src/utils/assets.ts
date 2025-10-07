/**
 * アセットパスのユーティリティ関数
 * GitHub Pages等のベースパスに対応した画像パスを生成
 */

// 本番環境でのベースパス（GitHub Pagesのリポジトリ名）
const BASE_PATH = process.env.NODE_ENV === 'production' ? '/Portfolio-Site' : '';

/**
 * アセット（画像等）のパスを生成
 * @param path - /images/logo.svg のような相対パス
 * @returns ベースパスを含む完全なパス
 */
export const getAssetPath = (path: string): string => {
    return `${BASE_PATH}${path}`;
};

/**
 * よく使用される画像パスの定数
 */
export const ASSETS = {
    LOGO_SVG: getAssetPath('/images/logo.svg'),
    LOGO_PNG: getAssetPath('/images/logo.png'),
    MUSIC: {
        FILE: getAssetPath('/images/music/01_file.svg'),
        MEMO: getAssetPath('/images/music/02_memo.svg'),
        UPLOAD: getAssetPath('/images/music/03_upload.svg'),
        EDIT: getAssetPath('/images/music/04_edit.svg'),
        CHECK: getAssetPath('/images/music/05_check.svg'),
        DELIVERY: getAssetPath('/images/music/06_delivery.svg'),
        CHECKMARK: getAssetPath('/images/music/07_checkmark.svg'),
    },
    WEB_PORTFOLIO: {
        MOMIJITOWA: getAssetPath('/images/web-portfolio/momijitowa.com.png'),
        MY_PORTFOLIO: getAssetPath('/images/web-portfolio/my-portfolio.png'),
    }
} as const;
