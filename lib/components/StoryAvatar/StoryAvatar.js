import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import useCircleAnimation from './hooks/useCircleAnimation';
import styles from './styles';
const StoryAvatar = ({ item, index, pressedIndex, isStoryViewVisible, openStories, viewedStories = [], userNameStyle, userImageStyle, userImageProps, viewedStoryContainerStyle, userNameProps, rootProps, containerStyle, }) => {
    var _a, _b;
    const isUserStorySeen = (_a = viewedStories === null || viewedStories === void 0 ? void 0 : viewedStories[index]) === null || _a === void 0 ? void 0 : _a.every((val) => val);
    const _userNameStyle = StyleSheet.flatten([styles.username, userNameStyle]);
    const _userImageStyle = StyleSheet.flatten([styles.image, userImageStyle]);
    const _containerStyle = StyleSheet.flatten([
        styles.imageContainer,
        containerStyle,
        (_b = (isUserStorySeen && viewedStoryContainerStyle)) !== null && _b !== void 0 ? _b : styles.viewedStoryContainer,
    ]);
    const { avatarAnimatedStyle } = useCircleAnimation({
        pressedIndex,
        index,
        isStoryViewVisible,
    });
    return (React.createElement(Pressable, { onPress: () => openStories === null || openStories === void 0 ? void 0 : openStories(index), ...rootProps },
        React.createElement(View, { style: _containerStyle },
            React.createElement(Animated.Image, { resizeMode: "cover", source: { uri: item === null || item === void 0 ? void 0 : item.profile }, style: [_userImageStyle, avatarAnimatedStyle], ...userImageProps })),
        React.createElement(Text, { style: _userNameStyle, ...userNameProps }, item === null || item === void 0 ? void 0 : item.username)));
};
export default StoryAvatar;
//# sourceMappingURL=StoryAvatar.js.map