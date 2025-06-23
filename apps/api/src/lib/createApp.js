"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const fastify_api_reference_1 = __importDefault(require("@scalar/fastify-api-reference"));
const fastify_1 = require("fastify");
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const cors_1 = __importDefault(require("@fastify/cors"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const fastify_type_provider_zod_2 = require("fastify-type-provider-zod");
const process_1 = require("process");
const createApp = () => {
    const app = (0, fastify_1.fastify)({
        logger: {
            level: process_1.env.LOG_LEVEL,
        },
    }).withTypeProvider();
    // Configurar validadores e serializadores do Zod
    app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
    app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
    // Configurar CORS
    app.register(cors_1.default, {
        origin: "http://localhost:3000".split(","),
        credentials: true,
    });
    // Configurar Swagger
    app.register(swagger_1.default, {
        openapi: {
            info: {
                title: "Favorite Content API",
                description: "API para gerenciar seus conteúdos favoritos",
                version: "1.0.0",
            },
            servers: [
                {
                    url: `http://localhost:${process_1.env.PORT}`,
                    description: "Development",
                },
            ],
        },
        transform: fastify_type_provider_zod_2.jsonSchemaTransform,
    });
    app.register(fastify_api_reference_1.default, {
        routePrefix: "/reference",
    });
    // Rota de health check
    app.after(() => {
        app.get("/api/health", {
            schema: {
                tags: ["Health"],
                summary: "Verificação de saúde da aplicação",
                description: "Endpoint para verificar se a aplicação está funcionando corretamente",
            },
        }, (_, reply) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // Verificar conexão com o banco
                // await prisma.$queryRaw`SELECT 1`;
                return reply.send({
                    status: "ok",
                    timestamp: new Date().toISOString(),
                    version: process_1.env.API_VERSION,
                    database: "connected",
                });
            }
            catch (error) {
                return reply.status(503).send({
                    status: "error",
                    timestamp: new Date().toISOString(),
                    version: process_1.env.API_VERSION,
                    database: "disconnected",
                });
            }
        }));
    });
    // Handler global de erros
    app.setErrorHandler((error, request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        request.log.error({
            error: error.message,
            stack: error.stack,
            method: request.method,
            url: request.url,
        }, "Request error");
        // Errors do Zod (validação)
        if (error.validation) {
            return reply.status(400).send({
                error: "Erro de validação",
                message: "Os dados enviados não são válidos",
                details: error.validation.map((error) => ({ message: error.message })),
            });
        }
        // Outros erros
        const statusCode = error.statusCode || 500;
        return reply.status(statusCode).send({
            error: statusCode === 500 ? "Erro interno do servidor" : error.message,
            message: process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }));
    // Handler para rotas não encontradas
    app.setNotFoundHandler((request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        return reply.status(404).send({
            error: "Rota não encontrada",
            path: request.url,
        });
    }));
    // Graceful shutdown
    const gracefulShutdown = () => __awaiter(void 0, void 0, void 0, function* () {
        app.log.info("Shutting down gracefully...");
        try {
            // await prisma.$disconnect();
            app.log.info("Database disconnected");
            yield app.close();
            app.log.info("Server closed");
            process.exit(0);
        }
        catch (error) {
            app.log.error("Error during shutdown:", error);
            process.exit(1);
        }
    });
    process.on("SIGINT", gracefulShutdown);
    process.on("SIGTERM", gracefulShutdown);
    return app;
};
exports.createApp = createApp;
