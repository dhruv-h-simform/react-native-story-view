import type { ScrollValue } from '../types';
export declare const cubeTransition: (index: number, scrollX: ScrollValue) => {
    transform: ({
        perspective: number;
        translateX?: undefined;
        rotateY?: undefined;
        scale?: undefined;
    } | {
        translateX: number;
        perspective?: undefined;
        rotateY?: undefined;
        scale?: undefined;
    } | {
        rotateY: string;
        perspective?: undefined;
        translateX?: undefined;
        scale?: undefined;
    } | {
        scale: number;
        perspective?: undefined;
        translateX?: undefined;
        rotateY?: undefined;
    })[];
    position: "absolute";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
};
export declare const scaleTransition: (index: number, scrollX: ScrollValue) => {
    transform: ({
        perspective: number;
        scale?: undefined;
    } | {
        scale: number;
        perspective?: undefined;
    })[];
    position: "absolute";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
};
export declare const defaultTransition: () => {
    position: "absolute";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
};
