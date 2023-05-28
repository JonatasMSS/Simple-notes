import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import 'dotenv'
import { NotesRoutes } from './routes/notes'
import { AuthRoute } from './routes/auth'

const app = fastify()

app.register(NotesRoutes)
app.register(AuthRoute)

app.register(cors, {
  origin: true,
})
app.register(jwt, {
  secret: `${process.env.SECRET_KEY_JWT}`,
})
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 Listen and running in localhost:3333')
  })
