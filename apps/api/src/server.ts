
import { app } from "./app";

// Inicializar servidor
const start = async () => {
  const port = Number(process.env.PORT ?? 3000)
  try {
    await app.listen({ port, host: "0.0.0.0" });
    app.log.info(`Servidor rodando na porta ${process.env.PORT} na versão ${process.env.API_VERSION}`);
    app.log.info(`Ambiente: ${process.env.NODE_ENV}`);
    app.log.info(`Documentação disponível em: http://localhost:${process.env.PORT}/reference`);
  } catch (error) {
    console.log(error)
    app.log.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
};

start();