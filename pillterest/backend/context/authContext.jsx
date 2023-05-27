'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

//check that user is logged-in through the whole use of the apllication

export const AuthContext = createContext({user: null, loading: true});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ( {children} ) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                const userId = user.uid
                console.log(userId)
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        
        <AuthContext.Provider value={{user}}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const [user, setUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
        setIsLoggedIn(user && user.uid ? true : false);
        setUser(user);
        });
    });
    
    return { user, isLoggedIn };
}
