import { useCallback, useEffect, useRef, useState, } from 'react';
import { AppState, Keyboard, StyleSheet, } from 'react-native';
import { useKeyboardListener } from '../../../hooks';
import { Colors, Metrics } from '../../../theme';
import styles from '../styles';
import { ClickPosition, StoryMode, StroyTypes, } from '../types';
const useStoryContainer = ({ onChangePosition, ...props }, viewedStories) => {
    var _a, _b, _c, _d, _e;
    const [progressIndex, setProgressIndex] = useState((_a = props === null || props === void 0 ? void 0 : props.progressIndex) !== null && _a !== void 0 ? _a : 0);
    const [isLoaded, setLoaded] = useState(false);
    const [duration, setDuration] = useState(0);
    const [isPause, setPause] = useState(true);
    const [visibleElements, setVisibleElements] = useState(true);
    const appState = useRef(AppState.currentState);
    const storyMode = (props === null || props === void 0 ? void 0 : props.userStoryIndex) !== undefined
        ? StoryMode.MultiStory
        : StoryMode.SingleStory;
    const storyCount = (_c = (_b = props === null || props === void 0 ? void 0 : props.stories) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0;
    const [videoDuration, setVideoDuration] = useState(Array(storyCount).fill(0));
    const isKeyboardVisible = useKeyboardListener();
    useEffect(() => {
        if ((props === null || props === void 0 ? void 0 : props.index) === (props === null || props === void 0 ? void 0 : props.userStoryIndex)) {
            setPause(isKeyboardVisible);
        }
    }, [isKeyboardVisible, props === null || props === void 0 ? void 0 : props.index, props === null || props === void 0 ? void 0 : props.userStoryIndex]);
    // progress index change callback
    useEffect(() => {
        if ((props === null || props === void 0 ? void 0 : props.index) === (props === null || props === void 0 ? void 0 : props.userStoryIndex)) {
            onChangePosition === null || onChangePosition === void 0 ? void 0 : onChangePosition(progressIndex, props === null || props === void 0 ? void 0 : props.userStoryIndex);
            if (storyMode === StoryMode.SingleStory) {
                viewedStories.current[progressIndex] = true;
            }
        }
    }, [
        storyMode,
        viewedStories,
        props === null || props === void 0 ? void 0 : props.index,
        props === null || props === void 0 ? void 0 : props.userStoryIndex,
        progressIndex,
        onChangePosition,
    ]);
    const onImageLoaded = () => {
        setLoaded(true);
    };
    useEffect(() => {
        const isStoryNotFocused = (props === null || props === void 0 ? void 0 : props.index) !== (props === null || props === void 0 ? void 0 : props.userStoryIndex);
        setPause(isStoryNotFocused);
    }, [props === null || props === void 0 ? void 0 : props.userStoryIndex, props === null || props === void 0 ? void 0 : props.index]);
    const handleAppStateChange = (nextAppState) => {
        appState.current = nextAppState;
        const isBackgroundState = appState.current.match(/inactive|background/) &&
            nextAppState === 'active';
        if ((props === null || props === void 0 ? void 0 : props.index) !== (props === null || props === void 0 ? void 0 : props.userStoryIndex))
            return;
        setPause(isBackgroundState === null ? false : !isBackgroundState);
    };
    const appStateChange = useCallback(handleAppStateChange, [
        props === null || props === void 0 ? void 0 : props.index,
        props === null || props === void 0 ? void 0 : props.userStoryIndex,
    ]);
    useEffect(() => {
        const subscription = AppState.addEventListener('change', appStateChange);
        return () => subscription.remove();
    }, [appStateChange]);
    const setEmptyDurations = useCallback(() => {
        setVideoDuration(Array(storyCount).fill(0));
    }, [storyCount]);
    /* force reset video durations on user story change */
    useEffect(() => {
        var _a;
        if (((_a = props === null || props === void 0 ? void 0 : props.stories[progressIndex]) === null || _a === void 0 ? void 0 : _a.type) === StroyTypes.Video) {
            if ((props === null || props === void 0 ? void 0 : props.index) === (props === null || props === void 0 ? void 0 : props.userStoryIndex)) {
                setEmptyDurations();
            }
        }
    }, [
        setEmptyDurations,
        props === null || props === void 0 ? void 0 : props.index,
        progressIndex,
        props === null || props === void 0 ? void 0 : props.stories,
        props === null || props === void 0 ? void 0 : props.userStoryIndex,
        storyCount,
    ]);
    const onVideoLoaded = (length) => {
        var _a;
        setPause(false);
        setDuration((_a = props === null || props === void 0 ? void 0 : props.maxVideoDuration) !== null && _a !== void 0 ? _a : length === null || length === void 0 ? void 0 : length.duration);
    };
    const onVideoEnd = () => {
        if ((props === null || props === void 0 ? void 0 : props.index) === (props === null || props === void 0 ? void 0 : props.userStoryIndex)) {
            const videoDurations = [...videoDuration];
            videoDurations[progressIndex] = duration + 1;
            setVideoDuration([...videoDurations]);
            return;
        }
    };
    const onVideoProgress = (progressData) => {
        var _a;
        const videoDurations = [...videoDuration];
        videoDurations[progressIndex] = (_a = progressData === null || progressData === void 0 ? void 0 : progressData.currentTime) !== null && _a !== void 0 ? _a : 0;
        setVideoDuration([...videoDurations]);
        !isLoaded && setLoaded(true);
    };
    const changeStory = (evt) => {
        if (isKeyboardVisible) {
            Keyboard.dismiss();
            return;
        }
        if (evt.locationX > Metrics.screenWidth / 2) {
            onArrowClick(ClickPosition.Right);
        }
        else {
            onArrowClick(ClickPosition.Left);
        }
    };
    const onArrowClick = (type) => {
        var _a;
        if ((props === null || props === void 0 ? void 0 : props.userStoryIndex) !== (props === null || props === void 0 ? void 0 : props.index))
            return;
        switch (type) {
            case ClickPosition.Left:
                onChange(progressIndex - 1);
                break;
            case ClickPosition.Right:
                onChange(progressIndex < ((_a = props === null || props === void 0 ? void 0 : props.stories) === null || _a === void 0 ? void 0 : _a.length)
                    ? progressIndex + 1
                    : progressIndex);
                break;
        }
    };
    const onChange = (position) => {
        var _a, _b, _c, _d;
        if (isPause)
            return;
        if (position >= ((_a = props === null || props === void 0 ? void 0 : props.stories) === null || _a === void 0 ? void 0 : _a.length) &&
            (props === null || props === void 0 ? void 0 : props.userStoryIndex) !== undefined) {
            (_b = props === null || props === void 0 ? void 0 : props.nextStory) === null || _b === void 0 ? void 0 : _b.call(props);
        }
        else if (position < 0) {
            (_c = props === null || props === void 0 ? void 0 : props.previousStory) === null || _c === void 0 ? void 0 : _c.call(props);
        }
        else if (position < (props === null || props === void 0 ? void 0 : props.stories.length)) {
            setProgressIndex(position);
        }
        else {
            (_d = props === null || props === void 0 ? void 0 : props.onComplete) === null || _d === void 0 ? void 0 : _d.call(props);
        }
    };
    const onStoryPressHold = () => {
        if (storyMode === StoryMode.MultiStory)
            return;
        setVisibleElements(false);
        setPause(true);
    };
    const onStoryPressRelease = () => {
        if (storyMode === StoryMode.MultiStory)
            return;
        if (isPause && !visibleElements) {
            setVisibleElements(true);
            setPause(false);
        }
    };
    const rootStyle = StyleSheet.flatten([
        styles.container,
        {
            backgroundColor: (_d = props === null || props === void 0 ? void 0 : props.backgroundColor) !== null && _d !== void 0 ? _d : Colors.black,
        },
        props === null || props === void 0 ? void 0 : props.style,
    ]);
    const containerStyle = StyleSheet.flatten([
        styles.container,
        {
            backgroundColor: (_e = props === null || props === void 0 ? void 0 : props.backgroundColor) !== null && _e !== void 0 ? _e : Colors.black,
        },
    ]);
    return {
        isPause,
        progressIndex,
        isLoaded,
        duration,
        setVisibleElements,
        videoDuration,
        setPause,
        setLoaded,
        setDuration,
        onImageLoaded,
        onVideoLoaded,
        onVideoProgress,
        onVideoEnd,
        changeStory,
        onArrowClick,
        onStoryPressHold,
        setVideoDuration,
        onStoryPressRelease,
        isKeyboardVisible,
        opacity: visibleElements ? 1 : 0,
        rootStyle,
        containerStyle,
    };
};
export default useStoryContainer;
//# sourceMappingURL=useStoryContainer.js.map