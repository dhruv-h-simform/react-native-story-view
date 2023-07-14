import type { CircleAnimationProps } from '../types';
declare const useCircleAnimation: ({ pressedIndex, index, isStoryViewVisible, }: CircleAnimationProps) => {
    avatarAnimatedStyle: {
        transform: {
            scale: 0 | 1;
        }[];
    };
};
export default useCircleAnimation;
