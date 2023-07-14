import React, { forwardRef, useEffect, useImperativeHandle, useRef, } from 'react';
import { KeyboardAvoidingView, SafeAreaView, TouchableOpacity, View, } from 'react-native';
import { Metrics } from '../../theme';
import { useStoryContainer } from './hooks';
import ProgressView from './ProgressView';
import StoryView from './StoryView';
import styles from './styles';
import { ClickPosition } from './types';
const StoryContainer = forwardRef(({ renderHeaderComponent, renderFooterComponent, renderCustomView, userStories, enableProgress = true, headerViewProps, customViewProps, footerViewProps, progressViewProps, storyContainerViewProps, ...props }, ref) => {
    var _a;
    const viewedStories = useRef(Array((_a = props === null || props === void 0 ? void 0 : props.stories) === null || _a === void 0 ? void 0 : _a.length)
        .fill(props === null || props === void 0 ? void 0 : props.stories)
        .map((item, index) => { var _a, _b; return (_b = (_a = item === null || item === void 0 ? void 0 : item[index]) === null || _a === void 0 ? void 0 : _a.isSeen) !== null && _b !== void 0 ? _b : false; }));
    const { progressIndex, isPause, setPause, isLoaded, duration, opacity, onImageLoaded, onVideoLoaded, changeStory, setLoaded, setDuration, videoDuration, onVideoProgress, onVideoEnd, onArrowClick, onStoryPressHold, isKeyboardVisible, setVideoDuration, onStoryPressRelease, setVisibleElements, rootStyle, containerStyle, } = useStoryContainer(props, viewedStories);
    const viewRef = useRef(null);
    useImperativeHandle(ref, () => ({
        pause: (pause) => {
            if ((props === null || props === void 0 ? void 0 : props.index) === (props === null || props === void 0 ? void 0 : props.userStoryIndex)) {
                setPause(pause);
            }
        },
        handleLongPress: (visibility) => {
            if ((props === null || props === void 0 ? void 0 : props.index) === (props === null || props === void 0 ? void 0 : props.userStoryIndex)) {
                setVisibleElements(!visibility);
                setPause(visibility);
            }
        },
        viewedStories: viewedStories.current,
    }));
    useEffect(() => {
        var _a, _b, _c;
        setLoaded(false);
        setDuration((_c = (_b = (_a = props.stories) === null || _a === void 0 ? void 0 : _a[progressIndex]) === null || _b === void 0 ? void 0 : _b.duration) !== null && _c !== void 0 ? _c : Metrics.defaultDuration);
    }, [progressIndex, props.stories, setDuration, setLoaded]);
    const storyViewContent = () => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return (React.createElement(React.Fragment, null,
            React.createElement(View, { onLayout: ({ nativeEvent }) => {
                    var _a;
                    if (isKeyboardVisible)
                        return;
                    const { height } = nativeEvent.layout;
                    (_a = viewRef === null || viewRef === void 0 ? void 0 : viewRef.current) === null || _a === void 0 ? void 0 : _a.setNativeProps({ height });
                }, style: (_a = props === null || props === void 0 ? void 0 : props.containerStyle) !== null && _a !== void 0 ? _a : styles.parentView, ...storyContainerViewProps },
                React.createElement(TouchableOpacity, { activeOpacity: 1, delayLongPress: 200, onPress: (e) => changeStory(e.nativeEvent), onLongPress: onStoryPressHold, onPressOut: onStoryPressRelease },
                    React.createElement(StoryView, { viewRef: viewRef, duration: duration, onVideoLoaded: onVideoLoaded, onImageLoaded: onImageLoaded, progressIndex: progressIndex, videoDuration: videoDuration, onVideoEnd: onVideoEnd, onVideoProgress: onVideoProgress, pause: isPause, index: (_b = props === null || props === void 0 ? void 0 : props.index) !== null && _b !== void 0 ? _b : 0, storyIndex: (_c = props === null || props === void 0 ? void 0 : props.userStoryIndex) !== null && _c !== void 0 ? _c : 0, stories: props.stories, imageStyle: props.imageStyle, videoProps: props === null || props === void 0 ? void 0 : props.videoProps, sourceIndicatorProps: props === null || props === void 0 ? void 0 : props.sourceIndicatorProps, showSourceIndicator: (_d = props === null || props === void 0 ? void 0 : props.showSourceIndicator) !== null && _d !== void 0 ? _d : true })),
                enableProgress && (React.createElement(View, { style: [styles.progressView, { opacity }], ...progressViewProps },
                    React.createElement(ProgressView, { next: () => onArrowClick(ClickPosition.Right), isLoaded: isLoaded, duration: duration, storyIndex: (_e = props === null || props === void 0 ? void 0 : props.userStoryIndex) !== null && _e !== void 0 ? _e : 0, currentIndex: progressIndex, setVideoDuration: setVideoDuration, index: (_f = props === null || props === void 0 ? void 0 : props.index) !== null && _f !== void 0 ? _f : 0, videoDuration: videoDuration !== null && videoDuration !== void 0 ? videoDuration : 0, pause: enableProgress && isPause, stories: props === null || props === void 0 ? void 0 : props.stories, barStyle: props === null || props === void 0 ? void 0 : props.barStyle, currentStory: props === null || props === void 0 ? void 0 : props.stories[progressIndex], length: (_g = props === null || props === void 0 ? void 0 : props.stories) === null || _g === void 0 ? void 0 : _g.map((_, i) => i), progress: { id: progressIndex } }))),
                renderHeaderComponent && (React.createElement(View, { style: [styles.topView, (_h = props === null || props === void 0 ? void 0 : props.headerStyle) !== null && _h !== void 0 ? _h : {}, { opacity }], ...headerViewProps },
                    React.createElement(React.Fragment, null, renderHeaderComponent === null || renderHeaderComponent === void 0 ? void 0 : renderHeaderComponent({
                        userStories,
                        story: props === null || props === void 0 ? void 0 : props.stories,
                        progressIndex,
                        userStoryIndex: props === null || props === void 0 ? void 0 : props.userStoryIndex,
                    })))),
                renderCustomView && (React.createElement(View, { style: [
                        styles.customView,
                        (_j = props === null || props === void 0 ? void 0 : props.customViewStyle) !== null && _j !== void 0 ? _j : {},
                        { opacity },
                    ], ...customViewProps },
                    React.createElement(React.Fragment, null, renderCustomView === null || renderCustomView === void 0 ? void 0 : renderCustomView({
                        userStories,
                        story: props === null || props === void 0 ? void 0 : props.stories,
                        progressIndex,
                        userStoryIndex: props === null || props === void 0 ? void 0 : props.userStoryIndex,
                    }))))),
            renderFooterComponent && (React.createElement(View, { style: [styles.bottomView, (_k = props === null || props === void 0 ? void 0 : props.footerStyle) !== null && _k !== void 0 ? _k : {}, { opacity }], ...footerViewProps },
                React.createElement(React.Fragment, null, renderFooterComponent === null || renderFooterComponent === void 0 ? void 0 : renderFooterComponent({
                    userStories,
                    story: props === null || props === void 0 ? void 0 : props.stories,
                    progressIndex,
                    userStoryIndex: props === null || props === void 0 ? void 0 : props.userStoryIndex,
                }))))));
    };
    return (React.createElement(SafeAreaView, { style: rootStyle },
        React.createElement(KeyboardAvoidingView, { style: containerStyle, keyboardVerticalOffset: Metrics.keyboardVerticalOffset, behavior: 'padding' }, props.visible && storyViewContent())));
});
export default StoryContainer;
//# sourceMappingURL=StoryContainer.js.map