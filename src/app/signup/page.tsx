'use client'

import { FC, useEffect, useState } from 'react'

import { useLiffInstance, useLiffError } from '@/features/line/Liff'

import {
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Input,
  Flex,
  Select,
  Button,
  Text,
} from '@/components/design-system'

const Page: FC = () => {
  const liff = useLiffInstance()
  const liffError = useLiffError()

  const [profileName, setProfileName] = useState<string | null>(null)

  useEffect(() => {
    if (liff === null) {
      return
    }

    liff.getProfile().then((profile) => {
      setProfileName(profile.displayName)
    })
  }, [liff])

  if (liffError !== null) {
    return (
      <chakra.div maxW="500px" mx="auto" py="12" px="4">
        <Text fontSize="xl" color="red">
          LINE SDKの初期化に失敗しました
        </Text>
        <Text>{liffError.message}</Text>
      </chakra.div>
    )
  }

  if (liff === null) {
    return (
      <chakra.div maxW="500px" mx="auto" py="12" px="4">
        ...loading
      </chakra.div>
    )
  }

  if (!liff.isLoggedIn()) {
    return (
      <chakra.div maxW="500px" mx="auto" py="12" px="4">
        <Text fontSize="xl" color="red">
          LINEアプリから開いてください
        </Text>
      </chakra.div>
    )
  }

  return (
    <chakra.div maxW="500px" mx="auto" py="12" px="4">
      <Heading as="h1" aria-level={1}>
        会員登録（サンプル）
      </Heading>
      <Text>{profileName}さんの情報を設定してください</Text>
      <Stack
        as="form"
        mt="8"
        action="post"
        onSubmit={(e) => {
          e.preventDefault()
          console.log('submit')
        }}
      >
        <FormControl>
          <FormLabel htmlFor="">名前</FormLabel>
          <Flex gap="4">
            <Input name="lastName" placeholder="姓" />
            <Input name="firstName" placeholder="名" />
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel>フリガナ</FormLabel>
          <Flex gap="4">
            <Input name="lastNameKana" placeholder="セイ" />
            <Input name="firstNameKana" placeholder="メイ" />
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel>生年月日</FormLabel>
          <Flex gap="4">
            <Select placeholder="年">
              <option value="2020">2020</option>
            </Select>
            <Select placeholder="月">
              <option value="1">1</option>
            </Select>
            <Select placeholder="日">
              <option value="1">1</option>
            </Select>
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel>電話番号</FormLabel>
          <Input placeholder="電話番号" />
        </FormControl>
        <p>etc...</p>
        <Button type="submit">登録する</Button>
      </Stack>
    </chakra.div>
  )
}

export default Page
