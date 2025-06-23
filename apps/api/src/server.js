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
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
// Inicializar servidor
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const port = Number((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000);
    try {
        yield app_1.app.listen({ port, host: "0.0.0.0" });
        app_1.app.log.info(`Servidor rodando na porta ${process.env.PORT} na versão ${process.env.API_VERSION}`);
        app_1.app.log.info(`Ambiente: ${process.env.NODE_ENV}`);
        app_1.app.log.info(`Documentação disponível em: http://localhost:${process.env.PORT}/reference`);
    }
    catch (error) {
        console.log(error);
        app_1.app.log.error("Erro ao iniciar o servidor:", error);
        process.exit(1);
    }
});
start();
