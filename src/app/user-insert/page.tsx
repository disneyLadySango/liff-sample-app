'use client'

import { FC, useState } from 'react'

import { useAuth0 } from '@auth0/auth0-react'

import { useLiffInstance } from '@/features/line/Liff'

import { chakra, Button } from '@/components/design-system'

const UserInsertPage: FC = () => {
  const [requestBody, setRequestBody] = useState<string | null>(null)

  const liff = useLiffInstance()

  const auth = useAuth0()

  const onInsert = async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string
    const apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string

    alert('登録処理を開始します')

    const profile = await liff?.getProfile()

    alert(`プロフィール取得完了: ${profile?.userId}`)

    const userId = auth.user?.sub

    const accessToken = await auth.getAccessTokenSilently()

    alert(`アクセストークン取得完了: ${accessToken}`)

    const body = {
      line_id: profile?.userId,
      id_token: userId,
    }
    setRequestBody(JSON.stringify({ ...body, accessToken }))
    const result = await fetch(`${url}/rest/v1/users`, {
      headers: {
        apikey: apiKey,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'POST',
      body: JSON.stringify(body),
    })
    if (!result.ok) {
      console.error('Failed to insert user:', result)
      alert('ユーザー登録に失敗しました')
      return
    }
    alert('ユーザー登録に成功しました')
  }

  return (
    <chakra.div>
      <chakra.div>
        <Button onClick={() => onInsert()}>登録処理！！！</Button>
      </chakra.div>
      <chakra.div>Request:{requestBody}</chakra.div>
    </chakra.div>
  )
}

export default UserInsertPage
