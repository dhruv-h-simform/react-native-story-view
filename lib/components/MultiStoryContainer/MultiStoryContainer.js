import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState, } from 'react';
import { Modal } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { Metrics } from '../../theme';
import { Footer } from '../Footer';
import { Indicator, ProfileHeader, StoryContainer } from '../StoryView';
import { useMultiStoryContainer } from './hooks';
import styles from './styles';
import { TransitionMode, } from './types';
import { cubeTransition, defaultTransition, scaleTransition, } from './utils/StoryTransitions';
const MultiStoryListItem = forwardRef(({ item, index, scrollX, nextStory, previousStory, storyIndex, onComplete, viewedStories, isTransitionActive, ...props }, ref) => {
    var _a, _b, _c;
    const storyRef = useRef(null);
    const storyInitialIndex = (_a = viewedStories === null || viewedStories === void 0 ? void 0 : viewedStories[index]) === null || _a === void 0 ? void 0 : _a.findIndex((val) => !val);
    useImperativeHandle(ref, () => ({
        onScrollBegin: () => { var _a; return (_a = storyRef === null || storyRef === void 0 ? void 0 : storyRef.current) === null || _a === void 0 ? void 0 : _a.pause(true); },
        onScrollEnd: () => { var _a; return (_a = storyRef === null || storyRef === void 0 ? void 0 : storyRef.current) === null || _a === void 0 ? void 0 : _a.pause(false); },
        handleLongPress: (visibility) => { var _a; return (_a = storyRef === null || storyRef === void 0 ? void 0 : storyRef.current) === null || _a === void 0 ? void 0 : _a.handleLongPress(visibility); },
    }));
    const animationStyle = useAnimatedStyle(() => {
        switch (props.transitionMode) {
            case TransitionMode.Cube:
                return cubeTransition(index, scrollX);
            case TransitionMode.Scale:
                return scaleTransition(index, scrollX);
            default:
                return defaultTransition();
        }
    }, [index, scrollX.value]);
    return (React.createElement(Animated.View, { key: item.id, style: styles.itemContainer }, storyIndex === index || isTransitionActive ? (React.createElement(Animated.View, { style: animationStyle },
        React.createElement(StoryContainer, { visible: true, key: index + (item === null || item === void 0 ? void 0 : item.id), ref: storyRef, userStories: item, nextStory: nextStory, previousStory: previousStory, stories: item.stories, progressIndex: storyInitialIndex < 0 ? 0 : storyInitialIndex, maxVideoDuration: 15, renderHeaderComponent: () => {
                var _a;
                return (React.createElement(ProfileHeader, { userImage: { uri: (_a = item.profile) !== null && _a !== void 0 ? _a : '' }, userName: item.username, userMessage: item.title, onClosePress: () => {
                        onComplete === null || onComplete === void 0 ? void 0 : onComplete();
                    } }));
            }, renderFooterComponent: () => React.createElement(Footer, null), ...props, index: index, userStoryIndex: storyIndex }))) : ((_c = (_b = props === null || props === void 0 ? void 0 : props.renderIndicatorComponent) === null || _b === void 0 ? void 0 : _b.call(props)) !== null && _c !== void 0 ? _c : React.createElement(Indicator, null))));
});
const MultiStoryContainer = ({ stories, visible, onComplete, onUserStoryIndexChange, viewedStories = [], ...props }) => {
    const flatListRef = useRef(null);
    const itemsRef = useRef([]);
    const [isTransitionActive, setIsTransitionActive] = useState(false);
    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, stories.length);
    }, [itemsRef, stories]);
    const onScrollBeginDrag = () => { var _a; return (_a = itemsRef.current[storyIndex]) === null || _a === void 0 ? void 0 : _a.onScrollBegin(); };
    const onScrollEndDrag = () => { var _a; return (_a = itemsRef.current[storyIndex]) === null || _a === void 0 ? void 0 : _a.onScrollEnd(); };
    const handleLongPress = (visiblity) => {
        var _a;
        (_a = itemsRef.current[storyIndex]) === null || _a === void 0 ? void 0 : _a.handleLongPress(visiblity);
    };
    const { storyIndex, onViewRef, viewabilityConfig, gestureHandler, listStyle, rootStyle, onScroll, scrollX, } = useMultiStoryContainer(flatListRef, props, onScrollBeginDrag, onScrollEndDrag, handleLongPress, onComplete);
    useEffect(() => {
        onUserStoryIndexChange === null || onUserStoryIndexChange === void 0 ? void 0 : onUserStoryIndexChange(storyIndex);
    }, [onUserStoryIndexChange, storyIndex]);
    if (!visible)
        return null;
    const nextStory = () => {
        var _a;
        if (storyIndex + 1 === stories.length) {
            onComplete === null || onComplete === void 0 ? void 0 : onComplete();
            return;
        }
        if (storyIndex >= stories.length - 1)
            return;
        (_a = flatListRef.current) === null || _a === void 0 ? void 0 : _a.scrollToIndex({
            index: storyIndex + 1,
            animated: true,
        });
    };
    const previousStory = () => {
        var _a;
        if (storyIndex === 0)
            return;
        (_a = flatListRef.current) === null || _a === void 0 ? void 0 : _a.scrollToIndex({
            index: storyIndex - 1,
            animated: true,
        });
    };
    return (React.createElement(Modal, { visible: visible, transparent: true, onRequestClose: () => onComplete === null || onComplete === void 0 ? void 0 : onComplete() },
        React.createElement(GestureHandlerRootView, { style: rootStyle },
            React.createElement(PanGestureHandler, { activateAfterLongPress: 200, onGestureEvent: gestureHandler },
                React.createElement(Animated.FlatList, { horizontal: true, style: listStyle, pagingEnabled: true, initialNumToRender: 2, data: stories, ref: flatListRef, onScroll: onScroll, onScrollBeginDrag: onScrollBeginDrag, onScrollEndDrag: onScrollEndDrag, scrollEventThrottle: 16, initialScrollIndex: storyIndex, keyboardShouldPersistTaps: "handled", getItemLayout: (_, index) => ({
                        length: Metrics.screenWidth,
                        offset: Metrics.screenWidth * index,
                        index,
                    }), onLayout: () => setIsTransitionActive(true), onViewableItemsChanged: onViewRef.current, viewabilityConfig: viewabilityConfig.current, decelerationRate: Metrics.isIOS ? 0.99 : 0.92, keyExtractor: item => { var _a; return (item === null || item === void 0 ? void 0 : item.title) + ((_a = item === null || item === void 0 ? void 0 : item.id) === null || _a === void 0 ? void 0 : _a.toString()); }, contentContainerStyle: {
                        width: Metrics.screenWidth * stories.length,
                    }, extraData: storyIndex, renderItem: ({ item, index }) => (React.createElement(MultiStoryListItem, { ref: (elements) => (itemsRef.current[index] = elements), ...{
                            item,
                            index,
                            nextStory,
                            previousStory,
                            storyIndex,
                            onComplete,
                            viewedStories,
                            scrollX,
                            isTransitionActive,
                        }, ...props })) })))));
};
export default MultiStoryContainer;
//# sourceMappingURL=MultiStoryContainer.js.map