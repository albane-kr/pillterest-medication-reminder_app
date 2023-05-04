'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, ThemeProvider, theme, ColorModeProvider, CSSReset } from '@chakra-ui/react'

export function Providers({ 
    children 
  }) {
  return (
    <CacheProvider>
        <ChakraProvider>
          <ThemeProvider theme={theme}>
            <ColorModeProvider>
              <CSSReset/>
              {children}
            </ColorModeProvider>
          </ThemeProvider> 
        </ChakraProvider>
    </CacheProvider>
  )
}