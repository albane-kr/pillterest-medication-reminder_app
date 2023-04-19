//transforms the server component into a client component
'use client'


//import { useState} from "react";
//import signIn from "../../../backend/firebase/auth/signin";
//import { useRouter } from 'next/navigation'
/*
export default function SingIn() {
    /*const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleForm = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("../admin")
    }
    return (  <div className="wrapper">
          <div className="form-wrapper">
              <h1 className="mt-60 mb-30">Sign up </h1>
              <form onSubmit={handleForm} className="form">
                  <label htmlFor="email">
                      <p>Email  </p>
                      <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                  </label>
                  <label htmlFor="password">
                      <p>Password </p>
                      <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                  </label>
                  <button type="submit">Sign up </button>
              </form>
          </div>

      </div>);
}*/
   

import { Box, Button, Checkbox, Container, FormControl, FormLabel, Heading, HStack, Input, Stack, Text } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { PasswordField } from './passwordField'

export default function SignIn(){
  return(
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }}>Log in to your account </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Do not have an account?</Text>
              <Button variant="link" colorScheme="blue">
                <Link href='/signup'>
                  Sign up
                </Link>
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
        py={{ base: '0', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        bg={{ base: 'transparent', sm: 'bg-surface' }}
        boxShadow={{ base: 'none', sm: 'md' }}
        borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" />
              </FormControl>
              <PasswordField />
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me  </Checkbox>
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button mb={6} colorScheme="blue">
                <Link href="./home">
                  Sign in
                </Link> 
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}