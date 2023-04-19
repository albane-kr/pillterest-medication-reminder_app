'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import app from '../firebaseConfig';

const auth = getAuth(app);

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
        
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

//{loading ? <div>Loading...</div> : children}