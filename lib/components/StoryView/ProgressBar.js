import React from 'react';
import { Animated, View } from 'react-native';
import { useProgressBar } from './hooks';
import styles from './styles';
const ProgressBar = (props) => {
    const { barActiveColor, barInActiveColor, barHeight, scale, setWidth } = useProgressBar(props);
    const onLayoutAdded = (evt) => {
        setWidth(evt.width);
    };
    return (React.createElement(View, { onLayout: evt => onLayoutAdded(evt.nativeEvent.layout), style: [
            styles.progressBarContainer,
            {
                backgroundColor: barInActiveColor,
                height: barHeight,
            },
        ] },
        React.createElement(Animated.View, { style: [
                styles.progressBarContainer,
                styles.currentBarContainer,
                {
                    width: scale,
                    backgroundColor: barActiveColor,
                    height: barHeight,
                },
            ] })));
};
export default ProgressBar;
//# sourceMappingURL=ProgressBar.js.map