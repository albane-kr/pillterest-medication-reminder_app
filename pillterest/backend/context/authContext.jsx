'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';


export const AuthContext = createContext({user: null, loading: true});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ( {children} ) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
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
