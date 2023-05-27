import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'


/**
 * app's Firebase configuration
 */
const firebaseCredentials = ({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim(),
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.trim(),
  databaseUrl: process.env.NEXT_PUBLIC_DATABASE_URL?.trim(),
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim(),
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim(),
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?.trim(),
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.trim()
});

/**
 * Initialize Firebase
 */
export const app = getApps().length === 0 ? initializeApp(firebaseCredentials) : getApps()[0];

/**
 * source: https://www.youtube.com/watch?v=BQrE98bP6m4
 * Export fct to initialize firebase
 * @returns initialized firebase app
 */
export const initFirebase = () => {
  
  return (app)
}

/**
 * Initialize Firebase Auth and get reference to the service
 */
export var auth = getAuth(app)
export var googleProvider = new GoogleAuthProvider()

/**
 * Initialize Cloud Firestore and get reference to the service
 */
export const db = getFirestore(app)

