import { MutableRefObject } from 'react';
import { NativeTouchEvent } from 'react-native';
import type { OnLoadData, OnProgressData } from 'react-native-video';
import { StoryContainerProps } from '../types';
declare const useStoryContainer: ({ onChangePosition, ...props }: StoryContainerProps, viewedStories: MutableRefObject<boolean[]>) => {
    isPause: boolean;
    progressIndex: number;
    isLoaded: boolean;
    duration: number;
    setVisibleElements: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    videoDuration: number[];
    setPause: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    setLoaded: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    setDuration: import("react").Dispatch<import("react").SetStateAction<number>>;
    onImageLoaded: () => void;
    onVideoLoaded: (length: OnLoadData) => void;
    onVideoProgress: (progressData?: OnProgressData) => void;
    onVideoEnd: () => void;
    changeStory: (evt: NativeTouchEvent) => void;
    onArrowClick: (type: string) => void;
    onStoryPressHold: () => void;
    setVideoDuration: import("react").Dispatch<import("react").SetStateAction<number[]>>;
    onStoryPressRelease: () => void;
    isKeyboardVisible: boolean;
    opacity: number;
    rootStyle: import("react-native").ViewStyle | {
        flex: number;
    };
    containerStyle: {
        flex: number;
    } | {
        backgroundColor: string;
    };
};
export default useStoryContainer;
