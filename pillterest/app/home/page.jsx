'use client'

import React from 'react'
import Link from 'next/link'
import { Box, Button, Checkbox, InputGroup, InputRightElement, Container, Heading, VStack, StackDivider, HStack, Stack, Text, Image, Icon, useToast } from '@chakra-ui/react'
import { useAuthContext } from '@/backend/context/authContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { auth } from '@/backend/firebase/firebaseConfig'
import { db } from "@/backend/firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FaSignOutAlt } from 'react-icons/fa'
import { historyNotif, updateNotification } from '@/backend/firebase/firestore/db'

export default function Home() {
  const { user } = useAuthContext()
  const router = useRouter()
  const toast = useToast();

  const [notificationChecked, setNotificationChecked] = useState([])
  const [notificationUnchecked, setNotificationUnchecked] = useState([])

  const logout = () => {
    auth.signOut()
  }

  //converts number to string 
  //then pads it in a 2 digits string by adding 0 in front of the number if it is only 1 digit long
  function pad2Digits(n) {
    return n.toString().padStart(2, '0');
  }
  //date in format yyyy-mm-dd
  function formatDate(date) {
    return [
      date.getFullYear(),
      pad2Digits(date.getMonth() + 1),
      pad2Digits(date.getDate()),
    ].join('-');
  }
  const dateToday = formatDate(new Date());
  console.log(dateToday)

  function notificationCondition(notif) {
    return(
      !notif.date.includes(dateToday)
    && notif.timeTreatmentStart.substr(0,10) <= dateToday 
    && notif.timeTreatmentEnd.substr(0,10) >= dateToday)
  }

  const refreshData = async () => {
    if (!user) {
      setNotification([])
      return
    }

    //get unchecked notifications of the day
    const collNotifications = collection(db, "Notifications")
    const querySnapshotUncheckedNotif = await getDocs(query(collNotifications, where("uid", "==", user.uid)))
    let arrayUncheckedNotif = []
    querySnapshotUncheckedNotif.forEach((docSnapUncheckedNotif) => {
      if ( notificationCondition(docSnapUncheckedNotif.data())){
      arrayUncheckedNotif.push({ id: docSnapUncheckedNotif.id, ...docSnapUncheckedNotif.data() })
      console.log("uncheckedNotif: ", { id: docSnapUncheckedNotif.id, ...docSnapUncheckedNotif.data() })
      setNotificationUnchecked(arrayUncheckedNotif)
      }
      //console.log(docSnapUncheckedNotif.data().timeTreatmentStart)
    })
  }

  const handleUpdateNotif = async (doc, medName) => {
    const dataToUpdate = {
      date: [...doc.date, dateToday]
    }
    updateNotification(doc.id, dataToUpdate)
    toast({
      title: "Date added with success",
      status: "success"
    })

    //to update database
    refreshData()
  }

  useEffect(() => {
    //if user not logged in, return to root page
    if (user == null) router.push('/')
    refreshData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, user])



  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '4', sm: '8' }} backgroundColor='purple.50'>
      <VStack spacing={5} align='stretch' s='purple.100'>
        <InputGroup>
          <InputRightElement>
            <Button onClick={logout} colorScheme="blue" width={{ base: 'sm', sm: 'sm' }}>
              <Icon as={FaSignOutAlt} />
            </Button>
          </InputRightElement>
        </InputGroup>
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Image src="https://drive.google.com/file/d/1KW8MRDN78HmjmjhKgQ7nU83HailOYK9X/view?usp=sharing" alt="pillterest_logo" />
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
          backgroundColor='purple.100'
        >
          <Heading size={{ base: 'sm', md: 'md' }}>Upcoming Medication</Heading>
          <VStack spacing={5} align='stretch' divider={<StackDivider borderColor='gray.500' />}>
            {notificationUnchecked && notificationUnchecked.map((docSnapUncheckedNotif) =>
              //{if(docSnapUncheckedNotif.timeTreatmentStart.substr(0, 10) <= dateToday && docSnapUncheckedNotif.timeTreatmentEnd.substr(0, 10) >= dateToday) {
              <Box key={docSnapUncheckedNotif.id} h='50px'>
                <Heading size='xs'>{docSnapUncheckedNotif.medicationName}</Heading>
                <InputGroup>
                  <InputRightElement>
                    <Checkbox
                      checked
                      isDisabled={docSnapUncheckedNotif.date.includes(dateToday)}
                      onChange={() => {
                        if (notificationCondition(docSnapUncheckedNotif)) {
                          handleUpdateNotif(docSnapUncheckedNotif, docSnapUncheckedNotif.medicationName)
                          refreshData()
                        } else {
                          toast({title:"conditions don't match", status:"error"})
                        }
                      }}
                      borderColor='black'
                    ></Checkbox>
                  </InputRightElement>
                </InputGroup>
                <Text size='xs'>I took {docSnapUncheckedNotif.quantityPerTake} times per take</Text>
                <Text size='xs'>I took {docSnapUncheckedNotif.frequencyPerDay} times the medication today</Text>
              </Box>
              //}}
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
