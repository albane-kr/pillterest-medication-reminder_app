'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react'
import { db } from "@/backend/firebase/firebaseConfig";
import { collection, query, getDocs, where } from "firebase/firestore";
import { useAuth } from '@/backend/context/authContext'



export default function Tracker() {

  const { user } = useAuth()
  const [notif, setNotif] = useState([])

  /**
   * @returns up-to-date data from the database
   */
  const refreshData = async () => {
    if (!user) {
      setNotif([])
      return
    }

    //get notifications of the day from the database
    const collNotifications = collection(db, "Notifications")
    //select from collection the notifications related to logged-in user
    const querySnapshotUncheckedNotif = await getDocs(query(collNotifications, where("uid", "==", user.uid)))
    let arrayNotif = []
    //push them into an array to be able to map the different notification to display
    querySnapshotUncheckedNotif.forEach((docSnapNotif) => {
      arrayNotif.push({ id: docSnapNotif.id, ...docSnapNotif.data() })
      setNotif(arrayNotif)
    })
  }

  useEffect(() => {
    refreshData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '4', sm: '8' }} backgroundColor='purple.50'>
      <Stack spacing="8">
        <Heading>My Tracker</Heading>
        {notif && notif.map((docSnapNotif) =>
          <Box key={docSnapNotif.id}
            py={{ base: '4', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'bg-surface', sm: 'bg-surface' }}
            boxShadow={{ base: 'md', sm: 'md' }}
            borderRadius={{ base: 'md', sm: 'xl' }}
            backgroundColor='purple.100'>
            <Text>{docSnapNotif.medicationName}</Text>
            <Text> Days when medication was taken:</Text>
            <Text>{docSnapNotif.date.join(', ')}</Text>
          </Box>
        )}
        <Button colorScheme="blue" size="sm">
          <Link href="/home/cabinet">
            My medication cabinet
          </Link>
        </Button>
      </Stack>
    </Container>
  )
}
