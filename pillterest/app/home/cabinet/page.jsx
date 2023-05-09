'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box, IconButton, Button, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Checkbox, InputGroup, InputRightElement, Skeleton, Container, Heading, VStack, StackDivider, HStack, Input, Stack, Text, useToast, Badge } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { db } from "@/backend/firebase/firebaseConfig";
import { collection, onSnapshot, query, QuerySnapshot, where, getDocs } from "firebase/firestore";
import { deleteMed } from '@/backend/firebase/firestore/db'
import { useAuth } from '@/backend/context/authContext'
//import { NewMed } from "/home/newMed"

export default function Cabinet() {

  const [med, setMed] = useState([])
  const { user } = useAuth()
  const toast = useToast()

  const refreshData = async () => {
    if (!user) {
      setMed([])
      return
    }

    const collRef = collection(db, "Prescribed_Med")
    const q = query(collRef)
    console.log(q)
    const querySnapshot = await getDocs(q);
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

      </Stack>
    </Container>
  )
}
