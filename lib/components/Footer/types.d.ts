import type React from 'react';
import type { ImageProps, ImageStyle, StyleProp, TextInput, TextInputProps, TextProps, TextStyle, ViewProps, ViewStyle } from 'react-native';
export declare type FooterComponentProps = React.ReactElement<FooterProps>;
export declare type FooterProps = TextInputProps & {
    label?: string;
    sendIconProps?: ImageProps;
    sendTextProps?: TextProps;
    containerViewProps?: ViewProps;
    shouldShowTextInputSend?: boolean;
    customInput?: TextInput | null;
    shouldShowSendImage?: boolean;
    sendTextStyle?: TextStyle;
    sendIconStyle?: ImageStyle;
    inputStyle?: StyleProp<TextStyle>;
    containerStyle?: ViewStyle;
    sendText?: string;
    onIconPress?: () => void | null;
    onSendTextPress?: () => void | null;
};
