'use client'

import React from 'react'
import Link from 'next/link'
import { Container, Heading, Box, Input, Button, Stack, Select, HStack, useToast} from "@chakra-ui/react";
import { addMed, toggleMedName } from '@/backend/firebase/firestore/db'
import { useState } from 'react';
import { useAuth } from '@/backend/context/authContext';

export default function NewMed() {

  const {isLoggedIn, user} = useAuth()
  const toast = useToast();

  const [medName, setMedName] = useState("")
  const [qtyPerTake, setQtyPerTake] = useState("")
  const [freqPerDay, setFreqPerDay] = useState("")
  const [timeOfTreatment, setTimeOfTreatment] = useState("")
  //const [uId, setUserId] = useState(null)
  //const [stockLeft, setStockLeft] = useState("")
  
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
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Heading>Describe your new medication</Heading>
      </Stack>
      <Box
        py={{ base: '0', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        bg={{ base: 'transparent', sm: 'bg-surface' }}
        boxShadow={{ base: 'none', sm: 'md' }}
        borderRadius={{ base: 'none', sm: 'xl' }}
      >
        <Stack direction='column'>
          <HStack spacing={4}>
            <Select placeholder='Name of medication' value={medName} onChange={(e) => setMedName(e.target.value)}>
              <option value={"name1"}>name1</option>
              <option value={"name2"}>name2</option>
            </Select>
            <Button>
              <Link href="/home/newMed/createMed/">
                +
              </Link>
            </Button>
          </HStack>
          <Input placeholder='Quantity per take' value={qtyPerTake} onChange={(e) => setQtyPerTake(e.target.value)} />
          <Input placeholder='Frequency per day' value={freqPerDay} onChange={(e) => setFreqPerDay(e.target.value)} />
          <Input placeholder='Time of treatment' value={timeOfTreatment} onChange={(e) => setTimeOfTreatment(e.target.value)} />
          <Button onClick={() => handleAddMed()} disabled={freqPerDay.length < 1 || toggleMedName.length < 1 || qtyPerTake.length < 1 || timeOfTreatment.length < 1}>
            Add        
          </Button>
          <Button>
            <Link href="/home">
              Finish
            </Link>
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}
