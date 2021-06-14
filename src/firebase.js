// import firebase from 'firebase/app'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig= firebase.initializeApp({
    apiKey: 
    authDomain: 
    projectId: 
    storageBucket:
    messagingSenderId:
    appId:
})
export const auth= firebaseConfig.auth()
export default firebaseConfig

export {firebaseConfig as firebase}
