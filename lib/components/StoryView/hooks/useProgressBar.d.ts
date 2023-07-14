import { Animated } from 'react-native';
import { ProgressBarProps } from '../types';
declare const useProgressBar: ({ active, index, storyIndex, videoDuration, currentIndex, duration, storyType, ...props }: ProgressBarProps) => {
    barActiveColor: string;
    barInActiveColor: string;
    barHeight: number;
    scale: Animated.Value;
    width: number;
    setWidth: import("react").Dispatch<import("react").SetStateAction<number>>;
};
export default useProgressBar;
