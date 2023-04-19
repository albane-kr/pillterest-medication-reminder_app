import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";


//app's Firebase configuration
const firebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseUrl: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

//Initialize Firebase
const app = getApps().lengh === 0 ? initializeApp(firebaseCredentials) : getApps()[0];
export default app;

/*
const db = getFirestore(app);
db.collection('todos').getDocs();
const todosCol = collection(db, 'todos');
const snapshot = await getDocs(todosCol);
*/

//Initialize Firebase Auth and get ref to the service
const auth = getAuth(app);






