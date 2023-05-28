import { FastifyInstance } from 'fastify'

import 'dotenv'
import { z } from 'zod'
import axios from 'axios'
import { prisma } from '../libs/prisma'

export async function AuthRoute(app: FastifyInstance) {
  app.post('/register', async (request) => {
    try {
      const bodySchema = z.object({
        code: z.string(),
      })

      const { code } = bodySchema.parse(request.body)

      const data = {
        grant_type: 'authorization_code',
        client_id: process.env.PUBLIC_ID_CLIENT,
        client_secret: process.env.SECRET_ID_CLIENT,
        code,
        redirect_uri: process.env.REDIRECT_URL,
      }

      const authEncoded = btoa(
        `${process.env.PUBLIC_ID_CLIENT}:${process.env.SECRET_ID_CLIENT}`,
      )

      const tokens = await axios.post(
        `${process.env.COGNITO_USER_POOL_URL}/oauth2/token`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Basic ${authEncoded}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )

      const { access_token } = tokens.data

      const userInfo = await axios.get(
        `${process.env.COGNITO_USER_POOL_URL}/oauth2/userInfo`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )

      const userSchema = z.object({
        sub: z.string(),
        username: z.string(),
        email: z.string(),
      })

      const userData = userSchema.parse(userInfo.data)

      const user = await prisma.user.findUnique({
        where: {
          aws_id: userData.sub,
        },
      })

      if (!user) {
        await prisma.user.create({
          data: {
            aws_id: userData.sub,
            email: userData.email,
            name: userData.username,
          },
        })
      }

      const token = app.jwt.sign(
        {
          email: userData.email,
          name: userData.username,
        },
        {
          sub: user?.id,
          expiresIn: '24h',
        },
      )

      return {
        userToken: token,
      }
    } catch (error) {
      return {
        mgs: 'error',
        error,
      }
    }
  })
}
