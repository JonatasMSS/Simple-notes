import { api } from '@/lib/api'
import { debug } from 'console'

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const paramCode = searchParams.get('code')
  debug(paramCode)
  const registerResponse = await api.post('/register', {
    code: paramCode,
  })
  const { userToken } = registerResponse.data
  const timeToExpire = 60 * 60 * 24
  const redirectURL = new URL('/', request.url)
  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${userToken}; path=/; max-age=${timeToExpire};`,
    },
  })
}
