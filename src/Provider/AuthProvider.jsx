import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.config';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    // for google signin
    const provider = new GoogleAuthProvider();

    const createUserWithEmailAndPasswordFunction = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logInUserWithEmailAndPasswordFunction = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUserFunction = () => {
        return signOut(auth)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // set user if logged in, or null if logged out
        });

        return () => unsubscribe(); // clean up the listener
    }, []);


    const authInfo = {
        user,
        setUser,
        createUserWithEmailAndPasswordFunction,
        logInUserWithEmailAndPasswordFunction,
        signOutUserFunction,
        provider,
        auth,



    }

    return <AuthContext value={authInfo}>{children}</AuthContext>
};

export default AuthProvider;