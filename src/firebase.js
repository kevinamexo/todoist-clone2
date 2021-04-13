import firebase from 'firebase/app'
import 'firebase/firestore'
// import 'firebase/app'


const firebaseConfig= firebase.initializeApp({

    apiKey: "AIzaSyBA7whiu4s-gFLq4CzeHfBvUOcc7ZMhOW0",
    authDomain: "react-todoist-3ee3d.firebaseapp.com",
    projectId: "react-todoist-3ee3d",
    storageBucket: "react-todoist-3ee3d.appspot.com",
    messagingSenderId: "194882662976",
    appId: "1:194882662976:web:75e6eaad4ebddfaf4a25a5"
    
     

})


export {firebaseConfig as firebase}