// import firebase from 'firebase/app'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig= firebase.initializeApp({
    apiKey: "AIzaSyDFlcb9YA3aL7H9A2UfqfXUnLKtPsT0JUk",
    authDomain: "react-auth-5953c.firebaseapp.com",
    projectId: "react-auth-5953c",
    storageBucket: "react-auth-5953c.appspot.com",
    messagingSenderId: "838237792091",
    appId: "1:838237792091:web:9c563e05b14da4cf645c7e"
})
export const auth= firebaseConfig.auth()
export default firebaseConfig

export {firebaseConfig as firebase}