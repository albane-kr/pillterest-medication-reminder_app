import { ChakraProvider } from "@chakra-ui/react"
//import { AuthUserProvider } from '/backend/context/authContext'

export default function App({ Component, pageProps}) {
    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}