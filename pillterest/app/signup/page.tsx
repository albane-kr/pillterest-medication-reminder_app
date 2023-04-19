'use client'

/*
import { useState } from "react"
//import signUp from '../../../backend/firebase/auth/signup'
import { useRouter } from 'next/navigation'
import { Flex, Button, Heading, Input, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'

export default function SignUp() {
    /*const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleForm = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
    
        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        console.log(result)
        return router.push('../admin')
    }

    return (<div className="wrapper">
        <div className="form-wrapper">
            <h1 className="mt-60 mb-30">Sign up</h1>
            <form onSubmit={handleForm} className="form">
                <label htmlFor="email">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                </label>
                <label htmlFor="password">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="********" />
                </label>
                <button type="submit">Sign up</button>
            </form>
        </div>
    </div>)
}*/


import { Box, Button, Checkbox, Container, Divider, FormControl, FormLabel, Heading, HStack, Input, Stack, Text } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { PasswordField } from '../passwordField'
import { ConfirmPasswordField } from '../confirmPasswordField'

export default function SignUp() {
    return (
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <Stack spacing="8">
                <Stack spacing="6">
                    <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                        <Heading size={{ base: 'xs', md: 'sm' }}>Create your account </Heading>
                        <HStack spacing="1" justify="center">
                            <Text color="muted">Already have an account?</Text>
                            <Button variant="link" colorScheme="blue">
                                <Link href='..'>
                                    Sign in
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
                                <FormLabel htmlFor="username">Username</FormLabel>
                                <Input id="username" type="text" />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input id="email" type="email" />
                            </FormControl>
                            <PasswordField />
                            <ConfirmPasswordField />
                        </Stack>
                        <Stack spacing="6">
                            <Button mb={6} colorScheme="blue">
                                <Link href="..">
                                    Sign Up
                                </Link>
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    )
}