import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icons } from '../../assets';
import styles from './styles';
export default memo(function ProfileHeader({ userImage, userName, userMessage, userImageStyle, rootStyle, userNameStyle, userMessageStyle, closeIconStyle, customCloseButton, onImageClick, onClosePress, containerStyle, userMessageProps, userNameProps, userImageProps, closeIconProps, ...rest }) {
    const _containerStyle = StyleSheet.flatten([
        styles.userContainer,
        containerStyle,
    ]);
    const _rootStyle = StyleSheet.flatten([styles.userView, rootStyle]);
    const _userNameStyle = StyleSheet.flatten([styles.name, userNameStyle]);
    const _userMessageStyle = StyleSheet.flatten([
        styles.message,
        userMessageStyle,
    ]);
    const _userImageStyle = StyleSheet.flatten([styles.image, userImageStyle]);
    const _closeIconStyle = StyleSheet.flatten([
        styles.closeIcon,
        closeIconStyle,
    ]);
    const touchPos = {
        top: 20,
        bottom: 30,
        left: 30,
        right: 30,
    };
    return (React.createElement(View, { style: _rootStyle, ...rest },
        !!userImage && (React.createElement(TouchableOpacity, { onPress: () => onImageClick === null || onImageClick === void 0 ? void 0 : onImageClick() },
            React.createElement(Image, { source: userImage, style: _userImageStyle, ...userImageProps }))),
        React.createElement(View, { style: _containerStyle },
            React.createElement(View, { style: styles.barUsername },
                React.createElement(Text, { style: _userNameStyle, ...userNameProps }, userName)),
            !!userMessage && (React.createElement(Text, { style: _userMessageStyle, ...userMessageProps }, userMessage))), customCloseButton !== null && customCloseButton !== void 0 ? customCloseButton : (React.createElement(TouchableOpacity, { onPress: () => onClosePress === null || onClosePress === void 0 ? void 0 : onClosePress(), hitSlop: touchPos },
        React.createElement(Image, { source: Icons.closeIcon, style: _closeIconStyle, ...closeIconProps })))));
});
//# sourceMappingURL=ProfileHeader.js.map