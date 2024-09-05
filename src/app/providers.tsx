'use client'

import { FC, ReactNode } from 'react'

import { Auth0Provider } from '@auth0/auth0-react'

import { LineProvider } from '@/features/line/Liff'

import { ChakraProvider } from '@/components/design-system'

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ChakraProvider>
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string}
        authorizationParams={{
          redirect_uri: window.location.origin,
          connection: 'line',
        }}
      >
        <LineProvider>{children}</LineProvider>
      </Auth0Provider>
    </ChakraProvider>
  )
}
