import { fastify } from 'fastify'
import { Routes } from './http/routes'

export const app = fastify({
  logger: true,
})

app.register(Routes)

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then(() => {
    console.log('listening server run on port 3333')
  })
