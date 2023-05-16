'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box, VStack, Button, Container, Heading, StackDivider, Stack, Text, useToast, Badge } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { db } from "@/backend/firebase/firebaseConfig";
import { collection, query, getDocs, where } from "firebase/firestore";
import { deleteMed } from '@/backend/firebase/firestore/db'
import { useAuth } from '@/backend/context/authContext'


export default function Cabinet() {

  const [med, setMed] = useState([])
  const { user } = useAuth()
  const toast = useToast()

  

  const refreshData = async () => {
    if (!user) {
      setMed([])
      
      return
    }

    //get data from documents of the collection "Prescribed_Med" 
    //and push them into an array to be able to map the different documents to display
    const collPrescribedMed = collection(db, "Prescribed_Med")
    const querySnapshot = await getDocs(query(collPrescribedMed, where("uid", "==", user.uid)));
    
    console.log(user.uid)
    console.log(querySnapshot)
    let array = []
    querySnapshot.forEach((docSnap) => {
      array.push({id : docSnap.id, ...docSnap.data()})
      //console.log(docSnap.id, " => ", docSnap.data());
      //console.log(querySnapshot.size)
      setMed(array) 
    });
  }

  useEffect(() => {
    refreshData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ user])

  
  const handleMedDelete = async (id) => {
    if (confirm("Are you sure you want to delete this medication ?")) {
      deleteMed(id)
      toast({ title: "Prescribed medication deleted successfully", status:"success"})
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
              {med && med.map((docSnap) =>
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
        </Stack>
        <Button colorScheme='blue'>
            <Link href="/home">
              Home
            </Link>
          </Button>
      </Stack>
    </Container>
  )
}
