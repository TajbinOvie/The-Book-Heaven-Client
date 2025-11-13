import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { auth } from '../Firebase/Firebase.config';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    const provider = new GoogleAuthProvider();

    const createUserWithEmailAndPasswordFunction = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logInUserWithEmailAndPasswordFunction = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signOutUserFunction = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); 
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        setUser,
        createUserWithEmailAndPasswordFunction,
        logInUserWithEmailAndPasswordFunction,
        signOutUserFunction,
        provider,
        auth,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
