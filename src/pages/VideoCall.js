import React from "react";
// import Toolbar from "../components/layout/Toolbar";
// import TabToolbar from "../components/layout/Tabs";
const VideoConference = () => {
    const jitsiContainerId = "jitsi-container-id";
    const [jitsi, setJitsi] = React.useState({});

    const loadJitsiScript = () => {
        let resolveLoadJitsiScriptPromise = null;

        const loadJitsiScriptPromise = new Promise(resolve => {
            resolveLoadJitsiScriptPromise = resolve;
        });

        const script = document.createElement("script");
        script.src = "https://video.curabl.me/external_api.js";
        script.async = true;
        script.onload = () => resolveLoadJitsiScriptPromise(true);
        document.body.appendChild(script);

        return loadJitsiScriptPromise;
    };

    const initialiseJitsi = async () => {
        if (!window.JitsiMeetExternalAPI) {
            await loadJitsiScript();
        }

        const _jitsi = new window.JitsiMeetExternalAPI("video.curabl.me/curabl-room#config.prejoinPageEnabled=true", {
            parentNode: document.getElementById(jitsiContainerId)
        });

        setJitsi(_jitsi);
    };

    React.useEffect(() => {
        initialiseJitsi();

        return () => jitsi?.dispose?.();
    }, []);

    //  return <div id={jitsiContainerId} style={{ height: 720, width: "100%" }} />
    return (
        <>
            <div id={jitsiContainerId} style={{ height: 720, width: "100%", float: "right", position: "relative" }} />

            {/* <TabToolbar>
            </TabToolbar> */}
            {/* <Toolbar>
            </Toolbar> */}
        </>

    )






};

export default VideoConference;
