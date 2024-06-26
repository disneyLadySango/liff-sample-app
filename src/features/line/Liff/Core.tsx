'use client'

import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import liff, { Liff } from '@line/liff'

import { useToast } from '@/components/design-system'

const LiffInstanceContext = createContext<Liff | null>(null)
const LiffErrorContext = createContext<Error | null>(null)

export const LineProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [liffInstance, setLiffInstance] = useState<Liff | null>(null)
  const [liffError, setLiffError] = useState<Error | null>(null)

  const toast = useToast()

  useEffect(() => {
    console.log('start liff.init()...')
    if (liffInstance) {
      return
    }
    liff
      .init({
        liffId: process.env.LIFF_ID as string,
      })
      .then(() => {
        console.log('liff.init() success')
        toast({
          title: 'LINE SDK Initialized',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        setLiffInstance(liff)
      })
      .catch((err) => {
        console.error('liff.init() failed', err)
        toast({
          title: 'LINE SDK Initialization Failed',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        setLiffError(err)
      })
  }, [liffInstance, toast])

  return (
    <LiffInstanceContext.Provider value={liffInstance}>
      <LiffErrorContext.Provider value={liffError}>
        {children}
      </LiffErrorContext.Provider>
    </LiffInstanceContext.Provider>
  )
}

export const useLiffInstance = (): Liff | null => {
  const context = useContext(LiffInstanceContext)
  if (context === undefined) {
    throw new Error('useLine must be used within a LineProvider')
  }
  return context
}

export const useLiffError = (): Error | null => {
  const context = useContext(LiffErrorContext)
  if (context === undefined) {
    throw new Error('useLine must be used within a LineProvider')
  }
  return context
}
