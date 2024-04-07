'use client'

import { useLiffInstance } from '@/features/line/Liff'

import { Button, useToast } from '@/components/design-system'

export const LineProfileGetButton = () => {
  const liff = useLiffInstance()
  const toast = useToast()

  const handleClick = () => {
    if (!liff) {
      return
    }
    console.log('liff.getProfile()...')
    liff
      .getProfile()
      .then((profile) => {
        console.log('profile:', profile)
        toast({
          title: `あなたの名前は${profile.displayName}です`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      })
      .catch((err) => {
        console.error('liff.getProfile() failed', err)
        toast({
          title: 'LINE Profile Get Failed',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      })
  }

  if (!liff) {
    return null
  }

  return <Button onClick={() => handleClick()}>Get</Button>
}
