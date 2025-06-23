# 🚀 Favorite Contents API

Uma API moderna e robusta para gerenciar seus conteúdos favoritos, construída com **Fastify**, **TypeScript**, **Prisma** e **PostgreSQL**.

## ✨ Características

- ⚡ **Fastify** - Framework web ultra-rápido para Node.js
- 🔒 **TypeScript** - Tipagem estática para maior segurança
- 🗄️ **Prisma** - ORM moderno para PostgreSQL
- 📚 **Swagger/Scalar** - Documentação automática da API
- 🐳 **Docker** - Containerização completa
- 🔄 **CORS** - Suporte a requisições cross-origin
- ✅ **Zod** - Validação de schemas
- 🏥 **Health Check** - Monitoramento de saúde da aplicação

## 🛠️ Tecnologias

- **Runtime**: Node.js 18+
- **Framework**: Fastify 5.4.0
- **Database**: PostgreSQL 16
- **ORM**: Prisma 6.10.1
- **Language**: TypeScript 5.8.2
- **Validation**: Zod 3.25.67
- **Documentation**: Scalar API Reference

## 📋 Pré-requisitos

- Node.js 18 ou superior
- Docker e Docker Compose
- PostgreSQL (opcional, se não usar Docker)

## 🚀 Como Executar

### Opção 1: Com Docker (Recomendado)

#### Para Produção:

```bash
cd apps/api
docker-compose up --build
```

#### Para Desenvolvimento (com hot reload):

```bash
cd apps/api
docker-compose -f docker-compose.dev.yml up --build
```

#### A API estará disponível em:

- **API**: http://localhost:3000
- **Documentação**: http://localhost:3000/reference
- **Health Check**: http://localhost:3000/api/health

### Opção 2: Desenvolvimento Local

1. **Instale as dependências do monorepo:**

   ```bash
   # Na raiz do projeto
   npm install
   ```

2. **Configure as variáveis de ambiente:**

   ```bash
   cd apps/api
   cp .env.example .env
   ```

   Edite o arquivo `.env` com suas configurações:

   ```env
   DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydatabase"
   PORT=3000
   NODE_ENV=development
   API_VERSION=1.0.0
   LOG_LEVEL=info
   ```

3. **Execute o banco de dados (se não usar Docker):**

   ```bash
   # Instale PostgreSQL localmente ou use Docker
   docker run --name postgres_container -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydatabase -p 5432:5432 -d postgres:16
   ```

4. **Execute as migrações do Prisma:**

   ```bash
   npx prisma migrate dev
   ```

5. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

## 📚 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor com hot reload

# Build
npm run build        # Compila o TypeScript

# Docker
docker-compose up                    # Produção
docker-compose -f docker-compose.dev.yml up  # Desenvolvimento
docker-compose down                  # Para todos os serviços
```

## 🐳 Docker

### Arquivos Docker Disponíveis

- `Dockerfile` - Para desenvolvimento
- `Dockerfile.monorepo` - Para produção (otimizado)
- `docker-compose.yml` - Configuração de produção
- `docker-compose.dev.yml` - Configuração de desenvolvimento

### Serviços Disponíveis

1. **app** - Aplicação Node.js (porta 3000)
2. **db** - PostgreSQL (porta 5432)

### Volumes

- `postgres_data` - Dados persistentes do PostgreSQL (produção)
- `postgres_data_dev` - Dados persistentes do PostgreSQL (desenvolvimento)

### Variáveis de Ambiente (Docker)

```env
DATABASE_URL=postgres://myuser:mypassword@db:5432/mydatabase
NODE_ENV=production
PORT=3000
API_VERSION=1.0.0
LOG_LEVEL=info
```

## 🔧 Configuração de Desenvolvimento

### Estrutura de Arquivos

```
src/
├── app.ts              # Configuração principal da aplicação
├── server.ts           # Inicialização do servidor
├── lib/
│   └── createApp.ts    # Factory da aplicação Fastify
└── routes/
    └── content.route.ts # Rotas de conteúdo
```

### Variáveis de Ambiente

```env
DATABASE_URL=postgresql://user:password@host:port/database
PORT=3000
NODE_ENV=development
API_VERSION=1.0.0
LOG_LEVEL=info
```

## 📖 Documentação da API

A documentação interativa está disponível em:

- **URL**: http://localhost:3000/reference
- **Tecnologia**: Scalar API Reference
- **Especificação**: OpenAPI 3.0

## 🚨 Troubleshooting

### Problemas Comuns

1. **Erro 404 - @repo/eslint-config não encontrado:**

   ```bash
   # Use o docker-compose.dev.yml para desenvolvimento
   docker-compose -f docker-compose.dev.yml up --build

   # Ou execute localmente com npm install na raiz
   npm install && cd apps/api && npm run dev
   ```

2. **Porta 3000 já em uso:**

   ```bash
   # Altere a porta no .env ou docker-compose.yml
   PORT=3001
   ```

3. **Erro de conexão com banco:**

   ```bash
   # Verifique se o PostgreSQL está rodando
   docker ps

   # Reinicie os containers
   docker-compose down && docker-compose up --build
   ```

4. **Erro de permissão no Docker:**

   ```bash
   # No Linux/Mac, pode ser necessário
   sudo docker-compose up --build
   ```

5. **Problemas com workspaces do monorepo:**

   ```bash
   # Certifique-se de estar na raiz do projeto
   cd /path/to/favorite-contents
   npm install

   # Ou use o Dockerfile.monorepo
   docker-compose up --build
   ```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ para gerenciar conteúdos favoritos de forma eficiente.

---

**Status**: 🟡 Em Desenvolvimento  
**Versão**: 1.0.0  
**Última Atualização**: Dezembro 2024
