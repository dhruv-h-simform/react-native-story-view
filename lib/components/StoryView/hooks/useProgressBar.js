import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { Colors } from '../../../theme';
import { StroyTypes } from '../types';
import { ProgressState } from '../types';
const useProgressBar = ({ active, index, storyIndex, videoDuration, currentIndex, duration, storyType, ...props }) => {
    var _a, _b, _c, _d, _e, _f;
    const scaleRef = useRef(new Animated.Value(0));
    const scale = scaleRef === null || scaleRef === void 0 ? void 0 : scaleRef.current;
    const [width, setWidth] = useState(0);
    const [remainingTime, setRemainingTime] = useState(duration);
    const isVideoStory = useRef(storyType === StroyTypes.Video);
    // Restart ProgressBar when story changes
    useEffect(() => {
        if (index === currentIndex) {
            scale.setValue(0);
            setRemainingTime(duration);
        }
    }, [storyIndex, currentIndex, index, scale, duration, setRemainingTime]);
    useEffect(() => {
        var _a;
        if (isVideoStory.current)
            return;
        const progressBarWidth = (_a = Number.parseInt(JSON.stringify(scaleRef.current), 10)) !== null && _a !== void 0 ? _a : 0;
        setRemainingTime(duration - (progressBarWidth * duration) / width);
    }, [props === null || props === void 0 ? void 0 : props.pause, width, duration]);
    const barActiveColor = (_b = (_a = props === null || props === void 0 ? void 0 : props.barStyle) === null || _a === void 0 ? void 0 : _a.barActiveColor) !== null && _b !== void 0 ? _b : Colors.activeColor;
    const barInActiveColor = (_d = (_c = props === null || props === void 0 ? void 0 : props.barStyle) === null || _c === void 0 ? void 0 : _c.barInActiveColor) !== null && _d !== void 0 ? _d : Colors.inActiveColor;
    const barHeight = (_f = (_e = props === null || props === void 0 ? void 0 : props.barStyle) === null || _e === void 0 ? void 0 : _e.barHeight) !== null && _f !== void 0 ? _f : 2;
    const getDuration = useCallback(() => {
        if (props.pause) {
            scale.stopAnimation();
            return 0;
        }
        if (remainingTime === 0) {
            return duration * 1000;
        }
        return remainingTime * 1000;
    }, [remainingTime, scale, props === null || props === void 0 ? void 0 : props.pause, duration]);
    useEffect(() => {
        if (isVideoStory.current)
            return;
        switch (active) {
            case ProgressState.Default:
                return scale.setValue(0);
            case ProgressState.InProgress:
                if (props.isLoaded)
                    return Animated.timing(scale, {
                        toValue: width,
                        duration: getDuration(),
                        easing: Easing.linear,
                        useNativeDriver: false,
                    }).start(({ finished }) => {
                        if (finished)
                            (props === null || props === void 0 ? void 0 : props.next) && (props === null || props === void 0 ? void 0 : props.next());
                    });
                else {
                    return scale.setValue(0);
                }
            case ProgressState.Completed:
                return scale.setValue(width);
            case ProgressState.Paused:
                return scale.setValue(Number.parseInt(JSON.stringify(scaleRef.current), 10));
            default:
                return scale.setValue(0);
        }
    }, [active, isVideoStory, getDuration, props, scale, width]);
    useEffect(() => {
        if (!isVideoStory.current)
            return;
        switch (active) {
            case ProgressState.Default:
                return scale.setValue(0);
            case ProgressState.InProgress: {
                if (props === null || props === void 0 ? void 0 : props.isLoaded) {
                    const videoProgress = (width * videoDuration[currentIndex]) / duration;
                    if (videoDuration[currentIndex] >= duration) {
                        (props === null || props === void 0 ? void 0 : props.next) && (props === null || props === void 0 ? void 0 : props.next());
                        props === null || props === void 0 ? void 0 : props.setVideoDuration(Array(props === null || props === void 0 ? void 0 : props.length).fill(0));
                        return;
                    }
                    return scale.setValue(videoProgress);
                }
                else {
                    return scale.setValue(0);
                }
            }
            case ProgressState.Completed:
                return scale.setValue(width);
            case ProgressState.Paused:
                return scale.setValue(Number.parseInt(JSON.stringify(scaleRef.current), 10));
            default:
                return scale.setValue(0);
        }
    }, [
        index,
        currentIndex,
        active,
        videoDuration,
        duration,
        isVideoStory,
        props,
        scale,
        width,
    ]);
    return {
        barActiveColor,
        barInActiveColor,
        barHeight,
        scale,
        width,
        setWidth,
    };
};
export default useProgressBar;
//# sourceMappingURL=useProgressBar.js.map