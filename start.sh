#!/bin/bash

# ─────────────────────────────────────────
# Gourmetto — Script de arranque completo
# Levanta Docker, backend y frontend
# ─────────────────────────────────────────

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
SERVER_DIR="$PROJECT_DIR/server"
FRONTEND_DIR="$PROJECT_DIR/frontend"

echo ""
echo "🍃 Iniciando Gourmetto..."
echo "──────────────────────────"

# ── 1. Docker ──────────────────────────
if command -v docker &> /dev/null; then
  echo "🐳 Verificando Docker..."

  # Verificar si Docker está corriendo
  if ! docker info &> /dev/null; then
    echo "   Docker no está activo. Intentando iniciar Docker Desktop..."
    open -a Docker 2>/dev/null

    echo "   Esperando que Docker arranque..."
    until docker info &> /dev/null; do
      sleep 2
      echo -n "."
    done
    echo ""
    echo "   ✅ Docker listo"
  else
    echo "   ✅ Docker ya está corriendo"
  fi

  # Levantar los contenedores si no están corriendo
  if [ -f "$PROJECT_DIR/docker-compose.yml" ]; then
    RUNNING=$(docker compose -f "$PROJECT_DIR/docker-compose.yml" ps --status running --quiet 2>/dev/null | wc -l)
    if [ "$RUNNING" -lt 1 ]; then
      echo "🐳 Levantando contenedores..."
      docker compose -f "$PROJECT_DIR/docker-compose.yml" up -d
      echo "   ✅ Contenedores activos"
    else
      echo "   ✅ Contenedores ya están corriendo"
    fi
  fi
else
  echo "⚠️  Docker no encontrado — saltando ese paso"
fi

echo ""

# ── 2. Backend ─────────────────────────
echo "⚙️  Iniciando backend..."
if [ ! -d "$SERVER_DIR/node_modules" ]; then
  echo "   Instalando dependencias del backend..."
  cd "$SERVER_DIR" && npm install --silent
fi
cd "$SERVER_DIR" && npm run dev &
BACKEND_PID=$!
echo "   ✅ Backend corriendo (PID: $BACKEND_PID)"

echo ""

# Esperar un momento para que el backend arranque
sleep 2

# ── 3. Frontend ────────────────────────
echo "🎨 Iniciando frontend..."
if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
  echo "   Instalando dependencias del frontend..."
  cd "$FRONTEND_DIR" && npm install --silent
fi
cd "$FRONTEND_DIR" && npm run dev &
FRONTEND_PID=$!
echo "   ✅ Frontend corriendo (PID: $FRONTEND_PID)"

echo ""
echo "──────────────────────────"
echo "✅ Todo listo!"
echo ""
echo "  🌐 Frontend:    http://localhost:5173"
echo "  ⚙️  Backend:     http://localhost:3000"
echo "  🍃 Mongo UI:    http://localhost:8081"
echo "  🔐 Admin:       http://localhost:5173/admin"
echo ""
echo "  Presioná Ctrl+C para detener todo"
echo "──────────────────────────"

# ── Esperar y limpiar al salir ──────────
trap "echo ''; echo '🛑 Deteniendo servicios...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo '   ✅ Listo. ¡Hasta luego!'; exit 0" SIGINT SIGTERM

wait