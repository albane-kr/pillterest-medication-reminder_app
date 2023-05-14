'use client'

import { initFirebase } from '@/backend/firebase/firebaseConfig'
import { Button, Container, Heading, Stack } from '@chakra-ui/react'
import 'firebase/auth'
import signInWithRedirectGoogle from '@/backend/firebase/auth/auth_google_signin_redirect_result'

export default function SignInMethod() {
  const app = initFirebase()
  console.log(app)

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }} backgroundColor='purple.50'>
      <Stack spacing="8">
        <Heading>
          Welcome to Pillterest!
        </Heading>
        <Stack content='center' spacing={8}>
          <Button onClick={signInWithRedirectGoogle} mb={6} colorScheme="blue">
            Sign in with Google
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}