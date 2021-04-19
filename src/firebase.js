// import firebase from 'firebase/app'
import firebase from 'firebase/app'
import 'firebase/firestore'
const firebaseConfig= firebase.initializeApp({
 
    apiKey: "AIzaSyBWUc-AGtni0-XN1mKQYzy_XmMxMUW3msM",
    authDomain: "todoist-tut-b91d8.firebaseapp.com",
    projectId: "todoist-tut-b91d8",
    storageBucket: "todoist-tut-b91d8.appspot.com",
    messagingSenderId: "444053101640",
    appId: "1:444053101640:web:9b0b2e7a0695b437e6cc7d"



})


export {firebaseConfig as firebase}