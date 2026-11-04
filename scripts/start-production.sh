#!/usr/bin/env bash
# Starts the built site in production mode. It builds nothing: run `pnpm build` first.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_PORT="${BACKEND_PORT:-4000}"
FRONTEND_PORT="${FRONTEND_PORT:-3000}"
HEALTH_ATTEMPTS=30

if [[ ! -f "$ROOT/backend/dist/src/main.js" || ! -f "$ROOT/frontend/.next/BUILD_ID" ]]; then
  echo "No build found. Run pnpm build first." >&2
  exit 1
fi

(cd "$ROOT/backend" && NODE_ENV=production PORT="$BACKEND_PORT" exec node dist/src/main.js) &
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

(cd "$ROOT/frontend" && exec ./node_modules/.bin/next start -p "$FRONTEND_PORT") &
FRONTEND_PID=$!

echo "The site is running at http://localhost:$FRONTEND_PORT. Press Ctrl+C to stop it."
wait "$FRONTEND_PID"
