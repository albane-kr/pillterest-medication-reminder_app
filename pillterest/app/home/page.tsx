'use client'

import React from 'react'
import Link from 'next/link'
import { Box, Button, Checkbox, InputGroup, InputRightElement, Skeleton, Container, Heading, VStack, StackDivider, HStack, Input, Stack, Text, useFocusEffect } from '@chakra-ui/react'
import { useAuthContext } from '@/backend/context/authContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { auth } from '@/backend/firebase/firebaseConfig'

export default function Home() {
  const { user } = useAuthContext()
  const router = useRouter()

  const logout = () => {
    auth.signOut()
  }

  useEffect( () => {
    if ( user == null ) router.push('/')
  }, [router, user])

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '4', sm: '8' }}>
      <VStack spacing={5} align='stretch'>
      <InputGroup>
        <InputRightElement>
          <Button onClick={logout} colorScheme="blue" width={{base: 'md', sm: 'md'}}>
              Sign Out
          </Button>
        </InputRightElement>
      </InputGroup>
      <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Heading size={{ base: 'md', md: 'lg' }}>LOGO</Heading>
        </Stack>
      </VStack>
      <Stack spacing="8">
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Heading size={{ base: 'md', md: 'lg' }}>Welcome to your Pillterest! </Heading>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'bg-surface', sm: 'bg-surface' }}
          boxShadow={{ base: 'md', sm: 'md' }}
          borderRadius={{ base: 'md', sm: 'xl' }}

        >
          <Stack>
            <Text>Calendar not implemented</Text>
          </Stack>
        </Box>
        <Box
          py={{ base: '4', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'bg-surface', sm: 'bg-surface' }}
          boxShadow={{ base: 'md', sm: 'md' }}
          borderRadius={{ base: 'md', sm: 'xl' }}
        >
          <VStack spacing={5} align='stretch' divider={<StackDivider borderColor='gray.100' />}>
            <Box h='40px'>
              <Text>Notifications</Text>
              <InputGroup>
                <InputRightElement>
                  <Checkbox checked></Checkbox>
                </InputRightElement>
              </InputGroup>
            </Box>
            <Box h='40px'>
              <InputGroup>
                <InputRightElement>
                  <Checkbox checked></Checkbox>
                </InputRightElement>
              </InputGroup>
            </Box>
            <Box h='40px'>
              <InputGroup>
                <InputRightElement>
                  <Checkbox checked></Checkbox>
                </InputRightElement>
              </InputGroup>
            </Box>
          </VStack>
        </Box>
        <Stack spacing="6">
          <HStack spacing="10" justify="center">
            <Button colorScheme="blue" size="sm">
              <Link href="/home/cabinet">
                My medication cabinet
              </Link>
            </Button>
            <Button colorScheme="blue" size="sm">
              <Link href="/home/newMed">
                New medication
              </Link>
            </Button>
          </HStack>
        </Stack>

      </Stack>
    </Container>
  )
}
