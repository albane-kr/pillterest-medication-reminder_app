'use client'

import { initFirebase } from '@/backend/firebase/firebaseConfig'
import { Button, Container, Stack, Image } from '@chakra-ui/react'
import 'firebase/auth'
import signInWithRedirectGoogle from '@/backend/firebase/auth/auth_google_signin_redirect_result'

export default function SignInMethod() {
  const app = initFirebase()
  console.log("Firebase initialized: ", app)

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '4', sm: '8' }} backgroundColor='purple.50'>
      <Stack spacing="8">
        <Stack spacing={{ base: '8', sm: '12' }}>
          <Image src="/pillterest.svg" alt="pillterest_logo"/>
        </Stack>
        <Stack spacing={8}>
          <Button onClick={signInWithRedirectGoogle} mb={6} colorScheme="blue">
            Sign in with Google
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}