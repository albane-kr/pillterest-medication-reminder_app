'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Container, Heading, Box, Input, Button, Textarea, Stack, Select, } from "@chakra-ui/react";
import { createMed, toggleDrugAdminType } from '@/backend/firebase/firestore/db'


export default function CreateMed() {

  const [medName, setMedName] = useState("")
  const [drugAdminType, setDrugAdminTime] = useState("")
  const [qtyPackage, setQtyPackage] = useState("")
  
  const handleCreateMed = async () => {
  
    const createNewMed = { medName, drugAdminType, qtyPackage }

    await createMed(createNewMed)
    setMedName("")
    setDrugAdminTime("")
    setQtyPackage("")
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
          <Input placeholder='Name of the medication' value={medName} onChange={(e) => setMedName(e.target.value)} />
          <Select placeholder='Drug Administration Type' value={drugAdminType} onChange={(e) => setDrugAdminTime(e.target.value)}>
            <option value={"pills"}>pills</option>
          </Select>
          <Input placeholder='Quantity of pills per package' value={qtyPackage} onChange={(e) => setQtyPackage(e.target.value)} />
          <Button onClick={() => handleCreateMed()} disabled={medName.length < 1 || toggleDrugAdminType.length < 1 || qtyPackage.length < 1}>
            Create        
          </Button>
          <Button>
            <Link href="/home/newMed">
              Finish
            </Link>
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}
