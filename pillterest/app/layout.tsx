'use client'

import { AuthContextProvider } from '../backend/context/authContext'
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthContextProvider>
            {children}
          </AuthContextProvider>
        </Providers>
      </body>
    </html>
  );
}