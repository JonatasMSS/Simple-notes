import { FastifyInstance } from 'fastify'
import { prisma } from '../libs/prisma'
import { z } from 'zod'

export async function NotesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/notes', async (request) => {
    const notes = await prisma.note.findMany({
      where: {
        userId: request.user.name,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
    return notes
  })
  app.post('/notes', async (request) => {
    const bodySchema = z.object({
      title: z.string(),
      content: z.string(),
    })

    const { content, title } = bodySchema.parse(request.body)

    const notes = await prisma.note.create({
      data: {
        title,
        content,
        userId: request.user.name,
      },
    })

    return {
      msg: 'Nota criada com sucesso',
      id: notes.id,
    }
  })

  app.put('/notes/:id', async (request, reply) => {
    const paramSchema = z.object({
      id: z.string(),
    })

    const { id } = paramSchema.parse(request.params)

    const bodySchema = z.object({
      content: z.string(),
      title: z.string(),
    })

    const { content, title } = bodySchema.parse(request.body)

    let note = await prisma.note.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (note.userId !== request.user.name) {
      return reply.code(401).send()
    }

    note = await prisma.note.update({
      where: {
        id,
      },
      data: {
        content,
        title,
      },
    })

    return note
  })

  app.delete('/notes/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramSchema.parse(request.params)

    await prisma.note.delete({
      where: {
        id,
      },
    })

    return {
      msg: 'Nota removida com sucesso',
      id,
    }
  })
}
