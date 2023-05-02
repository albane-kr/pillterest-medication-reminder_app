import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from "firebase/auth";

export default async function signInWithRedirectGoogle() {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider()

  await signInWithRedirect(auth, googleProvider);

  googleProvider.addScope('email')

  const result = await getRedirectResult(auth);
  if (result) {
    // This is the signed-in user
    const user = result.user;
    // This gives you a Google Access Token.
    const credential = googleProvider.credentialFromResult(auth, result);
    const token = credential.accessToken;
  }
  // As this API can be used for sign-in, linking and reauthentication,
  // check the operationType to determine what triggered this redirect
  // operation.
  const operationType = result.operationType;
  console.log(operationType)


  const user = auth.currentUser;

  if (user !== null) {
    user.providerData.forEach((profile) => {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
    });
  }
}