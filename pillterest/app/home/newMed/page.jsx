'use client'

import React from 'react'
import Link from 'next/link'
import { Container, Heading, Box, Input, Button, Stack, Select, HStack, useToast } from "@chakra-ui/react";
import { addMed, toggleMedName } from '@/backend/firebase/firestore/db'
import { useState, useEffect } from 'react';
import { useAuth } from '@/backend/context/authContext';
import { db } from "@/backend/firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function NewMed() {

  const { isLoggedIn, user } = useAuth()
  const toast = useToast();

  const [medName, setMedName] = useState("")
  const [medNameOption, setMedNameOption] = useState([])
  const [qtyPerTake, setQtyPerTake] = useState("")
  const [freqPerDay, setFreqPerDay] = useState("")
  const [timeOfTreatment, setTimeOfTreatment] = useState("")
  //const [uId, setUserId] = useState(null)
  //const [stockLeft, setStockLeft] = useState("")



  const refreshData = async () => {
    if (!user) {
      setMedNameOption([])
      return
    }
    
    //get data from documents of the collection "Medications" 
    //and push them into an array to be able to map the different documents to display
    const collMedications = collection(db, "Medications")
    const qMed = query(collMedications)
    const querySnapshot = await getDocs(qMed, where('medicationName', '!==', null));
    let array = []
    querySnapshot.forEach((docSnap) => {
      array.push({ id: docSnap.id, ...docSnap.data() })
      console.log(docSnap.id, " => ", docSnap.data());
      setMedNameOption(array)
    });
  }

  useEffect(() => {
    refreshData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ user])

  const handleAddMed = async () => {

    if (!isLoggedIn) {
      toast({
        title: "You must be logged in to add a prescribed medication",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
      return;
    }

    const addNewMed = {
      medName,
      qtyPerTake,
      freqPerDay,
      timeOfTreatment,
      //stockLeft,
    }

    await addMed(addNewMed)
    setMedName("")
    setQtyPerTake("")
    setFreqPerDay("")
    setTimeOfTreatment("")
    /*setStockLeft("")*/
    //setUserId(userUId)
    toast({
      title: "Prescribed medication created successfully",
      status: "success"
    })
  }

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }} backgroundColor='purple.50'>
      <Stack spacing="8">
        <Heading>Describe your new medication</Heading>
      </Stack>
      <Box
        py={{ base: '0', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        bg={{ base: 'transparent', sm: 'bg-surface' }}
        boxShadow={{ base: 'none', sm: 'md' }}
        borderRadius={{ base: 'none', sm: 'xl' }}
        backgroundColor='purple.100'
      >
        <Stack direction='column'>
          <HStack spacing={4}>
            <Select borderColor='black' placeholder='Name of medication' value={medName} onChange={(e) => setMedName(e.target.value)}>
            {medNameOption && medNameOption.map((docSnap) =>
              <option key={docSnap.id} value={docSnap.medicationName}>{docSnap.medicationName}</option>
            )}
            </Select>
            <Button colorScheme='blue'>
              <Link href="/home/newMed/createMed/">
                +
              </Link>
            </Button>
          </HStack>
          <Input borderColor='black' placeholder='Quantity per take' value={qtyPerTake} onChange={(e) => setQtyPerTake(e.target.value)} />
          <Input borderColor='black' placeholder='Frequency per day' value={freqPerDay} onChange={(e) => setFreqPerDay(e.target.value)} />
          <Input borderColor='black' placeholder='Time of treatment dd/mm/yyyy-dd/mm/yyyy' value={timeOfTreatment} onChange={(e) => setTimeOfTreatment(e.target.value)} />
          <Button colorScheme='blue' onClick={() => handleAddMed()} disabled={freqPerDay.length < 1 || toggleMedName.length < 1 || qtyPerTake.length < 1 || timeOfTreatment.length < 1}>
            Add
          </Button>
          <Button colorScheme='blue'>
            <Link href="/home">
              Finish
            </Link>
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}
