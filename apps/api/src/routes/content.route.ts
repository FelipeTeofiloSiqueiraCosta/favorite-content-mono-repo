import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'


export const contentRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get('/', {
    schema: {
      tags: ["Content"],
      summary: "Criar novo conteúdo",
      description: "Cria um novo conteúdo no sistema",
      
    }
  }, (req, reply)=>{

    reply.code(201).send({ body: req.body })
  })

  
}
