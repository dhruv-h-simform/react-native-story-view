import React, { useRef } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { Icons } from '../../assets';
import { Strings } from '../../constants';
import { useKeyboardListener } from '../../hooks';
import { Colors } from '../../theme';
import styles from './styles';
const Footer = ({ onIconPress, onSendTextPress, sendTextStyle, sendIconStyle, inputStyle, containerStyle, sendText, shouldShowSendImage = true, shouldShowTextInputSend = true, sendIconProps, sendTextProps, containerViewProps, customInput, ...rest }) => {
    const isKeyboardVisible = useKeyboardListener();
    const ref = useRef(null);
    const handleSendTextPress = () => {
        var _a;
        (_a = ref === null || ref === void 0 ? void 0 : ref.current) === null || _a === void 0 ? void 0 : _a.clear();
        onSendTextPress === null || onSendTextPress === void 0 ? void 0 : onSendTextPress();
    };
    const _sendTextStyle = StyleSheet.flatten([styles.sendText, sendTextStyle]);
    const _sendIconStyle = StyleSheet.flatten([styles.sendIcon, sendIconStyle]);
    const _inputStyle = StyleSheet.flatten([styles.input, inputStyle]);
    const _containerStyle = StyleSheet.flatten([
        styles.container,
        containerStyle,
    ]);
    return (React.createElement(View, { style: _containerStyle, ...containerViewProps },
        React.createElement(View, { style: styles.sectionStyle },
            React.createElement(React.Fragment, null, customInput !== null && customInput !== void 0 ? customInput : (React.createElement(TextInput, { ref: ref, style: _inputStyle, placeholder: Strings.sendMessage, placeholderTextColor: Colors.white, ...rest }))),
            isKeyboardVisible && shouldShowTextInputSend && (React.createElement(TouchableOpacity, { onPress: handleSendTextPress },
                React.createElement(Text, { style: _sendTextStyle, ...sendTextProps }, sendText !== null && sendText !== void 0 ? sendText : Strings.send)))),
        !isKeyboardVisible && shouldShowSendImage && (React.createElement(TouchableOpacity, { onPress: onIconPress, testID: "footerIcon" },
            React.createElement(Image, { source: Icons.send, style: _sendIconStyle, ...sendIconProps })))));
};
export default Footer;
//# sourceMappingURL=Footer.js.map