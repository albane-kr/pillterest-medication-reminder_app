import { initFirebase } from "@/backend/firebase/firebaseConfig"
import { ChakraProvider } from "@chakra-ui/react"
import { AuthUserProvider } from '/backend/context/authContext'


export default function App({ Component, pageProps}) {
    //make sure Firebase app is always initialized in all pages
    initFirebase();

    return (
        <ChakraProvider>
            <AuthUserProvider>
                <Component {...pageProps} />
            </AuthUserProvider>
        </ChakraProvider>
    )
}