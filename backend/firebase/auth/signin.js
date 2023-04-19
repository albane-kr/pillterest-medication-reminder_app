import app from '../firebaseConfig';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

const auth = getAuth(app);

export default async function signIn(email, password) {

    let result = null,
    error = null;

    result = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch ((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
    });

    return { result, error };
    
}