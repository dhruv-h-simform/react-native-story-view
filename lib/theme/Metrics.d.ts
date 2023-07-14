export declare const windowWidth: number, windowHeight: number;
export declare const scale: (size: number, skipAspectRatio?: boolean) => number;
export declare const verticalScale: (size: number, skipAspectRatio?: boolean) => number;
export declare const moderateScale: (size: number, skipAspectRatio?: boolean, factor?: number) => number;
export declare function moderateVerticalScale(size: number, skipAspectRatio?: boolean, factor?: number): number;
export declare const Metrics: {
    zero: number;
    screenWidth: number;
    screenHeight: number;
    defaultDuration: number;
    navBarHeight: number;
    size: {
        s: number;
        m: number;
        l: number;
        xl: number;
        xxl: number;
        xxxl: number;
    };
    isIOS: boolean;
    keyboardVerticalOffset: number;
    statusBarHeight: number | undefined;
};
