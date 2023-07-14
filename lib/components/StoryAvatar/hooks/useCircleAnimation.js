import { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
const useCircleAnimation = ({ pressedIndex, index, isStoryViewVisible, }) => {
    const avatarAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: withTiming(isStoryViewVisible && pressedIndex === index ? 0 : 1, {
                    duration: 200,
                    easing: Easing.circle,
                }),
            },
        ],
    }), [isStoryViewVisible, pressedIndex]);
    return { avatarAnimatedStyle };
};
export default useCircleAnimation;
//# sourceMappingURL=useCircleAnimation.js.map