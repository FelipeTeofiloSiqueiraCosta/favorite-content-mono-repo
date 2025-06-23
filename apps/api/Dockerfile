FROM node:18-slim

WORKDIR /usr/src/app

# Copiar arquivos de configuração do monorepo
COPY package*.json ./
COPY .npmrc ./
COPY turbo.json ./

# Copiar packages do monorepo
COPY packages/ ./packages/

# Instalar dependências do monorepo
RUN npm install

# Copiar o resto dos arquivos da API
COPY apps/api/ ./apps/api/

# Navegar para a pasta da API
WORKDIR /usr/src/app/apps/api

# Instalar dependências específicas da API
RUN npm install

# Build da aplicação
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]