import { useEffect, useRef, useState } from 'react';
import { useAnimatedScrollHandler, useSharedValue, } from 'react-native-reanimated';
import { useKeyboardListener } from '../../../hooks';
import useDraggableGesture from './useDraggableGesture';
const useMultiStoryContainer = (flatListRef, { userStoryIndex, backgroundColor }, onScrollBeginDrag, onScrollEndDrag, handleLongPress, onComplete) => {
    const [storyIndex, setStoryIndex] = useState(userStoryIndex !== null && userStoryIndex !== void 0 ? userStoryIndex : 0);
    const scrollX = useSharedValue(0);
    const previousIndex = useRef(0);
    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 70,
    });
    const isKeyboardVisible = useKeyboardListener();
    const onScroll = useAnimatedScrollHandler(event => {
        scrollX.value = event.contentOffset.x;
    });
    useEffect(() => {
        var _a;
        (_a = flatListRef === null || flatListRef === void 0 ? void 0 : flatListRef.current) === null || _a === void 0 ? void 0 : _a.setNativeProps({ scrollEnabled: !isKeyboardVisible });
    }, [flatListRef, isKeyboardVisible]);
    const onViewRef = useRef(({ viewableItems }) => {
        var _a;
        const index = (_a = viewableItems === null || viewableItems === void 0 ? void 0 : viewableItems[0]) === null || _a === void 0 ? void 0 : _a.index;
        if (index == null)
            return;
        /* viewableItems returns array of current/next viewable item
               During story transition current/next or previous/current both visible on screen so array contains both items.
               To consider only next/previous item, checking length is only 1 and it is not previous story.
            */
        if (viewableItems.length === 1 && index !== previousIndex.current) {
            setStoryIndex(index);
            previousIndex.current = index;
        }
    });
    const { listStyle, rootStyle, gestureHandler } = useDraggableGesture({
        backgroundColor,
        onComplete,
        onScrollBeginDrag,
        onScrollEndDrag,
        handleLongPress,
        isKeyboardVisible,
    });
    return {
        scrollX,
        onViewRef,
        viewabilityConfig,
        listStyle,
        rootStyle,
        storyIndex,
        gestureHandler,
        setStoryIndex,
        onScroll,
    };
};
export default useMultiStoryContainer;
//# sourceMappingURL=useMultiStoryContainer.js.map