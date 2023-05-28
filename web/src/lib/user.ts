import { cookies } from 'next/headers'
import decode from 'jwt-decode'

export interface UserData {
  email: string
  name: string
}

export function GetUser(): UserData {
  const token = cookies().get('token')?.value

  if (!token || token === undefined) {
    throw new Error('Unauthenticated.')
  }

  const user: UserData = decode(token)

  return user
}
