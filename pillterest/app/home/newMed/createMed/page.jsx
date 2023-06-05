'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Container, Heading, Box, Input, Button, Stack, Select, useToast } from "@chakra-ui/react";
import { createMed, toggleDrugAdminType } from '@/backend/firebase/firestore/db'


export default function CreateMed() {

  const [medName, setMedName] = useState("")
  const [drugAdminType, setDrugAdminType] = useState("")
  const toast = useToast()
  
  /**
   * apply backend function to create new medication
   */
  const handleCreateMed = async () => {
  
    const createNewMed = { medName, drugAdminType }

    await createMed(createNewMed)
    setMedName("")
    setDrugAdminType("")
    toast({ title: "Medication created successfully", status: "success" })
  }

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }} backgroundColor='purple.50'>
      <Stack spacing="8">
        <Heading>Describe your new medication</Heading>
      </Stack>
      <Box
        py={{ base: '4', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        bg={{ base: 'transparent', sm: 'bg-surface' }}
        boxShadow={{ base: 'none', sm: 'md' }}
        borderRadius={{ base: 'none', sm: 'xl' }}
        backgroundColor='purple.100'
      >
        <Stack direction='column'>
          <Input borderColor='black' 
            placeholder='Name of the medication' 
            value={medName} 
            onChange={(e) => setMedName(e.target.value)} />
          <Select borderColor='black' 
            placeholder='Drug Administration Type' 
            value={drugAdminType} 
            onChange={(e) => setDrugAdminType(e.target.value)}>
              <option value={"pills"}>pills</option>
              <option value={"tsp"}>tsp</option>
              <option value={"tbsp"}>tbsp (1tbsp = 3tsp)</option>
              <option value={"capsule"}>capsule</option>
              <option value={"phial"}>phial</option>
          </Select>
          <Button colorScheme='blue' 
          onClick={() => handleCreateMed()} disabled={medName.length < 1 || toggleDrugAdminType.length < 1}>
            Create        
          </Button>
          <Button colorScheme='blue'>
            <Link href="/home/newMed">
              Finish
            </Link>
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}
