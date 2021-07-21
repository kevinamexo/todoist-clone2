// import firebase from 'firebase/app'
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDDsBq32tBDJifCfWxDpKUg1LoUaj4W4Nw",
  authDomain: "todolist-clone-913e3.firebaseapp.com",
  projectId: "todolist-clone-913e3",
  storageBucket: "todolist-clone-913e3.appspot.com",
  messagingSenderId: "228352175283",
  appId: "1:228352175283:web:94f076d04f8a140c1554c6",
});
export const auth = firebaseConfig.auth();
export default firebaseConfig;

export { firebaseConfig as firebase };
