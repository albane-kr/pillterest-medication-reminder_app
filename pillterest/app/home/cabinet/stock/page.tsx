'use client'

import React from 'react'
import Link from 'next/link'
import { Box, IconButton, Button, Card, CardHeader, CardBody, CardFooter, Checkbox, InputGroup, InputRightElement, Skeleton, Container, Heading, VStack, StackDivider, HStack, Input, Stack, Text } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

export default function Stock() {
  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '12', sm: '16' }}>
      <Stack spacing="8">
        <Stack spacing="8" textAlign="center">
          <Heading size={{ base: 'md', md: 'lg' }}>
            Modify my current stock
          </Heading>
        </Stack>
        <Stack>
          <Heading size={{ base: 'sd', md: 'md' }}>
            Name of medication
          </Heading>
        </Stack>
        <Stack>
          <Heading size={{ base: 'sd', md: 'md' }}>
            Quantity of full packages
          </Heading>
        </Stack>
        <Stack>
          <Heading size={{ base: 'sd', md: 'md' }}>
            Quantity of opened packages
          </Heading>
        </Stack>
        <Stack>
          <Heading size={{ base: 'sd', md: 'md' }}>
            Quantity of pills left
          </Heading>
        </Stack>
      </Stack>
    </Container>

  )
}
