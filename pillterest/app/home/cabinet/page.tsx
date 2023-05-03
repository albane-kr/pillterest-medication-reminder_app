'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box, IconButton, Button, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Checkbox, InputGroup, InputRightElement, Skeleton, Container, Heading, VStack, StackDivider, HStack, Input, Stack, Text, useToast, Badge } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { db } from "@/backend/firebase/firebaseConfig";
import { collection, onSnapshot, query, QuerySnapshot, where } from "firebase/firestore";
import { deleteMed } from '@/backend/firebase/firestore/db'
import { useAuth } from '@/backend/context/authContext'

export default function Cabinet() {

  const [med, setMed] = useState([])
  const { user } = useAuth()
  const toast = useToast()

  const refreshData = () => {
    if (!user) {
      setMed([])
      return
    }

    const q = query(collection(db, "Prescribed_Med"), where("user", "==", user.uid)).get()
    onSnapshot(q, (querySnapshot) => {
      let array = []
      querySnapshot.docs.forEach((doc) => {
        array.push({ id: doc.id, ...doc.data() })
      })
      setMed(array)
    })
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
    <Container maxW="lg" py={{ base: 'md', md: 'lg' }} px={{ base: 'sm', sm: 'md' }}>
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
              {med && med.map((addNewMed)) => (
                <Box>
                  <Heading>
                    {addNewMed.medName}{" "}
                    <Badge color="blue" onClick={() => handleMedDelete(addNewMed.id)}>
                      <DeleteIcon />
                    </Badge>
                  </Heading>
                  <Text>Quantity: {addNewMed.qtyPerTake}</Text>
                  <Text>Frequency: {addNewMed.freqPerDay}</Text>
                  <Text>Time of treatment: {addNewMed.timeOfTreatment}</Text>
                </Box>
              )}
            </SimpleGrid>
          </Box>
        </Stack>

      </Stack>
    </Container>
  )
}
