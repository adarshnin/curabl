import React from "react";
import { useLocation } from 'react-router-dom'

// import Toolbar from "../components/layout/Toolbar";
// import TabToolbar from "../components/layout/Tabs";
function VideoConference() {
    const jitsiContainerId = "jitsi-container-id";
    const [jitsi, setJitsi] = React.useState({});
    const location = useLocation()
    const { from, meetingurl } = location.state;

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

        let link =  meetingurl + "#config.prejoinPageEnabled=true";
        const _jitsi = new window.JitsiMeetExternalAPI(link, {
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
