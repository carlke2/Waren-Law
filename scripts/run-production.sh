#!/usr/bin/env bash
# Builds and runs V1 in production mode, using backend/.env and frontend/.env.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_PORT="${BACKEND_PORT:-4000}"
FRONTEND_PORT="${FRONTEND_PORT:-3000}"
HEALTH_ATTEMPTS=30

cd "$ROOT"
pnpm --filter @waren/shared build
pnpm --filter @waren/backend build

(cd backend && NODE_ENV=production PORT="$BACKEND_PORT" node dist/src/main.js) &
BACKEND_PID=$!
FRONTEND_PID=""

stop() {
  [[ -n "$FRONTEND_PID" ]] && kill "$FRONTEND_PID" 2>/dev/null
  kill "$BACKEND_PID" 2>/dev/null
}
trap stop EXIT

for attempt in $(seq 1 "$HEALTH_ATTEMPTS"); do
  curl -sf "http://localhost:$BACKEND_PORT/health" >/dev/null && break
  if [[ "$attempt" == "$HEALTH_ATTEMPTS" ]]; then
    echo "The backend did not become healthy. Check backend/.env." >&2
    exit 1
  fi
  sleep 1
done

# The build pre-renders every page, so it needs the backend running.
(cd frontend && SKIP_PRERENDER=false pnpm build)
(cd frontend && SKIP_PRERENDER=false pnpm exec next start -p "$FRONTEND_PORT") &
FRONTEND_PID=$!

echo "V1 is running at http://localhost:$FRONTEND_PORT"
wait "$FRONTEND_PID"
