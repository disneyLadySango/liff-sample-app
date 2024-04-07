import { FC, ReactNode } from 'react'

import { LineProvider } from '@/features/line/Provider'

import { ChakraProvider } from '@/components/design-system'

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ChakraProvider>
      <LineProvider>{children}</LineProvider>
    </ChakraProvider>
  )
}
