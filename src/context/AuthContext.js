import React, { useContext, useState, useEffect} from 'react'
import {auth} from '../firebase'
import firebase from "firebase/app"
import {useHistory} from 'react-router-dom'
// import "firebase/auth" // 👈 this could also be in your `firebase.js` file
import { getAuth, signInWithPopup } from "firebase/auth";



export const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser,setCurrentUser]= useState()
    const [loading, setLoading]= useState(true)
    const history= useHistory
    

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }
    
    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout(){
        auth.signOut()
    }
    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
      }
    
    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }
    function signInWithGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider()
        return auth.signInWithPopup(provider)
           
    }
    function signInWithApple(){
        const provider= new firebase.auth.OAuthProvider('apple.com')
        return auth.signInWithPopup(provider)

    }

    
    //  function signupWithEmail(email){
    //     return auth.sendSignInLinkToEmail(email, actionCodeSettings)
    //  }
    const value ={
        currentUser, 
        signup,
        login, 
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        signInWithGoogle,
        signInWithApple
        
    }
    useEffect(()=>{
        const unsubscribe= auth.onAuthStateChanged(user=>{  
            setCurrentUser(user)
            setLoading(false)
        })
        
        return unsubscribe

    },[])

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
