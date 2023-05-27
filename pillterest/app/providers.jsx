'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, ThemeProvider, theme, CSSReset } from '@chakra-ui/react'

export function Providers({ 
    children 
  }) {
  return (
    <CacheProvider>
        <ChakraProvider>
          <ThemeProvider theme={theme}>
            <CSSReset/>
              {children}
          </ThemeProvider> 
        </ChakraProvider>
    </CacheProvider>
  )
}