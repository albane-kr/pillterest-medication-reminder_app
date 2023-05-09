'use client'
import React from 'react';
import { auth } from '@/backend/firebase/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth';
import Home from './home/page'
import SignInMethod from './login/page';
  
export default function App() {
  const [user] = useAuthState(auth);
  return (
    user ? <Home/> : <SignInMethod/>
  );
}
  