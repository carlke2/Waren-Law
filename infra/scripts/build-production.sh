#!/usr/bin/env bash
# Prepares everything `pnpm start` needs. The frontend pre-renders from the API, so the backend
# runs during its build, unless SKIP_PRERENDER=true (CI), when pages render on first request.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
BACKEND_PORT="${BACKEND_PORT:-4000}"
HEALTH_ATTEMPTS=30

cd "$ROOT"
pnpm --filter @waren/shared build
pnpm --filter @waren/backend build

if [[ "${SKIP_PRERENDER:-false}" == "true" ]]; then
  pnpm --filter @waren/frontend build
  exit 0
fi

if curl -sf "http://localhost:$BACKEND_PORT/health" >/dev/null; then
  echo "Something is already running on port $BACKEND_PORT. Stop it, then build again." >&2
  exit 1
fi

(cd backend && NODE_ENV=production PORT="$BACKEND_PORT" exec node dist/src/main.js) &
BACKEND_PID=$!
trap 'kill "$BACKEND_PID" 2>/dev/null' EXIT

for attempt in $(seq 1 "$HEALTH_ATTEMPTS"); do
  curl -sf "http://localhost:$BACKEND_PORT/health" >/dev/null && break
  if [[ "$attempt" == "$HEALTH_ATTEMPTS" ]]; then
    echo "The backend did not become healthy. Check backend/.env." >&2
    exit 1
  fi
  sleep 1
done

SKIP_PRERENDER=false pnpm --filter @waren/frontend build
