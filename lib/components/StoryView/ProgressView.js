import React, { useCallback } from 'react';
import { Animated } from 'react-native';
import ProgressBar from './ProgressBar';
import styles from './styles';
import { ProgressState } from './types';
const ProgressView = (props) => {
    const getProgressState = useCallback((i) => {
        if (props === null || props === void 0 ? void 0 : props.pause) {
            return ProgressState.Paused;
        }
        else if (i === props.currentIndex) {
            return ProgressState.InProgress;
        }
        else if (i < props.currentIndex) {
            return ProgressState.Completed;
        }
        return ProgressState.Default;
    }, [props === null || props === void 0 ? void 0 : props.pause, props.currentIndex]);
    return (React.createElement(Animated.View, { style: [styles.progressBarArray, props === null || props === void 0 ? void 0 : props.progressBarStyle] }, props.length.map((i, index) => {
        var _a;
        return (React.createElement(ProgressBar, { index: index, key: i, storyType: props === null || props === void 0 ? void 0 : props.stories[index].type, storyIndex: props === null || props === void 0 ? void 0 : props.storyIndex, currentUserIndex: props === null || props === void 0 ? void 0 : props.index, barStyle: props.barStyle, videoDuration: props === null || props === void 0 ? void 0 : props.videoDuration, setVideoDuration: props === null || props === void 0 ? void 0 : props.setVideoDuration, duration: props.duration || 3, currentIndex: props.currentIndex, next: props === null || props === void 0 ? void 0 : props.next, length: (_a = props === null || props === void 0 ? void 0 : props.stories) === null || _a === void 0 ? void 0 : _a.length, active: getProgressState(i), isLoaded: props === null || props === void 0 ? void 0 : props.isLoaded, pause: props === null || props === void 0 ? void 0 : props.pause }));
    })));
};
export default ProgressView;
//# sourceMappingURL=ProgressView.js.map