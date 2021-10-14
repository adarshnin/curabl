import React from "react";
import "./VideoIndex.css";
import VideoCall from "./VideoCall";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { userReducer } from "../store/reducer";

// export const store = createStore(userReducer);
// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <VideoCall />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
export const store = createStore(userReducer);

function VideoIndex() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <VideoCall />
      </Provider>
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default VideoIndex;
