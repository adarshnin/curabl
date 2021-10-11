import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyD9mNfZpg8w1KP06jG6XKiPrwXbSoOQkzQ", // Add API Key
  databaseURL: "https://curable-video-default-rtdb.asia-southeast1.firebasedatabase.app/" // Add databaseURL
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase;

var firepadRef = firebase.database().ref();

// To change @@@@@@@@@
// export const userName = prompt("What's your name?");
export const userName = "Adarsh";
// const urlparams = new URLSearchParams(window.location.search);
// const roomId = urlparams.get("id");
const roomId = "roomid";

// if (roomId) {
//   // if Room id already exists
//   firepadRef = firepadRef.child(roomId);
// } else {
//   // else create new room id
//   firepadRef = firepadRef.push();
//   window.history.replaceState(null, "Meet", "?id=" + firepadRef.key);
// }

// if Room id already exists
firepadRef = firepadRef.child(roomId);


export default firepadRef;
