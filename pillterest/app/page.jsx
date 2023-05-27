'use client'
import React from 'react';
import { auth } from '@/backend/firebase/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth';
import Home from './home/page'
import SignInMethod from './login/page';
  
/**check if user is logged-in
 * if true: user redirected to Home page
 * else: user redirected to Sign-in page
 */
export default function App() {
  const [user] = useAuthState(auth);
  return (
    user ? <Home/> : <SignInMethod/>
  );
}
  