'use client'

import { initFirebase, auth, googleProvider } from '@/backend/firebase/firebaseConfig'
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation'
import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import 'firebase/auth'
import signInWithRedirectGoogle from '@/backend/firebase/auth/auth_google_signin_redirect_result'

export default function SignInMethod() {
  const app = initFirebase()
  console.log(app)

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Heading>
          Welcome to Pillterest!
        </Heading>
        <Text>
          How would you like to sign in ?
        </Text>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg-surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <Button mb={6} colorScheme="blue">
                <Link href="./signinemail">
                  Sign in with Email and Password
                </Link>
              </Button>
            </Stack>
            <Button onClick={signInWithRedirectGoogle} mb={6} colorScheme="blue">
              Sign in with Google
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}