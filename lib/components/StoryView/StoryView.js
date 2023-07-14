import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, useWindowDimensions, View } from 'react-native';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache-control';
import { Colors, Metrics } from '../../theme';
import ProgressiveImage from './ProgressiveImage';
import styles from './styles';
import { StroyTypes } from './types';
const BUFFER_TIME = 1000 * 60;
const StoryView = (props) => {
    var _a, _b, _c, _d;
    const [loading, setLoading] = useState(true);
    const [buffering, setBuffering] = useState(true);
    const source = (_a = props === null || props === void 0 ? void 0 : props.stories) === null || _a === void 0 ? void 0 : _a[props === null || props === void 0 ? void 0 : props.progressIndex];
    const videoRef = useRef(null);
    const videoData = useRef();
    const isCurrentIndex = (props === null || props === void 0 ? void 0 : props.index) === (props === null || props === void 0 ? void 0 : props.storyIndex);
    useEffect(() => {
        var _a;
        if ((props === null || props === void 0 ? void 0 : props.index) === (props === null || props === void 0 ? void 0 : props.storyIndex)) {
            (_a = videoRef === null || videoRef === void 0 ? void 0 : videoRef.current) === null || _a === void 0 ? void 0 : _a.seek(0);
        }
    }, [props === null || props === void 0 ? void 0 : props.storyIndex, props === null || props === void 0 ? void 0 : props.index]);
    const onLoadStart = () => {
        setLoading(true);
    };
    const loadVideo = () => {
        var _a;
        if (isCurrentIndex) {
            if (videoData.current === undefined)
                return;
            setLoading(false);
            setBuffering(false);
            (_a = props === null || props === void 0 ? void 0 : props.onVideoLoaded) === null || _a === void 0 ? void 0 : _a.call(props, videoData.current);
        }
    };
    const onBuffer = (data) => {
        setBuffering(data.isBuffering);
    };
    const { height, width } = useWindowDimensions();
    return (React.createElement(View, { style: [styles.divStory, { height, width }], ref: props === null || props === void 0 ? void 0 : props.viewRef }, (source === null || source === void 0 ? void 0 : source.type) === StroyTypes.Image ? (React.createElement(ProgressiveImage, { viewStyle: (_b = props === null || props === void 0 ? void 0 : props.imageStyle) !== null && _b !== void 0 ? _b : styles.imgStyle, imgSource: { uri: (_c = source.url) !== null && _c !== void 0 ? _c : '' }, thumbnailSource: { uri: (_d = source.url) !== null && _d !== void 0 ? _d : '' }, onImageLoaded: props.onImageLoaded })) : (isCurrentIndex && (React.createElement(React.Fragment, null,
        React.createElement(Video, { ref: videoRef, resizeMode: "contain", paused: props.pause || loading, source: {
                uri: convertToProxyURL({
                    url: source === null || source === void 0 ? void 0 : source.url,
                }),
            }, onEnd: props === null || props === void 0 ? void 0 : props.onVideoEnd, onError: (_error) => {
                setLoading(false);
            }, onProgress: data => {
                var _a;
                if (isCurrentIndex) {
                    (_a = props === null || props === void 0 ? void 0 : props.onVideoProgress) === null || _a === void 0 ? void 0 : _a.call(props, data);
                }
            }, bufferConfig: {
                minBufferMs: BUFFER_TIME,
                bufferForPlaybackMs: BUFFER_TIME,
                bufferForPlaybackAfterRebufferMs: BUFFER_TIME,
            }, onBuffer: onBuffer, onLoadStart: onLoadStart, onLoad: (item) => {
                videoData.current = item;
                !Metrics.isIOS && loadVideo();
            }, onReadyForDisplay: loadVideo, style: styles.contentVideoView, ...props === null || props === void 0 ? void 0 : props.videoProps }),
        (loading || buffering) && (props === null || props === void 0 ? void 0 : props.showSourceIndicator) && (React.createElement(ActivityIndicator, { animating: true, pointerEvents: "none", color: Colors.loaderColor, size: "small", style: styles.loaderView, ...props === null || props === void 0 ? void 0 : props.sourceIndicatorProps })))))));
};
export default StoryView;
//# sourceMappingURL=StoryView.js.map