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

  function isCurrentMed(med) {
    return (
      med.timeTreatmentStart <= dateToday
      && med.timeTreatmentEnd >= dateToday
    )
  }

  function isFutureMed(med) {
    return (
      med.timeTreatmentStart >= dateToday
    )
  }

  function isPastMed(med) {
    return (
      med.timeTreatmentEnd <= dateToday
    )
  }

  const refreshData = async () => {
    if (!user) {
      setCurrentMed([])
      setFutureMed([])
      setPastMed([])

      return
    }

    //get data from documents of the collection "Prescribed_Med" 
    //and push them into an array to be able to map the different documents to display
    const collPrescribedMed = collection(db, "Prescribed_Med")
    const querySnapshot = await getDocs(query(collPrescribedMed, where("uid", "==", user.uid)));
    console.log(user.uid)
    console.log(querySnapshot)
    let arrayCurrentMed = []
    let arrayFutureMed = []
    let arrayPastMed = []
    querySnapshot.forEach((docSnap) => {
      if (isCurrentMed(docSnap.data())) {
        arrayCurrentMed.push({ id: docSnap.id, ...docSnap.data() })
        //console.log(docSnap.id, " => ", docSnap.data());
        //console.log(querySnapshot.size)
        setCurrentMed(arrayCurrentMed)
      } else if (isFutureMed(docSnap.data())) {
        arrayFutureMed.push({ id: docSnap.id, ...docSnap.data() })
        //console.log(docSnap.id, " => ", docSnap.data());
        //console.log(querySnapshot.size)
        setFutureMed(arrayFutureMed)
      } else {
        arrayPastMed.push({ id: docSnap.id, ...docSnap.data() })
        //console.log(docSnap.id, " => ", docSnap.data());
        //console.log(querySnapshot.size)
        setPastMed(arrayPastMed)
      }
    });
  }

  useEffect(() => {
    refreshData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])


  const handleMedDelete = async (id) => {
    if (confirm("Are you sure you want to delete this medication ?")) {
      deleteMed(id)
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
