'use client'

import React from 'react'
import Link from 'next/link'
import { Box, Button, Checkbox, InputGroup, InputRightElement, 
  Container, Heading, VStack, StackDivider, HStack, Stack, 
  Text, Image, Icon, useToast } from '@chakra-ui/react'
import { useAuthContext } from '@/backend/context/authContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { auth } from '@/backend/firebase/firebaseConfig'
import { db } from "@/backend/firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FaSignOutAlt } from 'react-icons/fa'
import { deleteDate, updateNotification } from '@/backend/firebase/firestore/db'


/**
 * converts number to string 
 * then pads it in a 2 digits string by adding 0 in front of the number if it is only 1 digit long
 * @param n number to be converted and padded in 2 digits string
 * @returns converted and padded number n
 */
export function pad2Digits(n) {
  return n.toString().padStart(2, '0');
}

/**
 * format current date to yyyy-mm-dd
 * @param date to be formatted
 * @returns formatted date
 */
export function formatDate(date) {
  return [
    date.getFullYear(),
    pad2Digits(date.getMonth() + 1),
    pad2Digits(date.getDate()),
  ].join('-');
}
/**
 * format date of the following day to yyyy-mm-dd
 * @param date to be formatted
 * @returns formatted date
 */
export function formatNextDate(date) {
  return [
    date.getFullYear(),
    pad2Digits(date.getMonth() + 1),
    pad2Digits(date.getDate() + 1),
  ].join('-');
}

export default function Home() {

  const { user } = useAuthContext()
  const router = useRouter()
  const toast = useToast();


  const [notificationToCheck, setNotificationToCheck] = useState([])

  const logout = () => {
    auth.signOut()
  }

  const dateToday = formatDate(new Date());
  console.log("date of today: ", dateToday)
  const dateTomorrow = formatNextDate(new Date())

  /**
   * Conditions to display the notification
   * 
   * @param notif data of a notification from the Notification collection
   * @returns boolean: 
   *    true if the notification has not been checked at current date, and if the date is in the treatment period
   *    false otherwise
   */
  function notificationCondition(notif) {
    return (
      !notif.date.includes(dateTomorrow)
      && notif.timeTreatmentStart <= dateToday
      && notif.timeTreatmentEnd >= dateToday)
  }

  /**
   * @returns up-to-date data from the database
   */
  const refreshData = async () => {
    if (!user) {
      setNotification([])
      return
    }

    //get notifications of the day from the database
    //retreive collection containing notifications
    const collNotifications = collection(db, "Notifications")
    //select from collection the notifications related to logged-in user
    const querySnapshotUncheckedNotif = await getDocs(query(collNotifications, where("uid", "==", user.uid)))
    let arrayNotifToCheck = []
    //iterate through each selected notification
    querySnapshotUncheckedNotif.forEach((docSnapNotifToCheck) => {
      //check if they meet the conditions
      if (notificationCondition(docSnapNotifToCheck.data())) {
        //push notification id and data into array
        arrayNotifToCheck.push({ id: docSnapNotifToCheck.id, ...docSnapNotifToCheck.data() })
        //update state of constant "notificationToCheck" by adding the array to it
        setNotificationToCheck(arrayNotifToCheck)
      }
    })
  }

    /**
     * apply backend functions on notification when user checks the notification
     * can either add or delete current date based on conditions
     * @param doc notification to update
     */
  const handleUpdateNotif = async (doc) => {
    //check if the date array of the notification already includes current date
    if (!doc.date.includes(dateToday)) {
      //add current date to list of dates where notification was checked
      const dataToUpdate = {
        date: [...doc.date, dateToday]
      }
      //update notification with current date
      updateNotification(doc.id, dataToUpdate)
      toast({
        title: "Date added with success",
        status: "success"
      })
    } else {
      //if current date is already in the date array, current date is deleted
      deleteDate(doc.id, dateToday)
      toast({
        title: "Date deleted with success",
        status: "success"
      })
    }


    //update database
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
        <Stack spacing={{ base: '2', md: '3' }}>
          <Image src="/pillterest.svg" alt="pillterest_logo" content='center'/>
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
            {notificationToCheck && notificationToCheck.map((docSnapNotifToCheck) =>
              <Box key={docSnapNotifToCheck.id} h='50px'>
                <Heading size='xs'>{docSnapNotifToCheck.medicationName}</Heading>
                <InputGroup>
                  <InputRightElement>
                    <Checkbox
                      checked
                      isDisabled={docSnapNotifToCheck.date.includes(dateTomorrow)}
                      onChange={() => {
                        if (notificationCondition(docSnapNotifToCheck)) {
                          handleUpdateNotif(docSnapNotifToCheck)
                          refreshData()
                        } else {
                          toast({ title: "conditions don't match", status: "error" })
                        }
                      }}
                      borderColor='black'
                    ></Checkbox>
                  </InputRightElement>
                </InputGroup>
                <Text size='xs'>I took {docSnapNotifToCheck.quantityPerTake} times per take</Text>
                <Text size='xs'>I took {docSnapNotifToCheck.frequencyPerDay} times the medication today</Text>
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
