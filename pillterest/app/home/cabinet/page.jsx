'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box, IconButton, Button, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Checkbox, InputGroup, InputRightElement, Skeleton, Container, Heading, VStack, StackDivider, HStack, Input, Stack, Text, useToast, Badge } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { db } from "@/backend/firebase/firebaseConfig";
import { collection, query, getDocs } from "firebase/firestore";
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
    const qPrescMed = query(collPrescribedMed)
    console.log(qPrescMed)
    const querySnapshot = await getDocs(qPrescMed);
    let array = []
    querySnapshot.forEach((docSnap) => {
      array.push({id : docSnap.id, ...docSnap.data()})
      console.log(docSnap.id, " => ", docSnap.data());
      console.log(querySnapshot.size)
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
  }  

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="8" textAlign="center">
          <Heading size={{ base: 'md', md: 'lg' }}>
            My Medication Cabinet
          </Heading>
        </Stack>
        <Stack spacing="6" textAlign="center">
          <Button colorScheme="blue">
            <Link href="/home/cabinet/stock">
              Manage my current stock
            </Link>
          </Button>
        </Stack>
        <Stack>
          <Heading size={{ base: 'sd', md: 'md' }}>
            Your current treatment
          </Heading>
          <Box mt={6}>
            <SimpleGrid column={{base: 'sm', sm: 'md'}} spacing={8}>
              {med && med.map((docSnap) =>
                <Box key={docSnap.id}>
                  <Heading>
                    {docSnap.medicationName}{" "}
                    <Badge color="blue" onClick={() => handleMedDelete(docSnap.id)}>
                      <DeleteIcon />
                    </Badge>
                  </Heading>
                  <Text>Quantity: {docSnap.quantityPerTake}</Text>
                  <Text>Frequency: {docSnap.frequencyPerDay}</Text>
                  <Text>Time of treatment: {docSnap.timeOfTreatment}</Text>
                </Box>
              )}
            </SimpleGrid>
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
