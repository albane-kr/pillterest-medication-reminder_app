import app from "../firebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(app);

export default async function signUp(email, password) {
    
    let result = null,
        error = null;

    
    result = await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch ((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        });

    return { result, error };
}