import '../assets/styles/rocketchat-iframe.css';
import { fetchAdminCredentials } from '../libs/rocketchat';
import { useEffect, useRef, useState } from 'react';


function RocketChat() {
  const [url, setUrl] = useState('');
  const iframeRef = useRef(null);
  fetchAdminCredentials();
  const redirectToGeneral = () => {
    iframeRef.current.contentWindow.postMessage({
      externalCommand: "go",
      path: process.env.REACT_APP_IFRAME_URL
    }, process.env.REACT_APP_ROCKETCHAT_URL);
  }

  useEffect(() => {
    setUrl(process.env.REACT_APP_ROCKETCHAT_URL + process.env.REACT_APP_IFRAME_URL);
  }, [url]);

  return (
    <>
      <div className="rc">
        <iframe className="rc-iframe" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          ref={iframeRef} src={url} title="chat-frame">
        </iframe>
      </div>
      <button className="rc-button" onClick={redirectToGeneral}>
        GO TO GENERAL
      </button>
    </>
  );
}

export default RocketChat;
