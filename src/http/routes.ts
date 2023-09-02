import { FastifyInstance } from 'fastify'

export async function Routes(app: FastifyInstance) {
  app.get('/hello', (req, res) => {
    res.send(200)
  })
}
