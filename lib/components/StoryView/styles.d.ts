declare const styles: {
    container: {
        flex: number;
    };
    scrollContainer: {
        alignItems: "center";
        justifyContent: "center";
    };
    label: {
        flex: number;
        alignSelf: "center";
    };
    divStory: {
        alignSelf: "center";
        height: string;
        width: number;
        paddingBottom: number;
    };
    imgStyle: {
        width: number;
        height: string;
        alignSelf: "center";
        resizeMode: "contain";
    };
    imageOverlay: {
        position: "absolute";
        left: number;
        right: number;
        bottom: number;
        top: number;
        resizeMode: "contain";
    };
    progressiveImageContainer: {
        backgroundColor: string;
    };
    parentView: {
        flex: number;
    };
    customView: {
        position: "absolute";
        flexDirection: "column";
        width: number;
        zIndex: number;
    };
    topView: {
        position: "absolute";
        flexDirection: "column";
        width: number;
        zIndex: number;
    };
    bottomView: {
        justifyContent: "flex-end";
    };
    mainView: {
        position: "absolute";
        flexDirection: "column";
        width: string;
        height: string;
    };
    progressView: {
        flex: number;
        width: string;
        position: "absolute";
        flexDirection: "row";
    };
    contentVideoView: {
        flex: number;
        borderRadius: number;
        overflow: "hidden";
        backgroundColor: string;
    };
    progressBarArray: {
        flexDirection: "row";
        position: "absolute";
        top: number;
        width: string;
        height: number;
        justifyContent: "space-between";
        alignItems: "center";
    };
    progressBarContainer: {
        flex: number;
        margin: number;
        borderRadius: number;
    };
    currentBarContainer: {
        position: "absolute";
        top: number;
        margin: number;
    };
    userContainer: {
        flex: number;
        justifyContent: "center";
    };
    barUsername: {
        flexDirection: "row";
        alignItems: "center";
    };
    image: {
        width: number;
        height: number;
        borderRadius: number;
        marginLeft: number;
    };
    verifyIcon: {
        width: number;
        height: number;
        marginLeft: number;
    };
    closeIcon: {
        width: number;
        height: number;
        marginRight: number;
        tintColor: string;
    };
    userView: {
        flexDirection: "row";
        position: "absolute";
        top: number;
        width: string;
        alignItems: "center";
    };
    name: {
        fontSize: number;
        fontWeight: "500";
        marginLeft: number;
        color: string;
    };
    message: {
        fontSize: number;
        fontWeight: "400";
        marginTop: number;
        marginLeft: number;
        color: string;
    };
    loader: {
        alignItems: "center";
        justifyContent: "center";
    };
    loaderView: {
        flex: number;
        position: "absolute";
        top: string;
        left: string;
    };
    loaderStyle: {
        flex: number;
        alignSelf: "center";
    };
};
export default styles;
