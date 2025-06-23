#!/bin/bash

# Script de build para Favorite Contents API
# Uso: ./build.sh [dev|prod]

set -e

echo "🚀 Favorite Contents API - Script de Build"

# Verificar argumentos
if [ "$1" = "dev" ]; then
    echo "📦 Modo: Desenvolvimento"
    COMPOSE_FILE="docker-compose.dev.yml"
elif [ "$1" = "prod" ]; then
    echo "📦 Modo: Produção"
    COMPOSE_FILE="docker-compose.yml"
else
    echo "❌ Uso: ./build.sh [dev|prod]"
    echo "   dev  - Desenvolvimento com hot reload"
    echo "   prod - Produção otimizada"
    exit 1
fi

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado"
    exit 1
fi

echo "🔧 Iniciando build..."

# Parar containers existentes
echo "🛑 Parando containers existentes..."
docker-compose -f $COMPOSE_FILE down 2>/dev/null || true

# Build e start
echo "🏗️  Fazendo build e iniciando containers..."
docker-compose -f $COMPOSE_FILE up --build -d

echo "✅ Build concluído!"
echo ""
echo "🌐 API disponível em: http://localhost:3000"
echo "📚 Documentação: http://localhost:3000/reference"
echo "🏥 Health Check: http://localhost:3000/api/health"
echo ""
echo "📋 Logs: docker-compose -f $COMPOSE_FILE logs -f"
echo "🛑 Parar: docker-compose -f $COMPOSE_FILE down" 