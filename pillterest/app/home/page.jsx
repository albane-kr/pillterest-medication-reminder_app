'use client'

import React from 'react'
import Link from 'next/link'
import { Box, Button, Checkbox, InputGroup, InputRightElement, Skeleton, Container, Heading, VStack, StackDivider, HStack, Input, Stack, Text, Image, Icon } from '@chakra-ui/react'
import { useAuthContext } from '@/backend/context/authContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { auth } from '@/backend/firebase/firebaseConfig'
import { db } from "@/backend/firebase/firebaseConfig";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { FaSignOutAlt } from 'react-icons/fa'
import { onMessage } from "firebase/messaging"
import { getMessaging, onBackgroundMessage} from "firebase/messaging/sw"

export default function Home() {
  const { user } = useAuthContext()
  const router = useRouter()

  /*cloud messaging
  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  });
  onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });*/

  const [notification, setNotification] =useState([])

  const logout = () => {
    auth.signOut()
  }

  const refreshData = async () => {
    if (!user) {
      setNotification([])
      return
    }

    //get data from documents of the collection "Prescribed_Med" 
    //and push them into an array to be able to map the different documents to display
    const collPrescribedMed = collection(db, "Prescribed_Med")
    const qPrescMed = query(collPrescribedMed)
    console.log(qPrescMed)
    const querySnapshot = await getDocs(qPrescMed, where("timeOfTreatment", "!==", null))
    let array = []
    querySnapshot.forEach((docSnap) => {
      array.push({id : docSnap.id, ...docSnap.data()})
      console.log(docSnap.id, " => ", docSnap.data())
      console.log(querySnapshot.size)
      setNotification(array)
    });

  }

  useEffect( () => {
    if ( user == null ) router.push('/')
    refreshData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, user])

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '4', sm: '8' }}>
      <VStack spacing={5} align='stretch'>
      <InputGroup>
        <InputRightElement>
          <Button onClick={logout} colorScheme="blue" width={{base: 'sm', sm: 'sm'}}>
            <Icon as={FaSignOutAlt} />
          </Button>
        </InputRightElement>
      </InputGroup>
      <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Image src="https://drive.google.com/file/d/1KW8MRDN78HmjmjhKgQ7nU83HailOYK9X/view?usp=sharing" alt="pillterest_logo"/>
        </Stack>
      </VStack>
      <Stack spacing="8">
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Heading size={{ base: 'md', md: 'lg' }}>Welcome to your Pillterest! </Heading>
        </Stack>
        <Box
          py={{ base: '4', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'bg-surface', sm: 'bg-surface' }}
          boxShadow={{ base: 'md', sm: 'md' }}
          borderRadius={{ base: 'md', sm: 'xl' }}
        >
          <Heading size={{ base: 'sm', md: 'md' }}>Upcoming Medication</Heading>
          <VStack spacing={5} align='stretch' divider={<StackDivider borderColor='gray.100' />}>
            {notification && notification.map((docSnap) =>
                <Box key={docSnap.id} h='40px'>
                  <Heading size='xs'>{docSnap.medicationName}</Heading>
                  <InputGroup>
                    <InputRightElement>
                      <Checkbox checked></Checkbox>                    
                    </InputRightElement>
                  </InputGroup>
                  <Text size='xs'>I took {docSnap.frequencyPerDay} times the medication</Text>
                </Box>
            )}
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
