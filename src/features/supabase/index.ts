import { useAuth0 } from '@auth0/auth0-react'
import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
  const auth = useAuth0()

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string,
    {
      accessToken: async () => {
        const accessToken = await auth.getAccessTokenSilently()

        // Alternatively you can use (await auth.getIdTokenClaims()).__raw to
        // use an ID token instead.

        return accessToken
      },
    },
  )

  return client
}
