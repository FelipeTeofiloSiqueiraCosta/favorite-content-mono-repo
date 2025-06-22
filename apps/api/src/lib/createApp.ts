
import ScalarApiReference from "@scalar/fastify-api-reference";
import { fastify } from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import { env } from "process";
import z from "zod";

export const createApp = () => {
  const app = fastify({
      logger: {
          level: env.LOG_LEVEL,
      },
  }).withTypeProvider<ZodTypeProvider>();

  // Configurar validadores e serializadores do Zod
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  // Configurar CORS
  app.register(fastifyCors, {
      origin: "http://localhost:3000".split(","),
      credentials: true,
  });

  // Configurar Swagger
  app.register(fastifySwagger, {
      openapi: {
          info: {
              title: "Favorite Content API",
              description: "API para gerenciar seus conteúdos favoritos",
              version: "1.0.0",
          },
          servers: [
              {
                  url: `http://localhost:${env.PORT}`,
                  description: "Development",
              },
          ],
      },
      transform: jsonSchemaTransform,
  });

  app.register(ScalarApiReference, {
      routePrefix: "/reference",
  });

  // Rota de health check
  app.after(() => {
      app.get(
          "/api/health",
          {
              schema: {
                  tags: ["Health"],
                  summary: "Verificação de saúde da aplicação",
                  description:
                      "Endpoint para verificar se a aplicação está funcionando corretamente",
              },
          },
          async (_, reply) => {
              try {
                  // Verificar conexão com o banco
                  // await prisma.$queryRaw`SELECT 1`;

                  return reply.send({
                      status: "ok",
                      timestamp: new Date().toISOString(),
                      version: env.API_VERSION,
                      database: "connected",
                  });
              } catch (error) {
                  return reply.status(503).send({
                      status: "error",
                      timestamp: new Date().toISOString(),
                      version: env.API_VERSION,
                      database: "disconnected",
                  });
              }
          }
      );
  });

  // Handler global de erros
  app.setErrorHandler(async (error, request, reply) => {
      request.log.error(
          {
              error: error.message,
              stack: error.stack,
              method: request.method,
              url: request.url,
          },
          "Request error"
      );

      // Errors do Zod (validação)
      if (error.validation) {
          return reply.status(400).send({
              error: "Erro de validação",
              message: "Os dados enviados não são válidos",
              details: error.validation.map((error)=> ({message: error.message})),
          });
      }

      // Outros erros
      const statusCode = error.statusCode || 500;
      return reply.status(statusCode).send({
          error: statusCode === 500 ? "Erro interno do servidor" : error.message,
          message: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
  });

  // Handler para rotas não encontradas
  app.setNotFoundHandler(async (request, reply) => {
      return reply.status(404).send({
          error: "Rota não encontrada",
          path: request.url,
      });
  });

  // Graceful shutdown
  const gracefulShutdown = async () => {
      app.log.info("Shutting down gracefully...");

      try {
          // await prisma.$disconnect();
          app.log.info("Database disconnected");

          await app.close();
          app.log.info("Server closed");

          process.exit(0);
      } catch (error) {
          app.log.error("Error during shutdown:", error);
          process.exit(1);
      }
  };

  process.on("SIGINT", gracefulShutdown);
  process.on("SIGTERM", gracefulShutdown);

  return app;
};