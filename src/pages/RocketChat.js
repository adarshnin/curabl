import '../assets/styles/rocketchat-iframe.css';
import { urlTranslator } from '../libs/utils';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { authenticationService } from '../services/authservice';

const rocketChatServerURL = process.env.REACT_APP_ROCKETCHAT_SERVER_URL;
const serverURL = process.env.REACT_APP_SERVER_URL;

function RocketChat() {
  const [url, setUrl] = useState(urlTranslator(process.env.REACT_APP_ROCKETCHAT_SERVER_URL + process.env.REACT_APP_IFRAME_URL));
  const iframeRef = useRef(null);
  // const [userId, setUserId] = useState(authenticationService.currentUserValue.rocketChat.userId);
  // const [authToken, setAuthToken] = useState(authenticationService.currentUserValue.rocketChat.loginToken);

  // fetchAdminCredentials();

  const redirectToGeneral = () => {
    iframeRef.current.contentWindow.postMessage({
      externalCommand: "go",
      path: process.env.REACT_APP_IFRAME_URL
    }, process.env.REACT_APP_ROCKETCHAT_SERVER_URL);
  }


  const setItemsInLocalStorage = (userId, token) => {
    localStorage.setItem('rocketChatUserId', userId);
    localStorage.setItem('rocketChatAuthToken', token);
  }
  const setLoginWithToken = (authToken) => {
    console.log(authToken);
    iframeRef?.current?.contentWindow.postMessage({
      externalCommand: 'login-with-token',
      token: authToken,
    }, '*');
  }
  const callRocketChatServerLogin = (res) => {
    axios.post(`http://curabl.me:9000/rocketchat/login`).then(() => {
      console.log(res.data.data.authToken);
      setLoginWithToken(res.data.data.authToken);
    }).catch(err => console.error(err));
    // window.parent.postMessage({
    //   event: 'login-with-token',
    //   token: res.data.data.authToken
    // }, 'https://chat.curabl.me')
  };
  const loginUser = (num) => {
    axios.post(`https://chat.curabl.me/api/v1/login`, {
      username: "curabl",
      password: "ubuntu123",
    }).then((res) => {
      setItemsInLocalStorage(res.data.data.userId, res.data.data.authToken)
      setLoginWithToken(res.data.data.authToken);
      // callRocketChatServerLogin(res);
    })
  }
  // const loginWithToken = () => {
  //   axios.post(`https://chat.curabl.me/api/v1/login`, {
  //     username: "curabl",
  //     password: "ubuntu123",
  //   }).then((res) => {
  //     console.log("Hello")
  //     console.log('rocketChatUserId', res.data.data.userId);
  //     console.log('rocketChatAuthToken', res.data.data.authToken);
  //     localStorage.setItem('rocketChatUserId', res.data.data.userId);
  //     localStorage.setItem('rocketChatAuthToken', res.data.data.authToken);
  //     // axios.post(`http://localhost:9000/rocketchat/login`).then(() => {
  //     iframeRef?.current?.contentWindow.postMessage({
  //       externalCommand: 'login-with-token',
  //       token: res.data.data.authToken,
  //     }, '*');
  // }).catch(err => console.error(err));
  // })
  // setAuthToken(res.data.loginToken);
  // setUserId(res.data.userId)

  // localStorage.setItem("Meteor.loginToken", res.data.loginToken);
  // console.log("RocketChat Resposne", response);
  // console.log("RocketChat Token", res.data.loginToken);
  // }

  const logoutUsingToken = async () => {
    const response = iframeRef?.current?.contentWindow.postMessage({
      externalCommand: 'logout',
    }, process.env.REACT_APP_ROCKETCHAT_SERVER_URL);
    console.log("result", response);
    // let res;
    // try {
    //   res = await axios.post(`${rocketChatServerURL}/api/v1/logout`, {}, {
    //     headers: {
    //       "X-User-Id": userId,
    //       "X-Auth-Token": authToken
    //     }
    //   });
    //   console.log("Logout")
    // } catch (err) {
    //   console.error(err);
    // }
  }

  const tryLogin = () => {
    iframeRef.current.contentWindow.postMessage({
      event: 'try-iframe-login'
    });
  }

  const login = async () => {
    let res;
    try {
      res = await axios.post(`https://chat.curabl.me/api/v1/login`, {
        username: "curabl",
        password: "ubuntu123",
      })
    } catch (err) {
      console.error(err);
    }
    localStorage.setItem('rocketChatUserId', res.data.data.userId);
    localStorage.setItem('rocketChatAuthToken', res.data.data.authToken);
  }

  useEffect(() => {
    setLoginWithToken("4mEwZ-4oUkkLLXUWA0uc0nV2PLRTCwBC6a90MPqJM2r");
    // loginUser(false);
    // tryLogin();
    // loginWithToken();
    // return () => logoutUsingToken()
    // login();
  }, []);
  return (
    <>
      <div className="rc">
        <iframe className="rc-iframe" ref={iframeRef} src={url} title="chat-frame">
        </iframe>
      </div>
      <button className="rc-button" onClick={redirectToGeneral}>
        GO TO GENERAL
      </button>
    </>
  );
}

export default RocketChat;
