'use client'

import React from 'react'
import Link from 'next/link'
import { Box, IconButton, Button, Card, CardHeader, CardBody, CardFooter, Checkbox, InputGroup, InputRightElement, Skeleton, Container, Heading, VStack, StackDivider, HStack, Input, Stack, Text } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

export default function Cabinet() {
  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '4', sm: '8' }}>
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
          <Card>
            <CardHeader>
              <HStack spacing='12'>
              <Heading size="sm">Name of med 1</Heading>
              <InputGroup>
                <InputRightElement>
                  <IconButton variant='ghost' colorScheme='black' aria-label='Delete medication' icon={<DeleteIcon />} />
                </InputRightElement>
              </InputGroup>
              </HStack>
            </CardHeader>
            <CardBody>
              <Text>Quantity</Text>
              <Text>Frequency</Text>
              <Text>Time of treatment</Text>
              <Text>Stock left</Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <HStack spacing='12'>
              <Heading size="sm">Name of med 2</Heading>
              <InputGroup>
                <InputRightElement>
                  <IconButton variant='ghost' colorScheme='black' aria-label='Delete medication' icon={<DeleteIcon />} />
                </InputRightElement>
              </InputGroup>
              </HStack>
            </CardHeader>
            <CardBody>
              <Text>Quantity</Text>
              <Text>Frequency</Text>
              <Text>Time of treatment</Text>
              <Text>Stock left</Text>
            </CardBody>
          </Card>
        </Stack>

      </Stack>
    </Container>
  )
}

/*<>
      <div>
        here will be the cabinet
      </div>
      <Link href="/cabinet/stock">Go to Stock Page</Link>
      <Link href="/">Link to Home Page</Link>
    </>*/