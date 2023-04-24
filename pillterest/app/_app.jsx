import { initFirebase } from "@/backend/firebase/firebaseConfig"
import { ChakraProvider } from "@chakra-ui/react"
import { AuthUserProvider } from '/backend/context/authContext'


export default function App({ Component, pageProps}) {
    initFirebase();


    return (
        <ChakraProvider>
            <AuthUserProvider>
                <Component {...pageProps} />
            </AuthUserProvider>
        </ChakraProvider>
    )
}