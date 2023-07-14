import React, { forwardRef, useImperativeHandle, useRef, useState, } from 'react';
import { View, FlatList } from 'react-native';
import { MultiStoryContainer } from '../MultiStoryContainer';
import { StoryAvatar } from '../StoryAvatar';
const MultiStory = forwardRef(({ stories, transitionMode, avatarProps, ...props }, ref) => {
    const [isStoryViewVisible, setIsStoryViewShow] = useState(false);
    const [pressedIndex, setPressedIndex] = useState(-1);
    const openStories = (index) => {
        setIsStoryViewShow(true);
        setPressedIndex(index);
    };
    const { current: viewedStories } = useRef(Array(stories.length)
        .fill(stories)
        .map((row, index) => { var _a; return (_a = row === null || row === void 0 ? void 0 : row[index]) === null || _a === void 0 ? void 0 : _a.stories.map((item) => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.isSeen) !== null && _a !== void 0 ? _a : false; }); }));
    useImperativeHandle(ref, () => ({
        close: _onClose,
    }));
    const _onClose = () => {
        var _a;
        setIsStoryViewShow(false);
        (_a = props === null || props === void 0 ? void 0 : props.onComplete) === null || _a === void 0 ? void 0 : _a.call(props, viewedStories);
    };
    const onUserStoryIndexChange = (index) => {
        if (pressedIndex === index)
            return;
        setPressedIndex(index);
    };
    return (React.createElement(View, null,
        React.createElement(FlatList, { horizontal: true, data: stories, showsHorizontalScrollIndicator: false, keyExtractor: item => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.id) === null || _a === void 0 ? void 0 : _a.toString(); }, renderItem: ({ item, index }) => (React.createElement(StoryAvatar, { ...{
                    item,
                    index,
                    isStoryViewVisible,
                    pressedIndex,
                    openStories,
                    viewedStories,
                    ...avatarProps,
                } })), ...props }),
        isStoryViewVisible && (React.createElement(MultiStoryContainer, { visible: isStoryViewVisible, onComplete: _onClose, viewedStories: [...viewedStories], onChangePosition: (progressIndex, storyIndex) => {
                var _a;
                viewedStories[storyIndex][progressIndex] = true;
                (_a = props === null || props === void 0 ? void 0 : props.onChangePosition) === null || _a === void 0 ? void 0 : _a.call(props, progressIndex, storyIndex);
            }, onUserStoryIndexChange: onUserStoryIndexChange, transitionMode: transitionMode, ...props === null || props === void 0 ? void 0 : props.storyContainerProps, stories: stories, userStoryIndex: pressedIndex }))));
});
export default MultiStory;
//# sourceMappingURL=MultiStory.js.map