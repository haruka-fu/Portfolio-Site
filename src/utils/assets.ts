/**
 * アセットパスのユーティリティ
 */
export const getAssetPath = (path: string): string => path;

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
