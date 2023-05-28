import { AuthenticatedNotes } from '@/components/AuthenticNotes'
import { LocalNotes } from '@/components/LocalNotes'

import { cookies } from 'next/headers'

export default function Home() {
  const tokenData = cookies().get('token')?.value

  return tokenData ? <AuthenticatedNotes token={tokenData} /> : <LocalNotes />
}
