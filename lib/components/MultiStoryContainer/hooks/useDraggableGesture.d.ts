import type { DraggableGestureProps } from '../types';
declare const useDraggableGesture: ({ backgroundColor, onComplete, onScrollBeginDrag, onScrollEndDrag, handleLongPress, isKeyboardVisible, }: DraggableGestureProps) => {
    listStyle: {
        flex: number;
        backgroundColor: string;
    } | {
        transform: ({
            scale: number;
            translateX?: undefined;
            translateY?: undefined;
        } | {
            translateX: number;
            scale?: undefined;
            translateY?: undefined;
        } | {
            translateY: number;
            scale?: undefined;
            translateX?: undefined;
        })[];
        backgroundColor: string;
    };
    rootStyle: {
        height: number;
        width: number;
        backgroundColor: string;
    };
    gestureHandler: (event: import("react-native-gesture-handler").PanGestureHandlerGestureEvent) => void;
};
export default useDraggableGesture;
