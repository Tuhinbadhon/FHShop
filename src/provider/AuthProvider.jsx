import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'; 
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import auth from '../../firebase.config';




export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {

    const [user, setUser]= useState(null);
    const [loading,setLoading] =useState(true);

    const createUser= (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
        
    
    }

    // const signInUser=(email,password)=>{
    //     setLoading(true);
    //     return signInWithEmailAndPassword(auth,email,password);
    // }

    const signInUser = async (email, password) => {
        setLoading(true);
        try {
            return signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error signing in:", error);
            setUser(null);
            setLoading(false);

        }
    };

    const signOutUser =()=>{
        setLoading(true);
        return signOut(auth);
    }

    const signInWithGoogle=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }

   
    const signInWithGithub=()=>{
        setLoading(true);
        return signInWithPopup(auth,githubProvider); 
    }
    //observe  state change if the user is logged in or not
    useEffect(()=>{
        const unSubscribe= onAuthStateChanged(auth,currentUser=>{

            setUser(currentUser);
            console.log("current user : ", currentUser);
            setLoading(false);

            const timer = setTimeout(() => {
                setLoading(false);
              }, 1000);
        })
        return()=>{
            unSubscribe();
        }

    },[]);


    const authInfo={ user ,loading, createUser,signInUser,signOutUser,signInWithGoogle,signInWithGithub }

    return (
        <AuthContext.Provider value={authInfo}>
        
            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;



// AuthProvider.PropTypes={
//     children: PropTypes.node
// }

