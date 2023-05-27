'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box, VStack, Button, Container, Heading, StackDivider, Stack, Text, useToast, Badge, HStack } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { db } from "@/backend/firebase/firebaseConfig";
import { collection, query, getDocs, where } from "firebase/firestore";
import { deleteMed } from '@/backend/firebase/firestore/db'
import { useAuth } from '@/backend/context/authContext'
import { formatDate } from '../page'


export default function Cabinet() {

  const [currentMed, setCurrentMed] = useState([])
  const [futureMed, setFutureMed] = useState([])
  const [pastMed, setPastMed] = useState([])
  const { user } = useAuth()
  const toast = useToast()

  const dateToday = formatDate(new Date());

  /**
   * Check status of the treatment: ongoing treatment
   * @param med to check
   * @returns boolean:
   *    true if it is a current medication to take and treatment period is still ongoing
   *    false otherwise
   */
  function isCurrentMed(med) {
    return (
      med.timeTreatmentStart <= dateToday
      && med.timeTreatmentEnd >= dateToday
    )
  }

  /**
   * Check status of the treatment: future treatment
   * @param med to check
   * @returns boolean:
   *    true if it is a future medication to take and treatment period has not started yet
   */
  function isFutureMed(med) {
    return (
      med.timeTreatmentStart >= dateToday
    )
  }

  /**
   * Disclaimer:
   * as current and future treatment are checked, 
   * there is no need to check past treatment 
   * as they are all those who do not meet the previous conditions
   */


  /**
   * @returns up-to-date data from the database
   */
  const refreshData = async () => {
    if (!user) {
      setCurrentMed([])
      setFutureMed([])
      setPastMed([])

      return
    }

    //get data from documents of the collection "Prescribed_Med" from database
    const collPrescribedMed = collection(db, "Prescribed_Med")
    const querySnapshot = await getDocs(query(collPrescribedMed, where("uid", "==", user.uid)));
    let arrayCurrentMed = []
    let arrayFutureMed = []
    let arrayPastMed = []
    querySnapshot.forEach((docSnap) => {
      //push each medication depending on its treatment period
      if (isCurrentMed(docSnap.data())) {
        arrayCurrentMed.push({ id: docSnap.id, ...docSnap.data() })
      } else if (isFutureMed(docSnap.data())) {
        arrayFutureMed.push({ id: docSnap.id, ...docSnap.data() })
      } else {
        arrayPastMed.push({ id: docSnap.id, ...docSnap.data() })
      }
      
    });
    setCurrentMed(arrayCurrentMed)
    setFutureMed(arrayFutureMed)
    setPastMed(arrayPastMed)
  }

  useEffect(() => {
    refreshData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  /**
   * apply backend function to delete medication
   * @param id of the document to delete in the database
   */
  const handleMedDelete = async (id) => {
    //JS confirm pop-up to check user's intend as deleting is irreversible
    if (confirm("Are you sure you want to delete this medication ?")) {
      await deleteMed(id)
      toast({ title: "Prescribed medication deleted successfully", status: "success" })
    }
    //to update database
    refreshData()
  }

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '4', sm: '8' }} backgroundColor='purple.50'>
      <Stack spacing="8">
        <Stack spacing="8" textAlign="center">
          <Heading size={{ base: 'md', md: 'lg' }}>
            My Medication Cabinet
          </Heading>
        </Stack>
        <Stack>
          <Heading size={{ base: 'sm', md: 'md' }}>
            Your current treatment
          </Heading>
          <Box
            py={{ base: '4', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'bg-surface', sm: 'bg-surface' }}
            boxShadow={{ base: 'md', sm: 'md' }}
            borderRadius={{ base: 'md', sm: 'xl' }}
            backgroundColor='purple.100'
          >
            <VStack spacing={5} align='stretch' divider={<StackDivider borderColor='gray.500' />}>
              {currentMed && currentMed.map((docSnap) =>
                <Box key={docSnap.id}>
                  <Heading size={{ base: 'xs', md: 'sm' }}>
                    {docSnap.medicationName}{" "}
                    <Badge color="blue" onClick={() => handleMedDelete(docSnap.id)}>
                      <DeleteIcon />
                    </Badge>
                  </Heading>
                  <Text>Quantity: {docSnap.quantityPerTake}</Text>
                  <Text>Frequency: {docSnap.frequencyPerDay}</Text>
                  <Text>Time of treatment: {docSnap.timeTreatmentStart} - {docSnap.timeTreatmentEnd}</Text>
                </Box>
              )}
            </VStack>
          </Box>
          <Heading size={{ base: 'sm', md: 'md' }}>
            Your future treatment
          </Heading>
          <Box
            py={{ base: '4', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'bg-surface', sm: 'bg-surface' }}
            boxShadow={{ base: 'md', sm: 'md' }}
            borderRadius={{ base: 'md', sm: 'xl' }}
            backgroundColor='purple.100'
          >
            <VStack spacing={5} align='stretch' divider={<StackDivider borderColor='gray.500' />}>
              {futureMed && futureMed.map((docSnap) =>
                <Box key={docSnap.id}>
                  <Heading size={{ base: 'xs', md: 'sm' }}>
                    {docSnap.medicationName}{" "}
                    <Badge color="blue" onClick={() => handleMedDelete(docSnap.id)}>
                      <DeleteIcon />
                    </Badge>
                  </Heading>
                  <Text>Quantity: {docSnap.quantityPerTake}</Text>
                  <Text>Frequency: {docSnap.frequencyPerDay}</Text>
                  <Text>Time of treatment: {docSnap.timeTreatmentStart} - {docSnap.timeTreatmentEnd}</Text>
                </Box>
              )}
            </VStack>
          </Box>
          <Heading size={{ base: 'sm', md: 'md' }}>
            Your past treatment
          </Heading>
          <Box
            py={{ base: '4', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'bg-surface', sm: 'bg-surface' }}
            boxShadow={{ base: 'md', sm: 'md' }}
            borderRadius={{ base: 'md', sm: 'xl' }}
            backgroundColor='purple.100'
          >
            <VStack spacing={5} align='stretch' divider={<StackDivider borderColor='gray.500' />}>
              {pastMed && pastMed.map((docSnap) =>
                <Box key={docSnap.id}>
                  <Heading size={{ base: 'xs', md: 'sm' }}>
                    {docSnap.medicationName}{" "}
                    <Badge color="blue" onClick={() => handleMedDelete(docSnap.id)}>
                      <DeleteIcon />
                    </Badge>
                  </Heading>
                  <Text>Quantity: {docSnap.quantityPerTake}</Text>
                  <Text>Frequency: {docSnap.frequencyPerDay}</Text>
                  <Text>Time of treatment: {docSnap.timeTreatmentStart.substr(0, 10)} - {docSnap.timeTreatmentEnd.substr(0, 10)}</Text>
                </Box>
              )}
            </VStack>
          </Box>
        </Stack>
        <Stack spacing="6">
          <HStack spacing="10" justify="center">
            <Button colorScheme="blue" size="sm">
              <Link href="/home">
                Home
              </Link>
            </Button>
            <Button colorScheme="blue" size="sm">
              <Link href="/home/tracker">
                My tracker
              </Link>
            </Button>
          </HStack>
        </Stack>
      </Stack>
    </Container>
  )
}
